import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from './repvblic35';

const STK_MENU_IT: CapodannoMenuCard[] = [
  {
    id: 'stk-milan-nye-2027-alacarte',
    title: 'STK Milan · Menù Speciale À la Carte di Capodanno 2027',
    price: 'Min. spend 200€ (2° turno)',
    subtitle: '1° Turno 19:00–21:00 (senza minimo di spesa, tavolo libero entro 20:45) · 2° Turno dalle 21:00 (minimo di spesa 200€ a persona + DJ set live)',
    courses: [
      {
        course: 'Starters',
        dish: 'Wagyu Tacos 33€ · Wagyu Lil’ Brgs 33€ · Wagyu alla Pizzaiola 42€ · Wagyu Tartare 34€ · Gamberi e Caviale 42€ · Ostriche 6/12 pz 30€/60€ · Lobster Caesar Salad (mezzo astice) 34€ · Carciofi, Asparagi e Pecorino al tartufo nero 30€',
      },
      {
        course: 'Mains',
        dish: 'Black Cod miso e pak choi 49€ · Aragostelle alla Catalana 52€ · Lasagna Funghi e Tartufo nero 38€ · Guancia di Manzo con purè e chimichurri 42€ · Suprema di Pollo con foie gras e tartufo nero 46€',
      },
      {
        course: 'Grill USDA, Japanese Wagyu & Surf & Turf',
        dish: 'USDA Filet 200g 65€ · USDA Ribeye 350g 75€ · USDA Tomahawk 1,2kg 150€ · Japanese Wagyu Sirloin 200g 120€ · Japanese Wagyu Filet 200g 140€ · Japanese Wagyu Ribeye 300g 160€ · Filet & Lobster Tail 85€ · Filet & Prawns 75€ · Japanese Wagyu Fillet & King Crab 180€',
      },
      {
        course: 'Sides, Mac & Cheese & Desserts',
        dish: 'Sides 12€ cad. (Funghi arrostiti, Patate fritte tartufo e grana, Spinaci mantecati, Purè con guanciale, Lenticchie) · Mac & Cheese (Tradizionale 12€, Pancetta 16€, Tartufo 20€) · Desserts 16€ cad. (Panettone allo zabaione, NY Cheesecake, Chocolate Cake)',
      },
    ],
    beverages: 'Toppings (10–15€), Butters (8€), Sauces (3€). Nel secondo turno dalle 21:00 il minimo di spesa di 200€ a persona è utilizzabile interamente per food e beverage. Tutti i prezzi del menù sono comprensivi di IVA.',
  },
];

const STK_MENU_EN: CapodannoMenuCard[] = [
  {
    id: 'stk-milan-nye-2027-alacarte',
    title: 'STK Milan · Special NYE 2027 À la Carte Menu',
    price: '€200 min. spend (2nd seating)',
    subtitle: '1st Seating 19:00–21:00 (no minimum spend, table vacated by 20:45) · 2nd Seating from 21:00 (€200 per person minimum spend + live DJ set)',
    courses: [
      {
        course: 'Starters',
        dish: 'Wagyu Tacos €33 · Wagyu Lil’ Brgs €33 · Wagyu alla Pizzaiola €42 · Wagyu Tartare €34 · Shrimps & Caviar €42 · Oysters 6/12 pc €30/€60 · Lobster Caesar Salad (half lobster) €34 · Roasted Artichokes, Asparagus & Pecorino with Black Truffle €30',
      },
      {
        course: 'Mains',
        dish: 'Black Cod with miso & pak choi €49 · Baby Rock Lobster Catalana Style €52 · Mushrooms & Black Truffle Lasagna €38 · Beef Cheek with mashed potatoes & chimichurri €42 · Chicken Supreme with foie gras & black truffle €46',
      },
      {
        course: 'USDA Grill, Japanese Wagyu & Surf & Turf',
        dish: 'USDA Filet 200g €65 · USDA Ribeye 350g €75 · USDA Tomahawk 1.2kg €150 · Japanese Wagyu Sirloin 200g €120 · Japanese Wagyu Filet 200g €140 · Japanese Wagyu Ribeye 300g €160 · Filet & Lobster Tail €85 · Filet & Prawns €75 · Japanese Wagyu Fillet & King Crab €180',
      },
      {
        course: 'Sides, Mac & Cheese & Desserts',
        dish: 'Sides €12 each (Roasted Mushrooms, Grana & Truffle Fries, Creamed Spinach, Bacon Mashed Potatoes, Lentils) · Mac & Cheese (Classic €12, Bacon €16, Truffle €20) · Desserts €16 each (Panettone with zabaione ice cream, NY Cheesecake, Chocolate Cake)',
      },
    ],
    beverages: 'Toppings (€10–€15), Butters (€8), Sauces (€3). During the 2nd seating from 21:00, the €200 per person minimum spend applies toward food and beverage. Menu prices include VAT.',
  },
];

const RADIO_MENU_IT: CapodannoMenuCard[] = [
  {
    id: 'radio-rooftop-nye-2027-menu',
    title: 'Radio Rooftop Milan (10° Piano) · Menù Degustazione Capodanno 2027',
    price: '200€ (130€ menu + 70€ bevande)',
    subtitle: 'ME Milan Il Duca · Prenotazioni dalle 20:00 (ultima prenotazione 22:30) · DJ Set live dalle 21:00 fino a tarda notte',
    courses: [
      {
        course: 'Antipasto (a scelta)',
        dish: 'Crudo di mare (tonno rosso, salmone, ostrica, capasanta, gambero rosso) · Catalana di crostacei (scampi, mazzancolle, gamberi, astice) · Degustazione di wagyu (tataki, toast, carpaccio) · Tortino di verza con zucchine, patate, provola e porro',
      },
      {
        course: 'Primo Piatto (a scelta)',
        dish: 'Pasta mista di mare (ristretto di crostacei, pesci di scoglio, panna acida, salicornia) · Ravioli cacio e pepe con tartufo nero e crema di pecorino · Tagliolino all’anatra con frutti rossi e carpaccio d’anatra marinato',
      },
      {
        course: 'Secondo Piatto (a scelta)',
        dish: 'Filetto Rossini con foie gras, patate novelle e salsa al vino · Ricciola scottata con baby ortaggi e bernese di mare · Uovo 64° e tartufo con patate, cipolle confit e crema di grana',
      },
      {
        course: 'Dolci da Condividere & Rito di Mezzanotte',
        dish: 'Mini panettone con crema al mascarpone · Fruttini e sorbetti · Rito di mezzanotte: lenticchie e cotechino',
      },
    ],
    beverages: 'Formula Food & Beverage: minimo di spesa 200€ a persona (130€ menù degustazione + 70€ di credito beverage). Disponibile anche Formula Solo Beverage con intero minimo di spesa di 200€ a persona dedicato alle bevande.',
  },
];

const RADIO_MENU_EN: CapodannoMenuCard[] = [
  {
    id: 'radio-rooftop-nye-2027-menu',
    title: 'Radio Rooftop Milan (10th Floor) · NYE 2027 Tasting Menu',
    price: '€200 (€130 menu + €70 beverage)',
    subtitle: 'ME Milan Il Duca · Bookings from 20:00 (last seating 22:30) · Live DJ set from 21:00 until late',
    courses: [
      {
        course: 'Starter (your choice)',
        dish: 'Raw seafood selection (red tuna, salmon, oyster, scallop, red prawns) · Catalan-style shellfish salad (langoustines, king prawns, shrimps, lobster) · Wagyu tasting selection (tataki, toast, carpaccio) · Savoy cabbage flan with courgettes, potatoes, provola and leek',
      },
      {
        course: 'First Course (your choice)',
        dish: 'Mixed pasta with seafood (shellfish reduction, rockfish, sour cream, samphire) · Cacio e pepe ravioli with black truffle and pecorino cream · Duck ragù tagliolini with red berries and marinated duck carpaccio',
      },
      {
        course: 'Main Course (your choice)',
        dish: 'Rossini beef fillet with foie gras, new potatoes and wine sauce · Seared amberjack with baby vegetables and seafood béarnaise · 64°C egg and truffle with confit potatoes, onions and Grana cream',
      },
      {
        course: 'Desserts to Share & Midnight Ritual',
        dish: 'Mini panettone with mascarpone cream · Fruit sorbets · Midnight Ritual: lentils and cotechino',
      },
    ],
    beverages: 'Food & Beverage Formula: €200 minimum spend per person (€130 tasting menu + €70 beverage credit). Beverage-Only Formula also available using the full €200 minimum spend for drinks.',
  },
];

const BARCHETTA_MENU_IT: CapodannoMenuCard[] = [
  {
    id: 'barchetta-como-nye-2027',
    title: 'Hotel Barchetta Excelsior Como · Cenone di San Silvestro al Ristorante Bistro',
    price: '175€',
    subtitle: '31 dicembre 2026 · Piazza Cavour 1, Como · Cena conclusa prima della mezzanotte per i fuochi sul lungolago',
    courses: [
      {
        course: 'Aperitivo di Benvenuto',
        dish: 'Ostrica al vapore con salsa olandese · Salmone affumicato con panna acida ed erba cipollina · Spiedino di lemon grass ai gamberoni speziati · Canapè di prosciutto d’oca e composta di fichi · Piccolo croissant salato con caprino, miele e tartufo',
      },
      {
        course: 'Antipasti',
        dish: 'Capesante fritte ai semi di sesamo, crema di cavolfiore, alghe croccanti e salsa ponzu · Petto d’anatra affumicato agli aromi invernali, sedano rapa, mela verde e riduzione all’arancia',
      },
      {
        course: 'Primo & Secondo Piatto',
        dish: 'Risotto Carnaroli alle spugnole, tartare di scampi e limone · Filetto di vitello arrostito al pimentón, purea di zucca e carciofi fritti',
      },
      {
        course: 'Dessert',
        dish: 'Semifreddo ai pistacchi, cuore al mandarino, crumble ai cantucci e riduzione di Vin Santo',
      },
    ],
    beverages: 'Abbinamento vini e bevande incluse: Franciacorta Brut DOCG Ferghettina, Sassella Riserva DOCG Plozza, Torcolato Maculan. Bambini 0–4 anni a consumo, 5–12 anni sconto 50% (87,50€), oltre 12 anni tariffa intera.',
  },
];

const BARCHETTA_MENU_EN: CapodannoMenuCard[] = [
  {
    id: 'barchetta-como-nye-2027',
    title: 'Hotel Barchetta Excelsior Como · New Year’s Eve Gala Dinner at Ristorante Bistro',
    price: '€175',
    subtitle: 'December 31, 2026 · Piazza Cavour 1, Como · Dinner finishes before midnight to watch lakefront fireworks',
    courses: [
      {
        course: 'Welcome Aperitif',
        dish: 'Steamed oyster with hollandaise sauce · Smoked salmon with sour cream and chives · Lemongrass skewer with spiced king prawns · Goose ham canapé with fig compote · Mini savory croissant with goat cheese, honey and truffle',
      },
      {
        course: 'Starters',
        dish: 'Sesame-crusted scallops with cauliflower cream, crispy seaweed and ponzu sauce · Winter-spiced smoked duck breast with celeriac, green apple and orange reduction',
      },
      {
        course: 'First & Main Course',
        dish: 'Carnaroli risotto with morel mushrooms, langoustine tartare and lemon · Pimentón-roasted veal fillet with pumpkin purée and fried artichokes',
      },
      {
        course: 'Dessert',
        dish: 'Pistachio semifreddo with mandarin heart, cantucci crumble and Vin Santo reduction',
      },
    ],
    beverages: 'Wine pairing and beverages included: Franciacorta Brut DOCG Ferghettina, Sassella Riserva DOCG Plozza, Torcolato Maculan. Children 0–4 à la carte, ages 5–12 50% discount (€87.50), 13+ full adult rate.',
  },
];

const TERMINUS_MENU_IT: CapodannoMenuCard[] = [
  {
    id: 'terminus-como-nye-2027',
    title: 'Albergo Terminus Como · Menù di San Silvestro al Bar delle Terme',
    price: '240€',
    subtitle: '31 dicembre 2026 · Lungo Lario Trieste 14, Como · Musica dal vivo e fuochi d’artificio a mezzanotte dalla terrazza',
    courses: [
      {
        course: 'Il Benvenuto dello Chef',
        dish: 'Gambero in pasta kataifi · Brisée al sesamo con vitello e salsa tonnata · Cheesecake salata alla robiola e cipolla rossa caramellata · Crocchetta di patate, baccalà ed erba cipollina · Vol-au-vent con zucca, noci e gorgonzola',
      },
      {
        course: 'Antipasti',
        dish: 'Tortino ai funghi porcini con salsa al Parmigiano · Capasanta scottata con zucca, nocciole tostate e maionese al dragoncello',
      },
      {
        course: 'Primo & Secondo Piatto',
        dish: 'Millefoglie di pasta fresca con carciofi al timo e Bitto della Valtellina · Rana pescatrice con crema di porri e chips di topinambur',
      },
      {
        course: 'Dessert & Mezzanotte',
        dish: 'Semifreddo al torrone con salsa al cioccolato fondente · Zampone con lenticchie',
      },
    ],
    beverages: 'Abbinamento vini incluso: Ca’ del Bosco s.a., Lis Neris Pinot Grigio 2025, Terlano Sauvignon Blanc Winkl 2025, Donnafugata Passito di Pantelleria Ben Ryé 2023. Musica dal vivo e vista fuochi sul Lago di Como dalla terrazza.',
  },
];

const TERMINUS_MENU_EN: CapodannoMenuCard[] = [
  {
    id: 'terminus-como-nye-2027',
    title: 'Albergo Terminus Como · New Year’s Eve Menu at Bar delle Terme',
    price: '€240',
    subtitle: 'December 31, 2026 · Lungo Lario Trieste 14, Como · Live music and midnight fireworks from the lakefront terrace',
    courses: [
      {
        course: 'Chef’s Welcome',
        dish: 'Prawn in kataifi pastry · Sesame brisée with veal and tuna sauce · Savory robiola cheesecake with caramelized red onion · Potato, salted cod and chive croquette · Pumpkin, walnut and gorgonzola vol-au-vent',
      },
      {
        course: 'Starters',
        dish: 'Porcini mushroom flan with Parmigiano sauce · Seared scallop with pumpkin, toasted hazelnuts and tarragon mayonnaise',
      },
      {
        course: 'First & Main Course',
        dish: 'Fresh pasta mille-feuille with thyme artichokes and Valtellina Bitto cheese · Monkfish with leek cream and Jerusalem artichoke chips',
      },
      {
        course: 'Dessert & Midnight',
        dish: 'Nougat semifreddo with dark chocolate sauce · Traditional zampone with lentils',
      },
    ],
    beverages: 'Wine pairing included: Ca’ del Bosco s.a., Lis Neris Pinot Grigio 2025, Terlano Sauvignon Blanc Winkl 2025, Donnafugata Passito di Pantelleria Ben Ryé 2023. Live music and midnight lake fireworks from the terrace.',
  },
];

const CLOSED_VENUE_META: Record<
  string,
  {
    name: string;
    city: string;
    address: string;
    reasonIt: string;
    reasonEn: string;
    alternatives: string[];
  }
> = {
  'capodanno-fabrique-milano': {
    name: 'Fabrique Milano',
    city: 'Milano',
    address: 'Via Gaudenzio Fantoli 9, 20138 Milano',
    reasonIt: 'Fabrique Milano ha confermato ufficialmente che la venue non organizza la serata di Capodanno il 31 dicembre 2026.',
    reasonEn: 'Fabrique Milan has officially confirmed that the venue is not hosting a New Year’s Eve event on December 31, 2026.',
    alternatives: ['capodanno-alcatraz-milano', 'capodanno-magazzini-generali-milano', 'capodanno-gate-milano'],
  },
  'capodanno-base-milano-tortona': {
    name: 'BASE Milano',
    city: 'Milano',
    address: 'Via Bergognone 34, 20144 Milano',
    reasonIt: 'BASE Milano osserva chiusura ufficiale festiva dal 23 dicembre 2026 al 6 gennaio 2027 inclusi. Nessun evento è previsto per Capodanno.',
    reasonEn: 'BASE Milan is officially closed for the holiday break from December 23, 2026 through January 6, 2027 inclusive. No New Year’s Eve event is scheduled.',
    alternatives: ['capodanno-bobino-milano', 'capodanno-bischeri-milano', 'capodanno-repvblic-milano'],
  },
  'capodanno-live-club-trezzo-milano': {
    name: 'Live Music Club Trezzo sull’Adda',
    city: 'Trezzo sull’Adda',
    address: 'Via Giuseppe Mazzini 58, 20056 Trezzo sull’Adda (MI)',
    reasonIt: 'Live Music Club Trezzo sull’Adda ha confermato ufficialmente che il locale rimane chiuso a Capodanno (31 dicembre 2026).',
    reasonEn: 'Live Music Club Trezzo sull’Adda has officially confirmed that the venue is closed for New Year’s Eve (December 31, 2026).',
    alternatives: ['capodanno-alcatraz-milano', 'capodanno-magazzini-generali-milano', 'capodanno-bergamo-setai-club-bobadilla'],
  },
  'capodanno-bloom-mezzago-brianza': {
    name: 'Bloom Mezzago',
    city: 'Mezzago',
    address: 'Via Eugenio Curiel 39, 20883 Mezzago (MB)',
    reasonIt: 'Bloom Mezzago ha confermato ufficialmente che il locale rimane chiuso a Capodanno (31 dicembre 2026).',
    reasonEn: 'Bloom Mezzago has officially confirmed that the venue is closed for New Year’s Eve (December 31, 2026).',
    alternatives: ['capodanno-tempio-del-futuro-perduto', 'capodanno-black-hole-milano', 'capodanno-alcatraz-milano'],
  },
  'capodanno-hotel-principe-di-savoia-milano': {
    name: 'Hotel Principe di Savoia Milano',
    city: 'Milano',
    address: 'Piazza della Repubblica 17, 20124 Milano',
    reasonIt: 'L’Hotel Principe di Savoia sospende l’attività per lavori di restauro a partire dal 28 dicembre 2026 e non è aperto per Capodanno 2027.',
    reasonEn: 'Hotel Principe di Savoia suspends operations for a comprehensive restoration starting December 28, 2026 and is closed for New Year’s Eve 2027.',
    alternatives: ['capodanno-terrazza-duomo-21', 'capodanno-stk-milan', 'capodanno-radio-rooftop-milano'],
  },
  'capodanno-spirit-de-milan': {
    name: 'Spirit de Milan',
    city: 'Milano',
    address: 'Via Bovisasca 59, 20157 Milano',
    reasonIt: 'La sede storica di Spirit de Milan nelle ex Cristallerie Livellara ha chiuso a giugno 2026 e non prevede alcun evento di Capodanno 2027.',
    reasonEn: 'Spirit de Milan’s historic venue at the former Cristallerie Livellara closed in June 2026 and is not hosting a New Year’s Eve 2027 event.',
    alternatives: ['capodanno-blue-note-milano-concerto-gospel-jazz', 'capodanno-bobino-milano', 'capodanno-bischeri-milano'],
  },
  'capodanno-molto-club-milano': {
    name: 'Molto Club',
    city: 'Carate Brianza',
    address: 'Via della Valle 71, 20841 Carate Brianza (MB)',
    reasonIt: 'Molto Club è un locale esclusivamente estivo all’aperto (maggio–settembre) ed è chiuso durante la stagione invernale e a Capodanno.',
    reasonEn: 'Molto Club is a seasonal open-air summer venue (May–September) and remains closed throughout winter and New Year’s Eve.',
    alternatives: ['capodanno-pineta-milano', 'capodanno-justme-milano-torre-branca', 'capodanno-the-club-milano'],
  },
  'capodanno-battello-navigli-darsena-milano': {
    name: 'Battello sui Navigli (Navigami)',
    city: 'Milano',
    address: 'Alzaia Naviglio Grande 4 / Darsena, 20144 Milano',
    reasonIt: 'La navigazione turistica sui Navigli (Navigami) non organizza feste o cenoni di Capodanno a bordo la notte del 31 dicembre 2026.',
    reasonEn: 'Navigli boat tour operator Navigami does not host New Year’s Eve gala dinners or countdown cruises on December 31, 2026.',
    alternatives: ['capodanno-bischeri-milano', 'capodanno-bobino-milano', 'capodanno-tram-storico-milano-atmosfera'],
  },
};

export const T031_CLOSED_SLUGS = new Set<string>([
  'capodanno-ceresio-7-milano',
  ...Object.keys(CLOSED_VENUE_META),
]);

const CLOSED_LABELS_BY_LOCALE: Partial<
  Record<LocaleCode, { closedTag: string; bannerPrefix: string; altHeading: string; altSub: string }>
> = {
  it: {
    closedTag: 'Chiuso a Capodanno 2027',
    bannerPrefix: 'CHIUSURA UFFICIALE CAPODANNO 2027 · 31 DICEMBRE 2026',
    altHeading: 'Alternative Aperte e Confermate per Capodanno 2027',
    altSub: 'Scopri qui sotto le migliori location aperte e prenotabili per la notte del 31 dicembre 2026:',
  },
  en: {
    closedTag: 'Closed for NYE 2027',
    bannerPrefix: 'OFFICIAL NYE 2027 CLOSURE · DECEMBER 31, 2026',
    altHeading: 'Confirmed Open Alternatives for NYE 2027',
    altSub: 'Explore verified Milan & Lombardy venues officially open and bookable for December 31, 2026:',
  },
  es: {
    closedTag: 'Cerrado en Nochevieja 2027',
    bannerPrefix: 'CIERRE OFICIAL NOCHEVIEJA 2027 · 31 DE DICIEMBRE DE 2026',
    altHeading: 'Alternativas Abiertas y Confirmadas para Nochevieja 2027',
    altSub: 'Descubre abajo los mejores locales abiertos y reservables para el 31 de diciembre de 2026:',
  },
  fr: {
    closedTag: 'Fermé au Nouvel An 2027',
    bannerPrefix: 'FERMETURE OFFICIELLE NOUVEL AN 2027 · 31 DÉCEMBRE 2026',
    altHeading: 'Alternatives Ouvertes et Confirmées pour le Nouvel An 2027',
    altSub: 'Découvrez ci-dessous les lieux officiellement ouverts et réservables pour le 31 décembre 2026 :',
  },
  de: {
    closedTag: 'Silvester 2027 Geschlossen',
    bannerPrefix: 'OFFIZIELL GESCHLOSSEN ZU SILVESTER 2027 · 31. DEZEMBER 2026',
    altHeading: 'Bestätigte Geöffnete Alternativen für Silvester 2027',
    altSub: 'Entdecken Sie unten offiziell geöffnete und buchbare Locations für den 31. Dezember 2026:',
  },
  pt: {
    closedTag: 'Fechado no Réveillon 2027',
    bannerPrefix: 'ENCERRAMENTO OFICIAL RÉVEILLON 2027 · 31 DE DEZEMBRO DE 2026',
    altHeading: 'Alternativas Abertas e Confirmadas para o Réveillon 2027',
    altSub: 'Explore abaixo os locais oficialmente abertos e disponíveis para 31 de dezembro de 2026:',
  },
};

export function getT031OverrideContent(
  slug: string,
  locale: string,
): CapodannoLocalizedEventContent | null {
  const isIt = locale === 'it';
  const loc = locale as LocaleCode;

  if (slug === 'capodanno-stk-milan') {
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '19:00', label: 'Apertura Primo Turno · Menù speciale à la carte di Capodanno senza minimo di spesa (tavolo da liberare entro le 20:45)' },
          { time: '21:00', label: 'Inizio Secondo Turno (minimo di spesa 200€ a persona) e inizio DJ Set live' },
          { time: '22:30', label: 'Ultima fascia di prenotazione per il Secondo Turno' },
          { time: '00:00', label: 'Countdown di Mezzanotte e festa nel cuore di ME Milan Il Duca' },
        ]
      : [
          { time: '19:00', label: '1st Seating opens · Special NYE à la carte menu with no minimum spend (table to be vacated by 20:45)' },
          { time: '21:00', label: '2nd Seating begins (€200 per person minimum spend) with live DJ set' },
          { time: '22:30', label: 'Last seating reservation slot for the 2nd Seating' },
          { time: '00:00', label: 'Midnight Countdown and celebration inside ME Milan Il Duca' },
        ];

    return {
      title: isIt
        ? 'Capodanno STK Milan 2027 · Steakhouse & DJ Set al ME Milan Il Duca'
        : 'STK Milan NYE 2027 · Fine Steakhouse, Special Menu & Live DJ Set',
      subtitle: isIt
        ? 'Piazza della Repubblica 13, 20124 Milano · 1° Turno 19:00–21:00 à la carte · 2° Turno dalle 21:00 (200€ min. spend) + DJ Set'
        : 'Piazza della Repubblica 13, 20124 Milan · 1st Seating 19:00–21:00 à la carte · 2nd Seating from 21:00 (€200 min. spend) + DJ Set',
      description: isIt
        ? 'Festeggia il Capodanno 2027 da STK Milan, la celebre steakhouse contemporanea all’interno del ME Milan Il Duca in Piazza della Repubblica 13. Per la notte di giovedì 31 dicembre 2026 sono previsti due turni con uno speciale menù à la carte dedicato (Wagyu giapponese, tagli USDA Prime, ostriche, astice alla catalana e tartufo nero): Primo Turno dalle 19:00 alle 21:00 senza minimo di spesa (tavolo da liberare entro le 20:45) e Secondo Turno dalle 21:00 con minimo di spesa di 200€ a persona utilizzabile su food e beverage e DJ set live tutta la serata.'
        : 'Celebrate New Year’s Eve 2027 at STK Milan, the acclaimed contemporary steakhouse inside ME Milan Il Duca at Piazza della Repubblica 13. On Thursday, December 31, 2026, two seatings feature a dedicated NYE à la carte menu (Japanese Wagyu, USDA Prime cuts, oysters, Catalan-style lobster, black truffle): 1st Seating from 19:00 to 21:00 with no minimum spend (table vacated by 20:45) and 2nd Seating from 21:00 with a €200 per person minimum spend toward food and beverage plus a live DJ set.',
      musicAndFormat: isIt
        ? 'Steakhouse Fine Dining di San Silvestro & DJ Set Live dalle 21:00 · 2 Turni (19:00 e 21:00)'
        : 'New Year’s Eve Fine Steakhouse & Live DJ Set from 21:00 · 2 Seatings (19:00 & 21:00)',
      dressCode: isIt ? 'Elegante / Smart Chic Cosmopolita' : 'Cosmopolitan Smart Chic / Evening Elegant',
      priceSummary: isIt
        ? 'Primo Turno (19:00–21:00): À la carte senza minimo · Secondo Turno (dalle 21:00): Minimo di spesa 200€ a persona'
        : '1st Seating (19:00–21:00): À la carte, no minimum · 2nd Seating (from 21:00): €200 minimum spend per person',
      tiers: isIt
        ? [
            {
              label: 'Secondo Turno STK Milan (dalle 21:00, ultima pren. 22:30)',
              price: '200€',
              details: 'Minimo di spesa di 200€ a persona utilizzabile per food e beverage sul menù speciale à la carte di Capodanno + DJ set live dalle 21:00.',
            },
            {
              label: 'Primo Turno STK Milan (19:00 – 21:00, tavolo libero entro 20:45)',
              price: 'À la carte',
              details: 'Menù speciale à la carte di Capodanno senza minimo di spesa obbligatorio. Richiesta prenotazione concierge con carta a garanzia.',
            },
          ]
        : [
            {
              label: 'STK Milan 2nd Seating (from 21:00, last booking 22:30)',
              price: '€200',
              details: '€200 per person minimum spend applicable toward food and beverage from the NYE à la carte menu + live DJ set from 21:00.',
            },
            {
              label: 'STK Milan 1st Seating (19:00 – 21:00, table vacated by 20:45)',
              price: 'À la carte',
              details: 'Special NYE à la carte menu with no minimum spend requirement. Concierge booking required.',
            },
          ],
      highlights: isIt
        ? [
            'Location iconica al ME Milan Il Duca, Piazza della Repubblica 13',
            'Secondo Turno dalle 21:00: minimo di spesa 200€ a persona (food & beverage) con DJ set live',
            'Primo Turno 19:00–21:00: menù à la carte di Capodanno senza minimo di spesa',
            'Menù ufficiale NYE 2027 con Japanese Wagyu, USDA Tomahawk, astice e caviale',
          ]
        : [
            'Iconic steakhouse inside ME Milan Il Duca, Piazza della Repubblica 13',
            '2nd Seating from 21:00: €200 per person minimum spend (food & beverage) + live DJ set',
            '1st Seating 19:00–21:00: NYE à la carte menu with no minimum spend',
            'Official NYE 2027 menu featuring Japanese Wagyu, USDA Tomahawk, lobster and caviar',
          ],
      sourceBasis: isIt
        ? 'Listino e menù ufficiali Capodanno 2026/2027 STK Milan. Cancellazioni gratuite entro 14 giorni lavorativi prima dell’evento; entro i 14 giorni lavorativi penale 50%, no-show 100%. Prenotazioni online o WhatsApp +39 351 912 7047.'
        : 'Official NYE 2026/2027 STK Milan rate card and menu. Free cancellation up to 14 business days before the event; 50% charge within 14 business days, 100% no-show. Book online or via WhatsApp +39 351 912 7047.',
      scheduleHeading: isIt ? 'Orari & Turni 31 Dicembre 2026 · STK Milan' : 'Schedule & Seatings Dec 31, 2026 · STK Milan',
      schedule,
      menusHeading: isIt ? 'Menù Ufficiale À la Carte Capodanno 2027 · STK Milan' : 'Official NYE 2027 À la Carte Menu · STK Milan',
      menus: isIt ? STK_MENU_IT : STK_MENU_EN,
      conditionsHeading: isIt ? 'Condizioni Ufficiali di Prenotazione · STK Milan' : 'Official Booking Conditions · STK Milan',
      conditions: isIt
        ? [
            'Primo turno dalle 19:00 alle 21:00: tavolo da liberare tassativamente entro le 20:45; nessun minimo di spesa richiesto.',
            'Secondo turno dalle 21:00 (ultima prenotazione alle 22:30): minimo di spesa di 200€ a persona dovuto indipendentemente dal consumo effettivo.',
            'Modifiche o cancellazioni possibili con almeno 14 giorni lavorativi di anticipo; entro i 14 giorni lavorativi addebito del 50%, no-show 100%.',
            'Prenotazione gestita e confermata dal Concierge Nightlife Milan previa verifica disponibilità col locale.',
          ]
        : [
            '1st Seating 19:00–21:00: tables must be vacated by 20:45; no minimum spend required.',
            '2nd Seating from 21:00 (last seating 22:30): €200 per person minimum spend due regardless of actual consumption.',
            'Changes or cancellations require at least 14 business days notice; within 14 business days 50% charge, no-show 100%.',
            'Booking managed and confirmed by Nightlife Milan Concierge upon availability verification with the venue.',
          ],
      offerPricesEur: [200],
      shots: isIt
        ? ['Sala Principale STK Milan · ME Milan Il Duca', 'Grill USDA & Japanese Wagyu · Menù NYE 2027', 'Cocktail Bar & Lounge · DJ Set dalle 21:00', 'Atmosfera Capodanno 2027 · Piazza della Repubblica']
        : ['STK Milan Main Dining Room · ME Milan Il Duca', 'USDA & Japanese Wagyu Grill · NYE 2027 Menu', 'Cocktail Lounge & Bar · Live DJ Set from 21:00', 'New Year’s Eve 2027 Atmosphere · Piazza della Repubblica'],
    };
  }

  if (slug === 'capodanno-radio-rooftop-milano') {
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '20:00', label: 'Apertura prenotazioni Radio Rooftop al 10° piano del ME Milan Il Duca' },
          { time: '21:00', label: 'Inizio DJ Set live panoramico sullo skyline di Porta Nuova' },
          { time: '22:30', label: 'Ultima fascia di ingresso prenotabile per le formule Food & Beverage e Solo Beverage' },
          { time: '00:00', label: 'Brindisi di mezzanotte, rito lenticchie e cotechino e festa fino a tarda notte' },
        ]
      : [
          { time: '20:00', label: 'Doors open for bookings at Radio Rooftop on the 10th floor of ME Milan Il Duca' },
          { time: '21:00', label: 'Live DJ Set starts overlooking the Porta Nuova skyline' },
          { time: '22:30', label: 'Last reservation arrival slot for Food & Beverage and Beverage-Only formulas' },
          { time: '00:00', label: 'Midnight toast, traditional lentils & cotechino ritual and late-night party' },
        ];

    return {
      title: isIt
        ? 'Capodanno Radio Rooftop Milano 2027 · 10° Piano ME Milan Il Duca'
        : 'Radio Rooftop Milan NYE 2027 · 10th Floor ME Milan Il Duca',
      subtitle: isIt
        ? 'Via Marco Polo 18 (10° Piano ME Milan Il Duca) · Prenotazioni 20:00–22:30 · Minimo di spesa 200€ · DJ Set dalle 21:00'
        : 'Via Marco Polo 18 (10th Floor ME Milan Il Duca) · Bookings 20:00–22:30 · €200 min. spend · DJ Set from 21:00',
      description: isIt
        ? 'Vivi il Capodanno 2027 su uno dei rooftop più spettacolari di Milano: Radio Rooftop al 10° piano del ME Milan Il Duca. Per la notte del 31 dicembre 2026 il listino ufficiale prevede un minimo di spesa di 200€ a persona con due formule a scelta: Formula Food & Beverage (menù degustazione di Capodanno a 130€ con antipasto, primo, secondo a scelta, mini dessert e rito lenticchie e cotechino + 70€ di credito beverage) oppure Formula Solo Beverage (interi 200€ dedicati alle bevande). Prenotazioni dalle 20:00 alle 22:30, DJ set live dalle 21:00 fino a tarda notte.'
        : 'Celebrate New Year’s Eve 2027 atop one of Milan’s signature terraces: Radio Rooftop on the 10th floor of ME Milan Il Duca. The official December 31, 2026 rate card features a €200 per person minimum spend across two options: Food & Beverage Formula (€130 NYE tasting menu with choice of starter, first and main course, shared desserts and midnight lentils & cotechino + €70 beverage credit) or Beverage-Only Formula (full €200 minimum spend toward drinks). Bookings from 20:00 to 22:30, live DJ set from 21:00 until late.',
      musicAndFormat: isIt
        ? 'Panoramic Rooftop Dinner & Cocktail Party · DJ Set Live dalle 21:00 fino a tarda notte'
        : 'Panoramic Rooftop Dinner & Cocktail Party · Live DJ Set from 21:00 until late',
      dressCode: isIt ? 'Fashion Rooftop Glam / Elegante di San Silvestro' : 'Fashion Rooftop Glam / New Year’s Eve Elegant',
      priceSummary: isIt
        ? 'Formula Food & Beverage 200€ (130€ menu + 70€ bevande) · Formula Solo Beverage 200€'
        : 'Food & Beverage Formula €200 (€130 menu + €70 drinks) · Beverage-Only Formula €200',
      tiers: isIt
        ? [
            {
              label: 'Radio Rooftop · Formula Food & Beverage (dalle 20:00, ultima pren. 22:30)',
              price: '200€',
              details: 'Minimo di spesa 200€ a persona: menù degustazione Capodanno (130€ con antipasto, primo e secondo a scelta, dolci da condividere, lenticchie e cotechino) + 70€ per beverage + DJ set dalle 21:00.',
            },
            {
              label: 'Radio Rooftop · Formula Solo Beverage (dalle 20:00, ultima pren. 22:30)',
              price: '200€',
              details: 'Intero minimo di spesa di 200€ a persona interamente utilizzabile per cocktail, champagne e bottiglie + DJ set live fino a tarda notte.',
            },
          ]
        : [
            {
              label: 'Radio Rooftop · Food & Beverage Formula (20:00–22:30)',
              price: '€200',
              details: '€200 per person minimum spend: NYE tasting menu (€130 with starter, first and main choice, desserts, midnight lentils & cotechino) + €70 beverage credit + live DJ set from 21:00.',
            },
            {
              label: 'Radio Rooftop · Beverage-Only Formula (20:00–22:30)',
              price: '€200',
              details: 'Full €200 per person minimum spend dedicated entirely to cocktails, champagne and bottle service + live DJ set until late.',
            },
          ],
      highlights: isIt
        ? [
            '10° piano panoramico del ME Milan Il Duca sullo skyline di Porta Nuova',
            'Minimo di spesa 200€ a persona: scelta tra Food & Beverage (130€ menu + 70€ bevande) o Solo Beverage',
            'DJ set live dalle 21:00 fino a tarda notte con rito di mezzanotte lenticchie e cotechino',
            'Prenotazioni dalle 20:00, ultima fascia alle 22:30',
          ]
        : [
            '10th floor panoramic rooftop at ME Milan Il Duca overlooking Porta Nuova skyline',
            '€200 per person minimum spend: choose Food & Beverage (€130 menu + €70 drinks) or Beverage-Only',
            'Live DJ set from 21:00 until late with midnight lentils and cotechino ritual',
            'Reservations from 20:00, last booking slot at 22:30',
          ],
      sourceBasis: isIt
        ? 'Listino e menù ufficiali Capodanno 2026/2027 Radio Rooftop Milan. Minimo di spesa dovuto indipendentemente dal consumo; cancellazioni con almeno 14 giorni lavorativi di anticipo (entro i 14 giorni penale 50%, no-show 100%).'
        : 'Official NYE 2026/2027 Radio Rooftop Milan rate card and menu. Minimum spend due regardless of actual consumption; free cancellation up to 14 business days ahead (50% within 14 business days, 100% no-show).',
      scheduleHeading: isIt ? 'Programma 31 Dicembre 2026 · Radio Rooftop' : 'Schedule Dec 31, 2026 · Radio Rooftop',
      schedule,
      menusHeading: isIt ? 'Menù Degustazione Ufficiale Capodanno 2027 · Radio Rooftop' : 'Official NYE 2027 Tasting Menu · Radio Rooftop',
      menus: isIt ? RADIO_MENU_IT : RADIO_MENU_EN,
      conditionsHeading: isIt ? 'Condizioni Ufficiali · Radio Rooftop' : 'Official Conditions · Radio Rooftop',
      conditions: isIt
        ? [
            'Minimo di spesa di 200€ a persona dovuto indipendentemente dal consumo effettivo.',
            'Prenotazioni disponibili dalle 20:00 con ultima fascia di arrivo alle 22:30.',
            'Modifiche o cancellazioni almeno 14 giorni lavorativi prima; entro 14 giorni addebito 50%, no-show 100%.',
            'Prenotazione confermata da Nightlife Milan previa verifica disponibilità col locale.',
          ]
        : [
            '€200 per person minimum spend due regardless of actual consumption.',
            'Bookings open from 20:00 with last arrival slot at 22:30.',
            'Modifications or cancellations at least 14 business days prior; 50% charge within 14 business days, 100% no-show.',
            'Booking confirmed by Nightlife Milan upon availability verification with the venue.',
          ],
      offerPricesEur: [200, 200],
    };
  }

  if (slug === 'capodanno-hotel-barchetta-excelsior-como') {
    return {
      title: isIt
        ? 'Capodanno Hotel Barchetta Excelsior Como 2027 · Cenone Vista Lago'
        : 'Hotel Barchetta Excelsior Como NYE 2027 · Lakefront Gala Dinner',
      subtitle: isIt
        ? 'Piazza Cavour 1, 22100 Como · Ristorante Bistro · Cenone 5 Portate con Vini DOCG 175€ · Fuochi sul Lungolago'
        : 'Piazza Cavour 1, 22100 Como · Ristorante Bistro · 5-Course Gala Dinner with DOCG Wines €175 · Lakefront Fireworks',
      description: isIt
        ? 'Festeggia il Capodanno 2027 affacciato su Piazza Cavour e sul Lago di Como al Ristorante Bistro dell’Hotel Barchetta Excelsior. Il Cenone di San Silvestro del 31 dicembre 2026 (175€ a persona, bevande e abbinamento vini inclusi) comprende aperitivo gourmet di 5 assaggi, menù servito di cinque portate (capesante, anatra affumicata, risotto Carnaroli alle spugnole e scampi, filetto di vitello al pimentón, semifreddo ai pistacchi) con Franciacorta Brut DOCG, Sassella Riserva DOCG e Torcolato Maculan. La cena si conclude prima della mezzanotte per ammirare i fuochi d’artificio sul lungolago.'
        : 'Celebrate New Year’s Eve 2027 overlooking Piazza Cavour and Lake Como at Ristorante Bistro inside Hotel Barchetta Excelsior. The December 31, 2026 New Year’s Eve Gala Dinner (€175 per person, wines and beverages included) offers a 5-bite welcome aperitif, a five-course served menu (scallops, smoked duck, morel and langoustine risotto, veal fillet, pistachio semifreddo) paired with Franciacorta Brut DOCG, Sassella Riserva DOCG and Torcolato Maculan. Dinner concludes before midnight so guests can enjoy the lakefront fireworks.',
      musicAndFormat: isIt
        ? 'Cenone di San Silvestro di 5 Portate al Ristorante Bistro + Fuochi d’Artificio sul Lungolago di Como'
        : '5-Course Served New Year’s Eve Gala Dinner at Ristorante Bistro + Lake Como Midnight Fireworks',
      dressCode: isIt ? 'Elegante / Gala di San Silvestro' : 'Elegant / New Year’s Eve Gala',
      priceSummary: isIt
        ? 'Cenone di Gala Adulti 175€ (vini e bevande inclusi) · Bambini 5–12 anni 87,50€ (-50%) · 0–4 anni a consumo'
        : 'Adult Gala Dinner €175 (wines & drinks included) · Kids 5–12 €87.50 (50% off) · Ages 0–4 à la carte',
      tiers: isIt
        ? [
            {
              label: 'Cenone di San Silvestro Adulti · Ristorante Bistro (31 dic 2026)',
              price: '175€',
              details: 'Aperitivo di benvenuto + menù servito di 5 portate + abbinamento vini DOCG (Franciacorta Brut, Sassella Riserva, Torcolato) e bevande incluse. Conclusione prima di mezzanotte per i fuochi sul lungolago.',
            },
            {
              label: 'Tariffa Bambini 5–12 anni (sconto 50%)',
              price: '87,50€',
              details: 'Riduzione ufficiale del 50% per bambini da 5 a 12 anni. Bambini 0–4 anni a consumo; oltre 12 anni tariffa adulti intera.',
            },
          ]
        : [
            {
              label: 'Adult New Year’s Eve Gala Dinner · Ristorante Bistro (Dec 31, 2026)',
              price: '€175',
              details: 'Welcome aperitif + 5-course served dinner + DOCG wine pairing (Franciacorta Brut, Sassella Riserva, Torcolato) and beverages included. Finishes before midnight for lakefront fireworks.',
            },
            {
              label: 'Children Ages 5–12 (50% Discount)',
              price: '€87.50',
              details: 'Official 50% discount for children aged 5 to 12. Ages 0–4 à la carte; ages 13+ full adult rate.',
            },
          ],
      highlights: isIt
        ? [
            'Posizione privilegiata fronte lago in Piazza Cavour 1 nel centro di Como',
            'Cenone servito 5 portate + aperitivo gourmet a 175€ con vini DOCG e bevande incluse',
            'Cena programmata per terminare prima della mezzanotte per vedere i fuochi sul lungolago',
            'Struttura ufficiale del gruppo Palace Hotel Como (alternativa confermata con disponibilità aperta)',
          ]
        : [
            'Prime lakefront address at Piazza Cavour 1 in the heart of Como',
            '5-course served Gala Dinner + welcome aperitif at €175 with DOCG wines and beverages included',
            'Timed to finish before midnight for the Lake Como lakefront fireworks',
            'Official sister property of Palace Hotel Como with confirmed availability',
          ],
      sourceBasis: isIt
        ? 'Listino e menù ufficiali Capodanno 31 dicembre 2026 Hotel Barchetta Excelsior Como. Disponibilità confermata dalla struttura; prenotazione gestita da Nightlife Milan con conferma previa verifica disponibilità.'
        : 'Official December 31, 2026 rate card and menu from Hotel Barchetta Excelsior Como. Availability confirmed by the property; booking handled by Nightlife Milan subject to live availability verification.',
      menusHeading: isIt ? 'Menù Ufficiale Cenone di San Silvestro 2027 · Ristorante Bistro' : 'Official NYE 2027 Gala Dinner Menu · Ristorante Bistro',
      menus: isIt ? BARCHETTA_MENU_IT : BARCHETTA_MENU_EN,
      conditionsHeading: isIt ? 'Condizioni Ufficiali · Hotel Barchetta Excelsior Como' : 'Official Conditions · Hotel Barchetta Excelsior Como',
      conditions: isIt
        ? [
            'Tariffa adulti fissa 175€ a persona (bevande e abbinamento vini inclusi).',
            'Bambini 0–4 anni a consumo, bambini 5–12 anni sconto 50% (87,50€), oltre 12 anni tariffa intera.',
            'La cena si conclude prima della mezzanotte per consentire agli ospiti di assistere ai fuochi sul lungolago.',
            'Condizioni struttura: acconto non rimborsabile; prenotazione confermata da Nightlife Milan dopo verifica disponibilità.',
          ]
        : [
            'Fixed adult rate €175 per person (beverages and wine pairing included).',
            'Children 0–4 à la carte, ages 5–12 50% discount (€87.50), ages 13+ full adult rate.',
            'Dinner finishes before midnight so guests can watch the lakefront fireworks.',
            'Booking confirmed by Nightlife Milan after verifying live availability with the hotel.',
          ],
      offerPricesEur: [175, 87.5],
      shots: isIt
        ? ['Ristorante Bistro · Hotel Barchetta Excelsior Como', 'Vista Lago di Como & Piazza Cavour', 'Facciata Storica sul Lungolago di Como', 'Sala Gala & Mise en Place Capodanno 2027']
        : ['Ristorante Bistro · Hotel Barchetta Excelsior Como', 'Lake Como & Piazza Cavour View', 'Historic Lakefront Facade in Como', 'Gala Dining Room & NYE 2027 Setting'],
    };
  }

  if (slug === 'capodanno-albergo-terminus-como') {
    return {
      title: isIt
        ? 'Capodanno Albergo Terminus Como 2027 · Bar delle Terme, Live Music & Fuochi'
        : 'Albergo Terminus Como NYE 2027 · Bar delle Terme, Live Music & Fireworks',
      subtitle: isIt
        ? 'Lungo Lario Trieste 14, 22100 Como · Cenone di San Silvestro 240€ con Vini Pregiati, Musica dal Vivo & Fuochi dalla Terrazza'
        : 'Lungo Lario Trieste 14, 22100 Como · New Year’s Eve Gala Dinner €240 with Fine Wines, Live Music & Terrace Fireworks',
      description: isIt
        ? 'Accogli il 2027 sul Lungo Lario di Como nell’eleganza Liberty dell’Albergo Terminus. Il Cenone di San Silvestro al Bar delle Terme (31 dicembre 2026, 240€ a persona con abbinamento vini incluso) propone il benvenuto dello chef in cinque creazioni, tortino ai porcini, capasanta scottata, millefoglie di pasta fresca con carciofi e Bitto della Valtellina, rana pescatrice, semifreddo al torrone e zampone con lenticchie, accompagnati da Ca’ del Bosco, Lis Neris, Terlano Winkl e Donnafugata Ben Ryé. Serata con musica dal vivo e vista privilegiata sui fuochi d’artificio di mezzanotte dalla terrazza.'
        : 'Welcome 2027 along Como’s waterfront in the Art Nouveau elegance of Albergo Terminus. The New Year’s Eve Gala Dinner at Bar delle Terme (December 31, 2026, €240 per person with fine wine pairing included) features a five-piece chef’s welcome, porcini flan, seared scallop, fresh pasta mille-feuille with artichokes and Bitto cheese, monkfish, nougat semifreddo, and midnight zampone with lentils, paired with Ca’ del Bosco, Lis Neris, Terlano Winkl and Donnafugata Ben Ryé. Includes live music and midnight fireworks from the lakefront terrace.',
      musicAndFormat: isIt
        ? 'Cenone di San Silvestro al Bar delle Terme · Musica dal Vivo & Fuochi d’Artificio dalla Terrazza sul Lago'
        : 'New Year’s Eve Gala Dinner at Bar delle Terme · Live Music & Midnight Fireworks from the Lakefront Terrace',
      dressCode: isIt ? 'Elegante / Gala sul Lago di Como' : 'Lake Como Gala / Evening Elegant',
      priceSummary: isIt
        ? 'Cenone di San Silvestro al Bar delle Terme: 240€ a persona (abbinamento vini, musica dal vivo e terrazza fuochi inclusi)'
        : 'New Year’s Eve Gala Dinner at Bar delle Terme: €240 per person (wine pairing, live music & fireworks terrace included)',
      tiers: isIt
        ? [
            {
              label: 'Cenone di San Silvestro · Bar delle Terme (31 dicembre 2026)',
              price: '240€',
              details: 'Benvenuto dello chef + menù degustazione completo con zampone e lenticchie + abbinamento vini (Ca’ del Bosco, Lis Neris, Terlano Winkl, Donnafugata Ben Ryé) + musica dal vivo + fuochi dalla terrazza.',
            },
          ]
        : [
            {
              label: 'New Year’s Eve Gala Dinner · Bar delle Terme (December 31, 2026)',
              price: '€240',
              details: 'Chef’s welcome + full tasting menu with zampone & lentils + wine pairing (Ca’ del Bosco, Lis Neris, Terlano Winkl, Donnafugata Ben Ryé) + live music + midnight fireworks from the terrace.',
            },
          ],
      highlights: isIt
        ? [
            'Storico palazzo Liberty sul Lungo Lario Trieste 14 a Como',
            'Cenone completo 240€ con abbinamento vini d’eccellenza (Ca’ del Bosco, Terlano Winkl, Donnafugata Ben Ryé)',
            'Musica dal vivo durante la serata e spettacolo pirotecnico di mezzanotte dalla terrazza',
            'Cancellazione gratuita fino a 10 giorni prima dell’evento · Alternativa ufficiale del gruppo Palace Hotel Como',
          ]
        : [
            'Historic Art Nouveau landmark on Lungo Lario Trieste 14 in Como',
            'Complete €240 Gala Dinner with prestigious wine pairing (Ca’ del Bosco, Terlano Winkl, Donnafugata Ben Ryé)',
            'Live music throughout the evening and midnight fireworks from the terrace',
            'Free cancellation up to 10 days before the event · Official sister property of Palace Hotel Como',
          ],
      sourceBasis: isIt
        ? 'Listino e menù ufficiali 31 dicembre 2026 Albergo Terminus Como · Bar delle Terme. Cancellazione gratuita entro e non oltre 10 giorni prima dell’evento. Prenotazione confermata da Nightlife Milan previa verifica disponibilità.'
        : 'Official December 31, 2026 rate card and menu from Albergo Terminus Como · Bar delle Terme. Free cancellation up to 10 days prior to the event. Booking confirmed by Nightlife Milan after availability check.',
      menusHeading: isIt ? 'Menù Ufficiale di San Silvestro 2027 · Bar delle Terme' : 'Official NYE 2027 Menu · Bar delle Terme',
      menus: isIt ? TERMINUS_MENU_IT : TERMINUS_MENU_EN,
      conditionsHeading: isIt ? 'Condizioni Ufficiali · Albergo Terminus Como' : 'Official Conditions · Albergo Terminus Como',
      conditions: isIt
        ? [
            'Prezzo ufficiale di listino: 240€ a persona con abbinamento vini incluso.',
            'Cancellazione gratuita entro e non oltre i 10 giorni antecedenti il 31 dicembre 2026.',
            'Prenotazione gestita e confermata da Nightlife Milan dopo verifica disponibilità con la struttura; in caso di indisponibilità, rimborso integrale.',
          ]
        : [
            'Official venue list price: €240 per person with fine wine pairing included.',
            'Free cancellation up to 10 days before December 31, 2026.',
            'Booking managed and confirmed by Nightlife Milan after verifying availability with the hotel; full refund if unavailable.',
          ],
      offerPricesEur: [240],
      shots: isIt
        ? ['Bar delle Terme · Albergo Terminus Lago di Como', 'Atmosfera Capodanno 2027 sul Lungolago', 'Sala Liberty & Ristorante Bar delle Terme', 'Terrazza Panoramica Vista Lago di Como']
        : ['Bar delle Terme · Albergo Terminus Lake Como', 'Lakefront New Year’s Eve 2027 Atmosphere', 'Art Nouveau Hall & Bar delle Terme Dining', 'Panoramic Terrace Overlooking Lake Como'],
    };
  }

  if (slug === 'capodanno-palace-hotel-como') {
    const soldOutTitle =
      loc === 'it'
        ? 'Palace Hotel Como · Capodanno 2027 Esaurito (Sold Out)'
        : loc === 'es'
          ? 'Palace Hotel Como · Nochevieja 2027 Agotada (Sold Out)'
          : loc === 'fr'
            ? 'Palace Hotel Como · Nouvel An 2027 Complet (Sold Out)'
            : loc === 'de'
              ? 'Palace Hotel Como · Silvester 2027 Ausgebucht (Sold Out)'
              : 'Palace Hotel Como · NYE 2027 Sold Out';
    return {
      title: soldOutTitle,
      subtitle: isIt
        ? 'Lungo Lario Trieste 16, 22100 Como · Gala di Capodanno al Ristorante Antica Darsena tutto esaurito · Alternative del gruppo: Barchetta & Terminus'
        : 'Lungo Lario Trieste 16, 22100 Como · Ristorante Antica Darsena NYE Gala is Sold Out · Sister properties available: Hotel Barchetta Excelsior & Albergo Terminus',
      description: isIt
        ? 'Avviso ufficiale di disponibilità Capodanno 2027: il Gala di Capodanno al Ristorante Antica Darsena del Palace Hotel Como è ufficialmente tutto esaurito e non sono più disponibili posti per il 31 dicembre 2026. Il gruppo alberghiero propone come alternative ufficiali aperte sul lungolago di Como l’Hotel Barchetta Excelsior (Cenone di Gala 5 portate al Ristorante Bistro con vini DOCG a 175€) e l’Albergo Terminus · Bar delle Terme (Cenone di San Silvestro con abbinamento vini, musica dal vivo e terrazza fuochi a 240€).'
        : 'Official NYE 2027 availability notice: the New Year’s Eve Gala Dinner at Palace Hotel Como (Ristorante Antica Darsena) is officially sold out for December 31, 2026. The hotel group officially recommends its two lakefront sister properties in Como with open availability: Hotel Barchetta Excelsior (€175 5-course Gala Dinner with DOCG wines) and Albergo Terminus · Bar delle Terme (€240 NYE Gala Dinner with fine wine pairing, live music and fireworks terrace).',
      musicAndFormat: isIt ? 'Evento Esaurito · Alternative del Gruppo Aperte sul Lago di Como' : 'Sold Out · Sister Properties Open on Lake Como',
      dressCode: isIt ? 'Gala / Elegante (Evento Sold Out)' : 'Gala / Elegant (Sold Out)',
      priceSummary: isIt
        ? 'Esaurito (Sold Out) · Alternative disponibili: Hotel Barchetta Excelsior (175€) e Albergo Terminus (240€)'
        : 'Sold Out · Available sister venues: Hotel Barchetta Excelsior (€175) & Albergo Terminus (€240)',
      tiers: [],
      highlights: isIt
        ? [
            'Capodanno 2027 al Palace Hotel Como ufficialmente tutto esaurito (non acquistabile)',
            'Alternativa ufficiale 1 del gruppo: Hotel Barchetta Excelsior Como · Cenone 5 portate 175€',
            'Alternativa ufficiale 2 del gruppo: Albergo Terminus Como · Bar delle Terme 240€ con live music e fuochi',
            'Assistenza diretta Concierge Nightlife Milan su WhatsApp +39 351 912 7047',
          ]
        : [
            'Palace Hotel Como NYE 2027 is officially sold out (not bookable)',
            'Official sister alternative 1: Hotel Barchetta Excelsior Como · 5-course Gala Dinner €175',
            'Official sister alternative 2: Albergo Terminus Como · Bar delle Terme €240 with live music & fireworks',
            'Direct Nightlife Milan Concierge assistance on WhatsApp +39 351 912 7047',
          ],
      sourceBasis: isIt
        ? 'Comunicazione ufficiale Front Office Palace Hotel Como (19 novembre 2026): Capodanno tutto esaurito; disponibili le strutture del gruppo Hotel Barchetta Excelsior e Albergo Terminus.'
        : 'Official notice from Palace Hotel Como Front Office (November 19, 2026): NYE Gala completely sold out; group sister venues Hotel Barchetta Excelsior and Albergo Terminus open for booking.',
      soldOutForNye: true,
      closureBannerTitle: isIt
        ? 'CAPODANNO 2027 ESAURITO (SOLD OUT) · PALACE HOTEL COMO'
        : 'NEW YEAR’S EVE 2027 SOLD OUT · PALACE HOTEL COMO',
      closureBannerBody: isIt
        ? 'Il Capodanno al Palace Hotel Como è ufficialmente tutto esaurito. Prenota qui sotto una delle due strutture del gruppo con disponibilità confermata sul lungolago di Como: Hotel Barchetta Excelsior (175€) oppure Albergo Terminus · Bar delle Terme (240€).'
        : 'New Year’s Eve at Palace Hotel Como is officially sold out. Book one of the hotel group’s two confirmed lakefront sister properties in Como below: Hotel Barchetta Excelsior (€175) or Albergo Terminus · Bar delle Terme (€240).',
      alternativesHeading: isIt
        ? 'Strutture del Gruppo Aperte sul Lago di Como per Capodanno 2027'
        : 'Lake Como Sister Properties Open & Bookable for NYE 2027',
      alternativesSubheading: isIt
        ? 'Alternative ufficiali proposte dal gruppo Palace Hotel Como con menù, vini inclusi e prenotazione online:'
        : 'Official sister properties recommended by Palace Hotel Como with full menus, wine pairings and online booking:',
      alternativeSlugs: ['capodanno-hotel-barchetta-excelsior-como', 'capodanno-albergo-terminus-como'],
      shots: isIt
        ? ['Palace Hotel Como · Lungo Lario Trieste', 'Sala Storica Capodanno · Evento Sold Out', 'Sala Manzoni & Affaccio Lago di Como', 'Facciata Storica · Alternative Barchetta & Terminus']
        : ['Palace Hotel Como · Lungo Lario Trieste', 'Historic Gala Hall · Sold Out Event', 'Sala Manzoni & Lake Como Waterfront', 'Historic Facade · Barchetta & Terminus Alternatives'],
    };
  }

  const closedMeta = CLOSED_VENUE_META[slug];
  if (closedMeta) {
    const labels = CLOSED_LABELS_BY_LOCALE[loc] || CLOSED_LABELS_BY_LOCALE.en!;
    const reason = isIt ? closedMeta.reasonIt : closedMeta.reasonEn;
    return {
      title: `${closedMeta.name} · ${labels.closedTag}`,
      subtitle: `${closedMeta.address} · ${labels.closedTag}`,
      description: `${reason} ${labels.altSub}`,
      musicAndFormat: labels.closedTag,
      dressCode: labels.closedTag,
      priceSummary: labels.closedTag,
      tiers: [],
      highlights: [
        `${closedMeta.name} (${closedMeta.address})`,
        reason,
        isIt
          ? 'Nessun biglietto o cenone in vendita per la notte del 31 dicembre 2026 in questa sede'
          : 'No tickets or gala dinner on sale for December 31, 2026 at this venue',
        isIt
          ? 'Assistenza Concierge Nightlife Milan per alternative aperte: WhatsApp +39 351 912 7047'
          : 'Nightlife Milan Concierge for open alternatives: WhatsApp +39 351 912 7047',
      ],
      sourceBasis: `${reason} Concierge WhatsApp +39 351 912 7047.`,
      closedForNye: true,
      closureBannerTitle: `${labels.bannerPrefix} · ${closedMeta.name.toUpperCase()}`,
      closureBannerBody: reason,
      alternativesHeading: labels.altHeading,
      alternativesSubheading: labels.altSub,
      alternativeSlugs: closedMeta.alternatives,
      customFaqs: isIt
        ? [
            {
              q: `${closedMeta.name} è aperto a Capodanno 2027 (31 dicembre 2026)?`,
              a: `No. ${closedMeta.reasonIt}`,
            },
            {
              q: `Quali sono le migliori alternative aperte e prenotabili a Capodanno 2027?`,
              a: `Consulta le alternative ufficiali confermate nella pagina qui sotto oppure scrivi al Concierge Nightlife Milan su WhatsApp +39 351 912 7047.`,
            },
          ]
        : [
            {
              q: `Is ${closedMeta.name} open for New Year’s Eve 2027 (December 31, 2026)?`,
              a: `No. ${closedMeta.reasonEn}`,
            },
            {
              q: `What are the best confirmed open alternatives for NYE 2027?`,
              a: `Explore the verified open alternatives linked below or contact Nightlife Milan Concierge on WhatsApp +39 351 912 7047.`,
            },
          ],
    };
  }

  return null;
}
