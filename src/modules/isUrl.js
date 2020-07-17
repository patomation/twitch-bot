const urlRegExPattern = /(http[s]?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

function isUrl (string) {
  return urlRegExPattern.test(string)
}

module.exports = {
  isUrl,
  urlRegExPattern
}
