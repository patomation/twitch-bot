import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'

export const prepareTempFolder = (): void => {
  rimraf.sync(path.resolve('temp'))
  fs.mkdirSync(path.resolve('temp'))
}
