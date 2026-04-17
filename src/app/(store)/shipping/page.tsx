// Route: /shipping
// Shipping & Returns policy page. Static long-form content.
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "How we ship plastic-free, how long delivery takes, and our 30-day return policy.",
};

export default function ShippingPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Image
          src="/images/heroes/shipping-hero.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/60 to-primary" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            The Details
          </p>
          <h1 className="font-serif text-4xl font-semibold italic leading-tight text-white sm:text-5xl lg:text-6xl">
            Shipping &amp; Returns
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Plastic-free shipping, 3&ndash;7 day delivery, and a 30-day
            return policy with one exception.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-10 text-text-secondary">
          <Block title="Shipping rates">
            <p>
              Free standard shipping on US orders over $40. Below that, flat
              $5 ground shipping anywhere in the continental US. Express
              (2-day) and overnight options are calculated at checkout.
            </p>
          </Block>

          <Block title="When orders ship">
            <p>
              Orders placed before 1pm ET on a business day ship the same
              day from our Brooklyn warehouse. Orders placed after that ship
              the following business day. We don&apos;t ship on weekends or
              federal holidays.
            </p>
          </Block>

          <Block title="Plastic-free packaging">
            <p>
              Every part of your order &mdash; the outer mailer, inner
              padding, tape, and packing slip &mdash; is paper, kraft, or
              compostable. The whole box can go in your home compost or
              curbside paper recycling.
            </p>
            <p>
              If you ever receive an order with even a single piece of
              plastic, email us. We want to know.
            </p>
          </Block>

          <Block title="International shipping">
            <p>
              We currently ship to Canada, the UK, the EU, and Australia.
              Rates are calculated at checkout based on weight and
              destination. International orders typically arrive in 7&ndash;14
              business days.
            </p>
            <p>
              Customs and duties for international orders are the
              recipient&apos;s responsibility.
            </p>
          </Block>

          <Block title="Returns">
            <p>
              Unopened products can be returned within 30 days of delivery
              for a full refund (less original shipping). Email us at
              hello@zerowastesimplified.com to start a return; we&apos;ll
              send a prepaid label.
            </p>
            <p>
              <strong className="text-primary">The exception:</strong>{" "}
              opened personal-care products (soap, shampoo, deodorant, etc.)
              can&apos;t be returned for hygiene reasons. If something
              isn&apos;t working for you, reach out anyway &mdash; we want
              every order to land well, and we&apos;ll work something out.
            </p>
          </Block>

          <Block title="Refunds">
            <p>
              Once we receive a return at our warehouse, refunds process to
              your original payment method within 5&ndash;7 business days.
              You&apos;ll get an email confirmation when the refund is
              issued.
            </p>
          </Block>

          <Block title="Damaged or missing items">
            <p>
              If your order arrives damaged or anything is missing, send us
              a photo within 7 days of delivery and we&apos;ll replace it
              free of charge &mdash; no return required.
            </p>
          </Block>
        </div>
      </section>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-3 font-serif text-2xl font-semibold italic leading-tight text-primary sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-3 text-[16px] leading-[1.8]">{children}</div>
    </div>
  );
}
