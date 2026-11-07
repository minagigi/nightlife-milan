import type { LocaleCode } from './i18n/locales';
import { isEnabledLocale } from './i18n/locales';
import { Venue, VenueCategory } from './types';
import { OCTOBER_EVENTS } from './octoberEvents';
import { getOctoberEventSlug } from './october-events/copy';
import { weeklyEvents } from './eventsConfig';
import { getCapodannoEventForClub } from './capodannoEvents';

function venueDisplayName(venue: Venue, locale: string): string {
  return (locale === 'it' ? venue.localizedContent?.name?.it : venue.localizedContent?.name?.en) || venue.localizedContent?.name?.en || 'Club Milano';
}

function venueStreet(venue: Venue): string {
  return venue.address?.streetAddress || 'Milano';
}

export function getEnhancedVenueGallery(venue: Venue): string[] {
  const map: Record<string, string[]> = {
    'v-tocqueville': [
      '/images/pillars/venue-tocqueville.webp',
      '/images/seo-events/master/tocqueville-01.webp',
      '/images/seo-events/master/tocqueville-02.webp',
      '/images/seo-events/master/tocqueville-03.webp',
      '/images/seo-events/master/tocqueville-04.webp',
      '/images/venues/11-clubroom/11-clubroom-interior-01.webp',
    ],
    'v-alcatraz': [
      '/images/pillars/venue-alcatraz.webp',
      '/images/seo-events/master/alcatraz-01.webp',
      '/images/seo-events/master/alcatraz-02.webp',
      '/images/seo-events/master/alcatraz-03.webp',
      '/images/seo-events/master/alcatraz-04.webp',
      '/images/venues/magazzini-generali/magazzini-generali-interior-01.webp',
    ],
    'v-fabrique': [
      '/images/pillars/venue-fabrique.webp',
      '/images/seo-events/master/fabrique-01.webp',
      '/images/seo-events/master/fabrique-02.webp',
      '/images/seo-events/master/fabrique-03.webp',
      '/images/seo-events/master/fabrique-04.webp',
      '/images/venues/repvblic-milano/repvblic-milano-interior-01.webp',
    ],
    'v-amnesia': [
      '/images/pillars/venue-amnesia.webp',
      '/images/seo-events/master/amnesia-01.webp',
      '/images/seo-events/master/amnesia-02.webp',
      '/images/seo-events/master/amnesia-03.webp',
      '/images/seo-events/master/amnesia-04.webp',
      '/images/venues/volt-club-milano/volt-club-milano-interior-01.webp',
    ],
  };
  if (map[venue.id]) return map[venue.id];
  if (venue.gallery && venue.gallery.length >= 5) return venue.gallery;
  const baseImage = venue.image || '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp';
  const fallback: string[] =
    venue.category === VenueCategory.ROOFTOP
      ? [
          baseImage,
          '/images/venues/ceresio-7/ceresio-7-interior-01.webp',
          '/images/venues/terrazza-21/terrazza-21-interior-01.webp',
          '/images/venues/mib-milano/mib-milano-interior-01.webp',
          '/images/venues/ceresio-7/ceresio-7-interior-02.webp',
          '/images/venues/terrazza-21/terrazza-21-interior-02.webp',
        ]
      : [
          baseImage,
          '/images/venues/gattopardo/gattopardo-interior-01.webp',
          '/images/venues/the-club-milano/the-club-milano-interior-01.webp',
          '/images/venues/play-club-milano/play-club-milano-interior-01.webp',
          '/images/venues/11-clubroom/11-clubroom-interior-01.webp',
          '/images/venues/church-81/church-81-interior-01.webp',
        ];
  return Array.from(new Set([...(venue.gallery || []), ...fallback])).filter((item): item is string => Boolean(item));
}

export interface VenueUi35 {
  eventsEyebrow: string;
  eventsTitle: string;
  eventsSubtitle: string;
  tabTonight: string;
  tabThisWeek: string;
  tabCurated: string;
  tabFuture: string;
  viewCarousel: string;
  viewGrid: string;
  tonightFallbackNotice: string;
  bookWhatsApp: string;
  viewEvent: string;
  fromPrice: string;
  targetEyebrow: string;
  targetTitle: string;
  labelAge: string;
  labelCrowd: string;
  labelDressCode: string;
  labelMusic: string;
  labelMetro: string;
  labelSchedule: string;
  labelPrices: string;
  celebrationsEyebrow: string;
  celebrationsTitle: string;
  celebrationsSubtitle: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesSubtitle: string;
  galleryEyebrow: string;
  galleryTitle: string;
  askQuoteCta: string;
  availableBadge: string;
}

const UI_BASE_EN: VenueUi35 = {
  eventsEyebrow: 'LIVE AUTO-UPDATED CALENDAR & Nightlife Milan CURATION',
  eventsTitle: 'Tonight, This Week, Curated Picks & Upcoming Events',
  eventsSubtitle: 'Automatically synchronized with the official Xceed calendar, weekly recurring club nights, and special seasonal events.',
  tabTonight: 'Tonight',
  tabThisWeek: 'This Week',
  tabCurated: 'My Weekly Proposals (Concierge)',
  tabFuture: 'Future & Seasonal Events',
  viewCarousel: 'Carousel',
  viewGrid: 'Grid',
  tonightFallbackNotice: 'No scheduled ticketed event for tonight — showing Nightlife Milan Concierge’s weekly proposals and upcoming dates. Private buyouts and VIP tables available on request.',
  bookWhatsApp: 'Book on WhatsApp',
  viewEvent: 'Event Sheet & Guest List',
  fromPrice: 'From',
  targetEyebrow: 'CROWD, VIBE & LOGISTICS DOSSIER',
  targetTitle: 'Target Audience, Dress Code, Music & Access',
  labelAge: 'Target & Age Group',
  labelCrowd: 'Crowd & Atmosphere',
  labelDressCode: 'Door Policy & Dress Code',
  labelMusic: 'Music Format & Sound',
  labelMetro: 'Metro, Parking & Access',
  labelSchedule: 'Opening Nights & Hours',
  labelPrices: 'Aperitivo, Guest List & VIP Tables',
  celebrationsEyebrow: 'VENUE AVAILABLE FOR ALL CELEBRATIONS & EVENTS',
  celebrationsTitle: 'Parties, Graduations, Birthdays, Corporate & Special Occasions',
  celebrationsSubtitle: 'This venue is officially available for private and semi-private bookings across all year-round celebrations, trade fairs, and holidays with dedicated areas.',
  servicesEyebrow: 'TURNKEY CONCIERGE & VENUE SERVICES',
  servicesTitle: 'All Services We Offer at This Venue',
  servicesSubtitle: 'Single point of contact (Concierge), written all-inclusive per-person or per-table quote, and full on-site coordination from arrival to the final toast.',
  galleryEyebrow: 'VERIFIED VENUE GALLERY',
  galleryTitle: 'Spaces, Aperitivo Buffet, Dancefloor & VIP Privé',
  askQuoteCta: 'Request Quote on WhatsApp',
  availableBadge: 'Available · Direct Booking',
};

const UI_OVERRIDES: Partial<Record<LocaleCode, Partial<VenueUi35>>> = {
  it: {
    eventsEyebrow: 'CALENDARIO AUTOAGGIORNATO & SELEZIONE Nightlife Milan',
    eventsTitle: 'Eventi Stasera, in Settimana, le Mie Proposte e nel Futuro',
    eventsSubtitle: 'Sincronizzato in automatico con il calendario ufficiale Xceed, le serate fisse settimanali e gli eventi speciali in programma.',
    tabTonight: 'Stasera',
    tabThisWeek: 'In Settimana',
    tabCurated: 'Le Mie Proposte in Settimana (Concierge)',
    tabFuture: 'Eventi nel Futuro & Feste',
    viewCarousel: 'Carosello',
    viewGrid: 'Griglia',
    tonightFallbackNotice: 'Nessun evento a biglietteria previsto per stasera: ecco le mie proposte della settimana e le prossime date. Sala privata e tavoli su richiesta.',
    bookWhatsApp: 'Prenota su WhatsApp',
    viewEvent: 'Scheda Evento & Lista',
    fromPrice: 'Da',
    targetEyebrow: 'DOSSIER PUBBLICO, STILE & LOGISTICA',
    targetTitle: 'Target, Dress Code, Musica, Metro e Prezzi Reali',
    labelAge: 'Target ed Età Media',
    labelCrowd: 'Pubblico e Atmosfera',
    labelDressCode: 'Selezione e Dress Code',
    labelMusic: 'Musica e Format',
    labelMetro: 'Metro, Parcheggio e Accessibilità',
    labelSchedule: 'Giorni e Orari di Apertura',
    labelPrices: 'Aperitivo, Liste e Tavoli Privé',
    celebrationsEyebrow: 'LOCALE DISPONIBILE PER TUTTI I TIPI DI FESTE ED EVENTI',
    celebrationsTitle: 'Lauree, Compleanni, Celibato/Nubilato, Eventi Aziendali, Fiere e Feste',
    celebrationsSubtitle: 'Il locale è ufficialmente disponibile per tutte le ricorrenze dell’anno, le fiere internazionali e le feste comandate con aree riservate su misura.',
    servicesEyebrow: 'SERVIZI CHIAVI IN MANO SUL LOCALE',
    servicesTitle: 'Tutti i Servizi che Possiamo Offrire in Questo Locale',
    servicesSubtitle: 'Unico referente (Concierge), preventivo scritto tutto incluso a persona o a tavolo e coordinamento diretto in sala dall’arrivo al brindisi finale.',
    galleryEyebrow: 'GALLERIA FOTOGRAFICA VERIFICATA',
    galleryTitle: 'Spazi, Isola Aperitivo, Pista, Giardino e Tavoli Privé',
    askQuoteCta: 'Chiedi Preventivo su WhatsApp',
    availableBadge: 'Disponibile · Prenotazione Diretta',
  },
  es: {
    eventsEyebrow: 'CALENDARIO AUTOACTUALIZADO Y SELECCIÓN Nightlife Milan',
    eventsTitle: 'Eventos Esta Noche, Esta Semana, Mis Propuestas y Futuro',
    tabTonight: 'Esta Noche',
    tabThisWeek: 'Esta Semana',
    tabCurated: 'Mis Propuestas de la Semana',
    tabFuture: 'Eventos Futuros',
    viewCarousel: 'Carrusel',
    viewGrid: 'Cuadrícula',
    bookWhatsApp: 'Reservar por WhatsApp',
    viewEvent: 'Ver Evento y Lista',
    fromPrice: 'Desde',
    targetTitle: 'Público Objetivo, Dress Code, Música y Precios',
    celebrationsTitle: 'Graduaciones, Cumpleaños, Despedidas, Empresas y Fiestas',
    servicesTitle: 'Todos los Servicios Disponibles en Este Local',
    askQuoteCta: 'Pedir Presupuesto por WhatsApp',
    availableBadge: 'Disponible · Reserva Directa',
  },
  fr: {
    eventsEyebrow: 'CALENDRIER AUTO-ACTUALISÉ & SÉLECTION Nightlife Milan',
    eventsTitle: 'Soirées Ce Soir, Cette Semaine, Mes Propositions et à Venir',
    tabTonight: 'Ce Soir',
    tabThisWeek: 'Cette Semaine',
    tabCurated: 'Mes Propositions de la Semaine',
    tabFuture: 'Événements à Venir',
    viewCarousel: 'Carrousel',
    viewGrid: 'Grille',
    bookWhatsApp: 'Réserver sur WhatsApp',
    viewEvent: 'Voir Soirée & Guest List',
    fromPrice: 'Dès',
    targetTitle: 'Clientèle Cible, Dress Code, Musique et Tarifs',
    celebrationsTitle: 'Remises de Diplôme, Anniversaires, EVG/EVJF, Entreprises & Fêtes',
    servicesTitle: 'Tous les Services Proposés dans Ce Club',
    askQuoteCta: 'Demander un Devis WhatsApp',
    availableBadge: 'Disponible · Réservation Directe',
  },
  de: {
    eventsEyebrow: 'AUTOMATISCH AKTUALISIERTER KALENDER & Nightlife Milan-AUSWAHL',
    eventsTitle: 'Events Heute Abend, Diese Woche, Meine Empfehlungen & Zukunft',
    tabTonight: 'Heute Abend',
    tabThisWeek: 'Diese Woche',
    tabCurated: 'Meine Wochen-Empfehlungen',
    tabFuture: 'Kommende Events',
    viewCarousel: 'Karussell',
    viewGrid: 'Raster',
    bookWhatsApp: 'Per WhatsApp buchen',
    viewEvent: 'Event & Gästeliste',
    fromPrice: 'Ab',
    targetTitle: 'Zielgruppe, Dresscode, Musik, U-Bahn & Preise',
    celebrationsTitle: 'Abschlussfeiern, Geburtstage, JGA, Firmenevents & Feiertage',
    servicesTitle: 'Alle Services & Pakete in Dieser Location',
    askQuoteCta: 'Angebot per WhatsApp anfragen',
    availableBadge: 'Verfügbar · Direktbuchung',
  },
  pt: {
    eventsTitle: 'Eventos Hoje à Noite, Esta Semana, Minhas Propostas e Futuro',
    tabTonight: 'Hoje à Noite',
    tabThisWeek: 'Esta Semana',
    tabCurated: 'Minhas Propostas da Semana',
    tabFuture: 'Próximos Eventos',
    viewCarousel: 'Carrossel',
    viewGrid: 'Grelha',
    bookWhatsApp: 'Reservar no WhatsApp',
    viewEvent: 'Ver Evento e Lista',
    fromPrice: 'Desde',
    targetTitle: 'Público-Alvo, Dress Code, Música e Preços',
    celebrationsTitle: 'Formaturas, Aniversários, Despedidas, Empresas e Festas',
    servicesTitle: 'Todos os Serviços Disponíveis Neste Local',
    askQuoteCta: 'Pedir Orçamento no WhatsApp',
    availableBadge: 'Disponível · Reserva Direta',
  },
  nl: {
    eventsTitle: 'Evenementen Vanavond, Deze Week, Mijn Selectie & Toekomst',
    tabTonight: 'Vanavond',
    tabThisWeek: 'Deze Week',
    tabCurated: 'Mijn Weekselectie (Concierge)',
    tabFuture: 'Toekomstige Events',
    viewCarousel: 'Carrousel',
    viewGrid: 'Raster',
    bookWhatsApp: 'Boek via WhatsApp',
    viewEvent: 'Event & Gastenlijst',
    fromPrice: 'Vanaf',
    targetTitle: 'Doelgroep, Dresscode, Muziek & Prijzen',
    celebrationsTitle: 'Afstuderen, Verjaardagen, Vrijgezellenfeesten & Bedrijfsevents',
    servicesTitle: 'Alle Services in Deze Club',
    askQuoteCta: 'Offerte via WhatsApp',
    availableBadge: 'Beschikbaar · Direct Boeken',
  },
  ru: {
    eventsTitle: 'События сегодня вечером, на этой неделе, рекомендации и будущее',
    tabTonight: 'Сегодня вечером',
    tabThisWeek: 'На этой неделе',
    tabCurated: 'Мои рекомендации недели',
    tabFuture: 'Будущие события',
    viewCarousel: 'Карусель',
    viewGrid: 'Сетка',
    bookWhatsApp: 'Забронировать в WhatsApp',
    viewEvent: 'Подробнее о вечеринке',
    fromPrice: 'От',
    targetTitle: 'Публика, дресс-код, музыка и цены',
    celebrationsTitle: 'Выпускные, дни рождения, мальчишники, корпоративы и праздники',
    servicesTitle: 'Все услуги в этом клубе',
    askQuoteCta: 'Запросить расчёт в WhatsApp',
    availableBadge: 'Доступно · Прямая бронь',
  },
  tr: {
    eventsTitle: 'Bu Gece, Bu Hafta, Haftalık Önerilerim ve Gelecek Etkinlikler',
    tabTonight: 'Bu Gece',
    tabThisWeek: 'Bu Hafta',
    tabCurated: 'Haftalık Önerilerim (Concierge)',
    tabFuture: 'Gelecek Etkinlikler',
    viewCarousel: 'Karusel',
    viewGrid: 'Izgara',
    bookWhatsApp: 'WhatsApp ile Rezervasyon',
    viewEvent: 'Etkinlik Detayı & Liste',
    fromPrice: 'Başlangıç',
    targetTitle: 'Hedef Kitle, Kıyafet Kodu, Müzik ve Fiyatlar',
    celebrationsTitle: 'Mezuniyet, Doğum Günü, Bekarlığa Veda ve Kurumsal Etkinlikler',
    servicesTitle: 'Bu Mekanda Sunduğumuz Tüm Hizmetler',
    askQuoteCta: 'WhatsApp Teklifi İste',
    availableBadge: 'Müsait · Doğrudan Rezervasyon',
  },
  ar: {
    eventsTitle: 'فعاليات الليلة، هذا الأسبوع، مقترحاتنا والفعاليات القادمة',
    tabTonight: 'الليلة',
    tabThisWeek: 'هذا الأسبوع',
    tabCurated: 'مقترحات الأسبوع من أكسل',
    tabFuture: 'الفعاليات القادمة',
    viewCarousel: 'عرض متحرك',
    viewGrid: 'شبكة',
    bookWhatsApp: 'احجز عبر واتساب',
    viewEvent: 'تفاصيل الفعالية',
    fromPrice: 'ابتداءً من',
    targetTitle: 'الجمهور، قواعد اللباس، الموسيقى والأسعار',
    celebrationsTitle: 'حفلات التخرج، أعياد الميلاد، الشركات والمناسبات الخاصة',
    servicesTitle: 'جميع الخدمات المتاحة في هذا النادي',
    askQuoteCta: 'اطلب عرض سعر عبر واتساب',
    availableBadge: 'متاح · حجز مباشر',
  },
  zh: {
    eventsTitle: '今晚、本周、Nightlife Milan Concierge 本周精选及未来活动日历',
    tabTonight: '今晚活动',
    tabThisWeek: '本周活动',
    tabCurated: '本周精选推荐 (Concierge)',
    tabFuture: '未来与节日活动',
    viewCarousel: '轮播视图',
    viewGrid: '网格视图',
    bookWhatsApp: 'WhatsApp 预订',
    viewEvent: '查看活动详情',
    fromPrice: '起价',
    targetTitle: '目标客群、着装要求、音乐风格与价格',
    celebrationsTitle: '毕业派对、生日庆典、单身派对、企业活动与节日盛典',
    servicesTitle: '本夜店提供的全部定制服务',
    askQuoteCta: 'WhatsApp 获取报价',
    availableBadge: '可预订 · 官方直订',
  },
  bg: {
    eventsTitle: 'Събития тази вечер, тази седмица, моите предложения и бъдещи дати',
    tabTonight: 'Тази вечер',
    tabThisWeek: 'Тази седмица',
    tabCurated: 'Моите предложения (Concierge)',
    tabFuture: 'Предстоящи събития',
    viewCarousel: 'Въртележка',
    viewGrid: 'Мрежа',
    bookWhatsApp: 'Резервирай в WhatsApp',
    viewEvent: 'Детайли за събитието',
    fromPrice: 'От',
    askQuoteCta: 'Поискай оферта в WhatsApp',
    availableBadge: 'Налично · Директна резервация',
  },
  hr: {
    eventsTitle: 'Događaji večeras, ovaj tjedan, moji prijedlozi i budući datumi',
    tabTonight: 'Večeras',
    tabThisWeek: 'Ovaj tjedan',
    tabCurated: 'Moji tjedni prijedlozi',
    tabFuture: 'Budući događaji',
    viewCarousel: 'Vrtuljak',
    viewGrid: 'Mreža',
    bookWhatsApp: 'Rezerviraj putem WhatsAppa',
    viewEvent: 'Detalji događaja i popis',
    fromPrice: 'Od',
    askQuoteCta: 'Zatraži ponudu na WhatsApp',
    availableBadge: 'Dostupno · Izravna rezervacija',
  },
  cs: {
    eventsTitle: 'Akce dnes večer, tento týden, moje tipy a budoucí události',
    tabTonight: 'Dnes večer',
    tabThisWeek: 'Tento týden',
    tabCurated: 'Moje týdenní tipy (Concierge)',
    tabFuture: 'Budoucí akce',
    viewCarousel: 'Karusel',
    viewGrid: 'Mřížka',
    bookWhatsApp: 'Rezervovat přes WhatsApp',
    viewEvent: 'Detail akce a guestlist',
    fromPrice: 'Od',
    askQuoteCta: 'Poptat nabídku přes WhatsApp',
    availableBadge: 'Dostupné · Přímá rezervace',
  },
  da: {
    eventsTitle: 'Events i aften, denne uge, mine anbefalinger og kommende datoer',
    tabTonight: 'I aften',
    tabThisWeek: 'Denne uge',
    tabCurated: 'Mine ugeanbefalinger',
    tabFuture: 'Kommende events',
    viewCarousel: 'Karrusel',
    viewGrid: 'Gitter',
    bookWhatsApp: 'Book via WhatsApp',
    viewEvent: 'Se event og gæsteliste',
    fromPrice: 'Fra',
    askQuoteCta: 'Få tilbud på WhatsApp',
    availableBadge: 'Tilgængelig · Direkte booking',
  },
  et: {
    eventsTitle: 'Üritused täna õhtul, sel nädalal, minu soovitused ja tulevikus',
    tabTonight: 'Täna õhtul',
    tabThisWeek: 'Sel nädalal',
    tabCurated: 'Minu nädala soovitused',
    tabFuture: 'Tulevased üritused',
    viewCarousel: 'Karussell',
    viewGrid: 'Ruudustik',
    bookWhatsApp: 'Broneeri WhatsAppis',
    viewEvent: 'Vaata üritust ja nimekirja',
    fromPrice: 'Alates',
    askQuoteCta: 'Küsi pakkumist WhatsAppis',
    availableBadge: 'Saadaval · Otsebroneering',
  },
  fi: {
    eventsTitle: 'Tapahtumat tänä iltana, tällä viikolla, suositukseni ja tulevat',
    tabTonight: 'Tänä iltana',
    tabThisWeek: 'Tällä viikolla',
    tabCurated: 'Viikon suositukseni (Concierge)',
    tabFuture: 'Tulevat tapahtumat',
    viewCarousel: 'Karuselli',
    viewGrid: 'Ruudukko',
    bookWhatsApp: 'Varaa WhatsAppissa',
    viewEvent: 'Tapahtuman tiedot & lista',
    fromPrice: 'Alkaen',
    askQuoteCta: 'Pyydä tarjous WhatsAppissa',
    availableBadge: 'Saatavilla · Suora varaus',
  },
  el: {
    eventsTitle: 'Εκδηλώσεις απόψε, αυτή την εβδομάδα, οι προτάσεις μου & μελλοντικά',
    tabTonight: 'Απόψε',
    tabThisWeek: 'Αυτή την εβδομάδα',
    tabCurated: 'Οι προτάσεις της εβδομάδας',
    tabFuture: 'Επερχόμενες εκδηλώσεις',
    viewCarousel: 'Καρουζέλ',
    viewGrid: 'Πλέγμα',
    bookWhatsApp: 'Κράτηση μέσω WhatsApp',
    viewEvent: 'Λεπτομέρειες & Λίστα',
    fromPrice: 'Από',
    askQuoteCta: 'Ζητήστε προσφορά στο WhatsApp',
    availableBadge: 'Διαθέσιμο · Άμεση Κράτηση',
  },
  hu: {
    eventsTitle: 'Események ma este, ezen a héten, heti ajánlataim és jövőbeli bulik',
    tabTonight: 'Ma este',
    tabThisWeek: 'Ezen a héten',
    tabCurated: 'Heti ajánlataim (Concierge)',
    tabFuture: 'Közelgő események',
    viewCarousel: 'Körhinta',
    viewGrid: 'Rács',
    bookWhatsApp: 'Foglalás WhatsAppon',
    viewEvent: 'Esemény és vendéglista',
    fromPrice: 'Ár:',
    askQuoteCta: 'Ajánlatkérés WhatsAppon',
    availableBadge: 'Elérhető · Közvetlen foglalás',
  },
  ga: {
    eventsTitle: 'Imeachtaí Anocht, An tSeachtain Seo, Mo Mholtaí & Todhchaí',
    tabTonight: 'Anocht',
    tabThisWeek: 'An tSeachtain Seo',
    tabCurated: 'Mo Mholtaí Seachtainiúla',
    tabFuture: 'Imeachtaí le Teacht',
    viewCarousel: 'Timpeallán',
    viewGrid: 'Greille',
    bookWhatsApp: 'Cuir in Áirithe ar WhatsApp',
    viewEvent: 'Sonraí an Imeachta',
    fromPrice: 'Ó',
    askQuoteCta: 'Iarr Meastachán ar WhatsApp',
    availableBadge: 'Ar Fáil · Áirithint Dhíreach',
  },
  lv: {
    eventsTitle: 'Pasākumi šovakar, šonedēļ, mani ieteikumi un nākotnes datumi',
    tabTonight: 'Šovakar',
    tabThisWeek: 'Šonedēļ',
    tabCurated: 'Mani nedēļas ieteikumi',
    tabFuture: 'Gaidāmie pasākumi',
    viewCarousel: 'Karuselis',
    viewGrid: 'Režģis',
    bookWhatsApp: 'Rezervēt WhatsApp',
    viewEvent: 'Pasākuma detaļas un saraksts',
    fromPrice: 'No',
    askQuoteCta: 'Pieprasīt piedāvājumu WhatsApp',
    availableBadge: 'Pieejams · Tiešā rezervācija',
  },
  lt: {
    eventsTitle: 'Renginiai šįvakar, šią savaitę, mano pasiūlymai ir ateities datos',
    tabTonight: 'Šįvakar',
    tabThisWeek: 'Šią savaitę',
    tabCurated: 'Mano savaitės pasiūlymai',
    tabFuture: 'Būsimi renginiai',
    viewCarousel: 'Karuselė',
    viewGrid: 'Tinklelis',
    bookWhatsApp: 'Rezervuoti per WhatsApp',
    viewEvent: 'Renginio informacija',
    fromPrice: 'Nuo',
    askQuoteCta: 'Gauti pasiūlymą per WhatsApp',
    availableBadge: 'Galima · Tiesioginė rezervacija',
  },
  mt: {
    eventsTitle: 'Avvenimenti Illejla, Din il-Ġimgħa, il-Proposti Tiegħi u fil-Futur',
    tabTonight: 'Illejla',
    tabThisWeek: 'Din il-Ġimgħa',
    tabCurated: 'Il-Proposti tal-Ġimgħa',
    tabFuture: 'Avvenimenti li Ġejjin',
    viewCarousel: 'Karusell',
    viewGrid: 'Gradilja',
    bookWhatsApp: 'Ibbukkja fuq WhatsApp',
    viewEvent: 'Dettalji tal-Avveniment',
    fromPrice: 'Minn',
    askQuoteCta: 'Itlob Kwotazzjoni fuq WhatsApp',
    availableBadge: 'Disponibbli · Booking Dirett',
  },
  pl: {
    eventsTitle: 'Wydarzenia dziś wieczorem, w tym tygodniu, moje propozycje i przyszłe',
    tabTonight: 'Dziś wieczorem',
    tabThisWeek: 'W tym tygodniu',
    tabCurated: 'Moje propozycje tygodnia',
    tabFuture: 'Nadchodzące wydarzenia',
    viewCarousel: 'Karuzela',
    viewGrid: 'Siatka',
    bookWhatsApp: 'Zarezerwuj przez WhatsApp',
    viewEvent: 'Szczegóły i lista gości',
    fromPrice: 'Od',
    askQuoteCta: 'Poproś o wycenę na WhatsApp',
    availableBadge: 'Dostępne · Rezerwacja bezpośrednia',
  },
  ro: {
    eventsTitle: 'Evenimente în seara asta, săptămâna aceasta, propunerile mele și viitoare',
    tabTonight: 'În seara asta',
    tabThisWeek: 'Săptămâna aceasta',
    tabCurated: 'Propunerile mele săptămânale',
    tabFuture: 'Evenimente viitoare',
    viewCarousel: 'Carusel',
    viewGrid: 'Grilă',
    bookWhatsApp: 'Rezervă pe WhatsApp',
    viewEvent: 'Detalii eveniment & listă',
    fromPrice: 'De la',
    askQuoteCta: 'Cere ofertă pe WhatsApp',
    availableBadge: 'Disponibil · Rezervare directă',
  },
  sk: {
    eventsTitle: 'Podujatia dnes večer, tento týždeň, moje tipy a budúce akcie',
    tabTonight: 'Dnes večer',
    tabThisWeek: 'Tento týždeň',
    tabCurated: 'Moje týždenné tipy (Concierge)',
    tabFuture: 'Budúce podujatia',
    viewCarousel: 'Karusel',
    viewGrid: 'Mriežka',
    bookWhatsApp: 'Rezervovať cez WhatsApp',
    viewEvent: 'Detail podujatia a zoznam',
    fromPrice: 'Od',
    askQuoteCta: 'Vyžiadať ponuku cez WhatsApp',
    availableBadge: 'Dostupné · Priama rezervácia',
  },
  sl: {
    eventsTitle: 'Dogodki nocoj, ta teden, moji predlogi in prihodnji datumi',
    tabTonight: 'Nocoj',
    tabThisWeek: 'Ta teden',
    tabCurated: 'Moji tedenski predlogi',
    tabFuture: 'Prihodnji dogodki',
    viewCarousel: 'Vrtiljak',
    viewGrid: 'Mreža',
    bookWhatsApp: 'Rezerviraj prek WhatsAppa',
    viewEvent: 'Podrobnosti dogodka',
    fromPrice: 'Od',
    askQuoteCta: 'Zahtevaj ponudbo na WhatsApp',
    availableBadge: 'Na voljo · Neposredna rezervacija',
  },
  sv: {
    eventsTitle: 'Evenemang ikväll, denna vecka, mina förslag och kommande datum',
    tabTonight: 'Ikväll',
    tabThisWeek: 'Denna vecka',
    tabCurated: 'Mina veckoförslag (Concierge)',
    tabFuture: 'Kommande evenemang',
    viewCarousel: 'Karusell',
    viewGrid: 'Rutnät',
    bookWhatsApp: 'Boka via WhatsApp',
    viewEvent: 'Se event och gästlista',
    fromPrice: 'Från',
    askQuoteCta: 'Begär offert på WhatsApp',
    availableBadge: 'Tillgänglig · Direktbokning',
  },
  no: {
    eventsTitle: 'Arrangementer i kveld, denne uken, mine anbefalinger og fremtidige',
    tabTonight: 'I kveld',
    tabThisWeek: 'Denne uken',
    tabCurated: 'Mine ukeanbefalinger',
    tabFuture: 'Kommende arrangementer',
    viewCarousel: 'Karusell',
    viewGrid: 'Rutenett',
    bookWhatsApp: 'Bestill via WhatsApp',
    viewEvent: 'Se arrangement og gjesteliste',
    fromPrice: 'Fra',
    askQuoteCta: 'Be om tilbud på WhatsApp',
    availableBadge: 'Tilgjengelig · Direkte booking',
  },
  is: {
    eventsTitle: 'Viðburðir í kvöld, í þessari viku, mínar tillögur og framundan',
    tabTonight: 'Í kvöld',
    tabThisWeek: 'Í þessari viku',
    tabCurated: 'Mínar vikutillögur (Concierge)',
    tabFuture: 'Viðburðir framundan',
    viewCarousel: 'Hringekja',
    viewGrid: 'grind',
    bookWhatsApp: 'Bóka á WhatsApp',
    viewEvent: 'Upplýsingar um viðburð',
    fromPrice: 'Frá',
    askQuoteCta: 'Fá tilboð á WhatsApp',
    availableBadge: 'Laust · Bein bókun',
  },
  uk: {
    eventsTitle: 'Події сьогодні ввечері, цього тижня, мої рекомендації та майбутні',
    tabTonight: 'Сьогодні ввечері',
    tabThisWeek: 'Цього тижня',
    tabCurated: 'Мої рекомендації тижня',
    tabFuture: 'Майбутні події',
    viewCarousel: 'Карусель',
    viewGrid: 'Сітка',
    bookWhatsApp: 'Забронювати у WhatsApp',
    viewEvent: 'Деталі вечірки та список',
    fromPrice: 'Від',
    askQuoteCta: 'Запитати прорахунок у WhatsApp',
    availableBadge: 'Доступно · Пряме бронювання',
  },
  sq: {
    eventsTitle: 'Eventet Sonte, Këtë Javë, Propozimet e Mia dhe në të Ardhmen',
    tabTonight: 'Sonte',
    tabThisWeek: 'Këtë Javë',
    tabCurated: 'Propozimet e Mia të Javës',
    tabFuture: 'Eventet e Ardhshme',
    viewCarousel: 'Karusel',
    viewGrid: 'Rrjetë',
    bookWhatsApp: 'Rezervo në WhatsApp',
    viewEvent: 'Detajet e Eventit & Lista',
    fromPrice: 'Nga',
    askQuoteCta: 'Kërko Ofertë në WhatsApp',
    availableBadge: 'E Disponueshme · Rezervim Direkt',
  },
  sr: {
    eventsTitle: 'Događaji večeras, ove nedelje, moji predlozi i budući datumi',
    tabTonight: 'Večeras',
    tabThisWeek: 'Ove nedelje',
    tabCurated: 'Moji nedeljni predlozi',
    tabFuture: 'Budući događaji',
    viewCarousel: 'Karusel',
    viewGrid: 'Mreža',
    bookWhatsApp: 'Rezerviši putem WhatsApp-a',
    viewEvent: 'Detalji događaja i spisak',
    fromPrice: 'Od',
    askQuoteCta: 'Zatraži ponudu na WhatsApp',
    availableBadge: 'Dostupno · Direktna rezervacija',
  },
  bs: {
    eventsTitle: 'Događaji večeras, ove sedmice, moji prijedlozi i budući datumi',
    tabTonight: 'Večeras',
    tabThisWeek: 'Ove sedmice',
    tabCurated: 'Moji sedmični prijedlozi',
    tabFuture: 'Budući događaji',
    viewCarousel: 'Vrtuljak',
    viewGrid: 'Mreža',
    bookWhatsApp: 'Rezerviši putem WhatsAppa',
    viewEvent: 'Detalji događaja i lista',
    fromPrice: 'Od',
    askQuoteCta: 'Zatraži ponudu na WhatsApp',
    availableBadge: 'Dostupno · Direktna rezervacija',
  },
  mk: {
    eventsTitle: 'Настани вечерва, оваа недела, мои предлози и идни настани',
    tabTonight: 'Вечерва',
    tabThisWeek: 'Оваа недела',
    tabCurated: 'Мои неделни предлози',
    tabFuture: 'Идни настани',
    viewCarousel: 'Карусел',
    viewGrid: 'Мрежа',
    bookWhatsApp: 'Резервирај на WhatsApp',
    viewEvent: 'Детали за настанот',
    fromPrice: 'Од',
    askQuoteCta: 'Побарај понуда на WhatsApp',
    availableBadge: 'Достапно · Директна резервација',
  },
};

export function getVenueUi35(locale: string): VenueUi35 {
  const code: LocaleCode = isEnabledLocale(locale) ? locale : 'en';
  return { ...UI_BASE_EN, ...(UI_OVERRIDES[code] || {}) };
}

export interface CarouselEventCard {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  priceLabel: string;
  categoryLabel: string;
  genres: string[];
  imageSrc: string;
  href: string;
  whatsappHref: string;
  badge: string;
  isRecurring?: boolean;
}

export interface CelebrationOption {
  id: string;
  title: string;
  formula: string;
  priceIndication: string;
  details: string;
  whatsappText: string;
}

export interface VenueServiceItem {
  id: string;
  title: string;
  spec: string;
  description: string;
}

export interface VenueTargetProfile {
  ageRange: string;
  crowdVibe: string;
  dressCode: string;
  musicStyle: string;
  metroAndParking: string;
  openingSchedule: string;
  priceSummary: string;
}

const VENUE_TARGET_IT: Record<string, VenueTargetProfile> = {
  'v-justme': {
    ageRange: '21–45+ anni (pubblico internazionale, moda, hospitality e gruppi selezionati)',
    crowdVibe: 'Elegante e cosmopolita ai piedi della Torre Branca nel Parco Sempione, firmato Roberto Cavalli',
    dressCode: 'Smart Elegant / Cocktail Chic (camicia o polo curata per uomo, vietato abbigliamento sportivo)',
    musicStyle: 'Commercial House, Afro-House, Hip-Hop & Hits internazionali con DJ guest e sax/percussioni live',
    metroAndParking: 'M2 Lanza / M1 Cairoli / M5 Tre Torri (8–10 min), taxi point viale Alemagna e parcheggio custodito',
    openingSchedule: 'Aperto 7 sere su 7 da lunedì a domenica · Aperitivo 19:30–22:30 · Cena 20:30 · Club 23:00–05:00',
    priceSummary: 'Aperitivo Royal in lista 15–20€ (1 drink + buffet) · Pacchetto Laurea/Festa 25€ (2 drink + buffet riservato) · Tavoli Privé da 300€',
  },
  'v-pineta': {
    ageRange: '22–42 anni (clientela fashion, professionisti, lauree e gruppi compleanno)',
    crowdVibe: 'Glamour stile Milano Marittima in via Messina 38 (distretto Cenisio / Chinatown)',
    dressCode: 'Smart Chic / Elegante (selezione curata all’ingresso)',
    musicStyle: 'Cena Cantata italiana, House commerciale, Urban e format venerdì/sabato',
    metroAndParking: 'M5 Cenisio a 200 metri a piedi · Posteggio su via Messina e autorimesse via Paolo Sarpi',
    openingSchedule: 'Venerdì, Sabato e prefestivi · Aperitivo & Cena Cantata 20:30–23:30 · Club 23:30–05:00',
    priceSummary: 'Aperitivo con isola riservata da 20–25€ · Cena Cantata da 50€ · Tavoli pista da 250€ / Privé da 300–500€',
  },
  'v-aria': {
    ageRange: '20–38 anni (studenti universitari, tifosi VIP post San Siro, gruppi festa)',
    crowdVibe: 'Open-air nel verde di Piazzale dello Sport 14 (Ex Trotto San Siro) e club coperto invernale',
    dressCode: 'Smart Casual curato',
    musicStyle: 'Hip-Hop, Reggaeton, Urban, Commercial & Dance Hits',
    metroAndParking: 'M5 San Siro Ippodromo / Segesta a 150 metri reali a piedi · Ampio parcheggio Piazzale dello Sport',
    openingSchedule: 'Mercoledì, Venerdì, Sabato e tutte le sere post-partita e post-concerto San Siro · 20:30–05:00',
    priceSummary: 'Aperitivo 15–20€ · Pacchetto Festa 25€ (2 drink + buffet) · Tavoli da 200–250€ per 6–10 ospiti',
  },
  'v-55milano': {
    ageRange: '23–48 anni (lauree con genitori, aziende, compleanni 30/40/50 anni)',
    crowdVibe: 'Loft industriale ex stazione ferroviaria di 1.600 mq con terrazza giardino di 600 mq in via Piero della Francesca 55',
    dressCode: 'Smart Casual / Cocktail Chic',
    musicStyle: 'Lounge & Deep House in aperitivo, DJ set Commercial & Revival 90/2000 fino alle 02:30',
    metroAndParking: 'M5 Gerusalemme / Domodossola a 350 metri (4 fermate dirette da San Siro) · Garage custoditi in via Piero della Francesca',
    openingSchedule: 'Martedì–Domenica 19:30–02:30 (esclusiva lunedì su richiesta per eventi aziendali)',
    priceSummary: 'Aperitivo Royal con isola riservata 20–25€ (1–2 drink + buffet illimitato) · Cena da 45€ · Bottiglie da 120€',
  },
  'v-voya': {
    ageRange: '21–40 anni (gruppi compleanno, celibato/nubilato, tifosi post-partita M5)',
    crowdVibe: 'Club moderno e lounge con impianto LED wall in via Valtellina 6 (Scalo Farini / Isola)',
    dressCode: 'Smart Casual / Elegante',
    musicStyle: 'Urban, Reggaeton, Commercial House e format tematici del weekend',
    metroAndParking: 'M5 Monumentale a 400 metri (3 fermate dirette da San Siro) / M3 Maciachini',
    openingSchedule: 'Venerdì, Sabato e prefestivi 20:30–05:00',
    priceSummary: 'Aperitivo 15–20€ · Festa 25€ con 2 drink + zona riservata · Tavoli pista da 200€ / Privé da 250€',
  },
  'v-repvblic': {
    ageRange: '21–38 anni (pubblico internazionale, moda, studenti Bocconi/Cattolica/IULM)',
    crowdVibe: 'Boutique club esclusivo in Piazza della Repubblica / Porta Nuova',
    dressCode: 'Elegante / Fashion Forward',
    musicStyle: 'Afro-House, Melodic House, Hip-Hop & R&B',
    metroAndParking: 'M3 Repubblica a 150 metri / M2 Gioia / Stazione Centrale',
    openingSchedule: 'Mercoledì, Venerdì, Sabato e serate Fashion Week 23:00–05:00',
    priceSummary: 'Ingresso lista 15–20€ · Tavoli pista da 250€ · Tavoli Privé console da 500€',
  },
};

export function getVenueTargetProfile(venue: Venue, locale: string): VenueTargetProfile {
  const isIt = locale === 'it';
  const vName = venueDisplayName(venue, locale);
  const vAddr = venueStreet(venue);
  const preset = VENUE_TARGET_IT[venue.id];
  if (preset && isIt) return preset;
  if (preset && !isIt) {
    return {
      ageRange: '21–45+ (international guests, fashion crowd, university graduates & corporate groups)',
      crowdVibe: `${vName} in ${venue.zone} (${vAddr}) — verified Milan nightlife destination`,
      dressCode: 'Smart Elegant / Cocktail Chic (collared shirt recommended for men, no athletic wear)',
      musicStyle: (venue.tags || ['House', 'Commercial', 'Hip-Hop']).join(' · '),
      metroAndParking: `Direct Metro access in ${venue.zone} (${vAddr}), taxi rank & nearby guarded parking`,
      openingSchedule: 'Aperitivo 20:00–22:30 · Seated Dinner 21:00 · Club & VIP Tables 23:00–05:00',
      priceSummary: `Aperitivo & Guest List ${venue.priceRange || '$$'} · Party Package €25 (2 drinks + reserved buffet) · VIP Tables from €200–€300`,
    };
  }
  return isIt
    ? {
        ageRange: '21–45 anni (gruppi laurea, compleanni 18/30/40, eventi aziendali e clientela internazionale)',
        crowdVibe: `${vName} in zona ${venue.zone} (${vAddr})`,
        dressCode: 'Smart Elegant / Casual Chic curato (selezione all’ingresso)',
        musicStyle: (venue.tags || ['House', 'Commercial', 'Open Format']).join(' · '),
        metroAndParking: `Zona ${venue.zone} (${vAddr}) servita da metropolitana ATM, taxi e parcheggi custoditi`,
        openingSchedule: 'Aperitivo 20:00–22:30 · Cena 21:00 · Dopocena e Club 23:00–05:00',
        priceSummary: `Fascia prezzo ${venue.priceRange || '$$'} · Pacchetto Festa da 20–25€ · Tavoli riservati da 200–300€`,
      }
    : {
        ageRange: '21–45 years (graduation groups, birthdays, corporate hospitality & international guests)',
        crowdVibe: `${vName} in ${venue.zone} (${vAddr})`,
        dressCode: 'Smart Elegant / Cocktail Chic (door selection applies)',
        musicStyle: (venue.tags || ['House', 'Commercial', 'Open Format']).join(' · '),
        metroAndParking: `${venue.zone} (${vAddr}) with direct Metro connection, taxi drop-off & parking`,
        openingSchedule: 'Aperitivo 20:00–22:30 · Dinner 21:00 · Club & Bottle Service 23:00–05:00',
        priceSummary: `Price tier ${venue.priceRange || '$$'} · Party Packages from €20–€25 · VIP Tables from €200–€300`,
      };
}

export function getVenueCelebrations(venue: Venue, locale: string): CelebrationOption[] {
  const isIt = locale === 'it';
  const vName = venueDisplayName(venue, locale);
  if (isIt) {
    return [
      {
        id: 'laurea',
        title: 'Feste di Laurea (Tutti i 7 Atenei Milanesi)',
        formula: 'Isola Aperitivo Royal + Combo Serata Club',
        priceIndication: 'Da 20–25€ a persona (1–2 drink + buffet illimitato + area d’appoggio)',
        details: `Ideale per Bocconi, Cattolica, Statale, Politecnico (Leonardo/Bovisa), Bicocca, IULM e NABA/Brera. Orario flessibile per chi discute nel pomeriggio, parenti benvenuti dalle 19:30 e taglio torta con fontane luminose.`,
        whatsappText: `Ciao Nightlife Milan, vorrei un preventivo per una Festa di Laurea da ${vName}`,
      },
      {
        id: 'compleanno',
        title: 'Compleanni (18°, 25°, 30°, 40° e 50° Anno)',
        formula: 'Aperitivo Riservato, Cena Cantata o Tavolo Privé',
        priceIndication: 'Da 20€ in aperitivo · Tavoli dopocena da 200–300€ (100% in bottiglie)',
        details: `Zona riservata con divanetti per tutta la sera, servizio torta artigianale con certificazione HACCP o pasticceria convenzionata, bottiglie di spumante/champagne per il brindisi di mezzanotte.`,
        whatsappText: `Ciao Nightlife Milan, vorrei organizzare una Festa di Compleanno da ${vName}`,
      },
      {
        id: 'celibato-nubilato',
        title: 'Addio al Celibato, Addio al Nubilato & Festa Congiunta',
        formula: 'Cena Spettacolo + Tavolo Pista/Privé (Festeggiato/a Omaggio >10 pax)',
        priceIndication: 'Pacchetti completi da 45–80€ a persona tutto incluso',
        details: `Programma su misura dal tardo pomeriggio alle 05:00: aperitivo o cena cantata, bottle show con sparklers al tavolo e possibilità di unire il gruppo sposo e sposa nel privé a mezzanotte.`,
        whatsappText: `Ciao Nightlife Milan, vorrei un preventivo per Addio al Celibato/Nubilato da ${vName}`,
      },
      {
        id: 'divorzio-sorpresa',
        title: 'Festa di Divorzio («Nuovo Inizio») & Feste a Sorpresa',
        formula: 'Regia Complice con Ingresso Dedicato + Tavolo VIP',
        priceIndication: 'Da 25€ a persona o Tavolo VIP da 250€',
        details: `Coordinamento via WhatsApp con l’organizzatore per l’effetto sorpresa («finto aperitivo a due»), torta ironica personalizzata e bottle service dedicato.`,
        whatsappText: `Ciao Nightlife Milan, vorrei organizzare una Festa a Sorpresa / Nuovo Inizio da ${vName}`,
      },
      {
        id: 'aziendali-fiere',
        title: 'Eventi Aziendali, Team Building & Hospitality Fiere (MFW, Salone, EICMA)',
        formula: 'Area Riservata, Cena 4 Portate o Buyout Sala Privata',
        priceIndication: 'Da 35€ cocktail networking · Da 65€ cena servita (Fattura SDI inclusa)',
        details: `Soluzione chiavi in mano per aziende ed espositori Rho Fiera / MiCo: menù carne/pesce/vegetariano, gestione allergie, impianto audio/microfoni, SIAE e fatturazione elettronica immediata.`,
        whatsappText: `Ciao Nightlife Milan, richiedo preventivo aziendale con fattura per evento da ${vName}`,
      },
      {
        id: 'feste-comandate',
        title: 'Capodanno, Halloween, Cene di Natale, San Valentino, Festa della Donna & Post-Partita',
        formula: 'Cenone / Royal Buffet + Serata Club o Tavolo Dopo-Partita San Siro',
        priceIndication: 'Prezzi ufficiali bloccati in prevendita con conferma scritta',
        details: `Disponibilità garantita per tutte le feste comandate (31 Dicembre, 31 Ottobre, 7–8 Dicembre, 14 Febbraio, 8 Marzo, Ponti e Ferragosto) e per i terzi tempi post Inter/Milan e grandi concerti.`,
        whatsappText: `Ciao Nightlife Milan, vorrei info e tavoli per una data speciale / festa comandata da ${vName}`,
      },
    ];
  }
  return [
    {
      id: 'laurea',
      title: 'Graduation Parties (All 7 Milan Universities)',
      formula: 'Reserved Royal Aperitivo Island + Club Transition',
      priceIndication: 'From €20–€25/person (1–2 drinks + unlimited buffet + reserved area)',
      details: `Tailored for Bocconi, Cattolica, Statale, Politecnico, Bicocca, IULM & NABA. Flexible arrival for afternoon proclamations, family-friendly early slot (19:30–22:00), and midnight sparkler cake moment.`,
      whatsappText: `Hi Nightlife Milan, I'd like a quote for a Graduation Party at ${vName}`,
    },
    {
      id: 'compleanno',
      title: 'Milestone Birthdays (18th, 25th, 30th, 40th & 50th)',
      formula: 'Reserved Aperitivo Lounge, Singing Dinner or VIP Table',
      priceIndication: 'From €20 aperitivo · Club VIP Tables from €200–€300 (100% bottle credit)',
      details: `Private sofa island, certified HACCP pastry cake service, custom sparkler presentation, and seamless transition from aperitivo/dinner to the dancefloor.`,
      whatsappText: `Hi Nightlife Milan, I'd like to book a Birthday Celebration at ${vName}`,
    },
    {
      id: 'celibato-nubilato',
      title: 'Bachelor, Bachelorette & Joint Wedding Warm-Up Parties',
      formula: 'Dinner Show + VIP Privé Table (Guest of Honor Free for 10+ guests)',
      priceIndication: 'All-inclusive packages from €45–€80/person',
      details: `Full itinerary from aperitivo or singing dinner to midnight bottle show, with the option to merge bachelor and bachelorette crews at midnight.`,
      whatsappText: `Hi Nightlife Milan, I need a Bachelor/Bachelorette package at ${vName}`,
    },
    {
      id: 'divorzio-sorpresa',
      title: 'Divorce («New Beginning») & Surprise Parties',
      formula: 'Secret Guest Arrival + Dedicated VIP Table & Bottle Show',
      priceIndication: 'From €25/person or VIP Table from €250',
      details: `Synchronized arrival timing with our door hostess so guests are hidden inside before the guest of honor walks in, plus custom cake and sparkler show.`,
      whatsappText: `Hi Nightlife Milan, I'd like to plan a Surprise / New Beginning Party at ${vName}`,
    },
    {
      id: 'aziendali-fiere',
      title: 'Corporate Events, Team Building & Trade Fair Hospitality (MFW, Design Week)',
      formula: 'Standing Networking Cocktail, 4-Course Seated Dinner or Full Venue Buyout',
      priceIndication: 'From €35 networking · From €65 seated dinner (Corporate Invoice included)',
      details: `Turnkey B2B hospitality during Fashion Week, Salone del Mobile, MIDO, MICAM, HostMilano and EICMA: dietary management, AV/microphone setup, SIAE, and instant corporate invoicing.`,
      whatsappText: `Hi Nightlife Milan, I need a corporate event quote at ${vName}`,
    },
    {
      id: 'feste-comandate',
      title: 'New Year’s Eve, Halloween, Christmas Dinners, Valentine’s, Women’s Day & Match Nights',
      formula: 'Gala Dinner / Royal Buffet + Club Entry or San Siro After-Match VIP Table',
      priceIndication: 'Official early-bird & VIP table rates with written confirmation',
      details: `Guaranteed priority access for NYE (31 Dec), Halloween (31 Oct), Christmas corporate dinners, Valentine's Day, Women's Day, and San Siro football/concert afterparties.`,
      whatsappText: `Hi Nightlife Milan, I'd like availability for a holiday / special night at ${vName}`,
    },
  ];
}

export function getVenueServices10(venue: Venue, locale: string): VenueServiceItem[] {
  const isIt = locale === 'it';
  const vName = venueDisplayName(venue, locale);
  if (isIt) {
    return [
      { id: 's1', title: 'Isola Aperitivo Royal Riservata', spec: '19:30–22:30 · Divanetti + Buffet Illimitato', description: `Area d’appoggio con tavoli e sedute riservate al tuo gruppo da ${vName}, 1 o 2 drink premium inclusi e accesso illimitato all’isola gastronomica calda e fredda.` },
      { id: 's2', title: 'Cena Servita & Cena Cantata / Dinner Show', spec: '20:30–23:30 · Menù 3/4 Portate + Live Show', description: 'Tavolo riservato per tutta la cena (che resta tuo nel dopocena), menù di carne, pesce o vegetariano con gestione intolleranze e intrattenimento vocale/artistico.' },
      { id: 's3', title: 'Tavoli Pista, Privé Rialzato & Super Privé Console', spec: '23:30–05:00 · 100% Spendibile in Bottiglie', description: 'Ingresso saltacoda immediato per tutto il gruppo, hostess dedicata, scelta distillati/champagne dal listino ufficiale e servizio al tavolo con fontane luminose.' },
      { id: 's4', title: 'Affitto Sala in Esclusiva & Buyout Parziale/Totale', spec: 'Da 40 a 1.000+ Ospiti · Sopralluogo Gratuito', description: 'Possibilità di riservare un’intera sala privata, la terrazza estiva o l’intero locale in esclusiva con guardaroba, bar tender e sicurezza dedicati.' },
      { id: 's5', title: 'Servizio Torta HACCP, Pasticceria & Bottiglie Brindisi', spec: 'Taglio Torta in Sala o a Mezzanotte', description: 'Fornitura diretta di torte artigianali personalizzate (millefoglie, mimosa, cake design) o gestione certificazione HACCP per torta esterna, con candele pirotecniche.' },
      { id: 's6', title: 'Allestimenti, Scritte LED, Palloncini & Fotografo', spec: 'Personalizzazione Area Festa & Photo Corner', description: 'Allestimento con numeri luminosi, backdrop fotografico, gadget a tema e servizio fotografico/video professionale con consegna rapida.' },
      { id: 's7', title: 'Transfer NCC, Minivan di Gruppo & Party Bus', spec: 'Navetta da/per Casa, Hotel, San Siro o Fiera', description: 'Coordinamento minivan Mercedes V-Class (7–8 posti), minibus 16–20 posti o limousine con conducente per andata e ritorno in totale sicurezza.' },
      { id: 's8', title: 'Supporto Tecnico Audio/Video, Microfoni & SIAE', spec: 'Proiettore, Impianto Voce, DJ Set & Pratiche SIAE', description: 'Dotazione tecnica per speech aziendali, video dei ricordi per lauree/compleanni, DJ set su misura e assistenza completa per i permessi musicali SIAE.' },
      { id: 's9', title: 'Accoglienza Fast-Track & Unico Referente (Concierge)', spec: 'Assistenza WhatsApp 7/7 Fino a Fine Serata', description: 'Nessun rimpallo tra PR: Nightlife Milan Concierge segue personalmente la tua prenotazione dal primo messaggio fino all’ingresso dell’ultimo invitato.' },
      { id: 's10', title: 'Preventivo Scritto Tutto Incluso & Fattura SDI', spec: 'Zero Costi Nascosti · Quota Fissa a Persona', description: 'Riepilogo scritto su WhatsApp o PDF con quota esatta a persona (guardaroba, SIAE e servizio torta specificati prima) e fatturazione elettronica per le aziende.' },
    ];
  }
  return [
    { id: 's1', title: 'Reserved Royal Aperitivo Island', spec: '19:30–22:30 · Private Sofa Area + Unlimited Buffet', description: `Dedicated seating island for your group at ${vName}, 1 or 2 premium drinks included, and full access to the hot and cold gourmet buffet.` },
    { id: 's2', title: 'Seated Dinner & Singing Dinner Show', spec: '20:30–23:30 · 3/4-Course Menu + Live Entertainment', description: 'Reserved dinner table (kept for the club night), customizable meat, seafood, vegetarian or allergy-safe menus, and live vocal/DJ dinner show.' },
    { id: 's3', title: 'Dancefloor VIP, Raised Privé & DJ Console Tables', spec: '23:30–05:00 · 100% Minimum Spend in Bottles', description: 'Immediate VIP fast-track door entry, dedicated table hostess, official bottle menu (vodka, gin, tequila, champagne), and sparkler presentation.' },
    { id: 's4', title: 'Private Room & Full/Partial Venue Buyout', spec: '40 to 1,000+ Guests · Free Site Inspection', description: 'Exclusive reservation of a private room, garden terrace, or the entire venue with dedicated bartenders, cloakroom, and security.' },
    { id: 's5', title: 'Custom Cake, HACCP Pastry & Midnight Toast', spec: 'Artisan Pastry Partner or External HACCP Cake', description: 'Direct delivery of custom Italian celebration cakes or HACCP handling for external cakes, served with indoor sparkler fountains and champagne.' },
    { id: 's6', title: 'Custom LED Signs, Decor & Event Photographer', spec: 'Branded Backdrops, Balloons & Media Crew', description: 'Custom neon/LED numbers, floral or balloon installations, branded corporate step-and-repeat walls, and dedicated photographer/videographer.' },
    { id: 's7', title: 'Private NCC Chauffeur, Group Minivans & Shuttles', spec: 'Mercedes V-Class, 16-Seat Sprinters & Limousines', description: 'Door-to-door transfers connecting hotels, universities, San Siro Stadium, Rho Fiera, and the club safely until 05:00.' },
    { id: 's8', title: 'AV Equipment, Screens, Microphones & SIAE Licensing', spec: 'Projectors, LED Walls, Speeches & Custom DJ Sets', description: 'Full technical setup for corporate presentations, graduation/birthday tribute videos, live musicians, and SIAE music license management.' },
    { id: 's9', title: 'VIP Fast-Track Hostess & Single Point of Contact (Concierge)', spec: '7/7 Direct WhatsApp Concierge Support', description: 'One senior coordinator (Concierge) manages your guest list, table placement, and late arrivals in real time until the party ends.' },
    { id: 's10', title: 'Written All-Inclusive Quote & Corporate Invoicing', spec: 'Zero Hidden Fees · Clear Per-Person Pricing', description: 'Transparent written summary detailing drinks, buffet, cake fee, and cloakroom upfront, plus electronic invoicing (SDI/EU VAT) for corporate clients.' },
  ];
}

const VENUE_WORD_TO_CLUB_SLUG: Record<string, string> = {
  'v-justme': 'just-me-milano',
  'v-pineta': 'pineta-milano',
  'v-aria': 'aria-club-milano',
  'v-55milano': '55-milano',
  'v-voya': 'voya-milano',
  'v-repvblic': 'repvblic-milano',
  'v-tocqueville': 'tocqueville-13-milano',
  'v-alcatraz': 'alcatraz-milano',
  'v-fabrique': 'fabrique-milano',
  'v-amnesia': 'amnesia-milano',
  'v-playclub': 'play-club-milano',
  'v-11clubroom': '11-clubroom-milano',
  'v-church81': 'the-church-81-milano',
  'v-mibmilano': 'mib-milano',
  'v-gattopardo': 'il-gattopardo-milano',
  'v-terrazza21': 'terrazza-duomo-21',
  'v-magazzini': 'magazzini-generali-milano',
  'v-armani-prive': 'armani-prive-milano',
  'v-volt': 'volt-club-milano',
  'v-hollywood': 'hollywood-rythmoteque-milano',
  'v-apollo': 'apollo-club-milano',
  'v-ceresio-7': 'ceresio-7-milano',
  'v-theclub': 'the-club-milano',
};

function getMilanNightlifeDateISO(): { todayISO: string; endOfWeekISO: string } {
  const shiftedMs = Date.now() - 6 * 3600 * 1000;
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const todayISO = fmt.format(new Date(shiftedMs));
  const endOfWeekISO = fmt.format(new Date(shiftedMs + 7 * 24 * 3600 * 1000));
  return { todayISO, endOfWeekISO };
}

export function resolveVenueEventsForCarousel(venue: Venue, locale: string): {
  tonight: CarouselEventCard[];
  thisWeek: CarouselEventCard[];
  curatedProposals: CarouselEventCard[];
  future: CarouselEventCard[];
} {
  const isIt = locale === 'it';
  const vName = venueDisplayName(venue, locale);
  const vTags = venue.tags || ['House', 'Commercial', 'VIP Tables'];
  const { todayISO, endOfWeekISO } = getMilanNightlifeDateISO();
  const clubSlug = VENUE_WORD_TO_CLUB_SLUG[venue.id] || venue.slugs.en;
  const venueNameLower = vName.toLowerCase();

  const matchedDated = OCTOBER_EVENTS.filter((ev) => {
    if (ev.venue.id === venue.id) return true;
    const evVenueLower = ev.venue.name.toLowerCase();
    return (
      evVenueLower.includes(venueNameLower.replace(' milano', '')) ||
      venueNameLower.includes(evVenueLower.replace(' milano', ''))
    );
  }).sort((a, b) => a.startISO.localeCompare(b.startISO));

  const mapDatedCard = (ev: (typeof OCTOBER_EVENTS)[number], badge: string): CarouselEventCard => {
    const slug = getOctoberEventSlug(ev);
    const minOffer = ev.offers.reduce<number>(
      (acc, o) => (typeof o.price === 'number' && o.price > 0 && o.price < acc ? o.price : acc),
      999
    );
    const priceLabel = minOffer < 999 ? `€${minOffer}` : venue.priceRange || '€20';
    const dStr = ev.startISO.slice(0, 10);
    const tStr = ev.startISO.slice(11, 16) || '23:00';
    const endStr = ev.endISO ? ev.endISO.slice(11, 16) : '05:00';
    const fallbackImg = venue.image || '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp';
    return {
      id: ev.id,
      title: ev.officialName || ev.shortName || vName,
      dateLabel: dStr,
      timeLabel: `${tStr} – ${endStr}`,
      priceLabel,
      categoryLabel: ev.venue.name,
      genres: ev.genres.slice(0, 3),
      imageSrc: ev.image?.src || fallbackImg,
      href: `/${locale}/events/${slug}`,
      whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
        isIt
          ? `Ciao Nightlife Milan, vorrei info/lista/tavolo per ${ev.officialName || vName} da ${vName} (${dStr})`
          : `Hi Nightlife Milan, I'd like guest list / VIP table info for ${ev.officialName || vName} at ${vName} (${dStr})`
      )}`,
      badge,
    };
  };

  const tonight: CarouselEventCard[] = matchedDated
    .filter((ev) => ev.startISO.slice(0, 10) === todayISO)
    .map((ev) => mapDatedCard(ev, isIt ? 'STASERA LIVE' : 'TONIGHT LIVE'));

  const thisWeek: CarouselEventCard[] = matchedDated
    .filter((ev) => {
      const d = ev.startISO.slice(0, 10);
      return d >= todayISO && d <= endOfWeekISO;
    })
    .slice(0, 12)
    .map((ev) => mapDatedCard(ev, isIt ? 'QUESTA SETTIMANA' : 'THIS WEEK'));

  const future: CarouselEventCard[] = matchedDated
    .filter((ev) => ev.startISO.slice(0, 10) >= todayISO)
    .slice(0, 16)
    .map((ev) => mapDatedCard(ev, isIt ? 'DATA UFFICIALE' : 'OFFICIAL DATE'));

  const matchedWeekly = weeklyEvents.filter((w) => {
    const wLoc = w.clubName.toLowerCase();
    return (
      wLoc.includes(venueNameLower.replace(' milano', '').slice(0, 6)) ||
      venueNameLower.includes(wLoc.split(' ')[0])
    );
  });

  const fallbackImg = venue.image || '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp';
  const curatedProposals: CarouselEventCard[] = matchedWeekly.map((w) => ({
    id: `weekly-${w.id}`,
    title: w.name,
    dateLabel: isIt ? `Ogni Settimana (${w.day.toUpperCase()})` : `Weekly (${w.day.toUpperCase()})`,
    timeLabel: '20:30 – 05:00',
    priceLabel: w.pricing.club || w.pricing.aperitif || '€20',
    categoryLabel: vName,
    genres: (w.genres && w.genres.length > 0 ? w.genres : vTags).slice(0, 3),
    imageSrc: w.image || fallbackImg,
    href: `/${locale}/events/${w.eventSlug || w.id}`,
    whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
      isIt
        ? `Ciao Nightlife Milan, vorrei prenotare per la serata ${w.name} da ${vName}`
        : `Hi Nightlife Milan, I'd like to book for ${w.name} at ${vName}`
      )}`,
    badge: isIt ? 'PROPOSTA Nightlife Milan' : 'Nightlife Milan PICK',
    isRecurring: true,
  }));

  const gallery = getEnhancedVenueGallery(venue);
  const signatureProposals: CarouselEventCard[] = [
    {
      id: `${venue.id}-prop-aperitivo`,
      title: isIt ? `${vName} · Royal Aperitivo & Isola Riservata` : `${vName} · Royal Aperitivo & Reserved Island`,
      dateLabel: isIt ? 'Questa Settimana · Su Prenotazione' : 'This Week · Direct Booking',
      timeLabel: '20:00 – 22:30',
      priceLabel: '€20 – €25',
      categoryLabel: isIt ? 'Aperitivo & Lauree/Compleanni' : 'Aperitivo & Celebrations',
      genres: ['Royal Buffet', 'Cocktail Bar', 'DJ Set'],
      imageSrc: gallery[0] || fallbackImg,
      href: `/${locale}/private-parties`,
      whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
        isIt
          ? `Ciao Nightlife Milan, vorrei riservare un'isola aperitivo / festa questa settimana da ${vName}`
          : `Hi Nightlife Milan, I'd like to reserve an aperitivo island this week at ${vName}`
      )}`,
      badge: isIt ? 'PROPOSTA Nightlife Milan #1' : 'Nightlife Milan PROPOSAL #1',
      isRecurring: true,
    },
    {
      id: `${venue.id}-prop-vip`,
      title: isIt ? `${vName} · Tavolo Privé, Pista & Bottle Show` : `${vName} · VIP Privé Table & Bottle Show`,
      dateLabel: isIt ? 'Weekend & Prefestivi' : 'Weekends & Special Nights',
      timeLabel: '23:30 – 05:00',
      priceLabel: isIt ? 'Da €250 (100% Bottiglie)' : 'From €250 (100% Bottle Credit)',
      categoryLabel: isIt ? 'Tavoli VIP & Club' : 'VIP Tables & Club',
      genres: vTags.slice(0, 3),
      imageSrc: gallery[1] || gallery[0] || fallbackImg,
      href: `/${locale}/vip-tables`,
      whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
        isIt
          ? `Ciao Nightlife Milan, vorrei il listino tavoli e bottiglie per questa settimana da ${vName}`
          : `Hi Nightlife Milan, I'd like the VIP table & bottle menu for this week at ${vName}`
      )}`,
      badge: isIt ? 'PROPOSTA Nightlife Milan #2' : 'Nightlife Milan PROPOSAL #2',
      isRecurring: true,
    },
    {
      id: `${venue.id}-prop-party`,
      title: isIt
        ? `${vName} · Pacchetto Festa (Laurea, Compleanno, Celibato/Nubilato)`
        : `${vName} · Turnkey Party Package (Graduation, Birthday, Stag/Hen)`,
      dateLabel: isIt ? 'Disponibile Tutto l’Anno' : 'Available Year-Round',
      timeLabel: '20:30 – 05:00',
      priceLabel: '€25 (2 Drink + Buffet)',
      categoryLabel: isIt ? 'Feste Private & Gruppi' : 'Private Parties & Groups',
      genres: ['2 Drinks Included', 'Cake Service', 'Fast-Track'],
      imageSrc: gallery[2] || gallery[0] || fallbackImg,
      href: `/${locale}/private-parties`,
      whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
        isIt
          ? `Ciao Nightlife Milan, vorrei organizzare una festa privata da ${vName}`
          : `Hi Nightlife Milan, I'd like to organize a private celebration at ${vName}`
      )}`,
      badge: isIt ? 'PROPOSTA Nightlife Milan #3' : 'Nightlife Milan PROPOSAL #3',
      isRecurring: true,
    },
  ];

  for (const sig of signatureProposals) {
    if (curatedProposals.length < 6) curatedProposals.push(sig);
  }

  const capEvent = getCapodannoEventForClub(clubSlug);
  if (capEvent) {
    future.push({
      id: `cap-${capEvent.slug}`,
      title: isIt ? capEvent.titleIt : capEvent.titleEn,
      dateLabel: '2026-12-31',
      timeLabel: capEvent.hours || '20:30 – 06:00',
      priceLabel: `€${capEvent.priceFromEur || 50}`,
      categoryLabel: isIt ? 'Capodanno 31 Dicembre' : 'New Year’s Eve 31 Dec',
      genres: ['Cenone / Buffet', 'Countdown', 'Open Format'],
      imageSrc: capEvent.image || fallbackImg,
      href: `/${locale}/new-years-eve/${capEvent.slug}`,
      whatsappHref: `https://wa.me/393519127047?text=${encodeURIComponent(
        isIt
          ? `Ciao Nightlife Milan, vorrei info e prevendite per Capodanno da ${vName}`
          : `Hi Nightlife Milan, I'd like NYE tickets / tables info for ${vName}`
      )}`,
      badge: isIt ? 'CAPODANNO 31 DIC' : 'NYE 31 DEC',
    });
  }

  if (thisWeek.length === 0) {
    thisWeek.push(...curatedProposals.slice(0, 4));
  }
  if (future.length === 0) {
    future.push(...curatedProposals);
  }

  return { tonight, thisWeek, curatedProposals, future };
}
