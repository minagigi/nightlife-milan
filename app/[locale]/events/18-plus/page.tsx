import type { Metadata } from 'next';
import EventIntentLanding, { buildIntentMetadata } from '@/components/EventIntentLanding';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildIntentMetadata('18-plus', locale);
}

export default async function EighteenPlusEventsPage({ params }: Props) {
  const { locale } = await params;
  return <EventIntentLanding intent="18-plus" locale={locale} />;
}
