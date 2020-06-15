const executeCommand = (client, target, context, commandName) => {
  const availableCommands = {
    commands: () => {
      let message = 'Available Commands: '
      Object.keys(availableCommands).forEach((command) => {
        // Ignore this command
        if (command !== 'commands') {
          message += `!${command} `
        }
      })
      client.say(target, `${message}`)
    },
    hello: () => {
      client.say(target, `Hello ${context.username}!`)
    }
  }

  const isCommand = Object.prototype.hasOwnProperty.call(availableCommands, commandName)

  if (isCommand) {
    availableCommands[commandName]()
    console.log(`* Executed !${commandName} command`)
  } else {
    console.log(`* Unknown command !${commandName}`)
  }
}

module.exports = executeCommand
