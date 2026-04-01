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

/** Authenticated customer from Medusa store API */
export interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

/** Customer shipping/billing address */
export interface CustomerAddress {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  province: string | null;
  postal_code: string | null;
  country_code: string | null;
  phone: string | null;
}
