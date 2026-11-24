import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { getPublicImageDimensions } from '../lib/imageDimensions';
import { CAPODANNO_EVENTS } from '../lib/capodannoEvents';
import { getCapodannoOfficialPosterSrc } from '../lib/seoEventImages';
import { weeklyEvents } from '../lib/eventsConfig';
import { OCTOBER_EVENTS } from '../lib/octoberEvents';

test('getPublicImageDimensions resolves exact 4:5 active posters and 16:9 archive flyers without fs runtime', () => {
  const cap = getPublicImageDimensions('/images/events/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp');
  assert.deepEqual(cap, { width: 1080, height: 1350 });

  const archiveEv = OCTOBER_EVENTS.find((ev) => (ev.endISO || ev.startISO || '') < '2026-11-15' && getPublicImageDimensions(ev.image.src).width === 1376);
  assert.ok(archiveEv, 'historical 16:9 archive event must exist');
  const archive16x9 = getPublicImageDimensions(archiveEv.image.src);
  assert.equal(archive16x9.width, 1376);
  assert.equal(archive16x9.height, 768);

  const keine4x5 = getPublicImageDimensions('/images/seo-events/master/keinemusik-milan-01-hero.webp');
  assert.deepEqual(keine4x5, { width: 1080, height: 1350 });
});

test('all active Capodanno, Weekly and upcoming Xceed event heroes are registered at 1080x1350 4:5', () => {
  const todayIso = '2026-11-24';
  for (const ev of CAPODANNO_EVENTS) {
    const src = getCapodannoOfficialPosterSrc(ev.slug);
    assert.deepEqual(getPublicImageDimensions(src), { width: 1080, height: 1350 }, `Capodanno ${ev.slug}`);
  }
  for (const wk of weeklyEvents) {
    assert.deepEqual(getPublicImageDimensions(wk.image), { width: 1080, height: 1350 }, `Weekly ${wk.id}`);
  }
  for (const oct of OCTOBER_EVENTS) {
    const cutoff = (oct.endISO || oct.startISO || '').slice(0, 10);
    if (cutoff >= todayIso) {
      assert.deepEqual(getPublicImageDimensions(oct.image.src), { width: 1080, height: 1350 }, `October active ${oct.id}`);
    }
  }
});

test('all 7 Hero components enforce quality={95} and >= 1080px sizes without 540px/560px/40vw/42vw downscaling', async () => {
  const heroFiles = [
    'components/EventCoverHero.tsx',
    'components/CapodannoDetailView.tsx',
    'components/ChristmasVoyaDetailView.tsx',
    'components/OrthodoxNyeJustMeDetailView.tsx',
    'components/ThanksgivingJustMeDetailView.tsx',
    'components/PartenopeaJustMeDetailView.tsx',
    'app/[locale]/events/[slug]/page.tsx',
  ];
  for (const rel of heroFiles) {
    const src = await readFile(path.join(process.cwd(), rel), 'utf8');
    assert.doesNotMatch(src, /sizes="\(max-width:\s*(768|1024|1200)px\)\s*100vw,\s*(540px|560px|40vw|42vw)"/, `${rel} has downscaled sizes`);
    assert.doesNotMatch(src, /\bunoptimized\b/, `${rel} uses unoptimized`);
    assert.match(src, /quality=\{95\}/, `${rel} must set quality={95}`);
  }
});
