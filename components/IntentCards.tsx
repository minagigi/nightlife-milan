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
    <section className="w-full bg-[#050505] text-[#F6F1E7] border-b border-[#F6F1E7]/14" data-cialdini="reciprocity liking">
      <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#F6F1E7]/14">
        {cards.map((card, i) => {
          const inner = (
            <div
              className={`group relative flex h-full flex-col justify-between gap-6 p-7 sm:p-10 transition-colors duration-200 cursor-pointer min-h-[210px]
                ${card.isGold
                  ? 'bg-[#0B0A09] hover:bg-[#141311]'
                  : 'bg-[#050505] hover:bg-[#0B0A09]'
                }`}
            >
              {card.isGold && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-[#25D366]" />
              )}

              <div className="flex items-baseline justify-between">
                <span className="font-display italic text-xl sm:text-4xl font-bold tabular-nums text-[#EAE3D5] leading-none">
                  0{i + 1}
                </span>
                <span className="block w-5 h-5 text-[#C2B9AA] group-hover:text-[#F6F1E7] transition-colors duration-200">
                  {card.icon}
                </span>
              </div>

              <div className="flex-1">
                <p className="font-display text-2xl sm:text-[28px] font-bold leading-tight mb-2 text-[#F6F1E7]">
                  {card.title}
                </p>
                <p className="max-w-[52ch] font-sans text-[#DED8CC] text-base leading-relaxed">{card.subtitle}</p>
              </div>

              {card.isWhatsApp ? (
                <div className="mt-1">
                  <div className="flex min-h-[44px] items-center justify-between bg-[#25D366] hover:bg-[#2EE472] px-4 py-2.5 font-sans text-[13px] font-bold text-[#050505] transition-colors">
                    <span>WhatsApp Concierge</span>
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#F6F1E7]/14 flex items-center justify-between font-sans text-[13px] font-bold text-[#EAE3D5] group-hover:text-[#F6F1E7]">
                  <span>{copy.explore}</span>
                  <ArrowRight className="w-4 h-4" />
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

