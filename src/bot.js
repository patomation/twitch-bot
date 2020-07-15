const dotenv = require('dotenv')
dotenv.config()
const client = require('./modules/client')
const executeCommand = require('./modules/executeCommand')
const say = require('say')
const file = require('./modules/file')
const isSameDay = require('./modules/isSameDay')
const upTime = require('./modules/upTime')
// Stamp the data.json startTime with a new date each time.
// So we can calculate up time
const dataFilePath = './data.json'
const setUpTimeDateStamp = async () => {
  const dataExists = await file.exists(dataFilePath)
  if (!dataExists) {
    await file.writeJson(dataFilePath, {
      startTime: new Date()
    })
  } else {
    const data = await file.readJson(dataFilePath)
    const { startTime } = data
    if (!isSameDay(new Date(startTime), new Date())) {
      // make a new stamp for today
      await file.writeJson(dataFilePath, {
        startTime: new Date()
      })
    }
  }
}
setUpTimeDateStamp()
upTime()

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
