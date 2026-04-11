// Route: /checkout
// Single-page checkout — server shell that delegates to the
// CheckoutForm client component. CheckoutForm reads the cart from the
// CartProvider context and walks the customer through the four-step
// Medusa checkout flow (address → shipping → payment → complete).
//
// The auth + cart guards live inside CheckoutForm so we can read the
// hydrated client state — server-side we don't know whether the customer
// is signed in.

import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
};

/* Checkout state lives in localStorage / the cart context, so this page
   can never be statically prerendered. */
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <div className="border-b border-surface-sage bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="mb-3 flex items-center gap-2 text-[13px] text-text-secondary">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-primary"
            >
              Home
            </Link>
            <span className="text-neutral-300">/</span>
            <Link
              href="/cart"
              className="transition-colors duration-200 hover:text-primary"
            >
              Cart
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="font-medium text-primary">Checkout</span>
          </nav>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary">
            Checkout
          </h1>
        </div>
      </div>

      <CheckoutForm />
    </div>
  );
}
