// Route: /signup
// Customer registration page. Renders the SignupForm client component
// in a centered layout with brand messaging on the side.

import { SignupForm } from "@/components/auth/signup-form";

export const metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-surface px-4 py-16">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:grid-cols-[1fr_1fr]">
        {/* Brand panel — hidden on mobile */}
        <div className="hidden flex-col justify-center bg-primary p-12 lg:flex">
          <div className="mb-6 h-[3px] w-10 rounded-full bg-accent" />
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-white">
            Join the
            <br />
            zero-waste movement.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Create your account to start shopping sustainably. Track orders,
            save favorites, and get exclusive eco-tips.
          </p>
          <div className="mt-8 flex items-center gap-3 text-[11px] text-white/40">
            <span>&#127807;</span>
            <span>Every order plants a tree</span>
          </div>
        </div>

        {/* Form panel */}
        <div className="p-8 sm:p-10 lg:p-12">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
