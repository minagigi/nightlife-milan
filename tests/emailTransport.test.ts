import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emailTransportMode, resolveRecipient, sendAttendeeEmail } from '../lib/emailTransport';

type EnvKey = 'RESEND_API_KEY' | 'EMAIL_TEST_OVERRIDE' | 'EMAIL_FROM' | 'EMAIL_REPLY_TO';

// Applica gli override, esegue fn, poi ripristina SEMPRE i valori originali
// (anche undefined) in finally — nessuna rete e nessuna dipendenza tra test.
async function withEnv(
  overrides: Partial<Record<EnvKey, string | undefined>>,
  fn: () => void | Promise<void>,
): Promise<void> {
  const saved: Partial<Record<EnvKey, string | undefined>> = {};
  const keys = Object.keys(overrides) as EnvKey[];
  for (const key of keys) {
    saved[key] = process.env[key];
    const value = overrides[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await fn();
  } finally {
    for (const key of keys) {
      const value = saved[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test('emailTransportMode: dry_run quando RESEND_API_KEY e assente', async () => {
  await withEnv({ RESEND_API_KEY: undefined }, () => {
    assert.equal(emailTransportMode(), 'dry_run');
  });
});

test('emailTransportMode: dry_run quando RESEND_API_KEY e solo spazi', async () => {
  await withEnv({ RESEND_API_KEY: '   ' }, () => {
    assert.equal(emailTransportMode(), 'dry_run');
  });
});

test('emailTransportMode: live quando RESEND_API_KEY e valorizzata', async () => {
  await withEnv({ RESEND_API_KEY: 're_test_123' }, () => {
    assert.equal(emailTransportMode(), 'live');
  });
});

test('resolveRecipient: ritorna "to" quando EMAIL_TEST_OVERRIDE e assente', async () => {
  await withEnv({ EMAIL_TEST_OVERRIDE: undefined }, () => {
    assert.equal(resolveRecipient('mario@example.com'), 'mario@example.com');
  });
});

test('resolveRecipient: sostituisce con EMAIL_TEST_OVERRIDE quando valorizzata', async () => {
  await withEnv({ EMAIL_TEST_OVERRIDE: 'test-override@example.com' }, () => {
    assert.equal(resolveRecipient('mario@example.com'), 'test-override@example.com');
  });
});

test('resolveRecipient: ignora EMAIL_TEST_OVERRIDE quando e solo spazi', async () => {
  await withEnv({ EMAIL_TEST_OVERRIDE: '   ' }, () => {
    assert.equal(resolveRecipient('mario@example.com'), 'mario@example.com');
  });
});

test('sendAttendeeEmail: dry_run senza RESEND_API_KEY, nessuna rete, effectiveTo = to', async () => {
  await withEnv({ RESEND_API_KEY: undefined, EMAIL_TEST_OVERRIDE: undefined }, async () => {
    const result = await sendAttendeeEmail({
      to: 'mario@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
      text: 'Test',
    });
    assert.deepEqual(result, { outcome: 'dry_run', effectiveTo: 'mario@example.com' });
  });
});

test('sendAttendeeEmail: dry_run rispetta EMAIL_TEST_OVERRIDE come effectiveTo', async () => {
  await withEnv({ RESEND_API_KEY: undefined, EMAIL_TEST_OVERRIDE: 'override@example.com' }, async () => {
    const result = await sendAttendeeEmail({
      to: 'mario@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
      text: 'Test',
    });
    assert.deepEqual(result, { outcome: 'dry_run', effectiveTo: 'override@example.com' });
  });
});

test('sendAttendeeEmail: dry_run anche con listUnsubscribeUrl presente (nessuna rete)', async () => {
  await withEnv({ RESEND_API_KEY: undefined, EMAIL_TEST_OVERRIDE: undefined }, async () => {
    const result = await sendAttendeeEmail({
      to: 'mario@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
      text: 'Test',
      listUnsubscribeUrl: 'https://nightlifemilan.com/unsubscribe/abc',
    });
    assert.deepEqual(result, { outcome: 'dry_run', effectiveTo: 'mario@example.com' });
  });
});
