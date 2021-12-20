import fs from 'fs'
import path from 'path'
import { readGreeting } from './readGreeting'
import { sendToClient } from '../api/connect'
import { voxToFile } from './vox'
import { convertWavToMp3 } from './convertWavToMp3'
import { concatenateSounds } from './concatenateSounds'
import { prepareTempFolder } from './prepareTempFolder'
/**
 * Play a custom audio message for user if it exists
 * otherwise fallback to vox
 * @param userName string
 */
export const hello = async (userName: string): Promise<void> => {
  const userNameSound = `${userName.toLowerCase()}.mp3`
  if (fs.existsSync(path.resolve('assets', 'greetings', userNameSound))) {
    const alert = {
      sound: readGreeting(userNameSound)
    }
    sendToClient({ alert })
  } else {
    // respond with regular voice + generated vox user name
    prepareTempFolder()

    const userNameWavPath = path.resolve('temp', 'user-name-temp.wav')
    const userNameMp3Path = path.resolve('temp', 'user-name-temp.mp3')
    await voxToFile(userName, userNameWavPath)
    await convertWavToMp3(userNameWavPath, userNameMp3Path)
    await concatenateSounds([
      path.resolve('assets', 'greetings', 'default_hello.mp3'),
      userNameMp3Path,
      path.resolve('assets', 'greetings', 'default_welcome.mp3')
    ], path.resolve('temp', 'default-greeting.mp3'))

    const sound = fs.readFileSync(path.resolve('temp', 'default-greeting.mp3'), { encoding: 'base64' })
    sendToClient({ alert: { sound } })
  }
}
