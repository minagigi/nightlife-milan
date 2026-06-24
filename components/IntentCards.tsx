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
    <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card) => {
            const inner = (
              <div
                className={`group relative flex flex-col gap-3 p-5 rounded-lg border transition-all duration-400 cursor-pointer min-h-[120px] active:scale-[0.98]
                  ${card.isGold
                    ? 'bg-champagne/10 border-champagne/30 hover:bg-champagne/15 hover:border-champagne/50 shadow-[0_0_32px_rgba(201,168,106,0.08)]'
                    : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-white/15'
                  }`}
              >
                {card.isGold && (
                  <div className="absolute top-0 inset-x-0 h-[1px] rounded-t-2xl bg-gradient-to-r from-transparent via-champagne/60 to-transparent" />
                )}
                <span className={`block transition-all duration-300 group-hover:scale-110 ${card.isGold ? 'text-champagne' : 'text-white/60 group-hover:text-champagne'}`}>{card.icon}</span>
                <div>
                  <p className={`font-serif text-base sm:text-lg font-semibold leading-tight mb-0.5
                    ${card.isGold ? 'text-champagne' : 'text-white group-hover:text-champagne transition-colors duration-300'}`}>
                    {card.title}
                  </p>
                  <p className="font-sans text-white/40 text-xs leading-relaxed">{card.subtitle}</p>
                </div>
                <div className={`mt-auto flex items-center gap-1 text-xs font-sans
                  ${card.isGold ? 'text-champagne/60' : 'text-white/25 group-hover:text-white/50 transition-colors duration-300'}`}>
                  {card.isWhatsApp
                    ? <><MessageCircle className="w-3 h-3" /> WhatsApp</>
                    : <><ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" /> {locale === 'it' ? 'Scopri' : 'Explore'}</>
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
