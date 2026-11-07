import { getLocalizedSeoPagePath35 } from '@/lib/i18n/localizedSlugs35';
import type { LocaleCode } from '@/lib/i18n/locales';
import type { LocaleCode } from './i18n/locales';
import { isEnabledLocale } from './i18n/locales';
import { OCTOBER_EVENTS } from './octoberEvents';
import { getOctoberEventSlug } from './october-events/copy';
import { weeklyEvents } from './eventsConfig';
import { CAPODANNO_EVENTS } from './capodannoEvents';
import type { CarouselEventCard } from './venueDossiers35';

export interface VerticalHubUi35 {
  eyebrow: string;
  mainTitle: string;
  mainSubtitle: string;
  tabOccasions: string;
  tabFairs: string;
  tabHolidays: string;
  tabBlueprints: string;
  suggestedEventsTitle: string;
  suggestedEventsSubtitle: string;
  bookWhatsApp: string;
  exploreGuide: string;
  venuesLabel: string;
  priceLabel: string;
  logisticsLabel: string;
}

const HUB_UI_EN: VerticalHubUi35 = {
  eyebrow: 'Nightlife Milan 360° MILAN NIGHTLIFE & HOSPITALITY ECOSYSTEM',
  mainTitle: 'Year-Round Celebrations, Trade Fairs, Major Holidays & Concierge Guides',
  mainSubtitle:
    'Complete vertical dossiers, official calendars, turnkey packages, and auto-updated event suggestions across all 26 Milan venues.',
  tabOccasions: 'Year-Round Occasions & Parties',
  tabFairs: 'Milan Trade Fairs & Fashion/Design Weeks',
  tabHolidays: 'Major Holidays & Seasonal Galas',
  tabBlueprints: 'CRO, UX/UI & Concierge Service Standards',
  suggestedEventsTitle: 'Suggested Events & Automatic Upcoming Calendar',
  suggestedEventsSubtitle:
    'Live events, weekly flagship formats, and seasonal galas automatically matched to this vertical.',
  bookWhatsApp: 'WhatsApp Quote (+39 351 912 7047)',
  exploreGuide: 'Open Vertical Page',
  venuesLabel: 'Recommended Venues',
  priceLabel: 'Packages & Rates',
  logisticsLabel: 'Timing, Metro & Formula',
};

const HUB_UI_OVERRIDES: Partial<Record<LocaleCode, Partial<VerticalHubUi35>>> = {
  it: {
    eyebrow: 'ECOSISTEMA COMPLETO EVENTI, FIERE, FESTE & LOCALI NIGHTLIFE MILAN',
    mainTitle: 'Tutte le Evenienze dell’Anno, le Fiere Internazionali, le Feste Comandate e le Guide',
    mainSubtitle:
      'Sezioni verticali complete con schede dedicate, pacchetti chiavi in mano dal Concierge Ufficiale Nightlife Milan ed eventi suggeriti autoaggiornati.',
    tabOccasions: 'Evenienze Tutto l’Anno & Feste Private',
    tabFairs: 'Fiere di Milano, Fashion & Design Week',
    tabHolidays: 'Feste Comandate & Ricorrenze',
    tabBlueprints: 'Standard CRO, UX/UI, Copy & Nightlife Milan Concierge',
    suggestedEventsTitle: 'Eventi Suggeriti e Prossime Date in Automatico',
    suggestedEventsSubtitle:
      'Eventi in programma, serate settimanali proposte dal Concierge Nightlife Milan e date future aggiornate automaticamente su template.',
    bookWhatsApp: 'Preventivo WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Apri Pagina Verticale',
    venuesLabel: 'Locali Consigliati',
    priceLabel: 'Formule e Prezzi Reali',
    logisticsLabel: 'Orari, Metro e Logistica',
  },
  es: {
    mainTitle: 'Celebraciones Todo el Año, Ferias de Milán, Festivos y Guías Concierge',
    tabOccasions: 'Celebraciones y Fiestas Privadas',
    tabFairs: 'Ferias, Fashion Week y Salone del Mobile',
    tabHolidays: 'Festivos, Nochevieja y Halloween',
    suggestedEventsTitle: 'Eventos Sugeridos y Próximas Fechas Automáticas',
    bookWhatsApp: 'Presupuesto WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Abrir Página Vertical',
  },
  fr: {
    mainTitle: 'Fêtes Toute l’Année, Salons de Milan, Jours Fériés & Guides Concierge',
    tabOccasions: 'Occasions & Fêtes Privées',
    tabFairs: 'Salons, Fashion Week & Design Week',
    tabHolidays: 'Fêtes, Nouvel An & Halloween',
    suggestedEventsTitle: 'Soirées Suggérées & Calendrier Automatique',
    bookWhatsApp: 'Devis WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Ouvrir la Page Verticale',
  },
  de: {
    mainTitle: 'Feiern das ganze Jahr, Mailänder Messen, Feiertage & Concierge-Guides',
    tabOccasions: 'Private Feiern & Anlässe',
    tabFairs: 'Messen, Fashion Week & Design Week',
    tabHolidays: 'Feiertage, Silvester & Halloween',
    suggestedEventsTitle: 'Empfohlene Events & Automatischer Kalender',
    bookWhatsApp: 'WhatsApp-Angebot (+39 351 912 7047)',
    exploreGuide: 'Vertikale Seite öffnen',
  },
  pt: {
    mainTitle: 'Festas Todo o Ano, Feiras de Milão, Feriados e Guias Concierge',
    tabOccasions: 'Ocasiões e Festas Privadas',
    tabFairs: 'Feiras, Fashion Week e Salone del Mobile',
    tabHolidays: 'Feriados, Réveillon e Halloween',
    suggestedEventsTitle: 'Eventos Sugeridos e Calendário Automático',
    bookWhatsApp: 'Orçamento WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Abrir Página Vertical',
  },
  nl: {
    mainTitle: 'Feesten het Hele Jaar, Beurzen in Milaan, Feestdagen & Concierge Gidsen',
    tabOccasions: 'Gelegenheden & Privéfeesten',
    tabFairs: 'Beurzen, Fashion Week & Design Week',
    tabHolidays: 'Feestdagen, Oud & Nieuw & Halloween',
    suggestedEventsTitle: 'Aanbevolen Events & Automatische Kalender',
    bookWhatsApp: 'WhatsApp Offerte (+39 351 912 7047)',
    exploreGuide: 'Open Verticale Pagina',
  },
  ru: {
    mainTitle: 'Праздники круглый год, выставки Милана, торжества и гиды консьержа',
    tabOccasions: 'Частные вечеринки и события',
    tabFairs: 'Выставки, Неделя моды и дизайна',
    tabHolidays: 'Праздники, Новый год и Хэллоуин',
    suggestedEventsTitle: 'Рекомендуемые события и авто-календарь',
    bookWhatsApp: 'Расчёт в WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Открыть раздел',
  },
  tr: {
    mainTitle: 'Yıl Boyu Kutlamalar, Milano Fuarları, Resmi Tatiller ve Concierge Rehberleri',
    tabOccasions: 'Özel Partiler ve Kutlamalar',
    tabFairs: 'Milano Fuarları, Moda ve Tasarım Haftası',
    tabHolidays: 'Yılbaşı, Cadılar Bayramı ve Tatiller',
    suggestedEventsTitle: 'Önerilen Etkinlikler ve Otomatik Takvim',
    bookWhatsApp: 'WhatsApp Teklifi (+39 351 912 7047)',
    exploreGuide: 'Sayfayı Aç',
  },
  ar: {
    mainTitle: 'المناسبات طوال العام، معارض ميلانو، العطلات الرسمية وأدلة الكونسيرج',
    tabOccasions: 'المناسبات والحفلات الخاصة',
    tabFairs: 'معارض ميلانو وأسبوع الموضة والتصميم',
    tabHolidays: 'العطلات، رأس السنة وهالوين',
    suggestedEventsTitle: 'الفعاليات المقترحة والتقويم التلقائي',
    bookWhatsApp: 'عرض سعر واتساب (+39 351 912 7047)',
    exploreGuide: 'افتح الصفحة المخصصة',
  },
  zh: {
    mainTitle: '全年庆典、米兰国际展会、重大节日与礼宾指南',
    tabOccasions: '全年私人派对与庆典',
    tabFairs: '米兰展会、时装周与设计周',
    tabHolidays: '跨年、万圣节与重大节日',
    suggestedEventsTitle: '推荐活动与自动更新日历',
    bookWhatsApp: 'WhatsApp 报价 (+39 351 912 7047)',
    exploreGuide: '打开专题页面',
  },
  bg: {
    tabOccasions: 'Частни партита и поводи',
    tabFairs: 'Панаири, Седмица на модата и дизайна',
    tabHolidays: 'Празници, Нова година и Хелоуин',
    bookWhatsApp: 'Оферта в WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Отвори страницата',
  },
  hr: {
    tabOccasions: 'Privatne zabave i prigode',
    tabFairs: 'Sajmovi, Tjedan mode i dizajna',
    tabHolidays: 'Praznici, Nova godina i Halloween',
    bookWhatsApp: 'WhatsApp ponuda (+39 351 912 7047)',
    exploreGuide: 'Otvori stranicu',
  },
  cs: {
    tabOccasions: 'Soukromé oslavy a příležitosti',
    tabFairs: 'Veletrhy, Týden módy a designu',
    tabHolidays: 'Svátky, Silvestr a Halloween',
    bookWhatsApp: 'Nabídka přes WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Otevřít stránku',
  },
  da: {
    tabOccasions: 'Private fester og anledninger',
    tabFairs: 'Messer, Fashion Week & Design Week',
    tabHolidays: 'Helligdage, Nytår & Halloween',
    bookWhatsApp: 'WhatsApp-tilbud (+39 351 912 7047)',
    exploreGuide: 'Åbn side',
  },
  et: {
    tabOccasions: 'Erapidu ja tähtpäevad',
    tabFairs: 'Messid, moe- ja disaininädal',
    tabHolidays: 'Pühad, aastavahetus ja Halloween',
    bookWhatsApp: 'WhatsAppi pakkumine (+39 351 912 7047)',
    exploreGuide: 'Ava lehekülg',
  },
  fi: {
    tabOccasions: 'Yksityisjuhlat ja tilaisuudet',
    tabFairs: 'Messut, muoti- ja designviikko',
    tabHolidays: 'Juhlapyhät, uusivuosi ja Halloween',
    bookWhatsApp: 'WhatsApp-tarjous (+39 351 912 7047)',
    exploreGuide: 'Avaa sivu',
  },
  el: {
    tabOccasions: 'Ιδιωτικά πάρτι & περιστάσεις',
    tabFairs: 'Εκθέσεις, Εβδομάδα Μόδας & Design',
    tabHolidays: 'Γιορτές, Πρωτοχρονιά & Halloween',
    bookWhatsApp: 'Προσφορά WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Άνοιγμα σελίδας',
  },
  hu: {
    tabOccasions: 'Privát bulik és alkalmak',
    tabFairs: 'Vásárok, Divat- és Designhét',
    tabHolidays: 'Ünnepek, Szilveszter és Halloween',
    bookWhatsApp: 'WhatsApp ajánlat (+39 351 912 7047)',
    exploreGuide: 'Oldal megnyitása',
  },
  ga: {
    tabOccasions: 'Cóisirí Príobháideacha & Ócáidí',
    tabFairs: 'Aonaigh, Seachtain Faisin & Dearaidh',
    tabHolidays: 'Laethanta Saoire & Oíche Chinn Bliana',
    bookWhatsApp: 'Meastachán WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Oscail Leathanach',
  },
  lv: {
    tabOccasions: 'Privātas ballītes un svinības',
    tabFairs: 'Izstādes, modes un dizaina nedēļa',
    tabHolidays: 'Svētki, Jaunais gads un Helovīns',
    bookWhatsApp: 'WhatsApp piedāvājums (+39 351 912 7047)',
    exploreGuide: 'Atvērt lapu',
  },
  lt: {
    tabOccasions: 'Privatūs vakarėliai ir progos',
    tabFairs: 'Parodos, mados ir dizaino savaitė',
    tabHolidays: 'Šventės, Naujieji metai ir Helovinas',
    bookWhatsApp: 'WhatsApp pasiūlymas (+39 351 912 7047)',
    exploreGuide: 'Atidaryti puslapį',
  },
  mt: {
    tabOccasions: 'Festini Privati u Okkażjonijiet',
    tabFairs: 'Fieri, Fashion Week u Design Week',
    tabHolidays: 'Festi, l-Ewwel tas-Sena u Halloween',
    bookWhatsApp: 'Kwotazzjoni WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Iftaħ il-Paġna',
  },
  pl: {
    tabOccasions: 'Imprezy prywatne i okazje',
    tabFairs: 'Targi, Tydzień Mody i Designu',
    tabHolidays: 'Święta, Sylwester i Halloween',
    bookWhatsApp: 'Wycena WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Otwórz stronę',
  },
  ro: {
    tabOccasions: 'Petreceri private și ocazii',
    tabFairs: 'Târguri, Săptămâna Modei și Designului',
    tabHolidays: 'Sărbători, Revelion și Halloween',
    bookWhatsApp: 'Ofertă WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Deschide pagina',
  },
  sk: {
    tabOccasions: 'Súkromné oslavy a príležitosti',
    tabFairs: 'Veľtrhy, Týždeň módy a dizajnu',
    tabHolidays: 'Sviatky, Silvester a Halloween',
    bookWhatsApp: 'Ponuka cez WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Otvoriť stránku',
  },
  sl: {
    tabOccasions: 'Zasebne zabave in priložnosti',
    tabFairs: 'Sejmi, Teden mode in oblikovanja',
    tabHolidays: 'Prazniki, Silvestrovo in Noč čarovnic',
    bookWhatsApp: 'WhatsApp ponudba (+39 351 912 7047)',
    exploreGuide: 'Odpri stran',
  },
  sv: {
    tabOccasions: 'Privata fester & högtider',
    tabFairs: 'Mässor, Fashion Week & Design Week',
    tabHolidays: 'Helgdagar, Nyår & Halloween',
    bookWhatsApp: 'WhatsApp-offert (+39 351 912 7047)',
    exploreGuide: 'Öppna sida',
  },
  no: {
    tabOccasions: 'Private fester og anledninger',
    tabFairs: 'Messer, Fashion Week & Design Week',
    tabHolidays: 'Høytider, Nyttårsaften & Halloween',
    bookWhatsApp: 'WhatsApp-tilbud (+39 351 912 7047)',
    exploreGuide: 'Åpne side',
  },
  is: {
    tabOccasions: 'Einkasamkvæmi og tilefni',
    tabFairs: 'Sýningar, tísku- og hönnunarvika',
    tabHolidays: 'Hátíðisdagar, gamlárskvöld og hrekkjavaka',
    bookWhatsApp: 'WhatsApp tilboð (+39 351 912 7047)',
    exploreGuide: 'Opna síðu',
  },
  uk: {
    tabOccasions: 'Приватні вечірки та події',
    tabFairs: 'Виставки, Тиждень моди та дизайну',
    tabHolidays: 'Свята, Новий рік та Гелловін',
    bookWhatsApp: 'Прорахунок у WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Відкрити сторінку',
  },
  sq: {
    tabOccasions: 'Festa Private & Raste Speciale',
    tabFairs: 'Panairet, Java e Modës & Dizajnit',
    tabHolidays: 'Festat, Viti i Ri & Halloween',
    bookWhatsApp: 'Ofertë në WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Hap Faqen',
  },
  sr: {
    tabOccasions: 'Privatne žurke i proslave',
    tabFairs: 'Sajmovi, Nedelja mode i dizajna',
    tabHolidays: 'Praznici, Nova godina i Noć veštica',
    bookWhatsApp: 'WhatsApp ponuda (+39 351 912 7047)',
    exploreGuide: 'Otvori stranicu',
  },
  bs: {
    tabOccasions: 'Privatne zabave i proslave',
    tabFairs: 'Sajmovi, Sedmica mode i dizajna',
    tabHolidays: 'Praznici, Nova godina i Halloween',
    bookWhatsApp: 'WhatsApp ponuda (+39 351 912 7047)',
    exploreGuide: 'Otvori stranicu',
  },
  mk: {
    tabOccasions: 'Приватни забави и прослави',
    tabFairs: 'Саеми, Недела на модата и дизајнот',
    tabHolidays: 'Празници, Нова година и Ноќ на вештерките',
    bookWhatsApp: 'Понуда на WhatsApp (+39 351 912 7047)',
    exploreGuide: 'Отвори страница',
  },
};

export function getVerticalHubUi35(locale: string): VerticalHubUi35 {
  const code: LocaleCode = isEnabledLocale(locale) ? locale : 'en';
  return { ...HUB_UI_EN, ...(HUB_UI_OVERRIDES[code] || {}) };
}

export interface VerticalCardItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceRange: string;
  timingAndLogistics: string;
  recommendedVenues: string[];
  highlights: string[];
  href: string;
  whatsappText: string;
  imageSrc: string;
}

export function getOccasionsCatalog(locale: string): VerticalCardItem[] {
  const isIt = locale === 'it';
  return [
    {
      id: 'occ-lauree',
      badge: isIt ? '7 ATENEI MILANESI · LAUREE' : '7 MILAN UNIVERSITIES · GRADUATIONS',
      title: isIt
        ? 'Feste di Laurea a Milano (Bocconi, Cattolica, Statale, Politecnico, Bicocca, IULM, NABA)'
        : 'Milan Graduation Parties (Bocconi, Cattolica, Statale, Politecnico, Bicocca, IULM, NABA)',
      subtitle: isIt
        ? 'Isola aperitivo riservata per parenti e amici dalle 19:30 + festa in pista fino alle 05:00 con orario elastico post-proclamazione.'
        : 'Reserved aperitivo island for family and friends from 19:30 + club celebration until 05:00 with flexible post-proclamation arrival.',
      priceRange: isIt
        ? 'Aperitivo 20€ (1 drink + buffet) · Combo Festa 25€ (2 drink + zona riservata) · Cena 35–45€'
        : 'Aperitivo €20 (1 drink + buffet) · Party Combo €25 (2 drinks + reserved area) · Dinner €35–€45',
      timingAndLogistics: isIt
        ? '19:30–22:30 Accoglienza parenti e buffet · 23:00 Taglio torta con sparklers · 23:30–05:00 DJ Set'
        : '19:30–22:30 Family-friendly aperitivo · 23:00 Sparkler cake ceremony · 23:30–05:00 Club DJ set',
      recommendedVenues: ['Just Me Milano (7/7)', '55 Milano', 'Pineta Milano', 'Aria Club', 'Voya Milano', 'Alcatraz'],
      highlights: isIt
        ? [
            'Mappa su misura per tutti i 7 poli universitari milanesi con collegamenti diretti M1/M2/M3/M4/M5',
            'Servizio torta di laurea artigianale (millefoglie/corona d’alloro) o gestione HACCP torta esterna',
            'Possibilità di proiettare video ricordi/slide e microfono per brindisi',
          ]
        : [
            'Custom logistics for all 7 Milan university campuses via direct Metro M1/M2/M3/M4/M5 lines',
            'Artisan Italian graduation cake service or certified external HACCP cake handling',
            'Screen/projector support for tribute videos and microphone toast',
          ],
      href: `/${locale}/private-parties`,
      whatsappText: 'Ciao Nightlife Milan, vorrei organizzare una Festa di Laurea a Milano: mi mandi le proposte locali e prezzi?',
      imageSrc: '/images/venues/55-milano/55-milano-interior-01.webp',
    },
    {
      id: 'occ-compleanni',
      badge: isIt ? 'COMPLEANNI 18° · 25° · 30° · 40° · 50°' : 'BIRTHDAYS 18th · 25th · 30th · 40th · 50th',
      title: isIt
        ? 'Feste di Compleanno a Milano: 18esimi, 30esimi, 40esimi, 50esimi e Anniversari'
        : 'Milestone Birthday Parties in Milan: 18th, 30th, 40th, 50th & Anniversaries',
      subtitle: isIt
        ? 'Dall’aperitivo royal su terrazza panoramica alla cena cantata fino al tavolo privé in console con bottle show a mezzanotte.'
        : 'From panoramic rooftop royal aperitivo to singing dinner shows and DJ console VIP tables with midnight bottle shows.',
      priceRange: isIt
        ? 'Isola Aperitivo da 20–25€ · Cena Cantata da 45–50€ · Tavoli Privé da 200–300€ (100% in bottiglie)'
        : 'Aperitivo Island €20–€25 · Singing Dinner €45–€50 · VIP Tables from €200–€300 (100% bottle credit)',
      timingAndLogistics: isIt
        ? 'Tavolo d’appoggio garantito tutta la sera · Taglio torta a mezzanotte con fontane luminose'
        : 'Guaranteed reserved seating all night · Midnight cake & sparkler bottle presentation',
      recommendedVenues: ['Just Me Milano', 'Pineta Milano', '55 Milano', 'Terrazza Duomo 21', 'Gattopardo', 'Tocqueville 13'],
      highlights: isIt
        ? [
            'Selezione del locale in base all’età reale del gruppo (18–23 anni, 25–35 anni, 35–50+ anni)',
            'Allestimento personalizzato con numeri LED luminosi, palloncini e fotografo dedicato',
            'Quota chiara a persona per gli invitati oppure conto unico con bottiglie prepagate',
          ]
        : [
            'Venue matched to your exact age bracket (18–23, 25–35, or 35–50+ crowd)',
            'Custom LED numbers, balloon/floral styling, and dedicated photographer',
            'Split per-guest fixed package or single prepaid bottle tab',
          ],
      href: `/${locale}/private-parties`,
      whatsappText: 'Ciao Nightlife Milan, vorrei un preventivo per una Festa di Compleanno a Milano',
      imageSrc: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    },
    {
      id: 'occ-celibato-nubilato',
      badge: isIt ? 'CELIBATO · NUBILATO · FESTA CONGIUNTA' : 'BACHELOR · BACHELORETTE · JOINT PARTY',
      title: isIt
        ? 'Addio al Celibato, Addio al Nubilato e Festa Congiunta Sposo & Sposa'
        : 'Bachelor Party, Bachelorette Party & Joint Wedding Warm-Up Night',
      subtitle: isIt
        ? 'Pacchetti completi dal pomeriggio (Spa, Limousine, Go-Kart, Paintball) alla Cena Cantata fino al Privé in discoteca.'
        : 'Complete itineraries from afternoon activities (Spa, Limousine, Karting) to Singing Dinner Show and VIP Club Privé.',
      priceRange: isIt
        ? 'Base 45–55€ · Cena Show + Privé 70–85€ · VIP Limo/Spa 110–140€ (Sposo/a Omaggio >10 partecipanti)'
        : 'Essential €45–€55 · Dinner Show + Privé €70–€85 · VIP Limo/Spa €110–€140 (Bride/Groom Free for 10+ guests)',
      timingAndLogistics: isIt
        ? '18:00 Attività/Limo · 21:00 Cena Cantata · 00:00 Riunione Sposo & Sposa nello stesso Privé'
        : '18:00 Activity/Limo · 21:00 Singing Dinner · 00:00 Optional Joint Bride & Groom VIP Privé',
      recommendedVenues: ['Pineta Milano', 'Tocqueville 13', 'Just Me Milano', '55 Milano', 'Hollywood', 'The Club'],
      highlights: isIt
        ? [
            'Regola d’oro Nightlife Milan: nei gruppi da almeno 10 persone la quota dello sposo o della sposa è omaggio',
            'Tavolo della cena che si trasforma direttamente nella vostra base privata per la discoteca',
            'Transfer in Limousine Lincoln/Hummer o Party Bus tra ristorante e club',
          ]
        : [
            'Bride or Groom goes 100% free in groups of 10 or more guests',
            'Your dinner table seamlessly converts into your VIP club base at midnight',
            'Private Limousine or Party Bus transfer across Milan',
          ],
      href: `/${locale}/private-parties`,
      whatsappText: 'Ciao Nightlife Milan, vorrei i pacchetti per Addio al Celibato / Nubilato a Milano',
      imageSrc: '/images/venues/pineta-milano/pineta-milano-interior-01.webp',
    },
    {
      id: 'occ-divorzio-sorpresa',
      badge: isIt ? 'FESTA DI DIVORZIO & FESTE A SORPRESA' : 'DIVORCE («NEW BEGINNING») & SURPRISE PARTIES',
      title: isIt
        ? 'Festa di Divorzio («Nuovo Inizio») e Feste a Sorpresa con Regia Complice'
        : 'Divorce («New Beginning») Celebrations & Secret Surprise Parties',
      subtitle: isIt
        ? 'Coordinamento segreto con hostess all’ingresso per l’effetto sorpresa o serata ironica di rinascita con gli amici.'
        : 'Synchronized secret arrival with our door hostess for surprise parties or high-energy «New Beginning» nights.',
      priceRange: isIt
        ? 'Da 25€ a persona in aperitivo riservato · Cena Show da 50€ · Tavolo VIP con Bottle Show da 250€'
        : 'From €25/person reserved aperitivo · Dinner Show from €50 · VIP Table + Bottle Show from €250',
      timingAndLogistics: isIt
        ? 'Gli invitati entrano 30 min prima · Ingresso dedicato per il festeggiato/a · Torta personalizzata'
        : 'Guests arrive 30 min early · Staged VIP entrance for the guest of honor · Custom cake & sparklers',
      recommendedVenues: ['Just Me Milano', '55 Milano', 'Pineta Milano', 'Voya Milano', 'MIB Milano'],
      highlights: isIt
        ? [
            'Protocollo zero-spoiler: lista nominale segreta gestita direttamente da Nightlife Milan Concierge con lo staff d’ingresso',
            'Torte ironiche «Finalmente Libero/a» e bottle show con scritte luminose al tavolo',
            'Fotografo pronto a immortalare il momento esatto dell’arrivo',
          ]
        : [
            'Zero-spoiler protocol: secret guest list coordinated by Nightlife Milan Concierge with the door team',
            'Custom themed cakes and LED message boards delivered with sparklers',
            'Photographer positioned to capture the exact surprise reveal',
          ],
      href: `/${locale}/private-parties`,
      whatsappText: 'Ciao Nightlife Milan, vorrei organizzare una Festa a Sorpresa / Festa Nuovo Inizio a Milano',
      imageSrc: '/images/venues/voya-milano/voya-milano-interior-01.webp',
    },
    {
      id: 'occ-aziendali-cena-show',
      badge: isIt ? 'EVENTI AZIENDALI · TEAM BUILDING · CENA SPETTACOLO' : 'CORPORATE EVENTS · TEAM BUILDING · DINNER SHOW',
      title: isIt
        ? 'Eventi Aziendali, Team Building, Lanci Prodotto e Cene Spettacolo / Cantate'
        : 'Corporate Events, Team Building, Product Launches & Singing Dinner Shows',
      subtitle: isIt
        ? 'Sale in esclusiva, menù 4 portate (carne/pesce/veg), supporto tecnico AV/SIAE e fatturazione elettronica SDI.'
        : 'Exclusive room buyouts, 4-course menus (meat/fish/veg), full AV/SIAE setup, and instant corporate invoicing.',
      priceRange: isIt
        ? 'Cocktail Networking da 35€ · Cena Servita 4 Portate da 65€ · Open Bar & Buyout su misura (Fattura SDI)'
        : 'Networking Cocktail from €35 · 4-Course Seated Dinner from €65 · Custom Open Bar & Buyouts (VAT Invoice)',
      timingAndLogistics: isIt
        ? 'Sopralluogo tecnico gratuito · Accoglienza accrediti hostess · Impianto voce, proiettore e DJ set'
        : 'Free technical site inspection · Hostess registration desk · Projectors, wireless mics & DJ set',
      recommendedVenues: ['55 Milano (1.600 mq)', 'Just Me Milano', 'Gattopardo (Chiesa Sconsacrata)', 'MIB Milano', 'Ceresio 7', 'Terrazza Gallia'],
      highlights: isIt
        ? [
            'Preventivo unico con dettaglio analitico IVA, SIAE, guardaroba dedicato e open bar',
            'Gestione completa di allergie, intolleranze, menù vegetariani, vegani, kosher e halal',
            'Format Cena Cantata per trasformare la cena aziendale in un party coinvolgente senza cambiare location',
          ]
        : [
            'Single itemized corporate quote including VAT, SIAE licensing, private cloakroom, and open bar',
            'Complete dietary management (vegetarian, vegan, gluten-free, kosher, halal)',
            'Singing Dinner Show format transitioning directly into the after-dinner party under one roof',
          ],
      href: `/${locale}/private-parties`,
      whatsappText: 'Ciao Nightlife Milan, richiedo preventivo con fattura per un Evento Aziendale / Cena Spettacolo a Milano',
      imageSrc: '/images/venues/gattopardo/gattopardo-interior-01.webp',
    },
    {
      id: 'occ-san-siro-concerti',
      badge: isIt ? 'DOPO-PARTITA SAN SIRO & DOPO-CONCERTO' : 'SAN SIRO MATCH & CONCERT AFTERPARTIES',
      title: isIt
        ? 'Terzo Tempo Dopo-Partita San Siro (Inter / Milan) e Dopo-Concerto (San Siro, Ippodromo, Forum)'
        : 'San Siro Football Afterparties (Inter / AC Milan) & Concert Afterparties (Ippodromo, Forum, Fabrique)',
      subtitle: isIt
        ? 'Orario d’ingresso flessibile dopo il fischio finale o l’ultimo bis, con cucina calda/buffet tardivo e tavoli VIP garantiti.'
        : 'Flexible entry after the final whistle or encore, late-night food/buffet options, and guaranteed VIP tables.',
      priceRange: isIt
        ? 'Lista Post-Evento 15–20€ · Tavoli VIP garantiti anche dopo le 00:30 da 200–300€'
        : 'After-Event Guest List €15–€20 · Late-arrival VIP Tables held past 00:30 from €200–€300',
      timingAndLogistics: isIt
        ? 'Aria Club a 150m a piedi da San Siro · Voya a 3 fermate M5 · 55 Milano a 4 fermate M5 · Just Me 7/7'
        : 'Aria Club 150m walk from San Siro · Voya 3 M5 stops · 55 Milano 4 M5 stops · Just Me open 7/7',
      recommendedVenues: ['Aria Club (150m San Siro)', 'Just Me Milano (7/7)', 'Voya Milano (M5)', '55 Milano (M5)', 'Pineta Milano', 'Repvblic', 'Alcatraz', 'Fabrique'],
      highlights: isIt
        ? [
            'Tolleranza zero-stress sul ritardo: se la partita o il concerto finisce tardi il tavolo resta bloccato',
            'Aria Club a 2 minuti a piedi dai cancelli dello Stadio Meazza e dell’Ippodromo Snai San Siro',
            'Just Me sempre aperto 7 sere su 7 anche per i turni infrasettimanali di Champions League e Coppa Italia',
          ]
        : [
            'Late-arrival protection: your VIP table is held even if the match goes to extra time or the concert runs late',
            'Aria Club is a 2-minute walk (150m) from San Siro Stadium and Ippodromo Snai gates',
            'Just Me is open 7 nights a week for Tuesday/Wednesday Champions League and midweek arena concerts',
          ],
      href: `/${locale}/football-afterparties`,
      whatsappText: 'Ciao Nightlife Milan, vorrei prenotare lista/tavolo per il Dopo-Partita / Dopo-Concerto a Milano',
      imageSrc: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
    },
  ];
}

export function getTradeFairsCatalog(locale: string): VerticalCardItem[] {
  const isIt = locale === 'it';
  return [
    {
      id: 'fair-mfw',
      badge: isIt ? 'GEN · FEB · GIU · SET · MILAN FASHION WEEK' : 'JAN · FEB · JUN · SEP · MILAN FASHION WEEK',
      title: isIt
        ? 'Milan Fashion Week (Donna Febbraio/Settembre & Uomo Gennaio/Giugno) Afterparty & Tavoli VIP'
        : 'Milan Fashion Week (Womenswear Feb/Sep & Menswear Jan/Jun) Official Afterparties & VIP Tables',
      subtitle: isIt
        ? 'Accrediti liste, tavoli console con guest DJ internazionali e showroom afterparty nei club del Quadrilatero, Parco Sempione e Corso Como.'
        : 'Priority VIP tables, international guest DJs, and brand afterparties across Sempione, Brera, and Corso Como.',
      priceRange: isIt
        ? 'Liste selezionate · Tavoli Pista da 400–600€ · Tavoli Privé Console da 1.000–3.000€'
        : 'Selected Guest List · Dancefloor Tables €400–€600 · Backstage Console Privé €1,000–€3,000',
      timingAndLogistics: isIt
        ? 'Cocktail 19:30 · Dinner Show 21:00 · Fashion Afterparty 23:30–05:00 con transfer NCC dedicato'
        : 'Cocktail 19:30 · Dinner Show 21:00 · Fashion Afterparties 23:30–05:00 with private chauffeur options',
      recommendedVenues: ['Just Me Milano', 'Armani Privé', 'Volt Club', '11 Clubroom', 'Tocqueville 13', 'Pineta Milano', 'Ceresio 7'],
      highlights: isIt
        ? [
            'Gestione tavoli per buyer, showroom, agenzie moda e ospiti internazionali con assistenza multilingua',
            'Location per private dinner, cocktail post-sfilata e brand takeover con fatturazione immediata',
            'Accesso prioritario nelle serate sold-out di settembre e febbraio',
          ]
        : [
            'VIP table allocation for buyers, agencies, press, and international fashion houses',
            'Private post-runway dinners and brand takeover venues with full AV and catering',
            'Priority door coordination on sold-out Fashion Week peak nights',
          ],
      href: `/${locale}/milan-fashion-week`,
      whatsappText: 'Ciao Nightlife Milan, vorrei il calendario eventi e listino tavoli per la Milan Fashion Week',
      imageSrc: '/images/venues/armani-prive-milano/armani-prive-milano-interior-01.webp',
    },
    {
      id: 'fair-salone-fuorisalone',
      badge: isIt ? '13–18 APRILE 2027 · SALONE DEL MOBILE & FUORISALONE' : '13–18 APRIL 2027 · SALONE DEL MOBILE & DESIGN WEEK',
      title: isIt
        ? 'Salone del Mobile & Fuorisalone (Milan Design Week): Party, Installazioni & Hospitality'
        : 'Salone del Mobile & Fuorisalone (Milan Design Week): Parties, Rooftops & Brand Hospitality',
      subtitle: isIt
        ? 'La settimana più intensa dell’anno a Milano: da Rho Fiera (M1) ai distretti Brera, Tortona, Isola e Sempione.'
        : 'Milan’s busiest international week connecting Rho Fiera (M1) with Brera, Tortona, Isola, and Sempione.',
      priceRange: isIt
        ? 'Cocktail & Liste su accredito · Cene Aziendali da 65€ · Tavoli Club & Festival Elettronici da 400€'
        : 'Accredited Cocktails · Corporate Dinners from €65 · Club & Electronic Showcase Tables from €400',
      timingAndLogistics: isIt
        ? '18:00–22:00 Rooftop & Fuorisalone Cocktail · 23:30–06:00 Maratone Elettroniche & Clubbing'
        : '18:00–22:00 Rooftop & District Cocktails · 23:30–06:00 International Electronic Showcases',
      recommendedVenues: ['Just Me Milano (Torre Branca)', 'Fabrique Milano', 'Amnesia Milano', '55 Milano', 'Ceresio 7', 'Terrazza Triennale'],
      highlights: isIt
        ? [
            'Collegamento diretto da Rho Fiera (M1 Rossa -> Cadorna/Cairoli) ai locali del Parco Sempione e Centro',
            'Prenotazione cene per espositori, studi di architettura e delegazioni internazionali (10–300 ospiti)',
            'Tavoli backstage per i grandi festival elettronici della Design Week da Fabrique, Amnesia e Just Me',
          ]
        : [
            'Direct M1 Red Line transit from Rho Fiera to Sempione and Centro Storico venues',
            'Turnkey dinners for exhibitors, architecture studios, and international delegations (10–300 guests)',
            'Backstage VIP tables for Design Week electronic music showcases at Fabrique, Amnesia, and Just Me',
          ],
      href: `/${locale}/events/special`,
      whatsappText: 'Ciao Nightlife Milan, vorrei organizzare cena/tavoli durante il Salone del Mobile & Fuorisalone',
      imageSrc: '/images/venues/ceresio-7/ceresio-7-interior-01.webp',
    },
    {
      id: 'fair-mido-bit-micam-lineapelle',
      badge: isIt ? 'FEBBRAIO & SETTEMBRE 2027 · FIERA MILANO RHO & MICO' : 'FEB & SEP 2027 · RHO FIERA & ALLIANZ MICO',
      title: isIt
        ? 'MIDO (6–8 Feb), BIT (9–11 Feb), MICAM (21–23 Feb / 12–14 Set) & Lineapelle (23–25 Feb)'
        : 'MIDO (6–8 Feb), BIT (9–11 Feb), MICAM (21–23 Feb / 12–14 Sep) & Lineapelle (23–25 Feb)',
      subtitle: isIt
        ? 'Ospitalità serale B2B per espositori e buyer a 15–20 minuti da Fiera Milano Rho (M1) e Allianz MiCo Portello (M5).'
        : 'B2B evening hospitality for exhibitors and buyers 15–20 minutes from Rho Fiera (M1) and Allianz MiCo Portello (M5).',
      priceRange: isIt
        ? 'Aperitivo Business 25€ · Cena Servita con Fattura 55–75€ · Tavoli Dopocena da 250–350€'
        : 'Business Aperitivo €25 · Seated Dinner with Invoice €55–€75 · Club VIP Tables from €250–€350',
      timingAndLogistics: isIt
        ? 'Allianz MiCo (M5 Portello -> 2 fermate da 55 Milano/Pineta) · Rho Fiera (M1 -> Cadorna/Sempione)'
        : 'Allianz MiCo (M5 Portello -> 2 stops to 55 Milano/Pineta) · Rho Fiera (M1 -> Cadorna/Sempione)',
      recommendedVenues: ['55 Milano (vicino M5 Portello)', 'Pineta Milano (M5 Cenisio)', 'Just Me Milano (7/7)', 'MIB Milano', 'Voya Milano'],
      highlights: isIt
        ? [
            'Logistica immediata post-fiera alle 18:30 senza dover rientrare in hotel prima dell’aperitivo/cena',
            'Aree riservate silenziose per networking B2B in prima serata che diventano party dopo le 23:00',
            'Fatturazione elettronica SDI / Invoice internazionale per aziende espositrici',
          ]
        : [
            'Immediate 18:30 post-expo arrival with luggage/coat check so guests can head straight from the fairgrounds',
            'Conversation-friendly B2B networking lounges from 19:30 transitioning into club nights after 23:00',
            'Instant corporate VAT invoicing for domestic and international exhibitors',
          ],
      href: `/${locale}/events/special`,
      whatsappText: 'Ciao Nightlife Milan, siamo espositori/visitatori fiera (MIDO/BIT/MICAM/Lineapelle) e cerchiamo cena/tavolo a Milano',
      imageSrc: '/images/venues/mib-milano/mib-milano-interior-01.webp',
    },
    {
      id: 'fair-f1-host-eicma-tuttofood',
      badge: isIt ? 'SET · OTT · NOV · MAG · F1 MONZA, HOSTMILANO, EICMA, TUTTOFOOD' : 'SEP · OCT · NOV · MAY · F1 MONZA, HOST, EICMA, TUTTOFOOD',
      title: isIt
        ? 'Formula 1 GP Monza (Set), HostMilano (22–26 Ott 2027), EICMA (Nov) & TuttoFood (8–11 Mag 2028)'
        : 'Formula 1 Monza GP Weekend (Sep), HostMilano (22–26 Oct 2027), EICMA (Nov) & TuttoFood (8–11 May 2028)',
      subtitle: isIt
        ? 'Official party dei team, cene corporate per il settore hospitality/automotive e grandi eventi nei top club milanesi.'
        : 'Driver & sponsor afterparties, hospitality/automotive corporate dinners, and flagship weekend club nights.',
      priceRange: isIt
        ? 'Cene Corporate da 65€ · Tavoli VIP GP Monza / EICMA da 300–1.500€'
        : 'Corporate Dinners from €65 · F1 Monza GP & EICMA VIP Tables from €300–€1,500',
      timingAndLogistics: isIt
        ? 'Navette NCC da Autodromo di Monza e Rho Fiera · Apertura 7/7 per tutta la durata delle fiere'
        : 'Private NCC shuttles from Monza Circuit and Rho Fiera · 7/7 club openings throughout fair weeks',
      recommendedVenues: ['Just Me Milano', 'Pineta Milano', 'Hollywood', 'The Club', 'Tocqueville 13', 'Alcatraz'],
      highlights: isIt
        ? [
            'Weekend GP di Monza: tavoli privé nei club frequentati da piloti, sponsor e team internazionali',
            'HostMilano & TuttoFood: location iconiche per showcooking, degustazioni e party del settore Horeca',
            'EICMA Novembre: serate ufficiali con madrine, team motoristici e grandi gruppi aziendali',
          ]
        : [
            'Monza F1 GP Weekend: priority VIP tables at the clubs hosting drivers, sponsors, and paddock guests',
            'HostMilano & TuttoFood: turnkey venues for Horeca brand launches, tastings, and gala dinners',
            'EICMA November: high-energy automotive and motorsport afterparties across Milan',
          ],
      href: `/${locale}/events/special`,
      whatsappText: 'Ciao Nightlife Milan, vorrei prenotare per il weekend F1 Monza / HostMilano / EICMA / TuttoFood',
      imageSrc: '/images/venues/terrazza-21/terrazza-21-interior-01.webp',
    },
  ];
}

export function getHolidaysCatalog(locale: string): VerticalCardItem[] {
  const isIt = locale === 'it';
  return [
    {
      id: 'hol-capodanno',
      badge: isIt ? '31 DICEMBRE · CAPODANNO A MILANO' : '31 DECEMBER · NEW YEAR’S EVE MILAN',
      title: isIt
        ? 'Capodanno a Milano (31 Dicembre): Cenone Servito, Royal Buffet & Tavoli Veglione'
        : 'New Year’s Eve in Milan (31 December): Gala Dinner, Royal Buffet & VIP Club Tables',
      subtitle: isIt
        ? 'Tutte le 21 serate ufficiali di Capodanno con menù di gala, buffet imperiale, brindisi di mezzanotte e club fino alle 06:00.'
        : 'All 21 official New Year’s Eve galas featuring seated menus, royal buffets, midnight countdowns, and clubbing until 06:00.',
      priceRange: isIt
        ? 'Ingresso Dopocena da 40–60€ · Buffet Imperiale da 70–90€ · Cenone Gran Galà da 120–220€ · Tavoli VIP da 350€'
        : 'Club Entry €40–€60 · Royal Buffet €70–€90 · Seated Gala Dinner €120–€220 · VIP Tables from €350',
      timingAndLogistics: isIt
        ? '20:30 Cenone / Buffet · 23:30 Ingresso Dopocena · 00:00 Countdown & Fireworks · 06:00 Chiusura'
        : '20:30 Gala Dinner / Buffet · 23:30 Club Entry · 00:00 Midnight Countdown · 06:00 Close',
      recommendedVenues: ['Just Me Milano', '55 Milano', 'Pineta Milano', 'Aria Club', 'Voya Milano', 'Alcatraz', 'Fabrique'],
      highlights: isIt
        ? [
            'Prezzi early-bird bloccati con prevendita ufficiale e conferma scritta del tavolo su pianta',
            'Possibilità di abbinare Cenone + Tavolo Privé mantenendo la stessa postazione tutta la notte',
            'Assistenza WhatsApp diretta il 31 dicembre per ingressi, taxi e coordinamento gruppi',
          ]
        : [
            'Locked early-bird pricing with official vouchers and written floorplan table confirmation',
            'Combo Gala Dinner + VIP Table keeping your private base all night until 06:00',
            'Live December 31st WhatsApp concierge support for door entry and group arrivals',
          ],
      href: `/${locale}/new-years-eve`,
      whatsappText: 'Ciao Nightlife Milan, vorrei il catalogo completo e i prezzi di Capodanno a Milano (Cenone, Buffet e Tavoli)',
      imageSrc: '/images/venues/just-me-milano/just-me-milano-lounge-01.webp',
    },
    {
      id: 'hol-halloween',
      badge: isIt ? '31 OTTOBRE · HALLOWEEN NIGHT MILANO' : '31 OCTOBER · HALLOWEEN NIGHT MILAN',
      title: isIt
        ? 'Halloween a Milano (31 Ottobre): Mega Party in Maschera, Dinner Show & Warehouse Festival'
        : 'Halloween in Milan (31 October): Costume Mega-Parties, Dinner Shows & Warehouse Raves',
      subtitle: isIt
        ? 'Allestimenti horror cinematografici, spettacoli dal vivo a cena e maratone su più piste fino alle 05:30.'
        : 'Theatrical haunted production, live dinner performances, and multi-room club marathons until 05:30.',
      priceRange: isIt
        ? 'Prevendita Saltafoda da 20–30€ · Cena Spettacolo di Halloween da 50–65€ · Tavoli VIP da 250–500€'
        : 'Fast-Track Presale €20–€30 · Halloween Dinner Show €50–€65 · VIP Tables from €250–€500',
      timingAndLogistics: isIt
        ? 'Maschera/trucco a tema consigliato ma non obbligatorio · Prevendita indispensabile contro il sold-out'
        : 'Themed costume/makeup encouraged · Advance booking essential as all clubs sell out early',
      recommendedVenues: ['Alcatraz (3 Piste)', 'Fabrique Milano', 'Just Me Milano', 'Pineta Milano', '55 Milano', 'Gattopardo'],
      highlights: isIt
        ? [
            'Alcatraz & Fabrique per chi cerca i più grandi show scenografici da 3.000 persone',
            'Just Me, Pineta e Gattopardo per chi preferisce Halloween elegante con cena cantata e privé',
            'Saltafoda garantito con voucher nominale o bracciale tavolo VIP',
          ]
        : [
            'Alcatraz & Fabrique for 3,000-capacity festival production and international headliners',
            'Just Me, Pineta, and Gattopardo for upscale Halloween dinner shows and VIP bottle service',
            'Guaranteed skip-the-line entry with official presale or VIP table wristbands',
          ],
      href: `/${locale}/events/special`,
      whatsappText: 'Ciao Nightlife Milan, vorrei prevendite o tavolo VIP per la notte di Halloween (31 Ottobre) a Milano',
      imageSrc: '/images/pillars/venue-alcatraz.webp',
    },
    {
      id: 'hol-natale-santambrogio',
      badge: isIt ? 'NOV · DIC · GEN · CENE DI NATALE & SANT’AMBROGIO (7–8 DIC)' : 'NOV · DEC · JAN · CHRISTMAS DINNERS & SANT’AMBROGIO (7–8 DEC)',
      title: isIt
        ? 'Cene e Feste di Natale Aziendali (Nov–Dic / Kick-Off Gennaio) & Ponte Sant’Ambrogio (7–8 Dic)'
        : 'Corporate Christmas Dinners & Parties (Nov–Dec / Jan Kick-Off) & Sant’Ambrogio Long Weekend (7–8 Dec)',
      subtitle: isIt
        ? 'Location in esclusiva per gli auguri di fine anno aziendali e aperture straordinarie per il patrono di Milano.'
        : 'Exclusive venues for end-of-year corporate galas and special openings across Milan’s patron saint weekend.',
      priceRange: isIt
        ? 'Aperitivo Natalizio Aziendale da 35€ · Cena di Gala 4 Portate da 65–90€ (Fattura SDI inclusa)'
        : 'Christmas Corporate Cocktail from €35 · 4-Course Gala Dinner €65–€90 (Corporate Invoice included)',
      timingAndLogistics: isIt
        ? 'Opzione Kick-Off di Gennaio con tariffe agevolate -20% e piena disponibilità di giovedì/venerdì'
        : 'January Kick-Off Party option with 20% preferred corporate rates and prime Thursday/Friday dates',
      recommendedVenues: ['55 Milano', 'Gattopardo', 'MIB Milano', 'Just Me Milano', 'Pineta Milano', 'Ceresio 7'],
      highlights: isIt
        ? [
            'Pacchetti chiavi in mano con open bar, brindisi con panettone artigianale milanese e DJ set',
            'Strategia «Smart January»: festa aziendale a metà gennaio con più scelta di date e budget ottimizzato',
            'Serate speciali il 6, 7 e 8 dicembre per il ponte di Sant’Ambrogio e dell’Immacolata',
          ]
        : [
            'Turnkey packages including open bar, artisan Milanese panettone toast, and private DJ set',
            '«Smart January» kick-off option offering wider date availability and optimized corporate budgets',
            'Special club nights on December 6, 7, and 8 for the Sant’Ambrogio and Immacolata holiday bridge',
          ],
      href: `/${locale}/private-parties`,
      whatsappText: 'Ciao Nightlife Milan, vorrei un preventivo per Cena di Natale Aziendale / Ponte Sant’Ambrogio a Milano',
      imageSrc: '/images/venues/55-milano/55-milano-friday-dinner-show-01.webp',
    },
    {
      id: 'hol-sanvalentino-donna-ponti-ferragosto',
      badge: isIt ? '14 FEB · CARNEVALE · 8 MAR · PONTI · 15 AGO' : '14 FEB · CARNIVAL · 8 MAR · SPRING BRIDGES · 15 AUG',
      title: isIt
        ? 'San Valentino (14 Feb), Carnevale Ambrosiano, Festa della Donna (8 Mar), Ponti & Ferragosto (15 Ago)'
        : 'Valentine’s Day (14 Feb), Carnevale Ambrosiano, Women’s Day (8 Mar), Spring Holidays & Ferragosto (15 Aug)',
      subtitle: isIt
        ? 'Cene romantiche vista Duomo o single party a San Valentino, show dell’8 Marzo e club open-air d’estate fino a Ferragosto.'
        : 'Romantic Duomo-view dinners or anti-Valentine single parties, March 8th dinner shows, and summer open-air nights on August 15th.',
      priceRange: isIt
        ? 'Cena San Valentino / Festa della Donna da 50–80€ · Serate Carnevale, Ponti e Ferragosto da 20€'
        : 'Valentine’s / Women’s Day Dinner €50–€80 · Carnival, Holiday Bridges & Ferragosto Club Nights from €20',
      timingAndLogistics: isIt
        ? 'Carnevale Ambrosiano con festa il Sabato Grasso (4 giorni dopo il resto d’Italia) · Estivi nel Parco Sempione e San Siro'
        : 'Ambrosian Carnival peaks on Saturday (4 days after standard Mardi Gras) · Open-air gardens in Sempione & San Siro',
      recommendedVenues: ['Just Me Milano (Giardino Torre Branca)', 'Aria Club (Open-Air)', 'Terrazza Duomo 21', 'Pineta Milano', '55 Milano'],
      highlights: isIt
        ? [
            '14 Febbraio: doppio format tra Cena Romantica a lume di candela sui rooftop e Single Party in discoteca',
            '8 Marzo Festa della Donna: Cene Cantate dedicate ai gruppi femminili con ingresso club incluso',
            '15 Agosto Ferragosto: Just Me (Parco Sempione) e Aria Club aperti nel verde per chi resta o visita Milano',
          ]
        : [
            'Feb 14th dual format: candlelit rooftop dinners for couples + high-energy Single Parties in the clubs',
            'March 8th Women’s Day: dedicated Singing Dinner Shows and VIP tables for female groups',
            'August 15th Ferragosto: open-air garden parties under Torre Branca (Just Me) and at Aria Club',
          ],
      href: `/${locale}/events/special`,
      whatsappText: 'Ciao Nightlife Milan, vorrei informazioni per San Valentino / Festa della Donna / Carnevale / Ferragosto a Milano',
      imageSrc: '/images/venues/aria-club-milano/aria-club-milano-garden-01.webp',
    },
  ];
}

export interface NightlifeBlueprintItem {
  id: string;
  portalCluster: string;
  title: string;
  croPrinciple: string;
  uxUiPattern: string;
  copyStorytellingRule: string;
}

export function getNightlifeBlueprints(locale: string): NightlifeBlueprintItem[] {
  const isIt = locale === 'it';
  if (isIt) {
    return [
      {
        id: 'bp-1',
        portalCluster: 'Feste di Laurea · Compleanni · Nightlife Milan Concierge',
        title: 'Chiarezza Prezzi a Persona & Zero Costi Nascosti',
        croPrinciple: 'Dichiarare subito le 3 fasce reali (20€ aperitivo, 25€ pacchetto 2 drink + zona riservata, 35–50€ cena) elimina l’ansia da preventivo e raddoppia i contatti qualificati.',
        uxUiPattern: 'Tabella comparativa a 3 colonne + selettore dei 7 Atenei Milanesi con tempi reali di metropolitana.',
        copyStorytellingRule: 'Spiegare come gestire contemporaneamente genitori/parenti dalle 19:30 e amici in pista fino alle 05:00 senza cambiare locale.',
      },
      {
        id: 'bp-2',
        portalCluster: 'Addio al Celibato · Addio al Nubilato · Festa di Divorzio',
        title: 'Regola «Festeggiato Omaggio >10 Ospiti» & Festa Congiunta',
        croPrinciple: 'Offrire la quota dello sposo o della sposa gratis sopra i 10 partecipanti crea un incentivo immediato per il capogruppo a chiudere la prenotazione.',
        uxUiPattern: 'Timeline in 3 atti (Pomeriggio Attività/Spa -> Cena Cantata -> Tavolo Privé che resta tuo a mezzanotte).',
        copyStorytellingRule: 'Tono complice e concreto: zero scherzi imbarazzanti, focus su musica, tavolo garantito e opzione di riunire sposo e sposa a mezzanotte.',
      },
      {
        id: 'bp-3',
        portalCluster: 'Eventi Aziendali · Fiere di Milano · Cena Spettacolo',
        title: 'Fattura Elettronica SDI, Sopralluogo & Logistica M1/M5 Fiera',
        croPrinciple: 'Per HR, Office Manager ed espositori fieristici i fattori decisivi sono fatturazione immediata, gestione intolleranze e vicinanza alla metro M1 (Rho) / M5 (MiCo).',
        uxUiPattern: 'Scheda tecnica con capienze reali (seduti vs standing cocktail), dotazione audio/video/SIAE e bottone richiesta PDF aziendale.',
        copyStorytellingRule: 'Linguaggio esecutivo: un unico referente (Concierge) dal sopralluogo tecnico fino alla chiusura della sala.',
      },
      {
        id: 'bp-4',
        portalCluster: 'Capodanno · Feste di Natale · San Valentino · Discoteche & Rooftop',
        title: 'Locandina Integrale (`object-contain`) & Contatto Ufficiale Unico',
        croPrinciple: 'Mostrare sempre la locandina ufficiale intera non tagliata insieme a data, orario, prezzo minimo e bottone WhatsApp `+39 351 912 7047` massimizza la fiducia.',
        uxUiPattern: 'Carosello interattivo con filtro Stasera / In Settimana / Proposte Nightlife Milan Concierge / Futuro + vista Griglia.',
        copyStorytellingRule: 'Zero frasi generiche da intelligenza artificiale: solo indirizzi veri, fermate metro esatte e consigli pratici da chi vive la porta dei club ogni sera.',
      },
    ];
  }
  return [
    {
      id: 'bp-1',
      portalCluster: 'Graduations · Milestone Birthdays · Nightlife Milan Concierge',
      title: 'Transparent Per-Person Pricing & Zero Hidden Fees',
      croPrinciple: 'Publishing exact per-person tiers upfront (€20 aperitivo, €25 2-drink party package, €35–€50 seated dinner) removes friction and doubles qualified WhatsApp leads.',
      uxUiPattern: '3-tier comparison matrix + 7-University campus proximity table with exact Metro lines.',
      copyStorytellingRule: 'Show how to host parents and relatives comfortably from 19:30 and transition seamlessly into the club floor with friends until 05:00.',
    },
    {
      id: 'bp-2',
      portalCluster: 'Bachelor · Bachelorette · New Beginning / Surprise Parties',
      title: '«Guest of Honor Free (10+ Guests)» & Midnight Joint Privé',
      croPrinciple: 'Waiving the bride or groom’s share for groups of 10+ gives the best man or maid of honor an immediate reason to lock in the group booking.',
      uxUiPattern: '3-Act Itinerary Timeline (Afternoon Spa/Limo/Kart -> Singing Dinner -> Same Table Kept for Club Night).',
      copyStorytellingRule: 'Insider, zero-cringe tone focused on music, bottle shows, and the option to merge bachelor and bachelorette crews at midnight.',
    },
    {
      id: 'bp-3',
      portalCluster: 'Corporate Events · Milan Trade Fairs · Dinner Shows',
      title: 'Instant Corporate Invoicing, Site Visits & Rho/MiCo M1/M5 Transit',
      croPrinciple: 'Corporate planners and trade fair exhibitors prioritize single-invoice billing, dietary safety, AV/SIAE compliance, and 15-minute M1/M5 metro access.',
      uxUiPattern: 'Technical spec cards listing seated vs. standing capacities, AV equipment, and 1-click corporate quote requests.',
      copyStorytellingRule: 'Executive precision: one senior point of contact (Concierge) from technical walkthrough to final toast.',
    },
    {
      id: 'bp-4',
      portalCluster: 'New Year’s Eve · Holidays · Clubs, Rooftops & Aperitivo',
      title: 'Uncropped Official Flyers (`object-contain`) & Verified Concierge Desk',
      croPrinciple: 'Displaying full uncropped event posters alongside verified dates, minimum prices, and direct WhatsApp booking (+39 351 912 7047) builds instant trust.',
      uxUiPattern: 'Auto-updating Carousel + Grid toggle with Tonight, This Week, Nightlife Milan Concierge’s Proposals, and Future tabs.',
      copyStorytellingRule: 'Zero generic filler: only real Milan street addresses, exact metro stops, door policies, and authentic insider tips.',
    },
  ];
}

export function resolveSuggestedEventsForVertical(
  focus: 'all' | 'occasions' | 'tradeFairs' | 'holidays' | 'sanSiro' | 'concerts',
  locale: string
): CarouselEventCard[] {
  const isIt = locale === 'it';
  const shiftedMs = Date.now() - 6 * 3600 * 1000;
  const todayISO = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(shiftedMs));

  const upcomingDated = OCTOBER_EVENTS.filter((ev) => ev.startISO.slice(0, 10) >= todayISO)
    .sort((a, b) => a.startISO.localeCompare(b.startISO));

  const filteredDated =
    focus === 'sanSiro'
      ? upcomingDated.filter((ev) =>
          ['v-aria', 'v-justme', 'v-voya', 'v-55milano', 'v-pineta', 'v-repvblic'].includes(ev.venue.id)
        )
      : focus === 'concerts'
        ? upcomingDated.filter((ev) =>
            ['v-alcatraz', 'v-fabrique', 'v-aria', 'v-justme', 'v-magazzini'].includes(ev.venue.id)
          )
        : upcomingDated;

  const cards: CarouselEventCard[] = filteredDated.slice(0, 8).map((ev) => {
    const slug = getOctoberEventSlug(ev);
    const minOffer = ev.offers.reduce<number>(
      (acc, o) => (typeof o.price === 'number' && o.price > 0 && o.price < acc ? o.price : acc),
      999
    );
    const dStr = ev.startISO.slice(0, 10);
    const endStr = ev.endISO ? ev.endISO.slice(11, 16) : '05:00';
    return {
      id: `vert-${ev.id}`,
      title: ev.officialName || ev.shortName || ev.venue.name,
      dateLabel: dStr,
      timeLabel: `${ev.startISO.slice(11, 16) || '23:00'} – ${endStr}`,
      priceLabel: minOffer < 999 ? `€${minOffer}` : '€20',
      categoryLabel: ev.venue.name,
      genres: ev.genres.slice(0, 3),
      imageSrc: ev.image?.src || '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
      href: `/${locale}/events/${slug}`,
      whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
        isIt
          ? `Ciao Nightlife Milan, vorrei prenotare lista/tavolo per ${ev.officialName || ev.venue.name} da ${ev.venue.name} (${dStr})`
          : `Hi Nightlife Milan, I'd like to book guest list / VIP table for ${ev.officialName || ev.venue.name} at ${ev.venue.name} (${dStr})`
      )}`,
      badge: isIt ? 'PROSSIMO EVENTO' : 'UPCOMING LIVE',
    };
  });

  // Add weekly curated proposals
  for (const w of weeklyEvents.slice(0, 4)) {
    cards.push({
      id: `vert-weekly-${w.id}`,
      title: w.name,
      dateLabel: isIt ? `Ogni Settimana (${w.day.toUpperCase()})` : `Weekly (${w.day.toUpperCase()})`,
      timeLabel: '20:30 – 05:00',
      priceLabel: w.pricing.club || w.pricing.aperitif || '€20',
      categoryLabel: w.clubName,
      genres: (w.genres && w.genres.length > 0 ? w.genres : ['Aperitivo & Club', 'VIP Tables']).slice(0, 3),
      imageSrc: w.image || '/images/venues/pineta-milano/pineta-milano-interior-01.webp',
      href: `/${locale}/events/${w.eventSlug || w.id}`,
      whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
        isIt
          ? `Ciao Nightlife Milan, vorrei info per la serata ${w.name} (${w.clubName})`
          : `Hi Nightlife Milan, I'd like info for ${w.name} (${w.clubName})`
      )}`,
      badge: isIt ? 'SERATA PROPOSTA' : 'CONCIERGE WEEKLY PICK',
      isRecurring: true,
    });
  }

  // Add NYE highlights if focus is holidays or all
  if (focus === 'holidays' || focus === 'all') {
    for (const cap of CAPODANNO_EVENTS.slice(0, 4)) {
      cards.push({
        id: `vert-cap-${cap.slug}`,
        title: isIt ? cap.titleIt : cap.titleEn,
        dateLabel: '2026-12-31',
        timeLabel: cap.hours || '20:30 – 06:00',
        priceLabel: `€${cap.priceFromEur || 50}`,
        categoryLabel: cap.venueName,
        genres: ['Cenone / Buffet', 'NYE Party'],
        imageSrc: cap.image,
        href: `/${locale}/new-years-eve/${cap.slug}`,
        whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
          isIt
            ? `Ciao Nightlife Milan, vorrei info per Capodanno da ${cap.venueName}`
            : `Hi Nightlife Milan, I'd like NYE info for ${cap.venueName}`
        )}`,
        badge: isIt ? 'CAPODANNO 31 DIC' : 'NYE 31 DEC',
      });
    }
  }

  return cards;
}
