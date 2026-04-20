// Root layout — wraps every page with shared HTML structure, fonts, and styles.
// Header and Footer are server components rendered once per navigation.
// Uses Cormorant Garamond, Montserrat, and Open Sans loaded via next/font/google.
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Open_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const SITE_URL = "https://zerowastesimplified.com";

/**
 * Default metadata — individual pages override via their own export.
 *
 * `metadataBase` is required for Next.js to resolve relative OG image URLs
 * into absolute ones. Title template applies sitewide; the default title
 * and description target the primary keyword cluster (natural / organic /
 * artisan soap + skincare + hair care, shipping to Cleveland, OH).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Natural Soap, Organic Skincare & Artisan Hair Care | Zero Waste Simplified",
    template: "%s | Zero Waste Simplified",
  },
  description:
    "Shop natural soap, organic skincare, artisan hair care, and natural shampoo online. Plastic-free, small-batch products shipped to Cleveland, OH and across the US.",
  keywords: [
    "natural soap Cleveland OH",
    "organic soap Cleveland OH",
    "artisan soap Cleveland OH",
    "natural skincare products Cleveland OH",
    "natural hair products Cleveland OH",
    "natural hair care products Cleveland OH",
    "natural shampoo Cleveland OH",
    "zero waste store",
    "plastic-free products",
    "eco-friendly skincare",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Zero Waste Simplified",
    title:
      "Natural Soap, Organic Skincare & Artisan Hair Care | Zero Waste Simplified",
    description:
      "Natural soap, organic skincare, and artisan hair care — plastic-free and shipped to Cleveland, OH and across the US.",
    images: [
      {
        url: "/og-default.webp",
        width: 1200,
        height: 630,
        alt: "Zero Waste Simplified — natural soap, organic skincare, and artisan hair care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Natural Soap, Organic Skincare & Artisan Hair Care | Zero Waste Simplified",
    description:
      "Plastic-free natural soap, organic skincare, and artisan hair care — shipped to Cleveland, OH and across the US.",
    images: ["/og-default.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Organization schema emitted sitewide so Google can attribute every page
 * to the same legal entity. Uses the store's public email addresses and
 * primary service area (Cleveland, OH + nationwide US shipping).
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zero Waste Simplified",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Online zero-waste store offering natural soap, organic skincare, artisan hair care, and natural shampoo. Ships to Cleveland, OH and across the United States.",
  areaServed: [
    { "@type": "City", name: "Cleveland", containedInPlace: "Ohio" },
    { "@type": "Country", name: "United States" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "hello@zerowastesimplified.com",
      contactType: "customer support",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      email: "press@zerowastesimplified.com",
      contactType: "press",
    },
    {
      "@type": "ContactPoint",
      email: "wholesale@zerowastesimplified.com",
      contactType: "wholesale",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${openSans.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-cream font-sans text-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
