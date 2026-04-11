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

/**
 * Cart line item — one product variant in the cart with quantity and totals.
 * Mirrors the Medusa store cart line item shape for the fields the storefront uses.
 */
export interface CartLineItem {
  id: string;
  variant_id: string | null;
  product_id: string | null;
  product_title: string | null;
  product_handle: string | null;
  variant_title: string | null;
  thumbnail: string | null;
  quantity: number;
  unit_price: number;
  /** Subtotal (unit_price * quantity) in the cart's currency, smallest unit. */
  subtotal: number;
  /** Total after discounts/tax for this line, smallest unit. */
  total: number;
}

/**
 * Cart — Medusa store cart with items and totals.
 * All money values are in the smallest currency unit (cents for USD).
 */
export interface Cart {
  id: string;
  region_id: string | null;
  currency_code: string;
  email: string | null;
  customer_id: string | null;
  items: CartLineItem[];
  /** Sum of line item subtotals before discounts/tax. */
  subtotal: number;
  /** Tax total. */
  tax_total: number;
  /** Shipping total. */
  shipping_total: number;
  /** Discount total. */
  discount_total: number;
  /** Final total the customer pays. */
  total: number;
}

/**
 * A shipping option returned by Medusa for a specific cart. Used to render
 * the shipping-method picker on the checkout page.
 */
export interface ShippingOption {
  id: string;
  name: string;
  price_type: string;
  amount: number;
  data?: Record<string, unknown> | null;
  type?: {
    label?: string | null;
    description?: string | null;
    code?: string | null;
  } | null;
}

/**
 * A payment provider that can be selected at checkout.
 * For this storefront we currently only support `pp_system_default`
 * (manual/test payment); Stripe etc. would slot in here.
 */
export interface PaymentProvider {
  id: string;
  is_enabled: boolean;
}

/**
 * Order summary returned by the order confirmation page after a
 * successful checkout. Mirrors the Medusa store order shape for the
 * fields the storefront uses.
 */
export interface Order {
  id: string;
  display_id: number;
  status: string;
  email: string | null;
  currency_code: string;
  items: CartLineItem[];
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  discount_total: number;
  total: number;
  shipping_address: CustomerAddress | null;
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
