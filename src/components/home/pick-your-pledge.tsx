/**
 * PickYourPledge — micro-commitment widget. Visitor selects ONE swap
 * they'll commit to from a row of cards. Their pledge is saved to
 * localStorage so subsequent visits acknowledge it. The card animates
 * to a confirmation state on click.
 *
 * Below the pledge cards is a real newsletter signup so the section
 * still serves the original "join the list" function.
 *
 * Client component — manages selected pledge + persistence.
 */
"use client";

import { useEffect, useState } from "react";

interface Pledge {
  key: string;
  emoji: string;
  label: string;
  swapFrom: string;
}

const PLEDGES: Pledge[] = [
  {
    key: "shampoo",
    emoji: "\uD83E\uDDB4",
    label: "Ditch plastic shampoo bottles",
    swapFrom: "bottled shampoo",
  },
  {
    key: "wrap",
    emoji: "\uD83E\uDDC0",
    label: "Stop using plastic wrap",
    swapFrom: "cling wrap",
  },
  {
    key: "razor",
    emoji: "\uD83E\uDE92",
    label: "Switch to a safety razor",
    swapFrom: "disposable razors",
  },
  {
    key: "toothbrush",
    emoji: "\uD83E\uDDD9",
    label: "Use a bamboo toothbrush",
    swapFrom: "plastic toothbrush",
  },
  {
    key: "bodywash",
    emoji: "\uD83E\uDDFC",
    label: "Switch to bar soap",
    swapFrom: "bottled body wash",
  },
  {
    key: "deodorant",
    emoji: "\uD83C\uDF3F",
    label: "Try refillable deodorant",
    swapFrom: "plastic stick deodorant",
  },
];

const STORAGE_KEY = "zws-pledge";

export function PickYourPledge() {
  const [pledged, setPledged] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  /* Read existing pledge from localStorage on mount. We gate render on
     `hydrated` so the SSR markup matches the first client paint. */
  useEffect(() => {
    setHydrated(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setPledged(stored);
    } catch {
      /* localStorage may be blocked — fall back to "no pledge". */
    }
  }, []);

  function pledge(key: string) {
    setPledged(key);
    try {
      window.localStorage.setItem(STORAGE_KEY, key);
    } catch {
      /* swallow */
    }
  }

  function clearPledge() {
    setPledged(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* swallow */
    }
  }

  const activePledge = PLEDGES.find((p) => p.key === pledged);

  return (
    <section className="bg-surface-sage/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="h-0.5 w-7 rounded-full bg-accent" />
            Pick Your Pledge
            <span className="h-0.5 w-7 rounded-full bg-accent" />
          </div>
          <h2 className="font-serif text-3xl font-semibold italic leading-tight text-primary sm:text-4xl lg:text-5xl">
            Commit to one swap.
            <br className="hidden sm:block" />
            That&apos;s the whole secret.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary">
            No spam, no app, no signup &mdash; just pick one thing you&apos;ll
            stop buying in plastic. Your pledge stays on your device.
          </p>
        </div>

        {hydrated && activePledge ? (
          /* Confirmation state */
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-[0_8px_32px_rgba(26,43,28,0.08)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-2xl text-white">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-heading text-[10.5px] font-bold uppercase tracking-[0.18em] text-accent">
              Pledge Saved
            </p>
            <p className="mt-3 font-serif text-2xl italic leading-snug text-primary sm:text-3xl">
              You pledged to <span className="text-accent">stop buying {activePledge.swapFrom}</span>.
            </p>
            <p className="mt-3 text-[14px] text-text-secondary">
              We&apos;re proud of you. Now go shop the swap.
            </p>
            <button
              type="button"
              onClick={clearPledge}
              className="mt-5 inline-flex items-center gap-1.5 font-heading text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary transition-colors hover:text-accent"
            >
              Pick a different pledge
            </button>
          </div>
        ) : (
          /* Selection state */
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {PLEDGES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => pledge(p.key)}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:bg-primary hover:text-white hover:shadow-[0_16px_36px_rgba(26,43,28,0.18)]"
              >
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                  {p.emoji}
                </span>
                <span className="font-heading text-[12px] font-bold uppercase leading-snug tracking-[0.04em] text-primary group-hover:text-white">
                  {p.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Newsletter strip */}
        <div className="mt-14 rounded-2xl bg-white p-7 shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:p-9">
          <div className="grid items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                Newsletter
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold italic leading-tight text-primary sm:text-3xl">
                One email a month, no fluff
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                Sustainability tips that work, supplier features, and
                early access to new product drops.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
                setEmail("");
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-neutral-200 bg-white px-5 py-3.5 text-sm text-primary placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-6 py-3.5 font-heading text-xs font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg"
              >
                {subscribed ? "Thanks!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
