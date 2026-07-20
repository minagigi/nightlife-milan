import { enabledLocaleCodes, localePrefix, type LocaleCode } from './i18n/locales';
import type { EventBatchProfile } from './eventBatchProfiles';

export const GUE_JUST_ME_BASE_ID = 'nlm-gue-just-me-2026-07-25';
export const GUE_JUST_ME_CANONICAL_SLUG = 'gue-live-performance-just-me-milan-july-25-2026';
export const GUE_JUST_ME_AFFILIATE_URL = 'https://xceed.me/en/milano/event/gue-1/220772/channel/nightlifemilan-1';
export const GUE_JUST_ME_PHONE = '+39 351 912 7047';
export const GUE_JUST_ME_ADDRESS = 'Viale Luigi Camoens, 2, 20121 Milano';
export const GUE_JUST_ME_WHATSAPP = 'https://wa.me/393519127047';
export const GUE_JUST_ME_START_UTC = '2026-07-25T17:30:00Z';
export const GUE_JUST_ME_END_UTC = '2026-07-26T03:00:00Z';
export const GUE_JUST_ME_SITE = 'https://nightlifemilan.com';
export const GUE_JUST_ME_SEARCH_NAME = 'Guè Pequeno';

export const GUE_JUST_ME_LIVE_LABELS: Record<LocaleCode, string> = {
  en: 'Live performance', it: 'Performance live', es: 'Actuación en vivo', fr: 'Performance live', de: 'Live-Auftritt',
  pt: 'Atuação ao vivo', nl: 'Liveoptreden', ru: 'Живое выступление', tr: 'Canlı performans', zh: '现场演出',
  ar: 'عرض حي', bg: 'Изпълнение на живо', hr: 'Nastup uživo', cs: 'Živé vystoupení', da: 'Liveoptræden',
  et: 'Live-esinemine', fi: 'Live-esiintyminen', el: 'Ζωντανή εμφάνιση', hu: 'Élő fellépés', ga: 'Léiriú beo',
  lv: 'Dzīvā uzstāšanās', lt: 'Gyvas pasirodymas', mt: 'Prestazzjoni live', pl: 'Występ na żywo', ro: 'Spectacol live',
  sk: 'Živé vystúpenie', sl: 'Nastop v živo', sv: 'Liveframträdande', no: 'Liveopptreden', is: 'Lifandi flutningur',
  uk: 'Живий виступ', sq: 'Performancë live', sr: 'Nastup uživo', bs: 'Nastup uživo', mk: 'Настап во живо',
};

export const GUE_JUST_ME_EVENT_NAMES = Object.fromEntries(
  enabledLocaleCodes.map((locale) => [locale, `Guè — ${GUE_JUST_ME_LIVE_LABELS[locale]}`]),
) as Record<LocaleCode, string>;

export const GUE_JUST_ME_EVENTBRITE_NAMES = Object.fromEntries(
  enabledLocaleCodes.map((locale) => [locale, `${GUE_JUST_ME_SEARCH_NAME} — ${GUE_JUST_ME_LIVE_LABELS[locale]}`]),
) as Record<LocaleCode, string>;

/**
 * Self-contained Guè editorial profile used by the Eventbrite rollout.
 *
 * Keeping this profile beside the event identity makes the one-off publisher
 * independent from the site's mutable profile registry.  That matters during
 * a live rollout: unrelated draft events in the registry cannot become a
 * hidden deployment dependency.
 */
export const GUE_JUST_ME_EVENT_PROFILE = {
  baseId: GUE_JUST_ME_BASE_ID,
  eventbriteIds: { en: '1994392210790', it: '1994392210790' },
  canonicalSlug: GUE_JUST_ME_CANONICAL_SLUG,
  localizedSlugs: Object.fromEntries(
    enabledLocaleCodes.map((locale) => [locale, GUE_JUST_ME_CANONICAL_SLUG]),
  ) as Record<LocaleCode, string>,
  siteLocales: enabledLocaleCodes,
  indexedLocales: enabledLocaleCodes,
  eventName: GUE_JUST_ME_EVENT_NAMES,
  venue: 'Just Me Milano',
  area: { en: 'Sempione, Milan', it: 'Sempione, Milano' },
  dateISO: '2026-07-25',
  dates: { en: 'Saturday, July 25, 2026', it: 'Sabato 25 luglio 2026' },
  start: '19:30',
  end: '05:00',
  minAge: 21,
  dressCode: {
    en: 'Elegant dress; long trousers for men.',
    it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.',
  },
  kind: 'showcase',
  genres: {
    en: 'Guè live performance, Italian rap, hip-hop, house and hits',
    it: 'Performance live di Guè, rap italiano, hip-hop, house e hit',
  },
  affiliateUrl: GUE_JUST_ME_AFFILIATE_URL,
  posterUrl: `${GUE_JUST_ME_SITE}/images/events/generated/gue-just-me-2026-07-25-cover-2x1-en-v2.jpg`,
  programme: [
    { key: 'aperitifDinner', start: '19:30', end: '22:30' },
    { key: 'clubMixed', start: '22:30', end: '05:00' },
  ],
  offers: [
    { key: 'aperitifOneDrink', price: 15, category: 'ticket' },
    { key: 'clubOneDrink', price: 20, category: 'ticket' },
    { key: 'danceFloorTable', price: 320, category: 'table' },
    { key: 'vipAreaTable', price: 640, category: 'table' },
    { key: 'superVipBackLineTable', price: 1280, category: 'table' },
    { key: 'superVipFrontLineTable', price: 3200, category: 'table' },
    { key: 'djTable', price: 5000, category: 'table' },
  ],
  specialGuests: { en: ['Guè'], it: ['Guè'] },
  venueImages: [
    '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    '/images/venues/just-me-milano/just-me-milano-lounge-01.webp',
    '/images/venues/just-me-milano/just-me-milano-interior-02.webp',
    '/images/venues/just-me-milano/just-me-milano-buffet-01.webp',
  ],
} as unknown as EventBatchProfile;

export const GUE_JUST_ME_LOCALIZED_SLUGS = Object.fromEntries(
  enabledLocaleCodes.map((locale) => [locale, GUE_JUST_ME_CANONICAL_SLUG]),
) as Record<LocaleCode, string>;

export function getGueJustMeSiteUrl(locale: LocaleCode): string {
  return `${GUE_JUST_ME_SITE}${localePrefix(locale)}/events/${GUE_JUST_ME_LOCALIZED_SLUGS[locale]}`;
}

export function getGueJustMeGeneratedImagePath(
  locale: LocaleCode,
  kind: 'cover' | 'poster' | 'performance' | 'target' | 'dress' | 'programme',
  version: 'v1' | 'v2' = 'v2',
): string {
  const ratio = kind === 'cover' ? '2x1' : '5x4';
  const imageLocale = version === 'v2' && ['performance', 'target', 'dress', 'programme'].includes(kind) ? 'en' : locale;
  return `/images/events/generated/gue-just-me-2026-07-25-${kind}-${ratio}-${imageLocale}-${version}.jpg`;
}

export function getGueJustMeEventbriteImagePath(
  locale: LocaleCode,
  kind: 'cover' | 'poster' | 'performance' | 'target' | 'dress' | 'programme',
): string {
  // Cover and poster contain localized visible copy. The four body photos are
  // approved EN v2 visuals with no locale-specific text, so Eventbrite can
  // reuse their CDN media without duplicate uploads across 35 locales.
  return getGueJustMeGeneratedImagePath(locale, kind, 'v2');
}

export function getGueJustMeEventbriteMediaRevision(locale: LocaleCode): 'v1' | 'v2' {
  void locale;
  return 'v2';
}
