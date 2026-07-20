import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { WORLD_CUP_FINAL_AFFILIATE_URL } from '../lib/worldCupFinalIt';

const route = readFileSync('app/api/events/refresh-world-cup-affiliate/route.ts', 'utf8');
const runner = readFileSync('scripts/run-world-cup-affiliate-refresh.ps1', 'utf8');

test('World Cup affiliate refresh targets only existing marker-matched live listings', () => {
  assert.match(route, /status=live/);
  assert.match(route, /MARKER_RE/);
  assert.doesNotMatch(route, /publishOneLang|\/publish\//);
  assert.match(route, /descriptionChanged/);
  assert.match(route, /a\.event\.id\.localeCompare\(b\.event\.id\)/);
  assert.match(route, /duplicateListingCount/);
  assert.match(route, /WORLD_CUP_FINAL_AFFILIATE_URL/);
  assert.equal(
    WORLD_CUP_FINAL_AFFILIATE_URL,
    'https://xceed.me/en/milano/event/fifa-2026-final/238627/channel/nightlifemilan-1',
  );
});

test('World Cup affiliate refresh rewrites and reads back both localized confirmations', () => {
  assert.match(route, /confirmation_message: \{ html: orderConfirmation \}/);
  assert.match(route, /instructions: \{ html: orderConfirmation \}/);
  assert.match(route, /ticket_buyer_settings/);
  assert.match(route, /order-confirmation readback failed/);
  assert.match(route, /buildEventbriteConfirmationHtml\('it'/);
});

test('World Cup affiliate runner uses and removes an ephemeral rollout secret', () => {
  assert.match(runner, /env add WORLD_CUP_ROLLOUT_SECRET production/);
  assert.match(runner, /env remove WORLD_CUP_ROLLOUT_SECRET production --yes/);
  assert.match(runner, /oldUrlCount -ne 0/);
  assert.match(runner, /newUrlCount -ne \$audit\.inventory\.total/);
});

test('World Cup affiliate cleanup deletes only exact marker-matched drafts and verifies none remain', () => {
  assert.match(route, /status=draft/);
  assert.match(route, /export async function DELETE/);
  assert.match(route, /listDraftWorldCupEvents/);
  assert.match(route, /remaining\.length > 0/);
});

test('World Cup affiliate refresh explicitly covers the five registered Italian live IDs', () => {
  assert.match(route, /WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS/);
  assert.match(route, /listRegisteredItalianEvents/);
  assert.match(route, /registeredItalianOnly/);
  assert.match(route, /event\.status !== 'live'/);
});
