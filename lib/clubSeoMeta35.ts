import type { LocaleCode } from './i18n/locales';
import type { Venue } from './types';
import { seoTitle, withWhatsApp } from './seoMetadata';

export interface ClubSerpPack {
  city: string;
  titlePricesVip: string;
  vipFrom: (eur: number) => string;
  open77: string;
  sanSiro150m: string;
  skyline20F: string;
  guestlistAndVip: string;
  whatsappCta: string;
}

export const CLUB_SERP_35: Record<LocaleCode, ClubSerpPack> = {
  en: {
    city: 'Milan',
    titlePricesVip: 'VIP Tables, Prices & Guestlist 2026/2027',
    vipFrom: (n) => `VIP tables from €${n}`,
    open77: 'Open 7/7 (19:30-05:00)',
    sanSiro150m: '150m from San Siro Stadium',
    skyline20F: '20th-floor skyline rooftop',
    guestlistAndVip: 'VIP tables, bottle service & guestlist',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  it: {
    city: 'Milano',
    titlePricesVip: 'Tavoli VIP, Prezzi e Lista 2026/2027',
    vipFrom: (n) => `Tavoli VIP da ${n}€`,
    open77: 'Aperto 7/7 (19:30-05:00)',
    sanSiro150m: 'A 150m dallo Stadio San Siro',
    skyline20F: 'Rooftop panoramico al 20° piano',
    guestlistAndVip: 'Tavoli VIP, listino bottiglie e accredito in lista',
    whatsappCta: 'Prenota su WhatsApp +39 351 912 7047.',
  },
  es: {
    city: 'Milán',
    titlePricesVip: 'Mesas VIP, Precios y Lista 2026/2027',
    vipFrom: (n) => `Mesas VIP desde ${n}€`,
    open77: 'Abierto 7/7 (19:30-05:00)',
    sanSiro150m: 'A 150m del Estadio San Siro',
    skyline20F: 'Rooftop panorámico piso 20',
    guestlistAndVip: 'Mesas VIP, botellas, dress code y lista',
    whatsappCta: 'Reserva por WhatsApp +39 351 912 7047.',
  },
  fr: {
    city: 'Milan',
    titlePricesVip: 'Tables VIP, Tarifs et Guestlist 2026/2027',
    vipFrom: (n) => `Tables VIP dès ${n}€`,
    open77: 'Ouvert 7j/7 (19h30-05h00)',
    sanSiro150m: 'À 150m du Stade San Siro',
    skyline20F: 'Rooftop panoramique 20e étage',
    guestlistAndVip: 'Tables VIP, bouteilles, dress code et guestlist',
    whatsappCta: 'Réservation WhatsApp +39 351 912 7047.',
  },
  de: {
    city: 'Mailand',
    titlePricesVip: 'VIP-Tische, Preise & Gästeliste 2026/2027',
    vipFrom: (n) => `VIP-Tische ab ${n}€`,
    open77: 'Täglich 7/7 geöffnet (19:30-05:00)',
    sanSiro150m: '150m vom San-Siro-Stadion',
    skyline20F: 'Skyline-Rooftop im 20. Stock',
    guestlistAndVip: 'VIP-Tische, Flaschenpreise, Dresscode & Gästeliste',
    whatsappCta: 'WhatsApp-Concierge +39 351 912 7047.',
  },
  pt: {
    city: 'Milão',
    titlePricesVip: 'Mesas VIP, Preços e Lista 2026/2027',
    vipFrom: (n) => `Mesas VIP desde ${n}€`,
    open77: 'Aberto 7/7 (19:30-05:00)',
    sanSiro150m: 'A 150m do Estádio San Siro',
    skyline20F: 'Rooftop panorâmico no 20º andar',
    guestlistAndVip: 'Mesas VIP, garrafas, dress code e guest list',
    whatsappCta: 'Reservas WhatsApp +39 351 912 7047.',
  },
  nl: {
    city: 'Milaan',
    titlePricesVip: 'VIP-Tafels, Prijzen & Gastenlijst 2026/2027',
    vipFrom: (n) => `VIP-tafels vanaf €${n}`,
    open77: '7/7 geopend (19:30-05:00)',
    sanSiro150m: 'Op 150m van San Siro Stadion',
    skyline20F: 'Panoramisch rooftop 20e verdieping',
    guestlistAndVip: 'VIP-tafels, flessenservice, dresscode en gastenlijst',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  ru: {
    city: 'Милан',
    titlePricesVip: 'VIP-столы, цены и списки 2026/2027',
    vipFrom: (n) => `VIP-столы от ${n}€`,
    open77: 'Открыто 7/7 (19:30-05:00)',
    sanSiro150m: 'В 150 м от стадиона Сан-Сиро',
    skyline20F: 'Панорамный руфтоп на 20 этаже',
    guestlistAndVip: 'Бронь VIP-столов, дресс-код и гостевые списки',
    whatsappCta: 'Консьерж WhatsApp +39 351 912 7047.',
  },
  tr: {
    city: 'Milano',
    titlePricesVip: 'VIP Masa, Fiyatlar ve Konuk Listesi 2026/2027',
    vipFrom: (n) => `VIP masalar ${n}€'dan`,
    open77: 'Her gün açık 7/7 (19:30-05:00)',
    sanSiro150m: 'San Siro Stadyumu 150m mesafede',
    skyline20F: '20. kat panoramik teras',
    guestlistAndVip: 'VIP masa rezervasyonu, şişe servisi ve giriş listesi',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  zh: {
    city: '米兰',
    titlePricesVip: 'VIP卡座价格与宾客名单 2026/2027',
    vipFrom: (n) => `VIP卡座€${n}起`,
    open77: '每周7天营业 (19:30-05:00)',
    sanSiro150m: '距圣西罗球场150米',
    skyline20F: '20层高空全景露台',
    guestlistAndVip: 'VIP卡座预订、酒水单、着装要求与名单入场',
    whatsappCta: '官方WhatsApp礼宾 +39 351 912 7047。',
  },
  ar: {
    city: 'ميلانو',
    titlePricesVip: 'طاولات VIP والأسعار والقائمة 2026/2027',
    vipFrom: (n) => `طاولات VIP من ${n}€`,
    open77: 'مفتوح طوال الأسبوع 7/7 (19:30-05:00)',
    sanSiro150m: 'على بعد 150 متر من ملعب سان سيرو',
    skyline20F: 'روفتوب بانورامي بالطابق 20',
    guestlistAndVip: 'حجز طاولات VIP وقائمة الضيوف وقواعد اللباس',
    whatsappCta: 'كونسيرج واتساب +39 351 912 7047.',
  },
  bg: {
    city: 'Милано',
    titlePricesVip: 'VIP маси, цени и списък 2026/2027',
    vipFrom: (n) => `VIP маси от ${n}€`,
    open77: 'Отворено 7/7 (19:30-05:00)',
    sanSiro150m: 'На 150 м от стадион Сан Сиро',
    skyline20F: 'Панорамен руфтоп на 20-ти етаж',
    guestlistAndVip: 'VIP маси, бутилки, дрескод и списък за вход',
    whatsappCta: 'WhatsApp консиерж +39 351 912 7047.',
  },
  hr: {
    city: 'Milano',
    titlePricesVip: 'VIP stolovi, cijene i popis 2026/2027',
    vipFrom: (n) => `VIP stolovi od ${n}€`,
    open77: 'Otvoreno 7/7 (19:30-05:00)',
    sanSiro150m: '150m od stadiona San Siro',
    skyline20F: 'Panoramski rooftop na 20. katu',
    guestlistAndVip: 'VIP stolovi, cijene boca, dress code i popis gostiju',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  cs: {
    city: 'Milán',
    titlePricesVip: 'VIP stoly, ceny a guestlist 2026/2027',
    vipFrom: (n) => `VIP stoly od ${n}€`,
    open77: 'Otevřeno 7/7 (19:30-05:00)',
    sanSiro150m: '150 m od stadionu San Siro',
    skyline20F: 'Panoramatický rooftop ve 20. patře',
    guestlistAndVip: 'VIP stoly, lahvový servis, dress code a guestlist',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  da: {
    city: 'Milano',
    titlePricesVip: 'VIP-borde, priser og gæsteliste 2026/2027',
    vipFrom: (n) => `VIP-borde fra ${n}€`,
    open77: 'Åbent 7/7 (19:30-05:00)',
    sanSiro150m: '150 m fra San Siro Stadion',
    skyline20F: 'Skyline-rooftop på 20. etage',
    guestlistAndVip: 'VIP-borde, flaskeservice, dresscode og gæsteliste',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  et: {
    city: 'Milano',
    titlePricesVip: 'VIP-lauad, hinnad ja nimekiri 2026/2027',
    vipFrom: (n) => `VIP-lauad alates ${n}€`,
    open77: 'Avatud 7/7 (19:30-05:00)',
    sanSiro150m: '150 m San Siro staadionist',
    skyline20F: '20. korruse panoraamkatus',
    guestlistAndVip: 'VIP-lauad, pudeliteenindus, riietusstiil ja külalistenimekiri',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  fi: {
    city: 'Milano',
    titlePricesVip: 'VIP-pöydät, hinnat ja vieraslista 2026/2027',
    vipFrom: (n) => `VIP-pöydät alk. ${n}€`,
    open77: 'Avoinna 7/7 (19:30-05:00)',
    sanSiro150m: '150 m San Siron stadionilta',
    skyline20F: '20. kerroksen näköalakattobaari',
    guestlistAndVip: 'VIP-pöydät, pullopalvelu, pukukoodi ja vieraslista',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  el: {
    city: 'Μιλάνο',
    titlePricesVip: 'Τραπέζια VIP, Τιμές & Λίστα 2026/2027',
    vipFrom: (n) => `Τραπέζια VIP από ${n}€`,
    open77: 'Ανοιχτά 7/7 (19:30-05:00)',
    sanSiro150m: '150μ από το Στάδιο Σαν Σίρο',
    skyline20F: 'Rooftop στον 20ό όροφο με θέα',
    guestlistAndVip: 'Κρατήσεις τραπεζιών VIP, φιάλες, dress code & λίστα',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  hu: {
    city: 'Milánó',
    titlePricesVip: 'VIP asztalok, árak és vendéglista 2026/2027',
    vipFrom: (n) => `VIP asztalok ${n}€-tól`,
    open77: 'Nyitva 7/7 (19:30-05:00)',
    sanSiro150m: '150 m-re a San Siro Stadiontól',
    skyline20F: '20. emeleti panorámás rooftop',
    guestlistAndVip: 'VIP asztalfoglalás, itallap, dress code és vendéglista',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  ga: {
    city: 'Milano',
    titlePricesVip: 'Boird VIP, Praghsanna & Liosta Aíonna 2026/2027',
    vipFrom: (n) => `Boird VIP ó €${n}`,
    open77: 'Oscailte 7/7 (19:30-05:00)',
    sanSiro150m: '150m ó Staidiam San Siro',
    skyline20F: 'Barra dín ar an 20ú hurlár',
    guestlistAndVip: 'Boird VIP, seirbhís buidéal, cód feistis agus liosta aíonna',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  lv: {
    city: 'Milāna',
    titlePricesVip: 'VIP galdiņi, cenas un saraksts 2026/2027',
    vipFrom: (n) => `VIP galdiņi no ${n}€`,
    open77: 'Atvērts 7/7 (19:30-05:00)',
    sanSiro150m: '150 m no San Siro stadiona',
    skyline20F: '20. stāva panorāmas jumta bārs',
    guestlistAndVip: 'VIP galdiņu rezervācija, dress code un viesu saraksts',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  lt: {
    city: 'Milanas',
    titlePricesVip: 'VIP staliukai, kainos ir sąrašas 2026/2027',
    vipFrom: (n) => `VIP staliukai nuo ${n}€`,
    open77: 'Dirba 7/7 (19:30-05:00)',
    sanSiro150m: '150 m nuo San Siro stadiono',
    skyline20F: '20 aukšto panoraminis stogo baras',
    guestlistAndVip: 'VIP staliukai, gėrimų aptarnavimas, aprangos kodas ir sąrašas',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  mt: {
    city: 'Milan',
    titlePricesVip: 'Imwejjed VIP, Prezzijiet u Guestlist 2026/2027',
    vipFrom: (n) => `Imwejjed VIP minn €${n}`,
    open77: 'Miftuħ 7/7 (19:30-05:00)',
    sanSiro150m: '150m mill-Istadium San Siro',
    skyline20F: 'Rooftop panoramiku fl-20 sular',
    guestlistAndVip: 'Imwejjed VIP, fliexken, dress code u guestlist',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  pl: {
    city: 'Mediolan',
    titlePricesVip: 'Stoliki VIP, Ceny i Lista Gości 2026/2027',
    vipFrom: (n) => `Stoliki VIP od ${n}€`,
    open77: 'Otwarte 7/7 (19:30-05:00)',
    sanSiro150m: '150 m od stadionu San Siro',
    skyline20F: 'Panoramiczny rooftop na 20. piętrze',
    guestlistAndVip: 'Rezerwacja stolików VIP, butelki, dress code i lista gości',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  ro: {
    city: 'Milano',
    titlePricesVip: 'Mese VIP, Prețuri și Listă Invitați 2026/2027',
    vipFrom: (n) => `Mese VIP de la ${n}€`,
    open77: 'Deschis 7/7 (19:30-05:00)',
    sanSiro150m: 'La 150m de Stadionul San Siro',
    skyline20F: 'Rooftop panoramic la etajul 20',
    guestlistAndVip: 'Rezervări mese VIP, sticle, dress code și guestlist',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  sk: {
    city: 'Miláno',
    titlePricesVip: 'VIP stoly, ceny a guestlist 2026/2027',
    vipFrom: (n) => `VIP stoly od ${n}€`,
    open77: 'Otvorené 7/7 (19:30-05:00)',
    sanSiro150m: '150 m od štadióna San Siro',
    skyline20F: 'Panoramatický rooftop na 20. poschodí',
    guestlistAndVip: 'VIP stoly, fľašový servis, dress code a guestlist',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  sl: {
    city: 'Milano',
    titlePricesVip: 'VIP mize, cene in seznam gostov 2026/2027',
    vipFrom: (n) => `VIP mize od ${n}€`,
    open77: 'Odprto 7/7 (19:30-05:00)',
    sanSiro150m: '150 m od stadiona San Siro',
    skyline20F: 'Panoramski rooftop v 20. nadstropju',
    guestlistAndVip: 'Rezervacija VIP miz, pijača, dress code in guestlist',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  sv: {
    city: 'Milano',
    titlePricesVip: 'VIP-bord, Priser & Gästlista 2026/2027',
    vipFrom: (n) => `VIP-bord från ${n}€`,
    open77: 'Öppet 7/7 (19:30-05:00)',
    sanSiro150m: '150 m från San Siro-stadion',
    skyline20F: 'Skyline-takbar på 20:e våningen',
    guestlistAndVip: 'VIP-bord, flaskservering, klädkod och gästlista',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  no: {
    city: 'Milano',
    titlePricesVip: 'VIP-bord, Priser og Gjesteliste 2026/2027',
    vipFrom: (n) => `VIP-bord fra ${n}€`,
    open77: 'Åpent 7/7 (19:30-05:00)',
    sanSiro150m: '150 m fra San Siro stadion',
    skyline20F: 'Skyline-takbar i 20. etasje',
    guestlistAndVip: 'VIP-bord, flaskeservering, kleskode og gjesteliste',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  is: {
    city: 'Mílanó',
    titlePricesVip: 'VIP-borð, Verð og Gestalisti 2026/2027',
    vipFrom: (n) => `VIP-borð frá ${n}€`,
    open77: 'Opið 7/7 (19:30-05:00)',
    sanSiro150m: '150 m frá San Siro leikvanginum',
    skyline20F: 'Þakbar á 20. hæð með útsýni',
    guestlistAndVip: 'VIP-borðapantanir, flöskuþjónusta og gestalisti',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  uk: {
    city: 'Мілан',
    titlePricesVip: 'VIP-столи, ціни та списки 2026/2027',
    vipFrom: (n) => `VIP-столи від ${n}€`,
    open77: 'Відкрито 7/7 (19:30-05:00)',
    sanSiro150m: 'За 150 м від стадіону Сан-Сіро',
    skyline20F: 'Панорамний руфтоп на 20-му поверсі',
    guestlistAndVip: 'Бронювання VIP-столів, дрескод і списки гостей',
    whatsappCta: 'WhatsApp консьєрж +39 351 912 7047.',
  },
  sq: {
    city: 'Milano',
    titlePricesVip: 'Tavolina VIP, Çmimet & Lista 2026/2027',
    vipFrom: (n) => `Tavolina VIP nga ${n}€`,
    open77: 'Hapur 7/7 (19:30-05:00)',
    sanSiro150m: '150m nga Stadiumi San Siro',
    skyline20F: 'Rooftop panoramik në katin e 20-të',
    guestlistAndVip: 'Rezervim tavolinash VIP, shishe, dress code & listë',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  sr: {
    city: 'Milano',
    titlePricesVip: 'VIP stolovi, cene i spisak 2026/2027',
    vipFrom: (n) => `VIP stolovi od ${n}€`,
    open77: 'Otvoreno 7/7 (19:30-05:00)',
    sanSiro150m: '150m od stadiona San Siro',
    skyline20F: 'Panoramski rooftop na 20. spratu',
    guestlistAndVip: 'Rezervacija VIP stolova, flaše, dress code i lista',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  bs: {
    city: 'Milano',
    titlePricesVip: 'VIP stolovi, cijene i lista 2026/2027',
    vipFrom: (n) => `VIP stolovi od ${n}€`,
    open77: 'Otvoreno 7/7 (19:30-05:00)',
    sanSiro150m: '150m od stadiona San Siro',
    skyline20F: 'Panoramski rooftop na 20. spratu',
    guestlistAndVip: 'Rezervacija VIP stolova, dress code i lista gostiju',
    whatsappCta: 'WhatsApp Concierge +39 351 912 7047.',
  },
  mk: {
    city: 'Милано',
    titlePricesVip: 'VIP маси, цени и листа 2026/2027',
    vipFrom: (n) => `VIP маси од ${n}€`,
    open77: 'Отворено 7/7 (19:30-05:00)',
    sanSiro150m: '150 м од стадионот Сан Сиро',
    skyline20F: 'Панорамски руфтоп на 20-ти кат',
    guestlistAndVip: 'Резервација на VIP маси, пијалаци, дрес-код и листа',
    whatsappCta: 'WhatsApp Консиерж +39 351 912 7047.',
  },
};

/** Confirmed minimum VIP table spend (EUR) strictly for managed/verified venues in clubContent */
const CONFIRMED_MIN_VIP_EUR: Readonly<Record<string, number>> = {
  'v-justme': 320,
  'v-voya': 250,
  'v-pineta': 300,
  'v-aria': 250,
  'v-playclub': 300,
  'v-55milano': 250,
  'v-repvblic': 250,
  'v-11clubroom': 300,
  'v-church81': 200,
  'v-mibmilano': 250,
  'v-gattopardo': 300,
  'v-terrazza21': 250,
  'v-theclub': 250,
};

export const FLAGSHIP_TITLES_EN_IT: Readonly<Record<string, { en: string; it: string }>> = {
  'v-justme': {
    en: 'Just Me Milan: Open 7/7, VIP Tables from €320 & Prices',
    it: 'Just Me Milano: Aperto 7/7, Tavoli VIP da 320€ e Prezzi',
  },
  'v-voya': {
    en: 'Voya Rooftop Milan: 20th Floor Bar, Aperitivo & VIP Tables',
    it: 'Voya Rooftop Milano: 20° Piano, Aperitivo e Tavoli VIP',
  },
  'v-pineta': {
    en: 'Pineta Club Milan: Singing Aperitivo & VIP Tables from €300',
    it: 'Pineta Club Milano: Aperitivo Cantato e Tavoli VIP da 300€',
  },
  'v-aria': {
    en: 'Aria Club Milan: 150m San Siro Afterparty & VIP Tables',
    it: 'Aria Club Milano: 150m San Siro Dopo-Partita e Tavoli VIP',
  },
  'v-playclub': {
    en: 'Play Club Milan: Hip-Hop, Afrobeats & VIP Tables Corso Como',
    it: 'Play Club Milano: Hip-Hop, Afrobeats e Tavoli VIP Corso Como',
  },
  'v-55milano': {
    en: '55 Milano: Singing Dinner, XXL Apericena & VIP Tables',
    it: '55 Milano: Cena Cantata, Apericena XL e Tavoli VIP Sempione',
  },
  'v-repvblic': {
    en: 'Repvblic Milan: Dirty Monday, House Nights & VIP Tables',
    it: 'Repvblic Milano: Dirty Monday, House e Tavoli VIP Repubblica',
  },
  'v-11clubroom': {
    en: '11 Clubroom Milan: Corso Como Urban Nights & VIP Tables',
    it: '11 Clubroom Milano: Serate Urban Corso Como e Tavoli VIP',
  },
  'v-church81': {
    en: 'Church 81 Milan: Navigli Club, Bottle Prices & Guestlist',
    it: 'Church 81 Milano: Club Navigli, Prezzi Bottiglie e Lista',
  },
  'v-mibmilano': {
    en: 'MIB Milan: Dinner Show Piazza Affari, Prices & VIP Tables',
    it: 'MIB Milano: Dinner Show Piazza Affari, Prezzi e Tavoli VIP',
  },
  'v-gattopardo': {
    en: 'Il Gattopardo Milan: Former Church Club & VIP Table Prices',
    it: 'Il Gattopardo Milano: Club in Ex Chiesa e Prezzi Tavoli VIP',
  },
  'v-terrazza21': {
    en: 'Terrazza Duomo 21 Milan: Duomo Rooftop Aperitivo & Tables',
    it: 'Terrazza Duomo 21 Milano: Aperitivo Vista Duomo e Tavoli',
  },
  'v-magazzini': {
    en: 'Magazzini Generali Milan: Techno, Live Shows & VIP Balcony',
    it: 'Magazzini Generali Milano: Techno, Concerti e Balconata VIP',
  },
  'v-armani-prive': {
    en: 'Armani Privé Milan: Luxury Fashion Club, Selection & Tables',
    it: 'Armani Privé Milano: Club Quadrilatero, Selezione e Tavoli',
  },
  'v-volt': {
    en: 'Volt Club Milan: Melodic Techno, Lineup & VIP Tables',
    it: 'Volt Club Milano: Melodic Techno, Lineup e Tavoli VIP',
  },
  'v-hollywood': {
    en: 'Hollywood Milan: Corso Como Club, Guestlist & VIP Tables',
    it: 'Hollywood Milano: Club Corso Como, Lista e Tavoli VIP',
  },
  'v-apollo': {
    en: 'Apollo Club Milan: Navigli Electronic Nights & Cocktails',
    it: 'Apollo Club Milano: Serate Elettroniche e Cocktail Navigli',
  },
  'v-ceresio-7': {
    en: 'Ceresio 7 Milan: Twin Pool Rooftop, Aperitivo & Booking',
    it: 'Ceresio 7 Milano: Rooftop Piscine, Aperitivo e Prenotazioni',
  },
  'v-theclub': {
    en: 'The Club Milan: Brera International Nights, Guestlist & VIP',
    it: 'The Club Milano: Serate Brera, Lista e Tavoli VIP 2026/2027',
  },
  'v-tocqueville': {
    en: 'Tocqueville 13 Milan: Corso Como Dinner Show & VIP Tables',
    it: 'Tocqueville 13 Milano: Dinner Show Corso Como e Tavoli VIP',
  },
  'v-alcatraz': {
    en: 'Alcatraz Milan: 3-Room Club, Concerts & VIP Balcony Tables',
    it: 'Alcatraz Milano: 3 Piste, Concerti e Tavoli Balconata VIP',
  },
  'v-fabrique': {
    en: 'Fabrique Milan: Electronic Festivals, Concerts & VIP Ring',
    it: 'Fabrique Milano: Festival Elettronici, Concerti e Ring VIP',
  },
  'v-amnesia': {
    en: 'Amnesia Milan: Tech-House & Techno Club, Tickets & Privé',
    it: 'Amnesia Milano: Club Tech-House e Techno, Biglietti e Privé',
  },
  'v-bobino': {
    en: 'Bobino Milan: Navigli Aperitivo Garden, DJ Sets & Tables',
    it: 'Bobino Milano: Aperitivo Navigli, Giardino, DJ Set e Tavoli',
  },
  'v-dock22': {
    en: 'Dock 22 Milan: Navigli Electronic Showcases & Event Guide',
    it: 'Dock 22 Milano: Showcase Elettronici Navigli, Eventi e Tavoli',
  },
  'v-loolapaloosa': {
    en: 'Loolapaloosa Milan: Corso Como Party Bar, Hours & Tables',
    it: 'Loolapaloosa Milano: Party Bar Corso Como, Orari e Tavoli',
  },
  'v-super-club-milano': {
    en: 'Super Club Milan: Via Tortona Void Sound, Events & Tables',
    it: 'Super Club Milano: Club Via Tortona, Impianto Void ed Eventi',
  },
  'v-radio-rooftop-bar-milano': {
    en: 'Radio Rooftop Bar Milan: 10th Floor Aperitivo & Skyline',
    it: 'Radio Rooftop Bar Milano: 10° Piano Aperitivo e Skyline',
  },
  'v-the-roof-milano': {
    en: 'The Roof Milan: Missori Panoramic Terrace, Dinner & Drinks',
    it: 'The Roof Milano: Terrazza Missori Vista Duomo, Cena e Drink',
  },
  'v-terrazza-aperol-milano': {
    en: 'Terrazza Aperol Milan: Duomo Balcony Spritz, Hours & Guide',
    it: 'Terrazza Aperol Milano: Terrazza Vista Duomo, Orari e Guida',
  },
  'v-terrazza-gallia-milano': {
    en: 'Terrazza Gallia Milan: 7th Floor Luxury Bar & Restaurant',
    it: 'Terrazza Gallia Milano: 7° Piano Cocktail Bar e Ristorante',
  },
  'v-ristorante-torre-milano': {
    en: 'Ristorante Torre Milan: Fondazione Prada Panoramic Dining',
    it: 'Ristorante Torre Milano: Terrazza Fondazione Prada e Bar',
  },
  'v-innocenti-evasioni-terrazza-triennale': {
    en: 'Terrazza Triennale Milan: Parco Sempione Rooftop & Dining',
    it: 'Terrazza Triennale Milano: Ristorante Panoramico Sempione',
  },
};

export function buildClubHighCtrTitle(venue: Venue, locale: string, localizedVenueName: string): string {
  const loc = (CLUB_SERP_35[locale as LocaleCode] ? locale : 'en') as LocaleCode;
  if ((loc === 'en' || loc === 'it') && FLAGSHIP_TITLES_EN_IT[venue.id]) {
    return seoTitle(FLAGSHIP_TITLES_EN_IT[venue.id][loc], 62);
  }
  const pack = CLUB_SERP_35[loc];
  const minVip = CONFIRMED_MIN_VIP_EUR[venue.id];
  const hasCityInName =
    localizedVenueName.toLowerCase().includes('milan') ||
    localizedVenueName.toLowerCase().includes('milano') ||
    localizedVenueName.toLowerCase().includes(pack.city.toLowerCase());
  const head = hasCityInName ? localizedVenueName : `${localizedVenueName} ${pack.city}`;
  if (minVip) {
    const candidate = `${head}: ${pack.vipFrom(minVip)} · ${pack.titlePricesVip}`;
    if (candidate.length <= 62) return seoTitle(candidate, 62);
  }
  return seoTitle(`${head}: ${pack.titlePricesVip}`, 62);
}

export function buildClubHighCtrDescription(
  venue: Venue,
  locale: string,
  localizedVenueName: string,
  fallbackRawDescription: string,
): string {
  const loc = (CLUB_SERP_35[locale as LocaleCode] ? locale : 'en') as LocaleCode;
  const pack = CLUB_SERP_35[loc];
  const street = venue.address.streetAddress;
  const minVip = CONFIRMED_MIN_VIP_EUR[venue.id];

  if (loc === 'it') {
    if (venue.id === 'v-justme') {
      return 'Just Me Milano (Torre Branca, Sempione): aperto 7/7 19:30-05:00. Aperitivo 20-35€, Tavoli VIP da 320€. Prenota su WhatsApp +39 351 912 7047.';
    }
    if (venue.id === 'v-aria') {
      return 'Aria Club Milano (Piazzale dello Sport 14, a 150m da San Siro): dopo-partita, aperitivo e Tavoli VIP da 250€. WhatsApp +39 351 912 7047.';
    }
    if (venue.id === 'v-voya') {
      return 'Voya Rooftop Milano (20° piano, Viale Achille Papa 30): aperitivo vista skyline e Tavoli VIP da 250€. Prenota su WhatsApp +39 351 912 7047.';
    }
    if (minVip) {
      return withWhatsApp(`${localizedVenueName} (${street}, Milano): Tavoli VIP da ${minVip}€, prezzi bottiglie, dress code e lista.`, 'it', 158);
    }
    return withWhatsApp(`${localizedVenueName} (${street}, Milano): orari, dress code, eventi e assistenza tavoli VIP.`, 'it', 158);
  }

  if (loc === 'en') {
    if (venue.id === 'v-justme') {
      return 'Just Me Milan (Torre Branca, Sempione): open 7/7 19:30-05:00. Aperitivo €20-35, VIP tables from €320. Book via WhatsApp +39 351 912 7047.';
    }
    if (venue.id === 'v-aria') {
      return 'Aria Club Milan (150m from San Siro Stadium): football afterparties, aperitivo & VIP tables from €250. Book via WhatsApp +39 351 912 7047.';
    }
    if (venue.id === 'v-voya') {
      return 'Voya Rooftop Milan (20th floor skyline bar, Portello M5): sunset aperitivo & VIP tables from €250. Book via WhatsApp +39 351 912 7047.';
    }
    if (minVip) {
      return withWhatsApp(`${localizedVenueName} (${street}, Milan): VIP tables from €${minVip}, bottle prices, dress code & guestlist.`, 'en', 158);
    }
    return withWhatsApp(`${localizedVenueName} (${street}, Milan): events, dress code & VIP table concierge.`, 'en', 158);
  }

  // All 33 additional indexed locales: 100% native high-CTR snippet
  const specialFeature =
    venue.id === 'v-justme'
      ? `${pack.open77}, ${pack.vipFrom(320)}`
      : venue.id === 'v-aria'
        ? `${pack.sanSiro150m}, ${pack.vipFrom(250)}`
        : venue.id === 'v-voya'
          ? `${pack.skyline20F}, ${pack.vipFrom(250)}`
          : minVip
            ? `${pack.vipFrom(minVip)}, ${pack.guestlistAndVip}`
            : pack.guestlistAndVip;

  const fullNative = `${localizedVenueName} (${street}, ${pack.city}): ${specialFeature}. ${pack.whatsappCta}`;
  if (fullNative.length >= 78 && fullNative.length <= 158) {
    return fullNative;
  }
  return withWhatsApp(fallbackRawDescription, loc, 158);
}
