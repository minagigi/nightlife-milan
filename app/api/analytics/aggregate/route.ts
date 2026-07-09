import { NextResponse } from 'next/server';
import { aggregateRaw } from '@/lib/analyticsStore';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Cron notturno (04:30 UTC, vercel.json): compatta i blob raw di /api/track
 * nei riepiloghi giornalieri analytics/daily/{giorno}.json e cancella i raw.
 *
 * Auth: Authorization: Bearer CRON_SECRET (Vercel cron)
 *    o  ?secret=INDEXING_SECRET (trigger manuale, stessa convenzione di /api/events/import)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;
  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await aggregateRaw();
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
