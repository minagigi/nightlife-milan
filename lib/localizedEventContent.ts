import type { LocaleCode } from './i18n/locales';
import type { Event } from './types';
import { universityPartyEventSeed, universityPartyPt } from './universityPartyPt';

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
  return CONTENT_BY_EVENT.get(slug)?.[locale as LocaleCode] ?? null;
}

export function getLocalizedEventSeed(slug: string, locale: string): Event | null {
  return EVENT_SEED_BY_EVENT.get(slug)?.[locale as LocaleCode] ?? null;
}
