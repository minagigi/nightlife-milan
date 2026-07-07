/**
 * Lettura sanitizzata di EVENTBRITE_TOKEN.
 *
 * Bug reale riscontrato in produzione (2026-07-07): la env var contiene un
 * BOM (U+FEFF, invisibile) all'inizio del valore -- probabilmente introdotto
 * quando il token fu incollato/salvato originariamente da un editor che
 * scrive UTF-8 con BOM. fetch() lancia "Cannot convert argument to a
 * ByteString" non appena l'header Authorization include quel carattere
 * (code point 65279 > 255), e il catch di fetchEventbriteEvents() lo
 * inghiottiva silenziosamente da chissa quanto tempo -- il sito NON stava
 * sincronizzando eventi Eventbrite reali (ebEventsFound: 0) senza che
 * nessun log lo segnalasse.
 *
 * Fix robusto: sanitizzare qui, una volta sola, invece che confidare nel
 * contenuto esatto della env (Sensitive, non ispezionabile via CLI/API).
 */
const BOM_CODE_POINT = 0xfeff;

export function getEventbriteToken(): string | undefined {
  const raw = process.env.EVENTBRITE_TOKEN;
  if (!raw) return undefined;

  // Rimuove BOM e qualsiasi altro code point > 255 (l'header Authorization
  // richiede un ByteString valido: ogni carattere deve essere <= 255).
  let clean = '';
  for (const ch of raw) {
    const code = ch.charCodeAt(0);
    if (code === BOM_CODE_POINT) continue;
    if (code > 255) continue;
    clean += ch;
  }
  return clean.trim();
}
