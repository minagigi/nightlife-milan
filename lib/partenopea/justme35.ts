import {
  enabledLocaleCodes,
  getLocaleDef,
  localePrefix,
  type LocaleCode,
} from '@/lib/i18n/localeRegistry';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';

export const PARTENOPEA_JUSTME_XCEED_ID = '249217';
export const PARTENOPEA_JUSTME_XCEED_RAW_SLUG =
  'friday-night-justme-milano-2026-11-27';
export const PARTENOPEA_JUSTME_LEGACY_RAW_SLUG =
  'cena-spettacolo-partenopea-justme-milano-2026-11-27';
export const PARTENOPEA_JUSTME_SOURCE_URL =
  'https://xceed.me/en/milano/event/friday-night-727/249217';
export const PARTENOPEA_JUSTME_AFFILIATE_URL =
  'https://xceed.me/en/milano/event/friday-night-727/249217/channel/nightlifemilan-1';
export const PARTENOPEA_JUSTME_SHUTTLE_MAP_URL =
  'https://maps.app.goo.gl/dPGebEjXXzg9Lyhi9';

export const PARTENOPEA_JUSTME_POSTER_SRC =
  '/images/events/partenopea-2026/cena-spettacolo-partenopea-justme-milano-2026.webp';
export const PARTENOPEA_JUSTME_MENU_CARD_SRC =
  '/images/events/partenopea-2026/justme-partenopea-2026-menu-dinner-show-70.webp';
export const PARTENOPEA_JUSTME_TABLES_CARD_SRC =
  '/images/events/partenopea-2026/justme-partenopea-2026-party-vip-tables.webp';

export const PARTENOPEA_JUSTME_FLOW_ASSET_KEYS = [
  'partenopea-justme-01-torre-branca',
  'partenopea-justme-02-cena-napoletana',
  'partenopea-justme-03-dinner-show-live',
  'partenopea-justme-04-party-vip-tables',
] as const;

export const PARTENOPEA_JUSTME_VENUE = {
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

export const PARTENOPEA_JUSTME_SLUGS_35: Record<LocaleCode, string> = {
  en: 'cena-spettacolo-partenopea-pineta-napoli-justme-milan-nov-27',
  it: 'cena-spettacolo-partenopea-pineta-napoli-justme-milano-27-novembre',
  es: 'cena-espectaculo-partenopea-pineta-napoli-justme-milan-27-nov',
  fr: 'diner-spectacle-partenopea-pineta-napoli-justme-milan-27-novembre',
  de: 'dinner-show-partenopea-pineta-napoli-justme-mailand-27-november',
  pt: 'jantar-show-partenopea-pineta-napoli-justme-milao-27-novembro',
  nl: 'dinershow-partenopea-pineta-napoli-justme-milaan-27-november',
  ru: 'uzhin-shou-partenopea-pineta-napoli-justme-milan-27-noyabrya',
  tr: 'partenopea-aksam-yemegi-sov-pineta-napoli-justme-milano-27-kasim',
  zh: 'partenopea-napoli-dinner-show-justme-milano-2026-11-27-zh',
  ar: 'asha-ard-partenopea-pineta-napoli-justme-milano-27-november',
  bg: 'vecherya-shou-partenopea-pineta-napoli-justme-milan-27-noemvri',
  hr: 'vecera-show-partenopea-pineta-napoli-justme-milano-27-studenog',
  cs: 'vecere-show-partenopea-pineta-napoli-justme-milan-27-listopadu',
  da: 'middagsshow-partenopea-pineta-napoli-justme-milano-27-november',
  et: 'ohtusook-show-partenopea-pineta-napoli-justme-milano-27-november',
  fi: 'illallisshow-partenopea-pineta-napoli-justme-milano-27-marraskuuta',
  el: 'deipno-show-partenopea-pineta-napoli-justme-milano-27-noemvriou',
  hu: 'vacsorashow-partenopea-pineta-napoli-justme-milano-november-27',
  ga: 'dinnear-seodhra-partenopea-pineta-napoli-justme-milan-27-samhain',
  lv: 'vakarinas-sovs-partenopea-pineta-napoli-justme-milana-27-novembris',
  lt: 'vakariene-sou-partenopea-pineta-napoli-justme-milanas-lapkricio-27',
  mt: 'ikla-spettaklu-partenopea-pineta-napoli-justme-milan-27-novembru',
  pl: 'kolacja-show-partenopea-pineta-napoli-justme-mediolan-27-listopada',
  ro: 'cina-spectacol-partenopea-pineta-napoli-justme-milano-27-noiembrie',
  sk: 'vecera-show-partenopea-pineta-napoli-justme-milano-27-november',
  sl: 'vecerja-sov-partenopea-pineta-napoli-justme-milano-27-november',
  sv: 'middagsshow-partenopea-pineta-napoli-justme-milano-27-november-sv',
  no: 'middagsshow-partenopea-pineta-napoli-justme-milano-27-november-no',
  is: 'kvoldverdur-syning-partenopea-pineta-napoli-justme-milan-27-november',
  uk: 'vecherya-shou-partenopea-pineta-napoli-justme-milan-27-lystopada',
  sq: 'darka-spektakel-partenopea-pineta-napoli-justme-milano-27-nentor',
  sr: 'vecera-sou-partenopea-pineta-napoli-justme-milano-27-novembar',
  bs: 'vecera-show-partenopea-pineta-napoli-justme-milano-27-novembra',
  mk: 'vecera-sou-partenopea-pineta-napoli-justme-milano-27-noemvri',
};

export function partenopeaJustMeSlug(locale: string): string {
  const def = getLocaleDef(locale);
  const code: LocaleCode = def ? def.code : 'en';
  return PARTENOPEA_JUSTME_SLUGS_35[code] || PARTENOPEA_JUSTME_SLUGS_35.en;
}

export function partenopeaJustMePath(locale: string): string {
  const prefix = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale as LocaleCode);
  return `${prefix}/${eventsDir}/${partenopeaJustMeSlug(locale)}`;
}

export function partenopeaJustMeHreflangAlternates(
  baseUrl = 'https://nightlifemilan.com',
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of enabledLocaleCodes) {
    const def = getLocaleDef(loc);
    const key = def?.hreflang || loc;
    languages[key] = `${baseUrl}${partenopeaJustMePath(loc)}`;
  }
  languages['x-default'] = `${baseUrl}${partenopeaJustMePath('en')}`;
  return languages;
}

const CANONICAL_SLUGS_SET = new Set(
  Object.values(PARTENOPEA_JUSTME_SLUGS_35).map((s) => s.toLowerCase()),
);

const DATED_NOVEMBER_27_JUSTME_RE = /justme.*(partenopea|cena|dinner|friday)|partenopea.*justme/;

export function resolvePartenopeaJustMeSlug(rawSlug: string): boolean {
  const norm = rawSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!norm) return false;
  if (CANONICAL_SLUGS_SET.has(norm)) return true;
  if (
    norm === PARTENOPEA_JUSTME_XCEED_RAW_SLUG ||
    norm === PARTENOPEA_JUSTME_LEGACY_RAW_SLUG ||
    norm === '249217' ||
    norm === 'friday-night-727-249217'
  ) {
    return true;
  }
  if (norm.includes('249217') && !norm.includes('197')) return true;
  if (norm.endsWith('2026-11-27') && DATED_NOVEMBER_27_JUSTME_RE.test(norm)) {
    return true;
  }
  return false;
}

export interface PartenopeaTimelineStep {
  time: string;
  title: string;
  detail: string;
}

export interface PartenopeaCulinaryHighlight {
  badge: string;
  title: string;
  detail: string;
}

export interface PartenopeaOfferTier {
  id: string;
  title: string;
  price: string;
  badge: string;
  summary: string;
  bullets: string[];
  ctaKind: 'native' | 'whatsapp';
  ctaLabel: string;
}

export interface PartenopeaFaqItem {
  q: string;
  a: string;
}

export interface PartenopeaLogisticsFact {
  label: string;
  value: string;
}

export interface PartenopeaJustMeContent {
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
  quickFacts: PartenopeaLogisticsFact[];
  overviewHeading: string;
  overviewParagraphs: string[];
  timelineHeading: string;
  timelineSubheading: string;
  timelineSteps: PartenopeaTimelineStep[];
  dinnerHeading: string;
  dinnerSubheading: string;
  menuCardTitle: string;
  menuCardCaption: string;
  tablesCardTitle: string;
  tablesCardCaption: string;
  culinaryHighlights: PartenopeaCulinaryHighlight[];
  restaurantConciergeNote: string;
  tiersHeading: string;
  tiersSubheading: string;
  tiers: PartenopeaOfferTier[];
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
  logisticsFacts: PartenopeaLogisticsFact[];
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
  thanksgivingBannerEyebrow: string;
  thanksgivingBannerTitle: string;
  thanksgivingBannerDesc: string;
  thanksgivingBannerCta: string;
  dec31BannerEyebrow: string;
  dec31BannerTitle: string;
  dec31BannerDesc: string;
  dec31BannerCta: string;
  orthodoxBannerEyebrow: string;
  orthodoxBannerTitle: string;
  orthodoxBannerDesc: string;
  orthodoxBannerCta: string;
  faqHeading: string;
  faqs: PartenopeaFaqItem[];
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
  dinnerHeading: string;
  dinnerSubheading: string;
  menuCardTitle: string;
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
  thanksgivingTitle: string;
  thanksgivingCta: string;
  dec31Title: string;
  dec31Cta: string;
  orthodoxTitle: string;
  orthodoxCta: string;
  heroLabels: [string, string, string, string];
  nativeFaqs: [PartenopeaFaqItem, PartenopeaFaqItem, PartenopeaFaqItem];
}

const PHONE = '+39 351 912 7047';

const CORE_35: Record<LocaleCode, CoreLocalePack> = {
  en: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milan | Nov 27 · €70',
    metaDescription: `Fri Nov 27 2026 at JustMe Milan: Cena Spettacolo Partenopea with Pineta Napoli. €70 Full Menu, €20 Party, VIP tables 320-5000€ on site or ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea at JustMe Milano (Pineta Napoli)',
    subtitle: 'Friday, November 27, 2026 · 19:30 Doors & Aperitif · 21:30 Dinner Show & Live Music · 23:00 Party until 05:00 · John Vaccaro, DJ Franky Dee & DJ Antonio Marigliano',
    themeTag: 'In Collaboration with Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Friday, Nov 27, 2026 · 19:30 / 05:00',
    priceBadge: 'Menu €70 · Aperitif €15 · Club €20 · Tables €320–€5.000',
    ageDressBadge: '21+ · Elegant (Men: long trousers mandatory)',
    leadIntro: 'After conquering Naples, the celebrated CSP · Cena Spettacolo Partenopea arrives at JustMe Milano in Parco Sempione beneath the illuminated Torre Branca on Friday, November 27, 2026, presented in official collaboration with Pineta Napoli.',
    extraNativeParagraph: 'Doors open at 19:30 for the €15 Aperitif and seated dinner reception, building into the €70 full 4-course Neapolitan Dinner Show from 21:30 led live by Voice John Vaccaro, before transitioning at 23:00 into the full club party with DJ Franky Dee and DJ Antonio Marigliano until 05:00 AM.',
    homeLabel: 'Home',
    eventsLabel: 'Milan Events',
    specialLabel: 'Special Events',
    ctaBuyNowLabel: 'Book Online (€15 – €1.280)',
    ctaXceedLabel: 'Official Xceed #249217',
    ctaWhatsappLabel: '24/7 VIP & Dinner Concierge',
    ctaShuttleLabel: 'Free Parking Shuttle',
    tocTitle: 'Event Guide · Cena Spettacolo Partenopea JustMe Milan',
    tocLabels: [
      '1. Overview, Pineta Napoli Collaboration & Nov 27 Schedule',
      '2. Online Ticket, Dinner (€70) & Table Checkout',
      '3. Full €70 Neapolitan Menu & Line-up (Vaccaro, Franky Dee, Marigliano)',
      '4. Complete 8 Confirmed Rates & VIP Tables (€15–€5.000)',
      '5. Dress Code 21+, Free Shuttle & Parco Sempione Map',
      '6. 100% Prepayment Terms & Instant Confirmation',
      '7. Frequently Asked Questions (12 FAQs)',
    ],
    quickLabels: ['Date & Schedule', 'Exact Venue (Not Pineta MI)', 'Neapolitan Menu & Line-up', 'Age & Dress Code', 'Confirmed Rates', 'Parking Shuttle'],
    overviewHeading: 'Overview · CSP Cena Spettacolo Partenopea Comes to JustMe Milano',
    timelineHeading: 'Full Evening Schedule · Friday, November 27, 2026',
    timelineSubheading: 'From 19:30 Aperitif & Welcome Drinks through the 21:30 Dinner Show to the 23:00–05:00 Party',
    timelineTitles: [
      '19:30 · Gates Open, €15 Aperitif + 1 Drink & Seated Dinner Check-In',
      '21:30 · CSP Dinner Show Starts · Live Music & Four-Course Neapolitan Menu (€70)',
      '22:30 · Friday Club + 1 Drink Admission (€20) Begins',
      '23:00 · Official Start Party · DJ Franky Dee & DJ Antonio Marigliano + Dehor Cutoff',
      '00:30–05:00 · Late-Night Privé Bottles & Main Dancefloor Closing',
    ],
    dinnerHeading: 'CSP Full Neapolitan Menu (€70) · Voice John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Confirmed sharing antipasti, Mezzi Paccheri al ragù napoletano, Amalfi lemon sorbet, house wine, water, coffee, and uninterrupted club retention',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Full €70 Menu + Party',
    tablesCardTitle: 'JustMe Milano Party & VIP Tables · Friday Nov 27 (€320–€5.000)',
    tiersHeading: 'All 8 Confirmed Event Rates · Dinner Show (€70) & Xceed #249217',
    tiersSubheading: 'Book the €70 Dinner Show, €15 Aperitif, €20 Club Pass, and €320–€1.280 tables online in EUR, or reserve €3.200–€5.000 Privé via WhatsApp',
    dressShuttleHeading: '21+ Entry Policy, Smart Dress Code & Complimentary Shuttle',
    dressShuttleSubheading: 'JustMe Milano enforces strict 21+ physical ID checks and mandatory long trousers for men at Viale Luigi Camoens 2',
    dressOkTitle: 'Recommended Attire (Admitted)',
    dressNoTitle: 'Refused at the Door (21+)',
    shuttleHighlightTitle: 'Dedicated Partner Car Park with Complimentary Shuttle Service',
    logisticsHeading: 'Reaching JustMe Milano · Torre Branca, Metro & Shuttle Pin',
    mapHeading: 'Map & GPS · Viale Luigi Camoens 2 (Not Via Messina 38)',
    faqHeading: 'Frequently Asked Questions · Cena Spettacolo Partenopea JustMe Milano',
    venueCta: 'Explore JustMe Milano Dossier',
    thanksgivingTitle: 'Joining the Night Before? See Thanksgiving Nov 26 at JustMe',
    thanksgivingCta: 'See Nov 26 Thanksgiving',
    dec31Title: 'Planning New Year’s Eve? See Dec 31 Gatsby Gala at JustMe',
    dec31Cta: 'See Dec 31 JustMe NYE',
    orthodoxTitle: 'Celebrating Jan 13? See Orthodox New Year 2027 at JustMe',
    orthodoxCta: 'See Jan 13 Orthodox NYE',
    heroLabels: [
      'Evening guests arriving beneath Torre Branca at JustMe Milano on Viale Camoens 2',
      'Heated glass pavilion hosting the €70 Cena Spettacolo Partenopea seated dinner at 21:30',
      'Live musical Dinner Show atmosphere with Voice John Vaccaro inside JustMe Milano',
      'VIP Privé tables and Friday dancefloor with DJ Franky Dee and Antonio Marigliano until 05:00',
    ],
    nativeFaqs: [
      {
        q: 'What is included in the €70 Cena Spettacolo Partenopea menu on Nov 27?',
        a: 'The confirmed €70 menu features sharing starters (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano as main course, Amalfi lemon sorbet, plus water, house wine, coffee, and full retention for the 23:00 club party.',
      },
      {
        q: 'Is Cena Spettacolo Partenopea at JustMe Milano or at Pineta Club on Via Messina?',
        a: 'It takes place exclusively at JustMe Milano (Viale Luigi Camoens 2, Torre Branca, Parco Sempione). Pineta Napoli is the Neapolitan event partner collaborating inside JustMe Milano; Pineta Club Milano on Via Messina 38 is a completely separate club venue.',
      },
      {
        q: 'Why is the Friday Club + 1 Drink ticket €20 instead of €15?',
        a: 'On Friday, November 27, 2026 (Xceed #249217), JustMe Milano sets Aperitif + 1 Drink (19:30–21:30) at €15 and Friday Club + 1 Drink (from 22:30 / Party 23:00) at €20, whereas Thursday Nov 26 has both at €15.',
      },
    ],
  },
  it: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Ven 27 nov 2026 al JustMe Milano: Cena Spettacolo Partenopea con Pineta Napoli, menu 70€, Party dalle 23:00 (20€). Biglietti e tavoli ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea al JustMe Milano (Pineta Napoli)',
    subtitle: 'Venerdì 27 Novembre 2026 · 19:30 Apertura & Aperitivo · 21:30 Dinner Show & Live Music · 23:00 Start Party fino alle 05:00 · Voice John Vaccaro, DJ Franky Dee e DJ Antonio Marigliano',
    themeTag: 'In Collaborazione con Pineta Napoli · Dinner Show & Party · Torre Branca',
    dateBadge: 'Venerdì 27 Novembre 2026 · 19:30 / 05:00',
    priceBadge: 'Cena Menu 70€ · Aperitivo 15€ · Club 20€ · Tavoli 320€–5.000€',
    ageDressBadge: '21+ · Elegante (uomini: pantalone lungo obbligatorio)',
    leadIntro: 'Dopo aver conquistato Napoli, la celebre CSP · Cena Spettacolo Partenopea sbarca a Milano venerdì 27 novembre 2026 nella prestigiosa cornice vetrata del JustMe Milano sotto la Torre Branca, in collaborazione ufficiale con Pineta Napoli.',
    extraNativeParagraph: 'La serata apre alle 19:30 per gli ingressi aperitivo (15€) e il ricevimento ai tavoli ristorante, esplode dalle 21:30 con il Dinner Show cantato dal vivo da Voice John Vaccaro accompagnato dal menu partenopeo completo da 70€, e prosegue dalle 23:00 fino alle 05:00 con il Party firmato DJ Franky Dee e DJ Antonio Marigliano.',
    homeLabel: 'Home',
    eventsLabel: 'Eventi Milano',
    specialLabel: 'Eventi Speciali',
    ctaBuyNowLabel: 'Acquista Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canale Ufficiale Xceed #249217',
    ctaWhatsappLabel: 'Concierge Cena & VIP 24/7',
    ctaShuttleLabel: 'Parcheggio con Navetta Gratuita',
    tocTitle: 'Indice della Serata · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Panoramica, Partnership Pineta Napoli & Programma 27 Nov',
      '2. Acquisto Online Menu 70€, Ingresso Club 20€ & Tavoli',
      '3. Menu Napoletano Completo (70€) & Line-up Live',
      '4. Listino Completo 8 Tariffe Ufficiali (15€–5.000€)',
      '5. Dress Code 21+, Navetta Gratuita & Mappa Torre Branca',
      '6. Termini di Pagamento 100% & Conferma Immediata',
      '7. Domande Frequenti (12 FAQ)',
    ],
    quickLabels: ['Data e Orari Esatti', 'Locale (Non Via Messina)', 'Menu 70€ & Artisti', 'Età e Dress Code', 'Prezzi Confermati', 'Navetta Parcheggio'],
    overviewHeading: 'Panoramica dell’Evento · La Celebre Cena Spettacolo Partenopea a Milano',
    timelineHeading: 'Scaletta Completa della Serata · Venerdì 27 Novembre 2026',
    timelineSubheading: 'Dall’apertura porte alle 19:30 al Dinner Show delle 21:30, fino al Party di DJ Franky Dee e Antonio Marigliano fino alle 05:00',
    timelineTitles: [
      '19:30 · Apertura Porte, Aperitivo (15€) & Accoglienza Tavoli Ristorante',
      '21:30 · Inizio CSP Dinner Show · Live Music con John Vaccaro & Menu 70€',
      '22:30 · Apertura Ingresso Serale Club + 1 Drink (20€)',
      '23:00 · Start Party Ufficiale · DJ Franky Dee & DJ Antonio Marigliano + Cutoff Dehor',
      '00:30–05:00 · Servizio Bottiglie Privé & Grande Finale Dancefloor',
    ],
    dinnerHeading: 'Menu Partenopeo Completo (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Antipasti della tradizione al centro, Mezzi Paccheri al ragù napoletano, Sorbetto al limone di Amalfi, acqua, vino della casa, caffè e permanenza inclusa al Party',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu 70€ + Party Inclusi',
    tablesCardTitle: 'JustMe Milano Friday Party & Tavoli Privé (320€–5.000€)',
    tiersHeading: 'Tutte le 8 Tariffe Confermate · Menu Cena 70€ & Xceed #249217',
    tiersSubheading: 'Acquista online in euro il Menu 70€, l’Aperitivo 15€, il Club 20€ e i tavoli Dehor, Pista o Centrali, oppure richiedi VIP Front e Console DJ su WhatsApp',
    dressShuttleHeading: 'Ingresso 21+, Dress Code Uomo & Navetta Gratuita Torre Branca',
    dressShuttleSubheading: 'Selezione rigorosa 21+ con documento originale, pantalone lungo obbligatorio per l’uomo e navetta gratuita dedicata per chi guida',
    dressOkTitle: 'Abbigliamento Consigliato (Ammesso)',
    dressNoTitle: 'Non Ammesso all’Ingresso (21+)',
    shuttleHighlightTitle: 'Parcheggio Convenzionato con Servizio Navetta Gratuito A/R',
    logisticsHeading: 'Come Raggiungere JustMe Milano · Viale Luigi Camoens 2',
    mapHeading: 'Mappa & GPS Torre Branca (Non Pineta Via Messina 38)',
    faqHeading: 'Domande Frequenti · Cena Spettacolo Partenopea JustMe Milano',
    venueCta: 'Scheda Locale JustMe Milano',
    thanksgivingTitle: 'Vieni anche Giovedì 26? Vedi Thanksgiving al JustMe Milano',
    thanksgivingCta: 'Vedi 26 Nov Thanksgiving',
    dec31Title: 'Cerchi il Capodanno 31 Dicembre al JustMe Milano?',
    dec31Cta: 'Vedi Capodanno 31 Dicembre',
    orthodoxTitle: 'Cerchi anche il 13 Gennaio Capodanno Ortodosso al JustMe?',
    orthodoxCta: 'Vedi 13 Gennaio Ortodosso',
    heroLabels: [
      'Arrivo degli ospiti sotto la Torre Branca al JustMe Milano per venerdì 27 novembre',
      'Cena Spettacolo Partenopea delle 21:30 con Mezzi Paccheri e piatti campani al JustMe',
      'Dinner Show dal vivo tra i tavoli della veranda con Voice John Vaccaro',
      'Pista centrale e Privé JustMe Milano con DJ Franky Dee e DJ Antonio Marigliano',
    ],
    nativeFaqs: [
      {
        q: 'Cosa comprende il menu da 70€ della Cena Spettacolo Partenopea del 27 novembre?',
        a: 'Il menu ufficiale da 70€ include antipasti da condividere al centro (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, Sorbetto al limone di Amalfi, acqua, vino della casa, caffè e accesso incluso al Party dalle 23:00.',
      },
      {
        q: 'La serata con Pineta Napoli si svolge al JustMe Milano o al Pineta di Via Messina 38?',
        a: 'Si svolge esclusivamente al JustMe Milano in Viale Luigi Camoens 2 (Torre Branca, Parco Sempione). Pineta Napoli partecipa come partner ospite della Cena Spettacolo Partenopea, mentre il Pineta Club Milano di Via Messina 38 è un locale completamente separato.',
      },
      {
        q: 'Quanto costa l’ingresso Club del venerdì rispetto al giovedì e a che ora inizia il Party?',
        a: 'Venerdì 27 novembre 2026 l’ingresso Club + 1 Drink confermato su Xceed #249217 costa 20€ con accesso dalle 22:30 (a differenza dei 15€ del giovedì); l’Aperitivo 19:30–21:30 resta a 15€ e lo Start Party ufficiale scatta alle 23:00.',
      },
    ],
  },
  es: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milán | 27 Nov · 70€',
    metaDescription: `Viernes 27 nov 2026 en JustMe Milán: Cena Spettacolo Partenopea con Pineta Napoli, menú 70€, Party 23:00 (20€). Reservas y mesas ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea en JustMe Milán (Pineta Napoli)',
    subtitle: 'Viernes 27 de noviembre 2026 · 19:30 Apertura & Aperitivo · 21:30 Dinner Show & Live Music · 23:00 Start Party hasta 05:00 · Voice John Vaccaro, DJ Franky Dee y Antonio Marigliano',
    themeTag: 'En Colaboración con Pineta Napoli · Dinner Show & Party · Torre Branca',
    dateBadge: 'Viernes 27 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menú 70€ · Aperitivo 15€ · Club 20€ · Mesas 320€–5.000€',
    ageDressBadge: '21+ · Elegante (pantalón largo obligatorio hombres)',
    leadIntro: 'Tras conquistar Nápoles, la célebre CSP · Cena Spettacolo Partenopea llega el viernes 27 de noviembre de 2026 a JustMe Milano bajo la Torre Branca en Parco Sempione, presentada en colaboración oficial con Pineta Napoli.',
    extraNativeParagraph: 'Las puertas abren a las 19:30 con Aperitivo de 15€ y recepción para la cena. A las 21:30 arranca el Dinner Show con Voice John Vaccaro y el menú napolitano completo de 70€, seguido a las 23:00 por la gran fiesta club con DJ Franky Dee y DJ Antonio Marigliano hasta las 05:00.',
    homeLabel: 'Inicio',
    eventsLabel: 'Eventos Milán',
    specialLabel: 'Eventos Especiales',
    ctaBuyNowLabel: 'Comprar Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canal Oficial Xceed #249217',
    ctaWhatsappLabel: 'Concierge Cena y VIP 24/7',
    ctaShuttleLabel: 'Parking con Lanzadera Gratis',
    tocTitle: 'Guía del Evento · Cena Spettacolo Partenopea JustMe Milán',
    tocLabels: [
      '1. Resumen, Alianza Pineta Napoli y Horarios del 27 Nov',
      '2. Compra Online Menú 70€, Club 20€ y Mesas VIP',
      '3. Menú Napolitano Completo (70€) y Artistas Invitados',
      '4. Lista de las 8 Tarifas Oficiales (15€–5.000€)',
      '5. Dress Code 21+, Lanzadera Gratis y Mapa Torre Branca',
      '6. Condiciones de Prepago 100% y Confirmación Directa',
      '7. Preguntas Frecuentes (12 FAQ)',
    ],
    quickLabels: ['Fecha y Horarios', 'Sede Exacta (No Via Messina)', 'Menú 70€ y Cartel', 'Edad y Etiqueta', 'Tarifas Confirmadas', 'Lanzadera Gratis'],
    overviewHeading: 'Resumen · La Fiesta y Cena Napolitana Llega a JustMe Milano',
    timelineHeading: 'Programa Completo de la Noche · Viernes 27 Noviembre 2026',
    timelineSubheading: 'Desde las 19:30 hasta el cierre club a las 05:00 con John Vaccaro, DJ Franky Dee y DJ Antonio Marigliano',
    timelineTitles: [
      '19:30 · Apertura de Puertas, Aperitivo (15€) y Recepción de Mesas',
      '21:30 · Inicio CSP Dinner Show · Música en Vivo y Menú Napolitano (70€)',
      '22:30 · Acceso Club + 1 Consumición Viernes (20€)',
      '23:00 · Start Party con DJ Franky Dee & DJ Antonio Marigliano y Límite Dehor',
      '00:30–05:00 · Mesas Privé con Botella y Cierre de Pista Principal',
    ],
    dinnerHeading: 'Menú Completo Napolitano (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Entrantes al centro para compartir, Mezzi Paccheri al ragù napoletano, sorbete de limón de Amalfi, agua, vino de la casa, café y acceso al club',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menú Completo 70€',
    tablesCardTitle: 'JustMe Milano Viernes Party y Mesas VIP (320€–5.000€)',
    tiersHeading: 'Las 8 Tarifas Oficiales Confirmadas · Menú 70€ y Xceed #249217',
    tiersSubheading: 'Reserva online en EUR el menú de 70€, pase club 20€ o mesas Dehor/Pista/Central, o consulta VIP Front 3.200€ y DJ 5.000€ por WhatsApp',
    dressShuttleHeading: 'Acceso 21+, Dress Code Masculino y Parking con Lanzadera Gratis',
    dressShuttleSubheading: 'Control estricto para mayores de 21 años y vestimenta elegante con pantalón largo obligatorio para hombres en Viale Camoens 2',
    dressOkTitle: 'Vestimenta Recomendada (Permitida)',
    dressNoTitle: 'No Permitido en Puerta (21+)',
    shuttleHighlightTitle: 'Parking Asociado con Servicio Gratuito de Lanzadera',
    logisticsHeading: 'Cómo Llegar a JustMe Milano · Metro, Taxi y Lanzadera',
    mapHeading: 'Mapa GPS · Torre Branca (No Pineta Via Messina 38)',
    faqHeading: 'Preguntas Frecuentes · Cena Spettacolo Partenopea JustMe Milán',
    venueCta: 'Ver Ficha Completa de JustMe Milano',
    thanksgivingTitle: '¿También vienes el Jueves 26? Ver Thanksgiving en JustMe',
    thanksgivingCta: 'Ver 26 Nov Thanksgiving',
    dec31Title: '¿Buscas Nochevieja 31 de Diciembre en JustMe Milano?',
    dec31Cta: 'Ver Fin de Año 31 Dic',
    orthodoxTitle: '¿Celebras también el 13 de Enero Año Nuevo Ortodoxo?',
    orthodoxCta: 'Ver 13 Enero JustMe',
    heroLabels: [
      'Llegada nocturna de invitados bajo Torre Branca en JustMe Milano',
      'Cena Spettacolo Partenopea de las 21:30 con gastronomía napolitana auténtica',
      'Dinner Show cantado en directo entre mesas iluminadas por velas',
      'Mesas VIP y pista central el viernes 27 de noviembre hasta las 05:00',
    ],
    nativeFaqs: [
      {
        q: '¿Qué incluye exactamente el menú de 70€ del viernes 27 de noviembre?',
        a: 'Incluye entrantes al centro (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), plato principal Mezzi Paccheri al ragù napoletano, sorbete de limón de Amalfi, agua, vino de la casa, café y acceso al Party desde las 23:00.',
      },
      {
        q: '¿El evento se celebra en JustMe Milano o en el club Pineta de Via Messina 38?',
        a: 'Se celebra únicamente en JustMe Milano (Viale Luigi Camoens 2, Torre Branca). Pineta Napoli actúa como socio colaborador invitado; Pineta Club Milano en Via Messina 38 es otro club distinto.',
      },
      {
        q: '¿Por qué la entrada Club del viernes cuesta 20€ y cuál es el horario límite de Dehor?',
        a: 'Según la tarifa oficial de viernes #249217 en Xceed, Club + 1 Drink desde las 22:30 cuesta 20€, el Aperitivo 19:30–21:30 cuesta 15€ y las mesas Dehor de 320€ exigen entrar antes de las 23:00.',
      },
    ],
  },
  fr: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milan | 27 Nov · 70€',
    metaDescription: `Ven 27 nov 2026 au JustMe Milan : Cena Spettacolo Partenopea avec Pineta Napoli, menu 70€, Party 23h (20€). Billets et tables ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea au JustMe Milano (Pineta Napoli)',
    subtitle: 'Vendredi 27 novembre 2026 · 19h30 Apéritif & Accueil · 21h30 Dinner Show & Live Music · 23h00 Start Party jusqu’à 05h00 · John Vaccaro, DJ Franky Dee et Antonio Marigliano',
    themeTag: 'En Collaboration avec Pineta Napoli · Dinner Show & Club · Torre Branca',
    dateBadge: 'Vendredi 27 Nov 2026 · 19h30 / 05h00',
    priceBadge: 'Menu 70€ · Apéritif 15€ · Club 20€ · Tables 320€–5.000€',
    ageDressBadge: '21+ · Tenue Élégante (pantalon long hommes requis)',
    leadIntro: 'Après avoir conquis Naples, la célèbre CSP · Cena Spettacolo Partenopea investit JustMe Milano sous la Torre Branca le vendredi 27 novembre 2026, présentée en collaboration officielle avec Pineta Napoli.',
    extraNativeParagraph: 'Ouverture à 19h30 pour le pass Apéritif à 15€ et le placement à table, montée en puissance à 21h30 avec le Dinner Show live de Voice John Vaccaro autour du menu napolitain à 70€, puis transition à 23h00 vers le grand Party club avec DJ Franky Dee et DJ Antonio Marigliano jusqu’à 05h00.',
    homeLabel: 'Accueil',
    eventsLabel: 'Événements Milan',
    specialLabel: 'Événements Spéciaux',
    ctaBuyNowLabel: 'Acheter en Ligne (15€ – 1.280€)',
    ctaXceedLabel: 'Canal Officiel Xceed #249217',
    ctaWhatsappLabel: 'Concierge Dîner & VIP 24/7',
    ctaShuttleLabel: 'Parking avec Navette Gratuite',
    tocTitle: 'Sommaire du Guide · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Présentation, Partenariat Pineta Napoli & Horaires',
      '2. Billetterie Directe en Euro (Menu 70€, Club 20€, Tables)',
      '3. Menu Napolitain Complet (70€) & Line-up Live',
      '4. Grille Complète des 8 Tarifs Confirmés (15€–5.000€)',
      '5. Dress Code 21+, Navette Gratuite & Plan Torre Branca',
      '6. Règlement Prépayé 100% & Confirmation Immédiate',
      '7. Questions Fréquentes (12 FAQ)',
    ],
    quickLabels: ['Date & Horaires', 'Adresse Exacte (Pas Via Messina)', 'Menu 70€ & Artistes', 'Âge & Dress Code', 'Tarifs Confirmés', 'Navette Parking'],
    overviewHeading: 'Présentation · La Grande Nuit Napolitaine au JustMe Milano',
    timelineHeading: 'Programme Complet · Vendredi 27 Novembre 2026',
    timelineSubheading: 'De 19h30 jusqu’au petit matin avec Voice John Vaccaro, DJ Franky Dee et DJ Antonio Marigliano',
    timelineTitles: [
      '19h30 · Ouverture des Portes, Apéritif (15€) & Accueil Dîner',
      '21h30 · Coup d’Envoi CSP Dinner Show Live & Menu Napolitain (70€)',
      '22h30 · Ouverture Entrée Club Vendredi + 1 Boisson (20€)',
      '23h00 · Start Party · DJ Franky Dee & Antonio Marigliano + Limite Dehor',
      '00h30–05h00 · Service Bouteilles Privé & Main Dancefloor',
    ],
    dinnerHeading: 'Menu Napolitain Complet (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Antipasti partagés, Mezzi Paccheri al ragù napoletano, sorbet citron d’Amalfi, eau, vin maison, café et accès Party inclus',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu Complet 70€',
    tablesCardTitle: 'Tables Privé & Vendredi Club JustMe Milano (320€–5.000€)',
    tiersHeading: 'Tous les 8 Tarifs Officiels · Dîner 70€ & Xceed #249217',
    tiersSubheading: 'Réservez en ligne le dîner-spectacle 70€, l’apéritif 15€, le club 20€ et les tables jusqu’à 1.280€, ou demandez le Carré VIP Front / DJ sur WhatsApp',
    dressShuttleHeading: 'Sélection 21+, Code Vestimentaire & Navette Parking Gratuite',
    dressShuttleSubheading: 'Accès strictement réservé aux plus de 21 ans en tenue habillée sous la verrière chauffée de Viale Camoens 2',
    dressOkTitle: 'Tenue Recommandée (Acceptée)',
    dressNoTitle: 'Refusé à l’Entrée (21+)',
    shuttleHighlightTitle: 'Parking Partenaire avec Navette Gratuite Aller-Retour',
    logisticsHeading: 'Accès au JustMe Milano · Métro, Taxi et Navette',
    mapHeading: 'Carte GPS · Torre Branca (Pas Pineta Via Messina 38)',
    faqHeading: 'Questions Fréquentes · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Voir la Fiche du JustMe Milano',
    thanksgivingTitle: 'Présent le Jeudi 26 ? Voir Thanksgiving au JustMe',
    thanksgivingCta: 'Voir 26 Nov Thanksgiving',
    dec31Title: 'Réveillon du 31 Décembre au JustMe Milano ?',
    dec31Cta: 'Voir Nouvel An 31 Déc',
    orthodoxTitle: 'Soirée du 13 Janvier Nouvel An Orthodoxe au JustMe ?',
    orthodoxCta: 'Voir 13 Jan JustMe',
    heroLabels: [
      'Arrivée des convives au pied de la Torre Branca devant le JustMe Milano',
      'Dîner-spectacle napolitain de 21h30 sous la verrière chauffée du JustMe',
      'Performance vocale en direct de John Vaccaro entre les tables dînatoires',
      'Tables VIP Privé et piste du vendredi jusqu’à 05h00 avec DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Que comprend le menu officiel à 70€ de la Cena Spettacolo Partenopea ?',
        a: 'Le menu complet à 70€ réunit des antipasti à partager (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), des Mezzi Paccheri al ragù napoletano, un sorbet au citron d’Amalfi, eau, vin maison, café et l’accès au club dès 23h00.',
      },
      {
        q: 'La soirée avec Pineta Napoli a-t-elle lieu au JustMe Milano ou au Pineta Via Messina ?',
        a: 'Uniquement au JustMe Milano (Viale Luigi Camoens 2, Torre Branca, Parco Sempione). Pineta Napoli est partenaire invité du format gastronomique, sans aucun lien d’adresse avec le club Pineta Milano de Via Messina 38.',
      },
      {
        q: 'Pourquoi le billet Club + 1 Drink du vendredi coûte 20€ au lieu de 15€ ?',
        a: 'Pour le vendredi 27 novembre (Xceed #249217), l’entrée Club dès 22h30 est fixée à 20€ (contre 15€ le jeudi 26) tandis que l’Apéritif 19h30–21h30 reste à 15€.',
      },
    ],
  },
  de: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Mailand | 27 Nov · 70€',
    metaDescription: `Fr 27. Nov 2026 im JustMe Mailand: Cena Spettacolo Partenopea mit Pineta Napoli, 70€ Menü, Party 23:00 (20€). Tickets & Tische ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea im JustMe Milano (Pineta Napoli)',
    subtitle: 'Freitag, 27. November 2026 · 19:30 Einlass & Aperitif · 21:30 Dinner Show · 23:00 Start Party bis 05:00 · Voice John Vaccaro, DJ Franky Dee & DJ Antonio Marigliano',
    themeTag: 'In Partnerschaft mit Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Freitag, 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menü 70€ · Aperitif 15€ · Club 20€ · Tische 320€–5.000€',
    ageDressBadge: '21+ · Elegant (Herren: lange Hose Pflicht)',
    leadIntro: 'Nach den Erfolgen in Neapel kommt die berühmte CSP · Cena Spettacolo Partenopea am Freitag, 27. November 2026, ins beheizte Glashaus des JustMe Milano am Torre Branca im Parco Sempione, veranstaltet in Zusammenarbeit mit Pineta Napoli.',
    extraNativeParagraph: 'Ab 19:30 Uhr öffnet der 15€ Aperitif und der Restaurant-Check-in; ab 21:30 Uhr startet die mitreißende Dinner Show mit Voice John Vaccaro und dem 4-Gänge-Menü für 70€, bevor ab 23:00 Uhr DJ Franky Dee und DJ Antonio Marigliano bis 05:00 Uhr übernehmen.',
    homeLabel: 'Startseite',
    eventsLabel: 'Events Mailand',
    specialLabel: 'Sonderveranstaltungen',
    ctaBuyNowLabel: 'Online Buchen (15€ – 1.280€)',
    ctaXceedLabel: 'Offizieller Kanal Xceed #249217',
    ctaWhatsappLabel: '24/7 Dinner- & VIP-Concierge',
    ctaShuttleLabel: 'Kostenloser Park-Shuttle',
    tocTitle: 'Event-Leitfaden · Cena Spettacolo Partenopea JustMe Mailand',
    tocLabels: [
      '1. Überblick, Pineta Napoli Kooperation & Zeitplan 27. Nov',
      '2. Online-Checkout für 70€ Menü, 20€ Club & Tische',
      '3. Komplettes 70€ Neapel-Menü & Live Line-up',
      '4. Alle 8 Bestätigten Preise & VIP-Tische (15€–5.000€)',
      '5. Einlass ab 21+, Dresscode & Kostenloser Shuttle',
      '6. 100% Vorauszahlung & Sofortbestätigung',
      '7. Häufig Gestellte Fragen (12 FAQ)',
    ],
    quickLabels: ['Datum & Zeiten', 'Exakte Location (Nicht Via Messina)', '70€ Menü & Künstler', 'Alter & Dresscode', 'Bestätigte Preise', 'Gratis Shuttle'],
    overviewHeading: 'Überblick · Neapolitanische Dinner Show im JustMe Milano',
    timelineHeading: 'Abendprogramm · Freitag, 27. November 2026',
    timelineSubheading: 'Von 19:30 Uhr Einlass über die 21:30 Uhr Dinner Show bis 05:00 Uhr Clubnacht',
    timelineTitles: [
      '19:30 · Einlass, 15€ Aperitif + 1 Drink & Empfang der Abendgäste',
      '21:30 · Start CSP Dinner Show · Live-Musik & 70€ Neapel-Menü',
      '22:30 · Einlass für 20€ Club + 1 Drink Tickets',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor-Frist',
      '00:30–05:00 · VIP-Flaschenservice & Main Dancefloor',
    ],
    dinnerHeading: 'Das 70€ Neapel-Menü · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Vorspeisen zum Teilen, Mezzi Paccheri al ragù napoletano, Amalfi-Zitronensorbet, Wasser, Hauswein, Kaffee und kostenloser Verbleib zur Party',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Menü + Party',
    tablesCardTitle: 'JustMe Milano Freitag Party & VIP-Tische (320€–5.000€)',
    tiersHeading: 'Alle 8 Offiziellen Tarife · 70€ Menü & Xceed #249217',
    tiersSubheading: 'Direkt in EUR buchen (70€ Menü, 15€ Aperitif, 20€ Club, 320€–1.280€ Tische) oder 3.200€–5.000€ VIP über WhatsApp anfragen',
    dressShuttleHeading: 'Einlass ab 21 Jahren, Lange Hose Pflicht & Gratis Shuttle',
    dressShuttleSubheading: 'Strenge 21+ Ausweiskontrolle und elegante Abendgarderobe in der Viale Luigi Camoens 2',
    dressOkTitle: 'Empfohlene Kleidung (Akzeptiert)',
    dressNoTitle: 'Nicht Akzeptiert am Einlass (21+)',
    shuttleHighlightTitle: 'Partner-Parkplatz mit Kostenlosem Shuttle direkt zum Club',
    logisticsHeading: 'Anfahrt zum JustMe Milano · U-Bahn, Taxi & Shuttle',
    mapHeading: 'Karte & GPS · Torre Branca (Nicht Pineta Via Messina 38)',
    faqHeading: 'Häufige Fragen · Cena Spettacolo Partenopea JustMe Mailand',
    venueCta: 'JustMe Milano Profil Öffnen',
    thanksgivingTitle: 'Auch am Donnerstag da? Thanksgiving 26. Nov im JustMe',
    thanksgivingCta: '26. Nov Thanksgiving',
    dec31Title: 'Silvester 31. Dezember im JustMe Milano planen?',
    dec31Cta: '31. Dez Silvester',
    orthodoxTitle: 'Am 13. Januar in Mailand? Orthodoxes Neujahr im JustMe',
    orthodoxCta: '13. Jan JustMe',
    heroLabels: [
      'Gästeankunft vor dem beleuchteten Torre Branca am JustMe Milano',
      'Beheizter Glaspavillon während des 70€ Neapel-Dinners um 21:30 Uhr',
      'Live-Dinner-Show-Stimmung mit Sänger John Vaccaro zwischen den Tischen',
      'VIP-Tische und Freitagsparty bis 05:00 Uhr mit DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Was beinhaltet das 70€ Menü der Cena Spettacolo Partenopea am 27. November?',
        a: 'Enthalten sind Vorspeisen zum Teilen (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, Amalfi-Zitronensorbet, Wasser, Hauswein, Kaffee und Eintritt zur anschließenden Party ab 23:00 Uhr.',
      },
      {
        q: 'Findet der Abend im JustMe Milano oder im Pineta Club in der Via Messina statt?',
        a: 'Ausschließlich im JustMe Milano (Viale Luigi Camoens 2 am Torre Branca). Pineta Napoli ist Partner aus Neapel; der Mailänder Club Pineta in der Via Messina 38 ist ein völlig anderes Haus.',
      },
      {
        q: 'Warum kostet das Freitags-Clubticket 20€ und bis wann gilt der Dehor-Tisch?',
        a: 'Am Freitag 27. November (#249217) kostet Club + 1 Drink ab 22:30 Uhr 20€, Aperitif 15€. Gäste mit 320€ Dehor Table müssen pünktlich vor 23:00 Uhr einchecken.',
      },
    ],
  },
  pt: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milão | 27 Nov · 70€',
    metaDescription: `Sexta 27 nov 2026 no JustMe Milão: Cena Spettacolo Partenopea com Pineta Napoli, menu 70€, Party 23h (20€). Reservas ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea no JustMe Milano (Pineta Napoli)',
    subtitle: 'Sexta-feira, 27 de novembro 2026 · 19h30 Portas & Aperitivo · 21h30 Dinner Show & Live Music · 23h00 Start Party até 05h00 · John Vaccaro, DJ Franky Dee e DJ Antonio Marigliano',
    themeTag: 'Em Colaboração com Pineta Napoli · Dinner Show & Party · Torre Branca',
    dateBadge: 'Sexta, 27 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Mesas 320€–5.000€',
    ageDressBadge: '21+ · Elegante (calça comprida obrigatória para homens)',
    leadIntro: 'Depois de conquistar Nápoles, a famosa CSP · Cena Spettacolo Partenopea chega ao JustMe Milano sob a Torre Branca na sexta-feira, 27 de novembro de 2026, em colaboração oficial com a Pineta Napoli.',
    extraNativeParagraph: 'As portas abrem às 19h30 para o Aperitivo de 15€ e recepção de mesas. Às 21h30 começa o Dinner Show ao vivo com Voice John Vaccaro e o menu completo napolitano de 70€, seguindo às 23h00 para o Party até as 05h00 com DJ Franky Dee e DJ Antonio Marigliano.',
    homeLabel: 'Início',
    eventsLabel: 'Eventos Milão',
    specialLabel: 'Eventos Especiais',
    ctaBuyNowLabel: 'Comprar Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canal Oficial Xceed #249217',
    ctaWhatsappLabel: 'Concierge Jantar e VIP 24/7',
    ctaShuttleLabel: 'Estacionamento com Shuttle Grátis',
    tocTitle: 'Guia Completo · Cena Spettacolo Partenopea JustMe Milão',
    tocLabels: [
      '1. Visão Geral, Parceria Pineta Napoli & Horários',
      '2. Checkout Direto em EUR (Menu 70€, Club 20€, Mesas)',
      '3. Menu Napolitano Completo (70€) e Line-up',
      '4. Todas as 8 Tarifas Oficiais (15€–5.000€)',
      '5. Dress Code 21+, Shuttle Grátis e Mapa Torre Branca',
      '6. Pagamento Antecipado 100% e Confirmação Imediata',
      '7. Perguntas Frequentes (12 FAQ)',
    ],
    quickLabels: ['Data e Horários', 'Local Exato (Não Via Messina)', 'Menu 70€ e Line-up', 'Idade e Traje', 'Preços Oficiais', 'Shuttle Grátis'],
    overviewHeading: 'Visão Geral · O Grande Dinner Show Napolitano em Milão',
    timelineHeading: 'Cronograma Completo · Sexta 27 de Novembro 2026',
    timelineSubheading: 'Das 19h30 até as 05h00 da manhã sob a cúpula de vidro aquecida do JustMe Milano',
    timelineTitles: [
      '19:30 · Abertura, Aperitivo (15€) e Recepção de Mesas do Jantar',
      '21:30 · Início CSP Dinner Show · John Vaccaro ao Vivo & Menu 70€',
      '22:30 · Entrada Club + 1 Drink de Sexta-feira (20€)',
      '23:00 · Start Party · DJ Franky Dee & DJ Antonio Marigliano + Limite Dehor',
      '00:30–05:00 · Mesas VIP Privé e Encerramento da Pista',
    ],
    dinnerHeading: 'Menu Napolitano Completo (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Entradas para partilhar, Mezzi Paccheri al ragù napoletano, sorvete de limão de Amalfi, água, vinho da casa, café e acesso à festa',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu 70€ + Party',
    tablesCardTitle: 'JustMe Milano Sexta Party & Mesas Privé (320€–5.000€)',
    tiersHeading: 'Todas as 8 Tarifas Confirmadas · Menu 70€ & Xceed #249217',
    tiersSubheading: 'Compre o menu de 70€, passe 15€ aperitivo, 20€ club ou mesas até 1.280€ diretamente em EUR no site',
    dressShuttleHeading: 'Regras 21+, Dress Code Elegante e Shuttle Gratuito',
    dressShuttleSubheading: 'Entrada permitida apenas para maiores de 21 anos com documento original e calça comprida masculina',
    dressOkTitle: 'Traje Recomendado (Aceito)',
    dressNoTitle: 'Não Permitido na Entrada (21+)',
    shuttleHighlightTitle: 'Estacionamento Conveniado com Transfer Gratuito',
    logisticsHeading: 'Como Chegar ao JustMe Milano · Metrô, Táxi e Shuttle',
    mapHeading: 'Mapa GPS · Torre Branca (Não Pineta Via Messina 38)',
    faqHeading: 'Perguntas Frequentes · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Ver Página do JustMe Milano',
    thanksgivingTitle: 'Vem também Quinta 26? Ver Thanksgiving no JustMe',
    thanksgivingCta: 'Ver 26 Nov Thanksgiving',
    dec31Title: 'Procurando Réveillon 31 de Dezembro no JustMe Milano?',
    dec31Cta: 'Ver Réveillon 31 Dez',
    orthodoxTitle: 'Em Milão em 13 de Janeiro? Ver Ano Novo Ortodoxo',
    orthodoxCta: 'Ver 13 Jan JustMe',
    heroLabels: [
      'Chegada noturna de convidados sob a Torre Branca no JustMe Milano',
      'Jantar sentado de 21h30 no pavilhão de vidro aquecido com gastronomia napolitana',
      'Show vocal ao vivo de John Vaccaro animando as mesas durante o jantar',
      'Pista VIP e mesas Privé até as 05h00 com DJ Franky Dee e Antonio Marigliano',
    ],
    nativeFaqs: [
      {
        q: 'O que inclui o menu de 70€ na sexta-feira 27 de novembro?',
        a: 'Inclui entradas partilhadas (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, sorvete de limão de Amalfi, água, vinho da casa, café e acesso contínuo à festa das 23h00.',
      },
      {
        q: 'O evento acontece no JustMe Milano ou no Pineta da Via Messina 38?',
        a: 'Acontece apenas no JustMe Milano (Viale Luigi Camoens 2, Torre Branca). Pineta Napoli é o parceiro convidado de Nápoles; o Pineta Club Milano da Via Messina 38 é outro endereço.',
      },
      {
        q: 'Por que a entrada Club de sexta custa 20€ e qual a regra da mesa Dehor?',
        a: 'Na sexta 27 de novembro (Xceed #249217) o Club + 1 Drink a partir das 22h30 custa 20€, enquanto mesas Dehor de 320€ exigem check-in estrito até as 23h00.',
      },
    ],
  },
  nl: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milaan | 27 Nov · 70€',
    metaDescription: `Vr 27 nov 2026 in JustMe Milaan: Cena Spettacolo Partenopea met Pineta Napoli, 70€ menu, Party 23:00 (20€). Boek online of via ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea bij JustMe Milano (Pineta Napoli)',
    subtitle: 'Vrijdag 27 november 2026 · 19:30 Deuren & Aperitivo · 21:30 Dinner Show & Live Music · 23:00 Start Party tot 05:00 · John Vaccaro, DJ Franky Dee & DJ Antonio Marigliano',
    themeTag: 'In Samenwerking met Pineta Napoli · Dinner Show & Party · Torre Branca',
    dateBadge: 'Vrijdag 27 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Tafels 320€–5.000€',
    ageDressBadge: '21+ · Elegant (heren: lange broek verplicht)',
    leadIntro: 'Na Napels veroverd te hebben komt de beroemde CSP · Cena Spettacolo Partenopea op vrijdag 27 november 2026 naar JustMe Milano aan de voet van Torre Branca in Parco Sempione, gepresenteerd in samenwerking met Pineta Napoli.',
    extraNativeParagraph: 'De deuren openen om 19:30 voor het Aperitivo (15€) en de dinergasten. Om 21:30 start de live Dinner Show met Voice John Vaccaro en het volledige Napolitaanse menu van 70€, waarna om 23:00 DJ Franky Dee en DJ Antonio Marigliano de zaal tot 05:00 laten dansen.',
    homeLabel: 'Home',
    eventsLabel: 'Events Milaan',
    specialLabel: 'Speciale Events',
    ctaBuyNowLabel: 'Direct Boeken (15€ – 1.280€)',
    ctaXceedLabel: 'Officieel Kanaal Xceed #249217',
    ctaWhatsappLabel: '24/7 Diner & VIP Concierge',
    ctaShuttleLabel: 'Gratis Parkeer-Shuttle',
    tocTitle: 'Evenementgids · Cena Spettacolo Partenopea JustMe Milaan',
    tocLabels: [
      '1. Overzicht, Samenwerking Pineta Napoli & Tijdschema',
      '2. Direct Online Afrekenen in EUR (70€ Menu, 20€ Club)',
      '3. Volledig Napolitaans 70€ Menu & Line-up',
      '4. Alle 8 Officiële Tarieven & VIP-Tafels (15€–5.000€)',
      '5. Dresscode 21+, Gratis Shuttle & Torre Branca Kaart',
      '6. 100% Vooruitbetaling & Directe Bevestiging',
      '7. Veelgestelde Vragen (12 FAQ)',
    ],
    quickLabels: ['Datum & Tijden', 'Juiste Locatie (Geen Via Messina)', '70€ Menu & Artiesten', 'Leeftijd & Dresscode', 'Bevestigde Prijzen', 'Gratis Shuttle'],
    overviewHeading: 'Overzicht · De Napolitaanse Dinner Show Komt naar Milaan',
    timelineHeading: 'Tijdschema van de Avond · Vrijdag 27 November 2026',
    timelineSubheading: 'Van 19:30 aperitief tot 21:30 Dinner Show en het feest tot 05:00 uur',
    timelineTitles: [
      '19:30 · Deuren Open, 15€ Aperitivo + 1 Drink & Diner Ontvangst',
      '21:30 · Start CSP Dinner Show · Live Muziek met John Vaccaro & 70€ Menu',
      '22:30 · Vrijdag Club + 1 Drink Entree (20€) Open',
      '23:00 · Start Party · DJ Franky Dee & DJ Antonio Marigliano + Dehor Deadline',
      '00:30–05:00 · Privé VIP Flessenservice & Hoofddansvloer',
    ],
    dinnerHeading: 'Volledig 70€ Napolitaans Menu · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Gedeelde voorgerechten, Mezzi Paccheri al ragù napoletano, Amalfi-citroensorbet, water, huiswijn, koffie en toegang tot het clubfeest',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Menu + Party',
    tablesCardTitle: 'JustMe Milano Vrijdag Party & VIP-Tafels (320€–5.000€)',
    tiersHeading: 'Alle 8 Officiële Tarieven · 70€ Diner & Xceed #249217',
    tiersSubheading: 'Boek het 70€ menu, 15€ aperitivo, 20€ clubticket en 320€–1.280€ tafels direct op onze site',
    dressShuttleHeading: 'Toegang 21+, Dresscode & Gratis Pendelbus vanaf Parkeerplaats',
    dressShuttleSubheading: 'Strenge 21+ ID-controle en elegante kleding met verplichte lange broek voor mannen',
    dressOkTitle: 'Aanbevolen Kleding (Toegestaan)',
    dressNoTitle: 'Geweigerd aan de Deur (21+)',
    shuttleHighlightTitle: 'Partnerparkeerplaats met Gratis Pendelservice',
    logisticsHeading: 'Bereikbaarheid JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'Kaart & GPS · Torre Branca (Niet Via Messina 38)',
    faqHeading: 'Veelgestelde Vragen · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Bekijk JustMe Milano Dossier',
    thanksgivingTitle: 'Donderdag 26 Nov ook aanwezig? Bekijk Thanksgiving',
    thanksgivingCta: 'Bekijk 26 Nov Thanksgiving',
    dec31Title: 'Oud & Nieuw 31 December bij JustMe Milano vieren?',
    dec31Cta: 'Bekijk 31 Dec NYE',
    orthodoxTitle: 'Ook 13 Januari Orthodox Nieuwjaar bij JustMe bekijken?',
    orthodoxCta: 'Bekijk 13 Jan JustMe',
    heroLabels: [
      'Aankomst van gasten onder de verlichte Torre Branca bij JustMe Milano',
      'Verwarmde glazen zaal met het 70€ Napolitaanse diner om 21:30 uur',
      'Live vocale Dinner Show door John Vaccaro tussen de feestende dinertafels',
      'VIP-tafels en volle vrijdagdansvloer met DJ Franky Dee tot 05:00 uur',
    ],
    nativeFaqs: [
      {
        q: 'Wat zit er precies in het 70€ menu op vrijdag 27 november?',
        a: 'Het 70€ menu biedt gedeelde antipasti (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, Amalfi-citroensorbet, water, huiswijn, koffie en aansluitend toegang tot het feest om 23:00.',
      },
      {
        q: 'Vindt dit evenement plaats in JustMe Milano of in Pineta Club Via Messina 38?',
        a: 'Alleen bij JustMe Milano (Viale Luigi Camoens 2, Torre Branca). Pineta Napoli is een gastpartner uit Napels en dit event vindt niet plaats in Pineta Milano aan de Via Messina 38.',
      },
      {
        q: 'Waarom kost het Club + 1 Drink ticket op vrijdag 20€ in plaats van 15€?',
        a: 'Voor vrijdag 27 november (#249217) is Club + 1 Drink vanaf 22:30 vastgesteld op 20€, Aperitivo (19:30–21:30) op 15€, en Dehor-tafels (320€) vereisen binnenkomst vóór 23:00 uur.',
      },
    ],
  },
  ru: {
    metaTitle: 'Ужин-Шоу Partenopea JustMe Милан | 27 Ноя · 70€',
    metaDescription: `Пт 27 ноя 2026 в JustMe Милан: Cena Spettacolo Partenopea с Pineta Napoli, меню 70€, Party 23:00 (20€). Билеты ${PHONE}.`,
    h1: 'CSP · Ужин-Шоу Cena Spettacolo Partenopea в JustMe Milano',
    subtitle: 'Пятница 27 ноября 2026 · 19:30 Аперитив и Вход · 21:30 Ужин-Шоу · 23:00 Вечеринка до 05:00 · John Vaccaro, DJ Franky Dee и Antonio Marigliano',
    themeTag: 'Совместно с Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Пятница, 27 Ноя 2026 · 19:30 / 05:00',
    priceBadge: 'Меню 70€ · Аперитив 15€ · Клуб 20€ · Столы 320€–5.000€',
    ageDressBadge: '21+ · Элегантный стиль (брюки обязательны для мужчин)',
    leadIntro: 'Покорив Неаполь, знаменитое шоу CSP · Cena Spettacolo Partenopea впервые проходит в Милане 27 ноября 2026 года под стеклянным куполом JustMe Milano у башни Торре-Бранка в партнерстве с Pineta Napoli.',
    extraNativeParagraph: 'Двери открываются в 19:30 для гостей аперитива за 15€ и ресторанных столов. В 21:30 начинается неаполитанское ужин-шоу за 70€ с живым вокалом John Vaccaro, а с 23:00 до 05:00 пультом управляют DJ Franky Dee и DJ Antonio Marigliano.',
    homeLabel: 'Главная',
    eventsLabel: 'События Милан',
    specialLabel: 'Спецсобытия',
    ctaBuyNowLabel: 'Купить Онлайн (15€ – 1.280€)',
    ctaXceedLabel: 'Официальный Xceed #249217',
    ctaWhatsappLabel: 'Консьерж Ужин и VIP 24/7',
    ctaShuttleLabel: 'Бесплатный Шаттл с Парковки',
    tocTitle: 'Гид по Вечеру · Cena Spettacolo Partenopea JustMe Милан',
    tocLabels: [
      '1. Обзор, Коллаборация Pineta Napoli и Тайминг 27 Ноя',
      '2. Онлайн-Оплата Меню 70€, Клуба 20€ и VIP Столов',
      '3. Полное Неаполитанское Меню 70€ и Лайнап Артистов',
      '4. Все 8 Подтвержденных Тарифов Xceed #249217 (15€–5.000€)',
      '5. Дресс-Код 21+, Бесплатный Шаттл и Карта Парка Семпионе',
      '6. Условия 100% Предоплаты и Мгновенное Подтверждение',
      '7. Частые Вопросы (12 FAQ)',
    ],
    quickLabels: ['Дата и Время', 'Точный Клуб (Не Via Messina)', 'Меню 70€ и Артисты', 'Возраст и Дресс-Код', 'Цены и Столы', 'Трансфер Паркинг'],
    overviewHeading: 'Обзор События · Неаполитанское Ужин-Шоу в JustMe Milano',
    timelineHeading: 'Полное Расписание · Пятница 27 Ноября 2026',
    timelineSubheading: 'От аперитива в 19:30 и живого ужин-шоу 21:30 до танцевального сета до 05:00',
    timelineTitles: [
      '19:30 · Открытие Клуба, Аперитив (15€) и Встреча Гостей Ужина',
      '21:30 · Старт CSP Dinner Show · Живой Вокал John Vaccaro и Меню 70€',
      '22:30 · Открытие Ночного Входа Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee и Antonio Marigliano + Порог Dehor',
      '00:30–05:00 · VIP Столы Privé и Главный Танцпол до Утра',
    ],
    dinnerHeading: 'Полное Неаполитанское Меню (70€) · John Vaccaro и Pineta Napoli',
    dinnerSubheading: 'Закуски в стол, Mezzi Paccheri al ragù napoletano, лимонный сорбет Амальфи, вода, домашнее вино, кофе и вход на вечеринку',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Полное Меню 70€',
    tablesCardTitle: 'Вечеринка Пятницы и VIP Столы JustMe Milano (320€–5.000€)',
    tiersHeading: 'Все 8 Официальных Тарифов · Ужин 70€ и Xceed #249217',
    tiersSubheading: 'Покупайте меню 70€, билеты 15€/20€ и столы 320€–1.280€ в евро на сайте или бронируйте VIP Front / DJ через WhatsApp',
    dressShuttleHeading: 'Вход 21+, Строгий Дресс-Код и Бесплатный Шаттл',
    dressShuttleSubheading: 'Оригинал паспорта 21+ и длинные брюки для мужчин на Viale Luigi Camoens 2',
    dressOkTitle: 'Рекомендуемый Стиль (Пропускают)',
    dressNoTitle: 'Не Допускаются (21+)',
    shuttleHighlightTitle: 'Парковка-Партнер с Бесплатным Шаттлом до Входа',
    logisticsHeading: 'Как Добраться в JustMe Milano · Метро, Такси и Шаттл',
    mapHeading: 'Карта GPS · Torre Branca (Не Pineta Via Messina 38)',
    faqHeading: 'Частые Вопросы · Cena Spettacolo Partenopea JustMe Милан',
    venueCta: 'Открыть Профиль JustMe Milano',
    thanksgivingTitle: 'Идете и в Четверг 26? Смотрите Thanksgiving в JustMe',
    thanksgivingCta: 'Смотреть 26 Ноя',
    dec31Title: 'Планируете Новый Год 31 Декабря в JustMe Milano?',
    dec31Cta: 'Смотреть 31 Дек НГ',
    orthodoxTitle: 'Ищете Старый Новый Год 13 Января в JustMe Milano?',
    orthodoxCta: 'Смотреть 13 Янв',
    heroLabels: [
      'Прибытие гостей к подсвеченной башне Torre Branca у JustMe Milano',
      'Отапливаемый стеклянный зал для неаполитанского ужина за 70€ в 21:30',
      'Живое выступление John Vaccaro между праздничными столами в JustMe',
      'VIP ложи Privé и танцпол пятницы с DJ Franky Dee до 05:00 утра',
    ],
    nativeFaqs: [
      {
        q: 'Что включено в полное меню за 70€ в пятницу 27 ноября?',
        a: 'Включены общие закуски (пармиджана из баклажанов, моцарелла ди буфала, осьминожки алла Лучана, мясные шарики по-домашнему), Mezzi Paccheri al ragù napoletano, лимонный сорбет, вода, вино заведения, кофе и весь клубный вечер с 23:00.',
      },
      {
        q: 'Вечеринка с Pineta Napoli проходит в JustMe Milano или в Pineta на Via Messina?',
        a: 'Только в JustMe Milano (Viale Luigi Camoens 2 у Torre Branca). Pineta Napoli выступает приглашенным партнером из Неаполя и не связана с адресом Pineta Club на Via Messina 38.',
      },
      {
        q: 'Почему вход Club в пятницу стоит 20€, а не 15€?',
        a: 'По официальному тарифу пятницы Xceed #249217 билет Club + 1 Drink с 22:30 стоит 20€, Аперитив 19:30–21:30 стоит 15€, а столы Dehor (320€) требуют входа строго до 23:00.',
      },
    ],
  },
  tr: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Kas · 70€',
    metaDescription: `27 Kasım Cuma JustMe Milano: Pineta Napoli iş birliğiyle Cena Spettacolo Partenopea, 70€ Menü, Parti 23:00 (20€). Bilgi ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea JustMe Milano’da (Pineta Napoli)',
    subtitle: '27 Kasım 2026 Cuma · 19:30 Kapı & Aperitivo · 21:30 Canlı Dinner Show · 23:00 Parti 05:00’e kadar · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Pineta Napoli İş Birliğiyle · Canlı Dinner Show & Parti · Torre Branca',
    dateBadge: 'Cuma, 27 Kasım 2026 · 19:30 / 05:00',
    priceBadge: 'Menü 70€ · Aperitivo 15€ · Kulüp 20€ · Masalar 320€–5.000€',
    ageDressBadge: '21+ · Şık Kıyafet (erkekler uzun pantolon zorunlu)',
    leadIntro: 'Napoli’yi fethettikten sonra ünlü CSP · Cena Spettacolo Partenopea, 27 Kasım 2026 Cuma akşamı Pineta Napoli resmi iş birliğiyle Parco Sempione’deki Torre Branca altında yer alan JustMe Milano’ya geliyor.',
    extraNativeParagraph: 'Kapılar saat 19:30’da 15€ Aperitivo ve akşam yemeği kabulüyle açılır; 21:30’da Voice John Vaccaro yönetiminde 70€ eksiksiz Napoli menülü Dinner Show başlar, 23:00’ten 05:00’e kadar ise DJ Franky Dee ve DJ Antonio Marigliano sahneyi devralır.',
    homeLabel: 'Ana Sayfa',
    eventsLabel: 'Milano Etkinlikleri',
    specialLabel: 'Özel Geceler',
    ctaBuyNowLabel: 'Online Satın Al (15€ – 1.280€)',
    ctaXceedLabel: 'Resmi Xceed #249217 Kanalı',
    ctaWhatsappLabel: '7/24 Yemek & VIP Concierge',
    ctaShuttleLabel: 'Ücretsiz Otopark Servisi',
    tocTitle: 'Etkinlik Rehberi · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Genel Bakış, Pineta Napoli Ortaklığı & 27 Kasım Programı',
      '2. 70€ Menü, 20€ Kulüp & Masa Online Ödeme',
      '3. Eksiksiz 70€ Napoli Menüsü & Sanatçı Kadrosu',
      '4. Tüm 8 Resmi Tarife & VIP Masalar (15€–5.000€)',
      '5. 21+ Kurallar, Kıyafet Politikası & Ücretsiz Shuttle',
      '6. %100 Ön Ödeme ve Anında Rezervasyon Onayı',
      '7. Sıkça Sorulan Sorular (12 FAQ)',
    ],
    quickLabels: ['Tarih & Saat', 'Mekan (Via Messina Değil)', '70€ Menü & Kadro', 'Yaş & Kıyafet', 'Onaylı Fiyatlar', 'Ücretsiz Servis'],
    overviewHeading: 'Genel Bakış · Ünlü Napoli Dinner Show Milano’da',
    timelineHeading: 'Gece Programı · 27 Kasım 2026 Cuma',
    timelineSubheading: '19:30 açılıştan 21:30 Dinner Show’a ve 05:00 kulüp kapanışına kadar kesintisiz program',
    timelineTitles: [
      '19:30 · Kapı Açılışı, 15€ Aperitivo + 1 İçecek & Yemek Karşılama',
      '21:30 · CSP Dinner Show Başlangıcı · John Vaccaro Canlı & 70€ Menü',
      '22:30 · Cuma Kulüp + 1 İçecek Girişi Açılışı (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Sınırı',
      '00:30–05:00 · VIP Privé Şişe Servisi ve Ana Dans Pisti',
    ],
    dinnerHeading: 'Eksiksiz 70€ Napoli Menüsü · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Paylaşımlı başlangıçlar, Mezzi Paccheri al ragù napoletano, Amalfi limon sorbesi, su, ev şarabı, kahve ve parti girişi dahil',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Menü + Parti',
    tablesCardTitle: 'JustMe Milano Cuma Partisi & VIP Masalar (320€–5.000€)',
    tiersHeading: 'Tüm 8 Onaylı Tarife · 70€ Yemek & Xceed #249217',
    tiersSubheading: '70€ yemek menüsü, 15€ aperitivo, 20€ kulüp ve 320€–1.280€ masaları EUR olarak hemen alın',
    dressShuttleHeading: '21+ Giriş Politikası, Uzun Pantolon Kuralı & Ücretsiz Servis',
    dressShuttleSubheading: 'Viale Luigi Camoens 2 girişinde 21 yaş üstü kimlik ve erkeklerde uzun pantolon zorunludur',
    dressOkTitle: 'Önerilen Kıyafet (Kabul Edilir)',
    dressNoTitle: 'Kapıda Kabul Edilmeyenler (21+)',
    shuttleHighlightTitle: 'Anlaşmalı Otoparktan Ücretsiz Gidiş-Dönüş Shuttle',
    logisticsHeading: 'JustMe Milano Ulaşım · Metro, Taksi ve Shuttle',
    mapHeading: 'GPS Harita · Torre Branca (Via Messina 38 Değil)',
    faqHeading: 'Sıkça Sorulan Sorular · Cena Spettacolo Partenopea',
    venueCta: 'JustMe Milano Mekan Rehberi',
    thanksgivingTitle: '26 Kasım Perşembe de Buradasınız? Thanksgiving JustMe',
    thanksgivingCta: '26 Kas Thanksgiving',
    dec31Title: '31 Aralık Yılbaşı Galası İçin JustMe Milano’yu Görün',
    dec31Cta: '31 Ara Yılbaşı',
    orthodoxTitle: '13 Ocak Ortodoks Yılbaşı Gecesi İçin Tıklayın',
    orthodoxCta: '13 Oca JustMe',
    heroLabels: [
      'Torre Branca altında JustMe Milano girişine varan akşam konukları',
      'Saat 21:30’da 70€ Napoli akşam yemeğine ev sahipliği yapan ısıtmalı cam salon',
      'Masalar arasında John Vaccaro ile canlı İtalyan Dinner Show performansı',
      'Cuma gecesi 05:00’e kadar VIP Privé masalar ve DJ Franky Dee sahnesi',
    ],
    nativeFaqs: [
      {
        q: '27 Kasım 70€ Cena Spettacolo Partenopea menüsüne neler dahildir?',
        a: 'Paylaşımlı mezeler (patlıcan parmigiana, manda mozzarellası, Luciana usulü ahtapot, ev köftesi), Mezzi Paccheri al ragù napoletano, Amalfi limon sorbesi, su, ev şarabı, kahve ve 23:00 parti katılımı dahildir.',
      },
      {
        q: 'Etkinlik JustMe Milano’da mı yoksa Via Messina Pineta Club’da mı?',
        a: 'Yalnızca JustMe Milano’da (Viale Luigi Camoens 2, Torre Branca). Pineta Napoli sadece konuk ortaktır; Via Messina 38 adresindeki Pineta Club Milano tamamen ayrı bir kulüptür.',
      },
      {
        q: 'Cuma kulüp girişi neden 20€ ve Dehor masa kuralı nedir?',
        a: 'Cuma 27 Kasım resmi Xceed #249217 tarifesinde 22:30 sonrası Club + 1 Drink 20€, Aperitivo 15€’dur; 320€ Dehor masası için en geç 23:00’te giriş şarttır.',
      },
    ],
  },
  zh: {
    metaTitle: 'JustMe 米兰 11月27日 那不勒斯 歌舞 晚宴 70€ | Pineta Napoli',
    metaDescription: `11月27日 周五 JustMe 米兰：Pineta Napoli 联合 那不勒斯 歌舞 晚宴 70€，派对 20€。在线 购票 及 卡座 咨询 ${PHONE}。`,
    h1: 'CSP · Cena Spettacolo Partenopea JustMe 米兰 (Pineta Napoli)',
    subtitle: '2026年11月27日 周五 · 19:30 开门 与 餐前酒 · 21:30 现场 歌舞 晚宴 · 23:00 派对 至 05:00 · John Vaccaro、DJ Franky Dee 与 Antonio Marigliano',
    themeTag: 'Pineta Napoli 联合 呈献 · 现场 Dinner Show & 派对 · Torre Branca',
    dateBadge: '2026年11月27日 周五 · 19:30 / 05:00',
    priceBadge: '全套 晚宴 70€ · 餐前酒 15€ · 夜店 20€ · 卡座 320€–5.000€',
    ageDressBadge: '21+ 严格 门禁 · 优雅 正装 (男士 必须 穿 长裤)',
    leadIntro: '风靡 那不勒斯 的 传奇 晚宴 秀场 CSP · Cena Spettacolo Partenopea 于 2026 年 11 月 27 日 周五 正式 登陆 米兰 JustMe Milano，在 Torre Branca 铁塔 下 的 恒温 玻璃 大厅 携手 Pineta Napoli 联袂 呈现。',
    extraNativeParagraph: '19:30 起 开放 15€ 餐前酒 入场 与 餐厅 迎宾，21:30 准时 引爆 由 主唱 John Vaccaro 领衔 的 70€ 四道式 那不勒斯 现场 歌舞 晚宴，23:00 起 由 DJ Franky Dee 与 DJ Antonio Marigliano 接棒 派对 狂欢 至 凌晨 05:00。',
    homeLabel: '首页',
    eventsLabel: '米兰 活动',
    specialLabel: '特别 专场',
    ctaBuyNowLabel: '网站 直购 欧元 结账 (15€ – 1.280€)',
    ctaXceedLabel: '官方 Xceed #249217 通道',
    ctaWhatsappLabel: '24/7 晚宴 与 VIP 礼宾',
    ctaShuttleLabel: '免费 停车场 接驳 巴士',
    tocTitle: '完整 指南 · JustMe 米兰 那不勒斯 歌舞 晚宴 11月27日',
    tocLabels: [
      '1. 活动 总览、Pineta Napoli 合作 与 流程',
      '2. 在线 欧元 直购 (70€ 晚宴、20€ 夜店、卡座)',
      '3. 70€ 正宗 那不勒斯 全套 菜单 与 艺人 阵容',
      '4. 全场 8 档 官方 确认 价格 表 (15€–5.000€)',
      '5. 21+ 着装 规定、免费 接驳车 与 地图',
      '6. 100% 预付 条款 与 电子 凭证 确认',
      '7. 常见 问题 解答 (12 条 FAQ)',
    ],
    quickLabels: ['日期 与 时段', '精准 地址 (非 Via Messina)', '70€ 菜单 与 阵容', '年龄 与 着装', '确认 票价 表', '免费 接驳 班车'],
    overviewHeading: '活动 亮点 · 那不勒斯 现象级 Dinner Show 首登 米兰',
    timelineHeading: '周五 2026年11月27日 全场 时间轴',
    timelineSubheading: '从 19:30 开门 餐前酒 与 21:30 歌舞 晚宴 直至 次日 05:00',
    timelineTitles: [
      '19:30 · 大门 开启 · 15€ 餐前酒 + 1 饮品 及 晚宴 坐席 签到',
      '21:30 · CSP Dinner Show 现场 启幕 · John Vaccaro 献唱 与 70€ 菜单',
      '22:30 · 周五 夜场 Club + 1 Drink 门票 (20€) 检票 开放',
      '23:00 · 派对 正式 开场 · DJ Franky Dee 与 Antonio Marigliano · Dehor 截止 线',
      '00:30–05:00 · VIP Privé 香槟 卡座 与 主舞池 全夜 狂欢',
    ],
    dinnerHeading: '70€ 那不勒斯 官方 菜单 · John Vaccaro 与 Pineta Napoli',
    dinnerSubheading: '经典 共享 前菜 四小盘、正宗 Mezzi Paccheri 那不勒斯 肉酱 面、阿马尔菲 柠檬 雪葩、水、自酿 酒水、咖啡 及 派对 通玩',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ 全套 晚宴 + 派对',
    tablesCardTitle: 'JustMe Milano 周五 派对 与 VIP 卡座 (320€–5.000€)',
    tiersHeading: '全部 8 档 官方 价格 · 70€ 晚宴 与 Xceed #249217',
    tiersSubheading: '支持 在线 欧元 直买 70€ 晚宴、15€ 餐前酒、20€ 夜店 票 及 320€–1.280€ 卡座，3.200€–5.000€ 席位 欢迎 联系 WhatsApp',
    dressShuttleHeading: '21+ 门禁 筛选、正装 长裤 要求 与 免费 接驳 巴士',
    dressShuttleSubheading: 'Viale Luigi Camoens 2 入口 严格 核验 21+ 证件 及 男士 整洁 长裤',
    dressOkTitle: '推荐 穿搭 (允许 入场)',
    dressNoTitle: '禁止 入内 项 (21+)',
    shuttleHighlightTitle: '合作 停车场 配备 免费 往返 接驳 巴士',
    logisticsHeading: '如何 前往 JustMe Milano · 地铁、出租 与 班车',
    mapHeading: 'GPS 定位 · Torre Branca (非 Via Messina 38)',
    faqHeading: '常见 问题 · Cena Spettacolo Partenopea JustMe 米兰',
    venueCta: '查看 JustMe Milano 完整 档案',
    thanksgivingTitle: '11月26日 周四 也来？查看 JustMe 感恩节 专场',
    thanksgivingCta: '查看 11月26日 感恩节',
    dec31Title: '预订 12月31日 JustMe 米兰 跨年 晚宴？',
    dec31Cta: '查看 12月31日 跨年',
    orthodoxTitle: '关注 2027年1月13日 JustMe 东正教 新年？',
    orthodoxCta: '查看 1月13日 东正教 新年',
    heroLabels: [
      '宾客 晚间 抵达 Torre Branca 铁塔 下 的 JustMe Milano 入口',
      '21:30 JustMe 恒温 玻璃 厅 内 70€ 那不勒斯 歌舞 晚宴 美食',
      '主唱 John Vaccaro 在 烛光 餐桌 间 献唱 互动 Dinner Show 现场',
      'DJ Franky Dee 与 VIP 卡座 引爆 至 凌晨 05:00 的 周五 派对',
    ],
    nativeFaqs: [
      {
        q: '11月27日 70€ 那不勒斯 歌舞 晚宴 菜单 包含 哪些 菜品 与 权益？',
        a: '包含 4 款 共享 前菜 (千层茄子 Parmigiana、水牛 莫扎里拉 芝士、Luciana 小章鱼、传统 肉丸)、主菜 Mezzi Paccheri 那不勒斯 慢炖 肉酱 面、阿马尔菲 柠檬 雪葩、矿泉水、精选 佐餐 葡萄酒、意式 浓缩 咖啡，以及 23:00 派对 全程 留场 资格。',
      },
      {
        q: '本场 活动 是在 JustMe Milano 举办 还是 在 Via Messina 38 号 的 Pineta？',
        a: '仅在 JustMe Milano (Viale Luigi Camoens 2，Parco Sempione 公园 Torre Branca 铁塔 下) 举办。Pineta Napoli 是 来自 那不勒斯 的 特邀 合作 品牌，与 Via Messina 38 号 的 米兰 Pineta Club 无任何 场地 关联。',
      },
      {
        q: '为什么 周五 夜店 Club + 1 Drink 门票 为 20€ 而非 周四 的 15€？',
        a: '根据 Xceed #249217 周五 官方 确认 价目表，22:30 起 入场 的 Club + 1 Drink 为 20€，19:30–21:30 餐前酒 保持 15€，320€ Dehor 卡座 须在 23:00 前 抵达 核验。',
      },
    ],
  },
  ar: {
    metaTitle: 'عشاء عرض بارتينوبيا جاست مي ميلانو | 27 نوفمبر · 70€',
    metaDescription: `الجمعة 27 نوفمبر 2026 في JustMe ميلانو: Cena Spettacolo Partenopea مع Pineta Napoli، قائمة 70€، حفلة 23:00 (20€). للحجز ${PHONE}.`,
    h1: 'CSP · عشاء وعرض بارتينوبيا في JustMe ميلانو (Pineta Napoli)',
    subtitle: 'الجمعة 27 نوفمبر 2026 · 19:30 افتتاح · 21:30 عشاء وعرض موسيقي حي · 23:00 حفلة حتى 05:00 · John Vaccaro و DJ Franky Dee و Antonio Marigliano',
    themeTag: 'بالتعاون مع Pineta Napoli · عشاء وعرض حي وحفلة · توري برانكا',
    dateBadge: 'الجمعة 27 نوفمبر 2026 · 19:30 / 05:00',
    priceBadge: 'قائمة 70€ · أبيريتيفو 15€ · نادي 20€ · طاولات 320€–5.000€',
    ageDressBadge: '21+ · ملابس أنيقة (بنطال طويل إلزامي للرجال)',
    leadIntro: 'بعد نجاحها الكبير في نابولي، تصل أمسية CSP · Cena Spettacolo Partenopea الشهيرة إلى JustMe Milano أسفل برج توري برانكا يوم الجمعة 27 نوفمبر 2026 بالتعاون الرسمي مع Pineta Napoli.',
    extraNativeParagraph: 'تُفتح الأبواب الساعة 19:30 لتذكرة الأبيريتيفو 15€ واستقبال طاولات العشاء، ويبدأ العرض الغنائي المباشر مع Voice John Vaccaro وقائمة نابولي الكاملة 70€ في 21:30، ثم تتواصل السهرة من 23:00 حتى 05:00 مع DJ Franky Dee و DJ Antonio Marigliano.',
    homeLabel: 'الرئيسية',
    eventsLabel: 'فعاليات ميلانو',
    specialLabel: 'ليالي خاصة',
    ctaBuyNowLabel: 'احجز الآن عبر الموقع (15€ – 1.280€)',
    ctaXceedLabel: 'القناة الرسمية Xceed #249217',
    ctaWhatsappLabel: 'كونسيرج العشاء و VIP 24/7',
    ctaShuttleLabel: 'موقف سيارات مع نقل مجاني',
    tocTitle: 'دليل الأمسية · عشاء بارتينوبيا جاست مي ميلانو',
    tocLabels: [
      '1. نظرة عامة، شراكة Pineta Napoli وجدول 27 نوفمبر',
      '2. الشراء المباشر باليورو لقائمة 70€ ودخول 20€ والطاولات',
      '3. قائمة الطعام النابولية الكاملة 70€ والنجوم المشاركون',
      '4. جميع الأسعار الثمانية المؤكدة وطاولات VIP (15€–5.000€)',
      '5. شروط العمر 21+ واللباس وخدمة النقل المجانية',
      '6. الدفع المسبق 100% والتأكيد الفوري',
      '7. الأسئلة الشائعة (12 سؤالاً)',
    ],
    quickLabels: ['التاريخ والأوقات', 'الموقع الصحيح (ليس Via Messina)', 'قائمة 70€ والنجوم', 'العمر واللباس', 'الأسعار المؤكدة', 'النقل المجاني'],
    overviewHeading: 'نظرة عامة · ليلة نابولي الغنائية تصل إلى JustMe Milano',
    timelineHeading: 'برنامج الأمسية الكامل · الجمعة 27 نوفمبر 2026',
    timelineSubheading: 'من الافتتاح 19:30 وعرض العشاء 21:30 حتى ختام الحفلة في 05:00 صباحاً',
    timelineTitles: [
      '19:30 · فتح الأبواب وتذكرة الأبيريتيفو (15€) واستقبال العشاء',
      '21:30 · انطلاق CSP Dinner Show · غناء مباشر مع John Vaccaro وقائمة 70€',
      '22:30 · فتح دخول السهرة النادي مع مشروب (20€)',
      '23:00 · بدء الحفلة مع DJ Franky Dee و Antonio Marigliano وحد طاولات Dehor',
      '00:30–05:00 · خدمة طاولات VIP Privé وحلبة الرقص الرئيسية',
    ],
    dinnerHeading: 'القائمة النابولية الكاملة (70€) · John Vaccaro و Pineta Napoli',
    dinnerSubheading: 'مقبلات للمشاركة، باستا Mezzi Paccheri بالراغو النابولي، سوربيه ليمون أمالفي، مياه، نبيذ المنزل، قهوة ودخول الحفلة مشمول',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · قائمة 70€ + حفلة',
    tablesCardTitle: 'حفلة الجمعة وطاولات VIP في JustMe Milano (320€–5.000€)',
    tiersHeading: 'جميع الأسعار الـ 8 المعتمدة · عشاء 70€ و Xceed #249217',
    tiersSubheading: 'احجز قائمة 70€ وأبيريتيفو 15€ ودخول 20€ وطاولات 320€–1.280€ مباشرة باليورو أو تواصل لخدمة VIP Front و DJ على واتساب',
    dressShuttleHeading: 'سياسة 21+ وقواعد اللباس والنقل المجاني من الموقف',
    dressShuttleSubheading: 'إبراز هوية أصلية لمن هم فوق 21 عاماً وارتداء بنطال طويل للرجال إلزامي',
    dressOkTitle: 'الإطلالة الموصى بها (مقبولة)',
    dressNoTitle: 'غير مسموح عند الباب (21+)',
    shuttleHighlightTitle: 'موقف سيارات متعاقد مع خدمة شاتل مجانية ذهاباً وإياباً',
    logisticsHeading: 'الوصول إلى JustMe Milano · المترو والتاكسي والنقل',
    mapHeading: 'الخريطة والموقع · توري برانكا (وليس Via Messina 38)',
    faqHeading: 'الأسئلة الشائعة · عشاء بارتينوبيا جاست مي ميلانو',
    venueCta: 'استكشف ملف JustMe Milano الكامل',
    thanksgivingTitle: 'هل تحضر الخميس 26 أيضاً؟ شاهد عيد الشكر في JustMe',
    thanksgivingCta: 'شاهد 26 نوفمبر',
    dec31Title: 'هل تبحث عن سهرة رأس السنة 31 ديسمبر في JustMe؟',
    dec31Cta: 'شاهد 31 ديسمبر',
    orthodoxTitle: 'سهرة 13 يناير رأس السنة الأرثوذكسية في JustMe',
    orthodoxCta: 'شاهد 13 يناير',
    heroLabels: [
      'وصول الضيوف ليلاً أسفل برج توري برانكا أمام JustMe Milano',
      'القاعة الزجاجية المدفأة لعشاء بارتينوبيا الساعة 21:30 بسعر 70€',
      'عرض غنائي مباشر يقدمه John Vaccaro بين طاولات العشاء',
      'طاولات VIP Privé وحلبة الرقص حتى 05:00 مع DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'ماذا تشمل قائمة العشاء بسعر 70€ يوم الجمعة 27 نوفمبر؟',
        a: 'تشمل مقبلات نابولية للمشاركة (بارميجانا الباذنجان، جبنة موزاريلا الجاموس، أخطبوط لوتشانا، كرات اللحم بصلصة الجدة)، وطبق Mezzi Paccheri بالراغو النابولي، وسوربيه ليمون أمالفي، مع المياه ونبيذ المنزل والقهوة والبقاء لحفلة 23:00.',
      },
      {
        q: 'هل يُقام الحدث في JustMe Milano أم في Pineta Club شارع Via Messina؟',
        a: 'يُقام حصرياً في JustMe Milano (Viale Luigi Camoens 2 في باركو سيمبيوني). Pineta Napoli شريك ضيف من نابولي، بينما نادي Pineta Milano في Via Messina 38 مكان مختلف تماماً.',
      },
      {
        q: 'لماذا تبلغ تذكرة النادي يوم الجمعة 20€ وما هو آخر موعد لطاولات Dehor؟',
        a: 'في تسعيرة الجمعة الرسمية #249217 تبلغ تذكرة Club + 1 Drink من الساعة 22:30 مبلغ 20€، والأبيريتيفو 15€، ويجب دخول طاولات Dehor (320€) قبل الساعة 23:00 تماماً.',
      },
    ],
  },
  bg: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Милано | 27 Ное · 70€',
    metaDescription: `Петък 27 ное 2026 в JustMe Милано: Cena Spettacolo Partenopea с Pineta Napoli, меню 70€, Party 23:00 (20€). Инфо ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea в JustMe Milano (Pineta Napoli)',
    subtitle: 'Петък, 27 ноември 2026 · 19:30 Вход и Аперитив · 21:30 Вечеря-Шоу · 23:00 Парти до 05:00 · John Vaccaro, DJ Franky Dee и Antonio Marigliano',
    themeTag: 'Съвместно с Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Петък, 27 Ное 2026 · 19:30 / 05:00',
    priceBadge: 'Меню 70€ · Аперитив 15€ · Клуб 20€ · Маси 320€–5.000€',
    ageDressBadge: '21+ · Елегантно (дълъг панталон задължителен за мъже)',
    leadIntro: 'След триумфа в Неапол, прочутото шоу CSP · Cena Spettacolo Partenopea пристига в JustMe Milano под Торе Бранка в петък, 27 ноември 2026, в партньорство с Pineta Napoli.',
    extraNativeParagraph: 'Вратите отварят в 19:30 за 15€ Аперитив и посрещане за вечеря; в 21:30 започва неаполитанското вечеря-шоу за 70€ с гласа на John Vaccaro, а от 23:00 до 05:00 пултът е на DJ Franky Dee и DJ Antonio Marigliano.',
    homeLabel: 'Начало',
    eventsLabel: 'Събития Милано',
    specialLabel: 'Специални Вечери',
    ctaBuyNowLabel: 'Купи Онлайн (15€ – 1.280€)',
    ctaXceedLabel: 'Официален Xceed #249217',
    ctaWhatsappLabel: '24/7 Вечеря & VIP Консиерж',
    ctaShuttleLabel: 'Безплатен Паркинг Шатъл',
    tocTitle: 'Пътеводител · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Преглед, Pineta Napoli Партньорство и Програма',
      '2. Онлайн Покупка Меню 70€, Клуб 20€ и Маси',
      '3. Пълно Неаполитанско Меню (70€) и Артисти',
      '4. Всички 8 Официални Цени (15€–5.000€)',
      '5. Дрескод 21+, Безплатен Шатъл и Карта',
      '6. Условия 100% Предплащане и Потвърждение',
      '7. Често Задавани Въпроси (12 FAQ)',
    ],
    quickLabels: ['Дата и Часове', 'Точен Клуб (Не Via Messina)', 'Меню 70€ и Гости', 'Възраст и Дрескод', 'Цени и Маси', 'Безплатен Шатъл'],
    overviewHeading: 'Преглед · Неаполитанско Вечеря-Шоу в JustMe Milano',
    timelineHeading: 'Вечерна Програма · Петък 27 Ноември 2026',
    timelineSubheading: 'От аперитива в 19:30 през 21:30 Dinner Show до 05:00 сутринта',
    timelineTitles: [
      '19:30 · Отваряне, Аперитив (15€) и Настаняване за Вечеря',
      '21:30 · Старт CSP Dinner Show · John Vaccaro на Живо & Меню 70€',
      '22:30 · Отваряне Клубен Вход Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Краен Час',
      '00:30–05:00 · VIP Маси Privé и Главна Дансинг Сцена',
    ],
    dinnerHeading: 'Неаполитанско Меню (70€) · John Vaccaro и Pineta Napoli',
    dinnerSubheading: 'Предястия за споделяне, Mezzi Paccheri al ragù napoletano, сорбе от Амалфи, вода, вино, кафе и оставане за партито',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Меню 70€',
    tablesCardTitle: 'Петъчно Парти и VIP Маси JustMe (320€–5.000€)',
    tiersHeading: 'Всички 8 Тарифи · Вечеря 70€ и Xceed #249217',
    tiersSubheading: 'Резервирайте 70€ вечеря, 15€ аперитив, 20€ клуб и маси до 1.280€ директно в сайта',
    dressShuttleHeading: 'Правила 21+, Дълги Панталони и Безплатен Шатъл',
    dressShuttleSubheading: 'Оригинална лична карта 21+ и елегантен дрес код на Viale Luigi Camoens 2',
    dressOkTitle: 'Препоръчително Облекло (Допускат се)',
    dressNoTitle: 'Забранено на Входа (21+)',
    shuttleHighlightTitle: 'Партньорски Паркинг с Безплатен Трансфер до Входа',
    logisticsHeading: 'Как да Стигнете до JustMe Milano · Метро, Такси и Шатъл',
    mapHeading: 'GPS Карта · Torre Branca (Не Via Messina 38)',
    faqHeading: 'Често Задавани Въпроси · Cena Spettacolo Partenopea',
    venueCta: 'Виж Профила на JustMe Milano',
    thanksgivingTitle: 'Идвате ли и в Четвъртък 26? Вижте Thanksgiving JustMe',
    thanksgivingCta: 'Виж 26 Ное',
    dec31Title: 'Нова Година 31 Декември в JustMe Milano?',
    dec31Cta: 'Виж 31 Дек',
    orthodoxTitle: 'Стара Нова Година 13 Януари в JustMe?',
    orthodoxCta: 'Виж 13 Яну',
    heroLabels: [
      'Пристигане на гости под осветената кула Torre Branca пред JustMe',
      'Отопляемата стъклена зала по време на неаполитанската вечеря в 21:30',
      'Живо вокално шоу на John Vaccaro сред празничните маси',
      'VIP сепарета и дансинг в петък с DJ Franky Dee до 05:00 часа',
    ],
    nativeFaqs: [
      {
        q: 'Какво включва менюто от 70€ на 27 ноември?',
        a: 'Включва общи предястия (патладжани пармиджана, биволска моцарела, октоподчета алла Лучана, кюфтенца по неаполитански), Mezzi Paccheri al ragù napoletano, лимоново сорбе, вода, домашно вино, кафе и оставане за партито.',
      },
      {
        q: 'Събитието в JustMe Milano ли е или в Pineta на Via Messina?',
        a: 'Изцяло в JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli е гост-партньор от Неапол; миланският Pineta Club на Via Messina 38 е отделен клуб.',
      },
      {
        q: 'Защо входът Club в петък е 20€ и до кога важи маса Dehor?',
        a: 'По тарифа Xceed #249217 за петък входът след 22:30 е 20€, Аперитивът е 15€, а резервациите за Dehor (320€) изискват влизане най-късно до 23:00.',
      },
    ],
  },
  hr: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Stu · 70€',
    metaDescription: `Petak 27. stu 2026. u JustMe Milano: Cena Spettacolo Partenopea uz Pineta Napoli, meni 70€, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea u JustMe Milano (Pineta Napoli)',
    subtitle: 'Petak, 27. studenoga 2026. · 19:30 Aperitiv i Ulaz · 21:30 Dinner Show · 23:00 Party do 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'U suradnji s Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Petak, 27. Stu 2026 · 19:30 / 05:00',
    priceBadge: 'Meni 70€ · Aperitiv 15€ · Club 20€ · Stolovi 320€–5.000€',
    ageDressBadge: '21+ · Elegantno (duge hlače obavezne za muškarce)',
    leadIntro: 'Nakon osvajanja Napulja, slavna CSP · Cena Spettacolo Partenopea stiže u JustMe Milano pod osvijetljenim tornjem Torre Branca u petak, 27. studenoga 2026., u suradnji s Pineta Napoli.',
    extraNativeParagraph: 'Vrata se otvaraju u 19:30 uz Aperitiv od 15€ i prijem večere; u 21:30 kreće Dinner Show uživo uz Voice John Vaccaro i napuljski meni od 70€, a od 23:00 do 05:00 DJ Franky Dee i Antonio Marigliano preuzimaju podij.',
    homeLabel: 'Početna',
    eventsLabel: 'Događaji Milano',
    specialLabel: 'Posebne Večeri',
    ctaBuyNowLabel: 'Kupi Online (15€ – 1.280€)',
    ctaXceedLabel: 'Službeni Xceed #249217',
    ctaWhatsappLabel: '24/7 Večera & VIP Concierge',
    ctaShuttleLabel: 'Besplatan Parking Shuttle',
    tocTitle: 'Vodič Kroz Večer · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Pregled, Partnerstvo Pineta Napoli & Raspored',
      '2. Online Kupnja (70€ Meni, 20€ Club, VIP Stolovi)',
      '3. Kompletan Napuljski Meni (70€) & Izvođači',
      '4. Svih 8 Potvrđenih Cijena (15€–5.000€)',
      '5. Dress Code 21+, Besplatan Shuttle & Karta',
      '6. 100% Predujam & Trenutačna Potvrda',
      '7. Česta Pitanja (12 FAQ)',
    ],
    quickLabels: ['Datum & Satnica', 'Točna Lokacija (Ne Via Messina)', '70€ Meni & Gosti', 'Dob & Dress Code', 'Potvrđene Cijene', 'Besplatan Shuttle'],
    overviewHeading: 'Pregled · Napuljski Dinner Show Stiže u JustMe Milano',
    timelineHeading: 'Satnica Večeri · Petak 27. Studenoga 2026.',
    timelineSubheading: 'Od 19:30 aperitiva preko 21:30 večere s glazbom uživo do 05:00 ujutro',
    timelineTitles: [
      '19:30 · Otvaranje, 15€ Aperitiv + 1 Piće & Prijem za Večeru',
      '21:30 · Početak CSP Dinner Show · John Vaccaro Uživo & 70€ Meni',
      '22:30 · Ulaz za Petak Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Granica',
      '00:30–05:00 · VIP Privé Stolovi i Glavni Plesni Podij',
    ],
    dinnerHeading: 'Napuljski Meni (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Predjela za dijeljenje, Mezzi Paccheri al ragù napoletano, Amalfi limun sorbet, voda, kućno vino, kava i ostanak na partyju',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Meni 70€ + Party',
    tablesCardTitle: 'JustMe Milano Petak Party & VIP Stolovi (320€–5.000€)',
    tiersHeading: 'Svih 8 Službenih Cijena · Večera 70€ & Xceed #249217',
    tiersSubheading: 'Kupite 70€ meni, 15€ aperitiv, 20€ club ulaznicu i stolove 320€–1.280€ izravno u EUR na stranici',
    dressShuttleHeading: 'Politika Ulaza 21+, Duge Hlače & Besplatan Shuttle',
    dressShuttleSubheading: 'Stroga 21+ provjera dokumenta i svečana odjeća na ulazu Viale Luigi Camoens 2',
    dressOkTitle: 'Preporučena Odjeća (Dozvoljeno)',
    dressNoTitle: 'Zabranjeno na Ulazu (21+)',
    shuttleHighlightTitle: 'Partnerski Parking s Besplatnim Prijevozom do Kluba',
    logisticsHeading: 'Dolazak u JustMe Milano · Metro, Taxi i Shuttle',
    mapHeading: 'GPS Karta · Torre Branca (Nije Via Messina 38)',
    faqHeading: 'Česta Pitanja · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Otvori Profil JustMe Milano',
    thanksgivingTitle: 'Dolazite i u Četvrtak 26.? Pogledajte Thanksgiving JustMe',
    thanksgivingCta: 'Vidi 26 Stu',
    dec31Title: 'Planirate Doček 31. Prosinca u JustMe Milano?',
    dec31Cta: 'Vidi 31 Pro',
    orthodoxTitle: 'Slavite i 13. Siječnja Pravoslavnu Novu Godinu?',
    orthodoxCta: 'Vidi 13 Sij',
    heroLabels: [
      'Dolazak gostiju pod osvijetljenim tornjem Torre Branca u JustMe Milano',
      'Grijana staklena dvorana s napuljskom večerom od 70€ u 21:30',
      'Vokalni nastup uživo John Vaccara među stolovima tijekom večere',
      'VIP separei i plesni podij s DJ Franky Deejem do 05:00 ujutro',
    ],
    nativeFaqs: [
      {
        q: 'Što uključuje meni od 70€ u petak 27. studenoga?',
        a: 'Uključuje predjela za stol (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, sorbet od limuna, vodu, vino, kavu i ostanak na partyju od 23:00.',
      },
      {
        q: 'Održava li se večer u JustMe Milano ili u Pineta klubu u Via Messina?',
        a: 'Isključivo u JustMe Milano (Viale Luigi Camoens 2, Torre Branca). Pineta Napoli je gostujući partner iz Napulja i nema veze s adresom Pineta Club Via Messina 38.',
      },
      {
        q: 'Zašto ulaznica Club u petak stoji 20€ umjesto 15€?',
        a: 'Prema Xceed #249217 petkom od 22:30 Club + 1 Drink stoji 20€, Aperitiv je 15€, dok Dehor stol od 320€ traži ulazak najkasnije do 23:00.',
      },
    ],
  },
  cs: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milán | 27 Lis · 70€',
    metaDescription: `Pá 27. lis 2026 v JustMe Milán: Cena Spettacolo Partenopea s Pineta Napoli, menu 70€, Party 23:00 (20€). Rezervace ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea v JustMe Milano (Pineta Napoli)',
    subtitle: 'Pátek 27. listopadu 2026 · 19:30 Otevření & Aperitiv · 21:30 Dinner Show · 23:00 Party do 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Ve spolupráci s Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Pátek 27. Lis 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitiv 15€ · Club 20€ · Stoly 320€–5.000€',
    ageDressBadge: '21+ · Elegantní (dlouhé kalhoty u mužů povinné)',
    leadIntro: 'Po dobytí Neapole přichází slavná CSP · Cena Spettacolo Partenopea v pátek 27. listopadu 2026 do JustMe Milano pod věží Torre Branca v oficiální spolupráci s Pineta Napoli.',
    extraNativeParagraph: 'Brány se otevírají v 19:30 pro Aperitiv za 15€ a večeři; ve 21:30 začíná živá Dinner Show s Johnem Vaccarem a neapolským menu za 70€, na které od 23:00 do 05:00 navazují DJ Franky Dee a DJ Antonio Marigliano.',
    homeLabel: 'Domů',
    eventsLabel: 'Akce Milán',
    specialLabel: 'Speciální Akce',
    ctaBuyNowLabel: 'Koupit Online (15€ – 1.280€)',
    ctaXceedLabel: 'Oficiální Xceed #249217',
    ctaWhatsappLabel: '24/7 Večeře & VIP Concierge',
    ctaShuttleLabel: 'Parkoviště se Shuttlem Zdarma',
    tocTitle: 'Průvodce Večerem · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Přehled, Spolupráce Pineta Napoli & Harmonogram',
      '2. Online Nákup v EUR (Menu 70€, Club 20€, Stoly)',
      '3. Kompletní Neapolské Menu (70€) & Line-up',
      '4. Všech 8 Potvrzených Tarifů (15€–5.000€)',
      '5. Dress Code 21+, Bezplatný Shuttle & Mapa',
      '6. Podmínky 100% Platby Předem',
      '7. Časté Dotazy (12 FAQ)',
    ],
    quickLabels: ['Datum a Časy', 'Přesné Místo (Ne Via Messina)', '70€ Menu & Umělci', 'Věk a Dress Code', 'Ověřené Ceny', 'Shuttle Zdarma'],
    overviewHeading: 'Přehled · Slavná Neapolská Večeře se Show v Miláně',
    timelineHeading: 'Program Večera · Pátek 27. Listopadu 2026',
    timelineSubheading: 'Od 19:30 aperitivu přes 21:30 Dinner Show až do 05:00 ranního konce párty',
    timelineTitles: [
      '19:30 · Otevření, 15€ Aperitiv + 1 Drink & Uvítání u Stolů',
      '21:30 · Start CSP Dinner Show · John Vaccaro Živě & 70€ Menu',
      '22:30 · Páteční Vstup Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Limit Dehor',
      '00:30–05:00 · VIP Privé Stoly a Hlavní Taneční Parket',
    ],
    dinnerHeading: 'Neapolské Menu (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Sdílené předkrmy, Mezzi Paccheri al ragù napoletano, amalfský citronový sorbet, voda, domácí víno, káva a vstup na party',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu 70€ + Party',
    tablesCardTitle: 'JustMe Milano Páteční Party & VIP Stoly (320€–5.000€)',
    tiersHeading: 'Všech 8 Oficiálních Tarifů · Večeře 70€ & Xceed #249217',
    tiersSubheading: 'Zakupte 70€ večeři, 15€ aperitiv, 20€ club nebo stoly 320€–1.280€ přímo na webu',
    dressShuttleHeading: 'Vstup 21+, Dress Code & Bezplatná Kyvadlová Doprava',
    dressShuttleSubheading: 'Přísná kontrola věku 21+ a dlouhé kalhoty pro pány na Viale Luigi Camoens 2',
    dressOkTitle: 'Doporučené Oblečení (Povoleno)',
    dressNoTitle: 'Zakázáno u Vstupu (21+)',
    shuttleHighlightTitle: 'Partnerské Parkoviště s Kyvadlovou Dopravou Zdarma',
    logisticsHeading: 'Cesta do JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Mapa · Torre Branca (Ne Via Messina 38)',
    faqHeading: 'Časté Otázky · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Zobrazit Profil JustMe Milano',
    thanksgivingTitle: 'Přijdete i ve Čtvrtek 26.? Thanksgiving v JustMe',
    thanksgivingCta: 'Zobrazit 26 Lis',
    dec31Title: 'Silvestr 31. Prosince v JustMe Milano?',
    dec31Cta: 'Zobrazit 31 Pro',
    orthodoxTitle: 'Slavíte i 13. Ledna Pravoslavný Nový Rok?',
    orthodoxCta: 'Zobrazit 13 Led',
    heroLabels: [
      'Příchod hostů pod osvětlenou věž Torre Branca u JustMe Milano',
      'Vyhřívaný skleněný sál při neapolské večeři za 70€ ve 21:30',
      'Živá pěvecká show Johna Vaccara mezi svátečně prostřenými stoly',
      'VIP stoly a páteční párty do 05:00 s DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Co přesně obsahuje menu za 70€ na pátek 27. listopadu?',
        a: 'Obsahuje společné předkrmy (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, citronový sorbet, vodu, víno, kávu a vstup na párty od 23:00.',
      },
      {
        q: 'Koná se akce v JustMe Milano nebo v klubu Pineta na Via Messina 38?',
        a: 'Pouze v JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli je hostující partner z Neapole a akce se nekoná v milánském klubu Pineta na Via Messina.',
      },
      {
        q: 'Proč stojí páteční vstup Club 20€ a do kdy platí stoly Dehor?',
        a: 'V pátek 27. listopadu (#249217) stojí Club + 1 Drink od 22:30 přesně 20€, Aperitiv 15€ a pro 320€ stůl Dehor je nutný příchod před 23:00.',
      },
    ],
  },
  da: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Fre 27. nov 2026 i JustMe Milano: Cena Spettacolo Partenopea med Pineta Napoli, 70€ menu, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea i JustMe Milano (Pineta Napoli)',
    subtitle: 'Fredag 27. november 2026 · 19:30 Døre & Aperitivo · 21:30 Dinner Show · 23:00 Party til 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'I Samarbejde med Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Fredag 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Borde 320€–5.000€',
    ageDressBadge: '21+ · Elegant (lange bukser påkrævet for mænd)',
    leadIntro: 'Efter at have erobret Napoli kommer den berømte CSP · Cena Spettacolo Partenopea til JustMe Milano under Torre Branca fredag den 27. november 2026 i officielt samarbejde med Pineta Napoli.',
    extraNativeParagraph: 'Dørene åbner kl. 19:30 for 15€ Aperitivo og middagsgæster. Kl. 21:30 starter live Dinner Show med John Vaccaro og hele den napolitanske 70€-menu, efterfulgt fra 23:00 til 05:00 af DJ Franky Dee og Antonio Marigliano.',
    homeLabel: 'Hjem',
    eventsLabel: 'Events Milano',
    specialLabel: 'Særlige Events',
    ctaBuyNowLabel: 'Køb Online (15€ – 1.280€)',
    ctaXceedLabel: 'Officiel Xceed #249217',
    ctaWhatsappLabel: '24/7 Middag & VIP Concierge',
    ctaShuttleLabel: 'Gratis Parkerings-Shuttle',
    tocTitle: 'Eventguide · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Overblik, Pineta Napoli Samarbejde & Program',
      '2. Online Betaling i EUR (70€ Menu, 20€ Club, Borde)',
      '3. Komplet Napolitansk Menu (70€) & Artister',
      '4. Alle 8 Officielle Priser (15€–5.000€)',
      '5. Dresscode 21+, Gratis Shuttle & Kort',
      '6. 100% Forudbetaling & Øjeblikkelig Bekræftelse',
      '7. Ofte Stillede Spørgsmål (12 FAQ)',
    ],
    quickLabels: ['Dato & Tider', 'Sted (Ikke Via Messina)', '70€ Menu & Line-up', 'Alder & Dresscode', 'Priser', 'Gratis Shuttle'],
    overviewHeading: 'Overblik · Napolitansk Dinner Show Indtager JustMe Milano',
    timelineHeading: 'Aftenens Program · Fredag 27. November 2026',
    timelineSubheading: 'Fra kl. 19:30 aperitivo over 21:30 middag til klubfest indtil 05:00',
    timelineTitles: [
      '19:30 · Døre Åbner, 15€ Aperitivo & Middagsmodtagelse',
      '21:30 · Start CSP Dinner Show · John Vaccaro Live & 70€ Menu',
      '22:30 · Fredag Club + 1 Drink Indgang (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Grænse',
      '00:30–05:00 · VIP Privé Borde & Hoveddansegulv',
    ],
    dinnerHeading: 'Napolitansk 4-Retters Menu (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Deleforretter, Mezzi Paccheri al ragù napoletano, Amalfi-citronsorbet, vand, husets vin, kaffe og adgang til festen',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Menu + Party',
    tablesCardTitle: 'JustMe Milano Fredagsfest & VIP Borde (320€–5.000€)',
    tiersHeading: 'Alle 8 Officielle Priser · 70€ Middag & Xceed #249217',
    tiersSubheading: 'Book 70€ middag, 15€ aperitivo, 20€ club og borde op til 1.280€ direkte online i euro',
    dressShuttleHeading: '21+ Adgang, Lange Bukser Påkrævet & Gratis Shuttle',
    dressShuttleSubheading: 'Streng 21+ ID-kontrol og elegant festtøj ved Viale Luigi Camoens 2',
    dressOkTitle: 'Anbefalet Påklædning (Godkendt)',
    dressNoTitle: 'Afvist i Døren (21+)',
    shuttleHighlightTitle: 'Partnerparkering med Gratis Shuttle til Indgangen',
    logisticsHeading: 'Sådan Kommer du til JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Kort · Torre Branca (Ikke Via Messina 38)',
    faqHeading: 'Ofte Stillede Spørgsmål · Cena Spettacolo Partenopea',
    venueCta: 'Se JustMe Milano Profil',
    thanksgivingTitle: 'Kommer du også Torsdag 26.? Se Thanksgiving i JustMe',
    thanksgivingCta: 'Se 26 Nov',
    dec31Title: 'Nytårsaften 31. December på JustMe Milano?',
    dec31Cta: 'Se 31 Dec',
    orthodoxTitle: 'Fejrer du 13. Januar Ortodoks Nytår i JustMe?',
    orthodoxCta: 'Se 13 Jan',
    heroLabels: [
      'Gæster ankommer under oplyste Torre Branca foran JustMe Milano',
      'Opvarmet glaspavillon med den 70€ napolitanske middag kl. 21:30',
      'Live Dinner Show-vokal med John Vaccaro mellem bordene',
      'VIP-borde og fredagsparty til kl. 05:00 med DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Hvad indgår i menuen til 70€ fredag den 27. november?',
        a: 'Deleforretter (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, citronsorbet fra Amalfi, vand, husets vin, kaffe og festadgang fra 23:00.',
      },
      {
        q: 'Foregår festen på JustMe Milano eller på Pineta Club Via Messina 38?',
        a: 'Udelukkende på JustMe Milano (Viale Luigi Camoens 2, Torre Branca). Pineta Napoli er gæstepartner fra Napoli; Pineta Milano i Via Messina 38 er en helt anden klub.',
      },
      {
        q: 'Hvorfor koster Club-billet om fredagen 20€ i stedet for 15€?',
        a: 'På fredage (#249217) er Club + 1 Drink fra kl. 22:30 prissat til 20€, mens Aperitivo (19:30–21:30) koster 15€. Dehor-borde til 320€ kræver check-in før kl. 23:00.',
      },
    ],
  },
  et: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Reede 27. nov 2026 JustMe Milanos: Cena Spettacolo Partenopea & Pineta Napoli, 70€ menüü, pidu 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea JustMe Milanos (Pineta Napoli)',
    subtitle: 'Reede, 27. november 2026 · 19:30 Uksed & Aperitivo · 21:30 Dinner Show · 23:00 Pidu kuni 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Koostöös Pineta Napoliga · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Reede, 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menüü 70€ · Aperitivo 15€ · Klubi 20€ · Lauad 320€–5.000€',
    ageDressBadge: '21+ · Elegantne (meestel pikad püksid kohustuslikud)',
    leadIntro: 'Pärast Napoli vallutamist jõuab kuulus CSP · Cena Spettacolo Partenopea reedel, 27. novembril 2026 JustMe Milanosse Torre Branca jalamil, koostöös Pineta Napoliga.',
    extraNativeParagraph: 'Uksed avatakse 19:30 15€ aperitivo ja õhtusöögikülalistele. Kell 21:30 algab elava muusikaga Dinner Show (John Vaccaro) ja 70€ Napoli menüü, millele järgneb kell 23:00–05:00 pidu DJ Franky Dee ja Antonio Mariglianoga.',
    homeLabel: 'Avaleht',
    eventsLabel: 'Milano Üritused',
    specialLabel: 'Eriüritused',
    ctaBuyNowLabel: 'Osta Veebis (15€ – 1.280€)',
    ctaXceedLabel: 'Ametlik Xceed #249217',
    ctaWhatsappLabel: '24/7 Õhtusöök & VIP Concierge',
    ctaShuttleLabel: 'Tasuta Parkla Shuttle',
    tocTitle: 'Ürituse Juhend · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Ülevaade, Pineta Napoli Koostöö & Ajakava',
      '2. Online Piletid & Laudade Broneerimine (EUR)',
      '3. Täielik 70€ Napoli Menüü & Artistid',
      '4. Kõik 8 Ametlikku Hinda (15€–5.000€)',
      '5. 21+ Sissepääs, Riietus & Tasuta Shuttle',
      '6. 100% Ettemaks & Kohene Kinnitus',
      '7. Korduma Kippuvad Küsimused (12 FAQ)',
    ],
    quickLabels: ['Kuupäev & Ajad', 'Õige Asukoht (Mitte Via Messina)', '70€ Menüü & Esinejad', 'Vanus & Riietus', 'Hinnakiri', 'Tasuta Shuttle'],
    overviewHeading: 'Ülevaade · Kuulus Napoli Õhtusöök-Šõu Jõuab Milanosse',
    timelineHeading: 'Õhtu Ajakava · Reede 27. November 2026',
    timelineSubheading: 'Kella 19:30 aperitivost läbi 21:30 šõu-õhtusöögi kuni 05:00 hommikul',
    timelineTitles: [
      '19:30 · Uksed Avatud, 15€ Aperitivo + 1 Jook & Õhtusöögi Vastuvõtt',
      '21:30 · CSP Dinner Show Algus · John Vaccaro Live & 70€ Menüü',
      '22:30 · Reede Club + 1 Drink Piletite Sissepääs (20€)',
      '23:00 · Peo Algus · DJ Franky Dee & Antonio Marigliano + Dehor Piirang',
      '00:30–05:00 · VIP Privé Lauad ja Suur Tantsupõrand',
    ],
    dinnerHeading: 'Täielik 70€ Napoli Menüü · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Jagatavad eelroad, Mezzi Paccheri al ragù napoletano, Amalfi sidrunisorbett, vesi, majavein, kohv ja pääs peole',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Menüü + Pidu',
    tablesCardTitle: 'JustMe Milano Reede Pidu & VIP Lauad (320€–5.000€)',
    tiersHeading: 'Kõik 8 Kinnitatud Tariifi · 70€ Menüü & Xceed #249217',
    tiersSubheading: 'Broneeri 70€ õhtusöök, 15€ aperitivo, 20€ klubi ja 320€–1.280€ lauad kohe eurodes',
    dressShuttleHeading: '21+ Vanusepiir, Pikad Püksid & Tasuta Buss Parklast',
    dressShuttleSubheading: 'Range 21+ dokumendikontroll ja pidulik riietus aadressil Viale Luigi Camoens 2',
    dressOkTitle: 'Soovitatud Riietus (Lubatud)',
    dressNoTitle: 'Keelatud Uksel (21+)',
    shuttleHighlightTitle: 'Partnerparkla Tasuta Edasi-Tagasi Transfeeriga',
    logisticsHeading: 'Kuidas Tulla JustMe Milanosse · Metroo, Takso & Shuttle',
    mapHeading: 'GPS Kaart · Torre Branca (Mitte Via Messina 38)',
    faqHeading: 'Korduma Kippuvad Küsimused · Cena Spettacolo Partenopea',
    venueCta: 'Vaata JustMe Milano Tutvustust',
    thanksgivingTitle: 'Tuled ka Neljapäeval 26.? Vaata Thanksgiving JustMe',
    thanksgivingCta: 'Vaata 26 Nov',
    dec31Title: 'Plaanid Aastavahetust 31. Detsembril JustMe Milanos?',
    dec31Cta: 'Vaata 31 Det',
    orthodoxTitle: 'Tähistad 13. Jaanuaril Ortodoksi Uut Aastat?',
    orthodoxCta: 'Vaata 13 Jaan',
    heroLabels: [
      'Külaliste saabumine valgustatud Torre Branca alla JustMe Milanosse',
      'Köetav klaaspaviljon 70€ Napoli õhtusöögiga kell 21:30',
      'John Vaccaro elav vokaalne Dinner Show pidulike laudade vahel',
      'VIP lauad ja reede klubipidu kella 05:00-ni DJ Franky Deega',
    ],
    nativeFaqs: [
      {
        q: 'Mida sisaldab 70€ menüü reedel, 27. novembril?',
        a: 'Jagatavad eelroad (baklažaani parmigiana, pühvlimozzarella, Luciana kaheksajalad, vanaema lihapallid), Mezzi Paccheri al ragù napoletano, Amalfi sidrunisorbett, vesi, majavein, kohv ja peopääse alates 23:00.',
      },
      {
        q: 'Kas pidu toimub JustMe Milanos või Via Messina 38 Pineta klubis?',
        a: 'Ainult JustMe Milanos (Viale Luigi Camoens 2). Pineta Napoli on külalispartner Napolist, mitte Via Messina 38 Pineta Club Milano.',
      },
      {
        q: 'Miks on reede Club-pilet 20€ ja mis kellani kehtib Dehor-laud?',
        a: 'Reedel 27. novembril (#249217) maksab Club + 1 Drink alates 22:30 20€, Aperitivo 15€, ning 320€ Dehor lauda tuleb saabuda enne 23:00.',
      },
    ],
  },
  fi: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Mar · 70€',
    metaDescription: `Pe 27.11.2026 JustMe Milanossa: Cena Spettacolo Partenopea & Pineta Napoli, 70€ menu, Party 23:00 (20€). Varaukset ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea JustMe Milanossa (Pineta Napoli)',
    subtitle: 'Perjantai 27.11.2026 · 19:30 Ovet & Aperitivo · 21:30 Live Dinner Show · 23:00 Party 05:00 asti · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Yhteistyössä Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Perjantai 27.11.2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Pöydät 320€–5.000€',
    ageDressBadge: '21+ · Tyylikäs (pitkät housut pakolliset miehillä)',
    leadIntro: 'Napolin valloituksen jälkeen kuuluisa CSP · Cena Spettacolo Partenopea saapuu JustMe Milanoon Torre Brancan juurelle perjantaina 27. marraskuuta 2026 yhteistyössä Pineta Napolin kanssa.',
    extraNativeParagraph: 'Ovet avautuvat klo 19:30 (15€ Aperitivo ja illallisvastaanotto); klo 21:30 alkaa John Vaccaron tähdittämä elävä Dinner Show ja 70€ napolilainen menu, jonka jälkeen klo 23:00–05:00 tanssittavat DJ Franky Dee ja Antonio Marigliano.',
    homeLabel: 'Etusivu',
    eventsLabel: 'Milanon Tapahtumat',
    specialLabel: 'Erikoisillat',
    ctaBuyNowLabel: 'Osta Verkossa (15€ – 1.280€)',
    ctaXceedLabel: 'Virallinen Xceed #249217',
    ctaWhatsappLabel: '24/7 Illallis- & VIP-Concierge',
    ctaShuttleLabel: 'Ilmainen Pysäköintikuljetus',
    tocTitle: 'Tapahtumaopas · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Yleiskatsaus, Pineta Napoli Yhteistyö & Aikataulu',
      '2. Suora Verkko-osto Euroissa (70€ Menu, 20€ Club)',
      '3. Täydellinen 70€ Napolilainen Menu & Artistit',
      '4. Kaikki 8 Virallista Hintaluokkaa (15€–5.000€)',
      '5. Ikäraja 21+, Pukukoodi & Ilmainen Shuttle',
      '6. 100% Ennakkomaksu & Välitön Vahvistus',
      '7. Usein Kysytyt Kysymykset (12 FAQ)',
    ],
    quickLabels: ['Päivä & Ajat', 'Tarkka Sijainti (Ei Via Messina)', '70€ Menu & Esiintyjät', 'Ikä & Pukukoodi', 'Vahvistetut Hinnat', 'Ilmainen Shuttle'],
    overviewHeading: 'Yleiskatsaus · Napolilainen Dinner Show JustMe Milanossa',
    timelineHeading: 'Illan Aikataulu · Perjantai 27. Marraskuuta 2026',
    timelineSubheading: 'Klo 19:30 aperitivosta klo 21:30 illallisen kautta klo 05:00 asti',
    timelineTitles: [
      '19:30 · Ovet Avautuvat, 15€ Aperitivo + 1 Juoma & Illallisvastaanotto',
      '21:30 · CSP Dinner Show Alkaa · John Vaccaro Live & 70€ Menu',
      '22:30 · Perjantain Club + 1 Drink Sisäänpääsy (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor-Raja',
      '00:30–05:00 · VIP Privé Pöydät & Päällikkö Tanssilattia',
    ],
    dinnerHeading: 'Napolilainen Kokonaismenu (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Jaettavat alkupalat, Mezzi Paccheri al ragù napoletano, Amalfin sitruunasorbetti, vesi, talon viini, kahvi ja pääsy bileisiin',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Menu + Party',
    tablesCardTitle: 'JustMe Milano Perjantaibileet & VIP Pöydät (320€–5.000€)',
    tiersHeading: 'Kaikki 8 Vahvistettua Hintaa · 70€ Menu & Xceed #249217',
    tiersSubheading: 'Varaa 70€ illallinen, 15€ aperitivo, 20€ club-lippu ja 320€–1.280€ pöydät suoraan sivustolta',
    dressShuttleHeading: 'Ikäraja 21+, Pitkät Housut & Ilmainen Kuljetus',
    dressShuttleSubheading: 'Henkilöllisyystodistus 21+ ja tyylikäs pukeutuminen osoitteessa Viale Luigi Camoens 2',
    dressOkTitle: 'Suositeltu Pukeutuminen (Sallittu)',
    dressNoTitle: 'Evätty Ovella (21+)',
    shuttleHighlightTitle: 'Kumppaniparkki Ilmaisella Edestakaisella Shuttlella',
    logisticsHeading: 'Saapuminen JustMe Milanoon · Metro, Taksi & Shuttle',
    mapHeading: 'GPS Kartta · Torre Branca (Ei Via Messina 38)',
    faqHeading: 'Usein Kysytyt Kysymykset · Cena Spettacolo Partenopea',
    venueCta: 'Katso JustMe Milano Tietokortti',
    thanksgivingTitle: 'Tulossa myös Torstaina 26.11.? Katso Thanksgiving JustMe',
    thanksgivingCta: 'Katso 26.11.',
    dec31Title: 'Uudenvuodenaatto 31.12. JustMe Milanossa?',
    dec31Cta: 'Katso 31.12.',
    orthodoxTitle: 'Juhlitko 13.1. Ortodoksista Uutta Vuotta JustMe:ssa?',
    orthodoxCta: 'Katso 13.1.',
    heroLabels: [
      'Vieraita saapumassa valaistun Torre Brancan alle JustMe Milanoon',
      'Lämmitetty lasipaviljonki klo 21:30 70€ napolilaisessa illallisessa',
      'John Vaccaron live-esitys juhlallisten pöytien keskellä',
      'VIP-pöydät ja perjantain tanssilattia klo 05:00 asti DJ Franky Deen tahdissa',
    ],
    nativeFaqs: [
      {
        q: 'Mitä 70€ Cena Spettacolo Partenopea -menu sisältää 27.11.?',
        a: 'Jaettavat alkupalat (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, Amalfin sitruunasorbetti, vesi, talon viini, kahvi sekä klubipääsy klo 23:00 alkaen.',
      },
      {
        q: 'Onko tapahtuma JustMe Milanossa vai Via Messinan Pineta-klubilla?',
        a: 'Yksinomaan JustMe Milanossa (Viale Luigi Camoens 2, Torre Branca). Pineta Napoli on vieraileva yhteistyökumppani Napolista, ei Via Messina 38:n Pineta Club Milano.',
      },
      {
        q: 'Miksi perjantain Club-lippu maksaa 20€ ja mikä on Dehor-pöydän aikaraja?',
        a: 'Perjantaina 27.11. (Xceed #249217) Club + 1 Drink klo 22:30 alkaen on 20€, Aperitivo 15€, ja 320€ Dehor-pöydän seurueen on saavuttava ennen klo 23:00.',
      },
    ],
  },
  el: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Μιλάνο | 27 Νοε · 70€',
    metaDescription: `Παρ 27 Νοε 2026 στο JustMe Μιλάνο: Cena Spettacolo Partenopea με Pineta Napoli, μενού 70€, Party 23:00 (20€). Κρατήσεις ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea στο JustMe Milano (Pineta Napoli)',
    subtitle: 'Παρασκευή 27 Νοεμβρίου 2026 · 19:30 Απεριτίφ · 21:30 Ζωντανό Dinner Show · 23:00 Πάρτι έως 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Σε Συνεργασία με Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Παρασκευή 27 Νοε 2026 · 19:30 / 05:00',
    priceBadge: 'Μενού 70€ · Απεριτίφ 15€ · Club 20€ · Τραπέζια 320€–5.000€',
    ageDressBadge: '21+ · Κομψό (υποχρεωτικό μακρύ παντελόνι για άνδρες)',
    leadIntro: 'Αφού κατέκτησε τη Νάπολη, το διάσημο CSP · Cena Spettacolo Partenopea έρχεται στο JustMe Milano κάτω από τον Πύργο Torre Branca την Παρασκευή 27 Νοεμβρίου 2026 σε επίσημη συνεργασία με το Pineta Napoli.',
    extraNativeParagraph: 'Οι πόρτες ανοίγουν στις 19:30 για το Απεριτίφ των 15€ και την υποδοχή δείπνου. Στις 21:30 ξεκινά το ζωντανό Dinner Show με τον John Vaccaro και το πλήρες ναπολιτάνικο μενού των 70€, ενώ στις 23:00 αναλαμβάνουν οι DJ Franky Dee και Antonio Marigliano έως τις 05:00.',
    homeLabel: 'Αρχική',
    eventsLabel: 'Εκδηλώσεις Μιλάνο',
    specialLabel: 'Ειδικές Βραδιές',
    ctaBuyNowLabel: 'Αγορά Online (15€ – 1.280€)',
    ctaXceedLabel: 'Επίσημο Κανάλι Xceed #249217',
    ctaWhatsappLabel: '24/7 Concierge Δείπνου & VIP',
    ctaShuttleLabel: 'Δωρεάν Shuttle Πάρκινγκ',
    tocTitle: 'Οδηγός Βραδιάς · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Επισκόπηση, Συνεργασία Pineta Napoli & Πρόγραμμα',
      '2. Άμεση Αγορά σε Ευρώ (Μενού 70€, Club 20€, Τραπέζια)',
      '3. Πλήρες Ναπολιτάνικο Μενού 70€ & Καλλιτέχνες',
      '4. Όλες οι 8 Επιβεβαιωμένες Τιμές (15€–5.000€)',
      '5. Dress Code 21+, Δωρεάν Shuttle & Χάρτης',
      '6. Όροι 100% Προπληρωμής & Άμεση Επιβεβαίωση',
      '7. Συχνές Ερωτήσεις (12 FAQ)',
    ],
    quickLabels: ['Ημερομηνία & Ώρες', 'Σωστός Χώρος (Όχι Via Messina)', 'Μενού 70€ & Line-up', 'Ηλικία & Dress Code', 'Επίσημες Τιμές', 'Δωρεάν Shuttle'],
    overviewHeading: 'Επισκόπηση · Το Διάσημο Ναπολιτάνικο Dinner Show στο Μιλάνο',
    timelineHeading: 'Πρόγραμμα Βραδιάς · Παρασκευή 27 Νοεμβρίου 2026',
    timelineSubheading: 'Από το απεριτίφ στις 19:30 και το live show 21:30 έως το πάρτι στις 05:00',
    timelineTitles: [
      '19:30 · Άνοιγμα Πυλών, 15€ Απεριτίφ + 1 Ποτό & Υποδοχή Δείπνου',
      '21:30 · Έναρξη CSP Dinner Show · John Vaccaro Live & Μενού 70€',
      '22:30 · Είσοδος Club Παρασκευής + 1 Ποτό (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Όριο Dehor',
      '00:30–05:00 · VIP Privé Τραπέζια & Κεντρική Πίστα',
    ],
    dinnerHeading: 'Πλήρες Ναπολιτάνικο Μενού (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Ορεκτικά στη μέση, Mezzi Paccheri al ragù napoletano, σορμπέ λεμονιού Αμάλφι, νερό, κρασί, καφές και παραμονή στο πάρτι',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Μενού 70€ + Πάρτι',
    tablesCardTitle: 'JustMe Milano Friday Party & VIP Τραπέζια (320€–5.000€)',
    tiersHeading: 'Όλες οι 8 Επιβεβαιωμένες Τιμές · Δείπνο 70€ & Xceed #249217',
    tiersSubheading: 'Αγοράστε το μενού 70€, το απεριτίφ 15€, το club 20€ και τραπέζια 320€–1.280€ απευθείας στο site',
    dressShuttleHeading: 'Πολιτική 21+, Μακρύ Παντελόνι & Δωρεάν Μεταφορά',
    dressShuttleSubheading: 'Αυστηρός έλεγχος ταυτότητας 21+ και κομψή εμφάνιση στην Viale Luigi Camoens 2',
    dressOkTitle: 'Προτεινόμενη Εμφάνιση (Επιτρέπεται)',
    dressNoTitle: 'Απαγορεύεται στην Είσοδο (21+)',
    shuttleHighlightTitle: 'Συνεργαζόμενο Πάρκινγκ με Δωρεάν Shuttle Μετ’ Επιστροφής',
    logisticsHeading: 'Πρόσβαση στο JustMe Milano · Μετρό, Ταξί & Shuttle',
    mapHeading: 'Χάρτης GPS · Torre Branca (Όχι Via Messina 38)',
    faqHeading: 'Συχνές Ερωτήσεις · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Δείτε το Προφίλ του JustMe Milano',
    thanksgivingTitle: 'Θα είστε και Πέμπτη 26; Δείτε το Thanksgiving στο JustMe',
    thanksgivingCta: 'Δείτε 26 Νοε',
    dec31Title: 'Πρωτοχρονιά 31 Δεκεμβρίου στο JustMe Milano;',
    dec31Cta: 'Δείτε 31 Δεκ',
    orthodoxTitle: '13 Ιανουαρίου Παλαιό Νέο Έτος στο JustMe;',
    orthodoxCta: 'Δείτε 13 Ιαν',
    heroLabels: [
      'Άφιξη καλεσμένων κάτω από τον φωτισμένο Torre Branca στο JustMe Milano',
      'Θερμαινόμενη γυάλινη αίθουσα με το ναπολιτάνικο δείπνο 70€ στις 21:30',
      'Ζωντανή φωνητική ερμηνεία του John Vaccaro ανάμεσα στα τραπέζια',
      'VIP τραπέζια και πίστα Παρασκευής έως τις 05:00 με DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Τι περιλαμβάνει το μενού των 70€ την Παρασκευή 27 Νοεμβρίου;',
        a: 'Κοινά ορεκτικά (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, κεφτεδάκια της γιαγιάς), Mezzi Paccheri al ragù napoletano, σορμπέ λεμονιού Αμάλφι, νερό, κρασί σπιτιού, καφέ και είσοδο στο πάρτι από τις 23:00.',
      },
      {
        q: 'Η εκδήλωση γίνεται στο JustMe Milano ή στο Pineta της Via Messina 38;',
        a: 'Αποκλειστικά στο JustMe Milano (Viale Luigi Camoens 2). Το Pineta Napoli είναι φιλοξενούμενος συνεργάτης από τη Νάπολη και δεν ταυτίζεται με το Pineta Club της Via Messina 38.',
      },
      {
        q: 'Γιατί η είσοδος Club της Παρασκευής κοστίζει 20€ και ποιο το όριο για Dehor;',
        a: 'Την Παρασκευή 27 Νοεμβρίου (#249217) το εισιτήριο Club + 1 Drink από τις 22:30 κοστίζει 20€, το Απεριτίφ 15€, ενώ για τραπέζια Dehor (320€) απαιτείται άφιξη πριν τις 23:00.',
      },
    ],
  },
  hu: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milánó | Nov 27 · 70€',
    metaDescription: `Péntek nov 27. JustMe Milánó: Cena Spettacolo Partenopea & Pineta Napoli, 70€ menü, Buli 23:00 (20€). Foglalás ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea a JustMe Milano-ban (Pineta Napoli)',
    subtitle: '2026. november 27. péntek · 19:30 Kapunyitás & Aperitivo · 21:30 Élő Dinner Show · 23:00 Buli 05:00-ig · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'A Pineta Napoli Együttműködésével · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Péntek, 2026. Nov 27 · 19:30 / 05:00',
    priceBadge: 'Menü 70€ · Aperitivo 15€ · Club 20€ · Asztalok 320€–5.000€',
    ageDressBadge: '21+ · Elegáns (hosszú nadrág férfiaknak kötelező)',
    leadIntro: 'Nápoly meghódítása után a híres CSP · Cena Spettacolo Partenopea 2026. november 27-én pénteken a Torre Branca alatti JustMe Milano üvegcsarnokába érkezik a Pineta Napoli közreműködésével.',
    extraNativeParagraph: 'A kapuk 19:30-kor nyílnak a 15€ Aperitivo és vacsoravendégek előtt. 21:30-kor indul az élő Dinner Show John Vaccaróval és a 70€ teljes nápolyi menüvel, majd 23:00-tól 05:00-ig DJ Franky Dee és Antonio Marigliano zenél.',
    homeLabel: 'Főoldal',
    eventsLabel: 'Milánói Események',
    specialLabel: 'Különleges Estek',
    ctaBuyNowLabel: 'Online Vásárlás (15€ – 1.280€)',
    ctaXceedLabel: 'Hivatalos Xceed #249217',
    ctaWhatsappLabel: '24/7 Vacsora & VIP Concierge',
    ctaShuttleLabel: 'Ingyenes Parkoló Shuttle',
    tocTitle: 'Eseménykalauz · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Áttekintés, Pineta Napoli Partnerség & Menetrend',
      '2. Online Jegy- és Asztalrendelés EUR-ban',
      '3. Teljes 70€ Nápolyi Menü & Fellépők',
      '4. Mind a 8 Hivatalos Ár & VIP Asztalok (15€–5.000€)',
      '5. 21+ Belépés, Dress Code & Ingyenes Buszjárat',
      '6. 100% Előrefizetés & Azonnali Visszaigazolás',
      '7. Gyakori Kérdések (12 FAQ)',
    ],
    quickLabels: ['Dátum & Időpontok', 'Pontos Helyszín (Nem Via Messina)', '70€ Menü & Sztárok', 'Korhatár & Ruha', 'Megerősített Árak', 'Ingyenes Shuttle'],
    overviewHeading: 'Áttekintés · A Nápolyi Dinner Show a JustMe Milano-ban',
    timelineHeading: 'Az Est Menetrendje · 2026. November 27. Péntek',
    timelineSubheading: '19:30 kapunyitástól a 21:30 élő vacsorán át egészen 05:00 óráig',
    timelineTitles: [
      '19:30 · Kapunyitás, 15€ Aperitivo + 1 Ital & Vacsora Fogadás',
      '21:30 · CSP Dinner Show Kezdete · John Vaccaro Élőben & 70€ Menü',
      '22:30 · Péntek Club + 1 Drink Belépő Nyitás (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Határidő',
      '00:30–05:00 · VIP Privé Asztalok & Fő Táncparkett',
    ],
    dinnerHeading: 'Teljes Nápolyi Menü (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Közös előételek, Mezzi Paccheri al ragù napoletano, amalfi citromsorbet, víz, ház bora, kávé és klubrészvétel',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Menü + Buli',
    tablesCardTitle: 'JustMe Milano Pénteki Buli & VIP Asztalok (320€–5.000€)',
    tiersHeading: 'Mind a 8 Hivatalos Tarifa · 70€ Vacsora & Xceed #249217',
    tiersSubheading: 'Vásárolja meg a 70€ menüt, 15€ aperitivót, 20€ klubjegyet vagy 320€–1.280€ asztalt közvetlenül az oldalon',
    dressShuttleHeading: '21+ Korhatár, Hosszú Nadrág & Ingyenes Shuttle',
    dressShuttleSubheading: 'Eredeti 21+ igazolvány és elegáns öltözet kötelező a Viale Luigi Camoens 2 alatt',
    dressOkTitle: 'Ajánlott Öltözet (Beengedett)',
    dressNoTitle: 'Elutasítva a Bejáratnál (21+)',
    shuttleHighlightTitle: 'Partnerparkoló Ingyenes Oda-Vissza Transzferrel',
    logisticsHeading: 'Eljutás a JustMe Milano-ba · Metró, Taxi & Shuttle',
    mapHeading: 'GPS Térkép · Torre Branca (Nem Via Messina 38)',
    faqHeading: 'Gyakori Kérdések · Cena Spettacolo Partenopea JustMe',
    venueCta: 'JustMe Milano Profil Megnyitása',
    thanksgivingTitle: 'Csütörtök 26-án is jössz? Nézd meg a Thanksgiving JustMe-t',
    thanksgivingCta: 'Nov 26 Megtekintése',
    dec31Title: 'Szilveszter December 31-én a JustMe Milano-ban?',
    dec31Cta: 'Dec 31 Megtekintése',
    orthodoxTitle: 'Január 13-án Ortodox Újév a JustMe-ban?',
    orthodoxCta: 'Jan 13 Megtekintése',
    heroLabels: [
      'Vendégek érkezése a kivilágított Torre Branca alatti JustMe Milano-ba',
      'Fűtött üvegcsarnok a 21:30-as 70€ nápolyi gálavacsorával',
      'John Vaccaro élő énekműsora a gyertyafényes vacsoraasztalok között',
      'VIP asztalok és pénteki táncparkett 05:00-ig DJ Franky Dee-vel',
    ],
    nativeFaqs: [
      {
        q: 'Mit tartalmaz a 70€-s menü november 27-én pénteken?',
        a: 'Tartalmazza a megosztható előételeket (padlizsán parmigiana, bivalymozzarella, Luciana polip, nagyi húsgombóca), a Mezzi Paccheri al ragù napoletano főételt, az amalfi citromsorbettet, vizet, ház borát, kávét és a 23:00-as bulira való maradást.',
      },
      {
        q: 'Az esemény a JustMe Milano-ban vagy a Via Messina Pineta Clubban lesz?',
        a: 'Kizárólag a JustMe Milano-ban (Viale Luigi Camoens 2). A Pineta Napoli vendégpartner Nápolyból; a Via Messina 38 alatti Pineta Club Milano egy másik szórakozóhely.',
      },
      {
        q: 'Miért 20€ a pénteki Club belépő és mi a Dehor asztal szabálya?',
        a: 'Pénteken (#249217) a 22:30 utáni Club + 1 Drink 20€, az Aperitivo 15€, a 320€ Dehor asztalhoz pedig szigorúan 23:00 előtt kell bejelentkezni.',
      },
    ],
  },
  ga: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Samh · 70€',
    metaDescription: `Aoine 27 Samh 2026 ag JustMe Milano: Cena Spettacolo Partenopea le Pineta Napoli, biachlár 70€, Cóisir 23:00 (20€). Eolas ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea ag JustMe Milano (Pineta Napoli)',
    subtitle: 'Aoine 27 Samhain 2026 · 19:30 Doirse & Aperitivo · 21:30 Dinner Show Beo · 23:00 Cóisir go 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'I gComhar le Pineta Napoli · Dinner Show Beo & Cóisir · Torre Branca',
    dateBadge: 'Aoine 27 Samh 2026 · 19:30 / 05:00',
    priceBadge: 'Biachlár 70€ · Aperitivo 15€ · Club 20€ · Boird 320€–5.000€',
    ageDressBadge: '21+ · Galánta (bríste fada éigeantach d’fhir)',
    leadIntro: 'Tar éis Napoli a bhuachan, tagann CSP · Cena Spettacolo Partenopea go JustMe Milano faoi Torre Branca Dé hAoine 27 Samhain 2026 i gcomhpháirtíocht oifigiúil le Pineta Napoli.',
    extraNativeParagraph: 'Osclaíonn na doirse ag 19:30 don Aperitivo 15€ agus fáiltiú dinnéir. Ag 21:30 tosaíonn an Dinner Show beo le John Vaccaro agus an biachlár Napóileach 70€, agus ó 23:00 go 05:00 bíonn DJ Franky Dee agus Antonio Marigliano i mbun ceoil.',
    homeLabel: 'Baile',
    eventsLabel: 'Imeachtaí Milano',
    specialLabel: 'Oícheanta Speisialta',
    ctaBuyNowLabel: 'Ceannaigh Ar Líne (15€ – 1.280€)',
    ctaXceedLabel: 'Cainéal Oifigiúil Xceed #249217',
    ctaWhatsappLabel: 'Concierge Dinnéar & VIP 24/7',
    ctaShuttleLabel: 'Shuttle Páirceála Saor in Aisce',
    tocTitle: 'Treoir na hOíche · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Forbhreathnú, Comhpháirtíocht Pineta Napoli & Clár',
      '2. Íocaíocht Ar Líne EUR (Biachlár 70€, Club 20€, Boird)',
      '3. Biachlár Iomlán 70€ & Ealaíontóirí Beo',
      '4. Na 8 dTaraifí Oifigiúla Go Léir (15€–5.000€)',
      '5. Cód Éadaigh 21+, Shuttle Saor & Léarscáil',
      '6. Réamhíocaíocht 100% & Deimhniú Láithreach',
      '7. Ceisteanna Coitianta (12 FAQ)',
    ],
    quickLabels: ['Dáta & Amanna', 'Ionad Ceart (Ní Via Messina)', 'Biachlár 70€ & Ceol', 'Aois & Éadaí', 'Praghsanna', 'Shuttle Saor'],
    overviewHeading: 'Forbhreathnú · Oíche Napóileach ag JustMe Milano',
    timelineHeading: 'Clár na hOíche · Aoine 27 Samhain 2026',
    timelineSubheading: 'Ón aperitivo ag 19:30 tríd an dinnéar 21:30 go dúnadh na cóisire ag 05:00',
    timelineTitles: [
      '19:30 · Doirse Oscailte, Aperitivo 15€ & Fáiltiú Dinnéir',
      '21:30 · Tús CSP Dinner Show · John Vaccaro Beo & Biachlár 70€',
      '22:30 · Cead Isteach Club + 1 Deoch Dé hAoine (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Teorainn Dehor',
      '00:30–05:00 · Boird VIP Privé & Príomh-Urlár Damhsa',
    ],
    dinnerHeading: 'Biachlár Iomlán 70€ · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Cúrsaí tosaigh le roinnt, Mezzi Paccheri al ragù napoletano, sorbet líomóide Amalfi, uisce, fíon tí, caife agus fanacht sa chóisir',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Biachlár 70€ + Cóisir',
    tablesCardTitle: 'Cóisir Aoine & Boird VIP JustMe Milano (320€–5.000€)',
    tiersHeading: 'Na 8 bPraghas Oifigiúla · Dinnéar 70€ & Xceed #249217',
    tiersSubheading: 'Cuir dinnéar 70€, aperitivo 15€, club 20€ agus boird suas le 1.280€ in áirithe ar líne in EUR',
    dressShuttleHeading: 'Beartas 21+, Bríste Fada & Shuttle Saor in Aisce',
    dressShuttleSubheading: 'Aitheantas 21+ agus éadaí galánta ag Viale Luigi Camoens 2',
    dressOkTitle: 'Éadaí Molta (Ceadaithe)',
    dressNoTitle: 'Diúltaithe ag an Doras (21+)',
    shuttleHighlightTitle: 'Carrchlós Comhpháirtí le Shuttle Saor in Aisce',
    logisticsHeading: 'Conas Teacht go JustMe Milano · Meitreo, Tacsaí & Shuttle',
    mapHeading: 'Léarscáil GPS · Torre Branca (Ní Via Messina 38)',
    faqHeading: 'Ceisteanna Coitianta · Cena Spettacolo Partenopea',
    venueCta: 'Féach ar Phróifíl JustMe Milano',
    thanksgivingTitle: 'An dtagann tú Déardaoin 26 freisin? Féach Thanksgiving JustMe',
    thanksgivingCta: 'Féach 26 Samh',
    dec31Title: 'Oíche Chinn Bliana 31 Nollaig ag JustMe Milano?',
    dec31Cta: 'Féach 31 Nol',
    orthodoxTitle: '13 Eanáir Athbhliain Cheartchreidmheach ag JustMe?',
    orthodoxCta: 'Féach 13 Ean',
    heroLabels: [
      'Aíonna ag teacht faoi Torre Branca ag JustMe Milano san oíche',
      'Pailliún gloine téite don dinnéar Napóileach 70€ ag 21:30',
      'Taibhiú beo ó John Vaccaro i measc na mbord dinnéir',
      'Boird VIP agus rince Aoine go 05:00 le DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Cad atá sa bhiachlár 70€ Dé hAoine 27 Samhain?',
        a: 'Cúrsaí tosaigh le roinnt (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, sorbet líomóide Amalfi, uisce, fíon tí, caife agus cóisir 23:00.',
      },
      {
        q: 'An ag JustMe Milano nó ag Pineta Via Messina 38 atá an oíche?',
        a: 'Ag JustMe Milano amháin (Viale Luigi Camoens 2). Is comhpháirtí ó Napoli é Pineta Napoli, agus ní bhaineann sé le Pineta Club ar Via Messina 38.',
      },
      {
        q: 'Cén fáth go gcosnaíonn Club 20€ Dé hAoine agus cad é riail Dehor?',
        a: 'Ar an Aoine 27 Samhain (#249217) cosnaíonn Club + 1 Drink ó 22:30 20€, Aperitivo 15€, agus teastaíonn seiceáil isteach roimh 23:00 do bhoird Dehor 320€.',
      },
    ],
  },
  lv: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milāna | 27 Nov · 70€',
    metaDescription: `Piektd. 27. nov 2026 JustMe Milānā: Cena Spettacolo Partenopea ar Pineta Napoli, 70€ ēdienkarte, Ballīte 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea JustMe Milano (Pineta Napoli)',
    subtitle: 'Piektdiena, 2026. gada 27. novembris · 19:30 Ieeja · 21:30 Dinner Show · 23:00 Ballīte līdz 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Sadarbībā ar Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Piektdiena, 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Ēdienkarte 70€ · Aperitivo 15€ · Club 20€ · Galdi 320€–5.000€',
    ageDressBadge: '21+ · Elegants (garās bikses vīriešiem obligātas)',
    leadIntro: 'Pēc Neapoles iekarošanas slavenais CSP · Cena Spettacolo Partenopea piektdien, 27. novembrī, ierodas JustMe Milano zem Torre Branca torņa sadarbībā ar Pineta Napoli.',
    extraNativeParagraph: 'Durvis atveras 19:30 uz 15€ Aperitivo un vakariņu viesu uzņemšanu. Plkst. 21:30 sākas dzīvās mūzikas Dinner Show ar John Vaccaro un 70€ Neapoles ēdienkarti, bet no 23:00 līdz 05:00 spēlē DJ Franky Dee un Antonio Marigliano.',
    homeLabel: 'Sākums',
    eventsLabel: 'Milānas Pasākumi',
    specialLabel: 'Īpašie Vakari',
    ctaBuyNowLabel: 'Pirkt Tiešsaistē (15€ – 1.280€)',
    ctaXceedLabel: 'Oficiālais Xceed #249217',
    ctaWhatsappLabel: '24/7 Vakariņas & VIP Konsjeržs',
    ctaShuttleLabel: 'Bezmaksas Stāvvietas Transfērs',
    tocTitle: 'Pasākuma Ceļvedis · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Pārskats, Pineta Napoli Sadarbība & Grafiks',
      '2. Tiešsaistes Apmaksa EUR (70€ Vakariņas, 20€ Klubs)',
      '3. Pilna 70€ Neapoles Ēdienkarte & Mākslinieki',
      '4. Visi 8 Apstiprinātie Tarifi (15€–5.000€)',
      '5. Ieeja 21+, Dreskods & Bezmaksas Transfērs',
      '6. 100% Priekšapmaksa & Tūlītējs Apstiprinājums',
      '7. Biežāk Uzdotie Jautājumi (12 FAQ)',
    ],
    quickLabels: ['Datums & Laiks', 'Precīza Vieta (Ne Via Messina)', '70€ Ēdienkarte', 'Vecums & Stils', 'Oficiālās Cenas', 'Bezmaksas Transfērs'],
    overviewHeading: 'Pārskats · Neapoles Vakariņu Šovs JustMe Milano',
    timelineHeading: 'Vakara Programma · Piektdiena 27. Novembris 2026',
    timelineSubheading: 'No plkst. 19:30 aperitivo un 21:30 Dinner Show līdz 05:00 rītā',
    timelineTitles: [
      '19:30 · Durvju Atvēršana, 15€ Aperitivo & Vakariņu Viesu Uzņemšana',
      '21:30 · CSP Dinner Show Sākums · John Vaccaro Dzīvajā & 70€ Ēdienkarte',
      '22:30 · Piektdienas Club + 1 Drink Biļešu Ieeja (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Limits',
      '00:30–05:00 · VIP Privé Galdi & Galvenā Deju Grīda',
    ],
    dinnerHeading: 'Neapoles Pilnā Ēdienkarte (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Koplietošanas uzkodas, Mezzi Paccheri al ragù napoletano, Amalfi citronu sorbets, ūdens, mājas vīns, kafija un ballīte',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Ēdienkarte',
    tablesCardTitle: 'JustMe Milano Piektdienas Ballīte & VIP Galdi (320€–5.000€)',
    tiersHeading: 'Visas 8 Oficiālās Cenas · 70€ Vakariņas & Xceed #249217',
    tiersSubheading: 'Rezervējiet 70€ vakariņas, 15€ aperitivo, 20€ klubu un galdus līdz 1.280€ uzreiz vietnē',
    dressShuttleHeading: 'Ieeja no 21+, Garās Bikses & Bezmaksas Transfērs',
    dressShuttleSubheading: 'Stingra 21+ dokumentu pārbaude un elegants apģērbs Viale Luigi Camoens 2',
    dressOkTitle: 'Ieteicamais Apģērbs (Atļauts)',
    dressNoTitle: 'Netiek Ielaisti (21+)',
    shuttleHighlightTitle: 'Partneru Stāvvieta ar Bezmaksas Autobusu uz Klubu',
    logisticsHeading: 'Kā Nokļūt JustMe Milano · Metro, Taksometrs & Autobuss',
    mapHeading: 'GPS Karte · Torre Branca (Nevis Via Messina 38)',
    faqHeading: 'Biežāk Uzdotie Jautājumi · Cena Spettacolo Partenopea',
    venueCta: 'Skatīt JustMe Milano Profilu',
    thanksgivingTitle: 'Nākat arī Ceturtdien 26.? Skatiet Thanksgiving JustMe',
    thanksgivingCta: 'Skatīt 26 Nov',
    dec31Title: 'Jaungada Svinības 31. Decembrī JustMe Milano?',
    dec31Cta: 'Skatīt 31 Dec',
    orthodoxTitle: '13. Janvāris Pareizticīgo Jaunais Gads JustMe?',
    orthodoxCta: 'Skatīt 13 Jan',
    heroLabels: [
      'Viesu ierašanās zem izgaismotā Torre Branca torņa JustMe Milano',
      'Apsildāms stikla paviljons 70€ Neapoles vakariņām plkst. 21:30',
      'John Vaccaro dzīvā vokāla uzstāšanās pie svētku galdiem',
      'VIP galdi un piektdienas ballīte līdz 05:00 ar DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Kas ietilpst 70€ ēdienkartē piektdien, 27. novembrī?',
        a: 'Koplietošanas antipasti (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, Amalfi citronu sorbets, ūdens, mājas vīns, kafija un pieeja ballītei no 23:00.',
      },
      {
        q: 'Vai pasākums notiek JustMe Milano vai Pineta Via Messina 38?',
        a: 'Tikai JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli ir viesu partneris no Neapoles un nav saistīts ar Pineta Club Via Messina 38.',
      },
      {
        q: 'Kāpēc piektdienas Club biļete maksā 20€ un kāds ir Dehor laiks?',
        a: 'Piektdienās (#249217) Club + 1 Drink no 22:30 maksā 20€, Aperitivo 15€, savukārt 320€ Dehor galdiem jāierodas pirms 23:00.',
      },
    ],
  },
  lt: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milanas | Lap 27 · 70€',
    metaDescription: `Penkt. lapkričio 27 d. JustMe Milane: Cena Spettacolo Partenopea su Pineta Napoli, 70€ meniu, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea klube JustMe Milano (Pineta Napoli)',
    subtitle: '2026 m. lapkričio 27 d., penktadienis · 19:30 Durys · 21:30 Dinner Show · 23:00 Party iki 05:00 · John Vaccaro, DJ Franky Dee ir Antonio Marigliano',
    themeTag: 'Kartu su Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Penkt., 2026 Lap 27 · 19:30 / 05:00',
    priceBadge: 'Meniu 70€ · Aperitivo 15€ · Club 20€ · Stalai 320€–5.000€',
    ageDressBadge: '21+ · Elegantiška (vyrams ilgos kelnės privalomos)',
    leadIntro: 'Užkariavusi Neapolį, garsioji CSP · Cena Spettacolo Partenopea lapkričio 27 d. penktadienį atvyksta į JustMe Milano po Torre Branca bokštu bendradarbiaujant su Pineta Napoli.',
    extraNativeParagraph: 'Durys atveriamos 19:30 val. 15€ Aperitivo ir vakarienės svečių priėmimui. 21:30 prasideda gyvas Dinner Show su John Vaccaro ir pilnu 70€ Neapolio meniu, o nuo 23:00 iki 05:00 šventę tęsia DJ Franky Dee ir Antonio Marigliano.',
    homeLabel: 'Pradžia',
    eventsLabel: 'Renginiai Milane',
    specialLabel: 'Specialūs Renginiai',
    ctaBuyNowLabel: 'Pirkti Internetu (15€ – 1.280€)',
    ctaXceedLabel: 'Oficialus Xceed #249217',
    ctaWhatsappLabel: '24/7 Vakarienės & VIP Konsjeržas',
    ctaShuttleLabel: 'Nemokamas Parkavimo Pervežimas',
    tocTitle: 'Renginio Gidas · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Apžvalga, Pineta Napoli Partnerystė & Programa',
      '2. Pirkti Bilietus ir Stalus EUR Internetu',
      '3. Pilnas 70€ Neapolio Meniu & Atlikėjai',
      '4. Visi 8 Patvirtinti Įkainiai (15€–5.000€)',
      '5. Amžiaus Cenzas 21+, Apranga & Nemokamas Pervežimas',
      '6. 100% Išankstinis Apmokėjimas & Patvirtinimas',
      '7. Dažniausi Klausimai (12 FAQ)',
    ],
    quickLabels: ['Data ir Laikas', 'Tiksli Vieta (Ne Via Messina)', '70€ Meniu ir Žvaigždės', 'Amžius ir Apranga', 'Kainos', 'Nemokamas Shuttle'],
    overviewHeading: 'Apžvalga · Neapolietiškas Vakarienės Šou JustMe Milano',
    timelineHeading: 'Vakaro Programa · Penktadienis, Lapkričio 27 d., 2026',
    timelineSubheading: 'Nuo 19:30 aperityvo ir 21:30 Dinner Show iki vakarėlio pabaigos 05:00',
    timelineTitles: [
      '19:30 · Durų Atidarymas, 15€ Aperitivo & Vakarienės Svečių Sutikimas',
      '21:30 · CSP Dinner Show Pradžia · John Vaccaro Gyvai & 70€ Meniu',
      '22:30 · Penktadienio Club + 1 Drink Įėjimas (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Limitas',
      '00:30–05:00 · VIP Privé Stalai ir Pagrindinė Šokių Aikštelė',
    ],
    dinnerHeading: 'Neapolietiškas Meniu (70€) · John Vaccaro ir Pineta Napoli',
    dinnerSubheading: 'Užkandžiai dalinimuisi, Mezzi Paccheri al ragù napoletano, Amalfi citrinų šerbetas, vanduo, naminis vynas, kava ir vakarėlis',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Meniu + Party',
    tablesCardTitle: 'JustMe Milano Penktadienio Vakarėlis & VIP Stalai (320€–5.000€)',
    tiersHeading: 'Visi 8 Oficialūs Tarifai · 70€ Vakarienė & Xceed #249217',
    tiersSubheading: 'Įsigykite 70€ vakarienę, 15€ aperityvą, 20€ klubo bilietą ir stalus iki 1.280€ iškart svetainėje',
    dressShuttleHeading: '21+ Taisyklės, Ilgos Kelnės & Nemokamas Pervežimas',
    dressShuttleSubheading: 'Griežta 21+ dokumentų patikra ir puošni apranga Viale Luigi Camoens 2',
    dressOkTitle: 'Rekomenduojama Apranga (Įleidžiama)',
    dressNoTitle: 'Neįleidžiama prie Durų (21+)',
    shuttleHighlightTitle: 'Partnerių Aikštelė su Nemokamu Autobusiuku iki Įėjimo',
    logisticsHeading: 'Kaip Atvykti į JustMe Milano · Metro, Taksi & Autobusiukas',
    mapHeading: 'GPS Žemėlapis · Torre Branca (Ne Via Messina 38)',
    faqHeading: 'Dažniausi Klausimai · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Žiūrėti JustMe Milano Profilį',
    thanksgivingTitle: 'Atvykstate ir Ketvirtadienį 26 d.? Thanksgiving JustMe',
    thanksgivingCta: 'Žiūrėti Lap 26',
    dec31Title: 'Naujieji Metai Gruodžio 31 d. JustMe Milano klube?',
    dec31Cta: 'Žiūrėti Gru 31',
    orthodoxTitle: 'Sausio 13 d. Ortodoksų Naujieji Metai JustMe?',
    orthodoxCta: 'Žiūrėti Sau 13',
    heroLabels: [
      'Svečių atvykimas po apšviestu Torre Branca bokštu JustMe Milano',
      'Šildomas stiklo paviljonas 70€ Neapolio vakarienei 21:30 val.',
      'Gyvas John Vaccaro vokalinis pasirodymas tarp vakarienės stalų',
      'VIP stalai ir šokiai iki 05:00 su DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Kas įeina į 70€ meniu lapkričio 27 d. penktadienį?',
        a: 'Bendri užkandžiai (baklažanų parmigiana, buivolės mocarela, aštuonkojai alla Luciana, kukuliai padaže), Mezzi Paccheri al ragù napoletano, Amalfi citrinų šerbetas, vanduo, naminis vynas, kava ir pasilikimas vakarėlyje nuo 23:00.',
      },
      {
        q: 'Ar renginys vyksta JustMe Milano, ar Pineta Via Messina 38?',
        a: 'Tik JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli yra kviestinis partneris iš Neapolio, nesusijęs su Pineta Club Via Messina 38.',
      },
      {
        q: 'Kodėl penktadienio Club bilietas kainuoja 20€ ir kada Dehor riba?',
        a: 'Penktadienį (#249217) Club + 1 Drink nuo 22:30 kainuoja 20€, Aperitivo 15€, o 320€ Dehor stalų svečiai privalo ateiti iki 23:00.',
      },
    ],
  },
  mt: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milan | 27 Nov · 70€',
    metaDescription: `Ġimgħa 27 Nov 2026 f'JustMe Milan: Cena Spettacolo Partenopea ma' Pineta Napoli, menu 70€, Party 23:00 (20€). Ibbukkja ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea f’JustMe Milano (Pineta Napoli)',
    subtitle: 'Il-Ġimgħa 27 ta’ Novembru 2026 · 19:30 Ftuħ & Aperitivo · 21:30 Dinner Show Live · 23:00 Party sal-05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'B’Kollaborazzjoni ma’ Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Il-Ġimgħa, 27 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Imwejjed 320€–5.000€',
    ageDressBadge: '21+ · Eleganti (qalziet twil obbligatorju għall-irġiel)',
    leadIntro: 'Wara li rebħet lil Napli, iċ-ċelebri CSP · Cena Spettacolo Partenopea tasal f’JustMe Milano taħt it-Torre Branca nhar il-Ġimgħa 27 ta’ Novembru 2026 f’kollaborazzjoni uffiċjali ma’ Pineta Napoli.',
    extraNativeParagraph: 'Il-bibien jinfetħu fis-19:30 għall-Aperitivo ta’ 15€ u l-mistiedna tal-ikel. Fid-21:30 jibda d-Dinner Show live ma’ Voice John Vaccaro u l-menu Naplitan sħiħ ta’ 70€, segwit mill-23:00 sal-05:00 minn DJ Franky Dee u Antonio Marigliano.',
    homeLabel: 'Dar',
    eventsLabel: 'Avvenimenti Milan',
    specialLabel: 'Iljieli Speċjali',
    ctaBuyNowLabel: 'Ixtri Online (15€ – 1.280€)',
    ctaXceedLabel: 'Kanal Uffiċjali Xceed #249217',
    ctaWhatsappLabel: 'Concierge Ikla & VIP 24/7',
    ctaShuttleLabel: 'Shuttle B’Xejn mill-Parkeġġ',
    tocTitle: 'Gwida tal-Lejl · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Ħarsa Ġenerali, Sħubija Pineta Napoli & Skeda',
      '2. Xiri Dirett b’EUR (Menu 70€, Club 20€, Imwejjed)',
      '3. Menu Sħiħ ta’ Napli (70€) & Artisti',
      '4. It-8 Tariffi Konfermati Kollha (15€–5.000€)',
      '5. Kodiċi tal-Ilbies 21+, Shuttle B’Xejn & Mappa',
      '6. Termini ta’ Ħlas 100% Bil-Quddiem',
      '7. Mistoqsijiet Frekwenti (12 FAQ)',
    ],
    quickLabels: ['Data & Ħinijiet', 'Post Eżatt (Mhux Via Messina)', 'Menu 70€ & Artisti', 'Età & Ilbies', 'Prezzijiet Konfermati', 'Shuttle B’Xejn'],
    overviewHeading: 'Ħarsa Ġenerali · Is-Serata Naplitana f’JustMe Milano',
    timelineHeading: 'Skeda tal-Lejl · Il-Ġimgħa 27 ta’ Novembru 2026',
    timelineSubheading: 'Mill-aperitivo tas-19:30 sal-party ta’ filgħodu fil-05:00',
    timelineTitles: [
      '19:30 · Ftuħ, 15€ Aperitivo + Xarba & Akkoljenza tal-Ikla',
      '21:30 · Bidu CSP Dinner Show · John Vaccaro Live & Menu 70€',
      '22:30 · Ftuħ tad-Dħul Club + 1 Drink tal-Ġimgħa (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Limitu Dehor',
      '00:30–05:00 · Imwejjed VIP Privé & Pista Prinċipali',
    ],
    dinnerHeading: 'Menu Naplitan Sħiħ (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Antipasti għall-qsim, Mezzi Paccheri al ragù napoletano, sorbet tal-lumi ta’ Amalfi, ilma, inbid tad-dar, kafè u dħul fil-party',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu 70€ + Party',
    tablesCardTitle: 'JustMe Milano Party tal-Ġimgħa & Imwejjed VIP (320€–5.000€)',
    tiersHeading: 'It-8 Tariffi Uffiċjali · Ikla 70€ & Xceed #249217',
    tiersSubheading: 'Ibbukkja l-menu ta’ 70€, aperitivo 15€, club 20€ u imwejjed sa 1.280€ direttament b’EUR fuq is-sit',
    dressShuttleHeading: 'Politika 21+, Qalziet Twil & Shuttle B’Xejn',
    dressShuttleSubheading: 'Kontroll strett tal-ID 21+ u ilbies eleganti fi Viale Luigi Camoens 2',
    dressOkTitle: 'Ilbies Rakkomandat (Aċċettat)',
    dressNoTitle: 'Mhux Aċċettat fil-Bieb (21+)',
    shuttleHighlightTitle: 'Parkeġġ Imsieħeb b’Servizz Shuttle B’Xejn',
    logisticsHeading: 'Kif Tasal JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'Mappa GPS · Torre Branca (Mhux Via Messina 38)',
    faqHeading: 'Mistoqsijiet Frekwenti · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Ara l-Profil ta’ JustMe Milano',
    thanksgivingTitle: 'Ġej ukoll il-Ħamis 26? Ara Thanksgiving f’JustMe',
    thanksgivingCta: 'Ara 26 Nov',
    dec31Title: 'Qed tfittex Lejlet l-Ewwel tas-Sena 31 ta’ Diċembru?',
    dec31Cta: 'Ara 31 Diċ',
    orthodoxTitle: '13 ta’ Jannar Ewwel tas-Sena Ortodossa f’JustMe?',
    orthodoxCta: 'Ara 13 Jan',
    heroLabels: [
      'Mistednin jaslu taħt it-Torre Branca mdawwla quddiem JustMe Milano',
      'Padiljun tal-ħġieġ imsaħħan għall-ikla Naplitana ta’ 70€ fid-21:30',
      'Spettaklu vokali live minn John Vaccaro fost l-imwejjed tal-ikla',
      'Imwejjed VIP u pista tal-Ġimgħa sal-05:00 ma’ DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'X’jinkludi l-menu ta’ 70€ nhar il-Ġimgħa 27 ta’ Novembru?',
        a: 'Jinkludi antipasti għall-qsim (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, pulpetti biz-zalza), Mezzi Paccheri al ragù napoletano, sorbet tal-lumi ta’ Amalfi, ilma, inbid tad-dar, kafè u aċċess għall-party.',
      },
      {
        q: 'L-avveniment isir f’JustMe Milano jew fil-Pineta ta’ Via Messina 38?',
        a: 'Esclusivament f’JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli huwa sieħeb mistieden minn Napli u mhux il-Pineta Club Milano ta’ Via Messina 38.',
      },
      {
        q: 'Għaliex id-dħul Club tal-Ġimgħa jiswa 20€ u x’inhi r-regola ta’ Dehor?',
        a: 'Nhar il-Ġimgħa (#249217) id-dħul Club + 1 Drink mill-22:30 jiswa 20€, l-Aperitivo 15€, u l-imwejjed Dehor ta’ 320€ iridu jidħlu qabel il-23:00.',
      },
    ],
  },
  pl: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Mediolan | 27 Lis · 70€',
    metaDescription: `Pt 27 lis 2026 w JustMe Mediolan: Cena Spettacolo Partenopea z Pineta Napoli, menu 70€, Party 23:00 (20€). Bilety ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea w JustMe Milano (Pineta Napoli)',
    subtitle: 'Piątek 27 listopada 2026 · 19:30 Otwarcie & Aperitivo · 21:30 Dinner Show · 23:00 Party do 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'We Współpracy z Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Piątek, 27 Lis 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Stoliki 320€–5.000€',
    ageDressBadge: '21+ · Elegancki (długie spodnie obowiązkowe dla panów)',
    leadIntro: 'Po podboju Neapolu słynna CSP · Cena Spettacolo Partenopea przybywa do JustMe Milano pod wieżą Torre Branca w piątek 27 listopada 2026 we współpracy z Pineta Napoli.',
    extraNativeParagraph: 'Drzwi otwierają się o 19:30 na 15€ Aperitivo i powitanie gości kolacji. O 21:30 startuje Dinner Show na żywo z Johnem Vaccaro i pełnym menu neapolitańskim za 70€, a od 23:00 do 05:00 grają DJ Franky Dee i Antonio Marigliano.',
    homeLabel: 'Start',
    eventsLabel: 'Wydarzenia Mediolan',
    specialLabel: 'Specjalne Noce',
    ctaBuyNowLabel: 'Kup Online (15€ – 1.280€)',
    ctaXceedLabel: 'Oficjalny Xceed #249217',
    ctaWhatsappLabel: '24/7 Kolacja & VIP Concierge',
    ctaShuttleLabel: 'Darmowy Shuttle z Parkingu',
    tocTitle: 'Przewodnik · Cena Spettacolo Partenopea JustMe Mediolan',
    tocLabels: [
      '1. Przegląd, Współpraca Pineta Napoli & Harmonogram',
      '2. Zakup Online w EUR (Menu 70€, Club 20€, Stoliki)',
      '3. Pełne Neapolitańskie Menu (70€) & Artyści',
      '4. Wszystkie 8 Oficjalnych Stawek (15€–5.000€)',
      '5. Zasady 21+, Dress Code & Darmowy Shuttle',
      '6. 100% Przedpłata & Natychmiastowe Potwierdzenie',
      '7. Najczęstsze Pytania (12 FAQ)',
    ],
    quickLabels: ['Data & Godziny', 'Dokładny Klub (Nie Via Messina)', 'Menu 70€ & Artyści', 'Wiek & Dress Code', 'Ceny', 'Darmowy Shuttle'],
    overviewHeading: 'Przegląd · Neapolitańskie Dinner Show w JustMe Milano',
    timelineHeading: 'Harmonogram Nocy · Piątek 27 Listopada 2026',
    timelineSubheading: 'Od 19:30 aperitivo przez 21:30 kolację z muzyką na żywo do 05:00 nad ranem',
    timelineTitles: [
      '19:30 · Otwarcie Drzwi, 15€ Aperitivo + 1 Drink & Przyjęcie Kolacyjne',
      '21:30 · Start CSP Dinner Show · John Vaccaro Na Żywo & Menu 70€',
      '22:30 · Wejście Piątkowe Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Limit Dehor',
      '00:30–05:00 · Stoliki VIP Privé & Główny Parkiet',
    ],
    dinnerHeading: 'Pełne Menu Neapolitańskie (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Przystawki do podziału, Mezzi Paccheri al ragù napoletano, sorbet cytrynowy z Amalfi, woda, wino domu, kawa i wejście na imprezę',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu 70€ + Party',
    tablesCardTitle: 'JustMe Milano Piątkowe Party & Stoliki VIP (320€–5.000€)',
    tiersHeading: 'Wszystkie 8 Oficjalnych Stawek · Kolacja 70€ & Xceed #249217',
    tiersSubheading: 'Kup menu 70€, aperitivo 15€, club 20€ i stoliki 320€–1.280€ bezpośrednio na stronie w EUR',
    dressShuttleHeading: 'Wejście 21+, Długie Spodnie & Darmowy Transfer',
    dressShuttleSubheading: 'Ścisła kontrola dowodu 21+ i elegancki strój przy Viale Luigi Camoens 2',
    dressOkTitle: 'Zalecany Strój (Akceptowany)',
    dressNoTitle: 'Zakazane na Wejściu (21+)',
    shuttleHighlightTitle: 'Parking Partnerski z Bezpłatnym Shuttle pod Klub',
    logisticsHeading: 'Dojazd do JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'Mapa GPS · Torre Branca (Nie Via Messina 38)',
    faqHeading: 'Częste Pytania · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Zobacz Profil JustMe Milano',
    thanksgivingTitle: 'Przychodzisz też w Czwartek 26? Thanksgiving JustMe',
    thanksgivingCta: 'Zobacz 26 Lis',
    dec31Title: 'Sylwester 31 Grudnia w JustMe Milano?',
    dec31Cta: 'Zobacz 31 Gru',
    orthodoxTitle: '13 Stycznia Prawosławny Nowy Rok w JustMe?',
    orthodoxCta: 'Zobacz 13 Sty',
    heroLabels: [
      'Goście przybywający pod oświetloną Torre Branca przed JustMe Milano',
      'Ogrzewany szklany pawilon z neapolitańską kolacją za 70€ o 21:30',
      'Występ na żywo Johna Vaccaro między stołami kolacyjnymi',
      'Loże VIP i piątkowy parkiet do 05:00 z DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Co dokładnie zawiera menu za 70€ w piątek 27 listopada?',
        a: 'Przystawki do podziału (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, pulpeciki w sosie), Mezzi Paccheri al ragù napoletano, sorbet cytrynowy z Amalfi, wodę, wino domu, kawę oraz zabawę na imprezie od 23:00.',
      },
      {
        q: 'Czy wydarzenie odbywa się w JustMe Milano czy w Pineta przy Via Messina?',
        a: 'Wyłącznie w JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli jest partnerem z Neapolu i nie ma związku z Pineta Club Milano przy Via Messina 38.',
      },
      {
        q: 'Dlaczego bilet Club w piątek kosztuje 20€ i do której działa Dehor?',
        a: 'W piątek 27 listopada (#249217) Club + 1 Drink od 22:30 kosztuje 20€, Aperitivo 15€, a goście stolików Dehor za 320€ muszą wejść przed 23:00.',
      },
    ],
  },
  ro: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Noi · 70€',
    metaDescription: `Vin 27 noi 2026 la JustMe Milano: Cena Spettacolo Partenopea cu Pineta Napoli, meniu 70€, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea la JustMe Milano (Pineta Napoli)',
    subtitle: 'Vineri, 27 noiembrie 2026 · 19:30 Deschidere & Aperitivo · 21:30 Dinner Show Live · 23:00 Party până la 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'În Colaborare cu Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Vineri, 27 Noi 2026 · 19:30 / 05:00',
    priceBadge: 'Meniu 70€ · Aperitivo 15€ · Club 20€ · Mese 320€–5.000€',
    ageDressBadge: '21+ · Elegant (pantaloni lungi obligatorii bărbați)',
    leadIntro: 'După ce a cucerit Napoli, celebra CSP · Cena Spettacolo Partenopea ajunge la JustMe Milano sub Torre Branca vineri, 27 noiembrie 2026, în colaborare oficială cu Pineta Napoli.',
    extraNativeParagraph: 'Ușile se deschid la 19:30 pentru Aperitivo (15€) și primirea la cină. La 21:30 începe Dinner Show live cu John Vaccaro și meniul napoletan complet de 70€, iar de la 23:00 la 05:00 continuă DJ Franky Dee și Antonio Marigliano.',
    homeLabel: 'Acasă',
    eventsLabel: 'Evenimente Milano',
    specialLabel: 'Seri Speciale',
    ctaBuyNowLabel: 'Cumpără Online (15€ – 1.280€)',
    ctaXceedLabel: 'Canal Oficial Xceed #249217',
    ctaWhatsappLabel: 'Concierge Cină & VIP 24/7',
    ctaShuttleLabel: 'Shuttle Gratuit Parcare',
    tocTitle: 'Ghidul Serii · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Prezentare, Parteneriat Pineta Napoli & Program',
      '2. Achiziție Directă în EUR (Meniu 70€, Club 20€, Mese)',
      '3. Meniul Complet Napoletan (70€) & Artiști Live',
      '4. Toate Cele 8 Tarife Oficiale (15€–5.000€)',
      '5. Reguli 21+, Dress Code & Shuttle Gratuit',
      '6. Plată 100% în Avans & Confirmare Imediată',
      '7. Întrebări Frecvente (12 FAQ)',
    ],
    quickLabels: ['Data & Orele', 'Locația Exactă (Nu Via Messina)', 'Meniu 70€ & Artiști', 'Vârstă & Ținută', 'Tarife Confirmate', 'Shuttle Gratuit'],
    overviewHeading: 'Prezentare · Spectacolul Culinar Napoletan la JustMe Milano',
    timelineHeading: 'Programul Complet · Vineri 27 Noiembrie 2026',
    timelineSubheading: 'De la aperitivul de la 19:30 și cina live de la 21:30 până la 05:00 dimineața',
    timelineTitles: [
      '19:30 · Deschidere, 15€ Aperitivo + 1 Drink & Primire Cină',
      '21:30 · Start CSP Dinner Show · John Vaccaro Live & Meniu 70€',
      '22:30 · Acces Club de Vineri + 1 Băutură (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Limită Dehor',
      '00:30–05:00 · Mese VIP Privé & Ringul Principal',
    ],
    dinnerHeading: 'Meniu Napoletan Complet (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Antreuri de împărțit, Mezzi Paccheri al ragù napoletano, sorbet de lămâie de Amalfi, apă, vinul casei, cafea și acces la party',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Meniu 70€ + Party',
    tablesCardTitle: 'JustMe Milano Friday Party & Mese VIP (320€–5.000€)',
    tiersHeading: 'Toate 8 Tarifele Confirmate · Cină 70€ & Xceed #249217',
    tiersSubheading: 'Rezervă online meniul de 70€, aperitivo 15€, club 20€ și mese 320€–1.280€ direct în EUR',
    dressShuttleHeading: 'Acces 21+, Pantaloni Lungi & Transfer Gratuit',
    dressShuttleSubheading: 'Control strict 21+ cu act de identitate original pe Viale Luigi Camoens 2',
    dressOkTitle: 'Ținută Recomandată (Permisă)',
    dressNoTitle: 'Refuzat la Intrare (21+)',
    shuttleHighlightTitle: 'Parcare Parteneră cu Shuttle Gratuit Dus-Întors',
    logisticsHeading: 'Cum Ajungi la JustMe Milano · Metrou, Taxi & Shuttle',
    mapHeading: 'Hartă GPS · Torre Branca (Nu Via Messina 38)',
    faqHeading: 'Întrebări Frecvente · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Vezi Profilul JustMe Milano',
    thanksgivingTitle: 'Vii și Joi 26? Vezi Thanksgiving la JustMe Milano',
    thanksgivingCta: 'Vezi 26 Noi',
    dec31Title: 'Revelion 31 Decembrie la JustMe Milano?',
    dec31Cta: 'Vezi 31 Dec',
    orthodoxTitle: '13 Ianuarie Revelionul Ortodox la JustMe?',
    orthodoxCta: 'Vezi 13 Ian',
    heroLabels: [
      'Sosirea invitaților sub turnul luminat Torre Branca la JustMe Milano',
      'Pavilionul de sticlă încălzit pentru cina napoletană de 70€ la 21:30',
      'Moment vocal live cu John Vaccaro printre mesele de cină',
      'Mese VIP și petrecerea de vineri până la 05:00 cu DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Ce include meniul de 70€ de vineri, 27 noiembrie?',
        a: 'Antreuri de împărțit (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, chifteluțe în sos), Mezzi Paccheri al ragù napoletano, sorbet de lămâie de Amalfi, apă, vinul casei, cafea și acces la party de la 23:00.',
      },
      {
        q: 'Evenimentul are loc la JustMe Milano sau la Pineta din Via Messina 38?',
        a: 'Exclusiv la JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli este partenerul invitat din Napoli, nu clubul Pineta din Via Messina 38.',
      },
      {
        q: 'De ce biletul Club de vineri este 20€ și care e limita la Dehor?',
        a: 'Vineri (#249217) biletul Club + 1 Drink de la 22:30 costă 20€, Aperitivo 15€, iar mesele Dehor de 320€ necesită intrare înainte de ora 23:00.',
      },
    ],
  },
  sk: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Miláno | 27 Nov · 70€',
    metaDescription: `Pia 27. nov 2026 v JustMe Miláno: Cena Spettacolo Partenopea s Pineta Napoli, menu 70€, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea v JustMe Milano (Pineta Napoli)',
    subtitle: 'Piatok 27. novembra 2026 · 19:30 Otvorenie & Aperitivo · 21:30 Dinner Show · 23:00 Party do 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'V Spolupráci s Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Piatok, 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Stoly 320€–5.000€',
    ageDressBadge: '21+ · Elegantný (dlhé nohavice pre pánov povinné)',
    leadIntro: 'Po dobytí Neapola prichádza slávna CSP · Cena Spettacolo Partenopea v piatok 27. novembra 2026 do JustMe Milano pod vežou Torre Branca v spolupráci s Pineta Napoli.',
    extraNativeParagraph: 'Brány sa otvárajú o 19:30 na 15€ Aperitivo a uvítanie večere. O 21:30 štartuje živá Dinner Show s Johnom Vaccarom a neapolským menu za 70€, následne do 05:00 hrajú DJ Franky Dee a Antonio Marigliano.',
    homeLabel: 'Domov',
    eventsLabel: 'Podujatia Miláno',
    specialLabel: 'Špeciálne Noci',
    ctaBuyNowLabel: 'Kúpiť Online (15€ – 1.280€)',
    ctaXceedLabel: 'Oficiálny Xceed #249217',
    ctaWhatsappLabel: '24/7 Večera & VIP Concierge',
    ctaShuttleLabel: 'Bezplatný Parkovací Shuttle',
    tocTitle: 'Sprievodca Večerom · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Prehľad, Spolupráca Pineta Napoli & Harmonogram',
      '2. Online Platba v EUR (Menu 70€, Club 20€, Stoly)',
      '3. Kompletné Neapolské Menu (70€) & Umelci',
      '4. Všetkých 8 Potvrdených Taríf (15€–5.000€)',
      '5. Dress Code 21+, Bezplatný Shuttle & Mapa',
      '6. 100% Platba Vopred & Okamžité Potvrdenie',
      '7. Časté Otázky (12 FAQ)',
    ],
    quickLabels: ['Dátum & Časy', 'Presné Miesto (Nie Via Messina)', 'Menu 70€ & Hudba', 'Vek & Dress Code', 'Overené Ceny', 'Shuttle Zdarma'],
    overviewHeading: 'Prehľad · Neapolská Dinner Show v JustMe Milano',
    timelineHeading: 'Večerný Program · Piatok 27. Novembra 2026',
    timelineSubheading: 'Od 19:30 aperitiva cez 21:30 Dinner Show až do 05:00 rána',
    timelineTitles: [
      '19:30 · Otvorenie, 15€ Aperitivo + 1 Drink & Privítanie Večere',
      '21:30 · Štart CSP Dinner Show · John Vaccaro Naživo & Menu 70€',
      '22:30 · Piatkový Vstup Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Limit Dehor',
      '00:30–05:00 · VIP Privé Stoly & Hlavný Parket',
    ],
    dinnerHeading: 'Neapolské Menu (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Predjedlá do stredu stola, Mezzi Paccheri al ragù napoletano, citrónový sorbet z Amalfi, voda, domáce víno, káva a vstup na párty',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu 70€ + Party',
    tablesCardTitle: 'JustMe Milano Piatková Párty & VIP Stoly (320€–5.000€)',
    tiersHeading: 'Všetkých 8 Oficiálnych Cien · Večera 70€ & Xceed #249217',
    tiersSubheading: 'Rezervujte 70€ menu, 15€ aperitivo, 20€ club a stoly do 1.280€ priamo v eurách',
    dressShuttleHeading: 'Vstup 21+, Dlhé Nohavice & Bezplatná Doprava',
    dressShuttleSubheading: 'Prísna kontrola dokladov 21+ a elegantný odev na Viale Luigi Camoens 2',
    dressOkTitle: 'Odporúčaný Odev (Povolené)',
    dressNoTitle: 'Nepovolené pri Vstupe (21+)',
    shuttleHighlightTitle: 'Partnerské Parkovisko s Bezplatným Shuttlom',
    logisticsHeading: 'Cesta do JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Mapa · Torre Branca (Nie Via Messina 38)',
    faqHeading: 'Časté Otázky · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Zobraziť Profil JustMe Milano',
    thanksgivingTitle: 'Prídete aj vo Štvrtok 26.? Thanksgiving v JustMe',
    thanksgivingCta: 'Pozrieť 26 Nov',
    dec31Title: 'Silvester 31. Decembra v JustMe Milano?',
    dec31Cta: 'Pozrieť 31 Dec',
    orthodoxTitle: '13. Januára Pravoslávny Nový Rok v JustMe?',
    orthodoxCta: 'Pozrieť 13 Jan',
    heroLabels: [
      'Príchod hostí pod osvetlenú Torre Branca do JustMe Milano',
      'Vyhrievaná presklená sála s neapolskou večerou za 70€ o 21:30',
      'Živé spevácke vystúpenie Johna Vaccara medzi stolmi',
      'VIP stoly a piatková párty do 05:00 s DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Čo obsahuje menu za 70€ v piatok 27. novembra?',
        a: 'Spoločné predjedlá (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, guľôčky v omáčke), Mezzi Paccheri al ragù napoletano, citrónový sorbet, vodu, víno, kávu a vstup na párty od 23:00.',
      },
      {
        q: 'Koná sa akcia v JustMe Milano alebo v Pineta Via Messina 38?',
        a: 'Iba v JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli je partner z Neapola, nejde o klub Pineta Milano na Via Messina 38.',
      },
      {
        q: 'Prečo stojí piatkový Club 20€ a do kedy platí stôl Dehor?',
        a: 'V piatok (#249217) stojí Club + 1 Drink od 22:30 presne 20€, Aperitivo 15€, a pri 320€ stole Dehor je vstup povinný do 23:00.',
      },
    ],
  },
  sl: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Pet 27. nov 2026 v JustMe Milano: Cena Spettacolo Partenopea s Pineta Napoli, meni 70€, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea v JustMe Milano (Pineta Napoli)',
    subtitle: 'Petek, 27. november 2026 · 19:30 Vhod & Aperitivo · 21:30 Dinner Show · 23:00 Party do 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'V Sodelovanju s Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Petek, 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Meni 70€ · Aperitivo 15€ · Club 20€ · Mize 320€–5.000€',
    ageDressBadge: '21+ · Elegantno (dolge hlače obvezne za moške)',
    leadIntro: 'Po zmagoslavju v Neaplju prihaja slavna CSP · Cena Spettacolo Partenopea v JustMe Milano pod stolpom Torre Branca v petek, 27. novembra 2026, skupaj s Pineta Napoli.',
    extraNativeParagraph: 'Vrata se odprejo ob 19:30 za 15€ Aperitivo in sprejem na večerjo. Ob 21:30 se začne Dinner Show v živo z Johnom Vaccarom in neapeljskim menijem za 70€, od 23:00 do 05:00 pa vrtita DJ Franky Dee in Antonio Marigliano.',
    homeLabel: 'Domov',
    eventsLabel: 'Dogodki Milano',
    specialLabel: 'Posebni Večeri',
    ctaBuyNowLabel: 'Kupi Na Spletu (15€ – 1.280€)',
    ctaXceedLabel: 'Uradni Xceed #249217',
    ctaWhatsappLabel: '24/7 Večerja & VIP Concierge',
    ctaShuttleLabel: 'Brezplačen Parkirni Shuttle',
    tocTitle: 'Vodnik · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Pregled, Partnerstvo Pineta Napoli & Urnik',
      '2. Spletni Nakup v EUR (Meni 70€, Club 20€, Mize)',
      '3. Celoten Neapeljski Meni (70€) & Izvajalci',
      '4. Vseh 8 Uradnih Cen (15€–5.000€)',
      '5. Vstop 21+, Dress Code & Brezplačen Shuttle',
      '6. 100% Predplačilo & Takojšnja Potrditev',
      '7. Pogosta Vprašanja (12 FAQ)',
    ],
    quickLabels: ['Datum & Ure', 'Pravi Klub (Ne Via Messina)', '70€ Meni & Gosti', 'Starost & Obleka', 'Potrjene Cene', 'Brezplačen Shuttle'],
    overviewHeading: 'Pregled · Neapeljski Dinner Show v JustMe Milano',
    timelineHeading: 'Program Večera · Petek 27. November 2026',
    timelineSubheading: 'Od 19:30 aperitiva preko 21:30 večerje v živo do 05:00 zjutraj',
    timelineTitles: [
      '19:30 · Odprtje, 15€ Aperitivo + 1 Pijača & Sprejem Večerje',
      '21:30 · Začetek CSP Dinner Show · John Vaccaro V Živo & 70€ Meni',
      '22:30 · Petkov Vstop Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Omejitev Dehor',
      '00:30–05:00 · VIP Privé Mize & Glavno Plesišče',
    ],
    dinnerHeading: 'Neapeljski Meni (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Predjedi za deljenje, Mezzi Paccheri al ragù napoletano, sorbet iz Amalfija, voda, hišno vino, kava in zabava',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Meni 70€ + Party',
    tablesCardTitle: 'JustMe Milano Petkova Zabava & VIP Mize (320€–5.000€)',
    tiersHeading: 'Vseh 8 Potrjenih Tarif · Večerja 70€ & Xceed #249217',
    tiersSubheading: 'Rezervirajte 70€ večerjo, 15€ aperitivo, 20€ club in mize do 1.280€ neposredno v EUR',
    dressShuttleHeading: 'Politika 21+, Dolge Hlače & Brezplačen Shuttle',
    dressShuttleSubheading: 'Strog nadzor osebne izkaznice 21+ in svečana oblačila na Viale Luigi Camoens 2',
    dressOkTitle: 'Priporočena Garderoba (Dovoljeno)',
    dressNoTitle: 'Zavrnjeno na Vhodu (21+)',
    shuttleHighlightTitle: 'Partnersko Parkirišče z Brezplačnim Prevozom',
    logisticsHeading: 'Kako do JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Zemljevid · Torre Branca (Ne Via Messina 38)',
    faqHeading: 'Pogosta Vprašanja · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Odpri Profil JustMe Milano',
    thanksgivingTitle: 'Prihajate tudi v Četrtek 26.? Thanksgiving JustMe',
    thanksgivingCta: 'Poglej 26 Nov',
    dec31Title: 'Silvestrovo 31. Decembra v JustMe Milano?',
    dec31Cta: 'Poglej 31 Dec',
    orthodoxTitle: '13. Januar Pravoslavno Novo Leto v JustMe?',
    orthodoxCta: 'Poglej 13 Jan',
    heroLabels: [
      'Prihod gostov pod osvetljenim stolpom Torre Branca v JustMe Milano',
      'Ogrevan steklen paviljon med neapeljsko večerjo za 70€ ob 21:30',
      'Živi pevski nastop Johna Vaccara med slavnostnimi mizami',
      'VIP lože in petkova zabava do 05:00 z DJ Franky Deejem',
    ],
    nativeFaqs: [
      {
        q: 'Kaj vključuje meni za 70€ v petek, 27. novembra?',
        a: 'Predjedi za deljenje (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, mesne kroglice v omaki), Mezzi Paccheri al ragù napoletano, limonin sorbet, vodo, vino, kavo in vstop na zabavo od 23:00.',
      },
      {
        q: 'Ali je dogodek v JustMe Milano ali v Pineta klubu na Via Messina 38?',
        a: 'Izključno v JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli je gostujoči partner iz Neaplja, ne milanski Pineta na Via Messina 38.',
      },
      {
        q: 'Zakaj je petkova Club vstopnica 20€ in kakšen je rok za Dehor?',
        a: 'Ob petkih (#249217) stane Club + 1 Drink od 22:30 20€, Aperitivo 15€, za mizo Dehor (320€) pa je obvezen prihod pred 23:00.',
      },
    ],
  },
  sv: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Fre 27 nov 2026 på JustMe Milano: Cena Spettacolo Partenopea med Pineta Napoli, 70€ meny, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea på JustMe Milano (Pineta Napoli)',
    subtitle: 'Fredag 27 november 2026 · 19:30 Öppning & Aperitivo · 21:30 Live Dinner Show · 23:00 Party till 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'I Samarbete med Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Fredag 27 Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Meny 70€ · Aperitivo 15€ · Club 20€ · Bord 320€–5.000€',
    ageDressBadge: '21+ · Elegant (långbyxor obligatoriskt för herrar)',
    leadIntro: 'Efter att ha erövrat Neapel kommer den berömda CSP · Cena Spettacolo Partenopea till JustMe Milano vid Torre Branca fredag den 27 november 2026 i officiellt samarbete med Pineta Napoli.',
    extraNativeParagraph: 'Dörrarna öppnar 19:30 för 15€ Aperitivo och middagsgäster. Klockan 21:30 börjar en sprakande live Dinner Show med John Vaccaro och den kompletta napolitanska 70€-menyn, följt av nattklubb till 05:00 med DJ Franky Dee och Antonio Marigliano.',
    homeLabel: 'Hem',
    eventsLabel: 'Event Milano',
    specialLabel: 'Specialkvällar',
    ctaBuyNowLabel: 'Köp Online (15€ – 1.280€)',
    ctaXceedLabel: 'Officiell Xceed #249217',
    ctaWhatsappLabel: '24/7 Middag & VIP Concierge',
    ctaShuttleLabel: 'Gratis Parkerings-Shuttle',
    tocTitle: 'Eventguide · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Översikt, Pineta Napoli Samarbete & Schema',
      '2. Köp Direkt i EUR (70€ Meny, 20€ Club, Bord)',
      '3. Komplett Napolitansk 70€-Meny & Artister',
      '4. Alla 8 Officiella Priser & VIP-Bord (15€–5.000€)',
      '5. Åldersgräns 21+, Klädkod & Gratis Shuttle',
      '6. 100% Förskottsbetalning & Direktbekräftelse',
      '7. Vanliga Frågor (12 FAQ)',
    ],
    quickLabels: ['Datum & Tider', 'Exakt Plats (Ej Via Messina)', '70€ Meny & Line-up', 'Ålder & Klädkod', 'Priser', 'Gratis Shuttle'],
    overviewHeading: 'Översikt · Napolitansk Dinner Show intar JustMe Milano',
    timelineHeading: 'Kvällens Schema · Fredag 27 November 2026',
    timelineSubheading: 'Från 19:30 aperitivo över 21:30 middag till klubbfest fram till 05:00',
    timelineTitles: [
      '19:30 · Entrén Öppnar, 15€ Aperitivo & Middagsmottagning',
      '21:30 · Start CSP Dinner Show · John Vaccaro Live & 70€ Meny',
      '22:30 · Fredag Club + 1 Drink Entré (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor-Gräns',
      '00:30–05:00 · VIP Privé-Bord & Stora Dansgolvet',
    ],
    dinnerHeading: 'Komplett Napolitansk Meny (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Delade förrätter, Mezzi Paccheri al ragù napoletano, Amalfi-citronsorbet, vatten, husets vin, kaffe och klubbinträde',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Meny + Party',
    tablesCardTitle: 'JustMe Milano Fredagsfest & VIP-Bord (320€–5.000€)',
    tiersHeading: 'Alla 8 Officiella Priser · 70€ Middag & Xceed #249217',
    tiersSubheading: 'Boka 70€ middag, 15€ aperitivo, 20€ club och bord upp till 1.280€ direkt på sajten',
    dressShuttleHeading: 'Åldersgräns 21+, Långbyxor & Gratis Pendelbuss',
    dressShuttleSubheading: 'Strikt 21+ legitimation och välklädd stil på Viale Luigi Camoens 2',
    dressOkTitle: 'Rekommenderad Klädsel (Tillåtet)',
    dressNoTitle: 'Nekas i Dörren (21+)',
    shuttleHighlightTitle: 'Partnerparkering med Gratis Shuttle tur och retur',
    logisticsHeading: 'Hitta till JustMe Milano · Tunnelbana, Taxi & Shuttle',
    mapHeading: 'GPS Karta · Torre Branca (Inte Via Messina 38)',
    faqHeading: 'Vanliga Frågor · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Öppna JustMe Milano Dossier',
    thanksgivingTitle: 'Kommer du Torsdag 26 också? Se Thanksgiving JustMe',
    thanksgivingCta: 'Se 26 Nov',
    dec31Title: 'Nyårsafton 31 December på JustMe Milano?',
    dec31Cta: 'Se 31 Dec',
    orthodoxTitle: '13 Januari Ortodoxt Nyår på JustMe Milano?',
    orthodoxCta: 'Se 13 Jan',
    heroLabels: [
      'Gäster anländer under upplysta Torre Branca till JustMe Milano',
      'Uppvärmd glaspaviljong för den napolitanska 70€-middagen kl 21:30',
      'Live-sångshow med John Vaccaro mellan de dukade middagsborden',
      'VIP-bord och fredagsfest till 05:00 med DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Vad ingår i 70€-menyn på fredagen den 27 november?',
        a: 'Förrätter att dela (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, köttbullar i tomatsås), Mezzi Paccheri al ragù napoletano, Amalfi-citronsorbet, vatten, husets vin, kaffe och klubb från 23:00.',
      },
      {
        q: 'Hålls eventet på JustMe Milano eller på Pineta Club Via Messina 38?',
        a: 'Endast på JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli är gästpartner från Neapel och inte Pineta Milano på Via Messina 38.',
      },
      {
        q: 'Varför kostar Club-biljetten 20€ på fredagen och vad gäller för Dehor?',
        a: 'På fredagar (#249217) kostar Club + 1 Drink från 22:30 20€, Aperitivo 15€, och 320€ Dehor-bord kräver ankomst före kl 23:00.',
      },
    ],
  },
  no: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Fre 27. nov 2026 på JustMe Milano: Cena Spettacolo Partenopea med Pineta Napoli, 70€ meny, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea på JustMe Milano (Pineta Napoli)',
    subtitle: 'Fredag 27. november 2026 · 19:30 Dører & Aperitivo · 21:30 Live Dinner Show · 23:00 Party til 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'I Samarbeid med Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Fredag 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Meny 70€ · Aperitivo 15€ · Club 20€ · Bord 320€–5.000€',
    ageDressBadge: '21+ · Elegant (langbukse påkrevd for menn)',
    leadIntro: 'Etter å ha erobret Napoli kommer den kjente CSP · Cena Spettacolo Partenopea til JustMe Milano ved Torre Branca fredag 27. november 2026 i samarbeid med Pineta Napoli.',
    extraNativeParagraph: 'Dørene åpner kl. 19:30 for 15€ Aperitivo og middagsgjester. Kl. 21:30 starter live Dinner Show med John Vaccaro og den komplette 70€ napolitanske menyen, før DJ Franky Dee og Antonio Marigliano tar over til 05:00.',
    homeLabel: 'Hjem',
    eventsLabel: 'Eventer Milano',
    specialLabel: 'Spesialkvelder',
    ctaBuyNowLabel: 'Kjøp Online (15€ – 1.280€)',
    ctaXceedLabel: 'Offisiell Xceed #249217',
    ctaWhatsappLabel: '24/7 Middag & VIP Concierge',
    ctaShuttleLabel: 'Gratis Parkerings-Shuttle',
    tocTitle: 'Eventguide · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Oversikt, Pineta Napoli Samarbeid & Program',
      '2. Direkte Betaling i EUR (70€ Meny, 20€ Club, Bord)',
      '3. Komplett Napolitansk Meny (70€) & Artister',
      '4. Alle 8 Offisielle Priser & VIP-Bord (15€–5.000€)',
      '5. 21+ Aldersgrense, Kleskode & Gratis Shuttle',
      '6. 100% Forhåndsbetaling & Rask Bekreftelse',
      '7. Ofte Stilte Spørsmål (12 FAQ)',
    ],
    quickLabels: ['Dato & Tider', 'Riktig Sted (Ikke Via Messina)', '70€ Meny & Line-up', 'Alder & Antrekk', 'Priser', 'Gratis Shuttle'],
    overviewHeading: 'Oversikt · Napolitansk Dinner Show på JustMe Milano',
    timelineHeading: 'Kveldens Program · Fredag 27. November 2026',
    timelineSubheading: 'Fra 19:30 aperitivo og 21:30 live show-middag til 05:00 klubbstenging',
    timelineTitles: [
      '19:30 · Dører Åpner, 15€ Aperitivo + 1 Drink & Middagsmottak',
      '21:30 · Start CSP Dinner Show · John Vaccaro Live & 70€ Meny',
      '22:30 · Fredag Club + 1 Drink Inngang (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor-Frist',
      '00:30–05:00 · VIP Privé Bord & Hoveddansegulv',
    ],
    dinnerHeading: 'Komplett Napolitansk Meny (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Deleforretter, Mezzi Paccheri al ragù napoletano, Amalfi-sitronsorbet, vann, husets vin, kaffe og festadgang',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Meny + Party',
    tablesCardTitle: 'JustMe Milano Fredagsfest & VIP Bord (320€–5.000€)',
    tiersHeading: 'Alle 8 Offisielle Tariffer · 70€ Middag & Xceed #249217',
    tiersSubheading: 'Kjøp 70€ middag, 15€ aperitivo, 20€ club og bord opptil 1.280€ direkte i EUR på siden',
    dressShuttleHeading: '21+ Regler, Langbukse Påbudt & Gratis Shuttle',
    dressShuttleSubheading: 'Streng 21+ ID-kontroll og elegant antrekk ved Viale Luigi Camoens 2',
    dressOkTitle: 'Anbefalt Antrekk (Tillatt)',
    dressNoTitle: 'Avvist i Døren (21+)',
    shuttleHighlightTitle: 'Partnerparkering med Gratis Shuttle Tur/Retur',
    logisticsHeading: 'Veien til JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Kart · Torre Branca (Ikke Via Messina 38)',
    faqHeading: 'Ofte Stilte Spørsmål · Cena Spettacolo Partenopea',
    venueCta: 'Se JustMe Milano Profil',
    thanksgivingTitle: 'Kommer du også Torsdag 26.? Se Thanksgiving JustMe',
    thanksgivingCta: 'Se 26 Nov',
    dec31Title: 'Nyttårsaften 31. Desember på JustMe Milano?',
    dec31Cta: 'Se 31 Des',
    orthodoxTitle: '13. Januar Ortodoks Nyttår på JustMe?',
    orthodoxCta: 'Se 13 Jan',
    heroLabels: [
      'Gjester ankommer under opplyste Torre Branca på JustMe Milano',
      'Oppvarmet glasspaviljong til den napolitanske 70€-middagen kl. 21:30',
      'Live vokalshow med John Vaccaro blant de levende lysene',
      'VIP-bord og fredagsfest til 05:00 med DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Hva inneholder 70€-menyen fredag 27. november?',
        a: 'Deleforretter (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, kjøttboller i saus), Mezzi Paccheri al ragù napoletano, sitronsorbet fra Amalfi, vann, husets vin, kaffe og festadgang fra 23:00.',
      },
      {
        q: 'Er arrangementet på JustMe Milano eller på Pineta Via Messina 38?',
        a: 'Kun på JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli er gjestepartner fra Napoli, ikke Pineta Club i Via Messina 38.',
      },
      {
        q: 'Hvorfor koster Club-billett 20€ på fredag og hva er Dehor-kravet?',
        a: 'Fredag (#249217) koster Club + 1 Drink fra 22:30 20€, Aperitivo 15€, og 320€ Dehor-bord krever ankomst før kl. 23:00.',
      },
    ],
  },
  is: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Mílanó | 27 Nóv · 70€',
    metaDescription: `Fös 27. nóv 2026 á JustMe Mílanó: Cena Spettacolo Partenopea með Pineta Napoli, 70€ matseðill, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea á JustMe Milano (Pineta Napoli)',
    subtitle: 'Föstudagur 27. nóvember 2026 · 19:30 Opnun & Aperitivo · 21:30 Dinner Show · 23:00 Party til 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Í Samstarfi við Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Föstudagur 27. Nóv 2026 · 19:30 / 05:00',
    priceBadge: 'Matseðill 70€ · Aperitivo 15€ · Club 20€ · Borð 320€–5.000€',
    ageDressBadge: '21+ · Glæsilegt (síðbuxur skylda fyrir karlmenn)',
    leadIntro: 'Eftir að hafa slegið í gegn í Napólí kemur hin fræga CSP · Cena Spettacolo Partenopea á JustMe Milano við Torre Branca föstudaginn 27. nóvember 2026 í samstarfi við Pineta Napoli.',
    extraNativeParagraph: 'Húsið opnar kl. 19:30 fyrir 15€ Aperitivo og kvöldverðargesti. Kl. 21:30 hefst Dinner Show með John Vaccaro og 70€ matseðli frá Napólí, og kl. 23:00–05:00 taka DJ Franky Dee og Antonio Marigliano við.',
    homeLabel: 'Heim',
    eventsLabel: 'Viðburðir Mílanó',
    specialLabel: 'Sérkvöld',
    ctaBuyNowLabel: 'Kaupa Á Netinu (15€ – 1.280€)',
    ctaXceedLabel: 'Opinber Xceed #249217',
    ctaWhatsappLabel: '24/7 Kvöldverður & VIP',
    ctaShuttleLabel: 'Ókeypis Bílastæða-Shuttle',
    tocTitle: 'Viðburðarleiðbeiningar · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Yfirlit, Pineta Napoli Samstarf & Dagskrá',
      '2. Greiða Á Netinu í EUR (70€ Matur, 20€ Club, Borð)',
      '3. Fullur 70€ Napólí Matseðill & Listamenn',
      '4. Öll 8 Staðfest Verð & VIP Borð (15€–5.000€)',
      '5. Aldurstakmark 21+, Klæðaburður & Ókeypis Skutla',
      '6. 100% Fyrirframgreiðsla & Staðfesting',
      '7. Algengar Spurningar (12 FAQ)',
    ],
    quickLabels: ['Dagsetning & Tímar', 'Réttur Staður (Ekki Via Messina)', '70€ Matseðill', 'Aldur & Klæðnaður', 'Staðfest Verð', 'Ókeypis Skutla'],
    overviewHeading: 'Yfirlit · Napólí Kvöldverðarsýning á JustMe Milano',
    timelineHeading: 'Dagskrá Kvöldsins · Föstudagur 27. Nóvember 2026',
    timelineSubheading: 'Frá 19:30 fordrykk um 21:30 kvöldverðarsýningu til 05:00 um morguninn',
    timelineTitles: [
      '19:30 · Húsið Opnar, 15€ Aperitivo + 1 Drykkur & Móttaka',
      '21:30 · CSP Dinner Show Hefst · John Vaccaro Í Beinni & 70€ Matseðill',
      '22:30 · Föstudags Club + 1 Drink Inngangur (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Dehor Tímamörk',
      '00:30–05:00 · VIP Privé Borð & Dansgólf',
    ],
    dinnerHeading: 'Napólí Matseðill (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Forréttir til að deila, Mezzi Paccheri al ragù napoletano, Amalfi sítrónusorbet, vatn, vín hússins, kaffi og aðgangur að partíi',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · 70€ Matseðill + Party',
    tablesCardTitle: 'JustMe Milano Föstudagspartí & VIP Borð (320€–5.000€)',
    tiersHeading: 'Öll 8 Staðfest Verð · Kvöldverður 70€ & Xceed #249217',
    tiersSubheading: 'Bókaðu 70€ kvöldverð, 15€ aperitivo, 20€ club og borð allt að 1.280€ beint í evrum á síðunni',
    dressShuttleHeading: '21+ Innganga, Síðbuxur Skylda & Ókeypis Skutla',
    dressShuttleSubheading: 'Strangt 21+ skilríkjaeftirlit og glæsilegur klæðnaður við Viale Luigi Camoens 2',
    dressOkTitle: 'Mælt Með Klæðnaði (Leyft)',
    dressNoTitle: 'Synjað Við Dyrnar (21+)',
    shuttleHighlightTitle: 'Samstarfsbílastæði Með Ókeypis Skutluþjónustu',
    logisticsHeading: 'Leiðin á JustMe Milano · Neðanjarðarlest, Leigubíll & Skutla',
    mapHeading: 'GPS Kort · Torre Branca (Ekki Via Messina 38)',
    faqHeading: 'Algengar Spurningar · Cena Spettacolo Partenopea',
    venueCta: 'Skoða JustMe Milano Upplýsingasíðu',
    thanksgivingTitle: 'Kemurðu líka Fimmtudag 26.? Skoðaðu Thanksgiving JustMe',
    thanksgivingCta: 'Skoða 26 Nóv',
    dec31Title: 'Gamlárskvöld 31. Desember á JustMe Milano?',
    dec31Cta: 'Skoða 31 Des',
    orthodoxTitle: '13. Janúar Rétttrúnaðarnýár á JustMe?',
    orthodoxCta: 'Skoða 13 Jan',
    heroLabels: [
      'Gestir koma undir upplýsta Torre Branca við JustMe Milano',
      'Upphitaður glersalur með 70€ Napólí kvöldverði kl. 21:30',
      'Söngsýning John Vaccaro í beinni á milli borðanna',
      'VIP borð og föstudagsdansgólf til 05:00 með DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Hvað felst í 70€ matseðlinum föstudaginn 27. nóvember?',
        a: 'Deiliforréttir (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, kjötbollur í sósu), Mezzi Paccheri al ragù napoletano, Amalfi sítrónusorbet, vatn, vín, kaffi og aðgangur að dansleik kl. 23:00.',
      },
      {
        q: 'Fer viðburðurinn fram á JustMe Milano eða Pineta Via Messina 38?',
        a: 'Eingöngu á JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli er gestasamstarfsaðili frá Napólí en ekki Pineta Club í Via Messina 38.',
      },
      {
        q: 'Af hverju kostar Club miðinn 20€ á föstudegi og hvað gildir um Dehor?',
        a: 'Á föstudegi (#249217) kostar Club + 1 Drink frá 22:30 20€, Aperitivo 15€, og gestir með 320€ Dehor borð þurfa að mæta fyrir kl. 23:00.',
      },
    ],
  },
  uk: {
    metaTitle: 'Вечеря-Шоу Partenopea JustMe Мілан | 27 Лис · 70€',
    metaDescription: `Пт 27 лис 2026 у JustMe Мілан: Cena Spettacolo Partenopea з Pineta Napoli, меню 70€, Party 23:00 (20€). Квитки ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea у JustMe Milano (Pineta Napoli)',
    subtitle: 'П’ятниця 27 листопада 2026 · 19:30 Аперитив · 21:30 Жива Вечеря-Шоу · 23:00 Вечірка до 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Спільно з Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'П’ятниця, 27 Лис 2026 · 19:30 / 05:00',
    priceBadge: 'Меню 70€ · Аперитив 15€ · Клуб 20€ · Столи 320€–5.000€',
    ageDressBadge: '21+ · Елегантний стиль (довгі штани обов’язкові для чоловіків)',
    leadIntro: 'Підкоривши Неаполь, відома CSP · Cena Spettacolo Partenopea прибуває до JustMe Milano під вежею Torre Branca у п’ятницю, 27 листопада 2026 року, у партнерстві з Pineta Napoli.',
    extraNativeParagraph: 'Двері відчиняються о 19:30 для Аперитиву 15€ та прийому гостей вечері. О 21:30 стартує Dinner Show наживо з John Vaccaro та неаполітанським меню 70€, а з 23:00 до 05:00 грають DJ Franky Dee та Antonio Marigliano.',
    homeLabel: 'Головна',
    eventsLabel: 'Події Мілан',
    specialLabel: 'Спецподії',
    ctaBuyNowLabel: 'Купити Онлайн (15€ – 1.280€)',
    ctaXceedLabel: 'Офіційний Xceed #249217',
    ctaWhatsappLabel: 'Консьєрж Вечері & VIP 24/7',
    ctaShuttleLabel: 'Безкоштовний Шатл з Парковки',
    tocTitle: 'Гід Вечора · Cena Spettacolo Partenopea JustMe Мілан',
    tocLabels: [
      '1. Огляд, Партнерство Pineta Napoli та Програма',
      '2. Онлайн-Оплата Меню 70€, Клубу 20€ та Столів',
      '3. Повне Неаполітанське Меню (70€) і Артисти',
      '4. Усі 8 Офіційних Тарифів (15€–5.000€)',
      '5. Дрес-код 21+, Безкоштовний Шатл та Карта',
      '6. Умови 100% Передоплати та Підтвердження',
      '7. Часті Питання (12 FAQ)',
    ],
    quickLabels: ['Дата і Час', 'Точна Локація (Не Via Messina)', 'Меню 70€ та Гості', 'Вік і Дрес-код', 'Офіційні Ціни', 'Безкоштовний Шатл'],
    overviewHeading: 'Огляд · Знаменита Неаполітанська Вечеря-Шоу в JustMe Milano',
    timelineHeading: 'Розклад Ночі · П’ятниця 27 Листопада 2026',
    timelineSubheading: 'Від аперитиву о 19:30 та вечері о 21:30 до фіналу танців о 05:00 ранку',
    timelineTitles: [
      '19:30 · Відкриття, 15€ Аперитив + 1 Напій & Прийом на Вечерю',
      '21:30 · Старт CSP Dinner Show · John Vaccaro Наживо & Меню 70€',
      '22:30 · П’ятничний Вхід Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Ліміт Dehor',
      '00:30–05:00 · VIP Столи Privé та Головний Танцпол',
    ],
    dinnerHeading: 'Повне Неаполітанське Меню (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Спільні закуски, Mezzi Paccheri al ragù napoletano, лимонний сорбет Амальфі, вода, домашнє вино, кава та вечірка',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Меню 70€ + Party',
    tablesCardTitle: 'JustMe Milano П’ятнична Вечірка & VIP Столи (320€–5.000€)',
    tiersHeading: 'Усі 8 Офіційних Тарифів · Вечеря 70€ & Xceed #249217',
    tiersSubheading: 'Купуйте меню 70€, аперитив 15€, клуб 20€ та столи 320€–1.280€ онлайн в євро без комісій',
    dressShuttleHeading: 'Правила 21+, Довгі Штани та Безкоштовний Шатл',
    dressShuttleSubheading: 'Обов’язковий оригінал документа 21+ та елегантний одяг на Viale Luigi Camoens 2',
    dressOkTitle: 'Рекомендований Одяг (Дозволено)',
    dressNoTitle: 'Заборонено на Вході (21+)',
    shuttleHighlightTitle: 'Парковка-Партнер з Безкоштовним Трансфером до Клубу',
    logisticsHeading: 'Як Дістатися до JustMe Milano · Метро, Таксі & Шатл',
    mapHeading: 'GPS Карта · Torre Branca (Не Via Messina 38)',
    faqHeading: 'Часті Запитання · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Профіль Клубу JustMe Milano',
    thanksgivingTitle: 'Приходите також у Четвер 26? Thanksgiving JustMe',
    thanksgivingCta: 'Дивитись 26 Лис',
    dec31Title: 'Новий Рік 31 Грудня в JustMe Milano?',
    dec31Cta: 'Дивитись 31 Гру',
    orthodoxTitle: '13 Січня Старий Новий Рік у JustMe Milano?',
    orthodoxCta: 'Дивитись 13 Січ',
    heroLabels: [
      'Прибуття гостей під освітлену вежу Torre Branca у JustMe Milano',
      'Теплий скляний павільйон з неаполітанською вечерею за 70€ о 21:30',
      'Живий вокал John Vaccaro серед святкових столів вечері',
      'VIP ложі Privé і п’ятнична вечірка до 05:00 з DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Що входить у меню за 70€ у п’ятницю 27 листопада?',
        a: 'Спільні закуски (баклажани парміджана, моцарела буфала, восьминожки алла Лучана, м’ясні кульки в соусі), Mezzi Paccheri al ragù napoletano, сорбет Амальфі, вода, вино, кава і вечірка з 23:00.',
      },
      {
        q: 'Подія відбувається в JustMe Milano чи у Pineta на Via Messina 38?',
        a: 'Тільки в JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli є партнером із Неаполя і не стосується клубу Pineta на Via Messina 38.',
      },
      {
        q: 'Чому вхід Club у п’ятницю коштує 20€ та який ліміт для столу Dehor?',
        a: 'У п’ятницю (#249217) квиток Club + 1 Drink з 22:30 коштує 20€, Аперитив 15€, а гості столів Dehor (320€) мають зайти до 23:00.',
      },
    ],
  },
  sq: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nën · 70€',
    metaDescription: `E premte 27 nën 2026 në JustMe Milano: Cena Spettacolo Partenopea me Pineta Napoli, menu 70€, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea në JustMe Milano (Pineta Napoli)',
    subtitle: 'E premte, 27 nëntor 2026 · 19:30 Dyers & Aperitivo · 21:30 Dinner Show Live · 23:00 Party deri 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Në Bashkëpunim me Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'E premte, 27 Nën 2026 · 19:30 / 05:00',
    priceBadge: 'Menu 70€ · Aperitivo 15€ · Club 20€ · Tavolina 320€–5.000€',
    ageDressBadge: '21+ · Elegante (pantallona të gjata të detyrueshme për burra)',
    leadIntro: 'Pasi pushtoi Napolin, e famshmja CSP · Cena Spettacolo Partenopea mbërrin në JustMe Milano poshtë kullës Torre Branca të premten më 27 nëntor 2026 në bashkëpunim me Pineta Napoli.',
    extraNativeParagraph: 'Dyert hapen në 19:30 për Aperitivo 15€ dhe pritjen e darkës. Në 21:30 nis Dinner Show live me John Vaccaro dhe menunë napolitane 70€, ndërsa nga 23:00 deri në 05:00 vazhdojnë DJ Franky Dee dhe Antonio Marigliano.',
    homeLabel: 'Kreu',
    eventsLabel: 'Eventet Milano',
    specialLabel: 'Mbrëmje Speciale',
    ctaBuyNowLabel: 'Bli Online (15€ – 1.280€)',
    ctaXceedLabel: 'Kanali Zyrtar Xceed #249217',
    ctaWhatsappLabel: 'Concierge Darkë & VIP 24/7',
    ctaShuttleLabel: 'Shuttle Falas Parkingu',
    tocTitle: 'Udhëzuesi · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Përmbledhja, Bashkëpunimi Pineta Napoli & Orari',
      '2. Blerja Online në EUR (Menu 70€, Club 20€, Tavolina)',
      '3. Menuja e Plotë Napolitane (70€) & Artistët',
      '4. Të 8 Tarifat Zyrtare të Konfirmuara (15€–5.000€)',
      '5. Rregullat 21+, Dress Code & Shuttle Falas',
      '6. Parapagesa 100% & Konfirmimi i Menjëhershëm',
      '7. Pyetjet e Shpeshta (12 FAQ)',
    ],
    quickLabels: ['Data & Oraret', 'Lokali i Saktë (Jo Via Messina)', 'Menu 70€ & Yjet', 'Mosha & Veshja', 'Çmimet Zyrtare', 'Shuttle Falas'],
    overviewHeading: 'Përmbledhja · Darka Spektakël Napolitane në JustMe Milano',
    timelineHeading: 'Programi i Mbrëmjes · E Premte 27 Nëntor 2026',
    timelineSubheading: 'Nga aperitivi 19:30 te darka live 21:30 dhe festa deri në 05:00 të mëngjesit',
    timelineTitles: [
      '19:30 · Hapja e Dyerve, 15€ Aperitivo + 1 Pije & Pritja e Darkës',
      '21:30 · Nisja CSP Dinner Show · John Vaccaro Live & Menu 70€',
      '22:30 · Hyrja Club e së Premtes + 1 Pije (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Limiti Dehor',
      '00:30–05:00 · Tavolinat VIP Privé & Pista Kryesore',
    ],
    dinnerHeading: 'Menuja e Plotë Napolitane (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Antipasta për të ndarë, Mezzi Paccheri al ragù napoletano, sorbet limoni Amalfi, ujë, verë shtëpie, kafe dhe party',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Menu 70€ + Party',
    tablesCardTitle: 'JustMe Milano Party i së Premtes & Tavolina VIP (320€–5.000€)',
    tiersHeading: 'Të 8 Tarifat Zyrtare · Darka 70€ & Xceed #249217',
    tiersSubheading: 'Rezervoni online menunë 70€, aperitivon 15€, club 20€ dhe tavolinat deri në 1.280€ në euro',
    dressShuttleHeading: 'Hyrja 21+, Pantallona të Gjata & Shuttle Falas',
    dressShuttleSubheading: 'Dokument origjinal 21+ dhe veshje elegante në Viale Luigi Camoens 2',
    dressOkTitle: 'Veshja e Rekomanduar (Pranohet)',
    dressNoTitle: 'Refuzohet në Hyrje (21+)',
    shuttleHighlightTitle: 'Parking Partner me Shërbim Shuttle Falas Vajtje-Ardhje',
    logisticsHeading: 'Si të Arrini në JustMe Milano · Metro, Taksi & Shuttle',
    mapHeading: 'Harta GPS · Torre Branca (Jo Via Messina 38)',
    faqHeading: 'Pyetjet e Shpeshta · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Shiko Profilin JustMe Milano',
    thanksgivingTitle: 'Vini edhe të Enjten 26? Shiko Thanksgiving JustMe',
    thanksgivingCta: 'Shiko 26 Nën',
    dec31Title: 'Viti i Ri 31 Dhjetor në JustMe Milano?',
    dec31Cta: 'Shiko 31 Dhj',
    orthodoxTitle: '13 Janar Viti i Ri Ortodoks në JustMe?',
    orthodoxCta: 'Shiko 13 Jan',
    heroLabels: [
      'Mbërritja e të ftuarve nën Torre Branca te JustMe Milano',
      'Salla e ngrohur prej xhami për darkën napolitane 70€ në 21:30',
      'Performanca vokale live nga John Vaccaro mes tavolinave',
      'Tavolinat VIP dhe festa e së premtes deri 05:00 me DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Çfarë përfshin menuja prej 70€ të premten më 27 nëntor?',
        a: 'Antipasta të përbashkëta (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, qofte me salcë), Mezzi Paccheri al ragù napoletano, sorbet limoni, ujë, verë shtëpie, kafe dhe hyrjen në party nga ora 23:00.',
      },
      {
        q: 'A zhvillohet eventi në JustMe Milano apo te Pineta në Via Messina 38?',
        a: 'Vetëm në JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli është partner nga Napoli, ndërsa Pineta Club në Via Messina 38 është lokal tjetër.',
      },
      {
        q: 'Pse bileta Club kushton 20€ të premten dhe cili është afati Dehor?',
        a: 'Të premten (#249217) Club + 1 Drink pas orës 22:30 kushton 20€, Aperitivo 15€, dhe tavolinat Dehor 320€ kërkojnë hyrje para orës 23:00.',
      },
    ],
  },
  sr: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Pet 27. nov 2026 u JustMe Milano: Cena Spettacolo Partenopea uz Pineta Napoli, meni 70€, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea u JustMe Milano (Pineta Napoli)',
    subtitle: 'Petak, 27. novembar 2026 · 19:30 Aperitiv · 21:30 Live Dinner Show · 23:00 Party do 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'U Saradnji sa Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Petak, 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Meni 70€ · Aperitiv 15€ · Club 20€ · Stolovi 320€–5.000€',
    ageDressBadge: '21+ · Elegantno (dugačke pantalone obavezne za muškarce)',
    leadIntro: 'Nakon osvajanja Napulja, čuvena CSP · Cena Spettacolo Partenopea stiže u JustMe Milano ispod tornja Torre Branca u petak, 27. novembra 2026, u saradnji sa Pineta Napoli.',
    extraNativeParagraph: 'Vrata se otvaraju u 19:30 za 15€ Aperitiv i prijem večere. U 21:30 počinje Dinner Show uživo sa Johnom Vaccarom i napuljskim menijem od 70€, a od 23:00 do 05:00 nastupaju DJ Franky Dee i Antonio Marigliano.',
    homeLabel: 'Početna',
    eventsLabel: 'Događaji Milano',
    specialLabel: 'Specijalne Noći',
    ctaBuyNowLabel: 'Kupi Online (15€ – 1.280€)',
    ctaXceedLabel: 'Zvanični Xceed #249217',
    ctaWhatsappLabel: '24/7 Večera & VIP Concierge',
    ctaShuttleLabel: 'Besplatan Parking Shuttle',
    tocTitle: 'Vodič Večeri · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Pregled, Saradnja Pineta Napoli & Raspored',
      '2. Online Plaćanje u EUR (Meni 70€, Club 20€, Stolovi)',
      '3. Kompletan Napuljski Meni (70€) & Izvođači',
      '4. Svih 8 Zvaničnih Tarifa (15€–5.000€)',
      '5. Pravila 21+, Dress Code & Besplatan Shuttle',
      '6. 100% Avansna Uplata & Brza Potvrda',
      '7. Česta Pitanja (12 FAQ)',
    ],
    quickLabels: ['Datum & Vreme', 'Tačna Lokacija (Ne Via Messina)', '70€ Meni & Gosti', 'Godine & Garderoba', 'Cene', 'Besplatan Shuttle'],
    overviewHeading: 'Pregled · Napuljski Dinner Show u JustMe Milano',
    timelineHeading: 'Raspored Večeri · Petak 27. Novembar 2026',
    timelineSubheading: 'Od 19:30 aperitiva preko 21:30 večere uživo do 05:00 ujutro',
    timelineTitles: [
      '19:30 · Otvaranje, 15€ Aperitiv + 1 Piće & Prijem za Večeru',
      '21:30 · Početak CSP Dinner Show · John Vaccaro Uživo & 70€ Meni',
      '22:30 · Ulaz Petak Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Granica Dehor',
      '00:30–05:00 · VIP Privé Stolovi & Glavni Podijum',
    ],
    dinnerHeading: 'Kompletan Napuljski Meni (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Predjela za deljenje, Mezzi Paccheri al ragù napoletano, sorbe od limuna Amalfija, voda, kućno vino, kafa i ulaz na žurku',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Meni 70€ + Party',
    tablesCardTitle: 'JustMe Milano Petak Party & VIP Stolovi (320€–5.000€)',
    tiersHeading: 'Svih 8 Potvrđenih Cena · Večera 70€ & Xceed #249217',
    tiersSubheading: 'Rezervišite 70€ meni, 15€ aperitiv, 20€ club i stolove do 1.280€ direktno u evrima na sajtu',
    dressShuttleHeading: 'Politika 21+, Duge Pantalone & Besplatan Shuttle',
    dressShuttleSubheading: 'Stroga 21+ provera dokumenta i elegantna garderoba u Viale Luigi Camoens 2',
    dressOkTitle: 'Preporučena Garderoba (Dozvoljeno)',
    dressNoTitle: 'Zabranjeno na Ulazu (21+)',
    shuttleHighlightTitle: 'Partnerski Parking sa Besplatnim Prevozom do Kluba',
    logisticsHeading: 'Kako Stići do JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Mapa · Torre Branca (Nije Via Messina 38)',
    faqHeading: 'Česta Pitanja · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Pogledaj Profil JustMe Milano',
    thanksgivingTitle: 'Dolazite i u Četvrtak 26.? Thanksgiving u JustMe',
    thanksgivingCta: 'Vidi 26 Nov',
    dec31Title: 'Doček Nove Godine 31. Decembra u JustMe Milano?',
    dec31Cta: 'Vidi 31 Dec',
    orthodoxTitle: '13. Januar Pravoslavna Nova Godina u JustMe?',
    orthodoxCta: 'Vidi 13 Jan',
    heroLabels: [
      'Dolazak gostiju ispod osvetljenog tornja Torre Branca u JustMe Milano',
      'Grejani stakleni paviljon sa napuljskom večerom od 70€ u 21:30',
      'Živi vokalni nastup Johna Vaccara među svečanim stolovima',
      'VIP lože i petak žurka do 05:00 uz DJ Franky Deeja',
    ],
    nativeFaqs: [
      {
        q: 'Šta uključuje meni od 70€ u petak 27. novembra?',
        a: 'Predjela za sto (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, ćufte u sosu), Mezzi Paccheri al ragù napoletano, sorbe od limuna Amalfi, vodu, kućno vino, kafu i ostanak na žurci od 23:00.',
      },
      {
        q: 'Da li je događaj u JustMe Milano ili u Pineta klubu u Via Messina 38?',
        a: 'Isključivo u JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli je gostujući partner iz Napulja i nema veze sa klubom Pineta u Via Messina 38.',
      },
      {
        q: 'Zašto ulaznica Club petkom košta 20€ i do kada važi Dehor sto?',
        a: 'Petkom (#249217) Club + 1 Drink od 22:30 košta 20€, Aperitiv 15€, dok 320€ Dehor sto zahteva ulazak pre 23:00.',
      },
    ],
  },
  bs: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Milano | 27 Nov · 70€',
    metaDescription: `Pet 27. nov 2026 u JustMe Milano: Cena Spettacolo Partenopea uz Pineta Napoli, meni 70€, Party 23:00 (20€). Info ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea u JustMe Milano (Pineta Napoli)',
    subtitle: 'Petak, 27. novembar 2026 · 19:30 Aperitiv · 21:30 Live Dinner Show · 23:00 Party do 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'U Saradnji s Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Petak, 27. Nov 2026 · 19:30 / 05:00',
    priceBadge: 'Meni 70€ · Aperitiv 15€ · Club 20€ · Stolovi 320€–5.000€',
    ageDressBadge: '21+ · Elegantno (duge hlače obavezne za muškarce)',
    leadIntro: 'Nakon osvajanja Napulja, čuvena CSP · Cena Spettacolo Partenopea stiže u JustMe Milano ispod Torre Branca tornja u petak, 27. novembra 2026, u saradnji sa Pineta Napoli.',
    extraNativeParagraph: 'Vrata se otvaraju u 19:30 za 15€ Aperitiv i prijem gostiju večere. U 21:30 počinje Dinner Show uživo uz Johna Vaccara i kompletan napuljski meni od 70€, a od 23:00 do 05:00 nastupaju DJ Franky Dee i Antonio Marigliano.',
    homeLabel: 'Početna',
    eventsLabel: 'Događaji Milano',
    specialLabel: 'Specijalne Noći',
    ctaBuyNowLabel: 'Kupi Online (15€ – 1.280€)',
    ctaXceedLabel: 'Službeni Xceed #249217',
    ctaWhatsappLabel: '24/7 Večera & VIP Concierge',
    ctaShuttleLabel: 'Besplatan Parking Shuttle',
    tocTitle: 'Vodič Večeri · Cena Spettacolo Partenopea JustMe Milano',
    tocLabels: [
      '1. Pregled, Partnerstvo Pineta Napoli & Raspored',
      '2. Online Plaćanje u EUR (Meni 70€, Club 20€, Stolovi)',
      '3. Kompletan Napuljski Meni (70€) & Izvođači',
      '4. Svih 8 Zvaničnih Cijena (15€–5.000€)',
      '5. Pravila 21+, Dress Code & Besplatan Shuttle',
      '6. 100% Avans & Brza Potvrda',
      '7. Česta Pitanja (12 FAQ)',
    ],
    quickLabels: ['Datum & Vrijeme', 'Tačna Lokacija (Ne Via Messina)', '70€ Meni & Gosti', 'Dob & Odjeća', 'Potvrđene Cijene', 'Besplatan Shuttle'],
    overviewHeading: 'Pregled · Napuljski Dinner Show u JustMe Milano',
    timelineHeading: 'Raspored Večeri · Petak 27. Novembar 2026',
    timelineSubheading: 'Od 19:30 aperitiva preko 21:30 večere uživo do 05:00 ujutro',
    timelineTitles: [
      '19:30 · Otvaranje, 15€ Aperitiv + 1 Piće & Prijem za Večeru',
      '21:30 · Početak CSP Dinner Show · John Vaccaro Uživo & 70€ Meni',
      '22:30 · Ulaz Petak Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Granica Dehor',
      '00:30–05:00 · VIP Privé Stolovi & Glavni Podij',
    ],
    dinnerHeading: 'Kompletan Napuljski Meni (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Predjela za dijeljenje, Mezzi Paccheri al ragù napoletano, sorbet od limuna Amalfija, voda, vino kuće, kafa i party',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Meni 70€ + Party',
    tablesCardTitle: 'JustMe Milano Petak Party & VIP Stolovi (320€–5.000€)',
    tiersHeading: 'Svih 8 Službenih Cijena · Večera 70€ & Xceed #249217',
    tiersSubheading: 'Kupite 70€ meni, 15€ aperitiv, 20€ club i stolove do 1.280€ direktno u eurima na stranici',
    dressShuttleHeading: 'Politika 21+, Duge Hlače & Besplatan Shuttle',
    dressShuttleSubheading: 'Stroga 21+ provjera dokumenta i elegantna odjeća u Viale Luigi Camoens 2',
    dressOkTitle: 'Preporučena Odjeća (Dozvoljeno)',
    dressNoTitle: 'Zabranjeno na Ulazu (21+)',
    shuttleHighlightTitle: 'Partnerski Parking s Besplatnim Prevozom',
    logisticsHeading: 'Kako Stići u JustMe Milano · Metro, Taxi & Shuttle',
    mapHeading: 'GPS Karta · Torre Branca (Nije Via Messina 38)',
    faqHeading: 'Česta Pitanja · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Pogledaj Profil JustMe Milano',
    thanksgivingTitle: 'Dolazite i u Četvrtak 26.? Thanksgiving JustMe',
    thanksgivingCta: 'Vidi 26 Nov',
    dec31Title: 'Nova Godina 31. Decembra u JustMe Milano?',
    dec31Cta: 'Vidi 31 Dec',
    orthodoxTitle: '13. Januar Pravoslavna Nova Godina u JustMe?',
    orthodoxCta: 'Vidi 13 Jan',
    heroLabels: [
      'Dolazak gostiju pod osvijetljenim Torre Branca tornjem u JustMe Milano',
      'Grijani stakleni paviljon s napuljskom večerom od 70€ u 21:30',
      'Živi vokalni nastup Johna Vaccara među svečanim stolovima',
      'VIP lože i petak party do 05:00 uz DJ Franky Deeja',
    ],
    nativeFaqs: [
      {
        q: 'Šta sadrži meni od 70€ u petak 27. novembra?',
        a: 'Predjela za dijeljenje (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, ćufte u sosu), Mezzi Paccheri al ragù napoletano, sorbet od limuna Amalfi, vodu, domaće vino, kafu i ulaz na party od 23:00.',
      },
      {
        q: 'Da li je događaj u JustMe Milano ili u Pineta klubu Via Messina 38?',
        a: 'Isključivo u JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli je gostujući partner iz Napulja i nije povezan s Pineta Clubom u Via Messina 38.',
      },
      {
        q: 'Zašto ulaznica Club petkom košta 20€ i koji je rok za Dehor?',
        a: 'Petkom (#249217) Club + 1 Drink od 22:30 košta 20€, Aperitiv 15€, a 320€ Dehor stolovi zahtijevaju dolazak prije 23:00.',
      },
    ],
  },
  mk: {
    metaTitle: 'Cena Spettacolo Partenopea JustMe Милано | 27 Ное · 70€',
    metaDescription: `Петок 27 ное 2026 во JustMe Милано: Cena Spettacolo Partenopea со Pineta Napoli, мени 70€, Party 23:00 (20€). Инфо ${PHONE}.`,
    h1: 'CSP · Cena Spettacolo Partenopea во JustMe Milano (Pineta Napoli)',
    subtitle: 'Петок, 27 ноември 2026 · 19:30 Аперитив · 21:30 Dinner Show Во Живо · 23:00 Забава до 05:00 · John Vaccaro, DJ Franky Dee & Antonio Marigliano',
    themeTag: 'Во Соработка со Pineta Napoli · Live Dinner Show & Party · Torre Branca',
    dateBadge: 'Петок, 27 Ное 2026 · 19:30 / 05:00',
    priceBadge: 'Мени 70€ · Аперитив 15€ · Клуб 20€ · Маси 320€–5.000€',
    ageDressBadge: '21+ · Елегантно (долги панталони задолжителни за мажи)',
    leadIntro: 'Откако го освои Неапол, познатата CSP · Cena Spettacolo Partenopea пристигнува во JustMe Milano под Торе Бранка во петок, 27 ноември 2026 година, во соработка со Pineta Napoli.',
    extraNativeParagraph: 'Вратите се отвораат во 19:30 за 15€ Аперитив и прием за вечера. Во 21:30 започнува Dinner Show во живо со John Vaccaro и неаполското мени од 70€, а од 23:00 до 05:00 настапуваат DJ Franky Dee и Antonio Marigliano.',
    homeLabel: 'Почетна',
    eventsLabel: 'Настани Милано',
    specialLabel: 'Специјални Вечери',
    ctaBuyNowLabel: 'Купи Онлајн (15€ – 1.280€)',
    ctaXceedLabel: 'Официјален Xceed #249217',
    ctaWhatsappLabel: '24/7 Вечера & VIP Консиерж',
    ctaShuttleLabel: 'Бесплатен Паркинг Шатл',
    tocTitle: 'Водич за Вечерта · Cena Spettacolo Partenopea JustMe',
    tocLabels: [
      '1. Преглед, Соработка Pineta Napoli & Распоред',
      '2. Онлајн Плаќање во EUR (Мени 70€, Клуб 20€, Маси)',
      '3. Целосно Неаполско Мени (70€) & Изведувачи',
      '4. Сите 8 Потврдени Цени (15€–5.000€)',
      '5. Дрес Код 21+, Бесплатен Шатл & Карта',
      '6. 100% Авансна Уплата & Потврда',
      '7. Чести Прашања (12 FAQ)',
    ],
    quickLabels: ['Датум & Часови', 'Точен Клуб (Не Via Messina)', '70€ Мени & Гости', 'Возраст & Облека', 'Официјални Цени', 'Бесплатен Шатл'],
    overviewHeading: 'Преглед · Неаполското Вечера-Шоу во JustMe Milano',
    timelineHeading: 'Распоред на Вечерта · Петок 27 Ноември 2026',
    timelineSubheading: 'Од 19:30 аперитив преку 21:30 вечера во живо до 05:00 наутро',
    timelineTitles: [
      '19:30 · Отворање, 15€ Аперитив + 1 Пијалок & Прием за Вечера',
      '21:30 · Почеток CSP Dinner Show · John Vaccaro Во Живо & 70€ Мени',
      '22:30 · Петочен Влез Club + 1 Drink (20€)',
      '23:00 · Start Party · DJ Franky Dee & Antonio Marigliano + Граница Dehor',
      '00:30–05:00 · VIP Privé Маси & Главен Подиум',
    ],
    dinnerHeading: 'Целосно Неаполско Мени (70€) · John Vaccaro & Pineta Napoli',
    dinnerSubheading: 'Предјадења за делење, Mezzi Paccheri al ragù napoletano, сорбет од лимон од Амалфи, вода, вино, кафе и забава',
    menuCardTitle: 'CSP Cena Spettacolo Partenopea · Мени 70€ + Party',
    tablesCardTitle: 'JustMe Milano Петочна Забава & VIP Маси (320€–5.000€)',
    tiersHeading: 'Сите 8 Потврдени Тарифи · Вечера 70€ & Xceed #249217',
    tiersSubheading: 'Купете мени 70€, аперитив 15€, клуб 20€ и маси до 1.280€ директно на страницата во EUR',
    dressShuttleHeading: 'Правила 21+, Долги Панталони & Бесплатен Шатл',
    dressShuttleSubheading: 'Строга контрола на лична карта 21+ и елегантна облека на Viale Luigi Camoens 2',
    dressOkTitle: 'Препорачана Облека (Дозволено)',
    dressNoTitle: 'Забрането на Влез (21+)',
    shuttleHighlightTitle: 'Партнерски Паркинг со Бесплатен Превоз до Клубот',
    logisticsHeading: 'Како да Стигнете до JustMe Milano · Метро, Такси & Шатл',
    mapHeading: 'GPS Карта · Torre Branca (Не Via Messina 38)',
    faqHeading: 'Чести Прашања · Cena Spettacolo Partenopea JustMe',
    venueCta: 'Погледни Профил JustMe Milano',
    thanksgivingTitle: 'Доаѓате и во Четврток 26? Thanksgiving во JustMe',
    thanksgivingCta: 'Види 26 Ное',
    dec31Title: 'Нова Година 31 Декември во JustMe Milano?',
    dec31Cta: 'Види 31 Дек',
    orthodoxTitle: '13 Јануари Стара Нова Година во JustMe?',
    orthodoxCta: 'Види 13 Јан',
    heroLabels: [
      'Пристигнување на гости под осветлената Torre Branca во JustMe Milano',
      'Загреан стаклен павилјон со неаполска вечера од 70€ во 21:30',
      'Вокален настап во живо на John Vaccaro меѓу масите',
      'VIP ложи и петочна забава до 05:00 со DJ Franky Dee',
    ],
    nativeFaqs: [
      {
        q: 'Што содржи менито од 70€ во петок 27 ноември?',
        a: 'Предјадења за делење (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, ќофтиња во сос), Mezzi Paccheri al ragù napoletano, сорбет од Амалфи, вода, вино, кафе и забава од 23:00.',
      },
      {
        q: 'Дали настанот е во JustMe Milano или во Pineta Via Messina 38?',
        a: 'Само во JustMe Milano (Viale Luigi Camoens 2). Pineta Napoli е гостински партнер од Неапол и не е поврзан со Pineta Club на Via Messina 38.',
      },
      {
        q: 'Зошто влезницата Club во петок е 20€ и кој е рокот за Dehor?',
        a: 'Во петок (#249217) Club + 1 Drink од 22:30 чини 20€, Аперитив 15€, а 320€ Dehor масите бараат влез пред 23:00.',
      },
    ],
  },
};

function buildNarrativeAndFaqs(
  loc: LocaleCode,
  core: CoreLocalePack,
): Pick<
  PartenopeaJustMeContent,
  | 'overviewParagraphs'
  | 'timelineSteps'
  | 'culinaryHighlights'
  | 'menuCardCaption'
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
  | 'thanksgivingBannerEyebrow'
  | 'thanksgivingBannerDesc'
  | 'dec31BannerEyebrow'
  | 'dec31BannerDesc'
  | 'orthodoxBannerEyebrow'
  | 'orthodoxBannerDesc'
  | 'quickFacts'
> {
  const isIt = loc === 'it';
  const isZh = loc === 'zh';

  const quickFacts: PartenopeaLogisticsFact[] = isIt
    ? [
        { label: core.quickLabels[0], value: 'Ven 27 Nov 2026 · 19:30 Porte / 21:30 Dinner Show / 23:00–05:00 Party' },
        { label: core.quickLabels[1], value: 'JustMe Milano · Viale Luigi Camoens 2, Torre Branca (NON Via Messina 38)' },
        { label: core.quickLabels[2], value: 'Menu 70€ · Voice John Vaccaro · DJ Franky Dee & DJ Antonio Marigliano' },
        { label: core.quickLabels[3], value: '21+ · Elegante (obbligo pantalone lungo uomo, zero shorts)' },
        { label: core.quickLabels[4], value: 'Cena 70€ · Aperitivo 15€ · Club 20€ · Tavoli 320€ – 5.000€' },
        { label: core.quickLabels[5], value: 'Parcheggio convenzionato con navetta gratuita A/R' },
      ]
    : isZh
      ? [
          { label: core.quickLabels[0], value: '2026年11月27日 周五 · 19:30 开门 / 21:30 歌舞 晚宴 / 23:00 派对 至 05:00' },
          { label: core.quickLabels[1], value: 'JustMe Milano · Viale Luigi Camoens 2, Torre Branca (非 Via Messina 38)' },
          { label: core.quickLabels[2], value: '70€ 全套 菜单 · 主唱 John Vaccaro · DJ Franky Dee 与 Antonio Marigliano' },
          { label: core.quickLabels[3], value: '21+ 严格 年满 · 优雅 正装 (男士 必须 穿 长裤)' },
          { label: core.quickLabels[4], value: '晚宴 70€ · 餐前酒 15€ · 夜店 20€ · 卡座 320€ – 5.000€' },
          { label: core.quickLabels[5], value: '提供 合作 停车场 免费 往返 接驳 巴士' },
        ]
      : [
          { label: core.quickLabels[0], value: 'Fri 27 Nov 2026 · 19:30 Doors / 21:30 Dinner Show / 23:00–05:00 Party' },
          { label: core.quickLabels[1], value: 'JustMe Milano · Viale Luigi Camoens 2, Torre Branca (NOT Via Messina 38)' },
          { label: core.quickLabels[2], value: '€70 Full Menu · Voice John Vaccaro · DJ Franky Dee & Antonio Marigliano' },
          { label: core.quickLabels[3], value: '21+ · Elegant (Men: long trousers mandatory, no shorts)' },
          { label: core.quickLabels[4], value: 'Menu €70 · Aperitif €15 · Club €20 · Tables €320 – €5.000' },
          { label: core.quickLabels[5], value: 'Partner car park with complimentary shuttle service' },
        ];

  const overviewParagraphs: string[] = isIt
    ? [
        core.leadIntro,
        core.extraNativeParagraph,
        'CSP · Cena Spettacolo Partenopea porta a Milano tutta l’energia conviviale, i cori collettivi e i sapori veraci della grande tradizione napoletana: gli ospiti si ritrovano ai tavoli bianchi sotto le travi in acciaio e la veranda vetrata completamente chiusa e riscaldata di Italo Rota, dove dalle 21:30 il Dinner Show trasforma ogni portata in un momento corale cantato a piena voce insieme a Voice John Vaccaro. Il menu fisso ufficiale da 70€ a persona comprende gli antipasti napoletani da condividere al centro (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana e Polpette al sugo della nonna), il piatto principale di Mezzi Paccheri al ragù napoletano, il Sorbetto al limone di Amalfi e bevande complete con acqua, vino della casa e caffè, oltre alla permanenza gratuita per tutta la fase club fino alle 05:00.',
        'Dalle 23:00 in avanti prende il via lo Start Party ufficiale di venerdì 27 novembre 2026: in consolle salgono DJ Franky Dee e DJ Antonio Marigliano per accompagnare la pista centrale e i Privé fino alle 05:00 del mattino tra sonorità House, grandi successi italiani, Commercial Hits, Hip-Hop ed EDM. Chi preferisce iniziare prima la serata senza prenotare il menu completo da 70€ può entrare con il pass Aperitivo + 1 Drink da 15€ tra le 19:30 e le 21:30, oppure scegliere il biglietto serale Club + 1 Drink da 20€ (tariffa ufficiale del venerdì su Xceed #249217) a partire dalle 22:30.',
        'Nota fondamentale per chi arriva in città: l’evento è ospitato esclusivamente presso JustMe Milano in Viale Luigi Camoens 2 (ai piedi della Torre Branca, Parco Sempione). Pineta Napoli partecipa come partner ospite della Cena Spettacolo Partenopea in trasferta da Napoli e non va confuso con l’altro club milanese Pineta di Via Messina 38. Per tutti gli ospiti sono attivi la selezione rigorosa 21+ con documento originale, l’obbligo di pantalone lungo per l’uomo e il parcheggio convenzionato con servizio navetta gratuito.',
      ]
    : isZh
      ? [
          core.leadIntro,
          core.extraNativeParagraph,
          '在 席卷 那不勒斯 全城 之后，现象级 餐饮 娱乐 品牌 CSP · Cena Spettacolo Partenopea 首次 将 原汁原味 的 那不勒斯 欢乐 晚宴 与 全场 大合唱 带到 米兰。活动 选址 于 Parco Sempione 公园 内 由 著名 建筑师 Italo Rota 操刀 设计 的 JustMe Milano 全 封闭 恒温 玻璃 大厅。自 21:30 起，主唱 John Vaccaro 手持 麦克风 穿行 于 烛光 白布 餐桌 之间 现场 献唱，整套 70€ 官方 晚宴 菜单 诚意 十足：前菜 共享 四重奏 包含 烤千层茄子 Parmigiana di melanzane、水牛 莫扎里拉 鲜奶酪 Mozzarella di bufala、经典 Luciana 小章鱼 与 外婆 家传 番茄 肉丸；主菜 呈献 慢火 熬制 的 Mezzi Paccheri al ragù napoletano 肉酱 通心粉；甜品 搭配 清爽 的 阿马尔菲 柠檬 雪葩，并 已 包含 矿泉水、精选 佐餐 红白 葡萄酒 与 意式 咖啡，同时 免去 二次 购票 直接 保留 全程 派对 入场 资格。',
          '当 时针 指向 23:00，JustMe Milano 正式 切换 至 周五 主场 狂欢 Start Party。来自 合作 阵营 的 DJ Franky Dee 与 DJ Antonio Marigliano 联袂 接管 控台，从 House、热门 金曲、Hip-Hop 到 意大利 经典 舞曲 持续 嗨放 至 次日 清晨 05:00。未 预订 70€ 晚宴 的 宾客 亦 可 选购 15€ 餐前酒 + 1 饮品 通行证 (19:30–21:30 入场)，或 20€ 周五 夜店 Club + 1 Drink 门票 (22:30 起 入场，此为 Xceed #249217 周五 确认 票价，与 周四 的 15€ 不同)。',
          '重要 场地 提示：本场 Pineta Napoli 联合 专场 唯一 举办地 为 Viale Luigi Camoens 2 号 铁塔 Torre Branca 下 的 JustMe Milano 俱乐部，请 务必 区别 于 位于 Via Messina 38 号 的 米兰 Pineta Club。当晚 执行 21+ 原件 证件 核验、男士 长裤 规定，并 开放 合作 停车场 免费 接驳 班车 服务。',
        ]
      : [
          core.leadIntro,
          core.extraNativeParagraph,
          'CSP · Cena Spettacolo Partenopea brings Naples’ iconic singing-table energy and authentic Campanian gastronomy under Italo Rota’s heated glass pavilion in Parco Sempione. From 21:30 onward, white-linen dining tables come alive around Voice John Vaccaro as guests share courses and sing along throughout dinner. The confirmed €70 fixed menu per person includes all four Neapolitan sharing starters (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, and Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano as the main course, Amalfi lemon sorbet for dessert, plus water, house wine, coffee, and uninterrupted club retention until 05:00 AM.',
          'At 23:00 sharp, the room accelerates into the official Friday night Start Party led by DJ Franky Dee and DJ Antonio Marigliano until 05:00 AM across House, Italian sing-along anthems, commercial hits, Hip-Hop, and EDM. Guests joining without the seated €70 dinner can enter early between 19:30 and 21:30 with the €15 Aperitif + 1 Drink pass or arrive for the club phase from 22:30 with the €20 Friday Club + 1 Drink pass (confirmed Friday Xceed #249217 tariff, compared with €15 on Thursday nights).',
          'Important venue clarification for guests traveling across Milan: this collaboration with guest partner Pineta Napoli takes place strictly inside JustMe Milano at Viale Luigi Camoens 2 beneath Torre Branca, NOT at the separate Pineta Club Milano venue on Via Messina 38. Strict 21+ original ID checks, mandatory long trousers for gentlemen, and complimentary shuttle transfers from the partner car park apply all evening.',
        ];

  const timelineSteps: PartenopeaTimelineStep[] = isIt
    ? [
        {
          time: '19:30',
          title: core.timelineTitles[0],
          detail:
            'Apertura dei cancelli in Viale Luigi Camoens 2 sotto la Torre Branca. Accoglienza per i possessori del pass Aperitivo + 1 Drink (15€, fascia 19:30–21:30) e primo check-in per gli ospiti prenotati ai tavoli della Cena Spettacolo Partenopea.',
        },
        {
          time: '21:30',
          title: core.timelineTitles[1],
          detail:
            'Inizio ufficiale del celebre CSP · Cena Spettacolo Partenopea in collaborazione con Pineta Napoli: Voice John Vaccaro anima la veranda riscaldata mentre vengono serviti antipasti al centro, Mezzi Paccheri al ragù napoletano, Sorbetto al limone di Amalfi, acqua, vino della casa e caffè (70€).',
        },
        {
          time: '22:30',
          title: core.timelineTitles[2],
          detail:
            'Apertura degli accessi per chi possiede il biglietto Club + 1 Drink da 20€ (tariffa ufficiale del venerdì su Xceed #249217). Tutti gli ospiti della cena da 70€ e dell’aperitivo delle 19:30 restano già all’interno senza costi extra.',
        },
        {
          time: '23:00',
          title: core.timelineTitles[3],
          detail:
            'Start Party ufficiale con DJ Franky Dee e DJ Antonio Marigliano alla consolle centrale. Soglia oraria tassativa per chi prenota il Tavolo Dehor da 320€: il check-in in area Dehor deve avvenire entro le 23:00.',
        },
        {
          time: '00:30–05:00',
          title: core.timelineTitles[4],
          detail:
            'Massimo picco di pista e servizio bottiglie nei settori Dance Floor (640€), Central (1.280€), VIP Front (3.200€) e Console DJ (5.000€) fino alla chiusura delle 05:00 del mattino.',
        },
      ]
    : isZh
      ? [
          {
            time: '19:30',
            title: core.timelineTitles[0],
            detail:
              'Viale Luigi Camoens 2 正门 开启，迎候 持有 15€ Aperitivo + 1 Drink (19:30–21:30 入场) 通行证 的 宾客，并 同步 办理 70€ 那不勒斯 歌舞 晚宴 宾客 签到 入座。',
          },
          {
            time: '21:30',
            title: core.timelineTitles[1],
            detail:
              'CSP · Cena Spettacolo Partenopea 正式 揭幕！主唱 John Vaccaro 在 温暖 的 玻璃 大厅 献唱 互动，现场 陆续 呈献 4 款 共享 前菜、Mezzi Paccheri 那不勒斯 肉酱 面、阿马尔菲 柠檬 雪葩、水、自酿 葡萄酒 及 咖啡 (70€ 全包)。',
          },
          {
            time: '22:30',
            title: core.timelineTitles[2],
            detail:
              '开放 周五 夜店 Club + 1 Drink (20€ 官方 Xceed #249217 票价) 夜间 检票 通道。已 在 场内 参加 70€ 晚宴 或 15€ 餐前酒 的 宾客 无需 另行 购票。',
          },
          {
            time: '23:00',
            title: core.timelineTitles[3],
            detail:
              'Start Party 正式 启航！DJ Franky Dee 与 DJ Antonio Marigliano 登台 打碟。请 预订 320€ Dehor Table 露台 卡座 的 贵宾 务必 在 23:00 前 抵达 完成 核验。',
          },
          {
            time: '00:30–05:00',
            title: core.timelineTitles[4],
            detail:
              '舞池 全场 高潮，640€ 舞池 卡座、1.280€ 中央 沙发、3.200€ VIP 前排 及 5.000€ DJ 控台 贵宾 尽享 通宵 香槟 礼宾 服务 直至 清晨 05:00。',
          },
        ]
      : [
          {
            time: '19:30',
            title: core.timelineTitles[0],
            detail:
              'Gates open beneath Torre Branca at Viale Luigi Camoens 2 for guests holding the €15 Aperitif + 1 Drink pass (19:30–21:30 admission window) and for early table check-in ahead of the seated dinner show.',
          },
          {
            time: '21:30',
            title: core.timelineTitles[1],
            detail:
              'The signature CSP · Cena Spettacolo Partenopea Dinner Show kicks off in partnership with Pineta Napoli: Voice John Vaccaro leads live singing entertainment across tables served the full €70 Neapolitan menu (4 sharing starters, Mezzi Paccheri al ragù napoletano, Amalfi lemon sorbet, water, house wine, coffee).',
          },
          {
            time: '22:30',
            title: core.timelineTitles[2],
            detail:
              'Late-night club doors open for the confirmed €20 Friday Club + 1 Drink pass (Xceed #249217). All €70 dinner guests and 19:30 aperitif holders keep full party access inside with zero extra fee.',
          },
          {
            time: '23:00',
            title: core.timelineTitles[3],
            detail:
              'Official Start Party launches with DJ Franky Dee and DJ Antonio Marigliano on the decks. Crucial timing note: €320 Dehor Table groups must enter and check in strictly by 23:00.',
          },
          {
            time: '00:30–05:00',
            title: core.timelineTitles[4],
            detail:
              'Peak Milanese club production across Dance Floor (€640), Central (€1.280), VIP Front (€3.200), and DJ Table (€5.000) Privé booths until 05:00 AM closing.',
          },
        ];

  const culinaryHighlights: PartenopeaCulinaryHighlight[] = isIt
    ? [
        {
          badge: 'Antipasti al Centro · To Share',
          title: 'Parmigiana, Bufala, Polipetti alla Luciana & Polpette della Nonna',
          detail:
            'Quattro classici intramontabili della tavola partenopea serviti al centro per aprire la cena: Parmigiana di melanzane, Mozzarella di bufala campana, Polipetti alla Luciana e Polpette al sugo della nonna.',
        },
        {
          badge: 'Piatto Principale · Main Course',
          title: 'Mezzi Paccheri al Ragù Napoletano',
          detail:
            'Il simbolo della domenica e delle grandi feste di Napoli portato a Milano: Mezzi Paccheri avvolti nel ragù napoletano a lenta cottura, serviti fumanti prima del clou dello spettacolo.',
        },
        {
          badge: 'Dessert & Bevande Incluse · 70€',
          title: 'Sorbetto al Limone di Amalfi, Acqua, Vino della Casa & Caffè',
          detail:
            'Chiusura fresca con Sorbetto al limone di Amalfi insieme ad acqua, vino della casa, caffè e accesso incluso al Party delle 23:00 nel pacchetto unico da 70€ a persona.',
        },
        {
          badge: 'Live Cast · Pineta Napoli Partner',
          title: 'Voice John Vaccaro, DJ Franky Dee & DJ Antonio Marigliano',
          detail:
            'Animazione vocale dal vivo durante la cena con John Vaccaro, poi passaggio di testimone in consolle a DJ Franky Dee e DJ Antonio Marigliano fino alle 05:00 sotto la Torre Branca.',
        },
      ]
    : isZh
      ? [
          {
            badge: '共享 前菜 · 4 道 经典',
            title: 'Parmigiana 茄子、水牛 莫扎里拉、Luciana 小章鱼 与 家常 肉丸',
            detail:
              '餐桌 中央 分享 四大 拿坡里 名菜：浓郁 千层烤茄子 Parmigiana di melanzane、新鲜 水牛 莫扎里拉 奶酪、传统 慢炖 Luciana 小章鱼 以及 外婆 秘制 番茄 肉丸。',
          },
          {
            badge: '正餐 主菜 · 拿坡里 灵魂',
            title: 'Mezzi Paccheri al Ragù Napoletano 经典 慢炖 肉酱 面',
            detail:
              '采用 正宗 意式 厚管 宽面 Mezzi Paccheri 裹满 长时 熬煮 的 那不勒斯 浓香 肉酱，在 现场 歌舞 最炽热 的 氛围 中 热腾 呈上。',
          },
          {
            badge: '甜品 与 含酒水 全套 70€',
            title: '阿马尔菲 柠檬 雪葩、矿泉水、佐餐 酒水、咖啡 与 派对 通玩',
            detail:
              '清爽 细腻 的 阿马尔菲 柠檬 雪葩 解腻 收官，70€ 价格 完整 包含 矿泉水、精选 佐餐 葡萄酒、意式 浓缩 咖啡 与 23:00 全场 派对 入场。',
          },
          {
            badge: '全明星 阵容 · Pineta Napoli 联合',
            title: 'Voice John Vaccaro、DJ Franky Dee 与 DJ Antonio Marigliano',
            detail:
              '晚餐 环节 由 John Vaccaro 现场 飙歌 带动 全场 合唱，23:00 起 DJ Franky Dee 与 DJ Antonio Marigliano 接力 打碟 直至 次日 05:00。',
          },
        ]
      : [
          {
            badge: 'Antipasti to Share · 4 Classics',
            title: 'Parmigiana, Buffalo Mozzarella, Polipetti & Nonna Meatballs',
            detail:
              'Served family-style across the table: classic Parmigiana di melanzane, creamy Mozzarella di bufala, Polipetti alla Luciana braised baby octopus, and Polpette al sugo della nonna.',
          },
          {
            badge: 'Main Course · Neapolitan Pride',
            title: 'Mezzi Paccheri al Ragù Napoletano',
            detail:
              'Al dente artisanal Mezzi Paccheri pasta tossed in rich slow-simmered Neapolitan ragù sauce, served piping hot as the 21:30 Dinner Show reaches full momentum.',
          },
          {
            badge: 'Dessert & Drinks Included · €70',
            title: 'Amalfi Lemon Sorbet, Water, House Wine, Coffee & Party Retention',
            detail:
              'Finished with crisp Amalfi lemon sorbet plus water, house wine, espresso coffee, and automatic entry to the 23:00–05:00 club night all inside the fixed €70 rate.',
          },
          {
            badge: 'Artist Line-up · Pineta Napoli',
            title: 'Voice John Vaccaro, DJ Franky Dee & DJ Antonio Marigliano',
            detail:
              'John Vaccaro leads interactive table singing during the Dinner Show before DJ Franky Dee and DJ Antonio Marigliano take over JustMe Milano until 05:00 AM.',
          },
        ];

  const menuCardCaption = isIt
    ? 'Locandina ufficiale Couture Noir per Cena Spettacolo Partenopea (70€) al JustMe Milano con contatto diretto Nightlife Milan +39 351 912 7047.'
    : isZh
      ? 'JustMe 米兰 11月27日 那不勒斯 歌舞 晚宴 (70€ 全包) 专属 Couture Noir 海报，含 +39 351 912 7047 24/7 官方 预订 通道。'
      : 'Custom Couture Noir dinner card for Cena Spettacolo Partenopea (€70 Full Menu) at JustMe Milano with Nightlife Milan direct contact +39 351 912 7047.';

  const tablesCardCaption = isIt
    ? 'Schema completo tavoli Privé e ingressi venerdì 27 novembre (Xceed #249217): Dehor 320€, Pista 640€, Centrale 1.280€, VIP Front 3.200€ e DJ Table 5.000€.'
    : isZh
      ? '11月27日 周五 官方 Xceed #249217 票价 与 卡座 全览：Dehor 320€、舞池 640€、中央 1.280€、VIP 前排 3.200€ 与 DJ 台 5.000€。'
      : 'Friday Nov 27 official Xceed #249217 bottle table showcase: Dehor €320, Dance Floor €640, Central €1.280, VIP Front €3.200, and DJ Table €5.000.';

  const restaurantConciergeNote = isIt
    ? `Vuoi prenotare subito i posti per la Cena Spettacolo Partenopea da 70€ oppure coordinare un tavolo per gruppi numerosi con esigenze alimentari specifiche? Acquista i pass Menu 70€ online qui sopra o scrivi su WhatsApp al Concierge ${PHONE} (24/7) per assegnare i tavoli ristorante sotto la Torre Branca.`
    : isZh
      ? `需要 立即 锁定 70€ 那不勒斯 歌舞 晚宴 坐席 或 安排 大型 团体 餐厅 连桌？您 可 直接 在 页面 上方 用 欧元 下单 70€ 晚宴 套餐，也可 随时 联系 24/7 WhatsApp 礼宾 ${PHONE} 协调 餐厅 具体 桌位。`
      : `Ready to secure seats for the €70 Cena Spettacolo Partenopea Dinner Show or arrange a group dining table with special dietary requests? Book €70 dinner passes directly above in EUR or message our 24/7 WhatsApp Concierge at ${PHONE}.`;

  const tiers: PartenopeaOfferTier[] = isIt
    ? [
        {
          id: 'dinner-show-70',
          title: '1. Cena Spettacolo Partenopea · Menu Completo + Party',
          price: '70€',
          badge: 'Acquisto Online & WhatsApp',
          summary: 'Menu fisso napoletano delle 21:30 con live show Voice John Vaccaro, 4 antipasti, Mezzi Paccheri, sorbetto Amalfi, acqua, vino della casa, caffè e accesso al Party fino alle 05:00.',
          bullets: [
            'Antipasti al centro: Parmigiana, Bufala, Polipetti alla Luciana, Polpette al sugo',
            'Primo: Mezzi Paccheri al ragù napoletano + Sorbetto al limone di Amalfi',
            'Acqua, vino della casa e caffè inclusi al tavolo',
            'Acquista subito in euro sul sito o conferma tavolo gruppo su WhatsApp 24/7',
          ],
          ctaKind: 'native',
          ctaLabel: 'Acquista Menu 70€',
        },
        {
          id: 'aperitif',
          title: '2. Aperitif + 1 Drink · Ingresso Pre-Show (19:30–21:30)',
          price: '15€',
          badge: 'Checkout Diretto & Xceed',
          summary: 'Ingresso tra le 19:30 e le 21:30 con 1 drink incluso per l’aperitivo in veranda riscaldata e permanenza successiva per tutta la serata.',
          bullets: [
            'Tariffa ufficiale Xceed #249217 confermata a 15€',
            'Accesso garantito nella fascia oraria 19:30–21:30 con 1 consumazione',
            'Permanenza gratuita all’interno per lo Start Party delle 23:00',
            'Età 21+ con obbligo pantalone lungo uomo e scarpa curata',
          ],
          ctaKind: 'native',
          ctaLabel: 'Acquista 15€ Aperitivo',
        },
        {
          id: 'club-entry',
          title: '3. Club + 1 Drink · Friday Night Party (dalle 22:30)',
          price: '20€',
          badge: 'Checkout Diretto & Xceed',
          summary: 'Biglietto ufficiale del venerdì (20€ su Xceed #249217) con accesso dalle 22:30 e 1 drink incluso per ballare con DJ Franky Dee e Antonio Marigliano fino alle 05:00.',
          bullets: [
            'Tariffa ufficiale del venerdì confermata su Xceed #249217: 20€',
            'Ingresso serale dalle 22:30 · Start Party ufficiale alle 23:00',
            '1 consumazione inclusa ai bar principali del JustMe Milano',
            'Musica: House, Commercial Hits, Hip-Hop, EDM e classici italiani',
          ],
          ctaKind: 'native',
          ctaLabel: 'Acquista 20€ Club',
        },
        {
          id: 'dehor-table',
          title: '4. Dehor Table · Ingresso Tassativo entro le 23:00',
          price: '320€',
          badge: 'Checkout Diretto & Xceed',
          summary: 'Tavolo riservato in area Dehor JustMe Milano con servizio bottiglie al tavolo e regola di accesso tassativa entro le 23:00.',
          bullets: [
            'Tariffa ufficiale Xceed #249217 confermata a 320€',
            'Regola vincolante: il gruppo deve entrare entro le 23:00',
            'Corsia preferenziale ingresso tavoli sotto la Torre Branca',
            'Acquisto immediato in EUR senza uscire da Nightlife Milan',
          ],
          ctaKind: 'native',
          ctaLabel: 'Prenota Tavolo 320€',
        },
        {
          id: 'dancefloor-table',
          title: '5. Dance Floor Table · Pista Principale',
          price: '640€',
          badge: 'Checkout Diretto & Xceed',
          summary: 'Tavolo VIP a ridosso della pista centrale per vivere da protagonisti il Friday Party con DJ Franky Dee e DJ Antonio Marigliano.',
          bullets: [
            'Tariffa ufficiale Xceed #249217 confermata a 640€',
            'Posizione privilegiata accanto al cuore della pista da ballo',
            'Servizio tavolo dedicato con glacette e bottiglie premium',
            'Conferma immediata online o assistenza WhatsApp +39 351 912 7047',
          ],
          ctaKind: 'native',
          ctaLabel: 'Prenota Pista 640€',
        },
        {
          id: 'central-table',
          title: '6. Central Table · Area Centrale Rialzata',
          price: '1.280€',
          badge: 'Checkout Diretto & Xceed',
          summary: 'Tavolo panoramico nella zona centrale del JustMe Milano con vista aperta sulla consolle, sul live show e su tutta la pista.',
          bullets: [
            'Tariffa ufficiale Xceed #249217 confermata a 1.280€',
            'Visuale dominante a 360 gradi sul locale vetrato Italo Rota',
            'Accesso VIP dedicato da Viale Luigi Camoens 2',
            'Acquisto diretto sul sito o personalizzazione bottiglie via Concierge',
          ],
          ctaKind: 'native',
          ctaLabel: 'Prenota Centrale 1.280€',
        },
        {
          id: 'vip-front-table',
          title: '7. VIP Front Table · Prima Fila Privé',
          price: '3.200€',
          badge: 'Concierge 24/7 & Xceed',
          summary: 'Postazione esclusiva in prima fila davanti al palco e alla pista principale, ideale per ospiti internazionali e comitive VIP.',
          bullets: [
            'Tariffa ufficiale Xceed #249217 confermata a 3.200€',
            'Massima visibilità in prima fila nel Privé del JustMe Milano',
            'Gestione dedicata ingresso scortato e selezione bottiglie 24/7',
            'Conferma con pagamento anticipato 100% ed emissione voucher ufficiale',
          ],
          ctaKind: 'whatsapp',
          ctaLabel: 'Richiedi VIP Front 3.200€',
        },
        {
          id: 'dj-table',
          title: '8. DJ Table · Tavolo Consolle Ufficiale',
          price: '5.000€',
          badge: 'Concierge 24/7 & Xceed',
          summary: 'Il tavolo più prestigioso del JustMe Milano posizionato direttamente in area consolle DJ alle spalle di DJ Franky Dee e Antonio Marigliano.',
          bullets: [
            'Tariffa ufficiale Xceed #249217 confermata a 5.000€',
            'Posizione esclusiva nella zona consolle sotto la cupola di vetro',
            'Team hostess dedicato e accoglienza prioritaria lista ospiti',
            `Prenotazione diretta 24/7 tramite Concierge WhatsApp ${PHONE}`,
          ],
          ctaKind: 'whatsapp',
          ctaLabel: 'Richiedi DJ Table 5.000€',
        },
      ]
    : isZh
      ? [
          {
            id: 'dinner-show-70',
            title: '1. Cena Spettacolo Partenopea · 全套 晚宴 + 派对',
            price: '70€',
            badge: '网站 直购 & WhatsApp',
            summary: '包含 21:30 现场 主唱 John Vaccaro 献唱 晚宴、4 款 共享 前菜、Mezzi Paccheri 肉酱 面、柠檬 雪葩、水、葡萄酒、咖啡 及 全场 派对。',
            bullets: [
              '4 道 前菜：烤千层茄子 Parmigiana、水牛 莫扎里拉、小章鱼、传统 肉丸',
              '主菜：Mezzi Paccheri al ragù napoletano 与 阿马尔菲 柠檬 雪葩',
              '已含 矿泉水、精选 佐餐 葡萄酒 与 意式 浓缩 咖啡',
              '支持 本站 欧元 直接 下单 或 WhatsApp 24/7 协调 坐席',
            ],
            ctaKind: 'native',
            ctaLabel: '预订 70€ 歌舞 晚宴',
          },
          {
            id: 'aperitif',
            title: '2. Aperitif + 1 Drink · 早鸟 餐前酒 通行证 (19:30–21:30)',
            price: '15€',
            badge: '网站 直购 & Xceed',
            summary: '19:30 至 21:30 之间 入场 享用 1 杯 欢迎 鸡尾酒，并可 全程 留场 参与 23:00 开启 的 周五 派对。',
            bullets: [
              'Xceed #249217 官方 确认 票价：15€',
              '19:30–21:30 入场 含 吧台 1 杯 酒水',
              '自动 享有 23:00 Start Party 入场 权益 无需 补差价',
              '21+ 年龄 审核 · 男士 务必 穿 长裤',
            ],
            ctaKind: 'native',
            ctaLabel: '购买 15€ 餐前酒',
          },
          {
            id: 'club-entry',
            title: '3. Club + 1 Drink · 周五 夜店 门票 (22:30 起)',
            price: '20€',
            badge: '网站 直购 & Xceed',
            summary: '周五 官方 Xceed #249217 夜间 门票 20€，22:30 起 入场 含 1 杯 饮品，跟随 DJ Franky Dee 与 Antonio Marigliano 狂欢 至 05:00。',
            bullets: [
              '周五 11月27日 官方 确认 票价：20€ (非 周四 的 15€)',
              '22:30 开放 夜场 入口 · 23:00 Start Party 正式 启动',
              '吧台 免费 兑换 1 杯 鸡尾酒 饮品',
              '音乐：House、意式 经典、Hip-Hop、热门 金曲 与 EDM',
            ],
            ctaKind: 'native',
            ctaLabel: '购买 20€ 夜店 门票',
          },
          {
            id: 'dehor-table',
            title: '4. Dehor Table · 须于 23:00 前 入座',
            price: '320€',
            badge: '网站 直购 & Xceed',
            summary: 'JustMe 米兰 Dehor 区域 卡座，严格 规定 团队 须于 23:00 前 抵达 完成 核验 并 享受 瓶装 酒水 服务。',
            bullets: [
              'Xceed #249217 官方 确认 报价：320€',
              '严格 入场 时限：务必 于 23:00 前 检票 入内',
              '享 Torre Branca 入口 VIP 卡座 专属 通道',
              '支持 本站 欧元 直购 或 WhatsApp 24/7 礼宾 协助',
            ],
            ctaKind: 'native',
            ctaLabel: '预订 320€ Dehor 卡座',
          },
          {
            id: 'dancefloor-table',
            title: '5. Dance Floor Table · 主舞池 核心 卡座',
            price: '640€',
            badge: '网站 直购 & Xceed',
            summary: '紧邻 主舞池 与 表演区 的 黄金 卡座，近距离 感受 DJ Franky Dee 与 DJ Antonio Marigliano 的 周五 狂欢。',
            bullets: [
              'Xceed #249217 官方 确认 报价：640€',
              '位于 中心 舞池 旁，氛围 热力 十足',
              '配备 专属 香槟 冰桶 与 餐桌 侍应 服务',
              '支持 网站 直付 欧元 或 WhatsApp +39 351 912 7047',
            ],
            ctaKind: 'native',
            ctaLabel: '预订 640€ 舞池 卡座',
          },
          {
            id: 'central-table',
            title: '6. Central Table · 中央 尊享 沙发 座',
            price: '1.280€',
            badge: '网站 直购 & Xceed',
            summary: 'JustMe 米兰 玻璃 主厅 中央 抬高 区域 卡座，360 度 全景 视野 尽览 全场。',
            bullets: [
              'Xceed #249217 官方 确认 报价：1.280€',
              '无遮挡 俯瞰 DJ 控台 与 主舞池',
              '含 Viale Luigi Camoens 2 VIP 快速 通关',
              '在线 欧元 结账 即刻 锁位 零 加价',
            ],
            ctaKind: 'native',
            ctaLabel: '预订 1.280€ 中央 卡座',
          },
          {
            id: 'vip-front-table',
            title: '7. VIP Front Table · 头排 VIP 专席',
            price: '3.200€',
            badge: '24/7 礼宾 & Xceed',
            summary: '面向 舞台 与 舞池 核心区 的 头排 顶级 卡座，专为 重要 贵宾 打造。',
            bullets: [
              'Xceed #249217 官方 确认 报价：3.200€',
              'Privé 区 首排 黄金 视角 直面 全场 焦点',
              'WhatsApp 礼宾 一对一 护送 入场 与 选酒',
              '100% 预付款 后 秒发 官方 确认 凭证',
            ],
            ctaKind: 'whatsapp',
            ctaLabel: '咨询 3.200€ VIP 头排',
          },
          {
            id: 'dj-table',
            title: '8. DJ Table · 控台 专属 席位',
            price: '5.000€',
            badge: '24/7 礼宾 & Xceed',
            summary: 'JustMe 米兰 至高 规格 席位，紧邻 DJ 控台 享受 顶级 私密 与 尊荣。',
            bullets: [
              'Xceed #249217 官方 确认 报价：5.000€',
              '位于 玻璃 穹顶 DJ 控台 核心 贵宾区',
              '专属 礼宾 全程 跟进 嘉宾 护送 入场',
              `通过 WhatsApp ${PHONE} 实时 锁定 档期`,
            ],
            ctaKind: 'whatsapp',
            ctaLabel: '咨询 5.000€ DJ 席位',
          },
        ]
      : [
          {
            id: 'dinner-show-70',
            title: '1. Cena Spettacolo Partenopea · Full €70 Menu + Party',
            price: '70€',
            badge: 'Direct Checkout & Concierge',
            summary: '21:30 live Dinner Show hosted by Voice John Vaccaro with 4 Neapolitan sharing antipasti, Mezzi Paccheri al ragù napoletano, Amalfi lemon sorbet, water, house wine, coffee, and club retention until 05:00.',
            bullets: [
              'Antipasti to share: Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo',
              'Main course: Mezzi Paccheri al ragù napoletano + Amalfi lemon sorbet',
              'Water, house wine, espresso coffee, and club entry from 23:00 included',
              'Instant EUR checkout right on site or table grouping via WhatsApp 24/7',
            ],
            ctaKind: 'native',
            ctaLabel: 'Book €70 Dinner Show',
          },
          {
            id: 'aperitif',
            title: '2. Aperitif + 1 Drink · Early Lounge Entry (19:30–21:30)',
            price: '15€',
            badge: 'Direct Checkout & Xceed',
            summary: 'Admission between 19:30 and 21:30 including 1 drink inside the heated glass pavilion plus full retention for the 23:00 Start Party.',
            bullets: [
              'Confirmed Xceed #249217 Friday tariff: €15',
              '1 welcome drink included for arrivals 19:30–21:30',
              'Seamless access to the late-night DJ sets with zero second cover',
              '21+ strict door policy · Men long trousers mandatory',
            ],
            ctaKind: 'native',
            ctaLabel: 'Buy €15 Aperitif Pass',
          },
          {
            id: 'club-entry',
            title: '3. Club + 1 Drink · Friday Night Party (22:30+)',
            price: '20€',
            badge: 'Direct Checkout & Xceed',
            summary: 'Confirmed Friday Xceed #249217 club admission from 22:30 onward including 1 drink for DJ Franky Dee and DJ Antonio Marigliano until 05:00.',
            bullets: [
              'Confirmed Friday Xceed #249217 admission rate: €20',
              'Door admission from 22:30 · Official Start Party at 23:00',
              '1 cocktail/drink included at JustMe Milano main bars',
              'House, Italian classics, commercial hits, Hip-Hop & EDM until 05:00 AM',
            ],
            ctaKind: 'native',
            ctaLabel: 'Buy €20 Club Pass',
          },
          {
            id: 'dehor-table',
            title: '4. Dehor Table · Mandatory Entry by 23:00',
            price: '320€',
            badge: 'Direct Checkout & Xceed',
            summary: 'Reserved Dehor area bottle-service table beneath the heated glass canopy with strict check-in required by 23:00.',
            bullets: [
              'Confirmed Xceed #249217 rate: €320 total table rate',
              'Strict rule: Dehor Table guests must enter before 23:00',
              'Priority table lane beneath illuminated Torre Branca',
              'Book directly in EUR on site or verify floor placement 24/7',
            ],
            ctaKind: 'native',
            ctaLabel: 'Reserve €320 Dehor Table',
          },
          {
            id: 'dancefloor-table',
            title: '5. Dance Floor Table · Main Room',
            price: '640€',
            badge: 'Direct Checkout & Xceed',
            summary: 'High-energy Dance Floor VIP booth steps from the DJ booth and Friday crowd dancing until 05:00 AM.',
            bullets: [
              'Confirmed Xceed #249217 rate: €640',
              'Prime perimeter position beside the main dancefloor',
              'Dedicated table server, ice buckets, and bottle service',
              'Instant EUR checkout on site or WhatsApp Concierge assistance',
            ],
            ctaKind: 'native',
            ctaLabel: 'Reserve €640 Dance Floor',
          },
          {
            id: 'central-table',
            title: '6. Central Table · Elevated Central Zone',
            price: '1.280€',
            badge: 'Direct Checkout & Xceed',
            summary: 'Flagship Central Zone VIP sofa table inside Italo Rota’s heated glass pavilion overlooking the full floor.',
            bullets: [
              'Confirmed Xceed #249217 rate: €1.280',
              '360-degree view of the DJ console, live vocals, and crowd',
              'Priority VIP access lane at Viale Luigi Camoens 2',
              'Instant EUR booking online or bottle pre-order via Concierge 24/7',
            ],
            ctaKind: 'native',
            ctaLabel: 'Reserve €1.280 Central Table',
          },
          {
            id: 'vip-front-table',
            title: '7. VIP Front Table · Front-Row Privé',
            price: '3.200€',
            badge: '24/7 Concierge & Xceed',
            summary: 'Front-row prestige VIP table facing the central stage for corporate groups and international guests.',
            bullets: [
              'Confirmed Xceed #249217 rate: €3.200',
              'Premier front-line sightlines across JustMe Milano Privé',
              'Escorted VIP entry and bespoke bottle list via WhatsApp',
              '100% prepayment confirmation followed by official table voucher',
            ],
            ctaKind: 'whatsapp',
            ctaLabel: 'Request €3.200 VIP Front',
          },
          {
            id: 'dj-table',
            title: '8. DJ Table · Behind Console',
            price: '5.000€',
            badge: '24/7 Concierge & Xceed',
            summary: 'JustMe Milano’s highest-tier VIP table directly beside the DJ booth with DJ Franky Dee and Antonio Marigliano.',
            bullets: [
              'Confirmed Xceed #249217 rate: €5.000',
              'Exclusive backstage-adjacent DJ console hospitality zone',
              'Dedicated hostess escort & priority VIP door coordination',
              `Direct booking confirmation via WhatsApp Concierge ${PHONE}`,
            ],
            ctaKind: 'whatsapp',
            ctaLabel: 'Request €5.000 DJ Table',
          },
        ];

  const vipConciergeNote = isIt
    ? `Tavoli VIP Front (3.200€), DJ Table (5.000€) e abbinamenti personalizzati per gruppi della Cena Spettacolo Partenopea da 70€ vengono gestiti in tempo reale su WhatsApp ${PHONE} (24/7) con pagamento anticipato al 100% e zero commissioni d’agenzia.`
    : isZh
      ? `VIP Front (3.200€)、DJ 台 (5.000€) 与 70€ 晚宴 团体 拼桌 均可 随时 联系 24/7 WhatsApp ${PHONE} 实时 确认，全程 100% 透明 预付 零 中介费。`
      : `VIP Front (€3.200), DJ Table (€5.000), and custom large-group seating for the €70 Cena Spettacolo Partenopea are confirmed live 24/7 on WhatsApp ${PHONE} under 100% prepayment with zero agency fees.`;

  const dressCodeOkItems = isIt
    ? [
        'Uomo: pantaloni lunghi obbligatori, camicia, dolcevita sartoriale o blazer serale',
        'Donna: abito da sera, completo elegante in seta o jumpsuit ricercata',
        'Calzature curate: scarpe eleganti, stivaletti o sneaker pulite di fascia alta',
        'Documento d’identità fisico originale valido (selezione rigorosa 21+)',
      ]
    : isZh
      ? [
          '男士 必穿：剪裁 整洁 长裤 (绝对 禁止 短裤)、衬衫 或 西装 外套',
          '女士 推荐：优雅 晚礼服、连体裤 或 高级 针织 套装',
          '鞋履 要求：正装 皮鞋、高跟鞋 或 干净 质感 休闲鞋',
          '入场 核验：严格 21+ 须 携带 原件 有效 护照 或 身份证',
        ]
      : [
          'Gentlemen: long trousers mandatory, paired with collared shirt, knitwear, or tailored blazer',
          'Ladies: cocktail dress, evening jumpsuit, silk separates, or refined winter tailoring',
          'Footwear: dress shoes, heels, leather boots, or pristine luxury minimalist sneakers',
          'Valid original physical photo ID strictly required at the door (21+)',
        ];

  const dressCodeNoItems = isIt
    ? [
        'Pantaloncini corti o bermuda da uomo (ingresso tassativamente negato)',
        'Tute da ginnastica, felpe con cappuccio, canotte o streetwear sportivo',
        'Zaini ingombranti, borse sportive o calzature da running usurate',
        'Minori di 21 anni (età minima 21+ verificata con documento cartaceo/tessera originale)',
      ]
    : isZh
      ? [
          '男士 短裤 或 运动 七分裤 (门口 严格 拒绝 入内)',
          '运动 套装、连帽 卫衣、无袖 背心 或 破洞 做旧 服装',
          '大型 双肩 背包、健身 提包 或 磨损 跑步鞋',
          '未满 21 周岁 人士 (严格 年龄 检查，手机 证件 照片 无效)',
        ]
      : [
          'Men’s shorts or cropped athletic trousers (strictly refused at door)',
          'Tracksuits, oversized hoodies, sleeveless vests, or distressed gym wear',
          'Backpacks, large sports bags, or scuffed running sneakers',
          'Anyone under 21 years old (strict 21+ physical ID check)',
        ];

  const shuttleHighlightDesc = isIt
    ? 'Per chi raggiunge Parco Sempione in auto venerdì 27 novembre, JustMe Milano offre un parcheggio convenzionato collegato da un servizio navetta gratuito A/R fino all’ingresso di Torre Branca. Apri il pin Google Maps ufficiale qui a fianco.'
    : isZh
      ? '周五 自驾 前往 Parco Sempione 的 宾客 可 直接 使用 JustMe Milano 指定 合作 停车场，现场 配备 免费 往返 接驳 巴士 直达 Torre Branca 门口，点击 右侧 官方 地图 定位 即可 导航。'
      : 'Driving into Parco Sempione on Friday night? Guests may park at JustMe Milano’s partner car park and ride the complimentary round-trip shuttle straight to Torre Branca using the verified Google Maps pin.';

  const logisticsParagraphs = isIt
    ? [
        'JustMe Milano si trova in Viale Luigi Camoens 2 all’interno del Parco Sempione, direttamente ai piedi della Torre Branca (20121 Milano). Nella configurazione di fine novembre tutta la struttura progettata da Italo Rota è completamente chiusa e riscaldata, così da vivere comodamente sia la Cena Spettacolo Partenopea delle 21:30 sia la notte club fino alle 05:00.',
        'Ribadiamo per evitare errori di navigazione: la serata CSP con Pineta Napoli si tiene esclusivamente al JustMe Milano (Viale Camoens 2) e NON al Pineta Club Milano di Via Messina 38. In metropolitana si raggiunge comodamente da Cadorna FN (linee M1 Rossa e M2 Verde, 6 minuti a piedi) o Lanza Brera (linea M2 Verde, 7 minuti a piedi), oppure arrivando in auto tramite il parcheggio convenzionato con navetta gratuita.',
      ]
    : isZh
      ? [
          'JustMe Milano 坐落于 米兰 市中心 Parco Sempione 公园 Viale Luigi Camoens 2 号 Torre Branca 铁塔 下方。11 月 底 全 封闭 恒温 玻璃 大厅 确保 无论 是 21:30 那不勒斯 歌舞 晚宴 还是 狂欢 至 05:00 均 温暖 舒适。',
          '再次 提醒：本场 Pineta Napoli 联合 专场 唯一 地址 为 JustMe Milano (Viale Camoens 2)，请勿 前往 Via Messina 38 号 的 Pineta Club。地铁 可 乘 M1 红线/M2 绿线 至 Cadorna FN 步行 6 分钟，或 M2 至 Lanza 步行 7 分钟；自驾 宾客 可 享 合作 停车场 免费 接驳 巴士。',
        ]
      : [
          'JustMe Milano stands inside Parco Sempione at Viale Luigi Camoens 2 directly beneath Gio Ponti’s illuminated Torre Branca (20121 Milan). Throughout late November, Italo Rota’s steel-and-glass pavilion is fully enclosed and climate-controlled for both the 21:30 Neapolitan Dinner Show and the 23:00–05:00 club celebration.',
          'Please double-check your route: CSP · Cena Spettacolo Partenopea with Pineta Napoli happens ONLY at JustMe Milano (Viale Camoens 2) and NOT at Pineta Club on Via Messina 38. Reach the doors easily from Cadorna FN Metro (M1 Red / M2 Green, 6-minute walk) or Lanza Brera (M2 Green, 7-minute walk), or park at the partner lot with free shuttle drop-off.',
        ];

  const logisticsFacts: PartenopeaLogisticsFact[] = isIt
    ? [
        { label: 'Locale Esclusivo', value: 'JustMe Milano · Viale Luigi Camoens 2 (NO Via Messina 38)' },
        { label: 'Data & Orari Ufficiali', value: 'Venerdì 27 Novembre 2026 · 19:30 – 05:00' },
        { label: 'Programma Serata', value: '19:30 Aperitivo · 21:30 Dinner Show (70€) · 23:00 Start Party' },
        { label: 'Partner & Cast Live', value: 'Pineta Napoli · Voice John Vaccaro · DJ Franky Dee & Antonio Marigliano' },
        { label: 'Età & Dress Code', value: '21+ · Elegante (obbligo pantalone lungo uomo)' },
        { label: 'Parcheggio & Navetta', value: 'Navetta gratuita A/R dal parcheggio convenzionato' },
      ]
    : isZh
      ? [
          { label: '唯一 举办 场馆', value: 'JustMe Milano · Viale Luigi Camoens 2 (非 Via Messina 38)' },
          { label: '官方 营业 时段', value: '2026年11月27日 周五 · 19:30 – 05:00' },
          { label: '分段 主题 流程', value: '19:30 餐前酒 · 21:30 歌舞 晚宴 (70€) · 23:00 Start Party' },
          { label: '合作 阵容 与 艺人', value: 'Pineta Napoli · John Vaccaro · DJ Franky Dee & Antonio Marigliano' },
          { label: '年龄 与 着装', value: '21+ · 优雅 正装 (男士 必须 穿 长裤)' },
          { label: '停车 与 接驳车', value: '合作 停车场 配备 免费 往返 穿梭 巴士' },
        ]
      : [
          { label: 'Exclusive Venue', value: 'JustMe Milano · Viale Luigi Camoens 2 (NOT Via Messina 38)' },
          { label: 'Official Hours', value: 'Friday, November 27, 2026 · 19:30 – 05:00' },
          { label: 'Evening Progression', value: '19:30 Aperitif · 21:30 Dinner Show (€70) · 23:00 Start Party' },
          { label: 'Partner & Line-up', value: 'Pineta Napoli · Voice John Vaccaro · DJ Franky Dee & Antonio Marigliano' },
          { label: 'Age & Attire', value: '21+ · Elegant (Men: long trousers mandatory)' },
          { label: 'Parking & Shuttle', value: 'Complimentary shuttle service from verified partner car park' },
        ];

  const baseExtraFaqs: PartenopeaFaqItem[] = isIt
    ? [
        {
          q: 'A che ora iniziano il Dinner Show dal vivo e lo Start Party del venerdì?',
          a: 'Le porte aprono alle 19:30 per Aperitivo (15€) e arrivo ai tavoli ristorante; il Dinner Show con Voice John Vaccaro parte alle 21:30 e alle 23:00 inizia lo Start Party con DJ Franky Dee e DJ Antonio Marigliano fino alle 05:00.',
        },
        {
          q: 'Quali piatti sono compresi nel menu da 70€ per la Cena Spettacolo Partenopea?',
          a: 'Antipasti al centro (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, Sorbetto al limone di Amalfi, acqua, vino della casa e caffè.',
        },
        {
          q: 'Chi prenota la cena da 70€ deve acquistare un altro biglietto per restare al Party?',
          a: 'No. Tutti gli ospiti della Cena Spettacolo Partenopea da 70€ (e chi entra alle 19:30 con Aperitivo da 15€) restano all’interno del locale per l’intero Party fino alle 05:00 senza sovrapprezzi.',
        },
        {
          q: 'Qual è l’orario limite tassativo per il Tavolo Dehor da 320€?',
          a: 'Chi acquista o prenota il Tavolo Dehor da 320€ (Xceed #249217) deve effettuare il check-in all’ingresso entro e non oltre le ore 23:00.',
        },
        {
          q: 'Quali sono le regole di età e dress code uomo all’ingresso di Torre Branca?',
          a: 'Accesso riservato rigorosamente ai maggiori di 21 anni con documento fisico originale valido e abbigliamento elegante: per gli uomini è obbligatorio il pantalone lungo.',
        },
        {
          q: 'È disponibile il parcheggio con navetta gratuita per JustMe Milano?',
          a: `Sì, gli ospiti che arrivano in auto possono sostare al parcheggio convenzionato (${PARTENOPEA_JUSTME_SHUTTLE_MAP_URL}) collegato gratuitamente con servizio navetta al locale.`,
        },
        {
          q: 'Come funzionano l’acquisto online in euro e i pagamenti dei tavoli Privé VIP?',
          a: `Pass Cena 70€, Aperitivo 15€, Club 20€ e tavoli Dehor (320€), Pista (640€) e Centrali (1.280€) si acquistano direttamente qui in EUR; VIP Front (3.200€) e Console DJ (5.000€) si confermano live su WhatsApp ${PHONE} con pagamento anticipato 100%.`,
        },
        {
          q: 'Il locale JustMe Milano è riscaldato il 27 novembre?',
          a: 'Sì. Tutta la grande veranda in acciaio e vetro di Italo Rota ai piedi della Torre Branca è chiusa ermeticamente e riscaldata per cena e serata invernale.',
        },
        {
          q: 'Come si arriva con i mezzi pubblici a Viale Luigi Camoens 2?',
          a: 'Con la metro M1 Rossa o M2 Verde fino a Cadorna FN (6 minuti a piedi attraverso Parco Sempione) oppure M2 Verde fino a Lanza Brera (7 minuti costeggiando l’Arena Civica).',
        },
      ]
    : isZh
      ? [
          {
            q: '现场 歌舞 晚宴 与 周五 主场 派对 分别 几点 准时 开始？',
            a: '19:30 开放 餐前酒 与 迎宾；21:30 准时 开始 John Vaccaro 现场 歌舞 晚宴 (70€)；23:00 由 DJ Franky Dee 与 DJ Antonio Marigliano 开启 派对 直至 次日 05:00。',
          },
          {
            q: '70€ 晚宴 菜单 具体 包含 哪些 那不勒斯 菜肴 与 酒水？',
            a: '包括 4 款 共享 前菜 (烤千层茄子 Parmigiana、水牛 莫扎里拉 奶酪、Luciana 小章鱼、外婆 肉丸)、Mezzi Paccheri 那不勒斯 肉酱 面、阿马尔菲 柠檬 雪葩、矿泉水、佐餐 红白 葡萄酒 与 意式 咖啡。',
          },
          {
            q: '预订 70€ 晚宴 之后 留下来 参加 23:00 派对 需要 再买 夜店 门票 吗？',
            a: '不需要！所有 预订 70€ 晚宴 套餐 或 19:30 15€ 餐前酒 入场 的 宾客 均可 无缝 留场 参与 周五 派对 至 05:00，零 额外 费用。',
          },
          {
            q: '预订 320€ Dehor Table 户外 卡座 有 什么 强制 入场 时间 要求？',
            a: '所有 预订 320€ Dehor 卡座 的 团队 务必 于 当晚 23:00 前 抵达 Viale Camoens 2 完成 检票 入座。',
          },
          {
            q: 'JustMe Milano 当晚 年龄 限制 与 着装 规范 有 何 具体 要求？',
            a: '严格 执行 21 周岁 以上 21+ 实体 身份证件 核验 与 优雅 正装 礼仪，男士 必须 穿着 整洁 长裤，严禁 短裤 与 运动 套装。',
          },
          {
            q: '周五 自驾 前往 如何 使用 合作 停车场 免费 接驳 巴士？',
            a: `直接 导航 至 官方 合作 停车场 (${PARTENOPEA_JUSTME_SHUTTLE_MAP_URL})，停妥 后 即有 免费 穿梭 班车 接送 往返 俱乐部 正门。`,
          },
          {
            q: '网站 直接 欧元 购买 与 VIP 前排 / DJ 席位 预订 如何 确认？',
            a: `70€ 晚宴、15€ 餐前酒、20€ 夜店 及 320€–1.280€ 卡座 可 直接 在 站内 以 欧元 完成 下单；3.200€ VIP Front 与 5.000€ DJ 台 可 联系 WhatsApp ${PHONE} 享 24/7 专席 确认。`,
          },
          {
            q: '11月27日 米兰 夜间 寒冷，场馆 内部 是否 具备 暖气？',
            a: '全面 恒温 供暖。JustMe Milano 标志性 玻璃 建筑 在 冬季 采用 全 封闭 保温 设计，就餐 与 跳舞 均 温暖 舒适。',
          },
          {
            q: '搭乘 米兰 地铁 如何 最快 步行 到达 俱乐部 正门？',
            a: '搭乘 地铁 M1 红线 或 M2 绿线 至 Cadorna FN 站 步行 6 分钟，或 M2 绿线 至 Lanza 站 步行 7 分钟 直达 Torre Branca 入口。',
          },
        ]
      : [
          {
            q: 'What are the exact start times for the Dinner Show and the Friday Party?',
            a: 'Doors open at 19:30 for the €15 Aperitif and dinner seating check-in; Voice John Vaccaro kicks off the €70 CSP Dinner Show at 21:30, and DJ Franky Dee plus DJ Antonio Marigliano launch the Start Party at 23:00 until 05:00.',
          },
          {
            q: 'Which dishes and drinks come inside the €70 Neapolitan Dinner Show menu?',
            a: 'Four sharing antipasti (Parmigiana di melanzane, Mozzarella di bufala, Polipetti alla Luciana, Polpette al sugo della nonna), Mezzi Paccheri al ragù napoletano, Amalfi lemon sorbet, water, house wine, and coffee.',
          },
          {
            q: 'Do €70 Dinner Show guests need to pay a separate ticket to stay for the 23:00 club night?',
            a: 'No. Every €70 dinner guest (as well as 19:30 Aperitif €15 holders) automatically keeps full entry to the club party until 05:00 at zero additional door fee.',
          },
          {
            q: 'What is the strict arrival deadline for the €320 Dehor Table?',
            a: 'Under Xceed #249217 rules, groups reserving the €320 Dehor Table must complete entrance check-in by 23:00.',
          },
          {
            q: 'What are the age limit and men’s trouser requirements at Torre Branca?',
            a: 'Admission is strictly 21+ with a valid physical photo ID, and dress code is Elegant with long trousers mandatory for all male guests.',
          },
          {
            q: 'How does the complimentary shuttle from JustMe Milano’s partner car park work?',
            a: `Drivers navigate to the verified partner parking pin (${PARTENOPEA_JUSTME_SHUTTLE_MAP_URL}) and ride the free round-trip shuttle directly to the Viale Camoens 2 doors.`,
          },
          {
            q: 'Which tickets and tables book online in EUR vs via 24/7 WhatsApp Concierge?',
            a: `The €70 Menu + Party pass, €15 Aperitif, €20 Friday Club pass, Dehor (€320), Dance Floor (€640), and Central (€1.280) tables purchase directly in EUR on this page; VIP Front (€3.200) and DJ Table (€5.000) confirm live via WhatsApp ${PHONE} under 100% prepayment.`,
          },
          {
            q: 'Is JustMe Milano’s glass pavilion heated in late November?',
            a: 'Yes. The entire architectural glass-and-steel veranda designed by Italo Rota operates fully enclosed and heated throughout autumn and winter.',
          },
          {
            q: 'Which Milan Metro stations are closest to JustMe Milano?',
            a: 'Take Metro M1 Red or M2 Green to Cadorna FN (6-minute walk across Parco Sempione) or M2 Green to Lanza Brera (7 minutes past Arena Civica).',
          },
        ];

  const faqs: PartenopeaFaqItem[] = [...core.nativeFaqs, ...baseExtraFaqs];

  const mapLabels = isIt
    ? {
        loadMap: 'Carica Mappa JustMe Milano (Viale Camoens 2)',
        mapTitle: 'Mappa Interattiva JustMe Milano · Cena Spettacolo Partenopea',
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
          mapTitle: 'Interactive Map of JustMe Milano · Cena Spettacolo Partenopea',
          privacyLoadNotice: 'To respect your privacy, Google Maps loads only when you click.',
        };

  return {
    quickFacts,
    overviewParagraphs,
    timelineSteps,
    culinaryHighlights,
    menuCardCaption,
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
      ? 'Architettura Italo Rota, dress code, calendari settimanali e tutte le serate speciali sotto la Torre Branca.'
      : isZh
        ? '查看 全景 玻璃 架构 介绍、每周 派对 日历 与 重大 节日 专场 汇总。'
        : 'Discover full venue architecture, annual special events, dress code policy, and concierge services beneath Torre Branca.',
    thanksgivingBannerEyebrow: isIt ? 'Giovedì 26 Novembre 2026 · La Sera Prima' : isZh ? '2026年11月26日 周四 · 感恩节 前夜' : 'Thu 26 Nov 2026 · Night Before',
    thanksgivingBannerDesc: isIt
      ? 'Royal Buffet americano con Show Cooking Old Turkey (15€) e Vida Loca Radio 105 sempre al JustMe Milano giovedì 26 novembre.'
      : isZh
        ? '查看 11 月 26 日 周四 JustMe 米兰 感恩节 皇家 自助 晚宴 与 Vida Loca Radio 105 派对。'
        : 'Also celebrating Thursday Nov 26? See Happy Thanksgiving American Royal Buffet (€15) & Vida Loca Radio 105 at JustMe.',
    dec31BannerEyebrow: isIt ? '31 Dicembre 2026 · Capodanno' : isZh ? '2026年12月31日 · 跨年 盛典' : '31 Dec 2026 · New Year’s Eve',
    dec31BannerDesc: isIt
      ? 'Gran Galà The Great Gatsby per San Silvestro 2027 al JustMe Milano: cene servite, champagne e dj set.'
      : isZh
        ? '探索 12 月 31 日 了不起 的 盖茨比 主题 跨年 晚宴 与 派对。'
        : 'Plan Dec 31st New Year’s Eve The Great Gatsby at JustMe Milano with gala dinners and midnight celebration.',
    orthodoxBannerEyebrow: isIt ? '13 Gennaio 2027 · Ortodosso' : isZh ? '2027年1月13日 · 东正教 新年' : '13 Jan 2027 · Orthodox NYE',
    orthodoxBannerDesc: isIt
      ? 'Cene servite Silver (60€) e Gold (80€), Club + 1 Drink (20€) e Guest Star DJ Nazar Radchuk al JustMe Milano.'
      : isZh
        ? '查看 1 月 13 日 Silver 60€ / Gold 80€ 晚宴 与 DJ Nazar Radchuk 东正教 新年夜。'
        : 'Explore Orthodox New Year 2027 at JustMe Milano with Silver (€60) & Gold (€80) gala dinners and DJ Nazar Radchuk.',
  };
}

export function getPartenopeaJustMeContent(locale: string): PartenopeaJustMeContent {
  const def = getLocaleDef(locale);
  const loc: LocaleCode = def ? def.code : 'en';
  const core = CORE_35[loc] || CORE_35.en;
  const narrative = buildNarrativeAndFaqs(loc, core);

  const tocIds = [
    'overview',
    'official-tickets-ecommerce',
    'dinner-show-menu',
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
    dinnerHeading: core.dinnerHeading,
    dinnerSubheading: core.dinnerSubheading,
    menuCardTitle: core.menuCardTitle,
    menuCardCaption: narrative.menuCardCaption,
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
    thanksgivingBannerEyebrow: narrative.thanksgivingBannerEyebrow,
    thanksgivingBannerTitle: core.thanksgivingTitle,
    thanksgivingBannerDesc: narrative.thanksgivingBannerDesc,
    thanksgivingBannerCta: core.thanksgivingCta,
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
