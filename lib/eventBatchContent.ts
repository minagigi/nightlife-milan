import type { EventLocalePack } from './eventBatchLocaleTypes';
import { EVENT_LOCALE_PACKS_ALL } from './eventLocalePacks';
import { getEventBatchProfile, type EventBatchProfile } from './eventBatchProfiles';
import { EVENT_BATCH_LOCALE_FALLBACKS } from './eventBatchLocaleFallbacks';
import { getLocaleDef, type LocaleCode } from './i18n/locales';
import type { LocalizedEventContent } from './localizedEventContent';

export const EVENT_BATCH_PHONE = '+39 351 912 7047';
export const EVENT_BATCH_SITE_URL = 'https://nightlifemilan.com';
export const EVENT_BATCH_FAQ_COUNT = 25;
export const EVENT_BATCH_SUMMARY_LIMIT = 140;
export const EVENT_BATCH_FAQ_ANSWER_LIMIT = 300;

export type EventBatchLocale = LocaleCode;

type TemplateValues = Record<string, string | number>;

const PLACEHOLDER_RE = /\{([a-zA-Z][a-zA-Z0-9]*)\}/g;
const ALLOWED_PLACEHOLDERS = new Set([
  'venue', 'event', 'date', 'start', 'end', 'genres', 'phone', 'area', 'minAge',
  'lowestPrice', 'highestTable', 'specialGuests', 'guestSentence', 'guestFaqAnswer',
  'siteUrl', 'affiliateUrl', 'dressCode', 'address',
]);

function compact(value: string): string {
  return value.replace(/\s+/g, ' ').replace(/\s+([,.])/g, '$1').trim();
}

function hasPlaceholder(value: string): boolean {
  return /\{[a-zA-Z][a-zA-Z0-9]*\}/.test(value);
}

function eachPackString(value: unknown, visit: (text: string) => void): void {
  if (typeof value === 'string') {
    visit(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => eachPackString(item, visit));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => eachPackString(item, visit));
  }
}

export function interpolateEventBatchTemplate(template: string, values: TemplateValues): string {
  const missing = new Set<string>();
  const result = template.replace(PLACEHOLDER_RE, (_, key: string) => {
    const value = values[key];
    if (value === undefined || value === null) {
      missing.add(key);
      return `{${key}}`;
    }
    return String(value);
  });

  if (missing.size > 0) {
    throw new Error(`Missing template values: ${[...missing].join(', ')}`);
  }
  if (hasPlaceholder(result)) {
    throw new Error(`Unresolved template placeholder in: ${result}`);
  }
  return compact(result);
}

export function validateEventLocalePack(pack: EventLocalePack): void {
  if (pack.faqs.length !== EVENT_BATCH_FAQ_COUNT) {
    throw new Error(`${pack.locale} locale pack must contain exactly ${EVENT_BATCH_FAQ_COUNT} FAQs`);
  }
  if (pack.locale !== 'en' && /\bseo\s+keywords?\b/i.test(pack.eventbrite.seoLabel)) {
    throw new Error(`${pack.locale} locale pack leaks the English SEO label`);
  }
  if (pack.seoKeywords.length < 25) {
    throw new Error(`${pack.locale} locale pack must contain at least 25 SEO keywords`);
  }
  eachPackString(pack, (text) => {
    for (const match of text.matchAll(PLACEHOLDER_RE)) {
      if (!ALLOWED_PLACEHOLDERS.has(match[1])) {
        throw new Error(`Unknown template placeholder {${match[1]}} in ${pack.locale} locale pack`);
      }
    }
  });
}

export function validateEventBatchProfile(profile: EventBatchProfile): void {
  if (!profile.baseId || !profile.eventbriteIds.en || !profile.eventbriteIds.it || !profile.canonicalSlug) {
    throw new Error('Event profile is missing an identity field');
  }
  if (!/^https:\/\//.test(profile.affiliateUrl) || !/^https:\/\//.test(profile.posterUrl)) {
    throw new Error(`${profile.baseId} must use HTTPS booking and poster URLs`);
  }
  if (profile.programme.length === 0 || profile.offers.length === 0 || profile.venueImages.length !== 4) {
    throw new Error(`${profile.baseId} is missing programme, offers, or venue images`);
  }
}

export function validateBatchLocalizedEventContent(content: LocalizedEventContent): void {
  if (content.seoSummary.length > EVENT_BATCH_SUMMARY_LIMIT) {
    throw new Error(`${content.canonicalSlug} summary exceeds ${EVENT_BATCH_SUMMARY_LIMIT} characters`);
  }
  if (!content.seoSummary.includes(EVENT_BATCH_PHONE)) {
    throw new Error(`${content.canonicalSlug} summary is missing ${EVENT_BATCH_PHONE}`);
  }
  if (content.sections.length !== 3) {
    throw new Error(`${content.canonicalSlug} must have exactly three detailed sections`);
  }
  if (content.faqs.length !== EVENT_BATCH_FAQ_COUNT) {
    throw new Error(`${content.canonicalSlug} must have exactly ${EVENT_BATCH_FAQ_COUNT} FAQs`);
  }

  const strings = [content.title, content.seoSummary, ...content.sections.flatMap((section) => [section.title, section.body]), ...content.programme.map((slot) => slot.title), ...content.offers.flatMap((offer) => [offer.name, offer.details ?? '']), ...content.faqs.flatMap((faq) => [faq.question, faq.answer])];
  if (strings.some(hasPlaceholder)) {
    throw new Error(`${content.canonicalSlug} contains an unresolved template placeholder`);
  }
  content.faqs.forEach((faq, index) => {
    if (faq.answer.length > EVENT_BATCH_FAQ_ANSWER_LIMIT) {
      throw new Error(`${content.canonicalSlug} FAQ ${index + 1} exceeds ${EVENT_BATCH_FAQ_ANSWER_LIMIT} characters`);
    }
  });
}

function profileFor(profileOrSlug: EventBatchProfile | string): EventBatchProfile {
  const profile = typeof profileOrSlug === 'string' ? getEventBatchProfile(profileOrSlug) : profileOrSlug;
  if (!profile) {
    throw new Error(`Unknown event batch profile: ${profileOrSlug}`);
  }
  return profile;
}

function packFor(locale: EventBatchLocale, pack?: EventLocalePack): EventLocalePack {
  const resolvedPack = pack ?? EVENT_LOCALE_PACKS_ALL[locale];
  if (!resolvedPack) {
    throw new Error(`A locale pack is required to render ${locale} content`);
  }
  if (resolvedPack.locale !== locale) {
    throw new Error(`Locale pack ${resolvedPack.locale} cannot render ${locale} content`);
  }
  return resolvedPack;
}

function eventUrl(profile: EventBatchProfile, locale: EventBatchLocale): string {
  const localePath = locale === 'en' ? '' : `/${locale}`;
  return `${EVENT_BATCH_SITE_URL}${localePath}/events/${profile.canonicalSlug}`;
}

const VENUE_ADDRESS: Record<string, string> = {
  'Just Me Milano': 'Viale Luigi Camoens 2, 20121 Milano',
  'Pineta Club': 'Via Messina 38, 20154 Milano',
  'Aria Club Milano': 'Via Ippodromo 115, 20151 Milano',
};

function localizedDate(profile: EventBatchProfile, locale: EventBatchLocale): string {
  const intlLocale = getLocaleDef(locale)?.hreflang || locale;
  return new Intl.DateTimeFormat(intlLocale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Rome',
  }).format(new Date(`${profile.dateISO}T12:00:00+02:00`));
}

function localizedGenres(profile: EventBatchProfile, locale: EventBatchLocale, pack: EventLocalePack): string {
  if (profile.kind === 'match') return pack.programme.matchAndDj;
  const nativeLocale = locale === 'it' ? 'it' : 'en';
  const parts = profile.genres[nativeLocale]
    .replace(/\s+(?:and|e|ed)\s+/gi, ', ')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  try {
    return new Intl.ListFormat(getLocaleDef(locale)?.hreflang || locale, { style: 'long', type: 'conjunction' }).format(parts);
  } catch {
    return parts.join(', ');
  }
}

function clampSummary(summary: string): string {
  if (summary.length <= EVENT_BATCH_SUMMARY_LIMIT) return summary;
  const suffix = ` WhatsApp ${EVENT_BATCH_PHONE}.`;
  const source = summary.replace(EVENT_BATCH_PHONE, '').replace(/\s+/g, ' ').trim();
  const maxPrefixLength = EVENT_BATCH_SUMMARY_LIMIT - [...suffix].length - 1;
  const prefix = [...source].slice(0, maxPrefixLength).join('').replace(/[\s,;:.-]+$/u, '');
  return `${prefix}…${suffix}`;
}

function clampFaqAnswer(answer: string): string {
  if (answer.length <= EVENT_BATCH_FAQ_ANSWER_LIMIT) return answer;
  const prefix = answer.slice(0, EVENT_BATCH_FAQ_ANSWER_LIMIT - 3);
  const lastSpace = prefix.lastIndexOf(' ');
  return `${prefix.slice(0, lastSpace > 220 ? lastSpace : prefix.length).trimEnd()}...`;
}

function valuesFor(profile: EventBatchProfile, locale: EventBatchLocale, pack: EventLocalePack): TemplateValues {
  const nativeLocale = locale === 'it' ? 'it' : 'en';
  const fallback = EVENT_BATCH_LOCALE_FALLBACKS[locale];
  const namedGuests = profile.specialGuests[nativeLocale]
    .filter((guest) => !/^(special guests|ospiti speciali)$/i.test(guest));
  const specialGuests = namedGuests.length > 0 ? namedGuests.join(', ') : fallback.noNamedGuests;
  const guestSentence = locale === 'en'
    ? `Special guests: ${specialGuests}.`
    : locale === 'it'
      ? `Ospiti speciali: ${specialGuests}.`
      : specialGuests;
  const guestFaqAnswer = locale === 'en'
    ? `The announced guests are ${specialGuests}.`
    : locale === 'it'
      ? `Gli ospiti annunciati sono ${specialGuests}.`
      : specialGuests;
  const tablePrices = profile.offers.filter((offer) => offer.category === 'table').map((offer) => offer.price);

  return {
    venue: profile.venue,
    event: profile.eventName[nativeLocale],
    date: localizedDate(profile, locale),
    start: profile.start,
    end: profile.end,
    genres: localizedGenres(profile, locale, pack),
    phone: EVENT_BATCH_PHONE,
    area: profile.area.en.replace(/,\s*Milan$/i, `, ${fallback.milanName}`),
    address: (VENUE_ADDRESS[profile.venue] || profile.area[nativeLocale]).replace(/Milano$/i, fallback.milanName),
    minAge: profile.minAge,
    lowestPrice: Math.min(...profile.offers.map((offer) => offer.price)),
    highestTable: tablePrices.length ? Math.max(...tablePrices) : 0,
    specialGuests,
    guestSentence,
    guestFaqAnswer,
    siteUrl: eventUrl(profile, locale),
    affiliateUrl: profile.affiliateUrl,
    dressCode: /long (?:trousers|pants)|pantaloni lunghi/i.test(profile.dressCode.en)
      ? fallback.elegantDressLongTrousers
      : fallback.elegantDress,
  };
}

export function getBatchLocalizedEventContent(
  profileOrSlug: EventBatchProfile | string,
  locale: EventBatchLocale,
  pack?: EventLocalePack,
): LocalizedEventContent {
  const profile = profileFor(profileOrSlug);
  const resolvedPack = packFor(locale, pack);
  validateEventBatchProfile(profile);
  validateEventLocalePack(resolvedPack);
  const values = valuesFor(profile, locale, resolvedPack);
  const fill = (template: string) => interpolateEventBatchTemplate(template, values);

  const content: LocalizedEventContent = {
    locale,
    canonicalSlug: profile.canonicalSlug,
    title: fill(resolvedPack.titleTemplate),
    seoSummary: clampSummary(fill(resolvedPack.summaryTemplate)),
    sections: [
      { title: resolvedPack.sectionTitles.experience, body: fill(resolvedPack.experienceBodies[profile.kind]) },
      { title: resolvedPack.sectionTitles.booking, body: fill(resolvedPack.bookingBody) },
      { title: resolvedPack.sectionTitles.access, body: fill(resolvedPack.accessBody) },
    ],
    programme: profile.programme.map((slot) => ({ start: slot.start, end: slot.end, title: fill(resolvedPack.programme[slot.key]) })),
    offers: profile.offers.map((offer) => ({ name: fill(resolvedPack.offers[offer.key]), price: offer.price, category: offer.category })),
    affiliateUrl: profile.affiliateUrl,
    faqs: resolvedPack.faqs.map((faq) => ({ question: fill(faq.question), answer: clampFaqAnswer(fill(faq.answer)) })),
  };
  validateBatchLocalizedEventContent(content);
  return content;
}

export function getBatchEventTemplateValues(
  profileOrSlug: EventBatchProfile | string,
  locale: EventBatchLocale,
  pack?: EventLocalePack,
): Readonly<TemplateValues> {
  const resolvedPack = packFor(locale, pack);
  return valuesFor(profileFor(profileOrSlug), locale, resolvedPack);
}
