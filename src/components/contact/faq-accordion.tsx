/**
 * FaqAccordion — collapsible FAQ list. Each item toggles independently;
 * one click opens, another closes. Designed to match the site's editorial
 * aesthetic (large serif italic headings, accent-green underline).
 *
 * Client component because it manages per-item open state.
 *
 * @param items - array of `{ q, a }` objects rendered as accordion rows
 */
"use client";

import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-surface-sage">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-accent sm:py-6"
            >
              <span
                className={`font-serif text-lg font-semibold italic leading-snug transition-colors duration-200 sm:text-xl ${
                  isOpen ? "text-accent" : "text-primary"
                }`}
              >
                {item.q}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-accent bg-accent text-white"
                    : "border-surface-sage text-text-secondary"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl text-[15px] leading-[1.85] text-text-secondary">
                  {item.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
