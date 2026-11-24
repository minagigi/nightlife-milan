import type { Metadata } from 'next';
import { getCrmAuthCopy } from '@/lib/crmAuthCopy';
import { requireCrmServerSession, resolveActiveCrmCredentials } from '@/lib/crmAuthVault';
import { crmHomePath } from '@/lib/crmSession';
import CrmCredentialsClient from './CrmCredentialsClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getCrmAuthCopy(locale);
  return {
    title: copy.credentialsMetaTitle,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function CrmCredentialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [session, active] = await Promise.all([
    requireCrmServerSession(locale),
    resolveActiveCrmCredentials(),
  ]);
  const copy = getCrmAuthCopy(locale);

  return (
    <CrmCredentialsClient
      locale={locale}
      copy={copy}
      currentUsername={active?.username || session.username}
      source={active?.source || 'env'}
      crmHref={crmHomePath(locale)}
    />
  );
}
