import { init } from 'snabbdom/build/package/init'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'
import { h } from 'snabbdom/build/package/h'

const patch = init([ // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule // attaches event listeners
])

const container = document.createElement('div')
document.body.appendChild(container)

const vnode = h('div', 'overlay')

// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode)

const eventSource = new EventSource('http://0.0.0.0:4001/connect')

eventSource.onmessage = (e) => {
  const data = JSON.parse(e.data)
  console.log(data)
}
