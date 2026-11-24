import { NextResponse } from 'next/server';
import {
  assertSameOriginRequest,
  consumeCrmRecoveryChallenge,
  resolveActiveCrmCredentials,
} from '@/lib/crmAuthVault';
import {
  CRM_SESSION_COOKIE,
  CRM_SESSION_TTL_SECONDS,
  createCrmSessionToken,
  crmHomePath,
  resolveCrmSessionSecret,
} from '@/lib/crmSession';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!assertSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, error: 'forbidden' },
      { status: 403, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const token = String(body.token || '').trim();
  const locale = String(body.locale || 'en').trim();

  const sessionSecret = resolveCrmSessionSecret();
  const active = await resolveActiveCrmCredentials();
  if (!sessionSecret || !active) {
    return NextResponse.json(
      { ok: false, error: 'configuration' },
      { status: 503, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const consumed = await consumeCrmRecoveryChallenge(token);
  if (!consumed.ok) {
    return NextResponse.json(
      { ok: false, error: consumed.reason || 'invalid_or_expired' },
      { status: 400, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const sessionToken = await createCrmSessionToken(
    active.username,
    sessionSecret,
    Math.floor(Date.now() / 1000),
    active.passwordEpoch,
  );

  const response = NextResponse.json({
    ok: true,
    username: active.username,
    password: active.password,
    source: active.source,
    crmHref: crmHomePath(locale),
  });
  response.cookies.set(CRM_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: CRM_SESSION_TTL_SECONDS,
  });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
