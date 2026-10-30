import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';

export default function FooterWhatsAppContact({ lang }: { lang: string }) {
  const waUrl = getConciergeBookingUrl(lang);
  return (
    <div className="flex flex-col space-y-2 font-mono text-xs">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#D6BE96] hover:text-[#F6F1E7] transition-colors uppercase tracking-[0.14em]"
      >
        WhatsApp Concierge: <bdi dir="ltr">{SITE_CONTACT.whatsapp.number}</bdi>
      </a>
      <a
        href="tel:+393519127047"
        className="text-[#C2B9AA] hover:text-[#D6BE96] transition-colors tracking-[0.12em]"
      >
        Tel: <bdi dir="ltr">+39 351 912 7047</bdi>
      </a>
      <a
        href="mailto:concierge@nightlifemilan.com"
        className="text-[#C2B9AA] hover:text-[#D6BE96] transition-colors tracking-[0.08em]"
      >
        concierge@nightlifemilan.com
      </a>
    </div>
  );
}
