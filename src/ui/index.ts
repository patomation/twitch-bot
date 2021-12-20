import { createRouter } from 'routerjs'
import { VNode, h } from 'snabbdom'
import { render } from './lib/render'
import { routes } from './generated/routes'
import { host } from './host'

/** NAV */
const indexView = ({ version }: {version: string}): VNode =>
  h('div.index', {
    style: {
      position: 'relative',
      fontFamily: 'Sans-Serif',
      color: 'red',
      height: 'auto',
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
    ),
    h('p', { style: { position: 'absolute', top: '1em', right: '1em' } }, version)
  ])

const main = async () => {
  // Get version
  const { version } = await (await fetch(`${host}/get-version`)).json()

  const router = createRouter()
  await Promise.all([
    { path: '', view: () => render(indexView({ version })) },
    ...routes
  ].map(async ({ path, view }) => {
    router.get(path, view)
  }))
  router.run()
}
main()
