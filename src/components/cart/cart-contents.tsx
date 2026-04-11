/**
 * CartContents — client-side cart page body.
 * Used in: /cart page.
 *
 * Reads the cart from {@link useCart} and renders one of three states:
 *
 * 1. Initial hydration → loading skeleton
 * 2. Empty cart → branded empty state with continue-shopping CTA
 * 3. Populated cart → line items + order summary + checkout CTA
 *
 * Quantity controls and remove buttons call back into the cart provider,
 * which round-trips through the Medusa cart API and updates state with
 * the server's authoritative totals.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/utils";
import type { CartLineItem } from "@/lib/types";

export function CartContents() {
  const { cart, isLoading } = useCart();

  if (isLoading) {
    return <CartLoadingSkeleton />;
  }

  if (!cart || cart.items.length === 0) {
    return <CartEmptyState />;
  }

  const currency = cart.currency_code;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
        {/* Line items */}
        <ul className="flex flex-col divide-y divide-surface-sage rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          {cart.items.map((item) => (
            <CartLineItemRow key={item.id} item={item} currency={currency} />
          ))}
        </ul>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] lg:p-7">
            <h2 className="font-heading text-lg font-extrabold tracking-tight text-primary">
              Order Summary
            </h2>

            <dl className="mt-5 space-y-3 text-sm">
              <SummaryRow
                label="Subtotal"
                value={formatPrice(cart.subtotal, currency)}
              />
              {cart.discount_total > 0 && (
                <SummaryRow
                  label="Discount"
                  value={`-${formatPrice(cart.discount_total, currency)}`}
                  emphasize
                />
              )}
              <SummaryRow
                label="Shipping"
                value={
                  cart.shipping_total > 0
                    ? formatPrice(cart.shipping_total, currency)
                    : "Calculated at checkout"
                }
              />
              <SummaryRow
                label="Tax"
                value={
                  cart.tax_total > 0
                    ? formatPrice(cart.tax_total, currency)
                    : "Calculated at checkout"
                }
              />
            </dl>

            <div className="mt-5 flex items-baseline justify-between border-t border-surface-sage pt-5">
              <span className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-primary">
                Total
              </span>
              <span className="font-heading text-2xl font-extrabold text-accent">
                {formatPrice(cart.total, currency)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-heading text-sm font-bold uppercase tracking-[0.08em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl"
            >
              Checkout
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
            </Link>

            <Link
              href="/collections"
              className="mt-3 block text-center font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 hover:text-primary"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

/**
 * CartLineItemRow — single row in the cart with image, title, qty controls,
 * and price. Manages its own optimistic loading state for the qty change.
 */
function CartLineItemRow({
  item,
  currency,
}: {
  item: CartLineItem;
  currency: string;
}) {
  const { updateItem, removeItem } = useCart();
  const [pending, setPending] = useState(false);

  async function changeQty(next: number) {
    if (next < 0 || next === item.quantity) return;
    setPending(true);
    if (next === 0) {
      await removeItem(item.id);
    } else {
      await updateItem(item.id, next);
    }
    setPending(false);
  }

  async function handleRemove() {
    setPending(true);
    await removeItem(item.id);
    setPending(false);
  }

  return (
    <li className="flex gap-5 p-5 sm:p-6">
      {/* Thumbnail */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface sm:h-28 sm:w-28">
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.product_title ?? "Product"}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Title + qty */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {item.product_handle ? (
              <Link
                href={`/products/${item.product_handle}`}
                className="font-heading text-sm font-bold leading-snug text-primary transition-colors duration-200 hover:text-accent"
              >
                {item.product_title}
              </Link>
            ) : (
              <p className="font-heading text-sm font-bold leading-snug text-primary">
                {item.product_title}
              </p>
            )}
            {item.variant_title && item.variant_title !== "Default" && (
              <p className="mt-1 text-xs text-text-secondary">
                {item.variant_title}
              </p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              {formatPrice(item.unit_price, currency)} each
            </p>
          </div>
          <p className="font-heading text-sm font-extrabold text-accent">
            {formatPrice(item.subtotal, currency)}
          </p>
        </div>

        {/* Qty stepper + remove */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="inline-flex items-center overflow-hidden rounded-lg border border-black/10 bg-white">
            <button
              type="button"
              onClick={() => changeQty(item.quantity - 1)}
              disabled={pending || item.quantity <= 1}
              className="flex h-9 w-9 items-center justify-center text-primary transition-colors duration-200 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
            <span className="min-w-[2ch] text-center font-heading text-sm font-bold text-primary">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => changeQty(item.quantity + 1)}
              disabled={pending}
              className="flex h-9 w-9 items-center justify-center text-primary transition-colors duration-200 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={pending}
            className="font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-text-secondary transition-colors duration-200 hover:text-red-600 disabled:opacity-40"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

/** SummaryRow — one line in the order summary <dl>. */
function SummaryRow({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-text-secondary">{label}</dt>
      <dd
        className={
          emphasize
            ? "font-heading font-bold text-accent"
            : "font-medium text-primary"
        }
      >
        {value}
      </dd>
    </div>
  );
}

/** Loading skeleton shown during initial cart hydration. */
function CartLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-white/60"
            />
          ))}
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-white/60" />
      </div>
    </div>
  );
}

/** Branded empty-cart state with a continue-shopping CTA. */
function CartEmptyState() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface">
          <svg
            className="h-10 w-10 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>

        <h2 className="font-heading text-xl font-bold text-primary">
          Your cart is empty
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Looks like you haven&apos;t added any sustainable products yet.
          Browse our collections to find something you love.
        </p>

        <Link
          href="/collections"
          className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl"
        >
          Continue Shopping
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] text-text-secondary">
          <span className="flex items-center gap-1.5">
            <span>&#128230;</span> Free shipping $50+
          </span>
          <span className="flex items-center gap-1.5">
            <span>&#127807;</span> Plastic-free packaging
          </span>
          <span className="flex items-center gap-1.5">
            <span>&#128259;</span> Easy returns
          </span>
        </div>
      </div>
    </div>
  );
}
