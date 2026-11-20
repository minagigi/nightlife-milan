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
    <div className="w-full bg-[#0B0A09] text-[#F6F1E7] border-t border-[#F6F1E7]/14 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-[#F6F1E7] mb-3">
          {tr(lang, 'Join the Inner Circle', "Entra nell'Inner Circle")}
        </h2>
        <p className="mx-auto max-w-[58ch] text-[#DED8CC] text-base sm:text-lg mb-8">
          {labels?.description || tr(lang, 'Get the best tables and secret guestlists every Thursday.', 'Ricevi i migliori tavoli e le liste segrete ogni giovedì.')}
        </p>

        {status === 'success' ? (
          <div className="bg-[#141311] border border-[#25D366] p-6 inline-block">
            <p className="text-[#25D366] font-display text-2xl font-bold">
              {labels?.welcome || tr(lang, 'Welcome to the club.', 'Benvenuto nel club.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-[#141311] p-2.5 border border-[#EAE3D5]/28">
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
                className={`w-full min-h-[48px] bg-[#050505] border ${status === 'error' ? 'border-red-500/70' : 'border-[#F6F1E7]/20'} px-5 py-3.5 text-base text-[#F6F1E7] placeholder:text-[#A8A093] focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors`}
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
              className="nlm-pressable min-h-[48px] bg-[#25D366] text-[#050505] font-sans text-[13px] font-bold px-8 py-3.5 hover:bg-[#2EE472] transition-colors duration-200 disabled:opacity-70 whitespace-nowrap"
            >
              {status === 'loading' ? '...' : (labels?.subscribe || tr(lang, 'Subscribe', 'Iscriviti'))}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
