import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { Event, Venue } from '@/lib/types';
import { getLocalizedText } from '@/lib/seo';
import { localePrefix } from '@/lib/i18n/locales';
import { tr } from '@/lib/i18n/t';
import { toCardPoster4x5 } from '@/lib/cardPoster4x5';
import FavoriteButton from './FavoriteButton';

interface EventCardProps {
  event: Event;
  venue: Venue;
  lang: string;
  priority?: boolean;
  isTonight?: boolean;
}

function hasBakedContactStrip(src: string): boolean {
  return (
    src.startsWith('/images/events/october-2026/') ||
    src.startsWith('/images/events/capodanno-2027-posters/') ||
    src.startsWith('/images/events/weekly-posters/') ||
    src.startsWith('/images/events/mock-posters/') ||
    src.startsWith('/images/halloween')
  );
}

export default function EventCard({ event, venue, lang, priority = false, isTonight = false }: EventCardProps) {
  const lp = localePrefix(lang);
  const slug = getLocalizedText(event.localizedContent.slug, lang);
  const title = getLocalizedText(event.localizedContent.title, lang);
  const venueName = getLocalizedText(venue.localizedContent.name, lang);
  const altText =
    (venue.localizedContent.altTextImg && getLocalizedText(venue.localizedContent.altTextImg, lang)) || title;

  const dateObj = new Date(event.dateISO);
  const timeStr = new Intl.DateTimeFormat(lang, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome',
  }).format(dateObj);
  const dateStr = new Intl.DateTimeFormat(lang, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Rome',
  }).format(dateObj);

  const isFree = event.pricing.entry === 0;
  const formattedPrice = event.pricing.entry === null
    ? null
    : isFree
      ? tr(lang, 'FREE', 'GRATUITO')
      : new Intl.NumberFormat(lang, {
          style: 'currency',
          currency: event.pricing.currency,
          maximumFractionDigits: 0,
        }).format(event.pricing.entry);

  const genre = event.genre[0]?.replace(/_/g, ' ') ?? '';
  const href = `${lp}/events/${slug}`;
  const rawImgSrc = event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const imgSrc = toCardPoster4x5(rawImgSrc);
  const showInlineContactBar = !hasBakedContactStrip(rawImgSrc) && !imgSrc.includes('/cards-4x5/');

  return (
    <article
      className="group relative flex h-full flex-col justify-between overflow-hidden border border-[#F6F1E7]/14 bg-[#0B0A09] transition-colors duration-200 hover:border-[#EAE3D5] hover:bg-[#141311]"
      data-event-card={event.id}
    >
      {venue.isFeatured && (
        <div className="h-[2px] w-full bg-[#25D366]" />
      )}

      <div>
        <div className="relative border-b border-[#F6F1E7]/14 bg-[#050505]">
          <Link href={href} className="relative block aspect-[4/5] w-full overflow-hidden bg-[#050505]" aria-label={title}>
            <Image
              src={imgSrc}
              alt={altText}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              priority={priority}
              quality={92}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxQzE4MTAiLz48L3N2Zz4="
              className="object-cover transition-opacity duration-200 group-hover:opacity-95"
              referrerPolicy="no-referrer"
            />
          </Link>
          <div className="absolute right-3 top-3 z-20">
            <FavoriteButton
              item={{ id: event.id, type: 'event', title, image: imgSrc, subtitle: dateStr, url: href }}
            />
          </div>
          {showInlineContactBar && (
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 border-t border-[#EAE3D5]/32 bg-[#050505] px-3 py-1.5 text-[11px] font-bold">
              <span className="text-[#EAE3D5]">WWW.NIGHTLIFEMILAN.COM</span>
              <span className="text-[#A8A093]">·</span>
              <span className="inline-flex items-center gap-1 text-[#F6F1E7]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                +39 351 912 7047
              </span>
            </div>
          )}
        </div>

        <div className="p-5 pb-3">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            {isTonight && (
              <span className="inline-flex items-center gap-1.5 border border-[#25D366]/60 bg-[#050505] px-2.5 py-1 font-sans text-[12px] font-bold text-[#25D366]">
                <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
                {tr(lang, 'Tonight', 'Stasera')}
              </span>
            )}
            {genre && (
              <span className="border border-[#F6F1E7]/16 bg-[#050505] px-2.5 py-1 font-sans text-[12px] font-semibold text-[#C2B9AA]">
                {genre}
              </span>
            )}
            {formattedPrice && (
              <span
                className={`px-2.5 py-1 font-mono text-[12px] font-bold tabular-nums ${
                  isFree
                    ? 'border border-[#25D366]/50 bg-[#050505] text-[#25D366]'
                    : 'bg-[#EAE3D5] text-[#050505]'
                }`}
              >
                {formattedPrice}
              </span>
            )}
            {event.isTrending && (
              <span className="font-sans text-[12px] font-bold text-[#EAE3D5]">
                {tr(lang, 'Trending', 'Di Tendenza')}
              </span>
            )}
          </div>

          <div className="mb-1.5 flex items-center gap-2">
            <span className="font-mono text-[13px] font-semibold tabular-nums text-[#EAE3D5]">
              {timeStr}
            </span>
            <span className="text-[12px] text-[#A8A093]">·</span>
            <span className="font-mono text-[13px] tabular-nums text-[#C2B9AA]">{dateStr}</span>
          </div>

          <h3 className="mb-1 font-serif text-xl font-bold leading-snug text-[#F6F1E7] transition-colors group-hover:text-[#EAE3D5]">
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          </h3>

          <p className="font-sans text-[13px] text-[#C2B9AA]">
            {venueName}
          </p>
        </div>
      </div>

      <div className="border-t border-[#F6F1E7]/14 p-5 pt-3.5">
        <Link
          href={href}
          className="block w-full bg-[#25D366] py-3 text-center font-sans text-[13px] font-bold text-[#050505] transition-colors hover:bg-[#2EE472]"
        >
          {tr(lang, 'Book Now', 'Prenota Ora')}
        </Link>
      </div>
    </article>
  );
}
