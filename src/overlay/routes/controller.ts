import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import { State, subscribe } from '../store/state'
import { render } from '../lib/render'
import { controllerButtonClick, getSoundCommands } from '../store/actions'

const view = ({ soundCommands }: State): VNode =>
  h('div.controller', {
    style: {
      position: 'relative',
      fontFamily: 'Sans-Serif',
      color: '#fff',
      display: 'grid',
      gridTemplateColumns: `repeat(6, ${100 / 6}%)`,
      background: '#111',
      height: '100%'
    }
  }, soundCommands.map((command) =>
    h('button.controller__button', {
      style: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#ff1fff',
        background: '#221',
        border: 'none',
        margin: '2px',
        borderRadius: '10px',
        overflow: 'hidden'
      },
      on: {
        click: () => controllerButtonClick(command)
      }
    }, command.toUpperCase())
  ))

export const route = (): void => {
  subscribe((state) => {
    render(view(state))
  })
  getSoundCommands()
}
