const isSameDay = (first, second) =>
  first.toDateString() === second.toDateString()
  // first.getFullYear() === second.getFullYear() &&
  // first.getMonth() === second.getMonth() &&
  // first.getDate() === second.getDate()

module.exports = isSameDay
