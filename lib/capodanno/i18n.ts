import { capodannoNavigation } from '@/lib/capodanno/routes';
import {
  getRepvblicNyeContent,
  type CapodannoLocalizedEventContent,
} from '@/lib/capodanno/repvblic35';
import { getPinetaNyeContent } from '@/lib/capodanno/pineta35';
import { getVoyaNyeContent } from '@/lib/capodanno/voya35';
import { getBischeriNyeContent } from '@/lib/capodanno/bischeri35';
import { getBobinoNyeContent } from '@/lib/capodanno/bobino35';
import { getGateNyeContent } from '@/lib/capodanno/gate35';
import { getTomNyeContent } from '@/lib/capodanno/tom35';
import { getTerrazzaDuomo21NyeContent } from '@/lib/capodanno/terrazzaDuomo21_35';
import { getCeresio7ClosedNyeContent } from '@/lib/capodanno/ceresio7Closed35';
import { getT031OverrideContent } from '@/lib/capodanno/t031Venues35';
import { getWhatsappVenueNyeContent } from '@/lib/capodanno/whatsappVenues35';
import { getWaVerifiedNov22Content } from '@/lib/capodanno/waVerifiedNov22_35';
import { getQcTermeAndSirmioneOverride35 } from '@/lib/capodanno/qcTermeTba35';
import { getChurch81NyeContent, getFiftyFiveNyeContent } from '@/lib/capodanno/church81And55_35';
import {
  buildFallbackLocalizedEventContent35,
  formatCapodannoHours35,
  formatCapodannoPriceBadge35,
  getCapodannoCategoryBadge35,
  getCapodannoCategoryQuickAnswer35,
  getCapodannoCategoryShortLabel35,
  getCapodannoDetailFaqs35,
  getCapodannoFilterOptions35,
  getCapodannoHubFaqs35,
  getWords35,
} from '@/lib/capodanno/capodannoUi35';

export { formatCapodannoHours35 };
import { getJustMeOrthodoxRelatedBanner } from '@/lib/orthodox-nye/justme35';
import type { CapodannoCategoryPageDef, CapodannoEventItem } from '@/lib/capodannoEvents';
import { SITE_CONTACT } from '@/config/contact';

const DANGLING_WORDS = new Set([
  'sotto', 'vista', 'con', 'per', 'di', 'da', 'in', 'su', 'a', 'e', 'ed', 'o',
  'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'del', 'della', 'dei', 'degli', 'delle',
  'al', 'allo', 'alla', 'ai', 'agli', 'alle', 'dal', 'dalla', 'nel', 'nella', 'sul', 'sulla',
  'under', 'with', 'for', 'and', 'or', 'the', 'of', 'in', 'on', 'at', 'to', 'from', 'by', '&',
  'en', 'de', 'el', 'la', 'los', 'las', 'con', 'para', 'por', 'sur', 'dans', 'avec', 'pour',
  'und', 'mit', 'für', 'im', 'in', 'am', 'auf', 'unter', 'em', 'com', 'para', 'no', 'na',
]);

export function cleanCapodannoSeoTitle(input: string, maxChars = 62): string {
  const normalized = input.replace(/\s+/g, ' ').trim();
  if (!normalized) return 'Capodanno Milano 2027';
  let candidate = normalized;
  if (candidate.length > maxChars) {
    const sliced = candidate.slice(0, maxChars);
    const lastSpace = sliced.lastIndexOf(' ');
    candidate = lastSpace >= 24 ? sliced.slice(0, lastSpace) : sliced;
  }
  const words = candidate.split(' ').map((w) => w.replace(/[,.:;|\-–\u2014]+$/g, '')).filter(Boolean);
  while (words.length > 3 && DANGLING_WORDS.has(words[words.length - 1].toLowerCase())) {
    words.pop();
  }
  const result = words.join(' ').replace(/[,.:;|\-–\u2014]+$/g, '').trim();
  return result.length >= 20 ? result : normalized.slice(0, maxChars).trim();
}

export function buildCapodannoMetaDescription(
  summary: string,
  locale: string,
  ctaSuffix?: string,
): string {
  const cleanSummary = summary.replace(/\s+/g, ' ').trim();
  const ui = getCapodannoUiCopy(locale);
  const suffix = ctaSuffix || `${ui.metaCtaLabel}: WhatsApp ${SITE_CONTACT.whatsapp.number}.`;
  const maxBody = Math.max(45, 160 - suffix.length - 1);
  let body = cleanSummary;
  if (body.length > maxBody) {
    const cut = body.slice(0, maxBody);
    const sp = cut.lastIndexOf(' ');
    body = (sp > 35 ? cut.slice(0, sp) : cut).replace(/[,.:;|\-–\u2014]+$/g, '').trim() + '.';
  } else if (!/[.!?]$/.test(body)) {
    body += '.';
  }
  return `${body} ${suffix}`.slice(0, 165).trim();
}

export type CapodannoUiCopy = {
  eventsBreadcrumb: string;
  verifiedEventsLabel: string;
  tocTitle: string;
  tocCategories: string;
  tocFilter: string;
  tocCatalog: string;
  tocTable: string;
  tocMap: string;
  tocFaq: string;
  tocProgram: string;
  tocPrices: string;
  tocBooking: string;
  tocRelated: string;
  quickGuideLabel: string;
  whatsappConciergeBtn: string;
  callNowBtn: string;
  emailBtn: string;
  freeAdviceNote: string;
  categoryBoxEyebrow: string;
  categoryBoxHeading: string;
  filterEyebrow: string;
  filterHeadingPrefix: string;
  resetFiltersBtn: string;
  tableHeadingPrefix: string;
  colVenue: string;
  colCity: string;
  colHours: string;
  colPrices: string;
  mapHeadingHub: string;
  mapSubtitleHub: string;
  faqHeadingPrefix: string;
  programHeading: string;
  musicLabel: string;
  pricesHeadingPrefix: string;
  bookingHeading: string;
  bookingSubtitle: string;
  backToAllBtn: string;
  mapHeadingEvent: string;
  relatedHeading: string;
  metaCtaLabel: string;
  dateBadge: string;
  tocMenuLabel: string;
  freeEntryLabel: string;
  uponRequestLabel: string;
  fromPricePrefix: string;
  dressCodeLabel: string;
  closedDec31Jan3Badge: string;
  closedNye2027Badge: string;
  soldOutNye2027Badge: string;
  confirmedAlternativesHeading: string;
  officialConditionsHeading: string;
  officialConditionsEyebrow: string;
  sisterVenueMilanLabel: string;
  sisterVenueMilanDesc: string;
  officialVenueGuideLabel: string;
  officialVenueGuideDescTpl: string;
  confirmedVenuesBanner: string;
  viewPackagesCta: string;
  addressLabel: string;
  hoursLabel: string;
  priceTiersHeading: string;
  terrazzaBookingHeading: string;
  terrazzaBookingSubtitle: string;
  guestSingular: string;
  guestPlural: string;
  officialDirectTicketingEyebrow: string;
  bookPackagesOnlinePrefix: string;
  categoryTitles: Record<string, string>;
  categorySubtitles: Record<string, string>;
};

export {
  formatCapodannoPriceBadge35,
  getCapodannoCategoryBadge35,
  getCapodannoCategoryQuickAnswer35,
  getCapodannoCategoryShortLabel35,
  getCapodannoDetailFaqs35,
  getCapodannoFilterOptions35,
  getCapodannoHubFaqs35,
};

const CATEGORY_LABELS_BY_LOCALE: Record<string, Record<string, string>> = {
  es: {
    'capodanno-2027': 'Eventos de Nochevieja en Milán y Lombardía 2027: Los 124 Eventos, Discotecas, Rooftops y Cenas',
    'capodanno-rooftop-milano': 'Nochevieja en Terrazas Rooftop en Milán 2027: Vistas al Duomo y Rascacielos',
    'capodanno-discoteche-milano': 'Nochevieja en Discotecas y Clubs de Milán 2027: Entradas y Mesas VIP',
    'capodanno-locali-cenone-milano': 'Nochevieja con Cena de Gala y Dinner Show en Milán 2027',
    'capodanno-hotel-5-stelle-ville-castelli': 'Nochevieja en Hoteles 5 Estrellas, Villas y Castillos en Milán 2027',
    'capodanno-coppie-romantico-milano': 'Nochevieja Romántica para Parejas en Milán 2027: Cenas, Rooftops y Spa',
    'capodanno-single-milano': 'Nochevieja para Solteros y Grupos en Milán 2027: Fiestas y Clubs',
    'capodanno-famiglie-bambini-milano': 'Nochevieja en Familia con Niños en Milán 2027: Espectáculos y Plazas',
    'capodanno-over-30-40-milano': 'Nochevieja para Mayores de 30 y 40 Años en Milán 2027: Gala y Lounge',
    'capodanno-techno-elettronica-milano': 'Nochevieja Techno y Música Electrónica en Milán 2027: Clubs y Warehouses',
    'capodanno-latino-reggaeton-hiphop-milano': 'Nochevieja Latina, Reggaeton y Hip-Hop en Milán 2027',
    'capodanno-economico-low-cost-milano': 'Nochevieja Económica y Low Cost en Milán 2027: Fiestas desde 0€ a 35€',
    'capodanno-terme-spa-baita-montagna': 'Nochevieja en Termas, Spa y Cabañas de Montaña en Lombardía 2027',
    'capodanno-speciale': 'Nochevieja Especial en Milán 2027: Tranvía Histórico, Barco Navigli y Teatro',
    'capodanno-lombardia': 'Nochevieja en Lombardía 2027: Lagos de Como y Garda, Bergamo, Brescia y Alpes',
    'capodanno-in-piazza': 'Nochevieja en las Plazas de Milán y Lombardía 2027: Conciertos Gratis',
  },
  fr: {
    'capodanno-2027': 'Événements du Nouvel An à Milan et en Lombardie 2027 : Les 124 Soirées, Clubs et Rooftops',
    'capodanno-rooftop-milano': 'Nouvel An sur les Rooftops et Terrasses Panoramiques de Milan 2027',
    'capodanno-discoteche-milano': 'Nouvel An en Discothèque et Club à Milan 2027 : Soirées et Tables VIP',
    'capodanno-locali-cenone-milano': 'Réveillon du Nouvel An avec Dîner de Gala et Dinner Show à Milan 2027',
    'capodanno-hotel-5-stelle-ville-castelli': 'Nouvel An dans les Hôtels 5 Étoiles, Villas et Châteaux à Milan 2027',
    'capodanno-coppie-romantico-milano': 'Nouvel An Romantique en Couple à Milan 2027 : Dîners aux Chandelles et Rooftops',
    'capodanno-single-milano': 'Nouvel An pour Célibataires et Groupes d’Amis à Milan 2027',
    'capodanno-famiglie-bambini-milano': 'Nouvel An en Famille avec Enfants à Milan 2027 : Spectacles et Places',
    'capodanno-over-30-40-milano': 'Nouvel An 30+ et 40+ à Milan 2027 : Soirées Élégantes et Dîners Spectacles',
    'capodanno-techno-elettronica-milano': 'Nouvel An Techno et Électro à Milan 2027 : Megaclubs et Warehouses',
    'capodanno-latino-reggaeton-hiphop-milano': 'Nouvel An Latino, Reggaeton et Hip-Hop à Milan 2027',
    'capodanno-economico-low-cost-milano': 'Nouvel An Pas Cher et Petit Budget à Milan 2027 : Soirées de 0€ à 35€',
    'capodanno-terme-spa-baita-montagna': 'Nouvel An aux Thermes, Spa et Chalets de Montagne en Lombardie 2027',
    'capodanno-speciale': 'Nouvel An Insolite à Milan 2027 : Tram Historique, Croisière Navigli et Gala',
    'capodanno-lombardia': 'Nouvel An en Lombardie 2027 : Lac de Côme, Lac de Garde et Alpes',
    'capodanno-in-piazza': 'Nouvel An sur les Places de Milan et Lombardie 2027 : Concerts Gratuits',
  },
  de: {
    'capodanno-2027': 'Silvester-Veranstaltungen in Mailand & Lombardei 2027: Alle 124 Partys, Clubs & Galadinner',
    'capodanno-rooftop-milano': 'Silvester auf Rooftop-Terrassen in Mailand 2027: Dom-Blick & Skyline',
    'capodanno-discoteche-milano': 'Silvester in Clubs und Diskotheken in Mailand 2027: Tickets & VIP-Tische',
    'capodanno-locali-cenone-milano': 'Silvester Galadinner und Dinner-Show in Mailand 2027',
    'capodanno-hotel-5-stelle-ville-castelli': 'Silvester in 5-Sterne-Hotels, Villen und Schlössern in Mailand 2027',
    'capodanno-coppie-romantico-milano': 'Romantisches Silvester für Paare in Mailand 2027: Rooftops, Spa & Galadinner',
    'capodanno-single-milano': 'Silvester für Singles und Freundesgruppen in Mailand 2027',
    'capodanno-famiglie-bambini-milano': 'Silvester mit Familie und Kindern in Mailand 2027: Shows & Plätze',
    'capodanno-over-30-40-milano': 'Silvester Ü30 und Ü40 in Mailand 2027: Exklusive Galas & Lounges',
    'capodanno-techno-elettronica-milano': 'Techno & Electronic Silvester in Mailand 2027: Clubs & Arenas',
    'capodanno-latino-reggaeton-hiphop-milano': 'Latin, Reggaeton & Hip-Hop Silvester in Mailand 2027',
    'capodanno-economico-low-cost-milano': 'Günstiges Low-Cost Silvester in Mailand 2027: Partys von 0€ bis 35€',
    'capodanno-terme-spa-baita-montagna': 'Silvester in Thermen, Spa und Berghütten in der Lombardei 2027',
    'capodanno-speciale': 'Besondere Silvester-Erlebnisse in Mailand 2027: Historische Straßenbahn & Boot',
    'capodanno-lombardia': 'Silvester in der Lombardei 2027: Comer See, Gardasee, Bergamo & Alpen',
    'capodanno-in-piazza': 'Silvester auf den Plätzen in Mailand 2027: Kostenlose Open-Air-Konzerte',
  },
  pt: {
    'capodanno-2027': 'Eventos de Réveillon em Milão e Lombardia 2027: Todos os 124 Eventos, Clubs e Rooftops',
    'capodanno-rooftop-milano': 'Réveillon nos Rooftops e Terraços Panorâmicos de Milão 2027',
    'capodanno-discoteche-milano': 'Réveillon nas Discotecas e Clubs de Milão 2027: Ingressos e Mesas VIP',
    'capodanno-locali-cenone-milano': 'Réveillon com Ceia de Gala e Dinner Show em Milão 2027',
    'capodanno-hotel-5-stelle-ville-castelli': 'Réveillon em Hotéis 5 Estrelas, Vilas e Castelos em Milão 2027',
    'capodanno-coppie-romantico-milano': 'Réveillon Romântico para Casais em Milão 2027: Ceias e Rooftops',
    'capodanno-single-milano': 'Réveillon para Solteiros e Grupos em Milão 2027',
    'capodanno-famiglie-bambini-milano': 'Réveillon em Família com Crianças em Milão 2027',
    'capodanno-over-30-40-milano': 'Réveillon 30+ e 40+ em Milão 2027: Jantares de Gala e Lounge Clubs',
    'capodanno-techno-elettronica-milano': 'Réveillon Techno e Música Eletrônica em Milão 2027',
    'capodanno-latino-reggaeton-hiphop-milano': 'Réveillon Latino, Reggaeton e Hip-Hop em Milão 2027',
    'capodanno-economico-low-cost-milano': 'Réveillon Econômico e Barato em Milão 2027: Festas de 0€ a 35€',
    'capodanno-terme-spa-baita-montagna': 'Réveillon em Termas, Spa e Chalés de Montanha na Lombardia 2027',
    'capodanno-speciale': 'Réveillon Especial em Milão 2027: Bonde Histórico, Barco nos Navigli e Gala',
    'capodanno-lombardia': 'Réveillon na Lombardia 2027: Lago de Como, Lago de Garda e Alpes',
    'capodanno-in-piazza': 'Réveillon nas Praças de Milão 2027: Concertos Gratuitos ao Ar Livre',
  },
};

export function getCapodannoUiCopy(locale: string): CapodannoUiCopy {
  const nav = capodannoNavigation(locale);
  const w = getWords35(locale);
  const extraFields = {
    tocMenuLabel: w.tocMenuLabel,
    freeEntryLabel: w.freeEntryLabel,
    uponRequestLabel: w.uponRequestLabel,
    fromPricePrefix: w.fromPricePrefix,
    dressCodeLabel: w.dressCodeLabel,
    closedDec31Jan3Badge: w.closedDec31Jan3Badge,
    closedNye2027Badge: w.closedNye2027Badge,
    soldOutNye2027Badge: w.soldOutNye2027Badge,
    confirmedAlternativesHeading: w.confirmedAlternativesHeading,
    officialConditionsHeading: w.officialConditionsHeading,
    officialConditionsEyebrow: w.officialConditionsEyebrow,
    sisterVenueMilanLabel: w.sisterVenueMilanLabel,
    sisterVenueMilanDesc: w.sisterVenueMilanDesc,
    officialVenueGuideLabel: w.officialVenueGuideLabel,
    officialVenueGuideDescTpl: w.officialVenueGuideDescTpl,
    confirmedVenuesBanner: w.confirmedVenuesBanner,
    viewPackagesCta: w.viewPackagesCta,
    addressLabel: w.addressLabel,
    hoursLabel: w.hoursLabel,
    priceTiersHeading: w.priceTiersHeading,
    terrazzaBookingHeading: w.terrazzaBookingHeading,
    terrazzaBookingSubtitle: w.terrazzaBookingSubtitle,
    guestSingular: w.guestSingular,
    guestPlural: w.guestPlural,
    officialDirectTicketingEyebrow: w.officialDirectTicketingEyebrow,
    bookPackagesOnlinePrefix: w.bookPackagesOnlinePrefix,
  };
  if (locale === 'it') {
    return {
      eventsBreadcrumb: 'Eventi',
      verifiedEventsLabel: 'EVENTI VERIFICATI',
      tocTitle: 'Indice dei Contenuti della Pagina',
      tocCategories: '1. Le 16 Categorie di Capodanno 2027',
      tocFilter: '2. Filtro Rapido per Target, Musica e Budget',
      tocCatalog: '3. Schede Locali, Prezzi e Formule',
      tocTable: '4. Tabella Comparativa Prezzi e Orari',
      tocMap: '5. Mappa Interattiva di Milano e Lombardia',
      tocFaq: '6. Domande Frequenti (FAQ)',
      tocProgram: '1. Programma, Atmosfera e Format della Serata',
      tocPrices: '2. Prezzi, Formule Cenone e Tavoli VIP',
      tocBooking: '3. Prenotazione Diretta WhatsApp e Contatti',
      tocRelated: '6. Eventi Correlati nella Stessa Categoria',
      quickGuideLabel: 'Guida Rapida & Prezzi',
      whatsappConciergeBtn: `Concierge WhatsApp (${SITE_CONTACT.whatsapp.number})`,
      callNowBtn: `Chiama ${SITE_CONTACT.whatsapp.number}`,
      emailBtn: 'Email Ufficiale',
      freeAdviceNote: 'Consulenza immediata per Coppie, Single, Gruppi, Famiglie, Cenoni e Tavoli VIP.',
      categoryBoxEyebrow: 'PAGINE CATEGORIA DEDICATE CAPODANNO 2027 (16 GUIDE TEMATICHE)',
      categoryBoxHeading: 'Scegli per Categoria: Rooftop, Discoteche, Locali Cenone, Coppie, Single, Famiglie, Over 30/40, Musica o Prezzo',
      filterEyebrow: 'FILTRO RAPIDO INTERATTIVO',
      filterHeadingPrefix: 'Filtra gli Eventi su Misura',
      resetFiltersBtn: 'Azzera Filtri ✕',
      tableHeadingPrefix: 'Tabella Comparativa Prezzi & Orari',
      colVenue: 'Evento / Locale',
      colCity: 'Città (Prov.)',
      colHours: 'Orari 31/12',
      colPrices: 'Prezzi e Formule',
      mapHeadingHub: 'Mappa Locali, Rooftop, Discoteche e Piazze di Capodanno a Milano',
      mapSubtitleHub: 'Posizione geografica dei principali poli di San Silvestro tra Duomo, Brera, Corso Como, Parco Sempione, Navigli e Porta Nuova.',
      faqHeadingPrefix: 'Domande Frequenti',
      programHeading: 'Programma, Atmosfera e Format della Serata',
      musicLabel: 'Selezione Musicale & Spettacolo',
      pricesHeadingPrefix: 'Prezzi, Formule e Tavoli VIP',
      bookingHeading: 'Prenota Ora con il Concierge Ufficiale (Zero Commissioni)',
      bookingSubtitle: 'Ricevi subito su WhatsApp, telefono o email il link di prevendita, il menu del Gran Cenone di San Silvestro o la mappa dei tavoli Privé.',
      backToAllBtn: '← Torna a Tutti i 124 Eventi di Capodanno',
      mapHeadingEvent: 'Mappa, Indirizzo e Come Arrivare',
      relatedHeading: 'Altri Eventi di Capodanno nella Stessa Categoria',
      metaCtaLabel: 'Info e prenotazioni',
      dateBadge: '31 Dicembre 2026 – 1 Gennaio 2027',
      ...extraFields,
      categoryTitles: {},
      categorySubtitles: {},
    };
  }

  if (locale === 'en') {
    return {
      eventsBreadcrumb: 'Events',
      verifiedEventsLabel: 'VERIFIED EVENTS',
      tocTitle: 'Page Table of Contents',
      tocCategories: '1. All 16 New Year’s Eve 2027 Categories',
      tocFilter: '2. Interactive Finder by Crowd, Music & Budget',
      tocCatalog: '3. Venue Cards, Packages & Official Prices',
      tocTable: '4. Full Price & Schedule Comparison Table',
      tocMap: '5. Interactive Map of Milan & Lombardy Venues',
      tocFaq: '6. Frequently Asked Questions (FAQ)',
      tocProgram: '1. Evening Program, Atmosphere & Format',
      tocPrices: '2. Official Prices, Gala Dinner & VIP Tables',
      tocBooking: '3. Instant WhatsApp Concierge & Direct Contacts',
      tocRelated: '6. Related New Year’s Eve Events in Milan',
      quickGuideLabel: 'Quick Guide & Pricing',
      whatsappConciergeBtn: `WhatsApp Concierge (${SITE_CONTACT.whatsapp.number})`,
      callNowBtn: `Call ${SITE_CONTACT.whatsapp.number}`,
      emailBtn: 'Official Email',
      freeAdviceNote: 'Free instant assistance for Couples, Singles, Groups, Families, Gala Dinners & VIP Tables.',
      categoryBoxEyebrow: 'DEDICATED NYE 2027 CATEGORY GUIDES (16 THEMATIC HUBS)',
      categoryBoxHeading: 'Browse by Category: Rooftops, Nightclubs, Dinner Venues, Couples, Singles, Families, 30+ Crowd, Music or Budget',
      filterEyebrow: 'INTERACTIVE EVENT FINDER',
      filterHeadingPrefix: 'Filter Events to Match Your Night',
      resetFiltersBtn: 'Reset Filters ✕',
      tableHeadingPrefix: 'Price & Schedule Comparison Table',
      colVenue: 'Event / Venue',
      colCity: 'City (Prov.)',
      colHours: 'Dec 31 Hours',
      colPrices: 'Prices & Packages',
      mapHeadingHub: 'Interactive Map of Milan New Year’s Eve Venues, Rooftops & Clubs',
      mapSubtitleHub: 'Explore the main New Year’s Eve districts across Piazza Duomo, Brera, Corso Como, Parco Sempione, Navigli, and Porta Nuova.',
      faqHeadingPrefix: 'Frequently Asked Questions',
      programHeading: 'Evening Program, Atmosphere & Format',
      musicLabel: 'Music & Entertainment',
      pricesHeadingPrefix: 'Prices, Packages & VIP Tables',
      bookingHeading: 'Book Now via Official Concierge (Zero Agency Fees)',
      bookingSubtitle: 'Receive the official ticket link, full New Year’s Eve gala dinner menu, or VIP table floor plan via WhatsApp, phone, or email.',
      backToAllBtn: '← Back to All 124 NYE Events',
      mapHeadingEvent: 'Venue Map, Address & Directions',
      relatedHeading: 'More New Year’s Eve Events in This Category',
      metaCtaLabel: 'Info & bookings',
      dateBadge: 'December 31, 2026 – January 1, 2027',
      ...extraFields,
      categoryTitles: {},
      categorySubtitles: {},
    };
  }

  const perLocale: Record<string, Partial<CapodannoUiCopy>> = {
    es: {
      eventsBreadcrumb: 'Eventos',
      verifiedEventsLabel: 'EVENTOS VERIFICADOS',
      tocTitle: 'Índice de Contenidos de la Página',
      tocCategories: '1. Las 16 Categorías de Nochevieja 2027',
      tocFilter: '2. Filtro Interactivo por Público, Música y Presupuesto',
      tocCatalog: '3. Catálogo de Locales, Cenas y Mesas VIP',
      tocTable: '4. Tabla Comparativa de Precios y Horarios',
      tocMap: '5. Mapa Interactivo de Milán y Lombardía',
      tocFaq: '6. Preguntas Frecuentes (FAQ)',
      tocProgram: '1. Programa, Ambiente y Formato de la Noche',
      tocPrices: '2. Precios, Cena de Gala y Mesas VIP',
      tocBooking: '3. Reserva Directa por WhatsApp y Contactos',
      tocRelated: '6. Otros Eventos de Nochevieja Relacionados',
      quickGuideLabel: 'Guía Rápida y Precios',
      categoryBoxEyebrow: 'GUÍAS DE CATEGORÍA NOCHEVIEJA 2027 (16 ESPECIALES)',
      categoryBoxHeading: 'Elige por Categoría: Terrazas Rooftop, Discotecas, Cenas de Gala, Parejas, Solteros, Familias, +30/+40 o Precio',
      filterEyebrow: 'BUSCADOR INTERACTIVO DE EVENTOS',
      filterHeadingPrefix: 'Filtra los Eventos a tu Medida',
      resetFiltersBtn: 'Restablecer Filtros ✕',
      tableHeadingPrefix: 'Tabla Comparativa de Precios y Horarios',
      colVenue: 'Evento / Local',
      colCity: 'Ciudad (Prov.)',
      colHours: 'Horario 31/12',
      colPrices: 'Precios y Fórmulas',
      mapHeadingHub: 'Mapa de Discotecas, Rooftops y Locales de Nochevieja en Milán',
      mapSubtitleHub: 'Ubicación de los principales eventos del 31 de diciembre entre Duomo, Brera, Corso Como, Sempione, Navigli y Porta Nuova.',
      faqHeadingPrefix: 'Preguntas Frecuentes sobre Nochevieja',
      programHeading: 'Programa, Ambiente y Formato de la Nochevieja',
      musicLabel: 'Música y Espectáculo',
      pricesHeadingPrefix: 'Precios, Paquetes y Mesas VIP',
      bookingHeading: 'Reserva Ahora con el Concierge Oficial (Sin Comisiones)',
      bookingSubtitle: 'Recibe al instante por WhatsApp, teléfono o email el enlace oficial de entradas, el menú de gala o el mapa de mesas VIP.',
      backToAllBtn: '← Volver a los 124 Eventos de Nochevieja',
      mapHeadingEvent: 'Mapa del Local, Dirección y Cómo Llegar',
      relatedHeading: 'Más Eventos de Nochevieja en Esta Categoría',
      metaCtaLabel: 'Info y reservas',
      dateBadge: '31 Diciembre 2026 – 1 Enero 2027',
    },
    fr: {
      eventsBreadcrumb: 'Événements',
      verifiedEventsLabel: 'ÉVÉNEMENTS VÉRIFIÉS',
      tocTitle: 'Sommaire de la Page',
      tocCategories: '1. Les 16 Catégories du Nouvel An 2027',
      tocFilter: '2. Filtre Interactif par Public, Musique et Budget',
      tocCatalog: '3. Catalogue des Clubs, Rooftops et Dîners',
      tocTable: '4. Tableau Comparatif des Tarifs et Horaires',
      tocMap: '5. Carte Interactive de Milan et de la Lombardie',
      tocFaq: '6. Questions Fréquentes (FAQ)',
      tocProgram: '1. Programme, Ambiance et Format de la Soirée',
      tocPrices: '2. Tarifs, Dîner du Réveillon et Tables VIP',
      tocBooking: '3. Réservation Directe WhatsApp et Contacts',
      tocRelated: '6. Autres Soirées du Nouvel An dans cette Catégorie',
      quickGuideLabel: 'Guide Rapide & Tarifs',
      categoryBoxEyebrow: 'GUIDES PAR CATÉGORIE NOUVEL AN 2027 (16 SÉLECTIONS)',
      categoryBoxHeading: 'Choisir par Catégorie : Rooftops, Discothèques, Dîners de Gala, Couples, Célibataires, Familles, 30+/40+ ou Budget',
      filterEyebrow: 'FILTRE INTERACTIF SUR MESURE',
      filterHeadingPrefix: 'Filtrer les Soirées du Réveillon',
      resetFiltersBtn: 'Réinitialiser ✕',
      tableHeadingPrefix: 'Tableau Comparatif des Tarifs et Horaires',
      colVenue: 'Soirée / Établissement',
      colCity: 'Ville (Prov.)',
      colHours: 'Horaires 31/12',
      colPrices: 'Tarifs & Formules',
      mapHeadingHub: 'Carte des Rooftops, Discothèques et Lieux du Nouvel An à Milan',
      mapSubtitleHub: 'Localisation des principales soirées du 31 décembre entre Duomo, Brera, Corso Como, Parco Sempione, Navigli et Porta Nuova.',
      faqHeadingPrefix: 'Questions Fréquentes sur le Nouvel An',
      programHeading: 'Programme, Ambiance et Format du Réveillon',
      musicLabel: 'Musique & Spectacle',
      pricesHeadingPrefix: 'Tarifs, Formules et Tables VIP',
      bookingHeading: 'Réservez via le Concierge Officiel WhatsApp (Zéro Commission)',
      bookingSubtitle: 'Recevez en temps réel par WhatsApp, téléphone ou e-mail les préventes officielles, le menu du réveillon ou le plan des tables VIP.',
      backToAllBtn: '← Retour aux 124 Événements du Nouvel An',
      mapHeadingEvent: 'Carte, Adresse et Accès',
      relatedHeading: 'Autres Soirées du Nouvel An dans Cette Catégorie',
      metaCtaLabel: 'Infos et réservations',
      dateBadge: '31 Décembre 2026 – 1 Janvier 2027',
    },
    de: {
      eventsBreadcrumb: 'Events',
      verifiedEventsLabel: 'GEPRÜFTE EVENTS',
      tocTitle: 'Inhaltsverzeichnis dieser Seite',
      tocCategories: '1. Alle 16 Silvester-Kategorien 2027',
      tocFilter: '2. Interaktiver Filter nach Zielgruppe, Musik & Budget',
      tocCatalog: '3. Übersicht der Clubs, Rooftops & Galadinner',
      tocTable: '4. Preis- und Zeitvergleichstabelle',
      tocMap: '5. Interaktive Karte von Mailand & Lombardei',
      tocFaq: '6. Häufig gestellte Fragen (FAQ)',
      tocProgram: '1. Programm, Atmosphäre & Abendformat',
      tocPrices: '2. Preise, Galadinner-Pakete & VIP-Tische',
      tocBooking: '3. Direktbuchung über WhatsApp Concierge & Kontakt',
      tocRelated: '6. Weitere Silvester-Events in dieser Kategorie',
      quickGuideLabel: 'Kurzübersicht & Preise',
      categoryBoxEyebrow: 'SILVESTER 2027 THEMEN-GUIDES (16 KATEGORIEN)',
      categoryBoxHeading: 'Nach Kategorie wählen: Rooftop-Terrassen, Clubs, Galadinner, Paare, Singles, Familien, Ü30/Ü40 oder Budget',
      filterEyebrow: 'INTERAKTIVER SILVESTER-FILTER',
      filterHeadingPrefix: 'Silvester-Events nach Wunsch filtern',
      resetFiltersBtn: 'Filter zurücksetzen ✕',
      tableHeadingPrefix: 'Preis- und Zeitvergleichstabelle',
      colVenue: 'Event / Location',
      colCity: 'Stadt (Prov.)',
      colHours: 'Zeiten 31.12.',
      colPrices: 'Preise & Pakete',
      mapHeadingHub: 'Interaktive Karte der Silvester-Locations, Rooftops & Clubs in Mailand',
      mapSubtitleHub: 'Standorte der wichtigsten Silvesterpartys rund um Dom, Brera, Corso Como, Parco Sempione, Navigli und Porta Nuova.',
      faqHeadingPrefix: 'Häufige Fragen zu Silvester in Mailand',
      programHeading: 'Programm, Atmosphäre & Ablauf des Silvesterabends',
      musicLabel: 'Musik & Entertainment',
      pricesHeadingPrefix: 'Preise, Pakete & VIP-Tische',
      bookingHeading: 'Jetzt über den offiziellen WhatsApp Concierge buchen (Ohne Gebühren)',
      bookingSubtitle: 'Erhalten Sie per WhatsApp, Telefon oder E-Mail den offiziellen Ticketlink, das Galadinner-Menü oder den VIP-Tischplan.',
      backToAllBtn: '← Zurück zu allen 124 Silvester-Events',
      mapHeadingEvent: 'Karte, Adresse & Anfahrt',
      relatedHeading: 'Weitere Silvester-Events in dieser Kategorie',
      metaCtaLabel: 'Infos & Reservierung',
      dateBadge: '31. Dezember 2026 – 1. Januar 2027',
    },
    pt: {
      eventsBreadcrumb: 'Eventos',
      verifiedEventsLabel: 'EVENTOS VERIFICADOS',
      tocTitle: 'Índice de Conteúdos da Página',
      tocCategories: '1. As 16 Categorias de Réveillon 2027',
      tocFilter: '2. Filtro Interativo por Público, Música e Preço',
      tocCatalog: '3. Catálogo de Locais, Ceias e Mesas VIP',
      tocTable: '4. Tabela Comparativa de Preços e Horários',
      tocMap: '5. Mapa Interativo de Milão e Lombardia',
      tocFaq: '6. Perguntas Frequentes (FAQ)',
      tocProgram: '1. Programa, Ambiente e Formato da Noite',
      tocPrices: '2. Preços, Ceia de Gala e Mesas VIP',
      tocBooking: '3. Reserva Direta por WhatsApp e Contactos',
      tocRelated: '6. Outros Eventos de Réveillon Relacionados',
      quickGuideLabel: 'Guia Rápido e Preços',
      categoryBoxEyebrow: 'GUIAS DE CATEGORIA RÉVEILLON 2027 (16 TEMAS)',
      categoryBoxHeading: 'Escolha por Categoria: Rooftops, Discotecas, Ceias de Gala, Casais, Solteiros, Famílias, +30/+40 ou Preço',
      filterEyebrow: 'FILTRO INTERATIVO DE EVENTOS',
      filterHeadingPrefix: 'Filtre os Eventos à sua Medida',
      resetFiltersBtn: 'Limpar Filtros ✕',
      tableHeadingPrefix: 'Tabela Comparativa de Preços e Horários',
      colVenue: 'Evento / Local',
      colCity: 'Cidade (Prov.)',
      colHours: 'Horário 31/12',
      colPrices: 'Preços e Pacotes',
      mapHeadingHub: 'Mapa de Rooftops, Discotecas e Festas de Réveillon em Milão',
      mapSubtitleHub: 'Localização dos principais eventos de Ano Novo entre Duomo, Brera, Corso Como, Parco Sempione, Navigli e Porta Nuova.',
      faqHeadingPrefix: 'Perguntas Frequentes sobre o Réveillon',
      programHeading: 'Programa, Ambiente e Formato da Noite de Ano Novo',
      musicLabel: 'Música e Entretenimento',
      pricesHeadingPrefix: 'Preços, Pacotes e Mesas VIP',
      bookingHeading: 'Reserve Agora pelo Concierge Oficial WhatsApp (Zero Taxas)',
      bookingSubtitle: 'Receba por WhatsApp, telefone ou e-mail o link oficial de ingressos, o menu da ceia de gala ou o mapa de mesas VIP.',
      backToAllBtn: '← Voltar para Todos os 124 Eventos de Réveillon',
      mapHeadingEvent: 'Mapa do Local, Endereço e Como Chegar',
      relatedHeading: 'Mais Eventos de Réveillon Nesta Categoria',
      metaCtaLabel: 'Info e reservas',
      dateBadge: '31 Dezembro 2026 – 1 Janeiro 2027',
    },
  };

  const custom = perLocale[locale] || {};
  return {
    eventsBreadcrumb: custom.eventsBreadcrumb || w.eventsBreadcrumb,
    verifiedEventsLabel: custom.verifiedEventsLabel || w.verifiedEventsLabel,
    tocTitle: custom.tocTitle || w.tocTitle,
    tocCategories: custom.tocCategories || w.tocCategoriesTpl,
    tocFilter: custom.tocFilter || w.tocFilter,
    tocCatalog: custom.tocCatalog || w.tocCatalog,
    tocTable: custom.tocTable || w.tocTable,
    tocMap: custom.tocMap || w.tocMap,
    tocFaq: custom.tocFaq || w.tocFaq,
    tocProgram: custom.tocProgram || `${nav.menuLabel} · ${w.tocProgram}`,
    tocPrices: custom.tocPrices || `${nav.menuLabel} · ${w.tocPrices}`,
    tocBooking: custom.tocBooking || w.tocBooking,
    tocRelated: custom.tocRelated || w.tocRelated,
    quickGuideLabel: custom.quickGuideLabel || `${nav.menuLabel} · ${w.quickGuideLabel}`,
    whatsappConciergeBtn: custom.whatsappConciergeBtn || w.whatsappLabel,
    callNowBtn: custom.callNowBtn || w.callLabel,
    emailBtn: custom.emailBtn || w.emailLabel,
    freeAdviceNote: custom.freeAdviceNote || `${nav.h1} · ${w.freeAdviceTpl}`,
    categoryBoxEyebrow: custom.categoryBoxEyebrow || w.categoryBoxEyebrow,
    categoryBoxHeading: custom.categoryBoxHeading || w.categoryBoxHeading,
    filterEyebrow: custom.filterEyebrow || w.filterEyebrow,
    filterHeadingPrefix: custom.filterHeadingPrefix || nav.h1,
    resetFiltersBtn: custom.resetFiltersBtn || w.resetFiltersBtn,
    tableHeadingPrefix: custom.tableHeadingPrefix || `${nav.h1} · ${w.tableHeadingSuffix}`,
    colVenue: custom.colVenue || w.colVenue,
    colCity: custom.colCity || w.colCity,
    colHours: custom.colHours || w.colHours,
    colPrices: custom.colPrices || w.colPrices,
    mapHeadingHub: custom.mapHeadingHub || `${nav.h1} · ${w.mapHeadingHubSuffix}`,
    mapSubtitleHub: custom.mapSubtitleHub || w.mapSubtitleHub,
    faqHeadingPrefix: custom.faqHeadingPrefix || `${w.faqPrefix} · ${nav.h1}`,
    programHeading: custom.programHeading || `${nav.menuLabel} · ${w.programHeadingSuffix}`,
    musicLabel: custom.musicLabel || w.musicLabel,
    pricesHeadingPrefix: custom.pricesHeadingPrefix || `${nav.menuLabel} · ${w.pricesHeadingSuffix}`,
    bookingHeading: custom.bookingHeading || w.bookingHeading,
    bookingSubtitle: custom.bookingSubtitle || w.bookingSubtitle,
    backToAllBtn: custom.backToAllBtn || w.backToAllBtn,
    mapHeadingEvent: custom.mapHeadingEvent || w.mapHeadingEvent,
    relatedHeading: custom.relatedHeading || w.relatedHeading,
    metaCtaLabel: custom.metaCtaLabel || w.metaCtaLabel,
    dateBadge: custom.dateBadge || w.dateBadge,
    ...extraFields,
    categoryTitles: CATEGORY_LABELS_BY_LOCALE[locale] || {},
    categorySubtitles: {},
  };
}

export function getCapodannoLocalizedCategoryTitle(
  pageDef: CapodannoCategoryPageDef,
  locale: string,
  eventsCount: number,
): string {
  if (locale === 'it') return pageDef.titleIt;
  if (locale === 'en') return pageDef.titleEn;
  const ui = getCapodannoUiCopy(locale);
  if (ui.categoryTitles[pageDef.slug]) return ui.categoryTitles[pageDef.slug];
  const nav = capodannoNavigation(locale);
  const w = getWords35(locale);
  if (pageDef.slug === 'capodanno-2027') {
    return w.allEventsTitleTpl.replace('{h1}', nav.h1).replace('{count}', String(eventsCount));
  }
  const catLabel = w.cats[pageDef.slug]?.label || pageDef.shortLabelEn;
  return `${nav.menuLabel} 2027 · ${catLabel} (${eventsCount})`;
}

export function getCapodannoLocalizedCategorySubtitle(
  pageDef: CapodannoCategoryPageDef,
  locale: string,
  eventsCount: number,
): string {
  if (locale === 'it') return pageDef.subtitleIt;
  if (locale === 'en') return pageDef.subtitleEn;
  const nav = capodannoNavigation(locale);
  const ui = getCapodannoUiCopy(locale);
  const w = getWords35(locale);
  const catLabel = w.cats[pageDef.slug]?.label || nav.menuLabel;
  return w.hubSubtitleSuffixTpl
    .replace('{h1}', `${nav.h1} · ${catLabel}`)
    .replace('{date}', ui.dateBadge)
    .replace('{count}', String(eventsCount));
}

function getOverrideEventContent(slug: string, locale: string): CapodannoLocalizedEventContent | null {
  if (slug === 'capodanno-church-81-milano') return getChurch81NyeContent(locale);
  if (slug === 'capodanno-55-milano') return getFiftyFiveNyeContent(locale);
  if (slug === 'capodanno-repvblic-milano') return getRepvblicNyeContent(locale);
  if (slug === 'capodanno-pineta-milano') return getPinetaNyeContent(locale);
  if (slug === 'capodanno-voya-rooftop-milano') return getVoyaNyeContent(locale);
  if (slug === 'capodanno-bischeri-milano') return getBischeriNyeContent(locale);
  if (slug === 'capodanno-bobino-milano') return getBobinoNyeContent(locale);
  if (slug === 'capodanno-gate-milano') return getGateNyeContent(locale);
  if (slug === 'capodanno-tom-the-ordinary-market-milano') return getTomNyeContent(locale);
  if (slug === 'capodanno-terrazza-duomo-21') return getTerrazzaDuomo21NyeContent(locale);
  if (slug === 'capodanno-ceresio-7-milano') return getCeresio7ClosedNyeContent(locale);
  const qc = getQcTermeAndSirmioneOverride35(slug, locale);
  if (qc) return qc;
  const wa = getWhatsappVenueNyeContent(slug, locale);
  if (wa) return wa;
  const waNov22 = getWaVerifiedNov22Content(slug, locale);
  if (waNov22) return waNov22;
  const t031 = getT031OverrideContent(slug, locale);
  if (t031) return t031;
  return null;
}

export function getCapodannoLocalizedEventTitle(
  event: CapodannoEventItem,
  locale: string,
): string {
  const override = getOverrideEventContent(event.slug, locale);
  if (override) return override.title;
  if (locale === 'it') return event.titleIt;
  if (locale === 'en') return event.titleEn;
  const nav = capodannoNavigation(locale);
  if (event.slug === 'capodanno-justme-milano-torre-branca') {
    return `${nav.menuLabel} 2027 ${event.venueName}: The Great Gatsby`;
  }
  const w = getWords35(locale);
  const catWord = w.cats[`capodanno-${event.category}-milano`]?.badge || w.verifiedEventsLabel;
  return `${nav.menuLabel} 2027 ${event.venueName} (${event.city}) · ${catWord}`;
}

export function getCapodannoLocalizedEventSubtitle(
  event: CapodannoEventItem,
  locale: string,
): string {
  const override = getOverrideEventContent(event.slug, locale);
  if (override) return override.subtitle;
  if (locale === 'it') return event.subtitleIt;
  if (locale === 'en') return event.subtitleEn;
  const nav = capodannoNavigation(locale);
  const w = getWords35(locale);
  const priceBadge = formatCapodannoPriceBadge35(event, locale);
  const hoursText = formatCapodannoHours35(event.hours, locale);
  return `${nav.h1} @ ${event.venueName} (${event.address}, ${event.city}) · ${w.hoursLabel} ${hoursText} · ${priceBadge}.`;
}

export function getCapodannoLocalizedEventContent(
  event: CapodannoEventItem,
  locale: string,
): CapodannoLocalizedEventContent {
  const override = getOverrideEventContent(event.slug, locale);
  if (override) {
    if (event.slug === 'capodanno-justme-milano-torre-branca' && !override.relatedHolidayBanner) {
      return { ...override, relatedHolidayBanner: getJustMeOrthodoxRelatedBanner(locale) };
    }
    return override;
  }
  const base = buildFallbackLocalizedEventContent35(
    event,
    locale,
    getCapodannoLocalizedEventTitle(event, locale),
    getCapodannoLocalizedEventSubtitle(event, locale),
  );
  return {
    ...base,
    relatedHolidayBanner:
      event.slug === 'capodanno-justme-milano-torre-branca'
        ? getJustMeOrthodoxRelatedBanner(locale)
        : undefined,
  };
}
