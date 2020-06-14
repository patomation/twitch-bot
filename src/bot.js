const dotenv = require('dotenv')
dotenv.config()
const client = require('./modules/client')
const executeCommand = require('./modules/executeCommand')

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
})

client.on('message', (target, context, msg, self) => {
  if (self) { return; } // Ignore messages from the bot
  const command = msg.trim().replace('!', '')
  executeCommand(client, target, command)
})

client.connect()
