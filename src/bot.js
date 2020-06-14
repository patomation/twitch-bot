const dotenv = require('dotenv')
dotenv.config()
const tmi = require('tmi.js');

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}


// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  
  // Remove whitespace from chat message
  const name = msg.trim().replace('!', '');
  
  const commands = {
    d20: () => {
      client.say(target, `You rolled a ${rollDice()}.`);
    }
  }

  if (Object.prototype.hasOwnProperty.call(commands, name)) {
    commands[name]()
    console.log(`* Executed !${name} command`);
  } else {
    console.log(`* Unknown command !${name}`);
  }
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
