/**
 * Header — top navigation bar rendered on every page via the root layout.
 * Redesigned to match a premium sustainable brand aesthetic with
 * deep green primary, accent green, and Montserrat typography.
 *
 * Server component — the mobile menu and auth nav are separate client
 * components composed inside this one.
 */
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AuthNav } from "@/components/layout/auth-nav";

/** Primary navigation links matching the store's categories */
const NAV_LINKS = [
  { label: "All Products", href: "/collections" },
  { label: "Bar Soap", href: "/collections/bar-soap" },
  { label: "Hair Care", href: "/collections/hair-care" },
  { label: "Skin Care", href: "/collections/skin-care" },
  { label: "Oral Care", href: "/collections/oral-care" },
  { label: "Food Wraps", href: "/collections/food-wraps" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />

      <div className="border-b border-primary/6 bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.05)] backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          {/* Mobile menu toggle (left side on mobile) */}
          <MobileMenu
            links={[
              ...NAV_LINKS,
              { label: "My Account", href: "/account" },
            ]}
          />

          {/* Brand logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src="/images/logo.webp"
              alt="The Zero Waste Store"
              width={160}
              height={160}
              className="h-11 w-auto sm:h-13 lg:h-[60px]"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right-side actions: auth + cart */}
          <div className="flex items-center gap-5">
            <AuthNav />
            <Link
              href="/cart"
              className="group relative flex items-center gap-1 text-text-secondary transition-colors duration-200 hover:text-primary"
              aria-label="Shopping cart"
            >
              <svg
                className="h-5 w-5 transition-transform duration-200 group-hover:scale-105"
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
