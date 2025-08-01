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
    console.log("encountered tab");
    console.log(charIndex + skipTabs);
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
    console.log("found tab");
    console.log(charIndex + skipTabs);
    skipTabs++;
  }
  return charIndex - skipTabs;
}

export function maybeIncrement(charIndex: number, words: string) {
  return charIndex + 1 < words.length ? charIndex + 1 : charIndex;
}

export function maybeDecrement(charIndex: number) {
  return charIndex - 1 >= 0 ? charIndex - 1 : charIndex;
}
