/* eslint-disable no-magic-numbers */
/* eslint-disable sort-keys */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 14,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "linebreak-style": 0,
    "@typescript-eslint/no-shadow": 0,
    "react/button-has-type": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-unused-vars": "warn",
    eqeqeq: ["error", "always"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-console": "warn",
    "no-alert": "error",
    "no-unused-vars": ["warn", { args: "none" }],
    "max-params": ["error", 3],
    "multiline-comment-style": ["error", "starred-block"],
    "no-trailing-spaces": "warn",
    "no-plusplus": "warn",
    "func-names": "error",
    "max-len": [
      "error",
      {
        code: 125,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "brace-style": "error",
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never", asyncArrow: "always" },
    ],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
    ],
    "space-in-parens": ["error", "never"],
    "comma-spacing": ["error", { before: false, after: true }],
    "space-before-blocks": "error",
    semi: ["error", "always"],
    "semi-spacing": ["error", { before: false, after: true }],
    "eol-last": ["error", "always"],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": ["error", { mode: "strict" }],
    quotes: ["error", "single"],
    "array-bracket-spacing": ["error", "never"],
    "no-extra-boolean-cast": "warn",
    "no-extra-semi": "warn",
    "no-unreachable": "error",
    "no-unused-expressions": "warn",
    "arrow-body-style": ["error", "as-needed"],
    "no-multi-spaces": "warn",
    "arrow-parens": ["error", "always"],
    "no-duplicate-imports": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "no-var": "error",
    "prefer-arrow-callback": "warn",
    "no-empty-function": "warn",
    curly: "error",
    "max-depth": ["error", 3],
    "no-magic-numbers": [
      "error",
      { ignore: [-1, 0, 1, 2, 30, 60, 100, 1000], ignoreArrayIndexes: true },
    ],
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: false, natural: false, minKeys: 2 },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always-and-inside-groups",
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "prefer-const": "error",
    "react/jsx-handler-names": [
      "error",
      { eventHandlerPrefix: "handle", eventHandlerPropPrefix: "on" },
    ],
    "react/sort-comp": [
      "error",
      {
        order: [
          "type-annotations",
          "static-methods",
          "lifecycle",
          "/^handle.+$/",
          "everything-else",
          "render",
        ],
      },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    "react/prefer-stateless-function": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
