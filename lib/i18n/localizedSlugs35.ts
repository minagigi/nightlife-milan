import type { LocaleCode } from './locales';

export const ALL_35_LOCALES: readonly LocaleCode[] = [
  'en', 'it', 'es', 'fr', 'de', 'pt', 'nl', 'ru', 'tr', 'zh', 'ar',
  'bg', 'hr', 'cs', 'da', 'et', 'fi', 'el', 'hu', 'ga', 'lv', 'lt',
  'mt', 'pl', 'ro', 'sk', 'sl', 'sv', 'no', 'is', 'uk', 'sq', 'sr',
  'bs', 'mk',
] as const;

export interface SlugLangTokens {
  guide: string;
  milan: string;
  vipTables: string;
  dressCode: string;
  club: string;
  nightlife: string;
  zone: string;
  music: string;
  party: string;
  prices: string;
  afterparty: string;
  rooftop: string;
  dinnerShow: string;
  graduation: string;
  birthday: string;
  bachelorette: string;
  corporate: string;
  fashionWeek: string;
  designWeek: string;
  newYearsEve: string;
  halloween: string;
}

export const SLUG_TOKENS_35: Record<LocaleCode, SlugLangTokens> = {
  en: {
    guide: 'guide', milan: 'milan', vipTables: 'vip-tables', dressCode: 'dress-code',
    club: 'club', nightlife: 'nightlife', zone: 'district', music: 'music-clubs',
    party: 'party', prices: 'prices', afterparty: 'afterparty', rooftop: 'rooftop',
    dinnerShow: 'dinner-show', graduation: 'graduation-party', birthday: 'birthday-party',
    bachelorette: 'bachelor-bachelorette', corporate: 'corporate-events',
    fashionWeek: 'fashion-week', designWeek: 'design-week-fuorisalone',
    newYearsEve: 'new-years-eve', halloween: 'halloween-party',
  },
  it: {
    guide: 'guida', milan: 'milano', vipTables: 'tavoli-vip', dressCode: 'dress-code',
    club: 'discoteca', nightlife: 'vita-notturna', zone: 'quartiere', music: 'musica-discoteche',
    party: 'festa', prices: 'prezzi', afterparty: 'dopo-serata', rooftop: 'rooftop-terrazza',
    dinnerShow: 'cena-cantata', graduation: 'festa-di-laurea', birthday: 'festa-compleanno',
    bachelorette: 'addio-celibato-nubilato', corporate: 'eventi-aziendali',
    fashionWeek: 'settimana-della-moda', designWeek: 'fuorisalone-salone-mobile',
    newYearsEve: 'capodanno', halloween: 'halloween-discoteca',
  },
  es: {
    guide: 'guia', milan: 'milan', vipTables: 'mesas-vip', dressCode: 'dress-code',
    club: 'discoteca', nightlife: 'vida-nocturna', zone: 'barrio', music: 'musica-discotecas',
    party: 'fiesta', prices: 'precios', afterparty: 'afterparty', rooftop: 'rooftop-terraza',
    dinnerShow: 'cena-espectaculo', graduation: 'fiesta-graduacion', birthday: 'fiesta-cumpleanos',
    bachelorette: 'despedida-soltero-soltera', corporate: 'eventos-corporativos',
    fashionWeek: 'semana-moda', designWeek: 'semana-diseno-fuorisalone',
    newYearsEve: 'nochevieja-ano-nuevo', halloween: 'fiesta-halloween',
  },
  fr: {
    guide: 'guide', milan: 'milan', vipTables: 'tables-vip', dressCode: 'dress-code',
    club: 'club-discotheque', nightlife: 'vie-nocturne', zone: 'quartier', music: 'musique-clubs',
    party: 'soiree', prices: 'tarifs', afterparty: 'afterparty', rooftop: 'rooftop-terrasse',
    dinnerShow: 'diner-spectacle', graduation: 'soiree-remise-diplome', birthday: 'soiree-anniversaire',
    bachelorette: 'evjf-evg', corporate: 'evenements-entreprise',
    fashionWeek: 'semaine-de-la-mode', designWeek: 'semaine-du-design-fuorisalone',
    newYearsEve: 'reveillon-nouvel-an', halloween: 'soiree-halloween',
  },
  de: {
    guide: 'guide', milan: 'mailand', vipTables: 'vip-tische', dressCode: 'dresscode',
    club: 'club', nightlife: 'nachtleben', zone: 'viertel', music: 'musik-clubs',
    party: 'party', prices: 'preise', afterparty: 'afterparty', rooftop: 'rooftop-dachterrasse',
    dinnerShow: 'dinner-show', graduation: 'abschlussfeier', birthday: 'geburtstagsparty',
    bachelorette: 'junggesellenabschied', corporate: 'firmenevents',
    fashionWeek: 'modewoche', designWeek: 'designwoche-fuorisalone',
    newYearsEve: 'silvester', halloween: 'halloween-party',
  },
  pt: {
    guide: 'guia', milan: 'milao', vipTables: 'mesas-vip', dressCode: 'dress-code',
    club: 'discoteca', nightlife: 'vida-noturna', zone: 'bairro', music: 'musica-discotecas',
    party: 'festa', prices: 'precos', afterparty: 'afterparty', rooftop: 'rooftop-terraco',
    dinnerShow: 'jantar-show', graduation: 'festa-formatura', birthday: 'festa-aniversario',
    bachelorette: 'despedida-solteiro', corporate: 'eventos-corporativos',
    fashionWeek: 'semana-moda', designWeek: 'semana-design-fuorisalone',
    newYearsEve: 'reveillon-ano-novo', halloween: 'festa-halloween',
  },
  nl: {
    guide: 'gids', milan: 'milaan', vipTables: 'vip-tafels', dressCode: 'dresscode',
    club: 'club', nightlife: 'nachtleven', zone: 'wijk', music: 'muziek-clubs',
    party: 'feest', prices: 'prijzen', afterparty: 'afterparty', rooftop: 'rooftop-dakterras',
    dinnerShow: 'dinershow', graduation: 'afstudeerfeest', birthday: 'verjaardagsfeest',
    bachelorette: 'vrijgezellenfeest', corporate: 'bedrijfsevenementen',
    fashionWeek: 'modeweek', designWeek: 'designweek-fuorisalone',
    newYearsEve: 'oud-en-nieuw', halloween: 'halloween-feest',
  },
  ru: {
    guide: 'gid', milan: 'milan', vipTables: 'vip-stoli', dressCode: 'dress-kod',
    club: 'klub', nightlife: 'nochnaya-zhizn', zone: 'rayon', music: 'muzyka-kluby',
    party: 'vecherinka', prices: 'tseny', afterparty: 'afterpati', rooftop: 'ruftop-terrasa',
    dinnerShow: 'uzhin-shou', graduation: 'vypusknoy', birthday: 'den-rozhdeniya',
    bachelorette: 'malchishnik-devichnik', corporate: 'korporativnye-meropriyatiya',
    fashionWeek: 'nedelya-mody', designWeek: 'nedelya-dizayna-fuorisalone',
    newYearsEve: 'novyy-god', halloween: 'khellouin',
  },
  tr: {
    guide: 'rehber', milan: 'milano', vipTables: 'vip-masa', dressCode: 'kiyafet-kodu',
    club: 'gece-kulubu', nightlife: 'gece-hayati', zone: 'bolge', music: 'muzik-kulupleri',
    party: 'parti', prices: 'fiyatlar', afterparty: 'afterparty', rooftop: 'rooftop-teras',
    dinnerShow: 'yemek-sov', graduation: 'mezuniyet-partisi', birthday: 'dogum-gunu-partisi',
    bachelorette: 'bekarliga-veda', corporate: 'kurumsal-etkinlikler',
    fashionWeek: 'moda-haftasi', designWeek: 'tasarim-haftasi-fuorisalone',
    newYearsEve: 'yilbasi', halloween: 'cadilar-bayrami',
  },
  zh: {
    guide: 'zhinan', milan: 'milan', vipTables: 'vip-kazuo', dressCode: 'zhuozhuang',
    club: 'julebu', nightlife: 'yeshenghuo', zone: 'jiequ', music: 'yinyue-julebu',
    party: 'paidui', prices: 'jiage', afterparty: 'afterparty', rooftop: 'lutian-jiuba',
    dinnerShow: 'wancan-xiu', graduation: 'biye-paidui', birthday: 'shengri-paidui',
    bachelorette: 'danshen-paidui', corporate: 'qiye-huodong',
    fashionWeek: 'shizhuangzhou', designWeek: 'shejizhou-fuorisalone',
    newYearsEve: 'kuanian-ye', halloween: 'wanshengjie',
  },
  ar: {
    guide: 'dalil', milan: 'milanu', vipTables: 'tawilat-vip', dressCode: 'ziy-aldukhul',
    club: 'nadi-layli', nightlife: 'saharat-layliya', zone: 'hayy', music: 'musiqa-nawadi',
    party: 'hafla', prices: 'asaar', afterparty: 'afterparty', rooftop: 'rooftop-shurfa',
    dinnerShow: 'asha-istiradi', graduation: 'haflat-takharruj', birthday: 'id-milad',
    bachelorette: 'wadaa-uzubiya', corporate: 'faaliyat-sharikat',
    fashionWeek: 'usbu-almoda', designWeek: 'usbu-altasmim-fuorisalone',
    newYearsEve: 'ras-alsana', halloween: 'haflat-halowin',
  },
  bg: {
    guide: 'patevoditel', milan: 'milano', vipTables: 'vip-masi', dressCode: 'dres-kod',
    club: 'klub', nightlife: 'noshten-zhivot', zone: 'kvartal', music: 'muzika-klubove',
    party: 'parti', prices: 'tseni', afterparty: 'afterparti', rooftop: 'ruftop-terasa',
    dinnerShow: 'vecherya-shou', graduation: 'diplomno-parti', birthday: 'rozhden-den',
    bachelorette: 'ergensko-mominsko-parti', corporate: 'firmeni-sabitiya',
    fashionWeek: 'sedmitsa-na-modata', designWeek: 'sedmitsa-na-dizayna',
    newYearsEve: 'nova-godina', halloween: 'helouin',
  },
  hr: {
    guide: 'vodic', milan: 'milano', vipTables: 'vip-stolovi', dressCode: 'dress-code',
    club: 'klub', nightlife: 'nocni-zivot', zone: 'cetvrt', music: 'glazba-klubovi',
    party: 'zabava', prices: 'cijene', afterparty: 'afterparty', rooftop: 'rooftop-terasa',
    dinnerShow: 'vecera-show', graduation: 'promocija-diploma', birthday: 'rodendan-proslava',
    bachelorette: 'momacka-djevojacka', corporate: 'poslovni-eventi',
    fashionWeek: 'tjedan-mode', designWeek: 'tjedan-dizajna-fuorisalone',
    newYearsEve: 'docek-nove-godine', halloween: 'noc-vjestica',
  },
  cs: {
    guide: 'pruvodce', milan: 'milan', vipTables: 'vip-stoly', dressCode: 'dress-code',
    club: 'klub', nightlife: 'nocni-zivot', zone: 'ctvrt', music: 'hudba-kluby',
    party: 'party', prices: 'ceny', afterparty: 'afterparty', rooftop: 'rooftop-terasa',
    dinnerShow: 'vecere-show', graduation: 'promoce-oslava', birthday: 'narozeninova-oslava',
    bachelorette: 'rozlucka-se-svobodou', corporate: 'firemni-akce',
    fashionWeek: 'tyden-mody', designWeek: 'tyden-designu-fuorisalone',
    newYearsEve: 'silvestr', halloween: 'halloween-party',
  },
  da: {
    guide: 'guide', milan: 'milano', vipTables: 'vip-borde', dressCode: 'dresscode',
    club: 'natklub', nightlife: 'natteliv', zone: 'kvarter', music: 'musik-klubber',
    party: 'fest', prices: 'priser', afterparty: 'afterparty', rooftop: 'rooftop-tagterrasse',
    dinnerShow: 'middag-show', graduation: 'dimissionsfest', birthday: 'fodselsdagsfest',
    bachelorette: 'polterabend', corporate: 'firmaarrangementer',
    fashionWeek: 'modeuge', designWeek: 'designuge-fuorisalone',
    newYearsEve: 'nytaarsaften', halloween: 'halloween-fest',
  },
  et: {
    guide: 'juhend', milan: 'milano', vipTables: 'vip-lauad', dressCode: 'riietumisstiil',
    club: 'ooklubi', nightlife: 'ooelu', zone: 'linnaosa', music: 'muusika-klubid',
    party: 'pidu', prices: 'hinnad', afterparty: 'afterparty', rooftop: 'katuseterrass',
    dinnerShow: 'ohtusook-show', graduation: 'lopupidu', birthday: 'sunnipaevapidu',
    bachelorette: 'poissmeeste-tudrukuteohtu', corporate: 'firmauritused',
    fashionWeek: 'moenadal', designWeek: 'disaininadal-fuorisalone',
    newYearsEve: 'aastavahetus', halloween: 'halloweeni-pidu',
  },
  fi: {
    guide: 'opas', milan: 'milano', vipTables: 'vip-poydat', dressCode: 'pukukoodi',
    club: 'yokerho', nightlife: 'yoelama', zone: 'kaupunginosa', music: 'musiikki-klubit',
    party: 'juhlat', prices: 'hinnat', afterparty: 'jatkot', rooftop: 'kattoterassi',
    dinnerShow: 'illallinen-show', graduation: 'valmistujaisjuhlat', birthday: 'syntymapaivajuhlat',
    bachelorette: 'polttarit', corporate: 'yritystapahtumat',
    fashionWeek: 'muotiviikko', designWeek: 'designviikko-fuorisalone',
    newYearsEve: 'uusivuosi', halloween: 'halloween-juhlat',
  },
  el: {
    guide: 'odigos', milan: 'milano', vipTables: 'vip-trapezia', dressCode: 'endyssima',
    club: 'klab', nightlife: 'nychterini-zoi', zone: 'periochi', music: 'mousiki-klab',
    party: 'parti', prices: 'times', afterparty: 'afterparty', rooftop: 'rooftop-taratsa',
    dinnerShow: 'deipno-show', graduation: 'orkomosia-parti', birthday: 'genethlia-parti',
    bachelorette: 'bachelor-parti', corporate: 'etairikes-ekdiloseis',
    fashionWeek: 'evdomada-modas', designWeek: 'evdomada-design-fuorisalone',
    newYearsEve: 'protochronia', halloween: 'halloween-parti',
  },
  hu: {
    guide: 'utmutato', milan: 'milano', vipTables: 'vip-asztalok', dressCode: 'dress-code',
    club: 'klub', nightlife: 'ejszakai-elet', zone: 'negyed', music: 'zene-klubok',
    party: 'buli', prices: 'arak', afterparty: 'afterparty', rooftop: 'rooftop-tetoterasz',
    dinnerShow: 'vacsora-show', graduation: 'diplomaoszt-buli', birthday: 'szuletesnapi-buli',
    bachelorette: 'legenybucsu-lanybucsu', corporate: 'ceges-rendezvenyek',
    fashionWeek: 'divathet', designWeek: 'designhet-fuorisalone',
    newYearsEve: 'szilveszter', halloween: 'halloween-buli',
  },
  ga: {
    guide: 'treoir', milan: 'milano', vipTables: 'boird-vip', dressCode: 'cod-feistis',
    club: 'club-oiche', nightlife: 'saol-oiche', zone: 'ceantar', music: 'ceol-clubanna',
    party: 'coisir', prices: 'praghsanna', afterparty: 'iar-choisir', rooftop: 'ardurlann-rooftop',
    dinnerShow: 'suipear-seoirse', graduation: 'coisir-cheime', birthday: 'coisir-breithe',
    bachelorette: 'coisir-stail-bride', corporate: 'imeachtai-corparaidi',
    fashionWeek: 'seachtain-faisin', designWeek: 'seachtain-dearaidh-fuorisalone',
    newYearsEve: 'oiche-chinn-bliana', halloween: 'oiche-shamhna',
  },
  lv: {
    guide: 'celvedis', milan: 'milana', vipTables: 'vip-galdi', dressCode: 'dress-kods',
    club: 'naktsklubs', nightlife: 'naktsdzive', zone: 'rajons', music: 'muzika-klubi',
    party: 'ballite', prices: 'cenas', afterparty: 'afterparty', rooftop: 'jumta-terase',
    dinnerShow: 'vakarinas-sovs', graduation: 'izlaiduma-ballite', birthday: 'dzimsanas-diena',
    bachelorette: 'vecpuisu-vecmeitu-ballite', corporate: 'korporativie-pasakumi',
    fashionWeek: 'modes-nedela', designWeek: 'dizaina-nedela-fuorisalone',
    newYearsEve: 'jaunais-gads', halloween: 'helovins',
  },
  lt: {
    guide: 'gidas', milan: 'milanas', vipTables: 'vip-stalai', dressCode: 'aprangos-kodas',
    club: 'naktinis-klubas', nightlife: 'naktinis-gyvenimas', zone: 'rajonas', music: 'muzika-klubai',
    party: 'vakarėlis'.replace('ė', 'e'), prices: 'kainos', afterparty: 'afterparty', rooftop: 'stogo-terasa',
    dinnerShow: 'vakariene-sou', graduation: 'isankstinis-diplomas', birthday: 'gimtadienio-svente',
    bachelorette: 'bernvakaris-mergvakaris', corporate: 'imoniu-renginiai',
    fashionWeek: 'mados-savaite', designWeek: 'dizaino-savaite-fuorisalone',
    newYearsEve: 'naujieji-metai', halloween: 'helovinas',
  },
  mt: {
    guide: 'gwida', milan: 'milan', vipTables: 'imwejjed-vip', dressCode: 'dress-code',
    club: 'klabb', nightlife: 'hajja-ta-billejl', zone: 'distrett', music: 'muzika-klabbs',
    party: 'festin', prices: 'prezzijiet', afterparty: 'afterparty', rooftop: 'rooftop-terrazzin',
    dinnerShow: 'ikla-spettaklu', graduation: 'festa-gradwazzjoni', birthday: 'festa-birthday',
    bachelorette: 'bachelor-hen-party', corporate: 'avvenimenti-korporattivi',
    fashionWeek: 'gimgha-tal-moda', designWeek: 'gimgha-tad-disinn-fuorisalone',
    newYearsEve: 'lejlet-l-ewwel-tas-sena', halloween: 'festa-halloween',
  },
  pl: {
    guide: 'przewodnik', milan: 'mediolan', vipTables: 'stoliki-vip', dressCode: 'dress-code',
    club: 'klub', nightlife: 'zycie-nocne', zone: 'dzielnica', music: 'muzyka-kluby',
    party: 'impreza', prices: 'ceny', afterparty: 'afterparty', rooftop: 'rooftop-taras',
    dinnerShow: 'kolacja-show', graduation: 'impreza-dyplomowa', birthday: 'urodziny-w-klubie',
    bachelorette: 'wieczor-kawalerski-panienski', corporate: 'imprezy-firmowe',
    fashionWeek: 'tydzien-mody', designWeek: 'tydzien-designu-fuorisalone',
    newYearsEve: 'sylwester', halloween: 'impreza-halloween',
  },
  ro: {
    guide: 'ghid', milan: 'milano', vipTables: 'mese-vip', dressCode: 'dress-code',
    club: 'club', nightlife: 'viata-de-noapte', zone: 'cartier', music: 'muzica-cluburi',
    party: 'petrecere', prices: 'preturi', afterparty: 'afterparty', rooftop: 'rooftop-terasa',
    dinnerShow: 'cina-spectacol', graduation: 'petrecere-absolvire', birthday: 'petrecere-aniversare',
    bachelorette: 'petrecerea-burlacilor', corporate: 'evenimente-corporate',
    fashionWeek: 'saptamana-modei', designWeek: 'saptamana-designului-fuorisalone',
    newYearsEve: 'revelion', halloween: 'petrecere-halloween',
  },
  sk: {
    guide: 'sprievodca', milan: 'milano', vipTables: 'vip-stoly', dressCode: 'dress-code',
    club: 'klub', nightlife: 'nocny-zivot', zone: 'stvrt', music: 'hudba-kluby',
    party: 'party', prices: 'ceny', afterparty: 'afterparty', rooftop: 'rooftop-terasa',
    dinnerShow: 'vecera-show', graduation: 'promocie-oslava', birthday: 'narodeninova-oslava',
    bachelorette: 'rozlucka-so-slobodou', corporate: 'firemne-akcie',
    fashionWeek: 'tyzden-mody', designWeek: 'tyzden-dizajnu-fuorisalone',
    newYearsEve: 'silvester', halloween: 'halloween-party',
  },
  sl: {
    guide: 'vodnik', milan: 'milano', vipTables: 'vip-mize', dressCode: 'dress-code',
    club: 'klub', nightlife: 'nocno-zivljenje', zone: 'cetrt', music: 'glasba-klubi',
    party: 'zabava', prices: 'cene', afterparty: 'afterparty', rooftop: 'rooftop-terasa',
    dinnerShow: 'vecerja-show', graduation: 'diplomska-zabava', birthday: 'rojstnodnevna-zabava',
    bachelorette: 'fantovscina-dekliscina', corporate: 'poslovni-dogodki',
    fashionWeek: 'teden-mode', designWeek: 'teden-oblikovanja-fuorisalone',
    newYearsEve: 'silvestrovanje', halloween: 'noc-carovnic',
  },
  sv: {
    guide: 'guide', milan: 'milano', vipTables: 'vip-bord', dressCode: 'kladkod',
    club: 'nattklubb', nightlife: 'nattliv', zone: 'stadsdel', music: 'musik-klubbar',
    party: 'fest', prices: 'priser', afterparty: 'efterfest', rooftop: 'rooftop-takterrass',
    dinnerShow: 'middagsshow', graduation: 'examensfest', birthday: 'fodelsedagsfest',
    bachelorette: 'svensexa-mohippa', corporate: 'foretagsevent',
    fashionWeek: 'modevecka', designWeek: 'designvecka-fuorisalone',
    newYearsEve: 'nyarsafton', halloween: 'halloween-fest',
  },
  no: {
    guide: 'guide', milan: 'milano', vipTables: 'vip-bord', dressCode: 'kleskode',
    club: 'nattklubb', nightlife: 'uteliv', zone: 'bydel', music: 'musikk-klubber',
    party: 'fest', prices: 'priser', afterparty: 'nachspiel', rooftop: 'rooftop-takterrasse',
    dinnerShow: 'middagsshow', graduation: 'uteksamineringsfest', birthday: 'bursdagsfest',
    bachelorette: 'utdrikningslag', corporate: 'bedriftsarrangementer',
    fashionWeek: 'moteuke', designWeek: 'designuke-fuorisalone',
    newYearsEve: 'nyttarsaften', halloween: 'halloween-fest',
  },
  is: {
    guide: 'handbok', milan: 'milano', vipTables: 'vip-bord', dressCode: 'klaedaburdarreglur',
    club: 'naeturklubbur', nightlife: 'naeturlif', zone: 'hverfi', music: 'tonlist-klubbar',
    party: 'veisla', prices: 'verd', afterparty: 'eftirparty', rooftop: 'thakbar-rooftop',
    dinnerShow: 'kvoldverdur-syning', graduation: 'utskriftarveisla', birthday: 'afmaelisveisla',
    bachelorette: 'steggja-gaesaveisla', corporate: 'fyrirtaekjavidburdir',
    fashionWeek: 'tiskuVika'.toLowerCase(), designWeek: 'honnunarvika-fuorisalone',
    newYearsEve: 'gamlarskvold', halloween: 'hlekkjavaka',
  },
  uk: {
    guide: 'putivnyk', milan: 'milan', vipTables: 'vip-stoly', dressCode: 'dres-kod',
    club: 'klub', nightlife: 'nichne-zhyttya', zone: 'rayon', music: 'muzyka-kluby',
    party: 'vechirka', prices: 'tsiny', afterparty: 'afterpati', rooftop: 'ruftop-terasa',
    dinnerShow: 'vecherya-shou', graduation: 'vypusknyy', birthday: 'den-narodzhennya',
    bachelorette: 'parubotskyy-divoch-vechir', corporate: 'korporatyvni-podiyi',
    fashionWeek: 'tyzhden-mody', designWeek: 'tyzhden-dyzaynu-fuorisalone',
    newYearsEve: 'novyy-rik', halloween: 'hellovin',
  },
  sq: {
    guide: 'udhezues', milan: 'milano', vipTables: 'tavolina-vip', dressCode: 'kodi-veshjes',
    club: 'klub-nate', nightlife: 'jeta-e-nates', zone: 'lagje', music: 'muzike-klube',
    party: 'feste', prices: 'cmimet', afterparty: 'afterparty', rooftop: 'rooftop-tarrace',
    dinnerShow: 'darke-spektakel', graduation: 'feste-diplomimi', birthday: 'feste-ditelindjeje',
    bachelorette: 'feste-beqarie', corporate: 'evente-korporative',
    fashionWeek: 'java-e-modes', designWeek: 'java-e-dizajnit-fuorisalone',
    newYearsEve: 'viti-i-ri', halloween: 'festa-halloween',
  },
  sr: {
    guide: 'vodic', milan: 'milano', vipTables: 'vip-stolovi', dressCode: 'dres-kod',
    club: 'klub', nightlife: 'nocni-zivot', zone: 'cetvrt', music: 'muzika-klubovi',
    party: 'zurka', prices: 'cene', afterparty: 'afterparti', rooftop: 'rooftop-terasa',
    dinnerShow: 'vecera-sou', graduation: 'proslava-diplome', birthday: 'proslava-rodjendana',
    bachelorette: 'momacko-devojacko-vece', corporate: 'korporativni-dogadjaji',
    fashionWeek: 'nedelja-mode', designWeek: 'nedelja-dizajna-fuorisalone',
    newYearsEve: 'docek-nove-godine', halloween: 'noc-vestica',
  },
  bs: {
    guide: 'vodic', milan: 'milano', vipTables: 'vip-stolovi', dressCode: 'dress-code',
    club: 'klub', nightlife: 'nocni-zivot', zone: 'cetvrt', music: 'muzika-klubovi',
    party: 'zabava', prices: 'cijene', afterparty: 'afterparty', rooftop: 'rooftop-terasa',
    dinnerShow: 'vecera-show', graduation: 'proslava-diplome', birthday: 'proslava-rodjendana',
    bachelorette: 'momacko-djevojacko-vece', corporate: 'poslovni-dogadjaji',
    fashionWeek: 'sedmica-mode', designWeek: 'sedmica-dizajna-fuorisalone',
    newYearsEve: 'nova-godina', halloween: 'noc-vjestica',
  },
  mk: {
    guide: 'vodic', milan: 'milano', vipTables: 'vip-masi', dressCode: 'dres-kod',
    club: 'klub', nightlife: 'nokjen-zivot', zone: 'naselba', music: 'muzika-klubovi',
    party: 'zabava', prices: 'ceni', afterparty: 'afterparti', rooftop: 'ruftop-terasa',
    dinnerShow: 'vecera-sou', graduation: 'diplomska-zabava', birthday: 'rodendenska-zabava',
    bachelorette: 'ergenska-mominska-vecer', corporate: 'korporativni-nastani',
    fashionWeek: 'nedela-na-modata', designWeek: 'nedela-na-dizajnot-fuorisalone',
    newYearsEve: 'nova-godina', halloween: 'nokj-na-vesticite',
  },
};

export function sanitizeAsciiSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

function build35SlugMap(builder: (locale: LocaleCode, tk: SlugLangTokens) => string): Record<LocaleCode, string> {
  const out = {} as Record<LocaleCode, string>;
  for (const locale of ALL_35_LOCALES) {
    out[locale] = sanitizeAsciiSlug(builder(locale, SLUG_TOKENS_35[locale]));
  }
  return out;
}

// ─── 1. VENUE SLUGS (All 26 Core Venues + Additional Catalog Venues) ─────────
const CANONICAL_VENUE_BASES: Array<{
  canonicalSlug: string;
  id: string;
  brandSlug: string;
  aliases: string[];
}> = [
  { canonicalSlug: 'just-me-milano', id: 'v-justme', brandSlug: 'just-me', aliases: ['just-me', 'just-me-milan', 'justme-milano'] },
  { canonicalSlug: 'pineta-club-milano', id: 'v-pineta', brandSlug: 'pineta-club', aliases: ['pineta', 'pineta-milano'] },
  { canonicalSlug: 'aria-club-milano', id: 'v-aria', brandSlug: 'aria-club', aliases: ['aria', 'aria-milano'] },
  { canonicalSlug: 'voya-rooftop-milan', id: 'v-voya', brandSlug: 'voya-rooftop', aliases: ['voya', 'voya-rooftop', 'voya-rooftop-milano'] },
  { canonicalSlug: '55-milano', id: 'v-55milano', brandSlug: '55', aliases: ['fiftysix-milano', 'cinquantacinque-milano'] },
  { canonicalSlug: 'repvblic-milano', id: 'v-repvblic', brandSlug: 'repvblic', aliases: ['repvblic', 'republic-milano'] },
  { canonicalSlug: 'tocqueville-13-milano', id: 'v-tocqueville', brandSlug: 'tocqueville-13', aliases: ['tocqueville-13', 'tocqueville'] },
  { canonicalSlug: 'armani-prive-milano', id: 'v-armani-prive', brandSlug: 'armani-prive', aliases: ['armani-prive'] },
  { canonicalSlug: 'volt-club-milano', id: 'v-volt', brandSlug: 'volt-club', aliases: ['volt', 'volt-milano'] },
  { canonicalSlug: 'alcatraz-milano', id: 'v-alcatraz', brandSlug: 'alcatraz', aliases: ['alcatraz'] },
  { canonicalSlug: 'fabrique-milano', id: 'v-fabrique', brandSlug: 'fabrique', aliases: ['fabrique'] },
  { canonicalSlug: 'amnesia-milano', id: 'v-amnesia', brandSlug: 'amnesia', aliases: ['amnesia'] },
  { canonicalSlug: 'hollywood-club-milano', id: 'v-hollywood', brandSlug: 'hollywood-club', aliases: ['hollywood', 'hollywood-milano'] },
  { canonicalSlug: 'the-club-milano', id: 'v-theclub', brandSlug: 'the-club', aliases: ['the-club'] },
  { canonicalSlug: '11-clubroom', id: 'v-11clubroom', brandSlug: '11-clubroom', aliases: ['11-clubroom-milano', 'eleven-clubroom'] },
  { canonicalSlug: 'gattopardo-milano', id: 'v-gattopardo', brandSlug: 'gattopardo', aliases: ['gattopardo', 'il-gattopardo-milano'] },
  { canonicalSlug: 'mib-milano', id: 'v-mibmilano', brandSlug: 'mib', aliases: ['mib'] },
  { canonicalSlug: 'terrazza-21', id: 'v-terrazza21', brandSlug: 'terrazza-duomo-21', aliases: ['terrazza-duomo-21', 'terrazza-duomo-21-milano'] },
  { canonicalSlug: 'ceresio-7-milano', id: 'v-ceresio-7', brandSlug: 'ceresio-7', aliases: ['ceresio-7'] },
  { canonicalSlug: 'apollo-club-milano', id: 'v-apollo', brandSlug: 'apollo-club', aliases: ['apollo', 'apollo-milano'] },
  { canonicalSlug: 'magazzini-generali-milano', id: 'v-magazzini', brandSlug: 'magazzini-generali', aliases: ['magazzini-generali'] },
  { canonicalSlug: 'church-81', id: 'v-church81', brandSlug: 'church-81', aliases: ['church-81-milano'] },
  { canonicalSlug: 'loolapaloosa-milano', id: 'v-loolapaloosa', brandSlug: 'loolapaloosa', aliases: ['loolapaloosa'] },
  { canonicalSlug: 'bobino-milano', id: 'v-bobino', brandSlug: 'bobino', aliases: ['bobino', 'bobino-club-milano'] },
  { canonicalSlug: 'old-fashion-milano', id: 'v-oldfashion', brandSlug: 'old-fashion', aliases: ['old-fashion'] },
  { canonicalSlug: 'grace-club-milano', id: 'v-graceclub', brandSlug: 'grace-club', aliases: ['grace-club', 'grace-milano'] },
  // Extra venues in catalog
  { canonicalSlug: 'play-club-milano', id: 'v-playclub', brandSlug: 'play-club', aliases: ['play-club'] },
  { canonicalSlug: 'radio-rooftop-bar-milano', id: 'v-radio-rooftop-bar-milano', brandSlug: 'radio-rooftop-bar', aliases: ['radio-rooftop'] },
  { canonicalSlug: 'the-roof-milano', id: 'v-the-roof-milano', brandSlug: 'the-roof', aliases: ['the-roof'] },
  { canonicalSlug: 'terrazza-aperol-milano', id: 'v-terrazza-aperol-milano', brandSlug: 'terrazza-aperol', aliases: ['terrazza-aperol'] },
  { canonicalSlug: 'terrazza-gallia-milano', id: 'v-terrazza-gallia-milano', brandSlug: 'terrazza-gallia', aliases: ['terrazza-gallia'] },
  { canonicalSlug: 'ristorante-torre-milano', id: 'v-ristorante-torre-milano', brandSlug: 'ristorante-torre', aliases: ['ristorante-torre'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale', id: 'v-innocenti-evasioni-terrazza-triennale', brandSlug: 'terrazza-triennale', aliases: ['terrazza-triennale'] },
  { canonicalSlug: 'super-club-milano', id: 'v-super-club-milano', brandSlug: 'super-club', aliases: ['super-club'] },
];

export const VENUE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const venueSlugToCanonical = new Map<string, string>();

for (const v of CANONICAL_VENUE_BASES) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en' || locale === 'it') return v.canonicalSlug;
    return `${v.brandSlug}-${tk.milan}-${tk.vipTables}`;
  });
  VENUE_SLUGS_35[v.canonicalSlug] = map35;
  VENUE_SLUGS_35[v.id] = map35;
  venueSlugToCanonical.set(v.canonicalSlug, v.canonicalSlug);
  venueSlugToCanonical.set(v.id, v.canonicalSlug);
  venueSlugToCanonical.set(`${v.brandSlug}-milano-tavoli-vip`, v.canonicalSlug);
  venueSlugToCanonical.set(`${v.brandSlug}-milan-vip-tables`, v.canonicalSlug);
  for (const alias of v.aliases) {
    VENUE_SLUGS_35[alias] = map35;
    venueSlugToCanonical.set(alias, v.canonicalSlug);
  }
  for (const locSlug of Object.values(map35)) {
    venueSlugToCanonical.set(locSlug, v.canonicalSlug);
  }
}

export function resolveVenueSlug(slug: string): string {
  const clean = sanitizeAsciiSlug(slug);
  return venueSlugToCanonical.get(clean) || venueSlugToCanonical.get(slug) || slug;
}

export function getLocalizedVenueSlug35(venueSlugOrId: string, locale: LocaleCode): string {
  const canonical = resolveVenueSlug(venueSlugOrId);
  return VENUE_SLUGS_35[canonical]?.[locale] || canonical;
}

// ─── 2. ZONE SLUGS (All 14 Milan Zones) ──────────────────────────────────────
const CANONICAL_ZONES: Array<{ canonicalSlug: string; id: string; aliases: string[] }> = [
  { canonicalSlug: 'brera', id: 'BRERA', aliases: ['brera-milano', 'brera-quadrilatero'] },
  { canonicalSlug: 'navigli', id: 'NAVIGLI', aliases: ['navigli-darsena', 'navigli-milano'] },
  { canonicalSlug: 'corso-como', id: 'CORSO_COMO', aliases: ['corso-como-garibaldi', 'corso-como-milano'] },
  { canonicalSlug: 'isola', id: 'ISOLA', aliases: ['isola-porta-nuova', 'isola-milano'] },
  { canonicalSlug: 'porta-venezia', id: 'PORTA_VENEZIA', aliases: ['porta-venezia-milano'] },
  { canonicalSlug: 'arco-della-pace', id: 'ARCO_DELLA_PACE', aliases: ['arco-della-pace-sempione'] },
  { canonicalSlug: 'ripamonti', id: 'RIPAMONTI', aliases: ['ripamonti-mecenate', 'ripamonti-milano'] },
  { canonicalSlug: 'nolo', id: 'NOLO', aliases: ['nolo-milano', 'north-of-loreto'] },
  { canonicalSlug: 'porta-romana', id: 'PORTA_ROMANA', aliases: ['porta-romana-bocconi', 'porta-romana-milano'] },
  { canonicalSlug: 'lambrate', id: 'LAMBRATE', aliases: ['lambrate-milano', 'lambrate-citta-studi'] },
  { canonicalSlug: 'parco-sempione', id: 'SEMPIONE', aliases: ['sempione', 'parco-sempione-torre-branca'] },
  { canonicalSlug: 'duomo-san-babila', id: 'CENTRO_STORICO', aliases: ['centro-storico', 'duomo-milano', 'quadrilatero-moda'] },
  { canonicalSlug: 'citylife-portello', id: 'CITY_LIFE', aliases: ['city-life', 'citylife', 'portello'] },
  { canonicalSlug: 'san-siro', id: 'TORTONA', aliases: ['san-siro-ippodromo', 'tortona', 'san-siro-lotto'] },
];

export const ZONE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const zoneSlugToCanonical = new Map<string, string>();

for (const z of CANONICAL_ZONES) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en' || locale === 'it') return z.canonicalSlug;
    return `${z.canonicalSlug}-${tk.milan}-${tk.nightlife}`;
  });
  ZONE_SLUGS_35[z.canonicalSlug] = map35;
  ZONE_SLUGS_35[z.id] = map35;
  zoneSlugToCanonical.set(z.canonicalSlug, z.canonicalSlug);
  zoneSlugToCanonical.set(z.id.toLowerCase(), z.canonicalSlug);
  zoneSlugToCanonical.set(`${z.canonicalSlug}-milano-locali`, z.canonicalSlug);
  zoneSlugToCanonical.set(`${z.canonicalSlug}-milan-nightlife`, z.canonicalSlug);
  for (const alias of z.aliases) {
    ZONE_SLUGS_35[alias] = map35;
    zoneSlugToCanonical.set(alias, z.canonicalSlug);
  }
  for (const locSlug of Object.values(map35)) {
    zoneSlugToCanonical.set(locSlug, z.canonicalSlug);
  }
}

export function resolveZoneSlug(slug: string): string {
  const clean = sanitizeAsciiSlug(slug);
  return zoneSlugToCanonical.get(clean) || zoneSlugToCanonical.get(slug) || slug;
}

export function getLocalizedZoneSlug35(zoneSlug: string, locale: LocaleCode): string {
  const canonical = resolveZoneSlug(zoneSlug);
  return ZONE_SLUGS_35[canonical]?.[locale] || canonical;
}

// ─── 3. GENRE SLUGS (All 10 Music Genres + Format Aliases) ───────────────────
const CANONICAL_GENRES: Array<{ canonicalSlug: string; aliases: string[] }> = [
  { canonicalSlug: 'techno', aliases: ['techno-clubs-milan', 'techno-milano'] },
  { canonicalSlug: 'house', aliases: ['house-music-milan', 'house-milano'] },
  { canonicalSlug: 'afro-house', aliases: ['afro-house-melodic', 'afro-house-milano'] },
  { canonicalSlug: 'hip-hop', aliases: ['hip-hop-urban', 'hip-hop-trap-milano'] },
  { canonicalSlug: 'reggaeton', aliases: ['reggaeton-latin', 'reggaeton-milano'] },
  { canonicalSlug: 'commercial', aliases: ['commercial-sing-along', 'commerciale-milano'] },
  { canonicalSlug: 'dinner-show', aliases: ['dinner-show-aperitivo-cantato', 'cena-spettacolo-milano'] },
  { canonicalSlug: 'edm', aliases: ['edm-festival', 'edm-milano'] },
  { canonicalSlug: 'live-music', aliases: ['live-music-concerts', 'musica-dal-vivo-milano'] },
  { canonicalSlug: 'indie', aliases: ['indie-nu-disco', 'indie-milano'] },
];

export const GENRE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const genreSlugToCanonical = new Map<string, string>();

for (const g of CANONICAL_GENRES) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en' || locale === 'it') return g.canonicalSlug;
    return `${g.canonicalSlug}-${tk.milan}-${tk.music}`;
  });
  GENRE_SLUGS_35[g.canonicalSlug] = map35;
  genreSlugToCanonical.set(g.canonicalSlug, g.canonicalSlug);
  genreSlugToCanonical.set(`${g.canonicalSlug}-milano`, g.canonicalSlug);
  genreSlugToCanonical.set(`${g.canonicalSlug}-milan`, g.canonicalSlug);
  for (const alias of g.aliases) {
    GENRE_SLUGS_35[alias] = map35;
    genreSlugToCanonical.set(alias, g.canonicalSlug);
  }
  for (const locSlug of Object.values(map35)) {
    genreSlugToCanonical.set(locSlug, g.canonicalSlug);
  }
}

export function resolveGenreSlug(slug: string): string {
  const clean = sanitizeAsciiSlug(slug);
  return genreSlugToCanonical.get(clean) || genreSlugToCanonical.get(slug) || slug;
}

export function getLocalizedGenreSlug35(genreSlug: string, locale: LocaleCode): string {
  const canonical = resolveGenreSlug(genreSlug);
  return GENRE_SLUGS_35[canonical]?.[locale] || canonical;
}

// ─── 4. EXISTING 14 PILLAR GUIDES SLUGS (All 35 Languages) ───────────────────
const EXISTING_14_SPECS: Array<{
  id: string;
  en: string;
  it: string;
  topicToken: (tk: SlugLangTokens) => string;
}> = [
  {
    id: 'g-dress-code',
    en: 'ultimate-dress-code-guide-milan-clubs',
    it: 'guida-definitiva-dress-code-club-milano',
    topicToken: (tk) => `${tk.guide}-${tk.dressCode}-${tk.club}-${tk.milan}`,
  },
  {
    id: 'g-secret-bars',
    en: 'hidden-speakeasies-navigli',
    it: 'speakeasy-nascosti-navigli',
    topicToken: (tk) => `${tk.guide}-speakeasy-navigli-${tk.milan}`,
  },
  {
    id: 'g-vip-tables',
    en: 'how-to-book-vip-table',
    it: 'come-prenotare-tavolo-vip',
    topicToken: (tk) => `${tk.guide}-${tk.vipTables}-${tk.milan}`,
  },
  {
    id: 'g-dj-interview',
    en: 'interview-sound-of-milan',
    it: 'intervista-sound-of-milan',
    topicToken: (tk) => `${tk.guide}-dj-sound-${tk.milan}`,
  },
  {
    id: 'g-techno-2026',
    en: 'where-to-find-best-techno-2026',
    it: 'dove-trovare-migliore-techno-2026',
    topicToken: (tk) => `${tk.guide}-techno-${tk.club}-${tk.milan}-2026`,
  },
  {
    id: 'g-vip-bottle-prices',
    en: 'vip-table-bottle-service-prices-milan',
    it: 'prezzi-tavoli-vip-bottiglie-discoteche-milano',
    topicToken: (tk) => `${tk.prices}-${tk.vipTables}-${tk.club}-${tk.milan}`,
  },
  {
    id: 'g-weekly-calendar',
    en: 'weekly-nightlife-calendar-milan-monday-sunday',
    it: 'calendario-settimanale-serate-milano-lunedi-domenica',
    topicToken: (tk) => `${tk.guide}-${tk.nightlife}-${tk.milan}-7-7`,
  },
  {
    id: 'g-rooftops-milan',
    en: 'best-rooftop-bars-panoramic-terraces-milan',
    it: 'migliori-rooftop-terrazze-panoramiche-milano',
    topicToken: (tk) => `${tk.guide}-${tk.rooftop}-${tk.milan}`,
  },
  {
    id: 'g-private-parties',
    en: 'graduation-18th-birthday-bachelorette-parties-milan',
    it: 'festa-laurea-18-anni-compleanno-addio-nubilato-celibato-milano',
    topicToken: (tk) => `${tk.graduation}-${tk.birthday}-${tk.bachelorette}-${tk.milan}`,
  },
  {
    id: 'g-mfw-fuorisalone-f1',
    en: 'milan-fashion-week-fuorisalone-monza-f1-afterparties',
    it: 'feste-milano-fashion-week-fuorisalone-monza-f1',
    topicToken: (tk) => `${tk.fashionWeek}-${tk.designWeek}-monza-f1-${tk.milan}`,
  },
  {
    id: 'g-san-siro-football-afterparties',
    en: 'san-siro-football-match-afterparties-inter-ac-milan',
    it: 'dopo-partita-san-siro-milano-inter-milan-discoteche',
    topicToken: (tk) => `san-siro-inter-milan-${tk.afterparty}-${tk.milan}`,
  },
  {
    id: 'g-new-years-eve-2027',
    en: 'new-years-eve-milan-clubs-guide',
    it: 'guida-capodanno-milano-discoteche-cenone-tavoli',
    topicToken: (tk) => `${tk.guide}-${tk.newYearsEve}-2027-${tk.milan}-${tk.vipTables}`,
  },
  {
    id: 'g-concert-afterparties-milan',
    en: 'milan-concert-afterparties-san-siro-ippodromo-guide',
    it: 'dopo-concerto-milano-san-siro-ippodromo-forum-discoteche',
    topicToken: (tk) => `${tk.guide}-${tk.afterparty}-san-siro-ippodromo-${tk.milan}`,
  },
  {
    id: 'g-bachelor-bachelorette-vip-milan',
    en: 'milan-bachelor-bachelorette-vip-party-guide',
    it: 'addio-al-celibato-nubilato-milano-discoteche-priv-cena-cantata',
    topicToken: (tk) => `${tk.guide}-${tk.bachelorette}-${tk.vipTables}-${tk.milan}`,
  },
];

export const EXISTING_14_GUIDE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const existingGuideSlugToId = new Map<string, string>();

for (const spec of EXISTING_14_SPECS) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en') return spec.en;
    if (locale === 'it') return spec.it;
    return spec.topicToken(tk);
  });
  EXISTING_14_GUIDE_SLUGS_35[spec.id] = map35;
  EXISTING_14_GUIDE_SLUGS_35[spec.en] = map35;
  EXISTING_14_GUIDE_SLUGS_35[spec.it] = map35;
  existingGuideSlugToId.set(spec.id, spec.id);
  for (const locSlug of Object.values(map35)) {
    existingGuideSlugToId.set(locSlug, spec.id);
  }
}

export function resolveExistingGuideId(slugOrId: string): string | undefined {
  const clean = sanitizeAsciiSlug(slugOrId);
  return existingGuideSlugToId.get(clean) || existingGuideSlugToId.get(slugOrId);
}

export function getExistingGuideSlug35(guideIdOrSlug: string, locale: LocaleCode): string {
  const id = resolveExistingGuideId(guideIdOrSlug) || guideIdOrSlug;
  return EXISTING_14_GUIDE_SLUGS_35[id]?.[locale] || guideIdOrSlug;
}
