import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import MfwEntry from '@/components/MfwEntry';
import OctoberEntry from '@/components/OctoberEntry';
import IntentCards from '@/components/IntentCards';
import NightLine from '@/components/NightLine';
import TableConcierge from '@/components/TableConcierge';
import DateSensitiveCalendar from '@/components/DateSensitiveCalendar';
import { getEventCalendarCopy } from '@/lib/eventCalendarCopy';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_CONTACT } from '@/config/contact';
import { localePrefix, hreflangAlternates, getLocaleDef, isEnabledLocale } from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
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
    title: 'Milan Nightlife 2026 | Best Clubs, VIP Tables, Guest Lists & Events',
    description: 'Official guide to Milan nightlife: compare the 20 best clubs (JustMe, Armani Privé, 11Clubroom, Tocqueville 13, Volt), VIP table minimum spend, guest lists, and tonight’s events.',
    venueLabel: 'Official Club Guide',
    venueDescription: 'Explore address, music format, dress code, VIP table minimum spend, and upcoming club nights with instant WhatsApp Concierge assistance.',
    venueTags: ['District & Address', 'Music & Format', 'VIP & Guest List'],
    featuredImageAlts: ['JustMe Milano glass pavilion and illuminated garden at Parco Sempione', 'Rooftop aperitivo terrace in Milan at sunset', 'VIP bottle service table at a luxury Milan nightclub'],
    keywords: ['milan nightlife', 'best clubs milan', 'vip tables milan', 'guest list milan clubs', 'aperitivo milan', 'tonight events milan', 'bottle service milan'],
    ogImageAlt: 'Milan Nightlife Official Guide — VIP Tables, Clubs & Events',
    requestLabel: 'VIP Concierge Desk',
    requestAction: 'Book via WhatsApp Concierge',
    requestDisclaimer: 'Fast-track VIP table quotes, bottle lists, and nominal guest list registration via WhatsApp +39 351 912 7047.',
    quickLabel: '24/7 WhatsApp Desk',
    whatsAppMessage: 'Hi Nightlife Milan! I would like to check VIP table / guest list options in Milan for my date.',
    nightLabel: 'The Three Acts of the Night', nightTitle: 'How a Night Out in Milan Works',
    curatedLabel: 'Iconic Venues Selection', topVenuesTitle: 'Top Nightclubs & Lounges in Milan', allVenues: 'Explore all 20 clubs', allVenuesMobile: 'See all 20 clubs →',
    tonightLabel: 'Tonight in Milan', tonightTitle: "Tonight's Club Events", tonightSubtitle: 'Upcoming club nights & DJ sets in Milan', seeAll: 'View full calendar',
    noTonight: 'Explore upcoming weekend and special events or message our WhatsApp Concierge for tonight’s best tables.', discoverBest: 'Compare all 20 Milan clubs →', allTonight: "All tonight's events →",
    availabilityCta: 'Request instant VIP table & guest list availability on WhatsApp.', weekLabel: 'Upcoming Calendar', weekTitle: 'This Week & Weekend in Milan',
    noWeek: 'Message our WhatsApp Concierge (+39 351 912 7047) for private events, aperitivo tables, and weekend VIP reservations.', allWeek: "Full Milan events calendar →",
    discoverLabel: 'Explore Milan by Style', categoriesTitle: 'Browse Nightlife by Category & District',
    categoryLabels: ['Techno & Underground', 'VIP Tables & Privé', 'Royal Aperitivo', 'Navigli District', 'Corso Como & Garibaldi', '2026 Insider Guides', 'VIP Concierge Desk', 'All 20 Milan Clubs'],
    nightSteps: [
      { label: 'Act I · 19:30 – 22:30', title: 'Royal Aperitivo & Sunset Rooftops', body: 'Start your evening in Parco Sempione, Brera, Corso Como, or Navigli with signature cocktails, gourmet platters, and warm-up DJ sets.' },
      { label: 'Act II · 23:30 – 01:15', title: 'Club Doors, Guest Lists & Selection', body: 'Arrive before 00:45 for nominal guest-list entry or walk straight to the VIP Host desk with your confirmed table reservation.' },
      { label: 'Act III · 01:15 – 05:00', title: 'Peak-Time Dancefloor & VIP Privé', body: 'Experience international guest DJs, sparkler bottle shows, and private banquette service across Milan’s flagship sanctuaries.' },
    ],
  },
  it: {
    title: 'Vita Notturna Milano 2026 | Migliori Club, Tavoli VIP, Liste ed Eventi',
    description: 'Guida ufficiale alla nightlife di Milano: confronta i 20 migliori club (JustMe, Armani Privé, 11Clubroom, Tocqueville 13, Volt), prezzi tavoli VIP, liste nominali e serate.',
    venueLabel: 'Scheda Ufficiale Club',
    venueDescription: 'Scopri indirizzo, genere musicale, dress code, minimum spend tavoli VIP e prossime serate con assistenza immediata WhatsApp Concierge.',
    venueTags: ['Quartiere & Indirizzo', 'Musica & Format', 'Tavoli VIP & Lista'],
    featuredImageAlts: ['Padiglione in vetro e giardino illuminato del JustMe Milano a Parco Sempione', 'Terrazza aperitivo panoramica a Milano al tramonto', 'Servizio bottle show al tavolo VIP in un club di Milano'],
    keywords: ['vita notturna milano', 'migliori discoteche milano', 'tavoli vip milano', 'liste discoteche milano', 'aperitivo milano', 'serate milano stasera', 'bottle service milano'],
    ogImageAlt: 'Guida Ufficiale Vita Notturna Milano — Tavoli VIP, Club ed Eventi',
    requestLabel: 'Concierge Tavoli & Liste',
    requestAction: 'Prenota su WhatsApp Concierge',
    requestDisclaimer: 'Preventivi rapidi tavoli VIP, listini bottiglie e accredito in lista nominale su WhatsApp +39 351 912 7047.',
    quickLabel: 'Desk WhatsApp Attivo',
    whatsAppMessage: 'Ciao Nightlife Milan! Vorrei ricevere le opzioni tavoli VIP e lista per la mia serata a Milano.',
    nightLabel: 'I Tre Atti della Notte', nightTitle: 'Come Funziona la Serata Perfetta a Milano',
    curatedLabel: 'I Santuari della Notte', topVenuesTitle: 'I Migliori Club e Discoteche di Milano', allVenues: 'Tutti i 20 club di Milano', allVenuesMobile: 'Vedi tutti i 20 club →',
    tonightLabel: 'Stasera a Milano', tonightTitle: 'Eventi e Serate di Stasera', tonightSubtitle: 'Serate in programma e DJ set nei club di Milano', seeAll: 'Calendario completo',
    noTonight: 'Scopri i prossimi eventi in calendario o scrivi su WhatsApp per i tavoli e le serate consigliate stasera.', discoverBest: 'Confronta i 20 club di Milano →', allTonight: 'Tutti gli eventi di stasera →',
    availabilityCta: 'Richiedi disponibilità tavoli VIP e liste su WhatsApp.', weekLabel: 'Calendario Settimanale', weekTitle: 'Prossime Serate della Settimana a Milano',
    noWeek: 'Scrivi al Concierge WhatsApp (+39 351 912 7047) per prenotare Royal Aperitivo, liste e Tavoli Privé nel weekend.', allWeek: 'Calendario completo eventi →',
    discoverLabel: 'Esplora per Stile e Quartiere', categoriesTitle: 'Scegli la Tua Esperienza Notturna a Milano',
    categoryLabels: ['Club Techno & Underground', 'Tavoli VIP & Privé', 'Royal Aperitivo Milano', 'Quartiere Navigli', 'Corso Como & Garibaldi', 'Guide Ufficiali 2026', 'Servizio VIP Concierge', 'Tutti i 20 Club Milano'],
    nightSteps: [
      { label: 'Atto I · 19:30 – 22:30', title: 'Royal Aperitivo & Rooftop al Tramonto', body: 'Inizia la serata tra Parco Sempione, Brera, Corso Como o i Navigli con signature cocktail, buffet gourmet o tavolo aperitivo con DJ set.' },
      { label: 'Atto II · 23:30 – 01:15', title: 'Apertura Club, Liste & Selezione Porta', body: 'Entra entro le 00:45 in lista nominale oppure accedi dalla corsia prioritaria VIP Host con il tuo tavolo riservato.' },
      { label: 'Atto III · 01:15 – 05:00', title: 'Peak-Time in Pista & Tavoli Privé', body: 'Vivi il clou della notte tra guest DJ internazionali, bottle show al tavolo e aree Privé nei club iconici della capitale della moda.' },
    ],
  },
  es: {
    title: 'Vida Nocturna Milán 2026 | Mejores Discotecas, Mesas VIP y Eventos',
    description: 'Guía oficial de la noche en Milán: compara los 20 mejores clubes (JustMe, Armani Privé, 11Clubroom, Tocqueville 13, Volt), mesas VIP, listas y eventos.',
    venueLabel: 'Guía Oficial del Club',
    venueDescription: 'Consulta dirección, estilo musical, dress code, consumo mínimo de mesas VIP y próximos eventos con asistencia por WhatsApp.',
    venueTags: ['Barrio y Dirección', 'Música y Formato', 'Mesas VIP y Lista'],
    featuredImageAlts: ['Pabellón de cristal y jardín iluminado de JustMe Milano en Parco Sempione', 'Terraza de aperitivo en Milán al atardecer', 'Servicio de botellas en mesa VIP en Milán'],
    keywords: ['vida nocturna milán', 'mejores discotecas milán', 'mesas vip milán', 'aperitivo milán', 'eventos milán hoy', 'guía nocturna milán'],
    ogImageAlt: 'Guía Oficial de la Vida Nocturna de Milán',
    requestLabel: 'Concierge VIP Milán',
    requestAction: 'Reservar por WhatsApp',
    requestDisclaimer: 'Presupuestos de mesas VIP, cartas de botellas y listas nominales por WhatsApp +39 351 912 7047.',
    quickLabel: 'Atención WhatsApp',
    whatsAppMessage: '¡Hola Nightlife Milan! Quiero consultar opciones de mesa VIP y lista en Milán para mi fecha.',
    nightLabel: 'Los Tres Actos de la Noche', nightTitle: 'Cómo Funciona la Noche en Milán',
    curatedLabel: 'Selección de Clubes', topVenuesTitle: 'Los Mejores Clubes y Discotecas de Milán', allVenues: 'Todos los 20 clubes', allVenuesMobile: 'Ver todos los clubes →',
    tonightLabel: 'Esta Noche', tonightTitle: 'Eventos de Esta Noche', tonightSubtitle: 'Fiestas y sesiones DJ en Milán', seeAll: 'Ver calendario',
    noTonight: 'Consulta los próximos eventos de la semana o escríbenos por WhatsApp para reservar mesa VIP.', discoverBest: 'Comparar clubes de Milán →', allTonight: 'Todos los eventos de hoy →',
    availabilityCta: 'Consulta disponibilidad de mesas VIP por WhatsApp.', weekLabel: 'Esta Semana', weekTitle: 'Próximos Eventos en Milán',
    noWeek: 'Escríbenos por WhatsApp (+39 351 912 7047) para reservar mesas VIP y listas este fin de semana.', allWeek: 'Calendario completo →',
    discoverLabel: 'Explorar por Categoría', categoriesTitle: 'Descubre Milán por Estilo y Zona',
    categoryLabels: ['Clubes de Techno', 'Mesas VIP y Privé', 'Aperitivo en Milán', 'Zona Navigli', 'Zona Corso Como', 'Guías Oficiales 2026', 'Servicio Concierge', 'Los 20 Clubes de Milán'],
    nightSteps: [
      { label: 'Acto I · 19:30 – 22:30', title: 'Royal Aperitivo y Terrazas', body: 'Empieza la tarde en Parco Sempione, Brera, Corso Como o Navigli con cócteles de autor, buffet gourmet y DJ set.' },
      { label: 'Acto II · 23:30 – 01:15', title: 'Entrada en Lista y Selección', body: 'Accede antes de las 00:45 por lista nominal o entra sin cola por el acceso VIP Host con tu mesa reservada.' },
      { label: 'Acto III · 01:15 – 05:00', title: 'Privé, Bottle Show y DJ Sets', body: 'Disfruta del momento cumbre de la noche con DJs internacionales y servicio de botellas en los clubes más exclusivos.' },
    ],
  },
  fr: {
    title: "Vie Nocturne à Milan 2026 | Meilleurs Clubs, Tables VIP et Soirées",
    description: "Guide officiel de la nuit à Milan : comparez les 20 meilleurs clubs (JustMe, Armani Privé, 11Clubroom, Tocqueville 13, Volt), tables VIP, guest lists et soirées.",
    venueLabel: 'Fiche Officielle Club',
    venueDescription: 'Découvrez l’adresse, le style musical, le dress code, les tarifs tables VIP et les prochaines soirées avec notre Concierge WhatsApp.',
    venueTags: ['Quartier & Adresse', 'Musique & Format', 'Tables VIP & Liste'],
    featuredImageAlts: ['Pavillon vitré et jardin illuminé du JustMe Milano à Parco Sempione', 'Terrasse aperitivo à Milan au coucher du soleil', 'Service bouteille table VIP à Milan'],
    keywords: ['vie nocturne milan', 'meilleurs clubs milan', 'tables vip milan', 'aperitivo milan', 'soirées milan', 'guide clubs milan'],
    ogImageAlt: 'Guide Officiel de la Vie Nocturne à Milan',
    requestLabel: 'Conciergerie VIP Milan',
    requestAction: 'Réserver sur WhatsApp',
    requestDisclaimer: 'Devis tables VIP, cartes des bouteilles et guest lists sur WhatsApp +39 351 912 7047.',
    quickLabel: 'Concierge WhatsApp',
    whatsAppMessage: 'Bonjour Nightlife Milan ! Je souhaite connaître les options de table VIP et guest list à Milan pour ma date.',
    nightLabel: 'Les Trois Actes de la Nuit', nightTitle: 'Comment Fonctionne la Nuit à Milan',
    curatedLabel: 'Sélection de Clubs', topVenuesTitle: 'Les Meilleurs Clubs et Discothèques de Milan', allVenues: 'Les 20 clubs de Milan', allVenuesMobile: 'Voir tous les clubs →',
    tonightLabel: 'Ce Soir', tonightTitle: 'Soirées de Ce Soir', tonightSubtitle: 'Programmation clubs et DJ sets à Milan', seeAll: 'Voir le calendrier',
    noTonight: 'Découvrez les prochaines soirées de la semaine ou contactez notre Concierge WhatsApp.', discoverBest: 'Comparer les clubs de Milan →', allTonight: 'Toutes les soirées de ce soir →',
    availabilityCta: 'Demandez la disponibilité des tables VIP sur WhatsApp.', weekLabel: 'Cette Semaine', weekTitle: 'Prochaines Soirées à Milan',
    noWeek: 'Contactez-nous sur WhatsApp (+39 351 912 7047) pour vos réservations de tables VIP ce week-end.', allWeek: 'Calendrier complet →',
    discoverLabel: 'Explorer par Catégorie', categoriesTitle: 'Choisissez Votre Ambiance à Milan',
    categoryLabels: ['Clubs Techno', 'Tables VIP & Privé', 'Aperitivo à Milan', 'Quartier Navigli', 'Quartier Corso Como', 'Guides Officiels 2026', 'Service Concierge', 'Les 20 Clubs de Milan'],
    nightSteps: [
      { label: 'Acte I · 19:30 – 22:30', title: 'Royal Aperitivo & Rooftops', body: 'Commencez la soirée à Parco Sempione, Brera, Corso Como ou Navigli avec cocktails signature, buffet gourmet et DJ set.' },
      { label: 'Acte II · 23:30 – 01:15', title: 'Guest Lists & Sélection Porte', body: 'Arrivez avant 00h45 en guest list nominative ou profitez de l’accueil prioritaire VIP Host avec votre table réservée.' },
      { label: 'Acte III · 01:15 – 05:00', title: 'Peak-Time & Carré VIP Privé', body: 'Vivez l’apogée de la nuit milanaise avec DJs internationaux et service bouteille dans les clubs iconiques.' },
    ],
  },
  de: {
    title: 'Nachtleben Mailand 2026 | Beste Clubs, VIP-Tische, Gästelisten & Events',
    description: 'Offizieller Guide für das Mailänder Nachtleben: die 20 besten Clubs (JustMe, Armani Privé, 11Clubroom, Tocqueville 13, Volt), VIP-Tische, Mindestverzehr & Partys.',
    venueLabel: 'Offizielles Club-Profil',
    venueDescription: 'Adresse, Musikstil, Dresscode, VIP-Tisch-Mindestverzehr und kommende Partys mit direktem WhatsApp-Concierge.',
    venueTags: ['Viertel & Adresse', 'Musik & Format', 'VIP-Tisch & Liste'],
    featuredImageAlts: ['Glaspavillon und beleuchteter Garten des JustMe Milano im Parco Sempione', 'Dachterrasse bei Sonnenuntergang in Mailand', 'VIP-Bottle-Service in einem Mailänder Club'],
    keywords: ['nachtleben mailand', 'beste clubs mailand', 'vip tische mailand', 'aperitivo mailand', 'partys mailand heute', 'club guide mailand'],
    ogImageAlt: 'Offizieller Guide zum Nachtleben in Mailand',
    requestLabel: 'VIP-Concierge Mailand',
    requestAction: 'Per WhatsApp reservieren',
    requestDisclaimer: 'VIP-Tisch-Angebote, Flaschenpreislisten und Gästelisten per WhatsApp +39 351 912 7047.',
    quickLabel: 'WhatsApp-Desk',
    whatsAppMessage: 'Hallo Nightlife Milan! Ich möchte VIP-Tisch- und Gästelisten-Optionen in Mailand für mein Datum anfragen.',
    nightLabel: 'Die Drei Akte der Nacht', nightTitle: 'So Funktioniert die Perfekte Nacht in Mailand',
    curatedLabel: 'Top-Locations', topVenuesTitle: 'Die Besten Clubs & Lounges in Mailand', allVenues: 'Alle 20 Clubs', allVenuesMobile: 'Alle 20 Clubs ansehen →',
    tonightLabel: 'Heute Abend', tonightTitle: 'Events Heute Abend', tonightSubtitle: 'Kommende Clubnächte & DJ-Sets in Mailand', seeAll: 'Kalender ansehen',
    noTonight: 'Entdecken Sie die kommenden Wochenend-Events oder schreiben Sie unserem WhatsApp-Concierge.', discoverBest: 'Mailänder Clubs vergleichen →', allTonight: 'Alle heutigen Events →',
    availabilityCta: 'VIP-Tisch-Verfügbarkeit direkt per WhatsApp anfragen.', weekLabel: 'Diese Woche', weekTitle: 'Kommende Events in Mailand',
    noWeek: 'Schreiben Sie uns per WhatsApp (+39 351 912 7047) für VIP-Tische und Gästelisten am Wochenende.', allWeek: 'Vollständiger Kalender →',
    discoverLabel: 'Nach Stil Entdecken', categoriesTitle: 'Nachtleben nach Kategorie & Viertel',
    categoryLabels: ['Techno & Underground', 'VIP-Tische & Privé', 'Royal Aperitivo', 'Navigli-Viertel', 'Corso Como & Garibaldi', 'Club-Guides 2026', 'Concierge-Service', 'Alle 20 Mailänder Clubs'],
    nightSteps: [
      { label: 'Akt I · 19:30 – 22:30', title: 'Royal Aperitivo & Sunset-Terrassen', body: 'Starten Sie im Parco Sempione, Brera, Corso Como oder Navigli mit Drinks, Gourmet-Buffet und Warm-up-DJ-Sets.' },
      { label: 'Akt II · 23:30 – 01:15', title: 'Club-Einlass, Gästeliste & Dresscode', body: 'Kommen Sie vor 00:45 Uhr über die Gästeliste oder nutzen Sie den direkten VIP-Host-Empfang mit reserviertem Tisch.' },
      { label: 'Akt III · 01:15 – 05:00', title: 'Peak-Time Dancefloor & VIP-Privé', body: 'Erleben Sie internationale DJs und exklusiven Bottle-Service in Mailands berühmtesten Clubs.' },
    ],
  },
  pt: {
    title: 'Vida Noturna Milão 2026 | Melhores Clubes, Mesas VIP, Listas e Eventos',
    description: 'Guia oficial da noite em Milão: compare os 20 melhores clubes (JustMe, Armani Privé, 11Clubroom, Tocqueville 13, Volt), mesas VIP, listas e festas.',
    venueLabel: 'Guia Oficial do Clube',
    venueDescription: 'Confira endereço, estilo musical, dress code, consumação mínima de mesas VIP e próximas festas com suporte via WhatsApp.',
    venueTags: ['Bairro e Endereço', 'Música e Formato', 'Mesas VIP e Lista'],
    featuredImageAlts: ['Pavilhão de vidro e jardim iluminado do JustMe Milano no Parco Sempione', 'Terraço de aperitivo ao pôr do sol em Milão', 'Serviço de garrafas em mesa VIP em Milão'],
    keywords: ['vida noturna milão', 'melhores clubes milão', 'mesas vip milão', 'aperitivo milão', 'eventos milão hoje', 'guia noturno milão'],
    ogImageAlt: 'Guia Oficial da Vida Noturna de Milão',
    requestLabel: 'Concierge VIP Milão',
    requestAction: 'Reservar pelo WhatsApp',
    requestDisclaimer: 'Cotações de mesas VIP, cartas de garrafas e listas nominais pelo WhatsApp +39 351 912 7047.',
    quickLabel: 'Atendimento WhatsApp',
    whatsAppMessage: 'Olá Nightlife Milan! Quero consultar opções de mesa VIP e lista em Milão para a minha data.',
    nightLabel: 'Os Três Atos da Noite', nightTitle: 'Como Funciona a Noite em Milão',
    curatedLabel: 'Seleção de Clubes', topVenuesTitle: 'Os Melhores Clubes e Discotecas de Milão', allVenues: 'Todos os 20 clubes', allVenuesMobile: 'Ver todos os clubes →',
    tonightLabel: 'Hoje à Noite', tonightTitle: 'Eventos de Hoje', tonightSubtitle: 'Festas e DJ sets em Milão', seeAll: 'Ver calendário',
    noTonight: 'Veja os próximos eventos da semana ou fale com nosso Concierge no WhatsApp.', discoverBest: 'Comparar clubes de Milão →', allTonight: 'Todos os eventos de hoje →',
    availabilityCta: 'Peça a disponibilidade de mesas VIP pelo WhatsApp.', weekLabel: 'Esta Semana', weekTitle: 'Próximos Eventos Desta Semana',
    noWeek: 'Fale conosco no WhatsApp (+39 351 912 7047) para reservar mesas VIP neste fim de semana.', allWeek: 'Calendário completo →',
    discoverLabel: 'Explorar por Categoria', categoriesTitle: 'Descubra Milão por Estilo e Bairro',
    categoryLabels: ['Clubes de Techno', 'Mesas VIP e Privé', 'Aperitivo em Milão', 'Zona Navigli', 'Zona Corso Como', 'Guias Oficiais 2026', 'Serviço de Concierge', 'Os 20 Clubes de Milão'],
    nightSteps: [
      { label: 'Ato I · 19:30 – 22:30', title: 'Royal Aperitivo e Terraços', body: 'Comece a noite no Parco Sempione, Brera, Corso Como ou Navigli com drinks autorais, buffet gourmet e DJ set.' },
      { label: 'Ato II · 23:30 – 01:15', title: 'Abertura, Listas e Seleção', body: 'Chegue antes das 00:45 na lista nominal ou entre sem fila pelo acesso VIP Host com sua mesa reservada.' },
      { label: 'Ato III · 01:15 – 05:00', title: 'Peak-Time, Privé e Bottle Show', body: 'Viva o auge da noite milanesa com DJs internacionais e serviço de garrafas nos clubes mais icônicos.' },
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

  const title = seoTitle(copy.title);
  const description = withWhatsApp(copy.description, locale);

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

  const waLink = getConciergeBookingUrl(locale);
  const formerHeroCopy = getHeroCopy(locale);

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
            title: locale === 'it' ? 'Vita Notturna a Milano: Club Iconici, Tavoli VIP, Rooftop e Serate' : formerHeroCopy.cta,
            lead: getTableConciergeLead(locale),
            eyebrow: locale === 'it' ? 'GUIDA INSIDER & CONCIERGE UFFICIALE · MILANO 2026' : homeCopy.requestLabel,
            ...(locale === 'it' ? { requestTitle: 'Prenota Tavolo VIP o Lista Nominale', requestAction: 'Richiedi Prezzi Tavoli & Liste su WhatsApp' } : {}),
            disclaimer: homeCopy.requestDisclaimer,
            eventsLead: homeCopy.weekTitle,
            allEvents: homeCopy.seeAll,
          }}
        />
        {/* ── Fascia Sartoriale dei Quartieri Notturni ─────────────────── */}
        <div className="w-full bg-[#050505] border-b border-[#F6F1E7]/14">
          <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14 px-5 sm:px-14 py-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.22em] uppercase text-[#C2B9AA]">
            <span>01 · PARCO SEMPIONE</span>
            <span>02 · PORTA GARIBALDI</span>
            <span className="hidden sm:inline">03 · PORTA NUOVA SKYLINE</span>
            <span className="hidden md:inline">04 · SAN SIRO GARDEN</span>
            <span className="hidden lg:inline">05 · REPUBBLICA</span>
            <span className="hidden xl:inline">06 · CORSO COMO &amp; NAVIGLI</span>
          </div>
        </div>

        {/* ── 2. I Sei Santuari della Notte (Desktop 1440px Flagship Spreads + 2x2 Widescreen / Mobile 390px Swipe) ── */}
        <section className="w-full bg-[#050505] border-b border-[#F6F1E7]/14">
          <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14">
            {/* Header Editoriale della Collezione */}
            <div className="px-5 sm:px-14 pt-16 sm:pt-20 pb-10 sm:pb-12 border-b border-[#F6F1E7]/14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <p className="font-mono text-[#D6BE96] text-xs tracking-[0.26em] uppercase mb-3">
                  N° 02 · {homeCopy.curatedLabel}
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal text-[#F6F1E7] tracking-[-0.032em] leading-[0.90]">
                  {homeCopy.topVenuesTitle}
                </h2>
              </div>
              <Link
                href={`${lp}/clubs`}
                prefetch={false}
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 border border-[#D6BE96]/45 text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] font-mono text-xs tracking-[0.2em] uppercase transition-colors shrink-0"
              >
                {homeCopy.allVenues} ↗
              </Link>
            </div>

            {/* VISTA DESKTOP WIDESCREEN 1440PX: 2 FLAGSHIP SPREADS A 12 COLONNE + GRIGLIA PANORAMICA 2x2 */}
            <div className="hidden lg:block">
              {featuredVenues.slice(0, 2).map((v, idx) => (
                <article
                  key={v.id}
                  className="grid grid-cols-12 border-b border-[#F6F1E7]/14 group"
                >
                  {/* Colonna Fotografica 16:10 (a sinistra per 01, a destra per 02) */}
                  <div className={`col-span-7 p-14 bg-[#0B0A09] flex flex-col justify-between ${idx === 1 ? 'order-2 border-l border-[#F6F1E7]/14' : 'border-r border-[#F6F1E7]/14'}`}>
                    <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="block relative aspect-[16/10] w-full overflow-hidden border border-[#F6F1E7]/14">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="58vw"
                        quality={92}
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </Link>
                    <div className="flex justify-between items-center mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-[#847C6F]">
                      <span>FIG. 0{idx + 1} · {v.zone}</span>
                      <span>{homeCopy.venueLabel} · MILANO</span>
                    </div>
                  </div>

                  {/* Colonna Editoriale Sartoriale */}
                  <div className={`col-span-5 p-14 flex flex-col justify-between bg-[#050505] ${idx === 1 ? 'order-1' : ''}`}>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-serif italic text-[74px] leading-[0.85] text-[#D6BE96] font-normal">
                          0{idx + 1}
                        </span>
                        <span className="font-mono text-xs tracking-[0.22em] uppercase text-[#D6BE96]">
                          {v.zone}
                        </span>
                      </div>

                      <h3 className="font-serif text-[52px] font-normal text-[#F6F1E7] leading-[0.95] tracking-[-0.03em] mt-5 mb-4">
                        <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="hover:text-[#D6BE96] transition-colors">
                          {v.name}
                        </Link>
                      </h3>

                      <p className="font-sans text-base text-[#C2B9AA] leading-[1.7]">
                        {v.description}
                      </p>

                      {/* Griglia Specifiche 2x2 con linee da 1px */}
                      <div className="grid grid-cols-2 border-y border-[#F6F1E7]/14 my-7">
                        <div className="py-4 pr-5 border-r border-b border-[#F6F1E7]/14">
                          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#847C6F]">{homeCopy.venueTags[0]}</div>
                          <div className="text-[15px] text-[#F6F1E7] font-medium mt-1.5">{v.street}</div>
                        </div>
                        <div className="py-4 pl-5 border-b border-[#F6F1E7]/14">
                          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#847C6F]">{homeCopy.venueTags[1]}</div>
                          <div className="text-[15px] text-[#F6F1E7] font-medium mt-1.5">{v.genres}</div>
                        </div>
                        <div className="py-4 pr-5 border-r border-[#F6F1E7]/14">
                          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#847C6F]">FORMULA</div>
                          <div className="text-[15px] text-[#F6F1E7] font-medium mt-1.5">Aperitivo · Lista · Privé</div>
                        </div>
                        <div className="py-4 pl-5">
                          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#847C6F]">{homeCopy.venueTags[2]}</div>
                          <div className="text-[15px] text-[#D6BE96] font-semibold mt-1.5">WhatsApp Concierge</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href={`${lp}/clubs/${v.slug}`}
                        prefetch={false}
                        className="min-h-[48px] px-5 py-3.5 border border-[#D6BE96]/45 text-[#F6F1E7] hover:border-[#F6F1E7] font-mono text-xs tracking-[0.18em] uppercase flex items-center justify-center transition-colors"
                      >
                        {homeCopy.venueLabel}
                      </Link>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[48px] px-5 py-3.5 bg-[#F6F1E7] text-[#050505] hover:bg-[#D6BE96] font-mono text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors"
                      >
                        PRIVÉ VIP ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}

              {/* GRIGLIA PANORAMICA 2x2 (720px per club) per i restanti locali */}
              <div className="grid grid-cols-2">
                {featuredVenues.slice(2).map((v, idx) => (
                  <article
                    key={v.id}
                    className={`p-14 border-b border-[#F6F1E7]/14 grid grid-cols-[240px_1fr] gap-9 items-stretch hover:bg-[#0B0A09] transition-colors group ${idx % 2 === 0 ? 'border-r border-[#F6F1E7]/14' : ''}`}
                  >
                    <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="block relative aspect-[3/4] w-full overflow-hidden border border-[#F6F1E7]/14">
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        quality={92}
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <span className="font-serif italic text-[46px] leading-none text-[#D6BE96]">
                            0{idx + 3}
                          </span>
                          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#847C6F]">
                            {v.zone}
                          </span>
                        </div>
                        <h3 className="font-serif text-[34px] font-normal text-[#F6F1E7] leading-tight mt-2.5 mb-2">
                          <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="hover:text-[#D6BE96] transition-colors">
                            {v.name}
                          </Link>
                        </h3>
                        <p className="font-sans text-sm text-[#C2B9AA] leading-relaxed mb-4">
                          {v.description}
                        </p>
                        <div className="border-t border-[#F6F1E7]/14 text-[13px]">
                          <div className="flex justify-between gap-4 py-2 border-b border-[#F6F1E7]/14">
                            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#847C6F]">{homeCopy.venueTags[0]}</span>
                            <span className="text-[#F6F1E7] font-medium text-right">{v.street}</span>
                          </div>
                          <div className="flex justify-between gap-4 py-2 border-b border-[#F6F1E7]/14">
                            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#847C6F]">{homeCopy.venueTags[1]}</span>
                            <span className="text-[#F6F1E7] font-medium text-right">{v.genres}</span>
                          </div>
                          <div className="flex justify-between gap-4 py-2 border-b border-[#F6F1E7]/14">
                            <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#847C6F]">{homeCopy.venueTags[2]}</span>
                            <span className="text-[#D6BE96] font-medium text-right">Aperitivo · Lista · Privé</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-5">
                        <Link
                          href={`${lp}/clubs/${v.slug}`}
                          prefetch={false}
                          className="min-h-[46px] px-4 py-3 border border-[#D6BE96]/45 text-[#F6F1E7] hover:border-[#F6F1E7] font-mono text-[11px] tracking-[0.16em] uppercase flex items-center justify-center transition-colors"
                        >
                          SCHEDA
                        </Link>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[46px] px-4 py-3 bg-[#F6F1E7] text-[#050505] hover:bg-[#D6BE96] font-mono text-[11px] font-semibold tracking-[0.18em] uppercase flex items-center justify-center transition-colors"
                        >
                          PRIVÉ ↗
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* VISTA MOBILE 390PX: SWIPE ORIZZONTALE TATTILE SNAP-X */}
            <div className="lg:hidden py-8">
              <div className="px-5 mb-3 flex justify-between items-baseline">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#D6BE96]">SWIPE ORIZZONTALE →</span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#847C6F]">01 / 0{featuredVenues.length}</span>
              </div>
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 scrollbar-hide">
                {featuredVenues.map((v, i) => (
                  <article
                    key={v.id}
                    className="flex-[0_0_290px] snap-start border border-[#F6F1E7]/15 bg-[#0B0A09] flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`${lp}/clubs/${v.slug}`} prefetch={false} className="block relative aspect-[4/5] w-full overflow-hidden border-b border-[#F6F1E7]/14">
                        <Image
                          src={v.image}
                          alt={v.name}
                          fill
                          sizes="(max-width: 1024px) 90vw, 48vw"
                          quality={92}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#050505]/90 border border-[#D6BE96]/40 font-mono text-[10px] tracking-[0.2em] uppercase text-[#D6BE96]">
                          0{i + 1} · {homeCopy.venueLabel}
                        </span>
                        <div className="absolute bottom-3 left-4 right-4">
                          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D6BE96]">{v.zone}</p>
                          <h3 className="font-serif text-2xl text-[#F6F1E7] mt-0.5">{v.name}</h3>
                        </div>
                      </Link>
                      <div className="p-4">
                        <p className="font-sans text-xs text-[#C2B9AA] leading-relaxed mb-3">{v.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 border-t border-[#F6F1E7]/14">
                      <Link
                        href={`${lp}/clubs/${v.slug}`}
                        prefetch={false}
                        className="min-h-[44px] font-mono text-[11px] tracking-[0.16em] uppercase text-[#F6F1E7] flex items-center justify-center border-r border-[#F6F1E7]/14"
                      >
                        SCHEDA
                      </Link>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] bg-[#F6F1E7] text-[#050505] font-mono text-[11px] font-semibold tracking-[0.16em] uppercase flex items-center justify-center"
                      >
                        PRIVÉ ↗
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <OctoberEntry locale={locale} />
        <section className="w-full bg-[#050505] border-b border-[#F6F1E7]/14">
          <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14 px-5 sm:px-14 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#0B0A09]">
            <div>
              <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#D6BE96] mb-2">
                {locale === 'it' ? 'STADIO SAN SIRO · SERIE A & CHAMPIONS LEAGUE 2026/2027' : 'SAN SIRO STADIUM · SERIE A & CHAMPIONS LEAGUE 2026/2027'}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E7]">
                {locale === 'it' ? 'Guida Ufficiale Dopo-Partita Calcio Milano (Inter & Milan)' : 'Official San Siro Football Afterparty Guide (Inter & AC Milan)'}
              </h2>
              <p className="font-sans text-sm text-[#C2B9AA] mt-1 max-w-3xl">
                {locale === 'it'
                  ? 'Aria Club a 150m dallo stadio, Just Me Torre Branca aperto 7/7, Voya Rooftop via M5, 55 Milano, Pineta e Repvblic: calcola il piano post-match e prenota Tavolo VIP su WhatsApp +39 351 912 7047.'
                  : 'Aria Club 150m from the stadium, Just Me Torre Branca open 7/7, Voya Rooftop via M5, 55 Milano, Pineta & Repvblic: plan your post-match night and book VIP tables via WhatsApp +39 351 912 7047.'}
              </p>
            </div>
            <Link
              href={`${lp}/football-afterparties`}
              prefetch={false}
              className="shrink-0 min-h-[48px] px-6 py-3.5 border border-[#D6BE96] bg-[#D6BE96] text-[#050505] hover:bg-[#F6F1E7] font-mono text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center gap-2 transition-colors"
            >
              {locale === 'it' ? 'SCOPRI I DOPO-PARTITA ↗' : 'EXPLORE AFTERPARTIES ↗'}
            </Link>
          </div>
        </section>

        {/* ── 3. I Tre Atti della Notte Milanese (Drammaturgia Oraria) ─── */}
        <section className="w-full bg-[#050505] border-b border-[#F6F1E7]/14">
          <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14 grid grid-cols-1 lg:grid-cols-12">
            {/* Colonna Sinistra (5/12): I 3 Atti */}
            <div className="lg:col-span-5 p-6 sm:p-14 border-b lg:border-b-0 lg:border-r border-[#F6F1E7]/14 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[#D6BE96] text-xs tracking-[0.26em] uppercase mb-3">
                  N° 03 · {homeCopy.nightLabel}
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal italic text-[#F6F1E7] tracking-[-0.03em] leading-[0.92] mb-10">
                  {homeCopy.nightTitle}
                </h2>
                <div className="divide-y divide-[#F6F1E7]/14 border-t border-b border-[#F6F1E7]/14">
                  {homeCopy.nightSteps.map((step: { label: string; title: string; body: string }, i: number) => (
                    <div key={i} className="py-6 flex justify-between items-start gap-6">
                      <div>
                        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#D6BE96] mb-2">{step.label}</p>
                        <h3 className="font-serif text-2xl sm:text-[28px] text-[#F6F1E7] font-normal leading-tight mb-2">{step.title}</h3>
                        <p className="font-sans text-sm text-[#C2B9AA] leading-relaxed">{step.body}</p>
                      </div>
                      <span className="font-serif italic text-4xl text-[#D6BE96] shrink-0">
                        {i === 0 ? 'I' : i === 1 ? 'II' : 'III'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[50px] px-7 py-4 bg-[#F6F1E7] text-[#050505] hover:bg-[#D6BE96] font-mono text-xs font-semibold tracking-[0.2em] uppercase flex items-center justify-between transition-colors"
                >
                  <span>{homeCopy.requestAction}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Colonna Destra (7/12): Trittico Fotografico Editoriale */}
            <div className="lg:col-span-7 p-6 sm:p-14 bg-[#0B0A09] flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#F6F1E7]/14">
                    <Image
                      src="/images/vip-table-milan-nightclub-just-me.webp"
                      alt={homeGridAlts[0]}
                      fill
                      quality={92}
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="flex justify-between mt-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-[#847C6F]">
                    <span>ATTO I · H 19:30 ROYAL APERITIVO &amp; SUNSET</span>
                    <span>PARCO SEMPIONE &amp; PORTA NUOVA</span>
                  </div>
                </div>

                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#F6F1E7]/14">
                    <Image
                      src="/images/milan-club-crowd-dancefloor-night.webp"
                      alt={homeGridAlts[3]}
                      fill
                      quality={92}
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 50vw, 45vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#847C6F]">
                    ATTO II · H 23:30 OPENING &amp; LISTA
                  </div>
                </div>

                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#F6F1E7]/14">
                    <Image
                      src="/images/bottle-service-milan-vip-nightclub.webp"
                      alt={homeGridAlts[4]}
                      fill
                      quality={92}
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 50vw, 45vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.16em] uppercase text-[#847C6F]">
                    ATTO III · H 01:30 PRIVÉ &amp; BOTTLE SHOW
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F6F1E7]/14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="font-serif italic text-lg text-[#C2B9AA]">
                  {homeCopy.description} · {SITE_CONTACT.whatsapp.number}
                </p>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#D6BE96] shrink-0">
                  {homeCopy.quickLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Le Tre Formule d'Accesso (Intent Cards) ───────────────── */}
        <div className="w-full bg-[#050505] border-b border-[#F6F1E7]/14">
          <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14">
            <IntentCards locale={locale} />
          </div>
        </div>

        {/* ── 5. Calendario Eventi Verificati della Settimana ──────────── */}
        <section className="w-full bg-[#0B0A09] border-b border-[#F6F1E7]/14 px-4 py-16 sm:px-14" data-home-week-events>
          <div className="mx-auto max-w-[1328px]">
            <p className="mb-3 font-mono text-xs tracking-[0.24em] uppercase text-[#D6BE96]">{homeCopy.weekLabel}</p>
            <h2 className="mb-5 font-serif text-4xl text-[#F6F1E7] md:text-5xl">{homeCopy.weekTitle}</h2>
            <Link href={`${lp}/events`} prefetch={false} className="mb-8 inline-flex min-h-11 items-center text-base font-semibold text-champagne underline underline-offset-4">{homeCopy.seeAll}</Link>
            <DateSensitiveCalendar events={dateSensitiveEvents} initialNow={initialNow.toISOString()} mode="calendar-week" localeTag={getLocaleDef(locale)!.hreflang} localePrefix={lp} copy={{ ...getEventCalendarCopy(locale), empty: homeCopy.noWeek }} schemaName={homeCopy.weekTitle} emptyHref={`${lp}/events`} emptyLinkLabel={homeCopy.seeAll} groupByDay variant="gallery" bookingLocale={locale} />
          </div>
        </section>

        <MfwEntry locale={locale} />

        {/* ── 6. Esplora per Categoria e Quartiere ─────────────────────── */}
        <section className="w-full bg-[#050505] border-b border-[#F6F1E7]/14">
          <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14 px-5 sm:px-14 py-20">
            <p className="font-mono text-[#D6BE96] text-xs tracking-[0.26em] uppercase mb-3">
              N° 05 · {homeCopy.discoverLabel}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#F6F1E7] tracking-[-0.03em] mb-10">
              {homeCopy.categoriesTitle}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[#F6F1E7]/14">
              {[
                { label: homeCopy.categoryLabels[0], href: `${lp}/genres/techno`, num: '01' },
                { label: homeCopy.categoryLabels[1], href: `${lp}/vip-tables`, num: '02' },
                { label: homeCopy.categoryLabels[2], href: `${lp}/aperitivo`, num: '03' },
                { label: homeCopy.categoryLabels[3], href: `${lp}/zones/navigli`, num: '04' },
                { label: homeCopy.categoryLabels[4], href: `${lp}/zones/corso-como`, num: '05' },
                { label: homeCopy.categoryLabels[5], href: `${lp}/guides`, num: '06' },
                { label: homeCopy.categoryLabels[6], href: `${lp}/concierge`, num: '07' },
                { label: homeCopy.categoryLabels[7], href: `${lp}/clubs`, num: '08' },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  prefetch={false}
                  className="p-6 border-r border-b border-[#F6F1E7]/14 hover:bg-[#0B0A09] group transition-colors min-h-[88px] flex flex-col justify-between"
                >
                  <span className="font-serif italic text-2xl text-[#D6BE96]">{tag.num}</span>
                  <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#F6F1E7] group-hover:text-[#D6BE96] transition-colors mt-3">
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
