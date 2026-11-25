/**
 * Single source of truth for Just Singing in the Rain (Wed 25 Nov 2026 · Just Me Milano)
 * Eventbrite URLs & media paths.
 *
 * - Update JUST_SINGING_EVENTBRITE_URLS (1 line per language) as soon as Eventbrite pages go public.
 *   While empty (''), the site automatically uses WhatsApp (+39 351 912 7047) as primary CTA everywhere.
 * - Replace public/images/events/just-singing-rain-2026/just-singing-in-the-rain-justme-milano-2026.webp
 *   in-place when artwork is updated: every card, spotlight, hero, og:image, and schema reads this path.
 */

export const JUST_SINGING_RAIN_POSTER_SRC =
  '/images/events/just-singing-rain-2026/just-singing-in-the-rain-justme-milano-2026.webp';

export const JUST_SINGING_RAIN_FLOW_ASSET_KEYS = [
  'just-singing-rain-justme-01',
  'just-singing-rain-justme-02',
  'just-singing-rain-justme-03',
  'just-singing-rain-justme-04',
] as const;

export const JUST_SINGING_RAIN_EXTRA_ASSET_KEYS = [
  'just-singing-rain-justme-05',
  'just-singing-rain-justme-06',
] as const;

export const JUST_SINGING_EVENTBRITE_URLS: Record<'it' | 'en' | 'es' | 'de' | 'fr', string> = {
  it: 'https://www.eventbrite.it/e/biglietti-just-singing-in-the-rain-ingresso-gratis-drink-offerto-just-me-milano-2005464134211',
  en: 'https://www.eventbrite.it/e/just-singing-in-the-rain-free-entry-free-drink-just-me-milano-25-nov-tickets-2005464126187',
  es: 'https://www.eventbrite.it/e/entradas-just-singing-in-the-rain-entrada-gratis-copa-gratis-just-me-milano-2005464146247',
  de: 'https://www.eventbrite.it/e/just-singing-in-the-rain-freier-eintritt-gratis-drink-just-me-milano-tickets-2005464157280',
  fr: 'https://www.eventbrite.it/e/billets-just-singing-in-the-rain-entree-gratuite-verre-offert-just-me-milano-2005464164301',
};

export function resolveConfiguredEventbriteUrl(code: string): string | null {
  const direct =
    code === 'it' || code === 'en' || code === 'es' || code === 'de' || code === 'fr'
      ? JUST_SINGING_EVENTBRITE_URLS[code].trim()
      : JUST_SINGING_EVENTBRITE_URLS.en.trim();
  if (/^https:\/\/www\.eventbrite\./i.test(direct)) {
    return direct;
  }
  const fallbackEn = JUST_SINGING_EVENTBRITE_URLS.en.trim();
  if (/^https:\/\/www\.eventbrite\./i.test(fallbackEn)) {
    return fallbackEn;
  }
  const fallbackIt = JUST_SINGING_EVENTBRITE_URLS.it.trim();
  if (/^https:\/\/www\.eventbrite\./i.test(fallbackIt)) {
    return fallbackIt;
  }
  return null;
}
