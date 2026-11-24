import { enabledLocaleCodes } from '@/lib/i18n/locales';

export const CRM_SESSION_COOKIE = 'nlm_crm_session';
export const CRM_SESSION_TTL_SECONDS = 60 * 60 * 8;
export const CRM_RECOVERY_TTL_SECONDS = 60 * 15;

const ACTIVE_LOCALE_SET = new Set<string>(enabledLocaleCodes);

export interface CrmSessionPayload {
  version: 1;
  kind: 'session';
  username: string;
  passwordEpoch: number;
  expiresAt: number;
  nonce: string;
}

export interface CrmRecoveryPayload {
  version: 1;
  kind: 'recovery';
  email: string;
  jti: string;
  expiresAt: number;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value: string): Uint8Array {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function textToBase64Url(value: string): string {
  return bytesToBase64Url(new TextEncoder().encode(value));
}

function base64UrlToText(value: string): string {
  return new TextDecoder().decode(base64UrlToBytes(value));
}

async function signHmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

function constantTimeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export function resolveCrmSessionSecret(): string {
  const candidate = (process.env.CRM_SESSION_SECRET || process.env.EMAIL_LINK_SECRET || '').trim();
  return candidate.length >= 32 ? candidate : '';
}

export async function createCrmSessionToken(
  username: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
  passwordEpoch = 0,
): Promise<string> {
  if (!username || secret.length < 32) {
    throw new Error('CRM session configuration is invalid');
  }

  const nonceBytes = new Uint8Array(16);
  crypto.getRandomValues(nonceBytes);
  const payload: CrmSessionPayload = {
    version: 1,
    kind: 'session',
    username,
    passwordEpoch: Number.isInteger(passwordEpoch) && passwordEpoch >= 0 ? passwordEpoch : 0,
    expiresAt: nowSeconds + CRM_SESSION_TTL_SECONDS,
    nonce: bytesToBase64Url(nonceBytes),
  };
  const encodedPayload = textToBase64Url(JSON.stringify(payload));
  return `${encodedPayload}.${await signHmac(encodedPayload, secret)}`;
}

export async function parseAndVerifyCrmSessionToken(
  token: string | undefined,
  secret: string | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<CrmSessionPayload | null> {
  if (!token || !secret || secret.length < 32) return null;
  const [encodedPayload, receivedSignature, ...extra] = token.split('.');
  if (!encodedPayload || !receivedSignature || extra.length > 0) return null;

  try {
    const expectedSignature = await signHmac(encodedPayload, secret);
    if (!constantTimeEqual(receivedSignature, expectedSignature)) return null;
    const raw = JSON.parse(base64UrlToText(encodedPayload)) as Partial<CrmSessionPayload> & { kind?: string };
    if (raw.kind !== undefined && raw.kind !== 'session') return null;
    const epoch = typeof raw.passwordEpoch === 'number' && Number.isInteger(raw.passwordEpoch) && raw.passwordEpoch >= 0
      ? raw.passwordEpoch
      : 0;
    if (
      raw.version !== 1
      || typeof raw.username !== 'string'
      || raw.username.length === 0
      || typeof raw.expiresAt !== 'number'
      || raw.expiresAt <= nowSeconds
      || typeof raw.nonce !== 'string'
      || raw.nonce.length < 16
    ) {
      return null;
    }
    return {
      version: 1,
      kind: 'session',
      username: raw.username,
      passwordEpoch: epoch,
      expiresAt: raw.expiresAt,
      nonce: raw.nonce,
    };
  } catch {
    return null;
  }
}

export async function verifyCrmSessionToken(
  token: string | undefined,
  secret: string | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<boolean> {
  return (await parseAndVerifyCrmSessionToken(token, secret, nowSeconds)) !== null;
}

export async function createCrmRecoveryToken(
  email: string,
  jti: string,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<string> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanJti = jti.trim();
  if (!cleanEmail || cleanJti.length < 16 || secret.length < 32) {
    throw new Error('CRM recovery token configuration is invalid');
  }
  const payload: CrmRecoveryPayload = {
    version: 1,
    kind: 'recovery',
    email: cleanEmail,
    jti: cleanJti,
    expiresAt: nowSeconds + CRM_RECOVERY_TTL_SECONDS,
  };
  const encodedPayload = textToBase64Url(JSON.stringify(payload));
  return `${encodedPayload}.${await signHmac(encodedPayload, secret)}`;
}

export async function verifyCrmRecoveryToken(
  token: string | undefined,
  secret: string | undefined,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<{ email: string; jti: string; expiresAt: number } | null> {
  if (!token || !secret || secret.length < 32) return null;
  const [encodedPayload, receivedSignature, ...extra] = token.split('.');
  if (!encodedPayload || !receivedSignature || extra.length > 0) return null;

  try {
    const expectedSignature = await signHmac(encodedPayload, secret);
    if (!constantTimeEqual(receivedSignature, expectedSignature)) return null;
    const raw = JSON.parse(base64UrlToText(encodedPayload)) as Partial<CrmRecoveryPayload>;
    if (
      raw.version !== 1
      || raw.kind !== 'recovery'
      || typeof raw.email !== 'string'
      || raw.email.length < 5
      || typeof raw.jti !== 'string'
      || raw.jti.length < 16
      || typeof raw.expiresAt !== 'number'
      || raw.expiresAt <= nowSeconds
    ) {
      return null;
    }
    return {
      email: raw.email,
      jti: raw.jti,
      expiresAt: raw.expiresAt,
    };
  } catch {
    return null;
  }
}

function normalizeCrmLocale(locale: string | null | undefined): string {
  const clean = (locale || '').trim().toLowerCase();
  return clean && clean !== 'en' && ACTIVE_LOCALE_SET.has(clean) ? clean : 'en';
}

export function crmHomePath(locale: string | null | undefined): string {
  const normalized = normalizeCrmLocale(locale);
  return normalized === 'en' ? '/crm' : `/${normalized}/crm`;
}

export function crmLoginPath(locale: string | null | undefined): string {
  const normalized = normalizeCrmLocale(locale);
  return normalized === 'en' ? '/crm/login' : `/${normalized}/crm/login`;
}

export function crmRecoverPath(locale: string | null | undefined): string {
  const normalized = normalizeCrmLocale(locale);
  return normalized === 'en' ? '/crm/recover' : `/${normalized}/crm/recover`;
}

export function crmCredentialsPath(locale: string | null | undefined): string {
  const normalized = normalizeCrmLocale(locale);
  return normalized === 'en' ? '/crm/credentials' : `/${normalized}/crm/credentials`;
}

export function safeCrmRedirect(value: string | null | undefined, fallbackLocale?: string | null): string {
  const defaultDest = crmHomePath(fallbackLocale);
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return defaultDest;
  }
  const pathname = value.split('?')[0].split('#')[0];
  const match = pathname.match(/^\/(?:([a-z]{2})\/)?crm(\/.*)?$/);
  if (!match) return defaultDest;
  const matchedLocale = match[1];
  if (matchedLocale && !ACTIVE_LOCALE_SET.has(matchedLocale)) return defaultDest;
  const subPath = match[2] || '';
  if (/^\/(?:login|recover)(?:\/|$)/.test(subPath)) {
    return crmHomePath(matchedLocale || fallbackLocale);
  }
  if (matchedLocale === 'en') {
    const queryIndex = value.indexOf('?');
    const querySuffix = queryIndex >= 0 ? value.slice(queryIndex) : '';
    return `/crm${subPath}${querySuffix}`;
  }
  return value;
}
