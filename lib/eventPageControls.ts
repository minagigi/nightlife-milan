import { enabledLocaleCodes, type LocaleCode } from './i18n/locales';

export interface EventGalleryControls {
  closeGallery: string;
  previousImage: string;
  nextImage: string;
}
export const EVENT_GALLERY_CONTROLS_BY_LOCALE = {
  en: { closeGallery: 'Close gallery', previousImage: 'Previous image', nextImage: 'Next image' },
  it: { closeGallery: 'Chiudi galleria', previousImage: 'Immagine precedente', nextImage: 'Immagine successiva' },
  es: { closeGallery: 'Cerrar galería', previousImage: 'Imagen anterior', nextImage: 'Imagen siguiente' },
  fr: { closeGallery: 'Fermer la galerie', previousImage: 'Image précédente', nextImage: 'Image suivante' },
  de: { closeGallery: 'Galerie schließen', previousImage: 'Vorheriges Bild', nextImage: 'Nächstes Bild' },
  pt: { closeGallery: 'Fechar galeria', previousImage: 'Imagem anterior', nextImage: 'Imagem seguinte' },
  nl: { closeGallery: 'Galerij sluiten', previousImage: 'Vorige afbeelding', nextImage: 'Volgende afbeelding' },
  ru: { closeGallery: 'Закрыть галерею', previousImage: 'Предыдущее изображение', nextImage: 'Следующее изображение' },
  tr: { closeGallery: 'Galeriyi kapat', previousImage: 'Önceki görsel', nextImage: 'Sonraki görsel' },
  zh: { closeGallery: '关闭图库', previousImage: '上一张图片', nextImage: '下一张图片' },
  ar: { closeGallery: 'إغلاق المعرض', previousImage: 'الصورة السابقة', nextImage: 'الصورة التالية' },
  bg: { closeGallery: 'Затваряне на галерията', previousImage: 'Предишно изображение', nextImage: 'Следващо изображение' },
  hr: { closeGallery: 'Zatvori galeriju', previousImage: 'Prethodna slika', nextImage: 'Sljedeća slika' },
  cs: { closeGallery: 'Zavřít galerii', previousImage: 'Předchozí obrázek', nextImage: 'Další obrázek' },
  da: { closeGallery: 'Luk galleriet', previousImage: 'Forrige billede', nextImage: 'Næste billede' },
  et: { closeGallery: 'Sulge galerii', previousImage: 'Eelmine pilt', nextImage: 'Järgmine pilt' },
  fi: { closeGallery: 'Sulje galleria', previousImage: 'Edellinen kuva', nextImage: 'Seuraava kuva' },
  el: { closeGallery: 'Κλείσιμο συλλογής', previousImage: 'Προηγούμενη εικόνα', nextImage: 'Επόμενη εικόνα' },
  hu: { closeGallery: 'Galéria bezárása', previousImage: 'Előző kép', nextImage: 'Következő kép' },
  ga: { closeGallery: 'Dún an gailearaí', previousImage: 'An íomhá roimhe seo', nextImage: 'An chéad íomhá eile' },
  lv: { closeGallery: 'Aizvērt galeriju', previousImage: 'Iepriekšējais attēls', nextImage: 'Nākamais attēls' },
  lt: { closeGallery: 'Uždaryti galeriją', previousImage: 'Ankstesnis vaizdas', nextImage: 'Kitas vaizdas' },
  mt: { closeGallery: 'Agħlaq il-gallerija', previousImage: 'L-istampa ta’ qabel', nextImage: 'L-istampa li jmiss' },
  pl: { closeGallery: 'Zamknij galerię', previousImage: 'Poprzedni obraz', nextImage: 'Następny obraz' },
  ro: { closeGallery: 'Închide galeria', previousImage: 'Imaginea anterioară', nextImage: 'Imaginea următoare' },
  sk: { closeGallery: 'Zavrieť galériu', previousImage: 'Predchádzajúci obrázok', nextImage: 'Nasledujúci obrázok' },
  sl: { closeGallery: 'Zapri galerijo', previousImage: 'Prejšnja slika', nextImage: 'Naslednja slika' },
  sv: { closeGallery: 'Stäng galleriet', previousImage: 'Föregående bild', nextImage: 'Nästa bild' },
  no: { closeGallery: 'Lukk galleriet', previousImage: 'Forrige bilde', nextImage: 'Neste bilde' },
  is: { closeGallery: 'Loka myndasafni', previousImage: 'Fyrri mynd', nextImage: 'Næsta mynd' },
  uk: { closeGallery: 'Закрити галерею', previousImage: 'Попереднє зображення', nextImage: 'Наступне зображення' },
  sq: { closeGallery: 'Mbyll galerinë', previousImage: 'Imazhi i mëparshëm', nextImage: 'Imazhi tjetër' },
  sr: { closeGallery: 'Zatvori galeriju', previousImage: 'Prethodna slika', nextImage: 'Sledeća slika' },
  bs: { closeGallery: 'Zatvori galeriju', previousImage: 'Prethodna slika', nextImage: 'Sljedeća slika' },
  mk: { closeGallery: 'Затвори ја галеријата', previousImage: 'Претходна слика', nextImage: 'Следна слика' },
} as const satisfies Record<LocaleCode, EventGalleryControls>;

export function getEventGalleryControls(locale: string): EventGalleryControls {
  return EVENT_GALLERY_CONTROLS_BY_LOCALE[locale as LocaleCode]
    ?? EVENT_GALLERY_CONTROLS_BY_LOCALE.en;
}

export function validateEventPageControlCoverage(): void {
  const configured = Object.keys(EVENT_GALLERY_CONTROLS_BY_LOCALE);
  const missing = enabledLocaleCodes.filter((locale) => !configured.includes(locale));
  const unexpected = configured.filter((locale) => !enabledLocaleCodes.includes(locale as LocaleCode));

  if (missing.length > 0 || unexpected.length > 0) {
    throw new Error(`Invalid event gallery control coverage; missing: ${missing.join(', ') || 'none'}; unexpected: ${unexpected.join(', ') || 'none'}`);
  }

  for (const locale of enabledLocaleCodes) {
    const controls = EVENT_GALLERY_CONTROLS_BY_LOCALE[locale];
    for (const [key, label] of Object.entries(controls)) {
      if (label.trim().length === 0) {
        throw new Error(`Empty ${key} event gallery control for ${locale}`);
      }
    }
  }
}
