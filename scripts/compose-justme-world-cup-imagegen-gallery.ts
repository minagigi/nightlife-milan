import { createHash } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { EVENT_BATCH_LOCALE_FALLBACKS } from '../lib/eventBatchLocaleFallbacks';
import { getEventLocalePack } from '../lib/eventLocalePacks';
import { enabledLocaleCodes, getLocaleDef, type LocaleCode } from '../lib/i18n/locales';
import { getWorldCupFinalLocaleCopy } from '../lib/worldCupFinalLocaleCopies';
import { getWorldCupFinalLocalizedContent } from '../lib/worldCupFinalLocales';
import {
  getWorldCupFinalGeneratedImagePath,
  WORLD_CUP_FINAL_GALLERY_KINDS,
  type WorldCupFinalGalleryKind,
} from '../lib/worldCupFinalVisuals';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, 'public', 'images', 'events', 'generated');
const MASTER_DIR = path.join(ROOT, 'artifacts', 'just-me-world-cup-final-2026-draft', 'imagegen-masters');
const WIDTH = 1600;
const HEIGHT = 1280;
const PHONE = '+39 351 912 7047';
const DOMAIN = 'NIGHTLIFEMILAN.COM';

const MASTERS: Record<WorldCupFinalGalleryKind, string> = {
  programme: path.join(MASTER_DIR, 'world-cup-programme-5x4-fullbleed-master-v2.png'),
  target: path.join(MASTER_DIR, 'world-cup-target-5x4-fullbleed-master-v2.png'),
  dress: path.join(MASTER_DIR, 'world-cup-dress-5x4-fullbleed-master-v2.png'),
  afterparty: path.join(MASTER_DIR, 'world-cup-afterparty-5x4-fullbleed-master-v2.png'),
};

type Direction = 'ltr' | 'rtl';

interface TextLine {
  text: string;
  preferredSize: number;
  minimumSize: number;
  color?: string;
  weight?: number;
  maxLines?: 1 | 2 | 3;
}

interface RenderedLine {
  text: string;
  width: number;
}

function escapeXml(value: string): string {
  return value.normalize('NFC')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function fontFamily(locale: LocaleCode): string {
  if (locale === 'ar') return 'Dubai, Tahoma, Arial, sans-serif';
  if (locale === 'zh') return 'Microsoft YaHei, SimHei, Arial, sans-serif';
  return 'Arial, Helvetica, sans-serif';
}

function direction(locale: LocaleCode): Direction {
  return getLocaleDef(locale)?.dir ?? 'ltr';
}

async function measure(text: string, size: number, locale: LocaleCode, weight: number): Promise<number> {
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="240"><text x="1200" y="150" text-anchor="middle" fill="#fff" font-family="${escapeXml(fontFamily(locale))}" font-size="${size}" font-weight="${weight}" direction="${direction(locale)}" unicode-bidi="plaintext">${escapeXml(text)}</text></svg>`);
  const { info } = await sharp(svg).trim().png().toBuffer({ resolveWithObject: true });
  return info.width;
}

function candidates(text: string, locale: LocaleCode, maxLines: 1 | 2 | 3): string[][] {
  const normalized = text.normalize('NFC').replace(/\s+/gu, ' ').trim();
  if (maxLines === 1) return [[normalized]];
  const units = locale === 'zh' && !normalized.includes(' ') ? [...normalized] : normalized.split(' ');
  const joiner = locale === 'zh' && !normalized.includes(' ') ? '' : ' ';
  const rows: string[][] = [[normalized]];
  if (maxLines >= 2) {
    for (let first = 1; first < units.length; first += 1) {
      rows.push([units.slice(0, first).join(joiner), units.slice(first).join(joiner)]);
    }
  }
  if (maxLines === 3) {
    for (let first = 1; first < units.length - 1; first += 1) {
      for (let second = first + 1; second < units.length; second += 1) {
        rows.push([
          units.slice(0, first).join(joiner),
          units.slice(first, second).join(joiner),
          units.slice(second).join(joiner),
        ]);
      }
    }
  }
  return rows.filter((row) => row.every(Boolean));
}

async function fit(spec: TextLine, locale: LocaleCode, maxWidth: number): Promise<{ size: number; lines: RenderedLine[] }> {
  const weight = spec.weight ?? 700;
  for (let size = spec.preferredSize; size >= spec.minimumSize; size -= 1) {
    const options = candidates(spec.text, locale, spec.maxLines ?? 1);
    let best: RenderedLine[] | null = null;
    let bestScore = Number.POSITIVE_INFINITY;
    for (const option of options) {
      const widths = await Promise.all(option.map((line) => measure(line, size, locale, weight)));
      if (Math.max(...widths) > maxWidth) continue;
      const score = Math.max(...widths) - Math.min(...widths) + option.length * 14;
      if (score < bestScore) {
        best = option.map((line, index) => ({ text: line, width: widths[index] }));
        bestScore = score;
      }
    }
    if (best) return { size, lines: best };
  }
  throw new Error(`${locale}: text does not fit: ${spec.text}`);
}

function roleText(locale: LocaleCode, kind: WorldCupFinalGalleryKind): TextLine[] {
  const content = getWorldCupFinalLocalizedContent(locale);
  const copy = getWorldCupFinalLocaleCopy(locale);
  const pack = getEventLocalePack(locale);
  if (!pack) throw new Error(`Missing event locale pack: ${locale}`);
  const contact = `WhatsApp ${PHONE} · ${DOMAIN}`;

  if (kind === 'programme') {
    return [
      { text: pack.eventbrite.programmeTitle, preferredSize: 46, minimumSize: 32, color: '#d9b55f', maxLines: 1 },
      { text: `${copy.poster.doors} · ${copy.poster.live}`, preferredSize: 29, minimumSize: 22, maxLines: 2 },
      { text: copy.poster.aperitif, preferredSize: 28, minimumSize: 22, maxLines: 2 },
    ];
  }
  if (kind === 'target') {
    return [
      { text: content.sections[1].title, preferredSize: 52, minimumSize: 34, color: '#d9b55f', maxLines: 2 },
      { text: '21+ · ID', preferredSize: 56, minimumSize: 42, maxLines: 1 },
      { text: copy.poster.teams, preferredSize: 35, minimumSize: 26, maxLines: 2 },
      { text: contact, preferredSize: 28, minimumSize: 22, maxLines: 1 },
    ];
  }
  if (kind === 'dress') {
    return [
      { text: content.sections[0].title, preferredSize: 50, minimumSize: 33, color: '#d9b55f', maxLines: 2 },
      { text: EVENT_BATCH_LOCALE_FALLBACKS[locale].elegantDressLongTrousers, preferredSize: 35, minimumSize: 26, maxLines: 3 },
      { text: '21+ · Just Me Milano', preferredSize: 30, minimumSize: 24, maxLines: 1 },
    ];
  }
  return [
    { text: content.sections[3].title, preferredSize: 52, minimumSize: 34, color: '#d9b55f', maxLines: 2 },
    { text: `${content.programme[4].start} · Uptown Nights`, preferredSize: 37, minimumSize: 27, maxLines: 2 },
    { text: content.programme[5].start, preferredSize: 34, minimumSize: 26, maxLines: 1 },
    { text: contact, preferredSize: 28, minimumSize: 22, maxLines: 1 },
  ];
}

async function typography(locale: LocaleCode, kind: WorldCupFinalGalleryKind): Promise<Buffer> {
  const specs = roleText(locale, kind);
  const fitted = await Promise.all(specs.map((line) => fit(line, locale, 1360)));
  const heights = fitted.map(({ size, lines }) => Math.ceil(size * 1.16) * lines.length);
  const gaps = fitted.length - 1;
  const bottomPadding = 44;
  const minimumTop = 720;
  const available = HEIGHT - minimumTop - bottomPadding;
  const contentHeight = heights.reduce((sum, value) => sum + value, 0);
  const gap = Math.min(20, Math.max(9, Math.floor((available - contentHeight) / Math.max(gaps, 1))));
  if (contentHeight + gap * gaps > available) throw new Error(`${locale} ${kind}: typography exceeds full-bleed safe area`);

  let y = HEIGHT - bottomPadding - contentHeight - gap * gaps;
  const lines: string[] = [];
  fitted.forEach(({ size, lines: fittedLines }, index) => {
    const spec = specs[index];
    const lineHeight = Math.ceil(size * 1.16);
    fittedLines.forEach((line, lineIndex) => {
      const baseline = y + size + lineIndex * lineHeight;
      lines.push(`<text x="800" y="${baseline}" text-anchor="middle" fill="${spec.color ?? '#ffffff'}" stroke="#050505" stroke-width="2" paint-order="stroke fill" filter="url(#text-shadow)" font-family="${escapeXml(fontFamily(locale))}" font-size="${size}" font-weight="${spec.weight ?? 700}" direction="${direction(locale)}" unicode-bidi="plaintext" xml:lang="${locale}">${escapeXml(line.text)}</text>`);
    });
    y += lineHeight * fittedLines.length + gap;
  });

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <linearGradient id="readability-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#050505" stop-opacity="0"/>
        <stop offset="36%" stop-color="#050505" stop-opacity="0.12"/>
        <stop offset="68%" stop-color="#050505" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#050505" stop-opacity="0.84"/>
      </linearGradient>
      <filter id="text-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.9"/>
      </filter>
    </defs>
    <rect x="0" y="470" width="${WIDTH}" height="810" fill="url(#readability-gradient)"/>
    ${lines.join('')}
  </svg>`);
}

function sha256(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('hex');
}

async function exists(file: string): Promise<boolean> {
  try { await access(file); return true; } catch { return false; }
}

async function main(): Promise<void> {
  const force = process.argv.includes('--force');
  const localeArg = process.argv.find((value) => value.startsWith('--locale='))?.split('=')[1] as LocaleCode | undefined;
  if (localeArg && !enabledLocaleCodes.includes(localeArg)) throw new Error(`Unsupported locale: ${localeArg}`);
  const locales = localeArg ? [localeArg] : enabledLocaleCodes;

  await mkdir(OUTPUT, { recursive: true });
  const masters = Object.fromEntries(await Promise.all(WORLD_CUP_FINAL_GALLERY_KINDS.map(async (kind) => {
    const input = await readFile(MASTERS[kind]);
    const metadata = await sharp(input).metadata();
    if (!metadata.width || !metadata.height || metadata.width < 1200 || metadata.height < 960
      || Math.abs(metadata.width / metadata.height - WIDTH / HEIGHT) > 0.01) {
      throw new Error(`${kind}: unexpected GPT master dimensions ${metadata.width}x${metadata.height}`);
    }
    return [kind, input];
  }))) as Record<WorldCupFinalGalleryKind, Buffer>;

  const manifest: Array<{ locale: LocaleCode; kind: WorldCupFinalGalleryKind; file: string; width: number; height: number; bytes: number; sha256: string }> = [];
  for (const locale of locales) {
    for (const kind of WORLD_CUP_FINAL_GALLERY_KINDS) {
      const relative = getWorldCupFinalGeneratedImagePath(locale, kind).replace(/^\//, '');
      const output = path.join(ROOT, 'public', ...relative.split('/'));
      if (!force && await exists(output)) throw new Error(`Refusing to overwrite existing asset: ${output}`);
      const base = await sharp(masters[kind]).resize(WIDTH, HEIGHT, { fit: 'fill' }).png().toBuffer();
      const buffer = await sharp(base)
        .composite([{ input: await typography(locale, kind), left: 0, top: 0 }])
        .jpeg({ quality: 86, chromaSubsampling: '4:2:0', mozjpeg: true })
        .toBuffer();
      await writeFile(output, buffer);
      const metadata = await sharp(buffer).metadata();
      manifest.push({ locale, kind, file: relative, width: metadata.width!, height: metadata.height!, bytes: buffer.length, sha256: sha256(buffer) });
    }
  }

  const manifestFile = path.join(ROOT, 'artifacts', 'just-me-world-cup-final-2026-draft', `imagegen-gallery-manifest${localeArg ? `-${localeArg}` : ''}.json`);
  await writeFile(manifestFile, `${JSON.stringify({ generatedAt: new Date().toISOString(), source: 'OpenAI built-in imagegen', masters: MASTERS, assets: manifest }, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ ok: true, locales: locales.length, assets: manifest.length, manifestFile }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
