// Route: /collections/[handle]
// Single collection page — shows products within a category.
// Fetches category by handle, then products in that category with pricing.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900">{category.name}</h1>
      {category.description && (
        <p className="mt-2 text-neutral-500">{category.description}</p>
      )}

      {(products as Product[]).length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(products as Product[]).map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-neutral-500">
          No products in this collection yet.
        </p>
      )}
    </div>
  );
}
