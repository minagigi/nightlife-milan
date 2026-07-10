import type { LocaleCode } from './locales';

/**
 * Chrome UI del sito (nav, CTA) in tutte le lingue del registry.
 * Tradotto in-sessione da Fable 5 (nessun costo API — decisione utente 10 lug).
 * Chiave mancante o lingua mancante → fallback EN automatico via getChrome().
 */

export interface ChromeStrings {
  clubs: string;
  calendar: string;
  zones: string;
  guides: string;
  vipTables: string;
  events: string;
  bottlePrices: string;
  bookWhatsApp: string;
}

const EN: ChromeStrings = {
  clubs: 'CLUBS', calendar: 'CALENDAR', zones: 'ZONES', guides: 'GUIDES',
  vipTables: 'VIP TABLES', events: 'EVENTS', bottlePrices: 'BOTTLE PRICES',
  bookWhatsApp: 'Book via WhatsApp',
};

const CHROME: Partial<Record<LocaleCode, Partial<ChromeStrings>>> = {
  en: EN,
  it: { clubs: 'LOCALI', calendar: 'CALENDARIO', zones: 'ZONE', guides: 'GUIDE', vipTables: 'TAVOLI VIP', events: 'EVENTI', bottlePrices: 'PREZZI BOTTIGLIE', bookWhatsApp: 'Prenota via WhatsApp' },
  es: { clubs: 'CLUBES', calendar: 'CALENDARIO', zones: 'ZONAS', guides: 'GUÍAS', vipTables: 'MESAS VIP', events: 'EVENTOS', bottlePrices: 'PRECIOS DE BOTELLAS', bookWhatsApp: 'Reserva por WhatsApp' },
  fr: { clubs: 'CLUBS', calendar: 'CALENDRIER', zones: 'QUARTIERS', guides: 'GUIDES', vipTables: 'TABLES VIP', events: 'ÉVÉNEMENTS', bottlePrices: 'PRIX DES BOUTEILLES', bookWhatsApp: 'Réserver via WhatsApp' },
  de: { clubs: 'CLUBS', calendar: 'KALENDER', zones: 'VIERTEL', guides: 'GUIDES', vipTables: 'VIP-TISCHE', events: 'EVENTS', bottlePrices: 'FLASCHENPREISE', bookWhatsApp: 'Über WhatsApp buchen' },
  pt: { clubs: 'CLUBES', calendar: 'CALENDÁRIO', zones: 'ZONAS', guides: 'GUIAS', vipTables: 'MESAS VIP', events: 'EVENTOS', bottlePrices: 'PREÇOS DE GARRAFAS', bookWhatsApp: 'Reservar via WhatsApp' },
  nl: { clubs: 'CLUBS', calendar: 'KALENDER', zones: 'WIJKEN', guides: 'GIDSEN', vipTables: 'VIP-TAFELS', events: 'EVENEMENTEN', bottlePrices: 'FLESSENPRIJZEN', bookWhatsApp: 'Boek via WhatsApp' },
  ru: { clubs: 'КЛУБЫ', calendar: 'КАЛЕНДАРЬ', zones: 'РАЙОНЫ', guides: 'ГИДЫ', vipTables: 'VIP-СТОЛЫ', events: 'СОБЫТИЯ', bottlePrices: 'ЦЕНЫ НА БУТЫЛКИ', bookWhatsApp: 'Забронировать в WhatsApp' },
  tr: { clubs: 'KULÜPLER', calendar: 'TAKVİM', zones: 'BÖLGELER', guides: 'REHBERLER', vipTables: 'VIP MASALAR', events: 'ETKİNLİKLER', bottlePrices: 'ŞİŞE FİYATLARI', bookWhatsApp: "WhatsApp'tan rezervasyon" },
  zh: { clubs: '夜店', calendar: '日历', zones: '区域', guides: '指南', vipTables: 'VIP卡座', events: '活动', bottlePrices: '酒水价格', bookWhatsApp: '通过WhatsApp预订' },
  ar: { clubs: 'النوادي', calendar: 'التقويم', zones: 'المناطق', guides: 'الأدلة', vipTables: 'طاولات VIP', events: 'الفعاليات', bottlePrices: 'أسعار الزجاجات', bookWhatsApp: 'احجز عبر واتساب' },
  bg: { clubs: 'КЛУБОВЕ', calendar: 'КАЛЕНДАР', zones: 'РАЙОНИ', guides: 'ПЪТЕВОДИТЕЛИ', vipTables: 'VIP МАСИ', events: 'СЪБИТИЯ', bottlePrices: 'ЦЕНИ НА БУТИЛКИ', bookWhatsApp: 'Резервирай през WhatsApp' },
  hr: { clubs: 'KLUBOVI', calendar: 'KALENDAR', zones: 'ČETVRTI', guides: 'VODIČI', vipTables: 'VIP STOLOVI', events: 'DOGAĐAJI', bottlePrices: 'CIJENE BOCA', bookWhatsApp: 'Rezerviraj putem WhatsAppa' },
  cs: { clubs: 'KLUBY', calendar: 'KALENDÁŘ', zones: 'ČTVRTI', guides: 'PRŮVODCE', vipTables: 'VIP STOLY', events: 'AKCE', bottlePrices: 'CENY LAHVÍ', bookWhatsApp: 'Rezervovat přes WhatsApp' },
  da: { clubs: 'KLUBBER', calendar: 'KALENDER', zones: 'KVARTERER', guides: 'GUIDER', vipTables: 'VIP-BORDE', events: 'EVENTS', bottlePrices: 'FLASKEPRISER', bookWhatsApp: 'Book via WhatsApp' },
  et: { clubs: 'KLUBID', calendar: 'KALENDER', zones: 'PIIRKONNAD', guides: 'GIIDID', vipTables: 'VIP-LAUAD', events: 'ÜRITUSED', bottlePrices: 'PUDELIHINNAD', bookWhatsApp: 'Broneeri WhatsAppis' },
  fi: { clubs: 'KLUBIT', calendar: 'KALENTERI', zones: 'ALUEET', guides: 'OPPAAT', vipTables: 'VIP-PÖYDÄT', events: 'TAPAHTUMAT', bottlePrices: 'PULLOHINNAT', bookWhatsApp: 'Varaa WhatsAppissa' },
  el: { clubs: 'ΚΛΑΜΠ', calendar: 'ΗΜΕΡΟΛΟΓΙΟ', zones: 'ΠΕΡΙΟΧΕΣ', guides: 'ΟΔΗΓΟΙ', vipTables: 'VIP ΤΡΑΠΕΖΙΑ', events: 'ΕΚΔΗΛΩΣΕΙΣ', bottlePrices: 'ΤΙΜΕΣ ΦΙΑΛΩΝ', bookWhatsApp: 'Κράτηση μέσω WhatsApp' },
  hu: { clubs: 'KLUBOK', calendar: 'NAPTÁR', zones: 'NEGYEDEK', guides: 'ÚTMUTATÓK', vipTables: 'VIP ASZTALOK', events: 'ESEMÉNYEK', bottlePrices: 'ÜVEGÁRAK', bookWhatsApp: 'Foglalás WhatsAppon' },
  ga: { clubs: 'CLUBANNA', calendar: 'FÉILIRE', zones: 'CEANTAIR', guides: 'TREOIRLEABHAIR', vipTables: 'BOIRD VIP', events: 'IMEACHTAÍ', bottlePrices: 'PRAGHSANNA BUIDÉAL', bookWhatsApp: 'Cuir in áirithe ar WhatsApp' },
  lv: { clubs: 'KLUBI', calendar: 'KALENDĀRS', zones: 'RAJONI', guides: 'CEĻVEŽI', vipTables: 'VIP GALDIŅI', events: 'PASĀKUMI', bottlePrices: 'PUDEĻU CENAS', bookWhatsApp: 'Rezervēt WhatsApp' },
  lt: { clubs: 'KLUBAI', calendar: 'KALENDORIUS', zones: 'RAJONAI', guides: 'GIDAI', vipTables: 'VIP STALIUKAI', events: 'RENGINIAI', bottlePrices: 'BUTELIŲ KAINOS', bookWhatsApp: 'Rezervuoti per WhatsApp' },
  mt: { clubs: 'KLABBS', calendar: 'KALENDARJU', zones: 'ZONI', guides: 'GWIDI', vipTables: 'IMWEJJED VIP', events: 'AVVENIMENTI', bottlePrices: 'PREZZIJIET TAL-FLIXKUN', bookWhatsApp: 'Ibbukkja fuq WhatsApp' },
  pl: { clubs: 'KLUBY', calendar: 'KALENDARZ', zones: 'DZIELNICE', guides: 'PRZEWODNIKI', vipTables: 'STOLIKI VIP', events: 'WYDARZENIA', bottlePrices: 'CENY BUTELEK', bookWhatsApp: 'Rezerwuj przez WhatsApp' },
  ro: { clubs: 'CLUBURI', calendar: 'CALENDAR', zones: 'ZONE', guides: 'GHIDURI', vipTables: 'MESE VIP', events: 'EVENIMENTE', bottlePrices: 'PREȚURI STICLE', bookWhatsApp: 'Rezervă pe WhatsApp' },
  sk: { clubs: 'KLUBY', calendar: 'KALENDÁR', zones: 'ŠTVRTE', guides: 'SPRIEVODCOVIA', vipTables: 'VIP STOLY', events: 'PODUJATIA', bottlePrices: 'CENY FLIAŠ', bookWhatsApp: 'Rezervovať cez WhatsApp' },
  sl: { clubs: 'KLUBI', calendar: 'KOLEDAR', zones: 'ČETRTI', guides: 'VODIČI', vipTables: 'VIP MIZE', events: 'DOGODKI', bottlePrices: 'CENE STEKLENIC', bookWhatsApp: 'Rezerviraj prek WhatsAppa' },
  sv: { clubs: 'KLUBBAR', calendar: 'KALENDER', zones: 'OMRÅDEN', guides: 'GUIDER', vipTables: 'VIP-BORD', events: 'EVENEMANG', bottlePrices: 'FLASKPRISER', bookWhatsApp: 'Boka via WhatsApp' },
  no: { clubs: 'KLUBBER', calendar: 'KALENDER', zones: 'BYDELER', guides: 'GUIDER', vipTables: 'VIP-BORD', events: 'ARRANGEMENTER', bottlePrices: 'FLASKEPRISER', bookWhatsApp: 'Bestill via WhatsApp' },
  is: { clubs: 'KLÚBBAR', calendar: 'DAGATAL', zones: 'HVERFI', guides: 'LEIÐARVÍSAR', vipTables: 'VIP-BORÐ', events: 'VIÐBURÐIR', bottlePrices: 'FLÖSKUVERÐ', bookWhatsApp: 'Bóka í WhatsApp' },
  uk: { clubs: 'КЛУБИ', calendar: 'КАЛЕНДАР', zones: 'РАЙОНИ', guides: 'ГІДИ', vipTables: 'VIP-СТОЛИ', events: 'ПОДІЇ', bottlePrices: 'ЦІНИ НА ПЛЯШКИ', bookWhatsApp: 'Бронюйте у WhatsApp' },
  sq: { clubs: 'KLUBET', calendar: 'KALENDARI', zones: 'ZONAT', guides: 'UDHËZUES', vipTables: 'TAVOLINA VIP', events: 'EVENTET', bottlePrices: 'ÇMIMET E SHISHEVE', bookWhatsApp: 'Rezervo në WhatsApp' },
  sr: { clubs: 'KLUBOVI', calendar: 'KALENDAR', zones: 'KVARTOVI', guides: 'VODIČI', vipTables: 'VIP STOLOVI', events: 'DOGAĐAJI', bottlePrices: 'CENE FLAŠA', bookWhatsApp: 'Rezerviši preko WhatsApp-a' },
  bs: { clubs: 'KLUBOVI', calendar: 'KALENDAR', zones: 'KVARTOVI', guides: 'VODIČI', vipTables: 'VIP STOLOVI', events: 'DOGAĐAJI', bottlePrices: 'CIJENE BOCA', bookWhatsApp: 'Rezerviši putem WhatsAppa' },
  mk: { clubs: 'КЛУБОВИ', calendar: 'КАЛЕНДАР', zones: 'КВАРТОВИ', guides: 'ВОДИЧИ', vipTables: 'VIP МАСИ', events: 'НАСТАНИ', bottlePrices: 'ЦЕНИ НА ШИШИЊА', bookWhatsApp: 'Резервирај преку WhatsApp' },
};

/** Chrome del locale con fallback EN campo per campo */
export function getChrome(locale: string): ChromeStrings {
  const partial = CHROME[locale as LocaleCode] || {};
  return { ...EN, ...partial };
}
