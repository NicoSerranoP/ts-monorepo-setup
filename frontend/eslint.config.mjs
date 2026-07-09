import eslintReactPlugin from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import globals from "globals";

import { baseConfig } from "../eslint.config.js";

export default defineConfig(...baseConfig, {
  files: ["**/*.{ts,tsx}"],
  plugins: {
    ...eslintReactPlugin.configs["recommended-typescript"].plugins,
    "react-hooks": reactHooksPlugin,
    "react-refresh": reactRefreshPlugin,
  },
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: {
    ...eslintReactPlugin.configs["recommended-typescript"].settings,
  },
  rules: {
    ...eslintReactPlugin.configs["recommended-typescript"].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    "no-empty-pattern": "off",
    "react-refresh/only-export-components": "off",
  },
});
