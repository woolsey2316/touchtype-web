export const getNextWordLength = (charIndex: number, words: string): number => {
  return words.substring(charIndex).split(" ", 2)[0].length * 14.41;
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

export function maybeIncrement(index: number, words: string) {
  return index + 1 < words.length ? index + 1 : index;
}

export function maybeDecrement(index: number) {
  return index - 1 >= 0 ? index - 1 : index;
}
