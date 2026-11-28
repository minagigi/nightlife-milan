import {
  DEFAULT_LOCALE,
  getLocaleDef,
  localePrefix,
  type LocaleCode,
} from './locales';
import { getLocalizedDir35, DIR_AND_SUB_TOKENS_35 } from './dirTokens35';
import { getLocalizedVenueSlug35, localizeInternalHref } from './localizedSlugs35';
import { getFooterCopy } from '../footerLocaleCopy';
import { getV01SiteCopy } from './v01SiteCopy35';
import { capodannoCategoryPath } from '../capodanno/routes';
import { getCapodannoMasterSeo35 } from '../capodanno/capodannoMasterSeo35';
import {
  getVenueCardPhoto4x5,
  getZoneCardPhoto4x5,
  getGenreCardPhoto4x5,
  getHubOrPillarCardPhoto4x5,
} from '../siteCardAssets4x5';

export type TocTopicKey =
  | 'highlights'
  | 'sanSiro'
  | 'formulas'
  | 'categories'
  | 'overview'
  | 'clubs'
  | 'map'
  | 'catalog'
  | 'related'
  | 'calendar'
  | 'tonight'
  | 'weekend'
  | 'special'
  | 'pricing'
  | 'booking'
  | 'rules'
  | 'faq'
  | 'archive';

export type SiloClusterKey =
  | 'home'
  | 'clubs'
  | 'zones'
  | 'genres'
  | 'events'
  | 'services'
  | 'guides';

export interface HomeOverviewPillar {
  title: string;
  body: string;
}

export interface ContextualLocalePack35 {
  tocHeading: string;
  tocSubtitle: string;
  exploreCta: string;
  siloEyebrow: Record<SiloClusterKey, string>;
  siloHeading: Record<SiloClusterKey, string>;
  tocLabels: Record<TocTopicKey, string>;
  cardTags: {
    partnerClub: string;
    district: string;
    genre: string;
    service: string;
    calendar: string;
    guide: string;
  };
  homeOverviewTitle: string;
  homeOverviewLead: string;
  homeOverviewPillars: readonly [
    HomeOverviewPillar,
    HomeOverviewPillar,
    HomeOverviewPillar,
    HomeOverviewPillar,
  ];
}

function buildPack(
  tocHeading: string,
  tocSubtitle: string,
  exploreCta: string,
  siloBase: {
    relatedEyebrow: string;
    clubsHeading: string;
    zonesHeading: string;
    genresHeading: string;
    eventsHeading: string;
    servicesHeading: string;
    guidesHeading: string;
    homeHeading: string;
  },
  tocLabels: Record<TocTopicKey, string>,
  cardTags: ContextualLocalePack35['cardTags'],
  homeOverviewTitle: string,
  homeOverviewLead: string,
  homeOverviewPillars: ContextualLocalePack35['homeOverviewPillars'],
): ContextualLocalePack35 {
  return {
    tocHeading,
    tocSubtitle,
    exploreCta,
    siloEyebrow: {
      home: siloBase.relatedEyebrow,
      clubs: siloBase.relatedEyebrow,
      zones: siloBase.relatedEyebrow,
      genres: siloBase.relatedEyebrow,
      events: siloBase.relatedEyebrow,
      services: siloBase.relatedEyebrow,
      guides: siloBase.relatedEyebrow,
    },
    siloHeading: {
      home: siloBase.homeHeading,
      clubs: siloBase.clubsHeading,
      zones: siloBase.zonesHeading,
      genres: siloBase.genresHeading,
      events: siloBase.eventsHeading,
      services: siloBase.servicesHeading,
      guides: siloBase.guidesHeading,
    },
    tocLabels,
    cardTags,
    homeOverviewTitle,
    homeOverviewLead,
    homeOverviewPillars,
  };
}

const PACKS_35: Record<LocaleCode, ContextualLocalePack35> = {
  it: buildPack(
    'Indice della Pagina',
    'Vai direttamente alla sezione di tuo interesse:',
    'Approfondisci',
    {
      relatedEyebrow: 'PERCORSI CORRELATI · NIGHTLIFE MILAN',
      homeHeading: 'Percorsi Rapidi tra Club Partner, Quartieri e Serate',
      clubsHeading: 'Quartiere, Serate in Programma e Locali Partner Affini',
      zonesHeading: 'Club Partner, Rooftop e Serate in Questo Quadrante',
      genresHeading: 'Locali di Riferimento, Serate Affini e Formule Tavolo',
      eventsHeading: 'Altre Serate in Programma, Club Partner e Tavoli VIP',
      servicesHeading: 'Servizi Complementari e Locali Partner Ufficiali',
      guidesHeading: 'Guide Collegate, Locali Partner e Calendario Serate',
    },
    {
      highlights: 'Serate & Club in Evidenza',
      sanSiro: 'Dopo-Partita San Siro',
      formulas: 'Formule Tavolo, Lista & Aperitivo',
      categories: 'Categorie & Quartieri',
      overview: 'Guida Rapida alla Notte Milanese',
      clubs: 'Club Partner in Evidenza',
      map: 'Mappa & Posizione Locali',
      catalog: 'Catalogo Completo Locali',
      related: 'Percorsi & Club Correlati',
      calendar: 'Calendario Serate Attive',
      tonight: 'Serate Aperte Stasera',
      weekend: 'Programma della Settimana',
      special: 'Grandi Eventi & Date Speciali',
      pricing: 'Prezzi, Tavoli VIP & Formule',
      booking: 'Prenotazione Diretta WhatsApp',
      rules: 'Dress Code, Orari & Selezione',
      faq: 'Domande Frequenti',
      archive: 'Archivio Serate Concluse',
    },
    {
      partnerClub: 'Club Partner',
      district: 'Quartiere Milano',
      genre: 'Stile Musicale',
      service: 'Servizio Concierge',
      calendar: 'Calendario Live',
      guide: 'Guida Ufficiale',
    },
    'Come Orientarsi nella Vita Notturna di Milano: Club, Tavoli VIP e Quartieri',
    'Sintesi operativa curata dal desk ufficiale Nightlife Milan per scegliere locale, formula d’ingresso e quartiere prima di uscire.',
    [
      {
        title: '01 · Club Iconici, Rooftop e Dinner Show',
        body: 'Dai giardini sotto la Torre Branca da Just Me Milano al 20° piano panoramico del Voya Rooftop, fino ai lampadari di cristallo del Pineta, al salotto di REPVBLIC e al loft di 55 Milano: ogni scheda mostra programmazione reale e formule serata.',
      },
      {
        title: '02 · Tavoli VIP Privé con 100% Credito Bottiglie',
        body: 'La prenotazione tavolo garantisce ingresso prioritario salta-fila, area riservata in pista, balconata o super privé consolle e importo interamente convertito in bottiglie dal listino ufficiale del locale.',
      },
      {
        title: '03 · Liste Nominali, Orari e Dress Code',
        body: 'Per il Royal Aperitivo la fascia ideale è 19:30–21:30; per il clubbing l’accredito nominale scorre tra le 23:15 e le 00:30 con abbigliamento curato e documento d’identità valido.',
      },
      {
        title: '04 · Quartieri e Assistenza Diretta WhatsApp 7/7',
        body: 'Da Parco Sempione, Corso Como e Porta Nuova fino a CityLife, Isola, Navigli e San Siro: scrivendo su WhatsApp al +39 351 912 7047 ricevi subito disponibilità, planimetrie e conferma scritta.',
      },
    ],
  ),
  en: buildPack(
    'Page Index',
    'Jump straight to the section you need:',
    'Explore',
    {
      relatedEyebrow: 'RELATED PATHS · NIGHTLIFE MILAN',
      homeHeading: 'Direct Paths Across Partner Clubs, Districts & Nights',
      clubsHeading: 'District, Scheduled Nights & Matching Partner Venues',
      zonesHeading: 'Partner Clubs, Rooftops & Nights in This Area',
      genresHeading: 'Signature Venues, Matching Nights & VIP Table Options',
      eventsHeading: 'Upcoming Nights, Official Partner Clubs & VIP Tables',
      servicesHeading: 'Complementary Concierge Services & Partner Clubs',
      guidesHeading: 'Related Editorial Guides, Partner Clubs & Live Calendar',
    },
    {
      highlights: 'Featured Nights & Clubs',
      sanSiro: 'San Siro Match Afterparties',
      formulas: 'VIP Table, Guest List & Aperitivo',
      categories: 'Categories & Districts',
      overview: 'Milan Nightlife Quick Reference',
      clubs: 'Featured Partner Clubs',
      map: 'Interactive Venue Map',
      catalog: 'Complete Club Directory',
      related: 'Related Clubs & Guides',
      calendar: 'Live Events Calendar',
      tonight: 'Open Tonight in Milan',
      weekend: 'This Week & Weekend Lineup',
      special: 'Major & Thematic Events',
      pricing: 'Prices, VIP Tables & Formulas',
      booking: 'Direct WhatsApp Booking',
      rules: 'Dress Code, Hours & Door Policy',
      faq: 'Frequently Asked Questions',
      archive: 'Past Events Archive',
    },
    {
      partnerClub: 'Partner Club',
      district: 'Milan District',
      genre: 'Music Format',
      service: 'Concierge Service',
      calendar: 'Live Calendar',
      guide: 'Editorial Guide',
    },
    'Navigating Milan Nightlife: Official Partner Clubs, VIP Tables & Districts',
    'Operational summary curated by the Nightlife Milan concierge desk to pick the right venue, entry formula and district.',
    [
      {
        title: '01 · Flagship Clubs, Rooftops & Dinner Shows',
        body: 'From Parco Sempione beneath Torre Branca at Just Me Milano to the 20th-floor skyline at Voya Rooftop, crystal chandeliers at Pineta, REPVBLIC in Porta Nuova and 55 Milano: compare verified formats in real time.',
      },
      {
        title: '02 · VIP Privé Tables with 100% Bottle Credit',
        body: 'Reserving a VIP table secures fast-track host admission, dedicated seating across dancefloor, privé or stage-side console zones, and full minimum-spend credit toward official bottle menus.',
      },
      {
        title: '03 · Nominal Guest Lists, Timing & Dress Code',
        body: 'Arrive between 19:30 and 21:30 for Milanese Royal Aperitivo or between 23:15 and 00:30 for club guest lists, keeping smart attire and valid ID ready at the door.',
      },
      {
        title: '04 · Districts & 7/7 Direct WhatsApp Concierge',
        body: 'Covering Parco Sempione, Corso Como, Porta Nuova, CityLife, Isola, Navigli and San Siro: message +39 351 912 7047 on WhatsApp for instant floorplans and written confirmation.',
      },
    ],
  ),
  es: buildPack(
    'Índice de la Página',
    'Salta directamente a la sección que buscas:',
    'Explorar',
    {
      relatedEyebrow: 'RUTAS RELACIONADAS · NIGHTLIFE MILAN',
      homeHeading: 'Acceso Rápido a Clubes Socios, Barrios y Fiestas',
      clubsHeading: 'Barrio, Próximas Fiestas y Clubes Socios Similares',
      zonesHeading: 'Clubes Socios, Rooftops y Fiestas en Esta Zona',
      genresHeading: 'Clubes de Referencia, Fiestas Afines y Mesas VIP',
      eventsHeading: 'Próximas Noches, Clubes Socios Oficiales y Mesas VIP',
      servicesHeading: 'Servicios Complementarios y Clubes Socios Oficiales',
      guidesHeading: 'Guías Relacionadas, Clubes Socios y Calendario',
    },
    {
      highlights: 'Fiestas y Clubes Destacados',
      sanSiro: 'Post-Partido San Siro',
      formulas: 'Mesas VIP, Lista y Aperitivo',
      categories: 'Categorías y Barrios',
      overview: 'Resumen de la Noche en Milán',
      clubs: 'Clubes Socios Destacados',
      map: 'Mapa de Discotecas',
      catalog: 'Directorio Completo de Clubes',
      related: 'Clubes y Rutas Relacionadas',
      calendar: 'Calendario de Eventos Activos',
      tonight: 'Abiertos Esta Noche',
      weekend: 'Programación de la Semana',
      special: 'Eventos Especiales y Temáticos',
      pricing: 'Precios, Mesas VIP y Fórmulas',
      booking: 'Reserva Directa por WhatsApp',
      rules: 'Dress Code, Horarios y Acceso',
      faq: 'Preguntas Frecuentes',
      archive: 'Archivo de Eventos Pasados',
    },
    {
      partnerClub: 'Club Socio',
      district: 'Barrio de Milán',
      genre: 'Estilo Musical',
      service: 'Servicio Concierge',
      calendar: 'Calendario en Vivo',
      guide: 'Guía Oficial',
    },
    'Cómo Moverse por la Noche de Milán: Clubes, Mesas VIP y Barrios',
    'Guía práctica del concierge oficial Nightlife Milan para elegir discoteca, acceso y zona antes de salir.',
    [
      { title: '01 · Clubes Icónicos, Rooftops y Dinner Show', body: 'Desde Just Me Milano bajo la Torre Branca hasta la planta 20 de Voya Rooftop, Pineta, REPVBLIC y 55 Milano: consulta programación verificada y cenas espectáculo.' },
      { title: '02 · Mesas VIP con 100% Crédito en Botellas', body: 'La reserva de mesa VIP garantiza acceso prioritario sin colas, zona privada y el importe íntegro destinado a botellas de la carta oficial.' },
      { title: '03 · Lista de Invitados, Horarios y Vestimenta', body: 'Llega entre 19:30 y 21:30 para el aperitivo milanés o entre 23:15 y 00:30 para entrar en lista con vestimenta elegante y documento válido.' },
      { title: '04 · Barrios y Concierge WhatsApp 7/7', body: 'Cobertura en Sempione, Corso Como, Porta Nuova, CityLife, Isola, Navigli y San Siro escribiendo al +39 351 912 7047.' },
    ],
  ),
  fr: buildPack(
    'Sommaire de la Page',
    'Accédez directement à la rubrique souhaitée :',
    'Découvrir',
    {
      relatedEyebrow: 'PARCOURS ASSOCIÉS · NIGHTLIFE MILAN',
      homeHeading: 'Accès Direct aux Clubs Partenaires, Quartiers et Soirées',
      clubsHeading: 'Quartier, Prochaines Soirées et Clubs Partenaires Associés',
      zonesHeading: 'Clubs Partenaires, Rooftops et Soirées du Quartier',
      genresHeading: 'Clubs de Référence, Soirées et Tables VIP',
      eventsHeading: 'Prochaines Soirées, Clubs Partenaires et Tables VIP',
      servicesHeading: 'Services Complémentaires et Clubs Partenaires',
      guidesHeading: 'Guides Associés, Clubs Partenaires et Calendrier',
    },
    {
      highlights: 'Soirées et Clubs à la Une',
      sanSiro: 'Après-Match San Siro',
      formulas: 'Tables VIP, Guest List et Aperitivo',
      categories: 'Catégories et Quartiers',
      overview: 'Repères sur la Nuit à Milan',
      clubs: 'Clubs Partenaires à la Une',
      map: 'Carte des Établissements',
      catalog: 'Catalogue Complet des Clubs',
      related: 'Clubs et Parcours Associés',
      calendar: 'Calendrier des Soirées',
      tonight: 'Sortir Ce Soir à Milan',
      weekend: 'Programme de la Semaine',
      special: 'Grands Événements et Soirées Spéciales',
      pricing: 'Tarifs, Tables VIP et Formules',
      booking: 'Réservation Directe WhatsApp',
      rules: 'Dress Code, Horaires et Entrée',
      faq: 'Questions Fréquentes',
      archive: 'Archives des Soirées Passées',
    },
    {
      partnerClub: 'Club Partenaire',
      district: 'Quartier de Milan',
      genre: 'Style Musical',
      service: 'Conciergerie VIP',
      calendar: 'Calendrier Live',
      guide: 'Guide Officiel',
    },
    'Repères pour Sortir à Milan : Clubs Partenaires, Tables VIP et Quartiers',
    'Synthèse pratique de la conciergerie Nightlife Milan pour choisir votre club, votre formule et votre quartier.',
    [
      { title: '01 · Clubs Iconiques, Rooftops et Dinner Shows', body: 'De Just Me Milano sous la Torre Branca au 20e étage du Voya Rooftop, en passant par Pineta, REPVBLIC et 55 Milano : programmation vérifiée chaque semaine.' },
      { title: '02 · Tables VIP Privé 100% Crédit Bouteilles', body: 'Une table réservée assure une entrée prioritaire coupe-file, un espace dédié et un minimum spend intégralement converti en bouteilles.' },
      { title: '03 · Guest List Nominative et Dress Code', body: 'Arrivez entre 19h30 et 21h30 pour le Royal Aperitivo ou entre 23h15 et 00h30 en guest list avec une tenue soignée.' },
      { title: '04 · Quartiers et Conciergerie WhatsApp 7j/7', body: 'Assistance directe au +39 351 912 7047 pour Sempione, Corso Como, Porta Nuova, CityLife, Navigli et San Siro.' },
    ],
  ),
  de: buildPack(
    'Inhalt dieser Seite',
    'Springen Sie direkt zum gewünschten Abschnitt:',
    'Entdecken',
    {
      relatedEyebrow: 'PASSENDE BEREICHE · NIGHTLIFE MILAN',
      homeHeading: 'Direktzugriff auf Partner-Clubs, Viertel und Partys',
      clubsHeading: 'Viertel, Kommende Partys und Ähnliche Partner-Clubs',
      zonesHeading: 'Partner-Clubs, Rooftops und Abende im Viertel',
      genresHeading: 'Passende Clubs, Musik-Events und VIP-Tische',
      eventsHeading: 'Weitere Partys, Offizielle Partner-Clubs und VIP-Tische',
      servicesHeading: 'Ergänzende Concierge-Services und Partner-Clubs',
      guidesHeading: 'Verwandte Guides, Partner-Clubs und Eventkalender',
    },
    {
      highlights: 'Top-Events & Partner-Clubs',
      sanSiro: 'San-Siro-Afterpartys',
      formulas: 'VIP-Tisch, Gästeliste & Aperitivo',
      categories: 'Kategorien & Stadtteile',
      overview: 'Kurzüberblick Mailänder Nachtleben',
      clubs: 'Empfohlene Partner-Clubs',
      map: 'Interaktive Club-Karte',
      catalog: 'Komplettes Club-Verzeichnis',
      related: 'Passende Clubs & Seiten',
      calendar: 'Aktueller Eventkalender',
      tonight: 'Heute Abend Geöffnet',
      weekend: 'Programm der Woche',
      special: 'Besondere Events & Themennächte',
      pricing: 'Preise, VIP-Tische & Pakete',
      booking: 'Direktbuchung per WhatsApp',
      rules: 'Dresscode, Zeiten & Einlass',
      faq: 'Häufige Fragen (FAQ)',
      archive: 'Archiv Vergangener Events',
    },
    {
      partnerClub: 'Partner-Club',
      district: 'Mailänder Viertel',
      genre: 'Musikstil',
      service: 'VIP-Concierge',
      calendar: 'Live-Kalender',
      guide: 'Redaktions-Guide',
    },
    'Orientierung im Mailänder Nachtleben: Partner-Clubs, VIP-Tische & Viertel',
    'Kompakter Überblick unseres Nightlife-Milan-Concierge-Teams für Clubwahl, Einlass und Tischreservierung.',
    [
      { title: '01 · Ikonische Clubs, Rooftops & Dinner-Shows', body: 'Vom Just Me Milano am Torre Branca über die 20. Etage des Voya Rooftop bis zu Pineta, REPVBLIC und 55 Milano mit geprüften Terminen.' },
      { title: '02 · VIP-Tische mit 100% Flaschenguthaben', body: 'Bevorzugter Einlass ohne Warteschlange, reservierter Privé-Bereich und volle Anrechnung des Mindestumsatzes auf die offizielle Flaschenkarte.' },
      { title: '03 · Gästeliste, Zeiten & Dresscode', body: 'Ideale Ankunft zwischen 19:30 und 21:30 Uhr zum Aperitivo oder 23:15 bis 00:30 Uhr für die Club-Gästeliste in gepflegter Abendgarderobe.' },
      { title: '04 · Stadtteile & WhatsApp-Concierge 7/7', body: 'Direkte Pläne und schriftliche Bestätigung für Sempione, Corso Como, Porta Nuova, CityLife, Navigli und San Siro unter +39 351 912 7047.' },
    ],
  ),
  pt: buildPack(
    'Índice da Página',
    'Aceda diretamente à secção pretendida:',
    'Ver mais',
    {
      relatedEyebrow: 'SUGESTÕES RELACIONADAS · NIGHTLIFE MILAN',
      homeHeading: 'Acesso Rápido a Clubes Parceiros, Bairros e Festas',
      clubsHeading: 'Bairro, Próximas Noites e Clubes Parceiros Semelhantes',
      zonesHeading: 'Clubes Parceiros, Rooftops e Noites Nesta Zona',
      genresHeading: 'Clubes de Referência, Festas e Mesas VIP',
      eventsHeading: 'Próximos Eventos, Clubes Parceiros e Mesas VIP',
      servicesHeading: 'Serviços Complementares e Clubes Parceiros',
      guidesHeading: 'Guias Relacionados, Clubes e Calendário',
    },
    {
      highlights: 'Festas e Clubes em Destaque', sanSiro: 'Pós-Jogo San Siro', formulas: 'Mesas VIP, Lista e Aperitivo',
      categories: 'Categorias e Bairros', overview: 'Resumo da Noite em Milão', clubs: 'Clubes Parceiros',
      map: 'Mapa de Locais', catalog: 'Catálogo Completo de Clubes', related: 'Clubes e Páginas Relacionadas',
      calendar: 'Calendário de Eventos', tonight: 'Abertos Esta Noite', weekend: 'Programa da Semana',
      special: 'Eventos Especiais', pricing: 'Preços e Mesas VIP', booking: 'Reserva no WhatsApp',
      rules: 'Dress Code e Horários', faq: 'Perguntas Frequentes', archive: 'Arquivo de Eventos',
    },
    { partnerClub: 'Clube Parceiro', district: 'Bairro de Milão', genre: 'Estilo Musical', service: 'Concierge VIP', calendar: 'Calendário', guide: 'Guia Oficial' },
    'Guia Rápido da Vida Noturna de Milão: Clubes, Mesas VIP e Bairros',
    'Síntese operacional do concierge Nightlife Milan para escolher local, formato e reserva.',
    [
      { title: '01 · Clubes Icónicos, Rooftops e Dinner Show', body: 'De Just Me Milano sob a Torre Branca ao 20.º andar do Voya Rooftop, Pineta, REPVBLIC e 55 Milano com agenda confirmada.' },
      { title: '02 · Mesas VIP com 100% Crédito em Garrafas', body: 'Entrada prioritária sem fila, área reservada e valor mínimo totalmente convertido em garrafas do menu oficial.' },
      { title: '03 · Guest List, Horários e Dress Code', body: 'Chegada recomendada entre 19:30 e 21:30 no aperitivo ou entre 23:15 e 00:30 na lista nominal com traje elegante.' },
      { title: '04 · Bairros e Apoio WhatsApp 7/7', body: 'Atendimento rápido em Sempione, Corso Como, Porta Nuova, CityLife, Navigli e San Siro pelo +39 351 912 7047.' },
    ],
  ),
  nl: buildPack(
    'Pagina-overzicht',
    'Ga direct naar het gewenste onderdeel:',
    'Bekijken',
    {
      relatedEyebrow: 'GERELATEERDE PAGINA’S · NIGHTLIFE MILAN',
      homeHeading: 'Snel naar Partnerclubs, Wijken en Avonden',
      clubsHeading: 'Wijk, Geplande Avonden en Vergelijkbare Partnerclubs',
      zonesHeading: 'Partnerclubs, Rooftops en Uitgaan in Deze Wijk',
      genresHeading: 'Aanbevolen Clubs, Muziekavonden en VIP-Tafels',
      eventsHeading: 'Komende Avonden, Partnerclubs en VIP-Tafels',
      servicesHeading: 'Aanvullende Services en Officiële Partnerclubs',
      guidesHeading: 'Gerelateerde Gidsen, Partnerclubs en Agenda',
    },
    {
      highlights: 'Uitgelichte Avonden & Clubs', sanSiro: 'San Siro Afterparty’s', formulas: 'VIP-Tafels, Gastenlijst & Aperitivo',
      categories: 'Categorieën & Wijken', overview: 'Korte Gids Nachtleven Milaan', clubs: 'Uitgelichte Partnerclubs',
      map: 'Locatiekaart', catalog: 'Volledig Cluboverzicht', related: 'Gerelateerde Clubs & Gidsen',
      calendar: 'Evenementenagenda', tonight: 'Vanavond Geopend', weekend: 'Programma Deze Week',
      special: 'Speciale Evenementen', pricing: 'Prijzen & VIP-Tafels', booking: 'Direct Boeken via WhatsApp',
      rules: 'Dresscode & Tijden', faq: 'Veelgestelde Vragen', archive: 'Archief Evenementen',
    },
    { partnerClub: 'Partnerclub', district: 'Wijk in Milaan', genre: 'Muziekstijl', service: 'VIP-Service', calendar: 'Live Agenda', guide: 'Gids' },
    'Wegwijs in het Nachtleven van Milaan: Partnerclubs, VIP-Tafels en Wijken',
    'Praktisch overzicht van onze Nightlife Milan concierge voor clubkeuze, gastenlijst en tafelreservering.',
    [
      { title: '01 · Topclubs, Rooftops & Dinner Shows', body: 'Van Just Me Milano bij Torre Branca en de 20e verdieping van Voya Rooftop tot Pineta, REPVBLIC en 55 Milano.' },
      { title: '02 · VIP-Tafels met 100% Flessentegoed', body: 'Versnelde toegang zonder wachtrij, eigen privézone en volledige besteding op de officiële flessenkaart.' },
      { title: '03 · Gastenlijst, Tijden & Dresscode', body: 'Kom tussen 19:30 en 21:30 voor aperitivo of tussen 23:15 en 00:30 voor de clublijst in verzorgde avondkleding.' },
      { title: '04 · Wijken & 7/7 WhatsApp-Concierge', body: 'Directe beschikbaarheid en plattegronden voor Sempione, Corso Como, Porta Nuova, CityLife en San Siro via +39 351 912 7047.' },
    ],
  ),
  ru: buildPack(
    'Содержание страницы',
    'Перейдите сразу к нужному разделу:',
    'Подробнее',
    {
      relatedEyebrow: 'ПОХОЖИЕ РАЗДЕЛЫ · NIGHTLIFE MILAN',
      homeHeading: 'Быстрый переход к клубам-партнерам, районам и вечеринкам',
      clubsHeading: 'Район, ближайшие вечеринки и клубы-партнеры',
      zonesHeading: 'Клубы-партнеры, руфтопы и вечеринки района',
      genresHeading: 'Лучшие клубы жанра, вечеринки и VIP-столы',
      eventsHeading: 'Ближайшие вечеринки, клубы-партнеры и VIP-столы',
      servicesHeading: 'Дополнительные услуги консьержа и клубы-партнеры',
      guidesHeading: 'Связанные гиды, клубы и календарь событий',
    },
    {
      highlights: 'Главные вечеринки и клубы', sanSiro: 'Афтепати матчей Сан-Сиро', formulas: 'VIP-столы, списки и аперитиво',
      categories: 'Категории и районы', overview: 'Краткий гид по ночному Милану', clubs: 'Клубы-партнеры',
      map: 'Карта заведений', catalog: 'Полный каталог клубов', related: 'Рекомендуемые разделы',
      calendar: 'Календарь вечеринок', tonight: 'Открыто сегодня вечером', weekend: 'Афиша недели',
      special: 'Специальные события', pricing: 'Цены и VIP-столы', booking: 'Бронь в WhatsApp',
      rules: 'Дресс-код и вход', faq: 'Частые вопросы', archive: 'Архив прошедших вечеринок',
    },
    { partnerClub: 'Клуб-партнер', district: 'Район Милана', genre: 'Музыкальный стиль', service: 'VIP-консьерж', calendar: 'Афиша', guide: 'Гид' },
    'Ночная жизнь Милана: клубы-партнеры, VIP-столы и районы города',
    'Практическая памятка официального консьержа Nightlife Milan для выбора клуба и формата отдыха.',
    [
      { title: '01 · Знаковые клубы, руфтопы и ужин-шоу', body: 'Just Me Milano у башни Торре-Бранка, панорамный 20-й этаж Voya Rooftop, Pineta, REPVBLIC и 55 Milano с актуальной программой.' },
      { title: '02 · VIP-столы со 100% депозитом на напитки', body: 'Приоритетный вход без очереди, приватная ложа и полный зачет депозита по официальному меню бутылок клуба.' },
      { title: '03 · Гостевые списки, время и дресс-код', body: 'Оптимальное время прихода: 19:30–21:30 на аперитиво и 23:15–00:30 по списку на вечеринку в элегантном образе.' },
      { title: '04 · Районы и консьерж в WhatsApp 7/7', body: 'Планы залов и письменное подтверждение по номеру +39 351 912 7047 для Sempione, Corso Como, Porta Nuova и San Siro.' },
    ],
  ),
  tr: buildPack(
    'Sayfa İçeriği',
    'İlgilendiğiniz bölüme doğrudan geçin:',
    'İncele',
    {
      relatedEyebrow: 'İLGİLİ BAĞLANTILAR · NIGHTLIFE MILAN',
      homeHeading: 'Partner Kulüpler, Semtler ve Etkinliklere Hızlı Erişim',
      clubsHeading: 'Semt, Yaklaşan Geceler ve Benzer Partner Kulüpler',
      zonesHeading: 'Bu Bölgedeki Partner Kulüpler, Rooftop’lar ve Geceler',
      genresHeading: 'Öne Çıkan Kulüpler, Etkinlikler ve VIP Masalar',
      eventsHeading: 'Diğer Etkinlikler, Resmi Partner Kulüpler ve VIP Masalar',
      servicesHeading: 'Tamamlayıcı Concierge Hizmetleri ve Partner Kulüpler',
      guidesHeading: 'İlgili Rehberler, Partner Kulüpler ve Etkinlik Takvimi',
    },
    {
      highlights: 'Öne Çıkan Geceler ve Kulüpler', sanSiro: 'San Siro Maç Sonrası', formulas: 'VIP Masa, Liste ve Aperitivo',
      categories: 'Kategoriler ve Semtler', overview: 'Milano Gece Hayatı Özeti', clubs: 'Partner Kulüpler',
      map: 'Mekân Haritası', catalog: 'Tüm Kulüpler Kataloğu', related: 'İlgili Kulüp ve Rehberler',
      calendar: 'Etkinlik Takvimi', tonight: 'Bu Gece Açık Mekânlar', weekend: 'Haftalık Program',
      special: 'Özel Etkinlikler', pricing: 'Fiyatlar ve VIP Masalar', booking: 'WhatsApp Rezervasyon',
      rules: 'Dress Code ve Giriş Kuralları', faq: 'Sıkça Sorulan Sorular', archive: 'Geçmiş Etkinlik Arşivi',
    },
    { partnerClub: 'Partner Kulüp', district: 'Milano Semti', genre: 'Müzik Tarzı', service: 'VIP Danışma', calendar: 'Canlı Takvim', guide: 'Rehber' },
    'Milano Gece Hayatı Rehberi: Partner Kulüpler, VIP Masalar ve Semtler',
    'Doğru kulüp, giriş seçeneği ve semti seçmeniz için Nightlife Milan resmi concierge özeti.',
    [
      { title: '01 · Seçkin Kulüpler, Rooftop’lar ve Dinner Show', body: 'Torre Branca altındaki Just Me Milano’dan 20. kattaki Voya Rooftop, Pineta, REPVBLIC ve 55 Milano’ya güncel programlar.' },
      { title: '02 · %100 Şişe Kredili VIP Masa Rezervasyonu', body: 'Sıra beklemeden öncelikli giriş, özel loca alanı ve resmi şişe menüsünde tam harcama kredisi.' },
      { title: '03 · Davetli Listesi, Saatler ve Kıyafet Kuralı', body: 'Aperitivo için 19:30–21:30, kulüp listesi için 23:15–00:30 arasında şık kıyafet ve kimlikle giriş yapılır.' },
      { title: '04 · Semtler ve 7/7 WhatsApp Concierge', body: 'Sempione, Corso Como, Porta Nuova, CityLife ve San Siro için +39 351 912 7047 hattından anında onay.' },
    ],
  ),
  zh: buildPack(
    '本页目录',
    '点击直接跳转至所需章节：',
    '查看详情',
    {
      relatedEyebrow: '相关推荐 · NIGHTLIFE MILAN',
      homeHeading: '快速前往合作夜店、街区与派对日程',
      clubsHeading: '所在街区、近期派对与同级合作夜店',
      zonesHeading: '本区合作夜店、全景露台与热门派对',
      genresHeading: '代表性夜店、同风格派对与VIP卡座',
      eventsHeading: '近期热门派对、官方合作夜店与VIP卡座',
      servicesHeading: '配套礼宾服务与官方合作夜店',
      guidesHeading: '相关指南、合作夜店与活动日历',
    },
    {
      highlights: '精选派对与热门夜店', sanSiro: '圣西罗赛后派对', formulas: 'VIP卡座、名单与开胃酒',
      categories: '分类与热门街区', overview: '米兰夜生活实用概览', clubs: '官方合作夜店',
      map: '夜店分布地图', catalog: '完整夜店名录', related: '相关夜店与指南',
      calendar: '实时活动日历', tonight: '今晚营业夜店', weekend: '本周及周末派对',
      special: '大型特别活动', pricing: '价格与VIP卡座方案', booking: 'WhatsApp直接预订',
      rules: '着装要求与入场时间', faq: '常见问题解答', archive: '往期活动归档',
    },
    { partnerClub: '合作夜店', district: '米兰街区', genre: '音乐风格', service: 'VIP礼宾', calendar: '活动日历', guide: '官方指南' },
    '米兰夜生活精选指南：官方合作夜店、VIP卡座与核心街区',
    '由 Nightlife Milan 官方礼宾团队整理，助您快速选择合适夜店、入场方式与街区。',
    [
      { title: '01 · 地标夜店、高空露台与晚宴秀', body: '涵盖布兰卡塔下的 Just Me Milano、20层高空 Voya Rooftop、Pineta、REPVBLIC 与 55 Milano 的实时档期。' },
      { title: '02 · VIP卡座尊享100%酒水抵扣', body: '预订VIP卡座可享优先快速通道、专属包厢座位，最低消费全额折算官方酒单饮品。' },
      { title: '03 · 嘉宾名单、入场时段与着装规范', body: '意式开胃酒建议19:30–21:30到场，午夜派对名单建议23:15–00:30着正装优雅入场。' },
      { title: '04 · 核心街区与7/7 WhatsApp礼宾支持', body: '覆盖森皮奥内、科莫大道、新门、CityLife及圣西罗，联系 +39 351 912 7047 获取座位图与书面确认。' },
    ],
  ),
  ar: buildPack(
    'محتويات الصفحة',
    'انتقل مباشرة إلى القسم المطلوب:',
    'استكشف',
    {
      relatedEyebrow: 'روابط ذات صلة · NIGHTLIFE MILAN',
      homeHeading: 'وصول سريع إلى النوادي الشريكة والأحياء والسهرات',
      clubsHeading: 'الحي والسهرات القادمة والنوادي الشريكة المشابهة',
      zonesHeading: 'النوادي الشريكة والروفتوب والسهرات في هذه المنطقة',
      genresHeading: 'أبرز النوادي والسهرات وطاولات VIP',
      eventsHeading: 'السهرات القادمة والنوادي الشريكة وطاولات VIP',
      servicesHeading: 'خدمات الكونسيرج المكملة والنوادي الشريكة',
      guidesHeading: 'أدلة مرتبطة ونوادي شريكة وتقويم الفعاليات',
    },
    {
      highlights: 'أبرز السهرات والنوادي', sanSiro: 'سهرات ما بعد مباريات سان سيرو', formulas: 'طاولات VIP والقائمة والأبيريتيفو',
      categories: 'الفئات والأحياء', overview: 'ملخص الحياة الليلية في ميلانو', clubs: 'النوادي الشريكة',
      map: 'خريطة الأماكن', catalog: 'دليل النوادي الكامل', related: 'نوادي وأدلة ذات صلة',
      calendar: 'تقويم الفعاليات', tonight: 'أماكن مفتوحة الليلة', weekend: 'برنامج الأسبوع',
      special: 'الفعاليات الخاصة', pricing: 'الأسعار وطاولات VIP', booking: 'حجز مباشر عبر WhatsApp',
      rules: 'قواعد اللباس ومواعيد الدخول', faq: 'الأسئلة الشائعة', archive: 'أرشيف الفعاليات السابقة',
    },
    { partnerClub: 'نادٍ شريك', district: 'حي في ميلانو', genre: 'نمط موسيقي', service: 'خدمة كونسيرج', calendar: 'التقويم المباشر', guide: 'دليل رسمي' },
    'دليل الحياة الليلية في ميلانو: النوادي الشريكة وطاولات VIP والأحياء',
    'ملخص عملي من مكتب كونسيرج Nightlife Milan لاختيار النادي ونظام الدخول والمنطقة المناسبة.',
    [
      { title: '01 · أشهر النوادي والروفتوب وعروض العشاء', body: 'من Just Me Milano تحت برج برانكا وإطلالة الطابق العشرين في Voya Rooftop إلى Pineta وREPVBLIC و55 Milano.' },
      { title: '02 · طاولات VIP برصيد مشروبات 100%', body: 'يمنحك حجز طاولة VIP دخولاً سريعاً دون انتظار ومنطقة خاصة وتحويل الحد الأدنى بالكامل إلى قائمة المشروبات الرسمية.' },
      { title: '03 · قوائم الضيوف والمواعيد والأناقة', body: 'يفضل الوصول بين 19:30 و21:30 للأبيريتيفو أو بين 23:15 و00:30 لقائمة السهرة بملابس أنيقة وهوية سارية.' },
      { title: '04 · أحياء ميلانو وكونسيرج WhatsApp طوال الأسبوع', body: 'تواصل عبر +39 351 912 7047 للحصول على مخططات الطاولات وتأكيد فوري في سيمبيوني وكورسو كومو وبورتا نوفا وسان سيرو.' },
    ],
  ),
  bg: buildPack(
    'Съдържание на страницата',
    'Към избраната секция на страницата:',
    'Разгледай',
    {
      relatedEyebrow: 'СВЪРЗАНИ СТРАНИЦИ · NIGHTLIFE MILAN',
      homeHeading: 'Бърз достъп до партньорски клубове, квартали и партита',
      clubsHeading: 'Квартал, предстоящи вечери и сходни партньорски клубове',
      zonesHeading: 'Партньорски клубове, руфтопи и събития в района',
      genresHeading: 'Водещи клубове, партита и VIP маси',
      eventsHeading: 'Предстоящи партита, партньорски клубове и VIP маси',
      servicesHeading: 'Допълнителни консиерж услуги и партньорски клубове',
      guidesHeading: 'Свързани пътеводители, клубове и календар',
    },
    {
      highlights: 'Водещи партита и клубове', sanSiro: 'Афтърпартита Сан Сиро', formulas: 'VIP маси, списък и аперитиво',
      categories: 'Категории и квартали', overview: 'Накратко за нощен Милано', clubs: 'Партньорски клубове',
      map: 'Карта на клубовете', catalog: 'Пълен каталог клубове', related: 'Свързани клубове и насоки',
      calendar: 'Календар на събитията', tonight: 'Отворени тази вечер', weekend: 'Програма за седмицата',
      special: 'Специални събития', pricing: 'Цени и VIP маси', booking: 'Резервация по WhatsApp',
      rules: 'Дрескод и часове', faq: 'Често задавани въпроси', archive: 'Архив минали събития',
    },
    { partnerClub: 'Партньорски клуб', district: 'Квартал', genre: 'Музикален стил', service: 'VIP услуга', calendar: 'Календар', guide: 'Пътеводител' },
    'Ориентация в нощния живот на Милано: партньорски клубове, VIP маси и квартали',
    'Практически обзор от официалния консиерж екип на Nightlife Milan.',
    [
      { title: '01 · Емблематични клубове, руфтопи и вечеря-шоу', body: 'От Just Me Milano до 20-ия етаж на Voya Rooftop, Pineta, REPVBLIC и 55 Milano с потвърдена програма.' },
      { title: '02 · VIP маси със 100% кредит за бутилки', body: 'Приоритетен вход без чакане, резервирано сепаре и пълна стойност в напитки по официалното меню.' },
      { title: '03 · Списък с гости, часове и дрескод', body: 'Препоръчителен час 19:30–21:30 за аперитиво и 23:15–00:30 за клубен списък с елегантно облекло.' },
      { title: '04 · Квартали и WhatsApp консиерж 7/7', body: 'Директно потвърждение на +39 351 912 7047 за Sempione, Corso Como, Porta Nuova, CityLife и San Siro.' },
    ],
  ),
  hr: buildPack(
    'Sadržaj stranice',
    'Izravan skok na željeni odjeljak:',
    'Istraži',
    {
      relatedEyebrow: 'POVEZANI SADRŽAJ · NIGHTLIFE MILAN',
      homeHeading: 'Brzi pristup partnerskim klubovima, četvrtima i zabavama',
      clubsHeading: 'Četvrt, nadolazeće večeri i slični partnerski klubovi',
      zonesHeading: 'Partnerski klubovi, rooftop barovi i izlasci u četvrti',
      genresHeading: 'Glavni klubovi, tematske večeri i VIP stolovi',
      eventsHeading: 'Nadolazeće večeri, partnerski klubovi i VIP stolovi',
      servicesHeading: 'Dodatne concierge usluge i partnerski klubovi',
      guidesHeading: 'Povezani vodiči, partnerski klubovi i kalendar',
    },
    {
      highlights: 'Istaknute večeri i klubovi', sanSiro: 'San Siro afterparty', formulas: 'VIP stolovi, popis i aperitivo',
      categories: 'Kategorije i četvrti', overview: 'Vodič kroz noćni Milano', clubs: 'Partnerski klubovi',
      map: 'Karta klubova', catalog: 'Potpuni katalog klubova', related: 'Povezani klubovi i vodiči',
      calendar: 'Kalendar događanja', tonight: 'Otvoreno večeras', weekend: 'Tjedni program',
      special: 'Posebna događanja', pricing: 'Cijene i VIP stolovi', booking: 'WhatsApp rezervacija',
      rules: 'Dress code i ulaz', faq: 'Česta pitanja', archive: 'Arhiva prošlih večeri',
    },
    { partnerClub: 'Partnerski klub', district: 'Četvrt Milana', genre: 'Glazbeni stil', service: 'VIP Concierge', calendar: 'Kalendar', guide: 'Vodič' },
    'Kako isplanirati izlazak u Milanu: partnerski klubovi, VIP stolovi i četvrti',
    'Praktičan sažetak službenog Nightlife Milan concierge tima za odabir kluba i rezervaciju.',
    [
      { title: '01 · Kultni klubovi, rooftopovi i dinner show', body: 'Od kluba Just Me Milano ispod tornja Torre Branca do 20. kata Voya Rooftopa, Pinete, REPVBLIC-a i 55 Milana.' },
      { title: '02 · VIP stolovi uz 100% kredita za boce', body: 'Prioritetan ulaz bez reda, vlastiti separe i puni iznos minimalne potrošnje za pića sa službenog cjenika.' },
      { title: '03 · Popis gostiju, termini i dress code', body: 'Dolazak od 19:30 do 21:30 za aperitivo ili 23:15 do 00:30 za klupski popis uz elegantnu odjeću.' },
      { title: '04 · Četvrti i 7/7 WhatsApp concierge', body: 'Planovi dvorana i pisana potvrda na +39 351 912 7047 za Sempione, Corso Como, Porta Nuova i San Siro.' },
    ],
  ),
  cs: buildPack(
    'Obsah stránky',
    'Přejděte přímo na vybranou sekci:',
    'Zobrazit',
    {
      relatedEyebrow: 'SOUVISEJÍCÍ TRASY · NIGHTLIFE MILAN',
      homeHeading: 'Rychlý přístup k partnerským klubům, čtvrtím a akcím',
      clubsHeading: 'Čtvrť, nadcházející akce a podobné partnerské kluby',
      zonesHeading: 'Partnerské kluby, rooftopy a večery v této čtvrti',
      genresHeading: 'Hlavní kluby, hudební večery a VIP stoly',
      eventsHeading: 'Další akce, oficiální partnerské kluby a VIP stoly',
      servicesHeading: 'Doplňkové concierge služby a partnerské kluby',
      guidesHeading: 'Související průvodci, kluby a kalendář akcí',
    },
    {
      highlights: 'Vybrané akce a kluby', sanSiro: 'Afterparty ze San Sira', formulas: 'VIP stoly, guestlist a aperitivo',
      categories: 'Kategorie a čtvrti', overview: 'Přehled nočního Milána', clubs: 'Partnerské kluby',
      map: 'Mapa podniků', catalog: 'Kompletní katalog klubů', related: 'Související kluby a průvodci',
      calendar: 'Kalendář akcí', tonight: 'Dnes večer otevřeno', weekend: 'Program týdne',
      special: 'Speciální události', pricing: 'Ceny a VIP stoly', booking: 'Rezervace přes WhatsApp',
      rules: 'Dress code a časy vstupu', faq: 'Časté dotazy', archive: 'Archiv proběhlých akcí',
    },
    { partnerClub: 'Partnerský klub', district: 'Čtvrť Milána', genre: 'Hudební styl', service: 'VIP Concierge', calendar: 'Kalendář', guide: 'Průvodce' },
    'Přehled nočního života v Miláně: partnerské kluby, VIP stoly a čtvrti',
    'Praktický souhrn oficiálního týmu Nightlife Milan pro výběr klubu a rezervaci.',
    [
      { title: '01 · Ikonické kluby, rooftopy a dinner show', body: 'Od Just Me Milano u věže Torre Branca přes 20. patro Voya Rooftop až po kluby Pineta, REPVBLIC a 55 Milano.' },
      { title: '02 · VIP stoly se 100% kreditem na lahve', body: 'Přednostní vstup bez front, rezervovaný box a celá minimální útrata započtená do oficiálního nápojového lístku.' },
      { title: '03 · Guestlist, časy příchodu a dress code', body: 'Doporučený příchod 19:30–21:30 na aperitivo nebo 23:15–00:30 na klubový seznam ve společenském oblečení.' },
      { title: '04 · Čtvrti a WhatsApp concierge 7/7', body: 'Plánky stolů a potvrzení na +39 351 912 7047 pro Sempione, Corso Como, Porta Nuova, CityLife a San Siro.' },
    ],
  ),
  da: buildPack(
    'Sidens indhold',
    'Gå direkte til det ønskede afsnit:',
    'Udforsk',
    {
      relatedEyebrow: 'RELATEREDE SIDER · NIGHTLIFE MILAN',
      homeHeading: 'Hurtig adgang til partnerklubber, kvarterer og fester',
      clubsHeading: 'Kvarter, kommende aftener og lignende partnerklubber',
      zonesHeading: 'Partnerklubber, rooftops og natteliv i kvarteret',
      genresHeading: 'Udvalgte klubber, musikfester og VIP-borde',
      eventsHeading: 'Kommende fester, partnerklubber og VIP-borde',
      servicesHeading: 'Supplerende concierge-tjenester og partnerklubber',
      guidesHeading: 'Relaterede guider, partnerklubber og kalender',
    },
    {
      highlights: 'Udvalgte fester og klubber', sanSiro: 'San Siro afterparties', formulas: 'VIP-borde, gæsteliste & aperitivo',
      categories: 'Kategorier og kvarterer', overview: 'Kort guide til Milanos natteliv', clubs: 'Partnerklubber',
      map: 'Kort over klubber', catalog: 'Komplet klubkatalog', related: 'Relaterede klubber og guider',
      calendar: 'Eventkalender', tonight: 'Åbent i aften', weekend: 'Ugens program',
      special: 'Særlige events', pricing: 'Priser og VIP-borde', booking: 'WhatsApp-booking',
      rules: 'Dresscode og tider', faq: 'Ofte stillede spørgsmål', archive: 'Arkiv over tidligere events',
    },
    { partnerClub: 'Partnerklub', district: 'Kvarter i Milano', genre: 'Musikstil', service: 'VIP-Concierge', calendar: 'Kalender', guide: 'Guide' },
    'Overblik over Milanos natteliv: partnerklubber, VIP-borde og kvarterer',
    'Praktisk overblik fra Nightlife Milans concierge-desk før du går i byen.',
    [
      { title: '01 · Ikoniske klubber, rooftops og dinner shows', body: 'Fra Just Me Milano ved Torre Branca og 20. etage på Voya Rooftop til Pineta, REPVBLIC og 55 Milano.' },
      { title: '02 · VIP-borde med 100% flaskekredit', body: 'Fortrinsret ved indgangen, reserveret privé-område og fuld kredit på klubbens officielle flaskekort.' },
      { title: '03 · Gæsteliste, ankomst og dresscode', body: 'Ankom 19:30–21:30 til aperitivo eller 23:15–00:30 på gæsteliste i velklædt aftenstil.' },
      { title: '04 · Kvarterer og WhatsApp-concierge 7/7', body: 'Skriv til +39 351 912 7047 for bordplaner og bekræftelse i Sempione, Corso Como, Porta Nuova og San Siro.' },
    ],
  ),
  et: buildPack(
    'Lehe sisukord',
    'Liigu otse soovitud jaotisesse:',
    'Vaata lähemalt',
    {
      relatedEyebrow: 'SEOTUD LEHED · NIGHTLIFE MILAN',
      homeHeading: 'Kiirvalik partnerklubide, linnaosade ja pidude vahel',
      clubsHeading: 'Linnaosa, tulevased peod ja sarnased partnerklubid',
      zonesHeading: 'Partnerklubid, katuseterrassid ja peod selles piirkonnas',
      genresHeading: 'Tuntud klubid, muusikaõhtud ja VIP-lauad',
      eventsHeading: 'Tulevased peod, ametlikud partnerklubid ja VIP-lauad',
      servicesHeading: 'Täiendavad concierge-teenused ja partnerklubid',
      guidesHeading: 'Seotud teejuhid, partnerklubid ja peokalender',
    },
    {
      highlights: 'Esiletõstetud peod ja klubid', sanSiro: 'San Siro järelpeod', formulas: 'VIP-lauad, nimekiri ja aperitivo',
      categories: 'Kategooriad ja linnaosad', overview: 'Milano ööelu lühiülevaade', clubs: 'Partnerklubid',
      map: 'Klubide kaart', catalog: 'Täielik klubide nimekiri', related: 'Seotud klubid ja teejuhid',
      calendar: 'Sündmuste kalender', tonight: 'Täna õhtul avatud', weekend: 'Nädala kava',
      special: 'Erisündmused', pricing: 'Hinnad ja VIP-lauad', booking: 'WhatsAppi broneering',
      rules: 'Riietus ja kellaajad', faq: 'Korduma kippuvad küsimused', archive: 'Toimunud pidude arhiiv',
    },
    { partnerClub: 'Partnerklubi', district: 'Milano linnaosa', genre: 'Muusikastiil', service: 'VIP-teenus', calendar: 'Kalender', guide: 'Teejuht' },
    'Milano ööelu teejuht: partnerklubid, VIP-lauad ja linnaosad',
    'Nightlife Milani concierge-laua praktiline ülevaade klubi ja sissepääsu valimiseks.',
    [
      { title: '01 · Tuntud klubid, rooftop’id ja õhtusöögishow’d', body: 'Just Me Milano Torre Branca jalamil, 20. korruse Voya Rooftop, Pineta, REPVBLIC ja 55 Milano kinnitatud kavadega.' },
      { title: '02 · VIP-lauad 100% pudelikrediidiga', body: 'Eelisjärjekorras sissepääs, privaatne ala ja kogu miinimumkulu arvestamine ametlikust joogikaardist.' },
      { title: '03 · Külalistenimekiri, kellaajad ja riietus', body: 'Aperitivo jaoks saabu 19:30–21:30, klubinimekirja jaoks 23:15–00:30 hoolitsetud õhturiietuses.' },
      { title: '04 · Linnaosad ja 7/7 WhatsAppi tugi', body: 'Saaliplaanid ja kirjalik kinnitus numbril +39 351 912 7047 Sempione, Corso Como, Porta Nuova ja San Siro jaoks.' },
    ],
  ),
  fi: buildPack(
    'Sivun sisällys',
    'Siirry suoraan haluamaasi osioon:',
    'Tutustu',
    {
      relatedEyebrow: 'LIITTYVÄT SIVUT · NIGHTLIFE MILAN',
      homeHeading: 'Suorat polut kumppaniklubeihin, kaupunginosiin ja iltoihin',
      clubsHeading: 'Kaupunginosa, tulevat illat ja vastaavat kumppaniklubit',
      zonesHeading: 'Alueen kumppaniklubit, kattoterassit ja tapahtumat',
      genresHeading: 'Genren kärkiklubit, illat ja VIP-pöydät',
      eventsHeading: 'Tulevat bileet, kumppaniklubit ja VIP-pöydät',
      servicesHeading: 'Täydentävät concierge-palvelut ja kumppaniklubit',
      guidesHeading: 'Aiheeseen liittyvät oppaat, klubit ja kalenteri',
    },
    {
      highlights: 'Nostetut illat ja klubit', sanSiro: 'San Siron jatkot', formulas: 'VIP-pöydät, vieraslista & aperitivo',
      categories: 'Kategoriat ja alueet', overview: 'Milanon yöelämän pikaopas', clubs: 'Kumppaniklubit',
      map: 'Klubikartta', catalog: 'Kaikki klubit', related: 'Liittyvät klubit ja oppaat',
      calendar: 'Tapahtumakalenteri', tonight: 'Avoinna tänä iltana', weekend: 'Viikon ohjelma',
      special: 'Erikoistapahtumat', pricing: 'Hinnat ja VIP-pöydät', booking: 'Varaa WhatsAppissa',
      rules: 'Pukeutuminen ja ajat', faq: 'Usein kysytyt kysymykset', archive: 'Menneet tapahtumat',
    },
    { partnerClub: 'Kumppaniklubi', district: 'Kaupunginosa', genre: 'Musiikkityyli', service: 'VIP-palvelu', calendar: 'Kalenteri', guide: 'Opas' },
    'Milanon yöelämän opas: kumppaniklubit, VIP-pöydät ja kaupunginosat',
    'Nightlife Milanin concierge-tiimin käytännön kooste oikean klubin ja sisäänpääsyn valintaan.',
    [
      { title: '01 · Huippuklubit, kattoterassit ja dinner show’t', body: 'Just Me Milano Torre Brancan juurella, 20. kerroksen Voya Rooftop, Pineta, REPVBLIC ja 55 Milano vahvistetulla ohjelmalla.' },
      { title: '02 · VIP-pöydät 100 % pullohyvityksellä', body: 'Jonon ohitus, oma pöytäalue ja koko minimikulutus käytettävissä virallisen pullolistan juomiin.' },
      { title: '03 · Vieraslista, saapumisajat ja pukeutuminen', body: 'Saavu aperitivolle klo 19:30–21:30 tai klubilistalle klo 23:15–00:30 siistissä iltapukeutumisessa.' },
      { title: '04 · Kaupunginosat ja 7/7 WhatsApp-concierge', body: 'Pohjakartat ja varausvahvistukset numerosta +39 351 912 7047 Sempioneen, Corso Comoon, Porta Nuovaan ja San Siroon.' },
    ],
  ),
  el: buildPack(
    'Περιεχόμενα Σελίδας',
    'Μεταβείτε απευθείας στην ενότητα που σας ενδιαφέρει:',
    'Περισσότερα',
    {
      relatedEyebrow: 'ΣΧΕΤΙΚΕΣ ΣΕΛΙΔΕΣ · NIGHTLIFE MILAN',
      homeHeading: 'Άμεση Πρόσβαση σε Συνεργαζόμενα Κλαμπ, Συνοικίες & Βραδιές',
      clubsHeading: 'Συνοικία, Επόμενες Βραδιές & Παρόμοια Κλαμπ',
      zonesHeading: 'Συνεργαζόμενα Κλαμπ, Rooftops & Βραδιές στην Περιοχή',
      genresHeading: 'Κορυφαία Κλαμπ, Μουσικές Βραδιές & Τραπέζια VIP',
      eventsHeading: 'Επόμενες Εκδηλώσεις, Συνεργαζόμενα Κλαμπ & Τραπέζια VIP',
      servicesHeading: 'Συμπληρωματικές Υπηρεσίες Concierge & Κλαμπ',
      guidesHeading: 'Σχετικοί Οδηγοί, Κλαμπ & Ημερολόγιο Εκδηλώσεων',
    },
    {
      highlights: 'Προτεινόμενες Βραδιές & Κλαμπ', sanSiro: 'Afterparty Αγώνων San Siro', formulas: 'Τραπέζια VIP, Λίστα & Aperitivo',
      categories: 'Κατηγορίες & Συνοικίες', overview: 'Σύντομος Οδηγός Νυχτερινού Μιλάνου', clubs: 'Συνεργαζόμενα Κλαμπ',
      map: 'Χάρτης Κλαμπ', catalog: 'Πλήρης Κατάλογος Κλαμπ', related: 'Σχετικά Κλαμπ & Οδηγοί',
      calendar: 'Ημερολόγιο Εκδηλώσεων', tonight: 'Ανοιχτά Απόψε', weekend: 'Πρόγραμμα Εβδομάδας',
      special: 'Ειδικές Εκδηλώσεις', pricing: 'Τιμές & Τραπέζια VIP', booking: 'Κράτηση μέσω WhatsApp',
      rules: 'Dress Code & Ωράριο', faq: 'Συχνές Ερωτήσεις', archive: 'Αρχείο Εκδηλώσεων',
    },
    { partnerClub: 'Συνεργαζόμενο Κλαμπ', district: 'Συνοικία Μιλάνου', genre: 'Μουσικό Είδος', service: 'VIP Concierge', calendar: 'Ημερολόγιο', guide: 'Οδηγός' },
    'Οδηγός Νυχτερινής Ζωής στο Μιλάνο: Κλαμπ, Τραπέζια VIP & Συνοικίες',
    'Πρακτική σύνοψη από το επίσημο γραφείο concierge του Nightlife Milan.',
    [
      { title: '01 · Εμβληματικά Κλαμπ, Rooftops & Dinner Show', body: 'Από το Just Me Milano κάτω από τον πύργο Torre Branca έως τον 20ό όροφο του Voya Rooftop, το Pineta, το REPVBLIC και το 55 Milano.' },
      { title: '02 · Τραπέζια VIP με 100% Πίστωση σε Φιάλες', body: 'Προτεραιότητα εισόδου χωρίς αναμονή, ιδιωτικός χώρος και πλήρης μετατροπή της ελάχιστης κατανάλωσης σε φιάλες.' },
      { title: '03 · Ονομαστική Λίστα, Ωράρια & Dress Code', body: 'Άφιξη 19:30–21:30 για aperitivo ή 23:15–00:30 για λίστα κλαμπ με προσεγμένη βραδινή εμφάνιση.' },
      { title: '04 · Συνοικίες & Υποστήριξη WhatsApp 7/7', body: 'Σχεδιαγράμματα τραπεζιών και άμεση επιβεβαίωση στο +39 351 912 7047 για Sempione, Corso Como, Porta Nuova και San Siro.' },
    ],
  ),
  hu: buildPack(
    'Oldal tartalma',
    'Ugorjon közvetlenül a keresett részhez:',
    'Megnyitás',
    {
      relatedEyebrow: 'KAPCSOLÓDÓ OLDALAK · NIGHTLIFE MILAN',
      homeHeading: 'Gyors elérés partnerklubokhoz, negyedekhez és bulikhoz',
      clubsHeading: 'Negyed, közelgő esték és hasonló partnerklubok',
      zonesHeading: 'Partnerklubok, rooftop bárok és esték a környéken',
      genresHeading: 'Kiemelt klubok, zenei esték és VIP asztalok',
      eventsHeading: 'Közelgő események, hivatalos partnerklubok és VIP asztalok',
      servicesHeading: 'Kiegészítő concierge-szolgáltatások és partnerklubok',
      guidesHeading: 'Kapcsolódó útmutatók, partnerklubok és eseménynaptár',
    },
    {
      highlights: 'Kiemelt bulik és klubok', sanSiro: 'San Siro meccs utáni bulik', formulas: 'VIP asztal, vendéglista és aperitivo',
      categories: 'Kategóriák és negyedek', overview: 'Milánói éjszakai gyorstalpaló', clubs: 'Partnerklubok',
      map: 'Helyszíntérkép', catalog: 'Teljes klubkatalógus', related: 'Kapcsolódó klubok és útmutatók',
      calendar: 'Eseménynaptár', tonight: 'Ma este nyitva', weekend: 'Heti program',
      special: 'Különleges események', pricing: 'Árak és VIP asztalok', booking: 'WhatsApp-foglalás',
      rules: 'Dress code és belépés', faq: 'Gyakori kérdések', archive: 'Korábbi események archívuma',
    },
    { partnerClub: 'Partnerklub', district: 'Milánói negyed', genre: 'Zenei stílus', service: 'VIP Concierge', calendar: 'Naptár', guide: 'Útmutató' },
    'Milánó éjszakai élete röviden: partnerklubok, VIP asztalok és negyedek',
    'A Nightlife Milan hivatalos concierge-csapatának gyakorlati összefoglalója.',
    [
      { title: '01 · Ikonikus klubok, rooftopok és dinner show-k', body: 'A Torre Branca alatti Just Me Milanótól a 20. emeleti Voya Rooftopig, valamint a Pineta, REPVBLIC és 55 Milano műsoráig.' },
      { title: '02 · VIP asztalok 100% palackkredittel', body: 'Soron kívüli belépés, privát szektor és a teljes minimum fogyasztás levásárlása a hivatalos itallapról.' },
      { title: '03 · Vendéglista, érkezés és dress code', body: 'Aperitivóra 19:30–21:30 között, klublistára 23:15–00:30 között érdemes érkezni elegáns öltözékben.' },
      { title: '04 · Negyedek és 7/7 WhatsApp-concierge', body: 'Asztaltérképek és írásos visszaigazolás a +39 351 912 7047 számon Sempione, Corso Como, Porta Nuova és San Siro területén.' },
    ],
  ),
  ga: buildPack(
    'Innéacs an Leathanaigh',
    'Léim díreach chuig an rannán atá uait:',
    'Féach air',
    {
      relatedEyebrow: 'BEALAÍ GAOLMHARA · NIGHTLIFE MILAN',
      homeHeading: 'Rochtain Thapa ar Chlubanna Comhpháirtíochta agus Oícheanta',
      clubsHeading: 'Ceantar, Oícheanta Romhainn & Clubanna Gaolmhara',
      zonesHeading: 'Clubanna Comhpháirtíochta, Rooftops & Oícheanta sa Cheantar',
      genresHeading: 'Clubanna Ceoil, Oícheanta & Táblaí VIP',
      eventsHeading: 'Imeachtaí Romhainn, Clubanna Comhpháirtíochta & Táblaí VIP',
      servicesHeading: 'Seirbhísí Concierge & Clubanna Oifigiúla',
      guidesHeading: 'Treoracha Gaolmhara, Clubanna & Féilire',
    },
    {
      highlights: 'Oícheanta & Clubanna Roghnaithe', sanSiro: 'Cóisirí Tar Éis Chluichí San Siro', formulas: 'Táblaí VIP, Liosta & Aperitivo',
      categories: 'Catagóirí & Ceantair', overview: 'Treoir Thapa do Shaol Oíche Mhilano', clubs: 'Clubanna Comhpháirtíochta',
      map: 'Léarscáil na nIonad', catalog: 'Eolaire Iomlán na gClubanna', related: 'Clubanna & Treoracha Gaolmhara',
      calendar: 'Féilire na nImeachtaí', tonight: 'Oscailte Anocht', weekend: 'Clár na Seachtaine',
      special: 'Imeachtaí Speisialta', pricing: 'Praghsanna & Táblaí VIP', booking: 'Áirithint ar WhatsApp',
      rules: 'Cód Éadaigh & Uaireanta', faq: 'Ceisteanna Coitianta', archive: 'Cartlann Imeachtaí',
    },
    { partnerClub: 'Club Comhpháirtí', district: 'Ceantar Milano', genre: 'Stíl Cheoil', service: 'VIP Concierge', calendar: 'Féilire', guide: 'Treoir' },
    'Treoir do Shaol Oíche Mhilano: Clubanna, Táblaí VIP & Ceantair',
    'Achoimre phraiticiúil ó fhoireann concierge Nightlife Milan chun d’oíche a phleanáil.',
    [
      { title: '01 · Clubanna Íocónacha, Rooftops & Dinner Shows', body: 'Ó Just Me Milano faoi Torre Branca go dtí an 20ú hurlár ag Voya Rooftop, Pineta, REPVBLIC agus 55 Milano.' },
      { title: '02 · Táblaí VIP le Creidmheas Buidéal 100%', body: 'Bealach isteach tosaíochta gan scuaine, limistéar príobháideach agus an caiteachas íosta ar fad i dtreo buidéal oifigiúil.' },
      { title: '03 · Liosta Aíonna, Amanna & Cód Éadaigh', body: 'Bí ann idir 19:30–21:30 don aperitivo nó 23:15–00:30 don liosta club le feisteas galánta.' },
      { title: '04 · Ceantair & Concierge WhatsApp 7/7', body: 'Pleananna urláir agus deimhniú scríofa ar +39 351 912 7047 do Sempione, Corso Como, Porta Nuova agus San Siro.' },
    ],
  ),
  lv: buildPack(
    'Lapas saturs',
    'Pārejiet tieši uz vajadzīgo sadaļu:',
    'Apskatīt',
    {
      relatedEyebrow: 'SAISTĪTĀS SADAĻAS · NIGHTLIFE MILAN',
      homeHeading: 'Ātra piekļuve partneru klubiem, rajoniem un pasākumiem',
      clubsHeading: 'Rajons, gaidāmie vakari un līdzīgi partneru klubi',
      zonesHeading: 'Partneru klubi, jumta bāri un vakari šajā rajonā',
      genresHeading: 'Vadošie klubi, mūzikas vakari un VIP galdiņi',
      eventsHeading: 'Gaidāmie pasākumi, partneru klubi un VIP galdiņi',
      servicesHeading: 'Papildu konsjerža pakalpojumi un partneru klubi',
      guidesHeading: 'Saistītie ceļveži, partneru klubi un kalendārs',
    },
    {
      highlights: 'Izcelto vakaru un klubu izlase', sanSiro: 'San Siro pēcspēles ballītes', formulas: 'VIP galdiņi, saraksts un aperitivo',
      categories: 'Kategorijas un rajoni', overview: 'Īss Milānas naktsdzīves ceļvedis', clubs: 'Partneru klubi',
      map: 'Klubu karte', catalog: 'Pilns klubu katalogs', related: 'Saistītie klubi un ceļveži',
      calendar: 'Pasākumu kalendārs', tonight: 'Atvērts šovakar', weekend: 'Nedēļas programma',
      special: 'Īpašie pasākumi', pricing: 'Cenas un VIP galdiņi', booking: 'WhatsApp rezervācija',
      rules: 'Dress code un laiki', faq: 'Biežāk uzdotie jautājumi', archive: 'Iepriekšējo pasākumu arhīvs',
    },
    { partnerClub: 'Partneru klubs', district: 'Milānas rajons', genre: 'Mūzikas stils', service: 'VIP serviss', calendar: 'Kalendārs', guide: 'Ceļvedis' },
    'Milānas naktsdzīves ceļvedis: partneru klubi, VIP galdiņi un rajoni',
    'Nightlife Milan oficiālā konsjerža praktisks kopsavilkums kluba un ieejas izvēlei.',
    [
      { title: '01 · Ikoniski klubi, jumta terases un vakariņu šovi', body: 'No Just Me Milano pie Torre Branca līdz Voya Rooftop 20. stāvam, Pineta, REPVBLIC un 55 Milano.' },
      { title: '02 · VIP galdiņi ar 100% pudeļu kredītu', body: 'Prioritāra ieeja bez rindas, privāta zona un visa minimālā summa oficiālajai dzērienu kartei.' },
      { title: '03 · Viesu saraksts, laiki un apģērba kods', body: 'Ierašanās 19:30–21:30 uz aperitivo vai 23:15–00:30 viesu sarakstā elegantā vakara apģērbā.' },
      { title: '04 · Rajoni un 7/7 WhatsApp konsjeržs', body: 'Zāļu plāni un rakstisks apstiprinājums pa tālruni +39 351 912 7047 Sempione, Corso Como, Porta Nuova un San Siro.' },
    ],
  ),
  lt: buildPack(
    'Puslapio turinys',
    'Pereikite tiesiai prie reikiamos skilties:',
    'Peržiūrėti',
    {
      relatedEyebrow: 'SUSIJĘ PUSLAPIAI · NIGHTLIFE MILAN',
      homeHeading: 'Greita prieiga prie partnerių klubų, rajonų ir vakarėlių',
      clubsHeading: 'Rajonas, artimiausi vakarai ir panašūs partnerių klubai',
      zonesHeading: 'Partnerių klubai, stogo terasos ir renginiai rajone',
      genresHeading: 'Pagrindiniai klubai, muzikos vakarai ir VIP staliukai',
      eventsHeading: 'Artimiausi renginiai, partnerių klubai ir VIP staliukai',
      servicesHeading: 'Papildomos konsjeržo paslaugos ir partnerių klubai',
      guidesHeading: 'Susiję gidai, partnerių klubai ir kalendorius',
    },
    {
      highlights: 'Rekomenduojami vakarai ir klubai', sanSiro: 'San Siro dūzgės po rungtynių', formulas: 'VIP staliukai, sąrašas ir aperitivo',
      categories: 'Kategorijos ir rajonai', overview: 'Trumpas Milano naktinio gyvenimo gidas', clubs: 'Partnerių klubai',
      map: 'Klubų žemėlapis', catalog: 'Visas klubų katalogas', related: 'Susiję klubai ir gidai',
      calendar: 'Renginių kalendorius', tonight: 'Šįvakar dirbantys klubai', weekend: 'Savaitės programa',
      special: 'Specialūs renginiai', pricing: 'Kainos ir VIP staliukai', booking: 'Rezervacija per WhatsApp',
      rules: 'Aprangos kodas ir laikas', faq: 'Dažniausi klausimai', archive: 'Praėjusių renginių archyvas',
    },
    { partnerClub: 'Partnerių klubas', district: 'Milano rajonas', genre: 'Muzikos stilius', service: 'VIP konsjeržas', calendar: 'Kalendorius', guide: 'Gidas' },
    'Milano naktinio gyvenimo apžvalga: partnerių klubai, VIP staliukai ir rajonai',
    'Praktinė Nightlife Milan konsjeržo santrauka renkantis klubą ir įėjimo tipą.',
    [
      { title: '01 · Žymiausi klubai, terasos ir vakarienės šou', body: 'Nuo Just Me Milano prie Torre Branca iki 20-ojo Voya Rooftop aukšto, Pineta, REPVBLIC ir 55 Milano.' },
      { title: '02 · VIP staliukai su 100% gėrimų kreditu', body: 'Pirmenybinis įėjimas be eilės, privati erdvė ir visas minimalus biudžetas oficialiam butelių meniu.' },
      { title: '03 · Svečių sąrašas, laikas ir apranga', body: 'Atvykite 19:30–21:30 į aperitivo arba 23:15–00:30 su vardiniu sąrašu ir tvarkinga vakarine apranga.' },
      { title: '04 · Rajonai ir 7/7 WhatsApp pagalba', body: 'Salės planai ir patvirtinimas numeriu +39 351 912 7047 Sempione, Corso Como, Porta Nuova ir San Siro zonose.' },
    ],
  ),
  mt: buildPack(
    'Werrej tal-Paġna',
    'Mur direttament fit-taqsima li għandek bżonn:',
    'Esplora',
    {
      relatedEyebrow: 'PAĠNI RELATATI · NIGHTLIFE MILAN',
      homeHeading: 'Aċċess Mgħaġġel għal Clubs Imsieħba, Żoni u Serati',
      clubsHeading: 'Żona, Serati li Ġejjin u Clubs Imsieħba Simili',
      zonesHeading: 'Clubs Imsieħba, Rooftops u Serati f’Din iż-Żona',
      genresHeading: 'Clubs Ewlenin, Serati Mużikali u Mejdiet VIP',
      eventsHeading: 'Avvenimenti li Ġejjin, Clubs Imsieħba u Mejdiet VIP',
      servicesHeading: 'Servizzi Concierge u Clubs Imsieħba Uffiċjali',
      guidesHeading: 'Gwidi Relatati, Clubs u Kalendarju tas-Serati',
    },
    {
      highlights: 'Serati u Clubs Magħżula', sanSiro: 'Afterparties ta’ San Siro', formulas: 'Mejdiet VIP, Lista u Aperitivo',
      categories: 'Kategoriji u Żoni', overview: 'Gwida Qasira għal Milan billejl', clubs: 'Clubs Imsieħba',
      map: 'Mappa tal-Postijiet', catalog: 'Katalgu Komplut tal-Clubs', related: 'Clubs u Gwidi Relatati',
      calendar: 'Kalendarju tal-Avvenimenti', tonight: 'Miftuħin Illejla', weekend: 'Programm tal-Ġimgħa',
      special: 'Avvenimenti Speċjali', pricing: 'Prezzijiet u Mejdiet VIP', booking: 'Prenotazzjoni WhatsApp',
      rules: 'Dress Code u Ħinijiet', faq: 'Mistoqsijiet Frekwenti', archive: 'Arkivju tal-Avvenimenti',
    },
    { partnerClub: 'Club Sieħeb', district: 'Żona ta’ Milan', genre: 'Stil Mużikali', service: 'VIP Concierge', calendar: 'Kalendarju', guide: 'Gwida' },
    'Gwida għall-Ħajja ta’ Billejl f’Milan: Clubs Imsieħba, Mejdiet VIP u Żoni',
    'Sommarju prattiku mit-tim uffiċjali ta’ Nightlife Milan.',
    [
      { title: '01 · Clubs Ikoniċi, Rooftops u Dinner Shows', body: 'Minn Just Me Milano taħt Torre Branca sal-20 sular ta’ Voya Rooftop, Pineta, REPVBLIC u 55 Milano.' },
      { title: '02 · Mejdiet VIP b’100% Kreditu fuq il-Fliexken', body: 'Dħul prijoritarju mingħajr kju, żona privata u n-nefqa minima kollha konvertita fi fliexken mil-lista uffiċjali.' },
      { title: '03 · Guest List, Ħinijiet u Dress Code', body: 'Wasla bejn is-19:30 u l-21:30 għall-aperitivo jew bejn it-23:15 u 00:30 għal-lista bi lbies eleganti.' },
      { title: '04 · Żoni u Concierge WhatsApp 7/7', body: 'Pjanti tas-swali u konferma bil-miktub fuq +39 351 912 7047 għal Sempione, Corso Como, Porta Nuova u San Siro.' },
    ],
  ),
  pl: buildPack(
    'Spis treści strony',
    'Przejdź od razu do wybranej sekcji:',
    'Zobacz więcej',
    {
      relatedEyebrow: 'POWIĄZANE ŚCIEŻKI · NIGHTLIFE MILAN',
      homeHeading: 'Szybki dostęp do klubów partnerskich, dzielnic i imprez',
      clubsHeading: 'Dzielnica, nadchodzące imprezy i podobne kluby partnerskie',
      zonesHeading: 'Kluby partnerskie, rooftopy i imprezy w tej dzielnicy',
      genresHeading: 'Czołowe kluby gatunku, imprezy i stoliki VIP',
      eventsHeading: 'Nadchodzące imprezy, kluby partnerskie i stoliki VIP',
      servicesHeading: 'Uzupełniające usługi concierge i kluby partnerskie',
      guidesHeading: 'Powiązane przewodniki, kluby i kalendarz imprez',
    },
    {
      highlights: 'Polecane imprezy i kluby', sanSiro: 'Afterparty po meczach San Siro', formulas: 'Stoliki VIP, lista gości i aperitivo',
      categories: 'Kategorie i dzielnice', overview: 'Krótki przewodnik po nocnym Mediolanie', clubs: 'Kluby partnerskie',
      map: 'Mapa klubów', catalog: 'Pełny katalog klubów', related: 'Powiązane kluby i przewodniki',
      calendar: 'Kalendarz wydarzeń', tonight: 'Otwarte dziś wieczorem', weekend: 'Program tygodnia',
      special: 'Wydarzenia specjalne', pricing: 'Ceny i stoliki VIP', booking: 'Rezerwacja przez WhatsApp',
      rules: 'Dress code i godziny wejścia', faq: 'Najczęstsze pytania', archive: 'Archiwum minionych imprez',
    },
    { partnerClub: 'Klub partnerski', district: 'Dzielnica Mediolanu', genre: 'Styl muzyczny', service: 'VIP Concierge', calendar: 'Kalendarz', guide: 'Przewodnik' },
    'Jak zaplanować wieczór w Mediolanie: kluby partnerskie, stoliki VIP i dzielnice',
    'Praktyczne podsumowanie oficjalnego zespołu concierge Nightlife Milan.',
    [
      { title: '01 · Kultowe kluby, rooftopy i dinner show', body: 'Od Just Me Milano pod Torre Branca i 20. piętra Voya Rooftop po kluby Pineta, REPVBLIC oraz 55 Milano.' },
      { title: '02 · Stoliki VIP ze 100% kredytem na butelki', body: 'Wejście bez kolejki, prywatna loża oraz pełne wykorzystanie minimalnej kwoty na karty butelek klubu.' },
      { title: '03 · Lista gości, godziny i dress code', body: 'Przyjdź między 19:30 a 21:30 na aperitivo lub 23:15–00:30 na listę klubową w eleganckim stroju.' },
      { title: '04 · Dzielnice i concierge WhatsApp 7/7', body: 'Plany sal i pisemne potwierdzenie pod numerem +39 351 912 7047 dla Sempione, Corso Como, Porta Nuova i San Siro.' },
    ],
  ),
  ro: buildPack(
    'Cuprinsul Paginii',
    'Mergi direct la secțiunea dorită:',
    'Explorează',
    {
      relatedEyebrow: 'PAGINI CORELATE · NIGHTLIFE MILAN',
      homeHeading: 'Acces Rapid la Cluburi Partenere, Cartiere și Petreceri',
      clubsHeading: 'Cartier, Seri Programate și Cluburi Partenere Similare',
      zonesHeading: 'Cluburi Partenere, Rooftop-uri și Seri în Acest Cartier',
      genresHeading: 'Cluburi de Referință, Petreceri și Mese VIP',
      eventsHeading: 'Următoarele Petreceri, Cluburi Partenere și Mese VIP',
      servicesHeading: 'Servicii Concierge Complementare și Cluburi Partenere',
      guidesHeading: 'Ghiduri Corelate, Cluburi Partenere și Calendar',
    },
    {
      highlights: 'Seri și Cluburi Recomandate', sanSiro: 'Afterparty Meciuri San Siro', formulas: 'Mese VIP, Listă și Aperitivo',
      categories: 'Categorii și Cartiere', overview: 'Ghid Scurt pentru Noaptea în Milano', clubs: 'Cluburi Partenere',
      map: 'Harta Localurilor', catalog: 'Catalogul Complet al Cluburilor', related: 'Cluburi și Ghiduri Corelate',
      calendar: 'Calendarul Evenimentelor', tonight: 'Deschise în Această Seară', weekend: 'Programul Săptămânii',
      special: 'Evenimente Speciale', pricing: 'Prețuri și Mese VIP', booking: 'Rezervare pe WhatsApp',
      rules: 'Dress Code și Interval Orar', faq: 'Întrebări Frecvente', archive: 'Arhiva Evenimentelor Trecute',
    },
    { partnerClub: 'Club Partener', district: 'Cartier Milano', genre: 'Stil Muzical', service: 'VIP Concierge', calendar: 'Calendar Live', guide: 'Ghid Oficial' },
    'Ghid Practic pentru Viața de Noapte din Milano: Cluburi, Mese VIP și Cartiere',
    'Sinteză operativă pregătită de biroul oficial Nightlife Milan pentru alegerea localului și a rezervării.',
    [
      { title: '01 · Cluburi Emblemă, Rooftop-uri și Dinner Show', body: 'De la Just Me Milano sub Torre Branca și etajul 20 Voya Rooftop până la Pineta, REPVBLIC și 55 Milano.' },
      { title: '02 · Mese VIP cu 100% Credit în Sticle', body: 'Intrare prioritară fără coadă, zonă privată rezervată și consumație minimă convertită integral în meniul oficial de sticle.' },
      { title: '03 · Listă Nominală, Ore și Dress Code', body: 'Sosire recomandată între 19:30–21:30 pentru aperitivo sau 23:15–00:30 pe listă, în ținută elegantă de seară.' },
      { title: '04 · Cartiere și Concierge WhatsApp 7/7', body: 'Schițe de sală și confirmare scrisă la +39 351 912 7047 pentru Sempione, Corso Como, Porta Nuova, CityLife și San Siro.' },
    ],
  ),
  sk: buildPack(
    'Obsah stránky',
    'Prejdite priamo na vybranú sekciu:',
    'Zobraziť',
    {
      relatedEyebrow: 'SÚVISIACE STRÁNKY · NIGHTLIFE MILAN',
      homeHeading: 'Rýchly prístup k partnerským klubom, štvrtiam a akciám',
      clubsHeading: 'Štvrť, najbližšie večery a podobné partnerské kluby',
      zonesHeading: 'Partnerské kluby, rooftopy a večery v tejto štvrti',
      genresHeading: 'Hlavné kluby žánru, akcie a VIP stoly',
      eventsHeading: 'Ďalšie podujatia, partnerské kluby a VIP stoly',
      servicesHeading: 'Doplnkové concierge služby a partnerské kluby',
      guidesHeading: 'Súvisiaci sprievodcovia, kluby a kalendár podujatí',
    },
    {
      highlights: 'Vybrané podujatia a kluby', sanSiro: 'Afterparty po zápasoch San Siro', formulas: 'VIP stoly, guestlist a aperitivo',
      categories: 'Kategórie a štvrte', overview: 'Prehľad nočného Milána', clubs: 'Partnerské kluby',
      map: 'Mapa podnikov', catalog: 'Kompletný katalóg klubov', related: 'Súvisiace kluby a sprievodcovia',
      calendar: 'Kalendár podujatí', tonight: 'Dnes večer otvorené', weekend: 'Týždenný program',
      special: 'Špeciálne podujatia', pricing: 'Ceny a VIP stoly', booking: 'Rezervácia cez WhatsApp',
      rules: 'Dress code a časy vstupu', faq: 'Časté otázky', archive: 'Archív minulých podujatí',
    },
    { partnerClub: 'Partnerský klub', district: 'Štvrť Milána', genre: 'Hudobný štýl', service: 'VIP Concierge', calendar: 'Kalendár', guide: 'Sprievodca' },
    'Prehľad nočného života v Miláne: partnerské kluby, VIP stoly a štvrte',
    'Praktické zhrnutie oficiálneho tímu Nightlife Milan pre výber klubu a rezerváciu.',
    [
      { title: '01 · Ikonické kluby, rooftopy a dinner show', body: 'Od Just Me Milano pri Torre Branca cez 20. poschodie Voya Rooftop až po kluby Pineta, REPVBLIC a 55 Milano.' },
      { title: '02 · VIP stoly so 100 % kreditom na fľaše', body: 'Prednostný vstup bez čakania, súkromný box a celá minimálna útrata započítaná do oficiálneho nápojového lístka.' },
      { title: '03 · Guestlist, časy príchodu a dress code', body: 'Príchod 19:30–21:30 na aperitivo alebo 23:15–00:30 na klubový zoznam v elegantnom večernom oblečení.' },
      { title: '04 · Štvrte a WhatsApp concierge 7/7', body: 'Plániky stolov a potvrdenie na +39 351 912 7047 pre Sempione, Corso Como, Porta Nuova, CityLife a San Siro.' },
    ],
  ),
  sl: buildPack(
    'Kazalo strani',
    'Skočite neposredno na želeni razdelek:',
    'Razišči',
    {
      relatedEyebrow: 'POVEZANE VSEBINE · NIGHTLIFE MILAN',
      homeHeading: 'Hiter dostop do partnerskih klubov, četrti in zabav',
      clubsHeading: 'Četrt, prihajajoči večeri in podobni partnerski klubi',
      zonesHeading: 'Partnerski klubi, rooftop bari in večeri v tej četrti',
      genresHeading: ' Glavni klubi, glasbeni večeri in VIP mize',
      eventsHeading: 'Prihajajoči dogodki, partnerski klubi in VIP mize',
      servicesHeading: 'Dopolnilne concierge storitve in partnerski klubi',
      guidesHeading: 'Povezani vodniki, partnerski klubi in koledar',
    },
    {
      highlights: 'Izpostavljeni večeri in klubi', sanSiro: 'San Siro zabave po tekmi', formulas: 'VIP mize, seznam in aperitivo',
      categories: 'Kategorije in četrti', overview: 'Kratek vodnik po nočnem Milanu', clubs: 'Partnerski klubi',
      map: 'Zemljevid klubov', catalog: 'Celoten katalog klubov', related: 'Povezani klubi in vodniki',
      calendar: 'Koledar dogodkov', tonight: 'Odprto nocoj', weekend: 'Tedenski spored',
      special: 'Posebni dogodki', pricing: 'Cene in VIP mize', booking: 'Rezervacija prek WhatsAppa',
      rules: 'Dress code in ure vstopa', faq: 'Pogosta vprašanja', archive: 'Arhiv preteklih dogodkov',
    },
    { partnerClub: 'Partnerski klub', district: 'Milanska četrt', genre: 'Glasbeni slog', service: 'VIP Concierge', calendar: 'Koledar', guide: 'Vodnik' },
    'Nočno življenje v Milanu na kratko: partnerski klubi, VIP mize in četrti',
    'Praktičen povzetek uradne ekipe Nightlife Milan za izbiro kluba in rezervacijo.',
    [
      { title: '01 · Ikonični klubi, rooftop terase in dinner show', body: 'Od kluba Just Me Milano pod stolpom Torre Branca do 20. nadstropja Voya Rooftop, Pinete, REPVBLIC in 55 Milano.' },
      { title: '02 · VIP mize s 100 % dobropisom za steklenice', body: 'Prednostni vstop brez vrste, zasebni separe in celoten znesek minimalne porabe za pijačo z uradnega cenika.' },
      { title: '03 · Seznam gostov, ure prihoda in dress code', body: 'Prihod med 19:30 in 21:30 za aperitivo ali med 23:15 in 00:30 za klubski seznam v urejeni večerni opravi.' },
      { title: '04 · Četrti in 7/7 WhatsApp concierge', body: 'Načrti miz in pisna potrditev na +39 351 912 7047 za Sempione, Corso Como, Porta Nuova, CityLife in San Siro.' },
    ],
  ),
  sv: buildPack(
    'Sidans innehåll',
    'Hoppa direkt till önskat avsnitt:',
    'Utforska',
    {
      relatedEyebrow: 'RELATERADE SIDOR · NIGHTLIFE MILAN',
      homeHeading: 'Snabbvägar till partnerklubbar, stadsdelar och kvällar',
      clubsHeading: 'Stadsdel, kommande kvällar och liknande partnerklubbar',
      zonesHeading: 'Partnerklubbar, takbarer och uteliv i området',
      genresHeading: 'Utvalda klubbar, musikkvällar och VIP-bord',
      eventsHeading: 'Kommande fester, partnerklubbar och VIP-bord',
      servicesHeading: 'Kompletterande conciergetjänster och partnerklubbar',
      guidesHeading: 'Relaterade guider, partnerklubbar och kalender',
    },
    {
      highlights: 'Utvalda kvällar & klubbar', sanSiro: 'San Siro efterfester', formulas: 'VIP-bord, gästlista & aperitivo',
      categories: 'Kategorier & stadsdelar', overview: 'Snabbguide till Milanos nattliv', clubs: 'Partnerklubbar',
      map: 'Klubbkarta', catalog: 'Komplett klubbkatalog', related: 'Relaterade klubbar & guider',
      calendar: 'Eventkalender', tonight: 'Öppet ikväll', weekend: 'Veckans program',
      special: 'Specialevenemang', pricing: 'Priser & VIP-bord', booking: 'Boka via WhatsApp',
      rules: 'Klädkod & tider', faq: 'Vanliga frågor', archive: 'Arkiv över tidigare event',
    },
    { partnerClub: 'Partnerklubb', district: 'Stadsdel i Milano', genre: 'Musikstil', service: 'VIP-Concierge', calendar: 'Kalender', guide: 'Guide' },
    'Guide till Milanos nattliv: partnerklubbar, VIP-bord och stadsdelar',
    'Praktisk översikt från Nightlife Milans concierge-desk inför utekvällen.',
    [
      { title: '01 · Ikoniska klubbar, takbarer & dinner shows', body: 'Från Just Me Milano vid Torre Branca och 20:e våningen på Voya Rooftop till Pineta, REPVBLIC och 55 Milano.' },
      { title: '02 · VIP-bord med 100 % flaskkredit', body: 'Prioriterad entré utan kö, reserverat privé-bord och hela minimibeloppet tillgodo på officiella flaskmenyn.' },
      { title: '03 · Gästlista, tider & klädkod', body: 'Anländ 19:30–21:30 för aperitivo eller 23:15–00:30 för klubblista i vårdad kvällsklädsel.' },
      { title: '04 · Stadsdelar & WhatsApp-concierge 7/7', body: 'Bordsplaner och skriftlig bekräftelse via +39 351 912 7047 för Sempione, Corso Como, Porta Nuova och San Siro.' },
    ],
  ),
  no: buildPack(
    'Innhold på siden',
    'Hopp direkte til ønsket seksjon:',
    'Utforsk',
    {
      relatedEyebrow: 'RELATERTE SIDER · NIGHTLIFE MILAN',
      homeHeading: 'Snarveier til partnerklubber, bydeler og kvelder',
      clubsHeading: 'Bydel, kommende kvelder og lignende partnerklubber',
      zonesHeading: 'Partnerklubber, takbarer og uteliv i bydelen',
      genresHeading: 'Utvalgte klubber, musikkvelder og VIP-bord',
      eventsHeading: 'Kommende fester, partnerklubber og VIP-bord',
      servicesHeading: 'Tilleggstjenester fra concierge og partnerklubber',
      guidesHeading: 'Relaterte guider, partnerklubber og kalender',
    },
    {
      highlights: 'Utvalgte kvelder og klubber', sanSiro: 'San Siro etterfester', formulas: 'VIP-bord, gjesteliste & aperitivo',
      categories: 'Kategorier og bydeler', overview: 'Kort guide til Milanos uteliv', clubs: 'Partnerklubber',
      map: 'Klubbkart', catalog: 'Komplett klubbkatalog', related: 'Relaterte klubber og guider',
      calendar: 'Eventkalender', tonight: 'Åpent i kveld', weekend: 'Ukens program',
      special: 'Spesialarrangementer', pricing: 'Priser og VIP-bord', booking: 'Bestill på WhatsApp',
      rules: 'Kleskode og tider', faq: 'Ofte stilte spørsmål', archive: 'Arkiv over tidligere eventer',
    },
    { partnerClub: 'Partnerklubb', district: 'Bydel i Milano', genre: 'Musikkstil', service: 'VIP-Concierge', calendar: 'Kalender', guide: 'Guide' },
    'Oversikt over Milanos uteliv: partnerklubber, VIP-bord og bydeler',
    'Praktisk sammendrag fra Nightlife Milans concierge-team før kvelden.',
    [
      { title: '01 · Ikoniske klubber, takbarer og dinner shows', body: 'Fra Just Me Milano ved Torre Branca og 20. etasje på Voya Rooftop til Pineta, REPVBLIC og 55 Milano.' },
      { title: '02 · VIP-bord med 100 % flaskekreditt', body: 'Prioritert inngang uten kø, reservert bordområde og hele minimumsbeløpet brukt på klubbens flaskemeny.' },
      { title: '03 · Gjesteliste, tider og kleskode', body: 'Møt opp 19:30–21:30 for aperitivo eller 23:15–00:30 for gjesteliste i pent kveldsantrekk.' },
      { title: '04 · Bydeler og WhatsApp-concierge 7/7', body: 'Bordkart og bekreftelse på +39 351 912 7047 for Sempione, Corso Como, Porta Nuova, CityLife og San Siro.' },
    ],
  ),
  is: buildPack(
    'Efnisyfirlit síðu',
    'Stökktu beint í viðeigandi kafla:',
    'Skoða',
    {
      relatedEyebrow: 'TENGDAR SÍÐUR · NIGHTLIFE MILAN',
      homeHeading: 'Beinar leiðir að samstarfsklúbbum, hverfum og kvöldum',
      clubsHeading: 'Hverfi, næstu kvöld og svipaðir samstarfsklúbbar',
      zonesHeading: 'Samstarfsklúbbar, þakbarir og næturlíf í hverfinu',
      genresHeading: 'Helstu klúbbar, tónlistarkvöld og VIP-borð',
      eventsHeading: 'Næstu viðburðir, samstarfsklúbbar og VIP-borð',
      servicesHeading: 'Viðbótarþjónusta concierge og samstarfsklúbbar',
      guidesHeading: 'Tengdir leiðarvísar, klúbbar og dagatal',
    },
    {
      highlights: 'Valin kvöld og klúbbar', sanSiro: 'Eftirpartý San Siro', formulas: 'VIP-borð, gestalisti & aperitivo',
      categories: 'Flokkar og hverfi', overview: 'Stutt yfirlit yfir næturlíf Mílanó', clubs: 'Samstarfsklúbbar',
      map: 'Kort af stöðum', catalog: 'Heildarlisti klúbba', related: 'Tengdir klúbbar og leiðarvísar',
      calendar: 'Viðburðadagatal', tonight: 'Opið í kvöld', weekend: 'Dagskrá vikunnar',
      special: 'Sérviðburðir', pricing: 'Verð og VIP-borð', booking: 'Bóka á WhatsApp',
      rules: 'Klæðaburður og tímar', faq: 'Algengar spurningar', archive: 'Safn liðinna viðburða',
    },
    { partnerClub: 'Samstarfsklúbbur', district: 'Hverfi í Mílanó', genre: 'Tónlistarstíll', service: 'VIP-þjónusta', calendar: 'Dagatal', guide: 'Leiðarvísir' },
    'Næturlíf Mílanó í hnotskurn: samstarfsklúbbar, VIP-borð og hverfi',
    'Hagnýtt yfirlit frá concierge-teymi Nightlife Milan fyrir kvöldið.',
    [
      { title: '01 · Þekktir klúbbar, þakbarir og dinner show', body: 'Frá Just Me Milano við Torre Branca og 20. hæð Voya Rooftop til Pineta, REPVBLIC og 55 Milano.' },
      { title: '02 · VIP-borð með 100% inneign í flöskum', body: 'Forgangur inn án biðraðar, einkasvæði og öll lágmarksupphæð nýtt á opinbera flöskuseðlinum.' },
      { title: '03 · Gestalisti, tímasetningar og klæðaburður', body: 'Mæting 19:30–21:30 í aperitivo eða 23:15–00:30 á klúbbalista í snyrtilegum kvöldfatnaði.' },
      { title: '04 · Hverfi og WhatsApp-concierge 7/7', body: 'Borðakort og skrifleg staðfesting í síma +39 351 912 7047 fyrir Sempione, Corso Como, Porta Nuova og San Siro.' },
    ],
  ),
  uk: buildPack(
    'Зміст сторінки',
    'Перейдіть одразу до потрібного розділу:',
    'Детальніше',
    {
      relatedEyebrow: 'ПОВ’ЯЗАНІ РОЗДІЛИ · NIGHTLIFE MILAN',
      homeHeading: 'Швидкий перехід до клубів-партнерів, районів та вечірок',
      clubsHeading: 'Район, найближчі вечірки та схожі клуби-партнери',
      zonesHeading: 'Клуби-партнери, руфтопи та вечірки в цьому районі',
      genresHeading: 'Провідні клуби жанру, вечірки та VIP-столи',
      eventsHeading: 'Найближчі події, клуби-партнери та VIP-столи',
      servicesHeading: 'Додаткові послуги консьєржа та клуби-партнери',
      guidesHeading: 'Пов’язані путівники, клуби та календар подій',
    },
    {
      highlights: 'Головні вечірки та клуби', sanSiro: 'Афтепаті матчів Сан-Сіро', formulas: 'VIP-столи, списки та аперитиво',
      categories: 'Категорії та райони', overview: 'Короткий гід нічним Міланом', clubs: 'Клуби-партнери',
      map: 'Карта закладів', catalog: 'Повний каталог клубів', related: 'Пов’язані клуби та гіди',
      calendar: 'Календар подій', tonight: 'Відчинено сьогодні ввечері', weekend: 'Програма тижня',
      special: 'Спеціальні події', pricing: 'Ціни та VIP-столи', booking: 'Бронювання у WhatsApp',
      rules: 'Дрескод і години входу', faq: 'Часті запитання', archive: 'Архів минулих подій',
    },
    { partnerClub: 'Клуб-партнер', district: 'Район Мілана', genre: 'Музичний стиль', service: 'VIP-консьєрж', calendar: 'Календар', guide: 'Путівник' },
    'Нічне життя Мілана: клуби-партнери, VIP-столи та райони міста',
    'Практична пам’ятка офіційної служби консьєржа Nightlife Milan.',
    [
      { title: '01 · Культові клуби, руфтопи та вечері-шоу', body: 'Від Just Me Milano біля вежі Торре-Бранка та 20-го поверху Voya Rooftop до Pineta, REPVBLIC і 55 Milano.' },
      { title: '02 · VIP-столи зі 100% депозитом на напої', body: 'Пріоритетний вхід без черги, приватна зона та повне зарахування депозиту за офіційною картою напоїв.' },
      { title: '03 · Гостьові списки, час і дрескод', body: 'Приходьте о 19:30–21:30 на аперитиво або о 23:15–00:30 за списком у вечірньому елегантному одязі.' },
      { title: '04 · Райони та консьєрж у WhatsApp 7/7', body: 'Схеми залів і підтвердження за номером +39 351 912 7047 для Sempione, Corso Como, Porta Nuova та San Siro.' },
    ],
  ),
  sq: buildPack(
    'Përmbajtja e Faqes',
    'Kaloni drejtpërdrejt te seksioni që kërkoni:',
    'Shiko më shumë',
    {
      relatedEyebrow: 'FAQE TË LIDHURA · NIGHTLIFE MILAN',
      homeHeading: 'Qasje e Shpejtë te Klubet Partnere, Lagjet dhe Mbrëmjet',
      clubsHeading: 'Lagjja, Mbrëmjet e Ardhshme dhe Klube Partnere të Ngjashme',
      zonesHeading: 'Klubet Partnere, Rooftops dhe Mbrëmjet në Këtë Zonë',
      genresHeading: 'Klubet Kryesore, Mbrëmjet Muzikore dhe Tavolinat VIP',
      eventsHeading: 'Eventet e Ardhshme, Klubet Partnere dhe Tavolinat VIP',
      servicesHeading: 'Shërbime Concierge Plotësuese dhe Klubet Partnere',
      guidesHeading: 'Udhëzues të Lidhur, Klube dhe Kalendari i Eventeve',
    },
    {
      highlights: 'Mbrëmjet dhe Klubet Kryesore', sanSiro: 'Afterparty pas Ndeshjeve San Siro', formulas: 'Tavolina VIP, Lista & Aperitivo',
      categories: 'Kategoritë dhe Lagjet', overview: 'Përmbledhje për Natën në Milano', clubs: 'Klubet Partnere',
      map: 'Harta e Lokaleve', catalog: 'Katalogu i Plotë i Klubeve', related: 'Klube dhe Udhëzues të Lidhur',
      calendar: 'Kalendari i Eventeve', tonight: 'Hapur Sonte', weekend: 'Programi i Javës',
      special: 'Evente Speciale', pricing: 'Çmimet dhe Tavolinat VIP', booking: 'Rezervim në WhatsApp',
      rules: 'Dress Code dhe Oraret', faq: 'Pyetje të Shpeshta', archive: 'Arkivi i Eventeve të Kaluara',
    },
    { partnerClub: 'Klub Partner', district: 'Lagje e Milanos', genre: 'Stil Muzikor', service: 'VIP Concierge', calendar: 'Kalendar', guide: 'Udhëzues' },
    'Udhëzues për Jetën e Natës në Milano: Klubet Partnere, Tavolinat VIP dhe Lagjet',
    'Përmbledhje praktike nga ekipi zyrtar Nightlife Milan për zgjedhjen e klubit dhe rezervimit.',
    [
      { title: '01 · Klube Ikonike, Rooftops dhe Dinner Show', body: 'Nga Just Me Milano pranë Torre Branca dhe kati i 20-të i Voya Rooftop te Pineta, REPVBLIC dhe 55 Milano.' },
      { title: '02 · Tavolina VIP me 100% Kredit për Shishe', body: 'Hyrje prioritare pa radhë, zonë private dhe shuma minimale e konvertuar plotësisht në menynë zyrtare të shisheve.' },
      { title: '03 · Lista e të Ftuarve, Oraret dhe Veshja', body: 'Mbërritja e këshilluar 19:30–21:30 për aperitivo ose 23:15–00:30 me listë dhe veshje elegante mbrëmjeje.' },
      { title: '04 · Lagjet dhe Concierge WhatsApp 7/7', body: 'Planimetri dhe konfirmim i shkruar në +39 351 912 7047 për Sempione, Corso Como, Porta Nuova dhe San Siro.' },
    ],
  ),
  sr: buildPack(
    'Садржај странице',
    'Пређите директно на жељени одељак:',
    'Истражи',
    {
      relatedEyebrow: 'ПОВЕЗАНЕ СТРАНИЦЕ · NIGHTLIFE MILAN',
      homeHeading: 'Брз приступ партнерским клубовима, четвртима и журкама',
      clubsHeading: 'Четврт, предстојеће вечери и слични партнерски клубови',
      zonesHeading: 'Партнерски клубови, руфтопови и изласци у овој четврти',
      genresHeading: 'Главни клубови, музичке вечери и VIP столови',
      eventsHeading: 'Предстојећи догађаји, партнерски клубови и VIP столови',
      servicesHeading: 'Додатне консијерж услуге и партнерски клубови',
      guidesHeading: 'Повезани водичи, партнерски клубови и календар',
    },
    {
      highlights: 'Издвојене вечери и клубови', sanSiro: 'Сан Сиро афтерпарти', formulas: 'VIP столови, списак и аперитиво',
      categories: 'Категорије и четврти', overview: 'Кратак водич кроз ноћни Милано', clubs: 'Партнерски клубови',
      map: 'Мапа клубова', catalog: 'Комплетан каталог клубова', related: 'Повезани клубови и водичи',
      calendar: 'Календар догађаја', tonight: 'Отворено вечерас', weekend: 'Недељни програм',
      special: 'Специјални догађаји', pricing: 'Цене и VIP столови', booking: 'WhatsApp резервација',
      rules: 'Дрес-код и улаз', faq: 'Честа питања', archive: 'Архива прошлих догађаја',
    },
    { partnerClub: 'Партнерски клуб', district: 'Четврт Милана', genre: 'Музички стил', service: 'VIP Консијерж', calendar: 'Календар', guide: 'Водич' },
    'Водич кроз ноћни живот Милана: партнерски клубови, VIP столови и четврти',
    'Практичан преглед званичног Nightlife Milan тима за избор клуба и резервацију.',
    [
      { title: '01 · Култни клубови, руфтопови и вечере уз шоу', body: 'Од клуба Just Me Milano код торња Torre Branca до 20. спрата Voya Rooftop-а, Pinete, REPVBLIC-а и 55 Milana.' },
      { title: '02 · VIP столови уз 100% кредита за флаше', body: 'Приоритетан улаз без реда, приватни сепаре и пун износ минималне потрошње за званичну карту пића.' },
      { title: '03 · Списак гостију, термини и дрес-код', body: 'Долазак од 19:30 до 21:30 за аперитиво или 23:15 до 00:30 за клупски списак уз елегантну одећу.' },
      { title: '04 · Четврти и WhatsApp консијерж 7/7', body: 'Мапе столова и потврда на +39 351 912 7047 за Sempione, Corso Como, Porta Nuova, CityLife и San Siro.' },
    ],
  ),
  bs: buildPack(
    'Sadržaj stranice',
    'Pređite direktno na željeni odjeljak:',
    'Istraži',
    {
      relatedEyebrow: 'POVEZANE STRANICE · NIGHTLIFE MILAN',
      homeHeading: 'Brzi pristup partnerskim klubovima, četvrtima i zabavama',
      clubsHeading: 'Četvrt, naredne večeri i slični partnerski klubovi',
      zonesHeading: 'Partnerski klubovi, rooftop barovi i izlasci u četvrti',
      genresHeading: 'Vodeći klubovi, muzičke večeri i VIP stolovi',
      eventsHeading: 'Naredni događaji, partnerski klubovi i VIP stolovi',
      servicesHeading: 'Dodatne concierge usluge i partnerski klubovi',
      guidesHeading: 'Povezani vodiči, partnerski klubovi i kalendar',
    },
    {
      highlights: 'Izdvojene večeri i klubovi', sanSiro: 'San Siro afterparty', formulas: 'VIP stolovi, spisak i aperitivo',
      categories: 'Kategorije i četvrti', overview: 'Kratak vodič kroz noćni Milano', clubs: 'Partnerski klubovi',
      map: 'Mapa klubova', catalog: 'Kompletan katalog klubova', related: 'Povezani klubovi i vodiči',
      calendar: 'Kalendar događaja', tonight: 'Otvoreno večeras', weekend: 'Sedmični program',
      special: 'Specijalni događaji', pricing: 'Cijene i VIP stolovi', booking: 'WhatsApp rezervacija',
      rules: 'Dress code i ulaz', faq: 'Česta pitanja', archive: 'Arhiva prošlih događaja',
    },
    { partnerClub: 'Partnerski klub', district: 'Četvrt Milana', genre: 'Muzički stil', service: 'VIP Concierge', calendar: 'Kalendar', guide: 'Vodič' },
    'Vodič kroz noćni život Milana: partnerski klubovi, VIP stolovi i četvrti',
    'Praktičan sažetak zvaničnog Nightlife Milan tima za izbor kluba i rezervaciju.',
    [
      { title: '01 · Kultni klubovi, rooftopovi i dinner show', body: 'Od kluba Just Me Milano ispod tornja Torre Branca do 20. sprata Voya Rooftopa, Pinete, REPVBLIC-a i 55 Milana.' },
      { title: '02 · VIP stolovi uz 100% kredita za flaše', body: 'Prioritetan ulaz bez čekanja, privatni separe i puni iznos minimalne potrošnje za zvaničnu kartu pića.' },
      { title: '03 · Spisak gostiju, termini i dress code', body: 'Dolazak od 19:30 do 21:30 za aperitivo ili 23:15 do 00:30 za klupski spisak uz elegantnu odjeću.' },
      { title: '04 · Četvrti i 7/7 WhatsApp concierge', body: 'Planovi sala i pisana potvrda na +39 351 912 7047 za Sempione, Corso Como, Porta Nuova, CityLife i San Siro.' },
    ],
  ),
  mk: buildPack(
    'Содржина на страницата',
    'Преминете директно на саканиот дел:',
    'Истражи',
    {
      relatedEyebrow: 'ПОВРЗАНИ СТРАНИЦИ · NIGHTLIFE MILAN',
      homeHeading: 'Брз пристап до партнерски клубови, населби и забави',
      clubsHeading: 'Населба, следни вечери и слични партнерски клубови',
      zonesHeading: 'Партнерски клубови, руфтоп барови и забави во реонот',
      genresHeading: 'Водечки клубови, музички вечери и VIP маси',
      eventsHeading: 'Следни настани, партнерски клубови и VIP маси',
      servicesHeading: 'Дополнителни консиерж услуги и партнерски клубови',
      guidesHeading: 'Поврзани водичи, партнерски клубови и календар',
    },
    {
      highlights: 'Издвоени вечери и клубови', sanSiro: 'Сан Сиро афтерпарти', formulas: 'VIP маси, список и аперитиво',
      categories: 'Категории и населби', overview: 'Краток водич за ноќен Милано', clubs: 'Партнерски клубови',
      map: 'Мапа на локали', catalog: 'Целосен каталог на клубови', related: 'Поврзани клубови и водичи',
      calendar: 'Календар на настани', tonight: 'Отворено вечерва', weekend: 'Неделна програма',
      special: 'Специјални настани', pricing: 'Цени и VIP маси', booking: 'WhatsApp резервација',
      rules: 'Дрес-код и влез', faq: 'Чести прашања', archive: 'Архива на минати настани',
    },
    { partnerClub: 'Партнерски клуб', district: 'Населба во Милано', genre: 'Музички стил', service: 'VIP Консиерж', calendar: 'Календар', guide: 'Водич' },
    'Водич за ноќниот живот во Милано: партнерски клубови, VIP маси и населби',
    'Практичен преглед од официјалниот консиерж тим на Nightlife Milan.',
    [
      { title: '01 · Култни клубови, руфтопови и вечера-шоу', body: 'Од Just Me Milano под кулата Torre Branca до 20-тиот кат на Voya Rooftop, Pineta, REPVBLIC и 55 Milano.' },
      { title: '02 · VIP маси со 100% кредит за шишиња', body: 'Приоритетен влез без чекање, приватно сепаре и целосна минимална потрошувачка за официјалното мени.' },
      { title: '03 · Список на гости, термини и дрес-код', body: 'Пристигнување од 19:30 до 21:30 за аперитиво или 23:15 до 00:30 за клупски список во елегантна облека.' },
      { title: '04 · Населби и WhatsApp консиерж 7/7', body: 'Планови на маси и потврда на +39 351 912 7047 за Sempione, Corso Como, Porta Nuova, CityLife и San Siro.' },
    ],
  ),
};

export function getContextualLocalePack35(locale: string | LocaleCode): ContextualLocalePack35 {
  const code = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  return PACKS_35[code] || PACKS_35.en;
}

export function getTocHeading35(locale: string | LocaleCode): string {
  return getContextualLocalePack35(locale).tocHeading;
}

export function getTocLabel35(locale: string | LocaleCode, key: TocTopicKey): string {
  return getContextualLocalePack35(locale).tocLabels[key];
}

export interface ContextualSiloCard {
  href: string;
  title: string;
  tag: string;
  imageSrc: string;
}

interface PartnerClubNode {
  id: string;
  name: string;
  zoneSlug: string;
  zoneLabel: string;
  genreKey: 'dinner' | 'urban' | 'rooftop' | 'techno' | 'family';
}

/**
 * Strictly official partner venues in approved priority order (0 non-partner venues like Alcatraz/Fabrique/The Beach).
 */
const OFFICIAL_PARTNER_CLUBS: readonly PartnerClubNode[] = [
  { id: 'v-justme', name: 'Just Me Milano', zoneSlug: 'parco-sempione', zoneLabel: 'Parco Sempione · Torre Branca', genreKey: 'dinner' },
  { id: 'v-pineta', name: 'Pineta Milano', zoneSlug: 'isola', zoneLabel: 'Garibaldi · Cenisio', genreKey: 'urban' },
  { id: 'v-voya', name: 'Voya Rooftop Milan', zoneSlug: 'citylife-portello', zoneLabel: 'CityLife · Portello 20F', genreKey: 'rooftop' },
  { id: 'v-repvblic', name: 'REPVBLIC Milano', zoneSlug: 'corso-como', zoneLabel: 'Repubblica · Porta Nuova', genreKey: 'urban' },
  { id: 'v-55milano', name: '55 Milano', zoneSlug: 'arco-della-pace', zoneLabel: 'Sempione · Arco della Pace', genreKey: 'dinner' },
  { id: 'v-carlsbergol', name: 'Carlsberg ØL Milano', zoneSlug: 'corso-como', zoneLabel: 'Bastioni di Porta Nuova', genreKey: 'family' },
  { id: 'v-magazzini', name: 'Magazzini Generali', zoneSlug: 'porta-romana', zoneLabel: 'Porta Romana · Via Pietrasanta', genreKey: 'techno' },
  { id: 'v-bobino', name: 'Bobino Milano', zoneSlug: 'navigli', zoneLabel: 'Porta Genova · Navigli', genreKey: 'dinner' },
  { id: 'v-theclub', name: 'The Club Milano', zoneSlug: 'brera', zoneLabel: 'Brera · Moscova', genreKey: 'urban' },
  { id: 'v-tocqueville', name: 'Tocqueville 13', zoneSlug: 'corso-como', zoneLabel: 'Corso Como · Porta Nuova', genreKey: 'techno' },
  { id: 'v-tom', name: 'TOM. The Ordinary Market', zoneSlug: 'navigli', zoneLabel: 'Via Molino delle Armi', genreKey: 'dinner' },
  { id: 'v-mibmilano', name: 'MIB Milano', zoneSlug: 'brera', zoneLabel: 'Piazza Affari · Duomo', genreKey: 'dinner' },
  { id: 'v-dazi', name: 'Dazi Milano', zoneSlug: 'arco-della-pace', zoneLabel: 'Arco della Pace · Sempione', genreKey: 'dinner' },
  { id: 'v-terrazza21', name: 'Terrazza Duomo 21', zoneSlug: 'brera', zoneLabel: 'Piazza del Duomo', genreKey: 'rooftop' },
];

function fnvHash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function detectIsSingleGuideRoute(
  lang: LocaleCode,
  pageKey?: string,
  pagePath?: string,
): boolean {
  const candidates = [pageKey || '', pagePath || ''];
  const guidesLocDir = getLocalizedDir35('guides', lang).toLowerCase();
  for (const raw of candidates) {
    const clean = raw.split('?')[0].split('#')[0].replace(/\/+$/g, '').toLowerCase();
    if (!clean) continue;
    const parts = clean.split('/').filter(Boolean);
    const trimmed = parts.length > 0 && parts[0] === lang.toLowerCase() ? parts.slice(1) : parts;
    if (trimmed.length >= 2 && (trimmed[0] === 'guides' || trimmed[0] === 'guide' || trimmed[0] === guidesLocDir)) {
      return true;
    }
  }
  return false;
}

export function resolveContextualCluster(
  lang: LocaleCode,
  pageKey?: string,
  pagePath?: string,
): { cluster: SiloClusterKey; isHomePage: boolean; isSingleGuidePage: boolean; cleanKey: string } {
  // STRICT rule: isHomePage ONLY triggers when pageKey is explicitly '/'
  const isHomePage = pageKey === '/';
  const isSingleGuidePage = detectIsSingleGuideRoute(lang, pageKey, pagePath);
  const rawKey = (pageKey || pagePath || '/events').split('?')[0].split('#')[0];
  const lp = localePrefix(lang);
  const cleanKey = lp && rawKey.startsWith(`${lp}/`)
    ? rawKey.slice(lp.length)
    : rawKey === lp
      ? '/'
      : rawKey;

  if (isHomePage) {
    return { cluster: 'home', isHomePage: true, isSingleGuidePage: false, cleanKey: '/' };
  }
  if (isSingleGuidePage || cleanKey.startsWith('/guides') || cleanKey.includes('/guide')) {
    return { cluster: 'guides', isHomePage: false, isSingleGuidePage, cleanKey };
  }
  const tokens = DIR_AND_SUB_TOKENS_35[lang] || DIR_AND_SUB_TOKENS_35.en;
  if (cleanKey.startsWith('/clubs') || cleanKey.startsWith(`/${tokens.clubsDir}`)) {
    return { cluster: 'clubs', isHomePage: false, isSingleGuidePage: false, cleanKey };
  }
  if (cleanKey.startsWith('/zones') || cleanKey.startsWith(`/${tokens.zonesDir}`)) {
    return { cluster: 'zones', isHomePage: false, isSingleGuidePage: false, cleanKey };
  }
  if (cleanKey.startsWith('/genres') || cleanKey.startsWith(`/${tokens.genresDir}`)) {
    return { cluster: 'genres', isHomePage: false, isSingleGuidePage: false, cleanKey };
  }
  if (
    cleanKey.startsWith('/vip-tables') ||
    cleanKey.startsWith('/bottle-prices') ||
    cleanKey.startsWith('/guest-lists') ||
    cleanKey.startsWith('/aperitivo') ||
    cleanKey.startsWith('/rooftops') ||
    cleanKey.startsWith('/door-policy') ||
    cleanKey.startsWith('/concierge') ||
    cleanKey.startsWith('/faq') ||
    cleanKey.startsWith('/private-parties')
  ) {
    return { cluster: 'services', isHomePage: false, isSingleGuidePage: false, cleanKey };
  }
  return { cluster: 'events', isHomePage: false, isSingleGuidePage: false, cleanKey };
}

export function resolveContextualSiloCards(
  lang: LocaleCode,
  pageKey?: string,
  pagePath?: string,
): {
  cluster: SiloClusterKey;
  isHomePage: boolean;
  isSingleGuidePage: boolean;
  eyebrow: string;
  heading: string;
  exploreCta: string;
  cards: readonly ContextualSiloCard[];
  pack: ContextualLocalePack35;
} {
  const pack = getContextualLocalePack35(lang);
  const footer = getFooterCopy(lang);
  const v01 = getV01SiteCopy(lang);
  const nyeSeo = getCapodannoMasterSeo35(lang);
  const lp = localePrefix(lang);
  const clubsDir = getLocalizedDir35('clubs', lang);
  const { cluster, isHomePage, isSingleGuidePage, cleanKey } = resolveContextualCluster(lang, pageKey, pagePath);

  const locHref = (canonicalInternal: string) =>
    localizeInternalHref(`${lp}${canonicalInternal}`, lang);

  const clubCard = (club: PartnerClubNode): ContextualSiloCard => ({
    href: `${lp}/${clubsDir}/${getLocalizedVenueSlug35(club.id, lang)}`,
    title: `${club.name} · ${club.zoneLabel}`,
    tag: pack.cardTags.partnerClub,
    imageSrc: getVenueCardPhoto4x5(club.id),
  });

  const hubs = {
    clubs: {
      href: locHref('/clubs'),
      title: footer.clubs,
      tag: pack.cardTags.partnerClub,
      imageSrc: '/images/events/cards-4x5/partner-clubs/just-me-milano.webp',
    },
    vip: {
      href: locHref('/vip-tables'),
      title: v01.formulaVip,
      tag: pack.cardTags.service,
      imageSrc: '/images/events/cards-4x5/pillars/vip-tables-bottle-card.webp',
    },
    lists: {
      href: locHref('/guest-lists'),
      title: v01.formulaList,
      tag: pack.cardTags.service,
      imageSrc: '/images/events/cards-4x5/pillars/concierge-7x7-card.webp',
    },
    aperitivo: {
      href: locHref('/aperitivo'),
      title: v01.formulaAperitivo,
      tag: pack.cardTags.service,
      imageSrc: '/images/events/cards-4x5/partner-clubs/carlsberg-ol-milano.webp',
    },
    rooftops: {
      href: locHref('/rooftops'),
      title: 'Skyline & Rooftop Milano',
      tag: pack.cardTags.service,
      imageSrc: '/images/events/cards-4x5/partner-clubs/voya-rooftop-milan.webp',
    },
    bottles: {
      href: locHref('/bottle-prices'),
      title: pack.tocLabels.pricing,
      tag: pack.cardTags.service,
      imageSrc: '/images/events/cards-4x5/pillars/vip-prive-bottles-card.webp',
    },
    doorPolicy: {
      href: locHref('/door-policy'),
      title: pack.tocLabels.rules,
      tag: pack.cardTags.service,
      imageSrc: '/images/events/cards-4x5/pillars/guides-official-card.webp',
    },
    tonight: {
      href: locHref('/events/tonight'),
      title: pack.tocLabels.tonight,
      tag: pack.cardTags.calendar,
      imageSrc: '/images/events/cards-4x5/partner-clubs/pineta-club-milano.webp',
    },
    thisWeek: {
      href: locHref('/events/this-week'),
      title: pack.tocLabels.weekend,
      tag: pack.cardTags.calendar,
      imageSrc: '/images/events/cards-4x5/partner-clubs/tocqueville-13-milano.webp',
    },
    nye: {
      href: capodannoCategoryPath('capodanno-2027', lang),
      title: nyeSeo.footerAnchor,
      tag: pack.cardTags.calendar,
      imageSrc: '/images/events/cards-4x5/capodanno-2027-posters/capodanno-pineta-milano.webp',
    },
    sanSiro: {
      href: locHref('/football-afterparties'),
      title: v01.footerSanSiro,
      tag: pack.cardTags.calendar,
      imageSrc: '/images/events/cards-4x5/partner-clubs/aria-club-milano.webp',
    },
    guides: {
      href: locHref('/guides'),
      title: footer.guides,
      tag: pack.cardTags.guide,
      imageSrc: '/images/events/cards-4x5/pillars/insider-interviews-card.webp',
    },
    zones: {
      href: locHref('/zones'),
      title: footer.zones,
      tag: pack.cardTags.district,
      imageSrc: '/images/events/cards-4x5/zones/corso-como-district-card.webp',
    },
  };

  const seed = fnvHash(`${cleanKey}|${pagePath || ''}`);
  const pickPartnerClubs = (count: number, excludeSubstr = '', preferredZone?: string, preferredGenre?: PartnerClubNode['genreKey']): ContextualSiloCard[] => {
    const lowEx = excludeSubstr.toLowerCase();
    const filtered = OFFICIAL_PARTNER_CLUBS.filter((c) => {
      const slugToken = c.id.replace(/^v-/, '').toLowerCase();
      return !lowEx || (!lowEx.includes(slugToken) && !lowEx.includes(c.name.toLowerCase().split(' ')[0]));
    });
    const prioritized = preferredZone
      ? [
          ...filtered.filter((c) => c.zoneSlug === preferredZone),
          ...filtered.filter((c) => c.zoneSlug !== preferredZone),
        ]
      : preferredGenre
        ? [
            ...filtered.filter((c) => c.genreKey === preferredGenre),
            ...filtered.filter((c) => c.genreKey !== preferredGenre),
          ]
        : filtered;

    const out: ContextualSiloCard[] = [];
    const total = prioritized.length;
    if (!total) return out;
    const start = preferredZone || preferredGenre ? 0 : seed % total;
    for (let i = 0; i < total && out.length < count; i++) {
      out.push(clubCard(prioritized[(start + i) % total]));
    }
    return out;
  };

  let candidates: ContextualSiloCard[] = [];

  if (cluster === 'home') {
    candidates = [hubs.nye, hubs.vip, hubs.lists, hubs.guides, hubs.zones, hubs.tonight];
  } else if (cluster === 'clubs') {
    const matchedClub = OFFICIAL_PARTNER_CLUBS.find((c) =>
      cleanKey.toLowerCase().includes(c.id.replace(/^v-/, '')),
    );
    const zoneSlug = matchedClub?.zoneSlug || 'corso-como';
    const zoneCard: ContextualSiloCard = {
      href: locHref(`/zones/${zoneSlug}`),
      title: matchedClub ? matchedClub.zoneLabel : footer.zones,
      tag: pack.cardTags.district,
      imageSrc: getZoneCardPhoto4x5(zoneSlug),
    };
    candidates = [
      zoneCard,
      ...pickPartnerClubs(2, cleanKey, matchedClub?.zoneSlug),
      hubs.vip,
      hubs.thisWeek,
      hubs.clubs,
    ];
  } else if (cluster === 'zones') {
    const zSlug = cleanKey.split('/').filter(Boolean).pop() || 'corso-como';
    candidates = [
      ...pickPartnerClubs(2, '', zSlug),
      hubs.aperitivo,
      hubs.thisWeek,
      hubs.zones,
      hubs.vip,
    ];
  } else if (cluster === 'genres') {
    const gSlug = cleanKey.toLowerCase();
    const gPref: PartnerClubNode['genreKey'] =
      gSlug.includes('techno') || gSlug.includes('house')
        ? 'techno'
        : gSlug.includes('hip') || gSlug.includes('reggaeton') || gSlug.includes('latin')
          ? 'urban'
          : 'dinner';
    candidates = [
      ...pickPartnerClubs(2, '', undefined, gPref),
      {
        href: locHref('/genres'),
        title: pack.cardTags.genre,
        tag: pack.cardTags.genre,
        imageSrc: getGenreCardPhoto4x5(gSlug.split('/').pop() || 'house'),
      },
      hubs.thisWeek,
      hubs.vip,
    ];
  } else if (cluster === 'services') {
    if (cleanKey.includes('vip-tables')) {
      candidates = [hubs.bottles, hubs.doorPolicy, ...pickPartnerClubs(2, '', undefined, 'dinner'), hubs.lists];
    } else if (cleanKey.includes('bottle-prices')) {
      candidates = [hubs.vip, hubs.lists, ...pickPartnerClubs(2, '', undefined, 'urban'), hubs.thisWeek];
    } else if (cleanKey.includes('guest-lists')) {
      candidates = [hubs.doorPolicy, hubs.tonight, ...pickPartnerClubs(2, '', undefined, 'urban'), hubs.vip];
    } else if (cleanKey.includes('aperitivo') || cleanKey.includes('rooftops')) {
      candidates = [hubs.rooftops, hubs.aperitivo, ...pickPartnerClubs(3, '', undefined, 'rooftop'), hubs.vip];
    } else {
      candidates = [hubs.vip, hubs.lists, ...pickPartnerClubs(2, cleanKey), hubs.thisWeek];
    }
  } else if (cluster === 'guides') {
    candidates = [
      ...pickPartnerClubs(2, cleanKey),
      hubs.vip,
      hubs.thisWeek,
      hubs.nye,
      hubs.guides,
    ];
  } else {
    // 'events' (including Capodanno, dated events, tonight, this-week, single-pass)
    candidates = [
      hubs.nye,
      hubs.tonight,
      hubs.thisWeek,
      ...pickPartnerClubs(3, cleanKey),
      hubs.vip,
      hubs.sanSiro,
    ];
  }

  const normPath = (p: string) => p.split('?')[0].split('#')[0].replace(/\/+$/g, '').toLowerCase() || '/';
  const currentNorm = normPath(pagePath || `${lp}${cleanKey === '/' ? '' : cleanKey}`);
  const seenHrefs = new Set<string>();
  const finalCards: ContextualSiloCard[] = [];

  for (const cand of candidates) {
    const cNorm = normPath(cand.href);
    if (cNorm === currentNorm || seenHrefs.has(cNorm)) continue;
    seenHrefs.add(cNorm);
    finalCards.push(cand);
    if (finalCards.length >= 4) break;
  }

  return {
    cluster,
    isHomePage,
    isSingleGuidePage,
    eyebrow: pack.siloEyebrow[cluster],
    heading: pack.siloHeading[cluster],
    exploreCta: pack.exploreCta,
    cards: finalCards,
    pack,
  };
}
