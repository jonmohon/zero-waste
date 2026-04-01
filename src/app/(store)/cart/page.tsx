// Route: /cart
// Shopping cart page — displays cart items and totals.
// Premium empty state with illustration and branded messaging.
// Will use Medusa cart API via the SDK once connected.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary">
            Your Cart
          </h1>
        </div>
      </div>

      {/* Empty cart state */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          {/* Decorative icon */}
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

          {/* Trust signals */}
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
    </div>
  );
}
