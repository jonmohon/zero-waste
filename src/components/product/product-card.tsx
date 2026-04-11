/**
 * ProductCard — displays a single product in grid/list views.
 * Used in: HomePage featured products, CollectionPage, SearchResults.
 *
 * The image + title + price are wrapped in a Link to the product detail
 * page. The Add to Cart button below is a separate client component so
 * it doesn't trigger navigation.
 *
 * @param product - Medusa Product object (must include variants with calculated_price)
 * @param priority - if true, image loads eagerly (use for above-the-fold cards)
 */
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ProductCardAddButton } from "@/components/product/product-card-add-button";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  /*
   * Find the cheapest variant price to display + the variant ID we'll add
   * to the cart on click.
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
  const productHref = `/products/${product.handle}`;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
      {/* Clickable area: image + title + price navigates to the product page */}
      <Link href={productHref} className="flex flex-1 flex-col">
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
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-surface-sage/30">
              <svg
                width="40"
                height="40"
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
                <path d="M24 16V34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.1em] text-text-secondary/50">
                Image coming soon
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-1 flex-col gap-2 px-4 pt-4 lg:px-5">
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

      {/* Add to Cart — separate from Link so the click doesn't navigate */}
      <div className="px-4 pb-4 pt-3 lg:px-5">
        <ProductCardAddButton
          variantId={cheapestVariant?.id}
          productHref={productHref}
        />
      </div>
    </div>
  );
}
