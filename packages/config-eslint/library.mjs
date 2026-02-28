import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/", "node_modules/"],
  },
];

export default config;
