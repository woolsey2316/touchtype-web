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
    if (index <= -1) {
      return true;
    }
    // console.log(index, validCursorIndices[index][1]);
    return validCursorIndices[index][1] === 0;
  }
  // Split by <CR> to create lines
  const lines = words.split("\n");
  let globalCharIndex = -1;
  const jsx = lines.map((line, lineIdx) => (
    <Box
      data-testid="words-to-type"
      flexWrap="wrap"
      flexBasis="100%"
      key={`line-${lineIdx}`}
      display="flex"
    >
      {line.split(" ").map((word, wordidx) => {
        !isSpaceOnfirstColumn(globalCharIndex) && globalCharIndex++;
        return (
          <>
            {!isSpaceOnfirstColumn(globalCharIndex) && (
              <Letter
                width={14.41}
                colourOfChar={colourOfChar[globalCharIndex]}
              >
                {" "}
              </Letter>
            )}
            <Box flexWrap="wrap" display="flex" sx={{ pb: "14.41px" }}>
              {word.split("").map((char, charIdx) => {
                globalCharIndex++;
                return char.charCodeAt(0) === 9 ? (
                  <Box
                    sx={{
                      width: `${14.41 * 2}px`,
                      display: "inline-block",
                    }}
                    key={`char-${lineIdx}-${charIdx}`}
                  >
                    &nbsp;&nbsp;
                  </Box>
                ) : (
                  <Letter
                    colourOfChar={colourOfChar[globalCharIndex]}
                    width={14.41}
                    key={`char-${lineIdx}-${wordidx}-${charIdx}`}
                  >
                    {char}
                  </Letter>
                );
              })}
            </Box>
          </>
        );
      })}
    </Box>
  ));

  return jsx;
};
