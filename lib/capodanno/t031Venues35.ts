import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import { capodannoNavigation } from './routes';
import { getCapodannoDetailFaqs35, getWords35 } from './capodannoUi35';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from './repvblic35';

const GALLIA_MENUS_IT: CapodannoMenuCard[] = [
  {
    id: 'terrazza-gallia-restaurant-nye-2027',
    title: 'Terrazza Gallia Restaurant (7° Piano) · Gran Cenone di San Silvestro',
    price: '195€ (2 portate + dolce) · 225€ (3 portate + dolce)',
    subtitle: 'Dalle 19:30 · Piazza Duca d’Aosta 9, Milano · Chef Andrea Calia Di Dio & Pastry Chef Francesco Gramuglia · Musica live & DJ set dopo mezzanotte',
    courses: [
      {
        course: 'Il Benvenuto & Gli Antipasti (a scelta)',
        dish: 'Calice di Champagne Pommery con selezione di creazioni per l’aperitivo · Scarola napoletana, scampo crudo, seppia e caviale Asetra «Cru Caviar» · Ratatouille d’inverno, jus di verdure al tartufo nero · Terrina di Wagyu delle Dolomiti, salsa fegato e chips di patate',
      },
      {
        course: 'Paste, Risotti, Carne & Pesce (2 o 3 portate a scelta)',
        dish: 'Carnaroli Riserva San Massimo alla pescatora, salsa prezzemolo e alghe · Spaghetto all’astice blu di Bretagna, la sua bisque ed emulsione di mare · Tortellini di cappone e il suo consommé · Tagliolino 30 tuorli al tartufo bianco 3g (+20€) · Piccione, foie gras e frutti rossi · Baccalà «pil pil», gambero rosso, bisque e caviale Imperial «Cru Caviar» · Cotoletta alla milanese (anche Valdostana con fontina e tartufo bianco 3g +40€) · Pescato del giorno in crosta di sale (per 2 persone)',
      },
      {
        course: 'Dolcezze & Piccolo Buffet di Mezzanotte',
        dish: 'Creazione dolce a cura del Pastry Chef · Piccolo buffet di dolci e frutta con lenticchie e cotechino, pandoro, panettone, torroncini, uva e mandarini',
      },
    ],
    beverages: 'Calice di Champagne Pommery di benvenuto incluso; ulteriori vini e bevande esclusi. Menu Bambini fino a 12 anni disponibile a 90€. Accesso incluso al DJ set dopo mezzanotte in Terrazza Gallia.',
    imageSrc: '/images/events/t031-menus/menu-terrazza-gallia-restaurant-nye-2027.webp',
    imageAlt: 'Terrazza Gallia Restaurant · Menù Ufficiale Capodanno 2027 · Excelsior Hotel Gallia Milano',
  },
  {
    id: 'terrazza-gallia-bar-nye-2027',
    title: 'Terrazza Gallia Bar (7° Piano) · Aperitivo Aspettando la Mezzanotte + Champagne Pommery',
    price: '165€ (include 1 bottiglia Champagne Pommery ogni 2 ospiti)',
    subtitle: 'Dalle 21:30 · Rooftop Panoramico 7° Piano · Musica dal vivo e DJ set fino a tarda notte',
    courses: [
      {
        course: 'Degustazione di Benvenuto & Raw Bar',
        dish: 'Caviale Imperial (10g) con blinis e panna acida · Ostriche di Goro con scalogno all’aceto di lampone · Terrina di foie gras con pan brioche tostato · Croque monsieur al tartufo nero · Gambero rosso di Mazara in tempura con maionese al lime',
      },
      {
        course: 'Piatto Caldo dello Chef',
        dish: 'Risotto Carnaroli allo zafferano con ragù d’ossobuco e gremolada della tradizione milanese',
      },
      {
        course: 'Mezzanotte in Terrazza',
        dish: 'Buffet di dolci delle feste, panettone artigianale con salse calde, lenticchie e cotechino di buon auspicio',
      },
    ],
    beverages: 'Include 1 bottiglia di Champagne Pommery ogni 2 persone, acqua e caffè. Menu Bambini fino a 12 anni disponibile a 80€.',
    imageSrc: '/images/events/t031-menus/menu-terrazza-gallia-bar-nye-2027.webp',
    imageAlt: 'Terrazza Gallia Bar · Aperitivo Aspettando la Mezzanotte 165€ con Champagne Pommery · Capodanno 2027',
  },
  {
    id: 'gallia-lounge-bar-nye-2027',
    title: 'Gallia Lounge & Bar · Cena di San Silvestro + DJ Set in Terrazza',
    price: '135€',
    subtitle: 'Cena 19:00–22:30 con musica dal vivo + ingresso al DJ set dopo mezzanotte al 7° piano in Terrazza Gallia',
    courses: [
      {
        course: '7 Antipasti Gourmet in Condivisione',
        dish: 'Ostrica e caviale · Tartare di tonno rosso agli agrumi · Salmone marinato con aneto e panna acida · Insalata tiepida di mare · Vitello tonnato della tradizione · Culatello di Zibello DOP con gnocco caldo · Burrata pugliese con pomodorini confit',
      },
      {
        course: 'Portata Principale (1 a scelta)',
        dish: 'Tagliolino 30 tuorli all’aragosta · Catalana di crostacei e verdure croccanti · Raviolo cacio e pepe con tartare di scampi · Guancetta di manzo brasata al vino rosso e tartufo nero',
      },
      {
        course: 'Dessert & Rito di Mezzanotte',
        dish: 'Dolce di San Silvestro della pasticceria Gallia · Lenticchie e cotechino + salita al 7° piano per il DJ set dopo mezzanotte',
      },
    ],
    beverages: 'Bevande escluse. Menu Bambini fino a 12 anni disponibile a 60€. Include l’accesso dopo mezzanotte al party con DJ set in Terrazza Gallia (7° piano).',
    imageSrc: '/images/events/t031-menus/menu-gallia-lounge-nye-2027.webp',
    imageAlt: 'Gallia Lounge & Bar · Cena di San Silvestro 135€ + DJ Set Terrazza Gallia · Capodanno 2027',
  },
];

const GALLIA_MENUS_EN: CapodannoMenuCard[] = [
  {
    id: 'terrazza-gallia-restaurant-nye-2027',
    title: 'Terrazza Gallia Restaurant (7th Floor) · New Year’s Eve Gourmet Dinner',
    price: '€195 (2 courses + dessert) · €225 (3 courses + dessert)',
    subtitle: 'From 19:30 · Piazza Duca d’Aosta 9, Milan · Chef Andrea Calia Di Dio & Pastry Chef Francesco Gramuglia · Live music & post-midnight DJ set',
    courses: [
      {
        course: 'Welcome Pommery Champagne & Starters',
        dish: 'Welcome glass of Pommery Champagne with aperitivo creations · Neapolitan-style escarole, raw langoustine, cuttlefish & Asetra «Cru Caviar» · Winter ratatouille with vegetable jus & black truffle · Dolomites Wagyu terrine, liver sauce & potato crisps',
      },
      {
        course: 'Pasta, Risotto, Meat & Fish (choose 2 or 3 courses)',
        dish: 'Carnaroli Riserva San Massimo pescatora-style risotto · Spaghetti with Brittany blue lobster & bisque · Capon tortellini in consommé · 30-yolk tagliolini with white truffle 3g (+€20) · Pigeon, foie gras & red berries · «Pil Pil» salt cod, red prawn & Imperial «Cru Caviar» · Milanese veal cutlet (also Valdostana with Fontina & white truffle 3g +€40) · Salt-crust catch of the day (for 2)',
      },
      {
        course: 'Sweet Creations & Midnight Buffet',
        dish: 'Pastry Chef signature dessert · Dessert & fruit buffet with traditional lentils and cotechino, Pandoro, Panettone, mini torroncini, grapes & mandarins',
      },
    ],
    beverages: 'Welcome glass of Pommery Champagne included; additional wines and beverages excluded. Dedicated U12 Menu at €90. Includes post-midnight DJ set on Terrazza Gallia.',
    imageSrc: '/images/events/t031-menus/menu-terrazza-gallia-restaurant-nye-2027.webp',
    imageAlt: 'Terrazza Gallia Restaurant · Official NYE 2027 Gala Menu · Excelsior Hotel Gallia Milan',
  },
  {
    id: 'terrazza-gallia-bar-nye-2027',
    title: 'Terrazza Gallia Bar (7th Floor) · Countdown Aperitif + Pommery Champagne',
    price: '€165 (includes 1 bottle of Pommery Champagne per 2 guests)',
    subtitle: 'From 21:30 · 7th-Floor Panoramic Rooftop · Live music & DJ set until late',
    courses: [
      {
        course: 'Luxury Raw Bar & Gourmet Bites',
        dish: 'Imperial caviar (10g) with blinis & sour cream · Goro oysters with raspberry shallot mignonette · Foie gras terrine with toasted brioche · Black truffle croque monsieur · Tempura red prawn with lime mayo',
      },
      {
        course: 'Warm Signature Course',
        dish: 'Traditional Milanese saffron Carnaroli risotto with braised ossobuco ragù',
      },
      {
        course: 'Midnight on the Rooftop',
        dish: 'Festive sweets buffet, artisanal panettone with warm creams, traditional midnight lentils & cotechino',
      },
    ],
    beverages: 'Includes 1 bottle of Pommery Champagne for every 2 guests, water and coffee. Dedicated U12 Menu at €80.',
    imageSrc: '/images/events/t031-menus/menu-terrazza-gallia-bar-nye-2027.webp',
    imageAlt: 'Terrazza Gallia Bar · Official €165 Countdown Aperitif with Pommery Champagne · NYE 2027',
  },
  {
    id: 'gallia-lounge-bar-nye-2027',
    title: 'Gallia Lounge & Bar · New Year’s Eve Dinner + Rooftop DJ Set',
    price: '€135',
    subtitle: '19:00–22:30 Dinner with live music + post-midnight DJ set access on 7th-floor Terrazza Gallia',
    courses: [
      {
        course: '7 Gourmet Sharing Starters',
        dish: 'Oyster & caviar · Citrus bluefin tuna tartare · Dill-cured salmon · Warm seafood salad · Classic vitello tonnato · Culatello di Zibello DOP · Pugliese burrata with confit tomatoes',
      },
      {
        course: 'Main Course (choose 1)',
        dish: '30-yolk lobster tagliolini · Shellfish catalana with crisp vegetables · Cacio e pepe ravioli with langoustine tartare · Red-wine braised beef cheek with black truffle',
      },
      {
        course: 'Dessert & Rooftop Party',
        dish: 'Signature New Year’s Eve pastry · Midnight lentils & cotechino + access to the 7th-floor Terrazza Gallia DJ set after midnight',
      },
    ],
    beverages: 'Beverages excluded. Dedicated U12 Menu at €60. Includes post-midnight admission to the 7th-floor Terrazza Gallia DJ set.',
    imageSrc: '/images/events/t031-menus/menu-gallia-lounge-nye-2027.webp',
    imageAlt: 'Gallia Lounge & Bar · Official €135 NYE 2027 Dinner + Rooftop DJ Set Menu',
  },
];

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
    imageSrc: '/images/events/t031-menus/menu-stk-milan-nye-2027.webp',
    imageAlt: 'STK Milan · Menù Speciale À la Carte Capodanno 2027 · ME Milan Il Duca',
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
    imageSrc: '/images/events/t031-menus/menu-stk-milan-nye-2027.webp',
    imageAlt: 'STK Milan · Official NYE 2027 À la Carte Menu · ME Milan Il Duca',
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
    imageSrc: '/images/events/t031-menus/menu-radio-rooftop-nye-2027.webp',
    imageAlt: 'Radio Rooftop Milan · Menù Degustazione Ufficiale Capodanno 2027',
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
    imageSrc: '/images/events/t031-menus/menu-radio-rooftop-nye-2027.webp',
    imageAlt: 'Radio Rooftop Milan · Official NYE 2027 Tasting Menu',
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
    imageSrc: '/images/events/t031-menus/menu-barchetta-como-nye-2027.webp',
    imageAlt: 'Hotel Barchetta Excelsior Como · Menù Ufficiale Cenone Capodanno 2027',
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
    imageSrc: '/images/events/t031-menus/menu-barchetta-como-nye-2027.webp',
    imageAlt: 'Hotel Barchetta Excelsior Como · Official NYE 2027 Gala Dinner Menu',
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
    imageSrc: '/images/events/t031-menus/menu-terminus-como-nye-2027.webp',
    imageAlt: 'Albergo Terminus Como · Menù Ufficiale Bar delle Terme San Silvestro 2027',
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
    imageSrc: '/images/events/t031-menus/menu-terminus-como-nye-2027.webp',
    imageAlt: 'Albergo Terminus Como · Official NYE 2027 Bar delle Terme Menu',
  },
];

const JAZZ_CAFE_MENU_IT: CapodannoMenuCard[] = [
  {
    id: 'jazz-cafe-orient-express-nye-2027',
    title: 'Jazz Cafe Milano · Menù Gala Orient Express 2027',
    price: '170€',
    subtitle: '31 dicembre 2026 dalle 20:30 · Corso Sempione 8, Milano · Acqua e caffè compresi, vini esclusi · Pagamento anticipato',
    courses: [
      {
        course: 'Benvenuto & Brindisi di Mezzanotte',
        dish: 'Calice di benvenuto Ca’ del Bosco · A mezzanotte calice di Champagne R de Ruinart',
      },
      {
        course: 'Antipasti Gourmet (Condivisione)',
        dish: 'Amuse bouche · Plateau Royal Jazz con ostriche, gamberi rossi e scampi · Tartare di scampo con foie gras e passito · Capasanta con topinambur, tartufo e nocciola · Uramaki lobster roll · Terrina di foie gras con pan brioche, uva e Sauternes · Wagyu sando al tartufo nero · Jamón de Bellota con pan de cristal, tomate e manchego',
      },
      {
        course: 'Secondo Piatto & Dolce',
        dish: 'Filetto di manzo USA con millefoglie di patate, tartufo nero e salsa al porto (alternativa dedicata su segnalazione alimentare) · Délice al marron glacé e Panettone con crema al mascarpone',
      },
      {
        course: 'Dopo Mezzanotte (Club con DJ Anyma Blue & Michel Corradi)',
        dish: 'Ingresso club dalle 00:00 a 40€ con 1ª consumazione inclusa (successive 20€) · Tavoli Privé dalle 23:30: 1–4 pax 1 bottiglia, 5–8 pax 2 bottiglie da bottle list',
      },
    ],
    beverages: 'Acqua e caffè compresi nel menù da 170€. Lista vini e champagne da 45€ a 1.300€ (Champagne da 160€, Franciacorta da 75€, Super Tuscan, Distillati da 160€).',
    imageSrc: '/images/events/t031-menus/menu-jazz-cafe-milano-nye-2027.webp',
    imageAlt: 'Jazz Cafe Milano · Menù Ufficiale Orient Express 170€ e Dopo Mezzanotte 40€ Capodanno 2027',
  },
];

const JAZZ_CAFE_MENU_EN: CapodannoMenuCard[] = [
  {
    id: 'jazz-cafe-orient-express-nye-2027',
    title: 'Jazz Cafe Milano · Orient Express NYE 2027 Gala Menu',
    price: '€170',
    subtitle: 'December 31, 2026 from 20:30 · Corso Sempione 8, Milan · Water & coffee included, wines excluded · Advance prepayment required',
    courses: [
      {
        course: 'Welcome & Midnight Toast',
        dish: 'Welcome glass of Ca’ del Bosco · Midnight Champagne toast with R de Ruinart',
      },
      {
        course: 'Gourmet Starters',
        dish: 'Amuse bouche · Plateau Royal Jazz with oysters, red prawns & langoustines · Langoustine tartare with foie gras & passito · Scallop with Jerusalem artichoke, truffle & hazelnut butter · Uramaki lobster roll · Foie gras terrine with brioche, grapes & Sauternes · Wagyu sando with black truffle · Jamón de Bellota on pan de cristal',
      },
      {
        course: 'Main Course & Desserts',
        dish: 'US Beef Fillet with potato mille-feuille, black truffle & port wine sauce (custom non-meat main upon dietary notice) · Marron glacé délice & Panettone with mascarpone cream',
      },
      {
        course: 'After-Midnight Club (DJs Anyma Blue & Michel Corradi)',
        dish: 'Club entry from 00:00 at €40 incl. 1st drink (extra drinks €20) · Bottle Service Tables from 23:30: 1–4 pax 1 bottle, 5–8 pax 2 bottles from official bottle list',
      },
    ],
    beverages: 'Water and coffee included in the €170 Gala Dinner. Official wine & bottle list from €45 to €1,300 (Champagne from €160, Spirits from €160).',
    imageSrc: '/images/events/t031-menus/menu-jazz-cafe-milano-nye-2027.webp',
    imageAlt: 'Jazz Cafe Milano · Official Orient Express €170 Dinner & €40 After-Midnight Brochure NYE 2027',
  },
];

const CLOSED_VENUE_META: Record<
  string,
  {
    name: string;
    city: string;
    province?: string;
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
    alternatives: [
      'capodanno-gate-milano',
      'capodanno-justme-milano-torre-branca',
      'capodanno-pineta-milano',
      'capodanno-magazzini-generali-milano',
      'capodanno-repvblic-milano',
      'capodanno-voya-rooftop-milano',
    ],
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
    reasonIt: 'La navigazione turistica sui Navigli (Navigami) non organizza feste o cenoni di Capodanno a bordo la notte del 31 dicembre 2026: l’esperienza è pertanto dichiarata Sold Out.',
    reasonEn: 'Navigli boat tour operator Navigami does not host New Year’s Eve gala dinners or countdown cruises on December 31, 2026, so this option is marked Sold Out.',
    alternatives: ['capodanno-tram-storico-milano-atmosfera', 'capodanno-bischeri-milano', 'capodanno-bobino-milano'],
  },
  'capodanno-backdoor43-milano': {
    name: 'BackDoor43 Milano',
    city: 'Milano',
    address: 'Ripa di Porta Ticinese 43, 20143 Milano',
    reasonIt: 'Il Farmily Group ha confermato ufficialmente che BackDoor43 rimane chiuso dal 30 dicembre 2026 al 1° gennaio 2027 inclusi. L’evento è dichiarato Sold Out e non prenotabile per San Silvestro.',
    reasonEn: 'Farmily Group officially confirmed that BackDoor43 is closed from December 30, 2026 through January 1, 2027 inclusive. Consequently, this venue is marked Sold Out for New Year’s Eve.',
    alternatives: ['capodanno-terrazza-duomo-21', 'capodanno-radio-rooftop-milano', 'capodanno-voya-rooftop-milano'],
  },
  'capodanno-palace-grand-hotel-varese': {
    name: 'Palace Grand Hotel Varese',
    city: 'Varese',
    address: 'Via Luciano Manara 11, 21100 Varese',
    reasonIt: 'Il Palace Grand Hotel Varese è chiuso per importanti lavori di ristrutturazione e riaprirà a maggio 2027. La serata di Capodanno 2027 risulta pertanto Sold Out senza disponibilità.',
    reasonEn: 'Palace Grand Hotel Varese is closed for major restoration works with reopening scheduled for May 2027. New Year’s Eve 2027 is therefore marked Sold Out with no availability.',
    alternatives: ['capodanno-hotel-barchetta-excelsior-como', 'capodanno-albergo-terminus-como', 'capodanno-terrazza-duomo-21'],
  },
  'capodanno-legend-club-milano': {
    name: 'Legend Club Milano',
    city: 'Milano',
    address: 'Viale Enrico Fermi 98, 20161 Milano',
    reasonIt: 'La direzione del Legend Club Milano ha confermato ufficialmente via email che non è previsto alcun evento la notte del 31 dicembre 2026: l’appuntamento è dichiarato Sold Out.',
    reasonEn: 'Legend Club Milano management officially confirmed by email that no New Year’s Eve event is scheduled for December 31, 2026, so this venue is marked Sold Out.',
    alternatives: ['capodanno-alcatraz-milano', 'capodanno-magazzini-generali-milano', 'capodanno-gate-milano'],
  },
  'capodanno-nidaba-theatre-navigli': {
    name: 'Nidaba Theatre Navigli',
    city: 'Milano',
    address: 'Via Emilio Gola 12, 20143 Milano',
    reasonIt: 'Il Nidaba Theatre sui Navigli ha confermato ufficialmente via email di restare sempre chiuso a Capodanno: nessuna serata in programma il 31 dicembre 2026 (Sold Out).',
    reasonEn: 'Nidaba Theatre in Navigli officially confirmed by email that the venue is always closed on New Year’s Eve: no December 31, 2026 event scheduled (Sold Out).',
    alternatives: ['capodanno-blue-note-milano-concerto-gospel-jazz', 'capodanno-bobino-milano', 'capodanno-bischeri-milano'],
  },
  'capodanno-brescia-art-club-desenzano-circus-beatclub': {
    name: 'Circus Beatclub Brescia & Art Club Desenzano',
    city: 'Brescia / Desenzano del Garda',
    address: 'Via Dalmazia 127, Brescia · Desenzano del Garda (BS)',
    reasonIt: 'Il Circus Beatclub Brescia ha confermato direttamente la chiusura per la notte del 31 dicembre 2026 e la scheda è dichiarata Sold Out senza disponibilità su Nightlife Milan.',
    reasonEn: 'Circus Beatclub Brescia directly confirmed it is closed on December 31, 2026 and this event listing is marked Sold Out with no availability on Nightlife Milan.',
    alternatives: [
      'capodanno-justme-garda-lake',
      'capodanno-lago-di-garda-sesto-senso-coco-beach',
      'capodanno-in-villa-borromeo-fenaroli-reale',
    ],
  },
  'capodanno-castello-di-malpaga': {
    name: 'Castello di Malpaga',
    city: 'Cavernago (BG)',
    province: 'BG',
    address: 'Piazza Castello, 24050 Cavernago (BG)',
    reasonIt: 'Il Castello di Malpaga (Piazza Castello, Cavernago, Bergamo) non ha disponibilità per la notte del 31 dicembre 2026: la scheda di Capodanno 2027 è ufficialmente dichiarata Sold Out su Nightlife Milan.',
    reasonEn: 'Castello di Malpaga (Piazza Castello, Cavernago, Bergamo) has no availability for December 31, 2026: New Year’s Eve 2027 is officially marked Sold Out on Nightlife Milan.',
    alternatives: [
      'capodanno-in-villa-borromeo-fenaroli-reale',
      'capodanno-bergamo-setai-club-bobadilla',
      'capodanno-il-gattopardo-milano',
    ],
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
    closedTag: 'Sold Out Capodanno 2027',
    bannerPrefix: 'SOLD OUT CAPODANNO 2027 · STRUTTURA CHIUSA IL 31 DICEMBRE 2026',
    altHeading: 'Alternative Aperte e Confermate per Capodanno 2027',
    altSub: 'Scopri qui sotto le migliori location aperte e prenotabili per la notte del 31 dicembre 2026:',
  },
  en: {
    closedTag: 'Sold Out NYE 2027',
    bannerPrefix: 'SOLD OUT NYE 2027 · VENUE CLOSED ON DECEMBER 31, 2026',
    altHeading: 'Confirmed Open Alternatives for NYE 2027',
    altSub: 'Explore verified Milan & Lombardy venues officially open and bookable for December 31, 2026:',
  },
  es: {
    closedTag: 'Sold Out Nochevieja 2027',
    bannerPrefix: 'SOLD OUT NOCHEVIEJA 2027 · LOCAL CERRADO EL 31 DE DICIEMBRE DE 2026',
    altHeading: 'Alternativas Abiertas y Confirmadas para Nochevieja 2027',
    altSub: 'Descubre abajo los mejores locales abiertos y reservables para el 31 de diciembre de 2026:',
  },
  fr: {
    closedTag: 'Sold Out Nouvel An 2027',
    bannerPrefix: 'SOLD OUT NOUVEL AN 2027 · ÉTABLISSEMENT FERMÉ LE 31 DÉCEMBRE 2026',
    altHeading: 'Alternatives Ouvertes et Confirmées pour le Nouvel An 2027',
    altSub: 'Découvrez ci-dessous les lieux officiellement ouverts et réservables pour le 31 décembre 2026 :',
  },
  de: {
    closedTag: 'Sold Out Silvester 2027',
    bannerPrefix: 'SOLD OUT SILVESTER 2027 · LOCATION AM 31. DEZEMBER 2026 GESCHLOSSEN',
    altHeading: 'Bestätigte Geöffnete Alternativen für Silvester 2027',
    altSub: 'Entdecken Sie unten offiziell geöffnete und buchbare Locations für den 31. Dezember 2026:',
  },
  pt: {
    closedTag: 'Sold Out Réveillon 2027',
    bannerPrefix: 'SOLD OUT RÉVEILLON 2027 · LOCAL FECHADO EM 31 DE DEZEMBRO DE 2026',
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

  if (slug === 'capodanno-tram-storico-milano-atmosfera') {
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '19:00', label: 'Partenza 1° Turno Tram ATMosfera da Piazza Castello 2 (cenone itinerante fino alle 21:30, tariffa 130€)' },
          { time: '22:45', label: 'Partenza 2° Turno di Mezzanotte da Piazza Castello 2 (cenone completo, tariffa 150€)' },
          { time: '00:00', label: 'Brindisi di mezzanotte a bordo con cotechino, lenticchie e flûte di bollicine attraverso Milano' },
          { time: '01:00', label: 'Rientro conclusivo al capolinea di Piazza Castello 2 nel centro storico' },
        ]
      : [
          { time: '19:00', label: '1st Seating departure from Piazza Castello 2 aboard historic ATMosfera tram (€130, ends 21:30)' },
          { time: '22:45', label: '2nd Midnight Seating departure from Piazza Castello 2 (€150 per guest)' },
          { time: '00:00', label: 'Midnight sparkling toast with traditional cotechino & lentils cruising past Milan landmarks' },
          { time: '01:00', label: 'Final drop-off back at Piazza Castello 2 in the historic center' },
        ];

    return {
      title: isIt
        ? 'Capodanno Tram Storico ATMosfera Milano 2027 · Cenone Itinerante'
        : 'ATMosfera Historic Tram Restaurant Milan NYE 2027 · Rolling Gala Dinner',
      subtitle: isIt
        ? 'Piazza Castello 2, 20121 Milano · 1° Turno 19:00 (130€) · 2° Turno Mezzanotte 22:45 (150€) · Max 8 persone'
        : 'Piazza Castello 2, 20121 Milan · 1st Seating 19:00 (€130) · 2nd Midnight Seating 22:45 (€150) · Max 8 guests',
      description: isIt
        ? 'Festeggia il Capodanno 2027 a bordo dei tram storici ATMosfera 1 e 2 di ATM Milano attraverso il cuore illuminato della città, con partenza da Piazza Castello 2. Il listino ufficiale prevede due turni il 31 dicembre 2026: 1° Turno 19:00–21:30 a 130€ a persona oppure 2° Turno di Mezzanotte dalle 22:45 a 150€ a persona (prenotazioni fino a max 8 persone; scelta tra menù Carne, Pesce o Vegetariano comprensivo di entrée di benvenuto con calice di bollicine, antipasto, primo, secondo, dessert, 1 bottiglia di vino ogni 2 persone, acqua e caffè). La gestione della prenotazione sul portale ufficiale viene curata dal nostro Concierge dopo verifica disponibilità.'
        : 'Celebrate New Year’s Eve 2027 aboard ATM Milano’s historic ATMosfera 1 and 2 dining trams departing from Piazza Castello 2. Official Dec 31, 2026 seatings: 1st Seating 19:00–21:30 (€130 per person) or 2nd Midnight Seating from 22:45 (€150 per person), up to 8 guests per booking. Choose Carne (Meat), Pesce (Fish), or Vegetarian 4-course menu including welcome entrée + sparkling flûte, wine (1 bottle per 2 guests), water & coffee. Official reservation managed by our Concierge.',
      musicAndFormat: isIt
        ? 'Cenone Gourmet Itinerante su Tram Storico anni ’20 ATMosfera 1 e 2 · Menù Carne, Pesce o Vegetariano'
        : 'Rolling Gourmet Gala Dinner aboard 1920s Historic Trams ATMosfera 1 & 2 · Meat, Fish or Vegetarian Menu',
      dressCode: isIt ? 'Smart Chic / Elegante di San Silvestro' : 'Smart Chic / Evening Elegant',
      priceSummary: isIt
        ? '1° Turno (19:00–21:30) 130€ · 2° Turno Mezzanotte (22:45) 150€ · Max 8 ospiti per prenotazione'
        : '1st Seating (19:00–21:30) €130 · 2nd Midnight Seating (22:45) €150 · Max 8 guests per booking',
      tiers: isIt
        ? [
            {
              label: '1° Turno Cenone San Silvestro ATMosfera (19:00 – 21:30)',
              price: '130€',
              details: 'Menù completo a scelta (Carne, Pesce o Vegetariano) con entrée + flûte, antipasto, primo, secondo, dessert, 1 bottiglia vino ogni 2, acqua e caffè (max 8 pax).',
            },
            {
              label: '2° Turno Cenone di Mezzanotte ATMosfera (ore 22:45)',
              price: '150€',
              details: 'Cenone completo a bordo con brindisi di mezzanotte, cotechino e lenticchie tra Piazza Castello, Duomo e Brera (max 8 pax).',
            },
          ]
        : [
            {
              label: '1st Seating NYE Rolling Dinner (19:00 – 21:30)',
              price: '€130',
              details: 'Complete Meat, Fish, or Vegetarian 4-course menu with welcome entrée + sparkling flûte, 1 wine bottle per 2, water & coffee (max 8 guests).',
            },
            {
              label: '2nd Midnight Seating NYE Rolling Dinner (22:45)',
              price: '€150',
              details: 'Full rolling dinner with midnight toast, traditional cotechino & lentils through central Milan (max 8 guests).',
            },
          ],
      highlights: isIt
        ? [
            'Partenza esclusiva da Piazza Castello 2 a bordo dei tram storici restaurati ATMosfera 1 e 2',
            'Due turni confermati: 19:00–21:30 (130€) e turno di mezzanotte dalle 22:45 (150€)',
            'Menù stagionali a scelta: Carne, Pesce o Vegetariano + 1 bottiglia di vino ogni 2 ospiti',
            'Massimo 8 persone per prenotazione · Gestione prenotazione curata dal Concierge Nightlife Milan',
          ]
        : [
            'Exclusive departure from Piazza Castello 2 aboard restored vintage trams ATMosfera 1 & 2',
            'Two official seatings: 19:00–21:30 (€130) and 22:45 midnight seating (€150)',
            'Choice of Meat, Fish, or Vegetarian seasonal menus + 1 bottle of wine per 2 guests',
            'Maximum 8 guests per booking · Reservation secured by Nightlife Milan Concierge',
          ],
      sourceBasis: isIt
        ? 'Tariffe e condizioni ufficiali ATM Milano per Tram Ristorante ATMosfera (1° turno 130€, 2° turno 150€, max 8 ospiti). La prenotazione viene gestita dal nostro Concierge sul portale ufficiale previa verifica disponibilità.'
        : 'Official ATM Milano rate card for ATMosfera Dining Tram (1st seating €130, 2nd seating €150, max 8 guests). Booking managed on the official portal by Nightlife Milan Concierge upon availability check.',
      scheduleHeading: isIt ? 'Turni & Percorso 31 Dicembre 2026 · ATMosfera' : 'Seatings & Route Dec 31, 2026 · ATMosfera',
      schedule,
      menusHeading: isIt ? 'Proposte Menù a Bordo (Carne, Pesce, Vegetariano)' : 'On-Board Menus (Meat, Fish, Vegetarian)',
      menus: isIt
        ? [
            {
              id: 'atmosfera-menu-overview',
              title: 'ATMosfera Tram · Percorso Gastronomico di San Silvestro',
              price: '130€ / 150€',
              subtitle: 'Scelta obbligatoria al momento della prenotazione tra Menù di Carne, di Pesce o Vegetariano',
              courses: [
                { course: 'Benvenuto', dish: 'Entrée dello chef con calice di bollicine di benvenuto al posto riservato' },
                { course: 'Antipasto, Primo & Secondo', dish: 'Tre proposte dedicate (Carne, Pesce oppure Vegetariano) preparate espressamente per i tram ATMosfera' },
                { course: 'Dessert & Mezzanotte (2° Turno)', dish: 'Dessert di pasticceria, flûte di brindisi di mezzanotte e cotechino con lenticchie nel turno delle 22:45' },
              ],
              beverages: '1 bottiglia di vino ogni 2 persone, acqua naturale/frizzante e caffè inclusi nella tariffa.',
            },
          ]
        : [
            {
              id: 'atmosfera-menu-overview',
              title: 'ATMosfera Tram · NYE Rolling Gourmet Experience',
              price: '€130 / €150',
              subtitle: 'Advance choice required among Meat, Fish, or Vegetarian 4-course menu',
              courses: [
                { course: 'Welcome', dish: 'Chef’s welcome entrée paired with a complimentary sparkling flûte' },
                { course: 'Starter, First & Main Course', dish: 'Dedicated Meat, Fish, or Vegetarian recipes freshly plated aboard ATMosfera 1 & 2' },
                { course: 'Dessert & Midnight Ritual (2nd Seating)', dish: 'Artisanal dessert plus midnight sparkling toast with cotechino & lentils on the 22:45 run' },
              ],
              beverages: 'Includes 1 bottle of wine every 2 guests, still/sparkling water, and coffee.',
            },
          ],
      offerPricesEur: [130, 150],
    };
  }

  if (slug === 'capodanno-teatro-manzoni-milano') {
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '17:00', label: 'Prima replica di Capodanno «...e fuori nevica» con Vincenzo Salemme (biglietti 40€–67€)' },
          { time: '20:00', label: 'Cena opzionale pre-spettacolo al Bistrot Fioraio Bianchi nel foyer (100€, solo cena)' },
          { time: '21:30', label: 'Replica serale speciale di San Silvestro (70€–130€) seguita dal brindisi di mezzanotte in sala con gli attori' },
        ]
      : [
          { time: '17:00', label: 'First NYE matinee performance of Vincenzo Salemme «...e fuori nevica» (€40–€67)' },
          { time: '20:00', label: 'Optional NYE Bistrot dinner at Fioraio Bianchi inside the foyer (€100, dinner only)' },
          { time: '21:30', label: 'Special evening performance (€70–€130) followed by a midnight toast on stage with the cast' },
        ];

    return {
      title: isIt
        ? 'Capodanno Teatro Manzoni Milano 2027 · Vincenzo Salemme & Bistrot'
        : 'Teatro Manzoni Milan NYE 2027 · Vincenzo Salemme & Foyer Bistrot',
      subtitle: isIt
        ? 'Via Alessandro Manzoni 42, 20121 Milano · Ore 17:00 (40€–67€) & Ore 21:30 + Brindisi Cast (70€–130€) · Cena Bistrot 20:00 (100€)'
        : 'Via Alessandro Manzoni 42, 20121 Milan · 17:00 (€40–€67) & 21:30 + Cast Toast (€70–€130) · Bistrot Dinner 20:00 (€100)',
      description: isIt
        ? 'Festeggia il Capodanno 2027 al Teatro Manzoni di Milano (Via Alessandro Manzoni 42) con la celebre commedia «...e fuori nevica» di e con Vincenzo Salemme. Il 31 dicembre 2026 sono previste due repliche: pomeridiana delle 17:00 (Poltrona 40€, Poltronissima 56€, Prestige 67€) e replica speciale di San Silvestro delle 21:30 con brindisi di mezzanotte insieme alla compagnia (Poltrona 70€, Poltronissima 110€, Prestige 130€). Alle ore 20:00 è inoltre disponibile la cena opzionale al Bistrot Fioraio Bianchi nel foyer a 100€ a persona (nota importante: i 100€ riguardano esclusivamente la cena e vanno acquistati separatamente dai biglietti dello spettacolo).'
        : 'Celebrate New Year’s Eve 2027 at historic Teatro Manzoni Milan (Via Alessandro Manzoni 42) with Vincenzo Salemme in his iconic comedy «...e fuori nevica». Two performances take place on December 31, 2026: 17:00 matinee (Poltrona €40, Poltronissima €56, Prestige €67) and the 21:30 New Year’s Eve performance with a midnight toast alongside the cast (Poltrona €70, Poltronissima €110, Prestige €130). Optional 20:00 NYE dinner at Fioraio Bianchi Bistrot inside the theatre foyer is available at €100 per person (dinner only, separate from show tickets).',
      musicAndFormat: isIt
        ? 'Commedia «...e fuori nevica» con Vincenzo Salemme · Brindisi di Mezzanotte in Sala con gli Attori'
        : 'Live Comedy «...e fuori nevica» starring Vincenzo Salemme · Midnight Toast with the Cast',
      dressCode: isIt ? 'Elegante da Teatro / Abito Scuro o Cocktail' : 'Theatre Evening Attire / Smart Elegant',
      priceSummary: isIt
        ? 'Spettacolo 17:00: 40€/56€/67€ · Spettacolo 21:30 + Brindisi: 70€/110€/130€ · Cena Bistrot ore 20:00 (solo cena): 100€'
        : '17:00 Show: €40/€56/€67 · 21:30 Show + Toast: €70/€110/€130 · 20:00 Bistrot Dinner (dinner only): €100',
      tiers: isIt
        ? [
            {
              label: 'Spettacolo ore 21:30 · Poltronissima Prestige (con brindisi cast)',
              price: '130€',
              details: 'Posto centrale di prestigio per la recita di Capodanno ore 21:30 incluso brindisi di mezzanotte con Vincenzo Salemme e la compagnia.',
            },
            {
              label: 'Spettacolo ore 21:30 · Poltronissima / Poltrona (con brindisi)',
              price: '110€ / 70€',
              details: 'Poltronissima 110€ oppure Poltrona 70€ per la recita serale di San Silvestro delle 21:30 con brindisi finale.',
            },
            {
              label: 'Cena di Capodanno Bistrot Fioraio Bianchi (ore 20:00 · solo cena)',
              price: '100€',
              details: 'Cena servita nel foyer alle 20:00 (bevande incluse su conferma bistrot; NON comprende il biglietto dello spettacolo teatrale).',
            },
            {
              label: 'Pomeridiana San Silvestro ore 17:00 (Prestige / Poltronissima / Poltrona)',
              price: '67€ / 56€ / 40€',
              details: 'Recita pomeridiana del 31 dicembre alle 17:00 ideale prima di un cenone o di un party di mezzanotte.',
            },
          ]
        : [
            {
              label: '21:30 Show · Poltronissima Prestige (with cast midnight toast)',
              price: '€130',
              details: 'Prime front-center seating for the 21:30 NYE show including the midnight toast on stage with Vincenzo Salemme and cast.',
            },
            {
              label: '21:30 Show · Poltronissima / Poltrona (with cast toast)',
              price: '€110 / €70',
              details: 'Poltronissima €110 or Poltrona €70 for the 21:30 New Year’s Eve performance with midnight toast.',
            },
            {
              label: '20:00 NYE Dinner at Bistrot Fioraio Bianchi (dinner only)',
              price: '€100',
              details: 'Optional 20:00 foyer bistrot dinner inside Teatro Manzoni (does NOT include theatre show tickets).',
            },
            {
              label: '17:00 Matinee Show (Prestige / Poltronissima / Poltrona)',
              price: '€67 / €56 / €40',
              details: 'December 31 afternoon performance at 17:00 before your midnight gala.',
            },
          ],
      highlights: isIt
        ? [
            'Vincenzo Salemme in scena il 31 dicembre 2026 con la commedia «...e fuori nevica»',
            'Recita serale ore 21:30 con brindisi di mezzanotte insieme alla compagnia (70€–130€)',
            'Cena opzionale ore 20:00 nel foyer al Bistrot Fioraio Bianchi a 100€ (separata dal biglietto teatro)',
            'Replica pomeridiana ore 17:00 disponibile a 40€ / 56€ / 67€',
          ]
        : [
            'Vincenzo Salemme live on December 31, 2026 performing «...e fuori nevica»',
            '21:30 NYE evening show including midnight toast with the cast (€70–€130)',
            'Optional 20:00 Fioraio Bianchi foyer Bistrot dinner at €100 (sold separately from show tickets)',
            '17:00 afternoon show also available at €40 / €56 / €67',
          ],
      sourceBasis: isIt
        ? 'Listino ufficiale Teatro Manzoni Milano e risposta ufficiale banqueting Fioraio Bianchi per Capodanno 2027 (cena 100€ separata dai biglietti teatrali).'
        : 'Official Teatro Manzoni Milan box-office list and Fioraio Bianchi foyer bistrot reply for NYE 2027 (€100 dinner separate from theatre tickets).',
      scheduleHeading: isIt ? 'Programma 31 Dicembre 2026 · Teatro Manzoni' : 'Schedule Dec 31, 2026 · Teatro Manzoni',
      schedule,
      offerPricesEur: [130, 110, 100, 67],
    };
  }

  if (slug === 'capodanno-jazz-cafe-milano') {
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '20:30', label: 'Arrivo e Aperitivo di benvenuto con calice di Ca’ del Bosco · Inizio Cena Gala Orient Express (170€)' },
          { time: '23:30', label: 'Apertura Tavoli Dopocena Privé con servizio bottiglia (1 bottiglia 1–4 pax, 2 bottiglie 5–8 pax)' },
          { time: '00:00', label: 'Brindisi di mezzanotte con Champagne R de Ruinart e apertura Club con i DJ Anyma Blue e Michel Corradi (40€ 1 drink · fino alle 05:00)' },
        ]
      : [
          { time: '20:30', label: 'Doors open & Ca’ del Bosco welcome toast · Orient Express Gala Dinner Show begins (€170)' },
          { time: '23:30', label: 'After-Midnight Privé Bottle Service Tables open (1 bottle for 1–4 guests, 2 bottles for 5–8 guests)' },
          { time: '00:00', label: 'Midnight Champagne R de Ruinart toast and Club night with DJs Anyma Blue & Michel Corradi (€40 incl. 1st drink · until 05:00)' },
        ];

    return {
      title: isIt
        ? 'Capodanno Jazz Cafe Milano 2027 · Una Notte a Bordo dell’Orient Express'
        : 'Jazz Cafe Milano NYE 2027 · A Night Aboard the Orient Express',
      subtitle: isIt
        ? 'Corso Sempione 8, 20154 Milano · Cena Gala Orient Express 170€ (Brindisi R de Ruinart) · Ingresso Club 40€ · DJ Anyma Blue & Michel Corradi'
        : 'Corso Sempione 8, 20154 Milan · Orient Express Gala Dinner €170 (R de Ruinart Toast) · After-Midnight Entry €40 · DJs Anyma Blue & Michel Corradi',
      description: isIt
        ? 'Festeggia il Capodanno 2027 al Jazz Cafe Milano (Corso Sempione 8, zona Sempione / Arco della Pace) con la notte a tema «Una notte a bordo dell’Orient Express». Dalle 20:30 va in scena la Cena Gourmet con Dinner Show a 170€ a persona (acqua, caffè e calice di brindisi R de Ruinart a mezzanotte compresi; vini esclusi, pagamento anticipato a conferma). Dalle 23:30 Tavoli con bottiglia (1 bottiglia per 1–4 persone, 2 bottiglie per 5–8 persone) e dalle 00:00 Ingresso Dopo Mezzanotte con prima consumazione a 40€ (consumazioni successive 20€) sui set dei DJ Anyma Blue e Michel Corradi fino alle 05:00.'
        : 'Celebrate New Year’s Eve 2027 at historic Jazz Cafe Milano (Corso Sempione 8) with «A Night Aboard the Orient Express». From 20:30 enjoy the €170 Orient Express Gourmet Dinner Show including welcome Ca’ del Bosco, water, coffee, and an R de Ruinart Champagne midnight toast (wines excluded; advance prepayment required). From 23:30 book Bottle Service Tables (1 bottle 1–4 guests, 2 bottles 5–8 guests) or enter from 00:00 at €40 including your first drink (€20 extra drinks) with DJs Anyma Blue & Michel Corradi until 05:00.',
      musicAndFormat: isIt
        ? 'Dinner Show Orient Express (20:30) + Clubbing fino alle 05:00 con DJ Anyma Blue e Michel Corradi'
        : 'Orient Express Dinner Show (20:30) + After-Midnight Club with DJs Anyma Blue & Michel Corradi',
      dressCode: isIt ? 'Elegante / Smart Chic Orient Express' : 'Smart Chic / Orient Express Glam',
      priceSummary: isIt
        ? 'Cena Gala Orient Express 170€ (Brindisi R de Ruinart incluso) · Ingresso Dopo Mezzanotte 40€ (1 drink) · Tavoli 1–4 pax 1 bott. / 5–8 pax 2 bott.'
        : 'Orient Express Gala Dinner €170 (R de Ruinart Toast incl.) · After-Midnight Entry €40 (1 drink) · Tables 1–4 pax 1 btl / 5–8 pax 2 btls',
      tiers: isIt
        ? [
            {
              label: 'Cena Gala & Dinner Show Orient Express (dalle 20:30)',
              price: '170€',
              details: 'Calice di benvenuto Ca’ del Bosco, 8 antipasti gourmet da condivisione (ostriche, astice, wagyu, foie gras), Filetto di manzo USA o alternativa senza carne su segnalazione, dessert e brindisi R de Ruinart; acqua e caffè inclusi, vini esclusi.',
            },
            {
              label: 'Ingresso Dopo Mezzanotte (dalle 00:00 · Club)',
              price: '40€',
              details: 'Include ingresso per chi non cena, prima consumazione e DJ set con Anyma Blue e Michel Corradi fino alle 05:00 (consumazioni successive 20€).',
            },
            {
              label: 'Tavolo Dopocena Privé (dalle 23:30 · 1–4 pax / 5–8 pax)',
              price: 'Su richiesta (1–2 bottiglie)',
              details: 'Prenotazione tavolo da bottle list ufficiale (1 bottiglia per 1–4 ospiti, 2 bottiglie per 5–8 ospiti; champagne da 160€, vodka/distillati da 160€–200€). Conferma tramite WhatsApp Concierge +39 351 912 7047.',
            },
          ]
        : [
            {
              label: 'Orient Express Gala Dinner Show (from 20:30)',
              price: '€170',
              details: 'Welcome Ca’ del Bosco glass, 8 gourmet sharing starters (oysters, lobster roll, wagyu, foie gras), US beef fillet or custom alternative, desserts, R de Ruinart toast; water & coffee included, wines excluded.',
            },
            {
              label: 'After-Midnight Club Admission (from 00:00)',
              price: '€40',
              details: 'Includes club entry for non-diners, first drink, and DJ sets by Anyma Blue & Michel Corradi until 05:00 (additional drinks €20).',
            },
            {
              label: 'After-Midnight Bottle Service Table (from 23:30 · 1–4 / 5–8 pax)',
              price: 'Upon request (1–2 bottles)',
              details: 'Table reservation from official bottle list (1 bottle for 1–4 guests, 2 bottles for 5–8 guests; Champagne from €160, spirits €160–€200). Confirm via WhatsApp Concierge +39 351 912 7047.',
            },
          ],
      highlights: isIt
        ? [
            'Una Notte a Bordo dell’Orient Express nella cornice storica di Corso Sempione 8 (dal 1995)',
            'Cena Gourmet Orient Express 170€ con 8 antipasti d’autore, filetto USA e brindisi R de Ruinart',
            'Ingresso Dopo Mezzanotte a 40€ (1 drink) · consumazioni extra 20€',
            'DJ set con Anyma Blue & Michel Corradi · Tavoli dalle 23:30 da 1 bottiglia (1–4 pax) o 2 bottiglie (5–8 pax)',
          ]
        : [
            'Orient Express Gala Night at Milan institution Jazz Cafe (Corso Sempione 8, est. 1995)',
            '€170 Gala Dinner Show with 8 signature starters, US beef fillet & R de Ruinart midnight toast',
            'After-Midnight Club Entry at €40 including first drink (additional drinks €20)',
            'DJs Anyma Blue & Michel Corradi · Bottle Service Tables from 23:30 (1 bottle 1–4 pax / 2 bottles 5–8 pax)',
          ],
      sourceBasis: isIt
        ? 'Brochure e listino ufficiali Jazz Cafe Milano Capodanno 2027 (Orient Express 170€, Dopo Mezzanotte 40€, Tavoli 1–2 bottiglie). Esigenze alimentari da segnalare in fase di prenotazione.'
        : 'Official Jazz Cafe Milano NYE 2027 brochure and rate card (Orient Express Dinner €170, After-Midnight €40, Bottle Tables 1–2 bottles). Please flag dietary requirements at booking.',
      scheduleHeading: isIt ? 'Programma 31 Dicembre 2026 · Jazz Cafe Milano' : 'Schedule Dec 31, 2026 · Jazz Cafe Milano',
      schedule,
      menusHeading: isIt ? 'Menù Gala Orient Express 170€ & Dopo Mezzanotte 40€' : 'Orient Express €170 Menu & €40 After-Midnight Brochure',
      menus: isIt ? JAZZ_CAFE_MENU_IT : JAZZ_CAFE_MENU_EN,
      offerPricesEur: [170, 40],
    };
  }

  if (slug === 'capodanno-armani-prive-milano') {
    return {
      title: isIt
        ? 'Capodanno Armani/Privé Milano 2027 · Quadrilatero della Moda'
        : 'Armani/Privé Milan NYE 2027 · Fashion District Club',
      subtitle: isIt
        ? 'Via Gastone Pisoni 3, 20121 Milano · Programma e listino ufficiali 31 dicembre 2026 in via di definizione'
        : 'Via Gastone Pisoni 3, 20121 Milan · Official December 31, 2026 program & pricing to be announced',
      description: isIt
        ? 'Capodanno 2027 ad Armani/Privé Milano (Via Gastone Pisoni 3, Quadrilatero della Moda): la direzione del club ha confermato ufficialmente che il programma e il listino per la notte di giovedì 31 dicembre 2026 non sono ancora stati rilasciati. Non pubblichiamo prezzi stimati: scrivi al Concierge Nightlife Milan su WhatsApp +39 351 912 7047 per entrare nella lista d’attesa prioritaria e ricevere le tariffe non appena rese pubbliche.'
        : 'New Year’s Eve 2027 at Armani/Privé Milan (Via Gastone Pisoni 3, Quadrilatero della Moda): club management confirmed that the official December 31, 2026 program and rate card have not been finalized yet. Join the Nightlife Milan Concierge waitlist on WhatsApp +39 351 912 7047 to receive official table and admission pricing the moment it is released.',
      musicAndFormat: isIt
        ? 'Luxury Fashion Club · Programma House & Deep Fashion 2027 in attesa di annuncio ufficiale'
        : 'Luxury Fashion Club · 2027 Program Pending Official Release',
      dressCode: isIt ? 'Alta Moda / Elegante Rigoroso (selezione all’ingresso)' : 'Strict Haute Couture / Evening Elegant',
      priceSummary: isIt
        ? 'Programma e prezzi 2027 non ancora usciti · Lista d’attesa prioritaria su WhatsApp +39 351 912 7047'
        : '2027 program & pricing not yet announced · Priority waitlist via WhatsApp +39 351 912 7047',
      tiers: isIt
        ? [
            {
              label: 'Lista d’attesa Tavoli Privé & Ingresso (in uscita)',
              price: 'Su richiesta',
              details: 'La direzione non ha ancora pubblicato il programma NYE 2027. Contatta WhatsApp +39 351 912 7047 per ricevere in anteprima il listino ufficiale.',
            },
          ]
        : [
            {
              label: 'Priority Waitlist · Privé Tables & Admission',
              price: 'TBA',
              details: 'Management has not finalized the NYE 2027 schedule yet. Message WhatsApp +39 351 912 7047 for instant notification once published.',
            },
          ],
      highlights: isIt
        ? [
            'Club esclusivo del Gruppo Armani in Via Gastone Pisoni 3, Quadrilatero della Moda',
            'Aggiornamento ufficiale diretto dal club: programma Capodanno 2027 non ancora definito',
            'Nessun prezzo inventato: servizio gratuito di lista prioritaria su WhatsApp +39 351 912 7047',
          ]
        : [
            'Signature fashion club at Via Gastone Pisoni 3 in Milan’s Fashion District',
            'Verified club update: NYE 2027 program not yet finalized',
            'Zero placeholder prices: free priority waitlist alert on WhatsApp +39 351 912 7047',
          ],
      sourceBasis: isIt
        ? 'Verifica diretta tramite risposta ufficiale Armani/Privé Milano: programmazione e prezzi di San Silvestro 2026/2027 non ancora usciti. Aggiornamenti su WhatsApp +39 351 912 7047.'
        : 'Direct verification from Armani/Privé Milan: Dec 31, 2026 pricing and program not yet released. Updates via WhatsApp +39 351 912 7047.',
    };
  }

  if (slug === 'capodanno-terrazza-gallia-excelsior-milano') {
    const nav = capodannoNavigation(locale);
    const w = getWords35(locale);
    const isEn = locale === 'en';
    const addr = 'Piazza Duca d’Aosta 9, 20124 Milano';
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '19:00', label: 'Apertura Cena di San Silvestro al Gallia Lounge & Bar (135€ · Menu U12 60€) con musica dal vivo' },
          { time: '19:30', label: 'Gran Cenone al Terrazza Gallia Restaurant al 7° piano: 2 portate + dolce (195€) o 3 portate + dolce (225€ · Menu U12 90€)' },
          { time: '21:30', label: 'Aperitivo Aspettando la Mezzanotte al Terrazza Gallia Bar (165€ con 1 bottiglia Champagne Pommery ogni 2 ospiti · Menu U12 80€)' },
          { time: '00:00 – 02:30', label: 'Brindisi sul rooftop panoramico, buffet di dolci, lenticchie e cotechino e DJ set al 7° piano per tutti gli ospiti' },
        ]
      : isEn
        ? [
            { time: '19:00', label: 'New Year’s Eve Dinner opens at Gallia Lounge & Bar (€135 · U12 Menu €60) with live music' },
            { time: '19:30', label: '7th-Floor Terrazza Gallia Restaurant Gala Dinner: 2 courses + dessert (€195) or 3 courses + dessert (€225 · U12 Menu €90)' },
            { time: '21:30', label: 'Countdown Aperitif at 7th-Floor Terrazza Gallia Bar (€165 incl. 1 bottle of Pommery Champagne per 2 guests · U12 Menu €80)' },
            { time: '00:00 – 02:30', label: 'Panoramic midnight toast, festive pastry buffet, lentils & cotechino and 7th-floor DJ set for all dining guests' },
          ]
        : [
            { time: '19:00', label: `Gallia Lounge & Bar · ${w.formulas.cenone} (€135 · U12 €60)` },
            { time: '19:30', label: `Terrazza Gallia Restaurant 7F · ${w.formulas.cenone} (€195 / €225 · U12 €90)` },
            { time: '21:30', label: `Terrazza Gallia Bar 7F · Champagne Pommery 1/2 (€165 · U12 €80)` },
            { time: '00:00 – 02:30', label: `Terrazza Gallia 7F · DJ Set (${w.dateBadge})` },
          ];

    const tiers: CapodannoEventTier[] = isIt
      ? [
          {
            label: 'Terrazza Gallia Restaurant (7° Piano · dalle 19:30) · 3 Portate + Dolce',
            price: '225€ (U12: 90€)',
            details: 'Calice Champagne Pommery di benvenuto + 3 portate a scelta + dolce + buffet dolci, lenticchie e cotechino + musica dal vivo e DJ set (bevande escluse).',
          },
          {
            label: 'Terrazza Gallia Restaurant (7° Piano · dalle 19:30) · 2 Portate + Dolce',
            price: '195€',
            details: 'Calice Champagne Pommery di benvenuto + 2 portate a scelta + dolce + buffet dolci, lenticchie e cotechino + musica dal vivo e DJ set (bevande escluse).',
          },
          {
            label: 'Terrazza Gallia Bar (7° Piano · dalle 21:30) · Aperitivo + Champagne Pommery',
            price: '165€ (U12: 80€)',
            details: 'Include 1 bottiglia di Champagne Pommery ogni 2 persone, caviale Imperial 10g, ostriche di Goro, foie gras, croque monsieur al tartufo, risotto allo zafferano e ossobuco, dolci e DJ set.',
          },
          {
            label: 'Gallia Lounge & Bar (19:00–22:30) · Cena + DJ Set in Terrazza dopo 00:00',
            price: '135€ (U12: 60€)',
            details: '7 antipasti gourmet in condivisione + 1 portata principale a scelta + dessert + lenticchie e cotechino (bevande escluse) + accesso al DJ set al 7° piano dopo mezzanotte.',
          },
        ]
      : isEn
        ? [
            {
              label: 'Terrazza Gallia Restaurant (7th Floor · from 19:30) · 3 Courses + Dessert',
              price: '€225 (U12: €90)',
              details: 'Welcome Pommery Champagne glass + 3 courses of your choice + dessert + sweets buffet, midnight lentils & cotechino + live music & DJ set (beverages excluded).',
            },
            {
              label: 'Terrazza Gallia Restaurant (7th Floor · from 19:30) · 2 Courses + Dessert',
              price: '€195',
              details: 'Welcome Pommery Champagne glass + 2 courses of your choice + dessert + sweets buffet, midnight lentils & cotechino + live music & DJ set (beverages excluded).',
            },
            {
              label: 'Terrazza Gallia Bar (7th Floor · from 21:30) · Aperitif + Pommery Champagne',
              price: '€165 (U12: €80)',
              details: 'Includes 1 bottle of Pommery Champagne per 2 guests, 10g Imperial caviar, Goro oysters, foie gras, truffle croque monsieur, saffron & ossobuco risotto, sweets & DJ set.',
            },
            {
              label: 'Gallia Lounge & Bar (19:00–22:30) · Dinner + Post-Midnight Rooftop DJ Set',
              price: '€135 (U12: €60)',
              details: '7 gourmet sharing starters + 1 main course of your choice + dessert + lentils & cotechino (beverages excluded) + post-midnight DJ set access on 7th-floor Terrazza Gallia.',
            },
          ]
        : [
            {
              label: `Terrazza Gallia Restaurant 7F (19:30) · 3 ${w.formulas.cenone}`,
              price: '€225 (U12 €90)',
              details: `${addr} · Pommery Champagne welcome + 3 courses + DJ Set · WhatsApp +39 351 912 7047`,
            },
            {
              label: `Terrazza Gallia Restaurant 7F (19:30) · 2 ${w.formulas.cenone}`,
              price: '€195',
              details: `${addr} · Pommery Champagne welcome + 2 courses + DJ Set · WhatsApp +39 351 912 7047`,
            },
            {
              label: `Terrazza Gallia Bar 7F (21:30) · ${w.formulas.buffet} + Champagne Pommery`,
              price: '€165 (U12 €80)',
              details: `1 Pommery Champagne / 2 ${w.guestPlural} + Caviar, Oysters, Risotto & DJ Set`,
            },
            {
              label: `Gallia Lounge & Bar (19:00) · ${w.formulas.cenone} + Rooftop DJ Set`,
              price: '€135 (U12 €60)',
              details: `19:00–22:30 + 00:00 Terrazza Gallia 7F DJ Set · WhatsApp +39 351 912 7047`,
            },
          ];

    return {
      title: isIt
        ? 'Capodanno Terrazza Gallia Milano 2027 · Excelsior Hotel Gallia 5★L (7° Piano)'
        : isEn
          ? 'Terrazza Gallia Milan NYE 2027 · 5★L Excelsior Hotel Gallia Rooftop & Dining'
          : `${nav.menuLabel} 2027 Terrazza Gallia Milano · Excelsior Hotel Gallia 5★L`,
      subtitle: isIt
        ? `${addr} · Lounge 135€ · Terrazza Bar Pommery 165€ · Terrazza Restaurant 195€ / 225€ · Live Music & DJ Set`
        : isEn
          ? `${addr} · Lounge €135 · Rooftop Bar Pommery €165 · Rooftop Restaurant €195 / €225 · Live Music & DJ Set`
          : `${addr} · ${w.dateBadge} · €135 / €165 / €195 / €225`,
      description: isIt
        ? 'Festeggia il Capodanno 2027 all’Excelsior Hotel Gallia, a Luxury Collection Hotel 5★L in Piazza Duca d’Aosta 9 a Milano, firmato dall’Executive Chef Andrea Calia Di Dio e dal Pastry Chef Francesco Gramuglia. Quattro formule ufficiali per giovedì 31 dicembre 2026, tutte con musica dal vivo e accesso al DJ set dopo mezzanotte al 7° piano panoramico di Terrazza Gallia: Cena al Gallia Lounge & Bar (19:00–22:30, 135€; Menu U12 60€), Aperitivo Aspettando la Mezzanotte al Terrazza Gallia Bar dalle 21:30 con 1 bottiglia di Champagne Pommery ogni 2 persone, caviale Imperial, ostriche e risotto allo zafferano (165€; Menu U12 80€), e Gran Cenone al Terrazza Gallia Restaurant dalle 19:30 a 2 portate + dolce (195€) o 3 portate + dolce (225€; Menu U12 90€).'
        : isEn
          ? 'Celebrate New Year’s Eve 2027 inside Milan’s iconic 5-star luxury landmark Excelsior Hotel Gallia (Piazza Duca d’Aosta 9), curated by Executive Chef Andrea Calia Di Dio and Pastry Chef Francesco Gramuglia. Four official December 31, 2026 experiences include live music and post-midnight DJ set access on the 7th-floor Terrazza Gallia rooftop: Gallia Lounge & Bar Dinner (19:00–22:30, €135; U12 €60), Terrazza Gallia Bar Countdown Aperitif from 21:30 including 1 bottle of Pommery Champagne per 2 guests, Imperial caviar, oysters & saffron risotto (€165; U12 €80), and Terrazza Gallia Restaurant Gala Dinner from 19:30 with 2 courses + dessert (€195) or 3 courses + dessert (€225; U12 €90).'
          : `${nav.h1} · Terrazza Gallia Excelsior Milano (${addr}). ${w.venueTypes.rooftop} · ${w.hoursLabel} 19:00 – 02:30 · Gallia Lounge €135, Terrazza Gallia Bar Champagne Pommery €165, Terrazza Gallia Restaurant €195 / €225. ${w.freeAdviceTpl}.`,
      musicAndFormat: isIt
        ? 'Alta Gastronomia 5★L, Musica dal Vivo & DJ Set Panoramico dopo Mezzanotte al 7° Piano'
        : isEn
          ? '5★L Fine Dining, Live Music & Post-Midnight 7th-Floor Rooftop DJ Set'
          : `${w.venueTypes.rooftop} · Live Music & DJ Set (19:00 – 02:30)`,
      dressCode: isIt
        ? 'Elegante / Gala Hotel 5 Stelle Lusso'
        : isEn
          ? '5-Star Luxury Gala / Evening Elegant'
          : `${w.dressCodeLabel}: 5★ Luxury Gala / Elegant`,
      priceSummary: isIt
        ? 'Gallia Lounge 135€ · Terrazza Bar + Pommery (1 ogni 2) 165€ · Terrazza Restaurant 195€ / 225€ · Menu U12 60€/80€/90€'
        : isEn
          ? 'Gallia Lounge €135 · Rooftop Bar + Pommery (1/2) €165 · Rooftop Restaurant €195 / €225 · U12 €60/€80/€90'
          : `${w.fromPricePrefix} €135 · €165 · €195 · €225`,
      tiers,
      highlights: isIt
        ? [
            `Location 5★ Lusso: Terrazza Gallia & Excelsior Hotel Gallia (${addr})`,
            'Terrazza Gallia Bar (21:30, 165€): include 1 bottiglia di Champagne Pommery ogni 2 ospiti, caviale e ostriche',
            'Terrazza Gallia Restaurant (19:30): Gran Cenone gourmet 195€ (2 portate) o 225€ (3 portate) + calice Pommery',
            'Gallia Lounge & Bar (19:00, 135€) con salita inclusa al DJ set dopo mezzanotte in Terrazza Gallia',
          ]
        : isEn
          ? [
              `5★ Luxury Landmark: Terrazza Gallia at Excelsior Hotel Gallia (${addr})`,
              'Terrazza Gallia Bar (21:30, €165): includes 1 bottle of Pommery Champagne per 2 guests, caviar & oysters',
              'Terrazza Gallia Restaurant (19:30): Gourmet Gala €195 (2 courses) or €225 (3 courses) + welcome Pommery',
              'Gallia Lounge & Bar (19:00, €135) including post-midnight 7th-floor Terrazza Gallia DJ set',
            ]
          : [
              `Terrazza Gallia · ${addr}`,
              `${w.dateBadge} · 19:00 – 02:30`,
              'Gallia Lounge €135 · Terrazza Bar €165 (Pommery 1/2) · Restaurant €195 / €225',
              w.freeAdviceTpl,
            ],
      sourceBasis: isIt
        ? 'Brochure e menù ufficiali Festive Season 2026/2027 Terrazza Gallia – Excelsior Hotel Gallia Milano (Lounge 135€, Bar 165€ con Champagne Pommery 1 ogni 2, Restaurant 195€/225€, tariffe U12 60€/80€/90€). Prenotazione gestita e confermata da Nightlife Milan previa verifica disponibilità.'
        : isEn
          ? 'Official Festive Season 2026/2027 brochure and menus from Terrazza Gallia – Excelsior Hotel Gallia Milan (Lounge €135, Bar €165 incl. 1 Pommery bottle per 2, Restaurant €195/€225, U12 €60/€80/€90). Booking managed and confirmed by Nightlife Milan subject to availability verification.'
          : `${w.verifiedEventsLabel} · Terrazza Gallia Milano (€135–€225) · ${w.freeAdviceTpl}`,
      scheduleHeading: isIt
        ? 'Orari & Ambienti 31 Dicembre 2026 · Terrazza Gallia'
        : isEn
          ? 'December 31, 2026 Schedule · Terrazza Gallia'
          : `${w.tocProgram} · Terrazza Gallia`,
      schedule,
      menusHeading: isIt
        ? 'I 3 Menù Ufficiali di San Silvestro 2027 · Terrazza Gallia & Lounge'
        : isEn
          ? 'Official NYE 2027 Menus · Terrazza Gallia Restaurant, Bar & Lounge'
          : `${w.tocMenuLabel} · Terrazza Gallia`,
      menus: isIt ? GALLIA_MENUS_IT : GALLIA_MENUS_EN,
      conditionsHeading: isIt ? 'Condizioni Ufficiali · Terrazza Gallia' : isEn ? 'Official Conditions · Terrazza Gallia' : w.officialConditionsHeading,
      conditions: isIt
        ? [
            'Al Terrazza Gallia Bar (165€) è inclusa 1 bottiglia di Champagne Pommery ogni 2 persone; nelle formule Restaurant (195€/225€) e Lounge (135€) i vini in abbinamento sono esclusi.',
            'Tutti gli ospiti del Gallia Lounge & Bar hanno accesso incluso al DJ set dopo mezzanotte al 7° piano in Terrazza Gallia.',
            'Tariffe ufficiali dedicate ai minori fino a 12 anni: Lounge 60€, Terrazza Bar 80€, Terrazza Restaurant 90€.',
            'Prenotazione gestita da Nightlife Milan previa verifica disponibilità con la struttura; rimborso integrale in caso di esaurimento posti.',
          ]
        : [
            'Terrazza Gallia Bar (€165) includes 1 bottle of Pommery Champagne per 2 guests; wines are excluded in the Restaurant (€195/€225) and Lounge (€135) menus.',
            'All Gallia Lounge & Bar dinner guests receive complimentary access to the post-midnight DJ set on 7th-floor Terrazza Gallia.',
            'Dedicated official rates for guests up to 12 years old: Lounge €60, Terrazza Bar €80, Terrazza Restaurant €90.',
            'Booking handled by Nightlife Milan upon live availability check with the property; full refund if sold out.',
          ],
      offerPricesEur: [135, 165, 195, 225, 60, 80, 90],
      shots: isIt
        ? ['Terrazza Gallia 7° Piano · Rooftop Panoramico Milano', 'Sala Ristorante Gourmet · Excelsior Hotel Gallia 5★L', 'Terrazza Gallia Bar · Champagne & Mixology d’Autore', 'Alta Cucina di San Silvestro · Chef Andrea Calia Di Dio']
        : ['Terrazza Gallia 7th Floor · Milan Panoramic Rooftop', 'Gourmet Dining Room · 5★L Excelsior Hotel Gallia', 'Terrazza Gallia Bar · Champagne & Signature Mixology', 'New Year’s Eve Fine Dining · Chef Andrea Calia Di Dio'],
    };
  }

  if (slug === 'capodanno-the-beach-milano') {
    const nav = capodannoNavigation(locale);
    const w = getWords35(locale);
    const isEn = locale === 'en';
    const addr = 'Via Arcangelo Corelli 62, 20134 Milano';
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '20:30', label: 'Apertura Cena di Gala Servita (150€ con Champagne a mezzanotte) e Royal Buffet (60€ con flûte + 1 drink)' },
          { time: '23:30', label: 'Apertura Ingresso Serata con brindisi di mezzanotte + 1 drink (Donna 40€ / Uomo 50€)' },
          { time: '00:15', label: 'Apertura Ingresso Dopocena con 1 drink incluso (Donna 25€ / Uomo 30€)' },
          { time: '00:30 – 05:00', label: 'Servizio Tavoli Dopocena per 5 ospiti (Basic 400€, Privé 450€, VIP 500€) e clubbing fino alle 05:00' },
        ]
      : isEn
        ? [
            { time: '20:30', label: 'Served Gala Dinner (€150 incl. midnight Champagne) and Royal Buffet (€60 incl. toast flûte + 1 drink)' },
            { time: '23:30', label: 'Pre-Midnight Club Entry with midnight toast flûte + 1 drink (Lady €40 / Man €50)' },
            { time: '00:15', label: 'After-Midnight Club Entry with 1 drink included (Lady €25 / Man €30)' },
            { time: '00:30 – 05:00', label: 'VIP Bottle Service Tables for up to 5 guests (Basic €400, Privé €450, VIP €500) & party until 05:00' },
          ]
        : [
            { time: '20:30', label: `${w.formulas.cenone} (€150) & ${w.formulas.buffet} (€60)` },
            { time: '23:30', label: `${w.formulas.dopocena} + Toast (€40 / €50)` },
            { time: '00:15', label: `${w.formulas.dopocena} + 1 Drink (€25 / €30)` },
            { time: '00:30 – 05:00', label: `${w.formulas['tavolo-vip']} 5 ${w.guestPlural} (€400 / €450 / €500)` },
          ];

    const tiers: CapodannoEventTier[] = isIt
      ? [
          {
            label: 'Cena di Gala Servita + Champagne & Party (dalle 20:30)',
            price: '150€',
            details: 'Gran Cenone servito al tavolo dalle 20:30 con brindisi Champagne di mezzanotte e serata club inclusa fino alle 05:00.',
          },
          {
            label: 'Royal Buffet + Flûte + 1 Drink & Party (dalle 20:30)',
            price: '60€',
            details: 'Buffet di San Silvestro dalle 20:30 con flûte per il brindisi di mezzanotte, 1 drink e ingresso completo al party.',
          },
          {
            label: 'Ingresso Serata dalle 23:30 (Flûte + 1 Drink)',
            price: '40€ Donna / 50€ Uomo',
            details: 'Ingresso prevendita prima di mezzanotte comprensivo di flûte per il countdown e 1 consumazione.',
          },
          {
            label: 'Ingresso Dopocena dalle 00:15 (1 Drink)',
            price: '25€ Donna / 30€ Uomo',
            details: 'Ingresso prevendita dopo la mezzanotte comprensivo di 1 consumazione.',
          },
          {
            label: 'Tavoli Dopocena (dalle 00:30 · fino a 5 ospiti inclusi)',
            price: '400€ / 450€ / 500€',
            details: 'Basic 400€ (200+200), Privé 450€ (200+250), VIP 500€ (200+300) comprensivi di 5 pass d’ingresso e credito bottiglie.',
          },
        ]
      : isEn
        ? [
            {
              label: 'Served Gala Dinner + Midnight Champagne & Party (from 20:30)',
              price: '€150',
              details: 'Full seated Gala Dinner from 20:30 with midnight Champagne toast and complete club night until 05:00.',
            },
            {
              label: 'Royal Buffet + Midnight Flûte + 1 Drink & Party (from 20:30)',
              price: '€60',
              details: 'New Year’s Eve Royal Buffet from 20:30 with midnight toast flûte, 1 drink and party admission.',
            },
            {
              label: 'Pre-Midnight Club Entry from 23:30 (Flûte + 1 Drink)',
              price: '€40 Lady / €50 Man',
              details: 'Pre-midnight admission from 23:30 including midnight sparkling toast and 1 drink.',
            },
            {
              label: 'After-Midnight Club Entry from 00:15 (1 Drink)',
              price: '€25 Lady / €30 Man',
              details: 'After-midnight admission from 00:15 including 1 drink.',
            },
            {
              label: 'After-Dinner VIP Tables (from 00:30 · up to 5 guests included)',
              price: '€400 / €450 / €500',
              details: 'Basic €400, Privé €450, VIP €500 covering 5 admissions and bottle service credit.',
            },
          ]
        : [
            { label: `${w.formulas.cenone} (20:30)`, price: '€150', details: `${addr} · Champagne + Party` },
            { label: `${w.formulas.buffet} (20:30)`, price: '€60', details: `Flûte + 1 Drink + Party` },
            { label: `${w.formulas.dopocena} (23:30)`, price: '€40 / €50', details: `Flûte + 1 Drink` },
            { label: `${w.formulas.dopocena} (00:15)`, price: '€25 / €30', details: `1 Drink · 18+` },
            { label: `${w.formulas['tavolo-vip']} (00:30 · 5 ${w.guestPlural})`, price: '€400 / €450 / €500', details: `Basic €400 · Privé €450 · VIP €500` },
          ];

    return {
      title: isIt
        ? 'Capodanno The Beach Milano 2027 · Dinner Show, Buffet 60€ & Club da 25€'
        : isEn
          ? 'The Beach Milano NYE 2027 · Dinner Show, €60 Buffet & Club from €25'
          : `${nav.menuLabel} 2027 The Beach Milano · Dinner Show & Club`,
      subtitle: isIt
        ? `${addr} · 20:30 – 05:00 · Dopocena 25€/30€ · 23:30 40€/50€ · Buffet 60€ · Gala 150€ · Tavoli 400–500€`
        : isEn
          ? `${addr} · 20:30 – 05:00 · 00:15 €25/€30 · 23:30 €40/€50 · Buffet €60 · Gala €150 · Tables €400–€500`
          : `${addr} · ${w.dateBadge} · 20:30 – 05:00 · ${w.fromPricePrefix} €25`,
      description: isIt
        ? 'Capodanno 2027 confermato al The Beach Club Milano (Via Arcangelo Corelli 62, zona Forlanini, ingresso 18+): una serata completa dalle 20:30 alle 05:00 tra Dinner Show, musica commerciale, house e urban hits. Listino ufficiale 31 dicembre 2026: Cena di Gala servita 150€ con Champagne a mezzanotte, Royal Buffet 60€ con flûte + 1 drink, Ingresso dalle 23:30 con flûte + 1 drink (Donna 40€ / Uomo 50€), Ingresso dalle 00:15 con 1 drink (Donna 25€ / Uomo 30€) e Tavoli Dopocena per 5 persone (Basic 400€, Privé 450€, VIP 500€). Acquista direttamente online su nightlifemilan.com o scrivi su WhatsApp +39 351 912 7047.'
        : isEn
          ? 'Confirmed New Year’s Eve 2027 at The Beach Club Milano (Via Arcangelo Corelli 62, ages 18+): celebrate from 20:30 until 05:00 with Dinner Show entertainment and Commercial, House & Urban clubbing. Official Dec 31, 2026 rate card: €150 Seated Gala Dinner with midnight Champagne, €60 Royal Buffet with toast flûte + 1 drink, 23:30 Pre-Midnight Entry (Lady €40 / Man €50), 00:15 Club Entry (Lady €25 / Man €30), and 5-guest VIP Tables (Basic €400, Privé €450, VIP €500). Book online on nightlifemilan.com or via WhatsApp +39 351 912 7047.'
          : `${nav.h1} · The Beach Milano (${addr}). ${w.venueTypes.discoteca} · ${w.hoursLabel} 20:30 – 05:00 · €25/€30 (00:15), €40/€50 (23:30), Buffet €60, Gala €150, VIP Tables €400–€500. ${w.freeAdviceTpl}.`,
      musicAndFormat: isIt
        ? 'Dinner Show, Royal Buffet & Clubbing Commerciale, House e Urban fino alle 05:00 (18+)'
        : isEn
          ? 'Dinner Show, Royal Buffet & Commercial, House and Urban Clubbing until 05:00 (18+)'
          : `${w.venueTypes.discoteca} · 20:30 – 05:00 (18+)`,
      dressCode: isIt
        ? 'Elegante / Smart Chic di San Silvestro (selezione 18+)'
        : isEn
          ? 'Smart Chic / New Year’s Eve Elegant (18+ door policy)'
          : `${w.dressCodeLabel}: Smart Chic / Elegant (18+)`,
      priceSummary: isIt
        ? '00:15 Donna 25€ / Uomo 30€ · 23:30 Donna 40€ / Uomo 50€ · Royal Buffet 60€ · Gala 150€ · Tavoli 5 pax 400€/450€/500€'
        : isEn
          ? '00:15 Lady €25 / Man €30 · 23:30 Lady €40 / Man €50 · Royal Buffet €60 · Gala €150 · 5-Guest Tables €400/€450/€500'
          : `${w.fromPricePrefix} €25 · Buffet €60 · Gala €150 · VIP €400–€500`,
      tiers,
      highlights: isIt
        ? [
            `Location: The Beach Club Milano (${addr}, 18+)`,
            'Ingressi prevendita ufficiali: dalle 00:15 Donna 25€ / Uomo 30€ · dalle 23:30 Donna 40€ / Uomo 50€',
            'Formule cena dalle 20:30: Royal Buffet 60€ (flûte + drink) e Cena di Gala Servita 150€ (Champagne)',
            'Tavoli Dopocena dalle 00:30 (5 ingressi inclusi): Basic 400€ · Privé 450€ · VIP 500€',
          ]
        : isEn
          ? [
              `Venue: The Beach Club Milano (${addr}, ages 18+)`,
              'Official club tickets: from 00:15 Lady €25 / Man €30 · from 23:30 Lady €40 / Man €50',
              '20:30 dining packages: €60 Royal Buffet (flûte + drink) & €150 Seated Gala Dinner (Champagne)',
              '00:30 VIP Tables (5 entries included): Basic €400 · Privé €450 · VIP €500',
            ]
          : [
              `The Beach Club Milano · ${addr}`,
              `${w.dateBadge} · 20:30 – 05:00`,
              '€25/€30 (00:15) · €40/€50 (23:30) · Buffet €60 · Gala €150 · VIP €400–€500',
              w.freeAdviceTpl,
            ],
      sourceBasis: isIt
        ? 'Listino ufficiale confermato New Year’s Eve 2027 The Beach Club Milano (Via Corelli 62): Dopocena 00:15 25€/30€, Serata 23:30 40€/50€, Royal Buffet 60€, Cena di Gala 150€, Tavoli 5 pax 400€/450€/500€. Acquisto diretto su nightlifemilan.com o WhatsApp +39 351 912 7047.'
        : isEn
          ? 'Confirmed official New Year’s Eve 2027 rate card for The Beach Club Milano (Via Corelli 62): 00:15 €25/€30, 23:30 €40/€50, Royal Buffet €60, Gala Dinner €150, 5-guest Tables €400/€450/€500. Direct booking on nightlifemilan.com or WhatsApp +39 351 912 7047.'
          : `${w.verifiedEventsLabel} · The Beach Milano (€25–€500) · ${w.freeAdviceTpl}`,
      scheduleHeading: isIt
        ? 'Programma Orario 31 Dicembre 2026 · The Beach Milano'
        : isEn
          ? 'December 31, 2026 Schedule · The Beach Milano'
          : `${w.tocProgram} · The Beach Milano`,
      schedule,
      offerPricesEur: [25, 30, 40, 50, 60, 150, 400, 450, 500],
      shots: isIt
        ? ['Main Room & Luci · The Beach Club Milano', 'Dinner Show & Tavoli Gala · Via Corelli 62', 'Privé & Bottle Service di Capodanno', 'Dancefloor & Energia della Serata · The Beach Milano']
        : ['Main Room & Lighting · The Beach Club Milano', 'Dinner Show & Gala Tables · Via Corelli 62', 'NYE Privé Booths & Bottle Service', 'Dancefloor & Party Crowd · The Beach Milano'],
    };
  }

  if (slug === 'capodanno-zelig-cabaret-milano') {
    const nav = capodannoNavigation(locale);
    const w = getWords35(locale);
    const isEn = locale === 'en';
    const addr = 'Viale Monza 140, 20127 Milano';
    const schedule: CapodannoScheduleStep[] = isIt
      ? [
          { time: '21:30', label: 'Apertura porte e accoglienza spettatori presso lo storico teatro Area Zelig in Viale Monza 140' },
          { time: '22:15', label: 'Inizio spettacolo speciale «Capodanno ad Area Zelig» in due tempi con i comici sul palco' },
          { time: '00:00', label: 'Countdown e brindisi di mezzanotte in sala insieme al cast con panettone e bollicine inclusi' },
          { time: '00:30 – 02:00', label: 'Secondo tempo comico e festeggiamenti per l’arrivo del 2027 (nota: non è previsto cenone seduto)' },
        ]
      : isEn
        ? [
            { time: '21:30', label: 'Doors open and guest seating at historic Area Zelig comedy theatre on Viale Monza 140' },
            { time: '22:15', label: 'Curtain up on the special two-act New Year’s Eve comedy variety show «Capodanno ad Area Zelig»' },
            { time: '00:00', label: 'Midnight countdown and sparkling wine + panettone toast together with the comedians' },
            { time: '00:30 – 02:00', label: 'Encore comedy act welcoming 2027 (note: theatre show format, no seated dinner)' },
          ]
        : [
            { time: '21:30', label: `Area Zelig (${addr})` },
            { time: '22:15', label: `Capodanno ad Area Zelig · Tribuna €107 / Platea €135` },
            { time: '00:00', label: `Countdown & Panettone + Spumante Toast` },
            { time: '00:30 – 02:00', label: `Act II · Area Zelig Milano` },
          ];

    const tiers: CapodannoEventTier[] = isIt
      ? [
          {
            label: 'Biglietto Settore Platea + Brindisi di Mezzanotte (ore 22:15)',
            price: '135€',
            details: 'Posto numerato ai tavolini di Platea fronte palco per lo spettacolo in due tempi + brindisi di mezzanotte con panettone e bollicine insieme ai comici.',
          },
          {
            label: 'Biglietto Settore Tribuna + Brindisi di Mezzanotte (ore 22:15)',
            price: '107€',
            details: 'Posto numerato in Tribuna rialzata con ottima visibilità per lo spettacolo in due tempi + brindisi di mezzanotte con panettone e bollicine.',
          },
        ]
      : isEn
        ? [
            {
              label: 'Platea Stalls Seat + Midnight Cast Toast (22:15)',
              price: '€135',
              details: 'Reserved front Platea seating for the two-act NYE comedy show + midnight sparkling wine and panettone toast with the cast.',
            },
            {
              label: 'Tribuna Tier Seat + Midnight Cast Toast (22:15)',
              price: '€107',
              details: 'Reserved elevated Tribuna seat for the two-act NYE comedy show + midnight sparkling wine and panettone toast.',
            },
          ]
        : [
            { label: 'Area Zelig · Platea (22:15)', price: '€135', details: `${addr} · Show + Midnight Toast` },
            { label: 'Area Zelig · Tribuna (22:15)', price: '€107', details: `${addr} · Show + Midnight Toast` },
          ];

    return {
      title: isIt
        ? 'Capodanno Area Zelig Cabaret Milano 2027 · Spettacolo ore 22:15 & Brindisi'
        : isEn
          ? 'Area Zelig Cabaret Milan NYE 2027 · 22:15 Comedy Show & Midnight Toast'
          : `${nav.menuLabel} 2027 Area Zelig Cabaret Milano · Viale Monza 140`,
      subtitle: isIt
        ? `${addr} · Giovedì 31 Dicembre ore 22:15 · Settore Tribuna 107€ · Settore Platea 135€ · Brindisi con i Comici`
        : isEn
          ? `${addr} · Thursday Dec 31 at 22:15 · Tribuna €107 · Platea €135 · Midnight Toast with the Cast`
          : `${addr} · ${w.dateBadge} · 22:15 · €107 / €135`,
      description: isIt
        ? 'Trascorri il Capodanno 2027 all’insegna della grande comicità italiana sul palco leggendario di Area Zelig in Viale Monza 140 a Milano (M1 Turro). Giovedì 31 dicembre 2026 alle ore 22:15 va in scena lo speciale «Capodanno ad Area Zelig»: uno spettacolo dal vivo in due tempi con brindisi di mezzanotte insieme ai comici, panettone tradizionale e bollicine inclusi. Settori ufficiali disponibili: Tribuna 107€ a persona e Platea 135€ a persona (spettacolo in lingua italiana; non è previsto cenone). Prenota i posti online su nightlifemilan.com o tramite Concierge WhatsApp +39 351 912 7047.'
        : isEn
          ? 'Ring in 2027 at Milan’s legendary temple of Italian stand-up comedy, Area Zelig on Viale Monza 140 (M1 Turro). On Thursday, December 31, 2026 at 22:15, «Capodanno ad Area Zelig» presents a special two-act live comedy gala (performed in Italian) with a midnight sparkling wine and panettone toast alongside the cast. Official seating tiers: Tribuna €107 per person and Platea €135 per person (show + toast format; no seated dinner). Book online on nightlifemilan.com or via WhatsApp +39 351 912 7047.'
          : `${nav.h1} · Area Zelig Cabaret Milano (${addr}). ${w.hoursLabel} 22:15 – 02:00 · Tribuna €107 · Platea €135. ${w.freeAdviceTpl}.`,
      musicAndFormat: isIt
        ? 'Gran Varietà di Cabaret dal Vivo in Due Tempi (ore 22:15) + Brindisi di Mezzanotte con Panettone e Bollicine'
        : isEn
          ? 'Two-Act Live Italian Stand-Up & Cabaret Show (22:15) + Midnight Panettone & Sparkling Toast'
          : `Cabaret Show (22:15) + Midnight Toast · Area Zelig`,
      dressCode: isIt
        ? 'Smart Chic / Elegante da Teatro'
        : isEn
          ? 'Smart Chic / Theatre Evening Attire'
          : `${w.dressCodeLabel}: Smart Chic`,
      priceSummary: isIt
        ? 'Settore Tribuna + Brindisi: 107€ · Settore Platea + Brindisi: 135€ (spettacolo ore 22:15, senza cena)'
        : isEn
          ? 'Tribuna Seat + Toast: €107 · Platea Stalls + Toast: €135 (22:15 comedy show, no dinner)'
          : `Tribuna €107 · Platea €135 (22:15)`,
      tiers,
      highlights: isIt
        ? [
            `Storico tempio del cabaret milanese in ${addr} (M1 Turro)`,
            'Spettacolo speciale di San Silvestro ore 22:15 in due tempi con brindisi di mezzanotte col cast',
            'Tariffe ufficiali posti numerati: Settore Tribuna 107€ · Settore Platea 135€ (panettone e bollicine inclusi)',
            'Ideale dopo una cena libera in zona Porta Venezia / Isola / Centrale · Acquisto su nightlifemilan.com',
          ]
        : isEn
          ? [
              `Iconic Milanese comedy landmark at ${addr} (M1 Turro metro)`,
              'Special two-act New Year’s Eve comedy gala starting at 22:15 with midnight cast toast',
              'Official reserved seating: Tribuna €107 · Platea €135 (includes midnight sparkling toast & panettone)',
              'Performed in Italian · Ideal after an early dinner in central Milan · Book on nightlifemilan.com',
            ]
          : [
              `Area Zelig Cabaret · ${addr}`,
              `${w.dateBadge} · 22:15 – 02:00`,
              'Tribuna €107 · Platea €135',
              w.freeAdviceTpl,
            ],
      sourceBasis: isIt
        ? 'Programmazione e biglietteria ufficiali Area Zelig Milano (Viale Monza 140) per giovedì 31 dicembre 2026 ore 22:15: Tribuna 107€ e Platea 135€ con brindisi di mezzanotte. Prenotazione gestita da Nightlife Milan previa verifica posti.'
        : isEn
          ? 'Official Area Zelig Milan schedule and box-office rate card for Thursday, Dec 31, 2026 at 22:15: Tribuna €107 and Platea €135 including midnight toast. Booking handled by Nightlife Milan subject to seat verification.'
          : `${w.verifiedEventsLabel} · Area Zelig Milano (€107 / €135) · ${w.freeAdviceTpl}`,
      scheduleHeading: isIt
        ? 'Orari Spettacolo 31 Dicembre 2026 · Area Zelig'
        : isEn
          ? 'December 31, 2026 Show Schedule · Area Zelig'
          : `${w.tocProgram} · Area Zelig`,
      schedule,
      offerPricesEur: [107, 135],
      shots: isIt
        ? ['Palco Storico Area Zelig · Viale Monza 140 Milano', 'Platea & Tavolini Fronte Palco · Spettacolo di San Silvestro', 'Tribuna Numerata & Atmosfera Cabaret Live', 'Brindisi di Mezzanotte con i Comici · Capodanno 2027']
        : ['Historic Area Zelig Stage · Viale Monza 140 Milan', 'Platea Front Tables · New Year’s Eve Comedy Gala', 'Elevated Tribuna Seating & Live Theatre Atmosphere', 'Midnight Sparkling Toast with the Cast · NYE 2027'],
    };
  }

  const closedMeta = CLOSED_VENUE_META[slug];
  if (closedMeta) {
    const w = getWords35(loc);
    const customLabels = CLOSED_LABELS_BY_LOCALE[loc];
    const closedTag = customLabels ? customLabels.closedTag : w.soldOutNye2027Badge;
    const bannerPrefix = customLabels ? customLabels.bannerPrefix : w.soldOutNye2027Badge;
    const altHeading = customLabels ? customLabels.altHeading : w.confirmedAlternativesHeading;
    const altSub = customLabels ? customLabels.altSub : w.freeAdviceTpl;
    const reason = isIt ? closedMeta.reasonIt : locale === 'en' ? closedMeta.reasonEn : `${closedMeta.name} (${closedMeta.address}): ${closedTag}.`;
    const faqs =
      isIt || locale === 'en'
        ? isIt
          ? [
              {
                q: `${closedMeta.name} è aperto a Capodanno 2027 (31 dicembre 2026)?`,
                a: `No, l’evento è indicato come Sold Out. ${closedMeta.reasonIt}`,
              },
              {
                q: `Quali sono le migliori alternative aperte e prenotabili a Capodanno 2027?`,
                a: `Consulta le alternative ufficiali confermate nella pagina qui sotto oppure scrivi al Concierge Nightlife Milan su WhatsApp +39 351 912 7047.`,
              },
            ]
          : [
              {
                q: `Is ${closedMeta.name} open for New Year’s Eve 2027 (December 31, 2026)?`,
                a: `No, it is marked Sold Out. ${closedMeta.reasonEn}`,
              },
              {
                q: `What are the best confirmed open alternatives for NYE 2027?`,
                a: `Explore the verified open alternatives linked below or contact Nightlife Milan Concierge on WhatsApp +39 351 912 7047.`,
              },
            ]
        : getCapodannoDetailFaqs35({
            locale,
            venueName: closedMeta.name,
            address: closedMeta.address,
            city: closedMeta.city,
            province: closedMeta.province ?? 'MI',
            hours: closedTag,
            dressCode: closedTag,
            priceSummary: closedTag,
            sourceBasis: altSub,
            paymentSteps: [w.freeAdviceTpl],
          });

    return {
      title: `${closedMeta.name} · ${closedTag}`,
      subtitle: `${closedMeta.address} · ${closedTag}`,
      description: `${reason} ${altSub}`,
      musicAndFormat: closedTag,
      dressCode: closedTag,
      priceSummary: closedTag,
      tiers: [],
      highlights: [
        `${closedMeta.name} (${closedMeta.address})`,
        reason,
        isIt
          ? 'Evento dichiarato Sold Out: nessun biglietto o cenone in vendita per la notte del 31 dicembre 2026'
          : locale === 'en'
            ? 'Marked Sold Out: no tickets or gala dinner on sale for December 31, 2026 at this venue'
            : `${closedTag} · ${w.dateBadge}`,
        isIt
          ? 'Assistenza Concierge Nightlife Milan per alternative aperte: WhatsApp +39 351 912 7047'
          : locale === 'en'
            ? 'Nightlife Milan Concierge for open alternatives: WhatsApp +39 351 912 7047'
            : w.freeAdviceTpl,
      ],
      sourceBasis: `${reason} Concierge WhatsApp +39 351 912 7047.`,
      soldOutForNye: true,
      closureBannerTitle: `${bannerPrefix} · ${closedMeta.name.toUpperCase()}`,
      closureBannerBody: reason,
      alternativesHeading: altHeading,
      alternativesSubheading: altSub,
      alternativeSlugs: closedMeta.alternatives,
      customFaqs: faqs,
    };
  }

  return null;
}
