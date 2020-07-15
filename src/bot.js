const dotenv = require('dotenv')
dotenv.config()
const client = require('./modules/client')
const executeCommand = require('./modules/executeCommand')
const say = require('say')

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`)
  say.speak('chat bot systems ACTIVATED')
})

client.on('message', (target, context, msg, self) => {
  if (self) { return } // Ignore messages from the bot
  const command = msg.trim().replace('!', '')
  executeCommand(client, target, context, command)
})

client.connect()
