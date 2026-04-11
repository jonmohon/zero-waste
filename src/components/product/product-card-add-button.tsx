/**
 * ProductCardAddButton — compact "Add to Cart" button for ProductCard.
 * Used in: ProductCard (collection grids, homepage, related-products section).
 *
 * Behavior:
 * - If the customer is not signed in, clicking sends them to /signin with
 *   a `redirect` query param so they come back to the same product page
 *   after auth.
 * - Once signed in, click does the local cart-add UX (placeholder until
 *   the Medusa cart API is wired up — same TODO as AddToCartButton).
 *
 * Smaller, full-width-of-its-parent variant of AddToCartButton; designed
 * to fit inside the bottom of a product card without overpowering it.
 *
 * @param variantId - Medusa variant ID to add (cheapest variant by default)
 * @param productHref - URL of the product page, used as the post-signin redirect target
 */
"use client";

import { useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { useCart } from "@/components/cart/cart-provider";

interface ProductCardAddButtonProps {
  variantId?: string;
  productHref: string;
}

export function ProductCardAddButton({
  variantId,
  productHref,
}: ProductCardAddButtonProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(e: MouseEvent<HTMLButtonElement>) {
    /* Stop the click from bubbling up to the parent Link / navigating */
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push(`/signin?redirect=${encodeURIComponent(productHref)}`);
      return;
    }

    if (!variantId) return;
    setAdding(true);
    setError(null);

    const result = await addItem(variantId, 1);
    setAdding(false);

    if (result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } else {
      setError(result.error || "Could not add to cart");
      setTimeout(() => setError(null), 3000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={authLoading || adding || (!variantId && isAuthenticated)}
      className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        error
          ? "border-[1.5px] border-red-500 bg-red-50 text-red-700"
          : added
            ? "bg-accent text-white shadow-sm"
            : "border-[1.5px] border-primary/15 bg-white text-primary hover:-translate-y-px hover:border-primary hover:bg-primary hover:text-white hover:shadow-md"
      }`}
      aria-label="Add to cart"
      title={error ?? undefined}
    >
      {error ? (
        <>
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM12 3.75c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
            />
          </svg>
          Try again
        </>
      ) : adding ? (
        <>
          <svg
            className="h-3.5 w-3.5 animate-spin"
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
          Adding
        </>
      ) : added ? (
        <>
          <svg
            className="h-3.5 w-3.5"
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
          Added
        </>
      ) : (
        <>
          <svg
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}
