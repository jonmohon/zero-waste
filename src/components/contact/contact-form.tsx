/**
 * ContactForm — visual-only contact form. Submits to nothing today; on
 * submit it shows an inline success message and clears the form. When we
 * wire up Resend (or a server action), the `onSubmit` handler is the
 * single integration point — the markup stays untouched.
 *
 * Client component because it manages form state + submit feedback.
 */
"use client";

import { useState, type FormEvent } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">(
    "idle"
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    /* Visual-only submit — replace with a server action / Resend call when
       email is wired up. */
    setTimeout(() => {
      setStatus("sent");
      setForm(EMPTY);
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          required
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        value={form.subject}
        onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
        required
      />

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] text-text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[14.5px] text-primary placeholder:text-neutral-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-9 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
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
        </button>

        {status === "sent" && (
          <p className="inline-flex items-center gap-2 font-heading text-[12px] font-bold uppercase tracking-[0.08em] text-accent">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            Thanks &mdash; we&apos;ll be in touch within 24 hours.
          </p>
        )}
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-heading text-[10.5px] font-bold uppercase tracking-[0.14em] text-text-secondary"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[14.5px] text-primary placeholder:text-neutral-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
