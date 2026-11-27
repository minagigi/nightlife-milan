import type { LocaleCode } from './localeRegistry';
import { GUIDE_100_SLUGS_MAP, CAPODANNO_NAV_35 } from './guideSlugs100Map';
import { LEGACY_HYBRID_GUIDE_SLUGS_TO_ID } from './legacyHybridGuideSlugs';
import {
  DIR_AND_SUB_TOKENS_35,
  getLocalizedDir35,
  resolveLocalizedDirToCanonical,
  type DirAndSubTokens,
} from './dirTokens35';
import { HALLOWEEN_NAVIGATION } from '@/lib/halloween/navigation';
import { halloweenPath } from '@/lib/halloween/routes';
import { christmasVoyaSlug, resolveChristmasVoyaSlug } from '@/lib/christmas/voya35';
import { orthodoxNyeJustMeSlug, resolveOrthodoxNyeJustMeSlug } from '@/lib/orthodox-nye/justme35';
import { thanksgivingJustMeSlug, resolveThanksgivingJustMeSlug } from '@/lib/thanksgiving/justme35';
import { partenopeaJustMeSlug, resolvePartenopeaJustMeSlug } from '@/lib/partenopea/justme35';
import { bergamoBresciaNightSlug, resolveBergamoBresciaNightId } from '@/lib/bergamo-brescia/activeNights35';
import { justSingingRainSlug, resolveJustSingingRainSlug } from '@/lib/just-singing-rain/justme35';
import {
  CAPODANNO_CATEGORY_IDS,
  CAPODANNO_EVENT_BASE_SLUGS,
  CAPODANNO_NAVIGATION,
  capodannoCategoryPath,
  capodannoCategorySlug,
  capodannoEventPath,
  capodannoEventSlug,
  resolveCapodannoCategoryIdByLocalizedSlug,
  resolveCapodannoEventBaseSlugByLocalizedSlug,
} from '@/lib/capodanno/routes';
import { getEventBatchProfile, getEventBatchSlug } from '@/lib/eventBatchProfiles';
import { UNIVERSITY_PARTY_CANONICAL_SLUG } from '@/lib/universityPartyPt';
import routeSlugsJson from '@/lib/october-events/routeSlugs.json';

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
  customSlugBuilder?: (locale: LocaleCode, tk: SlugLangTokens) => string;
}> = [
  { canonicalSlug: 'just-me-milano', id: 'v-justme', brandSlug: 'just-me', aliases: ['just-me', 'justme', 'just-me-milan', 'justme-milano', 'just-cavalli', 'just-cavalli-milano'] },
  { canonicalSlug: 'pineta-club-milano', id: 'v-pineta', brandSlug: 'pineta-club', aliases: ['pineta', 'pineta-milano', 'pineta-corso-como'] },
  { canonicalSlug: 'aria-club-milano', id: 'v-aria', brandSlug: 'aria-club', aliases: ['aria', 'aria-milano', 'aria-san-siro'] },
  { canonicalSlug: 'voya-rooftop-milan', id: 'v-voya', brandSlug: 'voya-rooftop', aliases: ['voya', 'voja', 'voja-milano', 'voya-milano', 'voya-rooftop', 'voya-rooftop-milano', 'voya-club-milano'] },
  { canonicalSlug: '55-milano', id: 'v-55milano', brandSlug: '55', aliases: ['55', 'fiftyfive', 'fifty-five', 'fiftyfive-milano', 'fiftysix-milano', 'cinquantacinque-milano'] },
  { canonicalSlug: 'repvblic-milano', id: 'v-repvblic', brandSlug: 'repvblic', aliases: ['repvblic', 'republic', 'republic-milano'] },
  { canonicalSlug: 'tocqueville-13-milano', id: 'v-tocqueville', brandSlug: 'tocqueville-13', aliases: ['tocqueville-13', 'tocqueville'] },
  { canonicalSlug: 'armani-prive-milano', id: 'v-armani-prive', brandSlug: 'armani-prive', aliases: ['armani-prive'] },
  { canonicalSlug: 'volt-club-milano', id: 'v-volt', brandSlug: 'volt-club', aliases: ['volt', 'volt-milano'] },
  { canonicalSlug: 'alcatraz-milano', id: 'v-alcatraz', brandSlug: 'alcatraz', aliases: ['alcatraz'] },
  { canonicalSlug: 'fabrique-milano', id: 'v-fabrique', brandSlug: 'fabrique', aliases: ['fabrique'] },
  { canonicalSlug: 'amnesia-milano', id: 'v-amnesia', brandSlug: 'amnesia', aliases: ['amnesia'] },
  { canonicalSlug: 'hollywood-club-milano', id: 'v-hollywood', brandSlug: 'hollywood-club', aliases: ['hollywood', 'hollywood-milano', 'hollywood-rythmoteque'] },
  { canonicalSlug: 'the-club-milano', id: 'v-theclub', brandSlug: 'the-club', aliases: ['the-club', 'theclub', 'theclub-milano'] },
  { canonicalSlug: '11-clubroom', id: 'v-11clubroom', brandSlug: '11-clubroom', aliases: ['11clubroom', '11-clubroom-milano', 'eleven-clubroom', '11clubroom-milano'] },
  { canonicalSlug: 'gattopardo-milano', id: 'v-gattopardo', brandSlug: 'gattopardo', aliases: ['gattopardo', 'il-gattopardo', 'il-gattopardo-milano', 'il-gattopardo-milan'] },
  { canonicalSlug: 'mib-milano', id: 'v-mibmilano', brandSlug: 'mib', aliases: ['mib', 'mib-piazza-affari'] },
  { canonicalSlug: 'dazi-milano', id: 'v-dazi', brandSlug: 'dazi', aliases: ['dazi', 'dazi-milan', 'dazi-arco-della-pace'] },
  { canonicalSlug: 'terrazza-21', id: 'v-terrazza21', brandSlug: 'terrazza-duomo-21', aliases: ['terrazza-duomo-21', 'terrazza-duomo-21-milano', 'duomo-21', 'duomo-21-milano'] },
  { canonicalSlug: 'ceresio-7-milano', id: 'v-ceresio-7', brandSlug: 'ceresio-7', aliases: ['ceresio-7'] },
  { canonicalSlug: 'apollo-club-milano', id: 'v-apollo', brandSlug: 'apollo-club', aliases: ['apollo', 'apollo-milano'] },
  { canonicalSlug: 'magazzini-generali-milano', id: 'v-magazzini', brandSlug: 'magazzini-generali', aliases: ['magazzini-generali', 'magazzini'] },
  { canonicalSlug: 'church-81', id: 'v-church81', brandSlug: 'church-81', aliases: ['church-81-milano'] },
  { canonicalSlug: 'loolapaloosa-milano', id: 'v-loolapaloosa', brandSlug: 'loolapaloosa', aliases: ['loolapaloosa', 'loolapaloosa-corso-como'] },
  { canonicalSlug: 'bobino-milano', id: 'v-bobino', brandSlug: 'bobino', aliases: ['bobino', 'bobino-club', 'bobino-club-milano', 'bobino-navigli'] },
  { canonicalSlug: 'dock-22-milano', id: 'v-dock22', brandSlug: 'dock-22', aliases: ['dock22', 'dock-22', 'dock22-milano', 'dock-22-milan'] },
  // Extra active venues in catalog (backed 1:1 by mockVenues)
  { canonicalSlug: 'play-club-milano', id: 'v-playclub', brandSlug: 'play-club', aliases: ['play-club'] },
  { canonicalSlug: 'radio-rooftop-bar-milano', id: 'v-radio-rooftop-bar-milano', brandSlug: 'radio-rooftop-bar', aliases: ['radio-rooftop'] },
  { canonicalSlug: 'the-roof-milano', id: 'v-the-roof-milano', brandSlug: 'the-roof', aliases: ['the-roof'] },
  { canonicalSlug: 'terrazza-aperol-milano', id: 'v-terrazza-aperol-milano', brandSlug: 'terrazza-aperol', aliases: ['terrazza-aperol'] },
  { canonicalSlug: 'terrazza-gallia-milano', id: 'v-terrazza-gallia-milano', brandSlug: 'terrazza-gallia', aliases: ['terrazza-gallia'] },
  { canonicalSlug: 'ristorante-torre-milano', id: 'v-ristorante-torre-milano', brandSlug: 'ristorante-torre', aliases: ['ristorante-torre'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale', id: 'v-innocenti-evasioni-terrazza-triennale', brandSlug: 'terrazza-triennale', aliases: ['terrazza-triennale'] },
  { canonicalSlug: 'super-club-milano', id: 'v-super-club-milano', brandSlug: 'super-club', aliases: ['super-club', 'superclub', 'superclub-milano', 'superclub-milano-tortona'] },
  { canonicalSlug: 'philipps-milano', id: 'v-philipps', brandSlug: 'philipps-plein', aliases: ['philipps', 'philipps-club', 'philipps-club-milano', 'philipp-plein', 'philipp-plein-milano', 'the-plein-hotel-milano'] },
  // 6 Unlocked Official Partner Venues (total = 41 active venues)
  { canonicalSlug: 'carlsberg-ol-milano', id: 'v-carlsbergol', brandSlug: 'carlsberg-ol', aliases: ['carlsberg-ol', 'carlsberg', 'carlsberg-milano', 'carlsberg-ol-porta-nuova'] },
  { canonicalSlug: 'tom-the-ordinary-market-milano', id: 'v-tom', brandSlug: 'tom-the-ordinary-market', aliases: ['tom', 'tom-milano', 'the-ordinary-market', 'the-ordinary-market-milano', 'ordinary-market-milano'] },
  { canonicalSlug: 'bischeri-milano', id: 'v-bischeri', brandSlug: 'bischeri', aliases: ['bischeri', 'i-bischeri', 'i-bischeri-milano', 'bischeri-navigli', 'i-bischeri-darsena'] },
  { canonicalSlug: 'gate-milano', id: 'v-gate', brandSlug: 'gate', aliases: ['gate', 'gate-club', 'gate-milan', 'gate-club-milano'] },
  { canonicalSlug: 'pelledoca-milano', id: 'v-pelledoca', brandSlug: 'pelledoca', aliases: ['pelledoca', 'pelledoca-music-and-food', 'pelledoca-forlanini', 'pelledoca-idroscalo'] },
  {
    canonicalSlug: 'justme-garda-lake',
    id: 'v-justme-garda',
    brandSlug: 'justme-garda-lake',
    customSlugBuilder: (locale, tk) => {
      if (locale === 'en') return 'justme-garda-lake';
      if (locale === 'it') return 'justme-garda-lake-lago-di-garda-tavoli-vip';
      return `justme-garda-lake-${tk.vipTables}`;
    },
    aliases: ['justme-garda', 'just-me-garda', 'just-me-garda-lake', 'justme-lonato', 'justme-desenzano', 'just-me-lago-di-garda', 'justme-lago-di-garda'],
  },
  // 6 Bergamo & Brescia Flagship Clubs
  {
    canonicalSlug: 'setai-club-bergamo',
    id: 'v-setai-bergamo',
    brandSlug: 'setai-club-bergamo',
    customSlugBuilder: (locale, tk) => {
      if (locale === 'en') return 'setai-club-bergamo';
      if (locale === 'it') return 'setai-club-bergamo-tavoli-vip';
      return `setai-club-bergamo-${tk.vipTables}`;
    },
    aliases: ['setai', 'setai-bergamo', 'setai-orio', 'setai-orio-al-serio', 'juice-setai-bergamo'],
  },
  {
    canonicalSlug: 'capogiro-curno-bergamo',
    id: 'v-capogiro-bergamo',
    brandSlug: 'capogiro-curno-bergamo',
    customSlugBuilder: (locale, tk) => {
      if (locale === 'en') return 'capogiro-curno-bergamo';
      if (locale === 'it') return 'capogiro-curno-bergamo-tavoli-vip';
      return `capogiro-curno-bergamo-${tk.vipTables}`;
    },
    aliases: ['capogiro', 'capogiro-bergamo', 'capogiro-curno', 'capogiro-joyclub', 'capogiro-joyclub-bergamo'],
  },
  {
    canonicalSlug: 'tiky-klub-seriate-bergamo',
    id: 'v-tiky-klub-bergamo',
    brandSlug: 'tiky-klub-seriate-bergamo',
    customSlugBuilder: (locale, tk) => {
      if (locale === 'en') return 'tiky-klub-seriate-bergamo';
      if (locale === 'it') return 'tiky-klub-seriate-bergamo-tavoli-vip';
      return `tiky-klub-seriate-bergamo-${tk.vipTables}`;
    },
    aliases: ['tiky', 'tiky-klub', 'tiky-klub-bergamo', 'tiky-seriate', 'tiky-club-bergamo'],
  },
  {
    canonicalSlug: 'zero-club-bergamo',
    id: 'v-zero-club-bergamo',
    brandSlug: 'zero-club-bergamo',
    customSlugBuilder: (locale, tk) => {
      if (locale === 'en') return 'zero-club-bergamo';
      if (locale === 'it') return 'zero-club-bergamo-tavoli-vip';
      return `zero-club-bergamo-${tk.vipTables}`;
    },
    aliases: ['zero-club', 'zeroclub', 'zeroclub-bergamo', 'zero-bergamo'],
  },
  {
    canonicalSlug: 'qi-clubbing-erbusco-brescia',
    id: 'v-qi-clubbing-brescia',
    brandSlug: 'qi-clubbing-erbusco-brescia',
    customSlugBuilder: (locale, tk) => {
      if (locale === 'en') return 'qi-clubbing-erbusco-brescia';
      if (locale === 'it') return 'qi-clubbing-erbusco-brescia-tavoli-vip';
      return `qi-clubbing-erbusco-brescia-${tk.vipTables}`;
    },
    aliases: ['qi-clubbing', 'qiclubbing', 'qi-clubbing-brescia', 'qi-clubbing-franciacorta', 'qi-erbusco'],
  },
  {
    canonicalSlug: 'number-one-corte-franca-brescia',
    id: 'v-number-one-brescia',
    brandSlug: 'number-one-corte-franca-brescia',
    customSlugBuilder: (locale, tk) => {
      if (locale === 'en') return 'number-one-corte-franca-brescia';
      if (locale === 'it') return 'number-one-corte-franca-brescia-tavoli-vip';
      return `number-one-corte-franca-brescia-${tk.vipTables}`;
    },
    aliases: ['number-one', 'numberone', 'number-one-brescia', 'number-one-franciacorta', 'number-one-corte-franca', 'number-one-disco'],
  },
];

export const VENUE_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const venueSlugToCanonical = new Map<string, string>();

for (const v of CANONICAL_VENUE_BASES) {
  const map35 = build35SlugMap((locale, tk) => {
    if (v.customSlugBuilder) return v.customSlugBuilder(locale, tk);
    if (locale === 'en') return v.canonicalSlug;
    return `${v.brandSlug}-${tk.milan}-${tk.vipTables}`;
  });
  VENUE_SLUGS_35[v.canonicalSlug] = map35;
  VENUE_SLUGS_35[v.id] = map35;
  venueSlugToCanonical.set(v.canonicalSlug, v.canonicalSlug);
  venueSlugToCanonical.set(v.id, v.canonicalSlug);
  venueSlugToCanonical.set(v.brandSlug, v.canonicalSlug);
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

const VENUE_SUFFIXES: readonly string[] = (() => {
  const s = new Set<string>();
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (!tk) continue;
    s.add(`-${tk.milan}-${tk.vipTables}`);
    s.add(`-${tk.vipTables}`);
    s.add(`-${tk.milan}`);
  }
  s.add('-lago-di-garda-tavoli-vip');
  s.add('-lago-di-garda');
  s.add('-lake-garda');
  s.add('-curno-bergamo-tavoli-vip');
  s.add('-seriate-bergamo-tavoli-vip');
  s.add('-erbusco-brescia-tavoli-vip');
  s.add('-corte-franca-brescia-tavoli-vip');
  s.add('-bergamo-tavoli-vip');
  s.add('-brescia-tavoli-vip');
  s.add('-curno-bergamo');
  s.add('-seriate-bergamo');
  s.add('-erbusco-brescia');
  s.add('-corte-franca-brescia');
  s.add('-franciacorta');
  s.add('-bergamo');
  s.add('-brescia');
  s.add('-milano');
  s.add('-milan');
  return [...s].sort((a, b) => b.length - a.length);
})();

const LEGACY_UNLISTED_CLUB_SET: ReadonlySet<string> = new Set([
  // Removed catalog entries + brandSlugs + historical aliases (excluding active 41 venues)
  'old-fashion', 'old-fashion-milano', 'old-fashion-milan', 'old-fashion-triennale',
  'grace-club', 'grace-milano', 'grace-club-milano', 'grace-club-milan', 'the-grace-club', 'the-grace-club-milano',
  'the-beach', 'the-beach-milano', 'the-beach-milan', 'the-beach-club', 'the-beach-club-milano',
  'lime', 'lime-club', 'lime-milano', 'lime-milan', 'lime-club-milano',
  'the-sanctuary', 'the-sanctuary-milano', 'the-sanctuary-milan', 'sanctuary', 'sanctuary-milano', 'sanctuary-eco-retreat',
  'apophis', 'apophis-club', 'apophis-milano', 'apophis-milan', 'apophis-club-milano',
  'tunnel', 'tunnel-club', 'tunnel-milano', 'tunnel-milan', 'tunnel-club-milano',
  'plastic', 'plastic-club', 'plastic-milano', 'plastic-milan', 'plastic-club-milano',
  'nepentha', 'nepentha-club', 'nepentha-milano', 'nepentha-milan',
  'twiga', 'twiga-club', 'twiga-milano', 'twiga-milan',
  'vibe-room', 'vibe-room-milano', 'vibe-room-milan', 'viberoom', 'viberoom-milano',
  'hotel-costez', 'hotel-costez-milano', 'costez', 'costez-milano',
  'cost', 'cost-milano', 'cost-milan', 'cost-22', 'cost-22-milano', 'cost-dining-club', 'cost-dining-club-milano',
  'rocca-brivio', 'rocca-brivio-sforza', 'rocca-brivio-sforza-milano',
  'social-music-city', 'social-music-city-milano',
  // Historical GSC Milan & Lombardy clubs without standalone venue detail pages
  'shillings', 'shillings-milano', 'shillings-club', 'shillings-club-milano',
  'duro', 'duro-club', 'duro-milano', 'duro-club-milano',
  'encanto', 'encanto-club', 'encanto-club-latino', 'encanto-club-latino-milano', 'encanto-milano',
  'live-club', 'live-club-trezzo', 'live-club-trezzo-milano', 'live-music-club-trezzo',
  'noir-club', 'noir-club-lissone', 'noir-lissone', 'noir-club-monza',
  'rock-n-roll', 'rock-n-roll-milano', 'rocknroll-milano',
  'legend-club', 'legend-club-milano',
  'biko', 'biko-club', 'biko-milano',
  'santeria', 'santeria-toscana-31', 'santeria-paladini-8', 'santeria-milano',
  'nidaba', 'nidaba-theatre', 'nidaba-theatre-milano',
  'la-cripta', 'la-cripta-club', 'la-cripta-club-milano',
  'black-hole', 'black-hole-milano', 'blackhole-milano',
  'kozel-carroponte', 'carroponte', 'carroponte-sesto-san-giovanni', 'carroponte-milano',
  'molto-club', 'molto-carate-brianza', 'molto-club-milano',
  'zoo-club', 'zoo-club-cinisello', 'zoo-club-milano',
  'circolo-magnolia', 'magnolia-milano', 'circolo-magnolia-idroscalo',
  'blue-note', 'blue-note-milano',
  'movie-club', 'movie-club-desio', 'movie-club-milano',
  'arci-bellezza', 'arci-bellezza-milano',
  'oneway', 'oneway-sesto', 'oneway-club', 'oneway-club-milano',
  'sali-milano', 'sali-e-tabacchi-milano',
  'balera-dell-ortica', 'balera-ortica-milano',
  'mood-live', 'mood-live-milano',
  'spirit-de-milan', 'spirit-de-milan-milano',
  'department-184', 'department-184-milano',
  'ahynama', 'ahynama-club', 'ahynama-club-latino', 'ahynama-club-latino-milano',
  'ciq', 'ciq-milano', 'ciq-milano-corvetto',
  'the-dome', 'the-dome-milano',
  'tambourine', 'tambourine-seregno', 'tambourine-seregno-brianza',
  'bloom', 'bloom-mezzago', 'bloom-mezzago-brianza',
  'q-club', 'q-club-milano',
  'sio-cafe', 'sio-cafe-milano', 'sio-cafe-milano-bicocca',
  'le-jardin', 'le-jardin-milano', 'le-jardin-au-bord-du-lac',
  'rocket', 'rocket-club', 'rocket-club-milano',
  'tempio-del-futuro-perduto', 'tempio-futuro-perduto-milano',
  'base-milano', 'base-milano-tortona',
  'jazz-cafe', 'jazz-cafe-milano',
  'masada', 'masada-milano', 'circolo-amelia', 'amelia-milano',
  'divina-milano', 'divina-club-milano', 'karma-milano', 'karma-borgo-milano',
  'fura-desenzano', 'sesto-senso-desenzano', 'bolgia-bergamo',
]);

export function resolveVenueSlug(slug: string): string {
  const clean = sanitizeAsciiSlug(slug);
  const direct = venueSlugToCanonical.get(clean) || venueSlugToCanonical.get(slug);
  if (direct) return direct;
  for (const suffix of VENUE_SUFFIXES) {
    if (clean.endsWith(suffix) && clean.length > suffix.length) {
      const base = clean.slice(0, -suffix.length);
      const hit = venueSlugToCanonical.get(base);
      if (hit) return hit;
    }
  }
  return slug;
}

export function isKnownActiveVenueSlug(slug: string): boolean {
  const resolved = resolveVenueSlug(slug);
  return Boolean(VENUE_SLUGS_35[resolved]);
}

export function isLegacyUnlistedClubSlug(slug: string): boolean {
  if (isKnownActiveVenueSlug(slug)) return false;
  const clean = sanitizeAsciiSlug(slug);
  if (!clean) return false;
  if (LEGACY_UNLISTED_CLUB_SET.has(clean)) return true;
  for (const suffix of VENUE_SUFFIXES) {
    if (clean.endsWith(suffix) && clean.length > suffix.length) {
      const base = clean.slice(0, -suffix.length);
      if (LEGACY_UNLISTED_CLUB_SET.has(base)) return true;
    }
  }
  return false;
}

export function getLocalizedVenueSlug35(venueSlugOrId: string, locale: LocaleCode): string {
  const canonical = resolveVenueSlug(venueSlugOrId);
  const mapped = VENUE_SLUGS_35[canonical]?.[locale];
  if (mapped) return mapped;
  return canonical;
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

// ─── 3. GENRE SLUGS (All 10 Backed Music Genres + Format Aliases) ────────────
const CANONICAL_GENRES: Array<{ canonicalSlug: string; aliases: string[] }> = [
  { canonicalSlug: 'techno', aliases: ['techno-clubs-milan', 'techno-milano'] },
  { canonicalSlug: 'house', aliases: ['house-music-milan', 'house-milano', 'tech-house', 'tech-house-milano'] },
  { canonicalSlug: 'afro-house', aliases: ['afro-house-melodic', 'afro-house-milano', 'melodic-techno', 'melodic-techno-milano'] },
  { canonicalSlug: 'hip-hop', aliases: ['hip-hop-urban', 'hip-hop-trap-milano', 'afrobeats', 'afrobeats-milano', 'rnb', 'trap'] },
  { canonicalSlug: 'reggaeton', aliases: ['reggaeton-latin', 'reggaeton-milano', 'latin', 'latin-milano', 'musica-latina-milano'] },
  { canonicalSlug: 'commercial', aliases: ['commercial-sing-along', 'commerciale-milano', 'open-format', 'open-format-milano', 'pop', 'disco'] },
  { canonicalSlug: 'dinner-show', aliases: ['dinner-show-aperitivo-cantato', 'cena-spettacolo-milano', 'cena-spettacolo', 'cena-cantata', 'cena-cantata-milano'] },
  { canonicalSlug: 'edm', aliases: ['edm-festival', 'edm-milano'] },
  { canonicalSlug: 'live-music', aliases: ['live-music-concerts', 'musica-dal-vivo-milano'] },
  { canonicalSlug: 'indie', aliases: ['indie-nu-disco', 'indie-milano'] },
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
    for (const loc of ALL_35_LOCALES) {
      const tk = SLUG_TOKENS_35[loc];
      if (tk) {
        genreSlugToCanonical.set(sanitizeAsciiSlug(`${alias}-${tk.milan}-${tk.music}`), g.canonicalSlug);
      }
    }
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
      const hit = genreSlugToCanonical.get(base);
      if (hit) return hit;
    }
  }
  return slug;
}

export function isKnownActiveGenreSlug(slug: string): boolean {
  const resolved = resolveGenreSlug(slug);
  return Boolean(GENRE_SLUGS_35[resolved]);
}

export function getLocalizedGenreSlug35(genreSlug: string, locale: LocaleCode): string {
  const canonical = resolveGenreSlug(genreSlug);
  const mapped = GENRE_SLUGS_35[canonical]?.[locale];
  if (mapped) return mapped;
  return canonical;
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

export const CONSOLIDATED_NYE_MASTER_GUIDE_IDS: ReadonlySet<string> = new Set([
  'g-new-years-eve-2027',
  'g-86',
]);

export function isConsolidatedNyeMasterGuideId(guideId: string): boolean {
  return CONSOLIDATED_NYE_MASTER_GUIDE_IDS.has(guideId);
}

const LEGACY_GUIDE_ALIAS_TO_ID: Readonly<Record<string, string>> = {
  ...LEGACY_HYBRID_GUIDE_SLUGS_TO_ID,
  'navigli-hidden-speakeasies': 'g-secret-bars',
  'the-sound-of-milan-dj-interview': 'g-dj-interview',
  'san-siro-football-afterparties-guide': 'g-san-siro-football-afterparties',
  'monza-brianza-to-milan-clubs-parking-vip-guide-vip-guide': 'g-110',
  'bergamo-to-milan-clubs-highway-a4-vip-guide-vip-guide': 'g-111',
  'como-lecco-lugano-ticino-to-milan-clubs-vip-guide-vip-guide': 'g-112',
  'brescia-franciacorta-cremona-to-milan-clubs-vip-guide-vip-guide': 'g-113',
  'varese-pavia-lodi-novara-to-milan-clubs-vip-guide-vip-guide': 'g-114',
};

export function isLegacyHybridGuideSlug(slug: string): boolean {
  const clean = sanitizeAsciiSlug(slug);
  return Boolean(LEGACY_GUIDE_ALIAS_TO_ID[clean] || LEGACY_GUIDE_ALIAS_TO_ID[slug]);
}

export function resolveExistingGuideId(slugOrId: string): string | undefined {
  const clean = sanitizeAsciiSlug(slugOrId);
  if (LEGACY_GUIDE_ALIAS_TO_ID[clean]) {
    return LEGACY_GUIDE_ALIAS_TO_ID[clean];
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

const WEEKLY_EVENT_DEFS: Array<{ canonicalSlug: string; clubKey: string; day: string; partyName: string; shortAliases?: string[]; customSlugBuilder?: (locale: LocaleCode, tk: SlugLangTokens) => string }> = [
  { canonicalSlug: 'justme-monday-monday-night', clubKey: 'just-me', day: 'monday', partyName: 'monday-night', shortAliases: ['monday-night', 'justme-monday'] },
  { canonicalSlug: 'justme-tuesday-martedi-universitario', clubKey: 'just-me', day: 'tuesday', partyName: 'university-party', shortAliases: ['martedi-universitario', 'justme-tuesday', 'justme-tuesday-Reset'] },
  { canonicalSlug: 'justme-wednesday-absolutely', clubKey: 'just-me', day: 'wednesday', partyName: 'absolutely', shortAliases: ['absolutely', 'justme-wednesday', 'justme-wednesday-one-night', 'justme-wednesday-wednesday-night-gentlemen-show'] },
  { canonicalSlug: 'justme-thursday-viziatissima', clubKey: 'just-me', day: 'thursday', partyName: 'viziatissima', shortAliases: ['viziatissima', 'justme-thursday', 'justme-thursday-secret-garden', 'justme-thursday-thursday-night'] },
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
  { canonicalSlug: 'repvblic-tuesday-home-club-apero', clubKey: 'repvblic', day: 'tuesday', partyName: 'home-club-apero', shortAliases: ['home', 'home-club-apero', 'repvblic-tuesday', 'repvblic-monday', 'repvblic-monday-dirty-monday', 'dirty-monday', 'repvblic-wednesday', 'repvblic-wednesday-home'] },
  { canonicalSlug: 'repvblic-thursday-buraka-movida', clubKey: 'repvblic', day: 'thursday', partyName: 'buraka-movida', shortAliases: ['buraka-movida', 'sbraake', 'repvblic-thursday', 'repvblic-thursday-sbraake'] },
  { canonicalSlug: 'repvblic-friday-tech-house-friday', clubKey: 'repvblic', day: 'friday', partyName: 'tech-house-friday', shortAliases: ['tech-house-friday', 'dirty-monday-edition', 'repvblic-friday', 'repvblic-friday-dirty-monday-edition'] },
  { canonicalSlug: 'repvblic-saturday-saturday-night', clubKey: 'repvblic', day: 'saturday', partyName: 'saturday-night', shortAliases: ['repvblic-saturday'] },
  { canonicalSlug: 'repvblic-sunday-demon-time', clubKey: 'repvblic', day: 'sunday', partyName: 'demon-time', shortAliases: ['demon-time', 'repvblic-sunday'] },
  // Philipp's Milano (The Plein Hotel) — 7 active weekly formats
  { canonicalSlug: 'philipps-tuesday-from-brasil-to-milan', clubKey: 'philipps', day: 'tuesday', partyName: 'from-brasil-to-milan', shortAliases: ['from-brasil-to-milan', 'brasilian-dinner-show', 'philipps-tuesday'] },
  { canonicalSlug: 'philipps-wednesday-tussy', clubKey: 'philipps', day: 'wednesday', partyName: 'tussy', shortAliases: ['tussy', 'philipps-wednesday'] },
  { canonicalSlug: 'philipps-thursday-saint', clubKey: 'philipps', day: 'thursday', partyName: 'saint', shortAliases: ['saint', 'philipps-thursday'] },
  { canonicalSlug: 'philipps-friday-club-for-life', clubKey: 'philipps', day: 'friday', partyName: 'club-for-life', shortAliases: ['club-for-life', 'clubforlife', 'philipps-friday'] },
  { canonicalSlug: 'philipps-saturday-konekt', clubKey: 'philipps', day: 'saturday', partyName: 'konekt', shortAliases: ['konekt', 'philipps-saturday'] },
  { canonicalSlug: 'philipps-sunday-sweetie', clubKey: 'philipps', day: 'sunday', partyName: 'sweetie', shortAliases: ['sweetie', 'philipps-sunday'] },
  { canonicalSlug: 'philipps-saturday-the-philipps-show', clubKey: 'philipps', day: 'saturday', partyName: 'the-philipps-show', shortAliases: ['the-philipps-show', 'philipps-show', 'philipps-dinnershow'] },
  // The Club Milano — 5 active weekly formats
  { canonicalSlug: 'theclub-wednesday-one-two', clubKey: 'the-club', day: 'wednesday', partyName: 'one-two', shortAliases: ['one-two', 'onetwo', 'theclub-wednesday'] },
  { canonicalSlug: 'theclub-thursday-atlanta', clubKey: 'the-club', day: 'thursday', partyName: 'atlanta', shortAliases: ['atlanta', 'theclub-thursday'] },
  { canonicalSlug: 'theclub-friday-first-class', clubKey: 'the-club', day: 'friday', partyName: 'first-class', shortAliases: ['first-class', 'firstclass', 'theclub-friday'] },
  { canonicalSlug: 'theclub-saturday-girls-republic', clubKey: 'the-club', day: 'saturday', partyName: 'girls-republic', shortAliases: ['girls-republic', 'girlsrepublic', 'theclub-saturday'] },
  { canonicalSlug: 'theclub-sunday-superbe', clubKey: 'the-club', day: 'sunday', partyName: 'superbe', shortAliases: ['superbe', 'theclub-sunday'] },
  // MIB Milano — 4 active weekly formats
  { canonicalSlug: 'mibmilano-wednesday-international-week', clubKey: 'mib', day: 'wednesday', partyName: 'international-week', shortAliases: ['international-week', 'mibmilano-wednesday', 'mib-wednesday'] },
  { canonicalSlug: 'mibmilano-thursday-justice', clubKey: 'mib', day: 'thursday', partyName: 'justice', shortAliases: ['justice', 'mibmilano-thursday', 'mib-thursday'] },
  { canonicalSlug: 'mibmilano-friday-billions', clubKey: 'mib', day: 'friday', partyName: 'billions', shortAliases: ['billions', 'mibmilano-friday', 'mib-friday'] },
  { canonicalSlug: 'mibmilano-saturday-love-affair', clubKey: 'mib', day: 'saturday', partyName: 'love-affair', shortAliases: ['love-affair', 'mibmilano-saturday', 'mib-saturday'] },
  // Terrazza Duomo 21 — 3 skyline formats
  { canonicalSlug: 'terrazza21-thursday-duomo-sunset-lounge', clubKey: 'terrazza-duomo-21', day: 'thursday', partyName: 'duomo-sunset-lounge', shortAliases: ['duomo-sunset-lounge', 'terrazza21-thursday'] },
  { canonicalSlug: 'terrazza21-friday-friday-over-duomo', clubKey: 'terrazza-duomo-21', day: 'friday', partyName: 'friday-over-duomo', shortAliases: ['friday-over-duomo', 'terrazza21-friday'] },
  { canonicalSlug: 'terrazza21-saturday-saturday-skyline', clubKey: 'terrazza-duomo-21', day: 'saturday', partyName: 'saturday-skyline', shortAliases: ['saturday-skyline', 'terrazza21-saturday'] },
  // --- 13 Bergamo & Brescia Weekly Slugs ---
  { canonicalSlug: 'setai-bergamo-friday-friday-urban-arena', clubKey: 'setai-club-bergamo', day: 'friday', partyName: 'friday-urban-arena', shortAliases: ['setai-bergamo-friday'], customSlugBuilder: (locale, tk) => `${'setai-club-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['friday'] || 'friday'}-friday-urban-arena-${tk.party}` },
  { canonicalSlug: 'setai-bergamo-saturday-saturday-juice-tech-house', clubKey: 'setai-club-bergamo', day: 'saturday', partyName: 'saturday-juice-tech-house', shortAliases: ['setai-bergamo-saturday'], customSlugBuilder: (locale, tk) => `${'setai-club-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['saturday'] || 'saturday'}-saturday-juice-tech-house-${tk.party}` },
  { canonicalSlug: 'capogiro-bergamo-friday-feel-friday-dinner-party', clubKey: 'capogiro-curno-bergamo', day: 'friday', partyName: 'feel-friday-dinner-party', shortAliases: ['capogiro-bergamo-friday'], customSlugBuilder: (locale, tk) => `${'capogiro-curno-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['friday'] || 'friday'}-feel-friday-dinner-party-${tk.party}` },
  { canonicalSlug: 'capogiro-bergamo-saturday-saturday-joyclub-dinner-voice-bar', clubKey: 'capogiro-curno-bergamo', day: 'saturday', partyName: 'saturday-joyclub-dinner-voice-bar', shortAliases: ['capogiro-bergamo-saturday'], customSlugBuilder: (locale, tk) => `${'capogiro-curno-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['saturday'] || 'saturday'}-saturday-joyclub-dinner-voice-bar-${tk.party}` },
  { canonicalSlug: 'tiky-klub-bergamo-wednesday-wednesday-house-session', clubKey: 'tiky-klub-seriate-bergamo', day: 'wednesday', partyName: 'wednesday-house-session', shortAliases: ['tiky-klub-bergamo-wednesday'], customSlugBuilder: (locale, tk) => `${'tiky-klub-seriate-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['wednesday'] || 'wednesday'}-wednesday-house-session-${tk.party}` },
  { canonicalSlug: 'tiky-klub-bergamo-friday-friday-icon-tech-house', clubKey: 'tiky-klub-seriate-bergamo', day: 'friday', partyName: 'friday-icon-tech-house', shortAliases: ['tiky-klub-bergamo-friday'], customSlugBuilder: (locale, tk) => `${'tiky-klub-seriate-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['friday'] || 'friday'}-friday-icon-tech-house-${tk.party}` },
  { canonicalSlug: 'tiky-klub-bergamo-saturday-saturday-house-showcase', clubKey: 'tiky-klub-seriate-bergamo', day: 'saturday', partyName: 'saturday-house-showcase', shortAliases: ['tiky-klub-bergamo-saturday'], customSlugBuilder: (locale, tk) => `${'tiky-klub-seriate-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['saturday'] || 'saturday'}-saturday-house-showcase-${tk.party}` },
  { canonicalSlug: 'zero-club-bergamo-wednesday-please-wednesday', clubKey: 'zero-club-bergamo', day: 'wednesday', partyName: 'please-wednesday', shortAliases: ['zero-club-bergamo-wednesday'], customSlugBuilder: (locale, tk) => `${'zero-club-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['wednesday'] || 'wednesday'}-please-wednesday-${tk.party}` },
  { canonicalSlug: 'zero-club-bergamo-friday-premiere-friday', clubKey: 'zero-club-bergamo', day: 'friday', partyName: 'premiere-friday', shortAliases: ['zero-club-bergamo-friday'], customSlugBuilder: (locale, tk) => `${'zero-club-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['friday'] || 'friday'}-premiere-friday-${tk.party}` },
  { canonicalSlug: 'zero-club-bergamo-saturday-saturday-dual-room', clubKey: 'zero-club-bergamo', day: 'saturday', partyName: 'saturday-dual-room', shortAliases: ['zero-club-bergamo-saturday'], customSlugBuilder: (locale, tk) => `${'zero-club-bergamo'}-${WEEKDAY_TOKENS_35[locale]?.['saturday'] || 'saturday'}-saturday-dual-room-${tk.party}` },
  { canonicalSlug: 'qi-clubbing-brescia-friday-friday-dinner-show-club', clubKey: 'qi-clubbing-erbusco-brescia', day: 'friday', partyName: 'friday-dinner-show-club', shortAliases: ['qi-clubbing-brescia-friday'], customSlugBuilder: (locale, tk) => `${'qi-clubbing-erbusco-brescia'}-${WEEKDAY_TOKENS_35[locale]?.['friday'] || 'friday'}-friday-dinner-show-club-${tk.party}` },
  { canonicalSlug: 'qi-clubbing-brescia-saturday-saturday-gourmet-luxury-club', clubKey: 'qi-clubbing-erbusco-brescia', day: 'saturday', partyName: 'saturday-gourmet-luxury-club', shortAliases: ['qi-clubbing-brescia-saturday'], customSlugBuilder: (locale, tk) => `${'qi-clubbing-erbusco-brescia'}-${WEEKDAY_TOKENS_35[locale]?.['saturday'] || 'saturday'}-saturday-gourmet-luxury-club-${tk.party}` },
  { canonicalSlug: 'number-one-brescia-saturday-saturday-multisala-megaclub', clubKey: 'number-one-corte-franca-brescia', day: 'saturday', partyName: 'saturday-multisala-megaclub', shortAliases: ['number-one-brescia-saturday'], customSlugBuilder: (locale, tk) => `${'number-one-corte-franca-brescia'}-${WEEKDAY_TOKENS_35[locale]?.['saturday'] || 'saturday'}-saturday-multisala-megaclub-${tk.party}` },
  // --- 30 Remaining Active Venues Weekly Slugs (2026-11-27) ---
  { canonicalSlug: 'tocqueville-thursday-corso-como-thursday', clubKey: 'tocqueville-13', day: 'thursday', partyName: 'corso-como-thursday', shortAliases: ['tocqueville-thursday'] },
  { canonicalSlug: 'tocqueville-friday-friday-dinner-club', clubKey: 'tocqueville-13', day: 'friday', partyName: 'friday-dinner-club', shortAliases: ['tocqueville-friday'] },
  { canonicalSlug: 'tocqueville-saturday-saturday-glamour-club', clubKey: 'tocqueville-13', day: 'saturday', partyName: 'saturday-glamour-club', shortAliases: ['tocqueville-saturday'] },
  { canonicalSlug: 'tocqueville-sunday-sunday-corso-como-party', clubKey: 'tocqueville-13', day: 'sunday', partyName: 'sunday-corso-como-party', shortAliases: ['tocqueville-sunday'] },
  { canonicalSlug: 'armani-prive-thursday-couture-cocktail-thursday', clubKey: 'armani-prive', day: 'thursday', partyName: 'couture-cocktail-thursday', shortAliases: ['armani-prive-thursday'] },
  { canonicalSlug: 'armani-prive-friday-friday-fashion-prive', clubKey: 'armani-prive', day: 'friday', partyName: 'friday-fashion-prive', shortAliases: ['armani-prive-friday'] },
  { canonicalSlug: 'armani-prive-saturday-saturday-haute-couture-club', clubKey: 'armani-prive', day: 'saturday', partyName: 'saturday-haute-couture-club', shortAliases: ['armani-prive-saturday'] },
  { canonicalSlug: 'volt-friday-friday-avant-garde-sound', clubKey: 'volt-club', day: 'friday', partyName: 'friday-avant-garde-sound', shortAliases: ['volt-friday'] },
  { canonicalSlug: 'volt-saturday-saturday-melodic-techno', clubKey: 'volt-club', day: 'saturday', partyName: 'saturday-melodic-techno', shortAliases: ['volt-saturday'] },
  { canonicalSlug: 'alcatraz-friday-friday-all-you-can-dance', clubKey: 'alcatraz', day: 'friday', partyName: 'friday-all-you-can-dance', shortAliases: ['alcatraz-friday'] },
  { canonicalSlug: 'alcatraz-saturday-saturday-mega-arena', clubKey: 'alcatraz', day: 'saturday', partyName: 'saturday-mega-arena', shortAliases: ['alcatraz-saturday'] },
  { canonicalSlug: 'fabrique-friday-friday-live-club-arena', clubKey: 'fabrique', day: 'friday', partyName: 'friday-live-club-arena', shortAliases: ['fabrique-friday'] },
  { canonicalSlug: 'fabrique-saturday-saturday-festival-arena', clubKey: 'fabrique', day: 'saturday', partyName: 'saturday-festival-arena', shortAliases: ['fabrique-saturday'] },
  { canonicalSlug: 'amnesia-saturday-saturday-tech-house-temple', clubKey: 'amnesia', day: 'saturday', partyName: 'saturday-tech-house-temple', shortAliases: ['amnesia-saturday'] },
  { canonicalSlug: 'hollywood-tuesday-tuesday-international-party', clubKey: 'hollywood-club', day: 'tuesday', partyName: 'tuesday-international-party', shortAliases: ['hollywood-tuesday'] },
  { canonicalSlug: 'hollywood-wednesday-wednesday-midweek-club', clubKey: 'hollywood-club', day: 'wednesday', partyName: 'wednesday-midweek-club', shortAliases: ['hollywood-wednesday'] },
  { canonicalSlug: 'hollywood-thursday-thursday-glamour-hits', clubKey: 'hollywood-club', day: 'thursday', partyName: 'thursday-glamour-hits', shortAliases: ['hollywood-thursday'] },
  { canonicalSlug: 'hollywood-friday-friday-rythmoteque-club', clubKey: 'hollywood-club', day: 'friday', partyName: 'friday-rythmoteque-club', shortAliases: ['hollywood-friday'] },
  { canonicalSlug: 'hollywood-saturday-saturday-iconic-vip-night', clubKey: 'hollywood-club', day: 'saturday', partyName: 'saturday-iconic-vip-night', shortAliases: ['hollywood-saturday'] },
  { canonicalSlug: 'hollywood-sunday-sunday-late-party', clubKey: 'hollywood-club', day: 'sunday', partyName: 'sunday-late-party', shortAliases: ['hollywood-sunday'] },
  { canonicalSlug: '11clubroom-thursday-thursday-velvet-urban', clubKey: '11-clubroom', day: 'thursday', partyName: 'thursday-velvet-urban', shortAliases: ['11clubroom-thursday'] },
  { canonicalSlug: '11clubroom-friday-friday-boutique-clubroom', clubKey: '11-clubroom', day: 'friday', partyName: 'friday-boutique-clubroom', shortAliases: ['11clubroom-friday'] },
  { canonicalSlug: '11clubroom-saturday-saturday-intimate-prive', clubKey: '11-clubroom', day: 'saturday', partyName: 'saturday-intimate-prive', shortAliases: ['11clubroom-saturday'] },
  { canonicalSlug: 'gattopardo-friday-friday-chandelier-gala', clubKey: 'gattopardo', day: 'friday', partyName: 'friday-chandelier-gala', shortAliases: ['gattopardo-friday'] },
  { canonicalSlug: 'gattopardo-saturday-saturday-grand-nave-party', clubKey: 'gattopardo', day: 'saturday', partyName: 'saturday-grand-nave-party', shortAliases: ['gattopardo-saturday'] },
  { canonicalSlug: 'dazi-wednesday-wednesday-arco-aperitivo', clubKey: 'dazi', day: 'wednesday', partyName: 'wednesday-arco-aperitivo', shortAliases: ['dazi-wednesday'] },
  { canonicalSlug: 'dazi-thursday-thursday-neoclassical-lounge', clubKey: 'dazi', day: 'thursday', partyName: 'thursday-neoclassical-lounge', shortAliases: ['dazi-thursday'] },
  { canonicalSlug: 'dazi-friday-friday-sempione-dinner-dj', clubKey: 'dazi', day: 'friday', partyName: 'friday-sempione-dinner-dj', shortAliases: ['dazi-friday'] },
  { canonicalSlug: 'dazi-saturday-saturday-arco-della-pace-night', clubKey: 'dazi', day: 'saturday', partyName: 'saturday-arco-della-pace-night', shortAliases: ['dazi-saturday'] },
  { canonicalSlug: 'dazi-sunday-sunday-sunset-sempione', clubKey: 'dazi', day: 'sunday', partyName: 'sunday-sunset-sempione', shortAliases: ['dazi-sunday'] },
  { canonicalSlug: 'ceresio-7-tuesday-tuesday-skyline-mixology', clubKey: 'ceresio-7', day: 'tuesday', partyName: 'tuesday-skyline-mixology', shortAliases: ['ceresio-7-tuesday'] },
  { canonicalSlug: 'ceresio-7-wednesday-wednesday-rooftop-dining', clubKey: 'ceresio-7', day: 'wednesday', partyName: 'wednesday-rooftop-dining', shortAliases: ['ceresio-7-wednesday'] },
  { canonicalSlug: 'ceresio-7-thursday-thursday-fashion-aperitivo', clubKey: 'ceresio-7', day: 'thursday', partyName: 'thursday-fashion-aperitivo', shortAliases: ['ceresio-7-thursday'] },
  { canonicalSlug: 'ceresio-7-friday-friday-rooftop-lounge', clubKey: 'ceresio-7', day: 'friday', partyName: 'friday-rooftop-lounge', shortAliases: ['ceresio-7-friday'] },
  { canonicalSlug: 'ceresio-7-saturday-saturday-panoramic-soiree', clubKey: 'ceresio-7', day: 'saturday', partyName: 'saturday-panoramic-soiree', shortAliases: ['ceresio-7-saturday'] },
  { canonicalSlug: 'ceresio-7-sunday-sunday-sunset-terrace', clubKey: 'ceresio-7', day: 'sunday', partyName: 'sunday-sunset-terrace', shortAliases: ['ceresio-7-sunday'] },
  { canonicalSlug: 'apollo-thursday-thursday-navigli-live-grooves', clubKey: 'apollo-club', day: 'thursday', partyName: 'thursday-navigli-live-grooves', shortAliases: ['apollo-thursday'] },
  { canonicalSlug: 'apollo-friday-friday-house-disco-club', clubKey: 'apollo-club', day: 'friday', partyName: 'friday-house-disco-club', shortAliases: ['apollo-friday'] },
  { canonicalSlug: 'apollo-saturday-saturday-apollo-club-night', clubKey: 'apollo-club', day: 'saturday', partyName: 'saturday-apollo-club-night', shortAliases: ['apollo-saturday'] },
  { canonicalSlug: 'apollo-sunday-sunday-rollover-session', clubKey: 'apollo-club', day: 'sunday', partyName: 'sunday-rollover-session', shortAliases: ['apollo-sunday'] },
  { canonicalSlug: 'magazzini-thursday-thursday-porta-romana-showcase', clubKey: 'magazzini-generali', day: 'thursday', partyName: 'thursday-porta-romana-showcase', shortAliases: ['magazzini-thursday'] },
  { canonicalSlug: 'magazzini-friday-friday-warehouse-party', clubKey: 'magazzini-generali', day: 'friday', partyName: 'friday-warehouse-party', shortAliases: ['magazzini-friday'] },
  { canonicalSlug: 'magazzini-saturday-saturday-mezzanine-electronic', clubKey: 'magazzini-generali', day: 'saturday', partyName: 'saturday-mezzanine-electronic', shortAliases: ['magazzini-saturday'] },
  { canonicalSlug: 'church81-friday-friday-candlelight-dinner-show', clubKey: 'church-81', day: 'friday', partyName: 'friday-candlelight-dinner-show', shortAliases: ['church81-friday'] },
  { canonicalSlug: 'church81-saturday-saturday-supper-club-party', clubKey: 'church-81', day: 'saturday', partyName: 'saturday-supper-club-party', shortAliases: ['church81-saturday'] },
  { canonicalSlug: 'loolapaloosa-tuesday-tuesday-corso-como-aperitivo', clubKey: 'loolapaloosa', day: 'tuesday', partyName: 'tuesday-corso-como-aperitivo', shortAliases: ['loolapaloosa-tuesday'] },
  { canonicalSlug: 'loolapaloosa-wednesday-wednesday-sing-along-night', clubKey: 'loolapaloosa', day: 'wednesday', partyName: 'wednesday-sing-along-night', shortAliases: ['loolapaloosa-wednesday'] },
  { canonicalSlug: 'loolapaloosa-thursday-thursday-garibaldi-party', clubKey: 'loolapaloosa', day: 'thursday', partyName: 'thursday-garibaldi-party', shortAliases: ['loolapaloosa-thursday'] },
  { canonicalSlug: 'loolapaloosa-friday-friday-bar-top-party', clubKey: 'loolapaloosa', day: 'friday', partyName: 'friday-bar-top-party', shortAliases: ['loolapaloosa-friday'] },
  { canonicalSlug: 'loolapaloosa-saturday-saturday-loola-celebration', clubKey: 'loolapaloosa', day: 'saturday', partyName: 'saturday-loola-celebration', shortAliases: ['loolapaloosa-saturday'] },
  { canonicalSlug: 'loolapaloosa-sunday-sunday-corso-como-finale', clubKey: 'loolapaloosa', day: 'sunday', partyName: 'sunday-corso-como-finale', shortAliases: ['loolapaloosa-sunday'] },
  { canonicalSlug: 'bobino-wednesday-wednesday-navigli-lounge', clubKey: 'bobino', day: 'wednesday', partyName: 'wednesday-navigli-lounge', shortAliases: ['bobino-wednesday'] },
  { canonicalSlug: 'bobino-thursday-thursday-afterwork-party', clubKey: 'bobino', day: 'thursday', partyName: 'thursday-afterwork-party', shortAliases: ['bobino-thursday'] },
  { canonicalSlug: 'bobino-friday-friday-dinner-dance-hits', clubKey: 'bobino', day: 'friday', partyName: 'friday-dinner-dance-hits', shortAliases: ['bobino-friday'] },
  { canonicalSlug: 'bobino-saturday-saturday-bobino-club-night', clubKey: 'bobino', day: 'saturday', partyName: 'saturday-bobino-club-night', shortAliases: ['bobino-saturday'] },
  { canonicalSlug: 'bobino-sunday-sunday-navigli-aperitivo', clubKey: 'bobino', day: 'sunday', partyName: 'sunday-navigli-aperitivo', shortAliases: ['bobino-sunday'] },
  { canonicalSlug: 'dock22-thursday-thursday-canal-mixology', clubKey: 'dock-22', day: 'thursday', partyName: 'thursday-canal-mixology', shortAliases: ['dock22-thursday'] },
  { canonicalSlug: 'dock22-friday-friday-loft-house-session', clubKey: 'dock-22', day: 'friday', partyName: 'friday-loft-house-session', shortAliases: ['dock22-friday'] },
  { canonicalSlug: 'dock22-saturday-saturday-naviglio-late-club', clubKey: 'dock-22', day: 'saturday', partyName: 'saturday-naviglio-late-club', shortAliases: ['dock22-saturday'] },
  { canonicalSlug: 'dock22-sunday-sunday-canal-sunset-grooves', clubKey: 'dock-22', day: 'sunday', partyName: 'sunday-canal-sunset-grooves', shortAliases: ['dock22-sunday'] },
  { canonicalSlug: 'radio-rooftop-bar-milano-monday-monday-skyline-sunset', clubKey: 'radio-rooftop-bar', day: 'monday', partyName: 'monday-skyline-sunset', shortAliases: ['radio-rooftop-bar-milano-monday'] },
  { canonicalSlug: 'radio-rooftop-bar-milano-tuesday-tuesday-porta-nuova-mixology', clubKey: 'radio-rooftop-bar', day: 'tuesday', partyName: 'tuesday-porta-nuova-mixology', shortAliases: ['radio-rooftop-bar-milano-tuesday'] },
  { canonicalSlug: 'radio-rooftop-bar-milano-wednesday-wednesday-panoramic-dj-set', clubKey: 'radio-rooftop-bar', day: 'wednesday', partyName: 'wednesday-panoramic-dj-set', shortAliases: ['radio-rooftop-bar-milano-wednesday'] },
  { canonicalSlug: 'radio-rooftop-bar-milano-thursday-thursday-cosmopolitan-rooftop', clubKey: 'radio-rooftop-bar', day: 'thursday', partyName: 'thursday-cosmopolitan-rooftop', shortAliases: ['radio-rooftop-bar-milano-thursday'] },
  { canonicalSlug: 'radio-rooftop-bar-milano-friday-friday-tenth-floor-grooves', clubKey: 'radio-rooftop-bar', day: 'friday', partyName: 'friday-tenth-floor-grooves', shortAliases: ['radio-rooftop-bar-milano-friday'] },
  { canonicalSlug: 'radio-rooftop-bar-milano-saturday-saturday-skyline-soiree', clubKey: 'radio-rooftop-bar', day: 'saturday', partyName: 'saturday-skyline-soiree', shortAliases: ['radio-rooftop-bar-milano-saturday'] },
  { canonicalSlug: 'radio-rooftop-bar-milano-sunday-sunday-rooftop-horizon', clubKey: 'radio-rooftop-bar', day: 'sunday', partyName: 'sunday-rooftop-horizon', shortAliases: ['radio-rooftop-bar-milano-sunday'] },
  { canonicalSlug: 'the-roof-milano-monday-monday-missori-sunset', clubKey: 'the-roof', day: 'monday', partyName: 'monday-missori-sunset', shortAliases: ['the-roof-milano-monday'] },
  { canonicalSlug: 'the-roof-milano-tuesday-tuesday-panoramic-terrace', clubKey: 'the-roof', day: 'tuesday', partyName: 'tuesday-panoramic-terrace', shortAliases: ['the-roof-milano-tuesday'] },
  { canonicalSlug: 'the-roof-milano-wednesday-wednesday-duomo-horizon', clubKey: 'the-roof', day: 'wednesday', partyName: 'wednesday-duomo-horizon', shortAliases: ['the-roof-milano-wednesday'] },
  { canonicalSlug: 'the-roof-milano-thursday-thursday-gourmet-rooftop', clubKey: 'the-roof', day: 'thursday', partyName: 'thursday-gourmet-rooftop', shortAliases: ['the-roof-milano-thursday'] },
  { canonicalSlug: 'the-roof-milano-friday-friday-skyline-aperitivo', clubKey: 'the-roof', day: 'friday', partyName: 'friday-skyline-aperitivo', shortAliases: ['the-roof-milano-friday'] },
  { canonicalSlug: 'the-roof-milano-saturday-saturday-starlight-terrace', clubKey: 'the-roof', day: 'saturday', partyName: 'saturday-starlight-terrace', shortAliases: ['the-roof-milano-saturday'] },
  { canonicalSlug: 'the-roof-milano-sunday-sunday-panoramic-lounge', clubKey: 'the-roof', day: 'sunday', partyName: 'sunday-panoramic-lounge', shortAliases: ['the-roof-milano-sunday'] },
  { canonicalSlug: 'terrazza-aperol-milano-monday-monday-duomo-spires-aperitivo', clubKey: 'terrazza-aperol', day: 'monday', partyName: 'monday-duomo-spires-aperitivo', shortAliases: ['terrazza-aperol-milano-monday'] },
  { canonicalSlug: 'terrazza-aperol-milano-tuesday-tuesday-galleria-sunset', clubKey: 'terrazza-aperol', day: 'tuesday', partyName: 'tuesday-galleria-sunset', shortAliases: ['terrazza-aperol-milano-tuesday'] },
  { canonicalSlug: 'terrazza-aperol-milano-wednesday-wednesday-duomo-golden-hour', clubKey: 'terrazza-aperol', day: 'wednesday', partyName: 'wednesday-duomo-golden-hour', shortAliases: ['terrazza-aperol-milano-wednesday'] },
  { canonicalSlug: 'terrazza-aperol-milano-thursday-thursday-milanese-ritual', clubKey: 'terrazza-aperol', day: 'thursday', partyName: 'thursday-milanese-ritual', shortAliases: ['terrazza-aperol-milano-thursday'] },
  { canonicalSlug: 'terrazza-aperol-milano-friday-friday-cathedral-terrace', clubKey: 'terrazza-aperol', day: 'friday', partyName: 'friday-cathedral-terrace', shortAliases: ['terrazza-aperol-milano-friday'] },
  { canonicalSlug: 'terrazza-aperol-milano-saturday-saturday-duomo-balcony', clubKey: 'terrazza-aperol', day: 'saturday', partyName: 'saturday-duomo-balcony', shortAliases: ['terrazza-aperol-milano-saturday'] },
  { canonicalSlug: 'terrazza-aperol-milano-sunday-sunday-duomo-aperitivo', clubKey: 'terrazza-aperol', day: 'sunday', partyName: 'sunday-duomo-aperitivo', shortAliases: ['terrazza-aperol-milano-sunday'] },
  { canonicalSlug: 'terrazza-gallia-milano-tuesday-tuesday-art-deco-mixology', clubKey: 'terrazza-gallia', day: 'tuesday', partyName: 'tuesday-art-deco-mixology', shortAliases: ['terrazza-gallia-milano-tuesday'] },
  { canonicalSlug: 'terrazza-gallia-milano-wednesday-wednesday-signature-martini', clubKey: 'terrazza-gallia', day: 'wednesday', partyName: 'wednesday-signature-martini', shortAliases: ['terrazza-gallia-milano-wednesday'] },
  { canonicalSlug: 'terrazza-gallia-milano-thursday-thursday-excelsior-soiree', clubKey: 'terrazza-gallia', day: 'thursday', partyName: 'thursday-excelsior-soiree', shortAliases: ['terrazza-gallia-milano-thursday'] },
  { canonicalSlug: 'terrazza-gallia-milano-friday-friday-gallia-skyline', clubKey: 'terrazza-gallia', day: 'friday', partyName: 'friday-gallia-skyline', shortAliases: ['terrazza-gallia-milano-friday'] },
  { canonicalSlug: 'terrazza-gallia-milano-saturday-saturday-haute-rooftop', clubKey: 'terrazza-gallia', day: 'saturday', partyName: 'saturday-haute-rooftop', shortAliases: ['terrazza-gallia-milano-saturday'] },
  { canonicalSlug: 'terrazza-gallia-milano-sunday-sunday-palace-terrace', clubKey: 'terrazza-gallia', day: 'sunday', partyName: 'sunday-palace-terrace', shortAliases: ['terrazza-gallia-milano-sunday'] },
  { canonicalSlug: 'ristorante-torre-milano-wednesday-wednesday-prada-tower-bar', clubKey: 'ristorante-torre', day: 'wednesday', partyName: 'wednesday-prada-tower-bar', shortAliases: ['ristorante-torre-milano-wednesday'] },
  { canonicalSlug: 'ristorante-torre-milano-thursday-thursday-architectural-dining', clubKey: 'ristorante-torre', day: 'thursday', partyName: 'thursday-architectural-dining', shortAliases: ['ristorante-torre-milano-thursday'] },
  { canonicalSlug: 'ristorante-torre-milano-friday-friday-fondazione-skyline', clubKey: 'ristorante-torre', day: 'friday', partyName: 'friday-fondazione-skyline', shortAliases: ['ristorante-torre-milano-friday'] },
  { canonicalSlug: 'ristorante-torre-milano-saturday-saturday-torre-fine-dining', clubKey: 'ristorante-torre', day: 'saturday', partyName: 'saturday-torre-fine-dining', shortAliases: ['ristorante-torre-milano-saturday'] },
  { canonicalSlug: 'ristorante-torre-milano-sunday-sunday-museum-tower-evening', clubKey: 'ristorante-torre', day: 'sunday', partyName: 'sunday-museum-tower-evening', shortAliases: ['ristorante-torre-milano-sunday'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale-tuesday-tuesday-glasshouse-skyline', clubKey: 'terrazza-triennale', day: 'tuesday', partyName: 'tuesday-glasshouse-skyline', shortAliases: ['innocenti-evasioni-terrazza-triennale-tuesday'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale-wednesday-wednesday-triennale-vista', clubKey: 'terrazza-triennale', day: 'wednesday', partyName: 'wednesday-triennale-vista', shortAliases: ['innocenti-evasioni-terrazza-triennale-wednesday'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale-thursday-thursday-sempione-canopy', clubKey: 'terrazza-triennale', day: 'thursday', partyName: 'thursday-sempione-canopy', shortAliases: ['innocenti-evasioni-terrazza-triennale-thursday'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale-friday-friday-osteria-con-vista', clubKey: 'terrazza-triennale', day: 'friday', partyName: 'friday-osteria-con-vista', shortAliases: ['innocenti-evasioni-terrazza-triennale-friday'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale-saturday-saturday-triennale-soiree', clubKey: 'terrazza-triennale', day: 'saturday', partyName: 'saturday-triennale-soiree', shortAliases: ['innocenti-evasioni-terrazza-triennale-saturday'] },
  { canonicalSlug: 'innocenti-evasioni-terrazza-triennale-sunday-sunday-parco-sempione-sunset', clubKey: 'terrazza-triennale', day: 'sunday', partyName: 'sunday-parco-sempione-sunset', shortAliases: ['innocenti-evasioni-terrazza-triennale-sunday'] },
  { canonicalSlug: 'super-club-milano-friday-friday-tortona-club-night', clubKey: 'super-club', day: 'friday', partyName: 'friday-tortona-club-night', shortAliases: ['super-club-milano-friday'] },
  { canonicalSlug: 'super-club-milano-saturday-saturday-superclub-prive', clubKey: 'super-club', day: 'saturday', partyName: 'saturday-superclub-prive', shortAliases: ['super-club-milano-saturday'] },
  { canonicalSlug: 'carlsbergol-tuesday-tuesday-porta-nuova-brewery', clubKey: 'carlsberg-ol', day: 'tuesday', partyName: 'tuesday-porta-nuova-brewery', shortAliases: ['carlsbergol-tuesday'] },
  { canonicalSlug: 'carlsbergol-wednesday-wednesday-grill-stein-evening', clubKey: 'carlsberg-ol', day: 'wednesday', partyName: 'wednesday-grill-stein-evening', shortAliases: ['carlsbergol-wednesday'] },
  { canonicalSlug: 'carlsbergol-thursday-thursday-bastioni-social-dinner', clubKey: 'carlsberg-ol', day: 'thursday', partyName: 'thursday-bastioni-social-dinner', shortAliases: ['carlsbergol-thursday'] },
  { canonicalSlug: 'carlsbergol-friday-friday-brewery-music-night', clubKey: 'carlsberg-ol', day: 'friday', partyName: 'friday-brewery-music-night', shortAliases: ['carlsbergol-friday'] },
  { canonicalSlug: 'carlsbergol-saturday-saturday-porta-nuova-feast', clubKey: 'carlsberg-ol', day: 'saturday', partyName: 'saturday-porta-nuova-feast', shortAliases: ['carlsbergol-saturday'] },
  { canonicalSlug: 'carlsbergol-sunday-sunday-convivial-dinner', clubKey: 'carlsberg-ol', day: 'sunday', partyName: 'sunday-convivial-dinner', shortAliases: ['carlsbergol-sunday'] },
  { canonicalSlug: 'tom-thursday-thursday-ordinary-supper-club', clubKey: 'tom-the-ordinary-market', day: 'thursday', partyName: 'thursday-ordinary-supper-club', shortAliases: ['tom-thursday'] },
  { canonicalSlug: 'tom-friday-friday-dinner-show-club', clubKey: 'tom-the-ordinary-market', day: 'friday', partyName: 'friday-dinner-show-club', shortAliases: ['tom-friday'] },
  { canonicalSlug: 'tom-saturday-saturday-tom-club-night', clubKey: 'tom-the-ordinary-market', day: 'saturday', partyName: 'saturday-tom-club-night', shortAliases: ['tom-saturday'] },
  { canonicalSlug: 'bischeri-wednesday-wednesday-cena-cantata', clubKey: 'bischeri', day: 'wednesday', partyName: 'wednesday-cena-cantata', shortAliases: ['bischeri-wednesday'] },
  { canonicalSlug: 'bischeri-thursday-thursday-live-dinner-party', clubKey: 'bischeri', day: 'thursday', partyName: 'thursday-live-dinner-party', shortAliases: ['bischeri-thursday'] },
  { canonicalSlug: 'bischeri-friday-friday-bischeri-dinner-show', clubKey: 'bischeri', day: 'friday', partyName: 'friday-bischeri-dinner-show', shortAliases: ['bischeri-friday'] },
  { canonicalSlug: 'bischeri-saturday-saturday-gran-cena-cantata', clubKey: 'bischeri', day: 'saturday', partyName: 'saturday-gran-cena-cantata', shortAliases: ['bischeri-saturday'] },
  { canonicalSlug: 'gate-friday-friday-warehouse-techno', clubKey: 'gate', day: 'friday', partyName: 'friday-warehouse-techno', shortAliases: ['gate-friday'] },
  { canonicalSlug: 'gate-saturday-saturday-gate-electronic-arena', clubKey: 'gate', day: 'saturday', partyName: 'saturday-gate-electronic-arena', shortAliases: ['gate-saturday'] },
  { canonicalSlug: 'pelledoca-friday-friday-forlanini-dinner-show', clubKey: 'pelledoca', day: 'friday', partyName: 'friday-forlanini-dinner-show', shortAliases: ['pelledoca-friday'] },
  { canonicalSlug: 'pelledoca-saturday-saturday-pelledoca-party', clubKey: 'pelledoca', day: 'saturday', partyName: 'saturday-pelledoca-party', shortAliases: ['pelledoca-saturday'] },
  { canonicalSlug: 'justme-garda-friday-friday-garda-dinner-club', clubKey: 'justme-garda-lake', day: 'friday', partyName: 'friday-garda-dinner-club', shortAliases: ['justme-garda-friday'], customSlugBuilder: (locale, tk) => `${'justme-garda-lake'}-${WEEKDAY_TOKENS_35[locale]?.['friday'] || 'friday'}-friday-garda-dinner-club-${tk.party}` },
  { canonicalSlug: 'justme-garda-saturday-saturday-garda-vip-gala', clubKey: 'justme-garda-lake', day: 'saturday', partyName: 'saturday-garda-vip-gala', shortAliases: ['justme-garda-saturday'], customSlugBuilder: (locale, tk) => `${'justme-garda-lake'}-${WEEKDAY_TOKENS_35[locale]?.['saturday'] || 'saturday'}-saturday-garda-vip-gala-${tk.party}` },
];

export const WEEKLY_EVENT_SLUGS_35: Record<string, Record<LocaleCode, string>> = {};
const weeklyEventSlugToCanonical = new Map<string, string>();

for (const def of WEEKLY_EVENT_DEFS) {
  const canon = def.canonicalSlug;
  const map35 = build35SlugMap((locale, tk) => {
    if (def.customSlugBuilder) {
      return def.customSlugBuilder(locale, tk);
    }
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
  'the-grace-club-milano', 'twiga-milano', 'philipps-milano', 'mib-milano',
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

// Pre-register all 66 static mockEvents at module load so Edge Runtime middleware
// and Node SSR share 100% identical slug maps (eliminating Edge-vs-Node canonical mismatch).
const STATIC_MOCK_EVENT_SPECS: ReadonlyArray<readonly [string, string]> = [
  ['keinemusik-milan-25-september-2026', 'keinemusik-milan-25-september-2026'],
  ['flower-power-ibiza-justme-12-06-2026', 'flower-power-ibiza-justme-12-06-2026'],
  ['fashion-week-night-justme-20-06-2026', 'fashion-week-justme-20-06-2026'],
  ['uncle-waffles-tyga-justme-25-06-2026', 'uncle-waffles-tyga-justme-25-06-2026'],
  ['noche-de-perreo-pineta-12-06-2026', 'noche-de-perreo-pineta-12-06-2026'],
  ['mfw-friday-pineta-19-06-2026', 'mfw-friday-pineta-19-06-2026'],
  ['mfw-perreo-night-pineta-20-06-2026', 'mfw-perreo-night-pineta-20-06-2026'],
  ['milan8mile-pineta-26-06-2026', 'milan8mile-pineta-26-06-2026'],
  ['basement-magazzini-23-06-2026', 'basement-magazzini-23-06-2026'],
  ['hatebreed-magazzini-24-06-2026', 'hatebreed-magazzini-24-06-2026'],
  ['la-boum-magazzini-26-06-2026', 'la-boum-magazzini-26-06-2026'],
  ['emergenza-live-final-magazzini-27-06-2026', 'emergenza-live-finale-magazzini-27-06-2026'],
  ['volt-friday-techno-19-06-2026', 'volt-venerdi-techno-19-06-2026'],
  ['volt-saturday-techno-20-06-2026', 'volt-sabato-techno-20-06-2026'],
  ['gattopardo-saturday-06-06-2026', 'gattopardo-sabato-06-06-2026'],
  ['gattopardo-friday-12-06-2026', 'gattopardo-venerdi-12-06-2026'],
  ['armani-prive-mfw-opening-19-06-2026', 'armani-prive-apertura-mfw-19-06-2026'],
  ['armani-prive-mfw-saturday-20-06-2026', 'armani-prive-sabato-mfw-20-06-2026'],
  ['hollywood-friday-03-07-2026', 'hollywood-venerdi-03-07-2026'],
  ['hollywood-saturday-04-07-2026', 'hollywood-sabato-04-07-2026'],
  ['mib-gala-saturday-04-07-2026', 'mib-gala-sabato-04-07-2026'],
  ['mib-monday-night-06-07-2026', 'mib-lunedi-notte-06-07-2026'],
  ['girls-republic-theclub-18-07-2026', 'girls-republic-theclub-18-07-2026'],
  ['superbe-theclub-19-07-2026', 'superbe-theclub-19-07-2026'],
  ['atlanta-theclub-25-06-2026', 'atlanta-theclub-25-06-2026'],
  ['aura-theclub-26-06-2026', 'aura-theclub-26-06-2026'],
  ['girls-republic-theclub-27-06-2026', 'girls-republic-theclub-27-06-2026'],
  ['ceresio-pool-saturday-04-07-2026', 'ceresio-piscine-sabato-04-07-2026'],
  ['ceresio-poolside-aperitivo-11-07-2026', 'ceresio-aperitivo-bordo-piscina-11-07-2026'],
  ['elite-playclub-19-07-2026', 'elite-playclub-19-07-2026'],
  ['dinner-show-friday-55-milano-03-07-2026', 'dinner-show-venerdi-55-milano-03-07-2026'],
  ['studio-55-saturday-04-07-2026', 'studio-55-sabato-04-07-2026'],
  ['dirty-monday-repvblic-06-07-2026', 'dirty-monday-repvblic-06-07-2026'],
  ['repvblic-saturday-04-07-2026', 'repvblic-sabato-04-07-2026'],
  ['11clubroom-saturday-04-07-2026', '11clubroom-sabato-04-07-2026'],
  ['11clubroom-saturday-18-07-2026', '11clubroom-sabato-18-07-2026'],
  ['church81-friday-dinner-show-03-07-2026', 'church81-dinner-show-venerdi-03-07-2026'],
  ['church81-saturday-dinner-show-04-07-2026', 'church81-dinner-show-sabato-04-07-2026'],
  ['terrazza21-sunset-aperitivo-04-07-2026', 'terrazza21-aperitivo-tramonto-04-07-2026'],
  ['terrazza21-summer-aperitivo-18-07-2026', 'terrazza21-aperitivo-estivo-18-07-2026'],
  ['voya-rooftop-dj-night-05-07-2026', 'voya-rooftop-dj-night-05-07-2026'],
  ['voya-rooftop-saturday-18-07-2026', 'voya-rooftop-sabato-18-07-2026'],
  ['apollo-friday-navigli-03-07-2026', 'apollo-venerdi-navigli-03-07-2026'],
  ['summer-nights-independence-day-justme-04-07-2026', 'summer-nights-4-luglio-justme-04-07-2026'],
  ['noche-de-perreo-summer-pineta-04-07-2026', 'noche-de-perreo-estate-pineta-04-07-2026'],
  ['volt-summer-techno-special-10-07-2026', 'volt-estate-techno-speciale-10-07-2026'],
  ['voya-summer-sunset-july-11-07-2026', 'voya-estate-tramonto-luglio-11-07-2026'],
  ['play-club-summer-hiphop-17-07-2026', 'play-club-estate-hiphop-17-07-2026'],
  ['just-me-saturday-luxury-18-07-2026', 'just-me-sabato-lusso-18-07-2026'],
  ['magazzini-generali-summer-rave-19-07-2026', 'magazzini-generali-summer-rave-19-07-2026'],
  ['ceresio-7-summer-rooftop-aperitivo-25-07-2026', 'ceresio-7-aperitivo-estivo-rooftop-25-07-2026'],
  ['pineta-summer-saturday-special-26-07-2026', 'pineta-sabato-speciale-estivo-26-07-2026'],
  ['ferragosto-luxury-night-just-me-14-08-2026', 'notte-ferragosto-just-me-14-08-2026'],
  ['volt-ferragosto-techno-marathon-14-08-2026', 'volt-ferragosto-marathon-techno-14-08-2026'],
  ['pineta-ferragosto-aperitivo-club-15-08-2026', 'pineta-ferragosto-aperitivo-club-15-08-2026'],
  ['play-club-end-of-summer-22-08-2026', 'play-club-fine-estate-22-08-2026'],
  ['armani-prive-late-summer-gala-29-08-2026', 'armani-prive-gala-fine-estate-29-08-2026'],
  ['san-siro-derby-inter-milan-official-afterparty-aria-club', 'dopo-partita-derby-inter-milan-san-siro-aria-club'],
  ['derby-della-madonnina-vip-afterparty-just-me-milano', 'dopo-partita-derby-milano-tavoli-vip-just-me'],
  ['champions-league-night-afterparty-just-me-milano', 'dopo-partita-champions-league-san-siro-just-me-milano'],
  ['san-siro-post-match-skyline-party-voya-rooftop', 'terzo-tempo-san-siro-aperitivo-djset-voya-rooftop'],
  ['saturday-serie-a-post-match-party-pineta-milano', 'dopo-partita-sabato-serie-a-pineta-club-milano'],
  ['san-siro-post-match-dinner-show-55-milano', 'cena-e-serata-dopo-partita-san-siro-55-milano'],
  ['new-years-eve-2027-grand-gala-just-me-milano', 'capodanno-2027-gran-gala-torre-branca-just-me-milano'],
  ['new-years-eve-2027-winter-dome-aria-club-milano', 'capodanno-2027-san-siro-winter-dome-aria-club-milano'],
  ['new-years-eve-2027-skyline-fireworks-voya-rooftop-milan', 'capodanno-2027-vista-fuochi-skyline-voya-rooftop-milano'],
];

for (const [enSlug, itSlug] of STATIC_MOCK_EVENT_SPECS) {
  const map35 = build35SlugMap((locale, tk) => {
    if (locale === 'en') return enSlug;
    if (locale === 'it') return itSlug;
    return `${enSlug}-${tk.milan}-${tk.party}`;
  });
  registerMockEventSlugs35(map35);
  if (enSlug === 'keinemusik-milan-25-september-2026') {
    mockEventSlugToMap.set('keinemusik-milano-25-settembre-2026', map35);
  }
}

const DATED_PARTY_PREFIXES: readonly string[] = (() => {
  const s = new Set<string>();
  for (const loc of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[loc];
    if (tk) s.add(`${tk.party}-${tk.milan}-`);
  }
  return [...s].sort((a, b) => b.length - a.length);
})();

const OCTOBER_ROUTE_SLUGS_SET: ReadonlySet<string> = new Set(routeSlugsJson as string[]);

function stripDatedPartyPrefix(slug: string): string {
  for (const prefix of DATED_PARTY_PREFIXES) {
    if (slug.startsWith(prefix)) {
      return slug.slice(prefix.length);
    }
  }
  return slug;
}

export function resolveEventSlugToCanonical(slug: string, targetLocale?: LocaleCode): string {
  const loc = targetLocale || 'en';
  if (resolveChristmasVoyaSlug(slug)) {
    return christmasVoyaSlug(loc);
  }
  if (resolveOrthodoxNyeJustMeSlug(slug)) {
    return orthodoxNyeJustMeSlug(loc);
  }
  if (resolveThanksgivingJustMeSlug(slug)) {
    return thanksgivingJustMeSlug(loc);
  }
  if (resolveJustSingingRainSlug(slug)) {
    return justSingingRainSlug(loc);
  }
  if (resolvePartenopeaJustMeSlug(slug)) {
    return partenopeaJustMeSlug(loc);
  }
  const bgBsNight = resolveBergamoBresciaNightId(slug);
  if (bgBsNight) {
    return bergamoBresciaNightSlug(bgBsNight, loc);
  }
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
  if (resolveChristmasVoyaSlug(rawSlug)) {
    return christmasVoyaSlug(locale);
  }
  if (resolveOrthodoxNyeJustMeSlug(rawSlug)) {
    return orthodoxNyeJustMeSlug(locale);
  }
  if (resolveThanksgivingJustMeSlug(rawSlug)) {
    return thanksgivingJustMeSlug(locale);
  }
  if (resolveJustSingingRainSlug(rawSlug)) {
    return justSingingRainSlug(locale);
  }
  if (resolvePartenopeaJustMeSlug(rawSlug)) {
    return partenopeaJustMeSlug(locale);
  }
  const bgBsNightRaw = resolveBergamoBresciaNightId(rawSlug);
  if (bgBsNightRaw) {
    return bergamoBresciaNightSlug(bgBsNightRaw, locale);
  }
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
  {
    canonicalPath: '/bergamo-brescia',
    itPath: '/discoteche-bergamo-brescia',
    build: (tk) => `/bergamo-brescia-${tk.club}-${tk.vipTables}`,
    aliases: ['/bergamo', '/brescia', '/franciacorta', '/clubs-bergamo-brescia'],
  },
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

function addHubAliasIfMissing(rawAlias: string, canonicalPath: string): void {
  const parts = rawAlias.split('/').filter(Boolean).map(sanitizeAsciiSlug);
  if (parts.length === 0) return;
  const cleanAlias = '/' + parts.join('/');
  if (!localizedSeoPathToCanonical.has(cleanAlias)) {
    localizedSeoPathToCanonical.set(cleanAlias, canonicalPath);
  }
}

addHubAliasIfMissing('/prenota', '/concierge');
addHubAliasIfMissing('/prenotazioni', '/concierge');
addHubAliasIfMissing('/prenotazione', '/concierge');
addHubAliasIfMissing('/calendario', '/events/this-week');
addHubAliasIfMissing('/calendar', '/events/this-week');

for (const locale of ALL_35_LOCALES) {
  const tk = SLUG_TOKENS_35[locale];
  const dt = DIR_AND_SUB_TOKENS_35[locale];
  if (!tk || !dt) continue;
  // Bare localized parent directories -> canonical hubs (1-hop 308)
  addHubAliasIfMissing(`/${dt.clubsDir}`, '/clubs');
  addHubAliasIfMissing(`/${dt.eventsDir}`, '/events');
  addHubAliasIfMissing(`/${dt.guidesDir}`, '/guides');
  addHubAliasIfMissing(`/${dt.zonesDir}`, '/zones');
  addHubAliasIfMissing(`/${dt.genresDir}`, '/genres');
  addHubAliasIfMissing(`/${dt.calendarDir}`, '/events/this-week');
  addHubAliasIfMissing(`/${dt.bookingDir}`, '/concierge');
  // Short localized event & calendar subpaths -> canonical sub-hubs
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.tonight}`, '/events/tonight');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.thisWeek}`, '/events/this-week');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.special}`, '/events/special');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.best}`, '/events/best');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.archive}`, '/events/past');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.age18}`, '/events/18-plus');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.age21}`, '/events/21-plus');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.international}`, '/events/international');
  addHubAliasIfMissing(`/${dt.eventsDir}/${dt.university}`, '/events/university-erasmus');
  addHubAliasIfMissing(`/${dt.calendarDir}/${dt.tonight}`, '/events/tonight');
  addHubAliasIfMissing(`/${dt.calendarDir}/${dt.thisWeek}`, '/events/this-week');
  addHubAliasIfMissing(`/${dt.bookingDir}/${dt.confirmed}`, '/booking/success');
  // Short localized hub stems without extra suffix
  addHubAliasIfMissing(`/${tk.club}-${tk.milan}`, '/clubs');
  addHubAliasIfMissing(`/${tk.party}-${tk.milan}`, '/events');
  addHubAliasIfMissing(`/${tk.guide}-${tk.milan}`, '/guides');
  addHubAliasIfMissing(`/${tk.zone}-${tk.milan}`, '/zones');
}

export const LEGACY_NEW_YEARS_EVE_SLUGS_SET: ReadonlySet<string> = (() => {
  const baseStems = new Set<string>([
    'new-years-eve',
    'new-years-eve-milan',
    'new-years-eve-milano',
    'milan-new-years-eve',
    'capodanno-milano-discoteche',
    'capodanno-milano',
    'milano-capodanno',
    'capodanno',
    'nye',
    'nye-milan',
    'nye-milano',
    'nochevieja-milan',
    'nochevieja-en-milan',
    'nochevieja-milano',
    'nouvel-an-milan',
    'reveillon-milan',
    'silvester-mailand',
    'mailand-silvester',
    'silvester-milano',
    'reveillon-milao',
    'ano-novo-milao',
    'oud-en-nieuw-milaan',
    'sylwester-mediolan',
    'revelion-milano',
    'silvestr-milan',
    'szilveszter-milano',
    'uusivuosi-milano',
    'nytaarsaften-milano',
    'nyarsafton-milano',
    'nyttarsaften-milano',
    'yilbasi-milano',
    'milano-yilbasi',
  ]);
  for (const locale of ALL_35_LOCALES) {
    const tk = SLUG_TOKENS_35[locale];
    if (tk) {
      baseStems.add(sanitizeAsciiSlug(`${tk.newYearsEve}-${tk.milan}`));
      baseStems.add(sanitizeAsciiSlug(`${tk.milan}-${tk.newYearsEve}`));
    }
  }
  const s = new Set<string>();
  for (const stem of baseStems) {
    if (!stem) continue;
    s.add(stem);
    s.add(`${stem}-2026`);
    s.add(`${stem}-2027`);
  }
  return s;
})();

export function isLegacyNewYearsEveHubSlug(rawSeg: string): boolean {
  const clean = sanitizeAsciiSlug(rawSeg.replace(/^\/+|\/+$/g, ''));
  return LEGACY_NEW_YEARS_EVE_SLUGS_SET.has(clean);
}

export function getLocalizedSeoPagePath35(canonicalPath: string, locale: LocaleCode): string {
  const norm = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  if (norm === '/events/halloween-2026') {
    return `/${getLocalizedDir35('events', locale)}/${getLocalizedEventSlug35('halloween-2026', locale)}`;
  }
  if (norm === '/events/capodanno-2027' || norm === '/new-years-eve') {
    return `/${getLocalizedDir35('events', locale)}/${capodannoCategorySlug('capodanno-2027', locale)}`;
  }
  return SEO_HUB_PATHS_35[norm]?.[locale] || norm;
}

const RESERVED_EVENT_SUBPATHS = new Set([
  'tonight', 'this-week', 'special', 'best', 'past', 'october-2026',
  '18-plus', '21-plus', 'international', 'university-erasmus',
]);

function resolveParentDirSegment(seg: string): string {
  if (isLegacyNewYearsEveHubSlug(seg)) return '/new-years-eve';
  return resolveLocalizedDirToCanonical(seg) || localizedSeoPathToCanonical.get(`/${seg}`) || `/${seg}`;
}

export function resolveSeoHubPathToCanonical(pathWithoutLocale: string, locale?: LocaleCode): string | undefined {
  const norm = (pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`).replace(/\/$/, '') || '/';
  if (localizedSeoPathToCanonical.has(norm)) {
    return localizedSeoPathToCanonical.get(norm);
  }
  const segments = norm.split('/').filter(Boolean);
  if (segments.length === 1 && isLegacyNewYearsEveHubSlug(segments[0])) {
    return '/events/capodanno-2027';
  }
  if (segments.length === 2) {
    const parentCanonical = resolveParentDirSegment(segments[0]);
    const itemSlug = segments[1];
    if (parentCanonical === '/clubs') {
      return isKnownActiveVenueSlug(itemSlug) ? `/clubs/${resolveVenueSlug(itemSlug)}` : undefined;
    }
    if (parentCanonical === '/zones') {
      return `/zones/${resolveZoneSlug(itemSlug)}`;
    }
    if (parentCanonical === '/genres') {
      return isKnownActiveGenreSlug(itemSlug) ? `/genres/${resolveGenreSlug(itemSlug)}` : undefined;
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

  if (restSegments.length === 1 && isLegacyNewYearsEveHubSlug(restSegments[0])) {
    return `${capodannoCategoryPath('capodanno-2027', locale)}${suffix}`;
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
      if (!isKnownActiveVenueSlug(rawItemSlug)) {
        return `${lp}${restPath}${suffix}`;
      }
      const locVenue = getLocalizedVenueSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('clubs', locale)}/${locVenue}${suffix}`;
    }
    if (parentCanonical === '/zones') {
      const locZone = getLocalizedZoneSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('zones', locale)}/${locZone}${suffix}`;
    }
    if (parentCanonical === '/genres') {
      if (!isKnownActiveGenreSlug(rawItemSlug)) {
        return `${lp}${restPath}${suffix}`;
      }
      const locGenre = getLocalizedGenreSlug35(rawItemSlug, locale);
      return `${lp}/${getLocalizedDir35('genres', locale)}/${locGenre}${suffix}`;
    }
    if (parentCanonical === '/guides') {
      const resolvedGuideId = resolveExistingGuideId(rawItemSlug);
      if (resolvedGuideId && isConsolidatedNyeMasterGuideId(resolvedGuideId)) {
        return `${capodannoCategoryPath('capodanno-2027', locale)}${suffix}`;
      }
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

const LEGACY_NYE_VENUE_TO_BASE: Readonly<Record<string, string>> = {
  '55-milano': 'capodanno-55-milano',
  'just-me-milano': 'capodanno-justme-milano-torre-branca',
  'just-me-garda': 'capodanno-justme-garda-lake',
  'justme-garda': 'capodanno-justme-garda-lake',
  'justme-garda-lake': 'capodanno-justme-garda-lake',
  'just-me-lago-di-garda': 'capodanno-justme-garda-lake',
  'justme-lago-di-garda': 'capodanno-justme-garda-lake',
  'tocqueville-13-milano': 'capodanno-tocqueville-13-milano',
  'armani-prive-milano': 'capodanno-armani-prive-milano',
  'the-club-milano': 'capodanno-the-club-milano',
  'hollywood-milano': 'capodanno-hollywood-milano',
  'pineta-milano': 'capodanno-pineta-milano',
  'voya-club-milano': 'capodanno-voya-rooftop-milano',
  'aria-club-milano': 'capodanno-aria-club-milano',
  'rocca-brivio-sforza-milano': 'capodanno-in-castello-tolcinasco-malpaga-chignolo-po',
  'castello-di-malpaga': 'capodanno-castello-di-malpaga',
  'castello-malpaga': 'capodanno-castello-di-malpaga',
  'fabrique-milano': 'capodanno-fabrique-milano',
  'magazzini-generali-milano': 'capodanno-magazzini-generali-milano',
  'alcatraz-milano': 'capodanno-alcatraz-milano',
  'gattopardo-milano': 'capodanno-il-gattopardo-milano',
  'the-grace-club-milano': 'capodanno-grace-club-milano',
  'bischeri-milano': 'capodanno-bischeri-milano',
  'i-bischeri-milano': 'capodanno-bischeri-milano',
  'carlsberg-ol-milano': 'capodanno-carlsberg-ol-milano',
  'carlsberg-ol': 'capodanno-carlsberg-ol-milano',
  'pelledoca-milano': 'capodanno-pelledoca-milano',
  'pelledoca': 'capodanno-pelledoca-milano',
  'tom-milano': 'capodanno-tom-the-ordinary-market-milano',
  'tom-the-ordinary-market-milano': 'capodanno-tom-the-ordinary-market-milano',
  'the-ordinary-market-milano': 'capodanno-tom-the-ordinary-market-milano',
  'gate-milano': 'capodanno-gate-milano',
  'bobino-milano': 'capodanno-bobino-milano',
  'mib-milano': 'capodanno-mib-milano-piazza-affari',
  'dazi-milano': 'capodanno-dazi-milano-arco-della-pace',
  '11-clubroom': 'capodanno-11clubroom-milano',
  'repvblic-milano': 'capodanno-repvblic-milano',
  'philipps-milano': 'capodanno-philipps-milano',
  'setai-club-bergamo': 'capodanno-setai-club-bergamo',
  'setai-bergamo': 'capodanno-setai-club-bergamo',
  'capogiro-curno-bergamo': 'capodanno-capogiro-curno-bergamo',
  'capogiro-bergamo': 'capodanno-capogiro-curno-bergamo',
  'tiky-klub-seriate-bergamo': 'capodanno-tiky-klub-seriate-bergamo',
  'tiky-klub-bergamo': 'capodanno-tiky-klub-seriate-bergamo',
  'zero-club-bergamo': 'capodanno-zero-club-bergamo',
  'qi-clubbing-erbusco-brescia': 'capodanno-qi-clubbing-brescia',
  'qi-clubbing-brescia': 'capodanno-qi-clubbing-brescia',
  'number-one-corte-franca-brescia': 'capodanno-number-one-brescia',
  'number-one-brescia': 'capodanno-number-one-brescia',
  'number-one-franciacorta': 'capodanno-number-one-brescia',
};

const NYE_EVENT_STEM_MATCHERS: ReadonlyArray<readonly [RegExp, string]> = [
  [/bobadilla/i, 'capodanno-bergamo-setai-club-bobadilla'],
  [/fenaroli/i, 'capodanno-franciacorta-number-one-villa-fenaroli'],
  [/(?:^|-)(?:setai-club-bergamo|setai-orio|setai)(?:-|$)/i, 'capodanno-setai-club-bergamo'],
  [/(?:^|-)(?:capogiro)(?:-|$)/i, 'capodanno-capogiro-curno-bergamo'],
  [/(?:^|-)(?:tiky-klub|tiky)(?:-|$)/i, 'capodanno-tiky-klub-seriate-bergamo'],
  [/(?:^|-)(?:zero-club-bergamo|zero-club|zeroclub)(?:-|$)/i, 'capodanno-zero-club-bergamo'],
  [/(?:^|-)(?:qi-clubbing|qiclubbing)(?:-|$)/i, 'capodanno-qi-clubbing-brescia'],
  [/(?:^|-)(?:number-one|numberone)(?:-|$)/i, 'capodanno-number-one-brescia'],
  ...CAPODANNO_EVENT_BASE_SLUGS.map((base) => {
    const core = base
      .replace(/^capodanno-/, '')
      .replace(/-milano(?:-.*)?$/, '')
      .replace(/^(?:in-|il-|la-|le-|the-)/, '');
    const escaped = core.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return [new RegExp(`(?:^|-)${escaped}(?:-|$)`, 'i'), base] as const;
  }),
  [/(?:^|-)(?:tom-the-ordinary-market|ordinary-market|tom)(?:-|$)/i, 'capodanno-tom-the-ordinary-market-milano'],
  [/(?:^|-)(?:bischeri)(?:-|$)/i, 'capodanno-bischeri-milano'],
];

const NYE_CAT_STEM_MATCHERS: ReadonlyArray<readonly [RegExp, string]> = [
  [/(?:^|-)(?:rooftop|terrazz|terrace|skyline)(?:-|$)/i, 'capodanno-rooftop-milano'],
  [/(?:^|-)(?:hotel-5|ville-castelli|villas-castles|luxury-hotel|castell|villa)(?:-|$)/i, 'capodanno-hotel-5-stelle-ville-castelli'],
  [/(?:^|-)(?:cenone|gala-dinner|dinner-show|cena)(?:-|$)/i, 'capodanno-locali-cenone-milano'],
  [/(?:^|-)(?:coppie|couples|romantic)(?:-|$)/i, 'capodanno-coppie-romantico-milano'],
  [/(?:^|-)(?:single|singles|solter)(?:-|$)/i, 'capodanno-single-milano'],
  [/(?:^|-)(?:famigli|family|bambini|kids)(?:-|$)/i, 'capodanno-famiglie-bambini-milano'],
  [/(?:^|-)(?:over-30|over-40|30-40)(?:-|$)/i, 'capodanno-over-30-40-milano'],
  [/(?:^|-)(?:techno|elettronic|electronic)(?:-|$)/i, 'capodanno-techno-elettronica-milano'],
  [/(?:^|-)(?:latino|reggaeton|hip-?hop)(?:-|$)/i, 'capodanno-latino-reggaeton-hiphop-milano'],
  [/(?:^|-)(?:economico|low-cost|budget|cheap)(?:-|$)/i, 'capodanno-economico-low-cost-milano'],
  [/(?:^|-)(?:terme|spa|baita|chalet|montagna)(?:-|$)/i, 'capodanno-terme-spa-baita-montagna'],
  [/(?:^|-)(?:piazza|square|free-public)(?:-|$)/i, 'capodanno-in-piazza'],
  [/(?:^|-)(?:lombardia|lombardy|como|garda|bergamo|brescia|livigno)(?:-|$)/i, 'capodanno-lombardia'],
  [/(?:^|-)(?:discotec|nightclub|clubs)(?:-|$)/i, 'capodanno-discoteche-milano'],
];

const ACTIVE_VENUE_EVENT_MATCHERS: ReadonlyArray<readonly [RegExp, string]> = [
  [/(?:just-?me.*(?:garda|lonato|desenzano)|(?:garda|lonato|desenzano).*just-?me)/i, 'justme-garda-lake'],
  [/(?:^|-)(?:just-me|justme)(?:-|$)/i, 'just-me-milano'],
  [/(?:^|-)(?:pineta)(?:-|$)/i, 'pineta-club-milano'],
  [/(?:^|-)(?:aria-club|aria-milano|aria-milan)(?:-|$)/i, 'aria-club-milano'],
  [/(?:^|-)(?:voya|voja)(?:-|$)/i, 'voya-rooftop-milan'],
  [/(?:^|-)(?:55-milano|55milano|studio-55|cinquantacinque)(?:-|$)/i, '55-milano'],
  [/(?:^|-)(?:repvblic|republic-milano)(?:-|$)/i, 'repvblic-milano'],
  [/(?:^|-)(?:tocqueville)(?:-|$)/i, 'tocqueville-13-milano'],
  [/(?:^|-)(?:carlsberg-ol|carlsberg)(?:-|$)/i, 'carlsberg-ol-milano'],
  [/(?:^|-)(?:tom-the-ordinary-market|ordinary-market|tom-milano)(?:-|$)/i, 'tom-the-ordinary-market-milano'],
  [/(?:^|-)(?:bischeri)(?:-|$)/i, 'bischeri-milano'],
  [/(?:^|-)(?:gate-milano|gate-club|gate)(?:-|$)/i, 'gate-milano'],
  [/(?:^|-)(?:pelledoca)(?:-|$)/i, 'pelledoca-milano'],
  [/(?:^|-)(?:philipps|philipp-plein)(?:-|$)/i, 'philipps-milano'],
  [/(?:^|-)(?:armani-prive)(?:-|$)/i, 'armani-prive-milano'],
  [/(?:^|-)(?:volt-club|volt-milano|volt)(?:-|$)/i, 'volt-club-milano'],
  [/(?:^|-)(?:alcatraz)(?:-|$)/i, 'alcatraz-milano'],
  [/(?:^|-)(?:fabrique)(?:-|$)/i, 'fabrique-milano'],
  [/(?:^|-)(?:amnesia)(?:-|$)/i, 'amnesia-milano'],
  [/(?:^|-)(?:hollywood)(?:-|$)/i, 'hollywood-club-milano'],
  [/(?:^|-)(?:the-club|theclub)(?:-|$)/i, 'the-club-milano'],
  [/(?:^|-)(?:11-clubroom|11clubroom|eleven-clubroom)(?:-|$)/i, '11-clubroom'],
  [/(?:^|-)(?:gattopardo)(?:-|$)/i, 'gattopardo-milano'],
  [/(?:^|-)(?:mib-milano|mib)(?:-|$)/i, 'mib-milano'],
  [/(?:^|-)(?:dazi-milano|dazi-milan|dazi-arco-della-pace|dazi)(?:-|$)/i, 'dazi-milano'],
  [/(?:^|-)(?:terrazza-21|terrazza21|terrazza-duomo)(?:-|$)/i, 'terrazza-21'],
  [/(?:^|-)(?:ceresio-7|ceresio)(?:-|$)/i, 'ceresio-7-milano'],
  [/(?:^|-)(?:apollo-club|apollo-milano|apollo)(?:-|$)/i, 'apollo-club-milano'],
  [/(?:^|-)(?:magazzini-generali|magazzini)(?:-|$)/i, 'magazzini-generali-milano'],
  [/(?:^|-)(?:church-81|church81)(?:-|$)/i, 'church-81'],
  [/(?:^|-)(?:loolapaloosa)(?:-|$)/i, 'loolapaloosa-milano'],
  [/(?:^|-)(?:bobino)(?:-|$)/i, 'bobino-milano'],
  [/(?:^|-)(?:dock-22|dock22)(?:-|$)/i, 'dock-22-milano'],
  [/(?:^|-)(?:play-club|playclub)(?:-|$)/i, 'play-club-milano'],
  [/(?:^|-)(?:radio-rooftop)(?:-|$)/i, 'radio-rooftop-bar-milano'],
  [/(?:^|-)(?:the-roof)(?:-|$)/i, 'the-roof-milano'],
  [/(?:^|-)(?:terrazza-aperol)(?:-|$)/i, 'terrazza-aperol-milano'],
  [/(?:^|-)(?:terrazza-gallia)(?:-|$)/i, 'terrazza-gallia-milano'],
  [/(?:^|-)(?:ristorante-torre)(?:-|$)/i, 'ristorante-torre-milano'],
  [/(?:^|-)(?:terrazza-triennale|innocenti-evasioni)(?:-|$)/i, 'innocenti-evasioni-terrazza-triennale'],
  [/(?:^|-)(?:super-club|superclub)(?:-|$)/i, 'super-club-milano'],
  [/(?:^|-)(?:setai)(?:-|$)/i, 'setai-club-bergamo'],
  [/(?:^|-)(?:capogiro)(?:-|$)/i, 'capogiro-curno-bergamo'],
  [/(?:^|-)(?:tiky-klub|tiky)(?:-|$)/i, 'tiky-klub-seriate-bergamo'],
  [/(?:^|-)(?:zero-club|zeroclub)(?:-|$)/i, 'zero-club-bergamo'],
  [/(?:^|-)(?:qi-clubbing|qiclubbing)(?:-|$)/i, 'qi-clubbing-erbusco-brescia'],
  [/(?:^|-)(?:number-one|numberone)(?:-|$)/i, 'number-one-corte-franca-brescia'],
];

const LEGACY_HALLOWEEN_2026_RE = /(?:^|-)(?:halloween|noc-vjestica|noc-vestica|noc-carovnic|cadilar-bayrami|wanshengjie|halowin|helouin|hellouin|helovins|helovinas|hellovin|hlekkjavaka|oiche-shamhna|nokj-na-vesticite)(?:-|$)/i;
const LEGACY_NYE_TOKENS = Array.from(
  new Set(
    [
      'capodanno', 'new-years-eve', 'nye', 'nochevieja', 'ano-nuevo', 'reveillon', 'nouvel-an',
      'silvester', 'sylwester', 'silvestr', 'revelion', 'szilveszter', 'uusivuosi', 'nytaarsaften',
      'nyarsafton', 'nyttarsaften', 'oud-en-nieuw', 'novyy-god', 'novyy-rik', 'nova-godina',
      'kuanian', 'ras-alsana', 'yilbasi', 'protochronia', 'gamlarskvold', 'aastavahetus',
      'jaunais-gads', 'naujieji-metai', 'viti-i-ri', 'docek-nove-godine', 'silvestrovanje',
      'oiche-chinn-bliana', 'lejlet-l-ewwel-tas-sena',
      ...Object.values(CAPODANNO_NAVIGATION).map((n) => n.nyePrefix),
      ...Object.values(SLUG_TOKENS_35).map((t) => t.newYearsEve),
    ]
      .map((s) => sanitizeAsciiSlug(s))
      .filter(Boolean)
      .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
  ),
);
const LEGACY_NYE_2027_RE = new RegExp(`(?:^|-)(?:${LEGACY_NYE_TOKENS.join('|')})(?:-|$)`, 'i');
const LEGACY_NYE_PREFIX_START_RE = new RegExp(`^(?:${LEGACY_NYE_TOKENS.join('|')})-`, 'i');
const HISTORICAL_PAST_EVENT_DATE_RE = /(?:^|-)(?:202[45]-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])|2026-0[1-9]-(?:0[1-9]|[12]\d|3[01])|(?:0[1-9]|[12]\d|3[01])-0[1-9]-2026|(?:0[1-9]|[12]\d|3[01])-(?:0[1-9]|1[0-2])-202[45]|(?:january|february|march|april|may|june|july|august|september|gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre)-\d{1,2}-202[456]|\d{1,2}-(?:january|february|march|april|may|june|july|august|september|gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre)-202[456])(?:$|-)/i;

export function resolveLegacyOrExpiredEventRedirect(rawSlug: string, targetLocale: LocaleCode): string | null {
  if (!rawSlug) return null;
  const slug = sanitizeAsciiSlug(rawSlug) || rawSlug;
  const stripped = stripDatedPartyPrefix(slug);

  // 1. University Party PT editorial page: serve 200 on PT, 1-hop 308 to PT from any other locale
  if (slug === UNIVERSITY_PARTY_CANONICAL_SLUG || stripped === UNIVERSITY_PARTY_CANONICAL_SLUG) {
    return targetLocale === 'pt'
      ? null
      : `/pt/${getLocalizedDir35('events', 'pt')}/${UNIVERSITY_PARTY_CANONICAL_SLUG}`;
  }

  // 2. Active batch/site-only event profiles (including July 2026 profiles)
  const batchProfile = getEventBatchProfile(rawSlug) || getEventBatchProfile(slug) || getEventBatchProfile(stripped);
  if (batchProfile) {
    const destLocale: LocaleCode = batchProfile.siteLocales
      ? (batchProfile.siteLocales.includes(targetLocale) ? targetLocale : batchProfile.siteLocales[0])
      : targetLocale;
    const destSlug = getEventBatchSlug(batchProfile, destLocale);
    const lp = destLocale === 'en' ? '' : `/${destLocale}`;
    return `${lp}/${getLocalizedDir35('events', destLocale)}/${destSlug}`;
  }

  // 2b. Legacy/vanity NYE 2026 & 2027 hub aliases under /events/* -> deterministic 1-hop 308 to Master Hub
  if (
    CAPODANNO_LEGACY_SET.has(rawSlug) ||
    CAPODANNO_LEGACY_SET.has(slug) ||
    isLegacyNewYearsEveHubSlug(slug)
  ) {
    return capodannoCategoryPath('capodanno-2027', targetLocale);
  }

  // 3. Old Capodanno venue-category compound slugs from guideSlugs100Map
  const capLegacy = CAPODANNO_REVERSE_TO_EN[rawSlug] || CAPODANNO_REVERSE_TO_EN[slug];
  if (capLegacy?.type === 'venue') {
    const mappedBase = LEGACY_NYE_VENUE_TO_BASE[capLegacy.venueSlug];
    if (mappedBase) {
      return capodannoEventPath(mappedBase, targetLocale);
    }
    return capodannoCategoryPath(capLegacy.catId || 'capodanno-discoteche-milano', targetLocale);
  }

  // 3b. Consolidate duplicate mockEvents NYE 2027 pages (Just Me, Aria, Voya) via 1-hop 308 to canonical Capodanno sheets
  if (
    /^(?:new-years-eve-2027-grand-gala-just-me-milano|capodanno-2027-gran-gala-torre-branca-just-me-milano)(?:-|$)/i.test(stripped)
  ) {
    return capodannoEventPath('capodanno-justme-milano-torre-branca', targetLocale);
  }
  if (
    /^(?:new-years-eve-2027-winter-dome-aria-club-milano|capodanno-2027-san-siro-winter-dome-aria-club-milano)(?:-|$)/i.test(stripped)
  ) {
    return capodannoEventPath('capodanno-aria-club-milano', targetLocale);
  }
  if (
    /^(?:new-years-eve-2027-skyline-fireworks-voya-rooftop-milan|capodanno-2027-vista-fuochi-skyline-voya-rooftop-milano)(?:-|$)/i.test(stripped)
  ) {
    return capodannoEventPath('capodanno-voya-rooftop-milano', targetLocale);
  }

  // 4. Protect all live/editorial event slugs (sub-hubs, Halloween, Capodanno, Weekly, MockEvents, October+ Xceed)
  if (
    RESERVED_EVENT_SUBPATHS.has(rawSlug) ||
    RESERVED_EVENT_SUBPATHS.has(slug) ||
    HALLOWEEN_SET.has(rawSlug) ||
    HALLOWEEN_SET.has(slug) ||
    CAPODANNO_LEGACY_SET.has(rawSlug) ||
    CAPODANNO_LEGACY_SET.has(slug) ||
    resolveChristmasVoyaSlug(rawSlug) ||
    resolveChristmasVoyaSlug(slug) ||
    resolveChristmasVoyaSlug(stripped) ||
    resolveOrthodoxNyeJustMeSlug(rawSlug) ||
    resolveOrthodoxNyeJustMeSlug(slug) ||
    resolveOrthodoxNyeJustMeSlug(stripped) ||
    resolveThanksgivingJustMeSlug(rawSlug) ||
    resolveThanksgivingJustMeSlug(slug) ||
    resolveThanksgivingJustMeSlug(stripped) ||
    resolveJustSingingRainSlug(rawSlug) ||
    resolveJustSingingRainSlug(slug) ||
    resolveJustSingingRainSlug(stripped) ||
    resolvePartenopeaJustMeSlug(rawSlug) ||
    resolvePartenopeaJustMeSlug(slug) ||
    resolvePartenopeaJustMeSlug(stripped) ||
    Boolean(resolveBergamoBresciaNightId(rawSlug)) ||
    Boolean(resolveBergamoBresciaNightId(slug)) ||
    Boolean(resolveBergamoBresciaNightId(stripped)) ||
    Boolean(resolveCapodannoCategoryIdByLocalizedSlug(rawSlug, targetLocale)) ||
    Boolean(resolveCapodannoEventBaseSlugByLocalizedSlug(rawSlug, targetLocale)) ||
    capLegacy?.type === 'hub' ||
    capLegacy?.type === 'cat' ||
    weeklyEventSlugToCanonical.has(rawSlug) ||
    weeklyEventSlugToCanonical.has(slug) ||
    weeklyEventSlugToCanonical.has(stripped) ||
    mockEventSlugToMap.has(rawSlug) ||
    mockEventSlugToMap.has(slug) ||
    mockEventSlugToMap.has(stripped) ||
    OCTOBER_ROUTE_SLUGS_SET.has(rawSlug) ||
    OCTOBER_ROUTE_SLUGS_SET.has(slug) ||
    OCTOBER_ROUTE_SLUGS_SET.has(stripped)
  ) {
    return null;
  }

  // 4b. Known GSC typo/renamed variants of live October & Keinemusik events
  if (/^manhattan-project-pineta-club-2026-10-02(?:-[a-z]{2})?$/i.test(stripped)) {
    const destHref = targetLocale === 'en'
      ? '/events/manhattan-project-pineta-milano-2026-10-02'
      : `/${targetLocale}/events/manhattan-project-pineta-milano-2026-10-02`;
    return localizeInternalHref(destHref, targetLocale);
  }
  if (/^keinemusik-.*2026$/i.test(stripped)) {
    const destHref = targetLocale === 'en'
      ? '/events/keinemusik-milan-25-september-2026'
      : `/${targetLocale}/events/keinemusik-milan-25-september-2026`;
    return localizeInternalHref(destHref, targetLocale);
  }

  // 5. Legacy flat Halloween 2026 event slugs crawled by GSC
  if (stripped.includes('2026') && LEGACY_HALLOWEEN_2026_RE.test(stripped)) {
    return halloweenPath(targetLocale);
  }

  // 6. Legacy flat Capodanno / NYE 2027 event slugs crawled by GSC (all 35 locales)
  if ((stripped.includes('2027') && LEGACY_NYE_2027_RE.test(stripped)) || LEGACY_NYE_PREFIX_START_RE.test(stripped)) {
    if (/(?:just-?me.*(?:garda|lonato|desenzano)|(?:garda|lonato|desenzano).*just-?me)/i.test(stripped)) {
      return capodannoEventPath('capodanno-justme-garda-lake', targetLocale);
    }
    for (const [re, baseSlug] of NYE_EVENT_STEM_MATCHERS) {
      if (re.test(stripped)) {
        return capodannoEventPath(baseSlug, targetLocale);
      }
    }
    for (const [re, catId] of NYE_CAT_STEM_MATCHERS) {
      if (re.test(stripped)) {
        return capodannoCategoryPath(catId, targetLocale);
      }
    }
    return capodannoCategoryPath('capodanno-2027', targetLocale);
  }

  // 7. Historical dated events prior to October 2026 OR truncated legacy Eventbrite venue-prefixed imports
  const isTruncatedLegacyVenueEvent =
    stripped.length >= 60 && /^(?:just-me-|55-milano-|pineta-|aria-club-|voya-)/i.test(stripped);
  if (HISTORICAL_PAST_EVENT_DATE_RE.test(stripped) || isTruncatedLegacyVenueEvent) {
    for (const [re, venueCanonicalSlug] of ACTIVE_VENUE_EVENT_MATCHERS) {
      if (re.test(stripped)) {
        const destHref = targetLocale === 'en' ? `/clubs/${venueCanonicalSlug}` : `/${targetLocale}/clubs/${venueCanonicalSlug}`;
        return localizeInternalHref(destHref, targetLocale);
      }
    }
    const fallbackHref = targetLocale === 'en' ? '/events/this-week' : `/${targetLocale}/events/this-week`;
    return localizeInternalHref(fallbackHref, targetLocale);
  }

  // 8. Unknown / genuinely fake event URL -> fall through to real HTTP 404
  return null;
}
