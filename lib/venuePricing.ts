/**
 * Listini tavoli/ticket per venue — FASE G1 (piano gold-standard). Dati SOLO
 * per i venue confermati dall'utente; il rewriter (eventRewriter.ts) degrada
 * elegantemente per i venue senza listino (sezione VIP generica senza cifre),
 * non inventa mai prezzi.
 */

export interface TableTier {
  name: string;
  price: number;
  capacity: number;
  includes: string;
}

export interface VenuePricing {
  venueId: string;
  ticketTiers?: { name: string; price: number; includes: string }[]; // info nel TESTO, non ticket Eventbrite
  tableTiers?: TableTier[];
  dressCode?: string;
  ageLimit?: number; // campo highlights nativo (music_properties.age_restriction) — minimo legale
  agePolicy?: string; // policy completa testuale (differenziata uomini/donne)
  parking?: 'free' | 'paid' | 'none';
  checkinMinutesBefore?: number;
}

export const DEFAULT_AGE_POLICY =
  'Recommended age: 21+ for men, 18+ for women. A valid physical ID or passport is required for everyone at the entrance.';

export const venuePricing: VenuePricing[] = [
  {
    venueId: 'v-justme',
    ticketTiers: [
      { name: 'Aperitif + 1 Drink + Torre Branca Climb', price: 15, includes: 'Panoramic ascent, aperitivo buffet, one drink' },
      { name: 'Club + 1 Drink', price: 20, includes: 'Club entry after the aperitivo window, one drink' },
    ],
    tableTiers: [
      { name: 'Dance Floor', price: 320, capacity: 5, includes: '1 bottle' },
      { name: 'VIP Area', price: 640, capacity: 10, includes: '2 bottles' },
      { name: 'Super VIP Back Line', price: 1280, capacity: 10, includes: '2 bottles' },
      { name: 'Super VIP Front Line', price: 3200, capacity: 15, includes: 'full menu' },
      { name: 'DJ Table', price: 5000, capacity: 15, includes: 'full menu' },
    ],
    dressCode: 'Elegant attire mandatory. Long trousers required for men. Sportswear, hoods, and shorts are not permitted.',
    ageLimit: 18,
    agePolicy: DEFAULT_AGE_POLICY,
    parking: 'free',
    checkinMinutesBefore: 30,
  },
  // TODO utente: listino ufficiale — i restanti venue restano senza tableTiers/ticketTiers
  // finché non vengono forniti dati reali; il rewriter userà la sezione VIP generica.
  { venueId: 'v-voya' },
  { venueId: 'v-pineta' },
  { venueId: 'v-playclub' },
  { venueId: 'v-55milano' },
  { venueId: 'v-repvblic' },
  { venueId: 'v-11clubroom' },
  { venueId: 'v-church81' },
  { venueId: 'v-mibmilano' },
  { venueId: 'v-gattopardo' },
  { venueId: 'v-terrazza21' },
  { venueId: 'v-magazzini' },
  { venueId: 'v-armani-prive' },
  { venueId: 'v-volt' },
  { venueId: 'v-hollywood' },
  { venueId: 'v-apollo' },
  { venueId: 'v-ceresio-7' },
  { venueId: 'v-theclub' },
  { venueId: 'v-aria' },
];

export function getVenuePricing(venueId: string): VenuePricing {
  return venuePricing.find((v) => v.venueId === venueId) || {
    venueId,
    ageLimit: 18,
    agePolicy: DEFAULT_AGE_POLICY,
  };
}
