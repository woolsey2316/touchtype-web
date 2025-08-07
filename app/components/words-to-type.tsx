import { Box } from "@mui/joy";
import { Letter } from "./letter";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
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
  const { theme } = useContext(ThemeContext);
  function isTab(char: string): boolean {
    return char === "→";
  }

  function lastLetterOnRow(validCursorIndices: number[][], charIdx: number) {
    if (charIdx + 1 >= validCursorIndices.length) return true;
    return validCursorIndices[charIdx + 1][0] > validCursorIndices[charIdx][0];
  }
  const wordsToType = [];
  let charIdx = 0;
  let skipTabs = 0;
  const poppedIndices: number[] = [];

  while (charIdx < words.length) {
    if (isTab(words[charIdx])) {
      skipTabs++;
    }

    wordsToType.push(
      <Letter
        colourOfChar={isTab(words[charIdx]) ? "" : colourOfChar[charIdx]}
        fadeOut={
          colourOfChar[charIdx] === theme.vars.palette.success.plainColor
        }
        even={charIdx % 2 === 0}
        opaque={words[charIdx] === "↵"}
        width={isTab(words[charIdx]) ? 2 * 14 : 14}
        key={`char-${charIdx}-${skipTabs}`}
      >
        {isTab(words[charIdx]) ? " " : words[charIdx]}
      </Letter>,
    );
    if (lastLetterOnRow(validCursorIndices, charIdx - skipTabs)) {
      if (words[charIdx] === " ") {
        wordsToType.pop();
      }
      if (!poppedIndices.includes(charIdx - skipTabs)) {
        poppedIndices.push(charIdx - skipTabs);
        wordsToType.push(
          <Box key={`newline-${charIdx}-${skipTabs}`} width="100%"></Box>,
        );
      }
    }
    charIdx++;
  }

  return (
    <Box
      display="flex"
      sx={{
        animation: "fadeIn 0.5s forwards",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
      flexWrap="wrap"
      data-testid="words-to-type"
    >
      {wordsToType}
    </Box>
  );
};
