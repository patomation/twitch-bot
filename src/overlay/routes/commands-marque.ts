import { h, VNode, VNodeStyle } from 'snabbdom'
import { render } from '../lib/render'
import { host } from '../host'

let state = {
  init: true,
  soundCommands: [],
  showFirst: true,
  showSecond: false,
  containerWidth: 1000, // needs to have some sort of default starting width
  contentWidth: 3000 // needs to have some sort of default starting width
}

const handleFirstTransitionEnd = () => {
  state.showFirst = false
  state.showSecond = true
  render(view(state))
}

const handleSecondTransitionEnd = () => {
  state.showSecond = false
  state.showFirst = true
  render(view(state))
}

const handleContainerInsert = (vnode: VNode): void => {
  state.containerWidth = (vnode.elm as HTMLElement).offsetWidth
}

const handleContentInsert = (vnode: VNode): void => {
  state.contentWidth = (vnode.elm as HTMLElement).offsetWidth
}

const speed = 100

const view = ({ soundCommands, showFirst, showSecond, containerWidth, contentWidth }: typeof state): VNode =>
  h('div.marquee', {
    hook: { insert: handleContainerInsert },
    style: {
      color: '#ffffff',
      fontSize: '2.5rem'
    }
  }, [
    showFirst
      ? h('span.marquee__content1', {
        style: {
          position: 'absolute',
          right: `${-contentWidth}px`,
          transition: `right linear ${contentWidth / speed}s`,
          delayed: {
            right: '0px'
          },
          remove: {
            transition: `right linear ${containerWidth / speed}s`,
            right: `${containerWidth}px`
          }
        } as unknown as VNodeStyle,
        on: { transitionend: handleFirstTransitionEnd },
        hook: { insert: handleContentInsert }
      }, soundCommands.map((command) =>
        h('span', { style: { padding: '0 1rem' } }, `!${command}`)))
      : null,
    showSecond
      ? h('span.marquee__content2', {
        style: {
          position: 'absolute',
          right: `-${contentWidth}px`,
          transition: `right linear ${contentWidth / speed}s`,
          delayed: {
            right: '0px'
          },
          remove: {
            transition: `right linear ${containerWidth / speed}s`,
            right: `${containerWidth}px`
          }
        } as unknown as VNodeStyle,
        on: { transitionend: handleSecondTransitionEnd },
        hook: { insert: handleContentInsert }
      }, soundCommands.map((command) =>
        h('span', { style: { padding: '0 1rem' } }, `!${command}`)))
      : null
  ])

export const route = async (): Promise<void> => {
  const response = await fetch(`${host}/get-sound-commands`)
  const { soundCommands } = await response.json()
  state = { ...state, soundCommands }
  render(view(state))
}
