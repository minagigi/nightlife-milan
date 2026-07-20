#!/usr/bin/env npx tsx
import { loadEnvConfig } from '@next/env';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getEventbriteToken } from '../lib/eventbriteToken';

const API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const OUT = path.resolve('.Codex/work/2026-07-19-weekly-july20-remaining-locales');
const execute = process.argv.includes('--execute');
const audit = process.argv.includes('--audit');

const eventKeys = [
  'justme-university-2026-07-21',
  'justme-wednesday-2026-07-22',
  'justme-thursday-2026-07-23',
  'justme-friday-2026-07-24',
  'aria-friday-2026-07-24',
  'pineta-friday-2026-07-24',
  'aria-saturday-2026-07-25',
  'pineta-saturday-2026-07-25',
  'justme-sunday-2026-07-26',
] as const;

type Media = { id: string; url: string; path: string };
type EventRow = Record<string, any>;

const auth = (token: string) => ({ Authorization: `Bearer ${token}`, 'content-type': 'application/json' });
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function apiFetch(url: string, init: RequestInit, label: string): Promise<Response> {
  let response: Response | undefined;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    response = await fetch(url, init);
    if (response.status !== 429 && response.status < 500) return response;
    if (attempt < 6) {
      const retryAfter = Number(response.headers.get('retry-after'));
      await sleep(retryAfter > 0 ? retryAfter * 1000 : attempt * attempt * 1200);
    }
  }
  if (!response) throw new Error(`${label}: no response`);
  return response;
}

async function uploadMedia(token: string, filePath: string): Promise<Media> {
  const bytes = await readFile(filePath);
  const filename = path.basename(filePath);
  const prepared = await apiFetch(
    `${API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
    { headers: { Authorization: `Bearer ${token}` } },
    `prepare ${filename}`,
  );
  if (!prepared.ok) throw new Error(`prepare ${filename}: HTTP ${prepared.status} ${(await prepared.text()).slice(0, 240)}`);
  const info = await prepared.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
  form.append(info.file_parameter_name || 'file', new Blob([bytes], { type: 'image/png' }), filename);
  const uploaded = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!uploaded.ok) throw new Error(`upload ${filename}: HTTP ${uploaded.status} ${(await uploaded.text()).slice(0, 240)}`);
  const finalized = await apiFetch(
    `${API}/media/upload/`,
    { method: 'POST', headers: auth(token), body: JSON.stringify({ upload_token: info.upload_token }) },
    `finalize ${filename}`,
  );
  if (!finalized.ok) throw new Error(`finalize ${filename}: HTTP ${finalized.status} ${(await finalized.text()).slice(0, 240)}`);
  const saved = await finalized.json();
  const url = String(saved.original?.url || saved.url || '').replace(/&amp;/g, '&');
  if (!/^\d+$/.test(String(saved.id || '')) || !/^https:\/\/(?:img|cdn)\.evbuc\.com\//i.test(url)) {
    throw new Error(`invalid Eventbrite media for ${filename}`);
  }
  return { id: String(saved.id), url, path: filePath };
}

async function inventory(token: string): Promise<EventRow[]> {
  const base = `${API}/organizations/${ORG_ID}/events/?status=live,draft,started&time_filter=current_future&order_by=start_asc&page_size=200&expand=logo`;
  const events: EventRow[] = [];
  let continuation = '';
  do {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await apiFetch(url, { headers: auth(token) }, 'inventory');
    if (!response.ok) throw new Error(`inventory: HTTP ${response.status} ${(await response.text()).slice(0, 240)}`);
    const page = await response.json();
    events.push(...(page.events || []));
    continuation = page.pagination?.has_more_items ? String(page.pagination.continuation || '') : '';
  } while (continuation);
  return events;
}

function eventKeyFor(event: EventRow): typeof eventKeys[number] | undefined {
  const html = String(event.description?.html || '');
  return eventKeys.find((key) => html.includes(`nlm:curated=weekly-2026-07-20-${key}-`));
}

async function main() {
  loadEnvConfig(process.cwd());
  const token = getEventbriteToken();
  if (!token) throw new Error('EVENTBRITE_TOKEN is required');
  await mkdir(OUT, { recursive: true });
  const events = await inventory(token);
  const targets = events
    .map((event) => ({ event, eventKey: eventKeyFor(event) }))
    .filter((row): row is { event: EventRow; eventKey: typeof eventKeys[number] } => Boolean(row.eventKey));
  const collisions = new Map<string, number>();
  for (const { event } of targets) collisions.set(String(event.id), (collisions.get(String(event.id)) || 0) + 1);
  if ([...collisions.values()].some((count) => count !== 1)) throw new Error('event identity collision');

  const preflight = {
    generatedAt: new Date().toISOString(),
    inventory: events.length,
    targets: targets.length,
    byEventKey: Object.fromEntries(eventKeys.map((key) => [key, targets.filter((row) => row.eventKey === key).length])),
  };
  await writeFile(path.join(OUT, 'cover-v5-preflight.json'), `${JSON.stringify(preflight, null, 2)}\n`, 'utf8');
  if (audit) {
    const mediaMap = JSON.parse(await readFile(path.join(OUT, 'cover-v5-map.json'), 'utf8')) as Record<string, Media>;
    const applied = targets.filter(({ event, eventKey }) => String(event.logo_id || event.logo?.id || '') === mediaMap[eventKey]?.id);
    const report = {
      mode: 'audit',
      targets: targets.length,
      applied: applied.length,
      remaining: targets.length - applied.length,
      byEventKey: Object.fromEntries(eventKeys.map((key) => {
        const rows = targets.filter((row) => row.eventKey === key);
        return [key, { targets: rows.length, applied: rows.filter(({ event }) => String(event.logo_id || event.logo?.id || '') === mediaMap[key]?.id).length }];
      })),
    };
    await writeFile(path.join(OUT, 'cover-v5-audit.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  if (!execute) {
    console.log(JSON.stringify({ mode: 'preflight', ...preflight }, null, 2));
    return;
  }

  let mediaMap: Record<string, Media> = {};
  try {
    mediaMap = JSON.parse(await readFile(path.join(OUT, 'cover-v5-map.json'), 'utf8')) as Record<string, Media>;
  } catch { /* first run uploads below */ }
  for (const eventKey of eventKeys) {
    if (!mediaMap[eventKey]) {
      const filePath = path.resolve(`public/images/events/generated/weekly-2026-07-20/${eventKey}-en-cover-2x1-v5.png`);
      mediaMap[eventKey] = await uploadMedia(token, filePath);
      await sleep(900);
    }
  }
  await writeFile(path.join(OUT, 'cover-v5-map.json'), `${JSON.stringify(mediaMap, null, 2)}\n`, 'utf8');

  const rollback = targets.map(({ event, eventKey }) => ({
    id: String(event.id),
    eventKey,
    status: String(event.status || ''),
    url: String(event.url || ''),
    oldLogoId: String(event.logo_id || event.logo?.id || ''),
    newLogoId: mediaMap[eventKey]?.id || '',
  }));
  if (rollback.some((row) => !/^\d+$/.test(row.newLogoId))) throw new Error('uploaded cover map is incomplete');
  await writeFile(path.join(OUT, `cover-v5-rollback-${Date.now()}.json`), `${JSON.stringify(rollback, null, 2)}\n`, 'utf8');

  const results: Array<Record<string, unknown>> = [];
  for (const row of rollback) {
    if (row.oldLogoId === row.newLogoId) {
      results.push({ id: row.id, eventKey: row.eventKey, status: row.status, url: row.url, logoId: row.newLogoId, action: 'already-applied' });
      continue;
    }
    const response = await apiFetch(
      `${API}/events/${row.id}/`,
      { method: 'POST', headers: auth(token), body: JSON.stringify({ event: { logo_id: row.newLogoId } }) },
      `update ${row.id}`,
    );
    if (!response.ok) throw new Error(`update ${row.id}: HTTP ${response.status} ${(await response.text()).slice(0, 240)}`);
    const check = await apiFetch(`${API}/events/${row.id}/?expand=logo`, { headers: auth(token) }, `readback ${row.id}`);
    if (!check.ok) throw new Error(`readback ${row.id}: HTTP ${check.status}`);
    const saved = await check.json();
    const actual = String(saved.logo_id || saved.logo?.id || '');
    if (actual !== row.newLogoId) throw new Error(`readback ${row.id}: expected ${row.newLogoId}, got ${actual}`);
    results.push({ id: row.id, eventKey: row.eventKey, status: saved.status, url: saved.url, logoId: actual });
    await writeFile(path.join(OUT, 'cover-v5-results.partial.json'), `${JSON.stringify(results, null, 2)}\n`, 'utf8');
    await sleep(400);
  }
  await writeFile(path.join(OUT, 'cover-v5-results.json'), `${JSON.stringify(results, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ mode: 'execute', uploaded: Object.keys(mediaMap).length, updated: results.length, results }, null, 2));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : String(error));
  process.exitCode = 1;
});
