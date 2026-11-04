import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import OctoberCalendarClient, { type OctoberCalendarCard } from './OctoberCalendarClient';
import HeadingIndex from './HeadingIndex';
import EditorialPageSections from './EditorialPageSections';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { enabledLocaleCodes, getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getHalloween2026Copy } from '@/lib/halloween2026';
import { HALLOWEEN_CONTENT, HALLOWEEN_ASSETS } from '@/lib/halloween/content';
import { validateHalloweenContent } from '@/lib/halloween/contract';
import { HALLOWEEN_SELECTION_UI, HALLOWEEN_FAMILY_UI, halloweenHubCollections, halloweenEventAnchor } from '@/lib/halloween/selection';
import { getMonthEventLocalePack } from '@/lib/month-events/locales';
import { halloweenHubPoster } from '@/lib/halloween/selectionMedia';
import { halloweenFeaturedView } from '@/lib/halloween/featuredFacts';
import { halloweenPath, HALLOWEEN_LEGACY_SLUG } from '@/lib/halloween/routes';
import { halloweenLocalizedAssets } from '@/lib/halloween/assets';
import { OCTOBER_EVENTS } from '@/lib/octoberEvents';
import { readOctoberEventCopy } from '@/lib/octoberEditorial';
import { formatOctoberEventDate } from '@/lib/octoberEventSeo';
import { getMfwCopy } from '@/lib/mfw/copy';
import { generatePageBreadcrumbSchema, jsonLdString } from '@/lib/seo';
import { withWhatsApp } from '@/lib/seoMetadata';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';

const BASE = 'https://nightlifemilan.com';
export function halloweenItemList(name: string, publicPath: string, cards: readonly OctoberCalendarCard[]) {
  return { '@context': 'https://schema.org', '@type': 'ItemList', name, url: BASE + publicPath,
    numberOfItems: cards.length, itemListElement: cards.map((card, index) => ({ '@type': 'ListItem', position: index + 1, name: card.title, url: BASE + (card.href.startsWith('#') ? publicPath+card.href : card.href) })) };
}
type EventMention = Readonly<{ id: string; name: string; href: string }>;
/** Literal saved names only. Localized variants remain text beside native cards. */
export function linkFirstHalloweenMentions(text: string, links: readonly EventMention[], seen: Set<string>): ReactNode {
  const matches = links.filter(link => link.name && !seen.has(link.id) && text.includes(link.name))
    .sort((a, b) => text.indexOf(a.name) - text.indexOf(b.name) || b.name.length - a.name.length);
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of matches) {
    const offset = text.indexOf(match.name);
    if (offset < cursor) continue;
    nodes.push(text.slice(cursor, offset), <Link key={match.id} href={match.href} prefetch={false} className="underline underline-offset-4">{match.name}</Link>);
    seen.add(match.id); cursor = offset + match.name.length;
  }
  nodes.push(text.slice(cursor));
  return nodes;
}
function nativeCopy(locale: LocaleCode) {
  return validateHalloweenContent(HALLOWEEN_CONTENT, HALLOWEEN_ASSETS)[locale];
}
export function halloweenMetadata(locale: LocaleCode): Metadata {
  const copy = nativeCopy(locale), canonical = BASE + halloweenPath(locale);
  const description = withWhatsApp(copy.metaDescription, locale);
  const firstFeaturedId = halloweenHubCollections().featured[0]?.id;
  const image = (firstFeaturedId && halloweenHubPoster(firstFeaturedId, locale)) || halloweenLocalizedAssets(locale, copy, HALLOWEEN_ASSETS)[0];
  return {
    title: { absolute: copy.metaTitle }, description,
    alternates: { canonical, languages: Object.fromEntries([
      ...enabledLocaleCodes.map(code => [getLocaleDef(code)!.hreflang, BASE + halloweenPath(code)]),
      ['x-default', BASE + halloweenPath('en')],
    ]) }, robots: { index: true, follow: true },
    openGraph: { type: 'website', title: copy.metaTitle, description,
      url: canonical, locale: getLocaleDef(locale)!.ogLocale, siteName: 'Nightlife Milan',
      images: [{ url: BASE + image.src, width: image.width, height: image.height, alt: copy.imageAlts[0] }] },
    twitter: { card: 'summary_large_image', title: copy.metaTitle, description, images: [BASE + image.src] },
  };
}
export default async function HalloweenHub({ locale }: { locale: LocaleCode }) {
  const body = nativeCopy(locale), copy = getHalloween2026Copy(locale);
  const scarcity = getScarcityAndChatCopy(locale);
  const localizedImages = halloweenLocalizedAssets(locale, body, HALLOWEEN_ASSETS);
  const collections = halloweenHubCollections();
  const bookingLabels = getMonthEventLocalePack(locale).labels;
  const events = collections.all;
  const cards: OctoberCalendarCard[] = await Promise.all(events.map(async event => {
    const canonical = event.canonicalEventId ? OCTOBER_EVENTS.find(item => item.id === event.canonicalEventId) : undefined;
    if (event.canonicalEventId && (!canonical || canonical.startISO !== event.startISO || canonical.halloween !== true)) throw new Error(`HALLOWEEN_CANONICAL_INPUTS_HOLD: ${event.id}`);
    const text = canonical ? await readOctoberEventCopy(canonical, locale) : null;
    const affiliate = event.affiliateUrl;
    const dateLabels = event.dates.map(date => new Intl.DateTimeFormat(locale, {dateStyle:'long',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z')));
    return { id: event.id, href: text ? `${localePrefix(locale)}/events/${text.slug}` : `#${halloweenEventAnchor(event.id)}`, title: event.title,
      canonicalDetail: Boolean(canonical), anchorId: halloweenEventAnchor(event.id),
      statusBadge: scarcity.almostSoldOutBadge,
      openEventCtaLabel: scarcity.openEventCardCta,
      booking: { href: affiliate || getConciergeBookingUrl(locale, `${event.title} · ${event.venueName}`), label: affiliate ? bookingLabels.offers : bookingLabels.inquiry, affiliate: Boolean(affiliate) },
      summary: halloweenFeaturedView(event.id, locale)?.summary || '', dateKey: event.dates[0], dateKeys: event.dates, dateLabels, dateLabel: event.startISO ? formatOctoberEventDate(locale, event.startISO) : dateLabels.join(' · '),
      venueId: event.id, venueName: event.venueName, image: halloweenHubPoster(event.id,locale) || (canonical && text ? { ...canonical.image, alt: text.imageAlt } : undefined) };
  }));
  const featuredCards = collections.featured.map(event => cards.find(card => card.id === event.id)!);
  const otherCards = collections.others.filter(event => event.category !== 'family-culture')
    .map(event => cards.find(card => card.id === event.id)!);
  const familyCards = collections.others.filter(event => event.category === 'family-culture').map(event => cards.find(card => card.id === event.id)!);
  const familyLabels = HALLOWEEN_FAMILY_UI[locale];
  const familyUi = familyLabels ? {heading:familyLabels[0],introduction:familyLabels[1]} : null;
  if (familyCards.length && (!familyUi?.heading.trim() || !familyUi.introduction.trim())) throw new Error(`HALLOWEEN_NATIVE_CATEGORY_UI_HOLD: ${locale}`);
  const selection = HALLOWEEN_SELECTION_UI[locale];
  const commercial = new Map(featuredCards.map(card=>[card.id,card.booking!] as const));
  const featuredViews = new Map(featuredCards.map(card=>[card.id,halloweenFeaturedView(card.id,locale)!] as const));
  const homeLabel = (await getMfwCopy(locale)).ui.home;
  const mentions = events.map(event => ({ id: event.id, name: event.title, href: cards.find(card => card.id === event.id)!.href }));
  const mentionedEvents = new Set<string>();
  const sectionEntries = body.sections.map((section, index) => ({ id: `halloween-section-${index + 1}`, label: section.heading }));
  const faqEntries = body.faqs.map((faq, index) => ({ id: `halloween-faq-${index + 1}`, label: faq.question }));
  const entries = [...sectionEntries, ...faqEntries];
  const graph = [
    generatePageBreadcrumbSchema(locale, [{ name: homeLabel, path: '' }, { name: body.h1, path: halloweenPath(locale).slice(localePrefix(locale).length) }]),
    halloweenItemList(body.h1, halloweenPath(locale), cards),
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: body.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ];
  return <main className="tc-page min-h-screen bg-[#131009] pb-24 text-white" data-halloween-hub>
    {graph.map((item, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(item) }} />)}
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <nav aria-label={homeLabel} className="mb-8 text-base"><Link href={localePrefix(locale) || '/'} className="underline underline-offset-4">{homeLabel}</Link><span aria-hidden="true"> / </span><span aria-current="page">{body.h1}</span></nav>
      <header><p className="text-base font-semibold text-champagne">Nightlife Milan</p><h1 data-event-title={body.h1} className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">{body.h1}</h1></header>
      <div role="alert" data-urgency-alert className="mt-8 rounded-2xl border-2 border-amber-400/70 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent p-5 sm:p-6 shadow-lg">
        <p className="text-sm font-extrabold uppercase tracking-wider text-amber-300 sm:text-base">{scarcity.urgencyAlertTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/90 sm:text-base">{scarcity.urgencyAlertBody}</p>
      </div>
    </div>
    {featuredCards.length && selection ? <section className="mx-auto max-w-7xl px-5 lg:px-8" aria-labelledby="halloween-featured-heading" data-halloween-featured>
      <h2 id="halloween-featured-heading" className="font-serif text-3xl font-bold">{selection.featuredHeading}</h2>
      <p className="mt-4 max-w-4xl text-base leading-7 text-white/80">{selection.featuredIntroduction}</p>
      <ol className="mt-8 grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">{featuredCards.map(card => {
        const details = <>
          {card.image ? <Image quality={92} src={card.image.src} alt={card.image.alt} title={card.image.alt} width={card.image.width} height={card.image.height} priority={card.id===featuredCards[0].id} sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 38vw" className="block h-auto w-full bg-black/30 object-contain"/> : null}
          <div className="p-5"><div className="flex flex-wrap gap-2"><span className="inline-flex rounded-full bg-champagne px-3 py-1 text-sm font-semibold text-black">{selection.recommendedLabel}</span><span className="inline-flex rounded-full border border-amber-400/70 bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300" data-selling-fast-badge>{scarcity.almostSoldOutBadge}</span></div><p className="mt-4 text-base text-champagne">{card.dateLabel}</p><p data-halloween-featured-hours={card.id} className="mt-2 text-base text-white/80">{featuredViews.get(card.id)!.labels.hours}: {featuredViews.get(card.id)!.hours}</p><h3 className="mt-3 font-serif text-2xl font-bold leading-tight">{card.title}</h3><p className="mt-3 text-base text-white/80">{card.venueName}</p><p data-halloween-featured-summary={card.id} className="mt-4 text-base leading-7 text-white/75">{card.summary}</p></div>
        </>;
        return <li key={card.id}><article id={halloweenEventAnchor(card.id)} className="overflow-hidden rounded-2xl border border-champagne/30 bg-white/[0.035]" data-halloween-featured-card={card.id}>
          {card.canonicalDetail
            ? <Link href={card.href} prefetch={false} className="block outline-offset-[-3px] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne" aria-label={`${card.title} · ${card.dateLabel}`}>{details}</Link>
            : <div>{details}</div>}
          <div className="px-5 pb-5"><Link href={card.href} prefetch={false} data-halloween-booking={card.id} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-champagne px-4 py-3 text-center text-base font-bold text-black transition hover:bg-white focus-visible:ring-2 focus-visible:ring-white">{scarcity.openEventCardCta}</Link></div>
        </article></li>;
      })}</ol>
      <section className="mt-12 rounded-2xl border border-white/15 p-5 sm:p-7" aria-labelledby="halloween-comparison-heading">
        <h2 id="halloween-comparison-heading" className="font-serif text-2xl font-bold">{selection.comparisonHeading}</h2><p className="mt-4 text-base leading-7 text-white/80">{selection.comparisonIntroduction}</p><p data-halloween-offer-notice className="mt-4 text-base leading-7 text-white/80">{featuredViews.get(featuredCards[0].id)!.labels.notice}</p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featuredCards.map(card => <li key={card.id}><Link href={card.href} prefetch={false} className="block min-h-11 text-base font-semibold underline underline-offset-4"><bdi>{card.title}</bdi></Link><p className="mt-2 text-base leading-7 text-white/75">{card.venueName}<br/>{card.dateLabel}</p><dl className="mt-4 space-y-3 text-base leading-7"><div><dt className="font-semibold text-champagne">{featuredViews.get(card.id)!.labels.hours}</dt><dd data-halloween-comparison-hours={card.id}>{featuredViews.get(card.id)!.hours}</dd></div><div><dt className="font-semibold text-champagne">{featuredViews.get(card.id)!.labels.admission}</dt><dd data-halloween-comparison-admission={card.id}>{featuredViews.get(card.id)!.admission.map((line,index)=><p key={index}>{line}</p>)}</dd></div><div><dt className="font-semibold text-champagne">{featuredViews.get(card.id)!.labels.tables}</dt><dd data-halloween-comparison-tables={card.id}>{featuredViews.get(card.id)!.tables}</dd></div></dl></li>)}</ul>
      </section>
    </section> : null}
    <section className="mt-12" aria-labelledby="halloween-events-heading"><h2 id="halloween-events-heading" className="mx-auto max-w-7xl px-5 pb-6 font-serif text-3xl font-bold lg:px-8">{featuredCards.length ? selection!.otherHeading : copy.labels.heading}</h2><OctoberCalendarClient cards={otherCards} labels={{...copy.labels,heading:featuredCards.length ? selection!.otherHeading : copy.labels.heading}} /></section>
    {familyCards.length && familyUi ? <section className="mt-12" aria-labelledby="halloween-family-heading" data-halloween-family-culture><h2 id="halloween-family-heading" className="mx-auto max-w-7xl px-5 font-serif text-3xl font-bold lg:px-8">{familyUi.heading}</h2><p className="mx-auto mt-4 max-w-7xl px-5 pb-6 text-base leading-7 text-white/80 lg:px-8">{familyUi.introduction}</p><OctoberCalendarClient cards={familyCards} labels={{...copy.labels,heading:familyUi.heading}}/></section>:null}
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div data-halloween-primary-body className="max-w-4xl text-base leading-8 text-white/85">
        <HeadingIndex locale={locale} entries={entries} />
        {featuredCards.length ? body.intro.map((paragraph, index) => <p key={index} data-halloween-body-paragraph className="mt-5">{linkFirstHalloweenMentions(paragraph, mentions, mentionedEvents)}</p>) : null}
        <h2 className="mt-10 font-serif text-3xl font-bold">{copy.labels.heading}</h2>
        {body.sections.map((section, index) => <section key={entries[index].id} className="mt-10" aria-labelledby={entries[index].id}>
          <h3 id={entries[index].id} className="font-serif text-2xl font-bold text-champagne">{section.heading}</h3>
          {section.paragraphs.map((paragraph, position) => <p key={position} data-halloween-body-paragraph className="mt-5">{linkFirstHalloweenMentions(paragraph, mentions, mentionedEvents)}</p>)}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">{localizedImages.map((image, position) => ({ image, position })).filter(({ position }) => index === 0 ? position < 2 : position >= 2).map(({ image, position }) =>
            <figure key={image.src}><Image quality={92} src={image.src} alt={image.alt} title={image.title} width={image.width} height={image.height} sizes="(max-width: 639px) 100vw, 640px" className="h-auto w-full rounded-xl object-contain" />{position === 4 && <figcaption className="mt-3 text-base leading-7 text-white/70">{body.editorialImageCaption}</figcaption>}</figure>
          )}</div>
        </section>)}
      </div>
    </div>
    <section className="mx-auto mt-16 max-w-5xl px-5 lg:px-8" aria-labelledby="halloween-faq-heading"><h2 id="halloween-faq-heading" className="font-serif text-3xl font-bold">{copy.faqHeading}</h2><div className="mt-8 space-y-8">{body.faqs.map((faq, index) => <article key={faq.question}><h3 id={faqEntries[index].id} className="text-xl font-semibold text-champagne">{faq.question}</h3><p className="mt-2 text-base leading-8 text-white/80">{faq.answer}</p></article>)}</div></section>
    <aside data-related-navigation="card" className="mx-auto mt-16 max-w-5xl px-5 lg:px-8" aria-labelledby="halloween-related-heading"><h2 id="halloween-related-heading" className="font-serif text-3xl font-bold">{body.h1}</h2><nav aria-label={body.h1}><ul className="mt-6 grid gap-4 sm:grid-cols-2">{cards.map(card => <li key={card.id}><Link href={card.href} prefetch={false} className="inline-flex min-h-11 items-center text-base underline underline-offset-4">{card.title}</Link></li>)}</ul></nav></aside>
    <EditorialPageSections locale={locale} path={`${localePrefix(locale)}/events/${HALLOWEEN_LEGACY_SLUG}`} />
  </main>;
}
