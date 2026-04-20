// Route: /robots.txt
// Generates the site's robots.txt at build time. Blocks account, cart,
// checkout, and API routes from crawling, then points search engines to
// the dynamic sitemap.
import type { MetadataRoute } from "next";

const SITE_URL = "https://zerowastesimplified.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/account",
          "/account/",
          "/cart",
          "/checkout",
          "/order-confirmation",
          "/signin",
          "/signup",
          "/reset-password",
          "/admin",
          "/admin/",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
