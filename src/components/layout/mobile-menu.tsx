/**
 * MobileMenu — slide-out navigation drawer for small screens.
 * Uses a dialog-style overlay with smooth transitions.
 *
 * This is a client component because it manages open/close state.
 *
 * @param links - array of navigation link objects to render
 */
"use client";

import { useState } from "react";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  links: NavLink[];
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
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

      {/* Overlay + drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl">
            {/* Header with close button */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
              <span className="font-serif text-lg font-bold text-primary">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
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
            <nav className="flex flex-col px-3 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 font-heading text-[13px] font-semibold text-primary transition-all duration-200 hover:bg-surface hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Footer accent */}
            <div className="absolute inset-x-0 bottom-0 border-t border-neutral-100 px-6 py-5">
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
