/**
 * https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
 * @param base64 base 64 string
 */
export const base64ToArrayBuffer = (base64: string): ArrayBufferLike => {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}
