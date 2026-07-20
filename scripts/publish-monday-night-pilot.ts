#!/usr/bin/env npx tsx
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { getEventbriteToken } from '../lib/eventbriteToken';
import { publishOneLang, sleep } from '../lib/eventPublisher';
import { updateEventbriteConfirmation } from '../lib/eventbriteConfirmation';
import {
  buildMondayNightEventbritePayloads,
  type MondayNightLocale,
  validateMondayNightEventbritePayload,
} from '../lib/mondayNightEventbrite';
import {
  MONDAY_NIGHT_AFFILIATE_URL,
  MONDAY_NIGHT_END_UTC,
  MONDAY_NIGHT_START_UTC,
  MONDAY_NIGHT_VISUALS,
} from '../lib/weeklyJuly20Pilot';

const API = 'https://www.eventbriteapi.com/v3';
const JUST_ME_VENUE_ID = '295950971';
const CHECKPOINT_DIR = path.resolve('artifacts/weekly-2026-07-20/eventbrite');
const execute = process.argv.includes('--execute');
const localeArg = (process.argv.find((arg) => arg.startsWith('--locale='))?.split('=')[1] || 'all') as MondayNightLocale | 'all';
const max = Number(process.argv.find((arg) => arg.startsWith('--max='))?.split('=')[1] || '10');
const fromVariant = Number(process.argv.find((arg) => arg.startsWith('--from='))?.split('=')[1] || '1');

type Media = { id: string; url: string };
type Manifest = { cover: Media; body: [Media, Media, Media, Media, Media] };

const auth = (token: string) => ({ Authorization: `Bearer ${token}`, 'content-type': 'application/json' });

async function eventbriteFetch(url: string, init: RequestInit, label: string): Promise<Response> {
  let last: Response | undefined;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    last = await fetch(url, init);
    if (last.status !== 429 && last.status < 500) return last;
    if (attempt < 5) {
      const retryAfter = Number(last.headers.get('retry-after'));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : attempt * attempt * 1500);
    }
  }
  if (!last) throw new Error(`${label}: no response`);
  return last;
}

async function uploadMedia(token: string, filePath: string): Promise<Media> {
  const filename = path.basename(filePath);
  const bytes = await readFile(filePath);
  const mime = path.extname(filePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';
  const prepare = await eventbriteFetch(
    `${API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } },
    `prepare ${filename}`,
  );
  if (!prepare.ok) throw new Error(`Media preparation failed for ${filename}: HTTP ${prepare.status} ${(await prepare.text()).slice(0, 300)}`);
  const info = await prepare.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
  form.append(info.file_parameter_name || 'file', new Blob([bytes], { type: mime }), filename);
  const upload = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!upload.ok) throw new Error(`Media upload failed for ${filename}: HTTP ${upload.status} ${(await upload.text()).slice(0, 300)}`);
  const finalize = await eventbriteFetch(
    `${API}/media/upload/`,
    { method: 'POST', headers: auth(token), body: JSON.stringify({ upload_token: info.upload_token }) },
    `finalize ${filename}`,
  );
  if (!finalize.ok) throw new Error(`Media finalize failed for ${filename}: HTTP ${finalize.status} ${(await finalize.text()).slice(0, 300)}`);
  const saved = await finalize.json();
  const url = String(saved.original?.url || saved.url || '').replace(/&amp;/g, '&');
  if (!saved.id || !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url)) throw new Error(`Invalid Eventbrite media response for ${filename}`);
  return { id: String(saved.id), url };
}

function localAssets(locale: MondayNightLocale): { cover: string; body: [string, string, string, string, string] } {
  const root = path.resolve('public');
  const resolvePublic = (asset: string) => path.join(root, asset.replace(/^\//, ''));
  return {
    cover: resolvePublic(MONDAY_NIGHT_VISUALS[locale].cover),
    body: [
      resolvePublic(MONDAY_NIGHT_VISUALS[locale].poster),
      ...MONDAY_NIGHT_VISUALS.mood.map(resolvePublic),
    ] as [string, string, string, string, string],
  };
}

async function loadOrUploadManifest(token: string, locale: MondayNightLocale): Promise<Manifest> {
  const manifestPath = path.join(CHECKPOINT_DIR, `${locale}-media.json`);
  try {
    const cached = JSON.parse(await readFile(manifestPath, 'utf8')) as Manifest;
    const entries = [cached.cover, ...cached.body];
    if (entries.length === 6 && entries.every((entry) => /^\d+$/.test(entry.id) && /^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(entry.url))) return cached;
  } catch {
    // First run: upload the approved pilot media and persist a resumable manifest.
  }
  const assets = localAssets(locale);
  const cover = await uploadMedia(token, assets.cover);
  const body: Media[] = [];
  for (const asset of assets.body) {
    await sleep(1200);
    body.push(await uploadMedia(token, asset));
  }
  const manifest = { cover, body: body as Manifest['body'] };
  await mkdir(CHECKPOINT_DIR, { recursive: true });
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  return manifest;
}

async function fetchVenueEvents(token: string): Promise<Array<Record<string, any>>> {
  const base = `${API}/venues/${JUST_ME_VENUE_ID}/events/?status=live,draft,started&time_filter=current_future&order_by=start_desc&page_size=200&expand=venue,logo`;
  const events: Array<Record<string, any>> = [];
  let continuation: string | undefined;
  do {
    const response = await eventbriteFetch(continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base, { headers: auth(token) }, 'venue listing');
    if (!response.ok) throw new Error(`Venue listing failed: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
    const page = await response.json();
    events.push(...(page.events || []));
    continuation = page.pagination?.has_more_items ? page.pagination.continuation : undefined;
  } while (continuation);
  return events;
}

function markerMatches(events: Array<Record<string, any>>, marker: string) {
  const needle = `<!-- ${marker} -->`;
  return events.filter((event) => String(event.description?.html || '').includes(needle));
}

function hardGate(savedHtml: string, payload: ReturnType<typeof buildMondayNightEventbritePayloads>[number], urls: string[]): string | null {
  try {
    validateMondayNightEventbritePayload({ ...payload, descriptionHtml: savedHtml }, urls);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
}

async function unpublish(token: string, eventId: string): Promise<void> {
  await eventbriteFetch(`${API}/events/${eventId}/unpublish/`, { method: 'POST', headers: auth(token) }, `unpublish ${eventId}`);
}

async function deleteDraft(token: string, eventId: string): Promise<void> {
  const response = await eventbriteFetch(`${API}/events/${eventId}/`, { method: 'DELETE', headers: auth(token) }, `delete draft ${eventId}`);
  if (!response.ok && response.status !== 404) throw new Error(`Draft cleanup failed for ${eventId}: HTTP ${response.status} ${(await response.text()).slice(0, 300)}`);
}

async function auditEvent(token: string, eventId: string, payload: ReturnType<typeof buildMondayNightEventbritePayloads>[number], manifest: Manifest) {
  const [eventRes, settingsRes, musicRes] = await Promise.all([
    eventbriteFetch(`${API}/events/${eventId}/?expand=ticket_classes,venue,logo`, { headers: auth(token) }, `event audit ${eventId}`),
    eventbriteFetch(`${API}/events/${eventId}/ticket_buyer_settings/`, { headers: auth(token) }, `settings audit ${eventId}`),
    eventbriteFetch(`${API}/events/${eventId}/music_properties/`, { headers: auth(token) }, `music audit ${eventId}`),
  ]);
  if (!eventRes.ok || !settingsRes.ok || !musicRes.ok) throw new Error(`${payload.marker}: audit HTTP failure`);
  const event = await eventRes.json();
  const settings = await settingsRes.json();
  const music = await musicRes.json();
  const tickets = Array.isArray(event.ticket_classes) ? event.ticket_classes : [];
  const savedHtml = String(event.description?.html || '');
  const confirmation = `${settings.confirmation_message?.html || ''} ${settings.instructions?.html || ''}`;
  const failures = [
    event.status !== 'live' && 'status',
    String(event.venue_id || event.venue?.id || '') !== JUST_ME_VENUE_ID && 'venue',
    event.start?.utc !== MONDAY_NIGHT_START_UTC && 'start',
    event.end?.utc !== MONDAY_NIGHT_END_UTC && 'end',
    String(event.logo?.id || event.logo_id || '') !== manifest.cover.id && 'cover',
    hardGate(savedHtml, payload, manifest.body.map((item) => item.url)) && 'description',
    tickets.length !== 1 && 'ticket-count',
    tickets[0]?.name !== payload.ticket.name && 'ticket-name',
    !String(tickets[0]?.description || '').includes(MONDAY_NIGHT_AFFILIATE_URL) && 'ticket-description',
    !confirmation.includes(MONDAY_NIGHT_AFFILIATE_URL) && 'confirmation-link',
    !confirmation.includes(payload.confirmation.heading) && 'confirmation-context',
    !confirmation.includes('+39 351 912 7047') && 'confirmation-whatsapp',
    music.age_restriction !== '21+' && 'age',
    !String(music.door_time || '').startsWith('2026-07-20T17:30:00') && 'door-time',
  ].filter(Boolean);
  return { ok: failures.length === 0, failures, id: eventId, url: event.url, marker: payload.marker };
}

async function main() {
  if (!['all', 'en', 'it'].includes(localeArg)) throw new Error(`Unsupported locale: ${localeArg}`);
  if (!Number.isInteger(max) || max < 1 || max > 10 || !Number.isInteger(fromVariant) || fromVariant < 1 || fromVariant > 10) throw new Error('Invalid --max or --from');
  const locales: MondayNightLocale[] = localeArg === 'all' ? ['it', 'en'] : [localeArg];
  await mkdir(CHECKPOINT_DIR, { recursive: true });

  if (!execute) {
    const preview = locales.flatMap((locale) => buildMondayNightEventbritePayloads(locale, [
      'https://img.evbuc.com/pilot-poster', 'https://img.evbuc.com/pilot-arrival', 'https://img.evbuc.com/pilot-aperitivo', 'https://img.evbuc.com/pilot-lounge', 'https://img.evbuc.com/pilot-buffet',
    ]).slice(fromVariant - 1, fromVariant - 1 + max).map((payload) => ({ locale, variant: payload.variant, title: payload.title, summaryLength: payload.summary.length, descriptionLength: payload.descriptionHtml.length, faqCount: (payload.descriptionHtml.match(/data-event-faq/g) || []).length, imageCount: (payload.descriptionHtml.match(/<img /g) || []).length, marker: payload.marker })));
    console.log(JSON.stringify({ mode: 'dry-run', count: preview.length, preview }, null, 2));
    return;
  }

  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN is not configured');
  const existing = await fetchVenueEvents(token);
  const results: Array<Record<string, unknown>> = [];

  for (const locale of locales) {
    const manifest = await loadOrUploadManifest(token, locale);
    const payloads = buildMondayNightEventbritePayloads(locale, manifest.body.map((item) => item.url) as [string, string, string, string, string])
      .slice(fromVariant - 1, fromVariant - 1 + max);
    for (const payload of payloads) {
      const matches = markerMatches(existing, payload.marker);
      if (matches.length > 1) throw new Error(`${payload.marker}: duplicate live/draft markers (${matches.length})`);
      if (matches.length === 1) {
        if (matches[0].status === 'draft') {
          await deleteDraft(token, String(matches[0].id));
          const index = existing.indexOf(matches[0]);
          if (index >= 0) existing.splice(index, 1);
        } else {
        const audit = await auditEvent(token, String(matches[0].id), payload, manifest);
        if (audit.ok) {
          results.push({ action: 'existing', ...audit });
          continue;
        }
        throw new Error(`${payload.marker}: existing live listing failed readback: ${audit.failures.join(', ')}`);
        }
      }
      const published = await publishOneLang({
        token,
        venueEbId: JUST_ME_VENUE_ID,
        imageId: manifest.cover.id,
        startUtc: MONDAY_NIGHT_START_UTC,
        endUtc: MONDAY_NIGHT_END_UTC,
        title: payload.title,
        summary: payload.summary,
        description: payload.descriptionHtml,
        locale: payload.eventbriteLocale,
        lang: payload.locale,
        ageRestriction: '21+',
        doorTimeISO: MONDAY_NIGHT_START_UTC,
        ticketText: payload.ticket,
        validateSavedDescription: (savedHtml) => hardGate(savedHtml, payload, manifest.body.map((item) => item.url)),
      });
      if (!published.ok || !published.ebEventId) {
        if (published.ebEventId) await deleteDraft(token, published.ebEventId);
        throw new Error(`${payload.marker}: publish failed: ${published.reason || 'unknown error'}`);
      }
      const confirmation = await updateEventbriteConfirmation({
        token,
        eventId: published.ebEventId,
        locale: payload.locale,
        affiliateUrls: [MONDAY_NIGHT_AFFILIATE_URL],
        context: payload.confirmation,
      });
      if (!confirmation.ok) {
        await unpublish(token, published.ebEventId);
        throw new Error(`${payload.marker}: confirmation failed and event was unpublished: ${confirmation.reason || confirmation.status}`);
      }
      const audit = await auditEvent(token, published.ebEventId, payload, manifest);
      if (!audit.ok) {
        await unpublish(token, published.ebEventId);
        throw new Error(`${payload.marker}: readback failed and event was unpublished: ${audit.failures.join(', ')}`);
      }
      existing.push({ id: published.ebEventId, description: { html: payload.descriptionHtml } });
      results.push({ action: 'created', ...audit });
      await writeFile(path.join(CHECKPOINT_DIR, 'checkpoint.json'), JSON.stringify({ updatedAt: new Date().toISOString(), results }, null, 2), 'utf8');
      await sleep(1700);
    }
  }
  await writeFile(path.join(CHECKPOINT_DIR, 'checkpoint.json'), JSON.stringify({ updatedAt: new Date().toISOString(), results }, null, 2), 'utf8');
  console.log(JSON.stringify({ mode: 'execute', count: results.length, results }, null, 2));
}

main().catch((error) => {
  console.error(`[publish-monday-night-pilot] ${error instanceof Error ? error.stack || error.message : String(error)}`);
  process.exitCode = 1;
});
