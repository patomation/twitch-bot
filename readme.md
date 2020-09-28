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