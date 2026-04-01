/**
 * SigninForm — email/password login form.
 * Used in: /signin page.
 *
 * On successful login, redirects the customer to /account.
 * Displays inline error messages on failure.
 * Styled with refined typography and spacing for a premium feel.
 */
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SigninForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      router.replace("/account");
    } else {
      setError(result.error || "Invalid email or password");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-tight text-primary">
          Sign In
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Welcome back. Enter your credentials below.
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
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="flex flex-col gap-2.5 text-center text-sm text-text-secondary">
        <Link
          href="/reset-password"
          className="transition-colors duration-200 hover:text-accent"
        >
          Forgot your password?
        </Link>
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            Create one
          </Link>
        </p>
      </div>
    </form>
  );
}
