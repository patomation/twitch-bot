export type State = {
  alert: Alert | null
  vote: null | Data['vote'],
  queue: Data[],
  isPlaying: boolean
}

export let state: State = {
  alert: null,
  vote: null,
  queue: [],
  isPlaying: false
}

type NextState = {
  [S in keyof State]?: State[S]
}

type Listener = (state: State) => void

type SpecificListeners = {
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

const specificListeners: SpecificListeners = {}
/**
 * subscribe to a specific change to a key/item in state
 * @param key string keyof State
 * @param listener Function
 */
export const subscribeTo = (key: keyof State, listener: Listener): void => {
  const prevListeners = specificListeners[key]

  if (prevListeners === undefined) {
    specificListeners[key] = [
      ...(prevListeners !== undefined ? prevListeners : []),
      listener
    ]
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
    if (Object.prototype.hasOwnProperty.call(specificListeners, key)) {
      // Todo do this the proper way without this ts hack
      const specificListener = (specificListeners as unknown as Record<string, unknown>)[key] as Listener[]
      specificListener.forEach((listener: Listener) => {
        listener(state)
      })
    }
  })
}
