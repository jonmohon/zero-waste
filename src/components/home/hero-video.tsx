/**
 * HeroVideo — full-viewport video hero section with dark overlay and CTA.
 * Plays a looping background video from S3 with a text overlay
 * containing the brand message and shop button.
 *
 * Server component — the video tag autoplays without JS interaction.
 * Uses a poster-less approach (video loads fast at 2.2MB compressed).
 */
import Link from "next/link";

/** S3-hosted hero video URL */
const VIDEO_URL =
  "https://zero-waste-assets.s3.amazonaws.com/videos/hero.mp4";

export function HeroVideo() {
  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
      {/* Background video — muted autoplay loop, no controls */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Frosted pill label */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-accent shadow-[0_0_8px_rgba(74,170,66,0.9)]" />
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/90">
            Sustainable Living
          </span>
        </div>

        {/* Main headline */}
        <h1 className="max-w-4xl font-serif text-4xl font-semibold italic leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Less Waste,
          <br />
          More Life.
        </h1>

        {/* Accent line */}
        <div className="mt-6 h-[3px] w-12 rounded-full bg-gradient-to-r from-accent to-blue" />

        {/* Subtitle */}
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Sustainable everyday products crafted with care. Join our community
          of 500,000+ making small, impactful changes.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 font-heading text-xs font-bold uppercase tracking-[0.1em] text-primary shadow-[0_6px_28px_rgba(0,0,0,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-[0_14px_40px_rgba(74,170,66,0.45)]"
          >
            Shop Now
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/20"
          >
            Our Mission
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="text-accent">★★★★★</span>
            4.7/5 from 40,000+ reviews
          </span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>🌿 100% Plastic-Free Shipping</span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>♻️ Vegan & Cruelty-Free</span>
        </div>
      </div>
    </section>
  );
}
