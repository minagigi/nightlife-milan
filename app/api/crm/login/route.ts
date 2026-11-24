import { NextResponse } from 'next/server';
import {
  assertSameOriginRequest,
  verifyCrmCredentialsInput,
} from '@/lib/crmAuthVault';
import {
  CRM_SESSION_COOKIE,
  CRM_SESSION_TTL_SECONDS,
  createCrmSessionToken,
  crmLoginPath,
  resolveCrmSessionSecret,
  safeCrmRedirect,
} from '@/lib/crmSession';

export const runtime = 'nodejs';

function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(CRM_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: CRM_SESSION_TTL_SECONDS,
  });
  response.headers.set('Cache-Control', 'private, no-store');
}

export async function POST(request: Request) {
  if (!assertSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, error: 'forbidden' },
      { status: 403, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  const wantsJson = contentType.includes('application/json');

  let username = '';
  let password = '';
  let locale = 'en';
  let rawNext = '/crm';

  if (wantsJson) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    username = String(body.username || '').trim();
    password = String(body.password || '');
    locale = String(body.locale || 'en').trim();
    rawNext = String(body.next || '');
  } else {
    const formData = await request.formData();
    username = String(formData.get('username') || '').trim();
    password = String(formData.get('password') || '');
    locale = String(formData.get('locale') || 'en').trim();
    rawNext = String(formData.get('next') || '');
  }

  const nextDest = safeCrmRedirect(rawNext, locale);
  const sessionSecret = resolveCrmSessionSecret();
  const check = await verifyCrmCredentialsInput(username, password);

  if (!sessionSecret || !check.configured) {
    if (wantsJson) {
      return NextResponse.json(
        { ok: false, error: 'configuration' },
        { status: 503, headers: { 'Cache-Control': 'private, no-store' } },
      );
    }
    const errorUrl = new URL(crmLoginPath(locale), request.url);
    errorUrl.searchParams.set('error', 'configuration');
    return NextResponse.redirect(errorUrl, 303);
  }

  if (!check.ok) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    if (wantsJson) {
      return NextResponse.json(
        { ok: false, error: 'credentials' },
        { status: 401, headers: { 'Cache-Control': 'private, no-store' } },
      );
    }
    const errorUrl = new URL(crmLoginPath(locale), request.url);
    errorUrl.searchParams.set('error', 'credentials');
    errorUrl.searchParams.set('next', nextDest);
    return NextResponse.redirect(errorUrl, 303);
  }

  const token = await createCrmSessionToken(
    check.canonicalUsername,
    sessionSecret,
    Math.floor(Date.now() / 1000),
    check.passwordEpoch,
  );

  if (wantsJson) {
    const response = NextResponse.json({ ok: true, redirectTo: nextDest });
    setSessionCookie(response, token);
    return response;
  }

  const response = NextResponse.redirect(new URL(nextDest, request.url), 303);
  setSessionCookie(response, token);
  return response;
}
