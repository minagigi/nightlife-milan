import type { Metadata } from 'next';
import {
  readDailyStats,
  fetchEventbriteStats,
  readEbSnapshots,
  readXceedManual,
  romeDay,
  type DailyStats,
  type EbEventStats,
} from '@/lib/analyticsStore';
import { BarChart, LineChart } from '@/components/analytics/Charts';
import { saveXceedEntry, removeXceedEntry } from './actions';

/**
 * Dashboard analytics interna — nightlifemilan.com/analytics
 * Protetta da Basic Auth nel middleware (ANALYTICS_USER / ANALYTICS_PASSWORD).
 *
 * Fonti (vedi docs/analytics-strategy.md):
 * - visite e click CTA: contatori first-party su Blob (/api/track);
 * - registrazioni Eventbrite: lettura LIVE dell'API a ogni apertura + curva
 *   dagli snapshot del cron;
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

interface EventRow {
  name: string;
  date: string;
  slugEn?: string;
  url: string;
  sold: number;
  capacity: number | null;
  deltaSold: number | null;
  sitePv: number;
  ebClicks: number;
  xcClicks: number;
}

/** Unisce i listing EN/IT della stessa serata (stesso baseId del marker) in una riga. */
function buildEventRows(
  ebLive: EbEventStats[],
  prevByEventId: Map<string, number> | null,
  daily: DailyStats[]
): EventRow[] {
  const groups = new Map<string, EbEventStats[]>();
  for (const ev of ebLive) {
    const key = ev.baseId || ev.id;
    groups.set(key, [...(groups.get(key) || []), ev]);
  }

  const rows: EventRow[] = [];
  for (const evs of groups.values()) {
    const main = evs.find((e) => e.lang === 'en') || evs[0];
    const slugEn = main.slugEn;
    const sold = evs.reduce((s, e) => s + e.sold, 0);
    const capacity = evs.some((e) => e.capacity != null) ? evs.reduce((s, e) => s + (e.capacity || 0), 0) : null;
    const prevSold = prevByEventId ? evs.reduce((s, e) => s + (prevByEventId.get(e.id) ?? 0), 0) : null;
    const pathKey = slugEn ? `/events/${slugEn}` : '__none__';
    rows.push({
      name: main.name,
      date: new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(main.startUtc)),
      slugEn,
      url: main.url,
      sold,
      capacity,
      deltaSold: prevSold != null ? sold - prevSold : null,
      sitePv: sumKey(daily, `pv:path:${pathKey}`),
      ebClicks: sumKey(daily, `eb:path:${pathKey}`),
      xcClicks: sumKey(daily, `xc:path:${pathKey}`),
    });
  }
  return rows.sort((a, b) => b.sold - a.sold);
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
  const [daily, ebLive, ebSnapshots, xceedManual] = await Promise.all([
    readDailyStats(DAYS),
    fetchEventbriteStats().catch(() => [] as EbEventStats[]),
    readEbSnapshots(DAYS),
    readXceedManual(),
  ]);

  const totPv = sumKey(daily, 'pv');
  const totWa = sumKey(daily, 'wa');
  const totBf = sumKey(daily, 'bf');
  const totXc = sumKey(daily, 'xc');
  const totEbClicks = sumKey(daily, 'eb');
  const totEbSold = ebLive.reduce((s, e) => s + e.sold, 0);
  const totXcSales = xceedManual.reduce((s, e) => s + (e.sales || 0), 0);
  const totXcViews = xceedManual.reduce((s, e) => s + (e.views || 0), 0);

  // Delta registrazioni: ultimo snapshot PRIMA di oggi come riferimento
  const today = romeDay();
  const prevSnapshot = [...ebSnapshots].reverse().find((s) => s.date < today) || null;
  const prevByEventId = prevSnapshot ? new Map(prevSnapshot.events.map((e) => [e.id, e.sold])) : null;

  const eventRows = buildEventRows(ebLive, prevByEventId, daily);
  const curve = ebSnapshots.map((s) => ({ label: s.date, value: s.events.reduce((t, e) => t + e.sold, 0) }));

  const topPages = topByPrefix(daily, 'pv:path:', 10);
  const topReferrers = topByPrefix(daily, 'pv:ref:', 8);
  const waBySource = topByPrefix(daily, 'wa:src:', 8);

  return (
    <main className="flex-1 bg-[#131009] min-h-screen py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-champagne">Analytics</h1>
            <p className="text-white/50 text-sm mt-1">Ultimi {DAYS} giorni · aggiornato in tempo reale a ogni apertura</p>
          </div>
          <nav className="flex flex-wrap gap-2 text-xs">
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="border border-white/15 text-white/60 hover:text-champagne hover:border-champagne/40 rounded-full px-4 py-2 transition-colors">Google Analytics ↗</a>
            <a href="https://www.eventbrite.com/organizations/home" target="_blank" rel="noopener noreferrer" className="border border-white/15 text-white/60 hover:text-champagne hover:border-champagne/40 rounded-full px-4 py-2 transition-colors">Eventbrite ↗</a>
            <a href="https://pro.xceed.me/select-venue" target="_blank" rel="noopener noreferrer" className="border border-white/15 text-white/60 hover:text-champagne hover:border-champagne/40 rounded-full px-4 py-2 transition-colors">Xceed Pro ↗</a>
          </nav>
        </header>

        {/* Il funnel in numeri */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Visite sito" value={totPv} sub="pageview tracciate" />
          <StatCard label="Click WhatsApp" value={totWa} sub="tutte le CTA" />
          <StatCard label="Form prenotazione" value={totBf} sub="inviati" />
          <StatCard label="Click verso Xceed" value={totXc} sub="Buy Tickets / Book Table" />
          <StatCard label="Click verso Eventbrite" value={totEbClicks} />
          <StatCard label="Registrati Eventbrite" value={totEbSold} sub="eventi live + ultimi 45 gg" />
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

        <Panel title="Curva registrazioni Eventbrite (totale eventi live)">
          <LineChart data={curve} ariaLabel="Registrazioni Eventbrite cumulative per giorno di snapshot" />
        </Panel>

        {/* Funnel per evento */}
        <Panel title="Funnel per evento">
          {eventRows.length === 0 ? (
            <p className="text-white/40 text-sm">Nessun evento Eventbrite live (o EVENTBRITE_TOKEN mancante).</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                    <th className="py-2 pr-4 font-medium">Evento</th>
                    <th className="py-2 pr-4 font-medium">Data</th>
                    <th className="py-2 pr-4 font-medium text-right">Visite sito</th>
                    <th className="py-2 pr-4 font-medium text-right">Click EB</th>
                    <th className="py-2 pr-4 font-medium text-right">Click Xceed</th>
                    <th className="py-2 pr-4 font-medium text-right">Registrati</th>
                    <th className="py-2 font-medium text-right">Δ oggi</th>
                  </tr>
                </thead>
                <tbody>
                  {eventRows.map((r) => (
                    <tr key={r.url} className="border-b border-white/5 text-white/80">
                      <td className="py-2.5 pr-4 max-w-[280px]">
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition-colors line-clamp-1">{r.name}</a>
                        {r.slugEn && <span className="block text-[10px] text-white/35">/events/{r.slugEn}</span>}
                      </td>
                      <td className="py-2.5 pr-4 whitespace-nowrap capitalize">{r.date}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{r.sitePv}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{r.ebClicks}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums">{r.xcClicks}</td>
                      <td className="py-2.5 pr-4 text-right tabular-nums font-bold text-champagne">
                        {r.sold}{r.capacity ? <span className="text-white/40 font-normal"> / {r.capacity}</span> : null}
                      </td>
                      <td className="py-2.5 text-right tabular-nums">
                        {r.deltaSold == null ? '—' : r.deltaSold > 0 ? `+${r.deltaSold}` : r.deltaSold}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-[11px] text-white/35 mt-3">Visite/click sito = ultimi {DAYS} giorni; Registrati = totale live da Eventbrite; Δ = dall&apos;ultimo snapshot notturno.</p>
        </Panel>

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
          <p>Fonti: visite e click = tracking first-party del sito (gli ad-blocker non lo bloccano, i bot sono filtrati); registrazioni = API Eventbrite in tempo reale; curva = snapshot notturno (cron 04:00 UTC); Xceed = inserimento manuale. GA4 resta attivo in parallelo per analisi avanzate.</p>
        </footer>
      </div>
    </main>
  );
}
