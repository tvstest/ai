// eslintrc.js
const OFF = 0,
WARN = 1,
ERROR = 2

module.exports = {
  extends: ['airbnb-typescript-prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx','.json'],
      },
    },
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "global-require": OFF,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/ban-types': OFF,
    'import/prefer-default-export': OFF,
    'import/no-extraneous-dependencies': OFF,
    'no-param-reassign': OFF,
    'no-console': WARN,
    'no-debugger':WARN,
    'react/react-in-jsx-scope': OFF,
    "react/require-default-props": OFF,
    "react/jsx-props-no-spreading": OFF,
  },
}
