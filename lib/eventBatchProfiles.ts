import type {
  EventExperienceKind,
  EventOfferKey,
  EventProgrammeKey,
} from './eventBatchLocaleTypes';
import { enabledLocaleCodes, type LocaleCode } from './i18n/locales';
import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_CANONICAL_SLUG,
} from './worldCupFinalIt';
import { WORLD_CUP_FINAL_LOCALE_COPIES } from './worldCupFinalLocaleCopies';

export interface EventBatchOfferProfile {
  key: EventOfferKey;
  price: number;
  category: 'ticket' | 'guestlist' | 'table';
}

export interface EventBatchProgrammeProfile {
  key: EventProgrammeKey;
  start: string;
  end: string;
}

export interface EventBatchProfile {
  baseId: string;
  /** Required for the multilingual Eventbrite batch; omitted for website-only editorial profiles. */
  eventbriteIds?: { en: string; it: string };
  canonicalSlug: string;
  localizedSlugs?: Partial<Record<LocaleCode, string>>;
  /** When present, this editorial event exists on the website only in these native locales. */
  siteLocales?: readonly LocaleCode[];
  /** Event-specific native locales allowed into hreflang, robots index and sitemap. */
  indexedLocales?: readonly LocaleCode[];
  eventName: { en: string; it: string } & Partial<Record<LocaleCode, string>>;
  venue: string;
  area: { en: string; it: string };
  dateISO: string;
  dates: { en: string; it: string };
  start: string;
  end: string;
  minAge: number;
  dressCode: { en: string; it: string };
  kind: EventExperienceKind;
  genres: { en: string; it: string };
  affiliateUrl: string;
  posterUrl: string;
  programme: readonly EventBatchProgrammeProfile[];
  offers: readonly EventBatchOfferProfile[];
  specialGuests: { en: readonly string[]; it: readonly string[] };
  venueImages: readonly [string, string, string, string];
}

const JUST_ME_IMAGES = [
  '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
  '/images/venues/just-me-milano/just-me-milano-lounge-01.webp',
  '/images/venues/just-me-milano/just-me-milano-interior-02.webp',
  '/images/venues/just-me-milano/just-me-milano-buffet-01.webp',
] as const;

const ARIA_IMAGES = [
  '/images/venues/aria-club-milano/aria-club-milano-bar-01.webp',
  '/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp',
  '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
  '/images/venues/aria-club-milano/aria-club-milano-garden-01.webp',
] as const;

const PINETA_IMAGES = [
  '/images/venues/pineta-milano/pineta-milano-ingresso-01.webp',
  '/images/venues/pineta-milano/pineta-milano-lounge-01.webp',
  '/images/venues/pineta-milano/pineta-milano-party-01.webp',
  '/images/venues/pineta-milano/pineta-milano-interior-01.webp',
] as const;

const justMeOffers = (clubPrice: number): readonly EventBatchOfferProfile[] => [
  { key: 'aperitifOneDrink', price: 15, category: 'ticket' },
  { key: 'clubOneDrink', price: clubPrice, category: 'ticket' },
  { key: 'danceFloorTable', price: 320, category: 'table' },
  { key: 'vipAreaTable', price: 640, category: 'table' },
  { key: 'superVipBackLineTable', price: 1280, category: 'table' },
  { key: 'superVipFrontLineTable', price: 3200, category: 'table' },
  { key: 'djTable', price: 5000, category: 'table' },
];

const ariaFridayOffers: readonly EventBatchOfferProfile[] = [
  { key: 'aperitifOneDrink', price: 15, category: 'ticket' },
  { key: 'clubOneDrink', price: 20, category: 'ticket' },
  { key: 'danceFloorTable', price: 200, category: 'table' },
  { key: 'priveAriaTable', price: 500, category: 'table' },
  { key: 'priveDjTable', price: 600, category: 'table' },
];

const ariaSaturdayOffers: readonly EventBatchOfferProfile[] = [
  { key: 'aperitifOneDrink', price: 15, category: 'ticket' },
  { key: 'womanOneDrink', price: 15, category: 'ticket' },
  { key: 'clubOneDrink', price: 20, category: 'ticket' },
  { key: 'danceFloorTable', price: 200, category: 'table' },
  { key: 'priveAriaTable', price: 500, category: 'table' },
  { key: 'priveDjTable', price: 600, category: 'table' },
];

const pinetaOffers = (aperitifTwoDrinks = false): readonly EventBatchOfferProfile[] => [
  { key: 'aperitifOneDrink', price: 15, category: 'ticket' },
  ...(aperitifTwoDrinks ? [{ key: 'aperitifTwoDrinks' as const, price: 15, category: 'ticket' as const }] : []),
  { key: 'clubTwoDrinks', price: 15, category: 'ticket' },
  { key: 'aperitifOpenWine', price: 20, category: 'ticket' },
  { key: 'danceFloorTable', price: 250, category: 'table' },
  { key: 'priveDanceFloorTable', price: 300, category: 'table' },
  { key: 'priveBalconyTable', price: 750, category: 'table' },
  { key: 'vipPriveTable', price: 1200, category: 'table' },
];

const insomniaOffers: readonly EventBatchOfferProfile[] = [
  { key: 'aperitifOneDrink', price: 15, category: 'ticket' },
  { key: 'aperitifTwoDrinks', price: 15, category: 'ticket' },
  { key: 'clubTwoDrinks', price: 15, category: 'ticket' },
  { key: 'danceFloorTable', price: 250, category: 'table' },
  { key: 'priveDanceFloorTable', price: 300, category: 'table' },
  { key: 'priveBalconyTable', price: 750, category: 'table' },
  { key: 'vipPriveTable', price: 1200, category: 'table' },
];

export const EVENT_BATCH_PROFILES: readonly EventBatchProfile[] = [
  {
    baseId: 'xc-220732', eventbriteIds: { en: '1993835628036', it: '1993835636060' },
    canonicalSlug: 'tussy-just-me-wednesday-july-15-2026-2026-07-15', eventName: { en: 'Tussy', it: 'Tussy' },
    venue: 'Just Me Milano', area: { en: 'Sempione, Milan', it: 'Sempione, Milano' }, dateISO: '2026-07-15', dates: { en: 'Wednesday, July 15, 2026', it: 'Mercoledi 15 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 21, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, affiliateUrl: 'https://xceed.me/en/milano/event/tussy-3/220732/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188753059%2F2988002064108%2F1%2Foriginal.20260713-144136?auto=format%2Ccompress&q=75&sharp=10&s=fbe3df29d9a32bdac47c51bdb3fb7e0b',
    programme: [{ key: 'aperitif', start: '19:30', end: '23:00' }, { key: 'clubMixed', start: '23:00', end: '05:00' }], offers: justMeOffers(15), specialGuests: { en: ['Special guests'], it: ['Ospiti speciali'] }, venueImages: JUST_ME_IMAGES,
  },
  {
    baseId: 'xc-237992', eventbriteIds: { en: '1993837720294', it: '1993837735339' },
    canonicalSlug: 'england-vs-argentina-live-pineta-club-wednesday-july-15-2026-2026-07-1', eventName: { en: 'England vs Argentina Live', it: 'Inghilterra-Argentina in diretta' },
    venue: 'Pineta Club', area: { en: 'Via Messina 38, Milan', it: 'Via Messina 38, Milano' }, dateISO: '2026-07-15', dates: { en: 'Wednesday, July 15, 2026', it: 'Mercoledi 15 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 18, dressCode: { en: 'Elegant dress.', it: 'Abbigliamento elegante.' }, kind: 'match',
    genres: { en: 'Match screening and DJ set', it: 'Diretta della partita e DJ set' }, affiliateUrl: 'https://xceed.me/en/milano/event/miercoles-15-de-julio-inglaterra-vs-argentina-en-vivo-en-pineta-milano/237992/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188755291%2F2988002064108%2F1%2Foriginal.20260713-150640?auto=format%2Ccompress&q=75&sharp=10&s=337ea4c1e07ef17577edc2f6b577bb6d',
    programme: [{ key: 'aperitif', start: '19:30', end: '21:30' }, { key: 'matchAndDj', start: '21:30', end: '05:00' }], offers: [{ key: 'aperitifTwoDrinks', price: 15, category: 'ticket' }], specialGuests: { en: [], it: [] }, venueImages: PINETA_IMAGES,
  },
  {
    baseId: 'xc-220758', eventbriteIds: { en: '1993836032245', it: '1993836034251' },
    canonicalSlug: 'friday-night-just-me-friday-july-17-2026-2026-07-17', eventName: { en: 'Friday Night', it: 'Friday Night' },
    venue: 'Just Me Milano', area: { en: 'Sempione, Milan', it: 'Sempione, Milano' }, dateISO: '2026-07-17', dates: { en: 'Friday, July 17, 2026', it: 'Venerdi 17 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 21, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, affiliateUrl: 'https://xceed.me/en/milano/event/friday-night-668/220758/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188753459%2F2988002064108%2F1%2Foriginal.20260713-144614?auto=format%2Ccompress&q=75&sharp=10&s=e563abdc2c4f26e9cd884d2985fe0841',
    programme: [{ key: 'aperitif', start: '19:30', end: '23:00' }, { key: 'clubMixed', start: '23:00', end: '05:00' }], offers: justMeOffers(20), specialGuests: { en: [], it: [] }, venueImages: JUST_ME_IMAGES,
  },
  {
    baseId: 'xc-229416', eventbriteIds: { en: '1993837082386', it: '1993837085395' },
    canonicalSlug: 'friday-night-aria-club-milano-friday-july-17-2026-2026-07-17', eventName: { en: 'Friday Night', it: 'Friday Night' },
    venue: 'Aria Club Milano', area: { en: 'CityLife, Milan', it: 'CityLife, Milano' }, dateISO: '2026-07-17', dates: { en: 'Friday, July 17, 2026', it: 'Venerdi 17 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 18, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'Hip-hop, dance, reggaeton, hits and EDM', it: 'Hip-hop, dance, reggaeton, hit ed EDM' }, affiliateUrl: 'https://xceed.me/en/milano/event/friday-night-700/229416/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188754598%2F2988002064108%2F1%2Foriginal.20260713-145834?auto=format%2Ccompress&q=75&sharp=10&s=14625bd8c98b3be4d50536c66b9b2ebd',
    programme: [{ key: 'aperitif', start: '19:30', end: '22:30' }, { key: 'clubHouseLatin', start: '22:30', end: '05:00' }], offers: ariaFridayOffers, specialGuests: { en: [], it: [] }, venueImages: ARIA_IMAGES,
  },
  {
    baseId: 'xc-220810', eventbriteIds: { en: '1993838577859', it: '1993838582874' },
    canonicalSlug: 'friday-night-pineta-club-friday-july-17-2026-2026-07-17', eventName: { en: 'Friday Night', it: 'Friday Night' },
    venue: 'Pineta Club', area: { en: 'Corso Como, Milan', it: 'Corso Como, Milano' }, dateISO: '2026-07-17', dates: { en: 'Friday, July 17, 2026', it: 'Venerdi 17 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 18, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'House, hip-hop and reggaeton', it: 'House, hip-hop e reggaeton' }, affiliateUrl: 'https://xceed.me/en/milano/event/friday-night-688/220810/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188755618%2F2988002064108%2F1%2Foriginal.20260713-151032?auto=format%2Ccompress&q=75&sharp=10&s=65e043228b03078a2537df335e858abd',
    programme: [{ key: 'aperitif', start: '19:30', end: '22:30' }, { key: 'clubHouseLatin', start: '22:30', end: '05:00' }], offers: pinetaOffers(), specialGuests: { en: [], it: [] }, venueImages: PINETA_IMAGES,
  },
  {
    baseId: 'xc-220771', eventbriteIds: { en: '1993836279986', it: '1993836379283' },
    canonicalSlug: 'perreo-saturday-night-just-me-saturday-july-18-2026-2026-07-18', eventName: { en: 'Perreo Saturday Night', it: 'Perreo Saturday Night' },
    venue: 'Just Me Milano', area: { en: 'Sempione, Milan', it: 'Sempione, Milano' }, dateISO: '2026-07-18', dates: { en: 'Saturday, July 18, 2026', it: 'Sabato 18 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 21, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, affiliateUrl: 'https://xceed.me/en/milano/event/perreo-saturday-night/220771/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188753841%2F2988002064108%2F1%2Foriginal.20260713-145028?auto=format%2Ccompress&q=75&sharp=10&s=05a9d5e0666d63e692d20467451f9823',
    programme: [{ key: 'aperitifDinner', start: '19:30', end: '22:00' }, { key: 'clubMixed', start: '22:00', end: '05:00' }], offers: justMeOffers(20), specialGuests: { en: ['Special guests'], it: ['Ospiti speciali'] }, venueImages: JUST_ME_IMAGES,
  },
  {
    baseId: 'xc-229435', eventbriteIds: { en: '1993837419394', it: '1993837435442' },
    canonicalSlug: 'saturday-night-aria-club-milano-saturday-july-18-2026-2026-07-18', eventName: { en: 'Saturday Night', it: 'Saturday Night' },
    venue: 'Aria Club Milano', area: { en: 'CityLife, Milan', it: 'CityLife, Milano' }, dateISO: '2026-07-18', dates: { en: 'Saturday, July 18, 2026', it: 'Sabato 18 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 18, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'Hip-hop, dance, reggaeton, hits and EDM', it: 'Hip-hop, dance, reggaeton, hit ed EDM' }, affiliateUrl: 'https://xceed.me/en/milano/event/saturday-night-719/229435/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188754944%2F2988002064108%2F1%2Foriginal.20260713-150243?auto=format%2Ccompress&q=75&sharp=10&s=47ce58f244269634bf78a902f267a83e',
    programme: [{ key: 'aperitifDinner', start: '19:30', end: '22:30' }, { key: 'clubHouseLatin', start: '22:30', end: '05:00' }], offers: ariaSaturdayOffers, specialGuests: { en: [], it: [] }, venueImages: ARIA_IMAGES,
  },
  {
    baseId: 'xc-220834', eventbriteIds: { en: '1993838790495', it: '1993838800525' },
    canonicalSlug: 'saturday-night-pineta-club-saturday-july-18-2026-2026-07-18', eventName: { en: 'Saturday Night', it: 'Saturday Night' },
    venue: 'Pineta Club', area: { en: 'Corso Como, Milan', it: 'Corso Como, Milano' }, dateISO: '2026-07-18', dates: { en: 'Saturday, July 18, 2026', it: 'Sabato 18 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 18, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'House, hip-hop and reggaeton', it: 'House, hip-hop e reggaeton' }, affiliateUrl: 'https://xceed.me/en/milano/event/saturday-night-706/220834/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188755947%2F2988002064108%2F1%2Foriginal.20260713-151408?auto=format%2Ccompress&q=75&sharp=10&s=3c16f8cf3fc2be747f2f2f8ea782e450',
    programme: [{ key: 'aperitif', start: '19:30', end: '23:00' }, { key: 'clubHouseLatin', start: '23:00', end: '05:00' }], offers: pinetaOffers(), specialGuests: { en: [], it: [] }, venueImages: PINETA_IMAGES,
  },
  {
    baseId: 'xc-238006', eventbriteIds: { en: '1993839211755', it: '1993839219779' },
    canonicalSlug: 'insomnia-pineta-club-saturday-july-18-2026-2026-07-18', eventName: { en: 'INSOMNIA', it: 'INSOMNIA' },
    venue: 'Pineta Club', area: { en: 'Via Messina 38, Milan', it: 'Via Messina 38, Milano' }, dateISO: '2026-07-18', dates: { en: 'Saturday, July 18, 2026', it: 'Sabato 18 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 18, dressCode: { en: 'Elegant dress.', it: 'Abbigliamento elegante.' }, kind: 'showcase',
    genres: { en: 'House, hip-hop and reggaeton', it: 'House, hip-hop e reggaeton' }, affiliateUrl: 'https://xceed.me/en/milano/event/insomnia-15/238006/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188756631%2F2988002064108%2F1%2Foriginal.20260713-152143?auto=format%2Ccompress&q=75&sharp=10&s=c141a30320bb9f9943278df4aab464f7',
    programme: [{ key: 'aperitif', start: '19:30', end: '23:00' }, { key: 'showcase', start: '23:00', end: '05:00' }], offers: insomniaOffers, specialGuests: { en: ['Andy Van Pastor', 'Josh the Panda', 'Insomnia Girls'], it: ['Andy Van Pastor', 'Josh the Panda', 'Insomnia Girls'] }, venueImages: PINETA_IMAGES,
  },
  {
    baseId: 'xc-238003', eventbriteIds: { en: '1993839097413', it: '1993839102428' },
    canonicalSlug: 'la-fiesta-sigue-afterparty-pineta-club-saturday-july-18-2026-2026-07-1', eventName: { en: 'La Fiesta Sigue Afterparty', it: 'La Fiesta Sigue Afterparty' },
    venue: 'Pineta Club', area: { en: 'Via Messina 38, Milan', it: 'Via Messina 38, Milano' }, dateISO: '2026-07-18', dates: { en: 'Saturday, July 18, 2026', it: 'Sabato 18 luglio 2026' },
    start: '23:00', end: '05:00', minAge: 18, dressCode: { en: 'Elegant dress.', it: 'Abbigliamento elegante.' }, kind: 'afterparty',
    genres: { en: 'Reggaeton, dembow, baile funk, house and hip-hop', it: 'Reggaeton, dembow, baile funk, house e hip-hop' }, affiliateUrl: 'https://xceed.me/en/milano/event/la-fiesta-sigue-afterparty/238003/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188756313%2F2988002064108%2F1%2Foriginal.20260713-151807?auto=format%2Ccompress&q=75&sharp=10&s=ce92df7191ecb51b619a4b4039c30b77',
    programme: [{ key: 'afterpartyArrival', start: '23:00', end: '01:00' }, { key: 'afterpartyPeak', start: '01:00', end: '05:00' }], offers: [{ key: 'clubTwoDrinks', price: 15, category: 'ticket' }], specialGuests: { en: [], it: [] }, venueImages: PINETA_IMAGES,
  },
  {
    baseId: 'xc-220784', eventbriteIds: { en: '1993836651096', it: '1993836670153' },
    canonicalSlug: 'uptown-nights-just-me-sunday-july-19-2026-2026-07-19', eventName: { en: 'Uptown Nights', it: 'Uptown Nights' },
    venue: 'Just Me Milano', area: { en: 'Sempione, Milan', it: 'Sempione, Milano' }, dateISO: '2026-07-19', dates: { en: 'Sunday, July 19, 2026', it: 'Domenica 19 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 21, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'club',
    genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, affiliateUrl: 'https://xceed.me/en/milano/event/uptown-nights-73/220784/channel/nightlifemilan-1',
    posterUrl: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1188754235%2F2988002064108%2F1%2Foriginal.20260713-145438?auto=format%2Ccompress&q=75&sharp=10&s=c97267923bf1b1e8a9b35cde9576de94',
    programme: [{ key: 'aperitifDinner', start: '19:30', end: '23:00' }, { key: 'clubMixed', start: '23:00', end: '05:00' }], offers: justMeOffers(15), specialGuests: { en: ['Special guests'], it: ['Ospiti speciali'] }, venueImages: JUST_ME_IMAGES,
  },
];

export const SITE_ONLY_EVENT_PROFILES: readonly EventBatchProfile[] = [
  {
    baseId: 'nlm-world-cup-final-2026',
    canonicalSlug: WORLD_CUP_FINAL_CANONICAL_SLUG,
    localizedSlugs: Object.fromEntries(enabledLocaleCodes.map((locale) => [locale, WORLD_CUP_FINAL_LOCALE_COPIES[locale].slug])),
    siteLocales: enabledLocaleCodes,
    indexedLocales: enabledLocaleCodes,
    eventName: {
      en: 'World Cup Final on the Big Screen',
      it: 'Finale Coppa del Mondo su maxischermo',
      ...Object.fromEntries(enabledLocaleCodes.map((locale) => [locale, WORLD_CUP_FINAL_LOCALE_COPIES[locale].eventName])),
    },
    venue: 'Just Me Milano', area: { en: 'Sempione, Milan', it: 'Sempione, Milano' }, dateISO: '2026-07-19', dates: { en: 'Sunday, July 19, 2026', it: 'Domenica 19 luglio 2026' },
    start: '19:30', end: '05:00', minAge: 21, dressCode: { en: 'Elegant dress; long trousers for men.', it: 'Abbigliamento elegante; pantaloni lunghi per gli uomini.' }, kind: 'match',
    genres: { en: 'World Cup final screening, house, hip-hop, hits, EDM and reggaeton', it: 'Finale Coppa del Mondo, house, hip-hop, hit, EDM e reggaeton' }, affiliateUrl: WORLD_CUP_FINAL_AFFILIATE_URL,
    posterUrl: 'https://nightlifemilan.com/images/events/generated/just-me-world-cup-final-cover-2x1-en-v1.jpg',
    programme: [{ key: 'aperitif', start: '19:30', end: '20:45' }, { key: 'matchAndDj', start: '21:00', end: '23:00' }, { key: 'clubMixed', start: '23:00', end: '05:00' }], offers: justMeOffers(15), specialGuests: { en: [], it: [] }, venueImages: JUST_ME_IMAGES,
  },
] as const;

const ALL_EVENT_PROFILES: readonly EventBatchProfile[] = [
  ...EVENT_BATCH_PROFILES,
  ...SITE_ONLY_EVENT_PROFILES,
];

const profilesBySlug = new Map<string, EventBatchProfile>();
for (const profile of ALL_EVENT_PROFILES) {
  profilesBySlug.set(profile.canonicalSlug, profile);
  Object.values(profile.localizedSlugs || {}).forEach((slug) => {
    if (slug) profilesBySlug.set(slug, profile);
  });
}
const profilesByBase = new Map(ALL_EVENT_PROFILES.map((profile) => [profile.baseId, profile]));

export function getEventBatchSlug(profile: EventBatchProfile, locale: LocaleCode): string {
  return profile.localizedSlugs?.[locale] || profile.canonicalSlug;
}

export function normalizeEventBatchSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function getEventBatchProfile(slug: string): EventBatchProfile | undefined {
  return profilesBySlug.get(slug) || profilesBySlug.get(normalizeEventBatchSlug(slug));
}

export function getEventBatchProfileByBase(baseId: string): EventBatchProfile | undefined {
  return profilesByBase.get(baseId);
}
