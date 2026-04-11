/**
 * ShopByCategory — 3x2 grid of category cards with full-bleed images
 * and white text overlay. Each card links to the corresponding collection.
 *
 * Server component — no client JS needed. Uses next/image for optimization.
 */
import Image from "next/image";
import Link from "next/link";

/**
 * Category card data. Images are real product webp files served from
 * /public/products, so they always match the category they represent.
 */
const CATEGORIES = [
  {
    name: "Bar Soap",
    href: "/collections/bar-soap",
    image: "/products/gentlemans-handmade-soap-bar-vegan-cold-process/1.webp",
  },
  {
    name: "Hair Care",
    href: "/collections/hair-care",
    image: "/products/hibar-curl-shampoo-bar/1.webp",
  },
  {
    name: "Skin Care",
    href: "/collections/skin-care",
    image: "/products/organic-lip-balm-sweet-orange/1.webp",
  },
  {
    name: "Oral Care",
    href: "/collections/oral-care",
    image: "/products/adult-toothbrush-standard-soft/1.webp",
  },
  {
    name: "Food Wraps",
    href: "/collections/food-wraps",
    image: "/products/1-seller-assorted-3-pack-honeycomb/1.webp",
  },
  {
    name: "Bath & Body",
    href: "/collections/bath-%26-body",
    image:
      "/products/moisturizing-vegan-body-wash-aloe-coconut-milk/1.webp",
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
