export const getNextWordLength = (charIndex: number, words: string): number => {
  return words.substring(charIndex).split(" ", 2)[0].length * 14;
};

export function getNextCharIndex(charIndex: number, words: string): number {
  let skipTabs = 0;
  charIndex++;
  while (
    charIndex + skipTabs < words.length &&
    words[charIndex + skipTabs].charCodeAt(0) === 9
  ) {
    skipTabs++;
  }
  return charIndex + skipTabs;
}

export function getPreviousCharIndex(charIndex: number, words: string): number {
  let skipTabs = 0;
  charIndex--;
  while (
    charIndex + skipTabs >= 0 &&
    words[charIndex - skipTabs].charCodeAt(0) === 9
  ) {
    skipTabs++;
  }
  return charIndex - skipTabs;
}
