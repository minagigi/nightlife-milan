import 'server-only';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  it: () => import('./it.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'it') => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
