import type { LocaleCode } from '@/lib/i18n/locales';
import { enabledLocaleCodes } from '@/lib/i18n/locales';
import events from './selection.events.json';
import ui from './selection.ui.json';
import familyUi from './selection.family-ui.json';
export type HalloweenSelectionUi = Readonly<{featuredHeading:string;featuredIntroduction:string;recommendedLabel:string;otherHeading:string;comparisonHeading:string;comparisonIntroduction:string}>;

/** Public allowlist only: private source records, raw descriptions and third-party contacts never enter cards. */
export type HalloweenHubEvent = Readonly<{
  id: string; title: string; venueName: string; dates: readonly string[];
  startISO: string | null; endISO: string | null;
  category: 'club-party' | 'family-culture'; canonicalEventId: string | null; affiliateUrl: string | null;
}>;
export const HALLOWEEN_FEATURED_IDS = ['justme','pineta','aria','55','voya','magazzini','tocqueville','fabbrica'] as const;
export const HALLOWEEN_SELECTION_EVENTS = events as readonly HalloweenHubEvent[];
export const HALLOWEEN_SELECTION_UI = ui as Readonly<Record<LocaleCode, HalloweenSelectionUi>>;
export const HALLOWEEN_FAMILY_UI: Readonly<Record<LocaleCode, readonly string[]>> = familyUi;

export function halloweenHubCollections(selection: readonly HalloweenHubEvent[] = HALLOWEEN_SELECTION_EVENTS) {
  const allowed = ['id','title','venueName','dates','startISO','endISO','category','canonicalEventId','affiliateUrl'];
  if (selection.length!==30 || new Set(selection.map(event=>event.id)).size!==30) throw new Error('HALLOWEEN_SELECTION_INPUTS_HOLD: expected attested 8+22');
  for (const event of selection) {
    halloweenEventAnchor(event.id);
    if (Object.keys(event).some(key=>!allowed.includes(key)) || !event.title.trim() || !event.venueName.trim()
      || !['club-party','family-culture'].includes(event.category) || !event.dates.length
      || event.dates.some(date=>!/^2026-(10|11)-\d{2}$/u.test(date))
      || (event.startISO!==null && !Number.isFinite(Date.parse(event.startISO)))
      || (event.endISO!==null && (!event.startISO || !Number.isFinite(Date.parse(event.endISO)) || Date.parse(event.endISO)<=Date.parse(event.startISO)))) throw new Error(`HALLOWEEN_SELECTION_INPUTS_HOLD: ${event.id}`);
  }
  for (const locale of enabledLocaleCodes) {
    const labels=HALLOWEEN_SELECTION_UI[locale], family=HALLOWEEN_FAMILY_UI[locale];
    const keys=['featuredHeading','featuredIntroduction','recommendedLabel','otherHeading','comparisonHeading','comparisonIntroduction'];
    if (!labels || Object.keys(labels).length!==6 || keys.some(key=>!String(labels[key as keyof HalloweenSelectionUi]||'').trim())
      || !family || family.length!==2 || family.some(text=>!text.trim())) throw new Error(`HALLOWEEN_NATIVE_SELECTION_UI_HOLD: ${locale}`);
  }
  const featured=HALLOWEEN_FEATURED_IDS.map(id=>{
    const event=selection.find(item=>item.id===id);
    if (!event || event.category!=='club-party') throw new Error(`HALLOWEEN_FEATURED_INPUTS_HOLD: ${id}`);
    return event;
  });
  const others=selection.filter(event=>!featured.some(item=>item.id===event.id)).sort((a,b)=>a.dates[0].localeCompare(b.dates[0]) || (a.startISO||'').localeCompare(b.startISO||'') || a.id.localeCompare(b.id));
  if (others.filter(event=>event.category==='family-culture').length!==10) throw new Error('HALLOWEEN_CATEGORY_INPUTS_HOLD');
  return {featured,others,all:[...featured,...others]};
}

/** Stable same-page destination until a genuine canonical detail record exists. */
export function halloweenEventAnchor(eventId: string): string {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/u.test(eventId)) throw new Error('HALLOWEEN_EVENT_ANCHOR_INPUTS_HOLD');
  return `halloween-event-${eventId}`;
}
