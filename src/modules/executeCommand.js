const executeCommand = (client, target, command) => {
  const commands = {
    d20: () => {
      client.say(target, `You rolled a ${20}.`);
    }
  }

  if (Object.prototype.hasOwnProperty.call(commands, command)) {
    commands[command]()
    console.log(`* Executed !${command} command`);
  } else {
    console.log(`* Unknown command !${command}`);
  }
}

module.exports = executeCommand