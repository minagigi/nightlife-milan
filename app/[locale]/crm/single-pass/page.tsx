import type { Metadata } from 'next';
import { CheckCircle2, CreditCard, Download, ShieldCheck, Users } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localePrefix } from '@/lib/i18n/locales';
import { SINGLE_PASS_VENUES, formatEurFromCents } from '@/lib/single-pass/catalog';
import { listAllOrderSummaries, singlePassBlobConfigured } from '@/lib/single-pass/store';
import { getStripeCredentialStatus } from '@/lib/single-pass/stripe';
import type { SinglePassVenueId } from '@/lib/single-pass/types';
import { saveStripeVaultAction, updateOrderWhatsappGroupAction } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'CRM Single Pass Capodanno 2027 · Stripe & WhatsApp 20/12 | Nightlife Milan',
  robots: { index: false, follow: false, nocache: true },
};

function param(
  sp: Record<string, string | string[] | undefined>,
  key: string,
  fallback = 'all',
): string {
  const val = sp[key];
  return typeof val === 'string' && val.trim() ? val.trim() : fallback;
}

export default async function CrmSinglePassPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, sp, allSummaries, stripeStatus] = await Promise.all([
    params,
    searchParams,
    listAllOrderSummaries(),
    getStripeCredentialStatus(),
  ]);

  const lp = localePrefix(locale);
  const crmBase = `${lp}/crm`;
  const selfPath = `${crmBase}/single-pass`;
  const venueFilter = param(sp, 'venue', 'all');
  const statusFilter = param(sp, 'status', 'all');

  const filtered = allSummaries.filter((s) => {
    if (venueFilter !== 'all' && !s.venueIds.includes(venueFilter as SinglePassVenueId)) return false;
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    return true;
  });

  const paidOrders = allSummaries.filter((s) => s.status === 'paid');
  const awaitingOrders = allSummaries.filter((s) => s.status === 'awaiting_payment');
  const paidBaseCents = paidOrders.reduce((acc, o) => acc + o.subtotalBaseCents, 0);
  const paidFeeCents = paidOrders.reduce((acc, o) => acc + o.feeCents, 0);
  const paidTotalCents = paidOrders.reduce((acc, o) => acc + o.totalCents, 0);

  const exportParams = new URLSearchParams();
  if (venueFilter !== 'all') exportParams.set('venue', venueFilter);
  if (statusFilter !== 'all') exportParams.set('status', statusFilter);
  const exportHref = `${selfPath}/export${exportParams.toString() ? `?${exportParams.toString()}` : ''}`;

  return (
    <main className="min-h-screen bg-[#101113] px-3 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Area Interna Protetta · Nightlife Milan Single Pass
            </div>
            <h1 className="text-3xl font-semibold">Single Pass Capodanno 2027 · Stripe (+15%) & Gruppi 20/12</h1>
            <p className="mt-2 max-w-3xl text-sm text-white/60">
              Gestione ordini Single Pass pagati su Stripe (account acct_1O2zVeAbG6ToifSY), verifica fasce d’età e attivazione link mini-gruppi WhatsApp dal 20 dicembre 2026 in poi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={crmBase}
              className="inline-flex h-10 items-center border border-white/20 px-4 text-xs font-semibold uppercase tracking-wider text-white/80 hover:border-white"
            >
              CRM Generale
            </Link>
            <a
              href={exportHref}
              className="inline-flex h-10 items-center gap-2 border border-emerald-400/50 bg-emerald-950/30 px-4 text-xs font-semibold uppercase tracking-wider text-emerald-200 hover:bg-emerald-900/40"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Esporta CSV Ordini
            </a>
          </div>
        </header>

        {!singlePassBlobConfigured() && (
          <div className="border border-amber-400/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-100">
            BLOB_READ_WRITE_TOKEN non configurato in ambiente locale: attiva in produzione su Vercel.
          </div>
        )}

        {/* KPIs */}
        <section className="grid grid-cols-2 border border-white/10 bg-white/[0.02] md:grid-cols-5">
          <div className="border-b border-r border-white/10 p-4 md:border-b-0">
            <p className="text-[11px] uppercase text-white/45">Ordini Pagati Stripe</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-emerald-300">{paidOrders.length}</p>
          </div>
          <div className="border-b border-r border-white/10 p-4 md:border-b-0">
            <p className="text-[11px] uppercase text-white/45">In Attesa Pagamento</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-amber-200">{awaitingOrders.length}</p>
          </div>
          <div className="border-r border-white/10 p-4">
            <p className="text-[11px] uppercase text-white/45">Base Pacchetti</p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">{formatEurFromCents(paidBaseCents, 'it')}</p>
          </div>
          <div className="border-r border-white/10 p-4">
            <p className="text-[11px] uppercase text-white/45">Fee +15% Booking/Concierge</p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-emerald-300">{formatEurFromCents(paidFeeCents, 'it')}</p>
          </div>
          <div className="p-4">
            <p className="text-[11px] uppercase text-white/45">Incasso Totale Stripe</p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-white">{formatEurFromCents(paidTotalCents, 'it')}</p>
          </div>
        </section>

        {/* 1-Click Stripe Live Key & Webhook Vault Setup */}
        <section className="border border-white/15 bg-black/40 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                Stripe Checkout Live Integration ({stripeStatus.accountId || 'acct_1O2zVeAbG6ToifSY'})
              </div>
              <p className="mt-1 text-sm text-white/80">
                {stripeStatus.configured ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Attivo ({stripeStatus.source}) · Chiave {stripeStatus.maskedKey} · Webhook{' '}
                    {stripeStatus.webhookConfigured ? 'configurato' : 'opzionale via return verify'}
                  </span>
                ) : (
                  'Chiave segreta Stripe non ancora salvata su Vercel: incolla una sola volta sk_live_... qui sotto oppure aggiungi STRIPE_SECRET_KEY in Vercel Env per attivare Checkout Session & Webhook automatici.'
                )}
              </p>
            </div>

            <form action={saveStripeVaultAction} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="siteOrigin" value="https://nightlifemilan.com" />
              <input
                type="password"
                name="secretKey"
                required
                placeholder="sk_live_... (Nightlife Milan)"
                className="h-10 w-64 border border-white/25 bg-[#17191c] px-3 font-mono text-xs text-white"
              />
              <button
                type="submit"
                className="h-10 bg-emerald-400 px-4 text-xs font-extrabold uppercase tracking-wider text-black hover:bg-emerald-300"
              >
                {stripeStatus.configured ? 'Aggiorna Chiave Stripe' : 'Attiva Stripe Live'}
              </button>
            </form>
          </div>
        </section>

        {/* Filters */}
        <form method="get" className="flex flex-wrap items-end gap-3 border-b border-white/10 pb-5">
          <label className="text-xs text-white/60">
            Locale
            <select
              name="venue"
              defaultValue={venueFilter}
              className="mt-1 block h-10 border border-white/15 bg-[#17191c] px-3 text-sm text-white"
            >
              <option value="all">Tutti i 6 locali</option>
              {SINGLE_PASS_VENUES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-white/60">
            Stato Stripe
            <select
              name="status"
              defaultValue={statusFilter}
              className="mt-1 block h-10 border border-white/15 bg-[#17191c] px-3 text-sm text-white"
            >
              <option value="all">Tutti</option>
              <option value="paid">Pagati su Stripe</option>
              <option value="awaiting_payment">In attesa pagamento</option>
              <option value="expired">Scaduti</option>
            </select>
          </label>
          <button
            type="submit"
            className="h-10 border border-white/30 px-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black"
          >
            Filtra ({filtered.length})
          </button>
        </form>

        {/* Orders & WhatsApp Dec 20 Mini-Group Dispatcher Table */}
        <section className="overflow-x-auto border border-white/10">
          <table className="w-full min-w-[1100px] text-left text-xs">
            <thead className="bg-white/[0.04] uppercase text-white/50">
              <tr>
                <th className="p-3">Ordine / Stato</th>
                <th className="p-3">Cliente / Età / WhatsApp</th>
                <th className="p-3">Lingue</th>
                <th className="p-3">Pacchetti Single Pass</th>
                <th className="p-3 text-right">Base + 15% = Totale</th>
                <th className="p-3">Mini-Gruppo WhatsApp (dal 20/12)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-white/45">
                    Nessun ordine Single Pass registrato finora.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-white/[0.02]">
                    <td className="p-3 align-top">
                      <p className="font-mono font-bold text-white">{o.id}</p>
                      <span
                        className={`mt-1 inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${
                          o.status === 'paid' ? 'bg-emerald-400 text-black' : 'bg-amber-300 text-black'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3 align-top">
                      <p className="font-semibold text-white">
                        {o.fullName} · {o.age} anni
                      </p>
                      <p className="text-white/75">{o.whatsapp}</p>
                      <p className="text-white/50">{o.email}</p>
                    </td>
                    <td className="p-3 align-top text-white/75">{o.spokenLanguages.join(', ')}</td>
                    <td className="p-3 align-top max-w-[260px] text-white/80">{o.itemSummary}</td>
                    <td className="p-3 align-top text-right font-mono whitespace-nowrap">
                      <p className="text-white/60">
                        {formatEurFromCents(o.subtotalBaseCents, 'it')} + {formatEurFromCents(o.feeCents, 'it')}
                      </p>
                      <p className="text-sm font-bold text-white">{formatEurFromCents(o.totalCents, 'it')}</p>
                    </td>
                    <td className="p-3 align-top">
                      <form action={updateOrderWhatsappGroupAction} className="flex flex-wrap items-center gap-2">
                        <input type="hidden" name="orderId" value={o.id} />
                        <input type="hidden" name="locale" value={locale} />
                        <select
                          name="whatsappGroupStatus"
                          defaultValue={o.whatsappGroupStatus}
                          className="h-8 border border-white/20 bg-[#17191c] px-2 text-xs text-white"
                        >
                          <option value="scheduled_dec_20">Dal 20/12</option>
                          <option value="invited">Invitato</option>
                          <option value="active">Gruppo Attivo</option>
                        </select>
                        <input
                          type="url"
                          name="whatsappGroupInviteUrl"
                          defaultValue={o.whatsappGroupInviteUrl || ''}
                          placeholder="https://chat.whatsapp.com/..."
                          className="h-8 w-44 border border-white/20 bg-black/40 px-2 text-xs text-white"
                        />
                        <button
                          type="submit"
                          className="inline-flex h-8 items-center gap-1 bg-white px-2.5 text-[11px] font-bold text-black hover:bg-emerald-300"
                        >
                          <Users className="h-3 w-3" aria-hidden="true" />
                          Salva
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
