/**
 * AnnouncementBar — thin promotional banner displayed above the main header.
 * Shows a promo message styled with a refined gradient to match the brand.
 *
 * Server component — no client JS needed.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-primary via-primary-light to-primary py-2 text-center font-heading text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-[11px]">
      <span className="inline-flex items-center gap-2">
        <span className="hidden text-accent sm:inline">&#10047;</span>
        Welcome to our store, get 10% off your first order with Promo Code{" "}
        <span className="rounded bg-white/10 px-1.5 py-0.5 font-extrabold tracking-widest text-white">
          FIRST10
        </span>
        <span className="hidden text-accent sm:inline">&#10047;</span>
      </span>
    </div>
  );
}
