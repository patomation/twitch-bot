import * as fs from 'fs'
import mkdirp from 'mkdirp'
import { dirname } from 'path'

export const isDir = (filePath: string): boolean =>
  fs.lstatSync(filePath).isDirectory()

// Check if file exists
export const exists = (filePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err) // return boolean
    })
  })
}

export const read = (filePath: string, encoding?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) reject(err)
      // If no file access error - Read file
      resolve((fs.readFileSync(filePath, encoding as null) as unknown) as string)
    })
  })
}

export const readdir = (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

export const readJson = (filePath: string): Promise<Record<string, unknown>> => {
  return new Promise((resolve) => {
    read(filePath, 'utf-8').then((data) => {
      resolve(JSON.parse(data))
    })
  })
}

export const writeJson = (filePath: string, json: Record<string, unknown>): Promise<string> => {
  return write(filePath, JSON.stringify(json, null, 2))
}

export const write = (filePath: string, content: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Write directories that are not there
    mkdirp(dirname(filePath), function (err) {
      if (err) reject(err)
      // Write file
      fs.writeFile(filePath, content, err => {
        if (err) reject(err)
        resolve(`Wrote file at: ${filePath}`)
      })
    })
  })
}
