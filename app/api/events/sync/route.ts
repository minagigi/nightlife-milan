import { NextResponse } from 'next/server';
import { fetchEventbriteEvents, debugEventbrite } from '@/lib/eventbriteSync';
import { notifyUrls, submitProductionSitemap } from '@/lib/googleIndexing';
import { mockEvents } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { indexedLocaleCodes, localePrefix } from '@/lib/i18n/locales';
import { getLocalizedText } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = process.env.APP_URL || 'https://nightlifemilan.com';
// Lingue attive dal registry unico (lib/i18n/locales.ts).
const LOCALES: readonly string[] = indexedLocaleCodes;
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
      ? await submitProductionSitemap(`${BASE}/sitemap.xml`)
      : { ok: false, status: 0, error: 'Google credentials are not configured' };

    if (!sitemap.ok) {
      console.error('[events/sync] sitemap submission failed', {
        status: sitemap.status,
        error: sitemap.error,
      });
    }

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

  // 2. Build all indexable event URLs (Eventbrite + static + weekly)
  const rawUrls: string[] = [];

  ebEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const slug = getLocalizedText(ev.localizedContent.slug, locale);
      if (slug) rawUrls.push(`${BASE}${localePrefix(locale)}/events/${slug}`);
    });
  });

  mockEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const slug = getLocalizedText(ev.localizedContent.slug, locale);
      if (slug) rawUrls.push(`${BASE}${localePrefix(locale)}/events/${slug}`);
    });
  });

  weeklyEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      rawUrls.push(`${BASE}${localePrefix(locale)}/events/${ev.clubSlug}-${ev.day}-${ev.eventSlug}`);
    });
  });

  const urls = Array.from(new Set(rawUrls));

  // 3. Keep the legacy URL notifications separate from sitemap submission.
  // The sitemap is validated and submitted exactly once by the 18:00 UTC job.
  let indexing: { total: number; succeeded: number; failed: number } = { total: 0, succeeded: 0, failed: 0 };
  let sitemap: { ok: boolean; status: number; error?: string } = { ok: false, status: 0 };

  if (process.env.GOOGLE_INDEXING_CREDENTIALS) {
    const indexResults = await notifyUrls(urls, 'URL_UPDATED');
    indexing = {
      total:     indexResults.length,
      succeeded: indexResults.filter((r) => r.ok).length,
      failed:    indexResults.filter((r) => !r.ok).length,
    };
    sitemap = { ok: false, status: 0, error: 'Deferred to the protected daily sitemap submitter at 18:00 UTC' };
  }

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
