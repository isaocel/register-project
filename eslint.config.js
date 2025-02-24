import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import cypress from "eslint-plugin-cypress";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      cypress, // Cypress eklentisini buraya ekliyoruz
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["**/*.spec.{js,jsx}"], // Cypress test dosyalarını belirtiyoruz
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        cy: "readonly", // Cypress için özel global tanımlama
        Cypress: "readonly", // Cypress global
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      cypress, // Cypress için plugin ekliyoruz
    },
    rules: {
      "cypress/no-assigning-return-values": "error", // Cypress kurallarını ekliyoruz
      "cypress/no-unnecessary-waiting": "warn",
      "cypress/assertion-before-screenshot": "warn",
      // Burada başka Cypress kuralları da ekleyebilirsiniz
    },
  },
];
