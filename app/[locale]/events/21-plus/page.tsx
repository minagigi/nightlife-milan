import type { Metadata } from 'next';
import EventIntentLanding, { buildIntentMetadata } from '@/components/EventIntentLanding';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildIntentMetadata('21-plus', locale);
}

export default async function TwentyOnePlusEventsPage({ params }: Props) {
  const { locale } = await params;
  return <EventIntentLanding intent="21-plus" locale={locale} />;
}
