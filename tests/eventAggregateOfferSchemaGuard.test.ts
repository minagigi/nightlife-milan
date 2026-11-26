import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const REPO_ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['components', 'app', 'lib'];

function collectSourceFiles(dir: string): string[] {
  const abs = path.join(REPO_ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      out.push(...collectSourceFiles(rel));
    } else if (/\.tsx?$/.test(entry.name)) {
      out.push(rel);
    }
  }
  return out;
}

// Estrae il literal dell'oggetto che contiene l'indice dato, bilanciando graffe e
// salvando le stringhe (gli URL affiliate contengono caratteri che non vanno contati).
function balancedObjectAt(src: string, typeIdx: number): string {
  const open = src.lastIndexOf('{', typeIdx);
  assert.ok(open >= 0, 'AggregateOffer literal without an opening brace');
  let depth = 0;
  for (let i = open; i < src.length; i += 1) {
    const ch = src[i];
    if (ch === "'" || ch === '"' || ch === '`') {
      i += 1;
      while (i < src.length && src[i] !== ch) {
        if (src[i] === '\\') i += 1;
        i += 1;
      }
      continue;
    }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return src.slice(open, i + 1);
    }
  }
  return src.slice(open);
}

// Errore pagato (audit GSC 2026-11-26): l'AggregateOffer di Orthodox NYE @ JustMe portava
// availability/validFrom solo sugli Offer annidati, e Google li leggeva come campi mancanti
// sul nodo Event (rich results Event in warning).
test('every Event JSON-LD AggregateOffer carries availability and validFrom', () => {
  const files = SCAN_DIRS.flatMap(collectSourceFiles);
  let checked = 0;

  for (const rel of files) {
    const src = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    if (!src.includes("'@type': 'AggregateOffer'") || !src.includes("'@type': 'Event'")) continue;

    let from = 0;
    for (;;) {
      const idx = src.indexOf("'@type': 'AggregateOffer'", from);
      if (idx < 0) break;
      from = idx + 1;
      const literal = balancedObjectAt(src, idx);
      const line = src.slice(0, idx).split('\n').length;
      assert.match(
        literal,
        /availability:/,
        `${rel}:${line} — AggregateOffer in un Event JSON-LD senza availability`,
      );
      assert.match(
        literal,
        /validFrom:/,
        `${rel}:${line} — AggregateOffer in un Event JSON-LD senza validFrom`,
      );
      checked += 1;
    }
  }

  assert.ok(checked > 0, 'Guard inerte: nessun AggregateOffer trovato nei sorgenti Event');
});
