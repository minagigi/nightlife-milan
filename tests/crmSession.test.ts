import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {
  CRM_RECOVERY_TTL_SECONDS,
  CRM_SESSION_TTL_SECONDS,
  createCrmRecoveryToken,
  createCrmSessionToken,
  crmCredentialsPath,
  crmHomePath,
  crmLoginPath,
  crmRecoverPath,
  parseAndVerifyCrmSessionToken,
  safeCrmRedirect,
  verifyCrmRecoveryToken,
  verifyCrmSessionToken,
} from '../lib/crmSession';

const secret = 'a-secure-test-secret-that-is-longer-than-thirty-two-characters';

test('CRM session token is signed, carries passwordEpoch, expires and rejects tampering', async () => {
  const token = await createCrmSessionToken('concierge@nightlifemilan.com', secret, 1_000, 3);
  assert.equal(await verifyCrmSessionToken(token, secret, 1_001), true);
  const parsed = await parseAndVerifyCrmSessionToken(token, secret, 1_001);
  assert.equal(parsed?.username, 'concierge@nightlifemilan.com');
  assert.equal(parsed?.passwordEpoch, 3);
  assert.equal(await verifyCrmSessionToken(token, secret, 1_000 + CRM_SESSION_TTL_SECONDS), false);
  assert.equal(await verifyCrmSessionToken(`${token}x`, secret, 1_001), false);
  assert.equal(await verifyCrmSessionToken(token, `${secret}-different`, 1_001), false);
});

test('CRM recovery token is isolated from session tokens and expires in 15 minutes', async () => {
  const jti = '0123456789abcdef0123456789abcdef';
  const recoveryToken = await createCrmRecoveryToken('minagigi@gmail.com', jti, secret, 2_000);
  // Recovery token must NOT validate as a CRM session cookie
  assert.equal(await verifyCrmSessionToken(recoveryToken, secret, 2_001), false);

  const verified = await verifyCrmRecoveryToken(recoveryToken, secret, 2_001);
  assert.equal(verified?.email, 'minagigi@gmail.com');
  assert.equal(verified?.jti, jti);
  assert.equal(await verifyCrmRecoveryToken(recoveryToken, secret, 2_000 + CRM_RECOVERY_TTL_SECONDS), null);
});

test('CRM redirects stay strictly inside the protected CRM area', () => {
  assert.equal(safeCrmRedirect('/crm/contact/123?q=guest'), '/crm/contact/123?q=guest');
  assert.equal(safeCrmRedirect('/it/crm?segment=repeat'), '/it/crm?segment=repeat');
  assert.equal(safeCrmRedirect('/crm/login'), '/crm');
  assert.equal(safeCrmRedirect('/it/crm/recover?token=abc', 'it'), '/it/crm');
  assert.equal(safeCrmRedirect('https://attacker.test'), '/crm');
  assert.equal(safeCrmRedirect('//attacker.test', 'it'), '/it/crm');
  assert.equal(safeCrmRedirect('/events', 'it'), '/it/crm');
  assert.equal(crmLoginPath('it'), '/it/crm/login');
  assert.equal(crmLoginPath('en'), '/crm/login');
  assert.equal(crmRecoverPath('it'), '/it/crm/recover');
  assert.equal(crmCredentialsPath('it'), '/it/crm/credentials');
  assert.equal(crmHomePath('it'), '/it/crm');
  assert.equal(crmHomePath('en'), '/crm');
});

test('CRM middleware uses the signed session cookie instead of Basic Auth', async () => {
  const middleware = await readFile(path.join(process.cwd(), 'middleware.ts'), 'utf8');
  assert.match(middleware, /CRM_SESSION_COOKIE/);
  assert.match(middleware, /verifyCrmSessionToken/);
  assert.doesNotMatch(middleware, /Basic realm="Nightlife Milan CRM"/);
  assert.doesNotMatch(middleware, /function crmAuth\(/);
});
