import express from 'express'
import cors from 'cors'

let triggerEvent: (data: Data) => void

export const sendToOverlay = (payload: Data): void => {
  if (triggerEvent) {
    triggerEvent(payload)
  } else if (!sendToOverlay) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!! overlay not ready')
  }
}

export const connectOverlay = (): void => {
  const app = express()
  app.use(cors())
  app.get('/connect', (req, res) => {
    res.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    })

    console.log('^-^ overlay connected ^.^')
    triggerEvent = (data: Data) => {
      res.write('data: ' + JSON.stringify(data) + '\n\n')
    }
  })
  const port = 4001
  app.listen(port, () => {
    console.log(`CORS-enabled web server listening on port ${port}`)
  })
}
