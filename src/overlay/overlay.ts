import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { styleModule, VNodeStyle } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import Delay from './lib/Delay'

import { loadAudio } from './lib/loadAudio'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
])

const container = document.createElement('div')
document.body.appendChild(container)

interface State {
  gif: null | string
}

const state: State = {
  gif: null
}

const view = ({ gif }: typeof state): VNode =>
  h('div', {
    style: {
      fontSize: '10rem',
      position: 'relative'
    }
  }, [
    gif
      ? h('img', {
        props: {
          src: gif
        },
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%'
        } as unknown as VNodeStyle
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

eventSource.onmessage = async (e) => {
  const data = JSON.parse(e.data)
  const { gif, sound } = data
  let { duration = 1000 } = data

  if (sound) {
    // const audio = new Audio(sound)
    const audio = await loadAudio(sound)
    // use audio duration for gif display duration
    duration = audio.duration * 1000 // convert s to ms
    audio.play()
  }

  if (gif) {
    state.gif = gif
    render()
    // Reset gif to null after a time
    resetStateDelay.start(() => {
      state.gif = null
      render()
    }, duration)
  }
}
