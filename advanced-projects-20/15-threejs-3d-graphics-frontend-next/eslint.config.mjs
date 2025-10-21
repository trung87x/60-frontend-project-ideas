import js from "@eslint/js"; import globals from "globals";
export default [
  { ignores: ["**/node_modules/**", "**/.next/**"] },
  { files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.es2021 } },
    rules: { "no-unused-vars": "warn" }, },
];