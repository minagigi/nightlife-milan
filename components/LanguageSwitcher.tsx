'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ENABLED_LOCALES, LOCALES, getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import {
  resolveSeoHubPathToCanonical,
  localizeInternalHref,
} from '@/lib/i18n/localizedSlugs35';

const anyLocaleRe = new RegExp(`^\\/(${LOCALES.map((l) => l.code).join('|')})(\\/|$)`);

const LANGUAGE_SHEET_TITLE: Partial<Record<LocaleCode, string>> = {
  it: 'Seleziona lingua',
  en: 'Select language',
  es: 'Seleccionar idioma',
  fr: 'Choisir la langue',
  de: 'Sprache wählen',
  pt: 'Selecionar idioma',
  nl: 'Taal kiezen',
  ru: 'Выберите язык',
  tr: 'Dil seçin',
  zh: '选择语言',
  ar: 'اختر اللغة',
  pl: 'Wybierz język',
  ro: 'Selectează limba',
  el: 'Επιλογή γλώσσας',
  uk: 'Оберіть мову',
};

/** La scelta manuale vince per sempre sull'auto-rilevamento del middleware */
function rememberChoice(code: string) {
  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:' ? ';secure' : '';
  document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000;samesite=lax${secure}`;
}

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const observedPathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileSheet, setIsMobileSheet] = useState(false);
  const [desktopPos, setDesktopPos] = useState<{ top: number; left: number }>({ top: 64, left: 16 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [observedPathname]);

  const updatePosition = useCallback(() => {
    if (typeof window === 'undefined' || !triggerRef.current) return;
    const vw = window.innerWidth;
    const mobile = vw < 768;
    setIsMobileSheet(mobile);
    if (!mobile) {
      const rect = triggerRef.current.getBoundingClientRect();
      const panelWidth = 256;
      const isRtl = document.documentElement.dir === 'rtl';
      const rawLeft = isRtl ? rect.left : rect.right - panelWidth;
      const clampedLeft = Math.max(12, Math.min(rawLeft, vw - panelWidth - 12));
      setDesktopPos({
        top: Math.max(8, Math.round(rect.bottom + 8)),
        left: Math.round(clampedLeft),
      });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (triggerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };

    window.addEventListener('resize', updatePosition, { passive: true });
    window.addEventListener('scroll', updatePosition, { passive: true });
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [open, updatePosition]);

  const getAlternatePath = (targetLocale: string) => {
    const loc = (targetLocale || 'en') as LocaleCode;
    const hreflangCode = getLocaleDef(loc)?.hreflang || targetLocale;
    const activePathname =
      (typeof window !== 'undefined' && window.location.pathname) || observedPathname;
    if (!activePathname) return localePrefix(targetLocale) || '/';

    if (typeof document !== 'undefined') {
      const altLink = (document.querySelector(`link[rel="alternate"][hreflang="${hreflangCode}"]`)
        || document.querySelector(`link[rel="alternate"][hreflang="${targetLocale}"]`)) as HTMLLinkElement | null;
      if (altLink?.href) {
        try {
          const parsed = new URL(altLink.href).pathname;
          if (parsed && parsed !== '/') return localizeInternalHref(parsed, loc);
          if (parsed === '/' && loc === 'en') return '/';
        } catch {}
      }
    }

    const pathWithoutLocale = activePathname.replace(anyLocaleRe, '/');
    const canonicalOrRaw = resolveSeoHubPathToCanonical(pathWithoutLocale, loc)
      || resolveSeoHubPathToCanonical(pathWithoutLocale, currentLocale as LocaleCode)
      || pathWithoutLocale;
    const prefix = localePrefix(targetLocale);
    const candidate = !prefix
      ? canonicalOrRaw
      : canonicalOrRaw === '/'
        ? prefix
        : `${prefix}${canonicalOrRaw}`;
    return localizeInternalHref(candidate, loc);
  };

  const current = ENABLED_LOCALES.find((l) => l.code === currentLocale) || ENABLED_LOCALES[0];
  const sheetTitle = LANGUAGE_SHEET_TITLE[currentLocale as LocaleCode] || LANGUAGE_SHEET_TITLE.en!;

  return (
    <div className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (!open) updatePosition();
          setOpen((v) => !v);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={`Language: ${current.nativeName}`}
        className="flex h-10 min-w-[44px] items-center justify-center gap-1.5 border border-[#EAE3D5]/32 bg-[#0B0A09] px-2 text-[#F6F1E7] transition-colors hover:border-[#F6F1E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] sm:h-11 sm:gap-2 sm:px-2.5"
      >
        <span
          className={`fi fi-${current.country} shrink-0 border border-[#F6F1E7]/22`}
          style={{
            display: 'inline-block',
            width: '20px',
            height: '15px',
            lineHeight: '15px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <span className="font-sans text-[12px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7] sm:text-[13px]">
          {current.code}
        </span>
        <svg
          width="8"
          height="5"
          viewBox="0 0 8 5"
          aria-hidden="true"
          className={`shrink-0 text-[#EAE3D5] transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M0 0l4 5 4-5z" fill="currentColor" />
        </svg>
      </button>

      {mounted &&
        open &&
        createPortal(
          isMobileSheet ? (
            <div
              data-nlm-lang-portal="true"
              data-no-lightbox="true"
              className="fixed inset-0 z-[140] bg-black/75 px-3 pt-[4.5rem] pb-4"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) setOpen(false);
              }}
            >
              <div
                ref={panelRef}
                id={listboxId}
                role="dialog"
                aria-modal="true"
                aria-label={sheetTitle}
                className="mx-auto flex max-h-[calc(100dvh-5.5rem)] w-full max-w-md flex-col border border-[#EAE3D5]/38 bg-[#0B0A09] text-[#F6F1E7]"
              >
                <div className="flex items-center justify-between border-b border-[#F6F1E7]/14 px-4 py-2.5">
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.1em] text-[#EAE3D5]">
                    {sheetTitle} ({ENABLED_LOCALES.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      window.requestAnimationFrame(() => triggerRef.current?.focus());
                    }}
                    aria-label="Close"
                    className="flex h-10 w-10 items-center justify-center text-[#F6F1E7] hover:bg-[#141311]"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <ul role="listbox" aria-label={sheetTitle} className="overflow-y-auto overscroll-contain py-1.5">
                  {ENABLED_LOCALES.map((l) => {
                    const isActive = currentLocale === l.code;
                    return (
                      <li key={l.code} role="option" aria-selected={isActive}>
                        <a
                          href={getAlternatePath(l.code)}
                          lang={l.hreflang}
                          onClick={() => {
                            rememberChoice(l.code);
                            setOpen(false);
                          }}
                          className={`flex min-h-[44px] items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-[#EAE3D5] font-bold text-[#050505]'
                              : 'text-[#F6F1E7] hover:bg-[#141311]'
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span
                              className={`fi fi-${l.country} shrink-0 border ${
                                isActive ? 'border-[#050505]/25' : 'border-[#F6F1E7]/20'
                              }`}
                              style={{
                                display: 'inline-block',
                                width: '22px',
                                height: '16px',
                                lineHeight: '16px',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                              aria-hidden="true"
                            />
                            <span className="truncate">{l.nativeName}</span>
                          </span>
                          <span
                            className={`shrink-0 font-mono text-[11px] font-bold uppercase ${
                              isActive ? 'text-[#050505]' : 'text-[#C2B9AA]'
                            }`}
                          >
                            {l.code}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            <div
              ref={panelRef}
              id={listboxId}
              data-nlm-lang-portal="true"
              data-no-lightbox="true"
              style={{ top: `${desktopPos.top}px`, left: `${desktopPos.left}px`, width: '256px' }}
              className="fixed z-[140] border border-[#EAE3D5]/36 bg-[#0B0A09] text-[#F6F1E7]"
            >
              <ul
                role="listbox"
                aria-label={sheetTitle}
                className="max-h-[min(72vh,520px)] overflow-y-auto overscroll-contain py-1.5"
              >
                {ENABLED_LOCALES.map((l) => {
                  const isActive = currentLocale === l.code;
                  return (
                    <li key={l.code} role="option" aria-selected={isActive}>
                      <a
                        href={getAlternatePath(l.code)}
                        lang={l.hreflang}
                        onClick={() => {
                          rememberChoice(l.code);
                          setOpen(false);
                        }}
                        className={`flex min-h-[40px] items-center justify-between gap-3 px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'bg-[#EAE3D5] font-bold text-[#050505]'
                            : 'text-[#C2B9AA] hover:bg-[#141311] hover:text-[#F6F1E7]'
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span
                            className={`fi fi-${l.country} shrink-0 border ${
                              isActive ? 'border-[#050505]/25' : 'border-[#F6F1E7]/20'
                            }`}
                            style={{
                              display: 'inline-block',
                              width: '20px',
                              height: '15px',
                              lineHeight: '15px',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                            aria-hidden="true"
                          />
                          <span className="truncate">{l.nativeName}</span>
                        </span>
                        <span
                          className={`shrink-0 font-mono text-[11px] font-semibold uppercase ${
                            isActive ? 'text-[#050505]' : 'text-[#A8A093]'
                          }`}
                        >
                          {l.code}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ),
          document.body,
        )}
    </div>
  );
}
