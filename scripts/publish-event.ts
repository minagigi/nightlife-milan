#!/usr/bin/env npx tsx
/**
 * Ultimo passo locale — FASE L3 (piano local-pipeline-no-api). Combina il
 * RewrittenEvent prodotto da prepare-event.ts + la locandina finale (già
 * pulita/editata a mano, JPEG) e la invia a POST /api/events/publish-prepared
 * sul sito — l'unica chiamata di rete che tocca i secret, e li tocca solo
 * lato server (qui serve solo CRON_SECRET, mai EVENTBRITE_TOKEN/BLOB token).
 *
 * Uso:
 *   CRON_SECRET=xxx npx tsx scripts/publish-event.ts \
 *     --candidate candidate.json \
 *     --rewritten rewritten.json \
 *     --poster poster.jpg \
 *     --poster-content-type image/jpeg \
 *     --poster-source poster-clean
 *
 * candidate.json: { "source": "xceed"|"scout", "candidate": {...} }
 */
import { readFileSync } from 'fs';

function argValue(name: string, fallback?: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 && process.argv[idx + 1] ? process.argv[idx + 1] : fallback;
}

async function main() {
  const secret = process.env.CRON_SECRET;
  if (!secret) throw new Error('CRON_SECRET env var not set — export it in this shell only, never commit it');

  const siteBase = argValue('site', 'https://nightlifemilan.com');
  const candidatePath = argValue('candidate');
  const rewrittenPath = argValue('rewritten');
  const posterPath = argValue('poster');
  const posterContentType = argValue('poster-content-type', 'image/jpeg')!;
  const posterSource = argValue('poster-source', 'poster-clean')!;

  if (!candidatePath || !rewrittenPath || !posterPath) {
    throw new Error('Usage: --candidate candidate.json --rewritten rewritten.json --poster poster.jpg [--poster-content-type image/jpeg] [--poster-source poster-clean]');
  }

  const { source, candidate } = JSON.parse(readFileSync(candidatePath, 'utf-8'));
  const rewritten = JSON.parse(readFileSync(rewrittenPath, 'utf-8'));
  const posterBuffer = readFileSync(posterPath);
  const posterBase64 = posterBuffer.toString('base64');

  console.error(`[publish-event] Publishing "${rewritten.titleEn}" (source=${source}, poster=${(posterBuffer.length / 1024).toFixed(0)}KB)...`);

  const res = await fetch(`${siteBase}/api/events/publish-prepared`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      source, candidate, rewritten,
      posterBase64, posterContentType,
      posterFilename: `${rewritten.imageSlug}.jpg`,
      posterSource,
    }),
  });

  const body = await res.json();
  console.log(JSON.stringify(body, null, 2));
  if (!res.ok || !body.ok) {
    console.error(`[publish-event] FAILED: HTTP ${res.status}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(`[publish-event] ${e.message}`);
  process.exit(1);
});
