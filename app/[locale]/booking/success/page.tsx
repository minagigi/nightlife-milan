import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Share2, MapPin, Clock, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Booking Confirmed | Nightlife Milan',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function BookingSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const isIt = locale === 'it';
  
  const eventName = (resolvedSearchParams.event as string) || (isIt ? 'Evento Esclusivo' : 'Exclusive Event');
  const venueName = (resolvedSearchParams.venue as string) || 'Nightlife Milan';
  const dateStr = (resolvedSearchParams.date as string) || new Date().toISOString().split('T')[0];
  
  // Format Date
  const dateObj = new Date(dateStr);
  const formattedDate = new Intl.DateTimeFormat(isIt ? 'it-IT' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);

  // Calendar Links
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${dateStr.replace(/-/g, '')}T220000Z/${dateStr.replace(/-/g, '')}T235900Z&details=${encodeURIComponent('Booking confirmed via Nightlife Milan.')}&location=${encodeURIComponent(venueName)}`;
  
  // WhatsApp Share Link
  const shareText = isIt 
    ? `Ho appena prenotato per ${eventName} al ${venueName} il ${formattedDate}! Ci vediamo lì? 🥂`
    : `I just booked for ${eventName} at ${venueName} on ${formattedDate}! See you there? 🥂`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <>
      {/* Conversion Tracking Script (Mock) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Google Analytics / Facebook Pixel Conversion Event
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'booking_success',
              'event_name': '${eventName.replace(/'/g, "\\'")}',
              'venue_name': '${venueName.replace(/'/g, "\\'")}',
              'booking_date': '${dateStr}'
            });
          `,
        }}
      />

      <main className="flex-1 bg-[#131009] min-h-screen flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="max-w-md w-full space-y-8">
          
          {/* Digital Ticket Card */}
          <div className="relative bg-charcoal rounded-lg overflow-hidden shadow-2xl border border-champagne/20">
            {/* Top decorative edge */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-champagne/40 via-champagne to-champagne/40" />
            
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-champagne/10 rounded-full flex items-center justify-center mb-6 border border-champagne/30">
                <svg className="w-8 h-8 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl font-serif font-bold text-champagne mb-2">
                {isIt ? 'Confermato' : 'Confirmed'}
              </h1>
              <p className="text-white/70 font-light mb-8">
                {isIt ? 'Il tuo nome è in lista. Ci vediamo al party.' : 'Your name is on the list. See you at the party.'}
              </p>

              {/* Ticket Details with dashed border */}
              <div className="relative border-t-2 border-dashed border-champagne/30 pt-8 mt-4">
                {/* Cutouts for ticket effect */}
                <div className="absolute -top-3 -left-11 w-6 h-6 bg-[#131009] rounded-full" />
                <div className="absolute -top-3 -right-11 w-6 h-6 bg-[#131009] rounded-full" />
                
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {eventName}
                </h2>
                
                <div className="space-y-3 text-left bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3 text-white/70">
                    <MapPin className="w-5 h-5 text-champagne shrink-0" />
                    <span className="font-medium">{venueName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Clock className="w-5 h-5 text-champagne shrink-0" />
                    <span className="capitalize">{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-charcoal border border-champagne/30 text-champagne px-4 py-3 rounded-xl hover:bg-champagne/10 transition-colors font-medium"
            >
              <Calendar className="w-4 h-4" />
              {isIt ? 'Aggiungi al Calendario' : 'Add to Calendar'}
            </a>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-4 py-3 rounded-xl hover:bg-[#25D366]/20 transition-colors font-medium"
            >
              <Share2 className="w-4 h-4" />
              {isIt ? 'Invia agli amici' : 'Share with friends'}
            </a>
          </div>

          {/* Door Policy / Instructions */}
          <div className="bg-charcoal/50 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-serif font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
              {isIt ? 'Come entrare' : 'How to get in'}
            </h3>
            <ul className="space-y-2 text-sm text-white/50 font-light">
              <li className="flex items-start gap-2">
                <span className="text-champagne mt-0.5">•</span>
                {isIt ? 'Ricorda il dress code: Elegante / Smart Casual.' : 'Remember the dress code: Elegant / Smart Casual.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-champagne mt-0.5">•</span>
                {isIt ? 'Presentati all\'ingresso comunicando il nome usato per la prenotazione.' : 'Show up at the entrance and give the name used for the booking.'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-champagne mt-0.5">•</span>
                {isIt ? 'La direzione si riserva il diritto di selezione all\'ingresso.' : 'The management reserves the right of admission.'}
              </li>
            </ul>
          </div>

          {/* Back to Home */}
          <div className="text-center pt-4">
            <Link 
              href={isIt ? '/it' : '/'}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {isIt ? 'Torna alla Home' : 'Back to Home'}
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
