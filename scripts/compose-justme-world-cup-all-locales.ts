import { createHash } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {
  getWorldCupFinalLocaleCopy,
  validateWorldCupFinalLocaleCopies,
} from '../lib/worldCupFinalLocaleCopies';
import {
  enabledLocaleCodes,
  getLocaleDef,
  type LocaleCode,
} from '../lib/i18n/locales';

const SOURCE_SHA256 = '214FB234404F01B91D61F00D197A9AB0C7890F0BEBB9AB2124AD5EE817AA8E57';
const PHONE = '+39 351 912 7047';
const DOMAIN = 'WWW.NIGHTLIFEMILAN.COM';
const EXPECTED_LOCALES = 33;
const COVER = { width: 2000, height: 1000 } as const;
const POSTER = { width: 1600, height: 1280 } as const;

type Direction = 'ltr' | 'rtl';
type TextAlign = 'start' | 'center';

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TextSpec {
  locale: LocaleCode;
  text: string;
  box: Box;
  baseSize: number;
  minSize: number;
  maxLines: 1 | 2;
  fontFamily: string;
  fontWeight: number;
  fill: string;
  align?: TextAlign;
  direction?: Direction;
  letterSpacing?: number;
  italic?: boolean;
}

interface MeasuredLine {
  text: string;
  width: number;
  height: number;
}

interface FittedText {
  spec: TextSpec;
  fontSize: number;
  lines: MeasuredLine[];
  lineAdvance: number;
}

interface TeamParts {
  first: string;
  separator: string;
  second: string;
}

interface FittedTeam {
  parts: TeamParts;
  fontSize: number;
  separatorSize: number;
  first: MeasuredLine;
  separator: MeasuredLine;
  second: MeasuredLine;
  totalWidth: number;
}

interface GeneratedAsset {
  locale: LocaleCode;
  kind: 'cover' | 'poster';
  outputPath: string;
  width: number;
  height: number;
  buffer: Buffer;
  sha256: string;
}

function sha256(input: Buffer): string {
  return createHash('sha256').update(input).digest('hex').toUpperCase();
}

function escapeXml(value: string): string {
  return value
    .normalize('NFC')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function stripPhone(value: string): string {
  const stripped = value
    .replace(/\+39[\s.\-\u00a0]*351[\s.\-\u00a0]*912[\s.\-\u00a0]*7047/gu, '')
    .replace(/393519127047/gu, '')
    .replace(/\s+/gu, ' ')
    .trim();
  if (!stripped) throw new Error('The localized WhatsApp booking label is empty after phone removal');
  return stripped;
}

function fontsFor(locale: LocaleCode): {
  body: string;
  team: string;
  accent: string;
  direction: Direction;
} {
  const direction = getLocaleDef(locale)?.dir ?? 'ltr';
  if (locale === 'ar') {
    return {
      body: 'Dubai, Tahoma, Arial, sans-serif',
      team: 'Dubai, Tahoma, Arial, sans-serif',
      accent: 'Dubai, Tahoma, Arial, sans-serif',
      direction,
    };
  }
  if (locale === 'zh') {
    return {
      body: 'Microsoft YaHei, SimHei, Arial, sans-serif',
      team: 'Microsoft YaHei, SimHei, Arial, sans-serif',
      accent: 'Microsoft YaHei, SimHei, Arial, sans-serif',
      direction,
    };
  }
  return {
    body: 'Arial, Helvetica, sans-serif',
    team: 'Arial Narrow, Arial, sans-serif',
    accent: 'Georgia, serif',
    direction,
  };
}

const measureCache = new Map<string, { width: number; height: number }>();

async function measureLine(
  text: string,
  fontSize: number,
  fontFamily: string,
  fontWeight: number,
  direction: Direction,
  letterSpacing = 0,
  italic = false,
): Promise<MeasuredLine> {
  const normalized = text.normalize('NFC').trim();
  if (!normalized) throw new Error('Cannot measure an empty poster line');
  const key = JSON.stringify([
    normalized,
    fontSize,
    fontFamily,
    fontWeight,
    direction,
    letterSpacing,
    italic,
  ]);
  const cached = measureCache.get(key);
  if (cached) return { text: normalized, ...cached };

  const svg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="4000" height="500">
      <text x="2000" y="280" text-anchor="middle" fill="#fff"
        font-family="${escapeXml(fontFamily)}" font-size="${fontSize}"
        font-weight="${fontWeight}" font-style="${italic ? 'italic' : 'normal'}"
        letter-spacing="${letterSpacing}" direction="${direction}"
        unicode-bidi="plaintext">${escapeXml(normalized)}</text>
    </svg>
  `);
  const { info } = await sharp(svg).trim().png().toBuffer({ resolveWithObject: true });
  if (!info.width || !info.height) throw new Error(`Poster text rendered blank: ${normalized}`);
  const result = { width: info.width, height: info.height };
  measureCache.set(key, result);
  return { text: normalized, ...result };
}

function splitCandidates(text: string, locale: LocaleCode, maxLines: 1 | 2): string[][] {
  const normalized = text.normalize('NFC').replace(/\s+/gu, ' ').trim();
  const candidates: string[][] = [[normalized]];
  if (maxLines === 1) return candidates;

  const units = locale === 'zh' && !normalized.includes(' ')
    ? [...normalized]
    : normalized.split(' ');
  for (let index = 1; index < units.length; index += 1) {
    const first = units.slice(0, index).join(locale === 'zh' ? '' : ' ').trim();
    const second = units.slice(index).join(locale === 'zh' ? '' : ' ').trim();
    if (first && second) candidates.push([first, second]);
  }
  return candidates;
}

async function fitText(spec: TextSpec): Promise<FittedText> {
  const direction = spec.direction ?? fontsFor(spec.locale).direction;
  const spacing = direction === 'rtl' ? 0 : (spec.letterSpacing ?? 0);

  for (let fontSize = spec.baseSize; fontSize >= spec.minSize; fontSize -= 1) {
    const lineAdvance = Math.ceil(fontSize * 1.14);
    const candidates = splitCandidates(spec.text, spec.locale, spec.maxLines);
    const fitting: { lines: MeasuredLine[]; score: number }[] = [];
    for (const candidate of candidates) {
      if (candidate.length * lineAdvance > spec.box.height) continue;
      const lines = await Promise.all(candidate.map((line) => measureLine(
        line,
        fontSize,
        spec.fontFamily,
        spec.fontWeight,
        direction,
        spacing,
        spec.italic,
      )));
      const widest = Math.max(...lines.map((line) => line.width));
      if (widest > spec.box.width) continue;
      const imbalance = lines.length === 2 ? Math.abs(lines[0].width - lines[1].width) : 0;
      fitting.push({ lines, score: widest + imbalance * 0.18 + (lines.length - 1) * 8 });
    }
    if (fitting.length > 0) {
      fitting.sort((a, b) => a.score - b.score);
      return { spec: { ...spec, direction, letterSpacing: spacing }, fontSize, lines: fitting[0].lines, lineAdvance };
    }
  }

  throw new Error(
    `${spec.locale} text overflow: "${spec.text}" does not fit `
    + `${spec.box.width}x${spec.box.height} at minimum ${spec.minSize}px`,
  );
}

function renderFittedText(fitted: FittedText): string {
  const { spec, fontSize, lines, lineAdvance } = fitted;
  const direction = spec.direction ?? 'ltr';
  const align = spec.align ?? 'center';
  const x = align === 'center'
    ? spec.box.x + spec.box.width / 2
    : direction === 'rtl'
      ? spec.box.x + spec.box.width
      : spec.box.x;
  const anchor = align === 'center' ? 'middle' : direction === 'rtl' ? 'end' : 'start';
  const totalHeight = lines.length * lineAdvance;
  const firstBaseline = spec.box.y + (spec.box.height - totalHeight) / 2 + fontSize * 0.88;
  return lines.map((line, index) => `
    <text x="${x}" y="${firstBaseline + index * lineAdvance}" text-anchor="${anchor}"
      fill="${spec.fill}" font-family="${escapeXml(spec.fontFamily)}"
      font-size="${fontSize}" font-weight="${spec.fontWeight}"
      font-style="${spec.italic ? 'italic' : 'normal'}"
      letter-spacing="${spec.letterSpacing ?? 0}" direction="${direction}"
      unicode-bidi="plaintext" xml:lang="${spec.locale}">${escapeXml(line.text)}</text>
  `).join('');
}

const TEAM_WORD_SEPARATORS = [
  ' ΕΝΑΝΤΙΟΝ ',
  ' ПРОТИВ ',
  ' PROTIV ',
  ' KUNDËR ',
  ' CONTRA ',
  ' PROTI ',
  ' ПРОТИ ',
  ' GEGN ',
  ' MOT ',
  ' VS ',
] as const;

function splitTeam(text: string): TeamParts {
  const normalized = text.normalize('NFC').trim();
  const dash = normalized.match(/^(.+?)\s*[–—]\s*(.+)$/u);
  if (dash) return { first: dash[1].trim(), separator: '–', second: dash[2].trim() };
  for (const separator of TEAM_WORD_SEPARATORS) {
    const index = normalized.indexOf(separator);
    if (index > 0) {
      return {
        first: normalized.slice(0, index).trim(),
        separator: separator.trim(),
        second: normalized.slice(index + separator.length).trim(),
      };
    }
  }
  throw new Error(`Cannot identify the team separator in: ${text}`);
}

async function fitTeam(
  locale: LocaleCode,
  text: string,
  box: Box,
  baseSize: number,
  minSize: number,
): Promise<FittedTeam> {
  const fonts = fontsFor(locale);
  const parts = splitTeam(text);
  for (let fontSize = baseSize; fontSize >= minSize; fontSize -= 1) {
    const separatorSize = Math.max(18, Math.round(fontSize * 0.58));
    const [first, separator, second] = await Promise.all([
      measureLine(parts.first, fontSize, fonts.team, 800, fonts.direction),
      measureLine(parts.separator, separatorSize, fonts.accent, 700, fonts.direction, 0, locale !== 'ar' && locale !== 'zh'),
      measureLine(parts.second, fontSize, fonts.team, 800, fonts.direction),
    ]);
    const gap = Math.round(fontSize * 0.18);
    const totalWidth = first.width + separator.width + second.width + gap * 2;
    const height = Math.max(first.height, separator.height, second.height, Math.ceil(fontSize * 1.05));
    // Keep a visual safety margin because SVG font fallback can render some
    // scripts (notably Greek) wider than libvips reports during measurement.
    if (totalWidth <= box.width * 0.88 && height <= box.height) {
      return { parts, fontSize, separatorSize, first, separator, second, totalWidth };
    }
  }
  throw new Error(
    `${locale} team overflow: "${text}" does not fit ${box.width}x${box.height} at minimum ${minSize}px`,
  );
}

function renderFittedTeam(locale: LocaleCode, fitted: FittedTeam, box: Box): string {
  const fonts = fontsFor(locale);
  const gap = Math.round(fitted.fontSize * 0.18);
  const visual = fonts.direction === 'rtl'
    ? [
      { line: fitted.second, family: fonts.team, size: fitted.fontSize, fill: '#ffffff', italic: false },
      { line: fitted.separator, family: fonts.accent, size: fitted.separatorSize, fill: '#e4bd70', italic: locale !== 'ar' && locale !== 'zh' },
      { line: fitted.first, family: fonts.team, size: fitted.fontSize, fill: '#ffffff', italic: false },
    ]
    : [
      { line: fitted.first, family: fonts.team, size: fitted.fontSize, fill: '#ffffff', italic: false },
      { line: fitted.separator, family: fonts.accent, size: fitted.separatorSize, fill: '#e4bd70', italic: locale !== 'ar' && locale !== 'zh' },
      { line: fitted.second, family: fonts.team, size: fitted.fontSize, fill: '#ffffff', italic: false },
    ];
  let cursor = box.x + (box.width - fitted.totalWidth) / 2;
  const elements: string[] = [];
  for (const [index, item] of visual.entries()) {
    const x = cursor + item.line.width / 2;
    const y = box.y + box.height / 2 + item.size * 0.34;
    elements.push(`
      <text x="${x}" y="${y}" text-anchor="middle" fill="${item.fill}"
        font-family="${escapeXml(item.family)}" font-size="${item.size}"
        font-weight="${index === 1 ? 700 : 800}" font-style="${item.italic ? 'italic' : 'normal'}"
        direction="${fonts.direction}" unicode-bidi="plaintext" xml:lang="${locale}">${escapeXml(item.line.text)}</text>
    `);
    cursor += item.line.width + (index < visual.length - 1 ? gap : 0);
  }
  return elements.join('');
}

function spainFlag(x: number, y: number, width: number, height: number): string {
  const stripe = Math.round(height * 0.26);
  return `
    <g transform="translate(${x} ${y})">
      <rect width="${width}" height="${height}" rx="${Math.round(height * 0.18)}" fill="#f6c900"/>
      <rect width="${width}" height="${stripe}" rx="${Math.round(height * 0.18)}" fill="#c60b1e"/>
      <rect y="${height - stripe}" width="${width}" height="${stripe}" rx="${Math.round(height * 0.18)}" fill="#c60b1e"/>
      <circle cx="${width / 2}" cy="${height / 2}" r="${Math.max(4, Math.round(height * 0.12))}" fill="#b88718"/>
    </g>
  `;
}

function argentinaFlag(x: number, y: number, width: number, height: number): string {
  const stripe = Math.round(height / 3);
  return `
    <g transform="translate(${x} ${y})">
      <rect width="${width}" height="${height}" rx="${Math.round(height * 0.18)}" fill="#ffffff"/>
      <rect width="${width}" height="${stripe}" rx="${Math.round(height * 0.18)}" fill="#75aadb"/>
      <rect y="${height - stripe}" width="${width}" height="${stripe}" rx="${Math.round(height * 0.18)}" fill="#75aadb"/>
      <circle cx="${width / 2}" cy="${height / 2}" r="${Math.max(4, Math.round(height * 0.12))}" fill="#f6b40e"/>
    </g>
  `;
}

function shadowDefs(): string {
  return `
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#000" flood-opacity="0.98"/>
    </filter>
  `;
}

function assertPhoneOnce(svg: string, locale: LocaleCode, kind: string): void {
  const count = svg.split(PHONE).length - 1;
  if (count !== 1) throw new Error(`${locale} ${kind} must render the phone exactly once; found ${count}`);
}

async function makeLogo(source: Buffer, width: number): Promise<{ image: Buffer; width: number; height: number }> {
  const crop = sharp(source)
    .extract({ left: 125, top: 65, width: 466, height: 195 })
    .resize({ width });
  const { data: luma, info } = await crop.clone().greyscale().raw().toBuffer({ resolveWithObject: true });
  const alpha = Buffer.alloc(info.width * info.height);
  for (let index = 0; index < luma.length; index += 1) {
    alpha[index] = Math.max(0, Math.min(255, (luma[index] - 28) * 4.5));
  }
  const image = await sharp({
    create: {
      width: info.width,
      height: info.height,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
  return { image, width: info.width, height: info.height };
}

async function makePlayerArt(source: Buffer, width: number): Promise<{ image: Buffer; width: number; height: number }> {
  const crop = sharp(source).extract({ left: 0, top: 250, width: 714, height: 630 });
  const { data: rgb, info } = await crop.resize({ width }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const maskSvg = Buffer.from(`
    <svg width="${info.width}" height="${info.height}" xmlns="http://www.w3.org/2000/svg">
      <defs><filter id="soft"><feGaussianBlur stdDeviation="24"/></filter></defs>
      <rect x="28" y="20" width="${info.width - 56}" height="${info.height - 40}"
        rx="42" fill="white" filter="url(#soft)"/>
    </svg>
  `);
  const { data: alpha } = await sharp(maskSvg).greyscale().raw().toBuffer({ resolveWithObject: true });
  const image = await sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .joinChannel(alpha, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png()
    .toBuffer();
  return { image, width: info.width, height: info.height };
}

async function buildLocalizedPortrait(locale: LocaleCode, portraitBase: Buffer): Promise<Buffer> {
  const copy = getWorldCupFinalLocaleCopy(locale).poster;
  const fonts = fontsFor(locale);
  const [date, final, worldCupFinal, teams] = await Promise.all([
    fitText({
      locale,
      text: copy.date,
      box: { x: 70, y: 190, width: 418, height: 62 },
      baseSize: 30,
      minSize: 19,
      maxLines: 1,
      fontFamily: fonts.body,
      fontWeight: 700,
      fill: '#ffffff',
      direction: fonts.direction,
      letterSpacing: locale === 'ar' ? 0 : 2,
    }),
    fitText({
      locale,
      text: copy.final,
      box: { x: 96, y: 660, width: 366, height: 62 },
      baseSize: 38,
      minSize: 22,
      maxLines: 1,
      fontFamily: fonts.accent,
      fontWeight: 700,
      fill: '#e4bd70',
      direction: fonts.direction,
      italic: locale !== 'ar' && locale !== 'zh',
    }),
    fitText({
      locale,
      text: copy.worldCupFinal,
      box: { x: 70, y: 882, width: 418, height: 62 },
      baseSize: 22,
      minSize: 14,
      maxLines: 2,
      fontFamily: fonts.body,
      fontWeight: 700,
      fill: '#e4bd70',
      direction: fonts.direction,
      letterSpacing: locale === 'ar' ? 0 : 2,
    }),
    fitTeam(locale, copy.teams, { x: 102, y: 734, width: 354, height: 122 }, 38, 18),
  ]);

  const overlay = `
    <svg width="558" height="1000" viewBox="0 0 558 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="erase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#02030b" stop-opacity="0"/>
          <stop offset="0.08" stop-color="#02030b" stop-opacity="0.99"/>
          <stop offset="1" stop-color="#02030b" stop-opacity="1"/>
        </linearGradient>
        ${shadowDefs()}
      </defs>
      <rect x="40" y="170" width="478" height="102" rx="20" fill="#02030b" fill-opacity="0.94"/>
      <rect x="0" y="610" width="558" height="390" fill="url(#erase)"/>
      <g filter="url(#shadow)">
        ${renderFittedText(date)}
        ${renderFittedText(final)}
        ${renderFittedTeam(locale, teams, { x: 102, y: 734, width: 354, height: 122 })}
        ${renderFittedText(worldCupFinal)}
        ${spainFlag(20, 770, 72, 50)}
        ${argentinaFlag(466, 770, 72, 50)}
      </g>
    </svg>
  `;
  return sharp(portraitBase).composite([{ input: Buffer.from(overlay), left: 0, top: 0 }]).png().toBuffer();
}

async function buildCoverOverlay(locale: LocaleCode): Promise<Buffer> {
  const poster = getWorldCupFinalLocaleCopy(locale).poster;
  const fonts = fontsFor(locale);
  const bookingLabel = stripPhone(poster.bookings);
  const fit = (spec: Omit<TextSpec, 'locale' | 'fontFamily' | 'fontWeight' | 'fill'> & Partial<Pick<TextSpec, 'fontFamily' | 'fontWeight' | 'fill'>>) => fitText({
    locale,
    fontFamily: spec.fontFamily ?? fonts.body,
    fontWeight: spec.fontWeight ?? 700,
    fill: spec.fill ?? '#ffffff',
    direction: spec.direction ?? fonts.direction,
    ...spec,
  });
  const [worldCupFinal, final, teams, date, doors, live, aperitif, bookings, phone, domain] = await Promise.all([
    fit({ text: poster.worldCupFinal, box: { x: 165, y: 105, width: 540, height: 85 }, baseSize: 34, minSize: 20, maxLines: 2, fill: '#e4bd70', letterSpacing: locale === 'ar' ? 0 : 5 }),
    fit({ text: poster.final, box: { x: 165, y: 210, width: 540, height: 90 }, baseSize: 78, minSize: 44, maxLines: 1, fontFamily: fonts.accent, fontWeight: 700, italic: locale !== 'ar' && locale !== 'zh' }),
    fit({ text: poster.teams, box: { x: 165, y: 310, width: 540, height: 80 }, baseSize: 50, minSize: 28, maxLines: 2, fontFamily: fonts.team, fontWeight: 800 }),
    fit({ text: poster.date, box: { x: 165, y: 425, width: 540, height: 50 }, baseSize: 34, minSize: 23, maxLines: 1 }),
    fit({ text: poster.doors, box: { x: 165, y: 505, width: 540, height: 48 }, baseSize: 34, minSize: 23, maxLines: 1 }),
    fit({ text: poster.live, box: { x: 165, y: 565, width: 540, height: 48 }, baseSize: 34, minSize: 23, maxLines: 1 }),
    fit({ text: poster.aperitif, box: { x: 1430, y: 230, width: 430, height: 100 }, baseSize: 39, minSize: 24, maxLines: 2 }),
    fit({ text: bookingLabel, box: { x: 1430, y: 405, width: 430, height: 60 }, baseSize: 30, minSize: 21, maxLines: 2 }),
    fit({ text: PHONE, box: { x: 1430, y: 475, width: 430, height: 45 }, baseSize: 34, minSize: 28, maxLines: 1, fontFamily: fonts.body, fontWeight: 700, fill: '#ffffff', direction: 'ltr', align: 'start' }),
    fit({ text: DOMAIN, box: { x: 1430, y: 570, width: 430, height: 45 }, baseSize: 25, minSize: 19, maxLines: 1, fontFamily: fonts.body, fontWeight: 700, fill: '#e4bd70', direction: 'ltr', letterSpacing: 2, align: 'start' }),
  ]);

  const svg = `
    <svg width="${COVER.width}" height="${COVER.height}" viewBox="0 0 ${COVER.width} ${COVER.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#02030b" stop-opacity="0.98"/>
          <stop offset="0.78" stop-color="#02030b" stop-opacity="0.88"/>
          <stop offset="1" stop-color="#02030b" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="right" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stop-color="#02030b" stop-opacity="0.98"/>
          <stop offset="0.78" stop-color="#02030b" stop-opacity="0.88"/>
          <stop offset="1" stop-color="#02030b" stop-opacity="0"/>
        </linearGradient>
        ${shadowDefs()}
      </defs>
      <rect x="0" y="0" width="790" height="1000" fill="url(#left)"/>
      <rect x="1210" y="0" width="790" height="1000" fill="url(#right)"/>
      <g filter="url(#shadow)">
        ${[worldCupFinal, final, teams, date, doors, live, aperitif, bookings, phone, domain].map(renderFittedText).join('')}
      </g>
    </svg>
  `;
  assertPhoneOnce(svg, locale, 'cover');
  return Buffer.from(svg);
}

async function buildPosterOverlay(locale: LocaleCode): Promise<Buffer> {
  const poster = getWorldCupFinalLocaleCopy(locale).poster;
  const fonts = fontsFor(locale);
  const bookingLabel = stripPhone(poster.bookings);
  const fit = (spec: Omit<TextSpec, 'locale' | 'fontFamily' | 'fontWeight' | 'fill'> & Partial<Pick<TextSpec, 'fontFamily' | 'fontWeight' | 'fill'>>) => fitText({
    locale,
    fontFamily: spec.fontFamily ?? fonts.body,
    fontWeight: spec.fontWeight ?? 700,
    fill: spec.fill ?? '#ffffff',
    direction: spec.direction ?? fonts.direction,
    ...spec,
  });
  const [date, doors, live, aperitif, worldCupFinal, bookings, phone, domain, teams] = await Promise.all([
    fit({ text: poster.date, box: { x: 300, y: 205, width: 1000, height: 62 }, baseSize: 42, minSize: 29, maxLines: 1, letterSpacing: locale === 'ar' ? 0 : 3 }),
    fit({ text: poster.doors, box: { x: 310, y: 805, width: 475, height: 48 }, baseSize: 34, minSize: 22, maxLines: 1 }),
    fit({ text: poster.live, box: { x: 815, y: 805, width: 475, height: 48 }, baseSize: 34, minSize: 22, maxLines: 1 }),
    fit({ text: poster.aperitif, box: { x: 300, y: 854, width: 1000, height: 40 }, baseSize: 27, minSize: 19, maxLines: 1, letterSpacing: locale === 'ar' ? 0 : 2 }),
    fit({ text: poster.worldCupFinal, box: { x: 250, y: 912, width: 1100, height: 54 }, baseSize: 29, minSize: 19, maxLines: 2, fill: '#e4bd70', letterSpacing: locale === 'ar' ? 0 : 5 }),
    fit({ text: bookingLabel, box: { x: 260, y: 1095, width: 1080, height: 35 }, baseSize: 29, minSize: 19, maxLines: 1 }),
    fit({ text: PHONE, box: { x: 300, y: 1132, width: 1000, height: 35 }, baseSize: 29, minSize: 24, maxLines: 1, fontFamily: fonts.body, fontWeight: 700, fill: '#ffffff', direction: 'ltr' }),
    fit({ text: DOMAIN, box: { x: 300, y: 1182, width: 1000, height: 35 }, baseSize: 22, minSize: 18, maxLines: 1, fontFamily: fonts.body, fontWeight: 700, fill: '#d5d6dc', direction: 'ltr', letterSpacing: 6 }),
    fitTeam(locale, poster.teams, { x: 240, y: 970, width: 1120, height: 100 }, 106, 52),
  ]);

  const svg = `
    <svg width="${POSTER.width}" height="${POSTER.height}" viewBox="0 0 ${POSTER.width} ${POSTER.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#02030b" stop-opacity="0.98"/>
          <stop offset="0.72" stop-color="#02030b" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#02030b" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#02030b" stop-opacity="0"/>
          <stop offset="0.18" stop-color="#02030b" stop-opacity="0.82"/>
          <stop offset="0.48" stop-color="#02030b" stop-opacity="0.96"/>
          <stop offset="1" stop-color="#02030b" stop-opacity="1"/>
        </linearGradient>
        ${shadowDefs()}
      </defs>
      <rect width="1600" height="360" fill="url(#top)"/>
      <rect y="650" width="1600" height="630" fill="url(#bottom)"/>
      <rect x="280" y="795" width="1040" height="104" rx="24" fill="#050611" fill-opacity="0.94"/>
      <g>
        ${[date, doors, live, aperitif, worldCupFinal, bookings, phone, domain].map(renderFittedText).join('')}
        ${spainFlag(115, 977, 112, 78)}
        ${argentinaFlag(1373, 977, 112, 78)}
        ${renderFittedTeam(locale, teams, { x: 240, y: 970, width: 1120, height: 100 })}
        <line x1="235" y1="1084" x2="1365" y2="1084" stroke="#7b5d96" stroke-width="2"/>
      </g>
    </svg>
  `;
  assertPhoneOnce(svg, locale, 'poster');
  return sharp(Buffer.from(svg)).ensureAlpha().png().toBuffer();
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function parseArguments(argv: string[]): {
  force: boolean;
  locale?: LocaleCode;
  outputDir: string;
} {
  let force = false;
  let locale: LocaleCode | undefined;
  let outputDir = path.join(process.cwd(), 'public', 'images', 'events', 'generated');
  for (const argument of argv) {
    if (argument === '--force') {
      force = true;
    } else if (argument.startsWith('--locale=')) {
      locale = argument.slice('--locale='.length) as LocaleCode;
    } else if (argument.startsWith('--output-dir=')) {
      outputDir = path.resolve(process.cwd(), argument.slice('--output-dir='.length));
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return { force, locale, outputDir };
}

async function main(): Promise<void> {
  validateWorldCupFinalLocaleCopies();
  const root = process.cwd();
  const sourcePath = path.join(
    root,
    'artifacts',
    'just-me-world-cup-final-2026-draft',
    'faithful-source-cleaned-v4.png',
  );
  const source = await readFile(sourcePath);
  const sourceHash = sha256(source);
  if (sourceHash !== SOURCE_SHA256) {
    throw new Error(`Source artwork hash mismatch: expected ${SOURCE_SHA256}, received ${sourceHash}`);
  }
  const sourceMeta = await sharp(source).metadata();
  if (sourceMeta.width !== 714 || sourceMeta.height !== 1280) {
    throw new Error(`Unexpected source dimensions: ${sourceMeta.width}x${sourceMeta.height}`);
  }

  const args = parseArguments(process.argv.slice(2));
  const missingLocales = enabledLocaleCodes.filter((locale) => locale !== 'en' && locale !== 'it');
  if (missingLocales.length !== EXPECTED_LOCALES) {
    throw new Error(`Expected ${EXPECTED_LOCALES} non-EN/IT locales, received ${missingLocales.length}`);
  }
  if (args.locale && !new Set<LocaleCode>(missingLocales).has(args.locale)) {
    throw new Error(`--locale must select one of the 33 missing locales, received ${args.locale}`);
  }
  const locales = args.locale ? [args.locale] : missingLocales;
  const expectedAssets = args.locale ? 2 : EXPECTED_LOCALES * 2;
  const targets = locales.flatMap((locale) => [
    path.join(args.outputDir, `just-me-world-cup-final-cover-2x1-${locale}-v1.jpg`),
    path.join(args.outputDir, `just-me-world-cup-final-poster-5x4-${locale}-v1.jpg`),
  ]);
  if (!args.force) {
    const collisions = (await Promise.all(targets.map(async (target) => ({
      target,
      exists: await fileExists(target),
    })))).filter((entry) => entry.exists);
    if (collisions.length > 0) {
      throw new Error(`Refusing to overwrite existing assets:\n${collisions.map(({ target }) => target).join('\n')}`);
    }
  }

  const [posterBackground, coverBackground, portraitBase, players, logo] = await Promise.all([
    sharp(source)
      .resize(POSTER.width, POSTER.height, { fit: 'cover', position: 'centre' })
      .blur(24)
      .modulate({ brightness: 0.46, saturation: 1.16 })
      .png()
      .toBuffer(),
    sharp(source)
      .resize(COVER.width, COVER.height, { fit: 'cover', position: 'centre' })
      .blur(30)
      .modulate({ brightness: 0.34, saturation: 1.08 })
      .png()
      .toBuffer(),
    sharp(source)
      .resize({ width: 558, height: 1000, fit: 'fill' })
      .modulate({ brightness: 0.92, saturation: 1.02 })
      .png()
      .toBuffer(),
    makePlayerArt(source, 1120),
    makeLogo(source, 575),
  ]);

  const generated: GeneratedAsset[] = [];
  for (const locale of locales) {
    const [localizedPortrait, coverOverlay, posterOverlay] = await Promise.all([
      buildLocalizedPortrait(locale, portraitBase),
      buildCoverOverlay(locale),
      buildPosterOverlay(locale),
    ]);
    const portraitMeta = await sharp(localizedPortrait).metadata();
    if (portraitMeta.width !== 558 || portraitMeta.height !== 1000) {
      throw new Error(`${locale} localized portrait has invalid dimensions`);
    }
    const portraitLeft = Math.round((COVER.width - 558) / 2);
    const [coverBuffer, posterBuffer] = await Promise.all([
      sharp(coverBackground)
        .composite([
          { input: localizedPortrait, left: portraitLeft, top: 0 },
          { input: coverOverlay, left: 0, top: 0 },
        ])
        .sharpen({ sigma: 0.45, m1: 0.5, m2: 1.05 })
        .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
        .toBuffer(),
      (async () => {
        const withPlayers = await sharp(posterBackground)
          .composite([{ input: players.image, left: 240, top: 165 }])
          .png()
          .toBuffer();
        const withOverlay = await sharp(withPlayers)
          .composite([{ input: posterOverlay, left: 0, top: 0 }])
          .png()
          .toBuffer();
        return sharp(withOverlay)
          .composite([{ input: logo.image, left: Math.round((POSTER.width - logo.width) / 2), top: 22 }])
          .sharpen({ sigma: 0.5, m1: 0.55, m2: 1.1 })
          .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
          .toBuffer();
      })(),
    ]);
    generated.push(
      {
        locale,
        kind: 'cover',
        outputPath: path.join(args.outputDir, `just-me-world-cup-final-cover-2x1-${locale}-v1.jpg`),
        width: COVER.width,
        height: COVER.height,
        buffer: coverBuffer,
        sha256: sha256(coverBuffer),
      },
      {
        locale,
        kind: 'poster',
        outputPath: path.join(args.outputDir, `just-me-world-cup-final-poster-5x4-${locale}-v1.jpg`),
        width: POSTER.width,
        height: POSTER.height,
        buffer: posterBuffer,
        sha256: sha256(posterBuffer),
      },
    );
  }

  if (generated.length !== expectedAssets) {
    throw new Error(`Expected ${expectedAssets} generated assets, received ${generated.length}`);
  }
  for (const asset of generated) {
    const metadata = await sharp(asset.buffer).metadata();
    if (metadata.width !== asset.width || metadata.height !== asset.height) {
      throw new Error(`${asset.locale} ${asset.kind} dimensions do not match the manifest`);
    }
    const validRatio = asset.kind === 'cover'
      ? metadata.width! * COVER.height === metadata.height! * COVER.width
      : metadata.width! * POSTER.height === metadata.height! * POSTER.width;
    if (!validRatio) throw new Error(`${asset.locale} ${asset.kind} has an invalid aspect ratio`);
  }

  await mkdir(args.outputDir, { recursive: true });
  for (const asset of generated) {
    await writeFile(asset.outputPath, asset.buffer, args.force ? undefined : { flag: 'wx' });
  }

  const manifest = {
    source: {
      path: path.relative(root, sourcePath).replaceAll('\\', '/'),
      sha256: sourceHash,
      width: sourceMeta.width,
      height: sourceMeta.height,
    },
    mode: args.locale ? 'single-locale-test' : 'full-33-locale-batch',
    force: args.force,
    outputDir: args.outputDir,
    localeCount: locales.length,
    expectedAssetCount: expectedAssets,
    assetCount: generated.length,
    assets: generated.map((asset) => ({
      locale: asset.locale,
      kind: asset.kind,
      path: path.relative(root, asset.outputPath).replaceAll('\\', '/'),
      width: asset.width,
      height: asset.height,
      ratio: asset.kind === 'cover' ? '2:1' : '5:4',
      bytes: asset.buffer.length,
      sha256: asset.sha256,
    })),
  };
  process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
}

void main().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.stack ?? error.message : String(error)}\n`);
  process.exitCode = 1;
});
