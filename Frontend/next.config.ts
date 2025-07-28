import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // fine for basic usage
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;