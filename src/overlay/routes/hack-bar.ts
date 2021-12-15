import { h, VNode } from 'snabbdom'
import { subscribe } from '../lib/subscribeToEventSource'
import { render } from '../lib/render'

const view = (): VNode =>
  h('div.hack', {
    style: {
      position: 'relative',
      height: '250px',
      fontFamily: 'Sans-Serif',
      color: '#fff'
    }
  }, [
    h('div.hack__title', 'Warning, stream hacking in progress...')
  ])

export const route = (): void => {
  subscribe(() => {
    render(view())
  })
  render(view())
}
