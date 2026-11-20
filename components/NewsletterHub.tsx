'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { getConciergeBookingUrl, resolveFullPageUrl } from '@/lib/conciergeBooking';

interface NewsletterHubProps {
  lang: string;
  labels?: {
    description: string;
    welcome: string;
    emailPlaceholder: string;
    invalidEmail: string;
    subscribe: string;
  };
}

export default function NewsletterHub({ lang, labels }: NewsletterHubProps) {
  const pathname = usePathname() || '/';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }

    const pageUrl =
      typeof window !== 'undefined' ? window.location.href : resolveFullPageUrl(pathname, lang);
    const waUrl = getConciergeBookingUrl(lang, `Inner Circle Dispatch · Email: ${email}`, pageUrl);

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setStatus('success');
    setEmail('');
  };

  const placeholderText = labels?.emailPlaceholder || tr(lang, 'Your email address', 'La tua email');

  return (
    <div className="w-full bg-[#EDEBE6] text-[#0A0A0C] border-t border-[#0A0A0C]/16 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase text-[#0A0A0C] mb-3">
          {tr(lang, 'Join the Inner Circle', "Entra nell'Inner Circle")}
        </h2>
        <p className="mx-auto max-w-[58ch] text-[#4F4D48] text-base sm:text-lg mb-8">
          {labels?.description || tr(lang, 'Get the best tables and secret guestlists every Thursday.', 'Ricevi i migliori tavoli e le liste segrete ogni giovedì.')}
        </p>

        {status === 'success' ? (
          <div className="bg-[#0A0A0C] border border-[#0A0A0C] p-6 inline-block">
            <p className="text-[#25D366] font-display text-2xl font-bold uppercase">
              {labels?.welcome || tr(lang, 'Welcome to the club.', 'Benvenuto nel club.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-[#0A0A0C] p-2.5 border border-[#0A0A0C]">
            <div className="flex-1 relative">
              <label htmlFor="newsletter-email-input" className="sr-only">
                {placeholderText}
              </label>
              <input
                id="newsletter-email-input"
                type="email"
                aria-label={placeholderText}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={placeholderText}
                className={`w-full min-h-[48px] bg-[#18181C] border ${status === 'error' ? 'border-red-500/60' : 'border-white/25'} px-5 py-3.5 text-base text-[#FFFFFF] placeholder:text-[#C9C7C2] focus:outline-none focus:border-[#D9381E] focus:ring-1 focus:ring-[#D9381E] transition-colors`}
                required
              />
              {status === 'error' && (
                <p className="mt-2 text-left text-red-400 text-[13px]">
                  {labels?.invalidEmail || tr(lang, 'Please enter a valid email address.', 'Inserisci un indirizzo email valido.')}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="nlm-pressable min-h-[48px] bg-[#D9381E] text-[#FFFFFF] font-sans text-[13px] font-bold px-8 py-3.5 hover:bg-[#B82B14] transition-colors duration-200 disabled:opacity-70 whitespace-nowrap"
            >
              {status === 'loading' ? '...' : (labels?.subscribe || tr(lang, 'Subscribe', 'Iscriviti'))}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
