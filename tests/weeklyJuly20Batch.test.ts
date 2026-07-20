import assert from 'node:assert/strict';
import test from 'node:test';
import { WEEKLY_JULY20_BATCH_EVENTS, WEEKLY_JULY20_PHONE } from '../lib/weeklyJuly20Batch';

test('July 20 batch contains exactly the nine authorised events', () => {
  assert.equal(WEEKLY_JULY20_BATCH_EVENTS.length, 9);
  assert.deepEqual(WEEKLY_JULY20_BATCH_EVENTS.map((event) => event.xceedId), ['220720', '220733', '220746', '220759', '229417', '220811', '229437', '220835', '220785']);
  assert.equal(WEEKLY_JULY20_BATCH_EVENTS.some((event) => /gue|bad-bunny/i.test(event.eventKey)), false);
});

test('every prepared locale meets Eventbrite content and purchase gates', () => {
  for (const event of WEEKLY_JULY20_BATCH_EVENTS) {
    assert.match(event.startUtc, /^2026-07-(21|22|23|24|25|26)T17:30:00Z$/);
    assert.match(event.endUtc, /^2026-07-(22|23|24|25|26|27)T03:00:00Z$/);
    assert.match(event.affiliateUrl, /^https:\/\/xceed\.me\/en\/milano\/event\/.+\/channel\/nightlifemilan-1$/);
    for (const locale of ['en', 'it'] as const) {
      const content = event.localized[locale];
      assert.equal(content.titles.length, 10, `${event.eventKey}/${locale} titles`);
      assert.equal(content.keywordPermutations.length, 10, `${event.eventKey}/${locale} keyword permutations`);
      assert.equal(content.faqs.length, 25, `${event.eventKey}/${locale} FAQ`);
      assert.ok(content.summary.length <= 140, `${event.eventKey}/${locale} summary`);
      assert.equal(event.visualAssets[locale].body.length, 5, `${event.eventKey}/${locale} body images`);
      assert.match(event.visualAssets[locale].cover, /-cover-2x1-v3\.png$/, `${event.eventKey}/${locale} v3 cover`);
      assert.match(event.visualAssets[locale].body[0], /-poster-5x4-v3\.png$/, `${event.eventKey}/${locale} v3 poster`);
      for (const mood of event.visualAssets[locale].body.slice(1)) {
        assert.match(mood, /-mood-[1-4]-5x4-v3\.png$/, `${event.eventKey}/${locale} v3 mood image`);
        assert.doesNotMatch(mood, /-(?:en|it)-mood-/, `${event.eventKey}/${locale} mood image is locale-neutral`);
      }
      assert.ok(content.ticket.description.includes(event.affiliateUrl));
      assert.ok(content.confirmation.details.includes(event.affiliateUrl));
      assert.ok(content.confirmation.details.includes(WEEKLY_JULY20_PHONE));
    }
  }
});
