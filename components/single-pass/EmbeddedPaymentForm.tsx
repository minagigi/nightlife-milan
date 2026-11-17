'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { localePrefix } from '@/lib/i18n/locales';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';

type GatewayError = { message?: string; type?: string; code?: string };
type GatewayPaymentIntent = { id?: string; status?: string };
type GatewayElementInstance = {
  mount: (domNode: HTMLElement | string) => void;
  destroy: () => void;
  on: (event: string, handler: () => void) => void;
};
type GatewayElementsInstance = {
  create: (type: 'payment', options?: Record<string, unknown>) => GatewayElementInstance;
};
type GatewayClientInstance = {
  elements: (options: Record<string, unknown>) => GatewayElementsInstance;
  confirmPayment: (options: Record<string, unknown>) => Promise<{
    error?: GatewayError;
    paymentIntent?: GatewayPaymentIntent;
  }>;
};

declare global {
  interface Window {
    Stripe?: (key: string, opts?: Record<string, unknown>) => GatewayClientInstance;
  }
}

let gatewayScriptPromise: Promise<void> | null = null;

function loadPaymentGatewayScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Stripe) return Promise.resolve();
  if (gatewayScriptPromise) return gatewayScriptPromise;

  gatewayScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-nlm-payment-sdk="1"]');
    if (existing) {
      if (window.Stripe) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Gateway SDK load failed')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.dataset.nlmPaymentSdk = '1';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Unable to load encrypted payment form'));
    document.head.appendChild(script);
  });
  return gatewayScriptPromise;
}

const SUPPORTED_ELEMENT_LOCALES = new Set([
  'ar', 'bg', 'cs', 'da', 'de', 'el', 'en', 'es', 'et', 'fi', 'fr', 'hr', 'hu',
  'it', 'lt', 'lv', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sv', 'tr', 'zh',
]);

export default function EmbeddedPaymentForm({
  publishableKey,
  clientSecret,
  orderId,
  locale,
  fullName,
  email,
  phone,
  billingTotalDisplay,
  eurTotalDisplay,
  showEurReference,
  onBack,
  clearCart,
}: {
  publishableKey: string;
  clientSecret: string;
  orderId: string;
  locale: string;
  fullName: string;
  email: string;
  phone: string;
  billingTotalDisplay: string;
  eurTotalDisplay: string;
  showEurReference: boolean;
  onBack?: () => void;
  clearCart: () => void;
}) {
  const router = useRouter();
  const copy = getSinglePassCopy(locale);
  const lp = localePrefix(locale);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gatewayRef = useRef<GatewayClientInstance | null>(null);
  const elementsRef = useRef<GatewayElementsInstance | null>(null);

  const [elementReady, setElementReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let mountedElement: GatewayElementInstance | null = null;

    setElementReady(false);
    setErrorMessage(null);

    loadPaymentGatewayScript()
      .then(() => {
        if (cancelled || !window.Stripe || !containerRef.current) return;
        const cleanLocale = SUPPORTED_ELEMENT_LOCALES.has(locale) ? locale : 'auto';
        const gw = window.Stripe(publishableKey, { locale: cleanLocale });
        const els = gw.elements({
          clientSecret,
          appearance: {
            theme: 'night',
            variables: {
              colorPrimary: '#F6F1E7',
              colorBackground: '#050505',
              colorText: '#F6F1E7',
              colorTextSecondary: '#C2B9AA',
              colorDanger: '#FB7185',
              borderRadius: '0px',
              spacingUnit: '4px',
            },
            rules: {
              '.Input': {
                border: '1px solid rgba(246, 241, 231, 0.25)',
                backgroundColor: '#050505',
                color: '#F6F1E7',
                boxShadow: 'none',
              },
              '.Input:focus': {
                border: '1px solid #C9A84C',
                boxShadow: 'none',
              },
              '.Label': {
                color: '#EAE3D5',
                fontSize: '12px',
              },
            },
          },
        });

        const payEl = els.create('payment', {
          layout: 'tabs',
          terms: {
            card: 'never',
            applePay: 'never',
            googlePay: 'never',
          },
          wallets: {
            applePay: 'auto',
            googlePay: 'auto',
          },
        });

        payEl.on('ready', () => {
          if (!cancelled) setElementReady(true);
        });

        containerRef.current.innerHTML = '';
        payEl.mount(containerRef.current);

        mountedElement = payEl;
        gatewayRef.current = gw;
        elementsRef.current = els;
      })
      .catch((err) => {
        if (!cancelled) {
          const msg = (err instanceof Error ? err.message : String(err)).replace(/stripe/gi, 'payment');
          setErrorMessage(msg);
        }
      });

    return () => {
      cancelled = true;
      try {
        mountedElement?.destroy();
      } catch {
        // ignore unmount errors
      }
    };
  }, [publishableKey, clientSecret, locale]);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatewayRef.current || !elementsRef.current || !elementReady) return;
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const returnUrl = `${window.location.origin}${lp}/thank-you?order=${encodeURIComponent(orderId)}`;
      const { error, paymentIntent } = await gatewayRef.current.confirmPayment({
        elements: elementsRef.current,
        redirect: 'if_required',
        confirmParams: {
          return_url: returnUrl,
          payment_method_data: {
            billing_details: {
              name: fullName,
              email,
              phone,
            },
          },
        },
      });

      if (error) {
        const cleanMsg = (error.message || 'Payment verification failed').replace(/stripe/gi, 'payment gateway');
        setErrorMessage(cleanMsg);
        setSubmitting(false);
        return;
      }

      if (paymentIntent?.id) {
        const verifyRes = await fetch('/api/single-pass/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            paymentIntentId: paymentIntent.id,
          }),
        });
        if (!verifyRes.ok) {
          const verifyJson = (await verifyRes.json().catch(() => null)) as { error?: string } | null;
          setErrorMessage(
            (verifyJson?.error || 'Payment verification is pending').replace(/stripe/gi, 'payment'),
          );
          setSubmitting(false);
          return;
        }
        clearCart();
        router.push(
          `${lp}/thank-you?order=${encodeURIComponent(orderId)}&payment_intent=${encodeURIComponent(paymentIntent.id)}`,
        );
      }
    } catch (err) {
      const cleanMsg = (err instanceof Error ? err.message : 'Payment error').replace(/stripe/gi, 'payment');
      setErrorMessage(cleanMsg);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleConfirm}
      data-embedded-checkout-form
      className="space-y-6 border border-[#F6F1E7]/20 bg-[#0B0A09] p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F6F1E7]/12 pb-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
            {copy.stepPaymentLabel}
          </p>
          <p className="mt-1 font-mono text-xs text-[#C2B9AA]">
            {copy.orderIdLabel}: <strong className="text-[#F6F1E7]">{orderId}</strong>
          </p>
        </div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-[36px] items-center gap-1.5 border border-[#F6F1E7]/25 px-3 py-1.5 text-xs font-semibold text-[#EAE3D5] hover:border-[#F6F1E7]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.backToDetailsCta}
          </button>
        )}
      </div>

      <div className="border border-[#F6F1E7]/15 bg-[#050505] p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C2B9AA]">
            {copy.billingTotalLabel}
          </span>
          <span className="font-mono text-xl font-extrabold text-[#F6F1E7]">{billingTotalDisplay}</span>
        </div>
        {showEurReference && (
          <p className="mt-1 text-right font-mono text-xs text-[#8E8577]">
            {copy.eurOriginalLabel}: {eurTotalDisplay}
          </p>
        )}
      </div>

      {!elementReady && !errorMessage && (
        <div className="border border-[#F6F1E7]/15 bg-[#050505] p-6 text-center font-mono text-xs text-[#C2B9AA]">
          Loading encrypted payment terminal...
        </div>
      )}

      <div
        ref={containerRef}
        className={`min-h-[160px] transition-opacity ${elementReady ? 'opacity-100' : 'opacity-30'}`}
      />

      {errorMessage && (
        <div className="border border-rose-500/40 bg-rose-950/35 p-3.5 text-xs text-rose-200">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!elementReady || submitting}
        className="flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#F6F1E7] px-5 py-3.5 text-xs font-extrabold uppercase tracking-widest text-[#050505] transition hover:bg-[#EAE3D5] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Lock className="h-4 w-4" aria-hidden="true" />
        <span>
          {submitting ? copy.paymentProcessingLabel : `${copy.paySafelyCta} (${billingTotalDisplay})`}
        </span>
      </button>

      <div className="flex items-center justify-center gap-2 text-center font-mono text-[11px] text-[#8E8577]">
        <ShieldCheck className="h-3.5 w-3.5 text-[#C9A84C]" aria-hidden="true" />
        <span>PCI-DSS Level 1 Encrypted On-Site Payment · Nightlife Milan</span>
      </div>
    </form>
  );
}
