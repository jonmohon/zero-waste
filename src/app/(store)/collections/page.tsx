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
  title: "Collections",
  description: "Browse our zero-waste product collections.",
};

/** Background images for known collection categories */
const CATEGORY_IMAGES: Record<string, string> = {
  "bath-&-body":
    "https://images.unsplash.com/photo-1607006483224-a7c01c71c58d?w=800&q=85",
  "hair-care":
    "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=85",
  kitchen:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
  laundry:
    "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=85",
  "oral-hygiene":
    "https://images.unsplash.com/photo-1559591937-abc79a8b6de6?w=800&q=85",
  "skin-care":
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=85",
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
            Our Collections
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
            Browse our curated zero-waste product collections. Every item is
            thoughtfully selected for sustainability, quality, and impact.
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
