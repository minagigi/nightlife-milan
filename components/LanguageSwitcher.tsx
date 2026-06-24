'use client';

import { usePathname } from 'next/navigation';

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

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();

  const getAlternatePath = (targetLocale: string) => {
    if (!pathname) return targetLocale === 'it' ? '/it' : '/';

    const isCurrentlyIt = pathname.startsWith('/it/') || pathname === '/it';
    let pathWithoutLocale = pathname;

    if (isCurrentlyIt) {
      pathWithoutLocale = pathname.replace(/^\/it(\/|$)/, '/');
    }

    if (targetLocale === 'it') {
      return pathWithoutLocale === '/' ? '/it' : `/it${pathWithoutLocale}`;
    } else {
      return pathWithoutLocale;
    }
  };

  const langs = [
    { code: 'en', label: 'English', Flag: FlagUK },
    { code: 'it', label: 'Italiano', Flag: FlagIT },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1" role="group" aria-label="Language">
      {langs.map(({ code, label, Flag }) => {
        const isActive = currentLocale === code;
        return (
          <a
            key={code}
            href={getAlternatePath(code)}
            aria-label={code === 'en' ? 'Switch to English' : "Passa all'Italiano"}
            aria-current={isActive ? 'true' : undefined}
            lang={code}
            className="relative flex items-center justify-center w-8 h-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <span
              className={`block w-6 h-6 rounded-full overflow-hidden ring-1 transition-all duration-300 ${
                isActive
                  ? 'ring-champagne shadow-[0_0_10px_rgba(201,168,106,0.45)] scale-105'
                  : 'ring-white/15 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:ring-white/30'
              }`}
            >
              <Flag />
            </span>
          </a>
        );
      })}
    </div>
  );
}
