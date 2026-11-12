import { MetadataRoute } from 'next';
import { EVENT_BATCH_PROFILES, getEventBatchSlug, SITE_ONLY_EVENT_PROFILES } from '@/lib/eventBatchProfiles';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedSeoPagePath35 } from '@/lib/i18n/localizedSlugs35';
import { indexedLocaleCodes, localePrefix } from '@/lib/i18n/locales';
import {
  buildAllSitemapEntriesAsync,
  dedupeAndSortSitemap,
  getCatalogLastModified,
  toCompactSitemapEntries,
} from '@/lib/sitemapBuilder';

// Intelligent hourly ISR auto-update (+ instant on-demand revalidateAllSitemapRoutes()).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
  const catalogLastMod = getCatalogLastModified();
  const nowMs = Date.now();
  const editorialEventProfiles = [
    ...SITE_ONLY_EVENT_PROFILES,
    ...EVENT_BATCH_PROFILES.filter((profile) => profile.indexedLocales && profile.indexedLocales.length > 0),
  ];

  const pillarEntries: MetadataRoute.Sitemap = indexedLocaleCodes.map((locale) => ({
    url: `${baseUrl}${localePrefix(locale)}${getLocalizedSeoPagePath35('/football-afterparties', locale)}`,
    lastModified: catalogLastMod,
    changeFrequency: 'daily' as const,
    priority: 0.95,
  }));

  const batchEntries: MetadataRoute.Sitemap = [];
  editorialEventProfiles.forEach((profile) => {
    const indexedSiteLocales = profile.indexedLocales
      || (profile.siteLocales || []).filter((siteLocale) => indexedLocaleCodes.includes(siteLocale));
    const evDate = new Date(`${profile.dateISO}T00:00:00+02:00`);
    const isUpcoming = evDate.getTime() + 86400000 >= nowMs;
    indexedSiteLocales.forEach((siteLocale) => {
      batchEntries.push({
        url: `${baseUrl}${localePrefix(siteLocale)}/${getLocalizedDir35('events', siteLocale)}/${getEventBatchSlug(profile, siteLocale)}`,
        lastModified: catalogLastMod,
        changeFrequency: isUpcoming ? 'daily' : 'monthly',
        priority: isUpcoming ? 0.9 : 0.6,
      });
    });
  });

  const allEntries = await buildAllSitemapEntriesAsync();
  return toCompactSitemapEntries(
    dedupeAndSortSitemap([
      ...allEntries,
      ...pillarEntries,
      ...batchEntries,
    ]),
  );
}
