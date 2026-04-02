/**
 * BrandStory — simplified brand story section with a split layout.
 * Left side: large editorial image. Right side: serif italic quote,
 * mission body text, and a "Learn More" CTA button.
 *
 * Server component — no client JS needed. Uses next/image for optimization.
 */
import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — editorial image */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600857544200-b2f468e10344?w=1200&q=85"
            alt="Natural artisan soap bars arranged on a wooden surface"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right — brand message */}
        <div className="flex flex-col lg:py-8">
          {/* Label */}
          <div className="mb-6 flex items-center gap-2 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Our Story
          </div>

          {/* Quote */}
          <blockquote className="mb-6 font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
            &ldquo;Sourced with Purpose,
            <br />
            Crafted with Care.&rdquo;
          </blockquote>

          {/* Accent line */}
          <div className="mb-6 h-[3px] w-14 rounded-full bg-gradient-to-r from-accent to-blue" />

          {/* Body text */}
          <p className="mb-4 text-base leading-[1.8] text-text-secondary">
            We carefully source our products from businesses that share our
            dedication to sustainability and ethical practices. Each item in our
            collection is a testament to responsible commerce.
          </p>
          <p className="mb-8 text-base leading-[1.8] text-text-secondary">
            From the ingredients to the packaging, every detail is considered.
            We believe that small everyday choices create meaningful change for
            our planet and future generations.
          </p>

          {/* CTA */}
          <Link
            href="/about"
            className="inline-flex w-fit items-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
          >
            Learn More
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
      </div>
    </section>
  );
}
