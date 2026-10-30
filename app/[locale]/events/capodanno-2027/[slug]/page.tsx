import { permanentRedirect } from 'next/navigation';
import { CAPODANNO_EVENTS } from '@/lib/capodannoEvents';
import { capodannoEventPath } from '@/lib/capodanno/routes';

export const dynamicParams = true;

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of ['en', 'it']) {
    for (const ev of CAPODANNO_EVENTS) {
      params.push({ locale, slug: ev.slug });
    }
  }
  return params;
}

export default async function CapodannoEventLegacyAlias({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  permanentRedirect(capodannoEventPath(slug, locale));
}
