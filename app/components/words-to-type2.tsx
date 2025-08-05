import { Box } from "@mui/joy";
import { Letter } from "./letter";

interface Props {
  words: string;
  colourOfChar: string[];
  validCursorIndices: number[][];
}

export const WordsToType = ({
  words,
  colourOfChar,
  validCursorIndices,
}: Props) => {
  function isTab(char: string): boolean {
    return char.charCodeAt(0) === 9;
  }

  function lastLetterOnRow(validCursorIndices: number[][], charIdx: number) {
    if (charIdx + 1 >= validCursorIndices.length) return false;
    console.log(
      validCursorIndices[charIdx + 1][1],
      validCursorIndices[charIdx][1],
    );
    return validCursorIndices[charIdx + 1][1] <= validCursorIndices[charIdx][1];
  }
  const wordsToType = [];
  let charIdx = 0;
  let skipTabs = 0;
  const poppedIndices: number[] = [];

  while (charIdx < words.length) {
    if (isTab(words[charIdx])) {
      skipTabs++;
    }
    if (words[charIdx] !== "\n") {
      wordsToType.push(
        <Letter
          colourOfChar={
            isTab(words[charIdx]) ? "s" : colourOfChar[charIdx - skipTabs]
          }
          width={isTab(words[charIdx]) ? 2 * 14 : 14}
          key={`char-${charIdx}`}
        >
          {words[charIdx]}
        </Letter>,
      );
    }
    if (lastLetterOnRow(validCursorIndices, charIdx - skipTabs)) {
      if (words[charIdx] === " ") {
        wordsToType.pop();
      }
      if (!poppedIndices.includes(charIdx - skipTabs)) {
        poppedIndices.push(charIdx - skipTabs);
        wordsToType.push(<Box width="100%"></Box>);
      }
    }
    charIdx++;
  }

  return (
    <Box display="flex" flexWrap="wrap" data-testid="words-to-type">
      {wordsToType}
    </Box>
  );
};
