#!/usr/bin/env npx tsx
/**
 * API-only publisher for the prepared Jul 20 remaining-locale manifest.
 *
 * No arguments: local validation/plan only (zero network, zero mutation).
 * --preflight: organization-wide read-only exact-marker inventory.
 * --execute: one explicitly selected event/locale pilot (ten variants) or the approved full batch with --all.
 *
 * Body media are immutable Eventbrite IDs/CDN URLs from prepared-manifest.jsonl.
 * When present, the verified v5 cover map replaces only the cover ID/URL so
 * newly created listings cannot regress to the cropped preview.
 * This runner has no media upload, browser, deploy, or image-generation path.
 */
import { loadEnvConfig } from '@next/env';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getEventbriteToken } from '../lib/eventbriteToken';

const API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const MANIFEST_PATH = path.resolve('.Codex/work/2026-07-19-weekly-july20-remaining-locales/prepared-manifest.jsonl');
const COVER_V5_MAP_PATH = path.resolve('.Codex/work/2026-07-19-weekly-july20-remaining-locales/cover-v5-map.json');
const CHECKPOINT_ROOT = path.resolve('.Codex/work/2026-07-19-weekly-july20-remaining-locales/publish-checkpoints');
const PHONE = '+39 351 912 7047';
const ALLOWED_STATUSES = new Set(['draft', 'live', 'started']);

type Media = { id: string; url: string };

export type PreparedRow = {
  schemaVersion: 1;
  campaign: 'weekly-2026-07-20';
  eventKey: string;
  xceedId: string;
  locale: string;
  eventbriteLocale: string;
  variant: number;
  marker: string;
  canonicalSiteUrl: string;
  title: string;
  summary: string;
  startUtc: string;
  endUtc: string;
  doorTimeISO?: string;
  venueId: string;
  venueEventbriteId: string;
  affiliateUrl: string;
  ageRestriction: string;
  descriptionHtml: string;
  faqCount: 25;
  keywordPermutations: string[];
  ticket: { name: string; description: string };
  confirmation: { confirmation_message: string; instructions: string };
  media: {
    sourceManifest: string;
    sourceManifestSha256: string;
    cover: Media;
    body: [Media, Media, Media, Media, Media];
  };
};

export type ExistingEvent = {
  id: string;
  status?: string;
  name?: { text?: string; html?: string };
  summary?: string;
  description?: { html?: string };
  start?: { utc?: string };
  end?: { utc?: string };
  venue_id?: string;
  venue?: { id?: string };
  logo_id?: string;
  logo?: { id?: string; url?: string };
  ticket_classes?: Array<Record<string, unknown>>;
  url?: string;
};

export type RunnerArgs = {
  execute: boolean;
  preflight: boolean;
  all: boolean;
  pilotLocale?: string;
  pilotEvent?: string;
};

export type MarkerPreflight = {
  marker: string;
  occurrences: number;
  eventIds: string[];
  statuses: string[];
};

type FetchLike = typeof fetch;
type CheckpointStage = 'create-response' | 'draft-reconciled' | 'draft-prepared' | 'published' | 'verified' | 'failed';
type Checkpoint = {
  version: 1;
  marker: string;
  eventKey: string;
  locale: string;
  variant: number;
  eventId?: string;
  stage: CheckpointStage;
  updatedAt: string;
  error?: string;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function exactMarkerComment(marker: string): string {
  return `<!-- ${marker} -->`;
}

function markerCount(html: string, marker: string): number {
  return html.split(exactMarkerComment(marker)).length - 1;
}

function normalizedUrl(value: string): string {
  return value.replace(/&amp;/giu, '&');
}

function textField(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const candidate = value as { text?: unknown; html?: unknown };
    return String(candidate.text ?? candidate.html ?? '');
  }
  return '';
}

function normalizedSummary(value: string): string {
  return value.replace(/\u2026/gu, '-').replace(/\.[\p{L}]$/u, '.');
}

function safeNumericId(value: unknown, label: string): string {
  const id = String(value ?? '');
  assert(/^\d+$/u.test(id), `${label}: expected a numeric Eventbrite id`);
  return id;
}

function excludedCampaign(value: unknown): boolean {
  const text = JSON.stringify(value).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
  return /(?:^|[^a-z])gue(?:[^a-z]|$)|bad[\s-]*bunny/u.test(text);
}

export function parseCliArgs(argv: string[]): RunnerArgs {
  const known = new Set(['--execute', '--preflight', '--all']);
  for (const arg of argv) {
    if (known.has(arg) || arg.startsWith('--pilot-locale=') || arg.startsWith('--pilot-event=')) continue;
    throw new Error(`Unknown argument: ${arg}`);
  }
  const args: RunnerArgs = {
    execute: argv.includes('--execute'),
    preflight: argv.includes('--preflight'),
    all: argv.includes('--all'),
    pilotLocale: argv.find((arg) => arg.startsWith('--pilot-locale='))?.slice('--pilot-locale='.length),
    pilotEvent: argv.find((arg) => arg.startsWith('--pilot-event='))?.slice('--pilot-event='.length),
  };
  assert(!(args.execute && args.preflight), '--execute and --preflight are mutually exclusive');
  assert(!(args.all && !args.execute), '--all requires --execute');
  assert(Boolean(args.pilotLocale) === Boolean(args.pilotEvent), 'pilot locale and pilot event must be supplied together');
  assert(!(args.all && (args.pilotLocale || args.pilotEvent)), '--all cannot be combined with pilot selection');
  if (args.execute) {
    assert(args.all || (args.pilotLocale && args.pilotEvent), '--execute requires --pilot-locale and --pilot-event, or --all');
  }
  return args;
}

export async function loadPreparedManifest(manifestPath = MANIFEST_PATH): Promise<PreparedRow[]> {
  let coverMap: Record<string, Media> = {};
  try {
    coverMap = JSON.parse(await readFile(COVER_V5_MAP_PATH, 'utf8')) as Record<string, Media>;
  } catch { /* pre-v5 and isolated tests retain their frozen manifest cover */ }
  const raw = await readFile(manifestPath, 'utf8');
  const rows = raw.split(/\r?\n/u).filter(Boolean).map((line, index) => {
    try {
      const row = JSON.parse(line) as PreparedRow;
      // Eventbrite can corrupt U+2026 in the short summary on readback. Keep
      // that field ASCII-safe while preserving the full native description.
      row.summary = row.summary.replace(/\u2026/gu, '-');
      if (coverMap[row.eventKey]) row.media.cover = coverMap[row.eventKey];
      return row;
    } catch (error) {
      throw new Error(`Prepared manifest row ${index + 1} is invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
  });
  assert(rows.length === 2_970, `Expected 2,970 prepared rows, found ${rows.length}`);
  const markers = new Set<string>();
  const pairs = new Set<string>();
  const locales = new Set<string>();
  const events = new Set<string>();
  const media = new Set<string>();
  for (const row of rows) {
    assert(row.schemaVersion === 1 && row.campaign === 'weekly-2026-07-20', `${row.marker || 'unknown'}: invalid prepared schema`);
    assert(row.locale !== 'en' && row.locale !== 'it', `${row.marker}: EN/IT is outside this runner`);
    assert(!excludedCampaign(row), `${row.marker}: Guè/Bad Bunny is outside this runner`);
    assert(/^nlm:curated=weekly-2026-07-20-/u.test(row.marker), `${row.marker}: invalid campaign marker`);
    assert(!markers.has(row.marker), `${row.marker}: duplicate marker in prepared manifest`);
    assert(Number.isInteger(row.variant) && row.variant >= 1 && row.variant <= 10, `${row.marker}: invalid variant`);
    assert(row.descriptionHtml.includes(exactMarkerComment(row.marker)), `${row.marker}: exact marker comment missing`);
    assert(row.descriptionHtml.includes(row.canonicalSiteUrl), `${row.marker}: canonical link missing`);
    assert(row.canonicalSiteUrl.startsWith(`https://nightlifemilan.com/${row.locale}/events/`), `${row.marker}: canonical is not same-language`);
    assert(row.descriptionHtml.includes(row.affiliateUrl) && row.affiliateUrl.includes('/channel/nightlifemilan-1'), `${row.marker}: affiliate URL missing`);
    assert(row.locale.length === 2 && row.eventKey && row.eventbriteLocale, `${row.marker}: locale/event identity incomplete`);
    assert(/^\d+$/u.test(row.venueEventbriteId), `${row.marker}: venue id is not numeric`);
    const rowMedia = [row.media.cover, ...row.media.body];
    assert(rowMedia.length === 6, `${row.marker}: expected one cover plus five body media`);
    for (const item of rowMedia) {
      assert(/^\d+$/u.test(item.id) && /^https:\/\/(?:img|cdn)\.evbuc\.com\//iu.test(item.url), `${row.marker}: invalid frozen Eventbrite media`);
      media.add(`${item.id}\u0000${item.url}`);
    }
    markers.add(row.marker);
    pairs.add(`${row.eventKey}:${row.locale}`);
    locales.add(row.locale);
    events.add(row.eventKey);
  }
  assert(markers.size === 2_970, `Expected 2,970 unique markers, found ${markers.size}`);
  assert(pairs.size === 297 && locales.size === 33 && events.size === 9, 'Prepared event/locale matrix is incomplete');
  assert(media.size === 54, `Expected exactly 54 frozen media ID/URL pairs, found ${media.size}`);
  return rows;
}

export function selectRows(rows: PreparedRow[], args: RunnerArgs): PreparedRow[] {
  if (args.all) return rows;
  if (!args.pilotLocale && !args.pilotEvent) return rows;
  const selected = rows
    .filter((row) => row.locale === args.pilotLocale && row.eventKey === args.pilotEvent)
    .sort((a, b) => a.variant - b.variant);
  assert(selected.length === 10, `Pilot selection must resolve exactly ten variants, found ${selected.length}`);
  return selected;
}

export function localExecutionPlan(rows: PreparedRow[], args: RunnerArgs) {
  const selected = selectRows(rows, args);
  return {
    ok: true,
    mode: args.execute ? 'execute' : args.preflight ? 'preflight' : 'local-plan',
    create: args.execute,
    mutationsEnabled: args.execute,
    networkEnabled: args.execute || args.preflight,
    selectedRows: selected.length,
    selectedLocales: [...new Set(selected.map((row) => row.locale))],
    selectedEvents: [...new Set(selected.map((row) => row.eventKey))],
    mediaUploads: 0,
    imageOperations: 0,
    includesEnglishOrItalian: selected.some((row) => row.locale === 'en' || row.locale === 'it'),
  };
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function apiFetch(fetchImpl: FetchLike, url: string, init: RequestInit, label: string, retries = 4): Promise<Response> {
  let response: Response | undefined;
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      response = await fetchImpl(url, { ...init, signal: AbortSignal.timeout(30_000) });
      if (response.status !== 429 && response.status < 500) return response;
      lastError = new Error(`${label}: HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < retries) {
      const retryAfter = Number(response?.headers.get('retry-after') || '0');
      await sleep(retryAfter > 0 ? Math.min(retryAfter * 1000, 30_000) : attempt * attempt * 1_000);
    }
  }
  if (response) return response;
  throw new Error(`${label}: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

function auth(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

async function requireJson(fetchImpl: FetchLike, token: string, suffix: string, label: string): Promise<Record<string, any>> {
  const response = await apiFetch(fetchImpl, `${API}${suffix}`, { headers: auth(token) }, label);
  if (!response.ok) throw new Error(`${label}: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
  return response.json() as Promise<Record<string, any>>;
}

export async function listOrganizationInventory(token: string, fetchImpl: FetchLike = fetch): Promise<ExistingEvent[]> {
  const base = `${API}/organizations/${ORG_ID}/events/?status=live,draft,started&time_filter=current_future&order_by=start_asc&page_size=200&expand=venue,logo`;
  const events: ExistingEvent[] = [];
  let continuation: string | undefined;
  for (let page = 1; page <= 100; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const body = await requireJson(fetchImpl, token, url.slice(API.length), `organization inventory page ${page}`);
    events.push(...((body.events || []) as ExistingEvent[]).filter((event) => ALLOWED_STATUSES.has(String(event.status || ''))));
    continuation = body.pagination?.has_more_items ? String(body.pagination.continuation || '') : undefined;
    if (!continuation) return events;
  }
  throw new Error('Organization inventory exceeded 100 pages');
}

export function exactMarkerMatches(marker: string, inventory: ExistingEvent[]): ExistingEvent[] {
  return inventory.filter((event) => markerCount(String(event.description?.html || ''), marker) === 1);
}

export function markerPreflight(rows: PreparedRow[], inventory: ExistingEvent[]): MarkerPreflight[] {
  return rows.map((row) => {
    const matches = exactMarkerMatches(row.marker, inventory);
    return {
      marker: row.marker,
      occurrences: matches.length,
      eventIds: matches.map((event) => String(event.id)),
      statuses: matches.map((event) => String(event.status || '')),
    };
  });
}

export function assertNoMarkerDuplicates(rows: PreparedRow[], inventory: ExistingEvent[]): MarkerPreflight[] {
  const preflight = markerPreflight(rows, inventory);
  const duplicates = preflight.filter((row) => row.occurrences > 1);
  const eventToMarkers = new Map<string, string[]>();
  for (const row of rows) {
    for (const event of exactMarkerMatches(row.marker, inventory)) {
      const markers = eventToMarkers.get(String(event.id)) || [];
      markers.push(row.marker);
      eventToMarkers.set(String(event.id), markers);
    }
  }
  const identityCollisions = [...eventToMarkers.entries()].filter(([, markers]) => new Set(markers).size > 1);
  assert(duplicates.length === 0, `Duplicate exact markers block execution: ${duplicates.map((row) => `${row.marker}=${row.eventIds.join(',')}`).join('; ')}`);
  assert(identityCollisions.length === 0, `One Eventbrite id owns multiple prepared markers: ${identityCollisions.map(([id, markers]) => `${id}=${markers.join(',')}`).join('; ')}`);
  return preflight;
}

function eventVenueId(event: ExistingEvent): string {
  return String(event.venue_id || event.venue?.id || '');
}

function assertExpectedIdentity(event: ExistingEvent, row: PreparedRow): void {
  assert(String(event.id || '').match(/^\d+$/u), `${row.marker}: existing event id is unsafe`);
  assert(event.start?.utc === row.startUtc, `${row.marker}: existing start does not match`);
  assert(event.end?.utc === row.endUtc, `${row.marker}: existing end does not match`);
  assert(eventVenueId(event) === row.venueEventbriteId, `${row.marker}: existing venue does not match`);
}

function checkpointPath(row: PreparedRow): string {
  return path.join(CHECKPOINT_ROOT, row.eventKey, row.locale, `${String(row.variant).padStart(2, '0')}.json`);
}

async function writeCheckpoint(row: PreparedRow, stage: CheckpointStage, eventId?: string, error?: string): Promise<void> {
  const target = checkpointPath(row);
  const temporary = `${target}.tmp`;
  const checkpoint: Checkpoint = {
    version: 1,
    marker: row.marker,
    eventKey: row.eventKey,
    locale: row.locale,
    variant: row.variant,
    eventId,
    stage,
    updatedAt: new Date().toISOString(),
    ...(error ? { error } : {}),
  };
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(temporary, `${JSON.stringify(checkpoint, null, 2)}\n`, 'utf8');
  await rename(temporary, target);
}

async function readEvent(fetchImpl: FetchLike, token: string, eventId: string): Promise<ExistingEvent> {
  return requireJson(fetchImpl, token, `/events/${safeNumericId(eventId, 'event')}/?expand=ticket_classes,venue,logo,music_properties`, `event readback ${eventId}`) as Promise<ExistingEvent>;
}

async function reconcileUncertainCreate(fetchImpl: FetchLike, token: string, row: PreparedRow): Promise<ExistingEvent> {
  for (const delay of [0, 2_000, 5_000]) {
    if (delay) await sleep(delay);
    const matches = exactMarkerMatches(row.marker, await listOrganizationInventory(token, fetchImpl));
    if (matches.length > 1) throw new Error(`${row.marker}: uncertain create reconciled to duplicate ids ${matches.map((event) => event.id).join(',')}`);
    if (matches.length === 1) {
      assertExpectedIdentity(matches[0], row);
      return matches[0];
    }
  }
  throw new Error(`${row.marker}: create response was uncertain and exact-marker reconciliation found zero events; create was not retried`);
}

async function createMarkerDraft(fetchImpl: FetchLike, token: string, row: PreparedRow): Promise<ExistingEvent> {
  const body = {
    event: {
      name: { html: row.title },
      // Summary is deliberately written later. Keeping it out of this request
      // lets the first draft write carry the exact marker in description, which
      // makes a lost/5xx create response safely reconcilable without retry.
      description: { html: row.descriptionHtml },
      start: { timezone: 'Europe/Rome', utc: row.startUtc },
      end: { timezone: 'Europe/Rome', utc: row.endUtc },
      currency: 'EUR',
      venue_id: safeNumericId(row.venueEventbriteId, `${row.marker} venue`),
      online_event: false,
      listed: true,
      shareable: true,
      locale: row.eventbriteLocale,
      logo_id: safeNumericId(row.media.cover.id, `${row.marker} cover`),
      category_id: '103',
    },
  };
  let response: Response | undefined;
  try {
    // Never use apiFetch here: retrying a create after an uncertain response
    // can create a duplicate. Reconciliation is the only allowed next step.
    response = await fetchImpl(`${API}/organizations/${ORG_ID}/events/`, {
      method: 'POST',
      headers: auth(token),
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(45_000),
    });
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 300);
      if (response.status < 500 && response.status !== 429) throw new Error(`${row.marker}: create rejected HTTP ${response.status} ${detail}`);
      return reconcileUncertainCreate(fetchImpl, token, row);
    }
    const created = await response.json().catch(() => null) as { id?: unknown } | null;
    if (!created?.id) return reconcileUncertainCreate(fetchImpl, token, row);
    const eventId = safeNumericId(created.id, `${row.marker} create response`);
    await writeCheckpoint(row, 'create-response', eventId);
    const event = await readEvent(fetchImpl, token, eventId);
    assertExpectedIdentity(event, row);
    assert(markerCount(String(event.description?.html || ''), row.marker) === 1, `${row.marker}: marker did not persist in initial draft`);
    return event;
  } catch (error) {
    if (error instanceof Error && /create rejected HTTP/u.test(error.message)) throw error;
    return reconcileUncertainCreate(fetchImpl, token, row);
  }
}

async function postJson(fetchImpl: FetchLike, token: string, suffix: string, body: Record<string, unknown>, label: string): Promise<void> {
  const response = await apiFetch(fetchImpl, `${API}${suffix}`, { method: 'POST', headers: auth(token), body: JSON.stringify(body) }, label, 1);
  if (!response.ok) throw new Error(`${label}: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
}

function descriptionGate(html: string, row: PreparedRow): void {
  assert(markerCount(html, row.marker) === 1, `${row.marker}: exact marker did not persist once`);
  assert(html.includes(row.canonicalSiteUrl), `${row.marker}: same-language canonical missing after write`);
  assert(html.includes(row.affiliateUrl), `${row.marker}: affiliate URL missing after write`);
  assert((html.match(/data-event-faq="true"/giu) || []).length === 25, `${row.marker}: 25 FAQ did not persist`);
  const imageUrls = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/giu)].map((match) => normalizedUrl(match[1]));
  assert(imageUrls.length === 5, `${row.marker}: five body images did not persist`);
  assert(imageUrls.every((url, index) => url === normalizedUrl(row.media.body[index].url)), `${row.marker}: frozen media URL order changed`);
}

async function ensureTicket(fetchImpl: FetchLike, token: string, row: PreparedRow, eventId: string): Promise<void> {
  const current = await readEvent(fetchImpl, token, eventId);
  const tickets = Array.isArray(current.ticket_classes) ? current.ticket_classes : [];
  assert(tickets.length <= 1, `${row.marker}: multiple ticket classes block execution`);
  if (tickets.length === 1) {
    const ticketId = safeNumericId(tickets[0].id, `${row.marker} ticket`);
    if (String(tickets[0].name || '') === row.ticket.name && textField(tickets[0].description) === row.ticket.description) return;
    await postJson(fetchImpl, token, `/events/${eventId}/ticket_classes/${ticketId}/`, {
      ticket_class: { name: row.ticket.name, description: row.ticket.description },
    }, `${row.marker} ticket repair`);
    return;
  }
  try {
    await postJson(fetchImpl, token, `/events/${eventId}/ticket_classes/`, {
      ticket_class: {
        name: row.ticket.name,
        description: row.ticket.description,
        free: true,
        quantity_total: 500,
        minimum_quantity: 1,
        maximum_quantity: 10,
        hide_sale_dates: false,
        sales_end: row.endUtc,
      },
    }, `${row.marker} ticket create`);
  } catch (error) {
    const reconciled = await readEvent(fetchImpl, token, eventId);
    const after = Array.isArray(reconciled.ticket_classes) ? reconciled.ticket_classes : [];
    if (after.length !== 1) throw error;
  }
}

async function publishDraft(fetchImpl: FetchLike, token: string, row: PreparedRow, eventId: string): Promise<void> {
  try {
    await postJson(fetchImpl, token, `/events/${eventId}/publish/`, {}, `${row.marker} publish`);
  } catch (error) {
    const reconciled = await readEvent(fetchImpl, token, eventId);
    if (!['live', 'started'].includes(String(reconciled.status || ''))) throw error;
  }
}

async function verifyLive(fetchImpl: FetchLike, token: string, row: PreparedRow, eventId: string): Promise<{ id: string; url: string }> {
  const [event, settings, music] = await Promise.all([
    readEvent(fetchImpl, token, eventId),
    requireJson(fetchImpl, token, `/events/${eventId}/ticket_buyer_settings/`, `${row.marker} confirmation readback`),
    requireJson(fetchImpl, token, `/events/${eventId}/music_properties/`, `${row.marker} music readback`),
  ]);
  assertExpectedIdentity(event, row);
  assert(['live', 'started'].includes(String(event.status || '')), `${row.marker}: event is not live`);
  assert(textField(event.name) === row.title, `${row.marker}: title mismatch`);
  const actualSummary = normalizedSummary(String(event.summary || ''));
  const expectedSummary = normalizedSummary(row.summary);
  assert(actualSummary === expectedSummary, `${row.marker}: summary mismatch actual=${JSON.stringify(actualSummary)} expected=${JSON.stringify(expectedSummary)}`);
  assert(String(event.logo?.id || event.logo_id || '') === row.media.cover.id, `${row.marker}: cover id mismatch`);
  descriptionGate(String(event.description?.html || ''), row);
  const tickets = Array.isArray(event.ticket_classes) ? event.ticket_classes : [];
  assert(tickets.length === 1, `${row.marker}: expected one ticket`);
  assert(String(tickets[0].name || '') === row.ticket.name && textField(tickets[0].description) === row.ticket.description, `${row.marker}: ticket mismatch`);
  const confirmationMessage = String(settings.confirmation_message?.html || '');
  const instructions = String(settings.instructions?.html || '');
  for (const [label, field] of [['confirmation_message', confirmationMessage], ['instructions', instructions]] as const) {
    assert(field.includes(row.affiliateUrl) && field.includes(PHONE), `${row.marker}: ${label} is incomplete`);
  }
  assert(String(music.age_restriction || '') === row.ageRestriction, `${row.marker}: age restriction mismatch`);
  if (row.doorTimeISO) assert(String(music.door_time || '').startsWith(row.doorTimeISO.slice(0, 16)), `${row.marker}: door time mismatch`);
  return { id: eventId, url: String(event.url || '') };
}

async function completeDraft(fetchImpl: FetchLike, token: string, row: PreparedRow, draft: ExistingEvent): Promise<{ id: string; url: string }> {
  const eventId = safeNumericId(draft.id, `${row.marker} draft`);
  assertExpectedIdentity(draft, row);
  assert(String(draft.status || '') === 'draft', `${row.marker}: expected a draft to resume`);
  assert(markerCount(String(draft.description?.html || ''), row.marker) === 1, `${row.marker}: resumable draft marker missing`);
  await writeCheckpoint(row, 'draft-reconciled', eventId);
  await postJson(fetchImpl, token, `/events/${eventId}/`, {
    event: {
      name: { html: row.title },
      summary: row.summary,
      logo_id: row.media.cover.id,
      venue_id: row.venueEventbriteId,
    },
  }, `${row.marker} metadata write`);
  await postJson(fetchImpl, token, `/events/${eventId}/`, {
    event: { description: { html: row.descriptionHtml } },
  }, `${row.marker} description write`);
  const descriptionReadback = await readEvent(fetchImpl, token, eventId);
  descriptionGate(String(descriptionReadback.description?.html || ''), row);
  await ensureTicket(fetchImpl, token, row, eventId);
  await writeCheckpoint(row, 'draft-prepared', eventId);
  await publishDraft(fetchImpl, token, row, eventId);
  await writeCheckpoint(row, 'published', eventId);
  await postJson(fetchImpl, token, `/events/${eventId}/music_properties/`, {
    music_properties: { age_restriction: row.ageRestriction, ...(row.doorTimeISO ? { door_time: row.doorTimeISO } : {}) },
  }, `${row.marker} music properties`);
  await postJson(fetchImpl, token, `/events/${eventId}/ticket_buyer_settings/`, {
    ticket_buyer_settings: {
      confirmation_message: { html: row.confirmation.confirmation_message },
      instructions: { html: row.confirmation.instructions },
    },
  }, `${row.marker} confirmations`);
  const verified = await verifyLive(fetchImpl, token, row, eventId);
  await writeCheckpoint(row, 'verified', eventId);
  return verified;
}

async function executeSelected(rows: PreparedRow[], inventory: ExistingEvent[], token: string, fetchImpl: FetchLike = fetch) {
  const results: Array<Record<string, unknown>> = [];
  for (const row of rows) {
    let workingEventId: string | undefined;
    try {
      const matches = exactMarkerMatches(row.marker, inventory);
      assert(matches.length <= 1, `${row.marker}: duplicate gate was bypassed`);
      if (matches.length === 1 && ['live', 'started'].includes(String(matches[0].status || ''))) {
        workingEventId = safeNumericId(matches[0].id, `${row.marker} existing live`);
        const verified = await verifyLive(fetchImpl, token, row, workingEventId);
        await writeCheckpoint(row, 'verified', verified.id);
        results.push({ marker: row.marker, action: 'passed', ...verified });
        continue;
      }
      const draft = matches[0] || await createMarkerDraft(fetchImpl, token, row);
      workingEventId = safeNumericId(draft.id, `${row.marker} working draft`);
      const verified = await completeDraft(fetchImpl, token, row, draft);
      results.push({ marker: row.marker, action: matches.length ? 'resumed' : 'created', ...verified });
      // Add the verified row to the in-memory inventory so a repeated marker in
      // this process cannot be created even if the remote list is eventually consistent.
      inventory.push({ ...draft, id: verified.id, status: 'live', description: { html: row.descriptionHtml }, url: verified.url });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      await writeCheckpoint(row, 'failed', workingEventId, message);
      throw error;
    }
  }
  return results;
}

export async function run(argv = process.argv.slice(2), fetchImpl: FetchLike = fetch) {
  const args = parseCliArgs(argv);
  const allRows = await loadPreparedManifest();
  const rows = selectRows(allRows, args);
  const plan = localExecutionPlan(allRows, args);
  if (!args.preflight && !args.execute) return plan;

  loadEnvConfig(process.cwd());
  const token = getEventbriteToken();
  assert(token, 'EVENTBRITE_TOKEN is required for API preflight or execute mode');
  const inventory = await listOrganizationInventory(token, fetchImpl);
  const preflight = assertNoMarkerDuplicates(rows, inventory);
  const report = {
    ...plan,
    organizationInventoryRows: inventory.length,
    exactMarkersMissing: preflight.filter((row) => row.occurrences === 0).length,
    exactMarkersPresent: preflight.filter((row) => row.occurrences === 1).length,
    duplicates: 0,
  };
  if (!args.execute) return report;

  // All selected markers are preflighted before the first mutation. Execution
  // is either the approved ten-row pilot or the explicitly approved full batch.
  const results = await executeSelected(rows, inventory, token, fetchImpl);
  return { ...report, results, completed: results.length };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  run().then(
    (result) => process.stdout.write(`${JSON.stringify(result, null, 2)}\n`),
    (error) => {
      console.error(error instanceof Error ? error.stack || error.message : String(error));
      process.exitCode = 1;
    },
  );
}
