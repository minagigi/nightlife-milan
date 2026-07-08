#!/usr/bin/env npx tsx
/**
 * Scout locale — FASE L3 (piano .claude/plans/2026-07-08-local-pipeline-no-api.md).
 * Wrapper puro attorno a scoutXceedEvents()/scoutThirdPartyEvents() — nessuna
 * chiamata AI, nessun secret richiesto (HTTP pubblico verso xceed.me/eventbrite.it).
 * Stampa i candidati come JSON su stdout per il passo successivo (dedupe/scrittura
 * a mano dei campi BodyResult/FaqResult).
 *
 * Uso:
 *   npx tsx scripts/scout-xceed.ts --days 7
 *   npx tsx scripts/scout-xceed.ts --days 7 --source scout   (i 15 venue non-Xceed)
 */
import { scoutXceedEvents } from '../lib/xceedScout';
import { scoutThirdPartyEvents } from '../lib/eventScout';

function argValue(name: string, fallback: string): string {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 && process.argv[idx + 1] ? process.argv[idx + 1] : fallback;
}

async function main() {
  const source = argValue('source', 'xceed');
  const days = parseInt(argValue('days', '7'), 10);

  if (source === 'xceed') {
    const events = await scoutXceedEvents(days);
    console.log(JSON.stringify({ source: 'xceed', count: events.length, events }, null, 2));
  } else {
    const events = await scoutThirdPartyEvents();
    console.log(JSON.stringify({ source: 'scout', count: events.length, events }, null, 2));
  }
}

main().catch((e) => {
  console.error(`[scout-xceed] Failed: ${e.message}`);
  process.exit(1);
});
