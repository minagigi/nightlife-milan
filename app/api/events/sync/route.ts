import { NextResponse } from 'next/server';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';

// Called by Vercel cron every hour — also callable manually
export async function GET(request: Request) {
  // Protect with cron secret in production
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const events = await fetchEventbriteEvents();

  return NextResponse.json({
    ok: true,
    count: events.length,
    updated: new Date().toISOString(),
    events: events.slice(0, 5).map(e => ({
      id: e.id,
      title: e.localizedContent.title.en,
      date: e.dateISO,
      venue: e.venueId,
      image: e.image ? 'yes' : 'no',
    })),
  });
}
