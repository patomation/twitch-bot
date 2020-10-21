import { setState } from './state'

export const showVote = (vote: Vote): void => {
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

export const setSoundCommands = (soundCommands: string[]): void => {
  setState({ soundCommands })
}
