import Link from '@/components/LocalizedLink';
import { CalendarDays, ArrowRight, Sparkles } from 'lucide-react';
import { readOctoberHubCopy } from '@/lib/octoberEditorial';
import { isEnabledLocale, localePrefix } from '@/lib/i18n/locales';
import { capodannoCategoryPath, capodannoEventPath, capodannoPath } from '@/lib/capodanno/routes';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import { toCardPoster4x5 } from '@/lib/cardPoster4x5';

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
  const pastNotice = isIt
    ? 'Prezzi passati: potrebbero esserci cambiamenti di prezzo o aggiornamenti del tema della serata'
    : 'Past prices: subject to possible price changes or updates to the evening’s theme';

  const weeklyPriorityCards = [
    {
      rank: isIt ? '01 · CLUB ICONICO · PARCO SEMPIONE' : '01 · FLAGSHIP CLUB · PARCO SEMPIONE',
      venue: 'Just Me Milano (Torre Branca)',
      title: isIt
        ? 'Serate della Settimana Just Me Milano: Aperto 7 Sere su 7 (Lun – Dom)'
        : 'Just Me Milan Weekly Nights: Open 7 Nights a Week (Mon – Sun)',
      desc: isIt
        ? 'Dal Lunedì alla Domenica sotto la Torre Branca: Monday Night, Martedì Universitario, Mercoledì Absolutely, Giovedì Special Night, Friday Night, Saturday Night & Sunday Uptown. Royal Aperitivo dalle 19:30 e Club fino alle 05:00.'
        : 'Monday through Sunday beneath Torre Branca in Parco Sempione: Monday Night, University Tuesday, Absolutely Wednesday, Thursday Special Night, Friday Night, Saturday Night & Uptown Sunday. Royal Aperitivo from 19:30 & Club until 05:00.',
      badge: isIt ? 'Royal Aperitivo da 15-20€ · Tavoli VIP da 320€ a 5.000€' : 'Royal Aperitivo from €15-20 · VIP Tables €320 to €5,000',
      posterSrc: '/images/events/october-2026/249213-e2755e4bf02c.webp',
      href: `${prefix}/events/justme-saturday-saturday-night`,
    },
    {
      rank: isIt ? '02 · CLUB ICONICO · PORTA GARIBALDI' : '02 · FLAGSHIP CLUB · PORTA GARIBALDI',
      venue: 'Pineta Club Milano',
      title: isIt
        ? 'Serate della Settimana Pineta Milano: Giovedì, Venerdì & Sabato Show'
        : 'Pineta Club Milan Weekly Nights: Thursday, Friday & Saturday Show',
      desc: isIt
        ? 'Giovedì Tr3ndy Society, Venerdì Aperitivo Cantato & Live Music e Sabato Luxury Dinner Show & Club tra i lampadari di cristallo di Via Messina 38.'
        : 'Thursday Tr3ndy Society, Friday Singing Aperitivo & Live Music, and Saturday Luxury Dinner Show & Club under crystal chandeliers at Via Messina 38.',
      badge: isIt ? 'Aperitivo Cantato da 20€ · Tavoli VIP & Dinner da 300€' : 'Singing Aperitivo from €20 · VIP Tables & Dinner from €300',
      posterSrc: '/images/events/october-2026/243822-fa1698470cb9.webp',
      href: `${prefix}/events/pineta-friday-aperitivo-cantato`,
    },
    {
      rank: isIt ? '03 · LOFT & SALONE INVERNALE · SEMPIONE' : '03 · WINTER LOFT & HALL · SEMPIONE',
      venue: '55 Milano',
      title: isIt
        ? 'Serate della Settimana 55 Milano: Apericena XL, Cena Cantata & Sabato The Wall'
        : '55 Milano Weekly Nights: XXL Apericena, Dinner Show & Saturday The Wall',
      desc: isIt
        ? 'Da Martedì a Domenica nello storico loft di Via Piero della Francesca 55: Royal Apericena XL per lauree e compleanni, Venerdì Dinner Show, Sabato The Wall e Domenica Latin Night.'
        : 'Tuesday through Sunday inside the historic loft at Via Piero della Francesca 55: Royal XXL Apericena for graduations and birthdays, Friday Dinner Show, Saturday The Wall & Sunday Latin Night.',
      badge: isIt ? 'Royal Apericena da 20€ · Cena Cantata & Tavoli VIP da 200€' : 'Royal Apericena from €20 · Dinner Show & VIP Tables from €200',
      posterSrc: '/images/events/weekly-posters/55milano-saturday.webp',
      href: `${prefix}/events/55milano-saturday-aperitivo-cena-cantata`,
    },
    {
      rank: isIt ? '04 · ROOFTOP PANORAMICO COPERTO · 20° PIANO' : '04 · ENCLOSED PANORAMIC ROOFTOP · 20TH FLOOR',
      venue: 'Voya Rooftop Milano',
      title: isIt
        ? 'Serate della Settimana Voya Rooftop: Sunset Aperitivo, Cena Skyline & DJ Set'
        : 'Voya Rooftop Weekly Nights: Sunset Aperitivo, Skyline Dinner & DJ Set',
      desc: isIt
        ? 'Da Martedì a Domenica al 20° piano riscaldato con vista a 360° sullo skyline di Milano: Sunset Aperitivo dalle 18:30, cena panoramica à la carte, mixology d’autore e Sky Clubbing fino a tardi.'
        : 'Tuesday through Sunday on the heated 20th floor with 360° Milan skyline views: Sunset Aperitivo from 18:30, panoramic à la carte dinner, signature mixology & Sky Clubbing until late.',
      badge: isIt ? 'Sunset Aperitivo da 20€ · Cena Vista Skyline & Tavoli VIP Rooftop' : 'Sunset Aperitivo from €20 · Skyline Dinner & Rooftop VIP Tables',
      posterSrc: '/images/events/weekly-posters/voya-saturday.webp',
      href: `${prefix}/events/voya-saturday-rooftop-experience`,
    },
    {
      rank: '05 · INDOOR CLUB · REPUBBLICA',
      venue: 'REPVBLIC Milano',
      title: isIt
        ? 'Serate REPVBLIC Milano: Mar Tech House, Gio Hip-Hop/Reggaeton, Ven–Sab Tech House & Dom Trap'
        : 'REPVBLIC Milan Weekly Nights: Tue Tech House, Thu Hip-Hop/Reggaeton, Fri–Sat Tech House & Sun Trap',
      desc: isIt
        ? 'Martedì HOME x CLUB APÉRO (Tech House, lista gratis entro 01:00), Giovedì BURAKA x MOVIDA (Hip-Hop & Reggaeton, RSVP gratis entro 01:00), Venerdì & Sabato Tech House, Domenica DEMON TIME (Hip-Hop & Trap, donna gratis entro 01:30). Prenotazione solo via WhatsApp.'
        : 'Tuesday HOME x CLUB APÉRO (Tech House, free guestlist before 01:00), Thursday BURAKA x MOVIDA (Hip-Hop & Reggaeton, free RSVP before 01:00), Friday & Saturday Tech House, Sunday DEMON TIME (Hip-Hop & Trap, women free before 01:30). WhatsApp booking only.',
      badge: isIt ? 'Tavoli Pista da 300€ (5 pax) · Privè da 600€ (10–12 pax) · Solo WhatsApp' : 'Dancefloor Tables from €300 (5 pax) · Privé from €600 (10–12 pax) · WhatsApp Only',
      posterSrc: '/images/events/weekly-posters/repvblic-tuesday.webp',
      href: `${prefix}/events/repvblic-tuesday-home-club-apero`,
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
        ? 'Prezzi ufficiali: 80€ (Club) · 300€ (Gran Cenone) · Tavoli 600€–5.000€'
        : 'Official prices: €80 (Club) · €300 (Gala Dinner) · Tables €600–€5,000',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-justme-milano-torre-branca.webp',
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
        ? 'Prezzi ufficiali: 40€ (Dopocena / Buffet) · 160€ (Gran Cenone Servito)'
        : 'Official prices: €40 (Party / Buffet) · €160 (Served Gala Dinner)',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-pineta-milano.webp',
      href: capodannoEventPath('capodanno-pineta-milano', locale),
      highlight: false,
    },
    {
      rank: isIt ? '03 · SKYLINE 20° PIANO · CAPODANNO ROOFTOP N° 1 DI MILANO' : '03 · 20TH FLOOR SKYLINE · MILAN’S #1 ROOFTOP NYE',
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
      rank: isIt ? '04 · GRAN GALÀ LAGO DI GARDA · DESENZANO / LONATO' : '04 · LAKE GARDA GALA · DESENZANO / LONATO',
      venue: 'Just Me Garda Lake',
      title: isIt
        ? 'Capodanno Just Me Lago di Garda 2027: "Just Me in Rouge" Dinner & Dance'
        : 'Just Me Garda Lake NYE 2027: "Just Me in Rouge" Dinner & Dance',
      priceLabel: isIt
        ? 'Prezzi Xceed verificati: 20€ (Club + Drink) · 70€ (Buffet) · 130€ (Gran Cenone) · Tavoli da 440€'
        : 'Verified Xceed prices: €20 (Club + Drink) · €70 (Buffet) · €130 (Gala Dinner) · Tables from €440',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-justme-garda-lake.webp',
      href: capodannoEventPath('capodanno-justme-garda-lake', locale),
      highlight: true,
    },
    {
      rank: '05 · ARENA & GARDEN · SAN SIRO',
      venue: 'Aria Club Milano',
      title: isIt
        ? 'Capodanno Aria Club Milano 2027: Urban, Reggaeton & Commercial Show a San Siro'
        : 'Aria Club Milan NYE 2027: Urban, Reggaeton & Commercial Arena Show',
      priceLabel: isIt
        ? 'Prezzi indicativi: 45€–55€ (Dopocena) · 65€ (Buffet) · 130€ (Cenone)'
        : 'Benchmark prices: €45–€55 (Entry) · €65 (Buffet) · €130 (Dinner)',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-aria-club-milano.webp',
      href: capodannoEventPath('capodanno-aria-club-milano', locale),
      highlight: false,
    },
    {
      rank: '06 · LA DOLCE VITA · VIA PIERO DELLA FRANCESCA',
      venue: '55 Milano',
      title: isIt
        ? 'Capodanno 55 Milano 2027: La Dolce Vita (Gala 160€, Buffet 100€, Club 30–50€)'
        : '55 Milano NYE 2027: La Dolce Vita (€160 Gala, €100 Buffet, €30–€50 Club)',
      priceLabel: isIt
        ? 'Confermato 2027: Gala 160€ · Buffet con seduta 100€ · Dopocena 00:10 30/40/50€ · Tavoli 350€'
        : 'Confirmed 2027: €160 Gala · €100 Laid-Table Buffet · €30/€40/€50 00:10 Club · €350 Tables',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-55-milano.webp',
      href: capodannoEventPath('capodanno-55-milano', locale),
      highlight: false,
    },
    {
      rank: '07 · CAPODANNO 2027 · REPUBBLICA',
      venue: 'REPVBLIC Milano',
      title: isIt
        ? 'NEW YEAR’S EVE AT REPVBLIC MILANO 2027: Piazza della Repubblica 12'
        : 'NEW YEAR’S EVE AT REPVBLIC MILANO 2027 · Piazza della Repubblica 12',
      priceLabel: isIt
        ? 'Tariffe ufficiali confermate: Early Bird 45€ (flûte + 1 drink) · Tavolo Dancefloor 600€ (6 ospiti) · Privé 1.200€ (10 ospiti)'
        : 'Confirmed official rates: Early Bird €45 (flûte + 1 drink) · Dancefloor Table €600 (6 guests) · Privé €1,200 (10 guests)',
      posterSrc: '/images/events/capodanno-2027-posters/capodanno-repvblic-milano.webp',
      href: capodannoEventPath('capodanno-repvblic-milano', locale),
      highlight: false,
    },
  ];

  return (
    <div className="w-full bg-[#050505]" data-october-entry>
      {/* ── SEZIONE DEDICATA 1: SERATE DELLA SETTIMANA NEI 6 CLUB SIMBOLO (Couture Noir) ─── */}
      <section
        id="serate-settimana"
        data-home-weekly-priority-section
        className="w-full border-b border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7]"
      >
        <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-14 sm:px-14 sm:py-20">
          <div className="flex flex-col justify-between gap-6 border-b border-[#F6F1E7]/14 pb-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold uppercase leading-[0.95] text-[#F6F1E7] sm:text-[42px]">
                {isIt
                  ? 'Serate dei 6 Club Simbolo'
                  : 'Milan’s 6 Flagship Club Nights'}
              </h2>
              <p className="mt-3 flex items-center gap-2 text-[13px] font-bold text-[#EAE3D5]">
                <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-[#EAE3D5]" />
                {isIt
                  ? 'PROGRAMMAZIONE SETTIMANALE UFFICIALE · DAL LUNEDÌ ALLA DOMENICA · MILANO'
                  : 'OFFICIAL WEEKLY SCHEDULE · MONDAY TO SUNDAY · MILAN'}
              </p>
              <p className="mt-4 max-w-[48ch] font-sans text-base leading-relaxed text-[#C2B9AA]">
                {isIt
                  ? 'In primo piano le serate settimanali dei 6 club simbolo della notte milanese (1. Just Me aperto 7/7, 2. Pineta Club, 3. Aria Club San Siro, 4. 55 Milano, 5. Voya Rooftop 20° Piano, 6. Repvblic) con Royal Aperitivo, Dinner Show, Liste e Tavoli VIP.'
                  : 'Featuring the weekly club nights across Milan’s 6 flagship venues (1. Just Me open 7/7, 2. Pineta Club, 3. Aria Club San Siro, 4. 55 Milano, 5. Voya Rooftop 20th Floor, 6. Repvblic) with Royal Aperitivo, Dinner Shows, Guest Lists, and VIP Tables.'}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href={`${prefix}/events/this-week`}
                prefetch={false}
                className="nlm-pressable inline-flex min-h-[48px] items-center justify-center bg-[#25D366] px-6 py-3.5 text-[13px] font-bold uppercase text-[#050505] transition-colors hover:bg-[#2EE472]"
              >
                {isIt ? 'Serate di Questa Settimana ↗' : 'This Week’s Nights ↗'}
              </Link>
              <Link
                href={`${prefix}/events/tonight`}
                prefetch={false}
                className="nlm-pressable inline-flex min-h-[48px] items-center justify-center border border-[#EAE3D5]/32 bg-[#F6F1E7] px-5 py-3.5 text-[13px] font-bold uppercase text-[#050505] transition-colors hover:bg-[#050505] hover:text-[#F6F1E7]"
              >
                {isIt ? 'Club Aperti Stasera ↗' : 'Clubs Open Tonight ↗'}
              </Link>
              <Link
                href={`${prefix}/events/october-2026`}
                prefetch={false}
                className="nlm-pressable inline-flex min-h-[48px] items-center justify-center border border-[#EAE3D5]/32 bg-[#F6F1E7] px-5 py-3.5 text-[13px] font-bold uppercase text-[#050505] transition-colors hover:bg-[#050505] hover:text-[#F6F1E7]"
              >
                <CalendarDays aria-hidden="true" className="mr-2 h-4 w-4 text-current" />
                {octoberHeading} ↗
              </Link>
            </div>
          </div>

          {/* Griglia 6 Club Simbolo con Serate della Settimana */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {weeklyPriorityCards.map((card) => (
              <div
                key={card.venue}
                className="flex flex-col justify-between overflow-hidden border border-[#F6F1E7]/14 bg-[#141311] transition-colors hover:border-[#EAE3D5]/32"
                data-priority-weekly-card={card.venue}
              >
                <div>
                  <Link href={card.href} prefetch={false} className="block border-b border-[#F6F1E7]/14 bg-[#050505]">
                    <img
                      src={toCardPoster4x5(card.posterSrc)}
                      alt={card.title}
                      loading="lazy"
                      className="block aspect-[4/5] w-full object-cover"
                    />
                  </Link>
                  <div className="p-6 pb-2">
                    <div className="mb-2.5">
                      <span
                        className="inline-flex bg-[#050505] px-3 py-1 text-[13px] font-bold text-[#F6F1E7]"
                        data-selling-fast-badge
                        data-almost-sold-out-badge
                      >
                        {scarcity.almostSoldOutBadge}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug text-[#F6F1E7] sm:text-xl">
                      <Link href={card.href} prefetch={false} className="transition-colors hover:underline">
                        {card.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-[13px] font-bold text-[#F6F1E7]">
                      {card.venue} · <span className="text-[#C2B9AA]">{card.rank}</span>
                    </p>
                    <p className="mt-2.5 max-w-[48ch] text-base leading-relaxed text-[#C2B9AA]">{card.desc}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-3 border-t border-[#EAE3D5]/32/12 p-6 pt-4">
                  <span className="inline-block text-[13px] font-bold text-[#F6F1E7]">
                    {card.badge}
                  </span>
                  <Link
                    href={card.href}
                    prefetch={false}
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-1.5 bg-[#EAE3D5] px-4 py-2.5 text-[13px] font-bold uppercase text-[#050505] transition-colors hover:bg-[#25D366] hover:text-[#050505]"
                  >
                    {scarcity.openEventCardCta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEZIONE DEDICATA 2: CAPODANNO 2027 MILANO E LOMBARDIA (#050505 Couture Noir) ─────────── */}
      <section
        id="capodanno-2027"
        data-home-capodanno-section
        className="w-full border-b border-[#F6F1E7]/14 bg-[#050505]"
      >
        <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-14 sm:px-14 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#F6F1E7]/14">
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-[#F6F1E7] leading-[0.95]">
                {isIt
                  ? 'Capodanno 2027 a Milano: 124 Eventi e Cenoni'
                  : 'Milan NYE 2027: 124 Events, Galas & Tables'}
              </h2>
              <p className="mt-3 text-[13px] font-bold text-[#EAE3D5] flex items-center gap-2">
                <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-[#EAE3D5]" />
                {isIt
                  ? '78 Locali a Milano · Just Me Lago di Garda · 16 Capodanni Speciali · 12 Province Lombarde · Piazze Gratis'
                  : '78 Milan Clubs · Just Me Lake Garda · 16 Special NYE Galas · 12 Lombardy Provinces · Free Squares'}
              </p>
              <p className="mt-4 max-w-[48ch] font-sans text-base text-[#EAE3D5] leading-relaxed">
                {isIt
                  ? 'In prima fila i club e rooftop simbolo (Just Me Milano, Just Me Lago di Garda "Just Me in Rouge", Pineta, Aria, 55 Milano, Voya Rooftop con menu completo a 300€ a persona, Repvblic, Bischeri Milano e PERREO XL @ Gate), seguiti da tutti i 124 eventi ufficiali del 31 dicembre 2026.'
                  : 'Starting with our priority venues (Just Me Milan, Just Me Lake Garda "Just Me in Rouge", Pineta, Aria, 55 Milano, Voya Rooftop with full all-inclusive menu at €300/person, Repvblic, Bischeri Milano, and PERREO XL @ Gate), followed by all 124 official December 31, 2026 events.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href={capodannoPath(locale)}
                prefetch={false}
                className="nlm-pressable inline-flex min-h-[48px] items-center justify-center bg-[#F6F1E7] px-6 py-3.5 text-[13px] font-bold text-[#050505] hover:bg-[#EAE3D5] transition-colors"
              >
                {isIt ? 'Tutti i 124 Eventi di Capodanno ↗' : 'All 124 NYE 2027 Events ↗'}
              </Link>
              <Link
                href={capodannoCategoryPath('capodanno-rooftop-milano', locale)}
                prefetch={false}
                className="nlm-pressable inline-flex min-h-[48px] items-center justify-center border border-[#EAE3D5]/40 bg-[#141311] px-5 py-3.5 text-[13px] font-bold text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] transition-colors"
              >
                {isIt ? 'Voya Rooftop #1 Milano (300€) ↗' : 'Voya Rooftop #1 Milan (€300) ↗'}
              </Link>
            </div>
          </div>

          {/* Avviso Prezzi Passati e Possibili Cambiamenti (Couture Noir) */}
          <div className="mt-6 border border-[#F6F1E7]/14 bg-[#0B0A09] px-5 py-4 text-base text-[#F6F1E7]">
            <span className="font-bold text-[#EAE3D5]">
              {isIt ? 'NOTA TARIFFE E PROGRAMMA CAPODANNO: ' : 'NYE RATES & PROGRAMME NOTICE: '}
            </span>
            <span>
              {isIt
                ? 'Gli eventi con programma ufficiale 2026/2027 (come REPVBLIC Milano, Bischeri Milano e PERREO XL @ Gate Milano) riportano tariffe e format confermati; le schede non ancora confermate indicano i prezzi della passata edizione soggetti ad aggiornamento.'
                : 'Events with confirmed 2026/2027 programming (such as REPVBLIC Milano, Bischeri Milano, and PERREO XL @ Gate Milano) display official confirmed rates; unconfirmed listings still display prior-edition prices subject to update.'}
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
                    ? 'border-white bg-[#0B0A09] hover:border-[#25D366]'
                    : 'border-[#EAE3D5]/28 bg-[#0B0A09] hover:border-[#EAE3D5]'
                }`}
              >
                <div>
                  <div className="border-b border-white/12 bg-[#050505]">
                    <img
                      src={toCardPoster4x5(card.posterSrc)}
                      alt={card.title}
                      loading="lazy"
                      className="block aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <div className="p-6 pb-2">
                    <div className="mb-2.5">
                      <span
                        className="inline-flex border border-[#EAE3D5]/40 bg-[#050505] px-3 py-1 text-[13px] font-bold text-[#F6F1E7]"
                        data-selling-fast-badge
                      >
                        {scarcity.sellingFastBadge}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F6F1E7] group-hover:underline transition-colors leading-snug sm:text-xl">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-semibold text-[#C2B9AA]">
                      <span className="font-bold text-[#EAE3D5]">{card.venue}</span> · {card.rank}
                    </p>
                    <p className="mt-3 text-base font-bold tabular-nums text-[#EAE3D5]">{card.priceLabel}</p>
                    <p className="mt-1.5 text-[13px] italic text-[#C2B9AA]">{pastNotice}</p>
                  </div>
                </div>
                <div className="p-6 pt-4 mt-3 border-t border-[#F6F1E7]/14 flex items-center justify-between text-[13px] font-bold text-[#EAE3D5]">
                  <span>{scarcity.openEventCardCta}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* 4 Hub Principali Capodanno + 12 Categorie */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <Link href={capodannoPath(locale)} prefetch={false} className="nlm-pressable bg-[#0B0A09] p-4 text-center text-[13px] font-bold text-[#F6F1E7] hover:bg-[#141311] transition-colors">
              {isIt ? 'Tutti i 124 Eventi Ufficiali ↗' : 'All 124 Official Events ↗'}
            </Link>
            <Link href={capodannoCategoryPath('capodanno-speciale', locale)} prefetch={false} className="nlm-pressable border border-[#EAE3D5]/28 bg-[#0B0A09] p-4 text-center text-[13px] font-bold text-[#F6F1E7] hover:border-[#FFFFFF] transition-colors">
              {isIt ? '16 Speciali, Tram & Terme ↗' : '16 Special, Tram & Spa ↗'}
            </Link>
            <Link href={capodannoCategoryPath('capodanno-lombardia', locale)} prefetch={false} className="nlm-pressable border border-[#EAE3D5]/28 bg-[#0B0A09] p-4 text-center text-[13px] font-bold text-[#F6F1E7] hover:border-[#FFFFFF] transition-colors">
              {isIt ? 'Tutte le 12 Province ↗' : 'All 12 Provinces ↗'}
            </Link>
            <Link href={capodannoCategoryPath('capodanno-in-piazza', locale)} prefetch={false} className="nlm-pressable border border-[#EAE3D5]/28 bg-[#0B0A09] p-4 text-center text-[13px] font-bold text-[#F6F1E7] hover:border-[#FFFFFF] transition-colors">
              {isIt ? 'Capodanno in Piazza Gratis ↗' : 'Free Public Squares ↗'}
            </Link>
          </div>

          <div className="mt-5 pt-5 border-t border-[#F6F1E7]/14 flex flex-wrap gap-2">
            <Link href={capodannoCategoryPath('capodanno-rooftop-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-bold border border-[#EAE3D5]/40 bg-[#141311] text-[#F6F1E7] hover:bg-[#F6F1E7] hover:text-[#050505] transition-colors">{isIt ? 'Rooftop & Terrazze (Voya N°1 · 300€)' : 'Rooftops (Voya #1 · €300)'}</Link>
            <Link href={capodannoCategoryPath('capodanno-discoteche-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Discoteche & Club' : 'Nightclubs'}</Link>
            <Link href={capodannoCategoryPath('capodanno-locali-cenone-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Locali & Cenone Show' : 'Dinner Shows'}</Link>
            <Link href={capodannoCategoryPath('capodanno-coppie-romantico-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Per Coppie (Romantico)' : 'For Couples'}</Link>
            <Link href={capodannoCategoryPath('capodanno-single-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Per Single & Amici' : 'For Singles'}</Link>
            <Link href={capodannoCategoryPath('capodanno-famiglie-bambini-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Per Famiglie & Bimbi' : 'For Families'}</Link>
            <Link href={capodannoCategoryPath('capodanno-over-30-40-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Over 30 / Over 40' : 'Adults 30+/40+'}</Link>
            <Link href={capodannoCategoryPath('capodanno-hotel-5-stelle-ville-castelli', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Hotel 5 Stelle & Ville' : '5-Star Hotels & Villas'}</Link>
            <Link href={capodannoCategoryPath('capodanno-terme-spa-baita-montagna', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Terme & Baita Neve' : 'Spas & Chalets'}</Link>
            <Link href={capodannoCategoryPath('capodanno-techno-elettronica-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Techno & House' : 'Techno & House'}</Link>
            <Link href={capodannoCategoryPath('capodanno-latino-reggaeton-hiphop-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Reggaeton & Latino' : 'Reggaeton & Latin'}</Link>
            <Link href={capodannoCategoryPath('capodanno-economico-low-cost-milano', locale)} prefetch={false} className="px-3.5 py-2 text-[13px] font-semibold border border-[#EAE3D5]/28 bg-[#050505] text-[#EAE3D5] hover:bg-[#141311] hover:text-[#F6F1E7] transition-colors">{isIt ? 'Economico ≤35€' : 'Budget ≤€35'}</Link>
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
