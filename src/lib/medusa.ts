/**
 * Medusa JS SDK client and data-fetching helpers.
 *
 * All product/collection/cart data fetching should go through this module.
 * Never call the Medusa API with raw fetch; always use the SDK instance
 * or the helper functions exported here.
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

/**
 * Fetches the default region (first region returned by the API).
 * Medusa requires a region_id to calculate prices, so we resolve this
 * once and pass it to product queries.
 *
 * @returns the first region object, or null if none exist
 */
export async function getRegion() {
  const { regions } = await medusa.store.region.list();
  return regions[0] ?? null;
}

/**
 * Fetches all published products with calculated prices.
 * Requires a region_id so Medusa can resolve currency-specific pricing.
 *
 * @param regionId - Medusa region ID (e.g. "reg_01KN...")
 * @param limit - max products to return (default 20)
 * @param offset - pagination offset (default 0)
 * @returns object with products array and count
 */
export async function getProducts(
  regionId: string,
  limit = 20,
  offset = 0
) {
  return medusa.store.product.list({
    fields: "+variants.calculated_price",
    region_id: regionId,
    limit,
    offset,
  });
}

/**
 * Fetches a single product by its URL handle with calculated prices.
 *
 * @param handle - product URL slug (e.g. "beeswax-food-wraps")
 * @param regionId - Medusa region ID for price calculation
 * @returns product object or null if not found
 */
export async function getProductByHandle(handle: string, regionId: string) {
  const { products } = await medusa.store.product.list({
    handle,
    fields: "+variants.calculated_price",
    region_id: regionId,
    limit: 1,
  });
  return products[0] ?? null;
}

/**
 * Fetches all product categories.
 *
 * @returns array of category objects
 */
export async function getCategories() {
  const { product_categories } = await medusa.store.category.list();
  return product_categories;
}

/**
 * Fetches products filtered by category ID.
 *
 * @param categoryId - Medusa category ID
 * @param regionId - Medusa region ID for price calculation
 * @returns object with products array and count
 */
export async function getProductsByCategory(
  categoryId: string,
  regionId: string
) {
  return medusa.store.product.list({
    category_id: [categoryId],
    fields: "+variants.calculated_price",
    region_id: regionId,
  });
}
