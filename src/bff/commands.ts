export type Command = {
  text?: string | string[]
  say?: string
  gif?: string
  sound?: string,
  confetti?: boolean,
  background?: Background
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
    text: 'https://discord.gg/ttbJuve',
    gif: 'join-discord.gif'
    // sound: 'steve-balmer-developers.mp3'
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
    sound: 'USSR.mp3',
    background: {
      color: '#e01616',
      duration: 20000
    }
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
  vijay: {
    sound: 'vijay-always-be-happy-kutti-story.mp3'
  },
  students: {
    sound: 'students.mp3'
  },
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
  },
  guerrillakiller: {
    sound: 'guerrillakillaforilla.mp3',
    confetti: true
  },
  trololo: {
    sound: 'trololo.mp3'
  },
  twat: {
    sound: 'twat.mp3'
  },
  fancycommand: {
    sound: 'fancycommand.mp3',
    confetti: true
  },
  // TODO: fancypants
  // TODO: fancyface
  spaghettihorn: {
    sound: 'ragea.mp3',
    say: 'mama mia'
  },
  steal: {
    text: 'good developers borrow, great developers steal',
    say: 'good developers borrow, great developers steal'
  },
  enjoytolive: {
    sound: 'enjoytolive.mp3',
    confetti: true
  },
  blimey: {
    gif: 'blimey.gif',
    sound: 'blimey.mp3'
  },
  dontunderstand: {
    gif: 'john-cleese-no.gif',
    sound: 'dont-understand.mp3'
  },
  // bbc: {
  //   gif: 'john-cleese-bell.gif',
  //   sound: 'bbc-apology.mp3'
  // },
  secretsignal: {
    gif: 'secretsignal.gif'
  },
  escape: {
    sound: 'exape_resets_everything.wav'
  },
  nonsence: {
    say: 'jib jab wuba luba glub galb'
  },
  diskafuti: {
    sound: 'diskafuti.mp3'
  },
  different: {
    sound: 'completely-different.mp3'
  },
  // TODO whatishappening
  // TODO wow
  // thatwasfun
  raid: {
    sound: 'french-police-siren.mp3'
    // sound: 'raid-siren.mp3' // this one sounds to much like the real thing
  },
  confetti: {
    confetti: true
  },
  election: {
    sound: 'trunalimunumaprzure.mp3',
    gif: 'jim_kerry.gif'
  },
  chess: {
    text: 'Lets Play Chess: https://lichess.org/'
  },
  rock: {
    gif: 'rock-cat.webp'
  },
  snoop: {
    gif: 'snoop.webp'
  },
  loading: {
    gif: 'loading.webp'
  },
  sexy: {
    gif: 'sexy-squidward.webp'
  },
  zest: {
    gif: 'zest.gif'
  },
  eagle: {
    sound: 'screaming-hawk.mp3',
    gif: 'eagle.webp',
    background: {
      gif: 'american-flag.gif'
    }
  },
  wow: {
    sound: 'anime-wow.mp3',
    gif: 'weeb.webp'
  },
  magic: {
    sound: 'magic-wand.mp3',
    gif: 'firework.webp'
  },
  party: {
    sound: 'party-horn.mp3',
    gif: 'party-parrot.webp'
  },
  applause: {
    sound: 'laugh-applause.mp3'
  },
  boing: {
    sound: 'boing.mp3',
    gif: 'delete.webp'
  },
  tis: {
    sound: 'ba-dum-tis.mp3'
  },
  villain: {
    sound: 'sick-villain.mp3'
  },
  notlikethis: {
    gif: 'scared_lego.webp'
  },
  run: {
    sound: 'running-feet.mp3'
  },
  quack: {
    sound: 'quack.mp3',
    gif: 'yas.webp'
  },
  jump: {
    sound: 'jump.mp3',
    gif: 'heman.webp'
  },
  pew: {
    sound: 'pew.mp3',
    gif: 'bemo.webp'
  },
  no: { sound: 'anime-no.mp3', gif: 'broney-no.webp' },
  trash: { sound: 'anime-belongs-in-the-trash.mp3', gif: 'sheep.webp' },
  eurobeat: { sound: 'eurobeat.mp3', gif: 'lsd-squidward.webp' },
  scared: { sound: 'anime-scared.mp3', gif: 'scared.webp' },
  shame: { sound: 'shame.mp3', gif: 'homer.webp' },
  congrats: { sound: 'congrats.mp3', gif: 'congrats.webp' },
  giggle: { sound: 'anime-giggle.mp3', gif: 'giggle.webp' },
  dejavu: { sound: 'deja-vu.mp3', gif: 'drift.webp' },
  ohyeah: { sound: 'oh-yeah.MP3', gif: 'oh-yeah.webp' },
  anime: { sound: 'anime-moan-meme.mp3', gif: 'kirby.webp' },
  nightcore: { sound: 'nightcore.mp3', gif: 'dancing-cat.webp' },
  punch: { sound: 'strongpunch.mp3', gif: 'punch.webp' },
  givedamn: { sound: 'dial-up.mp3', gif: 'give-a-damn.webp' }
}
