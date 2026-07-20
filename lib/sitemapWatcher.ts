import { randomUUID } from 'node:crypto';
import { BlobPreconditionFailedError, del, get, put } from '@vercel/blob';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import type { SitemapResult } from './googleIndexing';

export const SITEMAP_WATCH_STATE_PATH = 'indexing/sitemap-watch-v1.json';
export const SITEMAP_WATCH_LOCK_PATH = 'indexing/sitemap-watch-v1.lock.json';
const SITEMAP_WATCH_LEASE_MS = 2 * 60 * 1000;

export interface SitemapWatchState {
  version: 1;
  sitemapUrl: string;
  urls: string[];
  checkedAt: string;
  submittedAt?: string;
}

export interface SitemapUrlDiff {
  addedUrls: string[];
  removedUrls: string[];
}

export interface SitemapWatchResult extends SitemapUrlDiff {
  ok: boolean;
  action: 'submitted' | 'already-submitted' | 'submission-failed' | 'busy';
  baseline: boolean;
  currentUrlCount: number;
  persisted: boolean;
  sitemap?: SitemapResult;
}

interface SitemapWatchLease {
  release: () => Promise<void>;
}

interface RunSitemapWatchCycleOptions {
  acquire: () => Promise<SitemapWatchLease | null>;
  observe: () => Promise<string[]>;
  read: () => Promise<SitemapWatchState | null>;
  save: (state: SitemapWatchState) => Promise<void>;
  submit: () => Promise<SitemapResult>;
  sitemapUrl: string;
  now: () => string;
}

interface SitemapWatchLockRecord {
  owner: string;
  expiresAt: string;
}

interface StoredLockRecord {
  record: SitemapWatchLockRecord;
  etag: string;
}

interface ApplySitemapSnapshotOptions {
  previous: SitemapWatchState | null;
  currentUrls: string[];
  sitemapUrl: string;
  now: string;
  submit: () => Promise<SitemapResult>;
  save: (state: SitemapWatchState) => Promise<void>;
}

const sitemapXmlParser = new XMLParser({
  cdataPropName: '#cdata',
  ignoreAttributes: true,
  parseTagValue: false,
  preserveOrder: true,
  trimValues: false,
});

type OrderedXmlNode = Record<string, unknown>;

function isXml10CodePoint(codePoint: number): boolean {
  return codePoint === 0x9
    || codePoint === 0xa
    || codePoint === 0xd
    || (codePoint >= 0x20 && codePoint <= 0xd7ff)
    || (codePoint >= 0xe000 && codePoint <= 0xfffd)
    || (codePoint >= 0x10000 && codePoint <= 0x10ffff);
}

function validateXmlEntities(xml: string): void {
  const entitySource = xml
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  if (/<!DOCTYPE\b/i.test(entitySource)) throw new Error('Sitemap XML must not contain a DOCTYPE');
  for (const match of entitySource.matchAll(/&([^;\s<&]+);/g)) {
    const entity = match[1];
    if (/^(amp|lt|gt|quot|apos)$/.test(entity)) continue;
    const numeric = entity.match(/^#(\d+)$/);
    const hex = entity.match(/^#x([0-9a-f]+)$/i);
    const codePoint = numeric
      ? Number.parseInt(numeric[1], 10)
      : hex
        ? Number.parseInt(hex[1], 16)
        : Number.NaN;
    if (!Number.isInteger(codePoint) || !isXml10CodePoint(codePoint)) {
      throw new Error(`Invalid XML entity: &${entity};`);
    }
  }
}

function decodeNumericXmlReferences(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(Number.parseInt(decimal, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)));
}

function readOrderedText(nodes: OrderedXmlNode[], insideCdata = false): string {
  let value = '';
  for (const node of nodes) {
    if ('#text' in node) {
      if (typeof node['#text'] !== 'string') throw new Error('Invalid sitemap text node');
      value += insideCdata ? node['#text'] : decodeNumericXmlReferences(node['#text']);
      continue;
    }
    if ('#cdata' in node) {
      if (!Array.isArray(node['#cdata'])) throw new Error('Invalid sitemap CDATA node');
      value += readOrderedText(node['#cdata'] as OrderedXmlNode[], true);
      continue;
    }
    const keys = Object.keys(node);
    if (keys.every((key) => key.startsWith('?'))) continue;
    throw new Error('Sitemap <loc> must contain character data only');
  }
  return value.trim();
}

/** Extracts a canonical, unique and sorted URL set from a URL-set sitemap. */
export function extractSitemapUrls(xml: string, allowedOrigin: string): string[] {
  const validation = XMLValidator.validate(xml);
  if (validation !== true) {
    throw new Error(`Invalid sitemap XML: ${validation.err.msg}`);
  }
  validateXmlEntities(xml);
  const document = sitemapXmlParser.parse(xml) as OrderedXmlNode[];
  const rootNodes = document.filter((node) => 'urlset' in node);
  if (rootNodes.length !== 1 || !Array.isArray(rootNodes[0].urlset)) {
    throw new Error('Sitemap must be a non-empty <urlset> document');
  }

  const origin = new URL(allowedOrigin).origin;
  const urls = new Set<string>();
  const entries: OrderedXmlNode[] = [];
  for (const node of rootNodes[0].urlset as OrderedXmlNode[]) {
    if ('url' in node) {
      entries.push(node);
      continue;
    }
    if ('#text' in node && typeof node['#text'] === 'string' && node['#text'].trim() === '') continue;
    if (Object.keys(node).every((key) => key.startsWith('?'))) continue;
    throw new Error(`Unexpected element under sitemap <urlset>: ${Object.keys(node)[0] || 'unknown'}`);
  }
  if (entries.length === 0) throw new Error('Sitemap must be a non-empty <urlset> document');

  for (const entry of entries) {
    if (!Array.isArray(entry.url)) throw new Error('Invalid sitemap <url> entry');
    const locNodes = (entry.url as OrderedXmlNode[]).filter((node) => 'loc' in node);
    if (locNodes.length !== 1 || !Array.isArray(locNodes[0].loc)) {
      throw new Error('Each sitemap <url> entry must contain exactly one <loc>');
    }
    const raw = readOrderedText(locNodes[0].loc as OrderedXmlNode[]);
    if (raw === '') throw new Error('Sitemap <loc> must not be empty');
    let parsed: URL;
    try {
      parsed = new URL(raw);
    } catch {
      throw new Error(`Invalid URL in sitemap: ${raw.slice(0, 160)}`);
    }
    if (parsed.protocol !== 'https:' || parsed.origin !== origin) {
      throw new Error(`Unexpected sitemap origin: ${parsed.origin}`);
    }
    if (parsed.hash) throw new Error(`Sitemap URL must not contain a fragment: ${raw.slice(0, 160)}`);
    urls.add(parsed.toString());
  }

  const sorted = [...urls].sort((a, b) => a.localeCompare(b));
  if (sorted.length === 0) throw new Error('Sitemap contains no valid <loc> URLs');
  return sorted;
}

/** Runs the complete observation transaction under one distributed lease. */
export async function runSitemapWatchCycle({
  acquire,
  observe,
  read,
  save,
  submit,
  sitemapUrl,
  now,
}: RunSitemapWatchCycleOptions): Promise<SitemapWatchResult> {
  const lease = await acquire();
  if (!lease) {
    return {
      ok: true,
      action: 'busy',
      baseline: false,
      currentUrlCount: 0,
      persisted: false,
      addedUrls: [],
      removedUrls: [],
    };
  }

  try {
    const currentUrls = await observe();
    const previous = await read();
    return await applySitemapSnapshot({
      previous,
      currentUrls,
      sitemapUrl,
      now: now(),
      submit,
      save,
    });
  } finally {
    await lease.release();
  }
}

export function diffSitemapUrls(previousUrls: string[], currentUrls: string[]): SitemapUrlDiff {
  const previous = new Set(previousUrls);
  const current = new Set(currentUrls);
  return {
    addedUrls: [...current].filter((url) => !previous.has(url)).sort((a, b) => a.localeCompare(b)),
    removedUrls: [...previous].filter((url) => !current.has(url)).sort((a, b) => a.localeCompare(b)),
  };
}

function nextState(
  currentUrls: string[],
  sitemapUrl: string,
  now: string,
  submittedAt?: string,
): SitemapWatchState {
  return {
    version: 1,
    sitemapUrl,
    urls: [...new Set(currentUrls)].sort((a, b) => a.localeCompare(b)),
    checkedAt: now,
    ...(submittedAt ? { submittedAt } : {}),
  };
}

function calendarDateInMilan(value: string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error(`Invalid sitemap watcher timestamp: ${value}`);

  const parts = new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Europe/Rome',
    year: 'numeric',
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

/**
 * Applies one observed sitemap URL set. The first valid invocation on each
 * Milan calendar day submits once and advances state only after success.
 */
export async function applySitemapSnapshot({
  previous,
  currentUrls,
  sitemapUrl,
  now,
  submit,
  save,
}: ApplySitemapSnapshotOptions): Promise<SitemapWatchResult> {
  if (currentUrls.length === 0) throw new Error('Cannot watch an empty sitemap URL set');

  const baseline = previous === null;
  const diff = diffSitemapUrls(previous?.urls || [], currentUrls);
  const alreadySubmittedToday = Boolean(
    previous?.submittedAt
      && calendarDateInMilan(previous.submittedAt) === calendarDateInMilan(now),
  );

  if (alreadySubmittedToday) {
    return {
      ok: true,
      action: 'already-submitted',
      baseline: false,
      currentUrlCount: currentUrls.length,
      persisted: false,
      ...diff,
    };
  }

  const sitemap = await submit();
  if (!sitemap.ok) {
    return {
      ok: false,
      action: 'submission-failed',
      baseline,
      currentUrlCount: currentUrls.length,
      persisted: false,
      sitemap,
      ...diff,
    };
  }
  await save(nextState(currentUrls, sitemapUrl, now, now));
  return {
    ok: true,
    action: 'submitted',
    baseline,
    currentUrlCount: currentUrls.length,
    persisted: true,
    sitemap,
    ...diff,
  };
}

export function sitemapWatchStorageConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function validateState(value: unknown): SitemapWatchState {
  const state = value as Partial<SitemapWatchState> | null;
  if (
    !state
    || state.version !== 1
    || typeof state.sitemapUrl !== 'string'
    || typeof state.checkedAt !== 'string'
    || !Array.isArray(state.urls)
    || state.urls.some((url) => typeof url !== 'string')
  ) {
    throw new Error('Invalid sitemap watcher state');
  }
  return state as SitemapWatchState;
}

export async function readSitemapWatchState(): Promise<SitemapWatchState | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required for the sitemap watcher');

  try {
    const result = await get(SITEMAP_WATCH_STATE_PATH, { access: 'private', token, useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200 || !result.stream) {
      throw new Error(`Unable to read sitemap watcher state (${result.statusCode})`);
    }
    return validateState(JSON.parse(await new Response(result.stream).text()));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404/i.test(message)) return null;
    throw error;
  }
}

export async function writeSitemapWatchState(state: SitemapWatchState): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required for the sitemap watcher');
  }
  await put(SITEMAP_WATCH_STATE_PATH, JSON.stringify(state), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

async function readLockRecord(): Promise<StoredLockRecord | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is required for the sitemap watcher');
  try {
    const result = await get(SITEMAP_WATCH_LOCK_PATH, { access: 'private', token, useCache: false });
    if (!result) return null;
    if (result.statusCode !== 200 || !result.stream) throw new Error('Unable to read sitemap watcher lease');
    const record = JSON.parse(await new Response(result.stream).text()) as Partial<SitemapWatchLockRecord>;
    if (typeof record.owner !== 'string' || typeof record.expiresAt !== 'string') {
      throw new Error('Invalid sitemap watcher lease');
    }
    return { record: record as SitemapWatchLockRecord, etag: result.blob.etag };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404/i.test(message)) return null;
    throw error;
  }
}

async function createLockRecord(record: SitemapWatchLockRecord): Promise<void> {
  await put(SITEMAP_WATCH_LOCK_PATH, JSON.stringify(record), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    cacheControlMaxAge: 60,
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

async function releaseLock(owner: string): Promise<void> {
  const current = await readLockRecord();
  if (!current || current.record.owner !== owner) return;
  try {
    await del(SITEMAP_WATCH_LOCK_PATH, {
      ifMatch: current.etag,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  } catch (error) {
    if (!(error instanceof BlobPreconditionFailedError)) throw error;
  }
}

/**
 * Creates an atomic fixed-path lease. A crashed invocation can be replaced
 * only after expiry, using ETag-guarded deletion to avoid deleting a new owner.
 */
export async function acquireSitemapWatchLease(): Promise<SitemapWatchLease | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required for the sitemap watcher');
  }

  const owner = randomUUID();
  const record: SitemapWatchLockRecord = {
    owner,
    expiresAt: new Date(Date.now() + SITEMAP_WATCH_LEASE_MS).toISOString(),
  };

  try {
    await createLockRecord(record);
  } catch (initialError) {
    const existing = await readLockRecord();
    if (!existing) {
      await createLockRecord(record);
    } else {
      const expiresAt = Date.parse(existing.record.expiresAt);
      if (!Number.isFinite(expiresAt)) throw new Error('Invalid sitemap watcher lease expiry');
      if (expiresAt > Date.now()) return null;
      try {
        await del(SITEMAP_WATCH_LOCK_PATH, {
          ifMatch: existing.etag,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
      } catch (error) {
        if (error instanceof BlobPreconditionFailedError) return null;
        throw error;
      }
      try {
        await createLockRecord(record);
      } catch (error) {
        const current = await readLockRecord();
        if (current) return null;
        throw initialError;
      }
    }
  }

  return { release: () => releaseLock(owner) };
}
