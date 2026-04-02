/**
 * Newsletter — full-width email signup section with a clean, minimal design.
 * Displays a headline, email input, subscribe button, and trust copy.
 *
 * Server component — the form is visual-only (no server action yet).
 * The input and button are rendered in HTML form mode without client JS.
 */

export function Newsletter() {
  return (
    <section className="bg-surface-sage/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        {/* Heading */}
        <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
          Join 500,000+ Changemakers
        </h2>

        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          Get eco tips, new arrivals, and exclusive offers delivered to your
          inbox.
        </p>

        {/* Email form */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl border border-neutral-200 bg-white px-5 py-3.5 text-sm text-primary placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:max-w-sm"
          />
          <button
            type="button"
            className="rounded-xl bg-primary px-8 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
          >
            Subscribe
          </button>
        </div>

        {/* Trust line */}
        <p className="mt-4 text-[12px] text-text-secondary">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
