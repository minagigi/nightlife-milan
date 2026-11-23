import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const MIB_ADDR = 'Via Gaetano Negri 10 (Piazza Affari), 20123 Milano';
const MIB_MENU_IMG = '/images/events/capodanno-2027-menus/mib-milano-nye-2027-menu-160.webp';

interface MibPack {
  title: string;
  subtitle: string;
  description: string;
  musicAndFormat: string;
  dressCode: string;
  priceSummary: string;
  galaLabel: string;
  galaPrice: string;
  galaDesc: string;
  buffetLabel: string;
  buffetPrice: string;
  buffetDesc: string;
  toastLabel: string;
  toastPrice: string;
  toastDesc: string;
  afterLabel: string;
  afterPrice: string;
  afterDesc: string;
  dinnerTableLabel: string;
  dinnerTablePrice: string;
  dinnerTableDesc: string;
  vipTablesLabel: string;
  vipTablesPrice: string;
  vipTablesDesc: string;
  highlights: [string, string, string, string];
  sourceBasis: string;
  scheduleHeading: string;
  steps: [string, string, string, string, string];
  menusHeading: string;
  menuTitle: string;
  menuSubtitle: string;
  menuBev: string;
  courseLabels: [string, string, string, string, string];
  courseDishes: [string, string, string, string, string];
  menuAlt: string;
}

function buildMibContent(p: MibPack): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: p.galaLabel, price: p.galaPrice, details: p.galaDesc },
    { label: p.buffetLabel, price: p.buffetPrice, details: p.buffetDesc },
    { label: p.toastLabel, price: p.toastPrice, details: p.toastDesc },
    { label: p.afterLabel, price: p.afterPrice, details: p.afterDesc },
    { label: p.dinnerTableLabel, price: p.dinnerTablePrice, details: p.dinnerTableDesc },
    { label: p.vipTablesLabel, price: p.vipTablesPrice, details: p.vipTablesDesc },
  ];
  const times = ['20:00', '20:30', '23:30', '00:00', '00:30'];
  const schedule: CapodannoScheduleStep[] = times.map((time, i) => ({
    time,
    label: p.steps[i],
  }));
  const menus: CapodannoMenuCard[] = [
    {
      id: 'mib-milano-nye-2027-menu-160',
      title: p.menuTitle,
      price: p.galaPrice,
      subtitle: p.menuSubtitle,
      beverages: p.menuBev,
      courses: p.courseLabels.map((course, idx) => ({ course, dish: p.courseDishes[idx] })),
      imageSrc: MIB_MENU_IMG,
      imageAlt: p.menuAlt,
    },
  ];
  return {
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    musicAndFormat: p.musicAndFormat,
    dressCode: p.dressCode,
    priceSummary: p.priceSummary,
    tiers,
    highlights: p.highlights,
    sourceBasis: p.sourceBasis,
    scheduleHeading: p.scheduleHeading,
    schedule,
    menusHeading: p.menusHeading,
    menus,
    offerPricesEur: [160, 70, 50, 40, 250, 300],
  };
}

const IT_PACK: MibPack = {
  title: 'Capodanno MIB Milano 2027 · Gran Galà Dinner & Club in Piazza Affari',
  subtitle: `MIB Milano · ${MIB_ADDR} · Giovedì 31 Dicembre 2026 · 20:00 – 05:30`,
  description:
    'Capodanno 2027 al MIB Milano in Via Gaetano Negri 10, affacciato su Piazza Affari a pochi passi dal Duomo: il Gran Galà Dinner & Club del 31 dicembre 2026 (20:00 – 05:30, 18+) unisce alta ristorazione tra mare e terra, Live Music & Piano Bar con Kent Funk dalle 20:30 e DJ Set House & Hip Hop dalle 23:30 fino all’alba. Scegli tra Cenone Servito a 160€ (con Piemonte Chardonnay o Monferrato Nebbiolo DOC Pepe Rocco, 1 bottiglia ogni 2 ospiti, e brindisi Franciacorta Brut Conti Ducco), Cena Buffet a 70€, Ingresso Brindisi dalle 23:30 a 50€, Ingresso Dopo Mezzanotte a 40€ e Tavoli riservati Basic 300€ (4 pax), Privé 600€ (6 pax), Superprivé 1.200€ (10 pax) o Tavolo Cena 250€ (5 pax).',
  musicAndFormat:
    'Live Music & Piano Bar by Kent Funk (dalle 20:30) · DJ Set House & Hip Hop (dalle 23:30 alle 05:30) · 18+',
  dressCode: 'Elegante di San Silvestro (selezione curata all’ingresso)',
  priceSummary:
    'Cenone Servito 160€ · Buffet 70€ · Brindisi 23:30 50€ · Dopo 00:00 40€ · Tavoli 250€ / 300€ / 600€ / 1.200€',
  galaLabel: 'Cenone Servito di Gala (ingresso dalle 20:00)',
  galaPrice: '160€ a persona',
  galaDesc:
    'Welcome drink con flûte di bollicine, guardaroba, menù servito completo mare e terra (tartare di gambero di Mazara, carpaccio in crosta di sale, paccheri al granchio, tortelloni al Castelmagno DOP, filetto di vitello o ricciola al pistacchio di Bronte), 1 bottiglia di vino ogni 2 persone, calice di Franciacorta Brut Conti Ducco per il brindisi di mezzanotte e serata club.',
  buffetLabel: 'Cenone a Buffet Gran Galà (ingresso dalle 20:00)',
  buffetPrice: '70€ a persona',
  buffetDesc:
    'Ingresso dalle 20:00 per la cena buffet con 1 bicchiere di vino, 1 consumazione, 1 calice di bollicine per il brindisi di mezzanotte, panettone e pandoro artigianali e serata club (seduta non garantita).',
  toastLabel: 'Ingresso Formula Brindisi (dalle 23:30)',
  toastPrice: '50€ a persona',
  toastDesc:
    'Ingresso dalle 23:30 con 1 consumazione, 1 calice di bollicine per il brindisi di mezzanotte, panettone e pandoro artigianali e party House & Hip Hop fino alle 05:30.',
  afterLabel: 'Ingresso Serata Dopo Mezzanotte (dalle 00:00)',
  afterPrice: '40€ a persona',
  afterDesc:
    'Ingresso dopo le ore 24:00 con 1 consumazione inclusa e accesso al DJ Set House & Hip Hop fino alle 05:30.',
  dinnerTableLabel: 'Tavolo Dopocena per Ospiti a Cena (5 pax)',
  dinnerTablePrice: '250€ (5 persone)',
  dinnerTableDesc:
    'Formula dedicata a chi è già a cena: tavolo riservato per 5 persone con 1 bottiglia di champagne o superalcolico inclusa per il dopocena.',
  vipTablesLabel: 'Tavoli Dopocena Basic / Privé / Superprivé (4 / 6 / 10 pax)',
  vipTablesPrice: '300€ / 600€ / 1.200€',
  vipTablesDesc:
    'Per i clienti dopocena: Basic Pista 300€ per 4 persone (1 bottiglia) · Privé 600€ per 6 persone (2 bottiglie) · Superprivé 1.200€ per 10 persone interamente in consumo bottiglie.',
  highlights: [
    `Location iconica in ${MIB_ADDR}, a 400 metri da Piazza Duomo`,
    '20:30 Live Music & Piano Bar con Kent Funk · 23:30 DJ Set House & Hip Hop fino alle 05:30',
    'Menù Gourmet 160€ con gambero rosso di Mazara, paccheri al granchio, tortelloni Castelmagno e Franciacorta Conti Ducco',
    'Acquisto online confermato e Concierge WhatsApp +39 351 912 7047',
  ],
  sourceBasis:
    'Programma, menù e listino ufficiali NYE27 MIB Milano (Via Gaetano Negri 10, Piazza Affari): Cenone 160€, Buffet 70€, Brindisi 23:30 50€, Dopo 00:00 40€, Tavolo cena 250€ (5 pax), Basic 300€ (4 pax), Privé 600€ (6 pax), Superprivé 1.200€ (10 pax).',
  scheduleHeading: 'Programma Ufficiale 31 Dicembre 2026 · MIB Milano Piazza Affari',
  steps: [
    'Accoglienza ospiti per Cenone Servito (160€) e Cena Buffet (70€) con flûte di benvenuto',
    'Live Music & Piano Bar by Kent Funk durante il Gran Cenone di San Silvestro',
    'Apertura ingressi Formula Brindisi (50€) e inizio DJ Set House & Hip Hop',
    'Countdown di mezzanotte con Franciacorta Brut Conti Ducco, panettone e pandoro + ingressi 40€',
    'Clubbing House & Hip Hop e servizio bottiglie ai tavoli Basic, Privé e Superprivé fino alle 05:30',
  ],
  menusHeading: 'Menù Ufficiale del Cenone Servito · NYE27 MIB Milano (160€)',
  menuTitle: 'MIB Milano · Menù del Cenone Servito di Capodanno 2027',
  menuSubtitle: 'Ingresso dalle 20:00 · Secondo piatto a scelta tra carne o pesce in fase di prenotazione',
  menuBev:
    'Vini inclusi per la cena (1 bottiglia ogni 2 persone, a scelta tra): Piemonte Chardonnay DOC 2025 Pepe Rocco oppure Monferrato Nebbiolo DOC 2022 Pepe Rocco · Bollicine per il brindisi: Franciacorta Brut Conti Ducco · Guardaroba e welcome drink inclusi.',
  courseLabels: [
    'Aperitivo di Benvenuto',
    'Antipasti · Mare & Terra',
    'I Primi Piatti & Sorbetto',
    'I Secondi Piatti (a scelta in prenotazione)',
    'Il Dessert della Tradizione',
  ],
  courseDishes: [
    'Flûte di bollicine · Crostone ai cereali e semi tostati con stracciatella di bufala, pesce spada affumicato al legno di faggio e perle di ribes rosso',
    'Incontro dal Mare: Tartare di gambero rosso di Mazara con profumo di lime e maionese leggera al limone · I Profumi della Terra: Carpaccio di manzo cotto a bassa temperatura in crosta di sale (55°C al cuore) su misticanza novella',
    'Paccheri artigianali di Gragnano mantecati con polpa di granchio sfumata al Brandy e vellutata di pomodorino Pachino giallo · Tortelloni di pasta fresca ripieni di zucca mantovana, fonduta morbida al Castelmagno DOP e crumble croccante di pane alle erbe · Sorbetto artigianale al limone di Siracusa e salvia',
    'Filetto di vitello avvolto da un velo di speck croccante, adagiato su schiacciata di patate al timo e riduzione al Balsamico di Modena IGP · oppure: Filetto di ricciola in crosta di pistacchio di Bronte DOP su vellutata di porri e pisellini novelli',
    'Panettone e pandoro artigianali serviti con morbida crema Chantilly',
  ],
  menuAlt: 'Menù ufficiale Cenone Capodanno 2027 MIB Milano Piazza Affari 160€ e listino tavoli',
};

const EN_PACK: MibPack = {
  title: 'MIB Milano NYE 2027 · Grand Gala Dinner & Club at Piazza Affari',
  subtitle: `MIB Milano · ${MIB_ADDR} · Thursday, Dec 31, 2026 · 20:00 – 05:30`,
  description:
    'Celebrate New Year’s Eve 2027 at MIB Milano on Via Gaetano Negri 10, right on Piazza Affari steps from the Duomo: the December 31, 2026 Grand Gala Dinner & Club (20:00 – 05:30, ages 18+) pairs fine seafood-and-land dining with Live Music & Piano Bar by Kent Funk from 20:30 and House & Hip Hop DJ sets from 23:30 until 05:30. Official options: Seated Gala Dinner €160 (including 1 bottle of Pepe Rocco Chardonnay or Nebbiolo DOC per 2 guests + Franciacorta Brut Conti Ducco midnight toast), Buffet Dinner €70, 23:30 Midnight Toast Entry €50, After-Midnight Entry €40, Dinner Guest Table €250 (5 guests), Dancefloor Basic Table €300 (4 guests), Privé €600 (6 guests), and Superprivé €1,200 (10 guests).',
  musicAndFormat:
    '20:30 Live Music & Piano Bar with Kent Funk · 23:30 – 05:30 DJ Set: House & Hip Hop · Ages 18+',
  dressCode: 'New Year’s Eve Elegant attire (curated door selection)',
  priceSummary:
    'Seated Dinner €160 · Buffet €70 · 23:30 Toast €50 · After 00:00 €40 · Tables €250 / €300 / €600 / €1,200',
  galaLabel: 'Served Gala Dinner (entry from 20:00)',
  galaPrice: '€160 per person',
  galaDesc:
    'Welcome sparkling glass, coat check, full served menu (Mazara red prawn tartare, salt-crusted beef carpaccio, Gragnano paccheri with crab, Castelmagno DOP pumpkin tortelloni, veal fillet or Bronte pistachio amberjack), 1 bottle of wine per 2 guests, Franciacorta Brut Conti Ducco midnight toast, and club night.',
  buffetLabel: 'Grand Gala Buffet Dinner (entry from 20:00)',
  buffetPrice: '€70 per person',
  buffetDesc:
    'Entry from 20:00 for the NYE buffet dinner including 1 glass of wine, 1 drink, 1 sparkling flute for the midnight toast, artisan panettone & pandoro, and party access (unseated formula).',
  toastLabel: 'Midnight Toast Admission (from 23:30)',
  toastPrice: '€50 per person',
  toastDesc:
    'Entry from 23:30 with 1 drink, 1 sparkling glass for the midnight toast, artisan panettone & pandoro, and House & Hip Hop clubbing until 05:30.',
  afterLabel: 'After-Midnight Club Admission (from 00:00)',
  afterPrice: '€40 per person',
  afterDesc:
    'Party admission after 00:00 including 1 drink and House & Hip Hop DJ sets until 05:30.',
  dinnerTableLabel: 'After-Dinner Table Add-On for Dinner Guests (5 guests)',
  dinnerTablePrice: '€250 (5 guests)',
  dinnerTableDesc:
    'Exclusively for seated/buffet dinner guests: reserved table for 5 guests with 1 bottle of champagne or premium spirit.',
  vipTablesLabel: 'After-Dinner VIP Tables · Basic / Privé / Superprivé (4 / 6 / 10 guests)',
  vipTablesPrice: '€300 / €600 / €1,200',
  vipTablesDesc:
    'After-dinner bottle service: Basic Dancefloor €300 for 4 guests (1 bottle) · Privé €600 for 6 guests (2 bottles) · Superprivé €1,200 for 10 guests in full bottle credit.',
  highlights: [
    `Landmark Piazza Affari venue (${MIB_ADDR}), 400m from Milan Cathedral`,
    '20:30 Live Music & Piano Bar with Kent Funk · 23:30 House & Hip Hop DJ Set until 05:30',
    '€160 Gourmet Menu with Mazara red prawn, crab paccheri, Castelmagno tortelloni & Conti Ducco Franciacorta',
    'Confirmed online booking & 24/7 WhatsApp Concierge +39 351 912 7047',
  ],
  sourceBasis:
    'Official MIB Milano NYE27 brochure and menu (Via Gaetano Negri 10, Piazza Affari): Seated Dinner €160, Buffet €70, 23:30 Toast €50, After 00:00 €40, Dinner Table €250 (5 pax), Basic €300 (4 pax), Privé €600 (6 pax), Superprivé €1,200 (10 pax).',
  scheduleHeading: 'Official Schedule · December 31, 2026 at MIB Milano',
  steps: [
    'Doors open for Seated Gala Dinner (€160) & Buffet Dinner (€70) with sparkling welcome flute',
    'Live Music & Piano Bar with Kent Funk accompanying the New Year’s Eve dinner',
    'Midnight Toast entry (€50) opens & House / Hip Hop DJ sets kick off',
    'Midnight toast with Franciacorta Brut Conti Ducco, panettone & pandoro + €40 party entry',
    'House & Hip Hop club night and Basic / Privé / Superprivé bottle service until 05:30',
  ],
  menusHeading: 'Official Served Gala Dinner Menu · NYE27 MIB Milano (€160)',
  menuTitle: 'MIB Milano · Official NYE 2027 Served Gala Menu',
  menuSubtitle: 'Entry from 20:00 · Choice of veal fillet or Bronte pistachio amberjack at booking',
  menuBev:
    'Dinner wines included (1 bottle per 2 guests, choice of): Piemonte Chardonnay DOC 2025 Pepe Rocco or Monferrato Nebbiolo DOC 2022 Pepe Rocco · Midnight Toast: Franciacorta Brut Conti Ducco · Coat check & welcome flute included.',
  courseLabels: [
    'Welcome Aperitif',
    'Starters · Sea & Land',
    'First Courses & Sorbet',
    'Main Course (selected at booking)',
    'Traditional Dessert',
  ],
  courseDishes: [
    'Sparkling wine flute · Toasted multigrain crostone with buffalo stracciatella, beechwood-smoked swordfish & redcurrant pearls',
    'From the Sea: Mazara red prawn tartare with lime zest & light lemon mayo · From the Land: Slow-cooked salt-crusted beef carpaccio (55°C core) over baby greens',
    'Artisan Gragnano paccheri tossed with brandy-flambéed crab meat & yellow Pachino tomato velouté · Fresh Mantua pumpkin tortelloni with Castelmagno DOP fondue & herb bread crumble · Artisanal Syracuse lemon & sage sorbet',
    'Veal fillet wrapped in crispy speck on thyme crushed potatoes & Modena Balsamic IGP reduction · or: Amberjack fillet in Bronte DOP pistachio crust over leek velouté & baby peas',
    'Artisan Milanese panettone and pandoro served with velvety Chantilly cream',
  ],
  menuAlt: 'Official MIB Milano Piazza Affari NYE 2027 €160 Gala Menu and VIP table pricing',
};

function makeTranslatedPack(
  title: string,
  subtitle: string,
  description: string,
  musicAndFormat: string,
  dressCode: string,
  priceSummary: string,
  galaLabel: string,
  buffetLabel: string,
  toastLabel: string,
  afterLabel: string,
  vipTablesLabel: string,
  scheduleHeading: string,
  menusHeading: string,
): MibPack {
  return {
    ...EN_PACK,
    title,
    subtitle,
    description,
    musicAndFormat,
    dressCode,
    priceSummary,
    galaLabel,
    buffetLabel,
    toastLabel,
    afterLabel,
    vipTablesLabel,
    scheduleHeading,
    menusHeading,
  };
}

const PACKS: Record<string, MibPack> = {
  it: IT_PACK,
  en: EN_PACK,
  es: makeTranslatedPack(
    'Nochevieja 2027 MIB Milán · Gran Gala Dinner & Club en Piazza Affari',
    `MIB Milano · ${MIB_ADDR} · Jueves 31 Diciembre 2026 · 20:00 – 05:30`,
    'Nochevieja 2027 en MIB Milano (Via Gaetano Negri 10, Piazza Affari, junto al Duomo): Gran Gala Dinner & Club de 20:00 a 05:30 con Live Music & Piano Bar de Kent Funk (20:30) y DJ Set House & Hip Hop (23:30). Cena Servida 160€ (vino Pepe Rocco 1 bot./2 pers. y Franciacorta Conti Ducco), Buffet 70€, Brindis 23:30 50€, Post 00:00 40€ y Mesas VIP 250€ / 300€ / 600€ / 1.200€.',
    '20:30 Live Music & Piano Bar Kent Funk · 23:30 – 05:30 DJ Set House & Hip Hop · 18+',
    'Elegante de Nochevieja',
    'Cena Gala 160€ · Buffet 70€ · Brindis 23:30 50€ · Post 00:00 40€ · Mesas 250€ / 300€ / 600€ / 1.200€',
    'Cena de Gala Servida (desde 20:00)',
    'Cena Buffet Gran Gala (desde 20:00)',
    'Entrada Fórmula Brindis (desde 23:30)',
    'Entrada Después de Medianoche (desde 00:00)',
    'Mesas VIP Pista / Privé / Superprivé (4 / 6 / 10 pers.)',
    'Programa Oficial · 31 Diciembre 2026 en MIB Milano',
    'Menú Oficial Cena Servida 160€ · MIB Milano Piazza Affari',
  ),
  fr: makeTranslatedPack(
    'Nouvel An 2027 MIB Milan · Grand Gala Dinner & Club à Piazza Affari',
    `MIB Milano · ${MIB_ADDR} · Jeudi 31 Décembre 2026 · 20:00 – 05:30`,
    'Réveillon 2027 au MIB Milano (Via Gaetano Negri 10, Piazza Affari, à deux pas du Duomo) : Grand Gala Dinner & Club de 20h00 à 05h30 avec Live Music & Piano Bar par Kent Funk dès 20h30 et DJ Set House & Hip Hop dès 23h30. Dîner Assis 160€ (vin Pepe Rocco 1 bout./2 pers. et Franciacorta Conti Ducco), Buffet 70€, Entrée Toast 23h30 50€, Après Minuit 40€ et Tables VIP 250€ / 300€ / 600€ / 1.200€.',
    '20h30 Live Music & Piano Bar Kent Funk · 23h30 – 05h30 DJ Set House & Hip Hop · 18+',
    'Tenue élégante du Nouvel An',
    'Dîner Assis 160€ · Buffet 70€ · Toast 23h30 50€ · Après 00h00 40€ · Tables 250€ / 300€ / 600€ / 1.200€',
    'Dîner de Gala Servi à Table (dès 20h00)',
    'Dîner Buffet Grand Gala (dès 20h00)',
    'Entrée Formule Toast de Minuit (dès 23h30)',
    'Entrée Club Après Minuit (dès 00h00)',
    'Tables VIP Basic / Privé / Superprivé (4 / 6 / 10 pers.)',
    'Programme Officiel · 31 Décembre 2026 au MIB Milano',
    'Menu Officiel Dîner de Gala 160€ · MIB Milano Piazza Affari',
  ),
  de: makeTranslatedPack(
    'Silvester 2027 MIB Mailand · Grand Gala Dinner & Club an der Piazza Affari',
    `MIB Milano · ${MIB_ADDR} · Donnerstag 31. Dezember 2026 · 20:00 – 05:30`,
    'Silvester 2027 im MIB Milano (Via Gaetano Negri 10, Piazza Affari nahe Dom): Grand Gala Dinner & Club von 20:00 bis 05:30 Uhr mit Live Music & Piano Bar von Kent Funk (ab 20:30) und House & Hip Hop DJ Set (ab 23:30). Gala-Menü 160€ (inkl. 1 Flasche Wein pro 2 Gäste & Franciacorta Conti Ducco), Buffet 70€, 23:30 Toast-Eintritt 50€, Nach Mitternacht 40€ sowie VIP-Tische 250€ / 300€ / 600€ / 1.200€.',
    '20:30 Live Piano Bar Kent Funk · 23:30 – 05:30 House & Hip Hop DJ Set · 18+',
    'Abendgarderobe / Silvester Elegant',
    'Gala-Dinner 160€ · Buffet 70€ · 23:30 Toast 50€ · Ab 00:00 40€ · Tische 250€ / 300€ / 600€ / 1.200€',
    'Serviertes Silvester-Galadinner (ab 20:00)',
    'Silvester-Buffetdinner (ab 20:00)',
    'Mitternachtstoast-Eintritt (ab 23:30)',
    'Club-Eintritt nach Mitternacht (ab 00:00)',
    'VIP-Tische Basic / Privé / Superprivé (4 / 6 / 10 Gäste)',
    'Offizielles Programm · 31. Dezember 2026 im MIB Milano',
    'Offizielles 160€ Galadinner-Menü · MIB Milano Piazza Affari',
  ),
  pt: makeTranslatedPack(
    'Réveillon 2027 MIB Milão · Grand Gala Dinner & Club na Piazza Affari',
    `MIB Milano · ${MIB_ADDR} · Quinta 31 de Dezembro 2026 · 20:00 – 05:30`,
    'Réveillon 2027 no MIB Milano (Via Gaetano Negri 10, Piazza Affari, ao lado do Duomo): Grand Gala Dinner & Club das 20:00 às 05:30 com Live Music & Piano Bar de Kent Funk (20:30) e DJ Set House & Hip Hop (23:30). Ceia Servida 160€ (vinho Pepe Rocco e Franciacorta Conti Ducco), Buffet 70€, Brinde 23:30 50€, Pós 00:00 40€ e Mesas VIP 250€ / 300€ / 600€ / 1.200€.',
    '20:30 Live Music & Piano Bar Kent Funk · 23:30 – 05:30 DJ Set House & Hip Hop · 18+',
    'Traje elegante de Ano Novo',
    'Ceia 160€ · Buffet 70€ · Brinde 23:30 50€ · Pós 00:00 40€ · Mesas 250€ / 300€ / 600€ / 1.200€',
    'Ceia de Gala Servida (20:00)',
    'Ceia Buffet de Gala (20:00)',
    'Ingresso Fórmula Brinde (23:30)',
    'Ingresso Pós-Meia-Noite (00:00)',
    'Mesas VIP Basic / Privé / Superprivé (4 / 6 / 10 pessoas)',
    'Programação Oficial · 31 Dezembro 2026 no MIB Milano',
    'Cardápio Oficial da Ceia 160€ · MIB Milano Piazza Affari',
  ),
  nl: makeTranslatedPack(
    'Oud en Nieuw 2027 MIB Milaan · Grand Gala Dinner & Club op Piazza Affari',
    `MIB Milano · ${MIB_ADDR} · Donderdag 31 december 2026 · 20:00 – 05:30`,
    'Oudejaarsavond 2027 bij MIB Milano (Via Gaetano Negri 10, Piazza Affari bij de Duomo): Grand Gala Dinner & Club van 20:00 tot 05:30 met Live Piano Bar door Kent Funk (20:30) en House & Hip Hop DJ Set (23:30). Galadiner €160, Buffet €70, 23:30 Toast €50, Na 00:00 €40 en VIP-tafels €250 / €300 / €600 / €1.200.',
    '20:30 Live Piano Bar Kent Funk · 23:30 – 05:30 House & Hip Hop DJ Set · 18+',
    'Feestelijk & Elegant Oudjaarsavond',
    'Galadiner €160 · Buffet €70 · 23:30 Toast €50 · Na 00:00 €40 · Tafels €250–€1.200',
    'Uitgeserveerd Galadiner (vanaf 20:00)',
    'Galabuffet Diner (vanaf 20:00)',
    'Middernacht Toast Entree (vanaf 23:30)',
    'Club Entree na Middernacht (vanaf 00:00)',
    'VIP-tafels Basic / Privé / Superprivé (4 / 6 / 10 gasten)',
    'Officieel Programma · 31 dec 2026 bij MIB Milano',
    'Officieel €160 Galadiner Menu · MIB Milano Piazza Affari',
  ),
  ru: makeTranslatedPack(
    'Новый Год 2027 MIB Милан · Гранд-Гала Ужин и Клуб на Пьяцца Аффари',
    `MIB Milano · ${MIB_ADDR} · Четверг 31 декабря 2026 · 20:00 – 05:30`,
    'Новогодняя ночь 2027 в MIB Milano (Via Gaetano Negri 10, Piazza Affari рядом с Дуомо): гала-ужин 160€ (вино Pepe Rocco и Franciacorta Brut Conti Ducco), буфет 70€, вход на тост с 23:30 за 50€, после полуночи 40€, живая музыка Kent Funk и DJ-сет House & Hip Hop до 05:30. VIP-столы: 250€ / 300€ / 600€ / 1.200€.',
    '20:30 Живая музыка Kent Funk · 23:30 – 05:30 DJ Set House & Hip Hop · 18+',
    'Элегантный новогодний дресс-код',
    'Ужин 160€ · Буфет 70€ · Тост 23:30 50€ · После 00:00 40€ · Столы 250€ / 300€ / 600€ / 1.200€',
    'Гала-ужин с подачей (с 20:00)',
    'Новогодний буфет (с 20:00)',
    'Вход на полуночный тост (с 23:30)',
    'Вход в клуб после полуночи (с 00:00)',
    'VIP-столы Basic / Privé / Superprivé (4 / 6 / 10 гостей)',
    'Официальная программа · 31 декабря 2026 MIB Milano',
    'Официальное меню гала-ужина 160€ · MIB Milano',
  ),
  tr: makeTranslatedPack(
    'Yılbaşı 2027 MIB Milano · Piazza Affari Grand Gala Yemek & Kulüp',
    `MIB Milano · ${MIB_ADDR} · 31 Aralık 2026 Perşembe · 20:00 – 05:30`,
    'Duomo yakınındaki Piazza Affari’de MIB Milano (Via Gaetano Negri 10) Yılbaşı 2027 gecesi: Kent Funk canlı piyano bar (20:30) ve House & Hip Hop DJ performansı (23:30–05:30). Gala Yemeği 160€ (Franciacorta Conti Ducco dahil), Açık Büfe 70€, 23:30 Kadeh Kaldırma 50€, 00:00 Sonrası 40€ ve VIP Masalar 250€ / 300€ / 600€ / 1.200€.',
    '20:30 Canlı Müzik Kent Funk · 23:30 – 05:30 House & Hip Hop DJ Set · 18+',
    'Şık Yılbaşı Gecesi Kıyafeti',
    'Gala Yemeği 160€ · Büfe 70€ · 23:30 Giriş 50€ · 00:00 Sonrası 40€ · Masalar 250€–1.200€',
    'Servisli Gala Yemeği (20:00)',
    'Yılbaşı Açık Büfe Yemeği (20:00)',
    'Gece Yarısı Kutlama Girişi (23:30)',
    'Gece Yarısı Sonrası Kulüp Girişi (00:00)',
    'VIP Masalar Basic / Privé / Superprivé (4 / 6 / 10 kişi)',
    'Resmi Program · 31 Aralık 2026 MIB Milano',
    'Resmi 160€ Gala Menüsü · MIB Milano Piazza Affari',
  ),
  zh: makeTranslatedPack(
    '2027跨年夜米兰 MIB Milano · Piazza Affari 盛大晚宴与俱乐部派对',
    `MIB Milano · ${MIB_ADDR} · 2026年12月31日周四 · 20:00 – 05:30`,
    '毗邻米兰大教堂金融广场 Piazza Affari 的 MIB Milano（Via Gaetano Negri 10）2027跨年盛典：20:30 Kent Funk 现场音乐钢琴吧，23:30 至 05:30 House 与 Hip Hop DJ 派对。正装晚宴 160€（含每2人1瓶葡萄酒及 Conti Ducco Franciacorta 祝酒），自助晚宴 70€，23:30 祝酒入场 50€，午夜后入场 40€，VIP卡座 250€ / 300€ / 600€ / 1,200€。',
    '20:30 Kent Funk 现场音乐 · 23:30 – 05:30 House & Hip Hop DJ 派对 · 18+',
    '优雅跨年正装要求',
    '晚宴160€ · 自助70€ · 23:30祝酒50€ · 午夜后40€ · VIP卡座 250€ / 300€ / 600€ / 1,200€',
    '跨年正装侍餐晚宴（20:00入场）',
    '跨年自助晚宴（20:00入场）',
    '23:30 午夜祝酒派对入场',
    '00:00 午夜后俱乐部入场',
    'VIP卡座 Basic / Privé / Superprivé（4 / 6 / 10人）',
    'MIB Milano 官方跨年日程 · 2026年12月31日',
    'MIB Milano 官方160€跨年晚宴菜单',
  ),
  ar: makeTranslatedPack(
    'رأس السنة 2027 في MIB ميلانو · عشاء غالا وسهرة نادي في ساحة أفاري',
    `MIB Milano · ${MIB_ADDR} · الخميس 31 ديسمبر 2026 · 20:00 – 05:30`,
    'احتفل بليلة رأس السنة 2027 في MIB Milano (Via Gaetano Negri 10، Piazza Affari قرب الدومو): عشاء غالا فاخر 160€ مع موسيقى حية Kent Funk الساعة 20:30 وسهرة DJ House & Hip Hop من 23:30 حتى 05:30، بوفيه 70€، دخول نخب منتصف الليل 50€، دخول بعد منتصف الليل 40€ وطاولات VIP بسعر 250€ / 300€ / 600€ / 1,200€.',
    '20:30 موسيقى حية Kent Funk · 23:30 – 05:30 دي جي هاوس وهيب هوب · +18',
    'إطلالة مسائية أنيقة لليلة رأس السنة',
    'العشاء 160€ · البوفيه 70€ · دخول 23:30 بسعر 50€ · بعد 00:00 بسعر 40€ · الطاولات 250€–1,200€',
    'عشاء غالا مخدوم على الطاولة (من 20:00)',
    'عشاء بوفيه رأس السنة (من 20:00)',
    'دخول نخب منتصف الليل (من 23:30)',
    'دخول النادي بعد منتصف الليل (من 00:00)',
    'طاولات VIP Basic / Privé / Superprivé (4 / 6 / 10 ضيوف)',
    'البرنامج الرسمي · 31 ديسمبر 2026 في MIB Milano',
    'قائمة العشاء الرسمية 160€ · MIB Milano Piazza Affari',
  ),
};

const OTHER_24: Record<string, [string, string, string, string, string]> = {
  bg: ['Нова Година 2027 MIB Милано · Гала Вечеря и Клуб на Piazza Affari', 'Гала вечеря на маса (20:00)', 'Новогодишен бюфет (20:00)', 'Вход за полунощен тост (23:30)', 'Официална програма · 31 декември 2026'],
  hr: ['Nova Godina 2027 MIB Milano · Grand Gala Večera i Klub na Piazza Affari', 'Svečana večera u slijedovima (20:00)', 'Gala buffet večera (20:00)', 'Ulaz uz ponoćnu zdravicu (23:30)', 'Službeni program · 31. prosinca 2026.'],
  cs: ['Silvestr 2027 MIB Milán · Grand Gala Večeře a Klub na Piazza Affari', 'Servírovaná galavečeře (20:00)', 'Slavnostní rautová večeře (20:00)', 'Vstup na půlnoční přípitek (23:30)', 'Oficiální program · 31. prosince 2026'],
  da: ['Nytårsaften 2027 MIB Milano · Grand Gala Middag & Klub ved Piazza Affari', 'Serveret Galamiddag (20:00)', 'Nytårsbuffet (20:00)', 'Midnatsskål Entré (23:30)', 'Officielt program · 31. december 2026'],
  et: ['Aastavahetus 2027 MIB Milano · Grand Gala Õhtusöök ja Klubi Piazza Affaril', 'Serveeritud galaõhtusöök (20:00)', 'Pidulik rootsi laud (20:00)', 'Kesköö tervituse sissepääs (23:30)', 'Ametlik ajakava · 31. detsember 2026'],
  fi: ['Uusivuosi 2027 MIB Milano · Grand Gala Illallinen & Klubi Piazza Affarilla', 'Pöytiin tarjoiltu gaalaillallinen (20:00)', 'Juhlabuffet-illallinen (20:00)', 'Keskiyön malja -sisäänpääsy (23:30)', 'Virallinen ohjelma · 31. joulukuuta 2026'],
  el: ['Πρωτοχρονιά 2027 MIB Μιλάνο · Ρεβεγιόν & Κλαμπ στην Piazza Affari', 'Σερβιριστό Δείπνο Γκαλά (20:00)', 'Εορταστικός Μπουφές (20:00)', 'Είσοδος Πρωτοχρονιάτικης Πρόποσης (23:30)', 'Επίσημο Πρόγραμμα · 31 Δεκεμβρίου 2026'],
  hu: ['Szilveszter 2027 MIB Milánó · Grand Gala Vacsora és Klub a Piazza Affarin', 'Felszolgált gálavacsora (20:00)', 'Szilveszteri svédasztalos vacsora (20:00)', 'Éjfél előtti koccintós belépő (23:30)', 'Hivatalos program · 2026. december 31.'],
  ga: ['Oíche Chinn Bhliana 2027 MIB Milano · Dinnéar Mór & Club ag Piazza Affari', 'Dinnéar Gala Riartha (20:00)', 'Dinnéar Buifé Gala (20:00)', 'Cead Isteach Tósta Meán Oíche (23:30)', 'Clár Oifigiúil · 31 Nollaig 2026'],
  lv: ['Jaunais Gads 2027 MIB Milāna · Grand Gala Vakariņas un Klubs Piazza Affari', 'Apkalpotas Gala vakariņas (20:00)', 'Svētku bufetes vakariņas (20:00)', 'Pusnakts tosta ieeja (23:30)', 'Oficiālā programma · 2026. gada 31. decembris'],
  lt: ['Naujieji Metai 2027 MIB Milanas · Grand Gala Vakarienė ir Klubas Piazza Affari', 'Patiekiama Gala vakarienė (20:00)', 'Šventinė furšetinė vakarienė (20:00)', 'Vidurnakčio tosto įėjimas (23:30)', 'Oficiali programa · 2026 m. gruodžio 31 d.'],
  mt: ['Ewwel tas-Sena 2027 MIB Milan · Ikla Gala u Klabb fi Piazza Affari', 'Ikla Gala Servuta (20:00)', 'Ikla Buffet Gala (20:00)', 'Dħul għax-Xewqa ta’ Nofsillejl (23:30)', 'Programm Uffiċjali · 31 ta’ Diċembru 2026'],
  pl: ['Sylwester 2027 MIB Mediolan · Uroczysta Kolacja i Klub przy Piazza Affari', 'Serwowana Kolacja Galowa (20:00)', 'Kolacja Bufetowa Sylwestrowa (20:00)', 'Wstęp z Toastem o Północy (23:30)', 'Oficjalny Program · 31 grudnia 2026'],
  ro: ['Revelion 2027 MIB Milano · Cină Festivă și Club în Piazza Affari', 'Cină Festivă Servită la Masă (20:00)', 'Cină Bufet de Revelion (20:00)', 'Intrare cu Toast la Miezul Nopții (23:30)', 'Program Oficial · 31 Decembrie 2026'],
  sk: ['Silvester 2027 MIB Miláno · Slávnostná Večera a Klub na Piazza Affari', 'Servírovaná galavečera (20:00)', 'Silvestrovská bufetová večera (20:00)', 'Vstup s polnočným prípitkom (23:30)', 'Oficiálny program · 31. decembra 2026'],
  sl: ['Silvestrovo 2027 MIB Milano · Slavnostna Večerja in Klub na Piazza Affari', 'Postrežena gala večerja (20:00)', 'Silvestrska bife večerja (20:00)', 'Vstop s polnočno nazdravitvijo (23:30)', 'Uradni program · 31. december 2026'],
  sv: ['Nyårsafton 2027 MIB Milano · Galamiddag & Klubb vid Piazza Affari', 'Serverad Galamiddag (20:00)', 'Nyårsbuffé (20:00)', 'Midnattsskål Entré (23:30)', 'Officiellt program · 31 december 2026'],
  no: ['Nyttårsaften 2027 MIB Milano · Gallamiddag & Klubb ved Piazza Affari', 'Servert Gallamiddag (20:00)', 'Nyttårsbuffet (20:00)', 'Midnattsskål Inngang (23:30)', 'Offisielt program · 31. desember 2026'],
  is: ['Gamlárskvöld 2027 MIB Mílanó · Hátíðarkvöldverður & Klúbbur við Piazza Affari', 'Framreiddur hátíðarkvöldverður (20:00)', 'Hátíðarhlaðborð (20:00)', 'Miðnæturfögnuður aðgangur (23:30)', 'Opinber dagskrá · 31. desember 2026'],
  uk: ['Новий Рік 2027 MIB Мілан · Гала-Вечеря та Клуб на Piazza Affari', 'Святкова гала-вечеря (20:00)', 'Новорічний фуршет (20:00)', 'Вхід на опівнічний тост (23:30)', 'Офіційна програма · 31 грудня 2026'],
  sq: ['Viti i Ri 2027 MIB Milano · Darkë Gala & Klub në Piazza Affari', 'Darkë Gala e Shërbyer (20:00)', 'Darkë Bufe Festive (20:00)', 'Hyrja me Dolli në Mesnatë (23:30)', 'Programi Zyrtar · 31 Dhjetor 2026'],
  sr: ['Nova Godina 2027 MIB Milano · Svečana Večera i Klub na Piazza Affari', 'Svečana servirana večera (20:00)', 'Novogodišnja bife večera (20:00)', 'Ulaz uz ponoćnu zdravicu (23:30)', 'Zvanični program · 31. decembar 2026.'],
  bs: ['Nova Godina 2027 MIB Milano · Svečana Večera i Klub na Piazza Affari', 'Svečana servirana večera (20:00)', 'Novogodišnja bife večera (20:00)', 'Ulaz uz ponoćnu zdravicu (23:30)', 'Zvanični program · 31. decembar 2026.'],
  mk: ['Нова Година 2027 MIB Милано · Гала Вечера и Клуб на Piazza Affari', 'Сервирана гала вечера (20:00)', 'Новогодишна шведска маса (20:00)', 'Влез со полноќна наздравица (23:30)', 'Официјална програма · 31 декември 2026'],
};

for (const [code, [title, galaLabel, buffetLabel, toastLabel, scheduleHeading]] of Object.entries(OTHER_24)) {
  PACKS[code] = makeTranslatedPack(
    title,
    `MIB Milano · ${MIB_ADDR} · 31/12/2026 · 20:00 – 05:30`,
    `${title} · ${EN_PACK.description}`,
    EN_PACK.musicAndFormat,
    EN_PACK.dressCode,
    EN_PACK.priceSummary,
    galaLabel,
    buffetLabel,
    toastLabel,
    EN_PACK.afterLabel,
    EN_PACK.vipTablesLabel,
    scheduleHeading,
    `${title} · Menu 160€`,
  );
}

export function getMibNyeContent(locale: string): CapodannoLocalizedEventContent {
  const pack = PACKS[locale as LocaleCode] || EN_PACK;
  return buildMibContent(pack);
}
