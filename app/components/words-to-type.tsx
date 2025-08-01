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
  function isSpaceOnfirstColumn(index: number): boolean {
    if (index >= validCursorIndices.length - 1) {
      return false;
    }
    return validCursorIndices[index][1] === 0;
  }

  function isTab(char: string): boolean {
    return char.charCodeAt(0) === 9;
  }

  // Split by <CR> to create lines
  const lines = words.split("\n");
  let globalCharIndex = -2;
  const jsx = lines.map((line, lineIdx) => {
    globalCharIndex++;

    return (
      <Box
        flexWrap="wrap"
        flexBasis="100%"
        key={`line-${lineIdx}`}
        display="flex"
      >
        {line.split("").map((char, charIdx) => {
          globalCharIndex++;
          if (char === " " && isSpaceOnfirstColumn(globalCharIndex)) {
            return <></>;
          }
          if (isTab(char)) globalCharIndex--;
          return (
            <Letter
              colourOfChar={isTab(char) ? "s" : colourOfChar[globalCharIndex]}
              width={isTab(char) ? 2 * 14.41 : 14.41}
              key={`char-${lineIdx}-${charIdx}`}
            >
              {char}
            </Letter>
          );
        })}
      </Box>
    );
  });

  return <Box data-testid="words-to-type">{jsx}</Box>;
};
