// Linter (regola generale: in CI prima dei test). Locale: npm run lint
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: { ecmaVersion: 2022, sourceType: "commonjs", globals: { ...globals.node } },
  },
];
