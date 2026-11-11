import type { ReactNode } from 'react';
import Link from '@/components/LocalizedLink';
import { ArrowRight, MessageCircle, Wine, Music2, Gem } from 'lucide-react';
import { getIntentCardsCopy } from '@/lib/i18n/intentCardsCopy';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';

interface IntentCard {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
  isWhatsApp?: boolean;
  isGold?: boolean;
}

export default function IntentCards({ locale }: { locale: string }) {
  // Prefisso URL sempre dalla locale REALE (bug fix: prima veniva collassata a
  // 'en'/'it' a monte, facendo puntare queste card sempre allo spazio inglese
  // senza prefisso per tutte le altre 33 lingue).
  const lp = locale === 'en' ? '' : `/${locale}`;
  const copy = getIntentCardsCopy(locale);
  const waLink = getConciergeBookingUrl(locale);

  const cards: IntentCard[] = [
    { icon: <Gem className="w-5 h-5" />, title: copy.vipTitle, subtitle: copy.vipSubtitle, href: `${lp}/vip-tables`, isGold: true },
    { icon: <Music2 className="w-5 h-5" />, title: copy.danceTitle, subtitle: copy.danceSubtitle, href: `${lp}/clubs` },
    { icon: <Wine className="w-5 h-5" />, title: copy.aperitivoTitle, subtitle: copy.aperitivoSubtitle, href: `${lp}/aperitivo` },
    { icon: <MessageCircle className="w-5 h-5" />, title: copy.conciergeTitle, subtitle: copy.conciergeSubtitle, href: waLink, isWhatsApp: true },
  ];

  return (
    <section className="w-full bg-[#F6F1E7] text-[#050505] border-b border-[#050505]/16">
      <div className="mx-auto max-w-[1440px] border-x border-[#050505]/16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#050505]/14">
        {cards.map((card, i) => {
          const inner = (
            <div
              className={`group relative flex h-full flex-col justify-between gap-6 p-7 sm:p-10 transition-colors duration-300 cursor-pointer min-h-[210px]
                ${card.isGold
                  ? 'bg-[#EFE9DC] hover:bg-[#E7E0D0]'
                  : 'bg-[#F6F1E7] hover:bg-[#EFE9DC]'
                }`}
            >
              {card.isGold && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-[#050505]" />
              )}

              <div className="flex items-baseline justify-between">
                <span className="font-serif italic text-4xl text-[#050505] leading-none">
                  0{i + 1}
                </span>
                <span className="block w-5 h-5 text-[#3D3830] group-hover:text-[#050505] transition-colors duration-300">
                  {card.icon}
                </span>
              </div>

              <div className="flex-1">
                <p className="font-serif text-2xl sm:text-[28px] font-normal leading-tight tracking-[-0.02em] mb-2 text-[#050505]">
                  {card.title}
                </p>
                <p className="font-sans text-[#3D3830] text-sm leading-relaxed">{card.subtitle}</p>
              </div>

              {card.isWhatsApp ? (
                <div className="mt-1 bg-[#050505] p-1.5">
                  <div className="flex min-h-[40px] items-center justify-between bg-[#25D366] px-3.5 py-2 font-mono text-[11px] font-bold tracking-[0.16em] uppercase text-[#050505]">
                    <span>WHATSAPP CONCIERGE</span>
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#050505]/14 flex items-center justify-between font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-[#050505]">
                  <span>{copy.explore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              )}
            </div>
          );

          if (card.isWhatsApp) {
            return (
              <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="h-full block">
                {inner}
              </a>
            );
          }
          return (
            <Link key={card.title} href={card.href} prefetch={false} className="h-full block">
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

