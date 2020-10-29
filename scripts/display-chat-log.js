const fs = require('fs')
const path = require('path')
const readline = require('readline')

const chatLogPath = path.resolve(__dirname, '../', './logs/chat_log.txt')

const readLines = (filePath) => new Promise((resolve) => {
  const lines = []
  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath)
    const lineReader = readline.createInterface({
      input: fileStream
    })
    lineReader.on('line', (line) => {
      lines.push(line)
    })
    lineReader.on('close', () => {
      resolve(lines)
    })
  }
})

let displayLine = ''
let lastLineIndex = null
const displayNextLine = async () => {
  const lines = await readLines(chatLogPath)
  const nextLine = lines.slice(lastLineIndex + 1, lines.length)[0]

  // Handle if new lines
  if (nextLine) {
    lastLineIndex++
    displayLine = nextLine
  }
  process.stdout.write(`\n${displayLine}`)

  setTimeout(() => {
    displayNextLine()
  }, 2000)
}

const main = async () => {
  const lines = await readLines(chatLogPath)
  lastLineIndex = lines.length - 1
  displayLine = lines[lastLineIndex]
  console.log({ lines, lastLine: displayLine })
  displayNextLine()
}
main()
