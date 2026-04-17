/**
 * ReadingProgress — fixed-position bar at the top of the viewport that
 * fills as the reader scrolls through an article. Subtle accent-green
 * line, four pixels tall, sits below the sticky header.
 *
 * Client component because it reads scroll position via `window`.
 */
"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total <= 0 ? 0 : (window.scrollY / total) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div
        className="h-full bg-gradient-to-r from-accent via-accent to-blue transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
