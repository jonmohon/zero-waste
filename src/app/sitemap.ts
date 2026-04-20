// Route: /sitemap.xml
// Builds the XML sitemap at request time, combining static storefront
// routes with every product, collection, and blog post currently
// published. Wrapped in try/catch so a backend outage never breaks the
// sitemap — Google fetches this on a schedule and a 500 here gets
// penalized more than a temporarily-shorter sitemap.
import type { MetadataRoute } from "next";
import { medusa, getRegion } from "@/lib/medusa";
import { BLOG_POSTS } from "@/lib/blog-posts";

const SITE_URL = "https://zerowastesimplified.com";

export const revalidate = 3600;

/**
 * Static top-level routes. /cart, /checkout, /account, /signin, /signup,
 * /order-confirmation, and /reset-password are intentionally omitted —
 * they're disallowed in robots.ts and have no SEO value.
 */
const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "", priority: 1.0, changeFrequency: "daily" },
  { path: "/collections", priority: 0.9, changeFrequency: "daily" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/shipping", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  /* Blog posts — always available (static TS source, no network call) */
  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  /* Products + collections — wrapped so Medusa downtime doesn't 500 the sitemap */
  try {
    const region = await getRegion();
    if (region) {
      const [{ products }, { product_categories }] = await Promise.all([
        medusa.store.product.list({
          fields: "handle",
          region_id: region.id,
          limit: 1000,
        }),
        medusa.store.category.list({
          fields: "handle,is_active",
        }),
      ]);

      for (const product of products) {
        if (!product.handle) continue;
        entries.push({
          url: `${SITE_URL}/products/${product.handle}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }

      for (const cat of product_categories) {
        if (!cat.handle || cat.is_active === false) continue;
        entries.push({
          url: `${SITE_URL}/collections/${cat.handle}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        });
      }
    }
  } catch {
    /* Backend unavailable — ship the static + blog slice; ISR will retry */
  }

  return entries;
}
