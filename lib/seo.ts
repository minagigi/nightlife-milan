import { Event, Venue, Performer, LocalizedString } from './types';
import { getConciergeBookingUrl } from './conciergeBooking';
import { localePrefix, type LocaleCode } from './i18n/locales';
import { getLocalizedDir35 } from './i18n/dirTokens35';
import {
  getLocalizedEventSlug35,
  getLocalizedVenueSlug35,
  getLocalizedZoneSlug35,
  localizeInternalHref,
} from './i18n/localizedSlugs35';

// Helper to get localized string - qualsiasi locale del registry, fallback a 'en'
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
  const locCode = (lang || 'en') as LocaleCode;
  const rawEventSlug = getLocalizedText(event.localizedContent.slug, lang);
  const eventSlug = getLocalizedEventSlug35(rawEventSlug, locCode);
  const eventUrl = `${baseUrl}${langPrefix}/${getLocalizedDir35('events', lang)}/${eventSlug}`;

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
  } else if (Number.isFinite(Date.parse(event.dateISO))) {
    schema.endDate = new Date(Date.parse(event.dateISO) + 5 * 3600 * 1000).toISOString();
  }

  if (event.image) {
    // L'immagine nello schema deve sempre essere un URL assoluto - event.image
    // arriva spesso come path relativo (es. '/images/events/...').
    schema.image = event.image.startsWith('http') ? event.image : `${baseUrl}${event.image}`;
  }

  // Nested Location Schema (Venue)
  const venueLocalizedName = getLocalizedText(venue.localizedContent.name, lang);
  schema.location = {
    '@type': 'Place',
    name: venueLocalizedName,
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

  // Performer Schema (con fallback Resident DJs per evitare warning GSC "performer mancante")
  if (performer) {
    schema.performer = {
      '@type': performer.type,
      name: performer.name,
      sameAs: performer.sameAs,
    };
  } else {
    schema.performer = {
      '@type': 'PerformingGroup',
      name: `${venueLocalizedName} Resident DJs`,
    };
  }

  // Offers Schema (Pricing) - solo se abbiamo un prezzo reale confermato.
  // Un Offer con un prezzo inventato/sbagliato è peggio di nessun Offer.
  const offer = buildOfferSchema(event.pricing, eventUrl, event.dateISO);
  if (offer) schema.offers = offer;

  return schema;
};

/**
 * Offer reale a partire dai soli dati di pricing confermati sull'evento -
 * mai un prezzo inventato. `entry` (ticket reale) ha priorità; se assente
 * (es. eventi Eventbrite: il ticket lì è sempre RSVP gratuito di comodo,
 * mai il vero prezzo - vedi commento su Event['pricing']) si usa
 * `tableMinSpend` come prezzo "a partire da" quando è un dato reale
 * confermato. Se nessuno dei due è disponibile, niente Offer - evita il
 * campo "offers" mancante segnalato da Search Console senza fabbricare un
 * numero. Riusata da tutte le pagine che emettono schema.org Event.
 */
export function buildOfferSchema(
  pricing: { entry: number | null; currency: 'EUR'; tableMinSpend: number | null },
  url: string,
  startDateISO?: string,
): Record<string, unknown> | null {
  const price = pricing.entry ?? pricing.tableMinSpend;
  if (price === null || price === undefined) return null;
  const isPast = Boolean(
    startDateISO &&
    Number.isFinite(Date.parse(startDateISO)) &&
    Date.parse(startDateISO) + 8 * 3600 * 1000 < Date.now()
  );
  return {
    '@type': 'Offer',
    price,
    priceCurrency: pricing.currency,
    availability: isPast ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    validFrom: '2026-09-01T00:00:00+02:00',
    url,
  };
}

/**
 * ItemList di Event COMPLETI per le superfici-lista (homepage, pagina venue,
 * genere, tonight/special/best e le landing intent). Ogni item riusa
 * generateEventSchema - mai un secondo Event scritto a mano - così tutte le
 * pagine emettono la stessa entità ricca (location con geo, organizer,
 * eventStatus, offers reali) e Google/AI vedono gli stessi dati ovunque.
 * Il @context resta solo sull'ItemList radice, mai sugli item annidati.
 */
export const generateEventListSchema = (
  entries: { event: Event; venue: Venue }[],
  lang: string,
  name: string,
  limit = 20,
) => {
  const shown = entries.slice(0, limit);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: shown.length,
    itemListElement: shown.map(({ event, venue }, index) => {
      const item = generateEventSchema(event, venue, null, lang) as Record<string, unknown>;
      delete item['@context'];
      return { '@type': 'ListItem', position: index + 1, item };
    }),
  };
};

/** Serializzazione sicura per i <script> JSON-LD: i titoli evento arrivano
 * anche da feed esterni (Eventbrite/Xceed), quindi si neutralizza ogni "<"
 * per impedire la chiusura anticipata del tag script. */
export const jsonLdString = (schema: unknown): string =>
  JSON.stringify(schema).replace(/</g, '\\u003c');

// Generate BreadcrumbList JSON-LD Schema
export const generateBreadcrumbSchema = (
  event: Event,
  venue: Venue,
  lang: string
) => {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = localePrefix(lang);
  const locCode = (lang || 'en') as LocaleCode;
  
  const zoneName = formatZoneName(venue.zone);
  const rawZoneSlug = venue.zone.toLowerCase().replace('_', '-');
  const zoneSlug = getLocalizedZoneSlug35(rawZoneSlug, locCode);
  
  const venueName = getLocalizedText(venue.localizedContent.name, lang);
  const rawVenueSlug = getLocalizedText(venue.slugs, lang);
  const venueSlug = getLocalizedVenueSlug35(rawVenueSlug, locCode);
  
  const eventName = getLocalizedText(event.localizedContent.title, lang);
  const rawEventSlug = getLocalizedText(event.localizedContent.slug, lang);
  const eventSlug = getLocalizedEventSlug35(rawEventSlug, locCode);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}${langPrefix}` || `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: zoneName,
        item: `${baseUrl}${langPrefix}/${getLocalizedDir35('zones', lang)}/${zoneSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: venueName,
        item: `${baseUrl}${langPrefix}/${getLocalizedDir35('clubs', lang)}/${venueSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: eventName,
        item: `${baseUrl}${langPrefix}/${getLocalizedDir35('events', lang)}/${eventSlug}`,
      },
    ],
  };
};

export const generatePageBreadcrumbSchema = (
  lang: string,
  items: readonly { name: string; path: string }[],
) => {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const langPrefix = localePrefix(lang);
  const locCode = (lang || 'en') as LocaleCode;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => {
      const locPath = item.path
        ? localizeInternalHref(`${langPrefix}${item.path}`, locCode)
        : langPrefix;
      return {
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: `${baseUrl}${locPath === '/' ? '' : locPath}` || `${baseUrl}/`,
      };
    }),
  };
};

export interface ClubSchemaOptions {
  venue: Venue;
  locale: string;
  canonicalUrl: string;
  name: string;
  description: string;
  schemaType?: 'NightClub' | 'BarOrPub' | 'Restaurant' | 'MusicVenue';
  alternateNames?: readonly string[];
  neighborhoodName?: string;
  hasMapUrl?: string;
  openingHoursSpec?: readonly {
    dayOfWeek: readonly string[];
    opens: string;
    closes: string;
  }[];
}

/**
 * Generates clean, Google-compliant LocalBusiness / NightClub / BarOrPub / Restaurant JSON-LD
 * WITHOUT self-serving aggregateRating or fabricated reviews.
 */
export const generateClubSchema = ({
  venue,
  locale,
  canonicalUrl,
  name,
  description,
  schemaType = 'NightClub',
  alternateNames = [],
  neighborhoodName,
  hasMapUrl,
  openingHoursSpec = [],
}: ClubSchemaOptions) => {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const imageUrl = venue.image
    ? venue.image.startsWith('http')
      ? venue.image
      : `${baseUrl}${venue.image}`
    : `${baseUrl}/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${canonicalUrl}#venue`,
    name,
    description,
    url: canonicalUrl,
    inLanguage: locale,
    image: [imageUrl, ...(venue.gallery || []).slice(0, 4).map((g) => (g.startsWith('http') ? g : `${baseUrl}${g}`))].filter(
      (v, i, arr) => arr.indexOf(v) === i,
    ),
    telephone: '+393519127047',
    email: 'concierge@nightlifemilan.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address.streetAddress,
      addressLocality: venue.address.addressLocality || 'Milano',
      addressRegion: 'MI',
      postalCode: venue.address.postalCode,
      addressCountry: venue.address.addressCountry || 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: venue.coordinates.latitude,
      longitude: venue.coordinates.longitude,
    },
    priceRange: venue.priceRange || '$$$',
  };

  if (alternateNames.length > 0) {
    schema.alternateName = [...alternateNames];
  }
  if (hasMapUrl) {
    schema.hasMap = hasMapUrl;
  }
  if (neighborhoodName) {
    schema.containedInPlace = {
      '@type': 'AdministrativeArea',
      name: `${neighborhoodName}, Milano`,
    };
  }
  if (openingHoursSpec.length > 0) {
    schema.openingHoursSpecification = openingHoursSpec.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...spec.dayOfWeek],
      opens: spec.opens,
      closes: spec.closes,
    }));
  }
  if (venue.sameAs && venue.sameAs.length > 0) {
    schema.sameAs = venue.sameAs;
  }

  schema.potentialAction = {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: getConciergeBookingUrl(locale, name, canonicalUrl),
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform',
      ],
    },
    result: {
      '@type': 'Reservation',
      name: `VIP Table & Guestlist at ${name}`,
    },
  };

  return schema;
};
