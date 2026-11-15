import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { WORLD_CUP_FINAL_AFFILIATE_URL } from '../lib/worldCupFinalIt';

const route = readFileSync('app/api/events/refresh-world-cup-affiliate/route.ts', 'utf8');
const runner = readFileSync('scripts/run-world-cup-affiliate-refresh.ps1', 'utf8');

test('World Cup affiliate refresh route is disconnected fail-closed (HTTP 410)', () => {
  assert.match(route, /eventbriteGoneResponse\('\/api\/events\/refresh-world-cup-affiliate'\)/);
  assert.match(route, /export const GET = gone;/);
  assert.match(route, /export const POST = gone;/);
  assert.match(route, /export const DELETE = gone;/);
  assert.equal(
    WORLD_CUP_FINAL_AFFILIATE_URL,
    'https://xceed.me/en/milano/event/fifa-2026-final/238627/channel/nightlifemilan-1',
  );
});

test('World Cup affiliate runner uses and removes an ephemeral rollout secret', () => {
  assert.match(runner, /env add WORLD_CUP_ROLLOUT_SECRET production/);
  assert.match(runner, /env remove WORLD_CUP_ROLLOUT_SECRET production --yes/);
  assert.match(runner, /oldUrlCount -ne 0/);
  assert.match(runner, /newUrlCount -ne \$audit\.inventory\.total/);
});
