/**
 * FeaturedProducts — hero product showcase section for the homepage.
 * Displays a large featured product on the left with a grid of smaller
 * product cards on the right, matching the artifact's .fc section design.
 *
 * Server component — fetches products from Medusa and renders statically.
 *
 * @param products - array of Medusa Product objects to display
 */
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

/** Fallback product data used when Medusa backend is unavailable */
const FALLBACK_FEATURED = {
  handle: "coconut-suntan-artisan-soap",
  title: "Coconut Suntan Artisan Soap",
  brand: "Soaring Suds",
  tagline: "Handcrafted with natural coconut oils. Zero-waste and cruelty-free.",
  price: "$9.00 USD",
  image:
    "https://thezerowastestore.com/cdn/shop/files/Picture16.png?v=1757961896&width=990",
};

const FALLBACK_CARDS = [
  {
    handle: "compostable-loofah-scrubber-pack-of-6",
    title: "Compostable Loofah Scrubber \u2014 Pack of 6",
    price: "$21.99 USD",
    badge: "\u267b Zero Waste",
    image:
      "https://thezerowastestore.com/cdn/shop/files/72b8f0e07f4bfe6bc90e6cde54fa440a910e6a9f8b87279ae7bf1dda5bf6149a.jpg?v=1757961918&width=990",
  },
  {
    handle: "compostable-loofah-scrubber-single",
    title: "Compostable Loofah Scrubber \u2014 Single",
    price: "$3.79 USD",
    badge: "\u267b Zero Waste",
    image:
      "https://thezerowastestore.com/cdn/shop/files/22adefe1165ca6cdc8a980c1a999c34df26c06a9981812160e6fb7d9cbad84e7.jpg?v=1757961865&width=990",
  },
  {
    handle: "vetiver-and-agave-bath-scrub",
    title: "Vetiver and Agave Bath Scrub",
    price: "$14.00 USD",
    badge: "\ud83c\udf3f Natural",
    image:
      "https://thezerowastestore.com/cdn/shop/files/220ed749d2c9ff20a62779060e0555a7f9ae2014e1a469204c543c4a09516bf8.jpg?v=1757961912&width=990",
  },
  {
    handle: "hibar-shower-bar-single-lift",
    title: "HiBAR Shower Bar Single Lift",
    price: "$10.96 USD",
    badge: "\ud83c\udf3f Natural",
    image:
      "https://thezerowastestore.com/cdn/shop/files/bee4eb785f1389b94544688f619fcebd67950b69a728aa63af9e0ce3dd7d0a11.jpg?v=1757961950&width=990",
  },
  {
    handle: "moso-bamboo-soap-shelf",
    title: "Bamboo Soap Shelf",
    price: "$8.98 USD",
    badge: "\ud83c\udf31 Eco",
    image:
      "https://thezerowastestore.com/cdn/shop/files/c77c2174aa64209119e2ff41dfaf65c9f0bd9c5e07d1943eb64ddbb06eea0a41.jpg?v=1757961985&width=990",
    wide: true,
  },
];

/**
 * Helper to extract the cheapest formatted price from a Medusa product.
 *
 * @param product - Medusa Product with variants
 * @returns formatted price string or null
 */
function getProductPrice(product: Product): string | null {
  const cheapest = product.variants
    .filter((v) => v.calculated_price)
    .sort(
      (a, b) =>
        (a.calculated_price?.calculated_amount ?? Infinity) -
        (b.calculated_price?.calculated_amount ?? Infinity)
    )[0];

  return cheapest?.calculated_price
    ? formatPrice(
        cheapest.calculated_price.calculated_amount,
        cheapest.calculated_price.currency_code
      )
    : null;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  /* Use Medusa products if available; otherwise use fallback static data */
  const hasMedusaProducts = products.length > 0;
  const featured = hasMedusaProducts ? products[0] : null;
  const gridProducts = hasMedusaProducts ? products.slice(1, 6) : [];

  return (
    <section className="w-full bg-white px-5 py-10 md:px-10 lg:px-16 lg:py-18">
      {/* Top header row */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="flex-1">
          {/* Green label bar */}
          <div className="mb-3 flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Our Collections
          </div>
          <h2 className="mb-4 font-heading text-2xl font-extrabold leading-tight tracking-tight text-primary md:text-3xl lg:text-4xl">
            Featured Collection:{" "}
            <span className="text-blue">Bath &amp; Body</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-text-secondary lg:text-[14.5px]">
            Discover our Bath &amp; Body collection, where sustainability meets
            daily indulgence. Each product is thoughtfully crafted with
            cruelty-free and zero-waste practices.
          </p>
        </div>
        <Link
          href="/collections/bath-%26-body"
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border-2 border-primary/18 px-6 py-3 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg"
        >
          View All
          <ArrowIcon />
        </Link>
      </div>

      {/* Divider */}
      <div className="mb-10 h-px bg-black/8" />

      {/* Main content grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Featured card (left) */}
        {featured ? (
          <Link
            href={`/products/${featured.handle}`}
            className="group relative block overflow-hidden rounded-2xl bg-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <Image
                src={featured.thumbnail ?? featured.images?.[0]?.url ?? FALLBACK_FEATURED.image}
                alt={featured.title}
                width={600}
                height={800}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-[9s] ease-linear group-hover:scale-[1.06]"
                priority
              />
            </div>
            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
            {/* Featured pill */}
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 font-heading text-[9px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(74,170,66,0.8)] animate-pulse-dot" />
              Featured Pick
            </div>
            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <div className="mb-1 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                {FALLBACK_FEATURED.brand}
              </div>
              <div className="mb-2 font-heading text-xl font-extrabold leading-tight text-white lg:text-2xl">
                {featured.title}
              </div>
              <p className="mb-5 max-w-xs text-[13px] leading-relaxed text-white/65">
                {featured.description ?? FALLBACK_FEATURED.tagline}
              </p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-heading text-xl font-extrabold text-white">
                  {getProductPrice(featured) ?? FALLBACK_FEATURED.price}
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-primary shadow-md transition-all duration-200 group-hover:bg-accent group-hover:text-white">
                  Shop Now
                  <ArrowIcon />
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <FallbackFeaturedCard />
        )}

        {/* Products grid (right) */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {hasMedusaProducts
            ? gridProducts.map((product, i) => (
                <MedusaSmallCard
                  key={product.id}
                  product={product}
                  wide={i === 4}
                  priority={i < 2}
                />
              ))
            : FALLBACK_CARDS.map((card) => (
                <FallbackSmallCard key={card.handle} card={card} />
              ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center lg:mt-14">
        <Link
          href="/collections/bath-%26-body"
          className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-10 py-4 font-heading text-xs font-bold uppercase tracking-[0.09em] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl"
        >
          View All Bath &amp; Body Products
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

/**
 * MedusaSmallCard — renders a single product card from Medusa data
 * in the featured products right-side grid.
 */
function MedusaSmallCard({
  product,
  wide = false,
  priority = false,
}: {
  product: Product;
  wide?: boolean;
  priority?: boolean;
}) {
  const imageUrl = product.thumbnail ?? product.images?.[0]?.url ?? null;
  const price = getProductPrice(product);

  return (
    <Link
      href={`/products/${product.handle}`}
      className={`group flex overflow-hidden rounded-xl border border-black/7 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${wide ? "col-span-2 max-h-28 flex-row" : "flex-col"}`}
    >
      <div
        className={`relative overflow-hidden bg-neutral-100 ${wide ? "w-36 shrink-0" : "aspect-square"}`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            width={wide ? 140 : 300}
            height={wide ? 112 : 300}
            sizes={wide ? "140px" : "(max-width: 768px) 50vw, 25vw"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
            No image
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="translate-y-2 rounded-lg bg-white px-4 py-2 font-heading text-[10.5px] font-bold uppercase tracking-[0.08em] text-primary shadow-md transition-transform duration-300 group-hover:translate-y-0">
            Shop Now &rarr;
          </span>
        </div>
      </div>
      <div
        className={`flex flex-1 flex-col gap-1.5 p-3 lg:p-4 ${wide ? "justify-center border-l border-black/5" : "border-t border-black/5"}`}
      >
        <div className="font-heading text-xs font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent-hover">
          {product.title}
        </div>
        {price && (
          <div className="mt-auto font-heading text-sm font-extrabold text-accent">
            {price}
          </div>
        )}
      </div>
    </Link>
  );
}

/**
 * FallbackFeaturedCard — static featured card shown when Medusa is unavailable.
 */
function FallbackFeaturedCard() {
  return (
    <Link
      href={`/products/${FALLBACK_FEATURED.handle}`}
      className="group relative block overflow-hidden rounded-2xl bg-neutral-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[3/4] overflow-hidden">
        <Image
          src={FALLBACK_FEATURED.image}
          alt={FALLBACK_FEATURED.title}
          width={600}
          height={800}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-[9s] ease-linear group-hover:scale-[1.06]"
          priority
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 font-heading text-[9px] font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(74,170,66,0.8)] animate-pulse-dot" />
        Featured Pick
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <div className="mb-1 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
          {FALLBACK_FEATURED.brand}
        </div>
        <div className="mb-2 font-heading text-xl font-extrabold leading-tight text-white lg:text-2xl">
          {FALLBACK_FEATURED.title}
        </div>
        <p className="mb-5 max-w-xs text-[13px] leading-relaxed text-white/65">
          {FALLBACK_FEATURED.tagline}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="font-heading text-xl font-extrabold text-white">
            {FALLBACK_FEATURED.price}
          </span>
          <span className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-primary shadow-md transition-all duration-200 group-hover:bg-accent group-hover:text-white">
            Shop Now
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * FallbackSmallCard — static product card for when Medusa is unavailable.
 */
function FallbackSmallCard({
  card,
}: {
  card: (typeof FALLBACK_CARDS)[number];
}) {
  return (
    <Link
      href={`/products/${card.handle}`}
      className={`group flex overflow-hidden rounded-xl border border-black/7 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${card.wide ? "col-span-2 max-h-28 flex-row" : "flex-col"}`}
    >
      <div
        className={`relative overflow-hidden bg-neutral-100 ${card.wide ? "w-36 shrink-0" : "aspect-square"}`}
      >
        <Image
          src={card.image}
          alt={card.title}
          width={card.wide ? 140 : 300}
          height={card.wide ? 112 : 300}
          sizes={card.wide ? "140px" : "(max-width: 768px) 50vw, 25vw"}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        {/* Eco badge */}
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-accent/90 px-2 py-1 font-heading text-[8px] font-extrabold uppercase tracking-[0.1em] text-white">
          {card.badge}
        </span>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="translate-y-2 rounded-lg bg-white px-4 py-2 font-heading text-[10.5px] font-bold uppercase tracking-[0.08em] text-primary shadow-md transition-transform duration-300 group-hover:translate-y-0">
            Shop Now &rarr;
          </span>
        </div>
      </div>
      <div
        className={`flex flex-1 flex-col gap-1.5 p-3 lg:p-4 ${card.wide ? "justify-center border-l border-black/5" : "border-t border-black/5"}`}
      >
        <div className="font-heading text-xs font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent-hover">
          {card.title}
        </div>
        <div className="mt-auto font-heading text-sm font-extrabold text-accent">
          {card.price}
        </div>
      </div>
    </Link>
  );
}

/**
 * ArrowIcon — small right-pointing arrow SVG used in buttons and links.
 */
function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
