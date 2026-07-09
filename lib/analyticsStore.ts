import { list, put, del, get } from '@vercel/blob';
import { getEventbriteToken } from './eventbriteToken';

/**
 * Layer dati della dashboard /analytics — tre famiglie di blob (store Private,
 * stesso BLOB_READ_WRITE_TOKEN di richContentStore):
 *
 * 1. First-party counters (visite + click CTA, scritti da /api/track):
 *    - analytics/raw/{YYYY-MM-DD}/evt-{rand}.json  → un blob per evento (append-only,
 *      niente read-modify-write concorrente sui contatori: zero perdite da race)
 *    - analytics/daily/{YYYY-MM-DD}.json           → compattazione del cron
 *      (/api/analytics/aggregate): somma i raw del giorno e li cancella.
 * 2. analytics/eventbrite/{YYYY-MM-DD}.json → snapshot giornaliero registrazioni
 *    (quantity_sold per ticket class) — la sequenza di snapshot dà la curva.
 * 3. analytics/xceed/manual.json → visite/vendite per evento copiate a mano da
 *    pro.xceed.me (nessuna API pubblica: vedi docs/analytics-strategy.md §3.4).
 *
 * Le date usano il giorno di Roma, non UTC: la serata del sabato deve contare
 * come sabato anche dopo mezzanotte UTC.
 */

// ---------------------------------------------------------------------------
// Tipi
// ---------------------------------------------------------------------------

export interface RawTrackedEvent {
  name: string;
  params: Record<string, string | number | undefined>;
  path?: string;
  ts: string;
}

/** Contatori additivi di un giorno. Chiavi composte, es. `pv`, `pv:path:/events/x`, `wa:src:floating`. */
export interface DailyStats {
  date: string;
  counts: Record<string, number>;
}

export interface EbEventStats {
  id: string;
  name: string;
  url: string;
  startUtc: string;
  status: string;
  baseId?: string;
  lang?: string;
  slugEn?: string;
  capacity: number | null;
  sold: number;
  ticketClasses: Array<{ name: string; sold: number; total: number | null }>;
}

export interface EbSnapshot {
  date: string;
  takenAt: string;
  events: EbEventStats[];
}

export interface XceedManualEntry {
  key: string;
  eventName: string;
  eventDate: string;
  views: number | null;
  sales: number | null;
  revenue: number | null;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function romeDay(d: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(d);
}

function hasBlob(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

async function readJson<T>(pathname: string): Promise<T | null> {
  try {
    const result = await get(pathname, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function writeJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/json',
    allowOverwrite: true,
  });
}

function cleanKeyPart(s: string): string {
  return s.replace(/[:\n\r]/g, '_').slice(0, 120);
}

/** Path normalizzato per i contatori: senza prefisso /it (stessa pagina, due lingue). */
function normPath(p: string | undefined): string {
  if (!p) return '/';
  const stripped = p.replace(/^\/it(?=\/|$)/, '') || '/';
  return cleanKeyPart(stripped.replace(/\/+$/, '') || '/');
}

/** Deriva le chiavi contatore da un evento raw — unico punto di verità dello schema chiavi. */
export function counterKeysFor(evt: RawTrackedEvent): string[] {
  const p = evt.params || {};
  const path = normPath((p.page_path as string) || evt.path);
  const src = cleanKeyPart(String(p.source || 'link'));
  switch (evt.name) {
    case 'pageview': {
      const keys = ['pv', `pv:path:${path}`];
      const ref = p.referrer ? cleanKeyPart(String(p.referrer)) : '';
      if (ref && !ref.includes('nightlifemilan')) keys.push(`pv:ref:${ref}`);
      return keys;
    }
    case 'whatsapp_click':
      return ['wa', `wa:src:${src}`, `wa:path:${path}`];
    case 'booking_form_submit': {
      const keys = ['bf'];
      if (p.venue) keys.push(`bf:venue:${cleanKeyPart(String(p.venue))}`);
      if (p.event_slug) keys.push(`bf:event:${cleanKeyPart(String(p.event_slug))}`);
      return keys;
    }
    case 'xceed_click':
      return ['xc', `xc:src:${src}`, `xc:path:${path}`];
    case 'eventbrite_click':
      return ['eb', `eb:src:${src}`, `eb:path:${path}`];
    default:
      return [];
  }
}

function mergeCounts(target: Record<string, number>, source: Record<string, number>): void {
  for (const [k, v] of Object.entries(source)) target[k] = (target[k] || 0) + v;
}

// ---------------------------------------------------------------------------
// 1. First-party counters
// ---------------------------------------------------------------------------

/** Scrive un singolo evento raw (chiamato da /api/track). */
export async function recordEvent(evt: Omit<RawTrackedEvent, 'ts'>): Promise<void> {
  if (!hasBlob()) return;
  const day = romeDay();
  await put(`analytics/raw/${day}/evt.json`, JSON.stringify({ ...evt, ts: new Date().toISOString() }), {
    access: 'private',
    addRandomSuffix: true,
    contentType: 'application/json',
  });
}

async function listAll(prefix: string): Promise<Array<{ pathname: string; url: string }>> {
  const out: Array<{ pathname: string; url: string }> = [];
  let cursor: string | undefined;
  do {
    const res = await list({ prefix, cursor, limit: 1000 });
    out.push(...res.blobs.map((b) => ({ pathname: b.pathname, url: b.url })));
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return out;
}

async function readRawCounts(blobs: Array<{ pathname: string }>): Promise<Record<string, Record<string, number>>> {
  const byDay: Record<string, Record<string, number>> = {};
  const CHUNK = 20;
  for (let i = 0; i < blobs.length; i += CHUNK) {
    const chunk = blobs.slice(i, i + CHUNK);
    const events = await Promise.all(chunk.map((b) => readJson<RawTrackedEvent>(b.pathname)));
    chunk.forEach((b, j) => {
      const evt = events[j];
      if (!evt) return;
      const day = b.pathname.match(/analytics\/raw\/(\d{4}-\d{2}-\d{2})\//)?.[1];
      if (!day) return;
      byDay[day] = byDay[day] || {};
      for (const key of counterKeysFor(evt)) byDay[day][key] = (byDay[day][key] || 0) + 1;
    });
  }
  return byDay;
}

/** Compatta tutti i raw nei riepiloghi giornalieri e li cancella (cron notturno). */
export async function aggregateRaw(): Promise<{ days: number; events: number }> {
  if (!hasBlob()) return { days: 0, events: 0 };
  const blobs = await listAll('analytics/raw/');
  if (blobs.length === 0) return { days: 0, events: 0 };

  const byDay = await readRawCounts(blobs);
  for (const [day, counts] of Object.entries(byDay)) {
    const path = `analytics/daily/${day}.json`;
    const existing = (await readJson<DailyStats>(path)) || { date: day, counts: {} };
    mergeCounts(existing.counts, counts);
    await writeJson(path, existing);
  }

  const CHUNK = 50;
  for (let i = 0; i < blobs.length; i += CHUNK) {
    await del(blobs.slice(i, i + CHUNK).map((b) => b.url));
  }
  return { days: Object.keys(byDay).length, events: blobs.length };
}

/** Ultimi N giorni di statistiche: riepiloghi compattati + raw non ancora aggregati (oggi live). */
export async function readDailyStats(days: number): Promise<DailyStats[]> {
  if (!hasBlob()) return [];
  const since = romeDay(new Date(Date.now() - days * 86400_000));

  const dailyBlobs = (await listAll('analytics/daily/')).filter(
    (b) => (b.pathname.match(/(\d{4}-\d{2}-\d{2})\.json$/)?.[1] || '') >= since
  );
  const dailies = (await Promise.all(dailyBlobs.map((b) => readJson<DailyStats>(b.pathname)))).filter(
    Boolean
  ) as DailyStats[];

  const rawBlobs = await listAll('analytics/raw/');
  const rawByDay = await readRawCounts(rawBlobs);

  const byDate = new Map<string, DailyStats>(dailies.map((d) => [d.date, d]));
  for (const [day, counts] of Object.entries(rawByDay)) {
    if (day < since) continue;
    const existing = byDate.get(day) || { date: day, counts: {} };
    mergeCounts(existing.counts, counts);
    byDate.set(day, existing);
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

// ---------------------------------------------------------------------------
// 2. Eventbrite
// ---------------------------------------------------------------------------

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const EB_ORG_ID = '2988002072164';
// Stessi formati marker di eventbriteSync.ts (nuovo con lingua + legacy senza)
const EB_MARKER_RE = /nlm:src=(.+?)-(en|it);slug-en=([a-z0-9-]+)/;
const EB_MARKER_LEGACY_RE = /nlm:src=([^;]+);slug-en=([a-z0-9-]+)/;

interface RawEbListEvent {
  id: string;
  name: { text: string };
  url: string;
  description?: { text?: string; html?: string };
  start: { utc: string };
  status: string;
  capacity?: number;
  ticket_classes?: Array<{ name: string; quantity_total?: number; quantity_sold?: number }>;
}

async function fetchEbPage(status: 'live' | 'ended'): Promise<RawEbListEvent[]> {
  const token = getEventbriteToken();
  if (!token) return [];
  const url = `${EVENTBRITE_API}/organizations/${EB_ORG_ID}/events/?status=${status}&expand=ticket_classes&order_by=start_desc&page_size=50`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
  if (!res.ok) return [];
  const data = (await res.json()) as { events?: RawEbListEvent[] };
  return data.events || [];
}

/** Stato live registrazioni/capienza per tutti gli eventi dell'org (live + terminati recenti). */
export async function fetchEventbriteStats(): Promise<EbEventStats[]> {
  const [live, ended] = await Promise.all([fetchEbPage('live'), fetchEbPage('ended')]);
  const cutoff = new Date(Date.now() - 45 * 86400_000).toISOString();
  const events = [...live, ...ended.filter((e) => e.start.utc >= cutoff)];

  return events.map((ev) => {
    const desc = ev.description?.html || ev.description?.text || '';
    const fresh = desc.match(EB_MARKER_RE);
    const legacy = fresh ? null : desc.match(EB_MARKER_LEGACY_RE);
    const classes = (ev.ticket_classes || []).map((t) => ({
      name: t.name,
      sold: t.quantity_sold || 0,
      total: t.quantity_total ?? null,
    }));
    return {
      id: ev.id,
      name: ev.name.text,
      url: ev.url,
      startUtc: ev.start.utc,
      status: ev.status,
      baseId: fresh?.[1] || legacy?.[1],
      lang: fresh?.[2],
      slugEn: fresh?.[3] || legacy?.[2],
      capacity: ev.capacity ?? null,
      sold: classes.reduce((s, t) => s + t.sold, 0),
      ticketClasses: classes,
    };
  });
}

/** Snapshot giornaliero (cron): la serie di snapshot dà la curva di registrazione. */
export async function putEbSnapshot(): Promise<EbSnapshot | null> {
  if (!hasBlob()) return null;
  const events = await fetchEventbriteStats();
  const snapshot: EbSnapshot = { date: romeDay(), takenAt: new Date().toISOString(), events };
  await writeJson(`analytics/eventbrite/${snapshot.date}.json`, snapshot);
  return snapshot;
}

/** Ultimi N snapshot (ordinati per data crescente). */
export async function readEbSnapshots(n: number): Promise<EbSnapshot[]> {
  if (!hasBlob()) return [];
  const blobs = (await listAll('analytics/eventbrite/'))
    .sort((a, b) => a.pathname.localeCompare(b.pathname))
    .slice(-n);
  return (await Promise.all(blobs.map((b) => readJson<EbSnapshot>(b.pathname)))).filter(Boolean) as EbSnapshot[];
}

// ---------------------------------------------------------------------------
// 3. Xceed (inserimento manuale da pro.xceed.me)
// ---------------------------------------------------------------------------

const XCEED_MANUAL_PATH = 'analytics/xceed/manual.json';

export async function readXceedManual(): Promise<XceedManualEntry[]> {
  if (!hasBlob()) return [];
  return (await readJson<XceedManualEntry[]>(XCEED_MANUAL_PATH)) || [];
}

/** Upsert per chiave (nome+data slugificati). views/sales/revenue null = non specificato. */
export async function upsertXceedEntry(
  entry: Omit<XceedManualEntry, 'key' | 'updatedAt'>
): Promise<XceedManualEntry[]> {
  const key = `${entry.eventName} ${entry.eventDate}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const entries = await readXceedManual();
  const next: XceedManualEntry = { ...entry, key, updatedAt: new Date().toISOString() };
  const idx = entries.findIndex((e) => e.key === key);
  if (idx >= 0) entries[idx] = next;
  else entries.push(next);
  entries.sort((a, b) => b.eventDate.localeCompare(a.eventDate));
  await writeJson(XCEED_MANUAL_PATH, entries);
  return entries;
}

export async function deleteXceedEntry(key: string): Promise<XceedManualEntry[]> {
  const entries = (await readXceedManual()).filter((e) => e.key !== key);
  await writeJson(XCEED_MANUAL_PATH, entries);
  return entries;
}
