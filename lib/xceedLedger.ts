import { fetchOwnOrgEvents } from './importLedger';
import type { XceedEvent } from './xceedScout';

/**
 * Ledger di deduplicazione per la sorgente Xceed — FASE X4 (piano Xceed).
 * A differenza del ledger scout (fingerprint `venueId|data`, un solo evento
 * per venue/giorno — assunzione ragionevole per eventi di terzi generici),
 * qui il dedupe è SOLO per `xceedId` esatto (marker `nlm:src=xc-{id}`): Aria
 * Club ha sere con 2 eventi diversi lo stesso giorno (es. giovedì 9 luglio:
 * "Summer Party 3.0" + "Thursday Night [Open Bar]") — un fingerprint per
 * giorno/venue senza l'id esatto collasserebbe il secondo come "già importato".
 */

const SRC_MARKER_RE = /nlm:src=xc-(\d+);slug-en=/;

export interface XceedLedger {
  importedXceedIds: Set<string>;
}

export async function buildXceedLedger(): Promise<XceedLedger> {
  const ownEvents = await fetchOwnOrgEvents();
  const importedXceedIds = new Set<string>();

  for (const ev of ownEvents) {
    const marker = ev.description?.html?.match(SRC_MARKER_RE);
    if (marker) importedXceedIds.add(marker[1]);
  }

  return { importedXceedIds };
}

export function isNewXceedCandidate(candidate: XceedEvent, ledger: XceedLedger): boolean {
  return !ledger.importedXceedIds.has(candidate.xceedId);
}

export function filterNewXceedCandidates(candidates: XceedEvent[], ledger: XceedLedger): XceedEvent[] {
  return candidates.filter((c) => isNewXceedCandidate(c, ledger));
}
