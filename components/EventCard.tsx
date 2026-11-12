import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { Event, Venue } from '@/lib/types';
import { getLocalizedText } from '@/lib/seo';
import { localePrefix } from '@/lib/i18n/locales';
import { tr } from '@/lib/i18n/t';
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
  const imgSrc = event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const showInlineContactBar = !hasBakedContactStrip(imgSrc);

  return (
    <article
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-white/12 bg-[#0B0A09] transition-all duration-300 hover:border-champagne/45"
      data-event-card={event.id}
    >
      {venue.isFeatured && (
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-champagne to-transparent" />
      )}

      <div>
        <div className="relative border-b border-white/10 bg-[#050505]">
          <Link href={href} className="relative block aspect-[16/9] w-full overflow-hidden bg-[#050505]" aria-label={title}>
            <Image
              src={imgSrc}
              alt={altText}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              priority={priority}
              quality={92}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxQzE4MTAiLz48L3N2Zz4="
              className="object-contain transition-opacity duration-300 group-hover:opacity-95"
              referrerPolicy="no-referrer"
            />
          </Link>
          <div className="absolute right-3 top-3 z-20">
            <FavoriteButton
              item={{ id: event.id, type: 'event', title, image: imgSrc, subtitle: dateStr, url: href }}
            />
          </div>
          {showInlineContactBar && (
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 border-t border-champagne/45 bg-[#08080B] px-3 py-1.5 text-[10px] font-bold tracking-wider">
              <span className="text-champagne">WWW.NIGHTLIFEMILAN.COM</span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1 text-white">
                <span className="inline-block h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
                +39 351 912 7047
              </span>
            </div>
          )}
        </div>

        <div className="p-5 pb-3">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            {isTonight && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-campari/40 bg-campari/15 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-campari-hi">
                <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-campari" aria-hidden="true" />
                {tr(lang, 'Tonight', 'Stasera')}
              </span>
            )}
            {genre && (
              <span className="rounded-full border border-white/15 bg-[#050505] px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
                {genre}
              </span>
            )}
            {formattedPrice && (
              <span
                className={`rounded-full px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] tabular-nums ${
                  isFree
                    ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-400'
                    : 'bg-champagne text-black'
                }`}
              >
                {formattedPrice}
              </span>
            )}
            {event.isTrending && (
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-champagne">
                {tr(lang, 'Trending', 'Di Tendenza')}
              </span>
            )}
          </div>

          <div className="mb-1.5 flex items-center gap-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] tabular-nums text-champagne">
              {timeStr}
            </span>
            <span className="text-[10px] text-white/30">·</span>
            <span className="font-sans text-[11px] tracking-wider tabular-nums text-white/60">{dateStr}</span>
          </div>

          <h3 className="mb-1 font-serif text-xl font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-champagne">
            <Link href={href} className="hover:underline">
              {title}
            </Link>
          </h3>

          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-white/60">
            {venueName}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 p-5 pt-3.5">
        <Link
          href={href}
          className="block w-full rounded-lg bg-champagne py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-white"
        >
          {tr(lang, 'Book Now', 'Prenota Ora')}
        </Link>
      </div>
    </article>
  );
}
