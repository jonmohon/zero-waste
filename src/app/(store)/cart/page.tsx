// Route: /cart
// Shopping cart page — server component shell that delegates to the
// CartContents client component. CartContents reads the cart from the
// CartProvider context (hydrated client-side from localStorage), so this
// route renders nothing data-dependent on the server.
import type { Metadata } from "next";
import { CartContents } from "@/components/cart/cart-contents";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="bg-cream">
      {/* Header */}
      <div className="border-b border-surface-sage bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary">
            Your Cart
          </h1>
        </div>
      </div>

      <CartContents />
    </div>
  );
}
