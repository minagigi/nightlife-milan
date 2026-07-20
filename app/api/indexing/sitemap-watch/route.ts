import { NextResponse } from 'next/server';
import { submitProductionSitemap } from '@/lib/googleIndexing';
import {
  acquireSitemapWatchLease,
  extractSitemapUrls,
  readSitemapWatchState,
  runSitemapWatchCycle,
  sitemapWatchStorageConfigured,
  writeSitemapWatchState,
} from '@/lib/sitemapWatcher';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
const SITEMAP_URL = `${BASE}/sitemap.xml`;

function authorized(request: Request): boolean {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  const cron = Boolean(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`);
  const manual = Boolean(
    process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET,
  );
  return cron || manual;
}

async function fetchLiveSitemap(): Promise<string> {
  const response = await fetch(SITEMAP_URL, {
    cache: 'no-store',
    headers: { 'User-Agent': 'NightlifeMilan-Sitemap-Watcher/1.0' },
  });
  if (!response.ok) throw new Error(`Sitemap fetch failed (${response.status})`);
  return response.text();
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  if (!sitemapWatchStorageConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Sitemap watcher storage is not configured' },
      { status: 503 },
    );
  }
  if (!process.env.GOOGLE_INDEXING_CREDENTIALS) {
    return NextResponse.json(
      { ok: false, error: 'Google Search Console credentials are not configured' },
      { status: 503 },
    );
  }

  try {
    const checkedAt = new Date().toISOString();
    const result = await runSitemapWatchCycle({
      acquire: acquireSitemapWatchLease,
      observe: async () => extractSitemapUrls(await fetchLiveSitemap(), BASE),
      read: readSitemapWatchState,
      save: writeSitemapWatchState,
      submit: () => submitProductionSitemap(SITEMAP_URL),
      sitemapUrl: SITEMAP_URL,
      now: () => checkedAt,
    });

    return NextResponse.json({
      ...result,
      checkedAt,
      addedUrls: result.addedUrls.slice(0, 50),
      removedUrls: result.removedUrls.slice(0, 50),
      addedUrlCount: result.addedUrls.length,
      removedUrlCount: result.removedUrls.length,
    }, { status: result.ok ? 200 : 502 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[sitemap-watch]', message);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
