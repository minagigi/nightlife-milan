import type { MetadataRoute } from 'next';
import { mockVenues, mockGuides, mockEvents, mockZones } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { dedupeEventsByIdentity } from '@/lib/calendarEvents';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';
import { indexedLocaleCodes, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedText } from '@/lib/seo';
import type { Event } from '@/lib/types';
import { EVENT_BATCH_PROFILES, getEventBatchSlug, SITE_ONLY_EVENT_PROFILES } from '@/lib/eventBatchProfiles';
import { CAPODANNO_EVENTS } from '@/lib/capodannoEvents';
import { CAPODANNO_CATEGORY_IDS, capodannoCategoryPath, capodannoEventPath } from '@/lib/capodanno/routes';
import { halloweenPath } from '@/lib/halloween/routes';
import { OCTOBER_EVENTS, OCTOBER_EVENTS_INVENTORY } from '@/lib/octoberEvents';
import { octoberEventCanonical } from '@/lib/octoberEventSeo';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import {
  getExistingGuideSlug35,
  getLocalizedEventSlug35,
  getLocalizedGenreSlug35,
  getLocalizedSeoPagePath35,
  getLocalizedVenueSlug35,
  getLocalizedZoneSlug35,
} from '@/lib/i18n/localizedSlugs35';

const FALLBACK_CATALOG_TIMESTAMP = '2026-11-12T11:35:00.000Z';

export function clampLastModified(
  candidate?: string | Date | number | null,
  fallbackMs?: number,
): Date {
  const nowMs = Date.now();
  const safeFallback = Math.min(
    Number.isFinite(fallbackMs) ? (fallbackMs as number) : Date.parse(FALLBACK_CATALOG_TIMESTAMP),
    nowMs,
  );
  if (candidate === null || candidate === undefined || candidate === '') {
    return new Date(safeFallback);
  }
  const parsed =
    candidate instanceof Date
      ? candidate.getTime()
      : typeof candidate === 'number'
        ? candidate
        : Date.parse(String(candidate));
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return new Date(safeFallback);
  }
  return new Date(Math.min(parsed, nowMs));
}

export function getCatalogLastModified(): Date {
  return clampLastModified(OCTOBER_EVENTS_INVENTORY?.sourceCheckedAt || FALLBACK_CATALOG_TIMESTAMP);
}

export const SITEMAP_LAST_MODIFIED = getCatalogLastModified();

function getBaseUrl(): string {
  return (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
}

let ebSitemapCache: { at: number; events: Event[] } | null = null;
const EB_SITEMAP_CACHE_TTL_MS = 60 * 1000;

export async function fetchLiveEbEventsForSitemap(timeoutMs = 4000): Promise<Event[]> {
  if (ebSitemapCache && Date.now() - ebSitemapCache.at < EB_SITEMAP_CACHE_TTL_MS) {
    return ebSitemapCache.events;
  }
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const events = await Promise.race<Event[]>([
      fetchEventbriteEvents(),
      new Promise<Event[]>((resolve) => {
        timer = setTimeout(() => resolve([]), timeoutMs);
      }),
    ]);
    const safeEvents = Array.isArray(events) ? events : [];
    ebSitemapCache = { at: Date.now(), events: safeEvents };
    return safeEvents;
  } catch {
    return [];
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function entryLastModMs(entry: MetadataRoute.Sitemap[number]): number {
  if (!entry.lastModified) return 0;
  const ms = entry.lastModified instanceof Date
    ? entry.lastModified.getTime()
    : Date.parse(String(entry.lastModified));
  return Number.isFinite(ms) ? ms : 0;
}

export function dedupeAndSortSitemap(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    const current = unique.get(entry.url);
    if (!current) {
      unique.set(entry.url, entry);
      continue;
    }
    const prioBetter = (entry.priority || 0) > (current.priority || 0);
    const samePrioNewer =
      (entry.priority || 0) === (current.priority || 0) &&
      entryLastModMs(entry) > entryLastModMs(current);
    if (prioBetter || samePrioNewer) {
      unique.set(entry.url, entry);
    }
  }
  return Array.from(unique.values()).sort((a, b) => a.url.localeCompare(b.url));
}

/**
 * Strips optional <changefreq> and <priority> tags (ignored by Googlebot) so large
 * multilingual urlsets stay compact (< 3.8 MB, well below Vercel's 4.5 MB ceiling).
 */
export function toCompactSitemapEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: entry.url,
    lastModified: clampLastModified(entry.lastModified).toISOString().slice(0, 10),
  }));
}

function buildCoreHubEntriesInternal(freshCatalogDate: Date): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];
  const evergreenDate = getCatalogLastModified();

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}${halloweenPath(locale)}`,
      lastModified: evergreenDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  const dynamicHubPaths = new Set([
    '',
    '/clubs',
    '/events/tonight',
    '/events/this-week',
    '/events/october-2026',
    '/events/best',
    '/events/international',
    '/events/university-erasmus',
    '/events/18-plus',
    '/events/21-plus',
    '/events',
    '/events/special',
    '/guest-lists',
    '/football-afterparties',
    '/new-years-eve',
  ]);

  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/vip-tables', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/concierge', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/clubs', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/events/tonight', priority: 0.95, changeFrequency: 'hourly' as const },
    { path: '/events/this-week', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/october-2026', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/events/best', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/events/international', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/university-erasmus', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/18-plus', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/21-plus', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/aperitivo', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/events', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/past', priority: 0.55, changeFrequency: 'weekly' as const },
    { path: '/events/special', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/bottle-prices', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/door-policy', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/zones', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/genres', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/rooftops', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/private-parties', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/guest-lists', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/football-afterparties', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/concert-afterparties', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/new-years-eve', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/fashion-week', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/milan-fashion-week', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/milan-fashion-week/calendar', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  ];

  locales.forEach((locale) => {
    const langPrefix = localePrefix(locale);
    staticRoutes.forEach((route) => {
      const locPath = route.path ? getLocalizedSeoPagePath35(route.path, locale) : '';
      entries.push({
        url: `${baseUrl}${langPrefix}${locPath}`,
        lastModified: dynamicHubPaths.has(route.path) ? freshCatalogDate : evergreenDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
}

export function buildCoreHubSitemapEntries(): MetadataRoute.Sitemap {
  return buildCoreHubEntriesInternal(getCatalogLastModified());
}

export async function buildCoreHubSitemapEntriesAsync(): Promise<MetadataRoute.Sitemap> {
  const ebEvents = await fetchLiveEbEventsForSitemap();
  let latestMs = getCatalogLastModified().getTime();
  for (const ev of ebEvents) {
    if (ev.updatedAt) {
      const ms = clampLastModified(ev.updatedAt, latestMs).getTime();
      if (ms > latestMs) latestMs = ms;
    }
  }
  return buildCoreHubEntriesInternal(new Date(latestMs));
}

function buildClubsEntriesInternal(ebEvents: readonly Event[]): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];
  const catalogLastMod = getCatalogLastModified();

  const latestByVenueId = new Map<string, Date>();
  for (const ev of ebEvents) {
    if (!ev.venueId || !ev.updatedAt) continue;
    const candidate = clampLastModified(ev.updatedAt, catalogLastMod.getTime());
    const prev = latestByVenueId.get(ev.venueId);
    if (!prev || candidate.getTime() > prev.getTime()) {
      latestByVenueId.set(ev.venueId, candidate);
    }
  }

  mockVenues.forEach((venue) => {
    const priority = venue.isManaged || venue.isPriority ? 0.95 : 0.88;
    const venueLastMod = latestByVenueId.get(venue.id) || catalogLastMod;
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getLocalizedVenueSlug35(venue.slugs.en, locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('clubs', locale)}/${slug}`,
        lastModified: venueLastMod,
        changeFrequency: 'weekly',
        priority,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
}

export function buildClubsSitemapEntries(): MetadataRoute.Sitemap {
  return buildClubsEntriesInternal([]);
}

export async function buildClubsSitemapEntriesAsync(): Promise<MetadataRoute.Sitemap> {
  const ebEvents = await fetchLiveEbEventsForSitemap();
  return buildClubsEntriesInternal(ebEvents);
}

export function buildCapodannoSitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];
  const catalogLastMod = getCatalogLastModified();

  for (const locale of locales) {
    CAPODANNO_CATEGORY_IDS.forEach((catId) => {
      entries.push({
        url: `${baseUrl}${capodannoCategoryPath(catId, locale)}`,
        lastModified: catalogLastMod,
        changeFrequency: 'daily',
        priority: catId === 'capodanno-2027' ? 0.98 : 0.92,
      });
    });
  }

  for (const ev of CAPODANNO_EVENTS) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}${capodannoEventPath(ev.slug, locale)}`,
        lastModified: catalogLastMod,
        changeFrequency: 'daily',
        priority: 0.9,
      });
    }
  }

  return dedupeAndSortSitemap(entries);
}

export async function buildCapodannoSitemapEntriesAsync(): Promise<MetadataRoute.Sitemap> {
  return buildCapodannoSitemapEntries();
}

function buildEventsEntriesInternal(ebEvents: readonly Event[]): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];
  const catalogLastMod = getCatalogLastModified();
  const nowMs = Date.now();

  const physicalEvents: Event[] = dedupeEventsByIdentity([
    ...ebEvents.map((event) => ({ event })),
    ...mockEvents.map((event) => ({ event })),
  ]).map(({ event }) => event);

  physicalEvents.forEach((event) => {
    const isUpcoming = Date.parse(event.endDateISO || event.dateISO) >= nowMs;
    const evLastMod = clampLastModified(event.updatedAt, catalogLastMod.getTime());
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const rawSlug = getLocalizedText(event.localizedContent.slug, locale);
      if (!rawSlug) return;
      const slug = getLocalizedEventSlug35(rawSlug, locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('events', locale)}/${slug}`,
        lastModified: evLastMod,
        changeFrequency: isUpcoming ? 'daily' : 'monthly',
        priority: isUpcoming ? 0.92 : 0.65,
      });
    });
  });

  const archiveCutoffMs = nowMs - 7 * 86400000;
  const archiveCoreLocales: readonly LocaleCode[] = ['it', 'en', 'es', 'fr', 'de', 'pt'];

  OCTOBER_EVENTS.forEach((event) => {
    const endMs = Date.parse(event.endISO || event.startISO);
    const isUpcoming = endMs >= nowMs;
    const targetLocales = endMs >= archiveCutoffMs ? locales : archiveCoreLocales;
    targetLocales.forEach((locale) => {
      entries.push({
        url: octoberEventCanonical(event, locale),
        lastModified: catalogLastMod,
        changeFrequency: isUpcoming ? 'daily' : 'monthly',
        priority: isUpcoming ? 0.92 : 0.6,
      });
    });
  });

  const editorialEventProfiles = [
    ...SITE_ONLY_EVENT_PROFILES,
    ...EVENT_BATCH_PROFILES.filter((profile) => profile.indexedLocales && profile.indexedLocales.length > 0),
  ];
  editorialEventProfiles.forEach((profile) => {
    const indexedSiteLocales = profile.indexedLocales
      || (profile.siteLocales || []).filter((siteLocale) => indexedLocaleCodes.includes(siteLocale));
    const evDate = new Date(`${profile.dateISO}T00:00:00+02:00`);
    const isUpcoming = evDate.getTime() + 86400000 >= nowMs;
    indexedSiteLocales.forEach((siteLocale) => {
      entries.push({
        url: `${baseUrl}${localePrefix(siteLocale)}/${getLocalizedDir35('events', siteLocale)}/${getEventBatchSlug(profile, siteLocale)}`,
        lastModified: catalogLastMod,
        changeFrequency: isUpcoming ? 'daily' : 'monthly',
        priority: isUpcoming ? 0.9 : 0.6,
      });
    });
  });

  weeklyEvents.forEach((event) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const rawSlug = `${event.clubSlug}-${event.day}-${event.eventSlug}`;
      const locSlug = getLocalizedEventSlug35(rawSlug, locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('events', locale)}/${locSlug}`,
        lastModified: catalogLastMod,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
}

export function buildEventsSitemapEntries(): MetadataRoute.Sitemap {
  return buildEventsEntriesInternal([]);
}

export async function buildEventsSitemapEntriesAsync(): Promise<MetadataRoute.Sitemap> {
  const ebEvents = await fetchLiveEbEventsForSitemap();
  return buildEventsEntriesInternal(ebEvents);
}

export function buildGuidesTaxonomySitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];
  const catalogLastMod = getCatalogLastModified();

  mockGuides.forEach((guide) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getExistingGuideSlug35(guide.id, locale) || getLocalizedText(guide.slugs, locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('guides', locale)}/${slug}`,
        lastModified: catalogLastMod,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  mockZones.forEach((zone) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('zones', locale)}/${getLocalizedZoneSlug35(zone.slug, locale)}`,
        lastModified: catalogLastMod,
        changeFrequency: 'monthly',
        priority: 0.78,
      });
    });
  });

  const genreSlugs = ['techno', 'house', 'afro-house', 'hip-hop', 'reggaeton', 'commercial', 'dinner-show', 'edm', 'live-music', 'indie'];
  genreSlugs.forEach((slug) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('genres', locale)}/${getLocalizedGenreSlug35(slug, locale)}`,
        lastModified: catalogLastMod,
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
}

export async function buildGuidesTaxonomySitemapEntriesAsync(): Promise<MetadataRoute.Sitemap> {
  return buildGuidesTaxonomySitemapEntries();
}

export function buildAllSitemapEntries(): MetadataRoute.Sitemap {
  return dedupeAndSortSitemap([
    ...buildCoreHubSitemapEntries(),
    ...buildClubsSitemapEntries(),
    ...buildCapodannoSitemapEntries(),
    ...buildEventsSitemapEntries(),
    ...buildGuidesTaxonomySitemapEntries(),
  ]);
}

export async function buildAllSitemapEntriesAsync(): Promise<MetadataRoute.Sitemap> {
  const ebEvents = await fetchLiveEbEventsForSitemap();
  let latestMs = getCatalogLastModified().getTime();
  for (const ev of ebEvents) {
    if (ev.updatedAt) {
      const ms = clampLastModified(ev.updatedAt, latestMs).getTime();
      if (ms > latestMs) latestMs = ms;
    }
  }
  return dedupeAndSortSitemap([
    ...buildCoreHubEntriesInternal(new Date(latestMs)),
    ...buildClubsEntriesInternal(ebEvents),
    ...buildCapodannoSitemapEntries(),
    ...buildEventsEntriesInternal(ebEvents),
    ...buildGuidesTaxonomySitemapEntries(),
  ]);
}

function escapeXml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export interface RenderSitemapXmlOptions {
  compact?: boolean;
}

export function renderSitemapXml(
  entries: MetadataRoute.Sitemap,
  options?: RenderSitemapXmlOptions,
): string {
  const compact = Boolean(options?.compact);
  const rows = entries.map((entry) => {
    const loc = escapeXml(entry.url);
    const clampedDate = clampLastModified(entry.lastModified);
    if (compact) {
      const shortDate = clampedDate.toISOString().slice(0, 10);
      return `<url><loc>${loc}</loc><lastmod>${escapeXml(shortDate)}</lastmod></url>`;
    }
    const lastMod = clampedDate.toISOString();
    const freq = entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : '';
    const prio = typeof entry.priority === 'number' ? `<priority>${entry.priority.toFixed(2)}</priority>` : '';
    return `<url><loc>${loc}</loc><lastmod>${escapeXml(lastMod)}</lastmod>${freq}${prio}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
}

export function xmlSitemapResponse(
  entries: MetadataRoute.Sitemap,
  options?: RenderSitemapXmlOptions,
): Response {
  return new Response(renderSitemapXml(entries, options), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

export interface SitemapIndexEntry {
  loc: string;
  lastModified?: string | Date;
}

export function renderSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  const rows = entries.map((entry) => {
    const loc = escapeXml(entry.loc);
    const lastMod = clampLastModified(entry.lastModified).toISOString();
    return `<sitemap><loc>${loc}</loc><lastmod>${escapeXml(lastMod)}</lastmod></sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</sitemapindex>\n`;
}

export async function buildSitemapIndexEntriesAsync(): Promise<SitemapIndexEntry[]> {
  const baseUrl = getBaseUrl();
  const catalogDate = getCatalogLastModified();
  let latestMs = catalogDate.getTime();
  const ebEvents = await fetchLiveEbEventsForSitemap();
  for (const ev of ebEvents) {
    if (ev.updatedAt) {
      const ms = clampLastModified(ev.updatedAt, latestMs).getTime();
      if (ms > latestMs) latestMs = ms;
    }
  }
  const latestEventDate = new Date(latestMs);
  return [
    { loc: `${baseUrl}/sitemap-core.xml`, lastModified: latestEventDate },
    { loc: `${baseUrl}/sitemap-clubs.xml`, lastModified: latestEventDate },
    { loc: `${baseUrl}/sitemap-events.xml`, lastModified: latestEventDate },
    { loc: `${baseUrl}/sitemap-capodanno.xml`, lastModified: catalogDate },
    { loc: `${baseUrl}/sitemap-guides.xml`, lastModified: catalogDate },
  ];
}

export function xmlSitemapIndexResponse(entries: SitemapIndexEntry[]): Response {
  return new Response(renderSitemapIndexXml(entries), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
