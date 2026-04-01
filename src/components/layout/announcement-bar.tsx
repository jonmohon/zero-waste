/**
 * AnnouncementBar — thin promotional banner displayed above the main header.
 * Shows a promo message styled with the accent green to match the new design.
 *
 * Server component — no client JS needed.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-primary py-2 text-center font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-xs">
      Welcome to our store, get 10% off your first order with Promo Code{" "}
      <span className="font-extrabold text-white">FIRST10</span>
    </div>
  );
}
