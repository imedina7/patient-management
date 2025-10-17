import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/patients/**",
      },
      {
        protocol: "http",
        hostname: "app-api",
        port: "3000",
        pathname: "/patients/**",
      },
    ],
  },
};

export default nextConfig;
