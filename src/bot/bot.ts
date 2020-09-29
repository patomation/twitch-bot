import 'dotenv/config'
import { client } from './modules/client'
import badWordsRegExp from 'badwords/regexp'
import vox from './modules/vox'
import express from 'express'
import cors from 'cors'
import { commands } from './commands'

let eventSourceListener: (command: string) => void

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`)
  vox('beep boop')
})

client.on('message', (target, context, msg, self) => {
  const message = msg.trim()
  if (self) { return } // Ignore messages from the bot
  const isCommand = message.charAt(0) === '!'
  if (isCommand) {
    const command = message.replace('!', '').split(' ')[0]
    const args = message.replace(`!${command} `, '')

    // Help command
    if (command === 'commands') {
      let helpMessage = 'Available Commands: '
      Object.keys(commands).forEach((commandName) => {
        helpMessage += `!${commandName} `
      })
      helpMessage += '!vox'
      client.say(target, `${helpMessage}`)
    // client.whisper(context.username, `${helpMessage}`) // not working
    }

    // Let users control vox
    if (command === 'vox') {
      vox(`${context.username} says ${args}`)
    }

    if (Object.prototype.hasOwnProperty.call(commands, command)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const { text, say } = commands[command]

      // handle text commands
      if (text) client.say(target, text)

      // Handle vox commands
      if (say) vox(say)
    } else {
      // send command over to frontend overlay
      if (eventSourceListener) {
        eventSourceListener(command)
      } else {
        console.log('!!!!!!!!!!!!!!!!!!!!!!! overlay not ready')
      }
    }
  // Handle Messages
  } else {
    // User is saying something
    const textMessage = message.replace(badWordsRegExp, '****')
    console.log(`${context.username}: ${textMessage}`)
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
  eventSourceListener = (command: string) => {
    res.write('data: ' + JSON.stringify({ command }) + '\n\n')
  }
})
const port = 4001
app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}`)
})
