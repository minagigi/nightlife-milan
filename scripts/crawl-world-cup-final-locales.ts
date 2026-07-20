import { enabledLocaleCodes, getLocaleDef, indexedLocaleCodes, localePrefix } from '../lib/i18n/locales';
import { WORLD_CUP_FINAL_LOCALE_COPIES } from '../lib/worldCupFinalLocaleCopies';
import { getWorldCupFinalLocalizedContent } from '../lib/worldCupFinalLocales';

const baseUrl = process.argv[2] ?? 'https://nightlifemilan.com';
const verbose = process.argv.includes('--verbose');

type CrawlResult = {
  locale: string;
  url: string;
  status: number;
  pass: boolean;
  problems: string[];
};

function hasNoindex(html: string): boolean {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
    || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
}

async function crawlLocale(locale: (typeof enabledLocaleCodes)[number]): Promise<CrawlResult> {
  const copy = WORLD_CUP_FINAL_LOCALE_COPIES[locale];
  const content = getWorldCupFinalLocalizedContent(locale);
  const url = `${baseUrl}${localePrefix(locale)}/events/${encodeURIComponent(copy.slug)}`;
  const response = await fetch(url, { redirect: 'follow', cache: 'no-store' });
  const html = await response.text();
  const problems: string[] = [];
  const indexed = indexedLocaleCodes.includes(locale);

  if (response.status !== 200) problems.push(`status=${response.status}`);
  if (!content.metaTitle || !html.includes(content.metaTitle)) problems.push('meta-title-missing');
  if (!html.includes('21:00')) problems.push('kickoff-missing');
  if (!html.includes(`just-me-world-cup-final-poster-5x4-${locale}-v1.jpg`)
      && locale !== 'it') problems.push('poster-missing');
  if (hasNoindex(html) === indexed) problems.push(indexed ? 'unexpected-noindex' : 'noindex-missing');
  const htmlLanguage: string = getLocaleDef(locale)?.hreflang ?? String(locale);
  if (!new RegExp(`<html[^>]+lang=["']${htmlLanguage}["']`, 'i').test(html)) problems.push('lang-mismatch');

  return { locale, url, status: response.status, pass: problems.length === 0, problems };
}

async function main(): Promise<void> {
  const results: CrawlResult[] = [];
  for (const locale of enabledLocaleCodes) {
    results.push(await crawlLocale(locale));
  }

  const failures = results.filter((result) => !result.pass);
  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`, { cache: 'no-store' });
  const sitemapXml = decodeURIComponent(await sitemapResponse.text());
  const sitemapProblems: string[] = [];
  for (const result of results) {
    const shouldBeIndexed = indexedLocaleCodes.includes(result.locale as (typeof indexedLocaleCodes)[number]);
    const present = sitemapXml.includes(decodeURIComponent(result.url));
    if (present !== shouldBeIndexed) {
      sitemapProblems.push(`${result.locale}:${shouldBeIndexed ? 'missing' : 'unexpected'}`);
    }
  }

  const report = {
    baseUrl,
    checked: results.length,
    passed: results.length - failures.length,
    failures,
    sitemap: {
      status: sitemapResponse.status,
      expectedIndexedPages: indexedLocaleCodes.length,
      problems: sitemapProblems,
    },
    ...(verbose ? { results } : {}),
  };
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = failures.length === 0 && sitemapResponse.status === 200 && sitemapProblems.length === 0 ? 0 : 1;
}

void main();
