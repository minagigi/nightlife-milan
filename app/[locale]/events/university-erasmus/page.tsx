import type { Metadata } from 'next';
import EventIntentLanding, { buildIntentMetadata } from '@/components/EventIntentLanding';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildIntentMetadata('university-erasmus', locale);
}

export default async function UniversityErasmusEventsPage({ params }: Props) {
  const { locale } = await params;
  return <EventIntentLanding intent="university-erasmus" locale={locale} />;
}
