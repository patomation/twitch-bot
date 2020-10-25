import test from 'ava'

import { setState, subscribe, subscribeTo } from '../../../../overlay/store/state'

test('subscribe', (t) => {
  let called = false
  subscribe(() => {
    called = true
  })
  setState({ alert: { sound: 'test' } })
  t.true(called)
})

test('subscribeTo', (t) => {
  t.plan(3)
  let firstSubCalled = false
  let secondSubCalled = false
  let notCalled = true
  subscribeTo('alert', () => {
    firstSubCalled = true
  })
  subscribeTo('alert', () => {
    secondSubCalled = true
  })
  subscribe(() => {
    notCalled = false
  })
  setState({ alert: { sound: 'test' } })
  t.true(firstSubCalled)
  t.true(secondSubCalled)
  t.false(notCalled)
})
