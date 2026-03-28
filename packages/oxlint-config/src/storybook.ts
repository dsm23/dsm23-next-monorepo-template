import { defineConfig } from "oxlint";
import baseConfig from "./base";

export default defineConfig({
  extends: [baseConfig],
  overrides: [
    {
      files: [
        "**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)",
        "**/*.story.@(ts|tsx|js|jsx|mjs|cjs)",
      ],
      rules: {
        "storybook/await-interactions": "warn",
        "storybook/context-in-play-function": "warn",
        "storybook/default-exports": "warn",
        "storybook/hierarchy-separator": "warn",
        "storybook/no-redundant-story-name": "warn",
        "storybook/no-renderer-packages": "warn",
        "storybook/prefer-pascal-case": "warn",
        "storybook/story-exports": "warn",
        "storybook/use-storybook-expect": "warn",
        "storybook/use-storybook-testing-library": "warn",
      },
      jsPlugins: ["eslint-plugin-storybook"],
      plugins: ["import"],
    },
    {
      files: [".storybook/main.@(js|cjs|mjs|ts)"],
      rules: {
        "storybook/no-uninstalled-addons": "warn",
      },
      jsPlugins: ["eslint-plugin-storybook"],
    },
    {
      files: [".storybook/main.@(js|cjs|mjs|ts)"],
      rules: {
        "storybook/no-uninstalled-addons": "warn",
      },
      jsPlugins: ["eslint-plugin-storybook"],
    },
  ],
});
