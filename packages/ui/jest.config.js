// https://jestjs.io/docs/configuration
import { createDefaultEsmPreset } from "ts-jest";

/**
 * @type {import("jest").Config}
 */
const config = {
  ...createDefaultEsmPreset({}),

  collectCoverageFrom: [
    "**/src/**/*.{js,jsx,ts,tsx}",
    "!**/src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  coveragePathIgnorePatterns: ["dist/", "node_modules/"],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  injectGlobals: false,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@workspace/ui/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
