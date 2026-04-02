/**
 * StatsBar — horizontal trust-building stats bar displayed below the hero.
 * Shows key social proof metrics in a clean, minimal layout.
 *
 * Server component — no client JS needed.
 */

/** Individual stat items displayed in the bar */
const STATS = [
  { value: "1,000,000+", label: "Products Sold" },
  { value: "500,000+", label: "Happy Customers" },
  { value: "4.7\u2605", label: "Average Rating" },
  { value: "100%", label: "Plastic-Free Shipping" },
] as const;

export function StatsBar() {
  return (
    <section className="border-b border-surface-sage bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-surface-sage md:py-10 lg:px-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center"
          >
            <span className="font-heading text-xl font-extrabold tracking-tight text-primary sm:text-2xl">
              {stat.value}
            </span>
            <span className="mt-1 font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
