import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
const app = express()

export const getVersion = app.get('/get-version', (req: Request, res: Response<{ version: string }>): void => {
  console.log('Nice', path.resolve(__dirname, '../package.json'))
  const { version } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../package.json'), { encoding: 'utf8' }))
  res.json({ version })
})

export default getVersion
