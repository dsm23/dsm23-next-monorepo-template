// https://jestjs.io/docs/configuration
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/**
 * @type {import("jest").Config}
 */
const config = {
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
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    // https://github.com/lucide-icons/lucide/issues/2734#issuecomment-2597970172
    "lucide-react": require.resolve("lucide-react"),
    "^@workspace/ui/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
