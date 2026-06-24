import React from 'react';
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
      { day: locale === 'it' ? 'Martedì' : 'Tue', event: 'University Night' },
      { day: locale === 'it' ? 'Mercoledì' : 'Wed', event: 'Fortune Teller' },
      { day: locale === 'it' ? 'Giovedì' : 'Thu', event: 'Viziatissima w/ Benny Camaro' },
    ],
    'v-pineta': [
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Aperitivo Cantato & Live Music' },
      { day: locale === 'it' ? 'Sabato' : 'Sat', event: 'Aperitivo Cantato & Live Music' },
    ],
    'v-playclub': [
      { day: locale === 'it' ? 'Giovedì' : 'Thu', event: 'Shakara (Afrobeats)' },
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Flexx (Hip-Hop)' },
    ],
    'v-55milano': [
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Singing Dinner' },
      { day: locale === 'it' ? 'Sabato' : 'Sat', event: 'Singing Dinner' },
      { day: locale === 'it' ? 'Domenica' : 'Sun', event: 'Latin Night' },
    ],
    'v-repvblic': [
      { day: locale === 'it' ? 'Mercoledì' : 'Wed', event: 'Home (House Music)' },
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Dirty Monday Edition' },
    ],
    'v-11clubroom': [
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Urban Night' },
      { day: locale === 'it' ? 'Sabato' : 'Sat', event: 'Elite Night' },
    ],
    'v-church81': [
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Deep House Session' },
      { day: locale === 'it' ? 'Sabato' : 'Sat', event: 'Avant-Garde Night' },
    ],
    'v-mibmilano': [
      { day: locale === 'it' ? 'Giovedì' : 'Thu', event: 'Dinner Show' },
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Corporate Night' },
    ],
    'v-gattopardo': [
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Classic Elegance' },
      { day: locale === 'it' ? 'Sabato' : 'Sat', event: 'Exclusive Night' },
    ],
    'v-terrazza21': [
      { day: locale === 'it' ? 'Tutti i giorni' : 'Daily', event: 'Sunset Aperitivo' },
    ],
    'v-theclub': [
      { day: locale === 'it' ? 'Martedì' : 'Tue', event: 'Fidelio' },
      { day: locale === 'it' ? 'Venerdì' : 'Fri', event: 'Commercial Night' },
      { day: locale === 'it' ? 'Sabato' : 'Sat', event: 'International Night' },
    ],
  };

  const program = programs[venueId];

  if (!program || program.length === 0) {
    return null;
  }

  const bookText = locale === 'it' ? 'PRENOTA' : 'BOOK';
  const disclaimerText = locale === 'it' ? 'Disponibile solo via WhatsApp' : 'Available via WhatsApp only';

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-lg p-6 mt-8">
      <h3 className="text-xl font-serif font-bold text-white mb-6">
        {locale === 'it' ? 'Programma Settimanale' : 'Weekly Program'}
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
