// Route: /cart
// Shopping cart page — displays cart items and totals.
// Will use Medusa cart API via the SDK once connected.
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900">Your Cart</h1>
      <p className="mt-4 text-neutral-500">Your cart is empty.</p>
      <div className="mt-8">
        <Button href="/collections">Continue Shopping</Button>
      </div>
    </div>
  );
}
