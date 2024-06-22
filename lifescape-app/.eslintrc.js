// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  env: {
    node: true,
  },
  rules : {
    'import/no-unresolved': [2, {commonjs: true, amd: true}]
  },
  overrides: [
    {
      files: ["./app/**/*", "./components/**/*", "./context/**/*", "./hooks/**/*"],
      rules: {
        "import/no-unresolved": "off",
      },
    },
  ],
};
