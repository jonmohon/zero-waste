// Route: /signin
// Customer login page. Renders the SigninForm client component
// inside a centered container.

import { SigninForm } from "@/components/auth/signin-form";

export const metadata = { title: "Sign In" };

export default function SigninPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SigninForm />
    </main>
  );
}
