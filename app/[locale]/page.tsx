import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import MfwEntry from '@/components/MfwEntry';
import OctoberEntry from '@/components/OctoberEntry';
import HomePosterCarousel, { type HomePosterSlide } from '@/components/HomePosterCarousel';
import IntentCards from '@/components/IntentCards';
import NightLine from '@/components/NightLine';
import TableConcierge from '@/components/TableConcierge';
import DateSensitiveCalendar from '@/components/DateSensitiveCalendar';
import { getEventCalendarCopy } from '@/lib/eventCalendarCopy';
import {
  getCapodannoEventsForMode,
} from '@/lib/capodannoEvents';
import {
  formatCapodannoPriceBadge35,
  getCapodannoLocalizedEventContent,
} from '@/lib/capodanno/i18n';
import { capodannoEventPath, capodannoNavigation, capodannoPath } from '@/lib/capodanno/routes';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { notFound } from 'next/navigation';
import { SITE_CONTACT } from '@/config/contact';
import { localePrefix, hreflangAlternates, getLocaleDef, isEnabledLocale } from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
import { applyEditorialFields, readEditorialFields } from '@/lib/editorialContent';
import { currentHomeDict, currentHomeGridAlts } from '@/lib/i18n/currentSafePageCopy';
import { getHeroCopy } from '@/lib/i18n/heroCopy';
import { resolveStrictPageCopy } from '@/lib/i18n/strictPageCopy';
import { getDateSensitiveCarouselInventory } from '@/lib/dateSensitiveInventory';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getTableConciergeLead, getTableConciergeSharedCopy } from '@/lib/tableConciergePageCopy';
import { venuesData } from '@/lib/venuesData';
import { venueLocationLabel } from '@/lib/venueLocation';
import { PRIORITY_VENUE_IDS, selectPriorityVenueEvents } from '@/lib/priorityVenueEvents';
import { getLocalizedText } from '@/lib/seo';

// Cache senza scadenza. Gli aggiornamenti avvengono solo al deploy o tramite
// revalidatePath dopo una modifica editoriale esplicita.
export const revalidate = 3600;

type HomeIndexedLocale = 'en' | 'it' | 'es' | 'fr' | 'de' | 'pt';
const HOME_SAFE_COPY: Record<HomeIndexedLocale, {
  title: string;
  description: string;
  venueLabel: string;
  venueDescription: string;
  venueTags: [string, string, string];
  featuredImageAlts: [string, string, string];
  keywords: string[];
  ogImageAlt: string;
  requestLabel: string;
  requestAction: string;
  requestDisclaimer: string;
  quickLabel: string;
  whatsAppMessage: string;
  nightLabel: string;
  nightTitle: string;
  curatedLabel: string;
  topVenuesTitle: string;
  allVenues: string;
  allVenuesMobile: string;
  tonightLabel: string;
  tonightTitle: string;
  tonightSubtitle: string;
  seeAll: string;
  noTonight: string;
  discoverBest: 'Compare venue profiles →' | string;
  allTonight: string;
  availabilityCta: string;
  weekLabel: string;
  weekTitle: string;
  noWeek: string;
  allWeek: string;
  discoverLabel: string;
  categoriesTitle: string;
  categoryLabels: [string, string, string, string, string, string, string, string];
  nightSteps: readonly { label: string; title: string; body: string }[];
}> = {
  en: {
    title: 'Milan Nightlife 2026/2027 | Best Clubs, VIP Tables, Guest Lists & Events',
    description: 'Official guide to Milan nightlife: compare the 20 top clubs (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic), VIP table minimum spend, guest lists and events.',
    venueLabel: 'Official Club Guide',
    venueDescription: 'Explore address, music format, dress code, VIP table minimum spend, and upcoming club nights with instant WhatsApp Concierge assistance.',
    venueTags: ['District & Address', 'Music & Format', 'VIP & Guest List'],
    featuredImageAlts: ['JustMe Milano glass pavilion and illuminated garden at Parco Sempione', 'Rooftop aperitivo terrace in Milan at sunset', 'VIP bottle service table at a luxury Milan nightclub'],
    keywords: ['milan nightlife', 'best clubs milan', 'vip tables milan', 'guest list milan clubs', 'aperitivo milan', 'tonight events milan', 'bottle service milan'],
    ogImageAlt: 'Milan Nightlife Official Guide: VIP Tables, Clubs & Events',
    requestLabel: 'VIP Concierge Desk',
    requestAction: 'Book via WhatsApp Concierge',
    requestDisclaimer: 'Fast-track VIP table quotes, bottle lists, and nominal guest list registration via WhatsApp +39 351 912 7047.',
    quickLabel: '7/7 WhatsApp Desk',
    whatsAppMessage: 'Hi Nightlife Milan! I would like to check VIP table / guest list options in Milan for my date.',
    nightLabel: 'The Three Acts of the Night', nightTitle: 'How a Night Out in Milan Works',
    curatedLabel: 'Priority Six Club Selection', topVenuesTitle: 'Top Nightclubs & Lounges in Milan', allVenues: 'Explore all 20 clubs', allVenuesMobile: 'See all 20 clubs →',
    tonightLabel: 'Tonight in Milan', tonightTitle: "Tonight's Club Events", tonightSubtitle: 'Upcoming club nights & DJ sets in Milan', seeAll: 'View full calendar',
    noTonight: 'Explore upcoming weekend and special events or message our WhatsApp Concierge for tonight’s best tables.', discoverBest: 'Compare all 20 Milan clubs →', allTonight: "All tonight's events →",
    availabilityCta: 'Request instant VIP table & guest list availability on WhatsApp.', weekLabel: 'Upcoming Calendar', weekTitle: 'This Week & Weekend in Milan',
    noWeek: 'Message our WhatsApp Concierge (+39 351 912 7047) for private events, aperitivo tables, and weekend VIP reservations.', allWeek: "Full Milan events calendar →",
    discoverLabel: 'Explore Milan by Style', categoriesTitle: 'Browse Nightlife by Category & District',
    categoryLabels: ['Techno & Underground', 'VIP Tables & Privé', 'Royal Aperitivo', 'Navigli District', 'Corso Como & Garibaldi', '2026/2027 Guides', 'VIP Concierge Desk', 'All 20 Milan Clubs'],
    nightSteps: [
      { label: 'Act I · 19:30 - 22:30', title: 'Royal Aperitivo & Sunset Rooftops', body: 'Start your evening in Parco Sempione, Brera, Corso Como, or CityLife with signature cocktails, dinner platters, and warm-up DJ sets.' },
      { label: 'Act II · 23:30 - 01:15', title: 'Club Doors, Guest Lists & Selection', body: 'Arrive before 00:45 for nominal guest-list entry or walk straight to the VIP Host desk with your confirmed table reservation.' },
      { label: 'Act III · 01:15 - 05:00', title: 'Peak-Time Dancefloor & VIP Privé', body: 'Enjoy international guest DJs, sparkler bottle service, and private banquette tables across Milan’s six flagship clubs.' },
    ],
  },
  it: {
    title: 'Vita Notturna Milano 2026/2027 | Migliori Club, Tavoli VIP, Liste ed Eventi',
    description: 'Guida ufficiale alla nightlife di Milano: confronta i 20 migliori club (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic), prezzi tavoli VIP, liste ed eventi.',
    venueLabel: 'Scheda Ufficiale Club',
    venueDescription: 'Scopri indirizzo, genere musicale, dress code, minimum spend tavoli VIP e prossime serate con assistenza immediata WhatsApp Concierge.',
    venueTags: ['Quartiere & Indirizzo', 'Musica & Format', 'Tavoli VIP & Lista'],
    featuredImageAlts: ['Padiglione in vetro e giardino illuminato del JustMe Milano a Parco Sempione', 'Terrazza aperitivo panoramica a Milano al tramonto', 'Servizio bottle show al tavolo VIP in un club di Milano'],
    keywords: ['vita notturna milano', 'migliori discoteche milano', 'tavoli vip milano', 'liste discoteche milano', 'aperitivo milano', 'serate milano stasera', 'bottle service milano'],
    ogImageAlt: 'Guida Ufficiale Vita Notturna Milano: Tavoli VIP, Club ed Eventi',
    requestLabel: 'Concierge Tavoli & Liste',
    requestAction: 'Prenota su WhatsApp Concierge',
    requestDisclaimer: 'Preventivi rapidi tavoli VIP, listini bottiglie e accredito in lista nominale su WhatsApp +39 351 912 7047.',
    quickLabel: 'Desk WhatsApp 7/7',
    whatsAppMessage: 'Ciao Nightlife Milan! Vorrei ricevere le opzioni tavoli VIP e lista per la mia serata a Milano.',
    nightLabel: 'I Tre Atti della Notte', nightTitle: 'Come Funziona la Serata Perfetta a Milano',
    curatedLabel: 'Selezione Ufficiale 6 Club', topVenuesTitle: 'I Migliori Club e Discoteche di Milano', allVenues: 'Tutti i 20 club di Milano', allVenuesMobile: 'Vedi tutti i 20 club →',
    tonightLabel: 'Stasera a Milano', tonightTitle: 'Eventi e Serate di Stasera', tonightSubtitle: 'Serate in programma e DJ set nei club di Milano', seeAll: 'Calendario completo',
    noTonight: 'Scopri i prossimi eventi in calendario o scrivi su WhatsApp per i tavoli e le serate consigliate stasera.', discoverBest: 'Confronta i 20 club di Milano →', allTonight: 'Tutti gli eventi di stasera →',
    availabilityCta: 'Richiedi disponibilità tavoli VIP e liste su WhatsApp.', weekLabel: 'Calendario Settimanale', weekTitle: 'Prossime Serate della Settimana a Milano',
    noWeek: 'Scrivi al Concierge WhatsApp (+39 351 912 7047) per prenotare Royal Aperitivo, liste e Tavoli Privé nel weekend.', allWeek: 'Calendario completo eventi →',
    discoverLabel: 'Esplora per Stile e Quartiere', categoriesTitle: 'Club e Quartieri di Milano',
    categoryLabels: ['Club Techno & Underground', 'Tavoli VIP & Privé', 'Royal Aperitivo Milano', 'Quartiere Navigli', 'Corso Como & Garibaldi', 'Guide Ufficiali 2026/2027', 'Servizio VIP Concierge', 'Tutti i 20 Club Milano'],
    nightSteps: [
      { label: 'Atto I · 19:30 - 22:30', title: 'Royal Aperitivo & Rooftop al Tramonto', body: 'Inizia la serata tra Parco Sempione, Brera, Corso Como o CityLife con signature cocktail, buffet gourmet o tavolo aperitivo con DJ set.' },
      { label: 'Atto II · 23:30 - 01:15', title: 'Apertura Club, Liste & Selezione Porta', body: 'Entra entro le 00:45 in lista nominale oppure accedi dalla corsia prioritaria VIP Host con il tuo tavolo riservato.' },
      { label: 'Atto III · 01:15 - 05:00', title: 'Peak-Time in Pista & Tavoli Privé', body: 'Vivi il clou della notte tra guest DJ internazionali, bottle show al tavolo e aree Privé nei sei club di riferimento di Milano.' },
    ],
  },
  es: {
    title: 'Vida Nocturna Milán 2026/2027 | Mejores Discotecas, Mesas VIP y Eventos',
    description: 'Guía oficial de la noche en Milán: compara los 20 mejores clubes (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic), mesas VIP, listas y eventos.',
    venueLabel: 'Guía Oficial del Club',
    venueDescription: 'Consulta dirección, estilo musical, dress code, consumo mínimo de mesas VIP y próximos eventos con asistencia por WhatsApp.',
    venueTags: ['Barrio y Dirección', 'Música y Formato', 'Mesas VIP y Lista'],
    featuredImageAlts: ['Pabellón de cristal y jardín iluminado de JustMe Milano en Parco Sempione', 'Terraza de aperitivo en Milán al atardecer', 'Servicio de botellas en mesa VIP en Milán'],
    keywords: ['vida nocturna milán', 'mejores discotecas milán', 'mesas vip milán', 'aperitivo milán', 'eventos milán hoy', 'guía nocturna milán'],
    ogImageAlt: 'Guía Oficial de la Vida Nocturna de Milán',
    requestLabel: 'Concierge VIP Milán',
    requestAction: 'Reservar por WhatsApp',
    requestDisclaimer: 'Presupuestos de mesas VIP, cartas de botellas y listas nominales por WhatsApp +39 351 912 7047.',
    quickLabel: 'Atención WhatsApp 7/7',
    whatsAppMessage: '¡Hola Nightlife Milan! Quiero consultar opciones de mesa VIP y lista en Milán para mi fecha.',
    nightLabel: 'Los Tres Actos de la Noche', nightTitle: 'Cómo Funciona la Noche en Milán',
    curatedLabel: 'Selección Oficial 6 Clubes', topVenuesTitle: 'Los Mejores Clubes y Discotecas de Milán', allVenues: 'Todos los 20 clubes', allVenuesMobile: 'Ver todos los clubes →',
    tonightLabel: 'Esta Noche', tonightTitle: 'Eventos de Esta Noche', tonightSubtitle: 'Fiestas y sesiones DJ en Milán', seeAll: 'Ver calendario',
    noTonight: 'Consulta los próximos eventos de la semana o escríbenos por WhatsApp para reservar mesa VIP.', discoverBest: 'Comparar clubes de Milán →', allTonight: 'Todos los eventos de hoy →',
    availabilityCta: 'Consulta disponibilidad de mesas VIP por WhatsApp.', weekLabel: 'Esta Semana', weekTitle: 'Próximos Eventos en Milán',
    noWeek: 'Escríbenos por WhatsApp (+39 351 912 7047) para reservar mesas VIP y listas este fin de semana.', allWeek: 'Calendario completo →',
    discoverLabel: 'Explorar por Categoría', categoriesTitle: 'Descubre Milán por Estilo y Zona',
    categoryLabels: ['Clubes de Techno', 'Mesas VIP y Privé', 'Aperitivo en Milán', 'Zona Navigli', 'Zona Corso Como', 'Guías Oficiales 2026/2027', 'Servicio Concierge', 'Los 20 Clubes de Milán'],
    nightSteps: [
      { label: 'Acto I · 19:30 - 22:30', title: 'Royal Aperitivo y Terrazas', body: 'Empieza la tarde en Parco Sempione, Brera, Corso Como o CityLife con cócteles de autor, buffet gourmet y DJ set.' },
      { label: 'Acto II · 23:30 - 01:15', title: 'Entrada en Lista y Selección', body: 'Accede antes de las 00:45 por lista nominal o entra sin cola por el acceso VIP Host con tu mesa reservada.' },
      { label: 'Acto III · 01:15 - 05:00', title: 'Privé, Bottle Show y DJ Sets', body: 'Disfruta del momento cumbre de la noche con DJs internacionales y servicio de botellas en los seis clubes de referencia de Milán.' },
    ],
  },
  fr: {
    title: "Vie Nocturne à Milan 2026/2027 | Meilleurs Clubs, Tables VIP et Soirées",
    description: "Guide officiel de la nuit à Milan : comparez les 20 meilleurs clubs (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic), tables VIP, guest lists et soirées.",
    venueLabel: 'Fiche Officielle Club',
    venueDescription: 'Découvrez l’adresse, le style musical, le dress code, les tarifs tables VIP et les prochaines soirées avec notre Concierge WhatsApp.',
    venueTags: ['Quartier & Adresse', 'Musique & Format', 'Tables VIP & Liste'],
    featuredImageAlts: ['Pavillon vitré et jardin illuminé du JustMe Milano à Parco Sempione', 'Terrasse aperitivo à Milan au coucher du soleil', 'Service bouteille table VIP à Milan'],
    keywords: ['vie nocturne milan', 'meilleurs clubs milan', 'tables vip milan', 'aperitivo milan', 'soirées milan', 'guide clubs milan'],
    ogImageAlt: 'Guide Officiel de la Vie Nocturne à Milan',
    requestLabel: 'Conciergerie VIP Milan',
    requestAction: 'Réserver sur WhatsApp',
    requestDisclaimer: 'Devis tables VIP, cartes des bouteilles et guest lists sur WhatsApp +39 351 912 7047.',
    quickLabel: 'Concierge WhatsApp 7/7',
    whatsAppMessage: 'Bonjour Nightlife Milan ! Je souhaite connaître les options de table VIP et guest list à Milan pour ma date.',
    nightLabel: 'Les Trois Actes de la Nuit', nightTitle: 'Comment Fonctionne la Nuit à Milan',
    curatedLabel: 'Sélection Officielle 6 Clubs', topVenuesTitle: 'Les Meilleurs Clubs et Discothèques de Milan', allVenues: 'Les 20 clubs de Milan', allVenuesMobile: 'Voir tous les clubs →',
    tonightLabel: 'Ce Soir', tonightTitle: 'Soirées de Ce Soir', tonightSubtitle: 'Programmation clubs et DJ sets à Milan', seeAll: 'Voir le calendrier',
    noTonight: 'Découvrez les prochaines soirées de la semaine ou contactez notre Concierge WhatsApp.', discoverBest: 'Comparer les clubs de Milan →', allTonight: 'Toutes les soirées de ce soir →',
    availabilityCta: 'Demandez la disponibilité des tables VIP sur WhatsApp.', weekLabel: 'Cette Semaine', weekTitle: 'Prochaines Soirées à Milan',
    noWeek: 'Contactez-nous sur WhatsApp (+39 351 912 7047) pour vos réservations de tables VIP ce week-end.', allWeek: 'Calendrier complet →',
    discoverLabel: 'Explorer par Catégorie', categoriesTitle: 'Choisissez Votre Ambiance à Milan',
    categoryLabels: ['Clubs Techno', 'Tables VIP & Privé', 'Aperitivo à Milan', 'Quartier Navigli', 'Quartier Corso Como', 'Guides Officiels 2026/2027', 'Service Concierge', 'Les 20 Clubs de Milan'],
    nightSteps: [
      { label: 'Acte I · 19:30 - 22:30', title: 'Royal Aperitivo & Rooftops', body: 'Commencez la soirée à Parco Sempione, Brera, Corso Como ou CityLife avec cocktails signature, buffet gourmet et DJ set.' },
      { label: 'Acte II · 23:30 - 01:15', title: 'Guest Lists & Sélection Porte', body: 'Arrivez avant 00h45 en guest list nominative ou profitez de l’accueil prioritaire VIP Host avec votre table réservée.' },
      { label: 'Acte III · 01:15 - 05:00', title: 'Peak-Time & Carré VIP Privé', body: 'Vivez l’apogée de la nuit milanaise avec DJs internationaux et service bouteille dans les six clubs phares de Milan.' },
    ],
  },
  de: {
    title: 'Nachtleben Mailand 2026/2027 | Beste Clubs, VIP-Tische, Gästelisten & Events',
    description: 'Offizieller Guide für das Mailänder Nachtleben: die 20 besten Clubs (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic), VIP-Tische, Mindestverzehr & Partys.',
    venueLabel: 'Offizielles Club-Profil',
    venueDescription: 'Adresse, Musikstil, Dresscode, VIP-Tisch-Mindestverzehr und kommende Partys mit direktem WhatsApp-Concierge.',
    venueTags: ['Viertel & Adresse', 'Musik & Format', 'VIP-Tisch & Liste'],
    featuredImageAlts: ['Glaspavillon und beleuchteter Garten des JustMe Milano im Parco Sempione', 'Dachterrasse bei Sonnenuntergang in Mailand', 'VIP-Bottle-Service in einem Mailänder Club'],
    keywords: ['nachtleben mailand', 'beste clubs mailand', 'vip tische mailand', 'aperitivo mailand', 'partys mailand heute', 'club guide mailand'],
    ogImageAlt: 'Offizieller Guide zum Nachtleben in Mailand',
    requestLabel: 'VIP-Concierge Mailand',
    requestAction: 'Per WhatsApp reservieren',
    requestDisclaimer: 'VIP-Tisch-Angebote, Flaschenpreislisten und Gästelisten per WhatsApp +39 351 912 7047.',
    quickLabel: 'WhatsApp-Desk 7/7',
    whatsAppMessage: 'Hallo Nightlife Milan! Ich möchte VIP-Tisch- und Gästelisten-Optionen in Mailand für mein Datum anfragen.',
    nightLabel: 'Die Drei Akte der Nacht', nightTitle: 'So Funktioniert die Perfekte Nacht in Mailand',
    curatedLabel: 'Offizielle Top-6-Auswahl', topVenuesTitle: 'Die Besten Clubs & Lounges in Mailand', allVenues: 'Alle 20 Clubs', allVenuesMobile: 'Alle 20 Clubs ansehen →',
    tonightLabel: 'Heute Abend', tonightTitle: 'Events Heute Abend', tonightSubtitle: 'Kommende Clubnächte & DJ-Sets in Mailand', seeAll: 'Kalender ansehen',
    noTonight: 'Entdecken Sie die kommenden Wochenend-Events oder schreiben Sie unserem WhatsApp-Concierge.', discoverBest: 'Mailänder Clubs vergleichen →', allTonight: 'Alle heutigen Events →',
    availabilityCta: 'VIP-Tisch-Verfügbarkeit direkt per WhatsApp anfragen.', weekLabel: 'Diese Woche', weekTitle: 'Kommende Events in Mailand',
    noWeek: 'Schreiben Sie uns per WhatsApp (+39 351 912 7047) für VIP-Tische und Gästelisten am Wochenende.', allWeek: 'Vollständiger Kalender →',
    discoverLabel: 'Nach Stil Entdecken', categoriesTitle: 'Nachtleben nach Kategorie & Viertel',
    categoryLabels: ['Techno & Underground', 'VIP-Tische & Privé', 'Royal Aperitivo', 'Navigli-Viertel', 'Corso Como & Garibaldi', 'Club-Guides 2026/2027', 'Concierge-Service', 'Alle 20 Mailänder Clubs'],
    nightSteps: [
      { label: 'Akt I · 19:30 - 22:30', title: 'Royal Aperitivo & Sunset-Terrassen', body: 'Starten Sie im Parco Sempione, Brera, Corso Como oder CityLife mit Drinks, Gourmet-Buffet und Warm-up-DJ-Sets.' },
      { label: 'Akt II · 23:30 - 01:15', title: 'Club-Einlass, Gästeliste & Dresscode', body: 'Kommen Sie vor 00:45 Uhr über die Gästeliste oder nutzen Sie den direkten VIP-Host-Empfang mit reserviertem Tisch.' },
      { label: 'Akt III · 01:15 - 05:00', title: 'Peak-Time Dancefloor & VIP-Privé', body: 'Erleben Sie internationale DJs und Bottle-Service in Mailands sechs führenden Clubs.' },
    ],
  },
  pt: {
    title: 'Vida Noturna Milão 2026/2027 | Melhores Clubes, Mesas VIP, Listas e Eventos',
    description: 'Guia oficial da noite em Milão: compare os 20 melhores clubes (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic), mesas VIP, listas e festas.',
    venueLabel: 'Guia Oficial do Clube',
    venueDescription: 'Confira endereço, estilo musical, dress code, consumação mínima de mesas VIP e próximas festas com suporte via WhatsApp.',
    venueTags: ['Bairro e Endereço', 'Música e Formato', 'Mesas VIP e Lista'],
    featuredImageAlts: ['Pavilhão de vidro e jardim iluminado do JustMe Milano no Parco Sempione', 'Terraço de aperitivo ao pôr do sol em Milão', 'Serviço de garrafas em mesa VIP em Milão'],
    keywords: ['vida noturna milão', 'melhores clubes milão', 'mesas vip milão', 'aperitivo milão', 'eventos milão hoje', 'guia noturno milão'],
    ogImageAlt: 'Guia Oficial da Vida Noturna de Milão',
    requestLabel: 'Concierge VIP Milão',
    requestAction: 'Reservar pelo WhatsApp',
    requestDisclaimer: 'Cotações de mesas VIP, cartas de garrafas e listas nominais pelo WhatsApp +39 351 912 7047.',
    quickLabel: 'Atendimento WhatsApp 7/7',
    whatsAppMessage: 'Olá Nightlife Milan! Quero consultar opções de mesa VIP e lista em Milão para a minha data.',
    nightLabel: 'Os Três Atos da Noite', nightTitle: 'Como Funciona a Noite em Milão',
    curatedLabel: 'Seleção Oficial 6 Clubes', topVenuesTitle: 'Os Melhores Clubes e Discotecas de Milão', allVenues: 'Todos os 20 clubes', allVenuesMobile: 'Ver todos os clubes →',
    tonightLabel: 'Hoje à Noite', tonightTitle: 'Eventos de Hoje', tonightSubtitle: 'Festas e DJ sets em Milão', seeAll: 'Ver calendário',
    noTonight: 'Veja os próximos eventos da semana ou fale com nosso Concierge no WhatsApp.', discoverBest: 'Comparar clubes de Milão →', allTonight: 'Todos os eventos de hoje →',
    availabilityCta: 'Peça a disponibilidade de mesas VIP pelo WhatsApp.', weekLabel: 'Esta Semana', weekTitle: 'Próximos Eventos Desta Semana',
    noWeek: 'Fale conosco no WhatsApp (+39 351 912 7047) para reservar mesas VIP neste fim de semana.', allWeek: 'Calendário completo →',
    discoverLabel: 'Explorar por Categoria', categoriesTitle: 'Descubra Milão por Estilo e Bairro',
    categoryLabels: ['Clubes de Techno', 'Mesas VIP e Privé', 'Aperitivo em Milão', 'Zona Navigli', 'Zona Corso Como', 'Guias Oficiais 2026/2027', 'Serviço de Concierge', 'Os 20 Clubes de Milão'],
    nightSteps: [
      { label: 'Ato I · 19:30 - 22:30', title: 'Royal Aperitivo e Terraços', body: 'Comece a noite no Parco Sempione, Brera, Corso Como ou CityLife com drinks autorais, buffet gourmet e DJ set.' },
      { label: 'Ato II · 23:30 - 01:15', title: 'Abertura, Listas e Seleção', body: 'Chegue antes das 00:45 na lista nominal ou entre sem fila pelo acesso VIP Host com sua mesa reservada.' },
      { label: 'Ato III · 01:15 - 05:00', title: 'Peak-Time, Privé e Bottle Show', body: 'Viva o auge da noite milanesa com DJs internacionais e serviço de garrafas nos seis principais clubes de Milão.' },
    ],
  },
};

function getHomeSafeCopy(locale: string) {
  return resolveStrictPageCopy(locale, HOME_SAFE_COPY, currentHomeDict, {
    trace: 'home',
  });
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  const copy = applyEditorialFields(
    getHomeSafeCopy(locale),
    await readEditorialFields('home', locale),
  );
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  // Bug fix: prima collassava a it/en, mandando il canonical/og:url di 33
  // lingue su 35 alla root inglese · in contraddizione con gli hreflang
  // alternates della stessa pagina (rischio reale di deindicizzazione).
  const canonical = `${baseUrl}${localePrefix(locale)}` || baseUrl;
  const ogImage = `${baseUrl}/images/table-concierge/justme-night.webp`;

  const meta35 = getHubSeoMeta35('home', locale);
  const title = seoTitle(meta35.title);
  const description = withWhatsApp(meta35.description, locale);

  return {
    title,
    description,
    keywords: copy.keywords,
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, ''),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{ url: ogImage, width: 1200, height: 900, alt: copy.ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@nightlifemilan',
    },
  };
}

// ─── Featured venues shown in the homepage strip ───────────────────────────
const FEATURED_VENUES = PRIORITY_VENUE_IDS;

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  const homeCopy = applyEditorialFields(
    getHomeSafeCopy(locale),
    await readEditorialFields('home', locale),
  );
  const homeGridAlts = currentHomeGridAlts(locale);
  // Locale REALE ovunque (prima era coerciato a en/it → su /es, /fr, ecc. eventi,
  // card e link interni finivano in inglese). Il prefisso URL e i contenuti
  // localizzati usano il locale selezionato.
  const lp = localePrefix(locale);
  const featuredVenues = FEATURED_VENUES.map((id) => {
    const venue = venuesData.find((candidate) => candidate.id === id);
    if (!venue || !venue.image) throw new Error(`Missing featured venue ${id}`);
    const rawDesc = getLocalizedText(venue.localizedContent.description, locale) || homeCopy.venueDescription;
    const shortDesc = rawDesc.length > 210 ? rawDesc.slice(0, 207).replace(/\s+\S*$/, '') + '…' : rawDesc;
    const priorityZoneOverrides: Record<string, { it: string; en: string }> = {
      'v-justme': { it: 'PARCO SEMPIONE · TORRE BRANCA', en: 'PARCO SEMPIONE · TORRE BRANCA' },
      'v-pineta': { it: 'PORTA GARIBALDI · VIA MESSINA', en: 'PORTA GARIBALDI · VIA MESSINA' },
      'v-aria': { it: 'SAN SIRO · PARCO IPPODROMO', en: 'SAN SIRO · HIPPODROME PARK' },
      'v-55milano': { it: 'SEMPIONE · ARCO DELLA PACE', en: 'SEMPIONE · ARCO DELLA PACE' },
      'v-voya': { it: 'PORTELLO / CITYLIFE · 20° PIANO', en: 'PORTELLO / CITYLIFE · 20TH FLOOR' },
      'v-repvblic': { it: 'PIAZZA DELLA REPUBBLICA · PORTA NUOVA', en: 'PIAZZA DELLA REPUBBLICA · PORTA NUOVA' },
    };
    const displayZone = priorityZoneOverrides[id]?.[locale === 'it' ? 'it' : 'en'] || venueLocationLabel(venue);
    const street = venue.address?.streetAddress ? `${venue.address.streetAddress} · ${displayZone}` : displayZone;
    const venueGenres = (venue as { musicGenre?: string[]; genres?: string[]; category?: string }).musicGenre || (venue as { genres?: string[] }).genres || [];
    const genres = venueGenres.slice(0, 2).join(' · ') || 'House · Commercial · Hip-Hop';
    const dress = venue.localizedContent?.dressCode ? getLocalizedText(venue.localizedContent.dressCode, locale) : 'Smart & Fashion Chic';
    return {
      id,
      slug: getLocalizedText(venue.slugs, locale),
      image: venue.image,
      name: getLocalizedText(venue.localizedContent.name, locale),
      zone: displayZone,
      street,
      description: shortDesc,
      genres,
      dress,
    };
  });

  // Niente LocalBusiness qui: Nightlife Milan è già rappresentata dal
  // Organization site-wide nel layout · due entità dello stesso soggetto con
  // @type diversi sulla stessa pagina confondono Google, non aiutano.

  // Send the whole verified dated future catalog once. The client recomputes
  // Rome-day windows at hydration, on visibility return and at midnight; no
  // weekly programme can reappear from an indefinitely cached home document.
  const initialNow = new Date();
  const dateSensitiveEvents = selectPriorityVenueEvents(await getDateSensitiveCarouselInventory(locale), initialNow);
  const posterSlides: HomePosterSlide[] = getCapodannoEventsForMode('capodanno-2027')
    .slice(0, 18)
    .map((ev) => {
      const locEv = getCapodannoLocalizedEventContent(ev, locale);
      return {
        slug: ev.slug,
        venueName: ev.venueName,
        title: locEv.title,
        subtitle: locEv.subtitle,
        image: ev.image,
        priceFromEur: ev.priceFromEur,
        priceBadge: formatCapodannoPriceBadge35(ev, locale),
        href: capodannoEventPath(ev.slug, locale),
        musicAndFormat: locEv.musicAndFormat,
        city: ev.city,
      };
    });
  const capodannoNav = capodannoNavigation(locale);

  const waLink = getConciergeBookingUrl(locale, undefined, lp || '/');
  const formerHeroCopy = getHeroCopy(locale);
  const uiLabels = (() => {
    switch (locale) {
      case 'it':
        return {
          details: 'SCHEDA',
          vipBtn: 'TAVOLO VIP ↗',
          swipe: 'SCORRI I 6 CLUB →',
          formulaVal: 'Aperitivo · Lista · Privé',
          sanSiroEye: 'STADIO SAN SIRO · SERIE A & CHAMPIONS LEAGUE 2026/2027',
          sanSiroTitle: 'Dopo-Partita Calcio San Siro (Inter & Milan)',
          sanSiroBody: 'Aria Club a 150m dallo stadio, Just Me Torre Branca aperto 7/7, Voya Rooftop via M5, 55 Milano, Pineta e Repvblic: calcola il piano post-match e prenota Tavolo VIP su WhatsApp +39 351 912 7047.',
          sanSiroCta: 'SCOPRI I DOPO-PARTITA ↗',
          act1: 'ATTO I · H 19:30 ROYAL APERITIVO & ROOFTOP',
          act2: 'ATTO II · H 23:30 APERTURA & LISTA',
          act3: 'ATTO III · H 01:30 PRIVÉ & BOTTLE SERVICE',
        };
      case 'es':
        return {
          details: 'FICHA',
          vipBtn: 'MESA VIP ↗',
          swipe: 'DESLIZA LOS 6 CLUBES →',
          formulaVal: 'Aperitivo · Lista · Privé',
          sanSiroEye: 'ESTADIO SAN SIRO · SERIE A & CHAMPIONS LEAGUE 2026/2027',
          sanSiroTitle: 'Guía Oficial Post-Partido San Siro Milán (Inter y AC Milan)',
          sanSiroBody: 'Aria Club a 150m del estadio, Just Me Torre Branca abierto 7/7, Voya Rooftop vía M5, 55 Milano, Pineta y Repvblic: organiza tu noche post-partido y reserva Mesa VIP por WhatsApp +39 351 912 7047.',
          sanSiroCta: 'VER GUÍA POST-PARTIDO ↗',
          act1: 'ACTO I · H 19:30 ROYAL APERITIVO & ROOFTOP',
          act2: 'ACTO II · H 23:30 ENTRADA & LISTA',
          act3: 'ACTO III · H 01:30 PRIVÉ & BOTTLE SERVICE',
        };
      case 'fr':
        return {
          details: 'FICHE',
          vipBtn: 'TABLE VIP ↗',
          swipe: 'FAITES DÉFILER LES 6 CLUBS →',
          formulaVal: 'Aperitivo · Liste · Privé',
          sanSiroEye: 'STADE SAN SIRO · SERIE A & CHAMPIONS LEAGUE 2026/2027',
          sanSiroTitle: 'Guide Officiel Après-Match San Siro Milan (Inter & AC Milan)',
          sanSiroBody: 'Aria Club à 150m du stade, Just Me Torre Branca ouvert 7j/7, Voya Rooftop via M5, 55 Milano, Pineta et Repvblic : préparez votre soirée d’après-match et réservez sur WhatsApp +39 351 912 7047.',
          sanSiroCta: 'VOIR LES APRÈS-MATCHS ↗',
          act1: 'ACTE I · 19H30 ROYAL APERITIVO & ROOFTOP',
          act2: 'ACTE II · 23H30 OUVERTURE & GUEST LIST',
          act3: 'ACTE III · 01H30 PRIVÉ & BOTTLE SERVICE',
        };
      case 'de':
        return {
          details: 'PROFIL',
          vipBtn: 'VIP-TISCH ↗',
          swipe: '6 CLUBS DURCHWISCHEN →',
          formulaVal: 'Aperitivo · Liste · Privé',
          sanSiroEye: 'SAN-SIRO-STADION · SERIE A & CHAMPIONS LEAGUE 2026/2027',
          sanSiroTitle: 'Offizieller San-Siro-Afterparty-Guide Mailand (Inter & AC Milan)',
          sanSiroBody: 'Aria Club 150m vom Stadion, Just Me Torre Branca 7/7 geöffnet, Voya Rooftop via M5, 55 Milano, Pineta & Repvblic: planen Sie Ihre Afterparty und buchen Sie VIP-Tische per WhatsApp +39 351 912 7047.',
          sanSiroCta: 'AFTERPARTYS ANSEHEN ↗',
          act1: 'AKT I · 19:30 ROYAL APERITIVO & ROOFTOP',
          act2: 'AKT II · 23:30 EINLASS & GÄSTELISTE',
          act3: 'AKT III · 01:30 PRIVÉ & BOTTLE SERVICE',
        };
      case 'pt':
        return {
          details: 'PERFIL',
          vipBtn: 'MESA VIP ↗',
          swipe: 'DESLIZE OS 6 CLUBES →',
          formulaVal: 'Aperitivo · Lista · Privé',
          sanSiroEye: 'ESTÁDIO SAN SIRO · SERIE A & CHAMPIONS LEAGUE 2026/2027',
          sanSiroTitle: 'Guia Oficial Pós-Jogo San Siro Milão (Inter e AC Milan)',
          sanSiroBody: 'Aria Club a 150m do estádio, Just Me Torre Branca aberto 7/7, Voya Rooftop via M5, 55 Milano, Pineta e Repvblic: planeje a noite pós-jogo e reserve Mesa VIP no WhatsApp +39 351 912 7047.',
          sanSiroCta: 'VER PÓS-JOGO ↗',
          act1: 'ATO I · 19:30 ROYAL APERITIVO & ROOFTOP',
          act2: 'ATO II · 23:30 ABERTURA & GUEST LIST',
          act3: 'ATO III · 01:30 PRIVÉ & BOTTLE SERVICE',
        };
      default:
        return {
          details: 'PROFILE',
          vipBtn: 'VIP TABLE ↗',
          swipe: 'SWIPE THE 6 CLUBS →',
          formulaVal: 'Aperitivo · Guest List · VIP',
          sanSiroEye: 'SAN SIRO STADIUM · SERIE A & CHAMPIONS LEAGUE 2026/2027',
          sanSiroTitle: 'Official San Siro Football Afterparty Guide (Inter & AC Milan)',
          sanSiroBody: 'Aria Club 150m from the stadium, Just Me Torre Branca open 7/7, Voya Rooftop via M5, 55 Milano, Pineta & Repvblic: plan your post-match night and book VIP tables via WhatsApp +39 351 912 7047.',
          sanSiroCta: 'EXPLORE AFTERPARTIES ↗',
          act1: 'ACT I · 19:30 ROYAL APERITIVO & SUNSET',
          act2: 'ACT II · 23:30 DOORS & GUEST LIST',
          act3: 'ACT III · 01:30 PRIVÉ & BOTTLE SERVICE',
        };
    }
  })();

  return (
    <>
      <main className="flex-1 flex flex-col w-full">
        <NightLine />

        {/* ── 1. Hero ───────────────────────────────────────────────────── */}
        <TableConcierge
          locale={locale}
          events={dateSensitiveEvents}
          initialNow={initialNow.toISOString()}
          surface="home"
          showEventList={false}
          homeIntro={{
            sub: formerHeroCopy.sub,
            pills: formerHeroCopy.pills,
            ctaSub: formerHeroCopy.ctaSub,
            allVenues: formerHeroCopy.allVenues,
          }}
          copy={{
            ...getTableConciergeSharedCopy(locale),
            title: formerHeroCopy.h1,
            lead: getTableConciergeLead(locale),
            eyebrow: formerHeroCopy.label,
            disclaimer: homeCopy.requestDisclaimer,
            eventsLead: homeCopy.weekTitle,
            allEvents: homeCopy.seeAll,
          }}
        />
        {/* ── Fascia Sartoriale dei Quartieri Notturni ─────────────────── */}
        <div className="w-full border-b border-white/14 bg-[#0A0A0C]">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-x border-white/14 px-5 py-5 text-[13px] font-semibold text-[#EDEBE6] sm:px-14">
            <span>Parco Sempione</span>
            <span>Porta Garibaldi</span>
            <span className="hidden sm:inline">Porta Nuova Skyline</span>
            <span className="hidden md:inline">San Siro Garden</span>
            <span className="hidden lg:inline">Repubblica</span>
            <span className="hidden xl:inline">Corso Como &amp; Navigli</span>
          </div>
        </div>

        {/* ── 1B. Carosello Capodanno 2027 & Live Countdown (S17) ───────── */}
        <HomePosterCarousel
          locale={locale}
          slides={posterSlides}
          hubHref={capodannoPath(locale)}
          hubLabel={`${capodannoNav.menuLabel} 2027`}
        />

        {/* ── 2. I Sei Santuari della Notte (S17 Carta Calda + Bianco) ── */}
        <section className="w-full border-b border-[#0A0A0C]/16 bg-[#EDEBE6] text-[#0A0A0C]">
          <div className="mx-auto max-w-[1440px] border-x border-[#0A0A0C]/16">
            {/* Header Editoriale della Collezione */}
            <div className="flex flex-col justify-between gap-6 border-b border-[#0A0A0C]/16 px-5 pb-10 pt-16 sm:flex-row sm:items-end sm:px-14 sm:pb-12 sm:pt-20">
              <div data-reveal="rise">
                <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.94] text-[#0A0A0C] sm:text-4xl lg:text-[68px]">
                  {homeCopy.topVenuesTitle}
                </h2>
                <p className="mt-3 max-w-[60ch] font-sans text-sm font-semibold text-[#4F4D48]">
                  {homeCopy.curatedLabel}
                </p>
              </div>
              <Link
                href={`${lp}/clubs`}
                prefetch={false}
                className="nlm-pressable inline-flex min-h-[48px] shrink-0 items-center justify-center border border-[#0A0A0C] bg-[#FFFFFF] px-7 py-3.5 text-[13px] font-bold uppercase text-[#0A0A0C] transition-colors hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
              >
                {homeCopy.allVenues} ↗
              </Link>
            </div>

            {/* VISTA DESKTOP WIDESCREEN 1440PX: 2 FLAGSHIP SPREADS A 12 COLONNE + GRIGLIA PANORAMICA 2x2 */}
            <div className="hidden lg:block">
              {featuredVenues.slice(0, 2).map((v, idx) => (
                <article
                  key={v.id}
                  className="group grid grid-cols-12 border-b border-[#0A0A0C]/16"
                >
                  {/* Colonna Fotografica 16:10 (a sinistra per 01, a destra per 02) */}
                  <div
                    data-reveal="clip"
                    className={`col-span-7 flex flex-col justify-between bg-[#18181C] p-12 text-[#FFFFFF] ${idx === 1 ? 'order-2 border-l border-[#0A0A0C]/16' : 'border-r border-[#0A0A0C]/16'}`}
                  >
                    <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="relative block aspect-[16/10] w-full overflow-hidden border border-white/14">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="58vw"
                        quality={92}
                        className="nlm-hover-zoom object-cover"
                      />
                    </Link>
                    <div className="mt-4 flex items-center justify-between text-[13px] font-semibold text-[#C9C7C2]">
                      <span>{v.zone}</span>
                      <span>{homeCopy.venueLabel} · Milano</span>
                    </div>
                  </div>

                  {/* Colonna Editoriale Bianca S17 */}
                  <div
                    data-reveal="rise"
                    data-stagger="1"
                    className={`col-span-5 flex flex-col justify-between bg-[#FFFFFF] p-12 text-[#0A0A0C] ${idx === 1 ? 'order-1' : ''}`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-display text-[74px] font-extrabold italic leading-[0.85] text-[#D9381E] tabular-nums">
                          {idx + 1}
                        </span>
                      </div>

                      <h3 className="mt-5 mb-2 font-display text-[48px] font-extrabold uppercase leading-[0.94] text-[#0A0A0C]">
                        <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="transition-colors hover:underline">
                          {v.name}
                        </Link>
                      </h3>
                      <p className="mb-4 text-[13px] font-bold text-[#4F4D48]">
                        {v.zone}
                      </p>

                      <p className="max-w-[48ch] font-sans text-base leading-[1.65] text-[#4F4D48]">
                        {v.description}
                      </p>

                      {/* Griglia Specifiche 2x2 con linee da 1px */}
                      <div className="my-7 grid grid-cols-2 border-y border-[#0A0A0C]/16">
                        <div className="border-b border-r border-[#0A0A0C]/16 py-4 pr-5">
                          <div className="text-[13px] font-bold text-[#4F4D48]">{homeCopy.venueTags[0]}</div>
                          <div className="mt-1.5 text-[15px] font-semibold text-[#0A0A0C]">{v.street}</div>
                        </div>
                        <div className="border-b border-[#0A0A0C]/16 py-4 pl-5">
                          <div className="text-[13px] font-bold text-[#4F4D48]">{homeCopy.venueTags[1]}</div>
                          <div className="mt-1.5 text-[15px] font-semibold text-[#0A0A0C]">{v.genres}</div>
                        </div>
                        <div className="border-r border-[#0A0A0C]/16 py-4 pr-5">
                          <div className="text-[13px] font-bold text-[#4F4D48]">Formula</div>
                          <div className="mt-1.5 text-[15px] font-semibold text-[#0A0A0C]">{uiLabels.formulaVal}</div>
                        </div>
                        <div className="py-4 pl-5">
                          <div className="text-[13px] font-bold text-[#4F4D48]">{homeCopy.venueTags[2]}</div>
                          <div className="mt-1.5 text-[15px] font-bold text-[#0A0A0C]">WhatsApp Concierge</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href={`${lp}/clubs/${v.slug}`}
                        prefetch={false}
                        className="nlm-pressable flex min-h-[48px] items-center justify-center border border-[#0A0A0C] bg-[#FFFFFF] px-5 py-3.5 text-[13px] font-bold text-[#0A0A0C] transition-colors hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                      >
                        {homeCopy.venueLabel}
                      </Link>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nlm-pressable flex min-h-[48px] items-center justify-center gap-2 bg-[#D9381E] px-5 py-3.5 text-[13px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#B82B14]"
                      >
                        {uiLabels.vipBtn}
                      </a>
                    </div>
                  </div>
                </article>
              ))}

              {/* GRIGLIA PANORAMICA 2x2 (720px per club) per i restanti locali */}
              <div className="grid grid-cols-2 bg-[#EDEBE6]">
                {featuredVenues.slice(2).map((v, idx) => (
                  <article
                    key={v.id}
                    data-reveal="rise"
                    data-stagger={String((idx % 2) + 1)}
                    className={`group grid grid-cols-[240px_1fr] items-stretch gap-8 border-b border-[#0A0A0C]/16 bg-[#FFFFFF] p-12 transition-colors hover:bg-[#F7F5F0] ${idx % 2 === 0 ? 'border-r border-[#0A0A0C]/16' : ''}`}
                  >
                    <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="relative block aspect-[3/4] w-full overflow-hidden border border-[#0A0A0C]/16 bg-[#0A0A0C]">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        quality={92}
                        className="nlm-hover-zoom object-cover"
                      />
                    </Link>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="font-display text-[46px] font-extrabold italic leading-none text-[#D9381E] tabular-nums">
                            {idx + 3}
                          </span>
                        </div>
                        <h3 className="mt-2.5 mb-1 font-display text-[36px] font-extrabold uppercase leading-tight text-[#0A0A0C]">
                          <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="transition-colors hover:underline">
                            {v.name}
                          </Link>
                        </h3>
                        <p className="mb-3 text-[13px] font-bold text-[#4F4D48]">
                          {v.zone}
                        </p>
                        <p className="mb-4 max-w-[48ch] font-sans text-base leading-relaxed text-[#4F4D48]">
                          {v.description}
                        </p>
                        <div className="border-t border-[#0A0A0C]/14 text-[13px]">
                          <div className="flex justify-between gap-4 border-b border-[#0A0A0C]/14 py-2">
                            <span className="text-[13px] font-bold text-[#4F4D48]">{homeCopy.venueTags[0]}</span>
                            <span className="text-right font-semibold text-[#0A0A0C]">{v.street}</span>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-[#0A0A0C]/14 py-2">
                            <span className="text-[13px] font-bold text-[#4F4D48]">{homeCopy.venueTags[1]}</span>
                            <span className="text-right font-semibold text-[#0A0A0C]">{v.genres}</span>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-[#0A0A0C]/14 py-2">
                            <span className="text-[13px] font-bold text-[#4F4D48]">{homeCopy.venueTags[2]}</span>
                            <span className="text-right font-semibold text-[#0A0A0C]">{uiLabels.formulaVal}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <Link
                          href={`${lp}/clubs/${v.slug}`}
                          prefetch={false}
                          className="nlm-pressable flex min-h-[46px] items-center justify-center border border-[#0A0A0C] bg-[#FFFFFF] px-4 py-3 text-[13px] font-bold text-[#0A0A0C] transition-colors hover:bg-[#0A0A0C] hover:text-[#FFFFFF]"
                        >
                          {uiLabels.details}
                        </Link>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nlm-pressable flex min-h-[46px] items-center justify-center bg-[#D9381E] px-4 py-3 text-[13px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#B82B14]"
                        >
                          {uiLabels.vipBtn}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* VISTA MOBILE 390PX: GRIGLIA CARD VISIBILI COMPATTA */}
            <div className="grid grid-cols-1 gap-4 px-4 py-8 lg:hidden sm:grid-cols-2">
              {featuredVenues.map((v, i) => (
                <article
                  key={v.id}
                  data-reveal="rise"
                  className="flex flex-col justify-between border border-[#0A0A0C]/16 bg-[#FFFFFF]"
                >
                  <div>
                    <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="relative block aspect-[16/10] w-full overflow-hidden border-b border-[#0A0A0C]/14 bg-[#0A0A0C]">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="(max-width: 1024px) 92vw, 48vw"
                        quality={92}
                        className="object-cover"
                      />
                      <span className="absolute left-3 top-3 bg-[#0A0A0C] px-2.5 py-1 text-[13px] font-bold text-[#FFFFFF]">
                        {v.zone}
                      </span>
                    </Link>
                    <div className="p-4">
                      <h3 className="font-display text-xl font-extrabold uppercase leading-snug text-[#0A0A0C] sm:text-2xl">{v.name}</h3>
                      <p className="mt-2 max-w-[48ch] font-sans text-base leading-relaxed text-[#4F4D48]">{v.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-[#0A0A0C]/14">
                    <Link
                      href={`${lp}/clubs/${v.slug}`}
                      prefetch={false}
                      className="nlm-pressable flex min-h-[46px] items-center justify-center border-r border-[#0A0A0C]/14 bg-[#FFFFFF] text-[13px] font-bold text-[#0A0A0C]"
                    >
                      {uiLabels.details}
                    </Link>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nlm-pressable flex min-h-[46px] items-center justify-center bg-[#D9381E] text-[13px] font-bold text-[#FFFFFF]"
                    >
                      {uiLabels.vipBtn}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <OctoberEntry locale={locale} />
        <section className="w-full border-b border-white/14 bg-[#0A0A0C]">
          <div
            data-reveal="rise"
            className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 border-x border-white/14 bg-[#18181C] px-5 py-12 md:flex-row md:items-center sm:px-14"
          >
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase text-[#FFFFFF] sm:text-3xl lg:text-4xl">
                {uiLabels.sanSiroTitle}
              </h2>
              <p className="mt-1 max-w-[60ch] font-sans text-sm text-[#EDEBE6]">
                {uiLabels.sanSiroBody}
              </p>
            </div>
            <Link
              href={`${lp}/football-afterparties`}
              prefetch={false}
              className="nlm-pressable inline-flex min-h-[48px] shrink-0 items-center gap-2 bg-[#D9381E] px-6 py-3.5 text-[13px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#B82B14]"
            >
              {uiLabels.sanSiroCta}
            </Link>
          </div>
        </section>

        {/* ── 3. I Tre Atti della Notte Milanese (Capitolo Carta Calda + Trittico Noir) ─── */}
        <section className="w-full border-b border-white/14 bg-[#0A0A0C]">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 border-x border-white/14 lg:grid-cols-12">
            {/* Colonna Sinistra (5/12): Capitolo Carta S17 #EDEBE6 */}
            <div data-reveal="rise" className="flex flex-col justify-between border-b border-[#0A0A0C]/16 bg-[#EDEBE6] px-6 py-10 text-[#0A0A0C] sm:p-14 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div>
                <h2 className="mb-3 font-display text-3xl font-extrabold uppercase italic leading-[0.95] text-[#0A0A0C] sm:text-[40px]">
                  {homeCopy.nightTitle}
                </h2>
                <p className="mb-8 text-[13px] font-semibold text-[#4F4D48]">{homeCopy.nightLabel}</p>
                <div className="divide-y divide-[#0A0A0C]/15 border-y border-[#0A0A0C]/15">
                  {homeCopy.nightSteps.map((step: { label: string; title: string; body: string }, i: number) => (
                    <div key={i} className="flex items-start justify-between gap-6 py-6">
                      <div>
                        <h3 className="mb-2 font-display text-2xl font-extrabold uppercase leading-tight text-[#0A0A0C] sm:text-[30px]">{step.title}</h3>
                        <p className="max-w-[52ch] font-sans text-sm leading-relaxed text-[#4F4D48]">{step.body}</p>
                      </div>
                      <span className="shrink-0 font-display text-4xl font-extrabold italic text-[#D9381E]">
                        {i === 0 ? 'I' : i === 1 ? 'II' : 'III'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 bg-[#0A0A0C] p-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nlm-pressable flex min-h-[48px] w-full items-center justify-between bg-[#D9381E] px-6 py-3.5 text-[13px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#B82B14]"
                >
                  <span>{homeCopy.requestAction}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Colonna Destra (7/12): Trittico Fotografico Editoriale */}
            <div data-lightbox-group="home-editorial-triptych" className="flex flex-col justify-between bg-[#18181C] p-6 sm:p-14 lg:col-span-7">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2" data-reveal="clip">
                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/14">
                    <Image
                      src="/images/vip-table-milan-nightclub-just-me.webp"
                      alt={homeGridAlts[0]}
                      fill
                      quality={92}
                      className="nlm-hover-zoom object-cover"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                  </div>
                  <div className="mt-2.5 flex justify-between text-[13px] font-semibold text-[#C9C7C2]">
                    <span>{uiLabels.act1}</span>
                    <span>Parco Sempione &amp; Porta Nuova</span>
                  </div>
                </div>

                <div data-reveal="clip" data-stagger="1">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/14">
                    <Image
                      src="/images/milan-club-crowd-dancefloor-night.webp"
                      alt={homeGridAlts[3]}
                      fill
                      quality={92}
                      className="nlm-hover-zoom object-cover"
                      sizes="(max-width: 1024px) 50vw, 45vw"
                    />
                  </div>
                  <div className="mt-2 text-[13px] font-semibold text-[#C9C7C2]">
                    {uiLabels.act2}
                  </div>
                </div>

                <div data-reveal="clip" data-stagger="2">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/14">
                    <Image
                      src="/images/bottle-service-milan-vip-nightclub.webp"
                      alt={homeGridAlts[4]}
                      fill
                      quality={92}
                      className="nlm-hover-zoom object-cover"
                      sizes="(max-width: 1024px) 50vw, 45vw"
                    />
                  </div>
                  <div className="mt-2 text-[13px] font-semibold text-[#C9C7C2]">
                    {uiLabels.act3}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/14 pt-6 sm:flex-row sm:items-center">
                <p className="max-w-[58ch] font-sans text-base italic text-[#EDEBE6]">
                  {homeCopy.description} · {SITE_CONTACT.whatsapp.number}
                </p>
                <span className="shrink-0 text-[13px] font-bold text-[#EDEBE6]">
                  {homeCopy.quickLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Le Tre Formule d'Accesso (Intent Cards) ───────────────── */}
        <div className="w-full border-b border-[#0A0A0C]/16 bg-[#EDEBE6]">
          <div className="mx-auto max-w-[1440px] border-x border-[#0A0A0C]/16">
            <IntentCards locale={locale} />
          </div>
        </div>

        {/* ── 5. Calendario Eventi Verificati della Settimana ──────────── */}
        <section className="w-full border-b border-white/14 bg-[#0A0A0C] px-4 py-16 sm:px-14" data-home-week-events>
          <div className="mx-auto max-w-[1328px]">
            <h2 data-reveal="rise" className="mb-3 font-display text-3xl font-extrabold uppercase text-[#FFFFFF] sm:text-5xl md:text-6xl">{homeCopy.weekTitle}</h2>
            <p className="mb-5 text-sm font-semibold text-[#C9C7C2]">{homeCopy.weekLabel}</p>
            <Link href={`${lp}/events`} prefetch={false} className="mb-8 inline-flex min-h-11 items-center text-base font-bold text-[#FFFFFF] underline underline-offset-4">{homeCopy.seeAll}</Link>
            <DateSensitiveCalendar events={dateSensitiveEvents} initialNow={initialNow.toISOString()} mode="calendar-week" localeTag={getLocaleDef(locale)!.hreflang} localePrefix={lp} copy={{ ...getEventCalendarCopy(locale), empty: homeCopy.noWeek }} schemaName={homeCopy.weekTitle} emptyHref={`${lp}/events`} emptyLinkLabel={homeCopy.seeAll} groupByDay variant="gallery" bookingLocale={locale} />
          </div>
        </section>

        <MfwEntry locale={locale} />

        {/* ── 6. Esplora per Categoria e Quartiere (Carta Calda S17 #EDEBE6 + #FFFFFF) ── */}
        <section className="w-full border-b border-[#0A0A0C]/16 bg-[#EDEBE6] text-[#0A0A0C]">
          <div className="mx-auto max-w-[1440px] border-x border-[#0A0A0C]/16 px-5 py-20 sm:px-14">
            <h2 data-reveal="rise" className="mb-3 font-display text-3xl font-extrabold uppercase text-[#0A0A0C] sm:text-5xl md:text-6xl">
              {homeCopy.categoriesTitle}
            </h2>
            <p className="mb-10 text-sm font-semibold text-[#4F4D48]">
              {homeCopy.discoverLabel}
            </p>
            <div className="grid grid-cols-2 border-l border-t border-[#0A0A0C]/16 bg-[#FFFFFF] sm:grid-cols-4">
              {[
                { label: homeCopy.categoryLabels[0], href: `${lp}/genres/techno` },
                { label: homeCopy.categoryLabels[1], href: `${lp}/vip-tables` },
                { label: homeCopy.categoryLabels[2], href: `${lp}/aperitivo` },
                { label: homeCopy.categoryLabels[3], href: `${lp}/zones/navigli` },
                { label: homeCopy.categoryLabels[4], href: `${lp}/zones/corso-como` },
                { label: homeCopy.categoryLabels[5], href: `${lp}/guides` },
                { label: homeCopy.categoryLabels[6], href: `${lp}/concierge` },
                { label: homeCopy.categoryLabels[7], href: `${lp}/clubs` },
              ].map((tag, idx) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  prefetch={false}
                  data-reveal="rise"
                  data-stagger={String((idx % 4) + 1)}
                  className="nlm-pressable group flex min-h-[96px] flex-col justify-between border-b border-r border-[#0A0A0C]/16 p-6 transition-colors hover:bg-[#0A0A0C]"
                >
                  <span className="font-display text-3xl font-extrabold italic tabular-nums text-[#D9381E] transition-colors group-hover:text-[#FFFFFF]">{idx + 1}</span>
                  <span className="mt-3 text-sm font-bold text-[#0A0A0C] transition-colors group-hover:text-[#FFFFFF]">
                    {tag.label} ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <EditorialPageSections locale={locale as LocaleCode} path={localePrefix(locale) || '/'} />
      </main>
    </>
  );
}
