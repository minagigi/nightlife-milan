import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
const DIRS = ['app', 'components'];
const exts = new Set(['.tsx']);
let changed = 0;
function walk(dir) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    const s = statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    if (!exts.has(extname(n))) continue;
    let t = readFileSync(p, 'utf8');
    let x = t.split('rounded-3xl').join('rounded-xl').split('rounded-2xl').join('rounded-lg');
    if (x !== t) { writeFileSync(p, x, 'utf8'); changed++; console.log('UPDATED', p); }
  }
}
DIRS.forEach(walk);
console.log('changed:', changed);
