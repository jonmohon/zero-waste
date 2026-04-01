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

/** Default metadata — individual pages can override via their own export */
export const metadata: Metadata = {
  title: {
    default: "The Zero Waste Store — Sustainable Products",
    template: "%s | The Zero Waste Store",
  },
  description:
    "Shop sustainable, zero-waste products for everyday living. Saving the planet, one eco product at a time.",
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
      <body className="flex min-h-screen flex-col bg-white font-sans text-primary antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
