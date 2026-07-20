import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { enabledLocaleCodes, getLocaleDef, type LocaleCode } from '../lib/i18n/locales';
import {
  GUE_JUST_ME_AFFILIATE_URL,
  GUE_JUST_ME_PHONE,
  getGueJustMeSiteUrl,
} from '../lib/gueJustMe';
import { getGueJustMeLocalizedContent } from '../lib/gueJustMeLocales';

type CrawlRow = {
  locale: LocaleCode;
  url: string;
  status: number;
  affiliateExact: boolean;
  hasEventTitle: boolean;
  hasErrorFallback: boolean;
  canonicalExact: boolean;
  langExact: boolean;
  dirExact: boolean;
  nativeTitleExact: boolean;
  nativeLeadExact: boolean;
  addressExact: boolean;
  phoneExact: boolean;
  scheduleExact: boolean;
  ageExact: boolean;
  dressCodeExact: boolean;
  stageNoticeExact: boolean;
  socialProof45k: boolean;
  hasUnsupported80k: boolean;
  hasUnsupportedDjDero: boolean;
};

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
  return decodeHtml(value)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .trim();
}

function visibleText(html: string): string {
  return normalize(html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '));
}

function canonicalHref(html: string): string {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const canonical = tags.find((tag) => /\brel=["']canonical["']/i.test(tag));
  return canonical?.match(/\bhref=["']([^"']+)["']/i)?.[1] || '';
}

async function crawl(locale: LocaleCode): Promise<CrawlRow> {
  const url = getGueJustMeSiteUrl(locale);
  const response = await fetch(url, { redirect: 'follow' });
  const html = await response.text();
  const text = visibleText(html);
  const content = getGueJustMeLocalizedContent(locale);
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  const expectedLang = getLocaleDef(locale)?.hreflang || locale;
  const expectedDir = locale === 'ar' ? 'rtl' : 'ltr';
  return {
    locale,
    url,
    status: response.status,
    affiliateExact: html.includes(GUE_JUST_ME_AFFILIATE_URL),
    hasEventTitle: /Gu(?:\u00e8|e|\u00e9)/i.test(html) && /Just Me/i.test(html),
    hasErrorFallback: /application error|internal server error|page not found|this page could not be found/i.test(html),
    canonicalExact: canonicalHref(html) === url,
    langExact: new RegExp(`\\blang=["']${expectedLang}["']`, 'i').test(htmlTag),
    dirExact: new RegExp(`\\bdir=["']${expectedDir}["']`, 'i').test(htmlTag),
    nativeTitleExact: text.includes(normalize(content.title)),
    nativeLeadExact: text.includes(normalize(content.answerFirst || '')),
    addressExact: text.includes('Viale Luigi Camoens, 2')
      && /["\\]postalCode["\\]:["\\]20121/i.test(html),
    phoneExact: text.includes(GUE_JUST_ME_PHONE),
    scheduleExact: /19:30\s*[\u2013-]\s*05:00/u.test(text)
      && /22:30\s*[\u2013-]\s*05:00/u.test(text),
    ageExact: /\b21\+/u.test(text),
    dressCodeExact: text.includes(normalize(content.sections[0].body)),
    stageNoticeExact: text.includes(normalize(content.programme[1].title)),
    socialProof45k: /45(?:[., ]000|\s000)/u.test(text),
    hasUnsupported80k: /80(?:[., ]000|\s000)/u.test(text),
    hasUnsupportedDjDero: /DJ Dero/iu.test(text),
  };
}

async function main(): Promise<void> {
  const rows = await Promise.all(enabledLocaleCodes.map(crawl));
  const sitemapResponse = await fetch('https://nightlifemilan.com/sitemap.xml');
  const sitemapXml = await sitemapResponse.text();
  const sitemapMissing = rows
    .filter((row) => !sitemapXml.includes(row.url))
    .map((row) => ({ locale: row.locale, url: row.url }));
  const failures = rows.filter((row) => row.status !== 200
    || !row.affiliateExact
    || !row.hasEventTitle
    || row.hasErrorFallback
    || !row.canonicalExact
    || !row.langExact
    || !row.dirExact
    || !row.nativeTitleExact
    || !row.nativeLeadExact
    || !row.addressExact
    || !row.phoneExact
    || !row.scheduleExact
    || !row.ageExact
    || !row.dressCodeExact
    || !row.stageNoticeExact
    || !row.socialProof45k
    || row.hasUnsupported80k
    || row.hasUnsupportedDjDero);

  const evidence = {
    checkedAt: new Date().toISOString(),
    expected: enabledLocaleCodes.length,
    passed: rows.length - failures.length,
    failures,
    sitemapStatus: sitemapResponse.status,
    sitemapExpected: rows.length,
    sitemapFound: rows.length - sitemapMissing.length,
    sitemapMissing,
    rows,
  };

  const output = path.resolve('artifacts/gue-just-me-2026-07-25/site-locale-crawl.json');
  await writeFile(output, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ ...evidence, rows: undefined, output }, null, 2));
  if (failures.length > 0 || sitemapResponse.status !== 200 || sitemapMissing.length > 0) {
    process.exitCode = 1;
  }
}

void main();
