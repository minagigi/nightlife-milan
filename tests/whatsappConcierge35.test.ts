import assert from 'node:assert/strict';
import test from 'node:test';
import {
  WHATSAPP_LOCALE_PACKS,
  appendPageUrlToWhatsAppMessage,
  getConciergeBookingUrl,
  isMessageWrongLanguageForLocale,
  isSiteWhatsAppUrl,
  listAllSupportedWhatsAppLocales,
  normalizeWhatsAppHrefForPage,
} from '../lib/conciergeBooking';
import { enabledLocaleCodes } from '../lib/i18n/localeRegistry';

test('WHATSAPP_LOCALE_PACKS covers all 35 enabled locales with native phrasing and page label', () => {
  assert.equal(enabledLocaleCodes.length, 35);
  const supported = listAllSupportedWhatsAppLocales();
  assert.deepEqual(supported, enabledLocaleCodes);

  for (const locale of enabledLocaleCodes) {
    const pagePath = `${locale === 'en' ? '' : `/${locale}`}/events/test-page`;
    const bookingUrl = getConciergeBookingUrl(locale, 'Pineta Moulin Rouge NYE 2027', pagePath);
    assert.ok(
      bookingUrl.startsWith('https://wa.me/393519127047?text='),
      `Unexpected WA base for ${locale}: ${bookingUrl}`,
    );

    const parsed = new URL(bookingUrl);
    const decoded = parsed.searchParams.get('text') || '';
    const expectedPageUrl = `https://nightlifemilan.com${pagePath}`;
    const expectedSuffix = `${WHATSAPP_LOCALE_PACKS[locale].pageLabel}: ${expectedPageUrl}`;

    assert.ok(decoded.includes('Pineta Moulin Rouge NYE 2027'), `Missing context in ${locale}`);
    assert.ok(
      decoded.endsWith(expectedSuffix),
      `Expected WA text for ${locale} to end with "${expectedSuffix}", got "${decoded}"`,
    );
    assert.equal(
      isMessageWrongLanguageForLocale(decoded, locale),
      false,
      `Unexpected language leak detected for ${locale}: "${decoded}"`,
    );
  }
});

test('appendPageUrlToWhatsAppMessage and normalizeWhatsAppHrefForPage are idempotent and replace stale URL lines', () => {
  const targetUrl = 'https://nightlifemilan.com/it/eventi/capodanno-pineta-milano';
  const baseMessage = 'Ciao Nightlife Milan! Vorrei informazioni per Capodanno al Pineta.';

  const once = appendPageUrlToWhatsAppMessage(baseMessage, targetUrl, 'it');
  const twice = appendPageUrlToWhatsAppMessage(once, targetUrl, 'it');
  assert.equal(twice, once);
  assert.equal(once.match(/https:\/\/nightlifemilan\.com/g)?.length, 1);

  const staleMessage = `${baseMessage}\n\nPagina: https://nightlifemilan.com/it/vecchia-pagina`;
  const updated = appendPageUrlToWhatsAppMessage(staleMessage, targetUrl, 'it');
  assert.ok(!updated.includes('/it/vecchia-pagina'));
  assert.ok(updated.endsWith(`Pagina: ${targetUrl}`));

  const normalizedOnce = normalizeWhatsAppHrefForPage(
    `https://wa.me/393519127047?text=${encodeURIComponent(baseMessage)}`,
    'it',
    '/it/eventi/capodanno-pineta-milano',
  );
  const normalizedTwice = normalizeWhatsAppHrefForPage(
    normalizedOnce,
    'it',
    '/it/eventi/capodanno-pineta-milano',
  );
  assert.equal(normalizedTwice, normalizedOnce);
});

test('normalizeWhatsAppHrefForPage rewrites English leaks into target locale and preserves friend share links', () => {
  const rewritten = normalizeWhatsAppHrefForPage(
    'https://wa.me/393519127047?text=Hi%2C%20I%20would%20like%20to%20book%20VIP',
    'es',
    'https://nightlifemilan.com/es/eventos/test',
  );
  const decodedRewritten = new URL(rewritten).searchParams.get('text') || '';
  assert.ok(decodedRewritten.startsWith('¡Hola Nightlife Milan!'), `Unexpected ES rewrite: ${decodedRewritten}`);
  assert.ok(decodedRewritten.endsWith('Página: https://nightlifemilan.com/es/eventos/test'));
  assert.equal(isMessageWrongLanguageForLocale(decodedRewritten, 'es'), false);

  const friendShare = 'https://wa.me/?text=Check%20this%20out';
  assert.equal(isSiteWhatsAppUrl(friendShare), false);
  assert.equal(
    normalizeWhatsAppHrefForPage(friendShare, 'fr', 'https://nightlifemilan.com/fr/evenements/test'),
    friendShare,
  );
});
