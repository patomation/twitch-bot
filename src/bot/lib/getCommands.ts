export const getCommands = (prefix: string, text: string): { command: string, args: string[]}[] =>
  text.split(prefix)
    .filter(s => s.length > 0) // filter out empty strings
    .filter(s => text.includes(`${prefix}${s}`)) // ensure that is a command and not a sentence before command
    .map((commandString: string) => {
      const command = commandString.split(' ')[0]
      const args = commandString.split(' ')
        .filter(s => s !== command)
        .filter(s => s !== '') // filter out empty args
      return {
        command,
        args
      }
    })
