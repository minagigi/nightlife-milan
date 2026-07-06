import { matchVenueId } from './venueMatching';

/**
 * Pulizia duplicati esistenti sulla nostra org — Fase 2C. Adattamento del piano
 * originale: doveva essere uno script locale (`scripts/cleanup-duplicates.mjs`),
 * ma EVENTBRITE_TOKEN è una env "Sensitive" su Vercel — illeggibile via CLI/API
 * fuori dal runtime di produzione, quindi impossibile da eseguire in locale.
 * Stessa logica, stessa garanzia di sicurezza (dry-run di default, esecuzione
 * reale solo esplicita), ma esposta come funzione richiamata da una route
 * protetta (`app/api/events/cleanup-duplicates/route.ts`) invece che da uno
 * script CLI.
 */

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

interface OrgEvent {
  id: string;
  name: { text: string };
  url: string;
  start: { local: string };
  venue?: { name?: string };
  status: string;
}

interface OrgEventWithAttendees extends OrgEvent {
  attendeeCount: number;
  hasImage: boolean;
}

async function fetchAllOrgEvents(token: string): Promise<OrgEvent[]> {
  const all: OrgEvent[] = [];
  let url: string | null =
    `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&expand=venue,logo&page_size=100`;

  while (url) {
    const res: Response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) break;
    const data = await res.json();
    all.push(...(data.events || []).map((e: OrgEvent & { logo?: unknown }) => e));
    const pagination = data.pagination;
    url = pagination?.has_more_items && pagination?.continuation
      ? `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&expand=venue,logo&page_size=100&continuation=${pagination.continuation}`
      : null;
  }
  return all;
}

async function getAttendeeCount(token: string, eventId: string): Promise<number> {
  try {
    const res = await fetch(`${EVENTBRITE_API}/events/${eventId}/attendees/?status=attending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.pagination?.object_count ?? (data.attendees || []).length;
  } catch {
    return 0;
  }
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\b(19|20)\d{2}\b/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Dice coefficient sui bigrammi — misura di similarità testo, 0-1. */
function diceCoefficient(a: string, b: string): number {
  const bigrams = (s: string) => {
    const arr: string[] = [];
    for (let i = 0; i < s.length - 1; i++) arr.push(s.slice(i, i + 2));
    return arr;
  };
  const bigramsA = bigrams(a);
  const bigramsB = bigrams(b);
  if (bigramsA.length === 0 || bigramsB.length === 0) return a === b ? 1 : 0;

  const setB = [...bigramsB];
  let matches = 0;
  for (const bg of bigramsA) {
    const idx = setB.indexOf(bg);
    if (idx !== -1) { matches++; setB.splice(idx, 1); }
  }
  return (2 * matches) / (bigramsA.length + bigramsB.length);
}

export interface DuplicateGroup {
  key: string; // "venueId|YYYY-MM-DD"
  events: OrgEventWithAttendees[];
  survivor: OrgEventWithAttendees;
  toDelete: OrgEventWithAttendees[];
  flaggedForManualReview: OrgEventWithAttendees[]; // duplicati con attendees, mai auto-cancellati
}

export interface CleanupPlan {
  totalEventsScanned: number;
  groups: DuplicateGroup[];
  legitimateMultiEventNights: { key: string; titles: string[] }[]; // stessa sera/venue ma titoli davvero diversi
}

export async function buildCleanupPlan(): Promise<CleanupPlan> {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) throw new Error('EVENTBRITE_TOKEN not set');

  const rawEvents = await fetchAllOrgEvents(token);

  // Arricchisci con attendee count (solo per eventi live/draft — costa una call ciascuno)
  const enriched: OrgEventWithAttendees[] = [];
  for (const ev of rawEvents) {
    const attendeeCount = await getAttendeeCount(token, ev.id);
    enriched.push({ ...ev, attendeeCount, hasImage: true }); // hasImage: assunzione conservativa senza parse extra
    await new Promise((r) => setTimeout(r, 300));
  }

  // Raggruppa per venueId|data
  const byKey = new Map<string, OrgEventWithAttendees[]>();
  for (const ev of enriched) {
    const venueId = matchVenueId(ev.venue?.name || '');
    if (!venueId) continue;
    const day = ev.start.local.slice(0, 10);
    const key = `${venueId}|${day}`;
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key)!.push(ev);
  }

  const groups: DuplicateGroup[] = [];
  const legitimateMultiEventNights: { key: string; titles: string[] }[] = [];

  for (const [key, events] of byKey) {
    if (events.length < 2) continue;

    // Verifica similarità titolo tra tutte le coppie
    const normalized = events.map((e) => normalizeTitle(e.name.text));
    let allSimilar = true;
    for (let i = 0; i < normalized.length; i++) {
      for (let j = i + 1; j < normalized.length; j++) {
        const sim = diceCoefficient(normalized[i], normalized[j]);
        const includes = normalized[i].includes(normalized[j]) || normalized[j].includes(normalized[i]);
        if (sim < 0.6 && !includes) allSimilar = false;
      }
    }

    if (!allSimilar) {
      legitimateMultiEventNights.push({ key, titles: events.map((e) => e.name.text) });
      continue;
    }

    // Sopravvissuto: (a) attendees>0, (b) ha immagine, (c) più recente
    const sorted = [...events].sort((a, b) => {
      if (a.attendeeCount !== b.attendeeCount) return b.attendeeCount - a.attendeeCount;
      if (a.hasImage !== b.hasImage) return a.hasImage ? -1 : 1;
      return b.id.localeCompare(a.id); // id più alto = più recente su Eventbrite
    });
    const survivor = sorted[0];
    const rest = sorted.slice(1);

    groups.push({
      key,
      events,
      survivor,
      toDelete: rest.filter((e) => e.attendeeCount === 0),
      flaggedForManualReview: rest.filter((e) => e.attendeeCount > 0),
    });
  }

  return { totalEventsScanned: rawEvents.length, groups, legitimateMultiEventNights };
}

export interface CleanupExecutionResult {
  deleted: { id: string; title: string }[];
  failed: { id: string; title: string; reason: string }[];
}

export async function executeCleanup(plan: CleanupPlan): Promise<CleanupExecutionResult> {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) throw new Error('EVENTBRITE_TOKEN not set');

  const deleted: { id: string; title: string }[] = [];
  const failed: { id: string; title: string; reason: string }[] = [];

  for (const group of plan.groups) {
    for (const ev of group.toDelete) {
      try {
        let res = await fetch(`${EVENTBRITE_API}/events/${ev.id}/`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok && ev.status === 'live') {
          // Alcuni eventi live richiedono unpublish prima della delete.
          await fetch(`${EVENTBRITE_API}/events/${ev.id}/unpublish/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
          });
          res = await fetch(`${EVENTBRITE_API}/events/${ev.id}/`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        if (res.ok) {
          deleted.push({ id: ev.id, title: ev.name.text });
        } else {
          failed.push({ id: ev.id, title: ev.name.text, reason: `HTTP ${res.status}` });
        }
      } catch (e) {
        failed.push({ id: ev.id, title: ev.name.text, reason: (e as Error).message });
      }
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return { deleted, failed };
}
