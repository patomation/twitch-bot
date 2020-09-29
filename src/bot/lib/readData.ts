import fs from 'fs'

export const readData = (filePath: string): Record<string, unknown> => {
  return fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }))
    : {}
}
