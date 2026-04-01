/**
 * ProductCard — displays a single product in grid/list views.
 * Used in: HomePage featured products, CollectionPage, SearchResults.
 *
 * Renders product thumbnail, title, and cheapest variant price
 * inside an interactive Card. Uses next/image for optimized loading.
 *
 * @param product - Medusa Product object (must include variants with calculated_price)
 * @param priority - if true, image loads eagerly (use for above-the-fold cards)
 */
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
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
  const imageUrl =
    product.thumbnail ?? product.images?.[0]?.url ?? null;

  return (
    <Link href={`/products/${product.handle}`}>
      <Card interactive>
        {/* Product image with fixed aspect ratio to prevent layout shift */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              No image
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mt-3">
          <h3 className="text-sm font-medium text-neutral-900">
            {product.title}
          </h3>
          {price && (
            <p className="mt-1 text-sm font-medium text-brand-700">
              {price}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
