import factsData from './featured.facts.json';
import labelsData from './featured.labels.json';
import { enabledLocaleCodes, type LocaleCode } from '@/lib/i18n/locales';
import { HALLOWEEN_SELECTION_EVENTS } from './selection';

type OfferKind='party'|'aperitif'|'buffet'|'dinner'|'men'|'women'|'door';
type Offer=Readonly<{kind:OfferKind;price:number|null;drinks:number|null;from:string|null;until:string|null;online:boolean;early:boolean;release:boolean;firstRelease:boolean;noDrink:boolean;reservation:boolean;lateAfter:string|null;lateSurcharge:number|null}>;
export type FeaturedFact=Readonly<{id:string;startISO:string;endISO:string|null;offers:readonly Offer[];table:Readonly<{kind:'bottle-budget'|'menu'|'unknown';amount:number|null}>}>;
type Labels=Readonly<Record<'admission'|'tables'|'from'|'drinks'|'party'|'aperitif'|'buffet'|'dinner'|'menu'|'tableBudget'|'inquire'|'online'|'early'|'men'|'women'|'door'|'release'|'firstRelease'|'noDrink'|'reservation'|'afterDinner'|'until'|'surcharge'|'hours'|'notice',string>>;
export const HALLOWEEN_FEATURED_FACTS=factsData as readonly FeaturedFact[];
export const HALLOWEEN_FEATURED_LABELS=labelsData as Readonly<Record<LocaleCode,Labels>>;
const IDS=['justme','pineta','aria','55','voya','magazzini','tocqueville','fabbrica'];
const fieldList='admission tables from drinks party aperitif buffet dinner menu tableBudget inquire online early men women door release firstRelease noDrink reservation afterDinner until surcharge hours notice'.split(' ');
const hold=(what:string):never=>{throw new Error(`HALLOWEEN_FEATURED_FACTS_HOLD: ${what}`);};
function exactKeys(value:object,keys:readonly string[]){if(Object.keys(value).length!==keys.length||Object.keys(value).some(key=>!keys.includes(key)))hold('unexpected fields');}
export function validateFeaturedFacts(facts:readonly FeaturedFact[]=HALLOWEEN_FEATURED_FACTS,labels:Readonly<Record<LocaleCode,Labels>>=HALLOWEEN_FEATURED_LABELS){
  if(facts.length!==8||facts.some((fact,index)=>fact.id!==IDS[index]))hold('eight order');
  for(const locale of enabledLocaleCodes){const native=labels[locale];if(!native)hold('native locale '+locale);exactKeys(native,fieldList);if(Object.values(native).some(text=>typeof text!=='string'||!text.trim()||/https?:|\b\d{10,}\b/iu.test(text)))hold('native text '+locale);}
  for(const fact of facts){
    exactKeys(fact,['id','startISO','endISO','offers','table']);const event=HALLOWEEN_SELECTION_EVENTS.find(item=>item.id===fact.id);
    if(!event||event.startISO!==fact.startISO||event.endISO!==fact.endISO)hold('attested hours '+fact.id);
    if(!fact.offers.length)hold('offers '+fact.id);
    for(const offer of fact.offers){
      exactKeys(offer,['kind','price','drinks','from','until','online','early','release','firstRelease','noDrink','reservation','lateAfter','lateSurcharge']);
      if(!['party','aperitif','buffet','dinner','men','women','door'].includes(offer.kind))hold('offer type');
      if(offer.price!==null&&(!Number.isFinite(offer.price)||offer.price<=0))hold('price');
      if(offer.drinks!==null&&(!Number.isInteger(offer.drinks)||offer.drinks<1||offer.drinks>2))hold('drinks');
      for(const time of[offer.from,offer.until,offer.lateAfter])if(time!==null&&!/^([01]\d|2[0-3]):[0-5]\d$/u.test(time))hold('time');
      for(const flag of[offer.online,offer.early,offer.release,offer.firstRelease,offer.noDrink,offer.reservation])if(typeof flag!=='boolean')hold('flag');
      if(offer.lateSurcharge!==null&&(!Number.isFinite(offer.lateSurcharge)||offer.lateSurcharge<=0||!offer.lateAfter))hold('surcharge');
      if(offer.price===null&&fact.id!=='voya')hold('unpriced offer');
      if(offer.firstRelease!==(fact.id==='aria'||(fact.id==='55'&&offer.kind==='party'))||offer.release!==(fact.id==='fabbrica'))hold('attested release qualifier');
    }
    exactKeys(fact.table,['kind','amount']);if(!['bottle-budget','menu','unknown'].includes(fact.table.kind))hold('table type');
    if(fact.table.kind==='bottle-budget'){if(!Number.isFinite(fact.table.amount)||fact.table.amount!<=0)hold('table budget');}else if(fact.table.amount!==null)hold('invented table price');
    if(fact.id==='voya'&&(fact.table.kind!=='menu'||fact.offers.some(offer=>offer.price!==null)))hold('Voya menu');
    if(fact.id==='fabbrica'&&(fact.table.kind!=='unknown'||!fact.offers[0].noDrink||!fact.offers[0].release))hold('Fabbrica qualifiers');
  }return facts;
}
export function halloweenFeaturedView(id:string,locale:LocaleCode){
  const fact=validateFeaturedFacts().find(row=>row.id===id);if(!fact)return null;
  const labels=HALLOWEEN_FEATURED_LABELS[locale];if(!labels)hold('native locale');
  const currency=(amount:number)=>new Intl.NumberFormat(locale,{style:'currency',currency:'EUR',maximumFractionDigits:2}).format(amount);
  const time=(iso:string)=>new Intl.DateTimeFormat(locale,{hour:'2-digit',minute:'2-digit',hourCycle:'h23',timeZone:'Europe/Rome'}).format(new Date(iso));
  const hours=time(fact.startISO)+(fact.endISO?'–'+time(fact.endISO):'');
  const admission=fact.offers.map(offer=>{
    const parts=[labels[offer.kind]];
    if(offer.price!==null)parts.push((id==='fabbrica'?labels.from+' ':'')+currency(offer.price));
    else parts.push(offer.kind==='dinner'?labels.menu:labels.afterDinner);
    if(offer.drinks!==null)parts.push(labels.drinks+': '+new Intl.NumberFormat(locale).format(offer.drinks));
    if(offer.from)parts.push(labels.hours+': '+offer.from+(offer.until?'–'+offer.until:''));
    if(offer.online)parts.push(labels.online);if(offer.early)parts.push(labels.early);if(offer.release)parts.push(labels.release);if(offer.firstRelease)parts.push(labels.firstRelease);if(offer.noDrink)parts.push(labels.noDrink);if(offer.reservation)parts.push(labels.reservation);
    if(offer.lateSurcharge!==null)parts.push(labels.surcharge+': '+currency(offer.lateSurcharge)+' ('+offer.lateAfter+')');
    return parts.join(' · ');
  });
  const tables=fact.table.kind==='bottle-budget'?`${labels.from} ${currency(fact.table.amount!)} · ${labels.tableBudget}`:fact.table.kind==='menu'?`${labels.dinner} · ${labels.menu} · ${labels.reservation}`:labels.inquire;
  return{labels,hours,admission,tables,summary:admission.join('; ')+' · '+labels.tables+': '+tables};
}
