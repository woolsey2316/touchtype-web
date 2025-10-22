import { useContext } from "react";
import { Box } from "@mui/joy";
import { Letter } from "./letter";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { UserPreferencesContext } from "../context/userPreferences";
interface Props {
  words: string;
  colourOfChar: string[];
}

export const WordsToType = ({ words, colourOfChar }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { fontFamily, spaceChar } = useContext(UserPreferencesContext);

  let wordToType = [];
  const wordsJSX = [];
  let charIdx = 0;
  let wordIdx = 0;
  let lineIdx = 0;
  let globalCharIdx = 0;

  const lines = words.split("↵");
  while (lineIdx < lines.length) {
    const wordArray = lines[lineIdx].split(" ");
    while (wordIdx < wordArray.length) {
      const word = wordArray[wordIdx];
      while (charIdx < word.length) {
        wordToType.push(
          <Letter
            colourOfChar={colourOfChar[globalCharIdx]}
            fadeOut={
              colourOfChar[globalCharIdx] ===
              theme.vars.palette.success.plainColor
            }
            even={globalCharIdx % 2 === 0}
            opaque={words[globalCharIdx] === "→" ? true : false}
            key={`char-${lineIdx}-${wordIdx}-${charIdx}`}
          >
            {words[globalCharIdx]}
          </Letter>,
        );
        charIdx++;
        globalCharIdx++;
      }
      if (wordIdx !== wordArray.length - 1) {
        wordToType.push(
          <Letter
            colourOfChar={colourOfChar[globalCharIdx]}
            fadeOut={
              colourOfChar[globalCharIdx] ===
              theme.vars.palette.success.plainColor
            }
            opaque={true}
            invisible={spaceChar === " "}
            even={globalCharIdx % 2 === 0}
            key={`char-${lineIdx}-${wordIdx}-${charIdx}`}
            preferedColour={theme.vars.palette.neutral[300]}
          >
            {spaceChar}
          </Letter>,
        );
        globalCharIdx++;
      }
      // word by word container for wrapping text
      wordsJSX.push(<Box>{wordToType}</Box>);
      charIdx = 0;
      wordToType = [];
      wordIdx++;
    }
    wordsJSX.push(
      <Box
        sx={{
          visibility: lineIdx === lines.length - 1 ? "hidden" : "visible",
        }}
      >
        <Letter
          colourOfChar={colourOfChar[globalCharIdx]}
          fadeOut={
            colourOfChar[globalCharIdx] ===
            theme.vars.palette.success.plainColor
          }
          opaque={true}
          even={globalCharIdx % 2 === 0}
          key={`char-${lineIdx}-${wordIdx}-${charIdx}`}
        >
          ↵
        </Letter>
      </Box>,
    );
    wordsJSX.push(<Box width="100%"></Box>);
    wordIdx = 0;
    lineIdx++;
    globalCharIdx++;
  }
  return (
    <Box
      id="words-to-type"
      display="flex"
      sx={{
        fontFamily: fontFamily,
        animation: "fadeIn 0.2s forwards",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        padding: "1px",
      }}
      flexWrap="wrap"
      data-testid="words-to-type"
    >
      {wordsJSX}
    </Box>
  );
};
