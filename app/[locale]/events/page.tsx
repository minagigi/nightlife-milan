import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MfwEntry from '@/components/MfwEntry';
import OctoberEntry from '@/components/OctoberEntry';
import DateSensitiveCalendar from '@/components/DateSensitiveCalendar';
import { getCalendarControlsCopy } from '@/lib/calendarControlsCopy';
import { getDateSensitiveInventory } from '@/lib/dateSensitiveInventory';
import {
  getLocaleDef,
  hreflangAlternates,
  localePrefix,
} from '@/lib/i18n/locales';
import { getEventCalendarCopy } from '@/lib/eventCalendarCopy';
import { EVENT_CALENDAR_LOCALES, isEventCalendarLocale } from '@/lib/eventRouteLocales';
import { tr } from '@/lib/i18n/t';
import { generatePageBreadcrumbSchema, jsonLdString } from '@/lib/seo';
import { seoRobots, seoTitle } from '@/lib/seoMetadata';
import { getEventLocaleLabels } from '@/lib/eventLocaleLabels';
import { getEventHubSerpDecisionDescription } from '@/lib/serpDecisionCopy';
import { applyEditorialFields, readEditorialFields } from '@/lib/editorialContent';
import { getGuestListsCopy } from '@/lib/guestLists/copy';

export const revalidate = 3600;
const SITE_URL = 'https://nightlifemilan.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${SITE_URL}${localePrefix(locale)}/events`;
  const editorial = applyEditorialFields({
    metaTitle: locale === 'it' ? 'Tutti gli eventi a Milano 2026' : locale === 'en' ? 'All Events in Milan 2026' : getEventCalendarCopy(locale).verified,
    metaDescription: getEventHubSerpDecisionDescription(locale, 'all'),
    ogImageAlt: tr(locale, 'Milan nightlife events', 'Eventi della vita notturna di Milano'),
  }, await readEditorialFields('events', locale));
  const title = seoTitle(editorial.metaTitle);
  const description = editorial.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates(SITE_URL, '/events'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{
        url: `${SITE_URL}/images/pillars/events-hub-hero.webp`,
        width: 1344,
        height: 752,
        alt: editorial.ogImageAlt,
      }],
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
    },
    keywords: [
      tr(locale, 'Milan nightlife events', 'eventi vita notturna Milano'),
      tr(locale, 'Complete list of nightlife events in Milan', 'elenco completo eventi Milano'),
    ],
    // /events has complete route-scoped copy and native event content in all
    // enabled locales, so it can opt into indexing independently of unrelated
    // route families which may still be incomplete.
    robots: seoRobots(locale, isEventCalendarLocale(locale), true),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/images/pillars/events-hub-hero.webp`],
    },
  };
}

export default async function EventsHubPage({ params }: Props) {
  const { locale } = await params;
  const copy = getEventCalendarCopy(locale);
  const labels = getEventLocaleLabels(locale);
  const lp = localePrefix(locale);
  const guestListsCopy = getGuestListsCopy(locale);
  const inventory = await getDateSensitiveInventory(locale);
  const editorial = applyEditorialFields({
    eyebrow: tr(locale, 'Complete list of nightlife events in Milan', 'Elenco completo degli eventi della vita notturna di Milano'),
    heading: locale === 'it' ? 'Tutti gli eventi a Milano 2026' : locale === 'en' ? 'All Events in Milan 2026' : copy.verified,
    intro: copy.verifiedNote,
  }, await readEditorialFields('events', locale));

  const breadcrumbItems = [
    { name: labels.home, path: '' },
    { name: labels.events, path: '/events' },
  ] as const;
  const breadcrumbSchema = generatePageBreadcrumbSchema(locale, breadcrumbItems);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbSchema) }} />
      <main className="flex-1 bg-[#050505] text-[#F6F1E7]">
        <div className="border-b border-[#F6F1E7]/14 bg-[#050505]">
          <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-4 sm:px-14">
            <nav className="font-mono text-xs uppercase tracking-[0.18em] text-[#847C6F]" aria-label={`${labels.home} / ${labels.events}`}>
              <ol className="inline-flex list-none p-0">
                <li className="flex items-center">
                  <Link href={lp || '/'} prefetch={false} className="transition-colors hover:text-[#D6BE96]">
                    {breadcrumbItems[0].name}
                  </Link>
                  <span className="mx-2" aria-hidden="true">/</span>
                </li>
                <li className="text-[#D6BE96]" aria-current="page">{breadcrumbItems[1].name}</li>
              </ol>
            </nav>
          </div>
        </div>

        <header className="relative overflow-hidden border-b border-[#F6F1E7]/14 bg-[#0B0A09]">
          <Image src="/images/pillars/events-hub-hero.webp" alt={editorial.heading} fill priority sizes="100vw" className="object-cover opacity-25 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 pb-14 pt-14 sm:px-14">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.26em] text-[#D6BE96]">
              {editorial.eyebrow}
            </p>
            <h1 className="max-w-5xl font-serif text-5xl font-normal tracking-[-0.032em] leading-[0.92] text-[#F6F1E7] md:text-7xl">
              {editorial.heading}
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-[#C2B9AA] md:text-lg">
              {editorial.intro}
            </p>
            <Link href={`${lp}/guest-lists`} prefetch={false} className="mt-7 inline-flex min-h-[46px] items-center gap-2 border border-[#D6BE96]/45 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#F6F1E7] transition-colors hover:bg-[#F6F1E7] hover:text-[#050505]">
              {guestListsCopy.title}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </header>
        <MfwEntry locale={locale} />
        <OctoberEntry locale={locale} />

        <section className="bg-[#050505] border-b border-[#F6F1E7]/14" aria-label={labels.events}>
          <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-16 sm:px-14">
            <DateSensitiveCalendar
              events={inventory}
              initialNow={new Date().toISOString()}
              mode="upcoming"
              groupByDay
              variant="gallery"
              bookingLocale={locale}
              dateControls={getCalendarControlsCopy(locale)}
              localeTag={getLocaleDef(locale)?.hreflang || 'en'}
              localePrefix={lp}
              copy={copy}
              schemaName={editorial.heading}
            />
          </div>
        </section>
        <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/events`} />
      </main>
    </>
  );
}

