import { NextResponse } from 'next/server';
import { assertSameOriginRequest } from '@/lib/crmAuthVault';
import { CRM_SESSION_COOKIE, crmLoginPath } from '@/lib/crmSession';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!assertSameOriginRequest(request)) {
    return new NextResponse('Forbidden', {
      status: 403,
      headers: { 'Cache-Control': 'private, no-store' },
    });
  }

  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  let locale = 'en';
  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    locale = String(body.locale || 'en').trim();
  } else {
    const formData = await request.formData().catch(() => null);
    locale = String(formData?.get('locale') || 'en').trim();
  }

  const url = new URL(crmLoginPath(locale), request.url);
  url.searchParams.set('loggedOut', '1');
  const response = NextResponse.redirect(url, 303);
  response.cookies.set(CRM_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
