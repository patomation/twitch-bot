import { readData } from '../lib/readData'
import { writeData } from '../lib/writeData'
import isSameDay from '../modules/isSameDay'

const dataFilePath = './data/stream-stats.json'

/**
 * Stamp the data.json startTime with a new date each time.
 * So we can calculate up time
 */
export const upTimeStamp = (): void => {
  const { startTime } = readData(dataFilePath)
  if (!isSameDay(new Date(startTime as string), new Date())) {
    // make a new stamp for today
    writeData(dataFilePath, {
      startTime: new Date()
    })
  }
}

/**
 * @returns upTime in minutes
 */
export const upTime = (): number => {
  const data = readData(dataFilePath)
  const start = new Date(data.startTime as number)
  const now = new Date()
  let diff = (start.getTime() - now.getTime()) / 1000
  diff /= 60
  return Math.abs(Math.round(diff))
}
