// Route: /contact
// Contact page — info cards, contact form, hours, and FAQ accordion.
// Static content; the form is a client component that does not yet hit a
// backend (visual-only submit). Statically generated at build time.
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { FaqAccordion, type FaqItem } from "@/components/contact/faq-accordion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach our team for customer care, press, or wholesale inquiries. We respond within 24 hours, every weekday.",
};

const CONTACT_CARDS = [
  {
    eyebrow: "Customer Care",
    title: "We&apos;re here to help",
    body: "Order issues, product questions, or just want to chat about a swap.",
    email: "hello@zerowastesimplified.com",
  },
  {
    eyebrow: "Press",
    title: "Media &amp; partnerships",
    body: "For press inquiries, interviews, and brand collaborations.",
    email: "press@zerowastesimplified.com",
  },
  {
    eyebrow: "Wholesale",
    title: "Stock our products",
    body: "Independent retailer? We work with select stockists nationwide.",
    email: "wholesale@zerowastesimplified.com",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "How long does shipping take?",
    a: "Standard orders ship within 1-2 business days and arrive in 3-7 business days nationwide. We offer free shipping on orders over $40. International rates are calculated at checkout.",
  },
  {
    q: "Do you really ship plastic-free?",
    a: "Yes. Every part of your order — outer mailer, inner padding, tape, packing slip — is paper, kraft, or compostable. The whole box can go in your home compost or curbside paper recycling. If you ever receive an order with even a single piece of plastic, email us. We want to know.",
  },
  {
    q: "What's your return policy?",
    a: "Unopened products can be returned within 30 days for a full refund. Opened personal-care products (soap, shampoo, deodorant, etc.) can't be returned for hygiene reasons, but if something isn't working for you, reach out anyway — we'll make it right.",
  },
  {
    q: "Are your products vegan?",
    a: "Most are, but not all — some bar soaps and lip balms contain beeswax or honey. Every product page lists ingredients, and vegan products are tagged for easy filtering.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to Canada, the UK, the EU, and Australia. Rates are calculated at checkout based on weight and destination. International orders typically arrive in 7-14 business days. Customs and duties are the recipient's responsibility.",
  },
  {
    q: "Can I refill products?",
    a: "Many of our partner makers offer refill programs through their own sites — we link to those on each product page when available.",
  },
  {
    q: "How do I know products are actually sustainable?",
    a: "We screen every product for plastic packaging, ingredient sourcing, and supplier practices before listing it. Our criteria are published on our About page. We don't take pay-to-play listings from brands.",
  },
  {
    q: "Do you offer gift cards or gift wrapping?",
    a: "Digital gift cards are available in $25 / $50 / $100 / $200 denominations. Gift wrapping is included free with any order — leave a note at checkout if it's a gift and we'll add a hand-stamped kraft tag.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-primary px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-accent" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-white/85">
              Get in Touch
            </span>
          </div>
          <h1 className="font-serif text-5xl font-semibold italic leading-[1.05] text-white drop-shadow-md sm:text-6xl lg:text-7xl">
            Let&apos;s talk.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            We respond within 24 hours, every weekday. The fastest way to
            reach us is the form below or any of the addresses on this page.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT_CARDS.map((c) => (
            <div
              key={c.eyebrow}
              className="rounded-2xl bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
            >
              <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                {c.eyebrow}
              </p>
              <h2
                className="font-serif text-2xl font-semibold italic leading-tight text-primary"
                dangerouslySetInnerHTML={{ __html: c.title }}
              />
              <p className="mt-3 text-[14.5px] leading-[1.7] text-text-secondary">
                {c.body}
              </p>
              <a
                href={`mailto:${c.email}`}
                className="mt-5 inline-flex items-center gap-2 font-heading text-[12px] font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:text-accent"
              >
                {c.email}
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
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Form + meta */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Form */}
          <div id="contact-form" className="scroll-mt-24">
            <div className="mb-3 flex items-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              Send Us a Note
            </div>
            <h2 className="mb-8 font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl">
              Tell us what&apos;s on your mind
            </h2>
            <ContactForm />
          </div>

          {/* Meta sidebar */}
          <aside className="lg:pt-12">
            <div className="rounded-2xl bg-surface-sage/40 p-7">
              <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.06em] text-primary">
                Hours &amp; Response
              </h3>
              <ul className="space-y-3 text-[14px] text-text-secondary">
                <li className="flex justify-between">
                  <span>Monday &ndash; Friday</span>
                  <span className="font-heading font-semibold text-primary">
                    9a &ndash; 6p ET
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-heading font-semibold text-primary">
                    10a &ndash; 2p ET
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-text-secondary/60">Closed</span>
                </li>
              </ul>
              <div className="mt-5 border-t border-white/40 pt-5 text-[13px] leading-[1.7] text-text-secondary">
                Average reply time on weekdays:{" "}
                <span className="font-heading font-bold text-primary">
                  4 hours
                </span>
                . Worst case, you&apos;ll hear from us within 24.
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-primary p-7 text-white">
              <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.06em] text-accent">
                Online Store
              </h3>
              <p className="font-serif text-xl italic leading-tight">
                Zero Waste Simplified
              </p>
              <p className="mt-2 text-[14px] leading-[1.75] text-white/65">
                We&apos;re an online-only store, shipping plastic-free
                across the US and select international destinations.
              </p>
              <p className="mt-4 text-[12px] leading-[1.6] text-white/40">
                The fastest way to reach us is the form on this page or any
                of the addresses above.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              <span className="h-0.5 w-7 rounded-full bg-accent" />
              Common Questions
              <span className="h-0.5 w-7 rounded-full bg-accent" />
            </div>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
              Frequently Asked
            </h2>
          </div>
          <FaqAccordion items={FAQS} />

          <div className="mt-12 rounded-2xl bg-surface-sage/40 p-8 text-center">
            <p className="font-serif text-xl italic text-primary">
              Didn&apos;t find what you&apos;re looking for?
            </p>
            <p className="mt-2 text-[14px] text-text-secondary">
              Drop us a note &mdash; real humans answer every email.
            </p>
            <a
              href="#contact-form"
              className="mt-5 inline-flex items-center gap-2 font-heading text-[12px] font-bold uppercase tracking-[0.08em] text-accent hover:text-accent-hover"
            >
              Back to the form
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
