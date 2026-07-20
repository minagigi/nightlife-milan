#!/usr/bin/env npx tsx
/**
 * API-only refresh runner for the existing Jul 21--26 Eventbrite listings.
 *
 * This intentionally never creates a listing. A marker must identify exactly
 * one live listing before any media upload or mutation can happen. Every
 * repair receives an on-disk snapshot and an automatic rollback attempt.
 */
import { loadEnvConfig } from '@next/env';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getEventbriteToken } from '../lib/eventbriteToken';
import { sleep } from '../lib/eventPublisher';
import { normalizeEventbriteConfirmationText, updateEventbriteConfirmation } from '../lib/eventbriteConfirmation';
import {
  WEEKLY_JULY20_BATCH_EVENTS,
  buildWeeklyJuly20EventbritePayloads,
  type WeeklyJuly20EventbritePayload,
  type WeeklyJuly20Locale,
  validateWeeklyJuly20EventbritePayload,
} from '../lib/weeklyJuly20Eventbrite';

const API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const ROOT = path.resolve('artifacts/weekly-2026-07-20/eventbrite-batch');
const execute = process.argv.includes('--execute');
const preflightOnly = process.argv.includes('--preflight');
const resume = process.argv.includes('--resume');
const rollbackArg = process.argv.find((arg) => arg.startsWith('--rollback='))?.slice(11);
const eventArg = process.argv.find((arg) => arg.startsWith('--event='))?.slice(8) || 'all';
const localeArg = process.argv.find((arg) => arg.startsWith('--locale='))?.slice(9) || 'all';
const from = Number(process.argv.find((arg) => arg.startsWith('--from='))?.slice(7) || '1');
const max = Number(process.argv.find((arg) => arg.startsWith('--max='))?.slice(6) || '10');

type Media = { id: string; url: string };
type Manifest = {
  version: 2;
  assets: { cover: string; body: [string, string, string, string, string] };
  cover: Media;
  body: [Media, Media, Media, Media, Media];
};
type Snapshot = {
  version: 1;
  capturedAt: string;
  target: { eventId: string; marker: string; venueId: string; startUtc: string; endUtc: string };
  event: Record<string, any>;
  ticketBuyerSettings: Record<string, any>;
  musicProperties: Record<string, any>;
};
type ResultAction = 'passed' | 'repaired' | 'failed' | 'duplicate' | 'skipped';
type Result = { action: ResultAction; marker: string; eventId?: string; url?: string; failures?: unknown[]; error?: string; rollback?: string };

const auth = (token: string) => ({ Authorization: `Bearer ${token}`, 'content-type': 'application/json' });
const cdn = (url: string) => /^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url);
const publicFile = (asset: string) => path.resolve('public', asset.replace(/^\//, ''));
const textField = (value: unknown): string => typeof value === 'string'
  ? value
  : typeof value === 'object' && value !== null && typeof (value as { html?: unknown }).html === 'string'
    ? String((value as { html: string }).html)
    : '';
const safeId = (value: unknown, label: string): string => {
  const id = String(value || '');
  if (!/^\d+$/.test(id)) throw new Error(`${label} has no safe numeric id`);
  return id;
};

async function apiFetch(url: string, init: RequestInit, label: string): Promise<Response> {
  let result: Response | undefined;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    result = await fetch(url, init);
    if (result.status !== 429 && result.status < 500) return result;
    if (attempt < 5) {
      const retryAfter = Number(result.headers.get('retry-after'));
      await sleep(retryAfter > 0 ? retryAfter * 1000 : attempt * attempt * 1500);
    }
  }
  if (!result) throw new Error(`${label}: no response`);
  return result;
}

async function requireJson(token: string, suffix: string, label: string): Promise<Record<string, any>> {
  const response = await apiFetch(`${API}${suffix}`, { headers: auth(token) }, label);
  if (!response.ok) throw new Error(`${label}: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
  return response.json() as Promise<Record<string, any>>;
}

async function uploadMedia(token: string, filePath: string): Promise<Media> {
  const bytes = await readFile(filePath);
  const filename = path.basename(filePath);
  const mime = path.extname(filePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
  const prepared = await apiFetch(`${API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`, { headers: { Authorization: `Bearer ${token}` } }, `prepare ${filename}`);
  if (!prepared.ok) throw new Error(`prepare ${filename}: HTTP ${prepared.status} ${(await prepared.text()).slice(0, 200)}`);
  const info = await prepared.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
  form.append(info.file_parameter_name || 'file', new Blob([bytes], { type: mime }), filename);
  const uploaded = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!uploaded.ok) throw new Error(`upload ${filename}: HTTP ${uploaded.status} ${(await uploaded.text()).slice(0, 200)}`);
  const finalized = await apiFetch(`${API}/media/upload/`, { method: 'POST', headers: auth(token), body: JSON.stringify({ upload_token: info.upload_token }) }, `finalize ${filename}`);
  if (!finalized.ok) throw new Error(`finalize ${filename}: HTTP ${finalized.status} ${(await finalized.text()).slice(0, 200)}`);
  const saved = await finalized.json();
  const url = String(saved.original?.url || saved.url || '').replace(/&amp;/g, '&');
  if (!saved.id || !cdn(url)) throw new Error(`invalid Eventbrite CDN media for ${filename}`);
  return { id: String(saved.id), url };
}

function manifestAssets(eventKey: string, locale: WeeklyJuly20Locale): Manifest['assets'] {
  const event = WEEKLY_JULY20_BATCH_EVENTS.find((item) => item.eventKey === eventKey);
  if (!event) throw new Error(`Unknown weekly event ${eventKey}`);
  return { cover: event.visualAssets[locale].cover, body: event.visualAssets[locale].body };
}

function validManifest(saved: unknown, expectedAssets: Manifest['assets']): saved is Manifest {
  const candidate = saved as Partial<Manifest>;
  const media = candidate ? [candidate.cover, ...(candidate.body || [])] : [];
  return candidate?.version === 2
    && JSON.stringify(candidate.assets) === JSON.stringify(expectedAssets)
    && media.length === 6
    && media.every((item) => /^\d+$/.test(String(item?.id || '')) && cdn(String(item?.url || '')));
}

async function loadOrUploadManifest(token: string, eventKey: string, locale: WeeklyJuly20Locale): Promise<Manifest> {
  const checkpoint = path.join(ROOT, eventKey, `${locale}-media.json`);
  const assets = manifestAssets(eventKey, locale);
  try {
    const saved = JSON.parse(await readFile(checkpoint, 'utf8')) as unknown;
    if (validManifest(saved, assets)) return saved;
  } catch { /* upload a new versioned manifest below */ }
  const cover = await uploadMedia(token, publicFile(assets.cover));
  const body: Media[] = [];
  for (const asset of assets.body) {
    await sleep(1200);
    body.push(await uploadMedia(token, publicFile(asset)));
  }
  const manifest: Manifest = { version: 2, assets, cover, body: body as Manifest['body'] };
  await mkdir(path.dirname(checkpoint), { recursive: true });
  await writeFile(checkpoint, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

async function organizationEvents(token: string): Promise<Array<Record<string, any>>> {
  const base = `${API}/organizations/${ORG_ID}/events/?status=live&time_filter=current_future&order_by=start_desc&page_size=200&expand=venue,logo`;
  const events: Array<Record<string, any>> = [];
  let continuation: string | undefined;
  do {
    const response = await apiFetch(continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base, { headers: auth(token) }, 'venue event inventory');
    if (!response.ok) throw new Error(`venue event inventory: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
    const page = await response.json();
    events.push(...(page.events || []));
    continuation = page.pagination?.has_more_items ? page.pagination.continuation : undefined;
  } while (continuation);
  return events;
}

const findMarker = (events: Array<Record<string, any>>, marker: string) => events.filter((event) => String(event.description?.html || '').includes(`<!-- ${marker} -->`));
const normalizeVenueText = (value: unknown) => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const venueExpectation = {
  'v-justme': { name: ['just me milano', 'justme milano'], address: ['viale luigi camoens', '2'] },
  'v-aria': { name: ['aria club milano'], address: ['piazzale dello sport', '14'] },
  'v-pineta': { name: ['pineta club', 'pineta club milano'], address: ['via messina', '38'] },
} as const;
function venueMatchesEvent(saved: Record<string, any>, event: typeof WEEKLY_JULY20_BATCH_EVENTS[number]): boolean {
  const expected = venueExpectation[event.venueId];
  const name = normalizeVenueText(saved.venue?.name);
  const address = normalizeVenueText(saved.venue?.address?.localized_address_display || saved.venue?.address?.address_1);
  return expected.name.some((candidate) => name === candidate)
    && expected.address.every((token) => address.includes(token));
}

function gate(html: string, payload: WeeklyJuly20EventbritePayload, manifest: Manifest, affiliateUrl: string): string | null {
  try {
    validateWeeklyJuly20EventbritePayload({ ...payload, descriptionHtml: html }, manifest.body.map((item) => item.url), affiliateUrl);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

async function audit(token: string, eventId: string, payload: WeeklyJuly20EventbritePayload, manifest: Manifest, event: typeof WEEKLY_JULY20_BATCH_EVENTS[number], venueId: string) {
  const [saved, settings, music] = await Promise.all([
    requireJson(token, `/events/${eventId}/?expand=ticket_classes,venue,logo,music_properties`, `audit ${eventId}`),
    requireJson(token, `/events/${eventId}/ticket_buyer_settings/`, `settings ${eventId}`),
    requireJson(token, `/events/${eventId}/music_properties/`, `music ${eventId}`),
  ]);
  const ticket = Array.isArray(saved.ticket_classes) ? saved.ticket_classes : [];
  const confirmation = `${textField(settings.confirmation_message)} ${textField(settings.instructions)}`;
  const confirmationText = normalizeEventbriteConfirmationText(confirmation);
  const descriptionFailure = gate(String(saved.description?.html || ''), payload, manifest, event.affiliateUrl);
  const failures = [
    saved.status !== 'live' && 'status',
    String(saved.venue_id || saved.venue?.id || '') !== venueId && 'venue',
    saved.start?.utc !== event.startUtc && 'start',
    saved.end?.utc !== event.endUtc && 'end',
    String(saved.logo?.id || saved.logo_id || '') !== manifest.cover.id && 'cover',
    descriptionFailure && `description:${descriptionFailure}`,
    ticket.length !== 1 && 'ticket-count',
    ticket[0]?.name !== payload.ticket.name && 'ticket-name',
    textField(ticket[0]?.description) !== payload.ticket.description && 'ticket-description',
    !confirmation.includes(event.affiliateUrl) && 'confirmation-link',
    !confirmationText.includes(payload.confirmation.heading) && 'confirmation-context',
    !confirmation.includes('+39 351 912 7047') && 'confirmation-whatsapp',
    event.ageRestriction && music.age_restriction !== event.ageRestriction && 'age',
    event.doorTimeISO && !String(music.door_time || '').startsWith(event.doorTimeISO.slice(0, 16)) && 'door-time',
  ].filter(Boolean) as string[];
  return { ok: failures.length === 0, failures, id: eventId, url: String(saved.url || ''), marker: payload.marker };
}

function assertSnapshot(snapshot: Snapshot): void {
  const event = snapshot.event;
  const ticket = Array.isArray(event.ticket_classes) ? event.ticket_classes : [];
  if (snapshot.version !== 1) throw new Error('rollback snapshot version is unsupported');
  safeId(snapshot.target.eventId, 'rollback event');
  safeId(snapshot.target.venueId, 'rollback venue');
  if (!snapshot.target.marker || !snapshot.target.startUtc || !snapshot.target.endUtc) throw new Error('rollback snapshot identity is incomplete');
  if (String(event.id || '') !== snapshot.target.eventId) throw new Error('rollback snapshot event id mismatch');
  if (!textField(event.name) || !textField(event.summary) || !textField(event.description)) throw new Error('rollback snapshot event fields are incomplete');
  safeId(event.logo_id || event.logo?.id, 'rollback cover');
  safeId(event.venue_id || event.venue?.id, 'rollback event venue');
  if (ticket.length !== 1) throw new Error(`rollback snapshot must contain exactly one ticket class, found ${ticket.length}`);
  safeId(ticket[0]?.id, 'rollback ticket');
  if (!String(ticket[0]?.name || '') || !textField(ticket[0]?.description)) throw new Error('rollback snapshot ticket is incomplete');
}

async function snapshotExisting(token: string, eventId: string, payload: WeeklyJuly20EventbritePayload, event: typeof WEEKLY_JULY20_BATCH_EVENTS[number], venueId: string): Promise<Snapshot> {
  const [saved, settings, music] = await Promise.all([
    requireJson(token, `/events/${eventId}/?expand=ticket_classes,venue,logo,music_properties`, `snapshot ${eventId}`),
    requireJson(token, `/events/${eventId}/ticket_buyer_settings/`, `snapshot settings ${eventId}`),
    requireJson(token, `/events/${eventId}/music_properties/`, `snapshot music ${eventId}`),
  ]);
  const html = String(saved.description?.html || '');
  const markerCount = (html.match(new RegExp(payload.marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const failures = [
    String(saved.id || '') !== eventId && 'event-id',
    saved.status !== 'live' && 'status',
    String(saved.venue_id || saved.venue?.id || '') !== venueId && 'venue',
    saved.start?.utc !== event.startUtc && 'start',
    saved.end?.utc !== event.endUtc && 'end',
    markerCount !== 1 && `marker-count:${markerCount}`,
    !Array.isArray(saved.ticket_classes) || saved.ticket_classes.length !== 1 ? 'ticket-count' : '',
  ].filter(Boolean);
  if (failures.length > 0) throw new Error(`${payload.marker}: update preflight refused: ${failures.join(', ')}`);
  const snapshot: Snapshot = {
    version: 1,
    capturedAt: new Date().toISOString(),
    target: { eventId, marker: payload.marker, venueId, startUtc: event.startUtc, endUtc: event.endUtc },
    event: saved,
    ticketBuyerSettings: settings,
    musicProperties: music,
  };
  assertSnapshot(snapshot);
  return snapshot;
}

function snapshotPath(eventKey: string, locale: WeeklyJuly20Locale, variant: number, eventId: string): string {
  return path.join(ROOT, 'rollback', eventKey, locale, `${String(variant).padStart(2, '0')}-${eventId}.json`);
}

async function post(token: string, suffix: string, body: Record<string, unknown>, label: string): Promise<void> {
  const response = await apiFetch(`${API}${suffix}`, { method: 'POST', headers: auth(token), body: JSON.stringify(body) }, label);
  if (!response.ok) throw new Error(`${label}: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
}

async function updateTicket(token: string, eventId: string, ticket: Record<string, any>, payload: WeeklyJuly20EventbritePayload): Promise<void> {
  const ticketId = safeId(ticket.id, 'existing ticket');
  if (ticket.name === payload.ticket.name && textField(ticket.description) === payload.ticket.description) return;
  await post(token, `/events/${eventId}/ticket_classes/${ticketId}/`, {
    ticket_class: { name: payload.ticket.name, description: payload.ticket.description },
  }, `${payload.marker}: ticket update`);
}

async function updateExistingEvent(token: string, eventId: string, venueId: string, payload: WeeklyJuly20EventbritePayload, manifest: Manifest): Promise<void> {
  await post(token, `/events/${eventId}/`, {
    event: {
      name: { html: payload.title },
      summary: payload.summary,
      logo_id: manifest.cover.id,
      venue_id: venueId,
    },
  }, `${payload.marker}: metadata update`);
  await post(token, `/events/${eventId}/`, {
    event: { description: { html: payload.descriptionHtml } },
  }, `${payload.marker}: description update`);
}

async function updateMusic(token: string, eventId: string, event: typeof WEEKLY_JULY20_BATCH_EVENTS[number]): Promise<void> {
  await post(token, `/events/${eventId}/music_properties/`, {
    music_properties: { age_restriction: event.ageRestriction, door_time: event.doorTimeISO },
  }, `music properties ${eventId}`);
}

async function restoreSnapshot(token: string, snapshot: Snapshot, source: 'automatic' | 'manual'): Promise<void> {
  assertSnapshot(snapshot);
  const { event, ticketBuyerSettings: settings, musicProperties: music } = snapshot;
  const eventId = snapshot.target.eventId;
  const ticket = event.ticket_classes[0] as Record<string, any>;
  await post(token, `/events/${eventId}/`, {
    event: {
      name: { html: textField(event.name) },
      summary: textField(event.summary),
      logo_id: safeId(event.logo_id || event.logo?.id, 'snapshot cover'),
      venue_id: safeId(event.venue_id || event.venue?.id, 'snapshot venue'),
    },
  }, `${source} rollback metadata`);
  await post(token, `/events/${eventId}/`, {
    event: { description: { html: textField(event.description) } },
  }, `${source} rollback description`);
  await post(token, `/events/${eventId}/ticket_classes/${safeId(ticket.id, 'snapshot ticket')}/`, {
    ticket_class: { name: ticket.name, description: textField(ticket.description) },
  }, `${source} rollback ticket`);
  await post(token, `/events/${eventId}/ticket_buyer_settings/`, {
    ticket_buyer_settings: {
      confirmation_message: { html: textField(settings.confirmation_message) },
      instructions: { html: textField(settings.instructions) },
    },
  }, `${source} rollback confirmation`);
  await post(token, `/events/${eventId}/music_properties/`, {
    music_properties: { age_restriction: music.age_restriction, door_time: music.door_time },
  }, `${source} rollback music`);
}

async function automaticRollback(token: string, snapshot: Snapshot, destination: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await restoreSnapshot(token, snapshot, 'automatic');
    await writeFile(destination.replace(/\.json$/i, '-result.json'), `${JSON.stringify({ rolledBackAt: new Date().toISOString(), ok: true, target: snapshot.target }, null, 2)}\n`, 'utf8');
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await writeFile(destination.replace(/\.json$/i, '-result.json'), `${JSON.stringify({ rolledBackAt: new Date().toISOString(), ok: false, target: snapshot.target, error: message }, null, 2)}\n`, 'utf8').catch(() => undefined);
    return { ok: false, error: message };
  }
}

function counts(results: readonly Result[]): Record<ResultAction, number> {
  return results.reduce<Record<ResultAction, number>>((total, result) => {
    total[result.action] += 1;
    return total;
  }, { passed: 0, repaired: 0, failed: 0, duplicate: 0, skipped: 0 });
}

async function saveCheckpoint(results: readonly Result[]): Promise<void> {
  await mkdir(ROOT, { recursive: true });
  await writeFile(path.join(ROOT, 'checkpoint.json'), `${JSON.stringify({ updatedAt: new Date().toISOString(), counts: counts(results), results }, null, 2)}\n`, 'utf8');
}

async function repairExisting(token: string, existing: Record<string, any>, payload: WeeklyJuly20EventbritePayload, manifest: Manifest, event: typeof WEEKLY_JULY20_BATCH_EVENTS[number], venueId: string): Promise<Result> {
  const eventId = safeId(existing.id, 'existing Eventbrite event');
  const snapshot = await snapshotExisting(token, eventId, payload, event, venueId);
  const rollback = snapshotPath(event.eventKey, payload.locale, payload.variant, eventId);
  await mkdir(path.dirname(rollback), { recursive: true });
  await writeFile(rollback, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  let mutationStarted = false;
  try {
    mutationStarted = true;
    await updateTicket(token, eventId, snapshot.event.ticket_classes[0], payload);
    await updateExistingEvent(token, eventId, venueId, payload, manifest);
    const confirmation = await updateEventbriteConfirmation({ token, eventId, locale: payload.locale, affiliateUrls: [event.affiliateUrl], context: payload.confirmation });
    if (!confirmation.ok) throw new Error(`${payload.marker}: confirmation update failed: ${confirmation.reason || confirmation.status}`);
    await updateMusic(token, eventId, event);
    const checked = await audit(token, eventId, payload, manifest, event, venueId);
    if (!checked.ok) throw new Error(`${payload.marker}: second API readback failed: ${checked.failures.join(', ')}`);
    return { action: 'repaired', marker: payload.marker, eventId, url: checked.url, rollback };
  } catch (error) {
    if (mutationStarted) {
      await requireJson(token, `/events/${eventId}/?expand=ticket_classes,venue,logo,music_properties`, `failed readback ${eventId}`)
        .then((failedState) => writeFile(rollback.replace(/\.json$/i, '-failed-readback.json'), `${JSON.stringify(failedState, null, 2)}\n`, 'utf8'))
        .catch(() => undefined);
    }
    const rollbackResult = mutationStarted ? await automaticRollback(token, snapshot, rollback) : null;
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${message}. Rollback ${rollbackResult?.ok ? 'succeeded' : `failed: ${rollbackResult?.error || 'not attempted'}`}. Snapshot: ${rollback}`);
  }
}

async function runManualRollback(token: string, snapshotFile: string): Promise<void> {
  if (!execute) throw new Error('Manual rollback requires --execute --rollback=<snapshot.json>');
  const snapshot = JSON.parse(await readFile(path.resolve(snapshotFile), 'utf8')) as Snapshot;
  await restoreSnapshot(token, snapshot, 'manual');
  console.log(JSON.stringify({ mode: 'manual-rollback', ok: true, snapshot: path.resolve(snapshotFile), eventId: snapshot.target.eventId }, null, 2));
}

async function main(): Promise<void> {
  loadEnvConfig(process.env.EVENTBRITE_ENV_DIR || process.cwd());
  if (rollbackArg) {
    const token = getEventbriteToken();
    if (!token) throw new Error('EVENTBRITE_TOKEN is not configured');
    await runManualRollback(token, rollbackArg);
    return;
  }
  if (!['all', 'en', 'it'].includes(localeArg) || !Number.isInteger(from) || from < 1 || from > 10 || !Number.isInteger(max) || max < 1 || max > 10) {
    throw new Error('Invalid --locale, --from or --max');
  }
  const events = eventArg === 'all' ? WEEKLY_JULY20_BATCH_EVENTS : WEEKLY_JULY20_BATCH_EVENTS.filter((event) => event.eventKey === eventArg);
  if (events.length === 0) throw new Error(`Unknown --event=${eventArg}`);
  if (!execute && !preflightOnly) {
    const previewLocales = (localeArg === 'all' ? ['it', 'en'] : [localeArg]) as WeeklyJuly20Locale[];
    const preview = events.flatMap((event) => previewLocales.flatMap((locale) =>
      buildWeeklyJuly20EventbritePayloads(event.eventKey, locale, ['https://img.evbuc.com/poster', 'https://img.evbuc.com/mood-1', 'https://img.evbuc.com/mood-2', 'https://img.evbuc.com/mood-3', 'https://img.evbuc.com/mood-4'])
        .slice(from - 1, from - 1 + max)
        .map((payload) => ({ eventKey: event.eventKey, locale, variant: payload.variant, marker: payload.marker, canonicalSiteUrl: payload.canonicalSiteUrl, title: payload.title, summaryLength: [...payload.summary].length, bodyLength: payload.descriptionHtml.length }))));
    console.log(JSON.stringify({ mode: 'dry-run', create: false, count: preview.length, preview }, null, 2));
    return;
  }
  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN is not configured');
  const now = Date.now();
  for (const event of events) if (new Date(event.startUtc).getTime() <= now) throw new Error(`${event.eventKey}: refusing to refresh a past or started event`);

  const locales = (localeArg === 'all' ? ['it', 'en'] : [localeArg]) as WeeklyJuly20Locale[];
  const inventory = await organizationEvents(token);
  const inventories = new Map<string, Array<Record<string, any>>>();
  const preflightResults: Result[] = [];
  for (const event of events) {
    inventories.set(event.eventKey, inventory);
    for (const locale of locales) {
      const probes = buildWeeklyJuly20EventbritePayloads(event.eventKey, locale, ['https://img.evbuc.com/poster', 'https://img.evbuc.com/mood-1', 'https://img.evbuc.com/mood-2', 'https://img.evbuc.com/mood-3', 'https://img.evbuc.com/mood-4']).slice(from - 1, from - 1 + max);
      for (const payload of probes) {
        const matches = findMarker(inventory, payload.marker);
        const venueOk = matches.length === 1 && venueMatchesEvent(matches[0], event);
        const action: ResultAction = matches.length === 1 && matches[0].status === 'live' && venueOk
          ? 'passed'
          : matches.length > 1 ? 'duplicate' : 'failed';
        preflightResults.push({
          action,
          marker: payload.marker,
          eventId: matches.length === 1 ? String(matches[0].id || '') : undefined,
          url: matches.length === 1 ? String(matches[0].url || '') : undefined,
          error: matches.length === 0
            ? 'existing marker not found; creation is disabled'
            : matches.length > 1
              ? `duplicate marker (${matches.length})`
              : matches[0].status !== 'live'
                ? `expected live listing, found ${matches[0].status || 'missing status'}`
                : !venueOk
                  ? 'venue name/address mismatch'
                : undefined,
        });
      }
    }
  }
  const preflightFailures = preflightResults.filter((result) => result.action !== 'passed');
  if (preflightFailures.length > 0) {
    console.error(JSON.stringify({ mode: 'preflight', create: false, target: preflightResults.length, counts: counts(preflightResults), failures: preflightFailures }, null, 2));
    throw new Error(`global preflight refused: ${preflightFailures.length} unsafe target(s)`);
  }
  if (preflightOnly) {
    console.log(JSON.stringify({ mode: 'preflight', create: false, target: preflightResults.length, counts: counts(preflightResults), results: preflightResults }, null, 2));
    return;
  }

  const checkpointResults: Result[] = resume
    ? (JSON.parse(await readFile(path.join(ROOT, 'checkpoint.json'), 'utf8')) as { results?: Result[] }).results || []
    : [];
  const results = checkpointResults.filter((result) => ['passed', 'repaired'].includes(result.action));
  const preflightByMarker = new Map(preflightResults.map((result) => [result.marker, result]));
  for (const result of results) {
    const current = preflightByMarker.get(result.marker);
    if (!current || current.eventId !== result.eventId) {
      throw new Error(`resume checkpoint is stale or unsafe at ${result.marker}`);
    }
  }
  const processedMarkers = new Set(results.map((result) => result.marker));
  for (const event of events) {
    const inventory = inventories.get(event.eventKey)!;
    for (const locale of locales) {
      const probePayloads = buildWeeklyJuly20EventbritePayloads(event.eventKey, locale, ['https://img.evbuc.com/poster', 'https://img.evbuc.com/mood-1', 'https://img.evbuc.com/mood-2', 'https://img.evbuc.com/mood-3', 'https://img.evbuc.com/mood-4']).slice(from - 1, from - 1 + max);
      for (const payload of probePayloads) {
        const matches = findMarker(inventory, payload.marker);
        if (matches.length !== 1) {
          const action: ResultAction = matches.length > 1 ? 'duplicate' : 'failed';
          const result: Result = { action, marker: payload.marker, error: matches.length > 1 ? `duplicate marker (${matches.length})` : 'existing marker not found; creation is disabled' };
          results.push(result);
          await saveCheckpoint(results);
          throw new Error(`${payload.marker}: ${result.error}`);
        }
        if (matches[0].status !== 'live') {
          const result: Result = { action: 'failed', marker: payload.marker, eventId: String(matches[0].id || ''), error: `expected live listing, found ${matches[0].status || 'missing status'}` };
          results.push(result);
          await saveCheckpoint(results);
          throw new Error(`${payload.marker}: ${result.error}`);
        }
      }

      const manifest = await loadOrUploadManifest(token, event.eventKey, locale);
      const payloads = buildWeeklyJuly20EventbritePayloads(event.eventKey, locale, manifest.body.map((item) => item.url) as [string, string, string, string, string]).slice(from - 1, from - 1 + max);
      for (const payload of payloads) {
        if (processedMarkers.has(payload.marker)) continue;
        const existing = findMarker(inventory, payload.marker)[0];
        const venueId = safeId(existing.venue_id || existing.venue?.id, 'existing Eventbrite venue');
        try {
          const checked = await audit(token, safeId(existing.id, 'existing Eventbrite event'), payload, manifest, event, venueId);
          const result = checked.ok
            ? { action: 'passed' as const, marker: payload.marker, eventId: checked.id, url: checked.url }
            : await repairExisting(token, existing, payload, manifest, event, venueId);
          results.push(result);
          await saveCheckpoint(results);
          await sleep(1700);
        } catch (error) {
          const result: Result = { action: 'failed', marker: payload.marker, eventId: String(existing?.id || ''), error: error instanceof Error ? error.message : String(error) };
          results.push(result);
          await saveCheckpoint(results);
          throw error;
        }
      }
    }
  }
  await saveCheckpoint(results);
  console.log(JSON.stringify({ mode: 'execute', create: false, target: results.length, counts: counts(results), results }, null, 2));
}

main().catch((error) => {
  console.error(`[publish-weekly-july20-eventbrite] ${error instanceof Error ? error.stack || error.message : String(error)}`);
  process.exitCode = 1;
});
