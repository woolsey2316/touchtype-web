import { Box } from "@mui/joy";

interface Props {
  words: string;
  colourOfChar: string[];
}

export const WordsToType = ({ words, colourOfChar }: Props) => {
  let wordsIndex = -1;
  const jsx = words.split(" ").map((word) => {
    wordsIndex++;
    return (
      <Box key={Math.random()}>
        {word.split("").map((char) => {
          wordsIndex++;
          return (
            <span
              style={{ color: colourOfChar[wordsIndex], width: `${14.41}px` }}
              key={Math.random()}
            >
              {char}
            </span>
          );
        })}
      </Box>
    );
  });

  return jsx;
};
