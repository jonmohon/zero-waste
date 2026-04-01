/**
 * BrandStory — brand story section for the homepage combining
 * a split-image hero banner (.bs-hero) and philosophy cards (.bs-cards).
 *
 * Server component — no client-side JS needed. Uses next/image for
 * optimized Unsplash images with proper dimensions.
 */
import Image from "next/image";
import Link from "next/link";

/** Philosophy card data matching the artifact's 3-card layout */
const PHILOSOPHY_CARDS = [
  {
    num: "01",
    icon: "\ud83c\udf3f",
    title: "It\u2019s a State of Mind",
    text: "The Elegant of Essence is a state of mind, not a superficial style to be turned on and off. It comes from seeing beauty in small things, in taking away rather than adding, in one perfect piece instead of many nondescript ones.",
    watermark: "\ud83c\udf3f",
  },
  {
    num: "02",
    icon: "\u267b\ufe0f",
    title: "Micro-Progress",
    text: "We don\u2019t promote the use of single-use plastic containers, opting instead for sustainable alternatives that uphold our commitment to environmental responsibility. Our selection process evaluates each product to ensure it aligns with our eco-friendly practices.",
    watermark: "\u267b\ufe0f",
  },
  {
    num: "03",
    icon: "\ud83c\udf38",
    title: "Beauty Through Nature",
    text: "We don\u2019t promote the use of single-use plastic containers, opting instead for sustainable alternatives that uphold our commitment to environmental responsibility. Our selection process evaluates each product to ensure it aligns with our eco-friendly practices.",
    watermark: "\ud83c\udf38",
  },
] as const;

export function BrandStory() {
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section className="relative grid h-[480px] w-full grid-cols-1 overflow-hidden sm:h-[560px] sm:grid-cols-2">
        {/* Left image panel */}
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600857544200-b2f468e10344?w=1200&q=85"
            alt="Natural artisan soap bars"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-[10s] ease-linear"
            priority
          />
          {/* Dark gradient overlay - left */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(6,14,8,0.72)] via-[rgba(6,14,8,0.45)] to-[rgba(6,14,8,0.1)]" />
        </div>

        {/* Right image panel — hidden on mobile */}
        <div className="relative hidden overflow-hidden sm:block">
          <Image
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=85"
            alt="Zero waste personal care products"
            fill
            sizes="50vw"
            className="object-cover transition-transform duration-[10s] ease-linear"
          />
          {/* Dark gradient overlay - right */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[rgba(6,14,8,0.72)] via-[rgba(6,14,8,0.45)] to-[rgba(6,14,8,0.1)]" />
        </div>

        {/* Center divider glow line */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-5 hidden w-px -translate-x-1/2 animate-line-glow sm:block bg-gradient-to-b from-transparent via-white/35 to-transparent" />

        {/* Center text overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-7 py-10 text-center sm:px-20">
          {/* Frosted pill label */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-heading text-[9.5px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(74,170,66,0.9)] animate-pulse-dot" />
            Our Commitment
          </div>

          {/* Main quote */}
          <h2 className="mb-3 max-w-3xl font-serif text-2xl font-semibold italic leading-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.4)] sm:text-3xl lg:text-[44px] lg:leading-[1.2]">
            &ldquo;Sourced with Purpose,
            <br />
            Crafted with Care.&rdquo;
          </h2>

          {/* Green accent bar */}
          <div className="mx-auto my-5 h-0.5 w-12 rounded-full bg-gradient-to-r from-accent to-blue" />

          {/* Description */}
          <p className="mb-9 max-w-xl text-sm leading-relaxed text-white/75 sm:text-[15px] sm:leading-[1.7]">
            We carefully source our products from businesses that share our
            dedication to sustainability and ethical practices. Each item in our
            collection is a testament to responsible commerce.
          </p>

          {/* CTA button */}
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-primary shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-xl lg:px-10 lg:py-4"
          >
            Browse Our Products
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
          </Link>
        </div>

        {/* Bottom fade blend into cards section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-8 h-20 bg-gradient-to-b from-transparent to-surface-warm" />
      </section>

      {/* ===== PHILOSOPHY CARDS ===== */}
      <section className="relative overflow-hidden bg-surface-warm px-5 py-16 md:px-16 lg:py-20 lg:px-16">
        {/* Subtle dot texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(74,170,66,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Section header */}
        <div className="relative z-10 mb-14 text-center">
          <div className="mb-3.5 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-gradient-to-r from-accent to-blue" />
            Our Philosophy
            <span className="h-0.5 w-7 rounded-full bg-gradient-to-r from-accent to-blue" />
          </div>
          <h3 className="font-serif text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl lg:text-[46px] lg:leading-[1.05]">
            Why We Do <em className="text-accent">What We Do</em>
          </h3>
        </div>

        {/* Card grid */}
        <div className="relative z-10 mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PHILOSOPHY_CARDS.map((card) => (
            <div
              key={card.num}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/6 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-accent before:to-blue before:transition-transform before:duration-500 hover:before:scale-x-100"
            >
              {/* Number badge */}
              <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-accent/20 bg-gradient-to-br from-accent/12 to-blue/8 font-heading text-xs font-extrabold text-accent transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-blue group-hover:text-white">
                {card.num}
              </span>

              <div className="flex flex-1 flex-col p-8 lg:p-9">
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border-[1.5px] border-accent/18 bg-gradient-to-br from-accent/10 to-blue/7 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-[4deg] group-hover:shadow-lg">
                  {card.icon}
                </div>

                <h4 className="mb-3.5 font-heading text-lg font-extrabold leading-snug text-primary transition-colors duration-200 group-hover:text-accent-hover">
                  {card.title}
                </h4>

                <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                  {card.text}
                </p>

                {/* Learn more link — appears on hover */}
                <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn More
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

              {/* Decorative watermark */}
              <span className="pointer-events-none absolute -bottom-3 -right-2.5 text-7xl leading-none opacity-[0.035] transition-all duration-300 -rotate-12 group-hover:opacity-[0.055] group-hover:-rotate-[8deg] group-hover:scale-110">
                {card.watermark}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
