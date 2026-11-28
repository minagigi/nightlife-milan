import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import type { PriorityRecommendationPresentation } from '@/lib/priorityVenueRecommendations';
import { localePrefix } from '@/lib/i18n/locales';
import { toCardPoster4x5 } from '@/lib/cardPoster4x5';

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
        <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-[#F6F1E7] mb-2">{heading}</h2>
        <p className="font-sans text-[13px] font-semibold text-[#C2B9AA] mb-6">
          Milano · Selezione Top Club
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topEvents.map((ev) => {
            const poster = toCardPoster4x5(ev.image || '/images/events/cards-4x5/flagship-weekly/justme-weekly.webp');
            return (
              <article key={ev.id} className="border border-[#F6F1E7]/14 bg-[#0B0A09] overflow-hidden flex flex-col justify-between">
                <div>
                  <Link href={`${lp}/events/${ev.slug}`} prefetch={false} className="block">
                    <div data-no-lightbox="true" className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] border-b border-[#F6F1E7]/14">
                      <Image
                        src={poster}
                        alt={ev.title}
                        width={1080}
                        height={1350}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        quality={92}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-[#F6F1E7]">{ev.title}</h3>
                    <p className="font-sans text-[13px] font-semibold text-[#EAE3D5] mt-1.5">{ev.venueName}</p>
                    <p className="font-sans text-[13px] text-[#C2B9AA] mt-1 tabular-nums">{ev.labels.longDate}</p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 border-t border-[#F6F1E7]/10">
                  <Link
                    href={`${lp}/events/${ev.slug}`}
                    prefetch={false}
                    className="nlm-pressable inline-flex items-center font-sans text-[13px] font-bold text-[#EAE3D5] hover:text-[#F6F1E7]"
                  >
                    {viewEvent} ↗
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
