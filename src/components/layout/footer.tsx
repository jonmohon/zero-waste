/**
 * Footer — site-wide footer rendered on every page via the root layout.
 * Contains brand tagline, navigation links, and copyright.
 *
 * Server component — no client JS needed.
 */
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Shop", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand + tagline */}
          <div>
            <p className="text-lg font-bold text-brand-800">Zero Waste</p>
            <p className="mt-1 text-sm text-neutral-500">
              Sustainable products for everyday living.
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <p className="mt-8 text-center text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} Zero Waste. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
