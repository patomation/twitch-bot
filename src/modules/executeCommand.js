const say = require('say')
const badWordsRegExp = require('badwords/regexp')

const beerMl = 0

const gameJamContent = () => `
Up Coming Game JAMS:
 -----------
GMTK Game Jam 2020
 - July 10th - deadline: 48hr
https://itch.io/jam/gmtk-2020
 -----------
js13kgames
 - 13:00 CEST, 13th August - deadline: 1mth
http://js13kgames.com
`

const executeCommand = (client, target, context, commandName) => {
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
    }
  }

  const isCommand = Object.prototype.hasOwnProperty.call(availableCommands, commandName)

  if (isCommand) {
    availableCommands[commandName]()
    console.log(`* Executed !${commandName} command`)
  } else {
    // User is saying something
    const message = commandName.replace(badWordsRegExp, 'expletive')
    console.log(`* Unknown command !${commandName}`)
    say.speak(`${context.username} says ${message}`)
  }
}

module.exports = executeCommand
