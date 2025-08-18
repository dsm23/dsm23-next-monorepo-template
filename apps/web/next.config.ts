import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],

  output: "standalone",
  outputFileTracingRoot: path.join(dirname, "../../"),

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
  const plugins = [
    withBundleAnalyzer({ enabled: Boolean(process.env.ANALYZE) }),
  ];

  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });

  return config;
};
