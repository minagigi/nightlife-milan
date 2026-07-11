import React from 'react';
import { tr } from '@/lib/i18n/t';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/config/contact';

interface WeeklyProgramProps {
  venueId: string;
  venueName: string;
  locale: 'en' | 'it';
}

export default function WeeklyProgram({ venueId, venueName, locale }: WeeklyProgramProps) {
  const programs: Record<string, { day: string; event: string }[]> = {
    'v-justme': [
      { day: tr(locale, 'Tue', 'Martedì'), event: 'University Night' },
      { day: tr(locale, 'Wed', 'Mercoledì'), event: 'Fortune Teller' },
      { day: tr(locale, 'Thu', 'Giovedì'), event: 'Viziatissima w/ Benny Camaro' },
    ],
    'v-pineta': [
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Aperitivo Cantato & Live Music' },
      { day: tr(locale, 'Sat', 'Sabato'), event: 'Aperitivo Cantato & Live Music' },
    ],
    'v-playclub': [
      { day: tr(locale, 'Thu', 'Giovedì'), event: 'Shakara (Afrobeats)' },
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Flexx (Hip-Hop)' },
    ],
    'v-55milano': [
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Singing Dinner' },
      { day: tr(locale, 'Sat', 'Sabato'), event: 'Singing Dinner' },
      { day: tr(locale, 'Sun', 'Domenica'), event: 'Latin Night' },
    ],
    'v-repvblic': [
      { day: tr(locale, 'Wed', 'Mercoledì'), event: 'Home (House Music)' },
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Dirty Monday Edition' },
    ],
    'v-11clubroom': [
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Urban Night' },
      { day: tr(locale, 'Sat', 'Sabato'), event: 'Elite Night' },
    ],
    'v-church81': [
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Deep House Session' },
      { day: tr(locale, 'Sat', 'Sabato'), event: 'Avant-Garde Night' },
    ],
    'v-mibmilano': [
      { day: tr(locale, 'Thu', 'Giovedì'), event: 'Dinner Show' },
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Corporate Night' },
    ],
    'v-gattopardo': [
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Classic Elegance' },
      { day: tr(locale, 'Sat', 'Sabato'), event: 'Exclusive Night' },
    ],
    'v-terrazza21': [
      { day: tr(locale, 'Daily', 'Tutti i giorni'), event: 'Sunset Aperitivo' },
    ],
    'v-theclub': [
      { day: tr(locale, 'Tue', 'Martedì'), event: 'Fidelio' },
      { day: tr(locale, 'Fri', 'Venerdì'), event: 'Commercial Night' },
      { day: tr(locale, 'Sat', 'Sabato'), event: 'International Night' },
    ],
  };

  const program = programs[venueId];

  if (!program || program.length === 0) {
    return null;
  }

  const bookText = tr(locale, 'BOOK', 'PRENOTA');
  const disclaimerText = tr(locale, 'Available via WhatsApp only', 'Disponibile solo via WhatsApp');

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-serif font-bold text-white mb-6">
        {tr(locale, 'Weekly Program', 'Programma Settimanale')}
      </h3>
      <ul className="space-y-4">
        {program.map((item, idx) => {
          const waText = `Hi, I'd like to book for ${item.event} (${item.day}) at ${venueName}`;
          const waLink = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(waText)}`;
          
          return (
            <li key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <span className="text-champagne font-bold w-20 shrink-0">{item.day}</span>
                <span className="text-white/70">{item.event}</span>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <a 
                  href={waLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-sm hover:bg-[#25D366] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {bookText}
                </a>
                <span className="text-[10px] opacity-80 normal-case font-medium text-white/40 mt-1 text-center sm:text-right w-full">
                  {disclaimerText}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
