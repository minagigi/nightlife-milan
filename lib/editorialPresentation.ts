export type EditorialFields = Readonly<Record<string, string>>;

export function editorialValue(fields: EditorialFields, key: string, fallback: string): string {
  return fallback;
}

export function applyEditorialFields<T extends Record<string, unknown>>(defaults: T, _fields: EditorialFields, _prefix = ''): T {
  return { ...defaults };
}
