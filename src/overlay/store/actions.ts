import { hideVote, showVote, setAlert } from './mutations'

// TODO move into state/mutations
let isPlaying = false

// TODO move into state/mutations
const alertQueue: Alert[] = []

const handleNextAlert = () => {
  if (!isPlaying && alertQueue.length > 0) {
    const alert = alertQueue.shift()
    if (alert) {
      isPlaying = true
      setAlert(alert)
    }
  }
}

/**
 * When the alert gif / sound stops playing
 */
export const alertComplete = (): void => {
  setAlert(null)
  // Start the next thing
  isPlaying = false
  handleNextAlert()
}

export const receiveEventSourceMessage = (data: Data): void => {
  if (Object.prototype.hasOwnProperty.call(data, 'vote')) {
    showVote(data.vote)
  } else if (Object.prototype.hasOwnProperty.call(data, 'voteClear')) {
    hideVote()
  } else if (data.alert) {
    alertQueue.push(data.alert)
    handleNextAlert()
  }
}
