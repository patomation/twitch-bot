import { readData } from './readData'
import { client, Context } from '../modules/client'
import { writeData } from './writeData'

interface User {
  points: number,
  level: number
  advolkitCoin: number
}
interface Users {
  [key: string]: User
}
const userModel = {
  points: 1,
  level: 0,
  advolkitCoin: 0
}
const xpToLevel = 1000

export const giveExperiencePoints = (context: Context, target: string, points: number, advolkitCoin?: number, verbose = false): void => {
  const dataPath = './data/users.json'
  const data = readData(dataPath) as Users
  const user = context.username

  // Create or update user keys
  data[user] = {
    ...userModel,
    ...(Object.prototype.hasOwnProperty.call(data, user)
      ? data[user]
      : {})
  }

  data[user].points += points
  if (advolkitCoin) {
    data[user].advolkitCoin += advolkitCoin
  }
  data[user].level = Math.floor(data[user].points / xpToLevel)
  const xpRemain = data[user].points - (xpToLevel * data[user].level)
  const xpToNextLevel = xpToLevel - xpRemain
  if (verbose) {
    client.say(target, `@${user} gained 1 experience point and has ${data[user].points} total points. Current Level: ${data[user].level}. Only ${xpToNextLevel} points away from Level ${data[user].level + 1} `)
  }
  writeData(dataPath, data)
}
