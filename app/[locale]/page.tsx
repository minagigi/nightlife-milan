import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import MfwEntry from '@/components/MfwEntry';
import OctoberEntry from '@/components/OctoberEntry';
import IntentCards from '@/components/IntentCards';
import NightLine from '@/components/NightLine';
import TableConcierge from '@/components/TableConcierge';
import V01HomeCarousels, {
  type V01CapodannoSlide,
  type V01PartnerClubSlide,
} from '@/components/V01HomeCarousels';
import {
  CAPODANNO_HEAD_13_SLUGS,
  CAPODANNO_REMAINING_PARTNER_SLUGS,
  CAPODANNO_TAIL_2_SLUGS,
  getCapodannoEventBySlug,
} from '@/lib/capodannoEvents';
import {
  formatCapodannoPriceBadge35,
  getCapodannoLocalizedEventContent,
} from '@/lib/capodanno/i18n';
import { capodannoEventPath, capodannoPath } from '@/lib/capodanno/routes';
import { getV01SiteCopy } from '@/lib/i18n/v01SiteCopy35';
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
import { selectPriorityVenueEvents } from '@/lib/priorityVenueEvents';
import { getLocalizedText } from '@/lib/seo';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { OFFICIAL_SERP_NAME_BY_ID } from '@/lib/clubSeoMeta35';

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

// ─── All 21 Official Partner Venues in Axel priority order + Terrazza Duomo 21 ─
const PARTNER_22_ORDER: readonly { kind: 'venue'; id: string }[] = [
  { kind: 'venue', id: 'v-justme' },
  { kind: 'venue', id: 'v-pineta' },
  { kind: 'venue', id: 'v-voya' },
  { kind: 'venue', id: 'v-repvblic' },
  { kind: 'venue', id: 'v-55milano' },
  { kind: 'venue', id: 'v-magazzini' },
  { kind: 'venue', id: 'v-bobino' },
  { kind: 'venue', id: 'v-theclub' },
  { kind: 'venue', id: 'v-carlsbergol' },
  { kind: 'venue', id: 'v-tocqueville' },
  { kind: 'venue', id: 'v-tom' },
  { kind: 'venue', id: 'v-mibmilano' },
  { kind: 'venue', id: 'v-dazi' },
  { kind: 'venue', id: 'v-bischeri' },
  { kind: 'venue', id: 'v-gate' },
  { kind: 'venue', id: 'v-pelledoca' },
  { kind: 'venue', id: 'v-aria' },
  { kind: 'venue', id: 'v-hollywood' },
  { kind: 'venue', id: 'v-11clubroom' },
  { kind: 'venue', id: 'v-gattopardo' },
  { kind: 'venue', id: 'v-justme-garda' },
  { kind: 'venue', id: 'v-terrazza21' },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  const homeCopy = applyEditorialFields(
    getHomeSafeCopy(locale),
    await readEditorialFields('home', locale),
  );
  const homeGridAlts = currentHomeGridAlts(locale);
  const v01 = getV01SiteCopy(locale);
  const lp = localePrefix(locale);
  const clubsDir = getLocalizedDir35('clubs', locale as LocaleCode);

  const partnerClubs: V01PartnerClubSlide[] = PARTNER_22_ORDER.map((entry, idx) => {
    const rank = String(idx + 1).padStart(2, '0');
    const venue = venuesData.find((candidate) => candidate.id === entry.id);
    if (!venue || !venue.image) throw new Error(`Missing partner venue ${entry.id}`);
    const name =
      OFFICIAL_SERP_NAME_BY_ID[venue.id] ||
      getLocalizedText(venue.localizedContent.name, locale);
    const slug = getLocalizedVenueSlug35(venue.id, (locale as LocaleCode) || 'en');
    const locLabel =
      venue.id === 'v-justme-garda'
        ? 'Lonato del Garda (Lago di Garda)'
        : venueLocationLabel(venue);
    const zone = venue.address?.streetAddress
      ? `${venue.address.streetAddress} · ${locLabel}`
      : locLabel;
    const genres = venue.tags?.slice(0, 3).join(' · ') || 'House · Commercial · Hip-Hop';
    const dress = venue.localizedContent?.dressCode
      ? getLocalizedText(venue.localizedContent.dressCode, locale)
      : 'Smart & Fashion Chic';
    return {
      rank,
      id: venue.id,
      name,
      zone,
      genres,
      dress,
      image: venue.image,
      href: `${lp}/${clubsDir}/${slug}`,
      waHref: getConciergeBookingUrl(locale, `${name} · VIP Table`, lp || '/'),
    };
  });

  // Send the whole verified dated future catalog once. The client recomputes
  // Rome-day windows at hydration, on visibility return and at midnight; no
  // weekly programme can reappear from an indefinitely cached home document.
  const initialNow = new Date();
  const dateSensitiveEvents = selectPriorityVenueEvents(await getDateSensitiveCarouselInventory(locale), initialNow);
  const capodannoCarouselSlugs = [
    ...CAPODANNO_HEAD_13_SLUGS,
    ...CAPODANNO_REMAINING_PARTNER_SLUGS,
    'capodanno-terrazza-duomo-21',
    ...CAPODANNO_TAIL_2_SLUGS,
  ];
  const capodannoSlides: V01CapodannoSlide[] = capodannoCarouselSlugs
    .map((slug) => getCapodannoEventBySlug(slug))
    .filter((ev): ev is NonNullable<typeof ev> => Boolean(ev))
    .map((ev) => {
      const locEv = getCapodannoLocalizedEventContent(ev, locale);
      return {
        slug: ev.slug,
        venueName: ev.venueName,
        title: locEv.title,
        subtitle: locEv.subtitle,
        image: ev.image,
        priceBadge: formatCapodannoPriceBadge35(ev, locale),
        href: capodannoEventPath(ev.slug, locale),
        musicAndFormat: locEv.musicAndFormat,
        city: ev.city,
        waHref: getConciergeBookingUrl(locale, `${ev.venueName} · Capodanno 2027`, lp || '/'),
      };
    });

  const waLink = getConciergeBookingUrl(locale, undefined, lp || '/');
  void waLink;
  const formerHeroCopy = getHeroCopy(locale);
  const uiLabels = (() => {
    switch (locale) {
      case 'it':
        return {
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
      <main className="flex-1 flex flex-col w-full bg-[#050505] text-[#F6F1E7]">
        <NightLine />

        {/* ── 1. Full-Width Couture Noir Hero (V01 · Pre-Suasion + Commitment) ── */}
        <TableConcierge
          locale={locale}
          surface="home"
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

        {/* ── 2. Quattro Caroselli Orizzontali Separati (#capodanno · #stasera · #settimana · #locali-partner) ── */}
        <div data-cialdini="authority social-proof scarcity unity">
          <V01HomeCarousels
            locale={locale}
            localePrefix={lp}
            initialNow={initialNow.toISOString()}
            capodannoEvents={capodannoSlides}
            dateSensitiveEvents={dateSensitiveEvents}
            partnerClubs={partnerClubs}
            capodannoHubHref={capodannoPath(locale)}
            tonightHref={`${lp}/events/tonight`}
            weekHref={`${lp}/events/this-week`}
            clubsHref={`${lp}/clubs`}
          />
        </div>

        {/* ── 3. San Siro Banner (Alternativa 02 · Capitolo Carta Calda #F6F1E7 + Plinto #050505) ─── */}
        <section className="w-full border-y border-[#050505] bg-[#F6F1E7] text-[#050505]">
          <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 border-x border-[#050505]/18 px-5 py-10 md:flex-row md:items-center sm:px-14 sm:py-12">
            <div>
              <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#4A453E]">
                {uiLabels.sanSiroEye}
              </p>
              <h2 className="font-serif text-2xl font-bold text-[#050505] sm:text-4xl">
                {uiLabels.sanSiroTitle}
              </h2>
              <p className="mt-2 max-w-[64ch] font-sans text-sm leading-relaxed text-[#24201B]">
                {uiLabels.sanSiroBody}
              </p>
            </div>
            <div className="shrink-0 bg-[#050505] p-1.5">
              <Link
                href={`${lp}/football-afterparties`}
                prefetch={false}
                className="inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#050505] transition-colors hover:bg-[#2EE472]"
              >
                {uiLabels.sanSiroCta}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 4. Formule d'Accesso Rapido (Intent Cards · 1 colonna mobile) ───────────────────────── */}
        <div data-cialdini="liking reciprocity" className="w-full border-b border-[#F6F1E7]/14 bg-[#050505]">
          <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14">
            <IntentCards locale={locale} />
          </div>
        </div>

        {/* ── 5. Esplora per Categoria e Quartiere (Alternativa 02 · Capitolo Carta Calda #F6F1E7 · 1 colonna mobile) ── */}
        <section className="w-full border-y border-[#050505] bg-[#F6F1E7] text-[#050505]">
          <div className="mx-auto max-w-[1440px] border-x border-[#050505]/18 px-5 py-12 sm:px-14 sm:py-16">
            <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#4A453E]">
              {homeCopy.discoverLabel}
            </p>
            <h2 className="mb-6 font-serif text-3xl font-bold text-[#050505] sm:mb-8 sm:text-5xl">
              {homeCopy.categoriesTitle}
            </h2>
            <div className="grid grid-cols-1 border-l border-t border-[#050505]/20 bg-[#FFFFFF] md:grid-cols-2 lg:grid-cols-4">
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
                  className="flex min-h-[64px] items-center justify-between border-b border-r border-[#050505]/20 px-5 py-4 text-[#050505] transition-colors hover:bg-[#EAE3D5] md:min-h-[96px] md:flex-col md:items-start md:p-6"
                >
                  <div className="flex items-center gap-3.5 md:flex-col md:items-start md:gap-2">
                    <span className="font-serif text-xl font-bold italic tabular-nums text-[#4A453E] sm:text-2xl">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-extrabold text-[#050505]">
                      {tag.label}
                    </span>
                  </div>
                  <span aria-hidden="true" className="font-mono text-sm font-bold text-[#050505]">↗</span>
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
