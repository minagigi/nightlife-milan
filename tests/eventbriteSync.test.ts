import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMarker } from '../lib/eventbriteSync';

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
