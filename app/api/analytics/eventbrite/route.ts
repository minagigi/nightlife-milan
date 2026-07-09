import { NextResponse } from 'next/server';
import { putEbSnapshot } from '@/lib/analyticsStore';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Cron giornaliero (04:00 UTC, vercel.json): snapshot registrazioni Eventbrite
 * (venduti per ticket class, capienza) per ogni evento dell'org — live +
 * terminati negli ultimi 45 giorni. La sequenza di snapshot in
 * analytics/eventbrite/ è la curva di registrazione nel tempo mostrata dalla
 * dashboard /analytics (la lettura "adesso" invece è live a ogni apertura).
 *
 * Auth: come /api/analytics/aggregate (Bearer CRON_SECRET o ?secret=INDEXING_SECRET).
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
    const snapshot = await putEbSnapshot();
    if (!snapshot) {
      return NextResponse.json({ ok: false, error: 'BLOB_READ_WRITE_TOKEN not set' }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      date: snapshot.date,
      events: snapshot.events.length,
      totalSold: snapshot.events.reduce((s, e) => s + e.sold, 0),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
