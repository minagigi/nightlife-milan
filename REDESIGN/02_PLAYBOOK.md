# 02 — PLAYBOOK ESECUTIVO — Rinascita visiva "Maison Champagne"

> ESEGUITORE: segui questo file DALL'ALTO AL BASSO, una task alla volta.
> Non saltare task. Non improvvisare. Ogni task ha: OBIETTIVO → PASSI ESATTI → VERIFICA → FATTO QUANDO.
> I valori di colore/tipografia stanno in `01_DESIGN_SYSTEM.md`. I prompt immagini in `03_IMAGE_PROMPTS.md`.

---

## ⚠️ REGOLE PER L'ESECUTORE (leggi una volta, valgono sempre)
1. Usa lo strumento **Edit** per modifiche puntuali. NON riscrivere interi file a mano.
2. Per sostituzioni di massa usa SOLO gli script Node forniti (sono encoding-safe; PowerShell 5.1 corrompe l'UTF-8).
3. Dopo OGNI fase: esegui `npx tsc --noEmit` (deve dare 0 errori) e controlla la console del preview (0 errori).
4. Working dir: `C:\Users\minag\Desktop\mcp\nightlife-milan\nightllfe-milan-main`.
5. Dev server: `mcp__Claude_Preview__preview_start` con name `nightlife-milan` (porta 3000). Se gli screenshot vanno in timeout, usa `preview_eval`/`preview_snapshot` (funzionano).
6. NON generare immagini fuori dalla lista in `03_IMAGE_PROMPTS.md`. Prima il PILOTA (4 immagini), poi STOP e chiedi conferma.
7. Se una VERIFICA fallisce, NON proseguire: rileggi la task ed eseguila di nuovo.
8. NON toccare la logica/dati (`lib/data.ts` contenuti) nelle Fasi 0–3, solo grafica. La Fase 4 tocca i testi.

---

## FASE 0 — PIPELINE IMMAGINI (risolve subito la performance: 532MB → ~30MB)

### Task 0.1 — Assicura `sharp`
PASSI:
1. Esegui: `npm ls sharp` nella working dir.
2. Se NON presente: `npm i -D sharp`.

VERIFICA: `npm ls sharp` mostra una versione.
FATTO QUANDO: sharp è installato.

### Task 0.2 — Crea lo script di ottimizzazione
PASSI: crea il file `scripts/optimize-images.mjs` con ESATTAMENTE questo contenuto:

```js
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const MAX_W = 1920;       // larghezza massima
const QUALITY = 72;       // qualità webp
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
    const { renameSync, unlinkSync } = await import('node:fs');
    renameSync(out + '.tmp', out);
    console.log('OK', out);
  } catch (e) {
    console.error('FAIL', file, e.message);
  }
}

walk(ROOT);
```

> Questo crea una versione `.webp` accanto a ogni `.jpg/.png` (NON cancella gli originali).

VERIFICA: il file esiste.
FATTO QUANDO: file creato.

### Task 0.3 — Esegui l'ottimizzazione e ricolllega le estensioni
PASSI:
1. Esegui: `node scripts/optimize-images.mjs` (può richiedere 1–2 minuti).
2. Sostituisci nei dati/componenti i riferimenti `.jpg` → `.webp`. Crea ed esegui `scripts/jpg-to-webp-refs.mjs`:

```js
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
```

3. Esegui: `node scripts/jpg-to-webp-refs.mjs`.

VERIFICA:
- `du -sh public/images` (Bash) o controlla che esistano i `.webp`.
- `npx tsc --noEmit` → 0 errori.
- Avvia preview, apri `/`, `preview_console_logs` level error → "No console logs".
- `preview_eval`: `document.querySelectorAll('img').length` > 0 e nessuna 404 in `preview_network`.

FATTO QUANDO: home + /clubs caricano con le webp, peso cartella crollato.

> NOTA: gli originali `.jpg` restano come backup. Verranno SOVRASCRITTI dalle nuove
> immagini in Fase 3 e ri-ottimizzati. Non cancellarli ora.

---

## FASE 1 — DESIGN TOKENS UNIFICATI (1 oro, 3 superfici, tipografia)

### Task 1.1 — Aggiorna `@theme` in `app/globals.css`
Usa Edit. Sostituisci il blocco `@theme { ... }` esistente con:

```css
@theme {
  --color-charcoal: #131009;
  --color-champagne: #C9A86A;
  --color-canvas: #131009;
  --color-surface-1: #1C1810;
  --color-surface-2: #262017;
  --color-gold: #C9A86A;
  --color-gold-bright: #DFC58E;
  --color-gold-deep: #8A6E3A;
  --color-ivory: #EDE6D6;
  --color-ivory-dim: #B8B0A0;
  --color-stone: #837C6C;
  --font-sans: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-cormorant), ui-serif, Georgia, serif;
}
```

VERIFICA: il file contiene i nuovi token; `npx tsc --noEmit` non riguarda CSS, ma avvia il preview e controlla 0 errori console.
FATTO QUANDO: token presenti.

### Task 1.2 — Aggiungi le utility Maison in `app/globals.css`
Usa Edit. Dentro il blocco `@layer utilities { ... }` esistente, AGGIUNGI in fondo (prima della `}` di chiusura del layer):

```css
  /* Maison — velo caldo uniforme sulle foto */
  .img-maison { position: relative; }
  .img-maison::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(19,16,9,0) 35%, rgba(19,16,9,0.55) 100%),
      rgba(201,168,106,0.06);
  }
```

E aggiungi una base avorio per il body — in fondo al file (fuori da @layer):
```css
body { color: #EDE6D6; }
```

VERIFICA: preview, 0 errori console.
FATTO QUANDO: utility presenti.

### Task 1.3 — Migrazione colori di massa (encoding-safe)
PASSI: crea `scripts/migrate-colors.mjs` con ESATTAMENTE:

```js
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
    // NON toccare globals.css @theme (già gestito a mano in Task 1.1)
    let txt = readFileSync(p, 'utf8');
    let next = txt;
    for (const [a, b] of REPLACEMENTS) next = next.split(a).join(b);
    if (next !== txt) { writeFileSync(p, next, 'utf8'); changed++; console.log('UPDATED', p); }
  }
}
DIRS.forEach(walk);
console.log('files changed:', changed);
```

> ATTENZIONE globals.css: dopo lo script, RIVERIFICA che `@theme` abbia ancora
> `--color-charcoal: #131009` e `--color-champagne: #C9A86A` (lo script potrebbe averli
> lasciati intatti perché già nuovi — confermalo con grep).

Esegui: `node scripts/migrate-colors.mjs`.

VERIFICA (Grep tool, devono dare 0 risultati in app/ e components/):
- `#C5A059` → 0
- `#D4AF37` → 0
- `#F2D59F` → 0
- `#050505` → 0
- `#121212` → 0
- `#0A0A0A` → 0 (eccetto eventualmente nessuno; il token in globals è #131009)

Poi: `npx tsc --noEmit` → 0 errori. Preview → 0 errori console.
FATTO QUANDO: tutte le grep danno 0 e il sito carica con la nuova palette calda.

### Task 1.4 — Aggiorna `viewport.themeColor` (browser chrome)
File `app/[locale]/layout.tsx`: nel `export const viewport`, cambia `themeColor: '#0A0A0A'` → `themeColor: '#131009'` (se lo script l'ha già cambiato in #1C1810, impostalo a #131009 a mano con Edit).

VERIFICA: il valore è `#131009`.
FATTO QUANDO: fatto.

---

## FASE 2 — COMPONENTI & SCHEMA SEZIONI (ritmo arioso, angoli netti, titoli serif/avorio)

> Obiettivo: applicare il "respiro" Maison. Modifiche puntuali con Edit.

### Task 2.1 — Riduci l'arrotondamento globale
Crea `scripts/soften-radii.mjs`:
```js
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
const DIRS = ['app', 'components'];
const exts = new Set(['.tsx']);
let changed = 0;
function walk(dir){for(const n of readdirSync(dir)){const p=join(dir,n);const s=statSync(p);
 if(s.isDirectory()){walk(p);continue;} if(!exts.has(extname(n)))continue;
 let t=readFileSync(p,'utf8');let x=t.split('rounded-3xl').join('rounded-xl').split('rounded-2xl').join('rounded-lg');
 if(x!==t){writeFileSync(p,x,'utf8');changed++;console.log('UPDATED',p);}}}
DIRS.forEach(walk);console.log('changed:',changed);
```
Esegui: `node scripts/soften-radii.mjs`. Poi `npx tsc --noEmit`.

VERIFICA: 0 errori; il sito ha angoli meno arrotondati.
FATTO QUANDO: fatto.

### Task 2.2 — Più respiro nelle sezioni della home
File `app/[locale]/page.tsx`. Con Edit, aumenta i padding verticali delle `<section>`:
- `py-12` → `py-20`
- `py-10` → `py-20`
- `py-16` → `py-24`
- `py-20` → `py-28`
(applica solo alle section di primo livello; se incerto, lascia.)

VERIFICA: preview, layout più arioso, 0 errori.
FATTO QUANDO: fatto.

### Task 2.3 — Titoli sezione in serif + avorio (home)
File `app/[locale]/page.tsx`. I titoli `<h2>` che usano `font-serif ... text-champagne` o `text-white`:
- assicura `font-serif`, colore `text-[var(--ivory)]`, `tracking-tight`.
- gli "eyebrow"/label sopra i titoli: `text-[var(--gold)]/60 tracking-[0.35em]`.

(Modifica solo le classi, non i testi.)

VERIFICA: preview; titoli caldi avorio in serif.
FATTO QUANDO: fatto.

### Task 2.4 — Applica `.img-maison` ai wrapper immagine principali
Aggiungi la classe `img-maison` ai DIV che contengono le `<Image fill>` in:
- `components/Hero.tsx` (il `motion.div` con `className="absolute inset-0"` → aggiungi `img-maison`)
- `components/EventCard.tsx` (l'`<article>` è già `relative overflow-hidden` → aggiungi `img-maison`)
- `components/VenueCard.tsx` (wrapper immagine)
- `app/[locale]/clubs/[slug]/page.tsx` (hero del locale)

> La classe aggiunge solo un velo caldo via ::after; non rompe nulla.

VERIFICA: `npx tsc --noEmit`; preview; le foto hanno un tono caldo uniforme.
FATTO QUANDO: fatto.

### Task 2.5 — Header e menu su surface-1
Dopo la migrazione, header/menu dovrebbero già usare `#1C1810`. Verifica in
`components/Header.tsx` che gli sfondi siano `bg-[#1C1810]/...` o `surface-1`. Se trovi
ancora `bg-[#0A0A0A]` sostituiscilo con `bg-[#1C1810]`.

VERIFICA: Grep `#0A0A0A` in Header.tsx → 0.
FATTO QUANDO: fatto.

---

## FASE 3 — RIGENERAZIONE IMMAGINI (PILOTA → poi BATCH)

> Tutti i prompt e l'ordine stanno in `03_IMAGE_PROMPTS.md`. Qui c'è SOLO il "come".

### Task 3.0 — Carica gli strumenti immagine (deferred)
Esegui ToolSearch:
`select:mcp__238c2465-3498-45b8-b536-de3579a88e0b__images_generate,mcp__238c2465-3498-45b8-b536-de3579a88e0b__creations_wait,mcp__238c2465-3498-45b8-b536-de3579a88e0b__account_balance`

### Task 3.1 — Controlla il budget
Chiama `account_balance`. Annota il saldo. Se molto basso, FERMATI e avvisa l'utente.

### Task 3.2 — PILOTA (4 immagini, poi STOP)
Genera SOLO queste 4 (prompt completi in `03_IMAGE_PROMPTS.md` §Pilota):
1. Hero — Just Me Milano
2. Card locale — Gattopardo
3. Interno gallery — Voya Rooftop
4. Hero di pagina — /aperitivo

Per OGNI immagine:
1. `images_generate` con: `prompt` (dal file), `mode: "imagen-nano-banana-2"`, `aspectRatio` (vedi sotto), `resolution: "2k"`, `count: 1`.
   - Hero e hero pagina → `aspectRatio: "16:9"`
   - Card locale → `aspectRatio: "3:4"`
   - Interno gallery → `aspectRatio: "4:3"`
2. Se serve, `creations_wait` per attendere il completamento; ottieni l'URL immagine dal risultato.
3. Scarica l'immagine nel path corretto. Crea ed usa `scripts/save-image.mjs`:
```js
// uso: node scripts/save-image.mjs <url> <relativePathSenzaEstensione>
import { writeFileSync } from 'node:fs';
const [,, url, out] = process.argv;
const res = await fetch(url);
const buf = Buffer.from(await res.arrayBuffer());
writeFileSync(out + '.jpg', buf);
console.log('SAVED', out + '.jpg');
```
   Esempio: `node scripts/save-image.mjs "<URL>" public/images/just-me-milano`
4. Ri-ottimizza: `node scripts/optimize-images.mjs` (rigenera la .webp).

DOPO le 4: **FERMATI**. Mostra le 4 immagini all'utente e CHIEDI conferma prima del batch.

### Task 3.3 — BATCH (solo dopo conferma utente)
Esegui in quest'ordine, una categoria alla volta, salvando nei path indicati in
`03_IMAGE_PROMPTS.md` (ogni voce ha già prompt + path + aspect ratio):
1. 4 Hero featured → `public/images/{venue}.webp`
2. 18 card locali → `public/images/{venue}.webp` (stesso file della scheda)
3. 8 hero di pagina
4. 126 interni gallery → `public/images/venues/{venue}/{venue}-interior-0X.jpg`
5. Copertine eventi speciali (lista nel file)
6. OG/social

Dopo OGNI categoria: `node scripts/optimize-images.mjs`, poi preview + 0 errori console.

VERIFICA finale Fase 3: nessuna immagine rotta (`preview_network` senza 404), peso cartella ottimizzato.
FATTO QUANDO: tutte le categorie generate e salvate.

---

## FASE 4 — COPY / PRESENTAZIONI (luxury copywriting)

> Tono: esclusivo, insider, sicuro, MAI venduto. EN + IT. Vedi skill `luxury-copywriting`.
> ⚠️ POSIZIONE DEI TESTI (verificato):
> - Copy dei LOCALI → `lib/venuesData.ts` (campo `localizedContent`). NON in data.ts.
> - Copy degli EVENTI → `lib/data.ts` (array `mockEvents`, campo `localizedContent`).
> - Copy delle ZONE → `lib/data.ts` (array `mockZones`).
> - Copy delle PAGINE → nelle rispettive `app/[locale]/.../page.tsx`.
> NOTA: i testi dei locali NON sono ancora riscritti. Se l'utente li ha già forniti
> (file `REDESIGN/04_COPY.md`), incollali da lì invece di inventarli.

### Task 4.1 — Regole di tono (applica sempre)
- Frasi brevi, sensoriali, autorevoli. Niente superlativi vuoti ("the best ever").
- Parla al lettore come un insider che conosce il portiere.
- Ogni descrizione locale: 1 frase di atmosfera + 1 dettaglio insider concreto + 1 invito discreto.

### Task 4.2 — Esempio worked (segui questo schema per TUTTI i locali)
Modifica `lib/venuesData.ts` → record `v-justme` → `localizedContent.description`:
- EN: "Beneath the steel pillars of Torre Branca, Milan's fashion crowd writes its after-dark chapter. Arrive in a small, sharp group — the door reads intention, not labels."
- IT: "Sotto i pilastri d'acciaio della Torre Branca, la Milano della moda scrive il suo capitolo notturno. Presentati in un gruppo piccolo e curato — la selezione legge l'intenzione, non le etichette."

Applica lo STESSO schema (atmosfera + dettaglio reale del locale + invito) a tutti i ~18 locali, usando i dettagli reali già presenti in `lib/data.ts` (zona, indirizzo, vibe, insiderTip).

### Task 4.3 — Presentazioni pagine
Rivedi gli heading/intro di: `/`, `/clubs`, `/zones`, `/guides`, `/aperitivo`, `/vip-tables`,
`/faq`, `/bottle-prices`, `/door-policy` applicando il tono. Modifica SOLO le stringhe di
testo, non la struttura.

VERIFICA: `npx tsc --noEmit`; preview EN e IT; nessun testo rotto/placeholder.
FATTO QUANDO: copy applicato a locali, eventi-chiave e pagine principali.

---

## FASE 5 — QA FINALE
1. `npx tsc --noEmit` → 0 errori.
2. Preview: home, /clubs, /clubs/just-me-milano, /events/[uno], /aperitivo, /faq — in EN e IT.
3. `preview_resize` preset `mobile`: verifica hero `100svh`, bottom bar, nessun overflow orizzontale (`document.documentElement.scrollWidth <= clientWidth`).
4. `preview_network`: nessun 404 immagini.
5. `preview_console_logs` error: "No console logs".
6. Grep finale colori legacy (tutti 0): `#C5A059`, `#D4AF37`, `#F2D59F`, `#050505`, `#121212`.
7. Peso `public/images` ragionevole (webp servite).

FATTO QUANDO: tutti i check passano. Riepiloga all'utente cosa è cambiato.

---

## ORDINE DI ESECUZIONE (riassunto)
Fase 0 → 1 → 2 → (commit/punto di controllo) → 3.PILOTA → STOP/conferma → 3.BATCH → 4 → 5.
