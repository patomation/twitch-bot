import { createRouter } from 'routerjs'
import { receiveEventSourceMessage } from './store/actions'
import { route as alertRoute } from './routes/alert'
import { route as hackBarRoute } from './routes/hack-bar'
import { route as controllerRoute } from './routes/controller'
import { route as commandMarque } from './routes/commands-marque'
import { host } from './host'

createRouter()
  .get('/alert', alertRoute)
  .get('/hack-bar', hackBarRoute)
  .get('/controller', controllerRoute)
  .get('/commands-marque', commandMarque)
  .run()

const eventSource = new EventSource(`${host}/connect`)

eventSource.onmessage = async (e) => {
  const data = JSON.parse(e.data) as Data
  receiveEventSourceMessage(data)
}
