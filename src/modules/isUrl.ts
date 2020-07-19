export const urlRegExPattern = /(http[s]?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

export function isUrl (string: string): boolean {
  return urlRegExPattern.test(string)
}
