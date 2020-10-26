import { createRouter } from 'routerjs'
import { route as alertRoute } from './routes/alert'
import { route as hackBarRoute } from './routes/hack-bar'
import { route as controllerRoute } from './routes/controller'
import { route as commandMarque } from './routes/commands-marque'
import { route as confettiRoute } from './routes/confetti'

createRouter()
  .get('/alert', alertRoute)
  .get('/hack-bar', hackBarRoute)
  .get('/controller', controllerRoute)
  .get('/commands-marque', commandMarque)
  .get('/confetti', confettiRoute)
  .run()
