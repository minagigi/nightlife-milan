'use client';

import { useState } from 'react';
import { tr } from '@/lib/i18n/t';
import { CONTACT } from '@/config/contact';

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
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }

    const prefix = tr(
      lang,
      "Hi! I'd like to join the Inner Circle for Thursday VIP table and guest list updates.",
      "Ciao! Voglio entrare nell'Inner Circle per ricevere gli aggiornamenti del giovedì su tavoli VIP e liste."
    );
    const message = `${prefix} Email: ${email}`;

    window.open(
      `${CONTACT.whatsapp.link}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setStatus('success');
    setEmail('');
  };

  const placeholderText = labels?.emailPlaceholder || tr(lang, 'Your email address', 'La tua email');

  return (
    <div className="w-full bg-[#F6F1E7] text-[#050505] border-t border-[#050505]/16 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-[#5C5446] mb-3">
          NIGHTLIFE MILAN · CONCIERGE DISPATCH
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#050505] mb-4">
          {tr(lang, 'Join the Inner Circle', "Entra nell'Inner Circle")}
        </h2>
        <p className="text-[#3D3830] text-lg mb-8">
          {labels?.description || tr(lang, 'Get the best tables and secret guestlists every Thursday.', 'Ricevi i migliori tavoli e le liste segrete ogni giovedì.')}
        </p>

        {status === 'success' ? (
          <div className="bg-[#050505] border border-[#050505] p-6 inline-block">
            <p className="text-[#25D366] font-serif text-xl">
              {labels?.welcome || tr(lang, 'Welcome to the club.', 'Benvenuto nel club.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto bg-[#050505] p-2.5 border border-[#050505]">
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
                className={`w-full min-h-[48px] bg-[#0B0A09] border ${status === 'error' ? 'border-red-500/60' : 'border-[#F6F1E7]/25'} px-5 py-3.5 text-[#F6F1E7] placeholder:text-[#C2B9AA] focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-colors`}
                required
              />
              {status === 'error' && (
                <p className="mt-2 text-left text-red-400 text-xs">
                  {labels?.invalidEmail || tr(lang, 'Please enter a valid email address.', 'Inserisci un indirizzo email valido.')}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="min-h-[48px] bg-[#25D366] text-[#050505] font-mono text-xs font-bold uppercase tracking-[0.18em] px-8 py-3.5 hover:bg-[#2EE472] transition-colors duration-200 disabled:opacity-70 whitespace-nowrap"
            >
              {status === 'loading' ? '...' : (labels?.subscribe || tr(lang, 'Subscribe', 'Iscriviti'))}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
