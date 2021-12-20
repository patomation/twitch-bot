import fs from 'fs'
import path from 'path'

export const writeData = (filePath: string, data: Record<string, unknown>): void => {
  const resolvedFilePath = path.resolve(filePath)
  // If folder does not exist create them
  if (!fs.existsSync(filePath)) {
    const folderPath = path.dirname(resolvedFilePath)
    // create folder if doesn't exist
    fs.mkdirSync(folderPath, { recursive: true }) // will make nested folders
  }

  fs.writeFileSync(resolvedFilePath, JSON.stringify(data, null, 2))
}
