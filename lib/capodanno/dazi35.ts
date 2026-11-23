import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const DAZI_ADDR = 'Piazza Sempione 1 (Arco della Pace), 20145 Milano';
const DAZI_MENU_IMG = '/images/events/capodanno-2027-menus/dazi-milano-nye-2027-menu-160.webp';

interface DaziPack {
  title: string;
  subtitle: string;
  description: string;
  musicAndFormat: string;
  dressCode: string;
  priceSummary: string;
  galaLabel: string;
  galaPrice: string;
  galaDesc: string;
  toastLabel: string;
  toastPrice: string;
  toastDesc: string;
  afterLabel: string;
  afterPrice: string;
  afterDesc: string;
  extTableLabel: string;
  extTablePrice: string;
  extTableDesc: string;
  pistaTableLabel: string;
  pistaTablePrice: string;
  pistaTableDesc: string;
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

function buildDaziContent(p: DaziPack): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: p.galaLabel, price: p.galaPrice, details: p.galaDesc },
    { label: p.toastLabel, price: p.toastPrice, details: p.toastDesc },
    { label: p.afterLabel, price: p.afterPrice, details: p.afterDesc },
    { label: p.extTableLabel, price: p.extTablePrice, details: p.extTableDesc },
    { label: p.pistaTableLabel, price: p.pistaTablePrice, details: p.pistaTableDesc },
  ];
  const times = ['20:00', '21:00', '23:30', '00:00', '00:30'];
  const schedule: CapodannoScheduleStep[] = times.map((time, i) => ({
    time,
    label: p.steps[i],
  }));
  const menus: CapodannoMenuCard[] = [
    {
      id: 'dazi-milano-nye-2027-menu-terra-160',
      title: p.menuTitle,
      price: p.galaPrice,
      subtitle: p.menuSubtitle,
      beverages: p.menuBev,
      courses: p.courseLabels.map((course, idx) => ({ course, dish: p.courseDishes[idx] })),
      imageSrc: DAZI_MENU_IMG,
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
    offerPricesEur: [160, 50, 40, 250, 320],
  };
}

const IT_PACK: DaziPack = {
  title: 'Capodanno 2027 Dazi Milano · New Year’s Eve Red Carpet & Dinner Show all’Arco della Pace',
  subtitle: `Dazi Milano · ${DAZI_ADDR} · Giovedì 31 Dicembre 2026 · 20:00 – 05:00`,
  description:
    'Capodanno 2027 a Dazi Milano in Piazza Sempione 1, all’interno dello storico casello daziario neoclassico affacciato sull’Arco della Pace e su Parco Sempione: il format ufficiale New Year’s Eve Red Carpet & Dinner Show (20:00 – 05:00, 18+) unisce accoglienza sul Red Carpet, Gran Cenone Gourmet con live show di EKI e DJ Set Commerciale & House fino all’alba. Formule ufficiali: Cenone Servito + Dinner Show + Serata a 160€, Ingresso Brindisi dalle 23:30 a 50€, Ingresso Dopo Mezzanotte a 40€, Tavolo Cenone Esteso a 250€ (5 pax) e Tavolo Pista Dopocena a 320€ (4 pax). Prenotazione ufficiale tramite Concierge WhatsApp +39 351 912 7047.',
  musicAndFormat:
    'New Year’s Eve Red Carpet & Dinner Show · Live Show by EKI + DJ Set Commerciale & House fino alle 05:00 · 18+',
  dressCode: 'Elegante Red Carpet di San Silvestro (selezione curata all’ingresso)',
  priceSummary:
    'Cenone + Dinner Show 160€ · Brindisi 23:30 50€ · Dopo 00:00 40€ · Tavolo Cenone Esteso 250€ (5 pax) · Tavolo Pista 320€ (4 pax)',
  galaLabel: 'Cenone Servito + Dinner Show EKI + Serata (dalle 20:00)',
  galaPrice: '160€ a persona',
  galaDesc:
    'Accoglienza Red Carpet dalle 20:00 nei caselli daziari dell’Arco della Pace, Menù Terra completo (blinis salmone e caviale, bao pulled beef, tartare manzo Castelmagno e Parmigiano, catalana di gamberi, risotto Castelmagno, ravioli cacio e pepe ai porcini, sorbetto Grey Goose, filetto grigliato con tortino dauphinois), live show di EKI, brindisi di mezzanotte e serata DJ Set inclusa.',
  toastLabel: 'Ingresso Formula Brindisi (dalle 23:30)',
  toastPrice: '50€ a persona',
  toastDesc:
    'Ingresso dalle 23:30 con flûte per il brindisi di mezzanotte sotto le volte neoclassiche dell’Arco della Pace e party Commerciale & House fino alle 05:00.',
  afterLabel: 'Ingresso Dopo Mezzanotte (dalle 00:00)',
  afterPrice: '40€ a persona',
  afterDesc:
    'Ingresso alla serata clubbing dopo la mezzanotte con consumazione inclusa e DJ Set Commerciale & House fino alle 05:00.',
  extTableLabel: 'Tavolo Cenone Esteso Dopocena (fino a 5 pax)',
  extTablePrice: '250€ (5 persone)',
  extTableDesc:
    'Supplemento dedicato agli ospiti del cenone per mantenere il proprio tavolo riservato anche durante tutta la serata clubbing fino a 5 persone con bottiglia inclusa.',
  pistaTableLabel: 'Tavolo VIP Pista Dopocena (fino a 4 pax)',
  pistaTablePrice: '320€ (4 persone)',
  pistaTableDesc:
    'Tavolo riservato in pista per il dopocena fino a 4 persone con ingresso prioritario salta-fila e servizio bottiglia premium.',
  highlights: [
    `Caselli Daziari Neoclassici dell’Arco della Pace in ${DAZI_ADDR}`,
    'New Year’s Eve Red Carpet & Dinner Show con performance live di EKI e DJ Set Commerciale/House',
    'Menù Gourmet 160€ con blinis al caviale, tartare e risotto al Castelmagno, ravioli ai porcini e sorbetto Grey Goose',
    'Prenotazione diretta con assistenza Concierge WhatsApp +39 351 912 7047',
  ],
  sourceBasis:
    'Programma, menù e listino ufficiali Capodanno 2027 Dazi Milano (Piazza Sempione 1, Arco della Pace): Cenone + Dinner Show 160€, Brindisi 23:30 50€, Dopo 00:00 40€, Tavolo Cenone Esteso 250€ (5 pax), Tavolo Pista 320€ (4 pax). Prenotazioni via WhatsApp +39 351 912 7047.',
  scheduleHeading: 'Programma Ufficiale 31 Dicembre 2026 · Dazi Milano Arco della Pace',
  steps: [
    'Accoglienza Red Carpet in Piazza Sempione 1 e apertura sale per il Gran Cenone (160€)',
    'Inizio Dinner Show dal vivo con EKI tra le volte monumentali dei Caselli Daziari',
    'Apertura ingressi Formula Brindisi (50€) in vista del conto alla rovescia',
    'Brindisi di mezzanotte all’Arco della Pace e apertura ingressi Dopo Mezzanotte (40€)',
    'DJ Set Commerciale & House e servizio bottiglie ai tavoli riservati fino alle 05:00',
  ],
  menusHeading: 'Menù Gourmet Ufficiale Capodanno 2027 · Dazi Milano (160€)',
  menuTitle: 'Dazi Milano · Menù Terra & Gourmet Red Carpet Dinner Show',
  menuSubtitle: 'Piazza Sempione 1 (Arco della Pace) · Ingresso dalle 20:00 con Live Show EKI & Serata inclusa',
  menuBev:
    'Include accoglienza Red Carpet, percorso degustazione completo, sorbetto alla vodka Grey Goose, brindisi di mezzanotte e accesso diretto al party DJ Set fino alle 05:00. Segnalare eventuali allergie o intolleranze su WhatsApp +39 351 912 7047.',
  courseLabels: [
    'Entrée di Benvenuto Red Carpet',
    'Antipasti Gourmet',
    'I Primi Piatti',
    'Intermezzo & Secondo Piatto',
    'Brindisi di Mezzanotte & Serata',
  ],
  courseDishes: [
    'Blinis artigianali con salmone affumicato e perle di caviale · Soffice bao bun ripieno di pulled beef speziato',
    'Tartare di manzo selezionato con fonduta di Castelmagno e cialda croccante di Parmigiano Reggiano · Catalana gourmet di gamberi',
    'Risotto mantecato al Castelmagno DOP · Ravioli freschi cacio e pepe con funghi porcini profumati',
    'Sorbetto rinfrescante alla vodka Grey Goose · Filetto di manzo grigliato servito con tortino di patate dauphinois',
    'Dolci della tradizione natalizia milanese, flûte per il brindisi delle 00:00 e DJ Set Commerciale & House fino alle 05:00',
  ],
  menuAlt: 'Menù ufficiale Capodanno 2027 Dazi Milano Arco della Pace 160€ Red Carpet & Dinner Show',
};

const EN_PACK: DaziPack = {
  title: 'Dazi Milano NYE 2027 · New Year’s Eve Red Carpet & Dinner Show at Arco della Pace',
  subtitle: `Dazi Milano · ${DAZI_ADDR} · Thursday, Dec 31, 2026 · 20:00 – 05:00`,
  description:
    'Celebrate New Year’s Eve 2027 at Dazi Milano on Piazza Sempione 1, set inside Luigi Cagnola’s historic neoclassical tollhouse right beside the triumphal Arco della Pace: the official New Year’s Eve Red Carpet & Dinner Show (20:00 – 05:00, ages 18+) combines Red Carpet arrival, gourmet gala dining with live show entertainment by EKI, and Commercial & House DJ sets until 05:00. Verified rates: Gala Dinner + Dinner Show + Party €160, 23:30 Midnight Toast Entry €50, After-Midnight Entry €40, Extended Dinner Table €250 (5 guests), and Dancefloor VIP Table €320 (4 guests). Book directly via Nightlife Milan WhatsApp Concierge +39 351 912 7047.',
  musicAndFormat:
    'New Year’s Eve Red Carpet & Dinner Show · Live Show by EKI + Commercial & House DJ Set until 05:00 · Ages 18+',
  dressCode: 'New Year’s Eve Red Carpet Elegant (curated door selection)',
  priceSummary:
    'Dinner + Show €160 · 23:30 Toast €50 · After 00:00 €40 · Extended Dinner Table €250 (5 pax) · Dancefloor Table €320 (4 pax)',
  galaLabel: 'Served Gala Dinner + EKI Dinner Show + Party (from 20:00)',
  galaPrice: '€160 per person',
  galaDesc:
    'Red Carpet welcome from 20:00 inside the historic Arco della Pace tollhouse, full Gourmet Menu (salmon & caviar blinis, pulled beef bao, beef tartare with Castelmagno & Parmigiano, prawn catalana, Castelmagno risotto, porcini cacio e pepe ravioli, Grey Goose sorbet, grilled beef fillet with potato dauphinois), live show by EKI, midnight toast, and club night.',
  toastLabel: 'Midnight Toast Admission (from 23:30)',
  toastPrice: '€50 per person',
  toastDesc:
    'Pre-midnight admission from 23:30 with sparkling flute for the midnight countdown at Arco della Pace and Commercial & House party until 05:00.',
  afterLabel: 'After-Midnight Club Admission (from 00:00)',
  afterPrice: '€40 per person',
  afterDesc:
    'Club entry after midnight including 1 drink and Commercial & House DJ sets until 05:00.',
  extTableLabel: 'Extended Dinner Table Retention (up to 5 guests)',
  extTablePrice: '€250 (5 guests)',
  extTableDesc:
    'Dedicated upgrade for dinner guests to keep their reserved table throughout the post-midnight club party for up to 5 guests with bottle service.',
  pistaTableLabel: 'After-Dinner Dancefloor VIP Table (up to 4 guests)',
  pistaTablePrice: '€320 (4 guests)',
  pistaTableDesc:
    'Reserved dancefloor VIP table for up to 4 guests with priority fast-track entry and bottle service.',
  highlights: [
    `Historic Neoclassical Tollhouse at Arco della Pace (${DAZI_ADDR})`,
    'New Year’s Eve Red Carpet & Dinner Show featuring live performance by EKI + Commercial/House DJs',
    '€160 Gourmet Menu: caviar blinis, Castelmagno tartare & risotto, porcini ravioli, Grey Goose sorbet & fillet',
    'Direct official reservations via 24/7 WhatsApp Concierge +39 351 912 7047',
  ],
  sourceBasis:
    'Official Dazi Milano NYE 2027 program and menu (Piazza Sempione 1, Arco della Pace): Dinner + Show €160, 23:30 Toast €50, After 00:00 €40, Extended Dinner Table €250 (5 pax), Dancefloor VIP Table €320 (4 pax). Bookings via WhatsApp +39 351 912 7047.',
  scheduleHeading: 'Official Schedule · December 31, 2026 at Dazi Milano',
  steps: [
    'Red Carpet welcome on Piazza Sempione 1 & doors open for the Gala Dinner (€160)',
    'Live Dinner Show with EKI inside the monumental Arco della Pace stone hall',
    'Midnight Toast admission (€50) opens ahead of the New Year countdown',
    'Midnight toast beside Arco della Pace & After-Midnight club entry (€40) opens',
    'Commercial & House DJ sets and VIP bottle service until 05:00',
  ],
  menusHeading: 'Official NYE 2027 Gourmet Menu · Dazi Milano (€160)',
  menuTitle: 'Dazi Milano · Red Carpet & Dinner Show Gourmet Menu',
  menuSubtitle: 'Piazza Sempione 1 (Arco della Pace) · From 20:00 with EKI Live Show & Party included',
  menuBev:
    'Includes Red Carpet welcome, full tasting menu, Grey Goose vodka sorbet, midnight toast, and full party access until 05:00. Flag any dietary needs via WhatsApp +39 351 912 7047.',
  courseLabels: [
    'Red Carpet Welcome Bites',
    'Gourmet Starters',
    'First Courses',
    'Palate Cleanser & Main Course',
    'Midnight Toast & Club Night',
  ],
  courseDishes: [
    'Artisanal blinis topped with smoked salmon & caviar pearls · Steamed bao bun filled with slow-cooked pulled beef',
    'Hand-cut beef tartare with Castelmagno cheese & Parmigiano Reggiano crisp · Catalan-style king prawns',
    'Creamy Castelmagno DOP risotto · Fresh cacio e pepe ravioli with wild porcini mushrooms',
    'Refreshing Grey Goose vodka sorbet · Charcoal-grilled beef fillet served with potato gratin dauphinois',
    'Traditional Milanese festive sweets, midnight countdown toast & Commercial / House DJ set until 05:00',
  ],
  menuAlt: 'Official Dazi Milano Arco della Pace NYE 2027 €160 Red Carpet Dinner Show menu',
};

function makeTranslatedPack(
  title: string,
  subtitle: string,
  description: string,
  musicAndFormat: string,
  dressCode: string,
  priceSummary: string,
  galaLabel: string,
  toastLabel: string,
  afterLabel: string,
  extTableLabel: string,
  pistaTableLabel: string,
  scheduleHeading: string,
  menusHeading: string,
): DaziPack {
  return {
    ...EN_PACK,
    title,
    subtitle,
    description,
    musicAndFormat,
    dressCode,
    priceSummary,
    galaLabel,
    toastLabel,
    afterLabel,
    extTableLabel,
    pistaTableLabel,
    scheduleHeading,
    menusHeading,
  };
}

const PACKS: Record<string, DaziPack> = {
  it: IT_PACK,
  en: EN_PACK,
  es: makeTranslatedPack(
    'Nochevieja 2027 Dazi Milán · Red Carpet & Dinner Show en el Arco della Pace',
    `Dazi Milano · ${DAZI_ADDR} · Jueves 31 Diciembre 2026 · 20:00 – 05:00`,
    'Nochevieja 2027 en Dazi Milano (Piazza Sempione 1, caseta neoclásica del Arco della Pace): Red Carpet & Dinner Show con actuación en vivo de EKI y DJ Set Comercial & House hasta las 05:00. Cena + Show 160€ (blinis con caviar, tartar y risotto al Castelmagno, ravioli con porcini, sorbete Grey Goose y solomillo con dauphinois), Brindis 23:30 50€, Post 00:00 40€, Mesa Cena Extendida 250€ (5 pers.) y Mesa Pista 320€ (4 pers.). Reservas WhatsApp +39 351 912 7047.',
    'Red Carpet & Dinner Show en vivo con EKI · DJ Set Comercial & House hasta las 05:00 · 18+',
    'Elegante Red Carpet de Nochevieja',
    'Cena + Show 160€ · Brindis 23:30 50€ · Post 00:00 40€ · Mesa Cena 250€ (5 pax) · Mesa Pista 320€ (4 pax)',
    'Cena de Gala + Dinner Show EKI + Fiesta (desde 20:00)',
    'Entrada Fórmula Brindis (desde 23:30)',
    'Entrada Después de Medianoche (desde 00:00)',
    'Mesa Cena Extendida Post-00:00 (5 personas)',
    'Mesa VIP Pista Dopocena (4 personas)',
    'Programa Oficial · 31 Diciembre 2026 en Dazi Milano',
    'Menú Gourmet Oficial 160€ · Dazi Milano Arco della Pace',
  ),
  fr: makeTranslatedPack(
    'Nouvel An 2027 Dazi Milan · Red Carpet & Dinner Show à l’Arco della Pace',
    `Dazi Milano · ${DAZI_ADDR} · Jeudi 31 Décembre 2026 · 20:00 – 05:00`,
    'Réveillon 2027 chez Dazi Milano (Piazza Sempione 1, pavillon néoclassique de l’Arco della Pace) : Red Carpet & Dinner Show avec spectacle live EKI et DJ Set Commercial & House jusqu’à 05h00. Dîner + Show 160€ (blinis saumon/caviar, tartare et risotto Castelmagno, ravioli cacio e pepe aux cèpes, sorbet Grey Goose, filet grillé gratin dauphinois), Toast 23h30 50€, Après Minuit 40€, Table Dîner Prolongée 250€ (5 pers.) et Table Piste 320€ (4 pers.). Réservations WhatsApp +39 351 912 7047.',
    'Red Carpet & Dinner Show live par EKI · DJ Set Commercial & House jusqu’à 05h00 · 18+',
    'Tenue Red Carpet Élégante du Réveillon',
    'Dîner + Show 160€ · Toast 23h30 50€ · Après 00h00 40€ · Table Dîner 250€ (5 pers.) · Table Piste 320€ (4 pers.)',
    'Dîner Servi + Dinner Show EKI + Soirée (dès 20h00)',
    'Entrée Formule Toast de Minuit (dès 23h30)',
    'Entrée Club Après Minuit (dès 00h00)',
    'Table Dîner Prolongée Après-Minuit (5 pers.)',
    'Table VIP Piste Après-Dîner (4 pers.)',
    'Programme Officiel · 31 Décembre 2026 chez Dazi Milano',
    'Menu Gourmet Officiel 160€ · Dazi Milano Arco della Pace',
  ),
  de: makeTranslatedPack(
    'Silvester 2027 Dazi Mailand · Red Carpet & Dinner Show am Arco della Pace',
    `Dazi Milano · ${DAZI_ADDR} · Donnerstag 31. Dezember 2026 · 20:00 – 05:00`,
    'Silvester 2027 im Dazi Milano (Piazza Sempione 1, klassizistisches Zollhaus direkt am Arco della Pace): Red Carpet & Dinner Show mit Live-Show von EKI und Commercial & House DJ Set bis 05:00 Uhr. Gala-Dinner + Show 160€ (Lachs-Kaviar-Blinis, Castelmagno-Tatar & Risotto, Steinpilz-Ravioli, Grey-Goose-Sorbet, Rinderfilet mit Kartoffelgratin), 23:30 Toast 50€, Ab 00:00 40€, Verlängerter Dinner-Tisch 250€ (5 Pers.) und Dancefloor-Tisch 320€ (4 Pers.). Buchung via WhatsApp +39 351 912 7047.',
    'Red Carpet & Live Dinner Show mit EKI · Commercial & House DJ Set bis 05:00 · 18+',
    'Red Carpet Abendgarderobe / Silvester Elegant',
    'Dinner + Show 160€ · 23:30 Toast 50€ · Ab 00:00 40€ · Dinner-Tisch 250€ (5 Pers.) · Pista-Tisch 320€ (4 Pers.)',
    'Gala-Dinner + EKI Dinner Show + Party (ab 20:00)',
    'Mitternachtstoast-Eintritt (ab 23:30)',
    'Club-Eintritt nach Mitternacht (ab 00:00)',
    'Verlängerter Dinner-Tisch (bis 5 Gäste)',
    'VIP-Tisch Tanzfläche After-Dinner (bis 4 Gäste)',
    'Offizielles Programm · 31. Dezember 2026 im Dazi Milano',
    'Offizielles 160€ Gourmet-Menü · Dazi Milano Arco della Pace',
  ),
  pt: makeTranslatedPack(
    'Réveillon 2027 Dazi Milão · Red Carpet & Dinner Show no Arco della Pace',
    `Dazi Milano · ${DAZI_ADDR} · Quinta 31 de Dezembro 2026 · 20:00 – 05:00`,
    'Réveillon 2027 no Dazi Milano (Piazza Sempione 1, edifício neoclássico do Arco della Pace): Red Carpet & Dinner Show com espetáculo ao vivo de EKI e DJ Set Comercial & House até às 05:00. Ceia + Show 160€, Brinde 23:30 50€, Pós 00:00 40€, Mesa Jantar Estendida 250€ (5 pessoas) e Mesa Pista 320€ (4 pessoas). Reservas WhatsApp +39 351 912 7047.',
    'Red Carpet & Dinner Show ao vivo com EKI · DJ Set Comercial & House até 05:00 · 18+',
    'Traje Red Carpet Elegante de Ano Novo',
    'Ceia + Show 160€ · Brinde 23:30 50€ · Pós 00:00 40€ · Mesa Jantar 250€ (5 pax) · Mesa Pista 320€ (4 pax)',
    'Ceia Servida + Dinner Show EKI + Festa (20:00)',
    'Ingresso Fórmula Brinde (23:30)',
    'Ingresso Pós-Meia-Noite (00:00)',
    'Mesa Jantar Estendida Pós-00:00 (5 pessoas)',
    'Mesa VIP Pista Pós-Jantar (4 pessoas)',
    'Programação Oficial · 31 Dezembro 2026 no Dazi Milano',
    'Cardápio Gourmet Oficial 160€ · Dazi Milano Arco della Pace',
  ),
  nl: makeTranslatedPack(
    'Oud en Nieuw 2027 Dazi Milaan · Red Carpet & Dinner Show bij Arco della Pace',
    `Dazi Milano · ${DAZI_ADDR} · Donderdag 31 december 2026 · 20:00 – 05:00`,
    'Oudejaarsavond 2027 bij Dazi Milano (Piazza Sempione 1, neoclassicistisch tolhuis naast de Arco della Pace): Red Carpet & Dinner Show met liveshow van EKI en Commercial & House DJ Set tot 05:00. Galadiner + Show €160, 23:30 Toast €50, Na 00:00 €40, Verlengde Dinertafel €250 (5 pers.) en Dansvloer VIP-tafel €320 (4 pers.). Reserveren via WhatsApp +39 351 912 7047.',
    'Red Carpet & Live Dinner Show door EKI · Commercial & House DJ Set tot 05:00 · 18+',
    'Red Carpet Feestelijk & Elegant',
    'Diner + Show €160 · 23:30 Toast €50 · Na 00:00 €40 · Dinertafel €250 (5p) · Dansvloertafel €320 (4p)',
    'Galadiner + EKI Dinner Show + Feest (vanaf 20:00)',
    'Middernacht Toast Entree (vanaf 23:30)',
    'Club Entree na Middernacht (vanaf 00:00)',
    'Verlengde Dinertafel na Middernacht (5 gasten)',
    'VIP-tafel Dansvloer After-Dinner (4 gasten)',
    'Officieel Programma · 31 dec 2026 bij Dazi Milano',
    'Officieel €160 Gourmet Menu · Dazi Milano Arco della Pace',
  ),
  ru: makeTranslatedPack(
    'Новый Год 2027 Dazi Милан · Red Carpet и Dinner Show у Арки Мира',
    `Dazi Milano · ${DAZI_ADDR} · Четверг 31 декабря 2026 · 20:00 – 05:00`,
    'Новогодняя ночь 2027 в Dazi Milano (Piazza Sempione 1, исторический павильон у Arco della Pace): Red Carpet & Dinner Show с живым шоу EKI и DJ-сетом Commercial & House до 05:00. Гала-ужин + шоу 160€ (блины с лососем и икрой, тартар и ризотто Кастельманьо, равиоли с белыми грибами, сорбет Grey Goose, филе говядины), вход 23:30 за 50€, после 00:00 за 40€, продление стола 250€ (5 чел.) и VIP-стол у танцпола 320€ (4 чел.). Бронь: WhatsApp +39 351 912 7047.',
    'Red Carpet & Live Show EKI · DJ Set Commercial & House до 05:00 · 18+',
    'Вечерний элегантный стиль Red Carpet',
    'Ужин + Шоу 160€ · Тост 23:30 50€ · После 00:00 40€ · Стол ужина 250€ (5 чел.) · Стол 320€ (4 чел.)',
    'Гала-ужин + Dinner Show EKI + Вечеринка (с 20:00)',
    'Вход на полуночный тост (с 23:30)',
    'Вход в клуб после полуночи (с 00:00)',
    'Продление стола после ужина (до 5 гостей)',
    'VIP-стол у танцпола после полуночи (до 4 гостей)',
    'Официальная программа · 31 декабря 2026 Dazi Milano',
    'Официальное меню 160€ · Dazi Milano Arco della Pace',
  ),
  tr: makeTranslatedPack(
    'Yılbaşı 2027 Dazi Milano · Arco della Pace Red Carpet & Dinner Show',
    `Dazi Milano · ${DAZI_ADDR} · 31 Aralık 2026 Perşembe · 20:00 – 05:00`,
    'Arco della Pace yanındaki tarihi Dazi Milano’da (Piazza Sempione 1) Yılbaşı 2027: EKI canlı Dinner Show performansı ve 05:00’e kadar Commercial & House DJ Set. Gala Yemeği + Şov 160€, 23:30 Kutlama Girişi 50€, 00:00 Sonrası 40€, Uzatmalı Yemek Masası 250€ (5 kişi) ve Pist VIP Masa 320€ (4 kişi). Rezervasyon WhatsApp +39 351 912 7047.',
    'Red Carpet & EKI Canlı Dinner Show · Commercial & House DJ Set (05:00’e kadar) · 18+',
    'Red Carpet Şık Yılbaşı Kıyafeti',
    'Yemek + Şov 160€ · 23:30 Giriş 50€ · 00:00 Sonrası 40€ · Yemek Masası 250€ (5 kişi) · Pist Masası 320€ (4 kişi)',
    'Gala Yemeği + EKI Dinner Show + Parti (20:00)',
    'Gece Yarısı Kutlama Girişi (23:30)',
    'Gece Yarısı Sonrası Kulüp Girişi (00:00)',
    'Uzatmalı Yemek Masası (5 kişilik)',
    'Pist VIP Masa Gece Yarısı Sonrası (4 kişilik)',
    'Resmi Program · 31 Aralık 2026 Dazi Milano',
    'Resmi 160€ Gurme Menü · Dazi Milano Arco della Pace',
  ),
  zh: makeTranslatedPack(
    '2027跨年夜米兰 Dazi Milano · 和平之门红毯晚宴秀与派对',
    `Dazi Milano · ${DAZI_ADDR} · 2026年12月31日周四 · 20:00 – 05:00`,
    '坐落于米兰和平之门（Arco della Pace）新古典主义历史建筑内的 Dazi Milano（Piazza Sempione 1）2027跨年红毯盛典：EKI 现场晚宴秀与 Commercial & House DJ 派对持续至 05:00。晚宴+演出+派对 160€（含鱼子酱薄饼、和牛包、Castelmagno 鞑靼与烩饭、牛肝菌意饺、Grey Goose 雪葩及炙烤牛柳），23:30 祝酒入场 50€，午夜后 40€，晚宴延席卡座 250€（5人），舞池VIP卡座 320€（4人）。预订 WhatsApp +39 351 912 7047。',
    '红毯迎宾 & EKI 现场晚宴秀 · Commercial & House DJ 派对至 05:00 · 18+',
    '红毯优雅跨年晚礼服要求',
    '晚宴秀160€ · 23:30祝酒50€ · 午夜后40€ · 晚宴延桌250€（5人）· 舞池卡座320€（4人）',
    '正装跨年晚宴 + EKI 现场秀 + 派对（20:00起）',
    '23:30 午夜倒计时祝酒入场',
    '00:00 午夜后俱乐部派对入场',
    '晚宴宾客午夜后留桌套餐（最多5人）',
    '舞池VIP派对卡座（最多4人）',
    'Dazi Milano 官方跨年日程 · 2026年12月31日',
    'Dazi Milano 官方160€红毯晚宴菜单',
  ),
  ar: makeTranslatedPack(
    'رأس السنة 2027 في داتزي ميلانو · عرض عشاء السجادة الحمراء عند قوس السلام',
    `Dazi Milano · ${DAZI_ADDR} · الخميس 31 ديسمبر 2026 · 20:00 – 05:00`,
    'احتفل بليلة رأس السنة 2027 في Dazi Milano (Piazza Sempione 1 بجوار قوس السلام Arco della Pace): استقبال السجادة الحمراء، عشاء فاخر وعرض حي مع EKI وموسيقى DJ Commercial & House حتى 05:00. العشاء والعرض 160€، دخول نخب 23:30 بسعر 50€، بعد منتصف الليل 40€، تمديد طاولة العشاء 250€ (5 ضيوف) وطاولة VIP بسعر 320€ (4 ضيوف). الحجز عبر واتساب +39 351 912 7047.',
    'سجادة حمراء وعرض عشاء حي مع EKI · دي جي هاوس وتجاري حتى 05:00 · +18',
    'إطلالة سجادة حمراء مسائية أنيقة',
    'العشاء والعرض 160€ · دخول 23:30 بسعر 50€ · بعد 00:00 بسعر 40€ · طاولة العشاء 250€ · طاولة السهرة 320€',
    'عشاء غالا + عرض EKI الحي + السهرة (من 20:00)',
    'دخول نخب منتصف الليل (من 23:30)',
    'دخول النادي بعد منتصف الليل (من 00:00)',
    'تمديد طاولة العشاء لما بعد منتصف الليل (5 ضيوف)',
    'طاولة VIP على حلبة الرقص (4 ضيوف)',
    'البرنامج الرسمي · 31 ديسمبر 2026 في Dazi Milano',
    'قائمة العشاء الرسمية 160€ · Dazi Milano Arco della Pace',
  ),
};

const OTHER_24: Record<string, [string, string, string, string]> = {
  bg: ['Нова Година 2027 Dazi Милано · Red Carpet & Dinner Show до Arco della Pace', 'Гала вечеря + EKI шоу + парти (20:00)', 'Вход за полунощен тост (23:30)', 'Официална програма · 31 декември 2026'],
  hr: ['Nova Godina 2027 Dazi Milano · Red Carpet & Dinner Show uz Arco della Pace', 'Svečana večera + EKI Dinner Show + Party (20:00)', 'Ulaz uz ponoćnu zdravicu (23:30)', 'Službeni program · 31. prosinca 2026.'],
  cs: ['Silvestr 2027 Dazi Milán · Red Carpet & Dinner Show u Arco della Pace', 'Galavečeře + EKI Dinner Show + Party (20:00)', 'Vstup na půlnoční přípitek (23:30)', 'Oficiální program · 31. prosince 2026'],
  da: ['Nytårsaften 2027 Dazi Milano · Red Carpet & Dinner Show ved Arco della Pace', 'Galamiddag + EKI Dinner Show + Fest (20:00)', 'Midnatsskål Entré (23:30)', 'Officielt program · 31. december 2026'],
  et: ['Aastavahetus 2027 Dazi Milano · Red Carpet & Dinner Show Arco della Pace juures', 'Galaõhtusöök + EKI Dinner Show + Pidu (20:00)', 'Kesköö tervituse sissepääs (23:30)', 'Ametlik ajakava · 31. detsember 2026'],
  fi: ['Uusivuosi 2027 Dazi Milano · Red Carpet & Dinner Show Arco della Pacella', 'Gaalaillallinen + EKI Dinner Show + Juhla (20:00)', 'Keskiyön malja -sisäänpääsy (23:30)', 'Virallinen ohjelma · 31. joulukuuta 2026'],
  el: ['Πρωτοχρονιά 2027 Dazi Μιλάνο · Red Carpet & Dinner Show στην Arco della Pace', 'Δείπνο Γκαλά + EKI Dinner Show + Πάρτι (20:00)', 'Είσοδος Πρωτοχρονιάτικης Πρόποσης (23:30)', 'Επίσημο Πρόγραμμα · 31 Δεκεμβρίου 2026'],
  hu: ['Szilveszter 2027 Dazi Milánó · Red Carpet & Dinner Show az Arco della Pace mellett', 'Gálavacsora + EKI Dinner Show + Buli (20:00)', 'Éjfél előtti koccintós belépő (23:30)', 'Hivatalos program · 2026. december 31.'],
  ga: ['Oíche Chinn Bhliana 2027 Dazi Milano · Red Carpet & Dinner Show ag Arco della Pace', 'Dinnéar Gala + EKI Dinner Show + Cóisir (20:00)', 'Cead Isteach Tósta Meán Oíche (23:30)', 'Clár Oifigiúil · 31 Nollaig 2026'],
  lv: ['Jaunais Gads 2027 Dazi Milāna · Red Carpet & Dinner Show pie Arco della Pace', 'Gala vakariņas + EKI Dinner Show + Ballīte (20:00)', 'Pusnakts tosta ieeja (23:30)', 'Oficiālā programma · 2026. gada 31. decembris'],
  lt: ['Naujieji Metai 2027 Dazi Milanas · Red Carpet & Dinner Show prie Arco della Pace', 'Gala vakarienė + EKI Dinner Show + Vakarėlis (20:00)', 'Vidurnakčio tosto įėjimas (23:30)', 'Oficiali programa · 2026 m. gruodžio 31 d.'],
  mt: ['Ewwel tas-Sena 2027 Dazi Milan · Red Carpet & Dinner Show ħdejn Arco della Pace', 'Ikla Gala + EKI Dinner Show + Festa (20:00)', 'Dħul għax-Xewqa ta’ Nofsillejl (23:30)', 'Programm Uffiċjali · 31 ta’ Diċembru 2026'],
  pl: ['Sylwester 2027 Dazi Mediolan · Red Carpet & Dinner Show przy Arco della Pace', 'Kolacja Galowa + EKI Dinner Show + Impreza (20:00)', 'Wstęp z Toastem o Północy (23:30)', 'Oficjalny Program · 31 grudnia 2026'],
  ro: ['Revelion 2027 Dazi Milano · Red Carpet & Dinner Show la Arco della Pace', 'Cină Festivă + EKI Dinner Show + Petrecere (20:00)', 'Intrare cu Toast la Miezul Nopții (23:30)', 'Program Oficial · 31 Decembrie 2026'],
  sk: ['Silvester 2027 Dazi Miláno · Red Carpet & Dinner Show pri Arco della Pace', 'Galavečera + EKI Dinner Show + Párty (20:00)', 'Vstup s polnočným prípitkom (23:30)', 'Oficiálny program · 31. decembra 2026'],
  sl: ['Silvestrovo 2027 Dazi Milano · Red Carpet & Dinner Show ob Arco della Pace', 'Gala večerja + EKI Dinner Show + Zabava (20:00)', 'Vstop s polnočno nazdravitvijo (23:30)', 'Uradni program · 31. december 2026'],
  sv: ['Nyårsafton 2027 Dazi Milano · Red Carpet & Dinner Show vid Arco della Pace', 'Galamiddag + EKI Dinner Show + Fest (20:00)', 'Midnattsskål Entré (23:30)', 'Officiellt program · 31 december 2026'],
  no: ['Nyttårsaften 2027 Dazi Milano · Red Carpet & Dinner Show ved Arco della Pace', 'Gallamiddag + EKI Dinner Show + Fest (20:00)', 'Midnattsskål Inngang (23:30)', 'Offisielt program · 31. desember 2026'],
  is: ['Gamlárskvöld 2027 Dazi Mílanó · Red Carpet & Dinner Show við Arco della Pace', 'Hátíðarkvöldverður + EKI Dinner Show + Partí (20:00)', 'Miðnæturfögnuður aðgangur (23:30)', 'Opinber dagskrá · 31. desember 2026'],
  uk: ['Новий Рік 2027 Dazi Мілан · Red Carpet & Dinner Show біля Арки Миру', 'Гала-вечеря + EKI Dinner Show + Вечірка (20:00)', 'Вхід на опівнічний тост (23:30)', 'Офіційна програма · 31 грудня 2026'],
  sq: ['Viti i Ri 2027 Dazi Milano · Red Carpet & Dinner Show te Arco della Pace', 'Darkë Gala + EKI Dinner Show + Festë (20:00)', 'Hyrja me Dolli në Mesnatë (23:30)', 'Programi Zyrtar · 31 Dhjetor 2026'],
  sr: ['Nova Godina 2027 Dazi Milano · Red Carpet & Dinner Show kod Arco della Pace', 'Svečana večera + EKI Dinner Show + Žurka (20:00)', 'Ulaz uz ponoćnu zdravicu (23:30)', 'Zvanični program · 31. decembar 2026.'],
  bs: ['Nova Godina 2027 Dazi Milano · Red Carpet & Dinner Show kod Arco della Pace', 'Svečana večera + EKI Dinner Show + Zabava (20:00)', 'Ulaz uz ponoćnu zdravicu (23:30)', 'Zvanični program · 31. decembar 2026.'],
  mk: ['Нова Година 2027 Dazi Милано · Red Carpet & Dinner Show кај Arco della Pace', 'Гала вечера + EKI Dinner Show + Забава (20:00)', 'Влез со полноќна наздравица (23:30)', 'Официјална програма · 31 декември 2026'],
};

for (const [code, [title, galaLabel, toastLabel, scheduleHeading]] of Object.entries(OTHER_24)) {
  PACKS[code] = makeTranslatedPack(
    title,
    `Dazi Milano · ${DAZI_ADDR} · 31/12/2026 · 20:00 – 05:00`,
    `${title} · ${EN_PACK.description}`,
    EN_PACK.musicAndFormat,
    EN_PACK.dressCode,
    EN_PACK.priceSummary,
    galaLabel,
    toastLabel,
    EN_PACK.afterLabel,
    EN_PACK.extTableLabel,
    EN_PACK.pistaTableLabel,
    scheduleHeading,
    `${title} · Menu 160€`,
  );
}

export function getDaziNyeContent(locale: string): CapodannoLocalizedEventContent {
  const pack = PACKS[locale as LocaleCode] || EN_PACK;
  return buildDaziContent(pack);
}
