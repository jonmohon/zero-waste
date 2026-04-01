/**
 * Shared TypeScript types for the Zero Waste storefront.
 * These mirror Medusa's store API response shapes for the fields we use.
 */

/** Price calculated by Medusa for a specific region/currency */
export interface CalculatedPrice {
  calculated_amount: number;
  currency_code: string;
  original_amount: number;
}

/** Product variant as returned by the store API with calculated pricing */
export interface ProductVariant {
  id: string;
  title: string;
  sku: string | null;
  calculated_price?: CalculatedPrice;
  options: { id: string; value: string; option_id: string }[];
}

/** Product option (e.g. Size, Color) */
export interface ProductOption {
  id: string;
  title: string;
  values: { id: string; value: string }[];
}

/** Product as returned by the Medusa store products endpoint */
export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  thumbnail: string | null;
  images: { id: string; url: string }[];
  options: ProductOption[];
  variants: ProductVariant[];
  created_at: string;
}

/** Product category from Medusa */
export interface ProductCategory {
  id: string;
  name: string;
  handle: string;
  description: string | null;
  is_active: boolean;
}
