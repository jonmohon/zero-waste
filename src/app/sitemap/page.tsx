// Route: /sitemap
// Human-readable sitemap page linked from the footer. Mirrors the
// machine-readable /sitemap.xml so visitors and search engines can both
// navigate the site structure. Provided by Alpha SEO.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Browse every page on The Zero Waste Store, from collections to blog posts to support pages.",
  alternates: { canonical: "/sitemap" },
};

interface SitemapNode {
  label: string;
  href: string;
  children?: SitemapNode[];
}

const SITEMAP: SitemapNode[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/collections",
    children: [
      { label: "Bar Soap", href: "/collections/bar-soap" },
      { label: "Hair Care", href: "/collections/hair-care" },
      { label: "Skin Care", href: "/collections/skin-care" },
      { label: "Oral Care", href: "/collections/oral-care" },
      { label: "Food Wraps", href: "/collections/food-wraps" },
      { label: "Bath & Body", href: "/collections/bath-%26-body" },
      { label: "Kitchen", href: "/collections/kitchen" },
      { label: "Combs & Brushes", href: "/collections/combs-%26-brushes" },
      { label: "Home & Decor", href: "/collections/home-%26-decor" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Journal", href: "/blog" },
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:py-24">
      <h1 className="font-serif text-4xl font-bold italic text-primary sm:text-5xl">
        Sitemap
      </h1>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">
        Every page on The Zero Waste Store, organized so you can find what
        you're looking for.
      </p>

      <ul className="mt-10 space-y-3 text-base">
        {SITEMAP.map((node) => (
          <li key={node.href}>
            <Link
              href={node.href}
              className="font-heading font-bold text-primary underline-offset-4 hover:text-accent hover:underline"
            >
              {node.label}
            </Link>
            {node.children && (
              <ul className="ml-5 mt-2 space-y-2 border-l border-surface-sage pl-5">
                {node.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="text-text-secondary underline-offset-4 hover:text-accent hover:underline"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm text-text-secondary">
        Looking for the machine-readable version?{" "}
        <a
          href="/sitemap.xml"
          className="text-accent underline-offset-4 hover:underline"
        >
          View sitemap.xml
        </a>
        .
      </p>
    </div>
  );
}
