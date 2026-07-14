import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://nightlifemilan.com';
const DEFAULT_MANIFEST = 'artifacts/event-locales-manifest.json';
const DEFAULT_PROGRESS = 'C:/tmp/nlm-event-batch/publish-progress.json';
const PHONE = '+39 351 912 7047';

function parseArgs(argv) {
  const args = {
    execute: false,
    phase: 'all',
    manifest: DEFAULT_MANIFEST,
    progress: DEFAULT_PROGRESS,
    limit: Number.POSITIVE_INFINITY,
    delayMs: 3500,
    langs: null,
    bases: null,
  };

  for (const arg of argv) {
    if (arg === '--execute') args.execute = true;
    else if (arg === '--dry-run') args.execute = false;
    else if (arg.startsWith('--phase=')) args.phase = arg.slice('--phase='.length);
    else if (arg.startsWith('--manifest=')) args.manifest = arg.slice('--manifest='.length);
    else if (arg.startsWith('--progress=')) args.progress = arg.slice('--progress='.length);
    else if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length));
    else if (arg.startsWith('--delay-ms=')) args.delayMs = Number(arg.slice('--delay-ms='.length));
    else if (arg.startsWith('--langs=')) args.langs = new Set(arg.slice('--langs='.length).split(',').filter(Boolean));
    else if (arg.startsWith('--bases=')) args.bases = new Set(arg.slice('--bases='.length).split(',').filter(Boolean));
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!['all', 'existing', 'locales'].includes(args.phase)) {
    throw new Error('--phase must be all, existing, or locales');
  }
  if (!Number.isFinite(args.limit) && args.limit !== Number.POSITIVE_INFINITY) throw new Error('--limit must be numeric');
  if (!Number.isFinite(args.delayMs) || args.delayMs < 0) throw new Error('--delay-ms must be a non-negative number');
  return args;
}

function loadEnv(file = '.env.local') {
  const env = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const clean = line.replace(/^\uFEFF/, '').replace(/^\s*export\s+/, '');
    if (!/^\s*[A-Z0-9_]+\s*=/.test(clean)) continue;
    const index = clean.indexOf('=');
    env[clean.slice(0, index).trim()] = clean.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return env;
}

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
}

function writeJsonAtomic(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temporary, file);
}

function entryKey(entry) {
  return `${entry.mode}:${entry.base}:${entry.lang}`;
}

function validateEntry(entry) {
  const required = ['mode', 'base', 'lang', 'title', 'summary', 'descriptionHtml', 'ticketName', 'ticketDescription'];
  for (const field of required) {
    if (!entry[field]) throw new Error(`${entryKey(entry)} missing ${field}`);
  }
  if (!['update', 'create'].includes(entry.mode)) throw new Error(`${entryKey(entry)} has invalid mode`);
  if (entry.mode === 'update' && !entry.existingEventId) throw new Error(`${entryKey(entry)} missing existingEventId`);
  if (entry.mode === 'create' && (!entry.enEventId || !entry.slugEn)) throw new Error(`${entryKey(entry)} missing EN source data`);
  if (entry.title.length > 75) throw new Error(`${entryKey(entry)} title is ${entry.title.length}/75 chars`);
  if (entry.summary.length > 140) throw new Error(`${entryKey(entry)} summary is ${entry.summary.length}/140 chars`);
  if (!entry.summary.includes(PHONE)) throw new Error(`${entryKey(entry)} summary is missing WhatsApp phone`);
  if (entry.faqCount !== 25) throw new Error(`${entryKey(entry)} has ${entry.faqCount} FAQs instead of 25`);
  if (entry.imageCount !== 5) throw new Error(`${entryKey(entry)} has ${entry.imageCount} images instead of 5`);
  if (!entry.descriptionHtml.includes('nlm:src=')) throw new Error(`${entryKey(entry)} is missing the grouping marker`);
}

function selected(entry, args) {
  if (args.phase === 'existing' && entry.mode !== 'update') return false;
  if (args.phase === 'locales' && entry.mode !== 'create') return false;
  if (args.langs && !args.langs.has(entry.lang)) return false;
  if (args.bases && !args.bases.has(entry.base)) return false;
  return true;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function submit(entry, secret) {
  const isUpdate = entry.mode === 'update';
  const url = isUpdate
    ? `${SITE_URL}/api/admin/update-event-copy`
    : `${SITE_URL}/api/events/publish-locales`;
  const body = isUpdate
    ? {
        eventId: entry.existingEventId,
        title: entry.title,
        summary: entry.summary,
        descriptionHtml: entry.descriptionHtml,
      }
    : {
        base: entry.base,
        enEventId: entry.enEventId,
        slugEn: entry.slugEn,
        lang: entry.lang,
        title: entry.title,
        summary: entry.summary,
        descriptionHtml: entry.descriptionHtml,
        ticketName: entry.ticketName,
        ticketDescription: entry.ticketDescription,
      };

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const text = await response.text();
      const data = JSON.parse(text);
      if (response.ok && data.ok) return data;
      lastError = new Error(`HTTP ${response.status}: ${data.error || data.reason || text.slice(0, 200)}`);
      if (response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError = error;
    }
    if (attempt < 3) await sleep(attempt * 5000);
  }
  throw lastError || new Error('Unknown publish failure');
}

async function submitCreateBatch(entries, secret) {
  const items = entries.map((entry) => ({
    base: entry.base,
    enEventId: entry.enEventId,
    slugEn: entry.slugEn,
    lang: entry.lang,
    title: entry.title,
    summary: entry.summary,
    descriptionHtml: entry.descriptionHtml,
    ticketName: entry.ticketName,
    ticketDescription: entry.ticketDescription,
  }));
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${SITE_URL}/api/events/publish-locales`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const text = await response.text();
      const data = JSON.parse(text);
      if (response.ok && Array.isArray(data.results)) return data.results;
      lastError = new Error(`HTTP ${response.status}: ${data.error || text.slice(0, 200)}`);
      if (response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError = error;
    }
    if (attempt < 3) await sleep(attempt * 5000);
  }
  throw lastError || new Error('Unknown locale batch failure');
}

const args = parseArgs(process.argv.slice(2));
const manifestPath = path.resolve(args.manifest);
const manifest = readJson(manifestPath, null);
if (!manifest?.entries || !Array.isArray(manifest.entries)) throw new Error(`Invalid manifest: ${manifestPath}`);

for (const entry of manifest.entries) validateEntry(entry);

const ordered = manifest.entries
  .filter((entry) => selected(entry, args))
  .sort((a, b) => (a.mode === b.mode ? entryKey(a).localeCompare(entryKey(b)) : a.mode === 'update' ? -1 : 1));

const progress = readJson(args.progress, { version: 1, completed: {}, failed: {} });
const pending = ordered.filter((entry) => !progress.completed[entryKey(entry)]).slice(0, args.limit);
const summary = {
  execute: args.execute,
  phase: args.phase,
  manifestEntries: manifest.entries.length,
  selected: ordered.length,
  previouslyCompleted: ordered.length - pending.length,
  pending: pending.length,
  updates: pending.filter((entry) => entry.mode === 'update').length,
  creates: pending.filter((entry) => entry.mode === 'create').length,
};

console.log(JSON.stringify(summary));
if (!args.execute) process.exit(0);

const { CRON_SECRET } = loadEnv();
if (!CRON_SECRET) throw new Error('CRON_SECRET missing from .env.local');

const updates = pending.filter((entry) => entry.mode === 'update').map((entry) => [entry]);
const creates = pending.filter((entry) => entry.mode === 'create');
const createBatches = [];
for (let index = 0; index < creates.length; index += 10) createBatches.push(creates.slice(index, index + 10));
const workUnits = [...updates, ...createBatches];
let processed = 0;

for (let unitIndex = 0; unitIndex < workUnits.length; unitIndex += 1) {
  const unit = workUnits[unitIndex];
  try {
    const responses = unit[0].mode === 'update'
      ? [await submit(unit[0], CRON_SECRET)]
      : await submitCreateBatch(unit, CRON_SECRET);

    for (const entry of unit) {
      const key = entryKey(entry);
      const response = responses.find((item) => item.base === entry.base && item.lang === entry.lang) || responses[0];
      if (!response?.ok) {
        const reason = response?.reason || 'Batch response missing or failed';
        progress.failed[key] = { at: new Date().toISOString(), reason };
        console.error(JSON.stringify({ ok: false, index: processed + 1, total: pending.length, key, reason }));
        process.exitCode = 1;
        continue;
      }
      progress.completed[key] = {
        at: new Date().toISOString(),
        eventId: response.eventId || entry.existingEventId || null,
        url: response.url || null,
        skipped: response.skipped === true,
      };
      delete progress.failed[key];
      processed += 1;
      console.log(JSON.stringify({ ok: true, index: processed, total: pending.length, key, skipped: response.skipped === true }));
    }
    writeJsonAtomic(args.progress, progress);
    if (process.exitCode) break;
  } catch (error) {
    for (const entry of unit) {
      progress.failed[entryKey(entry)] = { at: new Date().toISOString(), reason: error.message };
    }
    writeJsonAtomic(args.progress, progress);
    console.error(JSON.stringify({ ok: false, unit: unitIndex + 1, reason: error.message }));
    process.exitCode = 1;
    break;
  }
  if (unitIndex < workUnits.length - 1) await sleep(args.delayMs);
}
