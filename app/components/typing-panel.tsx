import { Box } from "@mui/joy";
import { type KeyboardEvent, useState } from "react";
import { Cursor } from "./cursor";
import { WordsToType } from "./words-to-type";

export default function TypingPanel() {
  const words = "this is a typing test";
  const [charIndex, setCharIndex] = useState(0);
  const [wordsResult, setWordsResult] = useState(Array(words.length).fill(""));
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
        if (e.key === words[charIndex]) {
          setCharIndex((charIndex) =>
            charIndex < words.length ? charIndex + 1 : charIndex,
          );
          setWordsResult((wordsResult) => {
            const newWordsResult = [...wordsResult];
            newWordsResult[charIndex] = "white";
            return newWordsResult;
          });
        } else if (e.key === "Backspace") {
          setCharIndex((charIndex) => (charIndex > 0 ? charIndex - 1 : 0));
          setWordsResult((wordsResult) => {
            const newWordsResult = [...wordsResult];
            newWordsResult[charIndex] = undefined;
            return newWordsResult;
          });
        } else {
          setCharIndex((charIndex) =>
            charIndex < words.length ? charIndex + 1 : charIndex,
          );
          setWordsResult((wordsResult) => {
            const newWordsResult = [...wordsResult];
            newWordsResult[charIndex] = "red";
            return newWordsResult;
          });
        }
      }}
    >
      <Cursor left={`${-7 + charIndex * 14}px`} top="-2px" />
      <WordsToType result={wordsResult} words={words} />
    </Box>
  );
}
