import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { getEventLocalePack } from '../lib/eventLocalePacks';
import { BAD_BUNNY_ARIA_EDITORIAL_COPY } from '../lib/badBunnyAriaEditorialCopy';
import { getBadBunnyAriaLocalizedContent } from '../lib/badBunnyAriaLocales';
import {
  BAD_BUNNY_ARIA_PHONE,
  getBadBunnyAriaImagePath,
  type BadBunnyAriaImageKind,
} from '../lib/badBunnyAria';
import { enabledLocaleCodes, getLocaleDef, type LocaleCode } from '../lib/i18n/locales';

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, 'artifacts', 'bad-bunny-aria-2026-07-18', 'source');
const SOURCES: Record<BadBunnyAriaImageKind, string> = {
  cover: path.join(SOURCE_DIR, 'aria-xceed-clean-master.png'),
  poster: path.join(SOURCE_DIR, 'aria-xceed-clean-master.png'),
  venue: path.join(SOURCE_DIR, 'aria-target-arrival.png'),
  aperitivo: path.join(SOURCE_DIR, 'aria-aperitivo-crowd.png'),
  club: path.join(SOURCE_DIR, 'aria-reggaeton-dancefloor.png'),
  tables: path.join(SOURCE_DIR, 'aria-vip-tables.png'),
};
const FIVE_FOUR = { width: 1600, height: 1280 } as const;
const COVER = { width: 2000, height: 1000 } as const;

function escapeXml(value: string): string {
  return value.normalize('NFC').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function fontFamily(locale: LocaleCode): string {
  if (locale === 'ar') return 'Dubai, Tahoma, Arial, sans-serif';
  if (locale === 'zh') return 'Microsoft YaHei, SimHei, Arial, sans-serif';
  return 'Arial, Helvetica, sans-serif';
}

function splitLines(text: string, maxUnits: number, maxLines = 2): string[] {
  const normalized = text.replace(/\s+/gu, ' ').trim();
  if ([...normalized].length <= maxUnits) return [normalized];
  const tokens = normalized.includes(' ') ? normalized.split(' ') : [...normalized];
  const joiner = normalized.includes(' ') ? ' ' : '';
  const lines: string[] = [];
  let line = '';
  for (const token of tokens) {
    const candidate = line ? `${line}${joiner}${token}` : token;
    if ([...candidate].length <= maxUnits || !line) line = candidate;
    else { lines.push(line); line = token; }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${[...kept[maxLines - 1]].slice(0, Math.max(4, maxUnits - 1)).join('')}…`;
  return kept;
}

function textSvg(locale: LocaleCode, width: number, height: number, options: {
  position: 'cover-left' | 'poster-top' | 'bottom';
  title: string;
  subtitle: string;
  detail: string;
}): Buffer {
  const isCover = options.position === 'cover-left';
  const isTop = options.position === 'poster-top';
  const panelX = isCover ? 0 : 0;
  const panelY = isCover || isTop ? 0 : height - 270;
  const panelW = isCover ? 930 : width;
  const panelH = isCover ? height : isTop ? 365 : 270;
  const anchor = isCover ? 'start' : 'middle';
  const x = isCover ? 100 : width / 2;
  const firstY = isCover ? 210 : panelY + 82;
  const titleSize = isCover ? 66 : isTop ? 58 : 48;
  const maxUnits = isCover ? 26 : isTop ? 38 : 48;
  const lines = splitLines(options.title, maxUnits, 2);
  const dir = getLocaleDef(locale)?.dir ?? 'ltr';
  const family = escapeXml(fontFamily(locale));
  const title = lines.map((line, index) => `<text x="${x}" y="${firstY + index * Math.round(titleSize * 1.12)}" text-anchor="${anchor}" fill="#ffffff" font-family="${family}" font-size="${titleSize}" font-weight="800" direction="${dir}" unicode-bidi="plaintext" xml:lang="${locale}">${escapeXml(line)}</text>`).join('');
  const subtitleY = firstY + lines.length * Math.round(titleSize * 1.12) + 38;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#090019" stop-opacity="0.98"/><stop offset="1" stop-color="#241054" stop-opacity="0.88"/></linearGradient></defs>
    <rect x="${panelX}" y="${panelY}" width="${panelW}" height="${panelH}" fill="url(#p)"/>
    <rect x="${panelX}" y="${panelY}" width="${isCover ? 8 : panelW}" height="${isCover ? panelH : 7}" fill="#f49bff"/>
    ${title}
    <text x="${x}" y="${subtitleY}" text-anchor="${anchor}" fill="#f6a7ff" font-family="${family}" font-size="${isCover ? 35 : 31}" font-weight="700" direction="${dir}" unicode-bidi="plaintext" xml:lang="${locale}">${escapeXml(options.subtitle)}</text>
    <text x="${x}" y="${subtitleY + (isCover ? 62 : 53)}" text-anchor="${anchor}" fill="#ffffff" font-family="${family}" font-size="${isCover ? 28 : 25}" font-weight="600" direction="${dir}" unicode-bidi="plaintext" xml:lang="${locale}">${escapeXml(options.detail)}</text>
  </svg>`);
}

async function posterBase(input: Buffer, dimensions: { width: number; height: number }): Promise<Buffer> {
  const background = await sharp(input).resize(dimensions.width, dimensions.height, { fit: 'cover' }).blur(30).modulate({ brightness: 0.55, saturation: 1.15 }).png().toBuffer();
  const foreground = await sharp(input).resize(dimensions.width, dimensions.height, { fit: 'contain', position: 'right', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp(background).composite([{ input: foreground }]).png().toBuffer();
}

async function render(locale: LocaleCode, kind: BadBunnyAriaImageKind, source: Buffer, title: string, subtitle: string, detail: string): Promise<void> {
  const dimensions = kind === 'cover' ? COVER : FIVE_FOUR;
  const base = kind === 'cover' || kind === 'poster'
    ? await posterBase(source, dimensions)
    : await sharp(source).resize(dimensions.width, dimensions.height, { fit: 'cover', position: 'attention' }).png().toBuffer();
  const position = kind === 'cover' ? 'cover-left' : kind === 'poster' ? 'poster-top' : 'bottom';
  const result = await sharp(base).composite([{ input: textSvg(locale, dimensions.width, dimensions.height, { position, title, subtitle, detail }) }]).jpeg({ quality: 91, chromaSubsampling: '4:4:4' }).toBuffer();
  const relative = getBadBunnyAriaImagePath(locale, kind).replace(/^\//, '');
  await writeFile(path.join(ROOT, 'public', ...relative.split('/')), result);
}

async function main(): Promise<void> {
  await mkdir(path.join(ROOT, 'public', 'images', 'events', 'generated'), { recursive: true });
  const sourceEntries = await Promise.all(Object.entries(SOURCES).map(async ([kind, file]) => [kind, await readFile(file)] as const));
  const sources = Object.fromEntries(sourceEntries) as Record<BadBunnyAriaImageKind, Buffer>;
  for (const locale of enabledLocaleCodes) {
    const content = getBadBunnyAriaLocalizedContent(locale);
    const pack = getEventLocalePack(locale)!;
    const copy = BAD_BUNNY_ARIA_EDITORIAL_COPY[locale];
    const date = new Intl.DateTimeFormat(getLocaleDef(locale)?.hreflang || locale, { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Rome' }).format(new Date('2026-07-18T12:00:00+02:00'));
    const contact = `18+ · WhatsApp ${BAD_BUNNY_ARIA_PHONE}`;
    await render(locale, 'cover', sources.cover, content.title, `ARIA CLUB · ${date}`, `19:30–05:00 · ${contact}`);
    await render(locale, 'poster', sources.poster, content.title, `ARIA CLUB · ${date}`, `19:30–05:00 · ${contact}`);
    await render(locale, 'venue', sources.venue, copy.targetLabel, content.title, contact);
    await render(locale, 'aperitivo', sources.aperitivo, content.programme[0].title, '19:30 · ARIA CLUB', contact);
    await render(locale, 'club', sources.club, content.programme.at(-1)?.title || pack.eventbrite.programmeTitle, '23:00–05:00 · REGGAETON', contact);
    await render(locale, 'tables', sources.tables, pack.eventbrite.bookTable, 'ARIA CLUB · XCEED', contact);
  }
  console.log(JSON.stringify({ ok: true, locales: enabledLocaleCodes.length, assets: enabledLocaleCodes.length * 6 }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
