/**
 * ShopDropdown — desktop mega-menu surfaced when the user hovers or
 * clicks the "Shop" item in the header. Renders a panel with all
 * categories on the left, two featured collections in the middle, and
 * a stacked bundle teaser column on the right.
 *
 * Categories are server-fetched once by the Header and passed as a prop
 * so the dropdown stays a small client component focused on open/close.
 *
 * Used in: Header (desktop only — mobile uses MobileMenu accordion).
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CATEGORY_ORDER,
  CATEGORY_THUMB,
  CATEGORY_TAGLINE,
} from "@/components/layout/nav-data";
import type { ProductCategory } from "@/lib/types";

interface ShopDropdownProps {
  categories: ProductCategory[];
}

export function ShopDropdown({ categories }: ShopDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Hover-intent: small delay on close so the cursor can travel from
     the trigger to the panel without the menu flickering shut. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  /* Click outside the wrapper closes the panel. */
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  /* Project Medusa categories onto our preferred display order. */
  const orderedCategories = CATEGORY_ORDER.map((handle) =>
    categories.find((c) => c.handle === handle)
  ).filter((c): c is ProductCategory => Boolean(c));

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="relative flex items-center gap-1 font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 hover:text-primary aria-expanded:text-primary"
      >
        Shop
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
      </button>

      {/* Mega panel */}
      {open && (
        <div
          className="absolute left-1/2 top-full z-40 mt-3 w-[920px] -translate-x-1/2 animate-fade-in"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {/* Pointer arrow */}
          <div className="absolute left-1/2 -top-2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-black/5 bg-white" />

          <div className="grid grid-cols-12 gap-0 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_24px_48px_rgba(0,0,0,0.12)]">
            {/* Categories column */}
            <div className="col-span-5 border-r border-neutral-100 p-7">
              <p className="mb-5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                Shop by Category
              </p>
              <ul className="grid grid-cols-1 gap-1">
                {orderedCategories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/collections/${cat.handle}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-150 hover:bg-surface-sage/40"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface">
                        {CATEGORY_THUMB[cat.handle] ? (
                          <Image
                            src={CATEGORY_THUMB[cat.handle]}
                            alt=""
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        )}
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className="font-heading text-[12.5px] font-semibold text-primary transition-colors group-hover:text-accent">
                          {cat.name}
                        </span>
                        {CATEGORY_TAGLINE[cat.handle] && (
                          <span className="text-[11px] text-text-secondary">
                            {CATEGORY_TAGLINE[cat.handle]}
                          </span>
                        )}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="text-text-secondary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Featured collections */}
            <div className="col-span-4 space-y-3 border-r border-neutral-100 p-5">
              <p className="mb-2 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
                Featured
              </p>
              <FeatureCard
                href="/collections"
                onClick={() => setOpen(false)}
                title="All Bestsellers"
                subtitle="Most-loved by our community"
                image="/products/gentlemans-handmade-soap-bar-vegan-cold-process/1.webp"
              />
              <FeatureCard
                href="/collections/skin-care"
                onClick={() => setOpen(false)}
                title="New Arrivals"
                subtitle="Just in: lip balms & oils"
                image="/products/organic-lip-balm-sweet-orange/1.webp"
              />
            </div>

            {/* Bundle teaser column */}
            <div className="col-span-3 bg-surface-sage/30 p-5">
              <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Pick a Bundle
              </p>
              <ul className="space-y-2">
                {BUNDLES.map((b) => (
                  <li key={b.label}>
                    <Link
                      href={`/collections/${b.href}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                    >
                      <span className="flex flex-col">
                        <span className="font-heading text-[12px] font-bold uppercase tracking-[0.06em] text-primary">
                          {b.label}
                        </span>
                        <span className="text-[10.5px] text-text-secondary">
                          {b.note}
                        </span>
                      </span>
                      <span className="font-heading text-[11px] font-bold text-accent">
                        {b.price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10.5px] leading-snug text-text-secondary">
                Build your own on the homepage &mdash; tap a bundle to start.
              </p>
            </div>
          </div>

          {/* Footer strip */}
          <div className="mt-2 flex items-center justify-between rounded-xl bg-primary px-5 py-3 text-white">
            <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
              124 plastic-free products &middot; ships in compostable packaging
            </span>
            <Link
              href="/collections"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-accent hover:text-white"
            >
              View all
              <svg
                width="12"
                height="12"
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
      )}
    </div>
  );
}

const BUNDLES = [
  { label: "Bathroom Kit", note: "5 essentials", price: "$48", href: "bath-%26-body" },
  { label: "Kitchen Kit", note: "4 plastic-wrap killers", price: "$36", href: "kitchen" },
  { label: "Travel Kit", note: "TSA-friendly bars", price: "$28", href: "bar-soap" },
];

/**
 * FeatureCard — image-led card surfaced in the dropdown's middle column.
 * Compact horizontal layout so two stack cleanly within the panel.
 */
function FeatureCard({
  href,
  onClick,
  title,
  subtitle,
  image,
}: {
  href: string;
  onClick: () => void;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative block aspect-[16/8] overflow-hidden rounded-xl"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="320px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-heading text-[13px] font-bold uppercase tracking-[0.06em] text-white">
          {title}
        </h3>
        <p className="text-[11px] text-white/75">{subtitle}</p>
      </div>
    </Link>
  );
}
