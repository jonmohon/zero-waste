// Route: /
// Homepage — redesigned to match the artifact with four main sections:
// 1. Featured Products (Bath & Body showcase)
// 2. Brand Story Hero + Philosophy Cards
// 3. Shop Collections Carousel with typewriter effect
// Server component that fetches products at request time.
// Revalidates every 60 seconds (ISR).
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandStory } from "@/components/home/brand-story";
import { ShopCollections } from "@/components/home/shop-collections";
import { getProducts, getRegion } from "@/lib/medusa";
import type { Product } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  let products: Product[] = [];

  try {
    const region = await getRegion();
    const response = region ? await getProducts(region.id, 8) : null;
    products = (response?.products ?? []) as Product[];
  } catch {
    /* Backend unavailable — sections render with fallback data, ISR will retry */
  }

  return (
    <>
      <FeaturedProducts products={products} />
      <BrandStory />
      <ShopCollections />
    </>
  );
}
