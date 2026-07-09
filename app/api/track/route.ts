import { NextRequest, NextResponse } from 'next/server';
import { recordEvent } from '@/lib/analyticsStore';

export const runtime = 'nodejs';

/**
 * Ingest first-party per la dashboard /analytics — riceve i beacon di
 * lib/analytics.ts (sendBeacon manda text/plain, quindi req.text() + parse,
 * niente req.json()). Un blob append-only per evento; la compattazione la fa
 * il cron /api/analytics/aggregate.
 */

const ALLOWED_NAMES = new Set([
  'pageview',
  'whatsapp_click',
  'booking_form_submit',
  'xceed_click',
  'eventbrite_click',
]);

const BOT_RE = /bot|crawl|spider|slurp|lighthouse|headless|pingdom|monitor|preview|facebookexternalhit/i;

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get('user-agent') || '';
    if (BOT_RE.test(ua)) return new NextResponse(null, { status: 204 });

    const body = JSON.parse(await request.text()) as {
      name?: string;
      params?: Record<string, string | number>;
      path?: string;
    };
    if (!body?.name || !ALLOWED_NAMES.has(body.name)) {
      return new NextResponse(null, { status: 204 });
    }

    // Solo campi noti, troncati — mai PII (nome/email non vengono mandati dal client)
    const p = body.params || {};
    const params: Record<string, string | undefined> = {
      page_path: typeof p.page_path === 'string' ? p.page_path.slice(0, 200) : undefined,
      source: typeof p.source === 'string' ? p.source.slice(0, 60) : undefined,
      referrer: typeof p.referrer === 'string' ? p.referrer.slice(0, 100) : undefined,
      venue: typeof p.venue === 'string' ? p.venue.slice(0, 80) : undefined,
      event_slug: typeof p.event_slug === 'string' ? p.event_slug.slice(0, 120) : undefined,
    };

    await recordEvent({ name: body.name, params, path: body.path?.slice(0, 200) });
  } catch {
    // ingest best-effort: mai propagare errori al client
  }
  return new NextResponse(null, { status: 204 });
}
