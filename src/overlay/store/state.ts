export type State = {
  alert: Alert | null
  vote: null | Data['vote'],
  queue: Data[],
  isPlaying: boolean,
  soundCommands: string[]
}

export let state: State = {
  alert: null,
  vote: null,
  queue: [],
  isPlaying: false,
  soundCommands: []
}

type NextState = {
  [S in keyof State]?: State[S]
}

type Listener = (state: State) => void

type SubscribedListeners = {
  [S in keyof State]?: Listener[]
}

const listeners: Listener[] = []
/**
 * Subscribe to any and all state changes
 * @param listener Function
 */
export const subscribe = (listener: Listener): void => {
  listeners.push(listener)
}

const subscribedListeners: SubscribedListeners = Object.keys(state).reduce((acc: SubscribedListeners, key) => {
  acc[key as keyof State] = []
  return acc
}, {})

/**
 * subscribe to a specific change to a key/item in state
 * @param key string keyof State
 * @param listener Function
 */
export const subscribeTo = (key: keyof State, listener: Listener): void => {
  if (Array.isArray(subscribedListeners[key as keyof State])) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    subscribedListeners[key].push(listener)
  }
}

export const setState = (nextState: NextState): void => {
  state = {
    ...state,
    ...nextState
  }

  // update all subscribers
  listeners.forEach((listener) => {
    listener(state)
  })

  // update specific subscribers
  Object.keys(nextState).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(subscribedListeners, key)) {
      const specificListeners = subscribedListeners[key as keyof State]
      if (specificListeners !== undefined) {
        specificListeners.forEach((listener: Listener) => {
          listener(state)
        })
      }
    }
  })
}
