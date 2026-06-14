import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray pnpm-lock.yaml in the home
  // directory otherwise makes Next infer the wrong root and emit a warning.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Template thumbnails are served as presigned URLs from object storage,
    // whose host can vary. Allow any HTTPS origin for remote images.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
