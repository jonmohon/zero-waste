// Next.js configuration for Zero Waste storefront.
// - Medusa backend images are allowed via remotePatterns.
// - /admin redirects to the Medusa admin (which lives on a subdomain
//   because the path /admin is reserved by Medusa's REST API).
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "https://admin.zerowastesimplified.com/app",
        permanent: true,
      },
      {
        source: "/admin/:path*",
        destination: "https://admin.zerowastesimplified.com/app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
