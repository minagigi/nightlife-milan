import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  CLOSED_CAPODANNO_SLUGS,
  getCapodannoEventBySlug,
  isPartnerCapodannoSlug,
} from '../lib/capodannoEvents';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import { mockGuides, mockVenues, getVenues, getGuideBySlug } from '../lib/data';
import { GUIDE_HERO_IMAGES_114, GUIDE_INLINE_IMAGES_114 } from '../lib/guideImagesMap114';
import { GUIDE_100_SLUGS_MAP } from '../lib/i18n/guideSlugs100Map';
import { ALL_35_LOCALES, resolveExistingGuideId } from '../lib/i18n/localizedSlugs35';
import { REGGAETON_35_PACKS, REGGAETON_PARTNER_VENUES } from '../lib/i18n/reggaetonSeo35';
import { buildClubHighCtrDescription, buildClubHighCtrTitle } from '../lib/clubSeoMeta35';
import { VENUE_AUTHORITY_33 } from '../lib/venueAuthority33';
import { PILLAR_HEADLINE_35, getPillarDisplayHeadline } from '../lib/guidesGscPillar20261120';
import { buildTasteExplorerData } from '../lib/tasteExplorerData';
import {
  EXPLORER_VENUE_PHOTOS,
  getEditorialDisplayHeadline,
  getGuideCardCover,
  getGuideEditorialBundle,
  resolveDistinctGuidePageMedia,
} from '../lib/guideEditorialMedia';
import { getLocalizedText } from '../lib/seo';

const REPO_ROOT = path.resolve(__dirname, '..');

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const QC_TERME_SLUGS = [
  'capodanno-qc-terme-milano-porta-romana',
  'capodanno-qc-terme-san-pellegrino',
  'capodanno-qc-terme-bormio-bagni-nuovi-vecchi',
] as const;

const SIRMIONE_SLUG = 'capodanno-terme-di-sirmione-aquaria-lago-di-garda';
const FABRIQUE_SLUG = 'capodanno-fabrique-milano';

test('3 QC Terme events use truthful TBA waitlist (0 EUR, zero invented tiers, Sirmione 198 EUR cross-sell on all 35 locales)', () => {
  for (const slug of QC_TERME_SLUGS) {
    const ev = getCapodannoEventBySlug(slug);
    assert.ok(ev, `Missing QC Terme event ${slug}`);
    assert.equal(ev.priceFromEur, 0, `${slug} must have priceFromEur === 0`);
    for (const loc of ALL_35_LOCALES) {
      const content = getCapodannoLocalizedEventContent(ev, loc);
      const joined = [
        content.title,
        content.subtitle,
        content.description,
        content.priceSummary,
        content.musicAndFormat,
        content.dressCode,
        content.sourceBasis,
        ...content.tiers.flat(),
        ...content.highlights,
      ].join(' ');
      assert.ok(joined.includes('198'), `${slug} (${loc}) missing Sirmione 198 cross-sell`);
      assert.ok((content.alternativeSlugs || []).includes(SIRMIONE_SLUG), `${slug} (${loc}) missing Sirmione in alternativeSlugs`);
      assert.ok(!/\b600\b|\b1\.200\b|tavol[oi]\s+vip\s+500/i.test(joined), `${slug} (${loc}) leaked invented club table price`);
      assert.ok(!/237,60|\+20%|Stripe/i.test(joined), `${slug} (${loc}) leaked forbidden pricing/Stripe token`);
    }
  }
});

test('Terme di Sirmione confirms 198 EUR, non-partner status, JustMe Garda Lake link, and zero +20%/237,60/Stripe across 35 locales', () => {
  const sirmione = getCapodannoEventBySlug(SIRMIONE_SLUG);
  assert.ok(sirmione, 'Missing Sirmione Capodanno event');
  assert.equal(sirmione.priceFromEur, 198);
  assert.equal(isPartnerCapodannoSlug(SIRMIONE_SLUG), false);

  const gardaClub = getCapodannoEventBySlug('capodanno-justme-garda-lake');
  assert.ok(gardaClub, 'Missing JustMe Garda Lake event');
  assert.equal(isPartnerCapodannoSlug('capodanno-justme-garda-lake'), true);

  for (const loc of ALL_35_LOCALES) {
    const content = getCapodannoLocalizedEventContent(sirmione, loc);
    const joined = [
      content.title,
      content.subtitle,
      content.description,
      content.priceSummary,
      content.sourceBasis,
      ...content.tiers.flat(),
      ...content.highlights,
    ].join(' ');
    assert.ok(joined.includes('198'), `Sirmione (${loc}) missing 198`);
    assert.ok(
      (content.alternativeSlugs || []).includes('capodanno-justme-garda-lake'),
      `Sirmione (${loc}) missing capodanno-justme-garda-lake alternative cross-link`,
    );
    assert.ok(!/237,60|\+20%|Stripe/i.test(joined), `Sirmione (${loc}) exposed forbidden markup/Stripe`);
  }
});

test('GSC Pillar & Upgraded Guides in mockGuides (total 134): >= 2,000 words, 6 H2 sections, >= 18 H3, 0 inner H2, 6 FAQs, clean limits & images <= 300 KB across all 35 locales', () => {
  assert.equal(mockGuides.length, 134, `Expected 134 total guides, got ${mockGuides.length}`);

  for (const id of [
    'g-117',
    'g-118',
    'g-119',
    'g-120',
    'g-121',
    'g-122',
    'g-123',
    'g-124',
    'g-weekly-calendar',
    'g-30',
    'g-37',
    'g-38',
    'g-24',
    'g-23',
    'g-102',
    'g-22',
    'g-36',
    'g-34',
    'g-60',
    'g-31',
    'g-19',
    'g-32',
    'g-15',
    'g-16',
    'g-18',
    'g-20',
    'g-28',
    'g-125',
    'g-126',
    'g-127',
    'g-128',
    'g-129',
    'g-130',
    'g-131',
    'g-132',
    'g-133',
    'g-134',
    'g-45',
    'g-40',
  ] as const) {
    const guide = mockGuides.find((g) => g.id === id);
    assert.ok(guide, `Missing guide ${id}`);
    assert.equal(guide.sections.length, 6, `${id} must have 6 sections`);
    assert.equal(guide.faqs?.length, 6, `${id} must have 6 FAQs`);

    const hero = GUIDE_HERO_IMAGES_114[id];
    const inlines = GUIDE_INLINE_IMAGES_114[id];
    assert.ok(hero, `Missing hero image mapping for ${id}`);
    assert.ok(inlines && inlines.length === 4, `Expected 4 inline images for ${id}`);

    for (const webPath of [hero, ...inlines]) {
      const diskPath = path.join(REPO_ROOT, 'public', webPath.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `Image not found on disk: ${diskPath}`);
      const size = fs.statSync(diskPath).size;
      assert.ok(size <= 307_200, `Image exceeds 300 KB (${size} B): ${webPath}`);
    }

    for (const loc of ALL_35_LOCALES) {
      const guideSlug: string | undefined = guide.slugs[loc];
      assert.ok(guideSlug && !guideSlug.includes('-vip-guide-vip-guide'), `${id} (${loc}) invalid slug ${guideSlug}`);
      assert.ok(getGuideBySlug(guideSlug, loc)?.id === id, `${id} (${loc}) getGuideBySlug lookup failed for ${guideSlug}`);

      const title = guide.title[loc] || '';
      const excerpt = guide.excerpt[loc] || '';
      assert.ok(title.length >= 20 && title.length <= 68, `${id} (${loc}) title length out of bounds: ${title.length} (${title})`);
      assert.ok(excerpt.length >= 80 && excerpt.length <= 165, `${id} (${loc}) excerpt length out of bounds: ${excerpt.length}`);

      let h3Count = 0;
      let innerH2Count = 0;
      let tableCount = 0;
      const bodyParts: string[] = [];

      for (const sec of guide.sections) {
        const heading = sec.heading[loc] || '';
        const html = sec.content[loc] || '';
        assert.ok(heading.length > 5, `${id} (${loc}) empty section heading`);
        h3Count += (html.match(/<h3>/gi) || []).length;
        innerH2Count += (html.match(/<h2>/gi) || []).length;
        tableCount += (html.match(/<table\b/gi) || []).length;
        bodyParts.push(heading, html);
      }

      for (const faq of guide.faqs || []) {
        const q = faq.question[loc] || '';
        const a = faq.answer[loc] || '';
        assert.ok(q.length > 5 && a.length > 10, `${id} (${loc}) empty FAQ`);
        bodyParts.push(q, a);
      }

      assert.equal(innerH2Count, 0, `${id} (${loc}) must not contain inner <h2> tags`);
      assert.ok(h3Count >= 18, `${id} (${loc}) expected >= 18 <h3>, got ${h3Count}`);
      assert.ok(tableCount >= 2, `${id} (${loc}) expected >= 2 <table> elements, got ${tableCount}`);

      const plainWords = stripTags(bodyParts.join(' ')).split(/\s+/).filter(Boolean).length;
      assert.ok(plainWords >= 2000, `${id} (${loc}) word count ${plainWords} < 2,000`);

      const allRaw = [title, excerpt, ...bodyParts].join(' ');
      assert.ok(!/\u2014/.test(allRaw), `${id} (${loc}) contains forbidden em-dash`);
      assert.ok(!/!/.test(allRaw), `${id} (${loc}) contains exclamation mark`);
      assert.ok(
        !/Roberto Cavalli|Privé Cavalli|237,60|\+20%|Stripe|Giorgio Gaber|Teatro Lirico|Teatro Nazionale|Stage Entertainment/i.test(allRaw),
        `${id} (${loc}) contains forbidden or takedown string`,
      );
      if (loc === 'ro') {
        assert.ok(!/[şţŞŢ]/.test(allRaw), `${id} (ro) contains cedilla s/t`);
      }
    }
  }
});

test('Reggaeton 35L, Just Me (ex Just Cavalli, zero Roberto Cavalli), Gattopardo, and closed Fabrique alternatives work across 35 locales', () => {
  assert.ok(REGGAETON_PARTNER_VENUES.length >= 6);
  for (const loc of ALL_35_LOCALES) {
    const pack = REGGAETON_35_PACKS[loc];
    assert.ok(
      pack && pack.seoTitle && pack.seoDescription && pack.nyeFaqQ && pack.nyeFaqA && pack.boxTitle,
      `Missing reggaeton pack for ${loc}`,
    );
  }

  const justMe = mockVenues.find((v) => v.id === 'v-justme');
  assert.ok(justMe, 'Missing v-justme venue');
  const gattopardo = mockVenues.find((v) => v.id === 'v-gattopardo');
  assert.ok(gattopardo, 'Missing v-gattopardo venue');

  for (const loc of ALL_35_LOCALES) {
    const jmName = justMe.localizedContent.name[loc] || justMe.localizedContent.name.en;
    const jmRaw = justMe.localizedContent.description[loc] || justMe.localizedContent.description.en;
    const gpName = gattopardo.localizedContent.name[loc] || gattopardo.localizedContent.name.en;
    const gpRaw = gattopardo.localizedContent.description[loc] || gattopardo.localizedContent.description.en;
    const jmTitle = buildClubHighCtrTitle(justMe, loc, jmName);
    const jmDesc = buildClubHighCtrDescription(justMe, loc, jmName, jmRaw);
    const gpTitle = buildClubHighCtrTitle(gattopardo, loc, gpName);
    const gpDesc = buildClubHighCtrDescription(gattopardo, loc, gpName, gpRaw);
    assert.ok(jmTitle.length > 10 && jmDesc.length > 30, `Missing JustMe SEO meta for ${loc}`);
    assert.ok(gpTitle.length > 10 && gpDesc.length > 30, `Missing Gattopardo SEO meta for ${loc}`);
    assert.ok(!/Roberto Cavalli|Privé Cavalli/i.test(`${jmTitle} ${jmDesc}`), `JustMe (${loc}) leaked Roberto Cavalli`);
  }

  const itJustMeText = [
    buildClubHighCtrDescription(justMe, 'it', justMe.localizedContent.name.it || justMe.localizedContent.name.en, justMe.localizedContent.description.it || justMe.localizedContent.description.en),
    VENUE_AUTHORITY_33['v-justme'].alternateNames.join(' '),
    justMe.localizedContent.description.it,
    justMe.localizedContent.dressCode.it,
    justMe.localizedContent.insiderTip?.it || '',
  ].join(' ');
  assert.ok(/ex Just Cavalli/i.test(itJustMeText), 'Just Me IT profile should mention ex Just Cavalli');
  assert.ok(!/Roberto Cavalli|Privé Cavalli/i.test(itJustMeText), 'Just Me IT profile leaked Roberto Cavalli');

  const fabrique = getCapodannoEventBySlug(FABRIQUE_SLUG);
  assert.ok(fabrique, 'Missing Fabrique event');
  assert.ok(CLOSED_CAPODANNO_SLUGS.has(FABRIQUE_SLUG), 'Fabrique must be marked in CLOSED_CAPODANNO_SLUGS');
  assert.equal(fabrique.priceFromEur, 0);
  const fabIt = getCapodannoLocalizedEventContent(fabrique, 'it');
  assert.ok(
    /Gate|Magazzini|Just/i.test(`${fabIt.subtitle} ${fabIt.description} ${fabIt.priceSummary}`) ||
      (fabIt.alternativeSlugs || []).length >= 2,
    'Fabrique IT copy should offer open alternatives',
  );
});

test('Zero duplicate -vip-guide-vip-guide slugs and legacy guide alias resolution works', () => {
  for (const [id, map35] of Object.entries(GUIDE_100_SLUGS_MAP)) {
    for (const [loc, slug] of Object.entries(map35)) {
      assert.ok(!slug.includes('-vip-guide-vip-guide'), `${id} (${loc}) still has duplicate suffix: ${slug}`);
    }
  }
  for (const guide of mockGuides) {
    for (const [loc, slug] of Object.entries(guide.slugs)) {
      if (!slug) continue;
      assert.ok(!slug.includes('-vip-guide-vip-guide'), `${guide.id} (${loc}) still has duplicate suffix: ${slug}`);
    }
  }

  assert.equal(
    resolveExistingGuideId('monza-brianza-to-milan-clubs-parking-vip-guide-vip-guide'),
    'g-110',
  );
  assert.equal(
    resolveExistingGuideId('bergamo-to-milan-clubs-highway-a4-vip-guide-vip-guide'),
    'g-111',
  );
  assert.equal(
    resolveExistingGuideId('como-lecco-lugano-ticino-to-milan-clubs-vip-guide-vip-guide'),
    'g-112',
  );
  assert.equal(
    resolveExistingGuideId('brescia-franciacorta-cremona-to-milan-clubs-vip-guide-vip-guide'),
    'g-113',
  );
  assert.equal(
    resolveExistingGuideId('varese-pavia-lodi-novara-to-milan-clubs-vip-guide-vip-guide'),
    'g-114',
  );
});

test('PILLAR_HEADLINE_35 & buildTasteExplorerData preserve SEO headlines, honest TBA, 18 partners, and zero forbidden copy across 35 locales', () => {
  for (const gid of ['g-117', 'g-118'] as const) {
    for (const loc of ALL_35_LOCALES) {
      const h1 = getPillarDisplayHeadline(gid, loc);
      assert.ok(PILLAR_HEADLINE_35[gid][loc], `Missing headline ${gid} for ${loc}`);
      assert.ok(h1.length >= 10 && h1.length <= 42, `${gid} (${loc}) H1 length ${h1.length} out of bounds: ${h1}`);
      assert.ok(!/[!\u2014]/.test(h1), `${gid} (${loc}) H1 contains forbidden punctuation: ${h1}`);
      if (loc === 'ro') {
        assert.ok(!/[şţŞŢ]/.test(h1), `${gid} (ro) H1 contains Romanian cedilla: ${h1}`);
      }
    }
  }

  for (const loc of ALL_35_LOCALES) {
    const clubExp = buildTasteExplorerData('clubbing', loc, `https://nightlifemilan.com/${loc}/guides/test`);
    assert.equal(clubExp.items.length, 18, `Expected 18 partner clubs for ${loc}`);
    assert.ok(clubExp.filterOptions.length >= 4);
    for (const item of clubExp.items) {
      assert.ok(item.waHref.startsWith('https://wa.me/393519127047'), `Invalid WhatsApp link on ${item.id} (${loc})`);
      assert.ok(!/237,60|\+20%|Stripe|Roberto Cavalli|Priorità #/i.test(`${item.name} ${item.rate} ${item.status} ${item.detailNote}`), `Forbidden text in club explorer ${item.id} (${loc})`);
    }
    const tom = clubExp.items.find((i) => i.id === 'tom');
    assert.ok(tom && !/\b500\b|\b300\b/i.test(tom.rate), `TOM (${loc}) leaked fake rate`);

    const termeExp = buildTasteExplorerData('terme', loc, `https://nightlifemilan.com/${loc}/guides/test-terme`);
    assert.equal(termeExp.items.length, 9, `Expected 9 Terme/Lake entries for ${loc}`);
    const sirmione = termeExp.items.find((i) => i.id === 'sirmione');
    assert.ok(sirmione && sirmione.rate === '198 EUR', `Sirmione (${loc}) missing 198 EUR`);
    const qc = termeExp.items.find((i) => i.id === 'qc-milano');
    assert.ok(qc && !/\b198\b|\b300\b|\b500\b/i.test(qc.rate), `QC Terme (${loc}) leaked non-TBA price: ${qc?.rate}`);
  }
});

test('V2 Curated Editorial Media & Reusable 118-Guide Template invariants', () => {
  const editorialDir = path.join(REPO_ROOT, 'public/images/guides-editorial');
  assert.ok(fs.existsSync(editorialDir), 'Missing public/images/guides-editorial directory');
  const curatedFiles = fs.readdirSync(editorialDir).filter((f) => f.endsWith('.webp'));
  assert.ok(curatedFiles.length >= 28, `Expected >= 28 curated .webp assets, got ${curatedFiles.length}`);
  for (const file of curatedFiles) {
    const abs = path.join(editorialDir, file);
    assert.ok(fs.statSync(abs).size <= 307_200, `Curated image ${file} exceeds 300 KB`);
  }

  const CURATED_GUIDE_PREFIXES = [
    '/images/guides-editorial/',
    '/images/venues/',
    '/images/seo-events/master/',
    '/images/events/curated/',
    '/images/events-gallery/',
    '/images/pillars/',
  ];
  const isCuratedGuideAsset = (src: string) =>
    CURATED_GUIDE_PREFIXES.some((p) => src.startsWith(p));

  for (const gid of [
    'g-117',
    'g-118',
    'g-119',
    'g-120',
    'g-121',
    'g-122',
    'g-123',
    'g-124',
    'g-weekly-calendar',
    'g-30',
    'g-37',
    'g-38',
    'g-rooftops-milan',
    'g-8',
    'g-15',
    'g-24',
    'g-23',
    'g-102',
    'g-22',
    'g-36',
    'g-34',
    'g-60',
    'g-31',
    'g-19',
    'g-32',
    'g-16',
    'g-18',
    'g-20',
    'g-28',
    'g-125',
    'g-126',
    'g-127',
    'g-128',
    'g-129',
    'g-130',
    'g-131',
    'g-132',
    'g-133',
    'g-134',
    'g-45',
    'g-40',
  ] as const) {
    const hero = GUIDE_HERO_IMAGES_114[gid];
    const inlines = GUIDE_INLINE_IMAGES_114[gid] || [];
    assert.ok(isCuratedGuideAsset(hero), `${gid} hero should use curated pack: ${hero}`);
    assert.equal(hero.includes('capodanno-2027-posters'), false);
    assert.equal(new Set([hero, ...inlines]).size, 5, `${gid} hero + 4 inlines must be 5 distinct images`);
    for (const img of inlines) {
      assert.ok(isCuratedGuideAsset(img), `${gid} inline should use curated pack: ${img}`);
      assert.equal(img.includes('capodanno-2027-posters'), false);
    }
  }

  // All 27 Explorer items (9 Terme + 18 Partner Clubs) have valid curated photos on disk
  assert.equal(Object.keys(EXPLORER_VENUE_PHOTOS).length, 27);
  for (const mode of ['terme', 'clubbing'] as const) {
    const exp = buildTasteExplorerData(mode, 'it', 'https://nightlifemilan.com/it/guides/test');
    for (const item of exp.items) {
      assert.ok(item.image.startsWith('/images/guides-editorial/'), `Missing curated image on ${item.id}`);
      const abs = path.join(REPO_ROOT, 'public', item.image.replace(/^\//, ''));
      assert.ok(fs.existsSync(abs), `Explorer image missing on disk: ${abs}`);
    }
  }

  const allVenues = getVenues();
  const TERME_EXP = new Set(['g-117', 'g-120', 'g-122']);
  const CLUB_EXP = new Set(['g-118', 'g-119', 'g-30', 'g-121', 'g-123', 'g-124']);

  // Reusable editorial bundle, <=2-line display headline & ZERO repeated images across all 125 guides
  for (const guide of mockGuides) {
    for (const loc of ['it', 'en', 'fr'] as const) {
      const fullTitle = getLocalizedText(guide.title, loc);
      const disp = getEditorialDisplayHeadline(guide.id, loc, fullTitle);
      assert.ok(disp.length >= 4 && disp.length <= 42, `${guide.id} (${loc}) display headline bad length: ${disp}`);
      assert.ok(!/[!\u2014]/.test(disp), `${guide.id} (${loc}) display headline forbidden char: ${disp}`);
      const heroImg = GUIDE_HERO_IMAGES_114[guide.id] || guide.image || '/images/guides-editorial/just-me-pavilion.webp';
      const bundle = getGuideEditorialBundle(guide, loc, fullTitle, heroImg);
      assert.equal(bundle.heroSlides.length, 1, `${guide.id} heroSlides should contain 1 lead image`);
      assert.equal(bundle.heroSlides[0].src, heroImg, `${guide.id} heroSlides[0] must equal og:image`);
      assert.equal(bundle.stripPlates.length, 4);
      assert.equal(bundle.chapterPlates.length, 4);
      const allBundlePlates = [
        ...bundle.heroSlides,
        ...bundle.stripPlates,
        ...bundle.chapterPlates,
        ...(bundle.faqPlate ? [bundle.faqPlate] : []),
      ];
      for (const pl of allBundlePlates) {
        assert.ok(isCuratedGuideAsset(pl.src), `${guide.id} plate outside curated dirs: ${pl.src}`);
        const diskP = path.join(REPO_ROOT, 'public', pl.src.replace(/^\//, ''));
        assert.ok(fs.existsSync(diskP), `${guide.id} missing file: ${diskP}`);
        assert.ok(fs.statSync(diskP).size <= 307_200, `${guide.id} plate > 300KB: ${pl.src}`);
      }

      const otherGuides = mockGuides.filter((g) => g.id !== guide.id).slice(0, 4);
      const rawExplorer = TERME_EXP.has(guide.id)
        ? buildTasteExplorerData('terme', loc, 'https://nightlifemilan.com/it/guides/test')
        : CLUB_EXP.has(guide.id)
          ? buildTasteExplorerData('clubbing', loc, 'https://nightlifemilan.com/it/guides/test')
          : null;
      const resolved = resolveDistinctGuidePageMedia(guide, allVenues, otherGuides, bundle, rawExplorer);

      const pageSrcs: string[] = [
        ...bundle.heroSlides.map((p) => p.src),
        ...bundle.stripPlates.map((p) => p.src),
      ];
      guide.sections.forEach((_, idx) => {
        const isLight = idx % 2 === 0;
        const isLastDark = !isLight && idx === guide.sections.length - 1 && idx >= 3;
        if (idx >= 1 && !isLastDark && bundle.chapterPlates[idx - 1]) {
          pageSrcs.push(bundle.chapterPlates[idx - 1].src);
        }
      });
      if (guide.faqs && guide.faqs.length > 0 && bundle.faqPlate) {
        pageSrcs.push(bundle.faqPlate.src);
      }
      if (resolved.explorerData?.items[0]) {
        pageSrcs.push(resolved.explorerData.items[0].image);
      } else {
        assert.equal(resolved.partnerCards.length, 6, `${guide.id} must resolve 6 partnerCards`);
        pageSrcs.push(...resolved.partnerCards.map((c) => c.coverSrc));
      }
      assert.equal(resolved.relatedGuideCards.length, 4, `${guide.id} must resolve 4 relatedGuideCards`);
      pageSrcs.push(...resolved.relatedGuideCards.map((c) => c.coverSrc));

      assert.equal(
        new Set(pageSrcs).size,
        pageSrcs.length,
        `${guide.id} (${loc}) has duplicate image src on page: ${JSON.stringify(pageSrcs)}`,
      );
    }
    const cover = getGuideCardCover(guide.id);
    assert.ok(fs.existsSync(path.join(REPO_ROOT, 'public', cover.replace(/^\//, ''))));
  }
});
