import { VNodeStyle } from 'snabbdom/build/package/modules/style'
import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import { voteView } from '../views/vote'
import { State, subscribeTo } from '../store/state'
import { render } from '../lib/render'
import { playAudio } from '../lib/playAudio'
import { alertComplete } from '../store/actions'

const alertView = (alertState: State['alert']): VNode =>
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
      }) : null
  ])

export const route = (): void => {
  subscribeTo('alert', async ({ alert }) => {
    if (alert) {
      let duration = 1000
      if (alert && alert.sound) {
        duration = await playAudio(alert.sound)
      }
      // action for when sound duration complete
      setTimeout(() => {
        alertComplete()
      }, duration)
    }
    render(alertView(alert))
  })
  subscribeTo('vote', ({ vote }) => {
    render(vote ? voteView(vote) : h('div'))
  })
}
