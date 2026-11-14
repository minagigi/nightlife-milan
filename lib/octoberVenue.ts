import { getVenueById } from '@/lib/data';
import { eventVenueFromCatalog } from '@/lib/eventVenueAdapters';
import { buildVenueDescription } from '@/lib/eventPageLocale';
import { formatEventVenueAddress, type EventVenueSectionVenue } from '@/lib/eventVenueSection';
import type { OctoberEventRecord } from '@/lib/october-events/types';
import type { LocaleCode } from '@/lib/i18n/locales';

/** Shared by HTML, schema and the release artifact contract. */
export function getOctoberVenue(event:OctoberEventRecord,locale:LocaleCode):EventVenueSectionVenue|null {
  if(event.venue.addressStatus==='source_conflict')return null;
  const catalog=getVenueById(event.venue.id==='v-55'?'v-55milano':event.venue.id);
  const address=event.venue.structuredAddress;
  if(!address)throw new Error(`Missing verified October address: ${event.id}`);
  const existing=catalog?eventVenueFromCatalog(catalog,locale):null;
  // Use the verified address saved with this occurrence; catalog copy contributes the native venue description and club link.
  return {
    name:event.venue.name,
    address,
    description:existing?.description||buildVenueDescription(locale,event.venue.name,formatEventVenueAddress(address)),
    ...(existing?.href?{href:existing.href}:{}),
    ...(event.venue.latitude!==null&&event.venue.longitude!==null?{coordinates:{latitude:event.venue.latitude,longitude:event.venue.longitude}}:{}),
  };
}
