import { h, VNode, VNodeStyle } from 'snabbdom'
import { render } from '../lib/render'
import { host } from '../host'

interface Callbacks {
  onTransitionEnd?: () => void,
  onContainerInsert?: (width: number) => void,
  onContentInsert?: (width: number) => void
}
interface State {
  init: boolean
  soundCommands: string[],
  showFirst: boolean,
  showSecond: boolean,
  containerWidth: number,
  contentWidth: number,
  width: number
}

const SPEED = 100

const getView = ({
  onTransitionEnd,
  onContainerInsert,
  onContentInsert
}: Callbacks) => ({
  soundCommands,
  showFirst,
  showSecond,
  containerWidth,
  contentWidth
}: State): VNode => {
  const handleContainerInsert = (vnode: VNode): void => {
    if (onContainerInsert) {
      onContainerInsert((vnode.elm as HTMLElement).offsetWidth)
    }
  }

  const handleContentInsert = (vnode: VNode): void => {
    if (onContentInsert) {
      onContentInsert((vnode.elm as HTMLElement).offsetWidth)
    }
  }

  return h('div.marquee', {
    hook: { insert: handleContainerInsert },
    style: {
      color: '#ffffff',
      background: 'gold',
      fontSize: '2.5rem',
      height: '50px'
    }
  }, [
    showFirst
      ? h('span.marquee__content1', {
        style: {
          position: 'absolute',
          right: `${-contentWidth}px`,
          transition: `right linear ${contentWidth / SPEED}s`,
          delayed: {
            right: '0px'
          },
          remove: {
            transition: `right linear ${containerWidth / SPEED}s`,
            right: `${containerWidth}px`
          }
        } as unknown as VNodeStyle,
        on: {
          ...(onTransitionEnd
            ? {
                transitionend: onTransitionEnd
              }
            : null)
        },
        hook: { insert: handleContentInsert }
      }, soundCommands.map((command) =>
        h('span', { style: { padding: '0 1rem' } }, `!${command}`)))
      : null,
    showSecond
      ? h('span.marquee__content2', {
        style: {
          position: 'absolute',
          right: `-${contentWidth}px`,
          transition: `right linear ${contentWidth / SPEED}s`,
          delayed: {
            right: '0px'
          },
          remove: {
            transition: `right linear ${containerWidth / SPEED}s`,
            right: `${containerWidth}px`
          }
        } as unknown as VNodeStyle,
        on: {
          ...(onTransitionEnd
            ? {
                transitionend: onTransitionEnd
              }
            : null)
        },
        hook: { insert: handleContentInsert }
      }, soundCommands.map((command) =>
        h('span', { style: { padding: '0 1rem' } }, `!${command}`)))
      : null
  ])
}

const state: State = {
  init: true,
  soundCommands: [],
  showFirst: true,
  showSecond: false,
  containerWidth: 1000, // needs to have some sort of default starting width
  contentWidth: 3000, // needs to have some sort of default starting width
  width: 1000
}

const getSoundCommands = async () => {
  const response = await fetch(`${host}/get-sound-commands`)
  const { soundCommands } = await response.json()
  return soundCommands
}

export const getMarqueViewWithState = async (nextView?: (v: VNode) => void): Promise<VNode> => {
  state.soundCommands = await getSoundCommands()
  const view = getView({
    onContainerInsert: (width) => { state.containerWidth = width },
    onContentInsert: (width) => { state.contentWidth = width },
    onTransitionEnd: () => {
      state.showFirst = !state.showFirst
      state.showSecond = !state.showSecond
      if (nextView) {
        nextView(view(state))
      }
    }
  })
  return view(state)
}

export const route = async (): Promise<void> => {
  const view = await getMarqueViewWithState((nextView) => {
    render(nextView)
  })
  render(view)
}

export default route
