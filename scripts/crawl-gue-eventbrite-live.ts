import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { buildGueEventbriteLocalePayloads } from '../lib/gueEventbriteLocales';
import { GUE_JUST_ME_ADDRESS, GUE_JUST_ME_PHONE } from '../lib/gueJustMe';
import { getGueJustMeLocalizedContent } from '../lib/gueJustMeLocales';
import { isEnabledLocale, type LocaleCode } from '../lib/i18n/locales';

type LinkRow = { locale: LocaleCode; variant: number; eventId: string; url: string };

function decodeHtml(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(Number(decimal)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function normalize(value: string): string {
  return decodeHtml(value).replace(/\s+/g, ' ').replace(/\s+([,.;:])/g, '$1').trim();
}

function visibleText(html: string): string {
  return normalize(html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '));
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

async function fetchWithRetry(url: string): Promise<Response> {
  let last: unknown;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': 'NightlifeMilan-live-verifier/1.0' },
      });
      if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) return response;
      last = new Error(`HTTP ${response.status}`);
    } catch (error) {
      last = error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 1_000));
  }
  throw last instanceof Error ? last : new Error(`Unable to fetch ${url}`);
}

async function mapLimit<T, R>(items: readonly T[], limit: number, worker: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const output = new Array<R>(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (true) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      output[index] = await worker(items[index], index);
    }
  }));
  return output;
}

function parseLinks(csv: string): LinkRow[] {
  return csv.trim().split(/\r?\n/).slice(1).map((line) => {
    const [locale, variantText, eventId, url] = line.split(',');
    if (!isEnabledLocale(locale) || !/^\d+$/.test(eventId || '') || !url) throw new Error(`Invalid link row: ${line}`);
    const variant = Number(variantText);
    if (!Number.isInteger(variant) || variant < 1 || variant > 10) throw new Error(`Invalid variant row: ${line}`);
    return { locale, variant, eventId, url };
  });
}

async function main(): Promise<void> {
  const base = path.resolve('artifacts/gue-just-me-2026-07-25');
  const links = parseLinks(await readFile(path.join(base, 'eventbrite-links.csv'), 'utf8'));
  const rows = await mapLimit(links, 6, async (link) => {
    const payload = buildGueEventbriteLocalePayloads(link.locale)[link.variant - 1];
    const localized = getGueJustMeLocalizedContent(link.locale);
    const response = await fetchWithRetry(link.url);
    const html = await response.text();
    const text = visibleText(html);
    const imageLabelsExact = payload.imagePlan.every((image) => html.includes(escapeHtml(image.alt)) && html.includes(escapeHtml(image.title)));
    const checks = {
      status200: response.status === 200,
      titleExact: text.includes(normalize(payload.title)),
      markerExact: html.includes(payload.marker),
      affiliateExact: html.includes(payload.affiliateUrl),
      canonicalSiteExact: html.includes(payload.canonicalSiteUrl),
      venueAddressExact: text.includes(normalize(GUE_JUST_ME_ADDRESS)),
      phoneExact: text.includes(GUE_JUST_ME_PHONE),
      nativeLeadExact: text.includes(normalize(localized.answerFirst || '')),
      verifiedTimes: text.includes('19:30') && text.includes('22:30') && text.includes('05:00'),
      age21: /\b21\+/u.test(text),
      localizedSections: localized.sections.every((section) => text.includes(normalize(section.body))),
      stageNoticeExact: text.includes(normalize(localized.programme[1].title)),
      socialProof45k: /45(?:[., ]000|\s000)/u.test(text),
      noUnsupported80k: !/80(?:[., ]000|\s000)/u.test(text),
      noUnsupportedDjDero: !/DJ Dero/iu.test(text),
      faq25: (html.match(/data-event-faq=/gi) || []).length >= 25,
      bodyImageLabelsExact: imageLabelsExact,
      fiveResponsiveBodyImages: (html.match(/display:block;width:100%;max-width:100%;height:auto/gi) || []).length >= 5,
      trustedEventbriteImages: (html.match(/https:\/\/img\.evbuc\.com\//gi) || []).length >= 6,
    };
    return {
      locale: link.locale,
      variant: link.variant,
      eventId: link.eventId,
      url: link.url,
      finalUrl: response.url,
      ok: Object.values(checks).every(Boolean),
      checks,
    };
  });

  const firstByLocale = [...new Map(rows.map((row) => [row.locale, row])).values()];
  const covers = await mapLimit(firstByLocale, 5, async (row) => {
    const response = await fetchWithRetry(row.finalUrl);
    const html = await response.text();
    const tag = (html.match(/<meta\b[^>]*property=["']og:image["'][^>]*>/i) || [])[0] || '';
    const src = decodeHtml(tag.match(/content=["']([^"']+)["']/i)?.[1] || '');
    const imageResponse = src ? await fetchWithRetry(src) : null;
    let width = 0;
    let height = 0;
    if (imageResponse?.ok) {
      const metadata = await sharp(Buffer.from(await imageResponse.arrayBuffer())).metadata();
      width = metadata.width || 0;
      height = metadata.height || 0;
    }
    return {
      locale: row.locale,
      src,
      width,
      height,
      ratio2x1: Boolean(width && height && width / height === 2),
    };
  });

  const evidence = {
    checkedAt: new Date().toISOString(),
    expected: 350,
    passed: rows.filter((row) => row.ok).length,
    failed: rows.filter((row) => !row.ok),
    uniqueEventIds: new Set(rows.map((row) => row.eventId)).size,
    coverLocales: covers.length,
    coversPassed: covers.filter((cover) => cover.ratio2x1).length,
    covers,
    rows,
  };
  const output = path.join(base, 'eventbrite-public-readback.json');
  await writeFile(output, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ ...evidence, rows: undefined, covers: undefined, output }, null, 2));
  if (evidence.passed !== 350 || evidence.uniqueEventIds !== 350 || evidence.coversPassed !== 35) process.exitCode = 1;
}

void main();
