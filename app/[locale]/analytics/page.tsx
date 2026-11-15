import type { Metadata } from 'next';
import {
  readDailyStats,
  readXceedManual,
  romeDay,
  type DailyStats,
} from '@/lib/analyticsStore';
import { BarChart } from '@/components/analytics/Charts';
import { saveXceedEntry, removeXceedEntry } from './actions';

/**
 * Dashboard analytics interna — nightlifemilan.com/analytics
 * Protetta da Basic Auth nel middleware (ANALYTICS_USER / ANALYTICS_PASSWORD).
 *
 * Fonti:
 * - visite e click CTA: contatori first-party su Blob (/api/track);
 * - Xceed: click in uscita automatici + visite/vendite copiate a mano da
 *   pro.xceed.me (nessuna API pubblica) tramite il form in fondo.
 */

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Analytics | Nightlife Milan',
  robots: { index: false, follow: false },
};

// --- helpers ---------------------------------------------------------------

function sumKey(daily: DailyStats[], key: string): number {
  return daily.reduce((s, d) => s + (d.counts[key] || 0), 0);
}

function seriesFor(daily: DailyStats[], key: string, days: number): Array<{ label: string; value: number }> {
  const byDate = new Map(daily.map((d) => [d.date, d.counts[key] || 0]));
  const out: Array<{ label: string; value: number }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = romeDay(new Date(Date.now() - i * 86400_000));
    out.push({ label: day, value: byDate.get(day) || 0 });
  }
  return out;
}

/** Somma per prefisso chiave (`pv:path:` → mappa path→conteggio ordinata). */
function topByPrefix(daily: DailyStats[], prefix: string, limit: number): Array<[string, number]> {
  const acc = new Map<string, number>();
  for (const d of daily) {
    for (const [k, v] of Object.entries(d.counts)) {
      if (k.startsWith(prefix)) acc.set(k.slice(prefix.length), (acc.get(k.slice(prefix.length)) || 0) + v);
    }
  }
  return [...acc.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

// --- UI --------------------------------------------------------------------

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-white/50 mb-2">{label}</p>
      <p className="text-3xl font-serif font-bold text-champagne">{value}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
      <h2 className="text-lg font-serif font-bold text-champagne mb-4">{title}</h2>
      {children}
    </section>
  );
}

const DAYS = 30;

export default async function AnalyticsPage() {
  const [daily, xceedManual] = await Promise.all([
    readDailyStats(DAYS),
    readXceedManual(),
  ]);

  const totPv = sumKey(daily, 'pv');
  const totWa = sumKey(daily, 'wa');
  const totBf = sumKey(daily, 'bf');
  const totXc = sumKey(daily, 'xc');
  const totXcSales = xceedManual.reduce((s, e) => s + (e.sales || 0), 0);
  const totXcViews = xceedManual.reduce((s, e) => s + (e.views || 0), 0);

  const topPages = topByPrefix(daily, 'pv:path:', 10);
  const topReferrers = topByPrefix(daily, 'pv:ref:', 8);
  const waBySource = topByPrefix(daily, 'wa:src:', 8);

  return (
    <main className="flex-1 bg-[#050505] min-h-screen py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-champagne">Analytics</h1>
            <p className="text-white/50 text-sm mt-1">Ultimi {DAYS} giorni · aggiornato in tempo reale a ogni apertura</p>
          </div>
          <nav className="flex flex-wrap gap-2 text-xs">
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="border border-white/15 text-white/60 hover:text-champagne hover:border-champagne/40 rounded-full px-4 py-2 transition-colors">Google Analytics ↗</a>
            <a href="https://pro.xceed.me/select-venue" target="_blank" rel="noopener noreferrer" className="border border-white/15 text-white/60 hover:text-champagne hover:border-champagne/40 rounded-full px-4 py-2 transition-colors">Xceed Pro ↗</a>
          </nav>
        </header>

        {/* Il funnel in numeri */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Visite sito" value={totPv} sub="pageview tracciate" />
          <StatCard label="Click WhatsApp" value={totWa} sub="tutte le CTA" />
          <StatCard label="Form prenotazione" value={totBf} sub="inviati" />
          <StatCard label="Click verso Xceed" value={totXc} sub="Buy Tickets / Book Table" />
          <StatCard label="Visite pagine Xceed" value={totXcViews || '—'} sub="da pro.xceed.me (manuale)" />
          <StatCard label="Biglietti Xceed" value={totXcSales || '—'} sub="da pro.xceed.me (manuale)" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Panel title="Visite al sito per giorno">
            <BarChart data={seriesFor(daily, 'pv', DAYS)} ariaLabel={`Visite giornaliere ultimi ${DAYS} giorni`} />
          </Panel>
          <Panel title="Click WhatsApp per giorno">
            <BarChart data={seriesFor(daily, 'wa', DAYS)} ariaLabel={`Click WhatsApp giornalieri ultimi ${DAYS} giorni`} />
          </Panel>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Panel title="Pagine più viste">
            <ol className="space-y-2 text-sm">
              {topPages.length === 0 && <li className="text-white/40">Nessun dato ancora.</li>}
              {topPages.map(([path, n]) => (
                <li key={path} className="flex justify-between gap-3 text-white/70">
                  <span className="truncate">{path}</span>
                  <span className="tabular-nums text-champagne font-medium">{n}</span>
                </li>
              ))}
            </ol>
          </Panel>
          <Panel title="Da dove arrivano (referrer)">
            <ol className="space-y-2 text-sm">
              {topReferrers.length === 0 && <li className="text-white/40">Solo traffico diretto finora.</li>}
              {topReferrers.map(([host, n]) => (
                <li key={host} className="flex justify-between gap-3 text-white/70">
                  <span className="truncate">{host}</span>
                  <span className="tabular-nums text-champagne font-medium">{n}</span>
                </li>
              ))}
            </ol>
          </Panel>
          <Panel title="WhatsApp per sorgente">
            <ol className="space-y-2 text-sm">
              {waBySource.length === 0 && <li className="text-white/40">Nessun click ancora.</li>}
              {waBySource.map(([src, n]) => (
                <li key={src} className="flex justify-between gap-3 text-white/70">
                  <span className="truncate">{src}</span>
                  <span className="tabular-nums text-champagne font-medium">{n}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        {/* Xceed manuale */}
        <Panel title="Xceed — visite & vendite per evento (da pro.xceed.me)">
          <p className="text-xs text-white/45 mb-4">
            Xceed non ha un&apos;API pubblica per questi numeri: apri{' '}
            <a href="https://pro.xceed.me/select-venue" target="_blank" rel="noopener noreferrer" className="text-champagne hover:underline">pro.xceed.me</a>{' '}
            e copia qui visite e vendite di ogni evento (2 minuti a settimana). I click che il sito manda a Xceed sono già tracciati automaticamente qui sopra.
          </p>

          {xceedManual.length > 0 && (
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                    <th className="py-2 pr-4 font-medium">Evento</th>
                    <th className="py-2 pr-4 font-medium">Data</th>
                    <th className="py-2 pr-4 font-medium text-right">Visite pagina</th>
                    <th className="py-2 pr-4 font-medium text-right">Biglietti</th>
                    <th className="py-2 pr-4 font-medium text-right">Incasso €</th>
                    <th className="py-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {xceedManual.map((e) => (
                    <tr key={e.key} className="border-b border-white/5 text-white/80">
                      <td className="py-2.5 pr-4">{e.eventName}</td>
                      <td className="py-2.5 pr-4 whitespace-nowrap">{e.eventDate}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{e.views ?? '—'}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums font-bold text-champagne">{e.sales ?? '—'}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{e.revenue ?? '—'}</td>
                      <td className="py-2.5 text-right">
                        <form action={removeXceedEntry}>
                          <input type="hidden" name="key" value={e.key} />
                          <button type="submit" className="text-white/30 hover:text-red-400 text-xs transition-colors" aria-label={`Elimina ${e.eventName}`}>✕</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <form action={saveXceedEntry} className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
            <label className="col-span-2 text-xs text-white/50">
              Nome evento
              <input name="eventName" required placeholder="Justme Saturday" className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne" />
            </label>
            <label className="text-xs text-white/50">
              Data
              <input name="eventDate" type="date" required className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne" />
            </label>
            <label className="text-xs text-white/50">
              Visite
              <input name="views" type="number" min="0" inputMode="numeric" className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne" />
            </label>
            <label className="text-xs text-white/50">
              Biglietti
              <input name="sales" type="number" min="0" inputMode="numeric" className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne" />
            </label>
            <label className="text-xs text-white/50">
              Incasso €
              <input name="revenue" type="number" min="0" step="0.01" inputMode="decimal" className="mt-1 w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-champagne" />
            </label>
            <button type="submit" className="col-span-2 md:col-span-6 md:w-auto md:justify-self-start bg-champagne text-black font-bold text-sm rounded-lg px-6 py-2.5 hover:bg-white transition-colors">
              Salva
            </button>
          </form>
          <p className="text-[11px] text-white/35 mt-3">Stesso nome + stessa data = aggiorna la riga esistente (puoi correggere i numeri quando vuoi).</p>
        </Panel>

        <footer className="text-[11px] text-white/30 leading-relaxed">
          <p>Fonti: visite e click = tracking first-party del sito (gli ad-blocker non lo bloccano, i bot sono filtrati); Xceed = inserimento manuale. GA4 resta attivo in parallelo per analisi avanzate.</p>
        </footer>
      </div>
    </main>
  );
}
