import type { ScoutedEvent } from './eventScout';
import type { Lang } from './eventRewriter';
import { getEventbriteToken } from './eventbriteToken';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

/**
 * Ledger di deduplicazione — Fase 2. Non riusa fetchEventbriteEvents() (che
 * mappa/riscrive per il rendering del sito e scarta la description HTML grezza)
 * perché qui serve il campo raw per estrarre il marker `<!-- src:{ebId} -->`
 * lasciato da ogni publish precedente (lib/eventPublisher.ts, Fase 5).
 * Include anche gli eventi `draft`/`started` in aggiunta a `live`, per non
 * reimportare un evento che l'utente ha lasciato in bozza.
 */

interface OwnOrgEvent {
  id: string;
  venue?: { name?: string };
  start: { local: string };
  description?: { html?: string };
}

export async function fetchOwnOrgEvents(): Promise<OwnOrgEvent[]> {
  const token = getEventbriteToken();
  if (!token) return [];

  const all: OwnOrgEvent[] = [];
  let url: string | null =
    `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&expand=venue&page_size=100&order_by=start_asc`;

  while (url) {
    let res: Response;
    try {
      res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    } catch {
      break;
    }
    if (!res.ok) break;

    const data = await res.json();
    all.push(...(data.events || []));

    const pagination = data.pagination;
    url = pagination?.has_more_items && pagination?.continuation
      ? `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&expand=venue&page_size=100&order_by=start_asc&continuation=${pagination.continuation}`
      : null;
  }

  return all;
}

export interface Ledger {
  /** Set di "ebId:lang" già pubblicati, es. "237143:en" */
  importedEbIdLangs: Set<string>;
}

// Marker per-lingua (FASE B "eventi separati", 2026-07-08): ogni serata reale
// produce DUE eventi Eventbrite (EN + IT), marker `nlm:src={ebId}-{lang};slug-en=…`.
// Il vecchio fingerprint `venueId|data` è stato rimosso: con 2 eventi attesi per
// venue/giorno (uno per lingua) bloccherebbe erroneamente la seconda lingua come
// "slot già occupato" — il marker per-lingua è ormai l'unica fonte affidabile.
// Lang esteso a QUALSIASI codice a 2 lettere (FASE L3 multilingua): i marker
// delle lingue tradotte (es. `-es;`) entrano nel ledger senza rompere il
// dedupe en/it delle pipeline v3/v4 (che interrogano solo base:en/base:it).
export const SRC_MARKER_RE = /nlm:src=([^-;]+)-([a-z]{2});slug-en=/;

export async function buildLedger(): Promise<Ledger> {
  const ownEvents = await fetchOwnOrgEvents();
  const importedEbIdLangs = new Set<string>();

  for (const ev of ownEvents) {
    const marker = ev.description?.html?.match(SRC_MARKER_RE);
    if (marker) importedEbIdLangs.add(`${marker[1]}:${marker[2]}`);
  }

  return { importedEbIdLangs };
}

/** Lingue ANCORA da pubblicare per questo candidato (vuoto = entrambe già fatte). */
export function missingLangsForCandidate(candidate: ScoutedEvent, ledger: Ledger): Lang[] {
  return (['en', 'it'] as Lang[]).filter((lang) => !ledger.importedEbIdLangs.has(`${candidate.ebId}:${lang}`));
}

export function isNewCandidate(candidate: ScoutedEvent, ledger: Ledger): boolean {
  return missingLangsForCandidate(candidate, ledger).length > 0;
}

export function filterNewCandidates(candidates: ScoutedEvent[], ledger: Ledger): ScoutedEvent[] {
  return candidates.filter((c) => isNewCandidate(c, ledger));
}
