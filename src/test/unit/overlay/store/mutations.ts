import test from 'ava'

import { state } from '../../../../overlay/store/state'
import { showVote, hideVote, setAlert, setSoundCommands } from '../../../../overlay/store/mutations'

test('showVote', (t) => {
  t.plan(2)
  t.is(state.vote, null)
  showVote({
    topic: 'string',
    yes: 1,
    no: 1,
    time: 10 // sec
  })
  t.not(state.vote, null)
})

test('hideVote', (t) => {
  t.plan(2)
  t.not(state.vote, null)
  hideVote()
  t.is(state.vote, null)
})

test('setAlert', (t) => {
  t.plan(2)
  t.is(state.alert, null)
  setAlert({ sound: 'string' })
  t.not(state.alert, null)
})

test('setSoundCommands', (t) => {
  t.plan(2)
  t.is(state.soundCommands.length, 0)
  setSoundCommands(['sound1', 'sound2'])
  t.is(state.soundCommands.length, 2)
})
