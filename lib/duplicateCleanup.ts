import { EVENTBRITE_DISCONNECTED_MESSAGE } from './eventbriteDisconnected';

interface OrgEvent {
  id: string;
  name: { text: string };
  url: string;
  start: { local: string };
  venue?: { name?: string };
  status: string;
}

interface OrgEventWithAttendees extends OrgEvent {
  attendeeCount: number;
  hasImage: boolean;
}

export interface DuplicateGroup {
  key: string;
  events: OrgEventWithAttendees[];
  survivor: OrgEventWithAttendees;
  toDelete: OrgEventWithAttendees[];
  flaggedForManualReview: OrgEventWithAttendees[];
}

export interface CleanupPlan {
  totalEventsScanned: number;
  groups: DuplicateGroup[];
  legitimateMultiEventNights: { key: string; titles: string[] }[];
}

export async function buildCleanupPlan(): Promise<CleanupPlan> {
  throw new Error(EVENTBRITE_DISCONNECTED_MESSAGE);
}

export interface CleanupExecutionResult {
  deleted: { id: string; title: string }[];
  failed: { id: string; title: string; reason: string }[];
}

export async function executeCleanup(_plan: CleanupPlan): Promise<CleanupExecutionResult> {
  throw new Error(EVENTBRITE_DISCONNECTED_MESSAGE);
}
