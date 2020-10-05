/**
 * A promise that returns the audio object when the meta data is finished loading
 * Allowing properly getting the audio.duration
 * @param sound url string / data url
 * @returns promise HTMLAudioElement
 */
export const loadAudio = (sound: string): Promise<HTMLAudioElement> => {
  return new Promise((resolve) => {
    const audio = new Audio(sound)
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio)
    })
  })
}
