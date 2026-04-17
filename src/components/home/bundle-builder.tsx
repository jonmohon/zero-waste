/**
 * BundleBuilder — interactive starter-kit chooser. Three preset bundles
 * (Bathroom / Kitchen / Travel). Tabs at the top swap which bundle is
 * displayed; each shows 4 product tiles, the bundle total, and the
 * savings vs buying separately.
 *
 * The "Add Bundle" CTA today routes to the related collection page.
 * When real bundle SKUs exist in Medusa, the CTA can call cart.addLineItem
 * for each variant — the data shape is already in place.
 *
 * Client component — manages active-tab state.
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BundleProduct {
  title: string;
  image: string;
  price: number;
  href: string;
}

interface Bundle {
  key: string;
  label: string;
  tagline: string;
  collectionHref: string;
  products: BundleProduct[];
  /** Bundle price in cents. */
  bundleCents: number;
}

const BUNDLES: Bundle[] = [
  {
    key: "bathroom",
    label: "Bathroom Kit",
    tagline: "Everything you need for a plastic-free morning routine",
    collectionHref: "/collections/skin-care",
    bundleCents: 4800,
    products: [
      {
        title: "Gentleman's Cold-Process Soap Bar",
        image:
          "/products/gentlemans-handmade-soap-bar-vegan-cold-process/1.webp",
        price: 1200,
        href: "/products/gentlemans-handmade-soap-bar-vegan-cold-process",
      },
      {
        title: "HiBAR Curl Shampoo Bar",
        image: "/products/hibar-curl-shampoo-bar/1.webp",
        price: 1600,
        href: "/products/hibar-curl-shampoo-bar",
      },
      {
        title: "Sweet Orange Lip Balm",
        image: "/products/organic-lip-balm-sweet-orange/1.webp",
        price: 700,
        href: "/products/organic-lip-balm-sweet-orange",
      },
      {
        title: "Adult Bamboo Toothbrush",
        image: "/products/adult-toothbrush-standard-soft/1.webp",
        price: 600,
        href: "/products/adult-toothbrush-standard-soft",
      },
    ],
  },
  {
    key: "kitchen",
    label: "Kitchen Kit",
    tagline: "Replace plastic wrap, baggies, and disposables",
    collectionHref: "/collections/kitchen",
    bundleCents: 3600,
    products: [
      {
        title: "Honeycomb Beeswax Wrap (3-Pack)",
        image: "/products/1-seller-assorted-3-pack-honeycomb/1.webp",
        price: 2200,
        href: "/products/1-seller-assorted-3-pack-honeycomb",
      },
      {
        title: "Single Bamboo Straws",
        image: "/products/single-bamboo-straws/1.webp",
        price: 800,
        href: "/products/single-bamboo-straws",
      },
      {
        title: "Bamboo Soap Shelf",
        image: "/products/moso-bamboo-soap-shelf/1.webp",
        price: 1400,
        href: "/products/moso-bamboo-soap-shelf",
      },
      {
        title: "Aloe & Coconut Body Wash",
        image:
          "/products/moisturizing-vegan-body-wash-aloe-coconut-milk/1.webp",
        price: 1800,
        href: "/products/moisturizing-vegan-body-wash-aloe-coconut-milk",
      },
    ],
  },
  {
    key: "travel",
    label: "Travel Kit",
    tagline: "TSA-friendly bars and minis for the road",
    collectionHref: "/collections/bar-soap",
    bundleCents: 2800,
    products: [
      {
        title: "Maui Kiss Bar Soap",
        image: "/products/maui-kiss-sea-salt-kukui-exfoliating-loofah-soap-4-75oz/1.webp",
        price: 1100,
        href: "/products/maui-kiss-sea-salt-kukui-exfoliating-loofah-soap-4-75oz",
      },
      {
        title: "Coconut Sea Salt Loofah Soap",
        image: "/products/coconut-sea-salt-kukui-exfoliating-loofah-soap-4-75oz/1.webp",
        price: 1100,
        href: "/products/coconut-sea-salt-kukui-exfoliating-loofah-soap-4-75oz",
      },
      {
        title: "Coastal Berry Lip Balm",
        image: "/products/vegan-lip-balm-coastal-berry/1.webp",
        price: 700,
        href: "/products/vegan-lip-balm-coastal-berry",
      },
      {
        title: "Pacific Mint Lip Balm",
        image: "/products/organic-lip-balm-pacific-mint/1.webp",
        price: 700,
        href: "/products/organic-lip-balm-pacific-mint",
      },
    ],
  },
];

function formatUsd(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function BundleBuilder() {
  const [activeKey, setActiveKey] = useState(BUNDLES[0].key);
  const bundle = BUNDLES.find((b) => b.key === activeKey) ?? BUNDLES[0];
  const subtotalCents = bundle.products.reduce((sum, p) => sum + p.price, 0);
  const savedCents = subtotalCents - bundle.bundleCents;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Build a Bundle
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            Start with a starter kit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary">
            Hand-picked product trios at a bundle price. Pick the room
            you want to overhaul.
          </p>
        </div>

        {/* Tabs */}
        <div className="mx-auto mb-10 inline-flex max-w-full overflow-hidden rounded-full bg-surface-sage/40 p-1.5 sm:flex">
          {BUNDLES.map((b) => (
            <button
              key={b.key}
              type="button"
              onClick={() => setActiveKey(b.key)}
              className={`rounded-full px-6 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                activeKey === b.key
                  ? "bg-primary text-white shadow-md"
                  : "text-text-secondary hover:text-primary"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Bundle panel */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* Products grid */}
            <div className="p-6 sm:p-8">
              <p className="mb-6 font-serif text-xl italic text-text-secondary">
                {bundle.tagline}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {bundle.products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </div>
                    <p className="mt-3 line-clamp-2 font-heading text-[12px] font-semibold leading-snug text-primary transition-colors group-hover:text-accent">
                      {p.title}
                    </p>
                    <p className="mt-1 font-heading text-[12px] font-extrabold text-accent">
                      {formatUsd(p.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right rail summary */}
            <aside className="border-t border-neutral-200 bg-surface-sage/30 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                Bundle Price
              </p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-heading text-4xl font-extrabold text-primary">
                  {formatUsd(bundle.bundleCents)}
                </span>
                <span className="font-heading text-sm text-text-secondary line-through">
                  {formatUsd(subtotalCents)}
                </span>
              </div>
              {savedCents > 0 && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 font-heading text-[10.5px] font-bold uppercase tracking-[0.1em] text-accent">
                  Save {formatUsd(savedCents)}
                </p>
              )}
              <Link
                href={bundle.collectionHref}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
              >
                Shop the Kit
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
              <ul className="mt-6 space-y-2 text-[12px] text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span>
                  Ships in compostable kraft
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span>
                  Carbon-neutral delivery
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-accent">&#10003;</span>
                  30-day return guarantee
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
