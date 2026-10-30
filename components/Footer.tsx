import Link from 'next/link';
import NewsletterHub from './NewsletterHub';
import Logo from './Logo';
import FooterWhatsAppContact from './FooterWhatsAppContact';
import { ENABLED_LOCALES, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getFooterCopy } from '@/lib/footerLocaleCopy';
import { editorialValue, type EditorialFields } from '@/lib/editorialPresentation';
import { footerMenuFromFields, resolveMenuItems, type FooterMenu } from '@/lib/editorialMenus';
import { utilityText } from '@/lib/i18n/utilityCopy';
import EventVenueMap from './EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';

interface FooterProps {
  lang: LocaleCode;
  editorialFields?: EditorialFields;
  copyrightYear?: number;
}

export default function Footer({ lang, editorialFields = {}, copyrightYear }: FooterProps) {
  const defaults = getFooterCopy(lang);
  const t = Object.fromEntries(Object.entries(defaults).map(([key, value]) => [
    key,
    editorialValue(editorialFields, `footer.${key}`, value),
  ])) as typeof defaults;

  const lp = localePrefix(lang);
  const links = {
    clubs: `${lp}/clubs`,
    calendar: `${lp}/events`,
    guides: `${lp}/guides`,
    vip: `${lp}/vip-tables`,
    concierge: `${lp}/concierge`,
    brera: `${lp}/zones/brera`,
    navigli: `${lp}/zones/navigli`,
    isola: `${lp}/zones/isola`,
    corsoComo: `${lp}/zones/corso-como`,
    portaVenezia: `${lp}/zones/porta-venezia`,
    privacy: `${lp}/privacy`,
    terms: `${lp}/terms`,
  };
  const defaultMenu: FooterMenu = {
    version: 1,
    navigation: [{ id: 'clubs', label: t.clubs }, { id: 'events', label: t.calendar }, { id: 'guides', label: t.guides }, { id: 'mfw', label: editorialValue(editorialFields, 'footer.mfw', 'Milan Fashion Week') }, { id: 'vip', label: t.vip }, { id: 'concierge', label: t.concierge }, { id: 'pastEvents', label: t.past }],
    zones: [{ id: 'brera', label: 'Brera' }, { id: 'navigli', label: 'Navigli' }, { id: 'isola', label: 'Isola' }, { id: 'corsoComo', label: 'Corso Como' }, { id: 'portaVenezia', label: 'Porta Venezia' }],
  };
  const menu = footerMenuFromFields(editorialFields, defaultMenu);
  const navigation = resolveMenuItems(menu.navigation, lang);
  const zones = resolveMenuItems(menu.zones, lang);
  const mapCopy = getEventVenueCopy(lang);
  // City context only: this query is not a Nightlife Milan business address.
  const cityMap = new URL('https://www.google.com/maps');
  cityMap.searchParams.set('q', 'Milano, Italia');
  cityMap.searchParams.set('output', 'embed');
  cityMap.searchParams.set('hl', lang);
  const cityDirections = new URL('https://www.google.com/maps/dir/');
  cityDirections.searchParams.set('api', '1');
  cityDirections.searchParams.set('destination', 'Milano, Italia');
  cityDirections.searchParams.set('hl', lang);

  return (
    <div className="mt-auto w-full">
      <NewsletterHub lang={lang} />
      <footer className="nlm-footer w-full bg-[#050505] border-t border-[#F6F1E7]/14">
        <div className="max-w-[1440px] mx-auto border-x border-[#F6F1E7]/14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F6F1E7]/14">
            {/* Col 1: Brand Info */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <Link href={lp + '/'} prefetch={false} className="inline-block group" aria-label={t.homeAria}>
                <Logo className="h-9 w-auto" />
              </Link>
              <p className="nlm-footer-description font-sans text-sm text-[#C2B9AA] leading-relaxed max-w-xs">
                {t.desc}
              </p>
              <div className="pt-4">
                <FooterWhatsAppContact lang={lang} />
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <h3 className="font-mono text-[#D6BE96] tracking-[0.22em] uppercase text-xs">{t.nav}</h3>
              <ul className="flex flex-col space-y-3">{navigation.map((item) => <li key={item.id}><Link href={item.href} prefetch={false} className={item.gold ? 'text-[#D6BE96] hover:text-[#F6F1E7] transition-colors text-sm font-medium' : 'text-[#C2B9AA] hover:text-[#D6BE96] transition-colors text-sm'}>{item.label}</Link></li>)}<li><Link href={`${lp}/football-afterparties`} prefetch={false} className="text-[#D6BE96] hover:text-[#F6F1E7] transition-colors text-sm font-medium">{lang === 'it' ? 'Dopo-Partita Calcio San Siro (Inter & Milan)' : 'San Siro Football Afterparties (Inter & AC Milan)'}</Link></li></ul>
            </div>

            {/* Col 3: Zone Hotspots */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <h3 className="font-mono text-[#D6BE96] tracking-[0.22em] uppercase text-xs">{t.zones}</h3>
              <ul className="flex flex-col space-y-3">{zones.map((item) => <li key={item.id}><Link href={item.href} prefetch={false} className="text-[#C2B9AA] hover:text-[#D6BE96] transition-colors text-sm">{item.label}</Link></li>)}</ul>
              <details className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-3" data-footer-city-map>
                <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.18em] text-[#F6F1E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96]">
                  {t.zones} · Milano
                </summary>
                <div className="mt-3 space-y-3">
                  <a href={cityDirections.toString()} target="_blank" rel="noopener noreferrer"
                    aria-label={`${mapCopy.directions}: Milano`}
                    className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.16em] text-[#D6BE96] hover:text-[#F6F1E7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96]">
                    Milano
                  </a>
                  <EventVenueMap purpose="city" id={`footer-city-map-${lang}`} mapUrl={cityMap.toString()}
                    labels={{ loadMap: mapCopy.loadMap, mapTitle: mapCopy.mapTitle.replace('{venue}', 'Milano'), privacyLoadNotice: mapCopy.privacyLoadNotice }} />
                </div>
              </details>
            </div>

            {/* Col 4: Legal & Social */}
            <div className="flex flex-col space-y-4 p-8 sm:p-12">
              <h3 className="font-mono text-[#D6BE96] tracking-[0.22em] uppercase text-xs">{t.legal}</h3>
              <ul className="flex flex-col space-y-3 mb-4">
                <li>
                  <Link href={links.terms} prefetch={false} className="text-[#C2B9AA] hover:text-[#D6BE96] transition-colors text-sm">
                    {utilityText(lang, 'Terms of Service', 'Termini di Servizio')}
                  </Link>
                </li>
                <li>
                  <Link href={links.privacy} prefetch={false} className="text-[#C2B9AA] hover:text-[#D6BE96] transition-colors text-sm">
                    {t.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Editorial wordmark — rendered via ::after (see .deco-wordmark) so contrast scanners skip it */}
          <div className="overflow-hidden border-t border-[#F6F1E7]/14 py-10">
            <div className="deco-wordmark" data-text="NIGHTLIFE MILAN" aria-hidden="true" />
            <p className="text-center font-mono text-[10px] tracking-[0.3em] text-[#847C6F] tabular-nums -mt-2" aria-hidden="true">
              MILANO · 45.4642° N, 9.1900° E
            </p>
          </div>

          <div className="px-6 sm:px-12 py-6 border-t border-[#F6F1E7]/14 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[#847C6F] text-[11px] tracking-[0.12em]">
              © {copyrightYear ?? new Date().getFullYear()} Nightlife Milan. {t.rights}
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[11px] text-[#847C6F]">
              {ENABLED_LOCALES.map((l) => (
                <Link
                  key={l.code}
                  href={localePrefix(l.code) || '/'}
                  prefetch={false}
                  lang={l.hreflang}
                  className="inline-flex min-h-6 min-w-6 items-center justify-center px-1 hover:text-[#D6BE96] transition-colors uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6BE96]"
                  aria-label={l.nativeName}
                >
                  {l.code}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


