import type { ScoutedEvent } from './eventScout';
import type { Lang } from './eventRewriter';

interface OwnOrgEvent {
  id: string;
  status?: string;
  url?: string;
  venue?: { name?: string };
  start: { local: string };
  description?: { html?: string };
}

export async function fetchOwnOrgEvents(_statuses = 'live,draft,started'): Promise<OwnOrgEvent[]> {
  return [];
}

export interface Ledger {
  /** Set di "ebId:lang" storici, es. "237143:en" */
  importedEbIdLangs: Set<string>;
}

export const SRC_MARKER_RE = /nlm:src=([^-;]+)-([a-z]{2});slug-en=/;

export async function buildLedger(): Promise<Ledger> {
  return { importedEbIdLangs: new Set<string>() };
}

export function missingLangsForCandidate(candidate: ScoutedEvent, ledger: Ledger): Lang[] {
  return (['en', 'it'] as Lang[]).filter((lang) => !ledger.importedEbIdLangs.has(`${candidate.ebId}:${lang}`));
}

export function isNewCandidate(candidate: ScoutedEvent, ledger: Ledger): boolean {
  return missingLangsForCandidate(candidate, ledger).length > 0;
}

export function filterNewCandidates(candidates: ScoutedEvent[], ledger: Ledger): ScoutedEvent[] {
  return candidates.filter((c) => isNewCandidate(c, ledger));
}
