import { SITE_CONTACT } from '@/config/contact';
import type {
  CapodannoAudience,
  CapodannoCategoryPageDef,
  CapodannoEventItem,
  CapodannoFormula,
  CapodannoMusicTag,
  CapodannoVenueType,
  CapodannoZoneTag,
} from '@/lib/capodannoEvents';
import type { CapodannoLocalizedEventContent } from '@/lib/capodanno/repvblic35';
import { capodannoNavigation } from '@/lib/capodanno/routes';
import { enabledLocaleCodes, type LocaleCode } from '@/lib/i18n/locales';
import { EURO_WORDS_24 } from './capodannoUi35Euro';

export type LocaleWords35 = {
  eventsBreadcrumb: string;
  verifiedEventsLabel: string;
  tocTitle: string;
  tocCategoriesTpl: string;
  tocFilter: string;
  tocCatalog: string;
  tocTable: string;
  tocMap: string;
  tocFaq: string;
  tocProgram: string;
  tocPrices: string;
  tocBooking: string;
  tocRelated: string;
  tocMenuLabel: string;
  quickGuideLabel: string;
  whatsappLabel: string;
  callLabel: string;
  emailLabel: string;
  freeAdviceTpl: string;
  categoryBoxEyebrow: string;
  categoryBoxHeading: string;
  filterEyebrow: string;
  resetFiltersBtn: string;
  tableHeadingSuffix: string;
  colVenue: string;
  colCity: string;
  colHours: string;
  colPrices: string;
  mapHeadingHubSuffix: string;
  mapSubtitleHub: string;
  faqPrefix: string;
  programHeadingSuffix: string;
  musicLabel: string;
  pricesHeadingSuffix: string;
  bookingHeading: string;
  bookingSubtitle: string;
  backToAllBtn: string;
  mapHeadingEvent: string;
  relatedHeading: string;
  metaCtaLabel: string;
  dateBadge: string;
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
  allEventsTitleTpl: string;
  hubSubtitleSuffixTpl: string;
  hubFaqQ1Tpl: string;
  hubFaqA1Tpl: string;
  hubFaqQ2: string;
  hubFaqA2: string;
  hubFaqQ3: string;
  detailFaqQ1Tpl: string;
  detailFaqQ2Tpl: string;
  detailFaqQ3Tpl: string;
  detailFaqA2Tpl: string;
  quickTargetPrompt: string;
  lblVenueType: string;
  lblFormula: string;
  lblMusic: string;
  lblZone: string;
  lblBudget: string;
  lblSearch: string;
  searchPlaceholder: string;
  noResultsTitle: string;
  noResultsBody: string;
  showAllBtn: string;
  showingTop24Tpl: string;
  showAllEventsBtnTpl: string;
  fullDirectoryTpl: string;
  budgetAll: string;
  budgetFree: string;
  budgetLow: string;
  budgetMid: string;
  budgetLux: string;
  cats: Record<string, { label: string; badge: string }>;
  venueTypes: Record<'all' | CapodannoVenueType, string>;
  audiences: Record<'all' | CapodannoAudience, string>;
  formulas: Record<'all' | CapodannoFormula, string>;
  music: Record<'all' | CapodannoMusicTag, string>;
  zones: Record<'all' | CapodannoZoneTag, string>;
};

const WORDS_35: Partial<Record<LocaleCode, LocaleWords35>> & { en: LocaleWords35; it: LocaleWords35 } = {
  en: {
    eventsBreadcrumb: 'Events',
    verifiedEventsLabel: 'VERIFIED EVENTS',
    tocTitle: 'Page Table of Contents',
    tocCategoriesTpl: '1. The 16 Categories of NYE 2027',
    tocFilter: '2. Quick Filter by Crowd, Music & Budget',
    tocCatalog: '3. Verified Venues, Prices & Tickets',
    tocTable: '4. Comparative Price & Hours Table',
    tocMap: '5. Interactive Milan & Lombardy Map',
    tocFaq: '6. Frequently Asked Questions (FAQ)',
    tocProgram: '1. Program, Music & Format',
    tocPrices: '2. Prices, Gala Dinner & VIP Tables',
    tocBooking: '3. Official WhatsApp Concierge & Booking',
    tocRelated: '6. Related Events in This Category',
    tocMenuLabel: 'Official Menu & Wines',
    quickGuideLabel: 'Quick Guide & Rates',
    whatsappLabel: `WhatsApp Concierge (${SITE_CONTACT.whatsapp.number})`,
    callLabel: `Call ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Official Email',
    freeAdviceTpl: 'Official Nightlife Milan Concierge · WhatsApp +39 351 912 7047 · Zero agency markup',
    categoryBoxEyebrow: 'EXPLORE BY CATEGORY (16 SPECIALIZED GUIDES)',
    categoryBoxHeading: 'Choose your ideal New Year’s Eve style',
    filterEyebrow: 'INTERACTIVE NYE 2027 FILTER (6 CRITERIA)',
    resetFiltersBtn: 'Reset Filters',
    tableHeadingSuffix: 'Price & Hours Comparison',
    colVenue: 'Venue / Club',
    colCity: 'City & Area',
    colHours: 'Dec 31 Hours',
    colPrices: 'Entry & Prices (EUR)',
    mapHeadingHubSuffix: 'Interactive Map across Milan & Lombardy',
    mapSubtitleHub: 'Duomo, Brera, Corso Como, Navigli, Sempione, Porta Nuova, Lake Como, Lake Garda & Alps.',
    faqPrefix: 'Frequently Asked Questions',
    programHeadingSuffix: 'Program, Vibe & Night Format',
    musicLabel: 'Music & Format',
    pricesHeadingSuffix: 'Prices, Menus & VIP Packages',
    bookingHeading: 'Official WhatsApp Concierge · Zero Markup',
    bookingSubtitle: 'Receive ticket links, Gala Dinner menus, or VIP table plans 24/7 via WhatsApp, phone, or email.',
    backToAllBtn: '← Back to All 125 NYE Events',
    mapHeadingEvent: 'Venue Map, Address & Directions',
    relatedHeading: 'More NYE 2027 Events in This Category',
    metaCtaLabel: 'Info & Bookings',
    dateBadge: '31/12/2026 – 01/01/2027',
    freeEntryLabel: 'FREE ENTRY',
    uponRequestLabel: 'Upon request',
    fromPricePrefix: 'From',
    dressCodeLabel: 'Dress Code',
    closedDec31Jan3Badge: 'CLOSED DEC 31 – JAN 3',
    closedNye2027Badge: 'CLOSED NYE 2027',
    soldOutNye2027Badge: 'SOLD OUT NYE 2027',
    confirmedAlternativesHeading: 'Confirmed NYE 2027 Alternatives',
    officialConditionsHeading: 'Official Conditions',
    officialConditionsEyebrow: 'OFFICIAL NYE 2027 VENUE CONDITIONS',
    sisterVenueMilanLabel: 'Sister Flagship Venue in Milan',
    sisterVenueMilanDesc: 'Explore our sister Milan flagship Just Me Milano (Torre Branca, Parco Sempione): VIP table prices, 7/7 nights and guest list.',
    officialVenueGuideLabel: 'Official Year-Round Venue Guide',
    officialVenueGuideDescTpl: 'Check year-round VIP table prices, dress code, metro directions and weekly calendar for {venue}.',
    confirmedVenuesBanner: 'CONFIRMED NYE 2027 VENUES · DEC 31, 2026',
    viewPackagesCta: 'View Packages & Book Online →',
    addressLabel: 'Address:',
    hoursLabel: 'Hours:',
    priceTiersHeading: 'Official & Benchmark Price Tiers:',
    terrazzaBookingHeading: 'WhatsApp Concierge · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Book directly online above with secure card payment or message Nightlife Milan Concierge on WhatsApp +39 351 912 7047.',
    guestSingular: 'guest',
    guestPlural: 'guests',
    officialDirectTicketingEyebrow: 'OFFICIAL DIRECT TICKETING · CONFIRMED RATE CARD',
    bookPackagesOnlinePrefix: 'Book Official Packages Online ·',
    allEventsTitleTpl: '{h1}: {count} Rooftop, Club & Gala Events',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} curated venues across Milan rooftops, luxury clubs, gala dinners, thermal spas & Alps.',
    hubFaqQ1Tpl: 'How many NYE 2027 events are included in {label}?',
    hubFaqA1Tpl: 'This guide lists {count} verified New Year’s Eve 2027 events (31 Dec 2026 – 1 Jan 2027) with confirmed or benchmark rates.',
    hubFaqQ2: 'What is the difference between Gala Dinner, Royal Buffet, Club Entry, and VIP Tables?',
    hubFaqA2: 'Gala Dinners (€120–€450) include a seated multi-course menu and toast. Royal Buffets (€40–€120) offer buffet dinner plus club entry. After-dinner passes (€20–€80) cover countdown and clubbing. VIP Tables (€300–€5,000) include bottle credit and priority entry.',
    hubFaqQ3: 'How do I book NYE 2027 tickets, gala dinners, or VIP tables?',
    detailFaqQ1Tpl: 'What are the verified prices and packages for {venue} NYE 2027?',
    detailFaqQ2Tpl: 'What are the hours, address, and dress code for {venue} on 31/12/2026?',
    detailFaqQ3Tpl: 'How do I book tickets, gala dinner, or VIP tables at {venue}?',
    detailFaqA2Tpl: '{venue}, {address}, {city} ({province}), hours {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'Who are you celebrating with? (Quick Target Filter):',
    lblVenueType: '1. Venue Type',
    lblFormula: '2. Package / Formula',
    lblMusic: '3. Music & Vibe',
    lblZone: '4. Milan District / Province',
    lblBudget: '5. Starting Price Range',
    lblSearch: '6. Search Venue, Area or Format',
    searchPlaceholder: 'E.g. Just Me, Rooftop, Spa, Navigli, Techno...',
    noResultsTitle: 'No events match all selected filters',
    noResultsBody: 'Try broadening one filter or click below to view all events in this category.',
    showAllBtn: 'Show All Events',
    showingTop24Tpl: 'Showing the top 24 featured events out of {total} verified NYE nights.',
    showAllEventsBtnTpl: 'Show all {total} NYE events (+{rest})',
    fullDirectoryTpl: 'Full directory index ({rest} additional venues & galas)',
    budgetAll: 'All Budgets',
    budgetFree: 'Free (€0 · Public Squares)',
    budgetLow: 'Budget (up to €35)',
    budgetMid: 'Mid-Range (€35 – €70)',
    budgetLux: 'Luxury / Rooftop (€70+)',
    cats: {
      'capodanno-2027': { label: 'All 125 NYE Events 2027', badge: 'COMPLETE GUIDE' },
      'capodanno-rooftop-milano': { label: 'Panoramic Rooftops & Terraces', badge: 'SKYLINE' },
      'capodanno-discoteche-milano': { label: 'Nightclubs & Discos', badge: 'CLUBBING' },
      'capodanno-locali-cenone-milano': { label: 'Gala Dinner & Dinner Show', badge: 'GALA DINNER' },
      'capodanno-hotel-5-stelle-ville-castelli': { label: '5★ Hotels, Villas & Castles', badge: 'LUXURY' },
      'capodanno-coppie-romantico-milano': { label: 'Couples & Romantic', badge: 'COUPLES' },
      'capodanno-single-milano': { label: 'Singles & Friends Groups', badge: 'SINGLES' },
      'capodanno-famiglie-bambini-milano': { label: 'Families & Kids', badge: 'FAMILIES' },
      'capodanno-over-30-40-milano': { label: 'Over 30 / Over 40 & Elegant', badge: 'OVER 30 / 40' },
      'capodanno-techno-elettronica-milano': { label: 'Techno, Electro & Warehouse', badge: 'ELECTRONIC' },
      'capodanno-latino-reggaeton-hiphop-milano': { label: 'Reggaeton, Latin & Urban', badge: 'URBAN & LATIN' },
      'capodanno-economico-low-cost-milano': { label: 'Budget & Under €35', badge: 'VALUE' },
      'capodanno-terme-spa-baita-montagna': { label: 'Thermal Spas & Mountain Chalets', badge: 'SPA & ALPS' },
      'capodanno-speciale': { label: 'Tram, Navigli Boat & Theatre', badge: 'SPECIAL' },
      'capodanno-lombardia': { label: 'Lombardy, Lakes & Provinces', badge: 'LOMBARDY' },
      'capodanno-in-piazza': { label: 'Free Public Squares', badge: 'FREE ENTRY' },
    },
    venueTypes: {
      all: 'All Venue Types', rooftop: 'Panoramic Rooftops & Terraces', discoteca: 'Nightclubs & Arenas',
      'locale-cenone': 'Dinner Show & Lounge Venues', 'live-club': 'Live Music Clubs & Indie Hubs',
      'hotel-villa-castello': '5★ Hotels, Villas & Castles', speakeasy: 'Speakeasies & Cocktail Bars',
      'esperienza-speciale': 'Thermal Spas, Tram, Chalets & Lakes', piazza: 'Public Squares (Free)',
    },
    audiences: {
      all: 'All Crowds / Targets', coppie: 'Couples (Romantic)', single: 'Singles & Groups of Friends',
      famiglie: 'Families & Kids', over30: 'Adults 30+ / 40+ / 50+', giovani: 'Young Crowd & Students (18–26)',
      vip: 'Luxury & VIP Privé',
    },
    formulas: {
      all: 'All Packages', cenone: 'Served Gala Dinner + Party', buffet: 'Royal Buffet / Apericena',
      dopocena: 'After-Dinner Entry Only', 'tavolo-vip': 'VIP Bottle Service Table',
      'hotel-camera': 'With Hotel Room / Spa', gratis: 'Free Entry (€0)',
    },
    music: {
      all: 'All Music Genres', 'commerciale-house': 'Commercial, Vocal House & Hits',
      'cena-cantata-live': 'Singing Dinner Show & Live Band', 'techno-elettronica': 'Techno, Tech-House & Afro-House',
      'latino-urban': 'Reggaeton, Hip-Hop, Salsa & Bachata', 'rock-indie-90s': 'Rock, Indie, Pop & 90s/2000s',
      'swing-jazz-classica': 'Swing, Jazz, Piano Bar & Classical',
    },
    zones: {
      all: 'All Zones (Milan + Lombardy)', 'duomo-centro-brera': 'Central Milan, Duomo, San Babila & Brera',
      'corso-como-sempione': 'Corso Como, Porta Nuova, Sempione & Arco', 'navigli-tortona-romana': 'Navigli, Tortona & Porta Romana',
      'milano-arena-est-nord': 'San Siro, Forlanini, Idroscalo, Bicocca & North/East', 'lombardia-laghi-alpi': 'Lombardy (12 Provinces, Lakes & Alps)',
    },
  },
  it: {
    eventsBreadcrumb: 'Eventi',
    verifiedEventsLabel: 'EVENTI VERIFICATI',
    tocTitle: 'Indice dei Contenuti della Pagina',
    tocCategoriesTpl: '1. Le 16 Categorie di Capodanno 2027',
    tocFilter: '2. Filtro Rapido per Target, Musica e Budget',
    tocCatalog: '3. Schede Locali, Prezzi e Formule',
    tocTable: '4. Tabella Comparativa Prezzi e Orari',
    tocMap: '5. Mappa Interattiva di Milano e Lombardia',
    tocFaq: '6. Domande Frequenti (FAQ)',
    tocProgram: '1. Programma, Atmosfera e Format della Serata',
    tocPrices: '2. Prezzi, Formule Cenone e Tavoli VIP',
    tocBooking: '3. Prenotazione Diretta WhatsApp e Contatti',
    tocRelated: '6. Eventi Correlati nella Stessa Categoria',
    tocMenuLabel: 'Menu Ufficiale & Vini',
    quickGuideLabel: 'Guida Rapida & Prezzi',
    whatsappLabel: `Concierge WhatsApp (${SITE_CONTACT.whatsapp.number})`,
    callLabel: `Chiama ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Email Ufficiale',
    freeAdviceTpl: 'Consulenza gratuita 24/7 su WhatsApp · Listini ufficiali 2027 · Zero commissioni di agenzia nascoste',
    categoryBoxEyebrow: 'ESPLORA PER CATEGORIA (16 GUIDE DEDICATE)',
    categoryBoxHeading: 'Scegli subito il tipo di Capodanno perfetto per te',
    filterEyebrow: 'FILTRO INTERATTIVO MULTIPLO CAPODANNO 2027',
    resetFiltersBtn: 'Azzera Filtri',
    tableHeadingSuffix: 'Tabella Comparativa Rapida Prezzi e Orari',
    colVenue: 'Locale / Evento',
    colCity: 'Zona e Città',
    colHours: 'Orari 31/12',
    colPrices: 'Prezzi e Formule',
    mapHeadingHubSuffix: 'Mappa Interattiva Milano e Lombardia',
    mapSubtitleHub: 'Visualizza la distribuzione geografica di Duomo, Brera, Corso Como, Parco Sempione, Navigli, Porta Romana, Laghi e Montagna.',
    faqPrefix: 'Domande Frequenti (FAQ)',
    programHeadingSuffix: 'Programma, Musica e Format della Notte',
    musicLabel: 'Musica e Format',
    pricesHeadingSuffix: 'Prezzi Ufficiali, Cenone e Tavoli VIP',
    bookingHeading: 'Prenota Ora con il Concierge Ufficiale (Zero Commissioni)',
    bookingSubtitle: 'Ricevi subito su WhatsApp, telefono o email il link di prevendita, il menu del Gran Cenone o la mappa dei tavoli Privé.',
    backToAllBtn: '← Torna a Tutti i 125 Eventi di Capodanno',
    mapHeadingEvent: 'Mappa, Indirizzo e Come Arrivare',
    relatedHeading: 'Altri Eventi di Capodanno nella Stessa Categoria',
    metaCtaLabel: 'Info e Prenotazioni',
    dateBadge: '31 Dicembre 2026 – 1 Gennaio 2027',
    freeEntryLabel: 'INGRESSO GRATUITO',
    uponRequestLabel: 'Su richiesta',
    fromPricePrefix: 'Da',
    dressCodeLabel: 'Dress Code',
    closedDec31Jan3Badge: 'CHIUSO 31 DIC – 3 GEN',
    closedNye2027Badge: 'CHIUSO CAPODANNO 2027',
    soldOutNye2027Badge: 'SOLD OUT CAPODANNO 2027',
    confirmedAlternativesHeading: 'Alternative Confermate',
    officialConditionsHeading: 'Condizioni Ufficiali',
    officialConditionsEyebrow: 'REGOLAMENTO UFFICIALE CAPODANNO 2027',
    sisterVenueMilanLabel: 'Sede Gemella a Milano',
    sisterVenueMilanDesc: 'Scopri anche la sede milanese Just Me Milano (Torre Branca, Parco Sempione): prezzi tavoli VIP, serate 7/7 e lista.',
    officialVenueGuideLabel: 'Scheda Ufficiale Locale Tutto l’Anno',
    officialVenueGuideDescTpl: 'Consulta prezzi tavoli VIP, dress code, orari metro e calendario settimanale completo di {venue}.',
    confirmedVenuesBanner: 'LOCATION CONFERMATE · 31 DICEMBRE 2026',
    viewPackagesCta: 'Vedi Formule & Prenota Online →',
    addressLabel: 'Indirizzo:',
    hoursLabel: 'Orari:',
    priceTiersHeading: 'Formule e Prezzi Ufficiali / Storico:',
    terrazzaBookingHeading: 'Concierge WhatsApp · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Prenota direttamente online qui sopra con pagamento sicuro con carta oppure contatta il Concierge Nightlife Milan su WhatsApp +39 351 912 7047.',
    guestSingular: 'ospite',
    guestPlural: 'ospiti',
    officialDirectTicketingEyebrow: 'ACQUISTO DIRETTO UFFICIALE · LISTINO CONFERMATO',
    bookPackagesOnlinePrefix: 'Acquista online i pacchetti confermati ·',
    allEventsTitleTpl: '{h1}: Tutti i {count} Eventi, Locali, Rooftop e Discoteche',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} eventi selezionati tra rooftop Duomo, discoteche, cenoni, terme e piazze.',
    hubFaqQ1Tpl: 'Quanti eventi sono inclusi in {label} per Capodanno 2027?',
    hubFaqA1Tpl: 'Questa pagina raccoglie {count} eventi verificati di Capodanno 2027 (31 dicembre 2026 – 1 gennaio 2027) con prezzi ufficiali o storico certificato.',
    hubFaqQ2: 'Quali sono le differenze tra Ingresso Dopocena, Royal Buffet, Cenone Servito e Tavolo VIP?',
    hubFaqA2: 'Il Gran Cenone Servito (120€–450€) include tavolo riservato, menu multipiatto e brindisi. Il Royal Buffet (40€–120€) include cena buffet e festa. L’Ingresso Dopocena (20€–80€) copre countdown e serata. I Tavoli VIP (300€–5.000€) includono bottiglie e accesso prioritario.',
    hubFaqQ3: 'Come prenotare prevendite, cenoni o tavoli VIP senza commissioni extra?',
    detailFaqQ1Tpl: 'Quali sono i prezzi e le formule ufficiali di {venue} per Capodanno 2027?',
    detailFaqQ2Tpl: 'Quali sono orari, indirizzo e dress code di {venue} il 31 dicembre 2026?',
    detailFaqQ3Tpl: 'Come prenotare biglietti, cenone o tavolo VIP al {venue}?',
    detailFaqA2Tpl: '{venue} in {address}, {city} ({province}), orario {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'Con chi festeggi? (Filtro rapido Target):',
    lblVenueType: '1. Tipologia Locale',
    lblFormula: '2. Formula Desiderata',
    lblMusic: '3. Musica & Atmosfera',
    lblZone: '4. Zona di Milano / Provincia',
    lblBudget: '5. Fascia di Prezzo (Partenza)',
    lblSearch: '6. Cerca Locale, Quartiere o Format',
    searchPlaceholder: 'Es. Just Me, Rooftop, Terme, Navigli, Salsa...',
    noResultsTitle: 'Nessun evento corrisponde esattamente a tutti i filtri selezionati',
    noResultsBody: 'Prova ad allargare un filtro oppure clicca qui sotto per rivedere tutti gli eventi della pagina.',
    showAllBtn: 'Mostra Tutti gli Eventi',
    showingTop24Tpl: 'Stai visualizzando i primi 24 eventi in evidenza su {total} serate verificate di Capodanno.',
    showAllEventsBtnTpl: 'Mostra tutti i {total} eventi di Capodanno (+{rest})',
    fullDirectoryTpl: 'Indice rapido completo ({rest} altri locali e veglioni)',
    budgetAll: 'Tutti i Prezzi',
    budgetFree: 'Gratis (0€ · Eventi in Piazza)',
    budgetLow: 'Economico / Low Cost (fino a 35€)',
    budgetMid: 'Fascia Media (35€ - 70€)',
    budgetLux: 'Top / Luxury / 5★ (oltre 70€)',
    cats: {
      'capodanno-2027': { label: 'Tutti i 125 Eventi 2027', badge: 'GUIDA COMPLETA' },
      'capodanno-rooftop-milano': { label: 'Rooftop & Terrazze Duomo', badge: 'PANORAMA' },
      'capodanno-discoteche-milano': { label: 'Discoteche & Club Milano', badge: 'CLUBBING' },
      'capodanno-locali-cenone-milano': { label: 'Locali con Cenone & Show', badge: 'CENA & PARTY' },
      'capodanno-hotel-5-stelle-ville-castelli': { label: 'Hotel 5★, Ville & Castelli', badge: 'LUSSO' },
      'capodanno-coppie-romantico-milano': { label: 'Coppie & Cenone Romantico', badge: 'COPPIE' },
      'capodanno-single-milano': { label: 'Single & Gruppi di Amici', badge: 'SINGLE' },
      'capodanno-famiglie-bambini-milano': { label: 'Famiglie con Bambini', badge: 'FAMIGLIE' },
      'capodanno-over-30-40-milano': { label: 'Adulti Over 30 / Over 40', badge: 'OVER 30 / 40' },
      'capodanno-techno-elettronica-milano': { label: 'Techno, Elettronica & Arena', badge: 'TECHNO' },
      'capodanno-latino-reggaeton-hiphop-milano': { label: 'Latino, Reggaeton & Hip-Hop', badge: 'URBAN' },
      'capodanno-economico-low-cost-milano': { label: 'Economico & Under 35€', badge: 'LOW COST' },
      'capodanno-terme-spa-baita-montagna': { label: 'Terme, Spa & Baite Alpine', badge: 'SPA & MONTAGNA' },
      'capodanno-speciale': { label: 'Tram, Battello Navigli & Teatro', badge: 'ESPERIENZE' },
      'capodanno-lombardia': { label: 'Lombardia, Laghi & Province', badge: 'LOMBARDIA' },
      'capodanno-in-piazza': { label: 'Capodanno in Piazza Gratis', badge: 'GRATUITO' },
    },
    venueTypes: {
      all: 'Tutte le Tipologie', rooftop: 'Rooftop & Terrazze Panoramiche', discoteca: 'Discoteche & Club',
      'locale-cenone': 'Locali con Cenone & Dinner Show', 'live-club': 'Live Club, Concerti & Circoli',
      'hotel-villa-castello': 'Hotel 5★, Ville & Castelli', speakeasy: 'Speakeasy & Cocktail Bar',
      'esperienza-speciale': 'Terme, Tram, Baita & Laghi', piazza: 'Capodanno in Piazza (Gratis)',
    },
    audiences: {
      all: 'Per Tutti (Qualsiasi Target)', coppie: 'Coppie (Romantico & Riservato)', single: 'Single & Gruppi di Amici',
      famiglie: 'Famiglie con Bambini & Ragazzi', over30: 'Adulti Over 30 / Over 40 / 50', giovani: 'Giovani & Universitari (18–26)',
      vip: 'Luxury & Tavoli VIP Privé',
    },
    formulas: {
      all: 'Tutte le Formule', cenone: 'Gran Cenone Servito + Serata', buffet: 'Royal Buffet / Apericena',
      dopocena: 'Solo Ingresso Dopocena', 'tavolo-vip': 'Tavolo VIP con Bottiglie',
      'hotel-camera': 'Con Camera Hotel / Spa', gratis: 'Ingresso Gratuito (0€)',
    },
    music: {
      all: 'Tutti i Generi Musicali', 'commerciale-house': 'Commerciale, House & Hit',
      'cena-cantata-live': 'Cena Cantata, Live Band & Show', 'techno-elettronica': 'Techno, Tech-House & Elettronica',
      'latino-urban': 'Reggaeton, Hip-Hop, Latino & Salsa', 'rock-indie-90s': 'Rock, Indie, Anni 90 / 2000',
      'swing-jazz-classica': 'Swing, Jazz, Piano Bar & Classica',
    },
    zones: {
      all: 'Tutte le Zone (Milano + Lombardia)', 'duomo-centro-brera': 'Milano Centro, Duomo, San Babila & Brera',
      'corso-como-sempione': 'Corso Como, Porta Nuova, Sempione & Arco', 'navigli-tortona-romana': 'Navigli, Tortona, Porta Romana & Bocconi',
      'milano-arena-est-nord': 'San Siro, Forlanini, Idroscalo, Bicocca & Nord/Est', 'lombardia-laghi-alpi': 'Lombardia (12 Province, Laghi & Montagna)',
    },
  },
  es: {
    eventsBreadcrumb: 'Eventos',
    verifiedEventsLabel: 'EVENTOS VERIFICADOS',
    tocTitle: 'Índice de Contenidos de la Página',
    tocCategoriesTpl: '1. Las 16 Categorías de Nochevieja 2027',
    tocFilter: '2. Filtro Rápido por Público, Música y Presupuesto',
    tocCatalog: '3. Locales Verificados, Precios y Entradas',
    tocTable: '4. Tabla Comparativa de Precios y Horarios',
    tocMap: '5. Mapa Interactivo de Milán y Lombardía',
    tocFaq: '6. Preguntas Frecuentes (FAQ)',
    tocProgram: '1. Programa, Ambiente y Música de la Noche',
    tocPrices: '2. Precios Oficiales, Cena de Gala y Mesas VIP',
    tocBooking: '3. Concierge WhatsApp Oficial y Reservas',
    tocRelated: '6. Otros Eventos de Nochevieja en Esta Categoría',
    tocMenuLabel: 'Menú Oficial y Vinos',
    quickGuideLabel: 'Guía Rápida y Tarifas',
    whatsappLabel: `Concierge WhatsApp (${SITE_CONTACT.whatsapp.number})`,
    callLabel: `Llamar ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Email Oficial',
    freeAdviceTpl: 'Concierge oficial Nightlife Milan 24/7 por WhatsApp +39 351 912 7047 · Precios oficiales',
    categoryBoxEyebrow: 'EXPLORA POR CATEGORÍA (16 GUÍAS)',
    categoryBoxHeading: 'Elige tu estilo perfecto para Nochevieja 2027',
    filterEyebrow: 'FILTRO INTERACTIVO NOCHEVIEJA 2027',
    resetFiltersBtn: 'Restablecer Filtros',
    tableHeadingSuffix: 'Tabla Comparativa de Precios y Horarios',
    colVenue: 'Local / Club',
    colCity: 'Zona y Ciudad',
    colHours: 'Horario 31/12',
    colPrices: 'Precios (EUR)',
    mapHeadingHubSuffix: 'Mapa Interactivo de Milán y Lombardía',
    mapSubtitleHub: 'Duomo, Brera, Corso Como, Navigli, Sempione, Porta Nuova, Lago de Como, Garda y Alpes.',
    faqPrefix: 'Preguntas Frecuentes',
    programHeadingSuffix: 'Programa, Ambiente y Música',
    musicLabel: 'Música y Formato',
    pricesHeadingSuffix: 'Precios, Menús y Mesas VIP',
    bookingHeading: 'Concierge WhatsApp Oficial · Sin Sobrecargos',
    bookingSubtitle: 'Recibe al instante por WhatsApp, teléfono o email el enlace de entradas, el menú de gala o el mapa de mesas VIP.',
    backToAllBtn: '← Volver a los 125 Eventos de Nochevieja',
    mapHeadingEvent: 'Mapa del Local, Dirección y Cómo Llegar',
    relatedHeading: 'Más Eventos de Nochevieja en Esta Categoría',
    metaCtaLabel: 'Info y Reservas',
    dateBadge: '31/12/2026 – 01/01/2027',
    freeEntryLabel: 'ENTRADA GRATUITA',
    uponRequestLabel: 'Bajo petición',
    fromPricePrefix: 'Desde',
    dressCodeLabel: 'Código de Vestimenta',
    closedDec31Jan3Badge: 'CERRADO 31 DIC – 3 ENE',
    closedNye2027Badge: 'CERRADO NOCHEVIEJA 2027',
    soldOutNye2027Badge: 'AGOTADO NOCHEVIEJA 2027',
    confirmedAlternativesHeading: 'Alternativas Confirmadas Nochevieja 2027',
    officialConditionsHeading: 'Condiciones Oficiales',
    officialConditionsEyebrow: 'REGLAMENTO OFICIAL NOCHEVIEJA 2027',
    sisterVenueMilanLabel: 'Sede Hermana en Milán',
    sisterVenueMilanDesc: 'Descubre también Just Me Milano (Torre Branca, Parco Sempione): precios de mesas VIP, fiestas 7/7 y lista.',
    officialVenueGuideLabel: 'Guía Oficial del Local Todo el Año',
    officialVenueGuideDescTpl: 'Consulta precios de mesas VIP, dress code, horarios de metro y calendario semanal de {venue}.',
    confirmedVenuesBanner: 'LOCALES CONFIRMADOS · 31 DICIEMBRE 2026',
    viewPackagesCta: 'Ver Paquetes y Reservar Online →',
    addressLabel: 'Dirección:',
    hoursLabel: 'Horarios:',
    priceTiersHeading: 'Tarifas y Paquetes Oficiales / Histórico:',
    terrazzaBookingHeading: 'Concierge WhatsApp · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Reserva directamente online con pago seguro con tarjeta o escribe a Nightlife Milan Concierge en WhatsApp +39 351 912 7047.',
    guestSingular: 'persona',
    guestPlural: 'personas',
    officialDirectTicketingEyebrow: 'COMPRA DIRECTA OFICIAL · TARIFA CONFIRMADA',
    bookPackagesOnlinePrefix: 'Reserva Online Paquetes Confirmados ·',
    allEventsTitleTpl: '{h1}: Los {count} Eventos, Rooftops, Discotecas y Cenas de Gala',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} locales verificados en Milán y Lombardía entre rooftops, clubs, cenas y termas.',
    hubFaqQ1Tpl: '¿Cuántos eventos de Nochevieja 2027 incluye {label}?',
    hubFaqA1Tpl: 'Esta guía reúne {count} eventos verificados de Nochevieja 2027 (31 de diciembre de 2026 – 1 de enero de 2027) con precios oficiales o de referencia.',
    hubFaqQ2: '¿Cuál es la diferencia entre Cena de Gala, Royal Buffet, Entrada Club y Mesa VIP?',
    hubFaqA2: 'La Cena de Gala (120€–450€) incluye menú servido en mesa y brindis. El Royal Buffet (40€–120€) combina cena cóctel y fiesta. La Entrada Club (20€–80€) da acceso desde medianoche. Las Mesas VIP (300€–5.000€) incluyen crédito en botellas y acceso prioritario.',
    hubFaqQ3: '¿Cómo reservar entradas, cenas de gala o mesas VIP para Nochevieja 2027?',
    detailFaqQ1Tpl: '¿Cuáles son los precios y paquetes oficiales de {venue} para Nochevieja 2027?',
    detailFaqQ2Tpl: '¿Cuál es el horario, dirección y dress code de {venue} el 31/12/2026?',
    detailFaqQ3Tpl: '¿Cómo reservar entradas, cena de gala o mesa VIP en {venue}?',
    detailFaqA2Tpl: '{venue} en {address}, {city} ({province}), horario {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: '¿Con quién celebras? (Filtro rápido por público):',
    lblVenueType: '1. Tipo de Local',
    lblFormula: '2. Paquete / Fórmula',
    lblMusic: '3. Música y Ambiente',
    lblZone: '4. Zona de Milán / Provincia',
    lblBudget: '5. Rango de Precio Inicial',
    lblSearch: '6. Buscar Local, Barrio o Formato',
    searchPlaceholder: 'Ej. Just Me, Rooftop, Termas, Navigli, Reggaeton...',
    noResultsTitle: 'Ningún evento coincide con todos los filtros seleccionados',
    noResultsBody: 'Prueba a ampliar un filtro o haz clic abajo para ver todos los eventos de esta página.',
    showAllBtn: 'Mostrar Todos los Eventos',
    showingTop24Tpl: 'Mostrando los 24 eventos destacados de {total} noches verificadas de Nochevieja.',
    showAllEventsBtnTpl: 'Ver todos los {total} eventos (+{rest})',
    fullDirectoryTpl: 'Índice completo ({rest} locales y fiestas adicionales)',
    budgetAll: 'Todos los Precios',
    budgetFree: 'Gratis (0€ · Plazas Públicas)',
    budgetLow: 'Económico (hasta 35€)',
    budgetMid: 'Gama Media (35€ – 70€)',
    budgetLux: 'Lujo / Rooftop (70€+)',
    cats: {
      'capodanno-2027': { label: 'Los 125 Eventos 2027', badge: 'GUÍA COMPLETA' },
      'capodanno-rooftop-milano': { label: 'Rooftops y Terrazas Duomo', badge: 'PANORAMA' },
      'capodanno-discoteche-milano': { label: 'Discotecas y Clubs Milán', badge: 'CLUBBING' },
      'capodanno-locali-cenone-milano': { label: 'Cena de Gala y Dinner Show', badge: 'CENA Y FIESTA' },
      'capodanno-hotel-5-stelle-ville-castelli': { label: 'Hoteles 5★, Villas y Castillos', badge: 'LUJO' },
      'capodanno-coppie-romantico-milano': { label: 'Parejas y Cenas Románticas', badge: 'PAREJAS' },
      'capodanno-single-milano': { label: 'Solteros y Grupos de Amigos', badge: 'SOLTEROS' },
      'capodanno-famiglie-bambini-milano': { label: 'Familias con Niños', badge: 'FAMILIAS' },
      'capodanno-over-30-40-milano': { label: 'Adultos +30 / +40 y Elegante', badge: 'OVER 30 / 40' },
      'capodanno-techno-elettronica-milano': { label: 'Techno, Electrónica y Warehouse', badge: 'ELECTRÓNICA' },
      'capodanno-latino-reggaeton-hiphop-milano': { label: 'Latino, Reggaeton y Hip-Hop', badge: 'URBANO' },
      'capodanno-economico-low-cost-milano': { label: 'Económico y Menos de 35€', badge: 'LOW COST' },
      'capodanno-terme-spa-baita-montagna': { label: 'Termas, Spa y Refugios Alpinos', badge: 'SPA Y ALPES' },
      'capodanno-speciale': { label: 'Tranvía Histórico, Barco y Teatro', badge: 'ESPECIAL' },
      'capodanno-lombardia': { label: 'Lombardía, Lagos y Provincias', badge: 'LOMBARDÍA' },
      'capodanno-in-piazza': { label: 'Nochevieja Gratis en Plaza', badge: 'GRATIS' },
    },
    venueTypes: {
      all: 'Todos los Tipos', rooftop: 'Rooftops y Terrazas Panorámicas', discoteca: 'Discotecas y Salas',
      'locale-cenone': 'Cena de Gala y Dinner Show', 'live-club': 'Clubs de Música en Vivo',
      'hotel-villa-castello': 'Hoteles 5★, Villas y Castillos', speakeasy: 'Speakeasy y Cocktail Bars',
      'esperienza-speciale': 'Termas, Tranvía, Montaña y Lagos', piazza: 'Plazas Públicas (Gratis)',
    },
    audiences: {
      all: 'Todo Público', coppie: 'Parejas (Romántico)', single: 'Solteros y Grupos',
      famiglie: 'Familias y Niños', over30: 'Adultos +30 / +40 / +50', giovani: 'Jóvenes y Universitarios (18–26)',
      vip: 'Lujo y Mesas VIP Privé',
    },
    formulas: {
      all: 'Todos los Paquetes', cenone: 'Cena de Gala Servida + Fiesta', buffet: 'Royal Buffet / Apericena',
      dopocena: 'Solo Entrada Discoteca', 'tavolo-vip': 'Mesa VIP con Botellas',
      'hotel-camera': 'Con Habitación de Hotel / Spa', gratis: 'Entrada Gratuita (0€)',
    },
    music: {
      all: 'Todos los Géneros Musicales', 'commerciale-house': 'Comercial, House y Éxitos',
      'cena-cantata-live': 'Cena Cantada, Música en Vivo y Show', 'techno-elettronica': 'Techno, Tech-House y Electrónica',
      'latino-urban': 'Reggaeton, Hip-Hop, Salsa y Bachata', 'rock-indie-90s': 'Rock, Indie, Pop y 90s/2000s',
      'swing-jazz-classica': 'Swing, Jazz, Piano Bar y Clásica',
    },
    zones: {
      all: 'Todas las Zonas (Milán + Lombardía)', 'duomo-centro-brera': 'Centro de Milán, Duomo, San Babila y Brera',
      'corso-como-sempione': 'Corso Como, Porta Nuova, Sempione y Arco', 'navigli-tortona-romana': 'Navigli, Tortona y Porta Romana',
      'milano-arena-est-nord': 'San Siro, Forlanini, Idroscalo, Bicocca y Norte/Este', 'lombardia-laghi-alpi': 'Lombardía (12 Provincias, Lagos y Alpes)',
    },
  },
  fr: {
    eventsBreadcrumb: 'Événements',
    verifiedEventsLabel: 'ÉVÉNEMENTS VÉRIFIÉS',
    tocTitle: 'Sommaire de la Page',
    tocCategoriesTpl: '1. Les 16 Catégories du Nouvel An 2027',
    tocFilter: '2. Filtre Rapide par Public, Musique et Budget',
    tocCatalog: '3. Établissements, Tarifs et Préventes',
    tocTable: '4. Tableau Comparatif Prix et Horaires',
    tocMap: '5. Carte Interactive de Milan et Lombardie',
    tocFaq: '6. Questions Fréquentes (FAQ)',
    tocProgram: '1. Programme, Ambiance et Format',
    tocPrices: '2. Tarifs, Dîner de Gala et Tables VIP',
    tocBooking: '3. Conciergerie WhatsApp Officielle et Réservation',
    tocRelated: '6. Autres Soirées du Nouvel An dans Cette Catégorie',
    tocMenuLabel: 'Menu Officiel et Vins',
    quickGuideLabel: 'Guide Rapide et Tarifs',
    whatsappLabel: `Conciergerie WhatsApp (${SITE_CONTACT.whatsapp.number})`,
    callLabel: `Appeler ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Email Officiel',
    freeAdviceTpl: 'Conciergerie Nightlife Milan 24/7 sur WhatsApp +39 351 912 7047 · Tarifs officiels directs',
    categoryBoxEyebrow: 'EXPLORER PAR CATÉGORIE (16 GUIDES)',
    categoryBoxHeading: 'Choisissez votre style de Réveillon 2027 à Milan',
    filterEyebrow: 'FILTRE INTERACTIF NOUVEL AN 2027',
    resetFiltersBtn: 'Réinitialiser',
    tableHeadingSuffix: 'Comparatif Prix et Horaires',
    colVenue: 'Lieu / Club',
    colCity: 'Quartier et Ville',
    colHours: 'Horaires 31/12',
    colPrices: 'Tarifs (EUR)',
    mapHeadingHubSuffix: 'Carte Interactive Milan et Lombardie',
    mapSubtitleHub: 'Duomo, Brera, Corso Como, Navigli, Sempione, Porta Nuova, Lac de Côme, Garde et Alpes.',
    faqPrefix: 'Questions Fréquentes',
    programHeadingSuffix: 'Programme, Ambiance et Musique',
    musicLabel: 'Musique et Format',
    pricesHeadingSuffix: 'Tarifs, Menus et Tables VIP',
    bookingHeading: 'Conciergerie WhatsApp Officielle · Sans Commission Cachée',
    bookingSubtitle: 'Recevez instantanément par WhatsApp, téléphone ou e-mail les préventes, le menu du réveillon ou le plan des tables VIP.',
    backToAllBtn: '← Retour aux 125 Événements du Nouvel An',
    mapHeadingEvent: 'Carte, Adresse et Accès',
    relatedHeading: 'Autres Soirées du Nouvel An dans Cette Catégorie',
    metaCtaLabel: 'Infos et Réservations',
    dateBadge: '31/12/2026 – 01/01/2027',
    freeEntryLabel: 'ENTRÉE GRATUITE',
    uponRequestLabel: 'Sur demande',
    fromPricePrefix: 'Dès',
    dressCodeLabel: 'Code Vestimentaire',
    closedDec31Jan3Badge: 'FERMÉ 31 DÉC – 3 JAN',
    closedNye2027Badge: 'FERMÉ RÉVEILLON 2027',
    soldOutNye2027Badge: 'COMPLET RÉVEILLON 2027',
    confirmedAlternativesHeading: 'Alternatives Confirmées Réveillon 2027',
    officialConditionsHeading: 'Conditions Officielles',
    officialConditionsEyebrow: 'RÈGLEMENT OFFICIEL RÉVEILLON 2027',
    sisterVenueMilanLabel: 'Adresse Sœur à Milan',
    sisterVenueMilanDesc: 'Découvrez aussi Just Me Milano (Torre Branca, Parco Sempione) : tarifs tables VIP, soirées 7j/7 et liste.',
    officialVenueGuideLabel: 'Fiche Officielle du Lieu à l’Année',
    officialVenueGuideDescTpl: 'Consultez les tarifs tables VIP, dress code, accès métro et programme hebdomadaire pour {venue}.',
    confirmedVenuesBanner: 'LIEUX CONFIRMÉS · 31 DÉCEMBRE 2026',
    viewPackagesCta: 'Voir Formules et Réserver en Ligne →',
    addressLabel: 'Adresse :',
    hoursLabel: 'Horaires :',
    priceTiersHeading: 'Tarifs et Formules Officielles / Référence :',
    terrazzaBookingHeading: 'Conciergerie WhatsApp · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Réservez directement en ligne ci-dessus par carte bancaire sécurisée ou contactez Nightlife Milan sur WhatsApp +39 351 912 7047.',
    guestSingular: 'invité',
    guestPlural: 'invités',
    officialDirectTicketingEyebrow: 'BILLETTERIE DIRECTE OFFICIELLE · TARIFS CONFIRMÉS',
    bookPackagesOnlinePrefix: 'Réserver en ligne les formules confirmées ·',
    allEventsTitleTpl: '{h1} : Les {count} Soirées, Rooftops, Clubs et Dîners de Gala',
    hubSubtitleSuffixTpl: '{h1} ({date}) : {count} adresses vérifiées à Milan et en Lombardie entre rooftops, clubs, dîners et thermes.',
    hubFaqQ1Tpl: 'Combien d’événements du Nouvel An 2027 compte {label} ?',
    hubFaqA1Tpl: 'Ce guide regroupe {count} événements vérifiés pour la Saint-Sylvestre 2027 (31 décembre 2026 – 1er janvier 2027) avec tarifs officiels ou de référence.',
    hubFaqQ2: 'Quelle différence entre Dîner de Gala, Royal Buffet, Entrée Club et Table VIP ?',
    hubFaqA2: 'Le Dîner de Gala (120€–450€) inclut table réservée et menu dégustation. Le Royal Buffet (40€–120€) combine cocktail dînatoire et soirée. L’Entrée Club (20€–80€) donne accès après minuit. Les Tables VIP (300€–5.000€) incluent crédit bouteilles et accès prioritaire.',
    hubFaqQ3: 'Comment réserver des billets, un dîner ou une table VIP pour le Nouvel An 2027 ?',
    detailFaqQ1Tpl: 'Quels sont les tarifs et formules officiels de {venue} pour le Réveillon 2027 ?',
    detailFaqQ2Tpl: 'Quels sont les horaires, l’adresse et le dress code de {venue} le 31/12/2026 ?',
    detailFaqQ3Tpl: 'Comment réserver billets, dîner de gala ou table VIP chez {venue} ?',
    detailFaqA2Tpl: '{venue}, {address}, {city} ({province}), horaires {hours}. {dressLabel} : {dress}.',
    quickTargetPrompt: 'Avec qui célébrez-vous ? (Filtre rapide) :',
    lblVenueType: '1. Type de Lieu',
    lblFormula: '2. Formule Souhaitée',
    lblMusic: '3. Musique et Ambiance',
    lblZone: '4. Quartier de Milan / Province',
    lblBudget: '5. Budget de Départ',
    lblSearch: '6. Rechercher Lieu, Quartier ou Format',
    searchPlaceholder: 'Ex. Just Me, Rooftop, Thermes, Navigli, Techno...',
    noResultsTitle: 'Aucun événement ne correspond à tous ces filtres',
    noResultsBody: 'Élargissez un critère ou cliquez ci-dessous pour afficher tous les événements.',
    showAllBtn: 'Afficher Tous les Événements',
    showingTop24Tpl: 'Affichage des 24 soirées phares sur {total} événements vérifiés du Nouvel An.',
    showAllEventsBtnTpl: 'Afficher les {total} événements (+{rest})',
    fullDirectoryTpl: 'Index complet ({rest} autres lieux et galas)',
    budgetAll: 'Tous les Budgets',
    budgetFree: 'Gratuit (0€ · Places Publiques)',
    budgetLow: 'Économique (jusqu’à 35€)',
    budgetMid: 'Gamme Moyenne (35€ – 70€)',
    budgetLux: 'Luxe / Rooftop (70€+)',
    cats: {
      'capodanno-2027': { label: 'Les 125 Soirées 2027', badge: 'GUIDE COMPLET' },
      'capodanno-rooftop-milano': { label: 'Rooftops et Terrasses Duomo', badge: 'PANORAMA' },
      'capodanno-discoteche-milano': { label: 'Discothèques et Clubs Milan', badge: 'CLUBBING' },
      'capodanno-locali-cenone-milano': { label: 'Dîner de Gala et Dinner Show', badge: 'GALA & FÊTE' },
      'capodanno-hotel-5-stelle-ville-castelli': { label: 'Hôtels 5★, Villas et Châteaux', badge: 'LUXE' },
      'capodanno-coppie-romantico-milano': { label: 'Couples et Dîner Romantique', badge: 'COUPLES' },
      'capodanno-single-milano': { label: 'Célibataires et Groupes', badge: 'CÉLIBATAIRES' },
      'capodanno-famiglie-bambini-milano': { label: 'Familles avec Enfants', badge: 'FAMILLES' },
      'capodanno-over-30-40-milano': { label: 'Adultes 30+ / 40+ Élégant', badge: 'OVER 30 / 40' },
      'capodanno-techno-elettronica-milano': { label: 'Techno, Électro et Warehouse', badge: 'ÉLECTRO' },
      'capodanno-latino-reggaeton-hiphop-milano': { label: 'Latino, Reggaeton et Hip-Hop', badge: 'URBAN' },
      'capodanno-economico-low-cost-milano': { label: 'Petit Budget sous 35€', badge: 'BON PLAN' },
      'capodanno-terme-spa-baita-montagna': { label: 'Thermes, Spa et Chalets Alpins', badge: 'SPA & ALPES' },
      'capodanno-speciale': { label: 'Tramway, Bateau Navigli et Théâtre', badge: 'SPÉCIAL' },
      'capodanno-lombardia': { label: 'Lombardie, Lacs et Provinces', badge: 'LOMBARDIE' },
      'capodanno-in-piazza': { label: 'Places Publiques Gratuites', badge: 'GRATUIT' },
    },
    venueTypes: {
      all: 'Tous les Types', rooftop: 'Rooftops et Terrasses Panoramiques', discoteca: 'Discothèques et Clubs',
      'locale-cenone': 'Dîners-Spectacles et Lounges', 'live-club': 'Clubs Concerts Live',
      'hotel-villa-castello': 'Hôtels 5★, Villas et Châteaux', speakeasy: 'Speakeasy et Bars à Cocktails',
      'esperienza-speciale': 'Thermes, Tram, Montagne et Lacs', piazza: 'Places Publiques (Gratuit)',
    },
    audiences: {
      all: 'Tous Publics', coppie: 'Couples (Romantique)', single: 'Célibataires et Amis',
      famiglie: 'Familles et Enfants', over30: 'Adultes 30+ / 40+ / 50+', giovani: 'Jeunes et Étudiants (18–26)',
      vip: 'Luxe et Tables VIP Privé',
    },
    formulas: {
      all: 'Toutes les Formules', cenone: 'Dîner de Gala Assise + Soirée', buffet: 'Royal Buffet / Apéritif',
      dopocena: 'Entrée Club Seule', 'tavolo-vip': 'Table VIP avec Bouteilles',
      'hotel-camera': 'Avec Chambre Hôtel / Spa', gratis: 'Entrée Gratuite (0€)',
    },
    music: {
      all: 'Tous Genres Musicaux', 'commerciale-house': 'Généraliste, House et Hits',
      'cena-cantata-live': 'Dîner Chantant, Live Band et Show', 'techno-elettronica': 'Techno, Tech-House et Électro',
      'latino-urban': 'Reggaeton, Hip-Hop, Salsa et Bachata', 'rock-indie-90s': 'Rock, Indie, Pop et Années 90/2000',
      'swing-jazz-classica': 'Swing, Jazz, Piano Bar et Classique',
    },
    zones: {
      all: 'Toutes Zones (Milan + Lombardie)', 'duomo-centro-brera': 'Centre Milan, Duomo, San Babila et Brera',
      'corso-como-sempione': 'Corso Como, Porta Nuova, Sempione et Arco', 'navigli-tortona-romana': 'Navigli, Tortona et Porta Romana',
      'milano-arena-est-nord': 'San Siro, Forlanini, Idroscalo, Bicocca et Nord/Est', 'lombardia-laghi-alpi': 'Lombardie (12 Provinces, Lacs et Alpes)',
    },
  },
  de: {
    eventsBreadcrumb: 'Events',
    verifiedEventsLabel: 'GEPRÜFTE EVENTS',
    tocTitle: 'Inhaltsverzeichnis der Seite',
    tocCategoriesTpl: '1. Die 16 Silvester-Kategorien 2027',
    tocFilter: '2. Schnellfilter nach Publikum, Musik und Budget',
    tocCatalog: '3. Geprüfte Locations, Preise und Tickets',
    tocTable: '4. Vergleichstabelle Preise und Öffnungszeiten',
    tocMap: '5. Interaktive Karte Mailand und Lombardei',
    tocFaq: '6. Häufig gestellte Fragen (FAQ)',
    tocProgram: '1. Programm, Musik und Format des Abends',
    tocPrices: '2. Offizielle Preise, Galadinner und VIP-Tische',
    tocBooking: '3. Offizieller WhatsApp-Concierge & Buchung',
    tocRelated: '6. Weitere Silvester-Events in dieser Kategorie',
    tocMenuLabel: 'Offizielles Menü & Weine',
    quickGuideLabel: 'Kurzguide & Preise',
    whatsappLabel: `WhatsApp Concierge (${SITE_CONTACT.whatsapp.number})`,
    callLabel: `Anrufen ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Offizielle E-Mail',
    freeAdviceTpl: 'Offizieller Nightlife Milan Concierge 24/7 per WhatsApp +39 351 912 7047 · Originalpreise',
    categoryBoxEyebrow: 'NACH KATEGORIE ENTDECKEN (16 GUIDES)',
    categoryBoxHeading: 'Wählen Sie Ihren idealen Silvester-Stil 2027',
    filterEyebrow: 'INTERAKTIVER SILVESTER-2027-FILTER',
    resetFiltersBtn: 'Filter zurücksetzen',
    tableHeadingSuffix: 'Preis- und Zeitenvergleich',
    colVenue: 'Location / Club',
    colCity: 'Stadtteil & Stadt',
    colHours: '31.12. Zeiten',
    colPrices: 'Preise (EUR)',
    mapHeadingHubSuffix: 'Interaktive Karte Mailand & Lombardei',
    mapSubtitleHub: 'Duomo, Brera, Corso Como, Navigli, Sempione, Porta Nuova, Comer See, Gardasee & Alpen.',
    faqPrefix: 'Häufig gestellte Fragen',
    programHeadingSuffix: 'Programm, Stimmung und Musik',
    musicLabel: 'Musik & Format',
    pricesHeadingSuffix: 'Preise, Menüs & VIP-Tische',
    bookingHeading: 'Offizieller WhatsApp-Concierge · Ohne Aufschlag',
    bookingSubtitle: 'Erhalten Sie rund um die Uhr per WhatsApp, Telefon oder E-Mail Ticketlinks, Galadinner-Menüs oder VIP-Tischpläne.',
    backToAllBtn: '← Zurück zu allen 125 Silvester-Events',
    mapHeadingEvent: 'Karte, Adresse & Anfahrt',
    relatedHeading: 'Weitere Silvester-Events in dieser Kategorie',
    metaCtaLabel: 'Info & Buchung',
    dateBadge: '31.12.2026 – 01.01.2027',
    freeEntryLabel: 'EINTRITT FREI',
    uponRequestLabel: 'Auf Anfrage',
    fromPricePrefix: 'Ab',
    dressCodeLabel: 'Dresscode',
    closedDec31Jan3Badge: 'GESCHLOSSEN 31.12.–03.01.',
    closedNye2027Badge: 'SILVESTER 2027 GESCHLOSSEN',
    soldOutNye2027Badge: 'SILVESTER 2027 AUSVERKAUFT',
    confirmedAlternativesHeading: 'Bestätigte Silvester-2027-Alternativen',
    officialConditionsHeading: 'Offizielle Bedingungen',
    officialConditionsEyebrow: 'OFFIZIELLE SILVESTER-2027-BEDINGUNGEN',
    sisterVenueMilanLabel: 'Partnerhaus in Mailand',
    sisterVenueMilanDesc: 'Entdecken Sie auch Just Me Milano (Torre Branca, Parco Sempione): VIP-Tische, Partys 7 Tage/Woche und Gästeliste.',
    officialVenueGuideLabel: 'Offizieller Ganzjahres-Guide der Location',
    officialVenueGuideDescTpl: 'Alle VIP-Tischpreise, Dresscode, Metro-Anfahrt und Wochenkalender für {venue}.',
    confirmedVenuesBanner: 'BESTÄTIGTE LOCATIONS · 31. DEZEMBER 2026',
    viewPackagesCta: 'Pakete ansehen & Online buchen →',
    addressLabel: 'Adresse:',
    hoursLabel: 'Zeiten:',
    priceTiersHeading: 'Offizielle Preise & Richtwerte:',
    terrazzaBookingHeading: 'WhatsApp-Concierge · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Buchen Sie direkt online per sicherer Kartenzahlung oder schreiben Sie Nightlife Milan auf WhatsApp +39 351 912 7047.',
    guestSingular: 'Gast',
    guestPlural: 'Gäste',
    officialDirectTicketingEyebrow: 'OFFIZIELLER DIREKTVERKAUF · BESTÄTIGTE PREISE',
    bookPackagesOnlinePrefix: 'Bestätigte Pakete online buchen ·',
    allEventsTitleTpl: '{h1}: Alle {count} Rooftops, Clubs & Silvestergalas',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} geprüfte Events in Mailand & der Lombardei von Rooftops über Clubs bis Thermen.',
    hubFaqQ1Tpl: 'Wie viele Silvester-2027-Events enthält {label}?',
    hubFaqA1Tpl: 'Dieser Guide umfasst {count} geprüfte Silvester-2027-Events (31.12.2026 – 01.01.2027) mit bestätigten Preisen oder Vorjahres-Richtwerten.',
    hubFaqQ2: 'Was ist der Unterschied zwischen Galadinner, Royal Buffet, Club-Eintritt und VIP-Tisch?',
    hubFaqA2: 'Galadinner (€120–€450) bieten ein serviertes Menü am Tisch plus Party. Royal Buffets (€40–€120) kombinieren Stehbuffet und Club. Club-Tickets (€20–€80) gelten ab ca. 23:30 Uhr. VIP-Tische (€300–€5.000) enthalten Flaschenguthaben und Priority-Einlass.',
    hubFaqQ3: 'Wie buche ich Silvester-2027-Tickets, Galadinner oder VIP-Tische?',
    detailFaqQ1Tpl: 'Welche bestätigten Preise und Pakete gelten bei {venue} zu Silvester 2027?',
    detailFaqQ2Tpl: 'Wie sind Öffnungszeiten, Adresse und Dresscode im {venue} am 31.12.2026?',
    detailFaqQ3Tpl: 'Wie buche ich Tickets, Galadinner oder VIP-Tische im {venue}?',
    detailFaqA2Tpl: '{venue}, {address}, {city} ({province}), Zeiten {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'Mit wem feiern Sie? (Schnellfilter Zielgruppe):',
    lblVenueType: '1. Location-Typ',
    lblFormula: '2. Paket / Formel',
    lblMusic: '3. Musik & Stimmung',
    lblZone: '4. Mailänder Viertel / Provinz',
    lblBudget: '5. Preisrahmen (Ab)',
    lblSearch: '6. Location, Viertel oder Format suchen',
    searchPlaceholder: 'Z. B. Just Me, Rooftop, Therme, Navigli, Techno...',
    noResultsTitle: 'Keine Events entsprechen genau allen ausgewählten Filtern',
    noResultsBody: 'Lockern Sie einen Filter oder klicken Sie unten für alle Events dieser Kategorie.',
    showAllBtn: 'Alle Events anzeigen',
    showingTop24Tpl: 'Anzeige der Top 24 Events von {total} geprüften Silvesternächten.',
    showAllEventsBtnTpl: 'Alle {total} Silvester-Events anzeigen (+{rest})',
    fullDirectoryTpl: 'Gesamtverzeichnis ({rest} weitere Locations & Galas)',
    budgetAll: 'Alle Budgets',
    budgetFree: 'Kostenlos (€0 · Plätze)',
    budgetLow: 'Günstig (bis €35)',
    budgetMid: 'Mittlere Klasse (€35 – €70)',
    budgetLux: 'Luxus / Rooftop (€70+)',
    cats: {
      'capodanno-2027': { label: 'Alle 125 Silvester-Events', badge: 'KOMPLETTGUIDE' },
      'capodanno-rooftop-milano': { label: 'Panorama-Rooftops & Duomo', badge: 'SKYLINE' },
      'capodanno-discoteche-milano': { label: 'Diskotheken & Clubs Mailand', badge: 'CLUBBING' },
      'capodanno-locali-cenone-milano': { label: 'Galadinner & Dinner Show', badge: 'GALA & PARTY' },
      'capodanno-hotel-5-stelle-ville-castelli': { label: '5★ Hotels, Villen & Schlösser', badge: 'LUXUS' },
      'capodanno-coppie-romantico-milano': { label: 'Paare & Romantisches Dinner', badge: 'PAARE' },
      'capodanno-single-milano': { label: 'Singles & Freundesgruppen', badge: 'SINGLES' },
      'capodanno-famiglie-bambini-milano': { label: 'Familien mit Kindern', badge: 'FAMILIEN' },
      'capodanno-over-30-40-milano': { label: 'Über 30 / Über 40 & Elegant', badge: 'OVER 30 / 40' },
      'capodanno-techno-elettronica-milano': { label: 'Techno, Elektro & Warehouse', badge: 'ELEKTRO' },
      'capodanno-latino-reggaeton-hiphop-milano': { label: 'Latin, Reggaeton & Hip-Hop', badge: 'URBAN' },
      'capodanno-economico-low-cost-milano': { label: 'Günstig unter €35', badge: 'SPAR-TIPP' },
      'capodanno-terme-spa-baita-montagna': { label: 'Thermen, Spa & Berghütten', badge: 'SPA & ALPEN' },
      'capodanno-speciale': { label: 'Tram, Navigli-Schiff & Theater', badge: 'SPEZIAL' },
      'capodanno-lombardia': { label: 'Lombardei, Seen & Provinzen', badge: 'LOMBARDEI' },
      'capodanno-in-piazza': { label: 'Kostenlose Silvesterplätze', badge: 'KOSTENLOS' },
    },
    venueTypes: {
      all: 'Alle Location-Typen', rooftop: 'Panorama-Rooftops & Dachterrassen', discoteca: 'Clubs & Diskotheken',
      'locale-cenone': 'Galadinner & Dinner Shows', 'live-club': 'Live-Musik-Clubs & Konzerte',
      'hotel-villa-castello': '5★ Hotels, Villen & Schlösser', speakeasy: 'Speakeasy & Cocktailbars',
      'esperienza-speciale': 'Thermen, Tram, Berge & Seen', piazza: 'Öffentliche Plätze (Gratis)',
    },
    audiences: {
      all: 'Alle Zielgruppen', coppie: 'Paare (Romantisch)', single: 'Singles & Freunde',
      famiglie: 'Familien mit Kindern', over30: 'Erwachsene 30+ / 40+ / 50+', giovani: 'Studenten & Junge Leute (18–26)',
      vip: 'Luxus & VIP-Privé-Tische',
    },
    formulas: {
      all: 'Alle Pakete', cenone: 'Serviertes Galadinner + Party', buffet: 'Royal Buffet / Apericena',
      dopocena: 'Nur Club-Eintritt', 'tavolo-vip': 'VIP-Tisch mit Flaschen',
      'hotel-camera': 'Mit Hotelzimmer / Spa', gratis: 'Freier Eintritt (€0)',
    },
    music: {
      all: 'Alle Musikrichtungen', 'commerciale-house': 'Commercial, Vocal House & Hits',
      'cena-cantata-live': 'Gesangs-Dinner & Live-Band', 'techno-elettronica': 'Techno, Tech-House & Elektro',
      'latino-urban': 'Reggaeton, Hip-Hop, Salsa & Bachata', 'rock-indie-90s': 'Rock, Indie, Pop & 90er/2000er',
      'swing-jazz-classica': 'Swing, Jazz, Pianobar & Klassik',
    },
    zones: {
      all: 'Alle Zonen (Mailand + Lombardei)', 'duomo-centro-brera': 'Mailand Zentrum, Duomo, San Babila & Brera',
      'corso-como-sempione': 'Corso Como, Porta Nuova, Sempione & Arco', 'navigli-tortona-romana': 'Navigli, Tortona & Porta Romana',
      'milano-arena-est-nord': 'San Siro, Forlanini, Idroscalo, Bicocca & Nord/Ost', 'lombardia-laghi-alpi': 'Lombardei (12 Provinzen, Seen & Alpen)',
    },
  },
  pt: {
    eventsBreadcrumb: 'Eventos',
    verifiedEventsLabel: 'EVENTOS VERIFICADOS',
    tocTitle: 'Índice da Página',
    tocCategoriesTpl: '1. As 16 Categorias de Réveillon 2027',
    tocFilter: '2. Filtro Rápido por Público, Música e Orçamento',
    tocCatalog: '3. Casas Noturnas, Preços e Ingressos',
    tocTable: '4. Tabela Comparativa de Preços e Horários',
    tocMap: '5. Mapa Interativo de Milão e Lombardia',
    tocFaq: '6. Perguntas Frequentes (FAQ)',
    tocProgram: '1. Programação, Música e Formato',
    tocPrices: '2. Preços Oficiais, Ceia de Gala e Mesas VIP',
    tocBooking: '3. Concierge WhatsApp Oficial e Reservas',
    tocRelated: '6. Mais Eventos de Réveillon Nesta Categoria',
    tocMenuLabel: 'Menu Oficial e Vinhos',
    quickGuideLabel: 'Guia Rápido e Tarifas',
    whatsappLabel: `Concierge WhatsApp (${SITE_CONTACT.whatsapp.number})`,
    callLabel: `Ligar ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Email Oficial',
    freeAdviceTpl: 'Concierge oficial Nightlife Milan 24h por WhatsApp +39 351 912 7047 · Preços oficiais',
    categoryBoxEyebrow: 'EXPLORAR POR CATEGORIA (16 GUIAS)',
    categoryBoxHeading: 'Escolha o estilo ideal de Réveillon 2027 em Milão',
    filterEyebrow: 'FILTRO INTERATIVO RÉVEILLON 2027',
    resetFiltersBtn: 'Limpar Filtros',
    tableHeadingSuffix: 'Comparativo de Preços e Horários',
    colVenue: 'Local / Clube',
    colCity: 'Bairro e Cidade',
    colHours: 'Horários 31/12',
    colPrices: 'Preços (EUR)',
    mapHeadingHubSuffix: 'Mapa Interativo de Milão e Lombardia',
    mapSubtitleHub: 'Duomo, Brera, Corso Como, Navigli, Sempione, Porta Nuova, Lago de Como, Garda e Alpes.',
    faqPrefix: 'Perguntas Frequentes',
    programHeadingSuffix: 'Programação, Música e Clima',
    musicLabel: 'Música e Formato',
    pricesHeadingSuffix: 'Preços, Menus e Mesas VIP',
    bookingHeading: 'Concierge WhatsApp Oficial · Sem Taxas Ocultas',
    bookingSubtitle: 'Receba pelo WhatsApp, telefone ou e-mail o link oficial de ingressos, o menu da ceia de gala ou o mapa de mesas VIP.',
    backToAllBtn: '← Voltar para Todos os 125 Eventos de Réveillon',
    mapHeadingEvent: 'Mapa do Local, Endereço e Como Chegar',
    relatedHeading: 'Mais Eventos de Réveillon Nesta Categoria',
    metaCtaLabel: 'Info e Reservas',
    dateBadge: '31/12/2026 – 01/01/2027',
    freeEntryLabel: 'ENTRADA GRATUITA',
    uponRequestLabel: 'Sob consulta',
    fromPricePrefix: 'Desde',
    dressCodeLabel: 'Código de Vestuário',
    closedDec31Jan3Badge: 'FECHADO 31 DEZ – 3 JAN',
    closedNye2027Badge: 'FECHADO RÉVEILLON 2027',
    soldOutNye2027Badge: 'ESGOTADO RÉVEILLON 2027',
    confirmedAlternativesHeading: 'Alternativas Confirmadas Réveillon 2027',
    officialConditionsHeading: 'Condições Oficiais',
    officialConditionsEyebrow: 'REGULAMENTO OFICIAL RÉVEILLON 2027',
    sisterVenueMilanLabel: 'Casa Irmã em Milão',
    sisterVenueMilanDesc: 'Conheça também a casa principal Just Me Milano (Torre Branca, Parco Sempione): preços de mesas VIP, festas 7/7 e lista.',
    officialVenueGuideLabel: 'Guia Oficial da Casa o Ano Todo',
    officialVenueGuideDescTpl: 'Confira preços de mesas VIP, dress code, metrô e calendário semanal completo de {venue}.',
    confirmedVenuesBanner: 'LOCAIS CONFIRMADOS · 31 DEZEMBRO 2026',
    viewPackagesCta: 'Ver Pacotes e Reservar Online →',
    addressLabel: 'Endereço:',
    hoursLabel: 'Horários:',
    priceTiersHeading: 'Pacotes e Preços Oficiais / Referência:',
    terrazzaBookingHeading: 'Concierge WhatsApp · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Reserve diretamente online acima com pagamento seguro com cartão ou fale com Nightlife Milan no WhatsApp +39 351 912 7047.',
    guestSingular: 'convidado',
    guestPlural: 'convidados',
    officialDirectTicketingEyebrow: 'COMPRA DIRETA OFICIAL · TABELA CONFIRMADA',
    bookPackagesOnlinePrefix: 'Reservar Online Pacotes Confirmados ·',
    allEventsTitleTpl: '{h1}: Os {count} Eventos, Rooftops, Discotecas e Ceias de Gala',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} eventos selecionados em Milão e Lombardia entre rooftops, clubes, ceias e termas.',
    hubFaqQ1Tpl: 'Quantos eventos de Réveillon 2027 estão incluídos em {label}?',
    hubFaqA1Tpl: 'Este guia reúne {count} eventos verificados de Réveillon 2027 (31 de dezembro de 2026 – 1 de janeiro de 2027) com preços oficiais ou de referência.',
    hubFaqQ2: 'Qual a diferença entre Ceia de Gala, Royal Buffet, Entrada Balada e Mesa VIP?',
    hubFaqA2: 'A Ceia de Gala (120€–450€) inclui mesa reservada e menu completo. O Royal Buffet (40€–120€) une buffet e festa. A Entrada Balada (20€–80€) dá acesso à virada. As Mesas VIP (300€–5.000€) incluem crédito em garrafas e entrada prioritária.',
    hubFaqQ3: 'Como reservar ingressos, ceias de gala ou mesas VIP para o Réveillon 2027?',
    detailFaqQ1Tpl: 'Quais os preços e pacotes oficiais de {venue} no Réveillon 2027?',
    detailFaqQ2Tpl: 'Quais os horários, endereço e dress code de {venue} em 31/12/2026?',
    detailFaqQ3Tpl: 'Como reservar ingressos, ceia de gala ou mesa VIP no {venue}?',
    detailFaqA2Tpl: '{venue}, {address}, {city} ({province}), horário {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'Com quem vai celebrar? (Filtro rápido):',
    lblVenueType: '1. Tipo de Local',
    lblFormula: '2. Pacote / Fórmula',
    lblMusic: '3. Música e Clima',
    lblZone: '4. Bairro de Milão / Província',
    lblBudget: '5. Faixa de Preço Inicial',
    lblSearch: '6. Buscar Local, Bairro ou Formato',
    searchPlaceholder: 'Ex. Just Me, Rooftop, Termas, Navigli, Techno...',
    noResultsTitle: 'Nenhum evento corresponde a todos os filtros selecionados',
    noResultsBody: 'Amplie um filtro ou clique abaixo para ver todos os eventos desta categoria.',
    showAllBtn: 'Mostrar Todos os Eventos',
    showingTop24Tpl: 'Exibindo os 24 eventos em destaque de {total} noites verificadas.',
    showAllEventsBtnTpl: 'Ver todos os {total} eventos (+{rest})',
    fullDirectoryTpl: 'Índice completo ({rest} locais e festas adicionais)',
    budgetAll: 'Todos os Orçamentos',
    budgetFree: 'Gratuito (0€ · Praças)',
    budgetLow: 'Econômico (até 35€)',
    budgetMid: 'Faixa Média (35€ – 70€)',
    budgetLux: 'Luxo / Rooftop (70€+)',
    cats: {
      'capodanno-2027': { label: 'Todos os 125 Eventos 2027', badge: 'GUIA COMPLETO' },
      'capodanno-rooftop-milano': { label: 'Rooftops e Terraços Duomo', badge: 'PANORAMA' },
      'capodanno-discoteche-milano': { label: 'Discotecas e Clubes Milão', badge: 'CLUBBING' },
      'capodanno-locali-cenone-milano': { label: 'Ceia de Gala e Dinner Show', badge: 'CEIA E FESTA' },
      'capodanno-hotel-5-stelle-ville-castelli': { label: 'Hotéis 5★, Villas e Castelos', badge: 'LUXO' },
      'capodanno-coppie-romantico-milano': { label: 'Casais e Jantar Romântico', badge: 'CASAIS' },
      'capodanno-single-milano': { label: 'Solteiros e Grupos de Amigos', badge: 'SOLTEIROS' },
      'capodanno-famiglie-bambini-milano': { label: 'Famílias com Crianças', badge: 'FAMÍLIAS' },
      'capodanno-over-30-40-milano': { label: 'Adultos +30 / +40 Elegante', badge: 'OVER 30 / 40' },
      'capodanno-techno-elettronica-milano': { label: 'Techno, Eletrônica e Arena', badge: 'ELETRÔNICA' },
      'capodanno-latino-reggaeton-hiphop-milano': { label: 'Latino, Reggaeton e Hip-Hop', badge: 'URBAN' },
      'capodanno-economico-low-cost-milano': { label: 'Econômico abaixo de 35€', badge: 'ECONÔMICO' },
      'capodanno-terme-spa-baita-montagna': { label: 'Termas, Spa e Chalés Alpinos', badge: 'SPA E ALPES' },
      'capodanno-speciale': { label: 'Bonde Histórico, Barco e Teatro', badge: 'ESPECIAL' },
      'capodanno-lombardia': { label: 'Lombardia, Lagos e Províncias', badge: 'LOMBARDIA' },
      'capodanno-in-piazza': { label: 'Praças Públicas Gratuitas', badge: 'GRÁTIS' },
    },
    venueTypes: {
      all: 'Todos os Tipos', rooftop: 'Rooftops e Terraços Panorâmicos', discoteca: 'Discotecas e Clubes',
      'locale-cenone': 'Ceias de Gala e Dinner Shows', 'live-club': 'Clubes de Música ao Vivo',
      'hotel-villa-castello': 'Hotéis 5★, Villas e Castelos', speakeasy: 'Speakeasy e Bars de Coquetéis',
      'esperienza-speciale': 'Termas, Bonde, Montanha e Lagos', piazza: 'Praças Públicas (Grátis)',
    },
    audiences: {
      all: 'Todos os Públicos', coppie: 'Casais (Romântico)', single: 'Solteiros e Amigos',
      famiglie: 'Famílias e Crianças', over30: 'Adultos +30 / +40 / +50', giovani: 'Jovens e Universitários (18–26)',
      vip: 'Luxo e Mesas VIP Privé',
    },
    formulas: {
      all: 'Todos os Pacotes', cenone: 'Ceia de Gala Servida + Festa', buffet: 'Royal Buffet / Apericena',
      dopocena: 'Entrada Balada Após Meia-Noite', 'tavolo-vip': 'Mesa VIP com Garrafas',
      'hotel-camera': 'Com Quarto de Hotel / Spa', gratis: 'Entrada Gratuita (0€)',
    },
    music: {
      all: 'Todos os Gêneros Musicais', 'commerciale-house': 'Comercial, House e Hits',
      'cena-cantata-live': 'Jantar Cantado, Banda ao Vivo e Show', 'techno-elettronica': 'Techno, Tech-House e Eletrônica',
      'latino-urban': 'Reggaeton, Hip-Hop, Salsa e Bachata', 'rock-indie-90s': 'Rock, Indie, Pop e Anos 90/2000',
      'swing-jazz-classica': 'Swing, Jazz, Piano Bar e Clássica',
    },
    zones: {
      all: 'Todas as Zonas (Milão + Lombardia)', 'duomo-centro-brera': 'Centro de Milão, Duomo, San Babila e Brera',
      'corso-como-sempione': 'Corso Como, Porta Nuova, Sempione e Arco', 'navigli-tortona-romana': 'Navigli, Tortona e Porta Romana',
      'milano-arena-est-nord': 'San Siro, Forlanini, Idroscalo, Bicocca e Norte/Leste', 'lombardia-laghi-alpi': 'Lombardia (12 Províncias, Lagos e Alpes)',
    },
  },
  nl: {
    eventsBreadcrumb: 'Evenementen', verifiedEventsLabel: 'GEVERIFIEERDE EVENTS', tocTitle: 'Inhoudsopgave',
    tocCategoriesTpl: '1. De 16 Oud & Nieuw 2027 Categorieën', tocFilter: '2. Snel Filter op Doelgroep, Muziek & Budget',
    tocCatalog: '3. Locaties, Prijzen & Pakketten', tocTable: '4. Prijzen- en Tijdentabel',
    tocMap: '5. Interactieve Kaart Milaan & Lombardije', tocFaq: '6. Veelgestelde Vragen (FAQ)',
    tocProgram: '1. Programma, Muziek & Sfeer', tocPrices: '2. Prijzen, Galadiner & VIP-tafels',
    tocBooking: '3. Officiële WhatsApp Concierge', tocRelated: '6. Vergelijkbare Oud & Nieuw Feesten',
    tocMenuLabel: 'Officieel Menu & Wijnen', quickGuideLabel: 'Snelgids & Prijzen',
    whatsappLabel: `WhatsApp Concierge (${SITE_CONTACT.whatsapp.number})`, callLabel: `Bel ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Officiële E-mail', freeAdviceTpl: 'Nightlife Milan Concierge 24/7 WhatsApp +39 351 912 7047 · Officiële tarieven',
    categoryBoxEyebrow: 'ONTDEK PER CATEGORIE (16 GIDSEN)', categoryBoxHeading: 'Kies jouw Oud & Nieuw 2027 in Milaan',
    filterEyebrow: 'INTERACTIEF FILTER', resetFiltersBtn: 'Filters wissen', tableHeadingSuffix: 'Prijsoverzicht',
    colVenue: 'Locatie / Club', colCity: 'Wijk & Stad', colHours: 'Tijden 31/12', colPrices: 'Prijzen (EUR)',
    mapHeadingHubSuffix: 'Kaart Milaan & Lombardije', mapSubtitleHub: 'Duomo, Brera, Corso Como, Navigli, Sempione, Comomeer & Alpen.',
    faqPrefix: 'Veelgestelde Vragen', programHeadingSuffix: 'Programma & Muziek', musicLabel: 'Muziek & Format',
    pricesHeadingSuffix: 'Prijzen & VIP-tafels', bookingHeading: 'Officiële WhatsApp Concierge · Zonder Bemiddelingskosten',
    bookingSubtitle: 'Ontvang direct via WhatsApp, telefoon of e-mail ticketlinks, galadinermenu’s of VIP-tafelplattegronden.',
    backToAllBtn: '← Terug naar alle 125 Oud & Nieuw Events', mapHeadingEvent: 'Locatiekaart, Adres & Route',
    relatedHeading: 'Meer Oud & Nieuw Events in deze Categorie', metaCtaLabel: 'Info & Boeken', dateBadge: '31/12/2026 – 01/01/2027',
    freeEntryLabel: 'GRATIS TOEGANG', uponRequestLabel: 'Op aanvraag', fromPricePrefix: 'Vanaf', dressCodeLabel: 'Dresscode',
    closedDec31Jan3Badge: 'GESLOTEN 31 DEC – 3 JAN', closedNye2027Badge: 'GESLOTEN OUDJAAR 2027', soldOutNye2027Badge: 'UITVERKOCHT 2027',
    confirmedAlternativesHeading: 'Bevestigde Alternatieven Oud & Nieuw 2027', officialConditionsHeading: 'Officiële Voorwaarden',
    officialConditionsEyebrow: 'OFFICIËLE VOORWAARDEN OUD & NIEUW 2027', sisterVenueMilanLabel: 'Zusterlocatie in Milaan',
    sisterVenueMilanDesc: 'Ontdek ook Just Me Milano (Torre Branca, Parco Sempione): VIP-tafels, feesten 7 dagen per week en gastenlijst.',
    officialVenueGuideLabel: 'Officiële Jaargids van de Locatie', officialVenueGuideDescTpl: 'Bekijk VIP-tafelprijzen, dresscode en weekkalender voor {venue}.',
    confirmedVenuesBanner: 'BEVESTIGDE LOCATIES · 31 DECEMBER 2026', viewPackagesCta: 'Bekijk Pakketten & Boek Online →',
    addressLabel: 'Adres:', hoursLabel: 'Tijden:', priceTiersHeading: 'Officiële Pakketten & Richtprijzen:',
    terrazzaBookingHeading: 'WhatsApp Concierge · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Boek direct online met beveiligde kaartbetaling of stuur Nightlife Milan een bericht op WhatsApp +39 351 912 7047.',
    guestSingular: 'gast', guestPlural: 'gasten', officialDirectTicketingEyebrow: 'OFFICIËLE DIRECTE VERKOOP · BEVESTIGDE TARIEVEN',
    bookPackagesOnlinePrefix: 'Boek bevestigde pakketten online ·', allEventsTitleTpl: '{h1}: Alle {count} Rooftops, Clubs & Galas',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} geverifieerde Oud & Nieuw events in Milaan en Lombardije.',
    hubFaqQ1Tpl: 'Hoeveel Oud & Nieuw 2027 events telt {label}?', hubFaqA1Tpl: 'Deze gids bevat {count} geverifieerde events voor 31 december 2026 in Milaan en Lombardije.',
    hubFaqQ2: 'Wat is het verschil tussen Galadiner, Royal Buffet, Clubticket en VIP-tafel?',
    hubFaqA2: 'Galadiners (€120–€450) bieden een meergangendiner aan tafel. Royal Buffets (€40–€120) bieden lopend buffet plus feest. Clubtickets (€20–€80) geven toegang na 23:30 uur. VIP-tafels (€300–€5.000) omvatten fleskrediet en snelle entree.',
    hubFaqQ3: 'Hoe boek ik tickets, galadiners of VIP-tafels?',
    detailFaqQ1Tpl: 'Wat zijn de officiële prijzen van {venue} voor Oud & Nieuw 2027?', detailFaqQ2Tpl: 'Wat zijn de tijden, het adres en de dresscode van {venue}?',
    detailFaqQ3Tpl: 'Hoe boek ik tickets, diner of een VIP-tafel bij {venue}?',
    detailFaqA2Tpl: '{venue}, {address}, {city} ({province}), tijden {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'Met wie vier je Oud & Nieuw?', lblVenueType: '1. Type Locatie', lblFormula: '2. Pakket',
    lblMusic: '3. Muziek', lblZone: '4. Wijk / Provincie', lblBudget: '5. Budget', lblSearch: '6. Zoek locatie',
    searchPlaceholder: 'Bijv. Just Me, Rooftop, Spa, Navigli...', noResultsTitle: 'Geen resultaten voor deze filters',
    noResultsBody: 'Pas een filter aan om alle events weer te geven.', showAllBtn: 'Toon alle events',
    showingTop24Tpl: 'Top 24 van {total} geverifieerde feesten getoond.', showAllEventsBtnTpl: 'Toon alle {total} events (+{rest})',
    fullDirectoryTpl: 'Volledige lijst ({rest} locaties)', budgetAll: 'Alle prijzen', budgetFree: 'Gratis (€0)',
    budgetLow: 'Budget (t/m €35)', budgetMid: 'Midden (€35 – €70)', budgetLux: 'Luxe / Rooftop (€70+)',
    cats: { 'capodanno-2027': { label: 'Alle 125 Events 2027', badge: 'COMPLEET' }, 'capodanno-rooftop-milano': { label: 'Rooftops & Duomo', badge: 'PANORAMA' }, 'capodanno-discoteche-milano': { label: 'Clubs & Discotheken', badge: 'CLUBBING' }, 'capodanno-locali-cenone-milano': { label: 'Galadiners & Dinner Show', badge: 'GALA' }, 'capodanno-hotel-5-stelle-ville-castelli': { label: '5★ Hotels & Villa’s', badge: 'LUXE' }, 'capodanno-coppie-romantico-milano': { label: 'Stellen & Romantisch', badge: 'STELLEN' }, 'capodanno-single-milano': { label: 'Singles & Vrienden', badge: 'SINGLES' }, 'capodanno-famiglie-bambini-milano': { label: 'Gezinnen & Kinderen', badge: 'GEZINNEN' }, 'capodanno-over-30-40-milano': { label: '30+ / 40+ & Stijlvol', badge: '30+ / 40+' }, 'capodanno-techno-elettronica-milano': { label: 'Techno & Elektronica', badge: 'TECHNO' }, 'capodanno-latino-reggaeton-hiphop-milano': { label: 'Latin, Reggaeton & Urban', badge: 'URBAN' }, 'capodanno-economico-low-cost-milano': { label: 'Voordelig onder €35', badge: 'VOORDELIG' }, 'capodanno-terme-spa-baita-montagna': { label: 'Thermen & Berghutten', badge: 'SPA & ALPEN' }, 'capodanno-speciale': { label: 'Tram, Boot & Theater', badge: 'SPECIAAL' }, 'capodanno-lombardia': { label: 'Lombardije & Meren', badge: 'REGIO' }, 'capodanno-in-piazza': { label: 'Gratis Pleinfeesten', badge: 'GRATIS' } },
    venueTypes: { all: 'Alle Locaties', rooftop: 'Rooftops & Terrassen', discoteca: 'Clubs & Arena’s', 'locale-cenone': 'Dinershows & Lounges', 'live-club': 'Live Muziekclubs', 'hotel-villa-castello': '5★ Hotels & Kastelen', speakeasy: 'Speakeasy & Cocktailbars', 'esperienza-speciale': 'Thermen, Tram & Meren', piazza: 'Openbare Pleinen (Gratis)' },
    audiences: { all: 'Alle Doelgroepen', coppie: 'Stellen', single: 'Singles & Vrienden', famiglie: 'Gezinnen', over30: '30+ / 40+ / 50+', giovani: 'Studenten (18–26)', vip: 'Luxe & VIP-tafels' },
    formulas: { all: 'Alle Formules', cenone: 'Galadiner + Feest', buffet: 'Royal Buffet / Aperitivo', dopocena: 'Alleen Clubentree', 'tavolo-vip': 'VIP-tafel met Flessen', 'hotel-camera': 'Met Hotelkamer / Spa', gratis: 'Gratis Toegang (€0)' },
    music: { all: 'Alle Muziekstijlen', 'commerciale-house': 'Commercial, House & Hits', 'cena-cantata-live': 'Live Band & Dinnershow', 'techno-elettronica': 'Techno & Elektronica', 'latino-urban': 'Reggaeton, Hip-Hop & Latin', 'rock-indie-90s': 'Rock, Indie & 90s/00s', 'swing-jazz-classica': 'Swing, Jazz & Klassiek' },
    zones: { all: 'Alle Wijken (Milaan + Lombardije)', 'duomo-centro-brera': 'Centrum, Duomo & Brera', 'corso-como-sempione': 'Corso Como, Sempione & Porta Nuova', 'navigli-tortona-romana': 'Navigli, Tortona & Porta Romana', 'milano-arena-est-nord': 'San Siro, Forlanini & Bicocca', 'lombardia-laghi-alpi': 'Lombardije, Meren & Alpen' },
  },
  ru: {
    eventsBreadcrumb: 'События', verifiedEventsLabel: 'ПРОВЕРЕННЫЕ СОБЫТИЯ', tocTitle: 'Содержание страницы',
    tocCategoriesTpl: '1. 16 категорий Нового года 2027', tocFilter: '2. Быстрый фильтр по формату и бюджету',
    tocCatalog: '3. Клубы, цены и билеты', tocTable: '4. Таблица цен и расписания',
    tocMap: '5. Интерактивная карта Милана и Ломбардии', tocFaq: '6. Частые вопросы (FAQ)',
    tocProgram: '1. Программа и музыка вечера', tocPrices: '2. Цены, гала-ужины и VIP-столы',
    tocBooking: '3. Официальный WhatsApp-консьерж', tocRelated: '6. Похожие события этой категории',
    tocMenuLabel: 'Официальное меню и вина', quickGuideLabel: 'Краткий гид и цены',
    whatsappLabel: `WhatsApp Консьерж (${SITE_CONTACT.whatsapp.number})`, callLabel: `Позвонить ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Официальный Email', freeAdviceTpl: 'Консьерж Nightlife Milan 24/7 в WhatsApp +39 351 912 7047 · Официальные тарифы',
    categoryBoxEyebrow: 'ВЫБОР ПО КАТЕГОРИИ (16 ГИДОВ)', categoryBoxHeading: 'Выберите идеальный формат Нового года 2027 в Милане',
    filterEyebrow: 'ИНТЕРАКТИВНЫЙ ФИЛЬТР 2027', resetFiltersBtn: 'Сбросить фильтры', tableHeadingSuffix: 'Сравнение цен и времени',
    colVenue: 'Заведение', colCity: 'Район и город', colHours: 'Часы 31/12', colPrices: 'Цены (EUR)',
    mapHeadingHubSuffix: 'Карта Милана и Ломбардии', mapSubtitleHub: 'Дуомо, Брера, Корсо Комо, Навильи, Семпионе, озеро Комо и Альпы.',
    faqPrefix: 'Частые вопросы', programHeadingSuffix: 'Программа и формат ночи', musicLabel: 'Музыка и формат',
    pricesHeadingSuffix: 'Цены, меню и VIP-столы', bookingHeading: 'Официальный WhatsApp-консьерж · Без наценок',
    bookingSubtitle: 'Получите ссылки на билеты, меню гала-ужина или план VIP-столов через WhatsApp, телефон или e-mail.',
    backToAllBtn: '← Ко всем 125 новогодним событиям', mapHeadingEvent: 'Карта, адрес и маршрут',
    relatedHeading: 'Другие новогодние события в этой категории', metaCtaLabel: 'Инфо и бронь', dateBadge: '31.12.2026 – 01.01.2027',
    freeEntryLabel: 'ВХОД СВОБОДНЫЙ', uponRequestLabel: 'По запросу', fromPricePrefix: 'От', dressCodeLabel: 'Дресс-код',
    closedDec31Jan3Badge: 'ЗАКРЫТО 31 ДЕК – 3 ЯНВ', closedNye2027Badge: 'ЗАКРЫТО НА НГ 2027', soldOutNye2027Badge: 'БИЛЕТЫ ПРОДАНЫ 2027',
    confirmedAlternativesHeading: 'Подтверждённые альтернативы НГ 2027', officialConditionsHeading: 'Официальные условия',
    officialConditionsEyebrow: 'ОФИЦИАЛЬНЫЕ ПРАВИЛА НГ 2027', sisterVenueMilanLabel: 'Основной клуб в Милане',
    sisterVenueMilanDesc: 'Откройте также Just Me Milano (Torre Branca, Parco Sempione): VIP-столы, вечеринки 7/7 и списки гостей.',
    officialVenueGuideLabel: 'Официальный гид по клубу круглый год', officialVenueGuideDescTpl: 'Тарифы VIP-столов, дресс-код и расписание для {venue}.',
    confirmedVenuesBanner: 'ПОДТВЕРЖДЁННЫЕ ПЛОЩАДКИ · 31 ДЕКАБРЯ 2026', viewPackagesCta: 'Смотреть тарифы и бронировать →',
    addressLabel: 'Адрес:', hoursLabel: 'Часы:', priceTiersHeading: 'Официальные тарифы и пакеты:',
    terrazzaBookingHeading: 'WhatsApp-консьерж · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Бронируйте онлайн картой на сайте или пишите консьержу Nightlife Milan в WhatsApp +39 351 912 7047.',
    guestSingular: 'гость', guestPlural: 'гостей', officialDirectTicketingEyebrow: 'ОФИЦИАЛЬНОЕ БРОНИРОВАНИЕ · ПОДТВЕРЖДЁННЫЙ ПРАЙС',
    bookPackagesOnlinePrefix: 'Забронировать онлайн ·', allEventsTitleTpl: '{h1}: Все {count} руфтопов, клубов и гала-ужинов',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} проверенных локаций Милана и Ломбардии.',
    hubFaqQ1Tpl: 'Сколько новогодних событий 2027 в разделе {label}?', hubFaqA1Tpl: 'Здесь собрано {count} проверенных мероприятий 31 декабря 2026 года с актуальными ценами.',
    hubFaqQ2: 'В чём разница между гала-ужином, буфетом, входом в клуб и VIP-столом?',
    hubFaqA2: 'Гала-ужин (120€–450€) включает сервированный ужин. Фуршет (40€–120€) объединяет ужин и вечеринку. Клубный билет (20€–80€) открывает вход к полуночи. VIP-стол (300€–5.000€) включает депозит на бутылки и приоритетный вход.',
    hubFaqQ3: 'Как забронировать билеты, гала-ужин или VIP-стол на Новый год 2027?',
    detailFaqQ1Tpl: 'Какие официальные цены в {venue} на Новый год 2027?', detailFaqQ2Tpl: 'Какие часы работы, адрес и дресс-код в {venue} 31 декабря?',
    detailFaqQ3Tpl: 'Как забронировать билет, ужин или VIP-стол в {venue}?',
    detailFaqA2Tpl: '{venue}, {address}, {city} ({province}), время {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'С кем празднуете? (Быстрый фильтр):', lblVenueType: '1. Тип заведения', lblFormula: '2. Формат',
    lblMusic: '3. Музыка', lblZone: '4. Район / Регион', lblBudget: '5. Бюджет', lblSearch: '6. Поиск по названию',
    searchPlaceholder: 'Напр. Just Me, Rooftop, Термы, Navigli...', noResultsTitle: 'Нет событий по выбранным фильтрам',
    noResultsBody: 'Сбросьте один из фильтров или откройте полный список.', showAllBtn: 'Показать все события',
    showingTop24Tpl: 'Показаны топ-24 события из {total} проверенных вариантов.', showAllEventsBtnTpl: 'Показать все {total} событий (+{rest})',
    fullDirectoryTpl: 'Полный каталог (+{rest} заведений)', budgetAll: 'Любой бюджет', budgetFree: 'Бесплатно (0€ · Площади)',
    budgetLow: 'Эконом (до 35€)', budgetMid: 'Средний класс (35€ – 70€)', budgetLux: 'Люкс / Руфтоп (от 70€)',
    cats: { 'capodanno-2027': { label: 'Все 125 событий 2027', badge: 'ПОЛНЫЙ ГИД' }, 'capodanno-rooftop-milano': { label: 'Руфтопы и террасы Дуомо', badge: 'ПАНОРАМА' }, 'capodanno-discoteche-milano': { label: 'Ночные клубы Милана', badge: 'КЛУБЫ' }, 'capodanno-locali-cenone-milano': { label: 'Гала-ужины и шоу', badge: 'ГАЛА-УЖИН' }, 'capodanno-hotel-5-stelle-ville-castelli': { label: 'Отели 5★, виллы и замки', badge: 'ЛЮКС' }, 'capodanno-coppie-romantico-milano': { label: 'Романтика для пар', badge: 'ДЛЯ ПАР' }, 'capodanno-single-milano': { label: 'Соло и компании друзей', badge: 'КОМПАНИИ' }, 'capodanno-famiglie-bambini-milano': { label: 'Семьи с детьми', badge: 'ДЛЯ СЕМЕЙ' }, 'capodanno-over-30-40-milano': { label: 'Аудитория 30+ / 40+', badge: '30+ / 40+' }, 'capodanno-techno-elettronica-milano': { label: 'Техно и электроника', badge: 'ТЕХНО' }, 'capodanno-latino-reggaeton-hiphop-milano': { label: 'Латина, реггетон и хип-хоп', badge: 'URBAN' }, 'capodanno-economico-low-cost-milano': { label: 'Доступно до 35€', badge: 'БЮДЖЕТ' }, 'capodanno-terme-spa-baita-montagna': { label: 'Термы, СПА и шале в горах', badge: 'СПА И АЛЬПЫ' }, 'capodanno-speciale': { label: 'Трамвай, теплоход и театр', badge: 'ОСОБОЕ' }, 'capodanno-lombardia': { label: 'Ломбардия, озёра и горы', badge: 'ЛОМБАРДИЯ' }, 'capodanno-in-piazza': { label: 'Бесплатные площади', badge: 'БЕСПЛАТНО' } },
    venueTypes: { all: 'Все типы', rooftop: 'Панорамные руфтопы', discoteca: 'Клубы и дискотеки', 'locale-cenone': 'Рестораны с ужином и шоу', 'live-club': 'Клубы с живой музыкой', 'hotel-villa-castello': 'Отели 5★, виллы и замки', speakeasy: 'Спикизи и коктейль-бары', 'esperienza-speciale': 'Термы, трамвай и озёра', piazza: 'Открытые площади (бесплатно)' },
    audiences: { all: 'Для всех', coppie: 'Пары', single: 'Друзья и соло', famiglie: 'Семьи и дети', over30: 'Взрослые 30+ / 40+', giovani: 'Молодёжь 18–26', vip: 'Люкс и VIP-столы' },
    formulas: { all: 'Все форматы', cenone: 'Гала-ужин + вечеринка', buffet: 'Фуршет / Аперичена', dopocena: 'Вход после ужина', 'tavolo-vip': 'VIP-стол с бутылками', 'hotel-camera': 'С номером отеля / СПА', gratis: 'Бесплатный вход (0€)' },
    music: { all: 'Любая музыка', 'commerciale-house': 'Commercial, House и хиты', 'cena-cantata-live': 'Поющий ужин и Live-шоу', 'techno-elettronica': 'Techno и электроника', 'latino-urban': 'Reggaeton, Hip-Hop и Salsa', 'rock-indie-90s': 'Rock, Indie и 90-е/2000-е', 'swing-jazz-classica': 'Swing, Jazz и классика' },
    zones: { all: 'Все районы', 'duomo-centro-brera': 'Центр, Дуомо и Брера', 'corso-como-sempione': 'Корсо Комо, Семпионе и Порта Нуова', 'navigli-tortona-romana': 'Навильи, Тортона и Порта Романа', 'milano-arena-est-nord': 'Сан-Сиро, Форланини и Бикокка', 'lombardia-laghi-alpi': 'Ломбардия, озёра и Альпы' },
  },
  tr: {
    eventsBreadcrumb: 'Etkinlikler', verifiedEventsLabel: 'ONAYLI ETKİNLİK', tocTitle: 'Sayfa İçindekiler',
    tocCategoriesTpl: '1. Yılbaşı 2027 İçin 16 Kategori', tocFilter: '2. Hızlı Filtre (Kitle, Müzik, Bütçe)',
    tocCatalog: '3. Mekanlar, Fiyatlar ve Biletler', tocTable: '4. Fiyat ve Saat Karşılaştırma Tablosu',
    tocMap: '5. İnteraktif Milano ve Lombardiya Haritası', tocFaq: '6. Sıkça Sorulan Sorular (SSS)',
    tocProgram: '1. Program, Müzik ve Konsept', tocPrices: '2. Resmi Fiyatlar, Gala Yemeği ve VIP Masalar',
    tocBooking: '3. Resmi WhatsApp Concierge ve Rezervasyon', tocRelated: '6. Aynı Kategorideki Diğer Etkinlikler',
    tocMenuLabel: 'Resmi Menü ve Şaraplar', quickGuideLabel: 'Hızlı Rehber ve Fiyatlar',
    whatsappLabel: `WhatsApp Concierge (${SITE_CONTACT.whatsapp.number})`, callLabel: `Ara ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'Resmi E-posta', freeAdviceTpl: 'Nightlife Milan 7/24 WhatsApp Concierge +39 351 912 7047 · Resmi mekan tarifeleri',
    categoryBoxEyebrow: 'KATEGORİYE GÖRE KEŞFET (16 REHBER)', categoryBoxHeading: 'Milano Yılbaşı 2027 tarzını hemen seç',
    filterEyebrow: 'ETKİLEŞİMLİ YILBAŞI 2027 FİLTRESİ', resetFiltersBtn: 'Filtreleri Sıfırla', tableHeadingSuffix: 'Fiyat ve Saat Tablosu',
    colVenue: 'Mekan / Kulüp', colCity: 'Semt ve Şehir', colHours: '31/12 Saat', colPrices: 'Fiyatlar (EUR)',
    mapHeadingHubSuffix: 'Milano ve Lombardiya Haritası', mapSubtitleHub: 'Duomo, Brera, Corso Como, Navigli, Sempione, Como Gölü ve Alpler.',
    faqPrefix: 'Sıkça Sorulan Sorular', programHeadingSuffix: 'Gece Programı ve Müzik', musicLabel: 'Müzik ve Format',
    pricesHeadingSuffix: 'Fiyatlar, Menüler ve VIP Masalar', bookingHeading: 'Resmi WhatsApp Concierge · Komisyonsuz',
    bookingSubtitle: 'WhatsApp, telefon veya e-posta üzerinden bilet bağlantısını, gala menüsünü veya VIP masa planını anında alın.',
    backToAllBtn: '← Tüm 125 Yılbaşı Etkinliğine Dön', mapHeadingEvent: 'Harita, Adres ve Ulaşım',
    relatedHeading: 'Bu Kategorideki Diğer Yılbaşı Etkinlikleri', metaCtaLabel: 'Bilgi ve Rezervasyon', dateBadge: '31/12/2026 – 01/01/2027',
    freeEntryLabel: 'ÜCRETSİZ GİRİŞ', uponRequestLabel: 'Talep üzerine', fromPricePrefix: 'Başlangıç', dressCodeLabel: 'Kıyafet Kuralı',
    closedDec31Jan3Badge: '31 ARA – 3 OCAK KAPALI', closedNye2027Badge: 'YILBAŞI 2027 KAPALI', soldOutNye2027Badge: 'TÜKENDİ 2027',
    confirmedAlternativesHeading: 'Onaylı Yılbaşı 2027 Alternatifleri', officialConditionsHeading: 'Resmi Koşullar',
    officialConditionsEyebrow: 'RESMİ YILBAŞI 2027 KURALLARI', sisterVenueMilanLabel: 'Milano Ana Mekanı',
    sisterVenueMilanDesc: 'Just Me Milano (Torre Branca, Parco Sempione) mekanını da keşfedin: VIP masalar, 7/7 partiler ve davet listesi.',
    officialVenueGuideLabel: 'Yıl Boyu Resmi Mekan Rehberi', officialVenueGuideDescTpl: '{venue} için VIP masa fiyatları, kıyafet kuralı ve metro ulaşımını inceleyin.',
    confirmedVenuesBanner: 'ONAYLI MEKANLAR · 31 ARALIK 2026', viewPackagesCta: 'Paketleri Gör ve Online Ayırt →',
    addressLabel: 'Adres:', hoursLabel: 'Saatler:', priceTiersHeading: 'Resmi Tarifeler ve Paketler:',
    terrazzaBookingHeading: 'WhatsApp Concierge · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'Yukarıdan güvenli kartla doğrudan rezervasyon yapın veya WhatsApp +39 351 912 7047 üzerinden yazın.',
    guestSingular: 'kişi', guestPlural: 'kişi', officialDirectTicketingEyebrow: 'RESMİ DOĞRUDAN SATIŞ · ONAYLI FİYATLAR',
    bookPackagesOnlinePrefix: 'Onaylı Paketleri Online Ayırt ·', allEventsTitleTpl: '{h1}: {count} Rooftop, Kulüp ve Gala Etkinliği',
    hubSubtitleSuffixTpl: '{h1} ({date}): Milano ve Lombardiya genelinde {count} seçkin yılbaşı mekanı.',
    hubFaqQ1Tpl: '{label} kategorisinde kaç Yılbaşı 2027 etkinliği yer alıyor?', hubFaqA1Tpl: 'Bu rehberde 31 Aralık 2026 gecesi için {count} doğrulanmış yılbaşı etkinliği ve güncel fiyatlar bulunur.',
    hubFaqQ2: 'Gala Yemeği, Royal Büfe, Kulüp Girişi ve VIP Masa arasındaki fark nedir?',
    hubFaqA2: 'Gala Yemeği (€120–€450) oturmalı menü ve gece eğlencesi sunar. Royal Büfe (€40–€120) açık büfe akşam yemeği içerir. Gece girişi (€20–€80) geri sayım sonrası kulüp erişimidir. VIP Masalar (€300–€5.000) şişe kredisi ve öncelikli giriş sağlar.',
    hubFaqQ3: 'Yılbaşı 2027 biletleri, gala yemekleri veya VIP masalar nasıl ayırtılır?',
    detailFaqQ1Tpl: '{venue} Yılbaşı 2027 resmi fiyatları ve paketleri nelerdir?', detailFaqQ2Tpl: '{venue} 31/12/2026 saatleri, adresi ve kıyafet kuralı nedir?',
    detailFaqQ3Tpl: '{venue} mekanında bilet, gala yemeği veya VIP masa nasıl ayırtılır?',
    detailFaqA2Tpl: '{venue}, {address}, {city} ({province}), saatler {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'Kiminle kutluyorsunuz?', lblVenueType: '1. Mekan Türü', lblFormula: '2. Paket / Konsept',
    lblMusic: '3. Müzik Türü', lblZone: '4. Milano Bölgesi', lblBudget: '5. Başlangıç Bütçesi', lblSearch: '6. Mekan veya Semt Ara',
    searchPlaceholder: 'Örn. Just Me, Rooftop, Spa, Navigli...', noResultsTitle: 'Seçilen filtrelere uygun etkinlik yok',
    noResultsBody: 'Bir filtreyi gevşetin veya tüm listeyi görmek için tıklayın.', showAllBtn: 'Tüm Etkinlikleri Göster',
    showingTop24Tpl: 'Doğrulanmış {total} geceden öne çıkan 24 etkinlik gösteriliyor.', showAllEventsBtnTpl: 'Tüm {total} etkinliği gör (+{rest})',
    fullDirectoryTpl: 'Tam rehber dizini (+{rest} mekan)', budgetAll: 'Tüm Bütçeler', budgetFree: 'Ücretsiz (€0)',
    budgetLow: 'Ekonomik (€35’e kadar)', budgetMid: 'Orta Segment (€35 – €70)', budgetLux: 'Lüks / Rooftop (€70+)',
    cats: { 'capodanno-2027': { label: 'Tüm 125 Etkinlik 2027', badge: 'TAM REHBER' }, 'capodanno-rooftop-milano': { label: 'Rooftop ve Duomo Terasları', badge: 'PANORAMA' }, 'capodanno-discoteche-milano': { label: 'Kulüpler ve Diskotekler', badge: 'CLUBBING' }, 'capodanno-locali-cenone-milano': { label: 'Gala Yemeği ve Şovlar', badge: 'GALA' }, 'capodanno-hotel-5-stelle-ville-castelli': { label: '5★ Oteller ve Villalar', badge: 'LÜKS' }, 'capodanno-coppie-romantico-milano': { label: 'Çiftler ve Romantik', badge: 'ÇİFTLER' }, 'capodanno-single-milano': { label: 'Tek Kişi ve Arkadaş Grupları', badge: 'GRUP' }, 'capodanno-famiglie-bambini-milano': { label: 'Aileler ve Çocuklar', badge: 'AİLE' }, 'capodanno-over-30-40-milano': { label: '30+ / 40+ Yetişkin', badge: '30+ / 40+' }, 'capodanno-techno-elettronica-milano': { label: 'Techno ve Elektronik', badge: 'TECHNO' }, 'capodanno-latino-reggaeton-hiphop-milano': { label: 'Latin, Reggaeton ve Urban', badge: 'URBAN' }, 'capodanno-economico-low-cost-milano': { label: 'Uygun Fiyat (€35 altı)', badge: 'EKONOMİK' }, 'capodanno-terme-spa-baita-montagna': { label: 'Termal Spa ve Dağ Evleri', badge: 'SPA & ALPLER' }, 'capodanno-speciale': { label: 'Tarihi Tramvay, Tekne ve Tiyatro', badge: 'ÖZEL' }, 'capodanno-lombardia': { label: 'Lombardiya ve Göller', badge: 'BÖLGE' }, 'capodanno-in-piazza': { label: 'Ücretsiz Meydan Kutlamaları', badge: 'ÜCRETSİZ' } },
    venueTypes: { all: 'Tüm Türler', rooftop: 'Panoramik Rooftoplar', discoteca: 'Gece Kulüpleri', 'locale-cenone': 'Akşam Yemekli Şovlar', 'live-club': 'Canlı Müzik Kulüpleri', 'hotel-villa-castello': '5★ Oteller ve Villalar', speakeasy: 'Speakeasy ve Kokteyl Barlar', 'esperienza-speciale': 'Spa, Tramvay ve Göller', piazza: 'Meydanlar (Ücretsiz)' },
    audiences: { all: 'Tüm Kitleler', coppie: 'Çiftler', single: 'Solo ve Arkadaşlar', famiglie: 'Aileler', over30: '30+ / 40+ / 50+', giovani: 'Gençler (18–26)', vip: 'Lüks ve VIP Masalar' },
    formulas: { all: 'Tüm Paketler', cenone: 'Oturmalı Gala Yemeği + Parti', buffet: 'Royal Büfe / Aperitivo', dopocena: 'Yalnızca Kulüp Girişi', 'tavolo-vip': 'Şişeli VIP Masa', 'hotel-camera': 'Otel / Spa Dahil', gratis: 'Ücretsiz Giriş (€0)' },
    music: { all: 'Tüm Müzik Türleri', 'commerciale-house': 'Commercial, House ve Hit', 'cena-cantata-live': 'Canlı Müzik ve Şarkılı Yemek', 'techno-elettronica': 'Techno ve Elektronik', 'latino-urban': 'Reggaeton, Hip-Hop ve Latin', 'rock-indie-90s': 'Rock, Indie ve 90lar', 'swing-jazz-classica': 'Swing, Jazz ve Klasik' },
    zones: { all: 'Tüm Bölgeler (Milano + Lombardiya)', 'duomo-centro-brera': 'Merkez, Duomo ve Brera', 'corso-como-sempione': 'Corso Como, Sempione ve Porta Nuova', 'navigli-tortona-romana': 'Navigli, Tortona ve Porta Romana', 'milano-arena-est-nord': 'San Siro, Forlanini ve Bicocca', 'lombardia-laghi-alpi': 'Lombardiya, Göller ve Alpler' },
  },
  zh: {
    eventsBreadcrumb: '活动', verifiedEventsLabel: '认证活动', tocTitle: '页面目录',
    tocCategoriesTpl: '1. 2027跨年16大精选分类', tocFilter: '2. 按人群、音乐与预算筛选',
    tocCatalog: '3. 场地、官方价格与门票', tocTable: '4. 价格与营业时间对比表',
    tocMap: '5. 米兰与伦巴第互动地图', tocFaq: '6. 常见问题解答 (FAQ)',
    tocProgram: '1. 活动流程与音乐风格', tocPrices: '2. 官方价格、晚宴与VIP卡座',
    tocBooking: '3. 官方WhatsApp礼宾预订', tocRelated: '6. 同类跨年推荐',
    tocMenuLabel: '官方晚宴菜单与酒水', quickGuideLabel: '快速指南与价格',
    whatsappLabel: `WhatsApp 礼宾 (${SITE_CONTACT.whatsapp.number})`, callLabel: `致电 ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: '官方邮箱', freeAdviceTpl: 'Nightlife Milan 官方24小时WhatsApp礼宾 +39 351 912 7047 · 官方直订价',
    categoryBoxEyebrow: '按类别探索（16份专享指南）', categoryBoxHeading: '选择您的2027米兰跨年夜风格',
    filterEyebrow: '2027跨年互动筛选器', resetFiltersBtn: '重置筛选', tableHeadingSuffix: '价格与时间对比',
    colVenue: '场地 / 夜店', colCity: '区域与城市', colHours: '12/31 营业时间', colPrices: '价格 (EUR)',
    mapHeadingHubSuffix: '米兰与伦巴第地图', mapSubtitleHub: '大教堂广场、布雷拉、Corso Como、运河区、科莫湖及阿尔卑斯山。',
    faqPrefix: '常见问题', programHeadingSuffix: '日程安排与现场氛围', musicLabel: '音乐与形式',
    pricesHeadingSuffix: '官方报价、晚宴与VIP桌位', bookingHeading: '官方WhatsApp礼宾 · 零加价直订',
    bookingSubtitle: '通过WhatsApp、电话或邮件即时获取门票链接、跨年晚宴菜单或VIP卡座平面图。',
    backToAllBtn: '← 返回全部125场跨年活动', mapHeadingEvent: '地图、地址与交通方式',
    relatedHeading: '同类别更多2027跨年活动', metaCtaLabel: '咨询与预订', dateBadge: '2026/12/31 – 2027/01/01',
    freeEntryLabel: '免费入场', uponRequestLabel: '详询报价', fromPricePrefix: '起价', dressCodeLabel: '着装要求',
    closedDec31Jan3Badge: '12月31日至1月3日休息', closedNye2027Badge: '2027跨年休息', soldOutNye2027Badge: '2027跨年已售罄',
    confirmedAlternativesHeading: '2027跨年已确认替代场地', officialConditionsHeading: '官方预订须知',
    officialConditionsEyebrow: '2027跨年夜官方规则', sisterVenueMilanLabel: '米兰旗舰分店',
    sisterVenueMilanDesc: '同步探索米兰Just Me Torre Branca旗舰店：VIP卡座价格、每周7天派对及名单入场。',
    officialVenueGuideLabel: '场地全年官方指南', officialVenueGuideDescTpl: '查看{venue}全年VIP卡座报价、着装规范与地铁路线。',
    confirmedVenuesBanner: '已确认营业场地 · 2026年12月31日', viewPackagesCta: '查看套餐并在线预订 →',
    addressLabel: '地址：', hoursLabel: '时间：', priceTiersHeading: '官方套餐与参考价目：',
    terrazzaBookingHeading: 'WhatsApp 礼宾 · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: '支持网页安全刷卡直订，或联系Nightlife Milan官方WhatsApp +39 351 912 7047预订大型团体。',
    guestSingular: '位宾客', guestPlural: '位宾客', officialDirectTicketingEyebrow: '官方直营售票 · 已确认价目表',
    bookPackagesOnlinePrefix: '在线预订官方确认套餐 ·', allEventsTitleTpl: '{h1}：全部{count}场露台、夜店与跨年晚宴',
    hubSubtitleSuffixTpl: '{h1}（{date}）：严选{count}家米兰屋顶露台、顶级夜店、跨年晚宴与温泉胜地。',
    hubFaqQ1Tpl: '{label}包含多少场2027跨年活动？', hubFaqA1Tpl: '本指南收录2026年12月31日{count}场经核实的跨年活动及最新报价。',
    hubFaqQ2: '跨年晚宴、皇家自助餐、夜店入场券和VIP卡座有什么区别？',
    hubFaqA2: '跨年晚宴（120–450欧元）含专属餐桌与多道式菜单。皇家自助餐（40–120欧元）含鸡尾酒自助与派对。深夜入场（20–80欧元）含跨年倒数与舞池。VIP卡座（300–5,000欧元）含酒水消费额度与快速通道。',
    hubFaqQ3: '如何预订2027米兰跨年门票、晚宴或VIP卡座？',
    detailFaqQ1Tpl: '{venue} 2027跨年官方价格与套餐有哪些？', detailFaqQ2Tpl: '{venue} 12月31日营业时间、地址和着装要求是什么？',
    detailFaqQ3Tpl: '如何预订 {venue} 的门票、跨年晚宴或VIP卡座？',
    detailFaqA2Tpl: '{venue}位于{city} {address}（{province}），时间{hours}。{dressLabel}：{dress}。',
    quickTargetPrompt: '同行人群快速筛选：', lblVenueType: '1. 场地类型', lblFormula: '2. 套餐形式',
    lblMusic: '3. 音乐风格', lblZone: '4. 米兰区域', lblBudget: '5. 预算范围', lblSearch: '6. 搜索场地或街区',
    searchPlaceholder: '如 Just Me, Rooftop, 温泉, Navigli...', noResultsTitle: '没有完全匹配所选条件的活动',
    noResultsBody: '请放宽部分条件或点击下方查看所有活动。', showAllBtn: '显示全部活动',
    showingTop24Tpl: '共{total}场跨年活动，当前展示精选前24场。', showAllEventsBtnTpl: '显示全部{total}场活动 (+{rest})',
    fullDirectoryTpl: '完整场馆索引 (+{rest}家)', budgetAll: '不限预算', budgetFree: '免费 (0欧元 · 广场)',
    budgetLow: '经济型 (35欧元以下)', budgetMid: '中档 (35 – 70欧元)', budgetLux: '奢华 / 露台 (70欧元以上)',
    cats: { 'capodanno-2027': { label: '全部125场2027活动', badge: '完整指南' }, 'capodanno-rooftop-milano': { label: '全景露台与大教堂视野', badge: '天际线' }, 'capodanno-discoteche-milano': { label: '米兰顶级夜店', badge: '夜店' }, 'capodanno-locali-cenone-milano': { label: '跨年晚宴与演艺', badge: '晚宴' }, 'capodanno-hotel-5-stelle-ville-castelli': { label: '五星酒店与庄园古堡', badge: '奢华' }, 'capodanno-coppie-romantico-milano': { label: '浪漫情侣专场', badge: '情侣' }, 'capodanno-single-milano': { label: '单身与好友聚会', badge: '社交' }, 'capodanno-famiglie-bambini-milano': { label: '亲子家庭欢庆', badge: '家庭' }, 'capodanno-over-30-40-milano': { label: '30+/40+优雅成熟场', badge: '30+/40+' }, 'capodanno-techno-elettronica-milano': { label: 'Techno与电音专场', badge: '电音' }, 'capodanno-latino-reggaeton-hiphop-milano': { label: '拉丁与嘻哈派对', badge: 'URBAN' }, 'capodanno-economico-low-cost-milano': { label: '35欧元以内高性价比', badge: '超值' }, 'capodanno-terme-spa-baita-montagna': { label: '温泉水疗与阿尔卑斯木屋', badge: '温泉雪山' }, 'capodanno-speciale': { label: '复古电车、游船与剧院', badge: '特色' }, 'capodanno-lombardia': { label: '伦巴第湖区与周边', badge: '大区' }, 'capodanno-in-piazza': { label: '广场免费倒数演唱会', badge: '免费' } },
    venueTypes: { all: '全部类型', rooftop: '全景屋顶露台', discoteca: '夜店与大型舞厅', 'locale-cenone': '跨年晚宴餐厅', 'live-club': '现场音乐俱乐部', 'hotel-villa-castello': '五星酒店与城堡', speakeasy: '隐秘鸡尾酒吧', 'esperienza-speciale': '温泉、电车与湖泊', piazza: '城市广场 (免费)' },
    audiences: { all: '所有人群', coppie: '情侣浪漫', single: '单身与朋友团', famiglie: '家庭亲子', over30: '30+/40+/50+成熟客群', giovani: '大学生与年轻人 (18–26)', vip: '奢华VIP卡座' },
    formulas: { all: '全部套餐', cenone: '跨年正式晚宴+派对', buffet: '皇家自助晚宴', dopocena: '午夜夜店门票', 'tavolo-vip': 'VIP酒水卡座', 'hotel-camera': '含酒店客房/温泉', gratis: '免费入场 (0欧元)' },
    music: { all: '全部音乐', 'commerciale-house': '流行热单与House', 'cena-cantata-live': '晚宴驻唱与Live秀', 'techno-elettronica': 'Techno与电子音乐', 'latino-urban': '雷鬼顿、嘻哈与拉丁', 'rock-indie-90s': '摇滚、独立与90年代金曲', 'swing-jazz-classica': '爵士、摇摆与古典钢琴' },
    zones: { all: '全部区域 (米兰+伦巴第)', 'duomo-centro-brera': '市中心、大教堂与布雷拉', 'corso-como-sempione': 'Corso Como、新城与和平门', 'navigli-tortona-romana': '运河区、Tortona与罗马门', 'milano-arena-est-nord': '圣西罗、利纳特与北区', 'lombardia-laghi-alpi': '伦巴第12省、科莫湖与阿尔卑斯' },
  },
  ar: {
    eventsBreadcrumb: 'الفعاليات', verifiedEventsLabel: 'فعاليات موثقة', tocTitle: 'فهرس الصفحة',
    tocCategoriesTpl: '1. الفئات الـ 16 لاحتفالات رأس السنة 2027', tocFilter: '2. التصفية السريعة حسب الفئة والموسيقى والميزانية',
    tocCatalog: '3. الأماكن المعتمدة والأسعار والتذاكر', tocTable: '4. جدول مقارنة الأسعار والمواعيد',
    tocMap: '5. خريطة ميلانو ولومبارديا التفاعلية', tocFaq: '6. الأسئلة الشائعة',
    tocProgram: '1. البرنامج والأجواء الموسيقية', tocPrices: '2. الأسعار الرسمية وعشاء الغالا وطاولات VIP',
    tocBooking: '3. الحجز الرسمي عبر واتساب الكونسيرج', tocRelated: '6. فعاليات أخرى في نفس الفئة',
    tocMenuLabel: 'القائمة الرسمية والمشروبات', quickGuideLabel: 'دليل سريع والأسعار',
    whatsappLabel: `واتساب الكونسيرج (${SITE_CONTACT.whatsapp.number})`, callLabel: `اتصل بـ ${SITE_CONTACT.whatsapp.number}`,
    emailLabel: 'البريد الرسمي', freeAdviceTpl: 'خدمة كونسيرج Nightlife Milan على مدار الساعة عبر واتساب 7047 912 351 39+',
    categoryBoxEyebrow: 'تصفح حسب الفئة (16 دليلاً)', categoryBoxHeading: 'اختر أسلوب احتفالك المثالي برأس السنة 2027',
    filterEyebrow: 'فلتر تفاعلي لرأس السنة 2027', resetFiltersBtn: 'إعادة تعيين الفلاتر', tableHeadingSuffix: 'جدول الأسعار والمواعيد',
    colVenue: 'المكان / النادي', colCity: 'المنطقة والمدينة', colHours: 'ساعات 31/12', colPrices: 'الأسعار (يورو)',
    mapHeadingHubSuffix: 'خريطة ميلانو ولومبارديا', mapSubtitleHub: 'الدومو، بريرا، كورسو كومو، نافيلي، سيمبيوني، بحيرة كومو وجبال الألب.',
    faqPrefix: 'الأسئلة الشائعة', programHeadingSuffix: 'البرنامج والموسيقى', musicLabel: 'الموسيقى والنمط',
    pricesHeadingSuffix: 'الأسعار والقوائم وطاولات VIP', bookingHeading: 'كونسيرج واتساب الرسمي · بدون عمولة إضافية',
    bookingSubtitle: 'احصل فوراً عبر واتساب أو الهاتف أو البريد على روابط التذاكر أو قائمة عشاء الغالا أو مخطط طاولات VIP.',
    backToAllBtn: '← العودة إلى جميع فعاليات رأس السنة الـ 125', mapHeadingEvent: 'الخريطة والعنوان وكيفية الوصول',
    relatedHeading: 'المزيد من فعاليات رأس السنة في هذه الفئة', metaCtaLabel: 'المعلومات والحجز', dateBadge: '31/12/2026 – 01/01/2027',
    freeEntryLabel: 'دخول مجاني', uponRequestLabel: 'عند الطلب', fromPricePrefix: 'ابتداءً من', dressCodeLabel: 'قواعد اللباس',
    closedDec31Jan3Badge: 'مغلق 31 ديسمبر – 3 يناير', closedNye2027Badge: 'مغلق ليلة رأس السنة 2027', soldOutNye2027Badge: 'نفدت التذاكر 2027',
    confirmedAlternativesHeading: 'البدائل المؤكدة لرأس السنة 2027', officialConditionsHeading: 'الشروط الرسمية',
    officialConditionsEyebrow: 'اللائحة الرسمية لرأس السنة 2027', sisterVenueMilanLabel: 'الفرع الرئيسي في ميلانو',
    sisterVenueMilanDesc: 'اكتشف أيضاً فرع Just Me Milano في حديقة سيمبيوني: أسعار طاولات VIP وحفلات طوال الأسبوع.',
    officialVenueGuideLabel: 'الدليل الرسمي للمكان طوال العام', officialVenueGuideDescTpl: 'اطلع على أسعار طاولات VIP وقواعد اللباس ومحطات المترو لـ {venue}.',
    confirmedVenuesBanner: 'أماكن مؤكدة · 31 ديسمبر 2026', viewPackagesCta: 'عرض الباقات والحجز أونلاين ←',
    addressLabel: 'العنوان:', hoursLabel: 'المواعيد:', priceTiersHeading: 'الأسعار والباقات الرسمية / المرجعية:',
    terrazzaBookingHeading: 'واتساب كونسيرج · Terrazza Duomo 21 & MA.RE',
    terrazzaBookingSubtitle: 'احجز مباشرة عبر الإنترنت ببطاقة الدفع الآمنة أو تواصل عبر واتساب 7047 912 351 39+.',
    guestSingular: 'ضيف', guestPlural: 'ضيوف', officialDirectTicketingEyebrow: 'حجز مباشر رسمي · أسعار مؤكدة',
    bookPackagesOnlinePrefix: 'احجز الباقات المؤكدة أونلاين ·', allEventsTitleTpl: '{h1}: جميع فعاليات الـ {count} روفتوب ونادي وعشاء',
    hubSubtitleSuffixTpl: '{h1} ({date}): {count} وجهة مختارة في ميلانو ولومبارديا بين التراسات الفاخرة والنوادي.',
    hubFaqQ1Tpl: 'كم عدد فعاليات رأس السنة 2027 في {label}؟', hubFaqA1Tpl: 'يضم هذا الدليل {count} فعالية موثقة لليلة 31 ديسمبر 2026 بالأسعار الرسمية أو المرجعية.',
    hubFaqQ2: 'ما الفرق بين عشاء الغالا والبوفيه الملكي وتذكرة النادي وطاولة VIP؟',
    hubFaqA2: 'عشاء الغالا (120€–450€) يشمل طاولة خاصة وقائمة طعام متكاملة. البوفيه الملكي (40€–120€) يجمع البوفيه مع السهرة. دخول النادي (20€–80€) يشمل الحفل بعد منتصف الليل. طاولات VIP (300€–5,000€) تشمل رصيد مشروبات ودخولاً سريعاً.',
    hubFaqQ3: 'كيف أحجز تذاكر أو عشاء رأس السنة أو طاولة VIP في ميلانو 2027؟',
    detailFaqQ1Tpl: 'ما هي الأسعار الرسمية لـ {venue} في ليلة رأس السنة 2027؟', detailFaqQ2Tpl: 'ما هي ساعات العمل والعنوان وقواعد اللباس في {venue} يوم 31/12/2026؟',
    detailFaqQ3Tpl: 'كيف أحجز التذاكر أو العشاء أو طاولة VIP في {venue}؟',
    detailFaqA2Tpl: '{venue} في {address}، {city} ({province})، الساعات {hours}. {dressLabel}: {dress}.',
    quickTargetPrompt: 'مع من تحتفل؟ (تصفية سريعة):', lblVenueType: '1. نوع المكان', lblFormula: '2. الباقة',
    lblMusic: '3. الموسيقى', lblZone: '4. الحي / المنطقة', lblBudget: '5. نطاق السعر', lblSearch: '6. البحث عن مكان',
    searchPlaceholder: 'مثال: Just Me, Rooftop, سبا, Navigli...', noResultsTitle: 'لا توجد فعاليات تطابق جميع الفلاتر',
    noResultsBody: 'حاول تخفيف أحد الفلاتر أو اعرض جميع الفعاليات أدناه.', showAllBtn: 'عرض جميع الفعاليات',
    showingTop24Tpl: 'عرض أبرز 24 فعالية من أصل {total} سهرة موثقة.', showAllEventsBtnTpl: 'عرض جميع الـ {total} فعالية (+{rest})',
    fullDirectoryTpl: 'الفهرس الكامل (+{rest} مكاناً)', budgetAll: 'كل الميزانيات', budgetFree: 'مجاني (0€ · الساحات)',
    budgetLow: 'اقتصادي (حتى 35€)', budgetMid: 'متوسط (35€ – 70€)', budgetLux: 'فاخر / روفتوب (أكثر من 70€)',
    cats: { 'capodanno-2027': { label: 'جميع الـ 125 فعالية', badge: 'الدليل الكامل' }, 'capodanno-rooftop-milano': { label: 'التراسات وإطلالات الدومو', badge: 'بانوراما' }, 'capodanno-discoteche-milano': { label: 'النوادي الليلية في ميلانو', badge: 'نوادي' }, 'capodanno-locali-cenone-milano': { label: 'عشاء الغالا والعروض', badge: 'عشاء وحفل' }, 'capodanno-hotel-5-stelle-ville-castelli': { label: 'فنادق 5 نجوم وقصور', badge: 'فاخر' }, 'capodanno-coppie-romantico-milano': { label: 'أزواج وعشاء رومانسي', badge: 'رومانسي' }, 'capodanno-single-milano': { label: 'أفراد ومجموعات أصدقاء', badge: 'أصدقاء' }, 'capodanno-famiglie-bambini-milano': { label: 'عائلات مع أطفال', badge: 'عائلات' }, 'capodanno-over-30-40-milano': { label: 'فوق 30 / 40 عاماً', badge: '+30 / +40' }, 'capodanno-techno-elettronica-milano': { label: 'تكنو وموسيقى إلكترونية', badge: 'إلكترونية' }, 'capodanno-latino-reggaeton-hiphop-milano': { label: 'لاتيني وهيب هوب', badge: 'أوربان' }, 'capodanno-economico-low-cost-milano': { label: 'اقتصادي أقل من 35€', badge: 'اقتصادي' }, 'capodanno-terme-spa-baita-montagna': { label: 'منتجعات سبا وجبال الألب', badge: 'سبا وجبال' }, 'capodanno-speciale': { label: 'الترام التراثي وقارب نافيلي', badge: 'تجارب خاصة' }, 'capodanno-lombardia': { label: 'لومبارديا والبحيرات', badge: 'لومبارديا' }, 'capodanno-in-piazza': { label: 'احتفالات مجانية في الساحات', badge: 'مجاني' } },
    venueTypes: { all: 'جميع الأنواع', rooftop: 'تراسات بانورامية', discoteca: 'نوادي ليلية', 'locale-cenone': 'عشاء وعروض حية', 'live-club': 'نوادي موسيقى حية', 'hotel-villa-castello': 'فنادق 5★ وقصور', speakeasy: 'بارات كوكتيل', 'esperienza-speciale': 'سبا وترام وبحيرات', piazza: 'الساحات العامة (مجاني)' },
    audiences: { all: 'جميع الفئات', coppie: 'أزواج', single: 'أفراد وأصدقاء', famiglie: 'عائلات', over30: 'كبار +30 / +40', giovani: 'شباب (18–26)', vip: 'طاولات VIP فاخرة' },
    formulas: { all: 'جميع الباقات', cenone: 'عشاء غالا + حفل', buffet: 'بوفيه ملكي / أبيريتيفو', dopocena: 'دخول النادي فقط', 'tavolo-vip': 'طاولة VIP مع زجاجات', 'hotel-camera': 'مع غرفة فندق / سبا', gratis: 'دخول مجاني (0€)' },
    music: { all: 'جميع الأنواع الموسيقية', 'commerciale-house': 'هاوس وأغاني معاصرة', 'cena-cantata-live': 'عشاء غنائي وعروض حية', 'techno-elettronica': 'تكنو وإلكترونيك', 'latino-urban': 'ريغيتون وهيب هوب ولاتيني', 'rock-indie-90s': 'روك وإندي وتسعينات', 'swing-jazz-classica': 'جاز وسوينغ وكلاسيك' },
    zones: { all: 'كل المناطق (ميلانو + لومبارديا)', 'duomo-centro-brera': 'وسط ميلانو، الدومو وبريرا', 'corso-como-sempione': 'كورسو كومو وسيمبيوني', 'navigli-tortona-romana': 'نافيلي وتورتونا وبورتا رومانا', 'milano-arena-est-nord': 'سان سيرو وفورلانيني وبيكوكا', 'lombardia-laghi-alpi': 'لومبارديا والبحيرات والألب' },
  },
};

export function getWords35(locale: string): LocaleWords35 {
  const code = (enabledLocaleCodes.includes(locale as LocaleCode) ? locale : 'en') as LocaleCode;
  return WORDS_35[code] || (EURO_WORDS_24 as Record<string, LocaleWords35>)[code] || WORDS_35.en;
}

export function getCapodannoCategoryBadge35(slug: string, locale: string, fallbackIt: string, fallbackEn: string): string {
  if (locale === 'it') return fallbackIt;
  if (locale === 'en') return fallbackEn;
  const w = getWords35(locale);
  return w.cats[slug]?.badge || w.verifiedEventsLabel;
}

export function getCapodannoCategoryShortLabel35(slug: string, locale: string, fallbackIt: string, fallbackEn: string): string {
  if (locale === 'it') return fallbackIt;
  if (locale === 'en') return fallbackEn;
  const w = getWords35(locale);
  return w.cats[slug]?.label || capodannoNavigation(locale).h1;
}

export function getCapodannoCategoryQuickAnswer35(
  pageDef: CapodannoCategoryPageDef,
  locale: string,
  eventsCount: number,
): string {
  if (locale === 'it') return pageDef.quickAnswerIt;
  if (locale === 'en') return pageDef.quickAnswerEn;
  const w = getWords35(locale);
  const nav = capodannoNavigation(locale);
  const label = w.cats[pageDef.slug]?.label || nav.menuLabel;
  return w.hubFaqA1Tpl.replace('{count}', String(eventsCount)) + ` (${label} · WhatsApp ${SITE_CONTACT.whatsapp.number}).`;
}

export function getCapodannoHubFaqs35(params: {
  pageDef: CapodannoCategoryPageDef;
  locale: string;
  eventsCount: number;
  subtitle: string;
  quickAnswer: string;
  paymentSteps: readonly string[];
}): Array<{ q: string; a: string }> {
  const { pageDef, locale, eventsCount, paymentSteps } = params;
  const w = getWords35(locale);
  const nav = capodannoNavigation(locale);
  const label = w.cats[pageDef.slug]?.label || (locale === 'it' ? pageDef.shortLabelIt : pageDef.shortLabelEn) || nav.h1;
  return [
    {
      q: w.hubFaqQ1Tpl.replace('{label}', label),
      a: w.hubFaqA1Tpl.replace('{count}', String(eventsCount)),
    },
    { q: w.hubFaqQ2, a: w.hubFaqA2 },
    { q: w.hubFaqQ3, a: `${w.freeAdviceTpl}. ${paymentSteps.join(' ')}` },
  ];
}

export function getCapodannoDetailFaqs35(params: {
  locale: string;
  venueName: string;
  address: string;
  city: string;
  province: string;
  hours: string;
  dressCode: string;
  priceSummary: string;
  sourceBasis: string;
  paymentSteps: readonly string[];
}): Array<{ q: string; a: string }> {
  const w = getWords35(params.locale);
  return [
    {
      q: w.detailFaqQ1Tpl.replace('{venue}', params.venueName),
      a: `${params.venueName} (${params.address}, ${params.city}): ${params.priceSummary}. ${params.sourceBasis}`,
    },
    {
      q: w.detailFaqQ2Tpl.replace('{venue}', params.venueName),
      a: w.detailFaqA2Tpl
        .replace('{venue}', params.venueName)
        .replace('{address}', params.address)
        .replace('{city}', params.city)
        .replace('{province}', params.province)
        .replace('{hours}', params.hours)
        .replace('{dressLabel}', w.dressCodeLabel)
        .replace('{dress}', params.dressCode),
    },
    {
      q: w.detailFaqQ3Tpl.replace('{venue}', params.venueName),
      a: `${w.freeAdviceTpl}. ${params.paymentSteps.join(' ')}`,
    },
  ];
}

export function getCapodannoFilterOptions35(locale: string) {
  const w = getWords35(locale);
  const toArr = <T extends string>(keys: readonly T[], rec: Record<T, string>) =>
    keys.map((value) => ({ value, label: rec[value] || WORDS_35.en.venueTypes['all' as keyof typeof WORDS_35.en.venueTypes] || value }));
  return {
    w,
    venueTypeOptions: toArr(['all', 'rooftop', 'discoteca', 'locale-cenone', 'live-club', 'hotel-villa-castello', 'speakeasy', 'esperienza-speciale', 'piazza'] as const, w.venueTypes),
    audienceOptions: toArr(['all', 'coppie', 'single', 'famiglie', 'over30', 'giovani', 'vip'] as const, w.audiences),
    formulaOptions: toArr(['all', 'cenone', 'buffet', 'dopocena', 'tavolo-vip', 'hotel-camera', 'gratis'] as const, w.formulas),
    musicOptions: toArr(['all', 'commerciale-house', 'cena-cantata-live', 'techno-elettronica', 'latino-urban', 'rock-indie-90s', 'swing-jazz-classica'] as const, w.music),
    zoneOptions: toArr(['all', 'duomo-centro-brera', 'corso-como-sempione', 'navigli-tortona-romana', 'milano-arena-est-nord', 'lombardia-laghi-alpi'] as const, w.zones),
    budgetOptions: [
      { value: 'all', label: w.budgetAll },
      { value: 'free', label: w.budgetFree },
      { value: 'low', label: w.budgetLow },
      { value: 'mid', label: w.budgetMid },
      { value: 'lux', label: w.budgetLux },
    ],
  };
}

export function formatCapodannoHours35(hours: string, locale: string): string {
  if (locale === 'it') return hours;
  const trimmed = hours.trim();
  if (/^\d{2}:\d{2}\s*[–-]\s*\d{2}:\d{2}$/.test(trimmed)) {
    return hours;
  }
  const w = getWords35(locale);
  if (
    trimmed.includes('Sold Out') ||
    trimmed.startsWith('Chiuso') ||
    trimmed.startsWith('Sede chiusa') ||
    trimmed.startsWith('Esaurito') ||
    trimmed.startsWith('Nessuna')
  ) {
    return w.soldOutNye2027Badge;
  }
  if (trimmed.startsWith('Orari') || trimmed.includes('su richiesta')) {
    return w.uponRequestLabel;
  }
  return hours;
}

export function formatCapodannoPriceBadge35(event: CapodannoEventItem, locale: string): string {
  const w = getWords35(locale);
  if (event.soldOutForNye || event.closedForNye) {
    return w.soldOutNye2027Badge;
  }
  if (event.priceFromEur === 0) {
    return event.category === 'piazza' ? w.freeEntryLabel : w.uponRequestLabel;
  }
  return locale === 'it' ? `${w.fromPricePrefix} ${event.priceFromEur}€` : `${w.fromPricePrefix} €${event.priceFromEur}`;
}

export function buildFallbackLocalizedEventContent35(
  event: CapodannoEventItem,
  locale: string,
  title: string,
  subtitle: string,
): CapodannoLocalizedEventContent {
  if (locale === 'it') {
    return {
      title,
      subtitle,
      description: event.descriptionIt,
      musicAndFormat: event.musicAndFormatIt,
      dressCode: event.dressCodeIt,
      priceSummary: event.priceSummaryIt,
      tiers: event.tiersIt,
      highlights: event.highlightsIt,
      sourceBasis: event.sourceBasisIt,
    };
  }
  if (locale === 'en') {
    return {
      title,
      subtitle,
      description: event.descriptionEn,
      musicAndFormat: event.musicAndFormatEn,
      dressCode: event.dressCodeEn,
      priceSummary: event.priceSummaryEn,
      tiers: event.tiersEn,
      highlights: event.highlightsEn,
      sourceBasis: event.sourceBasisEn,
    };
  }
  const w = getWords35(locale);
  const hoursText = formatCapodannoHours35(event.hours, locale);
  const priceLabel = formatCapodannoPriceBadge35(event, locale);
  const musicText = w.music[event.musicTag] || event.musicAndFormatEn;
  const venueTypeText = w.venueTypes[event.venueType] || '';
  const zoneText = w.zones[event.zoneTag] || event.city;
  return {
    title,
    subtitle,
    description: `${title} · ${event.venueName} (${event.address}, ${event.city}). ${venueTypeText} · ${w.hoursLabel} ${hoursText} · ${musicText}. ${priceLabel}.`,
    musicAndFormat: musicText,
    dressCode: event.category === 'piazza' ? w.freeEntryLabel : `${w.dressCodeLabel}: Elegant / Smart Chic`,
    priceSummary: priceLabel,
    tiers: event.tiersEn.length > 0 && event.priceFromEur > 0
      ? event.formulas.slice(0, 3).map((f) => ({
          label: w.formulas[f] || priceLabel,
          price: priceLabel,
          details: `${w.hoursLabel} ${hoursText} · WhatsApp ${SITE_CONTACT.whatsapp.number}`,
        }))
      : [],
    highlights: [
      `${event.venueName} · ${event.address}, ${event.city}`,
      `${w.hoursLabel} ${hoursText} · ${w.dateBadge}`,
      `${musicText} · ${zoneText}`,
      `${priceLabel} · WhatsApp ${SITE_CONTACT.whatsapp.number}`,
    ],
    sourceBasis: `${w.verifiedEventsLabel} · ${w.freeAdviceTpl}`,
  };
}
