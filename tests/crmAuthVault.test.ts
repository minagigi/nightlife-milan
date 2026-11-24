import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clearCrmAuthMemoryStoreForTests,
  consumeCrmRecoveryChallenge,
  decryptCrmVaultSecret,
  encryptCrmVaultSecret,
  issueCrmRecoveryChallenge,
  peekCrmRecoveryChallenge,
  resolveActiveCrmCredentials,
  updateCrmVaultCredentials,
  verifyActiveNodeCrmSession,
  verifyCrmCredentialsInput,
} from '../lib/crmAuthVault';
import { createCrmRecoveryToken, createCrmSessionToken } from '../lib/crmSession';

const TEST_SECRET = 'test-crm-session-secret-with-at-least-thirty-two-bytes-12345';

function withTestEnv(fn: () => Promise<void>) {
  return async () => {
    const prev = {
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
      CRM_SESSION_SECRET: process.env.CRM_SESSION_SECRET,
      CRM_USER: process.env.CRM_USER,
      CRM_PASSWORD: process.env.CRM_PASSWORD,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    };
    delete process.env.BLOB_READ_WRITE_TOKEN;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASS;
    delete process.env.RESEND_API_KEY;
    process.env.CRM_SESSION_SECRET = TEST_SECRET;
    process.env.CRM_USER = 'admin-initial';
    process.env.CRM_PASSWORD = 'initial-password-123';
    clearCrmAuthMemoryStoreForTests();

    try {
      await fn();
    } finally {
      clearCrmAuthMemoryStoreForTests();
      for (const [key, val] of Object.entries(prev)) {
        if (val === undefined) delete process.env[key];
        else process.env[key] = val;
      }
    }
  };
}

test(
  'AES-256-GCM vault roundtrip and password update revokes old session epoch',
  withTestEnv(async () => {
    const box = encryptCrmVaultSecret({
      username: 'concierge',
      password: 'super-secret-value-99',
      updatedAt: '2026-11-24T10:00:00.000Z',
      updatedBy: 'test',
    });
    const plain = decryptCrmVaultSecret(box);
    assert.equal(plain?.username, 'concierge');
    assert.equal(plain?.password, 'super-secret-value-99');

    const initialCheck = await verifyCrmCredentialsInput('admin-initial', 'initial-password-123');
    assert.equal(initialCheck.ok, true);
    assert.equal(initialCheck.passwordEpoch, 0);

    const nowSec = Math.floor(Date.now() / 1000);
    const oldCookie = await createCrmSessionToken('admin-initial', TEST_SECRET, nowSec, 0);
    assert.notEqual(await verifyActiveNodeCrmSession(oldCookie), null);

    // Wrong current password rejected
    const badUpdate = await updateCrmVaultCredentials('wrong-pass', 'admin-new', 'new-strong-password-456');
    assert.equal(badUpdate.ok, false);
    assert.equal(badUpdate.error, 'invalid_current');

    // Valid update increments passwordEpoch and revokes old session cookie immediately
    const goodUpdate = await updateCrmVaultCredentials(
      'initial-password-123',
      'admin-new',
      'new-strong-password-456',
    );
    assert.equal(goodUpdate.ok, true);
    assert.equal(goodUpdate.passwordEpoch, 1);

    assert.equal(await verifyActiveNodeCrmSession(oldCookie), null);

    const newActive = await resolveActiveCrmCredentials();
    assert.equal(newActive?.username, 'admin-new');
    assert.equal(newActive?.password, 'new-strong-password-456');
    assert.equal(newActive?.source, 'vault');

    const newCookie = await createCrmSessionToken(
      'admin-new',
      TEST_SECRET,
      Math.floor(Date.now() / 1000),
      1,
    );
    assert.notEqual(await verifyActiveNodeCrmSession(newCookie), null);
  }),
);

test(
  'Recovery challenge allows read-only GET peek, enforces atomic single-use POST and rate limit',
  withTestEnv(async () => {
    // Non-admin email is ignored
    const unauthorized = await issueCrmRecoveryChallenge(
      'intruder@example.com',
      'it',
      'https://nightlifemilan.com',
      10_000,
    );
    assert.equal(unauthorized.dispatched, false);

    // Authorized admin email succeeds up to 3 times in 15m window, 4th is rate-limited
    const r1 = await issueCrmRecoveryChallenge('minagigi@gmail.com', 'it', 'https://nightlifemilan.com', 10_000);
    const r2 = await issueCrmRecoveryChallenge('concierge@nightlifemilan.com', 'it', 'https://nightlifemilan.com', 10_010);
    const r3 = await issueCrmRecoveryChallenge('staff@nightlifemilan.com', 'it', 'https://nightlifemilan.com', 10_020);
    const r4 = await issueCrmRecoveryChallenge('minagigi@gmail.com', 'it', 'https://nightlifemilan.com', 10_030);
    assert.equal(r1.dispatched, true);
    assert.equal(r2.dispatched, true);
    assert.equal(r3.dispatched, true);
    assert.equal(r4.dispatched, false);

    // Peek does NOT burn the single-use token, POST consume burns it atomically once
    const jti = 'abcdef0123456789abcdef0123456789';
    const token = await createCrmRecoveryToken('minagigi@gmail.com', jti, TEST_SECRET, 20_000);

    const peek1 = await peekCrmRecoveryChallenge(token, 20_010);
    const peek2 = await peekCrmRecoveryChallenge(token, 20_020);
    assert.equal(peek1.valid, true);
    assert.equal(peek2.valid, true);

    const firstConsume = await consumeCrmRecoveryChallenge(token, 20_030);
    assert.equal(firstConsume.ok, true);

    const peekAfter = await peekCrmRecoveryChallenge(token, 20_035);
    assert.equal(peekAfter.valid, false);
    assert.equal(peekAfter.reason, 'used');

    const secondConsume = await consumeCrmRecoveryChallenge(token, 20_040);
    assert.equal(secondConsume.ok, false);
    assert.equal(secondConsume.reason, 'used');
  }),
);
