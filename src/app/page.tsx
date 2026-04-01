// Route: /
// Homepage — matches the original thezerowastestore.com layout with:
// hero, collections grid, featured product, best sellers, quotes,
// values section, and newsletter signup.
// Server component that fetches products at request time.
// Revalidates every 60 seconds (ISR).
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { NewsletterSignup } from "@/components/layout/newsletter-signup";
import { getProducts, getRegion, getCategories } from "@/lib/medusa";
import type { Product, ProductCategory } from "@/lib/types";

export const revalidate = 60;

/**
 * Collection card placeholder images — maps category names to earthy
 * background colors for visual distinction before real images are loaded.
 */
/** Maps category names to their collection images in /public/images/ */
const COLLECTION_IMAGES: Record<string, string> = {
  Kitchen: "/images/collection-kitchen.webp",
  Bathroom: "/images/collection-bathroom.webp",
  Beauty: "/images/collection-beauty.webp",
  "Cleaning Products": "/images/collection-cleaning.webp",
  "Dental Care": "/images/collection-dental.webp",
  "Gifts & Kits": "/images/collection-beauty.webp",
};

/**
 * Fallback collections to display when Medusa categories are not available.
 * Matches the original store's six main categories.
 */
const FALLBACK_COLLECTIONS = [
  { name: "Kitchen", handle: "kitchen" },
  { name: "Bathroom", handle: "bathroom" },
  { name: "Beauty", handle: "beauty" },
  { name: "Cleaning Products", handle: "cleaning-products" },
  { name: "Dental Care", handle: "dental-care" },
  { name: "Gifts & Kits", handle: "gifts-&-kits" },
];

/**
 * Values displayed in the three-column values section.
 * Each has an icon label and description from the original store.
 */
const VALUES = [
  {
    icon: "leaf",
    title: "Zero Waste Lifestyle",
    description:
      "Our products encourage a zero-waste, plastic-free, and chemical-free lifestyle.",
  },
  {
    icon: "heart",
    title: "Ethical Brands",
    description:
      "By supporting our business, you are supporting small, ethical brands.",
  },
  {
    icon: "recycle",
    title: "Eco Packaging",
    description:
      "We only use recyclable and compostable packaging.",
  },
] as const;

export default async function HomePage() {
  let products: Product[] = [];
  let activeCategories: ProductCategory[] = [];

  try {
    const region = await getRegion();

    /* Fetch products and categories in parallel for faster page load */
    const [productsResponse, categories] = await Promise.all([
      region ? getProducts(region.id, 8) : null,
      getCategories(),
    ]);

    products = (productsResponse?.products ?? []) as Product[];
    activeCategories = ((categories ?? []) as ProductCategory[]).filter(
      (c) => c.is_active
    );
  } catch {
    /* Backend unavailable — render page without products, ISR will retry */
  }

  /* Use Medusa categories if available, otherwise show fallback collection grid */
  const collections =
    activeCategories.length > 0
      ? activeCategories.map((c) => ({ name: c.name, handle: c.handle }))
      : FALLBACK_COLLECTIONS;

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-brand-50 overflow-hidden">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-36 lg:px-8">
          {/* Hero background image */}
          <Image
            src="/images/hero.webp"
            alt="Zero waste products"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              It starts with a small change
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-600 sm:text-lg">
              Sustainable everyday products that are better for you and better
              for the planet. No compromise on quality.
            </p>
            <div className="mt-8">
              <Button href="/collections" size="lg">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COLLECTIONS GRID ===== */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          Shop by Category
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => (
            <Link
              key={col.handle}
              href={`/collections/${col.handle}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-100">
                {COLLECTION_IMAGES[col.name] && (
                  <Image
                    src={COLLECTION_IMAGES[col.name]}
                    alt={col.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                {/* Overlay with category name */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-4">
                  <span className="text-lg font-semibold text-white">
                    {col.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCT HIGHLIGHT ===== */}
      <section className="bg-neutral-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:gap-12 lg:px-8 lg:py-20">
          {/* Image placeholder */}
          <div className="flex aspect-square w-full max-w-lg items-center justify-center rounded-lg bg-brand-100">
            <span className="text-sm text-neutral-400">Featured Product Image</span>
          </div>

          {/* Product details */}
          <div className="max-w-lg text-center lg:text-left">
            <span className="text-sm font-medium uppercase tracking-wider text-brand-600">
              Featured
            </span>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
              Our Most Loved Product
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Discover why this is our customers&apos; favorite. Made with
              natural, sustainable materials and designed to replace single-use
              alternatives.
            </p>
            <div className="mt-6">
              <Button href="/collections" size="md">
                View Product
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          Best Sellers
        </h2>
        {products.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 4}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Placeholder cards when no products available from Medusa */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-neutral-200 bg-white p-4">
                <div className="aspect-square rounded-lg bg-neutral-100" />
                <div className="mt-3">
                  <div className="h-4 w-3/4 rounded bg-neutral-100" />
                  <div className="mt-2 h-4 w-1/4 rounded bg-brand-100" />
                </div>
              </div>
            ))}
            <p className="col-span-full mt-2 text-center text-sm text-neutral-400">
              Products will appear here once connected to the Medusa backend.
            </p>
          </div>
        )}
      </section>

      {/* ===== QUOTE SECTION 1 — IMPERFECT ZERO WASTE ===== */}
      <section className="bg-brand-500 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <blockquote className="text-xl font-bold leading-relaxed text-white sm:text-2xl lg:text-3xl">
            &ldquo;We don&apos;t need a handful of people doing zero waste
            perfectly. We need millions of people doing it imperfectly.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ===== QUOTE SECTION 2 — ONE STRAW ===== */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <blockquote className="text-xl font-bold leading-relaxed text-neutral-900 sm:text-2xl lg:text-3xl">
            &ldquo;It&apos;s only one straw,&rdquo; said 8 billion people.
          </blockquote>
        </div>
      </section>

      {/* ===== VALUES / MISSION SECTION ===== */}
      <section className="bg-neutral-100 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                {/* Icon placeholder */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-500">
                  <ValueIcon icon={value.icon} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-neutral-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SIGNUP ===== */}
      <NewsletterSignup />
    </>
  );
}

/**
 * ValueIcon — renders a simple SVG icon for the values section.
 * Uses minimal inline SVGs to avoid external dependencies.
 *
 * @param icon - icon type: "leaf", "heart", or "recycle"
 */
function ValueIcon({ icon }: { icon: string }) {
  const iconClass = "h-8 w-8 text-white";

  switch (icon) {
    case "leaf":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 2.849.72 5.657 2.094 8.163A18.025 18.025 0 003.75 19.222M12 3v.563A18.08 18.08 0 013.753 19.2m7.874-12.386a11.959 11.959 0 00-3.375 5.436" />
        </svg>
      );
    case "heart":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      );
    case "recycle":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      );
    default:
      return null;
  }
}
