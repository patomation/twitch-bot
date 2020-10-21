import { commands } from '../commands'
import express, { Request, Response } from 'express'
const app = express()

export const getSoundCommands = app.get('/get-sound-commands', (req: Request, res: Response): void => {
  const soundCommands: string[] = Object.entries(commands).reduce((acc: string[], [key, item]) => {
    if (item.sound) acc.push(key)
    return acc
  }, [])
  res.json({ soundCommands })
})
