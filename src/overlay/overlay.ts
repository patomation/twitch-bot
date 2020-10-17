import { createRouter } from 'routerjs'
import { receiveEventSourceMessage } from './store/actions'
import { route as alertRoute } from './routes/alert'
import { route as hackBarRoute } from './routes/hack-bar'

createRouter()
  .get('/alert', alertRoute)
  .get('/hack-bar', hackBarRoute)
  .run()

const eventSource = new EventSource('http://0.0.0.0:4001/connect')

eventSource.onmessage = async (e) => {
  const data = JSON.parse(e.data) as Data
  receiveEventSourceMessage(data)
}
