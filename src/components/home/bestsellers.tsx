/**
 * Bestsellers — displays top products from Medusa in a clean 4-column grid
 * with hover-reveal "Add to Cart" button. Falls back to skeleton shimmer
 * placeholders when no products are available.
 *
 * Server component — product data is passed from the page.
 *
 * @param products - array of Medusa Product objects to display
 */
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface BestsellersProps {
  products: Product[];
}

/**
 * Extracts the cheapest formatted price from a Medusa product.
 *
 * @param product - Medusa Product with variants
 * @returns formatted price string or null
 */
function getProductPrice(product: Product): string | null {
  const cheapest = product.variants
    .filter((v) => v.calculated_price)
    .sort(
      (a, b) =>
        (a.calculated_price?.calculated_amount ?? Infinity) -
        (b.calculated_price?.calculated_amount ?? Infinity)
    )[0];

  return cheapest?.calculated_price
    ? formatPrice(
        cheapest.calculated_price.calculated_amount,
        cheapest.calculated_price.currency_code
      )
    : null;
}

export function Bestsellers({ products }: BestsellersProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Most Loved
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            Our Bestsellers
          </h2>
        </div>

        {/* Product grid or skeleton placeholders */}
        {products.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product, i) => (
              <BestsellerCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 rounded-xl border-2 border-primary/15 px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg"
          >
            View All Products
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * BestsellerCard — individual product card with image zoom and hover
 * "Add to Cart" button overlay.
 */
function BestsellerCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const imageUrl = product.thumbnail ?? product.images?.[0]?.url ?? null;
  const price = getProductPrice(product);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            priority={priority}
          />
        ) : (
          <ProductPlaceholder />
        )}
        {/* Hover overlay with "Add to Cart" */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-primary/90 to-primary/0 px-4 pb-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
          <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-primary shadow-md">
            Add to Cart
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col gap-1.5 p-4 lg:p-5">
        <h3 className="font-heading text-[13px] font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent">
          {product.title}
        </h3>
        {price && (
          <p className="mt-auto font-heading text-base font-extrabold text-accent">
            {price}
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * ProductPlaceholder — decorative placeholder shown when a product has no image.
 * Renders a leaf pattern on a soft sage background.
 */
function ProductPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center bg-surface-sage/50">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-accent/20"
      >
        <path
          d="M24 4C24 4 36 16 36 28C36 34.6274 30.6274 40 24 40C17.3726 40 12 34.6274 12 28C12 16 24 4 24 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 16V34"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24 22L18 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M24 26L30 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * SkeletonCard — loading shimmer placeholder shown when product data is unavailable.
 */
function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white">
      <div className="aspect-square animate-shimmer bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 bg-[length:200%_100%]" />
      <div className="space-y-3 p-4 lg:p-5">
        <div className="h-4 w-3/4 animate-shimmer rounded bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 bg-[length:200%_100%]" />
        <div className="h-5 w-1/3 animate-shimmer rounded bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 bg-[length:200%_100%]" />
      </div>
    </div>
  );
}
