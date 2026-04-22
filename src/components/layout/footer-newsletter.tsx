/**
 * FooterNewsletter — inline email capture inside the footer's "Stay Connected"
 * column. Prevents default submit, shows a confirmation once submitted.
 *
 * Client component because it handles form state and the submit handler.
 * Kept separate from NewsletterSignup (the full section variant) so the
 * footer can stay a server component.
 */
"use client";

import { useState } from "react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-white">
        Thanks, you're on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex overflow-hidden rounded-xl border border-white/10 bg-white/10"
    >
      <input
        type="email"
        required
        placeholder="Your email"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-accent px-5 py-3 font-heading text-[10px] font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-accent-hover"
      >
        Join
      </button>
    </form>
  );
}
