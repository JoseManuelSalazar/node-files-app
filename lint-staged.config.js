export default {
  "**/*.{js, json, md}": [
    "prettier --write",
    "eslint --fix",
    "prettier --write",
  ],
};
