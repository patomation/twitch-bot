import { VNode } from 'snabbdom'
import { patch } from './patch'

const container = document.createElement('div')
document.body.appendChild(container)

let oldVnode: VNode = container as unknown as VNode
export const render = (vnode: VNode): void => {
  oldVnode = patch(oldVnode, vnode)
}
