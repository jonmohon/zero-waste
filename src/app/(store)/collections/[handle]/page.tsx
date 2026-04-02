// Route: /collections/[handle]
// Single collection page — shows products within a category.
// Fetches category by handle, then products in that category with pricing.
// Premium layout with header banner image, product count badge, and clean grid.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory, getRegion } from "@/lib/medusa";
import { ProductCard } from "@/components/product/product-card";
import type { Product, ProductCategory } from "@/lib/types";

export const revalidate = 60;

/** Background images for known collection categories */
const CATEGORY_IMAGES: Record<string, string> = {
  "bath-&-body":
    "https://images.unsplash.com/photo-1607006483224-a7c01c71c58d?w=1200&q=85",
  "hair-care":
    "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=1200&q=85",
  kitchen:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85",
  laundry:
    "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&q=85",
  "oral-hygiene":
    "https://images.unsplash.com/photo-1559591937-abc79a8b6de6?w=1200&q=85",
  "skin-care":
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=85",
};

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  try {
    const { handle } = await params;
    const decodedHandle = decodeURIComponent(handle);
    const categories = (await getCategories()) as ProductCategory[];
    const category = categories.find(
      (c) => c.handle === handle || c.handle === decodedHandle
    );

    return {
      title: category?.name ?? "Collection",
      description: category?.description ?? undefined,
    };
  } catch {
    return { title: "Collection" };
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;

  const [region, allCategories] = await Promise.all([
    getRegion(),
    getCategories(),
  ]);

  const categories = allCategories as ProductCategory[];
  /* Decode the handle in case the URL was percent-encoded (e.g. bath-%26-body) */
  const decodedHandle = decodeURIComponent(handle);
  const category = categories.find(
    (c: ProductCategory) => c.handle === handle || c.handle === decodedHandle
  );
  if (!category || !region) notFound();

  const { products } = await getProductsByCategory(category.id, region.id);
  const productList = products as Product[];

  const bgImage = CATEGORY_IMAGES[category.handle] ?? null;

  return (
    <div className="bg-cream">
      {/* Collection header with background image */}
      <div className="relative overflow-hidden">
        {/* Background image or solid fallback */}
        {bgImage ? (
          <>
            <Image
              src={bgImage}
              alt={category.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-primary" />
        )}

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-[13px] text-white/60">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              Home
            </Link>
            <span className="text-white/30">/</span>
            <Link
              href="/collections"
              className="transition-colors duration-200 hover:text-white"
            >
              Collections
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-medium text-white">{category.name}</span>
          </nav>

          <h1 className="font-serif text-4xl font-semibold italic text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70">
              {category.description}
            </p>
          )}

          {/* Product count badge */}
          {productList.length > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-white">
                {productList.length} product{productList.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {productList.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productList.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 4}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 text-5xl">&#127807;</div>
            <p className="font-heading text-lg font-bold text-primary">
              No products yet
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              This collection is being curated. Check back soon.
            </p>
            <Link
              href="/collections"
              className="mt-6 inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-accent transition-colors hover:text-accent-hover"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Collections
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
