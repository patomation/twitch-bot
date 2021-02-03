import { h } from 'snabbdom/build/package/h'
import { VNodeStyle } from 'snabbdom/build/package/modules/style'
import { VNode } from 'snabbdom/build/package/vnode'
import { render } from '../lib/render'
import { subscribe } from '../lib/subscribeToEventSource'

const view = ({ color }: Background): VNode =>
  h('div.background', {
    style: {
      position: 'relative',
      height: '100%',
      width: '100%',
      fontFamily: 'Sans-Serif',
      color: '#fff',
      opacity: '0',
      transition: 'opacity 1s',
      delayed: {
        opacity: '1'
      },
      remove: {
        opacity: '0'
      }
    } as unknown as VNodeStyle
  }, [
    h('div', {
      style: {
        width: '100%',
        height: '100%',
        backgroundColor: color
      } as unknown as VNodeStyle
    })
  ])

export const route = (): void => {
  render(h('div'))
  subscribe(({ background }) => {
    if (background !== undefined) {
      render(view(background))
      setTimeout(() => {
        console.log('remove')
        render(h('div'))
      }, background.duration || 2000)
    }
  })
}
