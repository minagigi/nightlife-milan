import type { Metadata } from 'next';
import { getCrmAuthCopy } from '@/lib/crmAuthCopy';
import { safeCrmRedirect } from '@/lib/crmSession';
import CrmLoginClient from './CrmLoginClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCrmAuthCopy(locale);
  return {
    title: copy.metaTitle,
    description: copy.metaDesc,
    robots: { index: false, follow: false, nocache: true },
  };
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function readParam(params: Record<string, string | string[] | undefined>, key: string): string {
  const value = params[key];
  return typeof value === 'string' ? value : '';
}

export default async function CrmLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const copy = getCrmAuthCopy(locale);
  const initialTab = readParam(query, 'tab') === 'recover' ? 'recover' : 'login';
  const initialError = readParam(query, 'error');
  const loggedOut = readParam(query, 'loggedOut') === '1';
  const initialSent = readParam(query, 'sent') === '1';
  const next = safeCrmRedirect(readParam(query, 'next'), locale);

  return (
    <CrmLoginClient
      locale={locale}
      copy={copy}
      next={next}
      initialTab={initialTab}
      initialError={initialError}
      loggedOut={loggedOut}
      initialSent={initialSent}
    />
  );
}
