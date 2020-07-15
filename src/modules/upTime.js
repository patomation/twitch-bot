const file = require('./file.js')

const dataFilePath = './data.json'
module.exports = async function upTime () {
  return new Promise((resolve, reject) => {
    file.readJson(dataFilePath)
      .then((data) => {
        const start = new Date(data.startTime)
        const now = new Date()
        var diff = (start.getTime() - now.getTime()) / 1000
        diff /= 60
        const upTimeMin = Math.abs(Math.round(diff))
        resolve(upTimeMin)
      })
  })
}
