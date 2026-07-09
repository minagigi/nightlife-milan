import Link from 'next/link';

export interface MoreVenueEventItem {
  href: string;
  title: string;
  dateStr: string;
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

  const isIt = locale === 'it';

  return (
    <section className="mt-12 not-prose">
      <h2 className="text-2xl font-serif font-bold text-champagne mb-4">
        {isIt ? `Altri eventi al ${venueName}` : `More events at ${venueName}`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:border-champagne/40 transition-colors"
          >
            <p className="font-sans text-champagne text-[11px] font-semibold tracking-[0.15em] uppercase mb-1">
              {item.dateStr}
            </p>
            <h3 className="font-serif text-lg text-white">{item.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
