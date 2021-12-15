import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

export const concatenateSounds = (soundPaths: string[], outPath: string): Promise<void> => new Promise((resolve) => {
  // Create ffmpeg concat txt instruction file
  const concatFilePath = path.resolve('temp', 'concat.txt')
  soundPaths.forEach((soundPath) => {
    fs.appendFileSync(concatFilePath, `file ${soundPath}\r\n`)
  })
  const ffmpeg = exec(`ffmpeg -f concat -safe 0 -i ${concatFilePath} -c copy ${outPath}`)
  ffmpeg.on('exit', () => {
    resolve()
  })
})
