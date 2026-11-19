import { getCapodannoOfficialPosterSrc } from '@/lib/seoEventImages';
import { OCTOBER_EVENTS_INVENTORY } from '@/lib/octoberEvents';
import type { OctoberEventOffer, OctoberEventRecord } from '@/lib/october-events/types';
import {
  THANKSGIVING_JUSTME_LEGACY_RAW_SLUG,
  THANKSGIVING_JUSTME_POSTER_SRC,
  THANKSGIVING_JUSTME_SLUGS_35,
  THANKSGIVING_JUSTME_XCEED_RAW_SLUG,
} from '@/lib/thanksgiving/justme35';
import {
  PARTENOPEA_JUSTME_LEGACY_RAW_SLUG,
  PARTENOPEA_JUSTME_POSTER_SRC,
  PARTENOPEA_JUSTME_SLUGS_35,
  PARTENOPEA_JUSTME_XCEED_RAW_SLUG,
} from '@/lib/partenopea/justme35';
import type {
  PriceBreakdown,
  SinglePassPackageCategory,
  SinglePassSku,
  SinglePassVenueId,
  SinglePassVenueSpec,
} from './types';

export const SINGLE_PASS_FEE_RATE = 0.20 as const;
export const TERRAZZA_DUOMO_FEE_RATE = 0.20 as const;

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

export const CONFIRMED_CAPODANNO_SLUGS = new Set<string>([
  'capodanno-gate-milano',
  'capodanno-pineta-milano',
  'capodanno-repvblic-milano',
  'capodanno-justme-milano-torre-branca',
  'capodanno-bischeri-milano',
  'capodanno-bobino-milano',
  'capodanno-voya-rooftop-milano',
  'capodanno-justme-garda-lake',
  'capodanno-terrazza-duomo-21',
]);

export function isConfirmedCapodannoSlug(slug: string): boolean {
  return CONFIRMED_CAPODANNO_SLUGS.has(slug);
}

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
    id: 'bischeri',
    eventSlug: 'capodanno-bischeri-milano',
    name: 'Bischeri Milano · Navigli',
    taglineIt: 'Tavolata Social Over 50 · Gran Cenone Servito Terra/Mare & DJ Gigi Zeus',
    taglineEn: 'Over 50 Social Table · Served Meat or Seafood Gala Dinner & DJ Gigi Zeus',
    district: 'Navigli / Darsena',
    address: 'Viale Gorizia 8, 20144 Milano',
    hours: '20:30 – 05:00',
    ageBandLabelIt: 'Over 50 · Pubblico Adulto & Selezionato',
    ageBandLabelEn: 'Over 50 · Mature & Curated Crowd',
    recommendedMinAge: 50,
    recommendedMaxAge: 75,
    strictMaxAge: null,
    musicIt: 'Music Dinner Show dal vivo con DJ Gigi Zeus, Prosecco Extra-Dry e disco dance fino alle 05:00',
    musicEn: 'Music Dinner Show with DJ Gigi Zeus, Extra-Dry Prosecco & party until 05:00',
    dressCodeIt: 'Elegante / Smart Chic di San Silvestro',
    dressCodeEn: 'Smart Chic New Year’s Eve attire',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-bischeri-milano'),
  },
  {
    id: 'bobino',
    eventSlug: 'capodanno-bobino-milano',
    name: 'BOBINO LEGENDS @ Bobino Milano',
    taglineIt: '25–48 anni · Cena Servita 120€, Video Show LEDWALL & After Dinner 30€ (2 Drink)',
    taglineEn: 'Ages 25–48 · Seated Dinner €120, LEDWALL Video Show & After Dinner €30 (2 Drinks)',
    district: 'Navigli / Porta Genova',
    address: 'Piazzale Stazione Genova 4, 20144 Milano',
    hours: '20:30 – 04:00',
    ageBandLabelIt: '25–48 anni · Dinner & Night Party',
    ageBandLabelEn: 'Ages 25–48 · Dinner & Night Party',
    recommendedMinAge: 25,
    recommendedMaxAge: 48,
    strictMaxAge: null,
    musicIt: 'Video Live Show su LEDWALL anni ’70-’80-’90 & Hit 2000–oggi · DJ Matthew Brown & Special Guest Roberto Milani',
    musicEn: 'LEDWALL Video Live Show (70s-80s-90s) & 2000s–Today Hits · DJ Matthew Brown & Roberto Milani',
    dressCodeIt: 'Elegante / Smart Chic per la notte di San Silvestro',
    dressCodeEn: 'Smart Elegant New Year’s Eve attire',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-bobino-milano'),
  },
  {
    id: 'voya',
    eventSlug: 'capodanno-voya-rooftop-milano',
    name: 'Voya Rooftop Milan (20° Piano)',
    taglineIt: 'Rooftop Skyline 300€ All-Inclusive · Cenone 6 Portate a 85m & Vista Fuochi 360°',
    taglineEn: 'Rooftop Skyline €300 All-Inclusive · 6-Course Gala Dinner at 85m & 360° Fireworks View',
    district: 'Portello / CityLife',
    address: 'Viale Achille Papa 30 (20° Piano), 20149 Milano',
    hours: '20:00 – 05:00',
    ageBandLabelIt: '25–50 anni · Rooftop Panoramico',
    ageBandLabelEn: 'Ages 25–50 · Panoramic Rooftop',
    recommendedMinAge: 25,
    recommendedMaxAge: 55,
    strictMaxAge: null,
    musicIt: 'Restaurant & DJ Set panoramico a 85 metri di altezza',
    musicEn: 'Panoramic 20th-floor Restaurant & DJ Set 85m above Milan',
    dressCodeIt: 'Black Tie / Elegante Panoramico',
    dressCodeEn: 'Black Tie / Skyline Elegance',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-voya-rooftop-milano'),
  },
  {
    id: 'justme-garda',
    eventSlug: 'capodanno-justme-garda-lake',
    name: 'JustMe Garda Lake · Lonato',
    taglineIt: 'Nuit du Nouvel An Rouge · Club 20€, Buffet 70€, Gala 130€ & Tavoli VIP',
    taglineEn: 'Nuit du Nouvel An Rouge · Club €20, Standing Buffet €70, Gala €130 & VIP Tables',
    district: 'Lago di Garda / Lonato',
    address: 'Via Lavagnone 13, 25017 Lonato del Garda (BS)',
    hours: '20:30 – 05:00',
    ageBandLabelIt: '21+ anni · Lago di Garda Luxury',
    ageBandLabelEn: 'Ages 21+ · Lake Garda Luxury',
    recommendedMinAge: 21,
    recommendedMaxAge: 50,
    strictMaxAge: null,
    musicIt: 'Dinner Live, Dining & Singing Show, Spettacolo Rouge & House / Commercial',
    musicEn: 'Live Singing Gala Dinner, Rouge Show & Luxury House / Commercial',
    dressCodeIt: 'Elegante / Tema Rouge Chic (pantalone lungo uomo obbligatorio)',
    dressCodeEn: 'Elegant / Rouge Chic (long trousers required for men)',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-justme-garda-lake'),
  },
  {
    id: 'voya-christmas',
    eventSlug: 'christmas-voya-rooftop-milan-2026',
    name: 'Natale 2026 @ Voya Rooftop Milano',
    taglineIt: '25 Dicembre 2026 · Menu Ufficiale di Natale 5 Portate al 20° Piano (100€)',
    taglineEn: 'December 25, 2026 · Official 5-Course Christmas Menu on the 20th Floor (€100)',
    district: 'Portello / CityLife',
    address: 'Viale Achille Papa 30 (20° Piano), 20149 Milano',
    hours: '25 Dicembre 2026',
    ageBandLabelIt: 'Tutte le età (18+ acquisto) · Natale 2026',
    ageBandLabelEn: '18+ Booking · Christmas 2026',
    recommendedMinAge: 18,
    recommendedMaxAge: 90,
    strictMaxAge: null,
    musicIt: 'Atmosfera natalizia panoramica a 85 metri sopra Milano',
    musicEn: 'Festive panoramic rooftop dining 85 meters above Milan',
    dressCodeIt: 'Smart Chic / Elegante Festivo',
    dressCodeEn: 'Smart Chic / Festive Elegance',
    posterSrc: '/images/events/christmas-2026-posters/natale-voya-rooftop-milano-2026.webp',
  },
  {
    id: 'justme-orthodox',
    eventSlug: 'orthodox-new-year-justme-milan-2027',
    name: 'Capodanno Ortodosso 2027 @ JustMe Milano',
    taglineIt: '13 Gennaio 2027 · Club 20€, Silver Dinner 60€, Gold Seafood Dinner 80€',
    taglineEn: 'January 13, 2027 · Club €20, Silver Dinner €60, Gold Seafood Dinner €80',
    district: 'Parco Sempione / Torre Branca',
    address: 'Viale Luigi Camoens 2, 20121 Milano',
    hours: '13 Gennaio 2027 · 19:30 – 05:00',
    ageBandLabelIt: '21+ anni · 13 Gennaio 2027',
    ageBandLabelEn: 'Ages 21+ · Jan 13, 2027',
    recommendedMinAge: 21,
    recommendedMaxAge: 55,
    strictMaxAge: null,
    musicIt: 'DJ Nazar Radchuk · House, Hip-Hop & Global Hits sotto la Torre Branca',
    musicEn: 'DJ Nazar Radchuk · House, Hip-Hop & Global Hits beneath Torre Branca',
    dressCodeIt: 'Elegante / Red & Luminous Glam',
    dressCodeEn: 'Smart Elegant / Red & Luminous Glam',
    posterSrc: '/images/events/orthodox-nye-2027/capodanno-ortodosso-justme-milano-2027.webp',
  },
  {
    id: 'justme-thanksgiving',
    eventSlug: THANKSGIVING_JUSTME_SLUGS_35.en,
    name: 'Thanksgiving 2026 & Vida Loca @ JustMe Milano',
    taglineIt: 'Giovedì 26 Novembre 2026 · Royal Buffet 15€, Club 15€, Tavoli 320€–1.280€',
    taglineEn: 'Thursday Nov 26, 2026 · Royal Buffet €15, Club €15, Tables €320–€1,280',
    district: 'Parco Sempione / Torre Branca',
    address: 'Viale Luigi Camoens 2, 20121 Milano',
    hours: '26 Novembre 2026 · 19:30 – 05:00',
    ageBandLabelIt: '21+ anni · 26 Novembre 2026',
    ageBandLabelEn: 'Ages 21+ · Nov 26, 2026',
    recommendedMinAge: 21,
    recommendedMaxAge: 55,
    strictMaxAge: null,
    musicIt: 'Vida Loca Radio 105 · House, Hip-Hop, Hits, EDM & Reggaeton',
    musicEn: 'Vida Loca Radio 105 · House, Hip-Hop, Hits, EDM & Reggaeton',
    dressCodeIt: 'Elegante (uomo: pantalone lungo obbligatorio)',
    dressCodeEn: 'Smart Elegant (men: long trousers mandatory)',
    posterSrc: THANKSGIVING_JUSTME_POSTER_SRC,
  },
  {
    id: 'justme-partenopea',
    eventSlug: PARTENOPEA_JUSTME_SLUGS_35.en,
    name: 'CSP · Cena Spettacolo Partenopea @ JustMe Milano (Pineta Napoli)',
    taglineIt: 'Venerdì 27 Novembre 2026 · Cena Show 70€, Aperitivo 15€, Club 20€, Tavoli 320€–1.280€',
    taglineEn: 'Friday Nov 27, 2026 · Dinner Show €70, Aperitif €15, Club €20, Tables €320–€1,280',
    district: 'Parco Sempione / Torre Branca',
    address: 'Viale Luigi Camoens 2, 20121 Milano',
    hours: '27 Novembre 2026 · 19:30 – 05:00',
    ageBandLabelIt: '21+ anni · 27 Novembre 2026',
    ageBandLabelEn: 'Ages 21+ · Nov 27, 2026',
    recommendedMinAge: 21,
    recommendedMaxAge: 55,
    strictMaxAge: null,
    musicIt: 'Voice John Vaccaro · DJ Franky Dee & Antonio Marigliano · Live & Club',
    musicEn: 'Voice John Vaccaro · DJ Franky Dee & Antonio Marigliano · Live & Club',
    dressCodeIt: 'Elegante (uomo: pantalone lungo obbligatorio)',
    dressCodeEn: 'Smart Elegant (men: long trousers mandatory)',
    posterSrc: PARTENOPEA_JUSTME_POSTER_SRC,
  },
  {
    id: 'terrazza-duomo-21',
    eventSlug: 'capodanno-terrazza-duomo-21',
    name: 'Terrazza Duomo 21 (1° Piano) & Terrazza MA.RE (5° Piano)',
    taglineIt: 'Vista Duomo & Galleria · 1° Piano Chef Valerio Braschi & 5° Piano MA.RE Chef Capitaneo (2★ Michelin)',
    taglineEn: 'Duomo & Galleria View · 1st Floor Chef Valerio Braschi & 5th Floor MA.RE Chefs Capitaneo (2★ Michelin)',
    district: 'Piazza del Duomo / Centro Storico',
    address: 'Piazza del Duomo 21 (Ingresso Via Silvio Pellico 2), 20121 Milano',
    hours: '20:30 – 05:00',
    ageBandLabelIt: '18+ anni · Luxury Rooftop Piazza Duomo',
    ageBandLabelEn: 'Ages 18+ · Piazza Duomo Luxury Rooftop',
    recommendedMinAge: 21,
    recommendedMaxAge: 65,
    strictMaxAge: null,
    musicIt: 'DJ Set fino al mattino su entrambi i piani (1° Piano Terrazza Duomo 21 & 5° Piano Terrazza MA.RE)',
    musicEn: 'DJ Set until morning on both floors (1st Floor Terrazza Duomo 21 & 5th Floor Terrazza MA.RE)',
    dressCodeIt: 'Black Tie / Abito da sera elegante di San Silvestro',
    dressCodeEn: 'Black Tie / Formal New Year’s Eve Evening Attire',
    posterSrc: getCapodannoOfficialPosterSrc('capodanno-terrazza-duomo-21'),
  },
  {
    id: 'club-event',
    eventSlug: 'events',
    name: 'Nightlife Milan Official Event Ticket',
    taglineIt: 'Ingresso e Tavoli VIP ufficiali su listini confermati a Milano',
    taglineEn: 'Official confirmed-price club tickets & VIP tables in Milan',
    district: 'Milano',
    address: 'Milano, Italia',
    hours: 'Serale / Notturno',
    ageBandLabelIt: '18+ anni',
    ageBandLabelEn: '18+ years',
    recommendedMinAge: 18,
    recommendedMaxAge: 65,
    strictMaxAge: null,
    musicIt: 'Lineup ufficiale della serata selezionata',
    musicEn: 'Official lineup of the selected Milan event',
    dressCodeIt: 'Smart Chic / Dress code ufficiale del locale',
    dressCodeEn: 'Smart Chic / Official venue dress code',
    posterSrc: '/images/events/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp',
  },
];

export const VENUE_BY_ID: Record<SinglePassVenueId, SinglePassVenueSpec> = Object.fromEntries(
  SINGLE_PASS_VENUES.map((v) => [v.id, v]),
) as Record<SinglePassVenueId, SinglePassVenueSpec>;

export const STOREFRONT_VENUES: readonly SinglePassVenueSpec[] = SINGLE_PASS_VENUES.filter(
  (v) =>
    v.id === 'gate' ||
    v.id === 'pineta' ||
    v.id === 'repvblic' ||
    v.id === 'justme' ||
    v.id === 'bischeri' ||
    v.id === 'bobino' ||
    v.id === 'voya' ||
    v.id === 'justme-garda',
);

export const SINGLE_PASS_SKUS: readonly SinglePassSku[] = [
  // GATE MILANO (PERREO XL — 18-26)
  {
    id: 'gate-vip-prive-share',
    venueId: 'gate',
    category: 'vip-table-share',
    featured: true,
    titleIt: 'Quota Tavolo Privé VIP Condiviso',
    titleEn: 'Shared VIP Privé Table Quota',
    descriptionIt:
      'Quota individuale garantita nel Tavolo Privé VIP condiviso (base 600€ / 10 quote). Accesso prioritario e credito bottiglie diviso nel gruppo 18–26.',
    descriptionEn:
      'Guaranteed individual seat in a shared VIP Privé table (€600 / 10 shares). Skip-the-line admission and bottle credit shared across the 18–26 social table.',
    arrivalTime: '23:00',
    basePriceCents: 6000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'gate-main-floor-share',
    venueId: 'gate',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Pista Condiviso',
    titleEn: 'Shared Main Floor Table Quota',
    descriptionIt:
      'Posto riservato nel Tavolo Pista condiviso (base 500€ / 10 quote) nel cuore dell’energia PERREO XL.',
    descriptionEn:
      'Reserved spot at a shared Main Floor bottle table (€500 / 10 shares) right in the heart of PERREO XL.',
    arrivalTime: '23:00',
    basePriceCents: 5000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'gate-early-bird',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass Early Bird (entro 00:00)',
    titleEn: 'Single Pass Early Bird (before 00:00)',
    descriptionIt:
      'Ingresso singolo garantito entro mezzanotte con accesso al mini-gruppo WhatsApp dal 20 dicembre ed entrata unita in lista Nightlife Milan.',
    descriptionEn:
      'Guaranteed pre-midnight admission with official Dec 20 WhatsApp mini-group matching and coordinated Nightlife Milan entry.',
    arrivalTime: '23:00',
    basePriceCents: 2000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'gate-first-release',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass 1st Release (dopo 00:00)',
    titleEn: 'Single Pass 1st Release (after 00:00)',
    descriptionIt:
      'Prima wave flessibile per ingresso dopo mezzanotte nel gruppo social PERREO XL 18–26.',
    descriptionEn:
      'First flexible release for post-midnight admission inside the PERREO XL 18–26 social group.',
    arrivalTime: '00:15',
    basePriceCents: 2500,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'gate-second-release',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass 2nd Release',
    titleEn: 'Single Pass 2nd Release',
    descriptionIt:
      'Seconda wave d’ingresso flessibile per festeggiare l’anno nuovo senza compagnia fissa.',
    descriptionEn:
      'Second release club entry to celebrate New Year’s Eve surrounded by matched solo guests.',
    arrivalTime: '23:30',
    basePriceCents: 3500,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'gate-final-wave',
    venueId: 'gate',
    category: 'club-entry',
    titleIt: 'Single Pass Final Wave',
    titleEn: 'Single Pass Final Wave',
    descriptionIt:
      'Ultima disponibilità garantita senza limiti d’orario all’ingresso con il gruppo Nightlife Milan.',
    descriptionEn:
      'Final release all-night access arriving with the Nightlife Milan solo host.',
    arrivalTime: '23:30',
    basePriceCents: 4500,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },

  // PINETA MILANO (MOULIN ROUGE — STRICT UNDER 30)
  {
    id: 'pineta-all-night-gala-table',
    venueId: 'pineta',
    category: 'all-night-combo',
    featured: true,
    titleIt: 'All-Night: Gala Dinner Social + Quota Tavolo Dance Floor',
    titleEn: 'All-Night: Social Gala Dinner + Dancefloor Table Share',
    descriptionIt:
      'Esperienza completa Under 30: Gran Cenone servito ore 21:00 al tavolo social (vino ogni 3, 2 show Burlesque) più quota riservata al Tavolo Dance Floor per il dopocena.',
    descriptionEn:
      'Complete Under 30 NYE pass: Seated Gala Dinner at 21:00 (wine, 2 live Burlesque shows) plus guaranteed seat at a shared Dancefloor bottle table.',
    arrivalTime: '20:45',
    basePriceCents: 22000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    confirmed: true,
  },
  {
    id: 'pineta-gala-dinner',
    venueId: 'pineta',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Cena di Gala Servita al Tavolo Social Under 30',
    titleEn: 'Seated Gala Dinner at Under 30 Social Table',
    descriptionIt:
      'Ore 21:00. Menu completo servito al tavolo condiviso Under 30, acqua, caffè, 1 bottiglia di vino ogni 3 ospiti, 2 spettacoli Burlesque e party nelle 2 sale.',
    descriptionEn:
      'From 21:00. Full multi-course gala dinner at the Under 30 social table with wine, 2 live Burlesque shows, and dual-room clubbing access.',
    arrivalTime: '20:45',
    basePriceCents: 16000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    confirmed: true,
  },
  {
    id: 'pineta-vip-prive-share',
    venueId: 'pineta',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo VIP Privé Condiviso Under 30',
    titleEn: 'Shared VIP Privé Table Quota (Under 30)',
    descriptionIt:
      'Quota individuale nel Tavolo VIP Privé condiviso (1.500€ / 10 quote) con bottiglie premium, ingresso prioritario e gruppo Under 30.',
    descriptionEn:
      'Individual share inside the shared VIP Privé table (€1,500 / 10 shares) with skip-the-line access and bottle credit.',
    arrivalTime: '23:00',
    basePriceCents: 15000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'pineta-balcony-share',
    venueId: 'pineta',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Privé Balcony Condiviso',
    titleEn: 'Shared Privé Balcony Table Quota',
    descriptionIt:
      'Balconata panoramica sulla Main Room (900€ / 10 quote) in condivisione con single e coppie amicali Under 30.',
    descriptionEn:
      'Elevated panoramic Balcony VIP booth (€900 / 10 shares) shared exclusively with verified Under 30 guests.',
    arrivalTime: '23:00',
    basePriceCents: 9000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'pineta-dancefloor-share',
    venueId: 'pineta',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Dance Floor Condiviso',
    titleEn: 'Shared Dancefloor Table Quota',
    descriptionIt:
      'Posto al Tavolo Dance Floor condiviso a bordo pista Main Room (600€ / 10 quote) con ingresso saltacoda.',
    descriptionEn:
      'Reserved spot at the Main Room Dancefloor bottle table (€600 / 10 shares) with fast-track entry.',
    arrivalTime: '23:00',
    basePriceCents: 6000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'pineta-royal-buffet',
    venueId: 'pineta',
    category: 'royal-buffet',
    titleIt: 'Royal Buffet Social Under 30 (ore 20:30)',
    titleEn: 'Royal Buffet Social Under 30 (20:30)',
    descriptionIt:
      'Buffet caldo e freddo con cotechino e lenticchie, flûte di benvenuto, 1 drink e 2 show Burlesque nel gruppo Under 30.',
    descriptionEn:
      'Standing/lounge NYE buffet at 20:30 with welcome champagne flûte, 1 drink, and 2 Burlesque shows in the Under 30 group.',
    arrivalTime: '20:30',
    basePriceCents: 4000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'pineta-club-entry',
    venueId: 'pineta',
    category: 'club-entry',
    titleIt: 'Single Pass Solo Discoteca Under 30 (23:00)',
    titleEn: 'Under 30 Club Entry Single Pass (23:00)',
    descriptionIt:
      'Ingresso nelle 2 sale Main Room & Urban Room dalle 23:00 con 1 drink e brindisi di mezzanotte nel gruppo Under 30.',
    descriptionEn:
      'Two-room club admission from 23:00 with 1 drink and midnight toast inside the Under 30 group.',
    arrivalTime: '23:00',
    basePriceCents: 4000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },

  // REPVBLIC MILANO (INTERNAZIONALE 22-40)
  {
    id: 'repvblic-prive-share',
    venueId: 'repvblic',
    category: 'vip-table-share',
    featured: true,
    titleIt: 'Quota Tavolo Zona Privé VIP Condiviso',
    titleEn: 'Shared VIP Privé Zone Table Quota',
    descriptionIt:
      'Quota individuale nel Tavolo Zona Privé condiviso (1.200€ / 10 quote) con pubblico internazionale ed expat in Piazza della Repubblica.',
    descriptionEn:
      'Guaranteed seat at a shared VIP Privé table (€1,200 / 10 shares) with an international & expat crowd in central Milan.',
    arrivalTime: '23:00',
    basePriceCents: 12000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'repvblic-dancefloor-share',
    venueId: 'repvblic',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Zona Dancefloor Condiviso',
    titleEn: 'Shared Dancefloor Table Quota',
    descriptionIt:
      'Quota individuale nel Tavolo Dancefloor (600€ / 6 quote) nel cuore della pista house e hip-hop.',
    descriptionEn:
      'Reserved spot at a shared Dancefloor table (€600 / 6 shares) right next to the main house & hip-hop stage.',
    arrivalTime: '23:00',
    basePriceCents: 10000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'repvblic-early-bird',
    venueId: 'repvblic',
    category: 'club-entry',
    titleIt: 'Single Pass Early Bird dalle 23:00 (Flûte + 1 Drink)',
    titleEn: 'Single Pass Early Bird from 23:00 (Flûte + 1 Drink)',
    descriptionIt:
      'Ingresso dalle 23:00 con flûte per il countdown e 1 drink inclusi, abbinato al mini-gruppo internazionale dal 20 dicembre.',
    descriptionEn:
      'Club admission from 23:00 including midnight sparkling flûte and 1 drink, matched in our Dec 20 international WhatsApp mini-group.',
    arrivalTime: '23:00',
    basePriceCents: 4500,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },

  // JUST ME TORRE BRANCA (LUXURY 30-49)
  {
    id: 'justme-all-night-gala-vip',
    venueId: 'justme',
    category: 'all-night-combo',
    featured: true,
    titleIt: 'All-Night: Gran Cenone 5 Portate + Quota Tavolo VIP Pista',
    titleEn: 'All-Night: 5-Course Gatsby Gala Dinner + Shared Dancefloor VIP Table',
    descriptionIt:
      'La formula di punta 30–49 sotto la Torre Branca: cena gourmet servita alle 20:00 al tavolo social + quota tavolo VIP Pista per tutta la notte.',
    descriptionEn:
      'Premier 30–49 package under Torre Branca: seated 5-course gourmet dinner at 20:00 plus a guaranteed seat at a shared VIP bottle table till 05:30.',
    arrivalTime: '20:00',
    basePriceCents: 40000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    confirmed: true,
  },
  {
    id: 'justme-gala-dinner',
    venueId: 'justme',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Gran Cenone di Gala Servito 5 Portate al Tavolo Social',
    titleEn: '5-Course Served Gala Dinner at 30–49 Social Table',
    descriptionIt:
      'Dalle 20:00. Menu 5 portate gourmet, vini selezionati inclusi, Dinner Show Il Grande Gatsby e accesso completo alla festa.',
    descriptionEn:
      'From 20:00. Five-course luxury gala dinner with curated wines, live Great Gatsby show, and full nightclub admission.',
    arrivalTime: '20:00',
    basePriceCents: 30000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    confirmed: true,
  },
  {
    id: 'justme-super-prive-share',
    venueId: 'justme',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo Super Privé Champagne Condiviso',
    titleEn: 'Shared Super Privé Champagne Table Quota',
    descriptionIt:
      'Posto riservato in area Super Privé luxury 30–49 con ingresso VIP prioritario e servizio bottiglie top di gamma condiviso.',
    descriptionEn:
      'Reserved VIP seat inside an exclusive 30–49 Super Privé Champagne booth with fast-track admission.',
    arrivalTime: '23:30',
    basePriceCents: 25000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'justme-dancefloor-vip-share',
    venueId: 'justme',
    category: 'vip-table-share',
    titleIt: 'Quota Tavolo VIP Pista Condiviso (600€ / 6 quote)',
    titleEn: 'Shared Dancefloor VIP Table Quota (€600 / 6 shares)',
    descriptionIt:
      'Tavolo VIP Pista condiviso tra 6 ospiti singoli selezionati fascia 30–49, con salto fila e bottiglie.',
    descriptionEn:
      'Shared Dancefloor VIP table split among 6 verified 30–49 solo guests with priority entry and bottle service.',
    arrivalTime: '23:30',
    basePriceCents: 10000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'justme-club-entry',
    venueId: 'justme',
    category: 'club-entry',
    titleIt: 'Single Pass Dopocena Torre Branca (1 Drink Premium)',
    titleEn: 'Torre Branca After-Dinner Single Pass (1 Premium Drink)',
    descriptionIt:
      'Ingresso dalle 23:30 con 1 drink premium e coordinamento nel mini-gruppo WhatsApp fascia 30–49 dal 20 dicembre.',
    descriptionEn:
      'Admission from 23:30 with 1 premium drink and matched Dec 20 WhatsApp mini-group coordination.',
    arrivalTime: '23:30',
    basePriceCents: 8000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },

  // BISCHERI MILANO (OVER 50 SOCIAL)
  {
    id: 'bischeri-dinner-terra',
    venueId: 'bischeri',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Tavolata Social Over 50 · Gran Cenone Servito Menù di Terra',
    titleEn: 'Over 50 Social Table · Served Gala Dinner (Land Menu)',
    descriptionIt:
      'Dalle 20:30 sui Navigli. 4 portate di terra servite al tavolo Over 50 con Prosecco Extra-Dry a mezzanotte, vino ogni 4, acqua e musica live con DJ Gigi Zeus.',
    descriptionEn:
      'From 20:30 in Navigli. 4-course gourmet land menu at our dedicated Over 50 social table with Extra-Dry Prosecco, wines, and DJ Gigi Zeus.',
    arrivalTime: '20:30',
    basePriceCents: 14000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    dietaryPreset: 'terra',
    confirmed: true,
  },
  {
    id: 'bischeri-dinner-mare',
    venueId: 'bischeri',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Tavolata Social Over 50 · Gran Cenone Servito Menù di Mare',
    titleEn: 'Over 50 Social Table · Served Gala Dinner (Sea Menu)',
    descriptionIt:
      'Dalle 20:30 sui Navigli. 4 portate di pesce servite al tavolo Over 50 con Prosecco Extra-Dry a mezzanotte, vino ogni 4, acqua e serata con DJ Gigi Zeus.',
    descriptionEn:
      'From 20:30 in Navigli. 4-course seafood gala dinner at our dedicated Over 50 social table with Extra-Dry Prosecco, wines, and DJ Gigi Zeus.',
    arrivalTime: '20:30',
    basePriceCents: 14000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    dietaryPreset: 'mare',
    confirmed: true,
  },
  {
    id: 'bischeri-after-dinner',
    venueId: 'bischeri',
    category: 'club-entry',
    titleIt: 'Single Pass Dopocena Gruppo Over 50 (2 Drink Inclusi)',
    titleEn: 'Over 50 Group After-Dinner Single Pass (2 Drinks Included)',
    descriptionIt:
      'Ingresso dalle 23:30 sui Navigli con 2 drink inclusi e musica selezionata da DJ Gigi Zeus insieme al gruppo Over 50.',
    descriptionEn:
      'After-dinner admission from 23:30 in Navigli including 2 drinks and DJ Gigi Zeus alongside the matched Over 50 group.',
    arrivalTime: '23:30',
    basePriceCents: 4000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },

  // BOBINO MILANO · BOBINO LEGENDS NYE 2027 (CONFERMATO: CENA 120€ · PARTY 30€ · TAVOLI 200€/250€)
  {
    id: 'bobino-legends-dinner',
    venueId: 'bobino',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Cena Servita BOBINO LEGENDS (5 Antipasti, Primo, Secondo, Vini & Brindisi Ferrari)',
    titleEn: 'BOBINO LEGENDS Seated Gala Dinner (5 Starters, First, Main, Wines & Ferrari Toast)',
    descriptionIt:
      'Dalle 20:30 in Piazzale Stazione Genova 4 (solo prevendita). 5 antipasti, Tortelli di zucca piacentini (o Risotto alla milanese*), Filetto di branzino (o Maialino*), Cotechino e lenticchie, Pandoro e panettone, vino 1 ogni 4, Ferrari Maximum Brut 1 ogni 4/6, Video Live Show LEDWALL 22:30 e festa fino alle 04:00.',
    descriptionEn:
      'From 20:30 at Piazzale Stazione Genova 4 (presale only). 5 starters, pumpkin tortelli (or saffron risotto*), sea bass fillet (or suckling pig*), midnight cotechino & lentils, pandoro/panettone, wine 1 per 4, Ferrari Maximum Brut toast 1 per 4/6, 22:30 LEDWALL Video Live Show and DJ party till 04:00.',
    arrivalTime: '20:30',
    basePriceCents: 12000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    confirmed: true,
  },
  {
    id: 'bobino-after-dinner-party',
    venueId: 'bobino',
    category: 'club-entry',
    featured: true,
    titleIt: 'Prevendita After Dinner BOBINO LEGENDS (Entro 7/12 · 2 Drink & Precedenza)',
    titleEn: 'BOBINO LEGENDS Early After Dinner Presale (Until Dec 7 · 2 Drinks & Priority Entry)',
    descriptionIt:
      'Ingresso prioritario dalle 23:30 con 2 drink inclusi in fascia Early Online entro il 7 dicembre 2026 (successivamente 35€ fino al 23/12, 40€ fino al 31/12, 50€ senza prevendita) e DJ set hit 2000–oggi fino alle 04:00 con DJ Matthew Brown & Roberto Milani.',
    descriptionEn:
      'Priority fast-track entry from 23:30 including 2 drinks (early online release until Dec 7, rising to €35 Dec 8–23, €40 Dec 24–31, €50 walk-in) plus 2000s–today DJ sets till 04:00 by DJ Matthew Brown & Roberto Milani.',
    arrivalTime: '23:30',
    basePriceCents: 3000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'bobino-dinner-table-keep',
    venueId: 'bobino',
    category: 'vip-table-full',
    titleIt: 'Mantenimento Tavolo Cena dopo le 00:30 (1 Distillato + Mixer o 2 Ferrari)',
    titleEn: 'Keep Dinner Table Past 00:30 (1 Spirit + Mixers or 2 Ferrari Maximum)',
    descriptionIt:
      'Riservato a chi prenota la Cena Servita da 120€: permette di tenere il proprio tavolo dopo le 00:30 con 1 bottiglia di Distillato (Rum, Vodka o Gin) e mixer oppure 2 bottiglie di Ferrari Maximum.',
    descriptionEn:
      'For €120 Seated Dinner guests wishing to keep their reserved table after 00:30 with 1 bottle of spirit (Rum, Vodka or Gin) and mixers or 2 bottles of Ferrari Maximum.',
    arrivalTime: '00:30',
    basePriceCents: 20000,
    guestsPerUnit: 6,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'bobino-after-dinner-table',
    venueId: 'bobino',
    category: 'vip-table-full',
    titleIt: 'Tavolo Riservato Dopocena (dalle 00:30 · max 8 pax + prevendita separata)',
    titleEn: 'Reserved After-Dinner Table (from 00:30 · max 8 guests + separate entry presale)',
    descriptionIt:
      'Quota tavolo riservato dalle 00:30 fino a 8 persone (credito tavolo 250€; ogni ospite necessita inoltre del biglietto d’ingresso in prevendita After Dinner da acquistare separatamente).',
    descriptionEn:
      'Reserved table allocation from 00:30 for up to 8 guests (€250 table rate; each guest also requires a separate After Dinner admission presale ticket).',
    arrivalTime: '00:30',
    basePriceCents: 25000,
    guestsPerUnit: 8,
    genderPolicy: 'equal',
    confirmed: true,
  },

  // VOYA ROOFTOP MILAN NYE 2027 (CONFERMATO 300 EUR)
  {
    id: 'voya-nye-gala-dinner',
    venueId: 'voya',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Cenone Ufficiale 6 Portate & DJ Set al 20° Piano',
    titleEn: 'Official 6-Course NYE Gala Dinner & 20th-Floor DJ Set',
    descriptionIt:
      'Tariffa ufficiale 300€ al 20° Piano (85m, vista 360° sui fuochi): menu 6 portate + cotechino e lenticchie, 1 bottiglia di vino ogni 4 ospiti, acqua e brindisi di mezzanotte.',
    descriptionEn:
      'Confirmed €300 rate at the 20th Floor (85m panoramic fireworks view): 6-course NYE menu, after-midnight cotechino & lentils, 1 bottle of wine every 4 guests, water & midnight toast.',
    arrivalTime: '20:00',
    basePriceCents: 30000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    confirmed: true,
  },

  // JUST ME GARDA LAKE NYE 2027 (LISTINO CONFERMATO)
  {
    id: 'justme-garda-gala-dinner',
    venueId: 'justme-garda',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Gran Cenone Servito Gala Dinner Show (dalle 20:30)',
    titleEn: 'Served Gala Dinner & Live Singing Show (from 20:30)',
    descriptionIt:
      'Menu completo servito al tavolo con Dinner Live, Dining & Singing Show, spettacolo Rouge e accesso al club fino alle 05:00.',
    descriptionEn:
      'Full seated Gala Dinner with Dinner Live, Dining & Singing Show, Rouge Cabaret performance and club entry until 05:00.',
    arrivalTime: '20:30',
    basePriceCents: 13000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    confirmed: true,
  },
  {
    id: 'justme-garda-buffet',
    venueId: 'justme-garda',
    category: 'royal-buffet',
    titleIt: 'Royal Buffet di San Silvestro in Piedi (dalle 20:30)',
    titleEn: 'Standing New Year’s Eve Royal Buffet (from 20:30)',
    descriptionIt:
      'Buffet di gala dalle 20:30 con live show e accesso completo alla serata club Rouge sul Lago di Garda.',
    descriptionEn:
      'Standing New Year’s Eve gala buffet from 20:30 with live entertainment and full Rouge club admission.',
    arrivalTime: '20:30',
    basePriceCents: 7000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'justme-garda-club-entry',
    venueId: 'justme-garda',
    category: 'club-entry',
    titleIt: 'Prevendita Ticket Dopocena + 1 Drink (dalle 22:30)',
    titleEn: 'After-Dinner Skip-the-Line Ticket + 1 Drink (from 22:30)',
    descriptionIt:
      'Prevendita ufficiale salta-fila dalle 22:30 con 1 drink incluso, countdown di mezzanotte e party fino alle 05:00.',
    descriptionEn:
      'Official skip-the-line ticket from 22:30 including 1 drink, midnight countdown and clubbing until 05:00.',
    arrivalTime: '22:30',
    basePriceCents: 2000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'justme-garda-terrace-table',
    venueId: 'justme-garda',
    category: 'vip-table-full',
    titleIt: 'Tavolo VIP Terrazza Privato (fino a 6 ospiti)',
    titleEn: 'Private Terrace VIP Table (up to 6 guests)',
    descriptionIt:
      'Tavolo intero riservato in Terrazza fino a 6 persone con credito bottiglie ufficiale JustMe Garda Lake ed ingresso prioritario.',
    descriptionEn:
      'Reserved private Terrace table for up to 6 guests with official bottle credit and VIP fast-track entry.',
    arrivalTime: '23:00',
    basePriceCents: 44000,
    guestsPerUnit: 6,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'justme-garda-dancefloor-table',
    venueId: 'justme-garda',
    category: 'vip-table-full',
    titleIt: 'Tavolo VIP Dancefloor Privato (fino a 6 ospiti)',
    titleEn: 'Private Dancefloor VIP Table (up to 6 guests)',
    descriptionIt:
      'Tavolo intero riservato in Dancefloor fino a 6 ospiti con servizio bottiglie ed ingresso prioritario.',
    descriptionEn:
      'Reserved private Dancefloor VIP booth for up to 6 guests with bottle service and skip-the-line entry.',
    arrivalTime: '23:00',
    basePriceCents: 50000,
    guestsPerUnit: 6,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'justme-garda-prive-ploom',
    venueId: 'justme-garda',
    category: 'vip-table-full',
    titleIt: 'Tavolo Privé Ploom (fino a 8 ospiti)',
    titleEn: 'Privé Ploom VIP Table (up to 8 guests)',
    descriptionIt:
      'Postazione esclusiva area Privé Ploom fino a 8 persone con ingresso VIP e credito bottiglie.',
    descriptionEn:
      'Exclusive Privé Ploom VIP area table for up to 8 guests with VIP host welcome and bottle credit.',
    arrivalTime: '23:00',
    basePriceCents: 70000,
    guestsPerUnit: 8,
    genderPolicy: 'equal',
    confirmed: true,
  },
  {
    id: 'justme-garda-prive-armand',
    venueId: 'justme-garda',
    category: 'vip-table-full',
    titleIt: 'Tavolo Privé Armand (fino a 10 ospiti)',
    titleEn: 'Privé Armand VIP Table (up to 10 guests)',
    descriptionIt:
      'Tavolo luxury area Privé Armand fino a 10 persone con credito bottiglie premium ed ingresso prioritario.',
    descriptionEn:
      'Luxury Privé Armand booth for up to 10 guests with premium bottle credit and priority entry.',
    arrivalTime: '23:00',
    basePriceCents: 90000,
    guestsPerUnit: 10,
    genderPolicy: 'equal',
    confirmed: true,
  },

  // NATALE 2026 @ VOYA ROOFTOP MILAN (25 DICEMBRE — 100 EUR CONFERMATO)
  {
    id: 'voya-christmas-menu',
    venueId: 'voya-christmas',
    category: 'holiday-special',
    featured: true,
    titleIt: 'Menu Ufficiale di Natale 5 Portate · 25 Dicembre 2026',
    titleEn: 'Official 5-Course Christmas Menu · December 25, 2026',
    descriptionIt:
      'Menu completo di Natale al 20° piano (Entrée, Antipasto, Primo, Secondo Filetto al Tartufo, Dessert) con 1 bottiglia di vino ogni 4 ospiti, acqua e caffè.',
    descriptionEn:
      'Complete 5-course 20th-floor Christmas menu including 1 bottle of wine every 4 guests, water, and coffee.',
    arrivalTime: '20:00',
    basePriceCents: 10000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    eventDateLabel: '2026-12-25',
    confirmed: true,
  },

  // CAPODANNO ORTODOSSO 2027 @ JUST ME MILANO (13 GENNAIO — CONFERMATO)
  {
    id: 'justme-orthodox-club',
    venueId: 'justme-orthodox',
    category: 'club-entry',
    featured: true,
    titleIt: 'Ingresso Club + 1 Drink (dalle 23:30) · 13 Gennaio 2027',
    titleEn: 'Club Entry + 1 Drink (from 23:30) · Jan 13, 2027',
    descriptionIt:
      'Prevendita ufficiale Capodanno Ortodosso 2027 sotto la Torre Branca con 1 drink incluso e accesso completo al club.',
    descriptionEn:
      'Official Orthodox NYE 2027 pre-sale entry beneath Torre Branca including 1 drink and full club access.',
    arrivalTime: '23:30',
    basePriceCents: 2000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    eventDateLabel: '2027-01-13',
    confirmed: true,
  },
  {
    id: 'justme-orthodox-silver',
    venueId: 'justme-orthodox',
    category: 'gala-dinner',
    titleIt: 'Silver Seated Dinner + Party (dalle 19:30) · 13 Gennaio 2027',
    titleEn: 'Silver Seated Dinner + Party (from 19:30) · Jan 13, 2027',
    descriptionIt:
      'Menu Silver servito al tavolo dalle 19:30 con vino ogni 4 ospiti, acqua e serata club inclusa fino alle 05:00.',
    descriptionEn:
      'Silver seated multi-course dinner from 19:30 with 1 bottle of wine every 4 guests, water, and club party included until 05:00.',
    arrivalTime: '19:30',
    basePriceCents: 6000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    eventDateLabel: '2027-01-13',
    confirmed: true,
  },
  {
    id: 'justme-orthodox-gold',
    venueId: 'justme-orthodox',
    category: 'gala-dinner',
    featured: true,
    titleIt: 'Gold Seafood Dinner + Party (dalle 19:30) · 13 Gennaio 2027',
    titleEn: 'Gold Seafood Dinner + Party (from 19:30) · Jan 13, 2027',
    descriptionIt:
      'Percorso degustazione Gold Seafood completo dalle 19:30 (astice, salmone, caviale) con vino ogni 4, acqua e accesso VIP club.',
    descriptionEn:
      'Gold Seafood tasting dinner from 19:30 (lobster, salmon, caviar courses) with wine, water, and club party included until 05:00.',
    arrivalTime: '19:30',
    basePriceCents: 8000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    requiresDietary: true,
    eventDateLabel: '2027-01-13',
    confirmed: true,
  },
  // THANKSGIVING 2026 & VIDA LOCA @ JUST ME MILANO (26 NOVEMBRE — CONFERMATO XCEED #249216)
  {
    id: 'justme-thanksgiving-buffet',
    venueId: 'justme-thanksgiving',
    category: 'royal-buffet',
    featured: true,
    titleIt: 'Aperitivo + 1 Drink · Royal Buffet (19:30–22:00) · 26 Nov',
    titleEn: 'Aperitif + 1 Drink · Royal Buffet (19:30–22:00) · Nov 26',
    descriptionIt:
      'Ingresso 19:30–22:00 con 1 drink, Full American Style Royal Buffet, Show Cooking Old Turkey, American Dessert Selection e festa Vida Loca.',
    descriptionEn:
      '19:30–22:00 entry including 1 drink, Full American Style Royal Buffet, live Old Turkey Show Cooking, American Dessert Selection & Vida Loca party.',
    arrivalTime: '19:30',
    basePriceCents: 1500,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-26',
    confirmed: true,
  },
  {
    id: 'justme-thanksgiving-club',
    venueId: 'justme-thanksgiving',
    category: 'club-entry',
    featured: true,
    titleIt: 'Ingresso Club + 1 Drink · Vida Loca (dalle 22:30) · 26 Nov',
    titleEn: 'Club Entry + 1 Drink · Vida Loca (from 22:30) · Nov 26',
    descriptionIt:
      'Ingresso discoteca dalle 22:30 alle 05:00 con 1 drink per il party Vida Loca Radio 105 (House, Hip-Hop, Hits, EDM, Reggaeton).',
    descriptionEn:
      'Club admission from 22:30 to 05:00 with 1 drink for Vida Loca Radio 105 (House, Hip-Hop, Hits, EDM, Reggaeton).',
    arrivalTime: '22:30',
    basePriceCents: 1500,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-26',
    confirmed: true,
  },
  {
    id: 'justme-thanksgiving-dehor-table',
    venueId: 'justme-thanksgiving',
    category: 'vip-table-share',
    titleIt: 'Tavolo Dehor (ingresso entro le 23:00) · 6 Ospiti',
    titleEn: 'Dehor Table (entry strictly by 23:00) · 6 Guests',
    descriptionIt:
      'Tavolo area Dehor JustMe Milano con bottiglie incluse per Thanksgiving & Vida Loca (accesso obbligatorio entro le 23:00).',
    descriptionEn:
      'Dehor VIP table at JustMe Milano with bottle service for Thanksgiving & Vida Loca (arrival strictly by 23:00).',
    arrivalTime: '22:30',
    basePriceCents: 32000,
    guestsPerUnit: 6,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-26',
    confirmed: true,
  },
  {
    id: 'justme-thanksgiving-dancefloor-table',
    venueId: 'justme-thanksgiving',
    category: 'vip-table-share',
    featured: true,
    titleIt: 'Tavolo Dance Floor (Pista) · 6 Ospiti',
    titleEn: 'Dance Floor Table (Main Room) · 6 Guests',
    descriptionIt:
      'Tavolo Privé in pista principale sotto la Torre Branca con servizio bottiglie per Vida Loca Radio 105.',
    descriptionEn:
      'Main room Dance Floor VIP table beneath Torre Branca with bottle service for Vida Loca Radio 105.',
    arrivalTime: '23:00',
    basePriceCents: 64000,
    guestsPerUnit: 6,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-26',
    confirmed: true,
  },
  {
    id: 'justme-thanksgiving-central-table',
    venueId: 'justme-thanksgiving',
    category: 'vip-table-share',
    titleIt: 'Tavolo Central (Area Centrale) · 8 Ospiti',
    titleEn: 'Central Table (Elevated Central Zone) · 8 Guests',
    descriptionIt:
      'Postazione VIP area centrale ad alta visibilità su pista e console DJ con ingresso saltafoda dedicato.',
    descriptionEn:
      'Elevated high-visibility Central Zone VIP table overlooking dancefloor and DJ console with priority entry.',
    arrivalTime: '23:00',
    basePriceCents: 128000,
    guestsPerUnit: 8,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-26',
    confirmed: true,
  },
  // JUSTME MILANO — CENA SPETTACOLO PARTENOPEA (PINETA NAPOLI, VENERDI 27 NOV 2026)
  {
    id: 'justme-partenopea-dinner',
    venueId: 'justme-partenopea',
    category: 'gala-dinner',
    titleIt: 'Cena Spettacolo Partenopea · Menu Completo + Party',
    titleEn: 'Cena Spettacolo Partenopea · Full Menu + Club Party',
    descriptionIt:
      'Menu fisso 21:30 con antipasti al centro (Parmigiana, Bufala, Polipetti alla Luciana, Polpette al sugo), Mezzi Paccheri al ragù napoletano, Sorbetto al limone di Amalfi, acqua, vino della casa, caffè e accesso Party.',
    descriptionEn:
      '21:30 Dinner Show fixed menu with sharing antipasti (Parmigiana, Bufala, Polipetti alla Luciana, Polpette), Mezzi Paccheri al ragù napoletano, Amalfi lemon sorbet, water, house wine, coffee, and Party access.',
    arrivalTime: '21:30',
    basePriceCents: 7000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-27',
    confirmed: true,
  },
  {
    id: 'justme-partenopea-aperitif',
    venueId: 'justme-partenopea',
    category: 'holiday-special',
    titleIt: 'Aperitif + 1 Drink (Ingresso 19:30–21:30)',
    titleEn: 'Aperitif + 1 Drink (Entry 19:30–21:30)',
    descriptionIt:
      'Ingresso 19:30–21:30 al JustMe Milano con 1 drink incluso e permanenza gratuita al Friday Party fino alle 05:00.',
    descriptionEn:
      'Entry between 19:30 and 21:30 at JustMe Milano including 1 drink and continuous Friday Party access until 05:00.',
    arrivalTime: '19:30–21:30',
    basePriceCents: 1500,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-27',
    confirmed: true,
  },
  {
    id: 'justme-partenopea-club',
    venueId: 'justme-partenopea',
    category: 'club-entry',
    titleIt: 'Club + 1 Drink · Friday Party (dalle 22:30)',
    titleEn: 'Club + 1 Drink · Friday Party (from 22:30)',
    descriptionIt:
      'Ingresso serale confermato su Xceed #249217 dalle 22:30 (Start Party 23:00) con 1 drink incluso per DJ Franky Dee e Antonio Marigliano.',
    descriptionEn:
      'Confirmed Friday Xceed #249217 club admission from 22:30 (Start Party 23:00) including 1 drink for DJ Franky Dee and Antonio Marigliano.',
    arrivalTime: '22:30',
    basePriceCents: 2000,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-27',
    confirmed: true,
  },
  {
    id: 'justme-partenopea-dehor-table',
    venueId: 'justme-partenopea',
    category: 'vip-table-share',
    titleIt: 'Tavolo Dehor (Ingresso tassativo entro le 23:00)',
    titleEn: 'Dehor Table (Mandatory entry strictly by 23:00)',
    descriptionIt:
      'Tavolo riservato area Dehor JustMe Milano con servizio bottiglie al tavolo. Check-in tassativo entro le ore 23:00.',
    descriptionEn:
      'Reserved Dehor VIP booth with bottle service inside JustMe Milano. Guests must enter strictly by 23:00.',
    arrivalTime: '23:00',
    basePriceCents: 32000,
    guestsPerUnit: 8,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-27',
    confirmed: true,
  },
  {
    id: 'justme-partenopea-dancefloor-table',
    venueId: 'justme-partenopea',
    category: 'vip-table-share',
    titleIt: 'Tavolo Pista (Dance Floor Table)',
    titleEn: 'Dance Floor Table · Main Room',
    descriptionIt:
      'Tavolo Privé a bordo pista principale sotto la cupola vetrata Italo Rota con servizio bottiglie dedicato.',
    descriptionEn:
      'Main room Dance Floor VIP booth beside the center floor beneath the heated glass canopy with dedicated bottle service.',
    arrivalTime: '23:00',
    basePriceCents: 64000,
    guestsPerUnit: 8,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-27',
    confirmed: true,
  },
  {
    id: 'justme-partenopea-central-table',
    venueId: 'justme-partenopea',
    category: 'vip-table-share',
    titleIt: 'Tavolo Central (Area Centrale Rialzata)',
    titleEn: 'Central Table (Elevated Central Zone)',
    descriptionIt:
      'Tavolo VIP centrale panoramico su live Dinner Show, consolle DJ e pista principale con ingresso prioritario.',
    descriptionEn:
      'High-visibility elevated Central Zone VIP sofa table overlooking Dinner Show, DJ booth, and dancefloor.',
    arrivalTime: '23:00',
    basePriceCents: 128000,
    guestsPerUnit: 8,
    genderPolicy: 'equal',
    eventDateLabel: '2026-11-27',
    confirmed: true,
  },
  // TERRAZZA DUOMO 21 (1° PIANO) & TERRAZZA MA.RE (5° PIANO) — CAPODANNO 2027
  {
    id: 'terrazza21-f1-dinner-place-rubia',
    venueId: 'terrazza-duomo-21',
    category: 'gala-dinner',
    featured: true,
    titleIt: '1° Piano · Cena Placé Chef Valerio Braschi (Secondo: Rubia Gallega Dry Aged)',
    titleEn: '1st Floor · Chef Valerio Braschi Seated Dinner (Main: Dry-Aged Rubia Gallega)',
    descriptionIt:
      'Vista Galleria / Piazza Duomo 1° piano dalle 20:30 nelle sale interne. Menu completo Chef Valerio Braschi con secondo Rubia gallega dry aged, vini (1 bott. ogni 2), acqua, caffè Lavazza, flûte di mezzanotte e DJ set fino al mattino. Tavoli condivisi min. 10 ospiti.',
    descriptionEn:
      '1st Floor Galleria & Piazza Duomo view from 20:30 in indoor dining rooms. Full Chef Valerio Braschi menu with Dry-Aged Rubia Gallega main course, wine (1 bottle per 2), water, Lavazza coffee, midnight champagne flûte & DJ set until morning. Shared tables min. 10 guests.',
    arrivalTime: '20:30',
    basePriceCents: 30000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    dietaryPreset: 'Rubia gallega dry aged',
    floorGroup: 'f1',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza Duomo 21 · 1° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f1-dinner-place-ricciola',
    venueId: 'terrazza-duomo-21',
    category: 'gala-dinner',
    featured: true,
    titleIt: '1° Piano · Cena Placé Chef Valerio Braschi (Secondo: Ricciola)',
    titleEn: '1st Floor · Chef Valerio Braschi Seated Dinner (Main: Amberjack / Ricciola)',
    descriptionIt:
      'Vista Galleria / Piazza Duomo 1° piano dalle 20:30 nelle sale interne. Menu completo Chef Valerio Braschi con secondo Ricciola, zucca tartufata e tarassaco al miele, vini (1 bott. ogni 2), acqua, caffè Lavazza, flûte di mezzanotte e DJ set fino al mattino. Tavoli condivisi min. 10 ospiti.',
    descriptionEn:
      '1st Floor Galleria & Piazza Duomo view from 20:30 in indoor dining rooms. Full Chef Valerio Braschi menu with Amberjack, truffled pumpkin & honey dandelion main course, wine (1 bottle per 2), water, Lavazza coffee, midnight champagne flûte & DJ set until morning. Shared tables min. 10 guests.',
    arrivalTime: '20:30',
    basePriceCents: 30000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    dietaryPreset: 'Ricciola',
    floorGroup: 'f1',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza Duomo 21 · 1° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f1-dinner-buffet',
    venueId: 'terrazza-duomo-21',
    category: 'royal-buffet',
    featured: true,
    titleIt: '1° Piano · Cena a Buffet (dalle 21:00 · Posto Lounge)',
    titleEn: '1st Floor · Gala Buffet Dinner (from 21:00 · Lounge Seating)',
    descriptionIt:
      'Vista Piazza Duomo 1° piano dalle 21:00 nelle sale interne con posto a sedere assegnato in area lounge. Finger food gourmet, marinati, primi, secondi, contorni, dessert, vini (1 bott. ogni 2), acqua, caffè Lavazza, flûte di mezzanotte e DJ set fino al mattino.',
    descriptionEn:
      '1st Floor Piazza Duomo view from 21:00 in indoor rooms with assigned lounge seating. Gourmet finger foods, marinated fish, first & main courses, sides, desserts, wine (1 bottle per 2), water, Lavazza coffee, midnight champagne flûte & DJ set until morning.',
    arrivalTime: '21:00',
    basePriceCents: 20000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    floorGroup: 'f1',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza Duomo 21 · 1° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f1-brindisi',
    venueId: 'terrazza-duomo-21',
    category: 'club-entry',
    titleIt: '1° Piano · Formula Brindisi (dalle 23:00 · 1 Flûte + 1 Drink)',
    titleEn: '1st Floor · Midnight Toast Formula (from 23:00 · 1 Champagne Flûte + 1 Drink)',
    descriptionIt:
      'Ingresso 1° piano Terrazza Duomo 21 dalle 23:00 con 1 flûte di champagne per il brindisi di mezzanotte, 1 consumazione a scelta e DJ set fino al mattino.',
    descriptionEn:
      '1st Floor Terrazza Duomo 21 entry from 23:00 including 1 champagne flûte for the midnight toast, 1 drink of your choice & DJ set until morning.',
    arrivalTime: '23:00',
    basePriceCents: 9000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    floorGroup: 'f1',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza Duomo 21 · 1° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f1-anno-nuovo',
    venueId: 'terrazza-duomo-21',
    category: 'club-entry',
    titleIt: '1° Piano · Formula Anno Nuovo (dalle 00:30 · 1 Drink)',
    titleEn: '1st Floor · New Year Formula (from 00:30 · 1 Drink)',
    descriptionIt:
      'Ingresso 1° piano Terrazza Duomo 21 dalle 00:30 con 1 consumazione a scelta e DJ set fino al mattino.',
    descriptionEn:
      '1st Floor Terrazza Duomo 21 entry from 00:30 including 1 drink of your choice & DJ set until morning.',
    arrivalTime: '00:30',
    basePriceCents: 7000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    floorGroup: 'f1',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza Duomo 21 · 1° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f1-terrace-table',
    venueId: 'terrazza-duomo-21',
    category: 'vip-table-full',
    titleIt: '1° Piano · Tavolo in Terrazza (max 4 pax · 2 Bottiglie + Formula Obbligatoria)',
    titleEn: '1st Floor · Terrace Table (max 4 guests · 2 Bottles + Required Per-Person Formula)',
    descriptionIt:
      'Tavolo riservato in terrazza 1° piano (max 4 ospiti) con 2 bottiglie di champagne o superalcolico incluse. Obbligatorio abbinare una formula per persona del 1° piano per ogni ospite.',
    descriptionEn:
      'Reserved 1st Floor terrace table (max 4 guests) with 2 bottles of champagne or spirits included. Must be paired with a 1st Floor per-person formula for each guest.',
    arrivalTime: '20:30',
    basePriceCents: 60000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 0,
    genderPolicy: 'equal',
    floorGroup: 'f1',
    tableAddon: { floorGroup: 'f1', maxGuestsPerTable: 4 },
    maxQuantityPerOrder: 4,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza Duomo 21 · 1° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f1-private-terrace',
    venueId: 'terrazza-duomo-21',
    category: 'vip-table-full',
    titleIt: '1° Piano · Terrazzino Privato (max 8 pax · 2 Bottiglie + Formula Obbligatoria)',
    titleEn: '1st Floor · Private Terrace Balcony (max 8 guests · 2 Bottles + Required Per-Person Formula)',
    descriptionIt:
      'Terrazzino privato esclusivo al 1° piano (max 8 ospiti) con 2 bottiglie di champagne o superalcolico incluse. Obbligatorio abbinare una formula per persona del 1° piano per ogni ospite.',
    descriptionEn:
      'Exclusive 1st Floor private terrace balcony (max 8 guests) with 2 bottles of champagne or spirits included. Must be paired with a 1st Floor per-person formula for each guest.',
    arrivalTime: '20:30',
    basePriceCents: 120000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 0,
    genderPolicy: 'equal',
    floorGroup: 'f1',
    tableAddon: { floorGroup: 'f1', maxGuestsPerTable: 8 },
    maxQuantityPerOrder: 2,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza Duomo 21 · 1° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f5-mare-dinner-place',
    venueId: 'terrazza-duomo-21',
    category: 'gala-dinner',
    featured: true,
    titleIt: '5° Piano MA.RE · Cena Placé Chef Mario e Remo Capitaneo (2★ Michelin)',
    titleEn: '5th Floor MA.RE · Seated Gala Dinner by 2★ Michelin Chefs Mario & Remo Capitaneo',
    descriptionIt:
      'Vista Piazza Duomo 5° piano dalle 20:30 nella sala interna di MA.RE. Menu degustazione completo degli chef bistellati Mario e Remo Capitaneo, cocktail di benvenuto, Champagne a mezzanotte, vini Frescobaldi (Gorgona Bianco 2025 / Mormoreto 2023, 1 bott. ogni 2) e DJ set fino al mattino.',
    descriptionEn:
      '5th Floor Piazza Duomo view from 20:30 in the MA.RE indoor dining room. Full tasting menu by 2-Michelin-star Chefs Mario & Remo Capitaneo, welcome cocktail, midnight Champagne, Frescobaldi wines (Gorgona Bianco 2025 / Mormoreto 2023, 1 bottle per 2) & DJ set until morning.',
    arrivalTime: '20:30',
    basePriceCents: 38000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    floorGroup: 'f5',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza MA.RE · 5° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f5-mare-brindisi',
    venueId: 'terrazza-duomo-21',
    category: 'club-entry',
    titleIt: '5° Piano MA.RE · Formula Brindisi (dalle 23:00 · 1 Flûte + 1 Drink)',
    titleEn: '5th Floor MA.RE · Midnight Toast Formula (from 23:00 · 1 Champagne Flûte + 1 Drink)',
    descriptionIt:
      'Ingresso 5° piano Terrazza MA.RE dalle 23:00 con 1 flûte di champagne, 1 consumazione a scelta e DJ set fino al mattino vista Piazza Duomo.',
    descriptionEn:
      '5th Floor Terrazza MA.RE entry from 23:00 including 1 champagne flûte, 1 drink of your choice & DJ set until morning overlooking Piazza Duomo.',
    arrivalTime: '23:00',
    basePriceCents: 9000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    floorGroup: 'f5',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza MA.RE · 5° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f5-mare-anno-nuovo',
    venueId: 'terrazza-duomo-21',
    category: 'club-entry',
    titleIt: '5° Piano MA.RE · Formula Anno Nuovo (dalle 00:30 · 1 Drink)',
    titleEn: '5th Floor MA.RE · New Year Formula (from 00:30 · 1 Drink)',
    descriptionIt:
      'Ingresso 5° piano Terrazza MA.RE dalle 00:30 con 1 consumazione a scelta e DJ set fino al mattino vista Piazza Duomo.',
    descriptionEn:
      '5th Floor Terrazza MA.RE entry from 00:30 including 1 drink of your choice & DJ set until morning overlooking Piazza Duomo.',
    arrivalTime: '00:30',
    basePriceCents: 7000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 1,
    genderPolicy: 'equal',
    floorGroup: 'f5',
    maxQuantityPerOrder: 20,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza MA.RE · 5° Piano',
    confirmed: true,
  },
  {
    id: 'terrazza21-f5-mare-terrace-table',
    venueId: 'terrazza-duomo-21',
    category: 'vip-table-full',
    titleIt: '5° Piano MA.RE · Tavolo in Terrazza (max 4 pax · 2 Bottiglie + Formula Obbligatoria)',
    titleEn: '5th Floor MA.RE · Terrace Table (max 4 guests · 2 Bottles + Required Per-Person Formula)',
    descriptionIt:
      'Tavolo riservato sulla terrazza del 5° piano MA.RE (max 4 ospiti) con 2 bottiglie di champagne o superalcolico incluse. Obbligatorio abbinare una formula per persona del 5° piano MA.RE per ogni ospite.',
    descriptionEn:
      'Reserved 5th Floor MA.RE terrace table (max 4 guests) with 2 bottles of champagne or spirits included. Must be paired with a 5th Floor MA.RE per-person formula for each guest.',
    arrivalTime: '20:30',
    basePriceCents: 60000,
    feeRate: TERRAZZA_DUOMO_FEE_RATE,
    guestsPerUnit: 0,
    genderPolicy: 'equal',
    floorGroup: 'f5',
    tableAddon: { floorGroup: 'f5', maxGuestsPerTable: 4 },
    maxQuantityPerOrder: 4,
    eventDateLabel: '2026-12-31',
    venueNameOverride: 'Terrazza MA.RE · 5° Piano',
    confirmed: true,
  },
];

export const SKU_BY_ID = new Map<string, SinglePassSku>(SINGLE_PASS_SKUS.map((s) => [s.id, s]));

const THANKSGIVING_SLUG_MAP = Object.fromEntries(
  Object.values(THANKSGIVING_JUSTME_SLUGS_35).map((slug) => [slug, 'justme-thanksgiving' as const]),
);

const PARTENOPEA_SLUG_MAP = Object.fromEntries(
  Object.values(PARTENOPEA_JUSTME_SLUGS_35).map((slug) => [slug, 'justme-partenopea' as const]),
);

const EVENT_SLUG_TO_VENUE_ID: Record<string, SinglePassVenueId> = {
  'capodanno-gate-milano': 'gate',
  'capodanno-pineta-milano': 'pineta',
  'capodanno-repvblic-milano': 'repvblic',
  'capodanno-justme-milano-torre-branca': 'justme',
  'capodanno-bischeri-milano': 'bischeri',
  'capodanno-bobino-milano': 'bobino',
  'capodanno-voya-rooftop-milano': 'voya',
  'capodanno-justme-garda-lake': 'justme-garda',
  'capodanno-terrazza-duomo-21': 'terrazza-duomo-21',
  'christmas-voya-rooftop-milan-2026': 'voya-christmas',
  'orthodox-new-year-justme-milan-2027': 'justme-orthodox',
  ...THANKSGIVING_SLUG_MAP,
  [THANKSGIVING_JUSTME_XCEED_RAW_SLUG]: 'justme-thanksgiving',
  [THANKSGIVING_JUSTME_LEGACY_RAW_SLUG]: 'justme-thanksgiving',
  ...PARTENOPEA_SLUG_MAP,
  [PARTENOPEA_JUSTME_XCEED_RAW_SLUG]: 'justme-partenopea',
  [PARTENOPEA_JUSTME_LEGACY_RAW_SLUG]: 'justme-partenopea',
};

export function getVenueIdByEventSlug(eventSlug: string): SinglePassVenueId | null {
  return EVENT_SLUG_TO_VENUE_ID[eventSlug] || null;
}

export function getSkusForVenue(venueId: SinglePassVenueId): SinglePassSku[] {
  return SINGLE_PASS_SKUS.filter((s) => s.venueId === venueId);
}

const INVENTORY_BY_ID = new Map<string, OctoberEventRecord>(
  (OCTOBER_EVENTS_INVENTORY.events || []).map((ev) => [ev.id, ev]),
);

function mapOfferCategory(offer: OctoberEventOffer): SinglePassPackageCategory {
  if (offer.category === 'table') return 'vip-table-full';
  return 'club-entry';
}

function inferGuestsPerUnitFromOffer(offer: OctoberEventOffer): number {
  if (offer.category !== 'table') return 1;
  const match = offer.name.match(/(\d+)\s*(?:pax|persone|people|guests|posti)/i);
  if (match) {
    const n = Number(match[1]);
    if (Number.isFinite(n) && n >= 2 && n <= 20) return n;
  }
  return 6;
}

function buildDynamicInventorySku(
  event: OctoberEventRecord,
  offer: OctoberEventOffer,
  offerIndex: number,
  displayTitleOverride?: string,
): SinglePassSku {
  const guests = inferGuestsPerUnitFromOffer(offer);
  const priceEur = Number(offer.price || 0);
  const cleanTitle = displayTitleOverride || offer.name;
  const timing = offer.admissionUntil
    ? `Entro / Until ${offer.admissionUntil}`
    : offer.admissionFrom
      ? `Dalle / From ${offer.admissionFrom}`
      : event.doorTime || '23:00';
  const datePart = (event.startISO || '').slice(0, 10);

  return {
    id: `xceed:${event.id}:${offerIndex}`,
    venueId: 'club-event',
    category: mapOfferCategory(offer),
    titleIt: `${event.officialName} · ${cleanTitle}`,
    titleEn: `${event.officialName} · ${cleanTitle}`,
    descriptionIt:
      offer.category === 'table'
        ? `Tavolo VIP ufficiale @ ${event.venue.name} (${guests} ospiti inclusi). Prenotazione diretta online con pagamento sicuro con carta.`
        : `Ingresso ufficiale @ ${event.venue.name}${datePart ? ` (${datePart})` : ''}. Prenotazione diretta online con pagamento sicuro con carta.`,
    descriptionEn:
      offer.category === 'table'
        ? `Official VIP Table @ ${event.venue.name} (up to ${guests} guests). Direct online booking with secure card payment.`
        : `Official admission ticket @ ${event.venue.name}${datePart ? ` (${datePart})` : ''}. Direct online booking with secure card payment.`,
    arrivalTime: timing,
    basePriceCents: Math.round(priceEur * 100),
    guestsPerUnit: guests,
    genderPolicy: 'equal',
    eventDateLabel: datePart,
    venueNameOverride: event.venue.name,
    confirmed: true,
  };
}

export function isConfirmedUpcomingInventoryEvent(
  event: OctoberEventRecord | undefined,
  nowMs = Date.now(),
): event is OctoberEventRecord {
  if (!event) return false;
  if (event.excluded || event.sourceConflict) return false;
  if (event.affiliateStatus !== 'verified' && event.venue?.id !== 'v-gate') return false;
  const endMs = Date.parse(event.endISO || event.startISO || '');
  if (!Number.isFinite(endMs) || endMs <= nowMs) return false;
  return Array.isArray(event.offers) && event.offers.some(
    (o) => o.availability === 'available' && typeof o.price === 'number' && o.price > 0,
  );
}

export function getConfirmedSkusForInventoryEvent(
  eventId: string,
  nowMs = Date.now(),
): SinglePassSku[] {
  const event = INVENTORY_BY_ID.get(eventId);
  if (!isConfirmedUpcomingInventoryEvent(event, nowMs)) return [];

  const deduped = new Map<string, SinglePassSku>();
  event.offers.forEach((offer, idx) => {
    if (offer.availability !== 'available') return;
    if (typeof offer.price !== 'number' || offer.price <= 0) return;

    const cleanGroupLabel = offer.name.replace(/\s*[-–]\s*[A-Z]?\d+\s*$/i, '').trim() || offer.name;
    const dedupeKey = `${offer.category}::${offer.price}::${cleanGroupLabel}`;
    if (!deduped.has(dedupeKey)) {
      deduped.set(dedupeKey, buildDynamicInventorySku(event, offer, idx, cleanGroupLabel));
    }
  });

  return Array.from(deduped.values());
}

export function resolveCatalogSku(skuId: string, nowMs = Date.now()): SinglePassSku | null {
  const staticSku = SKU_BY_ID.get(skuId);
  if (staticSku) return staticSku;

  const match = /^xceed:([a-zA-Z0-9_-]+):(\d+)$/.exec(skuId.trim());
  if (!match) return null;
  const eventId = match[1];
  const offerIndex = Number(match[2]);
  if (!Number.isInteger(offerIndex) || offerIndex < 0) return null;

  const event = INVENTORY_BY_ID.get(eventId);
  if (!isConfirmedUpcomingInventoryEvent(event, nowMs)) return null;
  const offer = event.offers[offerIndex];
  if (!offer || offer.availability !== 'available') return null;
  if (typeof offer.price !== 'number' || !Number.isFinite(offer.price) || offer.price <= 0) {
    return null;
  }

  return buildDynamicInventorySku(event, offer, offerIndex);
}

export function getSkuFeeRate(sku: Pick<SinglePassSku, 'feeRate'>): number {
  return typeof sku.feeRate === 'number' && Number.isFinite(sku.feeRate) && sku.feeRate >= 0
    ? sku.feeRate
    : SINGLE_PASS_FEE_RATE;
}

export function getSkuMaxQuantity(sku: Pick<SinglePassSku, 'maxQuantityPerOrder'>): number {
  return typeof sku.maxQuantityPerOrder === 'number' && sku.maxQuantityPerOrder >= 1
    ? sku.maxQuantityPerOrder
    : 10;
}

export function computeSinglePassPrice(
  basePriceCents: number,
  quantity = 1,
  feeRate: number = SINGLE_PASS_FEE_RATE,
): PriceBreakdown {
  const safeBase = Math.max(0, Math.round(basePriceCents));
  const safeQty = Math.max(1, Math.min(20, Math.floor(quantity)));
  const safeRate = Number.isFinite(feeRate) && feeRate >= 0 ? feeRate : SINGLE_PASS_FEE_RATE;
  const unitFeeCents = Math.round(safeBase * safeRate);
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

export type TerrazzaCartValidationResult =
  | { ok: true }
  | {
      ok: false;
      errorCode: 'TABLE_REQUIRES_FORMULA' | 'TABLE_MAX_GUESTS_EXCEEDED';
      floorGroup: 'f1' | 'f5';
      perPersonCount: number;
      maxCapacity: number;
    };

export function validateTerrazzaDuomoCart(
  entries: ReadonlyArray<{ sku: SinglePassSku; quantity: number }>,
): TerrazzaCartValidationResult {
  for (const floorGroup of ['f1', 'f5'] as const) {
    let tableCount = 0;
    let maxCapacity = 0;
    let perPersonCount = 0;

    for (const { sku, quantity } of entries) {
      if (sku.venueId !== 'terrazza-duomo-21') continue;
      const qty = Math.max(0, Math.floor(quantity));
      if (qty <= 0) continue;

      if (sku.tableAddon && sku.tableAddon.floorGroup === floorGroup) {
        tableCount += qty;
        maxCapacity += sku.tableAddon.maxGuestsPerTable * qty;
      } else if (!sku.tableAddon && sku.floorGroup === floorGroup) {
        perPersonCount += Math.max(1, sku.guestsPerUnit) * qty;
      }
    }

    if (tableCount > 0) {
      if (perPersonCount < 1) {
        return {
          ok: false,
          errorCode: 'TABLE_REQUIRES_FORMULA',
          floorGroup,
          perPersonCount,
          maxCapacity,
        };
      }
      if (perPersonCount > maxCapacity) {
        return {
          ok: false,
          errorCode: 'TABLE_MAX_GUESTS_EXCEEDED',
          floorGroup,
          perPersonCount,
          maxCapacity,
        };
      }
    }
  }
  return { ok: true };
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
      errorCode: 'UNDER_18' | 'UNDER_21_JUSTME' | 'PINETA_STRICT_UNDER_30';
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
      suggestedVenueIds: age >= 50 ? ['bischeri', 'bobino', 'justme', 'voya'] : ['justme', 'bobino', 'repvblic', 'voya'],
    };
  }
  const hasJustMe21Plus = skus.some(
    (s) => s.venueId === 'justme-partenopea' || s.venueId === 'justme-thanksgiving',
  );
  if (hasJustMe21Plus && age < 21) {
    return {
      ok: false,
      errorCode: 'UNDER_21_JUSTME',
      suggestedVenueIds: ['gate', 'pineta'],
    };
  }
  if (age >= 50 && skus.some((s) => s.venueId === 'gate' || s.venueId === 'repvblic')) {
    return {
      ok: true,
      advisoryCode: 'RECOMMEND_BISCHERI_50_PLUS',
      suggestedVenueIds: ['bischeri', 'bobino', 'voya'],
    };
  }
  if (age > 28 && skus.some((s) => s.venueId === 'gate')) {
    return {
      ok: true,
      advisoryCode: 'AGE_OUTSIDE_YOUNG_BAND',
      suggestedVenueIds: age >= 50 ? ['bischeri', 'bobino', 'voya'] : ['justme', 'bobino', 'repvblic', 'voya'],
    };
  }
  return {
    ok: true,
    advisoryCode: null,
    suggestedVenueIds: [],
  };
}
