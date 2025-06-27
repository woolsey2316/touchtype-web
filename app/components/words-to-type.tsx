import { Box, useTheme } from "@mui/joy";

interface Props {
  words: string;
  colourOfChar: string[];
}

export const WordsToType = ({ words, colourOfChar }: Props) => {
  const theme = useTheme();
  let wordsIndex = -1;
  const jsx = words.split(" ").map((word) => {
    wordsIndex++;
    return (
      <Box key={Math.random()}>
        {word.split("").map((char) => {
          wordsIndex++;
          return (
            <span
              style={{
                color:
                  colourOfChar[wordsIndex] === "s"
                    ? theme.palette.success.plainColor
                    : colourOfChar[wordsIndex] === "f"
                      ? theme.palette.danger.plainColor
                      : theme.palette.neutral[500],
                width: `${14.41}px`,
              }}
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
