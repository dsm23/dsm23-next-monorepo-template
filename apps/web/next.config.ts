import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
};

export default () => {
  const plugins = [withBundleAnalyzer({ enabled: process.env.ANALYZE })];

  const config = plugins.reduce((acc, next) => next(acc), {
    ...nextConfig,
  });

  return config;
};
