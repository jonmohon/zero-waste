/**
 * Cart business logic for the Zero Waste storefront.
 *
 * All cart operations go through this module — components should never call
 * the Medusa SDK's cart methods directly. Every function returns the same
 * { success, data?, error? } shape used by lib/auth.ts.
 *
 * Cart persistence
 * ----------------
 * The cart ID lives in localStorage under {@link CART_ID_KEY}. The Medusa
 * cart itself lives on the backend; we only keep the ID locally so the same
 * cart follows the customer across page reloads. On any retrieve failure
 * (cart deleted, expired, etc.) we clear the local ID and the next add
 * creates a fresh cart.
 *
 * @see https://docs.medusajs.com/resources/storefront-development/cart
 */
import { medusa, getRegion } from "@/lib/medusa";
import type { Cart } from "@/lib/types";

/** localStorage key for the persisted cart ID. */
export const CART_ID_KEY = "medusa_cart_id";

/** Standard return shape for all cart operations. */
export interface CartResult {
  success: boolean;
  data?: Cart;
  error?: string;
}

/**
 * Fields requested on every cart fetch — kept in one place so create / update
 * / retrieve / line-item mutations all return the same shape that the
 * storefront's Cart type expects.
 */
const CART_FIELDS =
  "*items,*items.variant,*items.product,+items.thumbnail,+items.product_handle,+items.subtotal,+items.total,+subtotal,+tax_total,+shipping_total,+discount_total,+total";

/**
 * Reads the persisted cart ID from localStorage.
 * Returns null on the server (where window is undefined) or if no cart exists.
 */
export function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CART_ID_KEY);
}

/** Persists the cart ID to localStorage (no-op on the server). */
function setStoredCartId(id: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_ID_KEY, id);
}

/** Removes the persisted cart ID — call on logout, cart-not-found, or order placement. */
export function clearStoredCartId(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CART_ID_KEY);
}

/**
 * Loads the customer's existing cart by stored ID.
 * Returns success with no data if there's no stored ID or the cart no
 * longer exists on the backend (in which case the stale ID is cleared).
 */
export async function retrieveCart(): Promise<CartResult> {
  const id = getStoredCartId();
  if (!id) return { success: true };

  try {
    const { cart } = await medusa.store.cart.retrieve(id, {
      fields: CART_FIELDS,
    });
    return { success: true, data: cart as unknown as Cart };
  } catch {
    /* Cart was deleted or expired on the backend — drop the stale ID
       so the next add creates a fresh cart. */
    clearStoredCartId();
    return { success: true };
  }
}

/**
 * Creates a new cart for the current region and persists its ID.
 * Used internally on the first add-to-cart when no cart exists yet.
 */
async function createCart(): Promise<CartResult> {
  try {
    const region = await getRegion();
    if (!region) {
      return { success: false, error: "No region configured" };
    }
    const { cart } = await medusa.store.cart.create(
      { region_id: region.id },
      { fields: CART_FIELDS }
    );
    setStoredCartId(cart.id);
    return { success: true, data: cart as unknown as Cart };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not create cart";
    return { success: false, error: message };
  }
}

/**
 * Adds a variant to the cart (or increments quantity if already present).
 * Creates a cart if the customer doesn't have one yet.
 *
 * @param variantId - Medusa variant ID
 * @param quantity - quantity to add (default 1)
 *
 * @example
 * await addLineItem("variant_123", 2);
 */
export async function addLineItem(
  variantId: string,
  quantity = 1
): Promise<CartResult> {
  try {
    let cartId = getStoredCartId();

    /* No cart yet — create one before we can add the line item. */
    if (!cartId) {
      const created = await createCart();
      if (!created.success || !created.data) return created;
      cartId = created.data.id;
    }

    const { cart } = await medusa.store.cart.createLineItem(
      cartId,
      { variant_id: variantId, quantity },
      { fields: CART_FIELDS }
    );
    return { success: true, data: cart as unknown as Cart };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not add item to cart";
    /* If the cart was deleted between page load and click, drop the
       stale ID so a retry creates a fresh cart. */
    if (message.toLowerCase().includes("not found")) {
      clearStoredCartId();
    }
    return { success: false, error: message };
  }
}

/**
 * Updates a line item's quantity. If quantity is 0 or negative, the line
 * item is deleted instead.
 *
 * @param lineItemId - the line item's ID
 * @param quantity - new quantity (0 removes the line)
 */
export async function updateLineItem(
  lineItemId: string,
  quantity: number
): Promise<CartResult> {
  if (quantity <= 0) {
    return removeLineItem(lineItemId);
  }
  try {
    const cartId = getStoredCartId();
    if (!cartId) return { success: false, error: "No cart" };

    const { cart } = await medusa.store.cart.updateLineItem(
      cartId,
      lineItemId,
      { quantity },
      { fields: CART_FIELDS }
    );
    return { success: true, data: cart as unknown as Cart };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not update item";
    return { success: false, error: message };
  }
}

/**
 * Removes a line item from the cart.
 *
 * @param lineItemId - the line item's ID
 */
export async function removeLineItem(
  lineItemId: string
): Promise<CartResult> {
  try {
    const cartId = getStoredCartId();
    if (!cartId) return { success: false, error: "No cart" };

    await medusa.store.cart.deleteLineItem(cartId, lineItemId);

    /* deleteLineItem returns a deletion stub, not the full cart, so
       refetch to get the up-to-date totals. */
    const refreshed = await retrieveCart();
    return refreshed;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not remove item";
    return { success: false, error: message };
  }
}
