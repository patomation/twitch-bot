var fs = require('fs')
const mkdirp = require('mkdirp')
const getDirName = require('path').dirname

const isDir = (path) =>
  fs.lstatSync(path).isDirectory()

// Check if file exists
const exists = (path) => {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.F_OK, (err) => {
      resolve(!err) // return boolean
    })
  })
}

const read = (path, encoding) => {
  return new Promise((resolve, reject) => {
    // Check if file exists
    fs.access(path, fs.F_OK, (err) => {
      if (err) reject(err)
      // If no file access error - Read file
      resolve(fs.readFileSync(path, encoding))
    })
  })
}

const readdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

const readJson = (path) => {
  return new Promise((resolve) => {
    read(path, 'utf-8').then((data) => {
      resolve(JSON.parse(data))
    })
  })
}

const writeJson = (path, json) => {
  return write(path, JSON.stringify(json, null, 2))
}

const write = (path, content) => {
  return new Promise((resolve, reject) => {
    // Write directories that are not there
    mkdirp(getDirName(path), function (err) {
      if (err) reject(err)
      // Write file
      fs.writeFile(path, content, err => {
        if (err) reject(err)
        resolve(`Wrote file at: ${path}`)
      })
    })
  })
}

module.exports = {
  isDir,
  exists,
  read,
  readdir,
  write,
  readJson,
  writeJson
}
