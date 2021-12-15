import { VNodeStyle, h, VNode } from 'snabbdom'
import { voteView } from '../views/vote'
import { subscribe } from '../lib/subscribeToEventSource'
import { render } from '../lib/render'
import { playAudio } from '../lib/playAudio'

const alertView = (alertState: Alert): VNode =>
  h('div.container', {
    style: {
      position: 'relative',
      height: '250px',
      fontFamily: 'Sans-Serif'
    }
  }, [
    alertState
      ? h('img.alert', {
        props: {
          src: alertState.gif
        },
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%'
        } as unknown as VNodeStyle
      })
      : null
  ])

let alertQueue: Alert[] = []
let isPlaying = false

const handleNextAlert = () => {
  if (!isPlaying && alertQueue.length > 0) {
    const alert = alertQueue.shift()
    if (alert) {
      isPlaying = true
      startAlert(alert)
    }
  }
}

const playNextAlertNow = () => {
  const alert = alertQueue.shift()
  if (alert) {
    isPlaying = true
    startAlert(alert)
  }
}

/**
 * When the alert gif / sound stops playing
 */
const alertComplete = (): void => {
  stopAlert()
  // Start the next thing
  isPlaying = false
  handleNextAlert()
}

const startAlert = async (alert: Alert) => {
  let duration = 1000
  if (alert && alert.sound) {
    duration = await playAudio(alert.sound)
  }
  // action for when sound duration complete
  setTimeout(() => {
    alertComplete()
  }, duration)
  render(alertView(alert))
}

const stopAlert = () => {
  render(h('div'))
}

export const route = (): void => {
  subscribe(async ({ alert, vote, voteClear }) => {
    if (alert) {
      if (alert.override === true) {
        // TODO stop current sound?
        alertQueue = [
          alert,
          ...alertQueue
        ]
        playNextAlertNow()
      } else {
        alertQueue.push(alert)
        handleNextAlert()
      }
    }

    if (vote) {
      render(voteView(vote))
    } else if (voteClear === true) {
      render(h('div'))
    }
  })
}
