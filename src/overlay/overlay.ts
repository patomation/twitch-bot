import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { styleModule, VNodeStyle } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import Delay from './lib/Delay'

import { base64ToArrayBuffer } from './lib/base64ToArrayBuffer'

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
      position: 'relative',
      height: '250px'
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

const ctx = new AudioContext()

type Data = {
 gif?: string,
 sound?: string,
 duration?: number
}

let isPlaying = false

const queue: Data[] = []

const tryToPlay = () => {
  if (!isPlaying && queue.length > 0) {
    const data = queue.shift()
    if (data) handlePlay(data)
  }
}

const handlePlay = async (data: Data): Promise<void> => {
  isPlaying = true
  const { gif, sound } = data
  let { duration = 1000 } = data

  if (sound) {
    // Convert response to array buffer
    const arrayBuffer = base64ToArrayBuffer(sound)
    // decode array buffer into audio buffer
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
    const source = ctx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(ctx.destination)
    source.start()
    duration = audioBuffer.duration * 1000
  }

  if (gif) {
    state.gif = gif
    render()
  }

  resetStateDelay.start(() => {
    // Reset gif to null after a time
    state.gif = null
    render()
    // Start the next thing
    isPlaying = false
    tryToPlay()
  }, duration)
}

eventSource.onmessage = async (e) => {
  const data = JSON.parse(e.data) as Data
  queue.push(data)
  tryToPlay()
}
