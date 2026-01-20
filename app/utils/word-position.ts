export function getNextCharIndex({
  charIndex,
  words,
  skipOverTabs,
}: {
  charIndex: number;
  words: string;
  skipOverTabs: boolean;
}): number {
  if (charIndex >= words.length) return words.length - 1; // Prevent going out of bounds
  charIndex++;
  if (!skipOverTabs) return charIndex;

  let skipTabs = 0;

  while (
    charIndex + skipTabs < words.length &&
    (words[charIndex + skipTabs] === "→" ||
      words[charIndex + skipTabs] === "\t")
  ) {
    skipTabs++;
  }
  return charIndex + skipTabs;
}

export function getPreviousCharIndex({
  charIndex,
  words,
  skipOverTabs,
}: {
  charIndex: number;
  words: string;
  skipOverTabs: boolean;
}): number {
  if (charIndex <= 0) return 0; // Prevent going out of bounds
  charIndex--;
  if (!skipOverTabs) return charIndex;

  let skipTabs = 0;

  while (
    (charIndex + skipTabs >= 0 && words[charIndex - skipTabs] === "→") ||
    words[charIndex - skipTabs] === "\t"
  ) {
    skipTabs++;
  }
  return charIndex - skipTabs;
}
