import { fetchOwnOrgEvents } from './importLedger';
import type { XceedEvent } from './xceedScout';
import type { Lang } from './eventRewriter';

/**
 * Ledger di deduplicazione per la sorgente Xceed — FASE X4/B ("eventi
 * separati"). Il dedupe è per `xceedId` esatto (Aria Club ha sere con 2
 * eventi diversi lo stesso giorno) E per lingua — ogni serata reale produce
 * DUE eventi Eventbrite (EN + IT, marker `nlm:src=xc-{id}-{lang}`): un run
 * interrotto a metà (es. EN pubblicato, IT fallito) deve ripubblicare SOLO
 * la lingua mancante al giro successivo, non l'intera serata.
 */

export const SRC_MARKER_RE = /nlm:src=xc-(\d+)-(en|it);slug-en=/;

export interface XceedLedger {
  /** Set di "xceedId:lang" già pubblicati, es. "220757:en" */
  importedXceedIdLangs: Set<string>;
}

export async function buildXceedLedger(): Promise<XceedLedger> {
  const ownEvents = await fetchOwnOrgEvents();
  const importedXceedIdLangs = new Set<string>();

  for (const ev of ownEvents) {
    const marker = ev.description?.html?.match(SRC_MARKER_RE);
    if (marker) importedXceedIdLangs.add(`${marker[1]}:${marker[2]}`);
  }

  return { importedXceedIdLangs };
}

/** Lingue ANCORA da pubblicare per questo candidato (vuoto = entrambe già fatte). */
export function missingLangsForXceedCandidate(candidate: XceedEvent, ledger: XceedLedger): Lang[] {
  return (['en', 'it'] as Lang[]).filter((lang) => !ledger.importedXceedIdLangs.has(`${candidate.xceedId}:${lang}`));
}

export function isNewXceedCandidate(candidate: XceedEvent, ledger: XceedLedger): boolean {
  return missingLangsForXceedCandidate(candidate, ledger).length > 0;
}

export function filterNewXceedCandidates(candidates: XceedEvent[], ledger: XceedLedger): XceedEvent[] {
  return candidates.filter((c) => isNewXceedCandidate(c, ledger));
}
