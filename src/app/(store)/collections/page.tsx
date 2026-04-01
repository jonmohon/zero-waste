// Route: /collections
// Lists all product categories from Medusa as browsable collections.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/medusa";
import { Card } from "@/components/ui/card";
import type { ProductCategory } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse our zero-waste product collections.",
};

export default async function CollectionsPage() {
  const categories = (await getCategories()) as ProductCategory[];
  const activeCategories = categories.filter((c) => c.is_active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900">Collections</h1>
      <p className="mt-2 text-neutral-500">
        Browse our curated zero-waste product collections.
      </p>

      {activeCategories.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeCategories.map((cat) => (
            <Link key={cat.id} href={`/collections/${cat.handle}`}>
              <Card interactive className="py-8">
                <h2 className="text-xl font-semibold text-neutral-900">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="mt-2 text-sm text-neutral-500">
                    {cat.description}
                  </p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-neutral-500">No collections available yet.</p>
      )}
    </div>
  );
}
