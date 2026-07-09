import { test } from 'node:test';
import assert from 'node:assert/strict';
import { romeDayKey, romeDayKeyOffset, dayOfWeekForKey, isUpcomingRome } from '../lib/calendarEvents';

test('romeDayKey: converts a late-night UTC instant to the correct Rome calendar day', () => {
  // 2026-07-11T23:30:00Z is 2026-07-12T01:30 in Rome (CEST, +2) -> next day.
  assert.equal(romeDayKey('2026-07-11T23:30:00Z'), '2026-07-12');
  // 2026-01-11T22:30:00Z is 2026-01-11T23:30 in Rome (CET, +1) -> same day.
  assert.equal(romeDayKey('2026-01-11T22:30:00Z'), '2026-01-11');
});

test('romeDayKeyOffset: offset 0 matches today, offsets are additive', () => {
  const today = romeDayKeyOffset(0);
  const tomorrow = romeDayKeyOffset(1);
  assert.notEqual(today, tomorrow);
  // Tomorrow's key must be exactly one calendar day after today's.
  const [y, m, d] = today.split('-').map(Number);
  const expectedTomorrow = new Date(Date.UTC(y, m - 1, d + 1, 12, 0, 0));
  const expectedKey = `${expectedTomorrow.getUTCFullYear()}-${String(expectedTomorrow.getUTCMonth() + 1).padStart(2, '0')}-${String(expectedTomorrow.getUTCDate()).padStart(2, '0')}`;
  assert.equal(tomorrow, expectedKey);
});

test('dayOfWeekForKey: returns the correct day-of-week index for a known date', () => {
  // 2026-07-11 is a Saturday (6).
  assert.equal(dayOfWeekForKey('2026-07-11'), 6);
  // 2026-07-12 is a Sunday (0).
  assert.equal(dayOfWeekForKey('2026-07-12'), 0);
});

test('isUpcomingRome: true for future/today, false for a clearly past date', () => {
  assert.equal(isUpcomingRome('2020-01-01T20:00:00Z'), false);
  const farFuture = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 3).toISOString();
  assert.equal(isUpcomingRome(farFuture), true);
});
