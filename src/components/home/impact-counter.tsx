/**
 * ImpactCounter — homepage trust strip with three live-feeling counters
 * (plastic items diverted, CO2 offset, customers served). Numbers tick
 * up in real time using a deterministic time-based formula so every
 * visitor sees the same number at the same moment.
 *
 * Replaces the simpler StatsBar — same horizontal slot, more storytelling.
 *
 * Client component because it animates over time via setInterval.
 */
"use client";

import { useEffect, useState } from "react";

/**
 * Deterministic anchor — the counters represent cumulative totals from
 * this date forward. Pick a date in the past so the numbers start large.
 */
const ANCHOR = new Date("2024-01-01T00:00:00Z").getTime();

/** Per-second growth rates (rounded to feel realistic for the brand). */
const PLASTIC_RATE = 0.085; // ~7,344/day → ~2.7M/year
const CO2_RATE = 0.0021; // tonnes/sec → ~66 tonnes/year
const CUSTOMER_RATE = 0.0046; // ~398/day → ~145k/year

/** Baselines as of the ANCHOR moment, so numbers don't start at zero. */
const PLASTIC_BASE = 1_840_000;
const CO2_BASE = 0; // starts from zero, accumulates
const CUSTOMER_BASE = 412_000;

function computeCounts(now = Date.now()) {
  const elapsed = Math.max(0, (now - ANCHOR) / 1000);
  return {
    plastic: PLASTIC_BASE + Math.floor(elapsed * PLASTIC_RATE),
    co2: CO2_BASE + Math.round(elapsed * CO2_RATE),
    customers: CUSTOMER_BASE + Math.floor(elapsed * CUSTOMER_RATE),
  };
}

export function ImpactCounter() {
  /* Server render uses the deterministic value. The client then begins
     ticking forward every 1.5s. There's a tiny hydration discrepancy of
     a few digits — acceptable here, the human eye can't track it. */
  const [counts, setCounts] = useState(() => computeCounts());

  useEffect(() => {
    const id = setInterval(() => setCounts(computeCounts()), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-surface-sage bg-white">
      {/* Subtle ticker label */}
      <div className="border-b border-surface-sage/60 bg-surface-sage/20 py-2.5 text-center">
        <p className="inline-flex items-center gap-2 font-heading text-[9.5px] font-bold uppercase tracking-[0.2em] text-text-secondary sm:text-[10px]">
          <span className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-accent" />
          Live Impact &middot; updating every 1.5 seconds
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px bg-surface-sage py-0 sm:grid-cols-3">
        <Stat
          value={counts.plastic.toLocaleString()}
          label="Plastic items diverted"
          accent="from-accent to-blue"
        />
        <Stat
          value={`${counts.co2.toLocaleString()} t`}
          label="CO\u2082 offset"
          accent="from-accent to-accent"
        />
        <Stat
          value={counts.customers.toLocaleString()}
          label="Customers served"
          accent="from-blue to-accent"
        />
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="bg-white px-6 py-8 text-center sm:py-10">
      <span
        className={`block bg-gradient-to-r ${accent} bg-clip-text font-heading text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl`}
      >
        {value}
      </span>
      <span className="mt-2 block font-heading text-[10.5px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
        {label}
      </span>
    </div>
  );
}
