import React from 'react';
import type { LocaleCode } from '@/lib/i18n/locales';

export type HeadingIndexEntry = Readonly<{ id: string; label: string }>;

export function headingAnchor(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, '-')
    .replace(/^-|-$/gu, '');
}

export default function HeadingIndex({
  locale,
  entries,
}: {
  locale: LocaleCode | string;
  entries: readonly HeadingIndexEntry[];
}) {
  if (!entries.length) return null;
  const heading = locale === 'it' ? 'Indice dei contenuti' : 'On this page';
  return (
    <nav
      aria-label={heading}
      data-heading-index={locale}
      className="my-8 rounded-2xl border border-white/15 bg-white/[0.03] p-5"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-champagne">{heading}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className="text-sm text-white/80 underline-offset-4 hover:text-champagne hover:underline"
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
