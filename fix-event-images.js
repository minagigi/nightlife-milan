// Script: fix event images + always add trailing comma (valid TS)
const fs = require('fs');
const path = require('path');

const venueToFolder = {
  'v-justme':      'just-me-milano',
  'v-pineta':      'pineta-milano',
  'v-magazzini':   'magazzini-generali',
  'v-volt':        'volt-club-milano',
  'v-gattopardo':  'gattopardo',
  'v-armani-prive':'armani-prive-milano',
  'v-hollywood':   'hollywood',
  'v-mibmilano':   'mib-milano',
  'v-theclub':     'the-club-milano',
  'v-ceresio-7':   'ceresio-7',
  'v-playclub':    'play-club-milano',
  'v-55milano':    '55-milano',
  'v-repvblic':    'repvblic-milano',
  'v-11clubroom':  '11-clubroom',
  'v-church81':    'church-81',
  'v-terrazza21':  'terrazza-21',
  'v-voya':        'voya-rooftop-milan',
  'v-apollo':      'apollo-milano',
};

const clubSlugToFolder = {
  'justme':  'just-me-milano',
  'pineta':  'pineta-milano',
  'voya':    'voya-rooftop-milan',
};

// ── data.ts ──────────────────────────────────────────────────────────────────
const dataPath = path.join(__dirname, 'lib', 'data.ts');
const dataLines = fs.readFileSync(dataPath, 'utf8').split('\n');

const venueCounters = {};
let currentVenueId = null;
let inMockEvents = false;

const newDataLines = dataLines.map(line => {
  if (line.includes('export const mockEvents')) inMockEvents = true;
  if (!inMockEvents) return line;

  const venueMatch = line.match(/venueId:\s*["']([^"']+)["']/);
  if (venueMatch) currentVenueId = venueMatch[1];

  // Match image line with double quotes (with or without trailing comma)
  const imageMatch = line.match(/^(\s+image:\s*)"[^"]*"(,?)$/);
  if (imageMatch && currentVenueId && venueToFolder[currentVenueId]) {
    const folder = venueToFolder[currentVenueId];
    if (!venueCounters[currentVenueId]) venueCounters[currentVenueId] = 0;
    venueCounters[currentVenueId]++;
    const idx = ((venueCounters[currentVenueId] - 1) % 7) + 1;
    const imgNum = String(idx).padStart(2, '0');
    // Always add trailing comma (valid TS, avoids syntax errors when followed by other props)
    return `${imageMatch[1]}"/images/venues/${folder}/${folder}-interior-${imgNum}.webp",`;
  }

  return line;
});

fs.writeFileSync(dataPath, newDataLines.join('\n'), 'utf8');
console.log('data.ts OK:', JSON.stringify(venueCounters));

// ── eventsConfig.ts ───────────────────────────────────────────────────────────
const configPath = path.join(__dirname, 'lib', 'eventsConfig.ts');
const configLines = fs.readFileSync(configPath, 'utf8').split('\n');

const clubCounters = {};
let currentClubSlug = null;
let inWeeklyEvents = false;

const newConfigLines = configLines.map(line => {
  if (line.includes('export const weeklyEvents')) inWeeklyEvents = true;
  if (!inWeeklyEvents) return line;

  const slugMatch = line.match(/clubSlug:\s*['"]([^'"]+)['"]/);
  if (slugMatch) currentClubSlug = slugMatch[1];

  // Match image line with single quotes (with or without trailing comma)
  const imageMatch = line.match(/^(\s+image:\s*)'[^']*'(,?)$/);
  if (imageMatch && currentClubSlug && clubSlugToFolder[currentClubSlug]) {
    const folder = clubSlugToFolder[currentClubSlug];
    if (!clubCounters[currentClubSlug]) clubCounters[currentClubSlug] = 0;
    clubCounters[currentClubSlug]++;
    const idx = ((clubCounters[currentClubSlug] - 1) % 7) + 1;
    const imgNum = String(idx).padStart(2, '0');
    return `${imageMatch[1]}'/images/venues/${folder}/${folder}-interior-${imgNum}.webp',`;
  }

  return line;
});

fs.writeFileSync(configPath, newConfigLines.join('\n'), 'utf8');
console.log('eventsConfig.ts OK:', JSON.stringify(clubCounters));
