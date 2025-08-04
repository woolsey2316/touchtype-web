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
        {line.split(" ").map((word, wordIdx) => {
          globalCharIndex++;

          return (
            <>
              <Box display="flex">
                {word.split("").map((char, charIdx) => {
                  globalCharIndex++;

                  if (isTab(char)) globalCharIndex--;
                  return (
                    <Letter
                      colourOfChar={
                        isTab(char) ? "s" : colourOfChar[globalCharIndex]
                      }
                      width={isTab(char) ? 2 * 14.41 : 14.41}
                      key={`char-${lineIdx}-${wordIdx}-${charIdx}`}
                    >
                      {char}
                    </Letter>
                  );
                })}
              </Box>
              {isSpaceOnfirstColumn(globalCharIndex) ? (
                <></>
              ) : (
                <Letter
                  colourOfChar={colourOfChar[globalCharIndex]}
                  width={14.41}
                  key={`char-${lineIdx}-${wordIdx}`}
                >
                  {validCursorIndices[globalCharIndex][1].toString()}
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
