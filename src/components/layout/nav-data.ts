/**
 * Shared navigation constants used across header, footer, and mobile menu.
 * Keeping these in one place prevents the nav from drifting between layouts.
 */

/** A single top-level navigation entry. `hasDropdown` is set on items that
 * open a mega-menu instead of (or in addition to) navigating directly. */
export interface TopNavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

/** Top-level navigation items shown in the header next to the logo. */
export const TOP_NAV: ReadonlyArray<TopNavItem> = [
  { label: "Shop", href: "/collections", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Hardcoded ordering for category links. Categories returned from Medusa
 * are not ordered in a meaningful way, so we project them onto this list
 * to control the dropdown layout.
 */
export const CATEGORY_ORDER = [
  "bar-soap",
  "hair-care",
  "skin-care",
  "oral-care",
  "bath-&-body",
  "food-wraps",
  "kitchen",
  "combs-&-brushes",
  "home-&-decor",
] as const;

/**
 * Per-category small image used in the Shop mega-dropdown. Points at a real
 * product webp under /public/products so the thumbnail always matches the
 * category it represents.
 */
export const CATEGORY_THUMB: Record<string, string> = {
  "bar-soap": "/products/gentlemans-handmade-soap-bar-vegan-cold-process/1.webp",
  "hair-care": "/products/hibar-curl-shampoo-bar/1.webp",
  "skin-care": "/products/organic-lip-balm-sweet-orange/1.webp",
  "oral-care": "/products/adult-toothbrush-standard-soft/1.webp",
  "bath-&-body":
    "/products/moisturizing-vegan-body-wash-aloe-coconut-milk/1.webp",
  "food-wraps": "/products/1-seller-assorted-3-pack-honeycomb/1.webp",
  kitchen: "/products/single-bamboo-straws/1.webp",
  "combs-&-brushes": "/products/bamboo-hair-brush/1.webp",
  "home-&-decor": "/products/moso-bamboo-soap-shelf/1.webp",
};

/**
 * Quick taglines shown next to each category in the dropdown. Plain text,
 * no marketing fluff — meant to help shoppers self-route fast.
 */
export const CATEGORY_TAGLINE: Record<string, string> = {
  "bar-soap": "Cold-process & artisan bars",
  "hair-care": "Shampoo & conditioner bars",
  "skin-care": "Lip balms, salves, oils",
  "oral-care": "Bamboo brushes & tooth tabs",
  "bath-&-body": "Body washes, scrubs, lotions",
  "food-wraps": "Beeswax wraps & alternatives",
  kitchen: "Bamboo, glass, stainless",
  "combs-&-brushes": "Bamboo & natural bristle",
  "home-&-decor": "Soap shelves, organizers",
};
