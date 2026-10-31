import Link from 'next/link';
import { CalendarDays, ArrowRight, Sparkles } from 'lucide-react';
import { readOctoberHubCopy } from '@/lib/octoberEditorial';
import { isEnabledLocale, localePrefix } from '@/lib/i18n/locales';
import { halloweenPath } from '@/lib/halloween/routes';
import { capodannoCategoryPath, capodannoEventPath, capodannoPath } from '@/lib/capodanno/routes';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';

export function HomeHalloweenAndCapodannoSections({
  locale,
  prefix,
  octoberHeading,
}: {
  locale: string;
  prefix: string;
  octoberHeading: string;
}) {
  const isIt = locale === 'it';
  const scarcity = getScarcityAndChatCopy(locale);
  const hwHref = isEnabledLocale(locale) ? halloweenPath(locale) : `${prefix}/events/halloween-2026`;
  const pastNotice = isIt
    ? 'Prezzi passati: potrebbero esserci cambiamenti di prezzo o aggiornamenti del tema della serata'
    : 'Past prices: subject to possible price changes or updates to the evening’s theme';

  const halloweenPriorityCards = [
    {
      rank: isIt ? '01 · CLUB ICONICO · PARCO SEMPIONE' : '01 · FLAGSHIP CLUB · PARCO SEMPIONE',
      venue: 'Just Me Milano (Torre Branca)',
      title: 'Marie Antoinette · The Dark Side (Halloween 2026)',
      desc: isIt
        ? 'Sabato 31 Ottobre 2026 · Royal Aperitivo, Gran Galà Dinner Show & Halloween Party nel giardino d’inverno sotto la Torre Branca.'
        : 'Saturday, Oct 31, 2026 · Royal Aperitivo, Gala Dinner Show & Halloween Party beneath Torre Branca in Parco Sempione.',
      badge: isIt ? 'Prevendita Ufficiale da 20€ · Tavoli VIP & Cenone' : 'Official Tickets from €20 · VIP Tables & Dinner',
      posterSrc: '/images/halloween/2026/user-selection/01-justme-halloween-poster.webp',
      href: `${prefix}/events/halloween-night-justme-milano-2026-10-31`,
    },
    {
      rank: isIt ? '02 · CLUB ICONICO · PORTA GARIBALDI' : '02 · FLAGSHIP CLUB · PORTA GARIBALDI',
      venue: 'Pineta Club Milano',
      title: 'The Ball of the Damned · Halloween Night',
      desc: isIt
        ? 'Sabato 31 Ottobre 2026 · Aperitivo Cantato, Luxury Dinner Show & Club Night tra lampadari di cristallo in Via Messina 38.'
        : 'Saturday, Oct 31, 2026 · Singing Aperitivo, Luxury Dinner Show & Club Night under crystal chandeliers in Via Messina 38.',
      badge: isIt ? 'Prevendita Ufficiale da 15€ · Tavoli VIP & Dinner' : 'Official Tickets from €15 · VIP Tables & Dinner',
      posterSrc: '/images/halloween/2026/user-selection/02-pineta-halloween-poster.webp',
      href: `${prefix}/events/the-ball-of-the-damned-pineta-milano-2026-10-31`,
    },
    {
      rank: '03 · ARENA & GARDEN · SAN SIRO',
      venue: 'Aria Club Milano',
      title: 'Welcome to Aria · Halloween Special Show',
      desc: isIt
        ? 'Sabato 31 Ottobre 2026 · Il grande party Hip-Hop, Reggaeton, Urban & Commercial di Halloween in Piazzale dello Sport 14.'
        : 'Saturday, Oct 31, 2026 · Milan’s premier Hip-Hop, Reggaeton, Urban & Commercial Halloween arena at Piazzale dello Sport 14.',
      badge: isIt ? 'Prevendita Ufficiale da 20€ · Tavoli Pista & Privé' : 'Official Tickets from €20 · Dancefloor & Privé Tables',
      posterSrc: '/images/halloween/2026/user-selection/03-aria-halloween-poster.webp',
      href: `${prefix}/events/halloween-party-aria-club-milano-2026-10-31`,
    },
    {
      rank: isIt ? '04 · LOFT & TERRAZZA · SEMPIONE' : '04 · LOFT & TERRACE · SEMPIONE',
      venue: '55 Milano',
      title: 'Hotel 55 Club · Halloween Loft Night',
      desc: isIt
        ? 'Sabato 31 Ottobre 2026 · Royal Aperitivo, Cena Cantata & DJ Set nel loft industriale di Via Piero della Francesca 55.'
        : 'Saturday, Oct 31, 2026 · Royal Aperitivo, Dinner Show & DJ Set inside the industrial loft on Via Piero della Francesca 55.',
      badge: isIt ? 'Aperitivo, Cena & Tavoli VIP su Prenotazione' : 'Aperitivo, Dinner & VIP Tables by Reservation',
      posterSrc: '/images/halloween/2026/user-selection/04-55-milano-halloween-poster.webp',
      href: `${prefix}/events/halloween-hotel-55-55-milano-2026-10-31`,
    },
    {
      rank: isIt ? '05 · ROOFTOP PANORAMICO · 20° PIANO' : '05 · PANORAMIC ROOFTOP · 20TH FLOOR',
      venue: 'Voya Rooftop Milano',
      title: isIt ? 'Halloween Rooftop Night · Cena à la carte & Party' : 'Halloween Rooftop Night · À la Carte Dinner & Party',
      desc: isIt
        ? 'Sabato 31 Ottobre 2026 · Cena panoramica à la carte, mixology d’autore e Halloween Rooftop Party con vista sullo skyline.'
        : 'Saturday, Oct 31, 2026 · Panoramic à la carte dinner, signature mixology & Halloween Rooftop Party overlooking the skyline.',
      badge: isIt ? 'Cena Panoramica, Dopocena & Tavoli VIP Rooftop' : 'Panoramic Dinner, After-Dinner & Rooftop VIP Tables',
      posterSrc: '/images/halloween/2026/user-selection/05-voya-rooftop-halloween-poster.webp',
      href: `${prefix}/events/voya-on-top-halloween-voya-rooftop-milano-2026-10-31`,
    },
    {
      rank: '06 · DINNER SHOW & CLUB · REPUBBLICA',
      venue: 'Repvblic Milano',
      title: 'Halloween Luxury Dinner Show & Club Night',
      desc: isIt
        ? 'Sabato 31 Ottobre 2026 · Dinner Show & Clubbing internazionale nel salotto di Piazza della Repubblica 12.'
        : 'Saturday, Oct 31, 2026 · Luxury Dinner Show & international clubbing at Piazza della Repubblica 12.',
      badge: isIt ? 'Accredito Lista, Dinner Show & Tavoli Privé' : 'Guest List, Dinner Show & Privé Tables',
      posterSrc: '/images/events/october-2026/repvblic-halloween-poster.webp',
      href: `${prefix}/events/halloween-luxury-dinner-club-repvblic-milano-2026-10-31`,
    },
  ];

  const capodannoPriorityCards = [
    {
      rank: isIt ? '01 · GRAN GALÀ · TORRE BRANCA' : '01 · GALA NIGHT · TORRE BRANCA',
      venue: 'Just Me Milano',
      title: isIt
        ? 'Capodanno JustMe Milano 2027: Il Grande Gatsby sotto la Torre Branca'
        : 'JustMe Milan NYE 2027: The Great Gatsby beneath Torre Branca',
      priceLabel: isIt
        ? 'Prezzi passati: da 50€ (Ingresso) · 100€ (Royal Buffet) · 250€ (Gran Cenone)'
        : 'Past prices: from €50 (Entry) · €100 (Royal Buffet) · €250 (Gala Dinner)',
      posterSrc: '/images/events/october-2026/248439-68f2dbbf4405.webp',
      href: capodannoEventPath('capodanno-justme-milano-torre-branca', locale),
      highlight: false,
    },
    {
      rank: isIt ? '02 · CLUB ICONICO · PORTA GARIBALDI' : '02 · FLAGSHIP CLUB · PORTA GARIBALDI',
      venue: 'Pineta Club Milano',
      title: isIt
        ? 'Capodanno Pineta Milano 2027: Gran Galà Dinner Show & Luxury Club'
        : 'Pineta Milan NYE 2027: Gala Dinner Show & Luxury Club',
      priceLabel: isIt
        ? 'Prezzi passati: da 40€ (Dopocena) · 70€ (Buffet) · 130€ (Gran Cenone Servito)'
        : 'Past prices: from €40 (Party) · €70 (Buffet) · €130 (Served Gala Dinner)',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-pineta-milano.webp',
      href: capodannoEventPath('capodanno-pineta-milano', locale),
      highlight: false,
    },
    {
      rank: '03 · ARENA & GARDEN · SAN SIRO',
      venue: 'Aria Club Milano',
      title: isIt
        ? 'Capodanno Aria Club Milano 2027: Urban, Reggaeton & Commercial Show a San Siro'
        : 'Aria Club Milan NYE 2027: Urban, Reggaeton & Commercial Arena Show',
      priceLabel: isIt
        ? 'Prezzi passati: da 35€ (Dopocena) · 90€ (Royal Buffet + Party) · Tavoli da 350€'
        : 'Past prices: from €35 (Entry) · €90 (Royal Buffet + Party) · Tables from €350',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-aria-club-milano.webp',
      href: capodannoEventPath('capodanno-aria-club-milano', locale),
      highlight: false,
    },
    {
      rank: '04 · LOFT PARTY · VIA PIERO DELLA FRANCESCA',
      venue: '55 Milano',
      title: isIt
        ? 'Capodanno 55 Milano 2027: New York Loft Party in Via Piero della Francesca'
        : '55 Milano NYE 2027: New York Loft Dinner & Party',
      priceLabel: isIt
        ? 'Prezzi passati: da 40€ (Dopocena) · 75€ (Gran Buffet) · 130€ (Cenone Servito)'
        : 'Past prices: from €40 (Party) · €75 (Grand Buffet) · €130 (Served Dinner)',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-55-milano.webp',
      href: capodannoEventPath('capodanno-55-milano', locale),
      highlight: false,
    },
    {
      rank: isIt ? '05 · SKYLINE 20° PIANO · CAPODANNO ROOFTOP N° 1 DI MILANO' : '05 · 20TH FLOOR SKYLINE · MILAN’S #1 ROOFTOP NYE',
      venue: 'Voya Rooftop Milano',
      title: isIt
        ? 'Capodanno Voya Rooftop Milano 2027: Il Capodanno Rooftop Numero 1 di Milano (Menu Completo 300€)'
        : 'Voya Rooftop Milan NYE 2027: Milan’s #1 Rooftop New Year’s Eve (Full Menu €300/person)',
      priceLabel: isIt
        ? 'Menu completo di tutto: 300€ a persona (Gran Cenone Panoramico + Vini + Brindisi + Party)'
        : 'Full all-inclusive menu: €300 per person (Panoramic Gala Dinner + Wines + Midnight Toast + Party)',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-voya-rooftop-milano.webp',
      href: capodannoEventPath('capodanno-voya-rooftop-milano', locale),
      highlight: true,
    },
    {
      rank: '06 · DINNER SHOW & CLUB · REPUBBLICA',
      venue: 'Repvblic Milano',
      title: isIt
        ? 'Capodanno Repvblic Milano 2027: Luxury Dinner Show in Piazza della Repubblica'
        : 'Repvblic Milan NYE 2027: Luxury Dinner Show in Piazza della Repubblica',
      priceLabel: isIt
        ? 'Prezzi passati: da 50€ (Dopocena) · 160€ (Gran Cenone Servito) · Tavoli VIP da 500€'
        : 'Past prices: from €50 (Party) · €160 (Served Gala Dinner) · VIP Tables from €500',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-repvblic-milano.webp',
      href: capodannoEventPath('capodanno-repvblic-milano', locale),
      highlight: false,
    },
  ];

  return (
    <div className="w-full bg-[#050505]" data-october-entry>
      {/* ── SEZIONE DEDICATA 1: HALLOWEEN 2026 MILANO ──────────────────────── */}
      <section
        id="halloween-2026"
        data-home-halloween-section
        className="w-full border-b border-[#F6F1E7]/14 bg-gradient-to-b from-[#120B07] via-[#0B0908] to-[#050505]"
      >
        <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-14 sm:px-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#F6F1E7]/14">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#D6BE96] flex items-center gap-2 mb-3">
                <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-[#D6BE96]" />
                {isIt
                  ? 'SEZIONE SPECIALE HALLOWEEN 2026 · 30 OTTOBRE – 1 NOVEMBRE 2026 · MILANO'
                  : 'HALLOWEEN 2026 DEDICATED SECTION · OCT 30 – NOV 1, 2026 · MILAN'}
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F6F1E7] tracking-[-0.025em] leading-[0.96]">
                {isIt
                  ? 'Halloween 2026 a Milano: I 6 Club Iconici e Tutti i 30 Eventi Ufficiali in Programma'
                  : 'Halloween 2026 in Milan: Top 6 Priority Venues & All 30 Official Parties'}
              </h2>
              <p className="mt-4 font-sans text-sm sm:text-base text-[#C2B9AA] leading-relaxed">
                {isIt
                  ? 'In primo piano i 6 club simbolo della notte milanese (1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic) seguiti da tutti i 30 party in maschera, dinner show ed eventi di Halloween 2026 a Milano.'
                  : 'Featuring our 6 priority venues first (1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic), followed by all 30 Halloween 2026 nightclub parties, dinner shows, and events in Milan.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={hwHref}
                prefetch={false}
                className="inline-flex min-h-[48px] items-center justify-center bg-[#D6BE96] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#050505] hover:bg-[#F6F1E7] transition-colors"
              >
                {isIt ? 'Tutti i 30 Eventi Halloween 2026 ↗' : 'All 30 Halloween 2026 Events ↗'}
              </Link>
              <Link
                href={`${prefix}/events/october-2026`}
                prefetch={false}
                className="inline-flex min-h-[48px] items-center justify-center border border-[#D6BE96]/45 bg-[#0B0A09] px-5 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-[#F6F1E7] hover:border-[#D6BE96] transition-colors"
              >
                <CalendarDays aria-hidden="true" className="mr-2 h-4 w-4 text-[#D6BE96]" />
                {octoberHeading} ↗
              </Link>
            </div>
          </div>

          {/* Griglia 6 Location Prioritarie Halloween con Locandine */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {halloweenPriorityCards.map((card) => (
              <div
                key={card.venue}
                className="flex flex-col justify-between overflow-hidden border border-[#D6BE96]/35 bg-[#0B0A09] hover:border-[#D6BE96] transition-colors"
                data-priority-halloween-card={card.venue}
              >
                <div>
                  <Link href={card.href} prefetch={false} className="block border-b border-[#F6F1E7]/12 bg-black/50">
                    <img
                      src={card.posterSrc}
                      alt={card.title}
                      loading="lazy"
                      className="block h-80 w-full object-contain"
                    />
                  </Link>
                  <div className="p-6 pb-2">
                    <div className="mb-2.5">
                      <span
                        className="inline-flex rounded-full border border-amber-400/70 bg-amber-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300"
                        data-selling-fast-badge
                        data-almost-sold-out-badge
                      >
                        {scarcity.almostSoldOutBadge}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D6BE96]">{card.rank}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-[#847C6F]">{card.venue}</p>
                    <h3 className="mt-2 font-serif text-2xl text-[#F6F1E7] leading-snug">
                      <Link href={card.href} prefetch={false} className="hover:text-[#D6BE96] transition-colors">
                        {card.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-[#C2B9AA] leading-relaxed">{card.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-4 mt-3 border-t border-[#F6F1E7]/12 flex flex-col gap-3">
                  <span className="inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-[#D6BE96]">
                    {card.badge}
                  </span>
                  <Link
                    href={card.href}
                    prefetch={false}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 bg-[#D6BE96] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#050505] hover:bg-[#F6F1E7] transition-colors"
                  >
                    {scarcity.openEventCardCta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEZIONE DEDICATA 2: CAPODANNO 2027 MILANO E LOMBARDIA ─────────── */}
      <section
        id="capodanno-2027"
        data-home-capodanno-section
        className="w-full border-b border-[#F6F1E7]/14 bg-gradient-to-b from-[#171209] via-[#0D0B08] to-[#050505]"
      >
        <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-14 sm:px-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#F6F1E7]/14">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#D6BE96] flex items-center gap-2 mb-3">
                <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-[#D6BE96]" />
                {isIt
                  ? 'SEZIONE SPECIALE CAPODANNO 2027 · 112 EVENTI UFFICIALI (31 DICEMBRE 2026)'
                  : 'NEW YEAR’S EVE 2027 DEDICATED SECTION · 112 OFFICIAL EVENTS (DEC 31, 2026)'}
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F6F1E7] tracking-[-0.025em] leading-[0.96]">
                {isIt
                  ? 'Tutti i 73 Locali e Discoteche di Milano, 15 Capodanni Speciali, 12 Province Lombarde & Piazze Gratis'
                  : 'All 73 Milan Clubs & Venues, 15 Special NYE Experiences, All 12 Lombardy Provinces & Free Squares'}
              </h2>
              <p className="mt-4 font-sans text-sm sm:text-base text-[#C2B9AA] leading-relaxed">
                {isIt
                  ? 'In prima fila i 6 club e rooftop simbolo di Milano (1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop — il Capodanno Rooftop Numero 1 di Milano con menu completo di tutto a 300€ a persona — e 6. Repvblic), seguiti da tutti i 112 eventi di San Silvestro.'
                  : 'Starting with our 6 priority venues (1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop — Milan’s #1 Rooftop NYE with full all-inclusive menu at €300/person — and 6. Repvblic), followed by all 112 New Year’s Eve events.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={capodannoPath(locale)}
                prefetch={false}
                className="inline-flex min-h-[48px] items-center justify-center bg-[#D6BE96] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#050505] hover:bg-[#F6F1E7] transition-colors"
              >
                {isIt ? 'Tutti i 112 Eventi di Capodanno ↗' : 'All 112 NYE 2027 Events ↗'}
              </Link>
              <Link
                href={capodannoCategoryPath('capodanno-rooftop-milano', locale)}
                prefetch={false}
                className="inline-flex min-h-[48px] items-center justify-center border border-[#D6BE96] bg-[#141008] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors"
              >
                {isIt ? 'Voya Rooftop #1 Milano (300€) ↗' : 'Voya Rooftop #1 Milan (€300) ↗'}
              </Link>
            </div>
          </div>

          {/* Avviso Prezzi Passati e Possibili Cambiamenti */}
          <div className="mt-6 rounded-none border border-[#D6BE96]/50 bg-[#16120A] px-5 py-3.5 text-xs sm:text-sm text-[#F6F1E7]">
            <span className="font-mono font-bold uppercase tracking-wider text-[#D6BE96]">
              {isIt ? 'NOTA TARIFFE E PROGRAMMA CAPODANNO: ' : 'NYE RATES & PROGRAMME NOTICE: '}
            </span>
            <span>
              {isIt
                ? 'Per tutti gli eventi di Capodanno sono pubblicati i prezzi passati e di fianco è indicato che potrebbero esserci cambiamenti di prezzo o aggiornamenti del tema della serata.'
                : 'Past-edition prices are published for all New Year’s Eve events alongside the notice that there may be price changes or updates to the evening’s theme.'}
            </span>
          </div>

          {/* Griglia 6 Location Prioritarie Capodanno 2027 con Locandine */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capodannoPriorityCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                prefetch={false}
                data-priority-capodanno-card={card.venue}
                className={`group flex flex-col justify-between overflow-hidden border transition-colors ${
                  card.highlight
                    ? 'border-[#D6BE96] bg-gradient-to-b from-[#1D160B] to-[#0E0B07] hover:border-[#F6F1E7]'
                    : 'border-[#D6BE96]/35 bg-[#0B0A09] hover:border-[#D6BE96]'
                }`}
              >
                <div>
                  <div className="border-b border-[#F6F1E7]/12 bg-black/50">
                    <img
                      src={card.posterSrc}
                      alt={card.title}
                      loading="lazy"
                      className="block h-auto w-full object-contain"
                    />
                  </div>
                  <div className="p-6 pb-2">
                    <div className="mb-2.5">
                      <span
                        className="inline-flex rounded-full border border-amber-400/70 bg-amber-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300"
                        data-selling-fast-badge
                      >
                        {scarcity.sellingFastBadge}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D6BE96]">{card.rank}</p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-[#847C6F]">{card.venue}</p>
                    <h3 className="mt-2 font-serif text-2xl text-[#F6F1E7] group-hover:text-[#D6BE96] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-mono text-xs font-bold text-[#D6BE96]">{card.priceLabel}</p>
                    <p className="mt-1.5 text-[11px] italic text-[#C2B9AA]">{pastNotice}</p>
                  </div>
                </div>
                <div className="p-6 pt-4 mt-3 border-t border-[#F6F1E7]/12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[#D6BE96]">
                  <span>{scarcity.openEventCardCta}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* 4 Hub Principali Capodanno + 12 Categorie */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Link href={capodannoPath(locale)} prefetch={false} className="bg-[#D6BE96] p-4 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#050505] hover:bg-[#F6F1E7] transition-colors">
              {isIt ? '01 · Tutti i 112 Eventi Milano ↗' : '01 · All 112 Milan Events ↗'}
            </Link>
            <Link href={capodannoCategoryPath('capodanno-speciale', locale)} prefetch={false} className="border border-[#D6BE96]/45 bg-[#0B0A09] p-4 text-center font-mono text-xs uppercase tracking-wider text-[#F6F1E7] hover:border-[#D6BE96] transition-colors">
              {isIt ? '02 · 15 Speciali, Tram & Terme ↗' : '02 · 15 Special, Tram & Spa ↗'}
            </Link>
            <Link href={capodannoCategoryPath('capodanno-lombardia', locale)} prefetch={false} className="border border-[#D6BE96]/45 bg-[#0B0A09] p-4 text-center font-mono text-xs uppercase tracking-wider text-[#F6F1E7] hover:border-[#D6BE96] transition-colors">
              {isIt ? '03 · Tutte le 12 Province ↗' : '03 · All 12 Provinces ↗'}
            </Link>
            <Link href={capodannoCategoryPath('capodanno-in-piazza', locale)} prefetch={false} className="border border-[#D6BE96]/45 bg-[#0B0A09] p-4 text-center font-mono text-xs uppercase tracking-wider text-[#F6F1E7] hover:border-[#D6BE96] transition-colors">
              {isIt ? '04 · Capodanno in Piazza Gratis ↗' : '04 · Free Public Squares ↗'}
            </Link>
          </div>

          <div className="mt-5 pt-5 border-t border-[#D6BE96]/25 flex flex-wrap gap-2">
            <Link href={capodannoCategoryPath('capodanno-rooftop-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96] bg-[#16120A] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Rooftop & Terrazze (Voya N°1 · 300€)' : 'Rooftops (Voya #1 · €300)'}</Link>
            <Link href={capodannoCategoryPath('capodanno-discoteche-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Discoteche & Club' : 'Nightclubs'}</Link>
            <Link href={capodannoCategoryPath('capodanno-locali-cenone-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Locali & Cenone Show' : 'Dinner Shows'}</Link>
            <Link href={capodannoCategoryPath('capodanno-coppie-romantico-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Per Coppie (Romantico)' : 'For Couples'}</Link>
            <Link href={capodannoCategoryPath('capodanno-single-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Per Single & Amici' : 'For Singles'}</Link>
            <Link href={capodannoCategoryPath('capodanno-famiglie-bambini-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Per Famiglie & Bimbi' : 'For Families'}</Link>
            <Link href={capodannoCategoryPath('capodanno-over-30-40-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Over 30 / Over 40' : 'Adults 30+/40+'}</Link>
            <Link href={capodannoCategoryPath('capodanno-hotel-5-stelle-ville-castelli', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Hotel 5★ & Ville' : '5★ Hotels & Villas'}</Link>
            <Link href={capodannoCategoryPath('capodanno-terme-spa-baita-montagna', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Terme & Baita Neve' : 'Spas & Chalets'}</Link>
            <Link href={capodannoCategoryPath('capodanno-techno-elettronica-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Techno & House' : 'Techno & House'}</Link>
            <Link href={capodannoCategoryPath('capodanno-latino-reggaeton-hiphop-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Reggaeton & Latino' : 'Reggaeton & Latin'}</Link>
            <Link href={capodannoCategoryPath('capodanno-economico-low-cost-milano', locale)} prefetch={false} className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-[#D6BE96]/35 bg-[#050505] text-[#D6BE96] hover:bg-[#D6BE96] hover:text-[#050505] transition-colors">{isIt ? 'Economico ≤35€' : 'Budget ≤€35'}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function OctoberEntry({ locale }: { locale: string }) {
  if (!isEnabledLocale(locale)) return null;
  const copy = await readOctoberHubCopy(locale);
  const lp = localePrefix(locale);
  return <HomeHalloweenAndCapodannoSections locale={locale} prefix={lp} octoberHeading={copy.labels.heading} />;
}
