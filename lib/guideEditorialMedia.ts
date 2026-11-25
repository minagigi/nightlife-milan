import type { Guide } from './types';
import type { LocaleCode } from './i18n/locales';
import { getPillarDisplayHeadline } from './guidesGscPillar20261120';
import { getGsc20261122DisplayHeadline } from './guidesGscBatch20261122';
import { getGsc20261123DisplayHeadline } from './guidesGscBatch20261123';
import { getGsc20261124DisplayHeadline } from './guidesGscBatch20261124';
import { getGsc20261125DisplayHeadline } from './guidesGscBatch20261125';
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

const PLATES_CLUBBING: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/just-me-pavilion.webp',
    caption: 'Just Me Milano · Torre Branca',
    district: 'Parco Sempione',
  },
  {
    src: '/images/guides-editorial/gattopardo-nave.webp',
    caption: 'Il Gattopardo Milano · Chiesa 1901',
    district: 'Via Piero della Francesca 47',
  },
  {
    src: '/images/guides-editorial/voya-rooftop-20f.webp',
    caption: 'Voya Rooftop · 20° Piano Skyline',
    district: 'CityLife / Portello',
  },
  {
    src: '/images/guides-editorial/aria-garden.webp',
    caption: 'Aria Club Milano · Parco San Siro',
    district: 'Piazzale dello Sport 14',
  },
];

const CHAPTER_PLATES_CLUBBING: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/pineta-lounge.webp',
    caption: 'Pineta Milano · Cristalli & Privé',
    district: 'Via Messina 38',
  },
  {
    src: '/images/guides-editorial/just-me-vip-table.webp',
    caption: 'Tavoli VIP Console & Bottle Service',
    district: '100% Minimum Spend',
  },
  {
    src: '/images/guides-editorial/bischeri-gala.webp',
    caption: 'Cena Cantata & Gala Dinner Show',
    district: 'Milano Sud / Centro',
  },
  {
    src: '/images/guides-editorial/gate-neon.webp',
    caption: 'Gate Milano · Reggaeton & Urban',
    district: 'Isola / Scalo Farini',
  },
];

const PLATES_TERME: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/terme-thermal-night.webp',
    caption: 'Terme di Sirmione & QC Terme Notturno',
    district: 'Lago di Garda / Milano',
  },
  {
    src: '/images/guides-editorial/terminus-como-lake.webp',
    caption: 'Albergo Terminus · Veranda sul Lago',
    district: 'Como Lungo Lario Trieste',
  },
  {
    src: '/images/guides-editorial/terme-alpine-snow.webp',
    caption: 'Bormio Bagni Nuovi & Chalet Alpini',
    district: 'Alta Valtellina',
  },
  {
    src: '/images/guides-editorial/palace-como-fireworks.webp',
    caption: 'Capodanno sul Lago & Cena di Gala',
    district: 'Lombardia & Garda',
  },
];

const CHAPTER_PLATES_TERME: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/barchetta-como-dining.webp',
    caption: 'Hotel Barchetta Excelsior · Cenone',
    district: 'Piazza Cavour 1, Como',
  },
  {
    src: '/images/guides-editorial/terme-villa-gala.webp',
    caption: 'Gran Galà Terme & Dimore Storiche',
    district: 'Lombardia',
  },
  {
    src: '/images/guides-editorial/voya-rooftop-20f.webp',
    caption: 'Voya Rooftop 20° Piano · Alternativa Milano',
    district: 'Portello / CityLife',
  },
  {
    src: '/images/guides-editorial/just-me-vip-table.webp',
    caption: 'JustMe Milano · Aftermidnight Privé',
    district: 'Parco Sempione',
  },
];

const PLATES_ROOFTOP: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/ceresio-pool-dusk.webp',
    caption: 'Ceresio 7 · Piscine Gemelle Skyline',
    district: 'Porta Volta / Isola',
  },
  {
    src: '/images/guides-editorial/voya-rooftop-20f.webp',
    caption: 'Voya Rooftop · Vetrate 20° Piano',
    district: 'CityLife / Portello',
  },
  {
    src: '/images/guides-editorial/terrazza-duomo-skyline.webp',
    caption: 'Terrazza Duomo 21 · Vista Cattedrale',
    district: 'Piazza del Duomo',
  },
  {
    src: '/images/guides-editorial/radio-skyline-dusk.webp',
    caption: 'Radio Rooftop · Torri di Porta Nuova',
    district: 'Porta Nuova',
  },
];

const CHAPTER_PLATES_ROOFTOP: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/voya-rooftop-20f.webp',
    caption: 'Golden Hour 20° Piano al Tramonto',
    district: 'Viale Achille Papa 30',
  },
  {
    src: '/images/guides-editorial/bischeri-dinner.webp',
    caption: 'Cena Panoramica & Cocktail d’Autore',
    district: 'Tavoli Riservati',
  },
  {
    src: '/images/guides-editorial/terrazza-duomo-skyline.webp',
    caption: 'Terrazza Duomo 21 · Dress Code Chic',
    district: 'Centro Storico',
  },
  {
    src: '/images/guides-editorial/armani-prive-lounge.webp',
    caption: 'After-Rooftop & Boutique Privé',
    district: 'Quadrilatero / Brera',
  },
];

const PLATES_DINNER: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/bischeri-gala.webp',
    caption: 'Dinner Show & Tavoli Imperiali',
    district: 'Milano Centro / Sud',
  },
  {
    src: '/images/guides-editorial/fiftyfive-loft.webp',
    caption: '55 Milano · Loft Industriale 1.000 mq',
    district: 'Via Piero della Francesca 55',
  },
  {
    src: '/images/guides-editorial/gattopardo-nave.webp',
    caption: 'Il Gattopardo · Lampadario Monumentale',
    district: 'Sempione / Cenisio',
  },
  {
    src: '/images/guides-editorial/tom-milano-dinner.webp',
    caption: 'TOM. & Bistro Club · Cena e DJ Set',
    district: 'Zona Ticinese / Darsena',
  },
];

const CHAPTER_PLATES_DINNER: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/bischeri-dinner.webp',
    caption: 'Royal Aperitivo & Cena Servita',
    district: 'Formula Tavolo Tutto Incluso',
  },
  {
    src: '/images/guides-editorial/pineta-vip.webp',
    caption: 'Champagne Service & Tavolo Dopocena',
    district: 'Via Messina 38',
  },
  {
    src: '/images/guides-editorial/tom-milano-dinner.webp',
    caption: 'Cocktail Lounge & Musica dal Vivo',
    district: 'Navigli / Brera',
  },
  {
    src: '/images/guides-editorial/fiftyfive-loft.webp',
    caption: 'Loft Post-Industriale & Terrazza',
    district: 'Sempione',
  },
];

const PLATES_ELECTRONIC: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/gate-neon.webp',
    caption: 'Gate Milano · Regie Luce & Bassi',
    district: 'Scalo Farini / Isola',
  },
  {
    src: '/images/guides-editorial/aria-dancefloor.webp',
    caption: 'Area Main Floor & Consolle Live',
    district: 'San Siro / Porta Romana',
  },
  {
    src: '/images/guides-editorial/apollo-navigli.webp',
    caption: 'Apollo Club · Groove & Discoball',
    district: 'Navigli',
  },
  {
    src: '/images/guides-editorial/repvblic-club.webp',
    caption: 'REPVBLIC Milano · Boutique Dancefloor',
    district: 'Piazza della Repubblica 12',
  },
];

const CHAPTER_PLATES_ELECTRONIC: EditorialPlate[] = [
  {
    src: '/images/guides-editorial/just-me-dancefloor.webp',
    caption: 'Impianto Audio & DJ Booth Live',
    district: 'Selezioni Internazionali',
  },
  {
    src: '/images/guides-editorial/pineta-dancefloor.webp',
    caption: 'Pista Centrale & Privé Rialzati',
    district: 'Ingresso Prioritario',
  },
  {
    src: '/images/guides-editorial/hollywood-corso-como.webp',
    caption: 'Corso Como · Notte fino alle 05:00',
    district: 'Porta Garibaldi',
  },
  {
    src: '/images/guides-editorial/the-club-brera.webp',
    caption: 'The Club Milano · Brera / Moscova',
    district: 'Corso Garibaldi 97',
  },
];

const ROOFTOP_IDS = new Set([
  'g-rooftops-milan', 'g-8', 'g-18', 'g-32', 'g-33', 'g-39', 'g-50', 'g-51', 'g-73', 'g-76', 'g-81', 'g-87', 'g-93',
]);
const TERME_IDS = new Set(['g-117', 'g-120', 'g-122', 'g-90']);
const DINNER_IDS = new Set([
  'g-secret-bars', 'g-2', 'g-private-parties', 'g-9', 'g-19', 'g-30', 'g-31', 'g-36', 'g-37', 'g-38', 'g-53', 'g-60', 'g-78', 'g-85', 'g-88', 'g-102', 'g-121', 'g-123',
]);
const ELECTRONIC_IDS = new Set([
  'g-techno-2026', 'g-5', 'g-23', 'g-24', 'g-25', 'g-26', 'g-34', 'g-35', 'g-70', 'g-77', 'g-79', 'g-80', 'g-89', 'g-124',
]);

function pickThemeSets(guideId: string): {
  heroPool: EditorialPlate[];
  stripPool: EditorialPlate[];
  chapterPool: EditorialPlate[];
} {
  if (TERME_IDS.has(guideId)) {
    return {
      heroPool: PLATES_TERME,
      stripPool: PLATES_TERME,
      chapterPool: CHAPTER_PLATES_TERME,
    };
  }
  if (ROOFTOP_IDS.has(guideId)) {
    return {
      heroPool: PLATES_ROOFTOP,
      stripPool: PLATES_ROOFTOP,
      chapterPool: CHAPTER_PLATES_ROOFTOP,
    };
  }
  if (DINNER_IDS.has(guideId)) {
    return {
      heroPool: PLATES_DINNER,
      stripPool: PLATES_DINNER,
      chapterPool: CHAPTER_PLATES_DINNER,
    };
  }
  if (ELECTRONIC_IDS.has(guideId)) {
    return {
      heroPool: PLATES_ELECTRONIC,
      stripPool: PLATES_ELECTRONIC,
      chapterPool: CHAPTER_PLATES_ELECTRONIC,
    };
  }
  return {
    heroPool: PLATES_CLUBBING,
    stripPool: PLATES_CLUBBING,
    chapterPool: CHAPTER_PLATES_CLUBBING,
  };
}

export function getGuideEditorialBundle(
  guide: Guide,
  locale: LocaleCode,
  localizedTitle: string,
  heroImg: string,
): GuideEditorialBundle {
  const { heroPool, stripPool, chapterPool } = pickThemeSets(guide.id);
  const shortLabel = getEditorialDisplayHeadline(guide.id, locale, localizedTitle);
  const restHeroSlides = heroPool.filter((p) => p.src !== heroImg);
  const heroSlides: EditorialPlate[] = [
    {
      src: heroImg,
      caption: shortLabel,
      district: TERME_IDS.has(guide.id) ? 'Lombardia & Lago di Como' : 'Nightlife Milan · Partner Network',
    },
    ...restHeroSlides,
  ].slice(0, 4);

  return {
    heroSlides,
    stripPlates: stripPool.slice(0, 4),
    chapterPlates: chapterPool.slice(0, 4),
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
