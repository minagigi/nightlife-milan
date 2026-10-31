import en from './locales/en.json';
import it from './locales/it.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import pt from './locales/pt.json';
import nl from './locales/nl.json';
import ru from './locales/ru.json';
import tr from './locales/tr.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import bg from './locales/bg.json';
import hr from './locales/hr.json';
import cs from './locales/cs.json';
import da from './locales/da.json';
import et from './locales/et.json';
import fi from './locales/fi.json';
import el from './locales/el.json';
import hu from './locales/hu.json';
import ga from './locales/ga.json';
import lv from './locales/lv.json';
import lt from './locales/lt.json';
import mt from './locales/mt.json';
import pl from './locales/pl.json';
import ro from './locales/ro.json';
import sk from './locales/sk.json';
import sl from './locales/sl.json';
import sv from './locales/sv.json';
import no from './locales/no.json';
import is from './locales/is.json';
import uk from './locales/uk.json';
import sq from './locales/sq.json';
import sr from './locales/sr.json';
import bs from './locales/bs.json';
import mk from './locales/mk.json';
import type { HalloweenAsset, HalloweenContentPack, HalloweenMembership } from './types';
export const HALLOWEEN_CONTENT = { en, it, es, fr, de, pt, nl, ru, tr, zh, ar, bg, hr, cs, da, et, fi, el, hu, ga, lv, lt, mt, pl, ro, sk, sl, sv, no, is, uk, sq, sr, bs, mk } as unknown as HalloweenContentPack;
export const HALLOWEEN_ASSETS: readonly HalloweenAsset[] = [
  {
    "src": "/images/events/october-2026/alcatraz-dia-de-los-muertos-a9c89f9ef751.webp",
    "width": 684,
    "height": 358,
    "bytes": 90680,
    "sha256": "a3e893ebc46e2522d13f8419b9f86432c3ee80dbb5537036bba500b2c1291759",
    "sourceRef": "https://www.alcatrazmilano.it/ · official Halloween listing",
    "kind": "programme-artwork"
  },
  {
    "src": "/images/events/october-2026/halloween-aria-243203.webp",
    "width": 1600,
    "height": 920,
    "bytes": 218078,
    "sha256": "5979d0f8592aa96115dc3def1e8d63a3276a0ec5078e9b4f54aa1d17f0bc7a2d",
    "sourceRef": "https://xceed.me/en/milano/event/halloween-party-65/243203 · official Aria Halloween listing",
    "kind": "programme-artwork"
  },
  {
    "src": "/images/events/october-2026/halloween-gate-240984.webp",
    "width": 1080,
    "height": 1080,
    "bytes": 205742,
    "sha256": "0c759551aa8bc1d4b87efe1dff261e4fc476faf59c9ba9303b43cc1863593e50",
    "sourceRef": "https://www.gatemilano.it/events · official Gate Halloween listing",
    "kind": "programme-artwork"
  },
  {
    "src": "/images/events/october-2026/halloween-amnesia-leon-2026.webp",
    "width": 1080,
    "height": 1350,
    "bytes": 165882,
    "sha256": "ccf71f68f20e80050ed97b6a162d2a130cd7d1e6b08c69abb51aac53a87bd191",
    "sourceRef": "https://amnesiamilano.com/ · official Amnesia Halloween listing",
    "kind": "programme-artwork"
  },
  {
    "src": "/images/venues/editorial/amnesia-milano.webp",
    "width": 1376,
    "height": 768,
    "bytes": 233834,
    "sha256": "74810efa42387034ecfffef224a71a3c4e70c66ccb02fb3043048f65f363506b",
    "sourceRef": "https://nightlifemilan.com/ · Nightlife Milan editorial illustration",
    "kind": "editorial-illustration"
  }
];

export const HALLOWEEN_MEMBERSHIP: readonly HalloweenMembership[] = [
  {
    "eventId": "243574",
    "sourceUrl": "https://xceed.me/en/milano/event/halloween-night-20/243574",
    "startISO": "2026-10-31T19:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#243574"
  },
  {
    "eventId": "243812",
    "sourceUrl": "https://xceed.me/en/milano/event/the-ball-of-the-damned-the-halloween-party/243812",
    "startISO": "2026-10-31T19:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#243812"
  },
  {
    "eventId": "243203",
    "sourceUrl": "https://xceed.me/en/milano/event/halloween-party-65/243203",
    "startISO": "2026-10-31T21:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#243203"
  },
  {
    "eventId": "alcatraz-halloween-dia-de-los-muertos-2026",
    "sourceUrl": "https://alcatrazmilano.it/eventi/alcatraz-halloween-party-dia-de-los-muertos-3/",
    "startISO": "2026-10-31T22:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#alcatraz-halloween-dia-de-los-muertos-2026"
  },
  {
    "eventId": "240984",
    "sourceUrl": "https://www.gatemilano.it/events",
    "startISO": "2026-10-31T23:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#240984"
  },
  {
    "eventId": "amnesia-halloween-leon-2026",
    "sourceUrl": "https://amnesiamilano.com/event/halloween-night-amnesia-milano-w-leon-extended-set-michele-arcieri/",
    "startISO": "2026-10-31T23:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#amnesia-halloween-leon-2026"
  },
  {
    "eventId": "halloween-voya-rooftop-2026",
    "sourceUrl": "https://voyarooftop.com/restaurant-lounge/",
    "startISO": "2026-10-31T20:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-voya-rooftop-2026"
  },
  {
    "eventId": "halloween-55-club-milano-2026",
    "sourceUrl": "https://www.fiftyfivemilano.com/halloween/",
    "startISO": "2026-10-31T19:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-55-club-milano-2026"
  },
  {
    "eventId": "halloween-magazzini-generali-2026",
    "sourceUrl": "https://magazzinigenerali.org/event/welcome-to-hell-halloween-2026/",
    "startISO": "2026-10-31T23:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-magazzini-generali-2026"
  },
  {
    "eventId": "halloween-tocqueville-13-2026",
    "sourceUrl": "https://tocqueville13.club/halloween-noche-de-vampiros/",
    "startISO": "2026-10-31T23:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-tocqueville-13-2026"
  },
  {
    "eventId": "halloween-fabbrica-del-vapore-2026",
    "sourceUrl": "https://dice.fm/event/circo-de-los-muertos-fabbrica-del-vapore-2026",
    "startISO": "2026-10-31T22:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-fabbrica-del-vapore-2026"
  },
  {
    "eventId": "halloween-tom-milano-2026",
    "sourceUrl": "https://xceed.me/en/milano/event/lhalloween-delle-agenzie",
    "startISO": "2026-10-29T20:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-tom-milano-2026"
  },
  {
    "eventId": "halloween-nama-milano-2026",
    "sourceUrl": "https://ra.co/events/2487186",
    "startISO": "2026-10-31T18:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-nama-milano-2026"
  },
  {
    "eventId": "halloween-tempio-del-futuro-perduto-2026",
    "sourceUrl": "https://ra.co/events/2530310",
    "startISO": "2026-10-31T23:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-tempio-del-futuro-perduto-2026"
  },
  {
    "eventId": "halloween-volt-club-milano-2026",
    "sourceUrl": "https://ra.co/events/2547562",
    "startISO": "2026-10-31T23:59:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-volt-club-milano-2026"
  },
  {
    "eventId": "halloween-cgm-milano-2026",
    "sourceUrl": "https://ra.co/events/2554970",
    "startISO": "2026-10-31T18:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-cgm-milano-2026"
  },
  {
    "eventId": "halloween-base-milano-2026",
    "sourceUrl": "https://ra.co/events/2557256",
    "startISO": "2026-10-31T23:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-base-milano-2026"
  },
  {
    "eventId": "halloween-arca-milano-2026",
    "sourceUrl": "https://ra.co/events/2543304",
    "startISO": "2026-10-31T23:59:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-arca-milano-2026"
  },
  {
    "eventId": "halloween-pulse-cube-milano-2026",
    "sourceUrl": "https://fr.ra.co/events/2550824",
    "startISO": "2026-10-31T22:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-pulse-cube-milano-2026"
  },
  {
    "eventId": "halloween-mamacita-fabrique-2026",
    "sourceUrl": "https://fabriquemilano.it/it/eventi/mamacita-halloween-edition/",
    "startISO": "2026-10-31T23:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-mamacita-fabrique-2026"
  },
  {
    "eventId": "halloween-cineteca-milano-arlecchino-2026",
    "sourceUrl": "https://www.cinetecamilano.it/location/arlecchino",
    "startISO": "2026-10-31T21:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-cineteca-milano-arlecchino-2026"
  },
  {
    "eventId": "halloween-teatro-giorgio-gaber-2026",
    "sourceUrl": "https://www.teatroliricogiorgiogaber.it/",
    "startISO": "2026-10-30T20:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-teatro-giorgio-gaber-2026"
  },
  {
    "eventId": "halloween-parco-trotter-2026",
    "sourceUrl": "https://www.yesmilano.it/eventi/tutti-gli-eventi/halloween-milano-2026",
    "startISO": "2026-10-31T18:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-parco-trotter-2026"
  },
  {
    "eventId": "halloween-museo-scienza-tecnologia-2026",
    "sourceUrl": "https://www.museoscienza.org/it",
    "startISO": "2026-10-31T10:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-museo-scienza-tecnologia-2026"
  },
  {
    "eventId": "halloween-planetario-cielo-sottosopra-2026",
    "sourceUrl": "https://www.yesmilano.it/eventi/tutti-gli-eventi/halloween-milano-2026",
    "startISO": "2026-10-31T15:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-planetario-cielo-sottosopra-2026"
  },
  {
    "eventId": "halloween-planetario-night-2026",
    "sourceUrl": "https://www.yesmilano.it/eventi/tutti-gli-eventi/halloween-milano-2026",
    "startISO": "2026-10-31T21:00:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-planetario-night-2026"
  },
  {
    "eventId": "halloween-castello-delitto-2026",
    "sourceUrl": "https://www.milanocastello.it/it",
    "startISO": "2026-10-31T14:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-castello-delitto-2026"
  },
  {
    "eventId": "halloween-castello-mostri-2026",
    "sourceUrl": "https://www.milanocastello.it/it",
    "startISO": "2026-10-31T15:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-castello-mostri-2026"
  },
  {
    "eventId": "halloween-castello-penombra-2026",
    "sourceUrl": "https://www.milanocastello.it/it",
    "startISO": "2026-10-31T17:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-castello-penombra-2026"
  },
  {
    "eventId": "halloween-museo-del-duomo-2026",
    "sourceUrl": "https://www.duomomilano.it/it/",
    "startISO": "2026-10-31T20:30:00+01:00",
    "evidenceRef": "lib/october-events/inventory.json#halloween-museo-del-duomo-2026"
  }
];
