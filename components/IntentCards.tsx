'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Wine, Music2, Gem } from 'lucide-react';
import { CONTACT } from '@/config/contact';

interface IntentCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  isWhatsApp?: boolean;
  isGold?: boolean;
}

export default function IntentCards({ locale }: { locale: 'en' | 'it' }) {
  const lp = locale === 'it' ? '/it' : '';
  const waMsg = encodeURIComponent(
    locale === 'it'
      ? "Ciao! Vorrei prenotare un tavolo VIP a Milano. Puoi aiutarmi?"
      : "Hi! I'd like to book a VIP table in Milan tonight. Can you help me?"
  );
  const waLink = `${CONTACT.whatsapp.link}?text=${waMsg}`;

  const cards: IntentCard[] = locale === 'it'
    ? [
        { icon: <Gem className="w-5 h-5" />, title: 'Tavolo VIP', subtitle: 'Bottle service nei migliori club', href: `${lp}/vip-tables`, isGold: true },
        { icon: <Music2 className="w-5 h-5" />, title: 'Ballare Stasera', subtitle: 'Migliori club e DJ set', href: `${lp}/clubs` },
        { icon: <Wine className="w-5 h-5" />, title: 'Aperitivo', subtitle: 'Orari, posti e cosa ordinare', href: `${lp}/aperitivo` },
        { icon: <MessageCircle className="w-5 h-5" />, title: 'Concierge', subtitle: 'Risposta in 10 minuti', href: waLink, isWhatsApp: true },
      ]
    : [
        { icon: <Gem className="w-5 h-5" />, title: 'Book VIP Table', subtitle: 'Bottle service at top clubs', href: `${lp}/vip-tables`, isGold: true },
        { icon: <Music2 className="w-5 h-5" />, title: 'Go Dancing', subtitle: 'Best clubs & DJ sets tonight', href: `${lp}/clubs` },
        { icon: <Wine className="w-5 h-5" />, title: 'Aperitivo', subtitle: 'Where to go & what to order', href: `${lp}/aperitivo` },
        { icon: <MessageCircle className="w-5 h-5" />, title: 'Ask Concierge', subtitle: 'Reply in under 10 minutes', href: waLink, isWhatsApp: true },
      ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
          {cards.map((card, i) => {
            const inner = (
              <div
                className={`group relative flex flex-col gap-4 p-6 sm:p-8 transition-all duration-300 cursor-pointer min-h-[160px] sm:min-h-[180px] active:scale-[0.99]
                  ${card.isGold
                    ? 'bg-[#1a1508] hover:bg-[#211b09] hover:shadow-[inset_0_0_0_1px_rgba(201,168,106,0.35)]'
                    : 'bg-[#131009] hover:bg-[#1C1810]'
                  }`}
              >
                {/* Gold top accent for VIP */}
                {card.isGold && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
                )}

                {/* Giant serif number — decorative background */}
                <span
                  className="absolute bottom-2 right-4 font-serif font-medium leading-none select-none pointer-events-none text-champagne/[0.06] group-hover:text-champagne/[0.12] transition-colors duration-500"
                  style={{ fontSize: 'clamp(4rem, 6vw, 5.5rem)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <span className={`block w-5 h-5 transition-all duration-300 group-hover:-translate-y-0.5 ${card.isGold ? 'text-champagne' : 'text-white/35 group-hover:text-champagne/70'}`}>
                  {card.icon}
                </span>

                {/* Title + subtitle */}
                <div className="flex-1">
                  <p className={`font-serif text-xl sm:text-2xl font-medium leading-tight mb-1.5
                    ${card.isGold ? 'text-champagne' : 'text-white group-hover:text-champagne/90 transition-colors duration-300'}`}>
                    {card.title}
                  </p>
                  <p className="font-sans text-white/35 text-xs leading-relaxed tracking-wide">{card.subtitle}</p>
                </div>

                {/* CTA */}
                <div className={`flex items-center gap-1.5 text-[10px] font-sans tracking-widest uppercase transition-colors duration-300
                  ${card.isGold ? 'text-champagne/55' : 'text-white/20 group-hover:text-white/50'}`}>
                  {card.isWhatsApp
                    ? <><MessageCircle className="w-3 h-3" />WhatsApp</>
                    : <><ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />{locale === 'it' ? 'Scopri' : 'Explore'}</>
                  }
                </div>
              </div>
            );

            if (card.isWhatsApp) {
              return (
                <a key={card.title} href={card.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              );
            }
            return (
              <Link key={card.title} href={card.href}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
