import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toEventbriteUtc, normalizeAlreadyUtc } from '../lib/eventPublisher';

// toEventbriteUtc: converts a Rome "wall-clock" local time (no offset) to the
// real UTC instant, handling CET (winter, UTC+1) vs CEST (summer, UTC+2).

test('toEventbriteUtc: winter date (CET, UTC+1) subtracts 1 hour', () => {
  // 20:00 Rome time on Jan 15 (CET) -> 19:00 UTC.
  const result = toEventbriteUtc('2026-01-15T20:00:00');
  assert.equal(result, '2026-01-15T19:00:00Z');
});

test('toEventbriteUtc: summer date (CEST, UTC+2) subtracts 2 hours', () => {
  // 20:00 Rome time on Jul 15 (CEST) -> 18:00 UTC.
  const result = toEventbriteUtc('2026-07-15T20:00:00');
  assert.equal(result, '2026-07-15T18:00:00Z');
});

test('toEventbriteUtc: winter and summer offsets are different (DST is honored)', () => {
  const winter = toEventbriteUtc('2026-01-15T20:00:00');
  const summer = toEventbriteUtc('2026-07-15T20:00:00');
  const winterHour = Number(winter.slice(11, 13));
  const summerHour = Number(summer.slice(11, 13));
  // Same wall-clock hour (20:00) in both seasons must map to different UTC
  // hours because the Rome UTC offset itself differs (+1 vs +2).
  assert.notEqual(winterHour, summerHour);
  assert.equal(winterHour, 19);
  assert.equal(summerHour, 18);
});

test('normalizeAlreadyUtc: does NOT subtract any Rome offset (input is already true UTC)', () => {
  // XceedEvent.startISO arrives already-UTC (e.g. from JSON-LD "startDate").
  // normalizeAlreadyUtc must be a pure reformat, never an offset subtraction.
  const alreadyUtc = '2026-07-15T17:30:00Z';
  assert.equal(normalizeAlreadyUtc(alreadyUtc), alreadyUtc);

  const alreadyUtcWithMs = '2026-01-15T17:30:00.000Z';
  assert.equal(normalizeAlreadyUtc(alreadyUtcWithMs), '2026-01-15T17:30:00Z');
});

test('normalizeAlreadyUtc vs toEventbriteUtc: same clock string, different meaning/result', () => {
  // This is the exact regression FASE X4 bug: feeding an already-UTC string
  // into toEventbriteUtc (which treats it as Rome wall-clock) silently
  // subtracts the Rome offset a second time.
  const clock = '2026-07-15T19:30:00'; // no trailing Z here -> wall-clock reading
  const clockUtc = '2026-07-15T19:30:00Z'; // same digits, but genuinely UTC already

  const asWallClock = toEventbriteUtc(clock); // treats 19:30 as Rome time -> 17:30 UTC (CEST, -2h)
  const asAlreadyUtc = normalizeAlreadyUtc(clockUtc); // must stay 19:30 UTC

  assert.equal(asWallClock, '2026-07-15T17:30:00Z');
  assert.equal(asAlreadyUtc, '2026-07-15T19:30:00Z');
  assert.notEqual(asWallClock, asAlreadyUtc);
});
