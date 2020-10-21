import { handleCommand } from '../lib/handleCommand'
import express, { Request, Response } from 'express'
const app = express()

export const triggerCommand = app.get('/trigger-command/:name', (req: Request, res: Response): void => {
  const { name } = req.params // name of command
  handleCommand(name, [], 'advolkit', { username: 'advolkit' })

  res.writeHead(200)
  res.end()
})
