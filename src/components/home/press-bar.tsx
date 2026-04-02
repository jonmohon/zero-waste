/**
 * PressBar — "As Seen In" social proof section showing press mentions.
 * Displays publication names in a clean horizontal layout.
 *
 * Server component — no client JS needed.
 */

/** Publications where the brand has been featured */
const PRESS = [
  "The New York Times",
  "Vogue",
  "Good Morning America",
  "Fast Company",
  "Forbes",
] as const;

export function PressBar() {
  return (
    <section className="border-y border-surface-sage bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-6 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
          As Seen In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
          {PRESS.map((name) => (
            <span
              key={name}
              className="font-serif text-xl font-semibold italic text-neutral-300 transition-colors duration-200 hover:text-primary sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
