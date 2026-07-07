import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Roster/content edits shouldn't be blocked by lint during builds.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Local /public images only for now; add remote patterns if we ever host art elsewhere.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
