import { enabledLocaleCodes, getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { ALL_EVENT_DIR_TOKENS, getLocalizedDir35 } from '@/lib/i18n/dirTokens35';

export type CapodannoLocaleNav = Readonly<{
  h1: string;
  slug: string;
  menuLabel: string;
  nyePrefix: string;
  citySlug: string;
  categories: Readonly<Record<string, string>>;
}>;

export const CAPODANNO_LEGACY_SLUG = 'capodanno-2027';

export const CAPODANNO_CATEGORY_IDS: readonly string[] = ["capodanno-2027","capodanno-rooftop-milano","capodanno-discoteche-milano","capodanno-locali-cenone-milano","capodanno-hotel-5-stelle-ville-castelli","capodanno-coppie-romantico-milano","capodanno-single-milano","capodanno-famiglie-bambini-milano","capodanno-over-30-40-milano","capodanno-techno-elettronica-milano","capodanno-latino-reggaeton-hiphop-milano","capodanno-economico-low-cost-milano","capodanno-terme-spa-baita-montagna","capodanno-speciale","capodanno-lombardia","capodanno-in-piazza"];

export const CAPODANNO_EVENT_BASE_SLUGS: readonly string[] = ["capodanno-justme-milano-torre-branca","capodanno-justme-garda-lake","capodanno-armani-prive-milano","capodanno-pineta-milano","capodanno-aria-club-milano","capodanno-hollywood-milano","capodanno-the-club-milano","capodanno-tocqueville-13-milano","capodanno-11clubroom-milano","capodanno-volt-club-milano","capodanno-fabrique-milano","capodanno-alcatraz-milano","capodanno-magazzini-generali-milano","capodanno-amnesia-milano","capodanno-gate-milano","capodanno-lime-milano","capodanno-loolapaloosa-milano","capodanno-the-sanctuary-milano","capodanno-bobino-milano","capodanno-55-milano","capodanno-play-club-milano","capodanno-repvblic-milano","capodanno-il-gattopardo-milano","capodanno-apollo-club-milano","capodanno-tempio-del-futuro-perduto","capodanno-circolo-magnolia-idroscalo","capodanno-santeria-toscana-31","capodanno-base-milano-tortona","capodanno-spirit-de-milan","capodanno-jazz-cafe-milano","capodanno-grace-club-milano","capodanno-dazi-milano-arco-della-pace","capodanno-nepentha-milano-duomo","capodanno-old-fashion-triennale","capodanno-terrazza-duomo-21","capodanno-ceresio-7-milano","capodanno-radio-rooftop-milano","capodanno-voya-rooftop-milano","capodanno-hotel-principe-di-savoia-milano","capodanno-terrazza-gallia-excelsior-milano","capodanno-hotel-all-inclusive-milano-sheraton-melia-ripamonti","capodanno-apophis-club-milano","capodanno-the-beach-milano","capodanno-pelledoca-milano","capodanno-mib-milano-piazza-affari","capodanno-tunnel-club-milano","capodanno-rocket-club-milano-navigli","capodanno-plastic-milano","capodanno-superclub-milano-tortona","capodanno-black-hole-milano","capodanno-biko-milano","capodanno-legend-club-milano","capodanno-live-club-trezzo-milano","capodanno-carroponte-sesto-san-giovanni","capodanno-molto-club-milano","capodanno-movie-club-milano","capodanno-zoo-club-milano","capodanno-oneway-club-milano","capodanno-la-cripta-club-milano","capodanno-the-dome-milano","capodanno-sali-milano","capodanno-nidaba-theatre-navigli","capodanno-ahynama-club-latino-milano","capodanno-encanto-club-latino-milano","capodanno-mood-live-milano","capodanno-ciq-milano-corvetto","capodanno-bloom-mezzago-brianza","capodanno-tambourine-seregno-brianza","capodanno-q-club-milano","capodanno-cost-22-milano-corso-como","capodanno-sio-cafe-milano-bicocca","capodanno-le-jardin-milano-idroscalo","capodanno-arci-bellezza-milano","capodanno-masada-circolo-amelia-milano","capodanno-speakeasy-cocktail-bar-milano-1930-backdoor43-camparino","capodanno-tram-storico-milano-atmosfera","capodanno-battello-navigli-darsena-milano","capodanno-qc-terme-milano-porta-romana","capodanno-qc-terme-san-pellegrino","capodanno-qc-terme-bormio-bagni-nuovi-vecchi","capodanno-terme-di-sirmione-aquaria-lago-di-garda","capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale","capodanno-in-castello-tolcinasco-malpaga-chignolo-po","capodanno-in-villa-borromeo-fenaroli-reale","capodanno-teatro-alla-scala-milano","capodanno-teatro-milano-lirico-manzoni-nazionale-carcano","capodanno-zelig-cabaret-milano","capodanno-blue-note-milano-concerto-gospel-jazz","capodanno-crociera-lago-di-como-garda-maggiore","capodanno-bergamo-bolgia-osio-sopra","capodanno-bergamo-setai-club-bobadilla","capodanno-lago-di-garda-sesto-senso-coco-beach","capodanno-brescia-art-club-desenzano-circus-beatclub","capodanno-franciacorta-number-one-villa-fenaroli","capodanno-como-made-club-villa-erba-palace-hotel","capodanno-monza-brianza-noir-club-parco-di-monza","capodanno-varese-shed-club-palace-grand-hotel","capodanno-pavia-le-rotonde-di-garlasco-oltrepo","capodanno-mantova-mascara-all-music-vanita","capodanno-livigno-valtellina-stalet-kosmo-mottolino","capodanno-lecco-orsa-maggiore-villa-lario-valsassina","capodanno-cremona-lodi-juliette-magika-castello-chignolo","capodanno-piazza-duomo-milano","capodanno-castello-sforzesco-parco-sempione-milano","capodanno-darsena-navigli-milano","capodanno-arco-della-pace-piazza-gae-aulenti-milano","capodanno-piazza-sordello-mantova-fuochi-laghi","capodanno-piazza-cavour-como-fuochi-lago","capodanno-piazza-della-loggia-brescia","capodanno-piazza-vittorio-veneto-citta-alta-bergamo","capodanno-fiaccolata-maestri-di-sci-livigno-bormio-ponte-di-legno","capodanno-piazza-varese-pavia-cremona","capodanno-piazza-lecco-sondrio-lodi"];

export const CAPODANNO_NAVIGATION: Readonly<Record<LocaleCode, CapodannoLocaleNav>> = {
  en: {
    h1: "New Year's Eve Events in Milan 2027",
    slug: 'new-years-eve-events-in-milan-2027',
    menuLabel: "New Year's Eve",
    nyePrefix: 'new-years-eve',
    citySlug: 'milan',
    categories: {
      'capodanno-2027': 'new-years-eve-events-in-milan-2027',
      'capodanno-speciale': 'special-new-years-eve-experiences-milan-2027',
      'capodanno-lombardia': 'new-years-eve-lombardy-lakes-alps-2027',
      'capodanno-in-piazza': 'free-public-square-new-years-eve-milan-2027',
      'capodanno-rooftop-milano': 'new-years-eve-rooftop-parties-milan-2027',
      'capodanno-discoteche-milano': 'new-years-eve-nightclubs-clubs-milan-2027',
      'capodanno-locali-cenone-milano': 'new-years-eve-gala-dinner-shows-milan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'new-years-eve-luxury-hotels-villas-castles-milan-2027',
      'capodanno-coppie-romantico-milano': 'romantic-new-years-eve-for-couples-milan-2027',
      'capodanno-single-milano': 'new-years-eve-for-singles-milan-2027',
      'capodanno-famiglie-bambini-milano': 'family-new-years-eve-with-kids-milan-2027',
      'capodanno-over-30-40-milano': 'new-years-eve-over-30-over-40-milan-2027',
      'capodanno-techno-elettronica-milano': 'techno-electronic-new-years-eve-milan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latin-reggaeton-hiphop-new-years-eve-milan-2027',
      'capodanno-economico-low-cost-milano': 'budget-low-cost-new-years-eve-milan-2027',
      'capodanno-terme-spa-baita-montagna': 'thermal-spa-mountain-chalet-new-years-eve-2027',
    },
  },
  it: {
    h1: 'Eventi Capodanno Milano 2027',
    slug: 'eventi-capodanno-milano-2027',
    menuLabel: 'Capodanno',
    nyePrefix: 'capodanno',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'eventi-capodanno-milano-2027',
      'capodanno-speciale': 'capodanno-speciale-milano-2027',
      'capodanno-lombardia': 'capodanno-lombardia-2027',
      'capodanno-in-piazza': 'capodanno-in-piazza-milano-2027',
      'capodanno-rooftop-milano': 'capodanno-rooftop-milano-2027',
      'capodanno-discoteche-milano': 'capodanno-discoteche-milano-2027',
      'capodanno-locali-cenone-milano': 'capodanno-locali-cenone-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'capodanno-hotel-5-stelle-ville-castelli-2027',
      'capodanno-coppie-romantico-milano': 'capodanno-coppie-romantico-milano-2027',
      'capodanno-single-milano': 'capodanno-single-milano-2027',
      'capodanno-famiglie-bambini-milano': 'capodanno-famiglie-bambini-milano-2027',
      'capodanno-over-30-40-milano': 'capodanno-over-30-40-milano-2027',
      'capodanno-techno-elettronica-milano': 'capodanno-techno-elettronica-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'capodanno-latino-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'capodanno-economico-low-cost-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'capodanno-terme-spa-baita-montagna-2027',
    },
  },
  es: {
    h1: 'Eventos de Nochevieja en Milán 2027',
    slug: 'eventos-de-nochevieja-en-milan-2027',
    menuLabel: 'Nochevieja',
    nyePrefix: 'nochevieja',
    citySlug: 'milan',
    categories: {
      'capodanno-2027': 'eventos-de-nochevieja-en-milan-2027',
      'capodanno-speciale': 'nochevieja-especial-en-milan-2027',
      'capodanno-lombardia': 'nochevieja-en-lombardia-2027',
      'capodanno-in-piazza': 'nochevieja-en-plazas-gratis-milan-2027',
      'capodanno-rooftop-milano': 'nochevieja-terrazas-rooftop-milan-2027',
      'capodanno-discoteche-milano': 'nochevieja-discotecas-clubs-milan-2027',
      'capodanno-locali-cenone-milano': 'nochevieja-cena-de-gala-milan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'nochevieja-hoteles-5-estrellas-villas-castillos-2027',
      'capodanno-coppie-romantico-milano': 'nochevieja-romantica-parejas-milan-2027',
      'capodanno-single-milano': 'nochevieja-solteros-singles-milan-2027',
      'capodanno-famiglie-bambini-milano': 'nochevieja-familias-ninos-milan-2027',
      'capodanno-over-30-40-milano': 'nochevieja-mayores-de-30-40-milan-2027',
      'capodanno-techno-elettronica-milano': 'nochevieja-techno-electronica-milan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'nochevieja-latino-reggaeton-hiphop-milan-2027',
      'capodanno-economico-low-cost-milano': 'nochevieja-economica-barata-milan-2027',
      'capodanno-terme-spa-baita-montagna': 'nochevieja-termas-spa-montana-2027',
    },
  },
  fr: {
    h1: 'Événements du Nouvel An à Milan 2027',
    slug: 'evenements-du-nouvel-an-a-milan-2027',
    menuLabel: 'Nouvel An',
    nyePrefix: 'nouvel-an',
    citySlug: 'milan',
    categories: {
      'capodanno-2027': 'evenements-du-nouvel-an-a-milan-2027',
      'capodanno-speciale': 'nouvel-an-insolite-special-milan-2027',
      'capodanno-lombardia': 'nouvel-an-en-lombardie-2027',
      'capodanno-in-piazza': 'nouvel-an-places-publiques-gratuit-milan-2027',
      'capodanno-rooftop-milano': 'nouvel-an-rooftop-terrasses-milan-2027',
      'capodanno-discoteche-milano': 'nouvel-an-discotheques-clubs-milan-2027',
      'capodanno-locali-cenone-milano': 'nouvel-an-diner-spectacle-reveillon-milan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'nouvel-an-hotels-5-etoiles-villas-chateaux-2027',
      'capodanno-coppie-romantico-milano': 'nouvel-an-romantique-couples-milan-2027',
      'capodanno-single-milano': 'nouvel-an-celibataires-milan-2027',
      'capodanno-famiglie-bambini-milano': 'nouvel-an-familles-enfants-milan-2027',
      'capodanno-over-30-40-milano': 'nouvel-an-plus-de-30-40-ans-milan-2027',
      'capodanno-techno-elettronica-milano': 'nouvel-an-techno-electro-milan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'nouvel-an-latino-reggaeton-hiphop-milan-2027',
      'capodanno-economico-low-cost-milano': 'nouvel-an-pas-cher-economique-milan-2027',
      'capodanno-terme-spa-baita-montagna': 'nouvel-an-thermes-spa-chalet-montagne-2027',
    },
  },
  de: {
    h1: 'Silvester-Veranstaltungen in Mailand 2027',
    slug: 'silvester-veranstaltungen-in-mailand-2027',
    menuLabel: 'Silvester',
    nyePrefix: 'silvester',
    citySlug: 'mailand',
    categories: {
      'capodanno-2027': 'silvester-veranstaltungen-in-mailand-2027',
      'capodanno-speciale': 'besondere-silvester-erlebnisse-mailand-2027',
      'capodanno-lombardia': 'silvester-in-der-lombardei-2027',
      'capodanno-in-piazza': 'silvester-auf-oeffentlichen-plaetzen-mailand-2027',
      'capodanno-rooftop-milano': 'silvester-rooftop-dachterrassen-mailand-2027',
      'capodanno-discoteche-milano': 'silvester-clubs-diskotheken-mailand-2027',
      'capodanno-locali-cenone-milano': 'silvester-galadinner-dinner-show-mailand-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'silvester-5-sterne-hotels-villen-schloesser-2027',
      'capodanno-coppie-romantico-milano': 'romantisches-silvester-fuer-paare-mailand-2027',
      'capodanno-single-milano': 'silvester-fuer-singles-mailand-2027',
      'capodanno-famiglie-bambini-milano': 'silvester-fuer-familien-kinder-mailand-2027',
      'capodanno-over-30-40-milano': 'silvester-ueber-30-40-mailand-2027',
      'capodanno-techno-elettronica-milano': 'silvester-techno-elektronisch-mailand-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'silvester-latino-reggaeton-hiphop-mailand-2027',
      'capodanno-economico-low-cost-milano': 'guenstiges-silvester-mailand-2027',
      'capodanno-terme-spa-baita-montagna': 'silvester-therme-spa-berghuette-2027',
    },
  },
  pt: {
    h1: 'Eventos de Réveillon em Milão 2027',
    slug: 'eventos-de-reveillon-em-milao-2027',
    menuLabel: 'Réveillon',
    nyePrefix: 'reveillon',
    citySlug: 'milao',
    categories: {
      'capodanno-2027': 'eventos-de-reveillon-em-milao-2027',
      'capodanno-speciale': 'reveillon-especial-em-milao-2027',
      'capodanno-lombardia': 'reveillon-na-lombardia-2027',
      'capodanno-in-piazza': 'reveillon-nas-pracas-gratis-milao-2027',
      'capodanno-rooftop-milano': 'reveillon-rooftop-terracos-milao-2027',
      'capodanno-discoteche-milano': 'reveillon-baladas-discotecas-milao-2027',
      'capodanno-locali-cenone-milano': 'reveillon-ceia-jantar-show-milao-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'reveillon-hoteis-5-estrelas-vilas-castelos-2027',
      'capodanno-coppie-romantico-milano': 'reveillon-romantico-casais-milao-2027',
      'capodanno-single-milano': 'reveillon-solteiros-milao-2027',
      'capodanno-famiglie-bambini-milano': 'reveillon-familias-criancas-milao-2027',
      'capodanno-over-30-40-milano': 'reveillon-mais-de-30-40-anos-milao-2027',
      'capodanno-techno-elettronica-milano': 'reveillon-techno-eletronica-milao-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'reveillon-latino-reggaeton-hiphop-milao-2027',
      'capodanno-economico-low-cost-milano': 'reveillon-barato-economico-milao-2027',
      'capodanno-terme-spa-baita-montagna': 'reveillon-termas-spa-chale-montanha-2027',
    },
  },
  nl: {
    h1: 'Oud en Nieuw-evenementen in Milaan 2027',
    slug: 'oud-en-nieuw-evenementen-in-milaan-2027',
    menuLabel: 'Oud en Nieuw',
    nyePrefix: 'oud-en-nieuw',
    citySlug: 'milaan',
    categories: {
      'capodanno-2027': 'oud-en-nieuw-evenementen-in-milaan-2027',
      'capodanno-speciale': 'bijzondere-oud-en-nieuw-ervaringen-milaan-2027',
      'capodanno-lombardia': 'oud-en-nieuw-in-lombardije-2027',
      'capodanno-in-piazza': 'gratis-oud-en-nieuw-op-pleinen-milaan-2027',
      'capodanno-rooftop-milano': 'oud-en-nieuw-rooftop-dakterrassen-milaan-2027',
      'capodanno-discoteche-milano': 'oud-en-nieuw-clubs-discotheken-milaan-2027',
      'capodanno-locali-cenone-milano': 'oud-en-nieuw-galadiner-dinnershow-milaan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'oud-en-nieuw-5-sterrenhotels-villas-kastelen-2027',
      'capodanno-coppie-romantico-milano': 'romantisch-oud-en-nieuw-koppels-milaan-2027',
      'capodanno-single-milano': 'oud-en-nieuw-voor-singles-milaan-2027',
      'capodanno-famiglie-bambini-milano': 'oud-en-nieuw-gezinnen-kinderen-milaan-2027',
      'capodanno-over-30-40-milano': 'oud-en-nieuw-30-plus-40-plus-milaan-2027',
      'capodanno-techno-elettronica-milano': 'oud-en-nieuw-techno-elektronisch-milaan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'oud-en-nieuw-latin-reggaeton-hiphop-milaan-2027',
      'capodanno-economico-low-cost-milano': 'goedkoop-oud-en-nieuw-milaan-2027',
      'capodanno-terme-spa-baita-montagna': 'oud-en-nieuw-thermen-spa-berghut-2027',
    },
  },
  ru: {
    h1: 'События Нового года в Милане 2027',
    slug: 'sobytiya-novogo-goda-v-milane-2027',
    menuLabel: 'Новый год',
    nyePrefix: 'novyy-god',
    citySlug: 'milane',
    categories: {
      'capodanno-2027': 'sobytiya-novogo-goda-v-milane-2027',
      'capodanno-speciale': 'osobyy-novyy-god-v-milane-2027',
      'capodanno-lombardia': 'novyy-god-v-lombardii-2027',
      'capodanno-in-piazza': 'novyy-god-na-ploshchadyakh-milana-2027',
      'capodanno-rooftop-milano': 'novyy-god-na-kryshe-rooftop-milan-2027',
      'capodanno-discoteche-milano': 'novyy-god-kluby-diskoteki-milan-2027',
      'capodanno-locali-cenone-milano': 'novogodniy-uzhin-shou-milan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'novyy-god-oteli-5-zvezd-villy-zamki-2027',
      'capodanno-coppie-romantico-milano': 'romanticheskiy-novyy-god-dlya-par-milan-2027',
      'capodanno-single-milano': 'novyy-god-dlya-odinokikh-milan-2027',
      'capodanno-famiglie-bambini-milano': 'semeynyy-novyy-god-s-detmi-milan-2027',
      'capodanno-over-30-40-milano': 'novyy-god-30-plyus-40-plyus-milan-2027',
      'capodanno-techno-elettronica-milano': 'novyy-god-tekhno-elektronika-milan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'novyy-god-latino-reggeton-khipkhop-milan-2027',
      'capodanno-economico-low-cost-milano': 'byudzhetnyy-nedorogoy-novyy-god-milan-2027',
      'capodanno-terme-spa-baita-montagna': 'novyy-god-termy-spa-shale-v-gorakh-2027',
    },
  },
  tr: {
    h1: "Milano'da Yılbaşı Etkinlikleri 2027",
    slug: 'milanoda-yilbasi-etkinlikleri-2027',
    menuLabel: 'Yılbaşı',
    nyePrefix: 'yilbasi',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'milanoda-yilbasi-etkinlikleri-2027',
      'capodanno-speciale': 'milano-ozel-yilbasi-deneyimleri-2027',
      'capodanno-lombardia': 'lombardiya-yilbasi-etkinlikleri-2027',
      'capodanno-in-piazza': 'milano-meydanlarda-ucretsiz-yilbasi-2027',
      'capodanno-rooftop-milano': 'milano-rooftop-teras-yilbasi-2027',
      'capodanno-discoteche-milano': 'milano-gece-kulupleri-yilbasi-2027',
      'capodanno-locali-cenone-milano': 'milano-yilbasi-gala-yemegi-sov-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'milano-5-yildizli-oteller-villalar-satolar-yilbasi-2027',
      'capodanno-coppie-romantico-milano': 'milano-ciftler-icin-romantik-yilbasi-2027',
      'capodanno-single-milano': 'milano-bekarlar-icin-yilbasi-2027',
      'capodanno-famiglie-bambini-milano': 'milano-aileler-ve-cocuklar-icin-yilbasi-2027',
      'capodanno-over-30-40-milano': 'milano-30-ve-40-yas-ustu-yilbasi-2027',
      'capodanno-techno-elettronica-milano': 'milano-tekno-elektronik-yilbasi-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'milano-latin-reggaeton-hiphop-yilbasi-2027',
      'capodanno-economico-low-cost-milano': 'milano-uygun-fiyatli-ekonomik-yilbasi-2027',
      'capodanno-terme-spa-baita-montagna': 'termal-spa-dag-evi-yilbasi-2027',
    },
  },
  zh: {
    h1: '2027米兰跨年活动',
    slug: '2027-milan-kuanian-huodong',
    menuLabel: '跨年',
    nyePrefix: 'kuanian',
    citySlug: 'milan',
    categories: {
      'capodanno-2027': '2027-milan-kuanian-huodong',
      'capodanno-speciale': '2027-milan-tebie-kuanian-tiyan',
      'capodanno-lombardia': '2027-lunbadi-kuanian-huodong',
      'capodanno-in-piazza': '2027-milan-guangchang-mianfei-kuanian',
      'capodanno-rooftop-milano': '2027-milan-rooftop-lutai-kuanian-paidui',
      'capodanno-discoteche-milano': '2027-milan-yedian-julebu-kuanian',
      'capodanno-locali-cenone-milano': '2027-milan-kuanian-wanyan-biaoyan',
      'capodanno-hotel-5-stelle-ville-castelli': '2027-milan-wuxingji-jiudian-bieshu-chengbao-kuanian',
      'capodanno-coppie-romantico-milano': '2027-milan-qinglv-langman-kuanian',
      'capodanno-single-milano': '2027-milan-danshen-kuanian-paidui',
      'capodanno-famiglie-bambini-milano': '2027-milan-jiating-qinzi-kuanian',
      'capodanno-over-30-40-milano': '2027-milan-30-40-sui-yishang-kuanian',
      'capodanno-techno-elettronica-milano': '2027-milan-techno-dianzi-yinle-kuanian',
      'capodanno-latino-reggaeton-hiphop-milano': '2027-milan-lading-reggaeton-xiha-kuanian',
      'capodanno-economico-low-cost-milano': '2027-milan-pingjia-shihui-kuanian',
      'capodanno-terme-spa-baita-montagna': '2027-wenquan-spa-shanmuwu-kuanian',
    },
  },
  ar: {
    h1: 'فعاليات رأس السنة في ميلانو 2027',
    slug: 'faaliyat-ras-alsana-fi-milano-2027',
    menuLabel: 'رأس السنة',
    nyePrefix: 'ras-alsana',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'faaliyat-ras-alsana-fi-milano-2027',
      'capodanno-speciale': 'tajarib-ras-alsana-almumayaza-milano-2027',
      'capodanno-lombardia': 'ras-alsana-fi-lombardiya-2027',
      'capodanno-in-piazza': 'ras-alsana-fi-alsahat-majanan-milano-2027',
      'capodanno-rooftop-milano': 'haflat-rooftop-ras-alsana-milano-2027',
      'capodanno-discoteche-milano': 'nawadi-layliya-ras-alsana-milano-2027',
      'capodanno-locali-cenone-milano': 'ashaa-gala-wa-ard-ras-alsana-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'fanadiq-5-nujum-wa-qila-ras-alsana-2027',
      'capodanno-coppie-romantico-milano': 'ras-alsana-romansiya-lilazwaj-milano-2027',
      'capodanno-single-milano': 'haflat-ras-alsana-lilazab-milano-2027',
      'capodanno-famiglie-bambini-milano': 'ras-alsana-lilaailat-walatfal-milano-2027',
      'capodanno-over-30-40-milano': 'ras-alsana-fawq-30-40-milano-2027',
      'capodanno-techno-elettronica-milano': 'haflat-techno-electronic-ras-alsana-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'haflat-latino-reggaeton-ras-alsana-milano-2027',
      'capodanno-economico-low-cost-milano': 'ras-alsana-iqtisadiya-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'ras-alsana-spa-wa-jibal-2027',
    },
  },
  bg: {
    h1: 'Събития за Нова година в Милано 2027',
    slug: 'sabitiya-za-nova-godina-v-milano-2027',
    menuLabel: 'Нова година',
    nyePrefix: 'nova-godina',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'sabitiya-za-nova-godina-v-milano-2027',
      'capodanno-speciale': 'spetsialni-izgivyavaniya-nova-godina-milano-2027',
      'capodanno-lombardia': 'nova-godina-v-lombardiya-2027',
      'capodanno-in-piazza': 'nova-godina-na-ploshtada-milano-2027',
      'capodanno-rooftop-milano': 'rooftop-partita-nova-godina-milano-2027',
      'capodanno-discoteche-milano': 'klubove-diskoteki-nova-godina-milano-2027',
      'capodanno-locali-cenone-milano': 'praznichna-vecherya-shou-nova-godina-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': '5-zvezdni-hoteli-vili-zamatsi-nova-godina-2027',
      'capodanno-coppie-romantico-milano': 'romantichna-nova-godina-za-dvoyki-milano-2027',
      'capodanno-single-milano': 'nova-godina-za-neobvarzani-singles-milano-2027',
      'capodanno-famiglie-bambini-milano': 'nova-godina-za-semeystva-s-detsa-milano-2027',
      'capodanno-over-30-40-milano': 'nova-godina-nad-30-40-milano-2027',
      'capodanno-techno-elettronica-milano': 'tehno-elektronna-nova-godina-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-regeton-hiphop-nova-godina-milano-2027',
      'capodanno-economico-low-cost-milano': 'izgodna-byudzhetna-nova-godina-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'spa-termi-planinska-hizha-nova-godina-2027',
    },
  },
  hr: {
    h1: 'Događanja za Novu godinu u Milanu 2027',
    slug: 'dogadanja-za-novu-godinu-u-milanu-2027',
    menuLabel: 'Nova godina',
    nyePrefix: 'docek-nove-godine',
    citySlug: 'milanu',
    categories: {
      'capodanno-2027': 'dogadanja-za-novu-godinu-u-milanu-2027',
      'capodanno-speciale': 'posebni-docek-nove-godine-milano-2027',
      'capodanno-lombardia': 'docek-nove-godine-lombardija-2027',
      'capodanno-in-piazza': 'docek-nove-godine-na-trgu-milano-2027',
      'capodanno-rooftop-milano': 'rooftop-docek-nove-godine-milano-2027',
      'capodanno-discoteche-milano': 'klubovi-diskoteke-nova-godina-milano-2027',
      'capodanno-locali-cenone-milano': 'svecana-vecera-show-nova-godina-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'hoteli-5-zvjezdica-vile-dvorci-nova-godina-2027',
      'capodanno-coppie-romantico-milano': 'romanticni-docek-za-parove-milano-2027',
      'capodanno-single-milano': 'nova-godina-za-samce-milano-2027',
      'capodanno-famiglie-bambini-milano': 'nova-godina-za-obitelji-i-djecu-milano-2027',
      'capodanno-over-30-40-milano': 'nova-godina-30-plus-40-plus-milano-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektronska-nova-godina-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-nova-godina-milano-2027',
      'capodanno-economico-low-cost-milano': 'povoljni-docek-nove-godine-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'terme-spa-planinska-kuca-nova-godina-2027',
    },
  },
  cs: {
    h1: 'Silvestrovské akce v Miláně 2027',
    slug: 'silvestrovske-akce-v-milane-2027',
    menuLabel: 'Silvestr',
    nyePrefix: 'silvestr',
    citySlug: 'milane',
    categories: {
      'capodanno-2027': 'silvestrovske-akce-v-milane-2027',
      'capodanno-speciale': 'specialni-silvestrovske-zazitky-milan-2027',
      'capodanno-lombardia': 'silvestr-v-lombardii-2027',
      'capodanno-in-piazza': 'silvestr-na-namestich-zdarma-milan-2027',
      'capodanno-rooftop-milano': 'silvestr-rooftop-stresni-terasy-milan-2027',
      'capodanno-discoteche-milano': 'silvestr-kluby-diskoteky-milan-2027',
      'capodanno-locali-cenone-milano': 'silvestrovska-galavecere-show-milan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'silvestr-5hvezdickove-hotely-vily-hrady-2027',
      'capodanno-coppie-romantico-milano': 'romanticky-silvestr-pro-pary-milan-2027',
      'capodanno-single-milano': 'silvestr-pro-nezadane-singles-milan-2027',
      'capodanno-famiglie-bambini-milano': 'silvestr-pro-rodiny-s-detmi-milan-2027',
      'capodanno-over-30-40-milano': 'silvestr-nad-30-40-let-milan-2027',
      'capodanno-techno-elettronica-milano': 'silvestr-techno-elektronika-milan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'silvestr-latino-reggaeton-hiphop-milan-2027',
      'capodanno-economico-low-cost-milano': 'levny-cenove-dostupny-silvestr-milan-2027',
      'capodanno-terme-spa-baita-montagna': 'silvestr-lazne-spa-horska-chata-2027',
    },
  },
  da: {
    h1: 'Nytårsarrangementer i Milano 2027',
    slug: 'nytaarsarrangementer-i-milano-2027',
    menuLabel: 'Nytårsaften',
    nyePrefix: 'nytaarsaften',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'nytaarsarrangementer-i-milano-2027',
      'capodanno-speciale': 'saerlige-nytaarsoplevelser-milano-2027',
      'capodanno-lombardia': 'nytaarsaften-i-lombardiet-2027',
      'capodanno-in-piazza': 'gratis-nytaarsaften-paa-pladser-milano-2027',
      'capodanno-rooftop-milano': 'nytaarsaften-rooftop-tagterrasser-milano-2027',
      'capodanno-discoteche-milano': 'nytaarsaften-natklubber-diskoteker-milano-2027',
      'capodanno-locali-cenone-milano': 'nytaarsaften-gallamiddag-dinnershow-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'nytaarsaften-5-stjernede-hoteller-villaer-slotte-2027',
      'capodanno-coppie-romantico-milano': 'romantisk-nytaarsaften-for-par-milano-2027',
      'capodanno-single-milano': 'nytaarsaften-for-singler-milano-2027',
      'capodanno-famiglie-bambini-milano': 'nytaarsaften-for-familier-og-boern-milano-2027',
      'capodanno-over-30-40-milano': 'nytaarsaften-30-plus-40-plus-milano-2027',
      'capodanno-techno-elettronica-milano': 'nytaarsaften-techno-elektronisk-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'nytaarsaften-latin-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'billig-budgetvenlig-nytaarsaften-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'nytaarsaften-termer-spa-bjerghytte-2027',
    },
  },
  et: {
    h1: 'Aastavahetuse üritused Milanos 2027',
    slug: 'aastavahetuse-uritused-milanos-2027',
    menuLabel: 'Aastavahetus',
    nyePrefix: 'aastavahetus',
    citySlug: 'milanos',
    categories: {
      'capodanno-2027': 'aastavahetuse-uritused-milanos-2027',
      'capodanno-speciale': 'erilised-aastavahetuse-elamused-milanos-2027',
      'capodanno-lombardia': 'aastavahetus-lombardias-2027',
      'capodanno-in-piazza': 'tasuta-aastavahetus-valjakutel-milanos-2027',
      'capodanno-rooftop-milano': 'aastavahetus-rooftop-katuseterrassidel-milanos-2027',
      'capodanno-discoteche-milano': 'aastavahetus-ooklubides-milanos-2027',
      'capodanno-locali-cenone-milano': 'aastavahetuse-pidulik-ohtusook-show-milanos-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'aastavahetus-5-tarni-hotellides-villades-lossides-2027',
      'capodanno-coppie-romantico-milano': 'romantiline-aastavahetus-paaridele-milanos-2027',
      'capodanno-single-milano': 'aastavahetus-vallalistele-milanos-2027',
      'capodanno-famiglie-bambini-milano': 'aastavahetus-peredele-ja-lastele-milanos-2027',
      'capodanno-over-30-40-milano': 'aastavahetus-30-pluss-40-pluss-milanos-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektrooniline-aastavahetus-milanos-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latiino-reggaeton-hiphop-aastavahetus-milanos-2027',
      'capodanno-economico-low-cost-milano': 'soodne-aastavahetus-milanos-2027',
      'capodanno-terme-spa-baita-montagna': 'aastavahetus-spaa-magimaja-2027',
    },
  },
  fi: {
    h1: 'Uudenvuoden tapahtumat Milanossa 2027',
    slug: 'uudenvuoden-tapahtumat-milanossa-2027',
    menuLabel: 'Uusivuosi',
    nyePrefix: 'uudenvuodenaatto',
    citySlug: 'milanossa',
    categories: {
      'capodanno-2027': 'uudenvuoden-tapahtumat-milanossa-2027',
      'capodanno-speciale': 'erityiset-uudenvuoden-elamykset-milanossa-2027',
      'capodanno-lombardia': 'uusivuosi-lombardiassa-2027',
      'capodanno-in-piazza': 'ilmainen-uusivuosi-aukioilla-milanossa-2027',
      'capodanno-rooftop-milano': 'uusivuosi-rooftop-kattoterasseilla-milanossa-2027',
      'capodanno-discoteche-milano': 'uusivuosi-yokerhoissa-klubeilla-milanossa-2027',
      'capodanno-locali-cenone-milano': 'uudenvuoden-juhlaillallinen-show-milanossa-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'uusivuosi-5-tahden-hotelleissa-huviloissa-linnoissa-2027',
      'capodanno-coppie-romantico-milano': 'romanttinen-uusivuosi-pariskunnille-milanossa-2027',
      'capodanno-single-milano': 'uusivuosi-sinkuille-milanossa-2027',
      'capodanno-famiglie-bambini-milano': 'uusivuosi-perheille-ja-lapsille-milanossa-2027',
      'capodanno-over-30-40-milano': 'uusivuosi-yli-30-40-vuotiaille-milanossa-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektroninen-uusivuosi-milanossa-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-uusivuosi-milanossa-2027',
      'capodanno-economico-low-cost-milano': 'edullinen-uusivuosi-milanossa-2027',
      'capodanno-terme-spa-baita-montagna': 'uusivuosi-kylpyla-spa-vuoristomaja-2027',
    },
  },
  el: {
    h1: 'Εκδηλώσεις Πρωτοχρονιάς στο Μιλάνο 2027',
    slug: 'ekdiloseis-protochronias-sto-milano-2027',
    menuLabel: 'Πρωτοχρονιά',
    nyePrefix: 'protochronia',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'ekdiloseis-protochronias-sto-milano-2027',
      'capodanno-speciale': 'eidikes-empeiries-protochronias-milano-2027',
      'capodanno-lombardia': 'protochronia-sti-lomvardia-2027',
      'capodanno-in-piazza': 'protochronia-stis-plateies-dorean-milano-2027',
      'capodanno-rooftop-milano': 'protochronia-rooftop-taratses-milano-2027',
      'capodanno-discoteche-milano': 'protochronia-klamp-ntiskotek-milano-2027',
      'capodanno-locali-cenone-milano': 'protochroniatiko-revegion-deipno-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'protochronia-xenodocheia-5-asteron-viles-kastra-2027',
      'capodanno-coppie-romantico-milano': 'romantiki-protochronia-gia-zevgaria-milano-2027',
      'capodanno-single-milano': 'protochronia-gia-singles-milano-2027',
      'capodanno-famiglie-bambini-milano': 'protochronia-gia-oikogeneies-paidia-milano-2027',
      'capodanno-over-30-40-milano': 'protochronia-ano-ton-30-40-milano-2027',
      'capodanno-techno-elettronica-milano': 'protochronia-techno-ilektroniki-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'protochronia-latin-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'oikonomiki-protochronia-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'protochronia-therma-spa-salet-vouno-2027',
    },
  },
  hu: {
    h1: 'Szilveszteri programok Milánóban 2027',
    slug: 'szilveszteri-programok-milanoban-2027',
    menuLabel: 'Szilveszter',
    nyePrefix: 'szilveszter',
    citySlug: 'milanoban',
    categories: {
      'capodanno-2027': 'szilveszteri-programok-milanoban-2027',
      'capodanno-speciale': 'kulonleges-szilveszteri-elmenyek-milano-2027',
      'capodanno-lombardia': 'szilveszter-lombardiaban-2027',
      'capodanno-in-piazza': 'ingyenes-szabadteri-szilveszter-milano-2027',
      'capodanno-rooftop-milano': 'szilveszteri-rooftop-tetoterasz-bulik-milano-2027',
      'capodanno-discoteche-milano': 'szilveszteri-klubok-diszkok-milano-2027',
      'capodanno-locali-cenone-milano': 'szilveszteri-galavacsora-show-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'szilveszter-5-csillagos-szallodak-villak-kastelyok-2027',
      'capodanno-coppie-romantico-milano': 'romantikus-szilveszter-paroknak-milano-2027',
      'capodanno-single-milano': 'szilveszter-szingliknek-milano-2027',
      'capodanno-famiglie-bambini-milano': 'csaladi-szilveszter-gyerekekkel-milano-2027',
      'capodanno-over-30-40-milano': 'szilveszter-30-40-felett-milano-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektronikus-szilveszter-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latin-reggaeton-hiphop-szilveszter-milano-2027',
      'capodanno-economico-low-cost-milano': 'olcso-penztarcabarat-szilveszter-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'szilveszter-termalfurdo-spa-hegyi-fahaz-2027',
    },
  },
  ga: {
    h1: 'Imeachtaí Oíche Chinn Bliana i Milano 2027',
    slug: 'imeachtai-oiche-chinn-bliana-i-milano-2027',
    menuLabel: 'Oíche Chinn Bliana',
    nyePrefix: 'oiche-chinn-bliana',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'imeachtai-oiche-chinn-bliana-i-milano-2027',
      'capodanno-speciale': 'eispireis-speisialta-oiche-chinn-bliana-milano-2027',
      'capodanno-lombardia': 'oiche-chinn-bliana-sa-lombaird-2027',
      'capodanno-in-piazza': 'oiche-chinn-bliana-saor-in-aisce-milano-2027',
      'capodanno-rooftop-milano': 'oiche-chinn-bliana-rooftop-milano-2027',
      'capodanno-discoteche-milano': 'clubanna-oiche-chinn-bliana-milano-2027',
      'capodanno-locali-cenone-milano': 'dinnear-gala-oiche-chinn-bliana-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'ostain-5-realt-caisleain-oiche-chinn-bliana-2027',
      'capodanno-coppie-romantico-milano': 'oiche-chinn-bliana-romansach-lanunacha-milano-2027',
      'capodanno-single-milano': 'oiche-chinn-bliana-daoine-singil-milano-2027',
      'capodanno-famiglie-bambini-milano': 'oiche-chinn-bliana-teaghlaigh-leanai-milano-2027',
      'capodanno-over-30-40-milano': 'oiche-chinn-bliana-os-cionn-30-40-milano-2027',
      'capodanno-techno-elettronica-milano': 'techno-leictreonach-oiche-chinn-bliana-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'laidineach-reggaeton-oiche-chinn-bliana-milano-2027',
      'capodanno-economico-low-cost-milano': 'oiche-chinn-bliana-ar-chostas-iseal-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'spa-teirmeach-seile-sleibhe-oiche-chinn-bliana-2027',
    },
  },
  lv: {
    h1: 'Vecgada vakara pasākumi Milānā 2027',
    slug: 'vecgada-vakara-pasakumi-milana-2027',
    menuLabel: 'Vecgada vakars',
    nyePrefix: 'vecgada-vakars',
    citySlug: 'milana',
    categories: {
      'capodanno-2027': 'vecgada-vakara-pasakumi-milana-2027',
      'capodanno-speciale': 'ipashi-vecgada-vakara-piedavajumi-milana-2027',
      'capodanno-lombardia': 'vecgada-vakars-lombardija-2027',
      'capodanno-in-piazza': 'bezmaksas-vecgada-vakars-laukumos-milana-2027',
      'capodanno-rooftop-milano': 'vecgada-vakars-rooftop-jumta-terases-milana-2027',
      'capodanno-discoteche-milano': 'vecgada-vakars-naktsklubos-milana-2027',
      'capodanno-locali-cenone-milano': 'vecgada-svinigas-vakarinas-sovs-milana-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'vecgada-vakars-5-zvaigznu-viesnicas-pilis-2027',
      'capodanno-coppie-romantico-milano': 'romantisks-vecgada-vakars-pariem-milana-2027',
      'capodanno-single-milano': 'vecgada-vakars-brivajiem-singles-milana-2027',
      'capodanno-famiglie-bambini-milano': 'vecgada-vakars-gimenem-ar-berniem-milana-2027',
      'capodanno-over-30-40-milano': 'vecgada-vakars-virs-30-40-milana-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektroniska-muzika-vecgada-vakars-milana-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-vecgada-vakars-milana-2027',
      'capodanno-economico-low-cost-milano': 'izdevigs-budzeta-vecgada-vakars-milana-2027',
      'capodanno-terme-spa-baita-montagna': 'vecgada-vakars-termas-spa-kalnu-namins-2027',
    },
  },
  lt: {
    h1: 'Naujųjų metų renginiai Milane 2027',
    slug: 'naujuju-metu-renginiai-milane-2027',
    menuLabel: 'Naujieji metai',
    nyePrefix: 'naujuju-metu-sutikimas',
    citySlug: 'milane',
    categories: {
      'capodanno-2027': 'naujuju-metu-renginiai-milane-2027',
      'capodanno-speciale': 'ypatingos-naujuju-metu-patirtys-milane-2027',
      'capodanno-lombardia': 'naujieji-metai-lombardijoje-2027',
      'capodanno-in-piazza': 'nemokami-naujieji-metai-aikstese-milane-2027',
      'capodanno-rooftop-milano': 'naujieji-metai-rooftop-stogo-terasose-milane-2027',
      'capodanno-discoteche-milano': 'naujieji-metai-naktiniuose-klubuose-milane-2027',
      'capodanno-locali-cenone-milano': 'naujametine-gala-vakariene-sou-milane-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'naujieji-metai-5-zvaigzduciu-viesbuciuose-pilyse-2027',
      'capodanno-coppie-romantico-milano': 'romantiski-naujieji-metai-poroms-milane-2027',
      'capodanno-single-milano': 'naujieji-metai-vienisiems-milane-2027',
      'capodanno-famiglie-bambini-milano': 'naujieji-metai-seimoms-ir-vaikams-milane-2027',
      'capodanno-over-30-40-milano': 'naujieji-metai-virs-30-40-metu-milane-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektronine-muzika-naujieji-metai-milane-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-naujieji-metai-milane-2027',
      'capodanno-economico-low-cost-milano': 'nebrangus-naujuju-metu-sutikimas-milane-2027',
      'capodanno-terme-spa-baita-montagna': 'naujieji-metai-spa-termose-kalnu-namelyje-2027',
    },
  },
  mt: {
    h1: 'Avvenimenti tal-Ewwel tas-Sena f’Milan 2027',
    slug: 'avvenimenti-tal-ewwel-tas-sena-fmilan-2027',
    menuLabel: 'L-Ewwel tas-Sena',
    nyePrefix: 'l-ewwel-tas-sena',
    citySlug: 'milan',
    categories: {
      'capodanno-2027': 'avvenimenti-tal-ewwel-tas-sena-fmilan-2027',
      'capodanno-speciale': 'esperjenzi-specjali-l-ewwel-tas-sena-milan-2027',
      'capodanno-lombardia': 'l-ewwel-tas-sena-fil-lombardija-2027',
      'capodanno-in-piazza': 'l-ewwel-tas-sena-fil-pjazez-bla-hlas-milan-2027',
      'capodanno-rooftop-milano': 'l-ewwel-tas-sena-rooftop-terrazzi-milan-2027',
      'capodanno-discoteche-milano': 'klabbs-diskoteki-l-ewwel-tas-sena-milan-2027',
      'capodanno-locali-cenone-milano': 'ikla-gala-spettaklu-l-ewwel-tas-sena-milan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'lukandi-5-stilel-vilel-kastelli-l-ewwel-tas-sena-2027',
      'capodanno-coppie-romantico-milano': 'l-ewwel-tas-sena-romantiku-koppji-milan-2027',
      'capodanno-single-milano': 'l-ewwel-tas-sena-ghas-singles-milan-2027',
      'capodanno-famiglie-bambini-milano': 'l-ewwel-tas-sena-familji-tfal-milan-2027',
      'capodanno-over-30-40-milano': 'l-ewwel-tas-sena-fuq-30-40-milan-2027',
      'capodanno-techno-elettronica-milano': 'techno-elettronika-l-ewwel-tas-sena-milan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-l-ewwel-tas-sena-milan-2027',
      'capodanno-economico-low-cost-milano': 'l-ewwel-tas-sena-irhis-milan-2027',
      'capodanno-terme-spa-baita-montagna': 'terme-spa-chalet-muntanji-l-ewwel-tas-sena-2027',
    },
  },
  pl: {
    h1: 'Wydarzenia sylwestrowe w Mediolanie 2027',
    slug: 'wydarzenia-sylwestrowe-w-mediolanie-2027',
    menuLabel: 'Sylwester',
    nyePrefix: 'sylwester',
    citySlug: 'mediolanie',
    categories: {
      'capodanno-2027': 'wydarzenia-sylwestrowe-w-mediolanie-2027',
      'capodanno-speciale': 'wyjatkowy-sylwester-w-mediolanie-2027',
      'capodanno-lombardia': 'sylwester-w-lombardii-2027',
      'capodanno-in-piazza': 'darmowy-sylwester-na-placach-mediolan-2027',
      'capodanno-rooftop-milano': 'sylwester-rooftop-tarasy-widokowe-mediolan-2027',
      'capodanno-discoteche-milano': 'sylwester-kluby-dyskoteki-mediolan-2027',
      'capodanno-locali-cenone-milano': 'kolacja-sylwestrowa-dinner-show-mediolan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'sylwester-hotele-5-gwiazdkowe-wille-zamki-2027',
      'capodanno-coppie-romantico-milano': 'romantyczny-sylwester-dla-par-mediolan-2027',
      'capodanno-single-milano': 'sylwester-dla-singli-mediolan-2027',
      'capodanno-famiglie-bambini-milano': 'sylwester-dla-rodzin-z-dziecmi-mediolan-2027',
      'capodanno-over-30-40-milano': 'sylwester-30-plus-40-plus-mediolan-2027',
      'capodanno-techno-elettronica-milano': 'sylwester-techno-elektronika-mediolan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'sylwester-latino-reggaeton-hiphop-mediolan-2027',
      'capodanno-economico-low-cost-milano': 'tani-budzetowy-sylwester-mediolan-2027',
      'capodanno-terme-spa-baita-montagna': 'sylwester-termy-spa-domek-w-gorach-2027',
    },
  },
  ro: {
    h1: 'Evenimente de Revelion în Milano 2027',
    slug: 'evenimente-de-revelion-in-milano-2027',
    menuLabel: 'Revelion',
    nyePrefix: 'revelion',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'evenimente-de-revelion-in-milano-2027',
      'capodanno-speciale': 'experiente-speciale-revelion-milano-2027',
      'capodanno-lombardia': 'revelion-in-lombardia-2027',
      'capodanno-in-piazza': 'revelion-in-piete-gratuit-milano-2027',
      'capodanno-rooftop-milano': 'revelion-rooftop-terase-milano-2027',
      'capodanno-discoteche-milano': 'revelion-cluburi-discoteci-milano-2027',
      'capodanno-locali-cenone-milano': 'cina-festiva-revelion-dinner-show-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'revelion-hoteluri-5-stele-vile-castele-2027',
      'capodanno-coppie-romantico-milano': 'revelion-romantic-cupluri-milano-2027',
      'capodanno-single-milano': 'revelion-pentru-singles-milano-2027',
      'capodanno-famiglie-bambini-milano': 'revelion-familii-copii-milano-2027',
      'capodanno-over-30-40-milano': 'revelion-peste-30-40-ani-milano-2027',
      'capodanno-techno-elettronica-milano': 'revelion-techno-muzica-electronica-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'revelion-latino-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'revelion-ieftin-accesibil-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'revelion-terme-spa-cabana-munte-2027',
    },
  },
  sk: {
    h1: 'Silvestrovské podujatia v Miláne 2027',
    slug: 'silvestrovske-podujatia-v-milane-2027',
    menuLabel: 'Silvester',
    nyePrefix: 'silvester',
    citySlug: 'milane',
    categories: {
      'capodanno-2027': 'silvestrovske-podujatia-v-milane-2027',
      'capodanno-speciale': 'specialne-silvestrovske-zazitky-milano-2027',
      'capodanno-lombardia': 'silvester-v-lombardii-2027',
      'capodanno-in-piazza': 'silvester-na-namestiach-zdarma-milano-2027',
      'capodanno-rooftop-milano': 'silvester-rooftop-stresne-terasy-milano-2027',
      'capodanno-discoteche-milano': 'silvester-kluby-diskoteky-milano-2027',
      'capodanno-locali-cenone-milano': 'silvestrovska-galavecera-show-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'silvester-5-hviezdickove-hotely-vily-hrady-2027',
      'capodanno-coppie-romantico-milano': 'romanticky-silvester-pre-pary-milano-2027',
      'capodanno-single-milano': 'silvester-pre-nezadanych-singles-milano-2027',
      'capodanno-famiglie-bambini-milano': 'silvester-pre-rodiny-s-detmi-milano-2027',
      'capodanno-over-30-40-milano': 'silvester-nad-30-40-rokov-milano-2027',
      'capodanno-techno-elettronica-milano': 'silvester-techno-elektronika-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'silvester-latino-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'lacny-cenovo-dostupny-silvester-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'silvester-kupele-spa-horska-chata-2027',
    },
  },
  sl: {
    h1: 'Silvestrski dogodki v Milanu 2027',
    slug: 'silvestrski-dogodki-v-milanu-2027',
    menuLabel: 'Silvestrovo',
    nyePrefix: 'silvestrovanje',
    citySlug: 'milanu',
    categories: {
      'capodanno-2027': 'silvestrski-dogodki-v-milanu-2027',
      'capodanno-speciale': 'posebna-silvestrska-dozivetja-milano-2027',
      'capodanno-lombardia': 'silvestrovanje-v-lombardiji-2027',
      'capodanno-in-piazza': 'brezplacno-silvestrovanje-na-trgih-milano-2027',
      'capodanno-rooftop-milano': 'silvestrovanje-rooftop-stresne-terase-milano-2027',
      'capodanno-discoteche-milano': 'silvestrovanje-klubi-diskoteke-milano-2027',
      'capodanno-locali-cenone-milano': 'silvestrska-slavnostna-vecerja-show-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'silvestrovanje-5-zvezdicni-hoteli-vile-gradovi-2027',
      'capodanno-coppie-romantico-milano': 'romanticno-silvestrovanje-za-pare-milano-2027',
      'capodanno-single-milano': 'silvestrovanje-za-samske-milano-2027',
      'capodanno-famiglie-bambini-milano': 'silvestrovanje-za-druzine-in-otroke-milano-2027',
      'capodanno-over-30-40-milano': 'silvestrovanje-nad-30-40-let-milano-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektronsko-silvestrovanje-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-silvestrovanje-milano-2027',
      'capodanno-economico-low-cost-milano': 'ugodno-silvestrovanje-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'silvestrovanje-terme-spa-gorska-koca-2027',
    },
  },
  sv: {
    h1: 'Nyårsevenemang i Milano 2027',
    slug: 'nyarsevenemang-i-milano-2027',
    menuLabel: 'Nyårsafton',
    nyePrefix: 'nyarsafton',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'nyarsevenemang-i-milano-2027',
      'capodanno-speciale': 'speciella-nyarsupplevelser-milano-2027',
      'capodanno-lombardia': 'nyarsafton-i-lombardiet-2027',
      'capodanno-in-piazza': 'gratis-nyarsfirande-pa-torg-milano-2027',
      'capodanno-rooftop-milano': 'nyarsafton-rooftop-takterrasser-milano-2027',
      'capodanno-discoteche-milano': 'nyarsafton-nattklubbar-milano-2027',
      'capodanno-locali-cenone-milano': 'nyarsuppe-galamiddag-show-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'nyarsafton-5-stjarniga-hotell-villor-slott-2027',
      'capodanno-coppie-romantico-milano': 'romantisk-nyarsafton-for-par-milano-2027',
      'capodanno-single-milano': 'nyarsafton-for-singlar-milano-2027',
      'capodanno-famiglie-bambini-milano': 'nyarsafton-for-familjer-och-barn-milano-2027',
      'capodanno-over-30-40-milano': 'nyarsafton-30-plus-40-plus-milano-2027',
      'capodanno-techno-elettronica-milano': 'nyarsafton-techno-elektronisk-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'nyarsafton-latin-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'prisvard-budget-nyarsafton-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'nyarsafton-termer-spa-fjallstuga-2027',
    },
  },
  no: {
    h1: 'Nyttårsarrangementer i Milano 2027',
    slug: 'nyttaarsarrangementer-i-milano-2027',
    menuLabel: 'Nyttårsaften',
    nyePrefix: 'nyttaarsaften',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'nyttaarsarrangementer-i-milano-2027',
      'capodanno-speciale': 'spesielle-nyttaarsopplevelser-milano-2027',
      'capodanno-lombardia': 'nyttaarsaften-i-lombardia-2027',
      'capodanno-in-piazza': 'gratis-nyttaarsfeiring-paa-torg-milano-2027',
      'capodanno-rooftop-milano': 'nyttaarsaften-rooftop-takterrasser-milano-2027',
      'capodanno-discoteche-milano': 'nyttaarsaften-nattklubber-milano-2027',
      'capodanno-locali-cenone-milano': 'nyttaarsaften-gallamiddag-dinnershow-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'nyttaarsaften-5-stjerners-hoteller-villaer-slott-2027',
      'capodanno-coppie-romantico-milano': 'romantisk-nyttaarsaften-for-par-milano-2027',
      'capodanno-single-milano': 'nyttaarsaften-for-single-milano-2027',
      'capodanno-famiglie-bambini-milano': 'nyttaarsaften-for-familier-og-barn-milano-2027',
      'capodanno-over-30-40-milano': 'nyttaarsaften-over-30-40-milano-2027',
      'capodanno-techno-elettronica-milano': 'nyttaarsaften-techno-elektronisk-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'nyttaarsaften-latin-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'rimelig-budsjett-nyttaarsaften-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'nyttaarsaften-termer-spa-fjellhytte-2027',
    },
  },
  is: {
    h1: 'Gamlárskvöldsviðburðir í Mílanó 2027',
    slug: 'gamlarskvoldsvidburdir-i-milano-2027',
    menuLabel: 'Gamlárskvöld',
    nyePrefix: 'gamlarskvold',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'gamlarskvoldsvidburdir-i-milano-2027',
      'capodanno-speciale': 'serstakar-upplifanir-gamlarskvold-milano-2027',
      'capodanno-lombardia': 'gamlarskvold-i-lombardiu-2027',
      'capodanno-in-piazza': 'okeypis-gamlarskvold-a-torgum-milano-2027',
      'capodanno-rooftop-milano': 'gamlarskvold-rooftop-thaksvalir-milano-2027',
      'capodanno-discoteche-milano': 'gamlarskvold-naeturklubbar-milano-2027',
      'capodanno-locali-cenone-milano': 'hatidarkvoldverdur-syning-gamlarskvold-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'gamlarskvold-5-stjornu-hotel-villur-kastalar-2027',
      'capodanno-coppie-romantico-milano': 'romantiskt-gamlarskvold-fyrir-por-milano-2027',
      'capodanno-single-milano': 'gamlarskvold-fyrir-einhleypa-milano-2027',
      'capodanno-famiglie-bambini-milano': 'gamlarskvold-fyrir-fjolskyldur-og-born-milano-2027',
      'capodanno-over-30-40-milano': 'gamlarskvold-30-pluss-40-pluss-milano-2027',
      'capodanno-techno-elettronica-milano': 'techno-raftonlist-gamlarskvold-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latin-reggaeton-hiphop-gamlarskvold-milano-2027',
      'capodanno-economico-low-cost-milano': 'hagkvaemt-odyrt-gamlarskvold-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'gamlarskvold-heilsulind-spa-fjallaskali-2027',
    },
  },
  uk: {
    h1: 'Новорічні події у Мілані 2027',
    slug: 'novorichni-podii-u-milani-2027',
    menuLabel: 'Новий рік',
    nyePrefix: 'novyi-rik',
    citySlug: 'milani',
    categories: {
      'capodanno-2027': 'novorichni-podii-u-milani-2027',
      'capodanno-speciale': 'osoblyvyi-novyi-rik-u-milani-2027',
      'capodanno-lombardia': 'novyi-rik-u-lombardii-2027',
      'capodanno-in-piazza': 'novyi-rik-na-ploshchakh-milan-2027',
      'capodanno-rooftop-milano': 'novyi-rik-rooftop-terasy-milan-2027',
      'capodanno-discoteche-milano': 'novyi-rik-kluby-dyskoteky-milan-2027',
      'capodanno-locali-cenone-milano': 'novorichna-vecheria-shou-milan-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'novyi-rik-5-zirkovi-hoteli-vily-zamky-2027',
      'capodanno-coppie-romantico-milano': 'romantychnyi-novyi-rik-dlia-par-milan-2027',
      'capodanno-single-milano': 'novyi-rik-dlia-vilnykh-singles-milan-2027',
      'capodanno-famiglie-bambini-milano': 'simeinyi-novyi-rik-z-ditmy-milan-2027',
      'capodanno-over-30-40-milano': 'novyi-rik-30-plius-40-plius-milan-2027',
      'capodanno-techno-elettronica-milano': 'tekhno-elektronnyi-novyi-rik-milan-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reheton-khipkhop-novyi-rik-milan-2027',
      'capodanno-economico-low-cost-milano': 'biudzhetnyi-nedorohyi-novyi-rik-milan-2027',
      'capodanno-terme-spa-baita-montagna': 'novyi-rik-termy-spa-shale-v-horakh-2027',
    },
  },
  sq: {
    h1: 'Eventet e Vitit të Ri në Milano 2027',
    slug: 'eventet-e-vitit-te-ri-ne-milano-2027',
    menuLabel: 'Viti i Ri',
    nyePrefix: 'viti-i-ri',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'eventet-e-vitit-te-ri-ne-milano-2027',
      'capodanno-speciale': 'eksperienca-speciale-viti-i-ri-milano-2027',
      'capodanno-lombardia': 'viti-i-ri-ne-lombardi-2027',
      'capodanno-in-piazza': 'viti-i-ri-ne-sheshe-falas-milano-2027',
      'capodanno-rooftop-milano': 'viti-i-ri-rooftop-tarraca-milano-2027',
      'capodanno-discoteche-milano': 'viti-i-ri-klube-diskoteka-milano-2027',
      'capodanno-locali-cenone-milano': 'darka-gala-viti-i-ri-show-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'viti-i-ri-hotele-5-yje-vila-keshtjella-2027',
      'capodanno-coppie-romantico-milano': 'viti-i-ri-romantik-cifte-milano-2027',
      'capodanno-single-milano': 'viti-i-ri-per-beqare-singles-milano-2027',
      'capodanno-famiglie-bambini-milano': 'viti-i-ri-familje-femije-milano-2027',
      'capodanno-over-30-40-milano': 'viti-i-ri-mbi-30-40-vjec-milano-2027',
      'capodanno-techno-elettronica-milano': 'viti-i-ri-techno-elektronike-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'viti-i-ri-latino-reggaeton-hiphop-milano-2027',
      'capodanno-economico-low-cost-milano': 'viti-i-ri-ekonomik-lire-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'viti-i-ri-terme-spa-mal-2027',
    },
  },
  sr: {
    h1: 'Događaji za doček Nove godine u Milanu 2027',
    slug: 'dogadaji-za-docek-nove-godine-u-milanu-2027',
    menuLabel: 'Нова година',
    nyePrefix: 'docek-nove-godine',
    citySlug: 'milanu',
    categories: {
      'capodanno-2027': 'dogadaji-za-docek-nove-godine-u-milanu-2027',
      'capodanno-speciale': 'posebni-docek-nove-godine-u-milanu-2027',
      'capodanno-lombardia': 'docek-nove-godine-u-lombardiji-2027',
      'capodanno-in-piazza': 'besplatan-docek-na-trgu-u-milanu-2027',
      'capodanno-rooftop-milano': 'rooftop-docek-nove-godine-u-milanu-2027',
      'capodanno-discoteche-milano': 'klubovi-diskoteke-docek-u-milanu-2027',
      'capodanno-locali-cenone-milano': 'svecana-vecera-docek-u-milanu-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'hoteli-5-zvezdica-vile-zamkovi-docek-2027',
      'capodanno-coppie-romantico-milano': 'romanticni-docek-za-parove-u-milanu-2027',
      'capodanno-single-milano': 'docek-za-slobodne-singles-u-milanu-2027',
      'capodanno-famiglie-bambini-milano': 'porodicni-docek-sa-decom-u-milanu-2027',
      'capodanno-over-30-40-milano': 'docek-30-plus-40-plus-u-milanu-2027',
      'capodanno-techno-elettronica-milano': 'tehno-elektronski-docek-u-milanu-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-docek-u-milanu-2027',
      'capodanno-economico-low-cost-milano': 'povoljan-jeftin-docek-u-milanu-2027',
      'capodanno-terme-spa-baita-montagna': 'terme-spa-planinska-brvnara-docek-2027',
    },
  },
  bs: {
    h1: 'Događaji za Novu godinu u Milanu 2027',
    slug: 'dogadaji-za-novu-godinu-u-milanu-2027',
    menuLabel: 'Nova godina',
    nyePrefix: 'nova-godina',
    citySlug: 'milanu',
    categories: {
      'capodanno-2027': 'dogadaji-za-novu-godinu-u-milanu-2027',
      'capodanno-speciale': 'posebna-iskustva-nova-godina-milano-2027',
      'capodanno-lombardia': 'nova-godina-u-lombardiji-2027',
      'capodanno-in-piazza': 'besplatna-nova-godina-na-trgovima-milano-2027',
      'capodanno-rooftop-milano': 'rooftop-terase-nova-godina-milano-2027',
      'capodanno-discoteche-milano': 'klubovi-diskoteke-nova-godina-u-milanu-2027',
      'capodanno-locali-cenone-milano': 'svecana-vecera-show-nova-godina-u-milanu-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'hoteli-5-zvjezdica-vile-dvorci-docek-2027',
      'capodanno-coppie-romantico-milano': 'romanticna-nova-godina-za-parove-milano-2027',
      'capodanno-single-milano': 'nova-godina-za-slobodne-milano-2027',
      'capodanno-famiglie-bambini-milano': 'nova-godina-za-porodice-i-djecu-milano-2027',
      'capodanno-over-30-40-milano': 'nova-godina-preko-30-40-godina-milano-2027',
      'capodanno-techno-elettronica-milano': 'techno-elektronska-nova-godina-u-milanu-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-nova-godina-u-milanu-2027',
      'capodanno-economico-low-cost-milano': 'povoljna-budzetska-nova-godina-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'terme-spa-planinska-koliba-nova-godina-2027',
    },
  },
  mk: {
    h1: 'Настани за Нова година во Милано 2027',
    slug: 'nastani-za-nova-godina-vo-milano-2027',
    menuLabel: 'Нова година',
    nyePrefix: 'docek-na-nova-godina',
    citySlug: 'milano',
    categories: {
      'capodanno-2027': 'nastani-za-nova-godina-vo-milano-2027',
      'capodanno-speciale': 'specijalni-iskustva-nova-godina-milano-2027',
      'capodanno-lombardia': 'nova-godina-vo-lombardija-2027',
      'capodanno-in-piazza': 'besplatna-nova-godina-na-plostad-milano-2027',
      'capodanno-rooftop-milano': 'rooftop-terasi-nova-godina-milano-2027',
      'capodanno-discoteche-milano': 'nokni-klubovi-diskoteki-nova-godina-milano-2027',
      'capodanno-locali-cenone-milano': 'svecena-vecera-sou-nova-godina-milano-2027',
      'capodanno-hotel-5-stelle-ville-castelli': 'hoteli-5-zvezdi-vili-zamoci-nova-godina-2027',
      'capodanno-coppie-romantico-milano': 'romanticna-nova-godina-za-parovi-milano-2027',
      'capodanno-single-milano': 'nova-godina-za-slobodni-singles-milano-2027',
      'capodanno-famiglie-bambini-milano': 'semejna-nova-godina-so-deca-milano-2027',
      'capodanno-over-30-40-milano': 'nova-godina-nad-30-40-godini-milano-2027',
      'capodanno-techno-elettronica-milano': 'tehno-elektronska-nova-godina-milano-2027',
      'capodanno-latino-reggaeton-hiphop-milano': 'latino-reggaeton-hiphop-nova-godina-milano-2027',
      'capodanno-economico-low-cost-milano': 'povolna-ekonomicna-nova-godina-milano-2027',
      'capodanno-terme-spa-baita-montagna': 'termi-spa-planinska-koliba-nova-godina-2027',
    },
  },
};

export function capodannoNavigation(locale: string): CapodannoLocaleNav {
  const code = (enabledLocaleCodes.includes(locale as LocaleCode) ? locale : 'en') as LocaleCode;
  return CAPODANNO_NAVIGATION[code];
}

export function capodannoCategorySlug(categoryId: string, locale: string): string {
  const nav = capodannoNavigation(locale);
  return nav.categories[categoryId] || nav.slug;
}

export function capodannoCategoryPath(categoryId: string, locale: string): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${capodannoCategorySlug(categoryId, locale)}`;
}

export function capodannoPath(locale: string): string {
  return capodannoCategoryPath('capodanno-2027', locale);
}

export function capodannoCategoryLanguagePaths(categoryId: string): Record<LocaleCode, string> {
  return Object.fromEntries(
    enabledLocaleCodes.map((locale) => [locale, capodannoCategoryPath(categoryId, locale)]),
  ) as Record<LocaleCode, string>;
}

export function capodannoCategoryHreflangAlternates(siteUrl: string, categoryId: string): Record<string, string> {
  return Object.fromEntries([
    ...enabledLocaleCodes.map((code) => [getLocaleDef(code)!.hreflang, `${siteUrl}${capodannoCategoryPath(categoryId, code)}`]),
    ['x-default', `${siteUrl}${capodannoCategoryPath(categoryId, 'en')}`],
  ]);
}

export function capodannoEventSlug(baseSlug: string, locale: string): string {
  const nav = capodannoNavigation(locale);
  const rest = baseSlug
    .replace(/^capodanno-/u, '')
    .replace(/-milano(?=-|$)/gu, `-${nav.citySlug}`);
  return `${nav.nyePrefix}-${rest}-2027`;
}

export function capodannoEventPath(baseSlug: string, locale: string): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${capodannoEventSlug(baseSlug, locale)}`;
}

export function capodannoEventLanguagePaths(baseSlug: string): Record<LocaleCode, string> {
  return Object.fromEntries(
    enabledLocaleCodes.map((locale) => [locale, capodannoEventPath(baseSlug, locale)]),
  ) as Record<LocaleCode, string>;
}

export function capodannoEventHreflangAlternates(siteUrl: string, baseSlug: string): Record<string, string> {
  return Object.fromEntries([
    ...enabledLocaleCodes.map((code) => [getLocaleDef(code)!.hreflang, `${siteUrl}${capodannoEventPath(baseSlug, code)}`]),
    ['x-default', `${siteUrl}${capodannoEventPath(baseSlug, 'en')}`],
  ]);
}

const CAPODANNO_LOCALE_KEYS = Object.keys(CAPODANNO_NAVIGATION) as LocaleCode[];

const SLUG_TO_CAPODANNO_TARGET: ReadonlyMap<string, { type: 'category' | 'event'; id: string }> = (() => {
  const map = new Map<string, { type: 'category' | 'event'; id: string }>();
  for (const catId of CAPODANNO_CATEGORY_IDS) {
    map.set(catId, { type: 'category', id: catId });
    for (const locale of CAPODANNO_LOCALE_KEYS) {
      map.set(capodannoCategorySlug(catId, locale), { type: 'category', id: catId });
    }
  }
  for (const baseSlug of CAPODANNO_EVENT_BASE_SLUGS) {
    map.set(baseSlug, { type: 'event', id: baseSlug });
    for (const locale of CAPODANNO_LOCALE_KEYS) {
      map.set(capodannoEventSlug(baseSlug, locale), { type: 'event', id: baseSlug });
    }
  }
  return map;
})();

const LOCALIZED_SLUGS_BY_LOCALE: ReadonlyMap<string, readonly string[]> = (() => {
  const map = new Map<string, readonly string[]>();
  for (const locale of CAPODANNO_LOCALE_KEYS) {
    const categorySlugs = CAPODANNO_CATEGORY_IDS.map((catId) => capodannoCategorySlug(catId, locale));
    const eventSlugs = CAPODANNO_EVENT_BASE_SLUGS.map((baseSlug) => capodannoEventSlug(baseSlug, locale));
    map.set(locale, [...categorySlugs, ...eventSlugs]);
  }
  return map;
})();

export function resolveCapodannoCategoryIdByLocalizedSlug(slug: string, locale: string): string | undefined {
  const hit = SLUG_TO_CAPODANNO_TARGET.get(slug);
  if (hit && hit.type === 'category') return hit.id;
  return undefined;
}

export function resolveCapodannoEventBaseSlugByLocalizedSlug(slug: string, locale: string): string | undefined {
  const hit = SLUG_TO_CAPODANNO_TARGET.get(slug);
  if (hit && hit.type === 'event') return hit.id;
  return undefined;
}

const CAPODANNO_EV_DIR_PATTERN = ALL_EVENT_DIR_TOKENS.join('|');
const CAPODANNO_LEGACY_DETAIL_RE = new RegExp(`^(?:\\/[a-z]{2})?\\/(?:${CAPODANNO_EV_DIR_PATTERN})\\/capodanno-2027\\/([^/]+)\\/?$`, 'u');
const CAPODANNO_SINGLE_RE = new RegExp(`^(?:\\/[a-z]{2})?\\/(?:${CAPODANNO_EV_DIR_PATTERN})\\/([^/]+)\\/?$`, 'u');

export function capodannoAlternatePath(pathname: string, targetLocale: string): string | null {
  if (!CAPODANNO_LOCALE_KEYS.includes(targetLocale as LocaleCode)) return null;

  const legacyDetailMatch = pathname.match(CAPODANNO_LEGACY_DETAIL_RE);
  if (legacyDetailMatch) {
    const hit = SLUG_TO_CAPODANNO_TARGET.get(legacyDetailMatch[1]);
    if (hit && hit.type === 'event') {
      return capodannoEventPath(hit.id, targetLocale);
    }
  }

  const singleMatch = pathname.match(CAPODANNO_SINGLE_RE);
  if (!singleMatch) return null;
  const hit = SLUG_TO_CAPODANNO_TARGET.get(singleMatch[1]);
  if (!hit) return null;
  return hit.type === 'category'
    ? capodannoCategoryPath(hit.id, targetLocale)
    : capodannoEventPath(hit.id, targetLocale);
}

export function capodannoAllLocalizedSlugsForLocale(locale: string): string[] {
  const code = CAPODANNO_LOCALE_KEYS.includes(locale as LocaleCode) ? locale : 'en';
  return [...(LOCALIZED_SLUGS_BY_LOCALE.get(code) || [])];
}
