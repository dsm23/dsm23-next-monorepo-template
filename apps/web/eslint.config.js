import { config as nextConfig } from "@workspace/eslint-config/next";

/** @type {import("eslint").Linter.Config} */
const config = [
  ...nextConfig,
  {
    rules: {
      "turbo/no-undeclared-env-vars": [
        "error",
        {
          allowList: ["NODE_ENV"],
        },
      ],
    },
  },
];

export default config;
