import 'dotenv/config'
import { client } from './modules/client'
import badWordsRegExp from 'badwords/regexp'
import vox from './modules/vox'
import express from 'express'
import cors from 'cors'
import { commands } from './commands'
import { keywords } from './keywords'
import { readData } from './lib/readData'
import { writeData } from './lib/writeData'
import { readFileAsData } from './lib/readFileAsDataUrl'
import path from 'path'

interface Data {
  sound?: string // data/url
  gif?: string // dta/url
}
let sendToOverlay: (data: Data) => void

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`)
  // vox('beep boop')
})

client.on('message', (target, context, msg, self) => {
  const message = msg.trim()
  if (self) { return } // Ignore messages from the bot
  const isCommand = message.charAt(0) === '!'
  if (isCommand && message !== undefined) {
    const command = message.replace('!', '').split(' ')[0]
    const args = message.replace(`!${command} `, '')

    // Help command
    if (command === 'commands') {
      let helpMessage = 'Available Commands: '
      Object.keys(commands).forEach((commandName) => {
        helpMessage += `!${commandName} `
      })
      const extraCommands = [
        '!vox', '!levelup', '!developers', '!hack', '!f'
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

      if (sound) payload.sound = readFileAsData(path.resolve('assets', 'sounds', sound))
      if (gif) payload.gif = readFileAsData(path.resolve('assets', 'gif', gif))

      if (sendToOverlay && Object.keys(payload).length > 0) {
        sendToOverlay(payload)
      } else if (!sendToOverlay) {
        console.log('!!!!!!!!!!!!!!!!!!!!!!! overlay not ready')
      }
    } else {
      // TODO log commands not found into data/commands-todo.txt or something
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
  // Handle Messages
  } else if (message !== undefined) {
    // User is saying something
    const textMessage = message.replace(badWordsRegExp, '****')
    console.log(`${context.username}: ${textMessage}`)

    // pick up on keywords
    Object.keys(keywords).forEach((word) => {
      if (message.includes(word)) {
        const { text, say } = keywords[word]
        if (Array.isArray(text)) {
          const randomIndex = Math.floor(Math.random() * text.length)
          client.say(target, text[randomIndex])
        } else if (text !== undefined) {
          client.say(target, text)
        }
        if (say !== undefined) vox(say)
      }
    })
  }
  // Handle Emoticons
})

client.connect()

const app = express()
app.use(cors())
app.get('/connect', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  })

  sendToOverlay = (data: Data) => {
    res.write('data: ' + JSON.stringify(data) + '\n\n')
  }
})
const port = 4001
app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}`)
})
