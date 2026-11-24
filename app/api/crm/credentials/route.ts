import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  assertSameOriginRequest,
  updateCrmVaultCredentials,
  verifyActiveNodeCrmSession,
} from '@/lib/crmAuthVault';
import {
  CRM_SESSION_COOKIE,
  CRM_SESSION_TTL_SECONDS,
  createCrmSessionToken,
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

  const cookieStore = await cookies();
  const activeSession = await verifyActiveNodeCrmSession(cookieStore.get(CRM_SESSION_COOKIE)?.value);
  if (!activeSession) {
    return NextResponse.json(
      { ok: false, error: 'unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const sessionSecret = resolveCrmSessionSecret();
  if (!sessionSecret) {
    return NextResponse.json(
      { ok: false, error: 'configuration' },
      { status: 503, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const currentPassword = String(body.currentPassword || '');
  const newUsername = String(body.newUsername || '').trim();
  const newPassword = String(body.newPassword || '');

  const updated = await updateCrmVaultCredentials(
    currentPassword,
    newUsername,
    newPassword,
    activeSession.username,
  );

  if (!updated.ok || !updated.username || typeof updated.passwordEpoch !== 'number') {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return NextResponse.json(
      { ok: false, error: updated.error || 'update_failed' },
      { status: 400, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const nextToken = await createCrmSessionToken(
    updated.username,
    sessionSecret,
    Math.floor(Date.now() / 1000),
    updated.passwordEpoch,
  );

  const response = NextResponse.json({
    ok: true,
    username: updated.username,
    source: 'vault',
  });
  response.cookies.set(CRM_SESSION_COOKIE, nextToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: CRM_SESSION_TTL_SECONDS,
  });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
