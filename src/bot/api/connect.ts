import express, { Request, Response } from 'express'
const app = express()

const listeners: Array<(data: Data) => void> = []

export const connect = app.get('/connect', (req: Request, res: Response): void => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  })

  console.log('^-^ overlay connected ^.^')
  listeners.push((data: Data) => {
    res.write('data: ' + JSON.stringify(data) + '\n\n')
  })
})

export const sendToClient = (payload: Data): void => {
  if (listeners.length > 0) {
    listeners.forEach(listener => {
      listener(payload)
    })
  } else {
    console.log('!!!!!!!!!!!!!!!!!!!!!!! client not ready')
  }
}
