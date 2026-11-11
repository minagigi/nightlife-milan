'use client';
import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import type { OctoberHubLabels } from '@/lib/october-events/types';
import { getVenuePriorityRank } from '@/lib/dateSensitiveView';

export type OctoberCalendarCard=Readonly<{id:string;href:string;title:string;summary:string;dateKey:string;dateLabel:string;dateKeys?:readonly string[];dateLabels?:readonly string[];venueId:string;venueName:string;image?:{src:string;width:number;height:number;alt:string};anchorId?:string;canonicalDetail?:boolean;statusBadge?:string;openEventCtaLabel?:string;booking?:Readonly<{href:string;label:string;affiliate:boolean}>}>;
function subscribe(listener:()=>void){
  window.addEventListener('popstate',listener);
  window.addEventListener('october-filter-change',listener);
  return ()=>{window.removeEventListener('popstate',listener);window.removeEventListener('october-filter-change',listener);};
}
const browserQuery=()=>window.location.search;
const serverQuery=()=>'';
export default function OctoberCalendarClient({cards,labels}:{cards:readonly OctoberCalendarCard[];labels:OctoberHubLabels}){
  const query=new URLSearchParams(useSyncExternalStore(subscribe,browserQuery,serverQuery));
  const wantedVenue=query.get('venue')||'',wantedDate=query.get('date')||'';
  const venue=cards.some(c=>c.venueId===wantedVenue)?wantedVenue:'';
  const date=cards.some(c=>(c.dateKeys||[c.dateKey]).includes(wantedDate))?wantedDate:'';
  const venues=[...new Map(cards.map(c=>[c.venueId,c.venueName])).entries()].sort((a,b)=>getVenuePriorityRank(a[0]||a[1])-getVenuePriorityRank(b[0]||b[1])||a[1].localeCompare(b[1]));
  const dates=[...new Map(cards.flatMap(c=>(c.dateKeys||[c.dateKey]).map((key,index)=>[key,c.dateLabels?.[index]||c.dateLabel] as const))).entries()].sort((a,b)=>a[0].localeCompare(b[0]));
  const filtered=cards.filter(c=>(!venue||c.venueId===venue)&&(!date||(c.dateKeys||[c.dateKey]).includes(date)));
  function update(nextVenue:string,nextDate:string){
    const url=new URL(window.location.href);
    for(const [key,value] of [['venue',nextVenue],['date',nextDate]]){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);}
    window.history.replaceState(null,'',url);
    window.dispatchEvent(new Event('october-filter-change'));
  }
  return <>
    <section aria-label={labels.filters} className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-5 rounded-2xl border border-white/15 p-5 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-base font-semibold">{labels.venue}<select value={venue} onChange={e=>update(e.target.value,date)} className="min-h-12 rounded-lg border border-white/25 bg-black px-3 text-white"><option value="">{labels.allVenues}</option>{venues.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
      <label className="flex flex-col gap-2 text-base font-semibold">{labels.date}<select value={date} onChange={e=>update(venue,e.target.value)} className="min-h-12 rounded-lg border border-white/25 bg-black px-3 text-white"><option value="">{labels.allDates}</option>{dates.map(([id,name])=><option key={id} value={id}>{name}</option>)}</select></label>
    </div><p className="mt-4 text-base text-white/70" role="status" aria-live="polite">{filtered.length} / {cards.length}</p></section>
    <section className="mx-auto mt-8 max-w-7xl px-5 lg:px-8" aria-label={labels.heading}>{filtered.length?<div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map(c=><article key={c.id} id={c.anchorId} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]" data-october-card={c.id}>
      <Link href={c.href} prefetch={false} aria-label={`${c.title} · ${c.dateLabel}`} className="block rounded-2xl outline-offset-[-3px] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne">{c.image?<Image quality={92} src={c.image.src} alt={c.image.alt} title={c.image.alt} width={c.image.width} height={c.image.height} className="block h-auto w-full bg-black/30 object-contain" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 40vw"/>:null}
      <div className="p-5">{c.statusBadge?<div className="mb-3"><span className="inline-flex rounded-full border border-[#F6F1E7]/35 bg-[#050505]/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#EAE3D5]" data-selling-fast-badge>{c.statusBadge}</span></div>:null}<p className="text-base text-champagne">{c.dateLabel}</p><h2 className="mt-3 font-serif text-2xl font-bold leading-tight">{c.title}</h2><p className="mt-3 text-base text-white/75">{c.venueName}</p><p className="mt-4 text-base leading-7 text-white/70">{c.summary}</p>{c.canonicalDetail!==false&&!c.openEventCtaLabel?<span className="mt-5 inline-flex min-h-11 items-center text-base text-champagne underline underline-offset-4">{labels.openEvent}</span>:null}</div></Link>
      {c.openEventCtaLabel?<div className="px-5 pb-5"><Link href={c.href} prefetch={false} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-champagne px-4 py-3 text-center text-base font-bold text-black transition hover:bg-white">{c.openEventCtaLabel}</Link></div>:c.booking?<div className="px-5 pb-5"><a href={c.booking.href} target="_blank" rel={c.booking.affiliate?'sponsored noopener noreferrer':'noopener noreferrer'} className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-champagne px-4 py-3 text-center text-base font-bold text-black">{c.booking.label}</a></div>:null}
    </article>)}</div>:<p className="rounded-2xl border border-white/15 p-6 text-base">{labels.empty}</p>}</section>
  </>;
}
