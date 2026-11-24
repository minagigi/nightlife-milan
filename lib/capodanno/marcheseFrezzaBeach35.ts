import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const MARCHESE_ADDR = 'Via dei Bossi 3 (Piazza della Scala / Duomo / Brera), 20121 Milano';
const MARCHESE_MENU_IMG = '/images/events/capodanno-2027-menus/il-marchese-nye-2027-menu-cenone-150.webp';

const FREZZA_ADDR = 'Via Giuseppe Sirtori 34 (Porta Venezia), 20129 Milano';
const FREZZA_MENU_IMG = '/images/events/capodanno-2027-menus/frezza-milano-nye-2027-menu-cenone-130.webp';

const BEACH_ADDR = 'Via Circonvallazione Idroscalo 51, 20054 Segrate (Milano Idroscalo)';
const BEACH_MENU_IMG = '/images/events/capodanno-2027-menus/beach-garden-nye-2027-menu-buffet-65.webp';

interface LocaleMetaSeed {
  nye: string;
  city: string;
  dec31: string;
  perPerson: string;
  perTable: string;
  waBook: string;
  sourcePrefix: string;
  schedH: string;
  menuH: string;
  condH: string;
  courses5: [string, string, string, string, string];
}

const META_SEEDS: Record<Exclude<LocaleCode, 'it' | 'en'>, LocaleMetaSeed> = {
  es: {
    nye: 'Nochevieja 2027',
    city: 'Milán',
    dec31: 'Jueves 31 de diciembre de 2026',
    perPerson: 'por persona',
    perTable: 'por mesa',
    waBook: 'Reservas oficiales por WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Programa y menú oficial confirmado 2027',
    schedH: 'Horario Nochevieja 2027',
    menuH: 'Menú Oficial Nochevieja 2027',
    condH: 'Qué Incluye y Cómo Llegar',
    courses5: ['Bienvenida / Aperitivo', 'Entrantes', 'Primer Plato', 'Plato Principal', 'Postre y Medianoche'],
  },
  fr: {
    nye: 'Nouvel An 2027',
    city: 'Milan',
    dec31: 'Jeudi 31 décembre 2026',
    perPerson: 'par personne',
    perTable: 'par table',
    waBook: 'Réservations officielles sur WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Programme et menu officiels confirmés 2027',
    schedH: 'Programme Réveillon 2027',
    menuH: 'Menu Officiel Réveillon 2027',
    condH: 'Prestations Incluses & Accès',
    courses5: ['Accueil / Apéritif', 'Entrées', 'Premier Plat', 'Plat Principal', 'Dessert & Minuit'],
  },
  de: {
    nye: 'Silvester 2027',
    city: 'Mailand',
    dec31: 'Donnerstag, 31. Dezember 2026',
    perPerson: 'pro Person',
    perTable: 'pro Tisch',
    waBook: 'Offizielle Tischreservierung per WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Offiziell bestätigtes Silvesterprogramm 2027',
    schedH: 'Programmablauf Silvester 2027',
    menuH: 'Offizielles Silvestermenü 2027',
    condH: 'Inklusivleistungen & Anfahrt',
    courses5: ['Empfang', 'Vorspeisen', 'Erster Gang', 'Hauptgang', 'Dessert & Mitternacht'],
  },
  pt: {
    nye: 'Réveillon 2027',
    city: 'Milão',
    dec31: 'Quinta-feira, 31 de dezembro de 2026',
    perPerson: 'por pessoa',
    perTable: 'por mesa',
    waBook: 'Reservas oficiais via WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Cardápio e tarifas oficiais confirmados 2027',
    schedH: 'Programação Réveillon 2027',
    menuH: 'Menu Oficial Réveillon 2027',
    condH: 'O Que Inclui e Localização',
    courses5: ['Boas-vindas', 'Entradas', 'Primeiro Prato', 'Prato Principal', 'Sobremesa e Meia-Noite'],
  },
  nl: {
    nye: 'Oud & Nieuw 2027',
    city: 'Milaan',
    dec31: 'Donderdag 31 december 2026',
    perPerson: 'per persoon',
    perTable: 'per tafel',
    waBook: 'Officiële reservering via WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Officieel bevestigd programma en menu 2027',
    schedH: 'Programma Oud & Nieuw 2027',
    menuH: 'Officieel Menu 2027',
    condH: 'Inbegrepen & Bereikbaarheid',
    courses5: ['Welkom', 'Voorgerechten', 'Tussengerecht', 'Hoofdgerecht', 'Dessert & Middernacht'],
  },
  ru: {
    nye: 'Новый год 2027',
    city: 'Милан',
    dec31: 'Четверг, 31 декабря 2026',
    perPerson: 'за персону',
    perTable: 'за стол',
    waBook: 'Официальное бронирование в WhatsApp +39 351 912 7047.',
    sourcePrefix: 'Официально подтверждённое меню и тарифы 2027',
    schedH: 'Расписание Нового года 2027',
    menuH: 'Официальное меню 2027',
    condH: 'Что включено и адрес',
    courses5: ['Приветствие', 'Закуски', 'Первое блюдо', 'Горячее блюдо', 'Десерт и полночь'],
  },
  tr: {
    nye: 'Yılbaşı 2027',
    city: 'Milano',
    dec31: '31 Aralık 2026 Perşembe',
    perPerson: 'kişi başı',
    perTable: 'masa başı',
    waBook: 'WhatsApp +39 351 912 7047 üzerinden resmî rezervasyon.',
    sourcePrefix: 'Onaylı resmî 2027 yılbaşı menüsü ve fiyatları',
    schedH: 'Yılbaşı 2027 Program Akışı',
    menuH: 'Resmî Yılbaşı Menüsü 2027',
    condH: 'Pakete Dahil Olanlar ve Ulaşım',
    courses5: ['Karşılama', 'Başlangıçlar', 'Birinci Tabak', 'Ana Yemek', 'Tatlı ve Gece Yarısı'],
  },
  zh: {
    nye: '2027 跨年夜',
    city: '米兰',
    dec31: '2026年12月31日 星期四',
    perPerson: '每位',
    perTable: '每桌',
    waBook: '官方预订请联系 WhatsApp +39 351 912 7047。',
    sourcePrefix: '2027 官方确认跨年菜单与票价',
    schedH: '2027 跨年夜活动流程',
    menuH: '2027 官方跨年菜单',
    condH: '费用包含与交通指南',
    courses5: ['迎宾气泡酒', '精致前菜', '第一道主食', '主菜', '甜点与午夜传统'],
  },
  ar: {
    nye: 'رأس السنة 2027',
    city: 'ميلانو',
    dec31: 'الخميس 31 ديسمبر 2026',
    perPerson: 'للشخص',
    perTable: 'للطاولة',
    waBook: 'الحجز الرسمي عبر واتساب +39 351 912 7047.',
    sourcePrefix: 'القائمة والأسعار الرسمية المؤكدة لعام 2027',
    schedH: 'برنامج ليلة رأس السنة 2027',
    menuH: 'قائمة العشاء الرسمية 2027',
    condH: 'المزايا المشمولة والموقع',
    courses5: ['الترحيب', 'المقبلات', 'الطبق الأول', 'الطبق الرئيسي', 'التحلية ومنتصف الليل'],
  },
  bg: { nye: 'Нова година 2027', city: 'Милано', dec31: '31.12.2026', perPerson: 'на човек', perTable: 'на маса', waBook: 'Официална резервация в WhatsApp: +39 351 912 7047.', sourcePrefix: 'Официално меню и цени 2027', schedH: 'Програма 2027', menuH: 'Официално меню 2027', condH: 'Включено и локация', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  hr: { nye: 'Doček Nove godine 2027', city: 'Milano', dec31: '31.12.2026.', perPerson: 'po osobi', perTable: 'po stolu', waBook: 'Službena rezervacija putem WhatsAppa: +39 351 912 7047.', sourcePrefix: 'Službeni jelovnik i cijene 2027', schedH: 'Raspored 2027', menuH: 'Službeni meni 2027', condH: 'Uključeno i lokacija', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  cs: { nye: 'Silvestr 2027', city: 'Milán', dec31: '31. 12. 2026', perPerson: 'za osobu', perTable: 'za stůl', waBook: 'Oficiální rezervace přes WhatsApp: +39 351 912 7047.', sourcePrefix: 'Potvrzené oficiální menu a ceny 2027', schedH: 'Harmonogram 2027', menuH: 'Oficiální menu 2027', condH: 'Co je v ceně a doprava', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  da: { nye: 'Nytår 2027', city: 'Milano', dec31: '31/12/2026', perPerson: 'pr. person', perTable: 'pr. bord', waBook: 'Officiel booking via WhatsApp: +39 351 912 7047.', sourcePrefix: 'Officielt bekræftet 2027-menu og pris', schedH: 'Program 2027', menuH: 'Officiel 2027-menu', condH: 'Inkluderet & transport', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  et: { nye: 'Aastavahetus 2027', city: 'Milano', dec31: '31.12.2026', perPerson: 'inimese kohta', perTable: 'laua kohta', waBook: 'Ametlik broneering WhatsAppis: +39 351 912 7047.', sourcePrefix: 'Kinnitatud ametlik 2027 menüü ja hind', schedH: 'Ajakava 2027', menuH: 'Ametlik 2027 menüü', condH: 'Hinnas ja asukoht', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  fi: { nye: 'Uusivuosi 2027', city: 'Milano', dec31: '31.12.2026', perPerson: 'per henkilö', perTable: 'per pöytä', waBook: 'Virallinen varaus WhatsAppissa: +39 351 912 7047.', sourcePrefix: 'Vahvistettu virallinen 2027 menu ja hinnat', schedH: 'Aikataulu 2027', menuH: 'Virallinen 2027 menu', condH: 'Hintaan sisältyy & sijainti', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  el: { nye: 'Πρωτοχρονιά 2027', city: 'Μιλάνο', dec31: '31/12/2026', perPerson: 'ανά άτομο', perTable: 'ανά τραπέζι', waBook: 'Επίσημη κράτηση μέσω WhatsApp: +39 351 912 7047.', sourcePrefix: 'Επίσημο επιβεβαιωμένο μενού & τιμές 2027', schedH: 'Πρόγραμμα 2027', menuH: 'Επίσημο Μενού 2027', condH: 'Παροχές & Πρόσβαση', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  hu: { nye: 'Szilveszter 2027', city: 'Milánó', dec31: '2026. 12. 31.', perPerson: 'fő', perTable: 'asztal', waBook: 'Hivatalos foglalás WhatsAppon: +39 351 912 7047.', sourcePrefix: 'Hivatalosan megerősített 2027-es menü és árak', schedH: 'Programterv 2027', menuH: 'Hivatalos 2027-es menü', condH: 'Tartalom és megközelítés', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  ga: { nye: 'Oíche Chinn Bliana 2027', city: 'Milano', dec31: '31/12/2026', perPerson: 'an duine', perTable: 'in aghaidh an bhoird', waBook: 'Áirithint oifigiúil trí WhatsApp: +39 351 912 7047.', sourcePrefix: 'Biachlár agus praghsanna oifigiúla 2027', schedH: 'Clár Oifigiúil 2027', menuH: 'Biachlár Oifigiúil 2027', condH: 'San Áireamh & Suíomh', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  lv: { nye: 'Jaungads 2027', city: 'Milāna', dec31: '31.12.2026.', perPerson: 'par personu', perTable: 'par galdiņu', waBook: 'Oficiālā rezervācija WhatsApp: +39 351 912 7047.', sourcePrefix: 'Apstiprinātā oficiālā 2027 ēdienkarte un cenas', schedH: 'Programma 2027', menuH: 'Oficiālā 2027 ēdienkarte', condH: 'Cenā iekļauts un atrašanās vieta', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  lt: { nye: 'Naujieji metai 2027', city: 'Milanas', dec31: '2026-12-31', perPerson: 'asmeniui', perTable: 'staliukui', waBook: 'Oficiali rezervacija per WhatsApp: +39 351 912 7047.', sourcePrefix: 'Patvirtintas oficialus 2027 meniu ir kainos', schedH: 'Programa 2027', menuH: 'Oficialus 2027 meniu', condH: 'Įskaičiuota ir vieta', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  mt: { nye: 'Ewwel tas-Sena 2027', city: 'Milan', dec31: '31/12/2026', perPerson: 'għal kull persuna', perTable: 'għal kull mejda', waBook: 'Riżervazzjoni uffiċjali fuq WhatsApp: +39 351 912 7047.', sourcePrefix: 'Menu u prezzijiet uffiċjali kkonfermati 2027', schedH: 'Skeda Uffiċjali 2027', menuH: 'Menu Uffiċjali 2027', condH: 'Inkluż u Post', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  pl: { nye: 'Sylwester 2027', city: 'Mediolan', dec31: '31.12.2026', perPerson: 'za osobę', perTable: 'za stolik', waBook: 'Oficjalna rezerwacja przez WhatsApp: +39 351 912 7047.', sourcePrefix: 'Oficjalnie potwierdzone menu i ceny 2027', schedH: 'Harmonogram 2027', menuH: 'Oficjalne menu 2027', condH: 'W cenie i dojazd', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  ro: { nye: 'Revelion 2027', city: 'Milano', dec31: '31.12.2026', perPerson: 'de persoană', perTable: 'pe masă', waBook: 'Rezervare oficială pe WhatsApp: +39 351 912 7047.', sourcePrefix: 'Meniu și tarife oficiale confirmate 2027', schedH: 'Program oficial 2027', menuH: 'Meniu oficial 2027', condH: 'Ce include și acces', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  sk: { nye: 'Silvester 2027', city: 'Miláno', dec31: '31. 12. 2026', perPerson: 'na osobu', perTable: 'za stôl', waBook: 'Oficiálna rezervácia cez WhatsApp: +39 351 912 7047.', sourcePrefix: 'Oficiálne potvrdené menu a ceny 2027', schedH: 'Program 2027', menuH: 'Oficiálne menu 2027', condH: 'V cene a poloha', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  sl: { nye: 'Silvestrovo 2027', city: 'Milano', dec31: '31. 12. 2026', perPerson: 'na osebo', perTable: 'na mizo', waBook: 'Uradna rezervacija prek WhatsAppa: +39 351 912 7047.', sourcePrefix: 'Uradno potrjen meni in cene 2027', schedH: 'Urnik 2027', menuH: 'Uradni meni 2027', condH: 'Vključeno in lokacija', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  sv: { nye: 'Nyår 2027', city: 'Milano', dec31: '31/12 2026', perPerson: 'per person', perTable: 'per bord', waBook: 'Officiell bokning via WhatsApp: +39 351 912 7047.', sourcePrefix: 'Officiellt bekräftad 2027-meny och priser', schedH: 'Schema 2027', menuH: 'Officiell 2027-meny', condH: 'Ingår & läge', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  no: { nye: 'Nyttårsaften 2027', city: 'Milano', dec31: '31.12.2026', perPerson: 'per person', perTable: 'per bord', waBook: 'Offisiell bestilling via WhatsApp: +39 351 912 7047.', sourcePrefix: 'Offisielt bekreftet 2027-meny og priser', schedH: 'Tidsplan 2027', menuH: 'Offisiell 2027-meny', condH: 'Inkludert & beliggenhet', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  is: { nye: 'Áramót 2027', city: 'Mílanó', dec31: '31.12.2026', perPerson: 'á mann', perTable: 'á borð', waBook: 'Opinber bókun á WhatsApp: +39 351 912 7047.', sourcePrefix: 'Staðfestur opinber 2027 matseðill og verð', schedH: 'Dagskrá 2027', menuH: 'Opinber 2027 matseðill', condH: 'Innifalið & staðsetning', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  uk: { nye: 'Новий рік 2027', city: 'Мілан', dec31: '31.12.2026', perPerson: 'з особи', perTable: 'за стіл', waBook: 'Офіційне бронювання у WhatsApp: +39 351 912 7047.', sourcePrefix: 'Офіційно підтверджене меню та тарифи 2027', schedH: 'Розклад 2027', menuH: 'Офіційне меню 2027', condH: 'Що входить і локація', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  sq: { nye: 'Viti i Ri 2027', city: 'Milano', dec31: '31/12/2026', perPerson: 'për person', perTable: 'për tavolinë', waBook: 'Rezervim zyrtar në WhatsApp: +39 351 912 7047.', sourcePrefix: 'Menuja dhe çmimet zyrtare të konfirmuara 2027', schedH: 'Programi zyrtar 2027', menuH: 'Menuja zyrtare 2027', condH: 'Përfshirjet & vendndodhja', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  sr: { nye: 'Doček Nove godine 2027', city: 'Milano', dec31: '31.12.2026.', perPerson: 'po osobi', perTable: 'po stolu', waBook: 'Zvanična rezervacija putem WhatsAppa: +39 351 912 7047.', sourcePrefix: 'Zvanično potvrđen meni i cene za 2027', schedH: 'Raspored 2027', menuH: 'Zvanični meni 2027', condH: 'Uključeno i lokacija', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  bs: { nye: 'Doček Nove godine 2027', city: 'Milano', dec31: '31.12.2026.', perPerson: 'po osobi', perTable: 'po stolu', waBook: 'Zvanična rezervacija putem WhatsAppa: +39 351 912 7047.', sourcePrefix: 'Zvanično potvrđen meni i cijene 2027', schedH: 'Raspored 2027', menuH: 'Zvanični jelovnik 2027', condH: 'Uključeno i lokacija', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
  mk: { nye: 'Нова година 2027', city: 'Милано', dec31: '31.12.2026', perPerson: 'по лице', perTable: 'по маса', waBook: 'Официјална резервација на WhatsApp: +39 351 912 7047.', sourcePrefix: 'Официјално потврдено мени и цени 2027', schedH: 'Програма 2027', menuH: 'Официјално мени 2027', condH: 'Вклучено и локација', courses5: ['Welcome', 'Starters', 'First Course', 'Main Course', 'Dessert & Midnight'] },
};

// ============================================================================
// 1. IL MARCHESE MILANO (Via dei Bossi 3 · Scala / Duomo / Brera)
// ============================================================================
const MARCHESE_DISHES_IT: [string, string, string, string, string] = [
  'Calice di Franciacorta F.lli Berlucchi Brut 25 Blanc de Blancs e pouf di Parmigiano con tartare di tonno rosso, maionese allo yuzu e caviale di aringa affumicata',
  'Alice croccante ripiena di scarola con maionese all’aglio nero · Lingotto allo zafferano con baccalà mantecato e chips di carciofo · Insalatina tiepida di polpo, patate e olive taggiasche',
  'Lasagna di mare con besciamella al limone',
  'Turbante di spigola alla puttanesca, terra di olive e clorofilla di basilico (varianti carne o vegetariane su richiesta)',
  'Panettone al mirto con crema al mascarpone · Ore 23:59 calice di Franciacorta, cotechino e lenticchie',
];

const MARCHESE_DISHES_EN: [string, string, string, string, string] = [
  'F.lli Berlucchi Brut 25 Blanc de Blancs Franciacorta flute and Parmigiano puff with bluefin tuna tartare, yuzu mayo & smoked herring caviar',
  'Crispy anchovy stuffed with escarole & black-garlic mayo · Saffron ingot with whipped salt cod & artichoke crisps · Warm octopus, potato & Taggiasca olive salad',
  'Seafood lasagna with lemon béchamel',
  'Sea bass turban alla puttanesca with olive crumble & basil chlorophyll (meat or vegetarian alternatives available on request)',
  'Myrtle-infused panettone with mascarpone cream · 23:59 Franciacorta toast, traditional cotechino & lentils',
];

export function getIlMarcheseNyeContent(locale: string): CapodannoLocalizedEventContent {
  if (locale === 'it') {
    const tiers: CapodannoEventTier[] = [
      {
        label: 'Gran Cenone di San Silvestro + DJ Set (dalle 20:30)',
        price: '150 € a persona',
        details: 'Aperitivo Franciacorta Berlucchi, tris di antipasti, lasagna di mare, spigola, panettone al mirto, acqua, caffè, 1 bottiglia di vino ogni 4 persone, brindisi di mezzanotte con cotechino e lenticchie e permanenza al DJ set.',
      },
      {
        label: 'Gran Cenone + Tavolo Riservato Dopocena Champagne (20:30 – 03:00)',
        price: '250 € a persona',
        details: 'Percorso completo del Gran Cenone con vini e Franciacorta inclusi + mantenimento tavolo riservato nel dopocena con 1 bottiglia di Champagne ogni 4 persone.',
      },
      {
        label: 'Ingresso Solo Dopocena · DJ Set & Live Performance (dalle 00:30)',
        price: '60 € a persona',
        details: 'Ingresso dopocena dalle ore 00:30 fino alle 03:00 con 2 drink inclusi presso il celebre Amaro Bar & Salone di Via dei Bossi 3.',
      },
      {
        label: 'Tavolo Riservato Dopocena con Champagne (00:30 – 03:00 · max 5 ospiti)',
        price: '300 € a tavolo',
        details: 'Tavolo riservato nel dopocena fino a 5 persone con bottiglia di Champagne inclusa e accesso prioritario.',
      },
    ];
    return {
      title: 'Capodanno 2027 Il Marchese Milano · Gran Cenone, Amaro Bar & DJ Set in Via dei Bossi 3',
      subtitle: `Il Marchese Milano · ${MARCHESE_ADDR} · 20:30 – 03:00 · Dopocena 60 € · Cenone 150 €`,
      description:
        'Festeggia il Capodanno 2027 da Il Marchese Milano in Via dei Bossi 3, a due passi dal Teatro alla Scala, Piazza Duomo e Brera: l’iconica Osteria, Mercato e primo Amaro Bar d’Europa tra colonne in marmo e lampadari di cristallo propone Gran Cenone servito a 150 € (vini 1 ogni 4 e Franciacorta inclusi), formula Cenone + Tavolo Champagne a 250 €, Ingresso Dopocena dalle 00:30 con 2 drink a 60 € e Tavolo Dopocena Champagne a 300 € (max 5 ospiti). Prenotazioni ufficiali su WhatsApp +39 351 912 7047.',
      musicAndFormat: 'Gran Cenone nei saloni storici · Ore 00:01 DJ Set & Live Performance fino alle 03:00',
      dressCode: 'Elegante / Smart Chic di San Silvestro',
      priceSummary: 'Dopocena (2 drink) 60 € · Gran Cenone 150 € · Cenone + Tavolo Champagne 250 € · Tavolo Dopocena 300 € (max 5 pax)',
      tiers,
      highlights: [
        'Salone ottocentesco con colonne in marmo, lampadari in cristallo e primo Amaro Bar d’Europa in Via dei Bossi 3 (Scala / Duomo)',
        'Gran Cenone a 150 € comprensivo di acqua, caffè, 1 bottiglia di vino ogni 4 ospiti e doppio calice di Franciacorta',
        'Formula combinata 250 € con tavolo riservato dopocena e 1 bottiglia di Champagne ogni 4 persone',
        'Ingresso dopocena dalle 00:30 a 60 € con 2 drink oppure tavolo riservato con Champagne a 300 € fino a 5 persone',
      ],
      sourceBasis:
        'Programma e menù ufficiali confermati Il Marchese Milano (Via dei Bossi 3, 31 dicembre 2026 ore 20:30–03:00): Cenone 150 €, Cenone + Tavolo Champagne 250 €, Dopocena 2 drink 60 €, Tavolo Dopocena 300 € (max 5 pax). Info e prenotazioni WhatsApp +39 351 912 7047.',
      scheduleHeading: 'Programma Orario Capodanno 2027',
      schedule: [
        { time: '20:30', label: 'Accoglienza nei saloni di Via dei Bossi 3 e aperitivo con Franciacorta Berlucchi Brut 25' },
        { time: '21:00', label: 'Inizio Gran Cenone servito (varianti di carne e vegetariane disponibili su richiesta)' },
        { time: '23:59', label: 'Countdown di mezzanotte con calice di Franciacorta, cotechino e lenticchie' },
        { time: '00:01 – 03:00', label: 'DJ Set & Live Performance con apertura ingressi e tavoli dopocena dalle 00:30' },
      ],
      menusHeading: 'Menù Ufficiale Gran Cenone (150 € / 250 €)',
      menus: [
        {
          id: 'il-marchese-cenone-150',
          title: 'Menù Gran Cenone di San Silvestro · Il Marchese Milano',
          price: '150 € / 250 €',
          subtitle: `${MARCHESE_ADDR} · Giovedì 31 Dicembre 2026`,
          courses: [
            { course: 'Aperitivo di Benvenuto (20:30)', dish: MARCHESE_DISHES_IT[0] },
            { course: 'Antipasti (21:00)', dish: MARCHESE_DISHES_IT[1] },
            { course: 'Primo Piatto', dish: MARCHESE_DISHES_IT[2] },
            { course: 'Secondo Piatto', dish: MARCHESE_DISHES_IT[3] },
            { course: 'Dolce & Mezzanotte', dish: MARCHESE_DISHES_IT[4] },
          ],
          beverages:
            'Inclusi nei 150 €: acqua, caffè, 1 bottiglia di vino ogni 4 persone, Franciacorta di benvenuto e di mezzanotte (250 € aggiunge tavolo dopocena con 1 Champagne ogni 4).',
          imageSrc: MARCHESE_MENU_IMG,
          imageAlt: 'Menù Gran Cenone Capodanno 2027 Il Marchese Milano',
        },
      ],
      conditionsHeading: 'Formule, Variazioni Menù & Logistica Piazza della Scala',
      conditions: [
        'Alternative di carne e vegetariane disponibili segnalandole al momento della prenotazione su WhatsApp +39 351 912 7047',
        'Chi sceglie il Gran Cenone da 150 € può trattenersi gratuitamente al DJ Set & Live Performance dopo la mezzanotte',
        'Posizione centralissima in Via dei Bossi 3 tra Teatro alla Scala, Piazza Cordusio (M1) e Montenapoleone (M3)',
        'Assistenza e conferma immediata tramite Concierge Nightlife Milan su WhatsApp +39 351 912 7047',
      ],
      offerPricesEur: [60, 150, 250, 300],
      customFaqs: [
        {
          q: 'Quali sono i prezzi ufficiali per Capodanno 2027 da Il Marchese Milano?',
          a: 'Sono disponibili quattro formule ufficiali: Gran Cenone servito a 150 € (con permanenza gratuita al DJ set), Cenone + Tavolo Dopocena con Champagne (1 ogni 4) a 250 €, Ingresso Dopocena dalle 00:30 con 2 drink a 60 € e Tavolo Dopocena riservato con Champagne fino a 5 ospiti a 300 €.',
        },
        {
          q: 'È possibile richiedere un menù di carne o vegetariano?',
          a: 'Sì: oltre al menù principale di mare, la cucina di Via dei Bossi 3 prepara su prenotazione varianti dedicate di carne o vegetariane comunicandolo al Concierge WhatsApp +39 351 912 7047.',
        },
        {
          q: 'Cosa include l’ingresso dopocena da 60 €?',
          a: 'L’ingresso dopocena parte dalle ore 00:30 e comprende 2 drink per persona più accesso al DJ Set & Live Performance fino alle 03:00.',
        },
        {
          q: 'Come si raggiunge Il Marchese Milano la notte di San Silvestro?',
          a: 'Il locale si trova in Via dei Bossi 3, dietro Piazza della Scala, a 3–5 minuti a piedi dalle fermate metro M1 Cordusio / Duomo e M3 Montenapoleone.',
        },
      ],
    };
  }

  const m = locale === 'en' ? null : META_SEEDS[locale as Exclude<LocaleCode, 'it' | 'en'>];
  const pp = m ? m.perPerson : 'per person';
  const pt = m ? m.perTable : 'per table';
  const city = m ? m.city : 'Milan';
  const nye = m ? m.nye : 'NYE 2027';
  const wa = m ? m.waBook : 'Official reservations via WhatsApp +39 351 912 7047.';
  const cLabels: [string, string, string, string, string] = m
    ? m.courses5
    : ['Welcome Aperitif (20:30)', 'Starters (21:00)', 'First Course', 'Main Course', 'Dessert & Midnight'];

  return {
    title:
      locale === 'en'
        ? 'Il Marchese Milan NYE 2027 · Noble Gala Dinner, Amaro Bar & DJ Set near La Scala'
        : `${nye} Il Marchese ${city} · Gala Dinner, Amaro Bar & DJ Set (60 € – 250 €)`,
    subtitle: `Il Marchese ${city} · ${MARCHESE_ADDR} · 20:30 – 03:00 · 60 € / 150 € / 250 €`,
    description:
      locale === 'en'
        ? `Celebrate December 31, 2026 inside the marble-columned salon and Europe’s first Amaro Bar at Il Marchese Milan (${MARCHESE_ADDR}), steps from Teatro alla Scala and Duomo. Official packages: €150 Seated Gala Dinner (includes water, coffee, 1 bottle of wine per 4 guests, Berlucchi Franciacorta welcome & midnight toast, plus complimentary stay for the DJ set), €250 Gala Dinner + Post-Midnight Champagne Table (1 Champagne per 4), €60 After-Dinner Entry from 00:30 with 2 drinks, and €300 After-Dinner Champagne Table (up to 5 guests). ${wa}`
        : `${m!.sourcePrefix} · Il Marchese ${city} (${MARCHESE_ADDR}): Gala Dinner 150 € ${pp} (Franciacorta + 1 wine/4 + DJ Set), Gala + Champagne Table 250 € ${pp}, After-Dinner 00:30 (2 drinks) 60 € ${pp}, Champagne Table (max 5) 300 € ${pt}. ${wa}`,
    musicAndFormat: 'Seated Gala Dinner in historic marble halls · 00:01 DJ Set & Live Performance until 03:00',
    dressCode: 'New Year’s Eve Elegant / Smart Chic',
    priceSummary: `60 € (After-Dinner 2 drinks) · 150 € (Gala Dinner) · 250 € (Dinner + Champagne Table) · 300 € (${pt} max 5)`,
    tiers: [
      {
        label: `Gala Dinner + DJ Set (20:30 · ${city})`,
        price: `150 € ${pp}`,
        details: '5-stage seafood tasting menu (meat/vegetarian options on request), water, coffee, 1 bottle of wine per 4 guests, Berlucchi Franciacorta welcome & midnight toast, plus DJ set access.',
      },
      {
        label: 'Gala Dinner + Reserved Champagne Table (20:30 – 03:00)',
        price: `250 € ${pp}`,
        details: 'Full Gala Dinner package plus reserved post-midnight table with 1 bottle of Champagne every 4 guests.',
      },
      {
        label: 'After-Dinner Party + 2 Drinks (from 00:30)',
        price: `60 € ${pp}`,
        details: 'Entry from 00:30 until 03:00 including 2 drinks and DJ Set & Live Performance.',
      },
      {
        label: 'After-Dinner Champagne Table (00:30 – 03:00 · max 5 guests)',
        price: `300 € ${pt}`,
        details: 'Reserved VIP table for up to 5 guests including Champagne bottle service.',
      },
    ],
    highlights: [
      `Via dei Bossi 3 (${city} · La Scala / Duomo / Brera) · 20:30 – 03:00`,
      `150 € ${pp} Gala Dinner incl. wine (1/4) & Franciacorta · 250 € ${pp} with Champagne table`,
      `60 € ${pp} After-Dinner from 00:30 (2 drinks) · 300 € ${pt} Champagne Table (max 5)`,
      wa,
    ],
    sourceBasis: `${m ? m.sourcePrefix : 'Confirmed official 2027 menu & rate card'} · Il Marchese ${city} (60 € / 150 € / 250 € / 300 €). ${wa}`,
    scheduleHeading: m ? m.schedH : 'Official NYE 2027 Schedule',
    schedule: [
      { time: '20:30', label: 'Arrival at Via dei Bossi 3 & Berlucchi Brut 25 Franciacorta welcome' },
      { time: '21:00', label: 'Served Gala Dinner (seafood menu, with meat or vegetarian options on request)' },
      { time: '23:59', label: 'Midnight Franciacorta toast with traditional cotechino & lentils' },
      { time: '00:01 – 03:00', label: 'DJ Set & Live Performance (After-Dinner entry opens at 00:30)' },
    ],
    menusHeading: m ? m.menuH : 'Official Gala Dinner Menu (€150 / €250)',
    menus: [
      {
        id: 'il-marchese-cenone-150',
        title: `${nye} · Il Marchese ${city} (150 € / 250 €)`,
        price: `150 € ${pp}`,
        subtitle: `${MARCHESE_ADDR} · ${m ? m.dec31 : 'Thursday, December 31, 2026'}`,
        courses: cLabels.map((course, idx) => ({ course, dish: MARCHESE_DISHES_EN[idx] })),
        beverages: 'Included: mineral water, coffee, 1 bottle of wine per 4 guests, welcome & midnight Franciacorta (€250 adds reserved post-dinner table with 1 Champagne per 4).',
        imageSrc: MARCHESE_MENU_IMG,
        imageAlt: `${nye} Il Marchese ${city}`,
      },
    ],
    conditionsHeading: m ? m.condH : 'Inclusions & La Scala District Access',
    conditions: [
      'Meat and vegetarian menu variations available upon advance notice when booking',
      '€150 Gala Dinner guests enjoy complimentary access to the post-midnight DJ set',
      'Located at Via dei Bossi 3, 4 minutes on foot from M1 Cordusio / Duomo and M3 Montenapoleone',
      wa,
    ],
    offerPricesEur: [60, 150, 250, 300],
    customFaqs: [
      {
        q: `What are the official NYE 2027 packages at Il Marchese ${city}?`,
        a: `Four official options: €150 Gala Dinner, €250 Gala Dinner + Champagne Table (1/4), €60 After-Dinner entry from 00:30 with 2 drinks, and €300 After-Dinner Champagne Table for up to 5 guests.`,
      },
      {
        q: 'Are meat or vegetarian alternatives available?',
        a: `Yes. Request meat, vegetarian or allergy adaptations via WhatsApp +39 351 912 7047 when confirming your table.`,
      },
    ],
  };
}

// ============================================================================
// 2. FREZZA MILANO – CASCINA ROMANA (Via Giuseppe Sirtori 34 · Porta Venezia)
// ============================================================================
const FREZZA_DISHES_IT: [string, string, string, string, string] = [
  'Carpaccio di gamberi bianchi e rosa con misticanza e lamponi · Tartare di tonno',
  'Insalata di finocchi, arancia e olive · Alici fritte con puntarelle e mandarini',
  'Paccheri allo scoglio',
  'Coda di rospo alla cacciatora in vaso-cottura (varianti di carne, senza glutine e vegetariane su richiesta)',
  'Millefoglie di lingue di gatto con crema ai frutti di bosco · Brindisi di mezzanotte con spumante, cotechino e lenticchie',
];

const FREZZA_DISHES_EN: [string, string, string, string, string] = [
  'Pink and white prawn carpaccio with baby greens & raspberries · Fresh tuna tartare',
  'Fennel, orange & olive salad · Crispy fried anchovies with Roman puntarelle & mandarins',
  'Seafood paccheri allo scoglio',
  'Jar-cooked monkfish alla cacciatora (meat, gluten-free & vegetarian alternatives on request)',
  'Cat’s-tongue millefeuille with forest-berry cream · Midnight sparkling toast, cotechino & lentils',
];

export function getFrezzaMilanoNyeContent(locale: string): CapodannoLocalizedEventContent {
  if (locale === 'it') {
    return {
      title: 'Capodanno 2027 Frezza Milano · Cascina Romana di Claudio Amendola: Cenone & DJ Set (130 €)',
      subtitle: `Frezza Milano · ${FREZZA_ADDR} · 20:30 – 02:30 · Tariffa unica 130 € vino incluso`,
      description:
        'Festeggia il 31 dicembre 2026 da Frezza Milano – Cascina Romana in Via Giuseppe Sirtori 34 (Porta Venezia), il ristorante su due livelli firmato da Claudio Amendola tra travi in legno a vista e salotti in velluto. La tariffa unica di 130 € a persona comprende il Gran Cenone servito completo (4 antipasti, paccheri allo scoglio, coda di rospo in vaso-cottura, millefoglie ai frutti di bosco), 1 bottiglia di vino ogni 3 persone, acqua, brindisi di mezzanotte con spumante, cotechino con lenticchie e DJ set fino alle 02:30. Varianti di carne, senza glutine e vegetariane disponibili. Prenotazioni WhatsApp +39 351 912 7047.',
      musicAndFormat: 'Cena Servita di San Silvestro & Festa con DJ Set fino alle 02:30',
      dressCode: 'Smart Chic / Elegante di Capodanno',
      priceSummary: 'Tariffa unica 130 € a persona · Cenone completo + Vino (1 bottiglia ogni 3) + Spumante + DJ Set',
      tiers: [
        {
          label: 'Cena di Capodanno Servita + Party DJ Set (20:30 – 02:30)',
          price: '130 € a persona',
          details: '4 antipasti di mare, paccheri allo scoglio, coda di rospo in vaso-cottura, millefoglie ai frutti di bosco, acqua, 1 bottiglia di vino ogni 3 ospiti, brindisi di mezzanotte con cotechino e lenticchie e DJ set (varianti carne, gluten free e vegetariane su richiesta).',
        },
      ],
      highlights: [
        'Cascina Romana urbana firmata da Claudio Amendola in Via Giuseppe Sirtori 34 nel cuore di Porta Venezia',
        'Tariffa unica tutto compreso di 130 € con 1 bottiglia di vino ogni 3 persone, acqua e brindisi di mezzanotte',
        'Varianti complete di carne, vegetariane e senza glutine (gluten free) disponibili su prenotazione',
        'Dopo il brindisi con cotechino e lenticchie la serata prosegue con musica e DJ set fino alle 02:30',
      ],
      sourceBasis:
        'Menù e listino ufficiali confermati Frezza Milano – Cascina Romana (Via Giuseppe Sirtori 34, 31 dicembre 2026 ore 20:30–02:30): tariffa unica 130 € a persona con vino 1 ogni 3, acqua, brindisi e DJ set. Prenotazioni WhatsApp +39 351 912 7047.',
      scheduleHeading: 'Programma Orario Capodanno 2027',
      schedule: [
        { time: '20:30', label: 'Accoglienza ai tavoli riservati sui due livelli di Via Giuseppe Sirtori 34' },
        { time: '21:00', label: 'Servizio dei 4 antipasti, paccheri allo scoglio e coda di rospo in vaso-cottura' },
        { time: '00:00', label: 'Brindisi di mezzanotte con spumante, cotechino e lenticchie della tradizione' },
        { time: '00:15 – 02:30', label: 'Festa di Capodanno con selezione musicale e DJ set' },
      ],
      menusHeading: 'Menù Ufficiale Cenone 130 € (Vino 1 ogni 3 Incluso)',
      menus: [
        {
          id: 'frezza-milano-cenone-130',
          title: 'Menù Cena di Capodanno & DJ Set · Frezza Milano (130 €)',
          price: '130 € a persona',
          subtitle: `${FREZZA_ADDR} · Giovedì 31 Dicembre 2026`,
          courses: [
            { course: 'Antipasti (1ª parte)', dish: FREZZA_DISHES_IT[0] },
            { course: 'Antipasti (2ª parte)', dish: FREZZA_DISHES_IT[1] },
            { course: 'Primo Piatto', dish: FREZZA_DISHES_IT[2] },
            { course: 'Secondo Piatto', dish: FREZZA_DISHES_IT[3] },
            { course: 'Dolce & Mezzanotte', dish: FREZZA_DISHES_IT[4] },
          ],
          beverages: 'Inclusi nei 130 €: 1 bottiglia di vino ogni 3 persone, acqua e spumante per il brindisi di mezzanotte.',
          imageSrc: FREZZA_MENU_IMG,
          imageAlt: 'Menù Capodanno 2027 Frezza Milano Cascina Romana',
        },
      ],
      conditionsHeading: 'Inclusioni, Intolleranze & Come Arrivare in Porta Venezia',
      conditions: [
        'Disponibili su richiesta menù alternativi di carne, vegetariani e senza glutine per celiaci',
        '1 bottiglia di vino ogni 3 partecipanti già compresa nella quota di 130 €',
        'A 5 minuti a piedi da Corso Buenos Aires e dalla fermata metro M1 Porta Venezia / Passante Ferroviario',
        'Prenotazione tavoli tramite Concierge WhatsApp +39 351 912 7047',
      ],
      offerPricesEur: [130],
      customFaqs: [
        {
          q: 'Cosa comprende il prezzo di 130 € da Frezza Milano?',
          a: 'Include la cena servita completa (4 antipasti, primo, secondo, dolce), acqua, 1 bottiglia di vino ogni 3 persone, spumante di mezzanotte con cotechino e lenticchie e il DJ set fino alle 02:30.',
        },
        {
          q: 'Ci sono opzioni senza glutine, di carne o vegetariane?',
          a: 'Sì: Frezza Milano predispone su richiesta varianti dedicate di carne, vegetariane e gluten free segnalandole in fase di prenotazione su WhatsApp +39 351 912 7047.',
        },
      ],
    };
  }

  const m = locale === 'en' ? null : META_SEEDS[locale as Exclude<LocaleCode, 'it' | 'en'>];
  const pp = m ? m.perPerson : 'per person';
  const city = m ? m.city : 'Milan';
  const nye = m ? m.nye : 'NYE 2027';
  const wa = m ? m.waBook : 'Official reservations via WhatsApp +39 351 912 7047.';
  const cLabels: [string, string, string, string, string] = m
    ? m.courses5
    : ['Starters I', 'Starters II', 'First Course', 'Main Course', 'Dessert & Midnight'];

  return {
    title:
      locale === 'en'
        ? 'Frezza Milan Cascina Romana NYE 2027 · Claudio Amendola’s Dinner & DJ Set (€130 Wine Included)'
        : `${nye} Frezza ${city} Cascina Romana · Gala Dinner & DJ Set (130 €)`,
    subtitle: `Frezza ${city} · ${FREZZA_ADDR} · 20:30 – 02:30 · 130 € ${pp}`,
    description:
      locale === 'en'
        ? `Celebrate New Year’s Eve 2027 at Frezza Milan – Cascina Romana (${FREZZA_ADDR} in Porta Venezia), Claudio Amendola’s warm two-storey Roman restaurant. The single all-inclusive €130 per person rate covers 4 seafood starters, paccheri allo scoglio, jar-cooked monkfish, berry millefeuille, water, 1 bottle of wine every 3 guests, midnight sparkling toast with cotechino & lentils, and a festive DJ set until 02:30 (meat, gluten-free and vegetarian menus available). ${wa}`
        : `${m!.sourcePrefix} · Frezza ${city} (${FREZZA_ADDR}): 130 € ${pp} (4 starters + paccheri + monkfish + dessert + 1 wine bottle per 3 guests + midnight toast + DJ Set until 02:30; meat/gluten-free/vegetarian options available). ${wa}`,
    musicAndFormat: 'Seated New Year’s Eve Dinner & Festive DJ Set until 02:30',
    dressCode: 'Smart Chic / Festive Evening Attire',
    priceSummary: `130 € ${pp} · Full Seated Dinner + Wine (1 bottle / 3) + Midnight Toast + DJ Set`,
    tiers: [
      {
        label: `Seated NYE Dinner + DJ Set (20:30 – 02:30 · ${city})`,
        price: `130 € ${pp}`,
        details: '4 starters, seafood paccheri, jar-cooked monkfish, berry millefeuille, water, 1 bottle of wine per 3 guests, midnight sparkling toast with lentils & cotechino, and DJ set (meat, gluten-free & vegetarian options available).',
      },
    ],
    highlights: [
      `Via Giuseppe Sirtori 34 (${city} Porta Venezia · M1) · Claudio Amendola’s Cascina Romana`,
      `130 € ${pp} all-inclusive with 1 bottle of wine every 3 guests, water & midnight sparkling toast`,
      'Dedicated meat, vegetarian and gluten-free alternatives available on advance request',
      wa,
    ],
    sourceBasis: `${m ? m.sourcePrefix : 'Confirmed official 2027 menu & rate card'} · Frezza ${city} (130 €, 20:30–02:30). ${wa}`,
    scheduleHeading: m ? m.schedH : 'Official NYE 2027 Schedule',
    schedule: [
      { time: '20:30', label: 'Doors open and welcome seating at Via Giuseppe Sirtori 34 (Porta Venezia)' },
      { time: '21:00', label: 'Multi-course New Year’s Eve dinner service with wine (1 bottle per 3 guests)' },
      { time: '00:00', label: 'Midnight sparkling wine toast with traditional cotechino and lentils' },
      { time: '00:15 – 02:30', label: 'New Year’s Eve party and DJ set' },
    ],
    menusHeading: m ? m.menuH : 'Official €130 Dinner Menu (Wine 1/3 Included)',
    menus: [
      {
        id: 'frezza-milano-cenone-130',
        title: `${nye} · Frezza ${city} (130 €)`,
        price: `130 € ${pp}`,
        subtitle: `${FREZZA_ADDR} · ${m ? m.dec31 : 'Thursday, December 31, 2026'}`,
        courses: cLabels.map((course, idx) => ({ course, dish: FREZZA_DISHES_EN[idx] })),
        beverages: 'Included in €130: 1 bottle of wine every 3 guests, mineral water, and midnight sparkling wine toast.',
        imageSrc: FREZZA_MENU_IMG,
        imageAlt: `${nye} Frezza ${city}`,
      },
    ],
    conditionsHeading: m ? m.condH : 'Inclusions, Dietary Menus & Porta Venezia Access',
    conditions: [
      'Meat, vegetarian, and gluten-free variations prepared upon advance request',
      'Includes 1 bottle of wine per 3 guests, water, midnight toast, and DJ set till 02:30',
      '5 minutes on foot from M1 Porta Venezia metro and railway link',
      wa,
    ],
    offerPricesEur: [130],
    customFaqs: [
      {
        q: `What is included in the €130 rate at Frezza ${city}?`,
        a: 'It covers the full seated menu, water, 1 bottle of wine per 3 guests, midnight sparkling toast with lentils & cotechino, and the DJ set until 02:30.',
      },
      {
        q: 'Are gluten-free, meat, or vegetarian menus available?',
        a: 'Yes, simply mention your dietary needs on WhatsApp +39 351 912 7047 when booking.',
      },
    ],
  };
}

// ============================================================================
// 3. BEACH GARDEN MILANO (EX LE JARDIN / GARDEN CLUB IDROSCALO)
// ============================================================================
const BEACH_DISHES_IT: [string, string, string, string, string] = [
  '17 specialità: grissini al sesamo e salumi, doblone alle erbe, salmone artico affumicato, spiedino bocconcini e pachino, mini sandwich al tartufo, bocconcini filanti, formaggi con miele d’agrumi e acacia, salumi tipici',
  'Cous cous vegan, cous cous con verdurine e pepite di pollo, canapé festosi, polenta e zola, gamberi in salsa cocktail, mousse di verdure, bufalina con tonno, porchetta di Ariccia IGP, sinfonia di mare',
  'Lasagne ai profumi autunnali · Agnolotti al nero di seppia con frutti dei nostri mari',
  'Cuore tenero di manzo alla Wellington',
  'Frutta · Dolce artigianale della tradizione milanese con gelato alla crema · Mezzanotte: brindisi augurale e Tesoro con pepite fortunate',
];

const BEACH_DISHES_EN: [string, string, string, string, string] = [
  '17 Royal Buffet starters (Part I): sesame breadsticks & cured meats, herb cheese medallion, smoked Arctic salmon, mozzarella & cherry tomato skewers, truffle mini sandwiches, crispy cheese bites, cheeses with citrus & acacia honey',
  'Royal Buffet starters (Part II): vegan couscous, chicken & vegetable couscous, festive canapés, gorgonzola polenta, Mediterranean prawn cocktail, vegetable mousse, buffalo mozzarella with tuna, Ariccia IGP porchetta & seafood salad',
  'Autumn-scented lasagna · Squid-ink agnolotti with Mediterranean seafood',
  'Tender Beef Wellington heart',
  'Fresh fruit · Artisanal Milanese festive cake with vanilla ice cream · Midnight sparkling toast & lucky lentils with cotechino',
];

export function getBeachGardenNyeContent(locale: string, variant: 'beach-garden' | 'le-jardin' | 'mood-live' = 'beach-garden'): CapodannoLocalizedEventContent {
  const venueLabelIt =
    variant === 'le-jardin'
      ? 'Le Jardin Milano (ora Beach Garden Club Idroscalo)'
      : variant === 'mood-live'
        ? 'Beach Garden / Mood Live Garden Club Idroscalo'
        : 'Beach Garden Milano (ex Le Jardin Idroscalo)';
  const venueLabelEn =
    variant === 'le-jardin'
      ? 'Le Jardin Milan (now Beach Garden Club Idroscalo)'
      : variant === 'mood-live'
        ? 'Beach Garden / Mood Live Garden Club Idroscalo'
        : 'Beach Garden Milan (formerly Le Jardin Idroscalo)';

  if (locale === 'it') {
    return {
      title: `Capodanno 2027 ${venueLabelIt} · Royal Buffet 65 € & Party Dopocena 30 € fino alle 05:00`,
      subtitle: `${venueLabelIt} · ${BEACH_ADDR} · 20:30 – 05:00 · Dopocena 30 € · Royal Buffet 65 €`,
      description:
        `Festeggia il Capodanno 2027 al ${venueLabelIt} in ${BEACH_ADDR}, sulle rive dell’Idroscalo di Milano: la storica location Le Jardin / Garden Club accoglie la notte del 31 dicembre 2026 dalle 20:30 alle 05:00 con due formule ufficiali chiare: Royal Buffet completo + Serata a 65 € a persona (17 antipasti, 2 primi caldi, manzo alla Wellington, dolce milanese con gelato, 1 drink, flûte di mezzanotte e DJ set) oppure Ingresso Dopocena + Party dalle 23:00 a 30 € con 1 drink incluso. Prenotazioni ufficiali su WhatsApp +39 351 912 7047.`,
      musicAndFormat: 'Royal Buffet (20:30), Countdown di Mezzanotte & Club DJ Set Commerciale, House e Hit fino alle 05:00',
      dressCode: 'Smart Chic / Elegante da Club',
      priceSummary: 'Ingresso Dopocena (dalle 23:00, 1 drink) 30 € · Royal Buffet Completo + Serata (dalle 20:30) 65 €',
      tiers: [
        {
          label: 'Royal Buffet di San Silvestro + Serata Club (20:30 – 05:00)',
          price: '65 € a persona',
          details: '17 antipasti gourmet di terra e di mare, lasagne autunnali, agnolotti al nero di seppia ai frutti di mare, manzo alla Wellington, dolce milanese con gelato, specialità di mezzanotte + 1 drink + 1 flûte brindisi + DJ set fino alle 05:00.',
        },
        {
          label: 'Ingresso Dopocena + Party (23:00 – 05:00)',
          price: '30 € a persona',
          details: 'Ingresso dalle ore 23:00 con 1 drink incluso, countdown di mezzanotte e serata clubbing fino alle 05:00.',
        },
      ],
      highlights: [
        'Nuovo nome ufficiale della storica location Le Jardin / Garden Club sulle rive dell’Idroscalo (Via Circonvallazione Idroscalo 51)',
        'Royal Buffet ricchissimo a 65 € con 17 antipasti, 2 primi caldi, Manzo alla Wellington, 1 drink e flûte di mezzanotte',
        'Formula giovane e accessibile Ingresso Dopocena dalle 23:00 a 30 € con 1 drink incluso e festa fino alle 05:00',
        'Ampia pista con anelli LED, maxischermo e comodi parcheggi lungo Via Circonvallazione Idroscalo a 5 minuti da M4 Linate',
      ],
      sourceBasis:
        `Programma e menù ufficiali confermati ${venueLabelIt} (Via Circonvallazione Idroscalo 51, 31 dicembre 2026 ore 20:30–05:00): Royal Buffet + Serata 65 €, Ingresso Dopocena + 1 drink 30 €. Prenotazioni WhatsApp +39 351 912 7047.`,
      scheduleHeading: 'Programma Orario Capodanno 2027',
      schedule: [
        { time: '20:30', label: 'Apertura ingressi e inizio Gran Royal Buffet di San Silvestro (formula 65 €)' },
        { time: '23:00', label: 'Apertura ingressi Dopocena + Party con 1 drink incluso (formula 30 €)' },
        { time: '00:00', label: 'Countdown di mezzanotte con brindisi augurale e specialità portafortuna' },
        { time: '00:15 – 05:00', label: 'Clubbing e DJ Set nella main room con anelli LED fino all’alba' },
      ],
      menusHeading: 'Menù Ufficiale Royal Buffet 65 €',
      menus: [
        {
          id: 'beach-garden-buffet-65',
          title: `Menù Royal Buffet Capodanno 2027 · ${venueLabelIt} (65 €)`,
          price: '65 € a persona',
          subtitle: `${BEACH_ADDR} · Giovedì 31 Dicembre 2026`,
          courses: [
            { course: 'Antipasti Royal Buffet (1ª selezione)', dish: BEACH_DISHES_IT[0] },
            { course: 'Antipasti Royal Buffet (2ª selezione)', dish: BEACH_DISHES_IT[1] },
            { course: 'Primi Piatti Caldi', dish: BEACH_DISHES_IT[2] },
            { course: 'Secondo Piatto', dish: BEACH_DISHES_IT[3] },
            { course: 'Dessert & Mezzanotte', dish: BEACH_DISHES_IT[4] },
          ],
          beverages: 'Inclusi nei 65 €: 1 drink a scelta + 1 flûte per il brindisi di mezzanotte. Ingresso Dopocena 30 € dalle 23:00: 1 drink incluso.',
          imageSrc: BEACH_MENU_IMG,
          imageAlt: 'Menù Royal Buffet 65 € Beach Garden Milano ex Le Jardin',
        },
      ],
      conditionsHeading: 'Formule, Parcheggio & Come Arrivare all’Idroscalo',
      conditions: [
        'Beach Garden è la denominazione attuale dello storico club Le Jardin Milano in Via Circonvallazione Idroscalo 51',
        'A soli 5 minuti da Milano Linate (metro M4 Blu) con ampie aree di parcheggio adiacenti all’Idroscalo',
        'Possibilità di richiedere quotazione tavoli VIP dopocena direttamente al Concierge WhatsApp +39 351 912 7047',
        'Prenotazione rapida su WhatsApp +39 351 912 7047',
      ],
      offerPricesEur: [30, 65],
      customFaqs: [
        {
          q: 'Beach Garden Milano e Le Jardin Idroscalo sono la stessa location?',
          a: 'Sì: Beach Garden (Garden Club) è il nome attuale della storica location Le Jardin in Via Circonvallazione Idroscalo 51 a Segrate / Milano.',
        },
        {
          q: 'Quali sono i prezzi ufficiali per la notte del 31 dicembre 2026?',
          a: 'Royal Buffet completo dalle 20:30 con 1 drink, flûte di mezzanotte e serata a 65 € a persona, oppure Ingresso Dopocena dalle 23:00 con 1 drink incluso a 30 € a persona fino alle 05:00.',
        },
      ],
    };
  }

  const m = locale === 'en' ? null : META_SEEDS[locale as Exclude<LocaleCode, 'it' | 'en'>];
  const pp = m ? m.perPerson : 'per person';
  const city = m ? m.city : 'Milan';
  const nye = m ? m.nye : 'NYE 2027';
  const wa = m ? m.waBook : 'Official reservations via WhatsApp +39 351 912 7047.';
  const cLabels: [string, string, string, string, string] = m
    ? m.courses5
    : ['Buffet Starters I', 'Buffet Starters II', 'Hot First Courses', 'Main Course', 'Dessert & Midnight'];

  return {
    title:
      locale === 'en'
        ? `${venueLabelEn} NYE 2027 · €65 Royal Buffet & €30 Club Party until 05:00`
        : `${nye} Beach Garden ${city} (ex Le Jardin) · Royal Buffet 65 € & Party 30 €`,
    subtitle: `${venueLabelEn} · ${BEACH_ADDR} · 20:30 – 05:00 · 30 € / 65 €`,
    description:
      locale === 'en'
        ? `Celebrate New Year’s Eve 2027 at ${venueLabelEn} (${BEACH_ADDR}) along Milan’s lakeside Idroscalo park from 20:30 until 05:00. Two official packages: €65 Royal Buffet + Club Night from 20:30 (17 starters, 2 hot pasta courses, Beef Wellington, Milanese dessert, 1 drink + midnight toast flute + DJ set) or €30 After-Dinner Party Entry from 23:00 including 1 drink and clubbing until 05:00. ${wa}`
        : `${m!.sourcePrefix} · Beach Garden ${city} ex Le Jardin (${BEACH_ADDR}): Royal Buffet + Party (20:30–05:00) 65 € ${pp} (17 starters, 2 pasta dishes, Beef Wellington, 1 drink + midnight toast), After-Dinner Party (23:00–05:00, 1 drink) 30 € ${pp}. ${wa}`,
    musicAndFormat: 'Royal Buffet (20:30), Midnight Countdown & Commercial / House Club DJ Set until 05:00',
    dressCode: 'Smart Chic / Club Elegant',
    priceSummary: `30 € ${pp} (23:00 Party + 1 drink) · 65 € ${pp} (20:30 Royal Buffet + 1 drink + toast + Party)`,
    tiers: [
      {
        label: 'Royal Buffet + Club Night (20:30 – 05:00)',
        price: `65 € ${pp}`,
        details: '17 gourmet starters, autumn lasagna, squid-ink seafood agnolotti, Beef Wellington, Milanese dessert with ice cream, midnight lucky lentils + 1 drink + 1 midnight toast flute + DJ set until 05:00.',
      },
      {
        label: 'After-Dinner Party + 1 Drink (23:00 – 05:00)',
        price: `30 € ${pp}`,
        details: 'Club admission from 23:00 including 1 drink, midnight countdown and DJ set until 05:00.',
      },
    ],
    highlights: [
      `Via Circonvallazione Idroscalo 51 (${city} Idroscalo · formerly Le Jardin)`,
      `65 € ${pp} full Royal Buffet from 20:30 with 1 drink, midnight flute & party till 05:00`,
      `30 € ${pp} After-Dinner entry from 23:00 including 1 drink`,
      wa,
    ],
    sourceBasis: `${m ? m.sourcePrefix : 'Confirmed official 2027 menu & rate card'} · Beach Garden ${city} ex Le Jardin (30 € / 65 €, 20:30–05:00). ${wa}`,
    scheduleHeading: m ? m.schedH : 'Official NYE 2027 Schedule',
    schedule: [
      { time: '20:30', label: 'Doors open & Royal Buffet dinner begins (€65 package)' },
      { time: '23:00', label: 'After-Dinner Party admission opens with 1 drink included (€30 package)' },
      { time: '00:00', label: 'Midnight sparkling toast & traditional lucky specialties' },
      { time: '00:15 – 05:00', label: 'DJ Set & club party beneath the LED light rings until dawn' },
    ],
    menusHeading: m ? m.menuH : 'Official €65 Royal Buffet Menu',
    menus: [
      {
        id: 'beach-garden-buffet-65',
        title: `${nye} · Beach Garden ${city} (65 €)`,
        price: `65 € ${pp}`,
        subtitle: `${BEACH_ADDR} · ${m ? m.dec31 : 'Thursday, December 31, 2026'}`,
        courses: cLabels.map((course, idx) => ({ course, dish: BEACH_DISHES_EN[idx] })),
        beverages: 'Included in €65 Royal Buffet: 1 drink + 1 midnight sparkling flute. €30 After-Dinner from 23:00 includes 1 drink.',
        imageSrc: BEACH_MENU_IMG,
        imageAlt: `${nye} Beach Garden ${city}`,
      },
    ],
    conditionsHeading: m ? m.condH : 'Inclusions, Parking & Idroscalo Access',
    conditions: [
      'Official new name of historic lakeside club Le Jardin at Via Circonvallazione Idroscalo 51',
      '5 minutes from Milan Linate Airport (M4 Blue Metro) with convenient lakeside parking',
      'VIP bottle-service tables available upon request via WhatsApp Concierge',
      wa,
    ],
    offerPricesEur: [30, 65],
    customFaqs: [
      {
        q: 'Is Beach Garden Milan the new name of Le Jardin Idroscalo?',
        a: 'Yes, Beach Garden (Garden Club) is the current name of the historic Le Jardin venue at Via Circonvallazione Idroscalo 51.',
      },
      {
        q: 'What are the official NYE 2027 ticket prices?',
        a: '€65 per person for the 20:30 Royal Buffet (with 1 drink, midnight flute & party until 05:00) or €30 per person from 23:00 for the After-Dinner Party with 1 drink included.',
      },
    ],
  };
}
