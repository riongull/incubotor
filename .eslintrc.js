module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['_scratch/'],
  rules: {
    'no-console': 'off',
    'prefer-destructuring': 'off',
  },
};
