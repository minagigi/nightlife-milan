import crypto from 'node:crypto';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextRequest, NextResponse } from 'next/server';
import { normalizeEmail } from './store';

export const SINGLE_PASS_SESSION_COOKIE = 'nlm_sp_session';
const SESSION_TTL_SEC = 90 * 24 * 60 * 60; // 90 days (covers through Jan 2027)

export type SinglePassSessionPayload = {
  email: string;
  memberId: string;
  exp: number;
};

function getSessionSecret(): string {
  return (
    (process.env.SINGLE_PASS_AUTH_SECRET || '').trim() ||
    (process.env.SESSION_SECRET || '').trim() ||
    (process.env.CRM_SYNC_SECRET || '').trim() ||
    (process.env.BLOB_READ_WRITE_TOKEN || '').trim() ||
    (process.env.ANALYTICS_PASSWORD || '').trim() ||
    'nlm-dev-only-single-pass-session-secret'
  );
}

export function hashPassword(password: string, existingSalt?: string): { salt: string; hash: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 120_000, 32, 'sha256').toString('hex');
  return { salt, hash };
}

export function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  if (!password || !salt || !expectedHash) return false;
  try {
    const computed = crypto.pbkdf2Sync(password, salt, 120_000, 32, 'sha256');
    const expected = Buffer.from(expectedHash, 'hex');
    if (computed.length !== expected.length) return false;
    return crypto.timingSafeEqual(computed, expected);
  } catch {
    return false;
  }
}

function signTokenData(encodedPayload: string): string {
  return crypto
    .createHmac('sha256', getSessionSecret())
    .update(encodedPayload)
    .digest('base64url');
}

export function createSessionToken(email: string, memberId: string, nowSec = Math.floor(Date.now() / 1000)): string {
  const payload: SinglePassSessionPayload = {
    email: normalizeEmail(email),
    memberId,
    exp: nowSec + SESSION_TTL_SEC,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = signTokenData(encoded);
  return `${encoded}.${sig}`;
}

export function verifySessionToken(
  token: string | undefined | null,
  nowSec = Math.floor(Date.now() / 1000),
): SinglePassSessionPayload | null {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  if (!encoded || !sig) return null;

  const expectedSig = signTokenData(encoded);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SinglePassSessionPayload;
    if (!parsed.email || !parsed.memberId || typeof parsed.exp !== 'number') return null;
    if (parsed.exp < nowSec) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readSessionFromRequest(request: NextRequest | Request): SinglePassSessionPayload | null {
  if ('cookies' in request && typeof request.cookies?.get === 'function') {
    const raw = request.cookies.get(SINGLE_PASS_SESSION_COOKIE)?.value;
    return verifySessionToken(raw);
  }
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${SINGLE_PASS_SESSION_COOKIE}=([^;]+)`));
  if (!match) return null;
  return verifySessionToken(decodeURIComponent(match[1]));
}

export function readSessionFromCookieStore(cookieStore: ReadonlyRequestCookies): SinglePassSessionPayload | null {
  const raw = cookieStore.get(SINGLE_PASS_SESSION_COOKIE)?.value;
  return verifySessionToken(raw);
}

export function applySessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SINGLE_PASS_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SEC,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SINGLE_PASS_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function verifySameOriginRequest(request: Request): boolean {
  const secFetchSite = request.headers.get('sec-fetch-site');
  if (secFetchSite && secFetchSite === 'cross-site') {
    return false;
  }
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const parsedOrigin = new URL(origin);
    const reqHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
    const cleanHost = reqHost.split(':')[0].toLowerCase();
    const originHost = parsedOrigin.hostname.toLowerCase();
    const allowedHosts = new Set([
      'nightlifemilan.com',
      'www.nightlifemilan.com',
      'localhost',
      '127.0.0.1',
    ]);
    if (cleanHost) allowedHosts.add(cleanHost);
    if (process.env.APP_URL) {
      try {
        allowedHosts.add(new URL(process.env.APP_URL).hostname.toLowerCase());
      } catch {}
    }
    return allowedHosts.has(originHost) || originHost.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

export function resolveRequestOrigin(request: Request): string {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https';
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`.replace(/\/+$/, '');
  }
  try {
    return new URL(request.url).origin;
  } catch {
    return (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
  }
}
