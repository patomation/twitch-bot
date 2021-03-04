module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', [
      'assets',
      'background',
      'bot',
      'client',
      'chat-log-reader',
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
      'overlay',
      'shoutout',
      'typescript',
      'vote',
      'vox',
      'uptime',
      'webpack'
    ]]
  }
}
