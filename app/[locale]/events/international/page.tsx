import type { Metadata } from 'next';
import EventIntentLanding, { buildIntentMetadata } from '@/components/EventIntentLanding';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildIntentMetadata('international', locale);
}

export default async function InternationalEventsPage({ params }: Props) {
  const { locale } = await params;
  return <EventIntentLanding intent="international" locale={locale} />;
}
