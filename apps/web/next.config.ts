import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],

  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),

  async rewrites() {
    return await [
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
    ];
  },
};

export default () => {
  const plugins = [withBundleAnalyzer({ enabled: process.env.ANALYZE })];

  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });

  return config;
};
