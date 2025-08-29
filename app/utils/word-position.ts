export const getNextWordLength = (charIndex: number, words: string): number => {
  return words.substring(charIndex).split(" ", 2)[0].length * 14;
};

export function getNextCharIndex(
  charIndex: number,
  words: string,
  skipOverTabs: boolean,
): number {
  if (charIndex >= words.length) return words.length - 1; // Prevent going out of bounds
  charIndex++;
  if (!skipOverTabs) return charIndex;

  let skipTabs = 0;

  while (
    charIndex + skipTabs < words.length &&
    words[charIndex + skipTabs] === "→"
  ) {
    skipTabs++;
  }
  return charIndex + skipTabs;
}

export function getPreviousCharIndex(
  charIndex: number,
  words: string,
  skipOverTabs: boolean,
): number {
  if (charIndex <= 0) return 0; // Prevent going out of bounds
  charIndex--;
  if (!skipOverTabs) return charIndex;

  let skipTabs = 0;

  while (charIndex + skipTabs >= 0 && words[charIndex - skipTabs] === "→") {
    skipTabs++;
  }
  return charIndex - skipTabs;
}
