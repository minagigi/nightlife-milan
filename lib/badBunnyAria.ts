import { BAD_BUNNY_ARIA_EDITORIAL_COPY } from './badBunnyAriaEditorialCopy';
import { enabledLocaleCodes, type LocaleCode } from './i18n/locales';

export const BAD_BUNNY_ARIA_BASE_ID = 'xc-229435';
export const BAD_BUNNY_ARIA_CANONICAL_SLUG = 'saturday-night-aria-club-milano-saturday-july-18-2026-2026-07-18';
export const BAD_BUNNY_ARIA_AFFILIATE_URL = 'https://xceed.me/en/milano/event/saturday-night-719/229435/channel/nightlifemilan-1';
export const BAD_BUNNY_ARIA_PHONE = '+39 351 912 7047';
export const BAD_BUNNY_ARIA_WHATSAPP = 'https://wa.me/393519127047';
export const BAD_BUNNY_ARIA_ADDRESS = 'Piazzale dello Sport 14, 20151 Milano';
export const BAD_BUNNY_ARIA_START_UTC = '2026-07-18T17:30:00Z';
export const BAD_BUNNY_ARIA_END_UTC = '2026-07-19T03:00:00Z';

export const BAD_BUNNY_ARIA_EVENT_NAMES = Object.fromEntries(
  enabledLocaleCodes.map((locale) => [locale, BAD_BUNNY_ARIA_EDITORIAL_COPY[locale].eventName]),
) as Record<LocaleCode, string>;

export const BAD_BUNNY_ARIA_LOCALIZED_SLUGS = Object.fromEntries(
  enabledLocaleCodes.map((locale) => [locale, BAD_BUNNY_ARIA_CANONICAL_SLUG]),
) as Record<LocaleCode, string>;

export const BAD_BUNNY_ARIA_KEYWORDS_IT = [
  'Bad Bunny after party Milano',
  'Bad Bunny Milano after party',
  'after party concerto Bad Bunny',
  'festa Bad Bunny Milano',
  'reggaeton Bad Bunny Milano',
  'Aria Club Bad Bunny after party',
  'discoteca dopo concerto Bad Bunny',
  'latin party Bad Bunny Milano',
  'nightlife San Siro Bad Bunny',
  'tavoli VIP Bad Bunny after party',
] as const;

export type BadBunnyAriaImageKind = 'cover' | 'poster' | 'venue' | 'aperitivo' | 'club' | 'tables';

export function getBadBunnyAriaImagePath(kind: BadBunnyAriaImageKind): string;
export function getBadBunnyAriaImagePath(locale: LocaleCode, kind: BadBunnyAriaImageKind): string;
export function getBadBunnyAriaImagePath(
  localeOrKind: LocaleCode | BadBunnyAriaImageKind,
  maybeKind?: BadBunnyAriaImageKind,
): string {
  const locale = maybeKind ? localeOrKind as LocaleCode : 'it';
  const kind = maybeKind || localeOrKind as BadBunnyAriaImageKind;
  const ratio = kind === 'cover' ? '2x1' : '5x4';
  return `/images/events/generated/bad-bunny-aria-2026-07-18-${kind}-${ratio}-${locale}-v2.jpg`;
}

export function getBadBunnyAriaSiteUrl(locale: LocaleCode): string {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `https://nightlifemilan.com${prefix}/events/${BAD_BUNNY_ARIA_CANONICAL_SLUG}`;
}
