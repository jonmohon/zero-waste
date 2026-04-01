/**
 * AddToCartButton — client component that handles adding a product to cart.
 * Used in: ProductPage.
 *
 * This is intentionally a thin client wrapper — the product page itself
 * is a server component. Only this button needs client JS for the click handler.
 * Styled as a prominent, full-width CTA with loading and success states.
 *
 * @param productId - Medusa product ID
 * @param variantId - Medusa variant ID to add (defaults to first/cheapest)
 */
"use client";

import { useState } from "react";

interface AddToCartButtonProps {
  productId: string;
  variantId?: string;
}

export function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAddToCart() {
    if (!variantId) return;
    setAdding(true);

    // TODO(jon 2026-04-01): wire to Medusa cart API via SDK
    // For now, simulate a brief delay to show the loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={!variantId || adding}
      className={`group inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 font-heading text-sm font-bold uppercase tracking-[0.08em] shadow-lg transition-all duration-300 sm:w-auto sm:min-w-[240px] ${
        added
          ? "bg-accent text-white shadow-accent/25"
          : "bg-primary text-white hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-primary disabled:hover:shadow-lg"
      }`}
    >
      {adding ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Adding...
        </>
      ) : added ? (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Added to Cart
        </>
      ) : (
        <>
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}
