import test from 'ava'
import { includesWord } from '../../../../bff/lib/includesWord'

const data = [
  {
    word: 'hi',
    text: 'hi',
    expected: true
  },
  {
    word: 'hi',
    text: ' hi',
    expected: true
  },
  {
    word: 'hi',
    text: 'hi! there',
    expected: true
  },
  {
    word: 'hi',
    text: 'hi friend',
    expected: true
  },
  {
    word: 'hi',
    text: 'this',
    expected: false
  }
]

test('Sentence Includes words', (t) => {
  t.plan(data.length)
  data.forEach(({ text, word, expected }) => {
    const actual = includesWord(text, word)
    t.is(actual, expected)
  })
})
