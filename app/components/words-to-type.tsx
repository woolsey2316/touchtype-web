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
    if (index >= validCursorIndices.length - 3) {
      return false;
    }
    if (index < 0) return false;
    return words[index] === " " && validCursorIndices[index][1] === 0;
  }
  function isSpaceOnLastColumn(index: number): boolean {
    if (index >= validCursorIndices.length - 3) {
      return false;
    }
    if (index < 0) return false;
    return validCursorIndices[index + 1][1] <= validCursorIndices[index][1];
  }

  function isTab(char: string): boolean {
    return char.charCodeAt(0) === 9;
  }

  // Split by <CR> to create lines
  const lines = words.split("\n");
  let globalCharIndex = -3;
  const jsx = lines.map((line, lineIdx) => {
    globalCharIndex++;

    return (
      <Box
        flexWrap="wrap"
        flexBasis="100%"
        key={`line-${lineIdx}`}
        display="flex"
      >
        {line.split(" ").map((word, wordIdx) => {
          globalCharIndex++;
          return (
            <>
              <Box display="flex">
                {word.split("").map((char, charIdx) => {
                  globalCharIndex++;
                  if (isTab(char)) {
                    globalCharIndex -= 2;
                  }
                  return (
                    <Letter
                      colourOfChar={
                        isTab(char) ? "s" : colourOfChar[globalCharIndex]
                      }
                      width={isTab(char) ? 2 * 14 : 14}
                      key={`char-${lineIdx}-${wordIdx}-${charIdx}`}
                    >
                      {char}
                    </Letter>
                  );
                })}
              </Box>
              {isSpaceOnfirstColumn(globalCharIndex + 1) ||
              isSpaceOnLastColumn(globalCharIndex + 1) ||
              wordIdx === line.split(" ").length - 1 ? (
                <Box width="0px" flexBasis="100%"></Box>
              ) : (
                <Letter
                  colourOfChar={colourOfChar[globalCharIndex + 1]}
                  width={14}
                  key={`char-${lineIdx}-${wordIdx}`}
                >
                  {" "}
                </Letter>
              )}
            </>
          );
        })}
      </Box>
    );
  });

  return <Box data-testid="words-to-type">{jsx}</Box>;
};
