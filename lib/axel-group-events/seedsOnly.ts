import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { enabledLocaleCodes, getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { SLUG_TOKENS_35 } from '@/lib/i18n/localizedSlugs35';

export interface AxelGroupEventSeed {
  id: string;
  venueType: 'pineta' | 'zangola';
  venueId: string;
  venueName: string;
  city: string;
  province: string;
  region: string;
  streetAddress: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  startISO: string;
  endISO: string;
  ymd: string;
  dayNum: number;
  monthKey: 'dec' | 'jan';
  yearNum: number;
  dowKey: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  hours: string;
  doorsClub: string;
  minAge: string;
  entryEur: number;
  dinnerEur: number;
  vipEur: number;
  isNye: boolean;
  seriesName: string;
  performer: string;
  genres: string[];
  posterSrc: string;
  card4x5Src: string;
  assetKeys: [string, string, string, string];
  enSlug: string;
  itSlug: string;
  slugStem: string;
  nyeSlug: string;
  nextEventId: string;
}

export const AXEL_GROUP_DATED_EVENTS: readonly AxelGroupEventSeed[] = [
  {
    "id": "check-love-pineta-2026-12-04",
    "venueType": "pineta",
    "venueId": "v-pineta",
    "venueName": "Pineta Milano",
    "city": "Milano",
    "province": "MI",
    "region": "Lombardia",
    "streetAddress": "Via Messina, 38",
    "postalCode": "20154",
    "latitude": 45.4852,
    "longitude": 9.1706,
    "startISO": "2026-12-04T20:00:00+01:00",
    "endISO": "2026-12-05T05:00:00+01:00",
    "ymd": "2026-12-04",
    "dayNum": 4,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "fri",
    "hours": "20:00 - 05:00",
    "doorsClub": "23:00",
    "minAge": "20+",
    "entryEur": 15,
    "dinnerEur": 35,
    "vipEur": 250,
    "isNye": false,
    "seriesName": "Check&Love · Interactive Dinner & Party",
    "performer": "Check&Love Matchmaking Format & Pineta Milano Resident DJs",
    "genres": [
      "Commercial",
      "House",
      "Italian Hits",
      "Dinner Show"
    ],
    "posterSrc": "/images/events/weekly-posters/check-love-pineta-2026-12-04.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/check-love-pineta-2026-12-04.webp",
    "assetKeys": [
      "pineta-milano-ingresso-01",
      "pineta-milano-cena-01",
      "pineta-milano-lounge-01",
      "pineta-milano-party-01"
    ],
    "enSlug": "check-and-love-pineta-milano-friday-december-4-2026",
    "itSlug": "check-and-love-pineta-milano-venerdi-4-dicembre-2026",
    "slugStem": "check-and-love-pineta-milano-2026-12-04",
    "nyeSlug": "capodanno-pineta-milano",
    "nextEventId": "zangola-ciuffo-frankie-p-2026-12-05"
  },
  {
    "id": "zangola-ciuffo-frankie-p-2026-12-05",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-05T23:59:00+01:00",
    "endISO": "2026-12-06T04:00:00+01:00",
    "ymd": "2026-12-05",
    "dayNum": 5,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "sat",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "I'M Zangola Season Opening",
    "performer": "Ciuffo DJ & Frankie P.",
    "genres": [
      "Vocal House",
      "Nu-Disco",
      "Club Classics"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-ciuffo-frankie-p-2026-12-05.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-ciuffo-frankie-p-2026-12-05.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-opening-ciuffo-frankie-p-december-5-2026",
    "itSlug": "zangola-madonna-di-campiglio-opening-ciuffo-frankie-p-5-dicembre-2026",
    "slugStem": "zangola-campiglio-ciuffo-frankie-p-2026-12-05",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-sante-sansone-2026-12-06"
  },
  {
    "id": "zangola-sante-sansone-2026-12-06",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-06T23:59:00+01:00",
    "endISO": "2026-12-07T04:00:00+01:00",
    "ymd": "2026-12-06",
    "dayNum": 6,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "sun",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "I'M Zangola Tech-House Showcase",
    "performer": "Sante Sansone",
    "genres": [
      "Tech-House",
      "House",
      "Electronic"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-sante-sansone-2026-12-06.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-sante-sansone-2026-12-06.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-sante-sansone-sunday-december-6-2026",
    "itSlug": "zangola-madonna-di-campiglio-sante-sansone-domenica-6-dicembre-2026",
    "slugStem": "zangola-campiglio-sante-sansone-2026-12-06",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-bollo-immacolata-2026-12-07"
  },
  {
    "id": "zangola-bollo-immacolata-2026-12-07",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-07T23:59:00+01:00",
    "endISO": "2026-12-08T04:00:00+01:00",
    "ymd": "2026-12-07",
    "dayNum": 7,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "mon",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "VillaPapeete F**k Winter",
    "performer": "Bollo DJ · VillaPapeete Tour",
    "genres": [
      "Vocal House",
      "Italian Hits",
      "Club Show"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-bollo-immacolata-2026-12-07.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-bollo-immacolata-2026-12-07.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-villapapeete-bollo-december-7-2026",
    "itSlug": "zangola-madonna-di-campiglio-villapapeete-bollo-7-dicembre-2026",
    "slugStem": "zangola-campiglio-villapapeete-bollo-2026-12-07",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-alessio-sisani-2026-12-12"
  },
  {
    "id": "zangola-alessio-sisani-2026-12-12",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-12T23:59:00+01:00",
    "endISO": "2026-12-13T04:00:00+01:00",
    "ymd": "2026-12-12",
    "dayNum": 12,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "sat",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 2,
    "dinnerEur": 0,
    "vipEur": 800,
    "isNye": false,
    "seriesName": "I'M Zangola Saturday",
    "performer": "Alessio Sisani",
    "genres": [
      "House",
      "Afro-House",
      "Commercial"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-alessio-sisani-2026-12-12.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-alessio-sisani-2026-12-12.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-alessio-sisani-saturday-december-12-2026",
    "itSlug": "zangola-madonna-di-campiglio-alessio-sisani-sabato-12-dicembre-2026",
    "slugStem": "zangola-campiglio-alessio-sisani-2026-12-12",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-mazay-2026-12-19"
  },
  {
    "id": "zangola-mazay-2026-12-19",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-19T23:59:00+01:00",
    "endISO": "2026-12-20T04:00:00+01:00",
    "ymd": "2026-12-19",
    "dayNum": 19,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "sat",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 2,
    "dinnerEur": 0,
    "vipEur": 800,
    "isNye": false,
    "seriesName": "I'M Zangola Pre-Christmas",
    "performer": "Mazay DJ",
    "genres": [
      "Melodic House",
      "Indie Dance",
      "Club Hits"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-mazay-2026-12-19.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-mazay-2026-12-19.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-mazay-pre-christmas-december-19-2026",
    "itSlug": "zangola-madonna-di-campiglio-mazay-sabato-19-dicembre-2026",
    "slugStem": "zangola-campiglio-mazay-2026-12-19",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-mazay-santo-stefano-2026-12-26"
  },
  {
    "id": "zangola-mazay-santo-stefano-2026-12-26",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-26T23:59:00+01:00",
    "endISO": "2026-12-27T04:00:00+01:00",
    "ymd": "2026-12-26",
    "dayNum": 26,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "sat",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 2,
    "dinnerEur": 0,
    "vipEur": 800,
    "isNye": false,
    "seriesName": "I'M Zangola Santo Stefano",
    "performer": "Mazay DJ",
    "genres": [
      "Vocal House",
      "Disco House",
      "Club Classics"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-mazay-santo-stefano-2026-12-26.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-mazay-santo-stefano-2026-12-26.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-boxing-day-mazay-december-26-2026",
    "itSlug": "zangola-madonna-di-campiglio-santo-stefano-mazay-26-dicembre-2026",
    "slugStem": "zangola-campiglio-santo-stefano-2026-12-26",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-toy-tonics-2026-12-27"
  },
  {
    "id": "zangola-toy-tonics-2026-12-27",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-27T23:59:00+01:00",
    "endISO": "2026-12-28T04:00:00+01:00",
    "ymd": "2026-12-27",
    "dayNum": 27,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "sun",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "Toy Tonics Jam",
    "performer": "Kapote & Lele Sacchi (Toy Tonics Berlin)",
    "genres": [
      "Italo-Disco",
      "Funky House",
      "Nu-Disco"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-toy-tonics-2026-12-27.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-toy-tonics-2026-12-27.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-toy-tonics-kapote-lele-sacchi-december-27-2026",
    "itSlug": "zangola-madonna-di-campiglio-toy-tonics-kapote-lele-sacchi-27-dicembre-2026",
    "slugStem": "zangola-campiglio-toy-tonics-2026-12-27",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-club-splendore-2026-12-28"
  },
  {
    "id": "zangola-club-splendore-2026-12-28",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-28T23:59:00+01:00",
    "endISO": "2026-12-29T04:00:00+01:00",
    "ymd": "2026-12-28",
    "dayNum": 28,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "mon",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "Club Splendore",
    "performer": "Nicola Zucchi · Club Splendore",
    "genres": [
      "Vocal House",
      "Disco Glam",
      "Club Classics"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-club-splendore-2026-12-28.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-club-splendore-2026-12-28.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-club-splendore-nicola-zucchi-december-28-2026",
    "itSlug": "zangola-madonna-di-campiglio-club-splendore-nicola-zucchi-28-dicembre-2026",
    "slugStem": "zangola-campiglio-club-splendore-2026-12-28",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-twish-2026-12-29"
  },
  {
    "id": "zangola-twish-2026-12-29",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-29T23:59:00+01:00",
    "endISO": "2026-12-30T04:00:00+01:00",
    "ymd": "2026-12-29",
    "dayNum": 29,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "tue",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "I'M Zangola · Twish",
    "performer": "Twish Resident & Guest DJs",
    "genres": [
      "House",
      "Urban Chic",
      "International Hits"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-twish-2026-12-29.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-twish-2026-12-29.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-twish-party-tuesday-december-29-2026",
    "itSlug": "zangola-madonna-di-campiglio-twish-martedi-29-dicembre-2026",
    "slugStem": "zangola-campiglio-twish-2026-12-29",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-double-clash-2026-12-30"
  },
  {
    "id": "zangola-double-clash-2026-12-30",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-30T23:59:00+01:00",
    "endISO": "2026-12-31T04:00:00+01:00",
    "ymd": "2026-12-30",
    "dayNum": 30,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "wed",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "Double Clash Pre-NYE",
    "performer": "Ciuffo DJ vs Frankie P. (Double Clash)",
    "genres": [
      "Vocal House",
      "Club Classics",
      "Party Anthems"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-double-clash-2026-12-30.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-double-clash-2026-12-30.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-double-clash-ciuffo-frankie-p-december-30-2026",
    "itSlug": "zangola-madonna-di-campiglio-double-clash-ciuffo-frankie-p-30-dicembre-2026",
    "slugStem": "zangola-campiglio-double-clash-2026-12-30",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-capodanno-mazay-2026-12-31"
  },
  {
    "id": "zangola-capodanno-mazay-2026-12-31",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2026-12-31T23:59:00+01:00",
    "endISO": "2027-01-01T05:00:00+01:00",
    "ymd": "2026-12-31",
    "dayNum": 31,
    "monthKey": "dec",
    "yearNum": 2026,
    "dowKey": "thu",
    "hours": "01:30 - 05:00",
    "doorsClub": "01:30",
    "minAge": "21+",
    "entryEur": 90,
    "dinnerEur": 0,
    "vipEur": 2000,
    "isNye": true,
    "seriesName": "New Year's Eve 2027 · Capodanno",
    "performer": "Mazay DJ · NYE 2027 Gala Party",
    "genres": [
      "House",
      "Club Anthems",
      "NYE Champagne Show"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-capodanno-mazay-2026-12-31.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-capodanno-mazay-2026-12-31.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-new-years-eve-2027-mazay-december-31-2026",
    "itSlug": "capodanno-2027-zangola-madonna-di-campiglio-mazay-31-dicembre-2026",
    "slugStem": "zangola-campiglio-nye-2027-mazay-2026-12-31",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-dj-a-ninetyfour-andrerrated-2027-01-02"
  },
  {
    "id": "zangola-dj-a-ninetyfour-andrerrated-2027-01-02",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2027-01-02T23:59:00+01:00",
    "endISO": "2027-01-03T04:00:00+01:00",
    "ymd": "2027-01-02",
    "dayNum": 2,
    "monthKey": "jan",
    "yearNum": 2027,
    "dowKey": "sat",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "Wood x Purgatorio",
    "performer": "DJ A-Ninetyfour & Andrerrated",
    "genres": [
      "Tech-House",
      "Afro-Tech",
      "Electronic"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-dj-a-ninetyfour-andrerrated-2027-01-02.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-dj-a-ninetyfour-andrerrated-2027-01-02.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-wood-purgatorio-a-ninetyfour-january-2-2027",
    "itSlug": "zangola-madonna-di-campiglio-wood-purgatorio-a-ninetyfour-2-gennaio-2027",
    "slugStem": "zangola-campiglio-wood-purgatorio-2027-01-02",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-ale-maestri-2027-01-03"
  },
  {
    "id": "zangola-ale-maestri-2027-01-03",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2027-01-03T23:59:00+01:00",
    "endISO": "2027-01-04T04:00:00+01:00",
    "ymd": "2027-01-03",
    "dayNum": 3,
    "monthKey": "jan",
    "yearNum": 2027,
    "dowKey": "sun",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "Mi Casa Showcase",
    "performer": "Ale Maestri & Special Guests",
    "genres": [
      "Soulful House",
      "Latin House",
      "Vocal Club"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-ale-maestri-2027-01-03.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-ale-maestri-2027-01-03.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-mi-casa-ale-maestri-sunday-january-3-2027",
    "itSlug": "zangola-madonna-di-campiglio-mi-casa-ale-maestri-domenica-3-gennaio-2027",
    "slugStem": "zangola-campiglio-mi-casa-2027-01-03",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-mazay-2027-01-04"
  },
  {
    "id": "zangola-mazay-2027-01-04",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2027-01-04T23:59:00+01:00",
    "endISO": "2027-01-05T04:00:00+01:00",
    "ymd": "2027-01-04",
    "dayNum": 4,
    "monthKey": "jan",
    "yearNum": 2027,
    "dowKey": "mon",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "I'M Zangola Epiphany Week",
    "performer": "Mazay DJ",
    "genres": [
      "Melodic House",
      "Club Edits",
      "Dance Anthems"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-mazay-2027-01-04.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-mazay-2027-01-04.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-mazay-monday-january-4-2027",
    "itSlug": "zangola-madonna-di-campiglio-mazay-lunedi-4-gennaio-2027",
    "slugStem": "zangola-campiglio-mazay-2027-01-04",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-bollo-epifania-2027-01-05"
  },
  {
    "id": "zangola-bollo-epifania-2027-01-05",
    "venueType": "zangola",
    "venueId": "v-pineta",
    "venueName": "Zangola Club Madonna di Campiglio",
    "city": "Madonna di Campiglio",
    "province": "TN",
    "region": "Trentino-Alto Adige",
    "streetAddress": "Via Nambino, 17",
    "postalCode": "38086",
    "latitude": 46.2356,
    "longitude": 10.8312,
    "startISO": "2027-01-05T23:59:00+01:00",
    "endISO": "2027-01-06T04:00:00+01:00",
    "ymd": "2027-01-05",
    "dayNum": 5,
    "monthKey": "jan",
    "yearNum": 2027,
    "dowKey": "tue",
    "hours": "00:30 - 04:00",
    "doorsClub": "00:30",
    "minAge": "21+",
    "entryEur": 12,
    "dinnerEur": 0,
    "vipEur": 1000,
    "isNye": false,
    "seriesName": "VillaPapeete Epiphany Finale",
    "performer": "Bollo DJ · VillaPapeete F**k Winter",
    "genres": [
      "Vocal House",
      "Italian Sing-Along",
      "Club Show"
    ],
    "posterSrc": "/images/events/weekly-posters/zangola-bollo-epifania-2027-01-05.webp",
    "card4x5Src": "/images/events/cards-4x5/weekly-posters/zangola-bollo-epifania-2027-01-05.webp",
    "assetKeys": [
      "zangola-campiglio-01",
      "zangola-campiglio-02",
      "zangola-campiglio-03",
      "zangola-campiglio-04"
    ],
    "enSlug": "zangola-madonna-di-campiglio-villapapeete-bollo-epiphany-january-5-2027",
    "itSlug": "zangola-madonna-di-campiglio-villapapeete-bollo-epifania-5-gennaio-2027",
    "slugStem": "zangola-campiglio-villapapeete-epifania-2027-01-05",
    "nyeSlug": "capodanno-in-baita-motoslitta-livigno-bormio-madesimo-tonale",
    "nextEventId": "zangola-ciuffo-frankie-p-2026-12-05"
  }
] as unknown as readonly AxelGroupEventSeed[];


let MAP_READY = false;
const SLUGS_MAP: Record<string, Record<LocaleCode, string>> = {};
function initMap() {
  if (MAP_READY) return;
  MAP_READY = true;
  for (const ev of AXEL_GROUP_DATED_EVENTS) {
    const m = {} as Record<LocaleCode, string>;
    for (const loc of enabledLocaleCodes) {
      if (loc === 'en') m[loc] = ev.enSlug;
      else if (loc === 'it') m[loc] = ev.itSlug;
      else {
        const tk = SLUG_TOKENS_35[loc] || SLUG_TOKENS_35.en;
        m[loc] = `${ev.slugStem}-${tk.party}-${loc}`;
      }
    }
    SLUGS_MAP[ev.id] = m;
  }
}
export function axelGroupSearchPath(id: string, rawLocale: string): string {
  initMap();
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  const slug = SLUGS_MAP[id]?.[loc] || SLUGS_MAP[id]?.en || id;
  return `${localePrefix(loc)}/${getLocalizedDir35('events', loc)}/${slug}`;
}
