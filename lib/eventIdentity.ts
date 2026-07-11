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

/** Nucleo del nome evento, invariante rispetto alla lingua e alla data. */
export function eventNameCore(title: string): string {
  return (title || '')
    .toLowerCase()
    .replace(DATE_WORDS, ' ')
    .replace(/[0-9]+/g, ' ')
    .replace(/[^a-zà-ù]+/gi, ' ')
    .trim()
    .replace(/\s+/g, ' ');
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

/** Chiave di identità fisica: venue + giorno (Roma) + nucleo-nome. */
export function physicalEventKey(venueId: string, dateISO: string, titleEn: string): string {
  return `${venueId}|${romeDayKey(dateISO)}|${eventNameCore(titleEn)}`;
}
