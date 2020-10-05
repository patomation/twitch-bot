import developersGif from '../../assets/gif/steve-balmer-developers.gif'
import developersMp3 from '../../assets/sounds/steve-balmer-developers.mp3'

import typingCat from '../../assets/gif/typing-cat.gif'
import accessGranted from '../../assets/sounds/access-granted.mp3'

import cheersGif from '../../assets/gif/cheers.gif'
import cheersMp3 from '../../assets/sounds/cheers.mp3'

import noThisIsPatrickGif from '../../assets/gif/no-this-is-patrick.gif'
import noThisIsPatrickMp3 from '../../assets/sounds/no-this-is-patrick.mp3'

import snoop from '../../assets/gif/snoop.gif'
import bwaaa from '../../assets/sounds/inception.mp3'

import accessDenied from '../../assets/sounds/access-denied.mp3'
import fGif from '../../assets/gif/f.gif'

import thisIsFine from '../../assets/gif/this-is-fine.gif'
import reSucks from '../../assets/sounds/re-sucks.mp3'

import iLoveThisCompany from '../../assets/sounds/i-love-this-company.mp3'

import USSR from '../../assets/sounds/USSR.mp3'

export const commands = {
  developers: {
    gif: developersGif,
    sound: developersMp3,
    duration: 20000
  },
  hack: {
    gif: typingCat,
    sound: accessGranted,
    duration: 3000
  },
  cheers: {
    gif: cheersGif,
    sound: cheersMp3,
    duration: 8000
  },
  starfish: {
    gif: noThisIsPatrickGif,
    sound: noThisIsPatrickMp3,
    duration: 3000
  },
  purplestar: {
    gif: snoop,
    sound: bwaaa,
    duration: 3000
  },
  f: {
    gif: fGif,
    sound: accessDenied,
    duration: 3000
  },
  resucks: {
    gif: thisIsFine,
    sound: reSucks,
    duration: 6000
  },
  our: {
    sound: USSR
  },
  twitch: {
    sound: iLoveThisCompany
  }
}
