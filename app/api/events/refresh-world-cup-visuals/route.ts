import { NextResponse } from 'next/server';
import { buildEventbriteConfirmationHtml } from '@/lib/eventbriteConfirmation';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { enabledLocaleCodes, isEnabledLocale, type LocaleCode } from '@/lib/i18n/locales';
import { buildWorldCupEventbriteEnPayloads } from '@/lib/worldCupEventbriteEn';
import { buildWorldCupEventbriteItPayloads } from '@/lib/worldCupEventbriteIt';
import {
  buildWorldCupEventbriteLocalePayloads,
  type WorldCupEventbriteImagePlan,
} from '@/lib/worldCupEventbriteLocales';
import { WORLD_CUP_FINAL_VISUAL_REVISION } from '@/lib/worldCupFinalVisuals';
import { WORLD_CUP_FINAL_AFFILIATE_URL } from '@/lib/worldCupFinalIt';
import {
  hasOnlyExpectedXceedAffiliate,
  htmlTextAndLinksExact,
  normalizeVisibleHtmlText,
} from '@/lib/worldCupVisualReadback';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const SITE = 'https://nightlifemilan.com';
const WORLD_CUP_START_UTC = '2026-07-19T17:30:00Z';

interface EventbriteEvent {
  id: string;
  status?: string;
  url?: string;
  start?: { utc?: string };
  description?: { html?: string };
  logo?: { id?: string; url?: string; original?: { url?: string } };
}

interface EventbritePage {
  events?: EventbriteEvent[];
  pagination?: { has_more_items?: boolean; continuation?: string };
}

interface ConfirmationSettings {
  confirmation_message?: { html?: string };
  instructions?: { html?: string };
}

interface EventbriteMedia {
  id: string;
  url: string;
}

interface PreparedPayload {
  locale: LocaleCode;
  marker: string;
  title: string;
  descriptionHtml: string;
  orderConfirmation: string;
  coverImage: WorldCupEventbriteImagePlan;
  imagePlan: readonly WorldCupEventbriteImagePlan[];
}

interface TargetListing {
  event: EventbriteEvent;
  payload: PreparedPayload;
}

function isAuthorized(request: Request): boolean {
  const bearer = request.headers.get('authorization');
  return Boolean(
    (process.env.CRON_SECRET && bearer === `Bearer ${process.env.CRON_SECRET}`)
      || (process.env.WORLD_CUP_PUBLISH_SECRET && bearer === `Bearer ${process.env.WORLD_CUP_PUBLISH_SECRET}`)
      || (process.env.WORLD_CUP_ROLLOUT_SECRET && bearer === `Bearer ${process.env.WORLD_CUP_ROLLOUT_SECRET}`),
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function absoluteAssetUrl(src: string): string {
  const url = new URL(src, SITE);
  if (url.protocol !== 'https:' || url.hostname !== 'nightlifemilan.com'
    || !url.pathname.startsWith('/images/events/generated/')) {
    throw new Error(`Untrusted World Cup asset URL: ${src}`);
  }
  return url.toString();
}

function trustedEventbriteImage(url: string): boolean {
  try {
    const parsed = new URL(url.replace(/&amp;/g, '&'));
    return parsed.protocol === 'https:' && /(^|\.)evbuc\.com$/i.test(parsed.hostname);
  } catch {
    return false;
  }
}

function decodeHtmlText(value: string): string {
  return normalizeVisibleHtmlText(value);
}

function extractImageTags(html: string): string[] {
  return [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
}

function responsiveImageTag(tag: string): boolean {
  const style = /\bstyle="([^"]*)"/i.exec(tag)?.[1] || '';
  return /(?:^|;)\s*display:\s*block\s*(?:;|$)/i.test(style)
    && /(?:^|;)\s*width:\s*100%\s*(?:;|$)/i.test(style)
    && /(?:^|;)\s*max-width:\s*100%\s*(?:;|$)/i.test(style)
    && /(?:^|;)\s*height:\s*auto\s*(?:;|$)/i.test(style);
}

function responsiveImageTags(tags: readonly string[]): boolean {
  return tags.length === 5 && tags.every(responsiveImageTag);
}

function imageLabelsComplete(tags: readonly string[], payload: PreparedPayload): boolean {
  return tags.length === payload.imagePlan.length && tags.every((tag, index) => {
    const alt = decodeHtmlText(/\balt="([^"]*)"/i.exec(tag)?.[1] || '');
    const title = decodeHtmlText(/\btitle="([^"]*)"/i.exec(tag)?.[1] || '');
    return alt === payload.imagePlan[index].alt && title === payload.imagePlan[index].title;
  });
}

interface FaqEntry {
  question: string;
  answer: string;
}

function extractFaqEntries(sourceHtml: string): FaqEntry[] {
  const wrapped = [...sourceHtml.matchAll(/<div\b[^>]*data-event-faq\s*=\s*"true"[^>]*>\s*<h3\b[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi)];
  const direct = [...sourceHtml.matchAll(/<h3\b[^>]*data-event-faq\s*=\s*"true"[^>]*>([\s\S]*?)<\/h3>\s*<p\b[^>]*>([\s\S]*?)<\/p>/gi)];
  return [...wrapped, ...direct].map((match) => ({
    question: decodeHtmlText(match[1]),
    answer: decodeHtmlText(match[2]),
  }));
}

function faqEntriesComplete(savedHtml: string, payload: PreparedPayload): boolean {
  const expected = extractFaqEntries(payload.descriptionHtml);
  const saved = extractFaqEntries(savedHtml);
  return expected.length === 25
    && saved.length === 25
    && JSON.stringify(saved) === JSON.stringify(expected);
}

function affiliateHrefExact(html: string): boolean {
  return hasOnlyExpectedXceedAffiliate(html, WORLD_CUP_FINAL_AFFILIATE_URL);
}

function confirmationFieldsExact(settings: ConfirmationSettings, payload: PreparedPayload): boolean {
  return htmlTextAndLinksExact(settings.confirmation_message?.html || '', payload.orderConfirmation)
    && htmlTextAndLinksExact(settings.instructions?.html || '', payload.orderConfirmation);
}

async function eventbrite<T>(token: string, pathOrUrl: string, init: RequestInit = {}): Promise<T> {
  const url = pathOrUrl.startsWith('http') ? pathOrUrl : `${EVENTBRITE_API}${pathOrUrl}`;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const response = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init.body ? { 'content-type': 'application/json' } : {}),
        ...init.headers,
      },
      cache: 'no-store',
    });
    if (response.ok) {
      const text = await response.text();
      return (text ? JSON.parse(text) : null) as T;
    }
    const body = (await response.text()).slice(0, 600);
    if ((response.status === 429 || response.status >= 500) && attempt < 6) {
      const retryAfter = Number(response.headers.get('retry-after') || 0);
      const reset = Number(response.headers.get('x-rate-limit-reset') || 0);
      const resetDelay = reset > 0 ? Math.max(0, reset * 1000 - Date.now()) : 0;
      await sleep(Math.min(120_000, Math.max(retryAfter * 1000, resetDelay, attempt * 5_000)));
      continue;
    }
    throw new Error(`${init.method || 'GET'} ${url} failed: ${response.status} ${body}`);
  }
  throw new Error(`Eventbrite retry budget exhausted for ${url}`);
}

function buildPreparedPayloads(
  locale: LocaleCode,
  cdnUrls?: readonly [string, string, string, string, string, string],
): PreparedPayload[] {
  if (locale === 'en') {
    return buildWorldCupEventbriteEnPayloads(cdnUrls?.slice(1)).map((payload) => ({
      locale,
      marker: payload.marker,
      title: payload.title,
      descriptionHtml: payload.descriptionHtml,
      orderConfirmation: buildEventbriteConfirmationHtml('en', [WORLD_CUP_FINAL_AFFILIATE_URL], {
        heading: payload.title,
        details: payload.orderConfirmation,
      }),
      coverImage: { src: payload.coverPath, title: payload.title, alt: payload.title },
      imagePlan: payload.imagePlan,
    }));
  }
  if (locale === 'it') {
    return buildWorldCupEventbriteItPayloads(cdnUrls?.slice(1)).map((payload) => ({
      locale,
      marker: payload.marker,
      title: payload.title,
      descriptionHtml: payload.descriptionHtml,
      orderConfirmation: buildEventbriteConfirmationHtml('it', [WORLD_CUP_FINAL_AFFILIATE_URL], {
        heading: payload.title,
        details: payload.orderConfirmation,
      }),
      coverImage: { src: payload.coverPath, title: payload.title, alt: payload.title },
      imagePlan: payload.imagePlan,
    }));
  }
  return buildWorldCupEventbriteLocalePayloads(locale, cdnUrls).map((payload) => ({
    locale,
    marker: payload.marker,
    title: payload.title,
    descriptionHtml: payload.descriptionHtml,
    orderConfirmation: payload.orderConfirmation,
    coverImage: payload.coverImage,
    imagePlan: payload.imagePlan,
  }));
}

function allPayloadsByMarker(): Map<string, PreparedPayload> {
  const payloads = enabledLocaleCodes.flatMap((locale) => buildPreparedPayloads(locale));
  return new Map(payloads.map((payload) => [payload.marker, payload]));
}

async function listLiveTargets(token: string): Promise<TargetListing[]> {
  // Eventbrite embeds the full description in organization listings. Pages of
  // 200 exceed the upstream gateway limit now that the World Cup set is large.
  // Small pages plus the exact start-time boundary keep the inventory complete
  // without downloading unrelated later events.
  const base = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&order_by=start_asc&page_size=50&time_filter=current_future`;
  const events: EventbriteEvent[] = [];
  let continuation: string | undefined;
  do {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const page = await eventbrite<EventbritePage>(token, url);
    const pageEvents = page.events || [];
    events.push(...pageEvents);
    continuation = page.pagination?.has_more_items ? page.pagination.continuation : undefined;
    const latestStart = pageEvents.reduce<string | undefined>((latest, event) => {
      const start = event.start?.utc;
      return start && (!latest || start > latest) ? start : latest;
    }, undefined);
    if (latestStart && latestStart > WORLD_CUP_START_UTC) continuation = undefined;
  } while (continuation);

  const payloadMap = allPayloadsByMarker();
  const markers = [...payloadMap.keys()];
  return events.filter((event) => event.start?.utc === WORLD_CUP_START_UTC).flatMap((event) => {
    const html = event.description?.html || '';
    const matches = markers.filter((marker) => html.includes(marker));
    if (matches.length === 0) return [];
    if (matches.length !== 1) throw new Error(`Event ${event.id} has ${matches.length} prepared World Cup markers`);
    return [{ event, payload: payloadMap.get(matches[0])! }];
  }).sort((a, b) => a.payload.locale.localeCompare(b.payload.locale)
    || a.payload.marker.localeCompare(b.payload.marker)
    || a.event.id.localeCompare(b.event.id));
}

async function targetsByVerifiedIds(
  token: string,
  locale: LocaleCode,
  rawIds: readonly string[],
): Promise<TargetListing[]> {
  const eventIds = [...new Set(rawIds)];
  if (eventIds.length < 5 || eventIds.length > 25 || eventIds.some((id) => !/^\d+$/.test(id))) {
    throw new Error(`${locale}: expected 5-25 unique numeric Eventbrite IDs`);
  }
  const payloadMap = allPayloadsByMarker();
  const markers = [...payloadMap.keys()];
  const events: EventbriteEvent[] = [];
  for (let index = 0; index < eventIds.length; index += 5) {
    events.push(...await Promise.all(eventIds.slice(index, index + 5)
      .map((id) => eventbrite<EventbriteEvent>(token, `/events/${id}/`))));
  }
  const targets = events.map((event) => {
    if (event.status !== 'live' && event.status !== 'started') {
      throw new Error(`${locale}: event ${event.id} is not live`);
    }
    if (event.start?.utc !== WORLD_CUP_START_UTC) {
      throw new Error(`${locale}: event ${event.id} has an unexpected start`);
    }
    const html = event.description?.html || '';
    const matches = markers.filter((marker) => html.includes(marker));
    if (matches.length !== 1) throw new Error(`${locale}: event ${event.id} has ${matches.length} prepared markers`);
    const payload = payloadMap.get(matches[0])!;
    if (payload.locale !== locale) throw new Error(`${locale}: event ${event.id} belongs to ${payload.locale}`);
    return { event, payload };
  });
  if (new Set(targets.map(({ payload }) => payload.marker)).size !== 5) {
    throw new Error(`${locale}: verified IDs do not cover exactly five markers`);
  }
  return targets.sort((a, b) => a.payload.marker.localeCompare(b.payload.marker)
    || a.event.id.localeCompare(b.event.id));
}

async function targetsByInventoryPairs(
  token: string,
  locale: LocaleCode,
  rawTargets: readonly { eventId?: string; marker?: string }[],
): Promise<TargetListing[]> {
  const payloadMap = allPayloadsByMarker();
  const seenIds = new Set<string>();
  const expectedMarkerById = new Map<string, string>();
  rawTargets.forEach((raw) => {
    const eventId = String(raw.eventId || '');
    const marker = String(raw.marker || '');
    if (!/^\d+$/.test(eventId) || seenIds.has(eventId)) throw new Error(`${locale}: invalid or duplicate inventory event ID`);
    seenIds.add(eventId);
    const payload = payloadMap.get(marker);
    if (!payload || payload.locale !== locale) throw new Error(`${locale}: invalid inventory marker ${marker}`);
    expectedMarkerById.set(eventId, marker);
  });
  if (expectedMarkerById.size < 5 || expectedMarkerById.size > 25
    || new Set(expectedMarkerById.values()).size !== 5) {
    throw new Error(`${locale}: inventory pairs must cover 5-25 listings and exactly five markers`);
  }

  // Never trust the caller's ID/marker association as write authority. Re-read
  // every Eventbrite event and fail closed unless its live body proves the same
  // exact prepared marker, locale, and World Cup start before any mutation.
  const verified = await targetsByVerifiedIds(token, locale, [...expectedMarkerById.keys()]);
  for (const target of verified) {
    const expectedMarker = expectedMarkerById.get(target.event.id);
    if (expectedMarker !== target.payload.marker) {
      throw new Error(`${locale}: event ${target.event.id} does not contain its supplied inventory marker`);
    }
  }
  return verified;
}

function savedVisualsComplete(html: string, payload: PreparedPayload): boolean {
  const tags = extractImageTags(html);
  const urls = tags.map((tag) => /\bsrc="([^"]+)"/i.exec(tag)?.[1]?.replace(/&amp;/g, '&') || '');
  return urls.length === 5
    && urls.every(trustedEventbriteImage)
    && html.includes(`nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION}`)
    && imageLabelsComplete(tags, payload)
    && responsiveImageTags(tags)
    && faqEntriesComplete(html, payload)
    && affiliateHrefExact(html);
}

function inventory(targets: TargetListing[]) {
  const locales = [...new Set(targets.map(({ payload }) => payload.locale))].sort();
  const byLocale = Object.fromEntries(locales.map((locale) => {
    const localized = targets.filter(({ payload }) => payload.locale === locale);
    return [locale, {
      listings: localized.length,
      uniqueMarkers: new Set(localized.map(({ payload }) => payload.marker)).size,
      visualsComplete: localized.filter(({ event, payload }) => savedVisualsComplete(event.description?.html || '', payload)).length,
      eventIds: localized.map(({ event }) => event.id),
      targets: localized.map(({ event, payload }) => ({ eventId: event.id, marker: payload.marker })),
    }];
  }));
  return {
    total: targets.length,
    localeCount: locales.length,
    expectedLocaleCount: enabledLocaleCodes.length,
    uniqueMarkerCount: new Set(targets.map(({ payload }) => payload.marker)).size,
    expectedUniqueMarkerCount: enabledLocaleCodes.length * 5,
    duplicateListingCount: targets.length - new Set(targets.map(({ payload }) => payload.marker)).size,
    visualsComplete: targets.filter(({ event, payload }) => savedVisualsComplete(event.description?.html || '', payload)).length,
    missingLocales: enabledLocaleCodes.filter((locale) => !locales.includes(locale)),
    incompleteMarkerLocales: locales.filter((locale) => {
      const localized = targets.filter(({ payload }) => payload.locale === locale);
      return new Set(localized.map(({ payload }) => payload.marker)).size !== 5;
    }),
    locales,
    byLocale,
  };
}

async function fetchPublicJpeg(image: WorldCupEventbriteImagePlan): Promise<{ bytes: Uint8Array; filename: string }> {
  const url = new URL(absoluteAssetUrl(image.src));
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Asset fetch failed for ${url.pathname}: HTTP ${response.status}`);
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('image/jpeg')) throw new Error(`Asset ${url.pathname} is not a JPEG (${contentType})`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 100_000 || bytes.length > 5_000_000) {
    throw new Error(`Asset ${url.pathname} has an invalid size (${bytes.length})`);
  }
  return { bytes, filename: url.pathname.split('/').pop() || 'world-cup.jpg' };
}

async function uploadMedia(token: string, image: WorldCupEventbriteImagePlan): Promise<EventbriteMedia> {
  const { bytes, filename } = await fetchPublicJpeg(image);
  const info = await eventbrite<Record<string, unknown>>(token, `/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`);
  const uploadUrl = String(info.upload_url || '');
  const uploadToken = String(info.upload_token || '');
  const fileParameterName = String(info.file_parameter_name || 'file');
  if (!uploadUrl || !uploadToken) throw new Error(`Media preparation was incomplete for ${filename}`);

  const form = new FormData();
  for (const [key, value] of Object.entries((info.upload_data || {}) as Record<string, unknown>)) {
    form.append(key, String(value ?? ''));
  }
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  form.append(fileParameterName, new Blob([buffer], { type: 'image/jpeg' }), filename);
  const uploaded = await fetch(uploadUrl, { method: 'POST', body: form });
  if (!uploaded.ok) throw new Error(`Media upload failed for ${filename}: HTTP ${uploaded.status} ${(await uploaded.text()).slice(0, 200)}`);

  const media = await eventbrite<{ id?: string; url?: string; original?: { url?: string } }>(token, '/media/upload/', {
    method: 'POST',
    body: JSON.stringify({ upload_token: uploadToken }),
  });
  const url = String(media.original?.url || media.url || '').replace(/&amp;/g, '&');
  if (!media.id || !trustedEventbriteImage(url)) throw new Error(`Media finalize was invalid for ${filename}`);
  return { id: String(media.id), url };
}

async function uploadLocaleMedia(token: string, payload: PreparedPayload): Promise<{
  cover: EventbriteMedia;
  body: [EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia, EventbriteMedia];
}> {
  const sources = [payload.coverImage, ...payload.imagePlan];
  if (sources.length !== 6) throw new Error(`${payload.locale}: expected one cover and five body sources`);
  const media: EventbriteMedia[] = [];
  for (const image of sources) {
    media.push(await uploadMedia(token, image));
    await sleep(500);
  }
  const [cover, poster, programme, target, dress, afterparty] = media;
  if (!cover || !poster || !programme || !target || !dress || !afterparty) {
    throw new Error(`${payload.locale}: six Eventbrite media uploads were not returned`);
  }
  return { cover, body: [poster, programme, target, dress, afterparty] };
}

async function updateAndVerify(
  token: string,
  listing: TargetListing,
  payload: PreparedPayload,
  cover: EventbriteMedia,
  bodyMedia: readonly EventbriteMedia[],
) {
  await eventbrite(token, `/events/${listing.event.id}/`, {
    method: 'POST',
    body: JSON.stringify({ event: { description: { html: payload.descriptionHtml }, logo_id: cover.id } }),
  });
  await eventbrite(token, `/events/${listing.event.id}/ticket_buyer_settings/`, {
    method: 'POST',
    body: JSON.stringify({
      ticket_buyer_settings: {
        confirmation_message: { html: payload.orderConfirmation },
        instructions: { html: payload.orderConfirmation },
      },
    }),
  });

  const [savedEvent, settings] = await Promise.all([
    eventbrite<EventbriteEvent>(token, `/events/${listing.event.id}/`),
    eventbrite<ConfirmationSettings>(token, `/events/${listing.event.id}/ticket_buyer_settings/`),
  ]);
  const savedHtml = savedEvent.description?.html || '';
  const savedTags = extractImageTags(savedHtml);
  const savedUrls = savedTags.map((tag) => /\bsrc="([^"]+)"/i.exec(tag)?.[1]?.replace(/&amp;/g, '&') || '');
  const expectedUrls = bodyMedia.map(({ url }) => url);
  const checks = {
    markerExact: savedHtml.includes(payload.marker),
    visualRevisionExact: savedHtml.includes(`nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION}`),
    imageSequenceExact: JSON.stringify(savedUrls) === JSON.stringify(expectedUrls),
    imageLabelsExact: imageLabelsComplete(savedTags, payload),
    responsiveImages: responsiveImageTags(savedTags),
    faqEntriesExact: faqEntriesComplete(savedHtml, payload),
    affiliateHrefExact: affiliateHrefExact(savedHtml),
    coverIdExact: String(savedEvent.logo?.id || '') === cover.id,
    confirmationFieldsExact: confirmationFieldsExact(settings, payload),
  };
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  if (failed.length > 0) {
    const diagnostic = {
      eventId: savedEvent.id,
      savedLength: savedHtml.length,
      imageCount: savedTags.length,
      faqAttributeCount: (savedHtml.match(/data-event-faq\s*=\s*"true"/gi) || []).length,
      sourceFaqCount: extractFaqEntries(payload.descriptionHtml).length,
      savedFaqCount: extractFaqEntries(savedHtml).length,
      responsiveCount: savedTags.filter(responsiveImageTag).length,
      altCount: savedTags.filter((tag) => /\balt="[^"]+"/i.test(tag)).length,
      titleCount: savedTags.filter((tag) => /\btitle="[^"]+"/i.test(tag)).length,
    };
    throw new Error(`${payload.marker}: live visual readback failed: ${failed.join(', ')} ${JSON.stringify(diagnostic)}`);
  }
  return {
    eventId: savedEvent.id,
    eventUrl: savedEvent.url || listing.event.url,
    marker: payload.marker,
    locale: payload.locale,
    checks,
  };
}

async function refreshCoverAndVerifyExisting(
  token: string,
  listing: TargetListing,
  cover: EventbriteMedia,
) {
  await eventbrite(token, `/events/${listing.event.id}/`, {
    method: 'POST',
    body: JSON.stringify({ event: { logo_id: cover.id } }),
  });
  const [savedEvent, settings] = await Promise.all([
    eventbrite<EventbriteEvent>(token, `/events/${listing.event.id}/`),
    eventbrite<ConfirmationSettings>(token, `/events/${listing.event.id}/ticket_buyer_settings/`),
  ]);
  const savedHtml = savedEvent.description?.html || '';
  const checks = {
    bodyVisualsExact: savedVisualsComplete(savedHtml, listing.payload),
    coverIdExact: String(savedEvent.logo?.id || '') === cover.id,
    confirmationFieldsExact: confirmationFieldsExact(settings, listing.payload),
  };
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  if (failed.length > 0) {
    throw new Error(`${listing.payload.marker}: resume readback failed: ${failed.join(', ')}`);
  }
  return {
    eventId: savedEvent.id,
    eventUrl: savedEvent.url || listing.event.url,
    marker: listing.payload.marker,
    locale: listing.payload.locale,
    checks,
  };
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
  try {
    const targets = await listLiveTargets(token);
    return NextResponse.json({ ok: true, inventory: inventory(targets) });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  try {
    const body = await request.json().catch(() => ({})) as {
      locale?: string;
      apply?: boolean;
      resumeAudit?: boolean;
      eventIds?: string[];
      targets?: { eventId?: string; marker?: string }[];
    };
    if (!body.locale || !isEnabledLocale(body.locale)) {
      return NextResponse.json({ ok: false, error: 'An enabled locale is required' }, { status: 400 });
    }
    const locale = body.locale;
    const targets = Array.isArray(body.targets)
      ? await targetsByInventoryPairs(token, locale, body.targets)
      : await targetsByVerifiedIds(token, locale, Array.isArray(body.eventIds) ? body.eventIds : []);
    if (targets.length === 0) {
      return NextResponse.json({ ok: false, locale, error: 'No existing live World Cup listings for this locale' }, { status: 404 });
    }
    const uniqueMarkers = new Set(targets.map(({ payload }) => payload.marker));
    if (uniqueMarkers.size > 5) throw new Error(`${locale}: unexpected marker count ${uniqueMarkers.size}`);
    if (body.apply !== true) {
      return NextResponse.json({
        ok: true,
        dryRun: true,
        locale,
        listings: targets.length,
        uniqueMarkers: uniqueMarkers.size,
        eventIds: targets.map(({ event }) => event.id),
      });
    }

    if (body.resumeAudit === true) {
      const cover = await uploadMedia(token, buildPreparedPayloads(locale)[0].coverImage);
      const results = [];
      for (const target of targets) {
        results.push(await refreshCoverAndVerifyExisting(token, target, cover));
        await sleep(300);
      }
      return NextResponse.json({
        ok: true,
        resumeAudit: true,
        locale,
        processed: results.length,
        uploadedMedia: 1,
        results,
      });
    }

    const basePayload = buildPreparedPayloads(locale)[0];
    const uploaded = await uploadLocaleMedia(token, basePayload);
    const cdnUrls = [uploaded.cover.url, ...uploaded.body.map(({ url }) => url)] as [string, string, string, string, string, string];
    const cdnPayloads = new Map(buildPreparedPayloads(locale, cdnUrls).map((payload) => [payload.marker, payload]));
    const results = [];
    for (const target of targets) {
      const payload = cdnPayloads.get(target.payload.marker);
      if (!payload) throw new Error(`${target.payload.marker}: CDN payload was not prepared`);
      results.push(await updateAndVerify(token, target, payload, uploaded.cover, uploaded.body));
      await sleep(350);
    }
    return NextResponse.json({
      ok: true,
      dryRun: false,
      locale,
      uploadedMedia: 6,
      processed: results.length,
      uniqueMarkers: uniqueMarkers.size,
      results,
    });
  } catch (error) {
    console.error('[refresh-world-cup-visuals]', error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : String(error) }, { status: 502 });
  }
}
