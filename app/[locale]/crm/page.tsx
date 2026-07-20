import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, Eye, Mail, RefreshCw, Search, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { crmFilterOptions, filterCrmContacts, type CrmPermissionStatus } from '@/lib/crmModel';
import { crmStorageConfigured, readCrmDatabase } from '@/lib/crmStore';
import { syncCrmFromEventbrite } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'CRM clienti | Nightlife Milan',
  robots: { index: false, follow: false, nocache: true },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function param(params: Record<string, string | string[] | undefined>, key: string, fallback = ''): string {
  const value = params[key];
  return typeof value === 'string' ? value : fallback;
}

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

const permissionLabels: Record<CrmPermissionStatus, { label: string; color: string }> = {
  opted_in: { label: 'Marketing consentito', color: 'bg-emerald-400' },
  not_opted_in: { label: 'Solo transazionale', color: 'bg-amber-300' },
  opted_out: { label: 'Disiscritto', color: 'bg-rose-400' },
};

function Metric({ label, value, note }: { label: string; value: string | number; note?: string }) {
  return (
    <div className="min-w-0 border-r border-white/10 px-4 py-4 last:border-r-0">
      <p className="text-[11px] uppercase text-white/45">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-white">{value}</p>
      {note && <p className="mt-1 truncate text-[11px] text-white/35">{note}</p>}
    </div>
  );
}

export default async function CrmPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const [{ locale }, queryParams, database] = await Promise.all([params, searchParams, readCrmDatabase()]);
  const query = param(queryParams, 'q');
  const emailMarketing = param(queryParams, 'marketing', 'all') as CrmPermissionStatus | 'all';
  const venue = param(queryParams, 'venue', 'all');
  const eventLocale = param(queryParams, 'language', 'all');
  const segment = param(queryParams, 'segment', 'all') as 'all' | 'repeat' | 'single' | 'checked_in';
  const contacts = filterCrmContacts(database, {
    query,
    emailMarketing,
    venue,
    locale: eventLocale,
    segment,
  });
  const options = crmFilterOptions(database);
  const allContacts = Object.values(database.contacts);
  const marketingReady = allContacts.filter((contact) => contact.emailMarketing.status === 'opted_in').length;
  const repeatGuests = allContacts.filter((contact) => contact.stats.events >= 2).length;
  const checkedIn = allContacts.filter((contact) => contact.stats.checkIns > 0).length;
  const lastSync = database.syncRuns[0];
  const crmPath = locale === 'en' ? '/crm' : `/${locale}/crm`;
  const exportParams = new URLSearchParams();
  if (query) exportParams.set('q', query);
  if (venue !== 'all') exportParams.set('venue', venue);
  if (eventLocale !== 'all') exportParams.set('language', eventLocale);
  if (segment !== 'all') exportParams.set('segment', segment);
  const exportQuery = exportParams.toString();
  const exportHref = `${crmPath}/export${exportQuery ? `?${exportQuery}` : ''}`;

  return (
    <main className="crm-shell min-h-screen bg-[#101113] px-3 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-emerald-300">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Area interna protetta
            </div>
            <h1 className="text-3xl font-semibold">CRM clienti</h1>
            <p className="mt-2 max-w-3xl text-sm text-white/50">
              Contatti deduplicati, storico Eventbrite e preferenze di comunicazione. I contatti senza consenso restano utilizzabili solo per comunicazioni relative alla prenotazione.
            </p>
          </div>
          <form action={syncCrmFromEventbrite}>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 border border-white/20 bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-emerald-200"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Sincronizza Eventbrite
            </button>
          </form>
        </header>

        {!crmStorageConfigured() && (
          <div className="mt-5 border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
            Archivio CRM non configurato in questo ambiente: manca BLOB_READ_WRITE_TOKEN.
          </div>
        )}

        <section className="mt-6 grid grid-cols-2 border-y border-white/10 bg-white/[0.02] md:grid-cols-5">
          <Metric label="Contatti" value={allContacts.length} />
          <Metric label="Marketing consentito" value={marketingReady} />
          <Metric label="Clienti abituali" value={repeatGuests} note="Almeno 2 eventi" />
          <Metric label="Check-in registrato" value={checkedIn} />
          <Metric label="Ultima sincronizzazione" value={lastSync ? formatDate(lastSync.completedAt) : 'Mai'} note={lastSync ? `${lastSync.importedAttendances} partecipazioni lette` : undefined} />
        </section>

        <section className="mt-6 border-b border-white/10 pb-6">
          <form method="get" className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1.5fr)_repeat(4,minmax(150px,1fr))_auto_auto]">
            <label className="text-xs text-white/50">
              Cerca
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Nome, email, telefono, locale"
                className="mt-1 h-10 w-full border border-white/15 bg-black/30 px-3 text-sm text-white outline-none focus:border-emerald-300"
              />
            </label>
            <label className="text-xs text-white/50">
              Contattabilità
              <select name="marketing" defaultValue={emailMarketing} className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300">
                <option value="all">Tutti</option>
                <option value="opted_in">Marketing consentito</option>
                <option value="not_opted_in">Solo transazionale</option>
                <option value="opted_out">Disiscritti</option>
              </select>
            </label>
            <label className="text-xs text-white/50">
              Locale
              <select name="venue" defaultValue={venue} className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300">
                <option value="all">Tutti i locali</option>
                {options.venues.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="text-xs text-white/50">
              Lingua evento
              <select name="language" defaultValue={eventLocale} className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300">
                <option value="all">Tutte le lingue</option>
                {options.locales.map((option) => <option key={option} value={option}>{option.toUpperCase()}</option>)}
              </select>
            </label>
            <label className="text-xs text-white/50">
              Segmento
              <select name="segment" defaultValue={segment} className="mt-1 h-10 w-full border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300">
                <option value="all">Tutti</option>
                <option value="repeat">Clienti abituali</option>
                <option value="single">Un solo evento</option>
                <option value="checked_in">Con check-in</option>
              </select>
            </label>
            <button type="submit" className="mt-auto inline-flex h-10 items-center justify-center gap-2 border border-emerald-300/50 px-4 text-sm text-emerald-200 hover:bg-emerald-300/10">
              <Search className="h-4 w-4" aria-hidden="true" />
              Filtra
            </button>
            <Link href={crmPath} className="mt-auto inline-flex h-10 items-center justify-center px-3 text-sm text-white/50 hover:text-white">Azzera</Link>
          </form>
        </section>

        <div className="mt-4 flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>{contacts.length} risultati</span>
          <div className="flex flex-wrap items-center gap-4">
            <span>I dati personali non vengono inclusi negli analytics pubblici.</span>
            <a href={exportHref} className="inline-flex h-9 items-center gap-2 border border-white/15 px-3 text-white/70 hover:border-emerald-300/50 hover:text-emerald-200">
              <Download className="h-4 w-4" aria-hidden="true" />
              Esporta contatti con consenso
            </a>
          </div>
        </div>

        <section className="mt-3 overflow-x-auto border-y border-white/10">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-white/[0.03] text-[11px] uppercase text-white/40">
              <tr>
                <th className="px-3 py-3 font-medium">Cliente</th>
                <th className="px-3 py-3 font-medium">Contattabilità</th>
                <th className="px-3 py-3 font-medium">Ultimo evento</th>
                <th className="px-3 py-3 text-right font-medium">Eventi</th>
                <th className="px-3 py-3 text-right font-medium">Biglietti</th>
                <th className="px-3 py-3 font-medium">Locali</th>
                <th className="px-3 py-3 font-medium">Lingue</th>
                <th className="px-3 py-3 text-right font-medium">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr><td colSpan={8} className="px-3 py-12 text-center text-white/40">Nessun contatto corrisponde ai filtri.</td></tr>
              ) : contacts.map((contact) => {
                const permission = permissionLabels[contact.emailMarketing.status];
                return (
                  <tr key={contact.id} className="border-t border-white/[0.06] hover:bg-white/[0.025]">
                    <td className="px-3 py-3">
                      <div className="font-medium text-white">{contact.name}</div>
                      <div className="mt-0.5 text-xs text-white/45">{contact.email || 'Email non disponibile'}</div>
                      {contact.phone && <div className="text-xs text-white/35">{contact.phone}</div>}
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-2 text-xs text-white/70">
                        <span className={`h-2 w-2 ${permission.color}`} aria-hidden="true" />
                        {permission.label}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-white/65">{formatDate(contact.stats.lastEventAt)}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{contact.stats.events}</td>
                    <td className="px-3 py-3 text-right tabular-nums">{contact.stats.tickets}</td>
                    <td className="max-w-[240px] px-3 py-3 text-xs text-white/55">{contact.stats.venues.join(', ') || '—'}</td>
                    <td className="px-3 py-3 text-xs uppercase text-white/55">{contact.stats.locales.join(', ') || '—'}</td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-1">
                        {contact.email && contact.emailMarketing.status === 'opted_in' && (
                          <a href={`mailto:${contact.email}`} title="Scrivi una email" className="grid h-8 w-8 place-items-center border border-white/10 text-white/55 hover:border-emerald-300/50 hover:text-emerald-200">
                            <Mail className="h-4 w-4" aria-hidden="true" />
                          </a>
                        )}
                        <Link href={`${crmPath}/contact/${contact.id}`} title="Apri scheda cliente" className="grid h-8 w-8 place-items-center border border-white/10 text-white/55 hover:border-white/30 hover:text-white">
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <footer className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span className="inline-flex items-center gap-2"><UserRoundCheck className="h-4 w-4" aria-hidden="true" />Un profilo per email, anche quando partecipa a più eventi.</span>
          <span>Fonte: Eventbrite API · archivio Vercel Blob privato</span>
        </footer>
      </div>
    </main>
  );
}
