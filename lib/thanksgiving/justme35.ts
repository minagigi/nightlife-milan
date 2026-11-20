import {
  enabledLocaleCodes,
  getLocaleDef,
  localePrefix,
  type LocaleCode,
} from '@/lib/i18n/localeRegistry';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';

export const THANKSGIVING_JUSTME_XCEED_ID = '249216';
export const THANKSGIVING_JUSTME_XCEED_RAW_SLUG =
  'thanksgiving-vida-loca-justme-milano-2026-11-26';
export const THANKSGIVING_JUSTME_LEGACY_RAW_SLUG =
  'thursday-night-justme-milano-2026-11-26';
export const THANKSGIVING_JUSTME_SOURCE_URL =
  'https://xceed.me/en/milano/event/vida-loca-13/249216';
export const THANKSGIVING_JUSTME_AFFILIATE_URL =
  'https://xceed.me/en/milano/event/vida-loca-13/249216/channel/nightlifemilan-1';
export const THANKSGIVING_JUSTME_SHUTTLE_MAP_URL =
  'https://maps.app.goo.gl/dPGebEjXXzg9Lyhi9';

export const THANKSGIVING_JUSTME_POSTER_SRC =
  '/images/events/thanksgiving-2026/thanksgiving-justme-milano-2026.webp';
export const THANKSGIVING_JUSTME_BUFFET_CARD_SRC =
  '/images/events/thanksgiving-2026/justme-thanksgiving-2026-american-buffet-15.webp';
export const THANKSGIVING_JUSTME_TABLES_CARD_SRC =
  '/images/events/thanksgiving-2026/justme-thanksgiving-2026-vida-loca-tables.webp';

export const THANKSGIVING_JUSTME_FLOW_ASSET_KEYS = [
  'thanksgiving-justme-01-torre-branca',
  'thanksgiving-justme-02-old-turkey-buffet',
  'thanksgiving-justme-03-vip-tables',
  'thanksgiving-justme-04-vida-loca-party',
] as const;

export const THANKSGIVING_JUSTME_VENUE = {
  id: 'v-justme',
  name: 'JustMe Milano',
  address: 'Viale Luigi Camoens 2, Parco Sempione (Torre Branca)',
  city: 'Milano',
  postalCode: '20121',
  country: 'IT',
  latitude: 45.4729624,
  longitude: 9.1735598,
  instagram: 'https://www.instagram.com/nightlifemilan/',
  whatsapp: '+39 351 912 7047',
} as const;

export const THANKSGIVING_JUSTME_SLUGS_35: Record<LocaleCode, string> = {
  en: 'thanksgiving-2026-vida-loca-justme-milan-nov-26',
  it: 'festa-ringraziamento-thanksgiving-2026-justme-milano-26-novembre',
  es: 'accion-de-gracias-thanksgiving-2026-justme-milan-26-noviembre',
  fr: 'thanksgiving-2026-vida-loca-justme-milan-26-novembre',
  de: 'thanksgiving-erntedank-2026-vida-loca-justme-mailand-26-nov',
  pt: 'acao-de-gracas-thanksgiving-2026-justme-milao-26-novembro',
  nl: 'thanksgiving-2026-vida-loca-justme-milaan-26-november',
  ru: 'den-blagodareniya-thanksgiving-2026-justme-milan-26-noyabrya',
  tr: 'sukran-gunu-thanksgiving-2026-justme-milano-26-kasim',
  zh: 'ganenjie-thanksgiving-2026-justme-milano-11-26',
  ar: 'eid-alshukr-thanksgiving-2026-justme-milano-26-nov',
  bg: 'den-na-blagodarnostta-2026-vida-loca-justme-milano-26-noemvri',
  hr: 'dan-zahvalnosti-thanksgiving-2026-justme-milano-26-studenog',
  cs: 'dikuvzdani-thanksgiving-2026-justme-milan-26-listopadu',
  da: 'thanksgiving-2026-vida-loca-justme-milano-26-november',
  et: 'tanupuhad-thanksgiving-2026-justme-milaano-26-november',
  fi: 'kiitospaiva-thanksgiving-2026-justme-milano-26-marraskuu',
  el: 'imera-efcharistion-thanksgiving-2026-justme-milano-26-noemvriou',
  hu: 'halaadas-thanksgiving-2026-justme-milano-26-november',
  ga: 'la-altaithe-thanksgiving-2026-justme-milano-26-samhain',
  lv: 'pateicibas-diena-thanksgiving-2026-justme-milano-26-novembris',
  lt: 'padekos-diena-thanksgiving-2026-justme-milanas-26-lapkritis',
  mt: 'jum-ir-ringrazzjament-thanksgiving-2026-justme-milan-26-nov',
  pl: 'swieto-dziekczynienia-thanksgiving-2026-justme-mediolan-26-listopada',
  ro: 'ziua-recunostintei-thanksgiving-2026-justme-milano-26-noiembrie',
  sk: 'den-vdakyvzdania-thanksgiving-2026-justme-milano-26-novembra',
  sl: 'zahvalni-dan-thanksgiving-2026-justme-milano-26-november',
  sv: 'tacksagelsedagen-thanksgiving-2026-justme-milano-26-nov',
  no: 'thanksgiving-takksigelsesfest-2026-justme-milano-26-nov',
  is: 'thakkargjardarhatid-thanksgiving-2026-justme-milano-26-november',
  uk: 'den-podyaky-thanksgiving-2026-justme-milan-26-lystopada',
  sq: 'dita-e-falenderimeve-thanksgiving-2026-justme-milano-26-nentor',
  sr: 'dan-zahvalnosti-thanksgiving-2026-vida-loca-justme-milano-26-nov',
  bs: 'dan-zahvalnosti-thanksgiving-2026-justme-milano-26-novembar',
  mk: 'den-na-blagodarnosta-2026-justme-milano-26-noemvri',
};

const CANONICAL_SLUGS_SET = new Set<string>(
  Object.values(THANKSGIVING_JUSTME_SLUGS_35),
);

const DATED_NOVEMBER_26_RE =
  /(?:justme|just-me).*(?:2026-11-26|26-11-2026|26-nov)|(?:thursday-night-justme|thanksgiving.*justme|vida-loca.*justme|thursday-night-348|vida-loca-13).*2026-11-26/i;

export function thanksgivingJustMeSlug(locale: string): string {
  const def = getLocaleDef(locale);
  const code: LocaleCode = def ? def.code : 'en';
  return THANKSGIVING_JUSTME_SLUGS_35[code] || THANKSGIVING_JUSTME_SLUGS_35.en;
}

export function thanksgivingJustMePath(locale: string): string {
  const prefix = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale as LocaleCode);
  return `${prefix}/${eventsDir}/${thanksgivingJustMeSlug(locale)}`;
}

export function thanksgivingJustMeHreflangAlternates(
  baseUrl = 'https://nightlifemilan.com',
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of enabledLocaleCodes) {
    const def = getLocaleDef(loc);
    const key = def?.hreflang || loc;
    languages[key] = `${baseUrl}${thanksgivingJustMePath(loc)}`;
  }
  languages['x-default'] = `${baseUrl}${thanksgivingJustMePath('en')}`;
  return languages;
}

export function resolveThanksgivingJustMeSlug(rawSlug: string): boolean {
  const norm = rawSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!norm) return false;
  if (CANONICAL_SLUGS_SET.has(norm)) return true;
  if (
    norm === THANKSGIVING_JUSTME_XCEED_RAW_SLUG ||
    norm === THANKSGIVING_JUSTME_LEGACY_RAW_SLUG ||
    norm === '249216' ||
    norm === 'thursday-night-348-249216' ||
    norm === 'vida-loca-13-249216'
  ) {
    return true;
  }
  if (norm.includes('249216') && !norm.includes('197')) return true;
  if (norm.endsWith('2026-11-26') && DATED_NOVEMBER_26_RE.test(norm)) {
    return true;
  }
  return false;
}

export interface ThanksgivingTimelineStep {
  time: string;
  title: string;
  detail: string;
}

export interface ThanksgivingCulinaryHighlight {
  badge: string;
  title: string;
  detail: string;
}

export interface ThanksgivingOfferTier {
  id: string;
  title: string;
  price: string;
  badge: string;
  summary: string;
  bullets: string[];
  ctaKind: 'native' | 'xceed' | 'whatsapp';
  ctaLabel: string;
}

export interface ThanksgivingFaqItem {
  q: string;
  a: string;
}

export interface ThanksgivingLogisticsFact {
  label: string;
  value: string;
}

export interface ThanksgivingJustMeContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  description: string;
  themeTag: string;
  dateBadge: string;
  priceBadge: string;
  ageDressBadge: string;
  homeLabel: string;
  eventsLabel: string;
  specialLabel: string;
  ctaBuyNowLabel: string;
  ctaXceedLabel: string;
  ctaWhatsappLabel: string;
  ctaShuttleLabel: string;
  tocTitle: string;
  tocItems: Array<{ id: string; label: string }>;
  quickFacts: ThanksgivingLogisticsFact[];
  overviewHeading: string;
  overviewParagraphs: string[];
  timelineHeading: string;
  timelineSubheading: string;
  timelineSteps: ThanksgivingTimelineStep[];
  buffetHeading: string;
  buffetSubheading: string;
  buffetCardTitle: string;
  buffetCardCaption: string;
  tablesCardTitle: string;
  tablesCardCaption: string;
  culinaryHighlights: ThanksgivingCulinaryHighlight[];
  restaurantConciergeNote: string;
  tiersHeading: string;
  tiersSubheading: string;
  tiers: ThanksgivingOfferTier[];
  vipConciergeNote: string;
  heroLabels: [string, string, string, string];
  dressShuttleHeading: string;
  dressShuttleSubheading: string;
  dressCodeOkTitle: string;
  dressCodeOkItems: string[];
  dressCodeNoTitle: string;
  dressCodeNoItems: string[];
  shuttleHighlightTitle: string;
  shuttleHighlightDesc: string;
  logisticsHeading: string;
  logisticsParagraphs: string[];
  logisticsFacts: ThanksgivingLogisticsFact[];
  mapHeading: string;
  mapLabels: {
    loadMap: string;
    mapTitle: string;
    privacyLoadNotice: string;
  };
  venueBannerEyebrow: string;
  venueBannerTitle: string;
  venueBannerDesc: string;
  venueCta: string;
  dec31BannerEyebrow: string;
  dec31BannerTitle: string;
  dec31BannerDesc: string;
  dec31BannerCta: string;
  orthodoxBannerEyebrow: string;
  orthodoxBannerTitle: string;
  orthodoxBannerDesc: string;
  orthodoxBannerCta: string;
  faqHeading: string;
  faqs: ThanksgivingFaqItem[];
}

interface CoreLocalePack {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  themeTag: string;
  dateBadge: string;
  priceBadge: string;
  ageDressBadge: string;
  leadIntro: string;
  extraNativeParagraph: string;
  homeLabel: string;
  eventsLabel: string;
  specialLabel: string;
  ctaBuyNowLabel: string;
  ctaXceedLabel: string;
  ctaWhatsappLabel: string;
  ctaShuttleLabel: string;
  tocTitle: string;
  tocLabels: [string, string, string, string, string, string, string];
  quickLabels: [string, string, string, string, string, string];
  overviewHeading: string;
  timelineHeading: string;
  timelineSubheading: string;
  timelineTitles: [string, string, string, string, string];
  buffetHeading: string;
  buffetSubheading: string;
  buffetCardTitle: string;
  tablesCardTitle: string;
  tiersHeading: string;
  tiersSubheading: string;
  dressShuttleHeading: string;
  dressShuttleSubheading: string;
  dressOkTitle: string;
  dressNoTitle: string;
  shuttleHighlightTitle: string;
  logisticsHeading: string;
  mapHeading: string;
  faqHeading: string;
  venueCta: string;
  dec31Title: string;
  dec31Cta: string;
  orthodoxTitle: string;
  orthodoxCta: string;
  heroLabels: [string, string, string, string];
  nativeFaqs: [ThanksgivingFaqItem, ThanksgivingFaqItem, ThanksgivingFaqItem];
}

const PHONE = '+39 351 912 7047';

const CORE_35: Record<LocaleCode, CoreLocalePack> = {
  en: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milan | Nov 26 · 15€',
    metaDescription: `Thanksgiving 2026 at JustMe Milan Thu Nov 26: 19:30 American Buffet, Old Turkey Show & Vida Loca Radio 105. 15€ pass, VIP tables ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca at JustMe Milan: American Royal Buffet & Club',
    subtitle: 'Thursday, November 26, 2026 · 19:30 American Royal Buffet & Old Turkey Show Cooking / 22:30 Vida Loca Radio 105 until 05:00 · Parco Sempione',
    themeTag: 'Official Thanksgiving 2026 · Vida Loca Radio 105 · Free Shuttle Parking',
    dateBadge: 'Thu 26 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Tables 320€–5.000€',
    ageDressBadge: '21+ · Elegant (Men: long trousers mandatory)',
    leadIntro: 'On Thursday, November 26, 2026, JustMe Milano celebrates Thanksgiving Day beneath illuminated Torre Branca in Parco Sempione, opening at 19:30 with a Full American Style Royal Buffet featuring live Old Turkey Show Cooking and continuing from 22:30 with the high-energy Vida Loca Radio 105 club tour until 05:00.',
    extraNativeParagraph: 'Because regular Thursday Viziatissima pauses on November 26, 2026, every guest at JustMe Milano experiences a unified holiday edition combining authentic carved turkey, traditional American specialties, and American desserts with House, Hip-Hop, EDM, Hits, and Reggaeton.',
    homeLabel: 'Home',
    eventsLabel: 'Events Milan',
    specialLabel: 'Special Events',
    ctaBuyNowLabel: 'Book Online (15€ – 1.280€)',
    ctaXceedLabel: 'Open Official Xceed #249216',
    ctaWhatsappLabel: 'WhatsApp VIP & Restaurant Concierge 24/7',
    ctaShuttleLabel: 'Parking Map & Free Shuttle Service',
    tocTitle: 'Page Index · Thanksgiving 2026 JustMe Milan',
    tocLabels: [
      '1. Overview & Nov 26 Night Schedule',
      '2. Official Xceed Tickets & VIP Tables (15€+)',
      '3. American Royal Buffet & Old Turkey Show Cooking',
      '4. All 7 Official Rates & VIP Bottle Service',
      '5. Dress Code 21+, Free Shuttle & Parco Sempione Map',
      '6. Booking Confirmation & Payment Protocol',
      '7. Frequently Asked Questions (12)',
    ],
    quickLabels: ['Date & Hours', 'Venue Address', 'Culinary & Music', 'Age & Dress Code', 'Confirmed Rates', 'Parking Shuttle'],
    overviewHeading: 'Event Overview · Thanksgiving Day & Vida Loca in Parco Sempione',
    timelineHeading: 'Complete Night Schedule · Thu 26 – Fri 27 Nov 2026',
    timelineSubheading: 'From 19:30 American Style Royal Buffet and Old Turkey carving to 22:30 Vida Loca Radio 105 until 05:00',
    timelineTitles: [
      '19:30 · Doors Open & Full American Style Royal Buffet (€15)',
      '20:15 · Live Culinary Show Cooking: Famous Old Turkey & Sides',
      '21:30 · American Dessert Selection & Warm-Up Cocktails',
      '22:30 · Vida Loca Radio 105 Club Opening (€15) & Dehor Cutoff (23:00)',
      '00:00–05:00 · Peak Vida Loca Showcase & VIP Bottle Service',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey Show Cooking & Desserts',
    buffetSubheading: 'Official Aperitif + 1 Drink (€15, entry 19:30–22:00) plus seated restaurant inquiry via 24/7 WhatsApp concierge',
    buffetCardTitle: 'Full American Style Buffet & Live Carving (€15)',
    tablesCardTitle: 'Vida Loca Radio 105 VIP Privé Tables (€320–€5.000)',
    tiersHeading: 'All 7 Official Passes & VIP Table Rates (Confirmed Xceed #249216)',
    tiersSubheading: 'Official Xceed #249216 passes for buffet, club entry, and core tables or 24/7 WhatsApp Concierge for Front and DJ booths',
    dressShuttleHeading: 'Door Policy 21+, Dress Code & Free Parking Shuttle',
    dressShuttleSubheading: 'Strictly 21+ Elegant selection (men: long trousers required) and dedicated shuttle from partner car park',
    dressOkTitle: 'Approved Evening Attire',
    dressNoTitle: 'Refused at 21+ Door Selection',
    shuttleHighlightTitle: 'Dedicated Parking with Free Shuttle to Torre Branca',
    logisticsHeading: 'Getting to JustMe Milano · Metro, Taxi & Shuttle Access',
    mapHeading: 'GPS Coordinates & Map · Viale Luigi Camoens 2',
    faqHeading: 'Frequently Asked Questions · Thanksgiving 2026 JustMe Milan',
    venueCta: 'JustMe Milano Venue Dossier',
    dec31Title: 'Planning New Year’s Eve Dec 31 at JustMe Milan?',
    dec31Cta: 'See Dec 31 Gatsby NYE',
    orthodoxTitle: 'Celebrating Orthodox New Year Jan 13 at JustMe Milan?',
    orthodoxCta: 'See Jan 13 Orthodox NYE',
    heroLabels: [
      'Autumn evening arrival beneath Torre Branca at JustMe Milano',
      '19:30 American Royal Buffet & Live Old Turkey Show Cooking',
      'Heated glass veranda VIP Privé bottle service at JustMe',
      'Vida Loca Radio 105 main dancefloor until 05:00 AM',
    ],
    nativeFaqs: [
      {
        q: 'What is included in the €15 Aperitif + 1 Drink Thanksgiving Buffet ticket?',
        a: 'Entry between 19:30 and 22:00 includes one drink plus access to the Full American Style Royal Buffet with live Old Turkey Show Cooking, traditional American specialties, and the American Dessert Selection, plus remaining inside for the Vida Loca club night.',
      },
      {
        q: 'Is regular Thursday Viziatissima running on November 26, 2026?',
        a: 'No. As officially communicated by JustMe Milano, the recurring Thursday Viziatissima format pauses from Thursday, November 26, 2026, making way for the special Happy Thanksgiving Royal Buffet and Vida Loca Radio 105 celebration.',
      },
      {
        q: 'What are the exact VIP table prices and Dehor entry rule on Nov 26?',
        a: 'Confirmed Xceed #249216 rates are Dehor Table €320 (entry strictly by 23:00), Dance Floor Table €640, Central Table €1.280, VIP Front Table €3.200, and DJ Table €5.000.',
      },
    ],
  },
  it: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milano | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 al JustMe Milano gio 26 nov: Royal Buffet 19:30 con Old Turkey Show Cooking e Vida Loca. Pass 15€, tavoli ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca al JustMe Milano: American Royal Buffet e Club',
    subtitle: 'Giovedì 26 novembre 2026 · 19:30 Royal Buffet Americano con Old Turkey Show Cooking / 22:30 Vida Loca Radio 105 fino alle 05:00 · Torre Branca',
    themeTag: 'Speciale Thanksgiving 2026 · Vida Loca Radio 105 · Parcheggio con Navetta Gratuita',
    dateBadge: 'Giovedì 26 Novembre 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Tavoli 320€–5.000€',
    ageDressBadge: '21+ · Elegante (uomini: pantalone lungo obbligatorio)',
    leadIntro: 'Giovedì 26 novembre 2026 il JustMe Milano festeggia la notte di Thanksgiving nel cuore del Parco Sempione ai piedi della Torre Branca: apertura alle 19:30 con Full American Style Royal Buffet e Show Cooking dal vivo del celebre Old Turkey, seguita dalle 22:30 dal party Vida Loca targato Radio 105 fino alle 05:00.',
    extraNativeParagraph: 'Come comunicato ufficialmente dal locale, da giovedì 26 novembre 2026 la serata ricorrente Viziatissima resta in pausa per lasciare l’intera scena alla festa del Ringraziamento e al format Vida Loca, tra specialità americane, American Dessert Selection, House, Hip-Hop, Hit, EDM e Reggaeton.',
    homeLabel: 'Home',
    eventsLabel: 'Eventi Milano',
    specialLabel: 'Eventi Speciali',
    ctaBuyNowLabel: 'Acquista Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canale Ufficiale Xceed #249216',
    ctaWhatsappLabel: 'Concierge Tavoli Ristorante & VIP 24/7',
    ctaShuttleLabel: 'Parcheggio con Navetta Gratuita',
    tocTitle: 'Indice della Guida · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Panoramica & Programma del 26 Novembre',
      '2. Biglietti Xceed & Tavoli VIP (15€+)',
      '3. American Royal Buffet & Show Cooking Old Turkey',
      '4. Listino Completo 7 Tariffe Xceed #249216',
      '5. Dress Code 21+, Navetta Gratuita & Mappa',
      '6. Termini di Pagamento e Conferma Immediata',
      '7. Domande Frequenti (12 FAQ)',
    ],
    quickLabels: ['Data e Orari', 'Indirizzo Esatto', 'Buffet & Musica', 'Età e Dress Code', 'Prezzi Confermati', 'Navetta Parcheggio'],
    overviewHeading: 'Panoramica dell’Evento · Thanksgiving Day & Vida Loca a Milano',
    timelineHeading: 'Scaletta Completa della Serata · 26–27 Novembre 2026',
    timelineSubheading: 'Dalle 19:30 con l’American Royal Buffet e lo Show Cooking fino al party Vida Loca Radio 105 delle 05:00',
    timelineTitles: [
      '19:30 · Apertura Porte & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking dello Chef: Taglio del Famoso Old Turkey',
      '21:30 · American Dessert Selection & Riscaldamento in Veranda',
      '22:30 · Apertura Serata Club Vida Loca (15€) & Soglia Dehor (23:00)',
      '00:00–05:00 · Main Show Vida Loca Radio 105 & Tavoli Privé',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Show Cooking Old Turkey & Dessert',
    buffetSubheading: 'Pass Aperitivo + 1 Drink a 15€ (19:30–22:00) e tavoli ristorante su richiesta diretta al Concierge 24/7',
    buffetCardTitle: 'American Royal Buffet & Old Turkey Show Cooking (15€)',
    tablesCardTitle: 'Tavoli Privé Vida Loca JustMe Milano (320€–5.000€)',
    tiersHeading: 'Tutte le 7 Tariffe Ufficiali Xceed #249216 (Biglietti e Tavoli)',
    tiersSubheading: 'Prenota su Xceed #249216 pass Buffet 15€, Club 15€ e tavoli Dehor, Pista o Centrali, oppure richiedi i Privé Front / DJ su WhatsApp',
    dressShuttleHeading: 'Selezione 21+, Dress Code Uomo e Parcheggio con Navetta Gratuita',
    dressShuttleSubheading: 'Accesso riservato ai maggiori di 21 anni in abbigliamento elegante e navetta gratuita dedicata per gli ospiti',
    dressOkTitle: 'Abbigliamento Consigliato (Ammesso)',
    dressNoTitle: 'Non Ammesso all’Ingresso (21+)',
    shuttleHighlightTitle: 'Parcheggio Convenzionato con Navetta Gratuita A/R',
    logisticsHeading: 'Come Raggiungere JustMe Milano · Metro, Taxi e Navetta',
    mapHeading: 'Mappa & Coordinate GPS · Viale Luigi Camoens 2',
    faqHeading: 'Domande Frequenti · Thanksgiving 2026 JustMe Milano',
    venueCta: 'Scheda Locale JustMe Milano',
    dec31Title: 'Cerchi anche il Capodanno 31 Dicembre al JustMe Milano?',
    dec31Cta: 'Vedi Capodanno 31 Dicembre JustMe',
    orthodoxTitle: 'Cerchi anche il Capodanno Ortodosso 13 Gennaio al JustMe?',
    orthodoxCta: 'Vedi 13 Gennaio JustMe Milano',
    heroLabels: [
      'Arrivo degli ospiti sotto la Torre Branca per Thanksgiving al JustMe Milano',
      'Show Cooking del tacchino Old Turkey e Royal Buffet americano delle 19:30',
      'Tavoli VIP Privé sotto la veranda in vetro riscaldata del JustMe',
      'Pista centrale JustMe Milano con Vida Loca Radio 105 fino alle 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Cosa comprende il biglietto Aperitivo + 1 Drink da 15€ per il Thanksgiving al JustMe?',
        a: 'Entrando tra le 19:30 e le 22:00 hai 1 drink incluso insieme all’accesso al Full American Style Royal Buffet con Show Cooking dal vivo dell’Old Turkey, specialità tradizionali americane e American Dessert Selection, con permanenza inclusa per la serata club Vida Loca.',
      },
      {
        q: 'Giovedì 26 novembre 2026 si svolge la serata Viziatissima al JustMe Milano?',
        a: 'No. Da giovedì 26 novembre 2026 il format settimanale Viziatissima va in pausa per lasciare spazio all’edizione speciale Happy Thanksgiving con Royal Buffet americano dalle 19:30 e serata club Vida Loca dalle 22:30.',
      },
      {
        q: 'Quali sono i prezzi dei tavoli e gli orari limite per il 26 novembre?',
        a: 'I prezzi ufficiali Xceed #249216 sono: Tavolo Dehor 320€ (con ingresso obbligatorio entro le 23:00), Tavolo Pista / Dance Floor 640€, Tavolo Centrale 1.280€, VIP Front 3.200€ e Console DJ 5.000€. È consigliata la prenotazione anticipata.',
      },
    ],
  },
  es: {
    metaTitle: 'Thanksgiving 2026 y Vida Loca JustMe Milán | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 en JustMe Milán jue 26 nov: Buffet 19:30 Old Turkey Show Cooking y Vida Loca Radio 105. Pase 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 y Vida Loca en JustMe Milán: Buffet Americano y Club',
    subtitle: 'Jueves 26 de noviembre 2026 · 19:30 Buffet Americano con Old Turkey Show Cooking / 22:30 Vida Loca Radio 105 hasta 05:00 · Parco Sempione',
    themeTag: 'Edición Thanksgiving 2026 · Vida Loca Radio 105 · Parking con Lanzadera Gratis',
    dateBadge: 'Jueves 26 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Mesas 320€–5.000€',
    ageDressBadge: '21+ · Elegante (pantalón largo obligatorio hombres)',
    leadIntro: 'El jueves 26 de noviembre de 2026, JustMe Milano celebra Acción de Gracias al pie de la iluminada Torre Branca en Parco Sempione: apertura a las 19:30 con Full American Style Royal Buffet y Show Cooking del célebre Old Turkey, continuando desde las 22:30 con Vida Loca Radio 105 hasta las 05:00.',
    extraNativeParagraph: 'Con la pausa del jueves habitual Viziatissima desde el 26 de noviembre, la noche fusiona gastronomía estadounidense tradicional y postres American Dessert Selection con sesiones de House, Hip-Hop, Hits, EDM y Reggaeton para público internacional mayor de 21 años.',
    homeLabel: 'Inicio',
    eventsLabel: 'Eventos Milán',
    specialLabel: 'Eventos Especiales',
    ctaBuyNowLabel: 'Comprar Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canal Oficial Xceed #249216',
    ctaWhatsappLabel: 'Concierge Mesas Restaurante & VIP 24/7',
    ctaShuttleLabel: 'Mapa Parking con Lanzadera Gratuita',
    tocTitle: 'Índice de la Guía · Thanksgiving 2026 JustMe Milán',
    tocLabels: [
      '1. Resumen y Horarios del 26 de Noviembre',
      '2. Compra Online de Entradas y Mesas (15€+)',
      '3. Royal Buffet Americano y Show Cooking Old Turkey',
      '4. Tarifas Oficiales Xceed #249216 y VIP',
      '5. Dress Code 21+, Lanzadera Gratis y Mapa',
      '6. Condiciones de Pago y Confirmación',
      '7. Preguntas Frecuentes (12 FAQ)',
    ],
    quickLabels: ['Fecha y Horarios', 'Dirección Exacta', 'Buffet y Música', 'Edad y Etiqueta', 'Precios Oficiales', 'Parking Lanzadera'],
    overviewHeading: 'Resumen del Evento · Acción de Gracias y Vida Loca en Milán',
    timelineHeading: 'Programa Completo · Jueves 26 – Viernes 27 Noviembre 2026',
    timelineSubheading: 'Desde el buffet americano de las 19:30 hasta el cierre clubbing de Vida Loca a las 05:00',
    timelineTitles: [
      '19:30 · Apertura e Inicio del Royal Buffet Americano (15€)',
      '20:15 · Show Cooking en Directo del Clásico Old Turkey',
      '21:30 · American Dessert Selection y Cócteles en Veranda',
      '22:30 · Apertura Club Vida Loca Radio 105 (15€) y Dehor 23:00',
      '00:00–05:00 · Sesión Principal Vida Loca y Mesas VIP Privé',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey Show Cooking y Postres',
    buffetSubheading: 'Pase Aperitivo + 1 Copa a 15€ (19:30–22:00) y reserva de mesas de restaurante por WhatsApp 24/7',
    buffetCardTitle: 'Buffet Royal Americano & Old Turkey (15€)',
    tablesCardTitle: 'Mesas VIP Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Las 7 Tarifas Oficiales Confirmadas (Xceed #249216)',
    tiersSubheading: 'Reserva inmediata de entradas Buffet, Club y mesas Dehor, Pista o Centrales sin cargos ocultos',
    dressShuttleHeading: 'Etiqueta 21+, Pantalón Largo y Lanzadera Gratuita',
    dressShuttleSubheading: 'Admisión estricta para mayores de 21 años y transporte gratuito desde el parking asociado',
    dressOkTitle: 'Atuendo Recomendado',
    dressNoTitle: 'No Permitido en Puerta (21+)',
    shuttleHighlightTitle: 'Parking con Servicio de Lanzadera Gratuita a JustMe',
    logisticsHeading: 'Cómo Llegar a JustMe Milano · Metro, Taxi y Lanzadera',
    mapHeading: 'Coordenadas GPS y Mapa · Viale Luigi Camoens 2',
    faqHeading: 'Preguntas Frecuentes · Thanksgiving 2026 JustMe Milán',
    venueCta: 'Ficha Club JustMe Milán',
    dec31Title: '¿Buscas también Nochevieja 31 Dic en JustMe Milán?',
    dec31Cta: 'Ver Fin de Año 31 Dic JustMe',
    orthodoxTitle: '¿Buscas también Año Nuevo Ortodoxo 13 Ene en JustMe?',
    orthodoxCta: 'Ver 13 Ene JustMe Milán',
    heroLabels: [
      'Llegada nocturna bajo Torre Branca para Thanksgiving en JustMe Milán',
      'Estación de Old Turkey Show Cooking y Buffet Americano desde las 19:30',
      'Mesas VIP Privé bajo la cúpula de cristal climatizada',
      'Pista central con el tour Vida Loca Radio 105 hasta las 05:00',
    ],
    nativeFaqs: [
      {
        q: '¿Qué incluye la entrada Aperitivo + 1 Copa de 15€ para Thanksgiving?',
        a: 'Entrando entre las 19:30 y las 22:00 incluye una consumición y acceso al Full American Style Royal Buffet con Show Cooking del Old Turkey, especialidades norteamericanas y American Dessert Selection, manteniendo el acceso al club Vida Loca.',
      },
      {
        q: '¿Se celebra la fiesta habitual Viziatissima el jueves 26 de noviembre?',
        a: 'No. A partir del jueves 26 de noviembre de 2026 Viziatissima hace una pausa oficial para dar paso al evento especial Happy Thanksgiving y Vida Loca Radio 105.',
      },
      {
        q: '¿Cuál es el horario límite del Dehor Table de 320€?',
        a: 'Los invitados con mesa Dehor Table (320€) deben acceder antes de las 23:00; el resto de mesas en Pista (640€), Central (1.280€), VIP Front (3.200€) y DJ Table (5.000€) disponen de coordinación directa.',
      },
    ],
  },
  fr: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milan | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 au JustMe Milan jeu 26 nov : Buffet 19h30 Old Turkey Show Cooking et Vida Loca Radio 105. Pass 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca au JustMe Milan : Buffet Royal et Club',
    subtitle: 'Jeudi 26 novembre 2026 · 19h30 Full American Royal Buffet & Show Cooking Old Turkey / 22h30 Vida Loca Radio 105 jusqu’à 05h00 · Parco Sempione',
    themeTag: 'Spécial Thanksgiving 2026 · Vida Loca Radio 105 · Parking Navette Gratuite',
    dateBadge: 'Jeudi 26 Nov 2026 · 19h30 / 05h00',
    priceBadge: 'Buffet 15€ · Club 15€ · Tables 320€–5.000€',
    ageDressBadge: '21+ · Élégant (pantalon long exigé messieurs)',
    leadIntro: 'Le jeudi 26 novembre 2026, JustMe Milano célèbre Thanksgiving au pied de la Torre Branca illuminée au Parco Sempione : ouverture dès 19h30 avec le Full American Style Royal Buffet et Show Cooking en direct de l’Old Turkey, suivis dès 22h30 de la tournée club Vida Loca Radio 105 jusqu’à 05h00.',
    extraNativeParagraph: 'Avec la mise en pause de la soirée Viziatissima à partir du 26 novembre, cette édition réunit recettes américaines authentiques, American Dessert Selection et programmation House, Hip-Hop, Hits, EDM et Reggaeton pour une clientèle internationale 21+.',
    homeLabel: 'Accueil',
    eventsLabel: 'Événements Milan',
    specialLabel: 'Événements Spéciaux',
    ctaBuyNowLabel: 'Acheter en Ligne (15€ – 1.280€)',
    ctaXceedLabel: 'Billetterie Officielle Xceed #249216',
    ctaWhatsappLabel: 'Concierge Tables Restaurant & VIP 24/7',
    ctaShuttleLabel: 'Plan Parking & Navette Gratuite',
    tocTitle: 'Sommaire du Guide · Thanksgiving 2026 JustMe Milan',
    tocLabels: [
      '1. Aperçu et Programme du 26 Novembre',
      '2. Billets et Tables en Ligne (dès 15€)',
      '3. Royal Buffet Américain & Show Cooking Old Turkey',
      '4. Les 7 Tarifs Officiels Xceed #249216',
      '5. Tenue 21+, Navette Gratuite et Accès',
      '6. Paiement et Confirmation Officielle',
      '7. Questions Fréquentes (12 FAQ)',
    ],
    quickLabels: ['Date et Horaires', 'Adresse Exacte', 'Buffet & Musique', 'Âge et Tenue', 'Tarifs Confirmés', 'Parking Navette'],
    overviewHeading: 'Aperçu de la Soirée · Thanksgiving Day & Vida Loca à Milan',
    timelineHeading: 'Déroulé Complet de la Nuit · 26–27 Novembre 2026',
    timelineSubheading: 'Du Buffet Royal Américain à 19h30 jusqu’au final clubbing Vida Loca à 05h00 du matin',
    timelineTitles: [
      '19h30 · Accueil & Full American Style Royal Buffet (15€)',
      '20h15 · Show Cooking en Direct du Célèbre Old Turkey',
      '21h30 · American Dessert Selection & Cocktails sous Verrière',
      '22h30 · Ouverture Club Vida Loca Radio 105 (15€) & Dehor 23h00',
      '00h00–05h00 · Show Vida Loca et Service Bouteilles VIP Privé',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey Show Cooking & Desserts',
    buffetSubheading: 'Pass Apéritif + 1 Boisson à 15€ (19h30–22h00) et demande de table restaurant sur WhatsApp 24/7',
    buffetCardTitle: 'Buffet Royal Américain & Old Turkey (15€)',
    tablesCardTitle: 'Tables VIP Privé Vida Loca JustMe (320€–5.000€)',
    tiersHeading: 'Tous les Tarifs Officiels Xceed #249216 (Billets & Tables)',
    tiersSubheading: 'Achat direct en ligne pour Buffet, Club, tables Dehor, Piste et Centrales ou conciergerie Front / DJ',
    dressShuttleHeading: 'Code Vestimentaire 21+, Pantalon Long & Navette Gratuite',
    dressShuttleSubheading: 'Sélection stricte à partir de 21 ans et navette gratuite dédiée depuis le parking partenaire',
    dressOkTitle: 'Tenue Recommandée',
    dressNoTitle: 'Refusé à l’Entrée (21+)',
    shuttleHighlightTitle: 'Parking avec Navette Gratuite vers JustMe Milan',
    logisticsHeading: 'Accès JustMe Milano · Métro, Taxi et Navette',
    mapHeading: 'Coordonnées GPS et Carte · Viale Luigi Camoens 2',
    faqHeading: 'Foire aux Questions · Thanksgiving 2026 JustMe Milan',
    venueCta: 'Fiche Club JustMe Milan',
    dec31Title: 'Vous préparez aussi le Réveillon du 31 Décembre au JustMe ?',
    dec31Cta: 'Voir Nouvel An 31 Décembre JustMe',
    orthodoxTitle: 'Vous cherchez aussi le Nouvel An Orthodoxe du 13 Janvier ?',
    orthodoxCta: 'Voir 13 Janvier JustMe Milan',
    heroLabels: [
      'Arrivée nocturne sous la Torre Branca pour Thanksgiving au JustMe Milan',
      'Buffet Royal Américain et découpe en direct de l’Old Turkey à 19h30',
      'Carré VIP Privé sous la coupole en verre chauffée du JustMe',
      'Piste centrale Vida Loca Radio 105 jusqu’à 05h00',
    ],
    nativeFaqs: [
      {
        q: 'Que comprend le pass Apéritif + 1 Boisson à 15€ le 26 novembre ?',
        a: 'Pour toute entrée entre 19h30 et 22h00, le billet inclut 1 consommation ainsi que l’accès complet au Royal Buffet américain avec Show Cooking du célèbre Old Turkey et American Dessert Selection, plus la soirée club Vida Loca.',
      },
      {
        q: 'La soirée du jeudi Viziatissima a-t-elle lieu le 26 novembre 2026 ?',
        a: 'Non. À compter du jeudi 26 novembre 2026, le rendez-vous hebdomadaire Viziatissima est mis en pause pour laisser place à l’événement spécial Thanksgiving et Vida Loca Radio 105.',
      },
      {
        q: 'Quelle est l’heure limite d’arrivée pour une Dehor Table à 320€ ?',
        a: 'Les détenteurs d’une Dehor Table (320€) doivent se présenter avant 23h00. Les tables Piste (640€), Centrales (1.280€), VIP Front (3.200€) et Console DJ (5.000€) sont garanties sur réservation.',
      },
    ],
  },
  de: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Mailand | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 im JustMe Mailand Do 26.11: 19:30 American Buffet, Old Turkey Show & Vida Loca Radio 105. 15€ Pass, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca im JustMe Mailand: American Buffet & Club',
    subtitle: 'Donnerstag, 26. November 2026 · 19:30 Full American Royal Buffet & Old Turkey Show Cooking / 22:30 Vida Loca Radio 105 bis 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving Special 2026 · Vida Loca Radio 105 · Gratis Parkplatz-Shuttle',
    dateBadge: 'Do 26. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Tische 320€–5.000€',
    ageDressBadge: '21+ · Elegant (Herren: lange Hose Pflicht)',
    leadIntro: 'Am Donnerstag, 26. November 2026, feiert das JustMe Milano im Parco Sempione unter der beleuchteten Torre Branca eine große Thanksgiving-Nacht: Einlass ab 19:30 Uhr mit Full American Style Royal Buffet und Live Show Cooking des berühmten Old Turkey, ab 22:30 Uhr Clubtour Vida Loca (Radio 105) bis 05:00 Uhr.',
    extraNativeParagraph: 'Da die wöchentliche Reihe Viziatissima ab dem 26. November pausiert, verbindet diese Sonderausgabe echte amerikanische Festtagsküche und American Dessert Selection mit House, Hip-Hop, Hits, EDM und Reggaeton.',
    homeLabel: 'Startseite',
    eventsLabel: 'Events Mailand',
    specialLabel: 'Spezialevents',
    ctaBuyNowLabel: 'Online Buchen (15€ – 1.280€)',
    ctaXceedLabel: 'Offiziell auf Xceed #249216',
    ctaWhatsappLabel: 'Restaurant & VIP Concierge 24/7',
    ctaShuttleLabel: 'Parkplatz & Kostenloser Shuttle',
    tocTitle: 'Seitenindex · Thanksgiving 2026 JustMe Mailand',
    tocLabels: [
      '1. Überblick & Zeitplan 26. November',
      '2. Direkte Online-Buchung (ab 15€)',
      '3. American Royal Buffet & Old Turkey Show Cooking',
      '4. Alle 7 Offiziellen Xceed-Preise (#249216)',
      '5. Dresscode 21+, Kostenloser Shuttle & Karte',
      '6. Zahlungsprotokoll & Sofortbestätigung',
      '7. Häufig Gestellte Fragen (12 FAQ)',
    ],
    quickLabels: ['Datum & Zeiten', 'Genaue Adresse', 'Buffet & Musik', 'Alter & Dresscode', 'Offizielle Preise', 'Gratis Shuttle'],
    overviewHeading: 'Event-Überblick · Thanksgiving Day & Vida Loca im Parco Sempione',
    timelineHeading: 'Kompletter Nacht-Zeitplan · 26.–27. November 2026',
    timelineSubheading: 'Vom American Style Buffet um 19:30 Uhr bis zum Vida Loca Finale um 05:00 Uhr morgens',
    timelineTitles: [
      '19:30 · Einlass & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking des Berühmten Old Turkey',
      '21:30 · American Dessert Selection & Warm-Up an der Bar',
      '22:30 · Club-Einlass Vida Loca Radio 105 (15€) & Dehor 23:00',
      '00:00–05:00 · Vida Loca Hauptshow & VIP Privé Flaschenservice',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey Show Cooking & Desserts',
    buffetSubheading: 'Aperitif + 1 Drink Ticket für 15€ (19:30–22:00) sowie Restaurant-Tischanfragen rund um die Uhr über WhatsApp',
    buffetCardTitle: 'American Royal Buffet & Old Turkey Carving (15€)',
    tablesCardTitle: 'Vida Loca Radio 105 VIP-Tische (320€–5.000€)',
    tiersHeading: 'Alle 7 Bestätigten Tarife · Tickets & VIP-Tische (Xceed #249216)',
    tiersSubheading: 'Direktbuchung für Buffet 15€, Club 15€ und Dehor-, Dance-Floor- & Central-Tische oder VIP-Anfrage',
    dressShuttleHeading: 'Einlass ab 21+, Dresscode & Kostenloser Shuttle-Service',
    dressShuttleSubheading: 'Strenge 21+ Auswahl in eleganter Abendgarderobe (Herren zwingend lange Hose) inklusive Gratis-Shuttle',
    dressOkTitle: 'Empfohlene Abendkleidung',
    dressNoTitle: 'Nicht Gestattet (21+ Selektion)',
    shuttleHighlightTitle: 'Partner-Parkplatz mit Kostenlosem Shuttle-Bus',
    logisticsHeading: 'Anfahrt zum JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS-Koordinaten & Karte · Viale Luigi Camoens 2',
    faqHeading: 'Häufige Fragen · Thanksgiving 2026 JustMe Mailand',
    venueCta: 'Club-Profil JustMe Mailand',
    dec31Title: 'Auch Silvester am 31. Dezember im JustMe Mailand geplant?',
    dec31Cta: 'Zu Silvester 31.12. JustMe',
    orthodoxTitle: 'Interesse am Orthodoxen Neujahr am 13. Januar im JustMe?',
    orthodoxCta: 'Zum 13. Januar JustMe Mailand',
    heroLabels: [
      'Herbstabendliche Ankunft unter der Torre Branca beim JustMe Mailand',
      '19:30 American Royal Buffet mit Live Old Turkey Show Cooking',
      'Beheizter Glaspavillon mit VIP Privé Flaschenservice',
      'Haupttanzfläche mit Vida Loca Radio 105 bis 05:00 Uhr',
    ],
    nativeFaqs: [
      {
        q: 'Was beinhaltet das 15€ Aperitif + 1 Drink Ticket an Thanksgiving?',
        a: 'Bei Ankunft zwischen 19:30 und 22:00 Uhr erhalten Sie einen Drink, Zugang zum Full American Style Royal Buffet samt Old Turkey Show Cooking und American Dessert Selection sowie freien Verbleib für die Clubnacht Vida Loca.',
      },
      {
        q: 'Findet am Donnerstag, 26. November 2026 das normale Event Viziatissima statt?',
        a: 'Nein. Ab dem 26. November 2026 pausiert das Donnerstagsformat Viziatissima zugunsten der Thanksgiving-Sondernacht mit American Royal Buffet und Vida Loca Tour von Radio 105.',
      },
      {
        q: 'Bis wann müssen Gäste mit einem 320€ Dehor Table eintreffen?',
        a: 'Für den Dehor Table (320€) gilt der Einlass bis spätestens 23:00 Uhr; Dance Floor Table (640€), Central Table (1.280€), VIP Front Table (3.200€) und DJ Table (5.000€) werden flexibel über unseren Concierge koordiniert.',
      },
    ],
  },
  pt: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milão | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 no JustMe Milão qui 26 nov: Buffet 19:30 Old Turkey Show Cooking e Vida Loca Radio 105. Passe 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca no JustMe Milão: Buffet Americano e Club',
    subtitle: 'Quinta-feira, 26 de novembro 2026 · 19:30 Buffet Royal Americano com Show Cooking Old Turkey / 22:30 Vida Loca Radio 105 até às 05:00 · Parco Sempione',
    themeTag: 'Edição Thanksgiving 2026 · Vida Loca Radio 105 · Estacionamento com Transfer Grátis',
    dateBadge: 'Qui 26 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Mesas 320€–5.000€',
    ageDressBadge: '21+ · Elegante (calças compridas obrigatórias)',
    leadIntro: 'Na quinta-feira 26 de novembro de 2026, o JustMe Milano celebra o Dia de Ação de Graças junto à Torre Branca no Parco Sempione: abertura às 19:30 com Full American Style Royal Buffet e Show Cooking ao vivo de Old Turkey, prosseguindo às 22:30 com a festa Vida Loca Radio 105 até às 05:00.',
    extraNativeParagraph: 'Com a pausa do formato Viziatissima a partir de 26 de novembro, esta noite junta especialidades americanas tradicionais, American Dessert Selection e música House, Hip-Hop, Hits, EDM e Reggaeton.',
    homeLabel: 'Início',
    eventsLabel: 'Eventos Milão',
    specialLabel: 'Eventos Especiais',
    ctaBuyNowLabel: 'Comprar Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canal Oficial Xceed #249216',
    ctaWhatsappLabel: 'Concierge Restaurante & VIP 24/7',
    ctaShuttleLabel: 'Estacionamento & Transfer Gratuito',
    tocTitle: 'Índice do Guia · Thanksgiving 2026 JustMe Milão',
    tocLabels: [
      '1. Visão Geral & Horários de 26 Novembro',
      '2. Bilhetes e Mesas Online (15€+)',
      '3. Royal Buffet Americano & Show Cooking Old Turkey',
      '4. Todas as 7 Tarifas Oficiais Xceed #249216',
      '5. Dress Code 21+, Transfer Grátis & Mapa',
      '6. Condições de Pagamento & Confirmação',
      '7. Perguntas Frequentes (12 FAQ)',
    ],
    quickLabels: ['Data e Horários', 'Morada Exata', 'Buffet e Música', 'Idade e Dress Code', 'Preços Confirmados', 'Transfer Gratuito'],
    overviewHeading: 'Visão Geral · Thanksgiving Day & Vida Loca no JustMe Milão',
    timelineHeading: 'Programa da Noite · 26–27 de Novembro 2026',
    timelineSubheading: 'Do Buffet Royal às 19:30 à pista Vida Loca Radio 105 até às 05:00',
    timelineTitles: [
      '19:30 · Abertura & Full American Style Royal Buffet (15€)',
      '20:15 · Show Cooking ao Vivo do Clássico Old Turkey',
      '21:30 · American Dessert Selection & Cocktails na Veranda',
      '22:30 · Entrada Club Vida Loca (15€) & Dehor até 23:00',
      '00:00–05:00 · Espetáculo Vida Loca & Serviço de Garrafas VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey Show Cooking & Sobremesas',
    buffetSubheading: 'Passe Aperitivo + 1 Bebida 15€ (19:30–22:00) e mesas de restaurante sob reserva via WhatsApp 24/7',
    buffetCardTitle: 'Buffet Royal Americano & Old Turkey (15€)',
    tablesCardTitle: 'Mesas VIP Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Todas as 7 Tarifas Oficiais Xceed #249216',
    tiersSubheading: 'Compra direta de ingressos Buffet, Club e mesas Dehor, Pista e Central',
    dressShuttleHeading: 'Regras 21+, Dress Code & Estacionamento com Transfer Grátis',
    dressShuttleSubheading: 'Traje elegante obrigatório para maiores de 21 anos e serviço gratuito de transfer',
    dressOkTitle: 'Traje Aprovado',
    dressNoTitle: 'Não Permitido na Entrada (21+)',
    shuttleHighlightTitle: 'Estacionamento com Serviço Gratuito de Transfer',
    logisticsHeading: 'Como Chegar ao JustMe Milano · Metro, Táxi & Transfer',
    mapHeading: 'Coordenadas GPS & Mapa · Viale Luigi Camoens 2',
    faqHeading: 'Perguntas Frequentes · Thanksgiving 2026 JustMe Milão',
    venueCta: 'Perfil do Clube JustMe Milão',
    dec31Title: 'Procura também o Réveillon 31 Dezembro no JustMe Milão?',
    dec31Cta: 'Ver Réveillon 31 Dezembro JustMe',
    orthodoxTitle: 'Procura o Ano Novo Ortodoxo 13 Janeiro no JustMe?',
    orthodoxCta: 'Ver 13 Janeiro JustMe Milão',
    heroLabels: [
      'Chegada noturna sob a Torre Branca para o Thanksgiving no JustMe Milão',
      'Buffet Royal Americano com Show Cooking de Old Turkey às 19:30',
      'Mesas VIP Privé na veranda envidraçada aquecida do JustMe',
      'Pista Vida Loca Radio 105 até às 05:00 da manhã',
    ],
    nativeFaqs: [
      {
        q: 'O que inclui o bilhete Aperitivo + 1 Bebida de 15€ no Thanksgiving?',
        a: 'Com entrada entre as 19:30 e as 22:00 inclui 1 bebida, acesso ao Full American Style Royal Buffet com Show Cooking de Old Turkey, especialidades americanas e American Dessert Selection, mantendo acesso à festa Vida Loca.',
      },
      {
        q: 'A festa semanal Viziatissima acontece na quinta 26 de novembro?',
        a: 'Não. A partir de 26 de novembro de 2026 o formato Viziatissima faz uma pausa para dar lugar à noite especial de Thanksgiving com Royal Buffet e Vida Loca Radio 105.',
      },
      {
        q: 'Qual é o horário limite da mesa Dehor (320€)?',
        a: 'As mesas Dehor Table (320€) exigem entrada até às 23:00; Pista (640€), Central (1.280€), VIP Front (3.200€) e DJ Table (5.000€) incluem gestão VIP direta.',
      },
    ],
  },
  nl: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milaan | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 bij JustMe Milaan do 26 nov: Buffet 19:30 Old Turkey Show Cooking & Vida Loca Radio 105. Pas 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca bij JustMe Milaan: American Buffet & Club',
    subtitle: 'Donderdag 26 november 2026 · 19:30 American Style Royal Buffet & Old Turkey Show Cooking / 22:30 Vida Loca Radio 105 tot 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving Editie 2026 · Vida Loca Radio 105 · Gratis Parkeershuttle',
    dateBadge: 'Do 26 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Tafels 320€–5.000€',
    ageDressBadge: '21+ · Elegant (lange broek verplicht heren)',
    leadIntro: 'Op donderdag 26 november 2026 viert JustMe Milano Thanksgiving onder de verlichte Torre Branca in Parco Sempione: vanaf 19:30 met het Full American Style Royal Buffet en live Show Cooking van Old Turkey, gevolgd vanaf 22:30 door Vida Loca Radio 105 tot 05:00 uur.',
    extraNativeParagraph: 'Omdat de donderdagnacht Viziatissima vanaf 26 november pauzeert, brengt deze editie klassieke Amerikaanse gerechten, American Dessert Selection en House, Hip-Hop, Hits, EDM en Reggaeton samen.',
    homeLabel: 'Home',
    eventsLabel: 'Evenementen Milaan',
    specialLabel: 'Speciale Events',
    ctaBuyNowLabel: 'Online Boeken (15€ – 1.280€)',
    ctaXceedLabel: 'Officiële Xceed-pagina #249216',
    ctaWhatsappLabel: 'Restaurant & VIP Concierge 24/7',
    ctaShuttleLabel: 'Parkeren met Gratis Shuttle',
    tocTitle: 'Inhoud · Thanksgiving 2026 JustMe Milaan',
    tocLabels: [
      '1. Overzicht & Tijdschema 26 November',
      '2. Online Tickets & VIP-Tafels (vanaf 15€)',
      '3. American Royal Buffet & Old Turkey Show Cooking',
      '4. Alle 7 Officiële Prijzen (Xceed #249216)',
      '5. Dresscode 21+, Gratis Shuttle & Kaart',
      '6. Betalingsvoorwaarden & Directe Bevestiging',
      '7. Veelgestelde Vragen (12 FAQ)',
    ],
    quickLabels: ['Datum & Tijden', 'Exact Adres', 'Buffet & Muziek', 'Leeftijd & Dresscode', 'Bevestigde Prijzen', 'Gratis Shuttle'],
    overviewHeading: 'Event Overzicht · Thanksgiving & Vida Loca in Parco Sempione',
    timelineHeading: 'Avondprogramma · Donderdag 26 – Vrijdag 27 Nov 2026',
    timelineSubheading: 'Van het 19:30 American Royal Buffet tot het Vida Loca slot om 05:00 uur',
    timelineTitles: [
      '19:30 · Deuren Open & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking van de Beroemde Old Turkey',
      '21:30 · American Dessert Selection & Veranda Borrel',
      '22:30 · Club Opening Vida Loca Radio 105 (15€) & Dehor 23:00',
      '00:00–05:00 · Hoofdpodium Vida Loca & VIP Flessenservice',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey Show Cooking & Desserts',
    buffetSubheading: 'Aperitief + 1 Drankje voor 15€ (19:30–22:00) of restauranttafel op aanvraag via WhatsApp',
    buffetCardTitle: 'American Royal Buffet & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Tafels Vida Loca (320€–5.000€)',
    tiersHeading: 'Alle 7 Officiële Prijzen & Tafels (Xceed #249216)',
    tiersSubheading: 'Direct reserveren van Buffet, Club, Dehor-, Dance Floor- en Central-tafels zonder verborgen kosten',
    dressShuttleHeading: 'Toegang 21+, Dresscode & Gratis Parkeershuttle',
    dressShuttleSubheading: 'Strenge 21+ selectie in elegante kleding (heren verplicht lange broek) en gratis pendeldienst',
    dressOkTitle: 'Aanbevolen Kleding',
    dressNoTitle: 'Niet Toegestaan (21+)',
    shuttleHighlightTitle: 'Parkeren met Gratis Pendelservice naar Torre Branca',
    logisticsHeading: 'Bereikbaarheid JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Coördinaten & Kaart · Viale Luigi Camoens 2',
    faqHeading: 'Veelgestelde Vragen · Thanksgiving 2026 JustMe Milaan',
    venueCta: 'JustMe Milaan Clubprofiel',
    dec31Title: 'Ook geïnteresseerd in Oud & Nieuw 31 Dec bij JustMe Milaan?',
    dec31Cta: 'Bekijk 31 Dec NYE JustMe',
    orthodoxTitle: 'Ook het Orthodox Nieuwjaar op 13 Jan bekijken?',
    orthodoxCta: 'Bekijk 13 Jan JustMe Milaan',
    heroLabels: [
      'Avondaankomst onder de Torre Branca bij JustMe Milaan',
      '19:30 American Royal Buffet met live Old Turkey Show Cooking',
      'Verwarmde glazen veranda met VIP Privé flessenservice',
      'Hoofddansvloer met Vida Loca Radio 105 tot 05:00 uur',
    ],
    nativeFaqs: [
      {
        q: 'Wat zit er bij het 15€ Aperitief + 1 Drankje Thanksgiving-ticket?',
        a: 'Tussen 19:30 en 22:00 krijg je 1 drankje en toegang tot het Full American Style Royal Buffet met live Old Turkey Show Cooking, Amerikaanse specialiteiten en American Dessert Selection, plus aansluitend het Vida Loca clubfeest.',
      },
      {
        q: 'Gaat de donderdagnacht Viziatissima door op 26 november 2026?',
        a: 'Nee. Vanaf donderdag 26 november 2026 pauzeert Viziatissima officieel voor deze speciale Thanksgiving-avond met Vida Loca Radio 105.',
      },
      {
        q: 'Tot hoe laat geldt toegang voor de 320€ Dehor Table?',
        a: 'Gasten met een Dehor Table (320€) dienen vóór 23:00 binnen te zijn; Dance Floor (640€), Central (1.280€), VIP Front (3.200€) en DJ Table (5.000€) worden rechtstreeks begeleid.',
      },
    ],
  },
  ru: {
    metaTitle: 'День Благодарения 2026 и Vida Loca JustMe Милан | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 в JustMe Милан чт 26 ноя: Буфет 19:30 с шоу Old Turkey и Vida Loca Radio 105. Билет 15€, VIP ${PHONE}.`,
    h1: 'День Благодарения 2026 и Vida Loca в JustMe Милан: Буфет и Клуб',
    subtitle: 'Четверг 26 ноября 2026 · 19:30 Full American Royal Buffet и шоу Old Turkey / 22:30 Vida Loca Radio 105 до 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving 2026 · Тур Vida Loca Radio 105 · Парковка с бесплатным шаттлом',
    dateBadge: 'Чт 26 Ноября 2026 · 19:30 / 05:00',
    priceBadge: 'Буфет 15€ · Клуб 15€ · Столы 320€–5.000€',
    ageDressBadge: '21+ · Элегантный стиль (брюки обязательны для мужчин)',
    leadIntro: 'В четверг 26 ноября 2026 года флагманский клуб JustMe Milano отмечает День Благодарения у башни Torre Branca в Парко Семпионе: с 19:30 работает Full American Style Royal Buffet с кулинарным шоу знаменитой индейки Old Turkey, а с 22:30 до 05:00 проходит вечеринка Vida Loca при поддержке Radio 105.',
    extraNativeParagraph: 'Еженедельная программа четверга Viziatissima с 26 ноября берет паузу, уступая сцену празднику Thanksgiving, традиционным американским блюдам, American Dessert Selection и миксу House, Hip-Hop, Hits, EDM и Reggaeton.',
    homeLabel: 'Главная',
    eventsLabel: 'События Милан',
    specialLabel: 'Спецсобытия',
    ctaBuyNowLabel: 'Купить Онлайн (15€ – 1.280€)',
    ctaXceedLabel: 'Официальный канал Xceed #249216',
    ctaWhatsappLabel: 'Бронь ресторана и VIP-столов 24/7',
    ctaShuttleLabel: 'Парковка и бесплатный шаттл',
    tocTitle: 'Содержание · День Благодарения 2026 JustMe Милан',
    tocLabels: [
      '1. Обзор события и расписание на 26 ноября',
      '2. Онлайн-покупка билетов и столов (от 15€)',
      '3. Американский Royal Buffet и шоу индейки Old Turkey',
      '4. Все 7 тарифов Xceed #249216 и VIP-зоны',
      '5. Дресс-код 21+, бесплатный шаттл и карта',
      '6. Протокол оплаты и моментальной брони',
      '7. Частые вопросы (12 FAQ)',
    ],
    quickLabels: ['Дата и время', 'Точный адрес', 'Буфет и музыка', 'Возраст и стиль', 'Официальные цены', 'Бесплатный шаттл'],
    overviewHeading: 'Обзор вечера · Thanksgiving Day и Vida Loca в JustMe Милан',
    timelineHeading: 'Тайминг ночи · Четверг 26 – Пятница 27 ноября 2026',
    timelineSubheading: 'От американского фуршета с 19:30 до финала Vida Loca Radio 105 в 05:00 утра',
    timelineTitles: [
      '19:30 · Открытие дверей и Full American Style Royal Buffet (15€)',
      '20:15 · Живое шоу разделки знаменитой индейки Old Turkey',
      '21:30 · Десерты American Dessert Selection и коктейли',
      '22:30 · Клубный вход Vida Loca (15€) и правило Dehor до 23:00',
      '00:00–05:00 · Основной сет Vida Loca Radio 105 и VIP-сервис',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Шоу Old Turkey и десерты',
    buffetSubheading: 'Билет Aperitif + 1 Drink за 15€ (19:30–22:00) и запрос столиков ресторана через консьержа 24/7',
    buffetCardTitle: 'Американский Royal Buffet и индейка Old Turkey (15€)',
    tablesCardTitle: 'VIP-столы Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Все 7 подтвержденных тарифов Xceed #249216',
    tiersSubheading: 'Прямая покупка билетов Buffet 15€, Club 15€ и столов Dehor, Dance Floor и Central онлайн',
    dressShuttleHeading: 'Возраст 21+, строгий дресс-код и парковка с бесплатным шаттлом',
    dressShuttleSubheading: 'Обязательны длинные брюки для мужчин и бесплатный трансфер гостей с парковки',
    dressOkTitle: 'Рекомендуемый дресс-код',
    dressNoTitle: 'Не допускается на входе (21+)',
    shuttleHighlightTitle: 'Парковка с бесплатным шаттлом туда и обратно',
    logisticsHeading: 'Как добраться до JustMe Milano · Метро, такси и шаттл',
    mapHeading: 'GPS координаты и карта · Viale Luigi Camoens 2',
    faqHeading: 'Частые вопросы · Thanksgiving 2026 JustMe Милан',
    venueCta: 'Страница клуба JustMe Милан',
    dec31Title: 'Планируете Новый Год 31 декабря в JustMe Милан?',
    dec31Cta: 'Смотреть 31 декабря JustMe',
    orthodoxTitle: 'Ищете Старый Новый Год 13 января в JustMe?',
    orthodoxCta: 'Смотреть 13 января JustMe Милан',
    heroLabels: [
      'Прибытие гостей под башней Torre Branca в JustMe Милан',
      'Американский Royal Buffet 19:30 и кулинарное шоу индейки Old Turkey',
      'Отапливаемая стеклянная веранда и VIP-столы Privé в JustMe',
      'Главный танцпол Vida Loca Radio 105 до 05:00 утра',
    ],
    nativeFaqs: [
      {
        q: 'Что входит в билет Aperitif + 1 Drink за 15€ на День Благодарения?',
        a: 'Вход с 19:30 до 22:00 включает один коктейль, полный доступ к Full American Style Royal Buffet с шоу Old Turkey и десертами American Dessert Selection, а также продолжение вечеринки Vida Loca.',
      },
      {
        q: 'Проводится ли регулярный четверг Viziatissima 26 ноября 2026?',
        a: 'Нет. С 26 ноября 2026 года еженедельная вечеринка Viziatissima уходит на паузу, уступая место специальному событию Happy Thanksgiving и Vida Loca Radio 105.',
      },
      {
        q: 'Какой крайний срок входа для стола Dehor Table за 320€?',
        a: 'Стол Dehor Table (320€) требует прибытия строго до 23:00; столы Dance Floor (640€), Central (1.280€), VIP Front (3.200€) и DJ Table (5.000€) оформляются по предварительной брони.',
      },
    ],
  },
  tr: {
    metaTitle: 'Şükran Günü 2026 & Vida Loca JustMe Milano | 26 Kas · 15€',
    metaDescription: `JustMe Milano Şükran Günü 26 Kasım: 19:30 Amerikan Royal Büfesi, Old Turkey Show Cooking ve Vida Loca Radio 105 partisi. Bilet 15€, VIP masa ${PHONE}.`,
    h1: 'Şükran Günü 2026 & Vida Loca JustMe Milano: Amerikan Büfesi ve Kulüp',
    subtitle: '26 Kasım 2026 Perşembe · 19:30 Amerikan Royal Büfesi & Old Turkey Show Cooking / 22:30 Vida Loca Radio 105 05:00’e kadar · Parco Sempione',
    themeTag: 'Özel Thanksgiving 2026 · Vida Loca Radio 105 · Ücretsiz Shuttle Otopark',
    dateBadge: 'Per 26 Kas 2026 · 19:30 / 05:00',
    priceBadge: 'Büfe 15€ · Club 15€ · Masalar 320€–5.000€',
    ageDressBadge: '21+ · Şık Kıyafet (Erkeklerde Uzun Pantolon Zorunlu)',
    leadIntro: '26 Kasım 2026 Perşembe günü JustMe Milano, Parco Sempione’de ışıklandırılmış Torre Branca altında Şükran Günü’nü kutluyor: 19:30’da canlı Old Turkey Show Cooking içeren Full American Style Royal Buffet açılıyor, 22:30’dan 05:00’e kadar Vida Loca Radio 105 sürüyor.',
    extraNativeParagraph: '26 Kasım’dan itibaren haftalık Viziatissima gecesi ara verirken, geleneksel Amerikan lezzetleri ve American Dessert Selection ile House, Hip-Hop, Hits, EDM ve Reggaeton bir araya geliyor.',
    homeLabel: 'Ana Sayfa',
    eventsLabel: 'Milano Etkinlikleri',
    specialLabel: 'Özel Etkinlikler',
    ctaBuyNowLabel: 'Online Satın Al (15€ – 1.280€)',
    ctaXceedLabel: 'Resmi Xceed Sayfası #249216',
    ctaWhatsappLabel: 'Restoran Masası & VIP Concierge 24/7',
    ctaShuttleLabel: 'Ücretsiz Shuttle Otopark Haritası',
    tocTitle: 'Rehber İçeriği · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Genel Bakış ve 26 Kasım Programı',
      '2. Online Bilet & VIP Masa Ödeme (15€+)',
      '3. Amerikan Royal Büfesi & Old Turkey Show',
      '4. Tüm 7 Resmi Fiyat (Xceed #249216)',
      '5. Dress Code 21+, Ücretsiz Shuttle & Harita',
      '6. Ödeme Protokolü & Anında Onay',
      '7. Sıkça Sorulan Sorular (12 FAQ)',
    ],
    quickLabels: ['Tarih & Saatler', 'Açık Adres', 'Büfe & Müzik', 'Yaş & Kıyafet', 'Onaylı Fiyatlar', 'Ücretsiz Shuttle'],
    overviewHeading: 'Etkinlik Özeti · Milano JustMe Şükran Günü ve Vida Loca',
    timelineHeading: 'Gece Programı · 26–27 Kasım 2026',
    timelineSubheading: '19:30 Amerikan Royal Büfesinden 05:00 Vida Loca kapanışına tam akış',
    timelineTitles: [
      '19:30 · Kapı Açılışı & Full American Style Royal Buffet (15€)',
      '20:15 · Şefle Canlı Show Cooking: Ünlü Old Turkey Sunumu',
      '21:30 · American Dessert Selection & Veranda Kokteylleri',
      '22:30 · Vida Loca Radio 105 Kulüp Girişi (15€) & Dehor 23:00',
      '00:00–05:00 · Vida Loca Ana Şovu & VIP Şişe Servisi',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey Show Cooking ve Tatlılar',
    buffetSubheading: '15€ Aperitif + 1 İçecek bileti (19:30–22:00) ve WhatsApp üzerinden restoran masa talepleri',
    buffetCardTitle: 'Amerikan Royal Büfesi & Old Turkey (15€)',
    tablesCardTitle: 'Vida Loca VIP Privé Masaları (320€–5.000€)',
    tiersHeading: 'Onaylanmış Tüm 7 Resmi Tarife (Xceed #249216)',
    tiersSubheading: 'Büfe 15€, Club 15€ ve Dehor, Dance Floor, Central masalar için doğrudan online rezervasyon',
    dressShuttleHeading: '21+ Kuralları, Dress Code ve Ücretsiz Otopark Shuttle’ı',
    dressShuttleSubheading: 'Erkeklerde uzun pantolon zorunluluğu, 21+ yaş sınırı ve ücretsiz gidiş-dönüş transfer hizmeti',
    dressOkTitle: 'Uygun Kıyafet',
    dressNoTitle: 'Kapıda Kabul Edilmeyenler (21+)',
    shuttleHighlightTitle: 'Ücretsiz Shuttle Servisli Anlaşmalı Otopark',
    logisticsHeading: 'JustMe Milano Ulaşım · Metro, Taksi & Shuttle',
    mapHeading: 'GPS Koordinatları & Harita · Viale Luigi Camoens 2',
    faqHeading: 'Sık Sorulan Sorular · Thanksgiving 2026 JustMe Milano',
    venueCta: 'JustMe Milano Kulüp Profili',
    dec31Title: '31 Aralık Yılbaşı için JustMe Milano planı mı arıyorsunuz?',
    dec31Cta: '31 Aralık Yılbaşı JustMe’yi Gör',
    orthodoxTitle: '13 Ocak Ortodoks Yılbaşına mı bakıyorsunuz?',
    orthodoxCta: '13 Ocak JustMe Milano’yu Gör',
    heroLabels: [
      'JustMe Milano Torre Branca altında akşam karşılaması',
      '19:30 Amerikan Royal Büfesi ve canlı Old Turkey Show Cooking',
      'Isıtmalı cam verandada VIP Privé şişe servisi',
      '05:00’e kadar Vida Loca Radio 105 ana dans pisti',
    ],
    nativeFaqs: [
      {
        q: '15€ Aperitif + 1 Drink Şükran Günü biletine neler dahil?',
        a: '19:30 ile 22:00 arası girişte 1 içecek, canlı Old Turkey Show Cooking sunumlu Full American Style Royal Buffet ve American Dessert Selection erişiminin yanı sıra Vida Loca kulüp partisine kesintisiz devam hakkı içerir.',
      },
      {
        q: '26 Kasım 2026 Perşembe günü Viziatissima gecesi yapılıyor mu?',
        a: 'Hayır. 26 Kasım 2026 Perşembe gününden itibaren Viziatissima serisi ara vererek yerini özel Happy Thanksgiving ve Vida Loca Radio 105 etkinliğine bırakmaktadır.',
      },
      {
        q: '320€ Dehor Table için son giriş saati nedir?',
        a: 'Dehor Table (320€) rezervasyonları için en geç 23:00’e kadar giriş yapılmalıdır; Pista (640€), Central (1.280€), VIP Front (3.200€) ve DJ Table (5.000€) doğrudan koordine edilir.',
      },
    ],
  },
  zh: {
    metaTitle: '2026 感恩节 & Vida Loca JustMe 米兰 | 11月26日 · 15€',
    metaDescription: `2026年11月26日 周四 米兰 JustMe Milano 感恩节专场：19:30 美式皇家自助 Old Turkey 现场火鸡秀，22:30 Vida Loca Radio 105。15€门票与VIP卡座 ${PHONE}。`,
    h1: '2026 年 感恩节 & Vida Loca @ JustMe 米兰：美式 皇家 自助 晚宴 与 电音 派对',
    subtitle: '2026 年 11 月 26 日 星期四 · 19:30 美式 皇家 自助 & Old Turkey 火鸡 秀 / 22:30 Vida Loca Radio 105 至 05:00 · Parco Sempione',
    themeTag: '官方 感恩节 盛典 2026 · Vida Loca Radio 105 · 免费 接驳 停车场',
    dateBadge: '2026年11月26日 周四 · 19:30 / 05:00',
    priceBadge: '自助 15€ · 夜店 15€ · 卡座 320€–5.000€',
    ageDressBadge: '21+ · 优雅 着装 (男士 必须 长裤)',
    leadIntro: '2026 年 11 月 26 日 星期四，米兰 地标 俱乐部 JustMe Milano 将于 斯福尔扎 城堡 Parco Sempione 公园 Torre Branca 铁塔 下 举行 2026 感恩节 盛大 派对。当晚 19:30 率先 开启 Full American Style Royal Buffet 全套 美式 皇家 自助 盛宴 及 主厨 现场 烹饪 经典 老式 烤火鸡 Old Turkey Show Cooking，22:30 起 接档 Radio 105 王牌 巡演 Vida Loca 直至 凌晨 05:00。',
    extraNativeParagraph: '根据 俱乐部 官方 通知，周四 常规 场次 Viziatissima 将从 11 月 26 日 起 正式 暂停，全面 升级 为 感恩节 特别版 与 Vida Loca 主题 夜，汇聚 美式 甜点 精选 American Dessert Selection 以及 House、Hip-Hop、热门 金曲、EDM 与 Reggaeton。',
    homeLabel: '首页',
    eventsLabel: '米兰活动',
    specialLabel: '特别主题夜',
    ctaBuyNowLabel: '网站 直接 购票 (15€ – 1.280€)',
    ctaXceedLabel: '打开 官方 Xceed #249216',
    ctaWhatsappLabel: '24/7 餐厅 餐桌 & VIP 礼宾 预订',
    ctaShuttleLabel: '免费 接驳 停车场 地图',
    tocTitle: '指南 目录 · 2026 米兰 JustMe 感恩节',
    tocLabels: [
      '1. 活动 概览 与 11月26日 流程',
      '2. 在线 购票 与 卡座 结账 (15€起)',
      '3. 美式 皇家 自助 与 Old Turkey 火鸡 秀',
      '4. Xceed #249216 全 7 档 官方 价格',
      '5. 着装 21+ 要求、免费 接驳车 与 地图',
      '6. 官方 付款 与 确认 流程',
      '7. 常见 问题 解答 (12 条)',
    ],
    quickLabels: ['日期 与 时段', '精准 地址', '自助 与 音乐', '年龄 与 着装', '官方 确认 价格', '免费 接驳 停车'],
    overviewHeading: '活动 全景 · 2026 感恩节 与 Vida Loca 米兰',
    timelineHeading: '完整 夜晚 时间表 · 11 月 26 日 至 27 日',
    timelineSubheading: '从 19:30 美式 皇家 自助 与 火鸡 雕刻 秀 至 次日 05:00 Vida Loca 闭场',
    timelineTitles: [
      '19:30 · 入场 迎宾 与 Full American Royal Buffet (15€)',
      '20:15 · 现场 烹饪 秀 Show Cooking：经典 Old Turkey 火鸡',
      '21:30 · 美式 甜点 精选 American Dessert Selection & 鸡尾酒',
      '22:30 · Vida Loca Radio 105 夜店 入场 (15€) & Dehor 截止 23:00',
      '00:00–05:00 · Vida Loca 主场 狂欢 与 VIP 香槟 卡座',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey 火鸡 秀 与 甜点',
    buffetSubheading: '15€ 餐前酒 + 1 杯 饮品 门票 (19:30–22:00) 及 24/7 WhatsApp 礼宾 餐厅 订座',
    buffetCardTitle: '美式 皇家 自助 盛宴 & Old Turkey 火鸡 (15€)',
    tablesCardTitle: 'Vida Loca Radio 105 VIP 尊享 卡座 (320€–5.000€)',
    tiersHeading: '全部 7 项 Xceed #249216 官方 确认 价格',
    tiersSubheading: '支持 网站 原生 结账 15€ 自助 票、15€ 夜店 票 及 320€/640€/1.280€ 桌位，或 礼宾 直订 前排 与 DJ 台',
    dressShuttleHeading: '21+ 门禁 规则、男士 长裤 着装 与 免费 接驳 停车场',
    dressShuttleSubheading: '严格 执行 21 周岁 以上 优雅 礼服 规范，提供 合作 停车场 免费 往返 穿梭 巴士',
    dressOkTitle: '推荐 优雅 穿搭',
    dressNoTitle: '谢绝 入场 着装 (21+)',
    shuttleHighlightTitle: '合作 停车场 免费 接驳 穿梭车 直达 Torre Branca',
    logisticsHeading: '前往 JustMe Milano 交通 指南 · 地铁、出租车 与 接驳车',
    mapHeading: 'GPS 定位 与 地图 · Viale Luigi Camoens 2',
    faqHeading: '常见 问题 · 2026 米兰 JustMe 感恩节',
    venueCta: 'JustMe 米兰 场地 档案',
    dec31Title: '同时 计划 12 月 31 日 米兰 JustMe 跨年 盛典 吗？',
    dec31Cta: '查看 12月31日 盖茨比 跨年',
    orthodoxTitle: '关注 2027 年 1 月 13 日 东正教 新年 夜 吗？',
    orthodoxCta: '查看 1月13日 JustMe 专场',
    heroLabels: [
      '秋夜 宾客 抵达 Torre Branca 铁塔 下 JustMe 米兰 正门',
      '19:30 美式 皇家 自助 盛宴 与 Old Turkey 现场 切肉 烹饪 秀',
      'JustMe 恒温 玻璃 景观 长廊 VIP Privé 尊享 香槟 卡座',
      'Vida Loca Radio 105 主舞池 狂欢 持续 至 凌晨 05:00',
    ],
    nativeFaqs: [
      {
        q: '15€ 感恩节 餐前酒 + 1 饮品 门票 包含 哪些 内容？',
        a: '19:30 至 22:00 之间 凭 15€ 门票 入场 即可 获赠 1 杯 鸡尾酒，并 尊享 Full American Style Royal Buffet 美式 皇家 自助、Old Turkey 火鸡 现场 秀 及 American Dessert Selection，且 直接 保留 当晚 Vida Loca 派对 资格。',
      },
      {
        q: '2026 年 11 月 26 日 周四 常规 场次 Viziatissima 是否 照常 举行？',
        a: '不 举行。根据 俱乐部 官方 通告，周四 常规 派对 Viziatissima 自 2026 年 11 月 26 日 起 暂停，当晚 专场 呈现 Happy Thanksgiving 美式 自助 与 Vida Loca Radio 105。',
      },
      {
        q: '320€ Dehor 卡座 的 最晚 入场 时间 是 几点？',
        a: '预订 320€ Dehor Table 的 宾客 需在 23:00 前 抵达 入场；舞池 640€、中央 1.280€、VIP 前排 3.200€ 及 DJ 台 5.000€ 可 联系 24/7 礼宾 协调。',
      },
    ],
  },
  ar: {
    metaTitle: 'عيد الشكر 2026 & Vida Loca جاست مي ميلانو | 26 نوف · 15€',
    metaDescription: `احتفال عيد الشكر 2026 في JustMe ميلانو الخميس 26 نوفمبر: بوفيه أمريكي 19:30 مع عرض Old Turkey وحفل Vida Loca Radio 105. تذاكر 15€ وطاولات ${PHONE}.`,
    h1: 'عيد الشكر 2026 & Vida Loca في جاست مي ميلانو: البوفيه الملكي والنادي',
    subtitle: 'الخميس 26 نوفمبر 2026 · 19:30 البوفيه الأمريكي الملكي وعرض Old Turkey / 22:30 Vida Loca Radio 105 حتى 05:00 · باركو سيمبيوني',
    themeTag: 'حفل عيد الشكر 2026 · Vida Loca Radio 105 · موقف سيارات مع حافلة مجانية',
    dateBadge: 'الخميس 26 نوفمبر 2026 · 19:30 / 05:00',
    priceBadge: 'بوفيه 15€ · دخول 15€ · طاولات 320€–5.000€',
    ageDressBadge: '21+ · ملابس أنيقة (بنطال طويل إلزامي للرجال)',
    leadIntro: 'يحتفل نادي JustMe Milano يوم الخميس 26 نوفمبر 2026 بعيد الشكر تحت برج Torre Branca المضيء في باركو سيمبيوني، حيث يفتح أبوابه الساعة 19:30 ببوفيه أمريكي ملكي متكامل وعرض حي لطهي الديك الرومي الشهير Old Turkey، تليه سهرة Vida Loca مع Radio 105 من 22:30 حتى 05:00 صباحاً.',
    extraNativeParagraph: 'مع توقف سهرة الخميس الأسبوعية Viziatissima مؤقتاً بدءاً من 26 نوفمبر، تجمع هذه النسخة الخاصة بين المأكولات الأمريكية التقليدية وتشكيلة الحلويات الأمريكية مع موسيقى House وHip-Hop وHits وEDM وReggaeton.',
    homeLabel: 'الرئيسية',
    eventsLabel: 'فعاليات ميلانو',
    specialLabel: 'سهرات خاصة',
    ctaBuyNowLabel: 'احجز عبر الموقع (15€ – 1.280€)',
    ctaXceedLabel: 'رابط Xceed الرسمي #249216',
    ctaWhatsappLabel: 'حجز طاولات المطعم وVIP 24/7',
    ctaShuttleLabel: 'خريطة الموقف والحافلة المجانية',
    tocTitle: 'دليل السهرة · عيد الشكر 2026 جاست مي ميلانو',
    tocLabels: [
      '1. نظرة عامة وجدول ليلة 26 نوفمبر',
      '2. شراء التذاكر والطاولات أونلاين (15€+)',
      '3. البوفيه الأمريكي الملكي وعرض Old Turkey',
      '4. جميع الأسعار السبعة الرسمية Xceed #249216',
      '5. قواعد اللباس 21+ والحافلة المجانية والخريطة',
      '6. شروط الدفع والتأكيد الفوري',
      '7. الأسئلة الشائعة (12 سؤال)',
    ],
    quickLabels: ['التاريخ والأوقات', 'العنوان الدقيق', 'البوفيه والموسيقى', 'العمر واللباس', 'الأسعار الرسمية', 'حافلة الموقف'],
    overviewHeading: 'نظرة عامة · عيد الشكر وVida Loca في جاست مي ميلانو',
    timelineHeading: 'برنامج السهرة الكامل · 26–27 نوفمبر 2026',
    timelineSubheading: 'من البوفيه الأمريكي الساعة 19:30 حتى ختام سهرة Vida Loca الساعة 05:00 فجراً',
    timelineTitles: [
      '19:30 · فتح الأبواب والبوفيه الأمريكي الملكي (15€)',
      '20:15 · عرض الطهي الحي للديك الرومي الشهير Old Turkey',
      '21:30 · تشكيلة الحلويات الأمريكية والمشروبات المسائية',
      '22:30 · انطلاق سهرة النادي Vida Loca (15€) وحد الدخول للـ Dehor 23:00',
      '00:00–05:00 · ذروة عروض Vida Loca Radio 105 وخدمة طاولات VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · عرض Old Turkey والحلويات',
    buffetSubheading: 'تذكرة أبيريتيف + مشروب 15€ (19:30–22:00) واستفسارات طاولات المطعم عبر واتساب 24/7',
    buffetCardTitle: 'البوفيه الأمريكي الملكي وOld Turkey (15€)',
    tablesCardTitle: 'طاولات VIP Privé سهرة Vida Loca (320€–5.000€)',
    tiersHeading: 'جميع الأسعار السبعة المؤكدة رسمياً (Xceed #249216)',
    tiersSubheading: 'حجز فوري لتذاكر البوفيه والنادي وطاولات Dehor وDance Floor وCentral أو استشارة كونسيرج VIP',
    dressShuttleHeading: 'الدخول 21+ واللباس الرسمي وخدمة الحافلة المجانية',
    dressShuttleSubheading: 'يشترط عمر 21 عاماً فما فوق وارتداء بنطال طويل للرجال مع نقل مجاني من الموقف المعتمد',
    dressOkTitle: 'اللباس الموصى به',
    dressNoTitle: 'غير مسموح عند الباب (21+)',
    shuttleHighlightTitle: 'موقف سيارات مع خدمة حافلة مجانية ذهاباً وإياباً',
    logisticsHeading: 'كيفية الوصول إلى JustMe Milano · المترو والتاكسي والحافلة',
    mapHeading: 'إحداثيات GPS والخريطة · Viale Luigi Camoens 2',
    faqHeading: 'الأسئلة الشائعة · عيد الشكر 2026 جاست مي ميلانو',
    venueCta: 'ملف نادي جاست مي ميلانو',
    dec31Title: 'هل تخطط أيضاً لليلة رأس السنة 31 ديسمبر في JustMe؟',
    dec31Cta: 'شاهد حفل 31 ديسمبر JustMe',
    orthodoxTitle: 'هل تبحث عن رأس السنة الأرثوذكسية 13 يناير في JustMe؟',
    orthodoxCta: 'شاهد حفل 13 يناير JustMe',
    heroLabels: [
      'وصول الضيوف ليلاً أسفل برج Torre Branca في JustMe ميلانو',
      'بوفيه عيد الشكر الأمريكي الساعة 19:30 وعرض تقطيع الديك الرومي Old Turkey',
      'طاولات VIP Privé داخل الشرفة الزجاجية المدفأة في JustMe',
      'ساحة الرقص الرئيسية مع Vida Loca Radio 105 حتى الساعة 05:00 فجراً',
    ],
    nativeFaqs: [
      {
        q: 'ماذا تشمل تذكرة 15€ Aperitif + 1 Drink لعيد الشكر في JustMe؟',
        a: 'الدخول بين 19:30 و22:00 يشمل مشروباً واحداً ودخولاً كاملاً إلى البوفيه الأمريكي الملكي مع عرض Old Turkey الحي والحلويات الأمريكية، مع البقاء طوال الليل لحفلة Vida Loca.',
      },
      {
        q: 'هل تقام سهرة Viziatissima الأسبوعية يوم الخميس 26 نوفمبر 2026؟',
        a: 'لا. تتوقف سهرة Viziatissima رسمياً اعتباراً من الخميس 26 نوفمبر 2026 لإفساح المجال لاحتفالية عيد الشكر وبوفيه Old Turkey وحفلة Vida Loca Radio 105.',
      },
      {
        q: 'ما هو آخر موعد لدخول طاولة Dehor (320€)؟',
        a: 'يجب على ضيوف طاولة Dehor (320€) الدخول قبل الساعة 23:00؛ بينما تتوفر طاولات Dance Floor (640€) وCentral (1.280€) وVIP Front (3.200€) وDJ (5.000€) بتنسيق مرن.',
      },
    ],
  },
  bg: {
    metaTitle: 'Ден на благодарността 2026 & Vida Loca JustMe Милано | 15€',
    metaDescription: `Thanksgiving 2026 в JustMe Милано 26 ноември: 19:30 Американски бюфет с шоу Old Turkey и парти Vida Loca Radio 105. Билет 15€, VIP маси ${PHONE}.`,
    h1: 'Ден на благодарността 2026 & Vida Loca в JustMe Милано',
    subtitle: 'Четвъртък 26 ноември 2026 · 19:30 Американски Роял Бюфет & Old Turkey Show / 22:30 Vida Loca Radio 105 до 05:00 · Parco Sempione',
    themeTag: 'Специален Thanksgiving 2026 · Vida Loca Radio 105 · Безплатен паркинг шатъл',
    dateBadge: 'Чет 26 Ное 2026 · 19:30 / 05:00',
    priceBadge: 'Бюфет 15€ · Клуб 15€ · Маси 320€–5.000€',
    ageDressBadge: '21+ · Елегантен стил (задължителен дълъг панталон)',
    leadIntro: 'В четвъртък, 26 ноември 2026 г., JustMe Milano празнува Деня на благодарността под осветената кула Torre Branca в Парко Семпионе: вратите отварят в 19:30 с Full American Style Royal Buffet и шоу готвене на Old Turkey, а от 22:30 до 05:00 следва Vida Loca Radio 105.',
    extraNativeParagraph: 'Седмичната вечер Viziatissima излиза в пауза от 26 ноември, за да отстъпи място на празничния американски бюфет, десертната селекция и DJ микс от House, Hip-Hop, Hits, EDM и Reggaeton.',
    homeLabel: 'Начало',
    eventsLabel: 'Събития Милано',
    specialLabel: 'Специални събития',
    ctaBuyNowLabel: 'Купи Онлайн (15€ – 1.280€)',
    ctaXceedLabel: 'Официален Xceed #249216',
    ctaWhatsappLabel: 'Ресторант и VIP Консиерж 24/7',
    ctaShuttleLabel: 'Паркинг с безплатен шатъл',
    tocTitle: 'Съдържание · Thanksgiving 2026 JustMe Милано',
    tocLabels: [
      '1. Преглед и програма за 26 ноември',
      '2. Онлайн билети и VIP маси (от 15€)',
      '3. Американски бюфет и шоу Old Turkey',
      '4. Всички 7 официални тарифи Xceed #249216',
      '5. Дрескод 21+, безплатен шатъл и карта',
      '6. Условия за плащане и потвърждение',
      '7. Често задавани въпроси (12 FAQ)',
    ],
    quickLabels: ['Дата и часове', 'Точен адрес', 'Бюфет и музика', 'Възраст и дрескод', 'Официални цени', 'Безплатен шатъл'],
    overviewHeading: 'Преглед · Ден на благодарността и Vida Loca в JustMe Милано',
    timelineHeading: 'Пълна програма на нощта · 26–27 ноември 2026',
    timelineSubheading: 'От американския бюфет в 19:30 до финала на Vida Loca в 05:00 сутринта',
    timelineTitles: [
      '19:30 · Отваряне и Full American Style Royal Buffet (15€)',
      '20:15 · Шоу готвене на живо: известната пуйка Old Turkey',
      '21:30 · American Dessert Selection & коктейли',
      '22:30 · Клубен вход Vida Loca Radio 105 (15€) & Dehor до 23:00',
      '00:00–05:00 · Основно шоу Vida Loca & VIP обслужване',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Десерти',
    buffetSubheading: 'Билет Aperitif + 1 питие 15€ (19:30–22:00) и запитване за ресторантски маси 24/7 по WhatsApp',
    buffetCardTitle: 'Американски Роял Бюфет & Old Turkey (15€)',
    tablesCardTitle: 'VIP Маси Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Всички 7 официални тарифи Xceed #249216',
    tiersSubheading: 'Директна онлайн резервация за бюфет, клуб, Dehor, Pista и Central маси',
    dressShuttleHeading: 'Селекция 21+, дрескод и безплатен паркинг шатъл',
    dressShuttleSubheading: 'Строг контрол 21+ и дълъг панталон за мъжете с безплатен транспорт от партньорски паркинг',
    dressOkTitle: 'Препоръчано облекло',
    dressNoTitle: 'Недопустимо на входа (21+)',
    shuttleHighlightTitle: 'Паркинг с безплатен шатъл до Torre Branca',
    logisticsHeading: 'Как да стигнете до JustMe Milano · Метро и шатъл',
    mapHeading: 'GPS координати и карта · Viale Luigi Camoens 2',
    faqHeading: 'Често задавани въпроси · Thanksgiving 2026 JustMe',
    venueCta: 'Профил на клуб JustMe Милано',
    dec31Title: 'Търсите ли и Нова година 31 декември в JustMe Милано?',
    dec31Cta: 'Виж 31 декември JustMe',
    orthodoxTitle: 'Интересувате ли се от Стара Нова Година на 13 януари?',
    orthodoxCta: 'Виж 13 януари JustMe',
    heroLabels: [
      'Вечерно пристигане под Torre Branca пред JustMe Милано',
      'Американски Роял Бюфет в 19:30 и живо шоу Old Turkey',
      'Отопляема стъклена веранда с VIP Privé маси в JustMe',
      'Дансинг с турнето Vida Loca Radio 105 до 05:00 часа',
    ],
    nativeFaqs: [
      {
        q: 'Какво включва билетът Aperitif + 1 Drink за 15€ на 26 ноември?',
        a: 'Входът между 19:30 и 22:00 включва 1 напитка, достъп до Full American Style Royal Buffet с шоу готвене на Old Turkey и American Dessert Selection, както и оставане за партито Vida Loca.',
      },
      {
        q: 'Ще се проведе ли седмичното парти Viziatissima на 26 ноември?',
        a: 'Не. От четвъртък 26 ноември 2026 г. Viziatissima излиза в официална пауза за специалната нощ Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'До колко часа важи входът за Dehor Table (320€)?',
        a: 'Гостите с Dehor Table (320€) трябва да влязат до 23:00 ч.; масите Dance Floor (640€), Central (1.280€), VIP Front (3.200€) и DJ Table (5.000€) са с пълна координация.',
      },
    ],
  },
  hr: {
    metaTitle: 'Dan zahvalnosti 2026 & Vida Loca JustMe Milano | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 JustMe Milano čet 26.11.: 19:30 Američki Buffet, Old Turkey Show & Vida Loca Radio 105. Karta 15€, VIP ${PHONE}.`,
    h1: 'Dan zahvalnosti 2026 & Vida Loca u JustMe Milano: Buffet i Club',
    subtitle: 'Četvrtak, 26. studenoga 2026. · 19:30 Full American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 do 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving Specijal 2026 · Vida Loca Radio 105 · Besplatan Parking Shuttle',
    dateBadge: 'Čet 26. Stu 2026. · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Stolovi 320€–5.000€',
    ageDressBadge: '21+ · Elegantan (obavezne duge hlače za gospodu)',
    leadIntro: 'U četvrtak 26. studenoga 2026. JustMe Milano ispod tornja Torre Branca slavi Dan zahvalnosti: od 19:30 goste očekuje Full American Style Royal Buffet uz live Show Cooking slavnog Old Turkeyja, a od 22:30 do 05:00 klupska turneja Vida Loca Radio 105.',
    extraNativeParagraph: 'Budući da redovni četvrtak Viziatissima pauzira od 26. studenoga, večer donosi američke specijalitete, American Dessert Selection i glazbu House, Hip-Hop, Hits, EDM i Reggaeton.',
    homeLabel: 'Početna',
    eventsLabel: 'Događanja Milano',
    specialLabel: 'Posebni eventi',
    ctaBuyNowLabel: 'Kupi Online (15€ – 1.280€)',
    ctaXceedLabel: 'Službeni Xceed #249216',
    ctaWhatsappLabel: 'Restoran i VIP Concierge 24/7',
    ctaShuttleLabel: 'Parking i besplatni shuttle',
    tocTitle: 'Sadržaj vodiča · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Pregled i satnica 26. studenoga',
      '2. Online kupnja ulaznica i stolova (15€+)',
      '3. Američki Royal Buffet i Old Turkey Show',
      '4. Svih 7 službenih cijena Xceed #249216',
      '5. Dress Code 21+, besplatan shuttle i karta',
      '6. Pravila plaćanja i potvrde',
      '7. Često postavljana pitanja (12 FAQ)',
    ],
    quickLabels: ['Datum i satnica', 'Točna adresa', 'Buffet i glazba', 'Dob i dress code', 'Potvrđene cijene', 'Besplatni shuttle'],
    overviewHeading: 'Pregled večeri · Thanksgiving Day & Vida Loca u Milanu',
    timelineHeading: 'Satnica noći · 26.–27. studenoga 2026.',
    timelineSubheading: 'Od američkog bifea u 19:30 do zatvaranja Vida Loca programa u 05:00 ujutro',
    timelineTitles: [
      '19:30 · Otvaranje vrata i Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking čuvenog Old Turkeyja',
      '21:30 · American Dessert Selection & kokteli',
      '22:30 · Klupski ulaz Vida Loca (15€) & Dehor rok 23:00',
      '00:00–05:00 · Glavni party Vida Loca Radio 105 & VIP stolovi',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Deserti',
    buffetSubheading: 'Ulaznica Aperitif + 1 piće 15€ (19:30–22:00) i upiti za restoranske stolove 24/7 na WhatsApp',
    buffetCardTitle: 'Američki Royal Buffet & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé stolovi Vida Loca (320€–5.000€)',
    tiersHeading: 'Svih 7 potvrđenih tarifa Xceed #249216',
    tiersSubheading: 'Izravna online rezervacija za Buffet, Club i Dehor, Pista i Central stolove',
    dressShuttleHeading: 'Dob 21+, dress code i parking s besplatnim shuttleom',
    dressShuttleSubheading: 'Obavezne duge hlače za muškarce (21+) i besplatan prijevoz s partnerskog parkirališta',
    dressOkTitle: 'Preporučena odjeća',
    dressNoTitle: 'Nije dopušteno (21+)',
    shuttleHighlightTitle: 'Parkiralište s besplatnim shuttle prijevozom',
    logisticsHeading: 'Kako doći do JustMe Milano · Metro i shuttle',
    mapHeading: 'GPS koordinate i karta · Viale Luigi Camoens 2',
    faqHeading: 'Česta pitanja · Thanksgiving 2026 JustMe Milano',
    venueCta: 'Profil kluba JustMe Milano',
    dec31Title: 'Tražite i Doček Nove godine 31.12. u JustMe Milano?',
    dec31Cta: 'Vidi 31.12. Doček JustMe',
    orthodoxTitle: 'Zanima vas i Pravoslavna Nova godina 13.1. u JustMe?',
    orthodoxCta: 'Vidi 13.1. JustMe Milano',
    heroLabels: [
      'Dolazak gostiju ispod tornja Torre Branca ispred JustMe Milano',
      'Američki Royal Buffet u 19:30 i live Show Cooking purice Old Turkey',
      'Grijana staklena veranda s VIP Privé stolovima u JustMe',
      'Glavni podij uz Vida Loca Radio 105 do 05:00 sati',
    ],
    nativeFaqs: [
      {
        q: 'Što uključuje ulaznica Aperitif + 1 piće od 15€ za Thanksgiving?',
        a: 'Ulazak između 19:30 i 22:00 obuhvaća jedno piće, pristup Full American Style Royal Buffetu uz live Show Cooking Old Turkeyja i American Dessert Selection te ostanak na klupskom partiju Vida Loca.',
      },
      {
        q: 'Održava li se četvrtkom Viziatissima 26. studenoga 2026.?',
        a: 'Ne. Od četvrtka 26. studenoga 2026. program Viziatissima odlazi na pauzu kako bi ustupio mjesto specijalnoj večeri Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Do koliko sati vrijedi ulazak za stol Dehor (320€)?',
        a: 'Gosti stola Dehor (320€) moraju ući do 23:00; Dance Floor (640€), Central (1.280€), VIP Front (3.200€) i DJ Table (5.000€) dogovaraju se izravno s conciergeom.',
      },
    ],
  },
  cs: {
    metaTitle: 'Díkůvzdání 2026 & Vida Loca JustMe Milán | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 v JustMe Milán čt 26.11.: 19:30 Americký bufet s Old Turkey Show Cooking a párty Vida Loca Radio 105. Vstup 15€, VIP ${PHONE}.`,
    h1: 'Díkůvzdání 2026 & Vida Loca v JustMe Milán: Americký bufet a klub',
    subtitle: 'Čtvrtek 26. listopadu 2026 · 19:30 Americký Royal Buffet & Old Turkey Show Cooking / 22:30 Vida Loca Radio 105 do 05:00 · Parco Sempione',
    themeTag: 'Speciál Thanksgiving 2026 · Vida Loca Radio 105 · Parkování s kyvadlovou dopravou zdarma',
    dateBadge: 'Čt 26. Lis 2026 · 19:30 / 05:00',
    priceBadge: 'Bufet 15€ · Klub 15€ · Stoly 320€–5.000€',
    ageDressBadge: '21+ · Elegantní styl (pánové dlouhé kalhoty)',
    leadIntro: 'Ve čtvrtek 26. listopadu 2026 slaví JustMe Milano pod osvětlenou věží Torre Branca v parku Sempione Den díkůvzdání: v 19:30 otevírá Full American Style Royal Buffet se živou kuchařskou show Old Turkey a od 22:30 do 05:00 následuje Vida Loca Radio 105.',
    extraNativeParagraph: 'Čtvrteční noc Viziatissima má od 26. listopadu pauzu a nahrazuje ji sváteční americké menu, výběr American Dessert Selection a sety House, Hip-Hop, Hits, EDM a Reggaeton.',
    homeLabel: 'Domů',
    eventsLabel: 'Události Milán',
    specialLabel: 'Speciální akce',
    ctaBuyNowLabel: 'Koupit Online (15€ – 1.280€)',
    ctaXceedLabel: 'Oficiální Xceed #249216',
    ctaWhatsappLabel: 'Rezervace restaurace & VIP 24/7',
    ctaShuttleLabel: 'Parkování se svozem zdarma',
    tocTitle: 'Obsah průvodce · Thanksgiving 2026 JustMe Milán',
    tocLabels: [
      '1. Přehled a harmonogram 26. listopadu',
      '2. Online vstupenky a stoly (od 15€)',
      '3. Americký Royal Buffet & Old Turkey Show',
      '4. Všech 7 oficiálních cen Xceed #249216',
      '5. Dress Code 21+, bezplatný shuttle a mapa',
      '6. Platební podmínky a potvrzení',
      '7. Často kladené dotazy (12 FAQ)',
    ],
    quickLabels: ['Datum a časy', 'Přesná adresa', 'Bufet a hudba', 'Věk a dress code', 'Ověřené ceny', 'Shuttle zdarma'],
    overviewHeading: 'Přehled večera · Thanksgiving & Vida Loca v JustMe Milán',
    timelineHeading: 'Harmonogram večera · 26.–27. listopadu 2026',
    timelineSubheading: 'Od amerického rautu v 19:30 až po klubové finále Vida Loca v 05:00 ráno',
    timelineTitles: [
      '19:30 · Otevření a Full American Style Royal Buffet (15€)',
      '20:15 · Živé Show Cooking slavného krocana Old Turkey',
      '21:30 · American Dessert Selection & koktejly',
      '22:30 · Klubový vstup Vida Loca (15€) & limit Dehor 23:00',
      '00:00–05:00 · Hlavní show Vida Loca Radio 105 & VIP servis',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Dezerty',
    buffetSubheading: 'Vstupenka Aperitif + 1 Drink 15€ (19:30–22:00) a poptávky stolů v restauraci přes WhatsApp',
    buffetCardTitle: 'Americký Royal Buffet & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Stoly Vida Loca (320€–5.000€)',
    tiersHeading: 'Všech 7 potvrzených tarifů Xceed #249216',
    tiersSubheading: 'Okamžitý online nákup vstupů a stolů Dehor, Pista a Central bez skrytých poplatků',
    dressShuttleHeading: 'Věk 21+, Dress Code a bezplatná kyvadlová doprava',
    dressShuttleSubheading: 'Dlouhé kalhoty povinné pro muže a bezplatný shuttle z partnerského parkoviště',
    dressOkTitle: 'Doporučené oblečení',
    dressNoTitle: 'Nepovolené u vstupu (21+)',
    shuttleHighlightTitle: 'Parkoviště se bezplatným shuttelem k Torre Branca',
    logisticsHeading: 'Jak se dostat do JustMe Milano · Metro a shuttle',
    mapHeading: 'GPS souřadnice a mapa · Viale Luigi Camoens 2',
    faqHeading: 'Časté otázky · Thanksgiving 2026 JustMe Milán',
    venueCta: 'Profil klubu JustMe Milán',
    dec31Title: 'Hledáte také Silvestr 31. prosince v JustMe Milán?',
    dec31Cta: 'Zobrazit Silvestr 31.12. JustMe',
    orthodoxTitle: 'Hledáte i Pravoslavný Nový rok 13. ledna v JustMe?',
    orthodoxCta: 'Zobrazit 13. ledna JustMe',
    heroLabels: [
      'Večerní příchod hostů pod Torre Branca do JustMe Milán',
      'Americký Royal Buffet od 19:30 a živé Show Cooking Old Turkey',
      'Vyhřívaná prosklená veranda s VIP Privé stoly v JustMe',
      'Taneční parket s Vida Loca Radio 105 až do 05:00 ráno',
    ],
    nativeFaqs: [
      {
        q: 'Co zahrnuje vstupenka Aperitif + 1 Drink za 15€ na Díkůvzdání?',
        a: 'Vstup mezi 19:30 a 22:00 obsahuje 1 drink a přístup do Full American Style Royal Buffetu se show Old Turkey a výběrem American Dessert Selection včetně pokračování v klubu Vida Loca.',
      },
      {
        q: 'Koná se ve čtvrtek 26. listopadu 2026 pravidelná noc Viziatissima?',
        a: 'Ne. Od čtvrtka 26. listopadu 2026 má Viziatissima pauzu, aby uvolnila prostor speciálnímu vydání Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Jaký je časový limit vstupu pro stůl Dehor za 320€?',
        a: 'Hosté se stolem Dehor Table (320€) musí dorazit nejpozději do 23:00; stoly Dance Floor (640€), Central (1.280€), VIP Front (3.200€) a DJ Table (5.000€) mají individuální koordinaci.',
      },
    ],
  },
  da: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milano | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 hos JustMe Milano torsdag 26. nov: 19:30 Amerikansk Buffet, Old Turkey Show Cooking & Vida Loca Radio 105. 15€ billet, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca hos JustMe Milano: Amerikansk Buffet & Club',
    subtitle: 'Torsdag 26. november 2026 · 19:30 Full American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 til 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving Special 2026 · Vida Loca Radio 105 · Gratis Shuttle Parkering',
    dateBadge: 'Tors 26. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Borde 320€–5.000€',
    ageDressBadge: '21+ · Elegant (mænd: lange bukser påkrævet)',
    leadIntro: 'Torsdag den 26. november 2026 fejrer JustMe Milano Thanksgiving ved foden af Torre Branca i Parco Sempione med Full American Style Royal Buffet og live Show Cooking af den berømte Old Turkey fra kl. 19:30 samt Vida Loca Radio 105 fra 22:30 til 05:00.',
    extraNativeParagraph: 'Da torsdagskonceptet Viziatissima holder pause fra den 26. november, kombinerer denne særudgave amerikanske klassikere og American Dessert Selection med House, Hip-Hop, Hits, EDM og Reggaeton.',
    homeLabel: 'Hjem',
    eventsLabel: 'Events Milano',
    specialLabel: 'Særlige Events',
    ctaBuyNowLabel: 'Book Online (15€ – 1.280€)',
    ctaXceedLabel: 'Officiel Xceed #249216',
    ctaWhatsappLabel: 'Restaurant & VIP Concierge 24/7',
    ctaShuttleLabel: 'Parkering med Gratis Shuttle',
    tocTitle: 'Guideindeks · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Overblik & Tidsplan 26. November',
      '2. Online Billetter & Borde (fra 15€)',
      '3. Amerikansk Royal Buffet & Old Turkey Show',
      '4. Alle 7 Officielle Priser (Xceed #249216)',
      '5. Dresscode 21+, Gratis Shuttle & Kort',
      '6. Betaling & Øjeblikkelig Bekræftelse',
      '7. Ofte Stillede Spørgsmål (12 FAQ)',
    ],
    quickLabels: ['Dato & Tider', 'Præcis Adresse', 'Buffet & Musik', 'Alder & Dresscode', 'Officielle Priser', 'Gratis Shuttle'],
    overviewHeading: 'Overblik · Thanksgiving & Vida Loca i Parco Sempione',
    timelineHeading: 'Aftenens Tidsplan · Torsdag 26. – Fredag 27. Nov 2026',
    timelineSubheading: 'Fra kl. 19:30 Royal Buffet til kl. 05:00 Vida Loca afslutning',
    timelineTitles: [
      '19:30 · Dørene Åbner & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking med Berømt Old Turkey',
      '21:30 · American Dessert Selection & Cocktails',
      '22:30 · Club-adgang Vida Loca (15€) & Dehor Senest 23:00',
      '00:00–05:00 · Vida Loca Radio 105 Show & VIP Flaskeservice',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Desserter',
    buffetSubheading: 'Aperitif + 1 Drink til 15€ (19:30–22:00) samt restaurantborde på forespørgsel via WhatsApp',
    buffetCardTitle: 'Amerikansk Royal Buffet & Old Turkey (15€)',
    tablesCardTitle: 'Vida Loca VIP Privé Borde (320€–5.000€)',
    tiersHeading: 'Alle 7 Bekræftede Priser (Xceed #249216)',
    tiersSubheading: 'Direkte onlinebestilling af Buffet, Club, Dehor, Dance Floor & Central borde',
    dressShuttleHeading: 'Adgang 21+, Dresscode & Gratis Parkeringsshuttle',
    dressShuttleSubheading: 'Lange bukser påkrævet for mænd samt gratis shuttle fra partnerparkering',
    dressOkTitle: 'Godkendt Påklædning',
    dressNoTitle: 'Ikke Tilladt (21+)',
    shuttleHighlightTitle: 'Parkering med Gratis Shuttle til JustMe',
    logisticsHeading: 'Transport til JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Koordinater & Kort · Viale Luigi Camoens 2',
    faqHeading: 'Ofte Stillede Spørgsmål · Thanksgiving 2026',
    venueCta: 'JustMe Milano Klubprofil',
    dec31Title: 'Planlægger du også Nytårsaften 31. dec på JustMe?',
    dec31Cta: 'Se Nytår 31. Dec JustMe',
    orthodoxTitle: 'Interesseret i Ortodoks Nytår 13. jan på JustMe?',
    orthodoxCta: 'Se 13. Jan JustMe Milano',
    heroLabels: [
      'Aftenankomst under Torre Branca ved JustMe Milano',
      '19:30 Amerikansk Royal Buffet med live Old Turkey Show Cooking',
      'Opvarmet glaspavillon med VIP Privé borde hos JustMe',
      'Hoveddansegulvet med Vida Loca Radio 105 til kl. 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Hvad inkluderer 15€ Aperitif + 1 Drink billetten til Thanksgiving?',
        a: 'Ved ankomst mellem 19:30 og 22:00 får du 1 drink og adgang til Full American Style Royal Buffet med Old Turkey Show Cooking og American Dessert Selection samt adgang til Vida Loca natklubben.',
      },
      {
        q: 'Kører det faste torsdagskoncept Viziatissima den 26. november 2026?',
        a: 'Nej. Fra torsdag den 26. november 2026 holder Viziatissima pause for at give plads til denne særlige Thanksgiving & Vida Loca Radio 105 aften.',
      },
      {
        q: 'Hvornår er seneste ankomst for et 320€ Dehor Table?',
        a: 'Gæster med Dehor Table (320€) skal ankomme inden kl. 23:00; Dance Floor (640€), Central (1.280€), VIP Front (3.200€) og DJ Table (5.000€) koordineres direkte.',
      },
    ],
  },
  et: {
    metaTitle: 'Tänupühad 2026 & Vida Loca JustMe Milano | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 JustMe Milanos 26. nov: 19:30 Ameerika Buffet, Old Turkey Show Cooking ja Vida Loca Radio 105. Pilet 15€, VIP lauad ${PHONE}.`,
    h1: 'Tänupühad 2026 & Vida Loca JustMe Milanos: Buffet ja Klubi',
    subtitle: 'Neljapäev, 26. november 2026 · 19:30 Ameerika Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 kuni 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving 2026 Eri · Vida Loca Radio 105 · Tasuta Parkimisbuss',
    dateBadge: 'N 26. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Klubi 15€ · Lauad 320€–5.000€',
    ageDressBadge: '21+ · Elegantne (meestel pikad püksid kohustuslikud)',
    leadIntro: 'Neljapäeval, 26. novembril 2026 tähistab JustMe Milano Torre Branca all Parco Sempiones tänupühi: kell 19:30 avatakse Full American Style Royal Buffet koos Old Turkey Show Cookinguga ning kell 22:30–05:00 toimub Vida Loca Radio 105 pidu.',
    extraNativeParagraph: 'Kuna iganädalane Viziatissima peatub alates 26. novembrist, ühendab eriväljaanne traditsioonilised Ameerika road ja magustoidud House, Hip-Hop, Hits, EDM ja Reggaeton muusikaga.',
    homeLabel: 'Avaleht',
    eventsLabel: 'Milano Sündmused',
    specialLabel: 'Eriüritused',
    ctaBuyNowLabel: 'Broneeri Internetis (15€ – 1.280€)',
    ctaXceedLabel: 'Ametlik Xceed #249216',
    ctaWhatsappLabel: 'Restorani ja VIP Concierge 24/7',
    ctaShuttleLabel: 'Tasuta Bussiga Parkla Kaart',
    tocTitle: 'Sisukord · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Ülevaade ja 26. novembri ajakava',
      '2. Piletite ja laudade ostmine (15€+)',
      '3. Ameerika Royal Buffet & Old Turkey Show',
      '4. Kõik 7 ametlikku hinda Xceed #249216',
      '5. Dress code 21+, tasuta shuttle ja kaart',
      '6. Maksetingimused ja kinnitamine',
      '7. Korduma kippuvad küsimused (12 FAQ)',
    ],
    quickLabels: ['Kuupäev ja ajad', 'Täpne aadress', 'Buffet ja muusika', 'Vanus ja stiil', 'Ametlikud hinnad', 'Tasuta shuttle'],
    overviewHeading: 'Ülevaade · Tänupühad & Vida Loca JustMe Milanos',
    timelineHeading: 'Öö ajakava · 26.–27. november 2026',
    timelineSubheading: 'Kell 19:30 Ameerika buffeest kuni 05:00 Vida Loca lõpuni',
    timelineTitles: [
      '19:30 · Uksed ja Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking: kuulus Old Turkey kalkun',
      '21:30 · American Dessert Selection & kokteilid',
      '22:30 · Klubi Vida Loca avamine (15€) & Dehor kuni 23:00',
      '00:00–05:00 · Vida Loca Radio 105 peashow & VIP lauad',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey ja Magustoidud',
    buffetSubheading: 'Aperitiiv + 1 jook 15€ (19:30–22:00) ja restoranilaudade päringud ööpäevaringselt WhatsAppis',
    buffetCardTitle: 'Ameerika Royal Buffet & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Lauad Vida Loca (320€–5.000€)',
    tiersHeading: 'Kõik 7 ametlikku hinda (Xceed #249216)',
    tiersSubheading: 'Osta Buffet, Klubi ja Dehor, Dance Floor või Central laud otse veebis',
    dressShuttleHeading: 'Sissepääs 21+, dress code ja tasuta transfeerbuss',
    dressShuttleSubheading: 'Meestele pikad püksid kohustuslikud ning tasuta buss partnerparklast',
    dressOkTitle: 'Lubatud riietus',
    dressNoTitle: 'Keelatud uksel (21+)',
    shuttleHighlightTitle: 'Parkla tasuta edasi-tagasi shuttle-bussiga',
    logisticsHeading: 'Kuidas tulla JustMe Milanosse · Metroo ja buss',
    mapHeading: 'GPS koordinaadid ja kaart · Viale Luigi Camoens 2',
    faqHeading: 'Korduma kippuvad küsimused · Thanksgiving 2026',
    venueCta: 'JustMe Milano klubiprofiil',
    dec31Title: 'Kas plaanite ka 31. detsembri aastavahetust JustMe Milanos?',
    dec31Cta: 'Vaata 31. detsember JustMe',
    orthodoxTitle: 'Kas otsite ka 13. jaanuari õigeusu uusaastapidu?',
    orthodoxCta: 'Vaata 13. jaanuar JustMe',
    heroLabels: [
      'Saabumine Torre Branca alla JustMe Milano sissepääsu juurde',
      'Kell 19:30 Ameerika Royal Buffet ja Old Turkey Show Cooking',
      'Soojendusega klaaspaviljoni VIP Privé lauad JustMes',
      'Peamine tantsupõrand Vida Loca Radio 105 saatel kuni 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Mida sisaldab 15€ Aperitif + 1 Drink pilet tänupühadeks?',
        a: 'Sisenemisel vahemikus 19:30–22:00 sisaldab pilet ühte jooki, täielikku ligipääsu Full American Style Royal Buffetile koos Old Turkey Show Cookinguga ja Vida Loca klubipidu.',
      },
      {
        q: 'Kas tavapärane Viziatissima toimub neljapäeval, 26. novembril?',
        a: 'Ei. Alates 26. novembrist 2026 peatub Viziatissima ajutiselt, et anda ruumi Thanksgiving & Vida Loca Radio 105 eriüritusele.',
      },
      {
        q: 'Mis kellani kehtib 320€ Dehor Table sissepääs?',
        a: 'Dehor Table (320€) külalised peavad sisenema enne kella 23:00; teisi laudu (640€–5.000€) hallatakse concierge’i kaudu.',
      },
    ],
  },
  fi: {
    metaTitle: 'Kiitospäivä 2026 & Vida Loca JustMe Milano | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 JustMe Milanossa to 26.11.: 19:30 American Buffet, Old Turkey Show Cooking & Vida Loca Radio 105. Lippu 15€, VIP-pöydät ${PHONE}.`,
    h1: 'Kiitospäivä 2026 & Vida Loca JustMe Milanossa: Buffet & Klubi',
    subtitle: 'Torstai 26. marraskuuta 2026 · 19:30 Full American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 klo 05:00 asti · Parco Sempione',
    themeTag: 'Thanksgiving 2026 Erikoisilta · Vida Loca Radio 105 · Ilmainen Kuljetus',
    dateBadge: 'To 26. Mar 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Pöydät 320€–5.000€',
    ageDressBadge: '21+ · Elegantti (miehillä pitkät housut pakolliset)',
    leadIntro: 'Torstaina 26. marraskuuta 2026 JustMe Milano juhlii kiitospäivää Torre Brancan juurella Parco Sempionessa: klo 19:30 alkaa Full American Style Royal Buffet Old Turkey Show Cookingilla ja klo 22:30–05:00 syttyy Vida Loca Radio 105 -klubi-ilta.',
    extraNativeParagraph: 'Koska viikoittainen Viziatissima jää tauolle 26. marraskuuta alkaen, ilta tarjoaa aidot amerikkalaiset herkut ja jälkiruoat sekä House-, Hip-Hop-, Hits-, EDM- ja Reggaeton-soundit.',
    homeLabel: 'Etusivu',
    eventsLabel: 'Tapahtumat Milano',
    specialLabel: 'Erikoisillat',
    ctaBuyNowLabel: 'Varaa Verkossa (15€ – 1.280€)',
    ctaXceedLabel: 'Virallinen Xceed #249216',
    ctaWhatsappLabel: 'Ravintola & VIP Concierge 24/7',
    ctaShuttleLabel: 'Pysäköinti & Ilmainen Shuttle',
    tocTitle: 'Opas · Kiitospäivä 2026 JustMe Milano',
    tocLabels: [
      '1. Yleiskatsaus & 26. marraskuun aikataulu',
      '2. Verkkoliput ja pöytävaraukset (15€+)',
      '3. Amerikkalainen Buffet & Old Turkey Show',
      '4. Kaikki 7 virallista hintaa Xceed #249216',
      '5. Pukukoodi 21+, ilmainen shuttle & kartta',
      '6. Maksuprotokolla & vahvistus',
      '7. Usein kysytyt kysymykset (12 FAQ)',
    ],
    quickLabels: ['Päivä ja ajat', 'Tarkka osoite', 'Buffet & musiikki', 'Ikä ja pukukoodi', 'Vahvistetut hinnat', 'Ilmainen shuttle'],
    overviewHeading: 'Tapahtuman yleiskatsaus · Kiitospäivä & Vida Loca',
    timelineHeading: 'Illan aikataulu · 26.–27. marraskuuta 2026',
    timelineSubheading: 'Klo 19:30 buffetista klo 05:00 Vida Loca -loppuun saakka',
    timelineTitles: [
      '19:30 · Ovet & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking: kuuluisa Old Turkey -kalkkuna',
      '21:30 · American Dessert Selection & juomat',
      '22:30 · Vida Loca Radio 105 (15€) & Dehor-raja 23:00',
      '00:00–05:00 · Vida Loca pääesitys & VIP-pullopalvelu',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Jälkiruoat',
    buffetSubheading: 'Aperitivo + 1 juoma 15€ (19:30–22:00) sekä ravintolapöydät WhatsAppissa 24/7',
    buffetCardTitle: 'Amerikkalainen Royal Buffet & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Pöydät Vida Loca (320€–5.000€)',
    tiersHeading: 'Kaikki 7 virallista hintaa (Xceed #249216)',
    tiersSubheading: 'Varaa suoraan Buffet 15€, Club 15€ sekä Dehor-, Dance Floor- ja Central-pöydät',
    dressShuttleHeading: 'Ikäraja 21+, pukukoodi ja ilmainen shuttle-pysäköinti',
    dressShuttleSubheading: 'Miehillä pitkät housut pakolliset sekä maksuton shuttle-bussi kumppaniparkista',
    dressOkTitle: 'Suositeltu pukeutuminen',
    dressNoTitle: 'Kielletty sisäänpääsyssä (21+)',
    shuttleHighlightTitle: 'Kumppaniparkki maksuttomalla shuttle-kyydillä',
    logisticsHeading: 'Saapuminen JustMe Milanoon · Metro ja shuttle',
    mapHeading: 'GPS-koordinaatit & kartta · Viale Luigi Camoens 2',
    faqHeading: 'Usein kysyttyä · Kiitospäivä 2026 JustMe Milano',
    venueCta: 'JustMe Milano klubiesittely',
    dec31Title: 'Suunnitteletko myös uudenvuodenaattoa 31.12. JustMe Milanossa?',
    dec31Cta: 'Katso 31.12. JustMe Milano',
    orthodoxTitle: 'Etsitkö myös 13.1. ortodoksista uuttavuotta JustMessä?',
    orthodoxCta: 'Katso 13.1. JustMe Milano',
    heroLabels: [
      'Ilta saapuminen Torre Brancan juurella JustMe Milanossa',
      'Klo 19:30 amerikkalainen Royal Buffet ja live Old Turkey Show Cooking',
      'Lämmitetty lasipaviljonki ja VIP Privé -pöydät JustMessä',
      'Päätanssilattia Vida Loca Radio 105:n tahdissa klo 05:00 asti',
    ],
    nativeFaqs: [
      {
        q: 'Mitä 15€ Aperitif + 1 Drink -lippu sisältää kiitospäivänä?',
        a: 'Saapuminen klo 19:30–22:00 sisältää yhden juoman, Full American Style Royal Buffet -illallisen live Old Turkey Show Cookingilla sekä American Dessert Selection -pöydän ja jatkot Vida Loca -klubilla.',
      },
      {
        q: 'Järjestetäänkö torstai-ilta Viziatissima 26. marraskuuta 2026?',
        a: 'Ei. Viziatissima-sarja jää tauolle 26.11.2026 alkaen, ja sen tilalla juhlitaan Happy Thanksgiving & Vida Loca Radio 105 -erikoisiltaa.',
      },
      {
        q: 'Mihin aikaan mennessä 320€ Dehor Table -pöytään tulee saapua?',
        a: 'Dehor Table (320€) edellyttää sisäänpääsyä viimeistään klo 23:00 mennessä; muut pöydät (640€–5.000€) koordinoidaan joustavasti.',
      },
    ],
  },
  el: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Μιλάνο | 26 Νοε · 15€',
    metaDescription: `Thanksgiving 2026 JustMe Μιλάνο Πεμ 26 Νοε: 19:30 Μπουφές, Old Turkey Show & Vida Loca Radio 105. Είσοδος 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca στο JustMe Μιλάνο: Μπουφές & Club',
    subtitle: 'Πέμπτη 26 Νοεμβρίου 2026 · 19:30 Αμερικανικός Royal Μπουφές & Old Turkey / 22:30 Vida Loca Radio 105 έως 05:00 · Parco Sempione',
    themeTag: 'Ειδική Βραδιά Thanksgiving 2026 · Vida Loca Radio 105 · Δωρεάν Shuttle Parking',
    dateBadge: 'Πεμ 26 Νοε 2026 · 19:30 / 05:00',
    priceBadge: 'Μπουφές 15€ · Club 15€ · Τραπέζια 320€–5.000€',
    ageDressBadge: '21+ · Κομψό (υποχρεωτικό μακρύ παντελόνι ανδρών)',
    leadIntro: 'Την Πέμπτη 26 Νοεμβρίου 2026, το JustMe Milano γιορτάζει το Thanksgiving κάτω από τον φωτισμένο Torre Branca στο Parco Sempione: από τις 19:30 ανοίγει το Full American Style Royal Buffet με ζωντανό Show Cooking της διάσημης Old Turkey και από τις 22:30 έως τις 05:00 συνεχίζει το Vida Loca Radio 105.',
    extraNativeParagraph: 'Καθώς το εβδομαδιαίο πάρτι Viziatissima διακόπτεται από τις 26 Νοεμβρίου, η βραδιά συνδυάζει αυθεντικές αμερικανικές γεύσεις, επιδόρπια και μουσική House, Hip-Hop, Hits, EDM και Reggaeton.',
    homeLabel: 'Αρχική',
    eventsLabel: 'Εκδηλώσεις Μιλάνο',
    specialLabel: 'Ειδικές Βραδιές',
    ctaBuyNowLabel: 'Online Αγορά (15€ – 1.280€)',
    ctaXceedLabel: 'Επίσημο Xceed #249216',
    ctaWhatsappLabel: 'Εστιατόριο & VIP Concierge 24/7',
    ctaShuttleLabel: 'Πάρκινγκ με Δωρεάν Shuttle',
    tocTitle: 'Ευρετήριο Οδηγού · Thanksgiving 2026 JustMe Μιλάνο',
    tocLabels: [
      '1. Επισκόπηση & Πρόγραμμα 26 Νοεμβρίου',
      '2. Online Εισιτήρια & Τραπέζια (από 15€)',
      '3. Αμερικανικός Μπουφές & Old Turkey Show',
      '4. Όλες οι 7 Επίσημες Τιμές Xceed #249216',
      '5. Dress Code 21+, Δωρεάν Shuttle & Χάρτης',
      '6. Πρωτόκολλο Πληρωμής & Επιβεβαίωσης',
      '7. Συχνές Ερωτήσεις (12 FAQ)',
    ],
    quickLabels: ['Ημερομηνία & Ώρες', 'Ακριβής Διεύθυνση', 'Μπουφές & Μουσική', 'Ηλικία & Ντύσιμο', 'Επίσημες Τιμές', 'Δωρεάν Shuttle'],
    overviewHeading: 'Επισκόπηση Βραδιάς · Thanksgiving & Vida Loca στο Μιλάνο',
    timelineHeading: 'Πλήρες Πρόγραμμα · Πέμπτη 26 – Παρασκευή 27 Νοεμβρίου 2026',
    timelineSubheading: 'Από το Royal Buffet στις 19:30 έως το κλείσιμο του Vida Loca στις 05:00',
    timelineTitles: [
      '19:30 · Άνοιγμα & Full American Style Royal Buffet (15€)',
      '20:15 · Ζωντανό Show Cooking της διάσημης γαλοπούλας Old Turkey',
      '21:30 · American Dessert Selection & κοκτέιλ',
      '22:30 · Είσοδος Club Vida Loca (15€) & όριο Dehor 23:00',
      '00:00–05:00 · Κεντρικό Show Vida Loca Radio 105 & VIP τραπέζια',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Επιδόρπια',
    buffetSubheading: 'Εισιτήριο Aperitif + 1 Ποτό 15€ (19:30–22:00) και κρατήσεις εστιατορίου μέσω WhatsApp 24/7',
    buffetCardTitle: 'Αμερικανικός Royal Μπουφές & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Τραπέζια Vida Loca (320€–5.000€)',
    tiersHeading: 'Όλες οι 7 Επιβεβαιωμένες Τιμές Xceed #249216',
    tiersSubheading: 'Άμεση κράτηση εισιτηρίων Μπουφέ, Club και τραπεζιών Dehor, Pista & Central',
    dressShuttleHeading: 'Ηλικία 21+, Dress Code & Δωρεάν Μεταφορά',
    dressShuttleSubheading: 'Αυστηρά 21+, μακρύ παντελόνι για τους άνδρες και δωρεάν λεωφορείο από το συνεργαζόμενο πάρκινγκ',
    dressOkTitle: 'Προτεινόμενο Ντύσιμο',
    dressNoTitle: 'Απαγορεύεται στην Είσοδο (21+)',
    shuttleHighlightTitle: 'Πάρκινγκ με Δωρεάν Υπηρεσία Shuttle',
    logisticsHeading: 'Πρόσβαση στο JustMe Milano · Μετρό, Ταξί & Shuttle',
    mapHeading: 'Συντεταγμένες GPS & Χάρτης · Viale Luigi Camoens 2',
    faqHeading: 'Συχνές Ερωτήσεις · Thanksgiving 2026 JustMe Μιλάνο',
    venueCta: 'Προφίλ JustMe Μιλάνο',
    dec31Title: 'Ψάχνετε και για Πρωτοχρονιά 31 Δεκεμβρίου στο JustMe;',
    dec31Cta: 'Δείτε 31 Δεκεμβρίου JustMe',
    orthodoxTitle: 'Ενδιαφέρεστε και για 13 Ιανουαρίου στο JustMe;',
    orthodoxCta: 'Δείτε 13 Ιανουαρίου JustMe',
    heroLabels: [
      'Βραδινή άφιξη κάτω από τον Torre Branca στο JustMe Μιλάνο',
      'Αμερικανικός Royal Μπουφές 19:30 και ζωντανό Show Cooking Old Turkey',
      'Θερμαινόμενη γυάλινη βεράντα με τραπέζια VIP Privé',
      'Κεντρική πίστα με το Vida Loca Radio 105 έως τις 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Τι περιλαμβάνει το εισιτήριο 15€ Aperitif + 1 Drink στο Thanksgiving;',
        a: 'Η είσοδος μεταξύ 19:30 και 22:00 περιλαμβάνει 1 ποτό, πρόσβαση στο Full American Style Royal Buffet με Show Cooking Old Turkey και American Dessert Selection, συν παραμονή στο πάρτι Vida Loca.',
      },
      {
        q: 'Γίνεται το εβδομαδιαίο Viziatissima την Πέμπτη 26 Νοεμβρίου 2026;',
        a: 'Όχι. Από την Πέμπτη 26 Νοεμβρίου 2026 η βραδιά Viziatissima κάνει παύση για να φιλοξενήσει το ειδικό event Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Ποιο είναι το όριο άφιξης για το Dehor Table των 320€;',
        a: 'Οι κρατήσεις Dehor Table (320€) απαιτούν άφιξη έως τις 23:00· τα Dance Floor (640€), Central (1.280€), VIP Front (3.200€) και DJ Table (5.000€) κανονίζονται άμεσα.',
      },
    ],
  },
  hu: {
    metaTitle: 'Hálaadás 2026 & Vida Loca JustMe Milánó | Nov 26 · 15€',
    metaDescription: `Thanksgiving 2026 JustMe Milánó nov 26.: 19:30 Amerikai Büfé, Old Turkey Show & Vida Loca Radio 105. 15€ jegy, VIP ${PHONE}.`,
    h1: 'Hálaadás 2026 & Vida Loca a JustMe Milánóban: Amerikai Büfé és Klub',
    subtitle: '2026. november 26. csütörtök · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 05:00-ig · Parco Sempione',
    themeTag: 'Thanksgiving 2026 Különkiadás · Vida Loca Radio 105 · Ingyenes Parkoló Shuttle',
    dateBadge: 'Csü 2026. Nov 26. · 19:30 / 05:00',
    priceBadge: 'Büfé 15€ · Klub 15€ · Asztalok 320€–5.000€',
    ageDressBadge: '21+ · Elegáns (férfiaknak hosszú nadrág kötelező)',
    leadIntro: '2026. november 26-án csütörtökön a JustMe Milano a kivilágított Torre Branca alatt ünnepli a hálaadást: 19:30-kor nyit a Full American Style Royal Buffet élő Old Turkey látványfőzéssel, 22:30-tól 05:00-ig pedig a Radio 105 Vida Loca bulija következik.',
    extraNativeParagraph: 'Mivel a csütörtöki Viziatissima november 26-tól szünetel, az este az autentikus amerikai ízeket és desszerteket egyesíti a House, Hip-Hop, Hits, EDM és Reggaeton zenékkel.',
    homeLabel: 'Főoldal',
    eventsLabel: 'Milánó Programok',
    specialLabel: 'Különleges Estek',
    ctaBuyNowLabel: 'Online Foglalás (15€ – 1.280€)',
    ctaXceedLabel: 'Hivatalos Xceed #249216',
    ctaWhatsappLabel: 'Étterem és VIP Concierge 24/7',
    ctaShuttleLabel: 'Ingyenes Shuttle Parkoló',
    tocTitle: 'Útmutató Tartalom · Thanksgiving 2026 JustMe',
    tocLabels: [
      '1. Áttekintés és november 26-i menetrend',
      '2. Online jegyvásárlás és VIP asztalok (15€+)',
      '3. Amerikai Royal Büfé & Old Turkey Show',
      '4. Mind a 7 hivatalos ár (Xceed #249216)',
      '5. Dress Code 21+, ingyenes shuttle és térkép',
      '6. Fizetési szabályzat és visszaigazolás',
      '7. Gyakori kérdések (12 FAQ)',
    ],
    quickLabels: ['Dátum és időpont', 'Pontos cím', 'Büfé és zene', 'Korhatár és viselet', 'Hivatalos árak', 'Ingyenes shuttle'],
    overviewHeading: 'Esti áttekintés · Hálaadás & Vida Loca a Parco Sempionéban',
    timelineHeading: 'Teljes menetrend · November 26–27.',
    timelineSubheading: 'Az 19:30-as büfétől a hajnali 05:00-s Vida Loca fináléig',
    timelineTitles: [
      '19:30 · Kapunyitás & Full American Style Royal Buffet (15€)',
      '20:15 · Élő Show Cooking: Híres Old Turkey pulykasült',
      '21:30 · American Dessert Selection & koktélok',
      '22:30 · Vida Loca klubnyitás (15€) & Dehor határidő 23:00',
      '00:00–05:00 · Vida Loca Radio 105 főműsor & VIP asztalok',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Desszertek',
    buffetSubheading: 'Aperitif + 1 ital 15€ (19:30–22:00) és éttermi asztalkérés WhatsAppon 0-24 órában',
    buffetCardTitle: 'Amerikai Royal Büfé & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Asztalok Vida Loca (320€–5.000€)',
    tiersHeading: 'Mind a 7 megerősített tarifa (Xceed #249216)',
    tiersSubheading: 'Azonnali online vásárlás a Büfé, Klub, Dehor, Dance Floor és Central asztalokra',
    dressShuttleHeading: 'Belépés 21+, dress code és ingyenes transzferparkoló',
    dressShuttleSubheading: 'Kötelező hosszú nadrág férfiaknak és ingyenes busz a partnerparkolóból',
    dressOkTitle: 'Ajánlott megjelenés',
    dressNoTitle: 'Nem engedélyezett (21+)',
    shuttleHighlightTitle: 'Partnerparkoló ingyenes oda-vissza shuttle járattal',
    logisticsHeading: 'Megközelítés · Metró, taxi és shuttle',
    mapHeading: 'GPS koordináták & térkép · Viale Luigi Camoens 2',
    faqHeading: 'Gyakori kérdések · Thanksgiving 2026 JustMe',
    venueCta: 'JustMe Milano klubadatlap',
    dec31Title: 'A december 31-i szilvesztert is a JustMe-ben tervezed?',
    dec31Cta: 'Lásd: Dec 31 Szilveszter JustMe',
    orthodoxTitle: 'Érdekel a január 13-i Ortodox Újév is?',
    orthodoxCta: 'Lásd: Jan 13 JustMe Milánó',
    heroLabels: [
      'Esti érkezés a kivilágított Torre Branca alá a JustMe Milánóba',
      '19:30-as Amerikai Royal Büfé és élő Old Turkey látványfaragás',
      'Fűtött üvegpavilon VIP Privé asztalokkal a JustMe klubban',
      'A Vida Loca Radio 105 tánctere hajnal 05:00 óráig',
    ],
    nativeFaqs: [
      {
        q: 'Mit tartalmaz a 15€ Aperitif + 1 Drink jegy november 26-án?',
        a: '19:30 és 22:00 közötti belépéssel 1 italt, a teljes Full American Style Royal Buffet kínálatát Old Turkey Show Cookinggal és American Dessert Selectionnel, valamint részvételt a Vida Loca klubesten.',
      },
      {
        q: 'Lesz hagyományos Viziatissima csütörtök november 26-án?',
        a: 'Nem. 2026. november 26-tól a Viziatissima szünetel, hogy helyet adjon a különleges Happy Thanksgiving és Vida Loca Radio 105 estnek.',
      },
      {
        q: 'Meddig kell megérkezni a 320€ Dehor Table asztalhoz?',
        a: 'A Dehor Table (320€) vendégeinek legkésőbb 23:00-ig be kell lépniük; a Dance Floor (640€), Central (1.280€), VIP Front (3.200€) és DJ (5.000€) asztalok rugalmasak.',
      },
    ],
  },
  ga: {
    metaTitle: 'Altaithe 2026 & Vida Loca JustMe Milano | 26 Samh · 15€',
    metaDescription: `Thanksgiving 2026 ag JustMe Milano Déardaoin 26 Samhain: 19:30 Buifé Meiriceánach, Old Turkey Show Cooking & Vida Loca. Ticéad 15€, VIP ${PHONE}.`,
    h1: 'Lá Altaithe 2026 & Vida Loca ag JustMe Milano: Buifé & Club',
    subtitle: 'Déardaoin 26 Samhain 2026 · 19:30 Buifé Ríoga Meiriceánach & Old Turkey / 22:30 Vida Loca Radio 105 go 05:00 · Parco Sempione',
    themeTag: 'Eagrán Speisialta Thanksgiving 2026 · Vida Loca Radio 105 · Bus Saor in Aisce',
    dateBadge: 'Déar 26 Samh 2026 · 19:30 / 05:00',
    priceBadge: 'Buifé 15€ · Club 15€ · Boird 320€–5.000€',
    ageDressBadge: '21+ · Galánta (brístí fada éigeantach d’fhir)',
    leadIntro: 'Déardaoin 26 Samhain 2026, ceiliúrann JustMe Milano Lá Altaithe faoi Torre Branca i bParco Sempione le Full American Style Royal Buffet agus Old Turkey Show Cooking ó 19:30, agus cóisir Vida Loca Radio 105 ó 22:30 go 05:00.',
    extraNativeParagraph: 'Ós rud é go sosann Viziatissima ón 26 Samhain ar aghaidh, tugann an oíche seo miasa Meiriceánacha, milseáin American Dessert Selection agus ceol House, Hip-Hop, Hits, EDM agus Reggaeton le chéile.',
    homeLabel: 'Baile',
    eventsLabel: 'Imeachtaí Milano',
    specialLabel: 'Oícheanta Speisialta',
    ctaBuyNowLabel: 'Cuir in Áirithe Ar Líne (15€ – 1.280€)',
    ctaXceedLabel: 'Oifigiúil Xceed #249216',
    ctaWhatsappLabel: 'Bialann & VIP Concierge 24/7',
    ctaShuttleLabel: 'Páirceáil le Shuttle Saor',
    tocTitle: 'Clár Ábhar · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Forbhreathnú & Clár 26 Samhain',
      '2. Ticéid & Boird Ar Líne (15€+)',
      '3. Buifé Meiriceánach & Old Turkey Show',
      '4. Na 7 bPraghas Oifigiúla Xceed #249216',
      '5. Cód Éadaigh 21+, Shuttle Saor & Léarscáil',
      '6. Téarmaí Íocaíochta & Deimhniú',
      '7. Ceisteanna Coitianta (12 FAQ)',
    ],
    quickLabels: ['Dáta & Amanna', 'Seoladh Beacht', 'Buifé & Ceol', 'Aois & Éadaí', 'Praghsanna Oifigiúla', 'Shuttle Saor'],
    overviewHeading: 'Forbhreathnú · Lá Altaithe & Vida Loca i Milano',
    timelineHeading: 'Sceideal Iomlán · 26–27 Samhain 2026',
    timelineSubheading: 'Ó bhuifé 19:30 go deireadh Vida Loca ag 05:00 ar maidin',
    timelineTitles: [
      '19:30 · Doirse & Full American Style Royal Buffet (15€)',
      '20:15 · Show Cooking Beo leis an Old Turkey Cáiliúil',
      '21:30 · American Dessert Selection & mhanglaim',
      '22:30 · Club Vida Loca (15€) & Sprioc Dehor 23:00',
      '00:00–05:00 · Príomhseó Vida Loca Radio 105 & Seirbhís VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Milseoga',
    buffetSubheading: 'Ticéad Aperitif + 1 Deoch ar 15€ (19:30–22:00) agus boird bhialainne trí WhatsApp 24/7',
    buffetCardTitle: 'Buifé Ríoga Meiriceánach & Old Turkey (15€)',
    tablesCardTitle: 'Boird VIP Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Na 7 bPraghas Deimhnithe Xceed #249216',
    tiersSubheading: 'Áirithint láithreach do Bhuifé, Club, Dehor, Dance Floor agus Central boird',
    dressShuttleHeading: 'Aois 21+, Cód Éadaigh & Bus Tointeála Saor',
    dressShuttleSubheading: 'Brístí fada riachtanach do fhir 21+ agus bus saor ón bpáirc charranna',
    dressOkTitle: 'Feisteas Molta',
    dressNoTitle: 'Diúltaithe ag an Doras (21+)',
    shuttleHighlightTitle: 'Páirceáil le Seirbhís Shuttle Saor go JustMe',
    logisticsHeading: 'Conas JustMe Milano a Shroicheadh · Meitreo & Shuttle',
    mapHeading: 'Comhordanáidí GPS & Léarscáil · Viale Luigi Camoens 2',
    faqHeading: 'Ceisteanna Coitianta · Thanksgiving 2026 JustMe',
    venueCta: 'Próifíl Club JustMe Milano',
    dec31Title: 'Ag pleanáil Oíche Chinn Bliana 31 Nollaig ag JustMe freisin?',
    dec31Cta: 'Féach 31 Nollaig JustMe',
    orthodoxTitle: 'Spéis agat sa Bhliain Nua Ceartchreidmheach 13 Eanáir?',
    orthodoxCta: 'Féach 13 Eanáir JustMe',
    heroLabels: [
      'Teacht na n-aíonna faoi Torre Branca ag JustMe Milano',
      'Buifé Ríoga Meiriceánach 19:30 le Show Cooking Old Turkey',
      'Boird VIP Privé sa phailliún gloine téite ag JustMe',
      'Príomh-urlár rince le Vida Loca Radio 105 go dtí 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Cad atá san áireamh sa ticéad 15€ Aperitif + 1 Drink don Altaithe?',
        a: 'Iontráil idir 19:30 agus 22:00 le deoch amháin, rochtain ar an Full American Style Royal Buffet le Old Turkey Show Cooking agus milseoga, móide fanacht don oíche Vida Loca.',
      },
      {
        q: 'An mbíonn Viziatissima ar siúl Déardaoin 26 Samhain 2026?',
        a: 'Ní bhíonn. Tosaíonn sos oifigiúil do Viziatissima ón 26 Samhain 2026 chun bealach a dhéanamh do Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Cad é an t-am iontrála is déanaí don Dehor Table 320€?',
        a: 'Caithfidh aíonna Dehor Table (320€) teacht roimh 23:00; déantar boird eile (640€–5.000€) a chomhordú go solúbtha.',
      },
    ],
  },
  lv: {
    metaTitle: 'Pateicības diena 2026 & Vida Loca JustMe Milāna | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 klubā JustMe Milāna 26. nov: 19:30 Amerikāņu bufete ar Old Turkey šovu un Vida Loca Radio 105. Biļete 15€, VIP ${PHONE}.`,
    h1: 'Pateicības diena 2026 & Vida Loca klubā JustMe Milāna',
    subtitle: 'Ceturtdiena, 26. novembris 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 līdz 05:00 · Parco Sempione',
    themeTag: 'Speciālais Thanksgiving 2026 · Vida Loca Radio 105 · Bezmaksas Shuttle',
    dateBadge: 'Cet 26. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Bufete 15€ · Klubs 15€ · Galdi 320€–5.000€',
    ageDressBadge: '21+ · Elegants (vīriešiem garās bikses obligātas)',
    leadIntro: 'Ceturtdien, 26. novembrī 2026, JustMe Milano zem izgaismotā Torre Branca torņa Parco Sempione svin Pateicības dienu: no 19:30 ar Full American Style Royal Buffet un Old Turkey Show Cooking, bet no 22:30 līdz 05:00 ar Vida Loca Radio 105 ballīti.',
    extraNativeParagraph: 'Tā kā ceturtdienas formāts Viziatissima no 26. novembra ietur pauzi, šis īpašais pasākums apvieno amerikāņu virtuvi, desertus un House, Hip-Hop, Hits, EDM un Reggaeton.',
    homeLabel: 'Sākums',
    eventsLabel: 'Milānas pasākumi',
    specialLabel: 'Īpašie pasākumi',
    ctaBuyNowLabel: 'Pirkt Tiešsaistē (15€ – 1.280€)',
    ctaXceedLabel: 'Oficiālais Xceed #249216',
    ctaWhatsappLabel: 'Restorāns & VIP Konsjeržs 24/7',
    ctaShuttleLabel: 'Autostāvvieta ar Bezmaksas Shuttle',
    tocTitle: 'Saturs · Thanksgiving 2026 JustMe Milāna',
    tocLabels: [
      '1. Pārskats un 26. novembra grafiks',
      '2. Tiešsaistes biļetes un galdi (no 15€)',
      '3. Amerikāņu Royal Bufete & Old Turkey šovs',
      '4. Visi 7 oficiālie tarifi Xceed #249216',
      '5. Dreskods 21+, bezmaksas shuttle & karte',
      '6. Maksājumu un apstiprinājuma kārtība',
      '7. Biežāk uzdotie jautājumi (12 FAQ)',
    ],
    quickLabels: ['Datums un laiki', 'Precīza adrese', 'Bufete un mūzika', 'Vecums un stils', 'Oficiālās cenas', 'Bezmaksas shuttle'],
    overviewHeading: 'Pasākuma pārskats · Thanksgiving & Vida Loca Milānā',
    timelineHeading: 'Nakts programma · 26.–27. novembris 2026',
    timelineSubheading: 'No 19:30 amerikāņu bufetes līdz 05:00 rīta Vida Loca finālam',
    timelineTitles: [
      '19:30 · Durvis un Full American Style Royal Buffet (15€)',
      '20:15 · Šefpavāra šovs: slavenais tītars Old Turkey',
      '21:30 · American Dessert Selection & kokteiļi',
      '22:30 · Kluba ieeja Vida Loca (15€) & Dehor līdz 23:00',
      '00:00–05:00 · Vida Loca Radio 105 galvenais šovs & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Deserti',
    buffetSubheading: 'Biļete Aperitif + 1 dzēriens par 15€ (19:30–22:00) un restorāna galdu pieteikumi WhatsApp 24/7',
    buffetCardTitle: 'Amerikāņu Royal Bufete & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Galdi Vida Loca (320€–5.000€)',
    tiersHeading: 'Visas 7 apstiprinātās cenas Xceed #249216',
    tiersSubheading: 'Tūlītēja tiešsaistes rezervācija Bufetes, Kluba un Dehor, Dance Floor & Central galdiem',
    dressShuttleHeading: 'Vecums 21+, dreskods un bezmaksas transfēra autobuss',
    dressShuttleSubheading: 'Vīriešiem obligātas garās bikses un bezmaksas autobuss no partneru stāvvietas',
    dressOkTitle: 'Ieteicamais apģērbs',
    dressNoTitle: 'Netiek ielaisti (21+)',
    shuttleHighlightTitle: 'Autostāvvieta ar bezmaksas shuttle servisu',
    logisticsHeading: 'Kā nokļūt JustMe Milano · Metro un shuttle',
    mapHeading: 'GPS koordinātas un karte · Viale Luigi Camoens 2',
    faqHeading: 'Biežāk uzdotie jautājumi · Thanksgiving 2026 JustMe',
    venueCta: 'JustMe Milano kluba profils',
    dec31Title: 'Plānojat arī 31. decembra Jauno gadu klubā JustMe?',
    dec31Cta: 'Skatīt 31. decembri JustMe',
    orthodoxTitle: 'Interesē arī 13. janvāra Pareizticīgo Jaunais gads?',
    orthodoxCta: 'Skatīt 13. janvāri JustMe',
    heroLabels: [
      'Vakara ierašanās zem Torre Branca pie JustMe Milāna',
      '19:30 Amerikāņu Royal Bufete ar Old Turkey tītara šovu',
      'Apsildāmā stikla veranda ar VIP Privé galdiem JustMe',
      'Deju grīda ar Vida Loca Radio 105 līdz plkst. 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Kas ietilpst 15€ Aperitif + 1 Drink biļetē Pateicības dienā?',
        a: 'Ieeja no 19:30 līdz 22:00 nodrošina 1 dzērienu, piekļuvi Full American Style Royal Buffet ar Old Turkey Show Cooking un desertiem, kā arī palikšanu uz Vida Loca ballīti.',
      },
      {
        q: 'Vai ceturtdien, 26. novembrī 2026, notiek parastais Viziatissima pasākums?',
        a: 'Nē. No 26. novembra 2026 iknedēļas Viziatissima ietur pauzi par godu speciālajam pasākumam Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Līdz cikiem jāierodas ar 320€ Dehor Table rezervāciju?',
        a: 'Dehor Table (320€) viesiem jāierodas līdz plkst. 23:00; pārējie galdi (640€–5.000€) tiek koordinēti elastīgi.',
      },
    ],
  },
  lt: {
    metaTitle: 'Padėkos diena 2026 & Vida Loca JustMe Milanas | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 JustMe Milane ket 26.11.: 19:30 Amerikietiškas bufetas Old Turkey ir Vida Loca Radio 105. Bilietas 15€, VIP ${PHONE}.`,
    h1: 'Padėkos diena 2026 & Vida Loca klube JustMe Milanas',
    subtitle: 'Ketvirtadienis, 2026 m. lapkričio 26 d. · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 iki 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving 2026 · Vida Loca Radio 105 · Nemokamas Autobusas iš Stovėjimo Aikštelės',
    dateBadge: 'Ket 2026 Lap 26 · 19:30 / 05:00',
    priceBadge: 'Bufetas 15€ · Klubas 15€ · Staliukai 320€–5.000€',
    ageDressBadge: '21+ · Elegantiška (vyrams ilgos kelnės privalomos)',
    leadIntro: '2026 m. lapkričio 26 d., ketvirtadienį, JustMe Milano po apšviestu Torre Branca bokštu Parco Sempione parke švenčia Padėkos dieną: nuo 19:30 siūlomas Full American Style Royal Buffet su Old Turkey Show Cooking, o nuo 22:30 iki 05:00 vyksta Vida Loca Radio 105 vakarėlis.',
    extraNativeParagraph: 'Ketvirtadienio vakaras Viziatissima nuo lapkričio 26 d. daro pertrauką, užleisdamas vietą amerikietiškiems patiekalams, desertams ir House, Hip-Hop, Hits, EDM bei Reggaeton muzikai.',
    homeLabel: 'Pradžia',
    eventsLabel: 'Renginiai Milanas',
    specialLabel: 'Ypatingi renginiai',
    ctaBuyNowLabel: 'Pirkti Internetu (15€ – 1.280€)',
    ctaXceedLabel: 'Oficialus Xceed #249216',
    ctaWhatsappLabel: 'Restoranas & VIP Konsjeržas 24/7',
    ctaShuttleLabel: 'Aikštelė ir Nemokamas Autobusas',
    tocTitle: 'Gido turinys · Thanksgiving 2026 JustMe Milanas',
    tocLabels: [
      '1. Apžvalga ir lapkričio 26 d. tvarkaraštis',
      '2. Bilietai ir staliukai internetu (nuo 15€)',
      '3. Amerikietiškas bufetas & Old Turkey šou',
      '4. Visi 7 oficialūs įkainiai Xceed #249216',
      '5. Aprangos kodas 21+, nemokamas shuttle & žemėlapis',
      '6. Mokėjimo ir patvirtinimo tvarka',
      '7. Dažniausiai užduodami klausimai (12 FAQ)',
    ],
    quickLabels: ['Data ir laikas', 'Tikslus adresas', 'Bufetas ir muzika', 'Amžius ir apranga', 'Patvirtintos kainos', 'Nemokamas shuttle'],
    overviewHeading: 'Renginio apžvalga · Thanksgiving & Vida Loca Milane',
    timelineHeading: 'Nakties programa · Lapkričio 26–27 d.',
    timelineSubheading: 'Nuo 19:30 amerikietiško bufeto iki 05:00 ryto Vida Loca finalo',
    timelineTitles: [
      '19:30 · Durys ir Full American Style Royal Buffet (15€)',
      '20:15 · Gyvas šefo pasirodymas: garsusis Old Turkey kalakutas',
      '21:30 · American Dessert Selection & kokteiliai',
      '22:30 · Klubo pradžia Vida Loca (15€) & Dehor iki 23:00',
      '00:00–05:00 · Pagrindinė Vida Loca Radio 105 programa & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Desertai',
    buffetSubheading: 'Bilietas Aperitif + 1 gėrimas už 15€ (19:30–22:00) bei restorano stalų užklausos per WhatsApp 24/7',
    buffetCardTitle: 'Amerikietiškas Royal Bufetas & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Staliukai Vida Loca (320€–5.000€)',
    tiersHeading: 'Visos 7 oficialios kainos Xceed #249216',
    tiersSubheading: 'Tiesioginė internetinė rezervacija Bufeto, Klubo ir Dehor, Dance Floor, Central staliukams',
    dressShuttleHeading: 'Amžius 21+, aprangos kodas ir nemokamas pervežimas',
    dressShuttleSubheading: 'Vyrams privalomos ilgos kelnės ir nemokamas autobusas iš partnerių aikštelės',
    dressOkTitle: 'Rekomenduojama apranga',
    dressNoTitle: 'Neleidžiama prie įėjimo (21+)',
    shuttleHighlightTitle: 'Automobilių aikštelė su nemokamu autobusu',
    logisticsHeading: 'Kaip atvykti į JustMe Milano · Metro ir autobusas',
    mapHeading: 'GPS koordinatės ir žemėlapis · Viale Luigi Camoens 2',
    faqHeading: 'Dažniausi klausimai · Thanksgiving 2026 JustMe',
    venueCta: 'Klubo JustMe Milanas profilis',
    dec31Title: 'Planuojate ir gruodžio 31 d. Naujuosius metus JustMe?',
    dec31Cta: 'Žiūrėti gruodžio 31 d. JustMe',
    orthodoxTitle: 'Domina ir sausio 13 d. Ortodoksų Naujieji metai?',
    orthodoxCta: 'Žiūrėti sausio 13 d. JustMe',
    heroLabels: [
      'Svečių atvykimas po Torre Branca bokštu prie JustMe Milanas',
      '19:30 Amerikietiškas Royal Bufetas su Old Turkey Show Cooking',
      'Šildoma stiklinė veranda su VIP Privé staliukais JustMe',
      'Pagrindinė šokių aikštelė su Vida Loca Radio 105 iki 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Kas įskaičiuota į 15€ Aperitif + 1 Drink Padėkos dienos bilietą?',
        a: 'Įeinant tarp 19:30 ir 22:00 priklauso 1 gėrimas, visas Full American Style Royal Buffet su Old Turkey šou ir desertais bei pasilikimas Vida Loca vakarėlyje.',
      },
      {
        q: 'Ar lapkričio 26 d. vyksta įprastas Viziatissima ketvirtadienis?',
        a: 'Ne. Nuo 2026 m. lapkričio 26 d. Viziatissima daro oficialią pertrauką dėl specialios Thanksgiving & Vida Loca Radio 105 šventės.',
      },
      {
        q: 'Iki kelintos valandos būtina atvykti užsisakius 320€ Dehor Table?',
        a: 'Dehor Table (320€) svečiai turi atvykti iki 23:00 val.; kiti staliukai (640€–5.000€) derinami tiesiogiai.',
      },
    ],
  },
  mt: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milan | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 f’JustMe Milan il-Ħamis 26 Nov: 19:30 Buffet Amerikan, Old Turkey Show Cooking u Vida Loca Radio 105. Biljett 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca f’JustMe Milan: Buffet Amerikan u Club',
    subtitle: 'Il-Ħamis 26 ta’ Novembru 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 sal-05:00 · Parco Sempione',
    themeTag: 'Edizzjoni Speċjali Thanksgiving 2026 · Vida Loca · Shuttle B’Xejn',
    dateBadge: 'Ħam 26 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffet 15€ · Club 15€ · Imwejjed 320€–5.000€',
    ageDressBadge: '21+ · Eleganti (qalziet twil obbligatorju)',
    leadIntro: 'Il-Ħamis 26 ta’ Novembru 2026, JustMe Milano jiċċelebra Thanksgiving taħt Torre Branca f’Parco Sempione b’Full American Style Royal Buffet u Show Cooking live tal-Old Turkey mis-19:30, u b’Vida Loca Radio 105 mit-22:30 sal-05:00.',
    extraNativeParagraph: 'Billi s-serata ta’ kull ġimgħa Viziatissima tieqaf mis-26 ta’ Novembru, din l-edizzjoni tgħaqqad ikel tradizzjonali Amerikan u deżerti ma’ mużika House, Hip-Hop, Hits, EDM u Reggaeton.',
    homeLabel: 'Dar',
    eventsLabel: 'Avvenimenti Milan',
    specialLabel: 'Avvenimenti Speċjali',
    ctaBuyNowLabel: 'Ixtri Online (15€ – 1.280€)',
    ctaXceedLabel: 'Xceed Uffiċjali #249216',
    ctaWhatsappLabel: 'Ristorant & VIP Concierge 24/7',
    ctaShuttleLabel: 'Parkeġġ u Shuttle B’Xejn',
    tocTitle: 'Werrej · Thanksgiving 2026 JustMe Milan',
    tocLabels: [
      '1. Ħarsa ġenerali u skeda tas-26 ta’ Novembru',
      '2. Biljetti u imwejjed online (minn 15€)',
      '3. Buffet Amerikan & Show Cooking Old Turkey',
      '4. Is-7 prezzijiet uffiċjali Xceed #249216',
      '5. Dress Code 21+, shuttle b’xejn u mappa',
      '6. Kundizzjonijiet ta’ ħlas u konferma',
      '7. Mistoqsijiet Frekwenti (12 FAQ)',
    ],
    quickLabels: ['Data u Ħinijiet', 'Indirizz Eżatt', 'Buffet u Mużika', 'Età u Dress Code', 'Prezzijiet Konfermati', 'Shuttle B’Xejn'],
    overviewHeading: 'Ħarsa Ġenerali · Thanksgiving & Vida Loca f’Milan',
    timelineHeading: 'Skeda Sħiħa · Il-Ħamis 26 – Il-Ġimgħa 27 Nov 2026',
    timelineSubheading: 'Mill-buffet tas-19:30 sal-aħħar ta’ Vida Loca fil-05:00 ta’ filgħodu',
    timelineTitles: [
      '19:30 · Ftuħ tal-bibien & Full American Royal Buffet (15€)',
      '20:15 · Show Cooking Live: il-famuż Old Turkey',
      '21:30 · American Dessert Selection & cocktails',
      '22:30 · Dħul tal-Club Vida Loca (15€) & Dehor sal-23:00',
      '00:00–05:00 · Show ewlieni Vida Loca Radio 105 & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Deżerti',
    buffetSubheading: 'Biljett Aperitif + 1 Drink għal 15€ (19:30–22:00) u talbiet għal imwejjed tar-ristorant fuq WhatsApp',
    buffetCardTitle: 'Buffet Rjali Amerikan & Old Turkey (15€)',
    tablesCardTitle: 'Imwejjed VIP Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Is-7 Tariffi Uffiċjali Konfermati (Xceed #249216)',
    tiersSubheading: 'Ibbukkja online immedjatament għal Buffet, Club u imwejjed Dehor, Pista u Central',
    dressShuttleHeading: 'Età 21+, Dress Code u Parkeġġ b’Shuttle B’Xejn',
    dressShuttleSubheading: 'Qalziet twil obbligatorju għall-irġiel (21+) u servizz ta’ shuttle bla ħlas',
    dressOkTitle: 'Ilbies Rakkomandat',
    dressNoTitle: 'Mhux Aċċettat (21+)',
    shuttleHighlightTitle: 'Parkeġġ b’Servizz Shuttle B’Xejn lejn JustMe',
    logisticsHeading: 'Kif Tasal JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'Koordinati GPS u Mappa · Viale Luigi Camoens 2',
    faqHeading: 'Mistoqsijiet Frekwenti · Thanksgiving 2026 JustMe',
    venueCta: 'Profil tal-Klabb JustMe Milan',
    dec31Title: 'Qed tfittex ukoll Lejlet l-Ewwel tas-Sena 31 ta’ Diċembru f’JustMe?',
    dec31Cta: 'Ara 31 ta’ Diċembru JustMe',
    orthodoxTitle: 'Interessat ukoll fit-13 ta’ Jannar f’JustMe?',
    orthodoxCta: 'Ara 13 ta’ Jannar JustMe Milan',
    heroLabels: [
      'Wasla tal-mistednin taħt Torre Branca f’JustMe Milano',
      'Buffet Rjali Amerikan fis-19:30 u Show Cooking tal-Old Turkey',
      'Veranda tal-ħġieġ imsaħħna b’imwejjed VIP Privé f’JustMe',
      'Pista taż-żfin ewlenija ma’ Vida Loca Radio 105 sal-05:00',
    ],
    nativeFaqs: [
      {
        q: 'X’jinkludi l-biljett ta’ 15€ Aperitif + 1 Drink għal Thanksgiving?',
        a: 'Id-dħul bejn is-19:30 u l-22:00 jinkludi xarba waħda, aċċess għall-Full American Style Royal Buffet bl-Old Turkey Show Cooking u l-American Dessert Selection, kif ukoll aċċess għall-party Vida Loca.',
      },
      {
        q: 'Is-serata Viziatissima ser issir il-Ħamis 26 ta’ Novembru 2026?',
        a: 'Le. Mis-26 ta’ Novembru 2026 is-serata Viziatissima tieħu pawża u minflokha ssir l-edizzjoni speċjali Happy Thanksgiving u Vida Loca Radio 105.',
      },
      {
        q: 'X’inhu l-ħin massimu tal-wasla għad-Dehor Table ta’ 320€?',
        a: 'Il-mistednin b’Dehor Table (320€) iridu jidħlu sal-23:00; l-imwejjed l-oħra (640€–5.000€) jiġu kkoordinati direttament.',
      },
    ],
  },
  pl: {
    metaTitle: 'Święto Dziękczynienia 2026 & Vida Loca JustMe Mediolan | 15€',
    metaDescription: `Thanksgiving 2026 w JustMe Mediolan czw 26.11: 19:30 Amerykański Bufet z Old Turkey Show Cooking i Vida Loca Radio 105. Bilet 15€, VIP ${PHONE}.`,
    h1: 'Święto Dziękczynienia 2026 & Vida Loca w JustMe Mediolan',
    subtitle: 'Czwartek 26 listopada 2026 · 19:30 Amerykański Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 do 05:00 · Parco Sempione',
    themeTag: 'Specjalne Thanksgiving 2026 · Vida Loca Radio 105 · Darmowy Shuttle z Parkingu',
    dateBadge: 'Czw 26 Lis 2026 · 19:30 / 05:00',
    priceBadge: 'Bufet 15€ · Klub 15€ · Stoliki 320€–5.000€',
    ageDressBadge: '21+ · Elegancki (długie spodnie obowiązkowe)',
    leadIntro: 'W czwartek 26 listopada 2026 roku klub JustMe Milano pod wieżą Torre Branca w Parco Sempione świętuje Święto Dziękczynienia: od 19:30 zaprasza na Full American Style Royal Buffet z pokazem Old Turkey Show Cooking, a od 22:30 do 05:00 na imprezę Vida Loca Radio 105.',
    extraNativeParagraph: 'Ponieważ czwartkowy cykl Viziatissima robi przerwę od 26 listopada, wyjątkowa edycja łączy kuchnię amerykańską i desery z brzmieniami House, Hip-Hop, Hits, EDM oraz Reggaeton.',
    homeLabel: 'Start',
    eventsLabel: 'Wydarzenia Mediolan',
    specialLabel: 'Wydarzenia Specjalne',
    ctaBuyNowLabel: 'Kup Online (15€ – 1.280€)',
    ctaXceedLabel: 'Oficjalny Xceed #249216',
    ctaWhatsappLabel: 'Stoliki Restauracja & VIP 24/7',
    ctaShuttleLabel: 'Parking i Darmowy Shuttle',
    tocTitle: 'Spis treści · Thanksgiving 2026 JustMe Mediolan',
    tocLabels: [
      '1. Przegląd i harmonogram 26 listopada',
      '2. Bilety i stoliki online (od 15€)',
      '3. Amerykański Royal Bufet & Old Turkey Show',
      '4. Wszystkie 7 oficjalnych taryf Xceed #249216',
      '5. Dress Code 21+, darmowy shuttle i mapa',
      '6. Warunki płatności i potwierdzenie',
      '7. Najczęstsze pytania (12 FAQ)',
    ],
    quickLabels: ['Data i godziny', 'Dokładny adres', 'Bufet i muzyka', 'Wiek i strój', 'Potwierdzone ceny', 'Darmowy shuttle'],
    overviewHeading: 'Opis wydarzenia · Thanksgiving & Vida Loca w Mediolanie',
    timelineHeading: 'Harmonogram nocy · 26–27 listopada 2026',
    timelineSubheading: 'Od amerykańskiego bufetu o 19:30 do zamknięcia Vida Loca o 05:00 rano',
    timelineTitles: [
      '19:30 · Otwarcie drzwi & Full American Style Royal Buffet (15€)',
      '20:15 · Show Cooking na żywo: słynny indyk Old Turkey',
      '21:30 · American Dessert Selection & koktajle',
      '22:30 · Wejście klubowe Vida Loca (15€) & limit Dehor 23:00',
      '00:00–05:00 · Główny set Vida Loca Radio 105 & stoliki VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Desery',
    buffetSubheading: 'Wejście Aperitif + 1 Drink 15€ (19:30–22:00) oraz rezerwacje stolików restauracyjnych 24/7 na WhatsApp',
    buffetCardTitle: 'Amerykański Royal Bufet & Old Turkey (15€)',
    tablesCardTitle: 'Stoliki VIP Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Wszystkie 7 potwierdzonych cen Xceed #249216',
    tiersSubheading: 'Bezpośredni zakup biletów Buffet, Club oraz stolików Dehor, Dance Floor i Central online',
    dressShuttleHeading: 'Selekcja 21+, Dress Code i bezpłatny autobus z parkingu',
    dressShuttleSubheading: 'Obowiązkowe długie spodnie dla panów i bezpłatny transport spod parkingu partnerskiego',
    dressOkTitle: 'Zalecany ubiór',
    dressNoTitle: 'Niedozwolone (selekcja 21+)',
    shuttleHighlightTitle: 'Parking z darmowym transportem wahadłowym',
    logisticsHeading: 'Dojazd do JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'Współrzędne GPS i mapa · Viale Luigi Camoens 2',
    faqHeading: 'Najczęstsze pytania · Thanksgiving 2026 JustMe',
    venueCta: 'Profil klubu JustMe Mediolan',
    dec31Title: 'Planujesz też Sylwestra 31 grudnia w JustMe Mediolan?',
    dec31Cta: 'Zobacz Sylwester 31.12 JustMe',
    orthodoxTitle: 'Interesuje Cię także Stary Nowy Rok 13 stycznia?',
    orthodoxCta: 'Zobacz 13 stycznia JustMe',
    heroLabels: [
      'Wieczorne przybycie pod wieżę Torre Branca do JustMe Mediolan',
      'Amerykański Royal Bufet o 19:30 z pokazem krojenia indyka Old Turkey',
      'Ogrzewany szklany pawilon i stoliki VIP Privé w JustMe',
      'Główny parkiet z imprezą Vida Loca Radio 105 aż do 05:00 rano',
    ],
    nativeFaqs: [
      {
        q: 'Co zawiera bilet Aperitif + 1 Drink za 15€ na Thanksgiving?',
        a: 'Wejście między 19:30 a 22:00 obejmuje jeden drink, dostęp do Full American Style Royal Buffet z pokazem Old Turkey i wyborem American Dessert Selection oraz udział w imprezie klubowej Vida Loca.',
      },
      {
        q: 'Czy w czwartek 26 listopada 2026 odbywa się zwykła impreza Viziatissima?',
        a: 'Nie. Od czwartku 26 listopada 2026 format Viziatissima ma przerwę, ustępując miejsca specjalnemu wieczorowi Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Do której godziny obowiązuje wejście dla stolika Dehor za 320€?',
        a: 'Rezerwacja Dehor Table (320€) wymaga przybycia do godziny 23:00; stoliki Dance Floor (640€), Central (1.280€), VIP Front (3.200€) i DJ (5.000€) koordynujemy elastycznie.',
      },
    ],
  },
  ro: {
    metaTitle: 'Ziua Recunoștinței 2026 & Vida Loca JustMe Milano | 15€',
    metaDescription: `Thanksgiving 2026 la JustMe Milano joi 26 nov: 19:30 Bufet American cu Old Turkey Show și Vida Loca Radio 105. Bilet 15€, VIP ${PHONE}.`,
    h1: 'Ziua Recunoștinței 2026 & Vida Loca la JustMe Milano: Bufet & Club',
    subtitle: 'Joi, 26 noiembrie 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 până la 05:00 · Parco Sempione',
    themeTag: 'Ediție Specială Thanksgiving 2026 · Vida Loca Radio 105 · Transfer Gratuit',
    dateBadge: 'Joi 26 Noi 2026 · 19:30 / 05:00',
    priceBadge: 'Bufet 15€ · Club 15€ · Mese 320€–5.000€',
    ageDressBadge: '21+ · Elegant (pantalon lung obligatoriu bărbați)',
    leadIntro: 'Joi, 26 noiembrie 2026, JustMe Milano sărbătorește Thanksgiving sub turnul luminat Torre Branca din Parco Sempione: deschiderea la 19:30 cu Full American Style Royal Buffet și Show Cooking live pentru faimosul Old Turkey, urmată de la 22:30 de turneul Vida Loca Radio 105 până la 05:00.',
    extraNativeParagraph: 'Deoarece formatul săptămânal Viziatissima ia pauză începând cu 26 noiembrie, această noapte reunește preparatele americane clasice și deserturile cu muzică House, Hip-Hop, Hits, EDM și Reggaeton.',
    homeLabel: 'Acasă',
    eventsLabel: 'Evenimente Milano',
    specialLabel: 'Evenimente Speciale',
    ctaBuyNowLabel: 'Cumpără Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canal Oficial Xceed #249216',
    ctaWhatsappLabel: 'Mese Restaurant & VIP 24/7',
    ctaShuttleLabel: 'Parcare cu Shuttle Gratuit',
    tocTitle: 'Cuprins · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Prezentare & programul din 26 noiembrie',
      '2. Bilete și mese online (de la 15€)',
      '3. Royal Bufet American & Old Turkey Show',
      '4. Toate cele 7 tarife oficiale Xceed #249216',
      '5. Dress Code 21+, shuttle gratuit & hartă',
      '6. Termeni de plată & confirmare',
      '7. Întrebări Frecvente (12 FAQ)',
    ],
    quickLabels: ['Dată și orar', 'Adresă exactă', 'Bufet și muzică', 'Vârstă și ținută', 'Tarife confirmate', 'Shuttle gratuit'],
    overviewHeading: 'Prezentarea Serii · Thanksgiving & Vida Loca în Milano',
    timelineHeading: 'Programul Complet al Nopții · 26–27 Noiembrie 2026',
    timelineSubheading: 'De la bufetul american de la 19:30 până la finalul Vida Loca la 05:00 dimineața',
    timelineTitles: [
      '19:30 · Deschidere & Full American Style Royal Buffet (15€)',
      '20:15 · Show Cooking Live cu Celebrul Curcan Old Turkey',
      '21:30 · American Dessert Selection & Cocktailuri',
      '22:30 · Acces Club Vida Loca (15€) & Limită Dehor 23:00',
      '00:00–05:00 · Show Principal Vida Loca Radio 105 & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Deserturi',
    buffetSubheading: 'Bilet Aperitif + 1 Băutură 15€ (19:30–22:00) și cereri pentru mese restaurant prin WhatsApp 24/7',
    buffetCardTitle: 'Royal Bufet American & Old Turkey (15€)',
    tablesCardTitle: 'Mese VIP Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Toate cele 7 Tarife Oficiale Xceed #249216',
    tiersSubheading: 'Rezervare directă online pentru bilete Bufet, Club și mese Dehor, Pista și Central',
    dressShuttleHeading: 'Acces 21+, Dress Code și Parcare cu Transfer Gratuit',
    dressShuttleSubheading: 'Pantaloni lungi obligatorii pentru domni (21+) și transfer gratuit de la parcarea parteneră',
    dressOkTitle: 'Ținută recomandată',
    dressNoTitle: 'Interzis la intrare (21+)',
    shuttleHighlightTitle: 'Parcare cu serviciu gratuit de shuttle',
    logisticsHeading: 'Cum ajungi la JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'Coordonate GPS și Hartă · Viale Luigi Camoens 2',
    faqHeading: 'Întrebări Frecvente · Thanksgiving 2026 JustMe Milano',
    venueCta: 'Profil Club JustMe Milano',
    dec31Title: 'Cauți și Revelionul de 31 Decembrie la JustMe Milano?',
    dec31Cta: 'Vezi 31 Decembrie JustMe',
    orthodoxTitle: 'Ești interesat și de Revelionul pe Rit Vechi 13 Ianuarie?',
    orthodoxCta: 'Vezi 13 Ianuarie JustMe Milano',
    heroLabels: [
      'Sosirea oaspeților sub Torre Branca la JustMe Milano',
      'Bufet Royal American de la 19:30 și Show Cooking Old Turkey',
      'Verandă de sticlă încălzită cu mese VIP Privé în JustMe',
      'Ringul central cu Vida Loca Radio 105 până la 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Ce include biletul de 15€ Aperitif + 1 Drink de Thanksgiving?',
        a: 'Intrarea între 19:30 și 22:00 include o băutură, accesul la Full American Style Royal Buffet cu Show Cooking Old Turkey și American Dessert Selection, plus acces complet la petrecerea Vida Loca.',
      },
      {
        q: 'Are loc petrecerea săptămânală Viziatissima joi, 26 noiembrie 2026?',
        a: 'Nu. Începând cu joi 26 noiembrie 2026, serile Viziatissima intră în pauză pentru ediția specială Happy Thanksgiving și Vida Loca Radio 105.',
      },
      {
        q: 'Care este ora limită pentru masa Dehor de 320€?',
        a: 'Oaspeții cu Dehor Table (320€) trebuie să intre până la 23:00; mesele Dance Floor (640€), Central (1.280€), VIP Front (3.200€) și DJ Table (5.000€) sunt coordonate flexibil.',
      },
    ],
  },
  sk: {
    metaTitle: 'Deň vďakyvzdania 2026 & Vida Loca JustMe Miláno | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 v JustMe Miláno štv 26.11.: 19:30 Americký bufet s Old Turkey Show Cooking a párty Vida Loca Radio 105. Lístok 15€, VIP ${PHONE}.`,
    h1: 'Deň vďakyvzdania 2026 & Vida Loca v JustMe Miláno: Bufet & Klub',
    subtitle: 'Štvrtok 26. novembra 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 do 05:00 · Parco Sempione',
    themeTag: 'Špeciál Thanksgiving 2026 · Vida Loca Radio 105 · Bezplatný Shuttle z Parkoviska',
    dateBadge: 'Štv 26. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Bufet 15€ · Klub 15€ · Stoly 320€–5.000€',
    ageDressBadge: '21+ · Elegantné (páni dlhé nohavice povinne)',
    leadIntro: 'Vo štvrtok 26. novembra 2026 oslavuje JustMe Milano pod osvetlenou vežou Torre Branca v parku Sempione Deň vďakyvzdania: od 19:30 otvára Full American Style Royal Buffet so živou šou Old Turkey a od 22:30 do 05:00 nasleduje Vida Loca Radio 105.',
    extraNativeParagraph: 'Keďže štvrtkový program Viziatissima má od 26. novembra prestávku, špeciálny večer spája americkú kuchyňu a dezerty so setmi House, Hip-Hop, Hits, EDM a Reggaeton.',
    homeLabel: 'Domov',
    eventsLabel: 'Udalosti Miláno',
    specialLabel: 'Špeciálne akcie',
    ctaBuyNowLabel: 'Kúpiť Online (15€ – 1.280€)',
    ctaXceedLabel: 'Oficiálny Xceed #249216',
    ctaWhatsappLabel: 'Rezervácie reštaurácie & VIP 24/7',
    ctaShuttleLabel: 'Parkovanie s bezplatným shuttle',
    tocTitle: 'Obsah sprievodcu · Thanksgiving 2026 JustMe Miláno',
    tocLabels: [
      '1. Prehľad a program 26. novembra',
      '2. Online vstupenky a stoly (od 15€)',
      '3. Americký Royal Buffet & Old Turkey Show',
      '4. Všetkých 7 oficiálnych taríf Xceed #249216',
      '5. Dress Code 21+, bezplatný shuttle a mapa',
      '6. Platobné podmienky a potvrdenie',
      '7. Časté otázky (12 FAQ)',
    ],
    quickLabels: ['Dátum a časy', 'Presná adresa', 'Bufet a hudba', 'Vek a dress code', 'Overené ceny', 'Shuttle zadarmo'],
    overviewHeading: 'Prehľad večera · Thanksgiving & Vida Loca v Miláne',
    timelineHeading: 'Kompletný program · 26.–27. novembra 2026',
    timelineSubheading: 'Od amerického bufetu o 19:30 po záver Vida Loca o 05:00 ráno',
    timelineTitles: [
      '19:30 · Otvorenie & Full American Style Royal Buffet (15€)',
      '20:15 · Živé Show Cooking slávneho moriaka Old Turkey',
      '21:30 · American Dessert Selection & koktaily',
      '22:30 · Vstup do klubu Vida Loca (15€) & limit Dehor 23:00',
      '00:00–05:00 · Hlavná šou Vida Loca Radio 105 & VIP stoly',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Dezerty',
    buffetSubheading: 'Lístok Aperitif + 1 Drink 15€ (19:30–22:00) a rezervácie stolov reštaurácie cez WhatsApp',
    buffetCardTitle: 'Americký Royal Buffet & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Stoly Vida Loca (320€–5.000€)',
    tiersHeading: 'Všetkých 7 potvrdených cien Xceed #249216',
    tiersSubheading: 'Priamy online nákup vstupov a stolov Dehor, Dance Floor a Central',
    dressShuttleHeading: 'Vek 21+, Dress Code a bezplatná kyvadlová doprava',
    dressShuttleSubheading: 'Dlhé nohavice povinné pre pánov a bezplatný shuttle z partnerského parkoviska',
    dressOkTitle: 'Odporúčané oblečenie',
    dressNoTitle: 'Nepovolené na vstupe (21+)',
    shuttleHighlightTitle: 'Parkovisko s bezplatným shuttle autobusom',
    logisticsHeading: 'Ako sa dostať do JustMe Milano · Metro a shuttle',
    mapHeading: 'GPS súradnice a mapa · Viale Luigi Camoens 2',
    faqHeading: 'Časté otázky · Thanksgiving 2026 JustMe Miláno',
    venueCta: 'Profil klubu JustMe Miláno',
    dec31Title: 'Hľadáte aj Silvester 31. decembra v JustMe Miláno?',
    dec31Cta: 'Zobraziť Silvester 31.12. JustMe',
    orthodoxTitle: 'Zaujíma vás aj Pravoslávny Nový rok 13. januára?',
    orthodoxCta: 'Zobraziť 13. januára JustMe',
    heroLabels: [
      'Večerný príchod hostí pod Torre Branca do JustMe Miláno',
      'Americký Royal Buffet o 19:30 so živou šou Old Turkey',
      'Vyhrievaná presklená veranda s VIP Privé stolmi v JustMe',
      'Hlavný tanečný parket s Vida Loca Radio 105 do 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Čo zahŕňa lístok Aperitif + 1 Drink za 15€ na Deň vďakyvzdania?',
        a: 'Vstup medzi 19:30 a 22:00 obsahuje 1 drink a vstup na Full American Style Royal Buffet so živou šou Old Turkey, americkými dezertmi a pokračovaním v klube Vida Loca.',
      },
      {
        q: 'Koná sa vo štvrtok 26. novembra 2026 pravidelná noc Viziatissima?',
        a: 'Nie. Od štvrtka 26. novembra 2026 má Viziatissima pauzu pre špeciálnu akciu Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Dokedy platí vstup pre stôl Dehor za 320€?',
        a: 'Hostia so stolom Dehor Table (320€) musia doraziť do 23:00; stoly Dance Floor (640€), Central (1.280€), VIP Front (3.200€) a DJ (5.000€) koordinujeme priamo.',
      },
    ],
  },
  sl: {
    metaTitle: 'Zahvalni dan 2026 & Vida Loca JustMe Milano | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 v JustMe Milano čet 26.11.: 19:30 Ameriški Bife, Old Turkey Show & Vida Loca Radio 105. Karta 15€, VIP ${PHONE}.`,
    h1: 'Zahvalni dan 2026 & Vida Loca v JustMe Milano: Bife & Klub',
    subtitle: 'Četrtek, 26. november 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 do 05:00 · Parco Sempione',
    themeTag: 'Posebni Thanksgiving 2026 · Vida Loca Radio 105 · Brezplačni Shuttle',
    dateBadge: 'Čet 26. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Bife 15€ · Klub 15€ · Mize 320€–5.000€',
    ageDressBadge: '21+ · Elegantno (moški: obvezne dolge hlače)',
    leadIntro: 'V četrtek, 26. novembra 2026, klub JustMe Milano pod stolpom Torre Branca v parku Sempione praznuje zahvalni dan: ob 19:30 se odpre Full American Style Royal Buffet z Old Turkey Show Cookingom, od 22:30 do 05:00 pa sledi Vida Loca Radio 105.',
    extraNativeParagraph: 'Ker četrtkov večer Viziatissima od 26. novembra miruje, ta posebna noč združuje ameriško kulinarično ponudbo, sladice ter glasbo House, Hip-Hop, Hits, EDM in Reggaeton.',
    homeLabel: 'Domov',
    eventsLabel: 'Dogodki Milano',
    specialLabel: 'Posebni dogodki',
    ctaBuyNowLabel: 'Kupi Spletno (15€ – 1.280€)',
    ctaXceedLabel: 'Uradni Xceed #249216',
    ctaWhatsappLabel: 'Restavracijske Mize & VIP 24/7',
    ctaShuttleLabel: 'Parkirišče z brezplačnim shuttlom',
    tocTitle: 'Kazalo · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Pregled in urnik za 26. november',
      '2. Spletne vstopnice in mize (od 15€)',
      '3. Ameriški Royal Bife & Old Turkey Show',
      '4. Vseh 7 uradnih cen Xceed #249216',
      '5. Dress Code 21+, brezplačni shuttle & zemljevid',
      '6. Plačilni pogoji in takojšnja potrditev',
      '7. Pogosta vprašanja (12 FAQ)',
    ],
    quickLabels: ['Datum in ure', 'Točen naslov', 'Bife in glasba', 'Starost in oblačila', 'Potrjene cene', 'Brezplačni shuttle'],
    overviewHeading: 'Pregled večera · Zahvalni dan & Vida Loca v Milanu',
    timelineHeading: 'Urnik noči · 26.–27. november 2026',
    timelineSubheading: 'Od ameriškega bifeja ob 19:30 do zaključka Vida Loca ob 05:00 zjutraj',
    timelineTitles: [
      '19:30 · Odprtje & Full American Style Royal Buffet (15€)',
      '20:15 · Show Cooking v živo: slavni Old Turkey',
      '21:30 · American Dessert Selection & koktajli',
      '22:30 · Klub Vida Loca (15€) & rok za Dehor 23:00',
      '00:00–05:00 · Glavni šov Vida Loca Radio 105 & VIP mize',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Sladice',
    buffetSubheading: 'Vstopnica Aperitif + 1 pijača za 15€ (19:30–22:00) in rezervacije miz restavracije prek WhatsAppa',
    buffetCardTitle: 'Ameriški Royal Bife & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Mize Vida Loca (320€–5.000€)',
    tiersHeading: 'Vseh 7 uradnih cen Xceed #249216',
    tiersSubheading: 'Takojšnja spletna rezervacija za bife, klub in mize Dehor, Dance Floor ter Central',
    dressShuttleHeading: 'Vstop 21+, Dress Code in brezplačni shuttle prevoz',
    dressShuttleSubheading: 'Dolge hlače obvezne za moške (21+) in brezplačen prevoz s parkirišča',
    dressOkTitle: 'Priporočena oblačila',
    dressNoTitle: 'Ni dovoljeno (21+)',
    shuttleHighlightTitle: 'Parkirišče z brezplačnim shuttleom do JustMe',
    logisticsHeading: 'Dostop do JustMe Milano · Metro in shuttle',
    mapHeading: 'GPS koordinate & zemljevid · Viale Luigi Camoens 2',
    faqHeading: 'Pogosta vprašanja · Thanksgiving 2026 JustMe Milano',
    venueCta: 'Profil kluba JustMe Milano',
    dec31Title: 'Načrtujete tudi silvestrovanje 31. decembra v JustMe?',
    dec31Cta: 'Poglej 31. december JustMe',
    orthodoxTitle: 'Vas zanima tudi pravoslavno novo leto 13. januarja?',
    orthodoxCta: 'Poglej 13. januar JustMe Milano',
    heroLabels: [
      'Večerni prihod gostov pod stolpom Torre Branca v JustMe Milano',
      'Ameriški Royal Bife ob 19:30 z nastopom Old Turkey Show Cooking',
      'Ogrevan steklen paviljon z VIP Privé mizami v JustMe',
      'Glavno plesišče z Vida Loca Radio 105 do 05:00 zjutraj',
    ],
    nativeFaqs: [
      {
        q: 'Kaj vključuje vstopnica Aperitif + 1 pijača za 15€ na zahvalni dan?',
        a: 'Vstop med 19:30 in 22:00 vključuje eno pijačo, dostop do Full American Style Royal Buffeta z Old Turkey Show Cookingom in sladicami ter ostanek na zabavi Vida Loca.',
      },
      {
        q: 'Ali v četrtek 26. novembra 2026 poteka redni večer Viziatissima?',
        a: 'Ne. Od četrtka 26. novembra 2026 ima Viziatissima premor zaradi posebne prireditve Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Do kdaj velja vstop za mizo Dehor (320€)?',
        a: 'Gosti z mizo Dehor Table (320€) morajo vstopiti pred 23:00; mize Dance Floor (640€), Central (1.280€), VIP Front (3.200€) in DJ (5.000€) usklajujemo neposredno.',
      },
    ],
  },
  sv: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milano | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 på JustMe Milano tor 26 nov: 19:30 Amerikansk Buffé, Old Turkey Show Cooking & Vida Loca Radio 105. Biljett 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca på JustMe Milano: Buffé & Nattklubb',
    subtitle: 'Torsdag 26 november 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 till 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving Special 2026 · Vida Loca Radio 105 · Gratis Parkeringsshuttle',
    dateBadge: 'Tor 26 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffé 15€ · Club 15€ · Bord 320€–5.000€',
    ageDressBadge: '21+ · Elegant (långbyxor krav för män)',
    leadIntro: 'Torsdag den 26 november 2026 firar JustMe Milano Thanksgiving vid foten av Torre Branca i Parco Sempione: dörrarna öppnar kl. 19:30 med Full American Style Royal Buffet och live Show Cooking av Old Turkey, följt från 22:30 till 05:00 av Vida Loca Radio 105.',
    extraNativeParagraph: 'Eftersom veckoklubben Viziatissima pausar från och med 26 november förenas amerikanska klassiker och desserter med House, Hip-Hop, Hits, EDM och Reggaeton.',
    homeLabel: 'Hem',
    eventsLabel: 'Evenemang Milano',
    specialLabel: 'Specialevenemang',
    ctaBuyNowLabel: 'Boka Online (15€ – 1.280€)',
    ctaXceedLabel: 'Officiell Xceed #249216',
    ctaWhatsappLabel: 'Restaurangbord & VIP 24/7',
    ctaShuttleLabel: 'Gratis Parkeringsshuttle',
    tocTitle: 'Guideindex · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Översikt & tidsschema 26 november',
      '2. Onlinebiljetter & bord (från 15€)',
      '3. Amerikansk Royal Buffé & Old Turkey Show',
      '4. Alla 7 officiella priser Xceed #249216',
      '5. Klädkod 21+, gratis shuttle & karta',
      '6. Betalningsvillkor & bekräftelse',
      '7. Vanliga frågor (12 FAQ)',
    ],
    quickLabels: ['Datum & tider', 'Exakt adress', 'Buffé & musik', 'Ålder & klädkod', 'Bekräftade priser', 'Gratis shuttle'],
    overviewHeading: 'Eventöversikt · Thanksgiving & Vida Loca i Milano',
    timelineHeading: 'Kvällens Schema · 26–27 November 2026',
    timelineSubheading: 'Från amerikansk buffé kl. 19:30 till Vida Loca-final kl. 05:00',
    timelineTitles: [
      '19:30 · Insläpp & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking med kända Old Turkey',
      '21:30 · American Dessert Selection & drinkar',
      '22:30 · Nattklubb Vida Loca (15€) & Dehor senast 23:00',
      '00:00–05:00 · Vida Loca Radio 105 Huvudshow & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Desserter',
    buffetSubheading: 'Aperitif + 1 Drink 15€ (19:30–22:00) och restaurangbordsförfrågningar via WhatsApp dygnet runt',
    buffetCardTitle: 'Amerikansk Royal Buffé & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Bord Vida Loca (320€–5.000€)',
    tiersHeading: 'Alla 7 Officiella Priser (Xceed #249216)',
    tiersSubheading: 'Direkt onlinebokning av Buffé, Club, Dehor-, Dance Floor- och Centralbord',
    dressShuttleHeading: 'Åldersgräns 21+, klädkod & gratis shuttleservice',
    dressShuttleSubheading: 'Långbyxor obligatoriskt för män samt gratis shuttle från partnerparkering',
    dressOkTitle: 'Rekommenderad klädsel',
    dressNoTitle: 'Ej tillåtet i dörren (21+)',
    shuttleHighlightTitle: 'Parkering med gratis shuttlebuss t/r',
    logisticsHeading: 'Ta sig till JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS-koordinater & karta · Viale Luigi Camoens 2',
    faqHeading: 'Vanliga Frågor · Thanksgiving 2026 JustMe Milano',
    venueCta: 'JustMe Milano Klubbguide',
    dec31Title: 'Planerar du även Nyårsafton 31 december på JustMe?',
    dec31Cta: 'Se Nyår 31 Dec JustMe',
    orthodoxTitle: 'Nyfiken på Ortodoxt Nyår 13 januari på JustMe?',
    orthodoxCta: 'Se 13 Jan JustMe Milano',
    heroLabels: [
      'Kvällsankomst under Torre Branca vid JustMe Milano',
      '19:30 Amerikansk Royal Buffé med live Old Turkey Show Cooking',
      'Uppvärmd glaspaviljong med VIP Privé-bord på JustMe',
      'Huvuddansgolvet med Vida Loca Radio 105 till kl. 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Vad ingår i 15€ Aperitif + 1 Drink-biljetten på Thanksgiving?',
        a: 'Entré mellan 19:30 och 22:00 ger 1 dryck, tillgång till Full American Style Royal Buffet med Old Turkey Show Cooking och efterrätter samt fortsatt tillträde till Vida Loca.',
      },
      {
        q: 'Körs torsdagsklubben Viziatissima den 26 november 2026?',
        a: 'Nej. Från torsdag den 26 november 2026 pausar Viziatissima officiellt för denna speciella Happy Thanksgiving & Vida Loca Radio 105-kväll.',
      },
      {
        q: 'Vilken ankomsttid gäller för ett 320€ Dehor Table?',
        a: 'Gäster med Dehor Table (320€) måste anlända före kl. 23:00; övriga bord (640€–5.000€) samordnas smidigt via concierge.',
      },
    ],
  },
  no: {
    metaTitle: 'Thanksgiving 2026 & Vida Loca JustMe Milano | 26 Nov · 15€',
    metaDescription: `Thanksgiving 2026 på JustMe Milano tors 26. nov: 19:30 Amerikansk Buffé, Old Turkey Show Cooking & Vida Loca Radio 105. Billett 15€, VIP ${PHONE}.`,
    h1: 'Thanksgiving 2026 & Vida Loca på JustMe Milano: Buffé & Klubb',
    subtitle: 'Torsdag 26. november 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 til 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving 2026 · Vida Loca Radio 105 · Gratis Parkeringsshuttle',
    dateBadge: 'Tors 26. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Buffé 15€ · Club 15€ · Bord 320€–5.000€',
    ageDressBadge: '21+ · Elegant (langbukse påbudt for menn)',
    leadIntro: 'Torsdag 26. november 2026 feirer JustMe Milano Thanksgiving ved Torre Branca i Parco Sempione med Full American Style Royal Buffet og live Show Cooking av Old Turkey fra 19:30, og Vida Loca Radio 105 fra 22:30 til 05:00.',
    extraNativeParagraph: 'Da torsdagskonseptet Viziatissima tar pause fra 26. november, kombinerer denne spesielle kvelden amerikanske retter og desserter med House, Hip-Hop, Hits, EDM og Reggaeton.',
    homeLabel: 'Hjem',
    eventsLabel: 'Events Milano',
    specialLabel: 'Spesialeventer',
    ctaBuyNowLabel: 'Bestill på Nett (15€ – 1.280€)',
    ctaXceedLabel: 'Offisiell Xceed #249216',
    ctaWhatsappLabel: 'Restaurant & VIP Concierge 24/7',
    ctaShuttleLabel: 'Parkering & Gratis Shuttle',
    tocTitle: 'Veiledning · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Oversikt og program 26. november',
      '2. Nettbestilling av billetter og bord (15€+)',
      '3. Amerikansk Royal Buffé & Old Turkey Show',
      '4. Alle 7 offisielle priser Xceed #249216',
      '5. Kleskode 21+, gratis shuttle og kart',
      '6. Betalingsregler og bekreftelse',
      '7. Ofte stilte spørsmål (12 FAQ)',
    ],
    quickLabels: ['Dato og tider', 'Nøyaktig adresse', 'Buffé og musikk', 'Alder og kleskode', 'Bekreftede priser', 'Gratis shuttle'],
    overviewHeading: 'Oversikt · Thanksgiving & Vida Loca i Milano',
    timelineHeading: 'Kveldens Program · 26.–27. November 2026',
    timelineSubheading: 'Fra kl. 19:30 amerikansk buffé til kl. 05:00 Vida Loca-slutt',
    timelineTitles: [
      '19:30 · Dørene Åpner & Full American Royal Buffet (15€)',
      '20:15 · Live Show Cooking av Berømte Old Turkey',
      '21:30 · American Dessert Selection & cocktails',
      '22:30 · Klubbstart Vida Loca (15€) & Dehor innen 23:00',
      '00:00–05:00 · Hovedshow Vida Loca Radio 105 & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Desserter',
    buffetSubheading: 'Aperitif + 1 Drink 15€ (19:30–22:00) og restaurantbord via WhatsApp 24/7',
    buffetCardTitle: 'Amerikansk Royal Buffé & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Bord Vida Loca (320€–5.000€)',
    tiersHeading: 'Alle 7 Offisielle Priser Xceed #249216',
    tiersSubheading: 'Direkte nettkjøp av Buffé, Club og bord (Dehor, Dance Floor & Central)',
    dressShuttleHeading: 'Aldersgrense 21+, kleskode & gratis shuttlebuss',
    dressShuttleSubheading: 'Langbukse påbudt for menn samt gratis shuttle fra partnerparkering',
    dressOkTitle: 'Anbefalt antrekk',
    dressNoTitle: 'Ikke tillatt i døren (21+)',
    shuttleHighlightTitle: 'Parkering med gratis shuttlebuss til JustMe',
    logisticsHeading: 'Veibeskrivelse til JustMe Milano · Metro & Shuttle',
    mapHeading: 'GPS Koordinater & Kart · Viale Luigi Camoens 2',
    faqHeading: 'Ofte Stilte Spørsmål · Thanksgiving 2026 JustMe',
    venueCta: 'JustMe Milano Klubbprofil',
    dec31Title: 'Skal du også feire Nyttårsaften 31. desember på JustMe?',
    dec31Cta: 'Se 31. Des Nyttår JustMe',
    orthodoxTitle: 'Ser du etter Ortodoks Nyttår 13. januar på JustMe?',
    orthodoxCta: 'Se 13. Jan JustMe Milano',
    heroLabels: [
      'Kveldsankomst under Torre Branca ved JustMe Milano',
      '19:30 Amerikansk Royal Buffé med live Old Turkey Show Cooking',
      'Oppvarmet glasspaviljong med VIP Privé bord på JustMe',
      'Hoveddansegulvet med Vida Loca Radio 105 til kl. 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Hva inngår i 15€ Aperitif + 1 Drink billetten på Thanksgiving?',
        a: 'Inngang mellom 19:30 og 22:00 inkluderer 1 drink, adgang til Full American Style Royal Buffet med Old Turkey Show Cooking og desserter samt videre adgang til Vida Loca klubbfesten.',
      },
      {
        q: 'Arrangeres den faste torsdagskvelden Viziatissima 26. november?',
        a: 'Nei. Fra 26. november 2026 tar Viziatissima pause for å gi plass til Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Hva er fristen for ankomst til 320€ Dehor Table?',
        a: 'Dehor Table (320€) krever oppmøte senest kl. 23:00; øvrige bord (640€–5.000€) koordineres direkte.',
      },
    ],
  },
  is: {
    metaTitle: 'Þakkargjörð 2026 & Vida Loca JustMe Mílanó | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 á JustMe Mílanó fim 26. nóv: 19:30 Amerískt Hlaðborð, Old Turkey Show Cooking & Vida Loca Radio 105. Miði 15€, VIP ${PHONE}.`,
    h1: 'Þakkargjörð 2026 & Vida Loca á JustMe Mílanó: Hlaðborð & Klúbbur',
    subtitle: 'Fimmtudagur 26. nóvember 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 til 05:00 · Parco Sempione',
    themeTag: 'Þakkargjörðarsérviðburður 2026 · Vida Loca Radio 105 · Ókeypis Skutla',
    dateBadge: 'Fim 26. Nóv 2026 · 19:30 / 05:00',
    priceBadge: 'Hlaðborð 15€ · Klúbbur 15€ · Borð 320€–5.000€',
    ageDressBadge: '21+ · Glæsilegt (karlar verða að vera í síðbuxum)',
    leadIntro: 'Fimmtudaginn 26. nóvember 2026 fagnar JustMe Milano þakkargjörðarhátíðinni undir Torre Branca í Parco Sempione: kl. 19:30 opnar Full American Style Royal Buffet með Old Turkey Show Cooking og frá 22:30 til 05:00 tekur Vida Loca Radio 105 við.',
    extraNativeParagraph: 'Þar sem vikulegt Viziatissima kvöld fer í pásu frá 26. nóvember sameinar þetta sérstaka kvöld ameríska rétti, eftirrétti og House, Hip-Hop, Hits, EDM og Reggaeton.',
    homeLabel: 'Heim',
    eventsLabel: 'Viðburðir Mílanó',
    specialLabel: 'Sérstakir viðburðir',
    ctaBuyNowLabel: 'Kaupa á Netinu (15€ – 1.280€)',
    ctaXceedLabel: 'Opinbert Xceed #249216',
    ctaWhatsappLabel: 'Veitingaborð & VIP 24/7',
    ctaShuttleLabel: 'Bílastæði & Ókeypis Skutla',
    tocTitle: 'Efnisyfirlit · Thanksgiving 2026 JustMe Mílanó',
    tocLabels: [
      '1. Yfirlit & dagskrá 26. nóvember',
      '2. Netmiðar & borðapantanir (15€+)',
      '3. Amerískt Hlaðborð & Old Turkey Show',
      '4. Öll 7 opinber verð Xceed #249216',
      '5. Klæðnaður 21+, ókeypis skutla & kort',
      '6. Greiðsluskilmálar & staðfesting',
      '7. Algengar spurningar (12 FAQ)',
    ],
    quickLabels: ['Dagsetning & tímar', 'Nákvæmt heimilisfang', 'Hlaðborð & tónlist', 'Aldur & klæðnaður', 'Staðfest verð', 'Ókeypis skutla'],
    overviewHeading: 'Yfirlit · Þakkargjörð & Vida Loca í Mílanó',
    timelineHeading: 'Dagskrá Næturinnar · 26.–27. Nóvember 2026',
    timelineSubheading: 'Frá ameríska hlaðborðinu kl. 19:30 til loka Vida Loca kl. 05:00',
    timelineTitles: [
      '19:30 · Húsið opnar & Full American Royal Buffet (15€)',
      '20:15 · Lifandi Show Cooking með Old Turkey kalkún',
      '21:30 · American Dessert Selection & kokteilar',
      '22:30 · Klúbbopnun Vida Loca (15€) & Dehor til 23:00',
      '00:00–05:00 · Aðalsýning Vida Loca Radio 105 & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Eftirréttir',
    buffetSubheading: 'Aperitif + 1 Drykkur á 15€ (19:30–22:00) og fyrirspurnir um veitingaborð í WhatsApp 24/7',
    buffetCardTitle: 'Amerískt Royal Hlaðborð & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Borð Vida Loca (320€–5.000€)',
    tiersHeading: 'Öll 7 opinber verð (Xceed #249216)',
    tiersSubheading: 'Bein netbókun á Hlaðborði, Klúbbi, Dehor, Dance Floor og Central borðum',
    dressShuttleHeading: 'Aldurstakmark 21+, klæðnaður & ókeypis skutla',
    dressShuttleSubheading: 'Karlar verða að vera í síðbuxum (21+) og boðið er upp á ókeypis skutlu af bílastæði',
    dressOkTitle: 'Ráðlagður klæðnaður',
    dressNoTitle: 'Ekki heimilað (21+)',
    shuttleHighlightTitle: 'Bílastæði með ókeypis skutlu að JustMe',
    logisticsHeading: 'Leiðarlýsing að JustMe Milano · Neðanjarðarlest & Skutla',
    mapHeading: 'GPS hnit & kort · Viale Luigi Camoens 2',
    faqHeading: 'Algengar spurningar · Thanksgiving 2026 JustMe',
    venueCta: 'Klúbbasíða JustMe Mílanó',
    dec31Title: 'Einnig að skoða Gamlárskvöld 31. desember á JustMe?',
    dec31Cta: 'Sjá 31. Des JustMe Mílanó',
    orthodoxTitle: 'Áhugi á Rétttrúnaðar Nýári 13. janúar á JustMe?',
    orthodoxCta: 'Sjá 13. Jan JustMe Mílanó',
    heroLabels: [
      'Kvöldkoma gesta undir Torre Branca við JustMe Mílanó',
      '19:30 Amerískt Royal Hlaðborð með lifandi Old Turkey Show Cooking',
      'Upphitaður glerskáli með VIP Privé borðum á JustMe',
      'Aðalgólfið með Vida Loca Radio 105 fram til kl. 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Hvað felst í 15€ Aperitif + 1 Drink miðanum á Þakkargjörðinni?',
        a: 'Innganga milli 19:30 og 22:00 inniheldur einn drykk, aðgang að Full American Style Royal Buffet með Old Turkey Show Cooking og eftirréttum ásamt klúbbkvöldinu Vida Loca.',
      },
      {
        q: 'Verður vikulega kvöldið Viziatissima haldið 26. nóvember 2026?',
        a: 'Nei. Frá 26. nóvember 2026 tekur Viziatissima hlé til að gefa rými fyrir Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Hvenær þarf að mæta fyrir 320€ Dehor Table?',
        a: 'Gestir með Dehor Table (320€) þurfa að koma inn fyrir kl. 23:00; önnur borð (640€–5.000€) eru skipulögð beint.',
      },
    ],
  },
  uk: {
    metaTitle: 'День Подяки 2026 & Vida Loca JustMe Мілан | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 у JustMe Мілан чт 26 лист: 19:30 Американський буфет із шоу Old Turkey та Vida Loca Radio 105. Квиток 15€, VIP ${PHONE}.`,
    h1: 'День Подяки 2026 & Vida Loca у JustMe Мілан: Буфет і Клуб',
    subtitle: 'Четвер 26 листопада 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 до 05:00 · Parco Sempione',
    themeTag: 'Спецвипуск Thanksgiving 2026 · Vida Loca Radio 105 · Безкоштовний Шатл',
    dateBadge: 'Чт 26 Лист 2026 · 19:30 / 05:00',
    priceBadge: 'Буфет 15€ · Клуб 15€ · Столи 320€–5.000€',
    ageDressBadge: '21+ · Елегантний стиль (чоловікам штани обов’язково)',
    leadIntro: 'У четвер 26 листопада 2026 року клуб JustMe Milano біля підсвіченої вежі Torre Branca у Парко Семпіоне святкує День Подяки: з 19:30 діє Full American Style Royal Buffet із кулінарним шоу славнозвісної індички Old Turkey, а з 22:30 до 05:00 триває тур Vida Loca Radio 105.',
    extraNativeParagraph: 'Оскільки щотижнева вечірка Viziatissima бере паузу з 26 листопада, святковий формат об’єднує американські страви, десерти та мікс House, Hip-Hop, Hits, EDM і Reggaeton.',
    homeLabel: 'Головна',
    eventsLabel: 'Події Мілана',
    specialLabel: 'Спеціальні події',
    ctaBuyNowLabel: 'Купити Онлайн (15€ – 1.280€)',
    ctaXceedLabel: 'Офіційний Xceed #249216',
    ctaWhatsappLabel: 'Столи ресторану та VIP 24/7',
    ctaShuttleLabel: 'Паркінг із безкоштовним шатлом',
    tocTitle: 'Зміст гіда · Thanksgiving 2026 JustMe Мілан',
    tocLabels: [
      '1. Огляд і розклад на 26 листопада',
      '2. Онлайн-квитки та VIP-столи (від 15€)',
      '3. Американський Royal Буфет і шоу Old Turkey',
      '4. Усі 7 офіційних тарифів Xceed #249216',
      '5. Дрес-код 21+, безкоштовний шатл і карта',
      '6. Умови оплати та підтвердження',
      '7. Поширені запитання (12 FAQ)',
    ],
    quickLabels: ['Дата і час', 'Точна адреса', 'Буфет і музика', 'Вік і дрес-код', 'Офіційні ціни', 'Безкоштовний шатл'],
    overviewHeading: 'Огляд події · День Подяки та Vida Loca в Мілані',
    timelineHeading: 'Розклад ночі · 26–27 листопада 2026',
    timelineSubheading: 'Від американського фуршету о 19:30 до фіналу Vida Loca о 05:00 ранку',
    timelineTitles: [
      '19:30 · Відкриття дверей і Full American Royal Buffet (15€)',
      '20:15 · Живе Show Cooking: нарізка фірмової індички Old Turkey',
      '21:30 · American Dessert Selection & коктейлі',
      '22:30 · Вхід у клуб Vida Loca (15€) & Dehor до 23:00',
      '00:00–05:00 · Головний сет Vida Loca Radio 105 & VIP-сервіс',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey та десерти',
    buffetSubheading: 'Квиток Aperitif + 1 Drink за 15€ (19:30–22:00) та бронювання столів ресторану через WhatsApp 24/7',
    buffetCardTitle: 'Американський Royal Буфет & Old Turkey (15€)',
    tablesCardTitle: 'VIP-столи Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Усі 7 підтверджених тарифів Xceed #249216',
    tiersSubheading: 'Миттєва онлайн-покупка квитків Буфет, Клуб та столів Dehor, Pista і Central',
    dressShuttleHeading: 'Вхід 21+, дрес-код та паркінг із безкоштовним шатлом',
    dressShuttleSubheading: 'Довгі штани обов’язкові для чоловіків і безкоштовний трансфер із партнерського паркінгу',
    dressOkTitle: 'Рекомендований дрес-код',
    dressNoTitle: 'Заборонено на вході (21+)',
    shuttleHighlightTitle: 'Паркінг із безкоштовним шатлом до Torre Branca',
    logisticsHeading: 'Як дістатися JustMe Milano · Метро і шатл',
    mapHeading: 'GPS-координати та карта · Viale Luigi Camoens 2',
    faqHeading: 'Поширені запитання · Thanksgiving 2026 JustMe',
    venueCta: 'Гід по клубу JustMe Мілан',
    dec31Title: 'Також плануєте Новий Рік 31 грудня в JustMe Мілан?',
    dec31Cta: 'Дивитись 31 грудня JustMe',
    orthodoxTitle: 'Цікавить Старий Новий Рік 13 січня в JustMe?',
    orthodoxCta: 'Дивитись 13 січня JustMe',
    heroLabels: [
      'Вечірній приїзд гостей під вежею Torre Branca до JustMe Мілан',
      'Американський Royal Буфет о 19:30 із живим шоу Old Turkey',
      'Опалювана скляна веранда з VIP Privé столами в JustMe',
      'Головний танцпол із туром Vida Loca Radio 105 до 05:00 ранку',
    ],
    nativeFaqs: [
      {
        q: 'Що входить у квиток Aperitif + 1 Drink за 15€ на День Подяки?',
        a: 'Вхід з 19:30 до 22:00 включає 1 напій, доступ до Full American Style Royal Buffet із шоу Old Turkey і десертами та продовження вечірки на Vida Loca.',
      },
      {
        q: 'Чи відбудеться регулярний четвер Viziatissima 26 листопада 2026?',
        a: 'Ні. Із 26 листопада 2026 формат Viziatissima стає на паузу заради особливої ночі Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Який крайній час прибуття для столу Dehor за 320€?',
        a: 'Гості зі столом Dehor Table (320€) повинні увійти до 23:00; столи Dance Floor (640€), Central (1.280€), VIP Front (3.200€) та DJ (5.000€) узгоджуються напряму.',
      },
    ],
  },
  sq: {
    metaTitle: 'Falënderimet 2026 & Vida Loca JustMe Milano | 26 Nën · 15€',
    metaDescription: `Thanksgiving 2026 në JustMe Milano e enjte 26 nën: 19:30 Bufe Amerikane me Old Turkey Show Cooking & Vida Loca Radio 105. Biletë 15€, VIP ${PHONE}.`,
    h1: 'Dita e Falënderimeve 2026 & Vida Loca në JustMe Milano: Bufe & Club',
    subtitle: 'E enjte, 26 nëntor 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 deri në 05:00 · Parco Sempione',
    themeTag: 'Edicioni Thanksgiving 2026 · Vida Loca Radio 105 · Parkim me Shuttle Falas',
    dateBadge: 'Enj 26 Nën 2026 · 19:30 / 05:00',
    priceBadge: 'Bufe 15€ · Club 15€ · Tavolina 320€–5.000€',
    ageDressBadge: '21+ · Elegant (pantallona të gjata të detyrueshme)',
    leadIntro: 'Të enjten më 26 nëntor 2026, JustMe Milano feston Ditën e Falënderimeve poshtë kullës Torre Branca në Parco Sempione: nga ora 19:30 hapet Full American Style Royal Buffet me Show Cooking live të Old Turkey dhe nga 22:30 deri në 05:00 vijon Vida Loca Radio 105.',
    extraNativeParagraph: 'Pasi formati javor Viziatissima pushon nga 26 nëntori, kjo natë e veçantë bashkon ushqimet amerikane dhe ëmbëlsirat me tingujt House, Hip-Hop, Hits, EDM dhe Reggaeton.',
    homeLabel: 'Kryefaqja',
    eventsLabel: 'Evente Milano',
    specialLabel: 'Evente Speciale',
    ctaBuyNowLabel: 'Rezervo Online (15€ – 1.280€)',
    ctaXceedLabel: 'Kanali Zyrtar Xceed #249216',
    ctaWhatsappLabel: 'Tavolina Restoranti & VIP 24/7',
    ctaShuttleLabel: 'Parkim me Shuttle Falas',
    tocTitle: 'Përmbajtja · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Përmbledhje & Orari i 26 Nëntorit',
      '2. Bileta & Tavolina Online (15€+)',
      '3. Bufe Amerikane & Old Turkey Show',
      '4. Të 7 Çmimet Zyrtare Xceed #249216',
      '5. Kodi i Veshjes 21+, Shuttle Falas & Harta',
      '6. Kushtet e Pagesës & Konfirmimi',
      '7. Pyetjet më të Shpeshta (12 FAQ)',
    ],
    quickLabels: ['Data & Orët', 'Adresa e Saktë', 'Bufe & Muzikë', 'Mosha & Veshja', 'Çmimet Zyrtare', 'Shuttle Falas'],
    overviewHeading: 'Përmbledhje · Thanksgiving Day & Vida Loca në Milano',
    timelineHeading: 'Programi i Natës · 26–27 Nëntor 2026',
    timelineSubheading: 'Nga bufeja amerikane në 19:30 deri në mbylljen e Vida Loca në 05:00',
    timelineTitles: [
      '19:30 · Hapja e Dyerve & Full American Royal Buffet (15€)',
      '20:15 · Show Cooking Live: Gjeldeti i Famshëm Old Turkey',
      '21:30 · American Dessert Selection & Kokteje',
      '22:30 · Hyrja Club Vida Loca (15€) & Dehor deri 23:00',
      '00:00–05:00 · Shfaqja Kryesore Vida Loca Radio 105 & VIP',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Ëmbëlsira',
    buffetSubheading: 'Bileta Aperitif + 1 Pije 15€ (19:30–22:00) dhe kërkesa për tavolina restoranti në WhatsApp 24/7',
    buffetCardTitle: 'Bufe Mbretërore Amerikane & Old Turkey (15€)',
    tablesCardTitle: 'Tavolina VIP Privé Vida Loca (320€–5.000€)',
    tiersHeading: 'Të 7 Tarifat e Konfirmuara (Xceed #249216)',
    tiersSubheading: 'Blerje direkte online për Bufe, Club dhe tavolina Dehor, Dance Floor & Central',
    dressShuttleHeading: 'Mosha 21+, Kodi i Veshjes & Parkim me Shuttle Falas',
    dressShuttleSubheading: 'Pantallona të gjata të detyrueshme për burrat (21+) dhe autobus falas nga parkingu',
    dressOkTitle: 'Veshja e Miratuar',
    dressNoTitle: 'Nuk Lejohet (21+)',
    shuttleHighlightTitle: 'Parkim me Shërbim Shuttle Falas drejt JustMe',
    logisticsHeading: 'Si të Arrisni në JustMe Milano · Metro & Shuttle',
    mapHeading: 'Koordinatat GPS & Harta · Viale Luigi Camoens 2',
    faqHeading: 'Pyetje të Shpeshta · Thanksgiving 2026 JustMe',
    venueCta: 'Profili i Klubit JustMe Milano',
    dec31Title: 'Po planifikoni edhe Vitin e Ri 31 Dhjetor në JustMe?',
    dec31Cta: 'Shiko 31 Dhjetor JustMe',
    orthodoxTitle: 'Interesoheni edhe për 13 Janarin në JustMe Milano?',
    orthodoxCta: 'Shiko 13 Janar JustMe',
    heroLabels: [
      'Mbërritja në mbrëmje poshtë Torre Branca te JustMe Milano',
      'Bufe Amerikane 19:30 me Show Cooking të gjeldetit Old Turkey',
      'Verandë qelqi me ngrohje dhe tavolina VIP Privé te JustMe',
      'Pista kryesore me Vida Loca Radio 105 deri në orën 05:00',
    ],
    nativeFaqs: [
      {
        q: 'Çfarë përfshin bileta 15€ Aperitif + 1 Drink për Falënderimet?',
        a: 'Hyrja midis 19:30 dhe 22:00 përfshin 1 pije, akses të plotë në Full American Style Royal Buffet me Old Turkey Show Cooking dhe ëmbëlsira, si dhe qëndrimin për festën Vida Loca.',
      },
      {
        q: 'A mbahet mbrëmja e zakonshme e së enjtes Viziatissima më 26 nëntor?',
        a: 'Jo. Nga e enjtja 26 nëntor 2026, Viziatissima ndalon përkohësisht për t’i hapur rrugë eventit special Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Cila është ora kufi për tavolinën Dehor prej 320€?',
        a: 'Mysafirët e Dehor Table (320€) duhet të hyjnë deri në 23:00; tavolinat e tjera (640€–5.000€) koordinohen drejtpërdrejt.',
      },
    ],
  },
  sr: {
    metaTitle: 'Dan zahvalnosti 2026 & Vida Loca JustMe Milano | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 u JustMe Milano čet 26.11.: 19:30 Američki Bife, Old Turkey Show & Vida Loca Radio 105. Karta 15€, VIP ${PHONE}.`,
    h1: 'Dan zahvalnosti 2026 & Vida Loca u JustMe Milano: Bife & Klub',
    subtitle: 'Četvrtak, 26. novembar 2026. · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 do 05:00 · Parco Sempione',
    themeTag: 'Thanksgiving Specijal 2026 · Vida Loca Radio 105 · Besplatan Parking Shuttle',
    dateBadge: 'Čet 26. Nov 2026. · 19:30 / 05:00',
    priceBadge: 'Bife 15€ · Klub 15€ · Stolovi 320€–5.000€',
    ageDressBadge: '21+ · Elegantno (duge pantalone obavezne)',
    leadIntro: 'U četvrtak 26. novembra 2026. JustMe Milano ispod osvetljene Torre Branca slavi Dan zahvalnosti: od 19:30 služi se Full American Style Royal Buffet uz Old Turkey Show Cooking, dok od 22:30 do 05:00 traje žurka Vida Loca Radio 105.',
    extraNativeParagraph: 'Pošto redovni četvrtak Viziatissima pauzira od 26. novembra, specijalno izdanje spaja američke specijalitete, deserte i muziku House, Hip-Hop, Hits, EDM i Reggaeton.',
    homeLabel: 'Početna',
    eventsLabel: 'Događaji Milano',
    specialLabel: 'Specijalni eventi',
    ctaBuyNowLabel: 'Kupi Online (15€ – 1.280€)',
    ctaXceedLabel: 'Zvanični Xceed #249216',
    ctaWhatsappLabel: 'Restoran i VIP Konsijerž 24/7',
    ctaShuttleLabel: 'Parking sa Besplatnim Shuttleom',
    tocTitle: 'Sadržaj vodiča · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Pregled i satnica 26. novembra',
      '2. Online karte i VIP stolovi (15€+)',
      '3. Američki Royal Bife & Old Turkey Show',
      '4. Svih 7 zvaničnih cena Xceed #249216',
      '5. Dress Code 21+, besplatan shuttle i mapa',
      '6. Pravila plaćanja i potvrde',
      '7. Česta pitanja (12 FAQ)',
    ],
    quickLabels: ['Datum i sati', 'Tačna adresa', 'Bife i muzika', 'Godine i stil', 'Potvrđene cene', 'Besplatan shuttle'],
    overviewHeading: 'Pregled večeri · Dan zahvalnosti & Vida Loca u Milanu',
    timelineHeading: 'Satnica noći · 26.–27. novembar 2026.',
    timelineSubheading: 'Od američkog bifea u 19:30 do završetka Vida Loca programa u 05:00',
    timelineTitles: [
      '19:30 · Otvaranje & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking čuvene ćurke Old Turkey',
      '21:30 · American Dessert Selection & kokteli',
      '22:30 · Ulaz u klub Vida Loca (15€) & Dehor rok 23:00',
      '00:00–05:00 · Glavni šou Vida Loca Radio 105 & VIP stolovi',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Deserti',
    buffetSubheading: 'Ulaznica Aperitif + 1 piće 15€ (19:30–22:00) i upiti za restoranske stolove putem WhatsAppa 24/7',
    buffetCardTitle: 'Američki Royal Bife & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Stolovi Vida Loca (320€–5.000€)',
    tiersHeading: 'Svih 7 potvrđenih tarifa Xceed #249216',
    tiersSubheading: 'Direktna online kupovina za Bife, Klub i stolove Dehor, Dance Floor i Central',
    dressShuttleHeading: 'Ulaz 21+, Dress Code i besplatni shuttle prevoz',
    dressShuttleSubheading: 'Obavezne duge pantalone za muškarce (21+) i besplatan prevoz sa parkinga',
    dressOkTitle: 'Preporučena garderoba',
    dressNoTitle: 'Nije dozvoljeno (21+)',
    shuttleHighlightTitle: 'Parking sa besplatnim shuttle autobusom',
    logisticsHeading: 'Kako doći do JustMe Milano · Metro, Taksi & Shuttle',
    mapHeading: 'GPS koordinate & mapa · Viale Luigi Camoens 2',
    faqHeading: 'Česta pitanja · Thanksgiving 2026 JustMe Milano',
    venueCta: 'Profil kluba JustMe Milano',
    dec31Title: 'Planirate i Doček Nove godine 31. decembra u JustMe?',
    dec31Cta: 'Vidi 31. decembar JustMe',
    orthodoxTitle: 'Zanima vas i Pravoslavna Nova godina 13. januara?',
    orthodoxCta: 'Vidi 13. januar JustMe Milano',
    heroLabels: [
      'Večernji dolazak ispod Torre Branca u JustMe Milano',
      'Američki Royal Bife u 19:30 i live Show Cooking Old Turkey',
      'Grejana staklena veranda sa VIP Privé stolovima u JustMe',
      'Glavni podijum uz Vida Loca Radio 105 do 05:00 ujutru',
    ],
    nativeFaqs: [
      {
        q: 'Šta obuhvata karta Aperitif + 1 piće od 15€ za Dan zahvalnosti?',
        a: 'Ulazak između 19:30 i 22:00 uključuje 1 piće, pristup Full American Style Royal Buffetu sa Old Turkey Show Cookingom i desertima te ostanak na žurci Vida Loca.',
      },
      {
        q: 'Da li se održava redovna žurka Viziatissima u četvrtak 26. novembra?',
        a: 'Ne. Od četvrtka 26. novembra 2026. Viziatissima pravi pauzu za specijalno izdanje Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Do koliko sati važi ulazak za Dehor Table (320€)?',
        a: 'Gosti stola Dehor Table (320€) moraju ući do 23:00; ostali stolovi (640€–5.000€) koordiniraju se direktno.',
      },
    ],
  },
  bs: {
    metaTitle: 'Dan zahvalnosti 2026 & Vida Loca JustMe Milano | 26.11 · 15€',
    metaDescription: `Thanksgiving 2026 u JustMe Milano čet 26.11.: 19:30 Američki Royal Buffet, Old Turkey Show Cooking i Vida Loca Radio 105. Karta 15€, VIP ${PHONE}.`,
    h1: 'Dan zahvalnosti 2026 & Vida Loca u JustMe Milano: Bife & Klub',
    subtitle: 'Četvrtak, 26. novembar 2026. · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 do 05:00 · Parco Sempione',
    themeTag: 'Specijal Thanksgiving 2026 · Vida Loca Radio 105 · Besplatan Shuttle Parking',
    dateBadge: 'Čet 26. Nov 2026. · 19:30 / 05:00',
    priceBadge: 'Bife 15€ · Klub 15€ · Stolovi 320€–5.000€',
    ageDressBadge: '21+ · Elegantno (duge pantalone obavezne za muškarce)',
    leadIntro: 'U četvrtak 26. novembra 2026. JustMe Milano ispod osvijetljenog tornja Torre Branca u Parco Sempione slavi Dan zahvalnosti: od 19:30 počinje Full American Style Royal Buffet uz Old Turkey Show Cooking, a od 22:30 do 05:00 traje zabava Vida Loca Radio 105.',
    extraNativeParagraph: 'Pošto redovni četvrtak Viziatissima pauzira od 26. novembra, ova posebna noć spaja američke specijalitete, deserte i muziku House, Hip-Hop, Hits, EDM i Reggaeton.',
    homeLabel: 'Početna',
    eventsLabel: 'Događaji Milano',
    specialLabel: 'Specijalni događaji',
    ctaBuyNowLabel: 'Kupi Online (15€ – 1.280€)',
    ctaXceedLabel: 'Zvanični Xceed #249216',
    ctaWhatsappLabel: 'Restoranski & VIP Stolovi 24/7',
    ctaShuttleLabel: 'Parking s Besplatnim Shuttleom',
    tocTitle: 'Sadržaj vodiča · Thanksgiving 2026 JustMe Milano',
    tocLabels: [
      '1. Pregled & satnica 26. novembra',
      '2. Online karte & stolovi (od 15€)',
      '3. Američki Royal Bife & Old Turkey Show',
      '4. Svih 7 zvaničnih tarifa Xceed #249216',
      '5. Dress Code 21+, besplatan shuttle & mapa',
      '6. Pravila plaćanja & potvrde',
      '7. Česta pitanja (12 FAQ)',
    ],
    quickLabels: ['Datum i sati', 'Tačna adresa', 'Bife i muzika', 'Dob i dress code', 'Potvrđene cijene', 'Besplatan shuttle'],
    overviewHeading: 'Pregled večeri · Thanksgiving & Vida Loca u Milanu',
    timelineHeading: 'Satnica noći · 26.–27. novembar 2026.',
    timelineSubheading: 'Od američkog bifea u 19:30 do zatvaranja Vida Loca u 05:00 sati',
    timelineTitles: [
      '19:30 · Otvaranje vrata & Full American Style Royal Buffet (15€)',
      '20:15 · Live Show Cooking poznate ćurke Old Turkey',
      '21:30 · American Dessert Selection & kokteli',
      '22:30 · Klub Vida Loca (15€) & Dehor rok 23:00',
      '00:00–05:00 · Glavni show Vida Loca Radio 105 & VIP servis',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Deserti',
    buffetSubheading: 'Ulaznica Aperitif + 1 piće za 15€ (19:30–22:00) i upiti za restoranske stolove putem WhatsAppa 24/7',
    buffetCardTitle: 'Američki Royal Bife & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Stolovi Vida Loca (320€–5.000€)',
    tiersHeading: 'Svih 7 potvrđenih cijena Xceed #249216',
    tiersSubheading: 'Direktna online rezervacija za Bife, Klub i stolove Dehor, Dance Floor & Central',
    dressShuttleHeading: 'Dob 21+, Dress Code i parking s besplatnim shuttleom',
    dressShuttleSubheading: 'Duge pantalone obavezne za muškarce (21+) i besplatan prijevoz s partnerskog parkinga',
    dressOkTitle: 'Preporučena odjeća',
    dressNoTitle: 'Nije dozvoljeno (21+)',
    shuttleHighlightTitle: 'Parking s besplatnim shuttle prevozom',
    logisticsHeading: 'Kako doći do JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS koordinate & mapa · Viale Luigi Camoens 2',
    faqHeading: 'Česta pitanja · Thanksgiving 2026 JustMe Milano',
    venueCta: 'Profil kluba JustMe Milano',
    dec31Title: 'Planirate i Novu godinu 31. decembra u JustMe?',
    dec31Cta: 'Pogledaj 31. decembar JustMe',
    orthodoxTitle: 'Zanima vas i Pravoslavna Nova godina 13. januara?',
    orthodoxCta: 'Pogledaj 13. januar JustMe',
    heroLabels: [
      'Večernji dolazak ispod Torre Branca u JustMe Milano',
      'Američki Royal Bife u 19:30 i live Show Cooking Old Turkey',
      'Grijana staklena veranda s VIP Privé stolovima u JustMe',
      'Glavni podij uz Vida Loca Radio 105 do 05:00 ujutro',
    ],
    nativeFaqs: [
      {
        q: 'Šta uključuje ulaznica Aperitif + 1 piće od 15€ za Thanksgiving?',
        a: 'Ulazak između 19:30 i 22:00 uključuje 1 piće, pristup Full American Style Royal Buffetu uz Old Turkey Show Cooking i deserte te nastavak u klubu Vida Loca.',
      },
      {
        q: 'Održava li se četvrtkom Viziatissima 26. novembra 2026.?',
        a: 'Ne. Od četvrtka 26. novembra 2026. Viziatissima ide na pauzu zbog specijalne noći Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Koji je krajnji rok dolaska za 320€ Dehor Table?',
        a: 'Gosti stola Dehor Table (320€) moraju ući najkasnije do 23:00; ostali stolovi (640€–5.000€) koordiniraju se direktno.',
      },
    ],
  },
  mk: {
    metaTitle: 'Ден на благодарноста 2026 & Vida Loca JustMe Милано | 15€',
    metaDescription: `Thanksgiving 2026 во JustMe Милано чет 26 ное: 19:30 Американски бифе со Old Turkey Show Cooking и Vida Loca Radio 105. Билет 15€, VIP ${PHONE}.`,
    h1: 'Ден на благодарноста 2026 & Vida Loca во JustMe Милано',
    subtitle: 'Четврток 26 ноември 2026 · 19:30 American Royal Buffet & Old Turkey / 22:30 Vida Loca Radio 105 до 05:00 · Parco Sempione',
    themeTag: 'Специјал Thanksgiving 2026 · Vida Loca Radio 105 · Бесплатен Шатл Паркинг',
    dateBadge: 'Чет 26 Ное 2026 · 19:30 / 05:00',
    priceBadge: 'Бифе 15€ · Клуб 15€ · Маси 320€–5.000€',
    ageDressBadge: '21+ · Елегантно (долги панталони задолжителни)',
    leadIntro: 'Во четврток 26 ноември 2026, JustMe Milano под кулата Torre Branca во Parco Sempione го слави Денот на благодарноста: од 19:30 со Full American Style Royal Buffet и Old Turkey Show Cooking, а од 22:30 до 05:00 со забавата Vida Loca Radio 105.',
    extraNativeParagraph: 'Бидејќи редовната четврточна вечер Viziatissima паузира од 26 ноември, овој настан ги спојува американските специјалитети и десерти со House, Hip-Hop, Hits, EDM и Reggaeton.',
    homeLabel: 'Почетна',
    eventsLabel: 'Настани Милано',
    specialLabel: 'Специјални настани',
    ctaBuyNowLabel: 'Купи Онлајн (15€ – 1.280€)',
    ctaXceedLabel: 'Официјален Xceed #249216',
    ctaWhatsappLabel: 'Ресторан & VIP Консиерж 24/7',
    ctaShuttleLabel: 'Паркинг со Бесплатен Шатл',
    tocTitle: 'Содржина · Thanksgiving 2026 JustMe Милано',
    tocLabels: [
      '1. Преглед и распоред за 26 ноември',
      '2. Онлајн билети и маси (од 15€)',
      '3. Американски Royal Бифе & Old Turkey Show',
      '4. Сите 7 официјални цени Xceed #249216',
      '5. Дрес-код 21+, бесплатен шатл и карта',
      '6. Услови за плаќање и потврда',
      '7. Често поставувани прашања (12 FAQ)',
    ],
    quickLabels: ['Датум и часови', 'Точна адреса', 'Бифе и музика', 'Возраст и дрес-код', 'Потврдени цени', 'Бесплатен шатл'],
    overviewHeading: 'Преглед на ноќта · Thanksgiving & Vida Loca во Милано',
    timelineHeading: 'Распоред на вечерта · 26–27 ноември 2026',
    timelineSubheading: 'Од американскиот бифе во 19:30 до крајот на Vida Loca во 05:00 часот',
    timelineTitles: [
      '19:30 · Отворање & Full American Style Royal Buffet (15€)',
      '20:15 · Show Cooking во живо со познатата мисирка Old Turkey',
      '21:30 · American Dessert Selection & коктели',
      '22:30 · Клупски влез Vida Loca (15€) & Dehor до 23:00',
      '00:00–05:00 · Главно шоу Vida Loca Radio 105 & VIP маси',
    ],
    buffetHeading: 'Full American Style Royal Buffet · Old Turkey & Десерти',
    buffetSubheading: 'Билет Aperitif + 1 пијалак за 15€ (19:30–22:00) и барања за ресторански маси на WhatsApp 24/7',
    buffetCardTitle: 'Американски Royal Бифе & Old Turkey (15€)',
    tablesCardTitle: 'VIP Privé Маси Vida Loca (320€–5.000€)',
    tiersHeading: 'Сите 7 потврдени тарифи Xceed #249216',
    tiersSubheading: 'Директна онлајн резервација за Бифе, Клуб и маси Dehor, Dance Floor & Central',
    dressShuttleHeading: 'Возраст 21+, дрес-код и паркинг со бесплатен шатл',
    dressShuttleSubheading: 'Долги панталони задолжителни за мажи (21+) и бесплатен превоз од паркингот',
    dressOkTitle: 'Препорачана облека',
    dressNoTitle: 'Забрането на влез (21+)',
    shuttleHighlightTitle: 'Паркинг со бесплатен шатл превоз до JustMe',
    logisticsHeading: 'Како да стигнете до JustMe Milano · Метро и шатл',
    mapHeading: 'GPS координати и карта · Viale Luigi Camoens 2',
    faqHeading: 'Чести прашања · Thanksgiving 2026 JustMe',
    venueCta: 'Профил на клуб JustMe Милано',
    dec31Title: 'Го планирате и пречекот на 31 декември во JustMe?',
    dec31Cta: 'Погледни 31 декември JustMe',
    orthodoxTitle: 'Ве интересира и 13 јануари Стара Нова Година?',
    orthodoxCta: 'Погледни 13 јануари JustMe',
    heroLabels: [
      'Вечерно пристигнување под Torre Branca во JustMe Милано',
      'Американски Royal Бифе во 19:30 со Show Cooking Old Turkey',
      'Загреана стаклена веранда со VIP Privé маси во JustMe',
      'Главен подиум со Vida Loca Radio 105 до 05:00 часот',
    ],
    nativeFaqs: [
      {
        q: 'Што опфаќа билетот Aperitif + 1 пијалак од 15€ за Thanksgiving?',
        a: 'Влезот помеѓу 19:30 и 22:00 вклучува 1 пијалак, целосен пристап до Full American Style Royal Buffet со Old Turkey Show Cooking и десерти плус забавата Vida Loca.',
      },
      {
        q: 'Дали се одржува редовната четврточна вечер Viziatissima на 26 ноември?',
        a: 'Не. Од четврток 26 ноември 2026 Viziatissima паузира за да го отстапи местото на Happy Thanksgiving & Vida Loca Radio 105.',
      },
      {
        q: 'Кој е крајниот рок за влез со 320€ Dehor Table?',
        a: 'Гостите со Dehor Table (320€) мора да влезат најдоцна до 23:00 часот; останатите маси (640€–5.000€) се договараат директно.',
      },
    ],
  },
};

function buildNarrativeAndFaqs(
  loc: LocaleCode,
  core: CoreLocalePack,
): Pick<
  ThanksgivingJustMeContent,
  | 'overviewParagraphs'
  | 'timelineSteps'
  | 'culinaryHighlights'
  | 'buffetCardCaption'
  | 'tablesCardCaption'
  | 'restaurantConciergeNote'
  | 'tiers'
  | 'vipConciergeNote'
  | 'dressCodeOkItems'
  | 'dressCodeNoItems'
  | 'shuttleHighlightDesc'
  | 'logisticsParagraphs'
  | 'logisticsFacts'
  | 'faqs'
  | 'mapLabels'
  | 'venueBannerEyebrow'
  | 'venueBannerTitle'
  | 'venueBannerDesc'
  | 'dec31BannerEyebrow'
  | 'dec31BannerDesc'
  | 'orthodoxBannerEyebrow'
  | 'orthodoxBannerDesc'
  | 'quickFacts'
> {
  const isIt = loc === 'it';
  const isZh = loc === 'zh';

  const quickFacts: ThanksgivingLogisticsFact[] = isIt
    ? [
        { label: core.quickLabels[0], value: 'Gio 26 Nov 2026 · 19:30 Buffet / 22:30 Club fino 05:00' },
        { label: core.quickLabels[1], value: 'Viale Luigi Camoens 2 · Torre Branca, Parco Sempione' },
        { label: core.quickLabels[2], value: 'American Royal Buffet (Old Turkey) + Vida Loca Radio 105' },
        { label: core.quickLabels[3], value: '21+ · Elegante (uomini: pantalone lungo obbligatorio)' },
        { label: core.quickLabels[4], value: 'Buffet 15€ · Club 15€ · Tavoli 320€ – 5.000€' },
        { label: core.quickLabels[5], value: 'Parcheggio con navetta gratuita dedicata A/R' },
      ]
    : isZh
      ? [
          { label: core.quickLabels[0], value: '2026年11月26日 周四 · 19:30 自助 / 22:30 派对 至 05:00' },
          { label: core.quickLabels[1], value: 'Viale Luigi Camoens 2 · Torre Branca 铁塔 下' },
          { label: core.quickLabels[2], value: '美式 皇家 自助 Old Turkey 秀 + Vida Loca Radio 105' },
          { label: core.quickLabels[3], value: '21+ 年满 · 优雅 正装 (男士 必须 长裤)' },
          { label: core.quickLabels[4], value: '自助 15€ · 夜店 15€ · 卡座 320€ – 5.000€' },
          { label: core.quickLabels[5], value: '提供 合作伙伴 停车场 免费 往返 接驳 巴士' },
        ]
      : [
          { label: core.quickLabels[0], value: 'Thu 26 Nov 2026 · 19:30 Buffet / 22:30 Club to 05:00' },
          { label: core.quickLabels[1], value: 'Viale Luigi Camoens 2 · Torre Branca, Parco Sempione' },
          { label: core.quickLabels[2], value: 'American Royal Buffet (Old Turkey) + Vida Loca Radio 105' },
          { label: core.quickLabels[3], value: '21+ · Elegant (Men: long trousers mandatory)' },
          { label: core.quickLabels[4], value: 'Buffet 15€ · Club 15€ · Tables 320€ – 5.000€' },
          { label: core.quickLabels[5], value: 'Partner car park with complimentary shuttle service' },
        ];

  const overviewParagraphs: string[] = isIt
    ? [
        core.leadIntro,
        core.extraNativeParagraph,
        'Il programma gastronomico delle 19:30 è costruito attorno a un ricco percorso americano che trasforma l’aperitivo del JustMe Milano in una vera festa del Ringraziamento: accanto allo Show Cooking espresso dal vivo dello chef sul tacchino Old Turkey arrostito, gli ospiti trovano un intero buffet di ricette e contorni tradizionali statunitensi, seguito dall’American Dessert Selection curata per la serata. La prenotazione anticipata è fortemente consigliata tramite pass online da 15€ o con richiesta diretta al Concierge per riservare un tavolo ristorante dedicato.',
        'Dalle 22:30 in poi la serata cambia passo con l’energia travolgente di Vida Loca, il format touring ufficiale legato a Radio 105 celebre per scenografie, corpo di ballo e selezioni trasversali tra House, Hip-Hop, grandi hit internazionali, EDM e Reggaeton fino alle 05:00 del mattino. Tutti gli ospiti che entrano per il Royal Buffet delle 19:30 possono rimanere all’interno della veranda riscaldata e accedere direttamente al party senza alcun biglietto supplementare.',
        'Per questa edizione speciale di giovedì 26 novembre 2026 è confermata l’età minima di 21 anni compiuti con selezione all’ingresso in abbigliamento elegante e obbligo tassativo di pantalone lungo per gli uomini. Gli ospiti in auto dispongono inoltre di un parcheggio dedicato collegato con servizio navetta gratuito direttamente verso l’ingresso di Torre Branca, rendendo agevole l’arrivo anche da fuori Milano.',
      ]
    : isZh
      ? [
          core.leadIntro,
          core.extraNativeParagraph,
          '自 19:30 起 开放 的 感恩节 美食 章节 专为 热衷 纯正 美式 节日 仪式感 的 宾客 打造。在 JustMe Milano 恒温 冬季 玻璃 大厅 内，专业 厨师 团队 将在 全场 宾客 面前 呈现 经典 老式 烤火鸡 Old Turkey 现场 切片 烹饪 秀 Show Cooking，搭配 多款 传统 美国 风味 菜肴 与 American Dessert Selection 美式 精选 甜点 台。无论是 选择 15€ Aperitif + 1 Drink 餐前酒 自助 通行证，还是 联系 24/7 礼宾 预订 餐厅 专属 餐桌，均 建议 提前 锁定 席位。',
          '进入 22:30 夜场 时段 后，整座 俱乐部 瞬间 切换 为 Vida Loca 主题 狂欢。作为 意大利 Radio 105 知名 巡演 派对 品牌，Vida Loca 将 带领 全场 宾客 沉浸 于 House 浩室、Hip-Hop 嘻哈、全球 热门 金曲 Hits、EDM 电子 舞曲 与 Reggaeton 拉丁 节奏 之中，狂欢 持续 至 次日 清晨 05:00。持 19:30 自助 门票 入场 的 宾客 可 全程 留场，无缝 衔接 主场 舞池，无需 重复 购票。',
          '11 月 26 日 周四 专场 严格 执行 21 周岁 以上 21+ 门禁 筛选 与 优雅 着装 规定，男士 必须 穿着 整洁 长裤。此外，俱乐部 贴心 安排 了 合作 停车场 免费 接驳 穿梭 巴士 服务，宾客 停放 车辆 后 可 直接 乘车 往返 Parco Sempione 公园 Torre Branca 入口，无需 在 公园 周边 耗时 寻找 车位。',
        ]
      : [
          core.leadIntro,
          core.extraNativeParagraph,
          'The 19:30 culinary opening turns JustMe Milano’s heated glass pavilion beneath Torre Branca into an authentic Milanese Thanksgiving gathering. At the center of the Full American Style Royal Buffet stands live culinary Show Cooking featuring hand-carved Old Turkey alongside classic American recipes, warm seasonal sides, and a dedicated American Dessert Selection. Early online booking at €15 (19:30–22:00 entry including 1 drink) or direct restaurant table inquiry through WhatsApp is strongly recommended because November 26 replaces the regular Thursday calendar.',
          'At 22:30, the floor shifts into full late-night production with Vida Loca, Radio 105’s signature club tour uniting dancers, dynamic lighting, and an international soundtrack across House, Hip-Hop, chart Hits, EDM, and Reggaeton until 05:00. Guests already inside for the 19:30 Happy Thanksgiving Royal Buffet keep seamless access to the Vida Loca dancefloor with zero extra admission charge.',
          'Door policy on Thursday, November 26, 2026 is strictly 21+ with smart-elegant evening attire and mandatory long trousers for gentlemen. Drivers can also rely on JustMe Milano’s partner car park featuring a complimentary shuttle service connecting straight to Viale Luigi Camoens 2.',
        ];

  const timelineSteps: ThanksgivingTimelineStep[] = isIt
    ? [
        {
          time: '19:30',
          title: core.timelineTitles[0],
          detail:
            'Apertura dei cancelli in Viale Luigi Camoens 2 e attivazione del servizio Full American Style Royal Buffet nella sala centrale e nella veranda riscaldata. Con il pass ufficiale da 15€ (valido per ingressi 19:30–22:00) sono inclusi il drink di benvenuto, tutte le portate del buffet e l’accesso continuativo alla serata club.',
        },
        {
          time: '20:15',
          title: core.timelineTitles[1],
          detail:
            'Momento gastronomico centrale con lo Show Cooking dal vivo dello chef sul famoso Old Turkey servito caldo al taglio, affiancato dalle ricette tradizionali americane e dalle salse tipiche del Ringraziamento.',
        },
        {
          time: '21:30',
          title: core.timelineTitles[2],
          detail:
            'Apertura dell’American Dessert Selection con dolci della tradizione statunitense per accompagnare l’ultima ora dell’aperitivo reale prima del cambio console e della chiusura della fascia ingresso buffet alle 22:00.',
        },
        {
          time: '22:30',
          title: core.timelineTitles[3],
          detail:
            'Partenza ufficiale del format club Vida Loca Radio 105 e apertura dei tornelli serali per il biglietto Club + 1 Drink da 15€. Attenzione alla soglia oraria per chi sceglie il Tavolo Dehor da 320€: il check-in ai tavoli Dehor è garantito entro e non oltre le 23:00.',
        },
        {
          time: '00:00–05:00',
          title: core.timelineTitles[4],
          detail:
            'Climax musicale tra House, Hip-Hop, Hit internazionali, EDM e Reggaeton sotto la Torre Branca illuminata, servizio bottiglie al tavolo in Dance Floor (640€), Central (1.280€), VIP Front (3.200€) e Console DJ (5.000€) fino alla chiusura alle 05:00.',
        },
      ]
    : isZh
      ? [
          {
            time: '19:30',
            title: core.timelineTitles[0],
            detail:
              'Viale Luigi Camoens 2 正门 开启，恒温 玻璃 景观 厅 与 主厅 同步 呈现 Full American Style Royal Buffet 美式 皇家 自助 晚宴。持 15€ 官方 餐前酒 + 1 饮品 通行证 于 19:30–22:00 之间 入场，即刻 享用 欢迎 饮品、丰盛 自助 菜品 及 全场 派对 资格。',
          },
          {
            time: '20:15',
            title: core.timelineTitles[1],
            detail:
              '全晚 美食 焦点 时刻：行政 主厨 团队 在 宾客 面前 现场 烹饪 并 切片 经典 老式 烤火鸡 Old Turkey，搭配 正宗 美式 传统 佳肴 与 感恩节 经典 酱汁。',
          },
          {
            time: '21:30',
            title: core.timelineTitles[2],
            detail:
              'American Dessert Selection 美式 甜点 专区 开放，多款 经典 感恩节 甜品 搭配 鸡尾酒 暖场，至 22:00 结束 餐前酒 自助 入场 时段。',
          },
          {
            time: '22:30',
            title: core.timelineTitles[3],
            detail:
              'Radio 105 巡演 夜场 Vida Loca 正式 启动，15€ Club + 1 Drink 夜间 门票 通道 开启。预订 320€ Dehor Table 户外 露台 卡座 的 宾客 请务必 注意：须于 23:00 前 抵达 核验 入座。',
          },
          {
            time: '00:00–05:00',
            title: core.timelineTitles[4],
            detail:
              '舞池 全场 沸腾，呈现 House、Hip-Hop、热门 金曲、EDM 与 Reggaeton 震撼 声浪，配合 640€ 舞池 桌、1.280€ 中央 桌、3.200€ VIP 前排 与 5.000€ DJ 台 香槟 礼宾 服务 直至 清晨 05:00。',
          },
        ]
      : [
          {
            time: '19:30',
            title: core.timelineTitles[0],
            detail:
              'Doors open at Viale Luigi Camoens 2 for the Full American Style Royal Buffet inside the heated glass pavilion. Guests entering between 19:30 and 22:00 with the €15 Aperitif + 1 Drink pass receive one drink, full buffet access, and automatic retention for the club night.',
          },
          {
            time: '20:15',
            title: core.timelineTitles[1],
            detail:
              'Culinary centerpiece begins with live chef Show Cooking and carving of the famous Old Turkey served warm alongside classic American Thanksgiving recipes and traditional accompaniments.',
          },
          {
            time: '21:30',
            title: core.timelineTitles[2],
            detail:
              'The American Dessert Selection opens across the tasting stations while warm lounge grooves transition into the late-evening build-up ahead of the 22:00 aperitif entry cutoff.',
          },
          {
            time: '22:30',
            title: core.timelineTitles[3],
            detail:
              'Club entry opens for the €15 Club + 1 Drink ticket as Radio 105’s Vida Loca production takes over the console. Guests holding the €320 Dehor Table must complete arrival strictly by 23:00.',
          },
          {
            time: '00:00–05:00',
            title: core.timelineTitles[4],
            detail:
              'Peak clubbing showcase spanning House, Hip-Hop, Hits, EDM, and Reggaeton with VIP bottle service across Dance Floor (€640), Central (€1.280), VIP Front (€3.200), and DJ Table (€5.000) until 05:00 closing.',
          },
        ];

  const culinaryHighlights: ThanksgivingCulinaryHighlight[] = isIt
    ? [
        {
          badge: 'Show Cooking Live',
          title: 'Il Famoso Old Turkey al Taglio Espresso',
          detail:
            'Il protagonista della tavola americana preparato con cottura lenta e sporzionato dal vivo allo show cooking delle 19:30–22:00, servito caldo per tutti gli ospiti con pass Aperitivo + Royal Buffet.',
        },
        {
          badge: 'Full American Style',
          title: 'Royal Buffet di Specialità e Ricette Tradizionali Americane',
          detail:
            'Isole buffet complete ispirate al Ringraziamento statunitense con contorni classici, proposte salate calde e fredde e ricette tradizionali pensate per condividere la serata in gruppo.',
        },
        {
          badge: 'Sweet Finale',
          title: 'American Dessert Selection',
          detail:
            'Selezione dedicata di dessert americani servita al buffet durante la fascia aperitivo per chiudere la cena in piedi prima di passare alla pista Vida Loca.',
        },
        {
          badge: 'Tavoli Ristorante',
          title: 'Prenotazione Tavolo Ristorante su Richiesta 24/7',
          detail:
            `Oltre al pass Royal Buffet da 15€ in piedi o con appoggio lounge, è possibile richiedere al Concierge WhatsApp (${PHONE}) la verifica immediata per prenotare un tavolo ristorante dedicato.`,
        },
      ]
    : isZh
      ? [
          {
            badge: '现场 烹饪 秀',
            title: '经典 名菜 Old Turkey 烤火鸡 现场 切片',
            detail:
              '19:30 至 22:00 黄金 餐前酒 时段 的 绝对 主角，由 专业 厨师 团队 现场 慢烤 并 即席 分切 上盘，保障 温热 多汁 的 纯正 感恩节 风味。',
          },
          {
            badge: '全套 美式 风味',
            title: 'Full American Style 传统 美式 皇家 自助 佳肴',
            detail:
              '涵盖 多道 美国 经典 感恩节 传统 菜式、热食 配菜 与 精致 沙拉 拼盘，让 身在 米兰 的 国际 宾客 与 好友 尽享 节庆 欢聚。',
          },
          {
            badge: '甜蜜 收尾',
            title: 'American Dessert Selection 美式 甜点 精选 台',
            detail:
              '晚宴 后半程 呈献 丰富 美式 甜品 矩阵，搭配 吧台 鸡尾酒 自然 衔接 22:30 Vida Loca 夜店 狂欢。',
          },
          {
            badge: '餐厅 订座',
            title: '24/7 WhatsApp 礼宾 专属 餐厅 餐桌 预约',
            detail:
              `除 15€ 自助 通行证 外，需要 坐席 用餐 的 宾客 可 随时 联系 WhatsApp 礼宾 专线 (${PHONE}) 确认 餐厅 空位 与 安排。`,
          },
        ]
      : [
          {
            badge: 'Live Show Cooking',
            title: 'Famous Old Turkey Carved Fresh to Order',
            detail:
              'Slow-roasted centerpiece turkey carved live at the heated marble station between 19:30 and 22:00 so every Happy Thanksgiving Royal Buffet guest enjoys hot, authentic holiday flavor.',
          },
          {
            badge: 'Full American Style',
            title: 'Traditional American Recipes & Royal Buffet Stations',
            detail:
              'Abundant savory spreads featuring classic United States Thanksgiving dishes, warm festive sides, and sharable specialties curated for groups and international guests.',
          },
          {
            badge: 'Sweet Finale',
            title: 'American Dessert Selection',
            detail:
              'Dedicated dessert tables stocked with classic American Thanksgiving sweets served before the room shifts into full club lighting at 22:30.',
          },
          {
            badge: 'Restaurant Seating',
            title: 'Dedicated Restaurant Table Requests 24/7',
            detail:
              `Alongside the €15 Aperitif + Buffet pass, groups wishing to reserve a seated restaurant table can request live availability directly with our 24/7 WhatsApp concierge (${PHONE}).`,
          },
        ];

  const buffetCardCaption = isIt
    ? 'Royal Buffet Americano 19:30–22:00 con Show Cooking dell’Old Turkey, 1 drink e ingresso party a 15€.'
    : isZh
      ? '19:30–22:00 美式 皇家 自助 含 Old Turkey 火鸡 秀、1 杯 饮品 及 派对 通行 仅需 15€。'
      : '19:30–22:00 Full American Royal Buffet with live Old Turkey Show Cooking, 1 drink & party access at €15.';

  const tablesCardCaption = isIt
    ? 'Tavoli ufficiali Vida Loca al JustMe Milano: Dehor 320€ (entro le 23:00), Dance Floor 640€, Central 1.280€, VIP Front 3.200€ e DJ Table 5.000€.'
    : isZh
      ? 'JustMe 米兰 Vida Loca 官方 卡座：Dehor 320€ (23:00前)、舞池 640€、中央 1.280€、VIP 前排 3.200€、DJ 台 5.000€。'
      : 'Official Vida Loca tables at JustMe Milano: Dehor €320 (until 23:00), Dance Floor €640, Central €1.280, VIP Front €3.200 & DJ Table €5.000.';

  const restaurantConciergeNote = isIt
    ? `Nota Trasparenza Ristorante: il pass confermato su Xceed #249216 da 15€ copre l’Aperitivo + 1 Drink + Full American Royal Buffet (19:30–22:00). Per riservare un tavolo ristorante dedicato o esigenze alimentari particolari, scrivi subito al Concierge 24/7 su WhatsApp ${PHONE}: confermiamo disponibilità reale in pochi minuti.`
    : isZh
      ? `餐厅 透明 说明：官方 Xceed #249216 的 15€ 在线 门票 明确 对应 19:30–22:00 餐前酒 + 1 饮品 + 美式 皇家 自助；如需 预订 餐厅 坐席 餐桌 或 特殊 饮食 需求，请 随时 联系 WhatsApp 礼宾 ${PHONE} 获取 实时 席位 确认。`
      : `Transparency Note: the confirmed €15 Xceed #249216 pass covers Aperitif + 1 Drink + Full American Royal Buffet (19:30–22:00). To request dedicated seated restaurant dining or dietary arrangements, message our 24/7 WhatsApp Concierge on ${PHONE} for real-time confirmation.`;

  const tiers: ThanksgivingOfferTier[] = isIt
    ? [
        {
          id: 'aperitif-buffet',
          title: '1. Aperitif + 1 Drink · Royal Buffet (19:30–22:00)',
          price: '15€',
          badge: 'Xceed Ufficiale #249216',
          summary: 'Ingresso tra le 19:30 e le 22:00 con 1 drink, Full American Style Royal Buffet, Show Cooking Old Turkey, American Dessert Selection e festa Vida Loca.',
          bullets: [
            '1 drink incluso all’ingresso (fascia 19:30–22:00)',
            'Accesso illimitato al Royal Buffet americano & Old Turkey Show Cooking',
            'American Dessert Selection + permanenza gratuita al party fino alle 05:00',
            'Emissione pass ufficiale sul canale partner Xceed #249216 senza sovrapprezzi',
          ],
          ctaKind: 'xceed',
          ctaLabel: 'Acquista Pass Buffet 15€',
        },
        {
          id: 'club-entry',
          title: '2. Club + 1 Drink · Vida Loca Radio 105 (dalle 22:30)',
          price: '15€',
          badge: 'Xceed Ufficiale #249216',
          summary: 'Ingresso discoteca dalle 22:30 con 1 drink incluso per la serata touring Vida Loca Radio 105 fino alle 05:00.',
          bullets: [
            'Ingresso club garantito a partire dalle 22:30 fino alle 05:00',
            '1 drink incluso alla cassa principale o bar',
            'Soundtrack Vida Loca: House, Hip-Hop, Hits, EDM & Reggaeton',
            'Selezione 21+ · Elegante con pantalone lungo obbligatorio per gli uomini',
          ],
          ctaKind: 'xceed',
          ctaLabel: 'Acquista Pass Club 15€',
        },
        {
          id: 'dehor-table',
          title: '3. Dehor Table · Ingresso entro le 23:00',
          price: '320€',
          badge: 'Xceed Ufficiale #249216',
          summary: 'Tavolo nell’area Dehor del JustMe Milano con accesso prioritario tassativo entro le ore 23:00 e servizio bottiglie.',
          bullets: [
            'Tariffa ufficiale confermata Xceed #249216: 320€',
            'Regola d’orario obbligatoria: arrivo e ingresso entro e non oltre le 23:00',
            'Accesso saltafoda riservato ospiti tavolo sotto la Torre Branca',
            'Prenotabile su Xceed #249216 o con assistenza Concierge 24/7',
          ],
          ctaKind: 'xceed',
          ctaLabel: 'Prenota Dehor Table 320€',
        },
        {
          id: 'dancefloor-table',
          title: '4. Dance Floor Table · Pista Principale',
          price: '640€',
          badge: 'Xceed Ufficiale #249216',
          summary: 'Tavolo Privé nel cuore della pista da ballo del JustMe Milano per vivere da protagonista il tour Vida Loca Radio 105.',
          bullets: [
            'Tariffa ufficiale confermata Xceed #249216: 640€',
            'Posizione centrale vista palco e corpo di ballo Vida Loca',
            'Servizio tavolo dedicato con bottiglie e ghiacciaia luminosa',
            'Prenotazione su Xceed #249216 o via WhatsApp +39 351 912 7047',
          ],
          ctaKind: 'xceed',
          ctaLabel: 'Prenota Dance Floor 640€',
        },
        {
          id: 'central-table',
          title: '5. Central Table · Area Centrale Premium',
          price: '1.280€',
          badge: 'Xceed Ufficiale #249216',
          summary: 'Postazione rialzata ad alta visibilità nel blocco centrale della sala vetrata di JustMe Milano.',
          bullets: [
            'Tariffa ufficiale confermata Xceed #249216: 1.280€',
            'Massima visibilità su console, impianto luci e pista centrale',
            'Accoglienza saltafoda VIP dedicata su Viale Luigi Camoens 2',
            'Prenotazione diretta Xceed #249216 o gestione su misura via Concierge 24/7',
          ],
          ctaKind: 'xceed',
          ctaLabel: 'Prenota Central Table 1.280€',
        },
        {
          id: 'vip-front-table',
          title: '6. VIP Front Table · Prima Fila Privé',
          price: '3.200€',
          badge: 'Concierge 24/7 & Xceed',
          summary: 'Tavolo prima fila di rappresentanza adiacente all’area centrale show per gruppi VIP e ospiti internazionali.',
          bullets: [
            'Tariffa ufficiale confermata Xceed #249216: 3.200€',
            'Posizione prima fila fronte spettacolo Vida Loca Radio 105',
            'Coordinamento bottiglie e arrivo scortato tramite Concierge WhatsApp 24/7',
            'Prepagamento 100% con ricevuta istantanea ed email ufficiale tavolo',
          ],
          ctaKind: 'whatsapp',
          ctaLabel: 'Richiedi VIP Front 3.200€',
        },
        {
          id: 'dj-table',
          title: '7. DJ Table · Dietro Console',
          price: '5.000€',
          badge: 'Concierge 24/7 & Xceed',
          summary: 'L’area più ambita del JustMe Milano direttamente a contatto con la consolle DJ per un massimo livello di visibilità e privacy.',
          bullets: [
            'Tariffa ufficiale confermata Xceed #249216: 5.000€',
            'Accesso diretto area Console DJ sotto la cupola Torre Branca',
            'Hostess dedicata e gestione lista nominativa prioritaria all’ingresso',
            'Assegnazione su conferma diretta via WhatsApp +39 351 912 7047',
          ],
          ctaKind: 'whatsapp',
          ctaLabel: 'Richiedi DJ Table 5.000€',
        },
      ]
    : isZh
      ? [
          {
            id: 'aperitif-buffet',
            title: '1. Aperitif + 1 Drink · 美式 皇家 自助 (19:30–22:00)',
            price: '15€',
            badge: 'Xceed #249216 官方 通道',
            summary: '19:30 至 22:00 入场，含 1 杯 鸡尾酒、Full American Royal Buffet 美式 皇家 自助、Old Turkey 现场 秀 及 通宵 Vida Loca 派对 资格。',
            bullets: [
              '含 1 杯 入场 鸡尾酒 (19:30–22:00 核验)',
              '尊享 美式 皇家 自助 佳肴 与 Old Turkey 火鸡 切片 秀',
              '包含 American Dessert Selection 甜点 台 与 夜店 派对 连场',
              '通过 官方 合作 通道 Xceed #249216 即时 出票 零 额外 加价',
            ],
            ctaKind: 'xceed',
            ctaLabel: '预订 15€ 自助 通行证',
          },
          {
            id: 'club-entry',
            title: '2. Club + 1 Drink · Vida Loca 夜店 入场 (22:30 起)',
            price: '15€',
            badge: 'Xceed #249216 官方 通道',
            summary: '22:30 起 入场 参加 Radio 105 Vida Loca 巡演 派对，含 1 杯 饮品 直至 次日 05:00。',
            bullets: [
              '22:30 至 05:00 夜场 派对 全程 入场 权',
              '吧台 免费 兑换 1 杯 鸡尾酒 饮品',
              'Vida Loca 热门 歌单：House、Hip-Hop、Hits、EDM、Reggaeton',
              '21+ 年龄 审核 · 男士 务必 穿着 长裤 与 正装 鞋履',
            ],
            ctaKind: 'xceed',
            ctaLabel: '购买 15€ 夜店 门票',
          },
          {
            id: 'dehor-table',
            title: '3. Dehor Table · 23:00 前 优先 入座',
            price: '320€',
            badge: 'Xceed #249216 官方 通道',
            summary: 'JustMe 米兰 Dehor 区域 卡座，严格 要求 23:00 前 抵达 办理 优先 入座 与 开瓶 服务。',
            bullets: [
              'Xceed #249216 官方 确认 报价：320€',
              '核心 规定：团队 必须 于 23:00 前 完成 检票 入场',
              '享 Torre Branca 入口 卡座 专属 快速 通道',
              '支持 Xceed #249216 预订 或 24/7 WhatsApp 礼宾 协助',
            ],
            ctaKind: 'xceed',
            ctaLabel: '预订 320€ Dehor 卡座',
          },
          {
            id: 'dancefloor-table',
            title: '4. Dance Floor Table · 主舞池 核心 卡座',
            price: '640€',
            badge: 'Xceed #249216 官方 通道',
            summary: '紧邻 主舞池 与 表演 舞台 的 黄金 卡座，尽览 Vida Loca Radio 105 全场 狂欢。',
            bullets: [
              'Xceed #249216 官方 确认 报价：640€',
              '位于 中心 舞池 旁，近距离 感受 灯光 舞美 与 现场 氛围',
              '配备 专属 香槟 冰桶 与 餐桌 礼宾 侍应 服务',
              '支持 Xceed #249216 预订 或 WhatsApp +39 351 912 7047 安排',
            ],
            ctaKind: 'xceed',
            ctaLabel: '预订 640€ 舞池 卡座',
          },
          {
            id: 'central-table',
            title: '5. Central Table · 中央 尊享 沙发 座',
            price: '1.280€',
            badge: 'Xceed #249216 官方 通道',
            summary: 'JustMe 米兰 玻璃 主厅 中央 抬高 区域 卡座，坐拥 全场 视野 与 尊贵 空间感。',
            bullets: [
              'Xceed #249216 官方 确认 报价：1.280€',
              '360 度 饱览 DJ 台 与 中央 舞池 全景 视野',
              '含 Viale Luigi Camoens 2 VIP 快速 通关 礼遇',
              '官方 Xceed #249216 锁定 席位，零 额外 中介 加价',
            ],
            ctaKind: 'xceed',
            ctaLabel: '预订 1.280€ 中央 卡座',
          },
          {
            id: 'vip-front-table',
            title: '6. VIP Front Table · 头排 VIP 专席',
            price: '3.200€',
            badge: '24/7 礼宾 & Xceed',
            summary: '面向 舞台 与 舞池 核心区 的 顶级 头排 卡座，适合 重要 团体 聚会 与 国际 VIP 贵宾。',
            bullets: [
              'Xceed #249216 官方 确认 报价：3.200€',
              '头排 黄金 视角，直面 Vida Loca Radio 105 舞台 秀',
              'WhatsApp 礼宾 一对一 统筹 抵店 迎宾 与 酒水 单',
              '100% 预付款 后 秒出 官方 邮件 确认 凭据',
            ],
            ctaKind: 'whatsapp',
            ctaLabel: '咨询 3.200€ VIP 头排',
          },
          {
            id: 'dj-table',
            title: '7. DJ Table · DJ 控台 专属 席',
            price: '5.000€',
            badge: '24/7 礼宾 & Xceed',
            summary: 'JustMe 米兰 全场 至高 规格 席位，与 DJ 台 零距离 互动，兼顾 私密性 与 尊荣 体验。',
            bullets: [
              'Xceed #249216 官方 确认 报价：5.000€',
              '直接 位于 Torre Branca 玻璃 穹顶 DJ 控台 区域',
              '专属 礼宾 全程 跟进 嘉宾 名单 与 优先 护送 入场',
              '通过 WhatsApp +39 351 912 7047 实时 锁定 档期',
            ],
            ctaKind: 'whatsapp',
            ctaLabel: '咨询 5.000€ DJ 席位',
          },
        ]
      : [
          {
            id: 'aperitif-buffet',
            title: '1. Aperitif + 1 Drink · Royal Buffet (19:30–22:00)',
            price: '15€',
            badge: 'Official Xceed #249216',
            summary: 'Entry from 19:30 to 22:00 including 1 drink, Full American Style Royal Buffet with Old Turkey Show Cooking, desserts, and Vida Loca club retention.',
            bullets: [
              '1 welcome drink included (arrival 19:30–22:00)',
              'Full access to American Style Royal Buffet & live Old Turkey carving',
              'Includes American Dessert Selection + seamless entry to Vida Loca club night',
              'Issued on official partner channel Xceed #249216 with zero extra markup',
            ],
            ctaKind: 'xceed',
            ctaLabel: 'Buy €15 Buffet Pass',
          },
          {
            id: 'club-entry',
            title: '2. Club + 1 Drink · Vida Loca Radio 105 (22:30+)',
            price: '15€',
            badge: 'Official Xceed #249216',
            summary: 'Club admission from 22:30 onward including 1 drink for the Radio 105 Vida Loca tour until 05:00.',
            bullets: [
              'Guaranteed club entry from 22:30 until 05:00 AM closing',
              '1 drink included at the main bars',
              'Music: House, Hip-Hop, Hits, EDM & Reggaeton all night',
              'Strictly 21+ · Elegant attire (long trousers mandatory for men)',
            ],
            ctaKind: 'xceed',
            ctaLabel: 'Buy €15 Club Pass',
          },
          {
            id: 'dehor-table',
            title: '3. Dehor Table · Entry by 23:00',
            price: '320€',
            badge: 'Official Xceed #249216',
            summary: 'Reserved Dehor area VIP table with bottle service and mandatory check-in strictly by 23:00.',
            bullets: [
              'Confirmed Xceed #249216 rate: €320 total table rate',
              'Strict arrival deadline: Dehor Table guests must enter before 23:00',
              'Priority fast-track table lane beneath Torre Branca',
              'Reserve via official Xceed #249216 or verify floor placement on WhatsApp 24/7',
            ],
            ctaKind: 'xceed',
            ctaLabel: 'Reserve €320 Dehor Table',
          },
          {
            id: 'dancefloor-table',
            title: '4. Dance Floor Table · Main Room',
            price: '640€',
            badge: 'Official Xceed #249216',
            summary: 'Prime Dance Floor VIP booth inside JustMe Milano surrounded by the main Vida Loca Radio 105 energy.',
            bullets: [
              'Confirmed Xceed #249216 rate: €640',
              'Positioned beside the main dancefloor and performer stage',
              'Dedicated table host, chilled ice buckets, and bottle service',
              'Reserve on official Xceed #249216 or WhatsApp Concierge +39 351 912 7047',
            ],
            ctaKind: 'xceed',
            ctaLabel: 'Reserve €640 Dance Floor',
          },
          {
            id: 'central-table',
            title: '5. Central Table · Elevated Central Zone',
            price: '1.280€',
            badge: 'Official Xceed #249216',
            summary: 'High-visibility Central Zone VIP sofa seating inside the heated architectural glass pavilion.',
            bullets: [
              'Confirmed Xceed #249216 rate: €1.280',
              'Panoramic view across the DJ booth, mirror spheres, and dancefloor',
              'Priority VIP lane at Viale Luigi Camoens 2',
              'Official Xceed #249216 reservation or bespoke bottle curation on WhatsApp 24/7',
            ],
            ctaKind: 'xceed',
            ctaLabel: 'Reserve €1.280 Central Table',
          },
          {
            id: 'vip-front-table',
            title: '6. VIP Front Table · Front-Row Privé',
            price: '3.200€',
            badge: '24/7 Concierge & Xceed',
            summary: 'Front-row prestige VIP booth facing the Vida Loca stage for executive groups and international hosts.',
            bullets: [
              'Confirmed Xceed #249216 rate: €3.200',
              'Prime front-line visibility inside JustMe Milano Privé',
              'Personalized bottle service & escorted entry via WhatsApp Concierge',
              '100% prepayment confirmation followed by official email table voucher',
            ],
            ctaKind: 'whatsapp',
            ctaLabel: 'Request €3.200 VIP Front',
          },
          {
            id: 'dj-table',
            title: '7. DJ Table · Behind Console',
            price: '5.000€',
            badge: '24/7 Concierge & Xceed',
            summary: 'JustMe Milano’s flagship DJ Console table offering maximum prestige and backstage proximity.',
            bullets: [
              'Confirmed Xceed #249216 rate: €5.000',
              'Located directly at the DJ booth under the Torre Branca glass dome',
              'Dedicated hostess team & priority guest-list door handling',
              'Direct confirmation via 24/7 WhatsApp Concierge +39 351 912 7047',
            ],
            ctaKind: 'whatsapp',
            ctaLabel: 'Request €5.000 DJ Table',
          },
        ];

  const vipConciergeNote = isIt
    ? `Tavoli VIP Front (3.200€), DJ Table (5.000€) e Tavoli Ristorante per cena servita vengono confermati in tempo reale via WhatsApp ${PHONE} (24/7) con pagamento anticipato al 100% e zero costi di agenzia.`
    : isZh
      ? `VIP Front (3.200€)、DJ 台 (5.000€) 与 餐厅 订座 可 通过 24/7 WhatsApp ${PHONE} 实时 确认 席位，全程 100% 官方 透明 预付，无 额外 手续费。`
      : `VIP Front (€3.200), DJ Table (€5.000), and seated Restaurant Table requests are confirmed live via 24/7 WhatsApp ${PHONE} under 100% prepayment with zero agency fees.`;

  const dressCodeOkItems = isIt
    ? [
        'Uomo: pantaloni lunghi obbligatori, camicia o dolcevita sartoriale e blazer',
        'Donna: abito da sera, jumpsuit elegante, seta o completo ricercato',
        'Calzature curate: scarpe eleganti, stivaletti o sneaker pulite di fascia alta',
        'Documento d’identità fisico originale valido (selezione rigorosa 21+)',
      ]
    : isZh
      ? [
          '男士 必穿：剪裁 整洁 长裤 (绝对 禁止 短裤)、衬衫 或 针织衫 配 西装外套',
          '女士 推荐：优雅 连衣裙、晚宴 套装 或 丝绸 礼服 穿搭',
          '鞋履 要求：正装 皮鞋、高跟鞋 或 干净 极简 质感 休闲鞋',
          '入场 核验：严格 21+ 须 随身 携带 原件 有效 护照 或 身份证',
        ]
      : [
          'Gentlemen: long trousers mandatory, paired with collared shirt, fine knit, or tailored blazer',
          'Ladies: cocktail dress, evening jumpsuit, silk separates, or smart winter tailoring',
          'Footwear: dress shoes, heels, Chelsea boots, or pristine luxury minimalist sneakers',
          'Valid original physical photo ID strictly required at the door (21+)',
        ];

  const dressCodeNoItems = isIt
    ? [
        'Pantaloncini corti o bermuda da uomo (ingresso tassativamente negato)',
        'Tute da ginnastica, felpe con cappuccio, canotte o streetwear trasandato',
        'Zaini voluminosi, borsoni sportivi o scarpe consumate/da running',
        'Minori di 21 anni (età minima 21+ verificata con documento originale)',
      ]
    : isZh
      ? [
          '男士 短裤 或 运动 休闲 七分裤 (门口 严格 拒绝 入内)',
          '运动 套装、连帽 卫衣、无袖 背心 或 破洞 做旧 服装',
          '大型 双肩 背包、运动 提包 或 磨损 明显的 跑步鞋',
          '未满 21 周岁 人士 (严格 年龄 检查，电子版 照片 证件 无效)',
        ]
      : [
          'Men’s shorts or cropped athletic trousers (strictly refused at door)',
          'Tracksuits, oversized hoodies, sleeveless tops, or distressed gym wear',
          'Backpacks, large duffel bags, or scuffed running sneakers',
          'Anyone under 21 years old (strict 21+ physical ID check)',
        ];

  const shuttleHighlightDesc = isIt
    ? 'Per chi arriva in auto a Milano, JustMe Milano mette a disposizione un parcheggio convenzionato con servizio navetta gratuito verso il locale. Apri la posizione Google Maps verificata per raggiungere subito il punto di sosta.'
    : isZh
      ? '自驾 前往 JustMe Milano 的 宾客 可 直接 使用 俱乐部 指定 合作 停车场，现场 配备 免费 接驳 班车 直达 场馆 正门，点击 下方 官方 定位 导航 即刻 抵达。'
      : 'Driving to Parco Sempione on Thursday night? Guests can park at the official partner car park served by a complimentary shuttle straight to JustMe Milano. Open the verified Google Maps pin below for turn-by-turn directions.';

  const logisticsParagraphs = isIt
    ? [
        'JustMe Milano sorge in Viale Luigi Camoens 2 all’interno di Parco Sempione, direttamente ai piedi della Torre Branca (108 metri). A novembre la grande architettura vetrata di Italo Rota opera in configurazione invernale completamente chiusa e riscaldata, accogliendo comodamente sia l’aperitivo Royal Buffet delle 19:30 sia la pista di Vida Loca fino alle 05:00.',
        'Con i mezzi pubblici di giovedì sera, le stazioni della metropolitana più comode sono Cadorna FN (linee M1 Rossa e M2 Verde, 6 minuti a piedi attraversando Piazzale Cadorna e Viale Milton) e Lanza Brera (linea M2 Verde, 7 minuti a piedi costeggiando l’Arena Civica). Chi arriva in auto può utilizzare il parcheggio con navetta gratuita dedicato, mentre in taxi o NCC basta indicare «Torre Branca, Viale Camoens 2».',
      ]
    : isZh
      ? [
          'JustMe Milano 坐落于 米兰 市中心 Parco Sempione 公园 内部 Viale Luigi Camoens 2 号，地标 铁塔 Torre Branca 正下方。11 月 冬季 玻璃 大厅 采用 全 封闭 恒温 供暖 设计，无论 19:30 享用 美式 皇家 自助 还是 狂欢 至 05:00 都 保持 舒适 室温。',
          '地铁 出行 可 搭乘 M1 红线 / M2 绿线 至 Cadorna FN 站 步行 约 6 分钟，或 搭乘 M2 绿线 至 Lanza 站 步行 7 分钟；自驾 宾客 强烈 推荐 停入 合作 停车场 并 搭乘 免费 接驳 巴士 直达 门口。',
        ]
      : [
          'JustMe Milano sits inside Parco Sempione at Viale Luigi Camoens 2 beneath Gio Ponti’s illuminated 108m Torre Branca tower. In late November, the glass-and-steel pavilion operates fully enclosed and heated for both the 19:30 American Royal Buffet and the 22:30–05:00 Vida Loca club tour.',
          'Public transit riders arrive in minutes from Cadorna FN Metro (M1 Red / M2 Green, 6-minute walk across Piazzale Cadorna) or Lanza Brera (M2 Green, 7-minute walk past Arena Civica). Drivers enjoy complimentary shuttle transfers from the dedicated partner car park on Viale Byron / Parco Sempione corridor.',
        ];

  const logisticsFacts: ThanksgivingLogisticsFact[] = isIt
    ? [
        { label: 'Locale & Indirizzo', value: 'JustMe Milano · Viale Luigi Camoens 2, 20121 Milano' },
        { label: 'Data & Orario Ufficiale', value: 'Giovedì 26 Novembre 2026 · 19:30 – 05:00' },
        { label: 'Programma Serata', value: 'Happy Thanksgiving Royal Buffet (19:30) + Vida Loca Radio 105 (22:30)' },
        { label: 'Generi Musicali', value: 'House, Hip-Hop, Hits, EDM, Reggaeton' },
        { label: 'Età & Dress Code', value: '21+ · Elegante (obbligo pantalone lungo uomo)' },
        { label: 'Parcheggio & Navetta', value: 'Navetta gratuita dal parcheggio convenzionato (mappa sotto)' },
      ]
    : isZh
      ? [
          { label: '场馆 与 地址', value: 'JustMe Milano · Viale Luigi Camoens 2, 20121 Milano' },
          { label: '官方 营业 时段', value: '2026 年 11 月 26 日 周四 · 19:30 – 05:00' },
          { label: '两段式 主题 流程', value: 'Happy Thanksgiving 自助 盛宴 (19:30) + Vida Loca Radio 105 (22:30)' },
          { label: '音乐 风格', value: 'House, Hip-Hop, Hits, EDM, Reggaeton' },
          { label: '年龄 与 着装', value: '21+ · 优雅 正装 (男士 必须 长裤)' },
          { label: '停车 与 接驳车', value: '提供 合作 停车场 免费 往返 班车 (下方 附 定位)' },
        ]
      : [
          { label: 'Venue & Address', value: 'JustMe Milano · Viale Luigi Camoens 2, 20121 Milan' },
          { label: 'Official Hours', value: 'Thursday, November 26, 2026 · 19:30 – 05:00' },
          { label: 'Dual-Phase Format', value: 'Happy Thanksgiving Royal Buffet (19:30) + Vida Loca Radio 105 (22:30)' },
          { label: 'Music Genres', value: 'House, Hip-Hop, Hits, EDM, Reggaeton' },
          { label: 'Age & Attire', value: '21+ · Elegant (Men: long trousers mandatory)' },
          { label: 'Parking & Shuttle', value: 'Complimentary shuttle service from partner parking pin' },
        ];

  const baseExtraFaqs: ThanksgivingFaqItem[] = isIt
    ? [
        {
          q: 'Dove si trova JustMe Milano e il locale è riscaldato il 26 novembre?',
          a: 'JustMe Milano è in Viale Luigi Camoens 2 nel Parco Sempione, direttamente sotto la Torre Branca (20121 Milano). A fine novembre tutta la veranda vetrata è chiusa e riscaldata per garantire il massimo comfort sia durante il Royal Buffet delle 19:30 sia in pista fino alle 05:00.',
        },
        {
          q: 'Che cos’è esattamente lo Show Cooking dell’Old Turkey incluso dalle 19:30?',
          a: 'All’interno del Full American Style Royal Buffet, uno chef taglia e serve dal vivo il celebre tacchino Old Turkey arrostito secondo la tradizione del Ringraziamento americano, accompagnato da specialità statunitensi e dall’American Dessert Selection.',
        },
        {
          q: 'Cosa include il biglietto Club + 1 Drink da 15€ dalle 22:30?',
          a: 'Garantisce l’accesso al JustMe Milano dalle 22:30 fino alle 05:00 per l’intero tour Vida Loca (Radio 105) con una prima consumazione inclusa al bar e mix musicale House, Hip-Hop, Hit, EDM e Reggaeton.',
        },
        {
          q: 'Chi entra con il pass Buffet da 15€ alle 19:30 deve pagare un altro ingresso per Vida Loca?',
          a: 'No. Entrando nella fascia 19:30–22:00 con il biglietto Aperitif + 1 Drink da 15€ si resta all’interno del locale per tutta la serata Vida Loca fino alle 05:00 senza costi aggiuntivi.',
        },
        {
          q: 'È possibile prenotare un tavolo ristorante dedicato per la sera di Thanksgiving?',
          a: `Sì: oltre ai pass Aperitivo Buffet da 15€, è possibile richiedere la verifica di un tavolo ristorante dedicato scrivendo 24/7 su WhatsApp al numero ufficiale ${PHONE}.`,
        },
        {
          q: 'Quali sono i requisiti di età minima e abbigliamento per uomo e donna?',
          a: 'L’accesso è rigorosamente 21+ con documento d’identità fisico originale. Il dress code è Elegante e per gli uomini è obbligatorio indossare pantaloni lunghi; non sono ammessi pantaloncini corti, tute o zaini.',
        },
        {
          q: 'Come funziona il parcheggio con servizio navetta gratuita?',
          a: `Gli ospiti possono raggiungere il parcheggio convenzionato cliccando sul link mappa ufficiale presente in questa pagina (${THANKSGIVING_JUSTME_SHUTTLE_MAP_URL}) e usufruire della navetta gratuita A/R verso JustMe Milano.`,
        },
        {
          q: 'Come prenoto i tavoli VIP Front (3.200€) o DJ Table (5.000€) e quali pass sono su Xceed #249216?',
          a: `I pass da 15€ e i tavoli da 320€, 640€ e 1.280€ si prenotano direttamente sul canale ufficiale Xceed #249216 senza alcun sovrapprezzo del sito; per VIP Front (3.200€), DJ Table (5.000€) o assistenza diretta scrivi al Concierge 24/7 (${PHONE}).`,
        },
        {
          q: 'Quali fermate della metropolitana servono JustMe Milano di giovedì sera?',
          a: 'Le fermate più vicine sono Cadorna FN (M1 Rossa / M2 Verde, 6 minuti a piedi) e Lanza Brera (M2 Verde, 7 minuti a piedi), comode anche al rientro con taxi su Viale Camoens angolo Viale Milton.',
        },
      ]
    : isZh
      ? [
          {
            q: '11 月 26 日 JustMe Milano 室内 是否有 暖气？具体 位置 在 哪里？',
            a: 'JustMe Milano 位于 米兰 Parco Sempione 公园 Viale Luigi Camoens 2 号 Torre Branca 铁塔 正下方。11 月 玻璃 景观 大厅 全 封闭 并 配备 完善 暖气，无论 19:30 自助 还是 05:00 派对 都 温暖 舒适。',
          },
          {
            q: '19:30 的 Old Turkey Show Cooking 现场 火鸡 秀 具体 是 什么？',
            a: '这是 感恩节 Full American Style Royal Buffet 的 核心 亮点，主厨 现场 切分 经典 烤火鸡 Old Turkey，配合 传统 美式 配菜 及 American Dessert Selection 甜点 台。',
          },
          {
            q: '22:30 的 15€ Club + 1 Drink 门票 适合 什么 时段 入场？',
            a: '适合 晚餐 后 直接 前往 参加 Vida Loca Radio 105 夜店 派对 的 宾客，22:30 起 凭 票 入场 含 1 杯 鸡尾酒 并 畅玩 至 凌晨 05:00。',
          },
          {
            q: '参加 19:30 美式 自助 后 留下 蹦迪 还 需要 另买 夜店 门票 吗？',
            a: '不需要。只要 在 19:30 至 22:00 期间 持 15€ Aperitif + 1 Drink 自助 通行证 入场，即可 全程 保留 当晚 Vida Loca 派对 资格，无需 二次 购票。',
          },
          {
            q: '除了 15€ 自助 票，能否 在线 咨询 餐厅 正餐 座位？',
            a: `可以。由于 座位 有限 且 官方 强烈 建议 提前 预约，请 联系 24/7 WhatsApp 礼宾 ${PHONE} 实时 核实 并 安排 餐厅 席位。`,
          },
          {
            q: '21+ 年龄 规定 和 男士 长裤 着装 要求 严格 吗？',
            a: '非常 严格。所有 宾客 必须 年满 21 周岁 并 携带 原件 有效 护照 或 身份证；着装 要求 优雅，男士 必须 穿着 整洁 长裤，谢绝 短裤 与 运动服。',
          },
          {
            q: '自驾 宾客 怎么 使用 免费 接驳 停车场 服务？',
            a: `点击 本页面 的 停车场 定位 链接 (${THANKSGIVING_JUSTME_SHUTTLE_MAP_URL}) 驾车 停放 后，即可 乘坐 免费 穿梭 巴士 直达 JustMe Milano 正门。`,
          },
          {
            q: '如何 通过 Xceed 预订 15€–1.280€ 门票 卡座 或 通过 WhatsApp 预订 3.200€–5.000€ 前排 席位？',
            a: `15€ 门票 及 320€ / 640€ / 1.280€ 桌位 通过 官方 Xceed #249216 通道 直接 预订 零 额外 加价；3.200€ VIP Front 与 5.000€ DJ Table 请 联系 WhatsApp ${PHONE} 实时 确认。`,
          },
          {
            q: '周四 夜晚 乘坐 地铁 如何 最快 抵达 JustMe Milano？',
            a: '推荐 搭乘 地铁 M1 红线 或 M2 绿线 至 Cadorna FN 站 步行 6 分钟，或 M2 绿线 至 Lanza 站 步行 7 分钟 直达 公园 入口。',
          },
        ]
      : [
          {
            q: 'Where is JustMe Milano located and is the pavilion heated on November 26?',
            a: 'JustMe Milano is located at Viale Luigi Camoens 2 inside Parco Sempione directly beneath Torre Branca (20121 Milan). Throughout autumn and winter the steel-and-glass structure is completely enclosed and heated for both the 19:30 Royal Buffet and the club night until 05:00.',
          },
          {
            q: 'What is included in the 19:30 Old Turkey Show Cooking experience?',
            a: 'Inside the Full American Style Royal Buffet, chefs slice and serve warm roasted Old Turkey live alongside traditional United States Thanksgiving recipes and an American Dessert Selection.',
          },
          {
            q: 'What does the €15 Club + 1 Drink ticket from 22:30 cover?',
            a: 'It provides full club admission from 22:30 until 05:00 AM for the Radio 105 Vida Loca tour (House, Hip-Hop, Hits, EDM, Reggaeton) plus one drink at the bar.',
          },
          {
            q: 'Do 19:30 Buffet guests need to buy a second ticket to stay for Vida Loca?',
            a: 'No. Guests entering between 19:30 and 22:00 with the €15 Aperitif + 1 Drink Buffet pass retain uninterrupted club access inside JustMe Milano until 05:00 at zero extra charge.',
          },
          {
            q: 'Can our group request a dedicated seated restaurant table for Thanksgiving night?',
            a: `Yes. Advance reservation is recommended: while fixed €15 buffet passes book directly online, seated restaurant table requests are handled live 24/7 by our WhatsApp Concierge on ${PHONE}.`,
          },
          {
            q: 'What are the age limit and men’s trouser rules at the door?',
            a: 'Admission is strictly 21+ with a valid original physical photo ID. Dress code is Elegant with long trousers mandatory for gentlemen; shorts, tracksuits, and backpacks are refused.',
          },
          {
            q: 'How does JustMe Milano’s free parking shuttle work on Nov 26?',
            a: `Drivers can navigate to the verified partner parking pin (${THANKSGIVING_JUSTME_SHUTTLE_MAP_URL}) and take the complimentary shuttle service directly to and from the JustMe entrance.`,
          },
          {
            q: 'Which passes book on official Xceed #249216 vs 24/7 WhatsApp Concierge?',
            a: `Confirmed €15 passes and Dehor (€320), Dance Floor (€640), and Central (€1.280) tables book via official Xceed #249216 with zero site markup, while VIP Front (€3.200), DJ Table (€5.000), and custom assistance are confirmed live on WhatsApp ${PHONE} under 100% venue prepayment.`,
          },
          {
            q: 'Which Milan Metro stations are closest to JustMe Milano on Thursday night?',
            a: 'Take Metro M1 (Red) or M2 (Green) to Cadorna FN (6-minute walk across Piazzale Cadorna) or M2 to Lanza Brera (7-minute walk past Arena Civica).',
          },
        ];

  const faqs: ThanksgivingFaqItem[] = [...core.nativeFaqs, ...baseExtraFaqs];

  const mapLabels = isIt
    ? {
        loadMap: 'Carica Mappa Torre Branca (Viale Camoens 2)',
        mapTitle: 'Mappa Interattiva JustMe Milano · Thanksgiving 2026',
        privacyLoadNotice: 'Per tutelare la tua privacy la mappa Google si carica solo al tuo clic.',
      }
    : isZh
      ? {
          loadMap: '点击 加载 Torre Branca 铁塔 实时 地图',
          mapTitle: 'JustMe Milano 互动 地图 · Viale Luigi Camoens 2',
          privacyLoadNotice: '为 保护 隐私，谷歌 地图 仅在 您 点击 后 加载。',
        }
      : {
          loadMap: 'Load Torre Branca Map (Viale Camoens 2)',
          mapTitle: 'Interactive Map of JustMe Milano · Thanksgiving 2026',
          privacyLoadNotice: 'To respect your privacy, Google Maps loads only when you click.',
        };

  return {
    quickFacts,
    overviewParagraphs,
    timelineSteps,
    culinaryHighlights,
    buffetCardCaption,
    tablesCardCaption,
    restaurantConciergeNote,
    tiers,
    vipConciergeNote,
    dressCodeOkItems,
    dressCodeNoItems,
    shuttleHighlightDesc,
    logisticsParagraphs,
    logisticsFacts,
    faqs,
    mapLabels,
    venueBannerEyebrow: isIt ? 'JustMe Milano · Parco Sempione' : isZh ? '米兰 旗舰 夜店 · JustMe Milano' : 'JustMe Milano · Parco Sempione',
    venueBannerTitle: isIt ? 'Esplora la Scheda Completa del JustMe Milano' : isZh ? '探索 JustMe Milano 完整 场馆 档案' : 'Explore the Full JustMe Milano Venue Dossier',
    venueBannerDesc: isIt
      ? 'Architettura firmata Italo Rota, programmazione annuale, regolamento ingressi e lista completa dei grandi eventi sotto la Torre Branca.'
      : isZh
        ? '查看 全景 玻璃 架构 介绍、每周 派对 日历 与 重大 节日 专场 汇总。'
        : 'Discover full venue architecture, annual special events, dress code policy, and direct concierge services beneath Torre Branca.',
    dec31BannerEyebrow: isIt ? '31 Dicembre 2026 · San Silvestro' : isZh ? '2026年12月31日 · 跨年 盛典' : '31 Dec 2026 · New Year’s Eve',
    dec31BannerDesc: isIt
      ? 'Dopo il Thanksgiving, vivi il Gran Galà The Great Gatsby al JustMe Milano: cene, champagne e party di Capodanno sotto la Torre Branca.'
      : isZh
        ? '欢度 感恩节 之后，紧接 预订 12 月 31 日 了不起 的 盖茨比 主题 跨年 晚宴 与 派对。'
        : 'After Thanksgiving, celebrate Dec 31st New Year’s Eve The Great Gatsby at JustMe Milano with gala dinners and midnight celebration.',
    orthodoxBannerEyebrow: isIt ? '13 Gennaio 2027 · Capodanno Giuliano' : isZh ? '2027年1月13日 · 东正教 新年' : '13 Jan 2027 · Orthodox NYE',
    orthodoxBannerDesc: isIt
      ? 'Cene servite Silver (60€) e Gold (80€), Club + 1 Drink (20€) e Guest Star DJ Nazar Radchuk al JustMe Milano per il 13 gennaio 2027.'
      : isZh
        ? '查看 1 月 13 日 Silver 60€ / Gold 80€ 晚宴 与 DJ Nazar Radchuk 东正教 新年夜。'
        : 'Experience Orthodox New Year 2027 at JustMe Milano with Silver (€60) & Gold (€80) gala dinners, €20 club pass, and DJ Nazar Radchuk.',
  };
}

export function getThanksgivingJustMeContent(locale: string): ThanksgivingJustMeContent {
  const def = getLocaleDef(locale);
  const loc: LocaleCode = def ? def.code : 'en';
  const core = CORE_35[loc] || CORE_35.en;
  const narrative = buildNarrativeAndFaqs(loc, core);

  const tocIds = [
    'overview',
    'official-xceed-booking',
    'buffet-culinary',
    'tables-vip-pricing',
    'dress-code-shuttle-logistics',
    'payment-terms',
    'faqs',
  ] as const;

  return {
    metaTitle: core.metaTitle,
    metaDescription: core.metaDescription,
    h1: core.h1,
    subtitle: core.subtitle,
    description: `${core.leadIntro} ${core.extraNativeParagraph}`,
    themeTag: core.themeTag,
    dateBadge: core.dateBadge,
    priceBadge: core.priceBadge,
    ageDressBadge: core.ageDressBadge,
    homeLabel: core.homeLabel,
    eventsLabel: core.eventsLabel,
    specialLabel: core.specialLabel,
    ctaBuyNowLabel: core.ctaBuyNowLabel,
    ctaXceedLabel: core.ctaXceedLabel,
    ctaWhatsappLabel: core.ctaWhatsappLabel,
    ctaShuttleLabel: core.ctaShuttleLabel,
    tocTitle: core.tocTitle,
    tocItems: tocIds.map((id, idx) => ({
      id,
      label: core.tocLabels[idx],
    })),
    quickFacts: narrative.quickFacts,
    overviewHeading: core.overviewHeading,
    overviewParagraphs: narrative.overviewParagraphs,
    timelineHeading: core.timelineHeading,
    timelineSubheading: core.timelineSubheading,
    timelineSteps: narrative.timelineSteps,
    buffetHeading: core.buffetHeading,
    buffetSubheading: core.buffetSubheading,
    buffetCardTitle: core.buffetCardTitle,
    buffetCardCaption: narrative.buffetCardCaption,
    tablesCardTitle: core.tablesCardTitle,
    tablesCardCaption: narrative.tablesCardCaption,
    culinaryHighlights: narrative.culinaryHighlights,
    restaurantConciergeNote: narrative.restaurantConciergeNote,
    tiersHeading: core.tiersHeading,
    tiersSubheading: core.tiersSubheading,
    tiers: narrative.tiers,
    vipConciergeNote: narrative.vipConciergeNote,
    heroLabels: core.heroLabels,
    dressShuttleHeading: core.dressShuttleHeading,
    dressShuttleSubheading: core.dressShuttleSubheading,
    dressCodeOkTitle: core.dressOkTitle,
    dressCodeOkItems: narrative.dressCodeOkItems,
    dressCodeNoTitle: core.dressNoTitle,
    dressCodeNoItems: narrative.dressCodeNoItems,
    shuttleHighlightTitle: core.shuttleHighlightTitle,
    shuttleHighlightDesc: narrative.shuttleHighlightDesc,
    logisticsHeading: core.logisticsHeading,
    logisticsParagraphs: narrative.logisticsParagraphs,
    logisticsFacts: narrative.logisticsFacts,
    mapHeading: core.mapHeading,
    mapLabels: narrative.mapLabels,
    venueBannerEyebrow: narrative.venueBannerEyebrow,
    venueBannerTitle: narrative.venueBannerTitle,
    venueBannerDesc: narrative.venueBannerDesc,
    venueCta: core.venueCta,
    dec31BannerEyebrow: narrative.dec31BannerEyebrow,
    dec31BannerTitle: core.dec31Title,
    dec31BannerDesc: narrative.dec31BannerDesc,
    dec31BannerCta: core.dec31Cta,
    orthodoxBannerEyebrow: narrative.orthodoxBannerEyebrow,
    orthodoxBannerTitle: core.orthodoxTitle,
    orthodoxBannerDesc: narrative.orthodoxBannerDesc,
    orthodoxBannerCta: core.orthodoxCta,
    faqHeading: core.faqHeading,
    faqs: narrative.faqs,
  };
}
