import React from 'react';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getContextualLocalePack35 } from '@/lib/i18n/contextualSilo35';

export interface PageContextualTocItem {
  id: string;
  label: string;
}

export interface PageContextualTocProps {
  locale: LocaleCode | string;
  items: readonly PageContextualTocItem[];
  variant?: 'default' | 'compact';
  className?: string;
}

export default function PageContextualToc({
  locale,
  items,
  variant = 'default',
  className = '',
}: PageContextualTocProps) {
  const validItems = items.filter((item) => item.id && item.label);
  if (validItems.length === 0) return null;
  const pack = getContextualLocalePack35(locale);
  const pyClass = variant === 'compact' ? 'py-4' : 'py-6';

  return (
    <section
      aria-label={pack.tocHeading}
      className={`w-full bg-[#050505] text-[#F6F1E7] ${className}`.trim()}
    >
      <div className={`mx-auto max-w-7xl px-4 ${pyClass} sm:px-6 lg:px-8`}>
        <nav
          aria-label={pack.tocHeading}
          data-page-toc={locale}
          className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-5 sm:p-7"
        >
          <p className="font-sans text-[13px] font-bold uppercase tracking-[0.06em] text-[#EAE3D5]">
            {pack.tocHeading}
          </p>
          <p className="mt-1 font-sans text-[13px] text-[#C2B9AA]">
            {pack.tocSubtitle}
          </p>
          <ol className="mt-4 grid grid-cols-1 gap-3 border-t border-[#F6F1E7]/14 pt-4 sm:grid-cols-2 lg:grid-cols-4">
            {validItems.map((item, idx) => (
              <li key={item.id} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-[#EAE3D5]/30 bg-[#050505] font-sans tabular-nums text-[12px] font-bold text-[#F6F1E7]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <a
                  href={`#${item.id}`}
                  className="font-sans text-sm font-medium text-[#F6F1E7] underline-offset-4 transition-colors hover:text-[#25D366] hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
