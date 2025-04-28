export const getNextWordLength = (charIndex: number, words: string): number => {
  return words.substring(charIndex).split(" ", 2)[0].length * 14.41;
};
