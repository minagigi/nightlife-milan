import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getLocalizedEventContent, getLocalizedEventSeed } from '../lib/localizedEventContent';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { getWhatsAppLabel } from '../config/contact';
import {
  UNIVERSITY_PARTY_CANONICAL_SLUG,
  UNIVERSITY_PARTY_PT_LEGACY_SLUG,
  universityPartyPt,
} from '../lib/universityPartyPt';

test('University Party PT uses the canonical structured event model', () => {
  const content = getLocalizedEventContent(UNIVERSITY_PARTY_CANONICAL_SLUG, 'pt');
  const seed = getLocalizedEventSeed(UNIVERSITY_PARTY_CANONICAL_SLUG, 'pt');
  assert.equal(content, universityPartyPt);
  assert.ok(seed);
  assert.equal(seed.venueId, 'v-justme');
  assert.equal(seed.dateISO, '2026-07-14T19:30:00+02:00');
  assert.equal(content?.sections.length, 3);
  assert.equal(content?.programme.length, 6);
  assert.equal(content?.offers.length, 6);
  assert.equal(content?.faqs.length, 25);
});

test('University Party PT respects SEO and FAQ limits', () => {
  assert.ok(universityPartyPt.seoSummary.length <= 140, `summary is ${universityPartyPt.seoSummary.length} characters`);
  assert.match(universityPartyPt.seoSummary, /\+39 351 912 7047/);
  for (const [index, faq] of universityPartyPt.faqs.entries()) {
    assert.ok(faq.answer.length <= 300, `FAQ ${index + 1} is ${faq.answer.length} characters`);
  }
});

test('University Party PT gallery contains five valid square images', () => {
  const gallery = getEventVisualGallery(UNIVERSITY_PARTY_CANONICAL_SLUG, 'pt');
  assert.ok(gallery);
  assert.equal(gallery.images.length, 5);

  for (const image of gallery.images) {
    const path = join(process.cwd(), 'public', image.src.replace(/^\//, ''));
    assert.ok(existsSync(path), `missing image: ${image.src}`);
    const header = readFileSync(path).subarray(0, 24);
    assert.equal(header.toString('ascii', 1, 4), 'PNG', `${image.src} must be a PNG`);
    assert.equal(header.readUInt32BE(16), header.readUInt32BE(20), `${image.src} must be square`);
    assert.ok(image.title.length > 20);
    assert.ok(image.alt.length > 50);
  }
});

test('legacy Portuguese URL redirects to the canonical event URL', () => {
  const config = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
  assert.match(config, new RegExp(`/pt/events/${UNIVERSITY_PARTY_PT_LEGACY_SLUG}`));
  assert.match(config, new RegExp(`/pt/events/${UNIVERSITY_PARTY_CANONICAL_SLUG}`));
  assert.match(config, /permanent:\s*true/);
});

test('Portuguese global booking CTA has a localized label', () => {
  assert.equal(getWhatsAppLabel('pt'), 'Fale conosco');
});
