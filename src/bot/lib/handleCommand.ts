import { commands } from '../commands'
import { readData } from './readData'
import { writeData } from './writeData'
import { client, Context } from '../modules/client'
import { upTime } from '../modules/upTime'
import { vox } from './vox'

import { initiateVote } from './vote'
import { logger } from './logger'
import { sendToClient } from '../api/connect'
import { readSound } from './readSound'
import { readGif } from './readGif'
import { shoutOut } from './shoutout'
import { hello } from './hello'

export const handleCommand = (command: string, args: string[], target: string, context: Context): void => {
  // Help command
  if (command === 'commands') {
    let helpMessage = 'Available Commands: '
    Object.keys(commands).forEach((commandName) => {
      helpMessage += `!${commandName} `
    })
    const extraCommands = [
      '!vox', '!levelup', '!developers', '!hack', '!f', '!uptime'
    ]
    helpMessage += extraCommands.join(' ')
    client.say(target, `${helpMessage}`)
    // client.whisper(context.username, `${helpMessage}`) // not working
  }

  // Allow voting
  if (command === 'vote') initiateVote(args.join(' '))
  // Vote for code clash
  if (
    command === 'clashofcode' ||
    command === 'clash'
  ) initiateVote('Clash of Code?')

  // Let users control vox
  if (command === 'vox') {
    vox(`${context.username} says ${args.join(' ')}`)
  }

  // Shoutout
  if (command === 'so') shoutOut(target, args[0])

  if (command === 'hello') {
    hello(context.username)
  }

  if (Object.prototype.hasOwnProperty.call(commands, command)) {
    const { text, say, sound, gif } = commands[command]

    // handle text commands
    if (text) {
      if (Array.isArray(text)) {
        const randomIndex = Math.floor(Math.random() * text.length)
        client.say(target, text[randomIndex])
      } else {
        client.say(target, text)
      }
    }

    // Handle vox commands
    if (say !== undefined) vox(say)

    // handle alert - sounds and gif
    const alert: Alert = {}
    if (sound) alert.sound = readSound(sound)
    if (gif) alert.gif = readGif(gif)
    if (Object.keys(alert).length > 0) sendToClient({ alert })
  // do not run for custom commands not in commands.ts
  } else if (![
    'commands',
    'uptime',
    'vox',
    'levelup',
    'vote', 'clashofcode', 'clash',
    'so',
    'hello'
  ].includes(command)) {
    if (command.charAt(command.length - 1) === '') return // if there's empty space at the end of the string we don't add the command
    client.say(target, `${context.username} this command doesn't exist unfortunately :( can you tell us more so we can add it?`)
    logger('commands_todo', `!${command} command doesn't exist. and was suggested by ${context.username}\nadditional info:\n`)
  }

  interface User {
    points: number,
    level: number
  }
  interface Users {
    [key: string]: User
  }
  const userModel = {
    points: 1,
    level: 0
  }
  const xpToLevel = 10
  if (command === 'levelup') {
    const dataPath = './data/users.json'
    const data = readData(dataPath) as Users
    const user = context.username

    // Create or update user keys
    data[user] = {
      ...userModel,
      ...(Object.prototype.hasOwnProperty.call(data, user)
        ? data[user]
        : {})
    }

    data[user].points += 1

    data[user].level = Math.floor(data[user].points / xpToLevel)
    const xpRemain = data[user].points - (xpToLevel * data[user].level)
    const xpToNextLevel = xpToLevel - xpRemain
    client.say(target, `@${user} gained 1 experience point and has ${data[user].points} total points. Current Level: ${data[user].level}. Only ${xpToNextLevel} points away from Level ${data[user].level + 1} `)
    writeData(dataPath, data)
  }

  if (command === 'uptime') {
    const minutes = upTime()
    const hours = Math.floor(minutes / 60)
    const min = Math.round(((minutes / 60) - hours) * 60)
    client.say(target, `AdVolKit has been streaming for ${hours} hours and ${min} min`)
  }
}
