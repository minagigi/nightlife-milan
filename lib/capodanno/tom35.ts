import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

export const TOM_NYE_SLUG = 'capodanno-tom-the-ordinary-market-milano';

const TOM_ADDR = 'Via Molino delle Armi 16 (Colonne di San Lorenzo / Corso Italia), 20123 Milano';
const TOM_HOURS = '20:30 – 05:00';
const TOM_MENU_IMG = '/images/events/capodanno-2027-menus/tom-nye-2027-menu-carne-pesce-150.webp';
const TOM_BOTTLE_IMG = '/images/events/capodanno-2027-menus/tom-nye-2027-bottle-list.webp';

interface TomLocalePack {
  title: string;
  subtitle: string;
  description: string;
  musicAndFormat: string;
  dressCode: string;
  priceSummary: string;
  tiers: [CapodannoEventTier, CapodannoEventTier, CapodannoEventTier];
  highlights: [string, string, string, string];
  sourceBasis: string;
  scheduleHeading: string;
  schedule: CapodannoScheduleStep[];
  menusHeading: string;
  menuDinnerTitle: string;
  menuDinnerSub: string;
  menuBottleTitle: string;
  menuBottleSub: string;
}

const TOM_CARNE_PESCE_COURSES_IT = [
  {
    course: 'Benvenuto & Vino',
    dish: 'Flûte di benvenuto Bellavista Alma · 1 bottiglia di vino ogni 4 persone (Ripasso DOC Villa Belvedere per Carne · Greco di Tufo DOCG I Feudali per Pesce), acqua e guardaroba inclusi',
  },
  {
    course: 'Menu di Carne · Antipasti',
    dish: 'Carpaccio di wagyu con mayo al tartufo e nocciole · Mini club sandwich foie gras e mango · Tartare al coltello con tuorlo confit, Parmigiano 36 mesi e tartufo nero',
  },
  {
    course: 'Menu di Carne · Main',
    dish: 'Risotto al midollo, zafferano e fondo bruno · Filetto in crosta di porcini, Madeira, patata pavé e scalogno',
  },
  {
    course: 'Menu di Pesce · Antipasti',
    dish: 'Tartare di ricciola con mandarino e finocchio · Cannolo croccante con granchio reale e avocado · Scampo imperiale e Gambero rosso di Mazara',
  },
  {
    course: 'Menu di Pesce · Main',
    dish: 'Risotto allo champagne, scampi crudi e limone nero · Branzino e puntarelle in salsa al Franciacorta',
  },
  {
    course: 'Dessert (entrambi i menu)',
    dish: 'Panettone artigianale con crema al mascarpone',
  },
];

const TOM_CARNE_PESCE_COURSES_EN = [
  {
    course: 'Welcome & Wine Pairing',
    dish: 'Welcome flute Bellavista Alma · 1 wine bottle per 4 guests (Ripasso DOC Villa Belvedere for Meat · Greco di Tufo DOCG I Feudali for Fish), water & coat check included',
  },
  {
    course: 'Meat Menu · Starters',
    dish: 'Wagyu carpaccio with truffle mayo & hazelnuts · Mini club sandwich with foie gras & mango · Hand-cut beef tartare, confit yolk, 36-month Parmigiano & black truffle',
  },
  {
    course: 'Meat Menu · Mains',
    dish: 'Bone marrow risotto with saffron & demi-glace · Porcini-crusted beef fillet, Madeira, potato pavé & shallots',
  },
  {
    course: 'Fish Menu · Starters',
    dish: 'Amberjack tartare with mandarin & fennel · Crispy cannolo with king crab & avocado · Imperial langoustine & Mazara red prawn',
  },
  {
    course: 'Fish Menu · Mains',
    dish: 'Champagne risotto with raw langoustines & black lemon · Sea bass & puntarelle in Franciacorta sauce',
  },
  {
    course: 'Dessert (both menus)',
    dish: 'Artisanal panettone with mascarpone cream',
  },
];

const TOM_BOTTLE_COURSES_IT = [
  {
    course: 'Tavoli VIP (dalle 00:30)',
    dish: 'Tavolo Base 600€ (fino a 8 ospiti) · Tavolo Pedana 900€ (fino a 10 ospiti) · Tavolo Consolle 1.500€ (fino a 15 ospiti)',
  },
  {
    course: 'Champagne (75 cl)',
    dish: 'Veuve Clicquot Yellow 300€ · Perrier-Jouët 300€ · Moët N.I.R. / Ice 350€ · Ruinart Blanc de Blancs / Rosé 350€ · Dom Pérignon Vintage 500€ · Krug Grande Cuvée 550€ · Armand de Brignac Gold 550€ · Cristal Roederer 600€ · Dom Pérignon P2 900€',
  },
  {
    course: 'Vodka, Gin, Rum & Whisky (70 cl)',
    dish: 'Grey Goose 300€ · Beluga 350€ · Bombay Sapphire 300€ · Hendrick’s / Gin Mare / Monkey 47 350€ · Bacardi 8 / Jack Daniel’s 300€ · Zacapa 23 / Santa Teresa 1796 350€ · Hibiki Harmony 400€',
  },
  {
    course: 'Tequila & Mezcal (70 cl)',
    dish: 'Patrón Silver / Reposado 300€ · Volcán Blanco 350€ · Clase Azul Plata 500€ · Clase Azul Reposado 700€ · Clase Azul Durango / Guerrero / Gold 1.500€ · Clase Azul Añejo 2.500€',
  },
];

const TOM_BOTTLE_COURSES_EN = [
  {
    course: 'VIP Tables (from 00:30)',
    dish: 'Base Table €600 (up to 8 guests) · Stage Deck Table €900 (up to 10 guests) · DJ Booth Console Table €1,500 (up to 15 guests)',
  },
  {
    course: 'Champagne (75 cl)',
    dish: 'Veuve Clicquot Yellow €300 · Perrier-Jouët €300 · Moët N.I.R. / Ice €350 · Ruinart Blanc de Blancs / Rosé €350 · Dom Pérignon Vintage €500 · Krug Grande Cuvée €550 · Armand de Brignac Gold €550 · Cristal Roederer €600 · Dom Pérignon P2 €900',
  },
  {
    course: 'Vodka, Gin, Rum & Whisky (70 cl)',
    dish: 'Grey Goose €300 · Beluga €350 · Bombay Sapphire €300 · Hendrick’s / Gin Mare / Monkey 47 €350 · Bacardi 8 / Jack Daniel’s €300 · Zacapa 23 / Santa Teresa 1796 €350 · Hibiki Harmony €400',
  },
  {
    course: 'Tequila & Mezcal (70 cl)',
    dish: 'Patrón Silver / Reposado €300 · Volcán Blanco €350 · Clase Azul Plata €500 · Clase Azul Reposado €700 · Clase Azul Durango / Guerrero / Gold €1,500 · Clase Azul Añejo €2,500',
  },
];

const TOM_PACKS: Record<'it' | 'en' | 'es' | 'fr' | 'de' | 'pt' | 'nl' | 'ru', TomLocalePack> = {
  it: {
    title: 'Capodanno TOM. Milano 2027 · The Midnight Ball in Via Molino delle Armi',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · 31 dic ${TOM_HOURS}`,
    description:
      'TOM. (The Ordinary Market) in Via Molino delle Armi 16 apre il 31 dicembre 2026 con il programma ufficiale «The Midnight Ball»: Cena di Gala dalle 20:30 a 150€ Early Bird a scelta tra Menu di Carne e Menu di Pesce (flûte Bellavista Alma, 1 bottiglia di vino ogni 4, acqua e guardaroba inclusi), Ingresso Dopocena dalle 00:30 a 30€ Early Bird con 1 drink e Tavoli VIP dalle 00:30 da 600€ (8 ospiti), 900€ pedana (10) e 1.500€ consolle (15). Prenotazioni ufficiali partner senza commissioni su WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Gala Dinner (20:30) & Club House, Nu-Disco, Hip-Hop (00:30–05:00)',
    dressCode: 'Fashion / Cocktail Attire elegante da sera',
    priceSummary: 'Ingresso 00:30 Early Bird 30€ (1 drink) · Gala Dinner 20:30 Early Bird 150€ (Carne o Pesce) · Tavoli 600€ / 900€ / 1.500€',
    tiers: [
      {
        label: 'Ingresso Club dalle 00:30 (Early Bird)',
        price: '30€ a persona',
        details: 'Accesso serale alla sala club dalle 00:30 con 1 consumazione inclusa · prenotazione diretta partner WhatsApp',
      },
      {
        label: 'Gala Dinner Servita dalle 20:30 (Early Bird · Carne o Pesce)',
        price: '150€ a persona',
        details: 'Flûte Bellavista Alma, 3 antipasti, 2 portate main, panettone artigianale, 1 bottiglia vino ogni 4, acqua e guardaroba inclusi',
      },
      {
        label: 'Tavoli VIP dalle 00:30 (Base / Pedana / Consolle)',
        price: '600€ / 900€ / 1.500€',
        details: '600€ Base (max 8 ospiti) · 900€ Pedana (max 10 ospiti) · 1.500€ Consolle (max 15 ospiti) con bottle list ufficiale TOM.',
      },
    ],
    highlights: [
      `Location: TOM. The Ordinary Market (${TOM_ADDR})`,
      'Cena dalle 20:30: 150€ Early Bird (Menu di Carne o Menu di Pesce con Bellavista Alma, vino 1/4 e guardaroba)',
      'Dopocena dalle 00:30: 30€ Early Bird (1 drink) · Tavoli 600€ x 8 / 900€ x 10 / 1.500€ x 15',
      'Partner ufficiale Nightlife Milan · prenotazione diretta senza fee su WhatsApp +39 351 912 7047',
    ],
    sourceBasis:
      'Listino, Menu Cena (Carne e Pesce) e Bottle List ufficiali 2027 confermati direttamente da TOM. The Ordinary Market (Via Molino delle Armi 16): Gala Dinner 150€ Early Bird (20:30), Ingresso Club 30€ Early Bird con 1 drink (00:30), Tavoli 600€ x 8 / 900€ x 10 / 1.500€ x 15. Prenotazioni partner WhatsApp +39 351 912 7047.',
    scheduleHeading: 'Programma Orario 31 Dicembre 2026',
    schedule: [
      { time: '20:30', label: 'Accoglienza Gala Dinner con Flûte Bellavista Alma e servizio Menu Carne o Pesce (150€)' },
      { time: '00:00', label: 'Countdown e brindisi di Mezzanotte The Midnight Ball' },
      { time: '00:30', label: 'Apertura Ingresso Club Early Bird (30€ con 1 drink) e Tavoli VIP (600€ / 900€ / 1.500€)' },
      { time: '05:00', label: 'Chiusura della notte di San Silvestro' },
    ],
    menusHeading: 'Menu Cena Ufficiale & Bottle List 2027',
    menuDinnerTitle: 'Menu Gala Dinner NYE 2027 · Carne o Pesce',
    menuDinnerSub: 'Dalle 20:30 · 150€ Early Bird · Bellavista Alma, vino 1 ogni 4, acqua e guardaroba inclusi',
    menuBottleTitle: 'Bottle List Ufficiale & Tavoli VIP 2027',
    menuBottleSub: 'Dalle 00:30 · Base 600€ (8 pax) · Pedana 900€ (10 pax) · Consolle 1.500€ (15 pax)',
  },
  en: {
    title: 'TOM. The Ordinary Market Milan NYE 2027 · The Midnight Ball',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · Dec 31, ${TOM_HOURS}`,
    description:
      'TOM. (The Ordinary Market) on Via Molino delle Armi 16 presents its official NYE 2027 programme "The Midnight Ball": Seated Gala Dinner from 20:30 at €150 Early Bird with Meat or Fish menu (Bellavista Alma welcome flute, 1 wine bottle per 4 guests, water and coat check included), Club Entry from 00:30 at €30 Early Bird with 1 drink, and VIP Tables from 00:30 at €600 (8 guests), €900 deck (10), and €1,500 DJ console (15). Direct official partner booking with zero booking fees on WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Gala Dinner (20:30) & House, Nu-Disco, Hip-Hop Club (00:30–05:00)',
    dressCode: 'Fashion / Elevated Evening Cocktail Attire',
    priceSummary: '00:30 Club Entry Early Bird €30 (1 drink) · 20:30 Gala Dinner Early Bird €150 (Meat or Fish) · Tables €600 / €900 / €1,500',
    tiers: [
      {
        label: 'Club Entry from 00:30 (Early Bird)',
        price: '€30 per person',
        details: 'Club room admission from 00:30 with 1 drink included · direct partner booking via WhatsApp',
      },
      {
        label: 'Served Gala Dinner from 20:30 (Early Bird · Meat or Fish)',
        price: '€150 per person',
        details: 'Bellavista Alma welcome flute, 3 starters, 2 main courses, artisanal panettone, 1 wine bottle per 4, water & coat check included',
      },
      {
        label: 'VIP Tables from 00:30 (Base / Deck / Console)',
        price: '€600 / €900 / €1,500',
        details: '€600 Base (up to 8 guests) · €900 Stage Deck (up to 10 guests) · €1,500 DJ Console (up to 15 guests) with full TOM. bottle list',
      },
    ],
    highlights: [
      `Venue: TOM. The Ordinary Market (${TOM_ADDR})`,
      'Dinner from 20:30: €150 Early Bird (Meat or Fish Menu with Bellavista Alma, wine 1/4 & coat check)',
      'After-Midnight from 00:30: €30 Early Bird (1 drink) · VIP Tables €600 (8) / €900 (10) / €1,500 (15)',
      'Official Nightlife Milan Partner · direct booking with zero fees on WhatsApp +39 351 912 7047',
    ],
    sourceBasis:
      'Confirmed official NYE 2027 rate card, Meat & Fish Dinner Menus and Bottle List from TOM. The Ordinary Market (Via Molino delle Armi 16): €150 Early Bird Gala Dinner (20:30), €30 Early Bird Club Entry with 1 drink (00:30), VIP Tables €600 x 8 / €900 x 10 / €1,500 x 15. Direct partner bookings on WhatsApp +39 351 912 7047.',
    scheduleHeading: 'December 31, 2026 Schedule',
    schedule: [
      { time: '20:30', label: 'Gala Dinner reception with Bellavista Alma flute & Meat or Fish Menu (€150)' },
      { time: '00:00', label: 'The Midnight Ball countdown & New Year toast' },
      { time: '00:30', label: 'Early Bird Club Entry (€30 with 1 drink) & VIP Tables (€600 / €900 / €1,500)' },
      { time: '05:00', label: 'Closing of New Year’s Eve celebration' },
    ],
    menusHeading: 'Official NYE 2027 Dinner Menus & Bottle List',
    menuDinnerTitle: 'NYE 2027 Gala Dinner Menu · Meat or Fish',
    menuDinnerSub: 'From 20:30 · €150 Early Bird · Bellavista Alma, 1 wine bottle per 4, water & coat check',
    menuBottleTitle: 'Official 2027 Bottle List & VIP Tables',
    menuBottleSub: 'From 00:30 · Base €600 (8 pax) · Deck €900 (10 pax) · Console €1,500 (15 pax)',
  },
  es: {
    title: 'Nochevieja TOM. The Ordinary Market Milán 2027 · The Midnight Ball',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · 31 dic ${TOM_HOURS}`,
    description:
      'TOM. The Ordinary Market en Via Molino delle Armi 16 confirma el programa oficial 2027 «The Midnight Ball»: Cena de Gala desde las 20:30 a 150€ Early Bird (Menú de Carne o Pescado con Bellavista Alma, 1 botella de vino cada 4, agua y guardarropa), Entrada Club desde las 00:30 a 30€ Early Bird con 1 copa y Mesas VIP de 600€ (8), 900€ (10) y 1.500€ (15). Reservas directas sin comisiones por WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Cena de Gala (20:30) y Club House, Nu-Disco, Hip-Hop (00:30–05:00)',
    dressCode: 'Fashion / Etiqueta elegante de noche',
    priceSummary: 'Club 00:30 Early Bird 30€ (1 copa) · Cena de Gala 20:30 Early Bird 150€ · Mesas 600€ / 900€ / 1.500€',
    tiers: [
      { label: 'Entrada Club desde 00:30 (Early Bird)', price: '30€', details: 'Acceso al club desde las 00:30 con 1 consumición incluida' },
      { label: 'Cena de Gala 20:30 (Early Bird · Carne o Pescado)', price: '150€', details: 'Bellavista Alma, 3 entrantes, 2 principales, panettone, 1 vino cada 4, agua y guardarropa' },
      { label: 'Mesas VIP desde 00:30 (Base / Tarima / Cabina)', price: '600€ / 900€ / 1.500€', details: '600€ (8 pers.) · 900€ (10 pers.) · 1.500€ (15 pers.) con carta oficial de botellas' },
    ],
    highlights: [
      `Sala: TOM. The Ordinary Market (${TOM_ADDR})`,
      'Cena 20:30: 150€ Early Bird (Carne o Pescado con Bellavista Alma y guardarropa)',
      'Club 00:30: 30€ Early Bird (1 copa) · Mesas 600€ / 900€ / 1.500€',
      'Partner oficial sin comisiones · WhatsApp +39 351 912 7047',
    ],
    sourceBasis: 'Tarifas oficiales 2027, Menús Carne/Pescado y Carta de Botellas confirmados por TOM. Milano: Cena 150€, Club 30€, Mesas 600/900/1.500€.',
    scheduleHeading: 'Horario 31 de Diciembre 2026',
    schedule: [
      { time: '20:30', label: 'Cena de Gala con Bellavista Alma (150€ · Carne o Pescado)' },
      { time: '00:00', label: 'Brindis y cuenta atrás The Midnight Ball' },
      { time: '00:30', label: 'Apertura Club Early Bird (30€) y Mesas VIP (600€ / 900€ / 1.500€)' },
      { time: '05:00', label: 'Cierre de la noche' },
    ],
    menusHeading: 'Menús Oficiales 2027 y Carta de Botellas',
    menuDinnerTitle: 'Menú Cena de Gala 2027 · Carne o Pescado',
    menuDinnerSub: 'Desde 20:30 · 150€ Early Bird · Bellavista Alma, vino 1 cada 4 y guardarropa',
    menuBottleTitle: 'Carta de Botellas y Mesas VIP 2027',
    menuBottleSub: 'Desde 00:30 · 600€ (8) · 900€ (10) · 1.500€ (15)',
  },
  fr: {
    title: 'Nouvel An TOM. The Ordinary Market Milan 2027 · The Midnight Ball',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · 31 déc ${TOM_HOURS}`,
    description:
      'TOM. The Ordinary Market, Via Molino delle Armi 16, dévoile le programme officiel 2027 « The Midnight Ball » : Dîner de Gala dès 20h30 à 150€ Early Bird (Menu Viande ou Poisson avec flûte Bellavista Alma, 1 bouteille de vin pour 4, eau et vestiaire), Entrée Club dès 00h30 à 30€ Early Bird (1 boisson) et Tables VIP dès 00h30 à 600€ (8), 900€ (10) et 1.500€ (15). Réservation partenaire directe sans frais via WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Dîner de Gala (20h30) & Club House, Nu-Disco, Hip-Hop (00h30–05h00)',
    dressCode: 'Fashion / Tenue de cocktail élégante',
    priceSummary: 'Club 00h30 Early Bird 30€ (1 verre) · Dîner Gala 20h30 Early Bird 150€ · Tables 600€ / 900€ / 1.500€',
    tiers: [
      { label: 'Entrée Club dès 00h30 (Early Bird)', price: '30€', details: 'Accès club dès 00h30 avec 1 consommation incluse' },
      { label: 'Dîner de Gala 20h30 (Early Bird · Viande ou Poisson)', price: '150€', details: 'Flûte Bellavista Alma, 3 entrées, 2 plats, panettone, 1 vin pour 4, eau et vestiaire' },
      { label: 'Tables VIP dès 00h30 (Base / Estrade / Console)', price: '600€ / 900€ / 1.500€', details: '600€ (8 pers.) · 900€ (10 pers.) · 1.500€ (15 pers.) avec carte des bouteilles officielle' },
    ],
    highlights: [
      `Lieu : TOM. The Ordinary Market (${TOM_ADDR})`,
      'Dîner 20h30 : 150€ Early Bird (Viande ou Poisson, Bellavista Alma et vestiaire)',
      'Club 00h30 : 30€ Early Bird (1 verre) · Tables 600€ / 900€ / 1.500€',
      'Partenaire officiel sans frais · WhatsApp +39 351 912 7047',
    ],
    sourceBasis: 'Tarifs officiels 2027, Menus Viande/Poisson et Carte des Bouteilles confirmés par TOM. Milan : Dîner 150€, Club 30€, Tables 600/900/1.500€.',
    scheduleHeading: 'Programme du 31 Décembre 2026',
    schedule: [
      { time: '20:30', label: 'Dîner de Gala avec Bellavista Alma (150€ · Viande ou Poisson)' },
      { time: '00:00', label: 'Compte à rebours et toast de Minuit' },
      { time: '00:30', label: 'Entrée Club Early Bird (30€) & Tables VIP (600€ / 900€ / 1.500€)' },
      { time: '05:00', label: 'Clôture de la soirée' },
    ],
    menusHeading: 'Menus Officiels 2027 & Carte des Bouteilles',
    menuDinnerTitle: 'Menu Dîner de Gala 2027 · Viande ou Poisson',
    menuDinnerSub: 'Dès 20h30 · 150€ Early Bird · Bellavista Alma, vin 1 pour 4 et vestiaire',
    menuBottleTitle: 'Carte des Bouteilles & Tables VIP 2027',
    menuBottleSub: 'Dès 00h30 · 600€ (8) · 900€ (10) · 1.500€ (15)',
  },
  de: {
    title: 'Silvester TOM. The Ordinary Market Mailand 2027 · The Midnight Ball',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · 31. Dez ${TOM_HOURS}`,
    description:
      'TOM. The Ordinary Market in der Via Molino delle Armi 16 präsentiert das offizielle Silvesterprogramm 2027 „The Midnight Ball“: Gala-Dinner ab 20:30 für 150€ Early Bird (Fleisch- oder Fischmenü inkl. Bellavista Alma, 1 Flasche Wein pro 4 Gäste, Wasser & Garderobe), Club-Eintritt ab 00:30 für 30€ Early Bird (1 Drink) und VIP-Tische ab 00:30 für 600€ (8), 900€ (10) und 1.500€ (15). Direkte Partnerbuchung ohne Gebühren über WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Gala-Dinner (20:30) & House, Nu-Disco, Hip-Hop Club (00:30–05:00)',
    dressCode: 'Fashion / Elegante Abend- & Cocktailgarderobe',
    priceSummary: 'Club 00:30 Early Bird 30€ (1 Drink) · Gala-Dinner 20:30 Early Bird 150€ · Tische 600€ / 900€ / 1.500€',
    tiers: [
      { label: 'Club-Eintritt ab 00:30 (Early Bird)', price: '30€', details: 'Einlass ab 00:30 inklusive 1 Drink' },
      { label: 'Gala-Dinner ab 20:30 (Early Bird · Fleisch oder Fisch)', price: '150€', details: 'Bellavista Alma, 3 Vorspeisen, 2 Hauptgänge, Panettone, 1 Wein pro 4, Wasser & Garderobe' },
      { label: 'VIP-Tische ab 00:30 (Base / Podest / Konsole)', price: '600€ / 900€ / 1.500€', details: '600€ (8 Pers.) · 900€ (10 Pers.) · 1.500€ (15 Pers.) mit offizieller Flaschenliste' },
    ],
    highlights: [
      `Location: TOM. The Ordinary Market (${TOM_ADDR})`,
      'Dinner 20:30: 150€ Early Bird (Fleisch oder Fisch mit Bellavista Alma & Garderobe)',
      'Club 00:30: 30€ Early Bird (1 Drink) · Tische 600€ / 900€ / 1.500€',
      'Offizieller Partner ohne Buchungsgebühr · WhatsApp +39 351 912 7047',
    ],
    sourceBasis: 'Offizielle Preise 2027, Menüs und Flaschenliste bestätigt von TOM. Milano: Dinner 150€, Club 30€, Tische 600/900/1.500€.',
    scheduleHeading: 'Zeitplan 31. Dezember 2026',
    schedule: [
      { time: '20:30', label: 'Gala-Dinner Empfang mit Bellavista Alma (150€ · Fleisch oder Fisch)' },
      { time: '00:00', label: 'Mitternachts-Countdown The Midnight Ball' },
      { time: '00:30', label: 'Club-Eintritt Early Bird (30€) & VIP-Tische (600€ / 900€ / 1.500€)' },
      { time: '05:00', label: 'Ende der Silvesternacht' },
    ],
    menusHeading: 'Offizielle Menüs 2027 & Flaschenliste',
    menuDinnerTitle: 'Silvester-Gala-Menü 2027 · Fleisch oder Fisch',
    menuDinnerSub: 'Ab 20:30 · 150€ Early Bird · Bellavista Alma, Wein 1/4 & Garderobe',
    menuBottleTitle: 'Offizielle Flaschenliste & VIP-Tische 2027',
    menuBottleSub: 'Ab 00:30 · 600€ (8) · 900€ (10) · 1.500€ (15)',
  },
  pt: {
    title: 'Réveillon TOM. The Ordinary Market Milão 2027 · The Midnight Ball',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · 31 dez ${TOM_HOURS}`,
    description:
      'O TOM. The Ordinary Market (Via Molino delle Armi 16) confirma o programa oficial 2027 «The Midnight Ball»: Jantar de Gala às 20:30 por 150€ Early Bird (Menu Carne ou Peixe com Bellavista Alma, 1 garrafa de vinho a cada 4, água e bengaleiro), Entrada Club às 00:30 por 30€ Early Bird com 1 drink e Mesas VIP de 600€ (8), 900€ (10) e 1.500€ (15). Reserva oficial parceira sem taxas no WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Jantar de Gala (20:30) e Club House, Nu-Disco, Hip-Hop (00:30–05:00)',
    dressCode: 'Fashion / Traje social elegante de noite',
    priceSummary: 'Club 00:30 Early Bird 30€ (1 drink) · Jantar Gala 20:30 Early Bird 150€ · Mesas 600€ / 900€ / 1.500€',
    tiers: [
      { label: 'Entrada Club a partir das 00:30 (Early Bird)', price: '30€', details: 'Acesso ao club desde as 00:30 com 1 drink incluído' },
      { label: 'Jantar de Gala 20:30 (Early Bird · Carne ou Peixe)', price: '150€', details: 'Bellavista Alma, 3 entradas, 2 principais, panettone, 1 vinho a cada 4, água e bengaleiro' },
      { label: 'Mesas VIP desde 00:30 (Base / Palco / Console)', price: '600€ / 900€ / 1.500€', details: '600€ (8) · 900€ (10) · 1.500€ (15) com carta oficial de garrafas' },
    ],
    highlights: [
      `Local: TOM. The Ordinary Market (${TOM_ADDR})`,
      'Jantar 20:30: 150€ Early Bird (Carne ou Peixe com Bellavista Alma)',
      'Club 00:30: 30€ Early Bird (1 drink) · Mesas 600€ / 900€ / 1.500€',
      'Parceiro oficial sem taxas · WhatsApp +39 351 912 7047',
    ],
    sourceBasis: 'Tabela oficial 2027, Menus Carne/Peixe e Carta de Garrafas confirmados pelo TOM. Milão: Jantar 150€, Club 30€, Mesas 600/900/1.500€.',
    scheduleHeading: 'Programação 31 de Dezembro 2026',
    schedule: [
      { time: '20:30', label: 'Jantar de Gala com Bellavista Alma (150€ · Carne ou Peixe)' },
      { time: '00:00', label: 'Contagem regressiva e brinde da Meia-Noite' },
      { time: '00:30', label: 'Entrada Club Early Bird (30€) e Mesas VIP (600€ / 900€ / 1.500€)' },
      { time: '05:00', label: 'Encerramento da festa' },
    ],
    menusHeading: 'Menus Oficiais 2027 e Carta de Garrafas',
    menuDinnerTitle: 'Menu Jantar de Gala 2027 · Carne ou Peixe',
    menuDinnerSub: 'Desde 20:30 · 150€ Early Bird · Bellavista Alma, vinho 1/4 e bengaleiro',
    menuBottleTitle: 'Carta de Garrafas e Mesas VIP 2027',
    menuBottleSub: 'Desde 00:30 · 600€ (8) · 900€ (10) · 1.500€ (15)',
  },
  nl: {
    title: 'Oud en Nieuw TOM. The Ordinary Market Milaan 2027 · The Midnight Ball',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · 31 dec ${TOM_HOURS}`,
    description:
      'TOM. The Ordinary Market aan de Via Molino delle Armi 16 presenteert het officiële 2027-programma «The Midnight Ball»: Galadiner vanaf 20:30 voor €150 Early Bird (Vlees- of Vismenu met Bellavista Alma, 1 fles wijn per 4 gasten, water en garderobe), Clubtoegang vanaf 00:30 voor €30 Early Bird (1 drankje) en VIP-tafels van €600 (8), €900 (10) en €1.500 (15). Directe partnerboeking zonder kosten via WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Galadiner (20:30) & House, Nu-Disco, Hip-Hop Club (00:30–05:00)',
    dressCode: 'Fashion / Stijlvolle cocktailkleding',
    priceSummary: 'Club 00:30 Early Bird €30 (1 drankje) · Galadiner 20:30 Early Bird €150 · Tafels €600 / €900 / €1.500',
    tiers: [
      { label: 'Clubtoegang vanaf 00:30 (Early Bird)', price: '€30', details: 'Toegang vanaf 00:30 inclusief 1 drankje' },
      { label: 'Galadiner vanaf 20:30 (Early Bird · Vlees of Vis)', price: '€150', details: 'Bellavista Alma, 3 voorgerechten, 2 hoofdgerechten, panettone, 1 wijn per 4, water en garderobe' },
      { label: 'VIP-Tafels vanaf 00:30 (Base / Podium / Console)', price: '€600 / €900 / €1.500', details: '€600 (8 pers.) · €900 (10 pers.) · €1.500 (15 pers.) met officiële flessenlijst' },
    ],
    highlights: [
      `Locatie: TOM. The Ordinary Market (${TOM_ADDR})`,
      'Diner 20:30: €150 Early Bird (Vlees of Vis met Bellavista Alma & garderobe)',
      'Club 00:30: €30 Early Bird (1 drankje) · Tafels €600 / €900 / €1.500',
      'Officiële partner zonder boekingskosten · WhatsApp +39 351 912 7047',
    ],
    sourceBasis: 'Officiële 2027-prijzen, menu’s en flessenlijst bevestigd door TOM. Milaan: Diner €150, Club €30, Tafels €600/€900/€1.500.',
    scheduleHeading: 'Programma 31 December 2026',
    schedule: [
      { time: '20:30', label: 'Galadiner met Bellavista Alma (€150 · Vlees of Vis)' },
      { time: '00:00', label: 'Middernacht countdown The Midnight Ball' },
      { time: '00:30', label: 'Clubtoegang Early Bird (€30) & VIP-Tafels (€600 / €900 / €1.500)' },
      { time: '05:00', label: 'Einde van de avond' },
    ],
    menusHeading: 'Officiële Menu’s 2027 & Flessenlijst',
    menuDinnerTitle: 'Galadiner Menu 2027 · Vlees of Vis',
    menuDinnerSub: 'Vanaf 20:30 · €150 Early Bird · Bellavista Alma, wijn 1/4 en garderobe',
    menuBottleTitle: 'Officiële Flessenlijst & VIP-Tafels 2027',
    menuBottleSub: 'Vanaf 00:30 · €600 (8) · €900 (10) · €1.500 (15)',
  },
  ru: {
    title: 'Новый год в TOM. The Ordinary Market Милан 2027 · The Midnight Ball',
    subtitle: `TOM. The Ordinary Market · ${TOM_ADDR} · 31 дек ${TOM_HOURS}`,
    description:
      'TOM. The Ordinary Market на Via Molino delle Armi 16 подтвердил официальную программу 2027 «The Midnight Ball»: Гала-ужин с 20:30 за 150€ Early Bird (Мясное или Рыбное меню, приветственный Bellavista Alma, 1 бутылка вина на 4 гостей, вода и гардероб), вход в клуб с 00:30 за 30€ Early Bird (1 напиток) и VIP-столы 600€ (8), 900€ (10) и 1.500€ (15). Прямое партнерское бронирование без комиссии в WhatsApp +39 351 912 7047.',
    musicAndFormat: 'The Midnight Ball · Гала-ужин (20:30) и клуб House, Nu-Disco, Hip-Hop (00:30–05:00)',
    dressCode: 'Fashion / Элегантный вечерний коктейльный стиль',
    priceSummary: 'Клуб 00:30 Early Bird 30€ (1 напиток) · Гала-ужин 20:30 Early Bird 150€ · Столы 600€ / 900€ / 1.500€',
    tiers: [
      { label: 'Вход в клуб с 00:30 (Early Bird)', price: '30€', details: 'Доступ в клуб с 00:30 с 1 напитком' },
      { label: 'Гала-ужин с 20:30 (Early Bird · Мясо или Рыба)', price: '150€', details: 'Bellavista Alma, 3 закуски, 2 основных блюда, панеттоне, 1 вино на 4, вода и гардероб' },
      { label: 'VIP-столы с 00:30 (Base / Подиум / Консоль)', price: '600€ / 900€ / 1.500€', details: '600€ (8 гостей) · 900€ (10 гостей) · 1.500€ (15 гостей) по официальной карте бутылок' },
    ],
    highlights: [
      `Площадка: TOM. The Ordinary Market (${TOM_ADDR})`,
      'Ужин 20:30: 150€ Early Bird (Мясо или Рыба с Bellavista Alma и гардеробом)',
      'Клуб 00:30: 30€ Early Bird (1 напиток) · Столы 600€ / 900€ / 1.500€',
      'Официальный партнер без комиссии · WhatsApp +39 351 912 7047',
    ],
    sourceBasis: 'Официальный прайс 2027, меню ужина и карта бутылок подтверждены TOM. Milano: ужин 150€, вход 30€, столы 600/900/1.500€.',
    scheduleHeading: 'Расписание 31 Декабря 2026',
    schedule: [
      { time: '20:30', label: 'Гала-ужин с Bellavista Alma (150€ · Мясо или Рыба)' },
      { time: '00:00', label: 'Полуночный отсчет The Midnight Ball' },
      { time: '00:30', label: 'Вход Early Bird (30€) и VIP-столы (600€ / 900€ / 1.500€)' },
      { time: '05:00', label: 'Завершение вечера' },
    ],
    menusHeading: 'Официальные Меню 2027 и Карта Бутылок',
    menuDinnerTitle: 'Меню Гала-ужина 2027 · Мясо или Рыба',
    menuDinnerSub: 'С 20:30 · 150€ Early Bird · Bellavista Alma, вино 1/4 и гардероб',
    menuBottleTitle: 'Карта Бутылок и VIP-столы 2027',
    menuBottleSub: 'С 00:30 · 600€ (8) · 900€ (10) · 1.500€ (15)',
  },
};

function makeTomFallbackPack(
  title: string,
  subtitle: string,
  description: string,
  dressCode: string,
  priceSummary: string,
  tierLabels: [string, string, string],
  highlight3: string,
  highlight4: string,
): TomLocalePack {
  const en = TOM_PACKS.en;
  return {
    title,
    subtitle,
    description,
    musicAndFormat: en.musicAndFormat,
    dressCode,
    priceSummary,
    tiers: [
      { label: tierLabels[0], price: '€30', details: en.tiers[0].details },
      { label: tierLabels[1], price: '€150', details: en.tiers[1].details },
      { label: tierLabels[2], price: '€600 / €900 / €1,500', details: en.tiers[2].details },
    ],
    highlights: [
      `TOM. The Ordinary Market (${TOM_ADDR})`,
      `31 Dec · ${TOM_HOURS}`,
      highlight3,
      highlight4,
    ],
    sourceBasis: en.sourceBasis,
    scheduleHeading: en.scheduleHeading,
    schedule: en.schedule,
    menusHeading: en.menusHeading,
    menuDinnerTitle: en.menuDinnerTitle,
    menuDinnerSub: en.menuDinnerSub,
    menuBottleTitle: en.menuBottleTitle,
    menuBottleSub: en.menuBottleSub,
  };
}

const ALL_TOM_PACKS: Record<LocaleCode, TomLocalePack> = {
  ...TOM_PACKS,
  pl: makeTomFallbackPack(
    'Sylwester TOM. The Ordinary Market Mediolan 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 gru ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) zaprasza na oficjalny Sylwester 2027 «The Midnight Ball»: Kolacja Galowa od 20:30 za 150€ Early Bird (Menu Mięsne lub Rybne z Bellavista Alma, winem i szatnią), Wstęp do klubu od 00:30 za 30€ Early Bird (1 drink) i Stoliki VIP 600€/900€/1.500€. Bezpośrednia rezerwacja WhatsApp +39 351 912 7047.',
    'Fashion / Elegancki strój koktajlowy',
    'Klub 00:30 30€ · Kolacja 20:30 150€ · Stoliki 600€ / 900€ / 1.500€',
    ['Wstęp do klubu od 00:30 (Early Bird)', 'Kolacja Galowa od 20:30 (Mięso lub Ryba)', 'Stoliki VIP od 00:30'],
    'The Midnight Ball · Kolacja 150€ & Klub 30€',
    'Oficjalny partner bez prowizji · WhatsApp +39 351 912 7047',
  ),
  ro: makeTomFallbackPack(
    'Revelion TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) confirmă programul oficial 2027 «The Midnight Ball»: Cină de Gală de la 20:30 la 150€ Early Bird (Meniu Carne sau Pește cu Bellavista Alma, vin 1/4 și garderobă), Intrare Club de la 00:30 la 30€ Early Bird (1 drink) și Mese VIP 600€/900€/1.500€. Rezervări directe WhatsApp +39 351 912 7047.',
    'Fashion / Ținută elegantă de seară',
    'Club 00:30 30€ · Cină 20:30 150€ · Mese 600€ / 900€ / 1.500€',
    ['Intrare Club 00:30 (Early Bird)', 'Cină de Gală 20:30 (Carne sau Pește)', 'Mese VIP 00:30'],
    'The Midnight Ball · Cină 150€ & Club 30€',
    'Partener oficial fără comision · WhatsApp +39 351 912 7047',
  ),
  sv: makeTomFallbackPack(
    'Nyårsafton TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) presenterar «The Midnight Ball» NYE 2027: Galamiddag från 20:30 €150 Early Bird (Kött- eller Fiskmeny med Bellavista Alma, vin och garderob), Klubb från 00:30 €30 Early Bird (1 drink) och VIP-bord €600/€900/€1.500. Boka via WhatsApp +39 351 912 7047.',
    'Fashion / Elegant kvällsklädsel',
    'Klubb 00:30 €30 · Galamiddag 20:30 €150 · Bord €600 / €900 / €1.500',
    ['Klubbentré 00:30 (Early Bird)', 'Galamiddag 20:30 (Kött eller Fisk)', 'VIP-bord 00:30'],
    'The Midnight Ball · Middag €150 & Klubb €30',
    'Officiell partner · WhatsApp +39 351 912 7047',
  ),
  da: makeTomFallbackPack(
    'Nytårsaften TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) fejrer nytår med «The Midnight Ball» 2027: Galamiddag fra 20:30 €150 Early Bird (Kød- eller Fiskemenu med Bellavista Alma), Klub fra 00:30 €30 Early Bird (1 drink) og VIP-borde €600/€900/€1.500. WhatsApp +39 351 912 7047.',
    'Fashion / Elegant aftenpåklædning',
    'Klub 00:30 €30 · Galamiddag 20:30 €150 · Borde €600 / €900 / €1.500',
    ['Klubentré 00:30 (Early Bird)', 'Galamiddag 20:30 (Kød eller Fisk)', 'VIP-borde 00:30'],
    'The Midnight Ball · Middag €150 & Klub €30',
    'Officiel partner · WhatsApp +39 351 912 7047',
  ),
  fi: makeTomFallbackPack(
    'Uusivuosi TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31.12. ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) juhlii uuttavuotta «The Midnight Ball» 2027: Gaalaillallinen klo 20:30 150€ Early Bird (Liha- tai Kalamenu, Bellavista Alma), Klubi klo 00:30 30€ Early Bird (1 juoma) ja VIP-pöydät 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Tyylikäs iltapuku',
    'Klubi 00:30 30€ · Gaalaillallinen 20:30 150€ · Pöydät 600€ / 900€ / 1.500€',
    ['Klubisisäänpääsy 00:30 (Early Bird)', 'Gaalaillallinen 20:30', 'VIP-pöydät 00:30'],
    'The Midnight Ball · Illallinen 150€ & Klubi 30€',
    'Virallinen kumppani · WhatsApp +39 351 912 7047',
  ),
  cs: makeTomFallbackPack(
    'Silvestr TOM. The Ordinary Market Milán 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. pro ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) zve na oficiální «The Midnight Ball» 2027: Slavnostní večeře od 20:30 za 150€ Early Bird (Masové nebo Rybí menu s Bellavista Alma), Klub od 00:30 za 30€ Early Bird (1 drink) a VIP stoly 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantní koktejlový dress code',
    'Klub 00:30 30€ · Večeře 20:30 150€ · Stoly 600€ / 900€ / 1.500€',
    ['Vstup do klubu 00:30 (Early Bird)', 'Slavnostní večeře 20:30', 'VIP stoly 00:30'],
    'The Midnight Ball · Večeře 150€ & Klub 30€',
    'Oficiální partner · WhatsApp +39 351 912 7047',
  ),
  el: makeTomFallbackPack(
    'Πρωτοχρονιά TOM. The Ordinary Market Μιλάνο 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 Δεκ ${TOM_HOURS}`,
    'Το TOM. The Ordinary Market (Via Molino delle Armi 16) παρουσιάζει το επίσημο «The Midnight Ball» 2027: Gala Dinner από 20:30 στα 150€ Early Bird (Μενού Κρέατος ή Ψαριού με Bellavista Alma), Είσοδος Club από 00:30 στα 30€ Early Bird (1 ποτό) και VIP τραπέζια 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Κομψό βραδινό ένδυμα',
    'Club 00:30 30€ · Gala Dinner 20:30 150€ · Τραπέζια 600€ / 900€ / 1.500€',
    ['Είσοδος Club 00:30 (Early Bird)', 'Gala Dinner 20:30', 'VIP Τραπέζια 00:30'],
    'The Midnight Ball · Δείπνο 150€ & Club 30€',
    'Επίσημος συνεργάτης · WhatsApp +39 351 912 7047',
  ),
  hu: makeTomFallbackPack(
    'Szilveszter TOM. The Ordinary Market Milánó 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · dec. 31. ${TOM_HOURS}`,
    'A TOM. The Ordinary Market (Via Molino delle Armi 16) hivatalos 2027-es «The Midnight Ball» programja: Gálavacsora 20:30-tól 150€ Early Bird (Hús vagy Hal menü, Bellavista Alma), Klubbelépő 00:30-tól 30€ Early Bird (1 ital) és VIP asztalok 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegáns koktélöltözet',
    'Klub 00:30 30€ · Vacsora 20:30 150€ · Asztalok 600€ / 900€ / 1.500€',
    ['Klubbelépő 00:30 (Early Bird)', 'Gálavacsora 20:30', 'VIP asztalok 00:30'],
    'The Midnight Ball · Vacsora 150€ & Klub 30€',
    'Hivatalos partner · WhatsApp +39 351 912 7047',
  ),
  bg: makeTomFallbackPack(
    'Нова година TOM. The Ordinary Market Милано 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 дек ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) представя «The Midnight Ball» 2027: Гала вечеря от 20:30 за 150€ Early Bird (Месно или Рибно меню с Bellavista Alma), Вход клуб от 00:30 за 30€ Early Bird (1 напитка) и VIP маси 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Елегантен вечерен стил',
    'Клуб 00:30 30€ · Вечеря 20:30 150€ · Маси 600€ / 900€ / 1.500€',
    ['Вход клуб 00:30 (Early Bird)', 'Гала вечеря 20:30', 'VIP маси 00:30'],
    'The Midnight Ball · Вечеря 150€ & Клуб 30€',
    'Официален партньор · WhatsApp +39 351 912 7047',
  ),
  hr: makeTomFallbackPack(
    'Nova godina TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. pro ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) donosi službeni «The Midnight Ball» 2027: Gala večera od 20:30 za 150€ Early Bird (Mesni ili Riblji meni uz Bellavista Alma), Ulaz klub od 00:30 za 30€ Early Bird (1 piće) i VIP stolovi 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantan večernji stil',
    'Klub 00:30 30€ · Večera 20:30 150€ · Stolovi 600€ / 900€ / 1.500€',
    ['Ulaz klub 00:30 (Early Bird)', 'Gala večera 20:30', 'VIP stolovi 00:30'],
    'The Midnight Ball · Večera 150€ & Klub 30€',
    'Službeni partner · WhatsApp +39 351 912 7047',
  ),
  sk: makeTomFallbackPack(
    'Silvester TOM. The Ordinary Market Miláno 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) ponúka oficiálny «The Midnight Ball» 2027: Galavečera od 20:30 za 150€ Early Bird (Mäsové alebo Rybie menu s Bellavista Alma), Klub od 00:30 za 30€ Early Bird (1 drink) a VIP stoly 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantný večerný dress code',
    'Klub 00:30 30€ · Večera 20:30 150€ · Stoly 600€ / 900€ / 1.500€',
    ['Vstup klub 00:30 (Early Bird)', 'Galavečera 20:30', 'VIP stoly 00:30'],
    'The Midnight Ball · Večera 150€ & Klub 30€',
    'Oficiálny partner · WhatsApp +39 351 912 7047',
  ),
  sl: makeTomFallbackPack(
    'Silvestrovo TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) predstavlja uradni «The Midnight Ball» 2027: Gala večerja od 20:30 za 150€ Early Bird (Mesni ali Ribji meni z Bellavista Alma), Klub od 00:30 za 30€ Early Bird (1 pijača) in VIP mize 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantna večerna oprava',
    'Klub 00:30 30€ · Večerja 20:30 150€ · Mize 600€ / 900€ / 1.500€',
    ['Vstop klub 00:30 (Early Bird)', 'Gala večerja 20:30', 'VIP mize 00:30'],
    'The Midnight Ball · Večerja 150€ & Klub 30€',
    'Uradni partner · WhatsApp +39 351 912 7047',
  ),
  lt: makeTomFallbackPack(
    'Naujieji metai TOM. The Ordinary Market Milanas 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · gruod. 31 ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) kviečia į «The Midnight Ball» 2027: Šventinė vakarienė nuo 20:30 už 150€ Early Bird (Mėsos arba Žuvies meniu su Bellavista Alma), Klubas nuo 00:30 už 30€ Early Bird (1 gėrimas) ir VIP staliukai 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantiška vakarinė apranga',
    'Klubas 00:30 30€ · Vakarienė 20:30 150€ · Staliukai 600€ / 900€ / 1.500€',
    ['Įėjimas į klubą 00:30 (Early Bird)', 'Gala vakarienė 20:30', 'VIP staliukai 00:30'],
    'The Midnight Ball · Vakarienė 150€ & Klubas 30€',
    'Oficialus partneris · WhatsApp +39 351 912 7047',
  ),
  lv: makeTomFallbackPack(
    'Jaungada nakts TOM. The Ordinary Market Milāna 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) piedāvā «The Midnight Ball» 2027: Svētku vakariņas no 20:30 par 150€ Early Bird (Gaļas vai Zivju ēdienkarte ar Bellavista Alma), Klubs no 00:30 par 30€ Early Bird (1 dzēriens) un VIP galdiņi 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegants vakara apģērbs',
    'Klubs 00:30 30€ · Vakariņas 20:30 150€ · Galdiņi 600€ / 900€ / 1.500€',
    ['Ieeja klubā 00:30 (Early Bird)', 'Gala vakariņas 20:30', 'VIP galdiņi 00:30'],
    'The Midnight Ball · Vakariņas 150€ & Klubs 30€',
    'Oficiālais partneris · WhatsApp +39 351 912 7047',
  ),
  et: makeTomFallbackPack(
    'Aastavahetus TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. dets ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) kutsub peole «The Midnight Ball» 2027: Galaõhtusöök alates 20:30 150€ Early Bird (Liha- või Kalamenüü, Bellavista Alma), Klubi alates 00:30 30€ Early Bird (1 jook) ja VIP-lauad 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantne õhturiietus',
    'Klubi 00:30 30€ · Õhtusöök 20:30 150€ · Lauad 600€ / 900€ / 1.500€',
    ['Klubi sissepääs 00:30 (Early Bird)', 'Galaõhtusöök 20:30', 'VIP-lauad 00:30'],
    'The Midnight Ball · Õhtusöök 150€ & Klubi 30€',
    'Ametlik partner · WhatsApp +39 351 912 7047',
  ),
  mt: makeTomFallbackPack(
    'Lejlet l-Ewwel tas-Sena TOM. The Ordinary Market Milan 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 Diċ ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) jippreżenta «The Midnight Ball» 2027: Gala Dinner mis-20:30 €150 Early Bird (Menu Laħam jew Ħut b’Bellavista Alma), Dħul Club mis-00:30 €30 Early Bird (1 drink) u Mwejjed VIP €600/€900/€1,500. WhatsApp +39 351 912 7047.',
    'Fashion / Ilbies eleganti ta’ filgħaxija',
    'Club 00:30 €30 · Gala Dinner 20:30 €150 · Mwejjed €600 / €900 / €1,500',
    ['Dħul Club 00:30 (Early Bird)', 'Gala Dinner 20:30', 'Mwejjed VIP 00:30'],
    'The Midnight Ball · Dinner €150 & Club €30',
    'Sieħeb uffiċjali · WhatsApp +39 351 912 7047',
  ),
  ga: makeTomFallbackPack(
    'Oíche Chinn Bhliana TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 Noll ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) le «The Midnight Ball» 2027: Dinnéar Gala ó 20:30 €150 Early Bird (Feoil nó Iasc le Bellavista Alma), Club ó 00:30 €30 Early Bird (1 deoch) agus Táblaí VIP €600/€900/€1,500. WhatsApp +39 351 912 7047.',
    'Fashion / Éadaí galánta tráthnóna',
    'Club 00:30 €30 · Dinnéar 20:30 €150 · Táblaí €600 / €900 / €1,500',
    ['Cead Isteach Club 00:30 (Early Bird)', 'Dinnéar Gala 20:30', 'Táblaí VIP 00:30'],
    'The Midnight Ball · Dinnéar €150 & Club €30',
    'Comhpháirtí oifigiúil · WhatsApp +39 351 912 7047',
  ),
  zh: makeTomFallbackPack(
    '米兰 TOM. The Ordinary Market 2027跨年派对 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 12月31日 ${TOM_HOURS}`,
    'TOM. The Ordinary Market（Via Molino delle Armi 16）官方确认2027跨年活动 «The Midnight Ball»：20:30起盛大晚宴早鸟150€（肉类或海鲜套餐含Bellavista Alma、每4人1瓶酒、水与衣帽间），00:30起夜店入场早鸟30€（含1杯饮品），VIP卡座600€/900€/1.500€。官方合作零手续费预订 WhatsApp +39 351 912 7047。',
    'Fashion / 优雅鸡尾酒晚礼服',
    '夜店 00:30 30€ · 晚宴 20:30 150€ · 卡座 600€ / 900€ / 1.500€',
    ['00:30 夜店入场 (Early Bird)', '20:30 盛大晚宴 (肉类/海鲜)', '00:30 VIP卡座'],
    'The Midnight Ball · 晚宴 150€ & 夜店 30€',
    '官方合作伙伴零手续费 · WhatsApp +39 351 912 7047',
  ),
  ar: makeTomFallbackPack(
    'ليلة رأس السنة 2027 في TOM. The Ordinary Market ميلانو · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 ديسمبر ${TOM_HOURS}`,
    'يقدم TOM. The Ordinary Market في Via Molino delle Armi 16 برنامج 2027 الرسمي «The Midnight Ball»: عشاء فاخر من 20:30 بسعر 150€ Early Bird (قائمة لحوم أو أسماك مع Bellavista Alma ومشروبات وخزانة ملابس)، دخول النادي من 00:30 بسعر 30€ Early Bird (مشروب واحد)، وطاولات VIP بأسعار 600€/900€/1.500€. الحجز المباشر بدون رسوم عبر واتساب +39 351 912 7047.',
    'Fashion / إطلالة سهرة أنيقة',
    'النادي 00:30 30€ · العشاء 20:30 150€ · الطاولات 600€ / 900€ / 1.500€',
    ['دخول النادي 00:30 (Early Bird)', 'عشاء فاخر 20:30', 'طاولات VIP 00:30'],
    'The Midnight Ball · العشاء 150€ والنادي 30€',
    'شريك رسمي بدون رسوم · WhatsApp +39 351 912 7047',
  ),
  tr: makeTomFallbackPack(
    'Yılbaşı TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 Ara ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) resmi 2027 «The Midnight Ball» programı: 20:30 Gala Yemeği 150€ Early Bird (Et veya Balık menüsü, Bellavista Alma, şarap ve vestiyer), 00:30 Kulüp Girişi 30€ Early Bird (1 içki) ve VIP Masalar 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Şık Gece Kokteyl Kıyafeti',
    'Kulüp 00:30 30€ · Gala Yemeği 20:30 150€ · Masalar 600€ / 900€ / 1.500€',
    ['Kulüp Girişi 00:30 (Early Bird)', 'Gala Yemeği 20:30', 'VIP Masalar 00:30'],
    'The Midnight Ball · Yemek 150€ & Kulüp 30€',
    'Resmi ortak · WhatsApp +39 351 912 7047',
  ),
  no: makeTomFallbackPack(
    'Nyttårsaften TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. des ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) presenterer «The Midnight Ball» 2027: Galamiddag fra 20:30 €150 Early Bird (Kjøtt- eller Fiskemeny med Bellavista Alma), Klubb fra 00:30 €30 Early Bird (1 drink) og VIP-bord €600/€900/€1.500. WhatsApp +39 351 912 7047.',
    'Fashion / Elegant kveldsantrekk',
    'Klubb 00:30 €30 · Galamiddag 20:30 €150 · Bord €600 / €900 / €1.500',
    ['Klubbinngang 00:30 (Early Bird)', 'Galamiddag 20:30', 'VIP-bord 00:30'],
    'The Midnight Ball · Middag €150 & Klubb €30',
    'Offisiell partner · WhatsApp +39 351 912 7047',
  ),
  is: makeTomFallbackPack(
    'Gamlárskvöld TOM. The Ordinary Market Mílanó 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. des ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) býður upp á «The Midnight Ball» 2027: hátíðarkvöldverður kl. 20:30 150€ Early Bird (Kjöt eða Fiskur með Bellavista Alma), klúbbur kl. 00:30 30€ Early Bird (1 drykkur) og VIP borð 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Glæsilegur kvöldklæðnaður',
    'Klúbbur 00:30 30€ · Kvöldverður 20:30 150€ · Borð 600€ / 900€ / 1.500€',
    ['Klúbbur 00:30 (Early Bird)', 'Hátíðarkvöldverður 20:30', 'VIP borð 00:30'],
    'The Midnight Ball · Kvöldverður 150€ & Klúbbur 30€',
    'Opinber samstarfsaðili · WhatsApp +39 351 912 7047',
  ),
  uk: makeTomFallbackPack(
    'Новий рік у TOM. The Ordinary Market Мілан 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 груд ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) підтвердив офіційну програму 2027 «The Midnight Ball»: Гала-вечеря з 20:30 за 150€ Early Bird (М’ясне або Рибне меню з Bellavista Alma, вином та гардеробом), Вхід у клуб з 00:30 за 30€ Early Bird (1 напій) та VIP-столи 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Вишуканий коктейльний дрес-код',
    'Клуб 00:30 30€ · Вечеря 20:30 150€ · Столи 600€ / 900€ / 1.500€',
    ['Вхід у клуб 00:30 (Early Bird)', 'Гала-вечеря 20:30', 'VIP-столи 00:30'],
    'The Midnight Ball · Вечеря 150€ & Клуб 30€',
    'Офіційний партнер без комісії · WhatsApp +39 351 912 7047',
  ),
  sq: makeTomFallbackPack(
    'Viti i Ri në TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 Dhj ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) prezanton «The Midnight Ball» 2027: Darka Gala nga 20:30 150€ Early Bird (Menu Mishi ose Peshku me Bellavista Alma), Hyrja Club nga 00:30 30€ Early Bird (1 pije) dhe Tavolinat VIP 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Veshje elegante mbrëmjeje',
    'Club 00:30 30€ · Darka 20:30 150€ · Tavolina 600€ / 900€ / 1.500€',
    ['Hyrja Club 00:30 (Early Bird)', 'Darka Gala 20:30', 'Tavolinat VIP 00:30'],
    'The Midnight Ball · Darka 150€ & Club 30€',
    'Partner zyrtar · WhatsApp +39 351 912 7047',
  ),
  sr: makeTomFallbackPack(
    'Nova godina TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) donosi zvanični «The Midnight Ball» 2027: Gala večera od 20:30 za 150€ Early Bird (Mesni ili Riblji meni uz Bellavista Alma), Ulaz klub od 00:30 za 30€ Early Bird (1 piće) i VIP stolovi 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantan večernji koktel stil',
    'Klub 00:30 30€ · Večera 20:30 150€ · Stolovi 600€ / 900€ / 1.500€',
    ['Ulaz klub 00:30 (Early Bird)', 'Gala večera 20:30', 'VIP stolovi 00:30'],
    'The Midnight Ball · Večera 150€ & Klub 30€',
    'Zvanični partner · WhatsApp +39 351 912 7047',
  ),
  bs: makeTomFallbackPack(
    'Nova godina TOM. The Ordinary Market Milano 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31. dec ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) donosi zvanični «The Midnight Ball» 2027: Gala večera od 20:30 za 150€ Early Bird (Mesni ili Riblji meni uz Bellavista Alma), Ulaz klub od 00:30 za 30€ Early Bird (1 piće) i VIP stolovi 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Elegantan večernji izgled',
    'Klub 00:30 30€ · Večera 20:30 150€ · Stolovi 600€ / 900€ / 1.500€',
    ['Ulaz klub 00:30 (Early Bird)', 'Gala večera 20:30', 'VIP stolovi 00:30'],
    'The Midnight Ball · Večera 150€ & Klub 30€',
    'Zvanični partner · WhatsApp +39 351 912 7047',
  ),
  mk: makeTomFallbackPack(
    'Нова година TOM. The Ordinary Market Милано 2027 · The Midnight Ball',
    `TOM. The Ordinary Market · ${TOM_ADDR} · 31 дек ${TOM_HOURS}`,
    'TOM. The Ordinary Market (Via Molino delle Armi 16) го најавува официјалниот «The Midnight Ball» 2027: Гала вечера од 20:30 за 150€ Early Bird (Месно или Рибно мени со Bellavista Alma), Влез клуб од 00:30 за 30€ Early Bird (1 пијалак) и VIP маси 600€/900€/1.500€. WhatsApp +39 351 912 7047.',
    'Fashion / Елегантен вечерен стил',
    'Клуб 00:30 30€ · Вечера 20:30 150€ · Маси 600€ / 900€ / 1.500€',
    ['Влез клуб 00:30 (Early Bird)', 'Гала вечера 20:30', 'VIP маси 00:30'],
    'The Midnight Ball · Вечера 150€ & Клуб 30€',
    'Официјален партнер · WhatsApp +39 351 912 7047',
  ),
};

export function getTomNyeContent(locale: string): CapodannoLocalizedEventContent {
  const pack = ALL_TOM_PACKS[locale as LocaleCode] || ALL_TOM_PACKS.en;
  const isIt = locale === 'it';
  const menus: CapodannoMenuCard[] = [
    {
      id: 'tom-nye-2027-dinner-150',
      title: pack.menuDinnerTitle,
      price: isIt ? '150€ Early Bird' : '€150 Early Bird',
      subtitle: pack.menuDinnerSub,
      courses: isIt ? TOM_CARNE_PESCE_COURSES_IT : TOM_CARNE_PESCE_COURSES_EN,
      beverages: isIt
        ? 'Flûte di benvenuto Bellavista Alma, 1 bottiglia vino ogni 4 (Ripasso DOC / Greco di Tufo DOCG), acqua e guardaroba inclusi'
        : 'Bellavista Alma welcome flute, 1 wine bottle per 4 guests (Ripasso DOC / Greco di Tufo DOCG), water & coat check included',
      imageSrc: TOM_MENU_IMG,
      imageAlt: pack.menuDinnerTitle,
    },
    {
      id: 'tom-nye-2027-bottle-list',
      title: pack.menuBottleTitle,
      price: isIt ? 'Tavoli 600€ / 900€ / 1.500€' : 'Tables €600 / €900 / €1,500',
      subtitle: pack.menuBottleSub,
      courses: isIt ? TOM_BOTTLE_COURSES_IT : TOM_BOTTLE_COURSES_EN,
      beverages: isIt
        ? 'Ingresso tavoli dalle 00:30 · prenotazione partner diretta senza commissioni su WhatsApp +39 351 912 7047'
        : 'VIP table admission from 00:30 · direct partner booking with zero booking fees on WhatsApp +39 351 912 7047',
      imageSrc: TOM_BOTTLE_IMG,
      imageAlt: pack.menuBottleTitle,
    },
  ];
  return {
    title: pack.title,
    subtitle: pack.subtitle,
    description: pack.description,
    musicAndFormat: pack.musicAndFormat,
    dressCode: pack.dressCode,
    priceSummary: pack.priceSummary,
    tiers: pack.tiers,
    highlights: pack.highlights,
    sourceBasis: pack.sourceBasis,
    scheduleHeading: pack.scheduleHeading,
    schedule: pack.schedule,
    menusHeading: pack.menusHeading,
    menus,
    offerPricesEur: [30, 150, 600, 900, 1500],
  };
}
