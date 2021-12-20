import { host } from '../host'
import { View } from '../types/View'
import { render } from './render'

export const subscribe = (callback: (data: Data) => void): void => {
  const eventSource = new EventSource(`${host}/connect`)
  eventSource.onmessage = async (e) => {
    const data = JSON.parse(e.data) as Data
    console.log('message', { data })
    callback(data)
  }
}

export const subscribeAndRender = (
  view: View
) => (): void => {
  subscribe((data) => {
    render(view(data))
  })
  render(view())
}
