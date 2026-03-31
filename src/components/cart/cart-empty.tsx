/**
 * CartEmpty — placeholder shown when the cart has no items.
 * Used in: CartPage when the cart line items array is empty.
 *
 * Server component — no client JS needed.
 */
import { Button } from "@/components/ui/button";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <p className="text-lg font-medium text-neutral-700">Your cart is empty</p>
      <p className="mt-2 text-sm text-neutral-500">
        Add some sustainable products and come back!
      </p>
      <div className="mt-6">
        <Button href="/collections">Browse Products</Button>
      </div>
    </div>
  );
}
