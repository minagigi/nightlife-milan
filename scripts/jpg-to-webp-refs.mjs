import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIRS = ['app', 'components', 'lib'];
const exts = new Set(['.ts', '.tsx', '.css']);
let changed = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    if (!exts.has(extname(name))) continue;
    let txt = readFileSync(p, 'utf8');
    const next = txt.replace(/(\/images\/[a-z0-9\-\/]+)\.jpg/gi, '$1.webp');
    if (next !== txt) { writeFileSync(p, next, 'utf8'); changed++; console.log('UPDATED', p); }
  }
}
DIRS.forEach(walk);
console.log('files changed:', changed);
