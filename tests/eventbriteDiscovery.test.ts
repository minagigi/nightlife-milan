import assert from 'node:assert/strict';
import test from 'node:test';
import { getEventbriteDiscoveryItems, VERIFIED_EVENTBRITE_MASTERS } from '../lib/eventbriteDiscovery';
import { mockVenues } from '../lib/data';
import type { Event } from '../lib/types';
import { GUE_JUST_ME_CANONICAL_SLUG } from '../lib/gueJustMe';
import { WORLD_CUP_FINAL_CANONICAL_SLUG } from '../lib/worldCupFinalIt';
import { getEventBatchProfile, getEventBatchSlug } from '../lib/eventBatchProfiles';

const venue = mockVenues.find((candidate) => candidate.id === 'v-justme')!;
const item = (id: string, slug: string): { event: Event; venue: typeof venue } => ({
  event: {
    id, venueId: venue.id, genre: [], dateISO: '2026-07-24T19:30:00Z',
    pricing: { entry: null, currency: 'EUR', tableMinSpend: null },
    localizedContent: { title: { en: id }, shortDescription: { en: id }, slug: { en: slug, it: slug } },
  },
  venue,
});

test('site-first discovery includes mock and weekly inventory, keeps Bad Bunny out, and adds each verified master once in priority order', () => {
  // REGOLA 20 lug 2026: il sito è il punto cardine — l'inventario discovery
  // NON dipende più da Eventbrite. One-off curati e serate ricorrenti
  // materializzate sono ammessi accanto agli import Eventbrite; i master
  // verificati restano in testa per priorità commerciale.
  const result = getEventbriteDiscoveryItems([
    item('mock-event', 'mock-event'),
    item('weekly-justme-friday', 'weekly-event'),
    item('eb-bad-bunny', 'bad-bunny-aria'),
    item('eb-live-other', 'live-other'),
    item('eb-1994392210790', GUE_JUST_ME_CANONICAL_SLUG),
  ], 'it', () => true);

  const worldCupProfile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG)!;
  const slugs = result.map(({ event }) => event.localizedContent.slug.it);
  assert.deepEqual(slugs.slice(0, 2), [
    GUE_JUST_ME_CANONICAL_SLUG,
    getEventBatchSlug(worldCupProfile, 'it'),
  ]);
  assert.ok(slugs.includes('mock-event'), 'i one-off curati fanno parte dell\'inventario');
  assert.ok(slugs.includes('weekly-event'), 'le serate ricorrenti materializzate fanno parte dell\'inventario');
  assert.ok(slugs.includes('live-other'), 'gli import Eventbrite esistenti restano ammessi');
  assert.equal(result.filter(({ event }) => event.localizedContent.slug.en === GUE_JUST_ME_CANONICAL_SLUG).length, 1);
  assert.equal(result.some(({ event }) => /bad-bunny/i.test(event.id)), false);
  assert.equal(VERIFIED_EVENTBRITE_MASTERS[0].priority, 1);
  assert.equal(VERIFIED_EVENTBRITE_MASTERS[1].priority, 2);
  assert.ok(VERIFIED_EVENTBRITE_MASTERS.every((master) => master.publicUrls.length > 0));
  assert.ok(VERIFIED_EVENTBRITE_MASTERS.every((master) => master.publicUrls.every((url) => url.startsWith('https://www.eventbrite.it/e/'))));
  assert.ok(result.slice(0, 2).every(({ event }) => !event.image?.startsWith('https://nightlifemilan.com/')));
});

test('Eventbrite discovery applies the upcoming gate to imported Eventbrite records too', () => {
  const result = getEventbriteDiscoveryItems([
    item('eb-stale', 'stale-event'),
  ], 'it', (dateISO) => dateISO.startsWith('2026-07-25'));
  assert.equal(result.some(({ event }) => event.id === 'eb-stale'), false);
});

test('Eventbrite master seeds retain locale-specific canonical profile slugs', () => {
  const result = getEventbriteDiscoveryItems([], 'it', () => true);
  const worldCupProfile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG)!;
  assert.equal(result[0].event.localizedContent.slug.it, GUE_JUST_ME_CANONICAL_SLUG);
  assert.equal(result[1].event.localizedContent.slug.it, getEventBatchSlug(worldCupProfile, 'it'));
  assert.equal(result[1].event.localizedContent.slug.en, getEventBatchSlug(worldCupProfile, 'en'));
});
