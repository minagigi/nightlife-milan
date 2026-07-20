import { NextResponse } from 'next/server';
import {
  dispatchForOrderApiUrl,
  ensureAttendeeEmailWebhook,
  listEventbriteWebhooks,
  secureCompare,
  sweepRecentAttendees,
} from '@/lib/attendeeEmailDispatch';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * Trigger cron/manuale del dispatch email post-registrazione Eventbrite.
 *
 * Auth: Authorization: Bearer CRON_SECRET (Vercel cron)
 *    o  ?secret=INDEXING_SECRET (trigger manuale, stessa convenzione di /api/events/sync)
 *    o  ?k=EMAIL_WEBHOOK_SECRET (fallback CRON_SECRET) — stesso segreto del webhook
 *
 * ?order=<id>            dispatch per un singolo ordine (mode 'manual')
 * (nessun order)          sweep degli attendee recenti (mode 'sweep')
 * ?force=1 ?dryRun=1 ?max=N ?sinceHours=N (solo sweep)
 * ?setupWebhook=1        registra/ruota il webhook order.placed su Eventbrite (self-provisioning)
 * ?listWebhooks=1        elenca i webhook Eventbrite (secret mascherato)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;
  const kParam = searchParams.get('k');
  const kSecret = process.env.EMAIL_WEBHOOK_SECRET || process.env.CRON_SECRET || '';
  const okK = Boolean(kParam && kSecret && secureCompare(kParam, kSecret));

  if (!okCron && !okSecret && !okK) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const noStore = { 'Cache-Control': 'private, no-store' };

  try {
    if (searchParams.get('listWebhooks') === '1') {
      return NextResponse.json({ ok: true, webhooks: await listEventbriteWebhooks() }, { headers: noStore });
    }
    if (searchParams.get('setupWebhook') === '1') {
      if (!kSecret) {
        return NextResponse.json({ ok: false, error: 'No webhook secret configured' }, { status: 500, headers: noStore });
      }
      const base = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
      const endpoint = `${base}/api/crm/email-webhook?k=${encodeURIComponent(kSecret)}`;
      const result = await ensureAttendeeEmailWebhook(endpoint);
      return NextResponse.json({ ok: true, ...result }, { headers: noStore });
    }
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500, headers: noStore },
    );
  }

  const order = searchParams.get('order');
  const force = searchParams.get('force') === '1';
  const dryRun = searchParams.get('dryRun') === '1';

  const maxParam = searchParams.get('max');
  const max = maxParam && /^\d+$/.test(maxParam) ? parseInt(maxParam, 10) : undefined;

  const sinceHoursParam = searchParams.get('sinceHours');
  const sinceHours = sinceHoursParam && /^\d+$/.test(sinceHoursParam) ? parseInt(sinceHoursParam, 10) : undefined;

  try {
    const report = order
      ? await dispatchForOrderApiUrl(`https://www.eventbriteapi.com/v3/orders/${order}/`, { mode: 'manual', force, dryRun, max })
      : await sweepRecentAttendees({ mode: 'sweep', dryRun, max, sinceHours });

    return NextResponse.json(report, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
