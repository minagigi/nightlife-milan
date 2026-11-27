import { MilanZone, Venue, VenueCategory } from '@/lib/types';

export const BERGAMO_BRESCIA_VENUE_IDS = [
  'v-setai-bergamo',
  'v-capogiro-bergamo',
  'v-tiky-klub-bergamo',
  'v-zero-club-bergamo',
  'v-qi-clubbing-brescia',
  'v-number-one-brescia',
] as const;

export type BergamoBresciaVenueId = (typeof BERGAMO_BRESCIA_VENUE_IDS)[number];

export const BERGAMO_BRESCIA_VENUE_ID_SET: ReadonlySet<string> = new Set(BERGAMO_BRESCIA_VENUE_IDS);

export interface BergamoBresciaCityMeta {
  province: 'BG' | 'BS';
  cityIt: string;
  cityEn: string;
  inCityIt: string;
  inCityEn: string;
  postalCityIt: string;
  postalCityEn: string;
  shortZoneLabel: string;
  highwayExitIt: string;
  highwayExitEn: string;
  driveFromMilanMin: number;
}

export const BG_BS_CITY_META_BY_ID: Readonly<Record<BergamoBresciaVenueId, BergamoBresciaCityMeta>> = {
  'v-setai-bergamo': {
    province: 'BG',
    cityIt: 'Orio al Serio (Bergamo)',
    cityEn: 'Orio al Serio (Bergamo)',
    inCityIt: 'a Orio al Serio (Bergamo)',
    inCityEn: 'in Orio al Serio (Bergamo)',
    postalCityIt: '24050 Orio al Serio (BG)',
    postalCityEn: '24050 Orio al Serio (Bergamo, BG)',
    shortZoneLabel: 'Orio al Serio · Bergamo (A4 / BGY)',
    highwayExitIt: 'Casello A4 Bergamo / Aeroporto Orio al Serio BGY (4 min)',
    highwayExitEn: 'A4 Bergamo exit / Milan Bergamo Airport BGY (4 min)',
    driveFromMilanMin: 35,
  },
  'v-capogiro-bergamo': {
    province: 'BG',
    cityIt: 'Curno (Bergamo)',
    cityEn: 'Curno (Bergamo)',
    inCityIt: 'a Curno (Bergamo)',
    inCityEn: 'in Curno (Bergamo)',
    postalCityIt: '24035 Curno (BG)',
    postalCityEn: '24035 Curno (Bergamo, BG)',
    shortZoneLabel: 'Curno · Bergamo Ovest',
    highwayExitIt: 'Casello A4 Dalmine / Bergamo via SS671 Asse Interurbano (8 min)',
    highwayExitEn: 'A4 Dalmine / Bergamo exit via SS671 ring road (8 min)',
    driveFromMilanMin: 35,
  },
  'v-tiky-klub-bergamo': {
    province: 'BG',
    cityIt: 'Seriate (Bergamo)',
    cityEn: 'Seriate (Bergamo)',
    inCityIt: 'a Seriate (Bergamo)',
    inCityEn: 'in Seriate (Bergamo)',
    postalCityIt: '24068 Seriate (BG)',
    postalCityEn: '24068 Seriate (Bergamo, BG)',
    shortZoneLabel: 'Seriate · Bergamo Est (A4)',
    highwayExitIt: 'Casello A4 Seriate / Bergamo Est (5 min lungo Via Nazionale)',
    highwayExitEn: 'A4 Seriate / Bergamo East exit (5 min along Via Nazionale)',
    driveFromMilanMin: 40,
  },
  'v-zero-club-bergamo': {
    province: 'BG',
    cityIt: 'Bergamo Centro',
    cityEn: 'Bergamo City Center',
    inCityIt: 'a Bergamo Centro',
    inCityEn: 'in Downtown Bergamo',
    postalCityIt: '24122 Bergamo (BG)',
    postalCityEn: '24122 Bergamo (BG)',
    shortZoneLabel: 'Bergamo Centro · Via Baschenis',
    highwayExitIt: 'Casello A4 Bergamo (7 min) · Stazione FS Bergamo (10 min a piedi)',
    highwayExitEn: 'A4 Bergamo exit (7 min) · Bergamo Train Station (10 min walk)',
    driveFromMilanMin: 40,
  },
  'v-qi-clubbing-brescia': {
    province: 'BS',
    cityIt: 'Erbusco (Franciacorta, Brescia)',
    cityEn: 'Erbusco (Franciacorta, Brescia)',
    inCityIt: 'in Franciacorta a Erbusco (Brescia)',
    inCityEn: 'in Franciacorta, Erbusco (Brescia)',
    postalCityIt: '25030 Erbusco (BS)',
    postalCityEn: '25030 Erbusco (Franciacorta, BS)',
    shortZoneLabel: 'Erbusco · Franciacorta (BS)',
    highwayExitIt: 'Casello A4 Rovato (2 min reali dal casello in Via dell’Industria 83)',
    highwayExitEn: 'A4 Rovato exit (2 min from toll booth on Via dell’Industria 83)',
    driveFromMilanMin: 50,
  },
  'v-number-one-brescia': {
    province: 'BS',
    cityIt: 'Corte Franca (Franciacorta, Brescia)',
    cityEn: 'Corte Franca (Franciacorta, Brescia)',
    inCityIt: 'a Corte Franca in Franciacorta (Brescia)',
    inCityEn: 'in Corte Franca, Franciacorta (Brescia)',
    postalCityIt: '25040 Corte Franca (BS)',
    postalCityEn: '25040 Corte Franca (Franciacorta, BS)',
    shortZoneLabel: 'Corte Franca · Franciacorta / Iseo (BS)',
    highwayExitIt: 'Casello A4 Rovato o Palazzolo sull’Oglio -> SP XI verso Lago d’Iseo (12 min)',
    highwayExitEn: 'A4 Rovato or Palazzolo sull’Oglio exit -> SP XI toward Lake Iseo (12 min)',
    driveFromMilanMin: 55,
  },
};

export function isBergamoBresciaVenueId(id?: string): id is BergamoBresciaVenueId {
  return Boolean(id && BERGAMO_BRESCIA_VENUE_ID_SET.has(id));
}

export const bergamoBresciaVenueBatch: Venue[] = [
  {
    id: 'v-setai-bergamo',
    slugs: { en: 'setai-club-bergamo', it: 'setai-club-bergamo-tavoli-vip' },
    address: {
      streetAddress: 'Località Portico, 21',
      addressLocality: 'Orio al Serio',
      addressRegion: 'BG',
      postalCode: '24050',
      addressCountry: 'IT',
    },
    coordinates: { latitude: 45.6672, longitude: 9.6989 },
    category: VenueCategory.CLUB,
    zone: MilanZone.PORTA_VENEZIA,
    sameAs: ['https://www.instagram.com/setaiclub/'],
    localizedContent: {
      name: { en: 'Setai Club Bergamo', it: 'Setai Club Bergamo' },
      description: {
        en: 'Bergamo’s flagship multi-room clubbing arena in Orio al Serio, 4 minutes from Milan Bergamo Airport (BGY) and the A4 motorway exit. Home to the historic Juice Tech-House Saturday showcase, Friday commercial and urban nights, holiday marathons, and New Year’s Eve 2027.',
        it: 'L’arena multisala di riferimento a Orio al Serio (Bergamo), a 4 minuti dall’Aeroporto BGY e dal casello A4. Casa storica delle notti Juice Tech-House del sabato, dei venerdì urban e commerciali, dei prefestivi di dicembre e del veglione di Capodanno 2027.',
      },
      dressCode: {
        en: 'Smart & Club Chic: Collared shirt or neat eveningwear recommended; no athletic tracksuits',
        it: 'Smart & Club Chic: Camicia o abbigliamento serale curato; vietate tute sportive',
      },
      altTextImg: {
        en: 'Setai Club Bergamo Orio al Serio main arena VIP tables and Juice tech-house night',
        it: 'Setai Club Bergamo Orio al Serio sala principale tavoli VIP e serata Juice tech-house',
      },
      insiderTip: {
        en: 'Book a Main Room Console or Elevated Privé table via WhatsApp before Friday afternoon: Orio al Serio draws guests from both Milan and Bergamo.',
        it: 'Prenota il tavolo Privé Rialzato o Console su WhatsApp entro il venerdì pomeriggio: la vicinanza al casello A4 richiama pubblico sia da Bergamo sia da Milano Est.',
      },
    },
    image: '/images/venues/bergamo-brescia/setai-club-bergamo.webp',
    gallery: [
      '/images/events/cards-4x5/partner-clubs/setai-club-bergamo.webp',
      '/images/seo-events/master/setai-01.webp',
      '/images/seo-events/master/setai-02.webp',
      '/images/seo-events/master/setai-03.webp',
      '/images/seo-events/master/setai-04.webp',
    ],
    isManaged: true,
    isPriority: false,
    isFeatured: true,
    priorityScore: 76,
    ageRange: '20-35',
    priceRange: '$$$',
    tags: ['Tech-House', 'Multisala Arena', 'Bergamo Orio BGY'],
  },
  {
    id: 'v-capogiro-bergamo',
    slugs: { en: 'capogiro-curno-bergamo', it: 'capogiro-curno-bergamo-tavoli-vip' },
    address: {
      streetAddress: 'Via Trento, 14',
      addressLocality: 'Curno',
      addressRegion: 'BG',
      postalCode: '24035',
      addressCountry: 'IT',
    },
    coordinates: { latitude: 45.6914, longitude: 9.6125 },
    category: VenueCategory.CLUB,
    zone: MilanZone.CORSO_COMO,
    sameAs: ['https://www.instagram.com/capogiro_bergamo/'],
    localizedContent: {
      name: { en: 'Capogiro Club Bergamo', it: 'Capogiro Club Bergamo' },
      description: {
        en: 'CaPoGiRo Joyclub in Curno (Bergamo) combines three distinct areas under one roof: the 21:00 Singing Dinner Party restaurant, the live karaoke Voice Bar from 23:30, and the Main Room playing house, revival, reggaeton, and commercial hits for a polished 25+ and 30+ adult crowd.',
        it: 'CaPoGiRo Joyclub in Via Trento 14 a Curno (Bergamo) unisce tre anime nella stessa serata: il ristorante Cena Party cantata dalle 21:00, il Voice Bar karaoke dal vivo dalle 23:30 e la Main Room house, revival, reggaeton e commerciale dedicata a un pubblico adulto curato 25+ e over 30.',
      },
      dressCode: {
        en: 'Adult Smart Elegant: Tailored shirt/blazer for men, chic cocktail or eveningwear for women (25+ selection)',
        it: 'Adult Smart Elegant: Camicia o giacca per uomo, abito curato per donna (selezione adulta 25+)',
      },
      altTextImg: {
        en: 'Capogiro Joyclub Curno Bergamo singing dinner show Voice Bar and VIP tables',
        it: 'Capogiro Joyclub Curno Bergamo cena cantata Voice Bar e tavoli VIP',
      },
      insiderTip: {
        en: 'Reserve the 21:00 Feel / Joyclub Dinner table and keep your table conversion into the club party so your group never waits at midnight.',
        it: 'Blocca il tavolo per la Cena Party delle 21:00 con mantenimento tavolo dopocena: vivi cena cantata, Voice Bar e pista senza fare coda a mezzanotte.',
      },
    },
    image: '/images/venues/bergamo-brescia/capogiro-curno-bergamo.webp',
    gallery: [
      '/images/events/cards-4x5/partner-clubs/capogiro-curno-bergamo.webp',
      '/images/seo-events/master/capogiro-01.webp',
      '/images/seo-events/master/capogiro-02.webp',
      '/images/seo-events/master/capogiro-03.webp',
      '/images/seo-events/master/capogiro-04.webp',
    ],
    isManaged: true,
    isPriority: false,
    isFeatured: true,
    priorityScore: 75,
    ageRange: '25-45',
    priceRange: '$$$',
    tags: ['Dinner Show', 'Voice Bar', 'Over 25 / 30+'],
  },
  {
    id: 'v-tiky-klub-bergamo',
    slugs: { en: 'tiky-klub-seriate-bergamo', it: 'tiky-klub-seriate-bergamo-tavoli-vip' },
    address: {
      streetAddress: 'Via Nazionale, 93',
      addressLocality: 'Seriate',
      addressRegion: 'BG',
      postalCode: '24068',
      addressCountry: 'IT',
    },
    coordinates: { latitude: 45.6828, longitude: 9.7269 },
    category: VenueCategory.CLUB,
    zone: MilanZone.ISOLA,
    sameAs: ['https://www.instagram.com/tikyklub/'],
    localizedContent: {
      name: { en: 'Tiky Klub Bergamo', it: 'Tiky Klub Bergamo' },
      description: {
        en: 'Intimate House and Tech-House boutique club on Via Nazionale 93 in Seriate (Bergamo East, 5 minutes from the A4 Seriate exit). Renowned for punchy club acoustics, Wednesday midweek groove sessions, Icon Tech-House Fridays, Saturday guest showcases, and NYE 2027.',
        it: 'Boutique club contemporaneo dedicato a House e Tech-House in Via Nazionale 93 a Seriate (Bergamo Est, a 5 minuti dal casello A4 Seriate). Punto di riferimento per acustica ravvicinata, mercoledì house infrasettimanale, venerdì Icon Tech-House, sabato guest showcase e Capodanno 2027.',
      },
      dressCode: {
        en: 'Contemporary Clubwear (18+): Clean dark club attire, smart streetwear; no athletic shorts or tracksuits',
        it: 'Contemporary Clubwear (18+): Look curato da club, total black o smart casual; no tute o pantaloncini',
      },
      altTextImg: {
        en: 'Tiky Klub Seriate Bergamo boutique house and tech-house DJ console and VIP booths',
        it: 'Tiky Klub Seriate Bergamo boutique club house tech-house consolle DJ e tavoli VIP',
      },
      insiderTip: {
        en: 'Intimate room capacity means Console Privé booths sell out fast on Friday Icon nights: lock in your group list on WhatsApp early.',
        it: 'La capienza raccolta rende i tavoli Privé vicino alla consolle ambitissimi nelle notti Icon del venerdì: prenota in anticipo su WhatsApp.',
      },
    },
    image: '/images/venues/bergamo-brescia/tiky-klub-seriate-bergamo.webp',
    gallery: [
      '/images/events/cards-4x5/partner-clubs/tiky-klub-seriate-bergamo.webp',
      '/images/seo-events/master/tiky-01.webp',
      '/images/seo-events/master/tiky-02.webp',
      '/images/seo-events/master/tiky-03.webp',
      '/images/seo-events/master/tiky-04.webp',
    ],
    isManaged: true,
    isPriority: false,
    isFeatured: true,
    priorityScore: 73,
    ageRange: '18-32',
    priceRange: '$$',
    tags: ['House', 'Tech-House', 'Boutique Club'],
  },
  {
    id: 'v-zero-club-bergamo',
    slugs: { en: 'zero-club-bergamo', it: 'zero-club-bergamo-tavoli-vip' },
    address: {
      streetAddress: 'Via Evaristo Baschenis, 9',
      addressLocality: 'Bergamo',
      addressRegion: 'BG',
      postalCode: '24122',
      addressCountry: 'IT',
    },
    coordinates: { latitude: 45.6929, longitude: 9.6644 },
    category: VenueCategory.CLUB,
    zone: MilanZone.BRERA,
    sameAs: ['https://www.instagram.com/zeroclub_bg/'],
    localizedContent: {
      name: { en: 'Zero Club Bergamo', it: 'Zero Club Bergamo' },
      description: {
        en: 'Downtown Bergamo’s dual-room club at Via Evaristo Baschenis 9, featuring a geometric LED-grid Main Room and an intimate velvet Club Room. Hosts Mercoledì Please university nights, Premiere Urban Fridays, Saturday electronic/indie showcases, and NYE 2027 (club membership card required at entry).',
        it: 'Il club a doppia sala nel cuore di Bergamo centro (Via Evaristo Baschenis 9), con Main Room a soffitto geometrico LED e intima Club Room riservata. Ospita il celebre Mercoledì Please universitario, i venerdì Premiere Urban, i sabati elettronici/indie e il Capodanno 2027 (ingresso con tessera associativa).',
      },
      dressCode: {
        en: 'Urban & Minimal Chic (Club membership required; valid physical photo ID mandatory)',
        it: 'Urban & Minimal Chic (Ingresso riservato con tessera associativa del club e documento fisico originale)',
      },
      altTextImg: {
        en: 'Zero Club Bergamo downtown Via Baschenis geometric LED ceiling main room and VIP privé',
        it: 'Zero Club Bergamo centro Via Baschenis sala principale LED geometrico e privé',
      },
      insiderTip: {
        en: 'Ask our WhatsApp Concierge for pre-registration instructions on the Zero Club membership card before arriving at Via Baschenis 9.',
        it: 'Chiedi al Concierge WhatsApp le indicazioni per la pre-registrazione della tessera associativa prima di arrivare in Via Baschenis 9.',
      },
    },
    image: '/images/venues/bergamo-brescia/zero-club-bergamo.webp',
    gallery: [
      '/images/events/cards-4x5/partner-clubs/zero-club-bergamo.webp',
      '/images/seo-events/master/zeroclub-01.webp',
      '/images/seo-events/master/zeroclub-02.webp',
      '/images/seo-events/master/zeroclub-03.webp',
      '/images/seo-events/master/zeroclub-04.webp',
    ],
    isManaged: true,
    isPriority: false,
    isFeatured: true,
    priorityScore: 74,
    ageRange: '19-32',
    priceRange: '$$',
    tags: ['Dual-Room', 'Urban & Electronic', 'Bergamo Centro'],
  },
  {
    id: 'v-qi-clubbing-brescia',
    slugs: { en: 'qi-clubbing-erbusco-brescia', it: 'qi-clubbing-erbusco-brescia-tavoli-vip' },
    address: {
      streetAddress: "Via dell'Industria, 83",
      addressLocality: 'Erbusco',
      addressRegion: 'BS',
      postalCode: '25030',
      addressCountry: 'IT',
    },
    coordinates: { latitude: 45.5768, longitude: 9.9881 },
    category: VenueCategory.CLUB,
    zone: MilanZone.SEMPIONE,
    sameAs: ['https://www.instagram.com/qiclubbing/', 'https://www.qiclubbing.com'],
    localizedContent: {
      name: { en: 'Qi Clubbing Franciacorta', it: 'Qi Clubbing Franciacorta' },
      description: {
        en: 'Franciacorta’s iconic luxury disco-restaurant and night club in Erbusco (Brescia), 2 minutes from the A4 Rovato exit. Famous for gourmet Dinner Shows paired with Franciacorta DOCG sparkling wines, glamorous Friday and Saturday club nights, Christmas Gala, and Gold Edition NYE 2027.',
        it: 'L’iconico disco-restaurant e luxury club della Franciacorta in Via dell’Industria 83 a Erbusco (Brescia), a 2 minuti dal casello A4 Rovato. Celebre per i gourmet Dinner Show con bollicine Franciacorta DOCG, i weekend glamour del venerdì e sabato, il Gala di Natale e il Capodanno Gold Edition 2027.',
      },
      dressCode: {
        en: 'Strictly Chic & Glamour: Tailored jacket/shirt for men, evening or cocktail dress for women',
        it: 'Rigorosamente Chic & Glamour: Camicia e giacca consigliata per uomo, abito elegante o cocktail per donna',
      },
      altTextImg: {
        en: 'Qi Clubbing Erbusco Franciacorta Brescia luxury dinner show and VIP champagne privé',
        it: 'Qi Clubbing Erbusco Franciacorta Brescia dinner show di lusso e tavoli VIP privé',
      },
      insiderTip: {
        en: 'Located right off the A4 Rovato exit (50 min from Milan), Qi Clubbing is the top Franciacorta choice when you want gourmet dinner + VIP bottle table in one venue.',
        it: 'A soli 2 minuti dal casello A4 Rovato (50 min da Milano), Qi Clubbing è la prima scelta in Franciacorta per unire cena spettacolo gourmet e tavolo Privé senza spostare l’auto.',
      },
    },
    image: '/images/venues/bergamo-brescia/qi-clubbing-erbusco-brescia.webp',
    gallery: [
      '/images/events/cards-4x5/partner-clubs/qi-clubbing-erbusco-brescia.webp',
      '/images/seo-events/master/qiclubbing-01.webp',
      '/images/seo-events/master/qiclubbing-02.webp',
      '/images/seo-events/master/qiclubbing-03.webp',
      '/images/seo-events/master/qiclubbing-04.webp',
    ],
    isManaged: true,
    isPriority: false,
    isFeatured: true,
    priorityScore: 78,
    ageRange: '24-45',
    priceRange: '$$$$',
    tags: ['Luxury Dinner Show', 'Franciacorta', 'VIP Privé'],
  },
  {
    id: 'v-number-one-brescia',
    slugs: { en: 'number-one-corte-franca-brescia', it: 'number-one-corte-franca-brescia-tavoli-vip' },
    address: {
      streetAddress: 'Via Provinciale, 1/B',
      addressLocality: 'Corte Franca',
      addressRegion: 'BS',
      postalCode: '25040',
      addressCountry: 'IT',
    },
    coordinates: { latitude: 45.6295, longitude: 10.0189 },
    category: VenueCategory.CLUB,
    zone: MilanZone.PORTA_ROMANA,
    sameAs: ['https://www.instagram.com/numberonedisco/', 'https://numberone.it'],
    localizedContent: {
      name: { en: 'Number One Franciacorta', it: 'Number One Franciacorta' },
      description: {
        en: 'One of Italy’s most famous historic multisala megaclubs, located at Via Provinciale 1/B in Corte Franca (Franciacorta / Lake Iseo, Brescia). Multiple music arenas, panoramic VIP balconies, Saturday mega-nights, December 7 Immacolata, December 22 Student Xmas Festival, and NYE 2027.',
        it: 'Uno dei megaclub multisala più celebri d’Italia e d’Europa, situato in Via Provinciale 1/B a Corte Franca (tra Franciacorta e Lago d’Iseo, Brescia). Sale multiple per genere musicale, balconate VIP panoramiche, grandi sabati notte, prefestivo 7 dicembre, THE END Student Xmas Party del 22 dicembre e Capodanno 2027.',
      },
      dressCode: {
        en: 'Smart Club Casual: Neat club attire; valid physical ID mandatory at door security',
        it: 'Smart Club Casual: Abbigliamento curato da club; documento d’identità fisico originale obbligatorio',
      },
      altTextImg: {
        en: 'Number One Disco Corte Franca Brescia multisala megaclub arena and VIP balconies',
        it: 'Number One Disco Corte Franca Brescia megaclub multisala e balconate tavoli VIP',
      },
      insiderTip: {
        en: 'Reserve an elevated Balcony VIP Table to overlook the main arena stage with dedicated bottle service and priority fast-track entry.',
        it: 'Scegli un tavolo VIP in Balconata panoramica per dominare il palco centrale con ingresso prioritario salta-fila e servizio bottiglie dedicato.',
      },
    },
    image: '/images/venues/bergamo-brescia/number-one-corte-franca-brescia.webp',
    gallery: [
      '/images/events/cards-4x5/partner-clubs/number-one-corte-franca-brescia.webp',
      '/images/seo-events/master/numberone-01.webp',
      '/images/seo-events/master/numberone-02.webp',
      '/images/seo-events/master/numberone-03.webp',
      '/images/seo-events/master/numberone-04.webp',
    ],
    isManaged: true,
    isPriority: false,
    isFeatured: true,
    priorityScore: 77,
    ageRange: '18-35',
    priceRange: '$$$',
    tags: ['Multisala Megaclub', 'Festival Arena', 'Franciacorta BS'],
  },
];
