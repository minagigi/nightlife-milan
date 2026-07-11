/**
 * Identità FISICA di un evento — chiave stabile tra le lingue, usata per
 * deduplicare le card OVUNQUE (gallerie, caroselli, calendari, liste) così ogni
 * evento appare UNA sola volta, nella lingua selezionata. Regola richiesta
 * dall'utente: mai due card (IT + EN) dello stesso evento sulla stessa superficie.
 *
 * La chiave combina: venue (id già normalizzato dagli alias) + giorno di inizio
 * nel fuso di Roma + NUCLEO del nome (tolte date/numeri/mesi/giorni-settimana,
 * che sono l'unica parte che cambia tra la versione EN e quella IT dello stesso
 * evento). Stesso evento → stessa chiave. Eventi DIVERSI nello stesso locale/sera
 * (es. Pineta "Saturday Night" vs "Argentina vs Switzerland Watch Party") hanno
 * nucleo-nome diverso → chiavi diverse → restano separati.
 *
 * Modulo SENZA import da calendarEvents/eventbriteSync per evitare dipendenze
 * circolari (entrambi importano da qui).
 */

// Mesi (EN+IT) + giorni della settimana (EN+IT): rimossi dal nome perché sono
// l'unico pezzo localizzato ("July 11" ↔ "11 Luglio"), non l'identità dell'evento.
const DATE_WORDS =
  /\b(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(t|tember)?|oct(ober)?|nov(ember)?|dec(ember)?|gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre|monday|tuesday|wednesday|thursday|friday|saturday|sunday|luned|marted|mercoled|gioved|venerd|sabato|domenica)\b/gi;

// Città (Milano/Milan): sempre presente nei titoli Eventbrite ("... @ Pineta Club
// Milano"), assente nei titoli mock brevi ("Noche de Perreo") → toglierla fa
// collassare le due sorgenti sullo stesso nucleo (fix bug #2, dedup cross-sorgente).
const CITY_WORDS = /\b(milano|milan)\b/gi;

/** Nucleo del nome evento, invariante rispetto alla lingua e alla data.
 * Fix bug #1: non ritorna MAI stringa vuota — se lo strip di date/città/numeri
 * azzera tutto (titolo fatto solo di quelle parole), ripiega su una pulizia
 * minima alfanumerica, così due eventi diversi non collassano sulla stessa chiave. */
export function eventNameCore(title: string): string {
  const raw = (title || '').toLowerCase();
  const core = raw
    .replace(DATE_WORDS, ' ')
    .replace(CITY_WORDS, ' ')
    .replace(/[0-9]+/g, ' ')
    .replace(/[^a-zà-ù]+/gi, ' ')
    .trim()
    .replace(/\s+/g, ' ');
  if (core) return core;
  const fallback = raw.replace(/[^a-zà-ù0-9]+/gi, ' ').trim().replace(/\s+/g, ' ');
  return fallback || raw.trim();
}

/** Giorno "YYYY-MM-DD" nel fuso di Roma (self-contained, no import esterni). */
function romeDayKey(dateISO: string): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(dateISO));
  const get = (t: string) => parts.find((p) => p.type === t)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** Chiave di identità fisica: venue + giorno (Roma) + nucleo-nome.
 * `venueName` (opzionale): i suoi token vengono rimossi dal nucleo — il nome del
 * locale è già rappresentato dal venueId, e includerlo nel nucleo creava falsi
 * "eventi diversi" tra sorgenti che titolano lo stesso evento in modo diverso
 * (es. Eventbrite "Noche de Perreo @ Pineta Club Milano" vs mock "Noche de
 * Perreo"): togliendolo, entrambe collassano su "noche de perreo" → una card. */
export function physicalEventKey(venueId: string, dateISO: string, titleEn: string, venueName = ''): string {
  const base = eventNameCore(titleEn);
  let core = base;
  const venueTokens = eventNameCore(venueName).split(' ').filter((w) => w.length >= 2);
  if (venueTokens.length) {
    const re = new RegExp('\\b(' + venueTokens.join('|') + ')\\b', 'g');
    const stripped = core.replace(re, ' ').replace(/\s+/g, ' ').trim();
    core = stripped || base; // fix bug #1: se togliere il venue svuota il nucleo, tieni quello pieno
  }
  return `${venueId}|${romeDayKey(dateISO)}|${core}`;
}
