'use client';

import { useState } from 'react';
import { CONTACT } from '@/config/contact';

interface NewsletterHubProps {
  lang: string;
}

export default function NewsletterHub({ lang }: NewsletterHubProps) {
  const isIt = lang === 'it';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }

    const message = isIt
      ? `Ciao! Voglio entrare nell'Inner Circle per ricevere i migliori tavoli ogni giovedì. Email: ${email}`
      : `Hi! I'd like to join the Inner Circle for the best tables every Thursday. Email: ${email}`;

    window.open(
      `${CONTACT.whatsapp.link}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );

    setStatus('success');
    setEmail('');
  };

  return (
    <div className="w-full bg-[#131009] border-t border-white/5 py-20 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-champagne mb-4">
          Join the Inner Circle
        </h2>
        <p className="text-white/40 text-lg mb-8">
          {isIt 
            ? 'Ricevi i migliori tavoli e le liste segrete ogni giovedì.' 
            : 'Get the best tables and secret guestlists every Thursday.'}
        </p>

        {status === 'success' ? (
          <div className="bg-white/[0.03] border border-champagne/30 rounded-xl p-6 inline-block">
            <p className="text-champagne font-serif text-xl">
              {isIt ? 'Benvenuto nel club.' : 'Welcome to the club.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={isIt ? 'La tua email' : 'Your email address'}
                className={`w-full bg-white/[0.03] border ${status === 'error' ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-colors`}
                required
              />
              {status === 'error' && (
                <p className="absolute -bottom-6 left-2 text-red-400 text-xs">
                  {isIt ? 'Inserisci un indirizzo email valido.' : 'Please enter a valid email address.'}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-champagne text-zinc-950 font-bold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 disabled:opacity-70 whitespace-nowrap"
            >
              {status === 'loading' ? '...' : (isIt ? 'Iscriviti' : 'Subscribe')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
