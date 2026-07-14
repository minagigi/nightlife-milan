import type { LocaleCode } from './i18n/locales';
import { MusicGenre, type Event } from './types';
import { universityPartyEventSeed, universityPartyPt } from './universityPartyPt';
import { getBatchLocalizedEventContent } from './eventBatchContent';
import { getEventBatchProfile } from './eventBatchProfiles';
import { getEventLocalePack } from './eventLocalePacks';

export interface LocalizedEventSection {
  icon?: string;
  title: string;
  body: string;
}

export interface LocalizedEventProgrammeSlot {
  start: string;
  end?: string;
  title: string;
}

export interface LocalizedEventOffer {
  name: string;
  price: number;
  category: 'ticket' | 'guestlist' | 'table';
  details?: string;
}

export interface LocalizedEventFaq {
  question: string;
  answer: string;
}

/**
 * Structured, locale-ready source for the standard event page. Eventbrite may
 * receive HTML derived from this data, but its description never controls the
 * website layout.
 */
export interface LocalizedEventContent {
  locale: LocaleCode;
  canonicalSlug: string;
  title: string;
  seoSummary: string;
  sections: LocalizedEventSection[];
  programme: LocalizedEventProgrammeSlot[];
  offers: LocalizedEventOffer[];
  affiliateUrl: string;
  faqs: LocalizedEventFaq[];
}

const CONTENT_BY_EVENT = new Map<string, Partial<Record<LocaleCode, LocalizedEventContent>>>([
  [universityPartyPt.canonicalSlug, { pt: universityPartyPt }],
]);

const EVENT_SEED_BY_EVENT = new Map<string, Partial<Record<LocaleCode, Event>>>([
  [universityPartyPt.canonicalSlug, { pt: universityPartyEventSeed }],
]);

export function getLocalizedEventContent(slug: string, locale: string): LocalizedEventContent | null {
  const stored = CONTENT_BY_EVENT.get(slug)?.[locale as LocaleCode];
  if (stored) return stored;
  const profile = getEventBatchProfile(slug);
  const pack = getEventLocalePack(locale);
  if (!profile || !pack) return null;
  return getBatchLocalizedEventContent(profile, pack.locale, pack);
}

export function getLocalizedEventSeed(slug: string, locale: string): Event | null {
  const stored = EVENT_SEED_BY_EVENT.get(slug)?.[locale as LocaleCode];
  if (stored) return stored;

  const profile = getEventBatchProfile(slug);
  const pack = getEventLocalePack(locale);
  if (!profile || !pack) return null;

  const localized = getBatchLocalizedEventContent(profile, pack.locale, pack);
  const en = getBatchLocalizedEventContent(profile, 'en', getEventLocalePack('en'));
  const it = getBatchLocalizedEventContent(profile, 'it', getEventLocalePack('it'));
  const endDate = new Date(`${profile.dateISO}T12:00:00Z`);
  if (profile.end <= profile.start) endDate.setUTCDate(endDate.getUTCDate() + 1);
  const endDay = endDate.toISOString().slice(0, 10);
  const genreSource = profile.genres.en.toLowerCase();
  const genres = [
    genreSource.includes('house') ? MusicGenre.HOUSE : null,
    genreSource.includes('hip-hop') ? MusicGenre.HIP_HOP : null,
    genreSource.includes('reggaeton') ? MusicGenre.REGGAETON : null,
    genreSource.includes('edm') ? MusicGenre.EDM : null,
    genreSource.includes('dance') || genreSource.includes('hits') ? MusicGenre.COMMERCIAL : null,
  ].filter((genre): genre is MusicGenre => genre !== null);
  const ticketPrices = profile.offers.filter((offer) => offer.category !== 'table').map((offer) => offer.price);
  const tablePrices = profile.offers.filter((offer) => offer.category === 'table').map((offer) => offer.price);
  const venueId = profile.venue === 'Just Me Milano' ? 'v-justme' : profile.venue === 'Aria Club Milano' ? 'v-aria' : 'v-pineta';

  return {
    id: `eventbrite-${profile.eventbriteIds.en}`,
    venueId,
    genre: genres.length > 0 ? genres : [MusicGenre.COMMERCIAL],
    dateISO: `${profile.dateISO}T${profile.start}:00+02:00`,
    endDateISO: `${endDay}T${profile.end}:00+02:00`,
    pricing: {
      entry: ticketPrices.length > 0 ? Math.min(...ticketPrices) : null,
      currency: 'EUR',
      tableMinSpend: tablePrices.length > 0 ? Math.min(...tablePrices) : null,
    },
    localizedContent: {
      title: { en: en.title, it: it.title, [pack.locale]: localized.title },
      shortDescription: { en: en.seoSummary, it: it.seoSummary, [pack.locale]: localized.seoSummary },
      slug: { en: profile.canonicalSlug, it: profile.canonicalSlug, [pack.locale]: profile.canonicalSlug },
    },
    image: profile.posterUrl,
    xceedUrl: profile.affiliateUrl,
    isSpecial: profile.kind !== 'club',
    isTrending: true,
  } satisfies Event;
}
