import test from 'ava'
import fs from 'fs'
import path from 'path'

import { commands } from '../../../bff/commands'

test('validate sounds to make sure they exist', (t) => {
  const totalSoundCommands = Object.keys(commands)
    .reduce((acc, key) => {
      if (Object.prototype.hasOwnProperty.call(commands[key], 'sound')) acc++
      return acc
    }, 0)
  t.plan(totalSoundCommands)
  Object.entries(commands)
    .forEach(([key, { sound }]) => {
      if (Object.prototype.hasOwnProperty.call(commands[key], 'sound') && sound) {
        const actual = fs.existsSync(path.resolve('assets', 'sounds', sound))
        t.true(actual)
      }
    })
})
