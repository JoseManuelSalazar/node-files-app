import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

const SEVERITIES = {
  OFF: 0,
  WARN: 1,
  ERROR: 2,
};

const OVERWRITTEN_RULES = {
  // Rules related to possible problems
  "no-unsafe-negation": [
    SEVERITIES.ERROR,
    {
      enforceForOrderingRelations: true,
    },
  ],
  "no-unsafe-optional-chaining": [
    SEVERITIES.ERROR,
    {
      disallowArithmeticOperators: true,
    },
  ],
  "no-unused-vars": [
    SEVERITIES.ERROR,
    {
      args: "none",
      ignoreRestSiblings: true,
    },
  ],
  // Rules related to suggestions
  "no-case-declarations": SEVERITIES.WARN,
};
const STANDARD_MODULE_RULES = {
  // Rules related to possible problems
  "no-duplicate-imports": SEVERITIES.ERROR,
  "no-self-compare": SEVERITIES.ERROR,
  "no-template-curly-in-string": SEVERITIES.ERROR,
  "no-unmodified-loop-condition": SEVERITIES.ERROR,
  // Rules related to suggestions
  "accessor-pairs": SEVERITIES.ERROR,
  camelcase: [
    SEVERITIES.ERROR,
    {
      properties: "never",
      ignoreGlobals: true,
    },
  ],
  eqeqeq: SEVERITIES.ERROR,
  "new-cap": SEVERITIES.ERROR,
  "no-array-constructor": SEVERITIES.ERROR,
  "no-caller": SEVERITIES.ERROR,
  "no-eval": SEVERITIES.ERROR,
  "no-extend-native": SEVERITIES.ERROR,
  "no-extra-bind": SEVERITIES.ERROR,
  "no-implied-eval": SEVERITIES.ERROR,
  "no-iterator": SEVERITIES.ERROR,
  "no-labels": SEVERITIES.ERROR,
  "no-lone-blocks": SEVERITIES.ERROR,
  "no-multi-str": SEVERITIES.ERROR,
  "no-new": SEVERITIES.ERROR,
  "no-new-func": SEVERITIES.ERROR,
  "no-new-wrappers": SEVERITIES.ERROR,
  "no-object-constructor": SEVERITIES.ERROR,
  "no-octal-escape": SEVERITIES.ERROR,
  "no-proto": SEVERITIES.ERROR,
  "no-return-assign": SEVERITIES.ERROR,
  "no-sequences": SEVERITIES.ERROR,
  "no-throw-literal": SEVERITIES.ERROR,
  "no-undef-init": SEVERITIES.ERROR,
  "no-unneeded-ternary": [SEVERITIES.ERROR, { defaultAssignment: false }],
  "no-useless-call": SEVERITIES.ERROR,
  "no-useless-computed-key": SEVERITIES.ERROR,
  "no-useless-constructor": SEVERITIES.ERROR,
  "no-useless-rename": SEVERITIES.ERROR,
  "one-var": [SEVERITIES.ERROR, { initialized: "never" }],
  "symbol-description": SEVERITIES.ERROR,
  yoda: SEVERITIES.ERROR,
  "unicode-bom": SEVERITIES.ERROR,
};
const OTHER_PREFERENCE_RULES = {
  // Rules related to possible problems
  "array-callback-return": SEVERITIES.ERROR,
  "no-await-in-loop": SEVERITIES.WARN,
  "no-constructor-return": SEVERITIES.ERROR,
  "no-promise-executor-return": SEVERITIES.ERROR,
  "no-unreachable-loop": SEVERITIES.ERROR,
  "no-use-before-define": SEVERITIES.ERROR,
  "require-atomic-updates": SEVERITIES.ERROR,
  // Rules related to suggestions
  "class-methods-use-this": SEVERITIES.ERROR,
  "consistent-return": SEVERITIES.ERROR,
  "default-case": SEVERITIES.ERROR,
  "default-case-last": SEVERITIES.ERROR,
  "default-param-last": SEVERITIES.ERROR,
  "dot-notation": SEVERITIES.ERROR,
  "grouped-accessor-pairs": [SEVERITIES.ERROR, "getBeforeSet"],
  "max-depth": [SEVERITIES.ERROR, { max: 5 }],
  "max-lines": [
    SEVERITIES.ERROR,
    {
      max: 500,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  "max-lines-per-function": [
    SEVERITIES.ERROR,
    {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  "max-nested-callbacks": [SEVERITIES.ERROR, { max: 5 }],
  "max-params": [SEVERITIES.ERROR, { max: 6 }],
  "multiline-comment-style": [SEVERITIES.ERROR, "separate-lines"],
  // "no-alert": SEVERITIES.ERROR,
  // "no-console": SEVERITIES.ERROR,
  "no-else-return": SEVERITIES.ERROR,
  "no-empty-function": SEVERITIES.ERROR,
  "no-implicit-coercion": SEVERITIES.ERROR,
  "no-lonely-if": SEVERITIES.ERROR,
  "no-magic-numbers": [
    SEVERITIES.ERROR,
    {
      ignore: [0, 1],
      // ignoreArrayIndexes: true,
      ignoreDefaultValues: true,
      ignoreClassFieldInitialValues: true,
    },
  ],
  "no-multi-assign": SEVERITIES.ERROR,
  "no-nested-ternary": SEVERITIES.ERROR,
  "no-param-reassign": SEVERITIES.ERROR,
  "no-shadow": SEVERITIES.WARN,
  "no-underscore-dangle": SEVERITIES.ERROR,
  "no-unused-expressions": SEVERITIES.ERROR,
  "no-useless-concat": SEVERITIES.ERROR,
  "no-useless-return": SEVERITIES.ERROR,
  "no-var": SEVERITIES.ERROR,
  "object-shorthand": SEVERITIES.ERROR,
  "operator-assignment": SEVERITIES.WARN,
  "prefer-const": SEVERITIES.ERROR,
  "prefer-destructuring": [
    SEVERITIES.WARN,
    {
      array: false,
      object: true,
    },
  ],
  "prefer-exponentiation-operator": SEVERITIES.WARN,
  "prefer-promise-reject-errors": SEVERITIES.ERROR,
  "prefer-template": SEVERITIES.ERROR,
};
const OVERWRITTEN_PRETTIER_RULES = {
  rules: {
    curly: ["error", "multi-line", "consistent"],
  },
};

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...OVERWRITTEN_RULES,
      ...STANDARD_MODULE_RULES,
      ...OTHER_PREFERENCE_RULES,
    },
  },
  eslintConfigPrettier,
  OVERWRITTEN_PRETTIER_RULES,
];
