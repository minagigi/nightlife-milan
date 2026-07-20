import type { LocalizedEventContent } from './localizedEventContent';
import {
  WORLD_CUP_FINAL_AFFILIATE_URL,
  WORLD_CUP_FINAL_CANONICAL_SLUG,
  WORLD_CUP_FINAL_PHONE,
} from './worldCupFinalIt';

export const WORLD_CUP_FINAL_EN_SLUG = 'world-cup-final-spain-argentina-big-screen-milan-just-me-july-19-2026';
export const WORLD_CUP_FINAL_EN_URL = `https://nightlifemilan.com/events/${WORLD_CUP_FINAL_EN_SLUG}`;

/** Expected English artwork names. The localized media pass creates these files before publication. */
export const WORLD_CUP_FINAL_COVER_EN = {
  src: '/images/events/generated/just-me-world-cup-final-cover-2x1-en-v1.jpg',
  title: 'World Cup final on the big screen at Just Me Milan',
  alt: 'Spain vs Argentina World Cup final cover for Just Me Milan with Sunday July 19, doors at 7:30 PM and kick-off at 9 PM',
  description: 'English 2:1 recomposition of the approved poster with Just Me, both players, the date and verified event times.',
  width: 2000,
  height: 1000,
} as const;

export const WORLD_CUP_FINAL_POSTER_EN = {
  src: '/images/events/generated/just-me-world-cup-final-poster-5x4-en-v1.jpg',
  title: 'Spain vs Argentina World Cup final poster at Just Me Milan',
  alt: 'English 5:4 poster for Spain vs Argentina at Just Me Milan with both players, Torre Branca, date, times and booking contacts',
  description: 'English 5:4 recomposition of the approved poster with the original hierarchy, event artwork, verified times and contacts.',
  width: 1600,
  height: 1280,
} as const;

export const WORLD_CUP_FINAL_MOOD_IMAGES_EN = [
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-location-5x4-it-v5.jpg',
    title: 'Torre Branca beside Just Me Milan',
    alt: 'Torre Branca lit in pink between trees under the evening sky in Parco Sempione, Milan',
    description: 'English 5:4 event image recomposed from a real photograph of Torre Branca in Parco Sempione.',
    width: 1400,
    height: 1120,
  },
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-aperitivo-real-5x4-it-v5.jpg',
    title: 'Aperitif buffet at Just Me Milan',
    alt: 'Just Me Milan buffet with savoury dishes, desserts and two members of staff serving guests',
    description: 'English 5:4 event image recomposed from a real photograph of the Just Me Milan aperitif buffet.',
    width: 1400,
    height: 1120,
  },
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-lounge-tavoli-real-5x4-it-v5.jpg',
    title: 'Lounge and tables at Just Me Milan',
    alt: 'Just Me Milan lounge with black sofas, low tables, pink lighting and venue signs',
    description: 'English 5:4 event image based on a real photograph of the lounge and tables at Just Me Milan.',
    width: 1400,
    height: 1120,
  },
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-sala-musica-real-5x4-it-v5.jpg',
    title: 'Evening atmosphere beneath Torre Branca',
    alt: 'Outdoor lounge with guests, sofas and a laid table in front of Torre Branca lit in pink',
    description: 'English 5:4 event image based on a real photograph of the outdoor lounge beside Torre Branca.',
    width: 1400,
    height: 1120,
  },
] as const;

export const worldCupFinalEn: LocalizedEventContent = {
  locale: 'en',
  canonicalSlug: WORLD_CUP_FINAL_CANONICAL_SLUG,
  title: 'World Cup Final on the Big Screen at Just Me Milan',
  metaTitle: 'World Cup Final Big Screen Milan | Just Me',
  metaDescription: 'Watch Spain vs Argentina on the big screen at Just Me Milan on July 19 from 7:30 PM. Book via WhatsApp +39 351 912 7047 and confirm your place before arrival.',
  seoSummary: 'Spain vs Argentina on the big screen at Just Me Milan, July 19 from 7:30 PM. WhatsApp bookings: +39 351 912 7047.',
  answerFirst: 'On Sunday, July 19, 2026, Just Me Milan shows Spain vs Argentina, the 2026 World Cup final, live on the big screen in the garden beneath Torre Branca. Doors open at 7:30 PM, kick-off is at 9 PM, admission is 21+, and the dress code is elegant with long trousers required for men.',
  bookingIntro: 'Buy your ticket or table only through the Nightlife Milan Xceed affiliate link. Eventbrite registration is not an admission ticket and does not guarantee entry. After payment, send your Xceed confirmation on WhatsApp to +39 351 912 7047 with your name, group size, selected option and arrival time.',
  venueDescription: 'Just Me Milan is in Parco Sempione at the foot of Torre Branca. The garden hosts arrivals, the aperitif, the big-screen broadcast and tables. After the final, Uptown Nights continues inside the venue.',
  leadPosterAfterBooking: true,
  programmeBeforeSections: true,
  sections: [
    {
      title: 'Dress code at Just Me Milan for the final',
      body: 'The dress code is elegant for the aperitif, tables and club. Long trousers are required for men. Wear a polished evening look and bring valid photo ID. Entry remains subject to the venue rules and door selection.',
    },
    {
      title: 'Target audience: guests aged 21 and over',
      body: 'This event is for adults aged 21 and over. Bring valid photo ID. An Eventbrite registration, Xceed ticket or table booking does not replace the age check or the venue door policy.',
    },
    {
      title: 'Mood: big-screen football, aperitif and tables',
      body: 'The evening moves from arrival in the garden beneath Torre Branca to the World Cup final on the big screen. From 7:30 PM, Xceed lists an aperitif buffet with one drink and a served-dinner option by reservation. Groups and table guests watch the match in the same outdoor setting.',
    },
    {
      title: 'Music after the final: Uptown Nights',
      body: 'After Spain vs Argentina, Uptown Nights continues until 5 AM. The verified programme includes house, hip-hop, hits, EDM and reggaeton. If the match goes to extra time or penalties, the move to the DJ set follows the actual final whistle.',
    },
  ],
  programme: [
    { start: '7:30 PM', end: '8:15 PM', title: 'Garden opening, check-in and table assignment' },
    { start: '8:15 PM', end: '8:45 PM', title: 'Aperitif, cocktails and pre-match coverage on the big screen' },
    { start: '8:45 PM', end: '9:00 PM', title: 'Guest seating and recommended final arrival window' },
    { start: '9:00 PM', title: 'Spain vs Argentina live on the big screen through the final whistle, including extra time and penalties if required' },
    { start: 'After the final whistle', title: 'Transition from the screening to Uptown Nights' },
    { start: 'Until 5:00 AM', title: 'DJ set with house, hip-hop, hits, EDM and reggaeton' },
  ],
  offers: [
    { name: 'Aperitif + 1 drink', price: 15, category: 'ticket', details: 'Entry from 7:30 PM, aperitif buffet and one drink.' },
    { name: 'Club + 1 drink', price: 15, category: 'ticket', details: 'Club entry from 10:30 PM and one drink.' },
    { name: 'Dance Floor Table', price: 320, category: 'table' },
    { name: 'VIP Area Table', price: 640, category: 'table' },
    { name: 'Super VIP Table - second row', price: 1280, category: 'table' },
    { name: 'Super VIP Table - first row', price: 3200, category: 'table' },
    { name: 'DJ Table', price: 5000, category: 'table' },
  ],
  affiliateUrl: WORLD_CUP_FINAL_AFFILIATE_URL,
  faqs: [
    { question: 'Where can I watch the World Cup final in Milan?', answer: 'Spain vs Argentina will be shown on the big screen at Just Me Milan, in the garden beneath Torre Branca, on Sunday, July 19, 2026.' },
    { question: 'Which teams are playing in the 2026 World Cup final?', answer: 'The listed final is Spain vs Argentina. Kick-off is at 9 PM local time in Milan on Sunday, July 19, 2026.' },
    { question: 'When is Spain vs Argentina in Milan?', answer: 'Spain vs Argentina is on Sunday, July 19, 2026. Just Me opens at 7:30 PM and the big-screen broadcast leads into the 9 PM kick-off.' },
    { question: 'What time does the World Cup final start?', answer: 'Kick-off is scheduled for 9 PM. Arrive between 7:30 PM and 8:30 PM for check-in, the aperitif and table assignment.' },
    { question: 'What time does Just Me open for the final?', answer: 'Doors open at 7:30 PM, the verified time for check-in, the aperitif and table assignment before the match.' },
    { question: 'Will the final really be shown on a big screen?', answer: 'Yes. Spain vs Argentina is the main screening and will be shown live on the big screen in the Just Me Milan garden.' },
    { question: 'Is there an aperitif before Spain vs Argentina?', answer: 'Yes. Xceed lists Aperitif + 1 drink for EUR 15, with entry from 7:30 PM and access to the aperitif buffet.' },
    { question: 'How much is the aperitif for the final?', answer: 'The verified Xceed option is EUR 15 and includes the aperitif buffet and one drink. Recheck price and availability when booking.' },
    { question: 'How much is club entry at Just Me?', answer: 'Xceed lists Club + 1 drink for EUR 15, with club entry from 10:30 PM. This is separate from the 7:30 PM aperitif option.' },
    { question: 'Can I have dinner at Just Me before the match?', answer: 'The Xceed page lists a served-dinner option by reservation. Confirm the menu, time and availability before purchase.' },
    { question: 'What happens after Spain vs Argentina?', answer: 'After the final whistle, Uptown Nights continues with a DJ set, tables and bottle service until 5 AM.' },
    { question: 'What music is played after the match?', answer: 'Uptown Nights lists house, hip-hop, hits, EDM and reggaeton after the screening.' },
    { question: 'Is the event at Just Me Milan 21+?', answer: 'Yes. The Xceed page states 21+. Bring valid photo ID because a registration, ticket or table does not replace the age check.' },
    { question: 'What is the dress code for the final at Just Me?', answer: 'The dress code is elegant. Choose a polished evening look suited to the aperitif and club. Entry remains subject to venue selection.' },
    { question: 'Can men enter in shorts?', answer: 'No. Xceed states that long trousers are required for men, including during the World Cup final screening.' },
    { question: 'Can I book a table to watch the World Cup final?', answer: 'Yes. Xceed lists Dance Floor, VIP Area, Super VIP and DJ tables. Confirm the position and screen view before buying.' },
    { question: 'How much are VIP tables at Just Me Milan?', answer: 'Xceed lists Dance Floor at EUR 320, VIP Area at EUR 640, Super VIP at EUR 1,280 or EUR 3,200, and the DJ Table at EUR 5,000.' },
    { question: 'Does a table guarantee a view of the big screen?', answer: 'The view depends on the assigned position. Before buying, ask for confirmation on WhatsApp at +39 351 912 7047.' },
    { question: 'Where do I buy tickets for Spain vs Argentina at Just Me?', answer: 'Use only the Nightlife Milan Xceed affiliate link on this page. Check the date, selected option and group size before payment.' },
    { question: 'Is an Eventbrite registration an admission ticket?', answer: 'No. Eventbrite records your registration but does not grant admission. Buy a ticket or table through Xceed.' },
    { question: 'Why must I send my Xceed confirmation on WhatsApp?', answer: 'It lets Nightlife Milan check the date, selected option and payment. Send it to +39 351 912 7047 with your name and group size.' },
    { question: 'Where is Just Me Milan?', answer: 'Just Me is at Viale Luigi Camoens 2, 20121 Milan, in Parco Sempione beside Torre Branca.' },
    { question: 'How do I get to Just Me for the final?', answer: 'The address is Viale Luigi Camoens 2, 20121 Milan, inside Parco Sempione. Check current routes and transport before leaving.' },
    { question: 'What happens if the final goes to extra time or penalties?', answer: 'The screening continues until the match ends. The DJ set starts after the actual final whistle.' },
    { question: 'How do I get help with tickets and tables?', answer: 'Before buying, message +39 351 912 7047 on WhatsApp with your name, group size and the option you are considering.' },
  ],
};

export interface WorldCupKeywordEventEn {
  key: string;
  keyword: string;
  title: string;
  summary: string;
  faqLeads: readonly { question: string; answer: string }[];
}

/** Five distinct English search intents. All point to the same canonical website event. */
export const WORLD_CUP_KEYWORD_EVENTS_EN: readonly WorldCupKeywordEventEn[] = [
  {
    key: 'world-cup-final-big-screen-milan',
    keyword: 'World Cup final on a big screen in Milan',
    title: 'World Cup Final on a Big Screen in Milan | Just Me',
    summary: 'World Cup final on the big screen at Just Me Milan, July 19 from 7:30 PM. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Where can I watch the World Cup final on a big screen in Milan?', answer: 'Watch the World Cup final on a big screen in Milan at Just Me, in the garden beneath Torre Branca, on Sunday, July 19, 2026. Doors open at 7:30 PM and Spain vs Argentina starts at 9 PM.' },
      { question: 'Is the World Cup final shown on the big screen at Just Me Milan?', answer: 'Yes. Spain vs Argentina is the main big-screen broadcast at Just Me Milan from the 9 PM kick-off through the final whistle.' },
      { question: 'What time does Just Me open for the big-screen final?', answer: 'Just Me Milan opens at 7:30 PM for check-in and the aperitif. The World Cup final starts at 9 PM.' },
      { question: 'What time is World Cup final kick-off in Milan?', answer: 'Spain vs Argentina kicks off at 9 PM local time in Milan on Sunday, July 19, 2026.' },
      { question: 'What if the World Cup final goes to extra time?', answer: 'The big-screen broadcast continues through extra time and penalties if required. Uptown Nights starts after the final whistle.' },
    ],
  },
  {
    key: 'where-to-watch-spain-argentina-milan',
    keyword: 'where to watch Spain vs Argentina in Milan',
    title: 'Where to Watch Spain vs Argentina in Milan | Just Me',
    summary: 'Watch Spain vs Argentina at Just Me Milan on July 19. Big screen from 9 PM. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Where can I watch Spain vs Argentina in Milan on July 19?', answer: 'For anyone asking where to watch Spain vs Argentina in Milan, Just Me shows the final on the big screen in its garden on Sunday, July 19, 2026. Doors are at 7:30 PM and kick-off is at 9 PM.' },
      { question: 'When is Spain vs Argentina in Milan?', answer: 'Spain vs Argentina is on Sunday, July 19, 2026 at 9 PM local time. Just Me opens at 7:30 PM.' },
      { question: 'Can I watch Spain vs Argentina during the aperitif?', answer: 'The aperitif starts at 7:30 PM before the 9 PM Spain vs Argentina broadcast. Xceed lists a buffet aperitif and one drink.' },
      { question: 'When should I arrive for Spain vs Argentina?', answer: 'Doors open at 7:30 PM. Arriving before 9 PM gives you time for check-in and the aperitif.' },
      { question: 'Where can I buy tickets or a table for Spain vs Argentina?', answer: 'Use only the Nightlife Milan Xceed affiliate link. After payment, send your confirmation to +39 351 912 7047 on WhatsApp.' },
    ],
  },
  {
    key: '2026-world-cup-final-milan',
    keyword: '2026 World Cup final in Milan',
    title: '2026 World Cup Final in Milan | Just Me, July 19',
    summary: '2026 World Cup final: Spain vs Argentina on the big screen at Just Me Milan. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Where can I watch the 2026 World Cup final in Milan?', answer: 'The 2026 World Cup final in Milan is on the big screen at Just Me on Sunday, July 19. The garden opens at 7:30 PM, Spain vs Argentina starts at 9 PM, and the event is 21+.' },
      { question: 'When is the 2026 World Cup final screening in Milan?', answer: 'The screening is on Sunday, July 19, 2026. Just Me Milan opens at 7:30 PM and the live broadcast leads into the 9 PM kick-off.' },
      { question: 'Which teams play in the 2026 World Cup final?', answer: 'The listed final is Spain vs Argentina. Just Me shows it from the 9 PM kick-off through the final whistle.' },
      { question: 'What happens at Just Me after the final?', answer: 'After the match, Just Me continues with Uptown Nights. The DJ set follows the actual final whistle if there is extra time.' },
      { question: 'How late does Just Me stay open on July 19?', answer: 'The verified Uptown Nights programme continues until 5 AM. The match broadcast ends at the final whistle.' },
    ],
  },
  {
    key: 'football-match-big-screen-milan',
    keyword: 'football match on a big screen in Milan',
    title: 'Football Match on a Big Screen in Milan | Spain vs Argentina',
    summary: 'Spain vs Argentina on the big screen at Just Me Milan. Doors at 7:30 PM. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Which football match is on a big screen in Milan on July 19?', answer: 'The football match on a big screen in Milan is Spain vs Argentina, the 2026 World Cup final, at Just Me. Doors open at 7:30 PM and kick-off is at 9 PM.' },
      { question: 'Is there an aperitif before the football match?', answer: 'Yes. Just Me opens at 7:30 PM with an aperitif before the 9 PM kick-off. Xceed lists a buffet and one drink.' },
      { question: 'How much is the aperitif before the match?', answer: 'Xceed lists Aperitif + 1 drink at EUR 15. Recheck the price and availability at purchase.' },
      { question: 'Can I have dinner before the big-screen broadcast?', answer: 'The current Xceed page lists a served-dinner option. Confirm the menu, time and availability before buying.' },
      { question: 'Can I reserve a VIP table for the final?', answer: 'Xceed lists Dance Floor, VIP Area, Super VIP and DJ tables. Ask for confirmation of the available position before purchase.' },
    ],
  },
  {
    key: 'just-me-milan-world-cup-final',
    keyword: 'Just Me Milan World Cup final',
    title: 'Just Me Milan World Cup Final | Spain vs Argentina',
    summary: 'Spain vs Argentina on the big screen, then Uptown Nights at Just Me Milan. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'How can I watch the World Cup final at Just Me Milan?', answer: 'The Just Me Milan World Cup final screening is Spain vs Argentina on Sunday, July 19, 2026. Doors open at 7:30 PM, kick-off is at 9 PM, and Uptown Nights follows until 5 AM.' },
      { question: 'What is the minimum age for the final at Just Me?', answer: 'The event is 21+. Bring valid photo ID because registration, tickets and tables do not replace the age check.' },
      { question: 'What is the dress code at Just Me for the final?', answer: 'The dress code is elegant and long trousers are required for men. Entry remains subject to venue selection.' },
      { question: 'What music follows the World Cup final at Just Me?', answer: 'Uptown Nights follows the match with house, hip-hop, hits, EDM and reggaeton until 5 AM.' },
      { question: 'Where is Just Me Milan?', answer: 'Just Me is at Viale Luigi Camoens 2, 20121 Milan, in Parco Sempione beside Torre Branca.' },
    ],
  },
] as const;

export const WORLD_CUP_ORDER_CONFIRMATION_EN = `Spain vs Argentina at Just Me Milan on Sunday, July 19, 2026. Doors open at 7:30 PM, kick-off is at 9 PM, admission is 21+, and the dress code is elegant; long trousers are required for men. Eventbrite registration is not an admission ticket. Buy through ${WORLD_CUP_FINAL_AFFILIATE_URL}, then send your Xceed purchase confirmation on WhatsApp to ${WORLD_CUP_FINAL_PHONE}.`;
