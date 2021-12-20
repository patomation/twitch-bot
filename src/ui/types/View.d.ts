import { VNode } from 'snabbdom'

export type View<D = Data> = (data?: D) => VNode
