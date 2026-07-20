import { loadEnvConfig } from '@next/env';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  buildGueEventbriteLocalePayloads,
  validateGueEventbriteLocalePayload,
  type GueEventbriteLocalePayload,
} from '../lib/gueEventbriteLocales';
import {
  GUE_JUST_ME_ADDRESS,
  GUE_JUST_ME_AFFILIATE_URL,
  GUE_JUST_ME_END_UTC,
  GUE_JUST_ME_PHONE,
  GUE_JUST_ME_START_UTC,
} from '../lib/gueJustMe';
import { getEventbriteToken } from '../lib/eventbriteToken';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const EVENT_ID = '1994392210790';
const EXPECTED_MARKER = 'nlm:curated=gue-v1-en-2026-07-25';
const EXPECTED_VENUE_ID = '295950971';
const OUTPUT_DIR = path.resolve('artifacts/gue-just-me-2026-07-25/pilot-en-v2');
const ROLLBACK_PATH = path.join(OUTPUT_DIR, 'eventbrite-pilot-en-v2-rollback.json');
const READBACK_PATH = path.join(OUTPUT_DIR, 'eventbrite-pilot-en-v2-readback.json');
const FAILURE_PATH = path.join(OUTPUT_DIR, 'eventbrite-pilot-en-v2-failure.json');
const ROLLBACK_RESULT_PATH = path.join(OUTPUT_DIR, 'eventbrite-pilot-en-v2-rollback-result.json');
const EXECUTE_FLAG = '--execute';
const ROLLBACK_FLAG = '--rollback';

const ASSETS = [
  { kind: 'cover', filename: 'gue-just-me-2026-07-25-cover-2x1-en-v2.jpg', widthRatio: 2, heightRatio: 1 },
  { kind: 'poster', filename: 'gue-just-me-2026-07-25-poster-5x4-en-v2.jpg', widthRatio: 5, heightRatio: 4 },
  { kind: 'performance', filename: 'gue-just-me-2026-07-25-performance-5x4-en-v2.jpg', widthRatio: 5, heightRatio: 4 },
  { kind: 'target', filename: 'gue-just-me-2026-07-25-target-5x4-en-v2.jpg', widthRatio: 5, heightRatio: 4 },
  { kind: 'dress', filename: 'gue-just-me-2026-07-25-dress-5x4-en-v2.jpg', widthRatio: 5, heightRatio: 4 },
  { kind: 'programme', filename: 'gue-just-me-2026-07-25-programme-5x4-en-v2.jpg', widthRatio: 5, heightRatio: 4 },
] as const;

interface EventbriteMedia {
  id: string;
  url: string;
}

interface LoadedAsset {
  kind: (typeof ASSETS)[number]['kind'];
  filename: string;
  bytes: Uint8Array;
  width: number;
  height: number;
}

interface Snapshot {
  capturedAt: string;
  target: {
    eventId: string;
    marker: string;
    startUtc: string;
    endUtc: string;
    venueId: string;
  };
  event: Record<string, unknown>;
  ticketBuyerSettings: Record<string, unknown>;
  musicProperties: Record<string, unknown>;
}

export type PilotRunMode = 'execute' | 'rollback';

export function parseRunMode(args: readonly string[] = process.argv.slice(2)): PilotRunMode {
  const execute = args.includes(EXECUTE_FLAG);
  const rollback = args.includes(ROLLBACK_FLAG);
  if (execute && rollback) throw new Error(`${EXECUTE_FLAG} and ${ROLLBACK_FLAG} are mutually exclusive`);
  if (execute) return 'execute';
  if (rollback) return 'rollback';
  throw new Error(`Refusing Eventbrite mutation without ${EXECUTE_FLAG} or ${ROLLBACK_FLAG}`);
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

function redact(value: string, token: string): string {
  return value.split(token).join('[REDACTED]').replace(/Bearer\s+[^\s"']+/gi, 'Bearer [REDACTED]');
}

async function responseExcerpt(response: Response, token: string): Promise<string> {
  return redact((await response.text()).replace(/\s+/g, ' ').slice(0, 500), token);
}

async function eventbriteFetch(
  token: string,
  endpoint: string,
  init: RequestInit = {},
  label = endpoint,
  attempts = 4,
): Promise<Response> {
  let lastResponse: Response | undefined;
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(`${EVENTBRITE_API}${endpoint}`, {
        ...init,
        headers: { ...authHeaders(token), ...(init.headers || {}) },
      });
      lastResponse = response;
      if (response.status !== 429 && response.status < 500) return response;
      if (attempt === attempts) return response;
      const retryAfter = Number(response.headers.get('retry-after'));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? Math.min(30_000, retryAfter * 1_000)
        : Math.min(12_000, attempt * attempt * 1_250);
      await new Promise((resolve) => setTimeout(resolve, delay));
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw new Error(`${label} failed without an HTTP response`);
      await new Promise((resolve) => setTimeout(resolve, Math.min(12_000, attempt * attempt * 1_250)));
    }
  }
  if (lastResponse) return lastResponse;
  throw new Error(`${label} failed: ${lastError instanceof Error ? redact(lastError.message, token) : 'unknown error'}`);
}

async function requireJson(
  token: string,
  endpoint: string,
  init: RequestInit = {},
  label = endpoint,
): Promise<Record<string, any>> {
  const response = await eventbriteFetch(token, endpoint, init, label);
  if (!response.ok) {
    throw new Error(`${label} failed: HTTP ${response.status} ${await responseExcerpt(response, token)}`);
  }
  const body = await response.json().catch(() => null);
  if (!body || typeof body !== 'object') throw new Error(`${label} returned invalid JSON`);
  return body as Record<string, any>;
}

function fieldText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    const field = value as { text?: unknown; html?: unknown };
    if (typeof field.text === 'string') return field.text;
    if (typeof field.html === 'string') return field.html;
  }
  return '';
}

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function trustedEventbriteImage(url: string): boolean {
  return /^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url.replace(/&amp;/g, '&'));
}

function imageUrlFromTag(tag: string): string {
  return (/\bsrc=["']([^"']+)["']/i.exec(tag)?.[1] || '').replace(/&amp;/g, '&');
}

function jpegDimensions(bytes: Uint8Array, filename: string): { width: number; height: number } {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    throw new Error(`${filename} is not a JPEG`);
  }
  let offset = 2;
  while (offset + 8 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = bytes[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (offset + 2 > bytes.length) break;
    const length = (bytes[offset] << 8) | bytes[offset + 1];
    if (length < 2 || offset + length > bytes.length) break;
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      const height = (bytes[offset + 3] << 8) | bytes[offset + 4];
      const width = (bytes[offset + 5] << 8) | bytes[offset + 6];
      if (width > 0 && height > 0) return { width, height };
      break;
    }
    offset += length;
  }
  throw new Error(`Could not read JPEG dimensions for ${filename}`);
}

async function loadAssets(): Promise<LoadedAsset[]> {
  const base = path.resolve('public/images/events/generated');
  return Promise.all(ASSETS.map(async (asset) => {
    const assetPath = path.join(base, asset.filename);
    const buffer = await readFile(assetPath);
    if (buffer.length < 100_000 || buffer.length > 5_000_000) {
      throw new Error(`${asset.filename} has unsafe size ${buffer.length}`);
    }
    const { width, height } = jpegDimensions(buffer, asset.filename);
    if (width * asset.heightRatio !== height * asset.widthRatio) {
      throw new Error(`${asset.filename} has ${width}x${height}; expected ${asset.widthRatio}:${asset.heightRatio}`);
    }
    return { kind: asset.kind, filename: asset.filename, bytes: new Uint8Array(buffer), width, height };
  }));
}

async function uploadMedia(token: string, asset: LoadedAsset): Promise<EventbriteMedia> {
  const prepare = await eventbriteFetch(
    token,
    `/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } },
    `prepare media ${asset.filename}`,
  );
  if (!prepare.ok) {
    throw new Error(`prepare media ${asset.filename} failed: HTTP ${prepare.status} ${await responseExcerpt(prepare, token)}`);
  }
  const upload = await prepare.json().catch(() => null);
  if (!upload?.upload_url || !upload?.upload_token) throw new Error(`prepare media ${asset.filename} returned incomplete data`);

  const form = new FormData();
  for (const [key, value] of Object.entries(upload.upload_data || {})) form.append(key, String(value ?? ''));
  const arrayBuffer = asset.bytes.buffer.slice(
    asset.bytes.byteOffset,
    asset.bytes.byteOffset + asset.bytes.byteLength,
  ) as ArrayBuffer;
  form.append(upload.file_parameter_name || 'file', new Blob([arrayBuffer], { type: 'image/jpeg' }), asset.filename);
  const uploaded = await fetch(String(upload.upload_url), { method: 'POST', body: form });
  if (!uploaded.ok) throw new Error(`upload media ${asset.filename} failed: HTTP ${uploaded.status}`);

  const finalized = await eventbriteFetch(
    token,
    '/media/upload/',
    { method: 'POST', body: JSON.stringify({ upload_token: upload.upload_token }) },
    `finalize media ${asset.filename}`,
  );
  if (!finalized.ok) {
    throw new Error(`finalize media ${asset.filename} failed: HTTP ${finalized.status} ${await responseExcerpt(finalized, token)}`);
  }
  const media = await finalized.json().catch(() => null);
  const url = String(media?.original?.url || media?.url || '').replace(/&amp;/g, '&');
  if (!media?.id || !trustedEventbriteImage(url)) throw new Error(`finalize media ${asset.filename} returned an untrusted result`);
  return { id: String(media.id), url };
}

async function fetchSnapshot(token: string): Promise<Snapshot> {
  const [event, ticketBuyerSettings, musicProperties] = await Promise.all([
    requireJson(
      token,
      `/events/${EVENT_ID}/?expand=ticket_classes,venue,logo,music_properties`,
      {},
      'pilot event preflight',
    ),
    requireJson(token, `/events/${EVENT_ID}/ticket_buyer_settings/`, {}, 'pilot ticket buyer settings preflight'),
    requireJson(token, `/events/${EVENT_ID}/music_properties/`, {}, 'pilot music properties preflight'),
  ]);
  const eventId = String(event.id || '');
  const status = String(event.status || '');
  const startUtc = String(event.start?.utc || '');
  const endUtc = String(event.end?.utc || '');
  const venueId = String(event.venue_id || event.venue?.id || '');
  const html = String(event.description?.html || '');
  const markerCount = (html.match(new RegExp(EXPECTED_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const failures = [
    eventId === EVENT_ID ? '' : `event id is ${eventId || 'missing'}`,
    ['live', 'started'].includes(status) ? '' : `status is ${status || 'missing'}`,
    startUtc === GUE_JUST_ME_START_UTC ? '' : `start is ${startUtc || 'missing'}`,
    endUtc === GUE_JUST_ME_END_UTC ? '' : `end is ${endUtc || 'missing'}`,
    markerCount === 1 ? '' : `marker occurrence count is ${markerCount}`,
    venueId === EXPECTED_VENUE_ID ? '' : `venue id is ${venueId || 'missing'}`,
  ].filter(Boolean);
  if (failures.length > 0) throw new Error(`Preflight refused the Eventbrite update: ${failures.join('; ')}`);
  return {
    capturedAt: new Date().toISOString(),
    target: { eventId, marker: EXPECTED_MARKER, startUtc, endUtc, venueId },
    event,
    ticketBuyerSettings,
    musicProperties,
  };
}

function ticketDescription(ticket: Record<string, any>): string {
  return fieldText(ticket.description);
}

function ticketCurrent(ticket: Record<string, any>, payload: GueEventbriteLocalePayload): boolean {
  return String(ticket.name || '') === payload.ticketName
    && ticketDescription(ticket) === payload.ticketDescription;
}

function ticketInvariant(ticket: Record<string, any>): Record<string, unknown> {
  return {
    id: String(ticket.id || ''),
    free: ticket.free,
    minimumQuantity: ticket.minimum_quantity,
    maximumQuantity: ticket.maximum_quantity,
  };
}

function ticketInvariantMatches(ticket: Record<string, any>, expected: Record<string, unknown>): boolean {
  const observed = ticketInvariant(ticket);
  return Object.entries(expected).every(([key, value]) => observed[key] === value);
}

async function updateTicketClass(
  token: string,
  ticket: Record<string, any>,
  payload: GueEventbriteLocalePayload,
): Promise<'already-current' | 'updated'> {
  if (ticketCurrent(ticket, payload)) return 'already-current';
  const ticketId = String(ticket.id || '');
  if (!/^\d+$/.test(ticketId)) throw new Error('Existing Eventbrite ticket class has no safe numeric id');
  const response = await eventbriteFetch(
    token,
    `/events/${EVENT_ID}/ticket_classes/${ticketId}/`,
    {
      method: 'POST',
      body: JSON.stringify({ ticket_class: { name: payload.ticketName, description: payload.ticketDescription } }),
    },
    'pilot ticket class update',
  );
  if (!response.ok) {
    const unsupported = [404, 405, 501].includes(response.status) ? ' (endpoint not supported)' : '';
    throw new Error(`pilot ticket class update failed${unsupported}: HTTP ${response.status} ${await responseExcerpt(response, token)}`);
  }
  return 'updated';
}

async function updateEvent(
  token: string,
  payload: GueEventbriteLocalePayload,
  cover: EventbriteMedia,
): Promise<void> {
  const response = await eventbriteFetch(
    token,
    `/events/${EVENT_ID}/`,
    {
      method: 'POST',
      body: JSON.stringify({
        event: {
          name: { html: payload.title },
          summary: payload.summary,
          description: { html: payload.descriptionHtml },
          logo_id: cover.id,
          venue_id: EXPECTED_VENUE_ID,
        },
      }),
    },
    'pilot event update',
  );
  if (!response.ok) throw new Error(`pilot event update failed: HTTP ${response.status} ${await responseExcerpt(response, token)}`);
}

async function updateConfirmations(token: string, payload: GueEventbriteLocalePayload): Promise<void> {
  const response = await eventbriteFetch(
    token,
    `/events/${EVENT_ID}/ticket_buyer_settings/`,
    {
      method: 'POST',
      body: JSON.stringify({
        ticket_buyer_settings: {
          confirmation_message: { html: payload.orderConfirmation },
          instructions: { html: payload.orderConfirmation },
        },
      }),
    },
    'pilot confirmation update',
  );
  if (!response.ok) throw new Error(`pilot confirmation update failed: HTTP ${response.status} ${await responseExcerpt(response, token)}`);
}

async function updateMusicProperties(token: string): Promise<void> {
  const response = await eventbriteFetch(
    token,
    `/events/${EVENT_ID}/music_properties/`,
    {
      method: 'POST',
      body: JSON.stringify({
        music_properties: { age_restriction: '21+', door_time: GUE_JUST_ME_START_UTC },
      }),
    },
    'pilot music properties update',
  );
  if (!response.ok) throw new Error(`pilot music properties update failed: HTTP ${response.status} ${await responseExcerpt(response, token)}`);
}

function snapshotHtml(value: unknown, label: string, allowEmpty = false): string {
  const html = value && typeof value === 'object' && typeof (value as { html?: unknown }).html === 'string'
    ? String((value as { html: string }).html)
    : null;
  if (html === null || (!allowEmpty && !html)) throw new Error(`Rollback snapshot has no safe ${label} HTML field`);
  return html;
}

function snapshotFieldText(value: unknown, label: string): string {
  const text = fieldText(value);
  if (!text) throw new Error(`Rollback snapshot has no safe ${label}`);
  return text;
}

function snapshotLogoId(event: Record<string, any>): string {
  const logoId = String(event.logo_id || event.logo?.id || '');
  if (!/^\d+$/.test(logoId)) throw new Error('Rollback snapshot has no safe numeric logo id');
  return logoId;
}

function snapshotVenueId(event: Record<string, any>): string {
  const venueId = String(event.venue_id || event.venue?.id || '');
  if (!/^\d+$/.test(venueId)) throw new Error('Rollback snapshot has no safe numeric venue id');
  return venueId;
}

function snapshotTicket(snapshot: Snapshot): Record<string, any> {
  const tickets = Array.isArray(snapshot.event.ticket_classes)
    ? snapshot.event.ticket_classes as Record<string, any>[]
    : [];
  if (tickets.length !== 1) throw new Error(`Rollback snapshot must contain exactly one ticket class, found ${tickets.length}`);
  const ticket = tickets[0];
  if (!/^\d+$/.test(String(ticket.id || ''))) throw new Error('Rollback snapshot ticket class has no safe numeric id');
  if (!String(ticket.name || '') || !ticketDescription(ticket)) throw new Error('Rollback snapshot ticket class is incomplete');
  return ticket;
}

function assertRollbackSnapshot(snapshot: Snapshot): void {
  if (snapshot.target?.eventId !== EVENT_ID
    || snapshot.target?.marker !== EXPECTED_MARKER
    || snapshot.target?.startUtc !== GUE_JUST_ME_START_UTC
    || snapshot.target?.endUtc !== GUE_JUST_ME_END_UTC
    || snapshot.target?.venueId !== EXPECTED_VENUE_ID) {
    throw new Error('Rollback snapshot target does not match the immutable English pilot');
  }
  const event = snapshot.event as Record<string, any>;
  snapshotFieldText(event.name, 'event name');
  snapshotFieldText(event.summary, 'event summary');
  snapshotHtml(event.description, 'event description');
  snapshotLogoId(event);
  snapshotVenueId(event);
  snapshotTicket(snapshot);
  const settings = snapshot.ticketBuyerSettings as Record<string, any>;
  snapshotHtml(settings.confirmation_message, 'confirmation message', true);
  snapshotHtml(settings.instructions, 'instructions', true);
  const music = snapshot.musicProperties as Record<string, any>;
  if (typeof music.age_restriction !== 'string' || typeof music.door_time !== 'string') {
    throw new Error('Rollback snapshot music properties are incomplete');
  }
}

async function readRollbackSnapshot(): Promise<Snapshot> {
  const raw = await readFile(ROLLBACK_PATH, 'utf8');
  const parsed = JSON.parse(raw) as Snapshot;
  assertRollbackSnapshot(parsed);
  return parsed;
}

function rollbackEventPayload(snapshot: Snapshot): Record<string, unknown> {
  const event = snapshot.event as Record<string, any>;
  return {
    name: { html: snapshotFieldText(event.name, 'event name') },
    summary: snapshotFieldText(event.summary, 'event summary'),
    description: { html: snapshotHtml(event.description, 'event description') },
    logo_id: snapshotLogoId(event),
    venue_id: snapshotVenueId(event),
  };
}

function rollbackChecks(
  event: Record<string, any>,
  settings: Record<string, any>,
  music: Record<string, any>,
  snapshot: Snapshot,
): Record<string, boolean> {
  const expectedEvent = snapshot.event as Record<string, any>;
  const expectedSettings = snapshot.ticketBuyerSettings as Record<string, any>;
  const expectedMusic = snapshot.musicProperties as Record<string, any>;
  const expectedTicket = snapshotTicket(snapshot);
  const tickets = Array.isArray(event.ticket_classes) ? event.ticket_classes as Record<string, any>[] : [];
  return {
    eventIdExact: String(event.id || '') === EVENT_ID,
    nameRestored: fieldText(event.name) === snapshotFieldText(expectedEvent.name, 'event name'),
    summaryRestored: fieldText(event.summary) === snapshotFieldText(expectedEvent.summary, 'event summary'),
    descriptionRestored: String(event.description?.html || '') === snapshotHtml(expectedEvent.description, 'event description'),
    logoRestored: String(event.logo_id || event.logo?.id || '') === snapshotLogoId(expectedEvent),
    venueRestored: String(event.venue_id || event.venue?.id || '') === snapshotVenueId(expectedEvent),
    ticketRestored: tickets.length === 1
      && String(tickets[0].name || '') === String(expectedTicket.name || '')
      && ticketDescription(tickets[0]) === ticketDescription(expectedTicket)
      && ticketInvariantMatches(tickets[0], ticketInvariant(expectedTicket)),
    confirmationMessageRestored: String(settings.confirmation_message?.html || '')
      === snapshotHtml(expectedSettings.confirmation_message, 'confirmation message', true),
    instructionsRestored: String(settings.instructions?.html || '')
      === snapshotHtml(expectedSettings.instructions, 'instructions', true),
    ageRestrictionRestored: String(music.age_restriction || '') === String(expectedMusic.age_restriction),
    doorTimeRestored: String(music.door_time || '') === String(expectedMusic.door_time),
  };
}

async function restoreSnapshot(token: string, snapshot: Snapshot, source: 'automatic' | 'manual'): Promise<void> {
  assertRollbackSnapshot(snapshot);
  const event = snapshot.event as Record<string, any>;
  const settings = snapshot.ticketBuyerSettings as Record<string, any>;
  const music = snapshot.musicProperties as Record<string, any>;
  const ticket = snapshotTicket(snapshot);

  const eventResponse = await eventbriteFetch(token, `/events/${EVENT_ID}/`, {
    method: 'POST', body: JSON.stringify({ event: rollbackEventPayload(snapshot) }),
  }, `${source} rollback event`);
  if (!eventResponse.ok) throw new Error(`${source} rollback event failed: HTTP ${eventResponse.status} ${await responseExcerpt(eventResponse, token)}`);

  const ticketResponse = await eventbriteFetch(token, `/events/${EVENT_ID}/ticket_classes/${ticket.id}/`, {
    method: 'POST',
    body: JSON.stringify({ ticket_class: { name: ticket.name, description: ticketDescription(ticket) } }),
  }, `${source} rollback ticket class`);
  if (!ticketResponse.ok) throw new Error(`${source} rollback ticket class failed: HTTP ${ticketResponse.status} ${await responseExcerpt(ticketResponse, token)}`);

  const settingsResponse = await eventbriteFetch(token, `/events/${EVENT_ID}/ticket_buyer_settings/`, {
    method: 'POST',
    body: JSON.stringify({ ticket_buyer_settings: {
      confirmation_message: { html: snapshotHtml(settings.confirmation_message, 'confirmation message', true) },
      instructions: { html: snapshotHtml(settings.instructions, 'instructions', true) },
    } }),
  }, `${source} rollback ticket buyer settings`);
  if (!settingsResponse.ok) throw new Error(`${source} rollback ticket buyer settings failed: HTTP ${settingsResponse.status} ${await responseExcerpt(settingsResponse, token)}`);

  const musicResponse = await eventbriteFetch(token, `/events/${EVENT_ID}/music_properties/`, {
    method: 'POST',
    body: JSON.stringify({ music_properties: {
      age_restriction: music.age_restriction,
      door_time: music.door_time,
    } }),
  }, `${source} rollback music properties`);
  if (!musicResponse.ok) throw new Error(`${source} rollback music properties failed: HTTP ${musicResponse.status} ${await responseExcerpt(musicResponse, token)}`);

  const [restoredEvent, restoredSettings, restoredMusic] = await Promise.all([
    requireJson(token, `/events/${EVENT_ID}/?expand=ticket_classes,venue,logo,music_properties`, {}, `${source} rollback event readback`),
    requireJson(token, `/events/${EVENT_ID}/ticket_buyer_settings/`, {}, `${source} rollback settings readback`),
    requireJson(token, `/events/${EVENT_ID}/music_properties/`, {}, `${source} rollback music readback`),
  ]);
  const checks = rollbackChecks(restoredEvent, restoredSettings, restoredMusic, snapshot);
  const failedChecks = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  const artifact = {
    rolledBackAt: new Date().toISOString(), source, ok: failedChecks.length === 0,
    target: snapshot.target, checks, failedChecks,
    event: restoredEvent, ticketBuyerSettings: restoredSettings, musicProperties: restoredMusic,
  };
  await writeFile(ROLLBACK_RESULT_PATH, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
  if (failedChecks.length > 0) throw new Error(`${source} rollback readback rejected: ${failedChecks.join(', ')}`);
}

async function attemptAutomaticRollback(token: string, snapshot: Snapshot): Promise<{ ok: boolean; error?: string }> {
  try {
    await restoreSnapshot(token, snapshot, 'automatic');
    return { ok: true };
  } catch (error) {
    const message = redact(error instanceof Error ? error.message : String(error), token);
    await writeFile(ROLLBACK_RESULT_PATH, `${JSON.stringify({
      rolledBackAt: new Date().toISOString(),
      source: 'automatic',
      ok: false,
      target: snapshot.target,
      error: message,
    }, null, 2)}\n`, 'utf8').catch(() => undefined);
    return { ok: false, error: message };
  }
}

function confirmationComplete(html: string): boolean {
  const visible = decodeHtml(html);
  return html.includes(GUE_JUST_ME_AFFILIATE_URL)
    && visible.includes(GUE_JUST_ME_PHONE)
    && /not an admission ticket/i.test(visible)
    && /purchase confirmation/i.test(visible)
    && visible.includes('Guè Pequeno')
    && visible.includes('19:30');
}

function coverMatches(event: Record<string, any>, cover: EventbriteMedia): boolean {
  if (String(event.logo_id || event.logo?.id || '') === cover.id) return true;
  const observed = String(event.logo?.original?.url || event.logo?.url || '').replace(/&amp;/g, '&');
  if (!observed || !trustedEventbriteImage(observed)) return false;
  try {
    return new URL(observed).pathname === new URL(cover.url).pathname;
  } catch {
    return false;
  }
}

function bulletContactsComplete(html: string): boolean {
  const contacts = html.search(/<h2[^>]*>\s*Tickets, tables and contacts\s*<\/h2>/i);
  if (contacts < 0) return false;
  const posterOffset = html.slice(contacts).search(/<img\b/i);
  if (posterOffset < 0) return false;
  const segment = html.slice(contacts, contacts + posterOffset);
  return /<ul\b[^>]*data-contact-list=["']true["'][^>]*>/i.test(segment)
    && (segment.match(/<li\b/gi) || []).length >= 5;
}

function buildReadbackChecks(
  event: Record<string, any>,
  settings: Record<string, any>,
  music: Record<string, any>,
  payload: GueEventbriteLocalePayload,
  media: readonly EventbriteMedia[],
  preflightTicket: Record<string, unknown>,
): Record<string, boolean> {
  const html = String(event.description?.html || '');
  const visible = decodeHtml(html);
  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const imageUrls = imageTags.map(imageUrlFromTag);
  const expectedBodyUrls = media.slice(1).map((item) => item.url);
  const tickets = Array.isArray(event.ticket_classes) ? event.ticket_classes as Record<string, any>[] : [];
  const markerCount = (html.match(new RegExp(EXPECTED_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  return {
    eventIdExact: String(event.id || '') === EVENT_ID,
    statusLiveOrStarted: ['live', 'started'].includes(String(event.status || '')),
    startExact: String(event.start?.utc || '') === GUE_JUST_ME_START_UTC,
    endExact: String(event.end?.utc || '') === GUE_JUST_ME_END_UTC,
    venueExact: String(event.venue_id || event.venue?.id || '') === EXPECTED_VENUE_ID,
    titleExact: fieldText(event.name) === payload.title,
    summaryExact: fieldText(event.summary) === payload.summary,
    markerExact: markerCount === 1,
    affiliateExact: html.includes(GUE_JUST_ME_AFFILIATE_URL),
    bulletContacts: bulletContactsComplete(html),
    bodyImagesExactCount: imageTags.length === 5,
    bodyImagesTrustedCdn: imageUrls.length === 5 && imageUrls.every(trustedEventbriteImage),
    bodyImagesExactOrder: imageUrls.length === 5 && imageUrls.every((url, index) => url === expectedBodyUrls[index]),
    bodyImagesResponsive: imageTags.length === 5 && imageTags.every((tag) => /style=["'][^"']*width:\s*100%[^"']*max-width:\s*100%[^"']*height:\s*auto[^"']*["']/i.test(tag)),
    faqCountExact: (html.match(/data-event-faq=["']true["']/gi) || []).length === 25,
    seoClosingPresent: /Guè Pequeno live in Milan:\s*tickets, nightlife and VIP tables/i.test(visible),
    ageInBody: visible.includes('21+'),
    programmeTimesInBody: ['19:30', '22:30', '05:00'].every((time) => visible.includes(time)),
    addressInBody: visible.includes(GUE_JUST_ME_ADDRESS),
    coverPresentAndExact: coverMatches(event, media[0]),
    ticketClassCurrent: tickets.length === 1 && ticketCurrent(tickets[0], payload),
    ticketInvariantPreserved: tickets.length === 1 && ticketInvariantMatches(tickets[0], preflightTicket),
    confirmationMessageCurrent: confirmationComplete(String(settings.confirmation_message?.html || '')),
    instructionsCurrent: confirmationComplete(String(settings.instructions?.html || '')),
    ageRestrictionCurrent: /21\+/.test(String(music.age_restriction || '')),
    doorTimeCurrent: String(music.door_time || '') === GUE_JUST_ME_START_UTC,
  };
}

async function finalReadback(
  token: string,
  payload: GueEventbriteLocalePayload,
  media: readonly EventbriteMedia[],
  ticketUpdate: string,
  preflightTicket: Record<string, unknown>,
): Promise<void> {
  const [event, settings, music] = await Promise.all([
    requireJson(token, `/events/${EVENT_ID}/?expand=ticket_classes,venue,logo,music_properties`, {}, 'pilot event readback'),
    requireJson(token, `/events/${EVENT_ID}/ticket_buyer_settings/`, {}, 'pilot confirmation readback'),
    requireJson(token, `/events/${EVENT_ID}/music_properties/`, {}, 'pilot music readback'),
  ]);
  const checks = buildReadbackChecks(event, settings, music, payload, media, preflightTicket);
  const failedChecks = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  const artifact = {
    checkedAt: new Date().toISOString(),
    ok: failedChecks.length === 0,
    target: { eventId: EVENT_ID, marker: EXPECTED_MARKER },
    expected: {
      title: payload.title,
      summary: payload.summary,
      startUtc: GUE_JUST_ME_START_UTC,
      endUtc: GUE_JUST_ME_END_UTC,
      venueId: EXPECTED_VENUE_ID,
      bodyImages: 5,
      faqs: 25,
      affiliateUrl: GUE_JUST_ME_AFFILIATE_URL,
      ticketInvariant: preflightTicket,
    },
    uploadedMedia: media,
    ticketUpdate,
    checks,
    failedChecks,
    event,
    ticketBuyerSettings: settings,
    musicProperties: music,
  };
  await writeFile(READBACK_PATH, `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
  if (failedChecks.length > 0) throw new Error(`Fail-closed readback rejected the pilot: ${failedChecks.join(', ')}`);
}

async function main(): Promise<void> {
  const mode = parseRunMode();
  loadEnvConfig(process.cwd());
  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN is not configured');
  await mkdir(OUTPUT_DIR, { recursive: true });

  if (mode === 'rollback') {
    const snapshot = await readRollbackSnapshot();
    await restoreSnapshot(token, snapshot, 'manual');
    console.log(JSON.stringify({
      ok: true,
      eventId: EVENT_ID,
      rollback: ROLLBACK_PATH,
      rollbackReadback: ROLLBACK_RESULT_PATH,
      checks: 'all restored fields passed',
    }, null, 2));
    return;
  }

  const uploadedMedia: EventbriteMedia[] = [];
  let rollbackSaved = false;
  let eventMutationStarted = false;
  let snapshot: Snapshot | null = null;
  try {
    snapshot = await fetchSnapshot(token);
    const existingTickets = Array.isArray(snapshot.event.ticket_classes)
      ? snapshot.event.ticket_classes as Record<string, any>[]
      : [];
    if (existingTickets.length !== 1) {
      throw new Error(`Preflight refused the Eventbrite update: expected one ticket class, found ${existingTickets.length}`);
    }
    const preflightTicket = ticketInvariant(existingTickets[0]);
    if (!/^\d+$/.test(String(preflightTicket.id || ''))) {
      throw new Error('Preflight refused the Eventbrite update: existing ticket class has no safe numeric id');
    }

    // Persist rollback evidence as soon as identity, status, marker, date and
    // venue gates have passed, before any upload or mutation is attempted.
    await writeFile(ROLLBACK_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
    rollbackSaved = true;

    const assets = await loadAssets();
    const initialPayload = buildGueEventbriteLocalePayloads('en')[0];
    if (initialPayload.marker !== EXPECTED_MARKER) throw new Error('Local English pilot marker does not match the live target');

    for (const asset of assets) uploadedMedia.push(await uploadMedia(token, asset));
    const urls = uploadedMedia.map((media) => media.url) as [string, string, string, string, string, string];
    const payload = buildGueEventbriteLocalePayloads('en', urls)[0];
    validateGueEventbriteLocalePayload(payload, true);
    if (payload.marker !== EXPECTED_MARKER) throw new Error('CDN-backed English pilot marker does not match the live target');

    // From this point an accepted ticket update or an event POST may already
    // have changed the live listing even if a later response is lost.
    eventMutationStarted = true;
    const ticketUpdate = await updateTicketClass(token, existingTickets[0], payload);
    await updateEvent(token, payload, uploadedMedia[0]);
    await updateConfirmations(token, payload);
    await updateMusicProperties(token);
    await finalReadback(token, payload, uploadedMedia, ticketUpdate, preflightTicket);

    console.log(JSON.stringify({
      ok: true,
      eventId: EVENT_ID,
      rollback: ROLLBACK_PATH,
      readback: READBACK_PATH,
      checks: 'all passed',
    }, null, 2));
  } catch (error) {
    const message = redact(error instanceof Error ? error.message : String(error), token);
    const automaticRollback = rollbackSaved && eventMutationStarted && snapshot
      ? await attemptAutomaticRollback(token, snapshot)
      : null;
    await writeFile(FAILURE_PATH, `${JSON.stringify({
      failedAt: new Date().toISOString(),
      ok: false,
      eventId: EVENT_ID,
      rollbackSaved,
      rollbackPath: rollbackSaved ? ROLLBACK_PATH : null,
      eventMutationStarted,
      uploadedMedia,
      automaticRollback,
      error: message,
    }, null, 2)}\n`, 'utf8').catch(() => undefined);
    const rollbackSummary = automaticRollback
      ? ` Automatic rollback ${automaticRollback.ok ? 'succeeded' : `failed: ${automaticRollback.error || 'unknown error'}`}. Evidence: ${ROLLBACK_RESULT_PATH}`
      : '';
    throw new Error(`${message}. Failure evidence: ${FAILURE_PATH}${rollbackSaved ? `. Rollback snapshot: ${ROLLBACK_PATH}` : ''}${rollbackSummary}`);
  }
}

if (process.env.UPDATE_GUE_PILOT_IMPORT_ONLY !== '1') void main();
