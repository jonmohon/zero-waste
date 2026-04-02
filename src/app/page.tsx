// Route: /
// Homepage — premium redesign with cinematic hero, trust stats, category grid,
// bestsellers from Medusa, value props, press bar, brand story, and newsletter.
// Server component that fetches products at request time.
// Revalidates every 60 seconds (ISR).
import { HeroVideo } from "@/components/home/hero-video";
import { StatsBar } from "@/components/home/stats-bar";
import { ShopByCategory } from "@/components/home/shop-by-category";
import { Bestsellers } from "@/components/home/bestsellers";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { PressBar } from "@/components/home/press-bar";
import { BrandStory } from "@/components/home/brand-story";
import { Newsletter } from "@/components/home/newsletter";
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
      <HeroVideo />
      <StatsBar />
      <ShopByCategory />
      <Bestsellers products={products} />
      <WhyChooseUs />
      <PressBar />
      <BrandStory />
      <Newsletter />
    </>
  );
}
