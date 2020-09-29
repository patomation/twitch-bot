module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', [
      'assets',
      'bot',
      'client',
      'command',
      'eslint',
      'keyword',
      'overlay',
      'typescript',
      'vox'
    ]]
  }
}
