import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    ignores: ["node_modules/", "dist/", "coverage/"],
  },
  {
    files: ["**/*.ts"],

    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    plugins: {
      "@stylistic": stylistic,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        Bun: "readonly",
      },
    },

    rules: {
      // Console
      "no-console": "warn",

      // Variables
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Spacing and formatting
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": [
        "error",
        "single",
        {
          avoidEscape: true,
        },
      ],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      "@stylistic/eol-last": ["error", "always"],

      // Airbnb preferences you customized
      "no-underscore-dangle": "off",
      "@typescript-eslint/no-shadow": "off",
      "no-param-reassign": "off",
      "max-len": "off",
    },
  },
]);
