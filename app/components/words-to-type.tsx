import { Box, Typography } from "@mui/joy";
import { useContext } from "react";
import { ThemeContext } from "../index";

interface Props {
  words: string;
  colourOfChar: string[];
}

export const WordsToType = ({ words, colourOfChar }: Props) => {
  let wordsIndex = -2;
  const { theme } = useContext(ThemeContext);
  const jsx = words.split(" ").map((word) => {
    wordsIndex++;
    return (
      <Box key={Math.random()} display="flex">
        {word.split("").map((char) => {
          wordsIndex++;
          return (
            <Typography
              level="body-lg"
              sx={{
                textAlign: "center",
                fontSize: 26,
                fontFamily: "inherit",
                width: `${14.41}px`,
              }}
              style={{
                color:
                  colourOfChar[wordsIndex] === "s"
                    ? theme.vars.palette.success.plainColor
                    : colourOfChar[wordsIndex] === "f"
                      ? theme.vars.palette.danger.plainColor
                      : theme.vars.palette.neutral[500],
              }}
              key={Math.random()}
            >
              {char}
            </Typography>
          );
        })}
      </Box>
    );
  });

  return jsx;
};
