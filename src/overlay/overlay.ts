import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import Delay from './lib/Delay'

import { commands } from './commands'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
])

const container = document.createElement('div')
document.body.appendChild(container)

const state = {
  gif: null
}

const view = ({ gif }: typeof state): VNode =>
  h('div', {
    style: {
      fontSize: '10rem',
      color: 'red'
    }
  }, [
    gif
      ? h('img', {
        props: {
          src: gif
        }
      }) : null
  ])

let vnode: VNode
const render = (): void => {
  if (vnode === undefined) vnode = container as unknown as VNode
  vnode = patch(vnode, view(state))
}

render()

const eventSource = new EventSource('http://0.0.0.0:4001/connect')

const resetStateDelay = new Delay()

eventSource.onmessage = (e) => {
  const { command } = JSON.parse(e.data)

  if (Object.prototype.hasOwnProperty.call(commands, command)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { gif, sound, duration } = commands[command]
    const audio = new Audio(sound)
    audio.play()
    state.gif = gif
    render()
    resetStateDelay.start(() => {
      console.log('delay')
      state.gif = null
      render()
    }, duration)
  }
}
