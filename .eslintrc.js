module.exports = {
  ignorePatterns: ["node_modules/*", ".next/*", "out/*"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-unused-vars": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@next/next/no-img-element": "off",
  },
};
