/**
 * Checkout business logic for the Zero Waste storefront.
 *
 * Wraps the Medusa store SDK calls used during the checkout flow:
 * setting the address, listing/picking shipping options, initializing a
 * payment session, and finally completing the cart to place the order.
 *
 * Components should never call the Medusa SDK directly for checkout
 * operations — go through the helpers here so error handling and the
 * { success, data?, error? } return shape stays consistent.
 *
 * @see https://docs.medusajs.com/resources/storefront-development/checkout
 */
import { medusa } from "@/lib/medusa";
import type { Cart, Order, PaymentProvider, ShippingOption } from "@/lib/types";

/** Standard return shape for all checkout operations. */
export interface CheckoutResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Address fields collected from the customer at checkout. Mirrors the
 * subset of {@link CustomerAddress} that we actually require — we don't
 * collect company, second address line, or province/state for everyone.
 */
export interface CheckoutAddressInput {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  province: string;
  postal_code: string;
  country_code: string;
  phone?: string;
}

/**
 * Field set requested when re-fetching the cart during checkout. Mirrors
 * the lib/cart.ts CART_FIELDS constant — keep the two in sync if either
 * grows.
 */
const CART_FIELDS =
  "*items,*items.variant,*items.product,*shipping_address,*billing_address,*shipping_methods,+items.thumbnail,+items.product_handle,+items.subtotal,+items.total,+subtotal,+tax_total,+shipping_total,+discount_total,+total";

/**
 * Sets the customer's email + shipping/billing addresses on the cart.
 * Billing is set to the same address as shipping for v1 — we can split
 * them out when we have customers who actually need a separate billing
 * address.
 */
export async function setCheckoutAddress(
  cartId: string,
  email: string,
  address: CheckoutAddressInput
): Promise<CheckoutResult<Cart>> {
  try {
    const { cart } = await medusa.store.cart.update(
      cartId,
      {
        email,
        shipping_address: address,
        billing_address: address,
      },
      { fields: CART_FIELDS }
    );
    return { success: true, data: cart as unknown as Cart };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not save address";
    return { success: false, error: message };
  }
}

/**
 * Lists shipping options that are valid for the given cart's address +
 * line items. The result is filtered/priced server-side so we can render
 * it directly in the picker.
 */
export async function listShippingOptions(
  cartId: string
): Promise<CheckoutResult<ShippingOption[]>> {
  try {
    const { shipping_options } = await medusa.store.fulfillment.listCartOptions(
      { cart_id: cartId }
    );
    return {
      success: true,
      data: shipping_options as unknown as ShippingOption[],
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not load shipping options";
    return { success: false, error: message };
  }
}

/**
 * Adds the chosen shipping method to the cart. Replaces any prior method
 * since Medusa only allows one per cart.
 */
export async function selectShippingMethod(
  cartId: string,
  optionId: string
): Promise<CheckoutResult<Cart>> {
  try {
    const { cart } = await medusa.store.cart.addShippingMethod(
      cartId,
      { option_id: optionId },
      { fields: CART_FIELDS }
    );
    return { success: true, data: cart as unknown as Cart };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not select shipping method";
    return { success: false, error: message };
  }
}

/**
 * Lists the payment providers configured for a region. The storefront
 * picks the first enabled one for v1 — when more than one is configured
 * we'll need a real picker.
 */
export async function listPaymentProviders(
  regionId: string
): Promise<CheckoutResult<PaymentProvider[]>> {
  try {
    const { payment_providers } = await medusa.store.payment.listPaymentProviders(
      { region_id: regionId }
    );
    return {
      success: true,
      data: payment_providers as unknown as PaymentProvider[],
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not load payment providers";
    return { success: false, error: message };
  }
}

/**
 * Initializes a payment session on the cart's payment collection.
 * For Medusa's built-in `pp_system_default` provider this is a no-op
 * placeholder that marks the order ready to complete; real providers
 * (Stripe, etc.) would return additional client data here.
 */
export async function initializePayment(
  cart: Cart,
  providerId: string
): Promise<CheckoutResult<unknown>> {
  try {
    const { payment_collection } = await medusa.store.payment.initiatePaymentSession(
      // The SDK accepts a StoreCart shape; ours is a structural subset
      // so we cast through unknown.
      cart as unknown as Parameters<
        typeof medusa.store.payment.initiatePaymentSession
      >[0],
      { provider_id: providerId }
    );
    return { success: true, data: payment_collection };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not initialize payment";
    return { success: false, error: message };
  }
}

/**
 * Completes the cart, which places the order on the backend. Returns
 * the order ID on success or the cart with an error on failure (e.g.
 * payment authorization failed).
 *
 * Medusa's complete endpoint can return either a `cart` (with error) or
 * an `order` — this helper normalizes both into our result shape.
 */
export async function completeCart(
  cartId: string
): Promise<CheckoutResult<Order>> {
  try {
    const result = await medusa.store.cart.complete(cartId);
    if (result.type === "order") {
      return { success: true, data: result.order as unknown as Order };
    }
    /* type === "cart" — Medusa returned the cart with an error attached. */
    const errMsg =
      typeof result.error === "string"
        ? result.error
        : (result.error as { message?: string } | undefined)?.message ??
          "Could not place order";
    return { success: false, error: errMsg };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Could not place order";
    return { success: false, error: message };
  }
}

/**
 * Retrieves an order by ID for the order confirmation page. Customer
 * must be authenticated for this to succeed since it's behind /me on
 * the backend.
 */
export async function getOrder(
  orderId: string
): Promise<CheckoutResult<Order>> {
  try {
    const { order } = await medusa.store.order.retrieve(orderId, {
      fields:
        "*items,*shipping_address,+items.thumbnail,+items.product_handle,+subtotal,+tax_total,+shipping_total,+discount_total,+total",
    });
    return { success: true, data: order as unknown as Order };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Order not found";
    return { success: false, error: message };
  }
}
