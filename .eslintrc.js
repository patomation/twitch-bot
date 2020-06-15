module.exports = {
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  settings: {},
  plugins: [],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'new-cap': 0 // tmi.js uses lower case prototype constructors
  }
}
