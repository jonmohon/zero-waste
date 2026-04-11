/**
 * OrderConfirmation — client component that fetches and renders an
 * order by ID after a successful checkout.
 * Used in: /order-confirmation/[id] page.
 *
 * Fetches the order via the customer-scoped order endpoint, which
 * requires the customer to be authenticated. Renders one of three
 * states: loading skeleton, error (order not found / unauthorized), or
 * the success layout with order number, contact info, items, and totals.
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getOrder } from "@/lib/checkout";
import type { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await getOrder(orderId);
      if (cancelled) return;
      if (result.success && result.data) {
        setOrder(result.data);
      } else {
        setError(result.error || "Order not found");
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  if (loading) {
    return <ConfirmationSkeleton />;
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-xl font-bold text-primary">
          We couldn&apos;t load your order
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {error ??
            "Something went wrong fetching your order details. If you placed an order, you should have received an email confirmation."}
        </p>
        <Link
          href="/account"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
        >
          View Account
        </Link>
      </div>
    );
  }

  const currency = order.currency_code;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Success header */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <svg
            className="h-8 w-8 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="mt-5 font-serif text-3xl font-semibold italic text-primary sm:text-4xl">
          Thank you for your order!
        </h1>
        <p className="mt-3 text-sm text-text-secondary">
          Order{" "}
          <span className="font-mono font-bold text-primary">
            #{order.display_id}
          </span>{" "}
          has been placed. A confirmation email is on its way to{" "}
          <span className="font-medium text-primary">{order.email}</span>.
        </p>
      </div>

      {/* Order summary card */}
      <div className="mt-10 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-8">
        <h2 className="font-heading text-base font-extrabold uppercase tracking-[0.06em] text-primary">
          Order Summary
        </h2>

        {/* Items */}
        <ul className="mt-5 space-y-4 border-b border-surface-sage pb-5">
          {order.items.map((item) => (
            <li key={item.id} className="flex gap-4">
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
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-bold text-primary">
                  {item.product_title}
                </p>
                {item.variant_title && item.variant_title !== "Default" && (
                  <p className="text-xs text-text-secondary">
                    {item.variant_title}
                  </p>
                )}
                <p className="mt-1 text-xs text-text-secondary">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="font-heading text-sm font-bold text-accent">
                {formatPrice(item.subtotal, currency)}
              </p>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <dl className="mt-5 space-y-3 text-sm">
          <Row
            label="Subtotal"
            value={formatPrice(order.subtotal, currency)}
          />
          <Row
            label="Shipping"
            value={formatPrice(order.shipping_total, currency)}
          />
          {order.discount_total > 0 && (
            <Row
              label="Discount"
              value={`-${formatPrice(order.discount_total, currency)}`}
            />
          )}
          <Row label="Tax" value={formatPrice(order.tax_total, currency)} />
        </dl>

        <div className="mt-5 flex items-baseline justify-between border-t border-surface-sage pt-5">
          <span className="font-heading text-sm font-bold uppercase tracking-[0.08em] text-primary">
            Total
          </span>
          <span className="font-heading text-2xl font-extrabold text-accent">
            {formatPrice(order.total, currency)}
          </span>
        </div>
      </div>

      {/* Shipping address */}
      {order.shipping_address && (
        <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-8">
          <h2 className="font-heading text-base font-extrabold uppercase tracking-[0.06em] text-primary">
            Shipping To
          </h2>
          <address className="mt-4 not-italic text-sm leading-relaxed text-text-secondary">
            <span className="block font-medium text-primary">
              {order.shipping_address.first_name}{" "}
              {order.shipping_address.last_name}
            </span>
            <span className="block">{order.shipping_address.address_1}</span>
            {order.shipping_address.address_2 && (
              <span className="block">{order.shipping_address.address_2}</span>
            )}
            <span className="block">
              {order.shipping_address.city},{" "}
              {order.shipping_address.province}{" "}
              {order.shipping_address.postal_code}
            </span>
            {order.shipping_address.country_code && (
              <span className="block uppercase">
                {order.shipping_address.country_code}
              </span>
            )}
            {order.shipping_address.phone && (
              <span className="mt-1 block">{order.shipping_address.phone}</span>
            )}
          </address>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
        >
          View My Orders
        </Link>
        <Link
          href="/collections"
          className="font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 hover:text-primary"
        >
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
}

/** Single line in the order confirmation totals <dl>. */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="font-medium text-primary">{value}</dd>
    </div>
  );
}

/** Loading skeleton shown while the order is being fetched. */
function ConfirmationSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-white/60" />
      <div className="mx-auto mt-5 h-8 w-72 animate-pulse rounded bg-white/60" />
      <div className="mx-auto mt-3 h-4 w-96 animate-pulse rounded bg-white/40" />
      <div className="mt-10 h-72 animate-pulse rounded-2xl bg-white/60" />
      <div className="mt-6 h-44 animate-pulse rounded-2xl bg-white/60" />
    </div>
  );
}
