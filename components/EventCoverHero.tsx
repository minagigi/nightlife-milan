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
    <figure className="bg-[#050505]" data-event-cover-hero={eventId}>
      <div className="mx-auto max-w-5xl px-4 pt-1 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
          {isPortrait4x5 ? (
            <div className="aspect-[4/5] w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] lg:col-span-5">
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
                className="block h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-full overflow-hidden border border-[#F6F1E7]/18 bg-[#050505] lg:col-span-6"
              style={{
                aspectRatio: `${dims.width} / ${dims.height}`,
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
                className="block h-full w-full object-cover"
              />
            </div>
          )}
          <div className={isPortrait4x5 ? 'min-w-0 lg:col-span-7' : 'min-w-0 lg:col-span-6'}>
            <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider">
              <span className="bg-[#F6F1E7] px-3 py-1 text-[#050505]">{venue}</span>
              {genres ? <span className="border border-[#F6F1E7]/30 bg-[#050505]/90 px-3 py-1 text-[#F6F1E7]">{genres}</span> : null}
              {statusBadge ? <span className="bg-[#25D366] px-3 py-1 text-[#050505]" data-almost-sold-out-badge>{statusBadge}</span> : null}
            </div>
            <h1 data-event-title={typeof title === 'string' ? title : undefined} className="break-words font-serif text-3xl font-bold tracking-tight text-[#F6F1E7] sm:text-4xl md:text-5xl">{titleNode ?? title}</h1>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#EAE3D5] sm:text-base">
              <CalendarDays className="h-4 w-4 text-[#F6F1E7]" aria-hidden="true" />
              <time dateTime={dateTimeISO}>{date}</time>
            </p>
            <figcaption className="mt-4 border-t border-[#F6F1E7]/14 pt-3 text-xs leading-relaxed text-[#C2B9AA] sm:text-sm">
              {caption}
            </figcaption>
          </div>
        </div>
      </div>
    </figure>
  );
}
