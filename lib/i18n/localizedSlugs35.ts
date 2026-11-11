import type { LocaleCode } from './localeRegistry';
import { GUIDE_100_SLUGS_MAP, CAPODANNO_NAV_35 } from './guideSlugs100Map';
import {
  DIR_AND_SUB_TOKENS_35,
  getLocalizedDir35,
  resolveLocalizedDirToCanonical,
  type DirAndSubTokens,
} from './dirTokens35';
import { HALLOWEEN_NAVIGATION } from '@/lib/halloween/navigation';
import {
  capodannoCategorySlug,
  capodannoEventSlug,
  resolveCapodannoCategoryIdByLocalizedSlug,
  resolveCapodannoEventBaseSlugByLocalizedSlug,
} from '@/lib/capodanno/routes';
import { getEventBatchProfile, getEventBatchSlug } from '@/lib/eventBatchProfiles';

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
    party: 'vakarelis', prices: 'kainos', afterparty: 'afterparty', rooftop: 'stogo-terasa',
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
    fashionWeek: 'tiskuvika', designWeek: 'honnunarvika-fuorisalone',
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

// ─── 1. VENUE SLUGS (All Core Venues + Additional Catalog Venues) ────────────
const CANONICAL_VENUE_BASES: Array<{
  canonicalSlug: string;
  id: string;
  brandSlug: string;
  aliases: string[];
}> = [
  { canonicalSlug: 'just-me-milano', id: 'v-justme', brandSlug: 'just-me', aliases: ['just-me', 'just-me-milan', 'justme-milano'] },
  { canonicalSlug: 'pineta-club-milano', id: 'v-pineta', brandSlug: 'pineta-club', aliases: ['pineta', 'pineta-milano'] },
  { canonicalSlug: 'aria-club-milano', id: 'v-aria', brandSlug: 'aria-club', aliases: ['aria', 'aria-milano'] },
  { canonicalSlug: 'voya-rooftop-milan', id: 'v-voya', brandSlug: 'voya-rooftop', aliases: ['voya', 'voya-rooftop', 'voya-rooftop-milano', 'voya-club-milano'] },
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
  { canonicalSlug: '11-clubroom', id: 'v-11clubroom', brandSlug: '11-clubroom', aliases: ['11-clubroom-milano', 'eleven-clubroom', '11clubroom-milano'] },
  { canonicalSlug: 'gattopardo-milano', id: 'v-gattopardo', brandSlug: 'gattopardo', aliases: ['gattopardo', 'il-gattopardo-milano'] },
  { canonicalSlug: 'mib-milano', id: 'v-mibmilano', brandSlug: 'mib', aliases: ['mib'] },
  { canonicalSlug: 'terrazza-21', id: 'v-terrazza21', brandSlug: 'terrazza-duomo-21', aliases: ['terrazza-duomo-21', 'terrazza-duomo-21-milano'] },
  { canonicalSlug: 'ceresio-7-milano', id: 'v-ceresio-7', brandSlug: 'ceresio-7', aliases: ['ceresio-7'] },
  { canonicalSlug: 'apollo-club-milano', id: 'v-apollo', brandSlug: 'apollo-club', aliases: ['apollo', 'apollo-milano'] },
  { canonicalSlug: 'magazzini-generali-milano', id: 'v-magazzini', brandSlug: 'magazzini-generali', aliases: ['magazzini-generali'] },
  { canonicalSlug: 'church-81', id: 'v-church81', brandSlug: 'church-81', aliases: ['church-81-milano'] },
  { canonicalSlug: 'loolapaloosa-milano', id: 'v-loolapaloosa', brandSlug: 'loolapaloosa', aliases: ['loolapaloosa', 'loolapaloosa-corso-como'] },
  { canonicalSlug: 'bobino-milano', id: 'v-bobino', brandSlug: 'bobino', aliases: ['bobino', 'bobino-club', 'bobino-club-milano', 'bobino-navigli'] },
  { canonicalSlug: 'dock-22-milano', id: 'v-dock22', brandSlug: 'dock-22', aliases: ['dock22', 'dock-22', 'dock22-milano', 'dock-22-milan'] },
  { canonicalSlug: 'old-fashion-milano', id: 'v-oldfashion', brandSlug: 'old-fashion', aliases: ['old-fashion'] },
  { canonicalSlug: 'grace-club-milano', id: 'v-graceclub', brandSlug: 'grace-club', aliases: ['grace-club', 'grace-milano', 'the-grace-club-milano'] },
  // Extra venues in catalog
  { canonicalSlug: 'play-club-milano', id: 'v-playclub', brandSlug: 'play-club', aliases: ['play-club'] },
  { canonicalSlug: 'radio-rooftop-bar-milano', id: 'v-radio-rooftop-bar-milano', brandSlug: 'radio-rooftop-bar', aliases: ['radio-rooftop'] },
  { canonicalSlug: 'the-roof-milano', id: 'v-the-roof-milano', brandSlug: 'the-roof', aliases: ['the-roof'] },
  { canonicalSlug: 'terrazza-aperol-milano', id: 'v-terrazza-aperol-milano', brandSlug: 'terrazza-aperol', aliases: ['terrazza-aperol'] },
  { canonicalSlug: 'terrazza-gallia-milano', id: 'v-terrazza-gallia-milano', brandSlug: 'terrazza-gallia', aliases: ['terrazza-gallia'] },
  { canonicalSlug: 'ristorante-torre-milano', id: 'v-ristorante-torre-milano', brandSlug: 'ristorante-torre', aliases: ['ristorante-torre'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale', id: 'v-innocenti-evasioni-terrazza-triennale', brandSlug: 'terrazza-triennale', aliases: ['terrazza-triennale'] },
  { canonicalSlug: 'super-club-milano', id: 'v-super-club-milano', brandSlug: 'super-club', aliases: ['super-club'] },
  { canonicalSlug: 'the-beach-milano', id: 'v-the-beach-milano', brandSlug: 'the-beach', aliases: ['the-beach', 'the-beach-club-milano'] },
  { canonicalSlug: 'gate-milano', id: 'v-gate-milano', brandSlug: 'gate-club', aliases: ['gate', 'gate-club-milano'] },
  { canonicalSlug: 'lime-milano', id: 'v-lime-milano', brandSlug: 'lime-club', aliases: ['lime', 'lime-club-milano'] },
  { canonicalSlug: 'the-sanctuary-milano', id: 'v-the-sanctuary-milano', brandSlug: 'the-sanctuary', aliases: ['the-sanctuary', 'sanctuary-milano'] },
  { canonicalSlug: 'apophis-club-milano', id: 'v-apophis-club-milano', brandSlug: 'apophis-club', aliases: ['apophis', 'apophis-milano'] },
  { canonicalSlug: 'tunnel-club-milano', id: 'v-tunnel-club-milano', brandSlug: 'tunnel-club', aliases: ['tunnel', 'tunnel-milano'] },
  { canonicalSlug: 'plastic-milano', id: 'v-plastic-milano', brandSlug: 'plastic-club', aliases: ['plastic', 'plastic-club-milano'] },
  { canonicalSlug: 'dazi-milano', id: 'v-dazi-milano', brandSlug: 'dazi', aliases: ['dazi'] },
  { canonicalSlug: 'nepentha-milano', id: 'v-nepentha-milano', brandSlug: 'nepentha', aliases: ['nepentha'] },
  { canonicalSlug: 'twiga-milano', id: 'v-twiga-milano', brandSlug: 'twiga', aliases: ['twiga'] },
  { canonicalSlug: 'vibe-room-milano', id: 'v-vibe-room-milano', brandSlug: 'vibe-room', aliases: ['vibe-room'] },
  { canonicalSlug: 'hotel-costez-milano', id: 'v-hotel-costez-milano', brandSlug: 'hotel-costez', aliases: ['hotel-costez'] },
  { canonicalSlug: 'cost-milano', id: 'v-cost-milano', brandSlug: 'cost-dining-club', aliases: ['cost', 'cost-dining-club'] },
  { canonicalSlug: 'rocca-brivio-sforza-milano', id: 'v-rocca-brivio-sforza-milano', brandSlug: 'rocca-brivio-sforza', aliases: ['rocca-brivio-sforza'] },
  { canonicalSlug: 'social-music-city-milano', id: 'v-social-music-city-milano', brandSlug: 'social-music-city', aliases: ['social-music-city'] },
];

export const VENUE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const venueSlugToCanonical = new Map<string, string>();

for (const v of CANONICAL_VENUE_BASES) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en') return v.canonicalSlug;
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
  const direct = venueSlugToCanonical.get(clean) || venueSlugToCanonical.get(slug);
  if (direct) return direct;
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (!tk) continue;
    const suffix = `-${tk.milan}-${tk.vipTables}`;
    if (clean.endsWith(suffix)) {
      const base = clean.slice(0, -suffix.length);
      return venueSlugToCanonical.get(base) || `${base}-milano`;
    }
  }
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (!tk) continue;
    const vipOnlySuffix = `-${tk.vipTables}`;
    if (clean.endsWith(vipOnlySuffix)) {
      const base = clean.slice(0, -vipOnlySuffix.length);
      const hit = venueSlugToCanonical.get(base);
      if (hit) return hit;
    }
  }
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (!tk) continue;
    const cityOnlySuffix = `-${tk.milan}`;
    if (clean.endsWith(cityOnlySuffix)) {
      const base = clean.slice(0, -cityOnlySuffix.length);
      const hit = venueSlugToCanonical.get(base);
      if (hit) return hit;
    }
  }
  return slug;
}

export function getLocalizedVenueSlug35(venueSlugOrId: string, locale: LocaleCode): string {
  const canonical = resolveVenueSlug(venueSlugOrId);
  const mapped = VENUE_SLUGS_35[canonical]?.[locale];
  if (mapped) return mapped;
  if (locale === 'en') return canonical;
  const tk = SLUG_TOKENS_35[locale] || SLUG_TOKENS_35.en;
  const brand = canonical.replace(/-milano$/, '').replace(/-milan$/, '');
  return sanitizeAsciiSlug(`${brand}-${tk.milan}-${tk.vipTables}`);
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
  { canonicalSlug: 'duomo-san-babila', id: 'CENTRO_STORICO', aliases: ['centro-storico', 'duomo-milano', 'quadrilatero-moda', 'duomo-centro'] },
  { canonicalSlug: 'citylife-portello', id: 'CITY_LIFE', aliases: ['city-life', 'citylife', 'portello', 'citylife-sempione'] },
  { canonicalSlug: 'san-siro', id: 'TORTONA', aliases: ['san-siro-ippodromo', 'tortona', 'san-siro-lotto'] },
];

export const ZONE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const zoneSlugToCanonical = new Map<string, string>();

for (const z of CANONICAL_ZONES) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en') return z.canonicalSlug;
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
  const direct = zoneSlugToCanonical.get(clean) || zoneSlugToCanonical.get(slug);
  if (direct) return direct;
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (!tk) continue;
    const suffix = `-${tk.milan}-${tk.nightlife}`;
    if (clean.endsWith(suffix)) {
      const base = clean.slice(0, -suffix.length);
      return zoneSlugToCanonical.get(base) || base;
    }
  }
  return slug;
}

export function getLocalizedZoneSlug35(zoneSlug: string, locale: LocaleCode): string {
  const canonical = resolveZoneSlug(zoneSlug);
  const mapped = ZONE_SLUGS_35[canonical]?.[locale];
  if (mapped) return mapped;
  if (locale === 'en') return canonical;
  const tk = SLUG_TOKENS_35[locale] || SLUG_TOKENS_35.en;
  return sanitizeAsciiSlug(`${canonical}-${tk.milan}-${tk.nightlife}`);
}

// ─── 3. GENRE SLUGS (All Music Genres + Format Aliases) ──────────────────────
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
  { canonicalSlug: 'latin', aliases: ['latin-milano', 'musica-latina-milano'] },
  { canonicalSlug: 'afrobeats', aliases: ['afrobeats-milano'] },
  { canonicalSlug: 'open-format', aliases: ['open-format-milano'] },
  { canonicalSlug: 'tech-house', aliases: ['tech-house-milano'] },
  { canonicalSlug: 'melodic-techno', aliases: ['melodic-techno-milano'] },
];

export const GENRE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const genreSlugToCanonical = new Map<string, string>();

for (const g of CANONICAL_GENRES) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en') return g.canonicalSlug;
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
  const direct = genreSlugToCanonical.get(clean) || genreSlugToCanonical.get(slug);
  if (direct) return direct;
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (!tk) continue;
    const suffix = `-${tk.milan}-${tk.music}`;
    if (clean.endsWith(suffix)) {
      const base = clean.slice(0, -suffix.length);
      return genreSlugToCanonical.get(base) || base;
    }
  }
  return slug;
}

export function getLocalizedGenreSlug35(genreSlug: string, locale: LocaleCode): string {
  const canonical = resolveGenreSlug(genreSlug);
  const mapped = GENRE_SLUGS_35[canonical]?.[locale];
  if (mapped) return mapped;
  if (locale === 'en') return canonical;
  const tk = SLUG_TOKENS_35[locale] || SLUG_TOKENS_35.en;
  return sanitizeAsciiSlug(`${canonical}-${tk.milan}-${tk.music}`);
}

// ─── 4. ALL 114 PILLAR GUIDES SLUGS (14 Core + 100 Expansion Guides) ─────────
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

for (const [gid, locMap] of Object.entries(GUIDE_100_SLUGS_MAP)) {
  EXISTING_14_GUIDE_SLUGS_35[gid] = locMap;
  existingGuideSlugToId.set(gid, gid);
  for (const locSlug of Object.values(locMap)) {
    if (locSlug) {
      EXISTING_14_GUIDE_SLUGS_35[locSlug] = locMap;
      existingGuideSlugToId.set(locSlug, gid);
    }
  }
}

export function resolveExistingGuideId(slugOrId: string): string | undefined {
  const clean = sanitizeAsciiSlug(slugOrId);
  if (clean === 'san-siro-football-afterparties-guide') {
    return 'g-san-siro-football-afterparties';
  }
  return existingGuideSlugToId.get(clean) || existingGuideSlugToId.get(slugOrId);
}

export function getExistingGuideSlug35(guideIdOrSlug: string, locale: LocaleCode): string {
  const id = resolveExistingGuideId(guideIdOrSlug) || guideIdOrSlug;
  return EXISTING_14_GUIDE_SLUGS_35[id]?.[locale] || guideIdOrSlug;
}

export function registerExtraGuideSlugs35(
  extraGuides: ReadonlyArray<{ id: string; slugs35: Record<LocaleCode, string> }>,
): void {
  for (const g of extraGuides) {
    if (!EXISTING_14_GUIDE_SLUGS_35[g.id]) {
      EXISTING_14_GUIDE_SLUGS_35[g.id] = g.slugs35;
    }
    existingGuideSlugToId.set(g.id.toLowerCase(), g.id);
    for (const loc of ALL_35_LOCALES) {
      const s = g.slugs35[loc];
      if (s) existingGuideSlugToId.set(s.toLowerCase(), g.id);
    }
  }
}

// ─── 5. WEEKLY EVENTS, HALLOWEEN, CAPODANNO & DATED EVENTS ───────────────────
const WEEKDAY_TOKENS_35: Record<LocaleCode, Record<string, string>> = {
  en: { monday: 'monday', tuesday: 'tuesday', wednesday: 'wednesday', thursday: 'thursday', friday: 'friday', saturday: 'saturday', sunday: 'sunday' },
  it: { monday: 'lunedi', tuesday: 'martedi', wednesday: 'mercoledi', thursday: 'giovedi', friday: 'venerdi', saturday: 'sabato', sunday: 'domenica' },
  es: { monday: 'lunes', tuesday: 'martes', wednesday: 'miercoles', thursday: 'jueves', friday: 'viernes', saturday: 'sabado', sunday: 'domingo' },
  fr: { monday: 'lundi', tuesday: 'mardi', wednesday: 'mercredi', thursday: 'jeudi', friday: 'vendredi', saturday: 'samedi', sunday: 'dimanche' },
  de: { monday: 'montag', tuesday: 'dienstag', wednesday: 'mittwoch', thursday: 'donnerstag', friday: 'freitag', saturday: 'samstag', sunday: 'sonntag' },
  pt: { monday: 'segunda', tuesday: 'terca', wednesday: 'quarta', thursday: 'quinta', friday: 'sexta', saturday: 'sabado', sunday: 'domingo' },
  nl: { monday: 'maandag', tuesday: 'dinsdag', wednesday: 'woensdag', thursday: 'donderdag', friday: 'vrijdag', saturday: 'zaterdag', sunday: 'zondag' },
  ru: { monday: 'ponedelnik', tuesday: 'vtornik', wednesday: 'sreda', thursday: 'chetverg', friday: 'pyatnitsa', saturday: 'subbota', sunday: 'voskresene' },
  tr: { monday: 'pazartesi', tuesday: 'sali', wednesday: 'carsamba', thursday: 'persembe', friday: 'cuma', saturday: 'cumartesi', sunday: 'pazar' },
  zh: { monday: 'zhouyi', tuesday: 'zhouer', wednesday: 'zhousan', thursday: 'zhousi', friday: 'zhouwu', saturday: 'zhouliu', sunday: 'zhouri' },
  ar: { monday: 'al-ithnayn', tuesday: 'al-thulatha', wednesday: 'al-arbia', thursday: 'al-khamis', friday: 'al-juma', saturday: 'al-sabt', sunday: 'al-ahad' },
  bg: { monday: 'ponedelnik', tuesday: 'vtornik', wednesday: 'sryada', thursday: 'chetvartak', friday: 'petak', saturday: 'sabota', sunday: 'nedelya' },
  hr: { monday: 'ponedjeljak', tuesday: 'utorak', wednesday: 'srijeda', thursday: 'cetvrtak', friday: 'petak', saturday: 'subota', sunday: 'nedjelja' },
  cs: { monday: 'pondeli', tuesday: 'utery', wednesday: 'streda', thursday: 'ctvrtek', friday: 'patek', saturday: 'sobota', sunday: 'nedele' },
  da: { monday: 'mandag', tuesday: 'tirsdag', wednesday: 'onsdag', thursday: 'torsdag', friday: 'fredag', saturday: 'lordag', sunday: 'sondag' },
  et: { monday: 'esmaspaev', tuesday: 'teisipaev', wednesday: 'kolmapaev', thursday: 'neljapaev', friday: 'reede', saturday: 'laupaev', sunday: 'puhapaev' },
  fi: { monday: 'maanantai', tuesday: 'tiistai', wednesday: 'keskiviikko', thursday: 'torstai', friday: 'perjantai', saturday: 'lauantai', sunday: 'sunnuntai' },
  el: { monday: 'deftera', tuesday: 'triti', wednesday: 'tetarti', thursday: 'pempti', friday: 'paraskevi', saturday: 'savvato', sunday: 'kyriaki' },
  hu: { monday: 'hetfo', tuesday: 'kedd', wednesday: 'szerda', thursday: 'csutortok', friday: 'pentek', saturday: 'szombat', sunday: 'vasarnap' },
  ga: { monday: 'an-luain', tuesday: 'an-mhairt', wednesday: 'an-cheadaoin', thursday: 'an-deardaoin', friday: 'an-aoine', saturday: 'an-satharn', sunday: 'an-domhnach' },
  lv: { monday: 'pirmdiena', tuesday: 'otrdiena', wednesday: 'tresdiena', thursday: 'ceturtdiena', friday: 'piektdiena', saturday: 'sestdiena', sunday: 'svetdiena' },
  lt: { monday: 'pirmadienis', tuesday: 'antradienis', wednesday: 'treciadienis', thursday: 'ketvirtadienis', friday: 'penktadienis', saturday: 'sestadienis', sunday: 'sekmadienis' },
  mt: { monday: 'it-tnejn', tuesday: 'it-tlieta', wednesday: 'l-erbgha', thursday: 'il-hamis', friday: 'il-gimgha', saturday: 'is-sibt', sunday: 'il-hadd' },
  pl: { monday: 'poniedzialek', tuesday: 'wtorek', wednesday: 'sroda', thursday: 'czwartek', friday: 'piatek', saturday: 'sobota', sunday: 'niedziela' },
  ro: { monday: 'luni', tuesday: 'marti', wednesday: 'miercuri', thursday: 'joi', friday: 'vineri', saturday: 'sambata', sunday: 'duminica' },
  sk: { monday: 'pondelok', tuesday: 'utorok', wednesday: 'streda', thursday: 'stvrtok', friday: 'piatok', saturday: 'sobota', sunday: 'nedela' },
  sl: { monday: 'ponedeljek', tuesday: 'torek', wednesday: 'sreda', thursday: 'cetrtek', friday: 'petek', saturday: 'sobota', sunday: 'nedelja' },
  sv: { monday: 'mandag', tuesday: 'tisdag', wednesday: 'onsdag', thursday: 'torsdag', friday: 'fredag', saturday: 'lordag', sunday: 'sondag' },
  no: { monday: 'mandag', tuesday: 'tirsdag', wednesday: 'onsdag', thursday: 'torsdag', friday: 'fredag', saturday: 'lordag', sunday: 'sondag' },
  is: { monday: 'manudagur', tuesday: 'thridjudagur', wednesday: 'midvikudagur', thursday: 'fimmtudagur', friday: 'fostudagur', saturday: 'laugardagur', sunday: 'sunnudagur' },
  uk: { monday: 'ponedilok', tuesday: 'vivtorok', wednesday: 'sereda', thursday: 'chetver', friday: 'pyatnytsya', saturday: 'subota', sunday: 'nedilya' },
  sq: { monday: 'e-hene', tuesday: 'e-marte', wednesday: 'e-merkure', thursday: 'e-enjte', friday: 'e-premte', saturday: 'e-shtune', sunday: 'e-diel' },
  sr: { monday: 'ponedeljak', tuesday: 'utorak', wednesday: 'sreda', thursday: 'cetvrtak', friday: 'petak', saturday: 'subota', sunday: 'nedelja' },
  bs: { monday: 'ponedjeljak', tuesday: 'utorak', wednesday: 'srijeda', thursday: 'cetvrtak', friday: 'petak', saturday: 'subota', sunday: 'nedjelja' },
  mk: { monday: 'ponedelnik', tuesday: 'vtornik', wednesday: 'sreda', thursday: 'cetvrtok', friday: 'petok', saturday: 'sabota', sunday: 'nedela' },
};

const WEEKLY_EVENT_DEFS: Array<{ canonicalSlug: string; clubKey: string; day: string; partyName: string; shortAliases?: string[] }> = [
  { canonicalSlug: 'justme-monday-monday-night', clubKey: 'just-me', day: 'monday', partyName: 'monday-night', shortAliases: ['monday-night', 'justme-monday'] },
  { canonicalSlug: 'justme-tuesday-martedi-universitario', clubKey: 'just-me', day: 'tuesday', partyName: 'university-party', shortAliases: ['martedi-universitario', 'justme-tuesday', 'justme-tuesday-Reset'] },
  { canonicalSlug: 'justme-wednesday-absolutely', clubKey: 'just-me', day: 'wednesday', partyName: 'absolutely', shortAliases: ['absolutely', 'justme-wednesday', 'justme-wednesday-one-night'] },
  { canonicalSlug: 'justme-thursday-viziatissima', clubKey: 'just-me', day: 'thursday', partyName: 'viziatissima', shortAliases: ['viziatissima', 'justme-thursday', 'justme-thursday-secret-garden'] },
  { canonicalSlug: 'justme-friday-friday-night', clubKey: 'just-me', day: 'friday', partyName: 'friday-night', shortAliases: ['justme-friday', 'justme-friday-if-holding'] },
  { canonicalSlug: 'justme-saturday-saturday-night', clubKey: 'just-me', day: 'saturday', partyName: 'saturday-night', shortAliases: ['justme-saturday'] },
  { canonicalSlug: 'justme-sunday-uptown', clubKey: 'just-me', day: 'sunday', partyName: 'uptown', shortAliases: ['uptown', 'justme-sunday', 'justme-sunday-sunday-night'] },
  { canonicalSlug: 'pineta-thursday-thursday-night', clubKey: 'pineta', day: 'thursday', partyName: 'trendy-society', shortAliases: ['pineta-thursday'] },
  { canonicalSlug: 'pineta-friday-aperitivo-cantato', clubKey: 'pineta', day: 'friday', partyName: 'aperitivo-cantato', shortAliases: ['aperitivo-cantato', 'pineta-friday', 'pineta-friday-bella-vita'] },
  { canonicalSlug: 'pineta-saturday-saturday-live', clubKey: 'pineta', day: 'saturday', partyName: 'saturday-live', shortAliases: ['saturday-live', 'pineta-saturday', 'pineta-saturday-viziatissima'] },
  { canonicalSlug: 'aria-thursday-thursday-night', clubKey: 'aria-club', day: 'thursday', partyName: 'thursday-night', shortAliases: ['aria-thursday'] },
  { canonicalSlug: 'aria-friday-friday-night', clubKey: 'aria-club', day: 'friday', partyName: 'friday-night', shortAliases: ['aria-friday', 'aria-friday-absolutely'] },
  { canonicalSlug: 'aria-saturday-saturday-night', clubKey: 'aria-club', day: 'saturday', partyName: 'saturday-night', shortAliases: ['aria-saturday', 'aria-saturday-showtime'] },
  { canonicalSlug: 'voya-tuesday-rooftop-experience', clubKey: 'voya-rooftop', day: 'tuesday', partyName: 'rooftop-experience', shortAliases: ['rooftop-experience', 'voya-tuesday'] },
  { canonicalSlug: 'voya-wednesday-rooftop-experience', clubKey: 'voya-rooftop', day: 'wednesday', partyName: 'rooftop-experience', shortAliases: ['voya-wednesday'] },
  { canonicalSlug: 'voya-thursday-rooftop-experience', clubKey: 'voya-rooftop', day: 'thursday', partyName: 'rooftop-experience', shortAliases: ['voya-thursday', 'voya-thursday-desacato'] },
  { canonicalSlug: 'voya-friday-rooftop-experience', clubKey: 'voya-rooftop', day: 'friday', partyName: 'rooftop-experience', shortAliases: ['voya-friday', 'voya-friday-friday-night'] },
  { canonicalSlug: 'voya-saturday-rooftop-experience', clubKey: 'voya-rooftop', day: 'saturday', partyName: 'rooftop-experience', shortAliases: ['voya-saturday', 'voya-saturday-rehab'] },
  { canonicalSlug: 'voya-sunday-skyline-brunch', clubKey: 'voya-rooftop', day: 'sunday', partyName: 'skyline-brunch', shortAliases: ['skyline-brunch', 'voya-sunday'] },
  { canonicalSlug: '55milano-tuesday-royal-apericena-lounge', clubKey: '55', day: 'tuesday', partyName: 'royal-apericena-lounge', shortAliases: ['royal-apericena-lounge', '55milano-tuesday', '55milano-tuesday-martedi-universitario'] },
  { canonicalSlug: '55milano-wednesday-royal-apericena-lounge', clubKey: '55', day: 'wednesday', partyName: 'royal-apericena-wednesday', shortAliases: ['55milano-wednesday'] },
  { canonicalSlug: '55milano-thursday-dinner-show-thursday', clubKey: '55', day: 'thursday', partyName: 'dinner-show-thursday', shortAliases: ['dinner-show-thursday', '55milano-thursday', '55milano-thursday-aperitivo-cena-cantata'] },
  { canonicalSlug: '55milano-friday-aperitivo-cena-cantata', clubKey: '55', day: 'friday', partyName: 'aperitivo-dinner-show', shortAliases: ['55milano-friday'] },
  { canonicalSlug: '55milano-saturday-aperitivo-cena-cantata', clubKey: '55', day: 'saturday', partyName: 'aperitivo-dinner-show', shortAliases: ['aperitivo-cena-cantata', '55milano-saturday'] },
  { canonicalSlug: '55milano-sunday-latin-night', clubKey: '55', day: 'sunday', partyName: 'latin-night', shortAliases: ['latin-night', '55milano-sunday', '55milano-sunday-aperitivo-domenicale'] },
  { canonicalSlug: 'playclub-tuesday-esplicito', clubKey: 'play-club', day: 'tuesday', partyName: 'esplicito', shortAliases: ['esplicito', 'playclub-tuesday'] },
  { canonicalSlug: 'playclub-thursday-shakara', clubKey: 'play-club', day: 'thursday', partyName: 'shakara', shortAliases: ['shakara', 'playclub-thursday'] },
  { canonicalSlug: 'playclub-friday-flexx', clubKey: 'play-club', day: 'friday', partyName: 'flexx', shortAliases: ['flexx', 'playclub-friday'] },
  { canonicalSlug: 'playclub-saturday-golden-society', clubKey: 'play-club', day: 'saturday', partyName: 'golden-society', shortAliases: ['golden-society', 'playclub-saturday'] },
  { canonicalSlug: 'playclub-sunday-demontime', clubKey: 'play-club', day: 'sunday', partyName: 'demontime', shortAliases: ['demontime', 'playclub-sunday'] },
  { canonicalSlug: 'repvblic-monday-dirty-monday', clubKey: 'repvblic', day: 'monday', partyName: 'dirty-monday', shortAliases: ['dirty-monday', 'repvblic-monday'] },
  { canonicalSlug: 'repvblic-wednesday-home', clubKey: 'repvblic', day: 'wednesday', partyName: 'home', shortAliases: ['home', 'repvblic-wednesday'] },
  { canonicalSlug: 'repvblic-thursday-sbraake', clubKey: 'repvblic', day: 'thursday', partyName: 'sbraake', shortAliases: ['sbraake', 'repvblic-thursday'] },
  { canonicalSlug: 'repvblic-friday-dirty-monday-edition', clubKey: 'repvblic', day: 'friday', partyName: 'dirty-monday-edition', shortAliases: ['dirty-monday-edition', 'repvblic-friday'] },
  { canonicalSlug: 'repvblic-saturday-saturday-night', clubKey: 'repvblic', day: 'saturday', partyName: 'saturday-night', shortAliases: ['repvblic-saturday'] },
];

export const WEEKLY_EVENT_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const weeklyEventSlugToCanonical = new Map<string, string>();

for (const def of WEEKLY_EVENT_DEFS) {
  const canon = def.canonicalSlug;
  const map35 = build35SlugMap((locale, tk) => {
    const dayToken = WEEKDAY_TOKENS_35[locale]?.[def.day] || def.day;
    return `${def.clubKey}-${tk.milan}-${dayToken}-${def.partyName}-${tk.party}`;
  });
  WEEKLY_EVENT_SLUGS_35[canon] = map35;
  weeklyEventSlugToCanonical.set(canon, canon);
  weeklyEventSlugToCanonical.set(canon.toLowerCase(), canon);
  if (def.shortAliases) {
    for (const alias of def.shortAliases) {
      WEEKLY_EVENT_SLUGS_35[alias] = map35;
      weeklyEventSlugToCanonical.set(alias, canon);
      weeklyEventSlugToCanonical.set(alias.toLowerCase(), canon);
    }
  }
  for (const locSlug of Object.values(map35)) {
    weeklyEventSlugToCanonical.set(locSlug, canon);
  }
}

const HALLOWEEN_SLUGS_35: Record<LocaleCode, string> = {
  en: 'halloween-milan-2026', it: 'halloween-milano-2026', es: 'halloween-milan-2026', fr: 'halloween-milan-2026',
  de: 'halloween-mailand-2026', pt: 'halloween-milao-2026', nl: 'halloween-milaan-2026', ru: 'hellouin-milan-2026',
  tr: 'cadilar-bayrami-milano-2026', zh: 'milan-wanshengjie-paidui-2026', ar: 'halowin-milan-2026',
  bg: 'helouin-milano-2026', hr: 'noc-vjestica-milano-2026', cs: 'halloween-milan-2026', da: 'halloween-milano-2026',
  et: 'halloween-milano-2026', fi: 'halloween-milano-2026', el: 'halloween-milano-2026', hu: 'halloween-milano-2026',
  ga: 'halloween-milano-2026', lv: 'helovins-milana-2026', lt: 'helovinas-milanas-2026', mt: 'halloween-milan-2026',
  pl: 'halloween-mediolan-2026', ro: 'halloween-milano-2026', sk: 'halloween-milano-2026', sl: 'noc-carovnic-milano-2026',
  sv: 'halloween-milano-2026', no: 'halloween-milano-2026', is: 'hlekkjavaka-milano-2026', uk: 'hellovin-milan-2026',
  sq: 'halloween-milano-2026', sr: 'noc-vestica-milano-2026', bs: 'noc-vjestica-milano-2026', mk: 'nokj-na-vesticite-milano-2026',
};
const HALLOWEEN_SET = new Set<string>([
  'halloween-2026',
  ...Object.values(HALLOWEEN_SLUGS_35),
  ...Object.values(HALLOWEEN_NAVIGATION).map((v) => v.slug),
  ...ALL_35_LOCALES.map((loc) => `${SLUG_TOKENS_35[loc].halloween}-${SLUG_TOKENS_35[loc].milan}-2026`),
]);

const CAPODANNO_LEGACY_SET = new Set<string>([
  'capodanno-2027',
  'capodanno-milano-2027',
  ...ALL_35_LOCALES.map((loc) => `${SLUG_TOKENS_35[loc].newYearsEve}-${SLUG_TOKENS_35[loc].milan}-2027`),
]);

const CAPODANNO_VENUE_PREFIXES = [
  '55-milano', 'just-me-milano', 'tocqueville-13-milano', 'armani-prive-milano',
  'the-club-milano', 'hollywood-milano', 'pineta-milano', 'voya-club-milano',
  'aria-club-milano', 'rocca-brivio-sforza-milano', 'fabrique-milano',
  'magazzini-generali-milano', 'alcatraz-milano', 'gattopardo-milano',
  'the-grace-club-milano', 'twiga-milano',
];

const CAPODANNO_REVERSE_TO_EN: Record<string, { type: 'hub' } | { type: 'cat'; catId: string } | { type: 'venue'; venueSlug: string; catId: string }> = {};

for (const loc of ALL_35_LOCALES) {
  const nav = CAPODANNO_NAV_35[loc];
  if (!nav) continue;
  CAPODANNO_REVERSE_TO_EN[nav.slug] = { type: 'hub' };
  for (const [catId, catSlug] of Object.entries(nav.categories)) {
    CAPODANNO_REVERSE_TO_EN[catSlug] = { type: 'cat', catId };
    for (const vSlug of CAPODANNO_VENUE_PREFIXES) {
      const vKey = vSlug.replace(/-milano$/, '');
      const fullSlug = `${nav.nyePrefix}-${vKey}-${nav.citySlug}-2027-${catSlug}`;
      CAPODANNO_REVERSE_TO_EN[fullSlug] = { type: 'venue', venueSlug: vSlug, catId };
    }
  }
}

const mockEventSlugToMap = new Map<string, Partial<Record<LocaleCode, string>> & { en: string }>();

export function registerMockEventSlugs35(slugMap: Partial<Record<LocaleCode, string>> & { en: string }): void {
  for (const val of Object.values(slugMap)) {
    if (val) {
      mockEventSlugToMap.set(val, slugMap);
    }
  }
}

function stripDatedPartyPrefix(slug: string): string {
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (!tk) continue;
    const prefix = `${tk.party}-${tk.milan}-`;
    if (slug.startsWith(prefix)) {
      return slug.slice(prefix.length);
    }
  }
  return slug;
}

export function resolveEventSlugToCanonical(slug: string, targetLocale?: LocaleCode): string {
  const loc = targetLocale || 'en';
  if (HALLOWEEN_SET.has(slug)) {
    return HALLOWEEN_NAVIGATION[loc]?.slug || HALLOWEEN_NAVIGATION.en.slug;
  }
  if (CAPODANNO_LEGACY_SET.has(slug)) {
    return capodannoCategorySlug('capodanno-2027', loc);
  }
  const capCatId = resolveCapodannoCategoryIdByLocalizedSlug(slug, loc);
  if (capCatId) {
    return capodannoCategorySlug(capCatId, loc);
  }
  const capEvBase = resolveCapodannoEventBaseSlugByLocalizedSlug(slug, loc);
  if (capEvBase) {
    return capodannoEventSlug(capEvBase, loc);
  }
  const capLegacy = CAPODANNO_REVERSE_TO_EN[slug];
  if (capLegacy) {
    if (capLegacy.type === 'hub') return capodannoCategorySlug('capodanno-2027', loc);
    if (capLegacy.type === 'cat') return capodannoCategorySlug(capLegacy.catId, loc);
  }

  const batchProfile = getEventBatchProfile(slug);
  if (batchProfile) {
    if (targetLocale && batchProfile.siteLocales?.includes(targetLocale)) {
      return getEventBatchSlug(batchProfile, targetLocale);
    }
    return batchProfile.canonicalSlug;
  }

  const directWeekly = weeklyEventSlugToCanonical.get(slug) || weeklyEventSlugToCanonical.get(slug.toLowerCase());
  if (directWeekly) return directWeekly;

  const mockHit = mockEventSlugToMap.get(slug);
  if (mockHit) {
    return targetLocale ? (mockHit[targetLocale] || mockHit.en) : mockHit.en;
  }

  const stripped = stripDatedPartyPrefix(slug);
  if (stripped !== slug) {
    return weeklyEventSlugToCanonical.get(stripped) || stripped;
  }
  return slug;
}

export function getLocalizedEventSlug35(rawSlug: string, locale: LocaleCode): string {
  if (HALLOWEEN_SET.has(rawSlug)) {
    return HALLOWEEN_NAVIGATION[locale]?.slug || HALLOWEEN_NAVIGATION.en.slug;
  }
  if (CAPODANNO_LEGACY_SET.has(rawSlug)) {
    return capodannoCategorySlug('capodanno-2027', locale);
  }
  const capCatId = resolveCapodannoCategoryIdByLocalizedSlug(rawSlug, locale);
  if (capCatId) {
    return capodannoCategorySlug(capCatId, locale);
  }
  const capEvBase = resolveCapodannoEventBaseSlugByLocalizedSlug(rawSlug, locale);
  if (capEvBase) {
    return capodannoEventSlug(capEvBase, locale);
  }
  const capMatch = CAPODANNO_REVERSE_TO_EN[rawSlug];
  if (capMatch) {
    if (capMatch.type === 'hub') return capodannoCategorySlug('capodanno-2027', locale);
    if (capMatch.type === 'cat') return capodannoCategorySlug(capMatch.catId, locale);
    if (capMatch.type === 'venue') {
      const targetNav = CAPODANNO_NAV_35[locale] || CAPODANNO_NAV_35.en;
      const vKey = capMatch.venueSlug.replace(/-milano$/, '');
      const catSlug = targetNav.categories[capMatch.catId] || capMatch.catId;
      return `${targetNav.nyePrefix}-${vKey}-${targetNav.citySlug}-2027-${catSlug}`;
    }
  }

  const batchProfile = getEventBatchProfile(rawSlug);
  if (batchProfile) {
    if (!batchProfile.siteLocales || batchProfile.siteLocales.includes(locale)) {
      return getEventBatchSlug(batchProfile, locale);
    }
    return batchProfile.canonicalSlug;
  }

  const canonWeekly = weeklyEventSlugToCanonical.get(rawSlug) || weeklyEventSlugToCanonical.get(rawSlug.toLowerCase());
  if (canonWeekly && WEEKLY_EVENT_SLUGS_35[canonWeekly]?.[locale]) {
    return WEEKLY_EVENT_SLUGS_35[canonWeekly][locale];
  }

  const mockHit = mockEventSlugToMap.get(rawSlug);
  if (mockHit) {
    return mockHit[locale] || mockHit.en;
  }

  const canonEvent = stripDatedPartyPrefix(rawSlug);
  const canonWeeklyAfterStrip = weeklyEventSlugToCanonical.get(canonEvent);
  if (canonWeeklyAfterStrip && WEEKLY_EVENT_SLUGS_35[canonWeeklyAfterStrip]?.[locale]) {
    return WEEKLY_EVENT_SLUGS_35[canonWeeklyAfterStrip][locale];
  }
  if (/-(2026-(?:10|11|12)-\d{2}|2027-\d{2}-\d{2})$/.test(canonEvent)) {
    if (locale === 'en') return canonEvent;
    const tk = SLUG_TOKENS_35[locale] || SLUG_TOKENS_35.en;
    const prefix = `${tk.party}-${tk.milan}-`;
    return canonEvent.startsWith(prefix) ? canonEvent : `${prefix}${canonEvent}`;
  }
  return canonEvent;
}

// ─── 6. SEO HUB PAGES SLUGS (All Static SEO Pages Across All 35 Languages) ───
const SEO_HUB_SPECS: Array<{
  canonicalPath: string;
  itPath: string;
  build: (tk: SlugLangTokens, dt: DirAndSubTokens) => string;
  legacyBuild?: (tk: SlugLangTokens) => string;
  aliases?: string[];
}> = [
  { canonicalPath: '/vip-tables', itPath: '/tavoli-vip-milano', build: (tk) => `/${tk.vipTables}-${tk.milan}` },
  { canonicalPath: '/private-parties', itPath: '/feste-private-laurea-compleanno-milano', build: (tk) => `/${tk.graduation}-${tk.birthday}-${tk.milan}` },
  { canonicalPath: '/football-afterparties', itPath: '/dopo-partita-calcio-san-siro-milano', build: (tk) => `/san-siro-${tk.afterparty}-${tk.milan}` },
  {
    canonicalPath: '/concert-afterparties',
    itPath: '/dopo-concerto-san-siro-milano',
    build: (tk, dt) => `/${dt.concerts}-${tk.afterparty}-${tk.milan}`,
    legacyBuild: (tk) => `/concerts-${tk.afterparty}-${tk.milan}`,
    aliases: ['/san-siro-concerts'],
  },
  { canonicalPath: '/new-years-eve', itPath: '/capodanno-milano-discoteche', build: (tk) => `/${tk.newYearsEve}-${tk.milan}` },
  { canonicalPath: '/fashion-week', itPath: '/settimana-della-moda-milano', build: (tk) => `/${tk.fashionWeek}-${tk.milan}`, aliases: ['/design-week', '/formula-1-monza'] },
  { canonicalPath: '/milan-fashion-week', itPath: '/milano-fashion-week-eventi', build: (tk) => `/${tk.milan}-${tk.fashionWeek}-${tk.party}` },
  {
    canonicalPath: '/milan-fashion-week/calendar',
    itPath: '/milano-fashion-week/calendario',
    build: (tk, dt) => `/${tk.milan}-${tk.fashionWeek}/${dt.calendarSub}`,
    legacyBuild: (tk) => `/${tk.milan}-${tk.fashionWeek}/calendar`,
  },
  { canonicalPath: '/rooftops', itPath: '/rooftop-terrazze-panoramiche-milano', build: (tk) => `/${tk.rooftop}-${tk.milan}`, aliases: ['/rooftop-bars'] },
  { canonicalPath: '/bottle-prices', itPath: '/listino-prezzi-bottiglie-tavoli-vip', build: (tk) => `/${tk.prices}-${tk.vipTables}-${tk.milan}` },
  { canonicalPath: '/door-policy', itPath: '/selezione-ingresso-dress-code-milano', build: (tk) => `/${tk.dressCode}-${tk.club}-${tk.milan}` },
  {
    canonicalPath: '/guest-lists',
    itPath: '/liste-ingresso-discoteche-milano',
    build: (tk, dt) => `/${dt.guestlist}-${tk.club}-${tk.milan}`,
    legacyBuild: (tk) => `/guestlist-${tk.club}-${tk.milan}`,
  },
  { canonicalPath: '/aperitivo', itPath: '/aperitivo-cena-cantata-milano', build: (tk) => `/${tk.dinnerShow}-${tk.milan}` },
  { canonicalPath: '/clubs', itPath: '/discoteche-locali-milano', build: (tk) => `/${tk.club}-${tk.milan}` },
  { canonicalPath: '/guides', itPath: '/guide-vita-notturna-milano', build: (tk) => `/${tk.guide}-${tk.nightlife}-${tk.milan}` },
  { canonicalPath: '/zones', itPath: '/quartieri-vita-notturna-milano', build: (tk) => `/${tk.zone}-${tk.nightlife}-${tk.milan}` },
  { canonicalPath: '/genres', itPath: '/generi-musicali-discoteche-milano', build: (tk) => `/${tk.music}-${tk.milan}` },
  { canonicalPath: '/events', itPath: '/eventi-serate-milano', build: (tk) => `/${tk.party}-${tk.nightlife}-${tk.milan}` },
  {
    canonicalPath: '/events/tonight',
    itPath: '/eventi/stasera-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.tonight}-${tk.milan}-${tk.party}`,
    legacyBuild: (tk) => `/events/tonight-${tk.milan}-${tk.party}`,
  },
  {
    canonicalPath: '/events/this-week',
    itPath: '/eventi/questa-settimana-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.thisWeek}-${tk.milan}-${tk.party}`,
    legacyBuild: (tk) => `/events/this-week-${tk.milan}-${tk.party}`,
  },
  {
    canonicalPath: '/events/special',
    itPath: '/eventi/eventi-speciali-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.special}-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/special-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/events/best',
    itPath: '/eventi/migliori-serate-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.best}-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/best-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/events/past',
    itPath: '/eventi/archivio-serate-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.archive}-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/archive-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/events/october-2026',
    itPath: '/eventi/calendario-2026-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.calendarSub}-2026-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/2026-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/events/18-plus',
    itPath: '/eventi/serate-18-anni-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.age18}-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/18-plus-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/events/21-plus',
    itPath: '/eventi/serate-21-anni-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.age21}-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/21-plus-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/events/international',
    itPath: '/eventi/serate-internazionali-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.international}-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/international-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/events/university-erasmus',
    itPath: '/eventi/serate-universitarie-erasmus-milano',
    build: (tk, dt) => `/${dt.eventsDir}/${dt.university}-${tk.party}-${tk.milan}`,
    legacyBuild: (tk) => `/events/erasmus-university-${tk.party}-${tk.milan}`,
  },
  {
    canonicalPath: '/calendar/tonight',
    itPath: '/calendario/stasera-milano',
    build: (tk, dt) => `/${dt.calendarDir}/${dt.tonight}-${tk.milan}-${tk.party}`,
    legacyBuild: (tk) => `/calendar/tonight-${tk.milan}-${tk.party}`,
  },
  {
    canonicalPath: '/calendar/this-week',
    itPath: '/calendario/questa-settimana-milano',
    build: (tk, dt) => `/${dt.calendarDir}/${dt.thisWeek}-${tk.milan}-${tk.party}`,
    legacyBuild: (tk) => `/calendar/this-week-${tk.milan}-${tk.party}`,
  },
  {
    canonicalPath: '/concierge',
    itPath: '/concierge-vip-milano',
    build: (tk, dt) => `/${dt.concierge}-${tk.vipTables}-${tk.milan}`,
    legacyBuild: (tk) => `/concierge-${tk.vipTables}-${tk.milan}`,
    aliases: ['/contact', '/booking', '/about'],
  },
  {
    canonicalPath: '/booking/success',
    itPath: '/prenotazione/confermata-milano',
    build: (tk, dt) => `/${dt.bookingDir}/${dt.confirmed}-${tk.vipTables}-${tk.milan}`,
    legacyBuild: (tk) => `/booking/confirmed-${tk.vipTables}-${tk.milan}`,
  },
  {
    canonicalPath: '/faq',
    itPath: '/domande-frequenti-discoteche-milano',
    build: (tk, dt) => `/${dt.faq}-${tk.nightlife}-${tk.milan}`,
    legacyBuild: (tk) => `/faq-${tk.nightlife}-${tk.milan}`,
  },
  {
    canonicalPath: '/privacy',
    itPath: '/privacy-vita-notturna-milano',
    build: (tk, dt) => `/${dt.privacy}-${tk.nightlife}-${tk.milan}`,
    legacyBuild: (tk) => `/privacy-${tk.nightlife}-${tk.milan}`,
  },
  {
    canonicalPath: '/terms',
    itPath: '/termini-servizio-milano',
    build: (tk, dt) => `/${dt.terms}-${tk.nightlife}-${tk.milan}`,
    legacyBuild: (tk) => `/terms-${tk.nightlife}-${tk.milan}`,
  },
  { canonicalPath: '/seo-landing', itPath: '/guida-completa-vita-notturna-milano', build: (tk) => `/${tk.guide}-${tk.vipTables}-${tk.nightlife}-${tk.milan}` },
];

export const SEO_HUB_PATHS_35: Record<string, Record<LocaleCode, string>> = {};
const localizedSeoPathToCanonical = new Map<string, string>();

for (const spec of SEO_HUB_SPECS) {
  const map = {} as Record<LocaleCode, string>;
  for (const locale of ALL_35_LOCALES) {
    if (locale === 'en') {
      map[locale] = spec.canonicalPath;
    } else if (locale === 'it') {
      map[locale] = spec.itPath;
    } else {
      const raw = spec.build(SLUG_TOKENS_35[locale], DIR_AND_SUB_TOKENS_35[locale]);
      const parts = raw.split('/').filter(Boolean).map(sanitizeAsciiSlug);
      map[locale] = '/' + parts.join('/');
      if (spec.legacyBuild) {
        const legacyRaw = spec.legacyBuild(SLUG_TOKENS_35[locale]);
        const legacyParts = legacyRaw.split('/').filter(Boolean).map(sanitizeAsciiSlug);
        localizedSeoPathToCanonical.set('/' + legacyParts.join('/'), spec.canonicalPath);
      }
    }
    localizedSeoPathToCanonical.set(map[locale], spec.canonicalPath);
  }
  SEO_HUB_PATHS_35[spec.canonicalPath] = map;
  localizedSeoPathToCanonical.set(spec.canonicalPath, spec.canonicalPath);
  if (spec.aliases) {
    for (const alias of spec.aliases) {
      SEO_HUB_PATHS_35[alias] = map;
      localizedSeoPathToCanonical.set(alias, spec.canonicalPath);
    }
  }
}

export function getLocalizedSeoPagePath35(canonicalPath: string, locale: LocaleCode): string {
  const norm = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  if (norm === '/events/halloween-2026') {
    return `/${getLocalizedDir35('events', locale)}/${getLocalizedEventSlug35('halloween-2026', locale)}`;
  }
  if (norm === '/events/capodanno-2027') {
    return `/${getLocalizedDir35('events', locale)}/${getLocalizedEventSlug35('capodanno-2027', locale)}`;
  }
  return SEO_HUB_PATHS_35[norm]?.[locale] || norm;
}

const RESERVED_EVENT_SUBPATHS = new Set([
  'tonight', 'this-week', 'special', 'best', 'past', 'october-2026',
  '18-plus', '21-plus', 'international', 'university-erasmus',
]);

function resolveParentDirSegment(seg: string): string {
  return resolveLocalizedDirToCanonical(seg) || localizedSeoPathToCanonical.get(`/${seg}`) || `/${seg}`;
}

export function resolveSeoHubPathToCanonical(pathWithoutLocale: string, locale?: LocaleCode): string | undefined {
  const norm = (pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`).replace(/\/$/, '') || '/';
  if (localizedSeoPathToCanonical.has(norm)) {
    return localizedSeoPathToCanonical.get(norm);
  }
  const segments = norm.split('/').filter(Boolean);
  if (segments.length === 2) {
    const parentCanonical = resolveParentDirSegment(segments[0]);
    const itemSlug = segments[1];
    if (parentCanonical === '/clubs') {
      return `/clubs/${resolveVenueSlug(itemSlug)}`;
    }
    if (parentCanonical === '/zones') {
      return `/zones/${resolveZoneSlug(itemSlug)}`;
    }
    if (parentCanonical === '/genres') {
      return `/genres/${resolveGenreSlug(itemSlug)}`;
    }
    if (parentCanonical === '/guides') {
      const gid = resolveExistingGuideId(itemSlug);
      const targetGuideSlug = gid ? getExistingGuideSlug35(gid, 'en') : itemSlug;
      return `/guides/${targetGuideSlug}`;
    }
    if (parentCanonical === '/events' && !RESERVED_EVENT_SUBPATHS.has(itemSlug)) {
      return `/events/${resolveEventSlugToCanonical(itemSlug, locale)}`;
    }
    if (parentCanonical === '/new-years-eve') {
      const targetLocale = locale || 'en';
      return `/events/${getLocalizedEventSlug35(itemSlug, targetLocale)}`;
    }
    if (parentCanonical === '/calendar' && (itemSlug === 'tonight' || itemSlug === 'this-week')) {
      return `/calendar/${itemSlug}`;
    }
    if (parentCanonical === '/booking' && itemSlug === 'success') {
      return '/booking/success';
    }
  }
  return undefined;
}

export function localizeInternalHref(rawHref: string, fallbackLocale: LocaleCode = 'en'): string {
  if (!rawHref || typeof rawHref !== 'string') return rawHref;
  if (
    rawHref.startsWith('http://') ||
    rawHref.startsWith('https://') ||
    rawHref.startsWith('mailto:') ||
    rawHref.startsWith('tel:') ||
    rawHref.startsWith('whatsapp:') ||
    rawHref.startsWith('#')
  ) {
    return rawHref;
  }

  let pathname = rawHref;
  let suffix = '';
  const hashIdx = pathname.indexOf('#');
  if (hashIdx !== -1) {
    suffix = pathname.slice(hashIdx);
    pathname = pathname.slice(0, hashIdx);
  }
  const queryIdx = pathname.indexOf('?');
  if (queryIdx !== -1) {
    suffix = pathname.slice(queryIdx) + suffix;
    pathname = pathname.slice(0, queryIdx);
  }

  if (!pathname.startsWith('/')) return rawHref;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return fallbackLocale === 'en' ? `/${suffix}` : `/${fallbackLocale}${suffix}`;
  }

  let locale: LocaleCode = fallbackLocale;
  let restSegments = segments;
  if ((ALL_35_LOCALES as readonly string[]).includes(segments[0])) {
    locale = segments[0] as LocaleCode;
    restSegments = segments.slice(1);
  }

  const lp = locale === 'en' ? '' : `/${locale}`;

  if (restSegments.length === 0) {
    return (lp || '/') + suffix;
  }

  const restPath = '/' + restSegments.join('/');

  // 1. Static hub path (canonical or already localized in any locale)
  const canonicalHub = localizedSeoPathToCanonical.get(restPath);
  if (canonicalHub) {
    const locHub = getLocalizedSeoPagePath35(canonicalHub, locale);
    return `${lp}${locHub}${suffix}`;
  }

  // 2. Dynamic 2-segment routes (/clubs/<slug>, /zones/<slug>, /genres/<slug>, /guides/<slug>, /events/<slug>, /new-years-eve/<slug>, /calendar/<subpath>, /booking/<subpath>)
  if (restSegments.length === 2) {
    const parentCanonical = resolveParentDirSegment(restSegments[0]);
    const rawItemSlug = restSegments[1];

    if (parentCanonical === '/clubs') {
      const locVenue = getLocalizedVenueSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('clubs', locale)}/${locVenue}${suffix}`;
    }
    if (parentCanonical === '/zones') {
      const locZone = getLocalizedZoneSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('zones', locale)}/${locZone}${suffix}`;
    }
    if (parentCanonical === '/genres') {
      const locGenre = getLocalizedGenreSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('genres', locale)}/${locGenre}${suffix}`;
    }
    if (parentCanonical === '/guides') {
      const locGuide = getExistingGuideSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('guides', locale)}/${locGuide}${suffix}`;
    }
    if (parentCanonical === '/events') {
      if (RESERVED_EVENT_SUBPATHS.has(rawItemSlug)) {
        const locHub = getLocalizedSeoPagePath35(`/events/${rawItemSlug}`, locale);
        return `${lp}${locHub}${suffix}`;
      }
      const locEvent = getLocalizedEventSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('events', locale)}/${locEvent}${suffix}`;
    }
    if (parentCanonical === '/new-years-eve') {
      const locEvent = getLocalizedEventSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('events', locale)}/${locEvent}${suffix}`;
    }
    if (parentCanonical === '/calendar' && (rawItemSlug === 'tonight' || rawItemSlug === 'this-week')) {
      const locHub = getLocalizedSeoPagePath35(`/calendar/${rawItemSlug}`, locale);
      return `${lp}${locHub}${suffix}`;
    }
    if (parentCanonical === '/booking' && rawItemSlug === 'success') {
      const locHub = getLocalizedSeoPagePath35('/booking/success', locale);
      return `${lp}${locHub}${suffix}`;
    }
  }

  return `${lp}${restPath}${suffix}`;
}
