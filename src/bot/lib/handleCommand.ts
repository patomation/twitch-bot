import { commands } from '../commands'
import { readData } from './readData'
import { writeData } from './writeData'
import { client, Context } from '../modules/client'
import { upTime } from '../modules/upTime'
import vox from '../modules/vox'

import fs from 'fs'
import path from 'path'
import { sendToOverlay } from './overlayEventSource'

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

  // Let users control vox
  if (command === 'vox') {
    vox(`${context.username} says ${args}`)
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

    // handle sounds and gif
    const payload: Data = {}
    if (sound) payload.sound = fs.readFileSync(path.resolve('assets', 'sounds', sound), { encoding: 'base64' })
    if (gif) payload.gif = `data:image/gif;base64,${fs.readFileSync(path.resolve('assets', 'gif', gif), { encoding: 'base64' })}`
    if (Object.keys(payload).length > 0) sendToOverlay(payload)
  } else {
    if (command.charAt(command.length - 1) === '') return // if there's empty space at the end of the string we don't add the command
    client.say(target, `${context.username} this command doesn't exist unfortunately :( can you tell us more so we can add it?`)
    fs.appendFile('src/bot/lib/commands-todo.txt', `!${command} command doesn't exist. and was suggested by ${context.username}\naddiotnal info:\n\n`, (err) => {
      if (err) throw err

      console.log('new command added')
    })
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
