import { NextResponse } from 'next/server';
import { BlobPreconditionFailedError, del, get, put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { getEventbriteConfirmationPlainText } from '@/lib/eventbriteConfirmation';
import { eventbriteVenueMatches, publishOneLang, sleep } from '@/lib/eventPublisher';
import { getEventLocalePack } from '@/lib/eventLocalePacks';
import { enabledLocaleCodes, isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';
import {
  buildWorldCupEventbriteLocalePayloads,
  validateWorldCupEventbriteLocalePayload,
  type WorldCupEventbriteLocalePayload,
} from '@/lib/worldCupEventbriteLocales';
import { getWorldCupFinalLocaleCopy } from '@/lib/worldCupFinalLocaleCopies';
import { getWorldCupFinalLocalizedContent } from '@/lib/worldCupFinalLocales';
import { WORLD_CUP_FINAL_AFFILIATE_URL, WORLD_CUP_FINAL_PHONE } from '@/lib/worldCupFinalIt';
import { exactWorldCupMarkerMatches, type WorldCupExistingEvent } from '@/lib/worldCupEventbriteRollout';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const START_UTC = '2026-07-19T17:30:00Z';
const END_UTC = '2026-07-20T03:00:00Z';
const JUST_ME_EVENTBRITE_VENUE_ID = '295950971';
const ROLLOUT_LEASE_MS = 6 * 60 * 1000;
const REQUEST_DEADLINE_MS = 4 * 60 * 1000;
const PUBLISHABLE_LOCALES = enabledLocaleCodes.filter((locale) => locale !== 'en' && locale !== 'it');
const JUST_ME_EVENTBRITE_VENUE = {
  name: 'Just Me',
  street: 'Viale Luigi Camoens, 2',
  postalCode: '20121',
} as const;

interface EventbriteMedia {
  id: string;
  url: string;
}

type ExistingEvent = WorldCupExistingEvent;

interface PublishBody {
  locale?: string;
  max?: number;
  fromVariant?: number;
}

interface RolloutLease {
  release: () => Promise<void>;
}

interface StoredLease {
  owner: string;
  expiresAt: string;
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

function isAuthorized(request: Request): boolean {
  const bearer = request.headers.get('authorization');
  return Boolean(
    (process.env.CRON_SECRET && bearer === `Bearer ${process.env.CRON_SECRET}`)
      || (process.env.WORLD_CUP_PUBLISH_SECRET && bearer === `Bearer ${process.env.WORLD_CUP_PUBLISH_SECRET}`)
      || (process.env.WORLD_CUP_ROLLOUT_SECRET && bearer === `Bearer ${process.env.WORLD_CUP_ROLLOUT_SECRET}`),
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

function trustedEventbriteImage(url: string): boolean {
  return /^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url.replace(/&amp;/g, '&'));
}

function rolloutLockPath(locale: LocaleCode): string {
  return `publishing/world-cup-locales/${locale}.lock.json`;
}

async function readRolloutLease(locale: LocaleCode): Promise<{ record: StoredLease; etag: string } | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required for the World Cup rollout lock');
  try {
    const result = await get(rolloutLockPath(locale), { access: 'private', token, useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200 || !result.stream) throw new Error('Unable to read the World Cup rollout lock');
    const record = JSON.parse(await new Response(result.stream).text()) as Partial<StoredLease>;
    if (typeof record.owner !== 'string' || typeof record.expiresAt !== 'string') {
      throw new Error('Invalid World Cup rollout lock');
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
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required for the World Cup rollout lock');
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
      if (!Number.isFinite(expiresAt)) throw new Error('Invalid World Cup rollout lock expiry');
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

async function fetchPublicJpeg(assetUrl: string): Promise<Uint8Array> {
  const parsed = new URL(assetUrl);
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'nightlifemilan.com'
    || !parsed.pathname.startsWith('/images/events/generated/')) {
    throw new Error(`Untrusted World Cup asset URL: ${assetUrl}`);
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

async function listExistingEvents(token: string): Promise<ExistingEvent[]> {
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live,draft,started&order_by=start_desc&page_size=200`;
  const events: ExistingEvent[] = [];
  let continuation: string | undefined;
  for (let page = 0; page < 20; page += 1) {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await eventbriteFetch(url, { headers: authHeaders(token) }, `dedupe page ${page + 1}`);
    if (!response.ok) throw new Error(`Eventbrite dedupe lookup failed: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
    const body = await response.json();
    const pageEvents = (body.events || []) as ExistingEvent[];
    events.push(...pageEvents);
    const oldest = pageEvents.at(-1)?.start?.utc;
    if (oldest && oldest < START_UTC) return events;
    continuation = body.pagination?.has_more_items ? body.pagination.continuation : undefined;
    if (!continuation) return events;
  }
  throw new Error('Eventbrite dedupe lookup exceeded 20 pages before crossing the event date');
}

async function deleteStaleDraft(token: string, eventId: string): Promise<void> {
  const response = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    { method: 'DELETE', headers: authHeaders(token) },
    `delete stale draft ${eventId}`,
  );
  const text = await response.text();
  if (!response.ok && response.status !== 404) {
    throw new Error(`Could not delete stale World Cup draft ${eventId}: HTTP ${response.status} ${text.slice(0, 200)}`);
  }
}

function descriptionGate(payload: WorldCupEventbriteLocalePayload, html: string): string | null {
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
  const contacts = Math.max(html.indexOf(pack.eventbrite.contactsTitle), html.indexOf(escapeHtml(pack.eventbrite.contactsTitle)));
  const programme = Math.max(html.indexOf(pack.eventbrite.programmeTitle), html.indexOf(escapeHtml(pack.eventbrite.programmeTitle)));
  const poster = html.search(/<img\b/i);
  if (contacts < 0 || programme < 0 || poster < contacts || poster > programme) return 'poster is not immediately after contacts';
  const visible = decodeHtmlText(html);
  if (!visible.includes('19:30') || !visible.includes('21:00')) return 'verified times missing';
  if (!visible.includes('21+') || !visible.includes('Viale Luigi Camoens 2, 20121')) return 'age or venue address missing';
  return null;
}

function confirmationFieldComplete(payload: WorldCupEventbriteLocalePayload, html: string): boolean {
  const copy = getEventbriteConfirmationPlainText(payload.locale, WORLD_CUP_FINAL_PHONE);
  const eventCopy = getWorldCupFinalLocaleCopy(payload.locale);
  const details = getWorldCupFinalLocalizedContent(payload.locale).answerFirst || '';
  const visible = decodeHtmlText(html);
  return html.includes(WORLD_CUP_FINAL_AFFILIATE_URL)
    && visible.includes(WORLD_CUP_FINAL_PHONE)
    && visible.includes(copy.notTicket)
    && visible.includes(copy.purchase)
    && visible.includes(eventCopy.eventName)
    && (!details || visible.includes(details))
    && visible.includes('21:00');
}

async function ensureLiveSettings(token: string, eventId: string, payload: WorldCupEventbriteLocalePayload): Promise<void> {
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

async function refreshLiveEvent(
  token: string,
  eventId: string,
  payload: WorldCupEventbriteLocalePayload,
  coverMedia: EventbriteMedia,
  venueEbId: string,
): Promise<void> {
  const response = await eventbriteFetch(
    `${EVENTBRITE_API}/events/${eventId}/`,
    {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        event: {
          description: { html: payload.descriptionHtml },
          logo_id: coverMedia.id,
          venue_id: venueEbId,
        },
      }),
    },
    `${payload.marker} live refresh`,
  );
  if (!response.ok) {
    throw new Error(`${payload.marker}: live refresh failed: HTTP ${response.status} ${(await response.text()).slice(0, 200)}`);
  }
}

async function inspectLiveEvent(
  token: string,
  eventId: string,
  payload: WorldCupEventbriteLocalePayload,
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
    throw new Error(`${payload.marker}: live verification failed: ${failed.join(', ')}${gateFailure ? ` (${gateFailure})` : ''}`);
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
  const locales = requested && isEnabledLocale(requested) && requested !== 'en' && requested !== 'it'
    ? [requested]
    : PUBLISHABLE_LOCALES;
  const plans = locales.map((locale) => ({
    locale,
    eventbriteLocale: buildWorldCupEventbriteLocalePayloads(locale)[0].eventbriteLocale,
    count: 5,
    markers: buildWorldCupEventbriteLocalePayloads(locale).map((payload) => payload.marker),
  }));
  return NextResponse.json({
    ok: true,
    localeCount: locales.length,
    listingCount: locales.length * 5,
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
  if (!body.locale || !isEnabledLocale(body.locale) || body.locale === 'en' || body.locale === 'it') {
    return NextResponse.json({ ok: false, error: 'A supported non-EN/IT locale is required' }, { status: 400 });
  }
  const locale = body.locale as LocaleCode;
  const fromVariant = body.fromVariant === undefined ? 1 : Number(body.fromVariant);
  if (!Number.isInteger(fromVariant) || fromVariant < 1 || fromVariant > 5) {
    return NextResponse.json({ ok: false, error: 'fromVariant must be an integer from 1 to 5' }, { status: 400 });
  }
  const max = Math.min(6 - fromVariant, Math.max(1, Number(body.max) || (6 - fromVariant)));
  const partialResults: Array<Record<string, unknown>> = [];
  const deadline = Date.now() + REQUEST_DEADLINE_MS;
  let lease: RolloutLease | null = null;

  try {
    lease = await acquireRolloutLease(locale);
    if (!lease) {
      return NextResponse.json({ ok: false, locale, error: 'A publication wave for this locale is already running' }, { status: 409 });
    }
    const venueEbId = JUST_ME_EVENTBRITE_VENUE_ID;
    const existing = await listExistingEvents(token);
    const localPayloads = buildWorldCupEventbriteLocalePayloads(locale).slice(fromVariant - 1, fromVariant - 1 + max);
    localPayloads.forEach((payload) => validateWorldCupEventbriteLocalePayload(payload));

    const duplicates = new Map<string, ExistingEvent | undefined>();
    for (const payload of localPayloads) {
      const matches = exactWorldCupMarkerMatches(payload.marker, existing);
      const liveMatches = matches.filter((event) => event.status === 'live' || event.status === 'started');
      const draftMatches = matches.filter((event) => event.status === 'draft');
      const unknownMatches = matches.filter((event) => !['live', 'started', 'draft'].includes(String(event.status || '')));
      if (liveMatches.length > 1 || unknownMatches.length > 0) {
        throw new Error(`${payload.marker}: ambiguous exact-marker state (${liveMatches.length} live, ${draftMatches.length} draft, ${unknownMatches.length} unknown)`);
      }
      const live = liveMatches[0];
      if (live && (live.name?.text !== payload.title || live.start?.utc !== START_UTC)) {
        throw new Error(`${payload.marker}: exact marker belongs to a listing with unexpected title or date`);
      }
      for (const draft of draftMatches) {
        await deleteStaleDraft(token, draft.id);
        await sleep(500);
      }
      duplicates.set(payload.marker, live);
    }

    const sourceImages = [localPayloads[0].coverImage, ...localPayloads[0].imagePlan] as const;
    const uploadedMedia: EventbriteMedia[] = [];
    for (const image of sourceImages) {
      const bytes = await fetchPublicJpeg(image.src);
      const filename = new URL(image.src).pathname.split('/').pop() || `${locale}-world-cup.jpg`;
      uploadedMedia.push(await uploadMedia(token, bytes, filename));
      await sleep(500);
    }
    const [coverMedia, posterMedia, programmeMedia, targetMedia, dressMedia, afterpartyMedia] = uploadedMedia;
    if (!coverMedia || !posterMedia || !programmeMedia || !targetMedia || !dressMedia || !afterpartyMedia) {
      throw new Error(`${locale}: expected six uploaded Eventbrite media assets`);
    }
    const cdnTuple = [
      coverMedia.url,
      posterMedia.url,
      programmeMedia.url,
      targetMedia.url,
      dressMedia.url,
      afterpartyMedia.url,
    ] as const;
    const payloads = buildWorldCupEventbriteLocalePayloads(locale, cdnTuple).slice(fromVariant - 1, fromVariant - 1 + max);
    payloads.forEach((payload) => validateWorldCupEventbriteLocalePayload(payload, true));

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
      if (duplicate) {
        await refreshLiveEvent(token, duplicate.id, payload, coverMedia, venueEbId);
        await ensureLiveSettings(token, duplicate.id, payload);
        const verified = await inspectLiveEvent(token, duplicate.id, payload, venueEbId, coverMedia.id);
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
            await deleteStaleDraft(token, result.ebEventId);
          }
        }
        throw new Error(`${payload.marker}: ${result.reason || 'publication failed'}${result.ebEventId ? ` (draft ${result.ebEventId})` : ''}`);
      }
      await ensureLiveSettings(token, result.ebEventId, payload);
      const verified = await inspectLiveEvent(token, result.ebEventId, payload, venueEbId, coverMedia.id);
      partialResults.push({ ...verified, skipped: false });
      if (index < payloads.length - 1) await sleep(3_000);
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
      mediaUploaded: true,
      venueEbId,
    });
  } catch (error) {
    console.error('[publish-world-cup-locales]', locale, error);
    return NextResponse.json({
      ok: false,
      locale,
      completedBeforeFailure: partialResults,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 502 });
  } finally {
    try {
      await lease?.release();
    } catch (error) {
      console.error('[publish-world-cup-locales] lease release failed', locale, error);
    }
  }
}
