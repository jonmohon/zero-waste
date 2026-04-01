/**
 * ProductCard — displays a single product in grid/list views.
 * Used in: HomePage featured products, CollectionPage, SearchResults.
 *
 * Redesigned to match the artifact card style with rounded corners,
 * hover lift effect, and accent green price color.
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
      className="group flex flex-col overflow-hidden rounded-xl border border-black/7 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Product image with fixed aspect ratio to prevent layout shift */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No image
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="translate-y-2 rounded-lg bg-white px-4 py-2 font-heading text-[10.5px] font-bold uppercase tracking-[0.08em] text-primary shadow-md transition-transform duration-300 group-hover:translate-y-0">
            View Product
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col gap-1 border-t border-black/5 p-3 lg:p-4">
        <h3 className="font-heading text-xs font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent-hover">
          {product.title}
        </h3>
        {price && (
          <p className="mt-auto font-heading text-sm font-extrabold text-accent">
            {price}
          </p>
        )}
      </div>
    </Link>
  );
}
