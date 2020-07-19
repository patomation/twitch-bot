import { readJson } from './file'

const dataFilePath = './data.json'
export default async function upTime (): Promise<number> {
  return new Promise((resolve) => {
    readJson(dataFilePath)
      .then((data) => {
        const start = new Date(data.startTime as number)
        const now = new Date()
        let diff = (start.getTime() - now.getTime()) / 1000
        diff /= 60
        const upTimeMin = Math.abs(Math.round(diff))
        resolve(upTimeMin)
      })
  })
}
