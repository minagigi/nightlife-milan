import crypto from 'node:crypto';
import { list, put } from '@vercel/blob';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { readPrivateBlobJson } from './blobPrivateRead';
import { buildCrmRecoveryEmailMessage } from './crmAuthCopy';
import {
  CRM_RECOVERY_TTL_SECONDS,
  CRM_SESSION_COOKIE,
  createCrmRecoveryToken,
  crmLoginPath,
  crmRecoverPath,
  parseAndVerifyCrmSessionToken,
  resolveCrmSessionSecret,
  verifyCrmRecoveryToken,
  type CrmSessionPayload,
} from './crmSession';
import { sendDirectAdminEmail } from './emailTransport';

const CREDENTIALS_DOC_PATH = 'crm/v1/auth/credentials.json';
const RECOVERY_ISSUED_PREFIX = 'crm/v1/auth/recovery-issued/';
const RECOVERY_USED_PREFIX = 'crm/v1/auth/recovery-used/';

const MAX_RECOVERY_REQUESTS_PER_WINDOW = 3;
const RECOVERY_WINDOW_SECONDS = 60 * 15;

const DEFAULT_ADMIN_RECOVERY_EMAILS = [
  'minagigi@gmail.com',
  'concierge@nightlifemilan.com',
  'staff@nightlifemilan.com',
];

interface EncryptedSecretBox {
  v: 1;
  iv: string;
  tag: string;
  data: string;
}

interface StoredCrmCredentialsPlain {
  username: string;
  password: string;
  updatedAt: string;
  updatedBy: string;
}

interface CrmCredentialsBlobDoc {
  version: 1;
  passwordEpoch: number;
  updatedAt: string;
  encrypted: EncryptedSecretBox;
}

interface RecoveryUsedMarker {
  version: 1;
  jti: string;
  email: string;
  usedAt: number;
}

const memoryAuthBlobs = new Map<string, string>();

export function crmAuthBlobConfigured(): boolean {
  return Boolean((process.env.BLOB_READ_WRITE_TOKEN || '').trim());
}

export function clearCrmAuthMemoryStoreForTests(): void {
  memoryAuthBlobs.clear();
}

function deriveVaultEncryptionKey(): Buffer {
  const seed =
    (process.env.CRM_SESSION_SECRET || '').trim()
    || (process.env.VAULT_ENCRYPTION_KEY || '').trim()
    || (process.env.EMAIL_LINK_SECRET || '').trim()
    || (process.env.BLOB_READ_WRITE_TOKEN || '').trim()
    || 'nlm-crm-auth-dev-vault-key-2026-only';
  return crypto.scryptSync(seed, 'nlm-crm-auth-vault-v1', 32);
}

export function encryptCrmVaultSecret(plain: StoredCrmCredentialsPlain): EncryptedSecretBox {
  const key = deriveVaultEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    v: 1,
    iv: iv.toString('base64url'),
    tag: tag.toString('base64url'),
    data: encrypted.toString('base64url'),
  };
}

export function decryptCrmVaultSecret(box: EncryptedSecretBox): StoredCrmCredentialsPlain | null {
  try {
    if (!box || box.v !== 1) return null;
    const key = deriveVaultEncryptionKey();
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(box.iv, 'base64url'),
    );
    decipher.setAuthTag(Buffer.from(box.tag, 'base64url'));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(box.data, 'base64url')),
      decipher.final(),
    ]).toString('utf8');
    const parsed = JSON.parse(decrypted) as Partial<StoredCrmCredentialsPlain>;
    if (
      typeof parsed.username !== 'string'
      || !parsed.username.trim()
      || typeof parsed.password !== 'string'
      || !parsed.password
    ) {
      return null;
    }
    return {
      username: parsed.username.trim(),
      password: parsed.password,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
      updatedBy: typeof parsed.updatedBy === 'string' ? parsed.updatedBy : 'admin',
    };
  } catch {
    return null;
  }
}

async function readPrivateJson<T>(pathname: string): Promise<T | null> {
  if (!crmAuthBlobConfigured()) {
    const raw = memoryAuthBlobs.get(pathname);
    return raw ? (JSON.parse(raw) as T) : null;
  }
  const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
  return readPrivateBlobJson<T>(pathname, {
    token,
    useCache: false,
    allowCachedFallbackOn5xx: false,
  });
}

async function writePrivateJson(
  pathname: string,
  value: unknown,
  allowOverwrite = true,
): Promise<boolean> {
  const serialized = JSON.stringify(value);
  if (!crmAuthBlobConfigured()) {
    if (!allowOverwrite && memoryAuthBlobs.has(pathname)) {
      return false;
    }
    memoryAuthBlobs.set(pathname, serialized);
    return true;
  }
  const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
  try {
    await put(pathname, serialized, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite,
      contentType: 'application/json',
      token,
    });
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!allowOverwrite && /already exists|overwrite|conflict|409/i.test(message)) {
      return false;
    }
    throw error;
  }
}

async function listPrivatePrefixPaths(prefix: string): Promise<string[]> {
  if (!crmAuthBlobConfigured()) {
    return Array.from(memoryAuthBlobs.keys()).filter((key) => key.startsWith(prefix));
  }
  const token = (process.env.BLOB_READ_WRITE_TOKEN || '').trim();
  const listed = await list({ prefix, limit: 200, token });
  return listed.blobs.map((item) => item.pathname);
}

function sha256Equal(left: string, right: string): boolean {
  const leftDigest = crypto.createHash('sha256').update(left, 'utf8').digest();
  const rightDigest = crypto.createHash('sha256').update(right, 'utf8').digest();
  return crypto.timingSafeEqual(leftDigest, rightDigest);
}

export function getAllowedCrmRecoveryEmails(): string[] {
  const extraRaw = (process.env.CRM_RECOVERY_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.includes('@'));
  return Array.from(new Set([...DEFAULT_ADMIN_RECOVERY_EMAILS, ...extraRaw]));
}

export async function resolveActiveCrmCredentials(): Promise<{
  username: string;
  password: string;
  passwordEpoch: number;
  source: 'vault' | 'env';
} | null> {
  const doc = await readPrivateJson<CrmCredentialsBlobDoc>(CREDENTIALS_DOC_PATH);
  if (doc?.version === 1 && doc.encrypted) {
    const decrypted = decryptCrmVaultSecret(doc.encrypted);
    if (decrypted) {
      const epoch = Number.isInteger(doc.passwordEpoch) && doc.passwordEpoch >= 0 ? doc.passwordEpoch : 1;
      return {
        username: decrypted.username,
        password: decrypted.password,
        passwordEpoch: epoch,
        source: 'vault',
      };
    }
  }

  const envUser = (process.env.CRM_USER || process.env.ANALYTICS_USER || '').trim();
  const envPass = process.env.CRM_PASSWORD || process.env.ANALYTICS_PASSWORD || '';
  if (!envUser || !envPass) return null;

  return {
    username: envUser,
    password: envPass,
    passwordEpoch: 0,
    source: 'env',
  };
}

export async function verifyCrmCredentialsInput(
  username: string,
  password: string,
): Promise<{ ok: boolean; canonicalUsername: string; passwordEpoch: number; configured: boolean }> {
  const active = await resolveActiveCrmCredentials();
  if (!active) {
    return { ok: false, canonicalUsername: '', passwordEpoch: 0, configured: false };
  }
  const cleanUser = username.trim();
  const userMatches = sha256Equal(cleanUser, active.username);
  const passMatches = sha256Equal(password, active.password);
  return {
    ok: userMatches && passMatches,
    canonicalUsername: active.username,
    passwordEpoch: active.passwordEpoch,
    configured: true,
  };
}

export async function updateCrmVaultCredentials(
  currentPassword: string,
  newUsername: string,
  newPassword: string,
  actor = 'admin',
): Promise<{
  ok: boolean;
  error?: 'not_configured' | 'invalid_current' | 'invalid_username' | 'weak_password';
  username?: string;
  passwordEpoch?: number;
}> {
  const active = await resolveActiveCrmCredentials();
  if (!active) return { ok: false, error: 'not_configured' };
  if (!sha256Equal(currentPassword, active.password)) {
    return { ok: false, error: 'invalid_current' };
  }
  const cleanUsername = newUsername.trim();
  if (cleanUsername.length < 3 || cleanUsername.length > 160) {
    return { ok: false, error: 'invalid_username' };
  }
  if (newPassword.length < 10 || newPassword.length > 200) {
    return { ok: false, error: 'weak_password' };
  }

  const nextEpoch = active.passwordEpoch + 1;
  const nowIso = new Date().toISOString();
  const encrypted = encryptCrmVaultSecret({
    username: cleanUsername,
    password: newPassword,
    updatedAt: nowIso,
    updatedBy: actor,
  });
  const doc: CrmCredentialsBlobDoc = {
    version: 1,
    passwordEpoch: nextEpoch,
    updatedAt: nowIso,
    encrypted,
  };
  await writePrivateJson(CREDENTIALS_DOC_PATH, doc, true);
  return { ok: true, username: cleanUsername, passwordEpoch: nextEpoch };
}

async function isRecoveryWindowRateLimited(nowSeconds: number): Promise<boolean> {
  const paths = await listPrivatePrefixPaths(RECOVERY_ISSUED_PREFIX);
  const minEpochMs = (nowSeconds - RECOVERY_WINDOW_SECONDS) * 1000;
  let recentCount = 0;
  for (const itemPath of paths) {
    const fileName = itemPath.slice(RECOVERY_ISSUED_PREFIX.length);
    const tsPart = Number.parseInt(fileName.split('-')[0] || '', 10);
    if (Number.isFinite(tsPart) && tsPart >= minEpochMs) {
      recentCount += 1;
    }
  }
  return recentCount >= MAX_RECOVERY_REQUESTS_PER_WINDOW;
}

export async function issueCrmRecoveryChallenge(
  rawEmail: string,
  locale: string,
  siteOrigin: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<{ dispatched: boolean }> {
  const normalizedEmail = rawEmail.trim().toLowerCase();
  const allowed = getAllowedCrmRecoveryEmails();
  const isAllowed = allowed.some((candidate) => sha256Equal(normalizedEmail, candidate));
  const secret = resolveCrmSessionSecret();
  const active = await resolveActiveCrmCredentials();

  if (!isAllowed || !secret || !active) {
    return { dispatched: false };
  }

  if (await isRecoveryWindowRateLimited(nowSeconds)) {
    return { dispatched: false };
  }

  const jti = crypto.randomBytes(16).toString('hex');
  const token = await createCrmRecoveryToken(normalizedEmail, jti, secret, nowSeconds);
  const issuedMarkerPath = `${RECOVERY_ISSUED_PREFIX}${nowSeconds * 1000}-${jti}.json`;
  await writePrivateJson(
    issuedMarkerPath,
    { version: 1, jti, issuedAt: nowSeconds },
    false,
  );

  const cleanOrigin = siteOrigin.replace(/\/+$/, '');
  const recoverPath = crmRecoverPath(locale);
  const recoveryUrl = `${cleanOrigin}${recoverPath}?token=${encodeURIComponent(token)}`;
  const emailContent = buildCrmRecoveryEmailMessage({
    to: normalizedEmail,
    locale,
    recoveryUrl,
    expiresMinutes: Math.round(CRM_RECOVERY_TTL_SECONDS / 60),
  });

  const sendResult = await sendDirectAdminEmail({
    to: normalizedEmail,
    subject: emailContent.subject,
    html: emailContent.html,
    text: emailContent.text,
    idempotencyKey: `crm-recovery-${jti}`,
  });

  return { dispatched: sendResult.outcome !== 'failed' };
}

export async function peekCrmRecoveryChallenge(
  token: string | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<{
  valid: boolean;
  reason?: 'missing' | 'invalid_or_expired' | 'used';
  email?: string;
  expiresAt?: number;
}> {
  const clean = (token || '').trim();
  if (!clean) return { valid: false, reason: 'missing' };
  const verified = await verifyCrmRecoveryToken(clean, resolveCrmSessionSecret(), nowSeconds);
  if (!verified) return { valid: false, reason: 'invalid_or_expired' };

  const usedDoc = await readPrivateJson<RecoveryUsedMarker>(`${RECOVERY_USED_PREFIX}${verified.jti}.json`);
  if (usedDoc) return { valid: false, reason: 'used' };

  return {
    valid: true,
    email: verified.email,
    expiresAt: verified.expiresAt,
  };
}

export async function consumeCrmRecoveryChallenge(
  token: string | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<{
  ok: boolean;
  reason?: 'missing' | 'invalid_or_expired' | 'used';
  email?: string;
}> {
  const clean = (token || '').trim();
  if (!clean) return { ok: false, reason: 'missing' };
  const verified = await verifyCrmRecoveryToken(clean, resolveCrmSessionSecret(), nowSeconds);
  if (!verified) return { ok: false, reason: 'invalid_or_expired' };

  const markerPath = `${RECOVERY_USED_PREFIX}${verified.jti}.json`;
  const existing = await readPrivateJson<RecoveryUsedMarker>(markerPath);
  if (existing) return { ok: false, reason: 'used' };

  const claimed = await writePrivateJson(
    markerPath,
    {
      version: 1,
      jti: verified.jti,
      email: verified.email,
      usedAt: nowSeconds,
    } satisfies RecoveryUsedMarker,
    false,
  );
  if (!claimed) return { ok: false, reason: 'used' };

  return { ok: true, email: verified.email };
}

export function assertSameOriginRequest(request: Request): boolean {
  const secFetchSite = (request.headers.get('sec-fetch-site') || '').trim().toLowerCase();
  if (secFetchSite && secFetchSite !== 'same-origin' && secFetchSite !== 'none') {
    return false;
  }
  const expectedHost = (
    request.headers.get('x-forwarded-host')
    || request.headers.get('host')
    || new URL(request.url).host
  )
    .split(',')[0]
    .trim()
    .toLowerCase();
  const origin = (request.headers.get('origin') || '').trim();
  if (origin) {
    try {
      return new URL(origin).host.toLowerCase() === expectedHost;
    } catch {
      return false;
    }
  }
  const referer = (request.headers.get('referer') || '').trim();
  if (referer) {
    try {
      return new URL(referer).host.toLowerCase() === expectedHost;
    } catch {
      return false;
    }
  }
  return process.env.NODE_ENV !== 'production';
}

export function resolveRequestOrigin(request: Request): string {
  const proto = (request.headers.get('x-forwarded-proto') || '').split(',')[0].trim() || (
    process.env.NODE_ENV === 'production' ? 'https' : new URL(request.url).protocol.replace(':', '')
  );
  const host = (
    request.headers.get('x-forwarded-host')
    || request.headers.get('host')
    || new URL(request.url).host
  )
    .split(',')[0]
    .trim();
  return `${proto}://${host}`;
}

export async function verifyActiveNodeCrmSession(
  cookieValue: string | undefined,
): Promise<CrmSessionPayload | null> {
  const parsed = await parseAndVerifyCrmSessionToken(cookieValue, resolveCrmSessionSecret());
  if (!parsed) return null;
  const active = await resolveActiveCrmCredentials();
  if (!active) return null;
  if (parsed.passwordEpoch !== active.passwordEpoch) return null;
  return parsed;
}

export async function requireCrmServerSession(locale?: string): Promise<CrmSessionPayload> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(CRM_SESSION_COOKIE)?.value;
  const verified = await verifyActiveNodeCrmSession(rawToken);
  if (!verified) {
    redirect(crmLoginPath(locale));
  }
  return verified;
}

export async function requireCrmActionSession(): Promise<CrmSessionPayload> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(CRM_SESSION_COOKIE)?.value;
  const verified = await verifyActiveNodeCrmSession(rawToken);
  if (!verified) {
    throw new Error('CRM authentication required');
  }
  return verified;
}
