/**
 * Header — top navigation bar rendered on every page via the root layout.
 * Matches the original thezerowastestore.com design with:
 * - Announcement bar (promo banner)
 * - Script-style logo
 * - Desktop nav with category links
 * - Mobile hamburger menu
 * - Cart/search icons
 *
 * Server component — the mobile menu is a separate client component
 * composed inside this one.
 */
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AuthNav } from "@/components/layout/auth-nav";

/** Primary navigation links matching the original store's nav categories */
const NAV_LINKS = [
  { label: "All Products", href: "/collections" },
  { label: "Beauty", href: "/collections/beauty" },
  { label: "Cleaning Products", href: "/collections/cleaning-products" },
  { label: "Dental Care", href: "/collections/dental-care" },
  { label: "Gifts & Kits", href: "/collections/gifts-&-kits" },
  { label: "Kitchen", href: "/collections/kitchen" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />

      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Mobile menu toggle (left side on mobile) */}
          <MobileMenu links={[...NAV_LINKS, { label: "My Account", href: "/account" }]} />

          {/* Brand logo — original store logo image */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.webp"
              alt="The Zero Waste Store"
              width={160}
              height={160}
              className="h-12 w-auto sm:h-14 lg:h-16"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium uppercase tracking-wider text-neutral-600 transition-colors hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right-side actions: auth + cart */}
          <div className="flex items-center gap-4">
            <AuthNav />
            <Link
              href="/cart"
              className="flex items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-900"
              aria-label="Shopping cart"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
