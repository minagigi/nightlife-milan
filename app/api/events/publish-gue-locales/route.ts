import { NextResponse } from 'next/server';
import { BlobPreconditionFailedError, del, get, put } from '@vercel/blob';
import { createHash, randomUUID } from 'node:crypto';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { getEventbriteConfirmationPlainText } from '@/lib/eventbriteConfirmation';
import { eventbriteVenueMatches, publishOneLang, sleep } from '@/lib/eventPublisher';
import { normalizedTextIncludes } from '@/lib/eventTextVerification';
import { getEventLocalePack } from '@/lib/eventLocalePacks';
import { enabledLocaleCodes, isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';
import {
  buildGueEventbriteLocalePayloads,
  getGueEventbriteRequiredLead,
  validateGueEventbriteLocalePayload,
  type GueEventbriteLocalePayload,
} from '@/lib/gueEventbriteLocales';
import { getGueJustMeLocalizedContent } from '@/lib/gueJustMeLocales';
import {
  GUE_JUST_ME_AFFILIATE_URL,
  GUE_JUST_ME_ADDRESS,
  GUE_JUST_ME_EVENTBRITE_NAMES,
  GUE_JUST_ME_PHONE,
  GUE_JUST_ME_SITE,
  getGueJustMeEventbriteMediaRevision,
} from '@/lib/gueJustMe';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const START_UTC = '2026-07-25T17:30:00Z';
const END_UTC = '2026-07-26T03:00:00Z';
const JUST_ME_EVENTBRITE_VENUE_ID = '295950971';
const GUE_ENGLISH_PILOT_EVENT_ID = '1994392210790';
const ROLLOUT_LEASE_MS = 6 * 60 * 1000;
const REQUEST_DEADLINE_MS = 4 * 60 * 1000;
const FULL_AUDIT_MAX_CHUNK = 20;
const FULL_DEEP_AUDIT_MAX_CHUNK = 5;
const PUBLISHABLE_LOCALES = enabledLocaleCodes;
const JUST_ME_EVENTBRITE_VENUE = {
  name: 'Just Me',
  street: 'Viale Luigi Camoens, 2',
  postalCode: '20121',
} as const;

interface EventbriteMedia {
  id: string;
  url: string;
}

interface ExistingEvent {
  id: string;
  status?: string;
  name?: { text?: string };
  start?: { utc?: string };
  end?: { utc?: string };
  description?: { html?: string };
  venue_id?: string;
  venue?: { id?: string };
}

interface FullAuditExpectedMarker {
  marker: string;
  locale: LocaleCode;
  variant: GueEventbriteLocalePayload['variant'];
  title: string;
  startUtc: string;
}

interface StoredMediaManifest {
  urls: [string, string, string, string, string, string];
  coverId: string;
  createdAt: string;
}

interface PublishBody {
  locale?: string;
  max?: number;
  fromVariant?: number;
  mediaManifest?: {
    entries?: unknown;
    coverId?: unknown;
  };
}

interface RolloutLease {
  release: () => Promise<void>;
}

interface StoredLease {
  owner: string;
  expiresAt: string;
}

type SuppliedMediaManifest = Pick<StoredMediaManifest, 'urls' | 'coverId'> & {
  entries: [EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia];
};

/**
 * The existing-live path changes four independent Eventbrite resources. Keep a
 * narrow snapshot of precisely the fields we mutate so a failed confirmation,
 * music-property or final readback cannot leave a half-refreshed pilot live.
 */
interface LiveRefreshSnapshot {
  event: {
    nameHtml: string;
    nameText: string;
    summary: string;
    descriptionHtml: string;
    logoId: string;
    venueId: string;
  };
  ticket: {
    id: string;
    name: string;
    description: string;
  };
  settings: {
    confirmationMessageHtml: string;
    instructionsHtml: string;
  };
  music: {
    ageRestriction: string | null;
    doorTime: string | null;
  };
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

function isAuthorized(request: Request): boolean {
  const bearer = request.headers.get('authorization');
  return Boolean(
    (process.env.CRON_SECRET && bearer === `Bearer ${process.env.CRON_SECRET}`)
      || (process.env.GUE_PUBLISH_SECRET && bearer === `Bearer ${process.env.GUE_PUBLISH_SECRET}`)
      || (process.env.GUE_ROLLOUT_SECRET && bearer === `Bearer ${process.env.GUE_ROLLOUT_SECRET}`),
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function decodeHtmlText(value: string): string {
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

function normalizedVisibleExact(value: string): string {
  return decodeHtmlText(value).normalize('NFC').replace(/\s+/g, ' ').trim();
}

/**
 * Eventbrite is allowed to rewrite harmless markup (for example by removing a
 * data attribute).  A rollback must still be exact in the ways that affect a
 * buyer: visible copy and the ordered destinations/media must be unchanged.
 * Do not use this for the forward publish gate: that remains deliberately
 * stricter about the curated marker, image labels and responsive styling.
 */
function orderedHtmlUrls(html: string, attributes: readonly ('href' | 'src')[]): string[] {
  const allowed = new Set(attributes);
  const urls: string[] = [];
  for (const match of html.matchAll(/\b(href|src)\s*=\s*(["'])(.*?)\2/gi)) {
    if (allowed.has(match[1].toLowerCase() as 'href' | 'src')) {
      urls.push(decodeHtmlText(match[3]).replace(/&amp;/gi, '&'));
    }
  }
  return urls;
}

function rollbackHtmlSemantics(html: string, attributes: readonly ('href' | 'src')[]) {
  return {
    visibleText: decodeHtmlText(html),
    urls: orderedHtmlUrls(html, attributes),
  };
}

function semanticallyEqualLiveRefreshSnapshot(expected: LiveRefreshSnapshot, current: LiveRefreshSnapshot): boolean {
  const eventExact = expected.event.nameText === current.event.nameText
    && expected.event.summary === current.event.summary
    && expected.event.logoId === current.event.logoId
    && expected.event.venueId === current.event.venueId;
  const ticketExact = expected.ticket.id === current.ticket.id
    && expected.ticket.name === current.ticket.name
    && expected.ticket.description === current.ticket.description;
  const musicExact = expected.music.ageRestriction === current.music.ageRestriction
    && expected.music.doorTime === current.music.doorTime;
  const descriptionExact = JSON.stringify(rollbackHtmlSemantics(expected.event.descriptionHtml, ['href', 'src']))
    === JSON.stringify(rollbackHtmlSemantics(current.event.descriptionHtml, ['href', 'src']));
  const confirmationsExact = JSON.stringify(rollbackHtmlSemantics(expected.settings.confirmationMessageHtml, ['href']))
    === JSON.stringify(rollbackHtmlSemantics(current.settings.confirmationMessageHtml, ['href']))
    && JSON.stringify(rollbackHtmlSemantics(expected.settings.instructionsHtml, ['href']))
      === JSON.stringify(rollbackHtmlSemantics(current.settings.instructionsHtml, ['href']));
  return eventExact && ticketExact && musicExact && descriptionExact && confirmationsExact;
}

function trustedEventbriteImage(url: string): boolean {
  return /^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url.replace(/&amp;/g, '&'));
}

/**
 * Accept only the exact six-image pilot manifest returned by Eventbrite's own
 * media ingress. It deliberately cannot carry arbitrary image hosts, a
 * variable number of assets, or a non-Eventbrite cover id.
 */
function parseSuppliedMediaManifestForTest(value: PublishBody['mediaManifest']): SuppliedMediaManifest | null {
  if (!value || !Array.isArray(value.entries) || value.entries.length !== 6 || !/^\d+$/.test(String(value.coverId || ''))) {
    return null;
  }
  const entries = value.entries.map((entry) => {
    if (!entry || typeof entry !== 'object') return null;
    const candidate = entry as { id?: unknown; url?: unknown };
    const id = String(candidate.id || '');
    const url = typeof candidate.url === 'string' ? candidate.url.replace(/&amp;/g, '&') : '';
    return /^\d+$/.test(id) && trustedEventbriteImage(url) ? { id, url } : null;
  });
  if (entries.some((entry) => !entry) || new Set(entries.map((entry) => entry!.url)).size !== 6) return null;
  const safeEntries = entries as EventbriteMedia[];
  if (safeEntries[0].id !== String(value.coverId)) return null;
  return {
    entries: safeEntries as SuppliedMediaManifest['entries'],
    urls: safeEntries.map((entry) => entry.url) as StoredMediaManifest['urls'],
    coverId: safeEntries[0].id,
  };
}

function assertEnglishPilotIdentityForTest(event: ExistingEvent, payload: GueEventbriteLocalePayload): void {
  const venueId = String(event.venue_id || event.venue?.id || '');
  const hasMarker = String(event.description?.html || '').includes(`<!-- ${payload.marker} -->`);
  if (String(event.id) !== GUE_ENGLISH_PILOT_EVENT_ID
    || event.status !== 'live'
    || !hasMarker
    || venueId !== JUST_ME_EVENTBRITE_VENUE_ID
    || event.start?.utc !== START_UTC
    || event.end?.utc !== END_UTC
  ) {
    throw new Error('English pilot safety gate failed: expected exact live event, marker, venue and dates');
  }
}

function rolloutLockPath(locale: LocaleCode): string {
  return `publishing/gue-locales/${locale}.lock.json`;
}

async function readRolloutLease(locale: LocaleCode): Promise<{ record: StoredLease; etag: string } | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required for the Guè rollout lock');
  try {
    const result = await get(rolloutLockPath(locale), { access: 'private', token, useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200 || !result.stream) throw new Error('Unable to read the Guè rollout lock');
    const record = JSON.parse(await new Response(result.stream).text()) as Partial<StoredLease>;
    if (typeof record.owner !== 'string' || typeof record.expiresAt !== 'string') {
      throw new Error('Invalid Guè rollout lock');
    }
    return { record: record as StoredLease, etag: result.blob.etag };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404/i.test(message)) return null;
    throw error;
  }
}

async function createRolloutLease(locale: LocaleCode, record: StoredLease): Promise<void> {
  await put(rolloutLockPath(locale), JSON.stringify(record), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: 60,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

async function releaseRolloutLease(locale: LocaleCode, owner: string): Promise<void> {
  const current = await readRolloutLease(locale);
  if (!current || current.record.owner !== owner) return;
  try {
    await del(rolloutLockPath(locale), {
      ifMatch: current.etag,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (error) {
    if (!(error instanceof BlobPreconditionFailedError)) throw error;
  }
}

async function acquireRolloutLease(locale: LocaleCode): Promise<RolloutLease | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required for the Guè rollout lock');
  const owner = randomUUID();
  const record: StoredLease = {
    owner,
    expiresAt: new Date(Date.now() + ROLLOUT_LEASE_MS).toISOString(),
  };
  try {
    await createRolloutLease(locale, record);
  } catch (initialError) {
    const existing = await readRolloutLease(locale);
    if (!existing) {
      await createRolloutLease(locale, record);
    } else {
      const expiresAt = Date.parse(existing.record.expiresAt);
      if (!Number.isFinite(expiresAt)) throw new Error('Invalid Guè rollout lock expiry');
      if (expiresAt > Date.now()) return null;
      try {
        await del(rolloutLockPath(locale), { ifMatch: existing.etag, token });
      } catch (error) {
        if (error instanceof BlobPreconditionFailedError) return null;
        throw error;
      }
      try {
        await createRolloutLease(locale, record);
      } catch (error) {
        if (await readRolloutLease(locale)) return null;
        throw initialError;
      }
    }
  }
  return { release: () => releaseRolloutLease(locale, owner) };
}

async function eventbriteFetch(
  url: string,
  init: RequestInit,
  label: string,
  attempts = 4,
): Promise<Response> {
  let lastResponse: Response | undefined;
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      lastResponse = response;
      if (response.status !== 429 && response.status < 500) return response;
      if (attempt === attempts) return response;
      const retryAfter = Number(response.headers.get('retry-after'));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0
        ? Math.min(30_000, retryAfter * 1000)
        : Math.min(15_000, attempt * attempt * 1_500);
      await sleep(delay);
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw error;
      await sleep(Math.min(15_000, attempt * attempt * 1_500));
    }
  }
  if (lastResponse) return lastResponse;
  throw new Error(`${label} failed: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

async function fetchPublicJpeg(assetUrl: string, trustedOrigin = GUE_JUST_ME_SITE): Promise<Uint8Array> {
  const parsed = new URL(assetUrl);
  const allowedOrigin = new URL(trustedOrigin).origin;
  if (parsed.protocol !== 'https:' || parsed.origin !== allowedOrigin
    || !parsed.pathname.startsWith('/images/events/generated/')) {
    throw new Error(`Untrusted Guè asset URL: ${assetUrl}`);
  }
  const response = await fetch(assetUrl, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Asset fetch failed for ${parsed.pathname}: HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('image/jpeg')) throw new Error(`Asset ${parsed.pathname} is not a JPEG (${contentType})`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 100_000 || bytes.length > 5_000_000) {
    throw new Error(`Asset ${parsed.pathname} has an invalid size (${bytes.length})`);
  }
  return bytes;
}

async function uploadMedia(token: string, bytes: Uint8Array, filename: string): Promise<EventbriteMedia> {
  const infoRes = await eventbriteFetch(
    `${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } },
    `media preparation ${filename}`,
  );
  if (!infoRes.ok) throw new Error(`Media preparation failed for ${filename}: HTTP ${infoRes.status} ${(await infoRes.text()).slice(0, 200)}`);
  const info = await infoRes.json();
  let uploadRes: Response | undefined;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const form = new FormData();
    for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
    const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    form.append(info.file_parameter_name || 'file', new Blob([buffer], { type: 'image/jpeg' }), filename);
    uploadRes = await fetch(info.upload_url, { method: 'POST', body: form });
    if (uploadRes.ok || (uploadRes.status !== 429 && uploadRes.status < 500) || attempt === 3) break;
    await sleep(attempt * 2_000);
  }
  if (!uploadRes?.ok) throw new Error(`Media upload failed for ${filename}: HTTP ${uploadRes?.status || 0} ${uploadRes ? (await uploadRes.text()).slice(0, 200) : ''}`);

  const finalizeRes = await eventbriteFetch(
    `${EVENTBRITE_API}/media/upload/`,
    { method: 'POST', headers: authHeaders(token), body: JSON.stringify({ upload_token: info.upload_token }) },
    `media finalize ${filename}`,
  );
  if (!finalizeRes.ok) throw new Error(`Media finalize failed for ${filename}: HTTP ${finalizeRes.status} ${(await finalizeRes.text()).slice(0, 200)}`);
  const media = await finalizeRes.json();
  const url = String(media.original?.url || media.url || '').replace(/&amp;/g, '&');
  if (!media.id || !trustedEventbriteImage(url)) throw new Error(`Eventbrite media response is invalid for ${filename}`);
  return { id: String(media.id), url };
}

function mediaManifestPath(locale: LocaleCode): string {
  return `publishing/gue-locales/${locale}-${getGueJustMeEventbriteMediaRevision(locale)}.media.json`;
}

async function readMediaManifest(locale: LocaleCode): Promise<StoredMediaManifest | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required for the Guè media manifest');
  try {
    const result = await get(mediaManifestPath(locale), { access: 'private', token, useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const manifest = JSON.parse(await new Response(result.stream).text()) as Partial<StoredMediaManifest>;
    if (!Array.isArray(manifest.urls) || manifest.urls.length !== 6
      || manifest.urls.some((url) => typeof url !== 'string' || !trustedEventbriteImage(url))
      || typeof manifest.coverId !== 'string') return null;
    return manifest as StoredMediaManifest;
  } catch (error) {
    if (/not found|404/i.test(error instanceof Error ? error.message : String(error))) return null;
    throw error;
  }
}

async function writeMediaManifest(locale: LocaleCode, manifest: StoredMediaManifest): Promise<void> {
  await put(mediaManifestPath(locale), JSON.stringify(manifest), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

function exactGueMarkerMatches(marker: string, events: readonly ExistingEvent[]): ExistingEvent[] {
  const needle = `<!-- ${marker} -->`;
  return events.filter((event) => String(event.description?.html || '').includes(needle));
}

function stableEventIdCompare(left: ExistingEvent, right: ExistingEvent): number {
  const leftId = String(left.id || '');
  const rightId = String(right.id || '');
  return leftId.length - rightId.length || leftId.localeCompare(rightId, 'en');
}

function buildFullAuditCandidateSet(events: readonly ExistingEvent[]) {
  const candidates = events
    .filter((event) => event.start?.utc === START_UTC)
    .sort(stableEventIdCompare);
  const fingerprintInput = candidates.map((event) => ({
    id: String(event.id || ''),
    status: String(event.status || ''),
    title: String(event.name?.text || ''),
    startUtc: String(event.start?.utc || ''),
  }));
  return {
    candidates,
    fingerprint: createHash('sha256').update(JSON.stringify(fingerprintInput)).digest('hex'),
  };
}

function buildFullAuditExpectedMarkers(locales: readonly LocaleCode[]): FullAuditExpectedMarker[] {
  return locales.flatMap((locale) => buildGueEventbriteLocalePayloads(locale).map((payload) => ({
    marker: payload.marker,
    locale,
    variant: payload.variant,
    title: payload.title,
    startUtc: START_UTC,
  })));
}

function expectedMarkerFingerprint(expectedMarkers: readonly FullAuditExpectedMarker[]): string {
  return createHash('sha256').update(JSON.stringify(expectedMarkers)).digest('hex');
}

function buildFullAuditEventEvidence(
  events: readonly ExistingEvent[],
  expectedMarkers: readonly FullAuditExpectedMarker[],
  offset: number,
) {
  const expectedByMarker = new Map(expectedMarkers.map((expected) => [expected.marker, expected]));
  return events.map((event, index) => {
    const id = String(event.id || '');
    const title = String(event.name?.text || '');
    const startUtc = String(event.start?.utc || '');
    const status = String(event.status || '');
    const html = String(event.description?.html || '');
    const markerRows = [...html.matchAll(/<!-- (nlm:curated=gue-[a-z0-9-]+) -->/gi)].map((match, occurrenceIndex) => {
      const marker = match[1];
      const expected = expectedByMarker.get(marker);
      const currentLead = expected ? getGueEventbriteRequiredLead(expected.locale) : '';
      const visible = decodeHtmlText(html);
      const contentCurrent = Boolean(expected)
        && !/DJ Dero/i.test(visible)
        && (!currentLead || normalizedTextIncludes(visible, currentLead));
      return {
        occurrence: occurrenceIndex + 1,
        marker,
        expected: Boolean(expected),
        eventId: id,
        status,
        observedTitle: title,
        observedStartUtc: startUtc,
        expectedLocale: expected?.locale || null,
        expectedVariant: expected?.variant || null,
        expectedTitle: expected?.title || null,
        expectedStartUtc: expected?.startUtc || null,
        titleExact: Boolean(expected) && title === expected?.title,
        dateExact: Boolean(expected) && startUtc === expected?.startUtc,
        contentCurrent,
      };
    });
    return {
      candidateIndex: offset + index,
      id,
      status,
      title,
      startUtc,
      markerRows,
    };
  });
}

function gueCandidateStubs(
  payloads: readonly GueEventbriteLocalePayload[],
  events: readonly ExistingEvent[],
): ExistingEvent[] {
  const markers = new Set(payloads.map((payload) => `<!-- ${payload.marker} -->`));
  // Marker is the sole publication identity. Venue-list stubs often omit the
  // description, so hydrate the small exact date/venue cohort as a safe
  // fallback; never exclude a marker because somebody edited a title.
  return events.filter((event) => {
    const stubHtml = String(event.description?.html || '');
    if ([...markers].some((marker) => stubHtml.includes(marker))) return true;
    const venueId = String(event.venue_id || event.venue?.id || JUST_ME_EVENTBRITE_VENUE_ID);
    return event.start?.utc === START_UTC
      && event.end?.utc === END_UTC
      && venueId === JUST_ME_EVENTBRITE_VENUE_ID;
  });
}

async function hydrateExistingEvents(
  token: string,
  events: readonly ExistingEvent[],
): Promise<ExistingEvent[]> {
  const hydrated: ExistingEvent[] = [];
  // Keep concurrency deliberately small: the final audit reads ten listings at
  // a time, while publication normally reads just one exact title candidate.
  for (let offset = 0; offset < events.length; offset += 5) {
    const chunk = events.slice(offset, offset + 5);
    const details = await Promise.all(chunk.map(async (event) => {
      const response = await eventbriteFetch(
        `${EVENTBRITE_API}/events/${event.id}/?expand=venue`,
        { headers: authHeaders(token) },
        `hydrate Guè candidate ${event.id}`,
      );
      if (!response.ok) {
        throw new Error(`Could not hydrate Guè candidate ${event.id}: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
      }
      return await response.json() as ExistingEvent;
    }));
    hydrated.push(...details);
  }
  return hydrated;
}

async function listExistingEvents(token: string): Promise<ExistingEvent[]> {
  // Scope the safety inventory to the verified Just Me venue. The organization
  // contains thousands of unrelated historical drafts, while Eventbrite's
  // documented venue endpoint keeps every possible Guè candidate in scope.
  const base = `${EVENTBRITE_API}/venues/${JUST_ME_EVENTBRITE_VENUE_ID}/events/?status=live,draft,started&time_filter=current_future&order_by=start_desc&page_size=200`;
  const events: ExistingEvent[] = [];
  let continuation: string | undefined;
  for (let page = 0; page < 20; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await eventbriteFetch(url, { headers: authHeaders(token) }, `dedupe page ${page + 1}`);
    if (!response.ok) throw new Error(`Eventbrite dedupe lookup failed: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
    const body = await response.json();
    const pageEvents = (body.events || []) as ExistingEvent[];
    // The venue endpoint can return canceled rows even when the documented
    // status filter is present. Retired duplicates still retain our marker,
    // so allowing them into the candidate inventory makes an otherwise
    // idempotent refresh look ambiguous. Only actionable states participate
    // in publication and in the final 350-listing audit.
    events.push(...pageEvents.filter((event) => ['live', 'started', 'draft'].includes(String(event.status || ''))));
    continuation = body.pagination?.has_more_items ? body.pagination.continuation : undefined;
    if (!continuation) return events;
  }
  throw new Error('Eventbrite dedupe lookup exceeded 20 pages before exhausting the organizer inventory');
}

async function deleteNewlyCreatedDraft(token: string, eventId: string): Promise<void> {
  const response = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    { method: 'DELETE', headers: authHeaders(token) },
    `delete newly created draft ${eventId}`,
  );
  const text = await response.text();
  if (!response.ok && response.status !== 404) {
    throw new Error(`Could not delete newly created Guè draft ${eventId}: HTTP ${response.status} ${text.slice(0, 200)}`);
  }
}

async function readAttendeeCount(token: string, event: ExistingEvent): Promise<number> {
  const response = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${event.id}/attendees/?status=attending&page_size=1`,
    { headers: authHeaders(token) },
    `inspect Guè attendees ${event.id}`,
  );
  if (!response.ok) {
    throw new Error(`Could not inspect Guè attendees for ${event.id}: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
  }
  const body = await response.json();
  return Number(body.pagination?.object_count || body.attendees?.length || 0);
}

async function cleanupNewlyPublishedZeroAttendeeEvent(
  token: string,
  payload: GueEventbriteLocalePayload,
  eventId: string,
): Promise<void> {
  const state = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/?expand=venue`,
    { headers: authHeaders(token) },
    `${payload.marker} failed post-publish cleanup inspect`,
  );
  if (!state.ok) throw new Error(`${payload.marker}: cleanup could not inspect newly published ${eventId}: HTTP ${state.status}`);
  const event = await state.json() as ExistingEvent;
  const venueId = String(event.venue_id || event.venue?.id || '');
  if (event.start?.utc !== START_UTC || event.end?.utc !== END_UTC
    || venueId !== JUST_ME_EVENTBRITE_VENUE_ID
    || exactGueMarkerMatches(payload.marker, [event]).length !== 1
    || !['live', 'started'].includes(String(event.status || ''))) {
    throw new Error(`${payload.marker}: cleanup refuses unknown newly published event ${eventId}`);
  }
  const attendeeCount = await readAttendeeCount(token, event);
  if (attendeeCount > 0) throw new Error(`${payload.marker}: post-publish verification failed and ${eventId} has ${attendeeCount} attendee(s); manual intervention required`);
  const response = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/cancel/`,
    { method: 'POST', headers: authHeaders(token) },
    `${payload.marker} cancel newly published zero-attendee event ${eventId}`,
  );
  const text = await response.text();
  if (!response.ok && !/ALREADY_CANCELED/i.test(text)) {
    throw new Error(`${payload.marker}: cleanup could not cancel newly published ${eventId}: HTTP ${response.status} ${text.slice(0, 200)}`);
  }
  const readback = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    { headers: authHeaders(token) },
    `${payload.marker} verify newly published cleanup ${eventId}`,
  );
  if (!readback.ok) throw new Error(`${payload.marker}: cleanup could not read back ${eventId}: HTTP ${readback.status}`);
  const saved = await readback.json();
  if (!/^cancell?ed$/i.test(String(saved.status || ''))) {
    throw new Error(`${payload.marker}: newly published cleanup ${eventId} did not persist a canceled status`);
  }
}

function descriptionGate(payload: GueEventbriteLocalePayload, html: string): string | null {
  if (!html.includes(`<!-- ${payload.marker} -->`)) return 'curated marker missing';
  if (!html.includes(payload.affiliateUrl)) return 'affiliate URL missing';
  if (!html.includes(payload.canonicalSiteUrl)) return 'same-language canonical missing';
  if (html.length < payload.descriptionHtml.length * 0.8) return 'description was truncated';
  if ((html.match(/data-event-faq="true"/gi) || []).length !== 25) return '25 FAQs were not persisted';
  const tags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  if (tags.length !== 5) return 'five body images were not persisted';
  if (tags.some((tag) => !/style="[^"]*width:\s*100%[^"]*max-width:\s*100%[^"]*height:\s*auto[^"]*"/i.test(tag))) {
    return 'responsive body image sizing was not persisted';
  }
  const imageUrls = tags.map((tag) => /\bsrc="([^"]+)"/i.exec(tag)?.[1]?.replace(/&amp;/g, '&') || '');
  if (imageUrls.some((url) => !trustedEventbriteImage(url))) return 'non-Eventbrite body image persisted';
  const expectedUrls = payload.imagePlan.map((image) => image.src.replace(/&amp;/g, '&'));
  if (imageUrls.some((url, index) => url !== expectedUrls[index])) return 'wrong body image sequence persisted';
  const labelsExact = tags.every((tag, index) => {
    const alt = decodeHtmlText(/\balt="([^"]*)"/i.exec(tag)?.[1] || '');
    const title = decodeHtmlText(/\btitle="([^"]*)"/i.exec(tag)?.[1] || '');
    return alt === payload.imagePlan[index].alt && title === payload.imagePlan[index].title;
  });
  if (!labelsExact) return 'localized body image labels were not persisted';
  if (!tags[0].includes(escapeHtml(payload.imagePlan[0].alt))) return 'first body image is not the localized poster';
  const pack = getEventLocalePack(payload.locale);
  if (!pack) return 'locale pack missing';
  const contacts = payload.locale === 'en'
    // Eventbrite currently strips this non-semantic data attribute after save.
    // The literal H2 is buyer-visible and remains the stable ordering anchor.
    ? (() => {
      const markedList = html.indexOf('data-contact-list="true"');
      return markedList >= 0 ? markedList : html.indexOf('Tickets, tables and contacts');
    })()
    : Math.max(html.indexOf(pack.eventbrite.contactsTitle), html.indexOf(escapeHtml(pack.eventbrite.contactsTitle)));
  const programme = payload.locale === 'en'
    ? html.indexOf('Agenda and entry times')
    : Math.max(html.indexOf(pack.eventbrite.programmeTitle), html.indexOf(escapeHtml(pack.eventbrite.programmeTitle)));
  const poster = html.search(/<img\b/i);
  if (contacts < 0 || programme < 0 || poster < contacts || poster > programme) return 'poster is not immediately after contacts';
  const visible = decodeHtmlText(html);
  const englishSeoClosingPresent = html.includes('data-seo-closing="true"')
    || html.includes('Guè Pequeno live in Milan: tickets, nightlife and VIP tables');
  if (payload.locale === 'en' && (!englishSeoClosingPresent || !normalizedTextIncludes(visible, 'Guè Pequeno'))) {
    return 'English SEO closing paragraph or Guè Pequeno search name missing';
  }
  if (/DJ Dero/i.test(visible)) return 'unsupported DJ Dero claim persisted';
  if (/80(?:[., ]000|\s000)/u.test(visible)) return 'unsupported 80,000 attendance claim persisted';
  const localizedContent = getGueJustMeLocalizedContent(payload.locale);
  const currentLead = payload.requiredLead;
  if (currentLead && !normalizedTextIncludes(visible, currentLead)) {
    return 'current localized lead and stage-time disclaimer missing';
  }
  const sectionCopyComplete = payload.locale === 'en'
    ? ['Target audience', 'Dress code', 'Mood and setting', 'Music'].every((heading) => normalizedTextIncludes(visible, heading))
    : localizedContent.sections.every((section) => normalizedTextIncludes(visible, section.body));
  if (!visible.includes(GUE_JUST_ME_PHONE) || !sectionCopyComplete) {
    return 'localized phone, dress code, target, mood or music section missing';
  }
  if (!visible.includes('19:30') || !visible.includes('22:30') || !visible.includes('05:00')) return 'verified programme times missing';
  if (!normalizedTextIncludes(visible, '21+')
    || !normalizedTextIncludes(visible, GUE_JUST_ME_ADDRESS)) {
    return 'age or venue address missing';
  }
  return null;
}

function confirmationFieldComplete(payload: GueEventbriteLocalePayload, html: string): boolean {
  const copy = getEventbriteConfirmationPlainText(payload.locale, GUE_JUST_ME_PHONE);
  const eventName = GUE_JUST_ME_EVENTBRITE_NAMES[payload.locale];
  const details = payload.requiredLead;
  const visible = decodeHtmlText(html);
  return html.includes(GUE_JUST_ME_AFFILIATE_URL)
    && visible.includes(GUE_JUST_ME_PHONE)
    && visible.includes(copy.notTicket)
    && visible.includes(copy.purchase)
    && visible.includes(eventName)
    && (!details || visible.includes(details))
    && visible.includes('19:30');
}

async function ensureLiveSettings(token: string, eventId: string, payload: GueEventbriteLocalePayload): Promise<void> {
  const confirmationWrite = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        ticket_buyer_settings: {
          confirmation_message: { html: payload.orderConfirmation },
          instructions: { html: payload.orderConfirmation },
        },
      }),
    },
    `${payload.marker} confirmation write`,
  );
  if (!confirmationWrite.ok) {
    throw new Error(`${payload.marker}: confirmation update failed: HTTP ${confirmationWrite.status} ${(await confirmationWrite.text()).slice(0, 200)}`);
  }
  const confirmationRead = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`,
    { headers: authHeaders(token) },
    `${payload.marker} confirmation readback`,
  );
  if (!confirmationRead.ok) throw new Error(`${payload.marker}: confirmation readback failed: HTTP ${confirmationRead.status}`);
  const saved = await confirmationRead.json();
  if (!confirmationFieldComplete(payload, String(saved?.confirmation_message?.html || ''))
    || !confirmationFieldComplete(payload, String(saved?.instructions?.html || ''))) {
    throw new Error(`${payload.marker}: Eventbrite did not persist both native confirmation fields`);
  }
  const music = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/music_properties/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ music_properties: { age_restriction: '21+', door_time: START_UTC } }),
    },
    `${payload.marker} music properties`,
  );
  if (!music.ok) throw new Error(`${payload.marker}: music properties failed: HTTP ${music.status} ${(await music.text()).slice(0, 200)}`);
}

async function refreshLiveTicketClass(token: string, eventId: string, payload: GueEventbriteLocalePayload): Promise<void> {
  const inventory = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/?expand=ticket_classes`,
    { headers: authHeaders(token) },
    `${payload.marker} ticket inventory`,
  );
  if (!inventory.ok) throw new Error(`${payload.marker}: ticket inventory failed: HTTP ${inventory.status}`);
  const event = await inventory.json();
  const tickets = Array.isArray(event.ticket_classes) ? event.ticket_classes : [];
  if (tickets.length !== 1 || !/^\d+$/.test(String(tickets[0]?.id || ''))) {
    throw new Error(`${payload.marker}: expected one safe ticket class, found ${tickets.length}`);
  }
  const ticket = tickets[0];
  const savedDescription = typeof ticket.description === 'string'
    ? ticket.description
    : String(ticket.description?.text || ticket.description?.html || '');
  if (ticket.name === payload.ticketName && savedDescription === payload.ticketDescription) return;
  const response = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/ticket_classes/${ticket.id}/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ ticket_class: { name: payload.ticketName, description: payload.ticketDescription } }),
    },
    `${payload.marker} ticket refresh`,
  );
  if (!response.ok) {
    throw new Error(`${payload.marker}: ticket refresh failed: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
  }
}

function ticketDescription(ticket: Record<string, unknown>): string {
  if (typeof ticket.description === 'string') return ticket.description;
  const description = ticket.description as Record<string, unknown> | undefined;
  return String(description?.text || description?.html || '');
}

function nullableString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

async function captureLiveRefreshSnapshot(
  token: string,
  eventId: string,
  payload: GueEventbriteLocalePayload,
): Promise<LiveRefreshSnapshot> {
  const [eventRes, settingsRes, musicRes] = await Promise.all([
    eventbriteFetch(`${EVENTBRITE_API}/events/${eventId}/?expand=ticket_classes,venue`, { headers: authHeaders(token) }, `${payload.marker} rollback snapshot event`),
    eventbriteFetch(`${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`, { headers: authHeaders(token) }, `${payload.marker} rollback snapshot settings`),
    eventbriteFetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, { headers: authHeaders(token) }, `${payload.marker} rollback snapshot music`),
  ]);
  if (!eventRes.ok || !settingsRes.ok || !musicRes.ok) {
    throw new Error(`${payload.marker}: rollback snapshot failed: HTTP ${eventRes.status}/${settingsRes.status}/${musicRes.status}`);
  }
  const [event, settings, music] = await Promise.all([eventRes.json(), settingsRes.json(), musicRes.json()]);
  const tickets = Array.isArray(event.ticket_classes) ? event.ticket_classes as Array<Record<string, unknown>> : [];
  if (tickets.length !== 1 || !/^\d+$/.test(String(tickets[0]?.id || ''))) {
    throw new Error(`${payload.marker}: rollback snapshot requires exactly one ticket class, found ${tickets.length}`);
  }
  const logoId = String(event.logo?.id || event.logo_id || '');
  const venueId = String(event.venue_id || event.venue?.id || '');
  const nameHtml = String(event.name?.html || event.name?.text || '');
  const nameText = String(event.name?.text || nameHtml);
  if (!logoId || !venueId || !nameHtml || !nameText) {
    throw new Error(`${payload.marker}: rollback snapshot lacks the existing logo, venue or name`);
  }
  return {
    event: {
      nameHtml,
      nameText,
      summary: String(event.summary || ''),
      descriptionHtml: String(event.description?.html || ''),
      logoId,
      venueId,
    },
    ticket: {
      id: String(tickets[0].id),
      name: String(tickets[0].name || ''),
      description: ticketDescription(tickets[0]),
    },
    settings: {
      confirmationMessageHtml: String(settings?.confirmation_message?.html || ''),
      instructionsHtml: String(settings?.instructions?.html || ''),
    },
    music: {
      ageRestriction: nullableString(music?.age_restriction),
      doorTime: nullableString(music?.door_time),
    },
  };
}

async function restoreLiveRefreshSnapshot(
  token: string,
  eventId: string,
  payload: GueEventbriteLocalePayload,
  snapshot: LiveRefreshSnapshot,
): Promise<void> {
  // Eventbrite rejects an event write containing both `summary` and
  // `description`. Restore the two fields independently for the same reason
  // the forward refresh is split below.
  const restoreMetadata = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        event: {
          name: { html: snapshot.event.nameHtml },
          summary: snapshot.event.summary,
          logo_id: snapshot.event.logoId,
          venue_id: snapshot.event.venueId,
        },
      }),
    },
    `${payload.marker} rollback event metadata restore`,
  );
  if (!restoreMetadata.ok) throw new Error(`event metadata restore HTTP ${restoreMetadata.status} ${(await restoreMetadata.text()).slice(0, 200)}`);

  const restoreDescription = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ event: { description: { html: snapshot.event.descriptionHtml } } }),
    },
    `${payload.marker} rollback event description restore`,
  );
  if (!restoreDescription.ok) throw new Error(`event description restore HTTP ${restoreDescription.status} ${(await restoreDescription.text()).slice(0, 200)}`);

  const restoreTicket = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/ticket_classes/${snapshot.ticket.id}/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ ticket_class: { name: snapshot.ticket.name, description: snapshot.ticket.description } }),
    },
    `${payload.marker} rollback ticket restore`,
  );
  if (!restoreTicket.ok) throw new Error(`ticket restore HTTP ${restoreTicket.status} ${(await restoreTicket.text()).slice(0, 200)}`);

  const restoreSettings = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        ticket_buyer_settings: {
          confirmation_message: { html: snapshot.settings.confirmationMessageHtml },
          instructions: { html: snapshot.settings.instructionsHtml },
        },
      }),
    },
    `${payload.marker} rollback settings restore`,
  );
  if (!restoreSettings.ok) throw new Error(`confirmation restore HTTP ${restoreSettings.status} ${(await restoreSettings.text()).slice(0, 200)}`);

  const restoreMusic = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/music_properties/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        music_properties: {
          age_restriction: snapshot.music.ageRestriction,
          door_time: snapshot.music.doorTime,
        },
      }),
    },
    `${payload.marker} rollback music restore`,
  );
  if (!restoreMusic.ok) throw new Error(`music restore HTTP ${restoreMusic.status} ${(await restoreMusic.text()).slice(0, 200)}`);
}

async function verifyLiveRefreshSnapshot(
  token: string,
  eventId: string,
  payload: GueEventbriteLocalePayload,
  snapshot: LiveRefreshSnapshot,
): Promise<void> {
  const saved = await captureLiveRefreshSnapshot(token, eventId, payload);
  if (!semanticallyEqualLiveRefreshSnapshot(snapshot, saved)) {
    throw new Error('rollback readback does not semantically match the pre-refresh snapshot');
  }
}

async function refreshExistingLiveEventWithRollback(
  token: string,
  eventId: string,
  payload: GueEventbriteLocalePayload,
  coverMedia: EventbriteMedia,
  venueEbId: string,
) {
  const snapshot = await captureLiveRefreshSnapshot(token, eventId, payload);
  try {
    await refreshLiveEvent(token, eventId, payload, coverMedia, venueEbId);
    await ensureLiveSettings(token, eventId, payload);
    return await inspectLiveEvent(token, eventId, payload, venueEbId, coverMedia.id);
  } catch (refreshError) {
    const refreshMessage = refreshError instanceof Error ? refreshError.message : String(refreshError);
    try {
      await restoreLiveRefreshSnapshot(token, eventId, payload, snapshot);
      await verifyLiveRefreshSnapshot(token, eventId, payload, snapshot);
    } catch (rollbackError) {
      const rollbackMessage = rollbackError instanceof Error ? rollbackError.message : String(rollbackError);
      throw new Error(`${payload.marker}: refresh failed (${refreshMessage}); automatic rollback FAILED (${rollbackMessage})`);
    }
    throw new Error(`${payload.marker}: refresh failed (${refreshMessage}); automatic rollback restored and verified the prior live state`);
  }
}

async function refreshLiveEvent(
  token: string,
  eventId: string,
  payload: GueEventbriteLocalePayload,
  coverMedia: EventbriteMedia,
  venueEbId: string,
): Promise<void> {
  // Eventbrite treats summary + description in one POST as a conflict. The
  // pilot writes metadata first, then the full HTML description in a separate
  // request. The exact readback compares both persisted values afterward.
  // The caller's snapshot/rollback wrapper covers failures after either write.
  const metadataResponse = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        event: {
          name: { html: payload.title },
          summary: payload.summary,
          logo_id: coverMedia.id,
          venue_id: venueEbId,
        },
      }),
    },
    `${payload.marker} live metadata refresh`,
  );
  if (!metadataResponse.ok) {
    throw new Error(`${payload.marker}: live metadata refresh failed: HTTP ${metadataResponse.status} ${(await metadataResponse.text()).slice(0, 200)}`);
  }

  const descriptionResponse = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ event: { description: { html: payload.descriptionHtml } } }),
    },
    `${payload.marker} live description refresh`,
  );
  if (!descriptionResponse.ok) {
    throw new Error(`${payload.marker}: live description refresh failed: HTTP ${descriptionResponse.status} ${(await descriptionResponse.text()).slice(0, 200)}`);
  }
  await refreshLiveTicketClass(token, eventId, payload);
}

async function inspectLiveEvent(
  token: string,
  eventId: string,
  payload: GueEventbriteLocalePayload,
  venueEbId: string,
  expectedCoverId?: string,
) {
  const [eventRes, settingsRes, musicRes] = await Promise.all([
    eventbriteFetch(`${EVENTBRITE_API}/events/${eventId}/?expand=ticket_classes,venue`, { headers: authHeaders(token) }, `${payload.marker} event inspect`),
    eventbriteFetch(`${EVENTBRITE_API}/events/${eventId}/ticket_buyer_settings/`, { headers: authHeaders(token) }, `${payload.marker} confirmation inspect`),
    eventbriteFetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, { headers: authHeaders(token) }, `${payload.marker} music inspect`),
  ]);
  if (!eventRes.ok || !settingsRes.ok || !musicRes.ok) {
    throw new Error(`${payload.marker}: live inspection HTTP ${eventRes.status}/${settingsRes.status}/${musicRes.status}`);
  }
  const event = await eventRes.json();
  const settings = await settingsRes.json();
  const music = await musicRes.json();
  const savedHtml = String(event.description?.html || '');
  const gateFailure = descriptionGate(payload, savedHtml);
  const eventVenueId = String(event.venue_id || event.venue?.id || '');
  const confirmationMessage = String(settings?.confirmation_message?.html || '');
  const instructions = String(settings?.instructions?.html || '');
  const tickets = Array.isArray(event.ticket_classes) ? event.ticket_classes : [];
  const ticket = tickets[0] || {};
  const checks = {
    statusLive: event.status === 'live' || event.status === 'started',
    titleExact: event.name?.text === payload.title,
    summaryExact: normalizedVisibleExact(String(event.summary || '')) === normalizedVisibleExact(payload.summary),
    descriptionComplete: !gateFailure,
    coverPresent: Boolean(event.logo?.url || event.logo?.original?.url),
    coverExact: !expectedCoverId || JSON.stringify(event.logo || {}).includes(expectedCoverId),
    venueExact: eventVenueId === venueEbId && eventbriteVenueMatches({
      candidate: event.venue || {},
      expectedName: JUST_ME_EVENTBRITE_VENUE.name,
      expectedStreet: JUST_ME_EVENTBRITE_VENUE.street,
      expectedPostalCode: JUST_ME_EVENTBRITE_VENUE.postalCode,
    }),
    startExact: event.start?.utc === START_UTC,
    endExact: event.end?.utc === END_UTC,
    ticketExact: tickets.length === 1
      && ticket.name === payload.ticketName
      && ticketDescription(ticket) === payload.ticketDescription
      && ticket.free === true
      && ticket.minimum_quantity === 1
      && ticket.maximum_quantity === 10,
    confirmationMessageNative: confirmationFieldComplete(payload, confirmationMessage),
    instructionsNative: confirmationFieldComplete(payload, instructions),
    age21: /21\+/.test(String(music?.age_restriction || '')),
    doorTimeExact: music?.door_time === START_UTC,
  };
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  if (failed.length > 0) {
    const summaryDiagnostic = !checks.summaryExact
      ? ` actualSummary(length=${String(event.summary || '').length})=${JSON.stringify(String(event.summary || ''))} expectedSummary(length=${payload.summary.length})=${JSON.stringify(payload.summary)}`
      : '';
    throw new Error(`${payload.marker}: live verification failed: ${failed.join(', ')}${gateFailure ? ` (${gateFailure})` : ''}${summaryDiagnostic}`);
  }
  return {
    id: String(eventId),
    url: String(event.url || ''),
    title: String(event.name?.text || ''),
    locale: payload.locale,
    variant: payload.variant,
    marker: payload.marker,
    status: String(event.status || ''),
    bodyImages: (savedHtml.match(/<img\b/gi) || []).length,
    faqCount: (savedHtml.match(/data-event-faq="true"/gi) || []).length,
    confirmationConfigured: true,
    venueId: eventVenueId,
    checks,
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const requestUrl = new URL(request.url);
  if (requestUrl.searchParams.get('audit') === '1') {
    const token = getEventbriteToken();
    if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
    const settingsItems = requestUrl.searchParams.get('settingsItems');
    if (settingsItems) {
      const parsed = settingsItems.split(',').map((item) => {
        const [locale, variantText, eventId] = item.split(':');
        const variant = Number(variantText);
        if (!isEnabledLocale(locale)
          || !Number.isInteger(variant)
          || variant < 1
          || variant > 10
          || !/^\d+$/.test(eventId || '')) return null;
        return { locale, variant, eventId } as const;
      });
      if (parsed.length < 1 || parsed.length > 5 || parsed.some((item) => !item)) {
        return NextResponse.json({ ok: false, error: 'settingsItems must contain 1-5 locale:variant:eventId rows' }, { status: 400 });
      }
      const results = await Promise.all(parsed.map(async (item) => {
        const payload = buildGueEventbriteLocalePayloads(item!.locale)[item!.variant - 1];
        const [settingsRes, musicRes] = await Promise.all([
          eventbriteFetch(`${EVENTBRITE_API}/events/${item!.eventId}/ticket_buyer_settings/`, { headers: authHeaders(token) }, `${payload.marker} settings audit`),
          eventbriteFetch(`${EVENTBRITE_API}/events/${item!.eventId}/music_properties/`, { headers: authHeaders(token) }, `${payload.marker} music audit`),
        ]);
        if (!settingsRes.ok || !musicRes.ok) {
          return {
            ok: false,
            marker: payload.marker,
            locale: item!.locale,
            variant: item!.variant,
            eventId: item!.eventId,
            settingsStatus: settingsRes.status,
            musicStatus: musicRes.status,
          };
        }
        const settings = await settingsRes.json();
        const music = await musicRes.json();
        const checks = {
          confirmationMessageNative: confirmationFieldComplete(payload, String(settings?.confirmation_message?.html || '')),
          instructionsNative: confirmationFieldComplete(payload, String(settings?.instructions?.html || '')),
          age21: /21\+/.test(String(music?.age_restriction || '')),
          doorTimeExact: music?.door_time === START_UTC,
        };
        return {
          ok: Object.values(checks).every(Boolean),
          marker: payload.marker,
          locale: item!.locale,
          variant: item!.variant,
          eventId: item!.eventId,
          checks,
        };
      }));
      const rateLimited = results.some((result) => 'settingsStatus' in result
        && (result.settingsStatus === 429 || result.musicStatus === 429));
      if (rateLimited) {
        return NextResponse.json({ ok: false, retryable: true, error: 'Eventbrite settings audit rate limited' }, { status: 429 });
      }
      return NextResponse.json({ ok: results.every((result) => result.ok), results });
    }
    const requestedLocale = requestUrl.searchParams.get('locale');
    if (requestedLocale && !isEnabledLocale(requestedLocale)) {
      return NextResponse.json({ ok: false, error: 'Unsupported audit locale' }, { status: 400 });
    }
    const auditLocales = requestedLocale ? [requestedLocale as LocaleCode] : PUBLISHABLE_LOCALES;
    const payloads = auditLocales.flatMap((locale) => buildGueEventbriteLocalePayloads(locale));
    const stubs = await listExistingEvents(token);
    const fullAudit = requestUrl.searchParams.get('full') === '1';
    if (fullAudit) {
      const deepAudit = requestUrl.searchParams.get('deep') === '1';
      const offset = Number(requestUrl.searchParams.get('offset') || '0');
      const limit = Number(requestUrl.searchParams.get('limit') || String(FULL_AUDIT_MAX_CHUNK));
      const maxChunk = deepAudit ? FULL_DEEP_AUDIT_MAX_CHUNK : FULL_AUDIT_MAX_CHUNK;
      if (!Number.isInteger(offset) || offset < 0) {
        return NextResponse.json({ ok: false, error: 'Full audit offset must be a non-negative integer' }, { status: 400 });
      }
      if (!Number.isInteger(limit) || limit < 1 || limit > maxChunk) {
        return NextResponse.json({ ok: false, error: `Full audit limit must be an integer from 1 to ${maxChunk}` }, { status: 400 });
      }
      const expectedMarkers = buildFullAuditExpectedMarkers(auditLocales);
      const candidateSet = buildFullAuditCandidateSet(stubs);
      if (offset > candidateSet.candidates.length) {
        return NextResponse.json({
          ok: false,
          error: `Full audit offset ${offset} exceeds candidate total ${candidateSet.candidates.length}`,
        }, { status: 400 });
      }
      const chunkStubs = candidateSet.candidates.slice(offset, offset + limit);
      const existing = await hydrateExistingEvents(token, chunkStubs);
      let events = buildFullAuditEventEvidence(existing, expectedMarkers, offset);
      if (deepAudit) {
        const payloadByMarker = new Map<string, GueEventbriteLocalePayload>();
        const coverIdByLocale = new Map<LocaleCode, string>();
        for (const locale of auditLocales) {
          const manifest = await readMediaManifest(locale);
          if (!manifest) continue;
          coverIdByLocale.set(locale, manifest.coverId);
          for (const payload of buildGueEventbriteLocalePayloads(locale, manifest.urls)) {
            payloadByMarker.set(payload.marker, payload);
          }
        }
        const deepById = new Map<string, unknown>();
        for (const event of existing) {
          const id = String(event.id || '');
          const html = String(event.description?.html || '');
          const markers = [...html.matchAll(/<!-- (nlm:curated=gue-[a-z0-9-]+) -->/gi)].map((match) => match[1]);
          const marker = markers.length === 1 ? markers[0] : '';
          const payload = payloadByMarker.get(marker);
          if (!payload) {
            deepById.set(id, { ok: false, marker, error: 'candidate does not contain exactly one expected Guè marker' });
            continue;
          }
          try {
            const verified = await inspectLiveEvent(
              token,
              id,
              payload,
              JUST_ME_EVENTBRITE_VENUE_ID,
              coverIdByLocale.get(payload.locale),
            );
            deepById.set(id, { ok: true, ...verified });
          } catch (error) {
            deepById.set(id, {
              ok: false,
              marker,
              locale: payload.locale,
              variant: payload.variant,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        }
        events = events.map((event) => ({ ...event, deepVerification: deepById.get(event.id) || null }));
      }
      const consumed = offset + events.length;
      const nextOffset = consumed < candidateSet.candidates.length ? consumed : null;
      return NextResponse.json({
        ok: true,
        fullAudit: true,
        deepAudit,
        targetStartUtc: START_UTC,
        locales: auditLocales,
        expectedMarkerTotal: expectedMarkers.length,
        expectedMarkerFingerprint: expectedMarkerFingerprint(expectedMarkers),
        expectedMarkers,
        candidateTotal: candidateSet.candidates.length,
        candidateFingerprint: candidateSet.fingerprint,
        chunk: {
          offset,
          limit,
          returned: events.length,
          nextOffset,
          complete: nextOffset === null,
        },
        events,
      });
    }
    const candidateStubs = gueCandidateStubs(payloads, stubs);
    const existing = await hydrateExistingEvents(token, candidateStubs);
    const rows = auditLocales.flatMap((locale) => buildGueEventbriteLocalePayloads(locale).map((payload) => {
      const matches = exactGueMarkerMatches(payload.marker, existing);
      const live = matches.filter((event) => event.status === 'live' || event.status === 'started');
      const drafts = matches.filter((event) => event.status === 'draft');
      return {
        marker: payload.marker,
        locale,
        variant: payload.variant,
        live: live.length,
        drafts: drafts.length,
        liveIds: live.map((event) => event.id),
        draftIds: drafts.map((event) => event.id),
        // Title is deliberately not an identity key: Eventbrite titles may be
        // manually improved between waves while the immutable marker remains.
        titleCurrent: live.length === 1 && live[0].name?.text === payload.title,
        dateExact: live.length === 1 && live[0].start?.utc === START_UTC,
      };
    }));
    const failures = rows.filter((row) => row.live !== 1 || row.drafts !== 0 || !row.dateExact);
    const liveIds = rows.flatMap((row) => row.liveIds);
    const uniqueLiveIds = new Set(liveIds).size;
    const identityCollision = uniqueLiveIds !== rows.length;
    return NextResponse.json({
      ok: failures.length === 0 && !identityCollision,
      expected: rows.length,
      liveExact: rows.length - failures.length,
      uniqueLiveIds,
      locales: auditLocales,
      fullAudit: false,
      rows,
      failures,
    }, { status: failures.length === 0 && !identityCollision ? 200 : 409 });
  }
  if (requestUrl.searchParams.get('rateProbe') === '1') {
    const token = getEventbriteToken();
    if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
    const response = await eventbriteFetch(
      `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&order_by=start_desc&page_size=1`,
      { headers: authHeaders(token) },
      'rate-limit probe',
      1,
    );
    return NextResponse.json({
      ok: response.ok,
      eventbriteStatus: response.status,
      retryAfter: response.headers.get('retry-after'),
      rateLimitReset: response.headers.get('x-rate-limit-reset'),
    });
  }
  const requested = requestUrl.searchParams.get('locale');
  const locales = requested && isEnabledLocale(requested)
    ? [requested]
    : PUBLISHABLE_LOCALES;
  const plans = locales.map((locale) => ({
    locale,
    eventbriteLocale: buildGueEventbriteLocalePayloads(locale)[0].eventbriteLocale,
    count: 10,
    markers: buildGueEventbriteLocalePayloads(locale).map((payload) => payload.marker),
  }));
  return NextResponse.json({
    ok: true,
    localeCount: locales.length,
    listingCount: locales.length * 10,
    plans,
  });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: PublishBody = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  if (!body.locale || !isEnabledLocale(body.locale)) {
    return NextResponse.json({ ok: false, error: 'A supported locale is required' }, { status: 400 });
  }
  const locale = body.locale as LocaleCode;
  const fromVariant = body.fromVariant === undefined ? 1 : Number(body.fromVariant);
  if (!Number.isInteger(fromVariant) || fromVariant < 1 || fromVariant > 10) {
    return NextResponse.json({ ok: false, error: 'fromVariant must be an integer from 1 to 10' }, { status: 400 });
  }
  const max = Math.min(11 - fromVariant, Math.max(1, Number(body.max) || (11 - fromVariant)));
  const suppliedMediaManifest = body.mediaManifest === undefined ? null : parseSuppliedMediaManifestForTest(body.mediaManifest);
  if (body.mediaManifest !== undefined && !suppliedMediaManifest) {
    return NextResponse.json({ ok: false, error: 'mediaManifest must provide one numeric coverId and exactly six HTTPS Eventbrite CDN image URLs' }, { status: 400 });
  }
  if (suppliedMediaManifest && (locale !== 'en' || fromVariant !== 1 || max !== 1)) {
    return NextResponse.json({ ok: false, error: 'A supplied mediaManifest is restricted to the English pilot (locale=en, fromVariant=1, max=1)' }, { status: 400 });
  }
  const partialResults: Array<Record<string, unknown>> = [];
  const deadline = Date.now() + REQUEST_DEADLINE_MS;
  let lease: RolloutLease | null = null;

  try {
    lease = await acquireRolloutLease(locale);
    if (!lease) {
      return NextResponse.json({ ok: false, locale, error: 'A publication wave for this locale is already running' }, { status: 409 });
    }
    const venueEbId = JUST_ME_EVENTBRITE_VENUE_ID;
    const localPayloads = buildGueEventbriteLocalePayloads(locale).slice(fromVariant - 1, fromVariant - 1 + max);
    localPayloads.forEach((payload) => validateGueEventbriteLocalePayload(payload));
    const duplicates = new Map<string, ExistingEvent | undefined>();
    if (suppliedMediaManifest) {
      // Fail closed: the ingress-driven pilot may refresh exactly one known
      // live listing. It never resolves, retires, deletes, or creates events.
      const payload = localPayloads[0];
      const pilotResponse = await eventbriteFetch(
        `${EVENTBRITE_API}/events/${GUE_ENGLISH_PILOT_EVENT_ID}/?expand=venue`,
        { headers: authHeaders(token) },
        'hydrate exact English Guè pilot',
      );
      if (!pilotResponse.ok) throw new Error(`English pilot safety gate failed: HTTP ${pilotResponse.status}`);
      const pilot = await pilotResponse.json() as ExistingEvent;
      assertEnglishPilotIdentityForTest(pilot, payload);
      const stubs = await listExistingEvents(token);
      const existing = await hydrateExistingEvents(token, gueCandidateStubs(localPayloads, stubs));
      const matches = exactGueMarkerMatches(payload.marker, existing);
      const liveMatches = matches.filter((event) => event.status === 'live' || event.status === 'started');
      const draftMatches = matches.filter((event) => event.status === 'draft');
      const unknownMatches = matches.filter((event) => !['live', 'started', 'draft'].includes(String(event.status || '')));
      if (liveMatches.length !== 1 || String(liveMatches[0]?.id) !== GUE_ENGLISH_PILOT_EVENT_ID
        || draftMatches.length !== 0 || unknownMatches.length !== 0 || matches.length !== 1) {
        throw new Error('English pilot safety gate failed: expected one exact live ID and zero draft, duplicate or unknown marker rows');
      }
      duplicates.set(payload.marker, pilot);
    } else {
      const stubs = await listExistingEvents(token);
      const existing = await hydrateExistingEvents(token, gueCandidateStubs(localPayloads, stubs));
      for (const payload of localPayloads) {
        const matches = exactGueMarkerMatches(payload.marker, existing);
        const liveMatches = matches.filter((event) => event.status === 'live' || event.status === 'started');
        const draftMatches = matches.filter((event) => event.status === 'draft');
        const unknownMatches = matches.filter((event) => !['live', 'started', 'draft'].includes(String(event.status || '')));
        if (unknownMatches.length > 0) {
          throw new Error(`${payload.marker}: ambiguous exact-marker state (${liveMatches.length} live, ${draftMatches.length} draft, ${unknownMatches.length} unknown)`);
        }
        if (liveMatches.length > 1 || draftMatches.length > 0) {
          throw new Error(`${payload.marker}: marker collision requires manual review (${liveMatches.length} live, ${draftMatches.length} draft)`);
        }
        const live = liveMatches[0];
        if (live) {
          const venueId = String(live.venue_id || live.venue?.id || '');
          if (live.start?.utc !== START_UTC || live.end?.utc !== END_UTC || venueId !== JUST_ME_EVENTBRITE_VENUE_ID) {
            throw new Error(`${payload.marker}: exact marker belongs to a listing with unexpected venue or date`);
          }
        }
        duplicates.set(payload.marker, live);
      }
    }

    let mediaManifest: StoredMediaManifest | null = await readMediaManifest(locale);
    if (suppliedMediaManifest) mediaManifest = { ...suppliedMediaManifest, createdAt: new Date().toISOString() };
    if (!mediaManifest) {
      // EN owns the four language-neutral body photos. Every other locale
      // uploads only its localized cover and poster, then reuses those exact
      // approved EN Eventbrite CDN assets. This caps the rollout at 74 assets
      // (68 non-EN localized cover/posters plus six EN pilot assets) instead
      // of 210.
      const sourceImages = locale === 'en'
        ? [localPayloads[0].coverImage, ...localPayloads[0].imagePlan] as const
        : [localPayloads[0].coverImage, localPayloads[0].imagePlan[0]] as const;
      const uploaded: EventbriteMedia[] = [];
      const deploymentOrigin = new URL(request.url).origin;
      for (const image of sourceImages) {
        const deploymentAssetUrl = new URL(new URL(image.src).pathname, deploymentOrigin).toString();
        const bytes = await fetchPublicJpeg(deploymentAssetUrl, deploymentOrigin);
        const filename = new URL(image.src).pathname.split('/').pop() || `${locale}-${uploaded.length}.jpg`;
        uploaded.push(await uploadMedia(token, bytes, filename));
        if (uploaded.length < sourceImages.length) await sleep(500);
      }
      if (locale === 'en') {
        mediaManifest = {
          urls: uploaded.map((media) => media.url) as StoredMediaManifest['urls'],
          coverId: uploaded[0].id,
          createdAt: new Date().toISOString(),
        };
      } else {
        const englishManifest = await readMediaManifest('en');
        if (!englishManifest || englishManifest.urls.length !== 6
          || englishManifest.urls.slice(2).some((url) => !trustedEventbriteImage(url))) {
          throw new Error(`${locale}: English v2 media manifest is required before shared body media can be reused`);
        }
        mediaManifest = {
          urls: [uploaded[0].url, uploaded[1].url, ...englishManifest.urls.slice(2)] as StoredMediaManifest['urls'],
          coverId: uploaded[0].id,
          createdAt: new Date().toISOString(),
        };
      }
      await writeMediaManifest(locale, mediaManifest);
    }
    const coverMedia: EventbriteMedia = { id: mediaManifest.coverId, url: mediaManifest.urls[0] };
    const cdnTuple = mediaManifest.urls;
    const payloads = buildGueEventbriteLocalePayloads(locale, cdnTuple).slice(fromVariant - 1, fromVariant - 1 + max);
    payloads.forEach((payload) => validateGueEventbriteLocalePayload(payload, true));

    for (let index = 0; index < payloads.length; index += 1) {
      const payload = payloads[index];
      if (index > 0 && Date.now() >= deadline) {
        return NextResponse.json({
          ok: false,
          retryable: true,
          locale,
          completedBeforeDeadline: partialResults,
          nextVariant: payload.variant,
          error: 'Publication wave stopped before the Vercel execution deadline',
        }, { status: 202 });
      }
      const duplicate = duplicates.get(payload.marker);
      if (suppliedMediaManifest && String(duplicate?.id || '') !== GUE_ENGLISH_PILOT_EVENT_ID) {
        throw new Error('English pilot safety gate failed: creation, deletion and duplicate resolution are forbidden');
      }
      if (duplicate) {
        const verified = await refreshExistingLiveEventWithRollback(
          token,
          duplicate.id,
          payload,
          coverMedia,
          venueEbId,
        );
        partialResults.push({ ...verified, skipped: true });
        continue;
      }
      const result = await publishOneLang({
        token,
        venueEbId,
        imageId: coverMedia.id,
        startUtc: START_UTC,
        endUtc: END_UTC,
        title: payload.title,
        summary: payload.summary,
        description: payload.descriptionHtml,
        locale: payload.eventbriteLocale,
        lang: payload.locale,
        ageRestriction: '21+',
        doorTimeISO: START_UTC,
        ticketText: { name: payload.ticketName, description: payload.ticketDescription },
        categoryId: '103',
        validateSavedDescription: (savedHtml) => descriptionGate(payload, savedHtml),
      });
      if (!result.ok || !result.ebEventId) {
        if (result.ebEventId) {
          const state = await eventbriteFetch(
            `${EVENTBRITE_API}/events/${result.ebEventId}/`,
            { headers: authHeaders(token) },
            `${payload.marker} failed draft inspect`,
          );
          if (state.ok && (await state.json())?.status === 'draft') {
            await deleteNewlyCreatedDraft(token, result.ebEventId);
          }
        }
        throw new Error(`${payload.marker}: ${result.reason || 'publication failed'}${result.ebEventId ? ` (draft ${result.ebEventId})` : ''}`);
      }
      try {
        await ensureLiveSettings(token, result.ebEventId, payload);
        const verified = await inspectLiveEvent(token, result.ebEventId, payload, venueEbId, coverMedia.id);
        partialResults.push({ ...verified, skipped: false });
      } catch (postPublishError) {
        const failure = postPublishError instanceof Error ? postPublishError.message : String(postPublishError);
        try {
          await cleanupNewlyPublishedZeroAttendeeEvent(token, payload, result.ebEventId);
        } catch (cleanupError) {
          const cleanup = cleanupError instanceof Error ? cleanupError.message : String(cleanupError);
          throw new Error(`${payload.marker}: post-publish verification failed (${failure}); cleanup BLOCKED (${cleanup})`);
        }
        throw new Error(`${payload.marker}: post-publish verification failed (${failure}); newly published zero-attendee event ${result.ebEventId} was canceled`);
      }
      if (index < payloads.length - 1) await sleep(3_000);
    }

    // Only a verified refresh earns persistence of the ingress manifest. A
    // failed update must leave no new Blob state that a later run could trust.
    if (suppliedMediaManifest && partialResults.length === 1) {
      await writeMediaManifest(locale, mediaManifest);
    }

    return NextResponse.json({
      ok: true,
      locale,
      eventbriteLocale: payloads[0]?.eventbriteLocale,
      fromVariant,
      requested: payloads.length,
      publishedAndVerified: partialResults.length,
      pilotFirstVerified: partialResults.length > 0,
      results: partialResults,
      checkpoint: partialResults.map((result) => ({ marker: result.marker, eventId: result.id })),
      mediaUploaded: true,
      venueEbId,
    });
  } catch (error) {
    console.error('[publish-gue-locales]', locale, error);
    const message = error instanceof Error ? error.message : String(error);
    const retryable = /HTTP 429|rate limit|HIT_RATE_LIMIT/i.test(message);
    return NextResponse.json({
      ok: false,
      retryable,
      locale,
      completedBeforeFailure: partialResults,
      checkpoint: partialResults.map((result) => ({ marker: result.marker, eventId: result.id })),
      error: message,
    }, { status: retryable ? 429 : 502 });
  } finally {
    try {
      await lease?.release();
    } catch (error) {
      console.error('[publish-gue-locales] lease release failed', locale, error);
    }
  }
}

