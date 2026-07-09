import { defineConfig } from "eslint/config";
import globals from "globals";
import { baseConfig } from "../eslint.config.js";

export default defineConfig(...baseConfig, {
  files: ["**/*.ts"],
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    sourceType: "module",
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
