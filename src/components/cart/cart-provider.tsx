/**
 * CartProvider — client-side cart context for the storefront.
 *
 * Wraps the store layout (next to AuthProvider) so any client component
 * can read cart state and call mutations via {@link useCart}.
 *
 * Responsibilities:
 * - Hydrate the cart from localStorage on first mount.
 * - Re-hydrate when the customer logs in or out (so a guest cart doesn't
 *   leak across customers, and a returning customer's cart loads).
 * - Expose addItem / updateItem / removeItem mutations that update the
 *   in-memory cart immediately so the UI doesn't flicker.
 *
 * Pricing/totals are always sourced from the server response — never
 * computed on the client — so the cart always matches what the backend
 * will charge.
 */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addLineItem,
  clearStoredCartId,
  removeLineItem,
  retrieveCart,
  updateLineItem,
} from "@/lib/cart";
import type { Cart } from "@/lib/types";
import { useAuth } from "@/components/auth/auth-provider";

interface CartContextValue {
  cart: Cart | null;
  /** True during the initial hydration on mount. */
  isLoading: boolean;
  /** Total number of units across all line items (for header badge). */
  itemCount: number;
  /**
   * Adds a variant to the cart. Resolves with `success: true` on a
   * successful add, `success: false` with an `error` message otherwise.
   */
  addItem: (
    variantId: string,
    quantity?: number
  ) => Promise<{ success: boolean; error?: string }>;
  /** Updates an existing line item's quantity. 0 removes the item. */
  updateItem: (
    lineItemId: string,
    quantity: number
  ) => Promise<{ success: boolean; error?: string }>;
  /** Removes a line item from the cart. */
  removeItem: (
    lineItemId: string
  ) => Promise<{ success: boolean; error?: string }>;
  /** Re-fetches the cart from the backend (e.g. after a checkout). */
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Sums quantities across all line items. */
function countItems(cart: Cart | null): number {
  if (!cart) return 0;
  return cart.items.reduce((acc, item) => acc + item.quantity, 0);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Pulls the cart from the server using the persisted ID. */
  const refresh = useCallback(async () => {
    const result = await retrieveCart();
    setCart(result.data ?? null);
  }, []);

  /* Initial hydration on mount. */
  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  /*
   * When auth state changes (login/logout), drop the in-memory cart and
   * the local cart ID so we don't leak a guest cart into a customer's
   * session — and vice versa. We re-fetch only after auth has settled
   * so we don't race the initial mount.
   */
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      clearStoredCartId();
      setCart(null);
    }
  }, [isAuthenticated, authLoading]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      const result = await addLineItem(variantId, quantity);
      if (result.success && result.data) {
        setCart(result.data);
        return { success: true };
      }
      return { success: false, error: result.error };
    },
    []
  );

  const updateItem = useCallback(
    async (lineItemId: string, quantity: number) => {
      const result = await updateLineItem(lineItemId, quantity);
      if (result.success && result.data) {
        setCart(result.data);
        return { success: true };
      }
      return { success: false, error: result.error };
    },
    []
  );

  const removeItem = useCallback(async (lineItemId: string) => {
    const result = await removeLineItem(lineItemId);
    if (result.success) {
      setCart(result.data ?? null);
      return { success: true };
    }
    return { success: false, error: result.error };
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        itemCount: countItems(cart),
        addItem,
        updateItem,
        removeItem,
        refresh,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Default value returned by useCart when called outside CartProvider
 * (e.g. during static prerender). All mutations return success: false
 * so callers don't crash but no destructive action is taken.
 */
const DEFAULT_CART: CartContextValue = {
  cart: null,
  isLoading: false,
  itemCount: 0,
  addItem: async () => ({ success: false, error: "Not in cart context" }),
  updateItem: async () => ({ success: false, error: "Not in cart context" }),
  removeItem: async () => ({ success: false, error: "Not in cart context" }),
  refresh: async () => {},
};

/**
 * Hook to access cart state and mutations.
 * Returns a safe default when used outside CartProvider so RSC prerender
 * doesn't crash.
 */
export function useCart(): CartContextValue {
  return useContext(CartContext) ?? DEFAULT_CART;
}
