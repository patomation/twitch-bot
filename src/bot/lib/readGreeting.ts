import fs from 'fs'
import path from 'path'

/**
 * Looks in assets/sounds folder for sound file and returns a base64 string
 * @param userName file name ie sound-name.mp3
 * @returns base64 string
 */
export const readGreeting = (userName: string): string =>
  fs.readFileSync(path.resolve('assets', 'greetings', userName), { encoding: 'base64' })
