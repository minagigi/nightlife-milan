import { put, get } from '@vercel/blob';
import type { Lang } from './eventRewriter';

/**
 * Helper condivisi tra le route di import (cron Eventbrite/Xceed E la nuova
 * route manuale `publish-prepared`, FASE L1 — piano
 * .claude/plans/2026-07-08-local-pipeline-no-api.md). Prima duplicati
 * identici in import/route.ts e import-xceed/route.ts.
 */

const SITE_BASE = process.env.APP_URL || 'https://nightlifemilan.com';
const MANUAL_RUN_FLAG_PATH = 'meta/last-manual-run.json';

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Polla la pagina sito finché risponde 200 (o scade il timeout) — FASE G4B:
 * mai notificare Google Indexing per un URL ancora morto. */
export async function pollSitePageUntilLive(url: string, maxMs: number, intervalMs: number): Promise<boolean> {
  const deadline = Date.now() + maxMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return true;
    } catch {
      // riprova al prossimo giro
    }
    await sleep(intervalMs);
  }
  return false;
}

export function sitePageUrlFor(slugEn: string, lang: Lang): string {
  return lang === 'en' ? `${SITE_BASE}/events/${slugEn}` : `${SITE_BASE}/it/events/${slugEn}`;
}

/**
 * Flag "run manuale recente" (FASE L2) — la route `publish-prepared` lo
 * aggiorna ad ogni pubblicazione riuscita. I cron notturni lo leggono e si
 * fermano se una run manuale locale ha già coperto la finestra recente,
 * risparmiando credito API (la riscrittura AI locale è gratuita via
 * abbonamento, quella dei cron consuma l'API a pagamento).
 */
export async function getLastManualRunAt(): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;
  try {
    const result = await get(MANUAL_RUN_FLAG_PATH, { access: 'private', token });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as { ranAt?: string };
    return parsed.ranAt || null;
  } catch {
    return null;
  }
}

export async function setLastManualRunAt(ranAt: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return;
  try {
    await put(MANUAL_RUN_FLAG_PATH, JSON.stringify({ ranAt }), {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
      allowOverwrite: true,
    });
  } catch (e) {
    console.error(`[importShared] Failed to write manual-run flag: ${(e as Error).message}`);
  }
}

/** True se una run manuale è avvenuta entro `withinHours` ore fa. */
export function isRecentManualRun(ranAt: string | null, withinHours: number): boolean {
  if (!ranAt) return false;
  const ageMs = Date.now() - new Date(ranAt).getTime();
  return ageMs >= 0 && ageMs < withinHours * 60 * 60 * 1000;
}
