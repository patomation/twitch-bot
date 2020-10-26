import { host } from '../host'

export const subscribe = (callback: (data: Data) => void): void => {
  const eventSource = new EventSource(`${host}/connect`)
  eventSource.onmessage = async (e) => {
    const data = JSON.parse(e.data) as Data
    console.log('message', { data })
    callback(data)
  }
}
