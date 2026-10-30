import type { LocaleCode } from '@/lib/i18n/locales';
import type { EventVenueAddress } from '@/lib/eventVenueSection';
import type { RaCondition } from './raConditionsAdapter';
import type { OctoberProgrammeNote } from './programmeNotes';
import type { OctoberProgrammeDateRange } from './festivalPeriod';

export type OctoberAffiliateStatus = 'verified' | 'unknown' | 'unavailable';
export type OctoberOfferCategory = 'ticket' | 'guestlist' | 'table' | 'other';
export type OctoberOfferAvailability = 'available' | 'sold_out' | 'unknown';

export type OctoberEventOffer = Readonly<{
  name: string;
  price: number | null;
  category: OctoberOfferCategory;
  availability: OctoberOfferAvailability;
  url: string | null;
  admissionFrom?: string;
  admissionUntil?: string;
  audience?: 'women';
}>;

export type OctoberPerformer = Readonly<{ name: string; url?: string }>;

export type OctoberVenue = Readonly<{
  id: string;
  name: string;
  address: string | null;
  addressStatus?: 'source_conflict';
  structuredAddress?: EventVenueAddress;
  latitude: number | null;
  longitude: number | null;
}>;

export type OctoberEventImage = Readonly<{
  src: string;
  width: number;
  height: number;
  alt?: string;
}>;

export type OctoberEventRecord = Readonly<{
  id: string;
  sourceUrl: string;
  sourceScope?: 'dated-calendar';
  affiliateUrl: string | null;
  affiliateStatus: OctoberAffiliateStatus;
  officialName: string;
  schemaType?: 'MusicEvent' | 'Event' | 'Festival';
  admissionConditions?: readonly RaCondition[];
  programmeNotes?: readonly OctoberProgrammeNote[];
  /** Editorial festival period; occurrences retain their own start/end ISO values. */
  programmeDateRange?: OctoberProgrammeDateRange;
  shortName?: string;
  startISO: string;
  startTimeKnown?: boolean;
  timeKind?: 'start' | 'doors' | 'announced';
  doorTime?: string;
  endISO: string | null;
  endTimeStatus?: 'source_conflict';
  room?: string | null;
  admissionStatus?: 'sold_out';
  venue: OctoberVenue;
  image: OctoberEventImage;
  imageKind?: 'artist-photo'|'programme-artwork';
  imageSubjects?: string;
  age: string | null;
  dressCode: string | null;
  dressCodeDetail?: 'men-long-trousers';
  mixedGroup?: boolean;
  membership?: 'arci'|'venue';
  sourceConflict?: boolean;
  commercialCheckedAt?: string;
  genres: readonly string[];
  performers: readonly OctoberPerformer[];
  offers: readonly OctoberEventOffer[];
  description?: string;
  provenance: string;
  excluded?: boolean;
  halloween?: boolean;
}>;

export type OctoberInventory = Readonly<{
  schemaVersion: 1;
  sourceCheckedAt: string;
  events: readonly OctoberEventRecord[];
}>;

export type OctoberFaq = Readonly<{ question: string; answer: string }>;
export type OctoberSection = Readonly<{ heading: string; body: string }>;

export type OctoberEventLabels = Readonly<{
  source: string;
  venue: string;
  date: string;
  time: string;
  music: string;
  age: string;
  dressCode: string;
  offers: string;
  faq: string;
  venueSection: string;
  recommendations: string;
  askWhatsApp: string;
  openSource: string;
  noKnownValue: string;
}>;

export type OctoberEventCopy = Readonly<{
  locale: LocaleCode;
  slug: string;
  title: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  introduction: string;
  headings: Readonly<{ overview: string; booking: string; faq: string }>;
  sections: readonly OctoberSection[];
  faqs: readonly OctoberFaq[];
  labels: OctoberEventLabels;
}>;

export type OctoberHubLabels = Readonly<{
  eyebrow: string;
  heading: string;
  introduction: string;
  filters: string;
  allVenues: string;
  allDates: string;
  sourceNotice: string;
  empty: string;
  openEvent: string;
  venue: string;
  date: string;
}>;

export type OctoberHubCopy = Readonly<{
  locale: LocaleCode;
  metaTitle: string;
  metaDescription: string;
  labels: OctoberHubLabels;
}>;
