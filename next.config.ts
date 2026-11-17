import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static export served from https://<user>.github.io/cosmed-test/.
// Local dev/build are unaffected.
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? "/cosmed-test" : "";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath,
        trailingSlash: true,
        images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
      }
    : {}),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
