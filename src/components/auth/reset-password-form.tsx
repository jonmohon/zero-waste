/**
 * ResetPasswordForm — sends a password reset email to the customer.
 * Used in: /reset-password page.
 *
 * Shows a success message after submission regardless of whether the
 * email exists, to prevent email enumeration.
 */
"use client";

import { useState, type FormEvent } from "react";
import { requestPasswordReset } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset(email);
    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Check Your Email</h1>
        <p className="text-neutral-600">
          If an account exists for {email}, we sent a password reset link.
        </p>
        <Link href="/signin" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-5">
      <h1 className="text-2xl font-bold text-neutral-900">Reset Password</h1>
      <p className="text-sm text-neutral-600">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>
      <Input
        id="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
      <p className="text-center text-sm text-neutral-600">
        <Link href="/signin" className="font-medium text-brand-600 hover:text-brand-700">
          Back to Sign In
        </Link>
      </p>
    </form>
  );
}
