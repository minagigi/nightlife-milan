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
    <section className="w-full bg-[#0A0A0C] border-t border-white/14" aria-label={heading}>
      <div className="max-w-[1440px] mx-auto border-x border-white/14 px-5 sm:px-14 py-12">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-[#FFFFFF] mb-2">{heading}</h2>
        <p className="font-sans text-[13px] font-semibold text-[#C9C7C2] mb-6">
          Milano · Selezione Top Club
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topEvents.map((ev) => (
            <article key={ev.id} className="border border-white/14 bg-[#18181C] p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-[#FFFFFF]">{ev.title}</h3>
                <p className="font-sans text-[13px] font-semibold text-[#EDEBE6] mt-1.5">{ev.venueName}</p>
                <p className="font-sans text-[13px] text-[#C9C7C2] mt-1 tabular-nums">{ev.labels.longDate}</p>
              </div>
              <Link
                href={`${lp}/events/${ev.slug}`}
                prefetch={false}
                className="nlm-pressable mt-4 inline-flex items-center font-sans text-[13px] font-bold text-[#EDEBE6] hover:text-[#FFFFFF]"
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
