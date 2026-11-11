import { MetadataRoute } from 'next';
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

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const contentModified = new Date('2026-10-30T00:00:00+01:00');
  const locales: LocaleCode[] = indexedLocaleCodes;

  const physicalEvents: Event[] = dedupeEventsByIdentity(
    mockEvents.map((event) => ({ event }))
  ).map(({ event }) => event);

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 0. Halloween 2026 & Capodanno 2027 Hubs across all 35 locales
  for (const locale of locales) {
    sitemapEntries.push({
      url: `${baseUrl}${halloweenPath(locale)}`,
      lastModified: contentModified,
      changeFrequency: 'daily',
      priority: 0.92,
    });
    CAPODANNO_CATEGORY_IDS.forEach((catId) => {
      sitemapEntries.push({
        url: `${baseUrl}${capodannoCategoryPath(catId, locale)}`,
        lastModified: contentModified,
        changeFrequency: 'daily',
        priority: catId === 'capodanno-2027' ? 0.95 : 0.9,
      });
    });
  }

  // 1. Static Routes — ordered by SEO priority (includes Football Afterparties, MFW, October 2026, 9-Pillar routes)
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/vip-tables', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/concierge', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/clubs', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/events/tonight', priority: 0.95, changeFrequency: 'hourly' as const },
    { path: '/events/this-week', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/october-2026', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/best', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/events/international', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/university-erasmus', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/18-plus', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/21-plus', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/aperitivo', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/events', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/events/past', priority: 0.6, changeFrequency: 'daily' as const },
    { path: '/events/special', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/bottle-prices', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/door-policy', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/zones', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/genres', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/rooftops', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/private-parties', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/guest-lists', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/football-afterparties', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/concert-afterparties', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/new-years-eve', priority: 0.9, changeFrequency: 'weekly' as const },
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
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}${locPath}`,
        lastModified: contentModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  // 2. Dynamic Venues
  mockVenues.forEach((venue) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getLocalizedVenueSlug35(venue.slugs.en, locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('clubs', locale)}/${slug}`,
        lastModified: contentModified,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  // 3. Dynamic Guides
  mockGuides.forEach((guide) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getExistingGuideSlug35(guide.id, locale) || getLocalizedText(guide.slugs, locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('guides', locale)}/${slug}`,
        lastModified: guide.dateModified ? new Date(guide.dateModified) : new Date(guide.datePublished),
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  // 4. Physical Events
  physicalEvents.forEach((event) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getLocalizedText(event.localizedContent.slug, locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('events', locale)}/${slug}`,
        lastModified: new Date(event.dateISO),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // 4b. October 2026 Xceed verified dated events (315 events)
  OCTOBER_EVENTS.forEach((event) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: octoberEventCanonical(event, locale),
        lastModified: contentModified,
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // 4c. Capodanno 2027 detail pages (all 112 events)
  for (const ev of CAPODANNO_EVENTS) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}${capodannoEventPath(ev.slug, locale)}`,
        lastModified: contentModified,
        changeFrequency: 'daily',
        priority: 0.9,
      });
    }
  }

  // 4d. Editorial Event Batch Profiles
  const editorialEventProfiles = [
    ...SITE_ONLY_EVENT_PROFILES,
    ...EVENT_BATCH_PROFILES.filter((profile) => profile.indexedLocales && profile.indexedLocales.length > 0),
  ];
  editorialEventProfiles.forEach((profile) => {
    const indexedSiteLocales = profile.indexedLocales
      || (profile.siteLocales || []).filter((siteLocale) => indexedLocaleCodes.includes(siteLocale));
    indexedSiteLocales.forEach((siteLocale) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix(siteLocale)}/${getLocalizedDir35('events', siteLocale)}/${getEventBatchSlug(profile, siteLocale)}`,
        lastModified: new Date(`${profile.dateISO}T00:00:00+02:00`),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // 5. Dynamic Zones
  mockZones.forEach((zone) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('zones', locale)}/${getLocalizedZoneSlug35(zone.slug, locale)}`,
        lastModified: contentModified,
        changeFrequency: 'monthly',
        priority: 0.75,
      });
    });
  });

  // 6. Genre Pages
  const genreSlugs = ['techno', 'house', 'afro-house', 'hip-hop', 'reggaeton', 'commercial', 'dinner-show', 'edm', 'live-music', 'indie'];
  genreSlugs.forEach((slug) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('genres', locale)}/${getLocalizedGenreSlug35(slug, locale)}`,
        lastModified: contentModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // 7. Weekly Events Matrix
  weeklyEvents.forEach((event) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const rawSlug = `${event.clubSlug}-${event.day}-${event.eventSlug}`;
      const locSlug = getLocalizedEventSlug35(rawSlug, locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/${getLocalizedDir35('events', locale)}/${locSlug}`,
        lastModified: contentModified,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of sitemapEntries) {
    const current = unique.get(entry.url);
    if (!current || (entry.priority || 0) > (current.priority || 0)) {
      unique.set(entry.url, entry);
    }
  }
  return Array.from(unique.values()).sort((a, b) => a.url.localeCompare(b.url));
}
