# Twitch Bot

A twitch chat bot for funzies.


# Install
```
npm install
```


# Getting Started
Local instance
```
npm run start
```


# Get OAUTH_TOKEN
an easy way to get the [OAUTH_TOKEN](https://twitchapps.com/tmi/) from a community driven api wrapper

more info on it
https://dev.twitch.tv/docs/authentication/#registration

```
curl -H "Authorization: Bearer <access token>" https://api.twitch.tv/helix/
```


# Vox Dependencies
To get !vox to work install espeak-ng
`sudo apt install espeak-ng`
!Vox uses node child process spawn to run command
`espeak-ng <message>`


DEPRECATED say.speak LINUX

To get this working 
```
sudo apt-get install festival festvox-kallpc16k
```

Source: https://github.com/marak/say.js/

[funny_texttospeak_lines](https://old.reddit.com/r/discordapp/comments/5nu2em/funny_texttospeak_lines/)

# Contributing
see `CONTRIBUTIN.md`

## Adding !Commands

### How to add Sound Commands
1. Adds sound mp3 to `assts/sounds`
2. Add gif animation to `assets/gif`
3. in `src/overlay/commands.ts` add imports to bots gif and mp3 on a new lines together
4. Create a new key object on the commands object example
```
...
import hackerGif from '../../assets/gif/this-is-fine.gif'
import hackerSound from '../../assets/sounds/re-sucks.mp3'

export const commands = {
  ...
  hack: {
    gif: hackerGif,
    sound: hackerSound,
    duration: 3000 // time that gif is displayed in ms
  }
}
```

### How to add other types of commands
1. Edit `src/bot/commands.ts` or `src/bot/keywords.ts`
the `commands.ts` is for regular !commands 
keywords are any words in chat that you want the bot to respond to
2. append the `command` or `keyword` object with a new object like so
```
export const commands = {
  ...
  hack: {
    text: 'bot will type this in chat'
  }
}
```
or
```
export const commands = {
  ...
  hack: {
    say: 'bot will say this using vox'
  }
}
```
or both is acceptable. The bot will do both.
```
export const commands = {
  ...
  hack: {
    text: 'bot will type this in chat',
    say: 'bot will say this using vox'
  }
}
```

#### note sound/gif commands and text/say/keyword commands can share same command and should run at the same time.