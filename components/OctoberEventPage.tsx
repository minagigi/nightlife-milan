import Link from '@/components/LocalizedLink';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { MessageCircle, Ticket } from 'lucide-react';
import EventCoverHero from '@/components/EventCoverHero';
import EventVenueSection from '@/components/EventVenueSection';
import CuratedSpecialEvents from '@/components/CuratedSpecialEvents';
import { getOctoberVenue } from '@/lib/octoberVenue';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { jsonLdString } from '@/lib/seo';
import { buildOctoberEventGraph, formatOctoberEventDate } from '@/lib/octoberEventSeo';
import { getOctoberHubCopy } from '@/lib/october-events/copy';
import EventTemporalBoundary from '@/components/EventTemporalBoundary';
import { getEventTemporalCopy } from '@/lib/i18n/eventTemporalCopy';
import { octoberOfferConditions, octoberSourceConflict } from '@/lib/october-events/conditions';
import { readOctoberEventCopy } from '@/lib/octoberEditorial';
import { OCTOBER_EVENTS_INVENTORY } from '@/lib/octoberEvents';
import { currentOfferReadbackCopy } from '@/lib/currentOfferReadbackCopy';
import { getScriptFont } from '@/lib/scriptFonts';
import type { OctoberEventRecord } from '@/lib/october-events/types';
import { getLocaleDef, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import gallery from '@/lib/october-events/gallery.json';
import { octoberGalleryImageLabel, octoberGalleryContext } from '@/lib/october-events/galleryLabels';
import { getMonthEventLocalePack } from '@/lib/month-events/locales';
import { octoberAddressConflict } from '@/lib/october-events/addressStatus';
import { getRaConditionTexts } from '@/lib/october-events/raConditionsAdapter';
import { formatOctoberProgrammeDateRange } from '@/lib/october-events/festivalPeriod';
import { sanitizePublicEventJsonLd } from '@/lib/publicOutboundLinks';
import { getJustmePage, justmeBodyImages } from '@/lib/october-events/justmeContract';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import { buildSeoEventImagePack } from '@/lib/seoEventImages';
import { getOctoberEventSlug } from '@/lib/october-events/copy';

const h2='font-serif text-2xl font-bold leading-tight text-champagne';
const h3='font-serif text-xl font-semibold leading-tight';
const paragraph='mt-4 text-lg leading-relaxed text-white/75';

export default async function OctoberEventPage({event,locale,initialNow,children}:{event:OctoberEventRecord;locale:LocaleCode;initialNow:string;children?:ReactNode}) {
  const copy=await readOctoberEventCopy(event,locale),hub=getOctoberHubCopy(locale),prefix=localePrefix(locale);
  const date=formatOctoberEventDate(locale,event.startISO),poster=copy.imageAlt;
  const programmePeriod=event.programmeDateRange?`${getMonthEventLocalePack(locale).labels.programme}: ${formatOctoberProgrammeDateRange(locale,event.programmeDateRange)}`:null;
  const inquiry=getConciergeBookingUrl(locale,`${event.officialName} · ${date} · ${event.venue.name}`);
  const money=new Intl.NumberFormat(getLocaleDef(locale)?.hreflang||locale,{style:'currency',currency:'EUR'});
  const checkedAt=event.commercialCheckedAt||OCTOBER_EVENTS_INVENTORY.sourceCheckedAt;
  const soldOut=currentOfferReadbackCopy(locale,checkedAt).soldOut;
  const temporal=getEventTemporalCopy(locale,checkedAt);
  const beforeEnd=Boolean(event.endISO&&Date.parse(initialNow)<Date.parse(event.endISO));
  const hasAdmission=event.offers.some(o=>['ticket','guestlist','table'].includes(o.category)&&o.availability==='available');
  const venueImages=gallery.filter(image=>image.venueId===event.venue.id);
  const venueGalleryCopy=getMonthEventLocalePack(locale);
  const venue=getOctoberVenue(event,locale);
  const admissionNotices=getRaConditionTexts(locale,event.admissionConditions||[]);
  const justmePage=getJustmePage(event,locale);
  const justmeImages=justmeBodyImages(event,locale);
  const scarcity=getScarcityAndChatCopy(locale);
  const eventSlug=getOctoberEventSlug(event);
  const seoPack=buildSeoEventImagePack({
    locale,
    eventSlug,
    venueName: event.venue.name,
    h1: copy.title,
    h2List: [copy.headings.overview, copy.headings.booking, copy.headings.faq],
    h3List: copy.sections.slice(0, 4).map((s) => s.heading),
    posterSrc: event.image.src,
    isHalloween: eventSlug.includes('halloween') || event.id.includes('halloween'),
  });
  const hasXceed=Boolean(event.affiliateStatus==='verified'&&event.affiliateUrl&&hasAdmission);
  const actions=<div className="space-y-3">
    <div className="mb-2 flex items-center justify-center"><span className="inline-flex rounded-full border border-amber-400/80 bg-amber-500/20 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300" data-almost-sold-out-badge>{scarcity.almostSoldOutBadge}</span></div>
    {hasXceed?<EventTemporalBoundary endDateISO={event.endISO} initialBeforeEnd={beforeEnd} beforeEnd={<a href={event.affiliateUrl!} target="_blank" rel="sponsored noopener noreferrer" data-october-affiliate data-event-cta-kind="admission" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3 text-center text-base font-bold text-black transition hover:bg-white focus-visible:ring-2 focus-visible:ring-white"><Ticket className="h-5 w-5 shrink-0" aria-hidden="true"/><span>{copy.labels.offers}</span></a>} afterEnd={<p className="text-base text-white/70">{temporal.endedNotice}</p>}/>:null}
    <a href={inquiry} target="_blank" rel="noopener noreferrer" data-october-inquiry data-analytics-source={`october-${event.id}-inquiry`} className={hasXceed?"inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-champagne px-5 py-3 text-center text-base font-bold text-champagne transition hover:bg-champagne/10 focus-visible:ring-2 focus-visible:ring-white":"inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3 text-center text-base font-bold text-black transition hover:bg-white focus-visible:ring-2 focus-visible:ring-white"}><MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true"/><span>{copy.labels.askWhatsApp}<br/><bdi dir="ltr" className="whitespace-nowrap">+39 351 912 7047</bdi></span></a>
  </div>;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLdString(sanitizePublicEventJsonLd(buildOctoberEventGraph(event,locale,copy)))}}/>
    <main className="min-h-screen bg-[#131009] pb-24 text-white" data-october-event={event.id}>
      <EventCoverHero src={event.image.src} alt={seoPack.poster.alt} imageTitle={seoPack.poster.title} caption={seoPack.poster.description} width={event.image.width} height={event.image.height} eventId={event.id} title={copy.title} venue={event.venue.name} statusBadge={scarcity.almostSoldOutBadge} date={programmePeriod?`${date} · ${programmePeriod}`:date} dateTimeISO={event.startISO}/>
      <div data-event-body style={getScriptFont(locale)?undefined:{fontFamily:'Arial, Helvetica, sans-serif'}}>
        <header className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
          <div className="min-w-0"><nav aria-label={copy.labels.recommendations} className="mb-6 flex min-h-11 flex-wrap gap-2 text-sm text-white/70"><Link href={prefix||'/'} prefetch={false}>Nightlife Milan</Link><span aria-hidden="true">/</span><Link href={`${prefix}/events/october-2026`} prefetch={false}>{hub.labels.heading}</Link><span aria-hidden="true">/</span><span>{event.officialName}</span></nav><div className="mb-3 flex flex-wrap items-center gap-2"><p className="text-base leading-7 text-white/85" data-october-essentials>{date} · {event.venue.name}</p><span className="rounded-full border border-amber-400/80 bg-amber-500/20 px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-300" data-selling-fast-badge>{scarcity.almostSoldOutBadge}</span></div><div role="alert" data-urgency-alert className="my-5 rounded-2xl border-2 border-amber-400/70 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent p-4 sm:p-5 shadow-lg"><p className="text-xs font-extrabold uppercase tracking-wider text-amber-300 sm:text-sm">{scarcity.urgencyAlertTitle}</p><p className="mt-1.5 text-sm leading-relaxed text-white/90">{scarcity.urgencyAlertBody}</p></div><p className={paragraph} data-october-summary data-justme-body-copy={justmePage?'intro':undefined}>{copy.summary}</p>{octoberSourceConflict(event,locale)?<p className="mt-4 text-base leading-7 text-champagne" data-october-source-conflict>{octoberSourceConflict(event,locale)}</p>:null}{event.admissionStatus==='sold_out'?<p className="mt-4 font-semibold text-champagne" data-october-sold-out>{soldOut}</p>:null}</div>
          <aside className="self-start rounded-2xl border border-champagne/25 bg-champagne/[0.06] p-5" aria-label={copy.headings.booking}>{admissionNotices.length?<ul className="mb-5 list-disc space-y-3 ps-5 text-base leading-7 text-white/85" data-october-admission-conditions>{admissionNotices.map(notice=><li key={notice}>{notice}</li>)}</ul>:null}{actions}</aside>
        </header>
        <div className="mx-auto max-w-5xl space-y-16 px-5 py-12 lg:px-8">
          <nav aria-label={copy.headings.overview} data-october-body-index className="rounded-xl border border-white/15 p-5"><ol className="flex flex-wrap gap-5 text-base leading-7 text-champagne">{(justmePage?justmePage.primaryH3:[{id:'october-overview',heading:copy.headings.overview},...copy.sections.slice(0,2).map((sec,idx)=>({id:`october-section-${idx}`,heading:sec.heading})),{id:'october-booking',heading:copy.headings.booking},{id:'october-faq',heading:copy.headings.faq},{id:'october-gallery',heading:venueGalleryCopy.labels.gallery.replace('{venue}',event.venue.name)}]).map(item=><li key={item.id}><a className="underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-white" href={`#${item.id}`}>{item.heading}</a></li>)}</ol></nav>
          <figure className="mx-auto max-w-xl overflow-hidden rounded-xl border border-champagne/30 bg-black/40 shadow-xl" data-october-poster-detail><div className="border-b border-white/10 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-champagne">{seoPack.poster.badgeLabel} · {event.venue.name}</div><Image quality={92} src={event.image.src} alt={seoPack.poster.alt} title={seoPack.poster.title} width={event.image.width} height={event.image.height} sizes="(max-width: 639px) 100vw, 750px" className="h-auto w-full object-contain"/><figcaption className="p-4 text-sm leading-relaxed text-white/80"><strong className="block text-base text-champagne">{seoPack.poster.title}</strong><span className="mt-1 block">{seoPack.poster.description}</span></figcaption></figure>
          <section aria-labelledby="october-overview"><h2 id="october-overview" className={h2}>{copy.headings.overview}</h2>{justmePage?<h3 id={justmePage.primaryH3[0].id} className={`${h3} mt-6`}>{justmePage.primaryH3[0].heading}</h3>:null}<div className="mt-8 space-y-8">{copy.sections.slice(0,4).map((s,i)=><section key={i} aria-labelledby={`october-section-${i}`}>{justmePage?<h4 id={`october-section-${i}`} className={h3}>{s.heading}</h4>:<h3 id={`october-section-${i}`} className={h3}>{s.heading}</h3>}<p className={paragraph} data-justme-body-copy={justmePage?`section${i}`:undefined}>{s.body}</p></section>)}</div></section>
          {justmeImages.length?<section aria-label={copy.labels.venue} data-justme-body-images className="grid items-start gap-6 sm:grid-cols-2">{justmeImages.map(image=><figure key={image.key} className={`overflow-hidden rounded-xl border border-white/10 bg-black/30 ${image.key==='cocktailPortrait'?'max-w-[480px]':''}`}><Image quality={92} src={image.src} alt={image.alt} title={image.alt} width={image.width} height={image.height} sizes="(max-width: 639px) 100vw, 640px" className="h-auto w-full object-contain"/><figcaption className="p-4 text-base leading-7 text-white/75">{image.caption}</figcaption></figure>)}</section>:null}
          <section aria-labelledby="october-booking"><h2 id="october-booking" className={h2}>{copy.headings.booking}</h2>{justmePage?<h3 id={justmePage.primaryH3[1].id} className={`${h3} mt-6`}>{justmePage.primaryH3[1].heading}</h3>:null}<div className="mt-8 space-y-8">{copy.sections.slice(4).map((s,i)=><section key={i} aria-labelledby={`october-section-${i+4}`}>{justmePage?<h4 id={`october-section-${i+4}`} className={h3}>{s.heading}</h4>:<h3 id={`october-section-${i+4}`} className={h3}>{s.heading}</h3>}<p className={paragraph} data-justme-body-copy={justmePage?`section${i+4}`:undefined}>{s.body}</p></section>)}</div><div className="my-8 max-w-md">{actions}</div><p className={h3}>{copy.labels.offers}</p><p className="mt-3 text-base leading-7 text-white/70">{hub.labels.sourceNotice}</p>{event.endISO?<EventTemporalBoundary endDateISO={event.endISO} initialBeforeEnd={beforeEnd} beforeEnd={null} afterEnd={<p className="mt-3 text-base text-white/70">{temporal.historicalOffers}</p>}/>:null}
            {event.offers.length?<ul className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 px-5" data-october-offers>{event.offers.map((offer,i)=><li key={i} className="flex flex-wrap items-start justify-between gap-4 py-4 text-base"><span className="min-w-0 flex-1"><bdi>{offer.name}</bdi>{octoberOfferConditions(offer,locale).map(condition=><span key={condition} className="mt-1 block text-white/80">{condition}</span>)}{offer.availability==='sold_out'?<span className="mt-1 block text-white/65">{soldOut}</span>:null}</span><span className="font-semibold text-champagne">{offer.price===null?copy.labels.noKnownValue:money.format(offer.price)}</span></li>)}</ul>:admissionNotices.length?<ul className="mt-5 list-disc space-y-3 ps-5 text-base leading-7 text-white/80">{admissionNotices.map(notice=><li key={notice}>{notice}</li>)}</ul>:<p className="mt-4 text-base text-white/70">{copy.labels.noKnownValue}</p>}
            {justmePage?<div className="mt-12 space-y-10" data-justme-expansion>{justmePage.expansionSections.map((section,i)=><section key={i}><h4 className={h3}>{section.heading}</h4>{section.body.split(/\n\s*\n/u).map((body,j)=><p key={j} className={paragraph} data-justme-body-copy={`expansion${i}-${j}`}>{body}</p>)}</section>)}</div>:null}
          </section>
          <section aria-labelledby="october-faq"><h2 id="october-faq" className={h2}>{copy.headings.faq}</h2><div className="mt-7 divide-y divide-white/10 border-y border-white/10">{copy.faqs.map((faq,i)=>justmePage?<section key={i} className="py-5" data-october-faq={i+1}><h3 className="font-serif text-lg font-semibold leading-snug" data-justme-body-copy={`faq${i}-question`}>{faq.question}</h3><p className="pt-3 text-base leading-7 text-white/75" data-justme-body-copy={`faq${i}-answer`}>{faq.answer}</p></section>:<details key={i} className="group py-5" data-october-faq={i+1}><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 marker:hidden focus-visible:ring-2 focus-visible:ring-champagne"><h3 className="font-serif text-lg font-semibold leading-snug">{faq.question}</h3><span className="text-2xl text-champagne group-open:rotate-45" aria-hidden="true">+</span></summary><p className="pt-3 text-base leading-7 text-white/75">{faq.answer}</p></details>)}</div></section>
          <section aria-labelledby="october-gallery" data-october-gallery data-seo-flow-gallery className="rounded-2xl border border-white/10 bg-[#18140c] p-6 sm:p-8"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-champagne">{seoPack.eyebrow}</p><h3 id="october-gallery" className={`${h3} mt-1 text-white`}>{seoPack.sectionHeading}</h3><p className="mt-2 text-sm leading-relaxed text-white/75">{seoPack.sectionSubtitle}</p><div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 font-semibold text-champagne">{seoPack.targetPrefix}: {seoPack.targetLabel}</span><span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-semibold text-white/90">{seoPack.outfitPrefix}: {seoPack.outfitLabel}</span></div><div className="mt-6 grid items-start gap-6 sm:grid-cols-2">{seoPack.gallery.map((img,idx)=><figure key={img.src} data-seo-flow-item={idx+1} className="overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-md"><div className="relative aspect-[16/9] w-full overflow-hidden bg-black"><Image quality={92} src={img.src} alt={img.alt} title={img.title} width={1376} height={768} sizes="(max-width: 639px) 100vw, 640px" className="h-full w-full object-cover"/></div><figcaption className="p-4 text-xs sm:text-sm leading-relaxed text-white/80"><strong className="block font-serif text-base font-bold text-champagne">{img.title}</strong><span className="mt-1.5 block text-white/75">{img.description}</span></figcaption></figure>)}</div></section>
          {venue?<EventVenueSection locale={locale} venue={venue}/>:<section className="mt-12 border-t border-white/10 pt-10" aria-label={copy.labels.venueSection}><h3 className={h3}>{event.venue.name}</h3><p className={paragraph} data-event-venue-unavailable={locale}>{octoberAddressConflict(event,locale)}</p></section>}
        </div>
        <CuratedSpecialEvents locale={locale} surface="event" excludeEventId={`october-${event.id}`} headingLevel={3}/>
        {children}
      </div>
    </main>
  </>;
}
