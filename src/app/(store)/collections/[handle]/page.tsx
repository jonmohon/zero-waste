// Route: /collections/[handle]
// Single collection page — shows products within a category.
// Fetches category by handle, then products in that category with pricing.
// Premium layout with header banner, breadcrumbs, and refined product grid.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory, getRegion } from "@/lib/medusa";
import { ProductCard } from "@/components/product/product-card";
import type { Product, ProductCategory } from "@/lib/types";

export const revalidate = 60;

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  try {
    const { handle } = await params;
    const categories = (await getCategories()) as ProductCategory[];
    const category = categories.find((c) => c.handle === handle);

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
  const category = categories.find((c: ProductCategory) => c.handle === handle);
  if (!category || !region) notFound();

  const { products } = await getProductsByCategory(category.id, region.id);
  const productList = products as Product[];

  return (
    <div className="bg-white">
      {/* Collection header */}
      <div className="border-b border-neutral-100 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-[13px] text-text-secondary">
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
            <span className="font-medium text-primary">{category.name}</span>
          </nav>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
              {category.description}
            </p>
          )}

          {/* Product count */}
          {productList.length > 0 && (
            <p className="mt-4 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              {productList.length} product{productList.length !== 1 ? "s" : ""}
            </p>
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
