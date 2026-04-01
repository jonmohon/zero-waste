/**
 * ShopCollections — horizontal scrolling collection carousel with typewriter
 * header effect for the homepage. Matches the artifact's .sc section.
 *
 * Client component — needed for carousel scroll behavior, arrow navigation,
 * touch swipe, and the typewriter animation.
 */
"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "@/components/home/typewriter";

/** Words cycled in the typewriter animation */
const TYPEWRITER_WORDS = [
  "VEGAN",
  "PLASTIC-FREE",
  "ZERO-WASTE",
  "SUSTAINABLE",
  "CRUELTY-FREE",
];

/** Collection card data matching the artifact */
const COLLECTIONS = [
  {
    href: "/collections/bath-body-1",
    image: "https://images.unsplash.com/photo-1607006483224-a7c01c71c58d?w=800&q=85",
    category: "Bath & Body",
    stars: "\u2605\u2605\u2605\u2605\u2605",
    reviews: "159 reviews",
    name: "Bath & Body Collection",
    price: "From $3.79",
  },
  {
    href: "/collections/hair-care",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=85",
    category: "Hair Care",
    stars: "\u2605\u2605\u2605\u2605\u00bd",
    reviews: "90 reviews",
    name: "Hair Care Collection",
    price: "From $6.49",
  },
  {
    href: "/collections/kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
    category: "Kitchen",
    stars: "\u2605\u2605\u2605\u2605\u00bd",
    reviews: "122 reviews",
    name: "Kitchen Collection",
    price: "From $5.49",
  },
  {
    href: "/collections/laundry",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&q=85",
    category: "Laundry",
    stars: "\u2605\u2605\u2605\u2605\u2605",
    reviews: "189 reviews",
    name: "Laundry Collection",
    price: "From $10.99",
  },
  {
    href: "/collections/oral-hygiene",
    image: "https://images.unsplash.com/photo-1559591937-abc79a8b6de6?w=800&q=85",
    category: "Oral Hygiene",
    stars: "\u2605\u2605\u2605\u2605\u00bd",
    reviews: "74 reviews",
    name: "Oral Hygiene Collection",
    price: "From $4.99",
  },
  {
    href: "/collections/skin-care",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=85",
    category: "Skin Care",
    stars: "\u2605\u2605\u2605\u2605\u2605",
    reviews: "203 reviews",
    name: "Skin Care Collection",
    price: "From $8.99",
  },
] as const;

const GAP = 18;

export function ShopCollections() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef(0);

  /** Calculate how many cards are visible at the current viewport */
  const getVisible = useCallback(() => {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w <= 560) return 1;
    if (w <= 860) return 2;
    if (w <= 1100) return 3;
    return 4;
  }, []);

  const maxIdx = Math.max(0, COLLECTIONS.length - getVisible());

  /** Slide the track to the current index */
  const move = useCallback(
    (newIdx: number) => {
      const clamped = Math.max(0, Math.min(newIdx, maxIdx));
      setIdx(clamped);
      if (!trackRef.current) return;
      const card = trackRef.current.querySelector<HTMLElement>("a");
      if (!card) return;
      const cardW = card.offsetWidth + GAP;
      trackRef.current.style.transform = `translateX(-${clamped * cardW}px)`;
    },
    [maxIdx]
  );

  /* Re-clamp index on resize */
  useEffect(() => {
    function handleResize() {
      move(idx);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [idx, move]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f0f8ee] to-white px-5 py-16 md:px-10 lg:px-16 lg:py-24">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-48 -top-48 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(26,123,185,0.06)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(74,170,66,0.07)_0%,transparent_65%)]" />

      {/* Header */}
      <div className="relative z-10 mb-16 text-center">
        <h2 className="mb-3.5 font-heading text-2xl font-black leading-tight tracking-tight text-primary sm:text-4xl lg:text-[52px] lg:leading-[1.05]">
          We make your everyday routines:&nbsp;
          <Typewriter words={TYPEWRITER_WORDS} />
        </h2>

        {/* Tagline */}
        <div className="mb-5 flex items-center justify-center gap-3 font-heading text-[10px] font-bold uppercase tracking-[0.22em] text-accent sm:text-xs">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent sm:w-12" />
          So You Don&apos;t Have To
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent sm:w-12" />
        </div>

        {/* Community stats */}
        <p className="mx-auto mb-5 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
          Join our community of <strong className="text-primary">500,000+</strong>{" "}
          making small, easy, and impactful changes to reduce their waste.
        </p>

        {/* Star rating */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-secondary">
          <span className="text-lg tracking-wider text-[#f5a623]">
            &#9733;&#9733;&#9733;&#9733;&#189;
          </span>
          <strong className="text-primary">Customers rate us 4.7/5</strong>
          <span>based on 40,117 reviews.</span>
        </div>
      </div>

      {/* Body: sidebar + carousel */}
      <div className="relative z-10 flex items-center">
        {/* Sidebar — desktop only */}
        <div className="hidden w-44 shrink-0 pr-4 lg:block">
          <div className="mb-2.5 font-heading text-2xl font-black leading-tight text-primary">
            Your Journey
            <br />
            Starts Here:
          </div>
          <p className="mb-1.5 text-[13px] text-text-secondary">
            Not sure where to begin?
          </p>
          <Link
            href="/collections"
            className="font-heading text-xs font-bold tracking-[0.05em] text-blue underline underline-offset-2 transition-colors hover:text-accent"
          >
            Try our Starter Kit!
          </Link>
        </div>

        {/* Previous arrow */}
        <button
          type="button"
          onClick={() => move(idx - 1)}
          className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-md transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg lg:left-48"
          aria-label="Previous"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Track */}
        <div className="mx-12 flex-1 overflow-hidden lg:mx-14">
          <div
            ref={trackRef}
            className="flex gap-[18px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 44) {
                move(diff > 0 ? idx + 1 : idx - 1);
              }
            }}
          >
            {COLLECTIONS.map((col, i) => (
              <Link
                key={col.href}
                href={col.href}
                className="group relative flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-black/7 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  flex: `0 0 calc(25% - 14px)`,
                  minWidth: 0,
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={col.image}
                    alt={col.category}
                    width={400}
                    height={300}
                    sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    priority={i < 4}
                  />
                  {/* Category pill */}
                  <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/92 px-2.5 py-1 font-heading text-[9px] font-extrabold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md">
                    {col.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  {/* Stars */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[13px] tracking-wider text-[#f5a623]">
                      {col.stars}
                    </span>
                    <span className="text-[11.5px] text-text-secondary">
                      {col.reviews}
                    </span>
                  </div>

                  <div className="truncate font-heading text-[13px] font-bold leading-snug text-primary transition-colors duration-200 group-hover:text-accent-hover">
                    {col.name}
                  </div>

                  <div className="font-heading text-sm font-extrabold text-accent">
                    {col.price}
                  </div>

                  {/* Quick Shop button */}
                  <button
                    type="button"
                    className="mt-3 w-full rounded-lg border-[1.5px] border-primary/20 py-2.5 font-heading text-[10.5px] font-bold uppercase tracking-[0.1em] text-primary transition-all duration-200 hover:-translate-y-px hover:border-primary hover:bg-primary hover:text-white"
                  >
                    Quick Shop
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Next arrow */}
        <button
          type="button"
          onClick={() => move(idx + 1)}
          className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-md transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg"
          aria-label="Next"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
