import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // ✅ Fixes "import/export" parsing errors
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // ✅ Ensures JSX is recognized
        },
      },
    },
    plugins: {
      react: pluginReact, // ✅ Make sure React plugin is active
    },
    rules: {
      ...js.configs.recommended.rules, // ✅ Includes JS recommended rules
      ...pluginReact.configs.recommended.rules, // ✅ Includes React recommended rules
      "react/react-in-jsx-scope": "off", // ✅ No need for React import in JSX
      "react/jsx-uses-react": "off", // ✅ Disable obsolete JSX rule
    },
    settings: {
      react: {
        version: "detect", // ✅ Automatically detect installed React version
      },
    },
  },
]);

