import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ArrowRight, MessageCircle, Wine, Music2, Gem } from 'lucide-react';
import { getIntentCardsCopy } from '@/lib/i18n/intentCardsCopy';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';

interface IntentCard {
  icon: ReactNode;
  title: string;
  subtitle: string;
  href: string;
  imageSrc: string;
  isWhatsApp?: boolean;
  isGold?: boolean;
}

export default function IntentCards({ locale }: { locale: string }) {
  const lp = locale === 'en' ? '' : `/${locale}`;
  const copy = getIntentCardsCopy(locale);
  const waLink = getConciergeBookingUrl(locale, undefined, lp || '/');

  const cards: IntentCard[] = [
    {
      icon: <Gem className="w-5 h-5" />,
      title: copy.vipTitle,
      subtitle: copy.vipSubtitle,
      href: `${lp}/vip-tables`,
      imageSrc: '/images/events/cards-4x5/pillars/vip-tables-bottle-card.webp',
      isGold: true,
    },
    {
      icon: <Music2 className="w-5 h-5" />,
      title: copy.danceTitle,
      subtitle: copy.danceSubtitle,
      href: `${lp}/clubs`,
      imageSrc: '/images/events/cards-4x5/partner-clubs/just-me-milano.webp',
    },
    {
      icon: <Wine className="w-5 h-5" />,
      title: copy.aperitivoTitle,
      subtitle: copy.aperitivoSubtitle,
      href: `${lp}/aperitivo`,
      imageSrc: '/images/events/cards-4x5/partner-clubs/voya-rooftop-milan.webp',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: copy.conciergeTitle,
      subtitle: copy.conciergeSubtitle,
      href: waLink,
      imageSrc: '/images/events/cards-4x5/pillars/concierge-7x7-card.webp',
      isWhatsApp: true,
    },
  ];

  return (
    <section className="w-full bg-[#050505] text-[#F6F1E7] border-b border-[#F6F1E7]/14" data-cialdini="reciprocity liking">
      <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#F6F1E7]/14">
        {cards.map((card, i) => {
          const inner = (
            <div
              className={`group relative flex h-full flex-col justify-between transition-colors duration-200 cursor-pointer
                ${card.isGold
                  ? 'bg-[#0B0A09] hover:bg-[#141311]'
                  : 'bg-[#050505] hover:bg-[#0B0A09]'
                }`}
            >
              {card.isGold && (
                <div className="absolute top-0 inset-x-0 z-10 h-[2px] bg-[#25D366]" />
              )}

              <div>
                <div data-no-lightbox="true" className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] border-b border-[#F6F1E7]/14">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    width={1080}
                    height={1350}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
                    quality={92}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="bg-[#050505]/90 border border-[#F6F1E7]/25 px-2.5 py-1 font-display italic text-sm font-bold tabular-nums text-[#EAE3D5]">
                      0{i + 1}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center bg-[#050505]/90 border border-[#F6F1E7]/20 text-[#EAE3D5]">
                      {card.icon}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="font-display text-2xl sm:text-[26px] font-bold leading-tight mb-2 text-[#F6F1E7]">
                    {card.title}
                  </p>
                  <p className="max-w-[52ch] font-sans text-[#DED8CC] text-sm sm:text-base leading-relaxed">{card.subtitle}</p>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                {card.isWhatsApp ? (
                  <div className="flex min-h-[44px] items-center justify-between bg-[#25D366] hover:bg-[#2EE472] px-4 py-2.5 font-sans text-[13px] font-bold text-[#050505] transition-colors">
                    <span>WhatsApp Concierge</span>
                    <MessageCircle className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="pt-4 border-t border-[#F6F1E7]/14 flex items-center justify-between font-sans text-[13px] font-bold text-[#EAE3D5] group-hover:text-[#F6F1E7]">
                    <span>{copy.explore}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
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
