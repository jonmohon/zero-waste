// Route: /reset-password
// Password reset request page. Renders the ResetPasswordForm client component.

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = { title: "Reset Password" };

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ResetPasswordForm />
    </main>
  );
}
