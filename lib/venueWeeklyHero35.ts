import type { LocaleCode } from './i18n/localeRegistry';
import { isEnabledLocale, localePrefix } from './i18n/localeRegistry';
import { getLocalizedDir35 } from './i18n/dirTokens35';
import { getLocalizedVenueSlug35, localizeInternalHref } from './i18n/localizedSlugs35';
import type { Venue } from './types';
import { OCTOBER_EVENTS } from './octoberEvents';
import { getOctoberEventSlug } from './october-events/copy';
import { weeklyEvents } from './eventsConfig';
import { getCapodannoEventForClub } from './capodannoEvents';
import { capodannoEventPath } from './capodanno/routes';
import { getConciergeBookingUrl } from './conciergeBooking';
import { christmasVoyaPath } from './christmas/voya35';
import {
  getJustMeOrthodoxRelatedBanner,
  ORTHODOX_NYE_JUSTME_POSTER_SRC,
  orthodoxNyeJustMePath,
} from './orthodox-nye/justme35';
import { thanksgivingJustMePath, THANKSGIVING_JUSTME_POSTER_SRC } from './thanksgiving/justme35';
import { partenopeaJustMePath, PARTENOPEA_JUSTME_POSTER_SRC } from './partenopea/justme35';
import { AXEL_GROUP_DATED_EVENTS, axelGroupEventAllSlugs35 } from './axel-group-events/events35';
import { isBergamoBresciaVenueId } from './bergamo-brescia/clubsSeed';
import {
  BERGAMO_BRESCIA_ACTIVE_NIGHTS,
  bergamoBresciaNightPath,
  computeActiveNightWindowISO,
  getNightUi35,
} from './bergamo-brescia/activeNights35';
import { toCardPoster4x5 } from './cardPoster4x5';

export interface VenueWeeklyHeroUi {
  tocLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  allDaysLabel: string;
  tonightBadge: string;
  specialDateBadge: string;
  weeklyNightBadge: string;
  fromPrice: string;
  uponRequest: string;
  bookWhatsAppCta: string;
  openEventSheetCta: string;
  prevSlideAria: string;
  nextSlideAria: string;
  winterNoticeBadge: string;
  winterNoticeTitle: string;
  winterNoticeBody: string;
  winterPartnerLabel: string;
}

export interface VenueWeeklyHeroCard {
  id: string;
  dayKey: string; // YYYY-MM-DD in Europe/Rome
  dayOffset: number; // 0 = tonight .. 6 = +6d (or >= 7 for winter special)
  dayPillLabel: string;
  badgeLabel: string;
  title: string;
  timeLabel: string;
  priceLabel: string;
  genres: string[];
  imageSrc: string;
  href: string;
  whatsappHref: string;
  isSpecialDate: boolean;
}

export interface WinterPartnerChip {
  name: string;
  href: string;
}

export interface VenueWeeklyHeroSchedule {
  mode: 'weekly-active' | 'winter-special';
  todayRomeKey: string;
  cards: VenueWeeklyHeroCard[];
  winterPartners: WinterPartnerChip[];
}

export const VENUE_WEEKLY_HERO_UI_35: Readonly<Record<LocaleCode, VenueWeeklyHeroUi>> = {
  en: {
    tocLabel: 'This Week’s Nights',
    eyebrow: 'WEEKLY SCHEDULE · UPDATED DAILY',
    title: 'Scheduled Nights of the Week',
    subtitle: 'All confirmed recurring nights and special guest dates for the upcoming 7 nights, ordered from tonight.',
    allDaysLabel: 'All Week',
    tonightBadge: 'TONIGHT',
    specialDateBadge: 'SPECIAL DATE',
    weeklyNightBadge: 'WEEKLY NIGHT',
    fromPrice: 'From',
    uponRequest: 'Concierge Quote',
    bookWhatsAppCta: 'Book on WhatsApp',
    openEventSheetCta: 'Event Details',
    prevSlideAria: 'Previous nights',
    nextSlideAria: 'Next nights',
    winterNoticeBadge: 'SEASONAL SUMMER PARK VENUE',
    winterNoticeTitle: 'Summer Season Closed · Special Winter Dates Only',
    winterNoticeBody: 'Aria Club San Siro operates its open-air park weekly season from May to September. During autumn and winter it opens exclusively for major special productions such as New Year’s Eve 2027.',
    winterPartnerLabel: 'Open Partner Clubs Tonight:',
  },
  it: {
    tocLabel: 'Serate della Settimana',
    eyebrow: 'PROGRAMMA SETTIMANALE · AGGIORNATO OGNI GIORNO',
    title: 'Tutte le Serate della Settimana in Programma',
    subtitle: 'Tutte le serate settimanali fisse e gli eventi speciali dei prossimi 7 giorni, ordinati a partire da stasera.',
    allDaysLabel: 'Tutta la Settimana',
    tonightBadge: 'STASERA',
    specialDateBadge: 'DATA SPECIALE',
    weeklyNightBadge: 'SERATA SETTIMANALE',
    fromPrice: 'Da',
    uponRequest: 'Info WhatsApp',
    bookWhatsAppCta: 'Prenota su WhatsApp',
    openEventSheetCta: 'Scheda Serata',
    prevSlideAria: 'Serate precedenti',
    nextSlideAria: 'Serate successive',
    winterNoticeBadge: 'ARENA ESTIVA PARCO SAN SIRO',
    winterNoticeTitle: 'Pausa Invernale · Aperto Solo per Grandi Eventi Speciali',
    winterNoticeBody: 'Aria Club Milano svolge la programmazione settimanale nel parco estivo da maggio a settembre. Nei mesi autunnali e invernali apre esclusivamente per produzioni speciali confermate come il Capodanno 2027.',
    winterPartnerLabel: 'Club Partner Aperti Questa Settimana:',
  },
  es: {
    tocLabel: 'Fiestas de la Semana',
    eyebrow: 'PROGRAMA SEMANAL · ACTUALIZADO A DIARIO',
    title: 'Todas las Noches de la Semana en Programa',
    subtitle: 'Sesiones semanales y eventos especiales confirmados para las próximas 7 noches desde hoy.',
    allDaysLabel: 'Toda la Semana',
    tonightBadge: 'ESTA NOCHE',
    specialDateBadge: 'FECHA ESPECIAL',
    weeklyNightBadge: 'CADA SEMANA',
    fromPrice: 'Desde',
    uponRequest: 'Consultar WA',
    bookWhatsAppCta: 'Reservar por WhatsApp',
    openEventSheetCta: 'Ver Fiesta',
    prevSlideAria: 'Noches anteriores',
    nextSlideAria: 'Siguientes noches',
    winterNoticeBadge: 'CLUB DE VERANO SAN SIRO',
    winterNoticeTitle: 'Cierre de Invierno · Solo Eventos Especiales',
    winterNoticeBody: 'Aria Club abre su temporada semanal de mayo a septiembre; en invierno abre únicamente para grandes fechas especiales como Nochevieja 2027.',
    winterPartnerLabel: 'Clubes Asociados Abiertos Esta Semana:',
  },
  fr: {
    tocLabel: 'Soirées de la Semaine',
    eyebrow: 'PROGRAMME HEBDOMADAIRE · MIS À JOUR',
    title: 'Toutes les Soirées de la Semaine au Programme',
    subtitle: 'Toutes les soirées résidentes et dates spéciales des 7 prochains jours à partir de ce soir.',
    allDaysLabel: 'Toute la Semaine',
    tonightBadge: 'CE SOIR',
    specialDateBadge: 'DATE SPÉCIALE',
    weeklyNightBadge: 'CHAQUE SEMAINE',
    fromPrice: 'Dès',
    uponRequest: 'Sur demande WA',
    bookWhatsAppCta: 'Réserver sur WhatsApp',
    openEventSheetCta: 'Voir la Soirée',
    prevSlideAria: 'Soirées précédentes',
    nextSlideAria: 'Soirées suivantes',
    winterNoticeBadge: 'CLUB D’ÉTÉ PARC SAN SIRO',
    winterNoticeTitle: 'Pause Hivernale · Ouvert sur Dates Spéciales Uniquement',
    winterNoticeBody: 'Aria Club assure sa programmation hebdomadaire de mai à septembre et ouvre en hiver uniquement pour les grands événements spéciaux dont le Nouvel An 2027.',
    winterPartnerLabel: 'Clubs Partenaires Ouverts Cette Semaine :',
  },
  de: {
    tocLabel: 'Partys der Woche',
    eyebrow: 'WOCHENPROGRAMM · TÄGLICH AKTUELL',
    title: 'Alle Geplanten Clubnächte der Woche',
    subtitle: 'Alle wöchentlichen Resident-Nächte und Sondertermine der nächsten 7 Tage ab heute Abend.',
    allDaysLabel: 'Ganze Woche',
    tonightBadge: 'HEUTE ABEND',
    specialDateBadge: 'SONDEREVENT',
    weeklyNightBadge: 'JEDE WOCHE',
    fromPrice: 'Ab',
    uponRequest: 'Auf Anfrage WA',
    bookWhatsAppCta: 'Per WhatsApp buchen',
    openEventSheetCta: 'Zum Event',
    prevSlideAria: 'Vorherige Nächte',
    nextSlideAria: 'Nächste Nächte',
    winterNoticeBadge: 'SOMMER-OPEN-AIR SAN SIRO',
    winterNoticeTitle: 'Winterpause · Nur Ausgewählte Sondertermine',
    winterNoticeBody: 'Der Aria Club ist von Mai bis September wöchentlich geöffnet und öffnet im Winter ausschließlich für bestätigte Großevents wie Silvester 2027.',
    winterPartnerLabel: 'Geöffnete Partner-Clubs diese Woche:',
  },
  pt: {
    tocLabel: 'Noites da Semana',
    eyebrow: 'PROGRAMAÇÃO SEMANAL · ATUALIZADA',
    title: 'Todas as Noites da Semana em Programa',
    subtitle: 'Festas semanais fixas e datas especiais confirmadas para os próximos 7 dias a partir de hoje.',
    allDaysLabel: 'Toda a Semana',
    tonightBadge: 'HOJE À NOITE',
    specialDateBadge: 'DATA ESPECIAL',
    weeklyNightBadge: 'SEMANAL',
    fromPrice: 'Desde',
    uponRequest: 'Sob consulta WA',
    bookWhatsAppCta: 'Reservar no WhatsApp',
    openEventSheetCta: 'Ver Evento',
    prevSlideAria: 'Noites anteriores',
    nextSlideAria: 'Próximas noites',
    winterNoticeBadge: 'ARENA DE VERÃO SAN SIRO',
    winterNoticeTitle: 'Pausa de Inverno · Apenas Eventos Especiais',
    winterNoticeBody: 'O Aria Club funciona semanalmente de maio a setembro e abre no inverno apenas para grandes eventos como o Réveillon 2027.',
    winterPartnerLabel: 'Clubs Parceiros Abertos Esta Semana:',
  },
  nl: {
    tocLabel: 'Avonden van de Week',
    eyebrow: 'WEEKPROGRAMMA · DAGELIJKS BIJGEWERKT',
    title: 'Alle Geplande Clubavonden van de Week',
    subtitle: 'Alle wekelijkse clubavonden en speciale evenementen voor de komende 7 nachten vanaf vanavond.',
    allDaysLabel: 'Hele Week',
    tonightBadge: 'VANAVOND',
    specialDateBadge: 'SPECIALE DATUM',
    weeklyNightBadge: 'WEKELIJKS',
    fromPrice: 'Vanaf',
    uponRequest: 'Op aanvraag WA',
    bookWhatsAppCta: 'Boek via WhatsApp',
    openEventSheetCta: 'Bekijk Event',
    prevSlideAria: 'Vorige avonden',
    nextSlideAria: 'Volgende avonden',
    winterNoticeBadge: 'ZOMERPARK SAN SIRO',
    winterNoticeTitle: 'Winterstop · Alleen Speciale Evenementen',
    winterNoticeBody: 'Aria Club draait zijn wekelijkse zomerprogramma van mei tot september en opent in de winter enkel voor speciale edities zoals Oud & Nieuw 2027.',
    winterPartnerLabel: 'Geopende Partnerclubs Deze Week:',
  },
  ru: {
    tocLabel: 'Вечеринки недели',
    eyebrow: 'РАСПИСАНИЕ НЕДЕЛИ · ОБНОВЛЯЕТСЯ ЕЖЕДНЕВНО',
    title: 'Все запланированные вечеринки недели',
    subtitle: 'Еженедельные резидентские ночи и специальные события на ближайшие 7 дней начиная с сегодняшнего вечера.',
    allDaysLabel: 'Вся неделя',
    tonightBadge: 'СЕГОДНЯ',
    specialDateBadge: 'СПЕЦСОБЫТИЕ',
    weeklyNightBadge: 'КАЖДУЮ НЕДЕЛЮ',
    fromPrice: 'От',
    uponRequest: 'По запросу WA',
    bookWhatsAppCta: 'Бронь в WhatsApp',
    openEventSheetCta: 'Подробнее',
    prevSlideAria: 'Предыдущие ночи',
    nextSlideAria: 'Следующие ночи',
    winterNoticeBadge: 'ЛЕТНЯЯ АРЕНА САН-СИРО',
    winterNoticeTitle: 'Зимний перерыв · Только специальные события',
    winterNoticeBody: 'Еженедельный сезон Aria Club проходит с мая по сентябрь; зимой клуб открывается только для крупных спецпроектов, включая Новый год 2027.',
    winterPartnerLabel: 'Открытые клубы-партнёры на этой неделе:',
  },
  tr: {
    tocLabel: 'Haftanın Geceleri',
    eyebrow: 'HAFTALIK PROGRAM · GÜNLÜK GÜNCELLENİR',
    title: 'Haftanın Planlanan Tüm Kulüp Geceleri',
    subtitle: 'Bu geceden itibaren önümüzdeki 7 günün tüm haftalık ve özel etkinlikleri.',
    allDaysLabel: 'Tüm Hafta',
    tonightBadge: 'BU GECE',
    specialDateBadge: 'ÖZEL TARİH',
    weeklyNightBadge: 'HER HAFTA',
    fromPrice: 'Başlangıç',
    uponRequest: 'WhatsApp Bilgi',
    bookWhatsAppCta: 'WhatsApp Rezervasyon',
    openEventSheetCta: 'Etkinlik Detayı',
    prevSlideAria: 'Önceki geceler',
    nextSlideAria: 'Sonraki geceler',
    winterNoticeBadge: 'YAZLIK SAN SIRO KULÜBÜ',
    winterNoticeTitle: 'Kış Arası · Yalnızca Özel Etkinlikler',
    winterNoticeBody: 'Aria Club haftalık sezonunu Mayıs–Eylül arasında sürdürür; kışın yalnızca Yılbaşı 2027 gibi özel gecelerde açılır.',
    winterPartnerLabel: 'Bu Hafta Açık Partner Kulüpler:',
  },
  zh: {
    tocLabel: '本周派对日程',
    eyebrow: '每周节目单 · 每日更新',
    title: '本周全部预定派对之夜',
    subtitle: '从今晚开始的未来7天常驻派对与特别嘉宾活动一览。',
    allDaysLabel: '整周全部',
    tonightBadge: '今晚举行',
    specialDateBadge: '特别专场',
    weeklyNightBadge: '每周常驻',
    fromPrice: '起价',
    uponRequest: 'WhatsApp咨询',
    bookWhatsAppCta: 'WhatsApp预订',
    openEventSheetCta: '查看详情',
    prevSlideAria: '上一组派对',
    nextSlideAria: '下一组派对',
    winterNoticeBadge: '圣西罗夏季露天俱乐部',
    winterNoticeTitle: '冬季休整 · 仅开放特别大型活动',
    winterNoticeBody: 'Aria Club 常驻户外季为5月至9月；秋冬季仅在2027跨年晚宴派对等大型特别活动期间开放。',
    winterPartnerLabel: '本周营业的合作俱乐部：',
  },
  ar: {
    tocLabel: 'سهرات الأسبوع',
    eyebrow: 'البرنامج الأسبوعي · تحديث يومي',
    title: 'جميع سهرات الأسبوع المجدولة',
    subtitle: 'كافة الحفلات الأسبوعية والفعاليات الخاصة للأيام السبعة القادمة ابتداءً من الليلة.',
    allDaysLabel: 'كل الأسبوع',
    tonightBadge: 'الليلة',
    specialDateBadge: 'حفل خاص',
    weeklyNightBadge: 'أسبوعياً',
    fromPrice: 'من',
    uponRequest: 'عبر واتساب',
    bookWhatsAppCta: 'احجز عبر واتساب',
    openEventSheetCta: 'تفاصيل السهرة',
    prevSlideAria: 'السهرات السابقة',
    nextSlideAria: 'السهرات التالية',
    winterNoticeBadge: 'نادي سان سيرو الصيفي',
    winterNoticeTitle: 'إغلاق شتوي · يفتح للفعاليات الخاصة فقط',
    winterNoticeBody: 'يعمل نادي Aria خلال الموسم الصيفي من مايو إلى سبتمبر، ويفتح شتاءً فقط للفعاليات الكبرى مثل ليلة رأس السنة 2027.',
    winterPartnerLabel: 'النوادي الشريكة المفتوحة هذا الأسبوع:',
  },
  bg: {
    tocLabel: 'Партита за седмицата',
    eyebrow: 'СЕДМИЧНА ПРОГРАМА · АКТУАЛНА',
    title: 'Всички планирани вечери за седмицата',
    subtitle: 'Седмични резидентски партита и специални дати за следващите 7 нощи от тази вечер.',
    allDaysLabel: 'Цялата седмица',
    tonightBadge: 'ТАЗИ ВЕЧЕР',
    specialDateBadge: 'СПЕЦИАЛНА ДАТА',
    weeklyNightBadge: 'ВСЯКА СЕДМИЦА',
    fromPrice: 'От',
    uponRequest: 'Запитване в WA',
    bookWhatsAppCta: 'Резервирай в WhatsApp',
    openEventSheetCta: 'Детайли за събитието',
    prevSlideAria: 'Предишни вечери',
    nextSlideAria: 'Следващи вечери',
    winterNoticeBadge: 'ЛЕТЕН ПАРК КЛУБ САН СИРО',
    winterNoticeTitle: 'Зимна пауза · Само специални събития',
    winterNoticeBody: 'Aria Club работи ежеседмично от май до септември, а през зимата отваря само за специални събития като Нова година 2027.',
    winterPartnerLabel: 'Отворени партньорски клубове тази седмица:',
  },
  hr: {
    tocLabel: 'Večeri u tjednu',
    eyebrow: 'TJEDNI PROGRAM · DNEVNO AŽURIRANO',
    title: 'Sve najavljene večeri tjedna',
    subtitle: 'Tjedni klupski program i posebni događaji za sljedećih 7 noći počevši od večeras.',
    allDaysLabel: 'Cijeli tjedan',
    tonightBadge: 'VEČERAS',
    specialDateBadge: 'POSEBNI DATUM',
    weeklyNightBadge: 'SVAKI TJEDAN',
    fromPrice: 'Od',
    uponRequest: 'Upit na WA',
    bookWhatsAppCta: 'Rezerviraj na WhatsApp',
    openEventSheetCta: 'Detalji večeri',
    prevSlideAria: 'Prethodne večeri',
    nextSlideAria: 'Sljedeće večeri',
    winterNoticeBadge: 'LJETNI KLUB SAN SIRO',
    winterNoticeTitle: 'Zimska stanka · Samo posebni događaji',
    winterNoticeBody: 'Aria Club održava tjedni program od svibnja do rujna, a zimi se otvara samo za posebne događaje poput Nove godine 2027.',
    winterPartnerLabel: 'Partnerski klubovi otvoreni ovaj tjedan:',
  },
  cs: {
    tocLabel: 'Večery týdne',
    eyebrow: 'TÝDENNÍ PROGRAM · DENNĚ AKTUALIZOVÁNO',
    title: 'Všechny plánované večery týdne',
    subtitle: 'Pravidelné klubové noci a speciální akce na příštích 7 dní počínaje dnešním večerem.',
    allDaysLabel: 'Celý týden',
    tonightBadge: 'DNES VEČER',
    specialDateBadge: 'SPECIÁLNÍ AKCE',
    weeklyNightBadge: 'KAŽDÝ TÝDEN',
    fromPrice: 'Od',
    uponRequest: 'Dotaz přes WA',
    bookWhatsAppCta: 'Rezervace WhatsApp',
    openEventSheetCta: 'Detail akce',
    prevSlideAria: 'Předchozí večery',
    nextSlideAria: 'Další večery',
    winterNoticeBadge: 'LETNÍ AREÁL SAN SIRO',
    winterNoticeTitle: 'Zimní přestávka · Pouze speciální akce',
    winterNoticeBody: 'Aria Club funguje pravidelně od května do září a v zimě otevírá výhradně pro mimořádné akce jako Silvestr 2027.',
    winterPartnerLabel: 'Otevřené partnerské kluby tento týden:',
  },
  da: {
    tocLabel: 'Ugens klubaftener',
    eyebrow: 'UGEPROGRAM · OPDATERET DAGLIGT',
    title: 'Alle planlagte aftener i denne uge',
    subtitle: 'Fast ugeprogram og særarrangementer for de kommende 7 nætter fra i aften.',
    allDaysLabel: 'Hele ugen',
    tonightBadge: 'I AFTEN',
    specialDateBadge: 'SÆREVENT',
    weeklyNightBadge: 'HVER UGE',
    fromPrice: 'Fra',
    uponRequest: 'Spørg på WA',
    bookWhatsAppCta: 'Book via WhatsApp',
    openEventSheetCta: 'Se event',
    prevSlideAria: 'Forrige aftener',
    nextSlideAria: 'Næste aftener',
    winterNoticeBadge: 'SOMMERKLUB VED SAN SIRO',
    winterNoticeTitle: 'Vinterpause · Kun særlige events',
    winterNoticeBody: 'Aria Club holder åbent ugentligt fra maj til september og åbner om vinteren kun til store events som Nytårsaften 2027.',
    winterPartnerLabel: 'Åbne partnerklubber i denne uge:',
  },
  et: {
    tocLabel: 'Nädala peod',
    eyebrow: 'NÄDALAKAVA · IGAPÄEVASELT UUENDATUD',
    title: 'Kõik nädala kavandatud klubiõhtud',
    subtitle: 'Iganädalased peod ja eriüritused järgmiseks 7 ööks alates tänasest õhtust.',
    allDaysLabel: 'Kogu nädal',
    tonightBadge: 'TÄNA ÕHTUL',
    specialDateBadge: 'ERIÜRITUS',
    weeklyNightBadge: 'IGA NÄDAL',
    fromPrice: 'Alates',
    uponRequest: 'Küsi WA kaudu',
    bookWhatsAppCta: 'Broneeri WhatsAppis',
    openEventSheetCta: 'Ürituse info',
    prevSlideAria: 'Eelmised õhtud',
    nextSlideAria: 'Järgmised õhtud',
    winterNoticeBadge: 'SAN SIRO SUVEKLUBI',
    winterNoticeTitle: 'Talvepaus · Ainult eriüritused',
    winterNoticeBody: 'Aria Club tegutseb iganädalaselt maist septembrini ning avab talvel uksed vaid suurüritusteks nagu aastavahetus 2027.',
    winterPartnerLabel: 'Sel nädalal avatud partnerklubid:',
  },
  fi: {
    tocLabel: 'Viikon klubi-illat',
    eyebrow: 'VIIKKO-OHJELMA · PÄIVITETÄÄN PÄIVITTÄIN',
    title: 'Kaikki viikon suunnitellut illat',
    subtitle: 'Viikoittaiset klubi-illat ja erikoistapahtumat seuraaville 7 yölle tästä illasta alkaen.',
    allDaysLabel: 'Koko viikko',
    tonightBadge: 'TÄNÄÄN',
    specialDateBadge: 'ERIKOISILTA',
    weeklyNightBadge: 'VIIKOITTAIN',
    fromPrice: 'Alk.',
    uponRequest: 'Kysy WA:ssa',
    bookWhatsAppCta: 'Varaa WhatsAppissa',
    openEventSheetCta: 'Tapahtuman tiedot',
    prevSlideAria: 'Edelliset illat',
    nextSlideAria: 'Seuraavat illat',
    winterNoticeBadge: 'SAN SIRON KESÄKLUBI',
    winterNoticeTitle: 'Talvitauko · Vain erikoistapahtumat',
    winterNoticeBody: 'Aria Club on avoinna viikoittain toukokuusta syyskuuhun ja talvella vain suurtapahtumissa kuten uusivuosi 2027.',
    winterPartnerLabel: 'Avoinna olevat kumppaniklubit tällä viikolla:',
  },
  el: {
    tocLabel: 'Βραδιές της Εβδομάδας',
    eyebrow: 'ΕΒΔΟΜΑΔΙΑΙΟ ΠΡΟΓΡΑΜΜΑ · ΚΑΘΗΜΕΡΙΝΗ ΕΝΗΜΕΡΩΣΗ',
    title: 'Όλες οι Προγραμματισμένες Βραδιές της Εβδομάδας',
    subtitle: 'Όλα τα εβδομαδιαία πάρτι και οι ειδικές εκδηλώσεις των επόμενων 7 ημερών από απόψε.',
    allDaysLabel: 'Όλη η Εβδομάδα',
    tonightBadge: 'ΑΠΟΨΕ',
    specialDateBadge: 'ΕΙΔΙΚΗ ΒΡΑΔΙΑ',
    weeklyNightBadge: 'ΚΑΘΕ ΕΒΔΟΜΑΔΑ',
    fromPrice: 'Από',
    uponRequest: 'Μέσω WhatsApp',
    bookWhatsAppCta: 'Κράτηση στο WhatsApp',
    openEventSheetCta: 'Λεπτομέρειες',
    prevSlideAria: 'Προηγούμενες βραδιές',
    nextSlideAria: 'Επόμενες βραδιές',
    winterNoticeBadge: 'ΚΑΛΟΚΑΙΡΙΝΟ ΚΛΑΜΠ SAN SIRO',
    winterNoticeTitle: 'Χειμερινή Παύση · Μόνο Ειδικές Εκδηλώσεις',
    winterNoticeBody: 'Το Aria Club λειτουργεί εβδομαδιαία από Μάιο έως Σεπτέμβριο και τον χειμώνα ανοίγει μόνο για μεγάλες βραδιές όπως η Πρωτοχρονιά 2027.',
    winterPartnerLabel: 'Ανοιχτά Συνεργαζόμενα Κλαμπ Αυτή την Εβδομάδα:',
  },
  hu: {
    tocLabel: 'A hét bulijai',
    eyebrow: 'HETI PROGRAM · NAPONTA FRISSÍTVE',
    title: 'A hét összes meghirdetett klubestje',
    subtitle: 'Állandó heti estek és különleges események a következő 7 napra ma estétől.',
    allDaysLabel: 'Egész hét',
    tonightBadge: 'MA ESTE',
    specialDateBadge: 'KÜLÖNLEGES EST',
    weeklyNightBadge: 'MINDEN HÉTEN',
    fromPrice: 'Ár:',
    uponRequest: 'WA ajánlat',
    bookWhatsAppCta: 'Foglalás WhatsAppon',
    openEventSheetCta: 'Esemény részletei',
    prevSlideAria: 'Előző esték',
    nextSlideAria: 'Következő esték',
    winterNoticeBadge: 'SAN SIRO NYÁRI KLUB',
    winterNoticeTitle: 'Téli szünet · Csak kiemelt eseményekkor nyitva',
    winterNoticeBody: 'Az Aria Club májustól szeptemberig tart heti nyitvatartást, télen kizárólag kiemelt eseményekre (pl. Szilveszter 2027) nyit ki.',
    winterPartnerLabel: 'Nyitva tartó partnerklubok ezen a héten:',
  },
  ga: {
    tocLabel: 'Oícheanta na Seachtaine',
    eyebrow: 'SCEIDEAL SEACHTAINIÚIL · NUASHONRAITHE GO LAETHÚIL',
    title: 'Gach Oíche atá Beartaithe don tSeachtain Seo',
    subtitle: 'Oícheanta rialta seachtainiúla agus imeachtaí speisialta do na 7 n-oíche amach romhainn ó anocht.',
    allDaysLabel: 'An tSeachtain Uile',
    tonightBadge: 'ANOCHT',
    specialDateBadge: 'DÁTA SPEISIALTA',
    weeklyNightBadge: 'GACH SEACHTAIN',
    fromPrice: 'Ó',
    uponRequest: 'Fiosraigh ar WA',
    bookWhatsAppCta: 'Áirithint ar WhatsApp',
    openEventSheetCta: 'Sonraí na hOíche',
    prevSlideAria: 'Oícheanta roimhe',
    nextSlideAria: 'Na chéad oícheanta eile',
    winterNoticeBadge: 'IONAD SAMHRAIDH SAN SIRO',
    winterNoticeTitle: 'Sos Geimhridh · Dátaí Speisialta Amháin',
    winterNoticeBody: 'Feidhmíonn Aria Club a shéasúr samhraidh ó Bhealtaine go Meán Fómhair agus osclaíonn sé sa gheimhreadh d’ócáidí móra ar nós Oíche Chinn Bhliana 2027 amháin.',
    winterPartnerLabel: 'Clubanna Comhpháirtíochta Oscailte an tSeachtain Seo:',
  },
  lv: {
    tocLabel: 'Nedēļas vakari',
    eyebrow: 'NEDĒĻAS PROGRAMMA · ATJAUNOTA KATRU DIENU',
    title: 'Visi ieplānotie nedēļas klubu vakari',
    subtitle: 'Iknedēļas rezidentu naktis un īpašie pasākumi tuvākajām 7 dienām sākot ar šovakar.',
    allDaysLabel: 'Visa nedēļa',
    tonightBadge: 'ŠOVAKAR',
    specialDateBadge: 'ĪPAŠS DATUMS',
    weeklyNightBadge: 'KATRU NEDĒĻU',
    fromPrice: 'No',
    uponRequest: 'Pieprasīt WA',
    bookWhatsAppCta: 'Rezervēt WhatsApp',
    openEventSheetCta: 'Pasākuma detaļas',
    prevSlideAria: 'Iepriekšējie vakari',
    nextSlideAria: 'Nākamie vakari',
    winterNoticeBadge: 'SAN SIRO VASARAS KLUBS',
    winterNoticeTitle: 'Ziemas pārtraukums · Tikai īpaši pasākumi',
    winterNoticeBody: 'Aria Club iknedēļas sezona ilgst no maija līdz septembrim; ziemā klubs atveras tikai lieliem pasākumiem kā Jaunais gads 2027.',
    winterPartnerLabel: 'Šonedēļ atvērtie partneru klubi:',
  },
  lt: {
    tocLabel: 'Savaitės vakarėliai',
    eyebrow: 'SAVAITĖS PROGRAMA · ATNAUJINAMA KASDIEN',
    title: 'Visi suplanuoti savaitės vakarai',
    subtitle: 'Kassavaitiniai vakarėliai ir specialūs renginiai artimiausioms 7 naktims nuo šio vakaro.',
    allDaysLabel: 'Visa savaitė',
    tonightBadge: 'ŠĮ VAKARĄ',
    specialDateBadge: 'SPECIALI DATA',
    weeklyNightBadge: 'KAS SAVAITĘ',
    fromPrice: 'Nuo',
    uponRequest: 'Teirautis WA',
    bookWhatsAppCta: 'Rezervuoti per WhatsApp',
    openEventSheetCta: 'Renginio informacija',
    prevSlideAria: 'Ankstesni vakarai',
    nextSlideAria: 'Kiti vakarai',
    winterNoticeBadge: 'SAN SIRO VASAROS KLUBAS',
    winterNoticeTitle: 'Žiemos pertrauka · Tik specialūs renginiai',
    winterNoticeBody: 'Aria Club savaitės sezonas vyksta nuo gegužės iki rugsėjo, o žiemą duris atveria tik ypatingomis progomis, pavyzdžiui, Naujiesiems metams 2027.',
    winterPartnerLabel: 'Šią savaitę dirbantys partnerių klubai:',
  },
  mt: {
    tocLabel: 'Serati tal-Ġimgħa',
    eyebrow: 'PROGRAMM FIL-ĠIMGĦA · AĠĠORNAT KULJUM',
    title: 'Is-Serati Kollha Skedati għal Din il-Ġimgħa',
    subtitle: 'Is-serati fissi ta’ kull ġimgħa u d-dati speċjali għas-7 iljieli li ġejjin mil-lejla.',
    allDaysLabel: 'Il-Ġimgħa Kollha',
    tonightBadge: 'ILLEJLA',
    specialDateBadge: 'DATA SPEĊJALI',
    weeklyNightBadge: 'KULL ĠIMGĦA',
    fromPrice: 'Minn',
    uponRequest: 'Mistoqsija WA',
    bookWhatsAppCta: 'Ibbukkja fuq WhatsApp',
    openEventSheetCta: 'Dettalji tas-Serata',
    prevSlideAria: 'Serati ta’ qabel',
    nextSlideAria: 'Serati li jmiss',
    winterNoticeBadge: 'KLABB TAS-SAJF SAN SIRO',
    winterNoticeTitle: 'Waqfa tax-Xitwa · Avvenimenti Speċjali Biss',
    winterNoticeBody: 'Aria Club jopera l-istaġun tas-sajf minn Mejju sa Settembru u jiftaħ fix-xitwa biss għal avvenimenti kbar bħall-Ewwel tas-Sena 2027.',
    winterPartnerLabel: 'Klabbs Imsieħba Miftuħa Din il-Ġimgħa:',
  },
  pl: {
    tocLabel: 'Imprezy tygodnia',
    eyebrow: 'PROGRAM TYGODNIA · CODZIENNA AKTUALIZACJA',
    title: 'Wszystkie zaplanowane noce w tym tygodniu',
    subtitle: 'Stałe imprezy cotygodniowe i wydarzenia specjalne na najbliższe 7 nocy od dziś wieczorem.',
    allDaysLabel: 'Cały tydzień',
    tonightBadge: 'DZIŚ WIECZOREM',
    specialDateBadge: 'DATA SPECJALNA',
    weeklyNightBadge: 'CO TYDZIEŃ',
    fromPrice: 'Od',
    uponRequest: 'Zapytaj na WA',
    bookWhatsAppCta: 'Rezerwuj przez WhatsApp',
    openEventSheetCta: 'Szczegóły imprezy',
    prevSlideAria: 'Poprzednie noce',
    nextSlideAria: 'Kolejne noce',
    winterNoticeBadge: 'LETNI KLUB PARKOWY SAN SIRO',
    winterNoticeTitle: 'Przerwa zimowa · Tylko wydarzenia specjalne',
    winterNoticeBody: 'Aria Club prowadzi sezon cotygodniowy od maja do września, a zimą otwiera się wyłącznie na wielkie gale, takie jak Sylwester 2027.',
    winterPartnerLabel: 'Kluby partnerskie otwarte w tym tygodniu:',
  },
  ro: {
    tocLabel: 'Serile săptămânii',
    eyebrow: 'PROGRAM SĂPTĂMÂNAL · ACTUALIZAT ZILNIC',
    title: 'Toate serile săptămânii din program',
    subtitle: 'Petreceri săptămânale rezidente și evenimente speciale pentru următoarele 7 nopți începând din această seară.',
    allDaysLabel: 'Toată săptămâna',
    tonightBadge: 'DISERĂ',
    specialDateBadge: 'DATĂ SPECIALĂ',
    weeklyNightBadge: 'SĂPTĂMÂNAL',
    fromPrice: 'De la',
    uponRequest: 'Detalii pe WA',
    bookWhatsAppCta: 'Rezervă pe WhatsApp',
    openEventSheetCta: 'Detalii eveniment',
    prevSlideAria: 'Serile anterioare',
    nextSlideAria: 'Serile următoare',
    winterNoticeBadge: 'CLUB DE VARĂ SAN SIRO',
    winterNoticeTitle: 'Pauză de iarnă · Deschis doar la evenimente speciale',
    winterNoticeBody: 'Aria Club organizează sezonul săptămânal din mai până în septembrie, iar iarna se deschide exclusiv pentru gale speciale precum Revelion 2027.',
    winterPartnerLabel: 'Cluburi partenere deschise săptămâna aceasta:',
  },
  sk: {
    tocLabel: 'Večery týždňa',
    eyebrow: 'TÝŽDENNÝ PROGRAM · DENNE AKTUALIZOVANÉ',
    title: 'Všetky plánované večery týždňa',
    subtitle: 'Pravidelné klubové noci a špeciálne podujatia na najbližších 7 dní od dnešného večera.',
    allDaysLabel: 'Celý týždeň',
    tonightBadge: 'DNES VEČER',
    specialDateBadge: 'ŠPECIÁLNY DÁTUM',
    weeklyNightBadge: 'KAŽDÝ TÝŽDEŇ',
    fromPrice: 'Od',
    uponRequest: 'Dopyt cez WA',
    bookWhatsAppCta: 'Rezervácia WhatsApp',
    openEventSheetCta: 'Detail podujatia',
    prevSlideAria: 'Predchádzajúce večery',
    nextSlideAria: 'Ďalšie večery',
    winterNoticeBadge: 'LETNÝ KLUB SAN SIRO',
    winterNoticeTitle: 'Zimná prestávka · Iba špeciálne podujatia',
    winterNoticeBody: 'Aria Club prevádzkuje týždennú sezónu od mája do septembra a v zime otvára len počas veľkých podujatí ako Silvester 2027.',
    winterPartnerLabel: 'Otvorené partnerské kluby tento týždeň:',
  },
  sl: {
    tocLabel: 'Večeri tedna',
    eyebrow: 'TEDENSKI PROGRAM · DNEVNO POSODOBLJENO',
    title: 'Vsi načrtovani klubski večeri tedna',
    subtitle: 'Redni tedenski večeri in posebni dogodki za naslednjih 7 noči od nocoj naprej.',
    allDaysLabel: 'Cel teden',
    tonightBadge: 'NOCOJ',
    specialDateBadge: 'POSEBNI DOGODEK',
    weeklyNightBadge: 'VSAK TEDEN',
    fromPrice: 'Od',
    uponRequest: 'Povpraševanje WA',
    bookWhatsAppCta: 'Rezerviraj prek WhatsApp',
    openEventSheetCta: 'Podrobnosti dogodka',
    prevSlideAria: 'Prejšnji večeri',
    nextSlideAria: 'Naslednji večeri',
    winterNoticeBadge: 'POLETNI KLUB SAN SIRO',
    winterNoticeTitle: 'Zimski premor · Odprto le za posebne dogodke',
    winterNoticeBody: 'Aria Club izvaja tedenski program od maja do septembra, pozimi pa se odpre le ob posebnih dogodkih, kot je Silvestrovanje 2027.',
    winterPartnerLabel: 'Odprti partnerski klubi ta teden:',
  },
  sv: {
    tocLabel: 'Veckans klubbkvällar',
    eyebrow: 'VECKOPROGRAM · UPPDATERAS DAGLIGEN',
    title: 'Alla planerade kvällar i veckan',
    subtitle: 'Stående veckokvällar och specialdatum för de kommande 7 nätterna från ikväll.',
    allDaysLabel: 'Hela veckan',
    tonightBadge: 'IKVÄLL',
    specialDateBadge: 'SPECIALDATUM',
    weeklyNightBadge: 'VARJE VECKA',
    fromPrice: 'Från',
    uponRequest: 'Fråga på WA',
    bookWhatsAppCta: 'Boka via WhatsApp',
    openEventSheetCta: 'Visa event',
    prevSlideAria: 'Föregående kvällar',
    nextSlideAria: 'Nästa kvällar',
    winterNoticeBadge: 'SOMMARKLUBB VID SAN SIRO',
    winterNoticeTitle: 'Vinteruppehåll · Endast specialevenemang',
    winterNoticeBody: 'Aria Club kör sitt veckoprogram maj till september och öppnar under vintern endast för stora specialkvällar som Nyårsafton 2027.',
    winterPartnerLabel: 'Öppna partnerklubbar denna vecka:',
  },
  no: {
    tocLabel: 'Ukens klubbkvelder',
    eyebrow: 'UKEPROGRAM · OPPDATERT DAGLIG',
    title: 'Alle planlagte kvelder denne uken',
    subtitle: 'Faste ukentlige klubbkvelder og spesialdatoer for de neste 7 nettene fra i kveld.',
    allDaysLabel: 'Hele uken',
    tonightBadge: 'I KVELD',
    specialDateBadge: 'SPESIALDATO',
    weeklyNightBadge: 'HVER UKE',
    fromPrice: 'Fra',
    uponRequest: 'Spør på WA',
    bookWhatsAppCta: 'Bestill på WhatsApp',
    openEventSheetCta: 'Se arrangement',
    prevSlideAria: 'Forrige kvelder',
    nextSlideAria: 'Neste kvelder',
    winterNoticeBadge: 'SOMMERKLUBB VED SAN SIRO',
    winterNoticeTitle: 'Vinterpause · Kun spesielle arrangementer',
    winterNoticeBody: 'Aria Club holder åpent ukentlig fra mai til september, og åpner om vinteren kun for store arrangementer som Nyttårsaften 2027.',
    winterPartnerLabel: 'Åpne partnerklubber denne uken:',
  },
  is: {
    tocLabel: 'Kvöld vikunnar',
    eyebrow: 'VIKUDAGSKRÁ · UPPFÆRT DAGLEGA',
    title: 'Öll áætluð klúbbakvöld vikunnar',
    subtitle: 'Föst vikukvöld og sérviðburðir næstu 7 nætur frá og með kvöldinu í kvöld.',
    allDaysLabel: 'Öll vikan',
    tonightBadge: 'Í KVÖLD',
    specialDateBadge: 'SÉRVIÐBURÐUR',
    weeklyNightBadge: 'Í HVERRI VIKU',
    fromPrice: 'Frá',
    uponRequest: 'Fyrirspurn á WA',
    bookWhatsAppCta: 'Bóka á WhatsApp',
    openEventSheetCta: 'Skoða viðburð',
    prevSlideAria: 'Fyrri kvöld',
    nextSlideAria: 'Næstu kvöld',
    winterNoticeBadge: 'SUMARKLÚBBUR SAN SIRO',
    winterNoticeTitle: 'Vetrarhlé · Aðeins sérviðburðir',
    winterNoticeBody: 'Aria Club starfar vikulega frá maí til september og opnar á veturna eingöngu fyrir stórviðburði á borð við Gamlárskvöld 2027.',
    winterPartnerLabel: 'Opnir samstarfsklúbbar í þessari viku:',
  },
  uk: {
    tocLabel: 'Вечірки тижня',
    eyebrow: 'РОЗКЛАД ТИЖНЯ · ЩОДЕННЕ ОНОВЛЕННЯ',
    title: 'Усі заплановані вечірки тижня',
    subtitle: 'Щотижневі резидентські ночі та спеціальні події на найближчі 7 днів починаючи з сьогоднішнього вечора.',
    allDaysLabel: 'Увесь тиждень',
    tonightBadge: 'СЬОГОДНІ',
    specialDateBadge: 'СПЕЦПОДІЯ',
    weeklyNightBadge: 'ЩОТИЖНЯ',
    fromPrice: 'Від',
    uponRequest: 'Запит у WA',
    bookWhatsAppCta: 'Бронювати у WhatsApp',
    openEventSheetCta: 'Деталі події',
    prevSlideAria: 'Попередні ночі',
    nextSlideAria: 'Наступні ночі',
    winterNoticeBadge: 'ЛІТНЯ АРЕНА САН-СІРО',
    winterNoticeTitle: 'Зимова перерва · Лише спеціальні події',
    winterNoticeBody: 'Aria Club проводить щотижневий сезон з травня по вересень, а взимку відкривається лише для великих подій, як-от Новий рік 2027.',
    winterPartnerLabel: 'Відкриті клуби-партнери цього тижня:',
  },
  sq: {
    tocLabel: 'Mbrëmjet e Javës',
    eyebrow: 'PROGRAMI JAVOR · PËRDITËSUAR ÇDO DITË',
    title: 'Të Gjitha Mbrëmjet e Javës në Program',
    subtitle: 'Mbrëmjet e përhershme javore dhe eventet speciale për 7 netët e ardhshme duke filluar nga sonte.',
    allDaysLabel: 'Gjithë Java',
    tonightBadge: 'SONTE',
    specialDateBadge: 'DATË SPECIALE',
    weeklyNightBadge: 'ÇDO JAVË',
    fromPrice: 'Nga',
    uponRequest: 'Pyet në WA',
    bookWhatsAppCta: 'Rezervo në WhatsApp',
    openEventSheetCta: 'Detajet e Eventit',
    prevSlideAria: 'Mbrëmjet e mëparshme',
    nextSlideAria: 'Mbrëmjet pasuese',
    winterNoticeBadge: 'KLUB VEROR SAN SIRO',
    winterNoticeTitle: 'Pushim Dimëror · Vetëm Evente Speciale',
    winterNoticeBody: 'Aria Club zhvillon sezonin javor nga maji në shtator dhe gjatë dimrit hapet vetëm për evente të mëdha si Viti i Ri 2027.',
    winterPartnerLabel: 'Klubet Partnere të Hapura Këtë Javë:',
  },
  sr: {
    tocLabel: 'Večeri ove nedelje',
    eyebrow: 'NEDELJNI PROGRAM · DNEVNO AŽURIRANO',
    title: 'Sve planirane večeri u toku nedelje',
    subtitle: 'Stalne nedeljne žurke i specijalni datumi za narednih 7 noći počevši od večeras.',
    allDaysLabel: 'Cela nedelja',
    tonightBadge: 'VEČERAS',
    specialDateBadge: 'SPECIJALNI DATUM',
    weeklyNightBadge: 'SVAKE NEDELJE',
    fromPrice: 'Od',
    uponRequest: 'Upit na WA',
    bookWhatsAppCta: 'Rezerviši na WhatsApp',
    openEventSheetCta: 'Detalji večeri',
    prevSlideAria: 'Prethodne večeri',
    nextSlideAria: 'Sledeće večeri',
    winterNoticeBadge: 'LETNJI KLUB SAN SIRO',
    winterNoticeTitle: 'Zimska pauza · Samo specijalni događaji',
    winterNoticeBody: 'Aria Club radi svake nedelje od maja do septembra, a zimi se otvara isključivo za velike događaje poput Nove godine 2027.',
    winterPartnerLabel: 'Otvoreni partnerski klubovi ove nedelje:',
  },
  bs: {
    tocLabel: 'Večeri u sedmici',
    eyebrow: 'SEDMIČNI PROGRAM · DNEVNO AŽURIRANO',
    title: 'Sve planirane večeri u sedmici',
    subtitle: 'Redovne sedmične zabave i specijalni događaji za narednih 7 noći počevši od večeras.',
    allDaysLabel: 'Cijela sedmica',
    tonightBadge: 'VEČERAS',
    specialDateBadge: 'POSEBAN DATUM',
    weeklyNightBadge: 'SVAKE SEDMICE',
    fromPrice: 'Od',
    uponRequest: 'Upit na WA',
    bookWhatsAppCta: 'Rezerviši putem WhatsAppa',
    openEventSheetCta: 'Detalji događaja',
    prevSlideAria: 'Prethodne večeri',
    nextSlideAria: 'Sljedeće večeri',
    winterNoticeBadge: 'LJETNI KLUB SAN SIRO',
    winterNoticeTitle: 'Zimska pauza · Samo posebni događaji',
    winterNoticeBody: 'Aria Club održava sedmični program od maja do septembra, dok se zimi otvara samo za velike događaje poput Nove godine 2027.',
    winterPartnerLabel: 'Otvoreni partnerski klubovi ove sedmice:',
  },
  mk: {
    tocLabel: 'Вечери во неделата',
    eyebrow: 'НЕДЕЛНА ПРОГРАМА · ДНЕВНО АЖУРИРАНО',
    title: 'Сите планирани вечери во текот на неделата',
    subtitle: 'Редовни неделни забави и специјални датуми за следните 7 ноќи почнувајќи од вечерва.',
    allDaysLabel: 'Цела недела',
    tonightBadge: 'ВЕЧЕРВА',
    specialDateBadge: 'СПЕЦИЈАЛЕН ДАТУМ',
    weeklyNightBadge: 'СЕКОЈА НЕДЕЛА',
    fromPrice: 'Од',
    uponRequest: 'Прашај на WA',
    bookWhatsAppCta: 'Резервирај на WhatsApp',
    openEventSheetCta: 'Детали за настанот',
    prevSlideAria: 'Претходни вечери',
    nextSlideAria: 'Следни вечери',
    winterNoticeBadge: 'ЛЕТЕН КЛУБ САН СИРО',
    winterNoticeTitle: 'Зимска пауза · Само специјални настани',
    winterNoticeBody: 'Aria Club работи секоја недела од мај до септември, а во зима се отвора само за големи настани како Нова година 2027.',
    winterPartnerLabel: 'Отворени партнерски клубови оваа недела:',
  },
};

export function getVenueWeeklyHeroUi35(locale: string): VenueWeeklyHeroUi {
  const code = (isEnabledLocale(locale) ? locale : 'en') as LocaleCode;
  return VENUE_WEEKLY_HERO_UI_35[code] || VENUE_WEEKLY_HERO_UI_35.en;
}

function getNightlifeRomeDayOffset(offsetDays: number, baseMs = Date.now()): { dayKey: string; dow: number } {
  // Shift back 5h so 00:00..04:59 in Milan still counts as the ongoing nightlife evening.
  const shiftedNow = new Date(baseMs - 5 * 3600_000);
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(shiftedNow);
  const get = (t: string) => parts.find((p) => p.type === t)?.value || '';
  const [y, m, d] = [Number(get('year')), Number(get('month')), Number(get('day'))];
  const targetUTC = new Date(Date.UTC(y, m - 1, d + offsetDays, 12, 0, 0));
  const dayKey = targetUTC.toISOString().slice(0, 10);
  const dow = targetUTC.getUTCDay();
  return { dayKey, dow };
}

function formatDayShortLabel(dayKey: string, locale: LocaleCode): string {
  const dt = new Date(`${dayKey}T12:00:00Z`);
  try {
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      timeZone: 'UTC',
    }).format(dt);
  } catch {
    return dayKey;
  }
}

function stripPercentages(priceText: string, fallback: string): string {
  const cleaned = priceText
    .replace(/\+?\s*\d+\s*%/g, '')
    .replace(/[\u2014–]/g, ' - ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return cleaned || fallback;
}

export function resolveVenueWeeklyHeroSchedule(
  venue: Venue,
  locale: string,
  sourcePageUrl?: string,
): VenueWeeklyHeroSchedule {
  const locCode = (isEnabledLocale(locale) ? locale : 'en') as LocaleCode;
  const ui = getVenueWeeklyHeroUi35(locCode);
  const lp = localePrefix(locCode);
  const clubsDir = getLocalizedDir35('clubs', locCode);
  const toHref = (enPath: string) => localizeInternalHref(`${lp}${enPath}`, locCode);
  const vName =
    (locCode === 'it' ? venue.localizedContent?.name?.it : venue.localizedContent?.name?.en) ||
    venue.localizedContent?.name?.en ||
    'Club Milano';
  const venueNameLower = vName.toLowerCase();

  const { dayKey: todayRomeKey } = getNightlifeRomeDayOffset(0);
  const currentMonth = Number(todayRomeKey.slice(5, 7));
  const isWinterSeason = currentMonth < 5 || currentMonth > 9;

  // Aria Club Milan winter closure rule (Oct-Apr): show seasonal notice + confirmed special events + open partner clubs
  if (venue.id === 'v-aria' && isWinterSeason) {
    const winterPartners: WinterPartnerChip[] = [
      { name: 'JustMe Milano (7/7)', href: `${lp}/${clubsDir}/${getLocalizedVenueSlug35('v-justme', locCode)}` },
      { name: 'Pineta Milano', href: `${lp}/${clubsDir}/${getLocalizedVenueSlug35('v-pineta', locCode)}` },
      { name: 'Voya Rooftop', href: `${lp}/${clubsDir}/${getLocalizedVenueSlug35('v-voya', locCode)}` },
      { name: '55 Milano', href: `${lp}/${clubsDir}/${getLocalizedVenueSlug35('v-55milano', locCode)}` },
      { name: 'REPVBLIC Milano', href: `${lp}/${clubsDir}/${getLocalizedVenueSlug35('v-repvblic', locCode)}` },
    ];
    const specialCards: VenueWeeklyHeroCard[] = [];
    const capEv = getCapodannoEventForClub('aria-club-milano', venue.localizedContent.name.en);
    if (capEv && !capEv.closedForNye) {
      const capHref = capodannoEventPath(capEv.slug, locCode);
      const dayLabel = formatDayShortLabel('2026-12-31', locCode);
      specialCards.push({
        id: `aria-winter-nye-${capEv.slug}`,
        dayKey: '2026-12-31',
        dayOffset: 30,
        dayPillLabel: dayLabel,
        badgeLabel: `${ui.specialDateBadge} · ${dayLabel}`,
        title: locCode === 'it' ? capEv.titleIt : capEv.titleEn,
        timeLabel: capEv.hours || '20:30 - 05:00',
        priceLabel: capEv.priceFromEur > 0 ? `€${capEv.priceFromEur}` : ui.uponRequest,
        genres: ['Hip-Hop', 'Reggaeton', 'Commercial Hits'],
        imageSrc: toCardPoster4x5(capEv.image || '/images/events/capodanno-2027-posters/capodanno-aria-club-milano.webp'),
        href: capHref,
        whatsappHref: getConciergeBookingUrl(locCode, `${vName} Capodanno 2027`, sourcePageUrl || capHref),
        isSpecialDate: true,
      });
    }
    return {
      mode: 'winter-special',
      todayRomeKey,
      cards: specialCards,
      winterPartners,
    };
  }

  const cards: VenueWeeklyHeroCard[] = [];

  // Match all dated OCTOBER_EVENTS for this venue
  const matchedOctober = OCTOBER_EVENTS.filter((ev) => {
    if (ev.excluded) return false;
    if (ev.id === '251019' || ev.id === '249216' || ev.id === '249217') return false;
    if (ev.venue.id === venue.id) return true;
    if (venue.id === 'v-apollo' && ev.venue.id === 'apollo') return true;
    if (venue.id === 'v-55milano' && ev.venue.id === 'v-55') return true;
    const evVenueLower = ev.venue.name.toLowerCase();
    const cleanV = venueNameLower.replace(/\s+milano?$/i, '').trim();
    const cleanEv = evVenueLower.replace(/\s+milano?$/i, '').trim();
    return cleanV.length >= 5 && cleanEv.length >= 5 && (evVenueLower === venueNameLower || evVenueLower.includes(cleanV));
  }).sort((a, b) => a.startISO.localeCompare(b.startISO));

  // Match weeklyEvents in lib/eventsConfig.ts
  const matchedWeekly = weeklyEvents.filter((w) => {
    if (w.seasonalSummerOnly && isWinterSeason) return false;
    return `v-${w.clubSlug}` === venue.id;
  });

  // Bergamo & Brescia dedicated active nights
  const isBgBs = isBergamoBresciaVenueId(venue.id);
  const nightUi = isBgBs ? getNightUi35(locCode) : null;
  const bgBsNights = isBgBs ? BERGAMO_BRESCIA_ACTIVE_NIGHTS.filter((s) => s.venueId === venue.id) : [];

  const DOW_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

  for (let offset = 0; offset < 7; offset++) {
    const { dayKey, dow } = getNightlifeRomeDayOffset(offset);
    const shortDay = formatDayShortLabel(dayKey, locCode);
    const badgePrefix = offset === 0 ? `${ui.tonightBadge} · ${shortDay}` : shortDay;
    let addedDatedForDay = false;

    // 1a. Special standalone JustMe / Voya / Pineta (Axel Check&Love) dates on this exact dayKey
    if (venue.id === 'v-justme' && dayKey === '2026-11-26') {
      const tgHref = thanksgivingJustMePath(locCode);
      cards.push({
        id: 'hero-thanksgiving-justme-2026',
        dayKey,
        dayOffset: offset,
        dayPillLabel: shortDay,
        badgeLabel: badgePrefix,
        title: 'Thanksgiving 2026 & Vida Loca · American Royal Buffet',
        timeLabel: '19:30 - 05:00',
        priceLabel: '€15',
        genres: ['House', 'Hip-Hop', 'Reggaeton'],
        imageSrc: toCardPoster4x5(THANKSGIVING_JUSTME_POSTER_SRC),
        href: tgHref,
        whatsappHref: getConciergeBookingUrl(locCode, 'Thanksgiving JustMe Milano (26 Nov)', sourcePageUrl || tgHref),
        isSpecialDate: true,
      });
      addedDatedForDay = true;
    }

    if (venue.id === 'v-justme' && dayKey === '2026-11-27') {
      const cspHref = partenopeaJustMePath(locCode);
      cards.push({
        id: 'hero-partenopea-justme-2026',
        dayKey,
        dayOffset: offset,
        dayPillLabel: shortDay,
        badgeLabel: badgePrefix,
        title: locCode === 'it'
          ? 'CSP · Cena Spettacolo Partenopea (Pineta Napoli)'
          : 'CSP · Neapolitan Dinner Show & Party (Pineta Napoli)',
        timeLabel: '19:30 - 05:00',
        priceLabel: '€20 - €70',
        genres: ['Live Show', 'House', 'Commercial'],
        imageSrc: toCardPoster4x5(PARTENOPEA_JUSTME_POSTER_SRC),
        href: cspHref,
        whatsappHref: getConciergeBookingUrl(locCode, 'Cena Spettacolo Partenopea JustMe (27 Nov)', sourcePageUrl || cspHref),
        isSpecialDate: true,
      });
      addedDatedForDay = true;
    }

    if (venue.id === 'v-justme' && dayKey === '2027-01-13') {
      const orthHref = orthodoxNyeJustMePath(locCode);
      const orthBanner = getJustMeOrthodoxRelatedBanner(locCode);
      cards.push({
        id: 'hero-orthodox-justme-2027',
        dayKey,
        dayOffset: offset,
        dayPillLabel: shortDay,
        badgeLabel: badgePrefix,
        title: orthBanner.title,
        timeLabel: '19:30 - 05:00',
        priceLabel: '€20 - €80',
        genres: ['DJ Nazar Radchuk', 'House', 'Hits'],
        imageSrc: toCardPoster4x5(ORTHODOX_NYE_JUSTME_POSTER_SRC),
        href: orthHref,
        whatsappHref: getConciergeBookingUrl(locCode, 'Orthodox NYE JustMe Milano (13 Jan)', sourcePageUrl || orthHref),
        isSpecialDate: true,
      });
      addedDatedForDay = true;
    }

    if (venue.id === 'v-voya' && dayKey === '2026-12-25') {
      const xmasHref = christmasVoyaPath(locCode);
      cards.push({
        id: 'hero-xmas-voya-2026',
        dayKey,
        dayOffset: offset,
        dayPillLabel: shortDay,
        badgeLabel: badgePrefix,
        title: locCode === 'it'
          ? 'Menu di Natale 2026 · Voya Rooftop Milano (20° Piano)'
          : 'Christmas Day Menu 2026 · Voya Rooftop Milan (20th Floor)',
        timeLabel: '12:30 - 02:00',
        priceLabel: '€100',
        genres: ['5-Course Menu', 'Skyline View', 'Lounge'],
        imageSrc: toCardPoster4x5('/images/events/christmas-2026-posters/natale-voya-rooftop-milano-2026.webp'),
        href: xmasHref,
        whatsappHref: getConciergeBookingUrl(locCode, 'Voya Rooftop Natale 25 Dicembre', sourcePageUrl || xmasHref),
        isSpecialDate: true,
      });
      addedDatedForDay = true;
    }

    if (venue.id === 'v-pineta') {
      for (const axEv of AXEL_GROUP_DATED_EVENTS) {
        if (axEv.venueType === 'pineta' && axEv.ymd === dayKey) {
          const slugs35 = axelGroupEventAllSlugs35(axEv.id);
          const slugLoc = slugs35[locCode] || slugs35.en;
          const axHref = `${lp}/${getLocalizedDir35('events', locCode)}/${slugLoc}`;
          cards.push({
            id: `hero-axel-${axEv.id}`,
            dayKey,
            dayOffset: offset,
            dayPillLabel: shortDay,
            badgeLabel: badgePrefix,
            title: locCode === 'it'
              ? 'Check&Love · Aperitivo, Cena Cantata & Serata Club'
              : 'Check&Love · Interactive Dinner Show & Club Night',
            timeLabel: axEv.hours,
            priceLabel: `€${axEv.entryEur}`,
            genres: axEv.genres.slice(0, 3),
            imageSrc: toCardPoster4x5(axEv.card4x5Src || axEv.posterSrc),
            href: axHref,
            whatsappHref: getConciergeBookingUrl(locCode, `Check&Love Pineta Milano (${dayKey})`, sourcePageUrl || axHref),
            isSpecialDate: true,
          });
          addedDatedForDay = true;
        }
      }
    }

    // 1b. Capodanno Dec 31 if within the 7-day rolling window
    if (dayKey === '2026-12-31') {
      const capEv = getCapodannoEventForClub(venue.slugs.en, venue.localizedContent.name.en);
      if (capEv && !capEv.closedForNye && !capEv.soldOutForNye) {
        const capHref = capodannoEventPath(capEv.slug, locCode);
        cards.push({
          id: `hero-nye-${capEv.slug}`,
          dayKey,
          dayOffset: offset,
          dayPillLabel: shortDay,
          badgeLabel: badgePrefix,
          title: locCode === 'it' ? capEv.titleIt : capEv.titleEn,
          timeLabel: capEv.hours || '20:30 - 05:00',
          priceLabel: capEv.priceFromEur > 0 ? `€${capEv.priceFromEur}` : ui.uponRequest,
          genres: ['New Year Gala', 'Countdown', 'VIP Tables'],
          imageSrc: toCardPoster4x5(capEv.image),
          href: capHref,
          whatsappHref: getConciergeBookingUrl(locCode, `${vName} Capodanno 2027`, sourcePageUrl || capHref),
          isSpecialDate: true,
        });
        addedDatedForDay = true;
      }
    }

    // 1c. Dated Xceed / inventory.json events on dayKey
    const dayOctober = matchedOctober.filter((ev) => ev.startISO.slice(0, 10) === dayKey);
    for (const ev of dayOctober) {
      if (venue.id === 'v-justme' && dayKey === '2026-11-27' && addedDatedForDay) {
        // Keep both if distinct title, skip duplicate generic Friday if Partenopea already represents it or show both!
        // Actually showing official Xceed event alongside Partenopea if distinct ID is great unless identical title.
      }
      const slug = getOctoberEventSlug(ev);
      const minOffer = ev.offers.reduce<number>(
        (acc, o) => (typeof o.price === 'number' && o.price > 0 && o.price < acc ? o.price : acc),
        999,
      );
      const rawPrice = minOffer < 999 ? `€${minOffer}` : ui.uponRequest;
      const tStr = ev.startISO.slice(11, 16) || '23:00';
      const endStr = ev.endISO ? ev.endISO.slice(11, 16) : '05:00';
      const cardHref = toHref(`/events/${slug}`);
      const posterSrc = toCardPoster4x5(ev.image?.src || '/images/events/flagship-weekly/justme-weekly.webp');
      cards.push({
        id: `hero-oct-${ev.id}`,
        dayKey,
        dayOffset: offset,
        dayPillLabel: shortDay,
        badgeLabel: badgePrefix,
        title: (ev.officialName || ev.shortName || vName).replace(/[\u2014–]/g, ' - '),
        timeLabel: `${tStr} - ${endStr}`,
        priceLabel: stripPercentages(rawPrice, ui.uponRequest),
        genres: (ev.genres || []).slice(0, 3),
        imageSrc: posterSrc,
        href: cardHref,
        whatsappHref: getConciergeBookingUrl(locCode, `${ev.officialName || vName} (${vName} ${dayKey})`, sourcePageUrl || cardHref),
        isSpecialDate: true,
      });
      addedDatedForDay = true;
    }

    // 1d. Bergamo & Brescia dated & weekly nights on this day
    if (isBgBs && nightUi) {
      for (const s of bgBsNights) {
        const win = computeActiveNightWindowISO(s, new Date());
        if (win.isExpired) continue;
        const matchesDay =
          (s.kind === 'dated' && win.startISO.slice(0, 10) === dayKey) ||
          (s.kind === 'weekly' && !addedDatedForDay && s.dayOfWeek === dow);
        if (!matchesDay) continue;
        const evHref = bergamoBresciaNightPath(s.id, locCode);
        cards.push({
          id: `hero-bgbs-${s.id}-${dayKey}`,
          dayKey,
          dayOffset: offset,
          dayPillLabel: shortDay,
          badgeLabel: badgePrefix,
          title: (locCode === 'it' ? s.titleIt : s.titleEn).replace(/[\u2014–]/g, ' - '),
          timeLabel: s.hoursLabel.replace(/[\u2014–]/g, ' - '),
          priceLabel: nightUi.uponRequest,
          genres: s.genres.slice(0, 3),
          imageSrc: toCardPoster4x5(s.posterSrc),
          href: evHref,
          whatsappHref: getConciergeBookingUrl(locCode, `${s.venueName} (${dayKey})`, sourcePageUrl || evHref),
          isSpecialDate: s.kind === 'dated',
        });
        if (s.kind === 'dated') addedDatedForDay = true;
      }
    }

    // 2. Recurring weekly formats on `dow` (fills any open night not already replaced by a dated override)
    if (!addedDatedForDay) {
      const dayWeeklies = matchedWeekly.filter((w) => w.dayOfWeek === dow);
      for (const w of dayWeeklies) {
        const weeklyHref = toHref(`/events/${w.clubSlug}-${w.day}-${w.eventSlug}`);
        const startHour = w.pricing.aperitif ? '19:30' : '23:00';
        const rawPrice = w.pricing.club || w.pricing.aperitif || ui.uponRequest;
        const numMatch = rawPrice.match(/€\s*\d+|\d+\s*€/);
        const compactPrice = numMatch
          ? `€${numMatch[0].replace(/[^\d]/g, '')}`
          : stripPercentages(rawPrice, ui.uponRequest);
        cards.push({
          id: `hero-weekly-${w.id}-${dayKey}`,
          dayKey,
          dayOffset: offset,
          dayPillLabel: shortDay,
          badgeLabel: badgePrefix,
          title: w.name.replace(/[\u2014–]/g, ' - '),
          timeLabel: `${startHour} - 05:00`,
          priceLabel: compactPrice,
          genres: (w.genres || []).slice(0, 3),
          imageSrc: toCardPoster4x5(w.image),
          href: weeklyHref,
          whatsappHref: getConciergeBookingUrl(locCode, `${w.name} · ${vName} (${dayKey})`, sourcePageUrl || weeklyHref),
          isSpecialDate: false,
        });
      }
    }
  }

  // Defensive fallback: if a club only has future special dates >7 days ahead (e.g. Gate / Fabrique concert hall week gap),
  // surface its next confirmed dated events so the weekly schedule strip is never empty.
  if (cards.length === 0 && matchedOctober.length > 0) {
    for (const ev of matchedOctober.filter((e) => e.startISO.slice(0, 10) >= todayRomeKey).slice(0, 6)) {
      const dKey = ev.startISO.slice(0, 10);
      const shortDay = formatDayShortLabel(dKey, locCode);
      const slug = getOctoberEventSlug(ev);
      const cardHref = toHref(`/events/${slug}`);
      const minOffer = ev.offers.reduce<number>(
        (acc, o) => (typeof o.price === 'number' && o.price > 0 && o.price < acc ? o.price : acc),
        999,
      );
      cards.push({
        id: `hero-next-${ev.id}`,
        dayKey: dKey,
        dayOffset: 8,
        dayPillLabel: shortDay,
        badgeLabel: `${ui.specialDateBadge} · ${shortDay}`,
        title: (ev.officialName || ev.shortName || vName).replace(/[\u2014–]/g, ' - '),
        timeLabel: `${ev.startISO.slice(11, 16) || '23:00'} - ${ev.endISO ? ev.endISO.slice(11, 16) : '05:00'}`,
        priceLabel: minOffer < 999 ? `€${minOffer}` : ui.uponRequest,
        genres: (ev.genres || []).slice(0, 3),
        imageSrc: toCardPoster4x5(ev.image?.src || '/images/events/flagship-weekly/justme-weekly.webp'),
        href: cardHref,
        whatsappHref: getConciergeBookingUrl(locCode, `${ev.officialName || vName} (${dKey})`, sourcePageUrl || cardHref),
        isSpecialDate: true,
      });
    }
  }

  return {
    mode: 'weekly-active',
    todayRomeKey,
    cards,
    winterPartners: [],
  };
}
