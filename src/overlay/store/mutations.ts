import { setState, State } from './state'

export const showVote = (vote: State['vote']): void => {
  setState({ vote })
}

export const hideVote = (): void => {
  setState({
    vote: null
  })
}

export const setAlert = (alert: Alert | null): void => {
  setState({ alert })
}
