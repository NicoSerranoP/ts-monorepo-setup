import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const currentFilePath = fileURLToPath(import.meta.url);
const prettierConfig = readFileSync(resolve(currentFilePath, "../.prettierrc.json"), "utf8");
const prettierOptions = JSON.parse(prettierConfig);

export const baseConfig = tseslint.config(
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      prettier,
      "unused-imports": unusedImports,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "no-console": "error",
      "prettier/prettier": ["error", prettierOptions],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-shadow": [
        "error",
        {
          builtinGlobals: true,
          allow: ["location", "event", "history", "name", "status", "Option", "test", "expect", "jest"],
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "import/order": [
        "error",
        {
          "groups": ["external", "builtin", "internal", "type", "parent", "sibling", "index", "object"],
          "alphabetize": {
            order: "asc",
            caseInsensitive: true,
          },
          "warnOnUnassignedImports": true,
          "newlines-between": "always",
        },
      ],
      "complexity": ["error", { max: 10 }],
      "max-lines-per-function": ["warn", { max: 50, skipBlankLines: true, skipComments: true }],
      "max-params": ["error", { max: 3 }],
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "no-unreachable": "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    extends: [tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    ignores: ["**/dist/**", "**/build/**", "**/.react-router/**"],
  },
);

export default defineConfig(...baseConfig);
