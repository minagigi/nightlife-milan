#!/usr/bin/env node
/**
 * Spike di discovery — Fase 0/1 del piano auto-import Eventbrite.
 *
 * Metodo scelto: la pagina pubblica "this-week" del discover di Eventbrite Milano
 * (`https://www.eventbrite.it/d/italy--milano/events--this-week/`) incorpora un
 * blob `window.__SERVER_DATA__` con TUTTI gli eventi della settimana già in JSON
 * strutturato (id, name, start/end date+time, primary_venue con nome+indirizzo,
 * summary, image, url, organizer id, tags) — niente bisogno di API search (rimossa
 * da Eventbrite nel 2020) né di visitare ogni pagina evento singolarmente per la
 * fase di list+match. Confermato: `?page=N` pagina correttamente (zero overlap tra
 * pagine), ~25-30 pagine per coprire tutta la settimana su Milano, nessun blocco
 * bot-detection con uno User-Agent browser standard.
 *
 * Uso: node scripts/scout-spike.mjs [--dedupe]
 */
// Nota: questo script standalone NON importa lib/venueMatching.ts (Node ESM puro non
// risolve gli import extensionless dei file .ts sorgente — solo Next.js/webpack lo fanno).
// La produzione (lib/eventScout.ts, Fase 1) importa il modulo vero e proprio.
// Qui la stessa alias list è duplicata per testare la sola discovery in isolamento.
const VENUE_ALIASES = [
  { venueId: 'v-justme', aliases: ['just me', 'justme'] },
  { venueId: 'v-voya', aliases: ['voya'] },
  { venueId: 'v-pineta', aliases: ['pineta'] },
  { venueId: 'v-playclub', aliases: ['play club', 'playclub'] },
  { venueId: 'v-55milano', aliases: ['55 milano', '55milano'] },
  { venueId: 'v-repvblic', aliases: ['repvblic', 'republic milano'] },
  { venueId: 'v-11clubroom', aliases: ['11 club', '11club', '11 clubroom'] },
  { venueId: 'v-church81', aliases: ['church 81', 'church81'] },
  { venueId: 'v-mibmilano', aliases: ['mib milano', 'mib club'] },
  { venueId: 'v-gattopardo', aliases: ['gattopardo'] },
  { venueId: 'v-terrazza21', aliases: ['terrazza 21', 'terrazza21', 'terrazza duomo 21'] },
  { venueId: 'v-magazzini', aliases: ['magazzini generali', 'magazzini'] },
  { venueId: 'v-armani-prive', aliases: ['armani privé', 'armani prive', 'armani/privé'] },
  { venueId: 'v-volt', aliases: ['volt milano', 'volt club'] },
  { venueId: 'v-hollywood', aliases: ['hollywood'] },
  { venueId: 'v-apollo', aliases: ['apollo'] },
  { venueId: 'v-ceresio-7', aliases: ['ceresio 7', 'ceresio7'] },
  { venueId: 'v-theclub', aliases: ['the club milano', 'theclub'] },
  { venueId: 'v-aria', aliases: ['aria club', 'aria milano'] },
];

function matchVenueId(rawVenueName) {
  const n = (rawVenueName || '').toLowerCase();
  if (!n) return null;
  for (const entry of VENUE_ALIASES) {
    if (entry.aliases.some((a) => n.includes(a))) return entry.venueId;
  }
  return null;
}

const BASE = 'https://www.eventbrite.it/d/italy--milano/events--this-week/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const RATE_LIMIT_MS = 1500;
const MAX_PAGES = 40;

function extractServerData(html) {
  const marker = 'window.__SERVER_DATA__ = ';
  const start = html.indexOf(marker);
  if (start === -1) return null;
  let i = start + marker.length;
  let depth = 0, inStr = false, esc = false, begin = -1;
  for (; i < html.length; i++) {
    const c = html[i];
    if (begin === -1) { if (c === '{') { begin = i; depth = 1; } continue; }
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { i++; break; } }
  }
  return JSON.parse(html.slice(begin, i));
}

async function scoutAllPages() {
  const matches = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= MAX_PAGES) {
    const url = page === 1 ? BASE : `${BASE}?page=${page}`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) { console.error(`page ${page}: HTTP ${res.status}, stop`); break; }
    const html = await res.text();
    const data = extractServerData(html);
    if (!data) { console.error(`page ${page}: no __SERVER_DATA__, stop`); break; }

    totalPages = data.search_data.events.pagination.page_count;
    const results = data.search_data.events.results;

    for (const r of results) {
      const venueId = matchVenueId(r.primary_venue?.name || '');
      if (!venueId) continue;
      matches.push({
        ebId: r.id,
        url: r.url,
        rawTitle: r.name,
        rawDescription: r.summary || '',
        dateISO: `${r.start_date}T${r.start_time || '00:00'}:00`,
        endISO: r.end_date ? `${r.end_date}T${r.end_time || '00:00'}:00` : undefined,
        venueId,
        rawVenueName: r.primary_venue?.name,
        rawOrganizerId: r.primary_organizer_id,
        entryPrice: 0, // non disponibile nel feed list — va preso dalla pagina evento (JSON-LD offers)
        posterUrl: r.image?.original?.url,
        language: r.language,
      });
    }

    console.error(`page ${page}/${totalPages} — ${results.length} eventi, ${matches.length} match cumulativi`);
    page++;
    if (page <= totalPages) await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  }

  return matches;
}

const args = process.argv.slice(2);
const matches = await scoutAllPages();

console.log('\n=== EVENTI TROVATI NEI 18 VENUE (finestra: questa settimana) ===');
matches.forEach((m) => {
  console.log(`[${m.venueId}] ${m.rawTitle} — ${m.dateISO} — ${m.url}`);
});
console.log(`\nTotale: ${matches.length} eventi candidati`);

if (args.includes('--dedupe')) {
  console.log('\n(--dedupe richiede lib/importLedger.ts — Fase 2, non ancora implementata in questo spike)');
}
