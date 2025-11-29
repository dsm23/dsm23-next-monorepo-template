// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import { defineConfig } from "eslint/config";
import { config as baseConfig } from "./base.js";

export const config = defineConfig(
  baseConfig,
  storybook.configs["flat/recommended"],
);
