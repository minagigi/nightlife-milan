import React from 'react';
import NextLink from 'next/link';
import { localizeInternalHref } from '@/lib/i18n/localizedSlugs35';
import type { LocaleCode } from '@/lib/i18n/locales';

type NextLinkProps = React.ComponentProps<typeof NextLink> & {
  locale?: LocaleCode | string;
};

export default function LocalizedLink({ href, locale, ...rest }: NextLinkProps) {
  let finalHref = href;
  if (typeof href === 'string') {
    finalHref = localizeInternalHref(href, (locale as LocaleCode) || 'en');
  }
  return <NextLink href={finalHref} {...rest} />;
}
