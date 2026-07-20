import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  WEEKLY_JULY20_BATCH_EVENTS,
  buildWeeklyJuly20EventbritePayloads,
} from '../lib/weeklyJuly20Eventbrite';

const media = [
  'https://img.evbuc.com/poster',
  'https://img.evbuc.com/arrival',
  'https://img.evbuc.com/aperitivo',
  'https://img.evbuc.com/lounge',
  'https://img.evbuc.com/dancefloor',
] as const;

test('weekly batch contains exactly the nine remaining valid events and excludes Guè', () => {
  assert.equal(WEEKLY_JULY20_BATCH_EVENTS.length, 9);
  assert.ok(WEEKLY_JULY20_BATCH_EVENTS.every((event) => !/gue|guè/i.test(event.eventKey)));
  assert.ok(WEEKLY_JULY20_BATCH_EVENTS.every((event) => event.affiliateUrl.includes('/channel/nightlifemilan-1')));
});

test('weekly API refresh discovers markers organization-wide and splits metadata from description', () => {
  const runner = readFileSync('scripts/publish-weekly-july20-eventbrite.ts', 'utf8');
  assert.match(runner, /organizations\/\$\{ORG_ID\}\/events/);
  assert.match(runner, /venueMatchesEvent\(matches\[0\], event\)/);
  assert.match(runner, /metadata update/);
  assert.match(runner, /description update/);
  assert.doesNotMatch(runner, /summary:\s*payload\.summary,[\s\S]{0,160}description:\s*\{ html: payload\.descriptionHtml \}/);
});

for (const event of WEEKLY_JULY20_BATCH_EVENTS) {
  for (const locale of ['it', 'en'] as const) {
    test(`${event.eventKey}/${locale} creates ten complete idempotent Eventbrite payloads`, () => {
      const payloads = buildWeeklyJuly20EventbritePayloads(event.eventKey, locale, media);
      assert.equal(payloads.length, 10);
      assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 10);
      assert.equal(new Set(payloads.map((payload) => payload.title)).size, 10);
      for (const payload of payloads) {
        assert.equal((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length, 25);
        assert.equal((payload.descriptionHtml.match(/<img /g) || []).length, 5);
        assert.equal((payload.descriptionHtml.match(/display:block;width:100%;max-width:100%;height:auto/g) || []).length, 5);
        assert.ok(payload.descriptionHtml.includes(event.affiliateUrl));
        assert.ok(payload.descriptionHtml.includes(payload.canonicalSiteUrl));
        assert.match(payload.canonicalSiteUrl, locale === 'it'
          ? /^https:\/\/nightlifemilan\.com\/it\/events\//
          : /^https:\/\/nightlifemilan\.com\/events\//);
        assert.ok(payload.ticket.description.includes(event.affiliateUrl));
        assert.ok(payload.descriptionHtml.indexOf(locale === 'it' ? 'Ricerche utili per prenotare' : 'Useful booking searches')
          > payload.descriptionHtml.indexOf(locale === 'it' ? 'Domande frequenti' : 'Frequently asked questions'));
        assert.equal((payload.descriptionHtml.match(/data-contact-list="true"/g) || []).length, 1);
        assert.equal((payload.descriptionHtml.match(/data-seo-keywords="true"/g) || []).length, 1);
        const seoBlock = payload.descriptionHtml.match(/<section data-seo-keywords="true">([\s\S]*?)<\/section>/);
        assert.ok(seoBlock);
        assert.equal((seoBlock[1].match(/<li>/g) || []).length, 10);
        assert.ok(payload.descriptionHtml.indexOf('data-contact-list="true"') < payload.descriptionHtml.indexOf('<img '));
        assert.match(payload.descriptionHtml, new RegExp(`</section><!-- ${payload.marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} -->$`));
      }
    });
  }
}
