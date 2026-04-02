// Route: /products/[handle]
// Individual product page. Fetches a single product by handle from Medusa.
// Premium layout with large image, refined typography, pill-style options,
// and a "You may also like" section with related products.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductByHandle, getProducts, getRegion } from "@/lib/medusa";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductCard } from "@/components/product/product-card";
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
  try {
    const region = await getRegion();
    if (!region) return [];

    const { products } = await getProducts(region.id, 100);
    return (products as Product[]).map((p) => ({ handle: p.handle }));
  } catch {
    /* Backend may be unavailable during build — skip static generation,
       pages will be rendered on-demand via ISR instead */
    return [];
  }
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

  /* Get all images for the gallery */
  const mainImage =
    product.thumbnail ?? product.images?.[0]?.url ?? null;
  const galleryImages = product.images?.slice(0, 4) ?? [];

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

  /* Fetch related products for "You may also like" */
  let relatedProducts: Product[] = [];
  try {
    const response = await getProducts(region.id, 12);
    relatedProducts = ((response?.products ?? []) as Product[])
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  } catch {
    /* Graceful fallback — section simply won't show */
  }

  return (
    <div className="bg-cream">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-[13px] text-text-secondary">
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-primary"
          >
            Home
          </Link>
          <span className="text-neutral-300">/</span>
          <Link
            href="/collections"
            className="transition-colors duration-200 hover:text-primary"
          >
            Collections
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="font-medium text-primary">{product.title}</span>
        </nav>
      </div>

      {/* Product layout */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product image area */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
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
                <ProductImagePlaceholder />
              )}
            </div>

            {/* Thumbnail gallery — only shown if multiple images exist */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5">
                {galleryImages.map((img, i) => (
                  <div
                    key={img.id ?? i}
                    className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm ring-2 ring-transparent transition-all duration-200 first:ring-accent"
                  >
                    <Image
                      src={img.url}
                      alt={`${product.title} - Image ${i + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="flex flex-col lg:py-4">
            {/* Title */}
            <h1 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-primary sm:text-3xl lg:text-[34px]">
              {product.title}
            </h1>

            {/* Price */}
            {price && (
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-2xl font-extrabold text-accent">
                  {hasMultiplePrices ? `From ${price}` : price}
                </span>
              </div>
            )}

            {/* Eco badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-accent">
                <span>&#127807;</span> Eco-Friendly
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-wider text-blue">
                <span>&#9851;&#65039;</span> Sustainable
              </span>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-neutral-200" />

            {/* Description */}
            {product.description && (
              <p className="text-[15px] leading-[1.75] text-text-secondary">
                {product.description}
              </p>
            )}

            {/* Options display — pill/button style */}
            {product.options.length > 0 && (
              <div className="mt-8 space-y-5">
                {product.options.map((option) => (
                  <div key={option.id}>
                    <p className="mb-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                      {option.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((val, i) => (
                        <span
                          key={val.id}
                          className={`cursor-pointer rounded-lg border px-4 py-2.5 font-heading text-[12px] font-semibold transition-all duration-200 hover:shadow-sm ${
                            i === 0
                              ? "border-primary bg-primary text-white shadow-sm"
                              : "border-neutral-200 bg-white text-neutral-600 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {val.value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add to cart — prominent, full-width on mobile */}
            <div className="mt-8">
              <AddToCartButton
                productId={product.id}
                variantId={cheapestVariant?.id}
              />
            </div>

            {/* Trust signals */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <TrustBadge icon="&#128230;" label="Free Shipping" sub="Orders $50+" />
              <TrustBadge icon="&#127807;" label="Plastic-Free" sub="Packaging" />
              <TrustBadge icon="&#9851;&#65039;" label="Cruelty-Free" sub="& Vegan" />
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like — related products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-surface-sage bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center font-serif text-3xl font-semibold italic text-primary sm:text-4xl">
              You May Also Like
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 2} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ProductImagePlaceholder — decorative placeholder for products without images.
 * Renders a leaf illustration with brand-consistent colors.
 */
function ProductImagePlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-surface-sage/30 p-8">
      <svg
        width="72"
        height="72"
        viewBox="0 0 48 48"
        fill="none"
        className="text-accent/25"
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
      <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary/60">
        Image coming soon
      </p>
    </div>
  );
}

/**
 * TrustBadge — small trust signal card used on the product detail page.
 * Displays an icon with a label and sub-label.
 */
function TrustBadge({
  icon,
  label,
  sub,
}: {
  icon: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-neutral-100 bg-white px-3 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-primary">
          {label}
        </p>
        <p className="text-[10px] text-text-secondary">{sub}</p>
      </div>
    </div>
  );
}
