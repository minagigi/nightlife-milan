import type { CapodannoRelatedHolidayBanner } from '@/lib/capodanno/repvblic35';
import { capodannoEventPath } from '@/lib/capodanno/routes';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { enabledLocaleCodes, getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/locales';

export const ORTHODOX_NYE_JUSTME_XCEED_ID = '251019';
export const ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG =
  'il-ritorno-di-cappuccetto-rosso-justme-milano-2027-01-13';
export const ORTHODOX_NYE_JUSTME_SOURCE_URL =
  'https://xceed.me/en/milano/event/il-ritorno-di-cappuccetto-rosso/251019';
export const ORTHODOX_NYE_JUSTME_AFFILIATE_URL =
  'https://xceed.me/en/milano/event/il-ritorno-di-cappuccetto-rosso/251019/channel/nightlifemilan-1';

export const ORTHODOX_NYE_JUSTME_POSTER_SRC =
  '/images/events/orthodox-nye-2027/capodanno-ortodosso-justme-milano-2027.webp';
export const ORTHODOX_NYE_JUSTME_SILVER_MENU_SRC =
  '/images/events/orthodox-nye-2027/justme-ortodosso-2027-menu-silver-60.webp';
export const ORTHODOX_NYE_JUSTME_GOLD_MENU_SRC =
  '/images/events/orthodox-nye-2027/justme-ortodosso-2027-menu-gold-80.webp';

export const ORTHODOX_NYE_JUSTME_FLOW_ASSET_KEYS = [
  'orthodox-nye-justme-01-torre-branca',
  'orthodox-nye-justme-02-dinner-gala',
  'orthodox-nye-justme-03-vip-toast',
  'orthodox-nye-justme-04-red-luminous-crowd',
] as const;

export const ORTHODOX_NYE_JUSTME_VENUE = {
  id: 'v-justme',
  name: 'JustMe Milano',
  address: 'Viale Luigi Camoens, 2, 20121 Milano',
  district: 'Parco Sempione · Torre Branca',
  latitude: 45.4729624,
  longitude: 9.1735598,
} as const;

export const ORTHODOX_NYE_JUSTME_SLUGS_35: Record<LocaleCode, string> = {
  en: 'orthodox-new-year-justme-milan-2027',
  it: 'capodanno-ortodosso-justme-milano-2027',
  es: 'ano-nuevo-ortodoxo-justme-milan-2027',
  fr: 'nouvel-an-orthodoxe-justme-milan-2027',
  de: 'orthodoxes-neujahr-justme-mailand-2027',
  pt: 'ano-novo-ortodoxo-justme-milao-2027',
  nl: 'orthodox-nieuwjaar-justme-milaan-2027',
  ru: 'staryj-novyj-god-justme-milan-2027',
  tr: 'ortodoks-yilbasi-justme-milano-2027',
  zh: 'zhengjiao-xinnian-justme-milan-2027',
  ar: 'ras-al-sana-orthodoxy-justme-milano-2027',
  bg: 'vasilica-stara-nova-godina-justme-milano-2027',
  hr: 'pravoslavna-nova-godina-justme-milano-2027',
  cs: 'pravoslavny-novy-rok-justme-milan-2027',
  da: 'ortodokst-nytar-justme-milano-2027',
  et: 'vene-uusaasta-justme-milano-2027',
  fi: 'ortodoksinen-uusivuosi-justme-milano-2027',
  el: 'palaio-imerologio-protochronia-justme-milano-2027',
  hu: 'ortodox-ujev-justme-milano-2027',
  ga: 'athbhliain-cheartchreidmheach-justme-milano-2027',
  lv: 'vecais-jaunais-gads-justme-milano-2027',
  lt: 'senieji-naujieji-metai-justme-milano-2027',
  mt: 'sena-gdida-ortodossa-justme-milan-2027',
  pl: 'prawoslawny-nowy-rok-justme-mediolan-2027',
  ro: 'revelion-pe-rit-vechi-justme-milano-2027',
  sk: 'pravoslavny-novy-rok-justme-milano-2027',
  sl: 'pravoslavno-novo-leto-justme-milano-2027',
  sv: 'ortodoxt-nyar-justme-milano-2027',
  no: 'ortodoks-nyttar-justme-milano-2027',
  is: 'nyar-rettrunadra-justme-milano-2027',
  uk: 'staryj-novyj-rik-justme-milan-2027',
  sq: 'viti-i-ri-ortodoks-justme-milano-2027',
  sr: 'srpska-nova-godina-justme-milano-2027',
  bs: 'stara-nova-godina-justme-milano-2027',
  mk: 'stara-nova-godina-vasilica-justme-milano-2027',
};

const EXTRA_ALIASES = new Set<string>([
  ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG,
  'capodanno-ortodosso-2027-il-ritorno-di-cappuccetto-rosso-justme-milano-2027-01-13',
  'il-ritorno-di-cappuccetto-rosso-justme-milano',
  'il-ritorno-di-cappuccetto-rosso-251019',
  'capodanno-ortodosso-milano-2027',
  'orthodox-new-year-milan-2027',
  'staryj-novyj-god-milan-2027',
  'srpska-nova-godina-milano-2027',
  'revelion-rit-vechi-milano-2027',
  'vasilica-milano-2027',
  'justme-milano-capodanno-ortodosso-2027',
]);

const ALL_ORTHODOX_SLUGS = new Set<string>([
  ...Object.values(ORTHODOX_NYE_JUSTME_SLUGS_35),
  ...EXTRA_ALIASES,
]);

export function orthodoxNyeJustMeSlug(locale: string): string {
  return ORTHODOX_NYE_JUSTME_SLUGS_35[locale as LocaleCode] || ORTHODOX_NYE_JUSTME_SLUGS_35.en;
}

export function orthodoxNyeJustMePath(locale: string): string {
  const prefix = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale as LocaleCode);
  return `${prefix}/${eventsDir}/${orthodoxNyeJustMeSlug(locale)}`;
}

export function orthodoxNyeJustMeHreflangAlternates(
  baseUrl = 'https://nightlifemilan.com',
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of enabledLocaleCodes) {
    const def = getLocaleDef(loc);
    const key = def?.hreflang || loc;
    languages[key] = `${baseUrl}${orthodoxNyeJustMePath(loc)}`;
  }
  languages['x-default'] = `${baseUrl}${orthodoxNyeJustMePath('en')}`;
  return languages;
}

export function resolveOrthodoxNyeJustMeSlug(slug: string): boolean {
  return ALL_ORTHODOX_SLUGS.has((slug || '').trim().toLowerCase());
}

export interface OrthodoxCourseItem {
  course: string;
  dish: string;
  details: string;
}

export interface OrthodoxTimelineStep {
  time: string;
  title: string;
  detail: string;
}

export interface OrthodoxTicketTier {
  id: string;
  title: string;
  price: string;
  badge: string;
  summary: string;
  bullets: string[];
  action: 'xceed' | 'whatsapp';
}

export interface OrthodoxFaqItem {
  q: string;
  a: string;
}

export interface OrthodoxNyeJustMeContent {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumbEvents: string;
  breadcrumbSpecial: string;
  h1: string;
  subtitle: string;
  themeTag: string;
  dateBadge: string;
  priceBadge: string;
  ageDressBadge: string;
  description: string;
  xceedCtaLabel: string;
  whatsappCtaLabel: string;
  whatsappContext: string;
  quickFacts: { label: string; value: string }[];
  tocTitle: string;
  tocItems: { id: string; label: string }[];
  overviewHeading: string;
  overviewParagraphs: string[];
  timelineHeading: string;
  timelineSubheading: string;
  timelineSteps: OrthodoxTimelineStep[];
  menusHeading: string;
  menusSubheading: string;
  silverMenuTitle: string;
  silverMenuPrice: string;
  silverBeverages: string;
  silverCourses: OrthodoxCourseItem[];
  silverMenuAlt: string;
  goldMenuTitle: string;
  goldMenuPrice: string;
  goldBeverages: string;
  goldCourses: OrthodoxCourseItem[];
  goldMenuAlt: string;
  ticketsHeading: string;
  ticketsSubheading: string;
  tiers: OrthodoxTicketTier[];
  vipConciergeNote: string;
  contestHeading: string;
  contestSubheading: string;
  contestParagraphs: string[];
  contestPrizeBadge: string;
  contestPrizeTitle: string;
  contestPrizeDetails: string;
  dressCodeOkTitle: string;
  dressCodeOkItems: string[];
  dressCodeNoTitle: string;
  dressCodeNoItems: string[];
  logisticsHeading: string;
  logisticsParagraphs: string[];
  logisticsFacts: { label: string; value: string }[];
  venueBannerEyebrow: string;
  venueBannerTitle: string;
  venueBannerDesc: string;
  venueBannerCta: string;
  dec31BannerEyebrow: string;
  dec31BannerTitle: string;
  dec31BannerDesc: string;
  dec31BannerCta: string;
  mapHeading: string;
  faqHeading: string;
  faqs: OrthodoxFaqItem[];
  shotLabels: [string, string, string, string];
  highlights: string[];
  priceSummary: string;
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
  xceedCtaLabel: string;
  whatsappCtaLabel: string;
  clubTierTitle: string;
  silverTierTitle: string;
  goldTierTitle: string;
  vipTierTitle: string;
  contestTitle: string;
  contestPrizeBadge: string;
  venueCta: string;
  dec31BannerBadge: string;
  dec31BannerTitle: string;
  dec31BannerDesc: string;
  dec31BannerCta: string;
  homeLabel: string;
  eventsLabel: string;
  specialLabel: string;
  heroLabels: [string, string, string, string];
  extraNativeParagraph: string;
  nativeFaqs: [OrthodoxFaqItem, OrthodoxFaqItem, OrthodoxFaqItem];
}

const CORE_35: Record<LocaleCode, CoreLocalePack> = {
  it: {
    metaTitle: 'Capodanno Ortodosso 2027 JustMe Milano | 13 Gennaio · 20€',
    metaDescription:
      'Capodanno Ortodosso 2027 al JustMe Milano mercoledì 13 gennaio: tema Cappuccetto Rosso, DJ Nazar Radchuk, Cene Silver 60€ & Gold 80€, Club 20€. Pass Xceed.',
    h1: 'Capodanno Ortodosso 2027 al JustMe Milano: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Mercoledì 13 Gennaio 2027 · 19:30 Cena di Gala / 23:30 Club fino alle 05:00 · Guest Star DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Tema Ufficiale · Il ritorno di Cappuccetto Rosso · Premio Settimana in Montagna',
    dateBadge: 'Mercoledì 13 Gennaio 2027 · 19:30 / 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegante con dettaglio rosso o luminoso',
    leadIntro:
      'Mercoledì 13 gennaio 2027 JustMe Milano firma l’appuntamento di riferimento per il Capodanno Ortodosso secondo il calendario giuliano ai piedi della Torre Branca illuminata nel Parco Sempione.',
    xceedCtaLabel: 'Acquista Biglietti e Cene su Xceed (da 20€)',
    whatsappCtaLabel: 'Prenota Tavolo VIP Privé o Info su WhatsApp 24/7',
    clubTierTitle: 'Ingresso Serata Club + 1 Drink (dalle 23:30)',
    silverTierTitle: 'Cena Servita Menu Silver (dalle 19:30 + Party)',
    goldTierTitle: 'Cena Servita Menu Gold Pesce (dalle 19:30 + Party)',
    vipTierTitle: 'Tavoli VIP Privé & Super Privé Torre Branca',
    contestTitle: 'Dress Code Elegante, Accessorio Rosso o Luminoso e Concorso Vacanza in Montagna',
    contestPrizeBadge: 'Premio 1 Settimana in Residence 4 Stelle in Montagna',
    venueCta: 'Scheda Locale JustMe Milano',
    dec31BannerBadge: '13 Gennaio 2027 · Nuovo Evento Xceed',
    dec31BannerTitle: 'Capodanno Ortodosso 2027 al JustMe Milano (13 Gennaio)',
    dec31BannerDesc:
      'Dopo il 31 dicembre, JustMe Milano accende il Capodanno Ortodosso con DJ Nazar Radchuk: Cena Silver 60€, Cena Gold 80€, Ingresso Club + 1 Drink 20€ e Tavoli VIP Privé.',
    dec31BannerCta: 'Scopri Capodanno Ortodosso (da 20€)',
    homeLabel: 'Home',
    eventsLabel: 'Eventi Milano',
    specialLabel: 'Eventi Speciali',
    heroLabels: [
      'Arrivo ospiti sotto la Torre Branca illuminata al JustMe Milano',
      'Cena di Gala Silver 60€ e Gold 80€ nella veranda riscaldata',
      'Brindisi di mezzanotte ai tavoli VIP Privé sotto il soffitto a specchi',
      'DJ Nazar Radchuk e pista internazionale fino alle 05:00',
    ],
    extraNativeParagraph:
      'La serata unisce comunità ortodosse internazionali, ospiti milanesi ed expat in una produzione completa sotto la cupola trasparente disegnata da Italo Rota: riscaldamento invernale integrale, doppio servizio gastronomico alle 19:30 e brindisi di mezzanotte ortodosso sulle selezioni house, hip hop e hit internazionali di DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Quando si festeggia esattamente il Capodanno Ortodosso 2027 al JustMe Milano?',
        a: 'La festa inizia mercoledì 13 gennaio 2027 alle 19:30 con le cene servite Silver e Gold, prosegue dalle 23:30 con l’ingresso club e il brindisi della mezzanotte ortodossa tra il 13 e giovedì 14 gennaio 2027 fino alle 05:00 del mattino.',
      },
      {
        q: 'Qual è la differenza tra Menu Silver 60€ e Menu Gold 80€?',
        a: 'Il Menu Silver da 60€ include tris di antipasti, Risotto ai Crostacei e Zucchine Nane in Fiore e Cheesecake al Pistacchio. Il Menu Gold da 80€ aggiunge un percorso completo di mare con Catalana di Mare, Tacos di Tonno con Burrata e Caviale, Tataki di Salmone, Pacchero Scampi e Porcini, Trancio di Salmone al Miso e Ikura e dessert Ciambella Amarena, Mascarpone e Cioccolato Fuso. Entrambi includono 1 bottiglia di acqua e 1 di vino ogni 4 ospiti più il party.',
      },
      {
        q: 'Come funziona l’ingresso club a 20€ con Xceed rispetto ai Tavoli VIP Privé?',
        a: 'Il biglietto Club + 1 Drink a 20€ garantisce ingresso dalle 23:30 tramite il canale ufficiale Xceed nightlifemilan-1 (o gestione gruppi con concierge WhatsApp +39 351 912 7047). I Tavoli VIP Privé in pista o console offrono ingresso prioritario dedicato e spesa minima dedicata in bottiglie su quotazione WhatsApp.',
      },
    ],
  },
  en: {
    metaTitle: 'Orthodox New Year 2027 at JustMe Milan | Jan 13 · From €20',
    metaDescription:
      'Orthodox New Year 2027 at JustMe Milan on Wed Jan 13: Little Red Riding Hood theme, DJ Nazar Radchuk, €60/€80 Gala Dinners, €20 Club Pass on Xceed.',
    h1: 'Orthodox New Year 2027 at JustMe Milan: Return of Little Red Riding Hood',
    subtitle:
      'Wednesday Jan 13, 2027 · 19:30 Seated Gala Dinners / 23:30 Club Till 05:00 · Guest Star DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Official Theme · Il ritorno di Cappuccetto Rosso · 4-Star Mountain Holiday Contest',
    dateBadge: 'Wed Jan 13, 2027 · 19:30 to 05:00',
    priceBadge: 'Club €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegant with red or luminous accent',
    leadIntro:
      'On Wednesday January 13, 2027, JustMe Milano hosts Milan’s flagship Old New Year (Julian calendar New Year Eve) gala inside its heated glass pavilion directly beneath the illuminated Torre Branca in Parco Sempione.',
    xceedCtaLabel: 'Buy Official Tickets & Dinners on Xceed (from €20)',
    whatsappCtaLabel: 'Book VIP Privé Table or Concierge Help 24/7',
    clubTierTitle: 'Club Night Entry + 1 Drink (from 23:30)',
    silverTierTitle: 'Silver Seated Gala Dinner (from 19:30 + Party)',
    goldTierTitle: 'Gold Seafood Gala Dinner (from 19:30 + Party)',
    vipTierTitle: 'VIP Privé & Console Bottle Service Tables',
    contestTitle: 'Elegant Dress Code, Red or Glowing Accent & 4-Star Mountain Vacation Award',
    contestPrizeBadge: 'Grand Prize: 1-Week 4-Star Mountain Residence Stay',
    venueCta: 'JustMe Milano Venue Guide',
    dec31BannerBadge: 'Jan 13, 2027 · Official Xceed Event',
    dec31BannerTitle: 'Orthodox New Year 2027 at JustMe Milan (January 13)',
    dec31BannerDesc:
      'Keep celebrating into January: DJ Nazar Radchuk headlines JustMe Milan on Jan 13 with Silver Dinner €60, Gold Seafood Dinner €80, Club + 1 Drink €20, and VIP Privé tables.',
    dec31BannerCta: 'Explore Orthodox NYE (€20+)',
    homeLabel: 'Home',
    eventsLabel: 'Milan Events',
    specialLabel: 'Special Events',
    heroLabels: [
      'Guest arrival beneath Torre Branca at JustMe Milano',
      'Seated Silver €60 and Gold €80 Gala Dinners in the winter pavilion',
      'Midnight Orthodox New Year toast in the VIP Privé mirrored veranda',
      'DJ Nazar Radchuk international dancefloor until 05:00',
    ],
    extraNativeParagraph:
      'Whether you celebrate Staryj Novyj God, Srpska Nova Godina, Vasilica, or Old Calendar New Year in Milan, this edition blends seated fine Italian gastronomy at 19:30 with a high-energy late-night club showcase led by guest star DJ Nazar Radchuk on House, Hip-Hop, and global party hits.',
    nativeFaqs: [
      {
        q: 'What time do dinner guests and club ticket holders enter JustMe Milano on Jan 13, 2027?',
        a: 'Seated Silver (€60) and Gold (€80) dinner guests are welcomed from 19:30 inside the heated winter veranda and keep access for the full club night. Club + 1 Drink ticket holders (€20) enter from 23:30 ahead of the Julian midnight toast and party until 05:00.',
      },
      {
        q: 'Are wine and water included in the €60 Silver and €80 Gold Orthodox New Year menus?',
        a: 'Yes. Both official JustMe Milano gala menus include one bottle of water and one bottle of wine for every 4 guests at the table, alongside full party admission after dinner.',
      },
      {
        q: 'How do guests enter the Best Look mountain holiday contest?',
        a: 'The dress code requires Elegant winter attire paired with either a red item or a subtle luminous/glowing accessory honoring Il ritorno di Cappuccetto Rosso. On-site event judges award the most original and radiant look a one-week mountain vacation stay in a 4-star residence.',
      },
    ],
  },
  es: {
    metaTitle: 'Año Nuevo Ortodoxo 2027 JustMe Milán | 13 Ene · 20€',
    metaDescription:
      'Año Nuevo Ortodoxo 2027 en JustMe Milán el miércoles 13 de enero: DJ Nazar Radchuk, Cenas Silver 60€ y Gold 80€, Club + 1 copa 20€. Entradas oficiales Xceed.',
    h1: 'Año Nuevo Ortodoxo 2027 en JustMe Milán: El Regreso de Caperucita Roja',
    subtitle:
      'Miércoles 13 de enero 2027 · 19:30 Cena de Gala / 23:30 Club hasta 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Temática Oficial · Il ritorno di Cappuccetto Rosso · Premio Estancia en la Montaña',
    dateBadge: 'Miércoles 13 Enero 2027 · 19:30 / 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegante con detalle rojo o luminoso',
    leadIntro:
      'El miércoles 13 de enero de 2027 JustMe Milán celebra el Año Nuevo Ortodoxo bajo el calendario juliano al pie de la iluminada Torre Branca en Parco Sempione, con cenas servidas, música internacional y premio exclusivo.',
    xceedCtaLabel: 'Comprar Entradas y Cenas en Xceed (desde 20€)',
    whatsappCtaLabel: 'Reservar Mesa VIP Privé o Concierge 24/7',
    clubTierTitle: 'Entrada Club + 1 Copa (desde 23:30)',
    silverTierTitle: 'Cena Servida Menú Silver (19:30 + Fiesta)',
    goldTierTitle: 'Cena Servida Menú Gold Marisco (19:30 + Fiesta)',
    vipTierTitle: 'Mesas VIP Privé y Botellas Torre Branca',
    contestTitle: 'Código Elegante, Detalle Rojo o Luminoso y Concurso Residencia 4 Estrellas',
    contestPrizeBadge: 'Premio: 1 Semana en Residencia 4 Estrellas de Montaña',
    venueCta: 'Ficha Club JustMe Milán',
    dec31BannerBadge: '13 Enero 2027 · Evento Oficial Xceed',
    dec31BannerTitle: 'Año Nuevo Ortodoxo 2027 en JustMe Milán (13 Ene)',
    dec31BannerDesc:
      'Tras el 31 de diciembre, vive el Capodanno Ortodoxo con DJ Nazar Radchuk: Cena Silver 60€, Cena Gold 80€, Club 20€ y Mesas VIP.',
    dec31BannerCta: 'Ver Año Nuevo Ortodoxo (desde 20€)',
    homeLabel: 'Inicio',
    eventsLabel: 'Eventos Milán',
    specialLabel: 'Eventos Especiales',
    heroLabels: [
      'Llegada nocturna de invierno bajo Torre Branca en JustMe Milán',
      'Cenas de Gala Silver 60€ y Gold 80€ en el pabellón acristalado',
      'Brindis de medianoche en zona VIP Privé junto a las esferas espejo',
      'Pista internacional con DJ Nazar Radchuk hasta las 05:00',
    ],
    extraNativeParagraph:
      'Una velada internacional diseñada para residentes, visitantes en Milán durante enero y comunidades ortodoxas de Europa del Este, combinando alta cocina italiana servida en mesa desde las 19:30 con house, hip hop y éxitos internacionales hasta las 05:00.',
    nativeFaqs: [
      {
        q: '¿Qué incluye la entrada Club de 20€ para el 13 de enero en JustMe Milán?',
        a: 'La entrada Club de 20€ en Xceed garantiza acceso a partir de las 23:30 con una consumición incluida para el brindis de medianoche y sesión de DJ Nazar Radchuk hasta las 05:00.',
      },
      {
        q: '¿Están incluidas las bebidas en los menús Silver (60€) y Gold (80€)?',
        a: 'Sí, ambos menús de cena sentada incluyen una botella de agua y una botella de vino por cada 4 comensales y permanencia completa en la discoteca.',
      },
      {
        q: '¿Qué requisitos pide el dress code y el concurso del premio en la montaña?',
        a: 'Se exige vestimenta elegante para mayores de 21 años combinada con una prenda o accesorio rojo o luminoso. El look más original gana una semana en residencia 4 estrellas en la montaña.',
      },
    ],
  },
  fr: {
    metaTitle: 'Nouvel An Orthodoxe 2027 JustMe Milan | 13 Jan · Dès 20€',
    metaDescription:
      'Nouvel An Orthodoxe 2027 au JustMe Milan mercredi 13 janvier : thème Chaperon Rouge, DJ Nazar Radchuk, Dîners Silver 60€ & Gold 80€, Club 20€ via Xceed.',
    h1: 'Nouvel An Orthodoxe 2027 au JustMe Milan : Le Retour du Petit Chaperon Rouge',
    subtitle:
      'Mercredi 13 Janvier 2027 · 19h30 Dîner de Gala / 23h30 Club jusqu’à 05h00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Thème Officiel · Il ritorno di Cappuccetto Rosso · Concours Séjour Montagne 4*',
    dateBadge: 'Mercredi 13 Janvier 2027 · 19h30 / 05h00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Tenue élégante avec touche rouge ou lumineuse',
    leadIntro:
      'Le mercredi 13 janvier 2027, JustMe Milan célèbre le Nouvel An Orthodoxe selon le calendrier julien au pied de la Torre Branca illuminée au Parco Sempione, sous sa verrière hivernale chauffée.',
    xceedCtaLabel: 'Billets et Dîners Officiels sur Xceed (dès 20€)',
    whatsappCtaLabel: 'Réserver Table VIP Privé ou Concierge 24/7',
    clubTierTitle: 'Entrée Club + 1 Boisson (dès 23h30)',
    silverTierTitle: 'Dîner Assis Menu Silver (dès 19h30 + Club)',
    goldTierTitle: 'Dîner Assis Menu Gold Mer (dès 19h30 + Club)',
    vipTierTitle: 'Tables VIP Privé & Service Bouteilles',
    contestTitle: 'Dress Code Élégant Rouge ou Lumineux & Prix Séjour à la Montagne',
    contestPrizeBadge: 'Prix : 1 Semaine en Résidence 4 Étoiles à la Montagne',
    venueCta: 'Fiche Club JustMe Milan',
    dec31BannerBadge: '13 Janvier 2027 · Événement Xceed',
    dec31BannerTitle: 'Nouvel An Orthodoxe 2027 au JustMe Milan (13 Jan)',
    dec31BannerDesc:
      'Prolongez les fêtes en janvier avec DJ Nazar Radchuk : Dîner Silver 60€, Dîner Gold 80€, Entrée Club 20€ et tables VIP.',
    dec31BannerCta: 'Voir le Nouvel An Orthodoxe (dès 20€)',
    homeLabel: 'Accueil',
    eventsLabel: 'Événements Milan',
    specialLabel: 'Événements Spéciaux',
    heroLabels: [
      'Arrivée élégante sous la Torre Branca illuminée à Milan',
      'Dîners de Gala Silver 60€ et Gold 80€ sous la verrière',
      'Toast de minuit aux tables VIP Privé du JustMe Milan',
      'DJ Nazar Radchuk sur la piste internationale jusqu’à 05h00',
    ],
    extraNativeParagraph:
      'Sous la nef de verre et d’acier signée Italo Rota, la soirée réunit gastronomie italienne servie à table à 19h30, ambiance cosmopolite 21+ et programmation house, hip-hop et hits internationaux pilotée par le guest star DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'À quelle heure arrivent les convives du dîner et les détenteurs de billets Club ?',
        a: 'Les formules Silver (60€) et Gold (80€) débutent à 19h30 et incluent l’accès au club. Les entrées Club à 20€ ouvrent à 23h30 jusqu’à 05h00.',
      },
      {
        q: 'Le vin et l’eau sont-ils compris dans les menus Silver et Gold ?',
        a: 'Oui, chaque table reçoit 1 bouteille d’eau et 1 bouteille de vin pour 4 personnes.',
      },
      {
        q: 'Comment remporter le séjour d’une semaine en résidence 4 étoiles à la montagne ?',
        a: 'En portant une tenue élégante avec une pièce rouge ou un accessoire lumineux : le look le plus créatif et radieux est récompensé sur place.',
      },
    ],
  },
  de: {
    metaTitle: 'Orthodoxes Neujahr 2027 JustMe Mailand | 13. Jan · Ab 20€',
    metaDescription:
      'Orthodoxes Neujahr 2027 im JustMe Mailand am 13. Januar: DJ Nazar Radchuk, Gala-Dinners Silver 60€ & Gold 80€, Club-Ticket 20€ über Xceed.',
    h1: 'Orthodoxes Neujahr 2027 im JustMe Mailand: Die Rückkehr von Rotkäppchen',
    subtitle:
      'Mittwoch, 13. Januar 2027 · 19:30 Gala-Dinner / 23:30 Club bis 05:00 · Guest Star DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Motto · Il ritorno di Cappuccetto Rosso · Hauptpreis Bergurlaub 4-Sterne',
    dateBadge: 'Mi 13. Jan 2027 · 19:30 – 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegant mit rotem oder leuchtendem Akzent',
    leadIntro:
      'Am Mittwoch, den 13. Januar 2027 feiert das JustMe Milano das Orthodoxe Neujahr nach dem julianischen Kalender direkt unter dem beleuchteten Torre Branca im Parco Sempione mit festlichem Winter-Gala-Dinner und Clubnacht.',
    xceedCtaLabel: 'Tickets & Gala-Dinner über Xceed sichern (ab 20€)',
    whatsappCtaLabel: 'VIP Privé Tisch oder 24/7 Concierge anfragen',
    clubTierTitle: 'Club-Eintritt + 1 Drink (ab 23:30)',
    silverTierTitle: 'Silver Gala-Dinner am Tisch (ab 19:30 + Party)',
    goldTierTitle: 'Gold Meeresfrüchte-Dinner (ab 19:30 + Party)',
    vipTierTitle: 'VIP Privé & Console Flaschenservice',
    contestTitle: 'Dresscode Elegant, Rot/Leuchtend & Wettbewerb 1 Woche Bergurlaub',
    contestPrizeBadge: 'Preis: 1 Woche 4-Sterne-Bergresidenz für den besten Look',
    venueCta: 'JustMe Mailand Club-Guide',
    dec31BannerBadge: '13. Jan 2027 · Offizielles Xceed Event',
    dec31BannerTitle: 'Orthodoxes Neujahr 2027 im JustMe Mailand (13. Jan)',
    dec31BannerDesc:
      'Weiterfeiern im Januar mit DJ Nazar Radchuk: Silver Dinner 60€, Gold Dinner 80€, Club-Ticket 20€ und VIP-Tische.',
    dec31BannerCta: 'Orthodoxes Neujahr ansehen (ab 20€)',
    homeLabel: 'Startseite',
    eventsLabel: 'Events Mailand',
    specialLabel: 'Special Events',
    heroLabels: [
      'Winterabend unter dem Torre Branca am Eingang des JustMe Mailand',
      'Silver 60€ und Gold 80€ Gala-Dinner im beheizten Glaspavillon',
      'Mitternachtstoast in der verspiegelten VIP Privé Lounge',
      'Internationale Clubnacht mit DJ Nazar Radchuk bis 05:00 Uhr',
    ],
    extraNativeParagraph:
      'Der beheizte Winterpavillon im Parco Sempione vereint ab 19:30 Uhr italienische Menüküche mit anschließendem DJ-Set von Nazar Radchuk (House, Hip-Hop und internationale Hits) sowie Mitternachts-Countdown zum orthodoxen Neujahr.',
    nativeFaqs: [
      {
        q: 'Wann beginnt das Dinner und ab wann öffnet der Club am 13. Januar 2027?',
        a: 'Das Silver- (60€) und Gold-Gala-Dinner (80€) startet um 19:30 Uhr inklusive Verbleib für die Party; der reine Club-Eintritt (20€ inkl. 1 Drink) gilt ab 23:30 Uhr bis 05:00 Uhr.',
      },
      {
        q: 'Sind Getränke bei den Gala-Menüs enthalten?',
        a: 'Ja, in beiden Menüs sind 1 Flasche Wasser und 1 Flasche Wein pro 4 Gäste inklusive.',
      },
      {
        q: 'Wie nimmt man am Wettbewerb um eine Woche Bergurlaub teil?',
        a: 'Mit gepflegter Abendgarderobe (21+) und einem roten Kleidungsstück oder leuchtenden Accessoire. Das originellste Outfit gewinnt 1 Woche in einer 4-Sterne-Bergresidenz.',
      },
    ],
  },
  pt: {
    metaTitle: 'Ano Novo Ortodoxo 2027 JustMe Milão | 13 Jan · Desde 20€',
    metaDescription:
      'Ano Novo Ortodoxo 2027 no JustMe Milão quarta 13 de janeiro: tema Capuchinho Vermelho, DJ Nazar Radchuk, Jantares Silver 60€ e Gold 80€, Club 20€ na Xceed.',
    h1: 'Ano Novo Ortodoxo 2027 no JustMe Milão: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Quarta 13 de Janeiro 2027 · 19:30 Jantar de Gala / 23:30 Club até 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Tema Oficial · Il ritorno di Cappuccetto Rosso · Prémio Férias na Montanha',
    dateBadge: 'Quarta 13 Jan 2027 · 19:30 / 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegante com detalhe vermelho ou luminoso',
    leadIntro:
      'Na quarta-feira, 13 de janeiro de 2027, o JustMe Milano recebe a grande noite do Ano Novo Ortodoxo (calendário juliano) sob a cúpula de vidro aquecida junto à Torre Branca no Parco Sempione.',
    xceedCtaLabel: 'Comprar Bilhetes e Jantares na Xceed (desde 20€)',
    whatsappCtaLabel: 'Reservar Mesa VIP Privé ou Concierge 24/7',
    clubTierTitle: 'Entrada Club + 1 Bebida (desde as 23:30)',
    silverTierTitle: 'Jantar Sentado Menu Silver (desde 19:30 + Festa)',
    goldTierTitle: 'Jantar Sentado Menu Gold Marisco (desde 19:30 + Festa)',
    vipTierTitle: 'Mesas VIP Privé & Serviço de Garrafas',
    contestTitle: 'Dress Code Elegante Vermelho ou Luminoso & Concurso Residência 4 Estrelas',
    contestPrizeBadge: 'Prémio: 1 Semana em Residência 4 Estrelas na Montanha',
    venueCta: 'Perfil JustMe Milão',
    dec31BannerBadge: '13 Jan 2027 · Evento Oficial Xceed',
    dec31BannerTitle: 'Ano Novo Ortodoxo 2027 no JustMe Milão (13 Jan)',
    dec31BannerDesc:
      'Continue a celebrar em janeiro com DJ Nazar Radchuk: Jantar Silver 60€, Gold 80€, Entrada Club 20€ e Mesas VIP.',
    dec31BannerCta: 'Ver Ano Novo Ortodoxo (desde 20€)',
    homeLabel: 'Início',
    eventsLabel: 'Eventos Milão',
    specialLabel: 'Eventos Especiais',
    heroLabels: [
      'Chegada noturna de inverno sob a Torre Branca no JustMe Milão',
      'Jantares de Gala Silver 60€ e Gold 80€ no pavilhão envidraçado',
      'Brinde da meia-noite nas mesas VIP Privé do JustMe Milão',
      'Pista internacional com DJ Nazar Radchuk até às 05:00',
    ],
    extraNativeParagraph:
      'O encontro combina gastronomia italiana de referência desde as 19:30 com sets de House, Hip-Hop e êxitos internacionais pelo convidado especial DJ Nazar Radchuk até às 05:00 da manhã.',
    nativeFaqs: [
      {
        q: 'Qual o horário dos jantares e da entrada de discoteca em 13 de janeiro?',
        a: 'Os jantares Silver (60€) e Gold (80€) começam às 19:30 com acesso incluído ao club; a entrada Club (20€ + 1 bebida) decorre das 23:30 às 05:00.',
      },
      {
        q: 'Água e vinho estão incluídos nos menus Silver e Gold?',
        a: 'Sim, ambos os menus oferecem 1 garrafa de água e 1 garrafa de vinho por cada 4 convidados.',
      },
      {
        q: 'Como funciona o concurso para o prémio na montanha?',
        a: 'Traje elegante (21+) com acessório vermelho ou luminoso; o visual mais original vence 1 semana em residência de 4 estrelas na montanha.',
      },
    ],
  },
  nl: {
    metaTitle: 'Orthodox Nieuwjaar 2027 JustMe Milaan | 13 Jan · Vanaf €20',
    metaDescription:
      'Orthodox Nieuwjaar 2027 bij JustMe Milano op woensdag 13 januari: DJ Nazar Radchuk, Silver Diner €60, Gold Diner €80 en Club €20 via Xceed.',
    h1: 'Orthodox Nieuwjaar 2027 bij JustMe Milaan: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Woensdag 13 januari 2027 · 19:30 Galadiner / 23:30 Club tot 05:00 · Guest Star DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Officiële Thema-avond · Rood of Lichtgevend Accent · Bergvakantie Prijs',
    dateBadge: 'Wo 13 Jan 2027 · 19:30 – 05:00',
    priceBadge: 'Club €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegant met rood of lichtgevend accent',
    leadIntro:
      'Op woensdag 13 januari 2027 viert JustMe Milano het Orthodoxe Nieuwjaar volgens de Juliaanse kalender onder de verlichte Torre Branca in Parco Sempione, compleet met tweevoudig galadiner en internationale clubnacht.',
    xceedCtaLabel: 'Koop Officiële Tickets & Diners op Xceed (vanaf €20)',
    whatsappCtaLabel: 'Reserveer VIP Privé Tafel of 24/7 Concierge',
    clubTierTitle: 'Club Toegang + 1 Drankje (vanaf 23:30)',
    silverTierTitle: 'Silver Zittend Galadiner (vanaf 19:30 + Party)',
    goldTierTitle: 'Gold Zeevruchten Galadiner (vanaf 19:30 + Party)',
    vipTierTitle: 'VIP Privé & Console Flessenservice Tafels',
    contestTitle: 'Elegante Dresscode met Rood/Lichtgevend Accent & 4-Sterren Bergvakantie',
    contestPrizeBadge: 'Hoofdprijs: 1 Week Verblijf in 4-Sterren Bergresidentie',
    venueCta: 'JustMe Milaan Clubprofiel',
    dec31BannerBadge: '13 Jan 2027 · Officieel Xceed Event',
    dec31BannerTitle: 'Orthodox Nieuwjaar 2027 bij JustMe Milaan (13 Jan)',
    dec31BannerDesc:
      'Vier ook op 13 januari met DJ Nazar Radchuk: Silver Diner €60, Gold Diner €80, Club €20 en VIP Tafels.',
    dec31BannerCta: 'Bekijk Orthodox Nieuwjaar (vanaf €20)',
    homeLabel: 'Home',
    eventsLabel: 'Evenementen Milaan',
    specialLabel: 'Speciale Events',
    heroLabels: [
      'Aankomst van gasten onder Torre Branca bij JustMe Milaan',
      'Silver €60 en Gold €80 galadiners in het verwarmde glaspaviljoen',
      'Middernachtstoast aan de VIP Privé tafels bij JustMe Milaan',
      'Internationale dansvloer met DJ Nazar Radchuk tot 05:00',
    ],
    extraNativeParagraph:
      'Onder het verwarmde glazen paviljoen van Italo Rota combineert de avond vanaf 19:30 uur hoogwaardige Italiaanse gerechten met House, Hip-Hop en internationale hits door DJ Nazar Radchuk tot 05:00 uur.',
    nativeFaqs: [
      {
        q: 'Hoe laat beginnen de diners en het clubgedeelte op 13 januari 2027?',
        a: 'De zittende diners Silver (€60) en Gold (€80) starten om 19:30 en geven doorlopende clubtoegang; het Club-ticket (€20 met 1 drankje) geldt vanaf 23:30 tot 05:00.',
      },
      {
        q: 'Zijn wijn en water bij de dinermenu’s inbegrepen?',
        a: 'Ja, per 4 personen zijn 1 fles water en 1 fles wijn standaard inbegrepen bij zowel Silver als Gold.',
      },
      {
        q: 'Hoe maak ik kans op de week bergvakantie in een 4-sterrenresidentie?',
        a: 'Kom in elegante avondkleding (21+) met een rood detail of lichtgevend accessoire; de meest originele look wint de prijs.',
      },
    ],
  },
  ru: {
    metaTitle: 'Старый Новый Год 2027 JustMe Милан | 13 января · от 20€',
    metaDescription:
      'Старый Новый Год 2027 в JustMe Milano 13 января: DJ Nazar Radchuk, ужины Silver 60€ и Gold 80€, вход в клуб + 1 напиток 20€. Билеты Xceed и VIP-столы 24/7.',
    h1: 'Старый Новый Год 2027 в JustMe Милан: Возвращение Красной Шапочки',
    subtitle:
      'Среда 13 января 2027 · 19:30 Гала-ужин / 23:30 Клуб до 05:00 · Guest Star DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Официальная тема · Il ritorno di Cappuccetto Rosso · Приз: неделя в горах 4*',
    dateBadge: 'Ср 13 января 2027 · 19:30 / 05:00',
    priceBadge: 'Клуб 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Элегантный образ с красным или светящимся акцентом',
    leadIntro:
      'В среду 13 января 2027 года флагманский клуб JustMe Milano приглашает на главный Старый Новый Год Милана у подножия подсвеченной башни Torre Branca в Парко Семпионе: зимний отапливаемый стеклянный павильон, изысканные сет-ужины и шоу до 05:00 утра.',
    xceedCtaLabel: 'Купить билеты и ужины на Xceed (от 20€)',
    whatsappCtaLabel: 'Забронировать VIP Privé стол или консьерж 24/7',
    clubTierTitle: 'Вход в клуб + 1 напиток (с 23:30)',
    silverTierTitle: 'Гала-ужин Silver с рассадкой (с 19:30 + вечеринка)',
    goldTierTitle: 'Морской гала-ужин Gold с рассадкой (с 19:30 + вечеринка)',
    vipTierTitle: 'VIP Privé и столы у пульта диджея',
    contestTitle: 'Дресс-код с красным или светящимся акцентом и конкурс на поездку в горы 4*',
    contestPrizeBadge: 'Главный приз: 1 неделя отдыха в резиденции 4* в горах',
    venueCta: 'Страница клуба JustMe Милан',
    dec31BannerBadge: '13 января 2027 · Официально на Xceed',
    dec31BannerTitle: 'Старый Новый Год 2027 в JustMe Милан (13 января)',
    dec31BannerDesc:
      'Продолжение новогодних праздников в Милане с DJ Nazar Radchuk: ужин Silver 60€, ужин Gold 80€, вход в клуб 20€ и VIP-ложи.',
    dec31BannerCta: 'Подробнее о 13 января (от 20€)',
    homeLabel: 'Главная',
    eventsLabel: 'События Милана',
    specialLabel: 'Специальные события',
    heroLabels: [
      'Вечерний вход гостей под подсвеченной башней Torre Branca в JustMe Milano',
      'Праздничные ужины Silver 60€ и Gold 80€ в зимнем павильоне',
      'Полуночный тост в зоне VIP Privé под зеркальными сферами',
      'Международный танцпол с DJ Nazar Radchuk до 05:00 утра',
    ],
    extraNativeParagraph:
      'Праздничный вечер объединяет русскоязычную, восточноевропейскую и миланскую публику 21+ в одном из самых престижных павильонов Италии: авторская итальянская кухня в 19:30, бой курантов в полночь и танцевальные хиты House и Hip-Hop от DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Во сколько начинаются ужины и вход по клубным билетам 13 января 2027 года?',
        a: 'Гости ужинов Silver (60€) и Gold (80€) приглашаются с 19:30 и остаются в клубе на всю ночь. Владельцы билетов Club + 1 Drink (20€) проходят с 23:30 и празднуют до 05:00.',
      },
      {
        q: 'Включены ли вино и вода в стоимость меню Silver и Gold?',
        a: 'Да, оба ужина включают 1 бутылку воды и 1 бутылку вина на каждые 4 гостя за столом, а также полное пребывание на клубной вечеринке.',
      },
      {
        q: 'Как принять участие в розыгрыше недели отдыха в горах в резиденции 4*?',
        a: 'Необходимо соблюсти элегантный дресс-код и дополнить образ красным элементом или светящимся аксессуаром. Самый яркий и оригинальный образ получает путевку на неделю в 4-звездочную горную резиденцию.',
      },
    ],
  },
  tr: {
    metaTitle: 'Ortodoks Yılba\u015fı 2027 JustMe Milano | 13 Ocak · 20€’dan Ba\u015flayan',
    metaDescription:
      '13 Ocak 2027 Çar\u015famba JustMe Milano Ortodoks Yılba\u015fı: Kırmızı Ba\u015flıklı Kız teması, DJ Nazar Radchuk, Silver 60€ & Gold 80€ Ak\u015fam Yemeği, Club 20€ Xceed bileti.',
    h1: 'Ortodoks Yılba\u015fı 2027 JustMe Milano: Il ritorno di Cappuccetto Rosso',
    subtitle:
      '13 Ocak 2027 Çar\u015famba · 19:30 Gala Yemeği / 23:30-05:00 Kulüp · Konuk Yıldız DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Resmi Tema · Kırmızı veya I\u015fıltılı Aksesuar · 4 Yıldızlı Dağ Tatili Ödülü',
    dateBadge: '13 Ocak 2027 Çar\u015famba · 19:30 / 05:00',
    priceBadge: 'Kulüp 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · \u015eık giyim, kırmızı veya ı\u015fıklı detay',
    leadIntro:
      '13 Ocak 2027 Çar\u015famba gecesi JustMe Milano, Parco Sempione’deki aydınlatılmı\u015f Torre Branca altında Jülyen takvimi Ortodoks Yılba\u015fı’nı iki gurme ak\u015fam yemeği ve sabaha kadar süren kulüp partisiyle kutluyor.',
    xceedCtaLabel: 'Xceed Üzerinden Resmi Bilet & Yemek Al (20€+)',
    whatsappCtaLabel: 'VIP Privé Masa veya 7/24 WhatsApp Concierge',
    clubTierTitle: 'Kulüp Giri\u015fi + 1 İçecek (23:30 sonrası)',
    silverTierTitle: 'Silver Oturmalı Gala Yemeği (19:30 + Parti)',
    goldTierTitle: 'Gold Deniz Ürünleri Gala Yemeği (19:30 + Parti)',
    vipTierTitle: 'VIP Privé & DJ Kabini \u015ei\u015fe Servis Masaları',
    contestTitle: 'Kırmızı veya I\u015fıltılı Aksesuar Dress Kodu ve 4 Yıldızlı Dağ Tatili Yarı\u015fması',
    contestPrizeBadge: 'Ödül: 4 Yıldızlı Dağ Rezidansında 1 Haftalık Tatil',
    venueCta: 'JustMe Milano Kulüp Rehberi',
    dec31BannerBadge: '13 Ocak 2027 · Resmi Xceed Etkinliği',
    dec31BannerTitle: 'JustMe Milano Ortodoks Yılba\u015fı 2027 (13 Ocak)',
    dec31BannerDesc:
      'Ocak kutlamasına DJ Nazar Radchuk ile devam edin: Silver 60€, Gold 80€, Kulüp 20€ ve VIP masalar.',
    dec31BannerCta: 'Ortodoks Yılba\u015fını İncele (20€+)',
    homeLabel: 'Ana Sayfa',
    eventsLabel: 'Milano Etkinlikleri',
    specialLabel: 'Özel Etkinlikler',
    heroLabels: [
      'Torre Branca altında JustMe Milano kı\u015f giri\u015fi',
      'Isıtmalı cam pavyonda Silver 60€ ve Gold 80€ gala ak\u015fam yemekleri',
      'JustMe Milano VIP Privé masalarında gece yarısı kadehi',
      '05:00’e kadar DJ Nazar Radchuk ile uluslararası dans pisti',
    ],
    extraNativeParagraph:
      'Italo Rota tasarımı ısıtmalı cam kubbe altında gerçekle\u015fen gece, 19:30’da seçkin İtalyan ak\u015fam yemeği servisiyle ba\u015flayıp DJ Nazar Radchuk yönetimindeki House, Hip-Hop ve uluslararası hitlerle 05:00’e dek devam eder.',
    nativeFaqs: [
      {
        q: '13 Ocak 2027 ak\u015famı yemek ve kulüp giri\u015f saatleri nedir?',
        a: 'Silver (60€) ve Gold (80€) yemekleri 19:30’da ba\u015flar ve gece boyu kulüp eri\u015fimi sağlar; 20€ Kulüp + 1 İçecek bileti 23:30’dan 05:00’e kadar geçerlidir.',
      },
      {
        q: 'Silver ve Gold menülerde \u015farap ve su dahil mi?',
        a: 'Evet, her iki menüde de her 4 ki\u015fiye 1 \u015fi\u015fe su ve 1 \u015fi\u015fe \u015farap dahildir.',
      },
      {
        q: 'En iyi görünüm dağ tatili ödülüne nasıl katılınır?',
        a: '21+ \u015fık kıyafetinizi kırmızı bir parça veya ı\u015fıklı bir aksesuarla tamamlayın; en özgün ve parlak stil 4 yıldızlı dağ rezidansında 1 haftalık tatil kazanır.',
      },
    ],
  },
  zh: {
    metaTitle: '2027 米兰 JustMe 东正教新年派对 | 1月13日 · 20欧元起',
    metaDescription:
      '2027年1月13日米兰 JustMe Milano 东正教新年之夜：DJ Nazar Radchuk 主场，Silver 60€ 与 Gold 80€ 晚宴，夜店门票 20€ · Xceed 官方通道与 24/7 VIP 礼宾。',
    h1: '2027 米兰 JustMe 东正教新年夜：小红帽归来 Il ritorno di Cappuccetto Rosso',
    subtitle:
      '2027年1月13日 星期三 · 19:30 盛装晚宴 / 23:30 - 05:00 夜店派对 · 特邀 DJ Nazar Radchuk · Parco Sempione 公园 Torre Branca 塔下',
    themeTag: '官方主题 · Il ritorno di Cappuccetto Rosso · 最佳造型赢 4 星级高山假期大奖',
    dateBadge: '2027年1月13日 周三 · 19:30 - 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · 优雅着装搭配红色或发光配饰',
    leadIntro:
      '2027年1月13日 星期三 夜晚，位于米兰 Parco Sempione 公园核心地标 Torre Branca 灯光铁塔脚下的 JustMe Milano 玻璃穹顶旗舰夜店，将举办 2027 儒略历东正教新年 (Orthodox New Year) 盛典。整场活动由著名设计师 Italo Rota 打造的恒温玻璃庭院全景呈现，涵盖 19:30 坐席晚宴、午夜倒计时祝酒与延续至 05:00 的国际音乐狂欢。',
    xceedCtaLabel: 'Xceed 官方购票与晚宴预订 · 20€ 起',
    whatsappCtaLabel: 'WhatsApp 24/7 预订 VIP 卡座与礼宾服务',
    clubTierTitle: 'Club 夜店入场 + 1 杯特调饮品 (23:30 起)',
    silverTierTitle: 'Silver 银牌坐席晚宴套票 (19:30 起含派对)',
    goldTierTitle: 'Gold 金牌海鲜晚宴套票 (19:30 起含派对)',
    vipTierTitle: 'VIP Privé 尊享卡座与 DJ 台区域',
    contestTitle: '优雅着装 · 红色或发光配饰及 4 星级山地度假大奖评选',
    contestPrizeBadge: '最佳造型大奖：4 星级山地度假公寓 1 周住宿体验',
    venueCta: '查看 JustMe Milano 场地全档案',
    dec31BannerBadge: '2027年1月13日 · Xceed 官方认证活动',
    dec31BannerTitle: '2027 米兰 JustMe 东正教新年派对 (1月13日)',
    dec31BannerDesc:
      '延续跨年热潮 · 特邀 DJ Nazar Radchuk 领衔 1月13日盛典：Silver 晚宴 60€、Gold 海鲜晚宴 80€、Club 入场 20€ 及 VIP 卡座。',
    dec31BannerCta: '查看 1月13日 东正教新年 (20€起)',
    homeLabel: '首页 Home',
    eventsLabel: '米兰活动 Events',
    specialLabel: '特别盛典 Special',
    heroLabels: [
      '夜幕降临 · 宾客步入 Torre Branca 光影下的 JustMe Milano 冬季入口',
      '恒温玻璃大厅 · Silver 60€ 与 Gold 80€ 正式入席意式圣诞新年晚宴',
      '镜像球灯海 · VIP Privé 卡座举杯欢庆东正教午夜新年倒计时',
      '国际舞池 · Guest Star DJ Nazar Radchuk 带领现场狂欢至凌晨 05:00',
    ],
    extraNativeParagraph:
      '本场 2027 年 1 月 13 日 东正教新年 派对 汇聚 米兰 本地 时尚 名流、在 意 留学生 与 来自 东欧、巴尔干 及 世界各地 的 国际 嘉宾。从 19:30 的 意式 精选 晚宴 到 23:30 后 开放 的 主舞池，DJ Nazar Radchuk 将 呈现 House 浩室、Hip-Hop 嘻哈 与 全球 流行 金曲 的 无缝 混音。场地 全程 配备 冬季 恒温 玻璃 顶棚 与 Torre Branca 夜间 照明，为 所有 年满 21 岁 以上 宾客 提供 零 寒冷 负担 的 奢华 夜生活 体验。晚餐 菜单 提供 Silver 60 欧元 与 Gold 80 欧元 两档 官方 套餐：Silver 含 茄子 帕玛森 芝士 千层、新派 鲈鱼、炸春卷、海鲜 意式 烩饭 与 开心果 芝士 蛋糕；Gold 含 意式 海鲜 沙律、金枪鱼 布拉塔 鱼子酱 塔可、炙烤 三文鱼、龙虾 意面、味噌 红鱼子 三文鱼 排 与 黑樱桃 巧克力 甜点，均 配每 4 人 1 瓶 水 与 1 瓶 葡萄酒。交通 可乘 地铁 M1 Cadorna 与 M2 Lanza 步行 抵达 Parco Sempione，VIP 卡座 通过 +39 351 912 7047 礼宾 24/7 预付 确认。礼宾 服务 涵盖 100% 在线 Stripe 支付 链接、银行 转账 及 实时 二维码 电子 确认 单，所有 入场 宾客 均 享 红色 或 发光 配饰 最佳 造型 4 星级 高山 度假 公寓 一周 住宿 评选 资格，从 20:00 入席 至 次日 05:00 全程 护航。',
    nativeFaqs: [
      {
        q: '1月13日 米兰 JustMe 东正教新年 晚宴 与 夜店 的 具体 入场 时间 是 什么？',
        a: '选择 Silver 60€ 或 Gold 80€ 晚宴 套票 的 宾客 请于 19:30 准时 入席 恒温 玻璃 晚宴区，用餐 结束 后 可 无缝 留场 参加 整晚 派对；购买 20€ Club + 1 Drink 门票 的 宾客 则从 23:30 起 入场，参与 午夜 举杯 欢庆 并 持续 狂欢 至 次日 凌晨 05:00。',
      },
      {
        q: 'Silver 60€ 和 Gold 80€ 两款 官方 晚宴 菜单 是否 包含 酒水 与 派对 门票？',
        a: '是的。无论是 60€ 的 Silver 经典 菜单 还是 80€ 的 Gold 海鲜 菜单，均 标准 包含 每 4 位 宾客 1 瓶 饮用水 与 1 瓶 葡萄酒，同时 全额 涵盖 餐后 JustMe Milano 夜店 主场 派对 入场 资格。',
      },
      {
        q: '如何 参与 “Il ritorno di Cappuccetto Rosso” 最佳 造型 评选 并 赢取 高山 度假 奖项？',
        a: '所有 21 岁 以上 盛装 出席 的 宾客 只需 在 优雅 晚装 基础 上 融入 一件 红色 单品 或 发光 亮眼 配饰 即可 自动 参与 现场 评审；当晚 最具 创意 与 耀眼 魅力 的 造型 将 获赠 4 星级 高山 度假 公寓 1 周 住宿 大奖。',
      },
    ],
  },
  ar: {
    metaTitle: 'رأس السنة الأرثوذكسية 2027 JustMe ميلانو | 13 يناير · 20€',
    metaDescription:
      'احتفل برأس السنة الأرثوذكسية 2027 في JustMe ميلانو الأربعاء 13 يناير: DJ Nazar Radchuk، عشاء Silver 60€ و Gold 80€، دخول النادي 20€ عبر Xceed.',
    h1: 'رأس السنة الأرثوذكسية 2027 في JustMe ميلانو: عودة ذات الرداء الأحمر',
    subtitle:
      'الأربعاء 13 يناير 2027 · 19:30 عشاء فاخر / 23:30 نادي حتى 05:00 · DJ Nazar Radchuk · باركو سيمبيوني',
    themeTag: 'الثيم الرسمي · Il ritorno di Cappuccetto Rosso · جائزة إقامة جبلية 4 نجوم',
    dateBadge: 'الأربعاء 13 يناير 2027 · 19:30 / 05:00',
    priceBadge: 'النادي 20€ · سيلفر 60€ · غولد 80€',
    ageDressBadge: '21+ · ملابس أنيقة مع لمسة حمراء أو مضيئة',
    leadIntro:
      'يوم الأربعاء 13 يناير 2027، يستضيف نادي JustMe ميلانو أضخم احتفالات رأس السنة الأرثوذكسية وفق التقويم اليولياني تحت برج Torre Branca المضاء في حديقة Parco Sempione مع عشائين رسميين وحفلة كبرى حتى 05:00 صباحاً.',
    xceedCtaLabel: 'احجز تذاكر وعشاء Xceed الرسمي (بدءاً من 20€)',
    whatsappCtaLabel: 'حجز طاولة VIP Privé أو استفسار واتساب 24/7',
    clubTierTitle: 'دخول النادي + مشروب واحد (من 23:30)',
    silverTierTitle: 'عشاء Silver الرسمي بالجلوس (19:30 + السهرة)',
    goldTierTitle: 'عشاء Gold للمأكولات البحرية (19:30 + السهرة)',
    vipTierTitle: 'طاولات VIP Privé وخدمة الزجاجات',
    contestTitle: 'قواعد الأناقة باللون الأحمر أو المضيء ومسابقة عطلة الجبال 4 نجوم',
    contestPrizeBadge: 'الجائزة: أسبوع كامل في إقامة جبلية 4 نجوم',
    venueCta: 'دليل نادي JustMe ميلانو',
    dec31BannerBadge: '13 يناير 2027 · فعالية Xceed',
    dec31BannerTitle: 'رأس السنة الأرثوذكسية 2027 في JustMe ميلانو',
    dec31BannerDesc:
      'واصل الاحتفالات مع DJ Nazar Radchuk: عشاء سيلفر 60€، عشاء غولد 80€، دخول النادي 20€ وطاولات VIP.',
    dec31BannerCta: 'تفاصيل رأس السنة الأرثوذكسية (20€+)',
    homeLabel: 'الرئيسية',
    eventsLabel: 'فعاليات ميلانو',
    specialLabel: 'فعاليات خاصة',
    heroLabels: [
      'وصول الضيوف تحت برج Torre Branca في JustMe ميلانو',
      'عشاء غالا Silver 60€ و Gold 80€ في القاعة الزجاجية الدافئة',
      'احتفال منتصف الليل في طاولات VIP Privé',
      'ساحة الرقص العالمية مع DJ Nazar Radchuk حتى 05:00 صباحاً',
    ],
    extraNativeParagraph:
      'تجمع السهرة بين المطبخ الإيطالي الفاخر عند الساعة 19:30 وموسيقى House وHip-Hop وأشهر الإيقاعات العالمية بإشراف النجم DJ Nazar Radchuk تحت القبة الزجاجية المدفأة لمنتزه باركو سيمبيوني.',
    nativeFaqs: [
      {
        q: 'ما مواعيد العشاء ودخول النادي يوم الأربعاء 13 يناير 2027؟',
        a: 'يبدأ العشاء الرسمي Silver (60€) و Gold (80€) الساعة 19:30 ويشمل البقاء للحفل؛ أما تذاكر النادي (20€ مع مشروب) فتفتح الساعة 23:30 حتى 05:00.',
      },
      {
        q: 'هل تشمل قوائم الطعام المشروبات؟',
        a: 'نعم، تشمل كل قائمة زجاجة ماء وزجاجة نبيذ لكل 4 أشخاص بالإضافة لدخول النادي.',
      },
      {
        q: 'كيف أشارك في مسابقة الإقامة الجبلية لـ 4 نجوم؟',
        a: 'يرجى ارتداء ملابس أنيقة (21+) مع قطعة حمراء أو إكسسوار مضيء، وسيحصل أجمل وأكثر مظهر إشراقاً على عطلة أسبوع كامل في الجبال.',
      },
    ],
  },
  bg: {
    metaTitle: 'Василица / Стара Нова Година 2027 JustMe Милано · 20€',
    metaDescription:
      'Стара Нова Година 2027 в JustMe Милано на 13 януари: Червената шапчица, DJ Nazar Radchuk, вечери Silver 60€ и Gold 80€, клуб 20€ през Xceed.',
    h1: 'Стара Нова Година 2027 в JustMe Милано: Завръщането на Червената шапчица',
    subtitle:
      'Сряда 13 януари 2027 · 19:30 Гала вечеря / 23:30 Клуб до 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Официална тема · Il ritorno di Cappuccetto Rosso · Награда почивка в планината',
    dateBadge: 'Сряда 13 Януари 2027 · 19:30 / 05:00',
    priceBadge: 'Клуб 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Елегантен стил с червен или светещ акцент',
    leadIntro:
      'На 13 януари 2027 г. JustMe Milano организира най-голямото празнуване на Стара Нова Година и Василица в Милано под осветената кула Torre Branca в Парко Семпионе с две седящи гала вечери и парти до 05:00.',
    xceedCtaLabel: 'Купи официален билет или вечеря в Xceed (от 20€)',
    whatsappCtaLabel: 'Резервирай VIP Privé маса по WhatsApp 24/7',
    clubTierTitle: 'Клубен вход + 1 напитка (от 23:30)',
    silverTierTitle: 'Седяща вечеря меню Silver (от 19:30 + Парти)',
    goldTierTitle: 'Морска гала вечеря меню Gold (от 19:30 + Парти)',
    vipTierTitle: 'VIP Privé маси и бутилки под кулата',
    contestTitle: 'Елегантен дрескод с червен или светещ акцент и награда 4* в планината',
    contestPrizeBadge: 'Награда: 1 седмица в 4-звездна планинска резиденция',
    venueCta: 'Профил на клуб JustMe Милано',
    dec31BannerBadge: '13 януари 2027 · Официално в Xceed',
    dec31BannerTitle: 'Стара Нова Година 2027 в JustMe Милано (13 януари)',
    dec31BannerDesc:
      'Продължете празниците през януари с DJ Nazar Radchuk: вечеря Silver 60€, Gold 80€, клуб 20€ и VIP маси.',
    dec31BannerCta: 'Виж Стара Нова Година (от 20€)',
    homeLabel: 'Начало',
    eventsLabel: 'Събития Милано',
    specialLabel: 'Специални събития',
    heroLabels: [
      'Зимен вход под осветената кула Torre Branca в JustMe Milano',
      'Вечери Silver 60€ и Gold 80€ в отопляемия стъклен павилион',
      'Полунощен тост във VIP Privé сепаретата на JustMe',
      'Международен дансинг с DJ Nazar Radchuk до 05:00 сутринта',
    ],
    extraNativeParagraph:
      'Събитието съчетава изискана италианска кухня от 19:30 часа и музикална програма с House, Hip-Hop и световни хитове от специалния гост DJ Nazar Radchuk под отопляемия стъклен покрив на Итало Рота.',
    nativeFaqs: [
      {
        q: 'Кога започват вечерите и кога отваря клубът на 13 януари 2027 г.?',
        a: 'Вечерите Silver (60€) и Gold (80€) започват в 19:30 и включват партито; клубният вход за 20€ (с 1 напитка) важи от 23:30 до 05:00.',
      },
      {
        q: 'Включени ли са напитки в менютата Silver и Gold?',
        a: 'Да, двете менюта включват 1 бутилка вода и 1 бутилка вино на всеки 4 души.',
      },
      {
        q: 'Как се печели едноседмичната почивка в планината?',
        a: 'Гостите 21+ с елегантна визия и червен или светещ аксесоар участват автоматично, като най-оригиналната визия печели 7 дни в 4* планинска резиденция.',
      },
    ],
  },
  hr: {
    metaTitle: 'Pravoslavna Nova Godina 2027 JustMe Milano | 13.01 · 20€',
    metaDescription:
      'Pravoslavna Nova Godina 2027 u JustMe Milano 13. siječnja: Crvenkapica tema, DJ Nazar Radchuk, Silver 60€ & Gold 80€ večera, Club 20€ na Xceedu.',
    h1: 'Pravoslavna Nova Godina 2027 u JustMe Milano: Povratak Crvenkapice',
    subtitle:
      'Srijeda 13. siječnja 2027 · 19:30 Gala večera / 23:30 Club do 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Službena tema · Il ritorno di Cappuccetto Rosso · Nagrada tjedan u planinama 4*',
    dateBadge: 'Srijeda 13.01.2027 · 19:30 – 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegantno uz crveni ili svjetleći detalj',
    leadIntro:
      'U srijedu 13. siječnja 2027. JustMe Milano priređuje središnju proslavu Pravoslavne Nove Godine pod osvijetljenim tornjem Torre Branca u parku Sempione uz svečane večere i klupski program do jutra.',
    xceedCtaLabel: 'Kupi službene Xceed ulaznice i večere (od 20€)',
    whatsappCtaLabel: 'Rezerviraj VIP Privé stol putem WhatsAppa 24/7',
    clubTierTitle: 'Club ulaz + 1 piće (od 23:30)',
    silverTierTitle: 'Silver Gala Večera za stolom (od 19:30 + Party)',
    goldTierTitle: 'Gold Riblja Gala Večera (od 19:30 + Party)',
    vipTierTitle: 'VIP Privé stolovi i ponuda boca',
    contestTitle: 'Dress code s crvenim ili svjetlećim detaljem i nagrada u planinama 4*',
    contestPrizeBadge: 'Glavna nagrada: 7 dana u planinskoj rezidenciji s 4 zvjezdice',
    venueCta: 'Vodič za JustMe Milano',
    dec31BannerBadge: '13. siječnja 2027 · Službeni Xceed event',
    dec31BannerTitle: 'Pravoslavna Nova Godina 2027 u JustMe Milano',
    dec31BannerDesc:
      'Proslava 13. siječnja uz DJ Nazara Radchuka: večera Silver 60€, Gold 80€, ulaz Club 20€ i VIP separei.',
    dec31BannerCta: 'Pogledaj proslavu 13. siječnja (od 20€)',
    homeLabel: 'Početna',
    eventsLabel: 'Događanja Milano',
    specialLabel: 'Posebna događanja',
    heroLabels: [
      'Zimski ulaz pod tornjem Torre Branca u JustMe Milano',
      'Silver 60€ i Gold 80€ večere u grijanom staklenom paviljonu',
      'Ponoćna zdravica za VIP Privé stolovima',
      'Plesni podij uz DJ Nazara Radchuka do 05:00 ujutro',
    ],
    extraNativeParagraph:
      'Program spaja talijansku gastronomiju od 19:30 s međunarodnim House, Hip-Hop i Hits setovima gosta DJ Nazara Radchuka za publiku 21+ u grijanom zimskom ambijentu parka Sempione.',
    nativeFaqs: [
      {
        q: 'Kada počinje večera, a kada ulaz za klub 13. siječnja 2027.?',
        a: 'Silver (60€) i Gold (80€) večere počinju u 19:30 i uključuju ostanak na partiju, dok ulaznica Club + 1 piće (20€) vrijedi od 23:30 do 05:00.',
      },
      {
        q: 'Jesu li voda i vino uključeni u Silver i Gold menije?',
        a: 'Da, oba menija uključuju 1 bocu vode i 1 bocu vina na svake 4 osobe.',
      },
      {
        q: 'Kako osvojiti tjedan dana odmora u planinama?',
        a: 'Obucite elegantnu kombinaciju s crvenim ili svjetlećim dodatkom; najoriginalniji izgled osvaja boravak od 7 dana u planinskoj rezidenciji 4*.',
      },
    ],
  },
  cs: {
    metaTitle: 'Pravoslavný Nový rok 2027 JustMe Milán | 13. 1. · od 20€',
    metaDescription:
      'Pravoslavný Nový rok 2027 v JustMe Milano ve středu 13. ledna: DJ Nazar Radchuk, večeře Silver 60€ & Gold 80€, klubový vstup 20€ přes Xceed.',
    h1: 'Pravoslavný Nový rok 2027 v JustMe Milán: Návrat Červené Karkulky',
    subtitle:
      'Středa 13. ledna 2027 · 19:30 Gala večeře / 23:30 Klub do 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Oficiální téma · Il ritorno di Cappuccetto Rosso · Cena horský pobyt 4*',
    dateBadge: 'St 13. 1. 2027 · 19:30 – 05:00',
    priceBadge: 'Klub 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegantní styl s červeným či zářivým prvkem',
    leadIntro:
      'Ve středu 13. ledna 2027 hostí JustMe Milano pod nasvícenou věží Torre Branca v Parco Sempione slavnostní pravoslavný Silvestr podle juliánského kalendáře se dvěma servírovanými menu a klubovou nocí do rána.',
    xceedCtaLabel: 'Koupit vstupenky a večeře na Xceed (od 20€)',
    whatsappCtaLabel: 'Rezervovat VIP Privé stůl přes WhatsApp 24/7',
    clubTierTitle: 'Klubový vstup + 1 drink (od 23:30)',
    silverTierTitle: 'Servírovaná gala večeře Silver (od 19:30 + Party)',
    goldTierTitle: 'Servírovaná rybí večeře Gold (od 19:30 + Party)',
    vipTierTitle: 'VIP Privé stoly a láhvový servis',
    contestTitle: 'Dress code s červeným či světelným detailem a soutěž o týden na horách 4*',
    contestPrizeBadge: 'Výhra: Týdenní pobyt ve 4* horské rezidenci',
    venueCta: 'Průvodce klubem JustMe Milán',
    dec31BannerBadge: '13. ledna 2027 · Oficiálně na Xceed',
    dec31BannerTitle: 'Pravoslavný Nový rok 2027 v JustMe Milán',
    dec31BannerDesc:
      'Oslavte 13. leden s DJ Nazarem Radchukem: Večeře Silver 60€, Gold 80€, Vstup do klubu 20€ a VIP stoly.',
    dec31BannerCta: 'Zobrazit pravoslavný Nový rok (od 20€)',
    homeLabel: 'Domů',
    eventsLabel: 'Akce Milán',
    specialLabel: 'Speciální akce',
    heroLabels: [
      'Zimní příchod hostů pod věží Torre Branca do JustMe Milano',
      'Slavnostní večeře Silver 60€ a Gold 80€ ve vytápěném pavilonu',
      'Půlnoční přípitek u VIP Privé stolů v JustMe Milán',
      'Mezinárodní parket s DJ Nazarem Radchukem do 05:00',
    ],
    extraNativeParagraph:
      'Vytápěný zimní pavilon architekta Itala Roty nabídne od 19:30 italskou gastronomii a od 23:30 hudební výběr House, Hip-Hop a světových hitů v podání hvězdného DJ Nazara Radchuka.',
    nativeFaqs: [
      {
        q: 'V kolik začíná večeře a odkdy platí klubový vstup 13. ledna?',
        a: 'Večeře Silver (60€) a Gold (80€) začínají v 19:30 včetně následné párty; vstup Club + 1 drink (20€) platí od 23:30 do 05:00.',
      },
      {
        q: 'Jsou v ceně menu Silver a Gold zahrnuty nápoje?',
        a: 'Ano, obě menu obsahují 1 láhev vody a 1 láhev vína na každé 4 hosty.',
      },
      {
        q: 'Jak se zapojit do soutěže o dovolenou na horách?',
        a: 'Stačí přijít v elegantním oblečení (21+) s červeným nebo světélkujícím doplňkem; nejoriginálnější vzhled vyhrává týden ve 4* horské rezidenci.',
      },
    ],
  },
  da: {
    metaTitle: 'Ortodoks Nytår 2027 JustMe Milano | 13. Jan · Fra €20',
    metaDescription:
      'Fejr Ortodoks Nytår 2027 på JustMe Milano onsdag 13. januar: DJ Nazar Radchuk, Silver €60 & Gold €80 gallamiddag, Club €20 billet via Xceed.',
    h1: 'Ortodoks Nytår 2027 på JustMe Milano: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Onsdag 13. januar 2027 · 19:30 Gallamiddag / 23:30 Club til 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Officielt Tema · Rødt eller lysende tilbehør · 4-stjernet bjergferie',
    dateBadge: 'Ons 13. Jan 2027 · 19:30 – 05:00',
    priceBadge: 'Club €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegant med rød eller lysende detalje',
    leadIntro:
      'Onsdag den 13. januar 2027 slår JustMe Milano dørene op til Milanos største ortodokse nytårsfest efter den julianske kalender under den oplyste Torre Branca i Parco Sempione.',
    xceedCtaLabel: 'Køb officielle billetter & middag på Xceed (fra €20)',
    whatsappCtaLabel: 'Book VIP Privé bord via WhatsApp 24/7',
    clubTierTitle: 'Club entré + 1 drink (fra 23:30)',
    silverTierTitle: 'Silver Siddende Gallamiddag (fra 19:30 + Party)',
    goldTierTitle: 'Gold Fisk & Skaldyr Gallamiddag (fra 19:30 + Party)',
    vipTierTitle: 'VIP Privé borde & flaskeservice',
    contestTitle: 'Elegant dresscode med rød/lysende detalje & konkurrence om bjergophold',
    contestPrizeBadge: 'Præmie: 1 uge i 4-stjernet bjergresidens',
    venueCta: 'JustMe Milano Klubguide',
    dec31BannerBadge: '13. Jan 2027 · Officiel Xceed Event',
    dec31BannerTitle: 'Ortodoks Nytår 2027 på JustMe Milano (13. Jan)',
    dec31BannerDesc:
      'Fortsæt festen i januar med DJ Nazar Radchuk: Silver €60, Gold €80, Club €20 og VIP-borde.',
    dec31BannerCta: 'Se Ortodoks Nytår (fra €20)',
    homeLabel: 'Hjem',
    eventsLabel: 'Milano Events',
    specialLabel: 'Særlige Events',
    heroLabels: [
      'Ankomst under Torre Branca ved JustMe Milano om aftenen',
      'Silver €60 og Gold €80 middage i den opvarmede glaspavillon',
      'Midnatsskål ved VIP Privé bordene hos JustMe Milano',
      'Dansegulv med DJ Nazar Radchuk frem til kl. 05:00',
    ],
    extraNativeParagraph:
      'Under Italo Rotas opvarmede glaskuppel mødes italiensk festmiddag kl. 19:30 med House, Hip-Hop og internationale hits leveret af gæstestjernen DJ Nazar Radchuk indtil kl. 05:00.',
    nativeFaqs: [
      {
        q: 'Hvornår starter middagen og klubentréen den 13. januar 2027?',
        a: 'Silver (€60) og Gold (€80) starter kl. 19:30 med adgang til hele natten; Club-billet (€20 inkl. 1 drink) giver adgang fra 23:30 til 05:00.',
      },
      {
        q: 'Er vin og vand inkluderet i Silver- og Gold-menuen?',
        a: 'Ja, begge menuer inkluderer 1 flaske vand og 1 flaske vin pr. 4 gæster.',
      },
      {
        q: 'Hvordan deltager jeg i konkurrencen om 1 uge i bjergene?',
        a: 'Klæd dig elegant (21+) med en rød eller lysende detalje; det mest originale look vinder en uge i en 4-stjernet bjergresidens.',
      },
    ],
  },
  et: {
    metaTitle: 'Vene Uusaasta 2027 JustMe Milano | 13. Jaanuar · Alates €20',
    metaDescription:
      'Vana uusaasta 2027 tähistamine JustMe Milanos kolmapäeval 13. jaanuaril: DJ Nazar Radchuk, Silver €60 ja Gold €80 õhtusöök, Club €20 Xceed piletid.',
    h1: 'Vana Uusaasta 2027 JustMe Milanos: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Kolmapäev 13. jaanuar 2027 · 19:30 Pidulik õhtusöök / 23:30 Klubi kuni 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Ametlik teema · Punane või helendav detail · Mäepuhkuse auhind',
    dateBadge: 'K 13. Jaanuar 2027 · 19:30 – 05:00',
    priceBadge: 'Klubi €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegantne riietus punase või helendava detailiga',
    leadIntro:
      'Kolmapäeval, 13. jaanuaril 2027 tähistab JustMe Milano valgustatud Torre Branca jalamil Parco Sempiones Juliuse kalendri vana uusaasta vastuvõttu kahe piduliku õhtusöögi ja hommikuni kestva klubiõhtuga.',
    xceedCtaLabel: 'Osta ametlikud Xceed piletid ja õhtusöök (alates €20)',
    whatsappCtaLabel: 'Broneeri VIP Privé laud WhatsAppis 24/7',
    clubTierTitle: 'Klubipilet + 1 jook (alates 23:30)',
    silverTierTitle: 'Silver Õhtusöök lauas (alates 19:30 + Pidu)',
    goldTierTitle: 'Gold Mereandide Õhtusöök (alates 19:30 + Pidu)',
    vipTierTitle: 'VIP Privé lauad ja pudeliteenindus',
    contestTitle: 'Punase või helendava aksessuaari dresscode ja 4* mäepuhkuse auhind',
    contestPrizeBadge: 'Peaauhind: 1 nädal 4-tärni mägiresidentsis',
    venueCta: 'JustMe Milano klubitutvustus',
    dec31BannerBadge: '13. jaanuar 2027 · Ametlik Xceed üritus',
    dec31BannerTitle: 'Vana Uusaasta 2027 JustMe Milanos (13. jaanuar)',
    dec31BannerDesc:
      'Jätka pühi jaanuaris DJ Nazar Radchukiga: Silver €60, Gold €80, Klubi €20 ja VIP lauad.',
    dec31BannerCta: 'Vaata 13. jaanuari pidu (alates €20)',
    homeLabel: 'Avaleht',
    eventsLabel: 'Milano üritused',
    specialLabel: 'Eriüritused',
    heroLabels: [
      'Talvine saabumine valgustatud Torre Branca alla JustMe Milanos',
      'Silver €60 ja Gold €80 galaõhtusöögid soojendusega klaaspaviljonis',
      'Kesköine toost JustMe Milano VIP Privé laudades',
      'Rahvusvaheline tantsupõrand DJ Nazar Radchukiga kuni 05:00',
    ],
    extraNativeParagraph:
      'Soojas talvises klaaspaviljonis ühendab õhtu kell 19:30 algava Itaalia köögi ja keskööl jätkuva House, Hip-Hop ning rahvusvaheliste hittide peo, mida juhib erikülaline DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Mis kell algavad õhtusöögid ja klubisse sissepääs 13. jaanuaril?',
        a: 'Silver (€60) ja Gold (€80) õhtusöögid algavad kell 19:30 ja sisaldavad sissepääsu öisele peole; Club pilet (€20 + 1 jook) kehtib 23:30–05:00.',
      },
      {
        q: 'Kas jook on õhtusöögipakettide sees?',
        a: 'Jah, mõlemas menüüs sisaldub 1 pudel vett ja 1 pudel veini iga 4 külalise kohta.',
      },
      {
        q: 'Kuidas osaleda mäepuhkuse loosimises?',
        a: 'Riietu elegantselt (21+) ning lisa punane või helendav element; säravaim stiil võidab nädalase puhkuse 4* mägiresidentsis.',
      },
    ],
  },
  fi: {
    metaTitle: 'Ortodoksinen Uusivuosi 2027 JustMe Milano | 13.1. · 20€',
    metaDescription:
      'Ortodoksinen uusivuosi 2027 JustMe Milanossa 13. tammikuuta: DJ Nazar Radchuk, Silver 60€ & Gold 80€ illalliset, Club-lippu 20€ Xceedissä.',
    h1: 'Ortodoksinen Uusivuosi 2027 JustMe Milanossa: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Keskiviikko 13.1.2027 · 19:30 Galaillallinen / 23:30 Klubi klo 05:00 asti · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Virallinen teema · Punainen tai loistava yksityiskohta · 4* vuoristolomapalkinto',
    dateBadge: 'Ke 13.1.2027 · 19:30 – 05:00',
    priceBadge: 'Klubi 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegantti asu punaisella tai valaisevalla asusteella',
    leadIntro:
      'Keskiviikkona 13. tammikuuta 2027 JustMe Milano juhlii juliaanisen kalenterin ortodoksista uuttavuotta valaistun Torre Brancan juurella Parco Sempionessa lämmitetyssä lasipaviljongissa.',
    xceedCtaLabel: 'Osta viralliset Xceed-liput ja illalliset (alk. 20€)',
    whatsappCtaLabel: 'Varaa VIP Privé -pöytä WhatsAppissa 24/7',
    clubTierTitle: 'Klubisisäänpääsy + 1 juoma (klo 23:30 alk.)',
    silverTierTitle: 'Silver Istuva Galaillallinen (klo 19:30 + Juhlat)',
    goldTierTitle: 'Gold Merenelävä-Galaillallinen (klo 19:30 + Juhlat)',
    vipTierTitle: 'VIP Privé -pöydät ja pullopalvelu',
    contestTitle: 'Elegantti pukukoodi punaisella/loistavalla tehosteella & kilpailu',
    contestPrizeBadge: 'Pääpalkinto: 1 viikko 4 tähden vuoristoresidenssissä',
    venueCta: 'JustMe Milano -esittely',
    dec31BannerBadge: '13.1.2027 · Virallinen Xceed-tapahtuma',
    dec31BannerTitle: 'Ortodoksinen Uusivuosi 2027 JustMe Milanossa',
    dec31BannerDesc:
      'Tammikuun huippuilta DJ Nazar Radchukin johdolla: Silver 60€, Gold 80€, Klubi 20€ ja VIP-pöydät.',
    dec31BannerCta: 'Tutustu 13.1. juhlaan (alk. 20€)',
    homeLabel: 'Etusivu',
    eventsLabel: 'Milanon tapahtumat',
    specialLabel: 'Erikoistapahtumat',
    heroLabels: [
      'Talvi-illan saapuminen Torre Brancan alle JustMe Milanossa',
      'Silver 60€ ja Gold 80€ illalliset lämmitetyssä lasipaviljongissa',
      'Keskiyön malja JustMe Milanon VIP Privé -pöydissä',
      'Kansainvälinen tanssilattia DJ Nazar Radchukin tahdissa klo 05:00 saakka',
    ],
    extraNativeParagraph:
      'Italo Rotan lasikupolin alla yhdistyvät klo 19:30 alkavat italialaiset juhlaillalliset ja kansainvälinen House-, Hip-Hop- ja hittikattaus vierailevan tähti-DJ Nazar Radchukin luotsaamana.',
    nativeFaqs: [
      {
        q: 'Mihin aikaan illallinen ja klubi alkavat 13. tammikuuta 2027?',
        a: 'Silver (60€) ja Gold (80€) illalliset alkavat klo 19:30 sisältäen jatkon bileisiin; Club-lippu (20€ + 1 juoma) oikeuttaa sisäänpääsyyn klo 23:30–05:00.',
      },
      {
        q: 'Sisältyvätkö juomat illallismenuisiin?',
        a: 'Kyllä, molempiin menuihin sisältyy 1 vesipullo ja 1 viinipullo jokaista 4 vierasta kohden.',
      },
      {
        q: 'Miten voin voittaa viikon vuoristoloman?',
        a: 'Pukeudu tyylikkäästi (21+) ja lisää punainen tai hohtava asuste; omaperäisin tyyli voittaa viikon 4* vuoristoresidenssissä.',
      },
    ],
  },
  el: {
    metaTitle: 'Πρωτοχρονιά Παλαιού Ημερολογίου JustMe Μιλάνο 2027 | 20€',
    metaDescription:
      'Πρωτοχρονιά Παλαιού Ημερολογίου 2027 στο JustMe Milano την Τετάρτη 13 Ιανουαρίου: DJ Nazar Radchuk, Δείπνα Silver 60€ & Gold 80€, Club 20€ μέσω Xceed.',
    h1: 'Πρωτοχρονιά Παλαιού Ημερολογίου 2027 στο JustMe Μιλάνο: Η Επιστροφή της Κοκκινοσκουφίτσας',
    subtitle:
      'Τετάρτη 13 Ιανουαρίου 2027 · 19:30 Δείπνο Γκαλά / 23:30 Club έως 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Επίσημο Θέμα · Il ritorno di Cappuccetto Rosso · Έπαθλο 1 εβδομάδα στο βουνό 4*',
    dateBadge: 'Τετ 13 Ιανουαρίου 2027 · 19:30 / 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Κομψό ντύσιμο με κόκκινη ή φωτεινή λεπτομέρεια',
    leadIntro:
      'Την Τετάρτη 13 Ιανουαρίου 2027, το JustMe Milano γιορτάζει την Ορθόδοξη Πρωτοχρονιά του Ιουλιανού ημερολογίου κάτω από τον φωτισμένο Torre Branca στο Parco Sempione, στον θερμαινόμενο γυάλινο χώρο του με δύο μενού γκαλά και clubbing μέχρι τις 05:00.',
    xceedCtaLabel: 'Αγορά Επίσημων Εισιτηρίων & Δείπνου στο Xceed (από 20€)',
    whatsappCtaLabel: 'Κράτηση VIP Privé Τραπεζιού στο WhatsApp 24/7',
    clubTierTitle: 'Είσοδος Club + 1 Ποτό (από 23:30)',
    silverTierTitle: 'Καθιστό Δείπνο Γκαλά Silver (από 19:30 + Party)',
    goldTierTitle: 'Καθιστό Δείπνο Θαλασσινών Gold (από 19:30 + Party)',
    vipTierTitle: 'Τραπέζια VIP Privé & Υπηρεσία Φιαλών',
    contestTitle: 'Κόκκινο ή Φωτεινό Αξεσουάρ & Διαγωνισμός Διαμονής 4 Αστέρων στο Βουνό',
    contestPrizeBadge: 'Βραβείο: 1 Εβδομάδα σε Ορεινό Κατάλυμα 4 Αστέρων',
    venueCta: 'Οδηγός JustMe Μιλάνο',
    dec31BannerBadge: '13 Ιανουαρίου 2027 · Επίσημο Event Xceed',
    dec31BannerTitle: 'Ορθόδοξη Πρωτοχρονιά 2027 στο JustMe Μιλάνο',
    dec31BannerDesc:
      'Συνεχίστε τη γιορτή τον Ιανουάριο με τον DJ Nazar Radchuk: Silver 60€, Gold 80€, Club 20€ και τραπέζια VIP.',
    dec31BannerCta: 'Δείτε την Ορθόδοξη Πρωτοχρονιά (20€+)',
    homeLabel: 'Αρχική',
    eventsLabel: 'Εκδηλώσεις Μιλάνο',
    specialLabel: 'Ειδικές Βραδιές',
    heroLabels: [
      'Άφιξη επισκεπτών κάτω από τον φωτισμένο Torre Branca στο JustMe',
      'Δείπνα Γκαλά Silver 60€ και Gold 80€ στη θερμαινόμενη γυάλινη σάλα',
      'Πρωτοχρονιάτικη πρόποση στα VIP Privé τραπέζια του JustMe',
      'Πίστα με DJ Nazar Radchuk σε House, Hip-Hop και Hits έως τις 05:00',
    ],
    extraNativeParagraph:
      'Κάτω από τον γυάλινο θόλο του Italo Rota, η εκδήλωση ενώνει εκλεκτή ιταλική γαστρονομία από τις 19:30 με διεθνή ήχο House, Hip-Hop και Hits από τον προσκεκλημένο σταρ DJ Nazar Radchuk έως τις 05:00.',
    nativeFaqs: [
      {
        q: 'Τι ώρα ξεκινούν τα δείπνα και η είσοδος του club στις 13 Ιανουαρίου 2027;',
        a: 'Τα δείπνα Silver (60€) και Gold (80€) ξεκινούν στις 19:30 και περιλαμβάνουν παραμονή στο πάρτι, ενώ η είσοδος Club (20€ με 1 ποτό) ισχύει από τις 23:30 έως τις 05:00.',
      },
      {
        q: 'Περιλαμβάνονται κρασί και νερό στα μενού Silver και Gold;',
        a: 'Ναι, και τα δύο μενού παρέχουν 1 φιάλη νερό και 1 φιάλη κρασί ανά 4 άτομα.',
      },
      {
        q: 'Πώς συμμετέχω στον διαγωνισμό για την εβδομάδα διακοπών στο βουνό;',
        a: 'Αρκεί να επιλέξετε κομψή εμφάνιση (21+) με κόκκινο ρούχο ή φωτεινό αξεσουάρ. Η πιο πρωτότυπη εμφάνιση κερδίζει 1 εβδομάδα διαμονή σε ορεινή κατοικία 4*.',
      },
    ],
  },
  hu: {
    metaTitle: 'Ortodox Újév 2027 JustMe Milánó | Jan. 13. · 20€-tól',
    metaDescription:
      'Ortodox Újév 2027 a JustMe Milanóban január 13-án: Piroska téma, DJ Nazar Radchuk, Silver 60€ & Gold 80€ vacsorák, Club 20€ Xceed belépő.',
    h1: 'Ortodox Újév 2027 a JustMe Milánóban: Piroska Visszatérése',
    subtitle:
      '2027. január 13. szerda · 19:30 Gálavacsora / 23:30 Klub 05:00-ig · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Hivatalos téma · Il ritorno di Cappuccetto Rosso · 4* hegyi nyaralás nyeremény',
    dateBadge: '2027. Január 13. Szerda · 19:30 / 05:00',
    priceBadge: 'Klub 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegáns megjelenés piros vagy világító kiegészítővel',
    leadIntro:
      '2027. január 13-án szerdán a milánói JustMe Milano rendezi az Ortodox Újév (Julián-naptár szerinti szilveszter) legkiemelkedőbb gálaestjét a kivilágított Torre Branca alatt, kétféle ünnepi vacsorával és hajnalig tartó bulival.',
    xceedCtaLabel: 'Hivatalos Xceed jegyek és vacsorák vásárlása (20€-tól)',
    whatsappCtaLabel: 'VIP Privé asztalfoglalás WhatsApp-on 0-24',
    clubTierTitle: 'Klub belépő + 1 ital (23:30-tól)',
    silverTierTitle: 'Silver Ültetett Gálavacsora (19:30-tól + Party)',
    goldTierTitle: 'Gold Tengeri Gálavacsora (19:30-tól + Party)',
    vipTierTitle: 'VIP Privé asztalok és italszerviz',
    contestTitle: 'Piros vagy világító kiegészítő dress code és 4* hegyi nyaralás verseny',
    contestPrizeBadge: 'Fődíj: 1 hét pihenés 4 csillagos hegyi rezidenciában',
    venueCta: 'JustMe Milánó klubinformációk',
    dec31BannerBadge: '2027. Jan. 13. · Hivatalos Xceed esemény',
    dec31BannerTitle: 'Ortodox Újév 2027 a JustMe Milánóban',
    dec31BannerDesc:
      'Ünnepeljen januárban DJ Nazar Radchukkal: Silver 60€, Gold 80€, Klub 20€ és VIP asztalok.',
    dec31BannerCta: 'Ortodox Újév megtekintése (20€-tól)',
    homeLabel: 'Főoldal',
    eventsLabel: 'Milánói programok',
    specialLabel: 'Különleges esték',
    heroLabels: [
      'Vendégek érkezése a Torre Branca alatt a JustMe Milánóba',
      'Silver 60€ és Gold 80€ vacsorák a fűtött üvegpavilonban',
      'Éjféli koccintás a JustMe Milánó VIP Privé asztalainál',
      'Nemzetközi táncparkett DJ Nazar Radchukkal 05:00 óráig',
    ],
    extraNativeParagraph:
      'A Parco Sempione fűtött üvegkupolája alatt az est 19:30-kor olasz gálavacsorákkal nyit, majd DJ Nazar Radchuk House, Hip-Hop és nemzetközi slágereivel folytatódik reggel 5 óráig.',
    nativeFaqs: [
      {
        q: 'Mikor kezdődik a vacsora és a klubbelépés január 13-án?',
        a: 'A Silver (60€) és Gold (80€) vacsorák 19:30-kor indulnak és tartalmazzák a bulin való részvételt; a Club jegy (20€ + 1 ital) 23:30-tól 05:00-ig érvényes.',
      },
      {
        q: 'A Silver és Gold menük tartalmazzák az italfogyasztást?',
        a: 'Igen, mindkét menü 4 főnként 1 üveg vizet és 1 üveg bort tartalmaz.',
      },
      {
        q: 'Hogyan nyerhető meg az 1 hetes hegyi pihenés?',
        a: 'Elegáns (21+) szettben piros ruhadarabbal vagy világító kiegészítővel érdemes érkezni; a legeredetibb megjelenés nyeri a 4* hegyi rezidencia utalványt.',
      },
    ],
  },
  ga: {
    metaTitle: 'Athbhliain Cheartchreidmheach 2027 JustMe Milano | 20€',
    metaDescription:
      'Ceiliúradh na hAthbhliana Ceartchreidmhí 2027 ag JustMe Milano 13 Eanáir: DJ Nazar Radchuk, Dinnéar Silver €60 & Gold €80, Club €20 ar Xceed.',
    h1: 'Athbhliain Cheartchreidmheach 2027 ag JustMe Milano: Cochaillín Dearg',
    subtitle:
      'Dé Céadaoin 13 Eanáir 2027 · 19:30 Dinnéar Gala / 23:30 Club go 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Téama Oifigiúil · Il ritorno di Cappuccetto Rosso · Duais Saoire Sléibhe 4*',
    dateBadge: 'Dé Céadaoin 13 Eanáir 2027 · 19:30 / 05:00',
    priceBadge: 'Club €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Éadaí galánta le mionphíosa dearg nó lonrach',
    leadIntro:
      'Ar an gCéadaoin 13 Eanáir 2027 reáchtálann JustMe Milano príomhcheiliúradh na hAthbhliana Ceartchreidmhí i Milano faoi Torre Branca soilsithe i Parco Sempione le dinnéir fhoirmiúla agus club go dtí 05:00.',
    xceedCtaLabel: 'Ceannaigh Ticéid & Dinnéir Oifigiúla ar Xceed (€20+)',
    whatsappCtaLabel: 'Cuir Tábla VIP Privé in áirithe ar WhatsApp 24/7',
    clubTierTitle: 'Cead Isteach Club + 1 Deoch (ó 23:30)',
    silverTierTitle: 'Dinnéar Gala Silver (ó 19:30 + Cóisir)',
    goldTierTitle: 'Dinnéar Bia Mara Gold (ó 19:30 + Cóisir)',
    vipTierTitle: 'Táblaí VIP Privé & Seirbhís Buidéal',
    contestTitle: 'Cód Éadaigh Dearg nó Lonrach & Comórtas Saoire Sléibhe 4*',
    contestPrizeBadge: 'Duais: Seachtain 1 i dTeach Cónaithe Sléibhe 4 Réalta',
    venueCta: 'Treoir JustMe Milano',
    dec31BannerBadge: '13 Eanáir 2027 · Imeacht Oifigiúil Xceed',
    dec31BannerTitle: 'Athbhliain Cheartchreidmheach 2027 ag JustMe Milano',
    dec31BannerDesc:
      'Lean leis an gceiliúradh i mí Eanáir le DJ Nazar Radchuk: Silver €60, Gold €80, Club €20 agus táblaí VIP.',
    dec31BannerCta: 'Féach Athbhliain 13 Eanáir (€20+)',
    homeLabel: 'Baile',
    eventsLabel: 'Imeachtaí Milano',
    specialLabel: 'Imeachtaí Speisialta',
    heroLabels: [
      'Aíonna ag teacht faoi Torre Branca ag JustMe Milano',
      'Dinnéir Gala Silver €60 agus Gold €80 sa phailliún gloine',
      'Sláinte meán oíche ag táblaí VIP Privé JustMe Milano',
      'Urlár damhsa idirnáisiúnta le DJ Nazar Radchuk go 05:00',
    ],
    extraNativeParagraph:
      'Tugann an oíche le chéile cócaireacht Iodálach ó 19:30 faoin díon gloine téite agus meascán House, Hip-Hop agus amhráin idirnáisiúnta ó DJ Nazar Radchuk go dtí 05:00.',
    nativeFaqs: [
      {
        q: 'Cén t-am a thosaíonn na dinnéir agus an club ar an 13 Eanáir 2027?',
        a: 'Tosaíonn dinnéir Silver (€60) agus Gold (€80) ag 19:30 le rochtain leanúnach ar an gclub; osclaíonn cead isteach Club (€20 + 1 deoch) ó 23:30 go 05:00.',
      },
      {
        q: 'An bhfuil fíon agus uisce san áireamh sna biachláir?',
        a: 'Tá, cuimsíonn gach biachlár buidéal uisce agus buidéal fíona in aghaidh gach 4 aoi.',
      },
      {
        q: 'Conas páirt a ghlacadh i gcomórtas saoire na sléibhte?',
        a: 'Caith éadaí galánta (21+) le mionphíosa dearg nó solasach; buann an chuma is cruthaithí seachtain i dteach cónaithe sléibhe 4*.',
      },
    ],
  },
  lv: {
    metaTitle: 'Vecais Jaunais Gads 2027 JustMe Milāna | 13. Janvāris · €20',
    metaDescription:
      'Vecā Jaunā gada 2027 svinības JustMe Milano trešdien 13. janvārī: DJ Nazar Radchuk, Silver €60 & Gold €80 vakariņas, klubs €20 caur Xceed.',
    h1: 'Vecais Jaunais Gads 2027 JustMe Milānā: Sarkangalvītes Atgriešanās',
    subtitle:
      'Trešdiena 2027. gada 13. janvāris · 19:30 Gala vakariņas / 23:30 Klubs līdz 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Oficiālā tēma · Il ritorno di Cappuccetto Rosso · Balva kalnu ceļojums 4*',
    dateBadge: 'Tr 13. Janvāris 2027 · 19:30 / 05:00',
    priceBadge: 'Klubs €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegants stils ar sarkanu vai mirdzošu akcentu',
    leadIntro:
      'Trešdien, 2027. gada 13. janvārī, JustMe Milano rīko grandiozāko Vecā Jaunā gada nakti Milānā zem izgaismotā Torre Branca torņa Parco Sempione parkā ar izsmalcinātām vakariņām un deju zāli līdz rītam.',
    xceedCtaLabel: 'Pirkt oficiālās Xceed biļetes un vakariņas (no €20)',
    whatsappCtaLabel: 'Rezervēt VIP Privé galdiņu WhatsApp 24/7',
    clubTierTitle: 'Ieeja klubā + 1 dzēriens (no 23:30)',
    silverTierTitle: 'Silver Sēdvietu Gala Vakariņas (no 19:30 + Ballīte)',
    goldTierTitle: 'Gold Jūras Velšu Vakariņas (no 19:30 + Ballīte)',
    vipTierTitle: 'VIP Privé galdiņi un pudeļu serviss',
    contestTitle: 'Sarkanais vai mirdzošais dreskods un 4* kalnu atpūtas konkurss',
    contestPrizeBadge: 'Galvenā balva: 1 nedēļa 4 zvaigžņu kalnu rezidencē',
    venueCta: 'JustMe Milāna kluba ceļvedis',
    dec31BannerBadge: '13. Janvāris 2027 · Oficiāls Xceed pasākums',
    dec31BannerTitle: 'Vecais Jaunais Gads 2027 JustMe Milānā',
    dec31BannerDesc:
      'Turpiniet svētkus janvārī kopā ar DJ Nazar Radchuk: Silver €60, Gold €80, klubs €20 un VIP galdiņi.',
    dec31BannerCta: 'Skatīt 13. janvāra pasākumu (no €20)',
    homeLabel: 'Sākums',
    eventsLabel: 'Milānas pasākumi',
    specialLabel: 'Īpašie pasākumi',
    heroLabels: [
      'Viesu ierašanās zem Torre Branca torņa JustMe Milano',
      'Silver €60 un Gold €80 vakariņas apsildāmajā stikla paviljonā',
      'Pusnakts tosts JustMe Milano VIP Privé zonā',
      'Deju grīda ar DJ Nazar Radchuk līdz plkst. 05:00',
    ],
    extraNativeParagraph:
      'Italo Rota projektētajā apsildāmajā ziemas paviljonā vakars savieno itāļu virtuves vakariņas no plkst. 19:30 ar starptautisko House, Hip-Hop un hitu programmu DJ Nazar Radchuk vadībā.',
    nativeFaqs: [
      {
        q: 'Cikos sākas vakariņas un kluba ieeja 13. janvārī?',
        a: 'Silver (€60) un Gold (€80) vakariņas sākas 19:30 ar iespēju palikt uz ballīti, bet Club biļete (€20 ar 1 dzērienu) derīga no 23:30 līdz 05:00.',
      },
      {
        q: 'Vai vakariņu cenā ir iekļauts vīns un ūdens?',
        a: 'Jā, abās ēdienkartēs uz katriem 4 viesiem ir iekļauta 1 ūdens pudele un 1 vīna pudele.',
      },
      {
        q: 'Kā piedalīties kalnu ceļojuma konkursā?',
        a: 'Izvēlieties elegantu apģērbu (21+) ar sarkanu detaļu vai spīdošu aksesuāru: oriģinālākais tēls iegūs nedēļu 4* kalnu rezidencē.',
      },
    ],
  },
  lt: {
    metaTitle: 'Senieji Naujieji Metai 2027 JustMe Milanas | 01.13 · €20',
    metaDescription:
      'Senojo Naujojo Meto 2027 šventė JustMe Milano sausio 13 d.: Raudonkepuraitės tema, DJ Nazar Radchuk, Silver €60 ir Gold €80 vakarienės, Club €20 Xceed.',
    h1: 'Senieji Naujieji Metai 2027 JustMe Milane: Raudonkepuraitės Sugrįžimas',
    subtitle:
      'Trečiadienis 2027 m. sausio 13 d. · 19:30 Šventinė vakarienė / 23:30 Klubas iki 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Oficiali tema · Il ritorno di Cappuccetto Rosso · Prizas kelionė į kalnus 4*',
    dateBadge: 'Tr 2027-01-13 · 19:30 – 05:00',
    priceBadge: 'Klubas €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegantiška apranga su raudonu ar šviečiančiu akcentu',
    leadIntro:
      '2027 m. sausio 13 d., trečiadienį, JustMe Milano po apšviestu Torre Branca bokštu Parco Sempione parke kviečia į iškilmingą Senųjų Naujųjų Metų (pagal Julijaus kalendorių) vakarą su šventinėmis vakarienėmis ir naktine programa.',
    xceedCtaLabel: 'Pirkti oficialius Xceed bilietus ir vakarienes (nuo €20)',
    whatsappCtaLabel: 'Rezervuoti VIP Privé staliuką WhatsApp 24/7',
    clubTierTitle: 'Įėjimas į klubą + 1 gėrimas (nuo 23:30)',
    silverTierTitle: 'Silver Sėdima Vakarienė (nuo 19:30 + Vakarėlis)',
    goldTierTitle: 'Gold Jūros Gėrybių Vakarienė (nuo 19:30 + Vakarėlis)',
    vipTierTitle: 'VIP Privé staliukai ir gėrimų aptarnavimas',
    contestTitle: 'Raudonas ar švytintis aprangos kodas ir 4* atostogų kalnuose konkursas',
    contestPrizeBadge: 'Didysis prizas: 1 savaitė 4* kalnų rezidencijoje',
    venueCta: 'JustMe Milano klubo apžvalga',
    dec31BannerBadge: '2027-01-13 · Oficialus Xceed renginys',
    dec31BannerTitle: 'Senieji Naujieji Metai 2027 JustMe Milane',
    dec31BannerDesc:
      'Tęskite sausio šventes su DJ Nazar Radchuk: Silver €60, Gold €80, Klubas €20 ir VIP staliukai.',
    dec31BannerCta: 'Žiūrėti sausio 13 d. renginį (nuo €20)',
    homeLabel: 'Pradžia',
    eventsLabel: 'Milano renginiai',
    specialLabel: 'Specialūs vakarai',
    heroLabels: [
      'Svečių atvykimas po Torre Branca bokštu į JustMe Milano',
      'Silver €60 ir Gold €80 šventinės vakarienės šildomame stiklo paviljone',
      'Vidurnakčio tostas JustMe Milano VIP Privé ložėse',
      'Tarptautinė šokių aikštelė su DJ Nazar Radchuk iki 05:00',
    ],
    extraNativeParagraph:
      'Šildomame žiemos paviljone vakaras nuo 19:30 sujungia klasikinę itališką virtuvę su tarptautiniu House, Hip-Hop ir hitų pasirodymu, kurį ves kviestinis DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Kelintą valandą prasideda vakarienės ir įėjimas į klubą sausio 13 d.?',
        a: 'Silver (€60) ir Gold (€80) vakarienės prasideda 19:30 ir suteikia teisę likti vakarėlyje, o Club bilietas (€20 + 1 gėrimas) galioja 23:30–05:00.',
      },
      {
        q: 'Ar į vakarienės meniu įtraukti gėrimai?',
        a: 'Taip, abiejuose meniu kas 4 svečiams skiriamas 1 vandens butelis ir 1 vyno butelis.',
      },
      {
        q: 'Kaip laimėti savaitės atostogas kalnuose?',
        a: 'Ateikite elegantiškai apsirengę (21+) su raudona detale arba šviečiančiu aksesuaru; originaliausias įvaizdis laimės savaitę 4* kalnų rezidencijoje.',
      },
    ],
  },
  mt: {
    metaTitle: 'Ewwel tas-Sena Ortodossa 2027 JustMe Milan | 13 Jan · €20',
    metaDescription:
      'Iċċelebra l-Ewwel tas-Sena Ortodossa 2027 f’JustMe Milano l-Erbgħa 13 ta’ Jannar: DJ Nazar Radchuk, Ikliet Silver €60 u Gold €80, Club €20 fuq Xceed.',
    h1: 'L-Ewwel tas-Sena Ortodossa 2027 f’JustMe Milan: Il-Barnuza l-Ħamra',
    subtitle:
      'L-Erbgħa 13 ta’ Jannar 2027 · 19:30 Ikla Gala / 23:30 Club sa 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Tema Uffiċjali · Il ritorno di Cappuccetto Rosso · Premju Vaganza fil-Muntanji',
    dateBadge: 'L-Erbgħa 13 Jan 2027 · 19:30 / 05:00',
    priceBadge: 'Club €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Ilbies eleganti b’aċċessorju aħmar jew luminuż',
    leadIntro:
      'Nhar l-Erbgħa 13 ta’ Jannar 2027, JustMe Milano jospita l-ikbar ċelebrazzjoni tal-Ewwel tas-Sena Ortodossa taħt it-Torre Branca mdawla f’Parco Sempione b’żewġ ikliet tal-gala u party sa filgħodu.',
    xceedCtaLabel: 'Ixtri Biljetti u Ikliet Uffiċjali fuq Xceed (minn €20)',
    whatsappCtaLabel: 'Ibbukkja Mejda VIP Privé fuq WhatsApp 24/7',
    clubTierTitle: 'Dħul Club + Xarba Waħda (minn 23:30)',
    silverTierTitle: 'Ikla Gala Silver bil-Qiegħda (minn 19:30 + Party)',
    goldTierTitle: 'Ikla Gala Gold bil-Ħut (minn 19:30 + Party)',
    vipTierTitle: 'Imwejjed VIP Privé u Servizz tal-Fliexken',
    contestTitle: 'Dress Code Aħmar jew Luminuż u Kompetizzjoni għal Vaganza 4*',
    contestPrizeBadge: 'Premju: Ġimgħa f’Residenza ta’ 4 Stilel fil-Muntanji',
    venueCta: 'Gwida ta’ JustMe Milan',
    dec31BannerBadge: '13 Jan 2027 · Avveniment Xceed',
    dec31BannerTitle: 'L-Ewwel tas-Sena Ortodossa 2027 f’JustMe Milan',
    dec31BannerDesc:
      'Kompli ċċelebra f’Jannar ma’ DJ Nazar Radchuk: Silver €60, Gold €80, Club €20 u mwejjed VIP.',
    dec31BannerCta: 'Ara l-Ewwel tas-Sena Ortodossa (€20+)',
    homeLabel: 'Dar',
    eventsLabel: 'Avvenimenti Milan',
    specialLabel: 'Avvenimenti Speċjali',
    heroLabels: [
      'Wasla ta’ filgħaxija taħt Torre Branca f’JustMe Milano',
      'Ikliet Silver €60 u Gold €80 fil-paviljun imsaħħan tal-ħġieġ',
      'Toast ta’ nofsillejl fl-imwejjed VIP Privé ta’ JustMe',
      'Pista internazzjonali ma’ DJ Nazar Radchuk sas-05:00',
    ],
    extraNativeParagraph:
      'Taħt il-koppla tal-ħġieġ imsaħħna ddisinjata minn Italo Rota, il-lejla tgħaqqad gastronomija Taljana mis-19:30 ma’ settijiet House, Hip-Hop u Hits internazzjonali minn DJ Nazar Radchuk sas-05:00.',
    nativeFaqs: [
      {
        q: 'F’liema ħin jibdew l-ikliet u d-dħul għall-club fit-13 ta’ Jannar?',
        a: 'L-ikliet Silver (€60) u Gold (€80) jibdew fis-19:30 u jinkludu d-dħul għall-party; il-biljett Club (€20 + xarba) jidħol mit-23:30 sas-05:00.',
      },
      {
        q: 'L-inbid u l-ilma huma inklużi fil-menus Silver u Gold?',
        a: 'Iva, kull menu jinkludi flixkun ilma u flixkun inbid għal kull 4 mistednin.',
      },
      {
        q: 'Kif tipparteċipa għall-vaganza fil-muntanji?',
        a: 'Ilbes ħwejjeġ eleganti (21+) b’biċċa ħamra jew aċċessorju jiddi; l-iktar dehra oriġinali tirbaħ ġimgħa f’residenza ta’ 4 stilel fil-muntanji.',
      },
    ],
  },
  pl: {
    metaTitle: 'Prawosławny Nowy Rok 2027 JustMe Mediolan | 13.01 · 20€',
    metaDescription:
      'Prawosławny Nowy Rok 2027 w JustMe Mediolan 13 stycznia: Czerwony Kapturek, DJ Nazar Radchuk, kolacje Silver 60€ i Gold 80€, Club 20€ na Xceed.',
    h1: 'Prawosławny Nowy Rok 2027 w JustMe Mediolan: Powrót Czerwonego Kapturka',
    subtitle:
      'Środa 13 stycznia 2027 · 19:30 Kolacja Galowa / 23:30 Club do 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Motyw oficjalny · Il ritorno di Cappuccetto Rosso · Nagroda tydzień w górach 4*',
    dateBadge: 'Śr 13 Stycznia 2027 · 19:30 / 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegancki strój z czerwonym lub świecącym akcentem',
    leadIntro:
      'W środę 13 stycznia 2027 roku mediolański klub JustMe Milano zaprasza na wielkie świętowanie Prawosławnego Nowego Roku według kalendarza juliańskiego pod podświetloną wieżą Torre Branca w Parco Sempione.',
    xceedCtaLabel: 'Kup oficjalne bilety i kolacje na Xceed (od 20€)',
    whatsappCtaLabel: 'Rezerwuj stolik VIP Privé przez WhatsApp 24/7',
    clubTierTitle: 'Wstęp do klubu + 1 drink (od 23:30)',
    silverTierTitle: 'Kolacja Galowa Silver przy stoliku (19:30 + Impreza)',
    goldTierTitle: 'Morska Kolacja Galowa Gold (19:30 + Impreza)',
    vipTierTitle: 'Stoliki VIP Privé i serwis butelkowy',
    contestTitle: 'Czerwony lub świecący dodatek i konkurs o wakacje w górach 4*',
    contestPrizeBadge: 'Nagroda główna: Tydzień w 4-gwiazdkowej rezydencji w górach',
    venueCta: 'Przewodnik po klubie JustMe',
    dec31BannerBadge: '13 Stycznia 2027 · Oficjalne wydarzenie Xceed',
    dec31BannerTitle: 'Prawosławny Nowy Rok 2027 w JustMe Mediolan',
    dec31BannerDesc:
      'Świętuj w styczniu z DJ Nazarem Radchukiem: Kolacja Silver 60€, Gold 80€, Club 20€ i stoliki VIP.',
    dec31BannerCta: 'Zobacz Stary Nowy Rok (od 20€)',
    homeLabel: 'Start',
    eventsLabel: 'Wydarzenia Mediolan',
    specialLabel: 'Wydarzenia specjalne',
    heroLabels: [
      'Zimowe przybycie gości pod wieżą Torre Branca do JustMe Mediolan',
      'Kolacje Silver 60€ i Gold 80€ w ogrzewanym szklanym pawilonie',
      'Toast o północy w strefie VIP Privé w JustMe',
      'Międzynarodowy parkiet z DJ Nazarem Radchukiem do 05:00 rano',
    ],
    extraNativeParagraph:
      'Pod ogrzewanym szklanym dachem projektu Italo Roty wieczór łączy włoską kuchnię serwowaną od 19:30 z taneczną energią House, Hip-Hop i światowych hitów serwowanych przez gościa specjalnego DJ Nazara Radchuka.',
    nativeFaqs: [
      {
        q: 'O której rozpoczyna się kolacja, a od której wejście klubowe 13 stycznia?',
        a: 'Kolacje Silver (60€) i Gold (80€) zaczynają się o 19:30 i obejmują pozostanie na imprezie; bilet Club + 1 drink (20€) obowiązuje od 23:30 do 05:00.',
      },
      {
        q: 'Czy wino i woda są wliczone w menu Silver i Gold?',
        a: 'Tak, oba zestawy zawierają 1 butelkę wody oraz 1 butelkę wina na każde 4 osoby.',
      },
      {
        q: 'Jak wziąć udział w konkursie na tydzień w górach?',
        a: 'Wystarczy elegancki strój (21+) uzupełniony o czerwony element lub świecący dodatek; najbardziej oryginalna stylizacja wygrywa tydzień w 4* górskiej rezydencji.',
      },
    ],
  },
  ro: {
    metaTitle: 'Revelion pe Rit Vechi 2027 JustMe Milano | 13 Ian · 20€',
    metaDescription:
      'Revelionul pe Rit Vechi 2027 la JustMe Milano miercuri 13 ianuarie: DJ Nazar Radchuk, Cine Silver 60€ & Gold 80€, Club 20€ prin Xceed.',
    h1: 'Revelion pe Rit Vechi 2027 la JustMe Milano: Întoarcerea Scufiței Roșii',
    subtitle:
      'Miercuri 13 ianuarie 2027 · 19:30 Cină de Gală / 23:30 Club până la 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Tematică Oficială · Il ritorno di Cappuccetto Rosso · Premiu 1 săptămână la munte 4*',
    dateBadge: 'Miercuri 13 Ianuarie 2027 · 19:30 / 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Ținută elegantă cu detaliu roșu sau luminos',
    leadIntro:
      'Miercuri, 13 ianuarie 2027, JustMe Milano găzduiește cea mai mare petrecere de Revelion pe Rit Vechi din Milano, sub turnul luminat Torre Branca din Parco Sempione, cu două meniuri festive servite la masă și show de club până la 05:00 dimineața.',
    xceedCtaLabel: 'Cumpără Bilete & Cine Oficiale pe Xceed (de la 20€)',
    whatsappCtaLabel: 'Rezervă Masă VIP Privé pe WhatsApp 24/7',
    clubTierTitle: 'Intrare Club + 1 Băutură (de la 23:30)',
    silverTierTitle: 'Cină Festivă Meniu Silver (de la 19:30 + Party)',
    goldTierTitle: 'Cină Festivă cu Fructe de Mare Gold (de la 19:30 + Party)',
    vipTierTitle: 'Mese VIP Privé & Serviciu Sticle',
    contestTitle: 'Dress Code Elegant cu Accent Roșu sau Luminos & Concurs Vacanță la Munte',
    contestPrizeBadge: 'Premiu: 1 Săptămână într-o Reședință de 4 Stele la Munte',
    venueCta: 'Profil Club JustMe Milano',
    dec31BannerBadge: '13 Ianuarie 2027 · Eveniment Xceed',
    dec31BannerTitle: 'Revelion pe Rit Vechi 2027 la JustMe Milano (13 Ian)',
    dec31BannerDesc:
      'Continuă sărbătoarea în ianuarie cu DJ Nazar Radchuk: Cină Silver 60€, Cină Gold 80€, Intrare Club 20€ și mese VIP.',
    dec31BannerCta: 'Vezi Revelion pe Rit Vechi (20€+)',
    homeLabel: 'Acasă',
    eventsLabel: 'Evenimente Milano',
    specialLabel: 'Evenimente Speciale',
    heroLabels: [
      'Sosirea invitaților sub Torre Branca la JustMe Milano',
      'Cinele festive Silver 60€ și Gold 80€ în pavilionul încălzit de sticlă',
      'Toastul de miezul nopții la mesele VIP Privé din JustMe Milano',
      'Ringul internațional cu DJ Nazar Radchuk până la 05:00 dimineața',
    ],
    extraNativeParagraph:
      'Pavilionul de iarnă încălzit din Parco Sempione reunește comunitatea românească, est-europeană și milaneză 21+ pentru cina servită la 19:30 și mixurile House, Hip-Hop și hituri internaționale ale invitatului special DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'La ce oră încep cinele și intrarea în club pe 13 ianuarie 2027?',
        a: 'Cinele Silver (60€) și Gold (80€) încep la 19:30 și includ accesul la petrecere toată noaptea, iar biletul Club + 1 Băutură (20€) este valabil de la 23:30 până la 05:00.',
      },
      {
        q: 'Vinul și apa sunt incluse în meniurile Silver și Gold?',
        a: 'Da, ambele meniuri includ 1 sticlă de apă și 1 sticlă de vin la fiecare 4 persoane.',
      },
      {
        q: 'Cum particip la concursul pentru săptămâna de vacanță la munte?',
        a: 'Purtați o ținută elegantă (21+) completată cu o piesă roșie sau un accesoriu luminos; cea mai originală și strălucitoare apariție câștigă o săptămână la o reședință de 4 stele la munte.',
      },
    ],
  },
  sk: {
    metaTitle: 'Pravoslávny Nový rok 2027 JustMe Miláno | 13. 1. · od 20€',
    metaDescription:
      'Pravoslávny Nový rok 2027 v JustMe Milano v stredu 13. januára: DJ Nazar Radchuk, večere Silver 60€ a Gold 80€, Club 20€ cez Xceed.',
    h1: 'Pravoslávny Nový rok 2027 v JustMe Miláno: Návrat Červenej Čiapočky',
    subtitle:
      'Streda 13. januára 2027 · 19:30 Slávnostná večera / 23:30 Klub do 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Oficiálna téma · Il ritorno di Cappuccetto Rosso · Výhra týždeň na horách 4*',
    dateBadge: 'St 13. 1. 2027 · 19:30 – 05:00',
    priceBadge: 'Klub 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegantný štýl s červeným alebo svietiacim prvkom',
    leadIntro:
      'V stredu 13. januára 2027 oslavuje JustMe Milano pod osvetlenou vežou Torre Branca v Parco Sempione pravoslávny Nový rok podľa juliánskeho kalendára dvomi gala menu a klubovou nocou do rána.',
    xceedCtaLabel: 'Kúpiť vstupenky a večere cez Xceed (od 20€)',
    whatsappCtaLabel: 'Rezervovať VIP Privé stôl cez WhatsApp 24/7',
    clubTierTitle: 'Vstup do klubu + 1 drink (od 23:30)',
    silverTierTitle: 'Servírovaná gala večera Silver (od 19:30 + Party)',
    goldTierTitle: 'Servírovaná morská večera Gold (od 19:30 + Party)',
    vipTierTitle: 'VIP Privé stoly a fľašový servis',
    contestTitle: 'Dress code s červeným či žiarivým detailom a súťaž o dovolenku 4*',
    contestPrizeBadge: 'Hlavná cena: 1 týždeň v 4* horskej rezidencii',
    venueCta: 'Profil klubu JustMe Miláno',
    dec31BannerBadge: '13. 1. 2027 · Oficiálna akcia Xceed',
    dec31BannerTitle: 'Pravoslávny Nový rok 2027 v JustMe Miláno',
    dec31BannerDesc:
      'Oslávte 13. január s DJ Nazarom Radchukom: Večera Silver 60€, Gold 80€, Klub 20€ a VIP stoly.',
    dec31BannerCta: 'Zobraziť pravoslávny Nový rok (od 20€)',
    homeLabel: 'Domov',
    eventsLabel: 'Udalosti Miláno',
    specialLabel: 'Špeciálne udalosti',
    heroLabels: [
      'Zimný príchod hostí pod vežou Torre Branca do JustMe Milano',
      'Večere Silver 60€ a Gold 80€ vo vyhrievanom sklenenom pavilóne',
      'Polnočný prípitok pri VIP Privé stoloch v JustMe Miláno',
      'Tanečný parket s DJ Nazarom Radchukom do 05:00 ráno',
    ],
    extraNativeParagraph:
      'Vyhrievaný zimný pavilón v parku Sempione spája od 19:30 taliansku gastronómiu s nočným setom House, Hip-Hop a hitov v podaní DJ Nazara Radchuka.',
    nativeFaqs: [
      {
        q: 'Kedy sa začínajú večere a vstup do klubu 13. januára 2027?',
        a: 'Večere Silver (60€) a Gold (80€) začínajú o 19:30 a zahŕňajú celovečerný vstup na párty; klubová vstupenka (20€ + 1 drink) platí od 23:30 do 05:00.',
      },
      {
        q: 'Sú v cene menu zahrnuté víno a voda?',
        a: 'Áno, obe menu zahŕňajú 1 fľašu vody a 1 fľašu vína na každých 4 hostí.',
      },
      {
        q: 'Ako sa zapojiť do súťaže o týždeň v horách?',
        a: 'Zvoľte elegantný outfit (21+) s červeným alebo svietiacim doplnkom; najoriginálnejší vzhľad vyhráva týždeň v 4* horskej rezidencii.',
      },
    ],
  },
  sl: {
    metaTitle: 'Pravoslavno Novo Leto 2027 JustMe Milano | 13.01 · 20€',
    metaDescription:
      'Pravoslavno novo leto 2027 v JustMe Milano v sredo 13. januarja: Rdeča kapica, DJ Nazar Radchuk, večerji Silver 60€ & Gold 80€, klub 20€ prek Xceeda.',
    h1: 'Pravoslavno Novo Leto 2027 v JustMe Milano: Vrnitev Rdeče Kapice',
    subtitle:
      'Sreda 13. januar 2027 · 19:30 Gala večerja / 23:30 Klub do 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Uradna tema · Il ritorno di Cappuccetto Rosso · Nagrada teden dni v gorah 4*',
    dateBadge: 'Sreda 13.01.2027 · 19:30 – 05:00',
    priceBadge: 'Klub 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Eleganten slog z rdečim ali svetlečim dodatkom',
    leadIntro:
      'V sredo 13. januarja 2027 JustMe Milano pod osvetljenim stolpom Torre Branca v parku Sempione gosti osrednje praznovanje pravoslavnega novega leta po julijanskem koledarju z gala večerjama in zabavo do jutra.',
    xceedCtaLabel: 'Kupi uradne Xceed vstopnice in večerje (od 20€)',
    whatsappCtaLabel: 'Rezerviraj VIP Privé mizo na WhatsApp 24/7',
    clubTierTitle: 'Vstop v klub + 1 pijača (od 23:30)',
    silverTierTitle: 'Silver Gala Večerja za mizo (od 19:30 + Party)',
    goldTierTitle: 'Gold Morska Gala Večerja (od 19:30 + Party)',
    vipTierTitle: 'VIP Privé mize in strežba steklenic',
    contestTitle: 'Eleganten dress code z rdečim/svetlečim dodatkom in nagrada 4*',
    contestPrizeBadge: 'Glavna nagrada: 1 teden v 4-zvezdični gorski rezidenci',
    venueCta: 'Predstavitev kluba JustMe Milano',
    dec31BannerBadge: '13. januar 2027 · Uradni Xceed dogodek',
    dec31BannerTitle: 'Pravoslavno Novo Leto 2027 v JustMe Milano',
    dec31BannerDesc:
      'Nadaljujte praznovanje 13. januarja z DJ Nazarjem Radchukom: Silver 60€, Gold 80€, klub 20€ in VIP mize.',
    dec31BannerCta: 'Oglej si 13. januar (od 20€)',
    homeLabel: 'Domov',
    eventsLabel: 'Dogodki Milano',
    specialLabel: 'Posebni dogodki',
    heroLabels: [
      'Zimski prihod gostov pod stolpom Torre Branca v JustMe Milano',
      'Večerji Silver 60€ in Gold 80€ v ogrevanem steklenem paviljonu',
      'Polnočna zdravica ob VIP Privé mizah v JustMe Milano',
      'Plessišče z DJ Nazarjem Radchukom do 05:00 zjutraj',
    ],
    extraNativeParagraph:
      'Večer pod ogrevano stekleno kupolo združuje izbrano italijansko kulinariko ob 19:30 ter vrhunski House, Hip-Hop in Hits program z gostujočo zvezdo DJ Nazarjem Radchukom.',
    nativeFaqs: [
      {
        q: 'Kdaj se začneta večerji in kdaj vstop v klub 13. januarja?',
        a: 'Silver (60€) in Gold (80€) večerji se začneta ob 19:30 in vključujeta zabavo; vstopnica Club + 1 pijača (20€) velja od 23:30 do 05:00.',
      },
      {
        q: 'Ali sta vino in voda vključena v menija Silver in Gold?',
        a: 'Da, oba menija vključujeta 1 steklenico vode in 1 steklenico vina na vsake 4 goste.',
      },
      {
        q: 'Kako sodelujem za teden dni počitnic v gorah?',
        a: 'Oblecite se elegantno (21+) z rdečim ali svetlečim dodatkom; najbolj izvirna oprava prejme tedensko bivanje v gorski rezidenci 4*.',
      },
    ],
  },
  sv: {
    metaTitle: 'Ortodoxt Nyår 2027 JustMe Milano | 13 Jan · Från €20',
    metaDescription:
      'Fira Ortodoxt Nyår 2027 på JustMe Milano onsdag 13 januari: DJ Nazar Radchuk, Silver €60 & Gold €80 galamiddag, Club €20 biljetter på Xceed.',
    h1: 'Ortodoxt Nyår 2027 på JustMe Milano: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Onsdag 13 januari 2027 · 19:30 Galamiddag / 23:30 Klubb till 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Officiellt Tema · Röd eller lysande detalj · Vinn 4-stjärnig bergssemester',
    dateBadge: 'Ons 13 Jan 2027 · 19:30 – 05:00',
    priceBadge: 'Klubb €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegant klädsel med röd eller lysande accessoar',
    leadIntro:
      'Onsdagen den 13 januari 2027 bjuder JustMe Milano in till Milanos största firande av Ortodoxt Nyår enligt den julianska kalendern under upplysta Torre Branca i Parco Sempione.',
    xceedCtaLabel: 'Köp officiella Xceed-biljetter & middag (från €20)',
    whatsappCtaLabel: 'Boka VIP Privé-bord via WhatsApp 24/7',
    clubTierTitle: 'Klubbentré + 1 drink (från 23:30)',
    silverTierTitle: 'Silver Sittande Galamiddag (från 19:30 + Party)',
    goldTierTitle: 'Gold Skaldjurs-Galamiddag (från 19:30 + Party)',
    vipTierTitle: 'VIP Privé-bord & flaskservering',
    contestTitle: 'Elegant dresscode med röd/lysande detalj & tävling om bergsvistelse',
    contestPrizeBadge: 'Första pris: 1 vecka i 4-stjärnigt bergsboende',
    venueCta: 'JustMe Milano Klubbguide',
    dec31BannerBadge: '13 Jan 2027 · Officiellt Xceed-event',
    dec31BannerTitle: 'Ortodoxt Nyår 2027 på JustMe Milano (13 Jan)',
    dec31BannerDesc:
      'Fortsätt firandet i januari med DJ Nazar Radchuk: Silver €60, Gold €80, Klubb €20 och VIP-bord.',
    dec31BannerCta: 'Se Ortodoxt Nyår (från €20)',
    homeLabel: 'Hem',
    eventsLabel: 'Milano Events',
    specialLabel: 'Specialevenemang',
    heroLabels: [
      'Gäster anländer under Torre Branca vid JustMe Milano',
      'Silver €60 och Gold €80 middagar i den uppvärmda glaspaviljongen',
      'Midnattsskål vid VIP Privé-borden på JustMe Milano',
      'Internationellt dansgolv med DJ Nazar Radchuk fram till 05:00',
    ],
    extraNativeParagraph:
      'Under Italo Rotas uppvärmda glaskupol förenas italiensk festmeny kl. 19:30 med House, Hip-Hop och globala hits levererade av gäststjärnan DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'När börjar middagen och klubbentrén den 13 januari 2027?',
        a: 'Silver (€60) och Gold (€80) börjar 19:30 och inkluderar fortsatt nattklubb; Club-biljett (€20 inkl. 1 drink) gäller från 23:30 till 05:00.',
      },
      {
        q: 'Ingår vin och vatten i middagsmenyerna?',
        a: 'Ja, båda menyerna inkluderar 1 flaska vatten och 1 flaska vin per 4 gäster.',
      },
      {
        q: 'Hur tävlar man om en veckas bergssemester?',
        a: 'Kom i elegant klädsel (21+) med något rött eller en lysande detalj; den mest originella stilen vinner en vecka i 4-stjärnigt bergsboende.',
      },
    ],
  },
  no: {
    metaTitle: 'Ortodoks Nyttår 2027 JustMe Milano | 13. Jan · Fra €20',
    metaDescription:
      'Ortodoks Nyttår 2027 på JustMe Milano onsdag 13. januar: DJ Nazar Radchuk, Silver €60 & Gold €80 gallamiddag, Club €20 billetter via Xceed.',
    h1: 'Ortodoks Nyttår 2027 på JustMe Milano: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Onsdag 13. januar 2027 · 19:30 Gallamiddag / 23:30 Klubb til 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Offisielt Tema · Rød eller lysende detalj · Vinn 4-stjerners fjellferie',
    dateBadge: 'Ons 13. Jan 2027 · 19:30 – 05:00',
    priceBadge: 'Klubb €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Elegant antrekk med rød eller lysende detalj',
    leadIntro:
      'Onsdag 13. januar 2027 inviterer JustMe Milano til Milanos største feiring av Ortodoks Nyttår etter den julianske kalenderen under opplyste Torre Branca i Parco Sempione.',
    xceedCtaLabel: 'Kjøp offisielle Xceed-billetter & middag (fra €20)',
    whatsappCtaLabel: 'Reserver VIP Privé-bord på WhatsApp 24/7',
    clubTierTitle: 'Klubbinngang + 1 drink (fra 23:30)',
    silverTierTitle: 'Silver Sittende Gallamiddag (fra 19:30 + Party)',
    goldTierTitle: 'Gold Sjømat Gallamiddag (fra 19:30 + Party)',
    vipTierTitle: 'VIP Privé-bord & flaskeservering',
    contestTitle: 'Elegant kleskode med rød/lysende detalj & fjellferie-konkurranse',
    contestPrizeBadge: 'Premie: 1 uke i 4-stjerners fjellresidens',
    venueCta: 'JustMe Milano Klubbguide',
    dec31BannerBadge: '13. Jan 2027 · Offisielt Xceed-event',
    dec31BannerTitle: 'Ortodoks Nyttår 2027 på JustMe Milano (13. Jan)',
    dec31BannerDesc:
      'Feir videre i januar med DJ Nazar Radchuk: Silver €60, Gold €80, Klubb €20 og VIP-bord.',
    dec31BannerCta: 'Se Ortodoks Nyttår (fra €20)',
    homeLabel: 'Hjem',
    eventsLabel: 'Milano Events',
    specialLabel: 'Spesielle Eventer',
    heroLabels: [
      'Ankomst under Torre Branca ved JustMe Milano om kvelden',
      'Silver €60 og Gold €80 middager i den oppvarmede glasspaviljongen',
      'Midnattskål ved VIP Privé-bordene hos JustMe Milano',
      'Dansegulv med DJ Nazar Radchuk frem til kl. 05:00',
    ],
    extraNativeParagraph:
      'Under Italo Rotas oppvarmede glasskuppel kombineres italiensk festmeny kl. 19:30 med House, Hip-Hop og internasjonale hits levert av gjestestjernen DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Når starter middag og klubbinngang 13. januar 2027?',
        a: 'Silver (€60) og Gold (€80) starter kl. 19:30 og inkluderer tilgang til nattklubben; Club-billett (€20 med 1 drink) gjelder fra 23:30 til 05:00.',
      },
      {
        q: 'Er vin og vann inkludert i middagsmenyene?',
        a: 'Ja, begge menyer inkluderer 1 flaske vann og 1 flaske vin per 4 gjester.',
      },
      {
        q: 'Hvordan vinner man en ukes fjellopphold?',
        a: 'Kom elegant antrukket (21+) med en rød eller lysende detalj; det mest originale antrekket vinner en uke i 4-stjerners fjellresidens.',
      },
    ],
  },
  is: {
    metaTitle: 'Rétttrúnaðar Nýár 2027 JustMe Mílanó | 13. Jan · €20',
    metaDescription:
      'Fagnaðu rétttrúnaðarnýári 2027 á JustMe Milano miðvikudag 13. janúar: DJ Nazar Radchuk, Silver €60 & Gold €80 kvöldverður, Club €20 á Xceed.',
    h1: 'Rétttrúnaðar Nýár 2027 á JustMe Mílanó: Rauðhetta snýr aftur',
    subtitle:
      'Miðvikudagur 13. janúar 2027 · 19:30 Hátíðarkvöldverður / 23:30 Klúbbur til 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Opinbert þema · Il ritorno di Cappuccetto Rosso · Verðlaun fjalladvöl 4*',
    dateBadge: 'Mið 13. Jan 2027 · 19:30 – 05:00',
    priceBadge: 'Klúbbur €20 · Silver €60 · Gold €80',
    ageDressBadge: '21+ · Glæsilegur klæðnaður með rauðum eða lýsandi hreim',
    leadIntro:
      'Miðvikudaginn 13. janúar 2027 heldur JustMe Milano stærstu nýársveislu rétttrúnaðarsamfélagsins í Mílanó undir upplýstum Torre Branca í Parco Sempione með hátíðarkvöldverði og dansgólfi til morguns.',
    xceedCtaLabel: 'Kaupa opinbera Xceed miða og kvöldverð (frá €20)',
    whatsappCtaLabel: 'Bóka VIP Privé borð á WhatsApp 24/7',
    clubTierTitle: 'Klúbbaaðgangur + 1 drykkur (frá 23:30)',
    silverTierTitle: 'Silver Hátíðarkvöldverður (frá 19:30 + Veisla)',
    goldTierTitle: 'Gold Sjávarréttakvöldverður (frá 19:30 + Veisla)',
    vipTierTitle: 'VIP Privé borð og flöskuþjónusta',
    contestTitle: 'Glæsilegur klæðnaður með rauðum/lýsandi aukahlut & fjallaverðlaun',
    contestPrizeBadge: 'Verðlaun: 1 vika á 4 stjörnu fjallagistingu',
    venueCta: 'JustMe Mílanó klúbbaleiðarvísir',
    dec31BannerBadge: '13. Jan 2027 · Opinber Xceed viðburður',
    dec31BannerTitle: 'Rétttrúnaðar Nýár 2027 á JustMe Mílanó',
    dec31BannerDesc:
      'Haltu veislunni áfram í janúar með DJ Nazar Radchuk: Silver €60, Gold €80, Club €20 og VIP borð.',
    dec31BannerCta: 'Skoða 13. janúar (frá €20)',
    homeLabel: 'Heim',
    eventsLabel: 'Viðburðir Mílanó',
    specialLabel: 'Sérstakir viðburðir',
    heroLabels: [
      'Koma gesta undir Torre Branca við JustMe Mílanó',
      'Silver €60 og Gold €80 kvöldverðir í upphituðum glerskála',
      'Miðnæturskál á VIP Privé borðum í JustMe Mílanó',
      'Dansgólfið með DJ Nazar Radchuk fram til kl. 05:00',
    ],
    extraNativeParagraph:
      'Undir upphituðu glerþaki Italo Rota sameinast ítalskur hátíðarmatur kl. 19:30 og alþjóðleg tónlist með House, Hip-Hop og smellum frá DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Hvenær hefst kvöldverður og klúbbaaðgangur 13. janúar 2027?',
        a: 'Silver (€60) og Gold (€80) hefjast kl. 19:30 með áframhaldandi aðgangi að veislunni; Club miði (€20 með 1 drykk) gildir frá 23:30 til 05:00.',
      },
      {
        q: 'Eru vín og vatn innifalin í Silver og Gold matseðlum?',
        a: 'Já, báðir matseðlar innihalda 1 flösku af vatni og 1 flösku af víni á hverja 4 gesti.',
      },
      {
        q: 'Hvernig tek ég þátt í keppninni um viku dvöl í fjöllunum?',
        a: 'Komdu í glæsilegum fötum (21+) með rauðan eða lýsandi aukahlut; frumlegasta útlitið vinnur viku í 4* fjallaíbúð.',
      },
    ],
  },
  uk: {
    metaTitle: 'Старий Новий Рік 2027 JustMe Мілан | 13 січня · від 20€',
    metaDescription:
      'Старий Новий Рік 2027 у JustMe Milano 13 січня: Червона Шапочка, DJ Nazar Radchuk, вечері Silver 60€ і Gold 80€, клуб 20€ через Xceed.',
    h1: 'Старий Новий Рік 2027 у JustMe Мілан: Повернення Червоної Шапочки',
    subtitle:
      'Середа 13 січня 2027 · 19:30 Гала-вечеря / 23:30 Клуб до 05:00 · Guest Star DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Офіційна тема · Il ritorno di Cappuccetto Rosso · Приз тиждень у горах 4*',
    dateBadge: 'Ср 13 січня 2027 · 19:30 / 05:00',
    priceBadge: 'Клуб 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Елегантний образ із червоним або світним акцентом',
    leadIntro:
      'У середу 13 січня 2027 року флагманський клуб JustMe Milano запрошує на головний Старий Новий Рік у Мілані біля підсвіченої вежі Torre Branca в Парко Семпіоне: опалюваний зимовий скляний павільйон, дві святкові вечері та вечірка до 05:00 ранку.',
    xceedCtaLabel: 'Купити квитки та вечері на Xceed (від 20€)',
    whatsappCtaLabel: 'Забронювати VIP Privé стіл у WhatsApp 24/7',
    clubTierTitle: 'Вхід до клубу + 1 напій (з 23:30)',
    silverTierTitle: 'Святкова вечеря Silver з посадкою (з 19:30 + Вечірка)',
    goldTierTitle: 'Морська гала-вечеря Gold (з 19:30 + Вечірка)',
    vipTierTitle: 'Столи VIP Privé та обслуговування біля сцени',
    contestTitle: 'Червоний або світний акцент та конкурс на тиждень відпочинку в горах 4*',
    contestPrizeBadge: 'Головний приз: 1 тиждень у 4-зірковій гірській резиденції',
    venueCta: 'Гід по клубу JustMe Мілан',
    dec31BannerBadge: '13 січня 2027 · Офіційно на Xceed',
    dec31BannerTitle: 'Старий Новий Рік 2027 у JustMe Мілан (13 січня)',
    dec31BannerDesc:
      'Продовження свят у січні з DJ Nazar Radchuk: вечеря Silver 60€, Gold 80€, вхід у клуб 20€ та VIP-столи.',
    dec31BannerCta: 'Детальніше про 13 січня (від 20€)',
    homeLabel: 'Головна',
    eventsLabel: 'Події Мілана',
    specialLabel: 'Спеціальні події',
    heroLabels: [
      'Вечірній вхід гостей під вежею Torre Branca до JustMe Milano',
      'Гала-вечері Silver 60€ та Gold 80€ в опалюваному скляному павільйоні',
      'Північний тост за VIP Privé столами в JustMe',
      'Міжнародний танцпол із DJ Nazar Radchuk до 05:00 ранку',
    ],
    extraNativeParagraph:
      'Святковий вечір об’єднує українську, європейську та міланську публіку 21+ під скляним куполом Італо Роти: висока італійська кухня з 19:30, опівнічне святкування та драйвовий сет House, Hip-Hop і світових хітів від DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'О котрій годині починаються вечері та клубний вхід 13 січня 2027 року?',
        a: 'Вечері Silver (60€) та Gold (80€) стартують о 19:30 і дають право залишатися в клубі на всю ніч; квиток Club + 1 Drink (20€) діє з 23:30 до 05:00.',
      },
      {
        q: 'Чи включені вода та вино у вартість меню Silver і Gold?',
        a: 'Так, кожне меню включає 1 пляшку води та 1 пляшку вина на кожні 4 гостей.',
      },
      {
        q: 'Як взяти участь у конкурсі на тиждень у гірській резиденції 4*?',
        a: 'Оберіть елегантний образ (21+) з червоною деталлю або світним аксесуаром; найоригінальніший та найсяючіший образ виграє тиждень відпочинку в горах.',
      },
    ],
  },
  sq: {
    metaTitle: 'Viti i Ri Ortodoks 2027 JustMe Milano | 13 Janar · 20€',
    metaDescription:
      'Viti i Ri Ortodoks 2027 në JustMe Milano të mërkurën 13 janar: Kësulëkuqja, DJ Nazar Radchuk, Darka Silver 60€ & Gold 80€, Club 20€ në Xceed.',
    h1: 'Viti i Ri Ortodoks 2027 në JustMe Milano: Rikthimi i Kësulëkuqes',
    subtitle:
      'E mërkurë 13 Janar 2027 · 19:30 Darka Gala / 23:30 Club deri në 05:00 · DJ Nazar Radchuk · Parco Sempione',
    themeTag: 'Tema Zyrtare · Il ritorno di Cappuccetto Rosso · Çmimi 1 javë në mal 4*',
    dateBadge: 'E mërkurë 13 Janar 2027 · 19:30 / 05:00',
    priceBadge: 'Club 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Veshje elegante me detaj të kuq ose ndriçues',
    leadIntro:
      'Të mërkurën më 13 janar 2027, JustMe Milano pret festën kryesore të Vitit të Ri Ortodoks sipas kalendarit julian poshtë kullës së ndriçuar Torre Branca në Parco Sempione me darka gala dhe festë deri në agim.',
    xceedCtaLabel: 'Bli Bileta & Darka Zyrtare në Xceed (nga 20€)',
    whatsappCtaLabel: 'Rezervo Tavolinë VIP Privé në WhatsApp 24/7',
    clubTierTitle: 'Hyrja Club + 1 Pije (nga 23:30)',
    silverTierTitle: 'Darka Gala Silver me Ulsë (nga 19:30 + Party)',
    goldTierTitle: 'Darka Gala me Fruta Deti Gold (nga 19:30 + Party)',
    vipTierTitle: 'Tavolinat VIP Privé & Shërbimi i Shisheve',
    contestTitle: 'Kodi i Kuq ose Ndriçues & Gara për 1 Javë Pushime në Mal 4*',
    contestPrizeBadge: 'Çmimi i Madh: 1 Javë në Rezidencë Malore 4 Yje',
    venueCta: 'Profili i JustMe Milano',
    dec31BannerBadge: '13 Janar 2027 · Event Zyrtar Xceed',
    dec31BannerTitle: 'Viti i Ri Ortodoks 2027 në JustMe Milano',
    dec31BannerDesc:
      'Vazhdoni festimet në janar me DJ Nazar Radchuk: Darka Silver 60€, Gold 80€, Club 20€ dhe tavolina VIP.',
    dec31BannerCta: 'Shiko 13 Janarin (nga 20€)',
    homeLabel: 'Kreu',
    eventsLabel: 'Eventet në Milano',
    specialLabel: 'Evente Speciale',
    heroLabels: [
      'Mbërritja dimërore poshtë Torre Branca në JustMe Milano',
      'Darkat Silver 60€ dhe Gold 80€ në pavionin e ngrohur prej xhami',
      'Dolli i mesnatës në tavolinat VIP Privé të JustMe Milano',
      'Pista ndërkombëtare me DJ Nazar Radchuk deri në 05:00',
    ],
    extraNativeParagraph:
      'Nën kupolën e ngrohur prej xhami në Parco Sempione, mbrëmja bashkon kulinarinë italiane nga ora 19:30 me ritmet House, Hip-Hop dhe hitet ndërkombëtare të DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Në çfarë ore fillon darka dhe hyrja e club-it më 13 janar 2027?',
        a: 'Darkat Silver (60€) dhe Gold (80€) nisin në 19:30 me qëndrim falas për festën; bileta Club + 1 pije (20€) vlen nga 23:30 deri në 05:00.',
      },
      {
        q: 'A janë vera dhe uji të përfshira në menutë Silver dhe Gold?',
        a: 'Po, të dyja menutë përfshijnë 1 shishe ujë dhe 1 shishe verë për çdo 4 të ftuar.',
      },
      {
        q: 'Si të fitoj javën e pushimeve në mal?',
        a: 'Vishuni në stil elegant (21+) me një detaj të kuq ose aksesor ndriçues; pamja më origjinale fiton 1 javë në rezidencë malore 4*.',
      },
    ],
  },
  sr: {
    metaTitle: 'Srpska Nova Godina 2027 JustMe Milano | 13.01 · Od 20€',
    metaDescription:
      'Srpska Nova Godina 2027 u JustMe Milano u sredu 13. januara: Crvenkapa tema, DJ Nazar Radchuk, Silver 60€ & Gold 80€ večere, Club 20€ na Xceedu.',
    h1: 'Srpska Nova Godina 2027 u JustMe Milano: Povratak Crvenkape',
    subtitle:
      'Sreda 13. januar 2027 · 19:30 Gala večera / 23:30 Klub do 05:00 · Guest Star DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Zvanična tema · Il ritorno di Cappuccetto Rosso · Nagrada nedelja dana na planini 4*',
    dateBadge: 'Sreda 13.01.2027 · 19:30 – 05:00',
    priceBadge: 'Klub 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegantan izgled sa crvenim ili svetlećim detaljem',
    leadIntro:
      'U sredu 13. januara 2027. godine JustMe Milano organizuje centralni doček Srpske i Pravoslavne Nove Godine u Milanu pod osvetljenim tornjem Torre Branca u parku Sempione, uz svečane večere i klupski provod do 05:00.',
    xceedCtaLabel: 'Kupi zvanične Xceed karte i večere (od 20€)',
    whatsappCtaLabel: 'Rezerviši VIP Privé sto putem WhatsAppa 24/7',
    clubTierTitle: 'Ulaz za klub + 1 piće (od 23:30)',
    silverTierTitle: 'Silver Gala Večera za stolom (od 19:30 + Žurka)',
    goldTierTitle: 'Gold Riblja Gala Večera (od 19:30 + Žurka)',
    vipTierTitle: 'VIP Privé stolovi i ponuda flaša',
    contestTitle: 'Crveni ili svetleći detalj i takmičenje za 7 dana na planini 4*',
    contestPrizeBadge: 'Glavna nagrada: 7 dana u planinskoj rezidenciji sa 4 zvezdice',
    venueCta: 'Vodič kroz JustMe Milano',
    dec31BannerBadge: '13. januar 2027 · Zvanični Xceed događaj',
    dec31BannerTitle: 'Srpska Nova Godina 2027 u JustMe Milano (13.01)',
    dec31BannerDesc:
      'Doček Srpske Nove Godine uz DJ Nazara Radchuka: Silver večera 60€, Gold večera 80€, ulaz 20€ i VIP separei.',
    dec31BannerCta: 'Vidi Srpsku Novu Godinu (od 20€)',
    homeLabel: 'Početna',
    eventsLabel: 'Događaji Milano',
    specialLabel: 'Specijalni događaji',
    heroLabels: [
      'Dolazak gostiju ispod kule Torre Branca u JustMe Milano',
      'Večere Silver 60€ i Gold 80€ u zagrejanoj staklenoj verandi',
      'Ponoćna zdravica za VIP Privé stolovima u JustMe Milano',
      'Plesni podijum uz DJ Nazara Radchuka do 05:00 ujutru',
    ],
    extraNativeParagraph:
      'Pod zagrejanom staklenom kupolom arhitekte Itala Rote spajaju se vrhunski italijanski jelovnik od 19:30 i svetski set House, Hip-Hop i Hits hitova gosta večeri DJ Nazara Radchuka za publiku 21+.',
    nativeFaqs: [
      {
        q: 'Kada počinje večera, a kada ulaz sa klupskom kartom 13. januara?',
        a: 'Silver (60€) i Gold (80€) večere počinju u 19:30 sa uključenim ostankom na žurci, dok ulaznica Klub + 1 piće (20€) važi od 23:30 do 05:00.',
      },
      {
        q: 'Da li su voda i vino uključeni u Silver i Gold menije?',
        a: 'Da, oba menija uključuju 1 flašu vode i 1 flašu vina na svake 4 osobe za stolom.',
      },
      {
        q: 'Kako učestvovati u nagradi za zimovanje na planini?',
        a: 'Potreban je elegantan dress code (21+) sa crvenim odevnim komadom ili svetlećim dodatkom; najoriginalniji izgled osvaja nedelju dana u planinskoj rezidenciji 4*.',
      },
    ],
  },
  bs: {
    metaTitle: 'Pravoslavna / Stara Nova Godina 2027 JustMe Milano | 20€',
    metaDescription:
      'Proslava Nove Godine po julijanskom kalendaru 13. januara 2027. u JustMe Milano: DJ Nazar Radchuk, večere Silver 60€ & Gold 80€, klub 20€ na Xceedu.',
    h1: 'Stara Nova Godina 2027 u JustMe Milano: Il ritorno di Cappuccetto Rosso',
    subtitle:
      'Srijeda 13. januar 2027 · 19:30 Gala večera / 23:30 Klub do 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Zvanična tema · Crveni ili svjetleći detalj · Nagrada odmor na planini 4*',
    dateBadge: 'Srijeda 13.01.2027 · 19:30 – 05:00',
    priceBadge: 'Klub 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Elegantan stil sa crvenim ili svjetlećim detaljem',
    leadIntro:
      'U srijedu 13. januara 2027. godine JustMe Milano organizuje vrhunsku zimsku zabavu povodom julijanske Nove Godine ispod tornja Torre Branca u parku Sempione sa svečanim večerama i klubom do zore.',
    xceedCtaLabel: 'Kupi zvanične Xceed karte i večere (od 20€)',
    whatsappCtaLabel: 'Rezerviši VIP Privé sto putem WhatsAppa 24/7',
    clubTierTitle: 'Klub ulaz + 1 piće (od 23:30)',
    silverTierTitle: 'Silver Gala Večera za stolom (od 19:30 + Party)',
    goldTierTitle: 'Gold Morska Gala Večera (od 19:30 + Party)',
    vipTierTitle: 'VIP Privé stolovi i ponuda boca',
    contestTitle: 'Elegantan stil s crvenim/svjetlećim akcentom & nagrada na planini 4*',
    contestPrizeBadge: 'Nagrada: 7 dana u planinskoj rezidenciji sa 4 zvjezdice',
    venueCta: 'JustMe Milano Profil Kluba',
    dec31BannerBadge: '13. januar 2027 · Zvanični Xceed događaj',
    dec31BannerTitle: 'Stara Nova Godina 2027 u JustMe Milano (13.01)',
    dec31BannerDesc:
      'Proslava 13. januara uz DJ Nazara Radchuka: večera Silver 60€, Gold 80€, ulaz Klub 20€ i VIP stolovi.',
    dec31BannerCta: 'Pogledaj 13. januar (od 20€)',
    homeLabel: 'Početna',
    eventsLabel: 'Događaji Milano',
    specialLabel: 'Specijalni događaji',
    heroLabels: [
      'Dolazak gostiju ispod Torre Branca tornja u JustMe Milano',
      'Večere Silver 60€ i Gold 80€ u grijanom staklenom paviljonu',
      'Ponoćna zdravica za VIP Privé stolovima u JustMe Milano',
      'Podij za ples uz DJ Nazara Radchuka do 05:00 ujutro',
    ],
    extraNativeParagraph:
      'Grijani stakleni prostor u parku Sempione spaja svečane talijanske jelovnike od 19:30 s energičnim House, Hip-Hop i Hits nastupom zvijezde večeri DJ Nazara Radchuka.',
    nativeFaqs: [
      {
        q: 'Kad počinju večere a kad ulaz u klub 13. januara 2027.?',
        a: 'Silver (60€) i Gold (80€) počinju u 19:30 i uključuju zabavu do kraja noći; karta Klub + 1 piće (20€) važi od 23:30 do 05:00.',
      },
      {
        q: 'Jesu li voda i vino uključeni u cijenu večera?',
        a: 'Da, oba jelovnika uključuju po 1 bocu vode i 1 bocu vina na svaka 4 gosta.',
      },
      {
        q: 'Kako osvojiti sedmicu dana u planinskoj rezidenciji?',
        a: 'Nosite elegantnu kombinaciju (21+) sa crvenim ili svjetlećim dodatkom; najoriginalniji izgled dobija 7 dana odmora na planini 4*.',
      },
    ],
  },
  mk: {
    metaTitle: 'Стара Нова Година Василица 2027 JustMe Милано | 20€',
    metaDescription:
      'Стара Нова Година и Василица 2027 во JustMe Milano на 13 јануари: DJ Nazar Radchuk, вечери Silver 60€ и Gold 80€, клуб 20€ на Xceed.',
    h1: 'Стара Нова Година Василица 2027 во JustMe Милано: Црвенкапа',
    subtitle:
      'Среда 13 јануари 2027 · 19:30 Гала вечера / 23:30 Клуб до 05:00 · DJ Nazar Radchuk · Parco Sempione, Torre Branca',
    themeTag: 'Официјална тема · Il ritorno di Cappuccetto Rosso · Награда планина 4*',
    dateBadge: 'Среда 13 Јануари 2027 · 19:30 / 05:00',
    priceBadge: 'Клуб 20€ · Silver 60€ · Gold 80€',
    ageDressBadge: '21+ · Елегантен стил со црвен или светлечки детал',
    leadIntro:
      'Во среда 13 јануари 2027 година JustMe Milano ја организира најголемата прослава на Стара Нова Година и Василица во Милано под осветлената кула Torre Branca во Parco Sempione со гала вечери и клуб до 05:00.',
    xceedCtaLabel: 'Купи официјални Xceed билети и вечери (од 20€)',
    whatsappCtaLabel: 'Резервирај VIP Privé маса на WhatsApp 24/7',
    clubTierTitle: 'Клуб влез + 1 пијалак (од 23:30)',
    silverTierTitle: 'Седечка гала вечера Silver (од 19:30 + Забава)',
    goldTierTitle: 'Морска гала вечера Gold (од 19:30 + Забава)',
    vipTierTitle: 'VIP Privé маси и сервис со шишиња',
    contestTitle: 'Црвен или светлечки детал и награда 1 недела на планина 4*',
    contestPrizeBadge: 'Главна награда: 1 недела во планинска резиденција 4*',
    venueCta: 'Водич за клубот JustMe Милано',
    dec31BannerBadge: '13 Јануари 2027 · Официјален Xceed настан',
    dec31BannerTitle: 'Стара Нова Година Василица 2027 во JustMe Милано',
    dec31BannerDesc:
      'Прославете на 13 јануари со DJ Nazar Radchuk: Silver 60€, Gold 80€, Клуб 20€ и VIP маси.',
    dec31BannerCta: 'Погледни Стара Нова Година (од 20€)',
    homeLabel: 'Почетна',
    eventsLabel: 'Настани Милано',
    specialLabel: 'Специјални настани',
    heroLabels: [
      'Зимско пристигнување под Torre Branca во JustMe Milano',
      'Вечери Silver 60€ и Gold 80€ во загреаниот стаклен павилјон',
      'Полноќна здравица на VIP Privé масите во JustMe Milano',
      'Меѓународен подиум со DJ Nazar Radchuk до 05:00 часот',
    ],
    extraNativeParagraph:
      'Под загреаната стаклена купола на Итало Рота се спојуваат италијанската кујна од 19:30 часот и најдобрите House, Hip-Hop и меѓународни хитови од DJ Nazar Radchuk.',
    nativeFaqs: [
      {
        q: 'Во колку часот почнуваат вечерите и влезниците за клуб на 13 јануари?',
        a: 'Вечерите Silver (60€) и Gold (80€) почнуваат во 19:30 со останување на забавата; влезницата Клуб + 1 пијалак (20€) важи од 23:30 до 05:00.',
      },
      {
        q: 'Дали вода и вино се вклучени во менијата Silver и Gold?',
        a: 'Да, двете менија вклучуваат 1 шише вода и 1 шише вино на секои 4 гости.',
      },
      {
        q: 'Како да учествувам за наградата одмор на планина?',
        a: 'Дојдете елегантно облечени (21+) со црвено парче или светлечки моден детаљ; најоригиналниот изглед добива 1 недела во планинска резиденција 4*.',
      },
    ],
  },
};

interface SharedChrome {
  isIt?: boolean;
  quickDateLabel: string;
  quickVenueLabel: string;
  quickMusicLabel: string;
  quickAccessLabel: string;
  quickDressLabel: string;
  quickPriceLabel: string;
  tocHeading: string;
  tocLabels: [string, string, string, string, string, string, string];
  menusHeading: string;
  menusSubheading: string;
  silverLabel: string;
  goldLabel: string;
  beveragesNote: string;
  ticketsHeading: string;
  ticketsSubheading: string;
  vipConciergeNote: string;
  timelineHeading: string;
  timelineSubheading: string;
  timelineTitles: [string, string, string, string, string];
  dressOkTitle: string;
  dressNoTitle: string;
  logisticsHeading: string;
  mapHeading: string;
  faqHeading: string;
  dec31Eyebrow: string;
  dec31Title: string;
  dec31Cta: string;
  courseStarter: string;
  courseFirst: string;
  courseSecond: string;
  courseDessert: string;
}

const SHARED_CHROME_35: Record<LocaleCode, Omit<SharedChrome, 'isIt'>> = {
  en: {
    quickDateLabel: 'Date & Schedule',
    quickVenueLabel: 'Exact Address',
    quickMusicLabel: 'Guest Star & Music',
    quickAccessLabel: 'Age & Door Policy',
    quickDressLabel: 'Theme & Dress Code',
    quickPriceLabel: 'Confirmed Pricing',
    tocHeading: 'Page Index · Orthodox NYE 2027 JustMe Milan',
    tocLabels: [
      '1. Overview & Night Schedule',
      '2. Silver €60 & Gold €80 Gala Menus',
      '3. Xceed Passes (€20+) & VIP Tables',
      '4. Best Look Contest & Dress Code',
      '5. 100% Prepayment Protocol',
      '6. Metro Access & Map · Torre Branca',
      '7. Frequently Asked Questions (12)',
    ],
    menusHeading: 'Official Gala Menus · Silver €60 & Gold Seafood €80 (19:30)',
    menusSubheading: 'Seated fine dining inside the heated winter pavilion with full club admission included',
    silverLabel: 'Silver Menu · €60',
    goldLabel: 'Gold Seafood Menu · €80',
    beveragesNote: 'Beverage allocation: 1 bottle of water & 1 bottle of wine per 4 guests + full club entry',
    ticketsHeading: 'Official Tickets (Xceed 251019) & VIP Privé Tables',
    ticketsSubheading: 'Book €20 Club passes, €60 Silver or €80 Gold dinners on Xceed or reserve VIP bottles 24/7',
    vipConciergeNote: 'VIP Privé dancefloor and DJ console tables quoted live 24/7 via WhatsApp +39 351 912 7047.',
    timelineHeading: 'Complete Night Timeline · Wed 13 – Thu 14 Jan 2027',
    timelineSubheading: 'From 19:30 seated Italian gastronomy to the Julian midnight toast and 05:00 closing set',
    timelineTitles: [
      '19:30 · Seated Dinner Arrival (Silver €60 & Gold €80)',
      '22:45 · Late Dining Service & Glass Pavilion Lighting Transition',
      '23:30 · Club + 1 Drink Ticket Entry Opens (€20 Xceed Pass)',
      '00:00 · Orthodox New Year Countdown & DJ Nazar Radchuk Showcase',
      '01:30–05:00 · Best Look Contest Award & Late-Night Clubbing',
    ],
    dressOkTitle: 'Recommended Attire',
    dressNoTitle: 'Not Permitted (21+ Selection)',
    logisticsHeading: 'Getting to JustMe Milano · Metro & Parco Sempione Access',
    mapHeading: 'GPS Coordinates & Map · Viale Luigi Camoens 2',
    faqHeading: 'Frequently Asked Questions · Orthodox New Year JustMe 2027',
    dec31Eyebrow: '31 Dec 2026 · New Year’s Eve',
    dec31Title: 'Also Looking for December 31st NYE at JustMe Milan?',
    dec31Cta: 'See Dec 31st NYE JustMe',
    courseStarter: 'Starters / Antipasto',
    courseFirst: 'First Course / Primo',
    courseSecond: 'Main Course / Secondo',
    courseDessert: 'Dessert / Dolce',
  },
  it: {
    quickDateLabel: 'Data e Orari',
    quickVenueLabel: 'Indirizzo Esatto',
    quickMusicLabel: 'Guest Star & Musica',
    quickAccessLabel: 'Età e Selezione',
    quickDressLabel: 'Tema e Dress Code',
    quickPriceLabel: 'Tariffe Ufficiali',
    tocHeading: 'Indice della Guida · Capodanno Ortodosso JustMe 2027',
    tocLabels: [
      '1. Panoramica & Orari della Notte',
      '2. Menu Ufficiali Silver 60€ & Gold 80€',
      '3. Biglietti Xceed & Tavoli VIP Privé',
      '4. Concorso Cappuccetto Rosso & Dress Code',
      '5. Termini di Pagamento (100% Prepagato)',
      '6. Come Arrivare & Mappa Torre Branca',
      '7. Domande Frequenti (12 FAQ)',
    ],
    menusHeading: 'Menu Ufficiali di Gala · Silver 60€ & Gold Pesce 80€ (19:30)',
    menusSubheading: 'Cene servite al tavolo nel padiglione invernale riscaldato con party incluso',
    silverLabel: 'Menu Silver · Cena + Party',
    goldLabel: 'Menu Gold · Cena di Mare + Party',
    beveragesNote: 'Incluso nel servizio al tavolo: 1 bottiglia di acqua & 1 bottiglia di vino ogni 4 ospiti + ingresso festa',
    ticketsHeading: 'Prezzi Ufficiali, Pass Xceed & Tavoli VIP Privé',
    ticketsSubheading: 'Canale ufficiale Nightlife Milan su Xceed (251019) e prenotazione diretta Privé su WhatsApp',
    vipConciergeNote: 'Per Tavoli VIP Privé in pista o console: quotazione e mappa su conferma immediata con il Concierge WhatsApp +39 351 912 7047 (24/7).',
    timelineHeading: 'Scaletta Ufficiale della Serata · 13–14 Gennaio 2027',
    timelineSubheading: 'Dalle cene servite alle 19:30 fino al brindisi ortodosso e alla chiusura delle 05:00',
    timelineTitles: [
      '19:30 · Accoglienza Cene Servite Silver & Gold',
      '22:45 · Chiusura Servizio Cena & Preparazione Pista',
      '23:30 · Apertura Ingressi Club + 1 Drink (Pass Xceed 20€)',
      '00:00 · Brindisi Capodanno Ortodosso & DJ Nazar Radchuk',
      '01:30–05:00 · Premiazione Look Cappuccetto Rosso & Clubbing',
    ],
    dressOkTitle: 'Consigliato (Ammesso con stile)',
    dressNoTitle: 'Non ammesso alla selezione 21+',
    logisticsHeading: 'Logistica, Metro e Accesso al JustMe Milano (Parco Sempione)',
    mapHeading: 'Mappa, Coordinate GPS e Indicazioni · Viale Luigi Camoens 2',
    faqHeading: 'Domande Frequenti · Capodanno Ortodosso JustMe Milano 2027',
    dec31Eyebrow: '31 Dicembre 2026 · San Silvestro',
    dec31Title: 'Cerchi anche Capodanno 31 Dicembre al JustMe Milano?',
    dec31Cta: 'Vedi Capodanno 31 Dicembre JustMe',
    courseStarter: 'Antipasto',
    courseFirst: 'Primo',
    courseSecond: 'Secondo',
    courseDessert: 'Dessert',
  },
  es: {
    quickDateLabel: 'Fecha y Horarios',
    quickVenueLabel: 'Dirección Exacta',
    quickMusicLabel: 'DJ Invitado y Música',
    quickAccessLabel: 'Edad y Acceso',
    quickDressLabel: 'Temática y Etiqueta',
    quickPriceLabel: 'Tarifas Oficiales',
    tocHeading: 'Índice de la Guía · Año Nuevo Ortodoxo JustMe 2027',
    tocLabels: [
      '1. Resumen y Horarios de la Noche',
      '2. Menús de Gala Silver 60€ y Gold 80€',
      '3. Entradas Xceed (20€) y Mesas VIP',
      '4. Concurso de Moda y Vestimenta',
      '5. Condiciones de Pago (100% Anticipado)',
      '6. Metro y Mapa · Torre Branca',
      '7. Preguntas Frecuentes (12 FAQ)',
    ],
    menusHeading: 'Menús Oficiales de Gala · Silver 60€ y Gold Marisco 80€ (19:30)',
    menusSubheading: 'Cena servida en mesa bajo el pabellón climatizado con acceso completo a la fiesta',
    silverLabel: 'Menú Silver · 60€',
    goldLabel: 'Menú Gold Marisco · 80€',
    beveragesNote: 'Incluido en mesa: 1 botella de agua y 1 botella de vino cada 4 comensales + entrada al club',
    ticketsHeading: 'Entradas Oficiales (Xceed 251019) y Mesas VIP Privé',
    ticketsSubheading: 'Compra entradas Club 20€ o cenas 60€/80€ en Xceed y reserva VIP por WhatsApp 24/7',
    vipConciergeNote: 'Mesas VIP Privé y zona DJ con cotización directa 24/7 por WhatsApp +39 351 912 7047.',
    timelineHeading: 'Programa Completo de la Noche · 13–14 Enero 2027',
    timelineSubheading: 'Desde las cenas servidas a las 19:30 hasta el brindis juliano y el cierre a las 05:00',
    timelineTitles: [
      '19:30 · Recepción Cenas de Gala Silver y Gold',
      '22:45 · Cierre del Servicio y Transición de Luces',
      '23:30 · Apertura Club + 1 Consumición (20€ Xceed)',
      '00:00 · Brindis Ortodoxo y Sesión DJ Nazar Radchuk',
      '01:30–05:00 · Premio al Mejor Look y Pista hasta el Amanecer',
    ],
    dressOkTitle: 'Atuendo Recomendado',
    dressNoTitle: 'No Permitido (Selección 21+)',
    logisticsHeading: 'Cómo Llegar a JustMe Milano · Metro y Parco Sempione',
    mapHeading: 'Coordenadas GPS y Mapa · Viale Luigi Camoens 2',
    faqHeading: 'Preguntas Frecuentes · Año Nuevo Ortodoxo JustMe 2027',
    dec31Eyebrow: '31 Dic 2026 · Nochevieja',
    dec31Title: '¿Buscas también el 31 de Diciembre en JustMe Milano?',
    dec31Cta: 'Ver Nochevieja 31 Dic JustMe',
    courseStarter: 'Entrantes / Antipasto',
    courseFirst: 'Primer Plato / Primo',
    courseSecond: 'Plato Principal / Secondo',
    courseDessert: 'Postre / Dolce',
  },
  fr: {
    quickDateLabel: 'Date et Horaires',
    quickVenueLabel: 'Adresse Exacte',
    quickMusicLabel: 'DJ Invité et Musique',
    quickAccessLabel: 'Âge et Sélection',
    quickDressLabel: 'Thème et Tenue',
    quickPriceLabel: 'Tarifs Officiels',
    tocHeading: 'Sommaire du Guide · Nouvel An Orthodoxe JustMe 2027',
    tocLabels: [
      '1. Aperçu et Horaires de la Nuit',
      '2. Menus de Gala Silver 60€ et Gold 80€',
      '3. Billets Xceed (20€) et Tables VIP',
      '4. Concours de Look et Code Vestimentaire',
      '5. Modalités de Paiement (100% Prépaiement)',
      '6. Accès Métro et Carte · Torre Branca',
      '7. Foire aux Questions (12 FAQ)',
    ],
    menusHeading: 'Menus de Gala Officiels · Silver 60€ & Gold Fruits de Mer 80€ (19:30)',
    menusSubheading: 'Dîners servis à table sous la coupole hivernale chauffée avec soirée club incluse',
    silverLabel: 'Menu Silver · 60€',
    goldLabel: 'Menu Gold Mer · 80€',
    beveragesNote: 'Inclus au dîner : 1 bouteille d’eau et 1 bouteille de vin pour 4 convives + entrée club',
    ticketsHeading: 'Billetterie Officielle (Xceed 251019) & Tables VIP Privé',
    ticketsSubheading: 'Réservez votre billet Club 20€, Dîner 60€/80€ sur Xceed ou table VIP via WhatsApp 24/7',
    vipConciergeNote: 'Tables VIP Privé piste et cabine DJ sur devis instantané 24/7 par WhatsApp +39 351 912 7047.',
    timelineHeading: 'Programme Détaillé de la Soirée · 13–14 Janvier 2027',
    timelineSubheading: 'Des dîners gastronomiques à 19:30 au toast du calendrier julien jusqu’à 05:00',
    timelineTitles: [
      '19:30 · Accueil des Dîners de Gala Silver et Gold',
      '22:45 · Transition Musicale du Pavillon Chauffé',
      '23:30 · Entrée Club + 1 Consommation (Pass Xceed 20€)',
      '00:00 · Compte à Rebours Orthodoxe & DJ Nazar Radchuk',
      '01:30–05:00 · Remise du Prix Montagne 4* & Clubbing',
    ],
    dressOkTitle: 'Tenue Recommandée',
    dressNoTitle: 'Refusé à l’Entrée (21+)',
    logisticsHeading: 'Accès à JustMe Milano · Métro et Parco Sempione',
    mapHeading: 'Coordonnées GPS et Carte · Viale Luigi Camoens 2',
    faqHeading: 'Questions Fréquentes · Nouvel An Orthodoxe JustMe 2027',
    dec31Eyebrow: '31 Décembre 2026 · Saint-Sylvestre',
    dec31Title: 'Vous cherchez aussi le 31 Décembre au JustMe Milano ?',
    dec31Cta: 'Voir 31 Décembre JustMe',
    courseStarter: 'Entrées / Antipasto',
    courseFirst: 'Premier Plat / Primo',
    courseSecond: 'Plat Principal / Secondo',
    courseDessert: 'Dessert / Dolce',
  },
  de: {
    quickDateLabel: 'Datum & Zeiten',
    quickVenueLabel: 'Genaue Adresse',
    quickMusicLabel: 'Guest Star & Musik',
    quickAccessLabel: 'Alter & Einlass',
    quickDressLabel: 'Motto & Dresscode',
    quickPriceLabel: 'Offizielle Preise',
    tocHeading: 'Seitenverzeichnis · Orthodoxes Neujahr JustMe 2027',
    tocLabels: [
      '1. Überblick & Nachtprogramm',
      '2. Gala-Menüs Silver 60€ & Gold 80€',
      '3. Xceed Tickets (20€) & VIP-Tische',
      '4. Look-Wettbewerb & Dresscode',
      '5. Zahlungsbedingungen (100% Vorkasse)',
      '6. U-Bahn & Karte · Torre Branca',
      '7. Häufig Gestellte Fragen (12 FAQ)',
    ],
    menusHeading: 'Offizielle Gala-Menüs · Silver 60€ & Gold Seafood 80€ (19:30)',
    menusSubheading: 'Serviertes Dinner im beheizten Winterpavillon inklusive vollem Club-Zutritt',
    silverLabel: 'Silver Menü · 60€',
    goldLabel: 'Gold Meeresfrüchte Menü · 80€',
    beveragesNote: 'Inklusive am Tisch: 1 Flasche Wasser & 1 Flasche Wein pro 4 Gäste + Club-Eintritt',
    ticketsHeading: 'Offizielle Tickets (Xceed 251019) & VIP Privé Tische',
    ticketsSubheading: 'Tickets (Club 20€, Silver 60€, Gold 80€) direkt über Xceed oder VIP-Tisch per WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé Tische an Tanzfläche & DJ-Pult rund um die Uhr über WhatsApp +39 351 912 7047.',
    timelineHeading: 'Abendablauf · Mittwoch 13. – Donnerstag 14. Januar 2027',
    timelineSubheading: 'Vom Gala-Dinner um 19:30 bis zum julianischen Mitternachtstoast und Finale um 05:00',
    timelineTitles: [
      '19:30 · Einlass Gala-Dinner Silver & Gold',
      '22:45 · Ende des Dinner-Service & Lichtwechsel',
      '23:30 · Club-Einlass + 1 Drink (20€ Xceed Pass)',
      '00:00 · Orthodoxer Countdown & DJ Nazar Radchuk',
      '01:30–05:00 · Prämierung Bergurlaub 4* & Clubbing',
    ],
    dressOkTitle: 'Empfohlene Kleidung',
    dressNoTitle: 'Nicht Gestattet (21+ Selektion)',
    logisticsHeading: 'Anfahrt zu JustMe Milano · Metro & Parco Sempione',
    mapHeading: 'GPS-Daten & Karte · Viale Luigi Camoens 2',
    faqHeading: 'Häufig Gestellte Fragen · Orthodoxes Neujahr JustMe 2027',
    dec31Eyebrow: '31. Dez 2026 · Silvester',
    dec31Title: 'Suchen Sie auch Silvester am 31. Dezember im JustMe Milano?',
    dec31Cta: 'Silvester 31. Dez JustMe ansehen',
    courseStarter: 'Vorspeisen / Antipasto',
    courseFirst: 'Erster Gang / Primo',
    courseSecond: 'Hauptgang / Secondo',
    courseDessert: 'Dessert / Dolce',
  },
  pt: {
    quickDateLabel: 'Data e Horários',
    quickVenueLabel: 'Endereço Exato',
    quickMusicLabel: 'DJ Convidado e Música',
    quickAccessLabel: 'Idade e Seleção',
    quickDressLabel: 'Tema e Dress Code',
    quickPriceLabel: 'Valores Oficiais',
    tocHeading: 'Índice do Guia · Ano Novo Ortodoxo JustMe 2027',
    tocLabels: [
      '1. Visão Geral e Horários da Noite',
      '2. Menus de Gala Silver 60€ e Gold 80€',
      '3. Ingressos Xceed (20€) e Mesas VIP',
      '4. Concurso de Melhor Look e Traje',
      '5. Termos de Pagamento (100% Antecipado)',
      '6. Metrô e Mapa · Torre Branca',
      '7. Perguntas Frequentes (12 FAQ)',
    ],
    menusHeading: 'Menus Oficiais de Gala · Silver 60€ e Gold Frutos do Mar 80€ (19:30)',
    menusSubheading: 'Jantares servidos à mesa no pavilhão aquecido com entrada na festa incluída',
    silverLabel: 'Menu Silver · 60€',
    goldLabel: 'Menu Gold Frutos do Mar · 80€',
    beveragesNote: 'Incluído à mesa: 1 garrafa de água e 1 de vinho a cada 4 convidados + acesso ao club',
    ticketsHeading: 'Ingressos Oficiais (Xceed 251019) e Mesas VIP Privé',
    ticketsSubheading: 'Passes Club 20€ e jantares 60€/80€ no Xceed ou reservas VIP 24/7 via WhatsApp',
    vipConciergeNote: 'Mesas VIP Privé com cotação direta 24/7 pelo WhatsApp +39 351 912 7047.',
    timelineHeading: 'Programação da Noite · 13–14 de Janeiro de 2027',
    timelineSubheading: 'Dos jantares às 19:30 ao brinde juliano da meia-noite até as 05:00 da manhã',
    timelineTitles: [
      '19:30 · Recepção para Jantares Silver e Gold',
      '22:45 · Transição do Pavilhão para a Pista',
      '23:30 · Abertura Club + 1 Drink (Passe Xceed 20€)',
      '00:00 · Contagem Ortodoxa e DJ Nazar Radchuk',
      '01:30–05:00 · Prêmio Férias na Montanha 4* e Festa',
    ],
    dressOkTitle: 'Traje Recomendado',
    dressNoTitle: 'Não Permitido (Seleção 21+)',
    logisticsHeading: 'Como Chegar ao JustMe Milano · Metrô e Parco Sempione',
    mapHeading: 'Coordenadas GPS e Mapa · Viale Luigi Camoens 2',
    faqHeading: 'Perguntas Frequentes · Ano Novo Ortodoxo JustMe 2027',
    dec31Eyebrow: '31 Dez 2026 · Réveillon',
    dec31Title: 'Procurando também o Réveillon de 31 de Dezembro no JustMe Milano?',
    dec31Cta: 'Ver 31 de Dezembro JustMe',
    courseStarter: 'Entradas / Antipasto',
    courseFirst: 'Primeiro Prato / Primo',
    courseSecond: 'Prato Principal / Secondo',
    courseDessert: 'Sobremesa / Dolce',
  },
  nl: {
    quickDateLabel: 'Datum en Tijden',
    quickVenueLabel: 'Exact Adres',
    quickMusicLabel: 'Guest Star & Muziek',
    quickAccessLabel: 'Leeftijd & Deurbeleid',
    quickDressLabel: 'Thema & Dresscode',
    quickPriceLabel: 'Officiële Prijzen',
    tocHeading: 'Inhoudsopgave · Orthodox Nieuwjaar JustMe 2027',
    tocLabels: [
      '1. Overzicht en Avondprogramma',
      '2. Galamenu’s Silver 60€ en Gold 80€',
      '3. Xceed Tickets (20€) en VIP-tafels',
      '4. Look-wedstrijd & Dresscode',
      '5. Betalingsvoorwaarden (100% Vooraf)',
      '6. Metro & Kaart · Torre Branca',
      '7. Veelgestelde Vragen (12 FAQ)',
    ],
    menusHeading: 'Officiële Galamenu’s · Silver 60€ & Gold Zeevruchten 80€ (19:30)',
    menusSubheading: 'Diner aan tafel in het verwarmde winterpaviljoen inclusief toegang tot het feest',
    silverLabel: 'Silver Menu · 60€',
    goldLabel: 'Gold Zeevruchten Menu · 80€',
    beveragesNote: 'Inbegrepen aan tafel: 1 fles water en 1 fles wijn per 4 gasten + volledige clubtoegang',
    ticketsHeading: 'Officiële Tickets (Xceed 251019) & VIP Privé Tafels',
    ticketsSubheading: 'Boek Club 20€, Silver 60€ of Gold 80€ via Xceed of reserveer VIP 24/7 via WhatsApp',
    vipConciergeNote: 'VIP Privé tafels aan de dansvloer en DJ-booth 24/7 via WhatsApp +39 351 912 7047.',
    timelineHeading: 'Volledig Tijdschema · 13–14 Januari 2027',
    timelineSubheading: 'Van het galadiner om 19:30 tot het orthodoxe middernachtsmoment en sluiting om 05:00',
    timelineTitles: [
      '19:30 · Ontvangst Diners Silver & Gold',
      '22:45 · Einde Dinerservice & Clubverlichting',
      '23:30 · Clubtoegang + 1 Drankje (20€ Xceed)',
      '00:00 · Orthodoxe Toost & DJ Nazar Radchuk',
      '01:30–05:00 · Prijsuitreiking 4* Bergvakantie & Club',
    ],
    dressOkTitle: 'Aanbevolen Kleding',
    dressNoTitle: 'Niet Toegestaan (21+)',
    logisticsHeading: 'Route naar JustMe Milano · Metro & Parco Sempione',
    mapHeading: 'GPS-coördinaten & Kaart · Viale Luigi Camoens 2',
    faqHeading: 'Veelgestelde Vragen · Orthodox Nieuwjaar JustMe 2027',
    dec31Eyebrow: '31 Dec 2026 · Oud & Nieuw',
    dec31Title: 'Zoekt u ook Oud & Nieuw op 31 December bij JustMe Milano?',
    dec31Cta: 'Bekijk 31 December JustMe',
    courseStarter: 'Voorgerechten / Antipasto',
    courseFirst: 'Tussengerecht / Primo',
    courseSecond: 'Hoofdgerecht / Secondo',
    courseDessert: 'Nagerecht / Dolce',
  },
  ru: {
    quickDateLabel: 'Дата и время',
    quickVenueLabel: 'Адрес клуба',
    quickMusicLabel: 'Артист и музыка',
    quickAccessLabel: 'Возраст и вход',
    quickDressLabel: 'Дресс-код и тема',
    quickPriceLabel: 'Официальные цены',
    tocHeading: 'Содержание страницы · Старый Новый Год JustMe 2027',
    tocLabels: [
      '1. Программа ночи 13 января',
      '2. Меню Silver 60€ и Gold 80€',
      '3. Билеты Xceed (20€) и VIP-столы',
      '4. Дресс-код и конкурс в горы 4*',
      '5. Условия оплаты (100% предоплата)',
      '6. Как добраться · JustMe Torre Branca',
      '7. Частые вопросы (12 FAQ)',
    ],
    menusHeading: 'Официальное гала-меню · Silver 60€ и Gold Морепродукты 80€ (19:30)',
    menusSubheading: 'Итальянский ужин за столиками в теплом стеклянном павильоне + вход на вечеринку',
    silverLabel: 'Меню Silver · 60€',
    goldLabel: 'Меню Gold Морепродукты · 80€',
    beveragesNote: '1 бутылка воды + 1 бутылка вина на каждые 4 гостя · Вечеринка до 05:00 включена',
    ticketsHeading: 'Официальные билеты Xceed (251019) и VIP Privé столы',
    ticketsSubheading: 'Покупка на канале Nightlife Milan (Xceed) и бронь VIP через WhatsApp +39 351 912 7047',
    vipConciergeNote: 'VIP Privé у танцпола и пульта DJ: расчёт и схема 24/7 через WhatsApp +39 351 912 7047.',
    timelineHeading: 'Тайминг ночи · Среда 13 – Четверг 14 января 2027',
    timelineSubheading: 'JustMe Milano · Viale Luigi Camoens 2 · Parco Sempione',
    timelineTitles: [
      '19:30 · Сбор на гала-ужины Silver и Gold',
      '22:45 · Завершение ужина и переход к шоу',
      '23:30 · Вход по билетам Клуб + 1 Drink (20€)',
      '00:00 · Тост и сет DJ Nazar Radchuk',
      '01:30–05:00 · Итоги конкурса и танцпол до утра',
    ],
    dressOkTitle: 'Рекомендуемый стиль',
    dressNoTitle: 'Ограничения на входе 21+',
    logisticsHeading: 'Как добраться в JustMe Milano · Метро и Парко Семпионе',
    mapHeading: 'Карта и координаты · Viale Luigi Camoens 2',
    faqHeading: 'Частые вопросы (FAQ) · Старый Новый Год JustMe 2027',
    dec31Eyebrow: '31 Декабря 2026 · Новый Год',
    dec31Title: 'Ищете также новогоднюю ночь 31 декабря в JustMe Milano?',
    dec31Cta: 'Смотреть 31 декабря JustMe',
    courseStarter: 'Закуска / Antipasto',
    courseFirst: 'Первое блюдо / Primo',
    courseSecond: 'Основное блюдо / Secondo',
    courseDessert: 'Десерт / Dessert',
  },
  tr: {
    quickDateLabel: 'Tarih ve Saat',
    quickVenueLabel: 'Tam Adres',
    quickMusicLabel: 'DJ ve Müzik',
    quickAccessLabel: 'Ya\u015f ve Kap\u0131 Politikas\u0131',
    quickDressLabel: 'Tema ve K\u0131yafet',
    quickPriceLabel: 'Resmi Fiyatlar',
    tocHeading: 'Rehber \u0130\u00e7eri\u011fi · Ortodoks Y\u0131lba\u015f\u0131 JustMe 2027',
    tocLabels: [
      '1. Gece Program\u0131 ve Saatler',
      '2. Gala Menüleri Silver 60€ ve Gold 80€',
      '3. Xceed Biletleri (20€) ve VIP Masalar',
      '4. En \u015e\u0131k Görünüm Yar\u0131\u015fmas\u0131',
      '5. Ödeme Ko\u015fullar\u0131 (%100 Ön Ödeme)',
      '6. Ula\u015f\u0131m ve Harita · Torre Branca',
      '7. S\u0131k\u00e7a Sorulan Sorular (12 FAQ)',
    ],
    menusHeading: 'Resmi Gala Menüleri · Silver 60€ ve Gold Deniz Ürünleri 80€ (19:30)',
    menusSubheading: 'Is\u0131tmal\u0131 k\u0131\u015f pavilyonunda masada servis yemek ve gece partisi dahil',
    silverLabel: 'Silver Menü · 60€',
    goldLabel: 'Gold Deniz Ürünleri Menü · 80€',
    beveragesNote: 'Her 4 misafire 1 \u015fi\u015fe su ve 1 \u015fi\u015fe \u015farap + sabaha kadar parti giri\u015fi dahildir',
    ticketsHeading: 'Resmi Biletler (Xceed 251019) ve VIP Privé Masalar',
    ticketsSubheading: 'Kulüp bileti 20€ veya ak\u015fam yeme\u011fi 60€/80€ Xceed üzerinde; VIP rezervasyon WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé masa teklifleri 7/24 WhatsApp +39 351 912 7047 üzerinden sunulur.',
    timelineHeading: 'Gece Ak\u0131\u015f\u0131 · 13–14 Ocak 2027',
    timelineSubheading: '19:30 gala yeme\u011finden gece yar\u0131s\u0131 kadehine ve 05:00 kapan\u0131\u015f\u0131na',
    timelineTitles: [
      '19:30 · Silver ve Gold Gala Yeme\u011fi Kar\u015f\u0131lama',
      '22:45 · Yemek Servisi Biti\u015fi ve I\u015f\u0131k Ge\u00e7i\u015fi',
      '23:30 · Kulüp + 1 \u0130\u00e7ecek Giri\u015fi (20€ Xceed)',
      '00:00 · Ortodoks Yeni Y\u0131l ve DJ Nazar Radchuk',
      '01:30–05:00 · 4* Da\u011f Tatili Ödülü ve Kulüp Partisi',
    ],
    dressOkTitle: 'Önerilen K\u0131yafet',
    dressNoTitle: '\u0130zin Verilmeyenler (21+)',
    logisticsHeading: 'JustMe Milano Ula\u015f\u0131m · Metro ve Parco Sempione',
    mapHeading: 'GPS Konumu ve Harita · Viale Luigi Camoens 2',
    faqHeading: 'S\u0131k\u00e7a Sorulan Sorular · Ortodoks Y\u0131lba\u015f\u0131 JustMe 2027',
    dec31Eyebrow: '31 Aral\u0131k 2026 · Y\u0131lba\u015f\u0131',
    dec31Title: 'JustMe Milano’da 31 Aral\u0131k Y\u0131lba\u015f\u0131 gecesini de mi ar\u0131yorsunuz?',
    dec31Cta: '31 Aral\u0131k JustMe’yi Gör',
    courseStarter: 'Ba\u015flang\u0131\u00e7lar / Antipasto',
    courseFirst: '\u0130lk Tabak / Primo',
    courseSecond: 'Ana Yemek / Secondo',
    courseDessert: 'Tatl\u0131 / Dolce',
  },
  zh: {
    quickDateLabel: '日期 与 时间',
    quickVenueLabel: '场馆 地址',
    quickMusicLabel: '特邀 DJ 与 音乐',
    quickAccessLabel: '年龄 与 入场',
    quickDressLabel: '主题 与 着装',
    quickPriceLabel: '官方 票价',
    tocHeading: '页面 导航 · JustMe 米兰 2027 东正教 新年',
    tocLabels: [
      '1. 活动 概览 与 夜晚 时间表',
      '2. Silver 60€ 与 Gold 80€ 官方 晚宴 菜单',
      '3. Xceed 官方 门票 (20€) 与 VIP 卡座',
      '4. 最佳 造型 大奖 与 着装 要求',
      '5. 100% 预付款 条款 与 确认 流程',
      '6. 交通 指南 与 地图 · Torre Branca',
      '7. 常见 问题 解答 (12 FAQ)',
    ],
    menusHeading: '官方 晚宴 菜单 · Silver 60€ 与 Gold 海鲜 晚宴 80€ (19:30)',
    menusSubheading: '在 全暖 玻璃 穹顶 餐厅 内 享 意式 桌面 晚宴，费用 含 整晚 派对 通行证',
    silverLabel: 'Silver 晚宴 套餐 · 60€',
    goldLabel: 'Gold 海鲜 晚宴 套餐 · 80€',
    beveragesNote: '每 4 位 宾客 含 1 瓶 矿泉水 与 1 瓶 精选 葡萄酒 + 整晚 派对 入场',
    ticketsHeading: '官方 门票 (Xceed 251019) 与 VIP Privé 尊享 卡座',
    ticketsSubheading: '通过 Nightlife Milan 官方 Xceed 渠道 购票 (20€/60€/80€) 或 24/7 WhatsApp 预订 VIP',
    vipConciergeNote: 'VIP Privé 舞池 及 DJ 台 卡座 报价 请 24/7 联系 WhatsApp +39 351 912 7047。',
    timelineHeading: '整晚 活动 时间轴 · 2027年 1月 13日 – 14日',
    timelineSubheading: '从 19:30 意式 晚宴 到 儒略历 午夜 祝酒 及 05:00 通宵 狂欢',
    timelineTitles: [
      '19:30 · Silver 与 Gold 晚宴 宾客 签到 入席',
      '22:45 · 晚宴 收尾 与 玻璃 穹顶 灯光 切换',
      '23:30 · 派对 门票 + 1 杯 饮品 通道 开启 (20€ Xceed)',
      '00:00 · 东正教 新年 零点 倒计时 与 DJ Nazar Radchuk',
      '01:30–05:00 · 4 星级 山地 度假 大奖 颁奖 与 舞池',
    ],
    dressOkTitle: '推荐 优雅 穿搭',
    dressNoTitle: '禁止 入场 服饰 (21+)',
    logisticsHeading: '交通 与 抵达 指南 · JustMe Milano 地铁 与 森皮奥内 公园',
    mapHeading: 'GPS 定位 与 地图 · Viale Luigi Camoens 2',
    faqHeading: '常见 问题 (FAQ) · JustMe 米兰 2027 东正教 新年',
    dec31Eyebrow: '2026年 12月 31日 · 跨年夜',
    dec31Title: '还想 查看 12月 31日 JustMe 米兰 跨年 派对 吗？',
    dec31Cta: '查看 12月 31日 JustMe',
    courseStarter: '前菜 / Antipasto',
    courseFirst: '头盘 / Primo',
    courseSecond: '主菜 / Secondo',
    courseDessert: '甜点 / Dolce',
  },
  ar: {
    quickDateLabel: 'التاريخ والمواعيد',
    quickVenueLabel: 'العنوان الدقيق',
    quickMusicLabel: 'النجم الضيف والموسيقى',
    quickAccessLabel: 'العمر والدخول',
    quickDressLabel: 'الزي والموضوع',
    quickPriceLabel: 'الأسعار الرسمية',
    tocHeading: 'فهرس الدليل · رأس السنة الأرثوذكسية JustMe 2027',
    tocLabels: [
      '1. نظرة عامة وجدول السهرة',
      '2. قوائم العشاء Silver 60€ و Gold 80€',
      '3. تذاكر Xceed (20€) وطاولات VIP',
      '4. مسابقة أجمل إطلالة وقواعد اللباس',
      '5. شروط الدفع المسبق (100%)',
      '6. المترو والخريطة · Torre Branca',
      '7. الأسئلة الشائعة (12 سؤال)',
    ],
    menusHeading: 'قوائم العشاء الرسمية · Silver 60€ و Gold المأكولات البحرية 80€ (19:30)',
    menusSubheading: 'عشاء فاخر في الجناح الزجاجي المدفأ شامل دخول الحفلة بالكامل حتى 05:00',
    silverLabel: 'قائمة Silver · 60€',
    goldLabel: 'قائمة Gold البحرية · 80€',
    beveragesNote: 'مشمول على الطاولة: زجاجة مياه وزجاجة نبيذ لكل 4 ضيوف + دخول النادي',
    ticketsHeading: 'التذاكر الرسمية (Xceed 251019) وطاولات VIP Privé',
    ticketsSubheading: 'احجز تذكرة النادي 20€ أو العشاء 60€/80€ عبر Xceed أو طاولات VIP على واتساب 24/7',
    vipConciergeNote: 'أسعار طاولات VIP Privé متوفرة مباشرة على مدار الساعة عبر واتساب +39 351 912 7047.',
    timelineHeading: 'جدول السهرة الكامل · 13–14 يناير 2027',
    timelineSubheading: 'من عشاء الساعة 19:30 حتى نخب منتصف الليل والحفل مع DJ Nazar Radchuk',
    timelineTitles: [
      '19:30 · استقبال ضيوف عشاء Silver و Gold',
      '22:45 · تحول إضاءة الجناح الزجاجي للاستعراض',
      '23:30 · دخول النادي + مشروب واحد (تذكرة 20€)',
      '00:00 · العد التنازلي الأرثوذكسي وعرض DJ Nazar Radchuk',
      '01:30–05:00 · تتويج جائزة 4 نجوم والسهر حتى الفجر',
    ],
    dressOkTitle: 'الإطلالة الموصى بها',
    dressNoTitle: 'غير مسموح عند الباب (21+)',
    logisticsHeading: 'كيفية الوصول إلى JustMe Milano · المترو وحديقة سيمبيوني',
    mapHeading: 'الإحداثيات والخريطة · Viale Luigi Camoens 2',
    faqHeading: 'الأسئلة الشائعة · رأس السنة الأرثوذكسية JustMe 2027',
    dec31Eyebrow: '31 ديسمبر 2026 · ليلة رأس السنة',
    dec31Title: 'هل تبحث أيضاً عن سهرة 31 ديسمبر في JustMe Milano؟',
    dec31Cta: 'عرض سهرة 31 ديسمبر JustMe',
    courseStarter: 'المقبلات / Antipasto',
    courseFirst: 'الطبق الأول / Primo',
    courseSecond: 'الطبق الرئيسي / Secondo',
    courseDessert: 'التحلية / Dolce',
  },
  bg: {
    quickDateLabel: 'Дата и час',
    quickVenueLabel: 'Точен адрес',
    quickMusicLabel: 'Гост DJ и музика',
    quickAccessLabel: 'Възраст и вход',
    quickDressLabel: 'Тема и дрескод',
    quickPriceLabel: 'Официални цени',
    tocHeading: 'Съдържание · Стара Нова Година JustMe 2027',
    tocLabels: [
      '1. Програма на нощта 13 януари',
      '2. Менюта Silver 60€ и Gold 80€',
      '3. Билети Xceed (20€) и VIP маси',
      '4. Дрескод и конкурс 4* планина',
      '5. Условия за плащане (100%)',
      '6. Метро и карта · Torre Branca',
      '7. Често задавани въпроси (12 FAQ)',
    ],
    menusHeading: 'Официални гала менюта · Silver 60€ и Gold Морски дарове 80€ (19:30)',
    menusSubheading: 'Сервирана вечеря в отопляемия стъклен павилион с включено парти до 05:00',
    silverLabel: 'Меню Silver · 60€',
    goldLabel: 'Меню Gold Морски дарове · 80€',
    beveragesNote: '1 бутилка вода + 1 бутилка вино на всеки 4 гости · Вход за клуба включен',
    ticketsHeading: 'Официални билети (Xceed 251019) и VIP Privé маси',
    ticketsSubheading: 'Официален канал Nightlife Milan (Xceed) и резервации през WhatsApp +39 351 912 7047',
    vipConciergeNote: 'VIP Privé маси на дансинга и до пулта: директна оферта 24/7 в WhatsApp +39 351 912 7047.',
    timelineHeading: 'Пълна програма на вечерта · 13–14 януари 2027',
    timelineSubheading: 'JustMe Milano · Viale Luigi Camoens 2 · Parco Sempione',
    timelineTitles: [
      '19:30 · Посрещане за гала вечери Silver и Gold',
      '22:45 · Финал на вечерята и шоу осветление',
      '23:30 · Вход с билет Клуб + 1 напитка (20€)',
      '00:00 · Новогодишен тост и сет на DJ Nazar Radchuk',
      '01:30–05:00 · Награда 1 седмица в планината 4* и танци',
    ],
    dressOkTitle: 'Препоръчителен стил',
    dressNoTitle: 'Недопустимо на входа (21+)',
    logisticsHeading: 'Как да стигнете до JustMe Milano · Метро и Парко Семпионе',
    mapHeading: 'Карта и GPS · Viale Luigi Camoens 2',
    faqHeading: 'Често задавани въпроси · Стара Нова Година JustMe 2027',
    dec31Eyebrow: '31 Декември 2026 · Нова Година',
    dec31Title: 'Търсите ли и новогодишната нощ на 31 декември в JustMe Milano?',
    dec31Cta: 'Виж 31 декември JustMe',
    courseStarter: 'Предястие / Antipasto',
    courseFirst: 'Първо ястие / Primo',
    courseSecond: 'Основно ястие / Secondo',
    courseDessert: 'Десерт / Dolce',
  },
  hr: {
    quickDateLabel: 'Datum i satnica',
    quickVenueLabel: 'Točna adresa',
    quickMusicLabel: 'Guest Star i glazba',
    quickAccessLabel: 'Dob i ulaz',
    quickDressLabel: 'Tema i dress code',
    quickPriceLabel: 'Službene cijene',
    tocHeading: 'Sadržaj vodiča · Pravoslavna Nova Godina JustMe 2027',
    tocLabels: [
      '1. Pregled i satnica večeri',
      '2. Gala jelovnici Silver 60€ i Gold 80€',
      '3. Xceed ulaznice (20€) i VIP stolovi',
      '4. Natjecanje izgleda i odijevanje',
      '5. Uvjeti plaćanja (100% unaprijed)',
      '6. Metro i karta · Torre Branca',
      '7. Često postavljana pitanja (12 FAQ)',
    ],
    menusHeading: 'Službeni gala jelovnici · Silver 60€ i Gold Morski plodovi 80€ (19:30)',
    menusSubheading: 'Poslužena večera u grijanom zimskom paviljonu s uključenim partyjem do 05:00',
    silverLabel: 'Silver Jelovnik · 60€',
    goldLabel: 'Gold Morski Jelovnik · 80€',
    beveragesNote: 'Uključeno za stolom: 1 boca vode i 1 boca vina na svake 4 osobe + ulaz u klub',
    ticketsHeading: 'Službene ulaznice (Xceed 251019) i VIP Privé stolovi',
    ticketsSubheading: 'Ulaznice Club 20€ i večere 60€/80€ na Xceedu ili VIP rezervacija na WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé stolovi uz plesni podij i DJ pult putem WhatsAppa +39 351 912 7047 (24/7).',
    timelineHeading: 'Raspored večeri · Srijeda 13. – Četvrtak 14. siječnja 2027.',
    timelineSubheading: 'Od gala večere u 19:30 do ponoćne zdravice i DJ seta do 05:00 ujutro',
    timelineTitles: [
      '19:30 · Dolazak na gala večere Silver i Gold',
      '22:45 · Prijelaz iz večere u klupsku atmosferu',
      '23:30 · Club ulaz + 1 piće (Xceed 20€)',
      '00:00 · Ponoćno odbrojavanje i DJ Nazar Radchuk',
      '01:30–05:00 · Dodjela 4* nagrade i party do zore',
    ],
    dressOkTitle: 'Preporučeni stil',
    dressNoTitle: 'Nije dopušteno (21+)',
    logisticsHeading: 'Dolazak u JustMe Milano · Metro i Parco Sempione',
    mapHeading: 'GPS koordinate i karta · Viale Luigi Camoens 2',
    faqHeading: 'Često postavljana pitanja · Pravoslavna Nova Godina JustMe 2027',
    dec31Eyebrow: '31. prosinca 2026. · Doček',
    dec31Title: 'Tražite i doček 31. prosinca u JustMe Milano?',
    dec31Cta: 'Pogledaj 31. prosinca JustMe',
    courseStarter: 'Predjelo / Antipasto',
    courseFirst: 'Prvo jelo / Primo',
    courseSecond: 'Glavno jelo / Secondo',
    courseDessert: 'Desert / Dolce',
  },
  cs: {
    quickDateLabel: 'Datum a časy',
    quickVenueLabel: 'Přesná adresa',
    quickMusicLabel: 'DJ a hudba',
    quickAccessLabel: 'Věk a vstup',
    quickDressLabel: 'Téma a dress code',
    quickPriceLabel: 'Oficiální ceny',
    tocHeading: 'Obsah průvodce · Pravoslavný Nový Rok JustMe 2027',
    tocLabels: [
      '1. Přehled a program noci',
      '2. Gala menu Silver 60€ a Gold 80€',
      '3. Vstupenky Xceed (20€) a VIP stoly',
      '4. Soutěž o zájezd a dress code',
      '5. Platební podmínky (100% předem)',
      '6. Metro a mapa · Torre Branca',
      '7. Často kladené otázky (12 FAQ)',
    ],
    menusHeading: 'Oficiální gala menu · Silver 60€ a Gold Mořské plody 80€ (19:30)',
    menusSubheading: 'Servírovaná večeře ve vyhřívaném skleněném pavilonu včetně vstupu na party',
    silverLabel: 'Silver Menu · 60€',
    goldLabel: 'Gold Mořské plody · 80€',
    beveragesNote: 'V ceně u stolu: 1 lahev vody a 1 lahev vína pro 4 hosty + vstup do klubu do 05:00',
    ticketsHeading: 'Oficiální vstupenky (Xceed 251019) a VIP Privé stoly',
    ticketsSubheading: 'Vstupenky Club 20€ i večeře 60€/80€ přes Xceed nebo VIP stoly na WhatsAppu 24/7',
    vipConciergeNote: 'VIP Privé stoly na parketu a u DJ pultu 24/7 přes WhatsApp +39 351 912 7047.',
    timelineHeading: 'Harmonogram večera · 13.–14. ledna 2027',
    timelineSubheading: 'Od večeře v 19:30 přes půlnoční přípitek až do ranní 05:00',
    timelineTitles: [
      '19:30 · Příjezd na gala večeře Silver a Gold',
      '22:45 · Přechod ze servisu do klubového osvětlení',
      '23:30 · Vstup Club + 1 Drink (Xceed 20€)',
      '00:00 · Pravoslavný přípitek a DJ Nazar Radchuk',
      '01:30–05:00 · Vyhlášení výhry v horách 4* a hudba',
    ],
    dressOkTitle: 'Doporučený styl',
    dressNoTitle: 'Nepovolené oblečení (21+)',
    logisticsHeading: 'Jak se dostat do JustMe Milano · Metro a Parco Sempione',
    mapHeading: 'GPS souřadnice a mapa · Viale Luigi Camoens 2',
    faqHeading: 'Často kladené otázky · Pravoslavný Nový Rok JustMe 2027',
    dec31Eyebrow: '31. prosince 2026 · Silvestr',
    dec31Title: 'Hledáte také Silvestr 31. prosince v JustMe Milano?',
    dec31Cta: 'Zobrazit 31. prosinec JustMe',
    courseStarter: 'Předkrmy / Antipasto',
    courseFirst: 'První chod / Primo',
    courseSecond: 'Hlavní chod / Secondo',
    courseDessert: 'Dezert / Dolce',
  },
  da: {
    quickDateLabel: 'Dato & Tider',
    quickVenueLabel: 'Præcis Adresse',
    quickMusicLabel: 'DJ & Musik',
    quickAccessLabel: 'Alder & Adgang',
    quickDressLabel: 'Tema & Dresscode',
    quickPriceLabel: 'Officielle Priser',
    tocHeading: 'Sideoversigt · Ortodoks Nytår JustMe 2027',
    tocLabels: [
      '1. Overblik & Aftenens Program',
      '2. Galamenuer Silver 60€ & Gold 80€',
      '3. Xceed Billetter (20€) & VIP-borde',
      '4. Bedste Look Konkurrence & Dresscode',
      '5. Betalingsvilkår (100% Forudbetaling)',
      '6. Metro & Kort · Torre Branca',
      '7. Ofte Stillede Spørgsmål (12 FAQ)',
    ],
    menusHeading: 'Officielle Galamenuer · Silver 60€ & Gold Skaldyr 80€ (19:30)',
    menusSubheading: 'Serveret middag i den opvarmede vinterglas-pavillon inklusiv klubadgang til 05:00',
    silverLabel: 'Silver Menu · 60€',
    goldLabel: 'Gold Skaldyrsmenu · 80€',
    beveragesNote: 'Inkluderet ved bordet: 1 flaske vand & 1 flaske vin pr. 4 gæster + fuld klubadgang',
    ticketsHeading: 'Officielle Billetter (Xceed 251019) & VIP Privé Borde',
    ticketsSubheading: 'Book 20€ Club eller 60€/80€ middag via Xceed, eller VIP-borde døgnet rundt via WhatsApp',
    vipConciergeNote: 'VIP Privé borde ved dansegulvet og DJ-pulten 24/7 via WhatsApp +39 351 912 7047.',
    timelineHeading: 'Aftenens Tidsplan · 13.–14. Januar 2027',
    timelineSubheading: 'Fra italiensk gallamiddag kl. 19:30 til juliansk midnatsskål og fest til 05:00',
    timelineTitles: [
      '19:30 · Ankomst til Silver & Gold Middag',
      '22:45 · Afslutning på servering & Lysovergang',
      '23:30 · Klubentré + 1 Drink åbner (20€ Xceed)',
      '00:00 · Ortodoks Nedtælling & DJ Nazar Radchuk',
      '01:30–05:00 · Kåring af 4* Bjergferie & Natklub',
    ],
    dressOkTitle: 'Anbefalet Påklædning',
    dressNoTitle: 'Ikke Tilladt (21+)',
    logisticsHeading: 'Vejvisning til JustMe Milano · Metro & Parco Sempione',
    mapHeading: 'GPS-koordinater & Kort · Viale Luigi Camoens 2',
    faqHeading: 'Ofte Stillede Spørgsmål · Ortodoks Nytår JustMe 2027',
    dec31Eyebrow: '31. Dec 2026 · Nytårsaften',
    dec31Title: 'Leder du også efter Nytårsaften 31. December på JustMe Milano?',
    dec31Cta: 'Se 31. December JustMe',
    courseStarter: 'Forretter / Antipasto',
    courseFirst: 'Første Ret / Primo',
    courseSecond: 'Hovedret / Secondo',
    courseDessert: 'Dessert / Dolce',
  },
  et: {
    quickDateLabel: 'Kuupäev ja Ajakava',
    quickVenueLabel: 'Täpne Aadress',
    quickMusicLabel: 'Külalis-DJ ja Muusika',
    quickAccessLabel: 'Vanus ja Sissepääs',
    quickDressLabel: 'Teema ja Riietus',
    quickPriceLabel: 'Ametlikud Hinnad',
    tocHeading: 'Lehekülje Sisukord · Vana Uusaasta JustMe 2027',
    tocLabels: [
      '1. Öö Ülevaade ja Ajakava',
      '2. Galamenüüd Silver 60€ ja Gold 80€',
      '3. Xceed Piletid (20€) ja VIP Lauad',
      '4. Riietumiskood ja Mägede Auhind',
      '5. Maksetingimused (100% Ettemaks)',
      '6. Metroo ja Kaart · Torre Branca',
      '7. Korduma Kippuvad Küsimused (12 FAQ)',
    ],
    menusHeading: 'Ametlikud Galamenüüd · Silver 60€ ja Gold Mereannid 80€ (19:30)',
    menusSubheading: 'Lauateenindusega pidulik õhtusöök soojas klaaspaviljonis koos peopääsmega kuni 05:00',
    silverLabel: 'Silver Menüü · 60€',
    goldLabel: 'Gold Mereannid Menüü · 80€',
    beveragesNote: 'Lauas sisaldub: 1 pudel vett ja 1 pudel veini iga 4 külalise kohta + klubipääs',
    ticketsHeading: 'Ametlikud Piletid (Xceed 251019) ja VIP Privé Lauad',
    ticketsSubheading: 'Club 20€ ja õhtusöök 60€/80€ Xceedis või ööpäevaringne VIP broneering WhatsAppis',
    vipConciergeNote: 'VIP Privé lauad otse WhatsAppis +39 351 912 7047 (24/7).',
    timelineHeading: 'Öö Ajakava · 13.–14. Jaanuar 2027',
    timelineSubheading: 'Alates kell 19:30 õhtusöögist kuni vana kalendri kesköö toosti ja 05:00 lõpuni',
    timelineTitles: [
      '19:30 · Silver ja Gold Pidulik Õhtusöök',
      '22:45 · Päevavalguse vahetus peoprogrammiks',
      '23:30 · Klubi Pilet + 1 Jook Avatud (20€ Xceed)',
      '00:00 · Aastavahetuse Toost ja DJ Nazar Radchuk',
      '01:30–05:00 · 4* Mäepuhkuse Võitja ja Pidu',
    ],
    dressOkTitle: 'Soovitatud Stiil',
    dressNoTitle: 'Keelatud Uksel (21+)',
    logisticsHeading: 'Kuidas jõuda JustMe Milano klubisse · Metroo ja Parco Sempione',
    mapHeading: 'GPS ja Kaart · Viale Luigi Camoens 2',
    faqHeading: 'Korduma Kippuvad Küsimused · Vana Uusaasta JustMe 2027',
    dec31Eyebrow: '31. Dets 2026 · Aastavahetus',
    dec31Title: 'Kas otsite ka 31. detsembri aastavahetust JustMe Milano klubis?',
    dec31Cta: 'Vaata 31. detsembrit JustMe',
    courseStarter: 'Eelroad / Antipasto',
    courseFirst: 'Esimene Käik / Primo',
    courseSecond: 'Pearoog / Secondo',
    courseDessert: 'Magustoit / Dolce',
  },
  fi: {
    quickDateLabel: 'Päivä ja Aikataulu',
    quickVenueLabel: 'Tarkka Osoite',
    quickMusicLabel: 'Vieraileva DJ ja Musiikki',
    quickAccessLabel: 'Ikäraja ja Pääsy',
    quickDressLabel: 'Teema ja Pukukoodi',
    quickPriceLabel: 'Viralliset Hinnat',
    tocHeading: 'Sivun Sisällys · Ortodoksinen Uusi Vuosi JustMe 2027',
    tocLabels: [
      '1. Yleiskatsaus ja Illan Aikataulu',
      '2. Gaalamenut Silver 60€ ja Gold 80€',
      '3. Xceed Liput (20€) ja VIP Pöydät',
      '4. Pukukoodi ja Vuoristopalkinto',
      '5. Maksuehdot (100% Ennakko)',
      '6. Metro ja Kartta · Torre Branca',
      '7. Usein Kysytyt Kysymykset (12 FAQ)',
    ],
    menusHeading: 'Viralliset Gaalamenut · Silver 60€ & Gold Merenelävät 80€ (19:30)',
    menusSubheading: 'Pöytiin tarjoiltu illallinen lämmitetyssä lasipaviljongissa klubipääsyllä klo 05:00 asti',
    silverLabel: 'Silver Menu · 60€',
    goldLabel: 'Gold Merenelävämenu · 80€',
    beveragesNote: 'Sisältyy pöytään: 1 pullo vettä ja 1 pullo viiniä per 4 vierasta + klubipääsy',
    ticketsHeading: 'Viralliset Liput (Xceed 251019) ja VIP Privé Pöydät',
    ticketsSubheading: 'Osta 20€ klubilippu tai 60€/80€ illallinen Xceedistä tai varaa VIP WhatsAppissa 24/7',
    vipConciergeNote: 'VIP Privé pöydät ja karttavaraukset 24/7 WhatsApp +39 351 912 7047.',
    timelineHeading: 'Illan Aikataulu · 13.–14. Tammikuuta 2027',
    timelineSubheading: 'Klo 19:30 illallisesta juliaanisen keskiyön maljaan ja klo 05:00 lopetukseen',
    timelineTitles: [
      '19:30 · Saapuminen Silver & Gold Illallisille',
      '22:45 · Valaistuksen ja Musiikin Siirtymä',
      '23:30 · Klubi + 1 Juoma Sisäänpääsy (20€ Xceed)',
      '00:00 · Ortodoksinen Malja & DJ Nazar Radchuk',
      '01:30–05:00 · 4* Vuoristoloma Palkinto & Juhlat',
    ],
    dressOkTitle: 'Suositeltu Pukeutuminen',
    dressNoTitle: 'Ei Sallittu Ovella (21+)',
    logisticsHeading: 'Saapuminen JustMe Milanoon · Metro & Parco Sempione',
    mapHeading: 'GPS-koordinaatit & Kartta · Viale Luigi Camoens 2',
    faqHeading: 'Usein Kysytyt Kysymykset · Ortodoksinen Uusi Vuosi JustMe 2027',
    dec31Eyebrow: '31. Jouluk 2026 · Uudenvuodenaatto',
    dec31Title: 'Etsitkö myös 31. joulukuuta uudenvuoden juhlaa JustMe Milanossa?',
    dec31Cta: 'Katso 31. joulukuuta JustMe',
    courseStarter: 'Alkuruoat / Antipasto',
    courseFirst: 'Ensimmäinen Ruoka / Primo',
    courseSecond: 'Pääruoka / Secondo',
    courseDessert: 'Jälkiruoka / Dolce',
  },
  el: {
    quickDateLabel: 'Ημερομηνία & Ώρες',
    quickVenueLabel: 'Ακριβής Διεύθυνση',
    quickMusicLabel: 'Guest DJ & Μουσική',
    quickAccessLabel: 'Ηλικία & Επιλογή',
    quickDressLabel: 'Θέμα & Dress Code',
    quickPriceLabel: 'Επίσημες Τιμές',
    tocHeading: 'Περιεχόμενα · Παλαιό Ημερολόγιο Πρωτοχρονιά JustMe 2027',
    tocLabels: [
      '1. Πρόγραμμα & Ώρες της Βραδιάς',
      '2. Μενού Γκαλά Silver 60€ & Gold 80€',
      '3. Εισιτήρια Xceed (20€) & VIP Τραπέζια',
      '4. Διαγωνισμός Εμφάνισης & Dress Code',
      '5. Όροι Πληρωμής (100% Προπληρωμή)',
      '6. Μετρό & Χάρτης · Torre Branca',
      '7. Συχνές Ερωτήσεις (12 FAQ)',
    ],
    menusHeading: 'Επίσημα Μενού Γκαλά · Silver 60€ & Gold Θαλασσινά 80€ (19:30)',
    menusSubheading: 'Σερβιριστό δείπνο στο θερμαινόμενο γυάλινο περίπτερο με πλήρη είσοδο στο πάρτι',
    silverLabel: 'Μενού Silver · 60€',
    goldLabel: 'Μενού Gold Θαλασσινά · 80€',
    beveragesNote: 'Περιλαμβάνεται στο τραπέζι: 1 φιάλη νερό & 1 φιάλη κρασί ανά 4 άτομα + είσοδος club',
    ticketsHeading: 'Επίσημα Εισιτήρια (Xceed 251019) & VIP Privé Τραπέζια',
    ticketsSubheading: 'Εισιτήρια Club 20€ και δείπνα 60€/80€ στο Xceed ή κράτηση VIP μέσω WhatsApp 24/7',
    vipConciergeNote: 'Τραπέζια VIP Privé 24/7 με άμεση επιβεβαίωση στο WhatsApp +39 351 912 7047.',
    timelineHeading: 'Αναλυτικό Πρόγραμμα · 13–14 Ιανουαρίου 2027',
    timelineSubheading: 'Από το δείπνο των 19:30 έως την πρόποση του Παλαιού Ημερολογίου στις 00:00',
    timelineTitles: [
      '19:30 · Υποδοχή Δείπνων Silver & Gold',
      '22:45 · Μετάβαση από το Δείπνο στο Κλαμπ',
      '23:30 · Είσοδος Club + 1 Ποτό (Εισιτήριο Xceed 20€)',
      '00:00 · Πρωτοχρονιάτικη Πρόποση & DJ Nazar Radchuk',
      '01:30–05:00 · Βράβευση 4* Διακοπών & Πάρτι',
    ],
    dressOkTitle: 'Προτεινόμενη Εμφάνιση',
    dressNoTitle: 'Δεν Επιτρέπεται (21+)',
    logisticsHeading: 'Πρόσβαση στο JustMe Milano · Μετρό & Parco Sempione',
    mapHeading: 'Συντεταγμένες GPS & Χάρτης · Viale Luigi Camoens 2',
    faqHeading: 'Συχνές Ερωτήσεις · Παλαιό Ημερολόγιο JustMe 2027',
    dec31Eyebrow: '31 Δεκ 2026 · Παραμονή',
    dec31Title: 'Αναζητάτε και την Παραμονή 31 Δεκεμβρίου στο JustMe Milano;',
    dec31Cta: 'Δείτε 31 Δεκεμβρίου JustMe',
    courseStarter: 'Ορεκτικά / Antipasto',
    courseFirst: 'Πρώτο Πιάτο / Primo',
    courseSecond: 'Κυρίως Πιάτο / Secondo',
    courseDessert: 'Επιδόρπιο / Dolce',
  },
  hu: {
    quickDateLabel: 'Dátum és Időpont',
    quickVenueLabel: 'Pontos Cím',
    quickMusicLabel: 'Sztárvendég és Zene',
    quickAccessLabel: 'Korhatár és Belépés',
    quickDressLabel: 'Téma és Dresszkód',
    quickPriceLabel: 'Hivatalos Árak',
    tocHeading: 'Tartalomjegyzék · Ortodox Újév JustMe 2027',
    tocLabels: [
      '1. Áttekintés és Esti Menetrend',
      '2. Gálamenük Silver 60€ és Gold 80€',
      '3. Xceed Jegyek (20€) és VIP Asztalok',
      '4. Megjelenési Verseny és Öltözék',
      '5. Fizetési Feltételek (100% Előre)',
      '6. Metró és Térkép · Torre Branca',
      '7. Gyakran Ismételt Kérdések (12 FAQ)',
    ],
    menusHeading: 'Hivatalos Gálamenük · Silver 60€ & Gold Tengeri Fogások 80€ (19:30)',
    menusSubheading: 'Ültetett vacsora a fűtött téli üvegpavilonban teljes klubbelépővel 05:00-ig',
    silverLabel: 'Silver Menü · 60€',
    goldLabel: 'Gold Tengeri Menü · 80€',
    beveragesNote: 'Az asztalnál: 1 üveg víz és 1 üveg bor 4 vendégenként + teljes buli belépés',
    ticketsHeading: 'Hivatalos Jegyek (Xceed 251019) és VIP Privé Asztalok',
    ticketsSubheading: '20€ klubbelépő és 60€/80€ vacsorák az Xceed-en, vagy VIP foglalás WhatsApp-on 0–24',
    vipConciergeNote: 'VIP Privé asztalok 0–24 árajánlattal a +39 351 912 7047 WhatsApp számon.',
    timelineHeading: 'Az Éjszaka Menetrendje · 2027. Január 13–14.',
    timelineSubheading: 'Az 19:30-as gálavacsorától a julián éjféli koccintáson át 05:00-ig',
    timelineTitles: [
      '19:30 · Silver és Gold Gálavacsora Érkezés',
      '22:45 · Vacsora Zárása és Fényjáték',
      '23:30 · Klub Belépő + 1 Ital Nyitása (20€ Xceed)',
      '00:00 · Ortodox Éjfél és DJ Nazar Radchuk Szett',
      '01:30–05:00 · 4* Hegyi Nyaralás Díj és Parti',
    ],
    dressOkTitle: 'Ajánlott Öltözék',
    dressNoTitle: 'Nem Megengedett (21+)',
    logisticsHeading: 'Megközelítés: JustMe Milano · Metró és Parco Sempione',
    mapHeading: 'GPS Koordináták és Térkép · Viale Luigi Camoens 2',
    faqHeading: 'Gyakran Ismételt Kérdések · Ortodox Újév JustMe 2027',
    dec31Eyebrow: '2026. Dec 31. · Szilveszter',
    dec31Title: 'A december 31-i Szilvesztert is keresi a JustMe Milanóban?',
    dec31Cta: 'Dec 31 JustMe Megtekintése',
    courseStarter: 'Előételek / Antipasto',
    courseFirst: 'Első Fogás / Primo',
    courseSecond: 'Főétel / Secondo',
    courseDessert: 'Desszert / Dolce',
  },
  ga: {
    quickDateLabel: 'Dáta agus Amanna',
    quickVenueLabel: 'Seoladh Beacht',
    quickMusicLabel: 'Aoi-DJ agus Ceol',
    quickAccessLabel: 'Aois agus Cead Isteach',
    quickDressLabel: 'Téama agus Culaith',
    quickPriceLabel: 'Praghsanna Oifigiúla',
    tocHeading: 'Innéacs an Leathanaigh · Athbhliain JustMe 2027',
    tocLabels: [
      '1. Forbhreathnú & Sceideal na hOíche',
      '2. Biachláir Silver 60€ & Gold 80€',
      '3. Ticéid Xceed (20€) & Boird VIP',
      '4. Comórtas Stíle & Cód Éadaigh',
      '5. Téarmaí Íocaíochta (100% Roimh Ré)',
      '6. Meitreo & Léarscáil · Torre Branca',
      '7. Ceisteanna Coitianta (12 FAQ)',
    ],
    menusHeading: 'Biachláir Oifigiúla Gala · Silver 60€ & Gold Bia Mara 80€ (19:30)',
    menusSubheading: 'Dinnéar suite sa phailliún gloine téite le cead isteach iomlán go dtí 05:00',
    silverLabel: 'Biachlár Silver · 60€',
    goldLabel: 'Biachlár Gold Bia Mara · 80€',
    beveragesNote: 'San áireamh: 1 bhuidéal uisce & 1 bhuidéal fíona in aghaidh 4 aoi + cead club',
    ticketsHeading: 'Ticéid Oifigiúla (Xceed 251019) & Boird VIP Privé',
    ticketsSubheading: 'Cuir ticéid Club 20€ nó dinnéir 60€/80€ in áirithe ar Xceed nó WhatsApp 24/7',
    vipConciergeNote: 'Boird VIP Privé ar fáil 24/7 trí WhatsApp +39 351 912 7047.',
    timelineHeading: 'Clár Iomlán na hOíche · 13–14 Eanáir 2027',
    timelineSubheading: 'Ón dinnéar ag 19:30 go dtí an tsláinte ag meán oíche agus 05:00',
    timelineTitles: [
      '19:30 · Fáilte roimh Dhinnéir Silver & Gold',
      '22:45 · Aistriú ón mBia go dtí an Club',
      '23:30 · Cead Club + 1 Deoch (20€ Xceed)',
      '00:00 · Athbhliain Cheartchreidmheach & DJ Nazar Radchuk',
      '01:30–05:00 · Duais Sléibhe 4* & Cóisir',
    ],
    dressOkTitle: 'Éadaí Molta',
    dressNoTitle: 'Ní Cheadatear (21+)',
    logisticsHeading: 'Conas Teacht go JustMe Milano · Metro & Parco Sempione',
    mapHeading: 'Comhordanáidí GPS & Léarscáil · Viale Luigi Camoens 2',
    faqHeading: 'Ceisteanna Coitianta · Athbhliain JustMe Milano 2027',
    dec31Eyebrow: '31 Noll 2026 · Oíche Chinn Bliana',
    dec31Title: 'An bhfuil Oíche Chinn Bliana 31 Nollaig á lorg agat ag JustMe freisin?',
    dec31Cta: 'Féach ar 31 Nollaig JustMe',
    courseStarter: 'Tosaigh / Antipasto',
    courseFirst: 'Céad Chúrsa / Primo',
    courseSecond: 'Príomhchúrsa / Secondo',
    courseDessert: 'Milseog / Dolce',
  },
  lv: {
    quickDateLabel: 'Datums un Laiks',
    quickVenueLabel: 'Precīza Adrese',
    quickMusicLabel: 'Viesmākslinieks un Mūzika',
    quickAccessLabel: 'Vecums un Ieeja',
    quickDressLabel: 'Tēma un Apģērbs',
    quickPriceLabel: 'Oficiālās Cenas',
    tocHeading: 'Satura Rādītājs · Vecais Jaunais Gads JustMe 2027',
    tocLabels: [
      '1. Vakara Pārskats un Grafiks',
      '2. Svētku Ēdienkartes Silver 60€ un Gold 80€',
      '3. Xceed Biļetes (20€) un VIP Galdiņi',
      '4. Konkursa Noteikumi un Stils',
      '5. Maksāšanas Kārtība (100% Priekšapmaksa)',
      '6. Metro un Karte · Torre Branca',
      '7. Biežāk Uzdotie Jautājumi (12 FAQ)',
    ],
    menusHeading: 'Oficiālās Svētku Ēdienkartes · Silver 60€ un Gold Jūras veltes 80€ (19:30)',
    menusSubheading: 'Pasniegtas vakariņas apsildāmā stikla paviljonā ar iekļautu ieeju klubā līdz 05:00',
    silverLabel: 'Silver Ēdienkarte · 60€',
    goldLabel: 'Gold Jūras velšu Ēdienkarte · 80€',
    beveragesNote: 'Galdam iekļauts: 1 pudele ūdens un 1 pudele vīna uz 4 viesiem + naktsklubs',
    ticketsHeading: 'Oficiālās Biļetes (Xceed 251019) un VIP Privé Galdiņi',
    ticketsSubheading: 'Biļetes 20€ un vakariņas 60€/80€ portālā Xceed vai VIP rezervācija WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé galdiņi pie deju grīdas un DJ 24/7 saziņā WhatsApp +39 351 912 7047.',
    timelineHeading: 'Vakara Hronoloģija · 2027. gada 13.–14. Janvāris',
    timelineSubheading: 'No vakariņām 19:30 līdz pusnakts tostiem un ballītei līdz 05:00',
    timelineTitles: [
      '19:30 · Silver un Gold Svētku Vakariņas',
      '22:45 · Pāreja uz Kluba Programmu',
      '23:30 · Ieeja Klubā + 1 Dzēriens (20€ Xceed)',
      '00:00 · Pusnakts Tosts un DJ Nazar Radchuk',
      '01:30–05:00 · 4* Kalnu Brīvdienu Balva un Dejas',
    ],
    dressOkTitle: 'Ieteicamais Stils',
    dressNoTitle: 'Nav Atļauts Pie Ieejas (21+)',
    logisticsHeading: 'Kā Nokļūt JustMe Milano · Metro un Parco Sempione',
    mapHeading: 'GPS un Karte · Viale Luigi Camoens 2',
    faqHeading: 'Biežāk Uzdotie Jautājumi · Vecais Jaunais Gads JustMe 2027',
    dec31Eyebrow: '31. Dec 2026 · Jaungada Nakts',
    dec31Title: 'Vai meklējat arī 31. decembra Vecgada vakaru JustMe Milano?',
    dec31Cta: 'Skatīt 31. decembri JustMe',
    courseStarter: 'Uzkodas / Antipasto',
    courseFirst: 'Pirmais Ēdiens / Primo',
    courseSecond: 'Pamatēdiens / Secondo',
    courseDessert: 'Deserts / Dolce',
  },
  lt: {
    quickDateLabel: 'Data ir Laikas',
    quickVenueLabel: 'Tikslus Adresas',
    quickMusicLabel: 'Svečias DJ ir Muzika',
    quickAccessLabel: 'Amžius ir Įėjimas',
    quickDressLabel: 'Tema ir Apranga',
    quickPriceLabel: 'Oficialios Kainos',
    tocHeading: 'Puslapio Turinys · Senieji Naujieji Metai JustMe 2027',
    tocLabels: [
      '1. Nakties Apžvalga ir Programa',
      '2. Šventiniai Meniu Silver 60€ ir Gold 80€',
      '3. Xceed Bilietai (20€) ir VIP Staliukai',
      '4. Konkursas ir Aprangos Kodas',
      '5. Mokėjimo Sąlygos (100% Iš Anksto)',
      '6. Metro ir Žemėlapis · Torre Branca',
      '7. Dažniausiai Užduodami Klausimai (12 FAQ)',
    ],
    menusHeading: 'Oficialūs Šventiniai Meniu · Silver 60€ ir Gold Jūros gėrybės 80€ (19:30)',
    menusSubheading: 'Aptarnaujama vakarienė šildomame stikliniame paviljone su patekimu į klubą iki 05:00',
    silverLabel: 'Silver Meniu · 60€',
    goldLabel: 'Gold Jūros gėrybių Meniu · 80€',
    beveragesNote: 'Staliukui skiriama: 1 vandens ir 1 vyno butelis 4 svečiams + vakarėlis iki ryto',
    ticketsHeading: 'Oficialūs Bilietai (Xceed 251019) ir VIP Privé Staliukai',
    ticketsSubheading: 'Klubo bilietas 20€ ir vakarienės 60€/80€ per Xceed arba VIP stalai WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé staliukų užsakymai 24/7 per WhatsApp +39 351 912 7047.',
    timelineHeading: 'Vakaro Tvarkaraštis · 2027 m. Sausio 13–14 d.',
    timelineSubheading: 'Nuo 19:30 vakarienės iki vidurnakčio tosto ir šokių iki 05:00',
    timelineTitles: [
      '19:30 · Silver ir Gold Šventinės Vakarienės',
      '22:45 · Paviljono Apšvietimo Keitimas į Klubą',
      '23:30 · Įėjimas į Klubą + 1 Gėrimas (20€ Xceed)',
      '00:00 · Vidurnakčio Tostas ir DJ Nazar Radchuk',
      '01:30–05:00 · 4* Kalnų Atostogų Prizas ir Šokiai',
    ],
    dressOkTitle: 'Rekomenduojama Apranga',
    dressNoTitle: 'Neleidžiama Prie Durų (21+)',
    logisticsHeading: 'Kaip Atvykti į JustMe Milano · Metro ir Parco Sempione',
    mapHeading: 'GPS Koordinatės ir Žemėlapis · Viale Luigi Camoens 2',
    faqHeading: 'Dažniausiai Užduodami Klausimai · JustMe Milano 2027',
    dec31Eyebrow: '2026 Gruodžio 31 d. · Naujieji',
    dec31Title: 'Taip pat ieškote gruodžio 31 d. Naujųjų metų JustMe Milano klube?',
    dec31Cta: 'Žiūrėti Gruodžio 31 d. JustMe',
    courseStarter: 'Užkandžiai / Antipasto',
    courseFirst: 'Pirmasis Patiekalas / Primo',
    courseSecond: 'Pagrindinis Patiekalas / Secondo',
    courseDessert: 'Desertas / Dolce',
  },
  mt: {
    quickDateLabel: 'Data u Ħinijiet',
    quickVenueLabel: 'Indirizz Eżatt',
    quickMusicLabel: 'DJ Mistieden u Mużika',
    quickAccessLabel: 'Età u Dħul',
    quickDressLabel: 'Tema u Dress Code',
    quickPriceLabel: 'Prezzijiet Uffiċjali',
    tocHeading: 'Werrej tal-Paġna · Ewwel tas-Sena Ortodoss JustMe 2027',
    tocLabels: [
      '1. Ħarsa Ġenerali u Skeda tal-Lejl',
      '2. Menus Gala Silver 60€ u Gold 80€',
      '3. Biljetti Xceed (20€) u Mwejjed VIP',
      '4. Kompetizzjoni tal-Ilbies u Stil',
      '5. Termini ta’ Ħlas (100% Bil-Quddiem)',
      '6. Metro u Mappa · Torre Branca',
      '7. Mistoqsijiet Frekwenti (12 FAQ)',
    ],
    menusHeading: 'Menus Uffiċjali tal-Gala · Silver 60€ u Gold Frott tal-Baħar 80€ (19:30)',
    menusSubheading: 'Ikla servuta mal-mejda fil-padiljun tal-ħġieġ imsaħħan bil-festa inkluża sa 05:00',
    silverLabel: 'Menu Silver · 60€',
    goldLabel: 'Menu Gold Frott tal-Baħar · 80€',
    beveragesNote: 'Inkluż mal-mejda: flixkun ilma u flixkun inbid kull 4 mistednin + dħul fil-klabb',
    ticketsHeading: 'Biljetti Uffiċjali (Xceed 251019) u Mwejjed VIP Privé',
    ticketsSubheading: 'Ibbukkja Klabb 20€ jew ikla 60€/80€ fuq Xceed jew VIP Privé fuq WhatsApp 24/7',
    vipConciergeNote: 'Mwejjed VIP Privé ikkwotati 24/7 fuq WhatsApp +39 351 912 7047.',
    timelineHeading: 'Skeda Sħiħa tal-Lejl · 13–14 ta’ Jannar 2027',
    timelineSubheading: 'Mill-ikla tas-19:30 sa nofsillejl Ortodoss u mużika sas-05:00',
    timelineTitles: [
      '19:30 · Wasla għall-Ikla Silver u Gold',
      '22:45 · Tmiem tas-Servizz u Tranżizzjoni tad-Dawl',
      '23:30 · Dħul Klabb + 1 Xarba (20€ Xceed)',
      '00:00 · Countdown Ortodoss u DJ Nazar Radchuk',
      '01:30–05:00 · Premju Vjagg fil-Muntanji 4* u Żfin',
    ],
    dressOkTitle: 'Ilbies Rakkomandat',
    dressNoTitle: 'Mhux Permess (21+)',
    logisticsHeading: 'Kif Tasal JustMe Milano · Metro u Parco Sempione',
    mapHeading: 'Koordinati GPS u Mappa · Viale Luigi Camoens 2',
    faqHeading: 'Mistoqsijiet Frekwenti · Ewwel tas-Sena Ortodoss JustMe 2027',
    dec31Eyebrow: '31 Diċ 2026 · Lejlet l-Ewwel tas-Sena',
    dec31Title: 'Qed tfittex ukoll il-31 ta’ Diċembru f’JustMe Milano?',
    dec31Cta: 'Ara l-31 ta’ Diċembru JustMe',
    courseStarter: 'Antipasti / Antipasto',
    courseFirst: 'L-Ewwel Platt / Primo',
    courseSecond: 'Platt Prinċipali / Secondo',
    courseDessert: 'Deżerta / Dolce',
  },
  pl: {
    quickDateLabel: 'Data i Godziny',
    quickVenueLabel: 'Dokładny Adres',
    quickMusicLabel: 'Gość Specjalny i Muzyka',
    quickAccessLabel: 'Wiek i Selekcja',
    quickDressLabel: 'Motyw i Dress Code',
    quickPriceLabel: 'Oficjalne Ceny',
    tocHeading: 'Spis Treści · Prawosławny Nowy Rok JustMe 2027',
    tocLabels: [
      '1. Przegląd i Harmonogram Nocy',
      '2. Menu Galowe Silver 60€ i Gold 80€',
      '3. Bilety Xceed (20€) i Stoliki VIP',
      '4. Konkurs Stylizacji i Dress Code',
      '5. Warunki Płatności (100% Przedpłata)',
      '6. Metro i Mapa · Torre Branca',
      '7. Najczęściej Zadawane Pytania (12 FAQ)',
    ],
    menusHeading: 'Oficjalne Menu Galowe · Silver 60€ i Gold Owoce Morza 80€ (19:30)',
    menusSubheading: 'Kolacja serwowana do stolika w ogrzewanym pawilonie z pełnym wstępem na imprezę',
    silverLabel: 'Menu Silver · 60€',
    goldLabel: 'Menu Gold Owoce Morza · 80€',
    beveragesNote: 'W cenie przy stoliku: 1 butelka wody i 1 butelka wina na 4 osoby + wejście do klubu',
    ticketsHeading: 'Oficjalne Bilety (Xceed 251019) i Stoliki VIP Privé',
    ticketsSubheading: 'Kup wejściówkę Club 20€ lub kolację 60€/80€ na Xceed albo zarezerwuj VIP przez WhatsApp 24/7',
    vipConciergeNote: 'Stoliki VIP Privé przy parkiecie i konsoli DJ wyceniane 24/7 przez WhatsApp +39 351 912 7047.',
    timelineHeading: 'Harmonogram Nocy · Środa 13 – Czwartek 14 Stycznia 2027',
    timelineSubheading: 'Od włoskiej kolacji o 19:30 do toastu juliańskiego o północy i zabawy do 05:00',
    timelineTitles: [
      '19:30 · Powitanie Gości Kolacji Silver i Gold',
      '22:45 · Przejście Oświetlenia Pawilonu w Tryb Klubowy',
      '23:30 · Otwarcie Wejść Club + 1 Drink (Xceed 20€)',
      '00:00 · Prawosławny Toast i Set DJ Nazar Radchuk',
      '01:30–05:00 · Nagroda Tydzień w Górach 4* i Klub',
    ],
    dressOkTitle: 'Zalecany Strój',
    dressNoTitle: 'Niedozwolone na Selekcji (21+)',
    logisticsHeading: 'Dojazd do JustMe Milano · Metro i Parco Sempione',
    mapHeading: 'Współrzędne GPS i Mapa · Viale Luigi Camoens 2',
    faqHeading: 'Najczęściej Zadawane Pytania · Prawosławny Nowy Rok JustMe 2027',
    dec31Eyebrow: '31 Grudnia 2026 · Sylwester',
    dec31Title: 'Szukasz także Sylwestra 31 grudnia w JustMe Milano?',
    dec31Cta: 'Zobacz 31 Grudnia JustMe',
    courseStarter: 'Przystawki / Antipasto',
    courseFirst: 'Pierwsze Danie / Primo',
    courseSecond: 'Danie Główne / Secondo',
    courseDessert: 'Deser / Dolce',
  },
  ro: {
    quickDateLabel: 'Dată și Orar',
    quickVenueLabel: 'Adresă Exactă',
    quickMusicLabel: 'Invitat Special & Muzică',
    quickAccessLabel: 'Vârstă și Acces',
    quickDressLabel: 'Temă și Ținută',
    quickPriceLabel: 'Tarife Oficiale',
    tocHeading: 'Cuprinsul Ghidului · Revelion pe Rit Vechi JustMe 2027',
    tocLabels: [
      '1. Prezentare și Programul Nopții',
      '2. Meniuri de Gală Silver 60€ și Gold 80€',
      '3. Bilete Xceed (20€) și Mese VIP',
      '4. Concurs de Ținută și Dress Code',
      '5. Condiții de Plată (100% În Avans)',
      '6. Metrou și Hartă · Torre Branca',
      '7. Întrebări Frecvente (12 FAQ)',
    ],
    menusHeading: 'Meniuri Oficiale de Gală · Silver 60€ și Gold Fructe de Mare 80€ (19:30)',
    menusSubheading: 'Cină servită la masă în pavilionul de sticlă încălzit cu acces inclus la petrecere',
    silverLabel: 'Meniu Silver · 60€',
    goldLabel: 'Meniu Gold Fructe de Mare · 80€',
    beveragesNote: 'Inclus la masă: 1 sticlă de apă și 1 sticlă de vin la fiecare 4 oaspeți + acces club',
    ticketsHeading: 'Bilete Oficiale (Xceed 251019) și Mese VIP Privé',
    ticketsSubheading: 'Rezervă intrare Club 20€, cină 60€/80€ pe Xceed sau masă VIP non-stop pe WhatsApp',
    vipConciergeNote: 'Mese VIP Privé cotate 24/7 direct pe WhatsApp +39 351 912 7047.',
    timelineHeading: 'Programul Complet al Nopții · 13–14 Ianuarie 2027',
    timelineSubheading: 'De la cina italiană la 19:30 până la toastul iulian și petrecerea de până la 05:00',
    timelineTitles: [
      '19:30 · Primirea Oaspeților la Cină Silver și Gold',
      '22:45 · Tranziția Pavilionului spre Petrecere',
      '23:30 · Acces Club + 1 Băutură (Bilet Xceed 20€)',
      '00:00 · Numărătoarea pe Rit Vechi și DJ Nazar Radchuk',
      '01:30–05:00 · Premiul Vacanță 4* la Munte și Club',
    ],
    dressOkTitle: 'Ținută Recomandată',
    dressNoTitle: 'Interzis la Intrare (21+)',
    logisticsHeading: 'Cum Ajungi la JustMe Milano · Metrou și Parco Sempione',
    mapHeading: 'Coordonate GPS și Hartă · Viale Luigi Camoens 2',
    faqHeading: 'Întrebări Frecvente · Revelion pe Rit Vechi JustMe 2027',
    dec31Eyebrow: '31 Decembrie 2026 · Revelion',
    dec31Title: 'Cauți și Revelionul de 31 Decembrie la JustMe Milano?',
    dec31Cta: 'Vezi 31 Decembrie JustMe',
    courseStarter: 'Aperitive / Antipasto',
    courseFirst: 'Felul Întâi / Primo',
    courseSecond: 'Felul Principal / Secondo',
    courseDessert: 'Desert / Dolce',
  },
  sk: {
    quickDateLabel: 'Dátum a Časy',
    quickVenueLabel: 'Presná Adresa',
    quickMusicLabel: 'DJ Hosť a Hudba',
    quickAccessLabel: 'Vek a Vstup',
    quickDressLabel: 'Téma a Dress Code',
    quickPriceLabel: 'Oficiálne Ceny',
    tocHeading: 'Obsah Sprievodcu · Pravoslávny Nový Rok JustMe 2027',
    tocLabels: [
      '1. Prehľad a Program Noci',
      '2. Gala Menu Silver 60€ a Gold 80€',
      '3. Vstupenky Xceed (20€) a VIP Stoly',
      '4. Súťaž o Najlepší Look a Oblečenie',
      '5. Platobné Podmienky (100% Vopred)',
      '6. Metro a Mapa · Torre Branca',
      '7. Často Kladené Otázky (12 FAQ)',
    ],
    menusHeading: 'Oficiálne Gala Menu · Silver 60€ a Gold Morské Plody 80€ (19:30)',
    menusSubheading: 'Servírovaná večera vo vyhrievanom pavilóne vrátane celonočného vstupu do klubu',
    silverLabel: 'Menu Silver · 60€',
    goldLabel: 'Menu Gold Morské Plody · 80€',
    beveragesNote: 'Pri stole v cene: 1 fľaša vody a 1 fľaša vína na každé 4 osoby + vstup do klubu',
    ticketsHeading: 'Oficiálne Vstupenky (Xceed 251019) a VIP Privé Stoly',
    ticketsSubheading: 'Vstupenky Club 20€ a večere 60€/80€ cez Xceed alebo VIP stoly nonstop na WhatsAppe',
    vipConciergeNote: 'VIP Privé stoly pri parkete a DJ pulte s cenou 24/7 cez WhatsApp +39 351 912 7047.',
    timelineHeading: 'Časový Harmonogram · Streda 13. – Štvrtok 14. Januára 2027',
    timelineSubheading: 'Od večere o 19:30 po polnočný prípitok a párty až do 05:00 rána',
    timelineTitles: [
      '19:30 · Príchod na Gala Večeru Silver a Gold',
      '22:45 · Ukončenie Servisu a Klubové Osvetlenie',
      '23:30 · Vstup Club + 1 Drink (Xceed 20€)',
      '00:00 · Pravoslávny Prípitok a DJ Nazar Radchuk',
      '01:30–05:00 · Vyhlásenie Výhry v Horách 4* a Klub',
    ],
    dressOkTitle: 'Odporúčané Oblečenie',
    dressNoTitle: 'Nepovolené pri Vstupe (21+)',
    logisticsHeading: 'Ako sa Dostať do JustMe Milano · Metro a Parco Sempione',
    mapHeading: 'GPS Súradnice a Mapa · Viale Luigi Camoens 2',
    faqHeading: 'Často Kladené Otázky · Pravoslávny Nový Rok JustMe 2027',
    dec31Eyebrow: '31. Decembra 2026 · Silvester',
    dec31Title: 'Hľadáte aj Silvester 31. decembra v JustMe Milano?',
    dec31Cta: 'Pozrieť 31. December JustMe',
    courseStarter: 'Predjedlá / Antipasto',
    courseFirst: 'Prvý Chod / Primo',
    courseSecond: 'Hlavný Chod / Secondo',
    courseDessert: 'Dezert / Dolce',
  },
  sl: {
    quickDateLabel: 'Datum in Urnik',
    quickVenueLabel: 'Točen Naslov',
    quickMusicLabel: 'Gostujoči DJ in Glasba',
    quickAccessLabel: 'Starost in Vstop',
    quickDressLabel: 'Tema in Dress Code',
    quickPriceLabel: 'Uradne Cene',
    tocHeading: 'Kazalo Vodnika · Pravoslavno Novo Leto JustMe 2027',
    tocLabels: [
      '1. Pregled in Urnik Noči',
      '2. Gala Meniji Silver 60€ in Gold 80€',
      '3. Vstopnice Xceed (20€) in VIP Mize',
      '4. Nagradna Igra in Kodeks Oblačenja',
      '5. Plačilni Pogoji (100% Vnaprej)',
      '6. Podzemna in Zemljevid · Torre Branca',
      '7. Pogosta Vprašanja (12 FAQ)',
    ],
    menusHeading: 'Uradni Gala Meniji · Silver 60€ in Gold Morski Sadeži 80€ (19:30)',
    menusSubheading: 'Postrežena večerja v ogrevanem zimskem paviljonu z vključenim vstopom v klub do 05:00',
    silverLabel: 'Silver Meni · 60€',
    goldLabel: 'Gold Morski Meni · 80€',
    beveragesNote: 'Vključeno pri mizi: 1 steklenica vode in 1 steklenica vina na 4 goste + vstop v klub',
    ticketsHeading: 'Uradne Vstopnice (Xceed 251019) in VIP Privé Mize',
    ticketsSubheading: 'Club 20€ in večerji 60€/80€ preko Xceeda ali rezervacija VIP miz preko WhatsAppa 24/7',
    vipConciergeNote: 'VIP Privé mize ob plesišču in DJ pultu 24/7 preko WhatsAppa +39 351 912 7047.',
    timelineHeading: 'Časovnica Večera · 13.–14. Januar 2027',
    timelineSubheading: 'Od večerje ob 19:30 do polnočne zdravice in zabave do 05:00',
    timelineTitles: [
      '19:30 · Sprejem za Večerji Silver in Gold',
      '22:45 · Prehod iz Večerje v Klubsko Luč',
      '23:30 · Vstop Club + 1 Pijača (Xceed 20€)',
      '00:00 · Polnočni Toast in DJ Nazar Radchuk',
      '01:30–05:00 · Podelitev 4* Počitnic in Zabava',
    ],
    dressOkTitle: 'Priporočen Slog',
    dressNoTitle: 'Ni Dovoljeno pri Vstopu (21+)',
    logisticsHeading: 'Kako do JustMe Milano · Podzemna in Parco Sempione',
    mapHeading: 'GPS Koordinate in Zemljevid · Viale Luigi Camoens 2',
    faqHeading: 'Pogosta Vprašanja · Pravoslavno Novo Leto JustMe 2027',
    dec31Eyebrow: '31. Dec 2026 · Silvestrovo',
    dec31Title: 'Iščete tudi Silvestrovanje 31. decembra v JustMe Milano?',
    dec31Cta: 'Poglej 31. December JustMe',
    courseStarter: 'Predjedi / Antipasto',
    courseFirst: 'Prva Jed / Primo',
    courseSecond: 'Glavna Jed / Secondo',
    courseDessert: 'Sladica / Dolce',
  },
  sv: {
    quickDateLabel: 'Datum och Tider',
    quickVenueLabel: 'Exakt Adress',
    quickMusicLabel: 'Gäst-DJ och Musik',
    quickAccessLabel: 'Ålder och Inträde',
    quickDressLabel: 'Tema och Klädkod',
    quickPriceLabel: 'Officiella Priser',
    tocHeading: 'Sidindex · Ortodoxt Nyår JustMe 2027',
    tocLabels: [
      '1. Översikt och Kvällens Schema',
      '2. Galamenyer Silver 60€ och Gold 80€',
      '3. Xceed Biljetter (20€) och VIP-bord',
      '4. Tävling Bästa Look och Klädkod',
      '5. Betalningsvillkor (100% Förskott)',
      '6. Tunnelbana och Karta · Torre Branca',
      '7. Vanliga Frågor (12 FAQ)',
    ],
    menusHeading: 'Officiella Galamenyer · Silver 60€ och Gold Skaldjur 80€ (19:30)',
    menusSubheading: 'Sittande middag i den uppvärmda vinterglaspaviljongen med klubbentrén inkluderad',
    silverLabel: 'Silver Meny · 60€',
    goldLabel: 'Gold Skaldjursmeny · 80€',
    beveragesNote: 'Ingår vid bordet: 1 flaska vatten och 1 flaska vin per 4 gäster + nattklubb',
    ticketsHeading: 'Officiella Biljetter (Xceed 251019) och VIP Privé Bord',
    ticketsSubheading: 'Boka 20€ Club eller 60€/80€ middag via Xceed, eller VIP-bord dygnet runt via WhatsApp',
    vipConciergeNote: 'VIP Privé bord vid dansgolvet och DJ-båset 24/7 via WhatsApp +39 351 912 7047.',
    timelineHeading: 'Kvällens Schema · Onsdag 13 – Torsdag 14 Januari 2027',
    timelineSubheading: 'Från italiensk galamiddag kl. 19:30 till tolvslaget och nattklubb fram till 05:00',
    timelineTitles: [
      '19:30 · Ankomst till Silver och Gold Middag',
      '22:45 · Avslutad Middag och Belysningsbyte',
      '23:30 · Klubbinträde + 1 Drink öppnar (20€ Xceed)',
      '00:00 · Ortodox Skål och DJ Nazar Radchuk',
      '01:30–05:00 · Vinnare av 4* Bergssemester och Fest',
    ],
    dressOkTitle: 'Rekommenderad Klädsel',
    dressNoTitle: 'Ej Tillåtet vid Entré (21+)',
    logisticsHeading: 'Hitta till JustMe Milano · Tunnelbana och Parco Sempione',
    mapHeading: 'GPS-koordinater och Karta · Viale Luigi Camoens 2',
    faqHeading: 'Vanliga Frågor · Ortodoxt Nyår JustMe 2027',
    dec31Eyebrow: '31 Dec 2026 · Nyårsafton',
    dec31Title: 'Letar du också efter Nyårsafton 31 december på JustMe Milano?',
    dec31Cta: 'Se 31 December JustMe',
    courseStarter: 'Förrätter / Antipasto',
    courseFirst: 'Första Rätten / Primo',
    courseSecond: 'Huvudrätt / Secondo',
    courseDessert: 'Efterrätt / Dolce',
  },
  no: {
    quickDateLabel: 'Dato og Tidspunkt',
    quickVenueLabel: 'Nøyaktig Adresse',
    quickMusicLabel: 'Gjest-DJ og Musikk',
    quickAccessLabel: 'Alder og Inngang',
    quickDressLabel: 'Tema og Kleskode',
    quickPriceLabel: 'Offisielle Priser',
    tocHeading: 'Sideindeks · Ortodoks Nyttår JustMe 2027',
    tocLabels: [
      '1. Oversikt og Kveldens Program',
      '2. Galamenyer Silver 60€ og Gold 80€',
      '3. Xceed Billetter (20€) og VIP-bord',
      '4. Konkurranse og Kleskode',
      '5. Betalingsvilkår (100% Forskudd)',
      '6. T-bane og Kart · Torre Branca',
      '7. Ofte Stilte Spørsmål (12 FAQ)',
    ],
    menusHeading: 'Offisielle Galamenyer · Silver 60€ og Gold Sjømat 80€ (19:30)',
    menusSubheading: 'Sittende middag i den oppvarmede glasspaviljongen med full klubbinngang til 05:00',
    silverLabel: 'Silver Meny · 60€',
    goldLabel: 'Gold Sjømatmeny · 80€',
    beveragesNote: 'Inkludert ved bordet: 1 flaske vann og 1 flaske vin per 4 gjester + klubbinngang',
    ticketsHeading: 'Offisielle Billetter (Xceed 251019) og VIP Privé Bord',
    ticketsSubheading: 'Bestill 20€ Club eller 60€/80€ middag på Xceed eller VIP-bord 24/7 på WhatsApp',
    vipConciergeNote: 'VIP Privé bord ved dansegulvet og DJ-båsen 24/7 via WhatsApp +39 351 912 7047.',
    timelineHeading: 'Kveldens Tidsskjema · 13.–14. Januar 2027',
    timelineSubheading: 'Fra middag kl. 19:30 til juliansk midnattskål og nattklubb frem til 05:00',
    timelineTitles: [
      '19:30 · Ankomst til Silver og Gold Middag',
      '22:45 · Overgang til Nattklubblys',
      '23:30 · Klubbinngang + 1 Drink Åpner (20€ Xceed)',
      '00:00 · Ortodoks Nedtelling og DJ Nazar Radchuk',
      '01:30–05:00 · Kåring av 4* Fjellferie og Fest',
    ],
    dressOkTitle: 'Anbefalt Antrekk',
    dressNoTitle: 'Ikke Tillatt ved Døren (21+)',
    logisticsHeading: 'Veibeskrivelse til JustMe Milano · T-bane og Parco Sempione',
    mapHeading: 'GPS-koordinater og Kart · Viale Luigi Camoens 2',
    faqHeading: 'Ofte Stilte Spørsmål · Ortodoks Nyttår JustMe 2027',
    dec31Eyebrow: '31. Des 2026 · Nyttårsaften',
    dec31Title: 'Ser du også etter Nyttårsaften 31. desember på JustMe Milano?',
    dec31Cta: 'Se 31. Desember JustMe',
    courseStarter: 'Forretter / Antipasto',
    courseFirst: 'Første Rett / Primo',
    courseSecond: 'Hovedrett / Secondo',
    courseDessert: 'Dessert / Dolce',
  },
  is: {
    quickDateLabel: 'Dagsetning og Tímar',
    quickVenueLabel: 'Nákvæmt Heimilisfang',
    quickMusicLabel: 'Gestaplötusnúður og Tónlist',
    quickAccessLabel: 'Aldur og Inngangur',
    quickDressLabel: 'Þema og Klæðaburður',
    quickPriceLabel: 'Opinber Verð',
    tocHeading: 'Efnisyfirlit Síðu · Rétttrúnaðaráramót JustMe 2027',
    tocLabels: [
      '1. Yfirlit og Dagskrá Kvöldsins',
      '2. Hátíðarmatseðlar Silver 60€ og Gold 80€',
      '3. Xceed Miðar (20€) og VIP Borð',
      '4. Útlitskeppni og Klæðnaður',
      '5. Greiðsluskilmálar (100% Fyrirfram)',
      '6. Neðanjarðarlest og Kort · Torre Branca',
      '7. Algengar Spurningar (12 FAQ)',
    ],
    menusHeading: 'Opinberir Hátíðarmatseðlar · Silver 60€ og Gold Sjávarfang 80€ (19:30)',
    menusSubheading: 'Borðhald í upphituðum glerskála með fullum aðgangi að skemmtistaðnum til 05:00',
    silverLabel: 'Silver Matseðill · 60€',
    goldLabel: 'Gold Sjávarfangsmatseðill · 80€',
    beveragesNote: 'Innifalið á borði: 1 flaska af vatni og 1 flaska af víni fyrir hverja 4 gesti + partí',
    ticketsHeading: 'Opinberir Miðar (Xceed 251019) og VIP Privé Borð',
    ticketsSubheading: 'Bókaðu 20€ Club eða 60€/80€ kvöldverð á Xceed eða VIP borð á WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé borð allan sólarhringinn í gegnum WhatsApp +39 351 912 7047.',
    timelineHeading: 'Dagskrá Næturinnar · 13.–14. Janúar 2027',
    timelineSubheading: 'Frá kvöldverði kl. 19:30 að miðnæturskál og tónlist til kl. 05:00',
    timelineTitles: [
      '19:30 · Móttaka í Silver og Gold Kvöldverð',
      '22:45 · Lýsing og Stemning Breytt í Klúbb',
      '23:30 · Klúbbaðgangur + 1 Drykkur (20€ Xceed)',
      '00:00 · Rétttrúnaðarskálin og DJ Nazar Radchuk',
      '01:30–05:00 · Verðlaun fyrir 4* Fjallafrí og Dansgólf',
    ],
    dressOkTitle: 'Ráðlagður Klæðnaður',
    dressNoTitle: 'Ekki Heimilt við Dyrnar (21+)',
    logisticsHeading: 'Leiðarlýsing að JustMe Milano · Lest og Parco Sempione',
    mapHeading: 'GPS Hnit og Kort · Viale Luigi Camoens 2',
    faqHeading: 'Algengar Spurningar · Rétttrúnaðaráramót JustMe 2027',
    dec31Eyebrow: '31. Des 2026 · Gamlárskvöld',
    dec31Title: 'Ertu líka að leita að Gamlárskvöldi 31. desember á JustMe Milano?',
    dec31Cta: 'Sjá 31. Desember JustMe',
    courseStarter: 'Forréttir / Antipasto',
    courseFirst: 'Fyrsti Réttur / Primo',
    courseSecond: 'Aðalréttur / Secondo',
    courseDessert: 'Eftirréttur / Dolce',
  },
  uk: {
    quickDateLabel: 'Дата і час',
    quickVenueLabel: 'Точна адреса',
    quickMusicLabel: 'Артист і музика',
    quickAccessLabel: 'Вік і вхід',
    quickDressLabel: 'Тема і дрескод',
    quickPriceLabel: 'Офіційні ціни',
    tocHeading: 'Зміст сторінки · Старий Новий рік JustMe 2027',
    tocLabels: [
      '1. Програма ночі 13 січня',
      '2. Меню Silver 60€ і Gold 80€',
      '3. Квитки Xceed (20€) і VIP-столи',
      '4. Дрескод і приз гори 4*',
      '5. Умови оплати (100% передплата)',
      '6. Метро і карта · JustMe Torre Branca',
      '7. Часті запитання (12 FAQ)',
    ],
    menusHeading: 'Офіційне гала-меню · Silver 60€ і Gold Морепродукти 80€ (19:30)',
    menusSubheading: 'Сервірована вечеря в теплому скляному павільйоні з входом на вечірку до 05:00',
    silverLabel: 'Меню Silver · 60€',
    goldLabel: 'Меню Gold Морепродукти · 80€',
    beveragesNote: 'Включено до столу: 1 пляшка води та 1 пляшка вина на кожні 4 гості + вхід у клуб',
    ticketsHeading: 'Офіційні квитки (Xceed 251019) і VIP Privé столи',
    ticketsSubheading: 'Квитки Клуб 20€ і вечері 60€/80€ на Xceed або VIP бронювання у WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé столи біля танцполу й пульта DJ 24/7 через WhatsApp +39 351 912 7047.',
    timelineHeading: 'Таймінг ночі · 13–14 січня 2027',
    timelineSubheading: 'Від італійської вечері о 19:30 до тосту опівночі та вечірки до 05:00',
    timelineTitles: [
      '19:30 · Збір гостей на вечері Silver і Gold',
      '22:45 · Завершення вечері та зміна світла',
      '23:30 · Вхід Клуб + 1 напій (квиток Xceed 20€)',
      '00:00 · Тост на Старий Новий рік і DJ Nazar Radchuk',
      '01:30–05:00 · Нагородження тижня в горах 4* і танці',
    ],
    dressOkTitle: 'Рекомендований стиль',
    dressNoTitle: 'Заборонено на вході (21+)',
    logisticsHeading: 'Як дістатися до JustMe Milano · Метро і Парко Семпіоне',
    mapHeading: 'Карта і координати · Viale Luigi Camoens 2',
    faqHeading: 'Часті запитання · Старий Новий рік JustMe 2027',
    dec31Eyebrow: '31 Грудня 2026 · Новий Рік',
    dec31Title: 'Шукаєте також Новий рік 31 грудня в JustMe Milano?',
    dec31Cta: 'Дивитись 31 грудня JustMe',
    courseStarter: 'Закуски / Antipasto',
    courseFirst: 'Перша страва / Primo',
    courseSecond: 'Основна страва / Secondo',
    courseDessert: 'Десерт / Dolce',
  },
  sq: {
    quickDateLabel: 'Data dhe Orari',
    quickVenueLabel: 'Adresa e Saktë',
    quickMusicLabel: 'DJ i Ftuar dhe Muzika',
    quickAccessLabel: 'Mosha dhe Hyrja',
    quickDressLabel: 'Tema dhe Veshja',
    quickPriceLabel: 'Çmimet Zyrtare',
    tocHeading: 'Indeksi i Faqes · Viti i Ri Ortodoks JustMe 2027',
    tocLabels: [
      '1. Përmbledhje dhe Orari i Natës',
      '2. Menutë Gala Silver 60€ dhe Gold 80€',
      '3. Biletat Xceed (20€) dhe Tavolinat VIP',
      '4. Konkursi i Veshjes dhe Kodi i Stilit',
      '5. Kushtet e Pagesës (100% Parapagim)',
      '6. Metroja dhe Harta · Torre Branca',
      '7. Pyetje të Shpeshta (12 FAQ)',
    ],
    menusHeading: 'Menutë Zyrtare Gala · Silver 60€ dhe Gold Fruta Deti 80€ (19:30)',
    menusSubheading: 'Darkë e shërbyer në pavijonin e ngrohur prej xhami me hyrje të plotë në festë',
    silverLabel: 'Menuja Silver · 60€',
    goldLabel: 'Menuja Gold Fruta Deti · 80€',
    beveragesNote: 'Përfshirë në tavolinë: 1 shishe ujë dhe 1 shishe verë për çdo 4 të ftuar + hyrje në klub',
    ticketsHeading: 'Biletat Zyrtare (Xceed 251019) dhe Tavolinat VIP Privé',
    ticketsSubheading: 'Rezervo biletat Club 20€ dhe darkat 60€/80€ në Xceed ose VIP në WhatsApp 24/7',
    vipConciergeNote: 'Tavolina VIP Privé 24/7 me konfirmim të menjëhershëm në WhatsApp +39 351 912 7047.',
    timelineHeading: 'Programi i Natës · 13–14 Janar 2027',
    timelineSubheading: 'Nga darka në 19:30 te dolli i mesnatës ortodokse dhe muzika deri në 05:00',
    timelineTitles: [
      '19:30 · Pritja për Darkat Gala Silver dhe Gold',
      '22:45 · Kalimi nga Shërbimi i Darkës në Festë',
      '23:30 · Hyrja Club + 1 Pije (Bileta Xceed 20€)',
      '00:00 · Dolli i Vitit të Ri Ortodoks dhe DJ Nazar Radchuk',
      '01:30–05:00 · Çmimi 1 Javë në Mal 4* dhe Klubi',
    ],
    dressOkTitle: 'Stili i Rekomanduar',
    dressNoTitle: 'Nuk Lejohet në Hyrje (21+)',
    logisticsHeading: 'Si të Shkoni te JustMe Milano · Metro dhe Parco Sempione',
    mapHeading: 'Koordinatat GPS dhe Harta · Viale Luigi Camoens 2',
    faqHeading: 'Pyetje të Shpeshta · Viti i Ri Ortodoks JustMe 2027',
    dec31Eyebrow: '31 Dhjetor 2026 · Viti i Ri',
    dec31Title: 'Po kërkoni edhe natën e 31 Dhjetorit në JustMe Milano?',
    dec31Cta: 'Shiko 31 Dhjetorin JustMe',
    courseStarter: 'Antipasta / Antipasto',
    courseFirst: 'Pjata e Parë / Primo',
    courseSecond: 'Pjata Kryesore / Secondo',
    courseDessert: 'Ëmbëlsira / Dolce',
  },
  sr: {
    quickDateLabel: 'Datum i satnica',
    quickVenueLabel: 'Tačna adresa',
    quickMusicLabel: 'Guest Star i muzika',
    quickAccessLabel: 'Uzrast i ulaz',
    quickDressLabel: 'Tema i dress code',
    quickPriceLabel: 'Zvanične cene',
    tocHeading: 'Sadržaj stranice · Srpska Nova Godina JustMe 2027',
    tocLabels: [
      '1. Pregled i satnica večeri',
      '2. Gala meniji Silver 60€ i Gold 80€',
      '3. Xceed ulaznice (20€) i VIP stolovi',
      '4. Konkurs za 7 dana na planini 4*',
      '5. Uslovi plaćanja (100% unapred)',
      '6. Metro i mapa · Torre Branca',
      '7. Često postavljana pitanja (12 FAQ)',
    ],
    menusHeading: 'Zvanični gala meniji · Silver 60€ i Gold Morski plodovi 80€ (19:30)',
    menusSubheading: 'Poslužena večera u grejanom staklenom paviljonu sa uključenim ulazom na žurku do 05:00',
    silverLabel: 'Silver Meni · 60€',
    goldLabel: 'Gold Morski Meni · 80€',
    beveragesNote: 'Uključeno za stolom: 1 flaša vode i 1 flaša vina na svake 4 osobe + žurka do jutra',
    ticketsHeading: 'Zvanične ulaznice (Xceed 251019) i VIP Privé stolovi',
    ticketsSubheading: 'Kupovina Club 20€ i večera 60€/80€ na Xceed-u ili VIP rezervacija na WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé stolovi uz podijum i DJ pult dostupni 24/7 preko WhatsAppa +39 351 912 7047.',
    timelineHeading: 'Satnica noći · Sreda 13. – Četvrtak 14. januar 2027.',
    timelineSubheading: 'Od svečane večere u 19:30 do ponoćne zdravice za Srpsku Novu Godinu i 05:00',
    timelineTitles: [
      '19:30 · Dolazak na gala večere Silver i Gold',
      '22:45 · Prijelaz iz večere u klupski šou',
      '23:30 · Club ulaz + 1 piće (Xceed 20€)',
      '00:00 · Ponoćno odbrojavanje i DJ Nazar Radchuk',
      '01:30–05:00 · Dodela 4* nagrade i provod do jutra',
    ],
    dressOkTitle: 'Preporučeni stil',
    dressNoTitle: 'Nije dozvoljeno na ulazu (21+)',
    logisticsHeading: 'Kako doći do JustMe Milano · Metro i Parco Sempione',
    mapHeading: 'GPS koordinate i mapa · Viale Luigi Camoens 2',
    faqHeading: 'Često postavljana pitanja · Srpska Nova Godina JustMe 2027',
    dec31Eyebrow: '31. decembar 2026. · Doček',
    dec31Title: 'Tražite li i doček 31. decembra u JustMe Milano?',
    dec31Cta: 'Pogledaj 31. decembar JustMe',
    courseStarter: 'Predjelo / Antipasto',
    courseFirst: 'Prvo jelo / Primo',
    courseSecond: 'Glavno jelo / Secondo',
    courseDessert: 'Dezert / Dolce',
  },
  bs: {
    quickDateLabel: 'Datum i satnica',
    quickVenueLabel: 'Tačna adresa',
    quickMusicLabel: 'Guest Star i muzika',
    quickAccessLabel: 'Dob i ulaz',
    quickDressLabel: 'Tema i dress code',
    quickPriceLabel: 'Zvanične cijene',
    tocHeading: 'Sadržaj vodiča · Pravoslavna Nova Godina JustMe 2027',
    tocLabels: [
      '1. Pregled i raspored večeri',
      '2. Gala meniji Silver 60€ i Gold 80€',
      '3. Xceed karte (20€) i VIP stolovi',
      '4. Nagrada 7 dana na planini i dress code',
      '5. Uslovi plaćanja (100% unaprijed)',
      '6. Metro i karta · Torre Branca',
      '7. Često postavljana pitanja (12 FAQ)',
    ],
    menusHeading: 'Zvanični gala meniji · Silver 60€ i Gold Morski plodovi 80€ (19:30)',
    menusSubheading: 'Servirana večera u grijanom staklenom paviljonu s uključenim partyjem do 05:00',
    silverLabel: 'Silver Meni · 60€',
    goldLabel: 'Gold Morski Meni · 80€',
    beveragesNote: 'Uključeno za stolom: 1 boca vode i 1 boca vina na svake 4 osobe + ulaz u klub',
    ticketsHeading: 'Zvanične karte (Xceed 251019) i VIP Privé stolovi',
    ticketsSubheading: 'Karte Club 20€ i večere 60€/80€ na Xceedu ili VIP rezervacija na WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé stolovi uz podijum i DJ pult dostupni 24/7 putem WhatsAppa +39 351 912 7047.',
    timelineHeading: 'Raspored večeri · Srijeda 13. – Četvrtak 14. januar 2027.',
    timelineSubheading: 'Od svečane večere u 19:30 do ponoćne zdravice i DJ seta do 05:00 ujutro',
    timelineTitles: [
      '19:30 · Dolazak na gala večere Silver i Gold',
      '22:45 · Prijelaz rasvjete u klupski program',
      '23:30 · Club ulaz + 1 piće (Xceed 20€)',
      '00:00 · Ponoćno odbrojavanje i DJ Nazar Radchuk',
      '01:30–05:00 · Dodjela 4* nagrade i zabava do zore',
    ],
    dressOkTitle: 'Preporučeni stil',
    dressNoTitle: 'Nije dozvoljeno na ulazu (21+)',
    logisticsHeading: 'Dolazak u JustMe Milano · Metro i Parco Sempione',
    mapHeading: 'GPS koordinate i karta · Viale Luigi Camoens 2',
    faqHeading: 'Često postavljana pitanja · Pravoslavna Nova Godina JustMe 2027',
    dec31Eyebrow: '31. decembar 2026. · Doček',
    dec31Title: 'Tražite i doček 31. decembra u JustMe Milano?',
    dec31Cta: 'Pogledaj 31. decembar JustMe',
    courseStarter: 'Predjelo / Antipasto',
    courseFirst: 'Prvo jelo / Primo',
    courseSecond: 'Glavno jelo / Secondo',
    courseDessert: 'Dezert / Dolce',
  },
  mk: {
    quickDateLabel: 'Датум и време',
    quickVenueLabel: 'Точна адреса',
    quickMusicLabel: 'Гостин DJ и музика',
    quickAccessLabel: 'Возраст и влез',
    quickDressLabel: 'Тема и дрескод',
    quickPriceLabel: 'Официјални цени',
    tocHeading: 'Содржина на водичот · Стара Нова Година JustMe 2027',
    tocLabels: [
      '1. Преглед и распоред на ноќта',
      '2. Гала менија Silver 60€ и Gold 80€',
      '3. Билети Xceed (20€) и VIP маси',
      '4. Конкурс за награда планина 4*',
      '5. Услови за плаќање (100% однапред)',
      '6. Метро и карта · Torre Branca',
      '7. Често поставувани прашања (12 FAQ)',
    ],
    menusHeading: 'Официјални гала менија · Silver 60€ и Gold Морски плодови 80€ (19:30)',
    menusSubheading: 'Сервирана вечера во загреаниот стаклен павилјон со вклучена забава до 05:00',
    silverLabel: 'Мени Silver · 60€',
    goldLabel: 'Мени Gold Морски плодови · 80€',
    beveragesNote: 'Вклучено на маса: 1 шише вода и 1 шише вино на секои 4 гости + влез во клуб',
    ticketsHeading: 'Официјални билети (Xceed 251019) и VIP Privé маси',
    ticketsSubheading: 'Билети Клуб 20€ и вечери 60€/80€ на Xceed или VIP резервација на WhatsApp 24/7',
    vipConciergeNote: 'VIP Privé маси со понуда 24/7 преку WhatsApp +39 351 912 7047.',
    timelineHeading: 'Распоред на вечерта · Среда 13 – Четврток 14 јануари 2027',
    timelineSubheading: 'Од вечерата во 19:30 до полноќната здравица за Стара Нова Година и до 05:00',
    timelineTitles: [
      '19:30 · Пречек за гала вечери Silver и Gold',
      '22:45 · Премин кон клубско осветлување',
      '23:30 · Влез Клуб + 1 пијалак (Xceed 20€)',
      '00:00 · Полноќна здравица и DJ Nazar Radchuk',
      '01:30–05:00 · Доделување одмор 4* и танц до зори',
    ],
    dressOkTitle: 'Препорачан стил',
    dressNoTitle: 'Забрането на влез (21+)',
    logisticsHeading: 'Како да стигнете до JustMe Milano · Метро и Parco Sempione',
    mapHeading: 'GPS координати и карта · Viale Luigi Camoens 2',
    faqHeading: 'Често поставувани прашања · Стара Нова Година JustMe 2027',
    dec31Eyebrow: '31 Декември 2026 · Нова Година',
    dec31Title: 'Го барате ли и пречекот на 31 декември во JustMe Milano?',
    dec31Cta: 'Погледни 31 декември JustMe',
    courseStarter: 'Предјадење / Antipasto',
    courseFirst: 'Прво јадење / Primo',
    courseSecond: 'Главно јадење / Secondo',
    courseDessert: 'Десерт / Dolce',
  },
};

function getSharedChrome(locale: LocaleCode): SharedChrome {
  return {
    isIt: locale === 'it',
    ...SHARED_CHROME_35[locale],
  };
}

function buildMultilingualNarrativeAndFaqs(
  loc: LocaleCode,
  core: CoreLocalePack,
): {
  overviewParagraphs: string[];
  contestParagraphs: string[];
  logisticsParagraphs: string[];
  faqs: OrthodoxFaqItem[];
  silverCourses: OrthodoxCourseItem[];
  goldCourses: OrthodoxCourseItem[];
  dressOkItems: string[];
  dressNoItems: string[];
  vipBullets: string[];
  clubBullets: string[];
  silverBullets: string[];
  goldBullets: string[];
  timelineDetails: [string, string, string, string, string];
  contestPrizeDetails: string;
} {
  const isIt = loc === 'it';
  const isZh = loc === 'zh';

  const silverCourses: OrthodoxCourseItem[] = isIt
    ? [
        {
          course: 'Antipasto (Tris di Apertura)',
          dish: 'Parmigiana di Melanzane Classica, Branzino New Style e Spring Rolls',
          details:
            'Tre assaggi serviti in apertura per unire tradizione mediterranea e note contemporanee: melanzane grigliate con pomodoro e mozzarella filante, branzino marinato agrumato e involtini croccanti dorati.',
        },
        {
          course: 'Primo Piatto',
          dish: 'Risotto ai Crostacei e Zucchine Nane in Fiore',
          details:
            'Risotto espresso mantecato alla bisque di crostacei dell’Adriatico con punte croccanti di zucchine novelle e fiori di zucca freschi.',
        },
        {
          course: 'Dessert',
          dish: 'Cheesecake al Pistacchio e Granella di Nocciola',
          details:
            'Dolce cremoso al cucchiaio su base croccante con crema di pistacchio verde e nocciola tostata in chiusura di cena.',
        },
      ]
    : isZh
      ? [
          {
            course: '头盘组合 · Antipasto Tris',
            dish: '经典意式烤茄子千层 Parmigiana di Melanzane Classica · 新派烤海鲈 Branzino New Style · 香酥春卷 Spring Rolls',
            details:
              '三重精选开胃前菜融合地中海经典风味与现代料理手法：香浓番茄马苏里拉烤茄子千层、柑橘柠檬调味新派鲜嫩海鲈鱼片以及金黄酥脆手工春卷。',
          },
          {
            course: '主食热菜 · Primo Piatto',
            dish: '甲壳海鲜浓汤意式烩饭配小翠瓜花 Risotto ai Crostacei e Zucchine Nane in Fiore',
            details:
              '现煮卡纳罗利意大利米充分吸收现熬海鲜高汤香气，搭配爽脆当季嫩西葫芦及新鲜西葫芦花，呈现饱满海洋层次。',
          },
          {
            course: '餐后甜品 · Dessert',
            dish: '开心果芝士蛋糕配烘烤榛子碎 Cheesecake al Pistacchio e Granella di Nocciola',
            details:
              '丝滑浓郁意式开心果奶油芝士慕斯结合松脆焦糖饼底与现烤榛子碎，在优雅格调中开启午夜庆典。',
          },
        ]
      : [
          {
            course: 'Opening Tasting · Antipasto',
            dish: 'Parmigiana di Melanzane Classica, Branzino New Style & Spring Rolls',
            details:
              'Signature trio of Italian and international starters pairing slow-baked eggplant parmigiana with citrus-dressed new-style sea bass and crisp golden spring rolls.',
          },
          {
            course: 'First Course · Primo Piatto',
            dish: 'Risotto ai Crostacei e Zucchine Nane in Fiore',
            details:
              'Slow-simmered shellfish bisque Carnaroli risotto finished with tender baby courgettes and delicate courtyard blossoms.',
          },
          {
            course: 'Dessert · Dolce',
            dish: 'Cheesecake al Pistacchio e Granella di Nocciola',
            details:
              'Velvety pistachio cheesecake layered over an artisanal biscuit base with roasted hazelnut crumble.',
          },
        ];

  const goldCourses: OrthodoxCourseItem[] = isIt
    ? [
        {
          course: 'Antipasto Gran Crudo & Mare',
          dish: 'Catalana di Mare all’Olio e Limone, Tacos di Tonno con Burrata e Caviale, Tataki di Salmone',
          details:
            'Percorso di apertura interamente dedicato al mare: crostacei e pesce scottato in citronette mediterranea, tacos croccanti con tartare di tonno fresco, crema di burrata e caviale, più tataki di salmone scottato ai semi.',
        },
        {
          course: 'Primo Piatto',
          dish: 'Pacchero Scampi e Funghi Porcini',
          details:
            'Pasta artigianale di Gragnano mantecata con code di scampi freschi e profumati funghi porcini di stagione.',
        },
        {
          course: 'Secondo Piatto',
          dish: 'Trancio di Salmone al Miso e Ikura',
          details:
            'Filetto di salmone scottato alla piastra con glassatura leggera al miso bianco dolce e perle sapide di uova di salmone Ikura.',
        },
        {
          course: 'Dessert',
          dish: 'Ciambella Amarena, Mascarpone e Cioccolato Fuso',
          details:
            'Soffice anello di pasticceria servito con mousse leggera al mascarpone, riduzione di amarene sciroppate e colata di cioccolato fondente fuso.',
        },
      ]
    : isZh
      ? [
          {
            course: '海鲜豪华前菜 · Antipasto di Mare',
            dish: '柠檬橄榄油海鲜沙律 Catalana di Mare all Olio e Limone · 金枪鱼布拉塔鱼子酱塔可 Tacos di Tonno Burrata e Caviale · 炙烤三文鱼塔塔基 Tataki di Salmone',
            details:
              '三款奢华海鲜冷热前菜一次呈现：地中海特级初榨橄榄油鲜虾贝类沙拉、松脆塔可盛装生鲜金枪鱼配合意式布拉塔奶酪与鱼子酱、外焦里嫩黑芝麻炙烤三文鱼。',
          },
          {
            course: '手工意面 · Primo Piatto',
            dish: '海鳌虾牛肝菌粗管手工面 Pacchero Scampi e Funghi Porcini',
            details:
              '精选意大利大号粗管意面充分裹住新鲜海鳌虾鲜甜酱汁与当季野生牛肝菌浓香，口感弹牙醇厚。',
          },
          {
            course: '精致主菜 · Secondo Piatto',
            dish: '白味噌煎三文鱼柳佐三文鱼籽 Trancio di Salmone al Miso e Ikura',
            details:
              '香煎挪威三文鱼厚切配温润甜味白味噌釉汁，点缀晶莹饱满的红鲑鱼籽 Ikura，口感丰富细腻。',
          },
          {
            course: '主厨甜点 · Dessert',
            dish: '黑樱桃马斯卡彭熔岩巧克力甜甜圈 Ciambella Amarena Mascarpone e Cioccolato Fuso',
            details:
              '松软手工烘焙甜点搭配轻盈马斯卡彭奶油慕斯、意式黑樱桃蜜饯以及温热黑巧克力熔岩淋酱。',
          },
        ]
      : [
          {
            course: 'Seafood Starters · Antipasto',
            dish: 'Catalana di Mare all’Olio e Limone, Tacos di Tonno con Burrata e Caviale & Tataki di Salmone',
            details:
              'Haute seafood opening combining chilled Mediterranean catalana salad in lemon olive oil, crisp tuna tartare tacos topped with creamy burrata and caviar, and seared salmon tataki.',
          },
          {
            course: 'First Course · Primo Piatto',
            dish: 'Pacchero Scampi e Funghi Porcini',
            details:
              'Large bronze-die Gragnano paccheri pasta glazed in sweet langoustine scampi reduction and aromatic Italian porcini mushrooms.',
          },
          {
            course: 'Main Course · Secondo Piatto',
            dish: 'Trancio di Salmone al Miso e Ikura',
            details:
              'Pan-seared prime salmon fillet finished with delicate sweet white miso glaze and bursting Ikura salmon roe.',
          },
          {
            course: 'Dessert · Dolce',
            dish: 'Ciambella Amarena, Mascarpone e Cioccolato Fuso',
            details:
              'Artisan pastry ring layered with airy mascarpone cream, tart sour-cherry reduction, and warm melted dark chocolate.',
          },
        ];

  const overviewParagraphs: string[] = isIt
    ? [
        core.leadIntro,
        core.extraNativeParagraph,
        'Alle 19:30 si aprono le porte del padiglione riscaldato per gli ospiti delle cene servite Silver (60€) e Gold di Pesce (80€), entrambe con acqua, vino (1 bottiglia ogni 4 commensali) e permanenza inclusa per tutta la notte senza costi aggiuntivi. Alle 23:30 il club entra nel vivo con il pass da 20€ (1 drink incluso) e i tavoli VIP Privé pronti a celebrare il countdown della mezzanotte ortodossa tra il 13 e il 14 gennaio 2027 fino alle 05:00.',
        'La consolle vede protagonista il Guest Star DJ Nazar Radchuk con un viaggio musicale tra House internazionale, Hip-Hop elegante e grandi hit da cantare insieme. L’accesso è rigorosamente riservato a un pubblico adulto 21+ con look curato e dettaglio rosso o luminoso in omaggio al tema Il ritorno di Cappuccetto Rosso.',
      ]
    : isZh
      ? [
          core.leadIntro,
          core.extraNativeParagraph,
          '2027年1月13日 星期三 19:30 起，选择 Silver 60€ 银牌晚宴 或 Gold 80€ 金牌海鲜晚宴 的宾客将率先入席恒温玻璃景观大厅，享受 1 瓶水与 1 瓶葡萄酒每 4 位宾客的服务标准，并自动保留通宵派对入场资格。至 23:30 主场夜店正式开启，购买 20€ Xceed 官方门票 (含 1 杯鸡尾酒饮品) 的宾客与 VIP Privé 卡座贵宾齐聚舞池，迎接儒略历午夜新年倒计时，狂欢持续至次日凌晨 05:00。',
          '特邀明星 DJ Nazar Radchuk 全程掌舵音乐节奏，流畅串联 House 浩室电子、时尚 Hip-Hop 嘻哈及全球流行派对热曲。入场宾客需年满 21 周岁并遵守优雅着装标准，同时可搭配红色时尚单品或发光亮眼配饰参与最佳造型竞赛，赢取 4 星级高山度假公寓 1 周住宿奖励。',
        ]
      : [
          core.leadIntro,
          core.extraNativeParagraph,
          'Doors open at 19:30 for seated Silver Gala (€60) and Gold Seafood Gala (€80) guests inside the heated architectural glass pavilion. Every dinner reservation includes one bottle of water and one bottle of wine per four guests plus uninterrupted admission to the club night. From 23:30 onward, €20 Xceed Club + 1 Drink ticket holders and VIP Privé bottle tables fill the dancefloor for the Julian New Year midnight toast and party until 05:00.',
          'Behind the decks beneath the suspended mirror spheres and violet-lit Torre Branca lattice, Guest Star DJ Nazar Radchuk curates an energetic progression across House, Hip-Hop, and global anthems tailored for an international 21+ crowd dressed in winter elegance with subtle red or glowing accents.',
        ];

  const contestParagraphs: string[] = isIt
    ? [
        'L’edizione 2027 del Capodanno Ortodosso al JustMe Milano ruota attorno al tema scenografico «Il ritorno di Cappuccetto Rosso». L’organizzazione richiede un abbigliamento elegante e invernale di fascia alta, arricchito da almeno un capo rosso oppure un accessorio luminoso capace di risaltare sotto le luci del parco.',
        'Durante la notte il team di direzione artistica selezionerà l’outfit più originale e luminoso tra i partecipanti presenti in sala: in palio c’è un soggiorno premio di 1 settimana in montagna presso un residence a 4 stelle.',
        'Per garantire un ingresso sereno alla selezione porta (rigorosamente 21+) è fondamentale evitare capi sportivi, tute, sneakers usurati o borse voluminose: per gli uomini sono consigliati camicia, dolcevita sartoriale o blazer con pantaloni eleganti; per le donne abiti da sera, velluto rosso, seta nera o accessori scintillanti.',
      ]
    : isZh
      ? [
          '2027 年 JustMe Milano 东正教新年夜以 “Il ritorno di Cappuccetto Rosso 小红帽归来” 为核心艺术主题。场地要求所有宾客保持高水准冬季优雅正装仪态，并鼓励在造型中加入红色时尚元素、丝绒礼服配饰或精致发光亮片饰品，在灯光折射下成为全场焦点。',
          '午夜庆典过后，现场艺术评审团队将在大厅与舞池嘉宾中评选出当晚最具创意、最亮眼的 “最佳着装造型 (Most Original & Radiant Look)”，获奖嘉宾将直接赢取 4 星级山地度假公寓 1 周豪华住宿体验券。',
          '由于俱乐部严格执行 21+ 门禁挑选标准 (Selezione all ingresso 21+)，建议男士着衬衫、羊绒高领衫搭配剪裁西装长裤与整洁皮鞋；女士优先选择丝绒晚礼裙、红丝绸披肩、质感高跟鞋及小巧派对晚宴包。严禁穿戴运动卫衣、破洞牛仔裤、运动短裤或双肩背包入场。',
        ]
      : [
          'The 2027 Orthodox New Year theme «Il ritorno di Cappuccetto Rosso» invites guests to elevate Milanese winter eveningwear with a signature red garment or a subtle glowing accessory that catches the mirrored ceiling and violet park light.',
          'At the peak of the night after the midnight toast, the JustMe Milano artistic jury awards the most original and radiant look on site with a full one-week mountain vacation stay in a 4-star Alpine residence.',
          'Door selection is strictly 21+ and smart-elegant: gentlemen are expected to wear tailored trousers, structured blazers or fine knitwear with dress shoes or pristine luxury sneakers, while ladies shine in velvet, crimson silk, tailored winter coats, and evening heels.',
        ];

  const logisticsParagraphs: string[] = isIt
    ? [
        'JustMe Milano si trova in Viale Luigi Camoens 2, all’interno di Parco Sempione direttamente sotto la Torre Branca (108 metri), a pochi minuti a piedi dal Castello Sforzesco e da Triennale Milano. La struttura è completamente al coperto e riscaldata per la stagione invernale.',
        'Con i mezzi pubblici di mercoledì sera si raggiunge facilmente tramite la metropolitana M1 Rossa e M2 Verde fermata Cadorna FN (6 minuti a piedi attraversando Piazzale Cadorna e Viale Milton) oppure M2 Lanza Brera (7 minuti a piedi costeggiando l’Arena Civica). In taxi o NCC è sufficiente indicare «Torre Branca, Viale Camoens 2».',
      ]
    : isZh
      ? [
          'JustMe Milano 坐落于米兰市中心绿肺 Parco Sempione 公园内部 Viale Luigi Camoens 2 号，正对百年地标斯福尔扎城堡 Castello Sforzesco 与高度达 108 米 的灯光铁塔 Torre Branca。全透明玻璃穹顶在 1 月 冬季配备完善供暖系统，既能饱览公园夜景又温暖舒适。',
          '公共交通前往极为便利：乘坐米兰地铁 M1 红线或 M2 绿线至 Cadorna FN 站下车步行约 6 分钟，或乘 M2 绿线至 Lanza 站步行约 7 分钟即可抵达正门台阶。乘坐出租车或私人商务专车只需向司机告知目的地 JustMe Milano Torre Branca Viale Luigi Camoens 2 即可直达入口。',
        ]
      : [
          'JustMe Milano sits inside historic Parco Sempione at Viale Luigi Camoens 2, immediately beneath Gio Ponti’s illuminated 108m Torre Branca tower and a short walk from Castello Sforzesco. The winter structure is a fully enclosed, heated glass-and-steel pavilion.',
          'Guests arriving on Wednesday night can take Metro M1 (Red) or M2 (Green) to Cadorna FN (6-minute walk across Piazzale Cadorna) or M2 Lanza (7-minute walk past Triennale Milano). For taxis and private chauffeurs, set drop-off to «JustMe Milano, Torre Branca, Viale Luigi Camoens 2».',
        ];

  const baseExtraFaqs: OrthodoxFaqItem[] = isIt
    ? [
        {
          q: 'Dove si trova esattamente JustMe Milano e il locale è riscaldato il 13 gennaio?',
          a: 'JustMe Milano si trova in Viale Luigi Camoens 2 nel Parco Sempione sotto la Torre Branca (20121 Milano). In inverno l’intera veranda in vetro e acciaio è chiusa, isolata e riscaldata, perfetta sia per le cene delle 19:30 sia per il club fino alle 05:00.',
        },
        {
          q: 'Qual è la scaletta musicale e chi suona al Capodanno Ortodosso 2027?',
          a: 'Ospite speciale in consolle è DJ Nazar Radchuk con un repertorio pensato per un pubblico internazionale: hit mondiali da cantare, hip hop e house fino alle 05:00 del mattino.',
        },
        {
          q: 'Come funziona la prenotazione dei Tavoli VIP Privé e i termini di pagamento?',
          a: 'Si contatta il Concierge WhatsApp +39 351 912 7047 (attivo 24/24, 7 su 7) indicando numero di persone e orario: ricevuta conferma della disponibilità, la prenotazione si fissa con prepagamento al 100% via Stripe, bonifico bancario o link di pagamento, invio ricevuta al concierge, conferma di incasso ed email finale con i dati tavolo.',
        },
        {
          q: 'Qual è l’età minima richiesta e quali documenti servono all’ingresso?',
          a: 'L’ingresso al Capodanno Ortodosso 2027 al JustMe Milano è riservato ai maggiori di 21 anni (21+). È obbligatorio esibire un documento fisico originale in corso di validità (carta d’identità, passaporto o patente).',
        },
        {
          q: 'Cosa succede ai tavoli della cena quando inizia la discoteca alle 23:30?',
          a: 'Chi prenota il Menu Silver (60€) o il Menu Gold (80€) alle 19:30 ha il biglietto della serata club già incluso e può restare al JustMe fino alle 05:00 senza supplementi di ingresso.',
        },
        {
          q: 'Il biglietto su Xceed da 20€ è ufficiale e sicuro?',
          a: 'Sì, il pulsante Xceed di Nightlife Milan punta direttamente all’evento ufficiale 251019 sul canale autorizzato nightlifemilan-1, con emissione istantanea del QR pass nominale.',
        },
        {
          q: 'Come si raggiunge JustMe Milano con la metro o in taxi di mercoledì notte?',
          a: 'Fermate metro M1/M2 Cadorna FN (6 min a piedi) e M2 Lanza (7 min). In taxi o NCC l’accesso carrabile per la sosta è su Viale Luigi Camoens angolo Viale Milton.',
        },
        {
          q: 'I menu Silver e Gold prevedono alternative per allergie o richieste alimentari?',
          a: 'Segnalando eventuali allergie, intolleranze o richieste vegetariane al Concierge su WhatsApp +39 351 912 7047 al momento della prenotazione della cena, la cucina JustMe prepara le variazioni dedicate per il vostro tavolo.',
        },
        {
          q: 'Si può pagare l’ingresso da 20€ direttamente con carta o bisogna acquistare prima?',
          a: 'La prevendita online su Xceed da 20€ (con 1 drink incluso) garantisce la tariffa bloccata ed evita rischi di esaurimento posti o prezzi maggiorati alla porta il 13 gennaio.',
        },
      ]
    : isZh
      ? [
          {
            q: 'JustMe Milano 冬季室内是否温暖？具体位于公园什么位置？',
            a: 'JustMe Milano 位于 Viale Luigi Camoens 2（Parco Sempione 公园内、Torre Branca 铁塔正下方）。冬季整个玻璃建筑大厅完全封闭并配备高效恒温暖气系统，晚宴和夜间舞池均保持温暖舒适的室内温度。',
          },
          {
            q: '1月13日 特邀嘉宾 DJ Nazar Radchuk 将呈现什么风格的音乐？',
            a: '特邀明星 DJ Nazar Radchuk 将主导整晚电音与派对现场，融合 House 浩室舞曲、时尚 Hip-Hop 嘻哈及全球流行金曲，营造兼具国际视野与节日氛围的高水准夜店声场。',
          },
          {
            q: '如何预订 VIP Privé 尊享卡座以及 100% 预付款确认流程是什么？',
            a: '请 24/7 全天候联系 WhatsApp 礼宾专线 +39 351 912 7047 说明人数与到场时间；确认实时空位后通过 Stripe、银行转账或付款链接完成 100% 预付款并回传凭证，随后立即收到礼宾收款确认及官方邮件凭据。',
          },
          {
            q: '派对入场是否有最低年龄限制和证件要求？',
            a: '是的，本场 2027 年 1 月 13 日 东正教新年夜严格执行 21 周岁以上 (21+) 入场规定，每位宾客必须携带有效的原件护照、意大利身份证或欧盟居留卡进行核验。',
          },
          {
            q: '预订 Silver 60€ 或 Gold 80€ 晚宴后是否需要另外购票参加夜店派对？',
            a: '无需额外购票。所有晚宴套票在享用完意式正餐后均直接包含 JustMe Milano 午夜新年派对入场资格，可持续狂欢至次日 05:00。',
          },
          {
            q: '通过本页面 Xceed 官方链接购票有哪些保障？',
            a: '页面直连官方授权通道 nightlifemilan-1（活动编号 251019），出票即刻生成官方电子二维码入场券，享受 20€、60€ 与 80€ 公开透明官方票价，零额外中介加价。',
          },
          {
            q: '周三夜晚从米兰市区前往 JustMe Milano 哪种交通最方便？',
            a: '推荐搭乘地铁 M1 红线 / M2 绿线至 Cadorna FN 站步行 6 分钟，或搭乘 M2 绿线至 Lanza 站步行 7 分钟；自驾或出租车直接导航 Viale Luigi Camoens 2 Torre Branca。',
          },
          {
            q: '对海鲜过敏或素食宾客预订 19:30 晚宴可以调整菜品吗？',
            a: '可以。在 WhatsApp 礼宾 +39 351 912 7047 确认席位时提前告知忌口或过敏成分，主厨团队将为您单独定制替代菜式。',
          },
          {
            q: '为什么建议提前锁定 20€ 早鸟派对票或桌位？',
            a: '每年 1 月 13 日 东正教新年夜皆为米兰国际社群最抢手的冬季包场盛会，提前在 Xceed 或 WhatsApp 锁定席位可确保 20€ 优惠价与快速通道入场权。',
          },
        ]
      : [
          {
            q: 'Where is JustMe Milano located and is the winter veranda heated on January 13?',
            a: 'JustMe Milano is located at Viale Luigi Camoens 2 inside Parco Sempione directly under Torre Branca (20121 Milan). In winter, the glass-and-steel pavilion is fully enclosed and heated for both 19:30 gala diners and 23:30–05:00 club guests.',
          },
          {
            q: 'Who is the guest DJ and what music genres will be played?',
            a: 'Guest Star DJ Nazar Radchuk headlines the booth with an international clubbing soundtrack blending House, Hip-Hop, and global party hits until 05:00 AM.',
          },
          {
            q: 'How do VIP Privé tables and the 6-step 100% prepayment confirmation work?',
            a: 'Message our 24/7 Concierge on WhatsApp +39 351 912 7047 with your party size; once availability is confirmed, complete 100% prepayment via Stripe, bank transfer, or payment link, send your receipt on the same number, and receive immediate confirmation plus the official email voucher.',
          },
          {
            q: 'What are the age requirement and ID rules at the door?',
            a: 'Entry is strictly 21+ on Wednesday January 13, 2027. Every guest must carry an original physical passport, EU national ID card, or valid driver’s license.',
          },
          {
            q: 'Do Silver (€60) and Gold (€80) dinner guests need a separate ticket for the club after midnight?',
            a: 'No. Both seated dinner options automatically include full club admission until 05:00 AM at no extra door charge.',
          },
          {
            q: 'Are Xceed tickets booked from this page official?',
            a: 'Yes. Every Xceed link on Nightlife Milan connects directly to the authorized channel nightlifemilan-1 for Event #251019, issuing official nominal QR passes with zero agency surcharge.',
          },
          {
            q: 'How do I reach JustMe Milano by Milan Metro or taxi on Wednesday night?',
            a: 'Take Metro M1/M2 to Cadorna FN (6 min walk) or M2 to Lanza (7 min walk), or ask your taxi/NCC driver for «JustMe Milano, Torre Branca, Viale Camoens 2».',
          },
          {
            q: 'Can dietary restrictions or seafood allergies be accommodated for the 19:30 dinners?',
            a: 'Yes. Inform our Concierge on WhatsApp +39 351 912 7047 before arriving so the JustMe kitchen can prepare tailored substitutions for your table.',
          },
          {
            q: 'Should guests book the €20 Xceed Club Pass in advance?',
            a: 'Booking the €20 Club + 1 Drink pass online on Xceed guarantees the official presale price and priority entry before capacity or door rates increase on Jan 13.',
          },
        ];

  const faqs: OrthodoxFaqItem[] = [...core.nativeFaqs, ...baseExtraFaqs];

  return {
    overviewParagraphs,
    contestParagraphs,
    logisticsParagraphs,
    faqs,
    silverCourses,
    goldCourses,
    dressOkItems: isIt
      ? [
          'Abito da sera o completo elegante (obbligatorio)',
          'Capo rosso o accessorio luminoso per il tema e il concorso',
          'Camicia, dolcevita sartoriale o blazer per uomo',
          'Scarpe eleganti o luxury sneakers pulite (21+)',
        ]
      : isZh
        ? [
            '正装 晚礼服 或 剪裁 西装 套装 (男士 衬衫 / 羊毛 高领衫 / 西装外套)',
            '搭配 红色 时尚 单品 或 发光 亮眼 配饰 参与 主题 评奖',
            '整洁 正装 皮鞋 或 高端 简洁 皮质 休闲鞋',
          ]
        : [
            'Elegant evening wear or tailored winter blazer & shirt (21+)',
            'Crimson red garment or luminous/glowing accessory for the theme',
            'Dress shoes, heeled boots, or clean luxury evening footwear',
          ],
    dressNoItems: isIt
      ? [
          'Tute sportive, felpe con cappuccio, streetwear trasandato',
          'Pantaloni corti, scarpe sporche o abbigliamento da palestra',
          'Ingresso vietato ai minori di 21 anni (documento fisico richiesto)',
        ]
      : isZh
        ? [
            '严禁 运动 套装、连帽 卫衣、短裤 及 磨损 运动鞋',
            '谢绝 携带 大型 双肩背包 或 运动 提包 入场',
            '未满 21 周岁 禁止 入场 (需 出示 原件 有效 护照 或 身份证)',
          ]
        : [
            'Sportswear, tracksuits, hoodies, shorts, or worn athletic sneakers',
            'Oversized backpacks or gym bags',
            'Under-21 entry (original physical photo ID strictly verified)',
          ],
    clubBullets: isIt
      ? [
          'Ingresso garantito dalle 23:30 fino alle 05:00',
          '1 drink incluso alla cassa principale o bar',
          'DJ set Nazar Radchuk: International Hits, Hip-Hop & House',
          'Accesso valido al concorso miglior look Cappuccetto Rosso',
        ]
      : isZh
        ? [
            '23:30 起 优先 入场 至 次日 05:00 闭场',
            '含 1 杯 指定 标准 鸡尾酒 或 酒精 饮品',
            '全程 畅享 DJ Nazar Radchuk House、Hip-Hop 及 热门 金曲 现场',
            '同步 参与 最佳 主题 造型 4 星级 山地 度假 大奖 评选',
          ]
        : [
            'Club admission from 23:30 till 05:00 closing',
            '1 welcome drink included on entry',
            'Full Guest Star set by DJ Nazar Radchuk (House, Hip-Hop, Hits)',
            'Eligible for the Best Look 4-star mountain stay award',
          ],
    silverBullets: isIt
      ? [
          'Cena completa dalle 19:30 nel padiglione invernale riscaldato',
          'Antipasto Tris + Risotto ai Crostacei e Zucchine Nane + Cheesecake al Pistacchio',
          '1 bottiglia d’acqua & 1 bottiglia di vino ogni 4 persone incluse',
          'Permanenza completa in discoteca per il party inclusa',
        ]
      : isZh
        ? [
            '19:30 入席 恒温 冬季 玻璃 景观 餐厅',
            '含 三拼 前菜、甲壳 海鲜 意式 烩饭 与 开心果 芝士 蛋糕',
            '每 4 位 宾客 配备 1 瓶 饮用水 与 1 瓶 葡萄酒',
            '晚餐 后 自动 保留 全场 跨年 夜店 派对 资格',
          ]
        : [
            'Seated 19:30 dinner inside the heated glass pavilion',
            'Starter Trio + Crustacean Risotto + Pistachio & Hazelnut Cheesecake',
            '1 bottle of water & 1 bottle of wine included per 4 guests',
            'Includes full stay for the late-night party until 05:00',
          ],
    goldBullets: isIt
      ? [
          'Percorso Gourmet di Mare dalle 19:30 con servizio dedicato',
          'Catalana di Mare, Tacos Tonno Burrata & Caviale, Tataki Salmone',
          'Pacchero Scampi e Porcini + Salmone al Miso & Ikura + Ciambella Amarena',
          '1 acqua & 1 vino ogni 4 ospiti + ingresso party incluso',
        ]
      : isZh
        ? [
            '19:30 尊享 海鲜 晚宴 四道式 定制 餐单',
            '含 海鲜 沙律、金枪鱼 布拉塔 鱼子酱 塔可、三文鱼 塔塔基',
            '配 海鳌虾 牛肝菌 面、白味噌 三文鱼 佐 鱼子 及 熔岩 甜点',
            '含 水酒 配套 每 4 人 1 水 1 酒 及 通宵 派对 入场',
          ]
        : [
            'Complete 4-course seafood dinner from 19:30',
            'Catalana Salad, Tuna & Caviar Tacos, Salmon Tataki, Scampi Paccheri',
            'Miso-Glazed Salmon & Ikura + Amarena & Mascarpone Chocolate Ring',
            '1 water & 1 wine per 4 guests + full club admission included',
          ],
    vipBullets: isIt
      ? [
          'Tavoli Privé rialzati in pista o zona Console DJ su prenotazione',
          'Ingresso saltafoda VIP dedicato senza attesa alle porte',
          'Servizio bottiglie personalizzato con ghiacciaia LED e hostess',
          'Conferma immediata 24/7 via WhatsApp +39 351 912 7047',
        ]
      : isZh
        ? [
            '位于 主舞池 核心区 或 DJ 台 近距离 区域 的 VIP Privé 专属 沙发 卡座',
            '享受 VIP 贵宾 专属 快速 通道 免排队 礼遇',
            '配备 发光 LED 冰桶 香槟 洋酒 套装 与 专属 礼宾 服务',
            '通过 WhatsApp +39 351 912 7047 获得 24/7 实时 空位 与 报价 确认',
          ]
        : [
            'Reserved VIP Privé booths overlooking main dancefloor & DJ console',
            'Priority dedicated VIP entrance with zero queue wait',
            'Custom bottle packages with illuminated LED ice buckets',
            'Real-time availability & confirmation 24/7 via WhatsApp +39 351 912 7047',
          ],
    timelineDetails: isIt
      ? [
          'Accoglienza dedicata nel padiglione invernale riscaldato sotto la Torre Branca e servizio dei menu Silver (60€) e Gold (80€) con vini abbinati.',
          'Conclusione dei dessert e trasformazione luminosa della veranda a specchi con scenografia «Il ritorno di Cappuccetto Rosso».',
          'Apertura porte per i possessori di pass Club + 1 Drink (20€ su Xceed) e arrivo dei tavoli VIP Privé in pista e console.',
          'Countdown e brindisi di mezzanotte ortodosso accompagnato dal live set di Guest Star DJ Nazar Radchuk tra House, Hip-Hop e Hit internazionali.',
          'Proclamazione del look più originale e luminoso vincitore della settimana in residence 4 stelle in montagna e party fino alle 05:00.',
        ]
      : isZh
        ? [
            '19:30 迎接 预订 Silver 60€ 与 Gold 80€ 晚宴 的 宾客 入席 Torre Branca 下方 恒温 玻璃 餐厅，按 桌 供应 现煮 意式 美食 与 配餐 葡萄酒。',
            '22:45 晚宴 甜点 阶段 完成，全场 镜面 玻璃 大厅 转换 灯光 氛围，开启 “Il ritorno di Cappuccetto Rosso” 艺术 视觉 布置。',
            '23:30 全面 开放 20€ Club + 1 Drink 持票 宾客 与 VIP Privé 贵宾 卡座 通道，确保 午夜 前 顺畅 入场。',
            '00:00 共同 迎来 东正教 新年 午夜 倒计时 祝酒 时刻，特邀 明星 DJ Nazar Radchuk 奏响 House、Hip-Hop 与 全球 热门 金曲。',
            '01:30-05:00 现场 公布 最佳 创意 发光 造型 得主 (赠送 4 星级 山地 度假 公寓 1 周 住宿)，夜店 音乐 盛典 持续 至 清晨 05:00。',
          ]
        : [
            'Seated welcome in the heated winter glass pavilion beneath Torre Branca for Silver (€60) and Gold (€80) three- and four-course gala service.',
            'Dessert transition as the mirrored pavilion shifts lighting toward the «Il ritorno di Cappuccetto Rosso» nightclub production.',
            'Main nightclub doors open for €20 Club + 1 Drink Xceed ticket holders and arriving VIP Privé table parties.',
            'Midnight Orthodox New Year toast followed by Guest Star DJ Nazar Radchuk blending House, Hip-Hop, and international anthems.',
            'Live selection of the Best Original & Luminous Look winning 1 week at a 4-star mountain residence, with dancing until 05:00.',
          ],
    contestPrizeDetails: isIt
      ? 'Indossa un abito elegante con dettaglio rosso o accessorio luminoso: l’outfit più originale e brillante vince una vacanza di 1 settimana in residence 4 stelle in montagna.'
      : isZh
        ? '盛装 出席 并 搭配 红色 单品 或 发光 配饰：当晚 最 具 创意 与 耀眼 的 造型 将 获赠 4 星级 高山 度假 公寓 1 周 住宿 大奖。'
        : 'Pair winter evening elegance with a red piece or glowing accessory: the most original and radiant look wins a 1-week mountain holiday in a 4-star residence.',
  };
}

let _cache35: Record<LocaleCode, OrthodoxNyeJustMeContent> | null = null;

function buildAll35(): Record<LocaleCode, OrthodoxNyeJustMeContent> {
  if (_cache35) return _cache35;
  const out = {} as Record<LocaleCode, OrthodoxNyeJustMeContent>;

  for (const loc of enabledLocaleCodes) {
    const core = CORE_35[loc];
    const chrome = getSharedChrome(loc);
    const rich = buildMultilingualNarrativeAndFaqs(loc, core);

    out[loc] = {
      metaTitle: core.metaTitle,
      metaDescription: core.metaDescription,
      breadcrumbHome: core.homeLabel,
      breadcrumbEvents: core.eventsLabel,
      breadcrumbSpecial: core.specialLabel,
      h1: core.h1,
      subtitle: core.subtitle,
      themeTag: core.themeTag,
      dateBadge: core.dateBadge,
      priceBadge: core.priceBadge,
      ageDressBadge: core.ageDressBadge,
      description: core.leadIntro,
      xceedCtaLabel: core.xceedCtaLabel,
      whatsappCtaLabel: core.whatsappCtaLabel,
      whatsappContext: `${core.h1} · JustMe Milano (13 Jan 2027)`,
      quickFacts: [
        { label: chrome.quickDateLabel, value: core.dateBadge },
        { label: chrome.quickVenueLabel, value: `${ORTHODOX_NYE_JUSTME_VENUE.name} · ${ORTHODOX_NYE_JUSTME_VENUE.address}` },
        { label: chrome.quickMusicLabel, value: 'Guest Star DJ Nazar Radchuk · House, Hip-Hop & Hits' },
        { label: chrome.quickAccessLabel, value: core.ageDressBadge },
        { label: chrome.quickDressLabel, value: core.themeTag },
        { label: chrome.quickPriceLabel, value: core.priceBadge },
      ],
      tocTitle: chrome.tocHeading,
      tocItems: [
        { id: 'overview', label: chrome.tocLabels[0] },
        { id: 'menus', label: chrome.tocLabels[1] },
        { id: 'tickets-vip', label: chrome.tocLabels[2] },
        { id: 'contest-dresscode', label: chrome.tocLabels[3] },
        { id: 'payment-terms', label: chrome.tocLabels[4] },
        { id: 'venue-map', label: chrome.tocLabels[5] },
        { id: 'faq', label: chrome.tocLabels[6] },
      ],
      overviewHeading: chrome.tocLabels[0].replace(/^\d+\.\s*/, ''),
      overviewParagraphs: rich.overviewParagraphs,
      timelineHeading: chrome.timelineHeading,
      timelineSubheading: chrome.timelineSubheading,
      timelineSteps: [
        { time: '19:30', title: chrome.timelineTitles[0], detail: rich.timelineDetails[0] },
        { time: '22:45', title: chrome.timelineTitles[1], detail: rich.timelineDetails[1] },
        { time: '23:30', title: chrome.timelineTitles[2], detail: rich.timelineDetails[2] },
        { time: '00:00', title: chrome.timelineTitles[3], detail: rich.timelineDetails[3] },
        { time: '01:30–05:00', title: chrome.timelineTitles[4], detail: rich.timelineDetails[4] },
      ],
      menusHeading: chrome.menusHeading,
      menusSubheading: chrome.menusSubheading,
      silverMenuTitle: chrome.silverLabel,
      silverMenuPrice: '60€',
      silverBeverages: chrome.beveragesNote,
      silverCourses: rich.silverCourses,
      silverMenuAlt: `${core.h1} · ${chrome.silverLabel} (60€) · ${ORTHODOX_NYE_JUSTME_VENUE.name}`,
      goldMenuTitle: chrome.goldLabel,
      goldMenuPrice: '80€',
      goldBeverages: chrome.beveragesNote,
      goldCourses: rich.goldCourses,
      goldMenuAlt: `${core.h1} · ${chrome.goldLabel} (80€) · ${ORTHODOX_NYE_JUSTME_VENUE.name}`,
      ticketsHeading: chrome.ticketsHeading,
      ticketsSubheading: chrome.ticketsSubheading,
      tiers: [
        {
          id: 'club-20',
          title: core.clubTierTitle,
          price: '20€',
          badge: 'Xceed #251019 · On Sale',
          summary: `${core.priceBadge} · 23:30–05:00`,
          bullets: rich.clubBullets,
          action: 'xceed',
        },
        {
          id: 'silver-60',
          title: core.silverTierTitle,
          price: '60€',
          badge: '19:30 Dinner + Party',
          summary: chrome.beveragesNote,
          bullets: rich.silverBullets,
          action: 'xceed',
        },
        {
          id: 'gold-80',
          title: core.goldTierTitle,
          price: '80€',
          badge: '19:30 Seafood Gala + Party',
          summary: chrome.beveragesNote,
          bullets: rich.goldBullets,
          action: 'xceed',
        },
        {
          id: 'vip-prive',
          title: core.vipTierTitle,
          price: 'WhatsApp 24/7',
          badge: 'VIP Concierge · +39 351 912 7047',
          summary: chrome.vipConciergeNote,
          bullets: rich.vipBullets,
          action: 'whatsapp',
        },
      ],
      vipConciergeNote: chrome.vipConciergeNote,
      contestHeading: core.contestTitle,
      contestSubheading: core.themeTag,
      contestParagraphs: rich.contestParagraphs,
      contestPrizeBadge: core.contestPrizeBadge,
      contestPrizeTitle: 'Il ritorno di Cappuccetto Rosso · 4-Star Mountain Residence',
      contestPrizeDetails: rich.contestPrizeDetails,
      dressCodeOkTitle: chrome.dressOkTitle,
      dressCodeOkItems: rich.dressOkItems,
      dressCodeNoTitle: chrome.dressNoTitle,
      dressCodeNoItems: rich.dressNoItems,
      logisticsHeading: chrome.logisticsHeading,
      logisticsParagraphs: rich.logisticsParagraphs,
      logisticsFacts: [
        { label: chrome.quickVenueLabel, value: ORTHODOX_NYE_JUSTME_VENUE.address },
        { label: 'Metro', value: 'M1 / M2 Cadorna FN (6 min) · M2 Lanza (7 min)' },
        { label: 'Taxi / NCC', value: 'JustMe Milano · Torre Branca · Viale Luigi Camoens 2' },
        { label: 'Concierge 24/7', value: '+39 351 912 7047 · concierge@nightlifemilan.com' },
      ],
      venueBannerEyebrow: ORTHODOX_NYE_JUSTME_VENUE.name,
      venueBannerTitle: `${ORTHODOX_NYE_JUSTME_VENUE.name} · ${ORTHODOX_NYE_JUSTME_VENUE.district}`,
      venueBannerDesc: `${ORTHODOX_NYE_JUSTME_VENUE.address} · 7/7 Winter Glass Pavilion & Torre Branca Garden`,
      venueBannerCta: core.venueCta,
      dec31BannerEyebrow: chrome.dec31Eyebrow,
      dec31BannerTitle: chrome.dec31Title,
      dec31BannerDesc: `${ORTHODOX_NYE_JUSTME_VENUE.name} · Gatsby NYE 2027 (31 Dec 2026) · Parco Sempione`,
      dec31BannerCta: chrome.dec31Cta,
      mapHeading: chrome.mapHeading,
      faqHeading: chrome.faqHeading,
      faqs: rich.faqs,
      shotLabels: core.heroLabels,
      highlights: [
        `${ORTHODOX_NYE_JUSTME_VENUE.name} (${ORTHODOX_NYE_JUSTME_VENUE.address})`,
        core.dateBadge,
        'Guest Star DJ Nazar Radchuk · House, Hip-Hop & International Hits',
        `${core.priceBadge} · Xceed #251019`,
      ],
      priceSummary: `${core.priceBadge} · ${chrome.beveragesNote}`,
    };
  }

  _cache35 = out;
  return _cache35;
}

export function getOrthodoxNyeJustMeContent(locale: string): OrthodoxNyeJustMeContent {
  const map = buildAll35();
  return map[(locale as LocaleCode) in map ? (locale as LocaleCode) : 'en'];
}

export function getJustMeOrthodoxRelatedBanner(locale: string): CapodannoRelatedHolidayBanner {
  const core = CORE_35[(locale as LocaleCode) in CORE_35 ? (locale as LocaleCode) : 'en'];
  return {
    badge: core.dec31BannerBadge,
    title: core.dec31BannerTitle,
    description: core.dec31BannerDesc,
    href: orthodoxNyeJustMePath(locale),
    ctaLabel: core.dec31BannerCta,
  };
}
