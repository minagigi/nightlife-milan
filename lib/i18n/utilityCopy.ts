export function utilityText(locale: string, enText: string, itText: string): string {
  return locale === 'it' ? itText : enText;
}
