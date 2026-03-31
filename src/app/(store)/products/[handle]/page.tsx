// Route: /products/[handle]
// Individual product page. Fetches a single product by handle from Medusa.
// Will use generateStaticParams + ISR (revalidate: 60) once Medusa is connected.
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

/** Dynamic metadata pulled from the product handle (will use Medusa data later) */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  return {
    title: handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm text-neutral-400">Product</p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900">
        {handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </h1>
      <p className="mt-4 text-neutral-500">
        Product details will appear here once the Medusa backend is connected.
      </p>
    </div>
  );
}
