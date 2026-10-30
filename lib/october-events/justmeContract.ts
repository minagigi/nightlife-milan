import type { LocaleCode } from '@/lib/i18n/locales';
import type { OctoberEventCopy, OctoberEventRecord } from './types';
import pagePack from './justmePages.json';

export const JUSTME_OCTOBER_IDS = new Set(['243579','243613','243609','243605','243601','243592','243585']);

type Page = {
  eventId: string;
  locale: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  introduction: string;
  sections: {heading:string;body:string}[];
  expansionSections: {heading:string;body:string}[];
  faqs: {question:string;answer:string}[];
  primaryH3: {id:string;heading:string}[];
  bodyIndex: string[];
  bodyImages: {key:string;alt:string;caption:string}[];
  bodyWordCount: number;
  bodyCountMethod: string;
  bodyThresholdSatisfied: boolean;
};

const BODY_IMAGES: Record<string,{src:string;width:number;height:number}> = {
  exterior: {src:'/images/events/october-2026/justme-body/justme-venue-exterior.webp',width:1000,height:563},
  interior: {src:'/images/events/october-2026/justme-body/justme-restaurant-interior.webp',width:1600,height:1067},
  cocktailPortrait: {src:'/images/events/october-2026/justme-body/justme-cocktail-portrait.webp',width:480,height:600},
  aperitifCocktail: {src:'/images/events/october-2026/justme-body/justme-aperitif-cocktail.webp',width:1080,height:1080},
  tower: {src:'/images/events/october-2026/justme-body/torre-branca-night.webp',width:1300,height:1300},
};

export function getJustmePage(event:OctoberEventRecord,locale:LocaleCode):Page|null {
  if(!JUSTME_OCTOBER_IDS.has(event.id))return null;
  const page=(pagePack.pages as Record<string,Record<string,Page>>)[event.id]?.[locale];
  if(!page || page.eventId!==event.id || page.locale!==locale || page.sections.length!==8 || page.expansionSections.length!==4 || page.faqs.length!==25 ||
     page.primaryH3.length!==2 || page.bodyIndex.length!==2 || page.bodyImages.length!==5 ||
     page.bodyIndex.some((id,index)=>id!==page.primaryH3[index].id) || !page.bodyThresholdSatisfied || page.bodyWordCount<1500 ||
     page.bodyImages.some(image=>!BODY_IMAGES[image.key] || !image.alt || !image.caption)){
    throw new Error(`Incomplete Justme editorial page ${event.id}/${locale}`);
  }
  return page;
}

export function applyJustmePage(base:OctoberEventCopy,event:OctoberEventRecord,locale:LocaleCode):OctoberEventCopy {
  const page=getJustmePage(event,locale);
  if(!page)return base;
  if(page.slug!==base.slug)throw new Error(`Justme slug drift ${event.id}/${locale}`);
  return {...base,title:page.title,summary:page.introduction,introduction:page.introduction,
    metaTitle:base.metaTitle,metaDescription:base.metaDescription,sections:page.sections,faqs:page.faqs};
}

export function justmeBodyImages(event:OctoberEventRecord,locale:LocaleCode){
  const page=getJustmePage(event,locale) || (event.venue.id==='v-justme' ? (pagePack.pages as Record<string,Record<string,Page>>)['243579']?.[locale] : null);
  return page?.bodyImages.map(image=>({...BODY_IMAGES[image.key],...image}))||[];
}
