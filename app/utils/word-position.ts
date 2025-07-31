export const getNextWordLength = (charIndex: number, words: string): number => {
  return words.substring(charIndex).split(" ", 2)[0].length * 14.41;
};

export function getNextCharIndex(charIndex: number, words: string): number {
  let skipTabs = 0;
  while (
    charIndex + 1 + skipTabs < words.length &&
    words[charIndex + 1 + skipTabs].charCodeAt(0) === 9
  ) {
    skipTabs++;
  }
  return skipTabs ? charIndex + skipTabs + 1 : charIndex + 1;
}

export function getPreviousCharIndex(charIndex: number, words: string): number {
  let skipTabs = 0;
  while (
    charIndex + 1 + skipTabs >= words.length &&
    words[charIndex - 1 - skipTabs].charCodeAt(0) === 9
  ) {
    skipTabs++;
  }
  return skipTabs ? charIndex - 1 - skipTabs : charIndex - 1;
}
