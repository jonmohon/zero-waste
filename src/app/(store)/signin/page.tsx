// Route: /signin
// Customer login page. Renders the SigninForm client component
// in a centered layout with brand messaging on the side.
//
// SigninForm reads `?redirect=` via useSearchParams, which Next.js
// requires to be wrapped in a Suspense boundary so the rest of the
// page can still be statically prerendered.

import { Suspense } from "react";
import { SigninForm } from "@/components/auth/signin-form";

export const metadata = { title: "Sign In" };

export default function SigninPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-surface px-4 py-16">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:grid-cols-[1fr_1fr]">
        {/* Brand panel — hidden on mobile */}
        <div className="hidden flex-col justify-center bg-primary p-12 lg:flex">
          <div className="mb-6 h-[3px] w-10 rounded-full bg-accent" />
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-white">
            Welcome back to
            <br />
            sustainable living.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Sign in to access your orders, saved addresses, and exclusive
            member offers.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[11px] text-white/40">
            <span className="text-accent">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span>Trusted by 500,000+ customers</span>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-8 sm:p-10 lg:p-12">
          <Suspense fallback={<SigninFormFallback />}>
            <SigninForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton shown while the SigninForm is suspended on first render.
 * Matches the form's overall shape so the page doesn't shift when the
 * client component hydrates.
 */
function SigninFormFallback() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-md animate-pulse space-y-6"
    >
      <div className="space-y-2">
        <div className="h-7 w-32 rounded bg-surface-sage/60" />
        <div className="h-4 w-56 rounded bg-surface-sage/40" />
      </div>
      <div className="h-12 rounded-xl bg-surface-sage/40" />
      <div className="h-12 rounded-xl bg-surface-sage/40" />
      <div className="h-12 rounded-xl bg-surface-sage/60" />
    </div>
  );
}
