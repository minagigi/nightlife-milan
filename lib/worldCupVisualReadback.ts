export function normalizeVisibleHtmlText(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_match, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractHtmlHrefs(html: string): string[] {
  return [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi)]
    .map((match) => match[1].replace(/&amp;/g, '&'));
}

export function htmlTextAndLinksExact(savedHtml: string, expectedHtml: string): boolean {
  const expectedText = normalizeVisibleHtmlText(expectedHtml);
  const expectedHrefs = extractHtmlHrefs(expectedHtml);
  return expectedText.length > 0
    && expectedHrefs.length > 0
    && normalizeVisibleHtmlText(savedHtml) === expectedText
    && JSON.stringify(extractHtmlHrefs(savedHtml)) === JSON.stringify(expectedHrefs);
}

export function hasOnlyExpectedXceedAffiliate(html: string, expectedUrl: string): boolean {
  const xceedHrefs = extractHtmlHrefs(html).filter((href) => {
    try {
      return /(^|\.)xceed\.me$/i.test(new URL(href).hostname);
    } catch {
      return false;
    }
  });
  return xceedHrefs.length > 0 && xceedHrefs.every((href) => href === expectedUrl);
}
