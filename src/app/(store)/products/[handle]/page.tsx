// Route: /products/[handle]
// Individual product page. Fetches a single product by handle from Medusa.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductByHandle, getProducts, getRegion } from "@/lib/medusa";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import type { Product } from "@/lib/types";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

/**
 * Generate static paths for all products at build time.
 * New products added after build will be rendered on-demand via ISR.
 */
export async function generateStaticParams() {
  const region = await getRegion();
  if (!region) return [];

  const { products } = await getProducts(region.id, 100);
  return (products as Product[]).map((p) => ({ handle: p.handle }));
}

/** Page metadata from Medusa product data */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const region = await getRegion();
  if (!region) return { title: "Product" };

  const product = await getProductByHandle(handle, region.id) as Product | null;
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const region = await getRegion();
  if (!region) notFound();

  const product = await getProductByHandle(handle, region.id) as Product | null;
  if (!product) notFound();

  /* Get the first image or thumbnail for display */
  const mainImage =
    product.thumbnail ?? product.images?.[0]?.url ?? null;

  /* Find cheapest variant for the "from $X" display */
  const cheapestVariant = product.variants
    .filter((v) => v.calculated_price)
    .sort(
      (a, b) =>
        (a.calculated_price?.calculated_amount ?? Infinity) -
        (b.calculated_price?.calculated_amount ?? Infinity)
    )[0];

  const hasMultiplePrices = product.variants.length > 1;
  const price = cheapestVariant?.calculated_price
    ? formatPrice(
        cheapestVariant.calculated_price.calculated_amount,
        cheapestVariant.calculated_price.currency_code
      )
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              No image available
            </div>
          )}
        </div>

        {/* Product details */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            {product.title}
          </h1>

          {price && (
            <p className="mt-4 text-2xl font-semibold text-brand-700">
              {hasMultiplePrices ? `From ${price}` : price}
            </p>
          )}

          {product.description && (
            <p className="mt-6 text-base leading-relaxed text-neutral-600">
              {product.description}
            </p>
          )}

          {/* Options display */}
          {product.options.length > 0 && (
            <div className="mt-8 space-y-4">
              {product.options.map((option) => (
                <div key={option.id}>
                  <p className="text-sm font-medium text-neutral-700">
                    {option.title}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {option.values.map((val) => (
                      <span
                        key={val.id}
                        className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700"
                      >
                        {val.value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to cart — client component for interactivity */}
          <div className="mt-8">
            <AddToCartButton
              productId={product.id}
              variantId={cheapestVariant?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
