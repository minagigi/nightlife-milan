import type { LocaleCode } from '@/lib/i18n/localeRegistry';

export interface CapodannoEventTier {
  label: string;
  price: string;
  details: string;
}

export interface CapodannoLocalizedEventContent {
  title: string;
  subtitle: string;
  description: string;
  musicAndFormat: string;
  dressCode: string;
  priceSummary: string;
  tiers: CapodannoEventTier[];
  highlights: string[];
  sourceBasis: string;
}

const ADDR = 'Piazza della Repubblica, 12, 20124 Milano';
const HOURS = '23:00 – 05:00';
const PAYOFF = 'One night. All nations. A new beginning.';

export const REPVBLIC_NYE_CONTENT_35: Record<LocaleCode, CapodannoLocalizedEventContent> = {
  it: {
    title: 'Capodanno REPVBLIC Milano 2027: New Year’s Eve in Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 dicembre dalle 23:00 fino al mattino`,
    description:
      'Una notte speciale, un pubblico internazionale e tutta l’energia di Milano per dare il benvenuto al 2027. A Capodanno, REPVBLIC ti aspetta dalle 23:00 fino al mattino per una festa che parte con l’attesa della mezzanotte, il countdown e i calici alzati, con hit internazionali, hip hop e house. One night. All nations. A new beginning.',
    musicAndFormat:
      'Hit internazionali, hip hop e house · Countdown con flûte di mezzanotte (dalle 23:00 fino al mattino)',
    dressCode: 'Look curato ed elegante per la notte più attesa dell’anno',
    priceSummary:
      'Early Bird 45€ (flûte + 1 drink) · Tavolo Zona Dancefloor 600€ (6 persone) · Tavolo Zona Privé 1.200€ (10 persone)',
    tiers: [
      {
        label: 'Early Bird (dalle 23:00)',
        price: '45€ a persona',
        details: 'Ingresso con flûte per il brindisi di mezzanotte e un drink inclusi',
      },
      {
        label: 'Tavolo Zona Dancefloor',
        price: '600€ per 6 persone',
        details: 'Un tavolo riservato nel cuore della festa',
      },
      {
        label: 'Tavolo Zona Privé',
        price: '1.200€ per 10 persone',
        details: 'Un tavolo riservato nella nostra esclusiva area VIP',
      },
    ],
    highlights: [
      `Location: REPVBLIC Milano (${ADDR})`,
      'Orario: 31 dicembre · Dalle 23:00 fino al mattino',
      'Musica: Hit internazionali, hip hop e house',
      'Pubblico internazionale e look curato · One night. All nations. A new beginning.',
    ],
    sourceBasis:
      'Listino ufficiale confermato 2026/2027 REPVBLIC Milano (Piazza della Repubblica, 12): Early Bird 45€ (flûte brindisi di mezzanotte + 1 drink inclusi), Tavolo Zona Dancefloor 600€ (6 persone) e Tavolo Zona Privé 1.200€ (10 persone). Prenotazioni via Concierge WhatsApp +39 351 912 7047.',
  },
  en: {
    title: 'New Year’s Eve at REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · Dec 31 from 23:00 till morning`,
    description:
      'A special night, an international crowd, and all the energy of Milan to welcome 2027. On New Year’s Eve, REPVBLIC opens at 23:00 for a countdown party that builds to the midnight toast with raised flûtes and continues until morning, featuring international hits, hip hop, and house. One night. All nations. A new beginning.',
    musicAndFormat:
      'International Hits, Hip Hop & House · Midnight countdown toast (23:00 till morning)',
    dressCode: 'Elevated & stylish New Year’s Eve look',
    priceSummary:
      'Early Bird €45 (flûte + 1 drink) · Dancefloor Table €600 (6 guests) · Privé Table €1,200 (10 guests)',
    tiers: [
      {
        label: 'Early Bird (from 23:00)',
        price: '€45 per person',
        details: 'Admission with flûte for the midnight toast and one drink included',
      },
      {
        label: 'Dancefloor Table Zone',
        price: '€600 for 6 guests',
        details: 'A reserved table right in the heart of the party',
      },
      {
        label: 'Privé VIP Table Zone',
        price: '€1,200 for 10 guests',
        details: 'A reserved table in our exclusive VIP Privé area',
      },
    ],
    highlights: [
      `Venue: REPVBLIC Milano (${ADDR})`,
      'Hours: December 31 · From 23:00 till morning',
      'Music: International Hits, Hip Hop & House',
      `International crowd · ${PAYOFF}`,
    ],
    sourceBasis:
      'Confirmed official 2026/2027 REPVBLIC Milano rate card (Piazza della Repubblica, 12): Early Bird €45 (midnight toast flûte + 1 drink included), Dancefloor Table €600 (6 guests), and Privé VIP Table €1,200 (10 guests). Bookings via WhatsApp Concierge +39 351 912 7047.',
  },
  es: {
    title: 'Nochevieja en REPVBLIC Milán 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milán · ${ADDR} · 31 dic desde las 23:00 hasta el amanecer`,
    description:
      'Una noche especial, público internacional y toda la energía de Milán para dar la bienvenida a 2027. REPVBLIC abre desde las 23:00 hasta la mañana con cuenta atrás, brindis de medianoche, éxitos internacionales, hip hop y house. One night. All nations. A new beginning.',
    musicAndFormat: 'Éxitos internacionales, hip hop y house · Brindis de medianoche (23:00–05:00)',
    dressCode: 'Imagen elegante y cuidada para la noche de Fin de Año',
    priceSummary: 'Early Bird 45€ (copa brindis + 1 consumición) · Mesa Dancefloor 600€ (6 pers.) · Mesa Privé 1.200€ (10 pers.)',
    tiers: [
      { label: 'Early Bird (desde 23:00)', price: '45€ / persona', details: 'Entrada con flûte para el brindis de medianoche y una consumición incluidas' },
      { label: 'Mesa Zona Dancefloor', price: '600€ / 6 personas', details: 'Mesa reservada en el corazón de la fiesta' },
      { label: 'Mesa Zona Privé VIP', price: '1.200€ / 10 personas', details: 'Mesa reservada en la zona VIP exclusiva Privé' },
    ],
    highlights: [`Club: REPVBLIC Milano (${ADDR})`, `Horario: 31/12 · ${HOURS}`, 'Música: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Tarifas oficiales confirmadas 2026/2027 REPVBLIC Milano: Early Bird 45€, Mesa Dancefloor 600€ (6 personas), Mesa Privé 1.200€ (10 personas). Reservas WhatsApp +39 351 912 7047.',
  },
  fr: {
    title: 'Nouvel An au REPVBLIC Milan 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milan · ${ADDR} · 31 déc dès 23h00 jusqu’au matin`,
    description:
      'Une nuit d’exception, un public international et toute l’énergie de Milan pour accueillir 2027. REPVBLIC vous accueille dès 23h00 jusqu’au matin pour le décompte de minuit, le toast au champagne, les hits internationaux, le hip-hop et la house. One night. All nations. A new beginning.',
    musicAndFormat: 'Hits internationaux, hip-hop et house · Compte à rebours et coupe de minuit (23h00–05h00)',
    dressCode: 'Tenue élégante et soignée pour le réveillon',
    priceSummary: 'Early Bird 45€ (coupe + 1 verre) · Table Dancefloor 600€ (6 pers.) · Table Privé 1 200€ (10 pers.)',
    tiers: [
      { label: 'Early Bird (dès 23h00)', price: '45€ / pers.', details: 'Entrée avec coupe pour le toast de minuit et une consommation incluses' },
      { label: 'Table Zone Dancefloor', price: '600€ / 6 pers.', details: 'Table réservée au cœur de la fête' },
      { label: 'Table Zone Privé VIP', price: '1 200€ / 10 pers.', details: 'Table réservée dans l’espace VIP exclusif Privé' },
    ],
    highlights: [`Lieu : REPVBLIC Milano (${ADDR})`, `Horaires : 31 déc · ${HOURS}`, 'Musique : Hits internationaux, hip-hop & house', PAYOFF],
    sourceBasis: 'Tarifs officiels confirmés 2026/2027 REPVBLIC Milano : Early Bird 45€, Table Dancefloor 600€ (6 pers.), Table Privé 1 200€ (10 pers.). Concierge WhatsApp +39 351 912 7047.',
  },
  de: {
    title: 'Silvester im REPVBLIC Mailand 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Mailand · ${ADDR} · 31. Dez ab 23:00 Uhr bis in den Morgen`,
    description:
      'Eine besondere Nacht, internationales Publikum und die ganze Energie Mailands für den Start ins Jahr 2027. Das REPVBLIC öffnet ab 23:00 Uhr mit Countdown, Mitternachtstoast, internationalen Hits, Hip-Hop und House bis zum Morgen. One night. All nations. A new beginning.',
    musicAndFormat: 'International Hits, Hip-Hop & House · Mitternachts-Countdown mit Sekt (23:00–05:00)',
    dressCode: 'Stilvoller, eleganter Silvester-Look',
    priceSummary: 'Early Bird 45€ (Toast + 1 Drink) · Dancefloor-Tisch 600€ (6 Pers.) · Privé-Tisch 1.200€ (10 Pers.)',
    tiers: [
      { label: 'Early Bird (ab 23:00 Uhr)', price: '45€ pro Person', details: 'Eintritt inklusive Flûte für den Mitternachtstoast und 1 Drink' },
      { label: 'Tisch Zone Dancefloor', price: '600€ für 6 Personen', details: 'Reservierter Tisch mitten im Geschehen' },
      { label: 'Tisch Zone Privé VIP', price: '1.200€ für 10 Personen', details: 'Reservierter VIP-Tisch im exklusiven Privé-Bereich' },
    ],
    highlights: [`Location: REPVBLIC Milano (${ADDR})`, `Zeiten: 31.12. · ${HOURS}`, 'Musik: International Hits, Hip-Hop & House', PAYOFF],
    sourceBasis: 'Offiziell bestätigte Preise 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor-Tisch 600€ (6 Pers.), Privé-Tisch 1.200€ (10 Pers.). Buchung per WhatsApp +39 351 912 7047.',
  },
  pt: {
    title: 'Réveillon no REPVBLIC Milão 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milão · ${ADDR} · 31 dez a partir das 23:00 até de manhã`,
    description:
      'Uma noite especial, público internacional e toda a energia de Milão para receber 2027. O REPVBLIC abre às 23:00 com contagem regressiva, brinde da meia-noite e festa até de manhã ao som de hits internacionais, hip hop e house. One night. All nations. A new beginning.',
    musicAndFormat: 'Hits Internacionais, Hip Hop & House · Brinde da meia-noite (23:00–05:00)',
    dressCode: 'Visual elegante e cuidado para a noite de Réveillon',
    priceSummary: 'Early Bird 45€ (flûte + 1 bebida) · Mesa Dancefloor 600€ (6 pess.) · Mesa Privé 1.200€ (10 pess.)',
    tiers: [
      { label: 'Early Bird (das 23:00)', price: '45€ por pessoa', details: 'Entrada com flûte para o brinde da meia-noite e uma bebida incluídas' },
      { label: 'Mesa Zona Dancefloor', price: '600€ para 6 pessoas', details: 'Mesa reservada no coração da festa' },
      { label: 'Mesa Zona Privé VIP', price: '1.200€ para 10 pessoas', details: 'Mesa reservada na nossa área VIP exclusiva' },
    ],
    highlights: [`Local: REPVBLIC Milano (${ADDR})`, `Horário: 31/12 · ${HOURS}`, 'Música: Hits Internacionais, Hip Hop & House', PAYOFF],
    sourceBasis: 'Preços oficiais confirmados 2026/2027 REPVBLIC Milano: Early Bird 45€, Mesa Dancefloor 600€ (6 pax), Mesa Privé 1.200€ (10 pax). WhatsApp +39 351 912 7047.',
  },
  nl: {
    title: 'Oud en Nieuw bij REPVBLIC Milaan 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milaan · ${ADDR} · 31 dec vanaf 23:00 tot de ochtend`,
    description:
      'Een bijzondere nacht, een internationaal publiek en alle energie van Milaan om 2027 te verwelkomen. REPVBLIC opent om 23:00 met de aftelling naar middernacht, champagneproost en internationale hits, hiphop en house tot in de ochtend. One night. All nations. A new beginning.',
    musicAndFormat: 'Internationale hits, hiphop & house · Middernacht-aftelling (23:00–05:00)',
    dressCode: 'Verzorgde en elegante oudejaarslook',
    priceSummary: 'Early Bird €45 (flûte + 1 drankje) · Dancefloor-tafel €600 (6 pers.) · Privé-tafel €1.200 (10 pers.)',
    tiers: [
      { label: 'Early Bird (vanaf 23:00)', price: '€45 per persoon', details: 'Toegang inclusief flûte voor de middernachttoast en één drankje' },
      { label: 'Tafel Zone Dancefloor', price: '€600 voor 6 personen', details: 'Gereserveerde tafel in het hart van het feest' },
      { label: 'Tafel Zone Privé VIP', price: '€1.200 voor 10 personen', details: 'Gereserveerde tafel in de exclusieve VIP Privé-zone' },
    ],
    highlights: [`Locatie: REPVBLIC Milano (${ADDR})`, `Tijden: 31 dec · ${HOURS}`, 'Muziek: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Officiële bevestigde prijzen 2026/2027 REPVBLIC Milano: Early Bird €45, Dancefloor €600 (6 pers.), Privé €1.200 (10 pers.). WhatsApp +39 351 912 7047.',
  },
  ru: {
    title: 'Новый год в REPVBLIC Милан 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Милан · ${ADDR} · 31 дек с 23:00 до утра`,
    description:
      'Особая ночь, интернациональная публика и энергия Милана для встречи 2027 года. REPVBLIC открывается в 23:00: обратный отсчёт, полуночный тост с шампанским, международные хиты, хип-хоп и хаус до самого утра. One night. All nations. A new beginning.',
    musicAndFormat: 'Международные хиты, хип-хоп и хаус · Полуночный тост (23:00–05:00)',
    dressCode: 'Элегантный и продуманный новогодний образ',
    priceSummary: 'Early Bird 45€ (бокал + 1 напиток) · Стол Dancefloor 600€ (6 чел.) · Стол Privé 1.200€ (10 чел.)',
    tiers: [
      { label: 'Early Bird (с 23:00)', price: '45€ / чел.', details: 'Вход, бокал для полуночного тоста и 1 напиток включены' },
      { label: 'Стол Dancefloor', price: '600€ / 6 гостей', details: 'Забронированный стол в самом центре вечеринки' },
      { label: 'VIP-стол Privé', price: '1.200€ / 10 гостей', details: 'Резерв стола в эксклюзивной VIP-зоне Privé' },
    ],
    highlights: [`Площадка: REPVBLIC Milano (${ADDR})`, `Время: 31 декабря · ${HOURS}`, 'Музыка: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Официальный подтверждённый прайс 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 чел.), Privé 1.200€ (10 чел.). Бронь WhatsApp +39 351 912 7047.',
  },
  tr: {
    title: 'REPVBLIC Milano Yılbaşı 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 Ara 23:00’ten sabaha kadar`,
    description:
      '2027’yi karşılamak için özel bir gece, uluslararası bir kitle ve Milano’nun tüm enerjisi. REPVBLIC 23:00’ten sabaha kadar geri sayım, gece yarısı şampanya kadehi ve uluslararası hitler, hip hop ve house müzikle kapılarını açıyor. One night. All nations. A new beginning.',
    musicAndFormat: 'Uluslararası Hit’ler, Hip Hop & House · Gece yarısı kutlaması (23:00–05:00)',
    dressCode: 'Yılbaşı gecesine yakışır şık ve özenli görünüm',
    priceSummary: 'Early Bird 45€ (kadeh + 1 içecek) · Dancefloor Masa 600€ (6 kişi) · Privé Masa 1.200€ (10 kişi)',
    tiers: [
      { label: 'Early Bird (23:00 itibarıyla)', price: 'Kişi başı 45€', details: 'Gece yarısı kadehi ve 1 içecek dahil giriş' },
      { label: 'Dancefloor Masa Alanı', price: '6 kişi 600€', details: 'Partinin kalbinde rezerve masa' },
      { label: 'Privé VIP Masa Alanı', price: '10 kişi 1.200€', details: 'Özel VIP Privé alanında rezerve masa' },
    ],
    highlights: [`Mekan: REPVBLIC Milano (${ADDR})`, `Saatler: 31 Aralık · ${HOURS}`, 'Müzik: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'REPVBLIC Milano 2026/2027 onaylı resmi fiyat listesi: Early Bird 45€, Dancefloor 600€ (6 kişi), Privé 1.200€ (10 kişi). WhatsApp +39 351 912 7047.',
  },
  zh: {
    title: '2027 米兰 REPVBLIC 跨年派对 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC 米兰 · ${ADDR} · 12月31日 23:00 至清晨`,
    description:
      '一个特别的夜晚、来自世界各地的国际宾客与米兰全城能量，共同迎接 2027。REPVBLIC 跨年夜自 23:00 起狂欢至清晨，零点倒计时举杯，DJ 带来国际热门金曲、Hip Hop 与 House。One night. All nations. A new beginning.',
    musicAndFormat: '国际热门金曲、Hip Hop 与 House · 零点倒计时举杯（23:00 至清晨）',
    dressCode: '精致得体的跨年派对着装',
    priceSummary: '早鸟门票 45€（含零点香槟+1杯饮品） · 舞池卡座 600€（6人） · Privé VIP卡座 1.200€（10人）',
    tiers: [
      { label: 'Early Bird 早鸟门票（23:00起）', price: '45€ / 位', details: '含跨年零点香槟祝酒杯及1杯饮品' },
      { label: 'Dancefloor 舞池区卡座', price: '600€ / 6位', details: '派对核心区专属预订卡座' },
      { label: 'Privé 尊享 VIP 卡座', price: '1.200€ / 10位', details: '专属 VIP Privé 区域预订卡座' },
    ],
    highlights: [`场馆：REPVBLIC Milano（${ADDR}）`, `时间：12月31日 · ${HOURS}`, '音乐：国际金曲、Hip Hop 与 House', PAYOFF],
    sourceBasis: 'REPVBLIC Milano 2026/2027 官方确认价格：早鸟票 45€、舞池卡座 600€（6人）、Privé 卡座 1.200€（10人）。WhatsApp 预订 +39 351 912 7047。',
  },
  ar: {
    title: 'ليلة رأس السنة 2027 في REPVBLIC ميلانو · ساحة الجمهورية 12',
    subtitle: `REPVBLIC ميلانو · ${ADDR} · 31 ديسمبر من 23:00 حتى الصباح`,
    description:
      'ليلة استثنائية، جمهور دولي وطاقة ميلانو لاستقبال عام 2027. يفتح REPVBLIC أبوابه من الساعة 23:00 حتى الصباح مع العد التنازلي لمنتصف الليل وأجمل الأغاني العالمية والهيب هوب والهاوس. One night. All nations. A new beginning.',
    musicAndFormat: 'أغانٍ عالمية، هيب هوب وهاوس · احتفالية العد التنازلي في منتصف الليل (23:00 – 05:00)',
    dressCode: 'إطلالة أنيقة ومميزة لليلة رأس السنة',
    priceSummary: 'دخول Early Bird 45€ (كأس احتفال + مشروب) · طاولة Dancefloor 600€ (6 أشخاص) · طاولة Privé 1.200€ (10 أشخاص)',
    tiers: [
      { label: 'تذكرة Early Bird (من 23:00)', price: '45€ للشخص', details: 'دخول يشمل كأس نخب منتصف الليل ومشروباً واحداً' },
      { label: 'طاولة منطقة Dancefloor', price: '600€ لـ 6 أشخاص', details: 'طاولة محجوزة في قلب الحفل' },
      { label: 'طاولة منطقة Privé VIP', price: '1.200€ لـ 10 أشخاص', details: 'طاولة محجوزة في منطقة VIP الحصرية' },
    ],
    highlights: [`المكان: REPVBLIC Milano (${ADDR})`, `الموعد: 31 ديسمبر · ${HOURS}`, 'الموسيقى: هيتس عالمية، هيب هوب وهاوس', PAYOFF],
    sourceBasis: 'الأسعار الرسمية المؤكدة 2026/2027 في REPVBLIC Milano: تذكرة 45€، طاولة Dancefloor 600€ لـ 6 أشخاص، طاولة Privé 1.200€ لـ 10 أشخاص. واتساب +39 351 912 7047.',
  },
  bg: {
    title: 'Нова година 2027 в REPVBLIC Милано · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Милано · ${ADDR} · 31 дек от 23:00 до сутринта`,
    description:
      'Специална нощ, международна публика и цялата енергия на Милано за посрещането на 2027. REPVBLIC ви очаква от 23:00 до сутринта с обратно броене в полунощ, интернационални хитове, хип-хоп и хаус. One night. All nations. A new beginning.',
    musicAndFormat: 'Международни хитове, хип-хоп и хаус · Полунощен тост (23:00–05:00)',
    dressCode: 'Стилен и елегантен новогодишен външен вид',
    priceSummary: 'Early Bird 45€ (шампанско + 1 напитка) · Маса Dancefloor 600€ (6 души) · Маса Privé 1.200€ (10 души)',
    tiers: [
      { label: 'Early Bird (от 23:00)', price: '45€ / човек', details: 'Вход с чаша за полунощен тост и 1 напитка включени' },
      { label: 'Маса зона Dancefloor', price: '600€ за 6 души', details: 'Резервирана маса в сърцето на партито' },
      { label: 'Маса зона Privé VIP', price: '1.200€ за 10 души', details: 'Резервирана маса в ексклузивната VIP зона' },
    ],
    highlights: [`Клуб: REPVBLIC Milano (${ADDR})`, `Час: 31 декември · ${HOURS}`, 'Музика: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Официално потвърдени цени 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 души), Privé 1.200€ (10 души). WhatsApp +39 351 912 7047.',
  },
  hr: {
    title: 'Doček Nove godine REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. pro od 23:00 do jutra`,
    description:
      'Posebna noć, međunarodna publika i sva energija Milana za doček 2027. REPVBLIC otvara u 23:00 uz ponoćno odbrojavanje, nazdravljanje, internacionalne hitove, hip-hop i house do jutra. One night. All nations. A new beginning.',
    musicAndFormat: 'Internacionalni hitovi, hip-hop i house · Ponoćni toasting (23:00–05:00)',
    dressCode: 'Dotjeran i elegantan novogodišnji look',
    priceSummary: 'Early Bird 45€ (pjenušac + 1 piće) · Stol Dancefloor 600€ (6 osoba) · Stol Privé 1.200€ (10 osoba)',
    tiers: [
      { label: 'Early Bird (od 23:00)', price: '45€ po osobi', details: 'Ulaz uz čašu za ponoćnu zdravicu i jedno piće uključeno' },
      { label: 'Stol zona Dancefloor', price: '600€ za 6 osoba', details: 'Rezervirani stol u srcu plesnog podija' },
      { label: 'Stol zona Privé VIP', price: '1.200€ za 10 osoba', details: 'Rezervirani stol u ekskluzivnoj VIP zoni' },
    ],
    highlights: [`Klub: REPVBLIC Milano (${ADDR})`, `Vrijeme: 31.12. · ${HOURS}`, 'Glazba: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Potvrđeni službeni paketi 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 os.), Privé 1.200€ (10 os.). WhatsApp +39 351 912 7047.',
  },
  cs: {
    title: 'Silvestr v REPVBLIC Milán 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milán · ${ADDR} · 31. prosince od 23:00 do rána`,
    description:
      'Výjimečná noc, mezinárodní publikum a energie Milána na přivítání roku 2027. REPVBLIC otevírá ve 23:00 s půlnočním přípitkem, světovými hity, hip hopem a house až do rána. One night. All nations. A new beginning.',
    musicAndFormat: 'Světové hity, hip hop a house · Půlnoční odpočet (23:00–05:00)',
    dressCode: 'Elegantní a stylový silvestrovský look',
    priceSummary: 'Early Bird 45€ (sklenka + 1 drink) · Stůl Dancefloor 600€ (6 osob) · Stůl Privé 1.200€ (10 osob)',
    tiers: [
      { label: 'Early Bird (od 23:00)', price: '45€ / osoba', details: 'Vstup se sklenkou na půlnoční přípitek a jedním drinkem v ceně' },
      { label: 'Stůl zóna Dancefloor', price: '600€ / 6 osob', details: 'Rezervovaný stůl přímo v centru dění' },
      { label: 'Stůl zóna Privé VIP', price: '1.200€ / 10 osob', details: 'Rezervovaný stůl v exkluzivní VIP zóně' },
    ],
    highlights: [`Místo: REPVBLIC Milano (${ADDR})`, `Čas: 31. 12. · ${HOURS}`, 'Hudba: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Oficiálně potvrzený ceník 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 os.), Privé 1.200€ (10 os.). WhatsApp +39 351 912 7047.',
  },
  da: {
    title: 'Nytår på REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. dec fra 23:00 til morgen`,
    description:
      'En særlig nat, et internationalt publikum og Milanos energi til at byde 2027 velkommen. REPVBLIC slår dørene op kl. 23:00 med midnats-countdown, bobler, internationale hits, hiphop og house til den lyse morgen. One night. All nations. A new beginning.',
    musicAndFormat: 'Internationale hits, hiphop & house · Midnats-toast (23:00–05:00)',
    dressCode: 'Stilfuldt og festklart nytårslook',
    priceSummary: 'Early Bird €45 (bobler + 1 drink) · Dancefloor-bord €600 (6 gæster) · Privé-bord €1.200 (10 gæster)',
    tiers: [
      { label: 'Early Bird (fra kl. 23:00)', price: '€45 pr. person', details: 'Entré inklusiv flûte til midnatsskål og 1 drink' },
      { label: 'Bord Dancefloor Zone', price: '€600 for 6 personer', details: 'Reserveret bord midt i festen' },
      { label: 'Bord Privé VIP Zone', price: '€1.200 for 10 personer', details: 'Reserveret bord i det eksklusive VIP-område' },
    ],
    highlights: [`Sted: REPVBLIC Milano (${ADDR})`, `Tid: 31. dec · ${HOURS}`, 'Musik: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Officielt bekræftede priser 2026/2027 REPVBLIC Milano: Early Bird €45, Dancefloor €600 (6 pers.), Privé €1.200 (10 pers.). WhatsApp +39 351 912 7047.',
  },
  et: {
    title: 'Aastavahetus REPVBLIC Milanos 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. dets 23:00 kuni hommikuni`,
    description:
      'Eriline öö, rahvusvaheline publik ja Milano energia 2027. aasta vastuvõtmiseks. REPVBLIC avab uksed kell 23:00 ning pidu kestab kesköise toosti, rahvusvaheliste hittide, hiphopi ja house-muusika saatel hommikuni. One night. All nations. A new beginning.',
    musicAndFormat: 'Rahvusvahelised hitid, hiphop & house · Kesköine toost (23:00–05:00)',
    dressCode: 'Šikk ja läbimõeldud uusaasta stiil',
    priceSummary: 'Early Bird 45€ (vahuvein + 1 jook) · Dancefloor laud 600€ (6 in.) · Privé laud 1.200€ (10 in.)',
    tiers: [
      { label: 'Early Bird (alates 23:00)', price: '45€ / inimene', details: 'Sissepääs kesköise toosti pokaali ja ühe joogiga' },
      { label: 'Laud Dancefloor tsoonis', price: '600€ / 6 inimesele', details: 'Broneeritud laud peo südames' },
      { label: 'Laud Privé VIP tsoonis', price: '1.200€ / 10 inimesele', details: 'Broneeritud laud eksklusiivses VIP-alas' },
    ],
    highlights: [`Klubi: REPVBLIC Milano (${ADDR})`, `Aeg: 31.12 · ${HOURS}`, 'Muusika: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Ametlikult kinnitatud hinnad 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 in.), Privé 1.200€ (10 in.). WhatsApp +39 351 912 7047.',
  },
  fi: {
    title: 'Uusivuosi REPVBLIC Milanossa 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31.12. klo 23:00 aamuun asti`,
    description:
      'Erityinen yö, kansainvälinen yleisö ja Milanon energia vuoden 2027 vastaanottoon. REPVBLIC kutsuu juhlimaan klo 23:00 alkaen aamuun asti kansainvälisten hittien, hiphopin ja housen tahdissa keskiyön maljan kera. One night. All nations. A new beginning.',
    musicAndFormat: 'Kansainväliset hitit, hiphop & house · Keskiyön malja (23:00–05:00)',
    dressCode: 'Huoliteltu ja tyylikäs uudenvuoden asu',
    priceSummary: 'Early Bird 45€ (malja + 1 juoma) · Dancefloor-pöytä 600€ (6 hlö) · Privé-pöytä 1.200€ (10 hlö)',
    tiers: [
      { label: 'Early Bird (klo 23:00 alkaen)', price: '45€ / henkilö', details: 'Sisäänpääsy keskiyön maljalla ja yhdellä juomalla' },
      { label: 'Pöytä Dancefloor-alueella', price: '600€ / 6 henkilöä', details: 'Varattu pöytä juhlien ytimessä' },
      { label: 'Pöytä Privé VIP -alueella', price: '1.200€ / 10 henkilöä', details: 'Varattu pöytä yksinoikeudella VIP-alueella' },
    ],
    highlights: [`Klubi: REPVBLIC Milano (${ADDR})`, `Aika: 31.12. · ${HOURS}`, 'Musiikki: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Vahvistettu virallinen hinnasto 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 hlö), Privé 1.200€ (10 hlö). WhatsApp +39 351 912 7047.',
  },
  el: {
    title: 'Πρωτοχρονιά 2027 στο REPVBLIC Μιλάνο · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Μιλάνο · ${ADDR} · 31 Δεκ από τις 23:00 έως το πρωί`,
    description:
      'Μια ξεχωριστή νύχτα, διεθνές κοινό και η ενέργεια του Μιλάνου για να υποδεχτούμε το 2027. Το REPVBLIC σάς περιμένει από τις 23:00 μέχρι το πρωί με μεσονύκτια πρόποση, international hits, hip hop και house. One night. All nations. A new beginning.',
    musicAndFormat: 'Διεθνείς επιτυχίες, Hip Hop & House · Πρωτοχρονιάτικη πρόποση (23:00–05:00)',
    dressCode: 'Προσεγμένη και κομψή εμφάνιση για το ρεβεγιόν',
    priceSummary: 'Early Bird 45€ (σαμπάνια + 1 ποτό) · Τραπέζι Dancefloor 600€ (6 άτομα) · Τραπέζι Privé 1.200€ (10 άτομα)',
    tiers: [
      { label: 'Early Bird (από τις 23:00)', price: '45€ / άτομο', details: 'Είσοδος με ποτήρι για την πρόποση των μεσάνυχτων και 1 ποτό' },
      { label: 'Τραπέζι Ζώνης Dancefloor', price: '600€ / 6 άτομα', details: 'Κρατημένο τραπέζι στην καρδιά του πάρτι' },
      { label: 'Τραπέζι Ζώνης Privé VIP', price: '1.200€ / 10 άτομα', details: 'Κρατημένο τραπέζι στην αποκλειστική VIP περιοχή' },
    ],
    highlights: [`Χώρος: REPVBLIC Milano (${ADDR})`, `Ώρες: 31 Δεκ · ${HOURS}`, 'Μουσική: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Επιβεβαιωμένος επίσημος τιμοκατάλογος 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 άτ.), Privé 1.200€ (10 άτ.). WhatsApp +39 351 912 7047.',
  },
  hu: {
    title: 'Szilveszter a REPVBLIC Milánóban 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · Dec. 31. 23:00-tól reggelig`,
    description:
      'Különleges éjszaka, nemzetközi közönség és Milánó energiája 2027 köszöntésére. A REPVBLIC 23:00 órától reggelig vár éjféli koccintással, nemzetközi slágerekkel, hip-hoppal és house zenével. One night. All nations. A new beginning.',
    musicAndFormat: 'Nemzetközi slágerek, hip-hop & house · Éjféli pezsgős visszaszámlálás (23:00–05:00)',
    dressCode: 'Elegáns, igényes szilveszteri megjelenés',
    priceSummary: 'Early Bird 45€ (pezsgő + 1 ital) · Dancefloor asztal 600€ (6 fő) · Privé asztal 1.200€ (10 fő)',
    tiers: [
      { label: 'Early Bird (23:00 órától)', price: '45€ / fő', details: 'Belépő éjféli koccintó pohárral és egy itallal' },
      { label: 'Asztal a Dancefloor zónában', price: '600€ / 6 fő', details: 'Fenntartott asztal a buli központjában' },
      { label: 'Asztal a Privé VIP zónában', price: '1.200€ / 10 fő', details: 'Fenntartott asztal az exkluzív VIP részlegen' },
    ],
    highlights: [`Helyszín: REPVBLIC Milano (${ADDR})`, `Időpont: Dec. 31. · ${HOURS}`, 'Zene: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Hivatalosan megerősített 2026/2027-es árak a REPVBLIC Milanóban: Early Bird 45€, Dancefloor 600€ (6 fő), Privé 1.200€ (10 fő). WhatsApp +39 351 912 7047.',
  },
  ga: {
    title: 'Oíche Chinn Bliana ag REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 Nollaig ó 23:00 go maidin`,
    description:
      'Oíche speisialta, slua idirnáisiúnta agus fuinneamh Milano chun fáilte a chur roimh 2027. Osclaíonn REPVBLIC ag 23:00 le tósta meán oíche, amhráin idirnáisiúnta, hip-hop agus house go maidin. One night. All nations. A new beginning.',
    musicAndFormat: 'Amhráin Idirnáisiúnta, Hip Hop & House · Tósta meán oíche (23:00–05:00)',
    dressCode: 'Éide galánta snasta d’Oíche Chinn Bliana',
    priceSummary: 'Early Bird €45 (flûte + 1 deoch) · Bord Dancefloor €600 (6 aoi) · Bord Privé €1,200 (10 aoi)',
    tiers: [
      { label: 'Early Bird (ó 23:00)', price: '€45 an duine', details: 'Cead isteach le flûte meán oíche agus deoch amháin san áireamh' },
      { label: 'Bord Dancefloor', price: '€600 do 6 aoi', details: 'Bord curtha in áirithe i lár an chóisire' },
      { label: 'Bord Privé VIP', price: '€1,200 do 10 n-aoi', details: 'Bord curtha in áirithe sa limistéar eisiach VIP' },
    ],
    highlights: [`Ionad: REPVBLIC Milano (${ADDR})`, `Am: 31 Nollaig · ${HOURS}`, 'Ceol: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Praghsanna oifigiúla deimhnithe 2026/2027 REPVBLIC Milano: Early Bird €45, Dancefloor €600 (6 aoi), Privé €1,200 (10 aoi). WhatsApp +39 351 912 7047.',
  },
  lv: {
    title: 'Jaungada nakts REPVBLIC Milānā 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. dec no plkst. 23:00 līdz rītam`,
    description:
      'Īpaša nakts, starptautiska publika un Milānas enerģija 2027. gada sagaidīšanai. REPVBLIC gaida no plkst. 23:00 līdz rītam ar pusnakts tostu, pasaules hitiem, hiphopu un house mūziku. One night. All nations. A new beginning.',
    musicAndFormat: 'Starptautiski hiti, hiphops un house · Pusnakts tosts (23:00–05:00)',
    dressCode: 'Elegants un pārdomāts Jaungada tēls',
    priceSummary: 'Early Bird 45€ (šampanietis + 1 dzēriens) · Dancefloor galds 600€ (6 pers.) · Privé galds 1.200€ (10 pers.)',
    tiers: [
      { label: 'Early Bird (no 23:00)', price: '45€ / persona', details: 'Ieeja ar glāzi pusnakts tostam un vienu dzērienu' },
      { label: 'Galds Dancefloor zonā', price: '600€ / 6 personām', details: 'Rezervēts galds ballītes centrā' },
      { label: 'Galds Privé VIP zonā', price: '1.200€ / 10 personām', details: 'Rezervēts galds ekskluzīvajā VIP zonā' },
    ],
    highlights: [`Vieta: REPVBLIC Milano (${ADDR})`, `Laiks: 31. dec · ${HOURS}`, 'Mūzika: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Oficiāli apstiprinātas cenas 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 pers.), Privé 1.200€ (10 pers.). WhatsApp +39 351 912 7047.',
  },
  lt: {
    title: 'Naujieji metai REPVBLIC Milane 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · Gruodžio 31 d. nuo 23:00 iki ryto`,
    description:
      'Ypatinga naktis, tarptautinė publika ir Milano energija pasitinkant 2027-uosius. REPVBLIC kviečia nuo 23:00 iki ryto su vidurnakčio tostu, pasauliniais hitais, hiphopu ir house muzika. One night. All nations. A new beginning.',
    musicAndFormat: 'Tarptautiniai hitai, hiphopas ir house · Vidurnakčio tostas (23:00–05:00)',
    dressCode: 'Išpuoselėtas ir elegantiškas Naujųjų metų įvaizdis',
    priceSummary: 'Early Bird 45€ (taurė + 1 gėrimas) · Dancefloor stalas 600€ (6 asm.) · Privé stalas 1.200€ (10 asm.)',
    tiers: [
      { label: 'Early Bird (nuo 23:00)', price: '45€ asmeniui', details: 'Įėjimas su vidurnakčio tosto taure ir vienu gėrimu' },
      { label: 'Stalas Dancefloor zonoje', price: '600€ / 6 asmenims', details: 'Rezervuotas stalas vakarėlio širdyje' },
      { label: 'Stalas Privé VIP zonoje', price: '1.200€ / 10 asmenų', details: 'Rezervuotas stalas išskirtinėje VIP zonoje' },
    ],
    highlights: [`Vieta: REPVBLIC Milano (${ADDR})`, `Laikas: Gruodžio 31 d. · ${HOURS}`, 'Muzika: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Oficialiai patvirtintos 2026/2027 REPVBLIC Milano kainos: Early Bird 45€, Dancefloor 600€ (6 asm.), Privé 1.200€ (10 asm.). WhatsApp +39 351 912 7047.',
  },
  mt: {
    title: 'Ewwel tas-Sena f’REPVBLIC Milan 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 ta’ Diċembru mill-23:00 sa filgħodu`,
    description:
      'Lejl speċjali, udjenza internazzjonali u l-enerġija kollha ta’ Milan biex nilqgħu l-2027. REPVBLIC jistennek mill-23:00 sa filgħodu bil-countdown ta’ nofsillejl, hits internazzjonali, hip hop u house. One night. All nations. A new beginning.',
    musicAndFormat: 'Hits Internazzjonali, Hip Hop & House · Toast ta’ nofsillejl (23:00–05:00)',
    dressCode: 'Dehra eleganti u kkurata għall-aħħar lejl tas-sena',
    priceSummary: 'Early Bird 45€ (flûte + drink 1) · Mejda Dancefloor 600€ (6 pers.) · Mejda Privé 1.200€ (10 pers.)',
    tiers: [
      { label: 'Early Bird (mill-23:00)', price: '45€ kulħadd', details: 'Dħul bi flûte għat-toast ta’ nofsillejl u xarba waħda inklużi' },
      { label: 'Mejda Żona Dancefloor', price: '600€ għal 6 persuni', details: 'Mejda riservata fil-qalba tal-festa' },
      { label: 'Mejda Żona Privé VIP', price: '1.200€ għal 10 persuni', details: 'Mejda riservata fiż-żona esklussiva VIP' },
    ],
    highlights: [`Post: REPVBLIC Milano (${ADDR})`, `Ħin: 31 ta’ Diċembru · ${HOURS}`, 'Mużika: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Prezzijiet uffiċjali kkonfermati 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 pers.), Privé 1.200€ (10 pers.). WhatsApp +39 351 912 7047.',
  },
  pl: {
    title: 'Sylwester w REPVBLIC Mediolan 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Mediolan · ${ADDR} · 31 gru od 23:00 do rana`,
    description:
      'Wyjątkowa noc, międzynarodowa publiczność i energia Mediolanu na powitanie 2027 roku. REPVBLIC zaprasza od 23:00 do rana na wspólne odliczanie o północy, toast i taniec przy światowych hitach, hip-hopie i house. One night. All nations. A new beginning.',
    musicAndFormat: 'Międzynarodowe hity, hip-hop i house · Toast o północy (23:00–05:00)',
    dressCode: 'Elegancki, dopracowany strój sylwestrowy',
    priceSummary: 'Early Bird 45€ (kieliszek + 1 drink) · Stolik Dancefloor 600€ (6 os.) · Stolik Privé 1.200€ (10 os.)',
    tiers: [
      { label: 'Early Bird (od 23:00)', price: '45€ za osobę', details: 'Wstęp z kieliszkiem do toastu o północy i jednym drinkiem w cenie' },
      { label: 'Stolik Strefa Dancefloor', price: '600€ dla 6 osób', details: 'Zarezerwowany stolik w samym centrum parkietu' },
      { label: 'Stolik Strefa Privé VIP', price: '1.200€ dla 10 osób', details: 'Zarezerwowany stolik w ekskluzywnej strefie VIP' },
    ],
    highlights: [`Klub: REPVBLIC Milano (${ADDR})`, `Godziny: 31 grudnia · ${HOURS}`, 'Muzyka: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Oficjalnie potwierdzony cennik 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 os.), Privé 1.200€ (10 os.). WhatsApp +39 351 912 7047.',
  },
  ro: {
    title: 'Revelion la REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 dec de la 23:00 până dimineața`,
    description:
      'O noapte specială, un public internațional și toată energia din Milano pentru a întâmpina 2027. REPVBLIC te așteaptă de la 23:00 până dimineața cu numărătoarea inversă de la miezul nopții, hituri internaționale, hip-hop și house. One night. All nations. A new beginning.',
    musicAndFormat: 'Hituri internaționale, hip-hop & house · Toast la miezul nopții (23:00–05:00)',
    dressCode: 'Ținută elegantă și îngrijită pentru noaptea de Revelion',
    priceSummary: 'Early Bird 45€ (cupă șampanie + 1 băutură) · Masă Dancefloor 600€ (6 pers.) · Masă Privé 1.200€ (10 pers.)',
    tiers: [
      { label: 'Early Bird (de la 23:00)', price: '45€ / persoană', details: 'Intrare cu pahar pentru toastul de la miezul nopții și o băutură incluse' },
      { label: 'Masă Zona Dancefloor', price: '600€ / 6 persoane', details: 'Masă rezervată chiar în mijlocul petrecerii' },
      { label: 'Masă Zona Privé VIP', price: '1.200€ / 10 persoane', details: 'Masă rezervată în zona exclusivă VIP' },
    ],
    highlights: [`Locație: REPVBLIC Milano (${ADDR})`, `Program: 31 decembrie · ${HOURS}`, 'Muzică: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Prețuri oficiale confirmate 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 pers.), Privé 1.200€ (10 pers.). WhatsApp +39 351 912 7047.',
  },
  sk: {
    title: 'Silvester v REPVBLIC Miláno 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Miláno · ${ADDR} · 31. decembra od 23:00 do rána`,
    description:
      'Výnimočná noc, medzinárodné publikum a energia Milána na privítanie roku 2027. REPVBLIC vás čaká od 23:00 do rána s polnočným odpočítavaním, prípitkom a medzinárodnými hitmi, hip-hopom a houseom. One night. All nations. A new beginning.',
    musicAndFormat: 'Medzinárodné hity, hip-hop a house · Polnočný prípitok (23:00–05:00)',
    dressCode: 'Štýlový a elegantný silvestrovský look',
    priceSummary: 'Early Bird 45€ (pohár + 1 drink) · Stôl Dancefloor 600€ (6 os.) · Stôl Privé 1.200€ (10 os.)',
    tiers: [
      { label: 'Early Bird (od 23:00)', price: '45€ / osoba', details: 'Vstup s pohárom na polnočný prípitok a jedným drinkom v cene' },
      { label: 'Stôl zóna Dancefloor', price: '600€ / 6 osôb', details: 'Rezervovaný stôl v srdci párty' },
      { label: 'Stôl zóna Privé VIP', price: '1.200€ / 10 osôb', details: 'Rezervovaný stôl v exkluzívnej VIP zóne' },
    ],
    highlights: [`Klub: REPVBLIC Milano (${ADDR})`, `Čas: 31. 12. · ${HOURS}`, 'Hudba: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Oficiálne potvrdené ceny 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 os.), Privé 1.200€ (10 os.). WhatsApp +39 351 912 7047.',
  },
  sl: {
    title: 'Silvestrovo v REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. dec od 23:00 do jutra`,
    description:
      'Posebna noč, mednarodna publika in energija Milana za vstop v leto 2027. REPVBLIC vas pričakuje od 23:00 do jutra s polnočnim odštevanjem, nazdravljanjem, mednarodnimi hiti, hip-hopom in house glasbo. One night. All nations. A new beginning.',
    musicAndFormat: 'Mednarodni hiti, hip-hop & house · Polnočna zdravica (23:00–05:00)',
    dressCode: 'Urejen in eleganten silvestrski videz',
    priceSummary: 'Early Bird 45€ (kozarec + 1 pijača) · Miza Dancefloor 600€ (6 oseb) · Miza Privé 1.200€ (10 oseb)',
    tiers: [
      { label: 'Early Bird (od 23:00)', price: '45€ na osebo', details: 'Vstop s kozarcem za polnočno zdravico in eno pijačo' },
      { label: 'Miza cona Dancefloor', price: '600€ za 6 oseb', details: 'Rezervirana miza v središču dogajanja' },
      { label: 'Miza cona Privé VIP', price: '1.200€ za 10 oseb', details: 'Rezervirana miza v ekskluzivni VIP coni' },
    ],
    highlights: [`Klub: REPVBLIC Milano (${ADDR})`, `Ure: 31. 12. · ${HOURS}`, 'Glasba: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Uradno potrjene cene 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 oseb), Privé 1.200€ (10 oseb). WhatsApp +39 351 912 7047.',
  },
  sv: {
    title: 'Nyår på REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 dec från 23:00 till morgonen`,
    description:
      'En speciell natt, en internationell publik och Milanos energi för att välkomna 2027. REPVBLIC öppnar kl. 23:00 till morgonen med tolvslaget, skål i flûte, internationella hits, hiphop och house. One night. All nations. A new beginning.',
    musicAndFormat: 'Internationella hits, hiphop & house · Tolvslagets skål (23:00–05:00)',
    dressCode: 'Stilren och uppklädd nyårslook',
    priceSummary: 'Early Bird €45 (flûte + 1 drink) · Dancefloor-bord €600 (6 gäster) · Privé-bord €1.200 (10 gäster)',
    tiers: [
      { label: 'Early Bird (från 23:00)', price: '€45 per person', details: 'Entré med flûte till midnattsskålen och 1 drink inkluderat' },
      { label: 'Bord Dancefloor Zone', price: '€600 för 6 personer', details: 'Reserverat bord mitt i festens hjärta' },
      { label: 'Bord Privé VIP Zone', price: '€1.200 för 10 personer', details: 'Reserverat bord i vår exklusiva VIP-avdelning' },
    ],
    highlights: [`Klubb: REPVBLIC Milano (${ADDR})`, `Tid: 31 dec · ${HOURS}`, 'Musik: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Officiellt bekräftade priser 2026/2027 REPVBLIC Milano: Early Bird €45, Dancefloor €600 (6 pers.), Privé €1.200 (10 pers.). WhatsApp +39 351 912 7047.',
  },
  no: {
    title: 'Nyttårsaften på REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. des fra 23:00 til morgenen`,
    description:
      'En spesiell natt, et internasjonalt publikum og all energien i Milano for å ønske 2027 velkommen. REPVBLIC åpner kl. 23:00 og fester til morgenen med nedtelling til midnatt, bobler, internasjonale hits, hiphop og house. One night. All nations. A new beginning.',
    musicAndFormat: 'Internasjonale hits, hiphop & house · Midnattsskål (23:00–05:00)',
    dressCode: 'Stilfull og gjennomført nyttårsantrekk',
    priceSummary: 'Early Bird €45 (flûte + 1 drink) · Dancefloor-bord €600 (6 gjester) · Privé-bord €1.200 (10 gjester)',
    tiers: [
      { label: 'Early Bird (fra 23:00)', price: '€45 per person', details: 'Inngang med flûte til midnattsskål og én drink inkludert' },
      { label: 'Bord Dancefloor-sone', price: '€600 for 6 personer', details: 'Reservert bord midt på dansegulvet' },
      { label: 'Bord Privé VIP-sone', price: '€1.200 for 10 personer', details: 'Reservert bord i eksklusivt VIP-område' },
    ],
    highlights: [`Sted: REPVBLIC Milano (${ADDR})`, `Tid: 31. des · ${HOURS}`, 'Musikk: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Offisielt bekreftede priser 2026/2027 REPVBLIC Milano: Early Bird €45, Dancefloor €600 (6 pers.), Privé €1.200 (10 pers.). WhatsApp +39 351 912 7047.',
  },
  is: {
    title: 'Áramót á REPVBLIC Mílanó 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. des frá 23:00 til morguns`,
    description:
      'Sérstök nótt, alþjóðlegir gestir og orka Mílanóborgar til að taka á móti árinu 2027. REPVBLIC opnar kl. 23:00 með niðurtalningu á miðnætti, kampavínsskál, alþjóðlegum smellum, hip-hop og house fram á morgun. One night. All nations. A new beginning.',
    musicAndFormat: 'Alþjóðlegir smellir, hip-hop & house · Miðnæturskál (23:00–05:00)',
    dressCode: 'Fágaður og glæsilegur gamlársdagsútbúnaður',
    priceSummary: 'Early Bird 45€ (glas + 1 drykkur) · Dancefloor borð 600€ (6 manns) · Privé borð 1.200€ (10 manns)',
    tiers: [
      { label: 'Early Bird (frá 23:00)', price: '45€ á mann', details: 'Aðgangur með glasi fyrir miðnæturskál og einum drykk inniföldum' },
      { label: 'Borð á Dancefloor svæði', price: '600€ fyrir 6 manns', details: 'Frátekið borð í hjarta gleðinnar' },
      { label: 'Borð á Privé VIP svæði', price: '1.200€ fyrir 10 manns', details: 'Frátekið borð á einkasvæði VIP' },
    ],
    highlights: [`Staður: REPVBLIC Milano (${ADDR})`, `Tími: 31. des · ${HOURS}`, 'Tónlist: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Opinber staðfest verðskrá 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 manns), Privé 1.200€ (10 manns). WhatsApp +39 351 912 7047.',
  },
  uk: {
    title: 'Новий рік у REPVBLIC Мілан 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Мілан · ${ADDR} · 31 гру з 23:00 до ранку`,
    description:
      'Особлива ніч, міжнародна публіка та вся енергія Мілана для зустрічі 2027 року. REPVBLIC чекає з 23:00 до ранку: зворотний відлік опівночі, тост із келихами, світові хіти, хіп-хоп і хаус. One night. All nations. A new beginning.',
    musicAndFormat: 'Світові хіти, хіп-хоп і хаус · Опівнічний тост (23:00–05:00)',
    dressCode: 'Стильний та елегантний новорічний образ',
    priceSummary: 'Early Bird 45€ (келих + 1 напій) · Стіл Dancefloor 600€ (6 осіб) · Стіл Privé 1.200€ (10 осіб)',
    tiers: [
      { label: 'Early Bird (з 23:00)', price: '45€ / особа', details: 'Вхід із келихом для опівнічного тосту та одним напоєм включено' },
      { label: 'Стіл зона Dancefloor', price: '600€ / 6 осіб', details: 'Заброньований стіл у самому центрі танцполу' },
      { label: 'Стіл зона Privé VIP', price: '1.200€ / 10 осіб', details: 'Заброньований стіл в ексклюзивній VIP-зоні' },
    ],
    highlights: [`Клуб: REPVBLIC Milano (${ADDR})`, `Час: 31 грудня · ${HOURS}`, 'Музика: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Офіційно підтверджені тарифи 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 осіб), Privé 1.200€ (10 осіб). WhatsApp +39 351 912 7047.',
  },
  sq: {
    title: 'Viti i Ri në REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 dhj nga ora 23:00 deri në mëngjes`,
    description:
      'Një natë e veçantë, publik ndërkombëtar dhe e gjithë energjia e Milanos për të pritur vitin 2027. REPVBLIC ju pret nga ora 23:00 deri në mëngjes me numërimin mbrapsht, dolli në mesnatë, hite ndërkombëtare, hip hop dhe house. One night. All nations. A new beginning.',
    musicAndFormat: 'Hite Ndërkombëtare, Hip Hop & House · Dolli e mesnatës (23:00–05:00)',
    dressCode: 'Pamje e kuruar dhe elegante për natën e Vitit të Ri',
    priceSummary: 'Early Bird 45€ (flûte + 1 pije) · Tavolinë Dancefloor 600€ (6 pers.) · Tavolinë Privé 1.200€ (10 pers.)',
    tiers: [
      { label: 'Early Bird (nga 23:00)', price: '45€ / person', details: 'Hyrje me flûte për dollinë e mesnatës dhe një pije të përfshirë' },
      { label: 'Tavolinë Zona Dancefloor', price: '600€ për 6 persona', details: 'Tavolinë e rezervuar në zemër të festës' },
      { label: 'Tavolinë Zona Privé VIP', price: '1.200€ për 10 persona', details: 'Tavolinë e rezervuar në zonën ekskluzive VIP' },
    ],
    highlights: [`Lokali: REPVBLIC Milano (${ADDR})`, `Orari: 31 dhj · ${HOURS}`, 'Muzika: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Çmimet zyrtare të konfirmuara 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 pers.), Privé 1.200€ (10 pers.). WhatsApp +39 351 912 7047.',
  },
  sr: {
    title: 'Nova godina u REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. dec od 23:00 do jutra`,
    description:
      'Posebna noć, međunarodna publika i energija Milana za doček 2027. godine. REPVBLIC vas očekuje od 23:00 do jutra uz odbrojavanje u ponoć, zdravicu, internacionalne hitove, hip-hop i house. One night. All nations. A new beginning.',
    musicAndFormat: 'Internacionalni hitovi, hip-hop & house · Ponoćna zdravica (23:00–05:00)',
    dressCode: 'Elegantan i sređen novogodišnji izgled',
    priceSummary: 'Early Bird 45€ (šampanjac + 1 piće) · Sto Dancefloor 600€ (6 os.) · Sto Privé 1.200€ (10 os.)',
    tiers: [
      { label: 'Early Bird (od 23:00)', price: '45€ po osobi', details: 'Ulaz sa čašom za ponoćnu zdravicu i jednim pićem uključenim' },
      { label: 'Sto zona Dancefloor', price: '600€ za 6 osoba', details: 'Rezervisan sto u samom centru zabave' },
      { label: 'Sto zona Privé VIP', price: '1.200€ za 10 osoba', details: 'Rezervisan sto u ekskluzivnoj VIP zoni' },
    ],
    highlights: [`Klub: REPVBLIC Milano (${ADDR})`, `Vreme: 31. dec · ${HOURS}`, 'Muzika: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Zvanično potvrđen cenovnik 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 os.), Privé 1.200€ (10 os.). WhatsApp +39 351 912 7047.',
  },
  bs: {
    title: 'Nova godina u REPVBLIC Milano 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31. dec od 23:00 do jutra`,
    description:
      'Posebna noć, međunarodna publika i sva energija Milana za doček 2027. REPVBLIC vas čeka od 23:00 do jutra uz ponoćno odbrojavanje, zdravicu, internacionalne hitove, hip-hop i house. One night. All nations. A new beginning.',
    musicAndFormat: 'Internacionalni hitovi, hip-hop & house · Ponoćna zdravica (23:00–05:00)',
    dressCode: 'Elegantan i njegovan novogodišnji look',
    priceSummary: 'Early Bird 45€ (flûte + 1 piće) · Stol Dancefloor 600€ (6 os.) · Stol Privé 1.200€ (10 os.)',
    tiers: [
      { label: 'Early Bird (od 23:00)', price: '45€ po osobi', details: 'Ulaz sa čašom za ponoćnu zdravicu i jednim pićem uključeno' },
      { label: 'Stol zona Dancefloor', price: '600€ za 6 osoba', details: 'Rezervisan stol u srcu zabave' },
      { label: 'Stol zona Privé VIP', price: '1.200€ za 10 osoba', details: 'Rezervisan stol u ekskluzivnoj VIP zoni' },
    ],
    highlights: [`Klub: REPVBLIC Milano (${ADDR})`, `Vrijeme: 31. dec · ${HOURS}`, 'Muzika: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Zvanično potvrđene cijene 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 os.), Privé 1.200€ (10 os.). WhatsApp +39 351 912 7047.',
  },
  mk: {
    title: 'Нова година во REPVBLIC Милано 2027 · Piazza della Repubblica 12',
    subtitle: `REPVBLIC Milano · ${ADDR} · 31 дек од 23:00 до утрото`,
    description:
      'Посебна ноќ, меѓународна публика и целата енергија на Милано за пречек на 2027. REPVBLIC ве очекува од 23:00 до утрото со полноќно одбројување, здравица, интернационални хитови, хип-хоп и хаус. One night. All nations. A new beginning.',
    musicAndFormat: 'Интернационални хитови, хип-хоп & хаус · Полноќна здравица (23:00–05:00)',
    dressCode: 'Елегантен и внимателно одбран новогодишен изглед',
    priceSummary: 'Early Bird 45€ (шампањ + 1 пијалок) · Маса Dancefloor 600€ (6 лиц.) · Маса Privé 1.200€ (10 лиц.)',
    tiers: [
      { label: 'Early Bird (од 23:00)', price: '45€ по лице', details: 'Влез со чаша за полноќната здравица и еден пијалок вклучени' },
      { label: 'Маса зона Dancefloor', price: '600€ за 6 лица', details: 'Резервирана маса во срцето на забавата' },
      { label: 'Маса зона Privé VIP', price: '1.200€ за 10 лица', details: 'Резервирана маса во ексклузивната VIP зона' },
    ],
    highlights: [`Клуб: REPVBLIC Milano (${ADDR})`, `Час: 31 дек · ${HOURS}`, 'Музика: International Hits, Hip Hop & House', PAYOFF],
    sourceBasis: 'Официјално потврдени цени 2026/2027 REPVBLIC Milano: Early Bird 45€, Dancefloor 600€ (6 лица), Privé 1.200€ (10 лица). WhatsApp +39 351 912 7047.',
  },
};

export function getRepvblicNyeContent(locale: string): CapodannoLocalizedEventContent {
  return REPVBLIC_NYE_CONTENT_35[locale as LocaleCode] || REPVBLIC_NYE_CONTENT_35.en;
}

export const REPVBLIC_NYE_SLUG = 'capodanno-repvblic-milano';

/** Official REPVBLIC NYE 2026/2027 rate card: Early Bird, Dancefloor table, Privé table (EUR). */
export const REPVBLIC_NYE_OFFER_PRICES_EUR: readonly [number, number, number] = [45, 600, 1200];

/**
 * Party-only page copy for the REPVBLIC NYE detail page (T-027, 13 Nov 2026).
 * Official source: party from 23:00 till morning, no dinner, no show, no bottle service,
 * no "almost sold out" claim. Replaces the generic Capodanno strings that mention gala dinners.
 */
export interface RepvblicNyePageCopy {
  musicLabel: string;
  tocPrices: string;
  alertTitle: string;
  alertBody: string;
  bookingSubtitle: string;
  shots: [string, string, string, string];
}

export const REPVBLIC_NYE_PAGE_COPY_35: Record<LocaleCode, RepvblicNyePageCopy> = {
  it: {
    musicLabel: 'Musica',
    tocPrices: '2. Prezzi Ufficiali, Biglietti e Tavoli VIP',
    alertTitle: '⚠️ BIGLIETTI E TAVOLI VIP · MEGLIO PRENOTARE PRESTO',
    alertBody: 'A Capodanno i posti migliori si prenotano per primi. Per comprare il biglietto Early Bird o riservare un tavolo al REPVBLIC, scrivi adesso al concierge su WhatsApp.',
    bookingSubtitle: 'Ricevi subito su WhatsApp, telefono o email il link ufficiale per il biglietto o la mappa dei tavoli Privé.',
    shots: ['Sala Principale e Atmosfera Reale', 'Countdown di Mezzanotte, Brindisi e Festa', 'Tavoli Dancefloor e Privé VIP', 'Pubblico Internazionale in Pista'],
  },
  en: {
    musicLabel: 'Music',
    tocPrices: '2. Official Prices, Tickets & VIP Tables',
    alertTitle: '⚠️ TICKETS & VIP TABLES · BOOK EARLY',
    alertBody: 'On New Year’s Eve the best spots are booked first. To buy an Early Bird ticket or reserve a table at REPVBLIC, message the concierge on WhatsApp now.',
    bookingSubtitle: 'Receive the official ticket link or VIP table floor plan via WhatsApp, phone, or email.',
    shots: ['Main Hall & Real Venue Atmosphere', 'Midnight Countdown, Toast & Party', 'Dancefloor & Privé VIP Tables', 'International Crowd on the Dancefloor'],
  },
  es: {
    musicLabel: 'Música',
    tocPrices: '2. Precios Oficiales, Entradas y Mesas VIP',
    alertTitle: '⚠️ ENTRADAS Y MESAS VIP · RESERVA CON ANTELACIÓN',
    alertBody: 'En Nochevieja los mejores sitios se reservan primero. Para comprar tu entrada Early Bird o reservar mesa en REPVBLIC, escribe ya al concierge por WhatsApp.',
    bookingSubtitle: 'Recibe por WhatsApp, teléfono o email el enlace oficial de entradas o el plano de mesas VIP.',
    shots: ['Sala Principal y Ambiente Real', 'Cuenta Atrás, Brindis de Medianoche y Fiesta', 'Mesas Dancefloor y Privé VIP', 'Público Internacional en la Pista'],
  },
  fr: {
    musicLabel: 'Musique',
    tocPrices: '2. Tarifs Officiels, Billets et Tables VIP',
    alertTitle: '⚠️ BILLETS ET TABLES VIP · RÉSERVEZ TÔT',
    alertBody: 'Pour le Nouvel An, les meilleures places partent en premier. Pour acheter votre billet Early Bird ou réserver une table au REPVBLIC, écrivez dès maintenant au concierge sur WhatsApp.',
    bookingSubtitle: 'Recevez par WhatsApp, téléphone ou e-mail le lien officiel de billetterie ou le plan des tables VIP.',
    shots: ['Salle Principale et Ambiance Réelle', 'Compte à Rebours, Toast de Minuit et Fête', 'Tables Dancefloor et Privé VIP', 'Public International sur le Dancefloor'],
  },
  de: {
    musicLabel: 'Musik',
    tocPrices: '2. Offizielle Preise, Tickets & VIP-Tische',
    alertTitle: '⚠️ TICKETS & VIP-TISCHE · FRÜH BUCHEN',
    alertBody: 'An Silvester sind die besten Plätze zuerst vergeben. Für ein Early-Bird-Ticket oder einen Tisch im REPVBLIC schreiben Sie dem Concierge jetzt auf WhatsApp.',
    bookingSubtitle: 'Erhalten Sie per WhatsApp, Telefon oder E-Mail den offiziellen Ticketlink oder den VIP-Tischplan.',
    shots: ['Hauptsaal & echte Club-Atmosphäre', 'Countdown, Mitternachtstoast & Party', 'Dancefloor- & Privé-VIP-Tische', 'Internationales Publikum auf dem Dancefloor'],
  },
  pt: {
    musicLabel: 'Música',
    tocPrices: '2. Preços Oficiais, Ingressos e Mesas VIP',
    alertTitle: '⚠️ INGRESSOS E MESAS VIP · RESERVE CEDO',
    alertBody: 'No Réveillon, os melhores lugares são reservados primeiro. Para comprar o ingresso Early Bird ou reservar uma mesa no REPVBLIC, fale agora com o concierge pelo WhatsApp.',
    bookingSubtitle: 'Receba por WhatsApp, telefone ou e-mail o link oficial de ingressos ou o mapa de mesas VIP.',
    shots: ['Salão Principal e Ambiente Real', 'Contagem Regressiva, Brinde da Meia-Noite e Festa', 'Mesas Dancefloor e Privé VIP', 'Público Internacional na Pista'],
  },
  nl: {
    musicLabel: 'Muziek',
    tocPrices: '2. Officiële Prijzen, Tickets en VIP-Tafels',
    alertTitle: '⚠️ TICKETS EN VIP-TAFELS · BOEK OP TIJD',
    alertBody: 'Met oud en nieuw zijn de beste plekken het eerst weg. Wil je een Early Bird-ticket kopen of een tafel reserveren bij REPVBLIC, stuur de concierge dan nu een WhatsApp.',
    bookingSubtitle: 'Ontvang via WhatsApp, telefoon of e-mail de officiële ticketlink of de plattegrond van de VIP-tafels.',
    shots: ['Hoofdzaal en Echte Sfeer', 'Aftellen, Proosten om Middernacht en Feest', 'Dancefloor- en Privé VIP-Tafels', 'Internationaal Publiek op de Dansvloer'],
  },
  ru: {
    musicLabel: 'Музыка',
    tocPrices: '2. Официальные цены, билеты и VIP-столы',
    alertTitle: '⚠️ БИЛЕТЫ И VIP-СТОЛЫ · БРОНИРУЙТЕ ЗАРАНЕЕ',
    alertBody: 'В новогоднюю ночь лучшие места бронируют первыми. Чтобы купить билет Early Bird или забронировать стол в REPVBLIC, напишите консьержу в WhatsApp прямо сейчас.',
    bookingSubtitle: 'Получите в WhatsApp, по телефону или email официальную ссылку на билеты или схему VIP-столов.',
    shots: ['Главный зал и атмосфера клуба', 'Обратный отсчёт, бокалы в полночь и вечеринка', 'Столы у танцпола и VIP Privé', 'Международная публика на танцполе'],
  },
  tr: {
    musicLabel: 'Müzik',
    tocPrices: '2. Resmî Fiyatlar, Biletler ve VIP Masalar',
    alertTitle: '⚠️ BİLETLER VE VIP MASALAR · ERKEN REZERVASYON',
    alertBody: 'Yılbaşı gecesi en iyi yerler önce dolar. Early Bird bilet almak ya da REPVBLIC’te masa ayırtmak için concierge’e hemen WhatsApp’tan yazın.',
    bookingSubtitle: 'Resmî bilet bağlantısını veya VIP masa planını WhatsApp, telefon ya da e-posta ile hemen alın.',
    shots: ['Ana Salon ve Gerçek Mekân Atmosferi', 'Geri Sayım, Gece Yarısı Kadeh Kaldırma ve Parti', 'Dancefloor ve Privé VIP Masalar', 'Pistte Uluslararası Kalabalık'],
  },
  zh: {
    musicLabel: '音乐',
    tocPrices: '2. 官方价格、门票与VIP卡座',
    alertTitle: '⚠️ 门票与VIP卡座 · 建议尽早预订',
    alertBody: '跨年夜最好的位置总是最先被订走。如需购买Early Bird门票或预订REPVBLIC卡座，请立即通过WhatsApp联系礼宾。',
    bookingSubtitle: '通过WhatsApp、电话或电子邮件获取官方购票链接或VIP卡座平面图。',
    shots: ['主厅与真实场地氛围', '午夜倒数、举杯与派对', '舞池卡座与Privé VIP卡座', '舞池中的国际宾客'],
  },
  ar: {
    musicLabel: 'الموسيقى',
    tocPrices: '2. الأسعار الرسمية والتذاكر وطاولات VIP',
    alertTitle: '⚠️ التذاكر وطاولات VIP · احجز مبكرًا',
    alertBody: 'في ليلة رأس السنة تُحجز أفضل الأماكن أولًا. لشراء تذكرة Early Bird أو حجز طاولة في REPVBLIC، راسل الكونسيرج عبر واتساب الآن.',
    bookingSubtitle: 'احصل عبر واتساب أو الهاتف أو البريد الإلكتروني على رابط التذاكر الرسمي أو مخطط طاولات VIP.',
    shots: ['القاعة الرئيسية والأجواء الحقيقية', 'العد التنازلي ونخب منتصف الليل والحفلة', 'طاولات حلبة الرقص وطاولات Privé VIP', 'جمهور دولي على حلبة الرقص'],
  },
  bg: {
    musicLabel: 'Музика',
    tocPrices: '2. Официални цени, билети и VIP маси',
    alertTitle: '⚠️ БИЛЕТИ И VIP МАСИ · РЕЗЕРВИРАЙТЕ НАВРЕМЕ',
    alertBody: 'В новогодишната нощ най-добрите места се запазват първи. За билет Early Bird или маса в REPVBLIC пишете на консиержа в WhatsApp още сега.',
    bookingSubtitle: 'Получете по WhatsApp, телефон или имейл официалния линк за билети или плана на VIP масите.',
    shots: ['Основна зала и истинска атмосфера', 'Обратно броене, наздравица в полунощ и парти', 'Маси на дансинга и Privé VIP маси', 'Международна публика на дансинга'],
  },
  hr: {
    musicLabel: 'Glazba',
    tocPrices: '2. Službene cijene, ulaznice i VIP stolovi',
    alertTitle: '⚠️ ULAZNICE I VIP STOLOVI · REZERVIRAJTE NA VRIJEME',
    alertBody: 'Za doček Nove godine najbolja se mjesta prva rezerviraju. Za ulaznicu Early Bird ili stol u REPVBLIC-u odmah pišite concierge službi na WhatsApp.',
    bookingSubtitle: 'Primite putem WhatsAppa, telefona ili e-pošte službenu poveznicu za ulaznice ili raspored VIP stolova.',
    shots: ['Glavna dvorana i stvarna atmosfera', 'Odbrojavanje, ponoćna zdravica i zabava', 'Stolovi uz plesni podij i Privé VIP', 'Međunarodna publika na plesnom podiju'],
  },
  cs: {
    musicLabel: 'Hudba',
    tocPrices: '2. Oficiální ceny, vstupenky a VIP stoly',
    alertTitle: '⚠️ VSTUPENKY A VIP STOLY · REZERVUJTE VČAS',
    alertBody: 'Na Silvestra se nejlepší místa rezervují jako první. Vstupenku Early Bird nebo stůl v REPVBLIC si zajistíte zprávou conciergeovi na WhatsApp ještě dnes.',
    bookingSubtitle: 'Získejte přes WhatsApp, telefon nebo e-mail oficiální odkaz na vstupenky nebo plánek VIP stolů.',
    shots: ['Hlavní sál a skutečná atmosféra', 'Odpočítávání, půlnoční přípitek a párty', 'Stoly u parketu a Privé VIP', 'Mezinárodní publikum na parketu'],
  },
  da: {
    musicLabel: 'Musik',
    tocPrices: '2. Officielle priser, billetter og VIP-borde',
    alertTitle: '⚠️ BILLETTER OG VIP-BORDE · BOOK I GOD TID',
    alertBody: 'Nytårsaften bliver de bedste pladser booket først. Vil du købe en Early Bird-billet eller reservere bord på REPVBLIC, så skriv til concierge på WhatsApp nu.',
    bookingSubtitle: 'Få det officielle billetlink eller bordplanen for VIP-bordene på WhatsApp, telefon eller e-mail.',
    shots: ['Hovedsal og ægte stemning', 'Nedtælling, skål ved midnat og fest', 'Dancefloor- og Privé VIP-borde', 'Internationalt publikum på dansegulvet'],
  },
  et: {
    musicLabel: 'Muusika',
    tocPrices: '2. Ametlikud hinnad, piletid ja VIP-lauad',
    alertTitle: '⚠️ PILETID JA VIP-LAUAD · BRONEERI VARAKULT',
    alertBody: 'Aastavahetusel broneeritakse parimad kohad esimesena. Early Bird pileti ostmiseks või REPVBLICus laua broneerimiseks kirjuta kohe concierge’ile WhatsAppis.',
    bookingSubtitle: 'Saa WhatsAppis, telefoni teel või e-postiga ametlik piletilink või VIP-laudade plaan.',
    shots: ['Peasaal ja tõeline õhkkond', 'Kesköö loendus, toost ja pidu', 'Tantsupõranda ja Privé VIP-lauad', 'Rahvusvaheline publik tantsupõrandal'],
  },
  fi: {
    musicLabel: 'Musiikki',
    tocPrices: '2. Viralliset hinnat, liput ja VIP-pöydät',
    alertTitle: '⚠️ LIPUT JA VIP-PÖYDÄT · VARAA AJOISSA',
    alertBody: 'Uudenvuodenaattona parhaat paikat varataan ensimmäisinä. Osta Early Bird -lippu tai varaa pöytä REPVBLICista kirjoittamalla conciergelle WhatsAppissa heti.',
    bookingSubtitle: 'Saat virallisen lippulinkin tai VIP-pöytien pohjapiirroksen WhatsAppilla, puhelimitse tai sähköpostilla.',
    shots: ['Pääsali ja aito tunnelma', 'Keskiyön lähtölaskenta, malja ja juhlat', 'Tanssilattian ja Privé VIP -pöydät', 'Kansainvälinen yleisö tanssilattialla'],
  },
  el: {
    musicLabel: 'Μουσική',
    tocPrices: '2. Επίσημες τιμές, εισιτήρια και τραπέζια VIP',
    alertTitle: '⚠️ ΕΙΣΙΤΗΡΙΑ ΚΑΙ ΤΡΑΠΕΖΙΑ VIP · ΚΛΕΙΣΤΕ ΝΩΡΙΣ',
    alertBody: 'Την παραμονή της Πρωτοχρονιάς οι καλύτερες θέσεις κλείνονται πρώτες. Για εισιτήριο Early Bird ή τραπέζι στο REPVBLIC, στείλτε τώρα μήνυμα στον concierge στο WhatsApp.',
    bookingSubtitle: 'Λάβετε μέσω WhatsApp, τηλεφώνου ή email τον επίσημο σύνδεσμο εισιτηρίων ή την κάτοψη των τραπεζιών VIP.',
    shots: ['Κεντρική αίθουσα και πραγματική ατμόσφαιρα', 'Αντίστροφη μέτρηση, πρόποση τα μεσάνυχτα και πάρτι', 'Τραπέζια πίστας και Privé VIP', 'Διεθνές κοινό στην πίστα'],
  },
  hu: {
    musicLabel: 'Zene',
    tocPrices: '2. Hivatalos árak, jegyek és VIP-asztalok',
    alertTitle: '⚠️ JEGYEK ÉS VIP-ASZTALOK · FOGLALJ IDŐBEN',
    alertBody: 'Szilveszterkor a legjobb helyeket foglalják le először. Early Bird jegyért vagy asztalfoglalásért a REPVBLIC-be írj most a conciergenek WhatsAppon.',
    bookingSubtitle: 'Kérd WhatsAppon, telefonon vagy e-mailben a hivatalos jegylinket vagy a VIP-asztalok alaprajzát.',
    shots: ['Nagyterem és valódi hangulat', 'Éjféli visszaszámlálás, koccintás és buli', 'Táncparkett melletti és Privé VIP-asztalok', 'Nemzetközi közönség a táncparketten'],
  },
  ga: {
    musicLabel: 'Ceol',
    tocPrices: '2. Praghsanna Oifigiúla, Ticéid agus Boird VIP',
    alertTitle: '⚠️ TICÉID AGUS BOIRD VIP · CUIR IN ÁIRITHE GO LUATH',
    alertBody: 'Oíche Chinn Bliana, cuirtear na háiteanna is fearr in áirithe ar dtús. Chun ticéad Early Bird a cheannach nó bord a chur in áirithe in REPVBLIC, seol teachtaireacht chuig an concierge ar WhatsApp anois.',
    bookingSubtitle: 'Faigh an nasc oifigiúil ticéad nó plean urláir na mbord VIP trí WhatsApp, ar an bhfón nó trí ríomhphost.',
    shots: ['An Phríomhhalla agus an tAtmaisféar Fíor', 'Comhaireamh Meánoíche, Sláinte agus Cóisir', 'Boird an Urláir Rince agus Privé VIP', 'Slua Idirnáisiúnta ar an Urlár Rince'],
  },
  lv: {
    musicLabel: 'Mūzika',
    tocPrices: '2. Oficiālās cenas, biļetes un VIP galdi',
    alertTitle: '⚠️ BIĻETES UN VIP GALDI · REZERVĒ LAICĪGI',
    alertBody: 'Vecgada vakarā labākās vietas tiek rezervētas pirmās. Lai iegādātos Early Bird biļeti vai rezervētu galdu REPVBLIC, raksti konsjeržam WhatsApp jau tagad.',
    bookingSubtitle: 'Saņem WhatsApp, pa tālruni vai e-pastā oficiālo biļešu saiti vai VIP galdu plānu.',
    shots: ['Galvenā zāle un īsta atmosfēra', 'Pusnakts atskaite, tosts un ballīte', 'Deju grīdas un Privé VIP galdi', 'Starptautiska publika uz deju grīdas'],
  },
  lt: {
    musicLabel: 'Muzika',
    tocPrices: '2. Oficialios kainos, bilietai ir VIP staliukai',
    alertTitle: '⚠️ BILIETAI IR VIP STALIUKAI · REZERVUOKITE IŠ ANKSTO',
    alertBody: 'Naujųjų metų naktį geriausios vietos rezervuojamos pirmiausia. Norėdami įsigyti Early Bird bilietą ar rezervuoti staliuką REPVBLIC, parašykite konsjeržui per WhatsApp dabar.',
    bookingSubtitle: 'Gaukite oficialią bilietų nuorodą arba VIP staliukų planą per WhatsApp, telefonu ar el. paštu.',
    shots: ['Pagrindinė salė ir tikra atmosfera', 'Vidurnakčio atgalinis skaičiavimas, tostas ir vakarėlis', 'Šokių aikštelės ir Privé VIP staliukai', 'Tarptautinė publika šokių aikštelėje'],
  },
  mt: {
    musicLabel: 'Mużika',
    tocPrices: '2. Prezzijiet Uffiċjali, Biljetti u Mwejjed VIP',
    alertTitle: '⚠️ BILJETTI U MWEJJED VIP · IBBUKKJA KMIENI',
    alertBody: 'Lejlet l-Ewwel tas-Sena, l-aħjar postijiet jiġu bbukkjati l-ewwel. Biex tixtri biljett Early Bird jew tirriżerva mejda f’REPVBLIC, ibgħat messaġġ lill-concierge fuq WhatsApp issa.',
    bookingSubtitle: 'Irċievi l-link uffiċjali tal-biljetti jew il-pjanta tal-imwejjed VIP fuq WhatsApp, bit-telefon jew bl-email.',
    shots: ['Is-Sala Prinċipali u l-Atmosfera Reali', 'Countdown ta’ Nofsillejl, Brindisi u Festa', 'Mwejjed tad-Dancefloor u Privé VIP', 'Folla Internazzjonali fuq id-Dancefloor'],
  },
  pl: {
    musicLabel: 'Muzyka',
    tocPrices: '2. Oficjalne ceny, bilety i stoliki VIP',
    alertTitle: '⚠️ BILETY I STOLIKI VIP · ZAREZERWUJ WCZEŚNIEJ',
    alertBody: 'W sylwestra najlepsze miejsca rezerwuje się najwcześniej. Aby kupić bilet Early Bird lub zarezerwować stolik w REPVBLIC, napisz od razu do konsjerża na WhatsAppie.',
    bookingSubtitle: 'Otrzymaj przez WhatsApp, telefon lub e-mail oficjalny link do biletów albo plan stolików VIP.',
    shots: ['Sala główna i prawdziwy klimat', 'Odliczanie, toast o północy i impreza', 'Stoliki przy parkiecie i Privé VIP', 'Międzynarodowa publiczność na parkiecie'],
  },
  ro: {
    musicLabel: 'Muzică',
    tocPrices: '2. Prețuri oficiale, bilete și mese VIP',
    alertTitle: '⚠️ BILETE ȘI MESE VIP · REZERVĂ DIN TIMP',
    alertBody: 'De Revelion, cele mai bune locuri se rezervă primele. Ca să cumperi un bilet Early Bird sau să rezervi o masă la REPVBLIC, scrie-i acum concierge-ului pe WhatsApp.',
    bookingSubtitle: 'Primește pe WhatsApp, la telefon sau pe e-mail linkul oficial pentru bilete sau planul meselor VIP.',
    shots: ['Sala principală și atmosfera reală', 'Numărătoarea inversă, toastul de la miezul nopții și petrecerea', 'Mese la ring și Privé VIP', 'Public internațional pe ringul de dans'],
  },
  sk: {
    musicLabel: 'Hudba',
    tocPrices: '2. Oficiálne ceny, vstupenky a VIP stoly',
    alertTitle: '⚠️ VSTUPENKY A VIP STOLY · REZERVUJTE SI VČAS',
    alertBody: 'Na Silvestra sa najlepšie miesta rezervujú ako prvé. Vstupenku Early Bird alebo stôl v REPVBLIC si zabezpečíte správou conciergeovi na WhatsApp ešte dnes.',
    bookingSubtitle: 'Získajte cez WhatsApp, telefón alebo e-mail oficiálny odkaz na vstupenky alebo plánik VIP stolov.',
    shots: ['Hlavná sála a skutočná atmosféra', 'Polnočné odpočítavanie, prípitok a párty', 'Stoly pri parkete a Privé VIP', 'Medzinárodné publikum na parkete'],
  },
  sl: {
    musicLabel: 'Glasba',
    tocPrices: '2. Uradne cene, vstopnice in VIP mize',
    alertTitle: '⚠️ VSTOPNICE IN VIP MIZE · REZERVIRAJTE PRAVOČASNO',
    alertBody: 'Na silvestrovo so najboljša mesta rezervirana prva. Za vstopnico Early Bird ali mizo v REPVBLIC takoj pišite conciergeu na WhatsApp.',
    bookingSubtitle: 'Prejmite po WhatsAppu, telefonu ali e-pošti uradno povezavo do vstopnic ali tloris VIP miz.',
    shots: ['Glavna dvorana in pravo vzdušje', 'Polnočno odštevanje, nazdravljanje in zabava', 'Mize ob plesišču in Privé VIP', 'Mednarodna publika na plesišču'],
  },
  sv: {
    musicLabel: 'Musik',
    tocPrices: '2. Officiella priser, biljetter och VIP-bord',
    alertTitle: '⚠️ BILJETTER OCH VIP-BORD · BOKA I TID',
    alertBody: 'På nyårsafton bokas de bästa platserna först. Vill du köpa en Early Bird-biljett eller boka bord på REPVBLIC, skriv till concierge på WhatsApp nu.',
    bookingSubtitle: 'Få den officiella biljettlänken eller bordskartan för VIP-borden via WhatsApp, telefon eller e-post.',
    shots: ['Stora salen och äkta stämning', 'Nedräkning, skål vid midnatt och fest', 'Dansgolvs- och Privé VIP-bord', 'Internationell publik på dansgolvet'],
  },
  no: {
    musicLabel: 'Musikk',
    tocPrices: '2. Offisielle priser, billetter og VIP-bord',
    alertTitle: '⚠️ BILLETTER OG VIP-BORD · BESTILL I GOD TID',
    alertBody: 'På nyttårsaften blir de beste plassene booket først. Vil du kjøpe en Early Bird-billett eller reservere bord på REPVBLIC, send concierge en melding på WhatsApp nå.',
    bookingSubtitle: 'Få den offisielle billettlenken eller bordkartet for VIP-bordene på WhatsApp, telefon eller e-post.',
    shots: ['Hovedsalen og ekte stemning', 'Nedtelling, skål ved midnatt og fest', 'Dansegulv- og Privé VIP-bord', 'Internasjonalt publikum på dansegulvet'],
  },
  is: {
    musicLabel: 'Tónlist',
    tocPrices: '2. Opinber verð, miðar og VIP-borð',
    alertTitle: '⚠️ MIÐAR OG VIP-BORÐ · BÓKAÐU TÍMANLEGA',
    alertBody: 'Á gamlárskvöld eru bestu sætin bókuð fyrst. Til að kaupa Early Bird miða eða taka frá borð á REPVBLIC skaltu senda móttökuþjónustunni skilaboð á WhatsApp núna.',
    bookingSubtitle: 'Fáðu opinbera miðahlekkinn eða teikningu af VIP-borðunum á WhatsApp, í síma eða með tölvupósti.',
    shots: ['Aðalsalurinn og raunveruleg stemning', 'Niðurtalning, skál á miðnætti og partý', 'Borð við dansgólfið og Privé VIP', 'Alþjóðlegur hópur á dansgólfinu'],
  },
  uk: {
    musicLabel: 'Музика',
    tocPrices: '2. Офіційні ціни, квитки та VIP-столи',
    alertTitle: '⚠️ КВИТКИ ТА VIP-СТОЛИ · БРОНЮЙТЕ ЗАЗДАЛЕГІДЬ',
    alertBody: 'У новорічну ніч найкращі місця бронюють першими. Щоб купити квиток Early Bird або забронювати стіл у REPVBLIC, напишіть консьєржу у WhatsApp просто зараз.',
    bookingSubtitle: 'Отримайте у WhatsApp, телефоном або email офіційне посилання на квитки чи схему VIP-столів.',
    shots: ['Головна зала та справжня атмосфера', 'Опівнічний відлік, келихи та вечірка', 'Столи біля танцполу та VIP Privé', 'Міжнародна публіка на танцполі'],
  },
  sq: {
    musicLabel: 'Muzika',
    tocPrices: '2. Çmimet zyrtare, biletat dhe tavolinat VIP',
    alertTitle: '⚠️ BILETAT DHE TAVOLINAT VIP · REZERVO HERËT',
    alertBody: 'Natën e Vitit të Ri, vendet më të mira rezervohen të parat. Për të blerë biletën Early Bird ose për të rezervuar një tavolinë në REPVBLIC, shkruaji tani concierge-it në WhatsApp.',
    bookingSubtitle: 'Merr në WhatsApp, me telefon ose me email linkun zyrtar të biletave ose planin e tavolinave VIP.',
    shots: ['Salla kryesore dhe atmosfera e vërtetë', 'Numërimi mbrapsht, dolli e mesnatës dhe festa', 'Tavolinat pranë pistës dhe Privé VIP', 'Publik ndërkombëtar në pistë'],
  },
  sr: {
    musicLabel: 'Muzika',
    tocPrices: '2. Zvanične cene, ulaznice i VIP stolovi',
    alertTitle: '⚠️ ULAZNICE I VIP STOLOVI · REZERVIŠITE NA VREME',
    alertBody: 'Za doček Nove godine najbolja mesta se prva rezervišu. Za ulaznicu Early Bird ili sto u REPVBLIC-u odmah pišite konsijerž službi na WhatsApp.',
    bookingSubtitle: 'Dobijte putem WhatsApp-a, telefona ili mejla zvanični link za ulaznice ili raspored VIP stolova.',
    shots: ['Glavna sala i prava atmosfera', 'Ponoćno odbrojavanje, zdravica i žurka', 'Stolovi pored podijuma i Privé VIP', 'Međunarodna publika na podijumu'],
  },
  bs: {
    musicLabel: 'Muzika',
    tocPrices: '2. Zvanične cijene, ulaznice i VIP stolovi',
    alertTitle: '⚠️ ULAZNICE I VIP STOLOVI · REZERVIŠITE NA VRIJEME',
    alertBody: 'Za doček Nove godine najbolja mjesta se prva rezervišu. Za ulaznicu Early Bird ili stol u REPVBLIC-u odmah pišite konsijerž službi na WhatsApp.',
    bookingSubtitle: 'Dobijte putem WhatsAppa, telefona ili e-maila zvanični link za ulaznice ili raspored VIP stolova.',
    shots: ['Glavna sala i prava atmosfera', 'Ponoćno odbrojavanje, zdravica i žurka', 'Stolovi uz plesni podij i Privé VIP', 'Međunarodna publika na plesnom podiju'],
  },
  mk: {
    musicLabel: 'Музика',
    tocPrices: '2. Официјални цени, билети и VIP маси',
    alertTitle: '⚠️ БИЛЕТИ И VIP МАСИ · РЕЗЕРВИРАЈТЕ НАВРЕМЕ',
    alertBody: 'За дочекот на Новата година најдобрите места први се резервираат. За билет Early Bird или маса во REPVBLIC, веднаш пишете му на консиержот на WhatsApp.',
    bookingSubtitle: 'Добијте преку WhatsApp, телефон или е-пошта официјален линк за билети или распоред на VIP масите.',
    shots: ['Главна сала и вистинска атмосфера', 'Полноќно одбројување, здравица и забава', 'Маси покрај подиумот и Privé VIP', 'Меѓународна публика на подиумот'],
  },
};

export function isRepvblicNyeSlug(slug: string | undefined | null): boolean {
  return slug === REPVBLIC_NYE_SLUG;
}

export function getRepvblicNyePageCopy(locale: string): RepvblicNyePageCopy {
  return REPVBLIC_NYE_PAGE_COPY_35[locale as LocaleCode] || REPVBLIC_NYE_PAGE_COPY_35.en;
}
