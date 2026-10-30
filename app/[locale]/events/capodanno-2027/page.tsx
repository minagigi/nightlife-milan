import { permanentRedirect } from 'next/navigation';
import { enabledLocaleCodes } from '@/lib/i18n/locales';
import { capodannoCategoryPath } from '@/lib/capodanno/routes';

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return enabledLocaleCodes.map((locale) => ({ locale }));
}

export default async function CapodannoCategoryLegacyAlias({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(capodannoCategoryPath('capodanno-2027', locale));
}
