// Route: /collections
// Lists all product collections from Medusa.
// Static page with ISR once Medusa is connected.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our zero-waste product collections.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900">Collections</h1>
      <p className="mt-4 text-neutral-500">
        Product collections will appear here once the Medusa backend is connected.
      </p>
    </div>
  );
}
