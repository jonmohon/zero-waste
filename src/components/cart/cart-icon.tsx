/**
 * CartIcon — header cart link with a live item-count badge.
 * Used in: Header (right-side actions area).
 *
 * Thin client wrapper that reads {@link useCart} to render a badge with
 * the current line item count. Renders nothing in the badge slot when
 * the cart is empty so the icon doesn't get a hollow circle.
 */
"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="group relative flex items-center gap-1 text-text-secondary transition-colors duration-200 hover:text-primary"
      aria-label={`Shopping cart${itemCount ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ""}`}
    >
      <svg
        className="h-5 w-5 transition-transform duration-200 group-hover:scale-105"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      {itemCount > 0 && (
        <span
          className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 font-heading text-[10px] font-bold leading-none text-white shadow-sm"
          aria-hidden="true"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
