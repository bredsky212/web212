import type { NextConfig } from "next";

const strapiPublicUrl = process.env.STRAPI_PUBLIC_URL || process.env.STRAPI_URL;
const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "1337",
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "1337",
    pathname: "/**",
  },
];

if (strapiPublicUrl) {
  try {
    const url = new URL(strapiPublicUrl);
    remotePatterns.push({
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: "/**",
    });
  } catch {}
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
