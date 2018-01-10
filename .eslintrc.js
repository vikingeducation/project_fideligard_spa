module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    strict: ['error', 'global'],
    curly: 'warn',
    'no-console': 'off'
  }
}
