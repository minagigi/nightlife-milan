import type { LocaleCode } from './localeRegistry';
import { ALL_35_LOCALES } from './localizedSlugs35';

export interface LocalizedChapter35 {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LocalizedFaq35 {
  question: string;
  answer: string;
}

export interface ZoneUiLabels35 {
  home: string;
  zonesHub: string;
  tocTitle: string;
  clubsInZone: string;
  upcomingEvents: string;
  faqTitle: string;
  otherZones: string;
  bookVipCta: string;
  metroLabel: string;
  priceRangeLabel: string;
  dressCodeLabel: string;
  verifiedBadge: string;
  verifiedBody: string;
  quickAnswerTitle: string;
  directDeskLabel: string;
}

export interface ZoneLocalized35 {
  slug: string;
  name: string;
  vibe: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  metro: string;
  priceRange: string;
  dressCode: string;
  topClubs: string[];
  sections: LocalizedChapter35[];
  faqs: LocalizedFaq35[];
  ui: ZoneUiLabels35;
}

export interface GenreUiLabels35 {
  home: string;
  genresHub: string;
  tocTitle: string;
  recommendedClubs: string;
  upcomingEvents: string;
  faqTitle: string;
  otherGenres: string;
  bookVipCta: string;
  verifiedBadge: string;
  verifiedBody: string;
  quickAnswerTitle: string;
  directDeskLabel: string;
}

export interface GenreLocalized35 {
  slug: string;
  name: string;
  h1: string;
  subtitle: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  topClubs: string[];
  sections: LocalizedChapter35[];
  faqs: LocalizedFaq35[];
  ui: GenreUiLabels35;
}

export interface TaxonomyHubUi35 {
  home: string;
  crumbLabel: string;
  badge: string;
  h1: string;
  lead: string;
  quickAnswerTitle: string;
  quickAnswerBody: string;
  tocTitle: string;
  tocItems: { id: string; title: string }[];
  featuredHeading: string;
  allItemsHeading: string;
  editorialHeading: string;
  sections: LocalizedChapter35[];
  faqTitle: string;
  faqs: LocalizedFaq35[];
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  cardCountLabel: string;
}

interface LangPack35 {
  city: string;
  home: string;
  zonesHub: string;
  genresHub: string;
  tocTitle: string;
  clubsInZone: string;
  recommendedClubs: string;
  upcomingEvents: string;
  faqTitle: string;
  otherZones: string;
  otherGenres: string;
  bookVipCta: string;
  metroLabel: string;
  priceRangeLabel: string;
  dressCodeLabel: string;
  verifiedBadge: string;
  verifiedBody: string;
  quickAnswerTitle: string;
  directDeskLabel: string;
  zoneTitleFmt: (zone: string) => string;
  zoneDescFmt: (zone: string, metro: string) => string;
  genreTitleFmt: (genre: string) => string;
  genreDescFmt: (genre: string) => string;
  zoneHeadings: [string, string, string, string, string];
  genreHeadings: [string, string, string, string, string];
  hubZonesBadge: string;
  hubZonesH1: string;
  hubZonesLead: string;
  hubZonesQuick: string;
  hubGenresBadge: string;
  hubGenresH1: string;
  hubGenresLead: string;
  hubGenresQuick: string;
  ctaTitle: string;
  ctaDesc: string;
  secOverview: (name: string, vibe: string, metro: string, clubs: string) => string[];
  secAccess: (name: string, metro: string) => string[];
  secClubs: (name: string, clubs: string) => string[];
  secPrices: (name: string, prices: string, dress: string) => string[];
  secTips: (name: string) => string[];
  genreSecSound: (name: string, clubs: string) => string[];
  genreSecVenues: (name: string, clubs: string) => string[];
  genreSecPricing: (name: string) => string[];
  genreSecDoor: (name: string) => string[];
  genreSecTips: (name: string) => string[];
  faqPairs: (kind: 'zone' | 'genre', name: string, metroOrStyle: string, clubs: string) => LocalizedFaq35[];
}

function clampMetaTitle(raw: string, fallbackShort: string): string {
  const clean = raw.replace(/\u2014/g, '-').replace(/\s+/g, ' ').trim();
  if (clean.length <= 60) return clean;
  const f = fallbackShort.replace(/\u2014/g, '-').replace(/\s+/g, ' ').trim();
  if (f.length <= 60) return f;
  const slice = f.slice(0, 58);
  const idx = slice.lastIndexOf(' ');
  return idx > 28 ? slice.slice(0, idx).trim() : slice.trim();
}

function clampMetaDesc(raw: string): string {
  const clean = raw.replace(/\u2014/g, '-').replace(/\s+/g, ' ').trim();
  if (clean.length <= 156) return clean;
  const wa = '+39 351 912 7047.';
  const withoutWa = clean.replace(/\s*WhatsApp\s*\+39\s*351\s*912\s*7047\.?/gi, '').trim();
  const budget = 156 - (` WhatsApp ${wa}`).length;
  const slice = withoutWa.slice(0, Math.max(40, budget));
  const lastSpace = slice.lastIndexOf(' ');
  const prefix = lastSpace > 30 ? slice.slice(0, lastSpace).replace(/[,:;.\-]+$/, '') : slice;
  return `${prefix}. WhatsApp ${wa}`;
}

const PACKS: Record<'en' | 'it', LangPack35> = {
  en: {
    city: 'Milan',
    home: 'Home',
    zonesHub: 'Zones',
    genresHub: 'Genres',
    tocTitle: 'In This Guide',
    clubsInZone: 'Featured Clubs & Priority Tables',
    recommendedClubs: 'Top Clubs for This Sound',
    upcomingEvents: 'Upcoming Events & Nights',
    faqTitle: 'Frequently Asked Questions',
    otherZones: 'Explore All 14 Milan Districts',
    otherGenres: 'Explore All 10 Music Genres',
    bookVipCta: 'Book VIP Table on WhatsApp',
    metroLabel: 'Metro & Transit',
    priceRangeLabel: 'VIP Tables & Lists',
    dressCodeLabel: 'Dress Code',
    verifiedBadge: 'Verified Concierge Desk · Nov 2026',
    verifiedBody: 'Door rules, metro connections & official 2026/2027 bottle prices verified by Nightlife Milan Concierge (0% booking fee).',
    quickAnswerTitle: 'Quick Answer · Executive Summary',
    directDeskLabel: '24/7 WhatsApp Desk +39 351 912 7047',
    zoneTitleFmt: (z) => clampMetaTitle(`${z} Nightlife Milan 2026 | Clubs & VIP Tables`, `${z} Clubs Milan | Nightlife Milan`),
    zoneDescFmt: (z, m) => clampMetaDesc(`${z} Milan nightlife 2026/2027: best clubs, ${m} metro access, dress code & VIP tables €250+. Free guest list via WhatsApp +39 351 912 7047.`),
    genreTitleFmt: (g) => clampMetaTitle(`${g} Clubs Milan 2026 | Events & VIP Tables`, `${g} Nightlife Milan | Nightlife Milan`),
    genreDescFmt: (g) => clampMetaDesc(`Best ${g} clubs in Milan 2026/2027: weekly schedule, guest lists €20-€35, VIP tables €250+ & dress code. Book free via WhatsApp +39 351 912 7047.`),
    zoneHeadings: ['District Overview & Crowd Profile', 'Metro M1-M5, Night Buses & Taxi Arrival', 'Best Clubs, Lounges & Partner Venues', '2026/2027 VIP Table Prices & Dress Code', 'Concierge Timing & Fast-Track Entry Tips'],
    genreHeadings: ['Sound Profile & Crowd Atmosphere', 'Top Priority Clubs & Weekly Schedule', 'VIP Table Prices & Guest List Tiers', 'Door Selection & Dress Code Rules', 'Concierge Booking Tips (+39 351 912 7047)'],
    hubZonesBadge: '14 Milan Nightlife Districts · 2026/2027',
    hubZonesH1: "Milan's Nightlife Districts",
    hubZonesLead: 'Every neighborhood in Milan pulses with a different rhythm. Compare Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola and Duomo.',
    hubZonesQuick: 'Top priority districts: Parco Sempione (Just Me 7/7, 55 Milano), Corso Como (Pineta, Repvblic, Hollywood, Tocqueville 13), San Siro (Aria Club 150m from Stadium) & Portello (Voya Rooftop 20th Floor). Book on WhatsApp +39 351 912 7047.',
    hubGenresBadge: '10 Official Music Genres & Formats · 2026/2027',
    hubGenresH1: 'Find Your Sound in Milan',
    hubGenresLead: 'From Vocal & Afro House in luxury gardens under Torre Branca and San Siro, to Reggaeton in Corso Como, industrial Techno warehouses, and Singing Dinner Shows.',
    hubGenresQuick: 'House & Afro House: Just Me, Aria Club, Voya Rooftop, 55 Milano. Reggaeton & Hip-Hop: Pineta Milano, Tocqueville 13, Repvblic, The Club, Hollywood. Techno: Volt, Magazzini Generali, Amnesia, Fabrique. WhatsApp +39 351 912 7047.',
    ctaTitle: 'Need a VIP Table or Priority Guest List Tonight?',
    ctaDesc: 'Zero agency fees, live floorplans in under 10 minutes and direct nominal accreditation across all 19 verified partner venues in Milan.',
    secOverview: (n, v, m, c) => [`${n} (${v}) stands out as one of Milan's essential nightlife hubs for the 2026/2027 season. Linked seamlessly via ${m}, this area brings together late-night dining, signature cocktails and high-energy dancefloors anchored by ${c}.`, `Whether you are planning an international business evening, a university celebration or a Champions League afterparty, booking your nominal guest list or reserved VIP table in ${n} before 19:00 guarantees smooth door clearance with zero queue markup.`],
    secAccess: (n, m) => [`Reaching ${n} is direct thanks to ${m}. After 00:30, Milan ATM night buses (NM1, NM2, NM3, N25/N26, 90/91) and licensed white taxis connect ${n} to Centrale FS, Duomo, San Siro and Linate Airport (M4) within 10-20 minutes.`, `For guests staying near Linate, Malpensa Express stations (Cadorna/Centrale) or Rho Fiera, pre-arranging a table in ${n} ensures your driver can drop you right at the VIP rope.`],
    secClubs: (n, c) => [`Our Concierge actively accredits guests every week across the top venues in and around ${n}, led by ${c}. Every listing includes verified guest list windows (23:30-01:00) and private table floorplans.`, `When venues reach weekend capacity around 01:00, confirmed Nightlife Milan table holders retain priority access directly with the door director.`],
    secPrices: (n, p, d) => [`Official 2026/2027 rates in ${n}: ${p}. Every VIP table budget is 100% spendable on premium bottles (Belvedere, Grey Goose, Dom Pérignon, Clase Azul) with complimentary mixers and dedicated hostess escort.`, `Dress code policy in ${n}: ${d}. Smart leather shoes, tailored blazers or evening wear ensure effortless clearance for mixed and international groups.`],
    secTips: (n) => [`Message WhatsApp Concierge (+39 351 912 7047) with date, full name, guest count (M/F balance) and ${n} venue choice. Check-in before 00:15 maximizes list perks, while VIP table arrival is guaranteed until 01:30.`],
    genreSecSound: (n, c) => [`The ${n} scene in Milan for 2026/2027 sets European standards for lighting, Funktion-One/d&b acoustics and curated resident DJs across ${c}.`, `From early 19:30 aperitivo warm-ups to peak-hour 01:30-04:00 headliner sets, each venue balances sound identity with refined table hospitality.`],
    genreSecVenues: (n, c) => [`Top priority venues for ${n} nights in Milan include ${c}. Each partner club features dedicated dancefloor and console privé zones depending on group size and bottle service tier.`],
    genreSecPricing: (n) => [`Nominal ${n} guest list entry ranges €15-€30 with drink included before 01:00. Reserved VIP tables start at €250-€350 on the dancefloor (5-8 guests) and €500-€1,500+ in console privé zones, 100% redeemable at the bar.`],
    genreSecDoor: (n) => [`Milan door teams enforce selective styling on ${n} nights: elegant casual / smart glamour at Just Me, Pineta, Aria, Voya and 55 Milano; sleek total-black contemporary clubwear at Volt, Amnesia and Magazzini Generali. Avoid hoodies, running trainers or beachwear.`],
    genreSecTips: (n) => [`Reserve ${n} accreditation via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com before 19:00 on the event day. You receive direct QR/nominal confirmation and live floorplan options at zero commission.`],
    faqPairs: (_k, n, m, c) => [
      { question: `What are the best clubs for ${n} in Milan 2026/2027?`, answer: `Top verified venues include ${c}. Message WhatsApp +39 351 912 7047 for tonight's live line-up and free nominal accreditation.` },
      { question: `How much do VIP tables and entry cost for ${n}?`, answer: `Guest lists average €20-€30 with drink included; VIP tables start from €250-€350 (100% spendable on bottles) with 0% agency fee.` },
      { question: `What is the dress code and arrival window?`, answer: `Smart-glamour / chic evening attire (${m}). Arrive between 23:30 and 00:30 for guest lists or up to 01:30 for confirmed VIP tables.` },
      { question: `How do I book free concierge access for ${n}?`, answer: `Send date, full name and group size on WhatsApp +39 351 912 7047 or email concierge@nightlifemilan.com for reply in under 10 minutes.` },
    ],
  },
  it: {
    city: 'Milano',
    home: 'Home',
    zonesHub: 'Quartieri',
    genresHub: 'Generi',
    tocTitle: 'Indice della Guida',
    clubsInZone: 'Club Partner e Tavoli Prioritari',
    recommendedClubs: 'Migliori Club per Questo Genere',
    upcomingEvents: 'Prossimi Eventi in Programma',
    faqTitle: 'Domande Frequenti',
    otherZones: 'Esplora Tutti i 14 Quartieri di Milano',
    otherGenres: 'Esplora Tutti i 10 Generi Musicali',
    bookVipCta: 'Prenota Tavolo VIP su WhatsApp',
    metroLabel: 'Metro e Collegamenti',
    priceRangeLabel: 'Tavoli VIP e Liste',
    dressCodeLabel: 'Dress Code',
    verifiedBadge: 'Concierge Verificato · Nov 2026',
    verifiedBody: 'Listini ufficiali 2026/2027, collegamenti metro e regole di selezione verificati dal Desk Nightlife Milan (zero commissioni).',
    quickAnswerTitle: 'Risposta Rapida · Sintesi Operativa',
    directDeskLabel: 'Concierge WhatsApp 24/7 +39 351 912 7047',
    zoneTitleFmt: (z) => clampMetaTitle(`${z} Milano Vita Notturna 2026 | Discoteche e Tavoli`, `${z} Discoteche Milano | Nightlife Milan`),
    zoneDescFmt: (z, m) => clampMetaDesc(`${z} Milano 2026/2027: migliori discoteche, metro ${m}, dress code e tavoli VIP da €250. Lista nominale gratis via WhatsApp +39 351 912 7047.`),
    genreTitleFmt: (g) => clampMetaTitle(`Discoteche ${g} Milano 2026 | Eventi e Tavoli VIP`, `${g} Milano | Nightlife Milan`),
    genreDescFmt: (g) => clampMetaDesc(`Migliori locali ${g} a Milano 2026/2027: serate della settimana, liste €20-€35, tavoli VIP €250+ e dress code. Info gratis WhatsApp +39 351 912 7047.`),
    zoneHeadings: ['Identikit del Quartiere e Pubblico', 'Metro M1-M5, Bus Notturni e Taxi', 'Discoteche, Rooftop e Lounge Partner', 'Prezzi Tavoli VIP 2026/2027 e Dress Code', 'Consigli Concierge per Entrare Senza Coda'],
    genreHeadings: ['Identità Sonora e Atmosfera in Pista', 'Top Club e Calendario Settimanale', 'Listino Prezzi Tavoli VIP e Liste Nominali', 'Selezione alla Porta e Dress Code', 'Prenotazione Diretta Concierge (+39 351 912 7047)'],
    hubZonesBadge: '14 Quartieri della Notte Milanese · 2026/2027',
    hubZonesH1: 'I Quartieri della Notte a Milano',
    hubZonesLead: 'Ogni zona di Milano ha il suo battito: Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola e Duomo con listini ufficiali verificati.',
    hubZonesQuick: 'Zone top: Parco Sempione (Just Me 7/7, 55 Milano), Corso Como (Pineta, Repvblic, Hollywood, Tocqueville 13), San Siro (Aria Club a 150m dallo Stadio) e Portello (Voya Rooftop 20° Piano). WhatsApp +39 351 912 7047.',
    hubGenresBadge: '10 Generi Musicali e Format Ufficiali · 2026/2027',
    hubGenresH1: 'Scegli il Tuo Sound a Milano',
    hubGenresLead: 'Dalla Vocal & Afro House nei giardini d’élite sotto la Torre Branca e a San Siro, al Reggaeton in Corso Como, alla Techno underground e alle Cene Spettacolo.',
    hubGenresQuick: 'House & Afro House: Just Me, Aria Club, Voya Rooftop, 55 Milano. Reggaeton & Hip Hop: Pineta Milano, Tocqueville 13, Repvblic, The Club, Hollywood. Techno: Volt, Magazzini Generali, Amnesia, Fabrique. WhatsApp +39 351 912 7047.',
    ctaTitle: 'Vuoi Prenotare un Tavolo VIP o Entrare in Lista Stasera?',
    ctaDesc: 'Zero commissioni di agenzia, planimetria aggiornata in 10 minuti e accredito nominale diretto nei 19 locali partner ufficiali di Milano.',
    secOverview: (n, v, m, c) => [`Il distretto ${n} (${v}) rappresenta uno dei poli centrali della movida milanese 2026/2027. Collegato tramite ${m}, concentra ristorazione tardiva, cocktail bar e discoteche di riferimento guidate da ${c}.`, `Che tu stia organizzando una laurea, un dopo-partita di Champions League o un sabato sera internazionale, l’accredito in lista nominale o al tavolo VIP prima delle 19:00 ti assicura accesso fluido senza code né maggiorazioni.`],
    secAccess: (n, m) => [`Arrivare in zona ${n} è immediato grazie a ${m}. Dopo la chiusura metro (00:30 nei feriali, 01:30 nel weekend), restano attive le linee sostitutive notturne ATM (NM1, NM2, NM3, N25/N26, 90/91) e i taxi bianchi verso Centrale FS, Duomo, San Siro e Linate M4.`],
    secClubs: (n, c) => [`Il nostro desk accredita ogni settimana i migliori locali dentro e intorno a ${n}: ${c}. Ogni scheda include orari ufficiali di apertura (23:30-05:00) e mappa tavoli dal vivo.`, `Quando i locali raggiungono la capienza massima intorno all’01:00, gli ospiti con prenotazione confermata Nightlife Milan mantengono corsia prioritaria alla porta.`],
    secPrices: (n, p, d) => [`Tariffe ufficiali 2026/2027 in zona ${n}: ${p}. L’intero importo del tavolo VIP è sempre spendibile al 100% in bottiglie premium (Belvedere, Grey Goose, Dom Pérignon, Clase Azul) con servizio al tavolo dedicato.`, `Regola abbigliamento (${n}): ${d}. Camicia o blazer scuro per l’uomo e abito elegante per la donna garantiscono selezione rapida anche nei weekend di punta.`],
    secTips: (n) => [`Scrivi su WhatsApp (+39 351 912 7047) indicando data, nome e cognome, numero partecipanti (rapporto M/F) e locale scelto in zona ${n}. Ingresso lista consigliato entro le 00:15; check-in tavoli VIP garantito fino all’01:30.`],
    genreSecSound: (n, c) => [`La scena ${n} a Milano nella stagione 2026/2027 unisce impianti audio di altissimo livello, visual architettonici e DJ resident internazionali nei club ${c}.`, `Dall’aperitivo delle 19:30 al picco dancefloor tra l’01:30 e le 04:00, ogni serata mantiene standard acustici e servizio tavolo impeccabili.`],
    genreSecVenues: (n, c) => [`I club prioritari per vivere serate ${n} a Milano sono ${c}, ognuno dotato di aree pista e privé console modulabili per coppie, compleanni e gruppi fino a 30+ ospiti.`],
    genreSecPricing: (n) => [`L’ingresso in lista ${n} varia tra €15 e €30 con consumazione entro l’01:00. I tavoli VIP partono da €250-€350 in pista (5-8 persone) fino a €500-€1.500+ nel privé console, 100% convertibili in bottiglie.`],
    genreSecDoor: (n) => [`La selezione all’ingresso per le serate ${n} richiede stile curato: smart-glamour ed elegante da Just Me, Pineta, Aria, Voya e 55 Milano; clubwear total-black contemporaneo da Volt, Amnesia e Magazzini Generali. Evitare tute, zaini e sneakers sportive vistose.`],
    genreSecTips: (n) => [`Richiedi l’accredito ${n} via WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com entro le 19:00 del giorno dell’evento: ricevi conferma nominale immediata senza costi di agenzia.`],
    faqPairs: (_k, n, m, c) => [
      { question: `Quali sono le migliori discoteche per ${n} a Milano nel 2026/2027?`, answer: `I club verificati principali includono ${c}. Scrivi su WhatsApp +39 351 912 7047 per programma di stasera e lista nominale gratuita.` },
      { question: `Quanto costano liste e tavoli VIP per ${n} a Milano?`, answer: `Liste da €20-€30 con drink incluso; tavoli VIP da €250-€350 (100% spendibili in bottiglie) senza alcuna commissione aggiuntiva.` },
      { question: `Qual è il dress code e a che ora conviene arrivare?`, answer: `Abbigliamento smart-glamour / elegante (${m}). Arrivo consigliato tra le 23:30 e le 00:30 in lista oppure entro l’01:30 con tavolo confermato.` },
      { question: `Come si prenota l’accesso prioritario con il Concierge?`, answer: `Invia un messaggio WhatsApp al +39 351 912 7047 con data, nome e numero di ospiti: risposta garantita in meno di 10 minuti.` },
    ],
  },
};

interface LocaleSeed {
  city: string;
  home: string;
  zonesHub: string;
  genresHub: string;
  tocTitle: string;
  clubsInZone: string;
  recommendedClubs: string;
  upcomingEvents: string;
  faqTitle: string;
  otherZones: string;
  otherGenres: string;
  bookVipCta: string;
  metroLabel: string;
  priceRangeLabel: string;
  dressCodeLabel: string;
  verifiedBadge: string;
  verifiedBody: string;
  quickAnswerTitle: string;
  directDeskLabel: string;
  zoneTitleTail: string;
  genreTitleTail: string;
  hubZonesBadge: string;
  hubZonesH1: string;
  hubZonesLead: string;
  hubGenresBadge: string;
  hubGenresH1: string;
  hubGenresLead: string;
  ctaTitle: string;
  ctaDesc: string;
  zoneHeadings: [string, string, string, string, string];
  genreHeadings: [string, string, string, string, string];
  overviewIntro: string;
  accessIntro: string;
  clubsIntro: string;
  pricesIntro: string;
  tipsIntro: string;
  faqQ1Prefix: string;
  faqQ2Prefix: string;
  faqQ3Prefix: string;
  faqQ4Prefix: string;
}

const OTHER_SEEDS: Record<Exclude<LocaleCode, 'en' | 'it'>, LocaleSeed> = {
  es: {
    city: 'Milán', home: 'Inicio', zonesHub: 'Barrios', genresHub: 'Géneros',
    tocTitle: 'En Esta Guía', clubsInZone: 'Clubes y Mesas VIP', recommendedClubs: 'Mejores Clubes de Este Género',
    upcomingEvents: 'Próximos Eventos', faqTitle: 'Preguntas Frecuentes',
    otherZones: 'Explorar los 14 Barrios de Milán', otherGenres: 'Explorar los 10 Géneros Musicales',
    bookVipCta: 'Reservar Mesa VIP por WhatsApp', metroLabel: 'Metro y Transporte', priceRangeLabel: 'Mesas VIP y Listas',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Concierge Verificado · Nov 2026',
    verifiedBody: 'Precios 2026/2027, accesos en metro y política de puerta verificados sin comisiones por Nightlife Milan.',
    quickAnswerTitle: 'Respuesta Rápida · Guía Ejecutiva', directDeskLabel: 'Concierge WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Vida Nocturna Milán', genreTitleTail: 'Clubes Milán',
    hubZonesBadge: '14 Barrios Nocturnos de Milán · 2026/2027', hubZonesH1: 'Los Barrios Nocturnos de Milán',
    hubZonesLead: 'Compara Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola y Duomo con precios oficiales de mesas VIP.',
    hubGenresBadge: '10 Géneros Musicales Oficiales · 2026/2027', hubGenresH1: 'Elige Tu Música en Milán',
    hubGenresLead: 'Desde House y Afro House bajo Torre Branca y en San Siro hasta Reggaeton en Corso Como, Techno y Dinner Shows.',
    ctaTitle: '¿Reservar Mesa VIP o Lista Nominal Hoy?',
    ctaDesc: 'Cero comisiones de agencia, plano de mesas en 10 minutos y acceso prioritario en los 19 clubes oficiales de Milán.',
    zoneHeadings: ['Perfil del Barrio y Ambiente', 'Metro M1-M5, Buses Nocturnos y Taxi', 'Mejores Clubes y Salas VIP', 'Precios de Mesas VIP y Dress Code', 'Consejos Concierge de Acceso'],
    genreHeadings: ['Sonido y Público en Pista', 'Clubes Prioritarios y Calendario', 'Precios de Mesas VIP y Listas', 'Política de Puerta y Dress Code', 'Reserva Directa (+39 351 912 7047)'],
    overviewIntro: 'es uno de los epicentros clave de la vida nocturna en Milán 2026/2027.', accessIntro: 'Conexión rápida mediante',
    clubsIntro: 'Nuestro Concierge gestiona acreditaciones semanales en:', pricesIntro: 'Tarifas verificadas 2026/2027:',
    tipsIntro: 'Envía WhatsApp al +39 351 912 7047 antes de las 19:00 con fecha, nombre completo y número de invitados.',
    faqQ1Prefix: 'Mejores clubes para', faqQ2Prefix: 'Precios de mesas VIP en', faqQ3Prefix: 'Dress code y horario en', faqQ4Prefix: 'Cómo reservar gratis para',
  },
  fr: {
    city: 'Milan', home: 'Accueil', zonesHub: 'Quartiers', genresHub: 'Genres',
    tocTitle: 'Sommaire du Guide', clubsInZone: 'Clubs Partenaires & Tables VIP', recommendedClubs: 'Meilleurs Clubs pour Ce Style',
    upcomingEvents: 'Prochains Événements', faqTitle: 'Questions Fréquentes',
    otherZones: 'Explorer les 14 Quartiers de Milan', otherGenres: 'Explorer les 10 Genres Musicaux',
    bookVipCta: 'Réserver Table VIP sur WhatsApp', metroLabel: 'Métro & Transports', priceRangeLabel: 'Tables VIP & Listes',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Conciergerie Vérifiée · Nov 2026',
    verifiedBody: 'Tarifs 2026/2027, accès métro et règles d’entrée vérifiés sans frais d’agence par Nightlife Milan.',
    quickAnswerTitle: 'Réponse Rapide · Synthèse Concierge', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Vie Nocturne Milan', genreTitleTail: 'Clubs à Milan',
    hubZonesBadge: '14 Quartiers Nocturnes de Milan · 2026/2027', hubZonesH1: 'Les Quartiers de la Nuit à Milan',
    hubZonesLead: 'Comparez Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola et Duomo avec tarifs officiels.',
    hubGenresBadge: '10 Genres Musicaux Officiels · 2026/2027', hubGenresH1: 'Choisissez Votre Style à Milan',
    hubGenresLead: 'De l’Afro House sous Torre Branca et à San Siro au Reggaeton à Corso Como, Techno industrielle et Dîners Spectacles.',
    ctaTitle: 'Réserver une Table VIP ou Guestlist ce Soir ?',
    ctaDesc: 'Zéro commission d’agence, plan de salle en moins de 10 minutes et accréditation nominative dans 19 clubs milanais.',
    zoneHeadings: ['Identité du Quartier & Public', 'Métro M1-M5, Bus de Nuit & Taxi', 'Meilleurs Clubs & Lounges VIP', 'Tarifs Tables VIP 2026/2027 & Dress Code', 'Conseils Concierge & Coupe-File'],
    genreHeadings: ['Ambiance Musicale & Public', 'Clubs Prioritaires & Agenda Hebdo', 'Prix Tables VIP & Listes Nominales', 'Sélection à la Porte & Dress Code', 'Réservation Directe (+39 351 912 7047)'],
    overviewIntro: 'figure parmi les quartiers phares de la nuit milanaise en 2026/2027.', accessIntro: 'Accès direct via',
    clubsIntro: 'Accréditations hebdomadaires assurées dans :', pricesIntro: 'Tarifs officiels 2026/2027 :',
    tipsIntro: 'Écrivez sur WhatsApp au +39 351 912 7047 avant 19h00 avec date, nom et taille du groupe.',
    faqQ1Prefix: 'Meilleurs clubs pour', faqQ2Prefix: 'Prix tables VIP pour', faqQ3Prefix: 'Dress code & horaires pour', faqQ4Prefix: 'Comment réserver sans frais',
  },
  de: {
    city: 'Mailand', home: 'Startseite', zonesHub: 'Viertel', genresHub: 'Musikstile',
    tocTitle: 'Inhalt des Guides', clubsInZone: 'Partner-Clubs & VIP-Tische', recommendedClubs: 'Top-Clubs für Diesen Sound',
    upcomingEvents: 'Kommende Events', faqTitle: 'Häufige Fragen',
    otherZones: 'Alle 14 Viertel in Mailand entdecken', otherGenres: 'Alle 10 Musikstile entdecken',
    bookVipCta: 'VIP-Tisch per WhatsApp buchen', metroLabel: 'Metro & Anfahrt', priceRangeLabel: 'VIP-Tische & Gästeliste',
    dressCodeLabel: 'Dresscode', verifiedBadge: 'Verifizierter Concierge · Nov 2026',
    verifiedBody: 'Preise 2026/2027, Metro-Anbindung & Türpolitik ohne Agenturgebühr geprüft von Nightlife Milan.',
    quickAnswerTitle: 'Schnellantwort · Concierge-Überblick', directDeskLabel: '24/7 WhatsApp Desk +39 351 912 7047',
    zoneTitleTail: 'Nachtleben Mailand', genreTitleTail: 'Clubs Mailand',
    hubZonesBadge: '14 Nachtleben-Viertel in Mailand · 2026/2027', hubZonesH1: 'Mailands Nachtleben-Viertel',
    hubZonesLead: 'Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola & Duomo mit verifizierten Preisen.',
    hubGenresBadge: '10 Offizielle Musikstile & Formate · 2026/2027', hubGenresH1: 'Finde Deinen Sound in Mailand',
    hubGenresLead: 'Von House & Afro House an der Torre Branca und San Siro bis Reggaeton am Corso Como, Techno & Dinner Shows.',
    ctaTitle: 'VIP-Tisch oder Gästeliste für heute sichern?',
    ctaDesc: 'Keine Vermittlungsgebühren, Tischplan in unter 10 Minuten und direkter Gästelisteneintrag in 19 Top-Clubs.',
    zoneHeadings: ['Viertel-Profil & Publikum', 'Metro M1-M5, Nachtbusse & Taxi', 'Top-Clubs & VIP-Lounges', 'VIP-Tischpreise 2026/2027 & Dresscode', 'Concierge-Tipps für Prioritätseinlass'],
    genreHeadings: ['Sound-Identität & Club-Atmosphäre', 'Top-Clubs & Wochenplan', 'VIP-Tischpreise & Gästeliste', 'Türpolitik & Dresscode', 'Direktbuchung (+39 351 912 7047)'],
    overviewIntro: 'zählt 2026/2027 zu den wichtigsten Ausgehvierteln in Mailand.', accessIntro: 'Direkte Anbindung über',
    clubsIntro: 'Wöchentlicher VIP-Service bei:', pricesIntro: 'Verifizierte Preise 2026/2027:',
    tipsIntro: 'Schreiben Sie vor 19:00 Uhr per WhatsApp an +39 351 912 7047 mit Datum, Namen und Personenzahl.',
    faqQ1Prefix: 'Beste Clubs für', faqQ2Prefix: 'Preise & VIP-Tische für', faqQ3Prefix: 'Dresscode & Einlasszeit für', faqQ4Prefix: 'Kostenlose Reservierung für',
  },
  pt: {
    city: 'Milão', home: 'Início', zonesHub: 'Bairros', genresHub: 'Géneros',
    tocTitle: 'Nesta Página', clubsInZone: 'Clubes Parceiros e Mesas VIP', recommendedClubs: 'Melhores Clubes Deste Estilo',
    upcomingEvents: 'Próximos Eventos', faqTitle: 'Perguntas Frequentes',
    otherZones: 'Explorar os 14 Bairros de Milão', otherGenres: 'Explorar os 10 Géneros Musicais',
    bookVipCta: 'Reservar Mesa VIP no WhatsApp', metroLabel: 'Metro e Acessos', priceRangeLabel: 'Mesas VIP e Listas',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Concierge Verificado · Nov 2026',
    verifiedBody: 'Preços 2026/2027, acessos de metro e regras de porta verificados sem taxas de agência pela Nightlife Milan.',
    quickAnswerTitle: 'Resposta Rápida · Resumo Concierge', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Vida Noturna Milão', genreTitleTail: 'Discotecas Milão',
    hubZonesBadge: '14 Zonas Noturnas de Milão · 2026/2027', hubZonesH1: 'Os Bairros da Noite em Milão',
    hubZonesLead: 'Compare Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola e Duomo.',
    hubGenresBadge: '10 Géneros Musicais Oficiais · 2026/2027', hubGenresH1: 'Escolha o Seu Som em Milão',
    hubGenresLead: 'De House e Afro House em San Siro e Torre Branca a Reggaeton em Corso Como, Techno e Dinner Shows.',
    ctaTitle: 'Reservar Mesa VIP ou Lista para Hoje?',
    ctaDesc: 'Zero taxas de agência, mapa de mesas em menos de 10 minutos e acesso prioritário em 19 clubes parceiros.',
    zoneHeadings: ['Perfil do Bairro e Público', 'Metro M1-M5, Autocarros e Táxi', 'Melhores Clubes e Lounges', 'Preços Mesas VIP 2026/2027 e Dress Code', 'Dicas Concierge de Acesso'],
    genreHeadings: ['Som e Atmosfera na Pista', 'Clubes Prioritários e Agenda', 'Preços de Mesas VIP e Listas', 'Seleção na Porta e Dress Code', 'Reserva Direta (+39 351 912 7047)'],
    overviewIntro: 'é uma das zonas de referência na noite de Milão em 2026/2027.', accessIntro: 'Ligação direta via',
    clubsIntro: 'Acreditação semanal garantida em:', pricesIntro: 'Preços oficiais 2026/2027:',
    tipsIntro: 'Envie mensagem WhatsApp para +39 351 912 7047 até às 19h00 com data, nome e número de pessoas.',
    faqQ1Prefix: 'Melhores clubes para', faqQ2Prefix: 'Preços de mesas VIP para', faqQ3Prefix: 'Dress code e horário em', faqQ4Prefix: 'Como reservar grátis para',
  },
  nl: {
    city: 'Milaan', home: 'Home', zonesHub: 'Wijken', genresHub: 'Muziekstijlen',
    tocTitle: 'In Deze Gids', clubsInZone: 'Topclubs & VIP-Tafels', recommendedClubs: 'Beste Clubs voor Dit Genre',
    upcomingEvents: 'Aankomende Events', faqTitle: 'Veelgestelde Vragen',
    otherZones: 'Ontdek Alle 14 Wijken van Milaan', otherGenres: 'Ontdek Alle 10 Muziekstijlen',
    bookVipCta: 'Boek VIP-Tafel via WhatsApp', metroLabel: 'Metro & Vervoer', priceRangeLabel: 'VIP-Tafels & Gastenlijst',
    dressCodeLabel: 'Dresscode', verifiedBadge: 'Geverifieerde Concierge · Nov 2026',
    verifiedBody: 'Prijzen 2026/2027, metroroutes en deurbeleid gecontroleerd zonder bemiddelingskosten.',
    quickAnswerTitle: 'Snel Antwoord · Overzicht', directDeskLabel: '24/7 WhatsApp +39 351 912 7047',
    zoneTitleTail: 'Uitgaan Milaan', genreTitleTail: 'Clubs Milaan',
    hubZonesBadge: '14 Uitgaanswijken in Milaan · 2026/2027', hubZonesH1: 'De Uitgaanswijken van Milaan',
    hubZonesLead: 'Vergelijk Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola en Duomo.',
    hubGenresBadge: '10 Officiële Muziekstijlen · 2026/2027', hubGenresH1: 'Kies Jouw Muziekstijl in Milaan',
    hubGenresLead: 'Van House & Afro House bij Torre Branca en San Siro tot Reggaeton in Corso Como en Techno.',
    ctaTitle: 'Vanavond een VIP-Tafel of Gastenlijst?',
    ctaDesc: 'Geen bureaukosten, directe plattegronden binnen 10 minuten en toegang bij 19 partnerclubs in Milaan.',
    zoneHeadings: ['Wijkprofiel & Publiek', 'Metro M1-M5, Nachtbussen & Taxi', 'Beste Clubs & Lounges', 'VIP-Prijzen 2026/2027 & Dresscode', 'Concierge Tips voor Snelle Toegang'],
    genreHeadings: ['Muziekprofiel & Sfeer', 'Topclubs & Weekprogramma', 'VIP-Tafels & Gastenlijstprijzen', 'Deurbeleid & Dresscode', 'Direct Boeken (+39 351 912 7047)'],
    overviewIntro: 'is in 2026/2027 een van de populairste uitgaansgebieden in Milaan.', accessIntro: 'Direct bereikbaar via',
    clubsIntro: 'Wekelijkse gastenlijst en tafels bij:', pricesIntro: 'Officiële tarieven 2026/2027:',
    tipsIntro: 'Stuur een WhatsApp naar +39 351 912 7047 vóór 19:00 uur met datum, naam en groepsgrootte.',
    faqQ1Prefix: 'Beste clubs voor', faqQ2Prefix: 'Prijzen voor', faqQ3Prefix: 'Dresscode voor', faqQ4Prefix: 'Gratis reserveren voor',
  },
  ru: {
    city: 'Милан', home: 'Главная', zonesHub: 'Районы', genresHub: 'Жанры',
    tocTitle: 'Содержание', clubsInZone: 'Топ-клубы и VIP-столы', recommendedClubs: 'Лучшие клубы этого стиля',
    upcomingEvents: 'Ближайшие события', faqTitle: 'Частые вопросы',
    otherZones: 'Все 14 районов Милана', otherGenres: 'Все 10 музыкальных жанров',
    bookVipCta: 'Забронировать VIP-стол в WhatsApp', metroLabel: 'Метро и транспорт', priceRangeLabel: 'VIP-столы и списки',
    dressCodeLabel: 'Дресс-код', verifiedBadge: 'Проверенный консьерж · Ноя 2026',
    verifiedBody: 'Цены 2026/2027, маршруты метро и правила фейсконтроля проверены без комиссии агентства.',
    quickAnswerTitle: 'Быстрый ответ · Гид', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Ночная жизнь Милана', genreTitleTail: 'Клубы Милана',
    hubZonesBadge: '14 ночных районов Милана · 2026/2027', hubZonesH1: 'Ночные районы Милана',
    hubZonesLead: 'Сравните Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola и Duomo.',
    hubGenresBadge: '10 музыкальных форматов Милана · 2026/2027', hubGenresH1: 'Выберите свой звук в Милане',
    hubGenresLead: 'От House и Afro House в San Siro до Reggaeton на Corso Como, Techno и Dinner Show.',
    ctaTitle: 'Нужен VIP-стол или список гостей на сегодня?',
    ctaDesc: '0% комиссии агентства, схема зала за 10 минут и прямой проход в 19 клубов-партнёров Милана.',
    zoneHeadings: ['Атмосфера района и публика', 'Метро M1-M5 и ночной транспорт', 'Лучшие клубы и лаунжи', 'Цены VIP-столов 2026/2027 и дресс-код', 'Советы консьержа по входу'],
    genreHeadings: ['Музыка и атмосфера', 'Главные клубы и расписание', 'Цены VIP-столов и списков', 'Фейсконтроль и дресс-код', 'Прямая бронь (+39 351 912 7047)'],
    overviewIntro: 'является одним из главных центров ночной жизни Милана в 2026/2027 году.', accessIntro: 'Удобный доступ через',
    clubsIntro: 'Еженедельная аккредитация в клубах:', pricesIntro: 'Официальные тарифы 2026/2027:',
    tipsIntro: 'Напишите в WhatsApp +39 351 912 7047 до 19:00: дата, имя и состав группы.',
    faqQ1Prefix: 'Лучшие клубы для', faqQ2Prefix: 'Сколько стоят VIP-столы', faqQ3Prefix: 'Дресс-код и время входа', faqQ4Prefix: 'Как забронировать бесплатно',
  },
  tr: {
    city: 'Milano', home: 'Ana Sayfa', zonesHub: 'Bölgeler', genresHub: 'Müzik Türleri',
    tocTitle: 'İçindekiler', clubsInZone: 'Öne Çıkan Kulüpler & VIP', recommendedClubs: 'Bu Tür İçin En İyi Kulüpler',
    upcomingEvents: 'Yaklaşan Etkinlikler', faqTitle: 'Sık Sorulan Sorular',
    otherZones: 'Tüm 14 Milano Bölgesini Keşfet', otherGenres: 'Tüm 10 Müzik Türünü Keşfet',
    bookVipCta: 'WhatsApp VIP Masa Rezervasyonu', metroLabel: 'Metro & Ulaşım', priceRangeLabel: 'VIP Masalar & Listeler',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Doğrulanmış Concierge · Kas 2026',
    verifiedBody: '2026/2027 masa fiyatları, metro bağlantıları ve kapı kuralları komisyonsuz olarak doğrulanmıştır.',
    quickAnswerTitle: 'Hızlı Yanıt · Özet', directDeskLabel: '7/24 WhatsApp +39 351 912 7047',
    zoneTitleTail: 'Milano Gece Hayatı', genreTitleTail: 'Milano Kulüpleri',
    hubZonesBadge: '14 Milano Gece Hayatı Bölgesi · 2026/2027', hubZonesH1: 'Milano Gece Hayatı Bölgeleri',
    hubZonesLead: 'Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli, Isola ve Duomo rehberi.',
    hubGenresBadge: '10 Resmi Müzik Türü · 2026/2027', hubGenresH1: 'Milano’da Tarzını Seç',
    hubGenresLead: 'Torre Branca ve San Siro’da House & Afro House’tan Corso Como Reggaeton, Techno ve Dinner Show’lara.',
    ctaTitle: 'Bu Gece VIP Masa veya İsim Listesi İster misiniz?',
    ctaDesc: 'Sıfır acente komisyonu, 10 dakikada masa planı ve 19 resmi partner kulüpte öncelikli giriş.',
    zoneHeadings: ['Bölge Profili & Kitle', 'Metro M1-M5, Gece Otobüsleri & Taksi', 'En İyi Kulüpler & Mekanlar', '2026/2027 VIP Masa Fiyatları & Dress Code', 'Concierge Giriş İpuçları'],
    genreHeadings: ['Ses Profili & Atmosfer', 'Öncelikli Kulüpler & Program', 'VIP Masa Fiyatları & Listeler', 'Kapı Seçimi & Dress Code', 'Direkt Rezervasyon (+39 351 912 7047)'],
    overviewIntro: '2026/2027 sezonunda Milano gece hayatının en önemli merkezlerinden biridir.', accessIntro: 'Ulaşım bağlantıları:',
    clubsIntro: 'Haftalık VIP liste ve masa sağladığımız kulüpler:', pricesIntro: '2026/2027 resmi tarifeler:',
    tipsIntro: 'Saat 19:00’a kadar WhatsApp +39 351 912 7047 numarasına tarih, ad-soyad ve kişi sayısı yazın.',
    faqQ1Prefix: 'En iyi kulüpler:', faqQ2Prefix: 'VIP masa fiyatları:', faqQ3Prefix: 'Dress code ve saatler:', faqQ4Prefix: 'Ücretsiz rezervasyon:',
  },
  zh: {
    city: '米兰', home: '首页', zonesHub: '夜生活区域', genresHub: '音乐流派',
    tocTitle: '指南目录', clubsInZone: '合作夜店与 VIP 卡座', recommendedClubs: '该风格首选夜店',
    upcomingEvents: '近期热门活动', faqTitle: '常见问题解答',
    otherZones: '探索全部 14 个米兰夜生活区域', otherGenres: '探索全部 10 种音乐风格',
    bookVipCta: 'WhatsApp 预订 VIP 卡座', metroLabel: '地铁与交通', priceRangeLabel: 'VIP 卡座与名单价格',
    dressCodeLabel: '着装要求', verifiedBadge: '官方礼宾认证 · 2026年11月',
    verifiedBody: '2026/2027 瓶酒价格、地铁线路与入场着装由 Nightlife Milan 零佣金核实更新。',
    quickAnswerTitle: '快速摘要 · 核心信息', directDeskLabel: '24/7 礼宾 WhatsApp +39 351 912 7047',
    zoneTitleTail: '米兰夜生活指南', genreTitleTail: '米兰夜店推荐',
    hubZonesBadge: '米兰 14 大夜生活核心区 · 2026/2027', hubZonesH1: '米兰夜生活热门区域指南',
    hubZonesLead: '一站对比 Parco Sempione、Corso Como、圣西罗、CityLife Portello、Brera、Navigli 与 Duomo 官方酒水与交通。',
    hubGenresBadge: '米兰 10 大官方音乐流派 · 2026/2027', hubGenresH1: '选择您的米兰夜生活曲风',
    hubGenresLead: '从圣西罗与森皮奥内公园的 House / Afro House 到 Corso Como 拉丁 Reggaeton、工业 Techno 与歌唱晚宴。',
    ctaTitle: '今晚预订 VIP 卡座或免排队名单？',
    ctaDesc: '零中介费，10 分钟内发送现场座位图与全部 19 家官方合作夜店确认函。',
    zoneHeadings: ['区域风格与人群画像', '地铁 M1-M5 与夜间交通', '首选合作夜店与酒廊', '2026/2027 卡座价格与着装规则', '官方礼宾快速入场建议'],
    genreHeadings: ['音乐特色与现场氛围', '推荐夜店与每周排期', 'VIP 卡座与名单价目表', '门口筛选与着装要求', '直接预订方式 (+39 351 912 7047)'],
    overviewIntro: '是 2026/2027 赛季米兰夜生活的核心地标之一。', accessIntro: '便捷公共交通包括',
    clubsIntro: '我们每周提供官方名单与卡座预订的场馆包括：', pricesIntro: '2026/2027 官方价格参考：',
    tipsIntro: '活动当天 19:00 前联系 WhatsApp +39 351 912 7047，发送日期、姓名及男女人数即可免费确认。',
    faqQ1Prefix: '最值得去的夜店：', faqQ2Prefix: 'VIP 卡座和名单费用：', faqQ3Prefix: '着装与入场时间：', faqQ4Prefix: '如何免费通过礼宾预订：',
  },
  ar: {
    city: 'ميلانو', home: 'الرئيسية', zonesHub: 'الأحياء', genresHub: 'الأنواع الموسيقية',
    tocTitle: 'محتويات الدليل', clubsInZone: 'النوادي الشريكة وطاولات VIP', recommendedClubs: 'أفضل النوادي لهذا النمط',
    upcomingEvents: 'الفعاليات القادمة', faqTitle: 'الأسئلة الشائعة',
    otherZones: 'استكشف جميع أحياء ميلانو الـ 14', otherGenres: 'استكشف جميع الأنواع الموسيقية الـ 10',
    bookVipCta: 'احجز طاولة VIP عبر واتساب', metroLabel: 'المترو والمواصلات', priceRangeLabel: 'أسعار الطاولات والقوائم',
    dressCodeLabel: 'قواعد اللباس', verifiedBadge: 'كونسيرج موثق · نوفمبر 2026',
    verifiedBody: 'الأسعار الرسمية 2026/2027 ومواقف المترو وسياسة الدخول محدثة بدون عمولة وكالة.',
    quickAnswerTitle: 'إجابة سريعة · ملخص الكونسيرج', directDeskLabel: 'واتساب 24/7 +39 351 912 7047',
    zoneTitleTail: 'الحياة الليلية ميلانو', genreTitleTail: 'نوادي ميلانو',
    hubZonesBadge: '14 حياً للحياة الليلية في ميلانو · 2026/2027', hubZonesH1: 'أحياء السهر الليلي في ميلانو',
    hubZonesLead: 'قارن بين باركو سيمبيوني وكورسو كومو وسان سيرو وسيتي لايف بريرا ونافيلي وإيزولا.',
    hubGenresBadge: '10 أنماط موسيقية رسمية في ميلانو · 2026/2027', hubGenresH1: 'اختر موسيقاك الليلية في ميلانو',
    hubGenresLead: 'من الهاوس والأفرو هاوس في سان سيرو وتوري برانكا إلى الريغيتون والتكنو وعشاء الغناء.',
    ctaTitle: 'هل تبحث عن طاولة VIP أو دخول سريع الليلة؟',
    ctaDesc: 'صفر عمولات، مخطط طاولات خلال 10 دقائق واعتماد فوري في 19 نادياً رسمياً في ميلانو.',
    zoneHeadings: ['هوية الحي والجمهور', 'خطوط المترو M1-M5 والمواصلات الليلية', 'أفضل النوادي وصالات VIP', 'أسعار 2026/2027 وقواعد اللباس', 'نصائح الكونسيرج للدخول السريع'],
    genreHeadings: ['الطابع الموسيقي والأجواء', 'النوادي الموصى بها والجدول', 'أسعار طاولات VIP والقوائم', 'سياسة الباب والملابس', 'الحجز المباشر (+39 351 912 7047)'],
    overviewIntro: 'يُعد من أبرز مراكز السهر الفاخر في ميلانو لموسم 2026/2027.', accessIntro: 'الوصول المباشر عبر',
    clubsIntro: 'يوفر الكونسيرج حجوزات أسبوعية مؤكدة في:', pricesIntro: 'الأسعار المعتمدة 2026/2027:',
    tipsIntro: 'راسل واتساب +39 351 912 7047 قبل الساعة 19:00 مع التاريخ والاسم وعدد الضيوف.',
    faqQ1Prefix: 'أفضل النوادي لـ', faqQ2Prefix: 'تكلفة طاولات VIP في', faqQ3Prefix: 'قواعد اللباس والوقت في', faqQ4Prefix: 'كيفية الحجز مجاناً في',
  },
  bg: {
    city: 'Милано', home: 'Начало', zonesHub: 'Квартали', genresHub: 'Стилове',
    tocTitle: 'Съдържание', clubsInZone: 'Клубове и VIP маси', recommendedClubs: 'Най-добрите клубове',
    upcomingEvents: 'Предстоящи събития', faqTitle: 'Чести въпроси',
    otherZones: 'Всички 14 квартала в Милано', otherGenres: 'Всички 10 музикални стила',
    bookVipCta: 'Резервирай VIP маса в WhatsApp', metroLabel: 'Метро и транспорт', priceRangeLabel: 'VIP маси и списъци',
    dressCodeLabel: 'Дрескод', verifiedBadge: 'Проверен Консиерж · Ное 2026',
    verifiedBody: 'Цени 2026/2027, метро линии и правила за вход проверени без комисиона.',
    quickAnswerTitle: 'Бърз отговор · Обобщение', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Нощен живот Милано', genreTitleTail: 'Клубове Милано',
    hubZonesBadge: '14 нощни квартала в Милано · 2026/2027', hubZonesH1: 'Нощните квартали на Милано',
    hubZonesLead: 'Сравнете Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli и Isola.',
    hubGenresBadge: '10 музикални стила в Милано · 2026/2027', hubGenresH1: 'Изберете своя звук в Милано',
    hubGenresLead: 'House, Afro House, Reggaeton, Techno, Hip-Hop и Dinner Show в най-добрите клубове.',
    ctaTitle: 'Резервирайте VIP маса или списък за довечера?',
    ctaDesc: 'Нула такси, план на залата до 10 минути и директен достъп до 19 партньорски клуба.',
    zoneHeadings: ['Профил на квартала', 'Метро M1-M5 и транспорт', 'Водещи клубове и барове', 'VIP цени 2026/2027 и дрескод', 'Консиерж съвети за вход'],
    genreHeadings: ['Музикален стил и публика', 'Приоритетни клубове', 'VIP маси и списъци', 'Политика на входа и дрескод', 'Директна резервация (+39 351 912 7047)'],
    overviewIntro: 'е сред водещите нощни зони на Милано за 2026/2027.', accessIntro: 'Удобен достъп чрез',
    clubsIntro: 'Седмична акредитация в:', pricesIntro: 'Актуални цени 2026/2027:',
    tipsIntro: 'Пишете в WhatsApp +39 351 912 7047 до 19:00 с дата, име и брой гости.',
    faqQ1Prefix: 'Кои са топ клубовете за', faqQ2Prefix: 'Колко струват VIP масите в', faqQ3Prefix: 'Дрескод и час за', faqQ4Prefix: 'Как да резервирам за',
  },
  hr: {
    city: 'Milano', home: 'Početna', zonesHub: 'Četvrti', genresHub: 'Žanrovi',
    tocTitle: 'Sadržaj vodiča', clubsInZone: 'Klubovi i VIP stolovi', recommendedClubs: 'Najbolji klubovi za ovaj zvuk',
    upcomingEvents: 'Nadolazeći događaji', faqTitle: 'Česta pitanja',
    otherZones: 'Svih 14 četvrti Milana', otherGenres: 'Svih 10 glazbenih žanrova',
    bookVipCta: 'Rezerviraj VIP stol na WhatsApp', metroLabel: 'Metro i prijevoz', priceRangeLabel: 'VIP stolovi i liste',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Provjereni Concierge · Stu 2026',
    verifiedBody: 'Cijene za 2026/2027, metro linije i pravila ulaska bez agencijske provizije.',
    quickAnswerTitle: 'Brzi odgovor · Sažetak', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Noćni život Milano', genreTitleTail: 'Klubovi Milano',
    hubZonesBadge: '14 noćnih četvrti Milana · 2026/2027', hubZonesH1: 'Noćne četvrti Milana',
    hubZonesLead: 'Usporedite Parco Sempione, Corso Como, San Siro, CityLife Portello, Breru, Navigli i Isolu.',
    hubGenresBadge: '10 glazbenih žanrova · 2026/2027', hubGenresH1: 'Pronađite svoj zvuk u Milanu',
    hubGenresLead: 'Od House & Afro House klubova do Reggaetona na Corso Como, Techna i Dinner Show večera.',
    ctaTitle: 'Rezervirajte VIP stol ili popis gostiju večeras',
    ctaDesc: 'Bez naknade agencije, plan stolova unutar 10 minuta i prioritetni ulaz u 19 klubova.',
    zoneHeadings: ['Profil četvrti i publika', 'Metro M1-M5 i noćni prijevoz', 'Najbolji klubovi i barovi', 'VIP cijene 2026/2027 i dress code', 'Concierge savjeti za brzi ulaz'],
    genreHeadings: ['Glazbeni identitet i atmosfera', 'Prioritetni klubovi i raspored', 'Cijene VIP stolova i popisa', 'Pravila ulaza i dress code', 'Izravna rezervacija (+39 351 912 7047)'],
    overviewIntro: 'jedno je od najvažnijih noćnih središta u Milanu 2026/2027.', accessIntro: 'Brza povezanost putem',
    clubsIntro: 'Tjedne rezervacije dostupne u:', pricesIntro: 'Službene cijene 2026/2027:',
    tipsIntro: 'Pošaljite WhatsApp poruku na +39 351 912 7047 do 19:00 s datumom, imenom i brojem osoba.',
    faqQ1Prefix: 'Koji su najbolji klubovi za', faqQ2Prefix: 'Cijene VIP stolova za', faqQ3Prefix: 'Dress code i vrijeme za', faqQ4Prefix: 'Kako besplatno rezervirati',
  },
  cs: {
    city: 'Milán', home: 'Domů', zonesHub: 'Čtvrti', genresHub: 'Žánry',
    tocTitle: 'Obsah průvodce', clubsInZone: 'Kluby a VIP stoly', recommendedClubs: 'Nejlepší kluby pro tento žánr',
    upcomingEvents: 'Nadcházející akce', faqTitle: 'Časté dotazy',
    otherZones: 'Všech 14 čtvrtí Milána', otherGenres: 'Všech 10 hudebních žánrů',
    bookVipCta: 'Rezervovat VIP stůl na WhatsApp', metroLabel: 'Metro a doprava', priceRangeLabel: 'VIP stoly a guestlist',
    dressCodeLabel: 'Dress code', verifiedBadge: 'Ověřený Concierge · Lis 2026',
    verifiedBody: 'Ceny pro sezónu 2026/2027, metro a pravidla vstupu ověřena bez provize.',
    quickAnswerTitle: 'Rychlá odpověď · Přehled', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Noční život Milán', genreTitleTail: 'Kluby Milán',
    hubZonesBadge: '14 nočních čtvrtí Milána · 2026/2027', hubZonesH1: 'Noční čtvrti Milána',
    hubZonesLead: 'Porovnejte Parco Sempione, Corso Como, San Siro, CityLife Portello, Breru, Navigli a Isolu.',
    hubGenresBadge: '10 oficiálních hudebních žánrů · 2026/2027', hubGenresH1: 'Najděte svůj hudební styl v Miláně',
    hubGenresLead: 'Od House a Afro House přes Reggaeton na Corso Como po Techno a Dinner Show večery.',
    ctaTitle: 'Rezervujte VIP stůl nebo guestlist na dnešek',
    ctaDesc: 'Nulové poplatky, plánek stolů do 10 minut a přednostní vstup do 19 partnerských klubů.',
    zoneHeadings: ['Charakter čtvrti a publikum', 'Metro M1-M5 a noční spoje', 'Nejlepší kluby a lounge bary', 'Ceny VIP stolů 2026/2027 a dress code', 'Tipy concierge pro rychlý vstup'],
    genreHeadings: ['Hudební profil a atmosféra', 'Hlavní kluby a program', 'Ceny VIP stolů a guestlistů', 'Pravidla vstupu a dress code', 'Přímá rezervace (+39 351 912 7047)'],
    overviewIntro: 'patří v sezóně 2026/2027 mezi hlavní noční lokality v Miláně.', accessIntro: 'Snadná dostupnost přes',
    clubsIntro: 'Týdenní akreditace zajišťujeme v:', pricesIntro: 'Oficiální ceník 2026/2027:',
    tipsIntro: 'Napište na WhatsApp +39 351 912 7047 do 19:00 datum, jméno a počet hostů.',
    faqQ1Prefix: 'Nejlepší kluby pro', faqQ2Prefix: 'Kolik stojí VIP stoly pro', faqQ3Prefix: 'Dress code a příchod do', faqQ4Prefix: 'Jak zdarma rezervovat',
  },
  da: {
    city: 'Milano', home: 'Hjem', zonesHub: 'Områder', genresHub: 'Genrer',
    tocTitle: 'I Denne Guide', clubsInZone: 'Klubber & VIP-borde', recommendedClubs: 'Topklubber til denne stil',
    upcomingEvents: 'Kommende Events', faqTitle: 'Ofte Stillede Spørgsmål',
    otherZones: 'Udforsk Alle 14 Bydele i Milano', otherGenres: 'Udforsk Alle 10 Musikgenrer',
    bookVipCta: 'Book VIP-bord via WhatsApp', metroLabel: 'Metro & Transport', priceRangeLabel: 'VIP-borde & Gæstelister',
    dressCodeLabel: 'Dresscode', verifiedBadge: 'Verificeret Concierge · Nov 2026',
    verifiedBody: 'Priser 2026/2027, metroforbindelser og dørpolitik bekræftet uden gebyr.',
    quickAnswerTitle: 'Hurtigt Svar · Oversigt', directDeskLabel: '24/7 WhatsApp +39 351 912 7047',
    zoneTitleTail: 'Natteliv Milano', genreTitleTail: 'Klubber Milano',
    hubZonesBadge: '14 Nattelivskvarterer i Milano · 2026/2027', hubZonesH1: 'Milanos Nattelivskvarterer',
    hubZonesLead: 'Sammenlign Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli og Isola.',
    hubGenresBadge: '10 Officielle Musikgenrer · 2026/2027', hubGenresH1: 'Find Din Lyd i Milano',
    hubGenresLead: 'Fra House og Afro House ved Torre Branca og San Siro til Reggaeton, Techno og Dinner Shows.',
    ctaTitle: 'Skal du booke VIP-bord eller gæsteliste i aften?',
    ctaDesc: 'Ingen formidlingsgebyrer, bordoversigt inden for 10 minutter og direkte adgang til 19 partnerklubber.',
    zoneHeadings: ['Bydelsprofil & Publikum', 'Metro M1-M5, Natbusser & Taxi', 'Bedste Klubber & Lounges', 'VIP-priser 2026/2027 & Dresscode', 'Concierge-tips til hurtig entré'],
    genreHeadings: ['Lydprofil & Stemning', 'Topklubber & Ugeprogram', 'VIP-borde & Gæstelister', 'Dørpolitik & Dresscode', 'Direkte Booking (+39 351 912 7047)'],
    overviewIntro: 'er et af Milanos centrale knudepunkter for natteliv i 2026/2027.', accessIntro: 'Direkte adgang via',
    clubsIntro: 'Ugentlig akkreditering tilbydes hos:', pricesIntro: 'Officielle priser 2026/2027:',
    tipsIntro: 'Send en WhatsApp til +39 351 912 7047 før kl. 19:00 med dato, fulde navn og antal gæster.',
    faqQ1Prefix: 'Bedste klubber for', faqQ2Prefix: 'Priser på VIP-borde i', faqQ3Prefix: 'Dresscode og ankomsttid for', faqQ4Prefix: 'Sådan booker du gratis',
  },
  et: {
    city: 'Milano', home: 'Avaleht', zonesHub: 'Piirkonnad', genresHub: 'Žanrid',
    tocTitle: 'Sisukord', clubsInZone: 'Klubid ja VIP-lauad', recommendedClubs: 'Parimad klubid sellele stiilile',
    upcomingEvents: 'Tulevased üritused', faqTitle: 'Korduma kippuvad küsimused',
    otherZones: 'Kõik 14 Milano piirkonda', otherGenres: 'Kõik 10 muusikažanrit',
    bookVipCta: 'Broneeri VIP-laud WhatsAppis', metroLabel: 'Metroo ja transport', priceRangeLabel: 'VIP-lauad ja listid',
    dressCodeLabel: 'Riietumisstiil', verifiedBadge: 'Kinnitatud Concierge · Nov 2026',
    verifiedBody: '2026/2027 hinnad, metrooühendused ja sissepääsureeglid ilma vahendustasuta.',
    quickAnswerTitle: 'Kiire vastus · Kokkuvõte', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Milano ööelu', genreTitleTail: 'Milano klubid',
    hubZonesBadge: '14 Milano ööelu piirkonda · 2026/2027', hubZonesH1: 'Milano ööelu piirkonnad',
    hubZonesLead: 'Võrdle Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli ja Isola alasid.',
    hubGenresBadge: '10 muusikažanrit Milanos · 2026/2027', hubGenresH1: 'Leia oma muusikastiil Milanos',
    hubGenresLead: 'House ja Afro House, Reggaeton Corso Comol, Techno ning Dinner Show õhtud.',
    ctaTitle: 'Soovid VIP-lauda või külaliste nimekirja täna õhtuks?',
    ctaDesc: 'Vahendustasuta, saaliplaan 10 minutiga ja kinnitatud sissepääs 19 partnerklubisse.',
    zoneHeadings: ['Piirkonna profiil ja publik', 'Metroo M1-M5 ja öötransport', 'Parimad klubid ja baarid', 'VIP-hinnad 2026/2027 ja riietus', 'Concierge sisenemisnõuanded'],
    genreHeadings: ['Helipilt ja atmosfäär', 'Peamised klubid ja kava', 'VIP-laudade hinnad ja listid', 'Uksepoliitika ja riietus', 'Otsebroneering (+39 351 912 7047)'],
    overviewIntro: 'on üks Milano 2026/2027 hooaja olulisemaid ööelu piirkondi.', accessIntro: 'Otsene ligipääs:',
    clubsIntro: 'Iganädalased kinnitatud listid klubides:', pricesIntro: 'Ametlikud hinnad 2026/2027:',
    tipsIntro: 'Kirjuta WhatsAppis +39 351 912 7047 enne 19:00 koos kuupäeva, nime ja külaliste arvuga.',
    faqQ1Prefix: 'Parimad klubid:', faqQ2Prefix: 'VIP-laudade hinnad:', faqQ3Prefix: 'Riietus ja aeg:', faqQ4Prefix: 'Kuidas tasuta broneerida:',
  },
  fi: {
    city: 'Milano', home: 'Etusivu', zonesHub: 'Alueet', genresHub: 'Tyylilajit',
    tocTitle: 'Oppaan Sisältö', clubsInZone: 'Klubit & VIP-pöydät', recommendedClubs: 'Parhaat klubit tähän genreen',
    upcomingEvents: 'Tulevat tapahtumat', faqTitle: 'Usein kysytyt kysymykset',
    otherZones: 'Kaikki 14 Milanon aluetta', otherGenres: 'Kaikki 10 musiikkigenreä',
    bookVipCta: 'Varaa VIP-pöytä WhatsAppissa', metroLabel: 'Metro & Yhteydet', priceRangeLabel: 'VIP-pöydät & Vieraslistat',
    dressCodeLabel: 'Pukukoodi', verifiedBadge: 'Vahvistettu Concierge · Mar 2026',
    verifiedBody: 'Kauden 2026/2027 hinnat, metroyhteydet ja ovisäännöt tarkistettu ilman välityspalkkiota.',
    quickAnswerTitle: 'Pikavastaus · Tiivistelmä', directDeskLabel: '24/7 WhatsApp +39 351 912 7047',
    zoneTitleTail: 'Milanon Yöelämä', genreTitleTail: 'Milanon Klubit',
    hubZonesBadge: '14 Milanon yöelämäaluetta · 2026/2027', hubZonesH1: 'Milanon Yöelämäalueet',
    hubZonesLead: 'Vertaa Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli ja Isola -alueita.',
    hubGenresBadge: '10 Musiikkigenreä · 2026/2027', hubGenresH1: 'Löydä Oma Musiikkisi Milanossa',
    hubGenresLead: 'House & Afro House, Corso Como Reggaeton, Techno sekä Dinner Show -illat yhdessä oppaassa.',
    ctaTitle: 'Varaa VIP-pöytä tai vieraslista täksi illaksi',
    ctaDesc: 'Ei välitysmaksuja, pöytäkartta alle 10 minuutissa ja suora sisäänpääsy 19 yhteistyöklubiin.',
    zoneHeadings: ['Alueen profiili & yleisö', 'Metro M1-M5 & yöliikenne', 'Parhaat klubit & lounget', 'VIP-hinnat 2026/2027 & pukukoodi', 'Conciergen sisäänpääsyvinkit'],
    genreHeadings: ['Musiikkityyli & tunnelma', 'Suositellut klubit & kalenteri', 'VIP-pöydät & listahinnat', 'Ovisäännöt & pukukoodi', 'Suora varaus (+39 351 912 7047)'],
    overviewIntro: 'on yksi Milanon yöelämän keskeisimmistä alueista kaudella 2026/2027.', accessIntro: 'Helppo saapuminen:',
    clubsIntro: 'Viikoittainen VIP-palvelu kohteissa:', pricesIntro: 'Viralliset hinnat 2026/2027:',
    tipsIntro: 'Lähetä WhatsApp-viesti numeroon +39 351 912 7047 ennen klo 19:00 päivämäärän ja ryhmäkoon kanssa.',
    faqQ1Prefix: 'Parhaat klubit:', faqQ2Prefix: 'VIP-pöytien hinnat:', faqQ3Prefix: 'Pukukoodi ja saapuminen:', faqQ4Prefix: 'Miten varaan maksutta:',
  },
  el: {
    city: 'Μιλάνο', home: 'Αρχική', zonesHub: 'Περιοχές', genresHub: 'Είδη Μουσικής',
    tocTitle: 'Περιεχόμενα Οδηγού', clubsInZone: 'Κλαμπ & VIP Τραπέζια', recommendedClubs: 'Κορυφαία Κλαμπ για Αυτόν τον Ήχο',
    upcomingEvents: 'Επερχόμενα Events', faqTitle: 'Συχνές Ερωτήσεις',
    otherZones: 'Όλες οι 14 Περιοχές του Μιλάνου', otherGenres: 'Όλα τα 10 Μουσικά Είδη',
    bookVipCta: 'Κράτηση VIP στο WhatsApp', metroLabel: 'Μετρό & Πρόσβαση', priceRangeLabel: 'VIP Τραπέζια & Λίστες',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Πιστοποιημένο Concierge · Νοέ 2026',
    verifiedBody: 'Τιμές 2026/2027, γραμμές μετρό και κανόνες εισόδου ελεγμένα χωρίς προμήθεια πρακτορείου.',
    quickAnswerTitle: 'Γρήγορη Απάντηση · Σύνοψη', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Νυχτερινή Ζωή Μιλάνο', genreTitleTail: 'Κλαμπ Μιλάνο',
    hubZonesBadge: '14 Περιοχές Νυχτερινής Ζωής Μιλάνο · 2026/2027', hubZonesH1: 'Οι Νυχτερινές Περιοχές του Μιλάνου',
    hubZonesLead: 'Συγκρίνετε Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli και Isola.',
    hubGenresBadge: '10 Μουσικά Είδη · 2026/2027', hubGenresH1: 'Βρες τον Ήχο σου στο Μιλάνο',
    hubGenresLead: 'Από House & Afro House στο San Siro και Torre Branca μέχρι Reggaeton, Techno και Dinner Shows.',
    ctaTitle: 'Θέλεις VIP Τραπέζι ή Λίστα Εισόδου Απόψε;',
    ctaDesc: 'Μηδενικές προμήθειες, κάτοψη τραπεζιών σε 10 λεπτά και άμεση διαπίστευση σε 19 επίσημα κλαμπ.',
    zoneHeadings: ['Προφίλ Περιοχής & Κοινό', 'Μετρό M1-M5, Νυχτερινά Λεωφορεία & Ταξί', 'Κορυφαία Κλαμπ & Lounges', 'Τιμές VIP 2026/2027 & Dress Code', 'Συμβουλές Concierge για Είσοδο'],
    genreHeadings: ['Μουσική Ταυτότητα & Κλίμα', 'Κλαμπ & Εβδομαδιαίο Πρόγραμμα', 'Τιμές VIP & Guestlists', 'Πολιτική Πόρτας & Dress Code', 'Άμεση Κράτηση (+39 351 912 7047)'],
    overviewIntro: 'αποτελεί έναν από τους σημαντικότερους προορισμούς νυχτερινής διασκέδασης στο Μιλάνο για το 2026/2027.', accessIntro: 'Άμεση πρόσβαση μέσω',
    clubsIntro: 'Εβδομαδιαίες κρατήσεις στα κλαμπ:', pricesIntro: 'Επίσημες τιμές 2026/2027:',
    tipsIntro: 'Στείλτε WhatsApp στο +39 351 912 7047 πριν τις 19:00 με ημερομηνία, όνομα και αριθμό ατόμων.',
    faqQ1Prefix: 'Ποια είναι τα καλύτερα κλαμπ για', faqQ2Prefix: 'Πόσο κοστίζουν τα VIP τραπέζια', faqQ3Prefix: 'Ποιο είναι το dress code για', faqQ4Prefix: 'Πώς κάνω δωρεάν κράτηση για',
  },
  hu: {
    city: 'Milánó', home: 'Kezdőlap', zonesHub: 'Negyedek', genresHub: 'Műfajok',
    tocTitle: 'Tartalomjegyzék', clubsInZone: 'Partner Klubok és VIP Asztalok', recommendedClubs: 'Top Klubok Ehhez a Stílushoz',
    upcomingEvents: 'Közelgő Események', faqTitle: 'Gyakori Kérdések',
    otherZones: 'Milánó Mind a 14 Negyede', otherGenres: 'Mind a 10 Zenei Műfaj',
    bookVipCta: 'VIP Asztalfoglalás WhatsApp-on', metroLabel: 'Metró és Közlekedés', priceRangeLabel: 'VIP Asztalok és Listák',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Ellenőrzött Concierge · Nov 2026',
    verifiedBody: 'A 2026/2027-es árak, metróvonalak és belépési szabályok jutalékmentesen frissítve.',
    quickAnswerTitle: 'Gyors Válasz · Összefoglaló', directDeskLabel: '24/7 WhatsApp +39 351 912 7047',
    zoneTitleTail: 'Milánó Éjszakai Élet', genreTitleTail: 'Milánó Klubok',
    hubZonesBadge: 'Milánó 14 Éjszakai Negyede · 2026/2027', hubZonesH1: 'Milánó Éjszakai Negyedei',
    hubZonesLead: 'Hasonlítsd össze Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera és Navigli klubjait.',
    hubGenresBadge: '10 Hivatalos Zenei Műfaj · 2026/2027', hubGenresH1: 'Válaszd ki a Zenei Stílusod Milánóban',
    hubGenresLead: 'House és Afro House bulik, Reggaeton a Corso Como negyedben, Techno és Dinner Show estek.',
    ctaTitle: 'VIP Asztalt vagy Vendéglistát Kérsz Ma Estére?',
    ctaDesc: 'Ügynökségi díj nélkül, alaprajz 10 percen belül és névre szóló belépés 19 partnerklubba.',
    zoneHeadings: ['Negyed Profil és Közönség', 'Metró M1-M5 és Éjszakai Járatok', 'Top Klubok és Bárhelyszínek', 'VIP Asztalárak 2026/2027 és Dress Code', 'Concierge Belépési Tippek'],
    genreHeadings: ['Zenei Hangulat és Közönség', 'Ajánlott Klubok és Heti Rend', 'VIP Asztalok és Vendéglisták', 'Ajtószabályok és Dress Code', 'Közvetlen Foglalás (+39 351 912 7047)'],
    overviewIntro: 'Milánó egyik meghatározó éjszakai központja a 2026/2027-es szezonban.', accessIntro: 'Közvetlen elérés:',
    clubsIntro: 'Heti akkreditáció az alábbi klubokban:', pricesIntro: 'Hivatalos árak 2026/2027:',
    tipsIntro: 'Írj WhatsApp-on a +39 351 912 7047 számra 19:00 előtt dátummal, névvel és létszámmal.',
    faqQ1Prefix: 'Melyek a legjobb klubok:', faqQ2Prefix: 'Mennyibe kerülnek a VIP asztalok:', faqQ3Prefix: 'Dress code és érkezés:', faqQ4Prefix: 'Ingyenes foglalás:',
  },
  ga: {
    city: 'Milano', home: 'Baile', zonesHub: 'Ceantair', genresHub: 'Seánraí',
    tocTitle: 'Clár an Treoirleabhair', clubsInZone: 'Clubanna & Boird VIP', recommendedClubs: 'Clubanna is Fearr',
    upcomingEvents: 'Imeachtaí le Teacht', faqTitle: 'Ceisteanna Coitianta',
    otherZones: 'Gach 14 Cheantar i Milano', otherGenres: 'Gach 10 Seánra Ceoil',
    bookVipCta: 'Cuir Bord VIP in Áirithe ar WhatsApp', metroLabel: 'Meitreo & Iompar', priceRangeLabel: 'Boird VIP & Liostaí',
    dressCodeLabel: 'Cód Éadaigh', verifiedBadge: 'Concierge Deimhnithe · Samh 2026',
    verifiedBody: 'Praghsanna 2026/2027, bealaí meitreo agus rialacha dorais fíoraithe gan táille gníomhaireachta.',
    quickAnswerTitle: 'Freagra Tapa · Achoimre', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Oícheanta Milano', genreTitleTail: 'Clubanna Milano',
    hubZonesBadge: '14 Cheantar Oíche i Milano · 2026/2027', hubZonesH1: 'Ceantair Oíche Milano',
    hubZonesLead: 'Déan comparáid idir Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera agus Navigli.',
    hubGenresBadge: '10 Seánra Ceoil Oifigiúil · 2026/2027', hubGenresH1: 'Roghnaigh Do Stíl Cheoil i Milano',
    hubGenresLead: 'Ó House & Afro House go Reggaeton i Corso Como, Techno agus Dinner Shows.',
    ctaTitle: 'Bord VIP nó Liosta Aíonna uait Anocht?',
    ctaDesc: 'Gan aon táille bhreise, plean boird faoi bhun 10 nóiméad agus rochtain i 19 gclub comhpháirtíochta.',
    zoneHeadings: ['Próifíl an Cheantair', 'Meitreo M1-M5 & Busanna Oíche', 'Na Clubanna is Fearr', 'Praghsanna VIP 2026/2027 & Éadaí', 'Leideanna Concierge'],
    genreHeadings: ['Stíl Ceoil & Atmaisféar', 'Príomhchlubanna', 'Praghsanna VIP & Liostaí', 'Rialacha Dorais', 'Áirithint Dhíreach (+39 351 912 7047)'],
    overviewIntro: 'ar cheann de na príomhcheantair oíche i Milano do 2026/2027.', accessIntro: 'Rochtain éasca trí',
    clubsIntro: 'Áirithintí seachtainiúla ar fáil ag:', pricesIntro: 'Praghsanna oifigiúla 2026/2027:',
    tipsIntro: 'Seol teachtaireacht WhatsApp chuig +39 351 912 7047 roimh 19:00 leis an dáta agus líon na n-aíonna.',
    faqQ1Prefix: 'Na clubanna is fearr le haghaidh', faqQ2Prefix: 'Praghsanna VIP do', faqQ3Prefix: 'Cód éadaigh do', faqQ4Prefix: 'Conas áirithint saor in aisce a dhéanamh do',
  },
  lv: {
    city: 'Milāna', home: 'Sākums', zonesHub: 'Rajoni', genresHub: 'Žanri',
    tocTitle: 'Saturs', clubsInZone: 'Klubi un VIP galdiņi', recommendedClubs: 'Labākie klubi šim žanram',
    upcomingEvents: 'Tuvākie pasākumi', faqTitle: 'Biežāk uzdotie jautājumi',
    otherZones: 'Visi 14 Milānas rajoni', otherGenres: 'Visi 10 mūzikas žanri',
    bookVipCta: 'Rezervēt VIP galdiņu WhatsApp', metroLabel: 'Metro un transports', priceRangeLabel: 'VIP galdiņi un saraksti',
    dressCodeLabel: 'Dreskods', verifiedBadge: 'Pārbaudīts Concierge · Nov 2026',
    verifiedBody: '2026/2027 cenas, metro savienojumi un ieejas noteikumi bez aģentūras komisijas.',
    quickAnswerTitle: 'Ātrā atbilde · Kopsavilkums', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Milānas naktsdzīve', genreTitleTail: 'Milānas klubi',
    hubZonesBadge: '14 Milānas naktsdzīves rajoni · 2026/2027', hubZonesH1: 'Milānas naktsdzīves rajoni',
    hubZonesLead: 'Salīdziniet Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera un Navigli.',
    hubGenresBadge: '10 oficiālie mūzikas žanri · 2026/2027', hubGenresH1: 'Izvēlieties savu mūziku Milānā',
    hubGenresLead: 'House un Afro House klubi, Reggaeton Corso Como rajonā, Techno un Dinner Show vakari.',
    ctaTitle: 'Vai vēlaties VIP galdiņu vai viesu sarakstu šovakar?',
    ctaDesc: 'Bez starpniecības maksas, zāles plāns 10 minūtēs un ieeja 19 partneru klubos.',
    zoneHeadings: ['Rajona profils un publika', 'Metro M1-M5 un nakts transports', 'Labākie klubi un bāri', 'VIP cenas 2026/2027 un dreskods', 'Concierge ieejas padomi'],
    genreHeadings: ['Mūzikas stils un atmosfēra', 'Vadošie klubi un grafiks', 'VIP galdiņi un sarakstu cenas', 'Ieejas kontrole un dreskods', 'Tiešā rezervācija (+39 351 912 7047)'],
    overviewIntro: 'ir viens no galvenajiem Milānas naktsdzīves centriem 2026/2027 sezonā.', accessIntro: 'Ērta piekļuve ar',
    clubsIntro: 'Iknedēļas rezervācijas pieejamas:', pricesIntro: 'Oficiālās cenas 2026/2027:',
    tipsIntro: 'Rakstiet WhatsApp uz +39 351 912 7047 līdz plkst. 19:00 ar datumu, vārdu un viesu skaitu.',
    faqQ1Prefix: 'Labākie klubi:', faqQ2Prefix: 'VIP galdiņu cenas:', faqQ3Prefix: 'Dreskods un laiks:', faqQ4Prefix: 'Kā rezervēt bez maksas:',
  },
  lt: {
    city: 'Milanas', home: 'Pradžia', zonesHub: 'Rajonai', genresHub: 'Žanrai',
    tocTitle: 'Gido turinys', clubsInZone: 'Klubai ir VIP staliukai', recommendedClubs: 'Geriausi klubai šiam stiliui',
    upcomingEvents: 'Artėjantys renginiai', faqTitle: 'Dažniausi klausimai',
    otherZones: 'Visi 14 Milano rajonų', otherGenres: 'Visi 10 muzikos žanrų',
    bookVipCta: 'Rezervuoti VIP stalą per WhatsApp', metroLabel: 'Metro ir transportas', priceRangeLabel: 'VIP stalai ir sąrašai',
    dressCodeLabel: 'Aprangos kodas', verifiedBadge: 'Patikrintas Concierge · Lap 2026',
    verifiedBody: '2026/2027 kainos, metro jungtys ir įėjimo taisyklės be agentūros mokesčio.',
    quickAnswerTitle: 'Greitas atsakymas · Santrauka', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Milano naktinis gyvenimas', genreTitleTail: 'Milano klubai',
    hubZonesBadge: '14 Milano naktinio gyvenimo rajonų · 2026/2027', hubZonesH1: 'Milano naktinio gyvenimo rajonai',
    hubZonesLead: 'Palyginkite Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera ir Navigli.',
    hubGenresBadge: '10 oficialių muzikos žanrų · 2026/2027', hubGenresH1: 'Raskite savo muziką Milane',
    hubGenresLead: 'House ir Afro House vakarėliai, Reggaeton Corso Como, Techno bei Dinner Show vakarai.',
    ctaTitle: 'Reikia VIP staliuko ar svečių sąrašo šiam vakarui?',
    ctaDesc: 'Nulis agentūros mokesčių, salės planas per 10 minučių ir patvirtintas įėjimas į 19 klubų.',
    zoneHeadings: ['Rajono profilis ir publika', 'Metro M1-M5 ir naktinis transportas', 'Geriausi klubai ir erdvės', 'VIP kainos 2026/2027 ir aprangos kodas', 'Concierge patarimai dėl įėjimo'],
    genreHeadings: ['Muzikos profilis ir atmosfera', 'Pagrindiniai klubai ir grafikas', 'VIP staliukų ir sąrašų kainos', 'Įėjimo kontrolė ir apranga', 'Tiesioginė rezervacija (+39 351 912 7047)'],
    overviewIntro: 'yra vienas svarbiausių Milano naktinio gyvenimo rajonų 2026/2027 m.', accessIntro: 'Patogus susisiekimas per',
    clubsIntro: 'Savaitinės rezervacijos vykdomos:', pricesIntro: 'Oficialios kainos 2026/2027:',
    tipsIntro: 'Rašykite WhatsApp +39 351 912 7047 iki 19:00 nurodydami datą, vardą ir svečių skaičių.',
    faqQ1Prefix: 'Kokie klubai geriausi:', faqQ2Prefix: 'Kiek kainuoja VIP stalai:', faqQ3Prefix: 'Aprangos kodas ir laikas:', faqQ4Prefix: 'Kaip nemokamai rezervuoti:',
  },
  mt: {
    city: 'Milan', home: 'Dar', zonesHub: 'Żoni', genresHub: 'Ġeneri',
    tocTitle: 'Kontenut tal-Gwida', clubsInZone: 'Klabbs u Mwejjed VIP', recommendedClubs: 'L-Aqwa Klabbs għal Dan l-Istil',
    upcomingEvents: 'Avvenimenti Ġejjin', faqTitle: 'Mistoqsijiet Frekwenti',
    otherZones: 'Esplora l-14-il Żona ta’ Milan', otherGenres: 'Esplora l-10 Ġeneri Mużikali',
    bookVipCta: 'Ibbukkja Mejda VIP fuq WhatsApp', metroLabel: 'Metro u Trasport', priceRangeLabel: 'Mwejjed VIP u Listi',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Concierge Verifikat · Nov 2026',
    verifiedBody: 'Prezzijiet 2026/2027, rotot tal-metro u regoli tad-dħul bla ħlas ta’ aġenzija.',
    quickAnswerTitle: 'Tweġiba Mgħaġġla · Sommarju', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Ħajja ta’ Billejl Milan', genreTitleTail: 'Klabbs f’Milan',
    hubZonesBadge: '14-il Distrett tal-Lejl f’Milan · 2026/2027', hubZonesH1: 'Id-Distretti tal-Ħajja ta’ Billejl f’Milan',
    hubZonesLead: 'Qabbel Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera u Navigli.',
    hubGenresBadge: '10 Ġeneri Mużikali Uffiċjali · 2026/2027', hubGenresH1: 'Sib il-Mużika Tiegħek f’Milan',
    hubGenresLead: 'Minn House u Afro House f’San Siro għal Reggaeton f’Corso Como, Techno u Dinner Shows.',
    ctaTitle: 'Trid Mejda VIP jew Guest List għall-Lejla?',
    ctaDesc: 'Żero kummissjoni, mappa tal-mejda f’10 minuti u dħul dirett f’19-il klabb msieħeb.',
    zoneHeadings: ['Profil taż-Żona u Pubbliku', 'Metro M1-M5 u Trasport', 'L-Aqwa Klabbs u Lounges', 'Prezzijiet VIP 2026/2027 u Dress Code', 'Pariri tal-Concierge'],
    genreHeadings: ['Stil Mużikali u Atmosfera', 'Klabbs Prijoritarji', 'Prezzijiet VIP u Listi', 'Regoli tad-Dħul u Dress Code', 'Booking Dirett (+39 351 912 7047)'],
    overviewIntro: 'huwa wieħed miċ-ċentri ewlenin tal-ħajja ta’ billejl f’Milan għall-2026/2027.', accessIntro: 'Aċċess dirett permezz ta’',
    clubsIntro: 'Akkreditazzjoni kull ġimgħa f’:', pricesIntro: 'Prezzijiet uffiċjali 2026/2027:',
    tipsIntro: 'Ibgħat messaġġ WhatsApp fuq +39 351 912 7047 qabel is-19:00 bid-data, isem u numru ta’ nies.',
    faqQ1Prefix: 'L-aqwa klabbs għal', faqQ2Prefix: 'Prezzijiet għal', faqQ3Prefix: 'Dress code għal', faqQ4Prefix: 'Kif tibbukkja b’xejn għal',
  },
  pl: {
    city: 'Mediolan', home: 'Start', zonesHub: 'Dzielnice', genresHub: 'Gatunki',
    tocTitle: 'Spis treści', clubsInZone: 'Kluby i Stoliki VIP', recommendedClubs: 'Najlepsze Kluby w Tym Stylu',
    upcomingEvents: 'Nadchodzące Wydarzenia', faqTitle: 'Najczęstsze Pytania',
    otherZones: 'Wszystkie 14 dzielnic Mediolanu', otherGenres: 'Wszystkie 10 gatunków muzycznych',
    bookVipCta: 'Zarezerwuj Stolik VIP na WhatsApp', metroLabel: 'Metro i Dojazd', priceRangeLabel: 'Stoliki VIP i Listy',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Zweryfikowany Concierge · Lis 2026',
    verifiedBody: 'Cennik 2026/2027, połączenia metra i selekcja zweryfikowane bez prowizji agencji.',
    quickAnswerTitle: 'Szybka odpowiedź · Podsumowanie', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Życie Nocne Mediolan', genreTitleTail: 'Kluby Mediolan',
    hubZonesBadge: '14 nocnych dzielnic Mediolanu · 2026/2027', hubZonesH1: 'Nocne Dzielnice Mediolanu',
    hubZonesLead: 'Porównaj Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli i Isola.',
    hubGenresBadge: '10 Oficjalnych Gatunków Muzycznych · 2026/2027', hubGenresH1: 'Wybierz Swój Styl w Mediolanie',
    hubGenresLead: 'Od House i Afro House pod Torre Branca i San Siro po Reggaeton na Corso Como, Techno i Dinner Show.',
    ctaTitle: 'Chcesz zarezerwować stolik VIP lub listę na dziś?',
    ctaDesc: 'Zero prowizji, plan sali w 10 minut i bezpośrednia akredytacja w 19 partnerskich klubach.',
    zoneHeadings: ['Charakter dzielnicy i goście', 'Metro M1-M5, autobusy nocne i taxi', 'Najlepsze kluby i lounge bary', 'Ceny stolików VIP 2026/2027 i dress code', 'Wskazówki Concierge przed wejściem'],
    genreHeadings: ['Brzmienie i klimat imprezy', 'Topowe kluby i harmonogram', 'Ceny stolików VIP i list', 'Selekcja na bramce i dress code', 'Bezpośrednia rezerwacja (+39 351 912 7047)'],
    overviewIntro: 'to jedna z głównych stref imprezowych w Mediolanie na sezon 2026/2027.', accessIntro: 'Szybki dojazd przez',
    clubsIntro: 'Cotygodniowe wejścia i stoliki zapewniamy w:', pricesIntro: 'Oficjalny cennik 2026/2027:',
    tipsIntro: 'Napisz na WhatsApp +39 351 912 7047 przed 19:00, podając datę, imię i liczbę osób.',
    faqQ1Prefix: 'Najlepsze kluby na', faqQ2Prefix: 'Ceny stolików VIP dla', faqQ3Prefix: 'Dress code i godziny dla', faqQ4Prefix: 'Jak bezpłatnie zarezerwować',
  },
  ro: {
    city: 'Milano', home: 'Acasă', zonesHub: 'Cartiere', genresHub: 'Genuri',
    tocTitle: 'Cuprinsul Ghidului', clubsInZone: 'Cluburi & Mese VIP', recommendedClubs: 'Top Cluburi pentru Acest Gen',
    upcomingEvents: 'Evenimente Următoare', faqTitle: 'Întrebări Frecvente',
    otherZones: 'Toate cele 14 cartiere din Milano', otherGenres: 'Toate cele 10 genuri muzicale',
    bookVipCta: 'Rezervă Masă VIP pe WhatsApp', metroLabel: 'Metrou & Transport', priceRangeLabel: 'Mese VIP & Liste',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Concierge Verificat · Nov 2026',
    verifiedBody: 'Tarife 2026/2027, conexiuni metrou și politici de acces verificate fără comision.',
    quickAnswerTitle: 'Răspuns Rapid · Sinteză', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Viața de Noapte Milano', genreTitleTail: 'Cluburi Milano',
    hubZonesBadge: '14 Cartiere de Noapte în Milano · 2026/2027', hubZonesH1: 'Cartierele Vieții de Noapte din Milano',
    hubZonesLead: 'Compară Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli și Isola.',
    hubGenresBadge: '10 Genuri Muzicale Oficiale · 2026/2027', hubGenresH1: 'Alege Stilul Tău Muzical în Milano',
    hubGenresLead: 'De la House și Afro House la San Siro până la Reggaeton în Corso Como, Techno și Dinner Shows.',
    ctaTitle: 'Vrei o Masă VIP sau Listă de Invitați Diseară?',
    ctaDesc: 'Zero comisioane de agenție, hartă mese în sub 10 minute și acces direct în 19 cluburi partenere.',
    zoneHeadings: ['Profilul Cartierului & Public', 'Metrou M1-M5 & Transport de Noapte', 'Top Cluburi & Lounge-uri VIP', 'Prețuri Mese VIP 2026/2027 & Dress Code', 'Sfaturi Concierge pentru Acces Rapid'],
    genreHeadings: ['Profil Muzical & Atmosferă', 'Cluburi Recomandate & Program', 'Prețuri Mese VIP & Liste', 'Selecție la Intrare & Dress Code', 'Rezervare Directă (+39 351 912 7047)'],
    overviewIntro: 'este unul dintre centrele esențiale ale vieții de noapte din Milano în 2026/2027.', accessIntro: 'Acces direct prin',
    clubsIntro: 'Acreditări săptămânale disponibile la:', pricesIntro: 'Tarife oficiale 2026/2027:',
    tipsIntro: 'Trimite mesaj WhatsApp la +39 351 912 7047 înainte de 19:00 cu data, numele și numărul de persoane.',
    faqQ1Prefix: 'Care sunt cele mai bune cluburi pentru', faqQ2Prefix: 'Cât costă mesele VIP la', faqQ3Prefix: 'Care este dress code-ul pentru', faqQ4Prefix: 'Cum rezerv gratuit pentru',
  },
  sk: {
    city: 'Miláno', home: 'Domov', zonesHub: 'Štvrte', genresHub: 'Žánre',
    tocTitle: 'Obsah sprievodcu', clubsInZone: 'Kluby a VIP stoly', recommendedClubs: 'Najlepšie kluby pre tento žáner',
    upcomingEvents: 'Nadchádzajúce akcie', faqTitle: 'Časté otázky',
    otherZones: 'Všetkých 14 štvrtí Milána', otherGenres: 'Všetkých 10 hudobných žánrov',
    bookVipCta: 'Rezervovať VIP stôl cez WhatsApp', metroLabel: 'Metro a doprava', priceRangeLabel: 'VIP stoly a zoznamy',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Overený Concierge · Nov 2026',
    verifiedBody: 'Ceny 2026/2027, linky metra a vstupné pravidlá overené bez provízie.',
    quickAnswerTitle: 'Rýchla odpoveď · Prehľad', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Nočný život Miláno', genreTitleTail: 'Kluby Miláno',
    hubZonesBadge: '14 nočných štvrtí Milána · 2026/2027', hubZonesH1: 'Nočné štvrte Milána',
    hubZonesLead: 'Porovnajte Parco Sempione, Corso Como, San Siro, CityLife Portello, Breru a Navigli.',
    hubGenresBadge: '10 hudobných žánrov · 2026/2027', hubGenresH1: 'Vyberte si svoj štýl v Miláne',
    hubGenresLead: 'Od House a Afro House cez Reggaeton v Corso Como po Techno a Dinner Show večery.',
    ctaTitle: 'Chcete VIP stôl alebo guestlist na dnešný večer?',
    ctaDesc: 'Nulové poplatky, mapa stolov do 10 minút a priamy vstup do 19 partnerských klubov.',
    zoneHeadings: ['Profil štvrte a publikum', 'Metro M1-M5 a nočné spoje', 'Top kluby a salóniky', 'Ceny VIP stolov 2026/2027 a dress code', 'Tipy concierge pre rýchly vstup'],
    genreHeadings: ['Hudobný štýl a atmosféra', 'Odporúčané kluby a program', 'Ceny VIP stolov a zoznamov', 'Kontrola pri vstupe a dress code', 'Priama rezervácia (+39 351 912 7047)'],
    overviewIntro: 'patrí medzi hlavné nočné lokality v Miláne pre sezónu 2026/2027.', accessIntro: 'Jednoduchý prístup cez',
    clubsIntro: 'Týždenná akreditácia funguje v:', pricesIntro: 'Oficiálne ceny 2026/2027:',
    tipsIntro: 'Napíšte na WhatsApp +39 351 912 7047 do 19:00 dátum, meno a počet osôb.',
    faqQ1Prefix: 'Aké sú najlepšie kluby pre', faqQ2Prefix: 'Koľko stoja VIP stoly pre', faqQ3Prefix: 'Aký je dress code pre', faqQ4Prefix: 'Ako si zdarma rezervovať',
  },
  sl: {
    city: 'Milano', home: 'Domov', zonesHub: 'Četrti', genresHub: 'Žanri',
    tocTitle: 'Kazalo vodiča', clubsInZone: 'Klubi in VIP mize', recommendedClubs: 'Najboljši klubi za ta zvok',
    upcomingEvents: 'Prihajajoči dogodki', faqTitle: 'Pogosta vprašanja',
    otherZones: 'Vseh 14 četrti Milana', otherGenres: 'Vseh 10 glasbenih žanrov',
    bookVipCta: 'Rezerviraj VIP mizo na WhatsApp', metroLabel: 'Metro in prevoz', priceRangeLabel: 'VIP mize in seznami',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Preverjeni Concierge · Nov 2026',
    verifiedBody: 'Cene 2026/2027, povezave metroja in pravila vstopa brez provizije.',
    quickAnswerTitle: 'Hitri odgovor · Povzetek', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Nočno življenje Milano', genreTitleTail: 'Klubi Milano',
    hubZonesBadge: '14 nočnih četrti Milana · 2026/2027', hubZonesH1: 'Nočne četrti Milana',
    hubZonesLead: 'Primerjajte Parco Sempione, Corso Como, San Siro, CityLife Portello, Brero in Navigli.',
    hubGenresBadge: '10 glasbenih žanrov · 2026/2027', hubGenresH1: 'Izberite svoj zvok v Milanu',
    hubGenresLead: 'Od House in Afro House do Reggaetona na Corso Como, Techna in Dinner Show večerov.',
    ctaTitle: 'Rezervirajte VIP mizo ali seznam gostov za nocoj',
    ctaDesc: 'Brez agencijskih provizij, načrt miz v 10 minutah in vstop v 19 partnerskih klubov.',
    zoneHeadings: ['Profil četrti in publika', 'Metro M1-M5 in nočni prevoz', 'Najboljši klubi in bari', 'Cene VIP miz 2026/2027 in dress code', 'Concierge nasveti za vstop'],
    genreHeadings: ['Glasbeni slog in vzdušje', 'Vodilni klubi in urnik', 'Cene VIP miz in seznamov', 'Pravila na vhodu in obleka', 'Neposredna rezervacija (+39 351 912 7047)'],
    overviewIntro: 'je eno najpomembnejših središč nočnega življenja v Milanu v sezoni 2026/2027.', accessIntro: 'Hiter dostop prek',
    clubsIntro: 'Tedenska akreditacija je na voljo v:', pricesIntro: 'Uradne cene 2026/2027:',
    tipsIntro: 'Pošljite WhatsApp na +39 351 912 7047 pred 19:00 z datumom, imenom in številom gostov.',
    faqQ1Prefix: 'Kateri so najboljši klubi za', faqQ2Prefix: 'Koliko stanejo VIP mize za', faqQ3Prefix: 'Kakšen je dress code za', faqQ4Prefix: 'Kako brezplačno rezerviram',
  },
  sv: {
    city: 'Milano', home: 'Hem', zonesHub: 'Stadsdelar', genresHub: 'Genrer',
    tocTitle: 'Innehåll', clubsInZone: 'Klubbar & VIP-bord', recommendedClubs: 'Bästa Klubbarna för Detta Sound',
    upcomingEvents: 'Kommande Event', faqTitle: 'Vanliga Frågor',
    otherZones: 'Utforska Alla 14 Stadsdelar i Milano', otherGenres: 'Utforska Alla 10 Musikgenrer',
    bookVipCta: 'Boka VIP-bord på WhatsApp', metroLabel: 'Metro & Resa', priceRangeLabel: 'VIP-bord & Gästlista',
    dressCodeLabel: 'Klädkod', verifiedBadge: 'Verifierad Concierge · Nov 2026',
    verifiedBody: 'Priser 2026/2027, tunnelbanelinjer och dörrregler kontrollerade helt utan förmedlingsavgift.',
    quickAnswerTitle: 'Snabbsvar · Översikt', directDeskLabel: '24/7 WhatsApp +39 351 912 7047',
    zoneTitleTail: 'Nattliv Milano', genreTitleTail: 'Klubbar Milano',
    hubZonesBadge: '14 Nattlivsdistrikt i Milano · 2026/2027', hubZonesH1: 'Milanos Nattlivsdistrikt',
    hubZonesLead: 'Jämför Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli och Isola.',
    hubGenresBadge: '10 Officiella Musikgenrer · 2026/2027', hubGenresH1: 'Hitta Ditt Sound i Milano',
    hubGenresLead: 'Från House och Afro House vid Torre Branca och San Siro till Reggaeton, Techno och Dinner Shows.',
    ctaTitle: 'Behöver du VIP-bord eller gästlista ikväll?',
    ctaDesc: 'Inga avgifter, bordsöversikt på under 10 minuter och garanterad ackreditering hos 19 partnerklubbar.',
    zoneHeadings: ['Stadsdel & Publik', 'Metro M1-M5, Nattbuss & Taxi', 'Bästa Klubbar & Lounger', 'VIP-priser 2026/2027 & Klädkod', 'Concierge-tips för Smidig Entré'],
    genreHeadings: ['Musikstil & Atmosfär', 'Prioriterade Klubbar & Schema', 'Priser VIP-bord & Gästlistor', 'Dörrpolicy & Klädkod', 'Direktbokning (+39 351 912 7047)'],
    overviewIntro: 'är ett av Milanos främsta nav för nattliv under säsongen 2026/2027.', accessIntro: 'Direkt anslutning via',
    clubsIntro: 'Vi ordnar gästlista och VIP-bord hos:', pricesIntro: 'Officiella priser 2026/2027:',
    tipsIntro: 'Skicka ett WhatsApp-meddelande till +39 351 912 7047 före 19:00 med datum, namn och antal gäster.',
    faqQ1Prefix: 'Bästa klubbarna för', faqQ2Prefix: 'Vad kostar VIP-bord för', faqQ3Prefix: 'Klädkod och ankomsttid för', faqQ4Prefix: 'Hur bokar man gratis',
  },
  no: {
    city: 'Milano', home: 'Hjem', zonesHub: 'Bydeler', genresHub: 'Sjangre',
    tocTitle: 'I Denne Guiden', clubsInZone: 'Klubber & VIP-bord', recommendedClubs: 'Beste Klubber for Denne Stilen',
    upcomingEvents: 'Kommende Eventer', faqTitle: 'Ofte Stilte Spørsmål',
    otherZones: 'Utforsk Alle 14 Bydeler i Milano', otherGenres: 'Utforsk Alle 10 Musikksjangre',
    bookVipCta: 'Bestill VIP-bord på WhatsApp', metroLabel: 'T-bane & Transport', priceRangeLabel: 'VIP-bord & Gjesteliste',
    dressCodeLabel: 'Kleskode', verifiedBadge: 'Verifisert Concierge · Nov 2026',
    verifiedBody: 'Priser 2026/2027, T-baneforbindelser og dørregler bekreftet uten gebyr.',
    quickAnswerTitle: 'Raskt Svar · Oversikt', directDeskLabel: '24/7 WhatsApp +39 351 912 7047',
    zoneTitleTail: 'Uteliv Milano', genreTitleTail: 'Klubber Milano',
    hubZonesBadge: '14 Utelivsbydeler i Milano · 2026/2027', hubZonesH1: 'Milanos Utelivsbydeler',
    hubZonesLead: 'Sammenlign Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli og Isola.',
    hubGenresBadge: '10 Offisielle Musikksjangre · 2026/2027', hubGenresH1: 'Finn Din Stil i Milano',
    hubGenresLead: 'Fra House og Afro House ved Torre Branca og San Siro til Reggaeton, Techno og Dinner Shows.',
    ctaTitle: 'Bestille VIP-bord eller gjesteliste i kveld?',
    ctaDesc: 'Null provisjon, bordkart på under 10 minutter og direkte gjesteliste hos 19 partnerklubber.',
    zoneHeadings: ['Bydelsprofil & Publikum', 'T-bane M1-M5, Nattbuss & Taxi', 'Beste Klubber & Lounger', 'VIP-priser 2026/2027 & Kleskode', 'Concierge-tips for Inngang'],
    genreHeadings: ['Lydbilde & Stemning', 'Toppklubber & Ukeplan', 'VIP-bord & Gjestelister', 'Dørkontroll & Kleskode', 'Direkte Bestilling (+39 351 912 7047)'],
    overviewIntro: 'er et av de viktigste områdene for uteliv i Milano i 2026/2027.', accessIntro: 'Enkel adkomst med',
    clubsIntro: 'Ukentlig gjesteliste og VIP-bord tilbys hos:', pricesIntro: 'Offisielle priser 2026/2027:',
    tipsIntro: 'Send WhatsApp til +39 351 912 7047 før kl. 19:00 med dato, fullt navn og antall gjester.',
    faqQ1Prefix: 'Beste klubber for', faqQ2Prefix: 'Pris på VIP-bord i', faqQ3Prefix: 'Kleskode og ankomsttid for', faqQ4Prefix: 'Hvordan bestille gratis',
  },
  is: {
    city: 'Mílanó', home: 'Heim', zonesHub: 'Hverfi', genresHub: 'Tónlist',
    tocTitle: 'Efnisyfirlit', clubsInZone: 'Klúbbar & VIP Borð', recommendedClubs: 'Bestu Klúbbarnir',
    upcomingEvents: 'Næstu Viðburðir', faqTitle: 'Algengar Spurningar',
    otherZones: 'Öll 14 Hverfi Mílanó', otherGenres: 'Allar 10 Tónlistarstefnur',
    bookVipCta: 'Bóka VIP borð á WhatsApp', metroLabel: 'Neðanjarðarlest & Samgöngur', priceRangeLabel: 'VIP Borð & Gestalistar',
    dressCodeLabel: 'Klæðaburður', verifiedBadge: 'Staðfest Concierge · Nóv 2026',
    verifiedBody: 'Verð 2026/2027, lestaleiðir og hurðareglur staðfest án umboðslauna.',
    quickAnswerTitle: 'Stutt Svar · Yfirlit', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Næturlíf Mílanó', genreTitleTail: 'Klúbbar Mílanó',
    hubZonesBadge: '14 Næturlífshverfi í Mílanó · 2026/2027', hubZonesH1: 'Næturlífshverfi Mílanó',
    hubZonesLead: 'Berðu saman Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera og Navigli.',
    hubGenresBadge: '10 Tónlistarstefnur · 2026/2027', hubGenresH1: 'Finndu Þína Tónlist í Mílanó',
    hubGenresLead: 'Frá House og Afro House við San Siro til Reggaeton í Corso Como, Techno og Dinner Show.',
    ctaTitle: 'Viltu VIP borð eða gestalista í kvöld?',
    ctaDesc: 'Engin þjónustugjöld, borðaplan innan 10 mínútna og forgangsaðgangur í 19 klúbba.',
    zoneHeadings: ['Yfirlit hverfis og gesta', 'Lestir M1-M5 og nætursamgöngur', 'Bestu klúbbarnir', 'VIP verð 2026/2027 og klæðaburður', 'Ráð fyrir greiðan aðgang'],
    genreHeadings: ['Tónlistarstefna og stemning', 'Helstu klúbbar', 'VIP borð og gestalistar', 'Hurðarreglur og klæðaburður', 'Bein bókun (+39 351 912 7047)'],
    overviewIntro: 'er einn af helstu áfangastöðum næturlífsins í Mílanó 2026/2027.', accessIntro: 'Beint aðgengi um',
    clubsIntro: 'Vikulegar bókanir í boði hjá:', pricesIntro: 'Opinbert verð 2026/2027:',
    tipsIntro: 'Sendu WhatsApp á +39 351 912 7047 fyrir kl. 19:00 með dagsetningu, nafni og fjölda gesta.',
    faqQ1Prefix: 'Bestu klúbbarnir fyrir', faqQ2Prefix: 'Hvað kosta VIP borð í', faqQ3Prefix: 'Hver er klæðaburður í', faqQ4Prefix: 'Hvernig bóka ég frítt',
  },
  uk: {
    city: 'Мілан', home: 'Головна', zonesHub: 'Райони', genresHub: 'Жанри',
    tocTitle: 'Зміст гіда', clubsInZone: 'Топ-клуби та VIP-столи', recommendedClubs: 'Найкращі клуби цього стилю',
    upcomingEvents: 'Найближчі події', faqTitle: 'Часті запитання',
    otherZones: 'Усі 14 районів Мілана', otherGenres: 'Усі 10 музичних жанрів',
    bookVipCta: 'Бронювати VIP-стіл у WhatsApp', metroLabel: 'Метро і транспорт', priceRangeLabel: 'VIP-столи та списки',
    dressCodeLabel: 'Дрес-код', verifiedBadge: 'Перевірений консьєрж · Лис 2026',
    verifiedBody: 'Ціни 2026/2027, маршрути метро та правила фейсконтролю перевірено без комісій.',
    quickAnswerTitle: 'Швидка відповідь · Огляд', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Нічне життя Мілана', genreTitleTail: 'Клуби Мілана',
    hubZonesBadge: '14 нічних районів Мілана · 2026/2027', hubZonesH1: 'Нічні райони Мілана',
    hubZonesLead: 'Порівняйте Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera, Navigli та Isola.',
    hubGenresBadge: '10 музичних форматів Мілана · 2026/2027', hubGenresH1: 'Оберіть свій звук у Мілані',
    hubGenresLead: 'Від House та Afro House у San Siro до Reggaeton на Corso Como, Techno і Dinner Show.',
    ctaTitle: 'Потрібен VIP-стіл або гостьовий список на сьогодні?',
    ctaDesc: '0% комісії агентства, схема столів за 10 хвилин та пряма акредитація у 19 клубах.',
    zoneHeadings: ['Профіль району та публіка', 'Метро M1-M5 і нічний транспорт', 'Найкращі клуби та лаунжі', 'Ціни VIP-столів 2026/2027 і дрес-код', 'Поради консьєржа для входу'],
    genreHeadings: ['Музичний профіль та атмосфера', 'Пріоритетні клуби і розклад', 'Ціни VIP-столів і списків', 'Фейсконтроль і дрес-код', 'Пряме бронювання (+39 351 912 7047)'],
    overviewIntro: 'є одним із головних нічних осередків Мілана у сезоні 2026/2027.', accessIntro: 'Зручний доїзд через',
    clubsIntro: 'Щотижнева акредитація працює у:', pricesIntro: 'Офіційні тарифи 2026/2027:',
    tipsIntro: 'Напишіть у WhatsApp +39 351 912 7047 до 19:00: дата, ім’я та кількість гостей.',
    faqQ1Prefix: 'Які найкращі клуби для', faqQ2Prefix: 'Скільки коштують VIP-столи в', faqQ3Prefix: 'Який дрес-код у', faqQ4Prefix: 'Як безкоштовно забронювати',
  },
  sq: {
    city: 'Milano', home: 'Kreu', zonesHub: 'Zonat', genresHub: 'Zhanret',
    tocTitle: 'Përmbajtja e Udhëzuesit', clubsInZone: 'Klubet & Tavolinat VIP', recommendedClubs: 'Klubet Më të Mira',
    upcomingEvents: 'Eventet e Ardhshme', faqTitle: 'Pyetjet e Shpeshta',
    otherZones: 'Të gjitha 14 Zonat e Milanos', otherGenres: 'Të gjitha 10 Zhanret Muzikore',
    bookVipCta: 'Rezervo Tavolinë VIP në WhatsApp', metroLabel: 'Metro & Transporti', priceRangeLabel: 'Tavolina VIP & Lista',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Concierge i Verifikuar · Nën 2026',
    verifiedBody: 'Çmimet 2026/2027, linjat e metros dhe rregullat e derës të verifikuara pa komision.',
    quickAnswerTitle: 'Përgjigje e Shpejtë · Përmbledhje', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Jeta e Natës Milano', genreTitleTail: 'Klube Milano',
    hubZonesBadge: '14 Zonat e Natës në Milano · 2026/2027', hubZonesH1: 'Lagjet e Jetës së Natës në Milano',
    hubZonesLead: 'Krahasoni Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera dhe Navigli.',
    hubGenresBadge: '10 Zhanre Muzikore Zyrtare · 2026/2027', hubGenresH1: 'Zgjidhni Muzikën Tuaj në Milano',
    hubGenresLead: 'Nga House & Afro House te Reggaeton në Corso Como, Techno dhe Dinner Shows.',
    ctaTitle: 'Doni një Tavolinë VIP apo Listë Sonte?',
    ctaDesc: 'Zero komisione agjencie, planimetri në 10 minuta dhe hyrje direkte në 19 klube partnere.',
    zoneHeadings: ['Profili i Zonës & Publiku', 'Metro M1-M5 & Transporti i Natës', 'Klubet Më të Mira', 'Çmimet VIP 2026/2027 & Dress Code', 'Këshilla Concierge për Hyrje'],
    genreHeadings: ['Identiteti Muzikor & Atmosfera', 'Klubet Prioritare', 'Çmimet VIP & Listat', 'Rregullat e Derës & Dress Code', 'Rezervim Direkt (+39 351 912 7047)'],
    overviewIntro: 'është një nga qendrat kryesore të jetës së natës në Milano për 2026/2027.', accessIntro: 'Qasje e shpejtë me',
    clubsIntro: 'Rezervimet javore mbulojnë:', pricesIntro: 'Tarifat zyrtare 2026/2027:',
    tipsIntro: 'Shkruani në WhatsApp +39 351 912 7047 para orës 19:00 me datën, emrin dhe numrin e personave.',
    faqQ1Prefix: 'Cilat janë klubet më të mira për', faqQ2Prefix: 'Sa kushtojnë tavolinat VIP në', faqQ3Prefix: 'Cili është dress code për', faqQ4Prefix: 'Si të rezervoj falas për',
  },
  sr: {
    city: 'Milano', home: 'Početna', zonesHub: 'Četvrti', genresHub: 'Žanrovi',
    tocTitle: 'Sadržaj vodiča', clubsInZone: 'Klubovi i VIP stolovi', recommendedClubs: 'Najbolji klubovi za ovaj zvuk',
    upcomingEvents: 'Predstojeći događaji', faqTitle: 'Česta pitanja',
    otherZones: 'Svih 14 četvrti Milana', otherGenres: 'Svih 10 muzičkih žanrova',
    bookVipCta: 'Rezerviši VIP sto na WhatsApp', metroLabel: 'Metro i prevoz', priceRangeLabel: 'VIP stolovi i liste',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Provereni Concierge · Nov 2026',
    verifiedBody: 'Cene za 2026/2027, metro linije i pravila ulaska provereni bez agencijske provizije.',
    quickAnswerTitle: 'Brzi odgovor · Pregled', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Noćni život Milano', genreTitleTail: 'Klubovi Milano',
    hubZonesBadge: '14 noćnih četvrti Milana · 2026/2027', hubZonesH1: 'Noćne četvrti Milana',
    hubZonesLead: 'Uporedite Parco Sempione, Corso Como, San Siro, CityLife Portello, Breru i Navigli.',
    hubGenresBadge: '10 muzičkih žanrova · 2026/2027', hubGenresH1: 'Izaberite svoj zvuk u Milanu',
    hubGenresLead: 'Od House i Afro House večeri do Reggaetona na Corso Como, Techna i Dinner Show programa.',
    ctaTitle: 'Rezervišite VIP sto ili listu za večeras',
    ctaDesc: 'Bez provizije agencije, mapa stolova za 10 minuta i direktan ulaz u 19 klubova.',
    zoneHeadings: ['Profil četvrti i publika', 'Metro M1-M5 i noćni prevoz', 'Najbolji klubovi i barovi', 'VIP cene 2026/2027 i dress code', 'Concierge saveti za ulazak'],
    genreHeadings: ['Muzički stil i atmosfera', 'Glavni klubovi i raspored', 'Cene VIP stolova i lista', 'Kontrola ulaza i dress code', 'Direktna rezervacija (+39 351 912 7047)'],
    overviewIntro: 'predstavlja jednu od najvažnijih zona noćnog života u Milanu za 2026/2027.', accessIntro: 'Brza veza preko',
    clubsIntro: 'Nedeljne rezervacije dostupne su u:', pricesIntro: 'Zvanične cene 2026/2027:',
    tipsIntro: 'Pošaljite WhatsApp na +39 351 912 7047 pre 19:00 sa datumom, imenom i brojem gostiju.',
    faqQ1Prefix: 'Koji su najbolji klubovi za', faqQ2Prefix: 'Koliko koštaju VIP stolovi za', faqQ3Prefix: 'Koji je dress code za', faqQ4Prefix: 'Kako besplatno rezervisati',
  },
  bs: {
    city: 'Milano', home: 'Početna', zonesHub: 'Četvrti', genresHub: 'Žanrovi',
    tocTitle: 'Sadržaj vodiča', clubsInZone: 'Klubovi i VIP stolovi', recommendedClubs: 'Najbolji klubovi za ovaj žanr',
    upcomingEvents: 'Predstojeći događaji', faqTitle: 'Česta pitanja',
    otherZones: 'Svih 14 četvrti Milana', otherGenres: 'Svih 10 muzičkih žanrova',
    bookVipCta: 'Rezerviši VIP sto na WhatsApp', metroLabel: 'Metro i prevoz', priceRangeLabel: 'VIP stolovi i liste',
    dressCodeLabel: 'Dress Code', verifiedBadge: 'Provjereni Concierge · Nov 2026',
    verifiedBody: 'Cijene za 2026/2027, metro linije i pravila ulaska bez agencijske provizije.',
    quickAnswerTitle: 'Brzi odgovor · Sažetak', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Noćni život Milano', genreTitleTail: 'Klubovi Milano',
    hubZonesBadge: '14 noćnih četvrti Milana · 2026/2027', hubZonesH1: 'Noćne četvrti Milana',
    hubZonesLead: 'Uporedite Parco Sempione, Corso Como, San Siro, CityLife Portello, Breru i Navigli.',
    hubGenresBadge: '10 muzičkih žanrova · 2026/2027', hubGenresH1: 'Pronađite svoj zvuk u Milanu',
    hubGenresLead: 'Od House i Afro House klubova do Reggaetona na Corso Como, Techna i Dinner Show večera.',
    ctaTitle: 'Želite VIP sto ili listu gostiju večeras?',
    ctaDesc: 'Nula provizije agencije, tlocrt stolova za 10 minuta i direktan ulaz u 19 klubova.',
    zoneHeadings: ['Profil četvrti i publika', 'Metro M1-M5 i noćni prevoz', 'Najbolji klubovi i barovi', 'VIP cijene 2026/2027 i dress code', 'Concierge savjeti za brzi ulaz'],
    genreHeadings: ['Muzički profil i atmosfera', 'Prioritetni klubovi i raspored', 'Cijene VIP stolova i listi', 'Pravila ulaska i dress code', 'Direktna rezervacija (+39 351 912 7047)'],
    overviewIntro: 'spada među najvažnije zone noćnog života u Milanu za sezonu 2026/2027.', accessIntro: 'Jednostavan pristup putem',
    clubsIntro: 'Sedmična akreditacija dostupna u:', pricesIntro: 'Zvanične cijene 2026/2027:',
    tipsIntro: 'Pošaljite WhatsApp poruku na +39 351 912 7047 prije 19:00 s datumom, imenom i brojem gostiju.',
    faqQ1Prefix: 'Koji su najbolji klubovi za', faqQ2Prefix: 'Cijene VIP stolova za', faqQ3Prefix: 'Dress code i vrijeme za', faqQ4Prefix: 'Kako besplatno rezervisati',
  },
  mk: {
    city: 'Милано', home: 'Почетна', zonesHub: 'Населби', genresHub: 'Жанрови',
    tocTitle: 'Содржина', clubsInZone: 'Клубови и VIP маси', recommendedClubs: 'Најдобри клубови за овој звук',
    upcomingEvents: 'Следни настани', faqTitle: 'Чести прашања',
    otherZones: 'Сите 14 зони во Милано', otherGenres: 'Сите 10 музички жанрови',
    bookVipCta: 'Резервирај VIP маса на WhatsApp', metroLabel: 'Метро и превоз', priceRangeLabel: 'VIP маси и листи',
    dressCodeLabel: 'Дрес-код', verifiedBadge: 'Потврден Консиерж · Ное 2026',
    verifiedBody: 'Цени за 2026/2027, метро линии и правила за влез проверени без провизија.',
    quickAnswerTitle: 'Брз одговор · Преглед', directDeskLabel: 'WhatsApp 24/7 +39 351 912 7047',
    zoneTitleTail: 'Ноќен живот Милано', genreTitleTail: 'Клубови Милано',
    hubZonesBadge: '14 ноќни зони во Милано · 2026/2027', hubZonesH1: 'Ноќните зони на Милано',
    hubZonesLead: 'Споредете Parco Sempione, Corso Como, San Siro, CityLife Portello, Brera и Navigli.',
    hubGenresBadge: '10 музички жанрови · 2026/2027', hubGenresH1: 'Изберете го вашиот звук во Милано',
    hubGenresLead: 'Од House и Afro House до Reggaeton на Corso Como, Techno и Dinner Show вечери.',
    ctaTitle: 'Дали сакате VIP маса или листа за вечерва?',
    ctaDesc: 'Нула провизија, мапа на маси за 10 минути и директен влез во 19 партнерски клубови.',
    zoneHeadings: ['Профил на зоната и публика', 'Метро M1-M5 и ноќен превоз', 'Најдобри клубови и барови', 'VIP цени 2026/2027 и дрес-код', 'Совети за брз влез'],
    genreHeadings: ['Музички стил и атмосфера', 'Водечки клубови и распоред', 'Цени на VIP маси и листи', 'Политика на влез и дрес-код', 'Директна резервација (+39 351 912 7047)'],
    overviewIntro: 'е една од главните ноќни дестинации во Милано за сезоната 2026/2027.', accessIntro: 'Директен пристап преку',
    clubsIntro: 'Неделна акредитација е достапна во:', pricesIntro: 'Официјални цени 2026/2027:',
    tipsIntro: 'Пишете на WhatsApp +39 351 912 7047 пред 19:00 со датум, име и број на гости.',
    faqQ1Prefix: 'Најдобри клубови за', faqQ2Prefix: 'Колку чинат VIP маси за', faqQ3Prefix: 'Дрес-код и време за', faqQ4Prefix: 'Како бесплатно да резервирам',
  },
};

interface ZoneBaseMeta {
  nameEn: string;
  nameIt: string;
  vibeEn: string;
  vibeIt: string;
  metro: string;
  pricesEn: string;
  pricesIt: string;
  dressEn: string;
  dressIt: string;
  topClubs: string[];
}

const ZONES_BASE: Record<string, ZoneBaseMeta> = {
  brera: {
    nameEn: 'Brera', nameIt: 'Brera', vibeEn: 'Luxury & Fashion', vibeIt: 'Lusso & Alta Moda',
    metro: 'M2 Lanza · M2 Moscova · M3 Montenapoleone',
    pricesEn: 'Aperitivo €20-€30 · Cocktails €18-€25 · Nearby VIP tables €300-€800',
    pricesIt: 'Aperitivo €20-€30 · Cocktail €18-€25 · Tavoli VIP vicini €300-€800',
    dressEn: 'Smart Elegance & Tailored Chic', dressIt: 'Eleganza Ricercata & Tailored Chic',
    topClubs: ['Just Me Milano (10 min walk)', 'The Club Milano', 'Pineta Milano', 'Terrazza Duomo 21'],
  },
  navigli: {
    nameEn: 'Navigli', nameIt: 'Navigli & Darsena', vibeEn: 'Bohemian Canals & Underground', vibeIt: 'Canali Bohemien & Club Underground',
    metro: 'M2 Porta Genova FS · M4 Vetra · Tram 2/3/9',
    pricesEn: 'Aperitivo €15-€25 · Guest list €20-€25 · VIP tables €200-€450',
    pricesIt: 'Aperitivo €15-€25 · Lista €20-€25 · Tavoli VIP €200-€450',
    dressEn: 'Creative Urban & Smart Casual', dressIt: 'Urban Creativo & Smart Casual',
    topClubs: ['Volt Club Milano', 'Magazzini Generali (nearby)', 'Santeria Toscana 31'],
  },
  'corso-como': {
    nameEn: 'Corso Como', nameIt: 'Corso Como & Garibaldi', vibeEn: 'Glamorous Flagship Club Strip', vibeIt: 'Cuore Glamour della Movida',
    metro: 'M2/M5 Garibaldi FS · M5 Monumentale · M5 Cenisio',
    pricesEn: 'Singing Aperitivo €20-€25 · Guest list €20-€30 · VIP tables €250-€1,200',
    pricesIt: 'Aperitivo Cantato €20-€25 · Lista €20-€30 · Tavoli VIP €250-€1.200',
    dressEn: 'Fashion-Forward & Total Black Glamour', dressIt: 'Glamour Contemporaneo & Total Black',
    topClubs: ['Pineta Milano', 'Repvblic Milano', 'Hollywood Rythmoteque', 'Tocqueville 13', 'The Club Milano'],
  },
  isola: {
    nameEn: 'Isola', nameIt: 'Isola & Porta Nuova', vibeEn: 'Skyline Cocktails & Indie Art', vibeIt: 'Skyline Cocktail & Scena Contemporanea',
    metro: 'M5 Isola · M2/M5 Garibaldi FS · M3 Zara',
    pricesEn: 'Aperitivo €20-€25 · Concert entry €18-€30 · VIP tables €250-€600',
    pricesIt: 'Aperitivo €20-€25 · Ingresso Live/Club €18-€30 · Tavoli VIP €250-€600',
    dressEn: 'Design Chic & Contemporary Streetwear', dressIt: 'Design Chic & Streetwear Curato',
    topClubs: ['Alcatraz Milano', 'Voya Rooftop (M5 Portello direct)', 'Pineta Milano (Monumentale)'],
  },
  'porta-venezia': {
    nameEn: 'Porta Venezia', nameIt: 'Porta Venezia', vibeEn: 'Inclusive Arts & Aperitivo', vibeIt: 'Aperitivo Inclusivo & Liberty',
    metro: 'M1 Porta Venezia · M4 Tricolore · Passante S1-S6',
    pricesEn: 'Aperitivo €15-€22 · Guest list €20-€25 · VIP tables €250-€600',
    pricesIt: 'Aperitivo €15-€22 · Lista €20-€25 · Tavoli VIP €250-€600',
    dressEn: 'Expressive Fashion & Avant-Garde Chic', dressIt: 'Moda Espressiva & Chic',
    topClubs: ['Repvblic Milano', 'Tunnel Club', 'Pineta Milano'],
  },
  'arco-della-pace': {
    nameEn: 'Arco della Pace', nameIt: 'Arco della Pace & Sempione', vibeEn: 'Royal Aperitivo & VIP Gardens', vibeIt: 'Royal Aperitivo & Giardini VIP',
    metro: 'M5 Domodossola · M5 Gerusalemme · M2 Lanza · Tram 1/10',
    pricesEn: 'Royal Aperitivo €20-€25 · Graduations €200+ · VIP tables €250-€1,500',
    pricesIt: 'Royal Aperitivo €20-€25 · Lauree €200+ · Tavoli VIP €250-€1.500',
    dressEn: 'Smart Glamour & Cocktail Attire', dressIt: 'Smart Glamour & Abbigliamento Cocktail',
    topClubs: ['Just Me Milano', '55 Milano', 'Old Fashion Milano', 'Il Gattopardo'],
  },
  ripamonti: {
    nameEn: 'Ripamonti & Mecenate', nameIt: 'Ripamonti & Mecenate', vibeEn: 'Warehouse Techno & Live Arenas', vibeIt: 'Warehouse Techno & Grandi Eventi',
    metro: 'M3 Lodi T.I.B.B. · M4 Repetti · Tram 24/27',
    pricesEn: 'Presale tickets €20-€35 · VIP tables €250-€800',
    pricesIt: 'Prevendite €20-€35 · Tavoli VIP €250-€800',
    dressEn: 'Black Clubwear & Festival Sneakers Allowed', dressIt: 'Clubwear Total Black & Sneaker Consentite',
    topClubs: ['Magazzini Generali', 'Fabrique Milano', 'Amnesia Milano'],
  },
  nolo: {
    nameEn: 'NoLo & Centrale', nameIt: 'NoLo & Stazione Centrale', vibeEn: 'Underground Electronic & Arches', vibeIt: 'Elettronica Underground & Archi Ferroviari',
    metro: 'M1 Pasteur / Loreto · M2/M3 Centrale FS',
    pricesEn: 'Club entry €15-€25 · Privé tables €250-€500',
    pricesIt: 'Ingresso Club €15-€25 · Tavoli Privé €250-€500',
    dressEn: 'Relaxed Underground & Dark Minimal', dressIt: 'Underground Minimal & Dark Casual',
    topClubs: ['Tunnel Club Milano', 'Amnesia Milano', 'Repvblic Milano'],
  },
  'porta-romana': {
    nameEn: 'Porta Romana', nameIt: 'Porta Romana', vibeEn: 'Bistros, Gardens & Electronic', vibeIt: 'Bistrot di Tendenza & Elettronica',
    metro: 'M3 Porta Romana · M3 Crocetta · Tram 9',
    pricesEn: 'Aperitivo €18-€25 · Club entry €20-€30 · VIP tables €250-€700',
    pricesIt: 'Aperitivo €18-€25 · Ingresso Club €20-€30 · Tavoli VIP €250-€700',
    dressEn: 'Milanese Chic & Contemporary Clubwear', dressIt: 'Milanese Chic & Clubwear Contemporaneo',
    topClubs: ['Magazzini Generali', 'Plastic Milano', 'Repvblic Milano'],
  },
  lambrate: {
    nameEn: 'Lambrate & Rubattino', nameIt: 'Lambrate & Rubattino', vibeEn: 'Industrial Superclubs & Design', vibeIt: 'Superclub Industriali & Design District',
    metro: 'M2 Lambrate FS · M4 Forlanini · Bus 54/75',
    pricesEn: 'Presale €20-€35 · VIP Stage Tables €300-€1,000',
    pricesIt: 'Prevendita €20-€35 · Tavoli Privé Console €300-€1.000',
    dressEn: 'Underground Techno Attire', dressIt: 'Stile Techno Underground',
    topClubs: ['Amnesia Milano', 'Fabrique Milano'],
  },
  'parco-sempione': {
    nameEn: 'Parco Sempione', nameIt: 'Parco Sempione & Torre Branca', vibeEn: 'Milan #1 Luxury 7/7 Sanctuary', vibeIt: 'Santuario Lusso #1 di Milano 7/7',
    metro: 'M1/M2 Cadorna FN · M2 Lanza · M5 Domodossola',
    pricesEn: 'Royal Aperitivo €20-€25 · Guest list €25-€35 · VIP tables €350-€5,000+',
    pricesIt: 'Royal Aperitivo €20-€25 · Lista €25-€35 · Tavoli VIP €350-€5.000+',
    dressEn: 'Strictly Elegant / Smart Glamour (Zero Sportswear)', dressIt: 'Rigorosamente Elegante / Smart Glamour',
    topClubs: ['Just Me Milano (Open 7/7)', '55 Milano', 'Old Fashion Milano', 'Il Gattopardo'],
  },
  'duomo-san-babila': {
    nameEn: 'Duomo & San Babila', nameIt: 'Duomo & San Babila (M4 Linate)', vibeEn: 'Cathedral Rooftops & 12-Min Linate Link', vibeIt: 'Terrazze sul Duomo & Diretta M4 Linate',
    metro: 'M1/M3 Duomo · M1/M4 San Babila (12 min from Linate)',
    pricesEn: 'Panoramic Aperitivo €25-€35 · VIP Lounge Tables €300-€900',
    pricesIt: 'Aperitivo Panoramico €25-€35 · Tavoli Lounge €300-€900',
    dressEn: 'Luxury Formal & Fashion Week Elegance', dressIt: 'Eleganza Formale & Fashion Week',
    topClubs: ['Terrazza Duomo 21', 'Just Me Milano (10 min M1 Cadorna)', 'Repvblic Milano'],
  },
  'citylife-portello': {
    nameEn: 'CityLife & Portello', nameIt: 'CityLife & Portello (20° Piano)', vibeEn: '20th-Floor Skyline Penthouse & Towers', vibeIt: 'Sky Lounge al 20° Piano & Tre Torri',
    metro: 'M5 Portello · M5 Tre Torri · M1/M5 Lotto',
    pricesEn: 'Sunset Aperitivo €25-€30 · Panoramic VIP tables €300-€1,200',
    pricesIt: 'Aperitivo al Tramonto €25-€30 · Tavoli Panoramici €300-€1.200',
    dressEn: 'Executive Chic & High-Fashion Cocktail', dressIt: 'Executive Chic & Cocktail Alta Moda',
    topClubs: ['Voya Rooftop Milan (20th Floor)', '55 Milano', 'Just Me Milano'],
  },
  'san-siro': {
    nameEn: 'San Siro & Ippodromo', nameIt: 'San Siro & Ippodromo (Post-Partita)', vibeEn: 'Stadium & Concert Afterparty Capital', vibeIt: 'Capitale Dopo-Partita e Dopo-Concerto',
    metro: 'M5 San Siro Ippodromo · M5 San Siro Stadio · Tram 16',
    pricesEn: 'Post-Match Entry €20-€30 · Garden/Arena VIP tables €300-€1,500',
    pricesIt: 'Ingresso Post-Partita €20-€30 · Tavoli Garden/Arena €300-€1.500',
    dressEn: 'Smart Casual to VIP Chic (Clean Trainers OK Post-Match)', dressIt: 'Smart Casual / Chic (Ok Sneaker Pulite Post-Match)',
    topClubs: ['Aria Club Milano (150m from Stadium)', 'Voya Rooftop (M5 3 stops)', 'Just Me Milano (Open 7/7)'],
  },
};

interface GenreBaseMeta {
  nameEn: string;
  nameIt: string;
  subtitleEn: string;
  subtitleIt: string;
  topClubs: string[];
}

const GENRES_BASE: Record<string, GenreBaseMeta> = {
  techno: {
    nameEn: 'Techno & Underground', nameIt: 'Techno & Underground',
    subtitleEn: 'Warehouse Laser Raves & Hypnotic Peaks', subtitleIt: 'Warehouse Laser & Suoni Ipnotici',
    topClubs: ['Amnesia Milano', 'Volt Club Milano', 'Magazzini Generali', 'Tunnel Club', 'Fabrique Milano'],
  },
  house: {
    nameEn: 'House & Tech-House', nameIt: 'House & Tech-House',
    subtitleEn: 'Vocal House, Grooves & Luxury Dancefloors', subtitleIt: 'Vocal House, Groove & Club di Lusso',
    topClubs: ['Just Me Milano', 'Aria Club Milano', 'Voya Rooftop Milan', '55 Milano', 'The Club Milano'],
  },
  'afro-house': {
    nameEn: 'Afro-House & Tribal', nameIt: 'Afro-House & Melodic Tribal',
    subtitleEn: 'Skyline Sunset Grooves & Organic Percussion', subtitleIt: 'Percussioni Organiche & Tramonti Skyline',
    topClubs: ['Just Me Milano', 'Voya Rooftop Milan', 'Aria Club Milano', 'Il Gattopardo'],
  },
  'hip-hop': {
    nameEn: 'Hip-Hop, Trap & R&B', nameIt: 'Hip-Hop, Trap & Afrobeats',
    subtitleEn: 'Dirty Monday Icons & Urban Privés', subtitleIt: 'Serate Dirty Monday & Privé Urban',
    topClubs: ['Repvblic Milano (Dirty Monday)', 'Tocqueville 13', 'The Club Milano', 'Hollywood Rythmoteque'],
  },
  reggaeton: {
    nameEn: 'Reggaeton & Urban Latin', nameIt: 'Reggaeton & Urban Latin',
    subtitleEn: 'High-Energy Latin Fiesta & Perreo', subtitleIt: 'Fiesta Latina & Noche de Perreo',
    topClubs: ['Pineta Milano', 'Tocqueville 13', 'Aria Club Milano', 'Loolapaloosa', 'Alcatraz Milano'],
  },
  commercial: {
    nameEn: 'Commercial & Party Hits', nameIt: 'Commerciale & Hit Cantate',
    subtitleEn: 'Sing-Along Anthems & International Crowds', subtitleIt: 'Grandi Successi da Cantare & Pubblico Internazionale',
    topClubs: ['Just Me Milano', 'Pineta Milano', 'Hollywood Rythmoteque', 'Loolapaloosa', 'Old Fashion'],
  },
  'dinner-show': {
    nameEn: 'Dinner Show & Singing Aperitivo', nameIt: 'Dinner Show & Aperitivo Cantato',
    subtitleEn: 'Live Performers, Italian Classics & Table Shows', subtitleIt: 'Cene Spettacolo, Cantato Italiano & Show ai Tavoli',
    topClubs: ['Pineta Milano', '55 Milano', 'Just Me Milano', 'Il Gattopardo', 'Voya Rooftop Milan'],
  },
  edm: {
    nameEn: 'EDM & Mainstage', nameIt: 'EDM & Big Room Mainstage',
    subtitleEn: 'Festival Anthems & Mega Production Arenas', subtitleIt: 'Grandi Arene Festival & Produzioni Audio-Luci',
    topClubs: ['Fabrique Milano', 'Alcatraz Milano', 'Magazzini Generali', 'Just Me Milano'],
  },
  'live-music': {
    nameEn: 'Live Music & Concert Afterparties', nameIt: 'Musica Dal Vivo & Dopo-Concerto',
    subtitleEn: 'Band Sets, Stadium Pre/Post-Show Clubs', subtitleIt: 'Live Band, Afterparty Stadio San Siro & Forum',
    topClubs: ['Aria Club Milano (San Siro)', 'Alcatraz Milano', 'Fabrique Milano', 'Just Me Milano (7/7)'],
  },
  indie: {
    nameEn: 'Indie, Alternative & Synth', nameIt: 'Indie, Alternative & Elettronica',
    subtitleEn: 'Curated Cultural Spaces & Leftfield Selectors', subtitleIt: 'Spazi Culturali, Sintetizzatori & Club Alternativi',
    topClubs: ['Tunnel Club Milano', 'Santeria Toscana 31', 'Magazzini Generali', 'Alcatraz Milano'],
  },
};

function getPack(locale: LocaleCode): LangPack35 {
  if (locale === 'en' || locale === 'it') return PACKS[locale];
  const s = OTHER_SEEDS[locale];
  return {
    city: s.city,
    home: s.home,
    zonesHub: s.zonesHub,
    genresHub: s.genresHub,
    tocTitle: s.tocTitle,
    clubsInZone: s.clubsInZone,
    recommendedClubs: s.recommendedClubs,
    upcomingEvents: s.upcomingEvents,
    faqTitle: s.faqTitle,
    otherZones: s.otherZones,
    otherGenres: s.otherGenres,
    bookVipCta: s.bookVipCta,
    metroLabel: s.metroLabel,
    priceRangeLabel: s.priceRangeLabel,
    dressCodeLabel: s.dressCodeLabel,
    verifiedBadge: s.verifiedBadge,
    verifiedBody: s.verifiedBody,
    quickAnswerTitle: s.quickAnswerTitle,
    directDeskLabel: s.directDeskLabel,
    zoneTitleFmt: (z) => clampMetaTitle(`${z} ${s.zoneTitleTail} 2026 | Nightlife Milan`, `${z} ${s.city} | Nightlife Milan`),
    zoneDescFmt: (z, m) => clampMetaDesc(`${z} (${s.city} 2026/2027): ${m}. ${s.priceRangeLabel} €250+. WhatsApp +39 351 912 7047.`),
    genreTitleFmt: (g) => clampMetaTitle(`${g} ${s.genreTitleTail} 2026 | Nightlife Milan`, `${g} ${s.city} | Nightlife Milan`),
    genreDescFmt: (g) => clampMetaDesc(`${g} (${s.city} 2026/2027): ${s.recommendedClubs}, ${s.priceRangeLabel} €250+. WhatsApp +39 351 912 7047.`),
    zoneHeadings: s.zoneHeadings,
    genreHeadings: s.genreHeadings,
    hubZonesBadge: s.hubZonesBadge,
    hubZonesH1: s.hubZonesH1,
    hubZonesLead: s.hubZonesLead,
    hubZonesQuick: `${s.hubZonesLead} WhatsApp +39 351 912 7047.`,
    hubGenresBadge: s.hubGenresBadge,
    hubGenresH1: s.hubGenresH1,
    hubGenresLead: s.hubGenresLead,
    hubGenresQuick: `${s.hubGenresLead} WhatsApp +39 351 912 7047.`,
    ctaTitle: s.ctaTitle,
    ctaDesc: s.ctaDesc,
    secOverview: (n, v, m, c) => [`${n} (${v}) ${s.overviewIntro}`, `${s.accessIntro} ${m}. ${s.clubsIntro} ${c}.`],
    secAccess: (n, m) => [`${n} - ${s.accessIntro} ${m} (M1/M2/M3/M4 Linate/M5 San Siro) & NM1-NM3 (00:30-05:30).`, `${s.tipsIntro}`],
    secClubs: (n, c) => [`${n}: ${s.clubsIntro} ${c}.`],
    secPrices: (n, p, d) => [`${n} - ${s.pricesIntro} ${p}.`, `${s.dressCodeLabel}: ${d}.`],
    secTips: (n) => [`${n}: ${s.tipsIntro}`],
    genreSecSound: (n, c) => [`${n} (${s.city} 2026/2027): ${s.clubsIntro} ${c}.`],
    genreSecVenues: (n, c) => [`${n} - ${s.recommendedClubs}: ${c}.`],
    genreSecPricing: (n) => [`${n} - ${s.pricesIntro} Guest list €20-€30, VIP €250-€1,500 (100% spendable).`],
    genreSecDoor: (n) => [`${n} - ${s.dressCodeLabel}: smart glamour / total black (Just Me, Pineta, Aria, Voya, Volt, Amnesia).`],
    genreSecTips: (n) => [`${n}: ${s.tipsIntro}`],
    faqPairs: (_k, n, m, c) => [
      { question: `${s.faqQ1Prefix} ${n} (${s.city})?`, answer: `${c}. WhatsApp +39 351 912 7047.` },
      { question: `${s.faqQ2Prefix} ${n}?`, answer: `Guest list €20-€30; VIP €250-€1,500 (100% bottles). ${s.verifiedBody}` },
      { question: `${s.faqQ3Prefix} ${n}?`, answer: `${m} · 23:30-05:00. ${s.tipsIntro}` },
      { question: `${s.faqQ4Prefix} ${n}?`, answer: `${s.tipsIntro}` },
    ],
  };
}

export function getZoneLocalized35(zoneSlug: string, locale: LocaleCode): ZoneLocalized35 {
  const normSlug = zoneSlug in ZONES_BASE ? zoneSlug : 'brera';
  const base = ZONES_BASE[normSlug];
  const pack = getPack(locale);
  const name = locale === 'it' ? base.nameIt : base.nameEn;
  const vibe = locale === 'it' ? base.vibeIt : base.vibeEn;
  const prices = locale === 'it' ? base.pricesIt : base.pricesEn;
  const dress = locale === 'it' ? base.dressIt : base.dressEn;
  const clubsText = base.topClubs.join(', ');
  const ids = ['zone-overview', 'zone-metro-access', 'zone-top-clubs', 'zone-prices-dress', 'zone-concierge-tips'];

  const sections: LocalizedChapter35[] = [
    {
      id: ids[0],
      heading: `1. ${pack.zoneHeadings[0]}`,
      paragraphs: pack.secOverview(name, vibe, base.metro, clubsText),
    },
    {
      id: ids[1],
      heading: `2. ${pack.zoneHeadings[1]}`,
      paragraphs: pack.secAccess(name, base.metro),
      bullets: [`Metro: ${base.metro}`, 'Night Bus ATM: NM1, NM2, NM3, N25/N26 (00:30-05:30)', 'Concierge Drop-off: Direct VIP Taxi & Chauffeur Zone'],
    },
    {
      id: ids[2],
      heading: `3. ${pack.zoneHeadings[2]}`,
      paragraphs: pack.secClubs(name, clubsText),
      bullets: base.topClubs.map((c) => `${c} · WhatsApp +39 351 912 7047`),
    },
    {
      id: ids[3],
      heading: `4. ${pack.zoneHeadings[3]}`,
      paragraphs: pack.secPrices(name, prices, dress),
    },
    {
      id: ids[4],
      heading: `5. ${pack.zoneHeadings[4]}`,
      paragraphs: pack.secTips(name),
    },
  ];

  const lead = locale === 'it'
    ? `${name} (${vibe}): guida 2026/2027 a discoteche, lounge, collegamenti ${base.metro} e prenotazione tavoli VIP senza costi di agenzia.`
    : pack.secOverview(name, vibe, base.metro, clubsText)[0];

  return {
    slug: normSlug,
    name,
    vibe,
    lead,
    seoTitle: pack.zoneTitleFmt(name),
    seoDescription: pack.zoneDescFmt(name, base.metro),
    metro: base.metro,
    priceRange: prices,
    dressCode: dress,
    topClubs: base.topClubs,
    sections,
    faqs: pack.faqPairs('zone', name, base.metro, clubsText),
    ui: {
      home: pack.home,
      zonesHub: pack.zonesHub,
      tocTitle: pack.tocTitle,
      clubsInZone: pack.clubsInZone,
      upcomingEvents: pack.upcomingEvents,
      faqTitle: pack.faqTitle,
      otherZones: pack.otherZones,
      bookVipCta: pack.bookVipCta,
      metroLabel: pack.metroLabel,
      priceRangeLabel: pack.priceRangeLabel,
      dressCodeLabel: pack.dressCodeLabel,
      verifiedBadge: pack.verifiedBadge,
      verifiedBody: pack.verifiedBody,
      quickAnswerTitle: pack.quickAnswerTitle,
      directDeskLabel: pack.directDeskLabel,
    },
  };
}

export function getGenreLocalized35(genreSlug: string, locale: LocaleCode): GenreLocalized35 {
  const normSlug = genreSlug in GENRES_BASE ? genreSlug : 'house';
  const base = GENRES_BASE[normSlug];
  const pack = getPack(locale);
  const name = locale === 'it' ? base.nameIt : base.nameEn;
  const subtitle = locale === 'it' ? base.subtitleIt : base.subtitleEn;
  const clubsText = base.topClubs.join(', ');
  const ids = ['genre-sound', 'genre-top-venues', 'genre-pricing-vip', 'genre-door-policy', 'genre-concierge-tips'];

  const sections: LocalizedChapter35[] = [
    {
      id: ids[0],
      heading: `1. ${pack.genreHeadings[0]}`,
      paragraphs: pack.genreSecSound(name, clubsText),
    },
    {
      id: ids[1],
      heading: `2. ${pack.genreHeadings[1]}`,
      paragraphs: pack.genreSecVenues(name, clubsText),
      bullets: base.topClubs.map((c) => `${c} · WhatsApp +39 351 912 7047`),
    },
    {
      id: ids[2],
      heading: `3. ${pack.genreHeadings[2]}`,
      paragraphs: pack.genreSecPricing(name),
    },
    {
      id: ids[3],
      heading: `4. ${pack.genreHeadings[3]}`,
      paragraphs: pack.genreSecDoor(name),
    },
    {
      id: ids[4],
      heading: `5. ${pack.genreHeadings[4]}`,
      paragraphs: pack.genreSecTips(name),
    },
  ];

  const h1 = locale === 'it'
    ? `Discoteche ${name} a Milano`
    : locale === 'en'
      ? `${name} Clubs in Milan`
      : `${name} (${pack.city})`;

  const lead = pack.genreSecSound(name, clubsText)[0];

  return {
    slug: normSlug,
    name,
    h1,
    subtitle,
    lead,
    seoTitle: pack.genreTitleFmt(name),
    seoDescription: pack.genreDescFmt(name),
    topClubs: base.topClubs,
    sections,
    faqs: pack.faqPairs('genre', name, subtitle, clubsText),
    ui: {
      home: pack.home,
      genresHub: pack.genresHub,
      tocTitle: pack.tocTitle,
      recommendedClubs: pack.recommendedClubs,
      upcomingEvents: pack.upcomingEvents,
      faqTitle: pack.faqTitle,
      otherGenres: pack.otherGenres,
      bookVipCta: pack.bookVipCta,
      verifiedBadge: pack.verifiedBadge,
      verifiedBody: pack.verifiedBody,
      quickAnswerTitle: pack.quickAnswerTitle,
      directDeskLabel: pack.directDeskLabel,
    },
  };
}

export function getTaxonomyHubUi35(kind: 'zones' | 'genres', locale: LocaleCode): TaxonomyHubUi35 {
  const pack = getPack(locale);
  const isZones = kind === 'zones';

  if (isZones) {
    const tocItems = [
      { id: 'choose-zone', title: pack.zoneHeadings[0] },
      { id: 'all-districts', title: pack.otherZones },
      { id: 'metro-commute', title: pack.zoneHeadings[1] },
      { id: 'vip-pricing-overview', title: pack.zoneHeadings[3] },
      { id: 'zones-faq', title: pack.faqTitle },
    ];
    const sections: LocalizedChapter35[] = [
      {
        id: 'vip-pricing-overview',
        heading: `4. ${pack.zoneHeadings[3]}`,
        paragraphs: pack.secPrices(pack.city, 'Aperitivo €20-€30 · Guest list €20-€35 · VIP €250-€1,500', 'Smart glamour / total black'),
      },
      {
        id: 'concierge-zone-tips',
        heading: `5. ${pack.zoneHeadings[4]}`,
        paragraphs: pack.secTips(pack.city),
      },
    ];
    return {
      home: pack.home,
      crumbLabel: pack.zonesHub,
      badge: pack.hubZonesBadge,
      h1: pack.hubZonesH1,
      lead: pack.hubZonesLead,
      quickAnswerTitle: pack.quickAnswerTitle,
      quickAnswerBody: pack.hubZonesQuick,
      tocTitle: pack.tocTitle,
      tocItems,
      featuredHeading: pack.zoneHeadings[0],
      allItemsHeading: pack.otherZones,
      editorialHeading: pack.zoneHeadings[2],
      sections,
      faqTitle: pack.faqTitle,
      faqs: pack.faqPairs('zone', pack.city, 'M1/M2/M3/M4/M5', 'Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic'),
      ctaTitle: pack.ctaTitle,
      ctaDesc: pack.ctaDesc,
      ctaBtn: pack.bookVipCta,
      cardCountLabel: '14',
    };
  }

  const tocItems = [
    { id: 'genres-overview', title: pack.genreHeadings[0] },
    { id: 'all-genres-grid', title: pack.otherGenres },
    { id: 'weekly-sound-calendar', title: pack.genreHeadings[1] },
    { id: 'genre-pricing-rules', title: pack.genreHeadings[2] },
    { id: 'genres-faq', title: pack.faqTitle },
  ];
  const sections: LocalizedChapter35[] = [
    {
      id: 'genre-pricing-rules',
      heading: pack.genreHeadings[2],
      paragraphs: pack.genreSecPricing(pack.city),
    },
    {
      id: 'genre-door-rules',
      heading: pack.genreHeadings[3],
      paragraphs: pack.genreSecDoor(pack.city),
    },
  ];
  return {
    home: pack.home,
    crumbLabel: pack.genresHub,
    badge: pack.hubGenresBadge,
    h1: pack.hubGenresH1,
    lead: pack.hubGenresLead,
    quickAnswerTitle: pack.quickAnswerTitle,
    quickAnswerBody: pack.hubGenresQuick,
    tocTitle: pack.tocTitle,
    tocItems,
    featuredHeading: pack.genreHeadings[0],
    allItemsHeading: pack.otherGenres,
    editorialHeading: pack.genreHeadings[1],
    sections,
    faqTitle: pack.faqTitle,
    faqs: pack.faqPairs('genre', pack.city, 'House, Afro House, Reggaeton, Techno, Hip-Hop', 'Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic, Volt, Amnesia'),
    ctaTitle: pack.ctaTitle,
    ctaDesc: pack.ctaDesc,
    ctaBtn: pack.bookVipCta,
    cardCountLabel: '10',
  };
}

export function getSupported35LocalesCount(): number {
  return ALL_35_LOCALES.length;
}
