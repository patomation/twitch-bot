import badWordsRegExp from 'badwords/regexp'
import { urlRegExPattern } from './isUrl'
import { spawn } from 'child_process'

export default function vox (message: string): void {
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
