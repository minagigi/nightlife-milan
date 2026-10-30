import Image from 'next/image';
import type { ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';

type EventCoverHeroProps = {
  src: string;
  alt: string;
  imageTitle?: string;
  title?: string;
  titleNode?: ReactNode;
  venue: ReactNode;
  date: ReactNode;
  dateTimeISO: string;
  genres?: ReactNode;
  statusBadge?: ReactNode;
  caption: ReactNode;
  width: number;
  height: number;
  eventId: string;
};

/** Shared full-width approved-cover treatment for the four localized special events. */
export default function EventCoverHero({ src, alt, imageTitle, title, titleNode, venue, date, dateTimeISO, genres, statusBadge, caption, width, height, eventId }: EventCoverHeroProps) {
  return (
    <figure className="border-y border-white/10 bg-black" data-event-cover-hero={eventId}>
      <div className="relative flex min-h-[max(400px,60vh)] items-end overflow-hidden bg-black px-5 py-10 sm:px-8 sm:py-14">
        <Image src={src} alt={alt} title={imageTitle} width={width} height={height} priority fetchPriority="high" sizes="100vw"
          className="absolute inset-0 h-full w-full object-contain" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/60 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="rounded-full bg-indigo-600 px-3 py-1 text-white">{venue}</span>
            {genres ? <span className="rounded-full bg-black/60 px-3 py-1 text-white">{genres}</span> : null}
            {statusBadge ? <span className="rounded-full border border-amber-400/70 bg-amber-500/20 px-3.5 py-1 text-amber-300 shadow-sm" data-almost-sold-out-badge>{statusBadge}</span> : null}
          </div>
          <h1 data-event-title={typeof title === 'string' ? title : undefined} className="max-w-5xl break-words text-4xl font-bold tracking-tight text-white md:text-6xl">{titleNode ?? title}</h1>
          <p className="mt-4 inline-flex items-center gap-2 text-base text-white/90">
            <CalendarDays className="h-5 w-5 text-champagne" aria-hidden="true" />
            <time dateTime={dateTimeISO}>{date}</time>
          </p>
        </div>
      </div>
      <figcaption className="mx-auto max-w-7xl px-5 py-3 text-sm leading-relaxed text-white/70 sm:px-8">{caption}</figcaption>
    </figure>
  );
}
