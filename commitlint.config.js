module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', [
      'assets',
      'background',
      'bff',
      'client',
      'chat-log-reader',
      'deps',
      'development',
      'docs',
      'experience-points',
      'ci',
      'command',
      'command-marque',
      'confetti',
      'controller',
      'eslint',
      'greeting',
      'hello',
      'keyword',
      'levelup',
      'logger',
      'ui',
      'shoutout',
      'scripts',
      'typescript',
      'vote',
      'vox',
      'uptime',
      'webpack'
    ]]
  }
}
