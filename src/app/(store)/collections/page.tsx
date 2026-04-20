// Route: /collections
// Lists all product categories from Medusa as browsable collections.
// Premium grid layout with category cards featuring background images,
// hover effects, and product count indicators.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/medusa";
import type { ProductCategory } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "Natural Soap, Organic Skincare & Hair Care Collections",
  description:
    "Shop natural soap, organic skincare, artisan bar soap, natural shampoo, and plastic-free hair care. Curated zero-waste collections shipped to Cleveland, OH and nationwide.",
  alternates: { canonical: "/collections" },
};

/**
 * Per-category background image for the collections grid. Each entry
 * points at a real product webp under /public/products, so the image
 * always matches the category it represents.
 */
const CATEGORY_IMAGES: Record<string, string> = {
  "bar-soap": "/products/gentlemans-handmade-soap-bar-vegan-cold-process/1.webp",
  "hair-care": "/products/hibar-curl-shampoo-bar/1.webp",
  "skin-care": "/products/organic-lip-balm-sweet-orange/1.webp",
  "oral-care": "/products/adult-toothbrush-standard-soft/1.webp",
  "food-wraps": "/products/1-seller-assorted-3-pack-honeycomb/1.webp",
  "bath-&-body":
    "/products/moisturizing-vegan-body-wash-aloe-coconut-milk/1.webp",
  "combs-&-brushes": "/products/bamboo-hair-brush/1.webp",
  "home-&-decor": "/products/moso-bamboo-soap-shelf/1.webp",
  kitchen: "/products/single-bamboo-straws/1.webp",
};

export default async function CollectionsPage() {
  let activeCategories: ProductCategory[] = [];

  try {
    const categories = (await getCategories()) as ProductCategory[];
    activeCategories = categories.filter((c) => c.is_active);
  } catch {
    /* Backend unavailable — render empty, ISR will retry */
  }

  return (
    <div className="bg-cream">
      {/* Page header */}
      <div className="border-b border-surface-sage bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-[13px] text-text-secondary">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-primary"
            >
              Home
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="font-medium text-primary">Collections</span>
          </nav>

          <h1 className="font-serif text-4xl font-semibold italic text-primary sm:text-5xl lg:text-6xl">
            Natural Soap, Organic Skincare &amp; Artisan Hair Care
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Browse our curated zero-waste collections &mdash; natural and
            organic bar soap, artisan skincare, natural shampoo, and
            plastic-free hair care products. Every item is thoughtfully
            selected for sustainability, quality, and impact, and shipped
            plastic-free to Cleveland, OH and across the US.
          </p>
        </div>
      </div>

      {/* Collections grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {activeCategories.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeCategories.map((cat, i) => {
              const bgImage = CATEGORY_IMAGES[cat.handle] ?? null;
              return (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.handle}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
                >
                  {/* Background image or solid fallback */}
                  {bgImage ? (
                    <Image
                      src={bgImage}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      priority={i < 3}
                    />
                  ) : (
                    <div className="h-full w-full bg-surface-sage" />
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-all duration-300 group-hover:from-black/80" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h2 className="font-heading text-xl font-bold uppercase tracking-[0.06em] text-white">
                      {cat.name}
                    </h2>
                    {cat.description && (
                      <p className="mt-1 text-sm text-white/60 line-clamp-2">
                        {cat.description}
                      </p>
                    )}
                    <span className="mt-2 inline-flex items-center gap-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-all duration-300 group-hover:text-white/90">
                      Browse Collection
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 text-5xl">&#127807;</div>
            <p className="font-heading text-lg font-bold text-primary">
              No collections available yet
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Check back soon for our curated product collections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
