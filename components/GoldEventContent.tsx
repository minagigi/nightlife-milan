'use client';

import { useState } from 'react';
import { ChevronDown, Ticket, Wine } from 'lucide-react';
import type { RichContentPayload } from '@/lib/richContentStore';
import type { LocalizedEventContent } from '@/lib/localizedEventContent';
import type { EventVisualGallery } from '@/lib/eventVisualGallery';
import { tr } from '@/lib/i18n/t';
import EventImageGallery from '@/components/EventImageGallery';
import { eventText } from '@/lib/eventPageLocale';

interface GoldEventContentProps {
  locale: string;
  data?: RichContentPayload;
  localized?: LocalizedEventContent;
  gallery?: EventVisualGallery | null;
}

/**
 * Standard long-form event body. Existing EN/IT Blob payloads and locally
 * prepared locale payloads are normalized into the same visual structure.
 */
export default function GoldEventContent({ locale, data, localized, gallery }: GoldEventContentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!data && !localized) return null;

  const sections = localized?.sections ?? data!.rewritten.sections.map((section) => ({
    icon: section.emoji,
    title: tr(locale, section.title, section.titleIt),
    body: tr(locale, section.body, section.bodyIt),
  }));
  const programme = localized?.programme ?? data!.rewritten.programme.map((slot) => ({
    start: slot.start,
    end: slot.end,
    title: tr(locale, slot.title, slot.titleIt),
  }));
  const offers = localized?.offers ?? data!.offers;
  const affiliateUrl = localized?.affiliateUrl ?? data!.affiliateUrl;
  const faqs = localized?.faqs ?? data!.rewritten.faqLong.map((faq) => ({
    question: tr(locale, faq.question, faq.questionIt),
    answer: tr(locale, faq.answer, faq.answerIt),
  }));

  const tables = offers.filter((offer) => offer.category === 'table');
  const tickets = offers.filter((offer) => offer.category === 'ticket');
  const guestlists = offers.filter((offer) => offer.category === 'guestlist');

  return (
    <div className="mt-4" data-event-content="standard">
      <div className="not-prose flex flex-col sm:flex-row gap-3 mb-10">
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          data-analytics-source="gold_buy_tickets"
          className="flex-1 flex items-center justify-center gap-2 bg-champagne text-black px-6 py-4 font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Ticket size={18} aria-hidden="true" />
          {eventText(locale, 'Buy Tickets', 'Compra Biglietti', 'Comprar ingressos')}
        </a>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          data-analytics-source="gold_book_table"
          className="flex-1 flex items-center justify-center gap-2 border border-champagne/60 text-champagne px-6 py-4 font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-champagne/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
        >
          <Wine size={18} aria-hidden="true" />
          {eventText(locale, 'Book a Table', 'Prenota Tavolo', 'Reservar mesa')}
        </a>
      </div>

      {sections.map((section, index) => (
        <section key={`${section.title}-${index}`} className="mb-8" data-event-section="description">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-3">
            {section.icon ? <span aria-hidden="true">{section.icon} </span> : null}
            {section.title}
          </h2>
          <p className="text-white/70 leading-relaxed">{section.body}</p>
        </section>
      ))}

      {programme.length > 0 && (
        <section className="mb-12" data-event-section="programme">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-4">
            <span aria-hidden="true">🗓️ </span>
            {eventText(locale, 'Evening Programme', 'Programma della Serata', 'Programa da noite')}
          </h2>
          <div className="space-y-2">
            {programme.map((slot, index) => (
              <div key={`${slot.start}-${index}`} className="flex gap-4 text-sm border-b border-white/8 py-2">
                <span className="text-champagne font-mono whitespace-nowrap">
                  {slot.start}{slot.end ? `–${slot.end}` : ''}
                </span>
                <span className="text-white/60">{slot.title}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {gallery ? <EventImageGallery gallery={gallery} locale={locale} /> : null}

      {(tickets.length > 0 || tables.length > 0 || guestlists.length > 0) && (
        <section className="mb-12 mt-12" data-event-section="offers">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-4">
            <span aria-hidden="true">🎟️ </span>
            {eventText(locale, 'Tickets & VIP Tables', 'Prezzi & Tavoli VIP', 'Ingressos e mesas VIP')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            {[...tickets, ...guestlists, ...tables].map((offer, index) => (
              <div key={`${offer.name}-${index}`} className="p-4 rounded-xl border border-white/8 bg-white/[0.02] flex justify-between items-center gap-4">
                <span className="text-white/70 text-sm">{offer.name}</span>
                <span className="text-champagne font-bold whitespace-nowrap">
                  {offer.price === 0 ? eventText(locale, 'Free', 'Gratis', 'Grátis') : `€${offer.price}`}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="py-8" data-event-section="faqs">
          <h2 className="text-2xl font-serif font-bold text-champagne mb-6">
            {eventText(locale, 'Frequently Asked Questions', 'Domande Frequenti', 'Perguntas frequentes')}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `gold-faq-answer-${index}`;
              return (
                <div key={`${faq.question}-${index}`} className="bg-white/[0.03] rounded-xl border border-white/10">
                  <button
                    type="button"
                    className="w-full text-left p-5 flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-champagne"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="text-white font-medium text-sm">{faq.question}</span>
                    <ChevronDown className={`text-champagne shrink-0 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} size={18} aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div id={answerId} className="px-5 pb-5 text-white/50 text-sm leading-relaxed">{faq.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
