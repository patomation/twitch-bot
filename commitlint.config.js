module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', [
      'bot',
      'command',
      'eslint',
      'overlay',
      'typescript'
    ]]
  }
}
