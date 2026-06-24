import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIRS = ['app', 'components'];
const exts = new Set(['.ts', '.tsx', '.css']);

// ORDINE IMPORTANTE: prima rgba, poi hex lunghi
const REPLACEMENTS = [
  ['rgba(212,175,55,', 'rgba(201,168,106,'],
  ['rgba(197,160,89,', 'rgba(201,168,106,'],
  ['#C5A059', '#C9A86A'], ['#c5a059', '#C9A86A'],
  ['#D4AF37', '#C9A86A'], ['#d4af37', '#C9A86A'],
  ['#F2D59F', '#DFC58E'], ['#f2d59f', '#DFC58E'],
  ['#050505', '#131009'],
  ['#121212', '#262017'],
  ['#0A0A0A', '#1C1810'], ['#0a0a0a', '#1C1810'],
];

let changed = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) { walk(p); continue; }
    if (!exts.has(extname(name))) continue;
    let txt = readFileSync(p, 'utf8');
    let next = txt;
    for (const [a, b] of REPLACEMENTS) next = next.split(a).join(b);
    if (next !== txt) { writeFileSync(p, next, 'utf8'); changed++; console.log('UPDATED', p); }
  }
}
DIRS.forEach(walk);
console.log('files changed:', changed);
