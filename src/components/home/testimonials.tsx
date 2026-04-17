/**
 * Testimonials — three customer review cards on a soft cream background,
 * with five-star rating, quote, customer name + location, and an
 * optional referenced product.
 *
 * Server component — pure presentation.
 */

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  product?: string;
  initials: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I switched my whole family's bathroom routine using their bundles. Six months in, our recycling bin is half the size and our skin has never been better.",
    name: "Erin S.",
    location: "Portland, OR",
    product: "Bathroom Kit",
    initials: "ES",
  },
  {
    quote:
      "The bar shampoo took me a week to adjust to. Now I can't imagine going back. Hair is shinier, less frizz, and I'm not throwing plastic in the trash every month.",
    name: "Marcus L.",
    location: "Austin, TX",
    product: "HiBAR Curl Shampoo",
    initials: "ML",
  },
  {
    quote:
      "Genuinely the best customer service I've gotten online. They emailed me back personally about a damaged box. Real humans run this store.",
    name: "Priya R.",
    location: "Brooklyn, NY",
    initials: "PR",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Customer Stories
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            What customers say
          </h2>
        </div>

        {/* Review cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-4 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              <blockquote className="flex-1 font-serif text-lg italic leading-snug text-primary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-surface-sage pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-sage font-heading text-[11px] font-bold uppercase tracking-wide text-primary">
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-[12px] font-bold uppercase tracking-[0.06em] text-primary">
                    {t.name}
                  </span>
                  <span className="text-[11.5px] text-text-secondary">
                    {t.location}
                    {t.product && (
                      <>
                        &nbsp;&middot;&nbsp;
                        <span className="text-accent">{t.product}</span>
                      </>
                    )}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
