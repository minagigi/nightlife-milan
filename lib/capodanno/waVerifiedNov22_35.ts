import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const MOOD_MENU_IMG = '/images/events/capodanno-2027-menus/mood-live-garden-club-nye-2027-buffet-65.webp';
const COCO_MENU_IMG = '/images/events/capodanno-2027-menus/coco-beach-nye-2027-menu-gala-120.webp';

interface WaNov22Dict {
  nyePrefix: string;
  dec31: string;
  scheduleHeading: string;
  menusHeading: string;
  uponRequest: string;
  tbaStatus: string;
  closedBadge: string;
  dressElegant: string;
  dressCasual: string;
  waBook: string;
}

const DICTS: Record<'it' | 'en' | 'es' | 'fr' | 'de' | 'pt' | 'nl' | 'ru', WaNov22Dict> = {
  it: {
    nyePrefix: 'Capodanno 2027',
    dec31: '31 Dicembre 2026',
    scheduleHeading: 'Programma Orario 31 Dicembre 2026',
    menusHeading: 'Menu Ufficiale Capodanno 2027',
    uponRequest: 'Su richiesta',
    tbaStatus: 'Programma 2027 in attesa di pubblicazione ufficiale',
    closedBadge: 'Chiuso a Capodanno 2027 (Sold Out)',
    dressElegant: 'Elegante / Smart Chic di San Silvestro',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Info e prenotazioni ufficiali via Concierge WhatsApp +39 351 912 7047',
  },
  en: {
    nyePrefix: 'NYE 2027',
    dec31: 'December 31, 2026',
    scheduleHeading: 'December 31, 2026 Schedule',
    menusHeading: 'Official NYE 2027 Menu',
    uponRequest: 'Upon request',
    tbaStatus: 'Official NYE 2027 programme pending release',
    closedBadge: 'Closed on NYE 2027 (Sold Out)',
    dressElegant: 'New Year’s Eve Smart Chic / Elegant',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Official bookings & live updates via WhatsApp Concierge +39 351 912 7047',
  },
  es: {
    nyePrefix: 'Nochevieja 2027',
    dec31: '31 de Diciembre 2026',
    scheduleHeading: 'Horario 31 de Diciembre 2026',
    menusHeading: 'Menú Oficial Nochevieja 2027',
    uponRequest: 'Bajo petición',
    tbaStatus: 'Programa oficial 2027 pendiente de publicación',
    closedBadge: 'Cerrado en Nochevieja 2027 (Sold Out)',
    dressElegant: 'Elegante / Smart Chic de Nochevieja',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Reservas oficiales en WhatsApp Concierge +39 351 912 7047',
  },
  fr: {
    nyePrefix: 'Nouvel An 2027',
    dec31: '31 Décembre 2026',
    scheduleHeading: 'Programme du 31 Décembre 2026',
    menusHeading: 'Menu Officiel Nouvel An 2027',
    uponRequest: 'Sur demande',
    tbaStatus: 'Programme officiel 2027 en cours de publication',
    closedBadge: 'Fermé le 31 Décembre 2026 (Sold Out)',
    dressElegant: 'Élégant / Smart Chic du Réveillon',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Réservations officielles sur WhatsApp +39 351 912 7047',
  },
  de: {
    nyePrefix: 'Silvester 2027',
    dec31: '31. Dezember 2026',
    scheduleHeading: 'Zeitplan 31. Dezember 2026',
    menusHeading: 'Offizielles Silvestermenü 2027',
    uponRequest: 'Auf Anfrage',
    tbaStatus: 'Offizielles Silvesterprogramm 2027 noch nicht veröffentlicht',
    closedBadge: 'An Silvester 2027 geschlossen (Sold Out)',
    dressElegant: 'Elegant / Smart Chic',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Offizielle Buchungen über WhatsApp +39 351 912 7047',
  },
  pt: {
    nyePrefix: 'Réveillon 2027',
    dec31: '31 de Dezembro 2026',
    scheduleHeading: 'Programação 31 de Dezembro 2026',
    menusHeading: 'Menu Oficial Réveillon 2027',
    uponRequest: 'Sob consulta',
    tbaStatus: 'Programa oficial 2027 ainda não divulgado',
    closedBadge: 'Fechado no Réveillon 2027 (Sold Out)',
    dressElegant: 'Elegante / Smart Chic',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Reservas oficiais via WhatsApp +39 351 912 7047',
  },
  nl: {
    nyePrefix: 'Oud en Nieuw 2027',
    dec31: '31 December 2026',
    scheduleHeading: 'Programma 31 December 2026',
    menusHeading: 'Officieel Oud & Nieuw Menu 2027',
    uponRequest: 'Op aanvraag',
    tbaStatus: 'Officieel 2027-programma nog niet gepubliceerd',
    closedBadge: 'Gesloten op Oud & Nieuw 2027 (Sold Out)',
    dressElegant: 'Elegant / Smart Chic',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Officiële boekingen via WhatsApp +39 351 912 7047',
  },
  ru: {
    nyePrefix: 'Новый год 2027',
    dec31: '31 Декабря 2026',
    scheduleHeading: 'Расписание 31 Декабря 2026',
    menusHeading: 'Официальное Новогоднее Меню 2027',
    uponRequest: 'По запросу',
    tbaStatus: 'Официальная программа 2027 еще не опубликована',
    closedBadge: 'Закрыто на Новый год 2027 (Sold Out)',
    dressElegant: 'Элегантный / Smart Chic',
    dressCasual: 'Smart Casual / Urban Chic',
    waBook: 'Официальное бронирование в WhatsApp +39 351 912 7047',
  },
};

function getDict(locale: string): WaNov22Dict {
  if (locale in DICTS) return DICTS[locale as keyof typeof DICTS];
  return DICTS.en;
}

function buildMoodLive(locale: string, d: WaNov22Dict): CapodannoLocalizedEventContent {
  const isIt = locale === 'it';
  const addr = 'Via Circonvallazione Idroscalo 51, 20054 Segrate (MI)';
  const hours = '20:30 – 05:00';
  const menu: CapodannoMenuCard = {
    id: 'mood-live-royal-buffet-65',
    title: isIt ? 'Royal Buffet New Year 2027 · Garden Club / Mood Live' : 'New Year 2027 Royal Buffet · Garden Club / Mood Live',
    price: isIt ? '65€ a persona' : '€65 per person',
    subtitle: isIt ? `Inizio ore 20:30 · ${addr} · 1 drink + 1 flûte brindisi inclusi` : `Starts 20:30 · ${addr} · 1 drink + 1 midnight toast flute included`,
    courses: isIt
      ? [
          {
            course: 'Antipasti (16 portate al Royal Buffet)',
            dish: 'Salumi misti con grissini, insalata russa con tartufo, polenta al gorgonzola, gamberi in salsa cocktail, bresaola con rucola e grana, salmone affumicato, caprese di bufala, porchetta di Ariccia IGP, arrosticini di carne, insalata di mare, vitello tonnato, verdurine grigliate, formaggi stagionati con confetture, finger food dello chef, focacce artigianali e cous cous vegan',
          },
          {
            course: 'Primi Piatti',
            dish: 'Lasagne ai profumi autunnali · Agnolotti al nero di seppia con frutti di mare',
          },
          {
            course: 'Secondo Piatto',
            dish: 'Cuore tenero di manzo alla Wellington',
          },
          {
            course: 'Dessert & Mezzanotte',
            dish: 'Frutta fresca di stagione, dolce artigianale della tradizione milanese con gelato alla crema e Cotechino con lenticchie (Tesoro con pepite fortunate)',
          },
        ]
      : [
          {
            course: 'Starters (16 Royal Buffet selections)',
            dish: 'Cured meats & grissini, truffle Russian salad, gorgonzola polenta, prawn cocktail, smoked salmon, buffalo caprese, Ariccia IGP porchetta, seafood salad, vitello tonnato, aged cheeses with jams, chef finger food, artisan focaccia & vegan cous cous',
          },
          {
            course: 'First Courses',
            dish: 'Autumn-scented baked lasagna · Squid-ink agnolotti with seafood',
          },
          {
            course: 'Main Course',
            dish: 'Tender Beef Wellington',
          },
          {
            course: 'Dessert & Midnight Tradition',
            dish: 'Fresh seasonal fruit, traditional Milanese panettone with vanilla gelato & midnight cotechino with lucky lentils',
          },
        ],
    beverages: isIt
      ? 'Inclusi nel Royal Buffet 65€: 1 drink + 1 flûte per il brindisi di mezzanotte'
      : 'Included in €65 Royal Buffet: 1 drink + 1 sparkling flute for the midnight toast',
    imageSrc: MOOD_MENU_IMG,
    imageAlt: isIt ? 'Menu ufficiale Royal Buffet 65€ Garden Club Mood Live Milano 2027' : 'Official €65 Royal Buffet Menu Garden Club Mood Live Milan 2027',
  };
  const schedule: CapodannoScheduleStep[] = isIt
    ? [
        { time: '20:30', label: 'Apertura Royal Buffet New Year 2027 (65€ con 1 drink + 1 flûte brindisi)' },
        { time: '23:00', label: 'Apertura Ingresso Dopocena per brindare all’inizio del 2027' },
        { time: '00:00', label: 'Countdown, brindisi di mezzanotte, cotechino e lenticchie' },
        { time: '00:30 – 05:00', label: 'DJ set e club night in sala Garden Club fino al mattino' },
      ]
    : [
        { time: '20:30', label: 'New Year 2027 Royal Buffet opening (€65 with 1 drink + 1 toast flute)' },
        { time: '23:00', label: 'After-Dinner entry opens to toast the New Year' },
        { time: '00:00', label: 'Midnight countdown, sparkling toast, cotechino & lentils' },
        { time: '00:30 – 05:00', label: 'Garden Club DJ sets and party until dawn' },
      ];
  return {
    title: isIt
      ? 'Capodanno Mood Live / Garden Club Milano 2027 · Royal Buffet 65€ all’Idroscalo'
      : `${d.nyePrefix} Mood Live / Garden Club Milan · €65 Royal Buffet at Idroscalo`,
    subtitle: `Garden Club / Mood Live · ${addr} · ${d.dec31} · ${hours}`,
    description: isIt
      ? 'Capodanno 2027 al Mood Live / Garden Club (Via Circonvallazione Idroscalo 51, Segrate, Milano): programma ufficiale confermato con Royal Buffet dalle 20:30 a 65€ a persona (16 antipasti, Lasagne ai profumi autunnali, Agnolotti al nero di seppia con frutti di mare, Cuore tenero di manzo alla Wellington, dolce tradizione milanese, cotechino con lenticchie, 1 drink e 1 flûte per il brindisi) e ingresso dopocena dalle 23:00. Prenota online su nightlifemilan.com o tramite Concierge WhatsApp +39 351 912 7047.'
      : `Official New Year’s Eve 2027 at Mood Live / Garden Club (${addr}): confirmed €65 Royal Buffet starting at 20:30 (16 starters, autumn lasagna, squid-ink seafood agnolotti, Beef Wellington, traditional Milanese dessert, cotechino & lentils, 1 drink + 1 midnight toast flute) plus After-Dinner admission from 23:00. Book online on nightlifemilan.com or WhatsApp +39 351 912 7047.`,
    musicAndFormat: isIt
      ? 'New Year 2027 Garden Club · Royal Buffet (20:30), Countdown & Club DJ Set (23:00–05:00)'
      : 'Garden Club New Year 2027 · Royal Buffet (20:30), Midnight Countdown & Club DJ Set (23:00–05:00)',
    dressCode: d.dressElegant,
    priceSummary: isIt
      ? 'Royal Buffet 20:30: 65€ (1 drink + 1 flûte brindisi) · Ingresso Dopocena dalle 23:00 (su richiesta)'
      : '20:30 Royal Buffet: €65 (1 drink + 1 toast flute) · After-Dinner from 23:00 (on request)',
    tiers: [
      {
        label: isIt ? 'Royal Buffet New Year 2027 (inizio 20:30)' : 'New Year 2027 Royal Buffet (starts 20:30)',
        price: isIt ? '65€' : '€65',
        details: isIt
          ? '16 antipasti, 2 primi, Manzo alla Wellington, frutta, dolce milanese, cotechino e lenticchie + 1 drink + 1 flûte brindisi'
          : '16 starters, 2 first courses, Beef Wellington, fruit, Milanese panettone, cotechino & lentils + 1 drink + 1 toast flute',
      },
      {
        label: isIt ? 'Ingresso Dopocena (dalle 23:00)' : 'After-Dinner Admission (from 23:00)',
        price: d.uponRequest,
        details: isIt
          ? 'Accesso dalle 23:00 per brindare all’inizio del 2027 · quota e tavoli confermati via Concierge WhatsApp +39 351 912 7047'
          : 'Club access from 23:00 for the midnight toast · rate and tables confirmed via WhatsApp +39 351 912 7047',
      },
    ],
    highlights: [
      `Location: Garden Club / Mood Live (${addr})`,
      isIt ? 'Royal Buffet dalle 20:30: 65€ con 1 drink + 1 flûte brindisi' : 'Royal Buffet from 20:30: €65 with 1 drink + 1 toast flute',
      isIt ? 'Ingresso Dopocena dalle 23:00 · DJ set fino alle 05:00' : 'After-Dinner from 23:00 · Club DJ set until 05:00',
      d.waBook,
    ],
    sourceBasis: isIt
      ? 'Programma e menu ufficiali New Year 2027 confermati direttamente da Garden Club / Mood Live (Via Circonvallazione Idroscalo 51, Segrate): Royal Buffet dalle 20:30 a 65€ (1 drink + 1 flûte brindisi inclusi) e ingresso dopocena dalle 23:00.'
      : 'Official New Year 2027 programme and menu confirmed directly by Garden Club / Mood Live (Via Circonvallazione Idroscalo 51, Segrate): €65 Royal Buffet from 20:30 (1 drink + 1 toast flute included) and After-Dinner from 23:00.',
    scheduleHeading: d.scheduleHeading,
    schedule,
    menusHeading: d.menusHeading,
    menus: [menu],
    offerPricesEur: [65],
  };
}

function buildCocoBeach(locale: string, d: WaNov22Dict): CapodannoLocalizedEventContent {
  const isIt = locale === 'it';
  const addr = 'Via Catullo 5, 25017 Lonato del Garda (BS)';
  const menu: CapodannoMenuCard = {
    id: 'coco-beach-gala-120',
    title: isIt ? 'Menu Cenone di Gala · Coco Beach Club 2027' : 'Gala Dinner Menu · Coco Beach Club NYE 2027',
    price: isIt ? '120€ entro 09/12 · 150€ dal 10/12' : '€120 by Dec 9 · €150 from Dec 10',
    subtitle: isIt ? `Dalle 20:30 · ${addr} · 1 bottiglia vino ogni 3 ospiti & fuochi sul lago` : `From 20:30 · ${addr} · 1 wine bottle per 3 guests & lakeside fireworks`,
    courses: isIt
      ? [
          {
            course: 'Calice di Benvenuto & Entrée (6 assaggi)',
            dish: 'Calice di bollicine Franciacorta · Stick di ribollita agrodolce, bocconcini di cotechino in pasta sfoglia, muffin di pizza con pomodorino confit e basilico, mini bignè di patate/ricotta/olive, mazzancolle ai cereali e salsa teriyaki, mini tartare di Fassona e pan brioches',
          },
          {
            course: 'Antipasto',
            dish: 'Polpo, patate e olive taggiasche in pasta fillo su crema di ceci e olio ai pomodorini confit',
          },
          {
            course: 'Bis di Primi',
            dish: 'Risotto al profumo di limone, riduzione al Lugana e capperi soffiati · Calamarata in guazzetto di mare, pomodorini e basilico fritto',
          },
          {
            course: 'Secondo',
            dish: 'Filetto di branzino, code di gambero, verdure croccanti e crema di patata agrumata',
          },
          {
            course: 'Dolce & Mezzanotte sul Lago',
            dish: 'Buffet di mezzanotte nella sala esterna per lo spettacolo pirotecnico sul lago con panettone artigianale Italo Vezzoli e brindisi Franciacorta Berlucchi Satèn',
          },
        ]
      : [
          {
            course: 'Welcome Franciacorta & 6 Entrée Bites',
            dish: 'Welcome Franciacorta glass · Sweet-and-sour ribollita stick, puff-pastry cotechino bites, confit tomato pizza muffin, potato-ricotta-olive choux, cereal-crusted prawns with teriyaki, Fassona beef mini tartare on brioche',
          },
          {
            course: 'Starter',
            dish: 'Octopus, potato & Taggiasca olives in crisp phyllo pastry over chickpea cream and confit tomato oil',
          },
          {
            course: 'Two First Courses',
            dish: 'Lemon-scented risotto with Lugana reduction & puffed capers · Seafood calamarata pasta with cherry tomatoes & crisp basil',
          },
          {
            course: 'Main Course',
            dish: 'Sea bass fillet, prawn tails, crisp seasonal vegetables & citrus potato cream',
          },
          {
            course: 'Dessert & Lakeside Fireworks',
            dish: 'Outdoor midnight buffet for the Lake Garda fireworks show with artisanal Italo Vezzoli panettone & Berlucchi Satèn Franciacorta toast',
          },
        ],
    beverages: isIt
      ? '1 bottiglia di vino ogni 3 ospiti a scelta tra Lugana Perla del Garda, Valpolicella Classico Allegrini o Franciacorta Brut Contadi Castaldi'
      : '1 bottle of wine per 3 guests: choice of Lugana Perla del Garda, Valpolicella Classico Allegrini or Franciacorta Brut Contadi Castaldi',
    imageSrc: COCO_MENU_IMG,
    imageAlt: isIt ? 'Menu ufficiale Cenone di Gala Coco Beach Club Lago di Garda 2027' : 'Official Gala Dinner Menu Coco Beach Club Lake Garda NYE 2027',
  };
  const schedule: CapodannoScheduleStep[] = isIt
    ? [
        { time: '20:30', label: 'Gala Dinner Show (120€ promo entro 09/12 · 150€ dal 10/12) con vino 1 ogni 3' },
        { time: '23:00', label: 'Wintergarden Open Air Countdown con DJ Ayub (15€ con drink, brindisi e fuochi)' },
        { time: '00:00', label: 'Fuochi d’artificio sul Lago di Garda, Panettone Italo Vezzoli & apertura Mainroom con DJ Simone Cattaneo (20€ Donna / 25€ Uomo)' },
        { time: '00:00 – 05:00', label: 'Tavoli VIP (640€ min spending + 8 ingressi) e clubbing fino alle 05:00' },
      ]
    : [
        { time: '20:30', label: 'Gala Dinner Show (€120 promo by Dec 9 · €150 from Dec 10) with wine 1/3' },
        { time: '23:00', label: 'Wintergarden Open Air Countdown with DJ Ayub (€15 with drink, toast & fireworks)' },
        { time: '00:00', label: 'Lake Garda fireworks, Italo Vezzoli panettone & Mainroom opening with DJ Simone Cattaneo (€20 Lady / €25 Man)' },
        { time: '00:00 – 05:00', label: 'VIP Tables (€640 min spend + 8 admissions) & clubbing until 05:00' },
      ];
  return {
    title: isIt
      ? 'Capodanno Coco Beach Club Lago di Garda 2027 · Dinner Show, Wintergarden & Mainroom'
      : `${d.nyePrefix} Coco Beach Club Lake Garda · Dinner Show, Wintergarden & Mainroom`,
    subtitle: `Coco Beach Club · ${addr} · ${d.dec31} · 20:30 – 05:00`,
    description: isIt
      ? 'Capodanno 2027 ufficiale al Coco Beach Club di Lonato del Garda (Via Catullo 5): Dinner Show di Gala dalle 20:30 a 120€ promo entro il 9 dicembre (150€ dal 10 dicembre) con menu completo di mare e terra, 1 bottiglia di vino ogni 3 persone, panettone Italo Vezzoli, Franciacorta Berlucchi Satèn e fuochi d’artificio sul lago; Wintergarden Open Air dalle 23:00 con DJ Ayub a 15€; Mainroom dalle 00:00 con DJ Simone Cattaneo (20€ Donna / 25€ Uomo) e Tavoli VIP a 640€ min spending con 8 ingressi. Nota: lo storico Sesto Senso è oggi JustMe Garda Lake con scheda dedicata.'
      : `Official NYE 2027 at Coco Beach Club (${addr}): 20:30 Gala Dinner Show at €120 promo by Dec 9 (€150 from Dec 10) with 1 wine bottle per 3 guests, Italo Vezzoli panettone, Berlucchi Satèn & lakeside fireworks; 23:00 Wintergarden Open Air with DJ Ayub (€15); 00:00 Mainroom with DJ Simone Cattaneo (€20 Lady / €25 Man); VIP Tables €640 min spend with 8 entries. Note: former Sesto Senso is now JustMe Garda Lake.`,
    musicAndFormat: isIt
      ? 'Dinner Show (20:30) · Wintergarden Open Air con DJ Ayub (23:00) · Mainroom con DJ Simone Cattaneo (00:00)'
      : 'Dinner Show (20:30) · Wintergarden Open Air with DJ Ayub (23:00) · Mainroom with DJ Simone Cattaneo (00:00)',
    dressCode: isIt ? 'Elegante / Lake Garda Glam' : 'Lake Garda Glam / Smart Elegant',
    priceSummary: isIt
      ? 'Wintergarden 23:00 15€ · Mainroom 00:00 Donna 20€ / Uomo 25€ · Dinner Show 120€ (entro 09/12) / 150€ · Tavoli 640€ (8 pax)'
      : 'Wintergarden 23:00 €15 · Mainroom 00:00 Lady €20 / Man €25 · Dinner Show €120 (by Dec 9) / €150 · Tables €640 (8 guests)',
    tiers: [
      {
        label: isIt ? 'Gala Dinner Show (20:30 · promo entro 09/12 / dal 10/12)' : 'Gala Dinner Show (20:30 · promo by Dec 9 / from Dec 10)',
        price: isIt ? '120€ / 150€' : '€120 / €150',
        details: isIt
          ? 'Entrée 6 assaggi, antipasto polpo, bis di primi, branzino e gamberi, panettone Italo Vezzoli, Berlucchi Satèn, 1 vino ogni 3 e fuochi'
          : '6 entrée bites, octopus starter, two first courses, sea bass & prawns, Italo Vezzoli panettone, Berlucchi Satèn, wine 1/3 & fireworks',
      },
      {
        label: isIt ? 'Wintergarden Open Air Countdown (23:00–00:00 · DJ Ayub)' : 'Wintergarden Open Air Countdown (23:00–00:00 · DJ Ayub)',
        price: isIt ? '15€' : '€15',
        details: isIt ? 'Ingresso 23:00–00:00 con 1 drink, brindisi e fuochi sul lago' : '23:00–00:00 entry with 1 drink, toast & lake fireworks',
      },
      {
        label: isIt ? 'Mainroom & Wintergarden dopo 00:00 (DJ Simone Cattaneo)' : 'Mainroom & Wintergarden after 00:00 (DJ Simone Cattaneo)',
        price: isIt ? '20€ Donna / 25€ Uomo' : '€20 Lady / €25 Man',
        details: isIt ? 'Ingresso dopo la mezzanotte con 1 consumazione inclusa' : 'After-midnight admission with 1 drink included',
      },
      {
        label: isIt ? 'Tavoli VIP (fino a 8 ingressi)' : 'VIP Tables (up to 8 admissions)',
        price: isIt ? '640€ min spending' : '€640 min spend',
        details: isIt ? 'Tavolo riservato con 640€ di minimum spending e 8 ingressi omaggio' : 'Reserved VIP table with €640 minimum spend and 8 complimentary entries',
      },
    ],
    highlights: [
      `Location: Coco Beach Club (${addr})`,
      isIt ? 'Gala Dinner 20:30: 120€ entro 09/12 (150€ dal 10/12) + fuochi sul lago' : 'Gala Dinner 20:30: €120 by Dec 9 (€150 from Dec 10) + lake fireworks',
      isIt ? 'Lineup: DJ Ayub (Wintergarden 23:00 · 15€) & DJ Simone Cattaneo (Mainroom 00:00 · 20€/25€)' : 'Lineup: DJ Ayub (Wintergarden 23:00 · €15) & DJ Simone Cattaneo (Mainroom 00:00 · €20/€25)',
      isIt ? 'Tavoli VIP: 640€ min spending (8 ingressi) · Prenota su nightlifemilan.com' : 'VIP Tables: €640 min spend (8 guests) · Book on nightlifemilan.com',
    ],
    sourceBasis: isIt
      ? 'Programma, lineup (DJ Ayub e DJ Simone Cattaneo), listino e menu ufficiale Capodanno 2027 confermati direttamente da Coco Beach Club Lonato del Garda.'
      : 'Official NYE 2027 programme, lineup (DJ Ayub & DJ Simone Cattaneo), rate card and menu confirmed directly by Coco Beach Club Lonato del Garda.',
    scheduleHeading: d.scheduleHeading,
    schedule,
    menusHeading: d.menusHeading,
    menus: [menu],
    offerPricesEur: [15, 20, 25, 120, 150, 640],
  };
}

function buildCarroponte(locale: string, d: WaNov22Dict): CapodannoLocalizedEventContent {
  const isIt = locale === 'it';
  const addr = 'Via Luigi Granelli 1, 20099 Sesto San Giovanni (MI)';
  return {
    title: isIt
      ? 'Capodanno Carroponte / Carro Social Club 2027 · Buffet + 1 Drink 55€'
      : `${d.nyePrefix} Carroponte / Carro Social Club · €55 Buffet + 1 Drink`,
    subtitle: `Kozel Carroponte / Carro Social Club · ${addr} · ${d.dec31}`,
    description: isIt
      ? 'Capodanno 2027 confermato al Carro Social Club / Kozel Carroponte (Via Luigi Granelli 1, Sesto San Giovanni): formula Buffet di Capodanno con 1 drink incluso a 55€ a persona. Quota ingresso normale dopocena in corso di definizione da parte della direzione. Prenota online su nightlifemilan.com o scrivi al Concierge WhatsApp +39 351 912 7047.'
      : `Confirmed New Year’s Eve 2027 at Carro Social Club / Kozel Carroponte (${addr}): NYE Buffet with 1 drink included at €55 per person. Standard after-dinner club entry pricing is currently being finalized by management. Book online on nightlifemilan.com or WhatsApp +39 351 912 7047.`,
    musicAndFormat: isIt
      ? 'Carro Social Club Capodanno 2027 · Buffet di San Silvestro & Festa di Mezzanotte'
      : 'Carro Social Club NYE 2027 · New Year’s Eve Buffet & Midnight Party',
    dressCode: d.dressCasual,
    priceSummary: isIt
      ? 'Buffet di Capodanno + 1 drink: 55€ a persona · Ingresso normale dopocena in definizione'
      : 'NYE Buffet + 1 drink: €55 per person · Standard after-dinner entry TBA',
    tiers: [
      {
        label: isIt ? 'Buffet di Capodanno + 1 Drink' : 'New Year’s Eve Buffet + 1 Drink',
        price: isIt ? '55€ a persona' : '€55 per person',
        details: isIt
          ? 'Formula ufficiale confermata Carro Social Club / Carroponte con buffet di San Silvestro e 1 consumazione inclusa'
          : 'Official confirmed Carro Social Club / Carroponte package including NYE buffet and 1 drink',
      },
      {
        label: isIt ? 'Ingresso Normale Dopocena' : 'Standard After-Dinner Entry',
        price: d.uponRequest,
        details: isIt
          ? 'Tariffa solo serata in via di definizione dalla direzione · aggiornamenti via WhatsApp +39 351 912 7047'
          : 'Late entry rate currently being finalized by venue management · live updates via WhatsApp +39 351 912 7047',
      },
    ],
    highlights: [
      `Location: Kozel Carroponte / Carro Social Club (${addr})`,
      isIt ? 'Formula confermata: Buffet di Capodanno con 1 drink a 55€' : 'Confirmed package: NYE Buffet with 1 drink at €55',
      isIt ? 'Ingresso dopocena in definizione · zero stime non verificate' : 'After-dinner entry TBA · zero unverified estimates',
      d.waBook,
    ],
    sourceBasis: isIt
      ? 'Conferma diretta Carro Social Club / Carroponte (Via Luigi Granelli 1, Sesto San Giovanni): Buffet di Capodanno con 1 drink a 55€ a persona; quota ingresso normale in definizione.'
      : 'Direct confirmation from Carro Social Club / Carroponte (Via Luigi Granelli 1, Sesto San Giovanni): €55 per person NYE Buffet with 1 drink; standard late entry TBA.',
    offerPricesEur: [55],
  };
}

function buildMascara(locale: string, d: WaNov22Dict): CapodannoLocalizedEventContent {
  const isIt = locale === 'it';
  const addr = 'Viale della Favorita 17, 46100 Mantova';
  return {
    title: isIt
      ? 'Capodanno Mascara All Music Mantova 2027 · 4 Sale, Live Show & Cenone 95€'
      : `${d.nyePrefix} Mascara All Music Mantova · 4 Rooms, Live Show & €95 Gala Dinner`,
    subtitle: `Mascara All Music · ${addr} · ${d.dec31} · 20:00 – 05:00`,
    description: isIt
      ? 'Capodanno 2027 al Mascara All Music di Mantova (Viale della Favorita 17) con 4 sale aperte (Sala Live con I Rodigini, Sala Vanità con Besame, Sala Diva 70/80/90/2000 e Sala Lemon Noche Latina) e Live Show di Sara Alice. Listino confermato: Gran Cenone + Show 95€ (antipasti mare/terra, bottoni burrata e risotto all’Amarone, branzino in crosta di patate e guancia brasata all’Amarone, dolce della casa), Pizza + Show 75€, Gran Buffet 50€ (tutti con tavolo riservato, 1 drink e guardaroba gratuito). Ingresso senza prenotazione solo in cassa la sera stessa: 35€ prima 23:00 / 25€ dopo 23:00 / 20€ dopo 00:00.'
      : `Confirmed NYE 2027 at Mascara All Music Mantova (${addr}) with 4 music rooms (Sala Live with I Rodigini, Sala Vanità with Besame, Sala Diva 70s–2000s, Sala Lemon Noche Latina) and Sara Alice Live Show. Official rates: Gala Dinner + Show €95 (seafood & meat starters, burrata ravioli & Amarone risotto, potato-crusted sea bass & Amarone braised beef cheek, house dessert), Pizza + Show €75, Grand Buffet €50 (all include reserved table, 1 drink & free coat check). Unreserved tickets sold only at the door on Dec 31: €35 before 23:00 / €25 after 23:00 / €20 after 00:00.`,
    musicAndFormat: isIt
      ? '4 Sale Aperte: Sala Live (I Rodigini), Sala Vanità (Besame), Sala Diva (70/80/90/2000), Sala Lemon (Noche Latina) + Live Show Sara Alice'
      : '4 Rooms: Sala Live (I Rodigini), Sala Vanità (Besame), Sala Diva (70s–2000s), Sala Lemon (Noche Latina) + Sara Alice Live Show',
    dressCode: d.dressElegant,
    priceSummary: isIt
      ? 'Gran Cenone + Show 95€ · Pizza + Show 75€ · Gran Buffet 50€ · In cassa la sera stessa 35€/25€/20€'
      : 'Gala Dinner + Show €95 · Pizza + Show €75 · Grand Buffet €50 · At the door €35/€25/€20',
    tiers: [
      {
        label: isIt ? 'Gran Cenone + Live Show Sara Alice (tavolo riservato)' : 'Gala Dinner + Sara Alice Live Show (reserved table)',
        price: isIt ? '95€' : '€95',
        details: isIt
          ? 'Quiche porri/speck, salame cinghiale, seppia, gambero kataifi · Bottoni burrata & Risotto Amarone · Branzino & Guancia all’Amarone · Dolce, tavolo riservato, 1 drink e guardaroba'
          : '4 starters, burrata pasta & Amarone risotto, potato-crusted sea bass & Amarone braised beef cheek, dessert, reserved table, 1 drink & coat check',
      },
      {
        label: isIt ? 'Pizza + Live Show Sara Alice (tavolo riservato)' : 'Pizza + Sara Alice Live Show (reserved table)',
        price: isIt ? '75€' : '€75',
        details: isIt
          ? 'Tavolo riservato nella sala scelta, ingresso 4 sale, 1 consumazione e guardaroba gratuito'
          : 'Reserved table in preferred room, 4-room admission, 1 drink & free coat check',
      },
      {
        label: isIt ? 'Gran Buffet con Tavolo Riservato' : 'Grand Buffet with Reserved Table',
        price: isIt ? '50€' : '€50',
        details: isIt
          ? 'Gran buffet, spumante, panettone, tavolo riservato, 1 consumazione e guardaroba gratuito'
          : 'Grand buffet, sparkling wine, panettone, reserved table, 1 drink & free coat check',
      },
      {
        label: isIt ? 'Ingresso Senza Prenotazione (solo in cassa la sera stessa)' : 'Walk-In Admission (at the door only, no presale)',
        price: isIt ? '35€ / 25€ / 20€' : '€35 / €25 / €20',
        details: isIt
          ? 'Acquistabile direttamente in cassa il 31/12: 35€ entro 23:00 (buffet e spumante), 25€ dopo 23:00 (panettone e spumante), 20€ dopo 00:00 (1 drink)'
          : 'Door only on Dec 31: €35 before 23:00 (buffet & bubbly), €25 after 23:00 (panettone & bubbly), €20 after 00:00 (1 drink)',
      },
    ],
    highlights: [
      `Location: Mascara All Music (${addr})`,
      isIt ? '4 Sale: Sala Live (I Rodigini), Vanità (Besame), Diva (70–2000), Lemon (Latino)' : '4 Rooms: Live (I Rodigini), Vanità (Besame), Diva (70s–2000s), Lemon (Latin)',
      isIt ? 'Cenone 95€ · Pizza 75€ · Buffet 50€ (tavolo, 1 drink, guardaroba inclusi)' : 'Gala Dinner €95 · Pizza €75 · Buffet €50 (table, 1 drink, coat check)',
      isIt ? 'Ingressi senza prenotazione (35€/25€/20€) solo in cassa la sera stessa' : 'Walk-in tickets (€35/€25/€20) sold at the door only on Dec 31',
    ],
    sourceBasis: isIt
      ? 'Brochure ufficiale e conferma diretta Mascara All Music Mantova: Gran Cenone 95€, Pizza 75€, Gran Buffet 50€ (prenotabili), ingressi 35€/25€/20€ solo in cassa la sera del 31 dicembre senza prenotazione.'
      : 'Official brochure and direct confirmation from Mascara All Music Mantova: €95 Gala Dinner, €75 Pizza, €50 Grand Buffet (bookable); €35/€25/€20 walk-in tickets sold at the door only on Dec 31.',
    offerPricesEur: [20, 25, 35, 50, 75, 95],
  };
}

function buildCircusClosed(locale: string, d: WaNov22Dict): CapodannoLocalizedEventContent {
  const isIt = locale === 'it';
  return {
    title: isIt
      ? 'Capodanno Brescia & Desenzano 2027 · Circus Beatclub Chiuso (Sold Out) · Art Club Info'
      : `${d.nyePrefix} Brescia & Desenzano · Circus Beatclub Closed (Sold Out) · Art Club TBA`,
    subtitle: isIt
      ? 'Brescia / Desenzano del Garda (BS) · Circus Beatclub Chiuso il 31/12'
      : 'Brescia / Desenzano del Garda (BS) · Circus Beatclub Closed Dec 31',
    description: isIt
      ? 'Aggiornamento ufficiale Capodanno 2027 per Brescia e Desenzano: il Circus Beatclub Brescia ha confermato direttamente la chiusura per la notte di Capodanno (evento Sold Out / non prenotabile). Per l’Art Club Desenzano il listino 2027 è in attesa di pubblicazione. Alternative aperte confermate sul Lago di Garda e a Brescia: Coco Beach Club Lonato (da 15€ / Dinner Show 120€), JustMe Garda Lake e Villa Fenaroli (100€).'
      : 'Official NYE 2027 update for Brescia and Desenzano: Circus Beatclub Brescia directly confirmed it is closed on New Year’s Eve (Sold Out / not bookable). Art Club Desenzano 2027 pricing is TBA. Confirmed open alternatives on Lake Garda and Brescia: Coco Beach Club Lonato (from €15 / €120 Gala), JustMe Garda Lake and Villa Fenaroli (€100).',
    musicAndFormat: isIt
      ? 'Avviso Ufficiale: Circus Beatclub Brescia Chiuso il 31/12 · Art Club Desenzano in aggiornamento'
      : 'Official Notice: Circus Beatclub Brescia Closed Dec 31 · Art Club Desenzano TBA',
    dressCode: d.dressElegant,
    priceSummary: isIt
      ? 'Circus Beatclub: Chiuso 31/12 (Sold Out) · Art Club Desenzano: TBA · Alternative aperte: Coco Beach & JustMe Garda'
      : 'Circus Beatclub: Closed Dec 31 (Sold Out) · Art Club Desenzano: TBA · Open alternatives: Coco Beach & JustMe Garda',
    tiers: [
      {
        label: isIt ? 'Circus Beatclub Brescia' : 'Circus Beatclub Brescia',
        price: d.closedBadge,
        details: isIt
          ? 'Conferma diretta della direzione: il Circus Beatclub resta chiuso la notte del 31 dicembre 2026'
          : 'Direct venue confirmation: Circus Beatclub Brescia is closed on December 31, 2026',
      },
      {
        label: isIt ? 'Art Club Desenzano del Garda' : 'Art Club Desenzano del Garda',
        price: d.uponRequest,
        details: isIt
          ? 'Programma e tariffe 2027 non ancora rilasciati · alternative aperte su Lago di Garda: Coco Beach e JustMe Garda Lake'
          : 'NYE 2027 pricing not yet released · open Lake Garda alternatives: Coco Beach and JustMe Garda Lake',
      },
    ],
    highlights: [
      isIt ? 'Circus Beatclub Brescia: ufficialmente CHIUSO il 31 dicembre 2026' : 'Circus Beatclub Brescia: officially CLOSED on December 31, 2026',
      isIt ? 'Art Club Desenzano: listino 2027 in attesa di annuncio' : 'Art Club Desenzano: NYE 2027 rate card TBA',
      isIt ? 'Alternative aperte confermate: Coco Beach Club (15€–120€) e JustMe Garda Lake' : 'Confirmed open alternatives: Coco Beach Club (€15–€120) & JustMe Garda Lake',
      d.waBook,
    ],
    sourceBasis: isIt
      ? 'Conferma diretta del Circus Beatclub Brescia di chiusura per Capodanno 2027. Zero listini stimati esposti.'
      : 'Direct confirmation from Circus Beatclub Brescia of closure on NYE 2027. Zero estimated prices shown.',
  };
}

interface TbaVenueSpec {
  venueName: string;
  address: string;
  noteIt: string;
  noteEn: string;
}

const TBA_VENUES: Record<string, TbaVenueSpec> = {
  'capodanno-volt-club-milano': {
    venueName: 'Volt Club Milano',
    address: 'Via Molino delle Armi 16, 20123 Milano',
    noteIt: 'Conferma diretta dalla direzione: la programmazione e il listino Capodanno 2027 del Volt Club non sono ancora stati annunciati. Nessuna tariffa stimata esposta prima del rilascio ufficiale.',
    noteEn: 'Direct confirmation from management: Volt Club Milan has not yet announced its NYE 2027 lineup or pricing. Zero estimated prices are shown before the official release.',
  },
  'capodanno-the-beach-milano': {
    venueName: 'The Beach Milano',
    address: 'Via Arcangelo Corelli 62, 20134 Milano',
    noteIt: 'Conferma diretta dalla direzione: prezzi e opzioni Capodanno 2027 di The Beach Milano usciranno a breve. Nessun listino provvisorio esposto in anticipo.',
    noteEn: 'Direct confirmation from management: The Beach Milano NYE 2027 prices and packages will be announced shortly. Zero placeholder rates are listed in advance.',
  },
  'capodanno-oneway-club-milano': {
    venueName: 'Oneway Club Milano',
    address: 'Via Felice Cavallotti 204, 20099 Sesto San Giovanni (MI)',
    noteIt: 'Conferma diretta dalla direzione: il circolo ARCO Oneway Club non ha ancora pubblicato il programma e i prezzi di Capodanno 2027. Ricevi l’avviso al rilascio ufficiale via Concierge.',
    noteEn: 'Direct confirmation from management: Oneway Club (ARCO cultural club) has not yet published its NYE 2027 schedule or rates. Request an alert via Concierge upon release.',
  },
  'capodanno-bergamo-bolgia-osio-sopra': {
    venueName: 'Bolgia Osio Sopra (Bergamo)',
    address: 'Via Vaccarezza 9, 24046 Osio Sopra (BG)',
    noteIt: 'Conferma diretta dalla direzione: il programma e i biglietti di Capodanno 2027 al Bolgia di Osio Sopra usciranno nei primi giorni di dicembre. Alternative già confermate a Bergamo: Bobadilla Club Dalmine (25€–140€).',
    noteEn: 'Direct confirmation from management: Bolgia Osio Sopra (Bergamo) will release its NYE 2027 programme and tickets in early December. Confirmed open alternative in Bergamo: Bobadilla Club Dalmine (€25–€140).',
  },
};

function buildTbaVenue(slug: string, locale: string, d: WaNov22Dict): CapodannoLocalizedEventContent | null {
  const spec = TBA_VENUES[slug];
  if (!spec) return null;
  const isIt = locale === 'it';
  const note = isIt ? spec.noteIt : spec.noteEn;
  return {
    title: isIt
      ? `Capodanno ${spec.venueName} 2027 · Info & Aggiornamenti Ufficiali`
      : `${d.nyePrefix} ${spec.venueName} · Official Programme Updates`,
    subtitle: `${spec.venueName} · ${spec.address} · ${d.tbaStatus}`,
    description: `${note} ${d.waBook}.`,
    musicAndFormat: `${spec.venueName} · ${d.tbaStatus}`,
    dressCode: d.dressElegant,
    priceSummary: isIt
      ? 'Programma e prezzi Capodanno 2027 non ancora annunciati (lista d’attesa Concierge)'
      : 'NYE 2027 programme & pricing not yet announced (Concierge waitlist)',
    tiers: [
      {
        label: isIt ? 'Aggiornamento Listino Capodanno 2027' : 'NYE 2027 Rate Card Update',
        price: d.uponRequest,
        details: note,
      },
    ],
    highlights: [
      `Location: ${spec.venueName} (${spec.address})`,
      d.tbaStatus,
      isIt ? 'Zero tariffe stimate prima del comunicato ufficiale' : 'Zero unverified estimates before official release',
      d.waBook,
    ],
    sourceBasis: note,
  };
}

export function getWaVerifiedNov22Content(
  slug: string,
  locale: string,
): CapodannoLocalizedEventContent | null {
  const d = getDict(locale);
  if (slug === 'capodanno-mood-live-milano') return buildMoodLive(locale, d);
  if (slug === 'capodanno-lago-di-garda-sesto-senso-coco-beach') return buildCocoBeach(locale, d);
  if (slug === 'capodanno-carroponte-sesto-san-giovanni') return buildCarroponte(locale, d);
  if (slug === 'capodanno-mantova-mascara-all-music-vanita') return buildMascara(locale, d);
  if (slug === 'capodanno-brescia-art-club-desenzano-circus-beatclub') return buildCircusClosed(locale, d);
  return buildTbaVenue(slug, locale, d);
}
