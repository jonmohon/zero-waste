/**
 * NewsletterSignup — email subscription form displayed on the homepage.
 * Collects email addresses for marketing updates.
 * Currently a visual-only form — backend integration to be added.
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
    <section className="bg-brand-500 py-14">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Subscribe to get our latest updates
        </h2>
        <p className="mt-3 text-sm text-white/80">
          Join our community for eco tips, new arrivals, and exclusive discounts.
        </p>

        {submitted ? (
          <p className="mt-6 text-lg font-medium text-white">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border-0 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white sm:rounded-r-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:rounded-l-none"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
