#!/usr/bin/env node
/**
 * Gate R10/R12: verifies that all Next.js <Image quality={N} /> values in app/ and components/
 * match next.config.ts images.qualities, and that all local flyerPaths in inventory.json exist.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const nextCfg = fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8');
const qMatch = nextCfg.match(/qualities:\s*\[([^\]]+)\]/);
if (!qMatch) {
  console.error('ERRORE: images.qualities non trovato in next.config.ts');
  process.exit(1);
}
const allowedQualities = new Set(
  qMatch[1]
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n)),
);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (/\.(tsx|ts|jsx|js)$/.test(ent.name)) out.push(full);
  }
  return out;
}

const errors = [];
for (const sub of ['app', 'components']) {
  const files = walk(path.join(root, sub));
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const re = /quality=\{(\d+)\}/g;
    let m;
    while ((m = re.exec(src)) !== null) {
      const q = Number(m[1]);
      if (!allowedQualities.has(q)) {
        errors.push(`${path.relative(root, f)}: quality={${q}} non presente in whitelist [${[...allowedQualities].join(', ')}]`);
      }
    }
  }
}

const invPath = path.join(root, 'lib', 'october-events', 'inventory.json');
const inv = JSON.parse(fs.readFileSync(invPath, 'utf8'));
const events = Array.isArray(inv) ? inv : inv.events || [];
for (const ev of events) {
  if (ev.flyerPath && ev.flyerPath.startsWith('/')) {
    const disk = path.join(root, 'public', ev.flyerPath.replace(/^\//, ''));
    if (!fs.existsSync(disk) || fs.statSync(disk).size < 512) {
      errors.push(`inventory.json (${ev.slug || ev.xceedLegacyId}): flyer mancante o vuoto -> ${ev.flyerPath}`);
    }
  }
}

if (errors.length > 0) {
  console.error(`ERRORE images:verify (${errors.length}):\n` + errors.join('\n'));
  process.exit(1);
}

console.log(`OK images:verify — whitelist [${[...allowedQualities].join(', ')}], ${events.length} eventi inventory verificati.`);
