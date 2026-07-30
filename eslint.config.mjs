import { defineConfig, globalIgnores } from "eslint/config";
import nextConfig from "eslint-config-next";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".next/*", "out/*", "build/*", "node_modules/*"]),
  ...tseslint.configs.recommended,
  ...nextConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);