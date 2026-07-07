import { matchVenueId } from './venueMatching';
import type { ScoutedEvent } from './eventScout';
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

async function fetchOwnOrgEvents(): Promise<OwnOrgEvent[]> {
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
  fingerprints: Set<string>; // "venueId|YYYY-MM-DD"
  importedEbIds: Set<string>; // marker src:{ebId} già pubblicati
}

const SRC_MARKER_RE = /<!--\s*src:(\d+)\s*-->/;

export async function buildLedger(): Promise<Ledger> {
  const ownEvents = await fetchOwnOrgEvents();

  const fingerprints = new Set<string>();
  const importedEbIds = new Set<string>();

  for (const ev of ownEvents) {
    const venueId = matchVenueId(ev.venue?.name || '');
    if (venueId) {
      const day = ev.start.local.slice(0, 10); // YYYY-MM-DD
      fingerprints.add(`${venueId}|${day}`);
    }

    const marker = ev.description?.html?.match(SRC_MARKER_RE);
    if (marker) importedEbIds.add(marker[1]);
  }

  return { fingerprints, importedEbIds };
}

export function isNewCandidate(candidate: ScoutedEvent, ledger: Ledger): boolean {
  if (ledger.importedEbIds.has(candidate.ebId)) return false;
  const day = candidate.dateISO.slice(0, 10);
  if (ledger.fingerprints.has(`${candidate.venueId}|${day}`)) return false;
  return true;
}

export function filterNewCandidates(candidates: ScoutedEvent[], ledger: Ledger): ScoutedEvent[] {
  return candidates.filter((c) => isNewCandidate(c, ledger));
}
