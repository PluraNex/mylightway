import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { 
    ignores: [
      "dist",
      "build",
      "coverage",
      "node_modules",
      "public/sw.js",
      "public/workbox-*.js",
      "src/components/ui/*.tsx",
      "*.config.{js,ts}",
      ".prettierrc*",
    ] 
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-var-requires": "error",
      
      // General best practices (relaxed for development)
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "warn",
      "no-alert": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
      "prefer-arrow-callback": "warn",
      "prefer-template": "warn",
      
      // Import/Export rules
      "no-duplicate-imports": "warn",
      
      // React specific rules
      "react-hooks/exhaustive-deps": "warn",
      
      // Accessibility rules (basic)
      "jsx-a11y/alt-text": "off", // Will be handled by linter plugin if added
      
      // Code quality (relaxed for development)
      "complexity": ["warn", 15],
      "max-depth": ["warn", 6],
      "max-lines-per-function": ["warn", { max: 200 }],
      
      // Naming conventions
      "@typescript-eslint/naming-convention": [
        "warn",
        {
          "selector": "variableLike",
          "format": ["camelCase", "PascalCase", "UPPER_CASE"]
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "custom": {
            "regex": "^I[A-Z]",
            "match": false
          }
        }
      ]
    },
  },
  // Test files specific configuration
  {
    files: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}", "**/test/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
    }
  }
);
