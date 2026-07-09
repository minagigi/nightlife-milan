import { mockEvents, mockVenues } from './data';
import { fetchEventbriteEvents } from './eventbriteSync';
import type { Event, Venue } from './types';

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

  return allEvents
    .map((event) => ({ event, venue: mockVenues.find((v) => v.id === event.venueId) }))
    .filter((item): item is { event: Event; venue: Venue } => item.venue !== undefined);
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
