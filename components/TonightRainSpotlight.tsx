'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, ExternalLink, MessageCircle, Ticket, Umbrella, UtensilsCrossed } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import {
  getJustSingingDinnerWhatsappUrl,
  getJustSingingEventbriteUrl,
  getJustSingingRainContent,
  getJustSingingWhatsappConfirmUrl,
  isJustSingingRainActive,
  JUST_SINGING_RAIN_END_MS,
  JUST_SINGING_RAIN_POSTER_SRC,
  justSingingRainPath,
} from '@/lib/just-singing-rain/justme35';

type SpotlightSection = 'aperitivo-cena' | 'discoteca' | 'all';

export default function TonightRainSpotlight({
  locale,
  section = 'all',
}: {
  locale: string;
  section?: SpotlightSection;
}) {
  const [active, setActive] = useState(() => isJustSingingRainActive());

  useEffect(() => {
    const now = Date.now();
    if (now >= JUST_SINGING_RAIN_END_MS) {
      setActive(false);
      return;
    }
    setActive(true);
    const remaining = Math.min(JUST_SINGING_RAIN_END_MS - now + 250, 2_147_483_647);
    const timer = window.setTimeout(() => {
      setActive(isJustSingingRainActive());
    }, remaining);
    return () => window.clearTimeout(timer);
  }, []);

  if (!active) return null;

  const c = getJustSingingRainContent(locale);
  const detailPath = justSingingRainPath(locale);
  const eventbriteUrl = getJustSingingEventbriteUrl(locale);
  const whatsappConfirmUrl = getJustSingingWhatsappConfirmUrl(locale);
  const whatsappDinnerUrl = getJustSingingDinnerWhatsappUrl(locale);

  const aperitivoFmt = c.formats.find((f) => f.id === 'aperitivo') || c.formats[0];
  const cenaFmt = c.formats.find((f) => f.id === 'cena') || c.formats[1];
  const serataFmt = c.formats.find((f) => f.id === 'serata') || c.formats[2];

  const visibleFormats =
    section === 'aperitivo-cena'
      ? [aperitivoFmt, cenaFmt, serataFmt]
      : section === 'discoteca'
        ? [serataFmt, aperitivoFmt, cenaFmt]
        : [aperitivoFmt, cenaFmt, serataFmt];

  return (
    <section
      data-tonight-rain-spotlight={section}
      data-no-lightbox="true"
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-2xl border border-champagne/40 bg-[#0B0A09] p-6 shadow-2xl sm:p-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href={detailPath}
              className="relative mx-auto block aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-xl border border-champagne/35 bg-[#050505]"
            >
              <Image
                src={JUST_SINGING_RAIN_POSTER_SRC}
                alt={c.h1}
                title={c.metaTitle}
                width={1080}
                height={1350}
                quality={92}
                sizes="(max-width: 1024px) 90vw, 360px"
                className="h-full w-full object-cover"
              />
            </Link>
          </div>

          <div className="space-y-5 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAE3D5] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505]">
                <Umbrella className="h-3.5 w-3.5" />
                #1 · {c.dateBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/35 bg-champagne/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-champagne">
                <Calendar className="h-3.5 w-3.5" />
                Just Me Milano · Viale Luigi Camoens 2 (Parco Sempione)
              </span>
            </div>

            <h2 className="font-serif text-2xl font-normal leading-tight text-[#F6F1E7] sm:text-4xl">
              <Link href={detailPath} className="transition-colors hover:text-champagne">
                {c.metaTitle}
              </Link>
            </h2>

            <p className="font-sans text-sm leading-relaxed text-[#EAE3D5]/90 sm:text-base">
              {c.overviewParagraphs[0]}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {visibleFormats.map((fmt) => (
                <div
                  key={fmt.id}
                  className="rounded-xl border border-white/12 bg-white/[0.03] p-4 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase text-champagne">
                    {fmt.id === 'cena' ? (
                      <UtensilsCrossed className="h-3.5 w-3.5" />
                    ) : (
                      <Clock className="h-3.5 w-3.5" />
                    )}
                    <span>{fmt.badge}</span>
                  </div>
                  <div className="font-serif text-base text-[#F6F1E7]">{fmt.title}</div>
                  <p className="font-sans text-xs leading-relaxed text-[#C2B9AA]">
                    {fmt.bullets[0]} · {fmt.bullets[1]}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={section === 'aperitivo-cena' ? whatsappDinnerUrl : whatsappConfirmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" />
                {c.ctaWhatsappLabel}
              </a>

              {eventbriteUrl && (
                <a
                  href={eventbriteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-sm bg-[#EAE3D5] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#050505] transition-colors hover:bg-white"
                >
                  <Ticket className="h-4 w-4" />
                  {c.ctaEventbriteLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <Link
                href={detailPath}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-[#EAE3D5]/50 bg-[#141311] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F6F1E7] transition-colors hover:border-[#EAE3D5] hover:bg-[#1E1C19]"
              >
                {c.metaTitle} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
