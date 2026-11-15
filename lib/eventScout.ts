export interface ScoutedEvent {
  ebId: string;
  url: string;
  rawTitle: string;
  rawDescription: string;
  dateISO: string;
  endISO?: string;
  venueId: string;
  rawVenueName: string;
  rawOrganizer: string;
  entryPrice: number;
  currency: string;
  genreHint?: string;
  posterUrl?: string;
}

export async function scoutThirdPartyEvents(): Promise<ScoutedEvent[]> {
  return [];
}
