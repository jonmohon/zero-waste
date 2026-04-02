/**
 * HeroVideo — full-viewport cinematic video hero with oversized editorial
 * typography, trust badges, and an animated scroll indicator.
 *
 * Server component — the video tag autoplays without JS interaction.
 * Uses S3-hosted hero video (2.2MB compressed).
 */
import Link from "next/link";

/** S3-hosted hero video URL */
const VIDEO_URL =
  "https://zero-waste-assets.s3.amazonaws.com/videos/hero.mp4";

export function HeroVideo() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
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

      {/* Cinematic gradient overlay — deeper, more dramatic */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      {/* Content overlay with staggered fade-in */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Frosted pill label */}
        <div className="mb-10 inline-flex animate-fade-in items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 backdrop-blur-lg">
          <span className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-accent shadow-[0_0_10px_rgba(74,170,66,0.9)]" />
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-white/90">
            Sustainable Living
          </span>
        </div>

        {/* Main headline — large cinematic serif italic */}
        <h1 className="max-w-5xl animate-fade-up font-serif text-6xl font-semibold italic leading-[1.05] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)] sm:text-7xl md:text-8xl lg:text-[110px]">
          Less Waste,
          <br />
          More Life.
        </h1>

        {/* Accent line */}
        <div className="mt-8 h-[3px] w-16 animate-fade-in rounded-full bg-gradient-to-r from-accent to-blue" />

        {/* Subtitle */}
        <p className="mt-8 max-w-xl animate-fade-up text-base leading-relaxed text-white/70 sm:text-lg md:text-xl md:leading-relaxed">
          Sustainable everyday products crafted with care. Join our community
          of 500,000+ making small, impactful changes.
        </p>

        {/* CTA buttons */}
        <div className="mt-12 flex animate-slide-up flex-wrap items-center justify-center gap-4">
          <Link
            href="/collections"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-9 py-4.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-primary shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-[0_16px_44px_rgba(74,170,66,0.4)]"
          >
            Shop Now
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/8 px-9 py-4.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15"
          >
            Our Mission
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex animate-fade-in flex-wrap items-center justify-center gap-5 text-[11px] tracking-wide text-white/45 sm:gap-7">
          <span className="flex items-center gap-1.5">
            <span className="text-xs text-accent">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span>4.7/5 from 40,000+ reviews</span>
          </span>
          <span className="hidden h-3.5 w-px bg-white/15 sm:block" />
          <span className="flex items-center gap-1">
            <span className="text-xs">&#127807;</span>
            100% Plastic-Free Shipping
          </span>
          <span className="hidden h-3.5 w-px bg-white/15 sm:block" />
          <span className="flex items-center gap-1">
            <span className="text-xs">&#9851;&#65039;</span>
            Vegan &amp; Cruelty-Free
          </span>
        </div>
      </div>

      {/* Scroll indicator arrow */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <div className="animate-scroll-hint">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            className="opacity-60"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* Bottom fade for seamless transition to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cream" />
    </section>
  );
}
