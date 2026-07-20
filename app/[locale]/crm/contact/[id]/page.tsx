import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageCircle, Save } from 'lucide-react';
import { notFound } from 'next/navigation';
import { readCrmDatabase } from '@/lib/crmStore';
import { updateCrmEmailPermission } from '../../actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Scheda cliente | Nightlife Milan CRM',
  robots: { index: false, follow: false, nocache: true },
};

function formatDateTime(value: string | null): string {
  if (!value) return '—';
  return new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default async function CrmContactPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const database = await readCrmDatabase();
  const contact = database.contacts[id];
  if (!contact) notFound();
  const attendances = Object.values(database.attendances)
    .filter((attendance) => attendance.contactId === contact.id)
    .sort((a, b) => (b.eventStartUtc || b.registeredAt).localeCompare(a.eventStartUtc || a.registeredAt));
  const crmPath = locale === 'en' ? '/crm' : `/${locale}/crm`;

  return (
    <main className="crm-shell min-h-screen bg-[#101113] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link href={crmPath} className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          CRM clienti
        </Link>

        <header className="mt-6 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{contact.name}</h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55">
              {contact.email && <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-emerald-200"><Mail className="h-4 w-4" />{contact.email}</a>}
              {contact.phone && <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" />{contact.phone}</span>}
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-5 text-right">
            <div><dt className="text-[10px] uppercase text-white/35">Eventi</dt><dd className="mt-1 text-xl tabular-nums">{contact.stats.events}</dd></div>
            <div><dt className="text-[10px] uppercase text-white/35">Biglietti</dt><dd className="mt-1 text-xl tabular-nums">{contact.stats.tickets}</dd></div>
            <div><dt className="text-[10px] uppercase text-white/35">Check-in</dt><dd className="mt-1 text-xl tabular-nums">{contact.stats.checkIns}</dd></div>
          </dl>
        </header>

        <section className="grid gap-8 border-b border-white/10 py-6 md:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="text-sm font-semibold">Permesso email</h2>
            <p className="mt-2 text-xs leading-relaxed text-white/45">
              “Solo transazionale” consente messaggi relativi alla prenotazione, non campagne promozionali. Segna “Marketing consentito” solo quando il consenso è documentato.
            </p>
            <form action={updateCrmEmailPermission} className="mt-4 flex max-w-md gap-2">
              <input type="hidden" name="contactId" value={contact.id} />
              <select name="status" defaultValue={contact.emailMarketing.status} className="h-10 min-w-0 flex-1 border border-white/15 bg-[#17191c] px-3 text-sm outline-none focus:border-emerald-300">
                <option value="not_opted_in">Solo transazionale</option>
                <option value="opted_in">Marketing consentito</option>
                <option value="opted_out">Disiscritto</option>
              </select>
              <button type="submit" title="Salva permesso email" className="grid h-10 w-10 place-items-center border border-emerald-300/50 text-emerald-200 hover:bg-emerald-300/10">
                <Save className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <p className="mt-2 text-[11px] text-white/35">Fonte: {contact.emailMarketing.source} · aggiornato {formatDateTime(contact.emailMarketing.updatedAt)}</p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
            <div><dt className="text-xs text-white/35">Prima registrazione</dt><dd className="mt-1 text-white/75">{formatDateTime(contact.firstSeenAt)}</dd></div>
            <div><dt className="text-xs text-white/35">Ultimo aggiornamento</dt><dd className="mt-1 text-white/75">{formatDateTime(contact.lastSeenAt)}</dd></div>
            <div><dt className="text-xs text-white/35">Locali frequentati</dt><dd className="mt-1 text-white/75">{contact.stats.venues.join(', ') || '—'}</dd></div>
            <div><dt className="text-xs text-white/35">Lingue degli eventi</dt><dd className="mt-1 uppercase text-white/75">{contact.stats.locales.join(', ') || '—'}</dd></div>
          </dl>
        </section>

        <section className="py-6">
          <h2 className="text-lg font-semibold">Storico partecipazioni</h2>
          <div className="mt-4 overflow-x-auto border-y border-white/10">
            <table className="w-full min-w-[880px] text-left text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase text-white/40">
                <tr>
                  <th className="px-3 py-3 font-medium">Evento</th>
                  <th className="px-3 py-3 font-medium">Data</th>
                  <th className="px-3 py-3 font-medium">Locale</th>
                  <th className="px-3 py-3 font-medium">Biglietto</th>
                  <th className="px-3 py-3 font-medium">Stato</th>
                  <th className="px-3 py-3 text-center font-medium">Check-in</th>
                </tr>
              </thead>
              <tbody>
                {attendances.map((attendance) => (
                  <tr key={attendance.id} className="border-t border-white/[0.06]">
                    <td className="max-w-[360px] px-3 py-3 font-medium">{attendance.eventName}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-white/60">{formatDateTime(attendance.eventStartUtc)}</td>
                    <td className="px-3 py-3 text-white/60">{attendance.venueName || '—'}</td>
                    <td className="px-3 py-3 text-white/60">{attendance.ticketClassName || '—'}</td>
                    <td className="px-3 py-3 text-white/60">{attendance.cancelled ? 'Annullato' : attendance.refunded ? 'Rimborsato' : attendance.status}</td>
                    <td className="px-3 py-3 text-center">{attendance.checkedIn ? 'Sì' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
