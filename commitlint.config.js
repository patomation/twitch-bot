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
      'development',
      'docs',
      'command',
      'controller',
      'eslint',
      'keyword',
      'levelup',
      'logger',
      'overlay',
      'typescript',
      'vote',
      'vox',
      'uptime'
    ]]
  }
}
