// Route: /account/*
// Account section layout with AuthGuard protection and sidebar navigation.
// Redirects unauthenticated users to /signin.
// Dynamic rendering — cannot be prerendered because AuthGuard requires client auth state.

import { AuthGuard } from "@/components/auth/auth-guard";
import Link from "next/link";

const ACCOUNT_LINKS = [
  { label: "Profile", href: "/account" },
  { label: "Addresses", href: "/account/addresses" },
] as const;

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
          {/* Sidebar — hidden on mobile, visible on desktop */}
          <nav className="mb-8 flex gap-4 border-b border-neutral-200 pb-4 lg:mb-0 lg:flex-col lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
            {ACCOUNT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Main content area */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
