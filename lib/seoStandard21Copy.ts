import { localePrefix, type LocaleCode } from '@/lib/i18n/locales';

export type SeoContextualLink = {
  href: string;
  anchor: string;
  summary: string;
};

export type SeoSectionBlock = {
  index: 1 | 2 | 3 | 4 | 5;
  h3Title: string;
  anchorId: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: readonly [string, string, string];
  contextualLinks: readonly SeoContextualLink[];
};

export type SeoSiloBranch = {
  branchTitle: string;
  parentLink: { href: string; label: string };
  children: readonly { href: string; label: string }[];
};

export type SeoStandard21Copy = {
  eyebrow: string;
  h2Main: string;
  introParagraph: string;
  tocTitle: string;
  tocSubtitle: string;
  sections: readonly [
    SeoSectionBlock,
    SeoSectionBlock,
    SeoSectionBlock,
    SeoSectionBlock,
    SeoSectionBlock,
  ];
  h2SiloTree: string;
  siloIntro: string;
  siloBranches: readonly [SeoSiloBranch, SeoSiloBranch, SeoSiloBranch];
  h2Gmb: string;
  gmb: {
    businessName: string;
    categoryLabel: string;
    addressLabel: string;
    addressValue: string;
    coordinatesLabel: string;
    coordinatesValue: string;
    phoneLabel: string;
    phoneValue: string;
    emailLabel: string;
    emailValue: string;
    hoursLabel: string;
    hoursValue: string;
    mapsCtaLabel: string;
    whatsappCtaLabel: string;
  };
  zonesHeading: string;
  zonesList: readonly { name: string; href?: string; detail: string }[];
  citiesHeading: string;
  citiesList: readonly { name: string; detail: string }[];
  servicesHeading: string;
  servicesList: readonly { name: string; href: string; detail: string }[];
};

export function slugifyHeadingForSeo(title: string, fallbackIndex: number): string {
  const normalized = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  const ascii = normalized
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (ascii.length >= 6) {
    return ascii.slice(0, 88).replace(/-+$/g, '');
  }
  return `milano-nightlife-sezione-0${fallbackIndex}`;
}

type LocaleHeaderPack = {
  eyebrow: string;
  h2Main: string;
  tocTitle: string;
  tocSubtitle: string;
  s1Title: string;
  s2Title: string;
  s3Title: string;
  s4Title: string;
  s5Title: string;
  h2SiloTree: string;
  siloIntro: string;
  h2Gmb: string;
  zonesHeading: string;
  citiesHeading: string;
  servicesHeading: string;
  mapsCtaLabel: string;
  whatsappCtaLabel: string;
  anchors: {
    clubs: string;
    events: string;
    tonight: string;
    thisWeek: string;
    vip: string;
    guestLists: string;
    doorPolicy: string;
    concierge: string;
    aperitivo: string;
    guides: string;
    zones: string;
    genres: string;
    faq: string;
    mfw: string;
  };
};

const PACKS: Partial<Record<LocaleCode, LocaleHeaderPack>> = {
  it: {
    eyebrow: 'Guida Territoriale, Operativa e Concierge Ufficiale',
    h2Main: 'Guida Completa alla Vita Notturna di Milano: Locali, Tavoli VIP, Quartieri e Provincia',
    tocTitle: 'Indice dei Contenuti e Sezioni di Approfondimento',
    tocSubtitle: 'Seleziona un argomento per saltare direttamente alla sezione dedicata nella pagina:',
    s1Title: 'Locali Discoteche e Rooftop di Milano per Quartiere e Stile Musicale',
    s2Title: 'Prenotazione Tavoli VIP Privé Bottle Service e Accredito in Lista a Milano',
    s3Title: 'Selezione Ingresso Dress Code Orari e Consigli Pratici per la Serata',
    s4Title: 'Mappa dei Quartieri della Movida di Milano da Brera e Corso Como ai Navigli',
    s5Title: 'Guida Geolocalizzata Hinterland Comuni Vicini Monza Brianza e Province Lombarde',
    h2SiloTree: 'Struttura ad Albero: Articoli Correlati, Quartieri e Guide Consigliate',
    siloIntro: 'Esplora la gerarchia completa dei contenuti collegati tra hub principali, quartieri di Milano e guide operative:',
    h2Gmb: 'Sede Operativa, Contatti Ufficiali Google My Business e Mappa di Milano',
    zonesHeading: 'Zone di Competenza e Quartieri Serviti a Milano',
    citiesHeading: 'Città di Riferimento, Comuni dell’Hinterland e Province in Lombardia',
    servicesHeading: 'Servizi Ufficiali Nightlife Milan e Concierge Notturno',
    mapsCtaLabel: 'Apri indicazioni su Google Maps Milano',
    whatsappCtaLabel: 'Contatta il Concierge WhatsApp +39 351 912 7047',
    anchors: {
      clubs: 'discoteche e club a Milano',
      events: 'calendario eventi e serate a Milano',
      tonight: 'serate a Milano stasera',
      thisWeek: 'eventi del weekend a Milano',
      vip: 'prenotazione tavoli VIP e bottle service a Milano',
      guestLists: 'accredito in lista ingresso nei locali milanesi',
      doorPolicy: 'regole di dress code e selezione all’ingresso',
      concierge: 'servizio concierge notturno dedicato su WhatsApp',
      aperitivo: 'aperitivo con DJ set e dinner show sui rooftop',
      guides: 'guide aggiornate alla vita notturna milanese',
      zones: 'mappa dei quartieri della movida di Milano',
      genres: 'programmazione per genere musicale house techno e hip hop',
      faq: 'domande frequenti su ingressi tavoli e orari',
      mfw: 'eventi speciali e party della Milan Fashion Week',
    },
  },
  en: {
    eyebrow: 'Official Territorial, Venue & Nightlife Concierge Guide',
    h2Main: 'Complete Guide to Milan Nightlife: Clubs, VIP Tables, Districts and Lombardy',
    tocTitle: 'Table of Contents and In-Depth Nightlife Sections',
    tocSubtitle: 'Select any heading below to jump directly to the corresponding section on this page:',
    s1Title: 'Milan Nightclubs Rooftops and Music Venues by District and Format',
    s2Title: 'VIP Table Booking Bottle Service and Guest List Accreditation in Milan',
    s3Title: 'Door Selection Policy Dress Code Hours and Practical Nightlife Tips',
    s4Title: 'Map of Milan Nightlife Districts from Brera and Corso Como to Navigli',
    s5Title: 'Geo Guide to Hinterland Municipalities Monza Brianza and Lombardy Provinces',
    h2SiloTree: 'Tree Structure: Related Articles, Districts and Recommended Guides',
    siloIntro: 'Explore the complete hierarchy of connected hubs, Milan nightlife districts and operational guides:',
    h2Gmb: 'Operational Headquarters, Official Google My Business Contacts and Milan Map',
    zonesHeading: 'Competency Zones and Nightlife Districts Served in Milan',
    citiesHeading: 'Reference Cities, Hinterland Municipalities and Provinces in Lombardy',
    servicesHeading: 'Official Nightlife Milan Services and Night Concierge',
    mapsCtaLabel: 'Open directions on Google Maps Milan',
    whatsappCtaLabel: 'Contact WhatsApp Concierge +39 351 912 7047',
    anchors: {
      clubs: 'nightclubs and clubs in Milan',
      events: 'events calendar and parties in Milan',
      tonight: 'Milan nightlife events tonight',
      thisWeek: 'weekend parties in Milan',
      vip: 'VIP table booking and bottle service in Milan',
      guestLists: 'guest list accreditation at Milan clubs',
      doorPolicy: 'dress code rules and door selection policy',
      concierge: 'dedicated WhatsApp nightlife concierge service',
      aperitivo: 'aperitivo with DJ set and rooftop dinner shows',
      guides: 'updated Milan nightlife editorial guides',
      zones: 'map of Milan nightlife districts',
      genres: 'music programming for house techno and hip hop',
      faq: 'frequently asked questions on entry tables and hours',
      mfw: 'Milan Fashion Week special events and parties',
    },
  },
  es: {
    eyebrow: 'Guia Territorial, Operativa y Concierge Oficial',
    h2Main: 'Guia Completa de la Vida Nocturna en Milan: Discotecas, Mesas VIP, Barrios y Lombardia',
    tocTitle: 'Indice de Contenidos y Secciones de Profundizacion',
    tocSubtitle: 'Selecciona un tema para ir directamente a la seccion correspondiente en la pagina:',
    s1Title: 'Discotecas Clubes y Rooftops de Milan por Barrio y Estilo Musical',
    s2Title: 'Reserva de Mesas VIP Bottle Service y Lista de Invitados en Milan',
    s3Title: 'Seleccion de Entrada Dress Code Horarios y Consejos Practicos',
    s4Title: 'Mapa de los Barrios de Fiesta en Milan de Brera y Corso Como a Navigli',
    s5Title: 'Guia del Area Metropolitana Monza Brianza y Provincias de Lombardia',
    h2SiloTree: 'Estructura en Arbol: Articulos Relacionados, Barrios y Guias',
    siloIntro: 'Explora la jerarquia completa de contenidos entre hubs principales, barrios de Milan y guias:',
    h2Gmb: 'Sede Operativa, Contactos Oficiales Google My Business y Mapa de Milan',
    zonesHeading: 'Zonas de Competencia y Barrios Atendidos en Milan',
    citiesHeading: 'Ciudades de Referencia, Municipios del Area Metropolitana y Lombardia',
    servicesHeading: 'Servicios Oficiales Nightlife Milan y Concierge Nocturno',
    mapsCtaLabel: 'Abrir indicaciones en Google Maps Milan',
    whatsappCtaLabel: 'Contactar Concierge WhatsApp +39 351 912 7047',
    anchors: {
      clubs: 'discotecas y clubes en Milan',
      events: 'calendario de eventos y fiestas en Milan',
      tonight: 'fiestas en Milan esta noche',
      thisWeek: 'eventos del fin de semana en Milan',
      vip: 'reserva de mesas VIP y bottle service en Milan',
      guestLists: 'lista de invitados en clubes de Milan',
      doorPolicy: 'normas de dress code y seleccion en puerta',
      concierge: 'servicio concierge nocturno por WhatsApp',
      aperitivo: 'aperitivo con DJ set y dinner show en rooftops',
      guides: 'guias actualizadas de la noche milanesa',
      zones: 'mapa de barrios de la vida nocturna de Milan',
      genres: 'programacion por genero musical house techno y hip hop',
      faq: 'preguntas frecuentes sobre entradas mesas y horarios',
      mfw: 'eventos y fiestas de Milan Fashion Week',
    },
  },
  fr: {
    eyebrow: 'Guide Territorial, Operationnel et Conciergerie Officielle',
    h2Main: 'Guide Complet de la Vie Nocturne a Milan: Clubs, Tables VIP, Quartiers et Lombardie',
    tocTitle: 'Sommaire et Sections Approfondies sur la Nuit a Milan',
    tocSubtitle: 'Selectionnez une rubrique pour acceder directement a la section correspondante:',
    s1Title: 'Discotheques Clubs et Rooftops de Milan par Quartier et Style Musical',
    s2Title: 'Reservation Tables VIP Bottle Service et Guest List a Milan',
    s3Title: 'Selection a l Entree Dress Code Horaires et Conseils Pratiques',
    s4Title: 'Carte des Quartiers Nocturnes de Milan de Brera et Corso Como aux Navigli',
    s5Title: 'Guide de la Metropole Milanaise Monza Brianza et Provinces de Lombardie',
    h2SiloTree: 'Structure en Arbre: Articles Associes, Quartiers et Guides Recommandes',
    siloIntro: 'Explorez la hierarchie complete des contenus relies entre hubs, quartiers et guides:',
    h2Gmb: 'Siege Operationnel, Contacts Officiels Google My Business et Carte de Milan',
    zonesHeading: 'Zones de Competence et Quartiers Desservis a Milan',
    citiesHeading: 'Villes de Reference, Communes de la Metropole et Lombardie',
    servicesHeading: 'Services Officiels Nightlife Milan et Conciergerie de Nuit',
    mapsCtaLabel: 'Ouvrir l itineraire sur Google Maps Milan',
    whatsappCtaLabel: 'Contacter le Concierge WhatsApp +39 351 912 7047',
    anchors: {
      clubs: 'clubs et discotheques a Milan',
      events: 'calendrier des soirees et evenements a Milan',
      tonight: 'sortir a Milan ce soir',
      thisWeek: 'soirees du week-end a Milan',
      vip: 'reservation table VIP et bottle service a Milan',
      guestLists: 'guest list et accreditation en club a Milan',
      doorPolicy: 'dress code et politique d entree en club',
      concierge: 'conciergerie nocturne directe sur WhatsApp',
      aperitivo: 'aperitivo milanais rooftops et dinner shows',
      guides: 'guides editoriaux de la vie nocturne a Milan',
      zones: 'quartiers de la vie nocturne a Milan',
      genres: 'styles musicaux house techno et hip hop',
      faq: 'questions frequentes sur les entrees et tables',
      mfw: 'soirees officielles Milan Fashion Week',
    },
  },
  de: {
    eyebrow: 'Offizieller Gebiets-, Club- und Nightlife-Concierge-Guide',
    h2Main: 'Kompletter Guide zum Mailaender Nachtleben: Clubs, VIP-Tische, Viertel und Lombardei',
    tocTitle: 'Inhaltsverzeichnis und Fachbereiche zum Nachtleben',
    tocSubtitle: 'Waehlen Sie ein Thema, um direkt zum entsprechenden Abschnitt auf dieser Seite zu springen:',
    s1Title: 'Mailaender Nachtclubs Rooftops und Musik-Locations nach Viertel und Stil',
    s2Title: 'VIP-Tischreservierung Bottle Service und Gaesteliste in Mailand',
    s3Title: 'Tuerpolitik Dresscode Oeffnungszeiten und Praktische Tipps fuer den Abend',
    s4Title: 'Karte der Ausgehviertel in Mailand von Brera und Corso Como bis Navigli',
    s5Title: 'Regionaler Guide fuer das Umland Monza Brianza und die Provinzen der Lombardei',
    h2SiloTree: 'Baumstruktur: Verwandte Artikel, Stadtteile und Empfohlene Guides',
    siloIntro: 'Entdecken Sie die vollstaendige Hierarchie der verknuepften Hubs, Stadtteile und Guides:',
    h2Gmb: 'Operativer Standort, Offizielle Google My Business Kontakte und Mailand-Karte',
    zonesHeading: 'Zustaendigkeitsbereiche und Betreute Stadtteile in Mailand',
    citiesHeading: 'Referenzstaedte, Umlandgemeinden und Provinzen in der Lombardei',
    servicesHeading: 'Offizielle Nightlife Milan Services und Nacht-Concierge',
    mapsCtaLabel: 'Route auf Google Maps Mailand oeffnen',
    whatsappCtaLabel: 'WhatsApp-Concierge kontaktieren +39 351 912 7047',
    anchors: {
      clubs: 'Nachtclubs und Diskotheken in Mailand',
      events: 'Eventkalender und Partys in Mailand',
      tonight: 'heute Abend ausgehen in Mailand',
      thisWeek: 'Partys am Wochenende in Mailand',
      vip: 'VIP-Tischreservierung und Bottle Service in Mailand',
      guestLists: 'Gaesteliste und Club-Akkreditierung in Mailand',
      doorPolicy: 'Dresscode und Tuerpolitik in Mailaender Clubs',
      concierge: 'direkter Nightlife-Concierge per WhatsApp',
      aperitivo: 'Mailaender Aperitivo Rooftops und Dinner-Shows',
      guides: 'Redaktionelle Guides zum Mailaender Nachtleben',
      zones: 'Ausgehviertel und Stadtteile in Mailand',
      genres: 'Musikrichtungen House Techno und Hip-Hop',
      faq: 'haeufig gestellte Fragen zu Einlass und Tischen',
      mfw: 'Events zur Milan Fashion Week',
    },
  },
};

function getHeaderPack(lang: LocaleCode): LocaleHeaderPack {
  return PACKS[lang] ?? PACKS.en!;
}

const ITALIAN_SECTIONS_TEXT: readonly [
  readonly [string, string, string],
  readonly [string, string, string],
  readonly [string, string, string],
  readonly [string, string, string],
  readonly [string, string, string],
] = [
  [
    'Organizzare una serata a Milano richiede una conoscenza precisa di come si articola la scena notturna cittadina tra club storici, spazi industriali per concerti e musica elettronica, lounge bar con vista panoramica e locali dedicati al dinner show. Ogni zona della città risponde a abitudini, orari e fasce di pubblico ben distinti: chi cerca un ambiente curato con selezione attenta all’ingresso privilegia i club tra Corso Como, Porta Nuova, Brera e il Parco Sempione, mentre chi preferisce grandi dancefloor con impianti audio ad alta pressione sonora e ospiti internazionali punta sui palchi di Mecenate, Rubattino, Bovisa e dell’area metropolitana. Consultare in anticipo la scheda tecnica di ciascun locale permette di verificare capienza, programmazione artistica della settimana, presenza di aree coperte o giardini estivi e modalità di accesso tra biglietto prevendita, lista nominale e tavolo riservato.',
    'La distinzione per genere musicale è altrettanto decisiva per evitare spostamenti inutili durante il venerdì o il sabato notte. I format dedicati a house, afro house, tech house e melodic techno animano regolarmente i club del centro e i loft post-industriali della cintura ferroviaria, mentre le serate hip hop, reggaeton, urban e R&B richiamano un pubblico giovane e internazionale nei locali di Garibaldi, Moscova e Corso Sempione. Per chi desidera una formula completa dall’ora di cena fino a tarda notte, i dinner club milanesi uniscono cucina servita al tavolo, performance artistiche dal vivo e DJ set che entrano nel vivo dopo la mezzanotte, consentendo di mantenere la stessa postazione senza dover cambiare struttura.',
    'Attraverso il nostro catalogo verificato di locali a Milano è possibile confrontare indirizzi esatti, fermate della metropolitana M1, M2, M3, M4 e M5 più comode, parcheggi custoditi nelle vicinanze e fasce di prezzo reali. Ogni pagina locale viene aggiornata costantemente con le date confermate del calendario serate, così da offrire un riferimento concreto sia ai residenti milanesi sia a chi raggiunge il capoluogo lombardo per lavoro, fiere internazionali, sfilate della settimana della moda o weekend di svago.',
  ],
  [
    'La prenotazione di un tavolo VIP nei club di Milano rappresenta la soluzione più affidabile per garantire al proprio gruppo un ingresso prioritario senza lunghe attese alle transenne, un area riservata con sedute dedicate e un servizio bottiglie gestito direttamente dal personale di sala. Nei locali milanesi il funzionamento del tavolo si basa quasi sempre sulla formula del minimum spend, ovvero una soglia minima di spesa concordata prima della serata e interamente convertita in bottiglie di distillati premium, champagne o formati magnum scelti dal listino ufficiale del club. L’importo varia in base a quattro fattori principali: il giorno della settimana, la presenza di special guest internazionali in console, il numero complessivo di partecipanti con il relativo bilanciamento uomo-donna e la posizione fisica del tavolo tra pista centrale, balconata, area privé rialzata o super privé a ridosso della cabina DJ.',
    'Per chi invece preferisce entrare senza tavolo, l’accredito in lista nominale consente di accedere a tariffe agevolate o formule con consumazione inclusa entro una fascia oraria stabilita dalla direzione del locale, solitamente compresa tra le 23:00 e le 00:30 nelle serate di clubbing e tra le 19:30 e le 21:30 durante l’aperitivo serale. È fondamentale comunicare con precisione nome, cognome e numero di ospiti prima della chiusura delle liste, presentandosi all’ingresso con un documento d’identità valido e in gruppo ordinato per agevolare il controllo da parte degli addetti all’accoglienza.',
    'Il nostro desk di assistenza su WhatsApp al numero +39 351 912 7047 fornisce in tempo reale le planimetrie aggiornate dei tavoli, i listini bottiglie ufficiali e le condizioni di accredito per ciascuna serata in programma. In questo modo ogni gruppo può ricevere una quotazione trasparente, bloccare la posizione desiderata con conferma scritta e ricevere indicazioni puntuali sul referente all’ingresso prima ancora di arrivare davanti al locale.',
  ],
  [
    'Rispettare le regole di selezione all’ingresso e il dress code richiesto dai club di Milano è il primo passo per vivere una serata fluida e senza imprevisti alla porta. La maggior parte delle discoteche di fascia alta, dei rooftop panoramici e dei dinner club in zona Brera, Corso Como, Porta Nuova e Parco Sempione applica una selezione qualitativa basata sull’abbigliamento, sull’età minima prevista dalla serata e sul comportamento tenuto in fila. Per gli uomini è sempre consigliata una camicia ben stirata o un capo sartoriale curato, pantaloni lunghi e calzature eleganti o sneaker pulite dal taglio minimale, evitando tute sportive, cappellini, borselli a tracolla, maglie con loghi appariscenti o pantaloncini corti. Per le donne sono apprezzati abiti da sera, completi eleganti o outfit ricercati in linea con il contesto del locale.',
    'Anche la gestione degli orari incide direttamente sulla riuscita dell’ingresso. Durante l’aperitivo milanese la fascia ideale di arrivo si colloca tra le 19:00 e le 20:30, momento in cui le cucine e i cocktail bar lavorano a pieno regime e l’accesso in lista scorre rapidamente. Per la seconda serata nei club, presentarsi tra le 23:15 e le 00:15 riduce drasticamente i tempi di attesa rispetto al picco dell’una di notte, quando l’afflusso contemporaneo dei gruppi senza prenotazione rallenta inevitabilmente i varchi di sicurezza.',
    'Un altro aspetto pratico riguarda la composizione del gruppo: i club con selezione più rigorosa favoriscono gruppi misti ed equilibrati rispetto a comitive numerose composte esclusivamente da soli uomini, specialmente in assenza di una prenotazione tavolo confermata. Verificare in anticipo l’età minima richiesta, che in diversi club del venerdì e del sabato passa da 18+ a 21+ o 23+, permette di scegliere sempre il format più adatto alla propria compagnia.',
  ],
  [
    'La geografia notturna di Milano si sviluppa attorno a poli urbani ben collegati tra loro ma caratterizzati da atmosfere profondamente diverse. Il quadrante di Corso Como, Porta Garibaldi e Porta Nuova costituisce il cuore storico e contemporaneo del clubbing fashion: all’ombra dei grattacieli di Piazza Gae Aulenti si concentrano discoteche iconiche, lounge bar d’hotel cinque stelle e cocktail bar frequentati da professionisti, modelli e pubblico internazionale. A pochi minuti a piedi, il quartiere di Brera e l’area del Centro Storico attorno al Duomo offrono indirizzi raffinati per il pre-serata, enoteche storiche e club raccolti dove il design degli interni si sposa con una selezione musicale ricercata.',
    'Spostandosi verso sud, i Navigli, la Darsena e il distretto di Tortona e Porta Genova rappresentano il punto di riferimento per chi ama iniziare la serata lungo i canali tra cocktail bar d’autore, birrerie artigianali, spazi culturali e club con musica dal vivo o elettronica. A ovest del centro, l’Arco della Pace e il Parco Sempione ospitano grandi strutture immerse nel verde e terrazze spettacolari, ideali sia nella stagione estiva sia nei mesi invernali grazie alle sale interne climatizzate. A nord e a est, il quartiere Isola, Porta Venezia e Porta Romana propongono un mix vivace di club underground, listening bar, locali LGBTQ+ friendly e spazi ibridi ricavati da ex stabilimenti industriali.',
    'Completano la mappa cittadina i poli dedicati ai grandi eventi e ai concerti, come l’area di Via Valtellina e Scalo Farini a nord, Via Mecenate e Rubattino a est, l’Idroscalo per i festival all’aperto nella bella stagione e il quadrante di San Siro e CityLife per gli appuntamenti legati ai grandi show negli stadi e nei palazzetti. Ogni scheda di quartiere sul nostro portale illustra collegamenti notturni, radiotaxi e locali attivi sera per sera.',
  ],
  [
    'L’attrattiva della vita notturna milanese si estende ben oltre i confini comunali, servendo quotidianamente un bacino metropolitano e regionale che comprende tutti i comuni della prima e della seconda cintura e le province della Lombardia. Dalla fascia nord dell’hinterland, comuni ad alta densità come Sesto San Giovanni, Cinisello Balsamo, Cologno Monzese, Bresso, Cormano, Cusano Milanino, Paderno Dugnano e Bollate sono collegati in pochi minuti alle zone di Garibaldi, Isola e Bicocca, oltre a ospitare direttamente storici club live, arene estive e discoteche multisala. A ovest e a sud, i poli di Rho Fiera, Pero, Settimo Milanese, Cornaredo, Corsico, Buccinasco, Assago, Rozzano, Opera, San Donato Milanese, San Giuliano Milanese, Peschiera Borromeo, Segrate e Pioltello garantiscono connessioni rapide tramite tangenziali, passante ferroviario e linee metropolitane verso i Navigli, Porta Romana e l’Idroscalo.',
    'Un ruolo di primo piano spetta alla provincia di Monza e della Brianza, dove città e comuni come Monza, Lissone, Desio, Seregno, Cesano Maderno, Limbiate, Brugherio, Vimercate, Muggiò, Giussano, Carate Brianza, Meda, Nova Milanese, Concorezzo, Agrate Brianza e Mezzago vantano sia una tradizione radicata di club, lounge bar e circoli musicali sia un flusso continuo di appassionati diretti verso i locali del centro di Milano nel fine settimana. Allo stesso modo, lungo l’asse dell’Adda e della Martesana, centri come Trezzo sull’Adda, Cassano d’Adda, Gorgonzola, Cernusco sul Naviglio e Melzo rappresentano snodi strategici tra l’area milanese e la bergamasca.',
    'A livello regionale, il nostro servizio di informazione e prenotazione copre le esigenze di chi parte dalle province di Bergamo, Brescia, Como, Varese (con Busto Arsizio, Gallarate, Legnano e Saronno), Pavia (con Vigevano e Voghera), Lodi, Lecco, Cremona, Mantova e Sondrio. Per chi raggiunge Milano in auto o in treno da queste città, forniamo indicazioni puntuali sulle uscite autostradali A1, A4, A7, A8 e A9, sui parcheggi multipiano aperti 24 ore su 24 vicino alle zone ZTL e sulle soluzioni migliori per prenotare tavolo o ingresso con largo anticipo.',
  ],
];

const ENGLISH_SECTIONS_TEXT: readonly [
  readonly [string, string, string],
  readonly [string, string, string],
  readonly [string, string, string],
  readonly [string, string, string],
  readonly [string, string, string],
] = [
  [
    'Planning a night out in Milan requires a clear understanding of how the city nightlife landscape is structured across historic fashion clubs, industrial warehouses for live concerts and electronic music, panoramic rooftop lounges, and dedicated dinner show venues. Every district in Milan operates on distinct schedules, crowd profiles, and entry standards: visitors looking for a refined setting with strict door selection gravitate toward Corso Como, Porta Nuova, Brera, and Parco Sempione, while guests seeking large-capacity dancefloors with high-output sound systems and international headliners head to Mecenate, Rubattino, Bovisa, and the wider metropolitan ring. Reviewing each venue profile ahead of time allows you to check capacity, weekly musical programming, indoor rooms or summer gardens, and access methods ranging from advance tickets and guest lists to reserved VIP tables.',
    'Selecting the right musical format is equally important to avoid unnecessary travel across town on a Friday or Saturday night. Nights dedicated to house, afro house, tech house, and melodic techno regularly anchor central clubs and post-industrial lofts along the railway belt, whereas hip hop, reggaeton, urban, and R&B nights attract an international crowd in Garibaldi, Moscova, and Corso Sempione. Guests who prefer an all-in-one itinerary from dinner through late-night clubbing choose Milan dinner clubs, where seated Mediterranean or fusion dining is paired with live performances and a full DJ set after midnight without ever leaving your table.',
    'Through our verified directory of Milan venues you can compare exact street addresses, nearest M1, M2, M3, M4, and M5 subway stops, guarded parking garages, and transparent price ranges. Every club and event page is continuously updated with confirmed dates from our live calendar, serving both local Milanese residents and international travelers visiting the Lombardy capital for business, trade fairs, Milan Fashion Week, Design Week, or weekend leisure.',
  ],
  [
    'Booking a VIP table at a Milan nightclub is the most reliable way to secure priority fast-track entry for your group without waiting in general admission queues, along with a dedicated seating area and table bottle service managed by the venue hospitality team. In Milan clubs, VIP table reservations operate almost universally on a minimum spend basis: an agreed minimum credit established before the event that is converted entirely into premium spirits, champagne, or large-format bottles selected from the official club menu. The exact minimum spend depends on four concrete variables: the night of the week, whether an international guest DJ is performing, the total headcount and male-to-female balance of your party, and the physical placement of the table between the main dancefloor, balcony, elevated privé, or backstage stage-side super privé.',
    'For visitors who prefer entering without a table reservation, nominal guest list accreditation offers reduced entry rates or drink-inclusive admission within a designated arrival window set by venue management, typically between 23:00 and 00:30 for late-night clubbing and between 19:30 and 21:30 for evening aperitivo sessions. Submitting accurate first names, last names, and guest counts before lists close, and arriving with a valid physical ID in an orderly group, ensures smooth check-in at the door.',
    'Our dedicated WhatsApp concierge desk at +39 351 912 7047 provides real-time floor plans, official bottle price lists, and exact guest list conditions for every scheduled night. Your group receives a transparent written quote, locks in the preferred table zone, and gets clear instructions on which host desk to reference upon arrival at the venue entrance.',
  ],
  [
    'Following the door policy and dress code standards enforced by Milan clubs is essential for a seamless entry experience. Most upscale nightclubs, panoramic rooftops, and dinner clubs in Brera, Corso Como, Porta Nuova, and Parco Sempione apply a qualitative door selection based on attire, minimum age requirements for the specific event, and conduct in the queue. For men, a crisp collared shirt or tailored jacket, full-length trousers, and dress shoes or clean minimalist leather sneakers are strongly recommended, while athletic tracksuits, baseball caps, crossbody pouches, oversized graphic logos, and shorts should be avoided. For women, evening dresses, tailored separates, or polished contemporary outfits fit the standard of Milanese venues.',
    'Arrival timing also plays a decisive role at the entrance. For the classic Milanese aperitivo, the optimal arrival window is between 19:00 and 20:30, when kitchen buffets, table platters, and cocktail stations are in full swing and guest list lines move quickly. For late-night clubbing, arriving between 23:15 and 00:15 significantly cuts waiting times compared to the peak rush between 01:00 and 01:45, when unreserved walk-in groups converge simultaneously at security checkpoints.',
    'Group composition is another practical factor to keep in mind: venues with selective door policies consistently favor mixed, balanced groups over large all-male parties, especially when arriving without a confirmed VIP table reservation. Checking the minimum age threshold in advance, which shifts from 18+ to 21+ or 23+ at several flagship Friday and Saturday club nights, ensures you pick the right venue for everyone in your party.',
  ],
  [
    'Milan nightlife geography is organized around well-connected urban districts, each offering a distinct architectural setting and crowd vibe. The Corso Como, Porta Garibaldi, and Porta Nuova quadrant serves as the historic and contemporary heart of fashion clubbing: beneath the skyline of Piazza Gae Aulenti, iconic nightclubs, five-star hotel lounges, and high-energy cocktail bars draw executives, fashion insiders, and international travelers. Just a short walk south, Brera and the Historic Center around the Duomo offer refined pre-dinner wine bars, courtyard lounges, and boutique clubs where interior design meets curated musical programming.',
    'Heading toward the southern canals, the Navigli, Darsena, Tortona, and Porta Genova districts anchor evening socializing along the waterways with craft cocktail bars, live music clubs, creative lofts, and late-night electronic venues. West of the center, Arco della Pace and Parco Sempione host landmark park venues and open-air terraces that thrive in summer and transition to heated indoor halls during autumn and winter. To the north and east, Isola, Porta Venezia, and Porta Romana deliver a vibrant mix of underground electronic rooms, listening bars, inclusive LGBTQ+ friendly clubs, and cultural spaces housed in converted industrial buildings.',
    'Rounding out the city map are the major concert and festival arenas, including Via Valtellina and Scalo Farini to the north, Via Mecenate and Rubattino on the eastern flank, Idroscalo for lakeside open-air summer festivals, and the San Siro and CityLife quadrant for stadium and arena afterparties. Every district guide on our platform details night bus connections, taxi ranks, and active venues for each night of the week.',
  ],
  [
    'The reach of Milan nightlife extends across the entire metropolitan belt and the wider Lombardy region, serving guests traveling from neighboring municipalities and provincial capitals every night of the week. Across the northern hinterland, densely populated towns such as Sesto San Giovanni, Cinisello Balsamo, Cologno Monzese, Bresso, Cormano, Cusano Milanino, Paderno Dugnano, and Bollate sit just minutes from Garibaldi, Isola, and Bicocca, while also hosting major live music clubs, summer arenas, and multi-room discotheques of their own. To the west and south, key hubs including Rho Fiera, Pero, Settimo Milanese, Cornaredo, Corsico, Buccinasco, Assago, Rozzano, Opera, San Donato Milanese, San Giuliano Milanese, Peschiera Borromeo, Segrate, and Pioltello connect directly via ring roads, commuter rail, and subway lines to Navigli, Porta Romana, and Idroscalo.',
    'The province of Monza and Brianza plays a central role in Lombardy nightlife, with cities and municipalities such as Monza, Lissone, Desio, Seregno, Cesano Maderno, Limbiate, Brugherio, Vimercate, Muggiò, Giussano, Carate Brianza, Meda, Nova Milanese, Concorezzo, Agrate Brianza, and Mezzago offering both established local clubs and a steady weekend flow of clubbers heading into central Milan. Similarly, along the Adda and Martesana corridor, towns like Trezzo sull’Adda, Cassano d’Adda, Gorgonzola, Cernusco sul Naviglio, and Melzo bridge eastern Milan with the Bergamo province.',
    'Across the broader Lombardy region, our editorial guides and WhatsApp concierge assist visitors traveling from the provinces of Bergamo, Brescia, Como, Varese (including Busto Arsizio, Gallarate, Legnano, and Saronno), Pavia (including Vigevano and Voghera), Lodi, Lecco, Cremona, Mantova, and Sondrio. Guests driving or taking high-speed and regional trains into Milan can rely on our practical directions for A1, A4, A7, A8, and A9 motorway exits, 24-hour parking structures outside Area C and ZTL camera zones, and advance table or guest list reservations.',
  ],
];

export function getSeoStandard21Copy(lang: LocaleCode): SeoStandard21Copy {
  const lp = localePrefix(lang);
  const pack = getHeaderPack(lang);
  const baseParagraphs = lang === 'it' ? ITALIAN_SECTIONS_TEXT : ENGLISH_SECTIONS_TEXT;

  const titles: readonly [string, string, string, string, string] = [
    pack.s1Title,
    pack.s2Title,
    pack.s3Title,
    pack.s4Title,
    pack.s5Title,
  ];

  const contextualPerSection: readonly (readonly SeoContextualLink[])[] = [
    [
      { href: `${lp}/clubs`, anchor: pack.anchors.clubs, summary: 'JustMe, Tocqueville 13, Alcatraz, Fabrique, The Beach, Bobino, Armani Privé, Volt, Gate, Amnesia' },
      { href: `${lp}/events`, anchor: pack.anchors.events, summary: 'Serate del venerdì, sabato, domenica e appuntamenti infrasettimanali verificati' },
      { href: `${lp}/genres`, anchor: pack.anchors.genres, summary: 'House, Tech House, Afro House, Techno, Hip Hop, Reggaeton, Commercial & Live' },
    ],
    [
      { href: `${lp}/vip-tables`, anchor: pack.anchors.vip, summary: 'Minimum spend, listino bottiglie, tavoli pista, privé e super privé' },
      { href: `${lp}/guest-lists`, anchor: pack.anchors.guestLists, summary: 'Accredito nominale, orari di ingresso agevolato e riduzione alla porta' },
      { href: `${lp}/concierge`, anchor: pack.anchors.concierge, summary: 'Supporto diretto WhatsApp +39 351 912 7047 per gruppi ed eventi privati' },
    ],
    [
      { href: `${lp}/door-policy`, anchor: pack.anchors.doorPolicy, summary: 'Consigli di abbigliamento uomo e donna, età minima e documenti richiesti' },
      { href: `${lp}/aperitivo`, anchor: pack.anchors.aperitivo, summary: 'Rooftop, terrazze panoramiche, buffet royal, cocktail bar e dinner show' },
      { href: `${lp}/faq`, anchor: pack.anchors.faq, summary: 'Risposte rapide su pagamenti, guardaroba, orari metro notturna e prenotazioni' },
    ],
    [
      { href: `${lp}/zones`, anchor: pack.anchors.zones, summary: 'Brera, Corso Como, Porta Nuova, Isola, Navigli, Arco della Pace, Porta Venezia, Porta Romana' },
      { href: `${lp}/events/tonight`, anchor: pack.anchors.tonight, summary: 'Programmazione aggiornata dei club aperti stasera a Milano' },
      { href: `${lp}/events/this-week`, anchor: pack.anchors.thisWeek, summary: 'Guida completa alle serate dal giovedì alla domenica a Milano' },
    ],
    [
      { href: `${lp}/guides`, anchor: pack.anchors.guides, summary: 'Approfondimenti su quartieri, hinterland milanese, Monza Brianza e province lombarde' },
      { href: `${lp}/milan-fashion-week`, anchor: pack.anchors.mfw, summary: 'Calendario party esclusivi, sfilate ed eventi speciali a Milano' },
      { href: `${lp}/events/best`, anchor: `${pack.anchors.events} Top`, summary: 'Selezione delle migliori serate e special guest internazionali del mese' },
    ],
  ];

  const builtSections = titles.map((h3Title, idx) => {
    const index = (idx + 1) as 1 | 2 | 3 | 4 | 5;
    const slug = slugifyHeadingForSeo(h3Title, index);
    return {
      index,
      h3Title,
      anchorId: slug,
      imageSrc: `/media-seo/0${index}/${slug}.webp`,
      imageAlt: h3Title,
      paragraphs: baseParagraphs[idx],
      contextualLinks: contextualPerSection[idx],
    } satisfies SeoSectionBlock;
  }) as unknown as readonly [
    SeoSectionBlock,
    SeoSectionBlock,
    SeoSectionBlock,
    SeoSectionBlock,
    SeoSectionBlock,
  ];

  return {
    eyebrow: pack.eyebrow,
    h2Main: pack.h2Main,
    introParagraph:
      lang === 'it'
        ? 'Questa guida di riferimento raccoglie tutte le informazioni operative, territoriali e logistiche per orientarsi tra i migliori club di Milano, i quartieri della movida, i comuni dell’area metropolitana e le province della Lombardia, con collegamenti diretti alle pagine di approfondimento e al supporto concierge.'
        : 'This comprehensive reference guide brings together operational, territorial, and logistical insights across Milan nightclubs, nightlife districts, metropolitan hinterland municipalities, and Lombardy provinces, with direct links to venue hubs and concierge assistance.',
    tocTitle: pack.tocTitle,
    tocSubtitle: pack.tocSubtitle,
    sections: builtSections,
    h2SiloTree: pack.h2SiloTree,
    siloIntro: pack.siloIntro,
    siloBranches: [
      {
        branchTitle: lang === 'it' ? 'Ramo 1 · Hub Locali, Tavoli VIP e Servizi Concierge' : 'Branch 1 · Venue Hubs, VIP Tables & Concierge Services',
        parentLink: { href: `${lp}/clubs`, label: lang === 'it' ? 'Hub Madre: Tutti i Locali e Discoteche di Milano' : 'Parent Hub: All Milan Nightclubs & Venues' },
        children: [
          { href: `${lp}/vip-tables`, label: lang === 'it' ? 'Prenotazione Tavoli VIP e Listino Bottle Service' : 'VIP Table Booking & Bottle Service Guide' },
          { href: `${lp}/guest-lists`, label: lang === 'it' ? 'Liste Ingresso e Accredito Nominale nei Club' : 'Guest Lists & Club Entry Accreditation' },
          { href: `${lp}/concierge`, label: lang === 'it' ? 'Servizio Concierge Notturno WhatsApp 7/7' : '7/7 WhatsApp Nightlife Concierge Desk' },
          { href: `${lp}/door-policy`, label: lang === 'it' ? 'Guida Dress Code e Selezione all’Ingresso' : 'Dress Code & Door Selection Policy Guide' },
          { href: `${lp}/aperitivo`, label: lang === 'it' ? 'Aperitivo Milano, Rooftop Panoramici e Dinner Show' : 'Milan Aperitivo, Panoramic Rooftops & Dinner Shows' },
          { href: `${lp}/clubs/just-me-milano`, label: 'JustMe Milano · Parco Sempione & Torre Branca' },
          { href: `${lp}/clubs/tocqueville-13`, label: 'Tocqueville 13 · Corso Como & Porta Nuova' },
          { href: `${lp}/clubs/alcatraz-milano`, label: 'Alcatraz Milano · Via Valtellina Live & Club' },
          { href: `${lp}/clubs/fabrique-milano`, label: 'Fabrique Milano · Via Fantoli Concert & Club Arena' },
          { href: `${lp}/clubs/the-beach-milano`, label: 'The Beach Club · Via Corelli Milano' },
          { href: `${lp}/clubs/bobino-milano`, label: 'Bobino Milano · Alzaia Naviglio Grande & Porta Genova' },
        ],
      },
      {
        branchTitle: lang === 'it' ? 'Ramo 2 · Hub Quartieri di Milano e Geografia Notturna' : 'Branch 2 · Milan Nightlife Districts & Urban Geography',
        parentLink: { href: `${lp}/zones`, label: lang === 'it' ? 'Hub Madre: Quartieri e Zone della Vita Notturna a Milano' : 'Parent Hub: Milan Nightlife Districts & Neighborhoods' },
        children: [
          { href: `${lp}/zones/brera`, label: lang === 'it' ? 'Quartiere Brera e Centro Storico Duomo' : 'Brera District & Duomo Historic Center' },
          { href: `${lp}/zones/corso-como`, label: lang === 'it' ? 'Corso Como, Porta Nuova e Piazza Gae Aulenti' : 'Corso Como, Porta Nuova & Piazza Gae Aulenti' },
          { href: `${lp}/zones/navigli`, label: lang === 'it' ? 'Navigli, Darsena, Tortona e Porta Genova' : 'Navigli Canals, Darsena, Tortona & Porta Genova' },
          { href: `${lp}/zones/isola`, label: lang === 'it' ? 'Quartiere Isola, Garibaldi e Scalo Farini' : 'Isola District, Garibaldi & Scalo Farini' },
          { href: `${lp}/zones/porta-venezia`, label: lang === 'it' ? 'Porta Venezia, Corso Buenos Aires e NoLo' : 'Porta Venezia, Corso Buenos Aires & NoLo' },
          { href: `${lp}/zones/arco-della-pace`, label: lang === 'it' ? 'Arco della Pace, Corso Sempione e CityLife' : 'Arco della Pace, Corso Sempione & CityLife' },
          { href: `${lp}/zones/porta-romana`, label: lang === 'it' ? 'Porta Romana, Fondazione Prada e Bocconi' : 'Porta Romana, Fondazione Prada & Bocconi' },
        ],
      },
      {
        branchTitle: lang === 'it' ? 'Ramo 3 · Hub Calendario Eventi, Generi Musicali e Guide' : 'Branch 3 · Events Calendar, Music Genres & Editorial Guides',
        parentLink: { href: `${lp}/events`, label: lang === 'it' ? 'Hub Madre: Calendario Eventi e Serate a Milano' : 'Parent Hub: Milan Nightlife Events & Parties Calendar' },
        children: [
          { href: `${lp}/events/tonight`, label: lang === 'it' ? 'Eventi e Discoteche Aperte Stasera a Milano' : 'Events & Nightclubs Open Tonight in Milan' },
          { href: `${lp}/events/this-week`, label: lang === 'it' ? 'Serate di Questa Settimana e del Weekend a Milano' : 'This Week & Weekend Parties in Milan' },
          { href: `${lp}/events/best`, label: lang === 'it' ? 'Migliori Eventi e Special Guest del Mese' : 'Best Monthly Events & International Guest DJs' },
          { href: `${lp}/events/special`, label: lang === 'it' ? 'Eventi Speciali, Halloween, Capodanno e Festival' : 'Special Events, Halloween, NYE & Festivals' },
          { href: `${lp}/milan-fashion-week`, label: lang === 'it' ? 'Party ed Eventi Ufficiali Milan Fashion Week' : 'Milan Fashion Week Parties & Special Nights' },
          { href: `${lp}/genres`, label: lang === 'it' ? 'Tutti i Generi Musicali: House, Techno, Hip Hop' : 'All Music Genres: House, Techno, Hip Hop & Urban' },
          { href: `${lp}/genres/house`, label: 'House, Tech House & Afro House Milano' },
          { href: `${lp}/genres/techno`, label: 'Techno, Melodic Techno & Industrial Milano' },
          { href: `${lp}/genres/hip-hop`, label: 'Hip Hop, Reggaeton, Urban & R&B Milano' },
          { href: `${lp}/guides`, label: lang === 'it' ? 'Guide Editoriali, Hinterland e Province Lombarde' : 'Editorial Guides, Hinterland & Lombardy Provinces' },
          { href: `${lp}/faq`, label: lang === 'it' ? 'Domande Frequenti su Tavoli, Liste e Ingressi' : 'Frequently Asked Questions on Tables & Entry' },
        ],
      },
    ],
    h2Gmb: pack.h2Gmb,
    gmb: {
      businessName: 'Nightlife Milan',
      categoryLabel:
        lang === 'it'
          ? 'Guida Ufficiale Vita Notturna, Clubbing, Eventi e Servizio Concierge Tavoli VIP a Milano'
          : 'Official Milan Nightlife Guide, Clubbing Directory, Events & VIP Table Concierge Service',
      addressLabel: lang === 'it' ? 'Area Operativa e Sede di Riferimento' : 'Operational Area & Reference Location',
      addressValue: 'Centro Storico, Corso Como, Brera, Porta Nuova & Navigli · 20121–20154 Milano (MI), Lombardia, Italia',
      coordinatesLabel: lang === 'it' ? 'Coordinate Geografiche GMB' : 'GMB Geographic Coordinates',
      coordinatesValue: '45.4642° N, 9.1900° E · Città Metropolitana di Milano (IT-MI)',
      phoneLabel: lang === 'it' ? 'Telefono e Concierge WhatsApp Diretto' : 'Direct Phone & WhatsApp Concierge',
      phoneValue: '+39 351 912 7047',
      emailLabel: lang === 'it' ? 'Email Ufficiale Informazioni e Accrediti' : 'Official Information & Accreditation Email',
      emailValue: 'concierge@nightlifemilan.com',
      hoursLabel: lang === 'it' ? 'Orari Operativi Desk Concierge' : 'Concierge Desk Operating Hours',
      hoursValue:
        lang === 'it'
          ? 'Lunedì – Domenica: 18:00 – 05:00 CET (Assistenza continua 7 giorni su 7 per serate, liste e tavoli)'
          : 'Monday – Sunday: 18:00 – 05:00 CET (7-days-a-week assistance for events, guest lists and VIP tables)',
      mapsCtaLabel: pack.mapsCtaLabel,
      whatsappCtaLabel: pack.whatsappCtaLabel,
    },
    zonesHeading: pack.zonesHeading,
    zonesList: [
      { name: 'Brera & Pinacoteca', href: `${lp}/zones/brera`, detail: 'Cocktail bar d’autore, lounge club e pre-serata nel cuore storico (CAP 20121)' },
      { name: 'Corso Como & Porta Garibaldi', href: `${lp}/zones/corso-como`, detail: 'Distretto iconico delle discoteche fashion, tavoli VIP e movida internazionale (CAP 20154)' },
      { name: 'Porta Nuova & Piazza Gae Aulenti', href: `${lp}/zones/corso-como`, detail: 'Rooftop panoramici, dinner show e club ai piedi dei grattacieli (CAP 20124)' },
      { name: 'Isola & Scalo Farini', href: `${lp}/zones/isola`, detail: 'Jazz club storici, spazi post-industriali, live music e club elettronici (CAP 20159)' },
      { name: 'Navigli, Darsena & Porta Genova', href: `${lp}/zones/navigli`, detail: 'Aperitivo lungo i canali, cocktail bar, club sul Naviglio Grande e Pavese (CAP 20143–20144)' },
      { name: 'Arco della Pace & Parco Sempione', href: `${lp}/zones/arco-della-pace`, detail: 'Grandi club nel parco, terrazze estive e lounge di Corso Sempione (CAP 20145–20154)' },
      { name: 'Porta Venezia, Buenos Aires & NoLo', href: `${lp}/zones/porta-venezia`, detail: 'Listening bar, club LGBTQ+ friendly e vita notturna creativa (CAP 20129–20131)' },
      { name: 'Porta Romana, Bocconi & Fondazione Prada', href: `${lp}/zones/porta-romana`, detail: 'Club universitari, spazi culturali, enoteche e loft eventi (CAP 20135–20136)' },
      { name: 'Tortona, Savona & Solari', detail: 'Showroom, afterparty della Design e Fashion Week e lounge bar (CAP 20144)' },
      { name: 'Duomo, Galleria & Cinque Vie', detail: 'Terrazze vista guglie, hotel bar cinque stelle e club esclusivi del centro (CAP 20121–20123)' },
      { name: 'CityLife, Tre Torri & Fiera', detail: 'Lounge contemporanei, eventi aziendali e collegamenti diretti M5 (CAP 20145)' },
      { name: 'San Siro, De Angeli & Wagner', detail: 'Grandi concerti allo stadio, aftershow e locali dell’area ovest (CAP 20146–20151)' },
      { name: 'Mecenate, Rubattino & Lambrate', detail: 'Arene per concerti, superclub techno/house e spazi industriali est (CAP 20134–20138)' },
      { name: 'Città Studi, Piola & Ortica', detail: 'Circoli storici, balere contemporanee, live club e serate universitarie (CAP 20133)' },
      { name: 'Bicocca, Greco & Viale Monza', detail: 'Polo universitario nord, teatri, club musicali e birrerie (CAP 20125–20126)' },
      { name: 'Idroscalo, Linate & Corelli', detail: 'Summer club all’aperto, beach club, festival elettronici e giardini estivi (CAP 20054–20134)' },
    ],
    citiesHeading: pack.citiesHeading,
    citiesList: [
      { name: 'Sesto San Giovanni & Cinisello Balsamo', detail: 'Cintura Nord Milano · Carroponte, club live, discoteche multisala e collegamento diretto M1/M5' },
      { name: 'Monza, Lissone, Desio & Seregno', detail: 'Provincia di Monza e Brianza (MB) · Club storici della Brianza, lounge bar e arteria SS36 per Milano' },
      { name: 'Carate Brianza, Mezzago, Cesano Maderno & Vimercate', detail: 'Alta e Est Brianza · Circoli live, discoteche del weekend e connessioni rapide verso Milano Nord' },
      { name: 'Rho Fiera, Pero, Bollate & Paderno Dugnano', detail: 'Quadrante Nord-Ovest · Polo fieristico internazionale MIND/Rho, afterparty espositivi e asse A4/A8' },
      { name: 'Assago, Rozzano, Corsico & Buccinasco', detail: 'Quadrante Sud-Ovest · Unipol Forum Assago concerti, club lungo il Naviglio Grande e collegamento M2' },
      { name: 'San Donato Milanese, San Giuliano, Opera & Melegnano', detail: 'Quadrante Sud-Est · Porta d’accesso lungo l’autostrada A1 e linea M3 verso Porta Romana e Centro' },
      { name: 'Segrate, Pioltello, Cernusco sul Naviglio & Cologno Monzese', detail: 'Martesana ed Est Milano · Idroscalo, passante ferroviario e linea M2 per i locali di Milano Est' },
      { name: 'Trezzo sull’Adda, Cassano d’Adda, Gorgonzola & Melzo', detail: 'Asse Adda e A4 · Live club di riferimento regionale e cerniera tra Milano e Bergamo' },
      { name: 'Legnano, Busto Arsizio, Gallarate & Saronno', detail: 'Asse Sempione e Malpensa · Bacino dell’Alto Milanese e bassa provincia di Varese lungo l’A8' },
      { name: 'Bergamo e Provincia (BG)', detail: 'Lombardia Orientale · Collegamento diretto A4 e treni regionali per i grandi eventi e club di Milano' },
      { name: 'Brescia e Provincia (BS)', detail: 'Lombardia Orientale e Garda · Connessione alta velocità e autostrada A4 per weekend e serate VIP' },
      { name: 'Como, Cantù e Lago di Como (CO)', detail: 'Lombardia Nord · Asse A9 e Ferrovie Nord verso Cadorna, Brera, Corso Como e Parco Sempione' },
      { name: 'Varese e Lago Maggiore (VA)', detail: 'Lombardia Nord-Ovest · Collegamento rapido con l’area Sempione, CityLife e Porta Garibaldi' },
      { name: 'Pavia, Vigevano e Lomellina (PV)', detail: 'Lombardia Sud · Connessione diretta tramite A7 e passante S13 verso i Navigli e Porta Genova' },
      { name: 'Lodi, Lecco, Cremona, Mantova e Sondrio', detail: 'Copertura Regionale Lombardia · Informazioni trasporti, parcheggi 24h e prenotazione anticipata tavoli' },
    ],
    servicesHeading: pack.servicesHeading,
    servicesList: [
      { name: lang === 'it' ? 'Prenotazione Tavoli VIP, Privé e Super Privé' : 'VIP Table, Privé & Stage-Side Super Privé Booking', href: `${lp}/vip-tables`, detail: 'Gestione diretta delle prenotazioni tavolo con planimetrie ufficiali, conferma scritta e accoglienza dedicata.' },
      { name: lang === 'it' ? 'Listino Bottiglie e Consulenza Minimum Spend' : 'Official Bottle Menus & Minimum Spend Advisory', href: `${lp}/vip-tables`, detail: 'Trasparenza completa sui crediti minimi di spesa per pista, balconata e aree riservate nei club.' },
      { name: lang === 'it' ? 'Accredito in Lista Ingresso e Riduzioni' : 'Nominal Guest List Accreditation & Entry Perks', href: `${lp}/guest-lists`, detail: 'Inserimento in lista nominale per aperitivi e serate club con indicazioni sugli orari di validità.' },
      { name: lang === 'it' ? 'Calendario Serate in Tempo Reale (Stasera e Weekend)' : 'Real-Time Nightlife Calendar (Tonight & Weekend)', href: `${lp}/events`, detail: 'Programmazione verificata giorno per giorno con filtri per quartiere, locale e genere musicale.' },
      { name: lang === 'it' ? 'Guida Aperitivo Milanese, Rooftop e Dinner Show' : 'Milanese Aperitivo, Rooftops & Dinner Show Guide', href: `${lp}/aperitivo`, detail: 'Selezione delle migliori terrazze panoramiche e ristoranti con spettacolo e DJ set post-cena.' },
      { name: lang === 'it' ? 'Assistenza Dress Code, Età Minima e Selezione' : 'Dress Code, Age Policy & Door Selection Guidance', href: `${lp}/door-policy`, detail: 'Indicazioni pratiche su abbigliamento richiesto, composizione del gruppo e documenti d’identità.' },
      { name: lang === 'it' ? 'Eventi Speciali: Fashion Week, Design Week e Capodanno' : 'Special Events: Fashion Week, Design Week & NYE', href: `${lp}/milan-fashion-week`, detail: 'Accesso ai party più richiesti durante le settimane internazionali della moda e del design a Milano.' },
      { name: lang === 'it' ? 'Concierge WhatsApp Dedicato per Gruppi e Feste Private' : 'Dedicated WhatsApp Concierge for Groups & Private Parties', href: `${lp}/concierge`, detail: 'Supporto umano rapido al +39 351 912 7047 per compleanni, lauree, eventi aziendali e gruppi internazionali.' },
    ],
  };
}
