import { XMLParser } from 'fast-xml-parser';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE_ORIGIN = 'https://nightlifemilan.com';
export const SITEMAP_URL = `${SITE_ORIGIN}/sitemap.xml`;
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const BATCH_SIZE = 5000;
export const MAX_BATCH_SIZE = 10000;
export const DEFAULT_MAX_ATTEMPTS = 3;
const parser = new XMLParser({ ignoreAttributes: false, trimValues: true, parseTagValue: true });

export function parseCanonicalUrls(sitemapXml) {
  const parsed = parser.parse(sitemapXml);
  if (!parsed.urlset || typeof parsed.urlset !== 'object' || Array.isArray(parsed.urlset)) throw new Error('Sitemap must have a <urlset> root element.');
  const entries = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
  const uniqueUrls = new Set();
  for (const entry of entries) {
    const rawValue = entry?.loc;
    if (typeof rawValue !== 'string') throw new Error('Sitemap contains a <url> without a text <loc> value.');
    let url;
    try { url = new URL(rawValue); } catch { throw new Error('Sitemap contains an invalid canonical URL.'); }
    if (url.protocol !== 'https:' || url.hostname !== 'nightlifemilan.com' || url.port || url.username || url.password) throw new Error('Sitemap contains a canonical URL outside nightlifemilan.com.');
    url.hash = '';
    uniqueUrls.add(url.href);
  }
  if (uniqueUrls.size === 0) throw new Error('Sitemap contains no canonical URLs.');
  return [...uniqueUrls];
}

export function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
export function urlListDigest(urls) { return sha256(`${urls.join('\n')}\n`); }
export function batchUrls(urls, size = BATCH_SIZE) {
  if (!Number.isInteger(size) || size < 1 || size > MAX_BATCH_SIZE) throw new Error(`Batch size must be an integer from 1 to ${MAX_BATCH_SIZE}.`);
  const batches = [];
  for (let index = 0; index < urls.length; index += size) batches.push(urls.slice(index, index + size));
  return batches;
}
export function indexNowKeyLocation(key) { return `${SITE_ORIGIN}/${encodeURIComponent(key)}.txt`; }
function validateKey(key) {
  if (!/^[A-Za-z0-9-]{8,128}$/u.test(key)) throw new Error('INDEXNOW_KEY must contain 8-128 letters, numbers, or hyphens.');
}
function parseArguments(argv) {
  if (argv.some((argument) => argument !== '--submit')) throw new Error('Only --submit is supported. Omit it for a dry run.');
  return { submit: argv.includes('--submit') };
}
async function fetchSitemap(fetchImpl) {
  const response = await fetchImpl(SITEMAP_URL, { headers: { accept: 'application/xml,text/xml' } });
  if (response.status !== 200) throw new Error(`Sitemap request failed with HTTP ${response.status}.`);
  return parseCanonicalUrls(await response.text());
}
async function readJson(file) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch (error) { if (error?.code === 'ENOENT') return undefined; throw error; }
}
function manifestPath(workDir) { return path.join(workDir, 'approval-manifest.json'); }
function receiptPath(workDir, runId, batchNumber, batchDigest) { return path.join(workDir, 'receipts', runId, `batch-${String(batchNumber).padStart(4, '0')}-${batchDigest}.json`); }
async function writeJson(file, value) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}
function retryAfterMilliseconds(response, attempt) {
  const value = response.headers.get('retry-after');
  if (value) {
    const seconds = Number(value);
    if (Number.isFinite(seconds) && seconds >= 0) return Math.ceil(seconds * 1000);
    const time = Date.parse(value);
    if (!Number.isNaN(time)) return Math.max(0, time - Date.now());
  }
  return 1000 * (2 ** (attempt - 1));
}
async function submitBatch({ fetchImpl, key, keyLocation, urls, batchNumber, maxAttempts, sleepImpl, log }) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetchImpl(INDEXNOW_ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ host: 'nightlifemilan.com', key, keyLocation, urlList: urls }) });
    if (response.status === 200) return { status: 200, attempts: attempt };
    const retryable = response.status === 202 || response.status === 429 || response.status >= 500;
    if (!retryable) throw new Error(`IndexNow batch ${batchNumber} failed with HTTP ${response.status}.`);
    if (attempt === maxAttempts) return { status: response.status, attempts: attempt, incomplete: true };
    log(`status=retry batch=${batchNumber} urls=${urls.length}`);
    const delay = retryAfterMilliseconds(response, attempt);
    if (delay > 60_000) return { status: response.status, attempts: attempt, incomplete: true };
    await sleepImpl(delay);
  }
  throw new Error('Unreachable IndexNow retry state.');
}

export async function run({ argv = process.argv.slice(2), env = process.env, fetchImpl = fetch, workDir = path.resolve('.codex-work/indexnow'), maxAttempts = DEFAULT_MAX_ATTEMPTS, sleepImpl = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)), log = console.log } = {}) {
  const { submit } = parseArguments(argv);
  const key = env.INDEXNOW_KEY?.trim();
  if (submit && !key) throw new Error('INDEXNOW_KEY is required with --submit.');
  if (submit) validateKey(key);
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) throw new Error('maxAttempts must be a positive integer.');
  const urls = await fetchSitemap(fetchImpl);
  const digest = urlListDigest(urls);
  const batches = batchUrls(urls);
  const manifest = { urlCount: urls.length, urlDigest: digest };
  if (!submit) {
    await writeJson(manifestPath(workDir), { ...manifest, approvedAt: new Date().toISOString() });
    log(`status=dry-run urls=${urls.length} batches=${batches.length}`);
    return { submitted: false, urls: urls.length, batches: batches.length, urlDigest: digest };
  }
  const approvedManifest = await readJson(manifestPath(workDir));
  if (!approvedManifest || approvedManifest.urlCount !== manifest.urlCount || approvedManifest.urlDigest !== manifest.urlDigest) throw new Error('Current sitemap differs from the dry-run approval manifest. Run a new dry run before --submit.');
  const keyLocation = indexNowKeyLocation(key);
  const keyResponse = await fetchImpl(keyLocation, { headers: { accept: 'text/plain' } });
  if (keyResponse.status !== 200) throw new Error(`IndexNow key file request failed with HTTP ${keyResponse.status}.`);
  if ((await keyResponse.text()).trim() !== key) throw new Error('IndexNow key file content does not match INDEXNOW_KEY.');
  let incomplete = 0;
  for (let index = 0; index < batches.length; index += 1) {
    const urlsForBatch = batches[index];
    const batchNumber = index + 1;
    const batchDigest = urlListDigest(urlsForBatch);
    const receiptFile = receiptPath(workDir, digest, batchNumber, batchDigest);
    const existingReceipt = await readJson(receiptFile);
    if (existingReceipt?.status === 200 && existingReceipt.batch === batchNumber && existingReceipt.urlCount === urlsForBatch.length && existingReceipt.urlDigest === batchDigest) {
      log(`status=skipped batch=${batchNumber} urls=${urlsForBatch.length}`);
      continue;
    }
    const result = await submitBatch({ fetchImpl, key, keyLocation, urls: urlsForBatch, batchNumber, maxAttempts, sleepImpl, log });
    if (result.incomplete) { incomplete += 1; log(`status=pending batch=${batchNumber} urls=${urlsForBatch.length}`); break; }
    await writeJson(receiptFile, { completedAt: new Date().toISOString(), batch: batchNumber, urlCount: urlsForBatch.length, urlDigest: batchDigest, status: 200, attempts: result.attempts });
    log(`status=200 batch=${batchNumber} urls=${urlsForBatch.length}`);
  }
  if (incomplete > 0) return { submitted: false, incomplete: true, urls: urls.length, batches: batches.length, incompleteBatches: incomplete };
  return { submitted: true, urls: urls.length, batches: batches.length, urlDigest: digest };
}

const isDirectExecution = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectExecution) run().then((result) => { if (result.incomplete) process.exitCode = 1; }).catch((error) => { console.error(`status=failed ${error.message}`); process.exitCode = 1; });
