import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SRC_MARKER_RE } from '../lib/importLedger';
import { SRC_MARKER_RE as XCEED_SRC_MARKER_RE } from '../lib/xceedLedger';

// lib/importLedger.ts is the scout-Eventbrite ledger (Sorgente 1): its ebIds
// are plain numeric strings with no internal hyphens, so its SRC_MARKER_RE
// deliberately stops the baseId capture at the first hyphen ([^-;]+).

test('importLedger SRC_MARKER_RE: matches a per-language numeric ebId marker', () => {
  const html = '<p>...</p><!-- nlm:src=237143-en;slug-en=aria-club-saturday -->';
  const match = html.match(SRC_MARKER_RE);
  assert.ok(match);
  assert.equal(match![1], '237143');
  assert.equal(match![2], 'en');
});

test('importLedger SRC_MARKER_RE: matches the IT variant too', () => {
  const html = '<!-- nlm:src=237143-it;slug-en=aria-club-saturday -->';
  const match = html.match(SRC_MARKER_RE);
  assert.ok(match);
  assert.equal(match![2], 'it');
});

test('importLedger SRC_MARKER_RE: does not match plain text without the marker', () => {
  assert.equal('no marker in here'.match(SRC_MARKER_RE), null);
});

// lib/xceedLedger.ts has its OWN dedicated SRC_MARKER_RE (`nlm:src=xc-(\d+)-(en|it);slug-en=`)
// specifically for the Xceed pipeline's "xc-{id}" markers (Sorgente 2) — the
// numeric-only importLedger regex above would NOT correctly isolate the
// hyphenated "xc-220757" baseId, which is exactly why a separate ledger/regex
// exists for that source.
test('xceedLedger SRC_MARKER_RE: matches the xc-{id} marker format', () => {
  const html = '<!-- nlm:src=xc-220757-en;slug-en=pineta-friday -->';
  const match = html.match(XCEED_SRC_MARKER_RE);
  assert.ok(match);
  assert.equal(match![1], '220757');
  assert.equal(match![2], 'en');
});
