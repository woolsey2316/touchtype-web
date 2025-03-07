import { Box } from "@mui/joy";

interface Props {
  words: string;
  colourOfChar: string[];
}

export const WordsToType = ({ words, colourOfChar }: Props) => {
  let wordsIndex = -1;
  const jsx = words.split(" ").map((word, index) => {
    wordsIndex++;
    return (
      <Box key={index}>
        {word.split("").map((char, charIndex) => {
          wordsIndex++;
          return (
            <span
              style={{ color: colourOfChar[wordsIndex] }}
              key={index * 16 + charIndex}
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
