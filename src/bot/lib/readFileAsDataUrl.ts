import fs from 'fs'
import path from 'path'

const mimeType = (filePath: string): string => {
  const ext = path.extname(filePath)
  const mainType =
    ext === 'mp3'
      ? 'audio'
      : 'image'
  const subType =
    ext === 'mp3'
      ? 'mpeg'
      : ext
  return `${mainType}/${subType}`
}

/**
 * read a file as a data url synchronous
 * @param filePath file path including extension
 * @return data url string
 */
export const readFileAsData = (filePath: string): string => {
  const base64 = fs.readFileSync(filePath, { encoding: 'base64' })
  return `data:${mimeType(filePath)};base64,${base64}`
}
