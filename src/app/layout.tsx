// Root layout — wraps every page with shared HTML structure, fonts, and styles.
// Header and Footer are server components rendered once per navigation.
// Uses Century Gothic as the primary font to match the original Zero Waste Store.
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/styles/globals.css";

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
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white font-sans text-neutral-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
