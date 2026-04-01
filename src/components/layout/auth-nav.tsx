/**
 * AuthNav — header authentication link that shows Sign In or Account icon.
 * Used in: Header right-side actions area.
 *
 * Renders a user icon linking to /account when authenticated, or
 * a "Sign In" text link to /signin when not. Styled to match header aesthetic.
 */
"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";

export function AuthNav() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) {
    return (
      <Link
        href="/account"
        className="group flex items-center text-text-secondary transition-colors duration-200 hover:text-primary"
        aria-label="My account"
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
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href="/signin"
      className="hidden font-heading text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary transition-colors duration-200 hover:text-primary sm:inline-flex"
    >
      Sign In
    </Link>
  );
}
