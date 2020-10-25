import { host } from '../host'
import { hideVote, showVote, setAlert, setSoundCommands } from './mutations'

// TODO move into state/mutations
let isPlaying = false

// TODO move into state/mutations
let alertQueue: Alert[] = []

const handleNextAlert = () => {
  if (!isPlaying && alertQueue.length > 0) {
    const alert = alertQueue.shift()
    if (alert) {
      isPlaying = true
      setAlert(alert)
    }
  }
}

const playNextAlertNow = () => {
  const alert = alertQueue.shift()
  if (alert) {
    isPlaying = true
    setAlert(alert)
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
    showVote(data.vote as Vote)
  } else if (Object.prototype.hasOwnProperty.call(data, 'voteClear')) {
    hideVote()
  } else if (data.alert) {
    if (data.alert.override === true) {
      // TODO stop current sound?
      alertQueue = [
        data.alert,
        ...alertQueue
      ]
      playNextAlertNow()
    } else {
      alertQueue.push(data.alert)
      handleNextAlert()
    }
  }
}

export const controllerButtonClick = (command: string): void => {
  fetch(`${host}/trigger-command/${command}`)
}

export const getSoundCommands = async (): Promise<void> => {
  const response = await fetch(`${host}/get-sound-commands`)
  const { soundCommands } = await response.json()
  setSoundCommands(soundCommands)
}
