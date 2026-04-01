// Route: /signup
// Customer registration page. Renders the SignupForm client component
// inside a centered container.

import { SignupForm } from "@/components/auth/signup-form";

export const metadata = { title: "Create Account" };

export default function SignupPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SignupForm />
    </main>
  );
}
