import { VNode } from 'snabbdom/build/package/vnode'
import { patch } from './patch'

const container = document.createElement('div')
document.body.appendChild(container)

let vnode: VNode = container as unknown as VNode
export const render = (view: VNode): void => {
  vnode = patch(vnode, view)
}
