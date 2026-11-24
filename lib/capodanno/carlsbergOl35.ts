import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const CARLSBERG_ADDR = 'Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como), 20121 Milano';
const CARLSBERG_MENU_IMG = '/images/events/capodanno-2027-menus/carlsberg-ol-nye-2027-menu-cenone-75.webp';

interface CarlsbergPack {
  nyeTitle: string;
  milano: string;
  dec31: string;
  title: string;
  sub: string;
  desc: string;
  music: string;
  dress: string;
  priceSum: string;
  tierLabel: string;
  tierPrice: string;
  tierDesc: string;
  highlights: [string, string, string, string];
  source: string;
  steps: [string, string, string, string];
  menuTitle: string;
  menuBev: string;
  courseLabels: [string, string, string, string, string];
  dishes: [string, string, string, string, string];
  faqs: [
    [string, string],
    [string, string],
    [string, string],
    [string, string],
  ];
  scheduleHeading: string;
  menusHeading: string;
  conditionsHeading: string;
}

const CORE_IT: CarlsbergPack = {
  nyeTitle: 'Capodanno 2027',
  milano: 'Milano',
  dec31: 'Giovedì 31 Dicembre 2026',
  title: 'Capodanno 2027 Carlsberg Øl Milano · Cena Cantata e DJ Set (75 € Tutto Incluso)',
  sub: `Carlsberg Øl Milano · ${CARLSBERG_ADDR} · 20:30 – 03:00 · Tariffa unica 75 €`,
  desc:
    'Festeggia il 31 dicembre 2026 da Carlsberg Øl Milano nei sotterranei storici con volte in mattoni a vista dei Bastioni di Porta Nuova 9 (zona Porta Nuova / Corso Como, a 350 metri da M2 Moscova e M2/M5 Garibaldi). Il programma ufficiale unisce il Gran Cenone servito al tavolo a 75 € a persona con Cena Cantata dal vivo, vino Montepulciano o Vermentino incluso (1 bottiglia ogni 4 ospiti), acqua, caffè, brindisi di mezzanotte con flûte di prosecco, cotechino con lenticchie e DJ set fino alle 03:00. Prenotazioni ufficiali su WhatsApp +39 351 912 7047.',
  music: 'Cena Cantata dal Vivo durante il Cenone · Countdown di Mezzanotte & DJ Set fino alle 03:00',
  dress: 'Smart Chic / Elegante Casual di San Silvestro',
  priceSum: 'Tariffa unica 75 € a persona · Cenone Servito + Vino (1 ogni 4) + Cena Cantata + DJ Set',
  tierLabel: 'Cenone Servito + Cena Cantata + DJ Set (dalle 20:30)',
  tierPrice: '75 € a persona',
  tierDesc:
    'Menù completo servito al tavolo (antipasto selezione salumi, formaggi con mostarda e gnocco fritto, lasagnetta ragù di cinghiale e funghi porcini, roast beef scottato su letto di carciofi e patate novelle, tortino dal cuore caldo con frutti di bosco), acqua, caffè, 1 bottiglia di vino ogni 4 persone (Montepulciano o Vermentino), cotechino con lenticchie, flûte di prosecco a mezzanotte e DJ set.',
  highlights: [
    'Tariffa unica chiara di 75 € a persona nei Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como)',
    'Vino Montepulciano o Vermentino incluso (1 bottiglia ogni 4 ospiti) insieme ad acqua, caffè e flûte di mezzanotte',
    'Cena Cantata coinvolgente tra le volte storiche in mattoni e impianti spillatura a vista, seguita da DJ set',
    'A pochi passi da Piazza XXV Aprile, Corso Como, M2 Moscova e stazione Porta Garibaldi (M2/M5)',
  ],
  source:
    'Menù e listino ufficiali confermati Carlsberg Øl Milano (Bastioni di Porta Nuova 9, 31 dicembre 2026 ore 20:30–03:00): Cenone servito + Cena Cantata e DJ Set a 75 € a persona con vino 1 bottiglia ogni 4, acqua, caffè, cotechino con lenticchie e prosecco di mezzanotte. Prenotazioni WhatsApp +39 351 912 7047.',
  steps: [
    '20:30 Apertura ingressi nei Bastioni di Porta Nuova 9 e accoglienza ai tavoli riservati',
    '21:00 Inizio Cenone servito di San Silvestro accompagnato dalla Cena Cantata dal vivo',
    '00:00 Countdown di mezzanotte, brindisi con flûte di prosecco e cotechino con lenticchie',
    '00:30 – 03:00 Festa di Capodanno con DJ set tra le sale con volte in mattoni',
  ],
  menuTitle: 'Menù Cenone di Capodanno · Cena Cantata & DJ Set (75 €)',
  menuBev:
    'Inclusi nel prezzo di 75 €: acqua, caffè, 1 bottiglia di vino ogni 4 persone (Montepulciano o Vermentino) e flûte di prosecco per il brindisi di mezzanotte con cotechino e lenticchie.',
  courseLabels: ['Antipasto', 'Primo Piatto', 'Secondo e Contorno', 'Dolce', 'Tradizione di Mezzanotte'],
  dishes: [
    'Selezione di salumi nostrani e formaggi stagionati accompagnati da mostarda artigianale e gnocco fritto caldo',
    'Lasagnetta al forno con ragù di cinghiale e funghi porcini',
    'Roast beef scottato servito su letto di carciofi e patate novelle al forno',
    'Tortino dal cuore caldo al cioccolato servito con salsa ai frutti di bosco',
    'Cotechino tradizionale con lenticchie di buon auspicio e flûte di prosecco per il brindisi',
  ],
  faqs: [
    [
      'Cosa comprende la quota di 75 € da Carlsberg Øl Milano?',
      'La tariffa unica di 75 € a persona comprende il posto riservato tutta la sera, le quattro portate servite al tavolo, acqua, caffè, 1 bottiglia di vino ogni 4 persone (Montepulciano o Vermentino), cotechino con lenticchie e flûte di prosecco a mezzanotte, oltre a Cena Cantata e DJ set.',
    ],
    [
      'Dove si trova Carlsberg Øl Milano e come si arriva?',
      'Il locale si trova in Bastioni di Porta Nuova 9 (angolo Piazza XXV Aprile / Corso Como), raggiungibile a piedi in 5 minuti dalle fermate metro M2 Moscova e M2/M5 Porta Garibaldi, servite tutta la notte dalle linee sostitutive ATM.',
    ],
    [
      'Sono previste variazioni per intolleranze o menù vegetariano?',
      'Segnalando eventuali allergie o esigenze alimentari al momento della prenotazione su WhatsApp +39 351 912 7047, la cucina predispone le opportune alternative sulle singole portate.',
    ],
    [
      'Come si blocca il tavolo per la Cena Cantata di Capodanno?',
      'Scrivi su WhatsApp al Concierge Nightlife Milan +39 351 912 7047 indicando il numero di partecipanti per verificare la disponibilità immediata dei tavoli e ricevere le istruzioni di conferma.',
    ],
  ],
  scheduleHeading: 'Programma Orario Capodanno 2027',
  menusHeading: 'Menù Ufficiale Cenone 75 € (Vino Incluso)',
  conditionsHeading: 'Cosa Include la Formula & Logistica Porta Nuova',
};

const CORE_EN: CarlsbergPack = {
  nyeTitle: 'NYE 2027',
  milano: 'Milan',
  dec31: 'Thursday, December 31, 2026',
  title: 'Carlsberg Øl Milan NYE 2027 · Sing-Along Gala Dinner & DJ Set (€75 All-In)',
  sub: `Carlsberg Øl Milan · ${CARLSBERG_ADDR} · 20:30 – 03:00 · Single €75 Rate`,
  desc:
    'Celebrate December 31, 2026 beneath the historic vaulted brick arches of Carlsberg Øl Milan at Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como district, 5 minutes on foot from M2 Moscova and M2/M5 Porta Garibaldi). The official €75 per person New Year’s Eve package combines a full seated dinner, live Italian sing-along show (Cena Cantata), 1 bottle of Montepulciano or Vermentino wine per 4 guests, water, espresso, midnight prosecco toast with traditional cotechino and lentils, and a DJ set until 03:00. Official reservations via WhatsApp +39 351 912 7047.',
  music: 'Live Italian Sing-Along Dinner Show (Cena Cantata) · Midnight Countdown & DJ Set until 03:00',
  dress: 'Smart Chic / Festive Evening Casual',
  priceSum: 'Single €75 per person rate · Seated Dinner + Wine (1 bottle / 4) + Sing-Along Show + DJ Set',
  tierLabel: 'Seated NYE Dinner + Sing-Along Show + DJ Set (from 20:30)',
  tierPrice: '€75 per person',
  tierDesc:
    'Full seated menu (artisan cured meats, cheeses with mostarda and warm gnocco fritto; wild boar and porcini mushroom lasagnetta; seared roast beef on artichokes with baby potatoes; warm chocolate lava cake with berry coulis), water, coffee, 1 bottle of wine per 4 guests (Montepulciano or Vermentino), midnight prosecco flute with cotechino & lentils, and DJ set.',
  highlights: [
    'All-inclusive €75 per person seated dinner & party at Bastioni di Porta Nuova 9 (Corso Como / Porta Nuova)',
    'Includes 1 bottle of Montepulciano or Vermentino wine every 4 guests, water, coffee, and midnight prosecco',
    'High-energy Cena Cantata sing-along dinner show beneath historic brick vaults followed by a club DJ set',
    'Steps from Piazza XXV Aprile and Corso Como with easy M2 Moscova, M2/M5 Garibaldi, and night bus links',
  ],
  source:
    'Confirmed official Carlsberg Øl Milan NYE 2027 menu & rate card (Bastioni di Porta Nuova 9, Dec 31 2026 20:30–03:00): €75 per person seated dinner with Cena Cantata & DJ set, wine 1 bottle per 4, water, coffee, midnight prosecco and lentils. Official WhatsApp Concierge +39 351 912 7047.',
  steps: [
    '20:30 Doors open at Bastioni di Porta Nuova 9 and seating at your reserved table',
    '21:00 Multi-course New Year’s Eve dinner with live Cena Cantata sing-along entertainment',
    '00:00 Midnight countdown, prosecco flute toast and traditional cotechino with lentils',
    '00:30 – 03:00 New Year’s Eve party and DJ set inside the vaulted halls',
  ],
  menuTitle: 'Official NYE 2027 Dinner Menu · Sing-Along & DJ Set (€75)',
  menuBev:
    'Included in the €75 rate: still/sparkling water, coffee, 1 bottle of Montepulciano red or Vermentino white wine per 4 guests, plus a midnight prosecco flute with cotechino and lentils.',
  courseLabels: ['Starter', 'First Course', 'Main Course', 'Dessert', 'Midnight Tradition'],
  dishes: [
    'Selection of cured meats and aged cheeses served with fruit mostarda and warm gnocco fritto',
    'Oven-baked lasagnetta with wild boar ragù and porcini mushrooms',
    'Seared roast beef over sautéed artichokes with roasted baby potatoes',
    'Warm molten-heart chocolate cake with wild berry sauce',
    'Traditional midnight cotechino with lentils and a prosecco toast flute',
  ],
  faqs: [
    [
      'What does the €75 per person rate include at Carlsberg Øl Milan?',
      'The €75 ticket covers your reserved dinner table, four served courses, water, coffee, 1 bottle of Montepulciano or Vermentino wine every 4 guests, midnight prosecco and lentils, plus the live Cena Cantata show and DJ set until 03:00.',
    ],
    [
      'Where is Carlsberg Øl located in Milan?',
      'Carlsberg Øl sits at Bastioni di Porta Nuova 9 right next to Piazza XXV Aprile and Corso Como, a 5-minute walk from M2 Moscova and M2/M5 Porta Garibaldi stations.',
    ],
    [
      'Can dietary requirements or allergies be accommodated?',
      'Yes. Please mention any food allergies or vegetarian requests when booking on WhatsApp +39 351 912 7047 so the kitchen can confirm tailored course substitutions.',
    ],
    [
      'How do we reserve a table for our group?',
      'Message the Nightlife Milan Concierge on WhatsApp at +39 351 912 7047 with your group size to check live table availability and lock in your reservation.',
    ],
  ],
  scheduleHeading: 'Official NYE 2027 Schedule',
  menusHeading: 'Official €75 NYE Menu (Wine Included)',
  conditionsHeading: 'Package Inclusions & Porta Nuova Logistics',
};

interface TierAMini {
  nyeTitle: string;
  milano: string;
  dec31: string;
  perPerson: string;
  tierLabel: string;
  music: string;
  dress: string;
  bevNote: string;
  locNote: string;
  showNote: string;
  waBook: string;
  sourcePrefix: string;
  scheduleHeading: string;
  menusHeading: string;
  conditionsHeading: string;
  courseLabels: [string, string, string, string, string];
}

const TIER_A_META: Record<'es' | 'fr' | 'de' | 'pt' | 'nl' | 'ru' | 'tr' | 'zh' | 'ar', TierAMini> = {
  es: {
    nyeTitle: 'Nochevieja 2027',
    milano: 'Milán',
    dec31: 'Jueves 31 de diciembre de 2026',
    perPerson: 'por persona',
    tierLabel: 'Cena Servida + Cena Cantada + DJ Set (20:30)',
    music: 'Cena Cantada en vivo · Brindis de medianoche y DJ Set hasta las 03:00',
    dress: 'Smart Chic / Elegante de Nochevieja',
    bevNote: 'Incluye agua, café, 1 botella de vino Montepulciano o Vermentino cada 4 personas, prosecco y lentejas a medianoche.',
    locNote: 'Bastioni di Porta Nuova 9 (Corso Como / Porta Nuova, metro M2 Moscova y Garibaldi)',
    showNote: 'Cena servida completa de 4 platos con Cena Cantada italiana y fiesta DJ set',
    waBook: 'Reservas oficiales por WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Menú y tarifa oficial confirmada 2027',
    scheduleHeading: 'Horario Nochevieja 2027',
    menusHeading: 'Menú Oficial 75 € (Vino Incluido)',
    conditionsHeading: 'Qué Incluye y Acceso Porta Nuova',
    courseLabels: ['Entrante', 'Primer Plato', 'Plato Principal', 'Postre', 'Medianoche'],
  },
  fr: {
    nyeTitle: 'Nouvel An 2027',
    milano: 'Milan',
    dec31: 'Jeudi 31 décembre 2026',
    perPerson: 'par personne',
    tierLabel: 'Dîner Servi + Cena Cantata + DJ Set (20h30)',
    music: 'Dîner chantant live (Cena Cantata) · Compte à rebours et DJ Set jusqu’à 03h00',
    dress: 'Smart Chic / Tenue de soirée',
    bevNote: 'Inclus : eau, café, 1 bouteille de vin Montepulciano ou Vermentino pour 4 convives, coupe de prosecco et lentilles à minuit.',
    locNote: 'Bastioni di Porta Nuova 9 (quartier Corso Como / Porta Nuova, métro M2 Moscova et Garibaldi)',
    showNote: 'Menu servi complet en 4 temps avec ambiance Cena Cantata sous les voûtes en briques et DJ set',
    waBook: 'Réservations officielles sur WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Menu et tarif officiels confirmés 2027',
    scheduleHeading: 'Programme Réveillon 2027',
    menusHeading: 'Menu Officiel 75 € (Vin Inclus)',
    conditionsHeading: 'Prestations Incluses & Accès Porta Nuova',
    courseLabels: ['Entrée', 'Premier Plat', 'Plat Principal', 'Dessert', 'Tradition de Minuit'],
  },
  de: {
    nyeTitle: 'Silvester 2027',
    milano: 'Mailand',
    dec31: 'Donnerstag, 31. Dezember 2026',
    perPerson: 'pro Person',
    tierLabel: 'Serviertes Silvestermenü + Cena Cantata + DJ-Set (20:30)',
    music: 'Italienische Cena Cantata Live-Dinner-Show · Mitternachtstoast & DJ-Set bis 03:00',
    dress: 'Smart Chic / Festliche Abendgarderobe',
    bevNote: 'Inklusive Wasser, Kaffee, 1 Flasche Montepulciano- oder Vermentino-Wein je 4 Gäste, Prosecco-Flûte und Linsen um Mitternacht.',
    locNote: 'Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como, U-Bahn M2 Moscova & Garibaldi)',
    showNote: 'Serviertes 4-Gänge-Silvestermenü unter historischen Backsteingewölben mit Live-Gesang und DJ-Party',
    waBook: 'Offizielle Tischreservierung per WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Offiziell bestätigte Silvesterkarte 2027',
    scheduleHeading: 'Programmablauf Silvester 2027',
    menusHeading: 'Offizielles 75 € Menü (inkl. Wein)',
    conditionsHeading: 'Inklusivleistungen & Anfahrt Porta Nuova',
    courseLabels: ['Vorspeise', 'Erster Gang', 'Hauptgang', 'Dessert', 'Mitternachtstradition'],
  },
  pt: {
    nyeTitle: 'Réveillon 2027',
    milano: 'Milão',
    dec31: 'Quinta-feira, 31 de dezembro de 2026',
    perPerson: 'por pessoa',
    tierLabel: 'Ceia Servida + Cena Cantata + DJ Set (20:30)',
    music: 'Cena Cantata ao vivo · Contagem regressiva e DJ Set até 03:00',
    dress: 'Smart Chic / Esporte Fino de Réveillon',
    bevNote: 'Inclui água, café, 1 garrafa de vinho Montepulciano ou Vermentino a cada 4 pessoas, prosecco e lentilhas à meia-noite.',
    locNote: 'Bastioni di Porta Nuova 9 (Corso Como / Porta Nuova, metrô M2 Moscova e Garibaldi)',
    showNote: 'Ceia servida completa com Cena Cantata italiana e pista com DJ set',
    waBook: 'Reservas oficiais via WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Cardápio e tarifa oficiais confirmados 2027',
    scheduleHeading: 'Programação Réveillon 2027',
    menusHeading: 'Menu Oficial 75 € (Vinho Incluso)',
    conditionsHeading: 'O Que Inclui e Acesso Porta Nuova',
    courseLabels: ['Entrada', 'Primeiro Prato', 'Prato Principal', 'Sobremesa', 'Meia-Noite'],
  },
  nl: {
    nyeTitle: 'Oud & Nieuw 2027',
    milano: 'Milaan',
    dec31: 'Donderdag 31 december 2026',
    perPerson: 'per persoon',
    tierLabel: 'Uitgeserveerd Diner + Cena Cantata + DJ-Set (20:30)',
    music: 'Live Cena Cantata dinershow · Aftellen om middernacht & DJ-set tot 03:00',
    dress: 'Smart Chic / Feestelijke Avondkleding',
    bevNote: 'Inclusief water, koffie, 1 fles Montepulciano- of Vermentino-wijn per 4 gasten, prosecco en linzen om middernacht.',
    locNote: 'Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como, metro M2 Moscova & Garibaldi)',
    showNote: 'Compleet 4-gangendiner onder historische bakstenen gewelven met live meezingers en DJ-set',
    waBook: 'Officiële reservering via WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Officieel bevestigd menu en tarief 2027',
    scheduleHeading: 'Programma Oud & Nieuw 2027',
    menusHeading: 'Officieel 75 € Menu (Wijn Inbegrepen)',
    conditionsHeading: 'Inbegrepen & Bereikbaarheid Porta Nuova',
    courseLabels: ['Voorgerecht', 'Tussengerecht', 'Hoofdgerecht', 'Dessert', 'Middernacht'],
  },
  ru: {
    nyeTitle: 'Новый год 2027',
    milano: 'Милан',
    dec31: 'Четверг, 31 декабря 2026',
    perPerson: 'за персону',
    tierLabel: 'Новогодний ужин + Cena Cantata + DJ-сет (20:30)',
    music: 'Музыкальный ужин Cena Cantata · Полуночный тост и DJ-сет до 03:00',
    dress: 'Smart Chic / Вечерний коктейльный стиль',
    bevNote: 'Включены вода, кофе, 1 бутылка вина Montepulciano или Vermentino на 4 гостей, просекко и чечевица в полночь.',
    locNote: 'Bastioni di Porta Nuova 9 (квартал Porta Nuova / Corso Como, метро M2 Moscova и Garibaldi)',
    showNote: 'Полный сервированный ужин из 4 подач под кирпичными сводами с живой программой и DJ-сетом',
    waBook: 'Официальное бронирование в WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Официально подтверждённое меню и тариф 2027',
    scheduleHeading: 'Расписание Нового года 2027',
    menusHeading: 'Официальное меню 75 € (вино включено)',
    conditionsHeading: 'Что включено и логистика Porta Nuova',
    courseLabels: ['Закуска', 'Первое блюдо', 'Горячее блюдо', 'Десерт', 'Полночь'],
  },
  tr: {
    nyeTitle: 'Yılbaşı 2027',
    milano: 'Milano',
    dec31: '31 Aralık 2026 Perşembe',
    perPerson: 'kişi başı',
    tierLabel: 'Servisli Yılbaşı Yemeği + Cena Cantata + DJ Set (20:30)',
    music: 'Canlı Cena Cantata müzikli yemek · Gece yarısı kutlaması ve 03:00’e kadar DJ Set',
    dress: 'Smart Chic / Şık Yılbaşı Kıyafeti',
    bevNote: 'Su, kahve, her 4 kişiye 1 şişe Montepulciano veya Vermentino şarap, gece yarısı prosecco kadehi ve mercimek dahildir.',
    locNote: 'Bastioni di Porta Nuova 9 (Porta Nuova / Corso Como, M2 Moscova ve Garibaldi metrosu)',
    showNote: 'Tarihi tuğla tonozlar altında 4 servisli yılbaşı menüsü, canlı İtalyan şarkıları ve DJ performansı',
    waBook: 'WhatsApp +39 351 912 7047 üzerinden resmî rezervasyon.',
    sourcePrefix: 'Onaylı resmî 2027 yılbaşı menüsü ve fiyatı',
    scheduleHeading: 'Yılbaşı 2027 Program Akışı',
    menusHeading: 'Resmî 75 € Menü (Şarap Dahil)',
    conditionsHeading: 'Pakete Dahil Olanlar ve Ulaşım',
    courseLabels: ['Başlangıç', 'Birinci Tabak', 'Ana Yemek', 'Tatlı', 'Gece Yarısı Geleneği'],
  },
  zh: {
    nyeTitle: '2027 跨年夜',
    milano: '米兰',
    dec31: '2026年12月31日 星期四',
    perPerson: '每位',
    tierLabel: '四道式跨年晚宴 + Cena Cantata 欢唱秀 + DJ 派对 (20:30)',
    music: '意式 Cena Cantata 现场音乐晚宴 · 午夜倒数举杯与 DJ 派对至 03:00',
    dress: 'Smart Chic / 时尚优雅晚装',
    bevNote: '含饮用水、咖啡、每4人1瓶 Montepulciano 红酒或 Vermentino 白酒，以及午夜起泡酒与传统扁豆香肠。',
    locNote: 'Bastioni di Porta Nuova 9（Porta Nuova / Corso Como 核心区，地铁 M2 Moscova 与 Garibaldi）',
    showNote: '历史红砖拱顶餐厅四道式位上晚宴，融合意式合唱互动与跨年 DJ 舞池',
    waBook: '官方预订请联系 WhatsApp +39 351 912 7047。',
    sourcePrefix: '2027 官方确认跨年菜单与票价',
    scheduleHeading: '2027 跨年夜活动流程',
    menusHeading: '官方 75 € 跨年菜单（含葡萄酒）',
    conditionsHeading: '费用包含与 Porta Nuova 交通指南',
    courseLabels: ['前菜', '第一道主食', '主菜', '甜点', '午夜传统'],
  },
  ar: {
    nyeTitle: 'رأس السنة 2027',
    milano: 'ميلانو',
    dec31: 'الخميس 31 ديسمبر 2026',
    perPerson: 'للشخص',
    tierLabel: 'عشاء رأس السنة + عرض Cena Cantata + دي جي (20:30)',
    music: 'عشاء غنائي إيطالي حي Cena Cantata · عد تنازلي ودي جي حتى 03:00',
    dress: 'Smart Chic / إطلالة سهرة أنيقة',
    bevNote: 'يشمل الماء والقهوة وزجاجة نبيذ Montepulciano أو Vermentino لكل 4 ضيوف وكأس بروسيكو وعدس تقليدي عند منتصف الليل.',
    locNote: 'Bastioni di Porta Nuova 9 (حي Porta Nuova / Corso Como قرب مترو M2 Moscova وGaribaldi)',
    showNote: 'قائمة عشاء كاملة من 4 أطباق تحت الأقبية التاريخية مع عرض غنائي حي وحفل دي جي',
    waBook: 'الحجز الرسمي عبر واتساب +39 351 912 7047.',
    sourcePrefix: 'القائمة والسعر الرسمي المؤكد لعام 2027',
    scheduleHeading: 'برنامج ليلة رأس السنة 2027',
    menusHeading: 'القائمة الرسمية 75 € (شاملة النبيذ)',
    conditionsHeading: 'المزايا المشمولة والموقع في Porta Nuova',
    courseLabels: ['المقبلات', 'الطبق الأول', 'الطبق الرئيسي', 'التحلية', 'تقليد منتصف الليل'],
  },
};

const EU_SEEDS: Record<
  Exclude<LocaleCode, 'en' | 'it' | 'es' | 'fr' | 'de' | 'pt' | 'nl' | 'ru' | 'tr' | 'zh' | 'ar'>,
  [string, string, string, string, string, string, string, string]
> = {
  bg: ['Нова година 2027', 'Милано', 'на човек', 'Официално меню и цена 2027', 'Официална резервация в WhatsApp: +39 351 912 7047.', 'Програма 2027', 'Официално меню 75 €', 'Включено и локация'],
  hr: ['Doček Nove godine 2027', 'Milano', 'po osobi', 'Službeni jelovnik i cijena za 2027', 'Službena rezervacija putem WhatsAppa: +39 351 912 7047.', 'Raspored 2027', 'Službeni meni 75 €', 'Uključeno i lokacija'],
  cs: ['Silvestr 2027', 'Milán', 'za osobu', 'Potvrzené oficiální menu a cena 2027', 'Oficiální rezervace přes WhatsApp: +39 351 912 7047.', 'Harmonogram 2027', 'Oficiální menu 75 €', 'Co je v ceně a doprava'],
  da: ['Nytår 2027', 'Milano', 'pr. person', 'Officielt bekræftet 2027-menu og pris', 'Officiel booking via WhatsApp: +39 351 912 7047.', 'Program 2027', 'Officiel 75 € menu', 'Inkluderet & transport'],
  et: ['Aastavahetus 2027', 'Milano', 'inimese kohta', 'Kinnitatud ametlik 2027 menüü ja hind', 'Ametlik broneering WhatsAppis: +39 351 912 7047.', 'Ajakava 2027', 'Ametlik 75 € menüü', 'Hinnas ja asukoht'],
  fi: ['Uusivuosi 2027', 'Milano', 'per henkilö', 'Vahvistettu virallinen 2027 menu ja hinta', 'Virallinen varaus WhatsAppissa: +39 351 912 7047.', 'Aikataulu 2027', 'Virallinen 75 € menu', 'Hintaan sisältyy & sijainti'],
  el: ['Πρωτοχρονιά 2027', 'Μιλάνο', 'ανά άτομο', 'Επίσημο επιβεβαιωμένο μενού & τιμή 2027', 'Επίσημη κράτηση μέσω WhatsApp: +39 351 912 7047.', 'Πρόγραμμα 2027', 'Επίσημο Μενού 75 €', 'Παροχές & Πρόσβαση'],
  hu: ['Szilveszter 2027', 'Milánó', 'fő', 'Hivatalosan megerősített 2027-es menü és ár', 'Hivatalos foglalás WhatsAppon: +39 351 912 7047.', 'Programterv 2027', 'Hivatalos 75 € menü', 'Tartalom és megközelítés'],
  ga: ['Oíche Chinn Bliana 2027', 'Milano', 'an duine', 'Biachlár agus praghas oifigiúil 2027', 'Áirithint oifigiúil trí WhatsApp: +39 351 912 7047.', 'Clár Oifigiúil 2027', 'Biachlár Oifigiúil 75 €', 'San Áireamh & Suíomh'],
  lv: ['Jaungads 2027', 'Milāna', 'par personu', 'Apstiprinātā oficiālā 2027 ēdienkarte un cena', 'Oficiālā rezervācija WhatsApp: +39 351 912 7047.', 'Programma 2027', 'Oficiālā 75 € ēdienkarte', 'Cenā iekļauts un atrašanās vieta'],
  lt: ['Naujieji metai 2027', 'Milanas', 'asmeniui', 'Patvirtintas oficialus 2027 meniu ir kaina', 'Oficiali rezervacija per WhatsApp: +39 351 912 7047.', 'Programa 2027', 'Oficialus 75 € meniu', 'Įskaičiuota ir vieta'],
  mt: ['Ewwel tas-Sena 2027', 'Milan', 'għal kull persuna', 'Menu u prezz uffiċjali kkonfermati 2027', 'Riżervazzjoni uffiċjali fuq WhatsApp: +39 351 912 7047.', 'Skeda Uffiċjali 2027', 'Menu Uffiċjali 75 €', 'Inkluż u Post'],
  pl: ['Sylwester 2027', 'Mediolan', 'za osobę', 'Oficjalnie potwierdzone menu i cena 2027', 'Oficjalna rezerwacja przez WhatsApp: +39 351 912 7047.', 'Harmonogram 2027', 'Oficjalne menu 75 €', 'W cenie i dojazd'],
  ro: ['Revelion 2027', 'Milano', 'de persoană', 'Meniu și tarif oficial confirmate 2027', 'Rezervare oficială pe WhatsApp: +39 351 912 7047.', 'Program oficial 2027', 'Meniu oficial 75 €', 'Ce include și acces'],
  sk: ['Silvester 2027', 'Miláno', 'na osobu', 'Oficiálne potvrdené menu a cena 2027', 'Oficiálna rezervácia cez WhatsApp: +39 351 912 7047.', 'Program 2027', 'Oficiálne menu 75 €', 'V cene a poloha'],
  sl: ['Silvestrovo 2027', 'Milano', 'na osebo', 'Uradno potrjen meni in cena 2027', 'Uradna rezervacija prek WhatsAppa: +39 351 912 7047.', 'Urnik 2027', 'Uradni meni 75 €', 'Vključeno in lokacija'],
  sv: ['Nyår 2027', 'Milano', 'per person', 'Officiellt bekräftad 2027-meny och pris', 'Officiell bokning via WhatsApp: +39 351 912 7047.', 'Schema 2027', 'Officiell 75 € meny', 'Ingår & läge'],
  no: ['Nyttårsaften 2027', 'Milano', 'per person', 'Offisielt bekreftet 2027-meny og pris', 'Offisiell bestilling via WhatsApp: +39 351 912 7047.', 'Tidsplan 2027', 'Offisiell 75 € meny', 'Inkludert & beliggenhet'],
  is: ['Áramót 2027', 'Mílanó', 'á mann', 'Staðfestur opinber 2027 matseðill og verð', 'Opinber bókun á WhatsApp: +39 351 912 7047.', 'Dagskrá 2027', 'Opinber 75 € matseðill', 'Innifalið & staðsetning'],
  uk: ['Новий рік 2027', 'Мілан', 'з особи', 'Офіційно підтверджене меню та тариф 2027', 'Офіційне бронювання у WhatsApp: +39 351 912 7047.', 'Розклад 2027', 'Офіційне меню 75 €', 'Що входить і локація'],
  sq: ['Viti i Ri 2027', 'Milano', 'për person', 'Menuja dhe çmimi zyrtar i konfirmuar 2027', 'Rezervim zyrtar në WhatsApp: +39 351 912 7047.', 'Programi zyrtar 2027', 'Menuja zyrtare 75 €', 'Përfshirjet & vendndodhja'],
  sr: ['Doček Nove godine 2027', 'Milano', 'po osobi', 'Zvanično potvrđen meni i cena za 2027', 'Zvanična rezervacija putem WhatsAppa: +39 351 912 7047.', 'Raspored 2027', 'Zvanični meni 75 €', 'Uključeno i lokacija'],
  bs: ['Doček Nove godine 2027', 'Milano', 'po osobi', 'Zvanično potvrđen meni i cijena 2027', 'Zvanična rezervacija putem WhatsAppa: +39 351 912 7047.', 'Raspored 2027', 'Zvanični jelovnik 75 €', 'Uključeno i lokacija'],
  mk: ['Нова година 2027', 'Милано', 'по лице', 'Официјално потврдено мени и цена 2027', 'Официјална резервација на WhatsApp: +39 351 912 7047.', 'Програма 2027', 'Официјално мени 75 €', 'Вклучено и локација'],
};

function buildFromMini(m: TierAMini): CarlsbergPack {
  return {
    ...CORE_EN,
    nyeTitle: m.nyeTitle,
    milano: m.milano,
    dec31: m.dec31,
    title: `${m.nyeTitle} Carlsberg Øl ${m.milano} · Cena Cantata & DJ Set (75 €)`,
    sub: `Carlsberg Øl ${m.milano} · ${CARLSBERG_ADDR} · 20:30 – 03:00 · 75 €`,
    desc: `${m.sourcePrefix} · Carlsberg Øl ${m.milano} (${CARLSBERG_ADDR}): 75 € ${m.perPerson}. ${m.showNote}. ${m.bevNote} ${m.waBook}`,
    music: m.music,
    dress: m.dress,
    priceSum: `75 € ${m.perPerson} · Cena Cantata + DJ Set + Montepulciano / Vermentino (1/4)`,
    tierLabel: m.tierLabel,
    tierPrice: `75 € ${m.perPerson}`,
    tierDesc: `${m.showNote}. ${m.bevNote}`,
    highlights: [
      `75 € ${m.perPerson} · ${m.locNote}`,
      m.bevNote,
      m.showNote,
      m.waBook,
    ],
    source: `${m.sourcePrefix} · Carlsberg Øl ${m.milano} (75 €, 20:30–03:00). ${m.waBook}`,
    menuTitle: `${m.nyeTitle} · Carlsberg Øl ${m.milano} (75 €)`,
    menuBev: m.bevNote,
    courseLabels: m.courseLabels,
    scheduleHeading: m.scheduleHeading,
    menusHeading: m.menusHeading,
    conditionsHeading: m.conditionsHeading,
  };
}

function getPack(locale: string): CarlsbergPack {
  if (locale === 'it') return CORE_IT;
  if (locale === 'en') return CORE_EN;
  const code = locale as Exclude<LocaleCode, 'en' | 'it'>;
  if (code in TIER_A_META) {
    return buildFromMini(TIER_A_META[code as keyof typeof TIER_A_META]);
  }
  const eu = EU_SEEDS[code as keyof typeof EU_SEEDS];
  if (eu) {
    const [nyeTitle, milano, perPerson, sourcePrefix, waBook, schedH, menuH, condH] = eu;
    return buildFromMini({
      nyeTitle,
      milano,
      dec31: '31/12/2026',
      perPerson,
      tierLabel: `20:30 Cena Cantata + DJ Set (${milano})`,
      music: CORE_EN.music,
      dress: CORE_EN.dress,
      bevNote: CORE_EN.menuBev,
      locNote: CARLSBERG_ADDR,
      showNote: '4-course NYE Dinner + Cena Cantata + DJ Set (20:30–03:00)',
      waBook,
      sourcePrefix,
      scheduleHeading: schedH,
      menusHeading: menuH,
      conditionsHeading: condH,
      courseLabels: CORE_EN.courseLabels,
    });
  }
  return CORE_EN;
}

export function getCarlsbergOlNyeContent(locale: string): CapodannoLocalizedEventContent {
  const p = getPack(locale);
  const tiers: CapodannoEventTier[] = [
    { label: p.tierLabel, price: p.tierPrice, details: p.tierDesc },
  ];
  const schedule: CapodannoScheduleStep[] = ['20:30', '21:00', '00:00', '00:30 – 03:00'].map((time, idx) => ({
    time,
    label: p.steps[idx].replace(/^\d{2}[:h]\d{2}(?:\s*[–-]\s*\d{2}[:h]\d{2})?\s*/, ''),
  }));
  const menus: CapodannoMenuCard[] = [
    {
      id: 'carlsberg-ol-cenone-75',
      title: p.menuTitle,
      price: p.tierPrice,
      subtitle: `${CARLSBERG_ADDR} · ${p.dec31}`,
      courses: p.courseLabels.map((course, idx) => ({ course, dish: p.dishes[idx] })),
      beverages: p.menuBev,
      imageSrc: CARLSBERG_MENU_IMG,
      imageAlt: p.menuTitle,
    },
  ];
  return {
    title: p.title,
    subtitle: p.sub,
    description: p.desc,
    musicAndFormat: p.music,
    dressCode: p.dress,
    priceSummary: p.priceSum,
    tiers,
    highlights: p.highlights,
    sourceBasis: p.source,
    scheduleHeading: p.scheduleHeading,
    schedule,
    menusHeading: p.menusHeading,
    menus,
    conditionsHeading: p.conditionsHeading,
    conditions: p.highlights,
    offerPricesEur: [75],
    customFaqs: p.faqs.map(([q, a]) => ({ q, a })),
  };
}
