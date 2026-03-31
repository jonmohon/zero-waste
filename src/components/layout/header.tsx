/**
 * Header — top navigation bar rendered on every page via the root layout.
 * Contains the brand logo/name, main nav links, and a cart link.
 *
 * This is a server component — no client JS. The mobile menu (future)
 * should be a separate "use client" component composed inside this one.
 */
import Link from "next/link";

/** Primary navigation links displayed in the header */
const NAV_LINKS = [
  { label: "Shop", href: "/collections" },
  { label: "About", href: "/about" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold tracking-tight text-brand-800">
          Zero Waste
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart link — item count will be added when cart context is wired */}
          <Link
            href="/cart"
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
