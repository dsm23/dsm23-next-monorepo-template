import storybookConfig from "@repo/oxlint-config/storybook";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [storybookConfig],
  ignorePatterns: ["coverage/**"],
  env: {
    browser: true,
    node: true,
    serviceworker: true,
    worker: true,
  },
});
