/**
 * Sentence Includes a Word or Phrase?
 * @param sentence string sentence of word or words
 * @param word single word
 */
export const includesWord = (sentence: string, word: string): boolean =>
  sentence.split(/[\s,?,.!]+/).includes(word)
