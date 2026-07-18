import { Event, Venue, Performer, LocalizedString } from './types';
import { localePrefix } from './i18n/locales';

// Helper to get localized string — qualsiasi locale del registry, fallback a 'en'
export const getLocalizedText = (text: LocalizedString, lang: string): string => {
  const value = (text as Record<string, string | undefined>)[lang];
  return value || text.en;
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
  const langPrefix = localePrefix(lang);
  const eventUrl = `${baseUrl}${langPrefix}/events/${getLocalizedText(event.localizedContent.slug, lang)}`;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: getLocalizedText(event.localizedContent.title, lang),
    description: getLocalizedText(event.localizedContent.shortDescription, lang),
    startDate: event.dateISO,
    url: eventUrl,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: {
      '@type': 'Organization',
      name: 'Nightlife Milan',
      url: baseUrl,
    },
  };

  if (event.endDateISO) {
    schema.endDate = event.endDateISO;
  }

  if (event.image) {
    // L'immagine nello schema deve sempre essere un URL assoluto — event.image
    // arriva spesso come path relativo (es. '/images/events/...').
    schema.image = event.image.startsWith('http') ? event.image : `${baseUrl}${event.image}`;
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

  // Offers Schema (Pricing) — solo se abbiamo un prezzo reale confermato.
  // Un Offer con un prezzo inventato/sbagliato è peggio di nessun Offer.
  const offer = buildOfferSchema(event.pricing, eventUrl);
  if (offer) schema.offers = offer;

  return schema;
};

/**
 * Offer reale a partire dai soli dati di pricing confermati sull'evento —
 * mai un prezzo inventato. `entry` (ticket reale) ha priorità; se assente
 * (es. eventi Eventbrite: il ticket lì è sempre RSVP gratuito di comodo,
 * mai il vero prezzo — vedi commento su Event['pricing']) si usa
 * `tableMinSpend` come prezzo "a partire da" quando è un dato reale
 * confermato. Se nessuno dei due è disponibile, niente Offer — evita il
 * campo "offers" mancante segnalato da Search Console senza fabbricare un
 * numero. Riusata da tutte le pagine che emettono schema.org Event.
 */
export function buildOfferSchema(
  pricing: { entry: number | null; currency: 'EUR'; tableMinSpend: number | null },
  url: string
): Record<string, unknown> | null {
  const price = pricing.entry ?? pricing.tableMinSpend;
  if (price === null || price === undefined) return null;
  return {
    '@type': 'Offer',
    price,
    priceCurrency: pricing.currency,
    availability: 'https://schema.org/InStock',
    url,
  };
}

// Generate BreadcrumbList JSON-LD Schema
export const generateBreadcrumbSchema = (
  event: Event,
  venue: Venue,
  lang: string
) => {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = localePrefix(lang);
  
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
