'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, Users } from 'lucide-react';
import { localePrefix } from '@/lib/i18n/locales';
import {
  SKU_BY_ID,
  TERRAZZA_DUOMO_FEE_RATE,
  computeSinglePassPrice,
  formatEurFromCents,
} from '@/lib/single-pass/catalog';

const getSkuById = (id: string) => SKU_BY_ID.get(id);
import { getSinglePassCopy, getTerrazzaCheckoutUi35 } from '@/lib/single-pass/i18n35';
import { useSinglePassCart } from './SinglePassCartContext';

type FloorTab = 'f1' | 'f5';

const F1_FORMULA_IDS = [
  'terrazza21-f1-dinner-place-rubia',
  'terrazza21-f1-dinner-place-ricciola',
  'terrazza21-f1-dinner-buffet',
  'terrazza21-f1-brindisi',
  'terrazza21-f1-anno-nuovo',
] as const;

const F5_FORMULA_IDS = [
  'terrazza21-f5-mare-dinner-place',
  'terrazza21-f5-mare-brindisi',
  'terrazza21-f5-mare-anno-nuovo',
] as const;

export default function TerrazzaDuomoBookingModule({ locale }: { locale: string }) {
  const router = useRouter();
  const { addItem, currency, formatConvertedEurCents } = useSinglePassCart();
  const copy = getSinglePassCopy(locale);
  const terrazzaUi = getTerrazzaCheckoutUi35(locale);
  const lp = localePrefix(locale);
  const isIt = locale === 'it';

  const [floor, setFloor] = useState<FloorTab>('f1');
  const [f1PlaceMain, setF1PlaceMain] = useState<'rubia' | 'ricciola'>('rubia');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Terrace Table Bundle Builder state
  const [f1TableType, setF1TableType] = useState<'terrace4' | 'private8'>('terrace4');
  const [bundleFormulaId, setBundleFormulaId] = useState<string>('terrazza21-f1-brindisi');
  const [bundleGuests, setBundleGuests] = useState<number>(4);

  const getQty = (key: string) => quantities[key] ?? 2;
  const setQty = (key: string, next: number) =>
    setQuantities((prev) => ({ ...prev, [key]: Math.max(1, Math.min(20, next)) }));

  const activeTableSkuId =
    floor === 'f1'
      ? f1TableType === 'private8'
        ? 'terrazza21-f1-private-terrace'
        : 'terrazza21-f1-terrace-table'
      : 'terrazza21-f5-mare-terrace-table';

  const activeTableMaxCap = floor === 'f1' && f1TableType === 'private8' ? 8 : 4;
  const activeBundleFormulas = floor === 'f1' ? F1_FORMULA_IDS : F5_FORMULA_IDS;

  const safeBundleFormulaId = activeBundleFormulas.includes(bundleFormulaId as never)
    ? bundleFormulaId
    : activeBundleFormulas[0];
  const safeBundleGuests = Math.max(1, Math.min(activeTableMaxCap, bundleGuests));

  const tableSku = getSkuById(activeTableSkuId);
  const pairedFormulaSku = getSkuById(safeBundleFormulaId);

  const bundlePricing = useMemo(() => {
    if (!tableSku || !pairedFormulaSku) return null;
    const t = computeSinglePassPrice(tableSku.basePriceCents, 1, TERRAZZA_DUOMO_FEE_RATE);
    const f = computeSinglePassPrice(
      pairedFormulaSku.basePriceCents,
      safeBundleGuests,
      TERRAZZA_DUOMO_FEE_RATE,
    );
    return {
      totalCents: t.lineTotalCents + f.lineTotalCents,
      tableTotalCents: t.lineTotalCents,
      formulaUnitTotalCents: f.unitTotalCents,
      formulaTotalCents: f.lineTotalCents,
    };
  }, [tableSku, pairedFormulaSku, safeBundleGuests]);

  const handleFloorChange = (next: FloorTab) => {
    setFloor(next);
    if (next === 'f1') {
      setBundleFormulaId('terrazza21-f1-brindisi');
      setBundleGuests(4);
    } else {
      setBundleFormulaId('terrazza21-f5-mare-brindisi');
      setBundleGuests(4);
    }
  };

  const handleAddBundle = (goCheckout: boolean) => {
    if (!tableSku || !pairedFormulaSku) return;
    addItem(pairedFormulaSku.id, safeBundleGuests, pairedFormulaSku.dietaryPreset, false);
    addItem(tableSku.id, 1, undefined, !goCheckout);
    if (goCheckout) {
      router.push(`${lp}/checkout`);
    }
  };

  const f1PlaceSku = getSkuById(
    f1PlaceMain === 'rubia'
      ? 'terrazza21-f1-dinner-place-rubia'
      : 'terrazza21-f1-dinner-place-ricciola',
  );
  const f1OtherSkus = [
    getSkuById('terrazza21-f1-dinner-buffet'),
    getSkuById('terrazza21-f1-brindisi'),
    getSkuById('terrazza21-f1-anno-nuovo'),
  ].filter((s): s is NonNullable<typeof s> => Boolean(s));

  const f5Skus = F5_FORMULA_IDS.map((id) => getSkuById(id)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );

  return (
    <section
      id="official-tickets-ecommerce"
      data-single-pass-venue="terrazza-duomo-21"
      className="mt-10 border border-[#050505]/20 bg-[#F6F1E7] p-6 text-[#050505] sm:p-8"
    >
      <div className="border-b border-[#050505]/15 pb-5">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#5C4415]">
          {isIt
            ? 'PRENOTAZIONE ONLINE UFFICIALE · CAPODANNO 31 DICEMBRE 2026'
            : 'OFFICIAL ONLINE BOOKING · NEW YEAR’S EVE DECEMBER 31, 2026'}
        </p>
        <h2 className="mt-1 font-serif text-2xl font-bold text-[#050505] sm:text-3xl">
          {isIt
            ? 'Prenota Terrazza Duomo 21 (1° Piano) & Terrazza MA.RE (5° Piano)'
            : 'Book Terrazza Duomo 21 (1st Floor) & Terrazza MA.RE (5th Floor)'}
        </h2>
        <p className="mt-1.5 text-sm text-[#24201B]">
          {copy.trustOnlinePayment}
        </p>

        {/* Floor Switcher Tabs */}
        <div className="mt-5 grid gap-2 sm:grid-cols-2" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={floor === 'f1'}
            onClick={() => handleFloorChange('f1')}
            className={`border px-4 py-3 text-left transition ${
              floor === 'f1'
                ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                : 'border-[#050505]/25 bg-[#EFE9DC] text-[#050505] hover:border-[#050505]'
            }`}
          >
            <span className="block font-mono text-[10px] font-bold uppercase tracking-widest opacity-80">
              {isIt ? '1° PIANO · PIAZZA DEL DUOMO 21' : '1ST FLOOR · PIAZZA DEL DUOMO 21'}
            </span>
            <span className="mt-0.5 block font-serif text-lg font-bold">
              Terrazza Duomo 21 · Chef Valerio Braschi
            </span>
            <span className="mt-0.5 block text-xs opacity-80">
              {isIt
                ? 'Cena Placé 360€, Buffet 240€, Brindisi 108€, Anno Nuovo 84€, Tavoli Terrazza'
                : 'Seated Dinner €360, Buffet €240, Toast €108, After-Midnight €84, Terrace Tables'}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={floor === 'f5'}
            onClick={() => handleFloorChange('f5')}
            className={`border px-4 py-3 text-left transition ${
              floor === 'f5'
                ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                : 'border-[#050505]/25 bg-[#EFE9DC] text-[#050505] hover:border-[#050505]'
            }`}
          >
            <span className="block font-mono text-[10px] font-bold uppercase tracking-widest opacity-80">
              {isIt ? '5° PIANO · 2 STELLE MICHELIN' : '5TH FLOOR · 2 MICHELIN STARS'}
            </span>
            <span className="mt-0.5 block font-serif text-lg font-bold">
              Terrazza MA.RE · Chef Mario &amp; Remo Capitaneo
            </span>
            <span className="mt-0.5 block text-xs opacity-80">
              {isIt
                ? 'Cena Stellata 456€, Brindisi 108€, Anno Nuovo 84€, Tavolo Terrazza 5° Piano'
                : 'Michelin Dinner €456, Toast €108, After-Midnight €84, 5th Floor Terrace Table'}
            </span>
          </button>
        </div>
      </div>

      {/* Per-Person Formula Cards */}
      <div className="mt-6">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#3D3830]">
          {floor === 'f1'
            ? isIt
              ? 'Formule a persona · 1° Piano Terrazza Duomo 21'
              : 'Per-person formulas · 1st Floor Terrazza Duomo 21'
            : isIt
              ? 'Formule a persona · 5° Piano Terrazza MA.RE'
              : 'Per-person formulas · 5th Floor Terrazza MA.RE'}
        </h3>

        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {floor === 'f1' && f1PlaceSku && (() => {
            const qty = getQty('f1-place');
            const p = computeSinglePassPrice(f1PlaceSku.basePriceCents, qty, TERRAZZA_DUOMO_FEE_RATE);
            return (
              <div className="flex flex-col justify-between border border-[#050505]/20 bg-[#EFE9DC] p-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5C4415]">
                      {isIt ? 'GRAN CENONE SERVITO · VALERIO BRASCHI' : 'SERVED GALA DINNER · VALERIO BRASCHI'}
                    </span>
                    <span className="font-mono text-xs font-bold">{f1PlaceSku.arrivalTime}</span>
                  </div>
                  <h4 className="mt-1.5 font-serif text-lg font-bold text-[#050505]">
                    {isIt ? 'Cena Placé 1° Piano · Chef Valerio Braschi' : '1st Floor Seated Gala Dinner · Chef Valerio Braschi'}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#24201B]">
                    {isIt
                      ? 'Sale interne, tavoli min. 10 ospiti condivisi. 1 bottiglia di vino ogni 2 persone, flûte di mezzanotte e DJ set. Scegli il secondo piatto per questi ospiti:'
                      : 'Indoor dining rooms, shared tables min. 10 guests. 1 bottle of wine per 2 guests, midnight champagne toast, DJ set. Select main course for these guests:'}
                  </p>

                  {/* Mandatory Main Course Choice */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setF1PlaceMain('rubia')}
                      className={`border px-2.5 py-2 text-left text-xs font-bold transition ${
                        f1PlaceMain === 'rubia'
                          ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                          : 'border-[#050505]/25 bg-white text-[#050505]'
                      }`}
                    >
                      <span className="block">Rubia gallega dry aged</span>
                      <span className="block text-[10px] font-normal opacity-80">
                        {isIt ? 'Jus affumicato e patate montate' : 'Smoked jus & whipped potatoes'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setF1PlaceMain('ricciola')}
                      className={`border px-2.5 py-2 text-left text-xs font-bold transition ${
                        f1PlaceMain === 'ricciola'
                          ? 'border-[#050505] bg-[#050505] text-[#F6F1E7]'
                          : 'border-[#050505]/25 bg-white text-[#050505]'
                      }`}
                    >
                      <span className="block">Ricciola</span>
                      <span className="block text-[10px] font-normal opacity-80">
                        {isIt ? 'Zucca tartufata e tarassaco al miele' : 'Truffled pumpkin & honey dandelion'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-3 border-t border-[#050505]/15 pt-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center border border-[#050505]/30 bg-white">
                      <button
                        type="button"
                        onClick={() => setQty('f1-place', qty - 1)}
                        aria-label="Decrease guests"
                        className="flex h-8 w-8 items-center justify-center hover:bg-[#EFE9DC]"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[3.5rem] text-center font-mono text-xs font-bold">
                        {qty} pax
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty('f1-place', qty + 1)}
                        aria-label="Increase guests"
                        className="flex h-8 w-8 items-center justify-center hover:bg-[#EFE9DC]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="block text-[#3D3830]">
                        <strong>{formatEurFromCents(p.unitTotalCents, locale)}</strong> / pax
                      </span>
                      <strong className="text-sm text-[#050505]">
                        {formatEurFromCents(p.lineTotalCents, locale)}
                      </strong>
                      {currency !== 'EUR' && (
                        <span className="ml-1 text-[11px] font-bold text-[#5C4415]">
                          (~{formatConvertedEurCents(p.lineTotalCents)})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => addItem(f1PlaceSku.id, qty, f1PlaceSku.dietaryPreset, true)}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 border border-[#050505] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#050505] hover:bg-[#F6F1E7]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                      {copy.addToCartCta}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(f1PlaceSku.id, qty, f1PlaceSku.dietaryPreset, false);
                        router.push(`${lp}/checkout`);
                      }}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center bg-[#050505] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7] hover:bg-[#24201B]"
                    >
                      {copy.buyNowCta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {(floor === 'f1' ? f1OtherSkus : f5Skus).map((sku) => {
            const qty = getQty(sku.id);
            const p = computeSinglePassPrice(sku.basePriceCents, qty, TERRAZZA_DUOMO_FEE_RATE);
            return (
              <div
                key={sku.id}
                className="flex flex-col justify-between border border-[#050505]/20 bg-[#EFE9DC] p-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#5C4415]">
                      {copy.categoryLabels[sku.category]}
                    </span>
                    <span className="font-mono text-xs font-bold">{sku.arrivalTime}</span>
                  </div>
                  <h4 className="mt-1.5 font-serif text-lg font-bold text-[#050505]">
                    {isIt ? sku.titleIt : sku.titleEn}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#24201B]">
                    {isIt ? sku.descriptionIt : sku.descriptionEn}
                  </p>
                </div>

                <div className="mt-4 space-y-3 border-t border-[#050505]/15 pt-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center border border-[#050505]/30 bg-white">
                      <button
                        type="button"
                        onClick={() => setQty(sku.id, qty - 1)}
                        aria-label="Decrease guests"
                        className="flex h-8 w-8 items-center justify-center hover:bg-[#EFE9DC]"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[3.5rem] text-center font-mono text-xs font-bold">
                        {qty} pax
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(sku.id, qty + 1)}
                        aria-label="Increase guests"
                        className="flex h-8 w-8 items-center justify-center hover:bg-[#EFE9DC]"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="block text-[#3D3830]">
                        <strong>{formatEurFromCents(p.unitTotalCents, locale)}</strong> / pax
                      </span>
                      <strong className="text-sm text-[#050505]">
                        {formatEurFromCents(p.lineTotalCents, locale)}
                      </strong>
                      {currency !== 'EUR' && (
                        <span className="ml-1 text-[11px] font-bold text-[#5C4415]">
                          (~{formatConvertedEurCents(p.lineTotalCents)})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => addItem(sku.id, qty, sku.dietaryPreset, true)}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 border border-[#050505] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#050505] hover:bg-[#F6F1E7]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                      {copy.addToCartCta}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(sku.id, qty, sku.dietaryPreset, false);
                        router.push(`${lp}/checkout`);
                      }}
                      className="inline-flex min-h-[40px] flex-1 items-center justify-center bg-[#050505] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7] hover:bg-[#24201B]"
                    >
                      {copy.buyNowCta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Terrace Table / Private Terrace Paired Bundle Builder */}
      {tableSku && pairedFormulaSku && bundlePricing && (
        <div className="mt-6 border border-[#050505] bg-[#0B0A09] p-5 text-[#F6F1E7] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#F6F1E7]/15 pb-4">
            <div>
              <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {isIt
                  ? 'TAVOLO IN TERRAZZA VISTA DUOMO · ABBINAMENTO OBBLIGATORIO'
                  : 'DUOMO-VIEW TERRACE TABLE · MANDATORY PAIRING BUILDER'}
              </p>
              <h3 className="mt-1 font-serif text-xl font-bold text-[#F6F1E7]">
                {floor === 'f1'
                  ? isIt
                    ? 'Configura Tavolo Terrazza (max 4) o Terrazzino Privato (max 8) · 1° Piano'
                    : 'Configure Terrace Table (max 4) or Private Terrace (max 8) · 1st Floor'
                  : isIt
                    ? 'Configura Tavolo in Terrazza 5° Piano MA.RE (max 4 ospiti)'
                    : 'Configure 5th Floor MA.RE Terrace Table (max 4 guests)'}
              </h3>
              <p className="mt-1 text-xs text-[#C2B9AA]">
                {isIt
                  ? 'Include 2 bottiglie di champagne o superalcolico. Come da regolamento ufficiale, va sempre abbinato a una formula a persona dello stesso piano.'
                  : 'Includes 2 bottles of champagne or premium spirits. Under official venue rules, every terrace table must be paired with per-person formulas on the same floor.'}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {floor === 'f1' && (
              <div>
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#C9A84C]">
                  {isIt ? '1. Tipo di tavolo 1° Piano' : '1. 1st Floor Table Type'}
                </span>
                <div className="mt-2 grid gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setF1TableType('terrace4');
                      setBundleGuests((g) => Math.min(4, g));
                    }}
                    className={`border px-3 py-2 text-left text-xs ${
                      f1TableType === 'terrace4'
                        ? 'border-[#C9A84C] bg-[#1D1810] text-[#F6F1E7]'
                        : 'border-[#F6F1E7]/20 bg-[#050505] text-[#C2B9AA]'
                    }`}
                  >
                    <strong className="block">
                      {isIt ? 'Tavolo in Terrazza (max 4 pax)' : 'Terrace Table (max 4 guests)'}
                    </strong>
                    <span className="font-mono text-[11px] text-[#C9A84C]">
                      {isIt ? '720€' : '€720'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setF1TableType('private8');
                      setBundleGuests(8);
                    }}
                    className={`border px-3 py-2 text-left text-xs ${
                      f1TableType === 'private8'
                        ? 'border-[#C9A84C] bg-[#1D1810] text-[#F6F1E7]'
                        : 'border-[#F6F1E7]/20 bg-[#050505] text-[#C2B9AA]'
                    }`}
                  >
                    <strong className="block">
                      {isIt ? 'Terrazzino Privato (max 8 pax)' : 'Private Terrace (max 8 guests)'}
                    </strong>
                    <span className="font-mono text-[11px] text-[#C9A84C]">
                      {isIt ? '1.440€' : '€1,440'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className={floor === 'f5' ? 'lg:col-span-2' : ''}>
              <label
                htmlFor="terrazza-bundle-formula"
                className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#C9A84C]"
              >
                {isIt ? 'Formula abbinata per ogni ospite' : 'Paired per-person formula'}
              </label>
              <select
                id="terrazza-bundle-formula"
                value={safeBundleFormulaId}
                onChange={(e) => setBundleFormulaId(e.target.value)}
                className="mt-2 h-11 w-full border border-[#F6F1E7]/25 bg-[#050505] px-3 text-xs font-semibold text-[#F6F1E7]"
              >
                {activeBundleFormulas.map((id) => {
                  const s = getSkuById(id);
                  if (!s) return null;
                  const sp = computeSinglePassPrice(s.basePriceCents, 1, TERRAZZA_DUOMO_FEE_RATE);
                  return (
                    <option key={id} value={id}>
                      {(isIt ? s.titleIt : s.titleEn)} ({formatEurFromCents(sp.unitTotalCents, locale)} / pax)
                    </option>
                  );
                })}
              </select>

              <div className="mt-3">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#C9A84C]">
                  {isIt
                    ? `Numero ospiti al tavolo (1–${activeTableMaxCap} pax)`
                    : `Number of guests at table (1–${activeTableMaxCap} pax)`}
                </span>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {Array.from({ length: activeTableMaxCap }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setBundleGuests(n)}
                      className={`h-9 min-w-[2.5rem] border font-mono text-xs font-bold transition ${
                        safeBundleGuests === n
                          ? 'border-[#F6F1E7] bg-[#F6F1E7] text-[#050505]'
                          : 'border-[#F6F1E7]/25 bg-[#050505] text-[#C2B9AA]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between border border-[#F6F1E7]/15 bg-[#050505] p-4">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[#C2B9AA]">
                  <span>
                    {floor === 'f1' && f1TableType === 'private8'
                      ? isIt
                        ? 'Terrazzino Privato'
                        : 'Private Terrace'
                      : isIt
                        ? 'Tavolo in Terrazza'
                        : 'Terrace Table'}
                  </span>
                  <span>{formatEurFromCents(bundlePricing.tableTotalCents, locale)}</span>
                </div>
                <div className="flex justify-between text-[#C2B9AA]">
                  <span>
                    {safeBundleGuests} × {formatEurFromCents(bundlePricing.formulaUnitTotalCents, locale)}
                  </span>
                  <span>{formatEurFromCents(bundlePricing.formulaTotalCents, locale)}</span>
                </div>
                <div className="flex justify-between border-t border-[#F6F1E7]/15 pt-2 text-base font-bold text-[#F6F1E7]">
                  <span>{copy.totalLabel}</span>
                  <span>{formatEurFromCents(bundlePricing.totalCents, locale)}</span>
                </div>
                {currency !== 'EUR' && (
                  <p className="text-right text-[11px] font-bold text-[#C9A84C]">
                    ~{formatConvertedEurCents(bundlePricing.totalCents)} ({currency})
                  </p>
                )}
              </div>

              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={() => handleAddBundle(true)}
                  className="inline-flex min-h-[42px] w-full items-center justify-center gap-1.5 bg-[#F6F1E7] px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-[#050505] hover:bg-[#EAE3D5]"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  {isIt
                    ? `Prenota Tavolo + ${safeBundleGuests} Pax`
                    : `Book Table + ${safeBundleGuests} Guests`}
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBundle(false)}
                  className="inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 border border-[#F6F1E7]/30 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#F6F1E7] hover:border-[#F6F1E7]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                  {copy.addToCartCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Official Refund Guarantee Strip */}
      <div className="mt-5 grid gap-3 border-t border-[#050505]/15 pt-4 text-xs text-[#24201B] sm:grid-cols-2">
        <p className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#050505]" aria-hidden="true" />
          <span>{terrazzaUi.confirmationRefundNotice}</span>
        </p>
        <p className="flex items-start gap-2">
          <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#050505]" aria-hidden="true" />
          <span>{terrazzaUi.entryCheckpointNotice}</span>
        </p>
      </div>
    </section>
  );
}
