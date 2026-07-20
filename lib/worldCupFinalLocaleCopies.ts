import { enabledLocaleCodes, type LocaleCode } from './i18n/locales';
import { WORLD_CUP_FINAL_EN_SLUG } from './worldCupFinalEn';
import { WORLD_CUP_FINAL_IT_SLUG } from './worldCupFinalIt';
import { worldCupFinalLocalesWestWorld } from './worldCupFinalLocalesWestWorld';
import { worldCupFinalLocalesNorthEast } from './worldCupFinalLocalesNorthEast';
import { worldCupFinalLocalesBalkan } from './worldCupFinalLocalesBalkan';
import type { WorldCupFinalLocaleCopy, WorldCupFinalLocaleCopyMap } from './worldCupFinalLocaleTypes';

const en: WorldCupFinalLocaleCopy = {
  locale: 'en',
  slug: WORLD_CUP_FINAL_EN_SLUG,
  eventName: 'World Cup Final Spain vs Argentina on the Big Screen at Just Me Milan',
  keywordIntents: [
    'World Cup final on a big screen in Milan',
    'where to watch Spain vs Argentina in Milan',
    '2026 World Cup final in Milan',
    'football match on a big screen in Milan',
    'Just Me Milan World Cup final',
  ],
  poster: {
    worldCupFinal: 'WORLD CUP FINAL 2026',
    final: 'FINAL',
    teams: 'SPAIN VS ARGENTINA',
    date: 'SUNDAY 19.07.26',
    doors: 'DOORS 19:30',
    live: 'LIVE 21:00',
    aperitif: 'COCKTAILS & APERITIVO',
    bookings: 'WHATSAPP BOOKINGS',
  },
  gallery: {
    heading: 'World Cup final and Just Me Milan',
    posterTitle: 'Spain vs Argentina World Cup final poster at Just Me Milan',
    posterAlt: 'Spain and Argentina players on the localized Just Me Milan World Cup final poster with Torre Branca, flags, date and verified times',
    moodTitles: ['Torre Branca beside Just Me Milan', 'Aperitif buffet at Just Me Milan', 'Lounge and tables at Just Me Milan', 'Evening atmosphere beneath Torre Branca'],
    moodAlts: [
      'Torre Branca lit in pink between trees under the evening sky in Parco Sempione, Milan',
      'Just Me Milan buffet with savoury dishes, desserts and two members of staff serving guests',
      'Just Me Milan lounge with black sofas, low tables, pink lighting and venue signs',
      'Outdoor lounge with guests, sofas and a laid table in front of Torre Branca lit in pink',
    ],
  },
};

const it: WorldCupFinalLocaleCopy = {
  locale: 'it',
  slug: WORLD_CUP_FINAL_IT_SLUG,
  eventName: 'Finale Coppa del Mondo Spagna-Argentina su maxischermo al Just Me Milano',
  keywordIntents: [
    'finale Coppa del Mondo su maxischermo a Milano',
    'dove vedere Spagna-Argentina a Milano',
    'finale Mondiali 2026 a Milano',
    'partita su maxischermo a Milano',
    'Just Me Milano finale Coppa del Mondo',
  ],
  poster: {
    worldCupFinal: 'FINALE COPPA DEL MONDO 2026',
    final: 'FINALE',
    teams: 'SPAGNA VS ARGENTINA',
    date: 'DOMENICA 19.07.26',
    doors: 'APERTURA 19:30',
    live: 'DIRETTA 21:00',
    aperitif: 'COCKTAIL & APERITIVO',
    bookings: 'PRENOTAZIONI WHATSAPP',
  },
  gallery: {
    heading: 'Finale Coppa del Mondo e Just Me Milano',
    posterTitle: 'Locandina Spagna-Argentina al Just Me Milano',
    posterAlt: 'Giocatori di Spagna e Argentina sulla locandina localizzata della finale al Just Me Milano con Torre Branca, bandiere, data e orari verificati',
    moodTitles: ['Torre Branca accanto al Just Me Milano', 'Buffet aperitivo al Just Me Milano', 'Lounge e tavoli al Just Me Milano', 'Atmosfera serale sotto Torre Branca'],
    moodAlts: [
      'Torre Branca illuminata di rosa tra gli alberi sotto il cielo serale di Parco Sempione a Milano',
      'Buffet del Just Me Milano con piatti salati, dolci e due membri dello staff che servono gli ospiti',
      'Lounge del Just Me Milano con divani neri, tavolini, luci rosa e insegne del locale',
      'Lounge esterna con ospiti, divani e tavolo apparecchiato davanti a Torre Branca illuminata di rosa',
    ],
  },
};

export const WORLD_CUP_FINAL_LOCALE_COPIES: WorldCupFinalLocaleCopyMap = {
  en,
  it,
  ...worldCupFinalLocalesWestWorld,
  ...worldCupFinalLocalesNorthEast,
  ...worldCupFinalLocalesBalkan,
} as WorldCupFinalLocaleCopyMap;

export function getWorldCupFinalLocaleCopy(locale: LocaleCode): WorldCupFinalLocaleCopy {
  const copy = WORLD_CUP_FINAL_LOCALE_COPIES[locale];
  if (!copy) throw new Error(`Missing World Cup final locale copy: ${locale}`);
  return copy;
}

export function validateWorldCupFinalLocaleCopies(): void {
  const missing = enabledLocaleCodes.filter((locale) => !WORLD_CUP_FINAL_LOCALE_COPIES[locale]);
  if (missing.length > 0) throw new Error(`Missing World Cup final locale copies: ${missing.join(', ')}`);

  const slugs = new Set<string>();
  for (const locale of enabledLocaleCodes) {
    const copy = getWorldCupFinalLocaleCopy(locale);
    if (copy.locale !== locale) throw new Error(`World Cup locale key mismatch: ${locale}`);
    if (copy.keywordIntents.length !== 5 || new Set(copy.keywordIntents).size !== 5) {
      throw new Error(`${locale} must define five distinct World Cup search intents`);
    }
    if (slugs.has(copy.slug)) throw new Error(`Duplicate World Cup localized slug: ${copy.slug}`);
    slugs.add(copy.slug);
    Object.values(copy.poster).forEach((value) => {
      if (!value.trim()) throw new Error(`${locale} has an empty poster string`);
    });
  }
}
