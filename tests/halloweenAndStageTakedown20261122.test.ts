import assert from 'node:assert/strict';
import test from 'node:test';
import { CAPODANNO_EVENTS } from '../lib/capodannoEvents';
import { HALLOWEEN_ASSETS, HALLOWEEN_CONTENT, HALLOWEEN_MEMBERSHIP } from '../lib/halloween/content';
import { selectHalloweenEvents, validateHalloweenContent } from '../lib/halloween/contract';
import { halloweenHubCollections } from '../lib/halloween/selection';
import { halloweenHubPoster } from '../lib/halloween/selectionMedia';
import { OCTOBER_EVENTS } from '../lib/octoberEvents';

test('Halloween hub selection and canonical invariants hold after Stage Entertainment takedown', () => {
  const cols = halloweenHubCollections();
  assert.equal(cols.featured.length, 8);
  assert.equal(cols.others.length, 21);
  assert.equal(cols.all.length, 29);
  assert.equal(cols.all.some((e) => /gaber|lirico|nazionale/i.test(e.id)), false);

  validateHalloweenContent(HALLOWEEN_CONTENT, HALLOWEEN_ASSETS);
  const selected = selectHalloweenEvents(OCTOBER_EVENTS, HALLOWEEN_MEMBERSHIP);
  assert.equal(selected.length, HALLOWEEN_MEMBERSHIP.length);

  for (const ev of cols.featured) {
    assert.ok(halloweenHubPoster(ev.id, 'it'));
    assert.ok(halloweenHubPoster(ev.id, 'en'));
  }
  for (const ev of cols.all) {
    assert.doesNotThrow(() => halloweenHubPoster(ev.id, 'it'));
  }
});

test('Capodanno and October inventories exclude removed Stage Entertainment venues', () => {
  assert.equal(CAPODANNO_EVENTS.length, 125);
  for (const ev of CAPODANNO_EVENTS) {
    assert.equal(/teatro-lirico|teatro-nazionale|lirico.*nazionale/i.test(ev.slug), false);
  }
  for (const ev of OCTOBER_EVENTS) {
    assert.equal(/teatro-giorgio-gaber|non-aprite-quel-teatro/i.test(ev.id), false);
  }
});
