import Image from 'next/image';
import type { ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';
import { getPublicImageDimensions } from '@/lib/imageDimensions';

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

/**
 * Shared Event Hero component:
 * - Active 4:5 (1080x1350) posters render in a crisp 4:5 stage (max-w-[540px], >=1080w q=95, zero crop).
 * - Historical archive posters (e.g. 1376x768 16:9) adapt to their exact intrinsic ratio without cropping or upscaling.
 */
export default function EventCoverHero({
  src,
  alt,
  imageTitle,
  title,
  titleNode,
  venue,
  date,
  dateTimeISO,
  genres,
  statusBadge,
  caption,
  width,
  height,
  eventId,
}: EventCoverHeroProps) {
  const dims = getPublicImageDimensions(src, { width: width || 1080, height: height || 1350 });
  const isPortrait4x5 = dims.height > dims.width;

  return (
    <figure className="border-y border-[#F6F1E7]/14 bg-[#050505]" data-event-cover-hero={eventId}>
      <div className="border-b border-[#F6F1E7]/14 bg-[#050505]">
        {isPortrait4x5 ? (
          <div className="mx-auto aspect-[4/5] w-full max-w-[540px] bg-[#050505]">
            <Image
              quality={95}
              src={src}
              alt={alt}
              title={imageTitle}
              width={dims.width}
              height={dims.height}
              priority
              fetchPriority="high"
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div
            className="mx-auto w-full bg-[#050505]"
            style={{
              aspectRatio: `${dims.width} / ${dims.height}`,
              maxWidth: `${Math.min(960, dims.width)}px`,
            }}
          >
            <Image
              quality={95}
              src={src}
              alt={alt}
              title={imageTitle}
              width={dims.width}
              height={dims.height}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 1080px"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="border-b border-[#F6F1E7]/14 bg-[#0B0A09] px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto w-full max-w-7xl">
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
