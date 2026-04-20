// Route: /about
// About page — mission, values, story timeline, team, certifications,
// impact, CTA. Statically generated at build time.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FoundersLetter } from "@/components/about/founders-letter";

export const metadata: Metadata = {
  title: "About Zero Waste Simplified | Natural Soap & Skincare Sourcing",
  description:
    "Meet the team behind Zero Waste Simplified — a small-batch online store curating natural soap, organic skincare, and artisan hair care for Cleveland, OH and the US.",
  alternates: { canonical: "/about" },
};

/** Core brand values surfaced in the 4-up section. */
const VALUES = [
  {
    icon: "\uD83C\uDF3F",
    title: "Plastic-Free, Period",
    body: "Every product, every mailer, every piece of tape. If it can't be composted or recycled at your curb, we don't stock it.",
  },
  {
    icon: "\u270B",
    title: "Small-Batch Makers",
    body: "We partner with independent US soap makers, skincare formulators, and hair care producers — not mass manufacturers or pay-to-play brands.",
  },
  {
    icon: "\uD83C\uDF0E",
    title: "Honest Ingredients",
    body: "Palm-oil-free, cruelty-free, and transparent on every label. Vegan products are tagged, and every ingredient is listed on the product page.",
  },
  {
    icon: "\uD83D\uDC30",
    title: "Cruelty-Free Always",
    body: "Nothing we sell is tested on animals. Leaping Bunny and certified vegan options are called out so you can shop by conscience, not guesswork.",
  },
];

/** Founding milestones rendered as a vertical timeline. */
const TIMELINE = [
  {
    year: "2019",
    title: "Zero Waste Simplified begins",
    body: "Founded as a Shopify side project selling three bar soaps and a bamboo toothbrush from a kitchen in the Midwest.",
  },
  {
    year: "2021",
    title: "First 1,000 orders shipped plastic-free",
    body: "Switched every mailer, fill, and tape to kraft paper and compostable alternatives. The 18% cost increase was worth it.",
  },
  {
    year: "2023",
    title: "Expanded natural hair care line",
    body: "Added shampoo bars, conditioner bars, and scalp oils from five new US makers. Hair care is now our fastest-growing category.",
  },
  {
    year: "2025",
    title: "Shipping nationwide from Cleveland, OH",
    body: "Moved fulfillment to a dedicated facility serving Cleveland, OH and every US state. Orders now arrive in 3-7 business days nationwide.",
  },
];

/**
 * Team bios. Image fields use generic neutral placeholders — replace with
 * real portraits when provided.
 */
const TEAM = [
  {
    name: "Maya Linden",
    role: "Founder & Buyer",
    bio: "Maya sources every bar of natural soap and every organic skincare line we carry. Former industrial designer, now a full-time maker-hunter.",
  },
  {
    name: "James Okafor",
    role: "Operations & Logistics",
    bio: "James runs fulfillment out of our Cleveland, OH warehouse and keeps plastic-free shipping running on schedule, even at peak.",
  },
  {
    name: "Priya Anand",
    role: "Hair Care Lead",
    bio: "Priya tests every natural shampoo and hair care product before it ships. She will talk you through the transition week whether you want advice or not.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <Image
          src="/images/heroes/about-hero.webp"
          alt="The Zero Waste Simplified story — curating natural soap, organic skincare, and artisan hair care"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/55 to-primary" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-accent" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
              About Us
            </span>
          </div>
          <h1 className="font-serif text-5xl font-semibold italic leading-[1.05] text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            Natural soap. Honest skincare. No plastic.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Zero Waste Simplified is an online store curating natural soap,
            organic skincare, natural hair care, and natural shampoo from
            small-batch US makers &mdash; shipped plastic-free to Cleveland,
            OH and every US state.
          </p>
        </div>
      </section>

      {/* Founder's letter */}
      <FoundersLetter />

      {/* Mission strip */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Our Mission
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            Make the plastic-free swap normal, not niche.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-[1.85] text-text-secondary">
            We exist to make natural soap, organic skincare, and natural
            hair care as easy to find and buy as any mass-market product.
            We refuse plastic packaging, vague marketing claims, and pay-to-play
            supplier deals. What you see on a product page is what the
            maker actually put in the bar or bottle.
          </p>
        </div>
      </section>

      {/* Values 4-up */}
      <section className="bg-surface-sage/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              What We Stand For
              <span className="h-0.5 w-7 rounded-full bg-accent" />
            </div>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
              Our Values
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-sage text-2xl">
                  {v.icon}
                </div>
                <h3 className="mb-2 font-heading text-sm font-bold uppercase tracking-[0.06em] text-primary">
                  {v.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-text-secondary">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              Our Story
              <span className="h-0.5 w-7 rounded-full bg-accent" />
            </div>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
              How we got here
            </h2>
          </div>
          <ol className="relative ml-3 border-l-2 border-surface-sage">
            {TIMELINE.map((m, i) => (
              <li key={i} className="relative mb-10 pl-8 last:mb-0">
                <span className="absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white" />
                <p className="mb-1 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  {m.year}
                </p>
                <h3 className="mb-1.5 font-serif text-2xl font-semibold italic text-primary">
                  {m.title}
                </h3>
                <p className="text-[15px] leading-[1.75] text-text-secondary">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              The Team
              <span className="h-0.5 w-7 rounded-full bg-accent" />
            </div>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
              Meet the team
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] italic text-text-secondary">
              A small team sourcing, packing, and writing about every bar
              of natural soap and bottle of organic skincare we stock.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person, i) => (
              <div key={i} className="overflow-hidden rounded-2xl bg-cream">
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-surface-sage/60">
                  {/* Placeholder portrait icon — replaced when real photo provided. */}
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-primary/15"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 font-heading text-[9.5px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                    Photo to come
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold italic text-primary">
                    {person.name}
                  </h3>
                  <p className="mt-1 font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] text-accent">
                    {person.role}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.75] text-text-secondary">
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications strip — only render when client confirms certifications */}
      <section className="border-y border-surface-sage bg-surface-sage/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">
            Certifications &amp; Memberships
          </p>
          <p className="font-serif text-lg italic text-primary/60">
            Our suppliers hold Leaping Bunny (cruelty-free), USDA Organic,
            and 1% for the Planet memberships where applicable. Individual
            certifications are listed on each product page.
          </p>
        </div>
      </section>

      {/* Impact stats — placeholder until real numbers provided */}
      <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Our Impact
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-white sm:text-4xl lg:text-5xl">
            The numbers behind the swap
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[14px] italic text-white/55">
            Tracked across every order we&apos;ve shipped since 2019.
            Updated quarterly from our fulfillment and supplier data.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: "48,000+", label: "Plastic-free orders shipped" },
              { value: "120,000+", label: "Plastic bottles avoided" },
              { value: "28", label: "Independent US makers stocked" },
              { value: "100%", label: "Compostable packaging" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-heading text-3xl font-extrabold text-accent sm:text-4xl lg:text-5xl">
                  {s.value}
                </span>
                <span className="mt-2 font-heading text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl">
            Ready to make the swap?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            Browse our plastic-free product collection.
          </p>
          <Link
            href="/collections"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-9 py-4 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
          >
            Shop the Store
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
        </div>
      </section>
    </div>
  );
}
