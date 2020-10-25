import test from 'ava'
import fetchMock from 'fetch-mock'
import { host } from '../../../../overlay/host'

import { alertComplete, receiveEventSourceMessage, controllerButtonClick, getSoundCommands } from '../../../../overlay/store/actions'
import { state } from '../../../../overlay/store/state'

test.beforeEach(() => {
  fetchMock.restore()
})

test('alertComplete', (t) => {
  state.alert = { sound: 'test' }
  alertComplete()
  t.is(state.alert, null)
})

test('receiveEventSourceMessage vote / voteClear', (t) => {
  t.plan(2)
  receiveEventSourceMessage({
    vote: {
      topic: 'test',
      yes: 1,
      no: 1,
      time: 30
    }
  })
  t.not(state.vote, null)
  receiveEventSourceMessage({
    voteClear: true
  })
  t.is(state.vote, null)
})

test('receiveEventSourceMessage alert', (t) => {
  t.plan(2)
  t.is(state.alert, null)
  receiveEventSourceMessage({
    alert: {
      sound: 'test',
      gif: 'test'
    }
  })
  t.not(state.alert, null)
})

test('controllerButtonClick', async (t) => {
  const command = 'test-command'
  fetchMock.mock(`${host}/trigger-command/${command}`, 200)
  await controllerButtonClick(command)
  t.true(fetchMock.called())
})

test('getSoundCommands', async (t) => {
  t.plan(2)
  fetchMock.mock(`${host}/get-sound-commands`, { soundCommands: ['test1', 'test2'] })
  await getSoundCommands()
  t.true(fetchMock.called())
  t.is(state.soundCommands.length, 2)
})
