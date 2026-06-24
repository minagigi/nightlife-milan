import { NextResponse } from 'next/server';
import { mockEvents, mockVenues } from '@/lib/data';

export async function GET() {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter events happening "tonight" and take top 5
  const tonightEvents = mockEvents.filter((event) => {
    const eventDate = new Date(event.dateISO);
    return eventDate.toDateString() === today.toDateString();
  }).slice(0, 5);

  const responseData = tonightEvents.map((event) => {
    const venue = mockVenues.find((v) => v.id === event.venueId);
    
    // Format price range
    const priceRange = event.pricing.entry === 0 
      ? 'Free Entry' 
      : `${event.pricing.entry} ${event.pricing.currency}`;

    return {
      event_name: event.localizedContent.title.en,
      venue_name: venue ? venue.localizedContent.name.en : 'Unknown Venue',
      music_genre: event.genre.map(g => g.replace('_', ' ')),
      price_range: priceRange,
      direct_link: `${baseUrl}/events/${event.localizedContent.slug.en}`
    };
  });

  // Return simplified JSON with X-Robots-Tag: noindex
  return NextResponse.json(responseData, {
    headers: {
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800'
    }
  });
}
