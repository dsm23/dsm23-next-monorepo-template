import react from "@vitejs/plugin-react";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react()],
  test: {
    coverage: {
      include: ["src/**/*.[jt]s?(x)"],
      exclude: [
        "src/**/*.stories.[jt]s?(x)",
        "src/test-utils/**",
        "src/mocks/**",
        "**/node_modules/**",
        "**/playwright-tests/**",
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    },
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: false,
    logHeapUsage: true,
    watch: false,
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/?(*.)+(spec|test).[jt]s?(x)"],
        },
      },
    ],
  },
});

export default config;
