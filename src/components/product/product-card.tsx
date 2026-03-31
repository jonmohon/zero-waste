/**
 * ProductCard — displays a single product in grid/list views.
 * Used in: CollectionPage, SearchResults, FeaturedProducts on homepage.
 *
 * Renders product thumbnail, title, and price inside an interactive Card.
 * Uses next/image for optimized image loading.
 *
 * @param title - product name
 * @param handle - URL slug used for the product link
 * @param thumbnail - image URL from Medusa (optional, shows placeholder if missing)
 * @param price - formatted price string (e.g. "$19.99")
 * @param priority - if true, image loads eagerly (use for above-the-fold cards)
 */
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  title: string;
  handle: string;
  thumbnail?: string | null;
  price: string;
  priority?: boolean;
}

export function ProductCard({
  title,
  handle,
  thumbnail,
  price,
  priority = false,
}: ProductCardProps) {
  return (
    <Link href={`/products/${handle}`}>
      <Card interactive>
        {/* Product image with fixed aspect ratio to prevent layout shift */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-300">
              No image
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mt-3">
          <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
          <p className="mt-1 text-sm text-neutral-500">{price}</p>
        </div>
      </Card>
    </Link>
  );
}
