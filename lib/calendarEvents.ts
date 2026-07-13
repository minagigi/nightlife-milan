import { mockEvents, mockVenues } from './data';
import { fetchEventbriteEvents } from './eventbriteSync';
import { weeklyEvents, WeeklyEvent } from './eventsConfig';
import { MusicGenre, type Event, type Venue } from './types';
import { physicalEventKey, eventNameCore } from './eventIdentity';

/** REGOLA (richiesta utente): ogni gallery/carosello/calendario mostra UNA sola
 * card per evento — mai due versioni (IT + EN) né due sorgenti (Eventbrite +
 * mock/ricorrente) dello STESSO evento. Deduplica per identità fisica (venue +
 * giorno + nucleo-nome); a parità tiene la card più ricca: Eventbrite reale >
 * mock curato > serata ricorrente generica. La lingua è poi risolta al rendering
 * (getLocalizedText), quindi ogni card appare nella lingua selezionata dal sito. */
function eventSourceRank(id: string): number {
  if (id.startsWith('eb-')) return 3;
  if (id.startsWith('weekly-')) return 1;
  return 2; // mock one-off curato
}
export function dedupeEventsByIdentity<T extends { event: Event }>(items: T[]): T[] {
  const best = new Map<string, T>();
  const order: string[] = [];
  for (const item of items) {
    const venueName =
      mockVenues.find((v) => v.id === item.event.venueId)?.localizedContent.name.en || '';
    const key = physicalEventKey(item.event.venueId, item.event.dateISO, item.event.localizedContent.title.en || '', venueName);
    const cur = best.get(key);
    if (!cur) {
      best.set(key, item);
      order.push(key);
    } else if (eventSourceRank(item.event.id) > eventSourceRank(cur.event.id)) {
      best.set(key, item);
    }
  }
  const pass1 = order.map((k) => best.get(k)!);

  // Passata 2 — priorità all'evento reale, ma SOLO sullo stesso evento (fix bug #2).
  // Rimuove una card non-eb (mock/ricorrente) solo se, nella stessa notte
  // venue+giorno, esiste un eb il cui nucleo-nome è in relazione di sottoinsieme
  // (uno contiene l'altro, es. mock "White Party" ⊂ eb "White Party … VIP Tables").
  // NON rimuove più ogni non-eb per il solo venue+giorno condiviso: due eventi
  // DIVERSI la stessa sera (nuclei non correlati) restano entrambi.
  const ebCoresByNight = new Map<string, string[]>();
  for (const i of pass1) {
    if (!i.event.id.startsWith('eb-')) continue;
    const night = `${i.event.venueId}|${romeDayKey(i.event.dateISO)}`;
    const arr = ebCoresByNight.get(night) || [];
    arr.push(eventNameCore(i.event.localizedContent.title.en || ''));
    ebCoresByNight.set(night, arr);
  }
  const related = (a: string, b: string) => !!a && !!b && (a.includes(b) || b.includes(a));
  return pass1.filter((i) => {
    if (i.event.id.startsWith('eb-')) return true;
    const ebCores = ebCoresByNight.get(`${i.event.venueId}|${romeDayKey(i.event.dateISO)}`);
    if (!ebCores) return true;
    const myCore = eventNameCore(i.event.localizedContent.title.en || '');
    return !ebCores.some((c) => related(c, myCore)); // scarta solo se è lo stesso evento
  });
}

/** Quante notti in avanti "materializzare" dagli eventi ricorrenti
 * settimanali — copre sia /calendar/tonight (oggi+domani) sia
 * /calendar/this-week (oggi→domenica, max 7 giorni). */
const WEEKLY_HORIZON_DAYS = 8;

const GENRE_MAP: Record<string, MusicGenre> = {
  house: MusicGenre.HOUSE,
  deephouse: MusicGenre.HOUSE,
  techno: MusicGenre.TECHNO,
  'hip-hop': MusicGenre.HIP_HOP,
  hiphop: MusicGenre.HIP_HOP,
  trap: MusicGenre.HIP_HOP,
  urban: MusicGenre.HIP_HOP,
  reggaeton: MusicGenre.REGGAETON,
  latin: MusicGenre.REGGAETON,
  edm: MusicGenre.EDM,
  electronic: MusicGenre.EDM,
  livemusic: MusicGenre.LIVE_MUSIC,
  rock: MusicGenre.LIVE_MUSIC,
  indie: MusicGenre.INDIE,
};

function mapWeeklyGenres(genres: string[]): MusicGenre[] {
  const mapped = genres
    .map((g) => GENRE_MAP[g.toLowerCase().replace(/[\s-]/g, '')])
    .filter((g): g is MusicGenre => g !== undefined);
  return mapped.length > 0 ? Array.from(new Set(mapped)) : [MusicGenre.COMMERCIAL];
}

/** Estrae il primo numero da stringhe tipo "From €15" / "From €320 to €5,000". */
function parseLeadingPrice(text: string | undefined): number {
  if (!text) return 0;
  const match = text.replace(/[.,](?=\d{3}\b)/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

/** Offset Roma (minuti) per l'istante UTC dato — gestisce CET/CEST senza
 * hardcodare l'offset (bug reale già corretto altrove: vedi eventbriteSync.ts). */
function romeOffsetMinutes(instantUTC: Date): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome',
    timeZoneName: 'shortOffset',
  }).formatToParts(instantUTC);
  const tz = parts.find((p) => p.type === 'timeZoneName')?.value || 'GMT+1';
  const match = tz.match(/GMT([+-])(\d+)(?::(\d+))?/);
  if (!match) return 60;
  const sign = match[1] === '-' ? -1 : 1;
  const hours = parseInt(match[2], 10);
  const minutes = match[3] ? parseInt(match[3], 10) : 0;
  return sign * (hours * 60 + minutes);
}

/** ISO UTC per un orario locale di Roma in un giorno "YYYY-MM-DD" dato. */
function romeWallTimeToISO(dayKey: string, hour: number, minute = 0): string {
  const [y, m, d] = dayKey.split('-').map(Number);
  const approxUTC = new Date(Date.UTC(y, m - 1, d, hour, minute, 0));
  const offsetMin = romeOffsetMinutes(approxUTC);
  return new Date(approxUTC.getTime() - offsetMin * 60000).toISOString();
}

/** Trasforma le serate ricorrenti settimanali (lib/eventsConfig.ts) in Event
 * concreti per le prossime WEEKLY_HORIZON_DAYS notti — prima d'ora queste
 * venue (Just Me, Pineta, Aria, Voya, 55 Milano, Play Club, Repvblic) non
 * comparivano MAI su /calendar/tonight o /calendar/this-week perché
 * getAllCalendarEvents leggeva solo mockEvents + Eventbrite: se una venue
 * non aveva un evento one-off quella sera, il calendario saltava
 * direttamente al giorno successivo che ne aveva uno, anche se il locale
 * era regolarmente aperto stasera con la sua serata ricorrente. */
function expandWeeklyEvents(): { event: Event; venue: Venue }[] {
  const out: { event: Event; venue: Venue }[] = [];

  for (let offset = 0; offset < WEEKLY_HORIZON_DAYS; offset++) {
    const dayKey = romeDayKeyOffset(offset);
    const dow = dayOfWeekForKey(dayKey);

    for (const we of weeklyEvents as WeeklyEvent[]) {
      if (we.dayOfWeek !== dow) continue;
      const venue = mockVenues.find((v) => v.id === `v-${we.clubSlug}`);
      if (!venue) continue;

      const hasAperitivo = !!we.pricing.aperitif;
      const dateISO = romeWallTimeToISO(dayKey, hasAperitivo ? 19 : 23, hasAperitivo ? 30 : 0);
      const slug = `${we.clubSlug}-${we.day}-${we.eventSlug}`;

      const event: Event = {
        id: `weekly-${we.id}-${dayKey}`,
        venueId: venue.id,
        genre: mapWeeklyGenres(we.genres),
        dateISO,
        pricing: {
          entry: parseLeadingPrice(we.pricing.club),
          currency: 'EUR',
          tableMinSpend: parseLeadingPrice(we.pricing.tables) || null,
        },
        localizedContent: {
          title: { en: we.name, it: we.name },
          shortDescription: { en: we.description.en, it: we.description.it },
          slug: { en: slug, it: slug },
        },
        image: we.image,
      };

      out.push({ event, venue });
    }
  }

  return out;
}

/**
 * Sorgente dati unificata per le pagine /calendar/* — FASE C1 (piano
 * 2026-07-09-fix-calendar.md). Prima queste pagine leggevano SOLO
 * `mockEvents` (statici): iveri eventi pubblicati con la pipeline
 * Eventbrite/Xceed non potevano mai apparire su "stasera"/"domani"/
 * "questa settimana", anche se erano live e visibili sulle pagine
 * evento singole e in homepage.
 *
 * Tollerante al fallimento come la homepage (vedi app/[locale]/page.tsx):
 * fetchEventbriteEvents ora lancia dopo i retry invece di ritornare [],
 * quindi qui il catch è esplicito e degrada ai soli eventi statici.
 */
export async function getAllCalendarEvents(): Promise<{ event: Event; venue: Venue }[]> {
  let eventbriteEvents: Event[] = [];
  try {
    eventbriteEvents = await fetchEventbriteEvents();
  } catch {
    // degrado silenzioso: solo eventi statici
  }

  const allEvents = [
    ...mockEvents,
    ...eventbriteEvents.filter((eb) => !mockEvents.some((m) => m.id === eb.id)),
  ];

  const concreteItems = allEvents
    .map((event) => ({ event, venue: mockVenues.find((v) => v.id === event.venueId) }))
    .filter((item): item is { event: Event; venue: Venue } => item.venue !== undefined);

  // Le serate ricorrenti riempiono solo le notti prive già di un evento
  // one-off/reale per la stessa venue — mai due card per la stessa venue
  // la stessa sera (es. Just Me venerdì ha già "Flower Power Party").
  const bookedVenueNights = new Set(
    concreteItems.map(({ event }) => `${event.venueId}|${romeDayKey(event.dateISO)}`)
  );
  const weeklyItems = expandWeeklyEvents().filter(
    ({ event }) => !bookedVenueNights.has(`${event.venueId}|${romeDayKey(event.dateISO)}`)
  );

  // Deduplica finale per identità: una sola card per evento, ovunque.
  return dedupeEventsByIdentity([...concreteItems, ...weeklyItems]);
}

/** True se l'evento è di oggi o futuro nel fuso di Roma. Confronto per
 * GIORNO di calendario romano, non per istante: un evento iniziato stasera
 * resta "di oggi" per tutta la notte, e il confine non slitta con il fuso
 * del server (UTC su Vercel ≠ mezzanotte italiana). */
export function isUpcomingRome(dateISO: string): boolean {
  return romeDayKey(dateISO) >= romeDayKeyOffset(0);
}

/** Chiave giorno "YYYY-MM-DD" nel fuso di Roma — MAI usare i confini UTC
 * (un evento all'1:30 di notte italiana finirebbe nel giorno sbagliato). */
export function romeDayKey(dateISO: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(dateISO));
  const get = (type: string) => parts.find((p) => p.type === type)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** "YYYY-MM-DD" di oggi/domani (o +N giorni) nel fuso di Roma. */
export function romeDayKeyOffset(daysFromToday: number): string {
  const now = new Date();
  const romeNowKey = romeDayKey(now.toISOString());
  const [y, m, d] = romeNowKey.split('-').map(Number);
  const shifted = new Date(Date.UTC(y, m - 1, d + daysFromToday, 12, 0, 0));
  return romeDayKey(shifted.toISOString());
}

/** Giorno della settimana (0=domenica..6=sabato) per una chiave "YYYY-MM-DD"
 * prodotta da romeDayKey/romeDayKeyOffset (ancorata a mezzogiorno UTC, quindi
 * getUTCDay() riflette correttamente il giorno di calendario di Roma). */
export function dayOfWeekForKey(dayKey: string): number {
  return new Date(`${dayKey}T12:00:00Z`).getUTCDay();
}

/** Chiave della prossima domenica (oggi incluso se oggi è già domenica), nel fuso di Roma. */
export function romeSundayKey(): string {
  for (let offset = 0; offset < 7; offset++) {
    const key = romeDayKeyOffset(offset);
    if (dayOfWeekForKey(key) === 0) return key;
  }
  return romeDayKeyOffset(6);
}

/** Chiave del prossimo lunedì (oggi incluso se oggi è già lunedì), nel fuso di
 * Roma — confine passato/futuro per le sezioni eventi delle pagine locale. */
export function romeNextMondayKey(): string {
  for (let offset = 0; offset < 7; offset++) {
    const key = romeDayKeyOffset(offset);
    if (dayOfWeekForKey(key) === 1) return key;
  }
  return romeDayKeyOffset(7);
}

/** ISO UTC per la prossima occorrenza reale di un giorno della settimana
 * (0=domenica..6=sabato) nel fuso di Roma, all'orario locale indicato
 * (default 23:00) — include oggi stesso se oggi è già il giorno cercato.
 * Usata dalla pagina evento per i weekly recurring events (JSON-LD Event
 * startDate), al posto di una data placeholder hardcoded che poteva finire
 * nel passato. */
export function nextWeekdayISO(dayOfWeek: number, hour = 23, minute = 0): string {
  for (let offset = 0; offset < 7; offset++) {
    const dayKey = romeDayKeyOffset(offset);
    if (dayOfWeekForKey(dayKey) === dayOfWeek) {
      return romeWallTimeToISO(dayKey, hour, minute);
    }
  }
  // Difensivo: dayOfWeek 0-6 trova sempre un match entro 7 giorni.
  return romeWallTimeToISO(romeDayKeyOffset(0), hour, minute);
}
