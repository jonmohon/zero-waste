import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Landing } from "@/components/home/landing";
import "@/styles/landing.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "The Zero Waste Store | Shop Sustainable Essentials",
  description:
    "Everyday essentials without the plastic. Soap bars, shampoo bars, bamboo brushes, and kitchen swaps, shipped to half a million homes across the US.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const html = readFileSync(
    path.join(process.cwd(), "src/components/home/landing-body.html"),
    "utf8"
  );
  const script = readFileSync(
    path.join(process.cwd(), "src/components/home/landing-script.js"),
    "utf8"
  );

  return <Landing html={html} script={script} />;
}
