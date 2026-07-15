import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMarker } from '../lib/eventbriteSync';
import { isEventbriteOnlyCuratedListing, isRemovedCuratedSitePath } from '../lib/eventVisibility';

test('parseMarker: new format with language (nlm:src=X-lang;slug-en=Y)', () => {
  const text = 'blah blah <!-- nlm:src=237143-en;slug-en=aria-club-saturday-2026-07-11 --> more text';
  const parsed = parseMarker(text);
  assert.ok(parsed);
  assert.equal(parsed!.baseId, '237143');
  assert.equal(parsed!.lang, 'en');
  assert.equal(parsed!.slug, 'aria-club-saturday-2026-07-11');
});

test('parseMarker: new format, Italian language variant', () => {
  const text = '<!-- nlm:src=237143-it;slug-en=aria-club-saturday-2026-07-11 -->';
  const parsed = parseMarker(text);
  assert.ok(parsed);
  assert.equal(parsed!.baseId, '237143');
  assert.equal(parsed!.lang, 'it');
});

test('parseMarker: legacy format without language', () => {
  const text = '<!-- nlm:src=237143;slug-en=aria-club-saturday-2026-07-11 -->';
  const parsed = parseMarker(text);
  assert.ok(parsed);
  assert.equal(parsed!.baseId, '237143');
  assert.equal(parsed!.lang, undefined);
  assert.equal(parsed!.slug, 'aria-club-saturday-2026-07-11');
});

test('parseMarker: Xceed id (xc-220757), which contains a hyphen inside the baseId', () => {
  const text = '<!-- nlm:src=xc-220757-en;slug-en=pineta-friday-2026-07-10 -->';
  const parsed = parseMarker(text);
  assert.ok(parsed);
  assert.equal(parsed!.baseId, 'xc-220757');
  assert.equal(parsed!.lang, 'en');
  assert.equal(parsed!.slug, 'pineta-friday-2026-07-10');
});

test('parseMarker: returns undefined when no marker is present', () => {
  assert.equal(parseMarker('no marker here'), undefined);
  assert.equal(parseMarker(undefined), undefined);
});

test('curated weekly collections are Eventbrite-only', () => {
  assert.equal(isEventbriteOnlyCuratedListing({
    description: {
      html: '<!-- nlm:curated=aperitivi-week-it-2026-07-16 -->',
    },
  }), true);
  assert.equal(isEventbriteOnlyCuratedListing({
    description: {
      text: 'nlm:curated=aperitivi-it-2026-07-16',
    },
  }), true);
});

test('normal Eventbrite events remain eligible for the site', () => {
  assert.equal(isEventbriteOnlyCuratedListing({
    description: {
      html: '<!-- nlm:src=xc-220757-it;slug-en=pineta-friday-2026-07-17 -->',
    },
  }), false);
  assert.equal(isEventbriteOnlyCuratedListing({
    description: { text: 'Aperitivo e discoteca al Pineta Milano.' },
  }), false);
});

test('previously generated curated site URLs are tombstoned', () => {
  assert.equal(isRemovedCuratedSitePath(
    '/it/events/just-me-aperitivi-a-milano-questa-settimana-16-19-luglio-2026-16-07-20',
  ), true);
  assert.equal(isRemovedCuratedSitePath(
    '/events/just-me-milano-international-parties-milan-16-19-july-2026',
  ), true);
  assert.equal(isRemovedCuratedSitePath(
    '/pt/events/just-me-festas-universitarias-e-erasmus-milao-16-19-julho-2026',
  ), true);
});

test('normal event paths are not tombstoned', () => {
  assert.equal(isRemovedCuratedSitePath(
    '/it/events/university-party-just-me-tuesday-july-14-2026-2026-07-14',
  ), false);
  assert.equal(isRemovedCuratedSitePath('/it/events/just-me-milano-friday-night-2026-07-17'), false);
  assert.equal(isRemovedCuratedSitePath('/it/events/this-week'), false);
});
