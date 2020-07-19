import 'dotenv/config'
import { client } from './modules/client'
import executeCommand from './modules/executeCommand'
import badWordsRegExp from 'badwords/regexp'
import { exists, readJson, writeJson } from './modules/file'
import isSameDay from './modules/isSameDay'
import upTime from './modules/upTime'
import vox from './modules/vox'
// Stamp the data.json startTime with a new date each time.
// So we can calculate up time
const dataFilePath = './data.json'
const setUpTimeDateStamp = async () => {
  const dataExists = await exists(dataFilePath)
  if (!dataExists) {
    await writeJson(dataFilePath, {
      startTime: new Date()
    })
  } else {
    const data = await readJson(dataFilePath)
    const { startTime } = data
    if (!isSameDay(new Date(startTime as string), new Date())) {
      // make a new stamp for today
      await writeJson(dataFilePath, {
        startTime: new Date()
      })
    }
  }
}
setUpTimeDateStamp()
upTime()

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
