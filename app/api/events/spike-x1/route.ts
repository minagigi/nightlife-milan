import { NextResponse } from 'next/server';
import { scoutXceedEvents } from '@/lib/xceedScout';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

/**
 * FASE X1 (piano Xceed) — spike diagnostico one-off: verifica che il parser
 * HTTP di lib/xceedScout.ts estragga correttamente i 14 eventi reali della
 * settimana dai 3 venue affiliati. Nessuna scrittura, solo GET. Non è parte
 * della pipeline di produzione.
 *
 * Auth: Authorization: Bearer CRON_SECRET  o  ?secret=INDEXING_SECRET
 * Uso: ?days=N (default 7)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;
  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const days = parseInt(searchParams.get('days') || '7', 10);
  const events = await scoutXceedEvents(days);

  return NextResponse.json({
    count: events.length,
    byVenue: events.reduce((acc: Record<string, number>, e) => {
      acc[e.venueId] = (acc[e.venueId] || 0) + 1;
      return acc;
    }, {}),
    events: events.map((e) => ({
      venueId: e.venueId,
      name: e.name,
      startISO: e.startISO,
      ageRange: e.ageRange,
      dressCode: e.dressCode,
      doorsOpen: e.doorsOpen,
      offersCount: e.offers.length,
      offers: e.offers,
      imageUrl: e.imageUrl,
      affiliateUrl: e.affiliateUrl,
      descriptionLength: e.description.length,
      genres: e.genres,
    })),
  });
}
