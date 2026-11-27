import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import {
  enabledLocaleCodes,
  getLocaleDef,
  indexedLocaleCodes,
  localePrefix,
  type LocaleCode,
} from '@/lib/i18n/localeRegistry';
import { getLocalizedSeoPagePath35, getLocalizedVenueSlug35, SLUG_TOKENS_35 } from '@/lib/i18n/localizedSlugs35';
import { capodannoEventPath } from '@/lib/capodanno/routes';
import type { BergamoBresciaVenueId } from './clubsSeed';

export interface BergamoBresciaActiveNightSeed {
  id: string;
  venueId: BergamoBresciaVenueId;
  clubKey: 'setai' | 'capogiro' | 'tiky' | 'zeroclub' | 'qiclubbing' | 'numberone';
  nyeSlug:
    | 'capodanno-setai-club-bergamo'
    | 'capodanno-capogiro-curno-bergamo'
    | 'capodanno-tiky-klub-seriate-bergamo'
    | 'capodanno-zero-club-bergamo'
    | 'capodanno-qi-clubbing-brescia'
    | 'capodanno-number-one-brescia';
  venueName: string;
  city: string;
  province: 'BG' | 'BS';
  streetAddress: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  highwayExitIt: string;
  highwayExitEn: string;
  driveMinutesFromMilan: number;
  kind: 'weekly' | 'dated';
  dayKey?: 'wednesday' | 'friday' | 'saturday';
  dayOfWeek?: number;
  startHour: number;
  startMinute: number;
  durationHours: number;
  fixedStartISO?: string;
  fixedEndISO?: string;
  hoursLabel: string;
  minAge: string;
  hasDinner: boolean;
  genres: string[];
  posterSrc: string;
  assetKeys: [string, string, string, string];
  enSlug: string;
  itSlug: string;
  slugStem: string;
  titleIt: string;
  titleEn: string;
  formatSummaryIt: string;
  formatSummaryEn: string;
  dressIt: string;
  dressEn: string;
}

export const BERGAMO_BRESCIA_ACTIVE_NIGHTS: readonly BergamoBresciaActiveNightSeed[] = [
  // ── 1. SETAI CLUB BERGAMO (4) ──
  {
    id: 'setai-bergamo-friday',
    venueId: 'v-setai-bergamo',
    clubKey: 'setai',
    nyeSlug: 'capodanno-setai-club-bergamo',
    venueName: 'Setai Club Bergamo',
    city: 'Orio al Serio',
    province: 'BG',
    streetAddress: 'Località Portico, 21',
    postalCode: '24050',
    latitude: 45.6672,
    longitude: 9.6989,
    highwayExitIt: 'Casello A4 Bergamo / Aeroporto Orio al Serio BGY (4 min)',
    highwayExitEn: 'A4 Bergamo exit / Milan Bergamo Airport BGY (4 min)',
    driveMinutesFromMilan: 35,
    kind: 'weekly',
    dayKey: 'friday',
    dayOfWeek: 5,
    startHour: 23,
    startMinute: 30,
    durationHours: 5,
    hoursLabel: '23:30 – 04:30',
    minAge: '18+ / 20+',
    hasDinner: false,
    genres: ['Commercial', 'Urban', 'Reggaeton', 'Hits'],
    posterSrc: '/images/events/weekly-posters/setai-bergamo-friday.webp',
    assetKeys: ['setai-01', 'setai-02', 'setai-03', 'setai-04'],
    enSlug: 'setai-club-bergamo-friday-urban-commercial-party',
    itSlug: 'venerdi-setai-club-bergamo-commercial-urban-tavoli',
    slugStem: 'setai-bergamo-friday-urban',
    titleIt: 'Venerdì Setai Club Bergamo (Orio al Serio) · Commercial, Urban & Reggaeton Arena',
    titleEn: 'Friday at Setai Club Bergamo (Orio al Serio) · Commercial, Urban & Reggaeton Arena',
    formatSummaryIt: 'Arena principale Commercial, Hip-Hop, Reggaeton e Hit internazionali con Tavoli VIP Privé a 4 minuti da Orio BGY',
    formatSummaryEn: 'Main arena Commercial, Hip-Hop, Reggaeton, and international hits with VIP Privé tables 4 minutes from BGY Airport',
    dressIt: 'Smart & Club Chic (camicia o look serale curato, vietate tute sportive)',
    dressEn: 'Smart & Club Chic (collared shirt or polished club attire, no tracksuits)',
  },
  {
    id: 'setai-bergamo-saturday',
    venueId: 'v-setai-bergamo',
    clubKey: 'setai',
    nyeSlug: 'capodanno-setai-club-bergamo',
    venueName: 'Setai Club Bergamo',
    city: 'Orio al Serio',
    province: 'BG',
    streetAddress: 'Località Portico, 21',
    postalCode: '24050',
    latitude: 45.6672,
    longitude: 9.6989,
    highwayExitIt: 'Casello A4 Bergamo / Aeroporto Orio al Serio BGY (4 min)',
    highwayExitEn: 'A4 Bergamo exit / Milan Bergamo Airport BGY (4 min)',
    driveMinutesFromMilan: 35,
    kind: 'weekly',
    dayKey: 'saturday',
    dayOfWeek: 6,
    startHour: 23,
    startMinute: 30,
    durationHours: 5.5,
    hoursLabel: '23:30 – 05:00',
    minAge: '20+',
    hasDinner: false,
    genres: ['Tech-House', 'House', 'Commercial'],
    posterSrc: '/images/events/weekly-posters/setai-bergamo-saturday.webp',
    assetKeys: ['setai-01', 'setai-02', 'setai-03', 'setai-04'],
    enSlug: 'setai-club-bergamo-saturday-juice-tech-house-showcase',
    itSlug: 'sabato-setai-club-bergamo-juice-tech-house-tavoli-vip',
    slugStem: 'setai-bergamo-saturday-juice',
    titleIt: 'Sabato Setai Club Bergamo · Juice Tech-House & Main Room Showcase',
    titleEn: 'Saturday at Setai Club Bergamo · Juice Tech-House & Main Room Showcase',
    formatSummaryIt: 'La storica notte del sabato tra Juice Tech-House, guest DJ internazionali, sala commerciale e Super Privé Consolle',
    formatSummaryEn: 'Flagship Saturday night uniting Juice Tech-House, international guest DJs, commercial room, and DJ Console Super Privé',
    dressIt: 'Club Chic & Fashion (selezione curata all’ingresso, documento fisico obbligatorio)',
    dressEn: 'Club Chic & Fashion (curated door selection, physical photo ID mandatory)',
  },
  {
    id: 'setai-bergamo-immacolata-7-dicembre',
    venueId: 'v-setai-bergamo',
    clubKey: 'setai',
    nyeSlug: 'capodanno-setai-club-bergamo',
    venueName: 'Setai Club Bergamo',
    city: 'Orio al Serio',
    province: 'BG',
    streetAddress: 'Località Portico, 21',
    postalCode: '24050',
    latitude: 45.6672,
    longitude: 9.6989,
    highwayExitIt: 'Casello A4 Bergamo / Aeroporto Orio al Serio BGY (4 min)',
    highwayExitEn: 'A4 Bergamo exit / Milan Bergamo Airport BGY (4 min)',
    driveMinutesFromMilan: 35,
    kind: 'dated',
    startHour: 23,
    startMinute: 30,
    durationHours: 5.5,
    fixedStartISO: '2026-12-07T23:30:00+01:00',
    fixedEndISO: '2026-12-08T05:00:00+01:00',
    hoursLabel: 'Lun 7 Dic 2026 · 23:30 – 05:00',
    minAge: '18+ / 20+',
    hasDinner: false,
    genres: ['House', 'Tech-House', 'Urban', 'Hits'],
    posterSrc: '/images/events/weekly-posters/setai-bergamo-immacolata-7-dicembre.webp',
    assetKeys: ['setai-01', 'setai-02', 'setai-03', 'setai-04'],
    enSlug: 'setai-club-bergamo-december-7-2026-immacolata-eve-party',
    itSlug: 'setai-club-bergamo-7-dicembre-2026-prefestivo-immacolata',
    slugStem: 'setai-bergamo-7-dec-2026',
    titleIt: 'Prefestivo dell’Immacolata @ Setai Club Bergamo · Lunedì 7 Dicembre 2026',
    titleEn: 'Immaculate Conception Eve @ Setai Club Bergamo · Monday, December 7, 2026',
    formatSummaryIt: 'Grande maratona prefestiva del 7 dicembre nella multisala di Orio al Serio tra Tech-House, Urban e Tavoli Privé',
    formatSummaryEn: 'December 7 pre-holiday multi-room night in Orio al Serio with Tech-House, Urban hits, and VIP bottle tables',
    dressIt: 'Smart & Festive Club Chic',
    dressEn: 'Smart & Festive Club Chic',
  },
  {
    id: 'setai-bergamo-natale-25-dicembre',
    venueId: 'v-setai-bergamo',
    clubKey: 'setai',
    nyeSlug: 'capodanno-setai-club-bergamo',
    venueName: 'Setai Club Bergamo',
    city: 'Orio al Serio',
    province: 'BG',
    streetAddress: 'Località Portico, 21',
    postalCode: '24050',
    latitude: 45.6672,
    longitude: 9.6989,
    highwayExitIt: 'Casello A4 Bergamo / Aeroporto Orio al Serio BGY (4 min)',
    highwayExitEn: 'A4 Bergamo exit / Milan Bergamo Airport BGY (4 min)',
    driveMinutesFromMilan: 35,
    kind: 'dated',
    startHour: 23,
    startMinute: 30,
    durationHours: 5.5,
    fixedStartISO: '2026-12-25T23:30:00+01:00',
    fixedEndISO: '2026-12-26T05:00:00+01:00',
    hoursLabel: 'Ven 25 Dic 2026 · 23:30 – 05:00',
    minAge: '20+',
    hasDinner: false,
    genres: ['House', 'Commercial', 'Tech-House'],
    posterSrc: '/images/events/weekly-posters/setai-bergamo-natale-25-dicembre.webp',
    assetKeys: ['setai-01', 'setai-02', 'setai-03', 'setai-04'],
    enSlug: 'setai-club-bergamo-christmas-night-party-december-25-2026',
    itSlug: 'natale-setai-club-bergamo-25-dicembre-2026-christmas-party',
    slugStem: 'setai-bergamo-christmas-25-dec-2026',
    titleIt: 'Christmas Night Party @ Setai Club Bergamo · Venerdì 25 Dicembre 2026',
    titleEn: 'Christmas Night Party @ Setai Club Bergamo · Friday, December 25, 2026',
    formatSummaryIt: 'La tradizionale notte di Natale dopo il cenone in famiglia nell’arena multisala del Setai Club a Orio al Serio',
    formatSummaryEn: 'Bergamo’s signature Christmas night party from 23:30 until 05:00 inside Setai Club’s multi-room arena',
    dressIt: 'Festive Evening Chic (camicia/blazer uomo, abito serale donna)',
    dressEn: 'Festive Evening Chic (collared shirt/blazer for men, cocktail dress for women)',
  },

  // ── 2. CAPOGIRO JOYCLUB CURNO (4) ──
  {
    id: 'capogiro-bergamo-friday',
    venueId: 'v-capogiro-bergamo',
    clubKey: 'capogiro',
    nyeSlug: 'capodanno-capogiro-curno-bergamo',
    venueName: 'Capogiro Joyclub Bergamo',
    city: 'Curno',
    province: 'BG',
    streetAddress: 'Via Trento, 14',
    postalCode: '24035',
    latitude: 45.6914,
    longitude: 9.6125,
    highwayExitIt: 'Casello A4 Dalmine / Bergamo via SS671 (8 min)',
    highwayExitEn: 'A4 Dalmine / Bergamo exit via SS671 (8 min)',
    driveMinutesFromMilan: 35,
    kind: 'weekly',
    dayKey: 'friday',
    dayOfWeek: 5,
    startHour: 21,
    startMinute: 0,
    durationHours: 7,
    hoursLabel: '21:00 – 04:00',
    minAge: '25+ / Adulti',
    hasDinner: true,
    genres: ['Dinner Show', 'House', 'Commercial', 'Revival', 'Karaoke'],
    posterSrc: '/images/events/weekly-posters/capogiro-bergamo-friday.webp',
    assetKeys: ['capogiro-01', 'capogiro-02', 'capogiro-03', 'capogiro-04'],
    enSlug: 'capogiro-curno-bergamo-friday-feel-dinner-party-voice-bar',
    itSlug: 'venerdi-capogiro-curno-bergamo-feel-cena-cantata-voice-bar',
    slugStem: 'capogiro-bergamo-friday-dinner',
    titleIt: 'Venerdì Feel Dinner Party @ Capogiro Curno (Bergamo) · Cena Cantata, Voice Bar & Club 25+',
    titleEn: 'Feel Friday Dinner Party @ Capogiro Curno (Bergamo) · Singing Dinner, Voice Bar & 25+ Club',
    formatSummaryIt: 'Cena spettacolo cantata dalle 21:00, Voice Bar karaoke dal vivo dalle 23:30 e Main Room per un pubblico adulto 25+ e over 30',
    formatSummaryEn: '21:00 singing dinner party, 23:30 live karaoke Voice Bar, and Main Room clubbing curated for a 25+ and 30+ adult crowd',
    dressIt: 'Adult Smart Elegant (camicia/giacca uomo, abito curato donna · selezione 25+)',
    dressEn: 'Adult Smart Elegant (shirt/blazer for men, chic eveningwear for women · 25+ door policy)',
  },
  {
    id: 'capogiro-bergamo-saturday',
    venueId: 'v-capogiro-bergamo',
    clubKey: 'capogiro',
    nyeSlug: 'capodanno-capogiro-curno-bergamo',
    venueName: 'Capogiro Joyclub Bergamo',
    city: 'Curno',
    province: 'BG',
    streetAddress: 'Via Trento, 14',
    postalCode: '24035',
    latitude: 45.6914,
    longitude: 9.6125,
    highwayExitIt: 'Casello A4 Dalmine / Bergamo via SS671 (8 min)',
    highwayExitEn: 'A4 Dalmine / Bergamo exit via SS671 (8 min)',
    driveMinutesFromMilan: 35,
    kind: 'weekly',
    dayKey: 'saturday',
    dayOfWeek: 6,
    startHour: 21,
    startMinute: 0,
    durationHours: 7.5,
    hoursLabel: '21:00 – 04:30',
    minAge: '25+ / Over 30',
    hasDinner: true,
    genres: ['Dinner Show', 'Commercial', 'House', 'Reggaeton', 'Voice Bar'],
    posterSrc: '/images/events/weekly-posters/capogiro-bergamo-saturday.webp',
    assetKeys: ['capogiro-01', 'capogiro-02', 'capogiro-03', 'capogiro-04'],
    enSlug: 'capogiro-curno-bergamo-saturday-joyclub-dinner-show-disco',
    itSlug: 'sabato-capogiro-curno-bergamo-joyclub-cena-spettacolo-disco',
    slugStem: 'capogiro-bergamo-saturday-joyclub',
    titleIt: 'Sabato Joyclub @ Capogiro Curno (Bergamo) · Cena Spettacolo, Voice Bar & Main Room',
    titleEn: 'Saturday Joyclub @ Capogiro Curno (Bergamo) · Dinner Show, Voice Bar & Main Room',
    formatSummaryIt: 'Il sabato sera completo di Bergamo Ovest: ristorante cantato, Voice Bar live e discoteca fino alle 04:30 con Tavoli Privé',
    formatSummaryEn: 'West Bergamo’s flagship adult Saturday: singing dinner restaurant, live Voice Bar, and club party till 04:30',
    dressIt: 'Smart Elegant Adulto (selezione curata alla porta)',
    dressEn: 'Polished Adult Smart Elegant',
  },
  {
    id: 'capogiro-bergamo-immacolata-7-dicembre',
    venueId: 'v-capogiro-bergamo',
    clubKey: 'capogiro',
    nyeSlug: 'capodanno-capogiro-curno-bergamo',
    venueName: 'Capogiro Joyclub Bergamo',
    city: 'Curno',
    province: 'BG',
    streetAddress: 'Via Trento, 14',
    postalCode: '24035',
    latitude: 45.6914,
    longitude: 9.6125,
    highwayExitIt: 'Casello A4 Dalmine / Bergamo via SS671 (8 min)',
    highwayExitEn: 'A4 Dalmine / Bergamo exit via SS671 (8 min)',
    driveMinutesFromMilan: 35,
    kind: 'dated',
    startHour: 21,
    startMinute: 0,
    durationHours: 7,
    fixedStartISO: '2026-12-07T21:00:00+01:00',
    fixedEndISO: '2026-12-08T04:00:00+01:00',
    hoursLabel: 'Lun 7 Dic 2026 · 21:00 – 04:00',
    minAge: '25+',
    hasDinner: true,
    genres: ['Dinner Show', 'Commercial', 'House', 'Revival'],
    posterSrc: '/images/events/weekly-posters/capogiro-bergamo-immacolata-7-dicembre.webp',
    assetKeys: ['capogiro-01', 'capogiro-02', 'capogiro-03', 'capogiro-04'],
    enSlug: 'capogiro-curno-bergamo-december-7-2026-immacolata-dinner-party',
    itSlug: 'capogiro-curno-bergamo-7-dicembre-2026-immacolata-cena-disco',
    slugStem: 'capogiro-bergamo-7-dec-2026',
    titleIt: 'Vigilia dell’Immacolata @ Capogiro Curno (Bergamo) · Lunedì 7 Dicembre 2026',
    titleEn: 'Immaculate Conception Eve Dinner & Club @ Capogiro Curno · Monday, Dec 7, 2026',
    formatSummaryIt: 'Prefestivo del 7 dicembre con Cena Party cantata dalle 21:00, Voice Bar e Main Room adulta in Via Trento 14 a Curno',
    formatSummaryEn: 'December 7 holiday-eve singing dinner from 21:00, live Voice Bar, and adult club party in Curno (Bergamo)',
    dressIt: 'Smart Elegant Adulto',
    dressEn: 'Adult Smart Elegant',
  },
  {
    id: 'capogiro-bergamo-natale-25-dicembre',
    venueId: 'v-capogiro-bergamo',
    clubKey: 'capogiro',
    nyeSlug: 'capodanno-capogiro-curno-bergamo',
    venueName: 'Capogiro Joyclub Bergamo',
    city: 'Curno',
    province: 'BG',
    streetAddress: 'Via Trento, 14',
    postalCode: '24035',
    latitude: 45.6914,
    longitude: 9.6125,
    highwayExitIt: 'Casello A4 Dalmine / Bergamo via SS671 (8 min)',
    highwayExitEn: 'A4 Dalmine / Bergamo exit via SS671 (8 min)',
    driveMinutesFromMilan: 35,
    kind: 'dated',
    startHour: 23,
    startMinute: 0,
    durationHours: 5.5,
    fixedStartISO: '2026-12-25T23:00:00+01:00',
    fixedEndISO: '2026-12-26T04:30:00+01:00',
    hoursLabel: 'Ven 25 Dic 2026 · 23:00 – 04:30',
    minAge: '25+',
    hasDinner: false,
    genres: ['House', 'Commercial', 'Revival', 'Voice Bar'],
    posterSrc: '/images/events/weekly-posters/capogiro-bergamo-natale-25-dicembre.webp',
    assetKeys: ['capogiro-01', 'capogiro-02', 'capogiro-03', 'capogiro-04'],
    enSlug: 'capogiro-curno-bergamo-christmas-party-december-25-2026',
    itSlug: 'natale-capogiro-curno-bergamo-25-dicembre-2026-christmas-party',
    slugStem: 'capogiro-bergamo-christmas-25-dec-2026',
    titleIt: 'CaPoGiRo Christmas Party di Natale @ Curno (Bergamo) · Venerdì 25 Dicembre 2026',
    titleEn: 'CaPoGiRo Christmas Night Party @ Curno (Bergamo) · Friday, December 25, 2026',
    formatSummaryIt: 'Gran festa della notte di Natale dalle 23:00 tra Main Room e Voice Bar karaoke con Tavoli VIP riservati',
    formatSummaryEn: 'Christmas Night celebration from 23:00 across the Main Room and live Voice Bar with reserved VIP tables',
    dressIt: 'Festive Smart Elegant (25+)',
    dressEn: 'Festive Smart Elegant (25+)',
  },

  // ── 3. TIKY KLUB SERIATE (3) ──
  {
    id: 'tiky-klub-bergamo-wednesday',
    venueId: 'v-tiky-klub-bergamo',
    clubKey: 'tiky',
    nyeSlug: 'capodanno-tiky-klub-seriate-bergamo',
    venueName: 'Tiky Klub Bergamo',
    city: 'Seriate',
    province: 'BG',
    streetAddress: 'Via Nazionale, 93',
    postalCode: '24068',
    latitude: 45.6828,
    longitude: 9.7269,
    highwayExitIt: 'Casello A4 Seriate (5 min in Via Nazionale 93)',
    highwayExitEn: 'A4 Seriate exit (5 min on Via Nazionale 93)',
    driveMinutesFromMilan: 40,
    kind: 'weekly',
    dayKey: 'wednesday',
    dayOfWeek: 3,
    startHour: 23,
    startMinute: 0,
    durationHours: 3.5,
    hoursLabel: '23:00 – 02:30',
    minAge: '18+',
    hasDinner: false,
    genres: ['House', 'Deep House', 'Tech-House'],
    posterSrc: '/images/events/weekly-posters/tiky-klub-bergamo-wednesday.webp',
    assetKeys: ['tiky-01', 'tiky-02', 'tiky-03', 'tiky-04'],
    enSlug: 'tiky-klub-seriate-bergamo-wednesday-house-groove-session',
    itSlug: 'mercoledi-tiky-klub-seriate-bergamo-house-groove-session',
    slugStem: 'tiky-klub-bergamo-wednesday-house',
    titleIt: 'Mercoledì House Session @ Tiky Klub Seriate (Bergamo) · Midweek Groove',
    titleEn: 'Wednesday House Session @ Tiky Klub Seriate (Bergamo) · Midweek Groove',
    formatSummaryIt: 'L’appuntamento infrasettimanale House e Deep Groove in Via Nazionale 93 a Seriate con consolle ravvicinata e drink list',
    formatSummaryEn: 'Midweek House and Deep Groove club session on Via Nazionale 93 in Seriate with intimate booth acoustics',
    dressIt: 'Smart Club Casual (18+)',
    dressEn: 'Smart Club Casual (18+)',
  },
  {
    id: 'tiky-klub-bergamo-friday',
    venueId: 'v-tiky-klub-bergamo',
    clubKey: 'tiky',
    nyeSlug: 'capodanno-tiky-klub-seriate-bergamo',
    venueName: 'Tiky Klub Bergamo',
    city: 'Seriate',
    province: 'BG',
    streetAddress: 'Via Nazionale, 93',
    postalCode: '24068',
    latitude: 45.6828,
    longitude: 9.7269,
    highwayExitIt: 'Casello A4 Seriate (5 min in Via Nazionale 93)',
    highwayExitEn: 'A4 Seriate exit (5 min on Via Nazionale 93)',
    driveMinutesFromMilan: 40,
    kind: 'weekly',
    dayKey: 'friday',
    dayOfWeek: 5,
    startHour: 23,
    startMinute: 30,
    durationHours: 4.5,
    hoursLabel: '23:30 – 04:00',
    minAge: '18+',
    hasDinner: false,
    genres: ['Tech-House', 'Electronic', 'House'],
    posterSrc: '/images/events/weekly-posters/tiky-klub-bergamo-friday.webp',
    assetKeys: ['tiky-01', 'tiky-02', 'tiky-03', 'tiky-04'],
    enSlug: 'tiky-klub-seriate-bergamo-friday-icon-tech-house-party',
    itSlug: 'venerdi-tiky-klub-seriate-bergamo-icon-tech-house-tavoli',
    slugStem: 'tiky-klub-bergamo-friday-icon',
    titleIt: 'Venerdì Icon Tech-House @ Tiky Klub Seriate (Bergamo) · Boutique Electronic Night',
    titleEn: 'Icon Tech-House Friday @ Tiky Klub Seriate (Bergamo) · Boutique Electronic Night',
    formatSummaryIt: 'Il venerdì di punta per gli amanti di Tech-House e sonorità elettroniche nel boutique club di Bergamo Est',
    formatSummaryEn: 'Signature Tech-House and electronic Friday inside East Bergamo’s dedicated sound boutique club',
    dressIt: 'Contemporary Dark Clubwear (18+, no tute sportive)',
    dressEn: 'Contemporary Dark Clubwear (18+, no athletic tracksuits)',
  },
  {
    id: 'tiky-klub-bergamo-saturday',
    venueId: 'v-tiky-klub-bergamo',
    clubKey: 'tiky',
    nyeSlug: 'capodanno-tiky-klub-seriate-bergamo',
    venueName: 'Tiky Klub Bergamo',
    city: 'Seriate',
    province: 'BG',
    streetAddress: 'Via Nazionale, 93',
    postalCode: '24068',
    latitude: 45.6828,
    longitude: 9.7269,
    highwayExitIt: 'Casello A4 Seriate (5 min in Via Nazionale 93)',
    highwayExitEn: 'A4 Seriate exit (5 min on Via Nazionale 93)',
    driveMinutesFromMilan: 40,
    kind: 'weekly',
    dayKey: 'saturday',
    dayOfWeek: 6,
    startHour: 23,
    startMinute: 30,
    durationHours: 4.5,
    hoursLabel: '23:30 – 04:00',
    minAge: '18+ / 20+',
    hasDinner: false,
    genres: ['House', 'Tech-House', 'Club Grooves'],
    posterSrc: '/images/events/weekly-posters/tiky-klub-bergamo-saturday.webp',
    assetKeys: ['tiky-01', 'tiky-02', 'tiky-03', 'tiky-04'],
    enSlug: 'tiky-klub-seriate-bergamo-saturday-club-showcase',
    itSlug: 'sabato-tiky-klub-seriate-bergamo-club-showcase-tavoli-vip',
    slugStem: 'tiky-klub-bergamo-saturday-showcase',
    titleIt: 'Sabato Tiky Klub Seriate (Bergamo) · Guest DJ Rotation & VIP Bottle Service',
    titleEn: 'Saturday Showcase @ Tiky Klub Seriate (Bergamo) · Guest DJs & VIP Bottle Service',
    formatSummaryIt: 'Sabato notte ad alta energia tra House, Tech-House e tavoli Privé a bordo consolle a Seriate',
    formatSummaryEn: 'High-energy Saturday House and Tech-House showcase with console-side VIP Privé booths in Seriate',
    dressIt: 'Club Chic & Contemporary Blackwear',
    dressEn: 'Club Chic & Contemporary Blackwear',
  },

  // ── 4. ZERO CLUB BERGAMO CENTRO (3) ──
  {
    id: 'zero-club-bergamo-wednesday',
    venueId: 'v-zero-club-bergamo',
    clubKey: 'zeroclub',
    nyeSlug: 'capodanno-zero-club-bergamo',
    venueName: 'Zero Club Bergamo',
    city: 'Bergamo',
    province: 'BG',
    streetAddress: 'Via Evaristo Baschenis, 9',
    postalCode: '24122',
    latitude: 45.6929,
    longitude: 9.6644,
    highwayExitIt: 'Bergamo Centro · Casello A4 Bergamo (7 min) / Stazione FS (10 min)',
    highwayExitEn: 'Downtown Bergamo · A4 Bergamo exit (7 min) / Train Station (10 min)',
    driveMinutesFromMilan: 40,
    kind: 'weekly',
    dayKey: 'wednesday',
    dayOfWeek: 3,
    startHour: 23,
    startMinute: 0,
    durationHours: 4.5,
    hoursLabel: '23:00 – 03:30',
    minAge: '18+',
    hasDinner: false,
    genres: ['Commercial', 'Urban', '360° Hits', 'University'],
    posterSrc: '/images/events/weekly-posters/zero-club-bergamo-wednesday.webp',
    assetKeys: ['zeroclub-01', 'zeroclub-02', 'zeroclub-03', 'zeroclub-04'],
    enSlug: 'zero-club-bergamo-wednesday-please-university-party',
    itSlug: 'mercoledi-please-zero-club-bergamo-festa-universitaria',
    slugStem: 'zero-club-bergamo-wednesday-please',
    titleIt: 'Mercoledì Please! @ Zero Club Bergamo Centro · University & 360° Party',
    titleEn: 'Wednesday Please! @ Zero Club Bergamo Downtown · University & 360° Party',
    formatSummaryIt: 'La notte universitaria e giovane del mercoledì in pieno centro a Bergamo (Via Baschenis 9, doppia sala, tessera associativa)',
    formatSummaryEn: 'Downtown Bergamo’s signature Wednesday university party across two rooms at Via Baschenis 9 (club membership required)',
    dressIt: 'Smart Urban Casual (tessera associativa e documento fisico obbligatori)',
    dressEn: 'Smart Urban Casual (club membership card & physical photo ID required)',
  },
  {
    id: 'zero-club-bergamo-friday',
    venueId: 'v-zero-club-bergamo',
    clubKey: 'zeroclub',
    nyeSlug: 'capodanno-zero-club-bergamo',
    venueName: 'Zero Club Bergamo',
    city: 'Bergamo',
    province: 'BG',
    streetAddress: 'Via Evaristo Baschenis, 9',
    postalCode: '24122',
    latitude: 45.6929,
    longitude: 9.6644,
    highwayExitIt: 'Bergamo Centro · Casello A4 Bergamo (7 min) / Stazione FS (10 min)',
    highwayExitEn: 'Downtown Bergamo · A4 Bergamo exit (7 min) / Train Station (10 min)',
    driveMinutesFromMilan: 40,
    kind: 'weekly',
    dayKey: 'friday',
    dayOfWeek: 5,
    startHour: 23,
    startMinute: 30,
    durationHours: 5,
    hoursLabel: '23:30 – 04:30',
    minAge: '19+',
    hasDinner: false,
    genres: ['Hip-Hop', 'Reggaeton', 'Urban', 'Club Hits'],
    posterSrc: '/images/events/weekly-posters/zero-club-bergamo-friday.webp',
    assetKeys: ['zeroclub-01', 'zeroclub-02', 'zeroclub-03', 'zeroclub-04'],
    enSlug: 'zero-club-bergamo-friday-premiere-urban-party',
    itSlug: 'venerdi-premiere-zero-club-bergamo-urban-reggaeton-tavoli',
    slugStem: 'zero-club-bergamo-friday-premiere',
    titleIt: 'Venerdì Premiere @ Zero Club Bergamo Centro · Hip-Hop, Reggaeton & Dual-Room',
    titleEn: 'Premiere Friday @ Zero Club Bergamo Downtown · Hip-Hop, Reggaeton & Dual-Room',
    formatSummaryIt: 'Venerdì Urban, Hip-Hop e Reggaeton sotto la matrice LED della Main Room e nella Club Room di Via Baschenis 9',
    formatSummaryEn: 'Urban, Hip-Hop, and Reggaeton Friday beneath the geometric LED ceiling of Zero Club in central Bergamo',
    dressIt: 'Urban Chic (tessera associativa e documento fisico obbligatori)',
    dressEn: 'Urban Chic (club membership & physical ID required)',
  },
  {
    id: 'zero-club-bergamo-saturday',
    venueId: 'v-zero-club-bergamo',
    clubKey: 'zeroclub',
    nyeSlug: 'capodanno-zero-club-bergamo',
    venueName: 'Zero Club Bergamo',
    city: 'Bergamo',
    province: 'BG',
    streetAddress: 'Via Evaristo Baschenis, 9',
    postalCode: '24122',
    latitude: 45.6929,
    longitude: 9.6644,
    highwayExitIt: 'Bergamo Centro · Casello A4 Bergamo (7 min) / Stazione FS (10 min)',
    highwayExitEn: 'Downtown Bergamo · A4 Bergamo exit (7 min) / Train Station (10 min)',
    driveMinutesFromMilan: 40,
    kind: 'weekly',
    dayKey: 'saturday',
    dayOfWeek: 6,
    startHour: 23,
    startMinute: 30,
    durationHours: 5,
    hoursLabel: '23:30 – 04:30',
    minAge: '20+',
    hasDinner: false,
    genres: ['Electronic', 'Tech-House', 'Indie', 'Club Hits'],
    posterSrc: '/images/events/weekly-posters/zero-club-bergamo-saturday.webp',
    assetKeys: ['zeroclub-01', 'zeroclub-02', 'zeroclub-03', 'zeroclub-04'],
    enSlug: 'zero-club-bergamo-saturday-electronic-dual-room-showcase',
    itSlug: 'sabato-zero-club-bergamo-centro-electronic-dual-room-tavoli',
    slugStem: 'zero-club-bergamo-saturday-dualroom',
    titleIt: 'Sabato Dual-Room @ Zero Club Bergamo Centro · Electronic, Indie & Main Room',
    titleEn: 'Saturday Dual-Room @ Zero Club Bergamo Downtown · Electronic, Indie & Main Room',
    formatSummaryIt: 'Doppia programmazione musicale tra Main Room elettronica/house e seconda sala club nel cuore di Bergamo',
    formatSummaryEn: 'Dual-room Saturday showcase uniting electronic/tech-house and club hits in downtown Bergamo',
    dressIt: 'Minimal & Evening Chic (tessera associativa richiesta)',
    dressEn: 'Minimal & Evening Chic (club membership required)',
  },

  // ── 5. QI CLUBBING FRANCIACORTA ERBUSCO (4) ──
  {
    id: 'qi-clubbing-brescia-friday',
    venueId: 'v-qi-clubbing-brescia',
    clubKey: 'qiclubbing',
    nyeSlug: 'capodanno-qi-clubbing-brescia',
    venueName: 'Qi Clubbing Franciacorta',
    city: 'Erbusco',
    province: 'BS',
    streetAddress: "Via dell'Industria, 83",
    postalCode: '25030',
    latitude: 45.5768,
    longitude: 9.9881,
    highwayExitIt: 'Casello A4 Rovato (2 min reali in Via dell’Industria 83)',
    highwayExitEn: 'A4 Rovato exit (2 min on Via dell’Industria 83)',
    driveMinutesFromMilan: 50,
    kind: 'weekly',
    dayKey: 'friday',
    dayOfWeek: 5,
    startHour: 21,
    startMinute: 0,
    durationHours: 7.5,
    hoursLabel: '21:00 – 04:30',
    minAge: '23+',
    hasDinner: true,
    genres: ['Dinner Show', 'House', 'Commercial', 'Luxury Club'],
    posterSrc: '/images/events/weekly-posters/qi-clubbing-brescia-friday.webp',
    assetKeys: ['qiclubbing-01', 'qiclubbing-02', 'qiclubbing-03', 'qiclubbing-04'],
    enSlug: 'qi-clubbing-franciacorta-brescia-friday-luxury-dinner-show',
    itSlug: 'venerdi-qi-clubbing-erbusco-brescia-dinner-show-franciacorta',
    slugStem: 'qi-clubbing-brescia-friday-dinner',
    titleIt: 'Venerdì Luxury Dinner Show @ Qi Clubbing Franciacorta (Erbusco, BS)',
    titleEn: 'Friday Luxury Dinner Show & Club @ Qi Clubbing Franciacorta (Erbusco, Brescia)',
    formatSummaryIt: 'Cena spettacolo gourmet dalle 21:00 con calici Franciacorta DOCG e luxury clubbing fino alle 04:30 al casello A4 Rovato',
    formatSummaryEn: '21:00 gourmet Dinner Show with Franciacorta DOCG sparkling wine followed by luxury clubbing until 04:30 off A4 Rovato',
    dressIt: 'Strictly Chic & Glamour (camicia/giacca uomo, abito elegante donna)',
    dressEn: 'Strictly Chic & Glamour (shirt/jacket for men, cocktail/evening dress for women)',
  },
  {
    id: 'qi-clubbing-brescia-saturday',
    venueId: 'v-qi-clubbing-brescia',
    clubKey: 'qiclubbing',
    nyeSlug: 'capodanno-qi-clubbing-brescia',
    venueName: 'Qi Clubbing Franciacorta',
    city: 'Erbusco',
    province: 'BS',
    streetAddress: "Via dell'Industria, 83",
    postalCode: '25030',
    latitude: 45.5768,
    longitude: 9.9881,
    highwayExitIt: 'Casello A4 Rovato (2 min reali in Via dell’Industria 83)',
    highwayExitEn: 'A4 Rovato exit (2 min on Via dell’Industria 83)',
    driveMinutesFromMilan: 50,
    kind: 'weekly',
    dayKey: 'saturday',
    dayOfWeek: 6,
    startHour: 21,
    startMinute: 0,
    durationHours: 8,
    hoursLabel: '21:00 – 05:00',
    minAge: '24+',
    hasDinner: true,
    genres: ['Dinner Show', 'House', 'Commercial', 'VIP Privé'],
    posterSrc: '/images/events/weekly-posters/qi-clubbing-brescia-saturday.webp',
    assetKeys: ['qiclubbing-01', 'qiclubbing-02', 'qiclubbing-03', 'qiclubbing-04'],
    enSlug: 'qi-clubbing-franciacorta-brescia-saturday-gourmet-dinner-club',
    itSlug: 'sabato-qi-clubbing-franciacorta-brescia-cena-spettacolo-tavoli-vip',
    slugStem: 'qi-clubbing-brescia-saturday-gala',
    titleIt: 'Sabato The Night Club & Gourmet Dinner Show @ Qi Clubbing Franciacorta (BS)',
    titleEn: 'Saturday Gourmet Dinner Show & Night Club @ Qi Clubbing Franciacorta (Brescia)',
    formatSummaryIt: 'La notte regina della Franciacorta: Dinner Show artistico dalle 21:00 e Super Privé bottle service fino alle 05:00',
    formatSummaryEn: 'Franciacorta’s flagship Saturday night: artistic gourmet Dinner Show at 21:00 and Super Privé bottle service till 05:00',
    dressIt: 'Haute Chic & Glamour (selezione rigorosa alla porta)',
    dressEn: 'Haute Chic & Glamour (strict door selection)',
  },
  {
    id: 'qi-clubbing-brescia-immacolata-7-dicembre',
    venueId: 'v-qi-clubbing-brescia',
    clubKey: 'qiclubbing',
    nyeSlug: 'capodanno-qi-clubbing-brescia',
    venueName: 'Qi Clubbing Franciacorta',
    city: 'Erbusco',
    province: 'BS',
    streetAddress: "Via dell'Industria, 83",
    postalCode: '25030',
    latitude: 45.5768,
    longitude: 9.9881,
    highwayExitIt: 'Casello A4 Rovato (2 min reali in Via dell’Industria 83)',
    highwayExitEn: 'A4 Rovato exit (2 min on Via dell’Industria 83)',
    driveMinutesFromMilan: 50,
    kind: 'dated',
    startHour: 21,
    startMinute: 0,
    durationHours: 7.5,
    fixedStartISO: '2026-12-07T21:00:00+01:00',
    fixedEndISO: '2026-12-08T04:30:00+01:00',
    hoursLabel: 'Lun 7 Dic 2026 · 21:00 – 04:30',
    minAge: '23+',
    hasDinner: true,
    genres: ['Dinner Show', 'House', 'Commercial'],
    posterSrc: '/images/events/weekly-posters/qi-clubbing-brescia-immacolata-7-dicembre.webp',
    assetKeys: ['qiclubbing-01', 'qiclubbing-02', 'qiclubbing-03', 'qiclubbing-04'],
    enSlug: 'qi-clubbing-franciacorta-december-7-2026-immacolata-gala',
    itSlug: 'qi-clubbing-franciacorta-7-dicembre-2026-prefestivo-immacolata',
    slugStem: 'qi-clubbing-brescia-7-dec-2026',
    titleIt: 'Prefestivo dell’Immacolata @ Qi Clubbing Franciacorta · Lunedì 7 Dicembre 2026',
    titleEn: 'Immaculate Conception Eve Gala @ Qi Clubbing Franciacorta · Monday, Dec 7, 2026',
    formatSummaryIt: 'Speciale gala prefestivo in Franciacorta con Dinner Show dalle 21:00 e party fino alle 04:30 a Erbusco',
    formatSummaryEn: 'Pre-holiday Franciacorta gala featuring 21:00 Dinner Show and luxury club party until 04:30 in Erbusco',
    dressIt: 'Glamour & Evening Chic',
    dressEn: 'Glamour & Evening Chic',
  },
  {
    id: 'qi-clubbing-brescia-natale-25-dicembre',
    venueId: 'v-qi-clubbing-brescia',
    clubKey: 'qiclubbing',
    nyeSlug: 'capodanno-qi-clubbing-brescia',
    venueName: 'Qi Clubbing Franciacorta',
    city: 'Erbusco',
    province: 'BS',
    streetAddress: "Via dell'Industria, 83",
    postalCode: '25030',
    latitude: 45.5768,
    longitude: 9.9881,
    highwayExitIt: 'Casello A4 Rovato (2 min reali in Via dell’Industria 83)',
    highwayExitEn: 'A4 Rovato exit (2 min on Via dell’Industria 83)',
    driveMinutesFromMilan: 50,
    kind: 'dated',
    startHour: 21,
    startMinute: 0,
    durationHours: 8,
    fixedStartISO: '2026-12-25T21:00:00+01:00',
    fixedEndISO: '2026-12-26T05:00:00+01:00',
    hoursLabel: 'Ven 25 Dic 2026 · 21:00 – 05:00',
    minAge: '24+',
    hasDinner: true,
    genres: ['Dinner Show', 'House', 'Commercial'],
    posterSrc: '/images/events/weekly-posters/qi-clubbing-brescia-natale-25-dicembre.webp',
    assetKeys: ['qiclubbing-01', 'qiclubbing-02', 'qiclubbing-03', 'qiclubbing-04'],
    enSlug: 'qi-clubbing-franciacorta-christmas-gala-december-25-2026',
    itSlug: 'natale-qi-clubbing-franciacorta-25-dicembre-2026-christmas-gala',
    slugStem: 'qi-clubbing-brescia-christmas-25-dec-2026',
    titleIt: 'Qi Christmas Gala & Night Party @ Erbusco (Franciacorta) · Venerdì 25 Dicembre 2026',
    titleEn: 'Qi Christmas Gala & Luxury Party @ Erbusco (Franciacorta) · Friday, Dec 25, 2026',
    formatSummaryIt: 'L’esclusivo Natale notte in Franciacorta tra cena di gala, brindisi con magnum DOCG e clubbing fino alle 05:00',
    formatSummaryEn: 'Franciacorta’s signature Christmas night gala dinner, magnum sparkling toasts, and clubbing till 05:00',
    dressIt: 'Festive Evening Couture & Velvet Chic',
    dressEn: 'Festive Evening Couture & Velvet Chic',
  },

  // ── 6. NUMBER ONE CORTE FRANCA (3) ──
  {
    id: 'number-one-brescia-saturday',
    venueId: 'v-number-one-brescia',
    clubKey: 'numberone',
    nyeSlug: 'capodanno-number-one-brescia',
    venueName: 'Number One Franciacorta',
    city: 'Corte Franca',
    province: 'BS',
    streetAddress: 'Via Provinciale, 1/B',
    postalCode: '25040',
    latitude: 45.6295,
    longitude: 10.0189,
    highwayExitIt: 'Uscita A4 Rovato / Palazzolo -> SP XI Corte Franca (12 min)',
    highwayExitEn: 'A4 Rovato / Palazzolo exit -> SP XI Corte Franca (12 min)',
    driveMinutesFromMilan: 55,
    kind: 'weekly',
    dayKey: 'saturday',
    dayOfWeek: 6,
    startHour: 23,
    startMinute: 0,
    durationHours: 5.5,
    hoursLabel: '23:00 – 04:30',
    minAge: '18+',
    hasDinner: false,
    genres: ['EDM', 'Commercial', 'Tech-House', 'Urban', '90s/2000s'],
    posterSrc: '/images/events/weekly-posters/number-one-brescia-saturday.webp',
    assetKeys: ['numberone-01', 'numberone-02', 'numberone-03', 'numberone-04'],
    enSlug: 'number-one-corte-franca-brescia-saturday-multisala-megaclub',
    itSlug: 'sabato-number-one-corte-franca-brescia-megaclub-multisala-tavoli',
    slugStem: 'number-one-brescia-saturday-multisala',
    titleIt: 'Sabato Multisala @ Number One Corte Franca (Brescia) · Mega-Club Arena',
    titleEn: 'Saturday Multisala @ Number One Corte Franca (Brescia) · Mega-Club Arena',
    formatSummaryIt: 'Il sabato sera monumentale nel megaclub multisala di Corte Franca con balconate VIP panoramiche e più piste musicali',
    formatSummaryEn: 'Monumental Saturday multi-room festival night at Corte Franca’s historic megaclub with panoramic VIP balconies',
    dressIt: 'Smart Club Casual (documento d’identità fisico originale obbligatorio)',
    dressEn: 'Smart Club Casual (valid physical photo ID mandatory)',
  },
  {
    id: 'number-one-brescia-immacolata-7-dicembre',
    venueId: 'v-number-one-brescia',
    clubKey: 'numberone',
    nyeSlug: 'capodanno-number-one-brescia',
    venueName: 'Number One Franciacorta',
    city: 'Corte Franca',
    province: 'BS',
    streetAddress: 'Via Provinciale, 1/B',
    postalCode: '25040',
    latitude: 45.6295,
    longitude: 10.0189,
    highwayExitIt: 'Uscita A4 Rovato / Palazzolo -> SP XI Corte Franca (12 min)',
    highwayExitEn: 'A4 Rovato / Palazzolo exit -> SP XI Corte Franca (12 min)',
    driveMinutesFromMilan: 55,
    kind: 'dated',
    startHour: 23,
    startMinute: 0,
    durationHours: 5.5,
    fixedStartISO: '2026-12-07T23:00:00+01:00',
    fixedEndISO: '2026-12-08T04:30:00+01:00',
    hoursLabel: 'Lun 7 Dic 2026 · 23:00 – 04:30',
    minAge: '18+',
    hasDinner: false,
    genres: ['EDM', 'Commercial', 'Tech-House', 'Urban'],
    posterSrc: '/images/events/weekly-posters/number-one-brescia-immacolata-7-dicembre.webp',
    assetKeys: ['numberone-01', 'numberone-02', 'numberone-03', 'numberone-04'],
    enSlug: 'number-one-corte-franca-brescia-december-7-2026-immacolata-party',
    itSlug: 'number-one-corte-franca-brescia-7-dicembre-2026-immacolata',
    slugStem: 'number-one-brescia-7-dec-2026',
    titleIt: 'Prefestivo dell’Immacolata Multisala @ Number One Corte Franca · Lunedì 7 Dicembre 2026',
    titleEn: 'Immaculate Conception Eve Multisala @ Number One Corte Franca · Monday, Dec 7, 2026',
    formatSummaryIt: 'Notte evento prefestiva del 7 dicembre con apertura sale multiple e Balconata VIP al Number One di Corte Franca',
    formatSummaryEn: 'December 7 pre-holiday multi-arena festival night with VIP balcony bottle service at Number One Corte Franca',
    dressIt: 'Smart Club Casual (documento fisico obbligatorio)',
    dressEn: 'Smart Club Casual (physical photo ID mandatory)',
  },
  {
    id: 'number-one-brescia-student-xmas-22-dicembre',
    venueId: 'v-number-one-brescia',
    clubKey: 'numberone',
    nyeSlug: 'capodanno-number-one-brescia',
    venueName: 'Number One Franciacorta',
    city: 'Corte Franca',
    province: 'BS',
    streetAddress: 'Via Provinciale, 1/B',
    postalCode: '25040',
    latitude: 45.6295,
    longitude: 10.0189,
    highwayExitIt: 'Uscita A4 Rovato / Palazzolo -> SP XI Corte Franca (12 min)',
    highwayExitEn: 'A4 Rovato / Palazzolo exit -> SP XI Corte Franca (12 min)',
    driveMinutesFromMilan: 55,
    kind: 'dated',
    startHour: 22,
    startMinute: 30,
    durationHours: 5.5,
    fixedStartISO: '2026-12-22T22:30:00+01:00',
    fixedEndISO: '2026-12-23T04:00:00+01:00',
    hoursLabel: 'Mar 22 Dic 2026 · 22:30 – 04:00',
    minAge: '16+ / Studenti (documento originale obbligatorio)',
    hasDinner: false,
    genres: ['Commercial', 'Urban', 'EDM', 'Student Festival'],
    posterSrc: '/images/events/weekly-posters/number-one-brescia-student-xmas-22-dicembre.webp',
    assetKeys: ['numberone-01', 'numberone-02', 'numberone-03', 'numberone-04'],
    enSlug: 'number-one-corte-franca-the-end-student-xmas-party-december-22-2026',
    itSlug: 'the-end-student-xmas-party-number-one-brescia-22-dicembre-2026',
    slugStem: 'number-one-brescia-student-xmas-22-dec-2026',
    titleIt: 'THE END: Student Xmas Party @ Number One Corte Franca (BS) · Martedì 22 Dicembre 2026',
    titleEn: 'THE END: Student Xmas Party @ Number One Corte Franca (Brescia) · Tuesday, Dec 22, 2026',
    formatSummaryIt: 'Il grande festival studentesco natalizio di Brescia e Franciacorta dalle 22:30 alle 04:00 nell’arena multisala del Number One',
    formatSummaryEn: 'Brescia and Franciacorta’s flagship Christmas student festival from 22:30 until 04:00 at Number One megaclub',
    dressIt: 'Festive Student Casual (documento d’identità fisico originale obbligatorio)',
    dressEn: 'Festive Student Casual (original physical photo ID mandatory)',
  },
];

// Lazily build 35-locale slug maps to avoid any circular module init order with localizedSlugs35
let NIGHT_MAPS_READY = false;
const NIGHT_SLUGS_BY_ID: Record<string, Record<LocaleCode, string>> = {};
const SLUG_TO_NIGHT_ID = new Map<string, string>();

function ensureNightSlugMaps(): void {
  if (NIGHT_MAPS_READY) return;
  NIGHT_MAPS_READY = true;
  for (const ev of BERGAMO_BRESCIA_ACTIVE_NIGHTS) {
    const locMap = {} as Record<LocaleCode, string>;
    for (const loc of enabledLocaleCodes) {
      if (loc === 'en') {
        locMap[loc] = ev.enSlug;
      } else if (loc === 'it') {
        locMap[loc] = ev.itSlug;
      } else {
        const tk = SLUG_TOKENS_35[loc] || SLUG_TOKENS_35.en;
        locMap[loc] = `${ev.slugStem}-${tk.party}-${tk.vipTables}-${loc}`;
      }
      SLUG_TO_NIGHT_ID.set(locMap[loc].toLowerCase(), ev.id);
    }
    NIGHT_SLUGS_BY_ID[ev.id] = locMap;
    SLUG_TO_NIGHT_ID.set(ev.id.toLowerCase(), ev.id);
    SLUG_TO_NIGHT_ID.set(ev.enSlug.toLowerCase(), ev.id);
    SLUG_TO_NIGHT_ID.set(ev.itSlug.toLowerCase(), ev.id);
  }
}

export function getBergamoBresciaNightSeed(idOrSlug: string): BergamoBresciaActiveNightSeed | undefined {
  ensureNightSlugMaps();
  const id = SLUG_TO_NIGHT_ID.get((idOrSlug || '').trim().toLowerCase());
  if (!id) return undefined;
  return BERGAMO_BRESCIA_ACTIVE_NIGHTS.find((x) => x.id === id);
}

export function resolveBergamoBresciaNightId(rawSlug: string): string | undefined {
  ensureNightSlugMaps();
  return SLUG_TO_NIGHT_ID.get((rawSlug || '').trim().toLowerCase());
}

export function bergamoBresciaNightSlug(idOrSlug: string, rawLocale: string): string {
  ensureNightSlugMaps();
  const id = resolveBergamoBresciaNightId(idOrSlug) || idOrSlug;
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  return NIGHT_SLUGS_BY_ID[id]?.[loc] || NIGHT_SLUGS_BY_ID[id]?.en || id;
}

export function bergamoBresciaNightPath(idOrSlug: string, rawLocale: string): string {
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  const lp = localePrefix(loc);
  const eventsDir = getLocalizedDir35('events', loc);
  return `${lp}/${eventsDir}/${bergamoBresciaNightSlug(idOrSlug, loc)}`;
}

export function bergamoBresciaNightHreflangAlternates(id: string): Record<string, string> {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const entries: [string, string][] = indexedLocaleCodes.map((loc) => [
    getLocaleDef(loc)?.hreflang || loc,
    `${baseUrl}${bergamoBresciaNightPath(id, loc)}`,
  ]);
  entries.push(['x-default', `${baseUrl}${bergamoBresciaNightPath(id, 'en')}`]);
  return Object.fromEntries(entries);
}

/**
 * Computes startISO and endISO in Europe/Rome, skipping holiday collision dates
 * (2026-12-25 when club has dedicated Christmas party, and 2026-12-31 NYE) for weekly nights.
 */
export function computeActiveNightWindowISO(
  ev: BergamoBresciaActiveNightSeed,
  now: Date = new Date(),
): { startISO: string; endISO: string; isExpired: boolean } {
  if (ev.kind === 'dated' && ev.fixedStartISO && ev.fixedEndISO) {
    const expired = Date.parse(ev.fixedEndISO) < now.getTime();
    return { startISO: ev.fixedStartISO, endISO: ev.fixedEndISO, isExpired: expired };
  }

  const targetDow = ev.dayOfWeek ?? 6;
  const hasDedicatedXmas = BERGAMO_BRESCIA_ACTIVE_NIGHTS.some(
    (other) => other.venueId === ev.venueId && other.fixedStartISO?.startsWith('2026-12-25'),
  );

  for (let addDays = 0; addDays <= 21; addDays++) {
    const cand = new Date(now.getTime() + addDays * 86400000);
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/Rome',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    }).formatToParts(cand);
    const y = parts.find((p) => p.type === 'year')?.value || '2026';
    const m = parts.find((p) => p.type === 'month')?.value || '11';
    const d = parts.find((p) => p.type === 'day')?.value || '28';
    const wk = parts.find((p) => p.type === 'weekday')?.value || 'Sat';
    const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    if (dowMap[wk] !== targetDow) continue;

    const ymd = `${y}-${m}-${d}`;
    if (ymd === '2026-12-31') continue;
    if (ymd === '2026-12-25' && hasDedicatedXmas) continue;

    const hh = String(ev.startHour).padStart(2, '0');
    const mm = String(ev.startMinute).padStart(2, '0');
    const startISO = `${ymd}T${hh}:${mm}:00+01:00`;
    const endMs = Date.parse(startISO) + ev.durationHours * 3600 * 1000;
    if (endMs < now.getTime()) continue;
    const endISO = new Date(endMs).toISOString();
    return { startISO, endISO, isExpired: false };
  }

  const fallbackStart = '2026-12-05T23:30:00+01:00';
  return { startISO: fallbackStart, endISO: '2026-12-06T04:30:00+01:00', isExpired: false };
}

export interface NightUiPack {
  homeLabel: string;
  eventsLabel: string;
  hubLabel: string;
  weeklyBadge: string;
  datedBadge: string;
  uponRequest: string;
  tocTitle: string;
  tocOverview: string;
  tocSchedule: string;
  tocTiers: string;
  tocGallery: string;
  tocMap: string;
  tocFaq: string;
  overviewHeading: string;
  scheduleHeading: string;
  tiersHeading: string;
  mapHeading: string;
  faqHeading: string;
  bookWaCta: string;
  openClubCta: string;
  openNyeCta: string;
  openHubCta: string;
  tierDinner: string;
  tierEntry: string;
  tierVip: string;
  dayLabels: { wednesday: string; friday: string; saturday: string };
}

const NIGHT_UI_35: Readonly<Record<LocaleCode, NightUiPack>> = (() => {
  const full6: Record<'it' | 'en' | 'es' | 'fr' | 'de' | 'pt', NightUiPack> = {
    it: {
      homeLabel: 'Home',
      eventsLabel: 'Eventi',
      hubLabel: 'Bergamo & Brescia',
      weeklyBadge: 'Serata Settimanale Attiva',
      datedBadge: 'Data Speciale Dicembre 2026',
      uponRequest: 'Su richiesta via WhatsApp',
      tocTitle: 'Indice Rapido della Serata',
      tocOverview: '1. Panoramica & Atmosfera',
      tocSchedule: '2. Orari & Svolgimento',
      tocTiers: '3. Liste, Cene & Tavoli VIP',
      tocGallery: '4. Galleria Foto Locale & Outfit',
      tocMap: '5. Indirizzo, Casello A4 & Mappa',
      tocFaq: '6. Domande Frequenti (FAQ)',
      overviewHeading: 'Panoramica della Serata, Musica e Selezione all’Ingresso',
      scheduleHeading: 'Programma Orario della Notte',
      tiersHeading: 'Formule d’Ingresso, Cena e Tavoli VIP Privé',
      mapHeading: 'Come Arrivare dall’Autostrada A4, Parcheggio e Mappa',
      faqHeading: 'Domande Frequenti sulla Serata',
      bookWaCta: 'Prenota Tavolo / Lista su WhatsApp',
      openClubCta: 'Scheda Ufficiale del Club',
      openNyeCta: 'Capodanno 2027 in Questo Club',
      openHubCta: 'Tutti i 6 Club Bergamo & Brescia',
      tierDinner: 'Tavolo Cena / Dinner Show (dalle 21:00)',
      tierEntry: 'Ingresso in Lista Nominale / Prevendita Salta-Fila',
      tierVip: 'Tavolo VIP Privé / Consolle con Bottiglie',
      dayLabels: { wednesday: 'Ogni Mercoledì', friday: 'Ogni Venerdì', saturday: 'Ogni Sabato' },
    },
    en: {
      homeLabel: 'Home',
      eventsLabel: 'Events',
      hubLabel: 'Bergamo & Brescia',
      weeklyBadge: 'Active Weekly Club Night',
      datedBadge: 'December 2026 Special Date',
      uponRequest: 'Upon request via WhatsApp',
      tocTitle: 'Event Quick Navigation',
      tocOverview: '1. Event Overview & Vibe',
      tocSchedule: '2. Doors & Night Timeline',
      tocTiers: '3. Guest List, Dinner & VIP Tables',
      tocGallery: '4. Venue & Outfit Photo Gallery',
      tocMap: '5. Address, A4 Highway Exit & Map',
      tocFaq: '6. Frequently Asked Questions',
      overviewHeading: 'Night Overview, Music Format & Door Selection',
      scheduleHeading: 'Evening Schedule & Peak Hours',
      tiersHeading: 'Entry Formulas, Dinner & VIP Privé Tables',
      mapHeading: 'Getting There via A4 Motorway, Parking & Map',
      faqHeading: 'Frequently Asked Questions',
      bookWaCta: 'Book VIP Table / List on WhatsApp',
      openClubCta: 'Official Club Profile',
      openNyeCta: 'New Year’s Eve 2027 at This Club',
      openHubCta: 'All 6 Bergamo & Brescia Clubs',
      tierDinner: 'Dinner Show Reserved Table (from 21:00)',
      tierEntry: 'Nominal Guest List / Pre-Sale Entry',
      tierVip: 'VIP Privé / DJ Booth Bottle Table',
      dayLabels: { wednesday: 'Every Wednesday', friday: 'Every Friday', saturday: 'Every Saturday' },
    },
    es: {
      homeLabel: 'Inicio',
      eventsLabel: 'Eventos',
      hubLabel: 'Bérgamo y Brescia',
      weeklyBadge: 'Sesión Semanal Activa',
      datedBadge: 'Fecha Especial Diciembre 2026',
      uponRequest: 'Consultar por WhatsApp',
      tocTitle: 'Índice de la Fiesta',
      tocOverview: '1. Resumen y Ambiente',
      tocSchedule: '2. Horarios de la Noche',
      tocTiers: '3. Lista, Cena y Mesas VIP',
      tocGallery: '4. Galería del Club y Dress Code',
      tocMap: '5. Dirección, Autopista A4 y Mapa',
      tocFaq: '6. Preguntas Frecuentes',
      overviewHeading: 'Ambiente de la Fiesta, Música y Dress Code',
      scheduleHeading: 'Horario de Apertura y Momentos Clave',
      tiersHeading: 'Opciones de Entrada, Cena y Mesas VIP Privé',
      mapHeading: 'Cómo Llegar por la Autopista A4 y Mapa',
      faqHeading: 'Preguntas Frecuentes',
      bookWaCta: 'Reservar Mesa / Lista en WhatsApp',
      openClubCta: 'Ver Ficha del Club',
      openNyeCta: 'Nochevieja 2027 en Este Club',
      openHubCta: 'Los 6 Clubes de Bérgamo y Brescia',
      tierDinner: 'Mesa Cena Espectáculo (desde 21:00)',
      tierEntry: 'Lista Nominal / Entrada Anticipada',
      tierVip: 'Mesa VIP Privé con Botellas',
      dayLabels: { wednesday: 'Cada Miércoles', friday: 'Cada Viernes', saturday: 'Cada Sábado' },
    },
    fr: {
      homeLabel: 'Accueil',
      eventsLabel: 'Soirées',
      hubLabel: 'Bergame & Brescia',
      weeklyBadge: 'Soirée Hebdomadaire Active',
      datedBadge: 'Date Spéciale Décembre 2026',
      uponRequest: 'Sur demande via WhatsApp',
      tocTitle: 'Sommaire de la Soirée',
      tocOverview: '1. Présentation & Ambiance',
      tocSchedule: '2. Horaires de la Nuit',
      tocTiers: '3. Guest List, Dîner & Tables VIP',
      tocGallery: '4. Galerie du Club & Tenue',
      tocMap: '5. Adresse, Autoroute A4 & Carte',
      tocFaq: '6. Questions Fréquentes',
      overviewHeading: 'Présentation de la Soirée, Musique et Sélection',
      scheduleHeading: 'Déroulement et Horaires de la Nuit',
      tiersHeading: 'Formules Entrée, Dîner et Tables Carré VIP',
      mapHeading: 'Accès Autoroute A4, Parking et Plan',
      faqHeading: 'Questions Fréquentes',
      bookWaCta: 'Réserver Table / Liste sur WhatsApp',
      openClubCta: 'Fiche Officielle du Club',
      openNyeCta: 'Nouvel An 2027 dans ce Club',
      openHubCta: 'Les 6 Clubs Bergame & Brescia',
      tierDinner: 'Table Dîner Spectacle (dès 21h00)',
      tierEntry: 'Guest List Nominative / Prévente',
      tierVip: 'Table Carré VIP Privé avec Bouteilles',
      dayLabels: { wednesday: 'Chaque Mercredi', friday: 'Chaque Vendredi', saturday: 'Chaque Samedi' },
    },
    de: {
      homeLabel: 'Start',
      eventsLabel: 'Events',
      hubLabel: 'Bergamo & Brescia',
      weeklyBadge: 'Wöchentliche Clubnacht',
      datedBadge: 'Sondertermin Dezember 2026',
      uponRequest: 'Auf Anfrage per WhatsApp',
      tocTitle: 'Schnellnavigation zum Event',
      tocOverview: '1. Überblick & Musikstil',
      tocSchedule: '2. Einlass & Ablauf',
      tocTiers: '3. Gästeliste, Dinner & VIP-Tische',
      tocGallery: '4. Location- & Dresscode-Galerie',
      tocMap: '5. Adresse, A4-Ausfahrt & Karte',
      tocFaq: '6. Häufige Fragen (FAQ)',
      overviewHeading: 'Überblick zur Clubnacht, Musik & Einlasskriterien',
      scheduleHeading: 'Zeitplan des Abends',
      tiersHeading: 'Einlass, Dinner-Show & VIP-Privé-Tische',
      mapHeading: 'Anfahrt über Autobahn A4, Parken & Karte',
      faqHeading: 'Häufige Fragen zum Event',
      bookWaCta: 'VIP-Tisch / Liste per WhatsApp buchen',
      openClubCta: 'Offizielles Club-Profil',
      openNyeCta: 'Silvester 2027 in diesem Club',
      openHubCta: 'Alle 6 Clubs in Bergamo & Brescia',
      tierDinner: 'Dinner-Show-Tisch (ab 21:00 Uhr)',
      tierEntry: 'Gästeliste / Vorverkauf-Einlass',
      tierVip: 'VIP-Privé-Tisch mit Flaschenservice',
      dayLabels: { wednesday: 'Jeden Mittwoch', friday: 'Jeden Freitag', saturday: 'Jeden Samstag' },
    },
    pt: {
      homeLabel: 'Início',
      eventsLabel: 'Eventos',
      hubLabel: 'Bérgamo e Brescia',
      weeklyBadge: 'Noite Semanal Ativa',
      datedBadge: 'Data Especial Dezembro 2026',
      uponRequest: 'Sob consulta no WhatsApp',
      tocTitle: 'Índice Rápido do Evento',
      tocOverview: '1. Visão Geral e Estilo',
      tocSchedule: '2. Horários da Noite',
      tocTiers: '3. Lista, Jantar e Mesas VIP',
      tocGallery: '4. Galeria da Casa e Traje',
      tocMap: '5. Endereço, Rodovia A4 e Mapa',
      tocFaq: '6. Perguntas Frequentes',
      overviewHeading: 'Visão Geral da Noite, Música e Dress Code',
      scheduleHeading: 'Cronograma da Noite',
      tiersHeading: 'Lista, Jantar Show e Camarotes VIP Privé',
      mapHeading: 'Acesso pela Rodovia A4, Estacionamento e Mapa',
      faqHeading: 'Perguntas Frequentes',
      bookWaCta: 'Reservar Mesa / Lista no WhatsApp',
      openClubCta: 'Perfil Oficial do Clube',
      openNyeCta: 'Réveillon 2027 Neste Clube',
      openHubCta: 'Os 6 Clubes de Bérgamo e Brescia',
      tierDinner: 'Mesa Jantar Show (a partir das 21:00)',
      tierEntry: 'Guest List Nominal / Ingresso Antecipado',
      tierVip: 'Mesa VIP Privé com Garrafas',
      dayLabels: { wednesday: 'Toda Quarta', friday: 'Toda Sexta', saturday: 'Todo Sábado' },
    },
  };

  const compact: Record<
    Exclude<LocaleCode, 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt'>,
    {
      ev: string;
      wk: string;
      dt: string;
      req: string;
      ov: string;
      sc: string;
      ti: string;
      ga: string;
      mp: string;
      fq: string;
      wa: string;
      cl: string;
      ny: string;
      wed: string;
      fri: string;
      sat: string;
    }
  > = {
    nl: { ev: 'Evenementen', wk: 'Wekelijkse Clubavond', dt: 'Speciale Datum Dec 2026', req: 'Op aanvraag via WhatsApp', ov: 'Overzicht & Muziek', sc: 'Tijdschema', ti: 'Gastenlijst & VIP-Tafels', ga: 'Fotogalerij & Dresscode', mp: 'Adres, A4 & Kaart', fq: 'Veelgestelde Vragen', wa: 'Boek via WhatsApp', cl: 'Clubprofiel', ny: 'Oud en Nieuw 2027', wed: 'Elke Woensdag', fri: 'Elke Vrijdag', sat: 'Elke Zaterdag' },
    ru: { ev: 'События', wk: 'Еженедельная вечеринка', dt: 'Спецсобытие декабря 2026', req: 'По запросу в WhatsApp', ov: 'Обзор и музыка', sc: 'Расписание ночи', ti: 'Списки и VIP-столы', ga: 'Фотогалерея и дресс-код', mp: 'Адрес, трасса A4 и карта', fq: 'Частые вопросы', wa: 'Бронь в WhatsApp', cl: 'Профиль клуба', ny: 'Новый год 2027', wed: 'Каждую среду', fri: 'Каждую пятницу', sat: 'Каждую субботу' },
    tr: { ev: 'Etkinlikler', wk: 'Haftalık Kulüp Gecesi', dt: 'Aralık 2026 Özel Gece', req: 'WhatsApp ile sorunuz', ov: 'Genel Bakış ve Müzik', sc: 'Gece Programı', ti: 'Giriş Listesi ve VIP Masalar', ga: 'Fotoğraf Galerisi ve Kıyafet', mp: 'Adres, A4 Otoyolu ve Harita', fq: 'Sıkça Sorulan Sorular', wa: 'WhatsApp Rezervasyon', cl: 'Kulüp Profili', ny: 'Yılbaşı 2027', wed: 'Her Çarşamba', fri: 'Her Cuma', sat: 'Her Cumartesi' },
    zh: { ev: '活动日历', wk: '每周常驻派对', dt: '2026年12月特别场次', req: '通过 WhatsApp 咨询', ov: '派对概览与音乐风格', sc: '当晚时间表', ti: '名单入场与 VIP 卡座', ga: '实景图集与着装指南', mp: '地址、A4高速与地图', fq: '常见问题解答', wa: 'WhatsApp 预订卡座', cl: '查看俱乐部主页', ny: '2027 跨年派对', wed: '每周三', fri: '每周五', sat: '每周六' },
    ar: { ev: 'الفعاليات', wk: 'سهرة أسبوعية نشطة', dt: 'موعد خاص ديسمبر 2026', req: 'عند الطلب عبر واتساب', ov: 'نظرة عامة والموسيقى', sc: 'جدول السهرة', ti: 'قائمة الدخول وطاولات VIP', ga: 'معرض الصور والزي', mp: 'العنوان وطريق A4 والخريطة', fq: 'الأسئلة الشائعة', wa: 'احجز عبر واتساب', cl: 'صفحة النادي', ny: 'رأس السنة 2027', wed: 'كل أربعاء', fri: 'كل جمعة', sat: 'كل سبت' },
    bg: { ev: 'Събития', wk: 'Седмично парти', dt: 'Специална дата дек 2026', req: 'По запитване в WhatsApp', ov: 'Обзор и музика', sc: 'График на вечерта', ti: 'Списък и VIP маси', ga: 'Галерия и дрес код', mp: 'Адрес, магистрала A4 и карта', fq: 'Често задавани въпроси', wa: 'Резервирай в WhatsApp', cl: 'Профил на клуба', ny: 'Нова година 2027', wed: 'Всяка сряда', fri: 'Всеки петък', sat: 'Всяка събота' },
    hr: { ev: 'Događaji', wk: 'Tjedni klupski program', dt: 'Posebni datum prosinac 2026.', req: 'Na upit putem WhatsAppa', ov: 'Pregled i glazba', sc: 'Raspored večeri', ti: 'Popis gostiju i VIP stolovi', ga: 'Galerija i dress code', mp: 'Adresa, autocesta A4 i karta', fq: 'Česta pitanja', wa: 'Rezerviraj na WhatsApp', cl: 'Profil kluba', ny: 'Doček 2027.', wed: 'Svake srijede', fri: 'Svakog petka', sat: 'Svake subote' },
    cs: { ev: 'Akce', wk: 'Pravidelná klubová noc', dt: 'Speciální datum prosinec 2026', req: 'Na vyžádání přes WhatsApp', ov: 'Přehled a hudba', sc: 'Harmonogram večera', ti: 'Guestlist a VIP stoly', ga: 'Fotogalerie a dress code', mp: 'Adresa, dálnice A4 a mapa', fq: 'Časté dotazy', wa: 'Rezervace přes WhatsApp', cl: 'Profil klubu', ny: 'Silvestr 2027', wed: 'Každou středu', fri: 'Každý pátek', sat: 'Každou sobotu' },
    da: { ev: 'Events', wk: 'Ugentlig klubaften', dt: 'Særlig dato dec 2026', req: 'På forespørgsel via WhatsApp', ov: 'Overblik og musik', sc: 'Aftenens program', ti: 'Gæsteliste og VIP-borde', ga: 'Fotogalleri og dresscode', mp: 'Adresse, A4 og kort', fq: 'Ofte stillede spørgsmål', wa: 'Book via WhatsApp', cl: 'Klubprofil', ny: 'Nytårsaften 2027', wed: 'Hver onsdag', fri: 'Hver fredag', sat: 'Hver lørdag' },
    et: { ev: 'Üritused', wk: 'Iganädalane klubiõhtu', dt: 'Erikuupäev dets 2026', req: 'Päringu alusel WhatsAppis', ov: 'Ülevaade ja muusika', sc: 'Õhtu ajakava', ti: 'Külalistenimekiri ja VIP-lauad', ga: 'Pildigalerii ja riietus', mp: 'Aadress, A4 ja kaart', fq: 'Korduma kippuvad küsimused', wa: 'Broneeri WhatsAppis', cl: 'Klubi profiil', ny: 'Aastavahetus 2027', wed: 'Igal kolmapäeval', fri: 'Igal reedel', sat: 'Igal laupäeval' },
    fi: { ev: 'Tapahtumat', wk: 'Viikoittainen klubi-ilta', dt: 'Erikoispäivä joulukuu 2026', req: 'Kysy WhatsAppissa', ov: 'Yleiskatsaus ja musiikki', sc: 'Illan aikataulu', ti: 'Vieraslista ja VIP-pöydät', ga: 'Kuvagalleria ja pukukoodi', mp: 'Osoite, A4-moottoritie ja kartta', fq: 'Usein kysytyt kysymykset', wa: 'Varaa WhatsAppissa', cl: 'Klubiprofiili', ny: 'Uusivuosi 2027', wed: 'Joka keskiviikko', fri: 'Joka perjantai', sat: 'Joka lauantai' },
    el: { ev: 'Εκδηλώσεις', wk: 'Εβδομαδιαία βραδιά', dt: 'Ειδική ημερομηνία Δεκ 2026', req: 'Κατόπιν αιτήματος στο WhatsApp', ov: 'Επισκόπηση & Μουσική', sc: 'Πρόγραμμα βραδιάς', ti: 'Guestlist & VIP Τραπέζια', ga: 'Φωτογραφίες & Dress Code', mp: 'Διεύθυνση, Α4 & Χάρτης', fq: 'Συχνές Ερωτήσεις', wa: 'Κράτηση μέσω WhatsApp', cl: 'Προφίλ Κλαμπ', ny: 'Πρωτοχρονιά 2027', wed: 'Κάθε Τετάρτη', fri: 'Κάθε Παρασκευή', sat: 'Κάθε Σάββατο' },
    hu: { ev: 'Események', wk: 'Heti klubest', dt: 'Különleges dátum 2026. dec.', req: 'Érdeklődés WhatsAppon', ov: 'Áttekintés és zene', sc: 'Esti menetrend', ti: 'Vendéglista és VIP asztalok', ga: 'Galéria és dress code', mp: 'Cím, A4 autópálya és térkép', fq: 'Gyakori kérdések', wa: 'Foglalás WhatsAppon', cl: 'Klub adatlap', ny: 'Szilveszter 2027', wed: 'Minden szerdán', fri: 'Minden pénteken', sat: 'Minden szombaton' },
    ga: { ev: 'Imeachtaí', wk: 'Oíche Chlub Sheachtainiúil', dt: 'Dáta Speisialta Nollaig 2026', req: 'Ar iarratas trí WhatsApp', ov: 'Forbhreathnú & Ceol', sc: 'Sceideal na hOíche', ti: 'Liosta Aíonna & Boird VIP', ga: 'Gailearaí & Cód Feistis', mp: 'Seoladh, Mótarbhealach A4 & Léarscáil', fq: 'Ceisteanna Coitianta', wa: 'Cuir in áirithe ar WhatsApp', cl: 'Próifíl an Chlub', ny: 'Oíche Chinn Bhliana 2027', wed: 'Gach Céadaoin', fri: 'Gach Aoine', sat: 'Gach Satharn' },
    lv: { ev: 'Pasākumi', wk: 'Iknedēļas kluba nakts', dt: 'Īpašs datums 2026. dec.', req: 'Pēc pieprasījuma WhatsApp', ov: 'Pārskats un mūzika', sc: 'Vakara gaita', ti: 'Viesu saraksts un VIP galdiņi', ga: 'Galerija un dress-kods', mp: 'Adrese, A4 šoseja un karte', fq: 'Biežāk uzdotie jautājumi', wa: 'Rezervēt WhatsApp', cl: 'Kluba profils', ny: 'Jaunais gads 2027', wed: 'Katru trešdienu', fri: 'Katru piektdienu', sat: 'Katru sestdienu' },
    lt: { ev: 'Renginiai', wk: 'Savaitinis klubo vakaras', dt: 'Speciali data 2026 gruodis', req: 'Pagal užklausą per WhatsApp', ov: 'Apžvalga ir muzika', sc: 'Vakaro eiga', ti: 'Svečių sąrašas ir VIP staliukai', ga: 'Galerija ir aprangos kodas', mp: 'Adresas, A4 kelias ir žemėlapis', fq: 'DUK', wa: 'Rezervuoti per WhatsApp', cl: 'Klubo profilis', ny: 'Naujieji metai 2027', wed: 'Kiekvieną trečiadienį', fri: 'Kiekvieną penktadienį', sat: 'Kiekvieną šeštadienį' },
    mt: { ev: 'Avvenimenti', wk: 'Lejla fil-Klabb ta’ Kull Ġimgħa', dt: 'Data Speċjali Diċembru 2026', req: 'Fuq talba fuq WhatsApp', ov: 'Ħarsa Ġenerali u Mużika', sc: 'Skeda tal-Lejla', ti: 'Guest List u Imwejjed VIP', ga: 'Gallerija u Dress Code', mp: 'Indirizz, A4 u Mappa', fq: 'Mistoqsijiet Komuni', wa: 'Ibbukkja fuq WhatsApp', cl: 'Profil tal-Klabb', ny: 'Ewwel tas-Sena 2027', wed: 'Kull nhar ta’ Erbgħa', fri: 'Kull nhar ta’ Ġimgħa', sat: 'Kull nhar ta’ Sibt' },
    pl: { ev: 'Wydarzenia', wk: 'Cotygodniowa noc klubowa', dt: 'Data specjalna grudzień 2026', req: 'Na zapytanie przez WhatsApp', ov: 'Opis i muzyka', sc: 'Plan wieczoru', ti: 'Lista gości i stoliki VIP', ga: 'Galeria i dress code', mp: 'Adres, autostrada A4 i mapa', fq: 'Najczęstsze pytania', wa: 'Rezerwuj przez WhatsApp', cl: 'Profil klubu', ny: 'Sylwester 2027', wed: 'W każdą środę', fri: 'W każdy piątek', sat: 'W każdą sobotę' },
    ro: { ev: 'Evenimente', wk: 'Seară săptămânală de club', dt: 'Dată specială decembrie 2026', req: 'La cerere pe WhatsApp', ov: 'Prezentare și muzică', sc: 'Programul serii', ti: 'Guest list și mese VIP', ga: 'Galerie foto și dress code', mp: 'Adresă, autostrada A4 și hartă', fq: 'Întrebări frecvente', wa: 'Rezervă pe WhatsApp', cl: 'Profilul clubului', ny: 'Revelion 2027', wed: 'În fiecare miercuri', fri: 'În fiecare vineri', sat: 'În fiecare sâmbătă' },
    sk: { ev: 'Podujatia', wk: 'Týždenná klubová noc', dt: 'Špeciálny dátum december 2026', req: 'Na vyžiadanie cez WhatsApp', ov: 'Prehľad a hudba', sc: 'Program večera', ti: 'Guestlist a VIP stoly', ga: 'Fotogaléria a dress code', mp: 'Adresa, diaľnica A4 a mapa', fq: 'Časté otázky', wa: 'Rezervovať cez WhatsApp', cl: 'Profil klubu', ny: 'Silvester 2027', wed: 'Každú stredu', fri: 'Každý piatok', sat: 'Každú sobotu' },
    sl: { ev: 'Dogodki', wk: 'Tedenski klubski večer', dt: 'Posebni datum december 2026', req: 'Po povpraševanju na WhatsApp', ov: 'Pregled in glasba', sc: 'Urnik večera', ti: 'Seznam gostov in VIP mize', ga: 'Galerija in dress code', mp: 'Naslov, avtocesta A4 in zemljevid', fq: 'Pogosta vprašanja', wa: 'Rezerviraj prek WhatsAppa', cl: 'Profil kluba', ny: 'Silvestrovanje 2027', wed: 'Vsako sredo', fri: 'Vsak petek', sat: 'Vsako soboto' },
    sv: { ev: 'Evenemang', wk: 'Veckovis klubbkväll', dt: 'Specialdatum dec 2026', req: 'På förfrågan via WhatsApp', ov: 'Översikt och musik', sc: 'Kvällens schema', ti: 'Gästlista och VIP-bord', ga: 'Fotogalleri och klädkod', mp: 'Adress, motorväg A4 och karta', fq: 'Vanliga frågor', wa: 'Boka via WhatsApp', cl: 'Klubbprofil', ny: 'Nyårsafton 2027', wed: 'Varje onsdag', fri: 'Varje fredag', sat: 'Varje lördag' },
    no: { ev: 'Arrangementer', wk: 'Ukentlig klubbkveld', dt: 'Spesialdato des 2026', req: 'På forespørsel via WhatsApp', ov: 'Oversikt og musikk', sc: 'Kveldens program', ti: 'Gjesteliste og VIP-bord', ga: 'Bildegalleri og kleskode', mp: 'Adresse, motorvei A4 og kart', fq: 'Ofte stilte spørsmål', wa: 'Bestill på WhatsApp', cl: 'Klubbprofil', ny: 'Nyttårsaften 2027', wed: 'Hver onsdag', fri: 'Hver fredag', sat: 'Hver lørdag' },
    is: { ev: 'Viðburðir', wk: 'Vikulegt klúbbakvöld', dt: 'Sérstök dagsetning des 2026', req: 'Eftir fyrirspurn á WhatsApp', ov: 'Yfirlit og tónlist', sc: 'Dagskrá kvöldsins', ti: 'Gestalisti og VIP borð', ga: 'Myndasafn og klæðaburður', mp: 'Heimilisfang, A4 og kort', fq: 'Algengar spurningar', wa: 'Bóka á WhatsApp', cl: 'Klúbbasíða', ny: 'Gamlárskvöld 2027', wed: 'Á miðvikudögum', fri: 'Á föstudögum', sat: 'Á laugardögum' },
    uk: { ev: 'Події', wk: 'Щотижнева клубна ніч', dt: 'Спеціальна дата грудня 2026', req: 'За запитом у WhatsApp', ov: 'Огляд та музика', sc: 'Розклад ночі', ti: 'Списки гостей та VIP-столи', ga: 'Фотогалерея та дрес-код', mp: 'Адреса, траса A4 та мапа', fq: 'Часті запитання', wa: 'Бронювати у WhatsApp', cl: 'Профіль клубу', ny: 'Новий рік 2027', wed: 'Щосереди', fri: 'Щоп’ятниці', sat: 'Щосуботи' },
    sq: { ev: 'Evente', wk: 'Mbrëmje Javore në Klub', dt: 'Datë Speciale Dhjetor 2026', req: 'Me kërkesë në WhatsApp', ov: 'Përmbledhje & Muzika', sc: 'Orari i Natës', ti: 'Lista e Hyrjes & Tavolina VIP', ga: 'Galeria & Kodi i Veshjes', mp: 'Adresa, Autostrada A4 & Harta', fq: 'Pyetje të Shpeshta', wa: 'Rezervo në WhatsApp', cl: 'Profili i Klubit', ny: 'Viti i Ri 2027', wed: 'Çdo të Mërkurë', fri: 'Çdo të Premte', sat: 'Çdo të Shtunë' },
    sr: { ev: 'Događaji', wk: 'Nedeljno klupsko veče', dt: 'Specijalni datum decembar 2026.', req: 'Na upit putem WhatsApp-a', ov: 'Pregled i muzika', sc: 'Raspored večeri', ti: 'Lista gostiju i VIP stolovi', ga: 'Galerija i dress code', mp: 'Adresa, autoput A4 i mapa', fq: 'Česta pitanja', wa: 'Rezerviši na WhatsApp', cl: 'Profil kluba', ny: 'Doček 2027.', wed: 'Svake srede', fri: 'Svakog petka', sat: 'Svake subote' },
    bs: { ev: 'Događaji', wk: 'Sedmična klupska noć', dt: 'Specijalni datum decembar 2026.', req: 'Na upit putem WhatsAppa', ov: 'Pregled i muzika', sc: 'Raspored večeri', ti: 'Lista gostiju i VIP stolovi', ga: 'Galerija i dress code', mp: 'Adresa, autoput A4 i mapa', fq: 'Česta pitanja', wa: 'Rezerviši na WhatsApp', cl: 'Profil kluba', ny: 'Doček 2027.', wed: 'Svake srijede', fri: 'Svakog petka', sat: 'Svake subote' },
    mk: { ev: 'Настани', wk: 'Неделна клупска вечер', dt: 'Специјален датум дек 2026', req: 'По барање на WhatsApp', ov: 'Преглед и музика', sc: 'Распоред на вечерта', ti: 'Гостинска листа и VIP маси', ga: 'Галерија и дрес код', mp: 'Адреса, автопат A4 и мапа', fq: 'Чести прашања', wa: 'Резервирај на WhatsApp', cl: 'Профил на клубот', ny: 'Нова година 2027', wed: 'Секоја среда', fri: 'Секој петок', sat: 'Секоја сабота' },
  };

  const out: Partial<Record<LocaleCode, NightUiPack>> = { ...full6 };
  (Object.keys(compact) as Array<keyof typeof compact>).forEach((loc) => {
    const c = compact[loc];
    out[loc] = {
      homeLabel: 'Home',
      eventsLabel: c.ev,
      hubLabel: 'Bergamo & Brescia',
      weeklyBadge: c.wk,
      datedBadge: c.dt,
      uponRequest: c.req,
      tocTitle: 'Menu',
      tocOverview: `1. ${c.ov}`,
      tocSchedule: `2. ${c.sc}`,
      tocTiers: `3. ${c.ti}`,
      tocGallery: `4. ${c.ga}`,
      tocMap: `5. ${c.mp}`,
      tocFaq: `6. ${c.fq}`,
      overviewHeading: c.ov,
      scheduleHeading: c.sc,
      tiersHeading: c.ti,
      mapHeading: c.mp,
      faqHeading: c.fq,
      bookWaCta: c.wa,
      openClubCta: c.cl,
      openNyeCta: c.ny,
      openHubCta: 'Bergamo & Brescia (6 Clubs)',
      tierDinner: `Dinner Show (21:00) · ${c.req}`,
      tierEntry: `Guest List / Entry · ${c.req}`,
      tierVip: `VIP Privé Table · ${c.req}`,
      dayLabels: { wednesday: c.wed, friday: c.fri, saturday: c.sat },
    };
  });
  return out as Readonly<Record<LocaleCode, NightUiPack>>;
})();

export function getNightUi35(rawLocale: string): NightUiPack {
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  return NIGHT_UI_35[loc] || NIGHT_UI_35.en;
}

export interface LocalizedBergamoBresciaNightDetail {
  seed: BergamoBresciaActiveNightSeed;
  ui: NightUiPack;
  slug: string;
  canonicalPath: string;
  clubPath: string;
  nyePath: string;
  hubPath: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  badgeText: string;
  whenLabel: string;
  quickAnswer: string;
  overviewParagraphs: [string, string, string];
  scheduleSteps: Array<{ time: string; title: string; detail: string }>;
  tiers: Array<{ title: string; badge: string; detail: string; waUrl: string }>;
  faqs: Array<{ q: string; a: string }>;
  waMainUrl: string;
}

export function getBergamoBresciaNightLocalized(
  idOrSlug: string,
  rawLocale: string,
): LocalizedBergamoBresciaNightDetail | null {
  const seed = getBergamoBresciaNightSeed(idOrSlug);
  if (!seed) return null;
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  const ui = getNightUi35(loc);
  const lp = localePrefix(loc);
  const clubsDir = getLocalizedDir35('clubs', loc);
  const canonicalPath = bergamoBresciaNightPath(seed.id, loc);
  const clubPath = `${lp}/${clubsDir}/${getLocalizedVenueSlug35(seed.venueId, loc)}`;
  const nyePath = capodannoEventPath(seed.nyeSlug, loc);
  const hubPath = `${lp}${getLocalizedSeoPagePath35('/bergamo-brescia', loc)}`;

  const isIt = loc === 'it';
  const dayDisplay =
    seed.kind === 'weekly' && seed.dayKey
      ? ui.dayLabels[seed.dayKey]
      : seed.hoursLabel.split(' · ')[0];

  const baseTitle = isIt ? seed.titleIt : seed.titleEn;
  const h1 =
    loc === 'it' || loc === 'en'
      ? baseTitle
      : `${dayDisplay} · ${seed.venueName} (${seed.city}, ${seed.province}) - ${seed.genres.slice(0, 2).join(' & ')}`;

  const formatSummary = isIt ? seed.formatSummaryIt : seed.formatSummaryEn;
  const dress = isIt ? seed.dressIt : seed.dressEn;
  const highway = isIt ? seed.highwayExitIt : seed.highwayExitEn;
  const fullAddr = `${seed.streetAddress}, ${seed.postalCode} ${seed.city} (${seed.province})`;

  const metaTitle =
    h1.length <= 60 ? h1 : `${seed.venueName} (${seed.city}) · ${dayDisplay} VIP`;
  const metaDescription = isIt
    ? `${seed.venueName} (${fullAddr}, ${seed.hoursLabel}): ${formatSummary}. Dress code ${dress}. Tavoli VIP e liste su WhatsApp +39 351 912 7047.`.slice(0, 160)
    : `${seed.venueName} (${fullAddr}, ${seed.hoursLabel}): ${formatSummary}. VIP tables & guest list via WhatsApp +39 351 912 7047.`.slice(0, 160);

  const quickAnswer = isIt
    ? `${seed.titleIt} si svolge presso ${seed.venueName} in ${fullAddr} (${dayDisplay}, orari ${seed.hoursLabel}). ${formatSummary}. Età consigliata: ${seed.minAge}. Dress code: ${dress}. Raggiungibile in circa ${seed.driveMinutesFromMilan} minuti da Milano lungo l’autostrada A4 (${highway}). Prenotazioni ufficiali tavoli VIP Privé, cene e liste su WhatsApp +39 351 912 7047.`
    : `${baseTitle} takes place at ${seed.venueName}, ${fullAddr} (${dayDisplay} · ${seed.hoursLabel}). ${formatSummary}. Target age: ${seed.minAge}. Dress code: ${dress}. Reachable in ~${seed.driveMinutesFromMilan} minutes from Milan along the A4 motorway (${highway}). Official VIP Privé tables and guest list bookings via WhatsApp +39 351 912 7047.`;

  const overviewParagraphs: [string, string, string] = isIt
    ? [
        `${seed.venueName} (${fullAddr}) rappresenta uno dei sei poli fondamentali del corridoio notturno Bergamo-Brescia sull’asse autostradale A4. Con l’appuntamento "${seed.titleIt}" (${seed.hoursLabel}), il locale propone una regia musicale focalizzata su ${seed.genres.join(', ')}, progettata per offrire acustica nitida, accoglienza strutturata e aree Tavoli VIP Privé separate dal flusso generale della pista.`,
        `La selezione all’ingresso richiede abbigliamento coerente con l’identità del club (${dress}) ed età minima ${seed.minAge}, sempre accompagnata da documento d’identità fisico originale. Per i gruppi di amici, coppie, feste di compleanno o lauree, la prenotazione anticipata del Tavolo Privé garantisce accesso prioritario dedicato e bottiglie servite al tavolo senza attese.`,
        `Dal punto di vista logistico, ${seed.venueName} dista circa ${seed.driveMinutesFromMilan} minuti da Milano Est lungo l’autostrada A4 (${highway}) e dispone di parcheggi comodi nelle immediate vicinanze dell’ingresso, rendendo agevole sia l’arrivo per cena o apertura porte sia il rientro a fine serata.`,
      ]
    : [
        `${seed.venueName} (${fullAddr}) stands among the six flagship clubs anchoring the Bergamo and Brescia A4 nightlife corridor. During "${seed.titleEn}" (${seed.hoursLabel}), the venue delivers a curated sound experience spanning ${seed.genres.join(', ')}, pairing punchy club production with elevated VIP Privé seating and attentive bottle service.`,
        `Door selection enforces ${dress} alongside a ${seed.minAge} age guideline and mandatory physical government-issued photo ID. Groups of friends, couples, birthday celebrations, and corporate guests can reserve a VIP Privé booth in advance to enjoy dedicated fast-track reception and reserved seating throughout the night.`,
        `Strategically positioned ~${seed.driveMinutesFromMilan} minutes east of Milan via the A4 highway (${highway}), ${seed.venueName} offers straightforward road access and convenient club parking right by the venue.`,
      ];

  const scheduleSteps = seed.hasDinner
    ? [
        {
          time: '21:00',
          title: isIt ? 'Apertura Ristorante & Dinner Show' : 'Dinner Show Doors & Welcome',
          detail: isIt ? 'Accoglienza tavoli cena riservati, menu servito e intrattenimento musicale dal vivo.' : 'Seated dinner service, Franciacorta & wine pairings, and live vocal entertainment.',
        },
        {
          time: '23:30',
          title: isIt ? 'Apertura Club, Liste & Tavoli Dopocena' : 'Club Doors, Guest List & VIP Check-In',
          detail: isIt ? 'Ingresso ospiti dopocena e apertura postazioni Tavoli VIP Privé e Consolle.' : 'After-dinner guest entry and VIP Privé bottle table check-in.',
        },
        {
          time: '01:00 – Chiusura',
          title: isIt ? 'Peak-Time Main Room & Bottle Show' : 'Peak-Time Dancefloor & Bottle Service',
          detail: `${seed.genres.join(' · ')} (${seed.hoursLabel}).`,
        },
      ]
    : [
        {
          time: `${String(seed.startHour).padStart(2, '0')}:${String(seed.startMinute).padStart(2, '0')}`,
          title: isIt ? 'Apertura Porte, Liste & Accoglienza VIP' : 'Doors Open, Guest List & VIP Reception',
          detail: isIt ? 'Ingresso agevolato entro la prima ora di apertura e check-in diretto al varco Tavoli Privé.' : 'Smooth early entry and priority hostess escort for reserved VIP tables.',
        },
        {
          time: '01:00',
          title: isIt ? 'Clou della Notte in Main Room' : 'Peak-Time Resident & Guest DJ Set',
          detail: `${seed.genres.join(' · ')}.`,
        },
        {
          time: seed.hoursLabel.split('–')[1]?.trim() || '04:30',
          title: isIt ? 'Last Track & Deflusso Parcheggi A4' : 'Closing Set & Smooth Exit',
          detail: highway,
        },
      ];

  const waMainUrl = getConciergeBookingUrl(loc, `${seed.venueName} (${seed.city}) · ${dayDisplay}`, canonicalPath);
  const tiers = [
    ...(seed.hasDinner
      ? [
          {
            title: ui.tierDinner,
            badge: ui.uponRequest,
            detail: isIt
              ? 'Tavolo ristorante riservato dalle 21:00 con possibilità di mantenimento tavolo nella fase club.'
              : 'Reserved 21:00 dinner-show table with optional seamless club table continuation.',
            waUrl: getConciergeBookingUrl(loc, `Cena / Dinner Show · ${seed.venueName} (${dayDisplay})`, canonicalPath),
          },
        ]
      : []),
    {
      title: ui.tierEntry,
      badge: ui.uponRequest,
      detail: isIt
        ? 'Accredito nominale o prevendita ufficiale secondo disponibilità della serata.'
        : 'Nominal guest list or official pre-sale release subject to night capacity.',
      waUrl: getConciergeBookingUrl(loc, `Lista / Ingresso · ${seed.venueName} (${dayDisplay})`, canonicalPath),
    },
    {
      title: ui.tierVip,
      badge: ui.uponRequest,
      detail: isIt
        ? 'Accesso prioritario salta-fila, divanetto riservato in Privé/Balconata e credito in bottiglie per il gruppo.'
        : 'Skip-the-line VIP admission, reserved Privé/Balcony booth, and full bottle credit.',
      waUrl: getConciergeBookingUrl(loc, `Tavolo VIP Privé · ${seed.venueName} (${dayDisplay})`, canonicalPath),
    },
  ];

  const faqs = [
    {
      q: isIt ? `Dove si trova ${seed.venueName} e come si arriva da Milano o Bergamo?` : `Where is ${seed.venueName} located and how do I get there?`,
      a: `${fullAddr} · ${highway} (~${seed.driveMinutesFromMilan} min A4).`,
    },
    {
      q: isIt ? `Quali sono gli orari di "${baseTitle}"?` : `What are the opening hours for "${baseTitle}"?`,
      a: `${dayDisplay} · ${seed.hoursLabel}.`,
    },
    {
      q: isIt ? `Qual è il dress code e l’età minima richiesta?` : `What is the dress code and minimum age?`,
      a: `${dress} · ${seed.minAge}.`,
    },
    {
      q: isIt ? `Che musica suonano durante la serata?` : `What music genres are played?`,
      a: `${seed.genres.join(', ')}: ${formatSummary}.`,
    },
    {
      q: isIt ? `Come prenoto un Tavolo VIP Privé o la lista su WhatsApp?` : `How do I reserve a VIP Privé table or guest list?`,
      a: isIt
        ? `Scrivi direttamente al Concierge Ufficiale Nightlife Milan su WhatsApp al +39 351 912 7047 indicando data, nome del locale (${seed.venueName}) e numero di ospiti.`
        : `Message the Official Nightlife Milan Concierge on WhatsApp at +39 351 912 7047 with your date, venue (${seed.venueName}), and group size.`,
    },
    {
      q: isIt ? `${seed.venueName} organizza anche il veglione di Capodanno 2027?` : `Does ${seed.venueName} also host a New Year’s Eve 2027 party?`,
      a: isIt
        ? `Sì: consulta la scheda dedicata al Capodanno 2027 di ${seed.venueName} direttamente dal link in questa pagina o chiedi il listino aggiornato su WhatsApp +39 351 912 7047.`
        : `Yes: open the dedicated ${seed.venueName} New Year’s Eve 2027 event page linked above or request live NYE availability on WhatsApp +39 351 912 7047.`,
    },
  ];

  return {
    seed,
    ui,
    slug: bergamoBresciaNightSlug(seed.id, loc),
    canonicalPath,
    clubPath,
    nyePath,
    hubPath,
    metaTitle,
    metaDescription,
    h1,
    subtitle: `${seed.venueName} · ${fullAddr} · ${seed.hoursLabel}`,
    badgeText: seed.kind === 'weekly' ? ui.weeklyBadge : ui.datedBadge,
    whenLabel: `${dayDisplay} · ${seed.hoursLabel}`,
    quickAnswer,
    overviewParagraphs,
    scheduleSteps,
    tiers,
    faqs,
    waMainUrl,
  };
}

export interface BergamoBresciaCardViewModel {
  id: string;
  clubKey: BergamoBresciaActiveNightSeed['clubKey'];
  province: 'BG' | 'BS';
  city: string;
  venueName: string;
  kind: 'weekly' | 'dated' | 'nye';
  title: string;
  whenLabel: string;
  genresLabel: string;
  posterSrc: string;
  href: string;
  waHref: string;
  endISO: string;
}

export function getBergamoBresciaActiveNightCards(
  rawLocale: string,
  now: Date = new Date(),
): BergamoBresciaCardViewModel[] {
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  const ui = getNightUi35(loc);
  const out: BergamoBresciaCardViewModel[] = [];

  for (const seed of BERGAMO_BRESCIA_ACTIVE_NIGHTS) {
    const win = computeActiveNightWindowISO(seed, now);
    if (win.isExpired) continue;
    const href = bergamoBresciaNightPath(seed.id, loc);
    const dayDisplay =
      seed.kind === 'weekly' && seed.dayKey
        ? `${ui.dayLabels[seed.dayKey]} · ${seed.hoursLabel}`
        : seed.hoursLabel;
    const title =
      loc === 'it'
        ? seed.titleIt
        : loc === 'en'
          ? seed.titleEn
          : `${seed.venueName} (${seed.city}) · ${dayDisplay}`;
    out.push({
      id: seed.id,
      clubKey: seed.clubKey,
      province: seed.province,
      city: seed.city,
      venueName: seed.venueName,
      kind: seed.kind,
      title,
      whenLabel: dayDisplay,
      genresLabel: seed.genres.slice(0, 3).join(' · '),
      posterSrc: seed.posterSrc,
      href,
      waHref: getConciergeBookingUrl(loc, `${seed.venueName} · ${dayDisplay}`, href),
      endISO: win.endISO,
    });
  }
  return out;
}
