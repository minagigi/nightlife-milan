import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from './repvblic35';

export const TERRAZZA_DUOMO_21_NYE_OFFER_PRICES_EUR = [
  300, 200, 90, 70, 600, 1200, 380, 90, 70, 600,
] as const;

type TerrazzaLocalePack = {
  title: string;
  subtitle: string;
  description: string;
  musicAndFormat: string;
  dressCode: string;
  priceSummary: string;
  sourceBasis: string;
  scheduleHeading: string;
  menusHeading: string;
  conditionsHeading: string;
  conditions: string[];
  highlights: string[];
  shots: [string, string, string, string];
  customFaqs: Array<{ q: string; a: string }>;
  tiers?: CapodannoEventTier[];
  schedule?: CapodannoScheduleStep[];
  menus?: CapodannoMenuCard[];
};

const TIERS_IT: CapodannoEventTier[] = [
  {
    label: '1° Piano · Cena Placé Chef Valerio Braschi (dalle 20:30)',
    price: '300€',
    details:
      'Sale interne Terrazza Duomo 21, tavoli condivisi minimo 10 persone, scelta obbligatoria del secondo piatto alla prenotazione (Rubia gallega dry aged oppure Ricciola), 1 bottiglia di vino ogni 2 persone, flûte di mezzanotte e DJ set fino al mattino.',
  },
  {
    label: '1° Piano · Cena a Buffet in Area Lounge (dalle 21:00)',
    price: '200€',
    details:
      'Sale interne con posto a sedere assegnato in area lounge, ricco buffet con finger food, marinati, primi, secondi, contorni e dolci, 1 bottiglia di vino ogni 2 persone, flûte di mezzanotte e DJ set.',
  },
  {
    label: '1° Piano · Formula Brindisi (dalle 23:00)',
    price: '90€',
    details:
      'Ingresso 1° piano dalle 23:00 con 1 flûte di champagne per il brindisi di mezzanotte, 1 drink e DJ set fino al mattino.',
  },
  {
    label: '1° Piano · Formula Anno Nuovo (dalle 00:30)',
    price: '70€',
    details:
      'Ingresso 1° piano dopo mezzanotte dalle 00:30 con 1 drink incluso e DJ set fino al mattino.',
  },
  {
    label: '1° Piano · Tavolo in Terrazza Vista Duomo (max 4 pax)',
    price: '600€',
    details:
      'Supplemento tavolo riservato in terrazza al 1° piano con 2 bottiglie di champagne o superalcolico. Abbinamento obbligatorio con una formula a persona del 1° piano per ogni ospite (1–4 pax).',
  },
  {
    label: '1° Piano · Terrazzino Privato Vista Duomo (max 8 pax)',
    price: '1.200€',
    details:
      'Terrazzino privato esclusivo al 1° piano con 2 bottiglie di champagne o superalcolico. Abbinamento obbligatorio con una formula a persona del 1° piano per ogni ospite (1–8 pax).',
  },
  {
    label: '5° Piano MA.RE · Cena Placé Chef Mario e Remo Capitaneo 2 Stelle Michelin (dalle 20:30)',
    price: '380€',
    details:
      'Sala interna 5° piano Terrazza MA.RE con menu degustazione stellato, cocktail di benvenuto, 1 bottiglia ogni 2 persone tra Gorgona Bianco 2025 o Mormoreto 2023 Frescobaldi, brindisi di mezzanotte Champagne e DJ set.',
  },
  {
    label: '5° Piano MA.RE · Formula Brindisi (dalle 23:00)',
    price: '90€',
    details:
      'Ingresso 5° piano Terrazza MA.RE dalle 23:00 con 1 flûte di champagne per il brindisi di mezzanotte, 1 drink e DJ set fino al mattino.',
  },
  {
    label: '5° Piano MA.RE · Formula Anno Nuovo (dalle 00:30)',
    price: '70€',
    details:
      'Ingresso 5° piano Terrazza MA.RE dalle 00:30 con 1 drink incluso e DJ set fino al mattino.',
  },
  {
    label: '5° Piano MA.RE · Tavolo in Terrazza Panoramica (max 4 pax)',
    price: '600€',
    details:
      'Supplemento tavolo riservato in terrazza al 5° piano con 2 bottiglie di champagne o superalcolico. Abbinamento obbligatorio con una formula a persona del 5° piano per ogni ospite (1–4 pax).',
  },
];

const TIERS_EN: CapodannoEventTier[] = [
  {
    label: '1st Floor · Seated Gala Dinner by Chef Valerio Braschi (from 20:30)',
    price: '€300',
    details:
      'Terrazza Duomo 21 indoor dining rooms, shared tables min. 10 guests, mandatory main course choice at booking (Rubia gallega dry aged or Amberjack), 1 bottle of wine per 2 guests, midnight flûte, DJ set until morning.',
  },
  {
    label: '1st Floor · Buffet Dinner in Lounge Area (from 21:00)',
    price: '€200',
    details:
      'Indoor dining rooms with assigned seating in the lounge area, extensive gourmet buffet (finger food, marinated seafood, first & main courses, sides, desserts), 1 bottle of wine per 2 guests, midnight flûte, DJ set.',
  },
  {
    label: '1st Floor · Midnight Toast Formula (from 23:00)',
    price: '€90',
    details:
      '1st Floor entry from 23:00 including 1 champagne flûte for the midnight toast, 1 drink, and DJ set until morning.',
  },
  {
    label: '1st Floor · New Year Formula (from 00:30)',
    price: '€70',
    details:
      '1st Floor after-midnight entry from 00:30 including 1 drink and DJ set until morning.',
  },
  {
    label: '1st Floor · Duomo-View Terrace Table (max 4 guests)',
    price: '€600',
    details:
      'Reserved 1st Floor terrace table add-on with 2 bottles of champagne or premium spirit. Must be paired with a 1st Floor per-person formula for each guest (1–4 pax).',
  },
  {
    label: '1st Floor · Private Terrace Overlooking Duomo (max 8 guests)',
    price: '€1,200',
    details:
      'Exclusive 1st Floor private terrace add-on with 2 bottles of champagne or premium spirit. Must be paired with a 1st Floor per-person formula for each guest (1–8 pax).',
  },
  {
    label: '5th Floor MA.RE · Michelin Seated Dinner by Chefs Mario & Remo Capitaneo (from 20:30)',
    price: '€380',
    details:
      '5th Floor Terrazza MA.RE indoor dining room with 2 Michelin Star tasting menu, welcome cocktail, 1 bottle per 2 guests (Gorgona Bianco 2025 or Mormoreto 2023 Frescobaldi), midnight Champagne toast, DJ set.',
  },
  {
    label: '5th Floor MA.RE · Midnight Toast Formula (from 23:00)',
    price: '€90',
    details:
      '5th Floor Terrazza MA.RE entry from 23:00 including 1 champagne flûte for the midnight toast, 1 drink, and DJ set until morning.',
  },
  {
    label: '5th Floor MA.RE · New Year Formula (from 00:30)',
    price: '€70',
    details:
      '5th Floor Terrazza MA.RE after-midnight entry from 00:30 including 1 drink and DJ set until morning.',
  },
  {
    label: '5th Floor MA.RE · Panoramic Terrace Table (max 4 guests)',
    price: '€600',
    details:
      'Reserved 5th Floor terrace table add-on with 2 bottles of champagne or premium spirit. Must be paired with a 5th Floor per-person formula for each guest (1–4 pax).',
  },
];

const SCHEDULE_IT: CapodannoScheduleStep[] = [
  { time: '19:45', label: 'Arrivo consigliato ai 9 varchi di Piazza Duomo (almeno 45 minuti di anticipo) · Ingresso da Via Silvio Pellico 2' },
  { time: '20:30', label: 'Inizio Cena Placé 1° Piano (Chef Valerio Braschi) e Cena Placé 5° Piano MA.RE (Chef Mario e Remo Capitaneo, 2 Stelle Michelin)' },
  { time: '21:00', label: 'Inizio Cena a Buffet 1° Piano con posto a sedere assegnato in area lounge' },
  { time: '23:00', label: 'Apertura ingressi Formula Brindisi su 1° Piano e 5° Piano MA.RE (1 flûte champagne + 1 drink)' },
  { time: '00:00', label: 'Countdown di Mezzanotte e Brindisi con Champagne affacciati su Piazza del Duomo' },
  { time: '00:30', label: 'Apertura Formula Anno Nuovo (1 drink) e DJ Set su entrambi i piani fino al mattino' },
];

const SCHEDULE_EN: CapodannoScheduleStep[] = [
  { time: '19:45', label: 'Recommended arrival for the 9 Piazza Duomo security checkpoints (at least 45 minutes early) · Entrance via Via Silvio Pellico 2' },
  { time: '20:30', label: '1st Floor Seated Gala Dinner (Chef Valerio Braschi) and 5th Floor MA.RE Michelin Dinner (Chefs Mario & Remo Capitaneo)' },
  { time: '21:00', label: '1st Floor Buffet Dinner begins with assigned seating in the indoor lounge area' },
  { time: '23:00', label: 'Midnight Toast Formula doors open on 1st Floor and 5th Floor MA.RE (1 champagne flûte + 1 drink)' },
  { time: '00:00', label: 'Midnight Countdown and Champagne Toast overlooking Piazza del Duomo' },
  { time: '00:30', label: 'New Year Formula entry (1 drink) and DJ Sets on both floors until morning' },
];

const MENUS_IT: CapodannoMenuCard[] = [
  {
    id: 'terrazza21-f1-place',
    title: '1° Piano · Cena Placé Chef Valerio Braschi',
    price: '300€',
    subtitle: 'Dalle 20:30 · Sale interne Terrazza Duomo 21 · Tavoli min. 10 ospiti · Scelta secondo alla prenotazione',
    courses: [
      {
        course: 'Benvenuto & Amuse-bouche',
        dish: 'Flûte di benvenuto · Finto pomodoro di foie gras al tartufo · Bignè, salmone e guacamole · Toast di gamberi con salsa bernese e tartufo',
      },
      {
        course: 'Antipasto',
        dish: 'Aragosta affumicata, salsa di aragosta, mais e bagnetto verde piemontese',
      },
      {
        course: 'Primi Piatti',
        dish: 'Tagliatelle in salsa di burro, caviale, scalogno e Patanegra · Risotto cacio e pepe, fichi e salsiccia di Bra',
      },
      {
        course: 'Secondo Piatto (a scelta obbligatoria alla prenotazione)',
        dish: 'Rubia gallega dry aged, jus affumicato e patate montate OPPURE Ricciola, zucca tartufata e tarassaco al miele',
      },
      {
        course: 'Dessert & Mezzanotte',
        dish: 'Finto Magnum al panettone, cioccolato bianco e noci pecan · Brindisi di Mezzanotte con 1 Flûte a persona',
      },
    ],
    beverages: 'Bevande incluse: Acqua minerale naturale e gasata, Caffè Lavazza, Vino Bianco o Rosso (1 bottiglia ogni 2 persone).',
    imageSrc: '/images/events/capodanno-2027-menus/terrazza-duomo21-f1-place-menu.webp',
    imageAlt: 'Terrazza Duomo 21 Milano 1° Piano · Cena Placé Capodanno 2027 Chef Valerio Braschi vista Duomo',
  },
  {
    id: 'terrazza21-f1-buffet',
    title: '1° Piano · Cena a Buffet in Area Lounge',
    price: '200€',
    subtitle: 'Dalle 21:00 · Sale interne Terrazza Duomo 21 · Posto a sedere assegnato in area lounge',
    courses: [
      {
        course: '10 Finger Food',
        dish: 'Ostrica Gillardeau, citronette al Franciacorta e limone, caviale di aringa · Salmone affumicato, panna acida, caviale e blinis croccante · Gambero rosso crudo, stracciatella e salsa ponzu · Mini lobster roll con astice, avocado, mela verde e maionese al wasabi · Tartare di tonno rosso, caviale di limone e sesamo croccante · Tartelletta con beef tartare, tuorlo affumicato e perlage al tartufo · Mini club sandwich vegetariano · Mini maritozzo salato con culatello, robiola e mostarda di pere · Focaccia croccante, burro, acciuga del Cantabrico e lime · Insalata russa con uova di quaglia e caviale di aringa',
      },
      {
        course: 'Marinati & Tradizione Italiana',
        dish: 'Sashimi di ricciola scottata, agrumi, finocchio e olio al basilico · Carpaccio di spada con barbabietola rossa e peperoncino verde dolce · Tonno rosso affumicato, sesamo e salsa ponzu · Vitello tonnato · Bresaola di wagyu con salsa Parmigiano 36 mesi e tartufo nero · Burratina pugliese con datterino confit e basilico · Salumi italiani · Formaggi italiani e internazionali · Focaccia e grissini',
      },
      {
        course: 'Primi Piatti',
        dish: 'Risotto Carnaroli al Franciacorta, gambero rosso di Mazara, lime e caviale · Raviolo di astice, pomodoro San Marzano, bisque di crostacei zafferano e basilico',
      },
      {
        course: 'Secondi Piatti & Contorni',
        dish: 'Astice alla Catalana · Filetto di branzino selvaggio, patata fondente, carciofo e salsa olive taggiasche · Guancia di manzo brasata al Barolo, purè affumicato e tartufo nero · Mini cotoletta di vitello alla Milanese · Contorni: Patate arrosto al rosmarino, Verdure grigliate, Insalata mista, Caponata, Carciofi alla romana, Purea di patate al tartufo',
      },
      {
        course: 'Dessert & Mezzanotte',
        dish: 'Panettone artigianale · Mini tiramisù · Cannolo ricotta e pistacchio · Macaron assortiti · Frutta fresca e tropicale · Brindisi di Mezzanotte con 1 Flûte a persona',
      },
    ],
    beverages: 'Bevande incluse: Acqua minerale naturale e gasata, Caffè Lavazza, Vino Bianco o Rosso (1 bottiglia ogni 2 persone).',
    imageSrc: '/images/events/capodanno-2027-menus/terrazza-duomo21-f1-buffet-lounge.webp',
    imageAlt: 'Terrazza Duomo 21 Milano 1° Piano · Area Lounge interna per Cena a Buffet di Capodanno 2027',
  },
  {
    id: 'terrazza-mare-f5-capitaneo',
    title: '5° Piano MA.RE · Cena Placé Chef Mario e Remo Capitaneo (2 Stelle Michelin)',
    price: '380€',
    subtitle: 'Dalle 20:30 · Sala interna 5° piano Terrazza MA.RE · Piazza del Duomo 21',
    courses: [
      {
        course: 'Entrée',
        dish: 'Croccante al nero di seppia con baccalà mantecato e lime · Royale di ricci di mare con lattuga e sesamo tostato · Tartelletta croccante con tonno Belfagò, agrumi e fiori di tagete',
      },
      {
        course: 'Antipasto',
        dish: 'Capasanta scottata con topinambur e salsa bernese alla nocciola',
      },
      {
        course: 'Primi Piatti',
        dish: 'Tubetto al Parmigiano Reggiano con essenza di limone e caviale Royal Tradition · Risotto agli scampi con finger lime',
      },
      {
        course: 'Secondo Piatto',
        dish: 'Astice con sfere di zucca, mandorla e oliva al forno',
      },
      {
        course: 'Dessert',
        dish: 'Cioccolato bianco e mango con spuma al passito · Panettone artigianale con zabaione montato',
      },
    ],
    beverages: 'Vini e bevande incluse: Cocktail di benvenuto, Brindisi di mezzanotte Champagne, 1 bottiglia di vino ogni 2 persone a scelta tra Gorgona Bianco 2025 Frescobaldi e Mormoreto 2023 Frescobaldi.',
    imageSrc: '/images/events/capodanno-2027-menus/terrazza-mare-f5-capitaneo-menu.webp',
    imageAlt: 'Terrazza MA.RE 5° Piano Piazza Duomo 21 · Alta cucina 2 Stelle Michelin Chef Mario e Remo Capitaneo',
  },
];

const MENUS_EN: CapodannoMenuCard[] = [
  {
    id: 'terrazza21-f1-place',
    title: '1st Floor · Seated Gala Dinner by Chef Valerio Braschi',
    price: '€300',
    subtitle: 'From 20:30 · Terrazza Duomo 21 indoor rooms · Shared tables min. 10 guests · Main course selected at booking',
    courses: [
      {
        course: 'Welcome & Amuse-bouche',
        dish: 'Welcome flûte · Truffle foie gras faux tomato · Salmon and guacamole choux · Prawn toast with truffle béarnaise',
      },
      {
        course: 'Starter',
        dish: 'Smoked lobster, lobster reduction, sweet corn and Piedmontese bagnetto verde',
      },
      {
        course: 'First Courses',
        dish: 'Tagliatelle in butter sauce, caviar, shallot and Patanegra · Cacio e pepe risotto with figs and Bra sausage',
      },
      {
        course: 'Main Course (mandatory choice at booking)',
        dish: 'Dry-aged Rubia gallega beef, smoked jus and whipped potatoes OR Amberjack, truffled pumpkin and honey dandelion',
      },
      {
        course: 'Dessert & Midnight Toast',
        dish: 'Panettone faux Magnum with white chocolate and pecans · Midnight Toast with 1 Flûte per guest',
      },
    ],
    beverages: 'Beverages included: Still and sparkling mineral water, Lavazza coffee, White or Red Wine (1 bottle per 2 guests).',
    imageSrc: '/images/events/capodanno-2027-menus/terrazza-duomo21-f1-place-menu.webp',
    imageAlt: 'Terrazza Duomo 21 Milan 1st Floor · Chef Valerio Braschi NYE 2027 Seated Dinner overlooking Duomo',
  },
  {
    id: 'terrazza21-f1-buffet',
    title: '1st Floor · Buffet Dinner in Lounge Area',
    price: '€200',
    subtitle: 'From 21:00 · Terrazza Duomo 21 indoor rooms · Assigned seating in lounge area',
    courses: [
      {
        course: '10 Gourmet Finger Foods',
        dish: 'Gillardeau oyster with Franciacorta citronette & herring caviar · Smoked salmon, sour cream, caviar & crispy blinis · Raw red prawn, stracciatella & ponzu · Mini lobster roll with avocado, green apple & wasabi mayo · Bluefin tuna tartare, lemon caviar & toasted sesame · Beef tartare tartlet with smoked egg yolk & truffle perlage · Vegetarian mini club sandwich · Savory mini maritozzo with culatello, robiola & pear mostarda · Crispy focaccia with butter, Cantabrian anchovy & lime · Russian salad with quail eggs & herring caviar',
      },
      {
        course: 'Marinated Seafood & Italian Classics',
        dish: 'Seared amberjack sashimi with citrus, fennel & basil oil · Swordfish carpaccio with red beetroot & sweet green chili · Smoked bluefin tuna with sesame & ponzu · Vitello tonnato · Wagyu bresaola with 36-month Parmigiano cream & black truffle · Pugliese burratina with confit cherry tomato & basil · Italian cured meats, Italian & international cheeses, focaccia & breadsticks',
      },
      {
        course: 'First Courses',
        dish: 'Franciacorta Carnaroli risotto with Mazara red prawn, lime & caviar · Lobster raviolo with San Marzano tomato, saffron shellfish bisque & basil',
      },
      {
        course: 'Main Courses & Sides',
        dish: 'Catalan-style lobster · Wild sea bass fillet, fondant potato, artichoke & Taggiasca olive sauce · Barolo-braised beef cheek, smoked purée & black truffle · Mini Milanese veal cutlet · Sides: Rosemary roasted potatoes, grilled vegetables, mixed salad, caponata, Roman artichokes, truffled potato purée',
      },
      {
        course: 'Desserts & Midnight Toast',
        dish: 'Artisanal panettone · Mini tiramisu · Ricotta & pistachio cannoli · Assorted macarons · Fresh & tropical fruit · Midnight Toast with 1 Flûte per guest',
      },
    ],
    beverages: 'Beverages included: Still and sparkling mineral water, Lavazza coffee, White or Red Wine (1 bottle per 2 guests).',
    imageSrc: '/images/events/capodanno-2027-menus/terrazza-duomo21-f1-buffet-lounge.webp',
    imageAlt: 'Terrazza Duomo 21 Milan 1st Floor · Indoor Lounge Area for NYE 2027 Buffet Dinner',
  },
  {
    id: 'terrazza-mare-f5-capitaneo',
    title: '5th Floor MA.RE · Michelin Dinner by Chefs Mario & Remo Capitaneo (2 Michelin Stars)',
    price: '€380',
    subtitle: 'From 20:30 · 5th Floor Terrazza MA.RE indoor dining room · Piazza del Duomo 21',
    courses: [
      {
        course: 'Entrée',
        dish: 'Squid-ink crisp with creamed cod and lime · Sea urchin royale with lettuce and toasted sesame · Crisp tartlet with Belfagò tuna, citrus and marigold petals',
      },
      {
        course: 'Starter',
        dish: 'Seared scallop with Jerusalem artichoke and hazelnut béarnaise',
      },
      {
        course: 'First Courses',
        dish: 'Parmigiano Reggiano tubetti with lemon essence and Royal Tradition caviar · Langoustine risotto with finger lime',
      },
      {
        course: 'Main Course',
        dish: 'Lobster with pumpkin spheres, almond and baked olive',
      },
      {
        course: 'Desserts',
        dish: 'White chocolate and mango with passito wine foam · Artisanal panettone with whipped zabaglione',
      },
    ],
    beverages: 'Wines & drinks included: Welcome cocktail, Midnight Champagne toast, 1 bottle of wine per 2 guests choosing between Gorgona Bianco 2025 Frescobaldi and Mormoreto 2023 Frescobaldi.',
    imageSrc: '/images/events/capodanno-2027-menus/terrazza-mare-f5-capitaneo-menu.webp',
    imageAlt: 'Terrazza MA.RE 5th Floor Piazza Duomo 21 · 2 Michelin Star fine dining by Chefs Mario and Remo Capitaneo',
  },
];

const CONDITIONS_IT = [
  'Tavolo in terrazza (max 4 persone, 600€) e Terrazzino privato (max 8 persone, 1.200€) vanno sempre abbinati a una formula a persona dello stesso piano (1° Piano oppure 5° Piano MA.RE).',
  'Cena Placé 1° Piano (Chef Valerio Braschi): i tavoli hanno una capienza minima di 10 persone; i gruppi inferiori verranno sistemati insieme ad altri ospiti. Scelta obbligatoria del secondo piatto alla prenotazione.',
  'Cena a Buffet 1° Piano: posto a sedere assegnato in area lounge interna.',
  'Tutte le cene (1° Piano Placé, 1° Piano Buffet e 5° Piano MA.RE) si svolgono nelle sale interne.',
  'Ingresso dedicato da Via Silvio Pellico 2 (Piazza del Duomo 21).',
  'In caso di ritardo non è garantito il recupero delle portate già servite.',
  'Allergie e intolleranze alimentari vanno comunicate obbligatoriamente entro e non oltre il 28 dicembre 2026.',
  'La sera del 31 dicembre saranno presenti 9 varchi presidiati dalle forze dell’ordine intorno a Piazza del Duomo: presentarsi con almeno 45 minuti di anticipo.',
];

const CONDITIONS_EN = [
  'Terrace Tables (max 4 guests, €600) and Private Terrace (max 8 guests, €1,200) must always be paired with a per-person formula on the exact same floor (1st Floor or 5th Floor MA.RE).',
  '1st Floor Seated Gala Dinner (Chef Valerio Braschi): tables accommodate a minimum of 10 guests; smaller parties are seated with other guests. Main-course selection is mandatory at booking.',
  '1st Floor Buffet Dinner: assigned seating in the indoor lounge area.',
  'All dinners (1st Floor Seated, 1st Floor Buffet, and 5th Floor MA.RE) are served inside the indoor dining rooms.',
  'Guest entrance is via Via Silvio Pellico 2 (Piazza del Duomo 21).',
  'In case of late arrival, recovery of already served courses cannot be guaranteed.',
  'Allergies and dietary intolerances must be communicated no later than December 28, 2026.',
  'On December 31, Piazza del Duomo operates 9 security checkpoints staffed by authorities: arrive at least 45 minutes in advance.',
];

const IT_PACK: TerrazzaLocalePack = {
  title: 'Capodanno Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
  subtitle: 'Piazza del Duomo 21 (Ingresso Via Silvio Pellico 2) · 1° Piano Chef Valerio Braschi & 5° Piano MA.RE Chef Capitaneo 2 Stelle Michelin · 31 dicembre 2026',
  description:
    'Festeggia il Capodanno 2027 affacciato direttamente sulle guglie del Duomo di Milano su due piani iconici di Piazza del Duomo 21: al 1° Piano Terrazza Duomo 21 con la Cena Placé firmata Chef Valerio Braschi, la Cena a Buffet in area lounge, le formule Brindisi e Anno Nuovo e i tavoli in terrazza; al 5° Piano Terrazza MA.RE con la cena degustazione 2 Stelle Michelin degli Chef Mario e Remo Capitaneo, brindisi di mezzanotte e DJ set fino al mattino. Tariffe ufficiali di listino a persona, pagamento sicuro con carta su nightlifemilan.com.',
  musicAndFormat: 'DJ Set fino al mattino su 1° Piano Terrazza Duomo 21 e 5° Piano Terrazza MA.RE · Countdown di mezzanotte vista Duomo',
  dressCode: 'Elegante / Gala di San Silvestro (giacca o abito da sera)',
  priceSummary: 'Anno Nuovo 70€ · Brindisi 90€ · Buffet 1° Piano 200€ · Cena Placé 1° Piano 300€ · Cena Stellata 5° Piano MA.RE 380€ · Tavoli Terrazza 600€ / 1.200€',
  sourceBasis:
    'Listini ufficiali Capodanno 2026/2027 Terrazza Duomo 21 (1° Piano) e Terrazza MA.RE (5° Piano). Tariffe ufficiali di listino a persona, pagamento sicuro con carta. Prenotazione confermata da Nightlife Milan dopo la verifica della disponibilità col locale; in caso di indisponibilità, rimborso completo.',
  scheduleHeading: 'Programma Ufficiale 31 Dicembre 2026 · 1° Piano & 5° Piano MA.RE',
  menusHeading: 'Menu Ufficiali Capodanno 2027 · 1° Piano & 5° Piano MA.RE',
  conditionsHeading: 'Condizioni Ufficiali, Varchi Piazza Duomo & Regole Tavoli',
  conditions: CONDITIONS_IT,
  highlights: [
    '1° Piano Terrazza Duomo 21: Cena Placé Chef Valerio Braschi (300€), Buffet Lounge (200€), Brindisi (90€), Anno Nuovo (70€)',
    '5° Piano Terrazza MA.RE: Cena Stellata Chef Mario e Remo Capitaneo 2 Stelle Michelin (380€), Brindisi (90€), Anno Nuovo (70€)',
    'Tavoli in Terrazza vista Duomo (600€ max 4 pax) e Terrazzino Privato 1° Piano (1.200€ max 8 pax) con 2 bottiglie, abbinati a formula dello stesso piano',
    'Ingresso dedicato da Via Silvio Pellico 2 · 9 varchi presidiati in Piazza Duomo: arrivo consigliato 45 minuti prima',
    'Tariffe ufficiali di listino a persona, pagamento sicuro con carta sul sito o Concierge WhatsApp +39 351 912 7047 · Conferma previa disponibilità col locale con rimborso integrale garantito',
  ],
  shots: [
    'Terrazza Duomo 21 1° Piano · Vista Guglie del Duomo',
    'Piazza del Duomo 21 di Notte · Terrazza e Galleria Vittorio Emanuele II',
    'Terrazza MA.RE 5° Piano · Tavoli Panoramici su Piazza del Duomo',
    'Sala Interna 5° Piano MA.RE · Fine Dining 2 Stelle Michelin',
  ],
  customFaqs: [
    {
      q: 'Quali sono i prezzi ufficiali del Capodanno 2027 a Terrazza Duomo 21 e Terrazza MA.RE?',
      a: 'Al 1° Piano Terrazza Duomo 21: Cena Placé Chef Valerio Braschi 300€, Cena a Buffet 200€, Formula Brindisi dalle 23:00 a 90€, Formula Anno Nuovo dalle 00:30 a 70€, Tavolo in terrazza max 4 pax 600€ (più formula a persona), Terrazzino privato max 8 pax 1.200€ (più formula a persona). Al 5° Piano Terrazza MA.RE: Cena Placé Chef Mario e Remo Capitaneo (2 Stelle Michelin) 380€, Brindisi 90€, Anno Nuovo 70€, Tavolo in terrazza max 4 pax 600€ (più formula a persona). Tariffe ufficiali di listino a persona, pagamento sicuro con carta.',
    },
    {
      q: 'Come funziona la prenotazione di un Tavolo in Terrazza o del Terrazzino Privato?',
      a: 'Sia il Tavolo in terrazza (max 4 persone, 2 bottiglie incluse) sia il Terrazzino privato al 1° piano (max 8 persone, 2 bottiglie incluse) devono sempre essere abbinati a una formula a persona dello stesso piano per ogni ospite (1–4 oppure 1–8 persone). Il configuratore online abbina tavolo e formule in un solo passaggio.',
    },
    {
      q: 'Quando devo comunicare la scelta del secondo piatto e le allergie alimentari?',
      a: 'Per la Cena Placé al 1° Piano (Chef Valerio Braschi) la scelta del secondo piatto (Rubia gallega dry aged oppure Ricciola) va indicata direttamente al momento della prenotazione. Tutte le allergie e intolleranze alimentari per entrambi i piani vanno comunicate entro e non oltre il 28 dicembre 2026.',
    },
    {
      q: 'Da dove si entra e con quanto anticipo arrivare a Piazza del Duomo il 31 dicembre?',
      a: 'L’ingresso ufficiale è da Via Silvio Pellico 2 (Piazza del Duomo 21). La notte del 31 dicembre Piazza del Duomo è presidiata da 9 varchi di sicurezza delle forze dell’ordine: è richiesto di presentarsi con almeno 45 minuti di anticipo rispetto all’orario della propria formula. In caso di ritardo non è garantito il recupero delle portate già servite.',
    },
  ],
  tiers: TIERS_IT,
  schedule: SCHEDULE_IT,
  menus: MENUS_IT,
};

const EN_PACK: TerrazzaLocalePack = {
  title: 'Terrazza Duomo 21 & MA.RE NYE 2027 · Piazza Duomo Milan',
  subtitle: 'Piazza del Duomo 21 (Entrance Via Silvio Pellico 2) · 1st Floor Chef Valerio Braschi & 5th Floor MA.RE 2 Michelin Stars · Dec 31, 2026',
  description:
    'Celebrate New Year’s Eve 2027 directly overlooking Milan Cathedral across two iconic floors at Piazza del Duomo 21: 1st Floor Terrazza Duomo 21 featuring Chef Valerio Braschi’s Seated Gala Dinner, Indoor Lounge Buffet Dinner, Midnight Toast & New Year entries, and Duomo-view terrace tables; and 5th Floor Terrazza MA.RE featuring the 2 Michelin Star tasting dinner by Chefs Mario and Remo Capitaneo, champagne toast, and DJ sets until morning. Official venue list prices per person, secure card payment on nightlifemilan.com.',
  musicAndFormat: 'DJ Set until morning on both 1st Floor Terrazza Duomo 21 and 5th Floor Terrazza MA.RE · Midnight Countdown overlooking Duomo',
  dressCode: 'New Year’s Eve Gala Elegant (evening gown or tailored suit)',
  priceSummary: 'New Year €70 · Midnight Toast €90 · 1st Floor Buffet €200 · 1st Floor Seated Dinner €300 · 5th Floor MA.RE 2 Michelin Stars €380 · Terrace Tables €600 / €1,200',
  sourceBasis:
    'Official 2026/2027 NYE rate cards for Terrazza Duomo 21 (1st Floor) and Terrazza MA.RE (5th Floor). Official venue list prices per person, secure card payment. Booking confirmed by Nightlife Milan after verifying availability with the venue; if unavailable, full refund.',
  scheduleHeading: 'Official Schedule Dec 31, 2026 · 1st Floor & 5th Floor MA.RE',
  menusHeading: 'Official NYE 2027 Menus · 1st Floor & 5th Floor MA.RE',
  conditionsHeading: 'Official Conditions, Piazza Duomo Checkpoints & Table Rules',
  conditions: CONDITIONS_EN,
  highlights: [
    '1st Floor Terrazza Duomo 21: Seated Dinner Chef Valerio Braschi (€300), Lounge Buffet (€200), Toast (€90), After-Midnight (€70)',
    '5th Floor Terrazza MA.RE: 2 Michelin Star Dinner by Chefs Mario & Remo Capitaneo (€380), Toast (€90), After-Midnight (€70)',
    'Duomo-view Terrace Tables (€600 max 4 pax) and 1st Floor Private Terrace (€1,200 max 8 pax) with 2 bottles, paired with same-floor formulas',
    'Dedicated entrance at Via Silvio Pellico 2 · 9 police checkpoints in Piazza Duomo: arrive at least 45 minutes early',
    'Official venue list prices per person, secure card payment on site or 24/7 WhatsApp Concierge +39 351 912 7047 · Availability-verified with full refund guarantee',
  ],
  shots: [
    'Terrazza Duomo 21 1st Floor · Direct Duomo Cathedral Spires View',
    'Piazza del Duomo 21 at Night · Terrace & Galleria Vittorio Emanuele II',
    'Terrazza MA.RE 5th Floor · Panoramic Dining Overlooking Piazza Duomo',
    '5th Floor MA.RE Indoor Dining Room · 2 Michelin Star Setting',
  ],
  customFaqs: [
    {
      q: 'What are the official NYE 2027 prices for Terrazza Duomo 21 and Terrazza MA.RE?',
      a: '1st Floor Terrazza Duomo 21: Chef Valerio Braschi Seated Gala Dinner €300, Lounge Buffet Dinner €200, Midnight Toast from 23:00 €90, New Year entry from 00:30 €70, Terrace Table max 4 guests €600 (plus per-person formula), Private Terrace max 8 guests €1,200 (plus per-person formula). 5th Floor Terrazza MA.RE: 2 Michelin Star Seated Dinner by Chefs Mario & Remo Capitaneo €380, Toast €90, New Year €70, Terrace Table max 4 guests €600 (plus per-person formula). Official venue list prices per person, secure card payment.',
    },
    {
      q: 'How does booking a Terrace Table or Private Terrace work?',
      a: 'Both the Terrace Table (max 4 guests, 2 bottles included) and the 1st Floor Private Terrace (max 8 guests, 2 bottles included) must always be paired with a per-person formula on the exact same floor for each guest (1–4 or 1–8 guests). Our online configurator pairs the table and per-person formulas in one step.',
    },
    {
      q: 'When must I choose the 1st Floor main course and report allergies?',
      a: 'For the 1st Floor Seated Gala Dinner (Chef Valerio Braschi), the main-course choice (Dry-aged Rubia gallega beef or Amberjack) must be selected at checkout. All food allergies and intolerances for both floors must be reported no later than December 28, 2026.',
    },
    {
      q: 'Where is the entrance and how early should we arrive at Piazza del Duomo on Dec 31?',
      a: 'Guest access is via Via Silvio Pellico 2 (Piazza del Duomo 21). On December 31, Piazza del Duomo is protected by 9 official security checkpoints manned by authorities: arrive at least 45 minutes before your booking time. Late arrivals cannot be guaranteed recovery of previously served courses.',
    },
  ],
  tiers: TIERS_EN,
  schedule: SCHEDULE_EN,
  menus: MENUS_EN,
};

const LOCALE_OVERRIDES: Partial<Record<LocaleCode, Partial<TerrazzaLocalePack>>> = {
  es: {
    title: 'Nochevieja Terrazza Duomo 21 y MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Entrada Via Silvio Pellico 2) · 1ª Planta Chef Valerio Braschi y 5ª Planta MA.RE 2 Estrellas Michelin · 31 dic 2026',
    description:
      'Celebra la Nochevieja 2027 frente al Duomo de Milán en dos plantas exclusivas de Piazza del Duomo 21: 1ª Planta Terrazza Duomo 21 con la Cena de Gala del Chef Valerio Braschi (300€), Cena Buffet en Lounge (200€), Fórmula Brindis (90€), Año Nuevo (70€) y mesas en terraza; y 5ª Planta Terrazza MA.RE con el menú degustación de 2 Estrellas Michelin de los Chefs Mario y Remo Capitaneo (380€) y DJ set hasta la madrugada. Tarifas oficiales de lista por persona, pago seguro con tarjeta.',
    musicAndFormat: 'DJ Set hasta la madrugada en 1ª Planta Terrazza Duomo 21 y 5ª Planta Terrazza MA.RE · Campanadas frente al Duomo',
    dressCode: 'Etiqueta de Gala / Elegante de Nochevieja',
    priceSummary: 'Año Nuevo 70€ · Brindis 90€ · Buffet 200€ · Cena Placé 1ª Planta 300€ · Cena 2 Estrellas Michelin 5ª Planta MA.RE 380€ · Mesas Terraza 600€ / 1.200€',
    scheduleHeading: 'Horario Oficial 31 de Diciembre de 2026 · 1ª y 5ª Planta',
    menusHeading: 'Menús Oficiales Nochevieja 2027 · 1ª Planta y 5ª Planta MA.RE',
    conditionsHeading: 'Condiciones Oficiales, Controles en Piazza Duomo y Reglas de Mesas',
    sourceBasis:
      'Tarifas oficiales Nochevieja 2026/2027 Terrazza Duomo 21 (1ª Planta) y Terrazza MA.RE (5ª Planta). Tarifas oficiales de lista por persona, pago seguro con tarjeta. Reserva confirmada por Nightlife Milan tras verificar disponibilidad con el local; si no está disponible, reembolso completo.',
  },
  fr: {
    title: 'Nouvel An Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Entrée Via Silvio Pellico 2) · 1er Étage Chef Valerio Braschi & 5e Étage MA.RE 2 Étoiles Michelin · 31 déc. 2026',
    description:
      'Célébrez la Saint-Sylvestre 2027 face au Duomo de Milan sur deux étages d’exception au Piazza del Duomo 21 : au 1er étage Terrazza Duomo 21 avec le Dîner Assis du Chef Valerio Braschi (300€), le Buffet Lounge (200€), les formules Toast (90€) et Nouvel An (70€) et les tables en terrasse ; au 5e étage Terrazza MA.RE avec le dîner gastronomique 2 Étoiles Michelin des Chefs Mario et Remo Capitaneo (380€) et DJ set jusqu’au matin. Tarifs officiels par personne, paiement sécurisé par carte.',
    musicAndFormat: 'DJ Set jusqu’au matin aux 1er et 5e étages · Compte à rebours de minuit face au Duomo',
    dressCode: 'Tenue de Gala / Élégante du Réveillon',
    priceSummary: 'Nouvel An 70€ · Toast 90€ · Buffet 200€ · Dîner Assis 1er Étage 300€ · Dîner 2 Étoiles Michelin 5e Étage MA.RE 380€ · Tables Terrasse 600€ / 1.200€',
    scheduleHeading: 'Programme Officiel 31 Décembre 2026 · 1er & 5e Étage',
    menusHeading: 'Menus Officiels Réveillon 2027 · 1er Étage & 5e Étage MA.RE',
    conditionsHeading: 'Conditions Officielles, Contrôles Piazza Duomo & Règles des Tables',
    sourceBasis:
      'Tarifs officiels Réveillon 2026/2027 Terrazza Duomo 21 (1er étage) et Terrazza MA.RE (5e étage). Tarifs officiels par personne, paiement sécurisé par carte. Confirmation par Nightlife Milan après vérification de la disponibilité auprès du lieu ; remboursement intégral si complet.',
  },
  de: {
    title: 'Silvester Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Eingang Via Silvio Pellico 2) · 1. OG Chef Valerio Braschi & 5. OG MA.RE 2 Michelin-Sterne · 31. Dez. 2026',
    description:
      'Feiern Sie Silvester 2027 direkt mit Blick auf den Mailänder Dom auf zwei Etagen an der Piazza del Duomo 21: im 1. OG Terrazza Duomo 21 mit dem gesetzten Galadinner von Chef Valerio Braschi (300€), Lounge-Buffet (200€), Mitternachts-Toast (90€), Neujahrs-Einlass (70€) und Terrassentischen; im 5. OG Terrazza MA.RE mit dem 2-Michelin-Sterne-Dinner von Mario & Remo Capitaneo (380€) und DJ-Sets bis zum Morgen. Offizielle Listenpreise pro Person, sichere Kartenzahlung online.',
    musicAndFormat: 'DJ-Set bis zum Morgen im 1. OG und 5. OG MA.RE · Mitternachts-Countdown mit Domblick',
    dressCode: 'Silvester-Gala / Festlich Elegant',
    priceSummary: 'Neujahr 70€ · Toast 90€ · Buffet 200€ · Galadinner 1. OG 300€ · 2-Sterne-Dinner 5. OG MA.RE 380€ · Terrassentische 600€ / 1.200€',
    scheduleHeading: 'Offizielles Programm 31. Dezember 2026 · 1. OG & 5. OG',
    menusHeading: 'Offizielle Silvester-Menüs 2027 · 1. OG & 5. OG MA.RE',
    conditionsHeading: 'Offizielle Bedingungen, 9 Sicherheitskontrollen Piazza Duomo & Tischregeln',
    sourceBasis:
      'Offizielle Silvester-Preislisten 2026/2027 Terrazza Duomo 21 (1. OG) und Terrazza MA.RE (5. OG). Offizielle Listenpreise pro Person, sichere Kartenzahlung. Bestätigung nach Verfügbarkeitsprüfung mit dem Lokal; volle Rückerstattung bei Nichtverfügbarkeit.',
  },
  pt: {
    title: 'Réveillon Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Entrada Via Silvio Pellico 2) · 1º Andar Chef Valerio Braschi & 5º Andar MA.RE 2 Estrelas Michelin',
    description:
      'Celebre o Réveillon 2027 em frente ao Duomo de Milão em dois pisos exclusivos: 1º Andar Terrazza Duomo 21 com Jantar Sentado do Chef Valerio Braschi (300€), Buffet Lounge (200€), Brinde (90€), Ano Novo (70€) e mesas no terraço; e 5º Andar Terrazza MA.RE com jantar 2 Estrelas Michelin dos Chefs Mario e Remo Capitaneo (380€) e DJ set até de manhã. Tarifas oficiais de tabela por pessoa, pagamento seguro com cartão.',
    scheduleHeading: 'Programa Oficial 31 Dezembro 2026 · 1º e 5º Andar',
    menusHeading: 'Menus Oficiais Réveillon 2027 · 1º e 5º Andar MA.RE',
    conditionsHeading: 'Condições Oficiais, Controlos na Piazza Duomo e Regras de Mesa',
  },
  nl: {
    title: 'Oud en Nieuw Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Ingang Via Silvio Pellico 2) · 1e Verdieping Valerio Braschi & 5e Verdieping MA.RE 2 Michelinsterren',
    description:
      'Vier Oud en Nieuw 2027 met direct uitzicht op de Dom van Milaan op twee verdiepingen aan Piazza del Duomo 21: 1e verdieping Terrazza Duomo 21 met galadiner van Chef Valerio Braschi (€300), Lounge Buffet (€200), Toast (€90), Nieuwjaar (€70) en terrastafels; en 5e verdieping Terrazza MA.RE met het 2-Michelinsterren diner van Mario & Remo Capitaneo (€380) en DJ-sets tot de ochtend. Officiële lijstprijzen per persoon, veilig betalen met kaart.',
    conditionsHeading: 'Officiële Voorwaarden, Controles Piazza Duomo & Tafelregels',
  },
  ru: {
    title: 'Новый год Terrazza Duomo 21 и MA.RE 2027 · Пьяцца Дуомо',
    subtitle: 'Piazza del Duomo 21 (вход Via Silvio Pellico 2) · 1-й этаж Валерио Браски и 5-й этаж MA.RE 2 звезды Мишлен',
    description:
      'Встретьте Новый год 2027 с видом на Миланский собор на двух этажах Piazza del Duomo 21: 1-й этаж Terrazza Duomo 21 с ужином от шефа Валерио Браски (300€), буфетом в лаунж-зоне (200€), входом на тост (90€) и после полуночи (70€); 5-й этаж Terrazza MA.RE с ужином от шефов Марио и Ремо Капитанео (2 звезды Мишлен, 380€) и DJ-сетом до утра. Официальные тарифы заведения за гостя, безопасная оплата картой.',
    conditionsHeading: 'Официальные условия, 9 КПП на Пьяцца Дуомо и правила столов',
  },
  tr: {
    title: 'Yılbaşı Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Giriş Via Silvio Pellico 2) · 1. Kat Valerio Braschi & 5. Kat MA.RE 2 Michelin Yıldızı',
    description:
      '2027 Yılbaşını Milano Katedrali manzarasına karşı iki ikonik katta kutlayın: 1. Kat Terrazza Duomo 21 (Şef Valerio Braschi gala yemeği 300€, Lounge Büfe 200€, Kadeh 90€, Yeni Yıl 70€) ve 5. Kat Terrazza MA.RE (2 Michelin Yıldızlı Mario & Remo Capitaneo yemeği 380€). Kişi başı resmi mekan fiyatları, kartla güvenli ödeme.',
    conditionsHeading: 'Resmi Kurallar, Piazza Duomo Kontrol Noktaları ve Masa Şartları',
  },
  zh: {
    title: '2027 米兰跨年 Terrazza Duomo 21 & MA.RE · 大教堂广场',
    subtitle: 'Piazza del Duomo 21（入口 Via Silvio Pellico 2）· 1楼 Valerio Braschi & 5楼 MA.RE 米其林二星 · 2026年12月31日',
    description:
      '在米兰大教堂广场21号的两层标志性露台迎接2027新年：1楼 Terrazza Duomo 21 提供主厨 Valerio Braschi 晚宴（300欧元）、酒廊自助晚宴（200欧元）、午夜香槟入场（90欧元）、新年入场（70欧元）及露台桌位；5楼 Terrazza MA.RE 提供米其林二星主厨 Mario 与 Remo Capitaneo 晚宴（380欧元）及通宵DJ演出。按人显示官方场馆挂牌价，支持安全银行卡在线支付。',
    conditionsHeading: '官方预订条款、大教堂广场9处安检口及露台桌位规则',
  },
  ar: {
    title: 'رأس السنة 2027 Terrazza Duomo 21 و MA.RE · ساحة الدومو',
    subtitle: 'Piazza del Duomo 21 (المدخل عبر Via Silvio Pellico 2) · الطابق 1 فاليريو براسكي والطابق 5 MA.RE نجمتا ميشلان',
    description:
      'احتفل بليلة رأس السنة 2027 بإطلالة مباشرة على كاتدرائية ميلانو عبر طابقين مميزين في Piazza del Duomo 21: الطابق الأول Terrazza Duomo 21 بعشاء الشيف فاليريو براسكي (300€) وبوفيه اللاونج (200€) ودخول منتصف الليل (90€ / 70€)، والطابق الخامس Terrazza MA.RE بعشاء الشيفين ماريو وريمو كابيتانيو الحائزين على نجمتي ميشلان (380€). أسعار القائمة الرسمية للشخص، دفع آمن بالبطاقة.',
    conditionsHeading: 'الشروط الرسمية ونقاط التفتيش التسع في ساحة الدومو وقواعد الطاولات',
  },
  pl: {
    title: 'Sylwester Terrazza Duomo 21 i MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Wejście Via Silvio Pellico 2) · 1. piętro Valerio Braschi i 5. piętro MA.RE 2 Gwiazdki Michelin',
    description:
      'Powitaj Nowy Rok 2027 z widokiem na katedrę Duomo na dwóch piętrach Piazza del Duomo 21: 1. piętro Terrazza Duomo 21 z kolacją Szefa Valerio Braschiego (300€), bufetem (200€) i wejściem od 70€ oraz 5. piętro Terrazza MA.RE z kolacją 2 Gwiazdki Michelin Braci Capitaneo (380€). Oficjalne ceny cennikowe za osobę, bezpieczna płatność kartą.',
  },
  ro: {
    title: 'Revelion Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Intrare Via Silvio Pellico 2) · Etaj 1 Valerio Braschi & Etaj 5 MA.RE 2 Stele Michelin',
    description:
      'Sărbătorește Revelionul 2027 cu vedere directă la Domul din Milano pe două etaje la Piazza del Duomo 21: Etajul 1 Terrazza Duomo 21 (Cină Chef Valerio Braschi 300€, Bufet 200€, Toast 90€, An Nou 70€) și Etajul 5 Terrazza MA.RE (Cină 2 Stele Michelin Mario & Remo Capitaneo 380€). Tarife oficiale de listă pe persoană, plată securizată cu cardul.',
  },
  el: {
    title: 'Πρωτοχρονιά Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Είσοδος Via Silvio Pellico 2) · 1ος Όροφος Valerio Braschi & 5ος Όροφος MA.RE 2 Αστέρια Michelin',
    description:
      'Υποδεχτείτε το 2027 με θέα τον Καθεδρικό του Μιλάνου σε δύο επίπεδα στο Piazza del Duomo 21: 1ος όροφος Terrazza Duomo 21 (Δείπνο Valerio Braschi 300€, Μπουφές 200€, Είσοδος 70€–90€) και 5ος όροφος Terrazza MA.RE (Δείπνο 2 Αστέρων Michelin Mario & Remo Capitaneo 380€). Επίσημες τιμές καταλόγου ανά άτομο, ασφαλής πληρωμή με κάρτα.',
  },
  uk: {
    title: 'Новий рік Terrazza Duomo 21 і MA.RE 2027 · П’яцца Дуомо',
    subtitle: 'Piazza del Duomo 21 (вхід Via Silvio Pellico 2) · 1-й поверх Валеріо Браскі та 5-й поверх MA.RE 2 зірки Мішлен',
    description:
      'Зустріньте Новий рік 2027 з видом на собор Дуомо на двох поверхах Piazza del Duomo 21: 1-й поверх Terrazza Duomo 21 (вечеря Валеріо Браскі 300€, буфет 200€, вхід 70€–90€) та 5-й поверх Terrazza MA.RE (вечеря 2 зірки Мішлен Маріо та Ремо Капітанео 380€). Офіційні ціни закладу за особу, безпечна оплата карткою.',
  },
  sv: {
    title: 'Nyår Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Ingång Via Silvio Pellico 2) · 1:a våningen Valerio Braschi & 5:e våningen MA.RE 2 Michelinstjärnor',
  },
  no: {
    title: 'Nyttårsaften Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Inngang Via Silvio Pellico 2) · 1. etasje Valerio Braschi & 5. etasje MA.RE 2 Michelin-stjerner',
  },
  da: {
    title: 'Nytår Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Indgang Via Silvio Pellico 2) · 1. sal Valerio Braschi & 5. sal MA.RE 2 Michelin-stjerner',
  },
  fi: {
    title: 'Uusivuosi Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Sisäänkäynti Via Silvio Pellico 2) · 1. krs Valerio Braschi & 5. krs MA.RE 2 Michelin-tähteä',
  },
  cs: {
    title: 'Silvestr Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Vstup Via Silvio Pellico 2) · 1. patro Valerio Braschi a 5. patro MA.RE 2 hvězdy Michelin',
  },
  sk: {
    title: 'Silvester Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Vstup Via Silvio Pellico 2) · 1. poschodie Valerio Braschi a 5. poschodie MA.RE 2 hviezdy Michelin',
  },
  hu: {
    title: 'Szilveszter Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Bejárat Via Silvio Pellico 2) · 1. emelet Valerio Braschi & 5. emelet MA.RE 2 Michelin-csillag',
  },
  bg: {
    title: 'Нова година Terrazza Duomo 21 и MA.RE 2027 · Дуомо',
    subtitle: 'Piazza del Duomo 21 (Вход Via Silvio Pellico 2) · 1-ви етаж Валерио Браски и 5-ти етаж MA.RE 2 звезди Мишлен',
  },
  hr: {
    title: 'Nova godina Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Ulaz Via Silvio Pellico 2) · 1. kat Valerio Braschi i 5. kat MA.RE 2 Michelinove zvjezdice',
  },
  sl: {
    title: 'Silvestrovo Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Vhod Via Silvio Pellico 2) · 1. nadstropje Valerio Braschi in 5. nadstropje MA.RE 2 Michelinovi zvezdici',
  },
  sr: {
    title: 'Nova godina Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Ulaz Via Silvio Pellico 2) · 1. sprat Valerio Braschi i 5. sprat MA.RE 2 Mišlenove zvezdice',
  },
  bs: {
    title: 'Nova godina Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Ulaz Via Silvio Pellico 2) · 1. sprat Valerio Braschi i 5. sprat MA.RE 2 Michelinove zvjezdice',
  },
  mk: {
    title: 'Нова година Terrazza Duomo 21 и MA.RE 2027 · Дуомо',
    subtitle: 'Piazza del Duomo 21 (Влез Via Silvio Pellico 2) · 1. кат Валерио Браски и 5. кат MA.RE 2 Мишелин ѕвезди',
  },
  sq: {
    title: 'Viti i Ri Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Hyrja Via Silvio Pellico 2) · Kati 1 Valerio Braschi & Kati 5 MA.RE 2 Yje Michelin',
  },
  et: {
    title: 'Aastavahetus Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Sissepääs Via Silvio Pellico 2) · 1. korrus Valerio Braschi & 5. korrus MA.RE 2 Michelini tähte',
  },
  lv: {
    title: 'Jaunais gads Terrazza Duomo 21 un MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Ieeja Via Silvio Pellico 2) · 1. stāvs Valerio Braschi un 5. stāvs MA.RE 2 Michelin zvaigznes',
  },
  lt: {
    title: 'Naujieji metai Terrazza Duomo 21 ir MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Įėjimas Via Silvio Pellico 2) · 1 aukštas Valerio Braschi ir 5 aukštas MA.RE 2 Michelin žvaigždutės',
  },
  ga: {
    title: 'Oíche Chinn Bliana Terrazza Duomo 21 & MA.RE 2027',
    subtitle: 'Piazza del Duomo 21 (Bealach isteach Via Silvio Pellico 2) · 1ú Urlár Valerio Braschi & 5ú Urlár MA.RE 2 Réalta Michelin',
  },
  mt: {
    title: 'L-Ewwel tas-Sena Terrazza Duomo 21 & MA.RE 2027 · Duomo',
    subtitle: 'Piazza del Duomo 21 (Dħul minn Via Silvio Pellico 2) · 1 Sular Valerio Braschi & 5 Sular MA.RE 2 Stilel Michelin',
  },
  is: {
    title: 'Áramót Terrazza Duomo 21 & MA.RE 2027 · Piazza Duomo',
    subtitle: 'Piazza del Duomo 21 (Inngangur Via Silvio Pellico 2) · 1. hæð Valerio Braschi & 5. hæð MA.RE 2 Michelin-stjörnur',
  },
};

export function isTerrazzaDuomo21NyeSlug(slug: string): boolean {
  return slug === 'capodanno-terrazza-duomo-21';
}

export function getTerrazzaDuomo21NyeContent(locale: string): CapodannoLocalizedEventContent {
  const pack: TerrazzaLocalePack =
    locale === 'it'
      ? IT_PACK
      : locale === 'en'
        ? EN_PACK
        : {
            ...EN_PACK,
            ...((LOCALE_OVERRIDES as Record<string, Partial<TerrazzaLocalePack>>)[locale] || {}),
          };

  return {
    title: pack.title,
    subtitle: pack.subtitle,
    description: pack.description,
    musicAndFormat: pack.musicAndFormat,
    dressCode: pack.dressCode,
    priceSummary: pack.priceSummary,
    tiers: pack.tiers || TIERS_EN,
    highlights: pack.highlights,
    sourceBasis: pack.sourceBasis,
    scheduleHeading: pack.scheduleHeading,
    schedule: pack.schedule || SCHEDULE_EN,
    menusHeading: pack.menusHeading,
    menus: pack.menus || MENUS_EN,
    conditionsHeading: pack.conditionsHeading,
    conditions: pack.conditions,
    offerPricesEur: [...TERRAZZA_DUOMO_21_NYE_OFFER_PRICES_EUR],
    customFaqs: pack.customFaqs,
    shots: pack.shots,
  };
}
