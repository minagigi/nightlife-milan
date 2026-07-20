export interface WorldCupExistingEvent {
  id: string;
  status?: string;
  url?: string;
  name?: { text?: string };
  description?: { html?: string };
  start?: { utc?: string };
}

/**
 * The curated marker is the only safe identity across locales. Several native
 * keyword titles intentionally collide between Croatian/Bosnian,
 * Swedish/Norwegian and Serbian/Bosnian.
 */
export function exactWorldCupMarkerMatches(
  marker: string,
  events: WorldCupExistingEvent[],
): WorldCupExistingEvent[] {
  return events.filter((event) => event.description?.html?.includes(`<!-- ${marker} -->`));
}
