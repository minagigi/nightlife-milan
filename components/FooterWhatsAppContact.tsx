'use client';

import { usePathname } from 'next/navigation';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl, resolveFullPageUrl } from '@/lib/conciergeBooking';

export default function FooterWhatsAppContact({ lang }: { lang: string }) {
  const pathname = usePathname() || '/';
  const waUrl = getConciergeBookingUrl(lang, undefined, resolveFullPageUrl(pathname, lang));
  return (
    <div className="flex flex-col space-y-2.5 font-sans text-sm">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="nlm-pressable inline-flex w-fit items-center px-3.5 py-2.5 bg-[#25D366] text-[#050505] hover:bg-[#2EE472] font-bold transition-colors text-[13px]"
      >
        WhatsApp: <bdi dir="ltr" className="ml-1.5 tabular-nums">{SITE_CONTACT.whatsapp.number}</bdi>
      </a>
      <a
        href="tel:+393519127047"
        className="text-[13px] font-medium text-[#C9C7C2] hover:text-[#FFFFFF] transition-colors tabular-nums"
      >
        Tel: <bdi dir="ltr">+39 351 912 7047</bdi>
      </a>
      <a
        href="mailto:concierge@nightlifemilan.com"
        className="text-[13px] font-medium text-[#C9C7C2] hover:text-[#FFFFFF] transition-colors"
      >
        concierge@nightlifemilan.com
      </a>
    </div>
  );
}
