import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { CAPODANNO_EVENTS, getCapodannoEventBySlug } from '../lib/capodannoEvents';
import { capodannoEventPath } from '../lib/capodanno/routes';
import { CLUB_SERP_35, FLAGSHIP_TITLES_EN_IT } from '../lib/clubSeoMeta35';
import { mockVenues } from '../lib/data';
import { weeklyEvents } from '../lib/eventsConfig';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import { DEFAULT_INDEXNOW_KEY } from '../lib/indexNow';
import { getOctoberEventById, OCTOBER_EVENTS } from '../lib/octoberEvents';
import { generateClubSchema, getLocalizedText } from '../lib/seo';
import { getCapodannoOfficialPosterSrc } from '../lib/seoEventImages';
import {
  buildAllSitemapEntries,
  clampLastModified,
  getCatalogLastModified,
  renderSitemapXml,
  toCompactSitemapEntries,
} from '../lib/sitemapBuilder';
import {
  buildCityQualifiedVenueH1,
  buildVenueAuthorityFaqs,
  getRelatedNearbyVenues,
  getVenueAuthoritySpec,
  VENUE_AUTHORITY_33,
} from '../lib/venueAuthority33';

test('Pillar A: all 33 active public venues have full authority specs, SERP meta, FAQs, and rich Club schema', () => {
  assert.equal(mockVenues.length, 33);
  assert.equal(Object.keys(VENUE_AUTHORITY_33).length, 33);
  assert.equal(Object.keys(CLUB_SERP_35).length, 35);

  for (const venue of mockVenues) {
    const spec = getVenueAuthoritySpec(venue.id);
    assert.ok(spec, `Missing VENUE_AUTHORITY_33 spec for ${venue.id} (${venue.slugs.en})`);
    assert.ok(FLAGSHIP_TITLES_EN_IT[venue.id], `Missing FLAGSHIP_TITLES_EN_IT entry for ${venue.id}`);

    const nameIt = getLocalizedText(venue.localizedContent.name, 'it');
    const nameEn = getLocalizedText(venue.localizedContent.name, 'en');
    const h1It = buildCityQualifiedVenueH1(venue, 'it', nameIt);
    const h1En = buildCityQualifiedVenueH1(venue, 'en', nameEn);
    assert.match(h1It, /Milano|Milan/i);
    assert.match(h1En, /Milan|Milano/i);

    for (const locale of ['it', 'en', 'fr', 'es', 'de', 'ar', 'zh'] as const) {
      const locName = getLocalizedText(venue.localizedContent.name, locale);
      const locDress = getLocalizedText(venue.localizedContent.dressCode, locale);
      const faqs = buildVenueAuthorityFaqs(venue, locale, locName, locDress);
      assert.ok(faqs.length >= 5, `${venue.id} (${locale}) should expose >= 5 FAQs`);
      for (const f of faqs) {
        assert.ok(!f.q.includes('\u2014') && !f.a.includes('\u2014'), `Em-dash found in FAQ for ${venue.id}`);
      }
    }

    const nearby = getRelatedNearbyVenues(venue, mockVenues, 6);
    assert.equal(nearby.length, 6);
    assert.ok(nearby.every((item) => item.venue.id !== venue.id));

    const schema = generateClubSchema({
      venue,
      locale: 'it',
      canonicalUrl: `https://nightlifemilan.com/it/locali/${venue.slugs.it}`,
      name: h1It,
      description: getLocalizedText(venue.localizedContent.description, 'it'),
      schemaType: spec.schemaType,
      alternateNames: spec.alternateNames,
      neighborhoodName: spec.neighborhoodIt,
      openingHoursSpec: spec.openingHoursSpec,
      hasMapUrl: `https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`,
    }) as Record<string, unknown>;

    assert.equal(schema['@type'], spec.schemaType);
    assert.ok(Array.isArray(schema.alternateName) && schema.alternateName.length >= 1);
    assert.ok(Array.isArray(schema.openingHoursSpecification) && schema.openingHoursSpecification.length >= 1);
    assert.equal('aggregateRating' in schema, false);
  }
});

test('Pillar B: all 7 sitemap routes auto-update via ISR (revalidate = 3600), clamp lastmod <= now, and stay < 3.8 MB', async () => {
  const routes = [
    'app/sitemap.ts',
    'app/sitemap-index.xml/route.ts',
    'app/sitemap-core.xml/route.ts',
    'app/sitemap-clubs.xml/route.ts',
    'app/sitemap-capodanno.xml/route.ts',
    'app/sitemap-events.xml/route.ts',
    'app/sitemap-guides.xml/route.ts',
  ];

  for (const rel of routes) {
    const src = await readFile(path.join(process.cwd(), rel), 'utf8');
    assert.match(src, /export const revalidate = 3600;/, `${rel} must export revalidate = 3600`);
    assert.doesNotMatch(src, /revalidate\s*=\s*false/, `${rel} must not freeze revalidate = false`);
    assert.doesNotMatch(src, /force-static/, `${rel} must not force-static`);
  }

  assert.ok(
    getCatalogLastModified().toISOString().slice(0, 10) >= '2026-11-13',
    'Catalog lastModified must reflect >= 2026-11-13 SEO release',
  );

  const futureClamped = clampLastModified('2099-12-31T23:59:59.000Z');
  assert.ok(futureClamped.getTime() <= Date.now() + 1000, 'clampLastModified must never emit a future timestamp');

  const allEntries = toCompactSitemapEntries(buildAllSitemapEntries());
  assert.ok(allEntries.length > 15000, `Expected > 15,000 multilingual URLs, got ${allEntries.length}`);
  const xml = renderSitemapXml(allEntries, { compact: true });
  assert.ok(!xml.includes('<changefreq>') && !xml.includes('<priority>'), 'Compact XML must omit changefreq/priority');
  const byteLen = Buffer.byteLength(xml, 'utf8');
  assert.ok(byteLen < 3_800_000, `Compact /sitemap.xml (${byteLen} bytes) must stay safely below 3.8 MB`);

  const keyFile = await readFile(path.join(process.cwd(), 'public', `${DEFAULT_INDEXNOW_KEY}.txt`), 'utf8');
  assert.equal(keyFile.trim(), DEFAULT_INDEXNOW_KEY);
});

test('Pillar C: Capodanno Just Me Lago di Garda (250310) + Ritmo x Gate 0 (251849) + 1376x768 remediated flyers exist across all catalogs', async () => {
  const capGarda = getCapodannoEventBySlug('capodanno-justme-garda-lake');
  assert.ok(capGarda, 'capodanno-justme-garda-lake must exist in CAPODANNO_EVENTS');
  assert.match(capGarda.city, /Lonato del Garda/);
  assert.match(capGarda.xceedUrl || '', /250310\/channel\/nightlifemilan-1/);

  for (const locale of enabledLocaleCodes) {
    const p = capodannoEventPath('capodanno-justme-garda-lake', locale);
    assert.ok(p.includes('2027'), `Localized Capodanno Garda path missing in ${locale}: ${p}`);
  }

  const oct250310 = getOctoberEventById('250310');
  const oct251849 = getOctoberEventById('251849');
  assert.ok(oct250310, '250310 Just Me in Rouge NYE must exist in OCTOBER_EVENTS');
  assert.ok(oct251849, '251849 Ritmo x Gate 0 must exist in OCTOBER_EVENTS');

  const sampleImagePaths = new Set<string>();
  for (const ev of OCTOBER_EVENTS) sampleImagePaths.add(ev.image.src);
  for (const ev of CAPODANNO_EVENTS) sampleImagePaths.add(getCapodannoOfficialPosterSrc(ev.slug));
  for (const ev of weeklyEvents) sampleImagePaths.add(ev.image);

  for (const imgSrc of sampleImagePaths) {
    assert.ok(imgSrc.startsWith('/images/'), `Unexpected external event image: ${imgSrc}`);
    const absPath = path.join(process.cwd(), 'public', imgSrc.replace(/^\//, ''));
    await access(absPath);
    const meta = await sharp(absPath).metadata();
    assert.equal(meta.width, 1376, `${imgSrc} width must be 1376`);
    assert.equal(meta.height, 768, `${imgSrc} height must be 768`);
  }
});
