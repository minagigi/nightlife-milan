import { getOctoberEventCopy, getOctoberEventSlug, getOctoberHubCopy } from '@/lib/october-events/copy';
import type { OctoberEventRecord, OctoberEventCopy } from '@/lib/october-events/types';
import type { LocaleCode } from '@/lib/i18n/locales';

export type EditorialFields = Record<string, string>;
export type OctoberEventCardCopy = Readonly<{ title: string; slug: string; noKnownValue: string }>;

function editorialValue(fields: EditorialFields, key: string, fallback: string): string {
  const v = fields[key];
  return typeof v === 'string' && v.trim().length > 0 ? v.trim() : fallback;
}

export function applyOctoberEventFields(copy: OctoberEventCopy, fields: EditorialFields): OctoberEventCopy {
  const summary = editorialValue(fields, 'description', copy.summary);
  return {
    ...copy,
    title: editorialValue(fields, 'title', copy.title),
    summary,
    introduction: summary,
    metaTitle: editorialValue(fields, 'metaTitle', copy.metaTitle),
    metaDescription: editorialValue(fields, 'metaDescription', copy.metaDescription),
    imageAlt: editorialValue(fields, 'ogImageAlt', copy.imageAlt),
    sections: copy.sections.map((s, i) => ({
      heading: editorialValue(fields, `section${i}.heading`, s.heading),
      body: editorialValue(fields, `section${i}.body`, s.body),
    })),
    faqs: copy.faqs.map((f, i) => ({
      question: editorialValue(fields, `faq${i}.q`, f.question),
      answer: editorialValue(fields, `faq${i}.a`, f.answer),
    })),
  };
}

export async function readOctoberEventCopy(event: OctoberEventRecord, locale: LocaleCode): Promise<OctoberEventCopy> {
  const _slug = getOctoberEventSlug(event);
  return getOctoberEventCopy(event, locale);
}

export function compactOctoberEventCard(copy: OctoberEventCopy, fields: EditorialFields): OctoberEventCardCopy {
  return {
    title: editorialValue(fields, 'title', copy.title),
    slug: copy.slug,
    noKnownValue: copy.labels.noKnownValue,
  };
}

export async function readOctoberEventCard(event: OctoberEventRecord, locale: LocaleCode): Promise<OctoberEventCardCopy> {
  return compactOctoberEventCard(getOctoberEventCopy(event, locale), {});
}

export async function readOctoberHubCopy(locale: LocaleCode) {
  return getOctoberHubCopy(locale);
}
