import { getCapodannoOfficialPosterSrc } from '@/lib/seoEventImages';
import type {
  PriceBreakdown,
  SinglePassSku,
  SinglePassVenueId,
  SinglePassVenueSpec,
} from './types';

export const SINGLE_PASS_FEE_RATE = 0.15 as const;

export const WHATSAPP_MINI_GROUP_START_DATE_ISO = '2026-12-20';

export const SPOKEN_LANGUAGE_OPTIONS: readonly string[] = [
  'Italiano',
  'English',
  'Español',
  'Français',
  'Deutsch',
  'Português',
  'Nederlands',
  'Русский',
  'العربية',
  '中文',
];

export const SINGLE_PASS_VENUES: readonly SinglePassVenueSpec[] = [
  {
    id: 'gate',
    eventSlug: 'capodanno-gate-milano',
    name: 'PERREO XL @ Gate Milano',
    taglineIt: 'Giovani 18–26 · Reggaeton, Dembow & Latin Urban fino all’alba',
    taglineEn: 'Young 18–26 · Reggaeton, Dembow & Latin Urban all night',
    district: 'Garibaldi / Scalo Farini',
    address: 'Via Valtellina 21, 20159 Milano',
    hours: '23:00 – 05:00',
    ageBandLabelIt: '18–26 anni · Giovani',
    ageBandLabelEn: 'Ages 18–26 · Young Crowd',
    recommendedMinAge: 18,
    recommendedMaxAge: 26,
    strictMaxAge: null,
    musicIt: 'Reggaeton, Dembow, Latin Urban & Perreo (party dalle 23:00)',
    musicEn: 'Reggaeton, Dembow, Latin Urban & Perreo (party from 23:00)',
    dressCodeIt: 'Urban Chic curato per la notte di San Silvestro',
    dressCodeEn: 'Elevated Urban Chic New Year’s Eve attire',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-gate-milano'),
  },
  {
    id: 'pineta',
    eventSlug: 'capodanno-pineta-milano',
    name: 'Pineta Milano · Moulin Rouge',
    taglineIt: 'Under 30 (18–29 rigoroso) · Cena Cantata Burlesque, Royal Buffet & 2 Sale Club',
    taglineEn: 'Strict Under 30 (18–29) · Moulin Rouge Burlesque Gala, Buffet & 2 Club Rooms',
    district: 'Porta Garibaldi / Cenisio',
    address: 'Via Messina 38, 20154 Milano',
    hours: '20:30 – 05:00',
    ageBandLabelIt: '18–29 anni · Under 30 tassativo',
    ageBandLabelEn: 'Ages 18–29 · Strict Under 30',
    recommendedMinAge: 18,
    recommendedMaxAge: 29,
    strictMaxAge: 29,
    musicIt: 'Main Room (House, Commerciale, Hit 2000) & Urban Room (Hip-Hop, Reggaeton) + 2 show Burlesque',
    musicEn: 'Main Room (House, Commercial, 2000s Hits) & Urban Room (Hip-Hop, Reggaeton) + 2 Burlesque shows',
    dressCodeIt: 'Elegante Red & Black Glam Moulin Rouge (rigoroso per Under 30)',
    dressCodeEn: 'Smart Elegant Red & Black Glam Moulin Rouge (strict Under 30 door policy)',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-pineta-milano'),
  },
  {
    id: 'repvblic',
    eventSlug: 'capodanno-repvblic-milano',
    name: 'REPVBLIC Milano',
    taglineIt: 'Internazionale & Expat 22–40 · Hit Mondiali, Hip Hop & House in Piazza della Repubblica',
    taglineEn: 'International & Expat 22–40 · Global Hits, Hip Hop & House at Piazza della Repubblica',
    district: 'Repubblica / Centro',
    address: 'Piazza della Repubblica 12, 20124 Milano',
    hours: '23:00 – 05:00',
    ageBandLabelIt: '22–40 anni · Pubblico Internazionale',
    ageBandLabelEn: 'Ages 22–40 · International Crowd',
    recommendedMinAge: 22,
    recommendedMaxAge: 40,
    strictMaxAge: null,
    musicIt: 'Hit Internazionali, Hip Hop & House · Solo party dalle 23:00 con flûte di mezzanotte',
    musicEn: 'International Hits, Hip Hop & House · Party from 23:00 with midnight champagne toast',
    dressCodeIt: 'Look elegante e curato da gran soirée di San Silvestro',
    dressCodeEn: 'Elevated, stylish New Year’s Eve evening look',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-repvblic-milano'),
  },
  {
    id: 'justme',
    eventSlug: 'capodanno-justme-milano-torre-branca',
    name: 'Just Me Milano · Torre Branca',
    taglineIt: 'Luxury & Fashion 30–49 · Il Grande Gatsby con Cenone 5 Portate e Super Privé',
    taglineEn: 'Luxury & Fashion 30–49 · The Great Gatsby 5-Course Gala & VIP Privé under Torre Branca',
    district: 'Parco Sempione / Triennale',
    address: 'Viale Luigi Camoens 2, 20121 Milano',
    hours: '20:00 – 05:30',
    ageBandLabelIt: '30–49 anni · Luxury & Fashion',
    ageBandLabelEn: 'Ages 30–49 · Luxury & Fashion',
    recommendedMinAge: 30,
    recommendedMaxAge: 49,
    strictMaxAge: null,
    musicIt: 'Dinner Show Il Grande Gatsby, violini elettrici, performer e DJ Set House Luxury',
    musicEn: 'The Great Gatsby Dinner Show, electric violins, live performers & Luxury House DJ set',
    dressCodeIt: 'Black Tie / Abito da sera elegante / Il Grande Gatsby (selezione rigorosa)',
    dressCodeEn: 'Black Tie / Formal Evening Gown & Suit / Gatsby Glam (strict door selection)',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-justme-milano-torre-branca'),
  },
  {
    id: '55-milano',
    eventSlug: 'capodanno-55-milano',
    name: '55 Milano · Loft Sempione',
    taglineIt: '30–50 · Loft da 1.000 mq con Cena Cantata, Royal Buffet e Revival 80/90',
    taglineEn: 'Ages 30–50 · 1,000 sqm Industrial Loft Dinner Show, Royal Buffet & 80s/90s Revival',
    district: 'Arco della Pace / Sempione',
    address: 'Via Piero della Francesca 55, 20154 Milano',
    hours: '20:00 – 05:00',
    ageBandLabelIt: '30–50 anni · Cena Cantata & Loft',
    ageBandLabelEn: 'Ages 30–50 · Dinner Show & Loft',
    recommendedMinAge: 30,
    recommendedMaxAge: 50,
    strictMaxAge: null,
    musicIt: 'Live Dinner Show cantato, Revival 80/90 & Vocal House nel loft con grande pista',
    musicEn: 'Interactive Live Dinner Show, 80s/90s Revival & Vocal House across a 1,000 sqm loft',
    dressCodeIt: 'Elegante / Smart Chic',
    dressCodeEn: 'Elegant / Smart Chic',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-55-milano'),
  },
  {
    id: 'bischeri',
    eventSlug: 'capodanno-bischeri-milano',
    name: 'Bischeri Milano · Speciale Over 50',
    taglineIt: 'Dedicato Over 50 (50+) · Gran Cenone Servito Terra o Mare & Party con DJ Gigi Zeus',
    taglineEn: 'Dedicated Over 50 (50+) · Served Land or Sea Gala Dinner & DJ Gigi Zeus in Navigli',
    district: 'Navigli / Darsena',
    address: 'Viale Gorizia 8, 20144 Milano',
    hours: '20:30 – 05:00',
    ageBandLabelIt: 'Over 50 (50+) · Tavolata Social dedicata',
    ageBandLabelEn: 'Over 50 (50+) · Dedicated Social Table',
    recommendedMinAge: 50,
    recommendedMaxAge: 85,
    strictMaxAge: null,
    musicIt: 'Music Dinner Show con DJ Gigi Zeus, Prosecco Extra-Dry a mezzanotte e party elegante',
    musicEn: 'Music Dinner Show with DJ Gigi Zeus, midnight Extra-Dry Prosecco & classy party set',
    dressCodeIt: 'Elegante / Smart Chic di San Silvestro',
    dressCodeEn: 'Elegant / Smart Chic New Year’s Eve attire',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-bischeri-milano'),
  },
];

export const SINGLE_PASS_SKUS: readonly SinglePassSku[] = [
  // ── 1. PERREO XL @ Gate Milano (18–26) ────────────────────────────────────
  {
    id: 'gate-vip-prive-share',
    venueId: 'gate',
    category: 'vip-table-share',
    featured: true,
    titleIt: 'Quota Tavolo Privé VIP Condiviso',
    titleEn: 'Shared VIP Privé Table Quota',
    descriptionIt: 'Quota individuale garantita nel Tavolo Privé VIP condiviso (base 600€ / 10 quote). Accesso prioritario e credito bottiglie diviso nel gruppo 18–26.',
    descriptionEn: 'Guaranteed individual seat in a shared VIP Privé table (€600 / 10 shares). Skip-the-line admission and bottle credit shared across the 18–26 social table.',
    arrivalTime: '23:00',
    basePriceCents: 6000,
    genderPolicy: 'equal',
  },
  {
    id: 'gate-main-floor-share',
    venueId: 'gate',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Pista Condiviso',
    titleEn: 'Shared Main Floor Table Quota',
    descriptionIt: 'Posto riservato nel Tavolo Pista condiviso (base 500€ / 10 quote) nel cuore dell’energia PERREO XL.',
    descriptionEn: 'Reserved spot at a shared Main Floor bottle table (€500 / 10 shares) right in the heart of PERREO XL.',
    arrivalTime: '23:00',
    basePriceCents: 5000,
    genderPolicy: 'equal',
  },
  {
    id: 'gate-early-bird',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass Early Bird (entro 00:00)',
    titleEn: 'Single Pass Early Bird (before 00:00)',
    descriptionIt: 'Ingresso singolo garantito entro mezzanotte con accesso al mini-gruppo WhatsApp dal 20 dicembre ed entrata unita in lista Nightlife Milan.',
    descriptionEn: 'Guaranteed pre-midnight admission with official Dec 20 WhatsApp mini-group matching and coordinated Nightlife Milan entry.',
    arrivalTime: '23:00',
    basePriceCents: 2000,
    genderPolicy: 'equal',
  },
  {
    id: 'gate-first-release',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass 1st Release (dopo 00:00)',
    titleEn: 'Single Pass 1st Release (after 00:00)',
    descriptionIt: 'Prima wave flessibile per ingresso dopo mezzanotte nel gruppo social PERREO XL 18–26.',
    descriptionEn: 'First flexible release for post-midnight admission inside the PERREO XL 18–26 social group.',
    arrivalTime: '00:15',
    basePriceCents: 2500,
    genderPolicy: 'equal',
  },
  {
    id: 'gate-second-release',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass 2nd Release',
    titleEn: 'Single Pass 2nd Release',
    descriptionIt: 'Seconda wave d’ingresso flessibile per festeggiare l’anno nuovo senza compagnia fissa.',
    descriptionEn: 'Second release club entry to celebrate New Year’s Eve surrounded by matched solo guests.',
    arrivalTime: '23:30',
    basePriceCents: 3500,
    genderPolicy: 'equal',
  },
  {
    id: 'gate-final-wave',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass Final Wave',
    titleEn: 'Single Pass Final Wave',
    descriptionIt: 'Ultima disponibilità garantita senza limiti d’orario all’ingresso con il gruppo Nightlife Milan.',
    descriptionEn: 'Final release all-night access arriving with the Nightlife Milan solo host.',
    arrivalTime: '23:30',
    basePriceCents: 4500,
    genderPolicy: 'equal',
  },

  // ── 2. Pineta Milano · Under 30 Tassativo (18–29) ──────────────────────────
  {
    id: 'pineta-all-night-gala-table',
    venueId: 'pineta',
    category: 'all-night-combo',
    featured: true,
    titleIt: 'All-Night: Gala Dinner Social + Quota Tavolo Dance Floor',
    titleEn: 'All-Night: Social Gala Dinner + Dancefloor Table Share',
    descriptionIt: 'Esperienza completa Under 30: Gran Cenone servito ore 21:00 al tavolo social (vino ogni 3, 2 show Burlesque) più quota riservata al Tavolo Dance Floor per il dopocena.',
    descriptionEn: 'Complete Under 30 NYE pass: Seated Gala Dinner at 21:00 (wine, 2 live Burlesque shows) plus guaranteed seat at a shared Dancefloor bottle table.',
    arrivalTime: '20:45',
    basePriceCents: 22000,
    genderPolicy: 'equal',
    requiresDietary: true,
  },
  {
    id: 'pineta-gala-dinner',
    venueId: 'pineta',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Cena di Gala Servita al Tavolo Social Under 30',
    titleEn: 'Seated Gala Dinner at Under 30 Social Table',
    descriptionIt: 'Ore 21:00. Menu completo servito al tavolo condiviso Under 30, acqua, caffè, 1 bottiglia di vino ogni 3 ospiti, 2 spettacoli Burlesque e party nelle 2 sale.',
    descriptionEn: 'From 21:00. Full multi-course gala dinner at the Under 30 social table with wine, 2 live Burlesque shows, and dual-room clubbing access.',
    arrivalTime: '20:45',
    basePriceCents: 16000,
    genderPolicy: 'equal',
    requiresDietary: true,
  },
  {
    id: 'pineta-vip-prive-share',
    venueId: 'pineta',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo VIP Privé Condiviso Under 30',
    titleEn: 'Shared VIP Privé Table Quota (Under 30)',
    descriptionIt: 'Quota individuale nel Tavolo VIP Privé condiviso (1.500€ / 10 quote) con bottiglie premium, ingresso prioritario e gruppo Under 30.',
    descriptionEn: 'Individual share inside the shared VIP Privé table (€1,500 / 10 shares) with skip-the-line access and bottle credit.',
    arrivalTime: '23:00',
    basePriceCents: 15000,
    genderPolicy: 'equal',
  },
  {
    id: 'pineta-balcony-share',
    venueId: 'pineta',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Privé Balcony Condiviso',
    titleEn: 'Shared Privé Balcony Table Quota',
    descriptionIt: 'Balconata panoramica sulla Main Room (900€ / 10 quote) in condivisione con single e coppie amicali Under 30.',
    descriptionEn: 'Elevated panoramic Balcony VIP booth (€900 / 10 shares) shared exclusively with verified Under 30 guests.',
    arrivalTime: '23:00',
    basePriceCents: 9000,
    genderPolicy: 'equal',
  },
  {
    id: 'pineta-dancefloor-share',
    venueId: 'pineta',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Dance Floor Condiviso',
    titleEn: 'Shared Dancefloor Table Quota',
    descriptionIt: 'Posto al Tavolo Dance Floor condiviso a bordo pista Main Room (600€ / 10 quote) con ingresso saltacoda.',
    descriptionEn: 'Reserved spot at the Main Room Dancefloor bottle table (€600 / 10 shares) with fast-track entry.',
    arrivalTime: '23:00',
    basePriceCents: 6000,
    genderPolicy: 'equal',
  },
  {
    id: 'pineta-royal-buffet',
    venueId: 'pineta',
    category: 'royal-buffet',
    titleIt: 'Royal Buffet Social Under 30 (ore 20:30)',
    titleEn: 'Royal Buffet Social Under 30 (20:30)',
    descriptionIt: 'Buffet caldo e freddo con cotechino e lenticchie, flûte di benvenuto, 1 drink e 2 show Burlesque nel gruppo Under 30.',
    descriptionEn: 'Standing/lounge NYE buffet at 20:30 with welcome champagne flûte, 1 drink, and 2 Burlesque shows in the Under 30 group.',
    arrivalTime: '20:30',
    basePriceCents: 4000,
    genderPolicy: 'equal',
  },
  {
    id: 'pineta-club-entry',
    venueId: 'pineta',
    category: 'club-entry',
    titleIt: 'Single Pass Solo Discoteca Under 30 (23:00)',
    titleEn: 'Under 30 Club Entry Single Pass (23:00)',
    descriptionIt: 'Ingresso nelle 2 sale Main Room & Urban Room dalle 23:00 con 1 drink e brindisi di mezzanotte nel gruppo Under 30.',
    descriptionEn: 'Two-room club admission from 23:00 with 1 drink and midnight toast inside the Under 30 group.',
    arrivalTime: '23:00',
    basePriceCents: 4000,
    genderPolicy: 'equal',
  },

  // ── 3. REPVBLIC Milano (22–40 Internazionale) ──────────────────────────────
  {
    id: 'repvblic-prive-share',
    venueId: 'repvblic',
    category: 'vip-table-share',
    featured: true,
    titleIt: 'Quota Tavolo Zona Privé VIP Condiviso',
    titleEn: 'Shared VIP Privé Zone Table Quota',
    descriptionIt: 'Quota individuale nel Tavolo Zona Privé condiviso (1.200€ / 10 quote) con pubblico internazionale ed expat in Piazza della Repubblica.',
    descriptionEn: 'Guaranteed seat at a shared VIP Privé table (€1,200 / 10 shares) with an international & expat crowd in central Milan.',
    arrivalTime: '23:00',
    basePriceCents: 12000,
    genderPolicy: 'equal',
  },
  {
    id: 'repvblic-dancefloor-share',
    venueId: 'repvblic',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Zona Dancefloor Condiviso',
    titleEn: 'Shared Dancefloor Table Quota',
    descriptionIt: 'Quota individuale nel Tavolo Dancefloor (600€ / 6 quote) nel cuore della pista house e hip-hop.',
    descriptionEn: 'Reserved spot at a shared Dancefloor table (€600 / 6 shares) right next to the main house & hip-hop stage.',
    arrivalTime: '23:00',
    basePriceCents: 10000,
    genderPolicy: 'equal',
  },
  {
    id: 'repvblic-early-bird',
    venueId: 'repvblic',
    category: 'club-entry',
    titleIt: 'Single Pass Early Bird dalle 23:00 (Flûte + 1 Drink)',
    titleEn: 'Single Pass Early Bird from 23:00 (Flûte + 1 Drink)',
    descriptionIt: 'Ingresso dalle 23:00 con flûte per il countdown e 1 drink inclusi, abbinato al mini-gruppo internazionale dal 20 dicembre.',
    descriptionEn: 'Club admission from 23:00 including midnight sparkling flûte and 1 drink, matched in our Dec 20 international WhatsApp mini-group.',
    arrivalTime: '23:00',
    basePriceCents: 4500,
    genderPolicy: 'equal',
  },

  // ── 4. Just Me Milano (30–49 Luxury & Fashion) ─────────────────────────────
  {
    id: 'justme-all-night-gala-vip',
    venueId: 'justme',
    category: 'all-night-combo',
    featured: true,
    titleIt: 'All-Night: Gran Cenone 5 Portate + Quota Tavolo VIP Pista',
    titleEn: 'All-Night: 5-Course Gatsby Gala Dinner + Shared Dancefloor VIP Table',
    descriptionIt: 'La formula di punta 30–49 sotto la Torre Branca: cena gourmet servita alle 20:00 al tavolo social + quota tavolo VIP Pista per tutta la notte.',
    descriptionEn: 'Premier 30–49 package under Torre Branca: seated 5-course gourmet dinner at 20:00 plus a guaranteed seat at a shared VIP bottle table till 05:30.',
    arrivalTime: '20:00',
    basePriceCents: 40000,
    genderPolicy: 'equal',
    requiresDietary: true,
  },
  {
    id: 'justme-gala-dinner',
    venueId: 'justme',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Gran Cenone di Gala Servito 5 Portate al Tavolo Social',
    titleEn: '5-Course Served Gala Dinner at 30–49 Social Table',
    descriptionIt: 'Dalle 20:00. Menu 5 portate gourmet, vini selezionati inclusi, Dinner Show Il Grande Gatsby e accesso completo alla festa.',
    descriptionEn: 'From 20:00. Five-course luxury gala dinner with curated wines, live Great Gatsby show, and full nightclub admission.',
    arrivalTime: '20:00',
    basePriceCents: 30000,
    genderPolicy: 'equal',
    requiresDietary: true,
  },
  {
    id: 'justme-super-prive-share',
    venueId: 'justme',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Super Privé Champagne Condiviso',
    titleEn: 'Shared Super Privé Champagne Table Quota',
    descriptionIt: 'Posto riservato in area Super Privé luxury 30–49 con ingresso VIP prioritario e servizio bottiglie top di gamma condiviso.',
    descriptionEn: 'Reserved VIP seat inside an exclusive 30–49 Super Privé Champagne booth with fast-track admission.',
    arrivalTime: '23:30',
    basePriceCents: 25000,
    genderPolicy: 'equal',
  },
  {
    id: 'justme-dancefloor-vip-share',
    venueId: 'justme',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo VIP Pista Condiviso (600€ / 6 quote)',
    titleEn: 'Shared Dancefloor VIP Table Quota (€600 / 6 shares)',
    descriptionIt: 'Tavolo VIP Pista condiviso tra 6 ospiti singoli selezionati fascia 30–49, con salto fila e bottiglie.',
    descriptionEn: 'Shared Dancefloor VIP table split among 6 verified 30–49 solo guests with priority entry and bottle service.',
    arrivalTime: '23:30',
    basePriceCents: 10000,
    genderPolicy: 'equal',
  },
  {
    id: 'justme-club-entry',
    venueId: 'justme',
    category: 'club-entry',
    titleIt: 'Single Pass Dopocena Torre Branca (1 Drink Premium)',
    titleEn: 'Torre Branca After-Dinner Single Pass (1 Premium Drink)',
    descriptionIt: 'Ingresso dalle 23:30 con 1 drink premium e coordinamento nel mini-gruppo WhatsApp fascia 30–49 dal 20 dicembre.',
    descriptionEn: 'Admission from 23:30 with 1 premium drink and matched Dec 20 WhatsApp mini-group coordination.',
    arrivalTime: '23:30',
    basePriceCents: 8000,
    genderPolicy: 'equal',
  },

  // ── 5. 55 Milano (30–50 Loft Sempione) ─────────────────────────────────────
  {
    id: '55-all-night-gala-vip',
    venueId: '55-milano',
    category: 'all-night-combo',
    featured: true,
    titleIt: 'All-Night: Gran Cenone Servito + Quota Tavolo VIP',
    titleEn: 'All-Night: Served Gala Dinner + Shared VIP Table Quota',
    descriptionIt: 'Formula integrale nel loft di Via Piero della Francesca 55: cena cantata ore 20:00 + quota tavolo VIP riservato per il dopocena revival 80/90 & House.',
    descriptionEn: 'All-night loft package at 55 Milano: seated dinner show at 20:00 plus a shared VIP bottle booth for the 80s/90s Revival & Vocal House party.',
    arrivalTime: '20:00',
    basePriceCents: 21000,
    genderPolicy: 'equal',
    requiresDietary: true,
  },
  {
    id: '55-gala-dinner',
    venueId: '55-milano',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Gran Cenone Servito di San Silvestro al Tavolo Social',
    titleEn: 'Served New Year’s Eve Gala Dinner at 30–50 Social Table',
    descriptionIt: 'Dalle 20:00. Menu completo servito al tavolo social 30–50 con vini inclusi, cena cantata dal vivo e festa fino alle 05:00.',
    descriptionEn: 'From 20:00. Full served multi-course NYE menu with wines included, live singing dinner show, and party until 05:00.',
    arrivalTime: '20:00',
    basePriceCents: 14000,
    genderPolicy: 'equal',
    requiresDietary: true,
  },
  {
    id: '55-vip-table-share',
    venueId: '55-milano',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo VIP Privé Condiviso con Bottiglie',
    titleEn: 'Shared VIP Privé Table with Bottle Service',
    descriptionIt: 'Posto riservato al Tavolo VIP condiviso fascia 30–50 con salto fila e credito bottiglie nel loft Sempione.',
    descriptionEn: 'Guaranteed VIP table seat in Sempione with priority admission and shared bottle service credit.',
    arrivalTime: '23:00',
    basePriceCents: 9000,
    genderPolicy: 'equal',
  },
  {
    id: '55-royal-buffet',
    venueId: '55-milano',
    category: 'royal-buffet',
    titleIt: 'Royal Buffet di Gala Social (ore 20:30)',
    titleEn: 'Social Royal Gala Buffet (from 20:30)',
    descriptionIt: 'Apericena e buffet caldo/freddo di San Silvestro con 1 drink, flûte di mezzanotte e accesso diretto alla serata.',
    descriptionEn: 'Social standing/lounge NYE buffet from 20:30 with 1 drink, midnight sparkling toast, and full club admission.',
    arrivalTime: '20:30',
    basePriceCents: 7000,
    genderPolicy: 'equal',
  },
  {
    id: '55-club-entry',
    venueId: '55-milano',
    category: 'club-entry',
    titleIt: 'Single Pass Dopocena dalle 23:00 (1 Drink + Countdown)',
    titleEn: 'After-Dinner Single Pass from 23:00 (1 Drink + Countdown)',
    descriptionIt: 'Ingresso dalle 23:00 con 1 drink incluso insieme agli iscritti fascia 30–50 del gruppo Nightlife Milan.',
    descriptionEn: 'Entry from 23:00 with 1 drink included, arriving together with the matched 30–50 social group.',
    arrivalTime: '23:00',
    basePriceCents: 5000,
    genderPolicy: 'equal',
  },

  // ── 6. Bischeri Milano · Dedicato Over 50 ──────────────────────────────────
  {
    id: 'bischeri-dinner-terra',
    venueId: 'bischeri',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Tavolata Social Over 50 · Gran Cenone Servito Menù di Terra',
    titleEn: 'Over 50 Social Table · Served Gala Dinner (Land Menu)',
    descriptionIt: 'Dalle 20:30 sui Navigli. 4 portate di terra servite al tavolo Over 50 con Prosecco Extra-Dry a mezzanotte, vino ogni 4, acqua e musica live con DJ Gigi Zeus.',
    descriptionEn: 'From 20:30 in Navigli. 4-course gourmet land menu at our dedicated Over 50 social table with Extra-Dry Prosecco, wines, and DJ Gigi Zeus.',
    arrivalTime: '20:30',
    basePriceCents: 14000,
    genderPolicy: 'equal',
    requiresDietary: true,
    dietaryPreset: 'terra',
  },
  {
    id: 'bischeri-dinner-mare',
    venueId: 'bischeri',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Tavolata Social Over 50 · Gran Cenone Servito Menù di Mare',
    titleEn: 'Over 50 Social Table · Served Gala Dinner (Sea Menu)',
    descriptionIt: 'Dalle 20:30 sui Navigli. 4 portate di pesce servite al tavolo Over 50 con Prosecco Extra-Dry a mezzanotte, vino ogni 4, acqua e serata con DJ Gigi Zeus.',
    descriptionEn: 'From 20:30 in Navigli. 4-course seafood gala dinner at our dedicated Over 50 social table with Extra-Dry Prosecco, wines, and DJ Gigi Zeus.',
    arrivalTime: '20:30',
    basePriceCents: 14000,
    genderPolicy: 'equal',
    requiresDietary: true,
    dietaryPreset: 'mare',
  },
  {
    id: 'bischeri-after-dinner',
    venueId: 'bischeri',
    category: 'club-entry',
    titleIt: 'Single Pass Dopocena Gruppo Over 50 (2 Drink Inclusi)',
    titleEn: 'Over 50 Group After-Dinner Single Pass (2 Drinks Included)',
    descriptionIt: 'Ingresso dalle 23:30 sui Navigli con 2 drink inclusi e musica selezionata da DJ Gigi Zeus insieme al gruppo Over 50.',
    descriptionEn: 'After-dinner admission from 23:30 in Navigli including 2 drinks and DJ Gigi Zeus alongside the matched Over 50 group.',
    arrivalTime: '23:30',
    basePriceCents: 4000,
    genderPolicy: 'equal',
  },
];

export const VENUE_BY_ID: Readonly<Record<SinglePassVenueId, SinglePassVenueSpec>> = Object.fromEntries(
  SINGLE_PASS_VENUES.map((v) => [v.id, v]),
) as Record<SinglePassVenueId, SinglePassVenueSpec>;

export const SKU_BY_ID: ReadonlyMap<string, SinglePassSku> = new Map(
  SINGLE_PASS_SKUS.map((sku) => [sku.id, sku]),
);

export const EVENT_SLUG_TO_VENUE_ID: Readonly<Record<string, SinglePassVenueId>> = Object.fromEntries(
  SINGLE_PASS_VENUES.map((v) => [v.eventSlug, v.id]),
);

export function getVenueByIdOrNull(id: string): SinglePassVenueSpec | null {
  return (VENUE_BY_ID as Record<string, SinglePassVenueSpec>)[id] || null;
}

export function getVenueIdByEventSlug(eventSlug: string): SinglePassVenueId | null {
  return EVENT_SLUG_TO_VENUE_ID[eventSlug] || null;
}

export function getSkusForVenue(venueId: SinglePassVenueId): SinglePassSku[] {
  return SINGLE_PASS_SKUS.filter((s) => s.venueId === venueId);
}

export function computeSinglePassPrice(basePriceCents: number, quantity = 1): PriceBreakdown {
  const safeBase = Math.max(0, Math.round(basePriceCents));
  const safeQty = Math.max(1, Math.min(20, Math.floor(quantity)));
  const unitFeeCents = Math.round(safeBase * SINGLE_PASS_FEE_RATE);
  const unitTotalCents = safeBase + unitFeeCents;
  return {
    unitBaseCents: safeBase,
    unitFeeCents,
    unitTotalCents,
    lineBaseCents: safeBase * safeQty,
    lineFeeCents: unitFeeCents * safeQty,
    lineTotalCents: unitTotalCents * safeQty,
  };
}

export function formatEurFromCents(cents: number, locale = 'it'): string {
  const value = cents / 100;
  const locMap: Record<string, string> = {
    it: 'it-IT',
    en: 'en-IE',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
  };
  const intlLocale = locMap[locale] || 'it-IT';
  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export type AgeValidationResult =
  | {
      ok: true;
      advisoryCode: 'RECOMMEND_BISCHERI_50_PLUS' | 'AGE_OUTSIDE_YOUNG_BAND' | null;
      suggestedVenueIds: SinglePassVenueId[];
    }
  | {
      ok: false;
      errorCode: 'UNDER_18' | 'PINETA_STRICT_UNDER_30';
      suggestedVenueIds: SinglePassVenueId[];
    };

export function validateAgeForSkus(skus: readonly SinglePassSku[], age: number): AgeValidationResult {
  if (!Number.isFinite(age) || age < 18 || age > 99) {
    return {
      ok: false,
      errorCode: 'UNDER_18',
      suggestedVenueIds: [],
    };
  }
  const hasPineta = skus.some((s) => s.venueId === 'pineta');
  if (hasPineta && age >= 30) {
    return {
      ok: false,
      errorCode: 'PINETA_STRICT_UNDER_30',
      suggestedVenueIds: age >= 50 ? ['bischeri', '55-milano', 'justme'] : ['justme', '55-milano', 'repvblic'],
    };
  }
  if (age >= 50 && !skus.some((s) => s.venueId === 'bischeri')) {
    return {
      ok: true,
      advisoryCode: 'RECOMMEND_BISCHERI_50_PLUS',
      suggestedVenueIds: ['bischeri'],
    };
  }
  if (age > 28 && skus.some((s) => s.venueId === 'gate')) {
    return {
      ok: true,
      advisoryCode: 'AGE_OUTSIDE_YOUNG_BAND',
      suggestedVenueIds: age >= 50 ? ['bischeri', '55-milano'] : ['justme', '55-milano', 'repvblic'],
    };
  }
  return {
    ok: true,
    advisoryCode: null,
    suggestedVenueIds: [],
  };
}
