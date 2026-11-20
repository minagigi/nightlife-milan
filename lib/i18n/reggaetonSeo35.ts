import type { LocaleCode } from './localeRegistry';

export interface ReggaetonPartnerVenueLink {
  name: string;
  district: string;
  nightTag: string;
  clubSlug?: string;
  eventSlug?: string;
}

export const REGGAETON_PARTNER_VENUES: ReadonlyArray<ReggaetonPartnerVenueLink> = [
  {
    name: 'PERREO XL @ Gate Milano',
    district: 'Via Valtellina 21 (Garibaldi)',
    nightTag: 'NYE 2027 (31/12) · €20–€50 · VIP €500–€600',
    eventSlug: 'capodanno-gate-milano',
  },
  {
    name: 'Pineta Milano · Noche de Perreo',
    district: 'Via Messina 38 (Cenisio)',
    nightTag: 'Ven & Sab · Gala 160€ / Club 40€',
    clubSlug: 'pineta-club-milano',
    eventSlug: 'capodanno-pineta-milano',
  },
  {
    name: 'Aria Club Milano · Urban & Latin',
    district: 'Piazzale dello Sport 14 (San Siro)',
    nightTag: 'Mer, Ven & Sab · Tavoli da €250',
    clubSlug: 'aria-club-milano',
    eventSlug: 'capodanno-aria-club-milano',
  },
  {
    name: 'Tocqueville 13 · Latin & Urban',
    district: 'Via Tocqueville 13 (Corso Como)',
    nightTag: 'Mar, Ven & Sab · Lista & Privé',
    clubSlug: 'tocqueville-13-milano',
    eventSlug: 'capodanno-tocqueville-13-milano',
  },
  {
    name: 'Hollywood Rythmoteque',
    district: 'Corso Como 15',
    nightTag: 'Mar–Dom · International & Urban',
    clubSlug: 'hollywood-club-milano',
    eventSlug: 'capodanno-hollywood-milano',
  },
  {
    name: 'REPVBLIC Milano',
    district: 'Piazza della Repubblica 12',
    nightTag: 'NYE Early Bird 45€ · Tavoli 600–1.200€',
    clubSlug: 'repvblic-milano',
    eventSlug: 'capodanno-repvblic-milano',
  },
  {
    name: 'The Club Milano',
    district: 'Corso Garibaldi 97 (Moscova)',
    nightTag: 'Mar–Dom · Urban, Perreo & Hip-Hop',
    clubSlug: 'the-club-milano',
    eventSlug: 'capodanno-the-club-milano',
  },
  {
    name: 'Just Me Milano (ex Just Cavalli)',
    district: 'Viale Camoens 2 (Parco Sempione)',
    nightTag: 'Aperto 7/7 · Tavoli da €320 · Gala 300€',
    clubSlug: 'just-me-milano',
    eventSlug: 'capodanno-justme-milano-torre-branca',
  },
];

type RegPack = {
  seoTitle: string;
  seoDescription: string;
  nyeFaqQ: string;
  nyeFaqA: string;
  boxEyebrow: string;
  boxTitle: string;
  boxLead: string;
  guideCta: string;
  nyeCta: string;
  clubCta: string;
};

const MAKE = (
  seoTitle: string,
  seoDescription: string,
  nyeFaqQ: string,
  nyeFaqA: string,
  boxTitle: string,
  guideCta: string,
  nyeCta: string,
  clubCta: string,
): RegPack => ({
  seoTitle,
  seoDescription,
  nyeFaqQ,
  nyeFaqA,
  boxEyebrow: 'REGGAETON & PERREO XL · 2026/2027',
  boxTitle,
  boxLead: `${boxTitle} · WhatsApp +39 351 912 7047`,
  guideCta,
  nyeCta,
  clubCta,
});

export const REGGAETON_35_PACKS: Record<LocaleCode, RegPack> = {
  it: {
    seoTitle: 'Discoteche Reggaeton Milano 2026/2027: Locali, Date & Tavoli',
    seoDescription: 'Migliori serate reggaeton e dembow a Milano: PERREO XL @ Gate (20-50€ Capodanno), Pineta, Aria, Tocqueville 13, Hollywood e Repvblic. WhatsApp +39 351 912 7047.',
    nyeFaqQ: 'Dove ballare Reggaeton a Capodanno 2027 a Milano?',
    nyeFaqA: 'L’appuntamento di riferimento è PERREO XL @ Gate Milano (Via Valtellina 21, 23:00–05:00) con prevendite 20–50€ e tavoli Pista/Privé 500–600€ (max 10 pax), oltre alle sale urban e latin dei locali partner Pineta, Aria, Tocqueville 13, Hollywood, The Club e Just Me.',
    boxEyebrow: 'LOCALI PARTNER REGGAETON & CAPODANNO 2027',
    boxTitle: 'Club Reggaeton Partner a Milano & PERREO XL @ Gate NYE 2027',
    boxLead: 'Accedi in lista nominale o prenota il tavolo VIP nei club partner verificati della scena reggaeton milanese ogni settimana e a San Silvestro.',
    guideCta: 'Guida Completa Club Partner 2027',
    nyeCta: 'Capodanno 2027',
    clubCta: 'Scheda Locale',
  },
  en: {
    seoTitle: 'Reggaeton Clubs Milan 2026/2027: Best Parties & VIP Tables',
    seoDescription: 'Top reggaeton & perreo clubs in Milan: PERREO XL @ Gate (NYE €20–€50), Pineta Noche de Perreo, Aria, Tocqueville 13 & Hollywood. WhatsApp +39 351 912 7047.',
    nyeFaqQ: 'Where is the best Reggaeton & Perreo party on NYE 2027 in Milan?',
    nyeFaqA: 'Headliner Latin urban party is PERREO XL @ Gate Milano (Via Valtellina 21, Dec 31 23:00–05:00) with €20–€50 tickets and €500–€600 VIP tables (up to 10 guests), alongside weekly nights at Pineta, Aria Club, Tocqueville 13, Hollywood, REPVBLIC, The Club, and Just Me.',
    boxEyebrow: 'REGGAETON PARTNER CLUBS & NYE 2027',
    boxTitle: 'Verified Milan Reggaeton Partner Clubs & PERREO XL @ Gate',
    boxLead: 'Direct nominal guest list access and VIP bottle tables across Milan’s leading reggaeton & urban venues every weekend plus New Year’s Eve.',
    guideCta: 'Complete Partner Clubs Guide',
    nyeCta: 'NYE 2027 Page',
    clubCta: 'Club Guide',
  },
  es: MAKE('Discotecas Reggaeton Milán 2026/2027: Locales y Mesas VIP', 'Mejores fiestas reggaeton y perreo en Milán: PERREO XL Gate, Pineta, Aria, Tocqueville 13 y Hollywood. WhatsApp +39 351 912 7047.', '¿Dónde bailar Reggaeton en Nochevieja 2027 en Milán?', 'PERREO XL @ Gate Milano (entradas 20-50€, mesas 500-600€), Pineta, Aria y Tocqueville 13.', 'Clubes Partner Reggaeton Milán & PERREO XL', 'Guía Clubes Partner', 'Nochevieja 2027', 'Ver Club'),
  fr: MAKE('Clubs Reggaeton Milan 2026/2027 : Soirées & Tables VIP', 'Meilleures soirées reggaeton à Milan : PERREO XL Gate, Pineta, Aria, Tocqueville 13 et Hollywood. WhatsApp +39 351 912 7047.', 'Où danser le Reggaeton au Nouvel An 2027 à Milan ?', 'PERREO XL @ Gate Milano (billets 20-50€, tables 500-600€), Pineta, Aria et Tocqueville 13.', 'Clubs Partenaires Reggaeton Milan & PERREO XL', 'Guide Clubs Partenaires', 'Nouvel An 2027', 'Fiche Club'),
  de: MAKE('Reggaeton Clubs Mailand 2026/2027: Partys & VIP-Tische', 'Beste Reggaeton- & Latin-Clubs in Mailand: PERREO XL Gate, Pineta, Aria, Tocqueville 13 & Hollywood. WhatsApp +39 351 912 7047.', 'Wo läuft Silvester 2027 Reggaeton in Mailand?', 'PERREO XL @ Gate Milano (Tickets 20-50€, Tische 500-600€), Pineta, Aria und Tocqueville 13.', 'Partner-Clubs Reggaeton Mailand & PERREO XL', 'Partner-Clubs Guide', 'Silvester 2027', 'Club-Details'),
  pt: MAKE('Boates Reggaeton Milão 2026/2027: Festas & Mesas VIP', 'Melhores festas reggaeton em Milão: PERREO XL Gate, Pineta, Aria, Tocqueville 13 e Hollywood. WhatsApp +39 351 912 7047.', 'Onde dançar Reggaeton no Réveillon 2027 em Milão?', 'PERREO XL @ Gate Milano (ingressos 20-50€, mesas 500-600€), Pineta, Aria e Tocqueville 13.', 'Clubes Parceiros Reggaeton & PERREO XL', 'Guia Clubes Parceiros', 'Réveillon 2027', 'Ver Clube'),
  nl: MAKE('Reggaeton Clubs Milaan 2026/2027: Feesten & VIP-tafels', 'Beste reggaetonclubs in Milaan: PERREO XL Gate, Pineta, Aria, Tocqueville 13 & Hollywood. WhatsApp +39 351 912 7047.', 'Waar is Oud & Nieuw Reggaeton in Milaan?', 'PERREO XL @ Gate Milano (tickets 20-50€, tafels 500-600€) plus Pineta, Aria & Tocqueville 13.', 'Reggaeton Partnerclubs & PERREO XL', 'Partnerclubs Gids', 'Oud & Nieuw 2027', 'Bekijk Club'),
  ru: MAKE('Клубы Реггетон в Милане 2026/2027: Вечеринки и VIP-столы', 'Лучшие вечеринки реггетон в Милане: PERREO XL Gate, Pineta, Aria, Tocqueville 13 и Hollywood. WhatsApp +39 351 912 7047.', 'Где танцевать реггетон в Новый год 2027 в Милане?', 'PERREO XL @ Gate Milano (билеты 20-50€, столы 500-600€), Pineta и Aria Club.', 'Партнёрские клубы Реггетон и PERREO XL', 'Гид по клубам', 'Новый год 2027', 'О клубе'),
  tr: MAKE('Milano Reggaeton Kulüpleri 2026/2027: Partiler & VIP Masa', 'Milano’nun en iyi reggaeton kulüpleri: PERREO XL Gate, Pineta, Aria, Tocqueville 13 & Hollywood. WhatsApp +39 351 912 7047.', 'Milano Yılbaşı 2027 Reggaeton partisi nerede?', 'PERREO XL @ Gate Milano (20-50€ bilet, 500-600€ masa), Pineta ve Aria Club.', 'Reggaeton Partner Kulüpler & PERREO XL', 'Partner Kulüp Rehberi', 'Yılbaşı 2027', 'Kulüp Sayfası'),
  zh: MAKE('米兰雷鬼夜店指南 2026/2027：热门派对与VIP卡座', '米兰最佳雷鬼与拉丁夜店：PERREO XL @ Gate、Pineta、Aria、Tocqueville 13 与 Hollywood。WhatsApp +39 351 912 7047。', '2027跨年夜米兰哪里有雷鬼派对？', 'PERREO XL @ Gate Milano（门票20-50€，卡座500-600€），以及Pineta与Aria。', '米兰雷鬼合作夜店与 PERREO XL', '合作夜店指南', '2027跨年专场', '夜店详情'),
  ar: MAKE('نوادي الريغيتون في ميلانو 2026/2027: حفلات وطاولات VIP', 'أفضل سهرات الريغيتون في ميلانو: PERREO XL Gate وPineta وAria وTocqueville 13. واتساب +39 351 912 7047.', 'أين سهرة الريغيتون لرأس السنة 2027 في ميلانو؟', 'حفلة PERREO XL @ Gate Milano (تذاكر 20-50€، طاولات 500-600€) مع Pineta وAria.', 'النوادي الشريكة للريغيتون في ميلانو', 'دليل النوادي الشريكة', 'رأس السنة 2027', 'تفاصيل النادي'),
  bg: MAKE('Регетон клубове Милано 2026/2027: Партита и VIP маси', 'Най-добрите регетон клубове в Милано: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Къде има регетон парти за Нова година 2027 в Милано?', 'PERREO XL @ Gate Milano (билети 20-50€, маси 500-600€), Pineta и Aria Club.', 'Партньорски регетон клубове и PERREO XL', 'Гид партньорски клубове', 'Нова година 2027', 'Виж клуба'),
  hr: MAKE('Reggaeton klubovi Milano 2026/2027: Zabave i VIP stolovi', 'Najbolji reggaeton klubovi u Milanu: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Gdje je najbolji Reggaeton doček Nove 2027 u Milanu?', 'PERREO XL @ Gate Milano (ulaznice 20-50€, stolovi 500-600€), Pineta i Aria.', 'Partnerski Reggaeton klubovi & PERREO XL', 'Vodič za partnere', 'Doček 2027', 'Vidi klub'),
  cs: MAKE('Reggaeton kluby Milán 2026/2027: Párty a VIP stoly', 'Nejlepší reggaeton kluby v Miláně: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Kde je nejlepší Reggaeton Silvestr 2027 v Miláně?', 'PERREO XL @ Gate Milano (vstupenky 20-50€, stoly 500-600€), Pineta a Aria.', 'Partnerské Reggaeton kluby & PERREO XL', 'Průvodce kluby', 'Silvestr 2027', 'Detail klubu'),
  da: MAKE('Reggaeton Klubber Milano 2026/2027: Fester & VIP-borde', 'Bedste reggaeton-klubber i Milano: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Hvor er Reggaeton nytårsfest 2027 i Milano?', 'PERREO XL @ Gate Milano (billetter 20-50€, borde 500-600€), Pineta & Aria.', 'Partner Reggaeton-klubber & PERREO XL', 'Partnerklub-guide', 'Nytår 2027', 'Se klub'),
  et: MAKE('Reggaeton klubid Milano 2026/2027: Peod ja VIP-lauad', 'Parimad reggaeton-klubid Milanos: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Kus toimub 2027 aastavahetuse reggaeton-pidu Milanos?', 'PERREO XL @ Gate Milano (piletid 20-50€, lauad 500-600€), Pineta ja Aria.', 'Reggaeton partnerklubid ja PERREO XL', 'Partnerklubide juhend', 'Aastavahetus 2027', 'Klubi info'),
  fi: MAKE('Reggaeton-klubit Milano 2026/2027: Bileet & VIP-pöydät', 'Parhaat reggaeton-klubit Milanossa: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Missä on Milanon uuden vuoden 2027 reggaeton-juhla?', 'PERREO XL @ Gate Milano (liput 20-50€, pöydät 500-600€), Pineta ja Aria.', 'Kumppaniklubit Reggaeton & PERREO XL', 'Klubiopas 2027', 'Uusivuosi 2027', 'Katso klubi'),
  el: MAKE('Reggaeton Κλαμπ Μιλάνο 2026/2027: Πάρτι & VIP Τραπέζια', 'Κορυφαία reggaeton κλαμπ στο Μιλάνο: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Πού είναι το καλύτερο Reggaeton πάρτι Πρωτοχρονιάς 2027;', 'PERREO XL @ Gate Milano (εισιτήρια 20-50€, τραπέζια 500-600€) και Pineta.', 'Συνεργαζόμενα Κλαμπ Reggaeton & PERREO XL', 'Οδηγός Κλαμπ 2027', 'Πρωτοχρονιά 2027', 'Δείτε Κλαμπ'),
  hu: MAKE('Reggaeton Klubok Milánó 2026/2027: Bulik & VIP Asztalok', 'Milánó legjobb reggaeton klubjai: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Hol van a legjobb Reggaeton szilveszteri buli Milánóban?', 'PERREO XL @ Gate Milano (belépő 20-50€, asztalok 500-600€), Pineta és Aria.', 'Partner Reggaeton Klubok & PERREO XL', 'Partner Klub Kaluz', 'Szilveszter 2027', 'Klub részletei'),
  ga: MAKE('Clubanna Reggaeton Milano 2026/2027: Cóisirí & Táblaí VIP', 'Na clubanna reggaeton is fearr i Milano: PERREO XL Gate, Pineta, Aria & Tocqueville 13. WhatsApp +39 351 912 7047.', 'Cá bhfuil an chóisir Reggaeton Oíche Chinn Bhliana i Milano?', 'PERREO XL @ Gate Milano (ticéid 20-50€, táblaí 500-600€), Pineta & Aria.', 'Clubanna Comhpháirtíochta Reggaeton', 'Treoir na gClubanna', 'Oíche Chinn Bhliana', 'Féach Club'),
  lv: MAKE('Reggaeton klubi Milānā 2026/2027: Ballītes & VIP galdiņi', 'Labākie reggaeton klubi Milānā: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Kur notiek Jaungada 2027 reggaeton ballīte Milānā?', 'PERREO XL @ Gate Milano (biļetes 20-50€, galdiņi 500-600€), Pineta un Aria.', 'Partneru Reggaeton klubi & PERREO XL', 'Partneru Klubu Ceļvedis', 'Jaunais gads 2027', 'Skatīt klubu'),
  lt: MAKE('Reggaeton klubai Milane 2026/2027: Vakarėliai & VIP stalai', 'Geriausi reggaeton klubai Milane: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Kur švęsti Reggaeton Naujuosius 2027 Milane?', 'PERREO XL @ Gate Milano (bilietai 20-50€, stalai 500-600€), Pineta ir Aria.', 'Partnerių Reggaeton klubai & PERREO XL', 'Partnerių Klubų Gidas', 'Naujieji metai 2027', 'Klubo gidas'),
  mt: MAKE('Klabbs Reggaeton Milan 2026/2027: Feste & Imwejjed VIP', 'L-aqwa klabbs reggaeton f’Milan: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Fejn hi l-aħjar festa Reggaeton għall-Ewwel tas-Sena 2027?', 'PERREO XL @ Gate Milano (biljetti 20-50€, imwejjed 500-600€), Pineta u Aria.', 'Klabbs Imsieħba Reggaeton & PERREO XL', 'Gwida Klabbs Imsieħba', 'Ewwel tas-Sena 2027', 'Ara l-Klabb'),
  pl: MAKE('Kluby Reggaeton Mediolan 2026/2027: Imprezy i Stoliki VIP', 'Najlepsze kluby reggaeton w Mediolanie: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Gdzie jest sylwester 2027 z muzyką Reggaeton w Mediolanie?', 'PERREO XL @ Gate Milano (bilety 20-50€, stoliki 500-600€), Pineta i Aria.', 'Partnerskie Kluby Reggaeton & PERREO XL', 'Przewodnik Klubów Partnerów', 'Sylwester 2027', 'Zobacz Klub'),
  ro: MAKE('Cluburi Reggaeton Milano 2026/2027: Petreceri & Mese VIP', 'Top cluburi reggaeton în Milano: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Unde este petrecerea Reggaeton de Revelion 2027 în Milano?', 'PERREO XL @ Gate Milano (bilete 20-50€, mese 500-600€), Pineta și Aria.', 'Cluburi Partenere Reggaeton & PERREO XL', 'Ghid Cluburi Partenere', 'Revelion 2027', 'Vezi Club'),
  sk: MAKE('Reggaeton kluby Miláno 2026/2027: Párty a VIP stoly', 'Najlepšie reggaeton kluby v Miláne: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Kde je najlepšia Reggaeton silvestrovská párty v Miláne?', 'PERREO XL @ Gate Milano (vstupenky 20-50€, stoly 500-600€), Pineta a Aria.', 'Partnerské Reggaeton kluby & PERREO XL', 'Sprievodca Klubmi', 'Silvester 2027', 'Detail klubu'),
  sl: MAKE('Reggaeton klubi Milano 2026/2027: Zabave & VIP mize', 'Najboljši reggaeton klubi v Milanu: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Kje je Reggaeton silvestrovanje 2027 v Milanu?', 'PERREO XL @ Gate Milano (vstopnice 20-50€, mize 500-600€), Pineta in Aria.', 'Partnerski Reggaeton klubi & PERREO XL', 'Vodnik za partnerje', 'Silvestrovo 2027', 'Oglej si klub'),
  sv: MAKE('Reggaeton-klubbar Milano 2026/2027: Fester & VIP-bord', 'Bästa reggaetonklubbarna i Milano: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Var är Reggaeton nyårsfest 2027 i Milano?', 'PERREO XL @ Gate Milano (biljetter 20-50€, bord 500-600€), Pineta & Aria.', 'Partnerklubbar Reggaeton & PERREO XL', 'Partnerklubbar Guide', 'Nyår 2027', 'Se Klubb'),
  no: MAKE('Reggaeton-klubber Milano 2026/2027: Fester & VIP-bord', 'Beste reggaeton-klubber i Milano: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Hvor er Reggaeton nyttårsfest 2027 i Milano?', 'PERREO XL @ Gate Milano (billetter 20-50€, bord 500-600€), Pineta og Aria.', 'Partnerklubber Reggaeton & PERREO XL', 'Partnerklubb Guide', 'Nyttår 2027', 'Se Klubb'),
  is: MAKE('Reggaeton klúbbar Mílanó 2026/2027: Partí og VIP borð', 'Bestu reggaeton klúbbar í Mílanó: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Hvar er Reggaeton gamlárspartí 2027 í Mílanó?', 'PERREO XL @ Gate Milano (miðar 20-50€, borð 500-600€), Pineta og Aria.', 'Samstarfsklúbbar Reggaeton & PERREO XL', 'Handbók Klúbba', 'Áramót 2027', 'Skoða klúbb'),
  uk: MAKE('Клуби Регетон у Мілані 2026/2027: Вечірки та VIP-столи', 'Найкращі регетон-клуби Мілана: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Де святкувати Регетон Новий рік 2027 у Мілані?', 'PERREO XL @ Gate Milano (квитки 20-50€, столи 500-600€), Pineta та Aria.', 'Партнерські Регетон-клуби та PERREO XL', 'Гід Клубами 2027', 'Новий рік 2027', 'Про клуб'),
  sq: MAKE('Klube Reggaeton Milano 2026/2027: Festa & Tavolina VIP', 'Klubet më të mira reggaeton në Milano: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Ku festohet Viti i Ri 2027 me Reggaeton në Milano?', 'PERREO XL @ Gate Milano (bileta 20-50€, tavolina 500-600€), Pineta dhe Aria.', 'Klubet Partnere Reggaeton & PERREO XL', 'Udhëzuesi i Klubeve', 'Viti i Ri 2027', 'Shiko Klubin'),
  sr: MAKE('Reggaeton klubovi Milano 2026/2027: Žurke i VIP stolovi', 'Najbolji reggaeton klubovi u Milanu: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Gde je najbolja Reggaeton Novogodišnja žurka 2027 u Milanu?', 'PERREO XL @ Gate Milano (karte 20-50€, stolovi 500-600€), Pineta i Aria.', 'Partnerski Reggaeton klubovi & PERREO XL', 'Vodič kroz klubove', 'Nova godina 2027', 'Pogledaj klub'),
  bs: MAKE('Reggaeton klubovi Milano 2026/2027: Zabave & VIP stolovi', 'Najbolji reggaeton klubovi u Milanu: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Gdje je Reggaeton doček Nove 2027 u Milanu?', 'PERREO XL @ Gate Milano (ulaznice 20-50€, stolovi 500-600€), Pineta i Aria.', 'Partnerski Reggaeton klubovi & PERREO XL', 'Vodič Partner Klubova', 'Nova godina 2027', 'Vidi klub'),
  mk: MAKE('Регетон клубови Милано 2026/2027: Забави и VIP маси', 'Најдобри регетон клубови во Милано: PERREO XL Gate, Pineta, Aria, Tocqueville 13. WhatsApp +39 351 912 7047.', 'Каде има Регетон забава за Нова година 2027 во Милано?', 'PERREO XL @ Gate Milano (билети 20-50€, маси 500-600€), Pineta и Aria.', 'Партнерски Регетон клубови & PERREO XL', 'Водич за Клубови', 'Нова година 2027', 'Види Клуб'),
};
