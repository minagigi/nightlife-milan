import { MetadataRoute } from 'next';
import { mockVenues, mockGuides, mockEvents, mockZones } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';
import { romeDayKey, romeDayKeyOffset } from '@/lib/calendarEvents';
import type { Event } from '@/lib/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const locales = ['en', 'it'];

  // Eventi live da Eventbrite — la sitemap NON deve MAI fallire per colpa di
  // un problema con Eventbrite (token assente, rate limit, errore rete):
  // in caso di errore si degrada silenziosamente alla sola sitemap statica
  // (mockEvents + weeklyEvents), come già fanno homepage/calendar.
  let liveEvents: Event[] = [];
  try {
    liveEvents = await fetchEventbriteEvents();
  } catch {
    liveEvents = [];
  }

  // "Ieri" nel fuso di Roma: i mockEvents con data più vecchia restano fuori
  // dalla sitemap (eventi passati non hanno valore SEO e sporcano l'indice).
  const yesterdayKey = romeDayKeyOffset(-1);
  const upcomingMockEvents = mockEvents.filter((event) => romeDayKey(event.dateISO) >= yesterdayKey);

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
    const langPrefix = locale === 'en' ? '' : `/${locale}`;
    
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
      const langPrefix = locale === 'en' ? '' : `/${locale}`;
      const slug = locale === 'it' && venue.slugs.it ? venue.slugs.it : venue.slugs.en;
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
      const langPrefix = locale === 'en' ? '' : `/${locale}`;
      const slug = locale === 'it' && guide.slugs.it ? guide.slugs.it : guide.slugs.en;
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
      const langPrefix = locale === 'en' ? '' : `/${locale}`;
      const slug = locale === 'it' && event.localizedContent.slug.it ? event.localizedContent.slug.it : event.localizedContent.slug.en;
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
    const slugEn = event.localizedContent.slug.en;
    const slugIt = event.localizedContent.slug.it || event.localizedContent.slug.en;
    const lastModified = new Date(event.dateISO);
    sitemapEntries.push({
      url: `${baseUrl}/events/${slugEn}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });
    sitemapEntries.push({
      url: `${baseUrl}/it/events/${slugIt}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // 5. Dynamic Zones (from mockZones data)
  mockZones.forEach((zone) => {
    locales.forEach((locale) => {
      const langPrefix = locale === 'en' ? '' : `/${locale}`;
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
      const langPrefix = locale === 'en' ? '' : `/${locale}`;
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
      const langPrefix = locale === 'en' ? '' : `/${locale}`;
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
