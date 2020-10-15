import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { styleModule, VNodeStyle } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import Delay from './lib/Delay'

import { base64ToArrayBuffer } from './lib/base64ToArrayBuffer'
import { voteView } from './views/vote'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
])

const container = document.createElement('div')
document.body.appendChild(container)

interface State {
  gif: null | string,
  vote: null | Data['vote']
}

const state: State = {
  gif: null,
  vote: null
}

const view = ({ gif, vote }: typeof state): VNode =>
  h('div', {
    style: {
      position: 'relative',
      height: '250px',
      fontFamily: 'Sans-Serif'
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
      }) : null,
    vote ? voteView(vote) : null
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
  if (Object.prototype.hasOwnProperty.call(data, 'vote')) {
    state.vote = data.vote
    state.gif = null // stop a gif animation
    render()
  } else if (Object.prototype.hasOwnProperty.call(data, 'voteClear')) {
    state.vote = null
    render()
  } else {
    queue.push(data)
    tryToPlay()
  }
}
