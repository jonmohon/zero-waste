// Route: /account/*
// Account section layout with AuthGuard protection and sidebar navigation.
// Redirects unauthenticated users to /signin.
// Premium layout with refined sidebar styling.
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
      <div className="bg-surface min-h-[60vh]">
        {/* Account header */}
        <div className="border-b border-neutral-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-primary">
              My Account
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
            {/* Sidebar navigation */}
            <nav className="mb-8 flex gap-2 lg:mb-0 lg:flex-col lg:gap-1">
              {ACCOUNT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-2.5 font-heading text-[12px] font-semibold text-text-secondary transition-all duration-200 hover:bg-white hover:text-primary hover:shadow-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Main content area */}
            <main className="min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
