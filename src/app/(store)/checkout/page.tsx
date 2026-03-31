// Route: /checkout
// Checkout page — collects shipping, payment, and processes the order.
// Will integrate with Medusa checkout flow + payment providers.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900">Checkout</h1>
      <p className="mt-4 text-neutral-500">
        Checkout will be available once the Medusa backend and payment provider are connected.
      </p>
    </div>
  );
}
