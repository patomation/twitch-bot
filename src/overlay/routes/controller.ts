import { h, VNode } from 'snabbdom'
import { render } from '../lib/render'
import { host } from '../host'

const controllerButtonClick = (command: string): void => {
  fetch(`${host}/trigger-command/${command}`)
}

const view = (soundCommands: string[]): VNode =>
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

export const route = async (): Promise<void> => {
  const response = await fetch(`${host}/get-sound-commands`)
  const { soundCommands } = await response.json()
  render(view(soundCommands))
}

export default route
