/**
 * Header — top navigation bar rendered on every page via the root layout.
 * Premium sustainable brand aesthetic with deep green primary, accent
 * green, and Montserrat typography.
 *
 * Server component — categories are fetched here and passed to the
 * client-side ShopDropdown and MobileMenu so they don't each refetch.
 */
import Link from "next/link";
import Image from "next/image";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AuthNav } from "@/components/layout/auth-nav";
import { CartIcon } from "@/components/cart/cart-icon";
import { ShopDropdown } from "@/components/layout/shop-dropdown";
import { TOP_NAV } from "@/components/layout/nav-data";
import { getCategories } from "@/lib/medusa";
import type { ProductCategory } from "@/lib/types";

export async function Header() {
  /* Fetch categories server-side so the mega-dropdown ships with data
     baked in. If Medusa is unreachable the dropdown gracefully shows
     no categories — TOP_NAV links still resolve. */
  let categories: ProductCategory[] = [];
  try {
    const result = (await getCategories()) as ProductCategory[];
    categories = result.filter((c) => c.is_active);
  } catch {
    /* Backend unavailable — render with no categories, ISR will retry. */
  }

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />

      <div className="border-b border-primary/6 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Mobile menu toggle (left side on mobile) */}
          <MobileMenu topNav={TOP_NAV} categories={categories} />

          {/* Brand logo */}
          <Link
            href="/"
            className="flex items-center transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src="/images/logo.webp"
              alt="The Zero Waste Store"
              width={200}
              height={120}
              className="h-11 w-auto py-1 sm:h-12 lg:h-14"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {TOP_NAV.map((item) =>
              item.hasDropdown ? (
                <ShopDropdown key={item.label} categories={categories} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right-side actions: auth + cart */}
          <div className="flex items-center gap-5">
            <AuthNav />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
