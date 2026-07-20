import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { enabledLocaleCodes } from '../lib/i18n/locales';

const ROOT = process.cwd();
const GENERATED = path.join(ROOT, 'public', 'images', 'events', 'generated');
const COMPOSER = path.join(ROOT, 'scripts', 'compose-gue-just-me-all-locales.ts');

function asset(locale: string, kind: 'cover' | 'poster'): string {
  const ratio = kind === 'cover' ? '2x1' : '5x4';
  return path.join(GENERATED, `gue-just-me-2026-07-25-${kind}-${ratio}-${locale}-v2.jpg`);
}

test('Guè v2 artwork exists at the Eventbrite cover and body dimensions for every locale', async () => {
  for (const locale of enabledLocaleCodes) {
    const cover = asset(locale, 'cover');
    const poster = asset(locale, 'poster');
    await Promise.all([access(cover), access(poster)]);
    const [coverMeta, posterMeta] = await Promise.all([sharp(cover).metadata(), sharp(poster).metadata()]);
    assert.deepEqual([coverMeta.width, coverMeta.height], [2000, 1000], `${locale} cover`);
    assert.deepEqual([posterMeta.width, posterMeta.height], [1600, 1280], `${locale} poster`);
    assert.equal(coverMeta.format, 'jpeg', `${locale} cover format`);
    assert.equal(posterMeta.format, 'jpeg', `${locale} poster format`);
  }
});

test('Guè v2 compositor uses the approved v2 source and contains no obsolete DJ credit', async () => {
  const source = await readFile(COMPOSER, 'utf8');
  assert.match(source, /cover-2x1-en-v2\.jpg/);
  assert.match(source, /poster-5x4-en-v2\.jpg/);
  assert.doesNotMatch(source, /DJ DERO/i);
  assert.doesNotMatch(source, /gue-xceed-square\.jpg/);
});

test('localized covers leave the protected Guè and Just Me artwork zone effectively unchanged', async () => {
  const protectedSource = await sharp(asset('en', 'cover'))
    .extract({ left: 0, top: 0, width: 1120, height: 640 })
    .removeAlpha()
    .raw()
    .toBuffer();
  for (const locale of enabledLocaleCodes.filter((code) => code !== 'en')) {
    const candidate = await sharp(asset(locale, 'cover'))
      .extract({ left: 0, top: 0, width: 1120, height: 640 })
      .removeAlpha()
      .raw()
      .toBuffer();
    let totalDifference = 0;
    for (let index = 0; index < protectedSource.length; index += 1) totalDifference += Math.abs(protectedSource[index] - candidate[index]);
    const meanDifference = totalDifference / protectedSource.length;
    assert.ok(meanDifference < 2, `${locale} modifies protected cover zone (mean difference ${meanDifference.toFixed(3)})`);
  }
});
