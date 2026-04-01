/**
 * CartEmpty — placeholder shown when the cart has no items.
 * Used in: CartPage when the cart line items array is empty.
 * Premium empty state with iconography and branded messaging.
 *
 * Server component — no client JS needed.
 */
import Link from "next/link";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      {/* Decorative icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface">
        <svg
          className="h-8 w-8 text-text-secondary"
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
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
        Add some sustainable products and come back!
      </p>

      <Link
        href="/collections"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-heading text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl"
      >
        Browse Products
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
