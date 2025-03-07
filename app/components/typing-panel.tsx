import { Box } from "@mui/joy";
import { type KeyboardEvent, useState } from "react";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";

export default function TypingPanel({ words }: { words: string }) {
  const [charIndex, setCharIndex] = useState(0);
  const [colourOfChar, setColourOfChar] = useState(
    Array(words.length).fill(""),
  );
  return (
    <Box
      sx={{
        color: "#1481BA",
        display: "flex",
        position: "relative",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1.5,
        fontFamily: "monospace",
        fontSize: 24,
      }}
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Shift") {
          return;
        }
        if (e.key === words[charIndex]) {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex + 1] = "white";
              return newWordsResult;
            });
            return charIndex < words.length ? charIndex + 1 : charIndex;
          });
        } else if (e.key === "Backspace") {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex] = "";
              return newWordsResult;
            });
            return charIndex > 0 ? charIndex - 1 : 0;
          });
        } else {
          setCharIndex((charIndex) => {
            setColourOfChar((wordsResult) => {
              const newWordsResult = [...wordsResult];
              newWordsResult[charIndex] = "red";
              return newWordsResult;
            });
            return charIndex < words.length ? charIndex + 1 : charIndex;
          });
        }
      }}
    >
      <Cursor left={`${-7 + charIndex * 14}px`} top="-2px" />
      <WordsToType colourOfChar={colourOfChar} words={words} />
    </Box>
  );
}
