import tmi from 'tmi.js'

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
}

export interface Context {
  username: string
}

export type Callback = (
  target: string,
  context: Context,
  msg: string,
  self: string
) => void

export interface Client {
  on: (key: string, callback: Callback) => void
  connect: () => void,
  say: (targetRoom: string, message: string) => void,
  whisper: (targetUser: string, message: string) => void
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line new-cap
export const client = new tmi.client(opts) as Client
