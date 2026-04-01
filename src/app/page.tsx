// Route: /
// Homepage — hero section with CTA, featured products from Medusa.
// Server component that fetches products at request time.
// Revalidates every 60 seconds (ISR).
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { getProducts, getRegion, getCategories } from "@/lib/medusa";
import { Card } from "@/components/ui/card";
import type { Product, ProductCategory } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const region = await getRegion();

  /* Fetch products and categories in parallel for faster page load */
  const [productsResponse, categories] = await Promise.all([
    region ? getProducts(region.id, 8) : null,
    getCategories(),
  ]);

  const products = (productsResponse?.products ?? []) as Product[];
  const activeCategories = (categories ?? []).filter(
    (c: ProductCategory) => c.is_active
  );

  return (
    <>
      {/* Hero section */}
      <section className="bg-brand-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Less waste. More life.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600">
            Everyday products designed to eliminate waste — without sacrificing
            quality, convenience, or style.
          </p>
          <div className="mt-8 flex gap-4">
            <Button href="/collections" size="lg">
              Shop All
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              Our Mission
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      {activeCategories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900">
            Shop by Category
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {activeCategories.map((cat: ProductCategory) => (
              <a key={cat.id} href={`/collections/${cat.handle}`}>
                <Card interactive>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {cat.name}
                  </h3>
                </Card>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Featured products */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900">
            Featured Products
          </h2>
          {products.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={i < 4}
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-neutral-500">
              No products available yet. Connect your Medusa backend to get started.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
