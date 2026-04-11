/**
 * CheckoutForm — single-page checkout for the Zero Waste storefront.
 * Used in: /checkout page.
 *
 * Reads the active cart from CartProvider, collects address + shipping
 * method + payment, then walks the customer through the four-step
 * Medusa checkout flow on submit:
 *
 *   1. cart.update with email + shipping/billing address
 *   2. cart.addShippingMethod with the picked option
 *   3. payment.initiatePaymentSession with the picked provider
 *   4. cart.complete → order
 *
 * On success the local cart id is cleared, the cart provider is
 * refreshed (so the header badge resets to 0), and the customer is
 * redirected to /order-confirmation/<order-id>.
 *
 * Auth + cart state are checked on mount: anyone hitting /checkout
 * without an active cart gets bounced to /cart, anyone logged out gets
 * bounced to /signin?redirect=/checkout.
 */
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/auth-provider";
import { useCart } from "@/components/cart/cart-provider";
import { Input } from "@/components/ui/input";
import {
  completeCart,
  initializePayment,
  listPaymentProviders,
  listShippingOptions,
  selectShippingMethod,
  setCheckoutAddress,
  type CheckoutAddressInput,
} from "@/lib/checkout";
import { CART_ID_KEY } from "@/lib/cart";
import type { PaymentProvider, ShippingOption } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/** Empty address used to seed the form on first render. */
const EMPTY_ADDRESS: CheckoutAddressInput = {
  first_name: "",
  last_name: "",
  address_1: "",
  address_2: "",
  city: "",
  province: "",
  postal_code: "",
  country_code: "us",
  phone: "",
};

export function CheckoutForm() {
  const router = useRouter();
  const { customer, isAuthenticated, isLoading: authLoading } = useAuth();
  const { cart, isLoading: cartLoading, refresh: refreshCart } = useCart();

  // ── Form state ───────────────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState<CheckoutAddressInput>(EMPTY_ADDRESS);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(
    null
  );
  const [paymentProviders, setPaymentProviders] = useState<PaymentProvider[]>(
    []
  );

  // ── Async state ──────────────────────────────────────────────────────
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Pre-fill the email from the authenticated customer once it loads. */
  useEffect(() => {
    if (customer?.email && !email) {
      setEmail(customer.email);
    }
  }, [customer?.email, email]);

  /* Pre-fill the form from the cart's existing address if one is set
     (e.g. user navigated back from a failed checkout attempt). */
  useEffect(() => {
    if (!cart) return;
    const cartAddress = (
      cart as unknown as {
        shipping_address?: Partial<CheckoutAddressInput> | null;
      }
    ).shipping_address;
    if (cartAddress && cartAddress.address_1) {
      setAddress((prev) => ({
        ...prev,
        first_name: cartAddress.first_name ?? prev.first_name,
        last_name: cartAddress.last_name ?? prev.last_name,
        address_1: cartAddress.address_1 ?? prev.address_1,
        address_2: cartAddress.address_2 ?? prev.address_2,
        city: cartAddress.city ?? prev.city,
        province: cartAddress.province ?? prev.province,
        postal_code: cartAddress.postal_code ?? prev.postal_code,
        country_code: cartAddress.country_code ?? prev.country_code ?? "us",
        phone: cartAddress.phone ?? prev.phone,
      }));
    }
  }, [cart]);

  /* Fetch shipping options + payment providers once the cart is loaded. */
  useEffect(() => {
    if (!cart) return;
    let cancelled = false;
    (async () => {
      setOptionsLoading(true);
      const [shipResult, payResult] = await Promise.all([
        listShippingOptions(cart.id),
        cart.region_id
          ? listPaymentProviders(cart.region_id)
          : Promise.resolve({ success: true, data: [] as PaymentProvider[] }),
      ]);
      if (cancelled) return;
      if (shipResult.success && shipResult.data) {
        setShippingOptions(shipResult.data);
        /* Default to the first shipping option, or the one already
           saved on the cart if there is one. */
        const existing = (
          cart as unknown as {
            shipping_methods?: { shipping_option_id: string }[];
          }
        ).shipping_methods?.[0]?.shipping_option_id;
        setSelectedShippingId(existing ?? shipResult.data[0]?.id ?? null);
      }
      if (payResult.success && payResult.data) {
        setPaymentProviders(payResult.data.filter((p) => p.is_enabled));
      }
      setOptionsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [cart]);

  // ── Auth + cart guards ────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading || cartLoading) return;
    if (!isAuthenticated) {
      router.replace("/signin?redirect=/checkout");
      return;
    }
    if (!cart || cart.items.length === 0) {
      router.replace("/cart");
    }
  }, [authLoading, cartLoading, isAuthenticated, cart, router]);

  // ── Submit handler ───────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!cart) return;
    if (!selectedShippingId) {
      setError("Please choose a shipping option");
      return;
    }
    if (paymentProviders.length === 0) {
      setError("No payment provider configured");
      return;
    }

    setSubmitting(true);
    setError(null);

    /* Step 1: address + email */
    const addressResult = await setCheckoutAddress(cart.id, email, address);
    if (!addressResult.success) {
      setError(addressResult.error || "Could not save address");
      setSubmitting(false);
      return;
    }

    /* Step 2: shipping method */
    const shippingResult = await selectShippingMethod(
      cart.id,
      selectedShippingId
    );
    if (!shippingResult.success || !shippingResult.data) {
      setError(shippingResult.error || "Could not set shipping method");
      setSubmitting(false);
      return;
    }

    /* Step 3: initialize payment session on the now-up-to-date cart */
    const paymentResult = await initializePayment(
      shippingResult.data,
      paymentProviders[0].id
    );
    if (!paymentResult.success) {
      setError(paymentResult.error || "Could not initialize payment");
      setSubmitting(false);
      return;
    }

    /* Step 4: complete the cart → place the order */
    const orderResult = await completeCart(cart.id);
    if (!orderResult.success || !orderResult.data) {
      setError(orderResult.error || "Could not place order");
      setSubmitting(false);
      return;
    }

    /* Success — drop the local cart id, refresh the provider state so
       the header badge resets, and send the customer to the order
       confirmation page. */
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CART_ID_KEY);
    }
    await refreshCart();
    router.push(`/order-confirmation/${orderResult.data.id}`);
  }

  // ── Derived ──────────────────────────────────────────────────────────
  /** Cart used for the order summary — includes any saved shipping cost. */
  const summaryCart = cart;
  const currency = summaryCart?.currency_code ?? "usd";

  const selectedShipping = useMemo(
    () => shippingOptions.find((o) => o.id === selectedShippingId) ?? null,
    [shippingOptions, selectedShippingId]
  );

  /* While the auth + cart guards are still resolving, render nothing.
     The router replace() above takes care of the redirect on the next
     tick — we just don't want a flash of the form first. */
  if (authLoading || cartLoading || !cart || cart.items.length === 0) {
    return <CheckoutLoadingSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
        {/* Left column — form sections */}
        <div className="space-y-8">
          {/* Contact */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-8">
            <h2 className="font-heading text-base font-extrabold uppercase tracking-[0.06em] text-primary">
              Contact
            </h2>
            <div className="mt-5">
              <Input
                id="email"
                label="Email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </section>

          {/* Shipping address */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-8">
            <h2 className="font-heading text-base font-extrabold uppercase tracking-[0.06em] text-primary">
              Shipping Address
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input
                id="first_name"
                label="First name"
                required
                autoComplete="given-name"
                value={address.first_name}
                onChange={(e) =>
                  setAddress({ ...address, first_name: e.target.value })
                }
              />
              <Input
                id="last_name"
                label="Last name"
                required
                autoComplete="family-name"
                value={address.last_name}
                onChange={(e) =>
                  setAddress({ ...address, last_name: e.target.value })
                }
              />
              <div className="sm:col-span-2">
                <Input
                  id="address_1"
                  label="Street address"
                  required
                  autoComplete="address-line1"
                  value={address.address_1}
                  onChange={(e) =>
                    setAddress({ ...address, address_1: e.target.value })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  id="address_2"
                  label="Apt, suite, etc. (optional)"
                  autoComplete="address-line2"
                  value={address.address_2 ?? ""}
                  onChange={(e) =>
                    setAddress({ ...address, address_2: e.target.value })
                  }
                />
              </div>
              <Input
                id="city"
                label="City"
                required
                autoComplete="address-level2"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <Input
                id="province"
                label="State"
                required
                autoComplete="address-level1"
                value={address.province}
                onChange={(e) =>
                  setAddress({ ...address, province: e.target.value })
                }
              />
              <Input
                id="postal_code"
                label="ZIP code"
                required
                autoComplete="postal-code"
                value={address.postal_code}
                onChange={(e) =>
                  setAddress({ ...address, postal_code: e.target.value })
                }
              />
              <Input
                id="phone"
                label="Phone (optional)"
                type="tel"
                autoComplete="tel"
                value={address.phone ?? ""}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
            </div>
          </section>

          {/* Shipping method */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-8">
            <h2 className="font-heading text-base font-extrabold uppercase tracking-[0.06em] text-primary">
              Shipping Method
            </h2>
            <div className="mt-5 space-y-3">
              {optionsLoading ? (
                <div className="h-16 animate-pulse rounded-xl bg-surface-sage/40" />
              ) : shippingOptions.length === 0 ? (
                <p className="text-sm text-text-secondary">
                  No shipping options available for this address.
                </p>
              ) : (
                shippingOptions.map((option) => {
                  const isActive = option.id === selectedShippingId;
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
                        isActive
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-neutral-200 hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={isActive}
                        onChange={() => setSelectedShippingId(option.id)}
                        className="h-4 w-4 text-accent"
                      />
                      <div className="flex-1">
                        <p className="font-heading text-sm font-bold text-primary">
                          {option.name}
                        </p>
                        {option.type?.description && (
                          <p className="mt-0.5 text-xs text-text-secondary">
                            {option.type.description}
                          </p>
                        )}
                      </div>
                      <p className="font-heading text-sm font-extrabold text-accent">
                        {formatPrice(option.amount, currency)}
                      </p>
                    </label>
                  );
                })
              )}
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-8">
            <h2 className="font-heading text-base font-extrabold uppercase tracking-[0.06em] text-primary">
              Payment
            </h2>
            <div className="mt-5 rounded-xl border border-dashed border-primary/20 bg-surface/40 p-5">
              <p className="font-heading text-sm font-bold text-primary">
                Test payment (manual processing)
              </p>
              <p className="mt-1 text-xs text-text-secondary">
                The store is currently using Medusa&apos;s built-in test
                payment provider — no card will be charged. Real card
                payments will be enabled once Stripe is wired up.
              </p>
            </div>
          </section>
        </div>

        {/* Right column — order summary + place order button */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] lg:p-7">
            <h2 className="font-heading text-lg font-extrabold tracking-tight text-primary">
              Order Summary
            </h2>

            {/* Line items */}
            <ul className="mt-5 space-y-4">
              {cart.items.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface">
                    {item.thumbnail && (
                      <Image
                        src={item.thumbnail}
                        alt={item.product_title ?? "Product"}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-xs font-bold text-primary">
                      {item.product_title}
                    </p>
                    {item.variant_title &&
                      item.variant_title !== "Default" && (
                        <p className="text-[11px] text-text-secondary">
                          {item.variant_title}
                        </p>
                      )}
                  </div>
                  <p className="font-heading text-xs font-bold text-accent">
                    {formatPrice(item.subtotal, currency)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-3 border-t border-surface-sage pt-5 text-sm">
              <SummaryRow
                label="Subtotal"
                value={formatPrice(cart.subtotal, currency)}
              />
              <SummaryRow
                label="Shipping"
                value={
                  selectedShipping
                    ? formatPrice(selectedShipping.amount, currency)
                    : cart.shipping_total > 0
                      ? formatPrice(cart.shipping_total, currency)
                      : "—"
                }
              />
              {cart.discount_total > 0 && (
                <SummaryRow
                  label="Discount"
                  value={`-${formatPrice(cart.discount_total, currency)}`}
                />
              )}
              <SummaryRow
                label="Tax"
                value={
                  cart.tax_total > 0
                    ? formatPrice(cart.tax_total, currency)
                    : "Calculated at checkout"
                }
              />
            </div>

            <div className="mt-5 flex items-baseline justify-between border-t border-surface-sage pt-5">
              <span className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-primary">
                Total
              </span>
              <span className="font-heading text-2xl font-extrabold text-accent">
                {formatPrice(
                  /* Use the cart total + the selected shipping if Medusa
                     hasn't yet recalculated server-side. */
                  cart.total +
                    (selectedShipping && cart.shipping_total === 0
                      ? selectedShipping.amount
                      : 0),
                  currency
                )}
              </span>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || optionsLoading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-heading text-sm font-bold uppercase tracking-[0.08em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:bg-primary disabled:hover:shadow-lg"
            >
              {submitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Placing order…
                </>
              ) : (
                <>
                  Place Order
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>

            <Link
              href="/cart"
              className="mt-3 block text-center font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 hover:text-primary"
            >
              Edit Cart
            </Link>
          </div>
        </aside>
      </div>
    </form>
  );
}

/** Single line in the order summary <dl>. */
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="font-medium text-primary">{value}</dd>
    </div>
  );
}

/** Skeleton shown while auth/cart state is still resolving. */
function CheckoutLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
        <div className="space-y-6">
          <div className="h-32 animate-pulse rounded-2xl bg-white/60" />
          <div className="h-96 animate-pulse rounded-2xl bg-white/60" />
          <div className="h-40 animate-pulse rounded-2xl bg-white/60" />
        </div>
        <div className="h-96 animate-pulse rounded-2xl bg-white/60" />
      </div>
    </div>
  );
}
