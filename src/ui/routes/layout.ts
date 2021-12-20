import { h, VNode } from 'snabbdom'
import { render } from '../lib/render'
import { getAlertView } from './alert'
import { getMarqueViewWithState } from './commands-marque'

interface State {
  marqueView: VNode | null
  alertView: VNode | null
}

const view = ({
  marqueView,
  alertView
}: State) =>
  h('main.16x9', {
    style: {
      width: '100%',
      paddingBottom: '56.25%',
      position: 'relative'
    }
  }, [
    h('section', {
      style: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        fontFamily: 'Sans-Serif',
        color: '#fff',
        background: 'gold',
        display: 'flex',
        flexDirection: 'column'
      }
    }, [
      h('section', {
        style: {
          background: 'magenta',
          flexGrow: '1',
          display: 'flex'
        }
      }, [
        h('span', {
          style: {
            flexGrow: '1',
            display: 'inline-block',
            fontFamily: 'Sans-Serif',
            color: 'white',
            background: 'blue'
          }
        }, ['screen', 'nice', alertView]),
        h('span', {
          style: {
            width: '20%',
            display: 'inline-block',
            fontFamily: 'Sans-Serif',
            color: 'red',
            background: 'purple'
          }
        }, ['chat'])
      ]),
      h('div', {
        style: {
          height: '50px',
          fontFamily: 'Sans-Serif',
          color: 'gold',
          background: 'green'
        }
      }, [
        marqueView
      ])
    ])
  ])

const main = async () : Promise<void> => {
  const state: State = {
    marqueView: null,
    alertView: null
  }
  state.marqueView = await getMarqueViewWithState((next) => {
    state.marqueView = next
    render(view(state))
  })
  state.alertView = getAlertView((next): void => { state.alertView = next })
  render(view(state))
}

export default main
