/**
 * ProductCard — displays a single product in grid/list views.
 * Used in: HomePage featured products, CollectionPage, SearchResults.
 *
 * Redesigned with premium card styling: subtle shadow, smooth hover lift,
 * image zoom, and an overlay with "View Product" action.
 *
 * @param product - Medusa Product object (must include variants with calculated_price)
 * @param priority - if true, image loads eagerly (use for above-the-fold cards)
 */
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  /*
   * Find the cheapest variant price to display.
   * Medusa calculated_price.calculated_amount is in smallest currency unit (cents).
   */
  const cheapestVariant = product.variants
    .filter((v) => v.calculated_price)
    .sort(
      (a, b) =>
        (a.calculated_price?.calculated_amount ?? Infinity) -
        (b.calculated_price?.calculated_amount ?? Infinity)
    )[0];

  const price = cheapestVariant?.calculated_price
    ? formatPrice(
        cheapestVariant.calculated_price.calculated_amount,
        cheapestVariant.calculated_price.currency_code
      )
    : null;

  /* Use the product thumbnail, or the first image, or null */
  const imageUrl = product.thumbnail ?? product.images?.[0]?.url ?? null;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
    >
      {/* Product image with fixed aspect ratio to prevent layout shift */}
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
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/35 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="translate-y-3 rounded-lg bg-white px-5 py-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-primary shadow-lg transition-all duration-300 group-hover:translate-y-0">
            View Product
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col gap-2 p-4 lg:p-5">
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
