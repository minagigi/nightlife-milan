'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { RichContentPayload } from '@/lib/richContentStore';

/**
 * Contenuto gold-standard della pagina evento — FASE X2 (piano Xceed). Renderizza
 * sezioni/programma/FAQ/offerte reali lette dal blob (lib/richContentStore.ts),
 * assente per gli eventi che non passano dalla pipeline Xceed (rendering base
 * invariato in quel caso — vedi app/[locale]/events/[slug]/page.tsx).
 */
export default function GoldEventContent({ data, locale }: { data: RichContentPayload; locale: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isIt = locale === 'it';
  const { rewritten, offers, affiliateUrl } = data;

  const tables = offers.filter((o) => o.category === 'table');
  const tickets = offers.filter((o) => o.category === 'ticket');
  const guestlists = offers.filter((o) => o.category === 'guestlist');

  return (
    <div className="mt-4">
      {/* Pulsanti d'acquisto — richiesta esplicita utente: comprare in un click ovunque appaia l'evento */}
      <div className="not-prose flex flex-col sm:flex-row gap-3 mb-10">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 flex items-center justify-center gap-2 bg-champagne text-black px-6 py-4 font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300"
        >
          🎟️ {isIt ? 'Compra Biglietti' : 'Buy Tickets'}
        </a>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex-1 flex items-center justify-center gap-2 border border-champagne/60 text-champagne px-6 py-4 font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-champagne/10 transition-colors duration-300"
        >
          🍾 {isIt ? 'Prenota Tavolo' : 'Book a Table'}
        </a>
      </div>

      {/* Sezioni gold — bilingui, sceglie il campo in base a locale */}
      {rewritten.sections?.map((s, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-3">
            {s.emoji} {isIt ? s.titleIt : s.title}
          </h2>
          <p className="text-white/70 leading-relaxed">{isIt ? s.bodyIt : s.body}</p>
        </div>
      ))}

      {/* Programma */}
      {rewritten.programme?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-4">
            🗓️ {isIt ? 'Programma della Serata' : 'Evening Programme'}
          </h2>
          <div className="space-y-2">
            {rewritten.programme.map((slot, i) => (
              <div key={i} className="flex gap-4 text-sm border-b border-white/8 py-2">
                <span className="text-champagne font-mono whitespace-nowrap">
                  {slot.start}{slot.end ? `–${slot.end}` : ''}
                </span>
                <span className="text-white/60">{isIt ? slot.titleIt : slot.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Listino reale (tickets/tavoli/guestlist ufficiali Xceed) */}
      {(tickets.length > 0 || tables.length > 0 || guestlists.length > 0) && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-4">
            🎟️ {isIt ? 'Prezzi & Tavoli VIP' : 'Tickets & VIP Tables'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            {[...tickets, ...guestlists, ...tables].map((o, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/8 bg-white/[0.02] flex justify-between items-center">
                <span className="text-white/70 text-sm">{o.name}</span>
                <span className="text-champagne font-bold">{o.price === 0 ? (isIt ? 'Gratis' : 'Free') : `€${o.price}`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {rewritten.faqLong?.length > 0 && (
        <div className="py-8">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-6">
            {isIt ? 'Domande Frequenti' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-3">
            {rewritten.faqLong.map((faq, index) => (
              <div key={index} className="bg-white/[0.03] rounded-xl border border-white/10">
                <button
                  className="w-full text-left p-5 flex justify-between items-center gap-4"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-white font-medium text-sm">{isIt ? faq.questionIt : faq.question}</span>
                  <ChevronDown className={`text-champagne shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} size={18} />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{isIt ? faq.answerIt : faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
