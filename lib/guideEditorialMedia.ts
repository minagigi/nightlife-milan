import type { Guide, Venue } from './types';
import type { TasteExplorerData } from './tasteExplorerData';
import { GUIDE_HERO_IMAGES_114, GUIDE_INLINE_IMAGES_114 } from './guideImagesMap114';
import { getLocalizedText } from './seo';
import type { LocaleCode } from './i18n/locales';
import { getPillarDisplayHeadline } from './guidesGscPillar20261120';
import { getGsc20261122DisplayHeadline } from './guidesGscBatch20261122';
import { getGsc20261123DisplayHeadline } from './guidesGscBatch20261123';
import { getGsc20261124DisplayHeadline } from './guidesGscBatch20261124';
import { getGsc20261125DisplayHeadline } from './guidesGscBatch20261125';
import { getGscCapodanno20261125DisplayHeadline } from './guidesGscCapodannoBatch20261125';
import { GUIDE_100_SEEDS } from './guides100Catalog';
import { getLocalizedGuideSeedNames } from './i18n/guideSeeds35Names';

export interface EditorialPlate {
  src: string;
  caption: string;
  district: string;
}

export interface GuideEditorialBundle {
  heroSlides: EditorialPlate[];
  stripPlates: EditorialPlate[];
  chapterPlates: EditorialPlate[];
  faqPlate: EditorialPlate | null;
}

export interface ResolvedGuidePageMedia {
  partnerCards: Array<{ venue: Venue; coverSrc: string }>;
  relatedGuideCards: Array<{ guide: Guide; coverSrc: string }>;
  explorerData: TasteExplorerData | null;
}

export const EXPLORER_VENUE_PHOTOS: Record<string, { src: string; caption: string }> = {
  // 9 Thermal, Lake Como & Milan New Year Alternatives (g-117)
  sirmione: {
    src: '/images/guides-editorial/terme-thermal-night.webp',
    caption: 'Aquaria Thermal Garden · Sirmione',
  },
  'qc-milano': {
    src: '/images/guides-editorial/terme-villa-gala.webp',
    caption: 'Porta Romana · Milano Wellness',
  },
  'qc-san-pellegrino': {
    src: '/images/guides-editorial/terme-villa-gala.webp',
    caption: 'Val Brembana · San Pellegrino',
  },
  'qc-bormio': {
    src: '/images/guides-editorial/terme-alpine-snow.webp',
    caption: 'Bagni Nuovi & Vecchi · Bormio',
  },
  'terminus-como': {
    src: '/images/guides-editorial/terminus-como-lake.webp',
    caption: 'Albergo Terminus · Lago di Como',
  },
  'barchetta-como': {
    src: '/images/guides-editorial/barchetta-como-dining.webp',
    caption: 'Hotel Barchetta Excelsior · Como',
  },
  'voya-milano': {
    src: '/images/guides-editorial/voya-rooftop-20f.webp',
    caption: 'Voya Rooftop 20° Piano · CityLife',
  },
  'justme-milano': {
    src: '/images/guides-editorial/just-me-pavilion.webp',
    caption: 'JustMe Milano · Parco Sempione',
  },
  'pineta-milano': {
    src: '/images/guides-editorial/pineta-lounge.webp',
    caption: 'Pineta Milano · Via Messina 38',
  },

  // 18 Partner Nightclubs (g-118)
  'just-me': {
    src: '/images/guides-editorial/just-me-pavilion.webp',
    caption: 'Just Me Milano · Torre Branca',
  },
  pineta: {
    src: '/images/guides-editorial/pineta-lounge.webp',
    caption: 'Pineta Milano · Porta Garibaldi',
  },
  voya: {
    src: '/images/guides-editorial/voya-rooftop-20f.webp',
    caption: 'Voya Rooftop · 20° Piano Portello',
  },
  garda: {
    src: '/images/guides-editorial/palace-como-fireworks.webp',
    caption: 'JustMe Garda Lake · Sirmione / Lonato',
  },
  repvblic: {
    src: '/images/guides-editorial/repvblic-club.webp',
    caption: 'REPVBLIC Milano · Piazza Repubblica 12',
  },
  bischeri: {
    src: '/images/guides-editorial/bischeri-gala.webp',
    caption: 'Bischeri Milano · Gala Dinner Show',
  },
  gate: {
    src: '/images/guides-editorial/gate-neon.webp',
    caption: 'Gate Milano · Isola / Scalo Farini',
  },
  pelledoca: {
    src: '/images/guides-editorial/tom-milano-dinner.webp',
    caption: 'Pelledoca Milano · Forlanini',
  },
  magazzini: {
    src: '/images/guides-editorial/aria-dancefloor.webp',
    caption: 'Magazzini Generali · Via Pietrasanta 16',
  },
  bobino: {
    src: '/images/guides-editorial/apollo-navigli.webp',
    caption: 'Bobino Milano · Navigli / Porta Genova',
  },
  'the-club': {
    src: '/images/guides-editorial/the-club-brera.webp',
    caption: 'The Club Milano · Brera / Moscova',
  },
  aria: {
    src: '/images/guides-editorial/aria-garden.webp',
    caption: 'Aria Club Milano · San Siro Garden',
  },
  '55-milano': {
    src: '/images/guides-editorial/fiftyfive-loft.webp',
    caption: '55 Milano · Sempione 1.000 mq Loft',
  },
  'tocqueville-13': {
    src: '/images/guides-editorial/just-me-dancefloor.webp',
    caption: 'Tocqueville 13 · Corso Como',
  },
  hollywood: {
    src: '/images/guides-editorial/hollywood-corso-como.webp',
    caption: 'Hollywood Milano · Corso Como 15',
  },
  '11clubroom': {
    src: '/images/guides-editorial/armani-prive-lounge.webp',
    caption: '11 Clubroom · Via Tocqueville 11',
  },
  tom: {
    src: '/images/guides-editorial/bischeri-dinner.webp',
    caption: 'TOM. The Ordinary Market · Darsena',
  },
  gattopardo: {
    src: '/images/guides-editorial/gattopardo-nave.webp',
    caption: 'Il Gattopardo · Chiesa Sconsacrata',
  },
};

const SEED_BY_ID = new Map(GUIDE_100_SEEDS.map((s) => [s.id, s]));

const BASE_14_DISPLAY_HEADLINES: Record<string, { it: string; en: string; es?: string; fr?: string; de?: string; pt?: string }> = {
  'g-dress-code': {
    it: 'Dress Code Milano',
    en: 'Milan Club Dress Code',
    es: 'Dress Code Milán',
    fr: 'Dress Code Milan',
    de: 'Dresscode Mailand',
    pt: 'Dress Code Milão',
  },
  'g-secret-bars': {
    it: '12 Speakeasy Segreti',
    en: '12 Secret Speakeasies',
    es: '12 Speakeasies Ocultos',
    fr: '12 Speakeasies Secrets',
    de: '12 Geheime Speakeasies',
    pt: '12 Speakeasies Secretos',
  },
  'g-vip-tables': {
    it: 'Prenotare Tavoli VIP',
    en: 'Booking VIP Tables',
    es: 'Reservar Mesas VIP',
    fr: 'Réserver Tables VIP',
    de: 'VIP-Tische Buchen',
    pt: 'Reservar Mesas VIP',
  },
  'g-dj-interview': {
    it: 'Il Suono di Milano',
    en: 'The Sound of Milan',
    es: 'Sonido de Milán',
    fr: 'Le Son de Milan',
    de: 'Sound von Mailand',
    pt: 'O Som de Milão',
  },
  'g-techno-2026': {
    it: 'Techno & Afro House',
    en: 'Techno & Afro-House',
    es: 'Techno y Afro-House',
    fr: 'Techno & Afro-House',
    de: 'Techno & Afro-House',
    pt: 'Techno e Afro-House',
  },
  'g-vip-bottle-prices': {
    it: 'Prezzi Bottiglie VIP',
    en: 'VIP Bottle Prices',
    es: 'Precios Botellas VIP',
    fr: 'Tarifs Bouteilles VIP',
    de: 'VIP-Flaschenpreise',
    pt: 'Preços Garrafas VIP',
  },
  'g-weekly-calendar': {
    it: 'Calendario Serate',
    en: 'Weekly Nightlife Guide',
    es: 'Calendario Semanal',
    fr: 'Calendrier Hebdo',
    de: 'Wochenkalender',
    pt: 'Agenda Semanal',
  },
  'g-rooftops-milan': {
    it: 'Rooftop Milano 2027',
    en: 'Milan Rooftop Bars',
    es: 'Rooftops en Milán',
    fr: 'Rooftops à Milan',
    de: 'Rooftop-Bars Mailand',
    pt: 'Rooftops em Milão',
  },
  'g-private-parties': {
    it: 'Feste Private & Lauree',
    en: 'Private Parties Milan',
    es: 'Fiestas Privadas Milán',
    fr: 'Soirées Privées Milan',
    de: 'Private Partys',
    pt: 'Festas Privadas',
  },
  'g-mfw-fuorisalone-f1': {
    it: 'Fashion Week & F1',
    en: 'Fashion Week & F1',
    es: 'Fashion Week y F1',
    fr: 'Fashion Week & F1',
    de: 'Fashion Week & F1',
    pt: 'Fashion Week e F1',
  },
  'g-san-siro-football-afterparties': {
    it: 'Dopo-Partita San Siro',
    en: 'San Siro Afterparties',
    es: 'Post-Partido San Siro',
    fr: 'Afterparty San Siro',
    de: 'San Siro Afterparty',
    pt: 'Pós-Jogo San Siro',
  },
  'g-new-years-eve-2027': {
    it: 'Capodanno Milano 2027',
    en: "New Year's Eve 2027",
    es: 'Nochevieja Milán 2027',
    fr: 'Réveillon Milan 2027',
    de: 'Silvester Mailand 2027',
    pt: 'Réveillon Milão 2027',
  },
  'g-concert-afterparties-milan': {
    it: 'Afterparty Concerti',
    en: 'Concert Afterparties',
    es: 'Afterparty Conciertos',
    fr: 'Afterparty Concerts',
    de: 'Konzert Afterparties',
    pt: 'Afterparty Concertos',
  },
  'g-bachelor-bachelorette-vip-milan': {
    it: 'Celibato & Nubilato',
    en: 'Bachelor & Bachelorette',
    es: 'Despedidas VIP Milán',
    fr: 'EVJF & EVG Milan',
    de: 'JGA VIP Mailand',
    pt: 'Despedidas VIP',
  },
};

function clampConciseHeadline(raw: string): string {
  const cleaned = raw.replace(/\u2014/g, '-').replace(/!/g, '').replace(/\s+/g, ' ').trim();
  if (cleaned.length <= 28) return cleaned;

  // Strip balanced parenthetical suffix first if present
  const noParens = cleaned.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  const base = noParens.length >= 6 && noParens.length <= 28 ? noParens : noParens;
  if (base.length <= 28) return base;

  // Prefer natural break before comma / ampersand / separator outside parentheses
  for (const sep of [' · ', ' | ', ': ', ', ', ' & ']) {
    const idx = base.indexOf(sep);
    if (idx > 6 && idx <= 28) {
      return base.slice(0, idx).trim();
    }
  }

  // Fallback: word boundary <= 26 chars without trailing preposition
  const words = base.split(' ');
  const kept: string[] = [];
  for (const w of words) {
    const candidate = [...kept, w].join(' ');
    if (candidate.length > 26 && kept.length >= 2) break;
    kept.push(w);
  }
  return kept
    .join(' ')
    .replace(/\b(e|ed|y|and|und|et|a|di|da|in|per|con|su|of|for|at|on|in|de|del|della)$/i, '')
    .trim();
}

export function getEditorialDisplayHeadline(
  guideId: string,
  locale: LocaleCode,
  localizedFullTitle: string,
): string {
  const gscCap20261125 = getGscCapodanno20261125DisplayHeadline(guideId, locale);
  if (gscCap20261125) {
    return clampConciseHeadline(gscCap20261125);
  }

  const gsc20261125 = getGsc20261125DisplayHeadline(guideId, locale);
  if (gsc20261125) {
    return clampConciseHeadline(gsc20261125);
  }

  const gsc20261124 = getGsc20261124DisplayHeadline(guideId, locale);
  if (gsc20261124) {
    return clampConciseHeadline(gsc20261124);
  }

  const gsc20261123 = getGsc20261123DisplayHeadline(guideId, locale);
  if (gsc20261123) {
    return clampConciseHeadline(gsc20261123);
  }

  const gsc20261122 = getGsc20261122DisplayHeadline(guideId, locale);
  if (gsc20261122) {
    return clampConciseHeadline(gsc20261122);
  }

  if (guideId === 'g-117' || guideId === 'g-118') {
    return getPillarDisplayHeadline(guideId, locale);
  }

  const baseEntry = BASE_14_DISPLAY_HEADLINES[guideId];
  if (baseEntry) {
    if (locale === 'it') return baseEntry.it;
    if (locale === 'es' && baseEntry.es) return baseEntry.es;
    if (locale === 'fr' && baseEntry.fr) return baseEntry.fr;
    if (locale === 'de' && baseEntry.de) return baseEntry.de;
    if (locale === 'pt' && baseEntry.pt) return baseEntry.pt;
    return baseEntry.en;
  }

  const seed = SEED_BY_ID.get(guideId);
  if (seed) {
    const names = getLocalizedGuideSeedNames(
      {
        id: seed.id,
        category: seed.cluster,
        name: seed.name,
        shortName: seed.shortName,
        zone: seed.zone,
      },
      locale,
    );
    if (names.shortName) {
      return clampConciseHeadline(names.shortName);
    }
  }

  return clampConciseHeadline(localizedFullTitle);
}

const IMAGE_DHASH_64: Record<string, string> = {
  "/images/events-gallery/just-me-saturday/just-me-milano-aperitivo-buffet-saturday.webp": "d6d7d941503601c2",
  "/images/events-gallery/just-me-saturday/just-me-milano-dancefloor-saturday-night.webp": "0e074f3366069e11",
  "/images/events-gallery/just-me-saturday/just-me-milano-lounge-saturday-night.webp": "1c1c9eb9b58e9341",
  "/images/events-gallery/just-me-saturday/just-me-milano-torre-branca-saturday-night.webp": "0206060e82c20606",
  "/images/events/curated/aperitivi-milano-pineta-scene-v2.webp": "7d7f7c60e0060f33",
  "/images/guides-editorial/apollo-navigli.webp": "9209beaf0ccc0c74",
  "/images/guides-editorial/aria-dancefloor.webp": "293e96d258363e1b",
  "/images/guides-editorial/aria-garden.webp": "6353131399899b1f",
  "/images/guides-editorial/armani-prive-lounge.webp": "c36ecec8ccd713cb",
  "/images/guides-editorial/barchetta-como-dining.webp": "c1c1343ccc1c1ce5",
  "/images/guides-editorial/bischeri-dinner.webp": "f031293919012303",
  "/images/guides-editorial/bischeri-gala.webp": "ad51666eead87dbb",
  "/images/guides-editorial/carlsberg-ol-stage-candles.webp": "8d9b9c94c5c7ccdd",
  "/images/guides-editorial/ceresio-pool-dusk.webp": "7f3d7d7bb3c51c3c",
  "/images/guides-editorial/fiftyfive-loft.webp": "03e6e2248a953113",
  "/images/guides-editorial/gate-neon.webp": "e1e1c1e7c7c3c3c3",
  "/images/guides-editorial/gattopardo-nave.webp": "caeae3735a4e5373",
  "/images/guides-editorial/hollywood-corso-como.webp": "3c382db4484c3fb9",
  "/images/guides-editorial/just-me-dancefloor.webp": "ecac6ec9e121343a",
  "/images/guides-editorial/just-me-exterior.webp": "3b3d1b1a66e2a8e0",
  "/images/guides-editorial/just-me-pavilion.webp": "393969a5e561c1d3",
  "/images/guides-editorial/just-me-vip-table.webp": "b698c9e397971797",
  "/images/guides-editorial/palace-como-fireworks.webp": "070f0f0f0f0e0c08",
  "/images/guides-editorial/pineta-dancefloor.webp": "9a1f9aa989c98486",
  "/images/guides-editorial/pineta-lounge.webp": "84838f9d97135114",
  "/images/guides-editorial/pineta-vip.webp": "672f1f7bf8cc0c0c",
  "/images/guides-editorial/radio-skyline-dusk.webp": "0666a28a8bc8f2e7",
  "/images/guides-editorial/repvblic-club.webp": "f9fcf67cbeac9d3a",
  "/images/guides-editorial/repvblic-vip-lounge.webp": "55576e95551b2333",
  "/images/guides-editorial/terme-alpine-snow.webp": "33ae8d7363631bb9",
  "/images/guides-editorial/terme-thermal-night.webp": "03068d272634181d",
  "/images/guides-editorial/terme-villa-gala.webp": "c1c1c1848d92b14d",
  "/images/guides-editorial/terminus-como-lake.webp": "06c6c6d692964ece",
  "/images/guides-editorial/terrazza-duomo-skyline.webp": "5d5e929a1292935e",
  "/images/guides-editorial/the-club-brera.webp": "093bb0b0755dc9cb",
  "/images/guides-editorial/tom-milano-dinner.webp": "6c644c8c9a8acebe",
  "/images/guides-editorial/voya-rooftop-20f.webp": "9ce0e0e6c65ade16",
  "/images/pillars/aperitivo-01.webp": "c8ccdcc2061f1f0f",
  "/images/pillars/aperitivo-04.webp": "d7c7a1a16964fd3d",
  "/images/pillars/aperitivo-05.webp": "317171395bca68ed",
  "/images/pillars/bottle-prices-02.webp": "19088b8b3cacefc7",
  "/images/pillars/bottle-prices-03.webp": "84838f9d97135114",
  "/images/pillars/bottle-prices-hero.webp": "9ec60ce464a6ac2d",
  "/images/pillars/concert-afterparties-01.webp": "6353131399899b1f",
  "/images/pillars/concert-afterparties-02.webp": "272767631b3f3930",
  "/images/pillars/concert-afterparties-03.webp": "0ce0e266c84c0a4b",
  "/images/pillars/concert-afterparties-04.webp": "5cd84888e9b1e767",
  "/images/pillars/concert-afterparties-05.webp": "0c2c2c7b6767e30b",
  "/images/pillars/concert-afterparties-06.webp": "7d7efc5e9c041a97",
  "/images/pillars/concierge-02.webp": "9ec60ce464a6ac2d",
  "/images/pillars/concierge-03.webp": "044251f0303397d2",
  "/images/pillars/concierge-04.webp": "e003038b9e4632d7",
  "/images/pillars/concierge-05.webp": "531f9fe7d7d24c0e",
  "/images/pillars/concierge-hero.webp": "5898b08838d2dadd",
  "/images/pillars/events-best-01.webp": "272767631b3f3930",
  "/images/pillars/events-best-02.webp": "0c2c2c7b6767e30b",
  "/images/pillars/events-best-03.webp": "6353131399899b1f",
  "/images/pillars/events-best-04.webp": "5cd84888e9b1e767",
  "/images/pillars/events-best-05.webp": "0ce0e266c84c0a4b",
  "/images/pillars/events-best-06.webp": "7d7efc5e9c041a97",
  "/images/pillars/events-hub-02.webp": "272767631b3f3930",
  "/images/pillars/events-hub-03.webp": "6353131399899b1f",
  "/images/pillars/events-hub-04.webp": "5cd84888e9b1e767",
  "/images/pillars/events-hub-hero.webp": "0c2c2c7b6767e30b",
  "/images/pillars/events-special-02.webp": "4e27313369cdc303",
  "/images/pillars/events-special-03.webp": "5898b08838d2dadd",
  "/images/pillars/events-special-04.webp": "93aba9991e0c8e8f",
  "/images/pillars/events-special-hero.webp": "19088b8b3cacefc7",
  "/images/pillars/events-this-week-02.webp": "797b7d6060c20c59",
  "/images/pillars/events-this-week-03.webp": "233003172ba5e6e6",
  "/images/pillars/events-this-week-04.webp": "e0f1e3b3a653d3a7",
  "/images/pillars/events-this-week-hero.webp": "5898b08838d2dadd",
  "/images/pillars/events-tonight-02.webp": "0c2c2c7b6767e30b",
  "/images/pillars/events-tonight-03.webp": "d38b2b9fc6c8c3a3",
  "/images/pillars/events-tonight-04.webp": "5cd84888e9b1e767",
  "/images/pillars/events-tonight-hero.webp": "9ec60ce464a6ac2d",
  "/images/pillars/football-afterparties-01.webp": "6353131399899b1f",
  "/images/pillars/football-afterparties-02.webp": "5898b08838d2dadd",
  "/images/pillars/football-afterparties-03.webp": "044251f0303397d2",
  "/images/pillars/football-afterparties-04.webp": "c5c1864bd9c888c4",
  "/images/pillars/football-afterparties-05.webp": "0ce0e266c84c0a4b",
  "/images/pillars/football-afterparties-06.webp": "542838b13931b33a",
  "/images/pillars/fw-01.webp": "19088b8b3cacefc7",
  "/images/pillars/fw-02.webp": "1f1e1e0c78d68e0e",
  "/images/pillars/fw-03.webp": "5898b08838d2dadd",
  "/images/pillars/fw-04.webp": "31595935587b63e3",
  "/images/pillars/fw-05.webp": "7e07032517caf8bc",
  "/images/pillars/fw-06.webp": "0ce0e266c84c0a4b",
  "/images/pillars/genre-hero-06.webp": "93aba9991e0c8e8f",
  "/images/pillars/genre-inline-06-a.webp": "e0f1e3b3a653d3a7",
  "/images/pillars/guest-lists-02.webp": "5898b08838d2dadd",
  "/images/pillars/guest-lists-03.webp": "233003172ba5e6e6",
  "/images/pillars/guest-lists-04.webp": "ad2cf1f1fbcbdb33",
  "/images/pillars/guest-lists-hero.webp": "044251f0303397d2",
  "/images/pillars/guide-09.webp": "317171395bca68ed",
  "/images/pillars/guide-10.webp": "19088b8b3cacefc7",
  "/images/pillars/guide-11.webp": "6353131399899b1f",
  "/images/pillars/guide-12.webp": "5898b08838d2dadc",
  "/images/pillars/guide-14.webp": "183c38381b99d9dc",
  "/images/pillars/guide-hero-02.webp": "9061b0336576f680",
  "/images/pillars/guide-inline-01-a.webp": "0c2c2c7b6767e30b",
  "/images/pillars/guide-inline-01-b.webp": "6353131399899b1f",
  "/images/pillars/guide-inline-01-c.webp": "c5c1864bd9c888c4",
  "/images/pillars/guide-inline-01-d.webp": "0ce0e266c84c0a4b",
  "/images/pillars/guide-inline-02-a.webp": "0507874644250706",
  "/images/pillars/guide-inline-02-c.webp": "1b7a5a9a1f8c0f03",
  "/images/pillars/guide-inline-02-d.webp": "96142e670cad0b47",
  "/images/pillars/guide-inline-03-a.webp": "84838f9d97135114",
  "/images/pillars/guide-inline-03-b.webp": "531f9fe7d7d24c0e",
  "/images/pillars/guide-inline-03-c.webp": "1c1d1d92b2b2939f",
  "/images/pillars/guide-inline-03-d.webp": "4f7a5c7aababcb0e",
  "/images/pillars/guide-inline-04-a.webp": "1e1e96ce66aea3c3",
  "/images/pillars/guide-inline-04-b.webp": "68b1ab974d636323",
  "/images/pillars/guide-inline-04-c.webp": "1003030351435376",
  "/images/pillars/guide-inline-04-d.webp": "c7e5c1f0f0e5c1b1",
  "/images/pillars/guide-inline-05-a.webp": "d597070fb4b01c1c",
  "/images/pillars/guide-inline-05-b.webp": "1b7ada9a1f8c0f03",
  "/images/pillars/guide-inline-05-c.webp": "097e072daa6eec3c",
  "/images/pillars/guide-inline-05-d.webp": "39584d587c366421",
  "/images/pillars/guide-inline-06-a.webp": "0c2c2c7b6767e30b",
  "/images/pillars/guide-inline-06-b.webp": "d38b2b9fc6c8c3a3",
  "/images/pillars/guide-inline-06-c.webp": "5cd84888e9b1e767",
  "/images/pillars/guide-inline-06-d.webp": "7d7efc5e9c041a97",
  "/images/pillars/guide-inline-09-a.webp": "a6869d170aa1a0e0",
  "/images/pillars/guide-inline-09-b.webp": "797b7d6060c20c59",
  "/images/pillars/guide-inline-09-c.webp": "383c75c8cab81213",
  "/images/pillars/guide-inline-09-d.webp": "7eccbe7c6e47737b",
  "/images/pillars/guide-inline-10-a.webp": "5898b08838d2dadd",
  "/images/pillars/guide-inline-10-b.webp": "f8fdffc9d993f336",
  "/images/pillars/guide-inline-10-c.webp": "8e86929d36391c23",
  "/images/pillars/guide-inline-10-d.webp": "93aba9991e0c8e8f",
  "/images/pillars/guide-inline-11-a.webp": "d38b2b9fc6c8c3a3",
  "/images/pillars/guide-inline-11-b.webp": "5898b08838d2dadd",
  "/images/pillars/guide-inline-11-c.webp": "0c2c2c7b6767e30b",
  "/images/pillars/guide-inline-11-d.webp": "707096b2b2d48e0f",
  "/images/pillars/guide-inline-12-a.webp": "1c9c9c9c9a1e2d2f",
  "/images/pillars/guide-inline-12-b.webp": "4e27313369cdc303",
  "/images/pillars/guide-inline-12-c.webp": "19088b8b3cacefc7",
  "/images/pillars/guide-inline-12-d.webp": "0f0f0f37d4d57171",
  "/images/pillars/guide-inline-13-a.webp": "6353131399899b1f",
  "/images/pillars/guide-inline-13-b.webp": "272767631b3f3930",
  "/images/pillars/guide-inline-13-c.webp": "0ce0e266c84c0a4b",
  "/images/pillars/guide-inline-13-d.webp": "707096b2b2d48e0f",
  "/images/pillars/guide-inline-14-a.webp": "93aba9991e0c8e8f",
  "/images/pillars/guide-inline-14-b.webp": "e0f1e3b3a653d3a7",
  "/images/pillars/guide-inline-14-c.webp": "531f9fe7d7d24c0e",
  "/images/pillars/guide-inline-14-d.webp": "6969c1c1c0c30907",
  "/images/pillars/intent-18plus-01.webp": "091958183ded6141",
  "/images/pillars/intent-18plus-02.webp": "b0743e3cfbb52929",
  "/images/pillars/intent-18plus-03.webp": "ad2cf1f1fbcbdb33",
  "/images/pillars/intent-18plus-04.webp": "6353131399899b1f",
  "/images/pillars/intent-18plus-hero.webp": "091958183ded6141",
  "/images/pillars/intent-21plus-02.webp": "0c2c2c7b6767e30b",
  "/images/pillars/intent-21plus-03.webp": "31595935587b63e3",
  "/images/pillars/intent-21plus-04.webp": "19088b8b3cacefc7",
  "/images/pillars/intent-21plus-hero.webp": "272767631b3f3930",
  "/images/pillars/intent-erasmus-02.webp": "0480e6e4cccd4e0e",
  "/images/pillars/intent-erasmus-03.webp": "79734ad092387747",
  "/images/pillars/intent-erasmus-hero.webp": "c8ccdcc2061f1f0f",
  "/images/pillars/intent-international-02.webp": "7513a7adad6c5039",
  "/images/pillars/intent-international-03.webp": "1f1e1e0c78d68e0e",
  "/images/pillars/intent-international-04.webp": "0ce0e266c84c0a4b",
  "/images/pillars/intent-international-hero.webp": "5898b08838d2dadd",
  "/images/pillars/mfw-01.webp": "7513a7adad6c5039",
  "/images/pillars/mfw-02.webp": "f8fdffc9d993f336",
  "/images/pillars/mfw-03.webp": "6969c1c1c0c30907",
  "/images/pillars/mfw-04.webp": "8e86929d36391c23",
  "/images/pillars/mfw-05.webp": "3507072724e3c3c2",
  "/images/pillars/mfw-06.webp": "93aba9991e0c8e8f",
  "/images/pillars/mfw-cal-01.webp": "4f7a5c7aababcb0e",
  "/images/pillars/mfw-cal-02.webp": "0426bcb824444f1f",
  "/images/pillars/mfw-cal-03.webp": "9ec60ce464a6ac2d",
  "/images/pillars/mfw-cal-04.webp": "1c1d1d92b2b2939f",
  "/images/pillars/mfw-cal-05.webp": "9e01c18709681993",
  "/images/pillars/mfw-cal-06.webp": "531f9fe7d7d24c0e",
  "/images/pillars/nye-02.webp": "1c9c9c9c9a1e2d2f",
  "/images/pillars/nye-03.webp": "19088b8b3cacefc7",
  "/images/pillars/nye-05.webp": "0f0f0f37d4d57171",
  "/images/pillars/nye-06.webp": "4e27313369cdc303",
  "/images/pillars/private-parties-02.webp": "317171395bca68ed",
  "/images/pillars/private-parties-03.webp": "e003038b9e4632d7",
  "/images/pillars/private-parties-04.webp": "9ec60ce464a6ac2d",
  "/images/pillars/rooftops-01.webp": "0ce0e266c84c0a4b",
  "/images/pillars/rooftops-02.webp": "183c38381b99d9dc",
  "/images/pillars/rooftops-03.webp": "1f1e1e0c78d68e0e",
  "/images/pillars/rooftops-04.webp": "7e07032517caf8bc",
  "/images/pillars/rooftops-05.webp": "26765a4b6870761e",
  "/images/pillars/seo-landing-01.webp": "5898b08838d2dadd",
  "/images/pillars/seo-landing-02.webp": "0c2c2c7b6767e30b",
  "/images/pillars/seo-landing-03.webp": "6353131399899b1f",
  "/images/pillars/seo-landing-04.webp": "c5c1864bd9c888c4",
  "/images/pillars/seo-landing-05.webp": "0ce0e266c84c0a4b",
  "/images/pillars/vip-tables-02.webp": "84838f9d97135114",
  "/images/pillars/vip-tables-03.webp": "d38b2b9fc6c8c3a3",
  "/images/pillars/vip-tables-04.webp": "531f9fe7d7d24c0e",
  "/images/pillars/vip-tables-hero.webp": "9ec60ce464a6ac2d",
  "/images/pillars/zone-13.webp": "0ce0e266c84c0a4b",
  "/images/pillars/zone-hero-01.webp": "19088b8b3cacefc7",
  "/images/pillars/zone-hero-02.webp": "9061b0336576f680",
  "/images/pillars/zone-hero-03.webp": "31595935587b63e3",
  "/images/pillars/zone-hero-04.webp": "161ea5a692d43874",
  "/images/pillars/zone-hero-05.webp": "542838b13931b33a",
  "/images/pillars/zone-hero-06.webp": "c5c1864bd9c888c4",
  "/images/pillars/zone-hero-07.webp": "6b3870f385450454",
  "/images/pillars/zone-hero-08.webp": "8ec6d2c193133874",
  "/images/pillars/zone-hero-09.webp": "7e07032517caf8bc",
  "/images/pillars/zone-hero-11.webp": "5898b08838d2dadd",
  "/images/pillars/zone-hero-12.webp": "3507072724e3c3c2",
  "/images/pillars/zone-hero-13.webp": "0ce0e266c84c0a4b",
  "/images/pillars/zone-hero-14.webp": "6353131399899b1f",
  "/images/pillars/zone-inline-01-a.webp": "7513a7adad6c5039",
  "/images/pillars/zone-inline-01-b.webp": "b1e6c6a69aa64603",
  "/images/pillars/zone-inline-01-c.webp": "dcf080c4d1c5640c",
  "/images/pillars/zone-inline-02-a.webp": "0507874644250706",
  "/images/pillars/zone-inline-02-c.webp": "96142e670cad0b47",
  "/images/pillars/zone-inline-02-d.webp": "bf3e3a948db03236",
  "/images/pillars/zone-inline-03-a.webp": "ad2cf1f1fbcbdb33",
  "/images/pillars/zone-inline-03-b.webp": "4f07341949ecec57",
  "/images/pillars/zone-inline-03-c.webp": "29f86c4ccdc9490f",
  "/images/pillars/zone-inline-04-a.webp": "044251f0303397d2",
  "/images/pillars/zone-inline-04-b.webp": "1003030351435376",
  "/images/pillars/zone-inline-04-c.webp": "1f1e1e0c78d68e0e",
  "/images/pillars/zone-inline-05-b.webp": "531f9fe7d7d24c0e",
  "/images/pillars/zone-inline-05-d.webp": "7d7efc5e9c041a97",
  "/images/pillars/zone-inline-06-a.webp": "5898b08838d2dadd",
  "/images/pillars/zone-inline-06-b.webp": "317171395bca68ed",
  "/images/pillars/zone-inline-06-c.webp": "c8ccdcc2061f1f0f",
  "/images/pillars/zone-inline-07-a.webp": "39584d587c366421",
  "/images/pillars/zone-inline-07-c.webp": "4d0fafa766323232",
  "/images/pillars/zone-inline-07-d.webp": "34bc3c1931191f81",
  "/images/pillars/zone-inline-08-a.webp": "c7e5c1f0f0e5c1b1",
  "/images/pillars/zone-inline-09-a.webp": "9496948ccc2e2565",
  "/images/pillars/zone-inline-09-b.webp": "390d4747cfa6c743",
  "/images/pillars/zone-inline-09-c.webp": "03c1e1034566f2b0",
  "/images/pillars/zone-inline-10-a.webp": "097e072daa6eec3c",
  "/images/pillars/zone-inline-10-b.webp": "0707094825219a9b",
  "/images/pillars/zone-inline-10-c.webp": "5c17bc9c92978f0f",
  "/images/pillars/zone-inline-11-a.webp": "272767631b3f3930",
  "/images/pillars/zone-inline-11-c.webp": "0d0f8f4a6ad24646",
  "/images/pillars/zone-inline-12-a.webp": "037266378183a161",
  "/images/pillars/zone-inline-12-b.webp": "60642d0d7d5a9461",
  "/images/pillars/zone-inline-12-c.webp": "69a8a0b1323e1eae",
  "/images/pillars/zone-inline-12-d.webp": "dcf080c4d1c5640c",
  "/images/pillars/zone-inline-13-a.webp": "183c38381b99d9dc",
  "/images/pillars/zone-inline-13-b.webp": "e003038b9e4632d7",
  "/images/pillars/zone-inline-13-c.webp": "872c25a1343127a7",
  "/images/pillars/zone-inline-13-d.webp": "383c75c8cab81213",
  "/images/pillars/zone-inline-14-a.webp": "d38b2b9fc6c8c3a3",
  "/images/pillars/zone-inline-14-b.webp": "233003172ba5e6e6",
  "/images/pillars/zone-inline-14-c.webp": "d7c7a1a16964fd3d",
  "/images/pillars/zone-inline-14-d.webp": "0ce0e266c84c0a4b",
  "/images/seo-events/master/alcatraz-milano.webp": "1003030351435376",
  "/images/seo-events/master/amnesia-milano.webp": "1e1e96ce66aea3c3",
  "/images/seo-events/master/apollo-milano-interior-01.webp": "9061b0336576f680",
  "/images/seo-events/master/apollo-milano-interior-02.webp": "f8cc1ffbd3149888",
  "/images/seo-events/master/apollo-milano-interior-03.webp": "06968e2e5cdc7ce2",
  "/images/seo-events/master/apollo-milano-interior-04.webp": "11062d2e6f8d373b",
  "/images/seo-events/master/arci-bellezza-milano.webp": "c3d1d0c375682c0c",
  "/images/seo-events/master/armani-prive-milano-interior-04.webp": "cae8393ab2c8ce1f",
  "/images/seo-events/master/base-milano-2.webp": "140c8586860e471f",
  "/images/seo-events/master/base-milano.webp": "1b7ada9a1f8c0f03",
  "/images/seo-events/master/blue-note-milano.webp": "161ea5e692d43874",
  "/images/seo-events/master/capodanno-gran-gala-famiglie-flow-01.webp": "8787c687a79b1096",
  "/images/seo-events/master/capodanno-justme-milano-torre-branca.webp": "58d8908838d2dadc",
  "/images/seo-events/master/capodanno-piazza-duomo-flow-01.webp": "713b3fd7d48aa6a2",
  "/images/seo-events/master/capodanno-rooftop-duomo-flow-01.webp": "4e27313369cdc303",
  "/images/seo-events/master/capodanno-terme-milano-flow-01.webp": "0f19144d69633652",
  "/images/seo-events/master/capodanno-tram-storico-flow-01.webp": "b48d9e9c3435f073",
  "/images/seo-events/master/capodanno-villa-castello-flow-01.webp": "0f0f0f37d4d57171",
  "/images/seo-events/master/carlsberg-ol-01.webp": "13c3ce0e0ec4f1c7",
  "/images/seo-events/master/carlsberg-ol-02.webp": "c34343044c488bc2",
  "/images/seo-events/master/carlsberg-ol-03.webp": "7a78bda1090f3c3c",
  "/images/seo-events/master/carlsberg-ol-04.webp": "8330c4c2a30e0e1e",
  "/images/seo-events/master/ceresio-7-interior-01.webp": "1f1e1e0c78d68e0e",
  "/images/seo-events/master/dopo-space-1.webp": "fccfc9edad346140",
  "/images/seo-events/master/dopo-space-2.webp": "f85f6e6868313130",
  "/images/seo-events/master/fabbrica-del-vapore-1.webp": "72b294cdeae23859",
  "/images/seo-events/master/fabbrica-del-vapore-2.webp": "7010340be9c858d0",
  "/images/seo-events/master/fabrique-milano.webp": "68b1ab97cd636323",
  "/images/seo-events/master/fiftyfive-milano-bar-01.webp": "872c25a1343127a7",
  "/images/seo-events/master/fiftyfive-milano-interior-01.webp": "c585864bd9c888c4",
  "/images/seo-events/master/fiftyfive-milano-interior-07.webp": "7c60444440329adb",
  "/images/seo-events/master/fiftyfive-milano-lounge-01.webp": "47c5e50fbe323731",
  "/images/seo-events/master/fiftyfive-milano-terrazza-01.webp": "317171195bca68ed",
  "/images/seo-events/master/innocenti-evasioni-terrazza-triennale.webp": "be0d4c0d18399f8e",
  "/images/seo-events/master/just-me-milano-lounge-01.webp": "ddcde9ad94940501",
  "/images/seo-events/master/live-club-trezzo.webp": "10010270e8e9e9c8",
  "/images/seo-events/master/magazzini-generali-interior-01.webp": "0507874644250706",
  "/images/seo-events/master/molto-carate-brianza.webp": "1910303513233b1f",
  "/images/seo-events/master/movie-club-desio.webp": "8ac183094378f05a",
  "/images/seo-events/master/noir-club-lissone.webp": "40e1e1911e9c7a33",
  "/images/seo-events/master/oneway-sesto.webp": "4c69373d3052cf0b",
  "/images/seo-events/master/ristorante-torre-milano.webp": "2cbc3c1931191f81",
  "/images/seo-events/master/rock-n-roll-milano.webp": "fc7869605879939f",
  "/images/seo-events/master/santeria-toscana-31.webp": "390d4747cfa6c743",
  "/images/seo-events/master/spirit-de-milan.webp": "73171eb4a6e51f1f",
  "/images/seo-events/master/super-club-milano.webp": "bf3e3a948db03236",
  "/images/seo-events/master/tambourine-seregno.webp": "19370e8cad0b290b",
  "/images/seo-events/master/tempio-del-futuro-perduto-1.webp": "12060c9c1eeec392",
  "/images/seo-events/master/tempio-del-futuro-perduto-2.webp": "f99908c3d135548c",
  "/images/seo-events/master/terrazza-21-interior-01.webp": "7a07032517caf8bc",
  "/images/seo-events/master/terrazza-aperol-milano.webp": "036266378183a161",
  "/images/seo-events/master/terrazza-gallia-milano.webp": "060f1f36d2d01d5c",
  "/images/seo-events/master/the-beach-milano.webp": "1fc4e4c4a4f0f0f0",
  "/images/seo-events/master/the-dome-milano.webp": "60642d0d7d5a9461",
  "/images/seo-events/master/the-roof-milano.webp": "dcf0c0c4d1c5640c",
  "/images/seo-events/master/tocqueville-13.webp": "4f07341949ecec57",
  "/images/seo-events/master/v-fabrique-2.webp": "33331b1f1d8f8f8f",
  "/images/seo-events/master/voya-rooftop-milan-cucina-01.webp": "708e0f0f0f8f0f0f",
  "/images/seo-events/master/voya-rooftop-milan-drink-01.webp": "383c75c8cab81213",
  "/images/seo-events/master/voya-rooftop-milan-lounge-01.webp": "e001038b9e4632d7",
  "/images/seo-events/master/voya-rooftop-milan-skyline-01.webp": "0ce0e266c84c0a43",
  "/images/seo-events/master/zoo-club-cinisello.webp": "47cfc46367f2fcf8",
  "/images/venues/11-clubroom/11-clubroom-interior-01.webp": "31595935587a63e3",
  "/images/venues/11-clubroom/11-clubroom-interior-02.webp": "0f86929d36391c23",
  "/images/venues/11-clubroom/11-clubroom-interior-03.webp": "1c1d1d92b2b2939f",
  "/images/venues/11-clubroom/11-clubroom-interior-04.webp": "d4ccc9c9d9f88c1d",
  "/images/venues/11-clubroom/11-clubroom-interior-05.webp": "8f070f8a2eaa8e0f",
  "/images/venues/11-clubroom/11-clubroom-interior-06.webp": "fb79381e9ed91f1b",
  "/images/venues/11-clubroom/11-clubroom-interior-07.webp": "068787978c0d676c",
  "/images/venues/55-milano/55-milano-friday-dinner-show-01.webp": "e0f1e3b3a653d3a7",
  "/images/venues/55-milano/55-milano-interior-01.webp": "872c25a1303127a7",
  "/images/venues/55-milano/55-milano-interior-02.webp": "7310e2e7e74e233d",
  "/images/venues/55-milano/55-milano-interior-03.webp": "707096b2b2d48e0f",
  "/images/venues/55-milano/55-milano-interior-04.webp": "e1f1e3b3a653d3a7",
  "/images/venues/55-milano/55-milano-interior-05.webp": "3c2454ec694f2f87",
  "/images/venues/55-milano/55-milano-interior-07.webp": "7310e2e7e74e233d",
  "/images/venues/55-milano/55-milano-saturday-the-wall-01.webp": "5cd84888e9b1e767",
  "/images/venues/aria-club-milano/aria-club-milano-bar-01.webp": "7163032b3b81cfcb",
  "/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp": "d7c7a1a16964fd3d",
  "/images/venues/aria-club-milano/aria-club-milano-buffet-02.webp": "2c2c24d373732704",
  "/images/venues/aria-club-milano/aria-club-milano-garden-01.webp": "233003172ba5e6e6",
  "/images/venues/aria-club-milano/aria-club-milano-interior-01.webp": "6353131399899b1f",
  "/images/venues/aria-club-milano/aria-club-milano-interior-02.webp": "d38b2b9fc6c8c3a3",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-01.webp": "19088b9b3cacefc7",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-02.webp": "7513a7adad6c5039",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-03.webp": "4f7a5c7aababcb0e",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-04.webp": "cae8393ab2c8ce1f",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-06.webp": "cae8393ab2c8ce1f",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-07.webp": "7513a7adad6c5039",
  "/images/venues/ceresio-7/ceresio-7-interior-01.webp": "1f1e1e0c78d68e0e",
  "/images/venues/ceresio-7/ceresio-7-interior-02.webp": "f8fdffc9d993f336",
  "/images/venues/ceresio-7/ceresio-7-interior-03.webp": "0426bcb824444f0f",
  "/images/venues/ceresio-7/ceresio-7-interior-04.webp": "7ffeb6682c6cc707",
  "/images/venues/ceresio-7/ceresio-7-interior-05.webp": "f8fdffc9d993f336",
  "/images/venues/ceresio-7/ceresio-7-interior-06.webp": "7ffeb6682c6cc707",
  "/images/venues/ceresio-7/ceresio-7-interior-07.webp": "f8fdffc9d993f336",
  "/images/venues/church-81/church-81-interior-01.webp": "d9d0f072721b2b2f",
  "/images/venues/church-81/church-81-interior-02.webp": "cc0e0e189cc6e173",
  "/images/venues/church-81/church-81-interior-03.webp": "218182c393938b16",
  "/images/venues/church-81/church-81-interior-04.webp": "38e0c5d7e6962f1f",
  "/images/venues/dazi-milano/dazi-milano-interior-01.webp": "1f295a5a2aec6260",
  "/images/venues/dazi-milano/dazi-milano-interior-02.webp": "0f332b2929490e0f",
  "/images/venues/dazi-milano/dazi-milano-interior-03.webp": "f3f3eb51303830b9",
  "/images/venues/dazi-milano/dazi-milano-interior-04.webp": "735a52531519193f",
  "/images/venues/dazi-milano/dazi-milano-interior-05.webp": "f7f3f74e0c2c1818",
  "/images/venues/dazi-milano/dazi-milano-interior-06.webp": "101038f9f9ffbebc",
  "/images/venues/editorial/01-milano-nightclubs-rooftops.webp": "0ce0e266c84c0a4b",
  "/images/venues/editorial/02-milano-vip-tables-bottle-service.webp": "9ec60ce464a6ac2d",
  "/images/venues/editorial/03-milano-dress-code-door-policy.webp": "044251f0303397d2",
  "/images/venues/editorial/04-milano-nightlife-districts-map.webp": "5898b08838d2dadd",
  "/images/venues/editorial/05-milano-hinterland-monza-lombardia.webp": "10010270e8e9e9c8",
  "/images/venues/editorial/amnesia-milano.webp": "1e1e96ce66aea3c3",
  "/images/venues/editorial/innocenti-evasioni-terrazza-triennale.webp": "be0d4c0d18399f8e",
  "/images/venues/editorial/radio-rooftop-bar-milano.webp": "26765a4b6870761e",
  "/images/venues/editorial/ristorante-torre-milano.webp": "34bc3c1931191f81",
  "/images/venues/editorial/super-club-milano.webp": "bf3e3a948db03236",
  "/images/venues/editorial/terrazza-aperol-milano.webp": "037266378183a161",
  "/images/venues/editorial/terrazza-gallia-milano.webp": "060f1f36d2d01d5c",
  "/images/venues/editorial/the-roof-milano.webp": "dcf0c0c4d1c5640c",
  "/images/venues/gattopardo/gattopardo-interior-01.webp": "b1e6c6a69aa64603",
  "/images/venues/gattopardo/gattopardo-interior-02.webp": "0d0f8f4a6ad24646",
  "/images/venues/gattopardo/gattopardo-interior-03.webp": "7eccbe7c6e47737b",
  "/images/venues/gattopardo/gattopardo-interior-04.webp": "0e8c0419bb95d339",
  "/images/venues/gattopardo/gattopardo-interior-06.webp": "0e8c0419bb95d339",
  "/images/venues/gattopardo/gattopardo-interior-07.webp": "0d0f8f4a6ad24646",
  "/images/venues/hollywood/hollywood-interior-01.webp": "ad2c61f1fbcbdb33",
  "/images/venues/hollywood/hollywood-interior-02.webp": "79734ad092387747",
  "/images/venues/hollywood/hollywood-interior-03.webp": "24b675f118385813",
  "/images/venues/hollywood/hollywood-interior-04.webp": "07576dede9802d1c",
  "/images/venues/hollywood/hollywood-interior-06.webp": "07576dede9802d1c",
  "/images/venues/just-me-milano/just-me-milano-aperitivo-01.webp": "c8ccdcc2061f1f0f",
  "/images/venues/just-me-milano/just-me-milano-buffet-01.webp": "a6869d170aa1a0e0",
  "/images/venues/just-me-milano/just-me-milano-cena-01.webp": "6969c1c1c0c30907",
  "/images/venues/just-me-milano/just-me-milano-interior-01.webp": "69e9a1e5c0628901",
  "/images/venues/just-me-milano/just-me-milano-interior-02.webp": "c8ccdcc2061f1f0f",
  "/images/venues/just-me-milano/just-me-milano-interior-03.webp": "5898908838d2dadc",
  "/images/venues/just-me-milano/just-me-milano-interior-04.webp": "272767631b3f3930",
  "/images/venues/just-me-milano/just-me-milano-interior-05.webp": "9ec60ce464a6ac2d",
  "/images/venues/just-me-milano/just-me-milano-interior-06.webp": "c8ccdcc2061f1f0f",
  "/images/venues/just-me-milano/just-me-milano-interior-07.webp": "5898908838d2dadc",
  "/images/venues/just-me-milano/just-me-milano-lounge-01.webp": "ddcde9ad94940501",
  "/images/venues/just-me-milano/just-me-milano-party-01.webp": "272767631b3f3930",
  "/images/venues/just-me-milano/just-me-milano-prive-01.webp": "9ec60ce464a6ac2d",
  "/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp": "5898b08838d2dadd",
  "/images/venues/magazzini-generali/magazzini-generali-interior-01.webp": "0507874644250706",
  "/images/venues/magazzini-generali/magazzini-generali-interior-02.webp": "6b3870f385450454",
  "/images/venues/magazzini-generali/magazzini-generali-interior-03.webp": "4d0fafa766323232",
  "/images/venues/magazzini-generali/magazzini-generali-interior-04.webp": "03c1e1034566f2b0",
  "/images/venues/mib-milano/mib-milano-interior-01.webp": "0d1d0d0c39393c09",
  "/images/venues/mib-milano/mib-milano-interior-02.webp": "cee1238c8ab10909",
  "/images/venues/mib-milano/mib-milano-interior-03.webp": "3e1e1e1e9ad91c3b",
  "/images/venues/mib-milano/mib-milano-interior-04.webp": "070f8f2f3e8a8f87",
  "/images/venues/mib-milano/mib-milano-interior-05.webp": "d85919d9490f0f0f",
  "/images/venues/mib-milano/mib-milano-interior-06.webp": "1c1cb8a6ba0fcd4d",
  "/images/venues/mib-milano/mib-milano-interior-07.webp": "0fea69a9c98c0d0e",
  "/images/venues/pineta-milano/pineta-milano-aperitivo-01.webp": "797b7d6060c20c59",
  "/images/venues/pineta-milano/pineta-milano-cena-01.webp": "93aba9991e0c8e8f",
  "/images/venues/pineta-milano/pineta-milano-ingresso-01.webp": "044251f0303397d2",
  "/images/venues/pineta-milano/pineta-milano-interior-01.webp": "797b7d6060c20c59",
  "/images/venues/pineta-milano/pineta-milano-interior-02.webp": "044251f0303397f2",
  "/images/venues/pineta-milano/pineta-milano-interior-03.webp": "0c6c4c3647c78717",
  "/images/venues/pineta-milano/pineta-milano-interior-04.webp": "797b7d6060c20c59",
  "/images/venues/pineta-milano/pineta-milano-interior-05.webp": "044251f0303397f2",
  "/images/venues/pineta-milano/pineta-milano-interior-06.webp": "93aba9991e0c8e8f",
  "/images/venues/pineta-milano/pineta-milano-interior-07.webp": "797b7d6060c20c59",
  "/images/venues/pineta-milano/pineta-milano-lounge-01.webp": "84838f9d97135114",
  "/images/venues/pineta-milano/pineta-milano-party-01.webp": "0c2c2c7b6767e30b",
  "/images/venues/play-club-milano/play-club-milano-interior-01.webp": "b0643e3cfbf52929",
  "/images/venues/play-club-milano/play-club-milano-interior-02.webp": "4e4d49f9b90c61e3",
  "/images/venues/play-club-milano/play-club-milano-interior-03.webp": "78f8353133736363",
  "/images/venues/play-club-milano/play-club-milano-interior-04.webp": "3b2b276f47430f8f",
  "/images/venues/play-club-milano/play-club-milano-interior-05.webp": "fce666ded4d4d8d8",
  "/images/venues/play-club-milano/play-club-milano-interior-06.webp": "737313230a0e0e8f",
  "/images/venues/play-club-milano/play-club-milano-interior-07.webp": "9eb288e8d0327a83",
  "/images/venues/repvblic-milano/repvblic-milano-interior-01.webp": "531f9fe7d7d24c0e",
  "/images/venues/repvblic-milano/repvblic-milano-interior-02.webp": "224131b4b5796787",
  "/images/venues/repvblic-milano/repvblic-milano-interior-03.webp": "7d7efc5e9c041a97",
  "/images/venues/repvblic-milano/repvblic-milano-interior-06.webp": "542838b13931b33a",
  "/images/venues/terrazza-21/terrazza-21-interior-01.webp": "7e07032517caf8bc",
  "/images/venues/terrazza-21/terrazza-21-interior-02.webp": "3507072724e3c3c2",
  "/images/venues/terrazza-21/terrazza-21-interior-03.webp": "9e01c18709681993",
  "/images/venues/terrazza-21/terrazza-21-interior-04.webp": "04100a89a83878f8",
  "/images/venues/terrazza-21/terrazza-21-interior-05.webp": "3507072724e3c3c2",
  "/images/venues/terrazza-21/terrazza-21-interior-06.webp": "04100a89a83878f8",
  "/images/venues/terrazza-21/terrazza-21-interior-07.webp": "3507072724e3c3c2",
  "/images/venues/the-club-milano/the-club-milano-interior-01.webp": "091958183ded6141",
  "/images/venues/the-club-milano/the-club-milano-interior-02.webp": "8480e6e4cccd4e0e",
  "/images/venues/the-club-milano/the-club-milano-interior-03.webp": "f0f4e7f634b81c24",
  "/images/venues/the-club-milano/the-club-milano-interior-04.webp": "f3e4f063e2f2f8f8",
  "/images/venues/the-club-milano/the-club-milano-interior-05.webp": "00c085dc5a766b29",
  "/images/venues/the-club-milano/the-club-milano-interior-06.webp": "1c3c0e284167cf0e",
  "/images/venues/the-club-milano/the-club-milano-interior-07.webp": "db4e4561aeb63323",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp": "04099d357dda383b",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-02.webp": "60430b1634a466f6",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-03.webp": "708e0f0f0f8f0f0f",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-04.webp": "7f4041d939d7e6fe",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-05.webp": "183c38381b99d9dc",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-06.webp": "3c3c75c8cab81213",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-07.webp": "7f4041d939d7e6fe"
};

const VENUE_PHOTO_CANDIDATES: Record<string, string[]> = {
  "just-me-milano": [
    "/images/guides-editorial/just-me-pavilion.webp",
    "/images/guides-editorial/just-me-dancefloor.webp",
    "/images/guides-editorial/just-me-vip-table.webp",
    "/images/guides-editorial/just-me-exterior.webp",
    "/images/events-gallery/just-me-saturday/just-me-milano-torre-branca-saturday-night.webp",
    "/images/events-gallery/just-me-saturday/just-me-milano-aperitivo-buffet-saturday.webp",
    "/images/events-gallery/just-me-saturday/just-me-milano-dancefloor-saturday-night.webp",
    "/images/events-gallery/just-me-saturday/just-me-milano-lounge-saturday-night.webp",
    "/images/venues/just-me-milano/just-me-milano-aperitivo-01.webp",
    "/images/venues/just-me-milano/just-me-milano-buffet-01.webp",
    "/images/venues/just-me-milano/just-me-milano-cena-01.webp",
    "/images/venues/just-me-milano/just-me-milano-interior-01.webp",
    "/images/venues/just-me-milano/just-me-milano-interior-03.webp",
    "/images/venues/just-me-milano/just-me-milano-interior-04.webp",
    "/images/venues/just-me-milano/just-me-milano-interior-05.webp",
    "/images/venues/just-me-milano/just-me-milano-lounge-01.webp"
  ],
  "pineta-club-milano": [
    "/images/guides-editorial/pineta-lounge.webp",
    "/images/guides-editorial/pineta-dancefloor.webp",
    "/images/guides-editorial/pineta-vip.webp",
    "/images/events/curated/aperitivi-milano-pineta-scene-v2.webp",
    "/images/venues/pineta-milano/pineta-milano-aperitivo-01.webp",
    "/images/venues/pineta-milano/pineta-milano-cena-01.webp",
    "/images/venues/pineta-milano/pineta-milano-ingresso-01.webp",
    "/images/venues/pineta-milano/pineta-milano-interior-03.webp",
    "/images/venues/pineta-milano/pineta-milano-party-01.webp"
  ],
  "voya-rooftop-milan": [
    "/images/guides-editorial/voya-rooftop-20f.webp",
    "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp",
    "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-02.webp",
    "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-03.webp",
    "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-04.webp",
    "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-05.webp",
    "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-06.webp",
    "/images/seo-events/master/voya-rooftop-milan-lounge-01.webp",
    "/images/seo-events/master/voya-rooftop-milan-skyline-01.webp"
  ],
  "repvblic-milano": [
    "/images/guides-editorial/repvblic-club.webp",
    "/images/guides-editorial/repvblic-vip-lounge.webp",
    "/images/venues/repvblic-milano/repvblic-milano-interior-01.webp",
    "/images/venues/repvblic-milano/repvblic-milano-interior-02.webp",
    "/images/venues/repvblic-milano/repvblic-milano-interior-03.webp",
    "/images/venues/repvblic-milano/repvblic-milano-interior-06.webp"
  ],
  "aria-club-milano": [
    "/images/guides-editorial/aria-garden.webp",
    "/images/guides-editorial/aria-dancefloor.webp",
    "/images/venues/aria-club-milano/aria-club-milano-bar-01.webp",
    "/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp",
    "/images/venues/aria-club-milano/aria-club-milano-buffet-02.webp",
    "/images/venues/aria-club-milano/aria-club-milano-garden-01.webp",
    "/images/venues/aria-club-milano/aria-club-milano-interior-02.webp"
  ],
  "55-milano": [
    "/images/guides-editorial/fiftyfive-loft.webp",
    "/images/venues/55-milano/55-milano-friday-dinner-show-01.webp",
    "/images/venues/55-milano/55-milano-interior-01.webp",
    "/images/venues/55-milano/55-milano-interior-02.webp",
    "/images/venues/55-milano/55-milano-interior-03.webp",
    "/images/venues/55-milano/55-milano-interior-05.webp",
    "/images/venues/55-milano/55-milano-saturday-the-wall-01.webp",
    "/images/seo-events/master/fiftyfive-milano-interior-01.webp",
    "/images/seo-events/master/fiftyfive-milano-interior-07.webp",
    "/images/seo-events/master/fiftyfive-milano-lounge-01.webp",
    "/images/seo-events/master/fiftyfive-milano-terrazza-01.webp"
  ],
  "dazi-milano": [
    "/images/venues/dazi-milano/dazi-milano-interior-01.webp",
    "/images/venues/dazi-milano/dazi-milano-interior-02.webp",
    "/images/venues/dazi-milano/dazi-milano-interior-03.webp",
    "/images/venues/dazi-milano/dazi-milano-interior-04.webp",
    "/images/venues/dazi-milano/dazi-milano-interior-05.webp",
    "/images/venues/dazi-milano/dazi-milano-interior-06.webp"
  ],
  "11-clubroom": [
    "/images/venues/11-clubroom/11-clubroom-interior-01.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-02.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-03.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-04.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-05.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-06.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-07.webp"
  ],
  "11-clubroom-milano": [
    "/images/venues/11-clubroom/11-clubroom-interior-01.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-02.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-03.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-04.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-05.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-06.webp",
    "/images/venues/11-clubroom/11-clubroom-interior-07.webp"
  ],
  "church-81": [
    "/images/venues/church-81/church-81-interior-01.webp",
    "/images/venues/church-81/church-81-interior-02.webp",
    "/images/venues/church-81/church-81-interior-03.webp",
    "/images/venues/church-81/church-81-interior-04.webp"
  ],
  "gattopardo-milano": [
    "/images/guides-editorial/gattopardo-nave.webp",
    "/images/venues/gattopardo/gattopardo-interior-01.webp",
    "/images/venues/gattopardo/gattopardo-interior-02.webp",
    "/images/venues/gattopardo/gattopardo-interior-03.webp",
    "/images/venues/gattopardo/gattopardo-interior-04.webp"
  ],
  "mib-milano": [
    "/images/venues/mib-milano/mib-milano-interior-01.webp",
    "/images/venues/mib-milano/mib-milano-interior-02.webp",
    "/images/venues/mib-milano/mib-milano-interior-03.webp",
    "/images/venues/mib-milano/mib-milano-interior-04.webp",
    "/images/venues/mib-milano/mib-milano-interior-05.webp",
    "/images/venues/mib-milano/mib-milano-interior-06.webp",
    "/images/venues/mib-milano/mib-milano-interior-07.webp"
  ],
  "armani-prive-milano": [
    "/images/guides-editorial/armani-prive-lounge.webp",
    "/images/venues/armani-prive-milano/armani-prive-milano-interior-01.webp",
    "/images/venues/armani-prive-milano/armani-prive-milano-interior-02.webp",
    "/images/venues/armani-prive-milano/armani-prive-milano-interior-03.webp",
    "/images/venues/armani-prive-milano/armani-prive-milano-interior-04.webp"
  ],
  "hollywood-club-milano": [
    "/images/guides-editorial/hollywood-corso-como.webp",
    "/images/venues/hollywood/hollywood-interior-01.webp",
    "/images/venues/hollywood/hollywood-interior-02.webp",
    "/images/venues/hollywood/hollywood-interior-03.webp",
    "/images/venues/hollywood/hollywood-interior-04.webp"
  ],
  "hollywood-milano": [
    "/images/guides-editorial/hollywood-corso-como.webp",
    "/images/venues/hollywood/hollywood-interior-01.webp",
    "/images/venues/hollywood/hollywood-interior-02.webp",
    "/images/venues/hollywood/hollywood-interior-03.webp",
    "/images/venues/hollywood/hollywood-interior-04.webp"
  ],
  "the-club-milano": [
    "/images/guides-editorial/the-club-brera.webp",
    "/images/venues/the-club-milano/the-club-milano-interior-01.webp",
    "/images/venues/the-club-milano/the-club-milano-interior-02.webp",
    "/images/venues/the-club-milano/the-club-milano-interior-03.webp",
    "/images/venues/the-club-milano/the-club-milano-interior-04.webp",
    "/images/venues/the-club-milano/the-club-milano-interior-05.webp",
    "/images/venues/the-club-milano/the-club-milano-interior-06.webp",
    "/images/venues/the-club-milano/the-club-milano-interior-07.webp"
  ],
  "ceresio-7": [
    "/images/guides-editorial/ceresio-pool-dusk.webp",
    "/images/venues/ceresio-7/ceresio-7-interior-01.webp",
    "/images/venues/ceresio-7/ceresio-7-interior-02.webp",
    "/images/venues/ceresio-7/ceresio-7-interior-03.webp",
    "/images/venues/ceresio-7/ceresio-7-interior-04.webp"
  ],
  "terrazza-21": [
    "/images/guides-editorial/terrazza-duomo-skyline.webp",
    "/images/venues/terrazza-21/terrazza-21-interior-01.webp",
    "/images/venues/terrazza-21/terrazza-21-interior-02.webp",
    "/images/venues/terrazza-21/terrazza-21-interior-03.webp",
    "/images/venues/terrazza-21/terrazza-21-interior-04.webp"
  ],
  "magazzini-generali": [
    "/images/venues/magazzini-generali/magazzini-generali-interior-01.webp",
    "/images/venues/magazzini-generali/magazzini-generali-interior-02.webp",
    "/images/venues/magazzini-generali/magazzini-generali-interior-03.webp",
    "/images/venues/magazzini-generali/magazzini-generali-interior-04.webp"
  ],
  "magazzini-generali-milano": [
    "/images/venues/magazzini-generali/magazzini-generali-interior-01.webp",
    "/images/venues/magazzini-generali/magazzini-generali-interior-02.webp",
    "/images/venues/magazzini-generali/magazzini-generali-interior-03.webp",
    "/images/venues/magazzini-generali/magazzini-generali-interior-04.webp"
  ],
  "play-club-milano": [
    "/images/venues/play-club-milano/play-club-milano-interior-01.webp",
    "/images/venues/play-club-milano/play-club-milano-interior-02.webp",
    "/images/venues/play-club-milano/play-club-milano-interior-03.webp",
    "/images/venues/play-club-milano/play-club-milano-interior-04.webp",
    "/images/venues/play-club-milano/play-club-milano-interior-05.webp",
    "/images/venues/play-club-milano/play-club-milano-interior-06.webp",
    "/images/venues/play-club-milano/play-club-milano-interior-07.webp"
  ],
  "apollo-milano": [
    "/images/guides-editorial/apollo-navigli.webp",
    "/images/seo-events/master/apollo-milano-interior-01.webp",
    "/images/seo-events/master/apollo-milano-interior-02.webp",
    "/images/seo-events/master/apollo-milano-interior-03.webp",
    "/images/seo-events/master/apollo-milano-interior-04.webp"
  ],
  "carlsberg-ol": [
    "/images/seo-events/master/carlsberg-ol-01.webp",
    "/images/seo-events/master/carlsberg-ol-02.webp",
    "/images/seo-events/master/carlsberg-ol-03.webp",
    "/images/guides-editorial/carlsberg-ol-stage-candles.webp",
    "/images/seo-events/master/carlsberg-ol-04.webp"
  ]
};

const GLOBAL_EDITORIAL_FALLBACK_SRCS: string[] = [
  "/images/guides-editorial/apollo-navigli.webp",
  "/images/guides-editorial/aria-dancefloor.webp",
  "/images/guides-editorial/aria-garden.webp",
  "/images/guides-editorial/armani-prive-lounge.webp",
  "/images/guides-editorial/barchetta-como-dining.webp",
  "/images/guides-editorial/bischeri-dinner.webp",
  "/images/guides-editorial/bischeri-gala.webp",
  "/images/guides-editorial/carlsberg-ol-stage-candles.webp",
  "/images/guides-editorial/ceresio-pool-dusk.webp",
  "/images/guides-editorial/fiftyfive-loft.webp",
  "/images/guides-editorial/gate-neon.webp",
  "/images/guides-editorial/gattopardo-nave.webp",
  "/images/guides-editorial/hollywood-corso-como.webp",
  "/images/guides-editorial/just-me-dancefloor.webp",
  "/images/guides-editorial/just-me-exterior.webp",
  "/images/guides-editorial/just-me-pavilion.webp",
  "/images/guides-editorial/just-me-vip-table.webp",
  "/images/guides-editorial/palace-como-fireworks.webp",
  "/images/guides-editorial/pineta-dancefloor.webp",
  "/images/guides-editorial/pineta-lounge.webp",
  "/images/guides-editorial/pineta-vip.webp",
  "/images/guides-editorial/radio-skyline-dusk.webp",
  "/images/guides-editorial/repvblic-club.webp",
  "/images/guides-editorial/repvblic-vip-lounge.webp",
  "/images/guides-editorial/terme-alpine-snow.webp",
  "/images/guides-editorial/terme-thermal-night.webp",
  "/images/guides-editorial/terme-villa-gala.webp",
  "/images/guides-editorial/terminus-como-lake.webp",
  "/images/guides-editorial/terrazza-duomo-skyline.webp",
  "/images/guides-editorial/the-club-brera.webp",
  "/images/guides-editorial/tom-milano-dinner.webp",
  "/images/guides-editorial/voya-rooftop-20f.webp",
  "/images/venues/editorial/01-milano-nightclubs-rooftops.webp",
  "/images/venues/editorial/02-milano-vip-tables-bottle-service.webp",
  "/images/venues/editorial/03-milano-dress-code-door-policy.webp",
  "/images/venues/editorial/04-milano-nightlife-districts-map.webp",
  "/images/venues/editorial/05-milano-hinterland-monza-lombardia.webp",
  "/images/venues/editorial/amnesia-milano.webp",
  "/images/venues/editorial/innocenti-evasioni-terrazza-triennale.webp",
  "/images/venues/editorial/radio-rooftop-bar-milano.webp",
  "/images/venues/editorial/ristorante-torre-milano.webp",
  "/images/venues/editorial/super-club-milano.webp",
  "/images/venues/editorial/terrazza-aperol-milano.webp",
  "/images/venues/editorial/terrazza-gallia-milano.webp",
  "/images/venues/editorial/the-roof-milano.webp",
  "/images/events-gallery/just-me-saturday/just-me-milano-torre-branca-saturday-night.webp",
  "/images/events-gallery/just-me-saturday/just-me-milano-aperitivo-buffet-saturday.webp",
  "/images/events-gallery/just-me-saturday/just-me-milano-dancefloor-saturday-night.webp",
  "/images/events-gallery/just-me-saturday/just-me-milano-lounge-saturday-night.webp",
  "/images/venues/just-me-milano/just-me-milano-aperitivo-01.webp",
  "/images/venues/just-me-milano/just-me-milano-buffet-01.webp",
  "/images/venues/just-me-milano/just-me-milano-cena-01.webp",
  "/images/venues/just-me-milano/just-me-milano-interior-01.webp",
  "/images/venues/just-me-milano/just-me-milano-interior-04.webp",
  "/images/venues/just-me-milano/just-me-milano-lounge-01.webp",
  "/images/events/curated/aperitivi-milano-pineta-scene-v2.webp",
  "/images/venues/pineta-milano/pineta-milano-aperitivo-01.webp",
  "/images/venues/pineta-milano/pineta-milano-cena-01.webp",
  "/images/venues/pineta-milano/pineta-milano-interior-03.webp",
  "/images/venues/pineta-milano/pineta-milano-party-01.webp",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-01.webp",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-02.webp",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-03.webp",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-04.webp",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-05.webp",
  "/images/venues/voya-rooftop-milan/voya-rooftop-milan-interior-06.webp",
  "/images/seo-events/master/voya-rooftop-milan-lounge-01.webp",
  "/images/venues/repvblic-milano/repvblic-milano-interior-01.webp",
  "/images/venues/repvblic-milano/repvblic-milano-interior-02.webp",
  "/images/venues/repvblic-milano/repvblic-milano-interior-03.webp",
  "/images/venues/repvblic-milano/repvblic-milano-interior-06.webp",
  "/images/venues/aria-club-milano/aria-club-milano-bar-01.webp",
  "/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp",
  "/images/venues/aria-club-milano/aria-club-milano-buffet-02.webp",
  "/images/venues/aria-club-milano/aria-club-milano-garden-01.webp",
  "/images/venues/aria-club-milano/aria-club-milano-interior-02.webp",
  "/images/venues/55-milano/55-milano-friday-dinner-show-01.webp",
  "/images/venues/55-milano/55-milano-interior-01.webp",
  "/images/venues/55-milano/55-milano-interior-02.webp",
  "/images/venues/55-milano/55-milano-interior-03.webp",
  "/images/venues/55-milano/55-milano-interior-05.webp",
  "/images/venues/55-milano/55-milano-saturday-the-wall-01.webp",
  "/images/seo-events/master/fiftyfive-milano-interior-01.webp",
  "/images/seo-events/master/fiftyfive-milano-interior-07.webp",
  "/images/seo-events/master/fiftyfive-milano-lounge-01.webp",
  "/images/seo-events/master/fiftyfive-milano-terrazza-01.webp",
  "/images/venues/dazi-milano/dazi-milano-interior-01.webp",
  "/images/venues/dazi-milano/dazi-milano-interior-02.webp",
  "/images/venues/dazi-milano/dazi-milano-interior-03.webp",
  "/images/venues/dazi-milano/dazi-milano-interior-04.webp",
  "/images/venues/dazi-milano/dazi-milano-interior-05.webp",
  "/images/venues/dazi-milano/dazi-milano-interior-06.webp",
  "/images/venues/11-clubroom/11-clubroom-interior-01.webp",
  "/images/venues/11-clubroom/11-clubroom-interior-02.webp",
  "/images/venues/11-clubroom/11-clubroom-interior-03.webp",
  "/images/venues/11-clubroom/11-clubroom-interior-04.webp",
  "/images/venues/11-clubroom/11-clubroom-interior-05.webp",
  "/images/venues/11-clubroom/11-clubroom-interior-06.webp",
  "/images/venues/11-clubroom/11-clubroom-interior-07.webp",
  "/images/venues/church-81/church-81-interior-01.webp",
  "/images/venues/church-81/church-81-interior-02.webp",
  "/images/venues/church-81/church-81-interior-03.webp",
  "/images/venues/church-81/church-81-interior-04.webp",
  "/images/venues/gattopardo/gattopardo-interior-01.webp",
  "/images/venues/gattopardo/gattopardo-interior-02.webp",
  "/images/venues/gattopardo/gattopardo-interior-03.webp",
  "/images/venues/gattopardo/gattopardo-interior-04.webp",
  "/images/venues/mib-milano/mib-milano-interior-01.webp",
  "/images/venues/mib-milano/mib-milano-interior-02.webp",
  "/images/venues/mib-milano/mib-milano-interior-03.webp",
  "/images/venues/mib-milano/mib-milano-interior-04.webp",
  "/images/venues/mib-milano/mib-milano-interior-05.webp",
  "/images/venues/mib-milano/mib-milano-interior-06.webp",
  "/images/venues/mib-milano/mib-milano-interior-07.webp",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-01.webp",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-02.webp",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-03.webp",
  "/images/venues/armani-prive-milano/armani-prive-milano-interior-04.webp",
  "/images/venues/hollywood/hollywood-interior-01.webp",
  "/images/venues/hollywood/hollywood-interior-02.webp",
  "/images/venues/hollywood/hollywood-interior-03.webp",
  "/images/venues/hollywood/hollywood-interior-04.webp",
  "/images/venues/the-club-milano/the-club-milano-interior-01.webp",
  "/images/venues/the-club-milano/the-club-milano-interior-02.webp",
  "/images/venues/the-club-milano/the-club-milano-interior-03.webp",
  "/images/venues/the-club-milano/the-club-milano-interior-04.webp",
  "/images/venues/the-club-milano/the-club-milano-interior-05.webp",
  "/images/venues/the-club-milano/the-club-milano-interior-06.webp",
  "/images/venues/the-club-milano/the-club-milano-interior-07.webp",
  "/images/venues/ceresio-7/ceresio-7-interior-01.webp",
  "/images/venues/ceresio-7/ceresio-7-interior-02.webp",
  "/images/venues/ceresio-7/ceresio-7-interior-03.webp",
  "/images/venues/ceresio-7/ceresio-7-interior-04.webp",
  "/images/venues/terrazza-21/terrazza-21-interior-01.webp",
  "/images/venues/terrazza-21/terrazza-21-interior-02.webp",
  "/images/venues/terrazza-21/terrazza-21-interior-03.webp",
  "/images/venues/terrazza-21/terrazza-21-interior-04.webp",
  "/images/venues/magazzini-generali/magazzini-generali-interior-01.webp",
  "/images/venues/magazzini-generali/magazzini-generali-interior-02.webp",
  "/images/venues/magazzini-generali/magazzini-generali-interior-03.webp",
  "/images/venues/magazzini-generali/magazzini-generali-interior-04.webp",
  "/images/venues/play-club-milano/play-club-milano-interior-01.webp",
  "/images/venues/play-club-milano/play-club-milano-interior-02.webp",
  "/images/venues/play-club-milano/play-club-milano-interior-03.webp",
  "/images/venues/play-club-milano/play-club-milano-interior-04.webp",
  "/images/venues/play-club-milano/play-club-milano-interior-05.webp",
  "/images/venues/play-club-milano/play-club-milano-interior-06.webp",
  "/images/venues/play-club-milano/play-club-milano-interior-07.webp",
  "/images/seo-events/master/apollo-milano-interior-01.webp",
  "/images/seo-events/master/apollo-milano-interior-02.webp",
  "/images/seo-events/master/apollo-milano-interior-03.webp",
  "/images/seo-events/master/apollo-milano-interior-04.webp",
  "/images/seo-events/master/carlsberg-ol-01.webp",
  "/images/seo-events/master/carlsberg-ol-02.webp",
  "/images/seo-events/master/carlsberg-ol-03.webp",
  "/images/seo-events/master/carlsberg-ol-04.webp",
  "/images/seo-events/master/tocqueville-13.webp",
  "/images/seo-events/master/fabrique-milano.webp",
  "/images/seo-events/master/alcatraz-milano.webp",
  "/images/seo-events/master/base-milano.webp",
  "/images/seo-events/master/blue-note-milano.webp",
  "/images/seo-events/master/spirit-de-milan.webp",
  "/images/seo-events/master/the-dome-milano.webp"
];

const NIBBLE_POPCOUNT = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];

function hammingHex64(a: string, b: string): number {
  if (a.length !== 16 || b.length !== 16) return 64;
  let dist = 0;
  for (let i = 0; i < 16; i++) {
    const na = Number.parseInt(a[i], 16);
    const nb = Number.parseInt(b[i], 16);
    dist += NIBBLE_POPCOUNT[(na ^ nb) & 0xf];
  }
  return dist;
}

class PerceptualPageTracker {
  private usedSrcs = new Set<string>();
  private usedHashes: string[] = [];

  canUse(src: string): boolean {
    if (!src || this.usedSrcs.has(src)) return false;
    const dh = IMAGE_DHASH_64[src];
    if (dh) {
      for (const prev of this.usedHashes) {
        if (hammingHex64(dh, prev) < 7) return false;
      }
    }
    return true;
  }

  mark(src: string): void {
    if (!src) return;
    this.usedSrcs.add(src);
    const dh = IMAGE_DHASH_64[src];
    if (dh) this.usedHashes.push(dh);
  }

  takeFirst(candidates: string[]): string | null {
    for (const c of candidates) {
      if (this.canUse(c)) {
        this.mark(c);
        return c;
      }
    }
    return null;
  }
}

function plate(src: string, caption: string, district: string): EditorialPlate {
  return { src, caption, district };
}

const CAPTION_BY_SRC: Record<string, { caption: string; district: string }> = {
  '/images/guides-editorial/just-me-pavilion.webp': { caption: 'Just Me Milano · Cupola Italo Rota', district: 'Parco Sempione · Torre Branca' },
  '/images/guides-editorial/just-me-dancefloor.webp': { caption: 'Just Me Milano · Main Dancefloor', district: 'Viale Luigi Camoens 2' },
  '/images/guides-editorial/just-me-vip-table.webp': { caption: 'Just Me Milano · Tavoli VIP Privé', district: '100% Minimum Spend' },
  '/images/guides-editorial/just-me-exterior.webp': { caption: 'Just Me Milano · Ingresso Torre Branca', district: 'Parco Sempione' },
  '/images/events-gallery/just-me-saturday/just-me-milano-torre-branca-saturday-night.webp': { caption: 'Just Me Milano · Notte sotto la Torre Branca', district: 'Parco Sempione' },
  '/images/guides-editorial/pineta-lounge.webp': { caption: 'Pineta Milano · Luxury Crystal Hall', district: 'Via Messina 38 · Garibaldi' },
  '/images/guides-editorial/pineta-dancefloor.webp': { caption: 'Pineta Milano · Main Room & Urban Room', district: 'M5 Cenisio / Porta Garibaldi' },
  '/images/guides-editorial/pineta-vip.webp': { caption: 'Pineta Milano · Champagne & VIP Privé', district: 'Via Messina 38' },
  '/images/events/curated/aperitivi-milano-pineta-scene-v2.webp': { caption: 'Pineta Milano · Royal Buffet & Lounge', district: 'Via Messina 38' },
  '/images/guides-editorial/voya-rooftop-20f.webp': { caption: 'Voya Rooftop · 20° Piano Skyline (85m)', district: 'Viale Achille Papa 30 · Portello' },
  '/images/seo-events/master/voya-rooftop-milan-skyline-01.webp': { caption: 'Voya Rooftop · Terrazza Panoramica 360°', district: 'CityLife / Portello' },
  '/images/seo-events/master/voya-rooftop-milan-lounge-01.webp': { caption: 'Voya Rooftop · Sky Lounge Vetrate 20° Piano', district: '85 Metri d’Altezza' },
  '/images/guides-editorial/repvblic-club.webp': { caption: 'REPVBLIC Milano · Main Dancefloor', district: 'Piazza della Repubblica 12' },
  '/images/guides-editorial/repvblic-vip-lounge.webp': { caption: 'REPVBLIC Milano · Salotto VIP & Bottle Service', district: 'M3 Repubblica · Porta Nuova' },
  '/images/seo-events/master/carlsberg-ol-01.webp': { caption: 'Carlsberg Øl Milano · Volte Storiche in Mattoni', district: 'Bastioni di Porta Nuova 9' },
  '/images/seo-events/master/carlsberg-ol-02.webp': { caption: 'Carlsberg Øl Milano · Sala Cenone Conviviale', district: 'Porta Nuova / Corso Como' },
  '/images/seo-events/master/carlsberg-ol-03.webp': { caption: 'Carlsberg Øl Milano · Tavola a Lume di Candela', district: 'Bastioni di Porta Nuova 9' },
  '/images/guides-editorial/carlsberg-ol-stage-candles.webp': { caption: 'Carlsberg Øl Milano · Calici & Cena Cantata', district: 'Bastioni di Porta Nuova 9' },
  '/images/seo-events/master/carlsberg-ol-04.webp': { caption: 'Carlsberg Øl Milano · Corte Storica Porta Nuova', district: 'M2 Moscova / Garibaldi' },
  '/images/guides-editorial/gattopardo-nave.webp': { caption: 'Il Gattopardo Milano · Navata Monumentale 1901', district: 'Via Piero della Francesca 47' },
  '/images/guides-editorial/aria-garden.webp': { caption: 'Aria Club Milano · Arena Parco San Siro', district: 'Piazzale dello Sport 14' },
  '/images/guides-editorial/aria-dancefloor.webp': { caption: 'Aria Club Milano · Main Stage & Consolle', district: 'San Siro' },
  '/images/guides-editorial/fiftyfive-loft.webp': { caption: '55 Milano · Loft Industriale 1.000 mq', district: 'Via Piero della Francesca 55' },
  '/images/guides-editorial/bischeri-gala.webp': { caption: 'Gala Dinner Show & Cena Cantata', district: 'Milano Partner Network' },
  '/images/guides-editorial/bischeri-dinner.webp': { caption: 'Confronto Dinner Show & Tavolo Riservato', district: 'Milano Partner Network' },
  '/images/guides-editorial/tom-milano-dinner.webp': { caption: 'TOM. The Ordinary Market · Bistro & DJ Set', district: 'Darsena / Ticinese' },
  '/images/guides-editorial/gate-neon.webp': { caption: 'Gate Milano · Reggaeton, Urban & Clubbing', district: 'Isola / Scalo Farini' },
  '/images/guides-editorial/apollo-navigli.webp': { caption: 'Apollo Club Milano · Groove & Live Club', district: 'Navigli' },
  '/images/guides-editorial/hollywood-corso-como.webp': { caption: 'Hollywood Milano · Corso Como 15', district: 'Porta Garibaldi' },
  '/images/guides-editorial/the-club-brera.webp': { caption: 'The Club Milano · Corso Garibaldi 97', district: 'Brera / Moscova' },
  '/images/guides-editorial/armani-prive-lounge.webp': { caption: 'Armani/Privé · Boutique Club Quadrilatero', district: 'Via Gastone Pisoni 1' },
  '/images/guides-editorial/ceresio-pool-dusk.webp': { caption: 'Ceresio 7 · Rooftop & Piscine Panoramica', district: 'Porta Volta / Isola' },
  '/images/guides-editorial/terrazza-duomo-skyline.webp': { caption: 'Terrazza Duomo 21 · Vista Guglie', district: 'Piazza del Duomo' },
  '/images/guides-editorial/radio-skyline-dusk.webp': { caption: 'Radio Rooftop · Skyline Porta Nuova', district: 'Via Marco Polo 18' },
  '/images/guides-editorial/terme-thermal-night.webp': { caption: 'Terme di Sirmione Aquaria · Vasche Termali', district: 'Lago di Garda' },
  '/images/guides-editorial/terme-alpine-snow.webp': { caption: 'QC Terme Bormio · Acque Calde tra le Alpi', district: 'Alta Valtellina' },
  '/images/guides-editorial/terme-villa-gala.webp': { caption: 'QC Terme & Dimore Storiche Lombarde', district: 'Milano / San Pellegrino' },
  '/images/guides-editorial/terminus-como-lake.webp': { caption: 'Albergo Terminus · Veranda sul Lago di Como', district: 'Lungo Lario Trieste' },
  '/images/guides-editorial/barchetta-como-dining.webp': { caption: 'Hotel Barchetta Excelsior · Cenone Vista Lago', district: 'Piazza Cavour 1, Como' },
  '/images/guides-editorial/palace-como-fireworks.webp': { caption: 'Capodanno sul Lago · Fuochi & Gran Galà', district: 'Como & Garda' },
  '/images/venues/editorial/03-milano-dress-code-door-policy.webp': { caption: 'Dress Code & Selezione Ingresso Milano', district: 'Guida Concierge' },
};

function describeSrc(src: string, fallbackTitle: string): EditorialPlate {
  const known = CAPTION_BY_SRC[src];
  if (known) return plate(src, known.caption, known.district);
  if (src.includes('just-me')) return plate(src, 'Just Me Milano · Sala & Privé', 'Parco Sempione · Torre Branca');
  if (src.includes('pineta')) return plate(src, 'Pineta Milano · Interni & Privé', 'Via Messina 38 · Garibaldi');
  if (src.includes('voya-rooftop')) return plate(src, 'Voya Rooftop · Sala Panoramica 20° Piano', 'Viale Achille Papa 30 · Portello');
  if (src.includes('repvblic')) return plate(src, 'REPVBLIC Milano · Interni & Privé', 'Piazza della Repubblica 12');
  if (src.includes('aria-club')) return plate(src, 'Aria Club Milano · Interni & Garden', 'Piazzale dello Sport 14');
  if (src.includes('55-milano') || src.includes('fiftyfive')) return plate(src, '55 Milano · Loft & Dinner Show', 'Via Piero della Francesca 55');
  if (src.includes('dazi-milano')) return plate(src, 'Dazi Milano · Arco della Pace', 'Piazza Sempione 1');
  if (src.includes('11-clubroom')) return plate(src, '11 Clubroom · Boutique Lounge', 'Via Alessio di Tocqueville 11');
  if (src.includes('church-81')) return plate(src, 'Church 81 · Location Monumentale', 'Milano');
  if (src.includes('gattopardo')) return plate(src, 'Il Gattopardo · Interni Monumentali', 'Via Piero della Francesca 47');
  if (src.includes('mib-milano')) return plate(src, 'MIB Milano · Piazza Affari', 'Centro Storico');
  if (src.includes('armani-prive')) return plate(src, 'Armani/Privé · Interni Quadrilatero', 'Via Gastone Pisoni 1');
  if (src.includes('hollywood')) return plate(src, 'Hollywood Milano · Dancefloor & Privé', 'Corso Como 15');
  if (src.includes('the-club')) return plate(src, 'The Club Milano · Interni & Privé', 'Corso Garibaldi 97');
  if (src.includes('ceresio-7')) return plate(src, 'Ceresio 7 · Interni & Terrazza', 'Via Ceresio 7');
  if (src.includes('terrazza-21')) return plate(src, 'Terrazza Duomo 21 · Lounge Vista Duomo', 'Piazza del Duomo 21');
  if (src.includes('magazzini-generali')) return plate(src, 'Magazzini Generali · Main Hall', 'Via Pietrasanta 16');
  return plate(src, fallbackTitle, 'Nightlife Milan · Partner Network');
}

const ROOFTOP_IDS = new Set([
  'g-rooftops-milan', 'g-8', 'g-18', 'g-32', 'g-33', 'g-39', 'g-50', 'g-51', 'g-73', 'g-76', 'g-81', 'g-87', 'g-93',
]);
const TERME_IDS = new Set(['g-117', 'g-120', 'g-122', 'g-90']);
const DINNER_IDS = new Set([
  'g-secret-bars', 'g-2', 'g-private-parties', 'g-9', 'g-19', 'g-30', 'g-31', 'g-36', 'g-37', 'g-38', 'g-53', 'g-60', 'g-78', 'g-85', 'g-88', 'g-102', 'g-121', 'g-123', 'g-125',
]);
const ELECTRONIC_IDS = new Set([
  'g-techno-2026', 'g-5', 'g-23', 'g-24', 'g-25', 'g-26', 'g-34', 'g-35', 'g-70', 'g-77', 'g-79', 'g-80', 'g-89', 'g-124',
]);

interface SingleVenueGuideSpec {
  candidates: string[];
  allowFaqPlate: boolean;
}

const SINGLE_VENUE_SPECS: Record<string, SingleVenueGuideSpec> = {
  'g-15': {
    candidates: VENUE_PHOTO_CANDIDATES['just-me-milano'],
    allowFaqPlate: true,
  },
  'g-16': {
    candidates: VENUE_PHOTO_CANDIDATES['pineta-club-milano'],
    allowFaqPlate: false,
  },
  'g-17': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['aria-club-milano'],
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
      '/images/guides-editorial/just-me-vip-table.webp',
      '/images/guides-editorial/gate-neon.webp',
    ],
    allowFaqPlate: false,
  },
  'g-18': {
    candidates: VENUE_PHOTO_CANDIDATES['voya-rooftop-milan'],
    allowFaqPlate: false,
  },
  'g-19': {
    candidates: VENUE_PHOTO_CANDIDATES['55-milano'],
    allowFaqPlate: true,
  },
  'g-20': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['repvblic-milano'],
      '/images/guides-editorial/the-club-brera.webp',
      '/images/guides-editorial/hollywood-corso-como.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
      '/images/guides-editorial/gate-neon.webp',
    ],
    allowFaqPlate: false,
  },
  'g-22': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['armani-prive-milano'],
      '/images/guides-editorial/ceresio-pool-dusk.webp',
      '/images/guides-editorial/terrazza-duomo-skyline.webp',
      '/images/guides-editorial/voya-rooftop-20f.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-27': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['hollywood-club-milano'],
      '/images/guides-editorial/the-club-brera.webp',
      '/images/seo-events/master/tocqueville-13.webp',
      '/images/seo-events/master/11-clubroom-interior-01.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-28': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['the-club-milano'],
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-29': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['11-clubroom'],
      '/images/seo-events/master/tocqueville-13.webp',
      '/images/guides-editorial/hollywood-corso-como.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-30': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['gattopardo-milano'],
      '/images/guides-editorial/fiftyfive-loft.webp',
      '/images/guides-editorial/bischeri-gala.webp',
      '/images/guides-editorial/pineta-vip.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-32': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['terrazza-21'],
      '/images/guides-editorial/radio-skyline-dusk.webp',
      '/images/guides-editorial/ceresio-pool-dusk.webp',
      '/images/guides-editorial/voya-rooftop-20f.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-33': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['ceresio-7'],
      '/images/guides-editorial/voya-rooftop-20f.webp',
      '/images/guides-editorial/radio-skyline-dusk.webp',
      '/images/guides-editorial/terrazza-duomo-skyline.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-34': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['apollo-milano'],
      '/images/guides-editorial/gate-neon.webp',
      '/images/guides-editorial/aria-dancefloor.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-35': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['magazzini-generali'],
      '/images/guides-editorial/gate-neon.webp',
      '/images/guides-editorial/aria-dancefloor.webp',
      '/images/seo-events/master/fabrique-milano.webp',
      '/images/seo-events/master/amnesia-milano.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-36': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['church-81'],
      '/images/guides-editorial/gattopardo-nave.webp',
      '/images/guides-editorial/bischeri-dinner.webp',
      '/images/guides-editorial/bischeri-gala.webp',
      '/images/guides-editorial/tom-milano-dinner.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
  'g-125': {
    candidates: [
      ...VENUE_PHOTO_CANDIDATES['carlsberg-ol'],
      '/images/guides-editorial/bischeri-dinner.webp',
      '/images/guides-editorial/gattopardo-nave.webp',
      '/images/guides-editorial/gate-neon.webp',
      '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
    ],
    allowFaqPlate: false,
  },
};

const THEME_CANDIDATES = {
  terme: [
    '/images/guides-editorial/terme-thermal-night.webp',
    '/images/guides-editorial/terminus-como-lake.webp',
    '/images/guides-editorial/terme-alpine-snow.webp',
    '/images/guides-editorial/palace-como-fireworks.webp',
    '/images/guides-editorial/barchetta-como-dining.webp',
    '/images/guides-editorial/terme-villa-gala.webp',
    '/images/guides-editorial/voya-rooftop-20f.webp',
    '/images/guides-editorial/ceresio-pool-dusk.webp',
    '/images/guides-editorial/just-me-vip-table.webp',
    '/images/guides-editorial/pineta-lounge.webp',
    '/images/guides-editorial/gattopardo-nave.webp',
  ],
  rooftop: [
    '/images/guides-editorial/ceresio-pool-dusk.webp',
    '/images/guides-editorial/voya-rooftop-20f.webp',
    '/images/guides-editorial/terrazza-duomo-skyline.webp',
    '/images/guides-editorial/radio-skyline-dusk.webp',
    '/images/seo-events/master/voya-rooftop-milan-skyline-01.webp',
    '/images/seo-events/master/voya-rooftop-milan-lounge-01.webp',
    '/images/guides-editorial/bischeri-dinner.webp',
    '/images/guides-editorial/armani-prive-lounge.webp',
    '/images/seo-events/master/terrazza-gallia-milano.webp',
    '/images/seo-events/master/the-roof-milano.webp',
    '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
  ],
  dinner: [
    '/images/guides-editorial/bischeri-gala.webp',
    '/images/guides-editorial/fiftyfive-loft.webp',
    '/images/guides-editorial/gattopardo-nave.webp',
    '/images/guides-editorial/tom-milano-dinner.webp',
    '/images/guides-editorial/bischeri-dinner.webp',
    '/images/guides-editorial/pineta-vip.webp',
    '/images/guides-editorial/just-me-vip-table.webp',
    '/images/guides-editorial/voya-rooftop-20f.webp',
    '/images/seo-events/master/carlsberg-ol-01.webp',
    '/images/guides-editorial/apollo-navigli.webp',
    '/images/venues/editorial/03-milano-dress-code-door-policy.webp',
  ],
  electronic: [
    '/images/guides-editorial/gate-neon.webp',
    '/images/guides-editorial/aria-dancefloor.webp',
    '/images/guides-editorial/apollo-navigli.webp',
    '/images/guides-editorial/repvblic-club.webp',
    '/images/guides-editorial/just-me-dancefloor.webp',
    '/images/guides-editorial/pineta-dancefloor.webp',
    '/images/guides-editorial/hollywood-corso-como.webp',
    '/images/guides-editorial/the-club-brera.webp',
    '/images/seo-events/master/fabrique-milano.webp',
    '/images/seo-events/master/amnesia-milano.webp',
    '/images/seo-events/master/alcatraz-milano.webp',
  ],
  clubbing: [
    '/images/guides-editorial/just-me-pavilion.webp',
    '/images/guides-editorial/gattopardo-nave.webp',
    '/images/guides-editorial/voya-rooftop-20f.webp',
    '/images/guides-editorial/aria-garden.webp',
    '/images/guides-editorial/pineta-lounge.webp',
    '/images/guides-editorial/just-me-vip-table.webp',
    '/images/guides-editorial/bischeri-gala.webp',
    '/images/guides-editorial/gate-neon.webp',
    '/images/guides-editorial/repvblic-club.webp',
    '/images/guides-editorial/fiftyfive-loft.webp',
    '/images/guides-editorial/the-club-brera.webp',
    '/images/guides-editorial/hollywood-corso-como.webp',
  ],
};

function extractInlineImgsFromGuide(guide: Guide, locale: LocaleCode): string[] {
  const out: string[] = [];
  for (const sec of guide.sections || []) {
    const html = getLocalizedText(sec.content, locale);
    const reImg = /<img\b[^>]*\bsrc="([^"]+)"/gi;
    let m: RegExpExecArray | null;
    while ((m = reImg.exec(html)) !== null) {
      out.push(m[1]);
    }
  }
  return out;
}

export function getGuideEditorialBundle(
  guide: Guide,
  locale: LocaleCode,
  localizedTitle: string,
  heroImg: string,
): GuideEditorialBundle {
  const shortLabel = getEditorialDisplayHeadline(guide.id, locale, localizedTitle);
  const tracker = new PerceptualPageTracker();
  tracker.mark(heroImg);
  for (const inl of extractInlineImgsFromGuide(guide, locale)) {
    tracker.mark(inl);
  }

  const singleSpec = SINGLE_VENUE_SPECS[guide.id];
  const guideInlines = GUIDE_INLINE_IMAGES_114[guide.id] || [];
  let orderedCandidates: string[];
  let allowFaq = true;

  if (singleSpec) {
    orderedCandidates = [...singleSpec.candidates, ...guideInlines, ...GLOBAL_EDITORIAL_FALLBACK_SRCS];
    allowFaq = singleSpec.allowFaqPlate;
  } else if (TERME_IDS.has(guide.id)) {
    orderedCandidates = [...guideInlines, ...THEME_CANDIDATES.terme, ...GLOBAL_EDITORIAL_FALLBACK_SRCS];
  } else if (ROOFTOP_IDS.has(guide.id)) {
    orderedCandidates = [...guideInlines, ...THEME_CANDIDATES.rooftop, ...GLOBAL_EDITORIAL_FALLBACK_SRCS];
  } else if (DINNER_IDS.has(guide.id)) {
    orderedCandidates = [...guideInlines, ...THEME_CANDIDATES.dinner, ...GLOBAL_EDITORIAL_FALLBACK_SRCS];
  } else if (ELECTRONIC_IDS.has(guide.id)) {
    orderedCandidates = [...guideInlines, ...THEME_CANDIDATES.electronic, ...GLOBAL_EDITORIAL_FALLBACK_SRCS];
  } else {
    orderedCandidates = [...guideInlines, ...THEME_CANDIDATES.clubbing, ...GLOBAL_EDITORIAL_FALLBACK_SRCS];
  }

  const stripPlates: EditorialPlate[] = [];
  for (let i = 0; i < 4; i++) {
    const picked = tracker.takeFirst(orderedCandidates);
    if (picked) stripPlates.push(describeSrc(picked, shortLabel));
  }

  const chapterPlates: EditorialPlate[] = [];
  for (let i = 0; i < 4; i++) {
    const picked = tracker.takeFirst(orderedCandidates);
    if (picked) chapterPlates.push(describeSrc(picked, shortLabel));
  }

  let faqPlate: EditorialPlate | null = null;
  if (allowFaq) {
    const pickedFaq = tracker.takeFirst(orderedCandidates);
    if (pickedFaq) faqPlate = describeSrc(pickedFaq, shortLabel);
  }

  const heroLead = describeSrc(heroImg, shortLabel);
  return {
    heroSlides: [
      {
        src: heroImg,
        caption: shortLabel,
        district: TERME_IDS.has(guide.id) ? 'Lombardia & Lago di Como' : heroLead.district,
      },
    ],
    stripPlates,
    chapterPlates,
    faqPlate,
  };
}

const EXPLORER_ITEM_VENUE_POOL_MAP: Record<string, string[]> = {
  sirmione: [
    '/images/guides-editorial/terme-thermal-night.webp',
    '/images/guides-editorial/terme-villa-gala.webp',
    '/images/guides-editorial/terminus-como-lake.webp',
    '/images/guides-editorial/barchetta-como-dining.webp',
    '/images/guides-editorial/terme-alpine-snow.webp',
  ],
  'just-me': VENUE_PHOTO_CANDIDATES['just-me-milano'],
  'justme-milano': VENUE_PHOTO_CANDIDATES['just-me-milano'],
  pineta: VENUE_PHOTO_CANDIDATES['pineta-club-milano'],
  'pineta-milano': VENUE_PHOTO_CANDIDATES['pineta-club-milano'],
  voya: VENUE_PHOTO_CANDIDATES['voya-rooftop-milan'],
  'voya-milano': VENUE_PHOTO_CANDIDATES['voya-rooftop-milan'],
  repvblic: VENUE_PHOTO_CANDIDATES['repvblic-milano'],
  aria: VENUE_PHOTO_CANDIDATES['aria-club-milano'],
  '55-milano': VENUE_PHOTO_CANDIDATES['55-milano'],
  gattopardo: VENUE_PHOTO_CANDIDATES['gattopardo-milano'],
  'the-club': VENUE_PHOTO_CANDIDATES['the-club-milano'],
  hollywood: VENUE_PHOTO_CANDIDATES['hollywood-club-milano'],
  '11clubroom': VENUE_PHOTO_CANDIDATES['11-clubroom'],
};

export function resolveDistinctGuidePageMedia(
  guide: Guide,
  venuesPool: Venue[],
  otherGuides: Guide[],
  bundle: GuideEditorialBundle,
  explorerData?: TasteExplorerData | null,
): ResolvedGuidePageMedia {
  const tracker = new PerceptualPageTracker();

  for (const p of bundle.heroSlides) tracker.mark(p.src);
  for (const p of bundle.stripPlates) tracker.mark(p.src);

  (guide.sections || []).forEach((_, idx) => {
    const isLight = idx % 2 === 0;
    const isLastDark = !isLight && idx === guide.sections.length - 1 && idx >= 3;
    if (idx >= 1 && !isLastDark && bundle.chapterPlates[idx - 1]) {
      tracker.mark(bundle.chapterPlates[idx - 1].src);
    }
  });

  if (guide.faqs && guide.faqs.length > 0 && bundle.faqPlate) {
    tracker.mark(bundle.faqPlate.src);
  }
  for (const inl of extractInlineImgsFromGuide(guide, 'it')) {
    tracker.mark(inl);
  }

  let adjustedExplorer: TasteExplorerData | null = explorerData ?? null;
  const partnerCards: Array<{ venue: Venue; coverSrc: string }> = [];

  if (adjustedExplorer && adjustedExplorer.items.length > 0) {
    const clonedItems = adjustedExplorer.items.map((it, idx) => {
      if (idx === 0) {
        if (tracker.canUse(it.image)) {
          tracker.mark(it.image);
          return it;
        }
        const altPool = [
          ...(EXPLORER_ITEM_VENUE_POOL_MAP[it.id] || []),
          ...GLOBAL_EDITORIAL_FALLBACK_SRCS,
        ];
        const alt = tracker.takeFirst(altPool);
        return alt ? { ...it, image: alt } : it;
      }
      return it;
    });
    adjustedExplorer = { ...adjustedExplorer, items: clonedItems };
  } else {
    for (const venue of venuesPool) {
      if (partnerCards.length >= 6) break;
      const slugEn = venue.slugs.en;
      const vPool = VENUE_PHOTO_CANDIDATES[slugEn];
      if (vPool && vPool.length > 0) {
        const picked = tracker.takeFirst(vPool);
        if (picked) {
          partnerCards.push({ venue, coverSrc: picked });
        }
        // If all authentic photos of this venue were already shown above (e.g. g-20 REPVBLIC),
        // skip self-card so we never show another venue's photo under this venue's name!
      } else {
        const fallback = tracker.takeFirst(GLOBAL_EDITORIAL_FALLBACK_SRCS);
        if (fallback) {
          partnerCards.push({ venue, coverSrc: fallback });
        }
      }
    }
  }

  const relatedGuideCards: Array<{ guide: Guide; coverSrc: string }> = [];
  for (const rg of otherGuides) {
    const rgPool = [
      GUIDE_HERO_IMAGES_114[rg.id] || rg.image || '',
      ...(GUIDE_INLINE_IMAGES_114[rg.id] || []),
      getGuideCardCover(rg.id),
      ...GLOBAL_EDITORIAL_FALLBACK_SRCS,
    ].filter(Boolean);
    const picked = tracker.takeFirst(rgPool) || GLOBAL_EDITORIAL_FALLBACK_SRCS[0];
    relatedGuideCards.push({ guide: rg, coverSrc: picked });
  }

  return {
    partnerCards,
    relatedGuideCards,
    explorerData: adjustedExplorer,
  };
}

const CARD_COVER_POOL = [
  '/images/guides-editorial/just-me-pavilion.webp',
  '/images/guides-editorial/ceresio-pool-dusk.webp',
  '/images/guides-editorial/gattopardo-nave.webp',
  '/images/guides-editorial/pineta-lounge.webp',
  '/images/guides-editorial/voya-rooftop-20f.webp',
  '/images/guides-editorial/aria-garden.webp',
  '/images/guides-editorial/terme-thermal-night.webp',
  '/images/guides-editorial/bischeri-gala.webp',
  '/images/guides-editorial/gate-neon.webp',
  '/images/guides-editorial/terrazza-duomo-skyline.webp',
  '/images/guides-editorial/armani-prive-lounge.webp',
  '/images/guides-editorial/fiftyfive-loft.webp',
];

export function getGuideCardCover(guideId: string): string {
  if (TERME_IDS.has(guideId)) return '/images/guides-editorial/terme-thermal-night.webp';
  if (ROOFTOP_IDS.has(guideId)) return '/images/guides-editorial/ceresio-pool-dusk.webp';
  if (DINNER_IDS.has(guideId)) return '/images/guides-editorial/bischeri-gala.webp';
  if (ELECTRONIC_IDS.has(guideId)) return '/images/guides-editorial/gate-neon.webp';
  const num = Number.parseInt(guideId.replace(/[^0-9]/g, ''), 10);
  const idx = Number.isFinite(num) ? Math.abs(num) % CARD_COVER_POOL.length : 0;
  return CARD_COVER_POOL[idx];
}
