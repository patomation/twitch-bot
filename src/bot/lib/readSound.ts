import fs from 'fs'
import path from 'path'

/**
 * Looks in assets/sounds folder for sound file and returns a base64 string
 * @param sound file name ie sound-name.mp3
 * @returns base64 string
 */
export const readSound = (sound: string): string =>
  fs.readFileSync(path.resolve('assets', 'sounds', sound), { encoding: 'base64' })
