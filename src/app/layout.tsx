// Root layout — wraps every page with shared HTML structure, fonts, and styles.
// Header and Footer are server components rendered once per navigation.
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/** Default metadata — individual pages can override via their own export */
export const metadata: Metadata = {
  title: {
    default: "Zero Waste — Sustainable Products",
    template: "%s | Zero Waste",
  },
  description:
    "Shop sustainable, zero-waste products for everyday living. Better for you, better for the planet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-neutral-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
