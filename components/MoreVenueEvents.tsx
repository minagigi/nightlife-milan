import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { buildMoreVenueEventsHeading } from '@/lib/eventPageLocale';
import { HumanEventCarousel } from '@/components/HumanEventCarousel';

export interface MoreVenueEventItem {
  href: string;
  title: string;
  dateStr: string;
  imageSrc: string;
}

interface MoreVenueEventsProps {
  items: MoreVenueEventItem[];
  locale: string;
  venueName: string;
}

/** "More events at {venue}" block on the event page — internal linking to
 * other upcoming events at the same venue. Renders nothing if there are no
 * other upcoming events (no empty section, no "no events" message). */
export default function MoreVenueEvents({ items, locale, venueName }: MoreVenueEventsProps) {
  if (items.length === 0) return null;

  return (
    <section
      data-more-venue-events
      data-no-lightbox="true"
      className="mt-12 not-prose"
    >
      <h2 className="text-2xl font-serif font-bold text-champagne mb-5">
        {buildMoreVenueEventsHeading(locale, venueName)}
      </h2>
      <HumanEventCarousel locale={locale} cardSize="compact" ariaLabel={buildMoreVenueEventsHeading(locale, venueName)}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/15 bg-[#0B0A09] hover:border-champagne/50 transition-colors"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-white/10 bg-[#050505]">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                quality={92}
                sizes="(max-width: 768px) 74vw, 280px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="p-4">
              <p className="font-sans text-champagne text-[11px] font-semibold tracking-[0.15em] uppercase mb-1">
                {item.dateStr}
              </p>
              <h3 className="font-serif text-base sm:text-lg text-white group-hover:text-champagne transition-colors">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </HumanEventCarousel>
    </section>
  );
}
