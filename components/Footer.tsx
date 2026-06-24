import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';
import NewsletterHub from './NewsletterHub';
import Logo from './Logo';
import { CONTACT } from '@/config/contact';

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const isIt = lang === 'it';

  const t = {
    desc: isIt
      ? "La guida più esclusiva alla notte milanese. Curata, internazionale, autentica."
      : "The most exclusive guide to Milan's nightlife. Curated, international, authentic.",
    nav: isIt ? "Navigazione" : "Navigation",
    zones: isIt ? "Zone Hotspots" : "Zone Hotspots",
    legal: isIt ? "Legale & Social" : "Legal & Social",
    clubs: isIt ? "Locali" : "Clubs",
    calendar: isIt ? "Calendario" : "Calendar",
    guides: isIt ? "Guide" : "Guides",
    vip: isIt ? "Tavoli VIP" : "VIP Tables",
    concierge: isIt ? "Servizio Concierge" : "Concierge Service",
    privacy: "Privacy Policy",
    whatsappLabel: isIt ? CONTACT.whatsapp.labels.it : CONTACT.whatsapp.labels.en,
  };

  const lp = isIt ? '/it' : '';
  const links = {
    clubs: `${lp}/clubs`,
    calendar: `${lp}/calendar/tonight`,
    guides: `${lp}/guides`,
    vip: `${lp}/vip-tables`,
    concierge: `${lp}/concierge`,
    brera: `${lp}/zones/brera`,
    navigli: `${lp}/zones/navigli`,
    isola: `${lp}/zones/isola`,
    corsoComo: `${lp}/zones/corso-como`,
    portaVenezia: `${lp}/zones/porta-venezia`,
    privacy: `${lp}/privacy`,
  };

  return (
    <div className="mt-auto w-full">
      <NewsletterHub lang={lang} />
      <footer className="w-full bg-[#131009] py-16 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid transparent', borderImage: 'linear-gradient(90deg, transparent, rgba(201,168,106,0.25), transparent) 1' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Col 1: Brand Info */}
        <div className="flex flex-col space-y-4">
          <Link href={lp + '/'} className="inline-block group drop-shadow-[0_0_12px_rgba(201,168,106,0.4)] hover:drop-shadow-[0_0_20px_rgba(201,168,106,0.7)] transition-all duration-500" aria-label="Nightlife Milan Home">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            {t.desc}
          </p>
          <div className="pt-4">
            <a
              href={CONTACT.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-champagne transition-colors group"
            >
              <MessageCircle className="w-4 h-4 text-champagne group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-medium text-white">{CONTACT.whatsapp.number}</span>
                <span className="text-xs opacity-80">{t.whatsappLabel}</span>
              </div>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-semibold tracking-wider uppercase text-sm">{t.nav}</h3>
          <ul className="flex flex-col space-y-3">
            <li>
              <Link href={links.clubs} className="text-white/60 hover:text-champagne transition-colors text-sm">
                {t.clubs}
              </Link>
            </li>
            <li>
              <Link href={links.calendar} className="text-white/60 hover:text-champagne transition-colors text-sm">
                {t.calendar}
              </Link>
            </li>
            <li>
              <Link href={links.guides} className="text-white/60 hover:text-champagne transition-colors text-sm">
                {t.guides}
              </Link>
            </li>
            <li>
              <Link href={links.vip} className="text-champagne/80 hover:text-champagne transition-colors text-sm font-medium">
                {t.vip}
              </Link>
            </li>
            <li>
              <Link href={links.concierge} className="text-white/60 hover:text-champagne transition-colors text-sm">
                {t.concierge}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Zone Hotspots */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-semibold tracking-wider uppercase text-sm">{t.zones}</h3>
          <ul className="flex flex-col space-y-3">
            <li>
              <Link href={links.brera} className="text-white/60 hover:text-champagne transition-colors text-sm">
                Brera
              </Link>
            </li>
            <li>
              <Link href={links.navigli} className="text-white/60 hover:text-champagne transition-colors text-sm">
                Navigli
              </Link>
            </li>
            <li>
              <Link href={links.isola} className="text-white/60 hover:text-champagne transition-colors text-sm">
                Isola
              </Link>
            </li>
            <li>
              <Link href={links.corsoComo} className="text-white/60 hover:text-champagne transition-colors text-sm">
                Corso Como
              </Link>
            </li>
            <li>
              <Link href={links.portaVenezia} className="text-white/60 hover:text-champagne transition-colors text-sm">
                Porta Venezia
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal & Social */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-white font-semibold tracking-wider uppercase text-sm">{t.legal}</h3>
          <ul className="flex flex-col space-y-3 mb-4">
            <li>
              <Link href={links.privacy} className="text-white/60 hover:text-champagne transition-colors text-sm">
                {t.privacy}
              </Link>
            </li>
          </ul>

          <div className="flex gap-1 pt-2 -ml-2.5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-lg text-white/60 hover:text-champagne active:bg-white/5 transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-lg text-white/60 hover:text-champagne active:bg-white/5 transition-colors" aria-label="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} Nightlife Milan. All rights reserved.
        </p>
        <div className="flex space-x-4 text-xs text-white/50">
          <Link href="/" className="hover:text-champagne transition-colors" aria-label="English">EN</Link>
          <Link href="/it" className="hover:text-champagne transition-colors" aria-label="Italiano">IT</Link>
        </div>
      </div>
    </footer>
    </div>
  );
}
