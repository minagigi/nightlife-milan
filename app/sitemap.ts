import { MetadataRoute } from 'next';
import { mockVenues, mockGuides, mockEvents, mockZones } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';
import { romeDayKey, romeDayKeyOffset } from '@/lib/calendarEvents';
import { indexedLocaleCodes, localePrefix } from '@/lib/i18n/locales';
import { getLocalizedText } from '@/lib/seo';
import type { Event } from '@/lib/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  // Lingue attive dal registry unico — la sitemap si estende da sola quando
  // una lingua viene attivata in lib/i18n/locales.ts.
  const locales: string[] = indexedLocaleCodes;

  // Eventi live da Eventbrite — la sitemap NON deve MAI fallire per colpa di
  // un problema con Eventbrite (token assente, rate limit, errore rete):
  // in caso di errore si degrada silenziosamente alla sola sitemap statica
  // (mockEvents + weeklyEvents), come già fanno homepage/calendar.
  // includePast=true (2026-07-11, richiesta SEO): le pagine degli eventi PASSATI
  // non devono mai sparire dall'indice — restano accessibili e indicizzate,
  // solo fuori dai menu/liste attive (vedi /events/past). Quindi la sitemap
  // include anche i passati.
  let liveEvents: Event[] = [];
  try {
    liveEvents = await fetchEventbriteEvents(true);
  } catch {
    liveEvents = [];
  }

  // Tutti i mockEvents (anche passati) restano in sitemap per la SEO.
  const upcomingMockEvents = mockEvents;

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Routes — ordered by SEO priority
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/vip-tables', priority: 0.95, changeFrequency: 'weekly' as const },
    { path: '/concierge', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/clubs', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/events/tonight', priority: 0.95, changeFrequency: 'hourly' as const },
    { path: '/events/this-week', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/events/best', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/calendar/tonight', priority: 0.7, changeFrequency: 'hourly' as const },
    { path: '/calendar/this-week', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/aperitivo', priority: 0.85, changeFrequency: 'weekly' as const },
    { path: '/events', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/events/past', priority: 0.6, changeFrequency: 'daily' as const },
    { path: '/events/special', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/bottle-prices', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/door-policy', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/zones', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  ];
  
  locales.forEach((locale) => {
    const langPrefix = localePrefix(locale);

    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    });
  });

  // 2. Dynamic Venues
  mockVenues.forEach((venue) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getLocalizedText(venue.slugs, locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/clubs/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // 3. Dynamic Guides
  mockGuides.forEach((guide) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getLocalizedText(guide.slugs, locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/guides/${slug}`,
        lastModified: guide.dateModified ? new Date(guide.dateModified) : new Date(guide.datePublished),
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    });
  });

  // 4. Dynamic Events (mockEvents statici, esclusi quelli più vecchi di ieri)
  upcomingMockEvents.forEach((event) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = getLocalizedText(event.localizedContent.slug, locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/events/${slug}`,
        lastModified: new Date(event.dateISO),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // 4b. Dynamic Events — live da Eventbrite (scout + Xceed)
  liveEvents.forEach((event) => {
    const lastModified = new Date(event.dateISO);
    locales.forEach((locale) => {
      const slug = getLocalizedText(event.localizedContent.slug, locale);
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix(locale)}/events/${slug}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  });

  // 5. Dynamic Zones (from mockZones data)
  mockZones.forEach((zone) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/zones/${zone.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // 6. Genre Pages
  const genreSlugs = ['techno', 'house', 'hip-hop', 'reggaeton', 'commercial', 'edm', 'live-music', 'indie'];
  genreSlugs.forEach((slug) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/genres/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.65,
      });
    });
  });

  // 7. Weekly Events Matrix
  weeklyEvents.forEach((event) => {
    locales.forEach((locale) => {
      const langPrefix = localePrefix(locale);
      const slug = `${event.clubSlug}-${event.day}-${event.eventSlug}`;
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/events/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  return sitemapEntries;
}
