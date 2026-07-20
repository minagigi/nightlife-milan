import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const inputDir = path.join(root, 'public', 'images', 'events');
const outputDir = path.join(root, 'artifacts', 'just-me-world-cup-final-2026-draft');
const files = (await fs.readdir(inputDir))
  .filter((name) => /^xceed-justme-.*\.jpg$/i.test(name))
  .sort();

const cellWidth = 520;
const cellHeight = 350;
const columns = 2;
const rows = Math.ceil(files.length / columns);
const layers = [];

for (const [index, name] of files.entries()) {
  const left = (index % columns) * cellWidth;
  const top = Math.floor(index / columns) * cellHeight;
  const image = await sharp(path.join(inputDir, name))
    .resize(cellWidth, cellHeight - 44, { fit: 'contain', background: '#08090b' })
    .jpeg({ quality: 88 })
    .toBuffer();
  const label = Buffer.from(`
    <svg width="${cellWidth}" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#111216"/>
      <text x="18" y="29" fill="#fff" font-family="Arial" font-size="18">${name.replaceAll('&', '&amp;')}</text>
    </svg>
  `);
  layers.push({ input: image, left, top });
  layers.push({ input: label, left, top: top + cellHeight - 44 });
}

await fs.mkdir(outputDir, { recursive: true });
const output = path.join(outputDir, 'just-me-poster-archive-contact-sheet.jpg');
await sharp({
  create: {
    width: cellWidth * columns,
    height: cellHeight * rows,
    channels: 3,
    background: '#08090b',
  },
})
  .composite(layers)
  .jpeg({ quality: 90 })
  .toFile(output);

console.log(JSON.stringify({ files, output }, null, 2));
