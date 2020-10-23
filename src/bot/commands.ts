export type Command = {
  text?: string | string[]
  say?: string
  gif?: string
  sound?: string
}

export type Commands = {
  [key: string]: Command
}

export const commands: Commands = {
  donate: {
    text: 'https://streamlabs.com/advolkit/tip'
  },
  salt: {
    text: 'SALTY SALTY'
  },
  github: {
    text: 'https://github.com/patomation/'
  },
  gamejam: {
    text: 'https://itch.io/jam/jamoween'
  },
  discord: {
    text: 'https://discord.gg/ttbJuve'
  },
  freehosting: {
    text: 'https://app.netlify.com'
  },
  twitter: {
    text: 'https://twitter.com/advolkit'
  },
  youtube: {
    text: 'https://www.youtube.com/channel/UC3awU4-KQM65bgqjeKc2fCA'
  },
  instagram: {
    text: 'https://www.instagram.com/advolkit/'
  },
  theme: {
    text: 'SynthWave 84 | https://github.com/robb0wen/synthwave-vscode'
  },
  match3hell: {
    text: 'Match3hell dev: https://match3hell.com/ itch: https://advolkit.itch.io/match3hell?dev=true '
  },
  game: {
    text: 'The game is match3Hell: https://advolkit.itch.io/match3hell'
  },
  botsource: {
    text: 'See my insides: https://github.com/patomation/twitch-bot'
  },
  hype: {
    say: 'HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE'
  },
  laugh: {
    say: ':e: :e: :e: :o: :o: :o: :a: :a: :a: :a:'
  },
  hacktober: {
    text: 'https://hacktoberfest.digitalocean.com'
  },
  bw: {
    text: 'Im on to you @vision_of_jarvis',
    say: 'Bot War. AAAAAAAAAAAAAAAAAAAAAAAAAAAAA!'
  },
  botwar: {
    text: 'this means war... bot war that is',
    say: 'activating laser turrets'
  },
  developers: {
    gif: 'steve-balmer-developers.gif',
    sound: 'steve-balmer-developers.mp3'
  },
  hack: {
    gif: 'typing-cat.gif',
    sound: 'access-granted.mp3'
  },
  cheers: {
    gif: 'cheers.gif',
    sound: 'cheers.mp3'
  },
  starfish: {
    gif: 'no-this-is-patrick.gif',
    sound: 'no-this-is-patrick.mp3'
  },
  purplestar: {
    gif: 'snoop.gif',
    sound: 'inception.mp3'
  },
  f: {
    gif: 'mario-hit-by-car.gif',
    sound: 'access-denied.mp3'
  },
  resucks: {
    gif: 'this-is-fine.gif',
    sound: 're-sucks.mp3'
  },
  our: {
    sound: 'USSR.mp3'
  },
  twitch: {
    sound: 'i-love-this-company.mp3'
  },
  leeroy: {
    sound: 'leeroy-jenkins.mp3'
  },
  nacho: {
    gif: 'nacho-man.gif',
    sound: 'nacho-man.mp3'
  },
  yes: {
    sound: 'steve-balmer-yes.mp3'
  },
  lana: {
    sound: 'archer-lana.mp3'
  },
  wat: {
    gif: 'raptor.gif',
    sound: 'wat-did-you-say.mp3'
  },
  nailedit: {
    gif: 'nailed-it.gif',
    sound: 'nailed-it.mp3'
  },
  coolbeans: {
    sound: 'cool-beans.mp3'
  },
  alluarjun: { // pronunciation a-ll-u ar-ju-n
    gif: 'thalapathy-floor.gif',
    sound: 'oh-god-im-falling.mp3'
  },
  depp: {
    text: ' I am dishonest, and a dishonest man you can always trust to be dishonest.',
    say: ' I am dishonest, and a dishonest man you can always trust to be dishonest.'
  },
  // TODO thalapathy
  chattrbox: {
    sound: 'chattrbox.mp3'
  },
  cash: {
    sound: 'cash.mp3'
  },
  drumroll: {
    sound: 'drumroll.mp3'
  },
  failure: {
    sound: 'failure.mp3'
  },
  ragea: {
    sound: 'ragea.mp3'
  },
  tada: {
    sound: 'tada.mp3'
  },
  a: { // Andrelamus's request
    sound: 'gawr-gura-a.mp3'
  },
  vanakkam: {
    gif: 'vanakkam.gif',
    say: 'vanakkam'
  }
}
