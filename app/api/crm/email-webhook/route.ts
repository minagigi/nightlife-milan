import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { dispatchForOrderApiUrl, validateOrderApiUrl } from '@/lib/attendeeEmailDispatch';
import { emailTransportMode } from '@/lib/emailTransport';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

/**
 * Webhook Eventbrite (order.placed) -> dispatch email post-registrazione.
 * Auth via ?k=<secret> (EMAIL_WEBHOOK_SECRET, fallback CRON_SECRET), confronto
 * a tempo costante. Gestito con scripts/manage-attendee-email-webhook.ts.
 */
function authOk(request: Request): boolean {
  const secret = process.env.EMAIL_WEBHOOK_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;

  const { searchParams } = new URL(request.url);
  const provided = searchParams.get('k') || '';

  const expectedBuf = Buffer.from(secret);
  const providedBuf = Buffer.from(provided);
  if (expectedBuf.length !== providedBuf.length) return false;

  return timingSafeEqual(expectedBuf, providedBuf);
}

export async function POST(request: Request) {
  if (!authOk(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: { config?: { action?: string }; action?: string; api_url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const action = body?.config?.action || body?.action || '';
  const apiUrl = body?.api_url;

  if (!action && !apiUrl) {
    return NextResponse.json({ ok: false, error: 'Missing action and api_url' }, { status: 400 });
  }
  if (action && action !== 'order.placed') {
    return NextResponse.json({ ok: true, ignored: action });
  }
  if (!apiUrl) {
    return NextResponse.json({ ok: false, error: 'Missing api_url' }, { status: 400 });
  }

  const normalized = validateOrderApiUrl(apiUrl);
  if (!normalized) {
    return NextResponse.json({ ok: false, error: 'invalid api_url' }, { status: 400 });
  }

  try {
    const report = await dispatchForOrderApiUrl(normalized, { mode: 'webhook' });
    return NextResponse.json({ ...report, ok: true });
  } catch (error) {
    // 500 cosi Eventbrite ritenta la consegna del webhook.
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!authOk(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return NextResponse.json({ ok: true, transport: emailTransportMode() });
}
