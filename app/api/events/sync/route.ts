import { NextResponse } from 'next/server';
import { fetchEventbriteEvents, debugEventbrite } from '@/lib/eventbriteSync';
import { submitSitemap } from '@/lib/googleIndexing';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = process.env.APP_URL || 'https://nightlifemilan.com';
/**
 * The 08:00 UTC cron refreshes Eventbrite data only. The dedicated 18:00 UTC
 * cron calls this route with sitemapOnly=1 and submits the HTTPS sitemap once.
 *
 * Auth: Authorization: Bearer CRON_SECRET  (Vercel cron automatic)
 *    or ?secret=INDEXING_SECRET             (manual trigger)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron   = process.env.CRON_SECRET    && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;

  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Deploy and SEO corrections can resubmit the sitemap without notifying
  // individual ordinary URLs through the Google Indexing API.
  if (searchParams.get('sitemapOnly') === '1') {
    const indexingConfigured = Boolean(process.env.GOOGLE_INDEXING_CREDENTIALS);
    const sitemap = indexingConfigured
      ? await submitSitemap(`${BASE}/`, `${BASE}/sitemap.xml`)
      : { ok: false, status: 0, error: 'Google credentials are not configured' };

    return NextResponse.json({
      ok: sitemap.ok,
      sitemapOnly: true,
      indexingConfigured,
      sitemap,
      updated: new Date().toISOString(),
    }, { status: sitemap.ok ? 200 : 503 });
  }

  // Debug mode: just check Eventbrite token
  if (searchParams.get('debug') === '1') {
    const info = await debugEventbrite();
    return NextResponse.json(info);
  }

  // Fetch live Eventbrite events. Ordinary pages are discovered through the
  // sitemap; this path intentionally does not call the Google Indexing API.
  const ebEvents = await fetchEventbriteEvents();

  return NextResponse.json({
    ok: true,
    ebEventsFound: ebEvents.length,
    searchNotifications: 'disabled_for_ordinary_pages',
    updated: new Date().toISOString(),
    preview: ebEvents.slice(0, 3).map((e) => ({
      id: e.id,
      titleEn: e.localizedContent.title.en,
      titleIt: e.localizedContent.title.it,
      slugEn: e.localizedContent.slug.en,
    })),
  });
}
