import type { LocaleCode } from './locales';

export type CanonicalDirKey =
  | 'clubs'
  | 'events'
  | 'zones'
  | 'guides'
  | 'genres'
  | 'calendar'
  | 'booking';

export interface DirAndSubTokens {
  clubsDir: string;
  eventsDir: string;
  zonesDir: string;
  guidesDir: string;
  genresDir: string;
  calendarDir: string;
  bookingDir: string;
  tonight: string;
  thisWeek: string;
  special: string;
  best: string;
  archive: string;
  age18: string;
  age21: string;
  international: string;
  university: string;
  concerts: string;
  guestlist: string;
  calendarSub: string;
  concierge: string;
  confirmed: string;
  faq: string;
  privacy: string;
  terms: string;
}

export const DIR_AND_SUB_TOKENS_35: Record<LocaleCode, DirAndSubTokens> = {
  en: {
    clubsDir: 'clubs', eventsDir: 'events', zonesDir: 'zones', guidesDir: 'guides',
    genresDir: 'genres', calendarDir: 'calendar', bookingDir: 'booking',
    tonight: 'tonight', thisWeek: 'this-week', special: 'special', best: 'best',
    archive: 'past', age18: '18-plus', age21: '21-plus', international: 'international',
    university: 'university-erasmus', concerts: 'concert', guestlist: 'guest-lists',
    calendarSub: 'calendar', concierge: 'concierge', confirmed: 'success',
    faq: 'faq', privacy: 'privacy', terms: 'terms',
  },
  it: {
    clubsDir: 'locali', eventsDir: 'eventi', zonesDir: 'quartieri', guidesDir: 'guide',
    genresDir: 'generi', calendarDir: 'calendario', bookingDir: 'prenotazione',
    tonight: 'stasera', thisWeek: 'questa-settimana', special: 'eventi-speciali', best: 'migliori',
    archive: 'archivio', age18: '18-anni', age21: '21-anni', international: 'internazionali',
    university: 'universitarie-erasmus', concerts: 'dopo-concerto', guestlist: 'liste-ingresso',
    calendarSub: 'calendario', concierge: 'concierge-vip', confirmed: 'confermata',
    faq: 'domande-frequenti', privacy: 'privacy', terms: 'termini-servizio',
  },
  es: {
    clubsDir: 'discotecas', eventsDir: 'eventos', zonesDir: 'barrios', guidesDir: 'guias',
    genresDir: 'generos', calendarDir: 'calendario', bookingDir: 'reserva',
    tonight: 'esta-noche', thisWeek: 'esta-semana', special: 'especiales', best: 'mejores',
    archive: 'archivo', age18: 'mayores-18', age21: 'mayores-21', international: 'internacionales',
    university: 'universitarias-erasmus', concerts: 'conciertos', guestlist: 'listas-invitados',
    calendarSub: 'calendario', concierge: 'conserjeria-vip', confirmed: 'confirmada',
    faq: 'preguntas-frecuentes', privacy: 'privacidad', terms: 'condiciones-uso',
  },
  fr: {
    clubsDir: 'discotheques', eventsDir: 'evenements', zonesDir: 'quartiers', guidesDir: 'guides-pratiques',
    genresDir: 'genres-musicaux', calendarDir: 'calendrier', bookingDir: 'reservation',
    tonight: 'ce-soir', thisWeek: 'cette-semaine', special: 'speciaux', best: 'meilleures',
    archive: 'archives', age18: '18-ans', age21: '21-ans', international: 'internationales',
    university: 'etudiantes-erasmus', concerts: 'concerts-live', guestlist: 'liste-invites',
    calendarSub: 'calendrier', concierge: 'conciergerie-vip', confirmed: 'confirmee',
    faq: 'questions-frequentes', privacy: 'confidentialite', terms: 'conditions-generales',
  },
  de: {
    clubsDir: 'nachtclubs', eventsDir: 'veranstaltungen', zonesDir: 'stadtteile', guidesDir: 'ratgeber',
    genresDir: 'musikstile', calendarDir: 'kalender', bookingDir: 'buchung',
    tonight: 'heute-abend', thisWeek: 'diese-woche', special: 'besondere', best: 'beste',
    archive: 'archiv', age18: 'ab-18', age21: 'ab-21', international: 'internationale',
    university: 'studenten-erasmus', concerts: 'konzerte', guestlist: 'gaesteliste',
    calendarSub: 'kalender', concierge: 'vip-service', confirmed: 'bestaetigt',
    faq: 'haeufige-fragen', privacy: 'datenschutz', terms: 'nutzungsbedingungen',
  },
  pt: {
    clubsDir: 'discotecas', eventsDir: 'eventos', zonesDir: 'bairros', guidesDir: 'guias',
    genresDir: 'generos', calendarDir: 'calendario', bookingDir: 'reserva',
    tonight: 'hoje-a-noite', thisWeek: 'esta-semana', special: 'especiais', best: 'melhores',
    archive: 'arquivo', age18: 'maiores-18', age21: 'maiores-21', international: 'internacionais',
    university: 'universitarias-erasmus', concerts: 'concertos', guestlist: 'lista-convidados',
    calendarSub: 'calendario', concierge: 'concierge-vip', confirmed: 'confirmada',
    faq: 'perguntas-frequentes', privacy: 'privacidade', terms: 'termos-servico',
  },
  nl: {
    clubsDir: 'nachtclubs', eventsDir: 'evenementen', zonesDir: 'wijken', guidesDir: 'gidsen',
    genresDir: 'muziekstijlen', calendarDir: 'agenda', bookingDir: 'reservering',
    tonight: 'vanavond', thisWeek: 'deze-week', special: 'bijzondere', best: 'beste',
    archive: 'archief', age18: '18-jaar', age21: '21-jaar', international: 'internationale',
    university: 'studenten-erasmus', concerts: 'concerten', guestlist: 'gastenlijst',
    calendarSub: 'agenda', concierge: 'vip-service', confirmed: 'bevestigd',
    faq: 'veelgestelde-vragen', privacy: 'privacybeleid', terms: 'voorwaarden',
  },
  ru: {
    clubsDir: 'kluby', eventsDir: 'sobytiya', zonesDir: 'rayony', guidesDir: 'gidy',
    genresDir: 'zhanry', calendarDir: 'kalendar', bookingDir: 'bronirovanie',
    tonight: 'segodnya-vecherom', thisWeek: 'na-etoy-nedele', special: 'spetsialnye', best: 'luchshie',
    archive: 'arkhiv', age18: 'ot-18-let', age21: 'ot-21-goda', international: 'mezhdunarodnye',
    university: 'studencheskie-erasmus', concerts: 'kontserty', guestlist: 'spisok-gostey',
    calendarSub: 'kalendar', concierge: 'vip-konserzh', confirmed: 'podtverzhdeno',
    faq: 'voprosy-otvety', privacy: 'konfidentsialnost', terms: 'usloviya',
  },
  tr: {
    clubsDir: 'gece-kulupleri', eventsDir: 'etkinlikler', zonesDir: 'semtler', guidesDir: 'rehberler',
    genresDir: 'muzik-turleri', calendarDir: 'takvim', bookingDir: 'rezervasyon',
    tonight: 'bu-gece', thisWeek: 'bu-hafta', special: 'ozel', best: 'en-iyi',
    archive: 'arsiv', age18: '18-yas', age21: '21-yas', international: 'uluslararasi',
    university: 'universite-erasmus', concerts: 'konserler', guestlist: 'davetli-listesi',
    calendarSub: 'takvim', concierge: 'vip-danisma', confirmed: 'onaylandi',
    faq: 'sikca-sorulan-sorular', privacy: 'gizlilik', terms: 'kullanim-kosullari',
  },
  zh: {
    clubsDir: 'julebu', eventsDir: 'huodong', zonesDir: 'jiequ', guidesDir: 'zhinan',
    genresDir: 'yinyue-fengge', calendarDir: 'rili', bookingDir: 'yuding',
    tonight: 'jinwan', thisWeek: 'benzhou', special: 'tebie', best: 'zuijia',
    archive: 'wangqi', age18: '18-sui', age21: '21-sui', international: 'guoji',
    university: 'daxuesheng-erasmus', concerts: 'yanchanghui', guestlist: 'jiabin-mingdan',
    calendarSub: 'rili', concierge: 'vip-libin', confirmed: 'yiqueren',
    faq: 'changjian-wenti', privacy: 'yinsi-zhengce', terms: 'fuwu-tiaokuan',
  },
  ar: {
    clubsDir: 'nawadi-layliya', eventsDir: 'faaliyat', zonesDir: 'ahya', guidesDir: 'adilla',
    genresDir: 'anmat-musiqa', calendarDir: 'taqwim', bookingDir: 'hajz',
    tonight: 'hadhihi-allayla', thisWeek: 'hadha-alusbu', special: 'khassa', best: 'afdal',
    archive: 'arshif', age18: 'fawq-18', age21: 'fawq-21', international: 'dawliya',
    university: 'jamiiya-erasmus', concerts: 'hafalat-musiqiya', guestlist: 'qaimat-duyuf',
    calendarSub: 'taqwim', concierge: 'khidmat-vip', confirmed: 'muakkad',
    faq: 'asila-shaiia', privacy: 'khususiya', terms: 'shurut-alkhidma',
  },
  bg: {
    clubsDir: 'klubove', eventsDir: 'sabitiya', zonesDir: 'kvartali', guidesDir: 'patevoditeli',
    genresDir: 'zhanrove', calendarDir: 'kalendar', bookingDir: 'rezervatsiya',
    tonight: 'tazi-vecher', thisWeek: 'tazi-sedmitsa', special: 'spetsialni', best: 'nay-dobri',
    archive: 'arhiv', age18: 'nad-18', age21: 'nad-21', international: 'mezhdunarodni',
    university: 'studentski-erasmus', concerts: 'kontserti', guestlist: 'spisak-gosti',
    calendarSub: 'kalendar', concierge: 'vip-konsierzh', confirmed: 'potvardena',
    faq: 'chesto-zadavani-vaprosi', privacy: 'poveritelnost', terms: 'obshti-usloviya',
  },
  hr: {
    clubsDir: 'klubovi', eventsDir: 'dogadaji', zonesDir: 'cetvrti', guidesDir: 'vodici',
    genresDir: 'zanrovi', calendarDir: 'kalendar', bookingDir: 'rezervacija',
    tonight: 'veceras', thisWeek: 'ovaj-tjedan', special: 'posebni', best: 'najbolji',
    archive: 'arhiva', age18: 'iznad-18', age21: 'iznad-21', international: 'medunarodni',
    university: 'studentski-erasmus', concerts: 'koncerti', guestlist: 'popis-gostiju',
    calendarSub: 'kalendar', concierge: 'vip-usluga', confirmed: 'potvrdeno',
    faq: 'cesta-pitanja', privacy: 'privatnost', terms: 'uvjeti-koristenja',
  },
  cs: {
    clubsDir: 'kluby', eventsDir: 'akce', zonesDir: 'ctvrti', guidesDir: 'pruvodci',
    genresDir: 'zanry', calendarDir: 'kalendar', bookingDir: 'rezervace',
    tonight: 'dnes-vecer', thisWeek: 'tento-tyden', special: 'specialni', best: 'nejlepsi',
    archive: 'archiv', age18: 'od-18-let', age21: 'od-21-let', international: 'mezinarodni',
    university: 'studentske-erasmus', concerts: 'koncerty', guestlist: 'seznam-hostu',
    calendarSub: 'kalendar', concierge: 'vip-sluzby', confirmed: 'potvrzeno',
    faq: 'caste-dotazy', privacy: 'ochrana-soukromi', terms: 'podminky-uziti',
  },
  da: {
    clubsDir: 'natklubber', eventsDir: 'begivenheder', zonesDir: 'bydele', guidesDir: 'guider',
    genresDir: 'musikgenrer', calendarDir: 'kalender', bookingDir: 'bestilling',
    tonight: 'i-aften', thisWeek: 'denne-uge', special: 'saerlige', best: 'bedste',
    archive: 'arkiv', age18: 'over-18', age21: 'over-21', international: 'internationale',
    university: 'studerende-erasmus', concerts: 'koncerter', guestlist: 'gaesteliste',
    calendarSub: 'kalender', concierge: 'vip-service', confirmed: 'bekraeftet',
    faq: 'ofte-stillede-sporgsmal', privacy: 'privatlivspolitik', terms: 'vilkar',
  },
  et: {
    clubsDir: 'ooklubid', eventsDir: 'uritused', zonesDir: 'linnaosad', guidesDir: 'juhendid',
    genresDir: 'zanrid', calendarDir: 'kalender', bookingDir: 'broneering',
    tonight: 'tana-ohtul', thisWeek: 'sel-nadalal', special: 'erilised', best: 'parimad',
    archive: 'arhiiv', age18: 'alates-18', age21: 'alates-21', international: 'rahvusvahelised',
    university: 'tudengite-erasmus', concerts: 'kontserdid', guestlist: 'kulaliste-nimekiri',
    calendarSub: 'kalender', concierge: 'vip-teenindus', confirmed: 'kinnitatud',
    faq: 'korduma-kippuvad-kusimused', privacy: 'privaatsus', terms: 'kasutustingimused',
  },
  fi: {
    clubsDir: 'yokerhot', eventsDir: 'tapahtumat', zonesDir: 'kaupunginosat', guidesDir: 'oppaat',
    genresDir: 'musiikkityylit', calendarDir: 'kalenteri', bookingDir: 'varaus',
    tonight: 'tana-iltana', thisWeek: 'talla-viikolla', special: 'erikois', best: 'parhaat',
    archive: 'arkisto', age18: 'yli-18', age21: 'yli-21', international: 'kansainvaliset',
    university: 'opiskelija-erasmus', concerts: 'konsertit', guestlist: 'vieraslista',
    calendarSub: 'kalenteri', concierge: 'vip-palvelu', confirmed: 'vahvistettu',
    faq: 'usein-kysytyt-kysymykset', privacy: 'tietosuoja', terms: 'kayttoehdot',
  },
  el: {
    clubsDir: 'nychterina-klab', eventsDir: 'ekdiloseis', zonesDir: 'geitonies', guidesDir: 'odigoi',
    genresDir: 'eidi-mousikis', calendarDir: 'imerologio', bookingDir: 'kratisi',
    tonight: 'apopse', thisWeek: 'afti-tin-evdomada', special: 'eidikes', best: 'kalyteres',
    archive: 'archeio', age18: 'ano-ton-18', age21: 'ano-ton-21', international: 'diethneis',
    university: 'foititikes-erasmus', concerts: 'synavlies', guestlist: 'lista-kalesmenon',
    calendarSub: 'imerologio', concierge: 'ypiresia-vip', confirmed: 'epivevaiomeni',
    faq: 'sychnes-erotiseis', privacy: 'aporrito', terms: 'oroi-chrisis',
  },
  hu: {
    clubsDir: 'klubok', eventsDir: 'esemenyek', zonesDir: 'negyedek', guidesDir: 'utmutatok',
    genresDir: 'mufajok', calendarDir: 'naptar', bookingDir: 'foglalas',
    tonight: 'ma-este', thisWeek: 'ezen-a-heten', special: 'kulonleges', best: 'legjobb',
    archive: 'archivum', age18: '18-ev-felett', age21: '21-ev-felett', international: 'nemzetkozi',
    university: 'egyetemi-erasmus', concerts: 'koncertek', guestlist: 'vendeglista',
    calendarSub: 'naptar', concierge: 'vip-szolgalat', confirmed: 'visszaigazolva',
    faq: 'gyakori-kerdesek', privacy: 'adatvedelem', terms: 'felhasznalasi-feltetelek',
  },
  ga: {
    clubsDir: 'clubanna', eventsDir: 'imeachtai', zonesDir: 'ceantair', guidesDir: 'treoracha',
    genresDir: 'seanrai', calendarDir: 'feilire', bookingDir: 'airithint',
    tonight: 'anocht', thisWeek: 'an-tseachtain-seo', special: 'speisialta', best: 'is-fearr',
    archive: 'cartlann', age18: 'os-cionn-18', age21: 'os-cionn-21', international: 'idirnaisiunta',
    university: 'ollscoile-erasmus', concerts: 'ceolchoirmeacha', guestlist: 'liosta-aoianna',
    calendarSub: 'feilire', concierge: 'seirbhis-vip', confirmed: 'deimhnithe',
    faq: 'ceisteanna-coitianta', privacy: 'priobhaideachas', terms: 'tearmai-seirbhise',
  },
  lv: {
    clubsDir: 'naktsklubi', eventsDir: 'pasakumi', zonesDir: 'rajoni', guidesDir: 'celvezi',
    genresDir: 'zanri', calendarDir: 'kalendars', bookingDir: 'rezervacija',
    tonight: 'sovakar', thisWeek: 'saja-nedela', special: 'ipasie', best: 'labakie',
    archive: 'arhivs', age18: 'no-18-gadiem', age21: 'no-21-gada', international: 'starptautiskie',
    university: 'studentu-erasmus', concerts: 'koncerti', guestlist: 'viesu-saraksts',
    calendarSub: 'kalendars', concierge: 'vip-serviss', confirmed: 'apstiprinats',
    faq: 'biezak-uzdotie-jautajumi', privacy: 'privatums', terms: 'lietosanas-noteikumi',
  },
  lt: {
    clubsDir: 'klubai', eventsDir: 'renginiai', zonesDir: 'rajonai', guidesDir: 'gidai',
    genresDir: 'zanrai', calendarDir: 'kalendorius', bookingDir: 'rezervacija',
    tonight: 'siandien-vakare', thisWeek: 'sia-savaite', special: 'ypatingi', best: 'geriausi',
    archive: 'archyvas', age18: 'nuo-18-metu', age21: 'nuo-21-metu', international: 'tarptautiniai',
    university: 'studentu-erasmus', concerts: 'koncertai', guestlist: 'sveciu-sarasas',
    calendarSub: 'kalendorius', concierge: 'vip-paslaugos', confirmed: 'patvirtinta',
    faq: 'dazniausi-klausimai', privacy: 'privatumas', terms: 'naudojimo-salygos',
  },
  mt: {
    clubsDir: 'klabbs', eventsDir: 'avvenimenti', zonesDir: 'distretti', guidesDir: 'gwidi',
    genresDir: 'generi-muzikali', calendarDir: 'kalendarju', bookingDir: 'prenotazzjoni',
    tonight: 'il-lejla', thisWeek: 'din-il-gimgha', special: 'specjali', best: 'l-ahjar',
    archive: 'arkivju', age18: 'fuq-18', age21: 'fuq-21', international: 'internazzjonali',
    university: 'universitarji-erasmus', concerts: 'kuncerti', guestlist: 'lista-mistiedna',
    calendarSub: 'kalendarju', concierge: 'servizz-vip', confirmed: 'ikkonfermata',
    faq: 'mistoqsijiet-komuni', privacy: 'privatezza', terms: 'termini-servizz',
  },
  pl: {
    clubsDir: 'kluby', eventsDir: 'wydarzenia', zonesDir: 'dzielnice', guidesDir: 'przewodniki',
    genresDir: 'gatunki', calendarDir: 'kalendarz', bookingDir: 'rezerwacja',
    tonight: 'dzis-wieczorem', thisWeek: 'w-tym-tygodniu', special: 'specjalne', best: 'najlepsze',
    archive: 'archiwum', age18: 'od-18-lat', age21: 'od-21-lat', international: 'miedzynarodowe',
    university: 'studenckie-erasmus', concerts: 'koncerty', guestlist: 'lista-gosci',
    calendarSub: 'kalendarz', concierge: 'vip-konsjerz', confirmed: 'potwierdzona',
    faq: 'czeste-pytania', privacy: 'polityka-prywatnosci', terms: 'regulamin',
  },
  ro: {
    clubsDir: 'cluburi', eventsDir: 'evenimente', zonesDir: 'cartiere', guidesDir: 'ghiduri',
    genresDir: 'genuri', calendarDir: 'calendar-evenimente', bookingDir: 'rezervare',
    tonight: 'in-aceasta-seara', thisWeek: 'saptamana-aceasta', special: 'speciale', best: 'cele-mai-bune',
    archive: 'arhiva', age18: 'peste-18-ani', age21: 'peste-21-ani', international: 'internationale',
    university: 'studentesti-erasmus', concerts: 'concerte', guestlist: 'lista-invitati',
    calendarSub: 'calendar-evenimente', concierge: 'concierge-vip', confirmed: 'confirmata',
    faq: 'intrebari-frecvente', privacy: 'confidentialitate', terms: 'termeni-conditii',
  },
  sk: {
    clubsDir: 'kluby', eventsDir: 'podujatia', zonesDir: 'stvrte', guidesDir: 'sprievodcovia',
    genresDir: 'zanre', calendarDir: 'kalendar', bookingDir: 'rezervacia',
    tonight: 'dnes-vecer', thisWeek: 'tento-tyzden', special: 'specialne', best: 'najlepsie',
    archive: 'archiv', age18: 'od-18-rokov', age21: 'od-21-rokov', international: 'medzinarodne',
    university: 'studentske-erasmus', concerts: 'koncerty', guestlist: 'zoznam-hosti',
    calendarSub: 'kalendar', concierge: 'vip-sluzby', confirmed: 'potvrdena',
    faq: 'caste-otazky', privacy: 'ochrana-sukromia', terms: 'podmienky-pouzivania',
  },
  sl: {
    clubsDir: 'klubi', eventsDir: 'dogodki', zonesDir: 'cetrti', guidesDir: 'vodniki',
    genresDir: 'zanri', calendarDir: 'koledar', bookingDir: 'rezervacija',
    tonight: 'nocoj', thisWeek: 'ta-teden', special: 'posebni', best: 'najboljsi',
    archive: 'arhiv', age18: 'nad-18-let', age21: 'nad-21-let', international: 'mednarodni',
    university: 'studentski-erasmus', concerts: 'koncerti', guestlist: 'seznam-gostov',
    calendarSub: 'koledar', concierge: 'vip-storitve', confirmed: 'potrjeno',
    faq: 'pogosta-vprasanja', privacy: 'zasebnost', terms: 'pogoji-uporabe',
  },
  sv: {
    clubsDir: 'nattklubbar', eventsDir: 'evenemang', zonesDir: 'stadsdelar', guidesDir: 'guider',
    genresDir: 'musikgenrer', calendarDir: 'kalender', bookingDir: 'bokning',
    tonight: 'ikvall', thisWeek: 'denna-vecka', special: 'sarskilda', best: 'basta',
    archive: 'arkiv', age18: 'over-18', age21: 'over-21', international: 'internationella',
    university: 'student-erasmus', concerts: 'konserter', guestlist: 'gastlista',
    calendarSub: 'kalender', concierge: 'vip-service', confirmed: 'bekraftad',
    faq: 'vanliga-fragor', privacy: 'integritetspolicy', terms: 'villkor',
  },
  no: {
    clubsDir: 'nattklubber', eventsDir: 'arrangementer', zonesDir: 'bydeler', guidesDir: 'guider',
    genresDir: 'musikksjangre', calendarDir: 'kalender', bookingDir: 'bestilling',
    tonight: 'i-kveld', thisWeek: 'denne-uken', special: 'spesielle', best: 'beste',
    archive: 'arkiv', age18: 'over-18', age21: 'over-21', international: 'internasjonale',
    university: 'student-erasmus', concerts: 'konserter', guestlist: 'gjesteliste',
    calendarSub: 'kalender', concierge: 'vip-tjeneste', confirmed: 'bekreftet',
    faq: 'ofte-stilte-sporsmal', privacy: 'personvern', terms: 'vilkar',
  },
  is: {
    clubsDir: 'naeturklubbar', eventsDir: 'vidburdir', zonesDir: 'hverfi', guidesDir: 'leidarvisar',
    genresDir: 'tonlistarstefnur', calendarDir: 'dagatal', bookingDir: 'bokun',
    tonight: 'i-kvold', thisWeek: 'thessa-viku', special: 'serstakir', best: 'bestu',
    archive: 'safn', age18: '18-ara', age21: '21-ars', international: 'althjodlegir',
    university: 'haskola-erasmus', concerts: 'tonleikar', guestlist: 'gestalisti',
    calendarSub: 'dagatal', concierge: 'vip-thjonusta', confirmed: 'stadfest',
    faq: 'algengar-spurningar', privacy: 'personuvernd', terms: 'skilmalar',
  },
  uk: {
    clubsDir: 'kluby', eventsDir: 'podiyi', zonesDir: 'rayony', guidesDir: 'putivnyky',
    genresDir: 'zhanry', calendarDir: 'kalendar', bookingDir: 'bronyuvannya',
    tonight: 'sohodni-vvecheri', thisWeek: 'tsoho-tyzhnya', special: 'osoblyvi', best: 'naykrashchi',
    archive: 'arkhiv', age18: 'vid-18-rokiv', age21: 'vid-21-roku', international: 'mizhnarodni',
    university: 'studentski-erasmus', concerts: 'kontserty', guestlist: 'spysok-hostey',
    calendarSub: 'kalendar', concierge: 'vip-konsyerzh', confirmed: 'pidtverdzheno',
    faq: 'chasti-zapytannya', privacy: 'konfidentsiynist', terms: 'umovy-korystuvannya',
  },
  sq: {
    clubsDir: 'klube', eventsDir: 'evente', zonesDir: 'lagjet', guidesDir: 'udhezues',
    genresDir: 'zhanre', calendarDir: 'kalendari', bookingDir: 'rezervim',
    tonight: 'sonte', thisWeek: 'kete-jave', special: 'speciale', best: 'me-te-mirat',
    archive: 'arkivi', age18: 'mbi-18-vjec', age21: 'mbi-21-vjec', international: 'nderkombetare',
    university: 'studentore-erasmus', concerts: 'koncerte', guestlist: 'lista-ftuarve',
    calendarSub: 'kalendari', concierge: 'sherbim-vip', confirmed: 'konfirmuar',
    faq: 'pyetje-te-shpeshta', privacy: 'privatesia', terms: 'kushtet-sherbimit',
  },
  sr: {
    clubsDir: 'klubovi', eventsDir: 'dogadjaji', zonesDir: 'cetvrti', guidesDir: 'vodici',
    genresDir: 'zanrovi', calendarDir: 'kalendar', bookingDir: 'rezervacija',
    tonight: 'veceras', thisWeek: 'ove-nedelje', special: 'posebni', best: 'najbolji',
    archive: 'arhiva', age18: 'iznad-18', age21: 'iznad-21', international: 'medjunarodni',
    university: 'studentske-erasmus', concerts: 'koncerti', guestlist: 'spisak-gostiju',
    calendarSub: 'kalendar', concierge: 'vip-usluga', confirmed: 'potvrdjeno',
    faq: 'cesta-pitanja', privacy: 'privatnost', terms: 'uslovi-koriscenja',
  },
  bs: {
    clubsDir: 'klubovi', eventsDir: 'dogadjaji', zonesDir: 'cetvrti', guidesDir: 'vodici',
    genresDir: 'zanrovi', calendarDir: 'kalendar', bookingDir: 'rezervacija',
    tonight: 'veceras', thisWeek: 'ove-sedmice', special: 'posebni', best: 'najbolji',
    archive: 'arhiva', age18: 'iznad-18', age21: 'iznad-21', international: 'medjunarodni',
    university: 'studentske-erasmus', concerts: 'koncerti', guestlist: 'spisak-gostiju',
    calendarSub: 'kalendar', concierge: 'vip-usluga', confirmed: 'potvrdjeno',
    faq: 'cesta-pitanja', privacy: 'privatnost', terms: 'uslovi-koristenja',
  },
  mk: {
    clubsDir: 'klubovi', eventsDir: 'nastani', zonesDir: 'naselbi', guidesDir: 'vodici',
    genresDir: 'zanrovi', calendarDir: 'kalendar', bookingDir: 'rezervacija',
    tonight: 'vecherva', thisWeek: 'ovaa-nedela', special: 'posebni', best: 'najdobri',
    archive: 'arhiva', age18: 'nad-18', age21: 'nad-21', international: 'megunarodni',
    university: 'studentski-erasmus', concerts: 'koncerti', guestlist: 'spisok-gosti',
    calendarSub: 'kalendar', concierge: 'vip-usluga', confirmed: 'potvrdeno',
    faq: 'chesti-prashanja', privacy: 'privatnost', terms: 'uslovi-koristenje',
  },
};

const DIR_KEY_TO_FIELD: Record<CanonicalDirKey, keyof DirAndSubTokens> = {
  clubs: 'clubsDir',
  events: 'eventsDir',
  zones: 'zonesDir',
  guides: 'guidesDir',
  genres: 'genresDir',
  calendar: 'calendarDir',
  booking: 'bookingDir',
};

const localizedDirSegmentToCanonical = new Map<string, `/${CanonicalDirKey}`>();
const eventDirSet = new Set<string>();

for (const [loc, tk] of Object.entries(DIR_AND_SUB_TOKENS_35) as [LocaleCode, DirAndSubTokens][]) {
  for (const [dirKey, field] of Object.entries(DIR_KEY_TO_FIELD) as [CanonicalDirKey, keyof DirAndSubTokens][]) {
    const seg = tk[field];
    const target = `/${dirKey}` as const;
    const prev = localizedDirSegmentToCanonical.get(seg);
    if (prev && prev !== target) {
      throw new Error(`Directory token collision on "${seg}" (${loc}): ${prev} vs ${target}`);
    }
    if (loc !== 'en' && seg === dirKey) {
      throw new Error(`Unlocalized English directory "${seg}" in locale "${loc}"`);
    }
    localizedDirSegmentToCanonical.set(seg, target);
    if (dirKey === 'events') {
      eventDirSet.add(seg);
    }
  }
}

export const ALL_EVENT_DIR_TOKENS: readonly string[] = Array.from(eventDirSet);

export function getLocalizedDir35(dir: CanonicalDirKey, locale: string): string {
  const tk = DIR_AND_SUB_TOKENS_35[locale as LocaleCode] || DIR_AND_SUB_TOKENS_35.en;
  return tk[DIR_KEY_TO_FIELD[dir]];
}

export function resolveLocalizedDirToCanonical(segment: string): `/${CanonicalDirKey}` | undefined {
  return localizedDirSegmentToCanonical.get(segment.toLowerCase());
}

export function isLocalizedEventsDir(segment: string): boolean {
  return eventDirSet.has(segment.toLowerCase());
}
