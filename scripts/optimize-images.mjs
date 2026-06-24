import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const MAX_W = 1920;
const QUALITY = 72;
const exts = new Set(['.jpg', '.jpeg', '.png']);

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    if (!exts.has(extname(name).toLowerCase())) continue;
    optimize(p);
  }
}

async function optimize(file) {
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    await sharp(file)
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out + '.tmp');
    const { renameSync } = await import('node:fs');
    renameSync(out + '.tmp', out);
    console.log('OK', out);
  } catch (e) {
    console.error('FAIL', file, e.message);
  }
}

walk(ROOT);
