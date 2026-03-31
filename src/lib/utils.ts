/**
 * Shared utility functions for the Zero Waste storefront.
 * Business logic and formatting helpers live here — not in components.
 */

/**
 * Formats a price amount (in smallest currency unit) to a display string.
 * Medusa stores prices in the smallest unit (e.g. cents for USD).
 *
 * @param amount - price in smallest currency unit (e.g. 1999 = $19.99)
 * @param currencyCode - ISO 4217 currency code (e.g. "usd")
 * @returns formatted price string (e.g. "$19.99")
 *
 * @example
 * formatPrice(1999, "usd") // "$19.99"
 * formatPrice(500, "eur")  // "€5.00"
 */
export function formatPrice(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100);
}

/**
 * Concatenates class names, filtering out falsy values.
 * Lightweight alternative to clsx — no extra dependency needed.
 *
 * @param classes - class name strings or falsy values
 * @returns single space-separated class string
 *
 * @example
 * cn("px-4", isActive && "bg-brand-500", undefined) // "px-4 bg-brand-500"
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
