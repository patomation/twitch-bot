import { exec } from 'child_process'

export const convertWavToMp3 = (wavPath: string, mp3Path: string): Promise<string> => new Promise((resolve) => {
  const ffmpeg = exec(`ffmpeg -i ${wavPath} -af "pan=stereo|c0=c0|c1=c0" -f mp2 ${mp3Path}`)
  ffmpeg.on('exit', () => {
    resolve()
  })
})
