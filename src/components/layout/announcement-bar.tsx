/**
 * AnnouncementBar — thin promotional banner displayed above the main header.
 * Shows a rotating or static promo message. Styled with the brand sage green
 * background to match the original Zero Waste Store design.
 *
 * Server component — no client JS needed.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-brand-500 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
      Welcome to our store, get 10% off your first order with Promo Code{" "}
      <span className="font-bold">FIRST10</span>
    </div>
  );
}
