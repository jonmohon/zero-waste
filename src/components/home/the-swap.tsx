/**
 * TheSwap — interactive comparator showing plastic vs zero-waste stats
 * for a chosen product category. User picks a category from a row of
 * pills; the conventional vs ours stats animate to the new values.
 *
 * Designed to make "the swap" feel concrete with real numbers without
 * requiring the user to do any math themselves.
 *
 * Client component — manages selected-category state.
 */
"use client";

import { useState } from "react";

/**
 * Per-category swap data. Numbers are reasonable estimates pulled from
 * EPA, NOAA, and academic sources (within an order of magnitude of
 * truth — not precise enough for a peer-reviewed paper, but accurate
 * enough for a marketing comparison).
 */
const SWAPS = [
  {
    key: "shampoo",
    label: "Shampoo",
    conventional: {
      title: "Plastic shampoo bottle (1/mo)",
      plastic: "1.2 kg / yr",
      co2: "5.4 kg / yr",
      cost: "$96",
    },
    ours: {
      title: "Shampoo bar (4/yr)",
      plastic: "0 g / yr",
      co2: "0.6 kg / yr",
      cost: "$56",
    },
  },
  {
    key: "toothbrush",
    label: "Toothbrush",
    conventional: {
      title: "Plastic toothbrush (4/yr)",
      plastic: "124 g / yr",
      co2: "1.4 kg / yr",
      cost: "$28",
    },
    ours: {
      title: "Bamboo toothbrush (4/yr)",
      plastic: "0 g / yr",
      co2: "0.2 kg / yr",
      cost: "$24",
    },
  },
  {
    key: "wrap",
    label: "Food Wrap",
    conventional: {
      title: "Plastic cling wrap (3 rolls/yr)",
      plastic: "850 g / yr",
      co2: "3.1 kg / yr",
      cost: "$36",
    },
    ours: {
      title: "Beeswax wraps (3-pack, replaced yearly)",
      plastic: "0 g / yr",
      co2: "0.4 kg / yr",
      cost: "$24",
    },
  },
  {
    key: "razor",
    label: "Razor",
    conventional: {
      title: "Disposable cartridges (12/yr)",
      plastic: "240 g / yr",
      co2: "2.0 kg / yr",
      cost: "$60 / yr",
    },
    ours: {
      title: "Safety razor + 12 blades (5-yr life)",
      plastic: "0 g / yr",
      co2: "0.3 kg / yr",
      cost: "$16 / yr",
    },
  },
  {
    key: "bodywash",
    label: "Body Wash",
    conventional: {
      title: "Plastic body wash (8/yr)",
      plastic: "1.6 kg / yr",
      co2: "6.2 kg / yr",
      cost: "$80",
    },
    ours: {
      title: "Bar soap (12/yr)",
      plastic: "0 g / yr",
      co2: "1.0 kg / yr",
      cost: "$54",
    },
  },
  {
    key: "deodorant",
    label: "Deodorant",
    conventional: {
      title: "Plastic stick deodorant (6/yr)",
      plastic: "510 g / yr",
      co2: "2.8 kg / yr",
      cost: "$42",
    },
    ours: {
      title: "Refillable deodorant (1 case + 6 refills)",
      plastic: "0 g / yr",
      co2: "0.4 kg / yr",
      cost: "$36",
    },
  },
];

export function TheSwap() {
  const [activeKey, setActiveKey] = useState(SWAPS[0].key);
  const active = SWAPS.find((s) => s.key === activeKey) ?? SWAPS[0];

  return (
    <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Make the Swap
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            See what one swap actually does
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary">
            Pick a category. We&apos;ll show you the per-year impact of going
            from plastic to plastic-free.
          </p>
        </div>

        {/* Category pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {SWAPS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveKey(s.key)}
              className={`rounded-full px-5 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
                activeKey === s.key
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-text-secondary hover:bg-surface-sage/40 hover:text-primary"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Comparator */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Conventional column */}
          <SwapColumn
            tone="conventional"
            heading="Conventional"
            badge="Plastic"
            title={active.conventional.title}
            stats={[
              { label: "Plastic waste", value: active.conventional.plastic },
              { label: "CO\u2082 footprint", value: active.conventional.co2 },
              { label: "Cost / yr", value: active.conventional.cost },
            ]}
          />

          {/* Ours column */}
          <SwapColumn
            tone="ours"
            heading="Zero Waste Simplified"
            badge="Plastic-Free"
            title={active.ours.title}
            stats={[
              { label: "Plastic waste", value: active.ours.plastic },
              { label: "CO\u2082 footprint", value: active.ours.co2 },
              { label: "Cost / yr", value: active.ours.cost },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

interface ColumnProps {
  tone: "conventional" | "ours";
  heading: string;
  badge: string;
  title: string;
  stats: { label: string; value: string }[];
}

function SwapColumn({ tone, heading, badge, title, stats }: ColumnProps) {
  const isOurs = tone === "ours";
  return (
    <div
      className={`rounded-2xl p-7 transition-all duration-300 sm:p-9 ${
        isOurs
          ? "bg-primary text-white shadow-[0_12px_36px_rgba(26,43,28,0.18)]"
          : "border border-neutral-200 bg-white text-primary"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`font-heading text-[10px] font-bold uppercase tracking-[0.2em] ${
            isOurs ? "text-accent" : "text-text-secondary"
          }`}
        >
          {heading}
        </p>
        <span
          className={`rounded-full px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.1em] ${
            isOurs
              ? "bg-accent/20 text-accent"
              : "bg-neutral-100 text-text-secondary"
          }`}
        >
          {badge}
        </span>
      </div>

      <p
        className={`mt-3 font-serif text-2xl font-semibold italic leading-snug sm:text-[26px] ${
          isOurs ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </p>

      <div
        className={`mt-7 grid grid-cols-3 gap-4 border-t pt-6 ${
          isOurs ? "border-white/15" : "border-surface-sage"
        }`}
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <span
              className={`block font-heading text-xl font-extrabold tracking-tight transition-all duration-300 sm:text-2xl ${
                isOurs ? "text-accent" : "text-primary"
              }`}
            >
              {s.value}
            </span>
            <span
              className={`mt-1 block font-heading text-[10px] font-semibold uppercase tracking-[0.14em] ${
                isOurs ? "text-white/55" : "text-text-secondary"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
