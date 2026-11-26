'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { localePrefix } from '@/lib/i18n/locales';
import { getCheckoutUxCopy, getSinglePassCopy } from '@/lib/single-pass/i18n35';

type GatewayError = {
  message?: string;
  type?: string;
  code?: string;
  decline_code?: string;
  payment_intent?: { id?: string };
};
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
      existing.addEventListener('error', () => reject(new Error('Gateway SDK load failed')), {
        once: true,
      });
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
  clearCart: (opts?: { converted?: boolean }) => void;
}) {
  const router = useRouter();
  const copy = getSinglePassCopy(locale);
  const uxCopy = getCheckoutUxCopy(locale);
  const lp = localePrefix(locale);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gatewayRef = useRef<GatewayClientInstance | null>(null);
  const elementsRef = useRef<GatewayElementsInstance | null>(null);
  const confirmLockRef = useRef(false);

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
            theme: 'flat',
            variables: {
              colorPrimary: '#0A0A0C',
              colorBackground: '#FFFFFF',
              colorText: '#0A0A0C',
              colorTextSecondary: '#4F4D48',
              colorDanger: '#B91C1C',
              borderRadius: '0px',
              spacingUnit: '4px',
            },
            rules: {
              '.Input': {
                border: '1px solid rgba(10, 10, 12, 0.28)',
                backgroundColor: '#FFFFFF',
                color: '#0A0A0C',
                boxShadow: 'none',
              },
              '.Input:focus': {
                border: '2px solid #0A0A0C',
                boxShadow: 'none',
              },
              '.Input--invalid': {
                border: '2px solid #B91C1C',
                backgroundColor: '#FEF2F2',
              },
              '.Label': {
                color: '#0A0A0C',
                fontSize: '13px',
                fontWeight: '600',
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
    if (!gatewayRef.current || !elementsRef.current || !elementReady || confirmLockRef.current) return;
    confirmLockRef.current = true;
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
        const cleanMsg = (error.message || uxCopy.errPaymentSession).replace(
          /stripe/gi,
          'payment gateway',
        );
        if (error.type !== 'validation_error' || Boolean(error.decline_code)) {
          const derivedPiId =
            error.payment_intent?.id || clientSecret.split('_secret_')[0] || '';
          fetch(`/api/single-pass/orders/${encodeURIComponent(orderId)}/payment-failed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            keepalive: true,
            body: JSON.stringify({
              paymentIntentId: derivedPiId,
              code: error.code,
              declineCode: error.decline_code,
              type: error.type,
              message: cleanMsg,
            }),
          }).catch(() => {});
        }
        setErrorMessage(cleanMsg);
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
            (verifyJson?.error || uxCopy.errPaymentSession).replace(/stripe/gi, 'payment'),
          );
          return;
        }
        clearCart({ converted: true });
        router.push(
          `${lp}/thank-you?order=${encodeURIComponent(orderId)}&payment_intent=${encodeURIComponent(paymentIntent.id)}`,
        );
      }
    } catch (err) {
      const cleanMsg = (err instanceof Error ? err.message : uxCopy.errNetwork).replace(
        /stripe/gi,
        'payment',
      );
      setErrorMessage(cleanMsg);
    } finally {
      confirmLockRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleConfirm}
      data-embedded-checkout-form
      className="overflow-hidden border border-[#050505] bg-[#F6F1E7] text-[#050505]"
    >
      <div className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#050505]/18 pb-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#4A453E]">
              {copy.stepPaymentLabel}
            </p>
            <p className="mt-1 text-sm text-[#4A453E] tabular-nums">
              {copy.orderIdLabel}: <strong className="text-[#050505]">{orderId}</strong>
            </p>
          </div>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-[42px] items-center gap-1.5 border border-[#050505] bg-[#FFFFFF] px-3.5 py-1.5 text-xs font-bold text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.backToDetailsCta}
            </button>
          )}
        </div>

        <div className="border border-[#050505] bg-[#EAE3D5] p-4 tabular-nums">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-bold uppercase text-[#050505]">{copy.billingTotalLabel}</span>
            <span className="font-display text-3xl font-extrabold text-[#050505]">
              {billingTotalDisplay}
            </span>
          </div>
          {showEurReference && (
            <p className="mt-1 text-right font-mono text-xs font-medium text-[#4A453E]">
              {copy.eurOriginalLabel}: {eurTotalDisplay}
            </p>
          )}
        </div>

        {!elementReady && !errorMessage && (
          <div className="border border-[#050505]/25 bg-[#FFFFFF] p-6 text-center text-sm font-medium text-[#4A453E]">
            {copy.paymentProcessingLabel}
          </div>
        )}

        <div
          ref={containerRef}
          className={`min-h-[160px] border border-[#050505]/25 bg-[#FFFFFF] p-4 transition-opacity ${
            elementReady ? 'opacity-100' : 'opacity-40'
          }`}
        />

        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-2.5 border-2 border-[#991B1B] bg-[#FEF2F2] p-4 text-sm font-bold text-[#991B1B]"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-[#050505] bg-[#050505] p-6 text-[#F6F1E7]">
        <button
          type="submit"
          disabled={!elementReady || submitting}
          className="flex min-h-[56px] w-full items-center justify-center gap-2 bg-[#25D366] px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-[#050505] transition hover:bg-[#2EE472] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Lock className="h-4 w-4" aria-hidden="true" />
          <span>
            {submitting ? copy.paymentProcessingLabel : `${copy.paySafelyCta} (${billingTotalDisplay})`}
          </span>
        </button>

        <div className="flex items-center justify-center gap-2 text-center text-xs text-[#C2B9AA]">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden="true" />
          <span>{uxCopy.cardStepSecureNote}</span>
        </div>
      </div>
    </form>
  );
}
