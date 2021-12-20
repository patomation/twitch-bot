import { base64ToArrayBuffer } from './base64ToArrayBuffer'

const ctx = new AudioContext()

/**
 * @param sound base64 string audio data buffer
 * @return Promise number - duration of sound sample in ms
 */
export const playAudio = async (sound: string): Promise<number> => {
  // Convert response to array buffer
  const arrayBuffer = base64ToArrayBuffer(sound)
  // decode array buffer into audio buffer
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer)
  const source = ctx.createBufferSource()
  source.buffer = audioBuffer
  source.connect(ctx.destination)
  source.start()

  return audioBuffer.duration * 1000
}
