import { NextResponse } from 'next/server';
import {
  assertSameOriginRequest,
  issueCrmRecoveryChallenge,
  resolveRequestOrigin,
} from '@/lib/crmAuthVault';
import { crmLoginPath } from '@/lib/crmSession';

export const runtime = 'nodejs';

const MIN_UNIFORM_RESPONSE_MS = 450;

function isValidEmailSyntax(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length >= 5 && trimmed.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  if (!assertSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, error: 'forbidden' },
      { status: 403, headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  const wantsJson = contentType.includes('application/json');

  let email = '';
  let locale = 'en';

  if (wantsJson) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    email = String(body.email || '').trim();
    locale = String(body.locale || 'en').trim();
  } else {
    const formData = await request.formData();
    email = String(formData.get('email') || '').trim();
    locale = String(formData.get('locale') || 'en').trim();
  }

  if (!isValidEmailSyntax(email)) {
    if (wantsJson) {
      return NextResponse.json(
        { ok: false, error: 'invalid_email' },
        { status: 400, headers: { 'Cache-Control': 'private, no-store' } },
      );
    }
    const url = new URL(crmLoginPath(locale), request.url);
    url.searchParams.set('tab', 'recover');
    url.searchParams.set('error', 'invalid_email');
    return NextResponse.redirect(url, 303);
  }

  try {
    await issueCrmRecoveryChallenge(email, locale, resolveRequestOrigin(request));
  } catch {
    // Uniform public response to avoid leaking configuration or delivery state.
  }

  const elapsed = Date.now() - startedAt;
  if (elapsed < MIN_UNIFORM_RESPONSE_MS) {
    await new Promise((resolve) => setTimeout(resolve, MIN_UNIFORM_RESPONSE_MS - elapsed));
  }

  if (wantsJson) {
    return NextResponse.json(
      { ok: true },
      { headers: { 'Cache-Control': 'private, no-store' } },
    );
  }

  const doneUrl = new URL(crmLoginPath(locale), request.url);
  doneUrl.searchParams.set('tab', 'recover');
  doneUrl.searchParams.set('sent', '1');
  return NextResponse.redirect(doneUrl, 303);
}
