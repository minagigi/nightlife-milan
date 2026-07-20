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

test('World Cup visual refresh is API-only and targets existing exact-marker live listings', () => {
  assert.match(route, /status=live/);
  assert.match(route, /allPayloadsByMarker/);
  assert.match(route, /html\.includes\(marker\)/);
  assert.doesNotMatch(route, /publishOneLang|\/publish\//);
  assert.match(route, /No existing live World Cup listings/);
  assert.match(route, /body\.apply !== true/);
});

test('World Cup visual runner deploys, applies every live locale, audits and removes its ephemeral secret', () => {
  assert.match(runner, /vercel env add WORLD_CUP_ROLLOUT_SECRET production/);
  assert.match(runner, /foreach \(\$locale in \$runLocales\)/);
  assert.match(runner, /targetPairs = @\(\$localeState\.targets\)/);
  assert.match(route, /page_size=50/);
  assert.match(route, /targetsByVerifiedIds/);
  assert.match(route, /await targetsByInventoryPairs\(token, locale, body\.targets\)/);
  assert.match(route, /const verified = await targetsByVerifiedIds\(token, locale/);
  assert.match(route, /does not contain its supplied inventory marker/);
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
  assert.match(route, /coverIdExact/);
  assert.match(route, /confirmationFieldsExact/);
  assert.match(runner, /Cross-run readback coverage failed/);
  assert.match(runner, /verifiedAcrossRuns/);
  assert.match(runner, /visualsComplete -ne \$after\.inventory\.total/);
  assert.match(runner, /vercel env remove WORLD_CUP_ROLLOUT_SECRET production --yes/);
});

test('World Cup visual refresh uploads one six-image set per locale and reads every field back', () => {
  assert.match(route, /uploadLocaleMedia/);
  assert.match(route, /expected one cover and five body sources/);
  assert.match(route, /uploadedMedia: 6/);
  assert.match(route, /imageSequenceExact/);
  assert.match(route, /imageLabelsExact/);
  assert.match(route, /visualRevisionExact/);
  assert.match(route, /WORLD_CUP_FINAL_VISUAL_REVISION/);
  assert.match(route, /responsiveImages/);
  assert.match(route, /faqEntriesExact/);
  assert.match(route, /affiliateHrefExact/);
  assert.match(route, /coverIdExact/);
  assert.match(route, /confirmationFieldsExact/);
  assert.match(route, /display:\\s\*block/);
  assert.match(route, /live visual readback failed/);
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

test('World Cup visual refresh supports every enabled locale while preserving the affiliate URL', () => {
  assert.match(route, /enabledLocaleCodes\.flatMap/);
  assert.match(route, /buildWorldCupEventbriteEnPayloads/);
  assert.match(route, /buildWorldCupEventbriteItPayloads/);
  assert.match(route, /buildWorldCupEventbriteLocalePayloads/);
  assert.match(route, /WORLD_CUP_FINAL_AFFILIATE_URL/);
  assert.match(route, /ticket_buyer_settings/);
});
