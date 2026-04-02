/**
 * ShopByCategory — 3x2 grid of category cards with full-bleed images
 * and white text overlay. Each card links to the corresponding collection.
 *
 * Server component — no client JS needed. Uses next/image for optimization.
 */
import Image from "next/image";
import Link from "next/link";

/** Category data with Unsplash images and collection routes */
const CATEGORIES = [
  {
    name: "Bath & Body",
    href: "/collections/bath-%26-body",
    image:
      "https://images.unsplash.com/photo-1607006483224-a7c01c71c58d?w=800&q=85",
  },
  {
    name: "Hair Care",
    href: "/collections/hair-care",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=85",
  },
  {
    name: "Kitchen",
    href: "/collections/kitchen",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
  },
  {
    name: "Laundry",
    href: "/collections/laundry",
    image:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=85",
  },
  {
    name: "Oral Hygiene",
    href: "/collections/oral-hygiene",
    image:
      "https://images.unsplash.com/photo-1559591937-abc79a8b6de6?w=800&q=85",
  },
  {
    name: "Skin Care",
    href: "/collections/skin-care",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=85",
  },
] as const;

export function ShopByCategory() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Explore
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
        </div>

        {/* 3x2 category grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                priority={i < 3}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80" />
              {/* Category name */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-heading text-lg font-bold uppercase tracking-[0.08em] text-white sm:text-xl">
                  {cat.name}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-white/60 transition-all duration-300 group-hover:text-white/90">
                  Shop Now
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
          ))}
        </div>
      </div>
    </section>
  );
}
