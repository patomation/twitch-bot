import test from 'ava'

import { shoutOut } from '../../../../bff/lib/shoutout'
import { getMessage, getTarget } from '../../../mocks/tmi'

test('shout out user with @ prefix', (t) => {
  t.plan(2)
  const target = 'test-channel'
  shoutOut(target, '@user')
  const expected = 'Be sure to follow @user at https://www.twitch.tv/user!'
  const actual = getMessage()
  t.deepEqual(expected, actual)
  t.is(target, getTarget())
})

test('shout out user sans @ prefix', (t) => {
  t.plan(2)
  const target = 'test-channel-2'
  shoutOut(target, 'dude')
  const expected = 'Be sure to follow @dude at https://www.twitch.tv/dude!'
  const actual = getMessage()
  t.deepEqual(expected, actual)
  t.is(target, getTarget())
})
