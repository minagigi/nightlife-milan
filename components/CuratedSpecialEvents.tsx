import React from 'react';
import type { LocaleCode } from '@/lib/i18n/locales';

export default async function CuratedSpecialEvents(_props: {
  locale: LocaleCode | string;
  surface: string;
  excludeEventId?: string;
  headingLevel?: 2 | 3;
}) {
  return null;
}
