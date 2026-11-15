import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  hasOnlyExpectedXceedAffiliate,
  htmlTextAndLinksExact,
  normalizeVisibleHtmlText,
} from '../lib/worldCupVisualReadback';

const route = readFileSync('app/api/events/refresh-world-cup-visuals/route.ts', 'utf8');
const runner = readFileSync('scripts/run-world-cup-visual-refresh.ps1', 'utf8');

test('World Cup visual refresh route is disconnected fail-closed (HTTP 410)', () => {
  assert.match(route, /eventbriteGoneResponse\('\/api\/events\/refresh-world-cup-visuals'\)/);
  assert.match(route, /export const GET = gone;/);
  assert.match(route, /export const POST = gone;/);
  assert.match(route, /export const DELETE = gone;/);
});

test('World Cup visual runner retains audit and ephemeral secret lifecycle checks', () => {
  assert.match(runner, /vercel env add WORLD_CUP_ROLLOUT_SECRET production/);
  assert.match(runner, /foreach \(\$locale in \$runLocales\)/);
  assert.match(runner, /targetPairs = @\(\$localeState\.targets\)/);
  assert.doesNotMatch(runner, /LOCALE_SKIP_COMPLETE/);
  assert.match(runner, /localeCount -ne 35/);
  assert.match(runner, /uniqueMarkerCount -ne 175/);
  assert.match(runner, /uniqueMarkers -ne 5/);
  assert.match(runner, /missingLocales/);
  assert.match(runner, /incompleteMarkerLocales/);
  assert.match(runner, /apply = \$false/);
  assert.match(runner, /apply = \$true/);
  assert.match(runner, /EVENTBRITE_RATE_LIMIT_READY/);
  assert.match(runner, /LocaleCsv/);
  assert.match(runner, /partial resume requires a verified checkpoint file/i);
  assert.match(runner, /RESUME_DONE/);
  assert.match(runner, /resumeAudit = \$true/);
  assert.match(runner, /Cross-run readback coverage failed/);
  assert.match(runner, /verifiedAcrossRuns/);
  assert.match(runner, /visualsComplete -ne \$after\.inventory\.total/);
  assert.match(runner, /vercel env remove WORLD_CUP_ROLLOUT_SECRET production --yes/);
});

test('confirmation and affiliate canaries fail when Eventbrite removes or changes href values', () => {
  const affiliate = 'https://xceed.me/en/milano/event/fifa-2026-final/238627/channel/nightlifemilan-1';
  const expected = `<p><a href="${affiliate}">Buy</a> <a href="https://wa.me/393519127047">WhatsApp</a></p>`;
  const noLinks = '<p>Buy WhatsApp</p>';
  assert.equal(normalizeVisibleHtmlText(noLinks), normalizeVisibleHtmlText(expected));
  assert.equal(htmlTextAndLinksExact(noLinks, expected), false);
  assert.equal(htmlTextAndLinksExact(expected, expected), true);
  assert.equal(hasOnlyExpectedXceedAffiliate(expected, affiliate), true);
  assert.equal(hasOnlyExpectedXceedAffiliate(`${expected}<a href="https://xceed.me/wrong/channel">Wrong</a>`, affiliate), false);
});
