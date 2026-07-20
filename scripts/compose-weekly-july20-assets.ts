#!/usr/bin/env npx tsx
/**
 * Creates the weekly July 20 visual package.
 *
 * Posters remain real event artwork. The four supporting images come from an
 * externally reviewed 2x2 mood sheet, so they are literal event visuals and
 * never receive generic copy, dates or booking text.
 */
import path from 'node:path';
import { constants } from 'node:fs';
import { access, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

type EventVisual = { key: string; source: string };

const ROOT = path.resolve('public/images/events/generated/weekly-2026-07-20');
const SOURCE = path.resolve('artifacts/weekly-2026-07-20/source');
const MOOD_SHEET_ROOT = path.resolve('artifacts/weekly-2026-07-20/visual-v3');
const PHONE = '+39 351 912 7047';

const EVENTS: readonly EventVisual[] = [
  { key: 'justme-university-2026-07-21', source: 'university-party-justme.jpg' },
  { key: 'justme-wednesday-2026-07-22', source: 'wednesday-night-justme.jpg' },
  { key: 'justme-thursday-2026-07-23', source: 'thursday-night-justme.jpg' },
  { key: 'justme-friday-2026-07-24', source: 'friday-night-justme.jpg' },
  { key: 'aria-friday-2026-07-24', source: 'friday-night-aria.png' },
  { key: 'pineta-friday-2026-07-24', source: 'friday-night-pineta.jpg' },
  { key: 'aria-saturday-2026-07-25', source: 'saturday-night-aria.png' },
  { key: 'pineta-saturday-2026-07-25', source: 'saturday-night-pineta.jpg' },
  { key: 'justme-sunday-2026-07-26', source: 'sunday-night-justme.jpg' },
] as const;

const MOOD_SHEET_ALIASES: Record<string, string> = {
  'justme-university-2026-07-21': 'university-party-just-me-mood-sheet-v3.png',
};

function contactOverlay(width: number, height: number, compact: boolean): Buffer {
  const bandHeight = compact ? 92 : 112;
  const start = height - bandHeight;
  const fontSize = compact ? 25 : 30;
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="contact" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#06030c" stop-opacity="0"/><stop offset=".24" stop-color="#06030c" stop-opacity=".72"/><stop offset="1" stop-color="#06030c" stop-opacity=".94"/></linearGradient></defs>
    <rect y="${start - 36}" width="${width}" height="${bandHeight + 36}" fill="url(#contact)"/>
    <text x="${width / 2}" y="${start + fontSize + 4}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="1">INFO &amp; BOOKING  ${PHONE}</text>
    <text x="${width / 2}" y="${start + fontSize * 2 + 15}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="${Math.round(fontSize * .78)}" font-weight="600" letter-spacing="2">WWW.NIGHTLIFEMILAN.COM</text>
  </svg>`);
}

/** Replaces the old booking line inside the real poster without touching its title or artwork. */
function posterContactReplacement(width: number, height: number, posterTop: number, posterHeight: number): Buffer {
  const bandHeight = 108;
  const start = posterTop + posterHeight - bandHeight;
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect y="${start}" width="${width}" height="${bandHeight}" fill="#06030c"/>
    <text x="${width / 2}" y="${start + 43}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="1">INFO &amp; BOOKING  ${PHONE}</text>
    <text x="${width / 2}" y="${start + 79}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="21" font-weight="600" letter-spacing="2">WWW.NIGHTLIFEMILAN.COM</text>
  </svg>`);
}

/**
 * Keeps the poster fully visible. The added 5:4 area is a softened extension
 * of the same official artwork rather than a black bar or destructive crop.
 */
async function recomposePoster(source: string, width: number, height: number, out: string): Promise<void> {
  const background = await sharp(source).resize(width, height, { fit: 'cover' }).blur(34).modulate({ brightness: 0.62, saturation: 1.06 }).png().toBuffer();
  const posterHeight = Math.round(width / 2);
  const posterTop = Math.max(0, Math.round((height - posterHeight) * 0.26));
  const poster = await sharp(source).resize(width, posterHeight, { fit: 'contain' }).png().toBuffer();
  await sharp(background)
    .composite([{ input: poster, top: posterTop, left: 0 }, { input: posterContactReplacement(width, height, posterTop, posterHeight) }])
    .png({ compressionLevel: 9 })
    .toFile(out);
}

/**
 * The Eventbrite preview may crop a small outer strip even when the uploaded
 * file is exactly 2:1. Keep the complete official poster inside an 80% safe
 * area and extend only the surrounding artwork. This is a true reframe: no
 * poster pixel, logo, face or event line is cropped or regenerated.
 */
async function recomposeCover(source: string, width: number, height: number, out: string): Promise<void> {
  const background = await sharp(source).resize(width, height, { fit: 'cover' }).blur(22).modulate({ brightness: 0.62, saturation: 1.06 }).png().toBuffer();
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Cannot read poster dimensions: ${source}`);
  const safeWidth = Math.round(width * 0.90);
  const safeHeight = Math.round(height * 0.94);
  const scale = Math.min(safeWidth / metadata.width, safeHeight / metadata.height);
  const posterWidth = Math.round(metadata.width * scale);
  const posterHeight = Math.round(metadata.height * scale);
  const poster = await sharp(source)
    .resize(posterWidth, posterHeight, { fit: 'fill' })
    .composite([{ input: posterContactReplacement(posterWidth, posterHeight, 0, posterHeight), top: 0, left: 0 }])
    .png()
    .toBuffer();
  await sharp(background)
    .composite([{ input: poster, left: Math.round((width - posterWidth) / 2), top: Math.round((height - posterHeight) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(out);
}

async function exists(file: string): Promise<boolean> {
  try { await access(file, constants.R_OK); return true; } catch { return false; }
}

async function moodSheetFor(event: EventVisual): Promise<string> {
  const candidates = [
    MOOD_SHEET_ALIASES[event.key] && path.join(MOOD_SHEET_ROOT, MOOD_SHEET_ALIASES[event.key]),
    path.join(MOOD_SHEET_ROOT, `${event.key}-mood-sheet-v3.png`),
  ].filter((candidate): candidate is string => Boolean(candidate));
  for (const candidate of candidates) if (await exists(candidate)) return candidate;
  throw new Error(`Missing reviewed 2x2 mood sheet for ${event.key}. Expected ${candidates.join(' or ')}`);
}

async function reframeMoodPanel(panel: Buffer, out: string): Promise<void> {
  await sharp(panel)
    .resize(1400, 1120, { fit: 'cover', position: 'attention' })
    .png({ compressionLevel: 9 })
    .toFile(out);
}

/**
 * Generated contact sheets vary in their outer dimensions. Split the four
 * quadrants, remove the thin neutral divider and make a deliberate attention-
 * weighted 5:4 reframe. The generated compositions keep their focal people,
 * food, furniture and architecture inside the safe centre; no blind centre
 * crop, text overlay or padding is allowed.
 */
async function splitMoodSheet(sheet: string, eventKey: string): Promise<void> {
  const { width, height } = await sharp(sheet).metadata();
  if (!width || !height) throw new Error(`Cannot read mood sheet dimensions: ${sheet}`);
  const gutterX = width === 1402 ? 2 : 4;
  const gutterY = height === 1122 ? 2 : height % 2 === 0 ? 4 : 3;
  const panelWidth = Math.floor((width - gutterX) / 2);
  const panelHeight = Math.floor((height - gutterY) / 2);
  if (panelWidth < 500 || panelHeight < 400) throw new Error(`Mood sheet quadrants are too small: ${width}x${height}: ${sheet}`);
  const positions = [
    { left: 0, top: 0 }, { left: panelWidth + gutterX, top: 0 },
    { left: 0, top: panelHeight + gutterY }, { left: panelWidth + gutterX, top: panelHeight + gutterY },
  ];
  await Promise.all(positions.map(async ({ left, top }, index) => {
    const extracted = await sharp(sheet)
      .extract({ left, top, width: panelWidth, height: panelHeight })
      .png()
      .toBuffer();
    const panel = await sharp(extracted)
      .trim({ background: { r: 255, g: 255, b: 255 }, threshold: 12 })
      .png()
      .toBuffer();
    await reframeMoodPanel(panel, path.join(ROOT, `${eventKey}-mood-${index + 1}-5x4-v3.png`));
  }));
}

async function main(): Promise<void> {
  await mkdir(ROOT, { recursive: true });
  const selectedKey = process.argv.find((argument) => argument.startsWith('--event='))?.slice('--event='.length);
  const postersOnly = process.argv.includes('--posters-only');
  if (selectedKey && !EVENTS.some((event) => event.key === selectedKey)) throw new Error(`Unknown event key: ${selectedKey}`);
  const events = selectedKey ? EVENTS.filter((event) => event.key === selectedKey) : EVENTS;
  let generated = 0;
  for (const event of events) {
    const source = path.join(SOURCE, event.source);
    for (const locale of ['it', 'en'] as const) {
      await recomposeCover(source, 1800, 900, path.join(ROOT, `${event.key}-${locale}-cover-2x1-v5.png`));
      await recomposePoster(source, 1400, 1120, path.join(ROOT, `${event.key}-${locale}-poster-5x4-v3.png`));
      generated += 2;
    }
    if (!postersOnly) { await splitMoodSheet(await moodSheetFor(event), event.key); generated += 4; }
  }
  console.log(JSON.stringify({ generated, events: events.length, locales: 2, postersOnly, root: ROOT }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
