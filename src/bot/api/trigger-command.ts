import express, { Request, Response } from 'express'
import { readSound } from '../lib/readSound'
import { sendToClient } from './connect'
import { readGif } from '../lib/readGif'
import { commands } from '../commands'
const app = express()

export const triggerCommand = app.get('/trigger-command/:name', (req: Request, res: Response): void => {
  const { name } = req.params // name of command

  const alert: Alert = {
    override: true // let controller override things
  }
  const { sound, gif } = commands[name]
  if (sound) alert.sound = readSound(sound)
  if (gif) alert.gif = readGif(gif)
  if (Object.keys(alert).length > 0) sendToClient({ alert })

  res.writeHead(200)
  res.end()
})
