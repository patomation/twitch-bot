import 'dotenv/config'
import { client } from './modules/client'
import { upTimeStamp } from './modules/upTime'
import badWordsRegExp from 'badwords/regexp'
import { vox } from './lib/vox'
import { keywords } from './keywords'
import { handleCommand } from './lib/handleCommand'
import { castVote } from './lib/vote'
import { logger } from './lib/logger'
import { includesWord } from './lib/includesWord'
import { getCommands } from './lib/getCommands'

import express from 'express'
import cors from 'cors'

import { connect } from './api/connect'
import { triggerCommand } from './api/trigger-command'
import { getSoundCommands } from './api/get-sound-commands'
import { giveExperiencePoints } from './lib/experiencePoints'
import getVersion from './api/get-version'

upTimeStamp()

const app = express()
const port = 4001
app.use(cors())
  .use(connect)
  .use(triggerCommand)
  .use(getSoundCommands)
  .use(getVersion)
  .listen(port, () => {
    console.log(`CORS-enabled web server listening on port ${port}`)
  })

client.on('connected', (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`)
})

client.on('message', (target, context, msg, self) => {
  /**
   * =========================
   *  Give gives everyone XP
   * ========================
   */
  giveExperiencePoints(context, target, 1, 0.10) // 9.10 === One Shilling

  const message = msg.trim()
  if (self) { return } // Ignore messages from the bot

  // find all commands
  const commands = getCommands('!', message)

  // Handle casting votes
  if (message === '1' || message === '2') {
    castVote(context.username, parseInt(message))
  }

  // Handle Commands
  if (commands.length > 0) {
    commands.forEach(({ command, args }) => {
      handleCommand(command, args, target, context)
    })

  // Handle Messages
  } else if (message !== undefined) {
    // User is saying something
    const textMessage = message.replace(badWordsRegExp, '****')
    console.log(`${context.username}: ${textMessage}`)
    logger('chat_log', `${context.username}: ${textMessage}`)
    // pick up on keywords
    Object.keys(keywords).forEach((word) => {
      if (includesWord(message, word)) {
        const { text, say } = keywords[word]
        if (Array.isArray(text)) {
          const randomIndex = Math.floor(Math.random() * text.length)
          client.say(target, `@${context.username} ${text[randomIndex]}`)
        } else if (text !== undefined) {
          client.say(target, `@${context.username} ${text}`)
        }
        if (say !== undefined) vox(say)
      }
    })
  }

  // Handle specific user messages
  getCommands('@', message).forEach(({ command }) => {
    const userName = command.toLowerCase()
    // const userMessage = args.join(' ')
    if (userName === process.env.BOT_USERNAME) {
      client.say(target, 'no you')
    }
  })
  // TODO: Handle Emoticons
})

client.connect()
