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
    <figure className="border-y border-[#F6F1E7]/14 bg-[#050505]" data-event-cover-hero={eventId}>
      <div className="relative flex min-h-[max(400px,60vh)] items-end overflow-hidden bg-[#050505] px-5 py-10 sm:px-8 sm:py-14">
        <Image quality={92} src={src} alt={alt} title={imageTitle} width={width} height={height} priority fetchPriority="high" sizes="100vw"
          className="absolute inset-0 h-full w-full object-contain" />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to top, #050505e6, #05050580 55%, transparent)' }} aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="mb-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
            <span className="bg-[#F6F1E7] px-3 py-1 text-[#050505]">{venue}</span>
            {genres ? <span className="border border-[#F6F1E7]/30 bg-[#050505]/90 px-3 py-1 text-[#F6F1E7]">{genres}</span> : null}
            {statusBadge ? <span className="border border-[#F6F1E7]/50 bg-[#050505]/90 px-3.5 py-1 text-[#F6F1E7]" data-almost-sold-out-badge>{statusBadge}</span> : null}
          </div>
          <h1 data-event-title={typeof title === 'string' ? title : undefined} className="max-w-5xl break-words font-serif text-4xl font-bold tracking-tight text-[#F6F1E7] md:text-6xl">{titleNode ?? title}</h1>
          <p className="mt-4 inline-flex items-center gap-2 text-base text-[#EAE3D5]">
            <CalendarDays className="h-5 w-5 text-[#F6F1E7]" aria-hidden="true" />
            <time dateTime={dateTimeISO}>{date}</time>
          </p>
        </div>
      </div>
      <figcaption className="mx-auto max-w-7xl px-5 py-3 text-sm leading-relaxed text-[#C2B9AA] sm:px-8">{caption}</figcaption>
    </figure>
  );
}
