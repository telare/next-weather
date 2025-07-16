// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginCypress from "eslint-plugin-cypress";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.config({
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["sonarjs"],
  rules: {
    semi: ["error"],
    quotes: ["error", "double"],
    "prefer-arrow-callback": "error",
    "sonarjs/no-implicit-dependencies": "off",
    "no-console": "error",
    "react-hooks/exhaustive-deps": "off",
  },
}), {
  files: ["cypress/e2e/**/*.{js,ts}"],
  plugins: { cypress: pluginCypress },
  languageOptions: {
    globals: { Cypress: "readonly", cy: "readonly" },
  },
  rules: {
    ...pluginCypress.configs.recommended.rules,
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
