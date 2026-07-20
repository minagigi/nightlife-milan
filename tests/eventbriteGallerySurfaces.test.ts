import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { resolve } from 'node:path';

const surfaces = [
  'app/[locale]/page.tsx',
  'app/[locale]/events/page.tsx',
  'app/[locale]/events/[slug]/page.tsx',
  'app/[locale]/events/tonight/page.tsx',
  'app/[locale]/events/this-week/page.tsx',
  'app/[locale]/events/special/page.tsx',
  'app/[locale]/events/best/page.tsx',
  'app/[locale]/calendar/tonight/page.tsx',
  'app/[locale]/calendar/this-week/page.tsx',
  'app/[locale]/genres/[slug]/page.tsx',
  'app/[locale]/zones/[slug]/page.tsx',
  'app/[locale]/clubs/[slug]/page.tsx',
  'components/EventIntentLanding.tsx',
] as const;

test('every event discovery surface uses the unified site-first inventory', () => {
  for (const path of surfaces) {
    const source = readFileSync(resolve(process.cwd(), path), 'utf8');
    assert.match(source, /getEventbriteDiscoveryItems\(/, `${path} bypasses the unified discovery inventory`);
  }
});

test('the events hub renders the unified inventory without separate recurring-gallery sections', () => {
  const source = readFileSync(resolve(process.cwd(), 'app/[locale]/events/page.tsx'), 'utf8');
  assert.doesNotMatch(source, /weeklyEvents|Weekly Recurring Nights|Serate Ricorrenti/);

  const bestSource = readFileSync(resolve(process.cwd(), 'app/[locale]/events/best/page.tsx'), 'utf8');
  assert.doesNotMatch(bestSource, /weeklyEvents|Weekly Schedule|Serate Ricorrenti/);

  const clubSource = readFileSync(resolve(process.cwd(), 'app/[locale]/clubs/[slug]/page.tsx'), 'utf8');
  assert.doesNotMatch(clubSource, /<WeeklyProgram|components\/WeeklyProgram/);
});

test('event detail pages expose one truthful discovery gallery with site-first copy', () => {
  const source = readFileSync(resolve(process.cwd(), 'app/[locale]/events/[slug]/page.tsx'), 'utf8');
  assert.equal((source.match(/<EventsCarousel items=\{discoveryEvents\}/g) || []).length, 1);
  assert.match(source, /Featured events in Milan/);
  assert.doesNotMatch(source, /Featured events on Eventbrite/);
  assert.doesNotMatch(source, /venueWeekEvents|allWeekEvents/);
});

test('global navigation search exposes only the two verified master events', () => {
  const source = readFileSync(resolve(process.cwd(), 'components/GlobalSearch.tsx'), 'utf8');
  assert.doesNotMatch(source, /mockEvents/);
  assert.match(source, /eb-1994392210790/);
  assert.match(source, /eb-1994228700727/);
  assert.match(source, /gue-live-performance-just-me-milan-july-25-2026/);
  assert.match(source, /finale-coppa-del-mondo-maxischermo-milano-just-me-19-luglio-2026/);
});
