import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSitemapIndexEntriesAsync, renderSitemapIndexXml } from '../lib/sitemapBuilder';
import { generateClubSchema } from '../lib/seo';
import { mockGuides, mockVenues } from '../lib/data';
import { getZoneLocalized35, getGenreLocalized35 } from '../lib/i18n/zonesAndGenres35';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';

test('sitemap-index renders valid <sitemapindex> with all 5 child sitemaps', async () => {
  const entries = await buildSitemapIndexEntriesAsync();
  assert.equal(entries.length, 5);
  const xml = renderSitemapIndexXml(entries);
  assert.ok(xml.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  for (const child of [
    'sitemap-core.xml',
    'sitemap-clubs.xml',
    'sitemap-events.xml',
    'sitemap-capodanno.xml',
    'sitemap-guides.xml',
  ]) {
    assert.ok(xml.includes(child), `Missing child sitemap ${child}`);
  }
});

test('generateClubSchema emits ReserveAction potentialAction and never aggregateRating', () => {
  const venue = mockVenues[0];
  const schema = generateClubSchema({
    venue,
    locale: 'en',
    canonicalUrl: 'https://nightlifemilan.com/clubs/just-me-milano',
    name: 'Just Me Milano',
    description: 'Luxury club in Parco Sempione.',
  });
  const action = schema.potentialAction as { '@type'?: string; target?: { urlTemplate?: string } } | undefined;
  assert.equal(action?.['@type'], 'ReserveAction');
  assert.ok(action?.target?.urlTemplate?.includes('wa.me/393519127047'));
  assert.equal('aggregateRating' in schema, false);
});

test('mockGuides preserves all 116 guides (g-115 & g-116 included) across all 35 locales without em-dash', () => {
  assert.equal(mockGuides.length, 116);
  const geoIds = new Set(mockGuides.map((g) => g.id));
  assert.ok(geoIds.has('g-115'));
  assert.ok(geoIds.has('g-116'));
  for (const id of ['g-115', 'g-116']) {
    const g = mockGuides.find((item) => item.id === id)!;
    for (const loc of ALL_35_LOCALES) {
      const title = g.title[loc];
      assert.ok(title && title.length > 5, `${id} missing title for ${loc}`);
      assert.equal(title.includes('\u2014'), false, `${id} title contains em-dash for ${loc}`);
      assert.ok(g.slugs[loc] && g.slugs[loc].length > 5, `${id} missing slug for ${loc}`);
    }
  }
});

test('zones & genres 35-lang engine returns non-English localized titles without em-dash', () => {
  for (const loc of ['es', 'de', 'fr', 'ar', 'zh'] as const) {
    const z = getZoneLocalized35('brera', loc);
    assert.ok(z.seoTitle && z.name);
    assert.notEqual(z.seoTitle, getZoneLocalized35('brera', 'en').seoTitle);
    assert.equal(z.seoTitle.includes('\u2014'), false);
    assert.equal(z.seoDescription.includes('\u2014'), false);

    const g = getGenreLocalized35('afro-house', loc);
    assert.ok(g.seoTitle && g.name);
    assert.notEqual(g.seoTitle, getGenreLocalized35('afro-house', 'en').seoTitle);
    assert.equal(g.seoTitle.includes('\u2014'), false);
    assert.equal(g.seoDescription.includes('\u2014'), false);
  }
});
