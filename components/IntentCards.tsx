'use client';
import React from 'react';
import { tr } from '@/lib/i18n/t';
import Link from 'next/link';
import {
  ArrowRight,
  MessageCircle,
  Wine,
  Gem,
  Trophy,
  PartyPopper,
  QrCode,
  Crown,
  Sparkles,
  GraduationCap,
  Globe2,
  Users,
} from 'lucide-react';
import { CONTACT } from '@/config/contact';

interface IntentCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  isWhatsApp?: boolean;
  isGold?: boolean;
}

export default function IntentCards({ locale }: { locale: string }) {
  const lp = locale === 'en' ? '' : `/${locale}`;
  const isIt = locale === 'it';
  const waMsg = encodeURIComponent(
    isIt
      ? 'Ciao! Vorrei prenotare un tavolo VIP o lista nei 6 Club Prioritari a Milano. Puoi aiutarmi?'
      : "Hi! I'd like to book a VIP table or guest list at the Top 6 Priority Clubs in Milan tonight. Can you help me?"
  );
  const waLink = `${CONTACT.whatsapp.link}?text=${waMsg}`;

  const cards: IntentCard[] = isIt
    ? [
        {
          icon: <Gem className="w-5 h-5" />,
          title: 'Tavoli VIP & Privé',
          subtitle: 'Just Me, Pineta, Aria, 55 Milano, Voya & Repvblic',
          href: `${lp}/vip-tables`,
          isGold: true,
        },
        {
          icon: <Trophy className="w-5 h-5" />,
          title: 'Dopo-Partita San Siro',
          subtitle: 'Inter & Milan · Aria Club a 150m dallo Stadio',
          href: `${lp}/football-afterparties`,
          isGold: true,
        },
        {
          icon: <Wine className="w-5 h-5" />,
          title: 'Rooftop & 20° Piano',
          subtitle: 'Voya Rooftop 20° Piano, Terrazza Duomo 21, Ceresio 7',
          href: `${lp}/rooftops`,
        },
        {
          icon: <PartyPopper className="w-5 h-5" />,
          title: 'Lauree & Compleanni',
          subtitle: 'Pacchetti festa 18 anni, laurea e nubilato da 55 Milano & Pineta',
          href: `${lp}/private-parties`,
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          title: 'Aperitivo Cantato & Reale',
          subtitle: 'Royal Aperitivo Torre Branca, Pineta & 55 Milano XL',
          href: `${lp}/aperitivo`,
        },
        {
          icon: <QrCode className="w-5 h-5" />,
          title: 'Liste & QR Salta-Fila',
          subtitle: 'Accredito nominale ufficiale e regole dress code',
          href: `${lp}/guest-lists`,
        },
        {
          icon: <Crown className="w-5 h-5" />,
          title: 'Listino Bottiglie 2026/27',
          subtitle: 'Prezzi ufficiali Dom Pérignon, Belvedere, Don Julio 1942',
          href: `${lp}/bottle-prices`,
        },
        {
          icon: <MessageCircle className="w-5 h-5" />,
          title: 'Concierge 24/7',
          subtitle: 'Risposta in 10 min su WhatsApp +39 351 912 7047',
          href: waLink,
          isWhatsApp: true,
          isGold: true,
        },
      ]
    : [
        {
          icon: <Gem className="w-5 h-5" />,
          title: 'Book VIP Table',
          subtitle: 'Just Me, Pineta, Aria, 55 Milano, Voya & Repvblic',
          href: `${lp}/vip-tables`,
          isGold: true,
        },
        {
          icon: <Trophy className="w-5 h-5" />,
          title: 'San Siro Afterparties',
          subtitle: 'Inter & AC Milan · Aria Club 150m from Stadium',
          href: `${lp}/football-afterparties`,
          isGold: true,
        },
        {
          icon: <Wine className="w-5 h-5" />,
          title: 'Skyline Rooftops',
          subtitle: 'Voya Rooftop 20th Floor, Terrazza Duomo 21, Ceresio 7',
          href: `${lp}/rooftops`,
        },
        {
          icon: <PartyPopper className="w-5 h-5" />,
          title: 'Graduation & Birthdays',
          subtitle: 'Custom VIP packages at 55 Milano, Pineta, Aria & Voya',
          href: `${lp}/private-parties`,
        },
        {
          icon: <Sparkles className="w-5 h-5" />,
          title: 'Royal & Singing Aperitivo',
          subtitle: 'Torre Branca Royal Buffet, Pineta & 55 Milano XXL',
          href: `${lp}/aperitivo`,
        },
        {
          icon: <QrCode className="w-5 h-5" />,
          title: 'Guest Lists & QR Pass',
          subtitle: 'Official nominal accreditation & door selection rules',
          href: `${lp}/guest-lists`,
        },
        {
          icon: <Crown className="w-5 h-5" />,
          title: 'Bottle Price List 2026/27',
          subtitle: 'Official Dom Pérignon, Belvedere & Don Julio 1942 menu',
          href: `${lp}/bottle-prices`,
        },
        {
          icon: <MessageCircle className="w-5 h-5" />,
          title: '24/7 VIP Concierge',
          subtitle: 'Reply in under 10 min · WhatsApp +39 351 912 7047',
          href: waLink,
          isWhatsApp: true,
          isGold: true,
        },
      ];

  const audienceHubs = [
    {
      href: `${lp}/events/18-plus`,
      icon: <Users className="w-3.5 h-3.5 text-champagne" />,
      label: isIt ? 'Eventi 18+ (Diciottesimi & Young)' : '18+ Events (Young Crowd)',
    },
    {
      href: `${lp}/events/21-plus`,
      icon: <Sparkles className="w-3.5 h-3.5 text-champagne" />,
      label: isIt ? '21+ Fashion & Luxury Crowd' : '21+ Fashion & Luxury Crowd',
    },
    {
      href: `${lp}/events/university-erasmus`,
      icon: <GraduationCap className="w-3.5 h-3.5 text-champagne" />,
      label: isIt ? 'University & Erasmus Nights' : 'University & Erasmus Nights',
    },
    {
      href: `${lp}/events/international`,
      icon: <Globe2 className="w-3.5 h-3.5 text-champagne" />,
      label: isIt ? 'International & Jet-Set VIP' : 'International & Jet-Set VIP',
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
          {cards.map((card, i) => {
            const inner = (
              <div
                className={`group relative flex flex-col gap-3.5 p-5 sm:p-7 transition-all duration-300 cursor-pointer min-h-[155px] sm:min-h-[175px] active:scale-[0.99]
                  ${
                    card.isGold
                      ? 'bg-[#1a1508] hover:bg-[#211b09] hover:shadow-[inset_0_0_0_1px_rgba(201,168,106,0.35)]'
                      : 'bg-[#131009] hover:bg-[#1C1810]'
                  }`}
              >
                {card.isGold && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
                )}

                <span
                  className="deco-number absolute inset-0"
                  data-n={String(i + 1).padStart(2, '0')}
                  aria-hidden="true"
                />

                <span
                  className={`block w-5 h-5 transition-all duration-300 group-hover:-translate-y-0.5 ${
                    card.isGold ? 'text-champagne' : 'text-white/35 group-hover:text-champagne/70'
                  }`}
                >
                  {card.icon}
                </span>

                <div className="flex-1">
                  <p
                    className={`font-serif text-lg sm:text-xl font-medium leading-tight mb-1.5
                    ${
                      card.isGold
                        ? 'text-champagne'
                        : 'text-white group-hover:text-champagne/90 transition-colors duration-300'
                    }`}
                  >
                    {card.title}
                  </p>
                  <p className="font-sans text-white/60 text-xs leading-relaxed tracking-wide">{card.subtitle}</p>
                </div>

                <div
                  className={`flex items-center gap-1.5 text-[10px] font-sans tracking-widest uppercase transition-colors duration-300
                  ${card.isGold ? 'text-champagne/65' : 'text-white/50 group-hover:text-white/75'}`}
                >
                  {card.isWhatsApp ? (
                    <>
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                      {tr(locale, 'Explore', 'Scopri')}
                    </>
                  )}
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

        {/* Audience & Age Filter Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {audienceHubs.map((hub) => (
            <Link
              key={hub.href}
              href={hub.href}
              className="group flex items-center justify-between gap-2 px-4 py-3 min-h-[46px] rounded-xl border border-white/10 bg-[#131009]/90 hover:bg-[#1C1810] hover:border-champagne/40 transition-all"
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium text-white/85 group-hover:text-champagne transition-colors">
                {hub.icon}
                {hub.label}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-champagne group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
