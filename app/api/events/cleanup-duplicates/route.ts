import { NextResponse } from 'next/server';
import { buildCleanupPlan, executeCleanup } from '@/lib/duplicateCleanup';
import { submitSitemap } from '@/lib/googleIndexing';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const BASE = process.env.APP_URL || 'https://nightlifemilan.com';

/**
 * Pulizia UNA TANTUM dei duplicati esistenti sulla nostra org — Fase 2C.
 *
 * Adattamento del piano: EVENTBRITE_TOKEN è "Sensitive" su Vercel, illeggibile
 * fuori dal runtime di produzione — impossibile eseguire come script CLI
 * locale come previsto originariamente. Stessa logica, stessa garanzia di
 * sicurezza (dry-run di default, esecuzione reale solo esplicita), esposta
 * come route protetta invece che script.
 *
 * Auth: Authorization: Bearer CRON_SECRET  o  ?secret=INDEXING_SECRET
 *
 * Default: SOLO dry-run — ritorna il piano di cancellazione senza eseguirlo.
 * ?execute=1: esegue davvero la cancellazione (solo eventi con 0 attendees).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;

  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let plan;
  try {
    plan = await buildCleanupPlan();
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Plan build failed: ${(e as Error).message}` }, { status: 500 });
  }

  const execute = searchParams.get('execute') === '1';

  const planSummary = {
    totalEventsScanned: plan.totalEventsScanned,
    duplicateGroupsFound: plan.groups.length,
    legitimateMultiEventNights: plan.legitimateMultiEventNights,
    groups: plan.groups.map((g) => ({
      key: g.key,
      survivor: { id: g.survivor.id, title: g.survivor.name.text, attendees: g.survivor.attendeeCount },
      toDelete: g.toDelete.map((e) => ({ id: e.id, title: e.name.text, url: e.url })),
      flaggedForManualReview: g.flaggedForManualReview.map((e) => ({
        id: e.id, title: e.name.text, url: e.url, attendees: e.attendeeCount,
        reason: 'has attendees — cancellazione manuale richiesta (notifica email agli iscritti)',
      })),
    })),
  };

  if (!execute) {
    return NextResponse.json({
      ok: true,
      mode: 'dry-run',
      note: 'Nessuna cancellazione eseguita. Ripeti con ?execute=1 dopo aver verificato il piano.',
      plan: planSummary,
    });
  }

  const totalToDelete = plan.groups.reduce((sum, g) => sum + g.toDelete.length, 0);
  if (totalToDelete === 0) {
    return NextResponse.json({ ok: true, mode: 'execute', note: 'Nessun duplicato sicuro da cancellare.', plan: planSummary });
  }

  const result = await executeCleanup(plan);

  // Submit a Google: URL_DELETED per ogni evento cancellato + refresh sitemap
  let googleIndexing: { attempted: boolean; note?: string } = { attempted: false };
  if (process.env.GOOGLE_INDEXING_CREDENTIALS && result.deleted.length > 0) {
    try {
      // Nota: gli URL del nostro sito per eventi Eventbrite cancellati non sono
      // ricostruibili con certezza qui (lo slug SEO viene generato a lettura,
      // non salvato) — ci limitiamo a un refresh sitemap, che è la parte
      // affidabile e utile: comunica a Google che l'elenco pagine è cambiato.
      await submitSitemap(`${BASE}/`, `${BASE}/sitemap.xml`);
      googleIndexing = { attempted: true, note: 'Sitemap resubmitted; individual URL_DELETED pings skipped (slug not reconstructable post-deletion)' };
    } catch (e) {
      googleIndexing = { attempted: true, note: `failed: ${(e as Error).message}` };
    }
  }

  return NextResponse.json({
    ok: true,
    mode: 'execute',
    deleted: result.deleted,
    failed: result.failed,
    googleIndexing,
    plan: planSummary,
  });
}
