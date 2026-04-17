// Route: /privacy
// Privacy policy page. Static long-form content. Plain-language overview
// of what we collect, how we use it, and your rights.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What information we collect, how we use it, and how to exercise your rights as a customer.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            Legal
          </p>
          <h1 className="font-serif text-4xl font-semibold italic leading-tight text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            Plain-language overview of what we collect, why, and how to opt
            out. Last updated April 2026.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-10 text-text-secondary">
          <Block title="The short version">
            <p>
              We collect the information you give us when you place an order
              or sign up for our newsletter. We use it to fulfill your
              order, send you updates you opted into, and improve the store.
              We never sell your data. You can request deletion at any time.
            </p>
          </Block>

          <Block title="What we collect">
            <p>
              <strong className="text-primary">Account info:</strong> name,
              email, password (hashed), saved addresses, and order history.
            </p>
            <p>
              <strong className="text-primary">Order info:</strong> shipping
              and billing address, payment confirmation (we do not store
              full card numbers &mdash; that&apos;s handled by our payment
              processor), and order contents.
            </p>
            <p>
              <strong className="text-primary">Browsing data:</strong>{" "}
              anonymous analytics about which pages you visit and how you
              found us. We use this to improve the store, not to follow you
              around the internet.
            </p>
          </Block>

          <Block title="What we don't collect">
            <ul className="list-disc space-y-2 pl-6">
              <li>Full credit card numbers (handled by Stripe)</li>
              <li>Your data for advertising on other sites</li>
              <li>Anything we sell to third parties &mdash; ever</li>
            </ul>
          </Block>

          <Block title="How we use your data">
            <p>
              To process and ship your orders, send order confirmations and
              shipping updates, respond to your customer service inquiries,
              send marketing emails (only if you opt in), and improve our
              products and store experience.
            </p>
          </Block>

          <Block title="Cookies">
            <p>
              We use cookies to keep you signed in, remember items in your
              cart, and measure anonymous site usage. You can disable
              cookies in your browser settings &mdash; the store will still
              work, but you&apos;ll be signed out and your cart won&apos;t
              persist.
            </p>
          </Block>

          <Block title="Your rights">
            <p>
              You can request a copy of all data we have about you, ask us
              to correct anything inaccurate, or ask us to delete your
              account entirely. Email{" "}
              <a
                href="mailto:hello@zerowastesimplified.com"
                className="text-accent underline transition-colors hover:text-accent-hover"
              >
                hello@zerowastesimplified.com
              </a>{" "}
              and we&apos;ll respond within 14 days.
            </p>
          </Block>

          <Block title="Third-party services">
            <p>
              We work with a small number of trusted vendors: Stripe (payment
              processing), Resend (transactional email), Plausible
              (privacy-friendly analytics), and AWS (hosting). Each has its
              own privacy policy and meets industry security standards.
            </p>
          </Block>

          <Block title="Updates to this policy">
            <p>
              If we make material changes to this policy, we&apos;ll email
              everyone with an active account at least 30 days before the
              changes take effect.
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
