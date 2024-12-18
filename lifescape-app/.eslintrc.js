// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
  extends: [
    "expo",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended", // Adds Prettier as a recommended plugin
  ],
  plugins: ["prettier"], // Include Prettier plugin
  env: {
    node: true,
  },
  rules: {
    "import/no-unresolved": "off",
    "prettier/prettier": "error", // Treats Prettier issues as ESLint errors
  },
};
