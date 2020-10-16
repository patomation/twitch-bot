const fs = require('fs')
const path = require('path')
const readline = require('readline')

const chatLogPath = path.resolve('./logs/chat_log.txt')

const readLastLine = (filePath) => new Promise((resolve) => {
  let lastLine = ''
  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath)
    const lineReader = readline.createInterface({
      input: fileStream
    })
    lineReader.on('line', (line) => {
      lastLine = line
    })

    lineReader.on('close', () => {
      resolve(lastLine)
    })
  }
})

let lastLine = ''
const displayLastLine = async () => {
  const nextLastLine = await readLastLine(chatLogPath)
  if (lastLine !== nextLastLine) {
    lastLine = nextLastLine
    // logs to terminal without last line - thank twitch user @jordicat
    process.stdout.write(`\n${lastLine}`)
  }
  setTimeout(() => {
    displayLastLine()
  }, 500)
}

displayLastLine()
