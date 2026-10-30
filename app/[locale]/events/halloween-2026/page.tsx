import { permanentRedirect } from 'next/navigation';
import { enabledLocaleCodes } from '@/lib/i18n/locales';
import { halloweenPath } from '@/lib/halloween/routes';
export const revalidate = false;
export const dynamicParams = false;
export function generateStaticParams() { return enabledLocaleCodes.map(locale => ({ locale })); }
export default async function HalloweenLegacyAlias({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  permanentRedirect(halloweenPath(locale));
}
