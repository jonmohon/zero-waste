/**
 * NewsletterSignup — email subscription form displayed on the homepage.
 * Collects email addresses for marketing updates.
 * Currently a visual-only form — backend integration to be added.
 * Premium styling with brand colors and refined typography.
 *
 * Client component because it handles form state and submission.
 */
"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /** Handle form submission — currently just shows a success message */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="bg-gradient-to-br from-primary via-primary-light to-primary py-16 lg:py-20">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="mb-5 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          <span className="h-0.5 w-7 rounded-full bg-accent/50" />
          Stay in the Loop
          <span className="h-0.5 w-7 rounded-full bg-accent/50" />
        </div>

        <h2 className="font-serif text-2xl font-bold italic text-white sm:text-3xl lg:text-4xl">
          Subscribe for Eco Updates
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/55">
          Join our community for eco tips, new arrivals, and exclusive discounts.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl bg-white/10 px-6 py-4 backdrop-blur-sm">
            <p className="font-heading text-sm font-bold text-white">
              Thank you for subscribing!
            </p>
            <p className="mt-1 text-xs text-white/60">
              You&apos;ll receive eco tips and offers in your inbox soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border-0 bg-white px-5 py-3.5 text-sm text-primary placeholder-neutral-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-accent/30 sm:rounded-r-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-accent px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.08em] text-white shadow-lg transition-all duration-200 hover:bg-accent-hover sm:rounded-l-none"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
