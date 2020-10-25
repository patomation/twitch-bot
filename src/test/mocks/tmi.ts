import mock from 'mock-require'

let lastTarget = ''
let lastMessage = ''

class Client {
  say (target: string, message: string) {
    lastTarget = target
    lastMessage = message
  }
}

mock('tmi.js', {
  client: Client
})

// used for assertions checking messages sent into tmi mock
export const getTarget = (): typeof lastTarget => lastTarget
export const getMessage = (): typeof lastMessage => lastMessage
