'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { ENABLED_LOCALES, LOCALES, localePrefix } from '@/lib/i18n/locales';

function FlagUK() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
      <clipPath id="ls-uk-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="ls-uk-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#ls-uk-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#ls-uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function FlagIT() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className="w-full h-full" aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#CE2B37" />
    </svg>
  );
}

/** Badge generico per le lingue senza bandiera dedicata */
function CodeBadge({ code }: { code: string }) {
  return (
    <span className="flex items-center justify-center w-full h-full bg-white/10 text-[9px] font-semibold tracking-wide uppercase">
      {code}
    </span>
  );
}

const FLAGS: Record<string, () => ReactElement> = { en: FlagUK, it: FlagIT };

// Il prefisso va riconosciuto per TUTTI i codici del registry (anche disabilitati:
// strippare un prefisso spento è innocuo e protegge dai path interni riscritti).
const anyLocaleRe = new RegExp(`^\\/(${LOCALES.map((l) => l.code).join('|')})(\\/|$)`);

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const getAlternatePath = (targetLocale: string) => {
    if (!pathname) return localePrefix(targetLocale) || '/';

    // usePathname() può restituire il path interno RISCRITTO dal middleware
    // (`/en/events/...`) invece dell'URL pubblico pulito (`/events/...`):
    // va strippato QUALSIASI prefisso di lingua, non solo quello corrente.
    const pathWithoutLocale = pathname.replace(anyLocaleRe, '/');
    const prefix = localePrefix(targetLocale);
    if (!prefix) return pathWithoutLocale;
    return pathWithoutLocale === '/' ? prefix : `${prefix}${pathWithoutLocale}`;
  };

  // Fino a 4 lingue attive: fila di pill con bandiera (design attuale).
  // Oltre: dropdown compatto con l'elenco dei nomi nativi.
  if (ENABLED_LOCALES.length <= 4) {
    return (
      <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1" role="group" aria-label="Language">
        {ENABLED_LOCALES.map((l) => {
          const isActive = currentLocale === l.code;
          const Flag = FLAGS[l.code];
          return (
            <a
              key={l.code}
              href={getAlternatePath(l.code)}
              aria-label={l.nativeName}
              aria-current={isActive ? 'true' : undefined}
              lang={l.hreflang}
              className="relative flex items-center justify-center w-8 h-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
            >
              <span
                className={`block w-6 h-6 rounded-full overflow-hidden ring-1 transition-all duration-300 ${
                  isActive
                    ? 'ring-champagne shadow-[0_0_10px_rgba(201,168,106,0.45)] scale-105'
                    : 'ring-white/15 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:ring-white/30'
                }`}
              >
                {Flag ? <Flag /> : <CodeBadge code={l.code} />}
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  const current = ENABLED_LOCALES.find((l) => l.code === currentLocale) || ENABLED_LOCALES[0];
  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-3 h-9 text-xs font-semibold uppercase tracking-wide hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
      >
        {current.code}
        <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M0 0l4 5 4-5z" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute end-0 top-full mt-2 max-h-80 w-48 overflow-y-auto rounded-xl border border-white/10 bg-charcoal/95 backdrop-blur-md py-2 shadow-xl z-50"
        >
          {ENABLED_LOCALES.map((l) => (
            <li key={l.code} role="option" aria-selected={currentLocale === l.code}>
              <a
                href={getAlternatePath(l.code)}
                lang={l.hreflang}
                className={`block px-4 py-2 text-sm transition-colors ${
                  currentLocale === l.code ? 'text-champagne' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.nativeName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
