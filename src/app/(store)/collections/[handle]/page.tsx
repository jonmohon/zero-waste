// Route: /collections/[handle]
// Single collection page — shows products within a collection.
// Will fetch collection + products from Medusa and use ISR.
import type { Metadata } from "next";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm text-neutral-400">Collection</p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900">
        {handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </h1>
      <p className="mt-4 text-neutral-500">
        Collection products will appear here once the Medusa backend is connected.
      </p>
    </div>
  );
}
