import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const logoUrl = process.argv[2];
if (!logoUrl) throw new Error('Usage: node scripts/make-square-from-eventbrite-logo.mjs <logo-url>');

const dir = path.resolve('public/images/events/generated');
fs.mkdirSync(dir, { recursive: true });

const src = Buffer.from(await (await fetch(logoUrl)).arrayBuffer());
const meta = await sharp(src).metadata();
const sourcePath = path.join(dir, 'just-me-university-party-original-eventbrite.jpg');
await sharp(src).jpeg({ quality: 96 }).toFile(sourcePath);

const size = Math.min(meta.width, meta.height);
const maxLeft = Math.max(0, meta.width - size);
const cropSpecs = [
  { name: 'center', left: Math.round(maxLeft * 0.5) },
  { name: 'text-focus', left: Math.round(maxLeft * 0.58) },
  { name: 'left-context', left: Math.round(maxLeft * 0.34) },
];

const files = [];
for (const spec of cropSpecs) {
  const output = path.join(dir, `just-me-university-party-1x1-${spec.name}.jpg`);
  await sharp(src)
    .extract({
      left: Math.max(0, Math.min(maxLeft, spec.left)),
      top: 0,
      width: size,
      height: size,
    })
    .resize(1080, 1080, { fit: 'fill' })
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(output);
  files.push(output);
}

console.log(JSON.stringify({ meta, sourcePath, files }, null, 2));
