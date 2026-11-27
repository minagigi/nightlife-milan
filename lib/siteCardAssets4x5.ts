import { toCardPoster4x5 } from './cardPoster4x5';

/**
 * Deterministic, verified 4:5 (1080x1350 <= 300 KB) asset resolvers for all
 * navigable card sections across nightlifemilan.com:
 *  - Venue / Club cards -> 100% real club photography (partner-clubs/*.webp), zero NYE flyers, zero cross-venue swaps.
 *  - Event / NYE category cards -> 100% genuine graphic event posters (cards-4x5/**).
 *  - Zone / Genre / Guide / Pillar cards -> dedicated 4:5 editorial WebP assets.
 */

const VENUE_CARD_4X5_BY_KEY: Readonly<Record<string, string>> = {
  // 47 canonical venue IDs
  'v-justme': '/images/events/cards-4x5/partner-clubs/just-me-milano.webp',
  'v-pineta': '/images/events/cards-4x5/partner-clubs/pineta-club-milano.webp',
  'v-aria': '/images/events/cards-4x5/partner-clubs/aria-club-milano.webp',
  'v-voya': '/images/events/cards-4x5/partner-clubs/voya-rooftop-milan.webp',
  'v-55milano': '/images/events/cards-4x5/partner-clubs/55-milano.webp',
  'v-repvblic': '/images/events/cards-4x5/partner-clubs/repvblic-milano.webp',
  'v-playclub': '/images/events/cards-4x5/partner-clubs/play-club-milano.webp',
  'v-11clubroom': '/images/events/cards-4x5/partner-clubs/11-clubroom.webp',
  'v-tocqueville': '/images/events/cards-4x5/partner-clubs/tocqueville-13-milano.webp',
  'v-armani-prive': '/images/events/cards-4x5/partner-clubs/armani-prive-milano.webp',
  'v-volt': '/images/events/cards-4x5/partner-clubs/volt-club-milano.webp',
  'v-hollywood': '/images/events/cards-4x5/partner-clubs/hollywood-club-milano.webp',
  'v-theclub': '/images/events/cards-4x5/partner-clubs/the-club-milano.webp',
  'v-gattopardo': '/images/events/cards-4x5/partner-clubs/gattopardo-milano.webp',
  'v-mibmilano': '/images/events/cards-4x5/partner-clubs/mib-milano.webp',
  'v-dazi': '/images/events/cards-4x5/partner-clubs/dazi-milano.webp',
  'v-church81': '/images/events/cards-4x5/partner-clubs/church-81.webp',
  'v-terrazza21': '/images/events/cards-4x5/partner-clubs/terrazza-21.webp',
  'v-ceresio-7': '/images/events/cards-4x5/partner-clubs/ceresio-7-milano.webp',
  'v-alcatraz': '/images/events/cards-4x5/partner-clubs/alcatraz-milano.webp',
  'v-fabrique': '/images/events/cards-4x5/partner-clubs/fabrique-milano.webp',
  'v-amnesia': '/images/events/cards-4x5/partner-clubs/amnesia-milano.webp',
  'v-magazzini': '/images/events/cards-4x5/partner-clubs/magazzini-generali-milano.webp',
  'v-apollo': '/images/events/cards-4x5/partner-clubs/apollo-club-milano.webp',
  'v-loolapaloosa': '/images/events/cards-4x5/partner-clubs/loolapaloosa-milano.webp',
  'v-bobino': '/images/events/cards-4x5/partner-clubs/bobino-milano.webp',
  'v-dock22': '/images/events/cards-4x5/partner-clubs/dock-22-milano.webp',
  'v-super-club-milano': '/images/events/cards-4x5/partner-clubs/super-club-milano.webp',
  'v-radio-rooftop-bar-milano': '/images/events/cards-4x5/partner-clubs/radio-rooftop-bar-milano.webp',
  'v-the-roof-milano': '/images/events/cards-4x5/partner-clubs/the-roof-milano.webp',
  'v-terrazza-aperol-milano': '/images/events/cards-4x5/partner-clubs/terrazza-aperol-milano.webp',
  'v-terrazza-gallia-milano': '/images/events/cards-4x5/partner-clubs/terrazza-gallia-milano.webp',
  'v-ristorante-torre-milano': '/images/events/cards-4x5/partner-clubs/ristorante-torre-milano.webp',
  'v-innocenti-evasioni-terrazza-triennale': '/images/events/cards-4x5/partner-clubs/innocenti-evasioni-terrazza-triennale.webp',
  'v-philipps': '/images/events/cards-4x5/partner-clubs/philipps-milano.webp',
  'v-carlsbergol': '/images/events/cards-4x5/partner-clubs/carlsberg-ol-milano.webp',
  'v-tom': '/images/events/cards-4x5/partner-clubs/tom-the-ordinary-market-milano.webp',
  'v-bischeri': '/images/events/cards-4x5/partner-clubs/bischeri-milano.webp',
  'v-gate': '/images/events/cards-4x5/partner-clubs/gate-milano.webp',
  'v-pelledoca': '/images/events/cards-4x5/partner-clubs/pelledoca-milano.webp',
  'v-justme-garda': '/images/events/cards-4x5/partner-clubs/justme-garda-lake.webp',
  'v-setai-bergamo': '/images/events/cards-4x5/partner-clubs/setai-club-bergamo.webp',
  'v-capogiro-bergamo': '/images/events/cards-4x5/partner-clubs/capogiro-curno-bergamo.webp',
  'v-tiky-klub-bergamo': '/images/events/cards-4x5/partner-clubs/tiky-klub-seriate-bergamo.webp',
  'v-zero-club-bergamo': '/images/events/cards-4x5/partner-clubs/zero-club-bergamo.webp',
  'v-qi-clubbing-brescia': '/images/events/cards-4x5/partner-clubs/qi-clubbing-erbusco-brescia.webp',
  'v-number-one-brescia': '/images/events/cards-4x5/partner-clubs/number-one-corte-franca-brescia.webp',

  // Canonical EN/IT slugs & common aliases
  'just-me-milano': '/images/events/cards-4x5/partner-clubs/just-me-milano.webp',
  'just-me-milan': '/images/events/cards-4x5/partner-clubs/just-me-milano.webp',
  'justme': '/images/events/cards-4x5/partner-clubs/just-me-milano.webp',
  'pineta-club-milano': '/images/events/cards-4x5/partner-clubs/pineta-club-milano.webp',
  'pineta-milano': '/images/events/cards-4x5/partner-clubs/pineta-club-milano.webp',
  'pineta': '/images/events/cards-4x5/partner-clubs/pineta-club-milano.webp',
  'aria-club-milano': '/images/events/cards-4x5/partner-clubs/aria-club-milano.webp',
  'aria-milano': '/images/events/cards-4x5/partner-clubs/aria-club-milano.webp',
  'aria': '/images/events/cards-4x5/partner-clubs/aria-club-milano.webp',
  'voya-rooftop-milan': '/images/events/cards-4x5/partner-clubs/voya-rooftop-milan.webp',
  'voya-rooftop-milano': '/images/events/cards-4x5/partner-clubs/voya-rooftop-milan.webp',
  'voya': '/images/events/cards-4x5/partner-clubs/voya-rooftop-milan.webp',
  '55-milano': '/images/events/cards-4x5/partner-clubs/55-milano.webp',
  '55milano': '/images/events/cards-4x5/partner-clubs/55-milano.webp',
  'repvblic-milano': '/images/events/cards-4x5/partner-clubs/repvblic-milano.webp',
  'repvblic': '/images/events/cards-4x5/partner-clubs/repvblic-milano.webp',
  'play-club-milano': '/images/events/cards-4x5/partner-clubs/play-club-milano.webp',
  'playclub': '/images/events/cards-4x5/partner-clubs/play-club-milano.webp',
  '11-clubroom': '/images/events/cards-4x5/partner-clubs/11-clubroom.webp',
  '11-clubroom-milano': '/images/events/cards-4x5/partner-clubs/11-clubroom.webp',
  '11clubroom': '/images/events/cards-4x5/partner-clubs/11-clubroom.webp',
  'tocqueville-13-milano': '/images/events/cards-4x5/partner-clubs/tocqueville-13-milano.webp',
  'tocqueville-13': '/images/events/cards-4x5/partner-clubs/tocqueville-13-milano.webp',
  'tocqueville': '/images/events/cards-4x5/partner-clubs/tocqueville-13-milano.webp',
  'armani-prive-milano': '/images/events/cards-4x5/partner-clubs/armani-prive-milano.webp',
  'armani-prive': '/images/events/cards-4x5/partner-clubs/armani-prive-milano.webp',
  'volt-club-milano': '/images/events/cards-4x5/partner-clubs/volt-club-milano.webp',
  'volt': '/images/events/cards-4x5/partner-clubs/volt-club-milano.webp',
  'hollywood-club-milano': '/images/events/cards-4x5/partner-clubs/hollywood-club-milano.webp',
  'hollywood-milano': '/images/events/cards-4x5/partner-clubs/hollywood-club-milano.webp',
  'hollywood': '/images/events/cards-4x5/partner-clubs/hollywood-club-milano.webp',
  'the-club-milano': '/images/events/cards-4x5/partner-clubs/the-club-milano.webp',
  'theclub': '/images/events/cards-4x5/partner-clubs/the-club-milano.webp',
  'gattopardo-milano': '/images/events/cards-4x5/partner-clubs/gattopardo-milano.webp',
  'il-gattopardo-milano': '/images/events/cards-4x5/partner-clubs/gattopardo-milano.webp',
  'gattopardo': '/images/events/cards-4x5/partner-clubs/gattopardo-milano.webp',
  'mib-milano': '/images/events/cards-4x5/partner-clubs/mib-milano.webp',
  'mibmilano': '/images/events/cards-4x5/partner-clubs/mib-milano.webp',
  'dazi-milano': '/images/events/cards-4x5/partner-clubs/dazi-milano.webp',
  'dazi': '/images/events/cards-4x5/partner-clubs/dazi-milano.webp',
  'church-81': '/images/events/cards-4x5/partner-clubs/church-81.webp',
  'church-81-milano': '/images/events/cards-4x5/partner-clubs/church-81.webp',
  'church81': '/images/events/cards-4x5/partner-clubs/church-81.webp',
  'terrazza-21': '/images/events/cards-4x5/partner-clubs/terrazza-21.webp',
  'terrazza-duomo-21': '/images/events/cards-4x5/partner-clubs/terrazza-21.webp',
  'terrazza21': '/images/events/cards-4x5/partner-clubs/terrazza-21.webp',
  'ceresio-7-milano': '/images/events/cards-4x5/partner-clubs/ceresio-7-milano.webp',
  'ceresio-7': '/images/events/cards-4x5/partner-clubs/ceresio-7-milano.webp',
  'alcatraz-milano': '/images/events/cards-4x5/partner-clubs/alcatraz-milano.webp',
  'alcatraz': '/images/events/cards-4x5/partner-clubs/alcatraz-milano.webp',
  'fabrique-milano': '/images/events/cards-4x5/partner-clubs/fabrique-milano.webp',
  'fabrique': '/images/events/cards-4x5/partner-clubs/fabrique-milano.webp',
  'amnesia-milano': '/images/events/cards-4x5/partner-clubs/amnesia-milano.webp',
  'amnesia': '/images/events/cards-4x5/partner-clubs/amnesia-milano.webp',
  'magazzini-generali-milano': '/images/events/cards-4x5/partner-clubs/magazzini-generali-milano.webp',
  'magazzini': '/images/events/cards-4x5/partner-clubs/magazzini-generali-milano.webp',
  'apollo-club-milano': '/images/events/cards-4x5/partner-clubs/apollo-club-milano.webp',
  'apollo': '/images/events/cards-4x5/partner-clubs/apollo-club-milano.webp',
  'loolapaloosa-milano': '/images/events/cards-4x5/partner-clubs/loolapaloosa-milano.webp',
  'loolapaloosa': '/images/events/cards-4x5/partner-clubs/loolapaloosa-milano.webp',
  'bobino-milano': '/images/events/cards-4x5/partner-clubs/bobino-milano.webp',
  'bobino': '/images/events/cards-4x5/partner-clubs/bobino-milano.webp',
  'dock-22-milano': '/images/events/cards-4x5/partner-clubs/dock-22-milano.webp',
  'dock22': '/images/events/cards-4x5/partner-clubs/dock-22-milano.webp',
  'super-club-milano': '/images/events/cards-4x5/partner-clubs/super-club-milano.webp',
  'radio-rooftop-bar-milano': '/images/events/cards-4x5/partner-clubs/radio-rooftop-bar-milano.webp',
  'the-roof-milano': '/images/events/cards-4x5/partner-clubs/the-roof-milano.webp',
  'terrazza-aperol-milano': '/images/events/cards-4x5/partner-clubs/terrazza-aperol-milano.webp',
  'terrazza-gallia-milano': '/images/events/cards-4x5/partner-clubs/terrazza-gallia-milano.webp',
  'ristorante-torre-milano': '/images/events/cards-4x5/partner-clubs/ristorante-torre-milano.webp',
  'innocenti-evasioni-terrazza-triennale': '/images/events/cards-4x5/partner-clubs/innocenti-evasioni-terrazza-triennale.webp',
  'philipps-milano': '/images/events/cards-4x5/partner-clubs/philipps-milano.webp',
  'philipps': '/images/events/cards-4x5/partner-clubs/philipps-milano.webp',
  'carlsberg-ol-milano': '/images/events/cards-4x5/partner-clubs/carlsberg-ol-milano.webp',
  'carlsbergol': '/images/events/cards-4x5/partner-clubs/carlsberg-ol-milano.webp',
  'tom-the-ordinary-market-milano': '/images/events/cards-4x5/partner-clubs/tom-the-ordinary-market-milano.webp',
  'tom': '/images/events/cards-4x5/partner-clubs/tom-the-ordinary-market-milano.webp',
  'bischeri-milano': '/images/events/cards-4x5/partner-clubs/bischeri-milano.webp',
  'bischeri': '/images/events/cards-4x5/partner-clubs/bischeri-milano.webp',
  'gate-milano': '/images/events/cards-4x5/partner-clubs/gate-milano.webp',
  'gate': '/images/events/cards-4x5/partner-clubs/gate-milano.webp',
  'pelledoca-milano': '/images/events/cards-4x5/partner-clubs/pelledoca-milano.webp',
  'pelledoca': '/images/events/cards-4x5/partner-clubs/pelledoca-milano.webp',
  'justme-garda-lake': '/images/events/cards-4x5/partner-clubs/justme-garda-lake.webp',
  'justme-garda': '/images/events/cards-4x5/partner-clubs/justme-garda-lake.webp',
  'setai-club-bergamo': '/images/events/cards-4x5/partner-clubs/setai-club-bergamo.webp',
  'capogiro-curno-bergamo': '/images/events/cards-4x5/partner-clubs/capogiro-curno-bergamo.webp',
  'tiky-klub-seriate-bergamo': '/images/events/cards-4x5/partner-clubs/tiky-klub-seriate-bergamo.webp',
  'zero-club-bergamo': '/images/events/cards-4x5/partner-clubs/zero-club-bergamo.webp',
  'qi-clubbing-erbusco-brescia': '/images/events/cards-4x5/partner-clubs/qi-clubbing-erbusco-brescia.webp',
  'number-one-corte-franca-brescia': '/images/events/cards-4x5/partner-clubs/number-one-corte-franca-brescia.webp',
};

const BRAND_STEM_MATCHERS: ReadonlyArray<[string, string]> = [
  ['justme-garda', '/images/events/cards-4x5/partner-clubs/justme-garda-lake.webp'],
  ['just-me', '/images/events/cards-4x5/partner-clubs/just-me-milano.webp'],
  ['justme', '/images/events/cards-4x5/partner-clubs/just-me-milano.webp'],
  ['pineta', '/images/events/cards-4x5/partner-clubs/pineta-club-milano.webp'],
  ['aria', '/images/events/cards-4x5/partner-clubs/aria-club-milano.webp'],
  ['voya', '/images/events/cards-4x5/partner-clubs/voya-rooftop-milan.webp'],
  ['55-', '/images/events/cards-4x5/partner-clubs/55-milano.webp'],
  ['repvblic', '/images/events/cards-4x5/partner-clubs/repvblic-milano.webp'],
  ['carlsberg', '/images/events/cards-4x5/partner-clubs/carlsberg-ol-milano.webp'],
  ['tocqueville', '/images/events/cards-4x5/partner-clubs/tocqueville-13-milano.webp'],
  ['armani', '/images/events/cards-4x5/partner-clubs/armani-prive-milano.webp'],
  ['volt', '/images/events/cards-4x5/partner-clubs/volt-club-milano.webp'],
  ['hollywood', '/images/events/cards-4x5/partner-clubs/hollywood-club-milano.webp'],
  ['11-clubroom', '/images/events/cards-4x5/partner-clubs/11-clubroom.webp'],
  ['11clubroom', '/images/events/cards-4x5/partner-clubs/11-clubroom.webp'],
  ['gattopardo', '/images/events/cards-4x5/partner-clubs/gattopardo-milano.webp'],
  ['the-club', '/images/events/cards-4x5/partner-clubs/the-club-milano.webp'],
  ['mib', '/images/events/cards-4x5/partner-clubs/mib-milano.webp'],
  ['dazi', '/images/events/cards-4x5/partner-clubs/dazi-milano.webp'],
  ['church-81', '/images/events/cards-4x5/partner-clubs/church-81.webp'],
  ['terrazza-21', '/images/events/cards-4x5/partner-clubs/terrazza-21.webp'],
  ['terrazza-duomo', '/images/events/cards-4x5/partner-clubs/terrazza-21.webp'],
  ['ceresio', '/images/events/cards-4x5/partner-clubs/ceresio-7-milano.webp'],
  ['alcatraz', '/images/events/cards-4x5/partner-clubs/alcatraz-milano.webp'],
  ['fabrique', '/images/events/cards-4x5/partner-clubs/fabrique-milano.webp'],
  ['amnesia', '/images/events/cards-4x5/partner-clubs/amnesia-milano.webp'],
  ['magazzini', '/images/events/cards-4x5/partner-clubs/magazzini-generali-milano.webp'],
  ['apollo', '/images/events/cards-4x5/partner-clubs/apollo-club-milano.webp'],
  ['loolapaloosa', '/images/events/cards-4x5/partner-clubs/loolapaloosa-milano.webp'],
  ['bobino', '/images/events/cards-4x5/partner-clubs/bobino-milano.webp'],
  ['dock-22', '/images/events/cards-4x5/partner-clubs/dock-22-milano.webp'],
  ['play-club', '/images/events/cards-4x5/partner-clubs/play-club-milano.webp'],
  ['super-club', '/images/events/cards-4x5/partner-clubs/super-club-milano.webp'],
  ['radio-rooftop', '/images/events/cards-4x5/partner-clubs/radio-rooftop-bar-milano.webp'],
  ['the-roof', '/images/events/cards-4x5/partner-clubs/the-roof-milano.webp'],
  ['terrazza-aperol', '/images/events/cards-4x5/partner-clubs/terrazza-aperol-milano.webp'],
  ['terrazza-gallia', '/images/events/cards-4x5/partner-clubs/terrazza-gallia-milano.webp'],
  ['ristorante-torre', '/images/events/cards-4x5/partner-clubs/ristorante-torre-milano.webp'],
  ['triennale', '/images/events/cards-4x5/partner-clubs/innocenti-evasioni-terrazza-triennale.webp'],
  ['philipps', '/images/events/cards-4x5/partner-clubs/philipps-milano.webp'],
  ['tom-', '/images/events/cards-4x5/partner-clubs/tom-the-ordinary-market-milano.webp'],
  ['bischeri', '/images/events/cards-4x5/partner-clubs/bischeri-milano.webp'],
  ['gate-', '/images/events/cards-4x5/partner-clubs/gate-milano.webp'],
  ['pelledoca', '/images/events/cards-4x5/partner-clubs/pelledoca-milano.webp'],
  ['setai', '/images/events/cards-4x5/partner-clubs/setai-club-bergamo.webp'],
  ['capogiro', '/images/events/cards-4x5/partner-clubs/capogiro-curno-bergamo.webp'],
  ['tiky', '/images/events/cards-4x5/partner-clubs/tiky-klub-seriate-bergamo.webp'],
  ['zero-club', '/images/events/cards-4x5/partner-clubs/zero-club-bergamo.webp'],
  ['qi-clubbing', '/images/events/cards-4x5/partner-clubs/qi-clubbing-erbusco-brescia.webp'],
  ['number-one', '/images/events/cards-4x5/partner-clubs/number-one-corte-franca-brescia.webp'],
];

export type VenueLikeForCard =
  | string
  | { id?: string | null; slugs?: { en?: string | null; it?: string | null } | null; slug?: string | null }
  | undefined
  | null;

export function getVenueCardPhoto4x5(venueOrIdOrSlug: VenueLikeForCard): string {
  let raw = '';
  if (typeof venueOrIdOrSlug === 'string') {
    raw = venueOrIdOrSlug;
  } else if (venueOrIdOrSlug && typeof venueOrIdOrSlug === 'object') {
    raw =
      venueOrIdOrSlug.id ||
      venueOrIdOrSlug.slugs?.en ||
      venueOrIdOrSlug.slugs?.it ||
      venueOrIdOrSlug.slug ||
      '';
  }
  const clean = raw.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!clean) return '/images/events/cards-4x5/partner-clubs/just-me-milano.webp';
  const direct = VENUE_CARD_4X5_BY_KEY[clean] || VENUE_CARD_4X5_BY_KEY[`v-${clean}`];
  if (direct) return direct;
  const lastSeg = clean.split('/').pop() || clean;
  if (VENUE_CARD_4X5_BY_KEY[lastSeg]) return VENUE_CARD_4X5_BY_KEY[lastSeg];
  for (const [stem, img] of BRAND_STEM_MATCHERS) {
    if (lastSeg.includes(stem)) return img;
  }
  return '/images/pillars/clubs-hero.webp';
}

const ZONE_CARD_4X5_BY_SLUG: Readonly<Record<string, string>> = {
  'corso-como': '/images/zones/zone-corso-como.webp',
  'navigli': '/images/zones/zone-navigli.webp',
  'brera': '/images/zones/zone-brera.webp',
  'isola': '/images/zones/zone-isola.webp',
  'arco-della-pace': '/images/zones/zone-arco-della-pace.webp',
  'parco-sempione': '/images/pillars/zone-01.webp',
  'sempione': '/images/pillars/zone-01.webp',
  'duomo-san-babila': '/images/pillars/zone-02.webp',
  'duomo': '/images/pillars/zone-02.webp',
  'san-siro': '/images/pillars/zone-03.webp',
  'citylife-portello': '/images/pillars/zone-04.webp',
  'citylife': '/images/pillars/zone-04.webp',
  'porta-romana': '/images/zones/zone-porta-romana.webp',
  'porta-venezia': '/images/zones/zone-porta-venezia.webp',
  'lambrate': '/images/zones/zone-lambrate.webp',
  'nolo': '/images/zones/zone-nolo.webp',
  'ripamonti': '/images/zones/zone-ripamonti.webp',
  'tortona': '/images/pillars/zone-05.webp',
  'porta-nuova': '/images/pillars/zone-06.webp',
  'garibaldi': '/images/pillars/zone-06.webp',
  'moscova': '/images/pillars/zone-07.webp',
  'quadrilatero-della-moda': '/images/pillars/zone-08.webp',
  'montenapoleone': '/images/pillars/zone-08.webp',
  'bicocca': '/images/pillars/zone-09.webp',
  'centrale': '/images/pillars/zone-10.webp',
  'mecenate': '/images/pillars/zone-11.webp',
  'idroscalo': '/images/pillars/zone-12.webp',
  'colonne-di-san-lorenzo': '/images/pillars/zone-13.webp',
  'citta-studi': '/images/pillars/zone-14.webp',
};

export function getZoneCardPhoto4x5(zoneSlug: string | undefined | null, fallbackIndex = 0): string {
  const clean = (zoneSlug || '').trim().toLowerCase().split('/').pop() || '';
  if (ZONE_CARD_4X5_BY_SLUG[clean]) return ZONE_CARD_4X5_BY_SLUG[clean];
  for (const [k, v] of Object.entries(ZONE_CARD_4X5_BY_SLUG)) {
    if (clean.includes(k)) return v;
  }
  const idx = ((fallbackIndex % 14) + 14) % 14 + 1;
  return `/images/pillars/zone-${String(idx).padStart(2, '0')}.webp`;
}

const GENRE_CARD_4X5_BY_SLUG: Readonly<Record<string, string>> = {
  'techno': '/images/genres/techno-hero.webp',
  'house': '/images/genres/house-hero.webp',
  'hip-hop': '/images/genres/hip-hop-hero.webp',
  'reggaeton': '/images/genres/latin-hero.webp',
  'latin': '/images/genres/latin-hero.webp',
  'commercial': '/images/genres/commercial-hero.webp',
  'afrobeats': '/images/genres/afrobeats-hero.webp',
  'afro-house': '/images/genres/afrobeats-hero.webp',
  'open-format': '/images/genres/open-format-hero.webp',
  'cena-cantata': '/images/pillars/genre-card-01.webp',
  'dinner-show': '/images/pillars/genre-card-01.webp',
  'electronic': '/images/pillars/genre-card-02.webp',
  'edm': '/images/pillars/genre-card-03.webp',
  'live-music': '/images/pillars/genre-card-04.webp',
  'indie': '/images/pillars/genre-card-05.webp',
};

export function getGenreCardPhoto4x5(genreSlug: string | undefined | null, fallbackIndex = 0): string {
  const clean = (genreSlug || '').trim().toLowerCase().split('/').pop() || '';
  if (GENRE_CARD_4X5_BY_SLUG[clean]) return GENRE_CARD_4X5_BY_SLUG[clean];
  for (const [k, v] of Object.entries(GENRE_CARD_4X5_BY_SLUG)) {
    if (clean.includes(k)) return v;
  }
  const idx = ((fallbackIndex % 10) + 10) % 10 + 1;
  return `/images/pillars/genre-card-${String(idx).padStart(2, '0')}.webp`;
}

const CAPODANNO_CATEGORY_POSTER_4X5: Readonly<Record<string, string>> = {
  'capodanno-2027': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp',
  'eventi-capodanno-milano-2027': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp',
  'capodanno-rooftop-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-voya-rooftop-milano.webp',
  'capodanno-discoteche-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-pineta-milano.webp',
  'capodanno-locali-cenone-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-55-milano.webp',
  'capodanno-famiglie-bambini-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-carlsberg-ol-milano.webp',
  'capodanno-hotel-5-stelle-ville-castelli': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-hotel-principe-di-savoia-milano.webp',
  'capodanno-coppie-romantico-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-terrazza-duomo-21.webp',
  'capodanno-single-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-repvblic-milano.webp',
  'capodanno-over-30-40-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-bobino-milano.webp',
  'capodanno-techno-elettronica-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-volt-club-milano.webp',
  'capodanno-latino-reggaeton-hiphop-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-the-club-milano.webp',
  'capodanno-economico-low-cost-milano': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-alcatraz-milano.webp',
  'capodanno-terme-spa-baita-montagna': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-qc-terme-milano-porta-romana.webp',
  'capodanno-speciale': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-tram-storico-milano-atmosfera.webp',
  'capodanno-lombardia': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-como-made-club-villa-erba-palace-hotel.webp',
  'capodanno-in-piazza': '/images/events/cards-4x5/capodanno-2027-posters/capodanno-piazza-duomo-milano.webp',
};

export function getCapodannoCategoryCardPoster4x5(catSlug: string | undefined | null): string {
  const clean = (catSlug || '').trim().toLowerCase().split('/').pop() || '';
  if (CAPODANNO_CATEGORY_POSTER_4X5[clean]) return CAPODANNO_CATEGORY_POSTER_4X5[clean];
  return '/images/events/cards-4x5/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp';
}

const VENUE_GUIDE_ID_MAP: Readonly<Record<string, string>> = {
  'g-15': 'v-justme',
  'g-16': 'v-pineta',
  'g-17': 'v-aria',
  'g-18': 'v-voya',
  'g-19': 'v-55milano',
  'g-20': 'v-repvblic',
  'g-21': 'v-tocqueville',
  'g-22': 'v-armani-prive',
  'g-23': 'v-volt',
  'g-24': 'v-alcatraz',
  'g-25': 'v-fabrique',
  'g-26': 'v-amnesia',
  'g-27': 'v-hollywood',
  'g-28': 'v-theclub',
  'g-29': 'v-11clubroom',
  'g-30': 'v-gattopardo',
  'g-31': 'v-mibmilano',
  'g-32': 'v-terrazza21',
  'g-33': 'v-ceresio-7',
  'g-34': 'v-apollo',
  'g-35': 'v-magazzini',
  'g-36': 'v-church81',
  'g-37': 'v-loolapaloosa',
  'g-38': 'v-bobino',
  'g-39': 'v-dock22',
  'g-40': 'v-super-club-milano',
  'g-126': 'v-philipps',
  'g-129': 'v-radio-rooftop-bar-milano',
};

const DISJOINT_EDITORIAL_GUIDE_POOL: readonly string[] = [
  '/images/guides-editorial/just-me-pavilion.webp',
  '/images/guides-editorial/pineta-lounge.webp',
  '/images/guides-editorial/voya-rooftop-20f.webp',
  '/images/guides-editorial/fiftyfive-loft.webp',
  '/images/guides-editorial/repvblic-vip-lounge.webp',
  '/images/guides-editorial/carlsberg-ol-stage-candles.webp',
  '/images/guides-editorial/armani-prive-lounge.webp',
  '/images/guides-editorial/ceresio-pool-dusk.webp',
  '/images/guides-editorial/gattopardo-nave.webp',
  '/images/guides-editorial/hollywood-corso-como.webp',
  '/images/guides-editorial/philipps-plein-chandeliers.webp',
  '/images/guides-editorial/terrazza-duomo-skyline.webp',
  '/images/guides-editorial/the-club-brera.webp',
  '/images/guides-editorial/tom-milano-dinner.webp',
  '/images/guides-editorial/bischeri-dinner.webp',
  '/images/guides-editorial/apollo-navigli.webp',
  '/images/guides-editorial/gate-neon.webp',
  '/images/guides-editorial/radio-skyline-dusk.webp',
  '/images/guides-editorial/just-me-vip-table.webp',
  '/images/guides-editorial/pineta-vip.webp',
  '/images/guides-editorial/philipps-plein-dinnershow.webp',
  '/images/guides-editorial/the-club-vip-bottles.webp',
  '/images/guides-editorial/bischeri-gala.webp',
  '/images/guides-editorial/terme-villa-gala.webp',
  '/images/guides-editorial/terme-thermal-night.webp',
  '/images/guides-editorial/terme-alpine-snow.webp',
  '/images/guides-editorial/palace-como-fireworks.webp',
  '/images/guides-editorial/terminus-como-lake.webp',
  '/images/guides-editorial/barchetta-como-dining.webp',
  '/images/pillars/vip-tables-01.webp',
  '/images/pillars/vip-tables-02.webp',
  '/images/pillars/vip-tables-03.webp',
  '/images/pillars/vip-tables-04.webp',
  '/images/pillars/bottle-prices-01.webp',
  '/images/pillars/bottle-prices-02.webp',
  '/images/pillars/bottle-prices-03.webp',
  '/images/pillars/bottle-prices-04.webp',
  '/images/pillars/door-policy-01.webp',
  '/images/pillars/door-policy-02.webp',
  '/images/pillars/door-policy-03.webp',
  '/images/pillars/door-policy-04.webp',
  '/images/pillars/aperitivo-01.webp',
  '/images/pillars/aperitivo-02.webp',
  '/images/pillars/aperitivo-03.webp',
  '/images/pillars/aperitivo-04.webp',
  '/images/pillars/rooftops-01.webp',
  '/images/pillars/rooftops-02.webp',
  '/images/pillars/rooftops-03.webp',
  '/images/pillars/rooftops-04.webp',
  '/images/pillars/concierge-01.webp',
  '/images/pillars/concierge-02.webp',
  '/images/pillars/concierge-03.webp',
  '/images/pillars/football-afterparties-01.webp',
  '/images/pillars/football-afterparties-02.webp',
  '/images/pillars/concert-afterparties-01.webp',
  '/images/pillars/concert-afterparties-02.webp',
  '/images/pillars/intent-erasmus-01.webp',
  '/images/pillars/intent-18plus-01.webp',
  '/images/pillars/intent-21plus-01.webp',
  '/images/pillars/intent-international-01.webp',
];

function stableHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function getGuideCardPhoto4x5(guideIdOrSlug: string | undefined | null, index = 0): string {
  const clean = (guideIdOrSlug || '').trim().toLowerCase();
  if (VENUE_GUIDE_ID_MAP[clean]) {
    return getVenueCardPhoto4x5(VENUE_GUIDE_ID_MAP[clean]);
  }
  if (clean.includes('dress-code')) return '/images/pillars/door-policy-01.webp';
  if (clean.includes('vip') || clean.includes('bottle')) return '/images/pillars/bottle-prices-01.webp';
  if (clean.includes('rooftop')) return '/images/pillars/rooftops-01.webp';
  if (clean.includes('san-siro') || clean.includes('football')) return '/images/pillars/football-afterparties-01.webp';
  if (clean.includes('speakeasy') || clean.includes('secret')) return '/images/pillars/zone-inline-02-a.webp';
  if (clean.includes('interview') || clean.includes('intervista')) return '/images/pillars/intent-international-02.webp';
  if (clean.includes('techno')) return '/images/genres/techno-hero.webp';
  if (clean === 'g-118' || clean.includes('new-years-eve') || clean.includes('capodanno')) {
    return '/images/events/cards-4x5/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp';
  }
  const pos = (stableHash(clean || String(index)) + index * 7) % DISJOINT_EDITORIAL_GUIDE_POOL.length;
  return DISJOINT_EDITORIAL_GUIDE_POOL[pos];
}

export function getHubOrPillarCardPhoto4x5(hrefOrKey: string | undefined | null, fallbackIndex = 0): string {
  const clean = (hrefOrKey || '').trim().toLowerCase();
  if (clean.includes('vip-tables') || clean.includes('tavoli-vip')) return '/images/pillars/vip-tables-01.webp';
  if (clean.includes('bottle-prices') || clean.includes('prezzi-bottiglie')) return '/images/pillars/bottle-prices-01.webp';
  if (clean.includes('aperitivo')) return '/images/pillars/aperitivo-01.webp';
  if (clean.includes('rooftops') || clean.includes('terrazze')) return '/images/pillars/rooftops-01.webp';
  if (clean.includes('door-policy') || clean.includes('dress-code')) return '/images/pillars/door-policy-01.webp';
  if (clean.includes('private-parties') || clean.includes('feste-private')) return '/images/pillars/vip-tables-02.webp';
  if (clean.includes('guest-lists') || clean.includes('liste')) return '/images/pillars/door-policy-02.webp';
  if (clean.includes('concierge')) return '/images/pillars/concierge-01.webp';
  if (clean.includes('football-afterparties') || clean.includes('dopo-partita')) return '/images/pillars/football-afterparties-01.webp';
  if (clean.includes('concert-afterparties') || clean.includes('concerti')) return '/images/pillars/concert-afterparties-01.webp';
  if (clean.includes('fashion-week') || clean.includes('moda')) return '/images/pillars/mfw-01.webp';
  if (clean.includes('erasmus') || clean.includes('university')) return '/images/pillars/intent-erasmus-01.webp';
  if (clean.includes('18-plus')) return '/images/pillars/intent-18plus-01.webp';
  if (clean.includes('21-plus')) return '/images/pillars/intent-21plus-01.webp';
  if (clean.includes('international')) return '/images/pillars/intent-international-01.webp';
  if (clean.includes('capodanno') || clean.includes('new-year')) {
    return '/images/events/cards-4x5/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp';
  }
  if (clean.includes('halloween')) return '/images/pillars/events-special-01.webp';
  if (clean.includes('special')) return '/images/pillars/events-special-01.webp';
  if (clean.includes('clubs') || clean.includes('locali')) return '/images/pillars/clubs-hero.webp';
  if (clean.includes('guides') || clean.includes('guide')) return '/images/guides-editorial/just-me-pavilion.webp';
  const pool = [
    '/images/pillars/clubs-hero.webp',
    '/images/pillars/vip-tables-01.webp',
    '/images/pillars/aperitivo-01.webp',
    '/images/pillars/rooftops-01.webp',
    '/images/pillars/bottle-prices-01.webp',
    '/images/pillars/concierge-01.webp',
  ];
  return pool[((fallbackIndex % pool.length) + pool.length) % pool.length];
}

export function resolveCardImageByHref(
  href: string | undefined | null,
  explicitImageOrIndex?: string | number | null,
  fallbackIndex = 0,
): string {
  const resolvedIndex = typeof explicitImageOrIndex === 'number' ? explicitImageOrIndex : fallbackIndex;
  if (typeof explicitImageOrIndex === 'string' && explicitImageOrIndex.trim().length > 0) {
    return toCardPoster4x5(explicitImageOrIndex);
  }
  const clean = (href || '').split('?')[0].split('#')[0].toLowerCase();
  if (/\/(clubs|locali|discoteche|kluby|clubs-milan)\/[^/]+$/.test(clean) || clean.includes('/clubs/') || clean.includes('/locali/')) {
    const slug = clean.split('/').filter(Boolean).pop() || '';
    return getVenueCardPhoto4x5(slug);
  }
  if (clean.includes('/zones/') || clean.includes('/zone/') || clean.includes('/quartieri/')) {
    const slug = clean.split('/').filter(Boolean).pop() || '';
    return getZoneCardPhoto4x5(slug, resolvedIndex);
  }
  if (clean.includes('/genres/') || clean.includes('/generi/')) {
    const slug = clean.split('/').filter(Boolean).pop() || '';
    return getGenreCardPhoto4x5(slug, resolvedIndex);
  }
  if (clean.includes('/guides/') || clean.includes('/guide/')) {
    const slug = clean.split('/').filter(Boolean).pop() || '';
    return getGuideCardPhoto4x5(slug, resolvedIndex);
  }
  if (clean.includes('capodanno-')) {
    const slug = clean.split('/').filter(Boolean).pop() || '';
    return getCapodannoCategoryCardPoster4x5(slug);
  }
  return getHubOrPillarCardPhoto4x5(clean, resolvedIndex);
}
