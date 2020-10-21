import fs from 'fs'
import path from 'path'

/**
 * Looks in assets/gif folder for sound file and returns a data url
 * @param gif file name ie file-name.gif
 * @returns data url base64 string
 */
export const readGif = (gif: string): string =>
  `data:image/gif;base64,${fs.readFileSync(path.resolve('assets', 'gif', gif), { encoding: 'base64' })}`
