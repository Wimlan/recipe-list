// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        // pathname: '/images/media/meals/**', // Valfritt
      },
    ],
  },
  // Lägg till andra Next.js inställningar här om du har några
};

export default nextConfig; // Använd export default istället för module.exports
