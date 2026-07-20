import { buildWorldCupEventbriteLocalePayloads } from '../lib/worldCupEventbriteLocales';

const payload = buildWorldCupEventbriteLocalePayloads('ar')[0];
console.log(JSON.stringify({
  length: payload.descriptionHtml.length,
  faqCount: (payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length,
  imageCount: (payload.descriptionHtml.match(/<img/g) || []).length,
  imagePositions: [...payload.descriptionHtml.matchAll(/<img/g)].map((match) => match.index),
  faqStart: payload.descriptionHtml.indexOf('data-event-faq="true"'),
  markerStart: payload.descriptionHtml.indexOf('nlm:curated'),
}));
