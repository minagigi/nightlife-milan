import { MetadataRoute } from 'next';
import { EVENT_BATCH_PROFILES, getEventBatchSlug, SITE_ONLY_EVENT_PROFILES } from '@/lib/eventBatchProfiles';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedSeoPagePath35 } from '@/lib/i18n/localizedSlugs35';
import { indexedLocaleCodes, localePrefix } from '@/lib/i18n/locales';
import {
  buildAllSitemapEntries,
  dedupeAndSortSitemap,
  SITEMAP_LAST_MODIFIED,
} from '@/lib/sitemapBuilder';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const nowMs = SITEMAP_LAST_MODIFIED.getTime();
  const editorialEventProfiles = [
    ...SITE_ONLY_EVENT_PROFILES,
    ...EVENT_BATCH_PROFILES.filter((profile) => profile.indexedLocales && profile.indexedLocales.length > 0),
  ];

  const pillarEntries: MetadataRoute.Sitemap = indexedLocaleCodes.map((locale) => ({
    url: `${baseUrl}${localePrefix(locale)}${getLocalizedSeoPagePath35('/football-afterparties', locale)}`,
    lastModified: SITEMAP_LAST_MODIFIED,
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
        lastModified: SITEMAP_LAST_MODIFIED,
        changeFrequency: isUpcoming ? 'daily' : 'monthly',
        priority: isUpcoming ? 0.9 : 0.6,
      });
    });
  });

  return dedupeAndSortSitemap([
    ...buildAllSitemapEntries(),
    ...pillarEntries,
    ...batchEntries,
  ]);
}
