import { createRouter } from 'routerjs'
import { VNode, h } from 'snabbdom'
import { render } from './lib/render'
import { routes } from './generated/routes'

/** NAV */
const indexView = (): VNode =>
  h('div.index', {
    style: {
      position: 'relative',
      fontFamily: 'Sans-Serif',
      color: 'red',
      width: '100%',
      background: 'gold',
      padding: '4em'
    }
  }, [
    h('h3', 'SPACE RAMEN BOT'),
    h('h1', 'Overlay'),
    ...routes.map(({ path }) =>
      h('a', {
        props: {
          href: path
        },
        style: {
          display: 'block',
          textDecoration: 'none'
        }
      }, path)
    )
  ])

const main = async () => {
  const router = createRouter()
  await Promise.all([
    { path: '', view: () => render(indexView()) },
    ...routes
  ].map(async ({ path, view }) => {
    router.get(path, view)
  }))
  router.run()
}
main()
