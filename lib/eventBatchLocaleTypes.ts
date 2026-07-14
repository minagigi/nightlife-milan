import type { LocaleCode } from './i18n/locales';

export type EventExperienceKind = 'club' | 'match' | 'showcase' | 'afterparty';

export const EVENT_PROGRAMME_KEYS = [
  'aperitif',
  'aperitifDinner',
  'clubMixed',
  'clubHouseLatin',
  'matchAndDj',
  'showcase',
  'afterpartyArrival',
  'afterpartyPeak',
  'closing',
] as const;

export type EventProgrammeKey = (typeof EVENT_PROGRAMME_KEYS)[number];

export const EVENT_OFFER_KEYS = [
  'aperitifOneDrink',
  'aperitifTwoDrinks',
  'aperitifOpenWine',
  'clubOneDrink',
  'clubTwoDrinks',
  'womanOneDrink',
  'danceFloorTable',
  'priveDanceFloorTable',
  'vipAreaTable',
  'superVipBackLineTable',
  'superVipFrontLineTable',
  'djTable',
  'priveAriaTable',
  'priveDjTable',
  'priveBalconyTable',
  'vipPriveTable',
] as const;

export type EventOfferKey = (typeof EVENT_OFFER_KEYS)[number];

export interface EventLocaleFaqTemplate {
  question: string;
  answer: string;
}
/**
 * Localized phrase pack shared by the website and Eventbrite renderer.
 * Dynamic values use named placeholders such as {venue}, {event}, {date},
 * {start}, {end}, {genres}, {phone}, {address}, {area}, {minAge},
 * {lowestPrice}, {highestTable}, {specialGuests}, {siteUrl} and {affiliateUrl}.
 */
export interface EventLocalePack {
  locale: LocaleCode;
  titleTemplate: string;
  summaryTemplate: string;
  sectionTitles: {
    experience: string;
    booking: string;
    access: string;
  };
  experienceBodies: Record<EventExperienceKind, string>;
  bookingBody: string;
  accessBody: string;
  programme: Record<EventProgrammeKey, string>;
  offers: Record<EventOfferKey, string>;
  faqs: readonly EventLocaleFaqTemplate[];
  gallery: {
    heading: string;
    posterTitle: string;
    posterAlt: string;
    moodTitles: readonly [string, string, string, string];
    moodAlts: readonly [string, string, string, string];
  };
  eventbrite: {
    contactsTitle: string;
    buyTickets: string;
    bookTable: string;
    fullGuide: string;
    importantTitle: string;
    importantBody: string;
    programmeTitle: string;
    offersTitle: string;
    faqTitle: string;
    seoLabel: string;
    ticketName: string;
    ticketDescription: string;
  };
  seoKeywords: readonly string[];
}
