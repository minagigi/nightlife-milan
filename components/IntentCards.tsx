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
  const waLink = getConciergeBookingUrl(locale, undefined, lp || '/');

  const cards: IntentCard[] = [
    { icon: <Gem className="w-5 h-5" />, title: copy.vipTitle, subtitle: copy.vipSubtitle, href: `${lp}/vip-tables`, isGold: true },
    { icon: <Music2 className="w-5 h-5" />, title: copy.danceTitle, subtitle: copy.danceSubtitle, href: `${lp}/clubs` },
    { icon: <Wine className="w-5 h-5" />, title: copy.aperitivoTitle, subtitle: copy.aperitivoSubtitle, href: `${lp}/aperitivo` },
    { icon: <MessageCircle className="w-5 h-5" />, title: copy.conciergeTitle, subtitle: copy.conciergeSubtitle, href: waLink, isWhatsApp: true },
  ];

  return (
    <section className="w-full bg-[#EDEBE6] text-[#0A0A0C] border-b border-[#0A0A0C]/16">
      <div className="mx-auto max-w-[1440px] border-x border-[#0A0A0C]/16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#0A0A0C]/14">
        {cards.map((card, i) => {
          const inner = (
            <div
              data-reveal="rise"
              data-stagger={String((i % 4) + 1)}
              className={`group relative flex h-full flex-col justify-between gap-6 p-7 sm:p-10 transition-colors duration-200 cursor-pointer min-h-[210px]
                ${card.isGold
                  ? 'bg-[#FFFFFF] hover:bg-[#F7F5F0]'
                  : 'bg-[#EDEBE6] hover:bg-[#FFFFFF]'
                }`}
            >
              {card.isGold && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-[#D9381E]" />
              )}

              <div className="flex items-baseline justify-between">
                <span className="font-display italic text-xl sm:text-4xl font-extrabold tabular-nums text-[#D9381E] leading-none">
                  {i + 1}
                </span>
                <span className="block w-5 h-5 text-[#4F4D48] group-hover:text-[#0A0A0C] transition-colors duration-200">
                  {card.icon}
                </span>
              </div>

              <div className="flex-1">
                <p className="font-display text-2xl sm:text-[28px] font-extrabold uppercase leading-tight mb-2 text-[#0A0A0C]">
                  {card.title}
                </p>
                <p className="max-w-[52ch] font-sans text-[#4F4D48] text-base leading-relaxed">{card.subtitle}</p>
              </div>

              {card.isWhatsApp ? (
                <div className="mt-1 bg-[#0A0A0C] p-1.5">
                  <div className="flex min-h-[42px] items-center justify-between bg-[#25D366] px-3.5 py-2 font-sans text-[13px] font-bold text-[#050505]">
                    <span>WhatsApp Concierge</span>
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#0A0A0C]/14 flex items-center justify-between font-sans text-[13px] font-bold text-[#0A0A0C]">
                  <span>{copy.explore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </div>
          );

          if (card.isWhatsApp) {
            return (
              <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer" className="nlm-pressable h-full block">
                {inner}
              </a>
            );
          }
          return (
            <Link key={card.title} href={card.href} prefetch={false} className="nlm-pressable h-full block">
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

