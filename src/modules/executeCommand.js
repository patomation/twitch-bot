const upTime = require('./upTime')
const vox = require('./vox')

const beerMl = 0

// -----------
// GMTK Game Jam 2020
// - July 10th - deadline: 48hr
// https://itch.io/jam/gmtk-2020
// -----------
const gameJamContent = () => `
Up Coming Game JAMS:
js13kgames
 - 13:00 CEST, 13th August - deadline: 1mth
http://js13kgames.com
`

const executeCommand = (client, target, context, commandString) => {
  const availableCommands = {
    commands: () => {
      let message = 'Available Commands: '
      Object.keys(availableCommands).forEach((command) => {
        // Ignore this command
        if (command !== 'commands') {
          message += `!${command} `
        }
      })
      client.whisper(context.username, `${message}`)
    },
    uptime: async () => {
      const upTimeMin = await upTime()
      const hours = Math.floor(upTimeMin / 60)
      const min = Math.round(((upTimeMin / 60) - hours) * 60)
      client.say(target, `AdVolKit has been streaming for ${hours} hours and ${min} min`)
    },
    hello: () => {
      client.say(target, `Hello ${context.username}!`)
    },
    beer: () => {
      client.say(target, `${beerMl} ml of Beer consumed`)
    },
    salt: () => {
      client.say(target, 'SALTY SALTY')
    },
    gamejams: () => {
      client.say(target, gameJamContent())
    },
    discord: () => {
      client.say(target, 'https://discord.gg/ttbJuve')
    },
    freehosting: () => {
      client.say(target, 'https://app.netlify.com')
    },
    twitter: () => {
      client.say(target, 'https://twitter.com/advolkit')
    },
    youtube: () => {
      client.say(target, 'https://www.youtube.com/channel/UC3awU4-KQM65bgqjeKc2fCA')
    },
    instagram: () => {
      client.say(target, 'https://www.instagram.com/advolkit/')
    },
    vscodetheme: () => {
      client.say(target, 'SynthWave 84 | https://github.com/robb0wen/synthwave-vscode')
    },
    match3hell: () => {
      client.say(target, 'Match3hell dev: https://match3hell.com/ itch: https://advolkit.itch.io/match3hell?dev=true ')
    },
    game: () => {
      client.say(target, 'The game is match3Hell: https://advolkit.itch.io/match3hell')
    },
    botsource: () => {
      client.say(target, 'See my insides: https://github.com/patomation/twitch-bot')
    },
    vox: (message) => {
      vox(`${context.username} says ${message}`)
    },
    hype: (message) => {
      vox('HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE HYPE')
    },
    laugh: () => {
      vox(':e: :e: :e: :o: :o: :o: :a: :a: :a: :a:')
    }
  }
  const commandName = commandString.split(' ')[0]
  const args = commandString.replace(commandName + ' ', '')
  const hasCommand = Object.prototype.hasOwnProperty.call(availableCommands, commandName)
  console.log('commandName', commandName)
  if (hasCommand) {
    availableCommands[commandName](args)
    console.log(`* Executed !${commandName} command`)
  } else {
    console.log(`* Unknown command !${commandName}`)
  }
}

module.exports = executeCommand
