import { venuesData } from './venuesData';

export interface VenueAliasEntry {
  venueId: string;
  aliases: string[];
}

// Alias per il matching testuale contro i nomi venue mostrati su Eventbrite/Google
// (spesso diversi dal nome ufficiale: "Justme Milano - Restaurant & Club", "Pineta Milano", ecc.)
const VENUE_ALIASES: VenueAliasEntry[] = [
  { venueId: 'v-justme', aliases: ['just me', 'justme'] },
  { venueId: 'v-voya', aliases: ['voya'] },
  { venueId: 'v-pineta', aliases: ['pineta'] },
  { venueId: 'v-playclub', aliases: ['play club', 'playclub'] },
  { venueId: 'v-55milano', aliases: ['55 milano', '55milano'] },
  { venueId: 'v-repvblic', aliases: ['repvblic', 'republic milano'] },
  { venueId: 'v-11clubroom', aliases: ['11 club', '11club', '11 clubroom'] },
  { venueId: 'v-church81', aliases: ['church 81', 'church81'] },
  { venueId: 'v-mibmilano', aliases: ['mib milano', 'mib club'] },
  { venueId: 'v-gattopardo', aliases: ['gattopardo'] },
  { venueId: 'v-terrazza21', aliases: ['terrazza 21', 'terrazza21', 'terrazza duomo 21'] },
  { venueId: 'v-magazzini', aliases: ['magazzini generali', 'magazzini'] },
  { venueId: 'v-armani-prive', aliases: ['armani privé', 'armani prive', 'armani/privé'] },
  { venueId: 'v-volt', aliases: ['volt milano', 'volt club'] },
  { venueId: 'v-hollywood', aliases: ['hollywood'] },
  { venueId: 'v-apollo', aliases: ['apollo'] },
  { venueId: 'v-ceresio-7', aliases: ['ceresio 7', 'ceresio7'] },
  { venueId: 'v-theclub', aliases: ['the club milano', 'theclub'] },
  { venueId: 'v-aria', aliases: ['aria club', 'aria milano'] },
];

/**
 * Matcha un nome venue raw (Eventbrite/Google/qualsiasi fonte) contro i 18 venue del sito.
 * Ritorna null se nessun match — MAI un fallback silenzioso a un venue di default
 * (a differenza del vecchio mapVenueId in eventbriteSync.ts, che assume sempre v-justme:
 * va bene per la nostra org dove ogni evento È dei nostri venue, ma è pericoloso per lo
 * scouting di eventi di terzi dove la maggioranza dei nomi NON matcha nessuno dei 18).
 */
export function matchVenueId(rawVenueName: string): string | null {
  const n = (rawVenueName || '').toLowerCase();
  if (!n) return null;
  for (const entry of VENUE_ALIASES) {
    if (entry.aliases.some((a) => n.includes(a))) return entry.venueId;
  }
  return null;
}

export function getVenueAliases(venueId: string): string[] {
  return VENUE_ALIASES.find((e) => e.venueId === venueId)?.aliases || [];
}

export function allOurVenueIds(): string[] {
  return venuesData.map((v) => v.id);
}
