import fs from 'fs'

export const writeData = (filePath: string, data: Record<string, unknown>): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}
