import Link from '@/components/LocalizedLink';
import type { PriorityRecommendationPresentation } from '@/lib/priorityVenueRecommendations';
import { localePrefix } from '@/lib/i18n/locales';

export default function GlobalPriorityRecommendations({
  events,
  locale,
  heading,
  viewEvent,
}: {
  events: readonly PriorityRecommendationPresentation[];
  locale: string;
  initialNow: string;
  priorityClubSlugs: readonly string[];
  heading: string;
  empty: string;
  viewEvent: string;
  scrollLeft: string;
  scrollRight: string;
}) {
  const topEvents = events.slice(0, 6);
  if (topEvents.length === 0) return null;
  const lp = localePrefix(locale);
  return (
    <section className="w-full bg-[#050505] border-t border-[#F6F1E7]/14" aria-label={heading}>
      <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14 px-5 sm:px-14 py-12">
        <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#EAE3D5] mb-2">
          MILANO · TOP CLUB SELECTION
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E7] mb-6">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topEvents.map((ev) => (
            <article key={ev.id} className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-5 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#EAE3D5]">{ev.venueName}</p>
                <h3 className="font-serif text-lg text-[#F6F1E7] mt-1">{ev.title}</h3>
                <p className="font-mono text-xs text-[#847C6F] mt-1">{ev.labels.longDate}</p>
              </div>
              <Link
                href={`${lp}/events/${ev.slug}`}
                prefetch={false}
                className="mt-4 inline-flex items-center font-mono text-[11px] tracking-[0.18em] uppercase text-[#EAE3D5] hover:text-[#F6F1E7]"
              >
                {viewEvent} ↗
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
