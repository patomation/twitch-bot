import 'dotenv/config'
import { client } from './modules/client'
import executeCommand from './modules/executeCommand'
import badWordsRegExp from 'badwords/regexp'
import vox from './modules/vox'
import express from 'express'
import cors from 'cors'

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
    const command = message.replace('!', '')
    executeCommand(client, target, context, command)
    // send command over to frontend
    eventSourceListener(command)
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
