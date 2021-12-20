import fs from 'fs'
import path from 'path'

export const logger = (logName: string, text: string): void => {
  const logPath = path.resolve(`./logs/${logName}.txt`)

  // If folder and file don't exist create them
  if (!fs.existsSync(logPath)) {
    const folderPath = path.dirname(logPath)
    // create folder if doesn't exist
    fs.mkdirSync(folderPath, { recursive: true }) // will make nested folders
    // create file if does not exist
    fs.writeFileSync(logPath, '')
  }

  fs.appendFileSync(logPath, `\n${text}`)
}
