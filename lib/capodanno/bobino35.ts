import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const BOBINO_ADDR = 'Piazzale Stazione Genova, 4 (Navigli / Porta Genova), 20144 Milano';
const MENU_IMG = '/images/events/capodanno-2027-menus/bobino-nye-2027-menu-legends-120.webp';
const PARTY_IMG = '/images/events/capodanno-2027-menus/bobino-nye-2027-party-legends-30.webp';

interface BobinoPack {
  title: string;
  subtitle: string;
  description: string;
  musicAndFormat: string;
  dressCode: string;
  priceSummary: string;
  dinnerLabel: string;
  dinnerPrice: string;
  dinnerDesc: string;
  afterLabel: string;
  afterPrice: string;
  afterDesc: string;
  keepTableLabel: string;
  keepTablePrice: string;
  keepTableDesc: string;
  postTableLabel: string;
  postTablePrice: string;
  postTableDesc: string;
  highlights: [string, string, string, string];
  sourceBasis: string;
  scheduleHeading: string;
  steps: [string, string, string, string, string];
  menusHeading: string;
  dinnerMenuTitle: string;
  dinnerMenuSubtitle: string;
  dinnerBev: string;
  dinnerLabels: [string, string, string, string, string];
  dinnerDishes: [string, string, string, string, string];
  dinnerAlt: string;
  partyCardTitle: string;
  partyCardPrice: string;
  partyCardSubtitle: string;
  partyCardBev: string;
  partyLabels: [string, string, string];
  partyDishes: [string, string, string];
  partyAlt: string;
}

function buildBobinoContent(p: BobinoPack): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: p.dinnerLabel, price: p.dinnerPrice, details: p.dinnerDesc },
    { label: p.afterLabel, price: p.afterPrice, details: p.afterDesc },
    { label: p.keepTableLabel, price: p.keepTablePrice, details: p.keepTableDesc },
    { label: p.postTableLabel, price: p.postTablePrice, details: p.postTableDesc },
  ];
  const times = ['20:30', '22:30', '23:30', '00:00', '00:30'];
  const schedule: CapodannoScheduleStep[] = times.map((time, i) => ({
    time,
    label: p.steps[i],
  }));
  const menus: CapodannoMenuCard[] = [
    {
      id: 'bobino-legends-dinner-120',
      title: p.dinnerMenuTitle,
      price: p.dinnerPrice,
      subtitle: p.dinnerMenuSubtitle,
      beverages: p.dinnerBev,
      courses: p.dinnerLabels.map((course, idx) => ({ course, dish: p.dinnerDishes[idx] })),
      imageSrc: MENU_IMG,
      imageAlt: p.dinnerAlt,
    },
    {
      id: 'bobino-legends-party-30',
      title: p.partyCardTitle,
      price: p.partyCardPrice,
      subtitle: p.partyCardSubtitle,
      beverages: p.partyCardBev,
      courses: p.partyLabels.map((course, idx) => ({ course, dish: p.partyDishes[idx] })),
      imageSrc: PARTY_IMG,
      imageAlt: p.partyAlt,
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
    programImageSrc: PARTY_IMG,
    menusHeading: p.menusHeading,
    menus,
  };
}

const IT_PACK: BobinoPack = {
  title: 'Capodanno 2027 Bobino Milano · BOBINO LEGENDS (Cena 120€, Party 30€)',
  subtitle: `Bobino Milano · ${BOBINO_ADDR} · Giovedì 31 Dicembre · 20:30 – 04:00`,
  description:
    'L’ultima notte dell’anno al Bobino Milano in Piazzale Stazione Genova 4 è dedicata a BOBINO LEGENDS: cena servita dalle 20:30 a 120€ (solo in prevendita) con 5 antipasti, primo, secondo, cotechino e lenticchie, pandoro e panettone, vini Torre Rosazza o Tenuta Kornell e brindisi Ferrari Maximum Brut; alle 22:30 Video Live Show su LEDWALL anni 70-80-90, dalle 23:30 After Dinner Party da 30€ con 2 drink (poi 35€/40€ e 50€ senza prevendita) e DJ set fino alle 04:00 con DJ Matthew Brown e Special Guest DJ Roberto Milani.',
  musicAndFormat:
    'Video Live Show LEDWALL Hit 70-80-90 (22:30) · Hit 2000–oggi con DJ Resident Matthew Brown & Special Guest DJ Roberto Milani',
  dressCode: 'Elegante / Smart Chic per la notte di San Silvestro',
  priceSummary:
    'Cena Servita 120€ · Party 23:30 30€ (fino 7/12), 35€ (fino 23/12), 40€ (fino 31/12), 50€ alla porta (2 drink) · Tavolo Cena post 00:30 200€ · Tavolo Dopocena 250€',
  dinnerLabel: 'Dinner BOBINO LEGENDS (dalle 20:30 · solo prevendita)',
  dinnerPrice: '120€ a persona',
  dinnerDesc:
    'Cena servita al tavolo con 5 antipasti, Tortelli di zucca piacentini (o Risotto alla milanese su segnalazione allergie), Filetto di branzino alle erbe (o Maialino da latte), Cotechino e lenticchie, Pandoro e panettone con crema al mascarpone. Inclusi acqua, vino Ribolla Gialla Torre Rosazza o Pinot Nero Tenuta Kornell (1 bott. ogni 4) e Ferrari Maximum Brut per il brindisi (1 bott. ogni 4/6).',
  afterLabel: 'After Dinner Party con 2 Drink (dalle 23:30)',
  afterPrice: '30€ – 50€ a persona',
  afterDesc:
    'Prevendita online con priorità all’ingresso e 2 drink: 30€ entro il 7 dicembre, 35€ dall’8 al 23 dicembre, 40€ dal 24 al 31 dicembre. Senza prevendita 50€ con 2 drink. L’acquisto dei drink non garantisce il posto a sedere.',
  keepTableLabel: 'Mantenimento Tavolo Cena dopo le 00:30',
  keepTablePrice: '200€ a tavolo',
  keepTableDesc:
    'Riservato a chi cena: permette di mantenere il tavolo anche dopo le 00:30 scegliendo 1 bottiglia di Distillato (Rum, Vodka o Gin) con mixer oppure 2 bottiglie di Ferrari Maximum.',
  postTableLabel: 'Tavolo Dopocena Privé (dalle 00:30 · max 8 pax)',
  postTablePrice: '250€ + prevendita',
  postTableDesc:
    'Tavolo riservato dalle 00:30 per un massimo di 8 persone al costo di 250€ oltre al titolo d’ingresso in prevendita. Prenotazioni via Concierge WhatsApp +39 351 912 7047.',
  highlights: [
    `Locale: Bobino Milano (${BOBINO_ADDR})`,
    'Orari 31 Dicembre: 20:30 – 04:00 (Video Live Show LEDWALL 22:30 · After Dinner 23:30)',
    'Console: DJ Resident Matthew Brown & Special Guest DJ Roberto Milani (anni 70-80-90 e 2000-oggi)',
    'Acquisto diretto online su Nightlife Milan & Concierge WhatsApp +39 351 912 7047',
  ],
  sourceBasis:
    'Programma e listino ufficiali BOBINO LEGENDS Capodanno 2027 (Piazzale Stazione Genova 4, Milano): Cena Servita 120€, After Dinner 30€/35€/40€ in prevendita o 50€ senza prevendita con 2 drink, mantenimento tavolo cena post 00:30 200€, tavolo dopocena 250€ + prevendita (max 8 pax).',
  scheduleHeading: 'Programma Ufficiale BOBINO LEGENDS · 31 Dicembre 2026',
  steps: [
    'Inizio Cena Servita BOBINO LEGENDS (120€ · solo su prenotazione in prevendita)',
    'Video Live Show su LEDWALL con le hit anni 70, 80 e 90 (DJ Resident Matthew Brown)',
    'Apertura ingressi After Dinner Party con priorità alle prevendite (2 drink inclusi)',
    'Countdown di mezzanotte e brindisi ufficiale con Ferrari Maximum Brut',
    'After Dinner DJ Set fino alle 04:00 · Hit 2000–oggi con DJ Matthew Brown & Roberto Milani',
  ],
  menusHeading: 'Menu Ufficiale & Formule Night Party · BOBINO LEGENDS 2027',
  dinnerMenuTitle: 'Menu Capodanno 2027 · BOBINO LEGENDS',
  dinnerMenuSubtitle: 'Cena servita dalle 20:30 · Alternative per intolleranze e allergie solo in prenotazione',
  dinnerBev:
    'Beverage incluso: acqua, Ribolla Gialla Torre Rosazza (Friuli) o Pinot Nero Tenuta Kornell (Alto Adige) 1 bottiglia ogni 4 persone · Brindisi: Ferrari Maximum Brut 1 bottiglia ogni 4/6 persone.',
  dinnerLabels: [
    '5 Antipasti Inclusi',
    'Primo Piatto',
    'Secondo Piatto',
    'Dopo la Mezzanotte',
    'Dolci della Tradizione',
  ],
  dinnerDishes: [
    'Salmone marinato agli agrumi con finocchio croccante e pepe rosa · Baccalà mantecato su crostino croccante con olio al prezzemolo · Gamberi in salsa cocktail · Tagliere Salumeria Grosseti (Crudo di Parma 24 mesi, Coppa DOP, Pancetta DOP) · Tartare di Fassona piemontese',
    'Tortelli di zucca piacentini al burro nocciola e salvia (Pastificio Lazzati Isa) con Parmigiano e crumble di amaretti · Alternativa intolleranze*: Risotto alla milanese con zafferano',
    'Filetto di branzino gratinato alle erbe con pomodorini confit e patate arrosto · Alternativa intolleranze*: Medaglione di maialino da latte al vino rosso con patate al forno e rosmarino',
    'Cotechino e lenticchie di buon augurio secondo tradizione',
    'Pandoro e panettone artigianali serviti con crema al mascarpone',
  ],
  dinnerAlt: 'Menu ufficiale BOBINO LEGENDS Capodanno 2027 120€ e programma serata',
  partyCardTitle: 'After Dinner Party & Tavoli · BOBINO LEGENDS',
  partyCardPrice: '30€ – 50€ / Tavolo 250€',
  partyCardSubtitle: 'Dalle 23:30 fino alle 04:00 · Precedenza all’ingresso per le prevendite online',
  partyCardBev:
    'Ogni formula ingresso After Dinner include 2 drink. L’acquisto dei drink non garantisce il posto a sedere; tavoli dopocena su prenotazione da 250€ + prevendita.',
  partyLabels: [
    'Fasce Prevendita Online (2 Drink)',
    'Ingresso alla Porta senza Prevendita',
    'Tavoli Post 00:30 (Cena & Dopocena)',
  ],
  partyDishes: [
    '30€ a persona entro il 7 dicembre 2026 · 35€ dall’8 al 23 dicembre · 40€ dal 24 al 31 dicembre',
    '50€ a persona con 2 drink inclusi (senza priorità in coda rispetto alle prevendite)',
    'Mantenimento tavolo cena 200€ (1 distillato + mixer o 2 Ferrari Maximum) · Tavolo dopocena max 8 pax 250€ + prevendita',
  ],
  partyAlt: 'Listino After Dinner BOBINO LEGENDS 30€, 35€, 40€, 50€ e contatti ufficiali Nightlife Milan',
};

const EN_PACK: BobinoPack = {
  title: 'New Year’s Eve 2027 Bobino Milan · BOBINO LEGENDS (€120 Dinner, €30 Party)',
  subtitle: `Bobino Milano · ${BOBINO_ADDR} · Thursday, Dec 31 · 20:30 – 04:00`,
  description:
    'Celebrate December 31 at Bobino Milano (Piazzale Stazione Genova 4, Navigli / Porta Genova) with BOBINO LEGENDS: seated New Year’s Eve Dinner from 20:30 at €120 (presale only) featuring 5 starters, Piacenza pumpkin tortelli or saffron risotto, herb-crusted sea bass or suckling pig medallion, cotechino and lentils, Torre Rosazza or Tenuta Kornell wines and Ferrari Maximum Brut midnight toast; from 22:30 LEDWALL Video Live Show (70s-80s-90s hits), from 23:30 After Dinner Party from €30 with 2 drinks, and DJ sets until 04:00 with DJ Matthew Brown and Special Guest DJ Roberto Milani.',
  musicAndFormat:
    '22:30 LEDWALL Video Live Show (70s-80s-90s) · 00:30–04:00 Hits 2000s–Today by DJ Matthew Brown & Roberto Milani',
  dressCode: 'Smart Elegant New Year’s Eve attire',
  priceSummary:
    'Seated Dinner €120 · After Dinner Party (23:30) €30 (by Dec 7), €35 (Dec 8–23), €40 (Dec 24–31), €50 walk-in (2 drinks) · Post-00:30 Keep Dinner Table €200 · After-Dinner Table €250',
  dinnerLabel: 'BOBINO LEGENDS Seated Dinner (from 20:30 · presale only)',
  dinnerPrice: '€120 per person',
  dinnerDesc:
    'Table-served gourmet menu with 5 antipasti, pumpkin tortelli (or Milanese saffron risotto for allergies noted at booking), herb-crusted sea bass (or suckling pig), midnight cotechino & lentils, pandoro and panettone with mascarpone cream. Includes water, 1 wine bottle per 4 guests, and Ferrari Maximum Brut toast (1 per 4/6 guests).',
  afterLabel: 'After Dinner Party with 2 Drinks (from 23:30)',
  afterPrice: '€30 – €50 per person',
  afterDesc:
    'Online presale with priority fast-track entry and 2 drinks: €30 until Dec 7, €35 Dec 8–23, €40 Dec 24–31. Walk-in without presale €50 with 2 drinks (entry drink does not guarantee seating).',
  keepTableLabel: 'Keep Dinner Table After 00:30',
  keepTablePrice: '€200 per table',
  keepTableDesc:
    'Available for dinner guests wishing to keep their table past 00:30 with 1 bottle of spirit (Rum, Vodka, or Gin) and mixers or 2 bottles of Ferrari Maximum.',
  postTableLabel: 'After-Dinner Reserved Table (from 00:30 · max 8 guests)',
  postTablePrice: '€250 + entry tickets',
  postTableDesc:
    'Reserved private table from 00:30 for up to 8 guests at €250 plus admission presale tickets. Concierge bookings on WhatsApp +39 351 912 7047.',
  highlights: [
    `Venue: Bobino Milano (${BOBINO_ADDR})`,
    'Dec 31 Hours: 20:30 – 04:00 (22:30 Video Show · 23:30 After Dinner · 00:30 DJ Set)',
    'Lineup: Resident DJ Matthew Brown & Special Guest DJ Roberto Milani',
    'Direct Multi-Currency Online Checkout & 24/7 Concierge +39 351 912 7047',
  ],
  sourceBasis:
    'Official 2027 BOBINO LEGENDS rate card (Piazzale Stazione Genova 4): €120 Seated Dinner, €30/€35/€40/€50 After Dinner Party (2 drinks), €200 dinner table retention after 00:30, €250 after-dinner table up to 8 guests + entry.',
  scheduleHeading: 'Official Programme · BOBINO LEGENDS Dec 31, 2026',
  steps: [
    'BOBINO LEGENDS Seated Gala Dinner begins (€120 · presale reservation required)',
    'Video Live Show on LEDWALL featuring iconic 70s, 80s & 90s hits (DJ Matthew Brown)',
    'After-Dinner Party admission opens from 23:30 (2 drinks · priority for presale holders)',
    'Midnight countdown & Ferrari Maximum Brut sparkling toast',
    'DJ Set 2000s-to-present hits until 04:00 with DJ Matthew Brown & Roberto Milani',
  ],
  menusHeading: 'Official NYE 2027 Menu & Party Tiers · BOBINO LEGENDS',
  dinnerMenuTitle: 'BOBINO LEGENDS Gala Dinner Menu',
  dinnerMenuSubtitle: 'Served at 20:30 · Allergy substitutions must be specified at booking time',
  dinnerBev:
    'Included beverages: water, Ribolla Gialla (Torre Rosazza, Friuli) or Pinot Noir (Tenuta Kornell, South Tyrol) 1 bottle per 4 guests · Toast: Ferrari Maximum Brut 1 bottle per 4/6 guests.',
  dinnerLabels: ['5 Antipasti', 'First Course', 'Main Course', 'After Midnight', 'Desserts'],
  dinnerDishes: [
    'Citrus-marinated salmon with crispy fennel & pink pepper · Creamed cod on crisp crostino · Cocktail shrimp · Grosseti DOP cured meats (24-month Parma prosciutto, Coppa & Pancetta) · Piedmontese Fassona beef tartare',
    'Piacenza pumpkin tortelli with brown butter, sage, Parmigiano & amaretto crumble · Allergy option*: Saffron Risotto alla Milanese',
    'Herb-crusted sea bass fillet with confit cherry tomatoes & roast potatoes · Allergy option*: Suckling pig medallion in red wine jus with rosemary potatoes',
    'Traditional New Year cotechino pork sausage and lentils after midnight',
    'Artisan Italian pandoro and panettone served with velvety mascarpone cream',
  ],
  dinnerAlt: 'Official BOBINO LEGENDS New Year’s Eve 2027 €120 Dinner Menu and Night Schedule',
  partyCardTitle: 'After Dinner Party & VIP Tables · BOBINO LEGENDS',
  partyCardPrice: '€30 – €50 / Table €250',
  partyCardSubtitle: 'From 23:30 to 04:00 · Priority entry with online presale tickets',
  partyCardBev:
    'All After Dinner tickets include 2 drinks (does not guarantee table seating). Reserved tables €200 (keep dinner table) or €250 after-dinner (max 8 guests + admission tickets).',
  partyLabels: ['Early Online Presale Tiers (2 Drinks)', 'Door Entry without Presale', 'Tables from 00:30'],
  partyDishes: [
    '€30 per person until Dec 7 · €35 Dec 8–23 · €40 Dec 24–31',
    '€50 per person including 2 drinks (standard queue)',
    '€200 Dinner table keep (1 spirit + mixers or 2 Ferrari Maximum) · €250 After-dinner table max 8 guests + entry',
  ],
  partyAlt: 'BOBINO LEGENDS After Dinner pricing €30/€35/€40/€50 and Nightlife Milan Concierge card',
};

function makeTranslatedPack(
  title: string,
  subtitle: string,
  description: string,
  musicAndFormat: string,
  dressCode: string,
  priceSummary: string,
  dinnerLabel: string,
  afterLabel: string,
  keepTableLabel: string,
  postTableLabel: string,
  scheduleHeading: string,
  menusHeading: string,
): BobinoPack {
  return {
    ...EN_PACK,
    title,
    subtitle,
    description,
    musicAndFormat,
    dressCode,
    priceSummary,
    dinnerLabel,
    afterLabel,
    keepTableLabel,
    postTableLabel,
    scheduleHeading,
    menusHeading,
  };
}

const PACKS: Record<string, BobinoPack> = {
  it: IT_PACK,
  en: EN_PACK,
  es: makeTranslatedPack(
    'Nochevieja 2027 Bobino Milán · BOBINO LEGENDS (Cena 120€, Fiesta 30€)',
    `Bobino Milano · ${BOBINO_ADDR} · Jueves 31 Diciembre · 20:30 – 04:00`,
    'Fin de año BOBINO LEGENDS en Bobino Milano (Piazzale Stazione Genova 4, Navigli): cena servida a las 20:30 por 120€ (solo preventa) con 5 entrantes, tortelli o risotto, lubina o cochinillo, cotechino con lentejas, vinos y brindis Ferrari Maximum Brut; Video Live Show LEDWALL 70-80-90 a las 22:30, After Dinner desde las 23:30 a 30€/35€/40€ (50€ sin preventa) con 2 copas y DJ Matthew Brown + Roberto Milani hasta las 04:00.',
    'Video Live Show LEDWALL Éxitos 70-80-90 (22:30) · Sesión DJ Matthew Brown & Roberto Milani (00:30–04:00)',
    'Elegante / Smart Chic para Nochevieja',
    'Cena Servida 120€ · Fiesta 23:30 30€–50€ (2 copas) · Mantener Mesa 200€ · Mesa Post-Cena 250€',
    'Cena BOBINO LEGENDS (desde 20:30 · solo preventa)',
    'Fiesta After Dinner con 2 Copas (desde 23:30)',
    'Mantener Mesa de Cena después de las 00:30',
    'Mesa Privada Dopocena (desde 00:30 · máx 8 pers.)',
    'Programa Oficial BOBINO LEGENDS · 31 Diciembre 2026',
    'Menú Oficial 120€ y Fórmulas After Dinner · BOBINO LEGENDS',
  ),
  fr: makeTranslatedPack(
    'Nouvel An 2027 Bobino Milan · BOBINO LEGENDS (Dîner 120€, Soirée 30€)',
    `Bobino Milano · ${BOBINO_ADDR} · Jeudi 31 Décembre · 20:30 – 04:00`,
    'Saint-Sylvestre BOBINO LEGENDS au Bobino Milano (Piazzale Stazione Genova 4, Navigli) : dîner assis à 20h30 à 120€ (prévente uniquement) avec 5 entrées, tortelli ou risotto, bar rôti ou cochon de lait, cotechino et lentilles, vins et toast Ferrari Maximum Brut ; Video Live Show LEDWALL années 70-80-90 à 22h30, After Dinner dès 23h30 dès 30€ (2 verres) et DJ set jusqu’à 04h00 avec DJ Matthew Brown & Roberto Milani.',
    'Video Live Show LEDWALL Tubes 70-80-90 (22h30) · DJ Matthew Brown & Special Guest Roberto Milani (00h30–04h00)',
    'Tenue élégante / Smart Chic pour le Réveillon',
    'Dîner Assis 120€ · Soirée 23h30 30€–50€ (2 boissons) · Maintien Table 200€ · Table 00h30 250€',
    'Dîner BOBINO LEGENDS (dès 20h30 · sur prévente)',
    'Soirée After Dinner avec 2 Boissons (dès 23h30)',
    'Conserver la Table de Dîner après 00h30',
    'Table Privée Après-Dîner (dès 00h30 · max 8 pers.)',
    'Programme Officiel BOBINO LEGENDS · 31 Décembre 2026',
    'Menu Officiel 120€ & Formules After Dinner · BOBINO LEGENDS',
  ),
  de: makeTranslatedPack(
    'Silvester 2027 Bobino Mailand · BOBINO LEGENDS (Dinner 120€, Party 30€)',
    `Bobino Milano · ${BOBINO_ADDR} · Donnerstag 31. Dezember · 20:30 – 04:00`,
    'BOBINO LEGENDS Silvester im Bobino Milano (Piazzale Stazione Genova 4, Navigli): serviertes Gala-Dinner ab 20:30 Uhr für 120€ (nur Vorverkauf) inklusive 5 Vorspeisen, Tortelli oder Risotto, Wolfsbarsch oder Spanferkel, Cotechino mit Linsen, Wein und Ferrari Maximum Brut; ab 22:30 LEDWALL Video Live Show (70er-80er-90er), After Dinner Party ab 23:30 für 30€/35€/40€ (Abendkasse 50€ inkl. 2 Drinks) mit DJ Matthew Brown & Roberto Milani bis 04:00.',
    'LEDWALL Video Live Show 70s-80s-90s (22:30) · DJ Matthew Brown & Special Guest Roberto Milani (00:30–04:00)',
    'Silvester Smart Elegant Dresscode',
    'Gala-Dinner 120€ · Party 23:30 30€–50€ (2 Drinks) · Dinner-Tisch behalten 200€ · Tisch ab 00:30 250€',
    'BOBINO LEGENDS Dinner (ab 20:30 · nur Vorverkauf)',
    'After Dinner Party inkl. 2 Drinks (ab 23:30)',
    'Dinner-Tisch nach 00:30 behalten',
    'After-Dinner VIP-Tisch (ab 00:30 · max. 8 Pers.)',
    'Offizielles Programm BOBINO LEGENDS · 31. Dezember 2026',
    'Offizielles Menü 120€ & Party-Tarife · BOBINO LEGENDS',
  ),
  pt: makeTranslatedPack(
    'Réveillon 2027 Bobino Milão · BOBINO LEGENDS (Jantar 120€, Festa 30€)',
    `Bobino Milano · ${BOBINO_ADDR} · Quinta 31 de Dezembro · 20:30 – 04:00`,
    'Ano Novo BOBINO LEGENDS no Bobino Milano (Piazzale Stazione Genova 4, Navigli): jantar servido às 20:30 por 120€ (pré-venda) com 5 entradas, primeiro prato, prato principal, cotechino e lentilhas, vinhos e brinde Ferrari Maximum Brut; Video Live Show LEDWALL às 22:30 e After Dinner desde as 23:30 a partir de 30€ com 2 bebidas e DJs Matthew Brown e Roberto Milani até às 04:00.',
    'Video Live Show LEDWALL Anos 70-80-90 (22:30) · DJ Matthew Brown & Roberto Milani até 04:00',
    'Traje elegante / Smart Chic de Ano Novo',
    'Jantar 120€ · Festa 23:30 30€–50€ (2 bebidas) · Manter Mesa 200€ · Mesa 00:30 250€',
    'Jantar BOBINO LEGENDS (20:30 · pré-venda)',
    'Festa After Dinner com 2 Bebidas (23:30)',
    'Manter Mesa do Jantar após 00:30',
    'Mesa VIP Pós-Jantar (00:30 · máx 8 pessoas)',
    'Programação Oficial BOBINO LEGENDS · 31 Dezembro 2026',
    'Cardápio Oficial 120€ & Ingressos After Dinner',
  ),
  nl: makeTranslatedPack(
    'Oud en Nieuw 2027 Bobino Milaan · BOBINO LEGENDS (Diner €120, Feest €30)',
    `Bobino Milano · ${BOBINO_ADDR} · Donderdag 31 december · 20:30 – 04:00`,
    'Vier Oudejaarsavond tijdens BOBINO LEGENDS bij Bobino Milano (Piazzale Stazione Genova 4, Navigli): zittend galadiner om 20:30 voor €120 (voorverkoop), Video Live Show om 22:30, After Dinner Party vanaf 23:30 voor €30–€50 inclusief 2 drankjes en DJ Matthew Brown & Roberto Milani tot 04:00.',
    'LEDWALL Video Show 70s-80s-90s (22:30) · DJ Matthew Brown & Roberto Milani tot 04:00',
    'Stijlvol / Smart Elegant Oudjaarsavond',
    'Diner €120 · Feest 23:30 €30–€50 (2 drankjes) · Tafel behouden €200 · Feesttafel €250',
    'BOBINO LEGENDS Diner (20:30 · voorverkoop)',
    'After Dinner Party met 2 Drankjes (vanaf 23:30)',
    'Dinertafel behouden na 00:30',
    'VIP-tafel na Diner (vanaf 00:30 · max 8 gasten)',
    'Officieel Programma BOBINO LEGENDS · 31 Dec 2026',
    'Officieel Diner Menu €120 & After Dinner Tarieven',
  ),
  ru: makeTranslatedPack(
    'Новый Год 2027 Bobino Милан · BOBINO LEGENDS (Ужин 120€, Вечеринка 30€)',
    `Bobino Milano · ${BOBINO_ADDR} · Четверг 31 декабря · 20:30 – 04:00`,
    'Новогодняя ночь BOBINO LEGENDS в клубе Bobino Milano (Piazzale Stazione Genova 4, Navigli): праздничный ужин в 20:30 за 120€ по предпродаже с вином и Ferrari Maximum Brut, шоу LEDWALL 70-80-90 в 22:30, After Dinner с 23:30 от 30€ (2 напитка) и DJ Matthew Brown и Roberto Milani до 04:00.',
    'Видео-шоу LEDWALL 70-80-90 (22:30) · DJ Matthew Brown и Roberto Milani до 04:00',
    'Элегантный вечерний дресс-код',
    'Ужин 120€ · Вечеринка 23:30 30€–50€ (2 напитка) · Стол после 00:30 200€ · Стол 250€',
    'Праздничный Ужин BOBINO LEGENDS (20:30)',
    'Вход After Dinner с 2 напитками (с 23:30)',
    'Продление стола после ужина после 00:30',
    'Стол After Dinner (с 00:30 · до 8 чел.)',
    'Официальная программа BOBINO LEGENDS · 31 декабря 2026',
    'Официальное меню 120€ и билеты на вечеринку',
  ),
  tr: makeTranslatedPack(
    'Yılbaşı 2027 Bobino Milano · BOBINO LEGENDS (Yemek 120€, Parti 30€)',
    `Bobino Milano · ${BOBINO_ADDR} · 31 Aralık Perşembe · 20:30 – 04:00`,
    'Piazzale Stazione Genova 4 adresindeki Bobino Milano’da BOBINO LEGENDS Yılbaşı gecesi: 20:30 özel akşam yemeği 120€ (ön satış, şarap ve Ferrari Maximum Brut dahil), 22:30 LEDWALL Video Live Show, 23:30 sonrası 2 içkili After Dinner 30€–50€ ve DJ Matthew Brown & Roberto Milani 04:00’e kadar.',
    '22:30 LEDWALL Video Show (70-80-90) · DJ Matthew Brown & Roberto Milani 04:00’e kadar',
    'Şık Yılbaşı Gecesi Kıyafeti',
    'Yemek 120€ · Parti 23:30 30€–50€ (2 içki) · Masa Uzatma 200€ · Parti Masası 250€',
    'BOBINO LEGENDS Akşam Yemeği (20:30 · ön satış)',
    'After Dinner Parti (23:30 · 2 içki dahil)',
    '00:30 Sonrası Yemek Masası Uzatma',
    'After Dinner VIP Masa (00:30 · maks 8 kişi)',
    'BOBINO LEGENDS Resmi Program · 31 Aralık 2026',
    'Resmi Yılbaşı Menüsü 120€ & Parti Seçenekleri',
  ),
  zh: makeTranslatedPack(
    '2027年跨年夜米兰 Bobino · BOBINO LEGENDS（晚宴120€，派对30€起）',
    `Bobino Milano · ${BOBINO_ADDR} · 12月31日周四 · 20:30 – 04:00`,
    '米兰 Navigli 区 Bobino Milano（Piazzale Stazione Genova 4）推出 BOBINO LEGENDS 2027跨年盛典：20:30 预售正装晚宴 120€（五道前菜、南瓜饺子或藏红花烩饭、海鲈鱼或乳猪配葡萄酒及 Ferrari 起泡酒祝酒），22:30 LED 大屏复古现场秀，23:30 派对入场含2杯酒水 30€–50€，DJ Matthew Brown 与特邀 Roberto Milani 持续至 04:00。',
    '22:30 LED大屏70/80/90金曲现场秀 · DJ Matthew Brown & Roberto Milani 至04:00',
    '优雅新年晚礼服着装要求',
    '跨年晚宴120€ · 23:30派对30€–50€（含2饮）· 00:30后留桌200€ · 卡座250€',
    'BOBINO LEGENDS 跨年晚宴（20:30起·仅限预售）',
    '23:30 跨年派对入场（含2杯酒水）',
    '00:30 后保留晚宴餐桌升级',
    '00:30 后派对VIP卡座（最多8人）',
    'BOBINO LEGENDS 官方跨年日程 · 2026年12月31日',
    '官方120€跨年菜单及派对票价详情',
  ),
  ar: makeTranslatedPack(
    'ليلة رأس السنة 2027 بوبينو ميلانو · BOBINO LEGENDS (عشاء 120€ · حفل 30€)',
    `Bobino Milano · ${BOBINO_ADDR} · الخميس 31 ديسمبر · 20:30 – 04:00`,
    'احتفل بليلة رأس السنة BOBINO LEGENDS في بوبينو ميلانو (Piazzale Stazione Genova 4، نافيلي): عشاء رسمي الساعة 20:30 بسعر 120€ بالتذاكر المسبقة، عرض فيديو مباشر على الشاشة العملاقة 22:30، وحفل ما بعد العشاء من 23:30 بدءاً من 30€ مع مشروبين وموسيقى DJ Matthew Brown وRoberto Milani حتى 04:00.',
    'عرض LEDWALL لأغاني السبعينيات والثمانينيات والتسعينيات · DJ Matthew Brown و Roberto Milani حتى 04:00',
    'إطلالة أنيقة مناسبة لاحتفال رأس السنة',
    'العشاء 120€ · الحفل 23:30 بسعر 30€–50€ · الإبقاء على الطاولة 200€ · طاولة الحفل 250€',
    'عشاء BOBINO LEGENDS الرسمي (20:30)',
    'تذكرة حفل ما بعد العشاء مع مشروبين (23:30)',
    'إبقاء طاولة العشاء بعد الساعة 00:30',
    'طاولة VIP بعد العشاء (من 00:30 · حتى 8 أشخاص)',
    'البرنامج الرسمي لحفل BOBINO LEGENDS · 31 ديسمبر 2026',
    'قائمة العشاء الرسمية 120€ وباقات الحفل',
  ),
};

for (const code of [
  'bg', 'hr', 'cs', 'da', 'et', 'fi', 'el', 'hu', 'ga', 'lv', 'lt', 'mt',
  'pl', 'ro', 'sk', 'sl', 'sv', 'no', 'is', 'uk', 'sq', 'sr', 'bs', 'mk',
] as const) {
  const byLocale: Record<string, [string, string, string, string]> = {
    bg: [
      'Нова Година 2027 Bobino Милано · BOBINO LEGENDS (Вечеря 120€, Парти 30€)',
      'Вечеря BOBINO LEGENDS (20:30)',
      'Вход After Dinner с 2 напитки (23:30)',
      'Официална програма · 31 декември 2026',
    ],
    hr: [
      'Nova Godina 2027 Bobino Milano · BOBINO LEGENDS (Večera 120€, Party 30€)',
      'BOBINO LEGENDS Večera (20:30 · pretprodaja)',
      'After Dinner Party ulaz + 2 pića (23:30)',
      'Službeni program · 31. prosinca 2026.',
    ],
    cs: [
      'Silvestr 2027 Bobino Milán · BOBINO LEGENDS (Večeře 120€, Party 30€)',
      'Večeře BOBINO LEGENDS (20:30 · předprodej)',
      'After Dinner Party + 2 drinky (23:30)',
      'Oficiální program · 31. prosince 2026',
    ],
    da: [
      'Nytårsaften 2027 Bobino Milano · BOBINO LEGENDS (Middag €120, Fest €30)',
      'BOBINO LEGENDS Galamiddag (20:30)',
      'After Dinner Fest inkl. 2 drinks (23:30)',
      'Officielt program · 31. december 2026',
    ],
    et: [
      'Aastavahetus 2027 Bobino Milano · BOBINO LEGENDS (Õhtusöök 120€, Pidu 30€)',
      'BOBINO LEGENDS Pidulik Õhtusöök (20:30)',
      'After Dinner Pidu koos 2 joogiga (23:30)',
      'Ametlik ajakava · 31. detsember 2026',
    ],
    fi: [
      'Uusivuosi 2027 Bobino Milano · BOBINO LEGENDS (Illallinen 120€, Juhla 30€)',
      'BOBINO LEGENDS Juhlaillallinen (20:30)',
      'After Dinner Sisäänpääsy + 2 juomaa (23:30)',
      'Virallinen ohjelma · 31. joulukuuta 2026',
    ],
    el: [
      'Πρωτοχρονιά 2027 Bobino Μιλάνο · BOBINO LEGENDS (Δείπνο 120€, Πάρτι 30€)',
      'Δείπνο BOBINO LEGENDS (20:30 · προπώληση)',
      'After Dinner Party με 2 ποτά (23:30)',
      'Επίσημο Πρόγραμμα · 31 Δεκεμβρίου 2026',
    ],
    hu: [
      'Szilveszter 2027 Bobino Milánó · BOBINO LEGENDS (Vacsora 120€, Buli 30€)',
      'BOBINO LEGENDS Gálavacsora (20:30)',
      'After Dinner Belépő + 2 ital (23:30)',
      'Hivatalos program · 2026. december 31.',
    ],
    ga: [
      'Oíche Chinn Bhliana 2027 Bobino Milano · BOBINO LEGENDS (Dinnéar €120, Cóisir €30)',
      'Dinnéar BOBINO LEGENDS (20:30)',
      'Cóisir After Dinner le 2 Deoch (23:30)',
      'Clár Oifigiúil · 31 Nollaig 2026',
    ],
    lv: [
      'Jaunais Gads 2027 Bobino Milāna · BOBINO LEGENDS (Vakariņas 120€, Ballīte 30€)',
      'BOBINO LEGENDS Svētku Vakariņas (20:30)',
      'After Dinner Ieeja ar 2 dzērieniem (23:30)',
      'Oficiālā programma · 2026. gada 31. decembris',
    ],
    lt: [
      'Naujieji Metai 2027 Bobino Milanas · BOBINO LEGENDS (Vakarienė 120€, Vakarėlis 30€)',
      'BOBINO LEGENDS Šventinė Vakarienė (20:30)',
      'After Dinner Įėjimas su 2 gėrimais (23:30)',
      'Oficiali programa · 2026 m. gruodžio 31 d.',
    ],
    mt: [
      'Ewwel tas-Sena 2027 Bobino Milan · BOBINO LEGENDS (Ikla €120, Festa €30)',
      'Ikla BOBINO LEGENDS (20:30)',
      'Dħul After Dinner b’2 xorb inklużi (23:30)',
      'Programm Uffiċjali · 31 ta’ Diċembru 2026',
    ],
    pl: [
      'Sylwester 2027 Bobino Mediolan · BOBINO LEGENDS (Kolacja 120€, Impreza 30€)',
      'Kolacja BOBINO LEGENDS (20:30 · przedsprzedaż)',
      'Wstęp After Dinner z 2 drinkami (23:30)',
      'Oficjalny Program · 31 grudnia 2026',
    ],
    ro: [
      'Revelion 2027 Bobino Milano · BOBINO LEGENDS (Cină 120€, Petrecere 30€)',
      'Cină Festivă BOBINO LEGENDS (20:30)',
      'Intrare After Dinner cu 2 băuturi (23:30)',
      'Program Oficial · 31 Decembrie 2026',
    ],
    sk: [
      'Silvester 2027 Bobino Miláno · BOBINO LEGENDS (Večera 120€, Párty 30€)',
      'Slávnostná večera BOBINO LEGENDS (20:30)',
      'After Dinner Párty s 2 drinkmi (23:30)',
      'Oficiálny program · 31. decembra 2026',
    ],
    sl: [
      'Silvestrovo 2027 Bobino Milano · BOBINO LEGENDS (Večerja 120€, Zabava 30€)',
      'Večerja BOBINO LEGENDS (20:30)',
      'After Dinner vstop z 2 pijačama (23:30)',
      'Uradni program · 31. december 2026',
    ],
    sv: [
      'Nyårsafton 2027 Bobino Milano · BOBINO LEGENDS (Middag €120, Fest €30)',
      'BOBINO LEGENDS Nyårsmiddag (20:30)',
      'After Dinner Entré inkl. 2 drinkar (23:30)',
      'Officiellt program · 31 december 2026',
    ],
    no: [
      'Nyttårsaften 2027 Bobino Milano · BOBINO LEGENDS (Middag €120, Fest €30)',
      'BOBINO LEGENDS Nyttårsmiddag (20:30)',
      'After Dinner Inngang med 2 drinker (23:30)',
      'Offisielt program · 31. desember 2026',
    ],
    is: [
      'Gamlárskvöld 2027 Bobino Mílanó · BOBINO LEGENDS (Kvöldverður €120, Partí €30)',
      'BOBINO LEGENDS hátíðarkvöldverður (20:30)',
      'After Dinner aðgangur með 2 drykkjum (23:30)',
      'Opinber dagskrá · 31. desember 2026',
    ],
    uk: [
      'Новий Рік 2027 Bobino Мілан · BOBINO LEGENDS (Вечеря 120€, Вечірка 30€)',
      'Святкова вечеря BOBINO LEGENDS (20:30)',
      'After Dinner вхід з 2 напоями (23:30)',
      'Офіційна програма · 31 грудня 2026',
    ],
    sq: [
      'Viti i Ri 2027 Bobino Milano · BOBINO LEGENDS (Darkë 120€, Festa 30€)',
      'Darka Zyrtare BOBINO LEGENDS (20:30)',
      'Hyrja After Dinner me 2 pije (23:30)',
      'Programi Zyrtar · 31 Dhjetor 2026',
    ],
    sr: [
      'Nova Godina 2027 Bobino Milano · BOBINO LEGENDS (Večera 120€, Žurka 30€)',
      'Svečana večera BOBINO LEGENDS (20:30)',
      'After Dinner ulaz sa 2 pića (23:30)',
      'Zvanični program · 31. decembar 2026.',
    ],
    bs: [
      'Nova Godina 2027 Bobino Milano · BOBINO LEGENDS (Večera 120€, Zabava 30€)',
      'Svečana večera BOBINO LEGENDS (20:30)',
      'After Dinner ulaz sa 2 pića (23:30)',
      'Zvanični program · 31. decembar 2026.',
    ],
    mk: [
      'Нова Година 2027 Bobino Милано · BOBINO LEGENDS (Вечера 120€, Забава 30€)',
      'Вечера BOBINO LEGENDS (20:30)',
      'Влез After Dinner со 2 пијалоци (23:30)',
      'Официјална програма · 31 декември 2026',
    ],
  };
  const [title, dinnerLabel, afterLabel, scheduleHeading] = byLocale[code];
  PACKS[code] = makeTranslatedPack(
    title,
    `Bobino Milano · ${BOBINO_ADDR} · 31/12/2026 · 20:30 – 04:00`,
    `${title} · ${EN_PACK.description}`,
    EN_PACK.musicAndFormat,
    EN_PACK.dressCode,
    EN_PACK.priceSummary,
    dinnerLabel,
    afterLabel,
    EN_PACK.keepTableLabel,
    EN_PACK.postTableLabel,
    scheduleHeading,
    `${title} · Menu & After Dinner`,
  );
}

export function getBobinoNyeContent(locale: string): CapodannoLocalizedEventContent {
  const pack = PACKS[locale as LocaleCode] || EN_PACK;
  return buildBobinoContent(pack);
}
