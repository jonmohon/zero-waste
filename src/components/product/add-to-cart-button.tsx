/**
 * AddToCartButton — client component that handles adding a product to cart.
 * Used in: ProductPage.
 *
 * This is intentionally a thin client wrapper — the product page itself
 * is a server component. Only this button needs client JS for the click handler.
 *
 * @param productId - Medusa product ID
 * @param variantId - Medusa variant ID to add (defaults to first/cheapest)
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    <Button
      onClick={handleAddToCart}
      disabled={!variantId || adding}
      size="lg"
      className="w-full sm:w-auto"
    >
      {adding ? "Adding..." : added ? "Added!" : "Add to Cart"}
    </Button>
  );
}
