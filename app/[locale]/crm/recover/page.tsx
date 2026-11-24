import type { Metadata } from 'next';
import { getCrmAuthCopy } from '@/lib/crmAuthCopy';
import { peekCrmRecoveryChallenge } from '@/lib/crmAuthVault';
import { crmLoginPath } from '@/lib/crmSession';
import CrmRecoverClient from './CrmRecoverClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCrmAuthCopy(locale);
  return {
    title: copy.recoverMetaTitle,
    robots: { index: false, follow: false, nocache: true },
  };
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CrmRecoverPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const token = typeof sp.token === 'string' ? sp.token.trim() : '';
  const copy = getCrmAuthCopy(locale);
  const peek = await peekCrmRecoveryChallenge(token);
  const loginRecoverHref = `${crmLoginPath(locale)}?tab=recover`;

  return (
    <CrmRecoverClient
      locale={locale}
      copy={copy}
      token={token}
      initialValid={peek.valid}
      initialReason={peek.reason}
      loginRecoverHref={loginRecoverHref}
    />
  );
}
