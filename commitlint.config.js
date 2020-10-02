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
      'docs',
      'command',
      'eslint',
      'keyword',
      'levelup',
      'overlay',
      'typescript',
      'vox',
      'uptime'
    ]]
  }
}
