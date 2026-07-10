'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ENABLED_LOCALES, LOCALES, localePrefix } from '@/lib/i18n/locales';

// Il prefisso va riconosciuto per TUTTI i codici del registry (anche i path
// interni riscritti dal middleware, es. /en/...).
const anyLocaleRe = new RegExp(`^\\/(${LOCALES.map((l) => l.code).join('|')})(\\/|$)`);

/** La scelta manuale vince per sempre sull'auto-rilevamento del middleware */
function rememberChoice(code: string) {
  document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000;samesite=lax`;
}

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
    const pathWithoutLocale = pathname.replace(anyLocaleRe, '/');
    const prefix = localePrefix(targetLocale);
    if (!prefix) return pathWithoutLocale;
    return pathWithoutLocale === '/' ? prefix : `${prefix}${pathWithoutLocale}`;
  };

  const current = ENABLED_LOCALES.find((l) => l.code === currentLocale) || ENABLED_LOCALES[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.nativeName}`}
        className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-2.5 h-9 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
      >
        <span className={`fi fi-${current.country} fis block w-5 h-5 rounded-full ring-1 ring-white/20`} aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-wide">{current.code}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M0 0l4 5 4-5z" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute end-0 top-full mt-2 max-h-[70vh] w-56 overflow-y-auto rounded-xl border border-white/10 bg-charcoal/95 backdrop-blur-md py-2 shadow-xl z-50"
        >
          {ENABLED_LOCALES.map((l) => (
            <li key={l.code} role="option" aria-selected={currentLocale === l.code}>
              <a
                href={getAlternatePath(l.code)}
                lang={l.hreflang}
                onClick={() => rememberChoice(l.code)}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  currentLocale === l.code ? 'text-champagne' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={`fi fi-${l.country} fis block w-5 h-5 rounded-full ring-1 ring-white/15 shrink-0`} aria-hidden="true" />
                {l.nativeName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
