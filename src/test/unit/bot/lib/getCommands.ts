import test from 'ava'
import { getCommands } from '../../../../bot/lib/getCommands'

const data = [
  {
    prefix: '!',
    text: 'this is my !foo baz bar biz',
    expected: [
      {
        command: 'foo',
        args: ['baz', 'bar', 'biz']
      }
    ]
  },
  {
    prefix: '!',
    text: '!foo baz !bar biz',
    expected: [
      {
        command: 'foo',
        args: ['baz']
      },
      {
        command: 'bar',
        args: ['biz']
      }
    ]
  },
  {
    prefix: '!',
    text: '!foo !baz !bar !biz',
    expected: [
      {
        command: 'foo',
        args: []
      },
      {
        command: 'baz',
        args: []
      },
      {
        command: 'bar',
        args: []
      },
      {
        command: 'biz',
        args: []
      }
    ]
  }
]

test('getCommands', (t) => {
  t.plan(data.length)
  data.forEach(({ prefix, text, expected }) => {
    const actual = getCommands(prefix, text)
    t.deepEqual(actual, expected)
  })
})
