/**
 * WhyChooseUs — trust-building value proposition section with 4 feature
 * cards on a warm cream background. Replaces the old BrandStory philosophy
 * cards section with a cleaner Blueland-inspired layout.
 *
 * Server component — no client JS needed.
 */

/** Value prop data — icon, title, description */
const VALUE_PROPS = [
  {
    icon: "\uD83C\uDF3F",
    title: "100% Plastic-Free",
    description: "Every order ships in compostable packaging",
  },
  {
    icon: "\u2713",
    title: "Clean Ingredients",
    description: "Safe for your family and the planet",
  },
  {
    icon: "\u267B\uFE0F",
    title: "Carbon Neutral",
    description: "We offset 100% of our shipping emissions",
  },
  {
    icon: "\uD83D\uDC30",
    title: "Cruelty-Free",
    description: "Never tested on animals. Ever.",
  },
] as const;

export function WhyChooseUs() {
  return (
    <section className="bg-surface-sage/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Our Promise
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            Why Choose Us
          </h2>
        </div>

        {/* 4-column value props */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.title}
              className="group flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-surface-sage text-2xl transition-transform duration-300 group-hover:scale-110">
                {prop.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.06em] text-primary">
                {prop.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-text-secondary">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
