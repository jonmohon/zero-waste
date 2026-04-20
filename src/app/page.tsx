// Route: /
// Homepage — cinematic hero, live impact counter, category grid,
// bestsellers, interactive bundle builder, value props, the swap
// comparator, press strip, customer testimonials, brand story,
// journal preview, and pledge CTA.
// Server component that fetches products at request time.
// Revalidates every 60 seconds (ISR).
import type { Metadata } from "next";
import { HeroVideo } from "@/components/home/hero-video";
import { ImpactCounter } from "@/components/home/impact-counter";
import { ShopByCategory } from "@/components/home/shop-by-category";
import { Bestsellers } from "@/components/home/bestsellers";
import { BundleBuilder } from "@/components/home/bundle-builder";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { TheSwap } from "@/components/home/the-swap";
import { PressBar } from "@/components/home/press-bar";
import { Testimonials } from "@/components/home/testimonials";
import { BrandStory } from "@/components/home/brand-story";
import { JournalPreview } from "@/components/home/journal-preview";
import { PickYourPledge } from "@/components/home/pick-your-pledge";
import { getProducts, getRegion } from "@/lib/medusa";
import type { Product } from "@/lib/types";

export const revalidate = 60;

/** Home page — targets the full primary keyword cluster (soap, skincare, hair, shampoo + Cleveland, OH). */
export const metadata: Metadata = {
  title:
    "Natural Soap, Organic Skincare & Artisan Hair Care | Zero Waste Simplified",
  description:
    "Shop natural soap, organic skincare, artisan hair care, and natural shampoo. Plastic-free, small-batch products shipped to Cleveland, OH and across the US.",
  alternates: { canonical: "/" },
};

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
      <ImpactCounter />
      <ShopByCategory />
      <Bestsellers products={products} />
      <BundleBuilder />
      <WhyChooseUs />
      <TheSwap />
      <PressBar />
      <Testimonials />
      <BrandStory />
      <JournalPreview />
      <PickYourPledge />
    </>
  );
}
