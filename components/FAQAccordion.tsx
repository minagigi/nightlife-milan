'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ lang }: { lang: string }) {
  const faqs = [
    { q: 'Where is Just Me Milano located?', a: 'Just Me Milano is located at Via Luigi Camoens 2, Parco Sempione, Milan.' },
    { q: 'What is the age requirement?', a: 'The minimum age requirement is 21+.' },
    { q: 'What is the dress code?', a: 'The dress code is "Strictly Elegant". Long trousers for men are mandatory. No technical sneakers, hats, or tracksuits.' },
    { q: 'Is parking available?', a: 'Parking is available in the surrounding area of Parco Sempione.' },
    { q: 'What is the refund policy?', a: 'Tickets are non-refundable.' },
    { q: 'Can I book a table?', a: 'Yes, you can book a table via WhatsApp at +39 351 912 7047.' },
    { q: 'What time does the club open?', a: 'The aperitif starts at 19:30, and the club party starts at 22:30.' },
    { q: 'What time does the club close?', a: 'The club closes at 05:00.' },
    { q: 'Is there a cut-off time for lists?', a: 'Yes, the cut-off time for lists is 01:00.' },
    { q: 'Do I need to book in advance?', a: 'Yes, booking in advance is highly recommended.' },
    { q: 'Is the club international?', a: 'Yes, the club attracts an international crowd.' },
    { q: 'What kind of music is played?', a: 'The music varies, but it is generally a mix of house, commercial, and top hits.' },
    { q: 'Can I bring my own drinks?', a: 'No, bringing your own drinks is not allowed.' },
    { q: 'Is there a cloakroom?', a: 'Yes, there is a cloakroom available.' },
    { q: 'Are there VIP tables available?', a: 'Yes, VIP tables are available for booking.' },
    { q: 'Is there an entry fee?', a: 'Yes, there is an entry fee. Please check the pricing section.' },
    { q: 'Can I pay by card?', a: 'Yes, card payments are accepted.' },
    { q: 'Is the club accessible?', a: 'Yes, the club is accessible.' },
    { q: 'Are there special events on Mondays?', a: 'Yes, the Monday Night party is a special event.' },
    { q: 'How can I contact you?', a: 'You can contact us via WhatsApp at +39 351 912 7047.' },
    { q: 'Is the club open every day?', a: 'Please check our website for opening days.' },
    { q: 'Can I celebrate my birthday?', a: 'Yes, you can celebrate your birthday. Please contact us for details.' },
    { q: 'Is there a dress code for women?', a: 'Yes, elegant attire is required.' },
    { q: 'Are there any restrictions?', a: 'Yes, please follow our dress code and age requirements.' },
    { q: 'What if I have more questions?', a: 'Please contact us via WhatsApp at +39 351 912 7047.' },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-16">
      <h2 className="text-3xl font-serif font-bold text-champagne mb-12 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/[0.03] rounded-xl border border-white/10">
            <button
              className="w-full text-left p-6 flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-lg font-semibold text-white">{faq.q}</span>
              <ChevronDown className={`text-champagne transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === index && (
              <div className="p-6 pt-0 text-white/40">
                {faq.a} Contact us via WhatsApp at +39 351 912 7047 or book tickets at <a href="https://xceed.me/en/milano/event/monday-night-255/213618/channel/nightlifemilan-1" className="text-champagne underline">Xceed</a>.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
