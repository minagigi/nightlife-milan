import type { Metadata } from 'next';
import EditorialPageSections from '@/components/EditorialPageSections';
import OctoberCalendarClient, { type OctoberCalendarCard } from '@/components/OctoberCalendarClient';
import { getLocaleDef, indexedLocaleCodes, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { readOctoberEventCopy, readOctoberHubCopy } from '@/lib/octoberEditorial';
import { OCTOBER_EVENTS } from '@/lib/octoberEvents';
import { formatOctoberEventDate } from '@/lib/octoberEventSeo';
import { getDateSensitiveInventory } from '@/lib/dateSensitiveInventory';
import { getVenuePriorityRank } from '@/lib/dateSensitiveView';
import { jsonLdString } from '@/lib/seo';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';

export const revalidate = false;

type Props={params:Promise<{locale:string}>};
const BASE='https://nightlifemilan.com';
export function generateStaticParams(){return indexedLocaleCodes.map(locale=>({locale}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale}=await params,code=locale as LocaleCode,copy=await readOctoberHubCopy(code);
  const canonical=`${BASE}${localePrefix(code)}/events/october-2026`;
  const firstEvent = OCTOBER_EVENTS[0];
  const heroImg = `${BASE}/images/events/october-2026/249146-bbdee1490af9.webp`;
  return {title:{absolute:copy.metaTitle},description:copy.metaDescription,alternates:{canonical,languages:Object.fromEntries([...indexedLocaleCodes.map(l=>[getLocaleDef(l)!.hreflang,`${BASE}${localePrefix(l)}/events/october-2026`]),['x-default',`${BASE}/events/october-2026`]])},robots:{index:true,follow:true},openGraph:{type:'website',title:copy.metaTitle,description:copy.metaDescription,url:canonical,locale:getLocaleDef(code)?.ogLocale,siteName:'Nightlife Milan',images:[{url:heroImg,width:firstEvent?.image.width||1344,height:firstEvent?.image.height||752,alt:copy.labels.heading}]},twitter:{card:'summary_large_image',title:copy.metaTitle,description:copy.metaDescription,images:[heroImg],site:'@nightlifemilan'}};
}
export default async function October2026EventsPage({params}:Props){
  const {locale}=await params,code=locale as LocaleCode,copy=await readOctoberHubCopy(code),prefix=localePrefix(code);
  const scarcity = getScarcityAndChatCopy(code);
  const baseCards:OctoberCalendarCard[]=await Promise.all(OCTOBER_EVENTS.filter((event) => event.startISO.slice(0, 10) >= "2026-10-18").map(async event=>{
    const text=await readOctoberEventCopy(event,code);
    return {id:event.id,href:`${prefix}/events/${text.slug}`,title:text.title,summary:text.summary,dateKey:event.startISO.slice(0,10),dateLabel:formatOctoberEventDate(code,event.startISO),venueId:event.venue.id,venueName:event.venue.name,image:{...event.image,alt:text.imageAlt},statusBadge:scarcity.almostSoldOutBadge,openEventCtaLabel:scarcity.openEventCardCta,booking:event.affiliateStatus==='verified'&&event.affiliateUrl?{href:event.affiliateUrl,label:text.labels.offers,affiliate:true}:undefined};
  }));
  const supplementalInv = (await getDateSensitiveInventory(code)).filter(
    (item) => item.id.startsWith('priority-') && item.dateISO.slice(0, 10) >= '2026-10-18',
  );
  const supplementalCards: OctoberCalendarCard[] = supplementalInv.map((item) => ({
    id: item.id,
    href: `${prefix}/events/${item.slug}`,
    title: item.title,
    summary: `${item.title} — ${item.venueName} (${item.labels.longDate})`,
    dateKey: item.dateISO.slice(0, 10),
    dateLabel: formatOctoberEventDate(code, item.dateISO),
    venueId: item.venueId || item.venueName,
    venueName: item.venueName,
    image: { src: item.image, width: 1200, height: 675, alt: item.title },
    statusBadge: scarcity.almostSoldOutBadge,
    openEventCtaLabel: scarcity.openEventCardCta,
    booking: item.affiliateUrl ? { href: item.affiliateUrl, label: 'Xceed', affiliate: true } : undefined,
  }));
  const cards: OctoberCalendarCard[] = [...baseCards, ...supplementalCards].sort(
    (a, b) =>
      (a.dateKey >= '2026-11-02' ? 0 : 1) - (b.dateKey >= '2026-11-02' ? 0 : 1) ||
      getVenuePriorityRank(a.venueId || a.venueName) - getVenuePriorityRank(b.venueId || b.venueName) ||
      a.dateKey.localeCompare(b.dateKey) ||
      a.id.localeCompare(b.id),
  );
  const graph={'@context':'https://schema.org','@type':'ItemList',name:copy.labels.heading,numberOfItems:cards.length,itemListElement:cards.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.title,url:BASE+c.href}))};
  return <main className="min-h-screen bg-[#131009] pb-24 text-white" data-october-hub><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLdString(graph)}}/><header className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><p className="text-base font-semibold text-champagne">Nightlife Milan</p><h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl">{copy.labels.heading}</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">{copy.labels.introduction}</p><p className="mt-4 max-w-3xl text-base leading-7 text-white/70">{copy.labels.sourceNotice}</p></header><OctoberCalendarClient cards={cards} labels={copy.labels}/><EditorialPageSections locale={code} path={`${localePrefix(code)}/events/october-2026`} /></main>;
}
