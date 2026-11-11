import type { MetadataRoute } from 'next';
import { mockVenues, mockGuides, mockEvents, mockZones } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { dedupeEventsByIdentity } from '@/lib/calendarEvents';
import { indexedLocaleCodes, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedText } from '@/lib/seo';
import type { Event } from '@/lib/types';
import { EVENT_BATCH_PROFILES, getEventBatchSlug, SITE_ONLY_EVENT_PROFILES } from '@/lib/eventBatchProfiles';
import { CAPODANNO_EVENTS } from '@/lib/capodannoEvents';
import { CAPODANNO_CATEGORY_IDS, capodannoCategoryPath, capodannoEventPath } from '@/lib/capodanno/routes';
import { halloweenPath } from '@/lib/halloween/routes';
import { OCTOBER_EVENTS } from '@/lib/octoberEvents';
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

export const SITEMAP_LAST_MODIFIED = new Date('2026-11-11T12:00:00+01:00');

function getBaseUrl(): string {
  return process.env.APP_URL || 'https://nightlifemilan.com';
}

export function dedupeAndSortSitemap(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of entries) {
    const current = unique.get(entry.url);
    if (!current || (entry.priority || 0) > (current.priority || 0)) {
      unique.set(entry.url, entry);
    }
  }
  return Array.from(unique.values()).sort((a, b) => a.url.localeCompare(b.url));
}

export function buildCoreHubSitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${baseUrl}${halloweenPath(locale)}`,
      lastModified: SITEMAP_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

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
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
}

export function buildClubsSitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];

  mockVenues.forEach((venue) => {
    const priority = venue.isManaged || venue.isPriority ? 0.92 : 0.82;
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getLocalizedVenueSlug35(venue.slugs.en, locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('clubs', locale)}/${slug}`,
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
}

export function buildCapodannoSitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    CAPODANNO_CATEGORY_IDS.forEach((catId) => {
      entries.push({
        url: `${baseUrl}${capodannoCategoryPath(catId, locale)}`,
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: 'daily',
        priority: catId === 'capodanno-2027' ? 0.98 : 0.92,
      });
    });
  }

  for (const ev of CAPODANNO_EVENTS) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}${capodannoEventPath(ev.slug, locale)}`,
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: 'daily',
        priority: 0.9,
      });
    }
  }

  return dedupeAndSortSitemap(entries);
}

export function buildEventsSitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];
  const nowMs = SITEMAP_LAST_MODIFIED.getTime();

  const physicalEvents: Event[] = dedupeEventsByIdentity(
    mockEvents.map((event) => ({ event })),
  ).map(({ event }) => event);

  physicalEvents.forEach((event) => {
    const isUpcoming = Date.parse(event.endDateISO || event.dateISO) >= nowMs;
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const rawSlug = getLocalizedText(event.localizedContent.slug, locale);
      const slug = getLocalizedEventSlug35(rawSlug, locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('events', locale)}/${slug}`,
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: isUpcoming ? 'daily' : 'monthly',
        priority: isUpcoming ? 0.92 : 0.65,
      });
    });
  });

  OCTOBER_EVENTS.forEach((event) => {
    const isUpcoming = Date.parse(event.endISO || event.startISO) >= nowMs;
    locales.forEach((locale) => {
      entries.push({
        url: octoberEventCanonical(event, locale),
        lastModified: SITEMAP_LAST_MODIFIED,
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
        lastModified: SITEMAP_LAST_MODIFIED,
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
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
}

export function buildGuidesTaxonomySitemapEntries(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const locales: LocaleCode[] = indexedLocaleCodes;
  const entries: MetadataRoute.Sitemap = [];

  mockGuides.forEach((guide) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getExistingGuideSlug35(guide.id, locale) || getLocalizedText(guide.slugs, locale);
      entries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('guides', locale)}/${slug}`,
        lastModified: SITEMAP_LAST_MODIFIED,
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
        lastModified: SITEMAP_LAST_MODIFIED,
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
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    });
  });

  return dedupeAndSortSitemap(entries);
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

function escapeXml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function renderSitemapXml(entries: MetadataRoute.Sitemap): string {
  const rows = entries.map((entry) => {
    const loc = escapeXml(entry.url);
    const lastMod = entry.lastModified
      ? (entry.lastModified instanceof Date ? entry.lastModified.toISOString() : String(entry.lastModified))
      : SITEMAP_LAST_MODIFIED.toISOString();
    const freq = entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : '';
    const prio = typeof entry.priority === 'number' ? `<priority>${entry.priority.toFixed(2)}</priority>` : '';
    return `<url><loc>${loc}</loc><lastmod>${escapeXml(lastMod)}</lastmod>${freq}${prio}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
}

export function xmlSitemapResponse(entries: MetadataRoute.Sitemap): Response {
  return new Response(renderSitemapXml(entries), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
