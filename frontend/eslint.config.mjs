import eslintReactPlugin from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import globals from "globals";

import { baseConfig } from "../eslint.config.mjs";

export default defineConfig(...baseConfig, {
  files: ["**/*.{ts,tsx}"],
  plugins: {
    ...eslintReactPlugin.configs["recommended-typescript"].plugins,
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
    "no-empty-pattern": "off",
    "react-refresh/only-export-components": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.ts", "**/*.spec.ts", "vite.config.ts", "app/routes.ts"],
      },
    ],
  },
});
