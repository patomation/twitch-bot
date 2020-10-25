import { client } from '../modules/client'

export const shoutOut = (target: string, userName: string): void => {
  // ensure that @ was removed in case it was used.
  const soUser = userName.replace('@', '')
  // @ is added back in the text message but not the url
  client.say(target, `Be sure to follow @${soUser} at https://www.twitch.tv/${soUser}!`)
}
