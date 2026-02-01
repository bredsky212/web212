import type { NextConfig } from "next";

const strapiPublicUrl = process.env.STRAPI_PUBLIC_URL || process.env.STRAPI_URL;
type RemotePattern = {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
};
const remotePatterns: RemotePattern[] = [
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
    const pattern: RemotePattern = {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      pathname: "/**",
      ...(url.port ? { port: url.port } : {}),
    };
    remotePatterns.push(pattern);
  } catch {}
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
