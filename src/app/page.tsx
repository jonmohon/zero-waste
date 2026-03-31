// Route: /
// Homepage — hero section with CTA + featured product/collection placeholders.
// Static page, no data fetching until Medusa backend is connected.
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/** Placeholder featured categories shown on the homepage */
const FEATURED_CATEGORIES = [
  {
    title: "Kitchen",
    description: "Reusable wraps, compost bins, and plastic-free essentials.",
    href: "/collections/kitchen",
  },
  {
    title: "Bathroom",
    description: "Bamboo brushes, shampoo bars, and refillable containers.",
    href: "/collections/bathroom",
  },
  {
    title: "On the Go",
    description: "Tumblers, utensil kits, and bags that replace single-use.",
    href: "/collections/on-the-go",
  },
] as const;

export default function HomePage() {
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

      {/* Featured categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Shop by Category
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_CATEGORIES.map((cat) => (
            <a key={cat.href} href={cat.href}>
              <Card interactive>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  {cat.description}
                </p>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Featured products placeholder — will be replaced with Medusa data */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900">
            Featured Products
          </h2>
          <p className="mt-2 text-neutral-500">
            Coming soon — connect your Medusa backend to see products here.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Skeleton placeholder cards */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-xl bg-neutral-200"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
