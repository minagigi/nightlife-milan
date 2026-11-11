import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';

export default function FooterWhatsAppContact({ lang }: { lang: string }) {
  const waUrl = getConciergeBookingUrl(lang);
  return (
    <div className="flex flex-col space-y-2.5 font-mono text-xs">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center px-3.5 py-2 bg-[#25D366] text-[#050505] hover:bg-[#2EE472] font-semibold transition-colors uppercase tracking-[0.12em]"
      >
        WhatsApp: <bdi dir="ltr" className="ml-1.5">{SITE_CONTACT.whatsapp.number}</bdi>
      </a>
      <a
        href="tel:+393519127047"
        className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors tracking-[0.12em]"
      >
        Tel: <bdi dir="ltr">+39 351 912 7047</bdi>
      </a>
      <a
        href="mailto:concierge@nightlifemilan.com"
        className="text-[#C2B9AA] hover:text-[#F6F1E7] transition-colors tracking-[0.08em]"
      >
        concierge@nightlifemilan.com
      </a>
    </div>
  );
}
