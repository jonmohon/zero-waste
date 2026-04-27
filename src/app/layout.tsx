// Root layout — wraps every page with shared HTML structure, fonts, and styles.
// Header and Footer are server components rendered once per navigation.
// Uses Cormorant Garamond, Montserrat, and Open Sans loaded via next/font/google.
import type { Metadata } from "next";
import Script from "next/script";
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
  /**
   * Search engine ownership verification.
   * Google Search Console: NlRCma-QPHPizXa1cnn38U0SI01Yy3Qh_m_O7zby3bQ
   * Bing Webmaster Tools: 497566C831E8FDD23DCD2BA9EE408E24
   * Both rendered as <meta> tags by Next.js.
   */
  verification: {
    google: "NlRCma-QPHPizXa1cnn38U0SI01Yy3Qh_m_O7zby3bQ",
    other: {
      "msvalidate.01": "497566C831E8FDD23DCD2BA9EE408E24",
    },
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
 * LocalBusiness schema — physical storefront in Oberlin, OH plus phone,
 * hours, and geo coordinates. Provided by the SEO team and emitted on
 * every page alongside the broader Organization schema below.
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Zero Waste Store",
  image:
    "https://zerowastesimplified.com/_next/image?url=%2Fimages%2Flogo.webp&w=256&q=75",
  url: "https://zerowastesimplified.com/",
  telephone: "7725292380",
  priceRange: "$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "47981 West Hamilton Street",
    addressLocality: "Oberlin",
    addressRegion: "OH",
    postalCode: "44074",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.2799796,
    longitude: -82.259168,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />

        {/* Google Analytics 4 — provided by Alpha SEO. Property G-K47GJL37MR. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K47GJL37MR"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K47GJL37MR');
          `}
        </Script>

        {/* Crazy Egg heatmap — provided by Alpha SEO. Account 0022/1041. */}
        <Script
          src="https://script.crazyegg.com/pages/scripts/0022/1041.js"
          strategy="afterInteractive"
        />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
