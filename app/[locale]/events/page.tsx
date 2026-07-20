import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { getLocalizedText, generateEventListSchema, jsonLdString } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events`;
  const title = seoTitle(tr(locale, 'All Events in Milan 2026 | Nightlife Milan', 'Tutti gli Eventi a Milano 2026 | Nightlife Milan'));
  const description = withWhatsApp(tr(locale, 'Discover all events, nights and experiences in Milan. Clubs, aperitivo, live music, special nights. Book VIP table or guestlist via WhatsApp.', 'Scopri tutti gli eventi, serate ed esperienze in programma a Milano. Club, aperitivo, live music, serate speciali. Prenota tavolo VIP o guestlist via WhatsApp.'), locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events'),
    },
    openGraph: {
      title,
      description,
      images: [{ url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`, width: 1200, height: 630, alt: tr(locale, 'Milan nightlife events', 'Eventi Milano vita notturna') }],
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
    },
    keywords: isIt
      ? ['eventi milano', 'serate milano', 'eventi club milano', 'vita notturna milano luglio 2026', 'guestlist eventi milano']
      : ['milan events', 'milan nightlife events', 'club events milan', 'milan nightlife july 2026', 'guestlist events milan'],
    robots: seoRobots(locale),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`],
      site: '@nightlifemilan',
    },
  };
}

export default async function EventsHubPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  // Confine giorno nel fuso di Roma, non del server (UTC su Vercel):
  // mai mostrare eventi già passati.
  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);

  const items = allItems.filter(({ event }) => isUpcomingRome(event.dateISO));

  // Special events
  const specialItems = items.filter(i => i.event.isSpecial);

  // Event completi via il generatore condiviso (lib/seo.ts) — stessa entità
  // ricca di tutte le altre superfici, mai un Event scritto a mano.
  const eventListSchema = items.length > 0
    ? generateEventListSchema(items, locale, tr(locale, 'Milan Events 2026', 'Eventi Milano 2026'))
    : null;

  const t = {
    hero: tr(locale, 'All Events', 'Tutti gli Eventi'),
    heroSub: isIt
      ? 'Il calendario completo della vita notturna milanese — serate speciali, eventi ricorrenti, aperitivo e molto altro.'
      : "Milan's complete nightlife calendar — special nights, recurring events, aperitivo and much more.",
    quickAnswer: isIt
      ? `A Milano ci sono ${items.length} eventi in programma nei migliori club. Apri l'evento per dettagli e prenotazione; assistenza WhatsApp +39 351 912 7047.`
      : `Milan has ${items.length} upcoming events at the best clubs. Open the event for details and booking; WhatsApp +39 351 912 7047.`,
    upcoming: tr(locale, 'Upcoming Events', 'In Programma'),
    special: tr(locale, 'Special Nights', 'Serate Speciali'),
    tonight: tr(locale, 'Tonight', 'Stasera'),
    thisWeek: tr(locale, 'This Week', 'Questa Settimana'),
  };

  return (
    <>
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
      <main className="flex-1 bg-[#131009] w-full pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-white/40" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href={lp || '/'} className="hover:text-champagne transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-champagne" aria-current="page">{tr(locale, 'Events', 'Eventi')}</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
            {t.hero}
          </h1>
          <p className="text-xl text-white/40 max-w-3xl mb-8 font-light leading-relaxed">
            {t.heroSub}
          </p>

          {/* AI Quick Answer */}
          <div className="max-w-2xl mb-10 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/70 text-sm leading-relaxed">{t.quickAnswer}</p>
          </div>

          {/* Calendar Nav */}
          <div className="flex gap-3 flex-wrap mb-12">
            <Link
              href={`${lp}/events/tonight`}
              className="px-6 py-3 rounded-full border border-champagne/40 text-champagne hover:bg-champagne hover:text-black transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {t.tonight}
            </Link>
            <Link
              href={`${lp}/events/this-week`}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {t.thisWeek}
            </Link>
            <Link
              href={`${lp}/events/best`}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Best Clubs', 'I Migliori')}
            </Link>
            <Link
              href={`${lp}/events/special`}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Special Events', 'Speciali')}
            </Link>
          </div>
        </section>

        {/* Special Events highlight */}
        {specialItems.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-3xl text-white">{t.special}</h2>
              <div className="flex-grow h-px bg-champagne/20" />
              <Link href={`${lp}/events/special`} className="text-champagne text-sm tracking-wider hover:underline uppercase">
                {tr(locale, 'See all →', 'Vedi tutti →')}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialItems.slice(0, 3).map(item => {
                const title = getLocalizedText(item.event.localizedContent.title, locale);
                const slug = getLocalizedText(item.event.localizedContent.slug, locale);
                const venueName = getLocalizedText(item.venue.localizedContent.name, locale);
                const date = new Date(item.event.dateISO).toLocaleDateString(locale, {
                  weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Rome',
                });
                return (
                  <Link
                    key={item.event.id}
                    href={`${lp}/events/${slug}`}
                    className="group relative h-64 rounded-lg overflow-hidden border border-champagne/20 hover:border-champagne/60 transition-colors"
                  >
                    <Image
                      src={item.event.image || item.venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={85}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-champagne text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {tr(locale, 'Special', 'Speciale')}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-champagne/70 text-xs font-mono mb-1">{date}</p>
                      <h3 className="font-serif text-lg text-white group-hover:text-champagne transition-colors leading-tight">{title}</h3>
                      <p className="text-white/40 text-sm mt-1">{venueName}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* All Upcoming Events Grid */}
        <DiscoveryGrid
          items={items}
          lang={locale}
          title={t.upcoming}
          subtitle={tr(locale, 'All curated upcoming events', 'Tutti gli appuntamenti selezionati per te')}
        />

        {/* CTA WhatsApp */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              {tr(locale, 'Book for Any Event', 'Prenota per Qualsiasi Evento')}
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mb-8 font-light">
              {tr(locale, 'Our concierge replies in 10 minutes. VIP table, guestlist, bottles — everything handled for you, for free.', 'Il nostro concierge risponde in 10 minuti. Tavolo VIP, guestlist, bottiglie — tutto gestito per te, gratis.')}
            </p>
            <a
              href="https://wa.me/393519127047?text=Hi%2C%20I%20want%20to%20book%20for%20an%20event%20in%20Milan."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm"
            >
              WhatsApp +39 351 912 7047
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
