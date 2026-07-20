import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { EVENT_BATCH_LOCALE_FALLBACKS } from '../lib/eventBatchLocaleFallbacks';
import { GUE_JUST_ME_LIVE_LABELS, GUE_JUST_ME_PHONE } from '../lib/gueJustMe';
import { enabledLocaleCodes, getLocaleDef, type LocaleCode } from '../lib/i18n/locales';

/**
 * Localises only the approved v2 artwork.  Guè and Just Me are baked into the
 * approved source image and deliberately never redrawn, replaced, or passed to
 * a generative system.  The old v1 source contains an obsolete DJ credit and
 * must not be used here.
 */
const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'public', 'images', 'events', 'generated');
const EN_COVER = path.join(OUTPUT, 'gue-just-me-2026-07-25-cover-2x1-en-v2.jpg');
const EN_POSTER = path.join(OUTPUT, 'gue-just-me-2026-07-25-poster-5x4-en-v2.jpg');
const COVER = { width: 2000, height: 1000 } as const;
const POSTER = { width: 1600, height: 1280 } as const;

function escapeXml(value: string): string {
  return value.normalize('NFC').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function fontFamily(locale: LocaleCode): string {
  if (locale === 'ar') return 'Dubai, Tahoma, Arial, sans-serif';
  if (locale === 'zh') return 'Microsoft YaHei, SimHei, Arial, sans-serif';
  return 'Arial, Helvetica, sans-serif';
}

function splitLines(text: string, maxUnits: number): string[] {
  const normalized = text.replace(/\s+/gu, ' ').trim();
  if ([...normalized].length <= maxUnits) return [normalized];
  const parts = normalized.includes(' ') ? normalized.split(' ') : [...normalized];
  const separator = normalized.includes(' ') ? ' ' : '';
  const lines: string[] = [];
  let line = '';
  for (const part of parts) {
    const candidate = line ? `${line}${separator}${part}` : part;
    if (!line || [...candidate].length <= maxUnits) line = candidate;
    else { lines.push(line); line = part; }
  }
  if (line) lines.push(line);
  if (lines.length <= 2) return lines;
  return [lines[0], `${lines.slice(1).join(separator).slice(0, Math.max(4, maxUnits - 1))}\u2026`];
}

type ImageKind = 'cover' | 'poster';

function overlay(locale: LocaleCode, kind: ImageKind): Buffer {
  const isCover = kind === 'cover';
  const { width, height } = isCover ? COVER : POSTER;
  const dress = EVENT_BATCH_LOCALE_FALLBACKS[locale].elegantDressLongTrousers;
  const live = GUE_JUST_ME_LIVE_LABELS[locale];
  const schedule = isCover
    ? '19:30  |  22:30–05:00'
    : '19:30\n22:30–05:00';
  const info = `21+  |  ${dress}`;
  const contact = `WhatsApp ${GUE_JUST_ME_PHONE}  |  nightlifemilan.com`;
  const region = isCover
    // The Guè flourished wordmark extends below its letter baseline: nothing may cover it.
    ? { x: 175, y: 660, w: 900, h: 315, liveY: 730, scheduleY: 790, infoY: 860, contactY: 935, liveSize: 58, bodySize: 29 }
    // Keep the complete baked Guè wordmark, including its lower flourish, clear.
    : { x: 85, y: 800, w: 930, h: 440, liveY: 870, scheduleY: 940, infoY: 1090, contactY: 1170, liveSize: 62, bodySize: 30 };
  const direction = getLocaleDef(locale)?.dir ?? 'ltr';
  const text = (value: string, x: number, y: number, size: number, color = '#ffffff', max = 40): string =>
    splitLines(value, max).map((line, index) => `<text x="${x}" y="${y + index * Math.round(size * 1.14)}" text-anchor="middle" fill="${color}" font-family="${escapeXml(fontFamily(locale))}" font-size="${size}" font-weight="700" direction="${direction}" unicode-bidi="plaintext" xml:lang="${locale}">${escapeXml(line)}</text>`).join('');
  const scheduleSvg = schedule.split('\n').map((line, index) => text(line, region.x + region.w / 2, region.scheduleY + index * 48, region.bodySize, '#f4e6f4', 52)).join('');
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#120518"/><stop offset="1" stop-color="#050107"/></linearGradient></defs>
    <!-- Masks every legacy English line below the protected Guè mark before the local panel is drawn. -->
    <rect x="0" y="${isCover ? 640 : 780}" width="${region.x + region.w + 36}" height="${height - (isCover ? 640 : 780)}" fill="#08010d"/>
    <rect x="${region.x}" y="${region.y}" width="${region.w}" height="${region.h}" rx="18" fill="url(#panel)" stroke="#d71c9d" stroke-opacity="0.52" stroke-width="3"/>
    <rect x="${region.x}" y="${region.y}" width="${region.w}" height="8" rx="4" fill="#ed278f"/>
    ${text(live, region.x + region.w / 2, region.liveY, region.liveSize, '#ff2ea6', 32)}
    ${scheduleSvg}
    ${text(info, region.x + region.w / 2, region.infoY, region.bodySize, '#ffffff', 50)}
    ${text(contact, region.x + region.w / 2, region.contactY, Math.max(23, region.bodySize - 3), '#ffffff', 66)}
  </svg>`);
}

async function render(locale: LocaleCode, kind: ImageKind, source: Buffer): Promise<void> {
  const dimensions = kind === 'cover' ? COVER : POSTER;
  const rendered = await sharp(source)
    .resize(dimensions.width, dimensions.height, { fit: 'fill' })
    .composite([{ input: overlay(locale, kind) }])
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toBuffer();
  await writeFile(path.join(OUTPUT, `gue-just-me-2026-07-25-${kind}-${kind === 'cover' ? '2x1' : '5x4'}-${locale}-v2.jpg`), rendered);
}

async function main(): Promise<void> {
  await mkdir(OUTPUT, { recursive: true });
  const [cover, poster] = await Promise.all([readFile(EN_COVER), readFile(EN_POSTER)]);
  const locales = enabledLocaleCodes.filter((locale) => locale !== 'en');
  for (const locale of locales) {
    await render(locale, 'cover', cover);
    await render(locale, 'poster', poster);
  }
  console.log(JSON.stringify({ ok: true, locales: locales.length, created: locales.length * 2, source: 'approved-en-v2-only' }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
