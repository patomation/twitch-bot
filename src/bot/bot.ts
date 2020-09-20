import 'dotenv/config'
import { client } from './modules/client'
import executeCommand from './modules/executeCommand'
import badWordsRegExp from 'badwords/regexp'
import vox from './modules/vox'

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
  // Handle Messages
  } else {
    // User is saying something
    const textMessage = message.replace(badWordsRegExp, '****')
    console.log(`${context.username}: ${textMessage}`)
  }
  // Handle Emoticons
})

client.connect()
