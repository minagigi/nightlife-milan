import { localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedText } from '@/lib/seo';
import type { Venue } from '@/lib/types';
import type { EventVenueSectionVenue } from './eventVenueSection';

export function eventVenueFromCatalog(venue: Venue, locale: LocaleCode): EventVenueSectionVenue {
  const lc = venue.localizedContent as Record<string, any>;
  const name = getLocalizedText(venue.localizedContent.name, locale);
  const description = (lc.shortDescription ? getLocalizedText(lc.shortDescription, locale) : '') || getLocalizedText(venue.localizedContent.description, locale);
  const slug = getLocalizedText(venue.slugs, locale);
  return {
    name,
    address: {
      streetAddress: venue.address.streetAddress,
      addressLocality: venue.address.addressLocality || 'Milano',
      postalCode: venue.address.postalCode,
      addressCountry: venue.address.addressCountry || 'IT',
    },
    description,
    href: slug ? `${localePrefix(locale)}/clubs/${slug}` : undefined,
    ...(venue.coordinates ? { coordinates: venue.coordinates } : {}),
  };
}
