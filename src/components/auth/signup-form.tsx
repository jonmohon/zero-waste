/**
 * SignupForm — customer registration form with email, password, and confirm.
 * Used in: /signup page.
 *
 * On success, redirects to the URL passed via `?redirect=...` if it's a
 * safe same-origin path, otherwise to /account. This lets users land
 * back on the product they were trying to add to cart.
 */
"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** See SigninForm.safeRedirect — same open-redirect guard. */
function safeRedirect(raw: string | null): string {
  if (!raw) return "/account";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/account";
  return raw;
}

export function SignupForm() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = safeRedirect(searchParams.get("redirect"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await register(email, password);
    if (result.success) {
      router.replace(redirectTarget);
    } else {
      setError(result.error || "Registration failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-primary">
          Create Account
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Join the zero-waste community today.
        </p>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <Input
        id="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        id="confirm-password"
        label="Confirm Password"
        type="password"
        required
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          href={
            redirectTarget === "/account"
              ? "/signin"
              : `/signin?redirect=${encodeURIComponent(redirectTarget)}`
          }
          className="font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
