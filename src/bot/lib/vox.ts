import badWordsRegExp from 'badwords/regexp'
import { urlRegExPattern } from '../modules/isUrl'
import { spawn } from 'child_process'

export const vox = (message: string): void => {
  console.log({ message })
  const voiceMessage = message
    .replace(badWordsRegExp, 'expletive')
    .replace(urlRegExPattern, '')

  console.log({ voiceMessage })

  const espeak = spawn('espeak-ng', [voiceMessage])

  espeak.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  espeak.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  espeak.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

/**
 * voxToFile
 * Save a text string to a wav file
 * @param message string
 * @param filePath string !NOTE must be .wav file
 */
export const voxToFile = (message: string, filePath: string): Promise<void> => new Promise((resolve, reject) => {
  const voiceMessage = message
    .replace(badWordsRegExp, 'expletive')
    .replace(urlRegExPattern, '')

  const espeak = spawn('espeak-ng', [voiceMessage, '--stdout', '-w', filePath])

  espeak.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })

  espeak.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
    reject(new Error())
  })

  espeak.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
    resolve()
  })
})
