import { Event, Venue, Performer, LocalizedString } from './types';

// Helper to get localized string with fallback to English
export const getLocalizedText = (text: LocalizedString, lang: string): string => {
  if (lang === 'it' && text.it) {
    return text.it;
  }
  return text.en;
};

// Helper to format zone enum to readable string
const formatZoneName = (zone: string): string => {
  return zone.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

// Generate Event JSON-LD Schema
export const generateEventSchema = (
  event: Event,
  venue: Venue,
  performer: Performer | null,
  lang: string
) => {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = lang === 'it' ? '/it' : '';
  const eventUrl = `${baseUrl}${langPrefix}/events/${getLocalizedText(event.localizedContent.slug, lang)}`;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: getLocalizedText(event.localizedContent.title, lang),
    description: getLocalizedText(event.localizedContent.shortDescription, lang),
    startDate: event.dateISO,
    url: eventUrl,
  };

  if (event.endDateISO) {
    schema.endDate = event.endDateISO;
  }

  if (event.image) {
    schema.image = event.image;
  }

  // Nested Location Schema (Venue)
  schema.location = {
    '@type': 'Place',
    name: getLocalizedText(venue.localizedContent.name, lang),
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address.streetAddress,
      addressLocality: venue.address.addressLocality,
      postalCode: venue.address.postalCode,
      addressCountry: venue.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.coordinates.latitude,
      longitude: venue.coordinates.longitude,
    },
    sameAs: venue.sameAs,
  };

  // Performer Schema
  if (performer) {
    schema.performer = {
      '@type': performer.type,
      name: performer.name,
      sameAs: performer.sameAs,
    };
  }

  // Offers Schema (Pricing)
  schema.offers = {
    '@type': 'Offer',
    price: event.pricing.entry,
    priceCurrency: event.pricing.currency,
    availability: 'https://schema.org/InStock',
    url: eventUrl, // Assuming tickets are bought on the event page or linked from there
    validFrom: event.dateISO,
  };

  return schema;
};

// Generate BreadcrumbList JSON-LD Schema
export const generateBreadcrumbSchema = (
  event: Event,
  venue: Venue,
  lang: string
) => {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = lang === 'it' ? '/it' : '';
  
  const zoneName = formatZoneName(venue.zone);
  const zoneSlug = venue.zone.toLowerCase().replace('_', '-');
  
  const venueName = getLocalizedText(venue.localizedContent.name, lang);
  const venueSlug = getLocalizedText(venue.slugs, lang);
  
  const eventName = getLocalizedText(event.localizedContent.title, lang);
  const eventSlug = getLocalizedText(event.localizedContent.slug, lang);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}${langPrefix}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: zoneName,
        item: `${baseUrl}${langPrefix}/zones/${zoneSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: venueName,
        item: `${baseUrl}${langPrefix}/clubs/${venueSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: eventName,
        item: `${baseUrl}${langPrefix}/events/${eventSlug}`,
      },
    ],
  };
};
