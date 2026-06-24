// Enums for Taxonomies
export enum MusicGenre {
  TECHNO = 'TECHNO',
  HOUSE = 'HOUSE',
  HIP_HOP = 'HIP_HOP',
  REGGAETON = 'REGGAETON',
  COMMERCIAL = 'COMMERCIAL',
  EDM = 'EDM',
  LIVE_MUSIC = 'LIVE_MUSIC',
  INDIE = 'INDIE',
}

export enum MilanZone {
  NAVIGLI = 'NAVIGLI',
  BRERA = 'BRERA',
  ISOLA = 'ISOLA',
  SEMPIONE = 'SEMPIONE',
  PORTA_VENEZIA = 'PORTA_VENEZIA',
  CORSO_COMO = 'CORSO_COMO',
  TORTONA = 'TORTONA',
  CITY_LIFE = 'CITY_LIFE',
  CENTRO_STORICO = 'CENTRO_STORICO',
  ARCO_DELLA_PACE = 'ARCO_DELLA_PACE',
  RIPAMONTI = 'RIPAMONTI',
  NOLO = 'NOLO',
  PORTA_ROMANA = 'PORTA_ROMANA',
  LAMBRATE = 'LAMBRATE',
}

export enum VenueCategory {
  CLUB = 'CLUB',
  LOUNGE_BAR = 'LOUNGE_BAR',
  LIVE_MUSIC_VENUE = 'LIVE_MUSIC_VENUE',
  ROOFTOP = 'ROOFTOP',
  SPEAKEASY = 'SPEAKEASY',
}

// Localized Content Type
export type LocalizedString = {
  en: string;
  it?: string; // Optional, will fallback to 'en' if missing
};

export interface Zone {
  id: MilanZone;
  name: string;
  vibe: string;
  description: LocalizedString;
  image: string;
  stats: string;
  slug: string;
  tags: string[];
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
}

// Data Models
export interface Venue {
  id: string;
  slugs: LocalizedString;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: 'IT';
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: VenueCategory;
  zone: MilanZone;
  sameAs: string[]; // URLs to social media or official website
  localizedContent: {
    name: LocalizedString;
    description: LocalizedString;
    dressCode: LocalizedString;
    altTextImg: LocalizedString;
    insiderTip?: LocalizedString;
  };
  image?: string; // URL to main image
  gallery?: string[]; // Array of high-quality images for the venue
  isManaged?: boolean;
  isPriority?: boolean;
  isTrending?: boolean;
  priorityScore: number;
  isFeatured: boolean;
  ageRange?: string;
  priceRange?: string;
  tags?: string[];
  entryDifficulty?: 'Easy' | 'Medium' | 'Hard' | 'Exclusive';
}

export interface Performer {
  id: string;
  name: string; // Names usually don't need translation, but bio does
  type: 'Person' | 'PerformingGroup';
  sameAs: string[]; // URLs to Spotify, Soundcloud, Instagram, etc.
  localizedContent: {
    bio: LocalizedString;
  };
  image?: string;
}

export interface Event {
  id: string;
  venueId: string;
  performerId?: string; // Optional, some events might just be regular club nights
  genre: MusicGenre[];
  dateISO: string; // ISO 8601 format (e.g., "2024-12-31T23:00:00+01:00")
  endDateISO?: string;
  pricing: {
    entry: number;
    currency: 'EUR';
    tableMinSpend: number | null;
  };
  localizedContent: {
    title: LocalizedString;
    shortDescription: LocalizedString;
    slug: LocalizedString;
  };
  image?: string;
  xceedUrl?: string;
  isSpecial?: boolean;
  isTrending?: boolean;
}

export interface FAQ {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface GuideSection {
  id: string;
  heading: LocalizedString;
  content: LocalizedString; // HTML content
}

export interface Guide {
  id: string;
  slugs: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  sections: GuideSection[];
  faqs?: FAQ[];
  relatedGenres?: MusicGenre[];
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}
