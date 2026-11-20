import type { LocaleCode } from './i18n/locales';
import { getEventGalleryControls } from './eventPageControls';

export interface LightboxCopyEntry {
  openFullScreen: string;
  zoomIn: string;
  zoomOut: string;
  dialogLabel: string;
}

export const LIGHTBOX_COPY_35: Record<LocaleCode, LightboxCopyEntry> = {
  en: { openFullScreen: 'View image full screen', zoomIn: 'Zoom in image', zoomOut: 'Reset image zoom', dialogLabel: 'Full-screen image viewer' },
  it: { openFullScreen: 'Apri immagine a schermo intero', zoomIn: 'Ingrandisci immagine', zoomOut: 'Ripristina zoom immagine', dialogLabel: 'Visualizzatore immagine a schermo intero' },
  es: { openFullScreen: 'Ver imagen a pantalla completa', zoomIn: 'Ampliar imagen', zoomOut: 'Restablecer zoom', dialogLabel: 'Visor de imagen a pantalla completa' },
  fr: { openFullScreen: 'Afficher en plein écran', zoomIn: 'Agrandir l’image', zoomOut: 'Réinitialiser le zoom', dialogLabel: 'Visionneuse d’image en plein écran' },
  de: { openFullScreen: 'Bild im Vollbild öffnen', zoomIn: 'Bild vergrößern', zoomOut: 'Zoom zurücksetzen', dialogLabel: 'Vollbild-Bildansicht' },
  pt: { openFullScreen: 'Ver imagem em ecrã inteiro', zoomIn: 'Ampliar imagem', zoomOut: 'Repor zoom', dialogLabel: 'Visualizador de imagem em ecrã inteiro' },
  nl: { openFullScreen: 'Afbeelding op volledig scherm openen', zoomIn: 'Inzoomen op afbeelding', zoomOut: 'Zoom herstellen', dialogLabel: 'Afbeeldingsviewer op volledig scherm' },
  ru: { openFullScreen: 'Открыть изображение на весь экран', zoomIn: 'Увеличить изображение', zoomOut: 'Сбросить масштаб', dialogLabel: 'Полноэкранный просмотр изображения' },
  tr: { openFullScreen: 'Görseli tam ekran aç', zoomIn: 'Görseli yakınlaştır', zoomOut: 'Yakınlaştırmayı sıfırla', dialogLabel: 'Tam ekran görsel görüntüleyici' },
  zh: { openFullScreen: '全屏查看图片', zoomIn: '放大图片', zoomOut: '还原缩放', dialogLabel: '全屏图片查看器' },
  ar: { openFullScreen: 'عرض الصورة بملء الشاشة', zoomIn: 'تكبير الصورة', zoomOut: 'إعادة ضبط التكبير', dialogLabel: 'عارض الصور بملء الشاشة' },
  bg: { openFullScreen: 'Отвори изображението на цял екран', zoomIn: 'Увеличи изображението', zoomOut: 'Възстанови мащаба', dialogLabel: 'Преглед на цял екран' },
  hr: { openFullScreen: 'Prikaži sliku na cijelom zaslonu', zoomIn: 'Povećaj sliku', zoomOut: 'Vrati uvećanje', dialogLabel: 'Prikaz slike na cijelom zaslonu' },
  cs: { openFullScreen: 'Zobrazit obrázek na celou obrazovku', zoomIn: 'Přiblížit obrázek', zoomOut: 'Obnovit přiblížení', dialogLabel: 'Celostránkový prohlížeč obrázků' },
  da: { openFullScreen: 'Vis billede i fuld skærm', zoomIn: 'Zoom ind på billede', zoomOut: 'Nulstil zoom', dialogLabel: 'Billedvisning i fuld skærm' },
  et: { openFullScreen: 'Ava pilt täisekraanil', zoomIn: 'Suurenda pilti', zoomOut: 'Lähtesta suum', dialogLabel: 'Täisekraanil pildivaatur' },
  fi: { openFullScreen: 'Avaa kuva koko näytössä', zoomIn: 'Suurenna kuvaa', zoomOut: 'Palauta zoomaus', dialogLabel: 'Koko näytön kuvankatselin' },
  el: { openFullScreen: 'Άνοιγμα εικόνας σε πλήρη οθόνη', zoomIn: 'Μεγέθυνση εικόνας', zoomOut: 'Επαναφορά εστίασης', dialogLabel: 'Προβολή εικόνας σε πλήρη οθόνη' },
  hu: { openFullScreen: 'Kép megnyitása teljes képernyőn', zoomIn: 'Kép nagyítása', zoomOut: 'Nagyítás visszaállítása', dialogLabel: 'Teljes képernyős képnézegető' },
  ga: { openFullScreen: 'Oscail an íomhá ar lánscáileán', zoomIn: 'Zúmáil isteach', zoomOut: 'Athshocraigh zúm', dialogLabel: 'Amharcán íomhá lánscáileáin' },
  lv: { openFullScreen: 'Skatīt attēlu pilnekrānā', zoomIn: 'Tuvināt attēlu', zoomOut: 'Atiestatīt tālummaiņu', dialogLabel: 'Pilnekrāna attēlu skatītājs' },
  lt: { openFullScreen: 'Atidaryti vaizdą per visą ekraną', zoomIn: 'Priartinti vaizdą', zoomOut: 'Atstatyti mastelį', dialogLabel: 'Viso ekrano vaizdų peržiūra' },
  mt: { openFullScreen: 'Iftaħ l-istampa f’skrin sħiħ', zoomIn: 'Kabbar l-istampa', zoomOut: 'Irrisettja ż-żum', dialogLabel: 'Werrej tal-istampi f’skrin sħiħ' },
  pl: { openFullScreen: 'Otwórz obraz na pełnym ekranie', zoomIn: 'Powiększ obraz', zoomOut: 'Przywróć powiększenie', dialogLabel: 'Pełnoekranowy podgląd obrazu' },
  ro: { openFullScreen: 'Deschide imaginea pe tot ecranul', zoomIn: 'Mărește imaginea', zoomOut: 'Resetează mărirea', dialogLabel: 'Vizualizator imagine pe tot ecranul' },
  sk: { openFullScreen: 'Zobraziť obrázok na celú obrazovku', zoomIn: 'Priblížiť obrázok', zoomOut: 'Obnoviť priblíženie', dialogLabel: 'Prehliadač obrázkov na celú obrazovku' },
  sl: { openFullScreen: 'Odpri sliko čez celoten zaslon', zoomIn: 'Povečaj sliko', zoomOut: 'Ponastavi povečavo', dialogLabel: 'Celozaslonski pregledovalnik slik' },
  sv: { openFullScreen: 'Öppna bild i helskärm', zoomIn: 'Zooma in bild', zoomOut: 'Återställ zoom', dialogLabel: 'Helskärmsvisare för bilder' },
  no: { openFullScreen: 'Åpne bilde i fullskjerm', zoomIn: 'Zoom inn på bilde', zoomOut: 'Tilbakestill zoom', dialogLabel: 'Fullskjerm bildevisning' },
  is: { openFullScreen: 'Opna mynd á öllum skjánum', zoomIn: 'Stækka mynd', zoomOut: 'Endurstilla aðdrátt', dialogLabel: 'Myndaskoðari á öllum skjánum' },
  uk: { openFullScreen: 'Відкрити зображення на весь екран', zoomIn: 'Збільшити зображення', zoomOut: 'Скинути масштаб', dialogLabel: 'Повноекранний перегляд зображення' },
  sq: { openFullScreen: 'Hap imazhin në ekran të plotë', zoomIn: 'Zmadho imazhin', zoomOut: 'Rivendos zmadhimin', dialogLabel: 'Shfaqës i imazhit në ekran të plotë' },
  sr: { openFullScreen: 'Otvori sliku preko celog ekrana', zoomIn: 'Uvećaj sliku', zoomOut: 'Vrati uvećanje', dialogLabel: 'Prikaz slike preko celog ekrana' },
  bs: { openFullScreen: 'Otvori sliku preko cijelog ekrana', zoomIn: 'Uvećaj sliku', zoomOut: 'Vrati uvećanje', dialogLabel: 'Pregled slike preko cijelog ekrana' },
  mk: { openFullScreen: 'Отвори слика на цел екран', zoomIn: 'Зголеми слика', zoomOut: 'Врати зголемување', dialogLabel: 'Прегледувач на слики на цел екран' },
};

export function getLightboxCopy(locale: string) {
  const galleryControls = getEventGalleryControls(locale);
  const viewerCopy = LIGHTBOX_COPY_35[locale as LocaleCode] ?? LIGHTBOX_COPY_35.en;
  return {
    ...galleryControls,
    ...viewerCopy,
  };
}
