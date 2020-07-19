const badWordsRegExp = require('badwords/regexp')
const say = require('say')
const { urlRegExPattern } = require('./isUrl')

function vox (message) {
  const voiceMessage = message
    .replace(badWordsRegExp, 'expletive')
    .replace(urlRegExPattern, '')
  say.speak(voiceMessage)
}

module.exports = vox
