/**
 * Medusa JS SDK client — single instance shared across the app.
 *
 * All product/collection/cart data fetching should go through this client.
 * Never call the Medusa API with raw fetch; always use this SDK instance.
 *
 * @see https://docs.medusajs.com/js-sdk
 */
import Medusa from "@medusajs/js-sdk";

/**
 * Singleton Medusa SDK client configured from environment variables.
 * Used by server components for data fetching and by client components
 * for cart mutations.
 */
export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});
