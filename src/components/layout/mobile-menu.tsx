/**
 * MobileMenu — slide-out navigation drawer for small screens. Top-level
 * items are listed first; the "Shop" item expands inline into an
 * accordion that lists all categories.
 *
 * Client component because it manages open/close + accordion state.
 *
 * @param topNav - array of top-level nav items (Shop ▾ / About / Blog / Contact)
 * @param categories - active product categories used inside the Shop accordion
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_ORDER } from "@/components/layout/nav-data";
import type { ProductCategory } from "@/lib/types";

interface TopNavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface MobileMenuProps {
  topNav: ReadonlyArray<TopNavItem>;
  categories: ProductCategory[];
}

export function MobileMenu({ topNav, categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  const orderedCategories = CATEGORY_ORDER.map((handle) =>
    categories.find((c) => c.handle === handle)
  ).filter((c): c is ProductCategory => Boolean(c));

  const close = () => {
    setIsOpen(false);
    setShopOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-2 text-primary transition-colors duration-200 hover:text-accent lg:hidden"
        aria-label="Open menu"
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          <div className="absolute inset-y-0 left-0 flex w-[300px] flex-col bg-white shadow-2xl">
            {/* Header with close button */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
              <span className="font-serif text-lg font-bold italic text-primary">
                Menu
              </span>
              <button
                onClick={close}
                className="flex items-center justify-center rounded-lg p-1.5 text-text-secondary transition-colors duration-200 hover:bg-surface hover:text-primary"
                aria-label="Close menu"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
              {topNav.map((item) =>
                item.hasDropdown ? (
                  <div key={item.label} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setShopOpen((v) => !v)}
                      className="flex items-center justify-between rounded-lg px-4 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.06em] text-primary transition-all duration-200 hover:bg-surface"
                    >
                      <span>Shop</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`transition-transform duration-200 ${
                          shopOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {shopOpen && (
                      <div className="ml-2 mt-1 flex flex-col border-l border-surface-sage pl-3">
                        <Link
                          href="/collections"
                          onClick={close}
                          className="rounded-lg px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-accent transition-colors hover:bg-surface-sage/40"
                        >
                          All Products
                        </Link>
                        {orderedCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/collections/${cat.handle}`}
                            onClick={close}
                            className="rounded-lg px-3 py-2 text-[12.5px] text-text-secondary transition-colors hover:bg-surface-sage/40 hover:text-primary"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="rounded-lg px-4 py-3 font-heading text-[13px] font-semibold uppercase tracking-[0.06em] text-primary transition-all duration-200 hover:bg-surface hover:text-accent"
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Account link, separated */}
              <div className="my-3 h-px bg-neutral-100" />
              <Link
                href="/account"
                onClick={close}
                className="rounded-lg px-4 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.06em] text-text-secondary transition-all duration-200 hover:bg-surface hover:text-primary"
              >
                My Account
              </Link>
            </nav>

            {/* Footer accent */}
            <div className="border-t border-neutral-100 px-6 py-5">
              <p className="text-[11px] text-text-secondary">
                Sustainable products for everyday living.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
