// Route: /collections
// Lists all product categories from Medusa as browsable collections.
// Premium grid layout with collection cards featuring hover effects.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/medusa";
import type { ProductCategory } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our zero-waste product collections.",
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
    <div className="bg-white">
      {/* Page header */}
      <div className="border-b border-neutral-100 bg-surface">
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

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-primary sm:text-4xl lg:text-5xl">
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
            {activeCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/collections/${cat.handle}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] lg:p-10"
              >
                {/* Decorative accent line at top */}
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent to-blue transition-transform duration-500 group-hover:scale-x-100" />

                <h2 className="font-heading text-xl font-extrabold text-primary transition-colors duration-200 group-hover:text-accent">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                    {cat.description}
                  </p>
                )}

                {/* Arrow indicator */}
                <div className="mt-6 inline-flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Browse Collection
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
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
