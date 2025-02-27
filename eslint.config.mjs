import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["sonarjs"],
    rules: {
      semi: ["warn"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": "error",

      "sonarjs/no-implicit-dependencies": "off",

      "no-console": "error",
    },
  }),
];

export default eslintConfig;
